import { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getStripe } from '@/lib/stripe/client'

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return Response.json({ error: 'You must be logged in to purchase.' }, { status: 401 })
    }

    if (user.user_metadata?.sat_upgrade_unlocked === true) {
      return Response.json({ error: 'You already have the SAT Upgrade.' }, { status: 400 })
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
    const priceId = process.env.STRIPE_PRICE_ID_SAT_UPGRADE

    if (!priceId) {
      return Response.json({ error: 'Stripe price not configured.' }, { status: 500 })
    }

    const stripe = getStripe()
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price: priceId, quantity: 1 }],
      allow_promotion_codes: true,
      success_url: `${appUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/pricing?canceled=true`,
      customer_email: user.email,
      metadata: {
        product: 'sat_upgrade_999',
        userId: user.id,
        email: user.email ?? '',
      },
    })

    return Response.json({ url: session.url })
  } catch (err) {
    console.error('[stripe] create-checkout-session error', err)
    return Response.json({ error: 'Failed to create checkout session.' }, { status: 500 })
  }
}
