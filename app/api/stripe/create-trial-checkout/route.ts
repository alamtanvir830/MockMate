import { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getStripe } from '@/lib/stripe/client'
import { isAdminUser } from '@/lib/auth/server'
import { getSatTrialEligibility } from '@/lib/sat-trial/eligibility'
import type Stripe from 'stripe'

const OFFER_VERSION = 'v1'
const ACQUISITION_SOURCE = 'post_exam_7_day_trial'

export async function POST(_req: NextRequest) {
  try {
    // 1. Auth
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return Response.json({ error: 'You must be signed in to continue.' }, { status: 401 })
    }

    // 2. Block admin
    if (isAdminUser(user)) {
      return Response.json({ error: 'Admin accounts have inherent access.' }, { status: 400 })
    }

    // 3. Authoritative eligibility check (server-side, uses fresh admin metadata)
    const eligibility = await getSatTrialEligibility(user.id)
    if (!eligibility.eligible) {
      const messages: Record<string, string> = {
        already_premium: 'You already have SAT Premium access.',
        trial_already_claimed: 'You have already claimed your free trial.',
        no_completed_exam: 'Complete a free SAT practice exam first to unlock this offer.',
        user_not_found: 'Account not found.',
        storage_unavailable: 'The free-trial offer is temporarily unavailable. Please try again shortly.',
      }
      return Response.json(
        { error: messages[eligibility.reason] ?? 'Not eligible for a free trial.' },
        { status: eligibility.reason === 'storage_unavailable' ? 500 : 400 }
      )
    }

    const admin = createAdminClient()
    const stripe = getStripe()

    // 4. Validate price ID is configured
    const priceId = process.env.STRIPE_SAT_PREMIUM_MONTHLY_PRICE_ID
    if (!priceId) {
      console.error('[trial-checkout] STRIPE_SAT_PREMIUM_MONTHLY_PRICE_ID not configured')
      return Response.json({ error: 'Trial is not available right now.' }, { status: 500 })
    }

    // 5. Validate the Stripe price matches expected config (recurring monthly, $9.99)
    try {
      const price = await stripe.prices.retrieve(priceId)
      if (
        price.unit_amount !== 999 ||
        price.currency !== 'usd' ||
        price.type !== 'recurring' ||
        price.recurring?.interval !== 'month'
      ) {
        console.error('[trial-checkout] price mismatch', {
          unit_amount: price.unit_amount,
          currency: price.currency,
          type: price.type,
          interval: price.recurring?.interval,
        })
        return Response.json({ error: 'Pricing configuration error. Please contact support.' }, { status: 500 })
      }
    } catch (err) {
      console.error('[trial-checkout] failed to retrieve Stripe price', err)
      return Response.json({ error: 'Unable to verify pricing. Please try again.' }, { status: 500 })
    }

    // 6. Atomically reserve the trial claim BEFORE creating the Stripe session.
    //    UNIQUE (user_id, offer_version) prevents double-claims from race conditions.
    //    If a claim row already exists (23505), check whether a Stripe session was
    //    already created — if so, recover the existing session URL (double-click protection).
    const { error: claimErr } = await admin
      .from('sat_premium_trial_claims')
      .insert({
        user_id: user.id,
        offer_version: OFFER_VERSION,
        acquisition_source: ACQUISITION_SOURCE,
        status: 'pending',
      })

    if (claimErr) {
      if (claimErr.code === '23505') {
        // Row already exists — check whether a Checkout Session was already created
        const { data: existingClaim } = await admin
          .from('sat_premium_trial_claims')
          .select('stripe_checkout_session_id, status')
          .eq('user_id', user.id)
          .maybeSingle()

        if (existingClaim?.stripe_checkout_session_id && existingClaim.status === 'pending') {
          // Session already created (e.g. double-click) — try to reuse it
          try {
            const existing = await stripe.checkout.sessions.retrieve(
              existingClaim.stripe_checkout_session_id
            )
            if (existing.status === 'open' && existing.url) {
              return Response.json({ url: existing.url })
            }
          } catch {
            // Session not retrievable — fall through to the error response
          }
        }

        // Claim exists but no recoverable session
        return Response.json({ error: 'You have already claimed your free trial.' }, { status: 400 })
      }

      if (claimErr.code === '42P01') {
        console.error('[trial-checkout] sat_premium_trial_claims table not yet migrated')
        return Response.json(
          { error: 'The free-trial offer is temporarily unavailable. Please try again shortly.' },
          { status: 500 }
        )
      }

      console.error('[trial-checkout] failed to reserve trial claim', claimErr)
      return Response.json({ error: 'Failed to start trial. Please try again.' }, { status: 500 })
    }

    // 7. Get or create Stripe Customer
    const { data: freshData } = await admin.auth.admin.getUserById(user.id)
    const meta = (freshData?.user?.user_metadata ?? {}) as Record<string, unknown>
    let stripeCustomerId = meta.stripe_customer_id as string | undefined

    if (stripeCustomerId) {
      try {
        const existing = await stripe.customers.retrieve(stripeCustomerId)
        if ((existing as Stripe.DeletedCustomer).deleted) stripeCustomerId = undefined
      } catch {
        stripeCustomerId = undefined
      }
    }

    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: user.email ?? undefined,
        metadata: { mockmate_user_id: user.id },
      })
      stripeCustomerId = customer.id
      await admin.auth.admin.updateUserById(user.id, {
        user_metadata: { stripe_customer_id: stripeCustomerId },
      })
    }

    // 8. Create trial Checkout Session
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
    const trustedMetadata = {
      mockmate_user_id: user.id,
      user_id: user.id,
      product_key: 'sat_premium',
      plan_type: 'monthly',
      is_trial: 'true',
      access_model: 'monthly_subscription',
      acquisition_source: ACQUISITION_SOURCE,
      trial_offer_version: OFFER_VERSION,
      trial_days: '7',
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer: stripeCustomerId,
      client_reference_id: user.id,
      line_items: [{ price: priceId, quantity: 1 }],
      payment_method_collection: 'always',
      allow_promotion_codes: false,
      subscription_data: {
        trial_period_days: 7,
        metadata: trustedMetadata,
      },
      metadata: trustedMetadata,
      success_url: `${appUrl}/sat-premium/trial-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/sat-premium/free-trial?canceled=true`,
    })

    // 9. Store session ID on the claim row
    await admin
      .from('sat_premium_trial_claims')
      .update({
        stripe_checkout_session_id: session.id,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', user.id)
      .eq('offer_version', OFFER_VERSION)

    return Response.json({ url: session.url })
  } catch (err) {
    console.error('[stripe] create-trial-checkout error', err)
    return Response.json({ error: 'Failed to start trial.' }, { status: 500 })
  }
}
