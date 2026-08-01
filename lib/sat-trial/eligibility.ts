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
}

/**
 * Server-side authoritative trial eligibility check.
 *
 * A user is eligible when ALL are true:
 * 1. They do NOT currently have SAT Premium (any type: legacy, one-time, subscription).
 * 2. They have NOT previously claimed or started a trial (row in sat_premium_trial_claims).
 * 3. They have completed at least one SAT exam (row in standardized_exam_attempts).
 *
 * Uses admin client to bypass JWT cache staleness.
 */
export async function getSatTrialEligibility(userId: string): Promise<SatTrialEligibility> {
  const admin = createAdminClient()

  // 1. Fresh metadata to bypass JWT cache
  const { data: freshData } = await admin.auth.admin.getUserById(userId)
  if (!freshData?.user) {
    return { eligible: false, reason: 'user_not_found' }
  }

  const meta = (freshData.user.user_metadata ?? {}) as Record<string, unknown>
  const freshUser = { email: freshData.user.email, user_metadata: meta }

  // 2. Already has premium
  if (hasSatPremium(freshUser)) {
    return { eligible: false, reason: 'already_premium' }
  }

  // 3. Already claimed a trial
  const { data: existingClaim } = await admin
    .from('sat_premium_trial_claims')
    .select('id')
    .eq('user_id', userId)
    .maybeSingle()

  if (existingClaim) {
    return { eligible: false, reason: 'trial_already_claimed' }
  }

  // 4. Must have completed at least one SAT exam
  const { data: attempt } = await admin
    .from('standardized_exam_attempts')
    .select('id')
    .eq('user_id', userId)
    .limit(1)
    .maybeSingle()

  if (!attempt) {
    return { eligible: false, reason: 'no_completed_exam' }
  }

  return { eligible: true, reason: 'eligible' }
}
