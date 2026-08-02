import { createClient } from '@/lib/supabase/server'
import { isMockMateAdmin } from '@/lib/auth/admin'
import { getEntitlements } from '@/lib/entitlements'
import { redirect } from 'next/navigation'
import { UpgradeGate } from '@/components/shared/upgrade-gate'
import SATExamTakerClient from './SATExamTakerClient'
import {
  getGlobalForm3Window,
  resolveForm3Access,
} from '@/lib/premade-exams/sat/form3-access'
import type { Form3AttemptStatus } from '@/lib/premade-exams/sat/form3-access'

export const dynamic = 'force-dynamic'

export default async function SATForm3Page() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const isAdmin = isMockMateAdmin(user)
  const { satUpgradeUnlocked } = await getEntitlements()

  const [freeWindow, inProgressRow, completedRow] = await Promise.all([
    getGlobalForm3Window(supabase),
    supabase
      .from('sat_in_progress_attempts')
      .select('local_attempt_id, started_at')
      .eq('user_id', user.id)
      .eq('form_number', 3)
      .maybeSingle(),
    supabase
      .from('standardized_exam_attempts')
      .select('local_attempt_id, ai_feedback')
      .eq('user_id', user.id)
      .eq('exam_type', 'SAT')
      .eq('form_number', 3)
      .not('completed_at', 'is', null)
      .order('completed_at', { ascending: false })
      .limit(1)
      .maybeSingle(),
  ])

  const attemptId =
    completedRow.data?.local_attempt_id ?? inProgressRow.data?.local_attempt_id ?? null

  const hasFeedback = !!completedRow.data?.ai_feedback

  const attemptStatus: Form3AttemptStatus =
    completedRow.data
      ? hasFeedback
        ? 'completed'
        : 'feedback-required'
      : inProgressRow.data
        ? 'in-progress'
        : 'none'

  const access = resolveForm3Access({
    isAdmin,
    isPremium: satUpgradeUnlocked,
    freeWindow,
    attemptStatus,
    attemptId,
    inProgressStartedAt: inProgressRow.data?.started_at ?? null,
  })

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

  // No access — show upgrade gate
  return (
    <UpgradeGate
      title="SAT Form 3 — Free Access Window Ended"
      description="The free promotional access window for SAT Form 3 has ended. Subscribe to SAT Premium to access all 5 SAT practice forms, the 700+ question bank, and both SAT Academies."
    />
  )
}
