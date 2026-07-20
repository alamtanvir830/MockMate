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
 * Returns true if the user has active SAT Premium access.
 *
 * Checks (in order):
 * 1. Admin bypass — ranvi.contact@gmail.com always has access.
 * 2. Legacy lifetime — sat_upgrade_unlocked flag set by the old one-time
 *    payment webhook. These users keep permanent access without a subscription.
 * 3. Monthly subscription — sat_subscription_status written by the subscription
 *    webhook. Active, past_due (within Stripe retry window), and trialing all
 *    grant access.
 *
 * All values are read from server-validated Supabase user_metadata.
 * Never call this with a client-supplied object.
 */
export function hasSatPremium(user: AuthUser | null | undefined): boolean {
  if (!user) return false
  if (isAdminUser(user)) return true

  // Legacy lifetime (one-time payment)
  if (user.user_metadata?.sat_upgrade_unlocked === true) return true

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
