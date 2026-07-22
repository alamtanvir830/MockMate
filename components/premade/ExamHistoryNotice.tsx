import Link from 'next/link'

/**
 * Informational notice pointing students to Exam History.
 * Server-compatible (no 'use client') — renders as static JSX.
 */
export function ExamHistoryNotice() {
  return (
    <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-6">
      <div className="flex items-start gap-3 flex-1 min-w-0">
        <div className="mt-0.5 shrink-0 h-7 w-7 rounded-full bg-emerald-100 flex items-center justify-center">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
          </svg>
        </div>
        <div className="min-w-0">
          <p className="text-[13px] font-medium text-emerald-900 leading-snug">
            Your incomplete and completed exams are saved in Exam History, which can be found in the left-hand sidebar.
          </p>
          <p className="text-[12px] text-emerald-700 mt-0.5">
            You can leave an exam and return later without losing your saved answers.
          </p>
        </div>
      </div>
      <Link
        href="/exams"
        className="shrink-0 inline-flex items-center justify-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[12px] font-semibold px-4 py-2 transition-colors whitespace-nowrap focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
      >
        View Exam History
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-3 w-3" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </Link>
    </div>
  )
}
