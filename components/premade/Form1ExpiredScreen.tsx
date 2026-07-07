import Link from 'next/link'

export default function Form1ExpiredScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center">
        <div className="h-14 w-14 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-5">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7 text-slate-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
          </svg>
        </div>
        <h1 className="text-[18px] font-bold text-slate-900 mb-2">Free Access Period Ended</h1>
        <p className="text-[13px] text-slate-500 leading-relaxed mb-6">
          Your 10-day free window for SAT Form 1 has expired. Unlock Form 2 and Form 3 to keep
          practicing, or head to the Question Bank for targeted drill sets.
        </p>
        <div className="flex flex-col gap-3">
          <Link
            href="/billing"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors"
          >
            Unlock Form 2 &amp; Form 3
          </Link>
          <Link
            href="/question-bank"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-6 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Go to Question Bank
          </Link>
          <Link
            href="/premade/sat"
            className="text-[12px] text-slate-400 hover:text-slate-600 transition-colors mt-1"
          >
            ← Back to SAT Practice Forms
          </Link>
        </div>
      </div>
    </div>
  )
}
