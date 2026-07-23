import { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getStripe } from '@/lib/stripe/client'
import {
  isAdminUser,
  isLegacyLifetimeUser,
  hasSatPremium,
  hasLifetimePurchase,
  hasActiveThreeMonthPurchase,
} from '@/lib/auth/server'
import {
  SAT_PREMIUM_PLANS,
  isSatPremiumPlanKey,
  type SatPremiumPlanKey,
} from '@/lib/stripe/sat-premium-plans'
import type Stripe from 'stripe'

export async function POST(req: NextRequest) {
  try {
    // ── 1. Authenticate ────────────────────────────────────────────────────
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return Response.json({ error: 'You must be signed in to continue.' }, { status: 401 })
    }

    // ── 2. Resolve the requested plan (server maps key → trusted config) ───
    // Default to 'monthly' so the legacy no-body caller keeps working.
    const body = (await req.json().catch(() => ({}))) as { planKey?: unknown }
    const planKey: SatPremiumPlanKey = isSatPremiumPlanKey(body.planKey) ? body.planKey : 'monthly'
    const plan = SAT_PREMIUM_PLANS[planKey]

    // ── 3. Block admin from purchasing ────────────────────────────────────
    if (isAdminUser(user)) {
      return Response.json({ error: 'Admin accounts have inherent access.' }, { status: 400 })
    }

    // ── 4. Read fresh metadata to bypass JWT cache ────────────────────────
    const admin = createAdminClient()
    const { data: freshData } = await admin.auth.admin.getUserById(user.id)
    const meta = (freshData?.user?.user_metadata ?? user.user_metadata ?? {}) as Record<string, unknown>
    const freshUser = { email: user.email, user_metadata: meta }

    // ── 5. Duplicate-purchase protection (highest access wins) ────────────
    // Legacy or new Lifetime = permanent access; block any new purchase.
    if (isLegacyLifetimeUser(freshUser)) {
      return Response.json(
        { error: 'You already have Legacy Lifetime Access. No purchase is needed.' },
        { status: 400 }
      )
    }
    if (hasLifetimePurchase(freshUser)) {
      return Response.json(
        { error: 'You already have Lifetime SAT Premium access. No purchase is needed.' },
        { status: 400 }
      )
    }
    // Active 3-Month → block a new one-time purchase until it expires.
    if (planKey !== 'monthly' && hasActiveThreeMonthPurchase(freshUser)) {
      return Response.json(
        { error: 'You already have active 3-Month SAT Premium access. You can purchase again once it expires.' },
        { status: 400 }
      )
    }

    // ── 6. Validate the Price ID env var for the requested plan ───────────
    const priceId = plan.priceId
    if (!priceId) {
      console.error(`[checkout] price ID for plan "${planKey}" is not configured`)
      return Response.json({ error: 'This plan is not available right now. Please try again later.' }, { status: 500 })
    }

    const stripe = getStripe()

    // ── 6b. Validate the Stripe Price matches expected config ──────────────
    // Prevents mispriced checkout if an env var points at the wrong price.
    // The price ID itself comes exclusively from the server-side env var.
    try {
      const price = await stripe.prices.retrieve(priceId)
      const expectedType = plan.mode === 'subscription' ? 'recurring' : 'one_time'
      const recurringOk =
        plan.mode === 'subscription' ? price.recurring?.interval === 'month' : price.recurring == null
      if (
        price.unit_amount !== plan.expectedCents ||
        price.currency !== 'usd' ||
        price.type !== expectedType ||
        !recurringOk
      ) {
        console.error(`[checkout] price mismatch for plan "${planKey}"`, {
          unit_amount: price.unit_amount,
          currency: price.currency,
          type: price.type,
          interval: price.recurring?.interval,
        })
        return Response.json(
          { error: 'Pricing configuration error. Please contact support.' },
          { status: 500 }
        )
      }
    } catch (priceErr) {
      console.error('[checkout] failed to retrieve Stripe price for validation', priceErr)
      return Response.json({ error: 'Unable to verify pricing. Please try again.' }, { status: 500 })
    }

    // ── 7. Get or create the Stripe Customer ──────────────────────────────
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
      // Persist immediately so the webhook can resolve the customer → user mapping
      await admin.auth.admin.updateUserById(user.id, {
        user_metadata: { stripe_customer_id: stripeCustomerId },
      })
    }

    // ── 8. Monthly: block duplicate active subscriptions ──────────────────
    if (planKey === 'monthly' && hasSatPremium(freshUser)) {
      const subs = await stripe.subscriptions.list({ customer: stripeCustomerId, limit: 10 })
      const activeSub = subs.data.find(s =>
        ['active', 'trialing', 'past_due', 'incomplete'].includes(s.status)
      )
      if (activeSub) {
        return Response.json(
          { error: 'You already have an active SAT Premium subscription.' },
          { status: 400 }
        )
      }
    }

    // ── 9. Create the Checkout Session ────────────────────────────────────
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
    const trustedMetadata: Record<string, string> = {
      mockmate_user_id: user.id,
      user_id: user.id,
      product_key: 'sat_premium',
      plan_type: planKey, // server-assigned, never from the client
    }

    let session: Stripe.Checkout.Session
    if (plan.mode === 'subscription') {
      session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        customer: stripeCustomerId,
        line_items: [{ price: priceId, quantity: 1 }],
        allow_promotion_codes: true,
        subscription_data: {
          metadata: { ...trustedMetadata, access_model: 'monthly_subscription' },
        },
        metadata: { ...trustedMetadata, access_model: 'monthly_subscription' },
        success_url: `${appUrl}/payment/success`,
        cancel_url: `${appUrl}/billing?canceled=true`,
      })
    } else {
      session = await stripe.checkout.sessions.create({
        mode: 'payment',
        customer: stripeCustomerId,
        line_items: [{ price: priceId, quantity: 1 }],
        allow_promotion_codes: true,
        payment_intent_data: {
          metadata: { ...trustedMetadata, access_model: 'one_time' },
        },
        metadata: { ...trustedMetadata, access_model: 'one_time' },
        success_url: `${appUrl}/payment/success`,
        cancel_url: `${appUrl}/billing?canceled=true`,
      })
    }

    return Response.json({ url: session.url })
  } catch (err) {
    console.error('[stripe] create-checkout-session error', err)
    return Response.json({ error: 'Failed to create checkout session.' }, { status: 500 })
  }
}
