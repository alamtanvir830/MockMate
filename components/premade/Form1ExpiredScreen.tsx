import Link from 'next/link'

export default function Form1ExpiredScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center">
        <div className="h-14 w-14 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-5">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7 text-amber-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-[18px] font-bold text-slate-900 mb-2">Your Free SAT Form 1 Access Has Ended</h1>
        <p className="text-[13px] text-slate-500 leading-relaxed mb-6">
          Your 48-hour access window has ended. Upgrade to SAT Premium for lifetime access to
          SAT Forms 1–5, the SAT Question Bank, and the complete SAT R&W Academy.
        </p>
        <div className="flex flex-col gap-3">
          <Link
            href="/billing"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-500 hover:bg-amber-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors"
          >
            Get SAT Premium
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
