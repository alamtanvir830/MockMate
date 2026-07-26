import Link from 'next/link'

export default function SATForm2LockedScreen({ hadInProgress }: { hadInProgress?: boolean }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center">
        <div className="h-14 w-14 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-5">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7 text-slate-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
          </svg>
        </div>
        <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-0.5 text-[11px] font-semibold text-slate-500 mb-4">
          Currently Unavailable
        </span>
        <h1 className="text-[18px] font-bold text-slate-900 mb-2">SAT Form 2 is currently locked.</h1>
        {hadInProgress ? (
          <p className="text-[13px] text-slate-500 leading-relaxed mb-6">
            You have an in-progress Form 2 attempt. Your answers and progress have been saved and
            can be restored if Form 2 access is reinstated. You have not lost any work.
          </p>
        ) : (
          <p className="text-[13px] text-slate-500 leading-relaxed mb-6">
            SAT Form 2 is temporarily unavailable. Your completed results, scores, and Exam History
            remain intact and accessible. Check back later for updates.
          </p>
        )}
        <div className="flex flex-col gap-3">
          <Link
            href="/premade/sat"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-6 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            ← View SAT Exam Forms
          </Link>
        </div>
      </div>
    </div>
  )
}
