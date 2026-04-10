import { headers } from 'next/headers'
import type Stripe from 'stripe'
import { getStripe, tierFromPriceId } from '@/lib/stripe'
import { createAdminClient } from '@/lib/supabase/admin'

export async function POST(request: Request) {
  // Stripe is not yet configured — return early without crashing
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

  const supabase = createAdminClient()

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const userId = session.metadata?.user_id
        if (!userId || !session.subscription) break

        const subscription = await stripe.subscriptions.retrieve(
          session.subscription as string,
        )
        const priceId = subscription.items.data[0]?.price.id ?? ''
        const tier = tierFromPriceId(priceId)

        await supabase.from('profiles').upsert(
          {
            id: userId,
            stripe_customer_id: session.customer as string,
            stripe_subscription_id: subscription.id,
            subscription_status: 'active',
            subscription_tier: tier,
          },
          { onConflict: 'id' },
        )
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        const userId = await resolveUserId(subscription, supabase)
        if (!userId) break

        const priceId = subscription.items.data[0]?.price.id ?? ''
        const tier =
          subscription.status === 'active' ? tierFromPriceId(priceId) : 'free'

        await supabase
          .from('profiles')
          .update({
            subscription_status: subscription.status,
            subscription_tier: tier,
            stripe_subscription_id: subscription.id,
          })
          .eq('id', userId)
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        const userId = await resolveUserId(subscription, supabase)
        if (!userId) break

        await supabase
          .from('profiles')
          .update({
            subscription_status: 'canceled',
            subscription_tier: 'free',
            stripe_subscription_id: null,
          })
          .eq('id', userId)
        break
      }
    }
  } catch (err) {
    console.error('Webhook handler error:', err)
    return new Response('Internal error', { status: 500 })
  }

  return new Response('ok', { status: 200 })
}

// Resolve user_id from subscription metadata, falling back to stripe_customer_id lookup
async function resolveUserId(
  subscription: Stripe.Subscription,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  supabase: any,
): Promise<string | null> {
  if (subscription.metadata?.user_id) return subscription.metadata.user_id

  const { data } = await supabase
    .from('profiles')
    .select('id')
    .eq('stripe_customer_id', subscription.customer as string)
    .single()

  return data?.id ?? null
}
