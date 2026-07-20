import { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getStripe } from '@/lib/stripe/client'
import { isAdminUser, isLegacyLifetimeUser, hasSatPremium } from '@/lib/auth/server'
import type Stripe from 'stripe'

export async function POST(_req: NextRequest) {
  try {
    // ── 1. Authenticate ────────────────────────────────────────────────────
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return Response.json({ error: 'You must be signed in to subscribe.' }, { status: 401 })
    }

    // ── 2. Block admin from purchasing ────────────────────────────────────
    if (isAdminUser(user)) {
      return Response.json({ error: 'Admin accounts have inherent access.' }, { status: 400 })
    }

    // ── 3. Read fresh metadata to bypass JWT cache ────────────────────────
    const admin = createAdminClient()
    const { data: freshData } = await admin.auth.admin.getUserById(user.id)
    const meta = (freshData?.user?.user_metadata ?? user.user_metadata ?? {}) as Record<string, unknown>
    const freshUser = { email: user.email, user_metadata: meta }

    // ── 4. Block legacy lifetime purchasers from subscribing again ─────────
    if (isLegacyLifetimeUser(freshUser)) {
      return Response.json(
        { error: 'You already have Legacy Lifetime Access. No subscription is needed.' },
        { status: 400 }
      )
    }

    // ── 5. Validate the subscription Price ID env var ─────────────────────
    const priceId = process.env.STRIPE_SAT_PREMIUM_MONTHLY_PRICE_ID
    if (!priceId) {
      console.error('[checkout] STRIPE_SAT_PREMIUM_MONTHLY_PRICE_ID is not configured')
      return Response.json({ error: 'Subscription not configured. Please try again later.' }, { status: 500 })
    }

    const stripe = getStripe()

    // ── 6. Get or create the Stripe Customer ──────────────────────────────
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

    // ── 7. Block duplicate active subscriptions ───────────────────────────
    if (hasSatPremium(freshUser)) {
      const subs = await stripe.subscriptions.list({
        customer: stripeCustomerId,
        limit: 10,
      })
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

    // ── 8. Create the subscription Checkout Session ───────────────────────
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer: stripeCustomerId,
      line_items: [{ price: priceId, quantity: 1 }],
      allow_promotion_codes: true,
      subscription_data: {
        metadata: {
          mockmate_user_id: user.id,
          product_key: 'sat_premium',
          access_model: 'monthly_subscription',
        },
      },
      metadata: {
        mockmate_user_id: user.id,
        product_key: 'sat_premium',
        access_model: 'monthly_subscription',
      },
      success_url: `${appUrl}/payment/success`,
      cancel_url: `${appUrl}/billing?canceled=true`,
      customer_email: stripeCustomerId ? undefined : (user.email ?? undefined),
    })

    return Response.json({ url: session.url })
  } catch (err) {
    console.error('[stripe] create-checkout-session error', err)
    return Response.json({ error: 'Failed to create checkout session.' }, { status: 500 })
  }
}
