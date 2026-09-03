/**
 * Centralized SAT Question Bank access helper.
 *
 * Usage (server-side, in route handlers or Server Components):
 *   const supabase = await createClient()
 *   const { data: { user } } = await supabase.auth.getUser()
 *   const access = getQBAccess(await getFreshAuthUser(user))
 *   if (!access.hasPremiumAccess) redirect('/question-bank?locked=1')
 *
 * Always pass getFreshAuthUser(user) (from '@/lib/entitlements'), never the raw
 * session user — the session JWT can lag behind webhook-written entitlement
 * updates until it naturally refreshes.
 */

import { isAdminUser, hasSatPremium } from '@/lib/auth/server'

export interface QBAccessResult {
  hasPremiumAccess: boolean
  isAdmin: boolean
  canCreatePracticeSet: boolean
  canResumeExistingSet: boolean
  /** Viewing completed QB results is always allowed — students own their history. */
  canViewHistoricalResults: true
  lockedReason: string | null
}

export function getQBAccess(
  user: { email?: string | null; user_metadata?: Record<string, unknown> } | null | undefined
): QBAccessResult {
  if (!user) {
    return {
      hasPremiumAccess: false,
      isAdmin: false,
      canCreatePracticeSet: false,
      canResumeExistingSet: false,
      canViewHistoricalResults: true,
      lockedReason: 'Sign in required',
    }
  }

  const isAdmin = isAdminUser(user)
  const hasPremium = hasSatPremium(user)

  return {
    hasPremiumAccess: hasPremium,
    isAdmin,
    canCreatePracticeSet: hasPremium,
    canResumeExistingSet: hasPremium,
    canViewHistoricalResults: true,
    lockedReason: hasPremium ? null : 'SAT Premium required',
  }
}
