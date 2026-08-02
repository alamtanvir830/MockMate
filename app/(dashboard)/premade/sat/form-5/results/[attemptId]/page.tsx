import { createClient } from '@/lib/supabase/server'
import { getEntitlements } from '@/lib/entitlements'
import { isMockMateAdmin } from '@/lib/auth/admin'
import { redirect } from 'next/navigation'
import { UpgradeGate } from '@/components/shared/upgrade-gate'
import SATForm5ResultsClient from './SATForm5ResultsClient'
import { getSatTrialEligibility } from '@/lib/sat-trial/eligibility'

export const dynamic = 'force-dynamic'

export default async function SATForm5ResultsPage({
  params,
}: {
  params: Promise<{ attemptId: string }>
}) {
  const { attemptId } = await params

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const isAdmin = isMockMateAdmin(user)
  const { satUpgradeUnlocked } = await getEntitlements()

  // Admin and Premium always have access
  if (isAdmin || satUpgradeUnlocked) {
    // Admins are never eligible for the trial; premium users already have access.
    const trialEligible = isAdmin
      ? false
      : (await getSatTrialEligibility(user.id)).eligible
    return (
      <SATForm5ResultsClient
        attemptId={attemptId}
        satUpgradeUnlocked={satUpgradeUnlocked}
        trialEligible={trialEligible}
      />
    )
  }

  // Non-premium: check if they own a completed Form 5 attempt for this attemptId.
  // Any user who completed the exam may view their own results.
  const { data: completedAttempt } = await supabase
    .from('standardized_exam_attempts')
    .select('local_attempt_id')
    .eq('user_id', user.id)
    .eq('exam_type', 'SAT')
    .eq('form_number', 5)
    .eq('local_attempt_id', attemptId)
    .not('completed_at', 'is', null)
    .maybeSingle()

  if (completedAttempt) {
    // They completed this specific attempt — allow result access.
    // Free users who completed Form 5 may be eligible for the trial.
    const trialEligible = (await getSatTrialEligibility(user.id)).eligible
    return (
      <SATForm5ResultsClient
        attemptId={attemptId}
        satUpgradeUnlocked={false}
        trialEligible={trialEligible}
      />
    )
  }

  // No completed attempt owned by this user — show upgrade gate.
  return (
    <UpgradeGate
      title="SAT Premium required to view results"
      description="Subscribe to SAT Premium to access your SAT Form 5 results, detailed score breakdowns, and AI feedback."
    />
  )
}
