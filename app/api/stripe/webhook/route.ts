import { NextRequest } from 'next/server'
import type Stripe from 'stripe'
import { getStripe } from '@/lib/stripe/client'
import { createAdminClient } from '@/lib/supabase/admin'
import {
  unlockSATUpgrade,
  syncSubscription,
  recordInvoicePaid,
  getUserIdByEmail,
  getUserIdBySubscriptionId,
  getUserIdByStripeCustomerId,
  recordOneTimePurchase,
  refundOneTimePurchase,
} from '@/lib/entitlements'
import { SAT_PREMIUM_PLANS, isOneTimePlanKey } from '@/lib/stripe/sat-premium-plans'

// ── Helpers ──────────────────────────────────────────────────────────────────

function toDate(unix: number | null | undefined): Date | null {
  return unix ? new Date(unix * 1000) : null
}

function resolveId(obj: string | { id: string } | null | undefined): string | null {
  if (!obj) return null
  return typeof obj === 'string' ? obj : obj.id
}

/** Resolves the MockMate user ID from a Stripe Subscription object. */
async function resolveUserIdFromSubscription(
  sub: Stripe.Subscription,
  stripe: Stripe
): Promise<string | null> {
  const subId = sub.id
  const customerId = resolveId(sub.customer)

  // 1. From sat_premium_subscriptions table (fastest — exists after checkout.session.completed)
  const bySubId = await getUserIdBySubscriptionId(subId)
  if (bySubId) return bySubId

  // 2. From the sat_premium_subscriptions table by customer ID
  if (customerId) {
    const byCustomer = await getUserIdByStripeCustomerId(customerId)
    if (byCustomer) return byCustomer
  }

  // 3. From Stripe Customer metadata (one extra API call)
  if (customerId) {
    try {
      const customer = await stripe.customers.retrieve(customerId)
      if (!(customer as Stripe.DeletedCustomer).deleted) {
        const uid = (customer as Stripe.Customer).metadata?.mockmate_user_id
        if (uid) return uid
      }
    } catch {}
  }

  // 4. From subscription metadata (set at checkout creation)
  const uid = sub.metadata?.mockmate_user_id
  if (uid) return uid

  return null
}

// ── Handlers ─────────────────────────────────────────────────────────────────

/** Legacy one-time payment (mode: 'payment', product: 'sat_upgrade_999') */
async function handleLegacyCheckout(session: Stripe.Checkout.Session): Promise<void> {
  if (session.payment_status !== 'paid') {
    console.warn(`[webhook] legacy checkout ${session.id} not paid — skipped`)
    return
  }

  let userId: string | null | undefined = session.metadata?.mockmate_user_id ?? session.metadata?.userId
  if (!userId && session.customer_email) {
    userId = await getUserIdByEmail(session.customer_email)
  }
  if (!userId) {
    console.error('[webhook] legacy checkout: could not resolve user for session', session.id)
    return
  }

  const paymentIntentId = resolveId(session.payment_intent)
  const customerId = resolveId(session.customer)

  await unlockSATUpgrade(userId, {
    stripeCustomerId: customerId ?? undefined,
    stripeCheckoutSessionId: session.id,
    stripePaymentIntentId: paymentIntentId ?? undefined,
  })

  console.log(`[webhook] legacy SAT upgrade unlocked for user ${userId}`)
}

/**
 * One-time SAT Premium purchase completed (mode: 'payment', plan three_month
 * or lifetime). Verifies the paid line item matches the trusted server Price ID
 * for the server-assigned plan_type, computes calendar expiry for three_month,
 * and records the purchase idempotently.
 */
