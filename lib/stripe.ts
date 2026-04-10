import Stripe from 'stripe'

// Lazily initialised — safe to import when STRIPE_SECRET_KEY is absent.
// Call getStripe() only in code paths that are guarded by a key check.
export function getStripe(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('Stripe is not configured: STRIPE_SECRET_KEY is missing')
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-03-31.basil',
  })
}

export function tierFromPriceId(priceId: string): 'pro' | 'premium' | 'free' {
  if (priceId === process.env.STRIPE_PRO_PRICE_ID) return 'pro'
  if (priceId === process.env.STRIPE_PREMIUM_PRICE_ID) return 'premium'
  return 'free'
}
