import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { isMockMateAdmin } from '@/lib/auth/admin'
import { isForm1Expired } from '@/lib/premade-exams/sat/form1-access'
import { getEntitlements } from '@/lib/entitlements'
import { SatForm1BadgeCountdown } from '@/components/sat/SatForm1Countdown'
import { ExamHistoryNotice } from '@/components/premade/ExamHistoryNotice'
import { Form3CountdownBanner, Form3CountdownBadge } from '@/components/sat/Form3Countdown'
import { Form4CountdownBanner, Form4CountdownBadge } from '@/components/sat/Form4Countdown'
import { Form5CountdownBanner, Form5CountdownBadge } from '@/components/sat/Form5Countdown'
import { Form6CountdownBanner, Form6CountdownBadge } from '@/components/sat/Form6Countdown'
import { Form7CountdownBanner, Form7CountdownBadge } from '@/components/sat/Form7Countdown'
import { SatExamDetails } from '@/components/sat/SatExamDetails'
import {
  getGlobalForm3Window,
  resolveForm3Access,
} from '@/lib/premade-exams/sat/form3-access'
import type { Form3AttemptStatus } from '@/lib/premade-exams/sat/form3-access'
import {
  getForm4FreeWindow,
  resolveForm4Access,
} from '@/lib/premade-exams/sat/form4-access'
import type { Form4AttemptStatus } from '@/lib/premade-exams/sat/form4-access'
import {
  getForm5FreeWindow,
  resolveForm5Access,
} from '@/lib/premade-exams/sat/form5-access'
import type { Form5AttemptStatus } from '@/lib/premade-exams/sat/form5-access'
import {
  getForm6FreeWindow,
  resolveForm6Access,
} from '@/lib/premade-exams/sat/form6-access'
import type { Form6AttemptStatus } from '@/lib/premade-exams/sat/form6-access'
import {
  getForm7FreeWindow,
  resolveForm7Access,
} from '@/lib/premade-exams/sat/form7-access'
import type { Form7AttemptStatus } from '@/lib/premade-exams/sat/form7-access'
import { RollingPromoCountdownBanner, RollingPromoCountdownBadge } from '@/components/sat/RollingPromoCountdown'
import {
  ROLLING_PROMO_CONFIG,
  resolveRollingPromoAccess,
  isRollingPromoLive,
} from '@/lib/premade-exams/sat/rolling-promo'
import type { RollingPromoAccessRow, RollingPromoAttemptStatus } from '@/lib/premade-exams/sat/rolling-promo'

export const dynamic = 'force-dynamic'

// ── Shared badge SVGs ─────────────────────────────────────────────────────────

const PremiumStarIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-2.5 w-2.5 shrink-0" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
  </svg>
)

const ClockIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-2.5 w-2.5 shrink-0" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
  </svg>
)

