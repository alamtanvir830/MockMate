import { createAdminClient } from '@/lib/supabase/admin'
import { hasSatPremium } from '@/lib/auth/server'

export interface SatTrialEligibility {
  eligible: boolean
  reason:
    | 'eligible'
    | 'already_premium'
    | 'trial_already_claimed'
    | 'no_completed_exam'
    | 'user_not_found'
    | 'storage_unavailable'
}

/**
 * Server-side authoritative trial eligibility check.
 *
 * A user is eligible when ALL are true:
 * 1. They exist in Supabase Auth (user_not_found guard).
 * 2. They do NOT currently have SAT Premium (any type: legacy, one-time,
 *    subscription — including admin bypass). Uses fresh metadata via admin
 *    client to bypass JWT cache staleness.
 * 3. They do NOT have an active or converted trial. Only status values
 *    'trialing' and 'converted' represent a real trial — 'pending' (abandoned
 *    checkout), 'expired' (session expired), and 'canceled' do not block
 *    re-eligibility. The DB unique constraint on (user_id, offer_version) still
 *    prevents double-claiming at the DB level.
 * 4. They have completed at least one SAT exam (row in
 *    standardized_exam_attempts WHERE completed_at IS NOT NULL). Any historical
 *    attempt qualifies — no date cutoff is applied.
 *
 * If the sat_premium_trial_claims table is missing (42P01), eligibility returns
 * false with reason 'storage_unavailable' rather than granting a trial on the
 * assumption of eligibility. This is fail-closed.
 *
 * Uses admin client throughout to bypass JWT cache.
 */
export async function getSatTrialEligibility(
  userId: string,
): Promise<SatTrialEligibility> {
  const admin = createAdminClient()

  // 1. Fresh metadata to bypass JWT cache
  const { data: freshData } = await admin.auth.admin.getUserById(userId)
  if (!freshData?.user) {
    return { eligible: false, reason: 'user_not_found' }
  }

  const meta = (freshData.user.user_metadata ?? {}) as Record<string, unknown>
  const freshUser = { email: freshData.user.email, user_metadata: meta }

  // 2. Already has premium (checks all: admin, legacy flag, one-time purchase,
  //    monthly subscription — active/past_due/trialing)
  if (hasSatPremium(freshUser)) {
    return { eligible: false, reason: 'already_premium' }
  }

  // 3. Active or converted trial check. 'pending' (abandoned checkout), 'expired',
  //    and 'canceled' do not block re-eligibility — only a real trial does.
  const { data: existingClaim, error: claimError } = await admin
    .from('sat_premium_trial_claims')
    .select('id')
    .eq('user_id', userId)
    .in('status', ['trialing', 'converted'])
    .maybeSingle()

  if (claimError) {
    if (claimError.code === '42P01') {
      // Table not yet migrated — fail closed to prevent accidental trial grants
      console.warn('[eligibility] sat_premium_trial_claims table not yet migrated — returning storage_unavailable')
      return { eligible: false, reason: 'storage_unavailable' }
    }
    // Other DB errors — fail closed
    console.error('[eligibility] claim lookup error', claimError)
    return { eligible: false, reason: 'storage_unavailable' }
  }

  if (existingClaim) {
    return { eligible: false, reason: 'trial_already_claimed' }
  }

  // 4. Must have completed at least one SAT exam (completed_at IS NOT NULL ensures
  //    only fully submitted attempts qualify, not in-progress or autosaved ones).
  //    No date filter — any historical completed attempt qualifies.
  const { data: attempt, error: attemptError } = await admin
    .from('standardized_exam_attempts')
    .select('id')
    .eq('user_id', userId)
    .not('completed_at', 'is', null)
    .limit(1)
    .maybeSingle()

  if (attemptError) {
    console.error('[eligibility] attempt lookup error', attemptError)
    return { eligible: false, reason: 'no_completed_exam' }
  }

  if (!attempt) {
    return { eligible: false, reason: 'no_completed_exam' }
  }

  return { eligible: true, reason: 'eligible' }
}
