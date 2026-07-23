import type { SatPremiumPlanKey } from '@/lib/stripe/sat-premium-plans'
import type { EntitlementData } from '@/lib/entitlements'

/** True for an active new Lifetime Access purchase (not legacy). */
export function isLifetimePurchaseActive(e: EntitlementData): boolean {
  return e.satPurchasePlanType === 'lifetime' && e.satPurchaseStatus === 'active'
}

/** True for an active, non-expired 3-Month Access purchase. */
export function isThreeMonthPurchaseActive(e: EntitlementData): boolean {
  if (e.satPurchasePlanType !== 'three_month' || e.satPurchaseStatus !== 'active') return false
  if (!e.satPurchaseExpiresAt) return false
  const expiry = new Date(e.satPurchaseExpiresAt).getTime()
  return !Number.isNaN(expiry) && expiry > Date.now()
}

// Legacy single-plan config kept for the compact upgrade banner and any existing importers.
export const SAT_PREMIUM_PRICING = {
  amountCents: 999,
  currency: 'usd',
  interval: 'month' as const,
  displayPrice: '$9.99',
  displayInterval: '/month',
  displayFull: '$9.99/month',
  checkoutLabel: 'Start SAT Premium — $9.99/month',
  billingDisclosure: 'Billed monthly. Cancel anytime.',
  badgeText: 'Monthly Subscription',
} as const

// Client-safe display metadata for the three-plan pricing UI. No Price IDs or
// secrets here — those live server-side in lib/stripe/sat-premium-plans.ts.
export interface SatPremiumPlanDisplay {
  key: SatPremiumPlanKey
  title: string
  price: string
  cadence: string
  supporting: string
  savingsLabel: string
  buttonLabel: string
  badge?: string
  featured?: boolean
}

export const SAT_PREMIUM_PLAN_CARDS: SatPremiumPlanDisplay[] = [
  {
    key: 'monthly',
    title: 'Monthly',
    price: '$9.99',
    cadence: 'per month',
    supporting: 'Billed monthly and automatically renews. Cancel any time.',
    savingsLabel: 'Flexible',
    buttonLabel: 'Choose Monthly',
  },
  {
    key: 'three_month',
    title: '3-Month Access',
    price: '$24.99',
    cadence: 'one-time payment',
    supporting: 'Three months of SAT Premium access. No automatic renewal.',
    savingsLabel: 'Save $4.98 compared with three monthly payments',
    buttonLabel: 'Get 3 Months',
  },
  {
    key: 'lifetime',
    title: 'Lifetime Access',
    price: '$29.99',
    cadence: 'one-time payment',
    supporting: 'Lifetime SAT Premium access with no recurring payments.',
    savingsLabel: 'Pay once, keep forever',
    buttonLabel: 'Get Lifetime Access',
    badge: 'Best Value',
    featured: true,
  },
]

export const SAT_PREMIUM_CARD_FEATURES: string[] = [
  'SAT Exam Forms 1–5',
  '700+ question bank',
  'SAT Reading & Writing Academy',
  'SAT Math & Desmos Academy',
  'Personalized score reports',
  'Full access during the purchased access period',
]
