import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-03-31.basil',
})

export function tierFromPriceId(priceId: string): 'pro' | 'premium' | 'free' {
  if (priceId === process.env.STRIPE_PRO_PRICE_ID) return 'pro'
  if (priceId === process.env.STRIPE_PREMIUM_PRICE_ID) return 'premium'
  return 'free'
}
