import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { isMockMateAdmin } from '@/lib/auth/admin'
import { isForm1Expired } from '@/lib/premade-exams/sat/form1-access'
import { getEntitlements } from '@/lib/entitlements'
import { SatForm1BadgeCountdown } from '@/components/sat/SatForm1Countdown'
import { ExamHistoryNotice } from '@/components/premade/ExamHistoryNotice'
import { Form3CountdownBanner, Form3CountdownBadge } from '@/components/sat/Form3Countdown'
import { SatExamDetails } from '@/components/sat/SatExamDetails'
import {
  getForm3FreeWindow,
  resolveForm3Access,
} from '@/lib/premade-exams/sat/form3-access'
import type { Form3AttemptStatus } from '@/lib/premade-exams/sat/form3-access'

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
  let form3FreeWindow = null as Awaited<ReturnType<typeof getForm3FreeWindow>>

  // Form 4 state
  let form4ResultsAttemptId: string | null = null

  // Form 5 state
  let form5ResultsAttemptId: string | null = null

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
      form5Completed,
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
      getForm3FreeWindow(supabase, user.id),
      supabase
        .from('standardized_exam_attempts')
        .select('local_attempt_id')
        .eq('user_id', user.id).eq('exam_type', 'SAT').eq('form_number', 4)
        .not('completed_at', 'is', null).order('completed_at', { ascending: false }).limit(1).maybeSingle(),
      supabase
        .from('standardized_exam_attempts')
        .select('local_attempt_id')
        .eq('user_id', user.id).eq('exam_type', 'SAT').eq('form_number', 5)
        .not('completed_at', 'is', null).order('completed_at', { ascending: false }).limit(1).maybeSingle(),
    ])

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
    form5ResultsAttemptId = form5Completed.data?.local_attempt_id ?? null

    const f3row = form3FeedbackRow.data as { local_attempt_id: string; ai_feedback: unknown } | null
    if (f3row && !f3row.ai_feedback) {
      form3FeedbackRequired = true
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

  return (
    <div className="py-10">
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link href="/premade" className="hover:text-indigo-600 transition-colors">Pre-made Exams</Link>
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
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-300 shrink-0" />
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

      <ExamHistoryNotice />

      {/* Form cards — 5 columns on xl, responsive below */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">

        {/* ── Form 1 ────────────────────────────────────────────────────── */}
        {form1Completed ? (
          <div className="rounded-xl border border-emerald-200 bg-white p-5 flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <div className="h-8 w-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-indigo-600">1</span>
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
          <Link href="/premade/sat/form-1" className="rounded-xl border border-indigo-200 bg-white p-5 hover:border-indigo-400 hover:shadow-sm transition-all group flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <div className="h-8 w-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-indigo-600">1</span>
              </div>
              <span className="inline-flex items-center rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10px] font-semibold text-amber-700">Admin</span>
            </div>
            <h2 className="font-semibold text-slate-900 group-hover:text-indigo-700 transition-colors mb-0.5">Form 1</h2>
            <p className="text-xs text-slate-400">Full access</p>
            <SatExamDetails />
            <span className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white group-hover:bg-indigo-700 transition-colors">
              Start Exam →
            </span>
          </Link>
        ) : satUpgradeUnlocked ? (
          <Link href="/premade/sat/form-1" className="rounded-xl border border-indigo-200 bg-white p-5 hover:border-indigo-400 hover:shadow-sm transition-all group flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <div className="h-8 w-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-indigo-600">1</span>
              </div>
            </div>
            <h2 className="font-semibold text-slate-900 group-hover:text-indigo-700 transition-colors mb-0.5">Form 1</h2>
            <p className="text-xs text-slate-400">SAT Premium</p>
            <SatExamDetails />
            <span className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white group-hover:bg-indigo-700 transition-colors">
              Start Exam →
            </span>
          </Link>
        ) : form1HasLegacyWindow ? (
          <Link href="/premade/sat/form-1" className="rounded-xl border border-indigo-200 bg-white p-5 hover:border-indigo-400 hover:shadow-sm transition-all group flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <div className="h-8 w-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-indigo-600">1</span>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                <ClockIcon />
                <SatForm1BadgeCountdown expiresAt={form1LegacyExpiresAt!} />
              </span>
            </div>
            <h2 className="font-semibold text-slate-900 group-hover:text-indigo-700 transition-colors mb-0.5">Form 1</h2>
            <p className="text-xs text-slate-400">Free access window active</p>
            <SatExamDetails />
            <span className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white group-hover:bg-indigo-700 transition-colors">
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
              <div className="h-8 w-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-indigo-600">2</span>
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
          <Link href="/premade/sat/form-2" className="rounded-xl border border-indigo-200 bg-white p-5 hover:border-indigo-400 hover:shadow-sm transition-all group flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <div className="h-8 w-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-indigo-600">2</span>
              </div>
              <span className="inline-flex items-center rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10px] font-semibold text-amber-700">Admin</span>
            </div>
            <h2 className="font-semibold text-slate-900 group-hover:text-indigo-700 transition-colors mb-0.5">Form 2</h2>
            <p className="text-xs text-slate-400">Full access</p>
            <SatExamDetails />
            <span className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white group-hover:bg-indigo-700 transition-colors">
              Start Exam →
            </span>
          </Link>
        ) : satUpgradeUnlocked ? (
          <Link href="/premade/sat/form-2" className="rounded-xl border border-indigo-200 bg-white p-5 hover:border-indigo-400 hover:shadow-sm transition-all group flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <div className="h-8 w-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-indigo-600">2</span>
              </div>
              {form2HasInProgress && (
                <span className="inline-flex items-center rounded-full bg-indigo-50 border border-indigo-200 px-2 py-0.5 text-[10px] font-semibold text-indigo-700">In Progress</span>
              )}
            </div>
            <h2 className="font-semibold text-slate-900 group-hover:text-indigo-700 transition-colors mb-0.5">Form 2</h2>
            <p className="text-xs text-slate-400">{form2HasInProgress ? 'Resume where you left off.' : 'SAT Premium'}</p>
            <SatExamDetails />
            <span className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white group-hover:bg-indigo-700 transition-colors">
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
        {form3Access.canCompleteFeedback && form3Access.attemptId ? (
          <div className="rounded-xl border border-amber-200 bg-white p-5 flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <div className="h-8 w-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-indigo-600">3</span>
              </div>
              <span className="inline-flex items-center rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10px] font-semibold text-amber-700">Feedback</span>
            </div>
            <h2 className="font-semibold text-slate-900 mb-0.5">Form 3</h2>
            <p className="text-xs text-slate-400">Complete your feedback to unlock full results.</p>
            <SatExamDetails />
            <Link href={`/premade/sat/form-3/results/${form3Access.attemptId}`} className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-amber-500 px-4 py-2 text-xs font-semibold text-white hover:bg-amber-600 transition-colors">
              Complete Feedback →
            </Link>
          </div>
        ) : form3Access.canViewResult && form3Access.attemptId ? (
          <div className="rounded-xl border border-emerald-200 bg-white p-5 flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <div className="h-8 w-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-indigo-600">3</span>
              </div>
              <span className="inline-flex items-center rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">Completed</span>
            </div>
            <h2 className="font-semibold text-slate-900 mb-0.5">Form 3</h2>
            <p className="text-xs text-slate-400">You already completed this exam.</p>
            <SatExamDetails />
            <Link href={`/premade/sat/form-3/results/${form3Access.attemptId}`} className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700 transition-colors">
              View Results →
            </Link>
          </div>
        ) : form3Access.canResume ? (
          <Link href="/premade/sat/form-3" className="rounded-xl border border-indigo-200 bg-white p-5 hover:border-indigo-400 hover:shadow-sm transition-all group flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <div className="h-8 w-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-indigo-600">3</span>
              </div>
              <span className="inline-flex items-center rounded-full bg-indigo-50 border border-indigo-200 px-2 py-0.5 text-[10px] font-semibold text-indigo-700">In Progress</span>
            </div>
            <h2 className="font-semibold text-slate-900 group-hover:text-indigo-700 transition-colors mb-0.5">Form 3</h2>
            <p className="text-xs text-slate-400">Resume where you left off.</p>
            <SatExamDetails />
            <span className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white group-hover:bg-indigo-700 transition-colors">
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
          <Link href="/premade/sat/form-3" className="rounded-xl border border-indigo-200 bg-white p-5 hover:border-indigo-400 hover:shadow-sm transition-all group flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <div className="h-8 w-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-indigo-600">3</span>
              </div>
              {isAdmin && <span className="inline-flex items-center rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10px] font-semibold text-amber-700">Admin</span>}
            </div>
            <h2 className="font-semibold text-slate-900 group-hover:text-indigo-700 transition-colors mb-0.5">Form 3</h2>
            <p className="text-xs text-slate-400">{isAdmin ? 'Full access' : 'SAT Premium'}</p>
            <SatExamDetails />
            <span className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white group-hover:bg-indigo-700 transition-colors">
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

        {/* ── Form 4 ────────────────────────────────────────────────────── */}
        {form4ResultsAttemptId && !isAdmin && !satUpgradeUnlocked ? (
          <div className="rounded-xl border border-emerald-200 bg-white p-5 flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <div className="h-8 w-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-indigo-600">4</span>
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
        ) : isAdmin || satUpgradeUnlocked ? (
          <Link href="/premade/sat/form-4" className="rounded-xl border border-indigo-200 bg-white p-5 hover:border-indigo-400 hover:shadow-sm transition-all group flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <div className="h-8 w-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-indigo-600">4</span>
              </div>
              {isAdmin && <span className="inline-flex items-center rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10px] font-semibold text-amber-700">Admin</span>}
            </div>
            <h2 className="font-semibold text-slate-900 group-hover:text-indigo-700 transition-colors mb-0.5">Form 4</h2>
            <p className="text-xs text-slate-400">{isAdmin ? 'Full access' : 'SAT Premium'}</p>
            <SatExamDetails />
            <span className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white group-hover:bg-indigo-700 transition-colors">
              Start Exam →
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

        {/* ── Form 5 ────────────────────────────────────────────────────── */}
        {form5ResultsAttemptId && !isAdmin && !satUpgradeUnlocked ? (
          <div className="rounded-xl border border-emerald-200 bg-white p-5 flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <div className="h-8 w-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-indigo-600">5</span>
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
        ) : isAdmin || satUpgradeUnlocked ? (
          <Link href="/premade/sat/form-5" className="rounded-xl border border-indigo-200 bg-white p-5 hover:border-indigo-400 hover:shadow-sm transition-all group flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <div className="h-8 w-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-indigo-600">5</span>
              </div>
              {isAdmin && <span className="inline-flex items-center rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10px] font-semibold text-amber-700">Admin</span>}
            </div>
            <h2 className="font-semibold text-slate-900 group-hover:text-indigo-700 transition-colors mb-0.5">Form 5</h2>
            <p className="text-xs text-slate-400">{isAdmin ? 'Full access' : 'SAT Premium'}</p>
            <SatExamDetails />
            <span className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white group-hover:bg-indigo-700 transition-colors">
              Start Exam →
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

      </div>
    </div>
  )
}