async function handleOneTimeCheckout(session: Stripe.Checkout.Session, stripe: Stripe): Promise<void> {
  if (session.payment_status !== 'paid') {
    console.warn(`[webhook] one-time checkout ${session.id} not paid — skipped`)
    return
  }

  const planType = session.metadata?.plan_type
  if (!isOneTimePlanKey(planType)) {
    console.error('[webhook] one-time checkout: invalid plan_type', session.id, planType)
    return
  }

  const userId = session.metadata?.mockmate_user_id ?? session.metadata?.user_id
  if (!userId) {
    console.error('[webhook] one-time checkout: no user id in metadata', session.id)
    return
  }

  // Verify the paid Price matches the trusted server Price ID for this plan.
  const expectedPriceId = SAT_PREMIUM_PLANS[planType].priceId
  if (!expectedPriceId) {
    console.error(`[webhook] one-time checkout: price ID for "${planType}" not configured`)
    return
  }
  try {
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 10 })
    const priceMatches = lineItems.data.some(li => li.price?.id === expectedPriceId)
    if (!priceMatches) {
      console.error(`[webhook] one-time checkout ${session.id} price mismatch for plan "${planType}" — skipped`)
      return
    }
  } catch (err) {
    console.error('[webhook] one-time checkout: failed to list line items', session.id, err)
    return
  }

  const paymentIntentId = resolveId(session.payment_intent)
  const customerId = resolveId(session.customer)

  // Calendar-accurate expiry for three_month; null (no expiry) for lifetime.
  const accessStartedAt = new Date()
  let accessExpiresAt: Date | null = null
  if (planType === 'three_month') {
    const expiry = new Date(accessStartedAt)
    expiry.setMonth(expiry.getMonth() + 3)
    accessExpiresAt = expiry
  }

  try {
    const recorded = await recordOneTimePurchase(userId, {
      planType,
      stripeCustomerId: customerId ?? undefined,
      stripeCheckoutSessionId: session.id,
      stripePaymentIntentId: paymentIntentId ?? undefined,
      accessStartedAt,
      accessExpiresAt,
    })
    if (recorded) {
      console.log(`[webhook] one-time ${planType} purchase recorded for user ${userId}`)
    } else {
      console.log(`[webhook] one-time checkout ${session.id} already processed — idempotent skip`)
    }
  } catch (err) {
    console.error('[webhook] one-time checkout: failed to record purchase', session.id, err)
  }
}

/** New subscription checkout completed — store the subscription immediately. */
async function handleSubscriptionCheckout(session: Stripe.Checkout.Session, stripe: Stripe): Promise<void> {
  const userId = session.metadata?.mockmate_user_id
  if (!userId) {
    console.error('[webhook] subscription checkout: no mockmate_user_id in metadata', session.id)
    return
  }

  const subscriptionId = resolveId(session.subscription)
  if (!subscriptionId) {
    console.error('[webhook] subscription checkout: no subscription on session', session.id)
    return
  }

  const customerId = resolveId(session.customer)
  if (!customerId) {
    console.error('[webhook] subscription checkout: no customer on session', session.id)
    return
  }

  // Retrieve the full subscription object so we have accurate state
  try {
    const sub = await stripe.subscriptions.retrieve(subscriptionId)
    await syncSubscription(userId, {
      stripeCustomerId: customerId,
      stripeSubscriptionId: sub.id,
      stripePriceId: (sub.items.data[0]?.price?.id) ?? undefined,
      stripeProductId: resolveId(sub.items.data[0]?.price?.product) ?? undefined,
      status: sub.status,
      cancelAtPeriodEnd: sub.cancel_at_period_end,
      canceledAt: toDate(sub.canceled_at),
      endedAt: toDate(sub.ended_at),
    })
    console.log(`[webhook] subscription ${sub.id} synced for user ${userId} (status: ${sub.status})`)
  } catch (err) {
    console.error('[webhook] failed to retrieve/sync subscription after checkout', subscriptionId, err)
  }
}

/**
 * Handles customer.subscription.created and customer.subscription.updated.
 * Verify the price matches the expected product before granting access.
 */
