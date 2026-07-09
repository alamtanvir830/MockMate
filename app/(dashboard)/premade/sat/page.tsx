import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { isMockMateAdmin } from '@/lib/auth/admin'
import { isForm1Expired, formatCountdown } from '@/lib/premade-exams/sat/form1-access'
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

  let form1ResultsAttemptId: string | null = null
  let form1AccessExpiresAt: string | null = null

  if (user && !isAdmin) {
    const [completedResult, accessResult] = await Promise.all([
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
      supabase
        .from('sat_form_1_access')
        .select('access_expires_at')
        .eq('user_id', user.id)
        .maybeSingle(),
    ])

    form1ResultsAttemptId = completedResult.data?.local_attempt_id ?? null
    form1AccessExpiresAt = (accessResult.data as { access_expires_at: string } | null)?.access_expires_at ?? null
  }

  const form1Completed = !!form1ResultsAttemptId
  const form1Expired =
    !form1Completed &&
    form1AccessExpiresAt !== null &&
    isForm1Expired({ access_expires_at: form1AccessExpiresAt })

  const form1Href = form1Completed
    ? `/premade/sat/form-1/results/${form1ResultsAttemptId}`
    : '/premade/sat/form-1'

  const countdown =
    !form1Completed && !form1Expired && form1AccessExpiresAt
      ? formatCountdown({ access_expires_at: form1AccessExpiresAt })
      : null

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
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

      {/* Form cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Form 1 — state-driven rendering */}
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
              href={form1Href}
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
        ) : form1Expired ? (
          /* ── Expired ── */
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 flex flex-col opacity-75">
            <div className="flex items-start justify-between mb-4">
              <div className="h-9 w-9 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-slate-400">1</span>
              </div>
              <span className="inline-flex items-center rounded-full bg-slate-100 border border-slate-200 px-2 py-0.5 text-[10px] font-semibold text-slate-500">
                Expired
              </span>
            </div>
            <h2 className="font-semibold text-slate-500 mb-1">Form 1</h2>
            <p className="text-xs text-slate-400 mb-4">Your 10-day free window has ended.</p>
            <Link
              href="/billing"
              className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700 transition-colors"
            >
              Unlock Form 2 &amp; Form 3
            </Link>
          </div>
        ) : (
          /* ── Active (free window open) ── */
          <Link
            href="/premade/sat/form-1"
            className="rounded-xl border border-indigo-200 bg-white p-6 hover:border-indigo-400 hover:shadow-sm transition-all group flex flex-col"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="h-9 w-9 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-indigo-600">1</span>
              </div>
              {countdown ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-2.5 w-2.5 shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
                  </svg>
                  {countdown} left
                </span>
              ) : (
                <span className="inline-flex items-center rounded-full bg-sky-50 border border-sky-200 px-2 py-0.5 text-[10px] font-semibold text-sky-700">
                  Free
                </span>
              )}
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
        )}

        {/* Form 2 */}
        {isAdmin || satUpgradeUnlocked ? (
          <Link
            href="/premade/sat/form-2"
            className="rounded-xl border border-indigo-200 bg-white p-6 hover:border-indigo-400 hover:shadow-sm transition-all group flex flex-col"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="h-9 w-9 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-indigo-600">2</span>
              </div>
              {isAdmin && (
                <span className="inline-flex items-center rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10px] font-semibold text-amber-700">Admin</span>
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
        ) : (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 flex flex-col opacity-80">
            <div className="flex items-start justify-between mb-4">
              <div className="h-9 w-9 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-slate-400">2</span>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 border border-slate-200 px-2 py-0.5 text-[10px] font-semibold text-slate-500">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-2.5 w-2.5 shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
                Locked
              </span>
            </div>
            <h2 className="font-semibold text-slate-500 mb-1">Form 2</h2>
            <p className="text-xs text-slate-400 mb-4">Unlock to access this full-length adaptive practice exam.</p>
            <Link
              href="/billing"
              className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700 transition-colors"
            >
              Unlock SAT Forms
            </Link>
          </div>
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
      </div>
    </div>
  )
}
