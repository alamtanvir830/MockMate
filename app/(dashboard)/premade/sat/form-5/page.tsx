import { createClient } from '@/lib/supabase/server'
import { isMockMateAdmin } from '@/lib/auth/admin'
import { getEntitlements } from '@/lib/entitlements'
import { redirect } from 'next/navigation'
import { UpgradeGate } from '@/components/shared/upgrade-gate'
import SATExamTakerClient from './SATExamTakerClient'
import {
  getForm5FreeWindow,
  resolveForm5Access,
} from '@/lib/premade-exams/sat/form5-access'
import type { Form5AttemptStatus } from '@/lib/premade-exams/sat/form5-access'

export const dynamic = 'force-dynamic'

export default async function SATForm5Page() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const isAdmin = isMockMateAdmin(user)
  const { satUpgradeUnlocked } = await getEntitlements()

  const freeWindow = getForm5FreeWindow()

  const [inProgressRow, completedRow] = await Promise.all([
    supabase
      .from('sat_in_progress_attempts')
      .select('local_attempt_id, started_at')
      .eq('user_id', user.id)
      .eq('form_number', 5)
      .maybeSingle(),
    supabase
      .from('standardized_exam_attempts')
      .select('local_attempt_id, ai_feedback')
      .eq('user_id', user.id)
      .eq('exam_type', 'SAT')
      .eq('form_number', 5)
      .not('completed_at', 'is', null)
      .order('completed_at', { ascending: false })
      .limit(1)
      .maybeSingle(),
  ])

  const attemptId =
    completedRow.data?.local_attempt_id ?? inProgressRow.data?.local_attempt_id ?? null

  const hasFeedback = !!completedRow.data?.ai_feedback

  const attemptStatus: Form5AttemptStatus =
    completedRow.data
      ? hasFeedback
        ? 'completed'
        : 'feedback-required'
      : inProgressRow.data
        ? 'in-progress'
        : 'none'

  const access = resolveForm5Access({
    isAdmin,
    isPremium: satUpgradeUnlocked,
    freeWindow,
    attemptStatus,
    attemptId,
    inProgressStartedAt: inProgressRow.data?.started_at ?? null,
  })

  // Window expired and access denied — delete in-progress row so expired attempt
  // data is not retained. Completed results are unaffected (separate table).
  if (
    !isAdmin &&
    !satUpgradeUnlocked &&
    access.lockReason === 'no-access' &&
    inProgressRow.data
  ) {
    await supabase
      .from('sat_in_progress_attempts')
      .delete()
      .eq('user_id', user.id)
      .eq('form_number', 5)
  }

  if (
    access.canStart ||
    access.canResume ||
    access.canViewResult ||
    access.canCompleteFeedback
  ) {
    return (
      <SATExamTakerClient
        isAdmin={isAdmin}
        freeWindowExpiresAt={access.freeWindowExpiresAt}
        showCountdown={access.accessSource === 'free-window'}
      />
    )
  }

  return (
    <UpgradeGate
      title="SAT Form 5 — Free Access Window Ended"
      description="The free promotional access window for SAT Form 5 has ended. Subscribe to SAT Premium to access all 10 SAT exam forms, the 1,000+ question bank, and both SAT Academies."
    />
  )
}