async function handleSubscriptionUpdate(sub: Stripe.Subscription, stripe: Stripe): Promise<void> {
  // Verify this is for the SAT Premium price
  const expectedPriceId = process.env.STRIPE_SAT_PREMIUM_MONTHLY_PRICE_ID
  if (expectedPriceId) {
    const priceMatches = sub.items.data.some(item => item.price.id === expectedPriceId)
    if (!priceMatches) {
      console.log(`[webhook] subscription ${sub.id} price mismatch — not SAT Premium, skipped`)
      return
    }
  }

  const userId = await resolveUserIdFromSubscription(sub, stripe)
  if (!userId) {
    console.error('[webhook] subscription update: could not resolve user for subscription', sub.id)
    return
  }

  const customerId = resolveId(sub.customer) ?? ''
  await syncSubscription(userId, {
    stripeCustomerId: customerId,
    stripeSubscriptionId: sub.id,
    stripePriceId: sub.items.data[0]?.price?.id ?? undefined,
    stripeProductId: resolveId(sub.items.data[0]?.price?.product) ?? undefined,
    status: sub.status,
    cancelAtPeriodEnd: sub.cancel_at_period_end,
    canceledAt: toDate(sub.canceled_at),
    endedAt: toDate(sub.ended_at),
  })

  console.log(`[webhook] subscription ${sub.id} updated for user ${userId} (status: ${sub.status})`)
}

/** Handles customer.subscription.deleted — clears active subscription access. */
async function handleSubscriptionDeleted(sub: Stripe.Subscription, stripe: Stripe): Promise<void> {
  const userId = await resolveUserIdFromSubscription(sub, stripe)
  if (!userId) {
    console.error('[webhook] subscription deleted: could not resolve user', sub.id)
    return
  }

  const customerId = resolveId(sub.customer) ?? ''
  await syncSubscription(userId, {
    stripeCustomerId: customerId,
    stripeSubscriptionId: sub.id,
    stripePriceId: sub.items.data[0]?.price?.id ?? undefined,
    status: 'canceled',
    cancelAtPeriodEnd: false,
    canceledAt: toDate(sub.canceled_at) ?? new Date(),
    endedAt: toDate(sub.ended_at) ?? new Date(),
  })

  console.log(`[webhook] subscription ${sub.id} deleted for user ${userId}`)
}

/** Handles invoice.paid — updates the subscription and confirms access. */
async function handleInvoicePaid(invoice: Stripe.Invoice, stripe: Stripe): Promise<void> {
  const subscriptionId = resolveId(
    invoice.parent?.subscription_details?.subscription ?? null
  )
  if (!subscriptionId) return

  try {
    await recordInvoicePaid(subscriptionId, new Date())
  } catch {}

  // Re-sync the subscription to ensure access is still marked active.
  // Use invoice.period_end as currentPeriodEnd since Stripe v22 removed it from Subscription.
  try {
    const sub = await stripe.subscriptions.retrieve(subscriptionId)
    const userId = await resolveUserIdFromSubscription(sub, stripe)
    if (userId) {
      const customerId = resolveId(sub.customer) ?? ''
      await syncSubscription(userId, {
        stripeCustomerId: customerId,
        stripeSubscriptionId: sub.id,
        stripePriceId: sub.items.data[0]?.price?.id ?? undefined,
        status: sub.status,
        currentPeriodEnd: toDate(invoice.period_end) ?? undefined,
        cancelAtPeriodEnd: sub.cancel_at_period_end,
        canceledAt: toDate(sub.canceled_at),
        endedAt: toDate(sub.ended_at),
        latestInvoiceId: invoice.id,
        latestInvoicePaidAt: new Date(),
      })
      console.log(`[webhook] invoice.paid — subscription ${sub.id} confirmed active for user ${userId}`)
    }
  } catch (err) {
    console.error('[webhook] invoice.paid sync error', err)
  }
}

