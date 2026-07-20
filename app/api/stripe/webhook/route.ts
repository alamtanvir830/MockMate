import { NextRequest } from 'next/server'
import { getStripe } from '@/lib/stripe/client'
import { unlockSATUpgrade, getUserIdByEmail } from '@/lib/entitlements'
import { createAdminClient } from '@/lib/supabase/admin'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!sig || !webhookSecret) {
    return Response.json({ error: 'Missing Stripe signature or secret.' }, { status: 400 })
  }

  const stripe = getStripe()
  let event

  try {
    // constructEvent verifies the signature against the raw body before any parsing
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
  } catch (err) {
    console.error('[stripe webhook] signature verification failed', err)
    return Response.json({ error: 'Invalid signature.' }, { status: 400 })
  }

  // ── Idempotency: reject duplicate event IDs ──────────────────────────────
  // Prevents a replayed or re-delivered event from regranting access
  // after a manual premium revocation.
  const admin = createAdminClient()
  const { error: insertErr } = await admin
    .from('processed_stripe_events')
    .insert({ stripe_event_id: event.id, event_type: event.type })

  if (insertErr) {
    if (insertErr.code === '23505') {
      // Unique constraint violation — already processed
      console.log(`[stripe webhook] duplicate event ignored: ${event.id}`)
      return Response.json({ received: true })
    }
    // Log but continue — do not block fulfillment on a transient DB error
    console.error('[stripe webhook] failed to record event', event.id, insertErr.message)
  }

  // ── checkout.session.completed ────────────────────────────────────────────
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object

    // Only fulfil the expected product
    if (session.metadata?.product !== 'sat_upgrade_999') {
      return Response.json({ received: true })
    }

    // Verify payment status — never grant access for an unpaid session
    if (session.payment_status !== 'paid') {
      console.warn(`[stripe webhook] session ${session.id} not paid (status: ${session.payment_status})`)
      return Response.json({ received: true })
    }

    // Resolve user from server-set metadata (written at checkout session creation)
    let userId: string | null | undefined = session.metadata?.userId
    if (!userId && session.customer_email) {
      userId = await getUserIdByEmail(session.customer_email)
    }

    if (!userId) {
      console.error('[stripe webhook] could not resolve user for session', session.id)
      return Response.json({ error: 'User not found.' }, { status: 422 })
    }

    const paymentIntentId =
      typeof session.payment_intent === 'string'
        ? session.payment_intent
        : session.payment_intent?.id

    const customerId =
      typeof session.customer === 'string'
        ? session.customer
        : session.customer?.id

    await unlockSATUpgrade(userId, {
      stripeCustomerId: customerId,
      stripeCheckoutSessionId: session.id,
      stripePaymentIntentId: paymentIntentId,
    })

    console.log(`[stripe webhook] SAT upgrade unlocked for user ${userId}`)
  }

  return Response.json({ received: true })
}
