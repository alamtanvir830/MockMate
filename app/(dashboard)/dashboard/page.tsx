import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ExamStatusBadge } from '@/components/ui/badge'
import { daysUntil, isExamLocked } from '@/lib/utils'
import { QBHistorySection } from '@/components/dashboard/QBHistorySection'
import { isMockMateAdmin } from '@/lib/auth/admin'
import { hasSatPremium, isLegacyLifetimeUser } from '@/lib/auth/server'
import { EmailVerificationBanner } from '@/components/auth/EmailVerificationBanner'
import { Form3DashboardBanner, Form3CountdownBadge } from '@/components/sat/Form3Countdown'
import { Form4DashboardBanner, Form4CountdownBadge } from '@/components/sat/Form4Countdown'
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
import type { Exam } from '@/types'

type SatCardState =
  | { tag: 'admin' }
  | { tag: 'upgraded' }
  | { tag: 'default' }

export const metadata: Metadata = { title: 'Dashboard' }
export const dynamic = 'force-dynamic'

function greeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const admin = createAdminClient()

  // Read fresh metadata via admin API — bypasses the JWT cache so premium/
  // subscription status is always current even within the same cookie window.
  const { data: freshAuthData } = await admin.auth.admin.getUserById(user!.id)
  const currentMeta = (freshAuthData?.user?.user_metadata ??
    user?.user_metadata ??
    {}) as Record<string, unknown>

  const fullName = user?.user_metadata?.full_name as string | undefined
  const displayName = fullName ?? user?.email?.split('@')[0] ?? 'there'

  // SAT card state
  const isAdminUser = isMockMateAdmin(user)
  // Use freshly-read metadata so subscription users get immediate access after webhook fires
  const freshUserForChecks = { email: user?.email, user_metadata: currentMeta }
  const hasPremium = hasSatPremium(freshUserForChecks)
  const isLegacyLifetime = isLegacyLifetimeUser(freshUserForChecks)
  let satCardState: SatCardState = { tag: 'default' }

  if (user) {
    if (isAdminUser) {
      satCardState = { tag: 'admin' }
    } else if (hasPremium) {
      satCardState = { tag: 'upgraded' }
    }
  }

  // ── Form 3 free-window state (non-premium, non-admin only) ─────────────
  // Skip these DB queries entirely for premium/admin users — they don't need
  // the timer and we avoid hitting sat_form3_promotion for every premium visit.
  let form3FreeWindow: Awaited<ReturnType<typeof getGlobalForm3Window>> = null
  let form3InProgressAttemptId: string | null = null
  let form3InProgressStartedAt: string | null = null
  let form3AttemptStatus: Form3AttemptStatus = 'none'
  let form3CompletedAttemptId: string | null = null

  if (user && !isAdminUser && !hasPremium) {
    const [form3Window, form3CompletedRow, form3InProgress] = await Promise.all([
      getGlobalForm3Window(supabase),
      supabase
        .from('standardized_exam_attempts')
        .select('local_attempt_id, ai_feedback')
        .eq('user_id', user.id).eq('exam_type', 'SAT').eq('form_number', 3)
        .not('completed_at', 'is', null)
        .order('completed_at', { ascending: false })
        .limit(1)
        .maybeSingle(),
      supabase
        .from('sat_in_progress_attempts')
        .select('local_attempt_id, started_at')
        .eq('user_id', user.id)
        .eq('form_number', 3)
        .maybeSingle(),
    ])

    form3FreeWindow = form3Window
    const f3completed = form3CompletedRow.data as { local_attempt_id: string; ai_feedback: unknown } | null
    form3CompletedAttemptId = f3completed?.local_attempt_id ?? null
    const form3FeedbackRequired = !!(f3completed && !f3completed.ai_feedback)
    form3InProgressAttemptId = form3InProgress.data?.local_attempt_id ?? null
    form3InProgressStartedAt = (form3InProgress.data?.started_at as string | undefined) ?? null

    form3AttemptStatus =
      form3FeedbackRequired ? 'feedback-required'
      : !!form3CompletedAttemptId ? 'completed'
      : !!form3InProgressAttemptId ? 'in-progress'
      : 'none'
  }

  const form3Access = resolveForm3Access({
    isAdmin: isAdminUser,
    isPremium: hasPremium,
    freeWindow: form3FreeWindow,
    attemptStatus: form3AttemptStatus,
    attemptId: form3CompletedAttemptId ?? form3InProgressAttemptId,
    inProgressStartedAt: form3InProgressStartedAt,
  })

  // Show Form 3 banner instead of generic Premium banner when the user has any
  // active Form 3 access (start, resume, feedback, or results).
  const showForm3Banner = !isAdminUser && !hasPremium && (
    form3Access.canStart ||
    form3Access.canResume ||
    form3Access.canCompleteFeedback ||
    form3Access.canViewResult
  )

  // All Form 3 actions on the Dashboard funnel through /premade/sat so users
  // see the full five-form grid before taking any action on Form 3.
  const form3Action: { href: string; label: string } | null = showForm3Banner
    ? { href: '/premade/sat', label: 'View SAT Exam Forms' }
    : null

  // ── Form 4 free-window state (non-premium, non-admin only) ─────────────
  // getForm4FreeWindow() is synchronous (hardcoded constants) — no DB needed
  // just to know whether the window exists. DB queries only run when the window
  // is active and the user is non-premium so we can compute their attempt status.
  const form4FreeWindow = getForm4FreeWindow()
  let form4InProgressAttemptId: string | null = null
  let form4InProgressStartedAt: string | null = null
  let form4AttemptStatus: Form4AttemptStatus = 'none'

  if (user && !isAdminUser && !hasPremium && form4FreeWindow) {
    const now = new Date()
    const windowActive =
      new Date(form4FreeWindow.startsAt) <= now &&
      now < new Date(form4FreeWindow.expiresAt)

    if (windowActive) {
      const [form4Completed, form4InProgress] = await Promise.all([
        supabase
          .from('standardized_exam_attempts')
          .select('local_attempt_id, ai_feedback')
          .eq('user_id', user.id)
          .eq('exam_type', 'SAT')
          .eq('form_number', 4)
          .not('completed_at', 'is', null)
          .order('completed_at', { ascending: false })
          .limit(1)
          .maybeSingle(),
        supabase
          .from('sat_in_progress_attempts')
          .select('local_attempt_id, started_at')
          .eq('user_id', user.id)
          .eq('form_number', 4)
          .maybeSingle(),
      ])

      const f4row = form4Completed.data as { local_attempt_id: string; ai_feedback: unknown } | null
      const form4FeedbackRequired = !!(f4row && !f4row.ai_feedback)
      const form4CompletedAttemptId = f4row?.local_attempt_id ?? null
      form4InProgressAttemptId = form4InProgress.data?.local_attempt_id ?? null
      form4InProgressStartedAt = (form4InProgress.data?.started_at as string | undefined) ?? null

      form4AttemptStatus =
        form4FeedbackRequired ? 'feedback-required'
        : !!form4CompletedAttemptId ? 'completed'
        : !!form4InProgressAttemptId ? 'in-progress'
        : 'none'
    }
  }

  const form4Access = resolveForm4Access({
    isAdmin: isAdminUser,
    isPremium: hasPremium,
    freeWindow: form4FreeWindow,
    attemptStatus: form4AttemptStatus,
    attemptId: form4InProgressAttemptId,
    inProgressStartedAt: form4InProgressStartedAt,
  })

  // Show Form 4 banner when the free window is active and the user can still
  // start or resume. Completed users don't need the promotional banner.
  const showForm4Banner = !isAdminUser && !hasPremium &&
    form4Access.accessSource === 'free-window' &&
    (form4Access.canStart || form4Access.canResume)

  // Owned exams
  const { data: exams } = await supabase
    .from('exams')
    .select('*')
    .eq('user_id', user!.id)
    .order('created_at', { ascending: false })

  const allExams: Exam[] = exams ?? []
  const completedCount = allExams.filter((e) => e.status === 'completed').length
  const nextExam = allExams
    .filter((e) => e.status !== 'completed' && daysUntil(e.exam_date) >= 0)
    .sort((a, b) => new Date(a.exam_date).getTime() - new Date(b.exam_date).getTime())[0]
  const recentExams = allExams.slice(0, 5)

  // Shared exams — find exams shared with this user's email via admin client (bypasses RLS)
  const { data: sharedRecipients } = await admin
    .from('exam_shared_recipients')
    .select('exam_id')
    .eq('email', user!.email!)

  const sharedExamIds = (sharedRecipients ?? []).map((r) => r.exam_id)
  let sharedExams: Exam[] = []

  if (sharedExamIds.length > 0) {
    const { data } = await admin
      .from('exams')
      .select('*')
      .in('id', sharedExamIds)
      .order('created_at', { ascending: false })
    sharedExams = data ?? []
  }

  // Which shared exams has this user already completed (their own attempt)?
  const completedSharedIds = new Set<string>()
  if (sharedExamIds.length > 0) {
    const { data: myAttempts } = await admin
      .from('exam_attempts')
      .select('exam_id')
      .in('exam_id', sharedExamIds)
      .eq('user_id', user!.id)
      .eq('status', 'completed')
    for (const a of myAttempts ?? []) completedSharedIds.add(a.exam_id)
  }

  const emailUnverified = !user?.email_confirmed_at

  return (
    <div className="space-y-8">
      {emailUnverified && user?.email && (
        <EmailVerificationBanner email={user.email} />
      )}

      {/* Top banner — Form 4 free-window active (shown above Form 3 — more urgent) */}
      {user && showForm4Banner && (
        <Form4DashboardBanner
          expiresAt={form4Access.freeWindowExpiresAt!}
          actionHref="/premade/sat"
          actionLabel="View SAT Exam Forms"
        />
      )}

      {/* Top banner — Form 3 free access (active window) */}
      {user && showForm3Banner && form3Action && form3Access.accessSource === 'free-window' && (
        <Form3DashboardBanner
          expiresAt={form3Access.freeWindowExpiresAt!}
          actionHref={form3Action.href}
          actionLabel={form3Action.label}
        />
      )}

      {/* Top banner — Form 3 valid ongoing attempt (window expired but exam started/completed) */}
      {user && showForm3Banner && form3Action && form3Access.accessSource !== 'free-window' && (() => {
        const isResult = form3Access.canViewResult
        const isFeedback = form3Access.canCompleteFeedback
        const bannerClass = isResult
          ? 'bg-emerald-50 border-emerald-200'
          : isFeedback
          ? 'bg-amber-50 border-amber-200'
          : 'bg-brand-50 border-brand-200'
        const labelClass = isResult ? 'text-emerald-600' : isFeedback ? 'text-amber-600' : 'text-brand-600'
        const headingClass = isResult ? 'text-emerald-900' : isFeedback ? 'text-amber-900' : 'text-brand-900'
        const bodyClass = isResult ? 'text-emerald-700' : isFeedback ? 'text-amber-700' : 'text-brand-700'
        const btnClass = isResult
          ? 'bg-emerald-600 hover:bg-emerald-700'
          : isFeedback
          ? 'bg-amber-500 hover:bg-amber-600'
          : 'bg-brand-600 hover:bg-brand-700'
        return (
          <div className={`rounded-xl border p-5 flex flex-col sm:flex-row sm:items-start gap-4 flex-wrap ${bannerClass}`}>
            <div className="flex-1 min-w-0">
              <p className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${labelClass}`}>
                SAT Form 3
              </p>
              <p className={`text-[15px] font-bold leading-snug mb-1 ${headingClass}`}>
                {isFeedback
                  ? 'SAT Form 3 — Feedback Required'
                  : isResult
                  ? 'SAT Form 3 — Completed'
                  : 'SAT Form 3 — In Progress'}
              </p>
              <p className={`text-[12px] leading-relaxed ${bodyClass}`}>
                {isFeedback
                  ? 'Complete your feedback to unlock your full score report and personalized feedback.'
                  : isResult
                  ? 'View your full score report and personalized feedback.'
                  : 'You have an unfinished Form 3 exam.'}
              </p>
            </div>
            <Link href={form3Action!.href} className="shrink-0 sm:mt-1">
              <button className={`w-full sm:w-auto rounded-lg text-white text-sm font-bold px-5 py-2.5 transition-colors whitespace-nowrap min-h-[44px] ${btnClass}`}>
                {form3Action!.label} →
              </button>
            </Link>
          </div>
        )
      })()}

      {/* SAT Premium upsell banner — only when no Form 3 or Form 4 access is active */}
      {user && !isAdminUser && !hasPremium && !showForm3Banner && !showForm4Banner && (
        <div className="rounded-xl bg-amber-50 border border-amber-200 p-5">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="min-w-0">
              <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest mb-1">SAT Premium</p>
              <p className="text-[15px] font-bold text-amber-900 leading-snug mb-1">
                Unlock all 5 SAT Practice Forms
              </p>
              <p className="text-[12px] text-amber-700 leading-relaxed">
                Get SAT Premium for full access to Forms 1–5, the 1,000+ question bank, and both SAT Academies.
              </p>
            </div>
            <Link href="/billing" className="shrink-0">
              <button className="rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold px-5 py-2.5 transition-colors whitespace-nowrap">
                Get SAT Premium
              </button>
            </Link>
          </div>
        </div>
      )}

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          {greeting()}, {displayName} 👋
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          {allExams.length === 0
            ? 'Create your first mock exam to get started'
            : `${allExams.length} exam${allExams.length !== 1 ? 's' : ''} total`}
        </p>
      </div>

      {/* Skinny stats banner */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm">
        <span className="flex items-center gap-1.5 text-slate-600">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="h-4 w-4 text-emerald-500 shrink-0">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
          <span className="font-semibold text-slate-800">{allExams.length}</span> exams total
        </span>
        <span className="hidden sm:block text-slate-200">|</span>
        <span className="flex items-center gap-1.5 text-slate-600">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="h-4 w-4 text-emerald-500 shrink-0">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-semibold text-slate-800">{completedCount}</span> completed
        </span>
        <span className="hidden sm:block text-slate-200">|</span>
        <span className="flex items-center gap-1.5 text-slate-600">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="h-4 w-4 text-amber-500 shrink-0">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Next exam:{' '}
          <span className="font-semibold text-slate-800">
            {nextExam ? `${daysUntil(nextExam.exam_date)}d` : '—'}
          </span>
        </span>
      </div>

      {/* Pre-made Exams — primary section */}
      <div>
        <div className="mb-4">
          <h2 className="text-lg font-bold text-slate-900">Pre-made Exams</h2>
          <p className="text-sm text-slate-500 mt-0.5">Full-length adaptive practice exams, ready to go.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">

          {/* SAT card */}
          <div className={`rounded-xl border-2 bg-white p-5 flex flex-col gap-3 shadow-sm ${
            showForm3Banner ? 'border-amber-200 shadow-amber-50' :
            showForm4Banner ? 'border-brand-200 shadow-brand-50' :
            'border-blue-200 shadow-blue-50'
          }`}>
            <div className="flex items-start justify-between gap-3">
              <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                showForm3Banner ? 'bg-amber-100 text-amber-600' :
                showForm4Banner ? 'bg-brand-100 text-brand-600' :
                'bg-blue-100 text-blue-600'
              }`}>
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
              </div>
              <div className="flex gap-1.5 shrink-0 flex-wrap justify-end">
                {satCardState.tag === 'admin' && (
                  <span className="inline-flex items-center rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-xs font-semibold text-amber-700">Admin</span>
                )}
                {satCardState.tag === 'upgraded' && (
                  <span className="inline-flex items-center rounded-full bg-brand-50 border border-brand-200 px-2 py-0.5 text-xs font-semibold text-brand-700">
                    {isLegacyLifetime ? 'Lifetime' : 'Premium'}
                  </span>
                )}
                {satCardState.tag === 'default' && !showForm3Banner && !showForm4Banner && (
                  <span className="inline-flex items-center rounded-full bg-blue-50 border border-blue-200 px-2 py-0.5 text-xs font-medium text-blue-600">Pre-made</span>
                )}
                {showForm3Banner && (
                  <span className="inline-flex items-center rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-xs font-semibold text-amber-700">Form 3 Free</span>
                )}
                {showForm4Banner && (
                  <span className="inline-flex items-center rounded-full bg-brand-50 border border-brand-200 px-2 py-0.5 text-xs font-semibold text-brand-700">Form 4 Free</span>
                )}
              </div>
            </div>

            <div className="flex-1">
              <p className="font-bold text-base leading-snug text-slate-900">
                {satCardState.tag === 'upgraded'
                  ? isLegacyLifetime ? 'SAT Practice Forms — lifetime access' : 'SAT Practice Forms — active subscription'
                  : 'SAT Practice Exams'}
              </p>
              {satCardState.tag === 'admin' && (
                <p className="mt-1 text-xs text-amber-600">Admin testing mode: timer disabled</p>
              )}
              {satCardState.tag === 'upgraded' && (
                <p className="mt-1 text-xs text-brand-600 font-medium">
                  {isLegacyLifetime ? 'Lifetime SAT access unlocked — all forms available' : 'SAT Premium active — all forms available'}
                </p>
              )}
              {satCardState.tag === 'default' && showForm3Banner && (
                <p className="mt-1 text-xs text-amber-600 font-medium">
                  {form3Access.canCompleteFeedback
                    ? 'Complete your Form 3 feedback to unlock full results.'
                    : form3Access.canViewResult
                    ? 'Your Form 3 results are ready to view.'
                    : form3Access.canResume
                    ? 'Your Form 3 exam is in progress.'
                    : 'SAT Form 3 is free during your active 48-hour access window.'}
                </p>
              )}
              {satCardState.tag === 'default' && showForm4Banner && !showForm3Banner && (
                <p className="mt-1 text-xs text-brand-600 font-medium">
                  {form4Access.canResume
                    ? 'Resume your Form 4 exam before the free window closes.'
                    : 'SAT Form 4 is free for 72 hours — start before the window closes.'}
                </p>
              )}
              {satCardState.tag === 'default' && !showForm3Banner && !showForm4Banner && (
                <p className="mt-1 text-xs text-slate-500">
                  Get SAT Premium to unlock all 5 full-length adaptive SAT practice forms.
                </p>
              )}

              {/* Compact countdown badge inside the card — only when window is active */}
              {showForm3Banner && form3Access.accessSource === 'free-window' && form3Access.freeWindowExpiresAt && (
                <div className="mt-2">
                  <Form3CountdownBadge expiresAt={form3Access.freeWindowExpiresAt} />
                </div>
              )}
              {showForm4Banner && form4Access.freeWindowExpiresAt && (
                <div className="mt-2">
                  <Form4CountdownBadge expiresAt={form4Access.freeWindowExpiresAt} />
                </div>
              )}

              <p className="mt-2 text-xs text-slate-400">Adaptive · Full length · 98 questions · 2 hr 14 min</p>
              <p className="mt-0.5 text-xs text-slate-400">Forms 1–5 available with SAT Premium.</p>
            </div>

            {/* SAT card action button */}
            <Link href="/premade/sat">
              <button className={`w-full rounded-lg text-white text-sm font-bold px-4 py-2.5 transition-colors min-h-[44px] ${
                showForm3Banner
                  ? 'bg-amber-500 hover:bg-amber-600'
                  : showForm4Banner
                  ? 'bg-brand-500 hover:bg-brand-600'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}>
                View SAT Exam Forms
              </button>
            </Link>
          </div>

          {/* MCAT card */}
          <Card className="flex flex-col gap-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21a48.25 48.25 0 01-8.135-.687c-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                </svg>
              </div>
              <div className="flex gap-1.5 shrink-0">
                <span className="inline-flex items-center rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-xs font-medium text-emerald-700">Pre-made</span>
              </div>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-slate-900 text-sm leading-snug">If you&apos;re taking the MCAT, take your first MCAT exam</p>
              <p className="mt-1 text-xs text-slate-500">Begin with MCAT Form 1 and get section-by-section feedback and scoring.</p>
              <p className="mt-1.5 text-xs text-slate-400">AAMC-style structure · Full length</p>
            </div>
            <Link href="/premade/mcat/form-1">
              <button className="w-full rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-4 py-2.5 transition-colors">
                Start MCAT Form 1
              </button>
            </Link>
          </Card>
        </div>
      </div>

      {/* Next exam spotlight */}
      {nextExam && (() => {
        const locked = isExamLocked(nextExam.unlock_date)
        const daysToExam = daysUntil(nextExam.exam_date)
        const daysToUnlock = locked ? daysUntil(nextExam.unlock_date) : 0
        return (
          <Card className="bg-gradient-to-br from-emerald-600 to-teal-600 text-white border-0 shadow-lg shadow-emerald-200">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium text-emerald-200 uppercase tracking-widest mb-1">Next exam</p>
                <h2 className="text-xl font-bold">{nextExam.title}</h2>
                <p className="text-emerald-200 mt-1 text-sm">{nextExam.subject}</p>
                <p className="mt-3 text-sm text-emerald-100">
                  <span className="font-semibold text-white">{daysToExam} days</span>{' '}
                  until{' '}
                  {new Date(nextExam.exam_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                </p>
                {locked && (
                  <p className="mt-1 text-xs text-emerald-300">
                    Mock unlocks in {daysToUnlock} day{daysToUnlock !== 1 ? 's' : ''} ·{' '}
                    {new Date(nextExam.unlock_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </p>
                )}
              </div>
              {locked ? (
                <div className="shrink-0 flex items-center gap-1.5 rounded-lg bg-white/10 text-emerald-200 text-sm font-medium px-4 py-2">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                  Locked
                </div>
              ) : (
                <Link href={`/exams/${nextExam.id}/take`}>
                  <button className="shrink-0 rounded-lg bg-white/20 hover:bg-white/30 text-white text-sm font-medium px-4 py-2 transition-colors backdrop-blur-sm">
                    Practice now
                  </button>
                </Link>
              )}
            </div>
          </Card>
        )
      })()}

      {/* Question Bank History */}
      <QBHistorySection />

      {/* Exam History */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-slate-900">Exam History</h2>
          <Link href="/exams" className="text-sm text-emerald-600 hover:text-emerald-500 font-medium transition-colors">
            View all
          </Link>
        </div>

        {recentExams.length === 0 ? (
          <Card className="text-center py-12">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7 text-slate-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <p className="font-medium text-slate-700">No exams yet</p>
            <p className="mt-1 text-sm text-slate-400">Create your first mock exam to get started</p>
            <Link href="/exams/create" className="inline-block mt-4">
              <Button size="sm">Create exam</Button>
            </Link>
          </Card>
        ) : (
          <Card padded={false} className="divide-y divide-slate-100">
            {recentExams.map((exam) => {
              const days = daysUntil(exam.exam_date)
              const locked = isExamLocked(exam.unlock_date)
              return (
                <div key={exam.id} className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-slate-900 truncate">{exam.title}</p>
                    </div>
                    <p className="text-sm text-slate-400 mt-0.5">
                      {exam.subject} ·{' '}
                      {exam.status === 'completed'
                        ? 'Completed'
                        : locked
                        ? `Unlocks in ${daysUntil(exam.unlock_date)} day${daysUntil(exam.unlock_date) !== 1 ? 's' : ''}`
                        : days >= 0
                        ? `${days} day${days !== 1 ? 's' : ''} left`
                        : 'Past date'}
                    </p>
                  </div>
                  <ExamStatusBadge status={exam.status} locked={locked} />
                  {exam.status === 'completed' ? (
                    <Link href={`/exams/${exam.id}/results`} className="text-sm font-medium text-emerald-600 hover:text-emerald-500 transition-colors shrink-0">
                      View results
                    </Link>
                  ) : locked ? (
                    <span className="text-sm text-slate-400 shrink-0 flex items-center gap-1">
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                      </svg>
                      Locked
                    </span>
                  ) : (
                    <Link href={`/exams/${exam.id}/take`} className="text-sm font-medium text-emerald-600 hover:text-emerald-500 transition-colors shrink-0">
                      Open →
                    </Link>
                  )}
                </div>
              )
            })}
          </Card>
        )}
      </div>

      {/* Shared with you */}
      {sharedExams.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-semibold text-slate-900">Shared with you</h2>
              <p className="text-xs text-slate-500 mt-0.5">Exams shared by others — your attempt is independent</p>
            </div>
          </div>
          <Card padded={false} className="divide-y divide-slate-100">
            {sharedExams.map((exam) => {
              const isCompleted = completedSharedIds.has(exam.id)
              return (
                <div key={exam.id} className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-slate-900 truncate">{exam.title}</p>
                      <span className="shrink-0 inline-flex items-center rounded-full bg-brand-50 border border-brand-100 px-2 py-0.5 text-xs font-medium text-brand-600">
                        Shared
                      </span>
                    </div>
                    <p className="text-sm text-slate-400 mt-0.5">{exam.subject}</p>
                  </div>
                  {isCompleted ? (
                    <Link href={`/exams/${exam.id}/results`} className="text-sm font-medium text-emerald-600 hover:text-emerald-500 transition-colors shrink-0">
                      View results
                    </Link>
                  ) : (
                    <Link href={`/exams/${exam.id}/shared`} className="text-sm font-medium text-brand-600 hover:text-brand-500 transition-colors shrink-0">
                      Take exam →
                    </Link>
                  )}
                </div>
              )
            })}
          </Card>
        </div>
      )}
    </div>
  )
}
