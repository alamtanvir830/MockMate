/**
 * Trusted server-side SAT Premium plan configuration.
 *
 * The client never sends a Price ID, amount, mode, or expiration. It sends only
 * a `planKey` ('monthly' | 'three_month' | 'lifetime'); the checkout endpoint
 * maps that key to the values below. Price IDs come exclusively from server env
 * vars configured in Vercel.
 *
 * NEVER import this into a client component.
 */

export interface SatPremiumPlan {
  priceId: string | undefined
  mode: 'subscription' | 'payment'
  label: string
  /** Only set for the fixed-duration one-time plan. */
  durationMonths?: number
  /** Expected price in cents, validated against Stripe before checkout. */
  expectedCents: number
}

export const SAT_PREMIUM_PLANS = {
  monthly: {
    priceId: process.env.STRIPE_SAT_PREMIUM_MONTHLY_PRICE_ID,
    mode: 'subscription',
    label: 'Monthly',
    expectedCents: 999,
  },
  three_month: {
    priceId: process.env.STRIPE_SAT_PREMIUM_3_MONTH_PRICE_ID,
    mode: 'payment',
    label: '3-Month Access',
    durationMonths: 3,
    expectedCents: 2499,
  },
  lifetime: {
    priceId: process.env.STRIPE_SAT_PREMIUM_LIFETIME_PRICE_ID,
    mode: 'payment',
    label: 'Lifetime Access',
    expectedCents: 2999,
  },
} as const satisfies Record<string, SatPremiumPlan>

export type SatPremiumPlanKey = keyof typeof SAT_PREMIUM_PLANS

/** One-time (mode: 'payment') plan keys. */
export type SatPremiumOneTimePlanKey = 'three_month' | 'lifetime'

export function isSatPremiumPlanKey(value: unknown): value is SatPremiumPlanKey {
  return value === 'monthly' || value === 'three_month' || value === 'lifetime'
}

export function isOneTimePlanKey(value: unknown): value is SatPremiumOneTimePlanKey {
  return value === 'three_month' || value === 'lifetime'
}