export default async function SATPremadePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const isAdmin = isMockMateAdmin(user)
  const { satUpgradeUnlocked } = await getEntitlements()

  // Form 1 legacy state
  let form1ResultsAttemptId: string | null = null
  let form1LegacyExpiresAt: string | null = null

  // Form 2 state
  let form2ResultsAttemptId: string | null = null
  let form2HasInProgress = false

  // Form 3 state
  let form3ResultsAttemptId: string | null = null
  let form3HasInProgress = false
  let form3FeedbackRequired = false
  let form3InProgressAttemptId: string | null = null
  let form3InProgressStartedAt: string | null = null
  let form3FreeWindow = null as Awaited<ReturnType<typeof getGlobalForm3Window>>

  // Form 4 state
  let form4ResultsAttemptId: string | null = null
  let form4HasInProgress = false
  let form4FeedbackRequired = false
  let form4InProgressAttemptId: string | null = null
  let form4InProgressStartedAt: string | null = null
  let form4FreeWindow = null as ReturnType<typeof getForm4FreeWindow>

  // Form 5 state
  let form5ResultsAttemptId: string | null = null
  let form5HasInProgress = false
  let form5FeedbackRequired = false
  let form5InProgressAttemptId: string | null = null
  let form5InProgressStartedAt: string | null = null
  let form5FreeWindow = null as ReturnType<typeof getForm5FreeWindow>

  // Form 6 state
  let form6ResultsAttemptId: string | null = null
  let form6HasInProgress = false
  let form6FeedbackRequired = false
  let form6InProgressAttemptId: string | null = null
  let form6InProgressStartedAt: string | null = null
  let form6FreeWindow = null as ReturnType<typeof getForm6FreeWindow>

  // Form 7 state
  let form7ResultsAttemptId: string | null = null
  let form7HasInProgress = false
  let form7FeedbackRequired = false
  let form7InProgressAttemptId: string | null = null
  let form7InProgressStartedAt: string | null = null
  let form7FreeWindow = null as ReturnType<typeof getForm7FreeWindow>
  let rollingPromoRow: RollingPromoAccessRow | null = null
  // In-progress state for the promo form when it's not Form 7 (Form 7 handled by form7HasInProgress)
  let promoFormHasInProgress = false
  let promoFormInProgressAttemptId: string | null = null

  // Forms 8–10 state
  let form8ResultsAttemptId: string | null = null
  let form9ResultsAttemptId: string | null = null
  let form10ResultsAttemptId: string | null = null

  if (user) {
    const [
      form1Completed,
      form1AccessRow,
      form2Completed,
      form2InProgress,
      form3Completed,
      form3InProgress,
      form3FeedbackRow,
      form3Window,
      form4Completed,
      form4InProgress,
      form4FeedbackRow,
      form5Completed,
      form5InProgress,
      form5FeedbackRow,
      form6Completed,
      form6InProgress,
      form6FeedbackRow,
    ] = await Promise.all([
      supabase
        .from('standardized_exam_attempts')
        .select('local_attempt_id')
        .eq('user_id', user.id).eq('exam_type', 'SAT').eq('form_number', 1)
        .not('completed_at', 'is', null).order('completed_at', { ascending: false }).limit(1).maybeSingle(),
      supabase
        .from('sat_form_1_access')
        .select('access_expires_at').eq('user_id', user.id).maybeSingle(),
      supabase
        .from('standardized_exam_attempts')
        .select('local_attempt_id')
        .eq('user_id', user.id).eq('exam_type', 'SAT').eq('form_number', 2)
        .not('completed_at', 'is', null).order('completed_at', { ascending: false }).limit(1).maybeSingle(),
      supabase
        .from('sat_in_progress_attempts')
        .select('local_attempt_id').eq('user_id', user.id).eq('form_number', 2).maybeSingle(),
      supabase
        .from('standardized_exam_attempts')
        .select('local_attempt_id')
        .eq('user_id', user.id).eq('exam_type', 'SAT').eq('form_number', 3)
        .not('completed_at', 'is', null).order('completed_at', { ascending: false }).limit(1).maybeSingle(),
      supabase
        .from('sat_in_progress_attempts')
        .select('local_attempt_id, started_at').eq('user_id', user.id).eq('form_number', 3).maybeSingle(),
      supabase
        .from('standardized_exam_attempts')
        .select('local_attempt_id, ai_feedback')
        .eq('user_id', user.id).eq('exam_type', 'SAT').eq('form_number', 3)
        .not('completed_at', 'is', null).order('completed_at', { ascending: false }).limit(1).maybeSingle(),
      getGlobalForm3Window(supabase),
      supabase
        .from('standardized_exam_attempts')
        .select('local_attempt_id')
        .eq('user_id', user.id).eq('exam_type', 'SAT').eq('form_number', 4)
        .not('completed_at', 'is', null).order('completed_at', { ascending: false }).limit(1).maybeSingle(),
      supabase
        .from('sat_in_progress_attempts')
        .select('local_attempt_id, started_at').eq('user_id', user.id).eq('form_number', 4).maybeSingle(),
      supabase
        .from('standardized_exam_attempts')
        .select('local_attempt_id, ai_feedback')
        .eq('user_id', user.id).eq('exam_type', 'SAT').eq('form_number', 4)
        .not('completed_at', 'is', null).order('completed_at', { ascending: false }).limit(1).maybeSingle(),
      supabase
        .from('standardized_exam_attempts')
        .select('local_attempt_id')
        .eq('user_id', user.id).eq('exam_type', 'SAT').eq('form_number', 5)
        .not('completed_at', 'is', null).order('completed_at', { ascending: false }).limit(1).maybeSingle(),
      supabase
        .from('sat_in_progress_attempts')
        .select('local_attempt_id, started_at').eq('user_id', user.id).eq('form_number', 5).maybeSingle(),
      supabase
        .from('standardized_exam_attempts')
        .select('local_attempt_id, ai_feedback')
        .eq('user_id', user.id).eq('exam_type', 'SAT').eq('form_number', 5)
        .not('completed_at', 'is', null).order('completed_at', { ascending: false }).limit(1).maybeSingle(),
      supabase
        .from('standardized_exam_attempts')
        .select('local_attempt_id')
        .eq('user_id', user.id).eq('exam_type', 'SAT').eq('form_number', 6)
        .not('completed_at', 'is', null).order('completed_at', { ascending: false }).limit(1).maybeSingle(),
      supabase
        .from('sat_in_progress_attempts')
        .select('local_attempt_id, started_at').eq('user_id', user.id).eq('form_number', 6).maybeSingle(),
      supabase
        .from('standardized_exam_attempts')
        .select('local_attempt_id, ai_feedback')
        .eq('user_id', user.id).eq('exam_type', 'SAT').eq('form_number', 6)
        .not('completed_at', 'is', null).order('completed_at', { ascending: false }).limit(1).maybeSingle(),
    ])

    // Fetch Form 7 full state + Forms 8–10 completed attempts in a parallel batch
    const [
      form7CompletedRow,
      form7InProgressRow,
      form7FeedbackQueryRow,
      form8CompletedRow,
      form9CompletedRow,
      form10CompletedRow,
      rollingPromoResult,
      promoFormInProgressResult,
    ] = await Promise.all([
      supabase
        .from('standardized_exam_attempts')
        .select('local_attempt_id')
        .eq('user_id', user.id).eq('exam_type', 'SAT').eq('form_number', 7)
        .not('completed_at', 'is', null).order('completed_at', { ascending: false }).limit(1).maybeSingle(),
      supabase
        .from('sat_in_progress_attempts')
        .select('local_attempt_id, started_at').eq('user_id', user.id).eq('form_number', 7).maybeSingle(),
      supabase
        .from('standardized_exam_attempts')
        .select('local_attempt_id, ai_feedback')
        .eq('user_id', user.id).eq('exam_type', 'SAT').eq('form_number', 7)
        .not('completed_at', 'is', null).order('completed_at', { ascending: false }).limit(1).maybeSingle(),
      supabase
        .from('standardized_exam_attempts')
        .select('local_attempt_id')
        .eq('user_id', user.id).eq('exam_type', 'SAT').eq('form_number', 8)
        .not('completed_at', 'is', null).order('completed_at', { ascending: false }).limit(1).maybeSingle(),
      supabase
        .from('standardized_exam_attempts')
        .select('local_attempt_id')
        .eq('user_id', user.id).eq('exam_type', 'SAT').eq('form_number', 9)
        .not('completed_at', 'is', null).order('completed_at', { ascending: false }).limit(1).maybeSingle(),
      supabase
        .from('standardized_exam_attempts')
        .select('local_attempt_id')
        .eq('user_id', user.id).eq('exam_type', 'SAT').eq('form_number', 10)
        .not('completed_at', 'is', null).order('completed_at', { ascending: false }).limit(1).maybeSingle(),
      // Read rolling promo row for the current campaign form (SELECT only — dashboard creates it)
      isRollingPromoLive()
        ? supabase
            .from('sat_rolling_promo_access')
            .select('user_id, email, promo_form_number, access_started_at, access_expires_at, reason')
            .eq('user_id', user.id)
            .eq('promo_form_number', ROLLING_PROMO_CONFIG.formNumber)
            .maybeSingle()
        : Promise.resolve({ data: null, error: null }),
      // Fetch in-progress row for the promo form when it's not Form 7 (Form 7 is handled by form7InProgressRow)
      isRollingPromoLive() && ROLLING_PROMO_CONFIG.formNumber !== 7
        ? supabase
            .from('sat_in_progress_attempts')
            .select('local_attempt_id')
            .eq('user_id', user.id)
            .eq('form_number', ROLLING_PROMO_CONFIG.formNumber)
            .maybeSingle()
        : Promise.resolve({ data: null, error: null }),
    ])

    form7ResultsAttemptId   = form7CompletedRow.data?.local_attempt_id   ?? null
    form7HasInProgress      = !!form7InProgressRow.data
    form7InProgressAttemptId = form7InProgressRow.data?.local_attempt_id ?? null
    form7InProgressStartedAt = form7InProgressRow.data?.started_at       ?? null
    form7FreeWindow          = getForm7FreeWindow()
    rollingPromoRow          = (rollingPromoResult.data as RollingPromoAccessRow | null) ?? null
    if (ROLLING_PROMO_CONFIG.formNumber !== 7) {
      promoFormHasInProgress = !!(promoFormInProgressResult.data)
      promoFormInProgressAttemptId = (promoFormInProgressResult.data as { local_attempt_id: string } | null)?.local_attempt_id ?? null
    }
    const f7row = form7FeedbackQueryRow.data as { local_attempt_id: string; ai_feedback: unknown } | null
    if (f7row && !f7row.ai_feedback) {
      form7FeedbackRequired = true
    }
    form8ResultsAttemptId  = form8CompletedRow.data?.local_attempt_id  ?? null
    form9ResultsAttemptId  = form9CompletedRow.data?.local_attempt_id  ?? null
    form10ResultsAttemptId = form10CompletedRow.data?.local_attempt_id ?? null

    form1ResultsAttemptId = form1Completed.data?.local_attempt_id ?? null
    const f1Row = form1AccessRow.data
    if (f1Row && !isForm1Expired({ access_expires_at: f1Row.access_expires_at })) {
      form1LegacyExpiresAt = f1Row.access_expires_at
    }
    form2ResultsAttemptId = form2Completed.data?.local_attempt_id ?? null
    form2HasInProgress = !!form2InProgress.data
    form3ResultsAttemptId = form3Completed.data?.local_attempt_id ?? null
    form3HasInProgress = !!form3InProgress.data
    form3InProgressAttemptId = form3InProgress.data?.local_attempt_id ?? null
    form3InProgressStartedAt = form3InProgress.data?.started_at ?? null
    form3FreeWindow = form3Window
    form4ResultsAttemptId = form4Completed.data?.local_attempt_id ?? null
    form4HasInProgress = !!form4InProgress.data
    form4InProgressAttemptId = form4InProgress.data?.local_attempt_id ?? null
    form4InProgressStartedAt = form4InProgress.data?.started_at ?? null
    form4FreeWindow = getForm4FreeWindow()
    form5ResultsAttemptId = form5Completed.data?.local_attempt_id ?? null
    form5HasInProgress = !!form5InProgress.data
    form5InProgressAttemptId = form5InProgress.data?.local_attempt_id ?? null
    form5InProgressStartedAt = form5InProgress.data?.started_at ?? null
    form5FreeWindow = getForm5FreeWindow()
    form6ResultsAttemptId = form6Completed.data?.local_attempt_id ?? null
    form6HasInProgress = !!form6InProgress.data
    form6InProgressAttemptId = form6InProgress.data?.local_attempt_id ?? null
    form6InProgressStartedAt = form6InProgress.data?.started_at ?? null
    form6FreeWindow = getForm6FreeWindow()

    const f5row = form5FeedbackRow.data as { local_attempt_id: string; ai_feedback: unknown } | null
    if (f5row && !f5row.ai_feedback) {
      form5FeedbackRequired = true
    }

    const f6row = form6FeedbackRow.data as { local_attempt_id: string; ai_feedback: unknown } | null
    if (f6row && !f6row.ai_feedback) {
      form6FeedbackRequired = true
    }

    const f3row = form3FeedbackRow.data as { local_attempt_id: string; ai_feedback: unknown } | null
    if (f3row && !f3row.ai_feedback) {
      form3FeedbackRequired = true
    }

    const f4row = form4FeedbackRow.data as { local_attempt_id: string; ai_feedback: unknown } | null
    if (f4row && !f4row.ai_feedback) {
      form4FeedbackRequired = true
    }
  }

  const form1Completed = !!form1ResultsAttemptId
  const form1HasLegacyWindow = !!form1LegacyExpiresAt
  const form3Completed = !!form3ResultsAttemptId

  const form3AttemptStatus: Form3AttemptStatus =
    form3FeedbackRequired ? 'feedback-required'
    : form3Completed ? 'completed'
    : form3HasInProgress ? 'in-progress'
    : 'none'

  const form3AttemptId = form3ResultsAttemptId ?? form3InProgressAttemptId ?? null

  const form3Access = resolveForm3Access({
    isAdmin,
    isPremium: satUpgradeUnlocked,
    freeWindow: form3FreeWindow,
    attemptStatus: form3AttemptStatus,
    attemptId: form3AttemptId,
    inProgressStartedAt: form3InProgressStartedAt,
  })

  const form4Completed = !!form4ResultsAttemptId

  const form4AttemptStatus: Form4AttemptStatus =
    form4FeedbackRequired ? 'feedback-required'
    : form4Completed ? 'completed'
    : form4HasInProgress ? 'in-progress'
    : 'none'

  const form4AttemptId = form4ResultsAttemptId ?? form4InProgressAttemptId ?? null

  const form4Access = resolveForm4Access({
    isAdmin,
    isPremium: satUpgradeUnlocked,
    freeWindow: form4FreeWindow,
    attemptStatus: form4AttemptStatus,
    attemptId: form4AttemptId,
    inProgressStartedAt: form4InProgressStartedAt,
  })

  const form5Completed = !!form5ResultsAttemptId

  const form5AttemptStatus: Form5AttemptStatus =
    form5FeedbackRequired ? 'feedback-required'
    : form5Completed ? 'completed'
    : form5HasInProgress ? 'in-progress'
    : 'none'

  const form5AttemptId = form5ResultsAttemptId ?? form5InProgressAttemptId ?? null

  const form5Access = resolveForm5Access({
    isAdmin,
    isPremium: satUpgradeUnlocked,
    freeWindow: form5FreeWindow,
    attemptStatus: form5AttemptStatus,
    attemptId: form5AttemptId,
    inProgressStartedAt: form5InProgressStartedAt,
  })

  const form6Completed = !!form6ResultsAttemptId

  const form6AttemptStatus: Form6AttemptStatus =
    form6FeedbackRequired ? 'feedback-required'
    : form6Completed ? 'completed'
    : form6HasInProgress ? 'in-progress'
    : 'none'

  const form6AttemptId = form6ResultsAttemptId ?? form6InProgressAttemptId ?? null

  const form6Access = resolveForm6Access({
    isAdmin,
    isPremium: satUpgradeUnlocked,
    freeWindow: form6FreeWindow,
    attemptStatus: form6AttemptStatus,
    attemptId: form6AttemptId,
    inProgressStartedAt: form6InProgressStartedAt,
  })

  const form7Completed = !!form7ResultsAttemptId

  const form7AttemptStatus: Form7AttemptStatus =
    form7FeedbackRequired ? 'feedback-required'
    : form7Completed ? 'completed'
    : form7HasInProgress ? 'in-progress'
    : 'none'

  const form7AttemptId = form7ResultsAttemptId ?? form7InProgressAttemptId ?? null

  const form7Access = resolveForm7Access({
    isAdmin,
    isPremium: satUpgradeUnlocked,
    freeWindow: form7FreeWindow,
    attemptStatus: form7AttemptStatus,
    attemptId: form7AttemptId,
    inProgressStartedAt: form7InProgressStartedAt,
  })

  // Compute attempt status and ID for whichever form is the current promo
  const promoFormN = ROLLING_PROMO_CONFIG.formNumber
  const promoFormResultsAttemptId =
    promoFormN === 7 ? form7ResultsAttemptId :
    promoFormN === 8 ? form8ResultsAttemptId :
    promoFormN === 9 ? form9ResultsAttemptId :
    form10ResultsAttemptId
  const promoHasInProgress = promoFormN === 7 ? form7HasInProgress : promoFormHasInProgress
  const promoAttemptStatus: RollingPromoAttemptStatus =
    promoFormN === 7 ? form7AttemptStatus :
    (promoFormResultsAttemptId ? 'completed' : promoHasInProgress ? 'in-progress' : 'none')
  const promoAttemptId =
    promoFormN === 7 ? form7AttemptId :
    (promoFormResultsAttemptId ?? promoFormInProgressAttemptId)

  const rollingPromoAccess = resolveRollingPromoAccess({
    isAdmin,
    isPremium: satUpgradeUnlocked,
    promoRow: rollingPromoRow,
    attemptStatus: promoAttemptStatus,
    attemptId: promoAttemptId,
  })

  return (
    <div className="py-10">
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link href="/premade" className="hover:text-brand-600 transition-colors">Pre-made Exams</Link>
        <span>/</span>
        <span className="text-slate-900 font-medium">SAT</span>
      </div>

      <h1 className="text-2xl font-bold text-slate-900 mb-1">SAT Practice Forms</h1>
      <p className="text-sm text-slate-500 mb-6">Full-length adaptive SAT-style practice built to feel closer to the real test.</p>

      {/* Feature strip */}
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] sm:items-center gap-5 mb-10 bg-slate-50 rounded-xl border border-slate-100 px-6 py-5">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-2.5">Each exam includes</p>
          <ul className="space-y-1.5">
            {['98 questions', '2 hours 14 minutes', 'Reading & Writing + Math'].map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-300 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex sm:flex-col items-center gap-1.5 px-2">
          <span className="text-[11px] text-slate-400 whitespace-nowrap">followed by</span>
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="h-4 w-4 text-slate-300 rotate-90 sm:rotate-0 shrink-0">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </div>

        <ul className="space-y-1.5">
          {['instant estimated score report', 'AI feedback + weak-area breakdown', 'personalized practice sets from Q-Bank'].map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Legal disclaimer */}
      <p className="text-[11px] text-slate-400 mb-6 leading-relaxed">
        MockMate is not affiliated with, endorsed by, or sponsored by College Board. SAT® is a registered trademark of College Board, which is not involved in the production of and does not endorse MockMate. All questions are independently created for practice purposes and are not official SAT questions.{' '}
        <Link href="/sat-disclaimer" className="hover:underline">SAT Disclaimer</Link>
      </p>

      {/* Form 3 per-user countdown banner */}
      {form3Access.freeWindowExpiresAt && form3Access.accessSource === 'free-window' && (
        <Form3CountdownBanner expiresAt={form3Access.freeWindowExpiresAt} />
      )}

      {/* Form 4 global countdown banner */}
      {form4Access.freeWindowExpiresAt && form4Access.accessSource === 'free-window' && (
        <Form4CountdownBanner expiresAt={form4Access.freeWindowExpiresAt} />
      )}

      {/* Form 5 global countdown banner */}
      {form5Access.freeWindowExpiresAt && form5Access.accessSource === 'free-window' && (
        <Form5CountdownBanner expiresAt={form5Access.freeWindowExpiresAt} />
      )}

      {/* Form 6 global countdown banner */}
      {form6Access.freeWindowExpiresAt && form6Access.accessSource === 'free-window' && (
        <Form6CountdownBanner expiresAt={form6Access.freeWindowExpiresAt} />
      )}

      {/* Form 7 global countdown banner */}
      {form7Access.freeWindowExpiresAt && form7Access.accessSource === 'free-window' && (
        <Form7CountdownBanner expiresAt={form7Access.freeWindowExpiresAt} />
      )}

      {/* Form 7 rolling promo countdown banner (per-user 24-hour, after global window ends) */}
      {rollingPromoAccess.expiresAt && rollingPromoAccess.accessSource === 'rolling-promo' && rollingPromoAccess.assignedFormNumber && (
        <RollingPromoCountdownBanner expiresAt={rollingPromoAccess.expiresAt} formNumber={rollingPromoAccess.assignedFormNumber} />
      )}

      <ExamHistoryNotice />

      {/* Form cards — 5 columns on xl (2 rows of 5 for Forms 1–10), responsive below */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">

        {/* ── Form 1 ────────────────────────────────────────────────────── */}
        {form1Completed ? (
          <div className="rounded-xl border border-emerald-200 bg-white p-5 flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <div className="h-8 w-8 rounded-lg bg-brand-50 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-brand-600">1</span>
              </div>
              <span className="inline-flex items-center rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">Completed</span>
            </div>
            <h2 className="font-semibold text-slate-900 mb-0.5">Form 1</h2>
            <p className="text-xs text-slate-400 mb-0">You already completed this exam.</p>
            <SatExamDetails />
            <Link href={`/premade/sat/form-1/results/${form1ResultsAttemptId}`} className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700 transition-colors">
              View Results →
            </Link>
          </div>
        ) : isAdmin ? (
          <Link href="/premade/sat/form-1" className="rounded-xl border border-brand-200 bg-white p-5 hover:border-brand-400 hover:shadow-sm transition-all group flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <div className="h-8 w-8 rounded-lg bg-brand-50 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-brand-600">1</span>
              </div>
              <span className="inline-flex items-center rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10px] font-semibold text-amber-700">Admin</span>
            </div>
            <h2 className="font-semibold text-slate-900 group-hover:text-brand-700 transition-colors mb-0.5">Form 1</h2>
            <p className="text-xs text-slate-400">Full access</p>
            <SatExamDetails />
            <span className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2 text-xs font-semibold text-white group-hover:bg-brand-700 transition-colors">
              Start Exam →
            </span>
          </Link>
        ) : satUpgradeUnlocked ? (
          <Link href="/premade/sat/form-1" className="rounded-xl border border-brand-200 bg-white p-5 hover:border-brand-400 hover:shadow-sm transition-all group flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <div className="h-8 w-8 rounded-lg bg-brand-50 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-brand-600">1</span>
              </div>
            </div>
            <h2 className="font-semibold text-slate-900 group-hover:text-brand-700 transition-colors mb-0.5">Form 1</h2>
            <p className="text-xs text-slate-400">SAT Premium</p>
            <SatExamDetails />
            <span className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2 text-xs font-semibold text-white group-hover:bg-brand-700 transition-colors">
              Start Exam →
            </span>
          </Link>
        ) : form1HasLegacyWindow ? (
          <Link href="/premade/sat/form-1" className="rounded-xl border border-brand-200 bg-white p-5 hover:border-brand-400 hover:shadow-sm transition-all group flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <div className="h-8 w-8 rounded-lg bg-brand-50 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-brand-600">1</span>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                <ClockIcon />
                <SatForm1BadgeCountdown expiresAt={form1LegacyExpiresAt!} />
              </span>
            </div>
            <h2 className="font-semibold text-slate-900 group-hover:text-brand-700 transition-colors mb-0.5">Form 1</h2>
            <p className="text-xs text-slate-400">Free access window active</p>
            <SatExamDetails />
            <span className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2 text-xs font-semibold text-white group-hover:bg-brand-700 transition-colors">
              Start Exam →
            </span>
          </Link>
        ) : (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-slate-400">1</span>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                <PremiumStarIcon />
                SAT Premium
              </span>
            </div>
            <h2 className="font-semibold text-slate-500 mb-0.5">Form 1</h2>
            <p className="text-xs text-slate-400">SAT Premium required.</p>
            <SatExamDetails />
            <Link href="/billing" className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-amber-500 px-4 py-2 text-xs font-semibold text-white hover:bg-amber-600 transition-colors">
              Get SAT Premium
            </Link>
          </div>
        )}

        {/* ── Form 2 ────────────────────────────────────────────────────── */}
        {form2ResultsAttemptId ? (
          <div className="rounded-xl border border-emerald-200 bg-white p-5 flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <div className="h-8 w-8 rounded-lg bg-brand-50 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-brand-600">2</span>
              </div>
              <span className="inline-flex items-center rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">Completed</span>
            </div>
            <h2 className="font-semibold text-slate-900 mb-0.5">Form 2</h2>
            <p className="text-xs text-slate-400">You already completed this exam.</p>
            <SatExamDetails />
            <Link href={`/premade/sat/form-2/results/${form2ResultsAttemptId}`} className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700 transition-colors">
              View Results →
            </Link>
          </div>
        ) : isAdmin ? (
          <Link href="/premade/sat/form-2" className="rounded-xl border border-brand-200 bg-white p-5 hover:border-brand-400 hover:shadow-sm transition-all group flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <div className="h-8 w-8 rounded-lg bg-brand-50 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-brand-600">2</span>
              </div>
              <span className="inline-flex items-center rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10px] font-semibold text-amber-700">Admin</span>
            </div>
            <h2 className="font-semibold text-slate-900 group-hover:text-brand-700 transition-colors mb-0.5">Form 2</h2>
            <p className="text-xs text-slate-400">Full access</p>
            <SatExamDetails />
            <span className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2 text-xs font-semibold text-white group-hover:bg-brand-700 transition-colors">
              Start Exam →
            </span>
          </Link>
        ) : satUpgradeUnlocked ? (
          <Link href="/premade/sat/form-2" className="rounded-xl border border-brand-200 bg-white p-5 hover:border-brand-400 hover:shadow-sm transition-all group flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <div className="h-8 w-8 rounded-lg bg-brand-50 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-brand-600">2</span>
              </div>
              {form2HasInProgress && (
                <span className="inline-flex items-center rounded-full bg-brand-50 border border-brand-200 px-2 py-0.5 text-[10px] font-semibold text-brand-700">In Progress</span>
              )}
            </div>
            <h2 className="font-semibold text-slate-900 group-hover:text-brand-700 transition-colors mb-0.5">Form 2</h2>
            <p className="text-xs text-slate-400">{form2HasInProgress ? 'Resume where you left off.' : 'SAT Premium'}</p>
            <SatExamDetails />
            <span className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2 text-xs font-semibold text-white group-hover:bg-brand-700 transition-colors">
              {form2HasInProgress ? 'Resume Exam →' : 'Start Exam →'}
            </span>
          </Link>
        ) : (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-slate-400">2</span>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                <PremiumStarIcon />
                SAT Premium
              </span>
            </div>
            <h2 className="font-semibold text-slate-500 mb-0.5">Form 2</h2>
            <p className="text-xs text-slate-400">SAT Premium required.</p>
            <SatExamDetails />
            <Link href="/billing" className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-amber-500 px-4 py-2 text-xs font-semibold text-white hover:bg-amber-600 transition-colors">
              Get SAT Premium
            </Link>
          </div>
        )}

        {/* ── Form 3 — per-user 48-hour free window ─────────────────────── */}
        {form3ResultsAttemptId && form3FeedbackRequired ? (
          <div className="rounded-xl border border-amber-200 bg-white p-5 flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <div className="h-8 w-8 rounded-lg bg-brand-50 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-brand-600">3</span>
              </div>
              <span className="inline-flex items-center rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10px] font-semibold text-amber-700">Feedback</span>
            </div>
            <h2 className="font-semibold text-slate-900 mb-0.5">Form 3</h2>
            <p className="text-xs text-slate-400">Complete your feedback to unlock full results.</p>
            <SatExamDetails />
            <Link href={`/premade/sat/form-3/results/${form3ResultsAttemptId}`} className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-amber-500 px-4 py-2 text-xs font-semibold text-white hover:bg-amber-600 transition-colors">
              Complete Feedback →
            </Link>
          </div>
        ) : form3ResultsAttemptId && !form3FeedbackRequired ? (
          <div className="rounded-xl border border-emerald-200 bg-white p-5 flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <div className="h-8 w-8 rounded-lg bg-brand-50 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-brand-600">3</span>
              </div>
              <span className="inline-flex items-center rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">Completed</span>
            </div>
            <h2 className="font-semibold text-slate-900 mb-0.5">Form 3</h2>
            <p className="text-xs text-slate-400">You already completed this exam.</p>
            <SatExamDetails />
            <Link href={`/premade/sat/form-3/results/${form3ResultsAttemptId}`} className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700 transition-colors">
              View Results →
            </Link>
          </div>
        ) : form3Access.canResume ? (
          <Link href="/premade/sat/form-3" className="rounded-xl border border-brand-200 bg-white p-5 hover:border-brand-400 hover:shadow-sm transition-all group flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <div className="h-8 w-8 rounded-lg bg-brand-50 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-brand-600">3</span>
              </div>
              <span className="inline-flex items-center rounded-full bg-brand-50 border border-brand-200 px-2 py-0.5 text-[10px] font-semibold text-brand-700">In Progress</span>
            </div>
            <h2 className="font-semibold text-slate-900 group-hover:text-brand-700 transition-colors mb-0.5">Form 3</h2>
            <p className="text-xs text-slate-400">Resume where you left off.</p>
            <SatExamDetails />
            <span className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2 text-xs font-semibold text-white group-hover:bg-brand-700 transition-colors">
              Resume SAT Form 3 →
            </span>
          </Link>
        ) : form3Access.canStart && form3Access.accessSource === 'free-window' ? (
          <Link href="/premade/sat/form-3" className="rounded-xl border border-amber-200 bg-white p-5 hover:border-amber-400 hover:shadow-sm transition-all group flex flex-col">
            <div className="flex items-start justify-between mb-2">
              <div className="h-8 w-8 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-amber-600">3</span>
              </div>
              <span className="inline-flex items-center rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10px] font-semibold text-amber-700">Free for 48 Hours</span>
            </div>
            {form3Access.freeWindowExpiresAt && (
              <div className="mb-2">
                <Form3CountdownBadge expiresAt={form3Access.freeWindowExpiresAt} />
              </div>
            )}
            <h2 className="font-semibold text-slate-900 group-hover:text-amber-700 transition-colors mb-0.5">Form 3</h2>
            <p className="text-[11px] text-amber-700">Available during your free access window.</p>
            <SatExamDetails />
            <span className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-amber-500 px-4 py-2 text-xs font-semibold text-white group-hover:bg-amber-600 transition-colors">
              Start Free SAT Form 3 →
            </span>
          </Link>
        ) : form3Access.canStart && (isAdmin || satUpgradeUnlocked) ? (
          <Link href="/premade/sat/form-3" className="rounded-xl border border-brand-200 bg-white p-5 hover:border-brand-400 hover:shadow-sm transition-all group flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <div className="h-8 w-8 rounded-lg bg-brand-50 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-brand-600">3</span>
              </div>
              {isAdmin && <span className="inline-flex items-center rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10px] font-semibold text-amber-700">Admin</span>}
            </div>
            <h2 className="font-semibold text-slate-900 group-hover:text-brand-700 transition-colors mb-0.5">Form 3</h2>
            <p className="text-xs text-slate-400">{isAdmin ? 'Full access' : 'SAT Premium'}</p>
            <SatExamDetails />
            <span className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2 text-xs font-semibold text-white group-hover:bg-brand-700 transition-colors">
              Start Exam →
            </span>
          </Link>
        ) : user && !isAdmin && !satUpgradeUnlocked && !form3FreeWindow && form3AttemptStatus === 'none' ? (
          // Eligible free user: no window initialized yet — clicking Start Form 3 triggers the 48-hour window
          <Link href="/premade/sat/form-3" className="rounded-xl border border-amber-200 bg-white p-5 hover:border-amber-400 hover:shadow-sm transition-all group flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <div className="h-8 w-8 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-amber-600">3</span>
              </div>
              <span className="inline-flex items-center rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10px] font-semibold text-amber-700">Free for 48 Hours</span>
            </div>
            <h2 className="font-semibold text-slate-900 group-hover:text-amber-700 transition-colors mb-0.5">Form 3</h2>
            <p className="text-[11px] text-amber-700">Start to begin your 48-hour free access window.</p>
            <SatExamDetails />
            <span className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-amber-500 px-4 py-2 text-xs font-semibold text-white group-hover:bg-amber-600 transition-colors">
              Start Free SAT Form 3 →
            </span>
          </Link>
        ) : (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-slate-400">3</span>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                <PremiumStarIcon />
                SAT Premium
              </span>
            </div>
            <h2 className="font-semibold text-slate-500 mb-0.5">Form 3</h2>
            <p className="text-xs text-slate-400">SAT Premium required.</p>
            <SatExamDetails />
            <Link href="/billing" className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-amber-500 px-4 py-2 text-xs font-semibold text-white hover:bg-amber-600 transition-colors">
              Get SAT Premium
            </Link>
          </div>
        )}

        {/* ── Form 4 — global 72-hour free window ───────────────────────── */}
        {form4ResultsAttemptId && form4FeedbackRequired ? (
          <div className="rounded-xl border border-amber-200 bg-white p-5 flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <div className="h-8 w-8 rounded-lg bg-brand-50 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-brand-600">4</span>
              </div>
              <span className="inline-flex items-center rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10px] font-semibold text-amber-700">Feedback</span>
            </div>
            <h2 className="font-semibold text-slate-900 mb-0.5">Form 4</h2>
            <p className="text-xs text-slate-400">Complete your feedback to unlock full results.</p>
            <SatExamDetails />
            <Link href={`/premade/sat/form-4/results/${form4ResultsAttemptId}`} className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-amber-500 px-4 py-2 text-xs font-semibold text-white hover:bg-amber-600 transition-colors">
              Complete Feedback →
            </Link>
          </div>
        ) : form4ResultsAttemptId && !form4FeedbackRequired ? (
          <div className="rounded-xl border border-emerald-200 bg-white p-5 flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <div className="h-8 w-8 rounded-lg bg-brand-50 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-brand-600">4</span>
              </div>
              <span className="inline-flex items-center rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">Completed</span>
            </div>
            <h2 className="font-semibold text-slate-900 mb-0.5">Form 4</h2>
            <p className="text-xs text-slate-400">You already completed this exam.</p>
            <SatExamDetails />
            <Link href={`/premade/sat/form-4/results/${form4ResultsAttemptId}`} className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700 transition-colors">
              View Results →
            </Link>
          </div>
        ) : form4Access.canResume ? (
          <Link href="/premade/sat/form-4" className="rounded-xl border border-brand-200 bg-white p-5 hover:border-brand-400 hover:shadow-sm transition-all group flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <div className="h-8 w-8 rounded-lg bg-brand-50 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-brand-600">4</span>
              </div>
              <span className="inline-flex items-center rounded-full bg-brand-50 border border-brand-200 px-2 py-0.5 text-[10px] font-semibold text-brand-700">In Progress</span>
            </div>
            <h2 className="font-semibold text-slate-900 group-hover:text-brand-700 transition-colors mb-0.5">Form 4</h2>
            <p className="text-xs text-slate-400">Resume where you left off.</p>
            <SatExamDetails />
            <span className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2 text-xs font-semibold text-white group-hover:bg-brand-700 transition-colors">
              Resume SAT Form 4 →
            </span>
          </Link>
        ) : form4Access.canStart && form4Access.accessSource === 'free-window' ? (
          <Link href="/premade/sat/form-4" className="rounded-xl border border-brand-200 bg-white p-5 hover:border-brand-400 hover:shadow-sm transition-all group flex flex-col">
            <div className="flex items-start justify-between mb-2">
              <div className="h-8 w-8 rounded-lg bg-brand-50 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-brand-600">4</span>
              </div>
              <span className="inline-flex items-center rounded-full bg-brand-50 border border-brand-200 px-2 py-0.5 text-[10px] font-semibold text-brand-700">Free for 72 Hours</span>
            </div>
            {form4Access.freeWindowExpiresAt && (
              <div className="mb-2">
                <Form4CountdownBadge expiresAt={form4Access.freeWindowExpiresAt} />
              </div>
            )}
            <h2 className="font-semibold text-slate-900 group-hover:text-brand-700 transition-colors mb-0.5">Form 4</h2>
            <p className="text-[11px] text-brand-700">Available during the free access window.</p>
            <SatExamDetails />
            <span className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-brand-500 px-4 py-2 text-xs font-semibold text-white group-hover:bg-brand-600 transition-colors">
              Start Free SAT Form 4 →
            </span>
          </Link>
        ) : form4Access.canStart && (isAdmin || satUpgradeUnlocked) ? (
          <Link href="/premade/sat/form-4" className="rounded-xl border border-brand-200 bg-white p-5 hover:border-brand-400 hover:shadow-sm transition-all group flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <div className="h-8 w-8 rounded-lg bg-brand-50 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-brand-600">4</span>
              </div>
              {isAdmin && <span className="inline-flex items-center rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10px] font-semibold text-amber-700">Admin</span>}
            </div>
            <h2 className="font-semibold text-slate-900 group-hover:text-brand-700 transition-colors mb-0.5">Form 4</h2>
            <p className="text-xs text-slate-400">{isAdmin ? 'Full access' : 'SAT Premium'}</p>
            <SatExamDetails />
            <span className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2 text-xs font-semibold text-white group-hover:bg-brand-700 transition-colors">
              Start Exam →
            </span>
          </Link>
        ) : user && !isAdmin && !satUpgradeUnlocked && form4FreeWindow && new Date() < new Date(form4FreeWindow.expiresAt) && form4AttemptStatus === 'none' ? (
          // Active free window but no attempt yet — show free window card
          <Link href="/premade/sat/form-4" className="rounded-xl border border-brand-200 bg-white p-5 hover:border-brand-400 hover:shadow-sm transition-all group flex flex-col">
            <div className="flex items-start justify-between mb-2">
              <div className="h-8 w-8 rounded-lg bg-brand-50 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-brand-600">4</span>
              </div>
              <span className="inline-flex items-center rounded-full bg-brand-50 border border-brand-200 px-2 py-0.5 text-[10px] font-semibold text-brand-700">Free for 72 Hours</span>
            </div>
            {form4FreeWindow.expiresAt && (
              <div className="mb-2">
                <Form4CountdownBadge expiresAt={form4FreeWindow.expiresAt} />
              </div>
            )}
            <h2 className="font-semibold text-slate-900 group-hover:text-brand-700 transition-colors mb-0.5">Form 4</h2>
            <p className="text-[11px] text-brand-700">Start to begin your 72-hour free access window.</p>
            <SatExamDetails />
            <span className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-brand-500 px-4 py-2 text-xs font-semibold text-white group-hover:bg-brand-600 transition-colors">
              Start Free SAT Form 4 →
            </span>
          </Link>
        ) : (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-slate-400">4</span>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                <PremiumStarIcon />
                SAT Premium
              </span>
            </div>
            <h2 className="font-semibold text-slate-500 mb-0.5">Form 4</h2>
            <p className="text-xs text-slate-400">SAT Premium required.</p>
            <SatExamDetails />
            <Link href="/billing" className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-amber-500 px-4 py-2 text-xs font-semibold text-white hover:bg-amber-600 transition-colors">
              Get SAT Premium
            </Link>
          </div>
        )}

        {/* ── Form 5 — global 48-hour free window ───────────────────────── */}
        {form5ResultsAttemptId && form5FeedbackRequired ? (
          <div className="rounded-xl border border-amber-200 bg-white p-5 flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <div className="h-8 w-8 rounded-lg bg-brand-50 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-brand-600">5</span>
              </div>
              <span className="inline-flex items-center rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10px] font-semibold text-amber-700">Feedback</span>
            </div>
            <h2 className="font-semibold text-slate-900 mb-0.5">Form 5</h2>
            <p className="text-xs text-slate-400">Complete your feedback to unlock full results.</p>
            <SatExamDetails />
            <Link href={`/premade/sat/form-5/results/${form5ResultsAttemptId}`} className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-amber-500 px-4 py-2 text-xs font-semibold text-white hover:bg-amber-600 transition-colors">
              Complete Feedback →
            </Link>
          </div>
        ) : form5ResultsAttemptId && !form5FeedbackRequired ? (
          <div className="rounded-xl border border-emerald-200 bg-white p-5 flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <div className="h-8 w-8 rounded-lg bg-brand-50 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-brand-600">5</span>
              </div>
              <span className="inline-flex items-center rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">Completed</span>
            </div>
            <h2 className="font-semibold text-slate-900 mb-0.5">Form 5</h2>
            <p className="text-xs text-slate-400">You already completed this exam.</p>
            <SatExamDetails />
            <Link href={`/premade/sat/form-5/results/${form5ResultsAttemptId}`} className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700 transition-colors">
              View Results →
            </Link>
          </div>
        ) : form5Access.canResume ? (
          <Link href="/premade/sat/form-5" className="rounded-xl border border-brand-200 bg-white p-5 hover:border-brand-400 hover:shadow-sm transition-all group flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <div className="h-8 w-8 rounded-lg bg-brand-50 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-brand-600">5</span>
              </div>
              <span className="inline-flex items-center rounded-full bg-brand-50 border border-brand-200 px-2 py-0.5 text-[10px] font-semibold text-brand-700">In Progress</span>
            </div>
            <h2 className="font-semibold text-slate-900 group-hover:text-brand-700 transition-colors mb-0.5">Form 5</h2>
            <p className="text-xs text-slate-400">Resume where you left off.</p>
            <SatExamDetails />
            <span className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2 text-xs font-semibold text-white group-hover:bg-brand-700 transition-colors">
              Resume SAT Form 5 →
            </span>
          </Link>
        ) : form5Access.canStart && form5Access.accessSource === 'free-window' ? (
          <Link href="/premade/sat/form-5" className="rounded-xl border border-brand-200 bg-white p-5 hover:border-brand-400 hover:shadow-sm transition-all group flex flex-col">
            <div className="flex items-start justify-between mb-2">
              <div className="h-8 w-8 rounded-lg bg-brand-50 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-brand-600">5</span>
              </div>
              <span className="inline-flex items-center rounded-full bg-brand-50 border border-brand-200 px-2 py-0.5 text-[10px] font-semibold text-brand-700">Free for 48 Hours</span>
            </div>
            {form5Access.freeWindowExpiresAt && (
              <div className="mb-2">
                <Form5CountdownBadge expiresAt={form5Access.freeWindowExpiresAt} />
              </div>
            )}
            <h2 className="font-semibold text-slate-900 group-hover:text-brand-700 transition-colors mb-0.5">Form 5</h2>
            <p className="text-[11px] text-brand-700">Available during the free access window.</p>
            <SatExamDetails />
            <span className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-brand-500 px-4 py-2 text-xs font-semibold text-white group-hover:bg-brand-600 transition-colors">
              Take Form 5 Free →
            </span>
          </Link>
        ) : form5Access.canStart && (isAdmin || satUpgradeUnlocked) ? (
          <Link href="/premade/sat/form-5" className="rounded-xl border border-brand-200 bg-white p-5 hover:border-brand-400 hover:shadow-sm transition-all group flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <div className="h-8 w-8 rounded-lg bg-brand-50 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-brand-600">5</span>
              </div>
              {isAdmin && <span className="inline-flex items-center rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10px] font-semibold text-amber-700">Admin</span>}
            </div>
            <h2 className="font-semibold text-slate-900 group-hover:text-brand-700 transition-colors mb-0.5">Form 5</h2>
            <p className="text-xs text-slate-400">{isAdmin ? 'Full access' : 'SAT Premium'}</p>
            <SatExamDetails />
            <span className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2 text-xs font-semibold text-white group-hover:bg-brand-700 transition-colors">
              Start Exam →
            </span>
          </Link>
        ) : user && !isAdmin && !satUpgradeUnlocked && form5FreeWindow && new Date() < new Date(form5FreeWindow.expiresAt) && form5AttemptStatus === 'none' ? (
          // Active free window but no attempt yet — show free window card
          <Link href="/premade/sat/form-5" className="rounded-xl border border-brand-200 bg-white p-5 hover:border-brand-400 hover:shadow-sm transition-all group flex flex-col">
            <div className="flex items-start justify-between mb-2">
              <div className="h-8 w-8 rounded-lg bg-brand-50 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-brand-600">5</span>
              </div>
              <span className="inline-flex items-center rounded-full bg-brand-50 border border-brand-200 px-2 py-0.5 text-[10px] font-semibold text-brand-700">Free for 48 Hours</span>
            </div>
            {form5FreeWindow.expiresAt && (
              <div className="mb-2">
                <Form5CountdownBadge expiresAt={form5FreeWindow.expiresAt} />
              </div>
            )}
            <h2 className="font-semibold text-slate-900 group-hover:text-brand-700 transition-colors mb-0.5">Form 5</h2>
            <p className="text-[11px] text-brand-700">Start to begin your 48-hour free access window.</p>
            <SatExamDetails />
            <span className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-brand-500 px-4 py-2 text-xs font-semibold text-white group-hover:bg-brand-600 transition-colors">
              Take Form 5 Free →
            </span>
          </Link>
        ) : (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-slate-400">5</span>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                <PremiumStarIcon />
                SAT Premium
              </span>
            </div>
            <h2 className="font-semibold text-slate-500 mb-0.5">Form 5</h2>
            <p className="text-xs text-slate-400">SAT Premium required.</p>
            <SatExamDetails />
            <Link href="/billing" className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-amber-500 px-4 py-2 text-xs font-semibold text-white hover:bg-amber-600 transition-colors">
              Get SAT Premium
            </Link>
          </div>
        )}

        {/* ── Form 6 — global 72-hour free window ───────────────────────── */}
        {form6ResultsAttemptId && form6FeedbackRequired ? (
          <div className="rounded-xl border border-amber-200 bg-white p-5 flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <div className="h-8 w-8 rounded-lg bg-brand-50 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-brand-600">6</span>
              </div>
              <span className="inline-flex items-center rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10px] font-semibold text-amber-700">Feedback</span>
            </div>
            <h2 className="font-semibold text-slate-900 mb-0.5">Form 6</h2>
            <p className="text-xs text-slate-400">Complete your feedback to unlock full results.</p>
            <SatExamDetails />
            <Link href={`/premade/sat/form-6/results/${form6ResultsAttemptId}`} className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-amber-500 px-4 py-2 text-xs font-semibold text-white hover:bg-amber-600 transition-colors">
              Complete Feedback →
            </Link>
          </div>
        ) : form6ResultsAttemptId && !form6FeedbackRequired ? (
          <div className="rounded-xl border border-emerald-200 bg-white p-5 flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <div className="h-8 w-8 rounded-lg bg-brand-50 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-brand-600">6</span>
              </div>
              <span className="inline-flex items-center rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">Completed</span>
            </div>
            <h2 className="font-semibold text-slate-900 mb-0.5">Form 6</h2>
            <p className="text-xs text-slate-400">You already completed this exam.</p>
            <SatExamDetails />
            <Link href={`/premade/sat/form-6/results/${form6ResultsAttemptId}`} className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700 transition-colors">
              View Results →
            </Link>
          </div>
        ) : form6Access.canResume ? (
          <Link href="/premade/sat/form-6" className="rounded-xl border border-brand-200 bg-white p-5 hover:border-brand-400 hover:shadow-sm transition-all group flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <div className="h-8 w-8 rounded-lg bg-brand-50 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-brand-600">6</span>
              </div>
              <span className="inline-flex items-center rounded-full bg-brand-50 border border-brand-200 px-2 py-0.5 text-[10px] font-semibold text-brand-700">In Progress</span>
            </div>
            <h2 className="font-semibold text-slate-900 group-hover:text-brand-700 transition-colors mb-0.5">Form 6</h2>
            <p className="text-xs text-slate-400">Resume where you left off.</p>
            <SatExamDetails />
            <span className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2 text-xs font-semibold text-white group-hover:bg-brand-700 transition-colors">
              Resume SAT Form 6 →
            </span>
          </Link>
        ) : form6Access.canStart && form6Access.accessSource === 'free-window' ? (
          <Link href="/premade/sat/form-6" className="rounded-xl border border-brand-200 bg-white p-5 hover:border-brand-400 hover:shadow-sm transition-all group flex flex-col">
            <div className="flex items-start justify-between mb-2">
              <div className="h-8 w-8 rounded-lg bg-brand-50 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-brand-600">6</span>
              </div>
              <span className="inline-flex items-center rounded-full bg-brand-50 border border-brand-200 px-2 py-0.5 text-[10px] font-semibold text-brand-700">Free for 72 Hours</span>
            </div>
            {form6Access.freeWindowExpiresAt && (
              <div className="mb-2">
                <Form6CountdownBadge expiresAt={form6Access.freeWindowExpiresAt} />
              </div>
            )}
            <h2 className="font-semibold text-slate-900 group-hover:text-brand-700 transition-colors mb-0.5">Form 6</h2>
            <p className="text-[11px] text-brand-700">Available during the free access window.</p>
            <SatExamDetails />
            <span className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-brand-500 px-4 py-2 text-xs font-semibold text-white group-hover:bg-brand-600 transition-colors">
              Take Form 6 Free →
            </span>
          </Link>
        ) : form6Access.canStart && (isAdmin || satUpgradeUnlocked) ? (
          <Link href="/premade/sat/form-6" className="rounded-xl border border-brand-200 bg-white p-5 hover:border-brand-400 hover:shadow-sm transition-all group flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <div className="h-8 w-8 rounded-lg bg-brand-50 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-brand-600">6</span>
              </div>
              {isAdmin && <span className="inline-flex items-center rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10px] font-semibold text-amber-700">Admin</span>}
            </div>
            <h2 className="font-semibold text-slate-900 group-hover:text-brand-700 transition-colors mb-0.5">Form 6</h2>
            <p className="text-xs text-slate-400">{isAdmin ? 'Full access' : 'SAT Premium'}</p>
            <SatExamDetails />
            <span className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2 text-xs font-semibold text-white group-hover:bg-brand-700 transition-colors">
              Start Exam →
            </span>
          </Link>
        ) : user && !isAdmin && !satUpgradeUnlocked && form6FreeWindow && new Date(form6FreeWindow.startsAt) <= new Date() && new Date() < new Date(form6FreeWindow.expiresAt) && form6AttemptStatus === 'none' ? (
          // Active free window but no attempt yet — show free window card
          <Link href="/premade/sat/form-6" className="rounded-xl border border-brand-200 bg-white p-5 hover:border-brand-400 hover:shadow-sm transition-all group flex flex-col">
            <div className="flex items-start justify-between mb-2">
              <div className="h-8 w-8 rounded-lg bg-brand-50 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-brand-600">6</span>
              </div>
              <span className="inline-flex items-center rounded-full bg-brand-50 border border-brand-200 px-2 py-0.5 text-[10px] font-semibold text-brand-700">Free for 72 Hours</span>
            </div>
            {form6FreeWindow.expiresAt && (
              <div className="mb-2">
                <Form6CountdownBadge expiresAt={form6FreeWindow.expiresAt} />
              </div>
            )}
            <h2 className="font-semibold text-slate-900 group-hover:text-brand-700 transition-colors mb-0.5">Form 6</h2>
            <p className="text-[11px] text-brand-700">Start to begin your 72-hour free access window.</p>
            <SatExamDetails />
            <span className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-brand-500 px-4 py-2 text-xs font-semibold text-white group-hover:bg-brand-600 transition-colors">
              Take Form 6 Free →
            </span>
          </Link>
        ) : (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-slate-400">6</span>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                <PremiumStarIcon />
                SAT Premium
              </span>
            </div>
            <h2 className="font-semibold text-slate-500 mb-0.5">Form 6</h2>
            <p className="text-xs text-slate-400">SAT Premium required.</p>
            <SatExamDetails />
            <Link href="/billing" className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-amber-500 px-4 py-2 text-xs font-semibold text-white hover:bg-amber-600 transition-colors">
              Get SAT Premium
            </Link>
          </div>
        )}

        {/* ── Form 7 — global 72-hour free window + rolling per-user promo ─ */}
        {form7ResultsAttemptId && form7FeedbackRequired ? (
          <div className="rounded-xl border border-amber-200 bg-white p-5 flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <div className="h-8 w-8 rounded-lg bg-brand-50 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-brand-600">7</span>
              </div>
              <span className="inline-flex items-center rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10px] font-semibold text-amber-700">Feedback</span>
            </div>
            <h2 className="font-semibold text-slate-900 mb-0.5">Form 7</h2>
            <p className="text-xs text-slate-400">Complete your feedback to unlock full results.</p>
            <SatExamDetails />
            <Link href={`/premade/sat/form-7/results/${form7ResultsAttemptId}`} className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-amber-500 px-4 py-2 text-xs font-semibold text-white hover:bg-amber-600 transition-colors">
              Complete Feedback →
            </Link>
          </div>
        ) : form7ResultsAttemptId && !form7FeedbackRequired ? (
          <div className="rounded-xl border border-emerald-200 bg-white p-5 flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <div className="h-8 w-8 rounded-lg bg-brand-50 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-brand-600">7</span>
              </div>
              <span className="inline-flex items-center rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">Completed</span>
            </div>
            <h2 className="font-semibold text-slate-900 mb-0.5">Form 7</h2>
            <p className="text-xs text-slate-400">You already completed this exam.</p>
            <SatExamDetails />
            <Link href={`/premade/sat/form-7/results/${form7ResultsAttemptId}`} className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700 transition-colors">
              View Results →
            </Link>
          </div>
        ) : (form7Access.canResume || (rollingPromoAccess.assignedFormNumber === 7 && rollingPromoAccess.canResume)) ? (
          <Link href="/premade/sat/form-7" className="rounded-xl border border-brand-200 bg-white p-5 hover:border-brand-400 hover:shadow-sm transition-all group flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <div className="h-8 w-8 rounded-lg bg-brand-50 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-brand-600">7</span>
              </div>
              <span className="inline-flex items-center rounded-full bg-brand-50 border border-brand-200 px-2 py-0.5 text-[10px] font-semibold text-brand-700">In Progress</span>
            </div>
            <h2 className="font-semibold text-slate-900 group-hover:text-brand-700 transition-colors mb-0.5">Form 7</h2>
            <p className="text-xs text-slate-400">Resume where you left off.</p>
            {rollingPromoAccess.assignedFormNumber === 7 && rollingPromoAccess.expiresAt && rollingPromoAccess.accessSource === 'rolling-promo' && (
              <div className="mt-1 mb-1">
                <RollingPromoCountdownBadge expiresAt={rollingPromoAccess.expiresAt} />
              </div>
            )}
            <SatExamDetails />
            <span className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2 text-xs font-semibold text-white group-hover:bg-brand-700 transition-colors">
              Resume SAT Form 7 →
            </span>
          </Link>
        ) : form7Access.canStart && form7Access.accessSource === 'free-window' ? (
          <Link href="/premade/sat/form-7" className="rounded-xl border border-brand-200 bg-white p-5 hover:border-brand-400 hover:shadow-sm transition-all group flex flex-col">
            <div className="flex items-start justify-between mb-2">
              <div className="h-8 w-8 rounded-lg bg-brand-50 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-brand-600">7</span>
              </div>
              <span className="inline-flex items-center rounded-full bg-brand-50 border border-brand-200 px-2 py-0.5 text-[10px] font-semibold text-brand-700">Free for 72 Hours</span>
            </div>
            {form7Access.freeWindowExpiresAt && (
              <div className="mb-2">
                <Form7CountdownBadge expiresAt={form7Access.freeWindowExpiresAt} />
              </div>
            )}
            <h2 className="font-semibold text-slate-900 group-hover:text-brand-700 transition-colors mb-0.5">Form 7</h2>
            <p className="text-[11px] text-brand-700">Available during the free access window.</p>
            <SatExamDetails />
            <span className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-brand-500 px-4 py-2 text-xs font-semibold text-white group-hover:bg-brand-600 transition-colors">
              Take Form 7 Free →
            </span>
          </Link>
        ) : form7Access.canStart && (isAdmin || satUpgradeUnlocked) ? (
          <Link href="/premade/sat/form-7" className="rounded-xl border border-brand-200 bg-white p-5 hover:border-brand-400 hover:shadow-sm transition-all group flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <div className="h-8 w-8 rounded-lg bg-brand-50 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-brand-600">7</span>
              </div>
              {isAdmin && <span className="inline-flex items-center rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10px] font-semibold text-amber-700">Admin</span>}
            </div>
            <h2 className="font-semibold text-slate-900 group-hover:text-brand-700 transition-colors mb-0.5">Form 7</h2>
            <p className="text-xs text-slate-400">{isAdmin ? 'Full access' : 'SAT Premium'}</p>
            <SatExamDetails />
            <span className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2 text-xs font-semibold text-white group-hover:bg-brand-700 transition-colors">
              Start Exam →
            </span>
          </Link>
        ) : user && !isAdmin && !satUpgradeUnlocked && form7FreeWindow && new Date(form7FreeWindow.startsAt) <= new Date() && new Date() < new Date(form7FreeWindow.expiresAt) && form7AttemptStatus === 'none' ? (
          // Active global free window but no attempt yet — show free window card
          <Link href="/premade/sat/form-7" className="rounded-xl border border-brand-200 bg-white p-5 hover:border-brand-400 hover:shadow-sm transition-all group flex flex-col">
            <div className="flex items-start justify-between mb-2">
              <div className="h-8 w-8 rounded-lg bg-brand-50 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-brand-600">7</span>
              </div>
              <span className="inline-flex items-center rounded-full bg-brand-50 border border-brand-200 px-2 py-0.5 text-[10px] font-semibold text-brand-700">Free for 72 Hours</span>
            </div>
            {form7FreeWindow.expiresAt && (
              <div className="mb-2">
                <Form7CountdownBadge expiresAt={form7FreeWindow.expiresAt} />
              </div>
            )}
            <h2 className="font-semibold text-slate-900 group-hover:text-brand-700 transition-colors mb-0.5">Form 7</h2>
            <p className="text-[11px] text-brand-700">Start to begin your 72-hour free access window.</p>
            <SatExamDetails />
            <span className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-brand-500 px-4 py-2 text-xs font-semibold text-white group-hover:bg-brand-600 transition-colors">
              Take Form 7 Free →
            </span>
          </Link>
        ) : (rollingPromoAccess.assignedFormNumber === 7 && rollingPromoAccess.canStart) ? (
          // Rolling per-user 24-hour promo — window active, no attempt yet
          <Link href="/premade/sat/form-7" className="rounded-xl border border-brand-200 bg-white p-5 hover:border-brand-400 hover:shadow-sm transition-all group flex flex-col">
            <div className="flex items-start justify-between mb-2">
              <div className="h-8 w-8 rounded-lg bg-brand-50 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-brand-600">7</span>
              </div>
              <span className="inline-flex items-center rounded-full bg-brand-50 border border-brand-200 px-2 py-0.5 text-[10px] font-semibold text-brand-700">Free for 24 Hours</span>
            </div>
            {rollingPromoAccess.expiresAt && (
              <div className="mb-2">
                <RollingPromoCountdownBadge expiresAt={rollingPromoAccess.expiresAt} />
              </div>
            )}
            <h2 className="font-semibold text-slate-900 group-hover:text-brand-700 transition-colors mb-0.5">Form 7</h2>
            <p className="text-[11px] text-brand-700">Your personal 24-hour free window is running.</p>
            <SatExamDetails />
            <span className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-brand-500 px-4 py-2 text-xs font-semibold text-white group-hover:bg-brand-600 transition-colors">
              Take Form 7 Free →
            </span>
          </Link>
        ) : (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-slate-400">7</span>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                <PremiumStarIcon />
                SAT Premium
              </span>
            </div>
            <h2 className="font-semibold text-slate-500 mb-0.5">Form 7</h2>
            <p className="text-xs text-slate-400">SAT Premium required.</p>
            <SatExamDetails />
            <Link href="/billing" className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-amber-500 px-4 py-2 text-xs font-semibold text-white hover:bg-amber-600 transition-colors">
              Get SAT Premium
            </Link>
          </div>
        )}

        {/* ── Forms 8–10 (Premium-only) ─────────────────────────────────── */}
        {([8, 9, 10] as const).map(n => {
          const resultsAttemptId = [
            form8ResultsAttemptId,
            form9ResultsAttemptId,
            form10ResultsAttemptId,
          ][n - 8]

          if (resultsAttemptId) {
            return (
              <div key={n} className="rounded-xl border border-emerald-200 bg-white p-5 flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <div className="h-8 w-8 rounded-lg bg-brand-50 flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-brand-600">{n}</span>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">Completed</span>
                </div>
                <h2 className="font-semibold text-slate-900 mb-0.5">Form {n}</h2>
                <p className="text-xs text-slate-400">You already completed this exam.</p>
                <SatExamDetails />
                <Link href={`/premade/sat/form-${n}/results/${resultsAttemptId}`} className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700 transition-colors">
                  View Results →
                </Link>
              </div>
            )
          }

          // Rolling promo: resume in-progress exam
          if (rollingPromoAccess.assignedFormNumber === n && rollingPromoAccess.canResume) {
            return (
              <Link key={n} href={`/premade/sat/form-${n}`} className="rounded-xl border border-brand-200 bg-white p-5 hover:border-brand-400 hover:shadow-sm transition-all group flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <div className="h-8 w-8 rounded-lg bg-brand-50 flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-brand-600">{n}</span>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-brand-50 border border-brand-200 px-2 py-0.5 text-[10px] font-semibold text-brand-700">In Progress</span>
                </div>
                {rollingPromoAccess.expiresAt && (
                  <div className="mt-1 mb-1">
                    <RollingPromoCountdownBadge expiresAt={rollingPromoAccess.expiresAt} />
                  </div>
                )}
                <h2 className="font-semibold text-slate-900 group-hover:text-brand-700 transition-colors mb-0.5">Form {n}</h2>
                <p className="text-xs text-slate-400">Resume where you left off.</p>
                <SatExamDetails />
                <span className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2 text-xs font-semibold text-white group-hover:bg-brand-700 transition-colors">
                  Resume SAT Form {n} →
                </span>
              </Link>
            )
          }

          // Rolling promo: start free exam
          if (rollingPromoAccess.assignedFormNumber === n && rollingPromoAccess.canStart) {
            return (
              <Link key={n} href={`/premade/sat/form-${n}`} className="rounded-xl border border-brand-200 bg-white p-5 hover:border-brand-400 hover:shadow-sm transition-all group flex flex-col">
                <div className="flex items-start justify-between mb-2">
                  <div className="h-8 w-8 rounded-lg bg-brand-50 flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-brand-600">{n}</span>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-brand-50 border border-brand-200 px-2 py-0.5 text-[10px] font-semibold text-brand-700">Free for 24 Hours</span>
                </div>
                {rollingPromoAccess.expiresAt && (
                  <div className="mb-2">
                    <RollingPromoCountdownBadge expiresAt={rollingPromoAccess.expiresAt} />
                  </div>
                )}
                <h2 className="font-semibold text-slate-900 group-hover:text-brand-700 transition-colors mb-0.5">Form {n}</h2>
                <p className="text-[11px] text-brand-700">Your personal 24-hour free window is running.</p>
                <SatExamDetails />
                <span className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-brand-500 px-4 py-2 text-xs font-semibold text-white group-hover:bg-brand-600 transition-colors">
                  Take Form {n} Free →
                </span>
              </Link>
            )
          }

          if (isAdmin || satUpgradeUnlocked) {
            return (
              <Link key={n} href={`/premade/sat/form-${n}`} className="rounded-xl border border-brand-200 bg-white p-5 hover:border-brand-400 hover:shadow-sm transition-all group flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <div className="h-8 w-8 rounded-lg bg-brand-50 flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-brand-600">{n}</span>
                  </div>
                  {isAdmin && <span className="inline-flex items-center rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10px] font-semibold text-amber-700">Admin</span>}
                </div>
                <h2 className="font-semibold text-slate-900 group-hover:text-brand-700 transition-colors mb-0.5">Form {n}</h2>
                <p className="text-xs text-slate-400">{isAdmin ? 'Full access' : 'SAT Premium'}</p>
                <SatExamDetails />
                <span className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2 text-xs font-semibold text-white group-hover:bg-brand-700 transition-colors">
                  Start Exam →
                </span>
              </Link>
            )
          }

          return (
            <div key={n} className="rounded-xl border border-slate-200 bg-slate-50 p-5 flex flex-col">
              <div className="flex items-start justify-between mb-3">
                <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-slate-400">{n}</span>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                  <PremiumStarIcon />
                  SAT Premium
                </span>
              </div>
              <h2 className="font-semibold text-slate-500 mb-0.5">Form {n}</h2>
              <p className="text-xs text-slate-400">SAT Premium required.</p>
              <SatExamDetails />
              <Link href="/billing" className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-amber-500 px-4 py-2 text-xs font-semibold text-white hover:bg-amber-600 transition-colors">
                Get SAT Premium
              </Link>
            </div>
          )
        })}

      </div>
    </div>
  )
}
