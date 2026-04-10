'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getStripe } from '@/lib/stripe'

export async function createCheckoutSession(
  priceId: string,
): Promise<{ error: string } | void> {
  if (!process.env.STRIPE_SECRET_KEY) {
    return { error: 'Billing is not available yet.' }
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const { data: profile } = await supabase
    .from('profiles')
    .select('stripe_customer_id, subscription_tier')
    .eq('id', user.id)
    .single()

  const stripe = getStripe()
  const session = await stripe.checkout.sessions.create({
    ...(profile?.stripe_customer_id
      ? { customer: profile.stripe_customer_id }
      : { customer_email: user.email ?? undefined }),
    line_items: [{ price: priceId, quantity: 1 }],
    mode: 'subscription',
    success_url: `${process.env.APP_URL}/billing?success=true`,
    cancel_url: `${process.env.APP_URL}/billing`,
    metadata: { user_id: user.id },
    subscription_data: { metadata: { user_id: user.id } },
  })

  redirect(session.url!)
}

export async function createPortalSession(): Promise<{ error: string } | void> {
  if (!process.env.STRIPE_SECRET_KEY) {
    return { error: 'Billing is not available yet.' }
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const { data: profile } = await supabase
    .from('profiles')
    .select('stripe_customer_id')
    .eq('id', user.id)
    .single()

  if (!profile?.stripe_customer_id) return { error: 'No billing account found' }

  const stripe = getStripe()
  const session = await stripe.billingPortal.sessions.create({
    customer: profile.stripe_customer_id,
    return_url: `${process.env.APP_URL}/billing`,
  })

  redirect(session.url)
}
