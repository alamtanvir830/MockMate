import { createClient } from '@/lib/supabase/server'
import { getEntitlements } from '@/lib/entitlements'
import { isMockMateAdmin } from '@/lib/auth/admin'
import { redirect } from 'next/navigation'
import {
  getForm3FreeWindow,
  resolveForm3Access,
} from '@/lib/premade-exams/sat/form3-access'
import SATForm3ResultsClient from './SATForm3ResultsClient'
import { getSatTrialEligibility } from '@/lib/sat-trial/eligibility'

export const dynamic = 'force-dynamic'

export default async function SATForm3ResultsPage({
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
      <SATForm3ResultsClient
        attemptId={attemptId}
        satUpgradeUnlocked={satUpgradeUnlocked}
        trialEligible={trialEligible}
      />
    )
  }

  // Non-premium: check if they have a completed Form 3 attempt
  // Any user who completed the exam may view their results
  const { data: completedAttempt } = await supabase
    .from('standardized_exam_attempts')
    .select('local_attempt_id')
    .eq('user_id', user.id)
    .eq('exam_type', 'SAT')
    .eq('form_number', 3)
    .eq('local_attempt_id', attemptId)
    .not('completed_at', 'is', null)
    .maybeSingle()

  if (completedAttempt) {
    // They completed this specific attempt — allow result access.
    // Free users who completed Form 3 may be eligible for the trial.
    const trialEligible = (await getSatTrialEligibility(user.id)).eligible
    return (
      <SATForm3ResultsClient
        attemptId={attemptId}
        satUpgradeUnlocked={false}
        trialEligible={trialEligible}
      />
    )
  }

  // Also allow if they have a valid free window access (in-progress attempt)
  const [freeWindow, inProgressRow] = await Promise.all([
    getForm3FreeWindow(supabase, user.id),
    supabase
      .from('sat_in_progress_attempts')
      .select('local_attempt_id, started_at')
      .eq('user_id', user.id)
      .eq('form_number', 3)
      .maybeSingle(),
  ])

  const access = resolveForm3Access({
    isAdmin: false,
    isPremium: false,
    freeWindow,
    attemptStatus: inProgressRow.data ? 'in-progress' : 'none',
    attemptId: inProgressRow.data?.local_attempt_id ?? null,
    inProgressStartedAt: inProgressRow.data?.started_at ?? null,
  })

  if (access.canStart || access.canResume) {
    const trialEligible = (await getSatTrialEligibility(user.id)).eligible
    return (
      <SATForm3ResultsClient
        attemptId={attemptId}
        satUpgradeUnlocked={false}
        trialEligible={trialEligible}
      />
    )
  }

  // No access — redirect to Form 3 landing which will show the upgrade gate
  redirect('/premade/sat/form-3')
}
