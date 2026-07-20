/**
 * Centralized server-side authorization helpers.
 *
 * All premium and admin checks must go through these functions.
 * Identity is always derived from the server-validated Supabase session —
 * never from browser-supplied values.
 */

/** The one admin email. Never add others here. */
export const ADMIN_EMAIL = 'ranvi.contact@gmail.com'

export interface AuthUser {
  email?: string | null
  user_metadata?: Record<string, unknown>
}

/**
 * Returns true if the authenticated user is the MockMate admin.
 * Client-side display checks may call this; actual protection must be server-side.
 */
export function isAdminUser(user: AuthUser | null | undefined): boolean {
  return user?.email === ADMIN_EMAIL
}

/**
 * Returns true if the user has active SAT Premium access.
 * Source of truth: Supabase user_metadata.sat_upgrade_unlocked (set server-side
 * by the webhook or admin tools). A revoked user will have this set to false.
 */
export function hasSatPremium(user: AuthUser | null | undefined): boolean {
  if (!user) return false
  if (isAdminUser(user)) return true   // admin always has access
  return user.user_metadata?.sat_upgrade_unlocked === true
}
