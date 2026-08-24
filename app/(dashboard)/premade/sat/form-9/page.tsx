import { createClient } from '@/lib/supabase/server'
import { isMockMateAdmin } from '@/lib/auth/admin'
import { getEntitlements } from '@/lib/entitlements'
import { redirect } from 'next/navigation'
import { UpgradeGate } from '@/components/shared/upgrade-gate'
import SATExamTakerClient from './SATExamTakerClient'
import {
  resolveRollingPromoAccess,
} from '@/lib/premade-exams/sat/rolling-promo'
import type { RollingPromoAttemptStatus } from '@/lib/premade-exams/sat/rolling-promo'

export const dynamic = 'force-dynamic'

const FORM_NUMBER = 9

export default async function SATForm9Page() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const isAdmin = isMockMateAdmin(user)
  const { satUpgradeUnlocked } = await getEntitlements()

  if (isAdmin || satUpgradeUnlocked) {
    return <SATExamTakerClient />
  }

  const [inProgressRow, completedRow, rollingPromoRow] = await Promise.all([
    supabase
      .from('sat_in_progress_attempts')
      .select('local_attempt_id, started_at')
      .eq('user_id', user.id)
      .eq('form_number', FORM_NUMBER)
      .maybeSingle(),
    supabase
      .from('standardized_exam_attempts')
      .select('local_attempt_id, ai_feedback')
      .eq('user_id', user.id)
      .eq('exam_type', 'SAT')
      .eq('form_number', FORM_NUMBER)
      .not('completed_at', 'is', null)
      .order('completed_at', { ascending: false })
      .limit(1)
      .maybeSingle(),
    supabase
      .from('sat_rolling_promo_access')
      .select('user_id, email, promo_form_number, access_started_at, access_expires_at, reason')
      .eq('user_id', user.id)
      .eq('promo_form_number', FORM_NUMBER)
      .maybeSingle(),
  ])

  const hasFeedback = !!completedRow.data?.ai_feedback
  const attemptStatus: RollingPromoAttemptStatus =
    completedRow.data
      ? hasFeedback
        ? 'completed'
        : 'feedback-required'
      : inProgressRow.data
        ? 'in-progress'
        : 'none'

  const attemptId =
    completedRow.data?.local_attempt_id ?? inProgressRow.data?.local_attempt_id ?? null

  const rollingAccess = resolveRollingPromoAccess({
    isAdmin,
    isPremium: satUpgradeUnlocked,
    promoRow: rollingPromoRow.data ?? null,
    attemptStatus,
    attemptId,
  })

  if (
    rollingAccess.canStart ||
    rollingAccess.canResume ||
    rollingAccess.canViewResult ||
    rollingAccess.canCompleteFeedback
  ) {
    return (
      <SATExamTakerClient
        freeWindowExpiresAt={rollingAccess.expiresAt}
        showCountdown={rollingAccess.accessSource === 'rolling-promo'}
        formNumber={FORM_NUMBER}
      />
    )
  }

  if (rollingAccess.isExpired && inProgressRow.data) {
    return (
      <UpgradeGate
        title="Your free exam access has expired"
        description="Your free exam access window has ended. Upgrade to SAT Premium to continue preparing with all 10 full-length adaptive SAT exams, 1,000+ SAT practice questions, the Reading & Writing Academy, Math & Desmos Academy, and personalized score reports."
      />
    )
  }

  return (
    <UpgradeGate
      title="SAT Form 9 — Locked"
      description="Subscribe to SAT Premium to unlock all 10 full-length adaptive SAT practice forms."
    />
  )
}
