/**
 * Centralized SAT Question Bank access helper.
 *
 * Usage (server-side, in route handlers or Server Components):
 *   const supabase = await createClient()
 *   const { data: { user } } = await supabase.auth.getUser()
 *   const access = getQBAccess(user)
 *   if (!access.hasPremiumAccess) redirect('/question-bank?locked=1')
 */

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

  const isAdmin = user.email === 'ranvi.contact@gmail.com'
  const subStatus = user.user_metadata?.sat_subscription_status as string | undefined
  const hasActiveSub = subStatus === 'active' || subStatus === 'past_due' || subStatus === 'trialing'
  const hasPremium = isAdmin || user.user_metadata?.sat_upgrade_unlocked === true || hasActiveSub

  return {
    hasPremiumAccess: hasPremium,
    isAdmin,
    canCreatePracticeSet: hasPremium,
    canResumeExistingSet: hasPremium,
    canViewHistoricalResults: true,
    lockedReason: hasPremium ? null : 'SAT Premium required',
  }
}
