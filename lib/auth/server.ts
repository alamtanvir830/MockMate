/** The one admin email. Never add others here. */
export const ADMIN_EMAIL = 'ranvi.contact@gmail.com'

export interface AuthUser {
  email?: string | null
  user_metadata?: Record<string, unknown>
}

export function isAdminUser(user: AuthUser | null | undefined): boolean {
  return user?.email === ADMIN_EMAIL
}

/**
 * Returns true if an active one-time purchase (three_month or lifetime) is
 * recorded in user_metadata. The webhook writes these flags after a verified
 * Stripe payment. A three_month purchase also requires that its expiry has not
 * yet passed.
 */
function hasActiveOneTimePurchase(user: AuthUser): boolean {
  const meta = user.user_metadata
  if (!meta) return false

  const planType = meta.sat_purchase_plan_type as string | undefined
  const status = meta.sat_purchase_status as string | undefined
  if (status !== 'active') return false

  if (planType === 'lifetime') return true

  if (planType === 'three_month') {
    const expiresAt = meta.sat_purchase_expires_at as string | undefined
    if (!expiresAt) return false
    const expiry = new Date(expiresAt).getTime()
    if (Number.isNaN(expiry)) return false
    return expiry > Date.now()
  }

  return false
}

/**
 * Returns true if the user has active SAT Premium access.
 *
 * Checks (in order):
 * 1. Admin bypass — ranvi.contact@gmail.com always has access.
 * 2. Legacy lifetime — sat_upgrade_unlocked flag set by the old one-time
 *    payment webhook. These users keep permanent access without a subscription.
 * 3. One-time purchase — an active lifetime purchase, or a three_month purchase
 *    whose access_expires_at is still in the future. Written to user_metadata by
 *    the checkout.session.completed webhook.
 * 4. Monthly subscription — sat_subscription_status written by the subscription
 *    webhook. Active, past_due (within Stripe retry window), and trialing all
 *    grant access.
 *
 * All values are read from server-validated Supabase user_metadata.
 * Never call this with a client-supplied object.
 */
export function hasSatPremium(user: AuthUser | null | undefined): boolean {
  if (!user) return false
  if (isAdminUser(user)) return true

  // Legacy lifetime (original one-time payment)
  if (user.user_metadata?.sat_upgrade_unlocked === true) return true

  // New one-time purchases (lifetime / three_month)
  if (hasActiveOneTimePurchase(user)) return true

  // Monthly subscription
  const subStatus = user.user_metadata?.sat_subscription_status as string | undefined
  if (subStatus === 'active' || subStatus === 'past_due' || subStatus === 'trialing') return true

  return false
}

/**
 * Returns true only for users who paid the original one-time lifetime price.
 * Monthly subscribers are NOT legacy lifetime users.
 * Detection: sat_upgrade_unlocked is true AND stripe_payment_intent_id is set
 * (the old webhook is the only code path that writes stripe_payment_intent_id).
 */
export function isLegacyLifetimeUser(user: AuthUser | null | undefined): boolean {
  if (!user) return false
  if (isAdminUser(user)) return false
  return (
    user.user_metadata?.sat_upgrade_unlocked === true &&
    typeof user.user_metadata?.stripe_payment_intent_id === 'string' &&
    (user.user_metadata.stripe_payment_intent_id as string).length > 0
  )
}

/** Returns true for an active new Lifetime Access purchase (not legacy). */
export function hasLifetimePurchase(user: AuthUser | null | undefined): boolean {
  if (!user) return false
  return (
    user.user_metadata?.sat_purchase_plan_type === 'lifetime' &&
    user.user_metadata?.sat_purchase_status === 'active'
  )
}

/** Returns true for an active, non-expired 3-Month Access purchase. */
export function hasActiveThreeMonthPurchase(user: AuthUser | null | undefined): boolean {
  if (!user) return false
  const meta = user.user_metadata
  if (!meta) return false
  if (meta.sat_purchase_plan_type !== 'three_month') return false
  if (meta.sat_purchase_status !== 'active') return false
  const expiresAt = meta.sat_purchase_expires_at as string | undefined
  if (!expiresAt) return false
  const expiry = new Date(expiresAt).getTime()
  if (Number.isNaN(expiry)) return false
  return expiry > Date.now()
}
