import { createClient } from '@/lib/supabase/server'
import { isMockMateAdmin } from '@/lib/auth/admin'
import { getEntitlements } from '@/lib/entitlements'
import { redirect } from 'next/navigation'
import { UpgradeGate } from '@/components/shared/upgrade-gate'
import SATExamTakerClient from './SATExamTakerClient'
import {
  getForm7FreeWindow,
  resolveForm7Access,
} from '@/lib/premade-exams/sat/form7-access'
import type { Form7AttemptStatus } from '@/lib/premade-exams/sat/form7-access'
import {
  resolveRollingPromoAccess,
} from '@/lib/premade-exams/sat/rolling-promo'

export const dynamic = 'force-dynamic'

export default async function SATForm7Page() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const isAdmin = isMockMateAdmin(user)
  const { satUpgradeUnlocked } = await getEntitlements()

  const freeWindow = getForm7FreeWindow()

  const [inProgressRow, completedRow, rollingPromoRow] = await Promise.all([
    supabase
      .from('sat_in_progress_attempts')
      .select('local_attempt_id, started_at')
      .eq('user_id', user.id)
      .eq('form_number', 7)
      .maybeSingle(),
    supabase
      .from('standardized_exam_attempts')
      .select('local_attempt_id, ai_feedback')
      .eq('user_id', user.id)
      .eq('exam_type', 'SAT')
      .eq('form_number', 7)
      .not('completed_at', 'is', null)
      .order('completed_at', { ascending: false })
      .limit(1)
      .maybeSingle(),
    // Read rolling promo row (SELECT only — creation happens on dashboard visit).
    // Only users with promo_form_number=7 in the DB row can access via this path.
    supabase
      .from('sat_rolling_promo_access')
      .select('user_id, email, promo_form_number, access_started_at, access_expires_at, reason')
      .eq('user_id', user.id)
      .eq('promo_form_number', 7)
      .maybeSingle(),
  ])

  const attemptId =
    completedRow.data?.local_attempt_id ?? inProgressRow.data?.local_attempt_id ?? null

  const hasFeedback = !!completedRow.data?.ai_feedback

  const attemptStatus: Form7AttemptStatus =
    completedRow.data
      ? hasFeedback
        ? 'completed'
        : 'feedback-required'
      : inProgressRow.data
        ? 'in-progress'
        : 'none'

  const access = resolveForm7Access({
    isAdmin,
    isPremium: satUpgradeUnlocked,
    freeWindow,
    attemptStatus,
    attemptId,
    inProgressStartedAt: inProgressRow.data?.started_at ?? null,
  })

  // Check rolling promo access (only relevant after the global window expires)
  const rollingAccess = resolveRollingPromoAccess({
    isAdmin,
    isPremium: satUpgradeUnlocked,
    promoRow: rollingPromoRow.data ?? null,
    attemptStatus,
    attemptId,
  })

  const hasAnyAccess =
    access.canStart ||
    access.canResume ||
    access.canViewResult ||
    access.canCompleteFeedback ||
    rollingAccess.canStart ||
    rollingAccess.canResume ||
    rollingAccess.canViewResult ||
    rollingAccess.canCompleteFeedback

  // Global window expired + rolling promo also expired/absent → clean up in-progress row.
  // Rolling promo users in an active window keep their in-progress data.
  const rollingPromoActive = rollingAccess.accessSource === 'rolling-promo' && !rollingAccess.isExpired
  if (
    !isAdmin &&
    !satUpgradeUnlocked &&
    access.lockReason === 'no-access' &&
    !rollingPromoActive &&
    inProgressRow.data
  ) {
    await supabase
      .from('sat_in_progress_attempts')
      .delete()
      .eq('user_id', user.id)
      .eq('form_number', 7)
  }

  if (hasAnyAccess) {
    // Prefer rolling promo expiresAt when it's the active source
    const freeWindowExpiresAt =
      rollingAccess.accessSource === 'rolling-promo'
        ? rollingAccess.expiresAt
        : access.freeWindowExpiresAt
    const showCountdown =
      access.accessSource === 'free-window' ||
      rollingAccess.accessSource === 'rolling-promo'

    return (
      <SATExamTakerClient
        isAdmin={isAdmin}
        freeWindowExpiresAt={freeWindowExpiresAt}
        showCountdown={showCountdown}
      />
    )
  }

  return (
    <UpgradeGate
      title="SAT Form 7 — Free Access Window Ended"
      description="The free promotional access window for SAT Form 7 has ended. Subscribe to SAT Premium to access all 10 SAT exam forms, the 1,000+ question bank, and both SAT Academies."
    />
  )
}
