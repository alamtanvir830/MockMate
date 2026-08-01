import { headers } from 'next/headers'
import type Stripe from 'stripe'
import { getStripe } from '@/lib/stripe/client'
import { createAdminClient } from '@/lib/supabase/admin'
import {
  syncSubscription,
  unlockSATUpgrade,
  recordOneTimePurchase,
  getUserIdBySubscriptionId,
  getUserIdByStripeCustomerId,
} from '@/lib/entitlements'
import { SAT_PREMIUM_PLANS, isOneTimePlanKey } from '@/lib/stripe/sat-premium-plans'

// Legacy endpoint — kept so existing Stripe webhook configurations continue to work.
// Uses the same entitlement functions as /api/stripe/webhook to ensure user_metadata
// is always updated correctly regardless of which URL Stripe fires at.
// The processed_stripe_events idempotency guard prevents double-processing if both
// endpoints are registered.

export async function POST(request: Request) {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return new Response('Stripe not configured', { status: 503 })
  }

  const body = await request.text()
  const headersList = await headers()
  const sig = headersList.get('stripe-signature')

  if (!sig) {
    return new Response('Missing stripe-signature header', { status: 400 })
  }

  const stripe = getStripe()

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    return new Response(
      `Webhook signature verification failed: ${err instanceof Error ? err.message : 'unknown'}`,
      { status: 400 },
    )
  }

  // Idempotency — same guard as /api/stripe/webhook. Both endpoints share the same
  // processed_stripe_events table so a replayed or double-delivered event is a no-op.
  const admin = createAdminClient()
  const { error: insertErr } = await admin
    .from('processed_stripe_events')
    .insert({ stripe_event_id: event.id, event_type: event.type })

  if (insertErr) {
    if (insertErr.code === '23505') {
      console.log(`[webhooks/stripe] duplicate event ignored: ${event.id}`)
      return new Response('ok', { status: 200 })
    }
    console.error('[webhooks/stripe] failed to record event', event.id, insertErr.message)
  }

  function resolveId(obj: string | { id: string } | null | undefined): string | null {
    if (!obj) return null
    return typeof obj === 'string' ? obj : obj.id
  }

  function toDate(unix: number | null | undefined): Date | null {
    return unix ? new Date(unix * 1000) : null
  }

  async function resolveUserId(sub: Stripe.Subscription): Promise<string | null> {
    if (sub.metadata?.mockmate_user_id) return sub.metadata.mockmate_user_id
    if (sub.metadata?.user_id) return sub.metadata.user_id
    const subUserId = await getUserIdBySubscriptionId(sub.id)
    if (subUserId) return subUserId
    const customerId = resolveId(sub.customer)
    if (customerId) {
      const byCustomer = await getUserIdByStripeCustomerId(customerId)
      if (byCustomer) return byCustomer
    }
    return null
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const userId =
          session.metadata?.mockmate_user_id ??
          session.metadata?.user_id ??
          null
        if (!userId) break

        if (session.mode === 'payment' && session.metadata?.product === 'sat_upgrade_999') {
          // Legacy one-time payment
          await unlockSATUpgrade(userId, {
            stripeCustomerId: resolveId(session.customer) ?? undefined,
            stripeCheckoutSessionId: session.id,
            stripePaymentIntentId: resolveId(session.payment_intent) ?? undefined,
          })
        } else if (
          session.mode === 'payment' &&
          session.metadata?.product_key === 'sat_premium' &&
          isOneTimePlanKey(session.metadata?.plan_type)
        ) {
          // One-time SAT Premium purchase
          const planType = session.metadata.plan_type as 'three_month' | 'lifetime'
          const expectedPriceId = SAT_PREMIUM_PLANS[planType]?.priceId
          if (expectedPriceId) {
            try {
              const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 10 })
              if (!lineItems.data.some(li => li.price?.id === expectedPriceId)) break
            } catch { break }
          }

          const accessStartedAt = new Date()
          let accessExpiresAt: Date | null = null
          if (planType === 'three_month') {
            accessExpiresAt = new Date(accessStartedAt)
            accessExpiresAt.setMonth(accessExpiresAt.getMonth() + 3)
          }

          await recordOneTimePurchase(userId, {
            planType,
            stripeCustomerId: resolveId(session.customer) ?? undefined,
            stripeCheckoutSessionId: session.id,
            stripePaymentIntentId: resolveId(session.payment_intent) ?? undefined,
            accessStartedAt,
            accessExpiresAt,
          })
        } else if (session.mode === 'subscription' && session.metadata?.product_key === 'sat_premium') {
          // Subscription checkout
          const subscriptionId = resolveId(session.subscription)
          const customerId = resolveId(session.customer)
          if (!subscriptionId || !customerId) break

          const sub = await stripe.subscriptions.retrieve(subscriptionId)
          await syncSubscription(userId, {
            stripeCustomerId: customerId,
            stripeSubscriptionId: sub.id,
            stripePriceId: sub.items.data[0]?.price?.id ?? undefined,
            status: sub.status,
            cancelAtPeriodEnd: sub.cancel_at_period_end,
            canceledAt: toDate(sub.canceled_at),
            endedAt: toDate(sub.ended_at),
          })
        }
        break
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const sub = event.data.object as Stripe.Subscription
        const userId = await resolveUserId(sub)
        if (!userId) break

        await syncSubscription(userId, {
          stripeCustomerId: resolveId(sub.customer) ?? '',
          stripeSubscriptionId: sub.id,
          stripePriceId: sub.items.data[0]?.price?.id ?? undefined,
          status: sub.status,
          cancelAtPeriodEnd: sub.cancel_at_period_end,
          canceledAt: toDate(sub.canceled_at),
          endedAt: toDate(sub.ended_at),
        })
        break
      }

      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription
        const userId = await resolveUserId(sub)
        if (!userId) break

        await syncSubscription(userId, {
          stripeCustomerId: resolveId(sub.customer) ?? '',
          stripeSubscriptionId: sub.id,
          status: 'canceled',
          cancelAtPeriodEnd: false,
          canceledAt: toDate(sub.canceled_at) ?? new Date(),
          endedAt: toDate(sub.ended_at) ?? new Date(),
        })
        break
      }
    }
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : String(err)
    // If a required database table is missing, return 503 so Stripe retries
    // until the migration is applied. For all other errors (non-transient
    // business logic failures) return 200 to stop retries.
    if (
      errMsg.includes('sat_premium_purchases') ||
      errMsg.includes('sat_premium_subscriptions')
    ) {
      console.error('[webhooks/stripe] missing table error — returning 503 to trigger retry:', err)
      return Response.json({ error: 'Database table missing' }, { status: 503 })
    }
    console.error('[webhooks/stripe] handler error:', err)
    return new Response('Internal error', { status: 500 })
  }

  return new Response('ok', { status: 200 })
}
