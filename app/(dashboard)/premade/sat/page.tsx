import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { isMockMateAdmin } from '@/lib/auth/admin'
import { isForm1Expired } from '@/lib/premade-exams/sat/form1-access'
import { getOrCreateFreeExamAccess, isFreeExamExpired } from '@/lib/premade-exams/sat/free-exam-access'
import { SatFreeExamBadgeCountdown } from '@/components/sat/SatFreeExamCountdown'
import { SatForm1BadgeCountdown } from '@/components/sat/SatForm1Countdown'
import { getEntitlements } from '@/lib/entitlements'

const cardDetails = [
  'Reading & Writing + Math',
  '98 questions',
  '2 hr 14 min',
  '400–1600 estimated score range',
]

export default async function SATPremadePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const isAdmin = isMockMateAdmin(user)
  const { satUpgradeUnlocked } = await getEntitlements()

  // Form 1 state (for completed results and legacy free-window users)
  let form1ResultsAttemptId: string | null = null
  let form1LegacyExpiresAt: string | null = null  // non-null only if legacy window still open

  // Form 2 state (the current free exam)
  let form2ResultsAttemptId: string | null = null
  let form2AccessExpiresAt: string | null = null

  if (user && !isAdmin && !satUpgradeUnlocked) {
    const [
      form1Completed,
      form1AccessRow,
      form2Completed,
      form2Access,
    ] = await Promise.all([
      supabase
        .from('standardized_exam_attempts')
        .select('local_attempt_id')
        .eq('user_id', user.id)
        .eq('exam_type', 'SAT')
        .eq('form_number', 1)
        .not('completed_at', 'is', null)
        .order('completed_at', { ascending: false })
        .limit(1)
        .maybeSingle(),
      // Only read, never create — Form 1 is no longer free for new attempts
      supabase
        .from('sat_form_1_access')
        .select('access_expires_at')
        .eq('user_id', user.id)
        .maybeSingle(),
      supabase
        .from('standardized_exam_attempts')
        .select('local_attempt_id')
        .eq('user_id', user.id)
        .eq('exam_type', 'SAT')
        .eq('form_number', 2)
        .not('completed_at', 'is', null)
        .order('completed_at', { ascending: false })
        .limit(1)
        .maybeSingle(),
      getOrCreateFreeExamAccess(supabase, user),
    ])

    form1ResultsAttemptId = form1Completed.data?.local_attempt_id ?? null

    const f1Row = form1AccessRow.data
    if (f1Row && !isForm1Expired({ access_expires_at: f1Row.access_expires_at })) {
      form1LegacyExpiresAt = f1Row.access_expires_at
    }

    form2ResultsAttemptId = form2Completed.data?.local_attempt_id ?? null
    form2AccessExpiresAt = form2Access.access_expires_at
  }

  // ── Derived Form 1 card state ───────────────────────────────────────────
  const form1Completed = !!form1ResultsAttemptId
  const form1HasLegacyWindow = !!form1LegacyExpiresAt

  // ── Derived Form 2 card state ───────────────────────────────────────────
  const form2Completed = !!form2ResultsAttemptId
  const form2Expired =
    !form2Completed &&
    form2AccessExpiresAt !== null &&
    isFreeExamExpired({ access_expires_at: form2AccessExpiresAt })
  const form2ShowCountdown =
    !form2Completed && !form2Expired && form2AccessExpiresAt !== null

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
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

      {/* Form cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {/* Form 1 — Premium-only; legacy free-window users can still enter */}
        {form1Completed ? (
          /* ── Completed ── */
          <div className="rounded-xl border border-emerald-200 bg-white p-6 flex flex-col">
            <div className="flex items-start justify-between mb-4">
              <div className="h-9 w-9 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-indigo-600">1</span>
              </div>
              <span className="inline-flex items-center rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                Completed
              </span>
            </div>
            <h2 className="font-semibold text-slate-900 mb-1">Form 1</h2>
            <p className="text-xs text-slate-400 mb-3">You already completed this exam.</p>
            <ul className="space-y-1.5 mb-4">
              {cardDetails.map((detail) => (
                <li key={detail} className="text-xs text-slate-400 flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-slate-200 shrink-0" />
                  {detail}
                </li>
              ))}
            </ul>
            <Link
              href={`/premade/sat/form-1/results/${form1ResultsAttemptId}`}
              className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700 transition-colors"
            >
              View Results →
            </Link>
          </div>
        ) : isAdmin ? (
          /* ── Admin ── */
          <Link
            href="/premade/sat/form-1"
            className="rounded-xl border border-indigo-200 bg-white p-6 hover:border-indigo-400 hover:shadow-sm transition-all group flex flex-col"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="h-9 w-9 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-indigo-600">1</span>
              </div>
              <span className="inline-flex items-center rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                Admin
              </span>
            </div>
            <h2 className="font-semibold text-slate-900 group-hover:text-indigo-700 transition-colors mb-1">Form 1</h2>
            <p className="text-[10px] text-amber-600 mb-3">Admin testing mode: retakes allowed</p>
            <ul className="space-y-1.5 mt-auto">
              {cardDetails.map((detail) => (
                <li key={detail} className="text-xs text-slate-400 flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-slate-200 shrink-0" />
                  {detail}
                </li>
              ))}
            </ul>
          </Link>
        ) : satUpgradeUnlocked ? (
          /* ── Premium ── */
          <Link
            href="/premade/sat/form-1"
            className="rounded-xl border border-indigo-200 bg-white p-6 hover:border-indigo-400 hover:shadow-sm transition-all group flex flex-col"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="h-9 w-9 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-indigo-600">1</span>
              </div>
            </div>
            <h2 className="font-semibold text-slate-900 group-hover:text-indigo-700 transition-colors mb-3">Form 1</h2>
            <ul className="space-y-1.5 mt-auto">
              {cardDetails.map((detail) => (
                <li key={detail} className="text-xs text-slate-400 flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-slate-200 shrink-0" />
                  {detail}
                </li>
              ))}
            </ul>
          </Link>
        ) : form1HasLegacyWindow ? (
          /* ── Legacy free window still open ── */
          <Link
            href="/premade/sat/form-1"
            className="rounded-xl border border-indigo-200 bg-white p-6 hover:border-indigo-400 hover:shadow-sm transition-all group flex flex-col"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="h-9 w-9 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-indigo-600">1</span>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-2.5 w-2.5 shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
                </svg>
                <SatForm1BadgeCountdown expiresAt={form1LegacyExpiresAt!} />
              </span>
            </div>
            <h2 className="font-semibold text-slate-900 group-hover:text-indigo-700 transition-colors mb-3">Form 1</h2>
            <ul className="space-y-1.5 mt-auto">
              {cardDetails.map((detail) => (
                <li key={detail} className="text-xs text-slate-400 flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-slate-200 shrink-0" />
                  {detail}
                </li>
              ))}
            </ul>
          </Link>
        ) : (
          /* ── Premium-locked ── */
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 flex flex-col opacity-80">
            <div className="flex items-start justify-between mb-4">
              <div className="h-9 w-9 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-slate-400">1</span>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 border border-slate-200 px-2 py-0.5 text-[10px] font-semibold text-slate-500">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-2.5 w-2.5 shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
                Premium
              </span>
            </div>
            <h2 className="font-semibold text-slate-500 mb-1">Form 1</h2>
            <p className="text-xs text-slate-400 mb-4">Unlock with SAT Premium to access this form.</p>
            <Link
              href="/billing"
              className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700 transition-colors"
            >
              Get SAT Premium
            </Link>
          </div>
        )}

        {/* Form 2 — now the free 48-hour exam */}
        {form2Completed ? (
          /* ── Completed ── */
          <div className="rounded-xl border border-emerald-200 bg-white p-6 flex flex-col">
            <div className="flex items-start justify-between mb-4">
              <div className="h-9 w-9 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-indigo-600">2</span>
              </div>
              <span className="inline-flex items-center rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                Completed
              </span>
            </div>
            <h2 className="font-semibold text-slate-900 mb-1">Form 2</h2>
            <p className="text-xs text-slate-400 mb-3">You already completed this free exam.</p>
            <ul className="space-y-1.5 mb-4">
              {cardDetails.map((detail) => (
                <li key={detail} className="text-xs text-slate-400 flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-slate-200 shrink-0" />
                  {detail}
                </li>
              ))}
            </ul>
            <Link
              href={`/premade/sat/form-2/results/${form2ResultsAttemptId}`}
              className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700 transition-colors"
            >
              View Results →
            </Link>
          </div>
        ) : isAdmin ? (
          /* ── Admin ── */
          <Link
            href="/premade/sat/form-2"
            className="rounded-xl border border-indigo-200 bg-white p-6 hover:border-indigo-400 hover:shadow-sm transition-all group flex flex-col"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="h-9 w-9 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-indigo-600">2</span>
              </div>
              <span className="inline-flex items-center rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10px] font-semibold text-amber-700">Admin</span>
            </div>
            <h2 className="font-semibold text-slate-900 group-hover:text-indigo-700 transition-colors mb-3">Form 2</h2>
            <ul className="space-y-1.5 mt-auto">
              {cardDetails.map((detail) => (
                <li key={detail} className="text-xs text-slate-400 flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-slate-200 shrink-0" />
                  {detail}
                </li>
              ))}
            </ul>
          </Link>
        ) : satUpgradeUnlocked ? (
          /* ── Premium ── */
          <Link
            href="/premade/sat/form-2"
            className="rounded-xl border border-indigo-200 bg-white p-6 hover:border-indigo-400 hover:shadow-sm transition-all group flex flex-col"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="h-9 w-9 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-indigo-600">2</span>
              </div>
            </div>
            <h2 className="font-semibold text-slate-900 group-hover:text-indigo-700 transition-colors mb-3">Form 2</h2>
            <ul className="space-y-1.5 mt-auto">
              {cardDetails.map((detail) => (
                <li key={detail} className="text-xs text-slate-400 flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-slate-200 shrink-0" />
                  {detail}
                </li>
              ))}
            </ul>
          </Link>
        ) : form2Expired ? (
          /* ── Expired ── */
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 flex flex-col opacity-75">
            <div className="flex items-start justify-between mb-4">
              <div className="h-9 w-9 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-slate-400">2</span>
              </div>
              <span className="inline-flex items-center rounded-full bg-slate-100 border border-slate-200 px-2 py-0.5 text-[10px] font-semibold text-slate-500">
                Expired
              </span>
            </div>
            <h2 className="font-semibold text-slate-500 mb-1">Form 2</h2>
            <p className="text-xs text-slate-400 mb-4">Your free access window has ended.</p>
            <Link
              href="/billing"
              className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700 transition-colors"
            >
              Get Unlimited Access
            </Link>
          </div>
        ) : (
          /* ── Active (free window open) ── */
          <Link
            href="/premade/sat/form-2"
            className="rounded-xl border border-indigo-200 bg-white p-6 hover:border-indigo-400 hover:shadow-sm transition-all group flex flex-col"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="h-9 w-9 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-indigo-600">2</span>
              </div>
              {form2ShowCountdown ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-2.5 w-2.5 shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
                  </svg>
                  <SatFreeExamBadgeCountdown expiresAt={form2AccessExpiresAt!} />
                </span>
              ) : (
                <span className="inline-flex items-center rounded-full bg-sky-50 border border-sky-200 px-2 py-0.5 text-[10px] font-semibold text-sky-700">
                  Free
                </span>
              )}
            </div>
            <h2 className="font-semibold text-slate-900 group-hover:text-indigo-700 transition-colors mb-3">Form 2</h2>
            <ul className="space-y-1.5 mt-auto">
              {cardDetails.map((detail) => (
                <li key={detail} className="text-xs text-slate-400 flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-slate-200 shrink-0" />
                  {detail}
                </li>
              ))}
            </ul>
          </Link>
        )}

        {/* Form 3 */}
        {isAdmin || satUpgradeUnlocked ? (
          <Link
            href="/premade/sat/form-3"
            className="rounded-xl border border-indigo-200 bg-white p-6 hover:border-indigo-400 hover:shadow-sm transition-all group flex flex-col"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="h-9 w-9 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-indigo-600">3</span>
              </div>
              {isAdmin && (
                <span className="inline-flex items-center rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10px] font-semibold text-amber-700">Admin</span>
              )}
            </div>
            <h2 className="font-semibold text-slate-900 group-hover:text-indigo-700 transition-colors mb-3">Form 3</h2>
            <ul className="space-y-1.5 mt-auto">
              {cardDetails.map((detail) => (
                <li key={detail} className="text-xs text-slate-400 flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-slate-200 shrink-0" />
                  {detail}
                </li>
              ))}
            </ul>
          </Link>
        ) : (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 flex flex-col opacity-80">
            <div className="flex items-start justify-between mb-4">
              <div className="h-9 w-9 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-slate-400">3</span>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 border border-slate-200 px-2 py-0.5 text-[10px] font-semibold text-slate-500">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-2.5 w-2.5 shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
                Locked
              </span>
            </div>
            <h2 className="font-semibold text-slate-500 mb-1">Form 3</h2>
            <p className="text-xs text-slate-400 mb-4">Unlock to access this full-length adaptive practice exam.</p>
            <Link
              href="/billing"
              className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700 transition-colors"
            >
              Unlock SAT Forms
            </Link>
          </div>
        )}

        {/* Form 4 */}
        {isAdmin || satUpgradeUnlocked ? (
          <Link
            href="/premade/sat/form-4"
            className="rounded-xl border border-indigo-200 bg-white p-6 hover:border-indigo-400 hover:shadow-sm transition-all group flex flex-col"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="h-9 w-9 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-indigo-600">4</span>
              </div>
              {isAdmin && (
                <span className="inline-flex items-center rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10px] font-semibold text-amber-700">Admin</span>
              )}
            </div>
            <h2 className="font-semibold text-slate-900 group-hover:text-indigo-700 transition-colors mb-3">Form 4</h2>
            <ul className="space-y-1.5 mt-auto">
              {cardDetails.map((detail) => (
                <li key={detail} className="text-xs text-slate-400 flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-slate-200 shrink-0" />
                  {detail}
                </li>
              ))}
            </ul>
          </Link>
        ) : (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 flex flex-col opacity-80">
            <div className="flex items-start justify-between mb-4">
              <div className="h-9 w-9 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-slate-400">4</span>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 border border-slate-200 px-2 py-0.5 text-[10px] font-semibold text-slate-500">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-2.5 w-2.5 shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
                Locked
              </span>
            </div>
            <h2 className="font-semibold text-slate-500 mb-1">Form 4</h2>
            <p className="text-xs text-slate-400 mb-4">Unlock to access this full-length adaptive practice exam.</p>
            <Link
              href="/billing"
              className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700 transition-colors"
            >
              Unlock SAT Forms
            </Link>
          </div>
        )}

        {/* Form 5 */}
        {isAdmin || satUpgradeUnlocked ? (
          <Link
            href="/premade/sat/form-5"
            className="rounded-xl border border-indigo-200 bg-white p-6 hover:border-indigo-400 hover:shadow-sm transition-all group flex flex-col"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="h-9 w-9 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-indigo-600">5</span>
              </div>
              {isAdmin && (
                <span className="inline-flex items-center rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10px] font-semibold text-amber-700">Admin</span>
              )}
            </div>
            <h2 className="font-semibold text-slate-900 group-hover:text-indigo-700 transition-colors mb-3">Form 5</h2>
            <ul className="space-y-1.5 mt-auto">
              {cardDetails.map((detail) => (
                <li key={detail} className="text-xs text-slate-400 flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-slate-200 shrink-0" />
                  {detail}
                </li>
              ))}
            </ul>
          </Link>
        ) : (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 flex flex-col opacity-80">
            <div className="flex items-start justify-between mb-4">
              <div className="h-9 w-9 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-slate-400">5</span>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 border border-slate-200 px-2 py-0.5 text-[10px] font-semibold text-slate-500">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-2.5 w-2.5 shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
                Locked
              </span>
            </div>
            <h2 className="font-semibold text-slate-500 mb-1">Form 5</h2>
            <p className="text-xs text-slate-400 mb-4">Unlock to access this full-length adaptive practice exam.</p>
            <Link
              href="/billing"
              className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700 transition-colors"
            >
              Unlock SAT Forms
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
