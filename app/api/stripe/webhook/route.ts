import { NextRequest } from 'next/server'
import { getStripe } from '@/lib/stripe/client'
import { unlockSATUpgrade, getUserIdByEmail } from '@/lib/entitlements'

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
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
  } catch (err) {
    console.error('[stripe webhook] signature verification failed', err)
    return Response.json({ error: 'Invalid signature.' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object

    if (session.metadata?.product !== 'sat_upgrade_999') {
      return Response.json({ received: true })
    }

    let userId: string | null | undefined = session.metadata?.userId
    if (!userId && session.customer_email) {
      userId = await getUserIdByEmail(session.customer_email)
    }

    if (!userId) {
      console.error('[stripe webhook] could not resolve user for session', session.id)
      return Response.json({ error: 'User not found.' }, { status: 422 })
    }

    const paymentIntentId =
      typeof session.payment_intent === 'string' ? session.payment_intent : session.payment_intent?.id

    const customerId =
      typeof session.customer === 'string' ? session.customer : session.customer?.id

    await unlockSATUpgrade(userId, {
      stripeCustomerId: customerId,
      stripeCheckoutSessionId: session.id,
      stripePaymentIntentId: paymentIntentId,
    })

    console.log(`[stripe webhook] SAT upgrade unlocked for user ${userId}`)
  }

  return Response.json({ received: true })
}