/**
 * Handles invoice.payment_failed.
 * Stripe manages dunning (automatic retries). We log but do not remove access
 * during the retry window; hasSatPremium() treats 'past_due' as having access.
 */
async function handleInvoicePaymentFailed(invoice: Stripe.Invoice): Promise<void> {
  const subscriptionId = resolveId(
    invoice.parent?.subscription_details?.subscription ?? null
  )
  console.warn(`[webhook] invoice.payment_failed for subscription ${subscriptionId ?? 'unknown'} — Stripe will retry`)
}

/**
 * Handles charge.refunded for one-time purchases. Finds the purchase by payment
 * intent and marks it refunded, revoking access if it was the active purchase.
 */
async function handleChargeRefunded(charge: Stripe.Charge): Promise<void> {
  const paymentIntentId = resolveId(charge.payment_intent)
  if (!paymentIntentId) {
    console.warn('[webhook] charge.refunded with no payment_intent — skipped')
    return
  }
  try {
    await refundOneTimePurchase(paymentIntentId)
    console.log(`[webhook] refund processed for payment intent ${paymentIntentId}`)
  } catch (err) {
    console.error('[webhook] charge.refunded handler error', paymentIntentId, err)
  }
}

// ── Main handler ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!sig || !webhookSecret) {
    return Response.json({ error: 'Missing Stripe signature or secret.' }, { status: 400 })
  }

  const stripe = getStripe()
  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
  } catch (err) {
    console.error('[stripe webhook] signature verification failed', err)
    return Response.json({ error: 'Invalid signature.' }, { status: 400 })
  }

  // ── Idempotency guard ────────────────────────────────────────────────────
  // A replayed event must not re-grant or overwrite a manually revoked state.
  const admin = createAdminClient()
  const { error: insertErr } = await admin
    .from('processed_stripe_events')
    .insert({ stripe_event_id: event.id, event_type: event.type })

  if (insertErr) {
    if (insertErr.code === '23505') {
      console.log(`[stripe webhook] duplicate event ignored: ${event.id}`)
      return Response.json({ received: true })
    }
    // Transient DB error — log but continue to avoid blocking Stripe
    console.error('[stripe webhook] failed to record event', event.id, insertErr.message)
  }

  // ── Route events ────────────────────────────────────────────────────────
  try {
    switch (event.type) {
      // ── Legacy one-time payment ──────────────────────────────────────
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        if (session.mode === 'payment' && session.metadata?.product === 'sat_upgrade_999') {
          await handleLegacyCheckout(session)
        } else if (
          session.mode === 'payment' &&
          session.metadata?.product_key === 'sat_premium' &&
          isOneTimePlanKey(session.metadata?.plan_type)
        ) {
          await handleOneTimeCheckout(session, stripe)
        } else if (session.mode === 'subscription' && session.metadata?.product_key === 'sat_premium') {
          await handleSubscriptionCheckout(session, stripe)
        }
        break
      }

      // ── Subscription lifecycle ────────────────────────────────────────
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const sub = event.data.object as Stripe.Subscription
        await handleSubscriptionUpdate(sub, stripe)
        break
      }

      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription
        await handleSubscriptionDeleted(sub, stripe)
        break
      }

      // ── Invoice events ────────────────────────────────────────────────
      case 'invoice.paid': {
        const invoice = event.data.object as Stripe.Invoice
        await handleInvoicePaid(invoice, stripe)
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        await handleInvoicePaymentFailed(invoice)
        break
      }

      // ── One-time purchase refunds ─────────────────────────────────────
      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge
        await handleChargeRefunded(charge)
        break
      }

      default:
        // Unhandled event types are not an error
        break
    }
  } catch (err) {
    console.error(`[stripe webhook] handler error for ${event.type}:`, err)
    // Return 200 so Stripe does not retry indefinitely for non-transient errors.
    // The event is already recorded as processed.
  }

  return Response.json({ received: true })
}
