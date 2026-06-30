import Link from 'next/link'

export default function QuestionBankPage() {
  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold text-slate-900 mb-1">Question Bank</h1>
      <p className="text-slate-500 mb-8">
        Practice targeted questions by test, subject, skill, and difficulty.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* SAT — active */}
        <Link
          href="/question-bank/sat"
          className="relative rounded-xl border border-indigo-200 bg-white p-6 hover:border-indigo-400 hover:shadow-sm transition-all group"
        >
          <div className="h-10 w-10 rounded-lg bg-indigo-50 flex items-center justify-center mb-4">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5 text-indigo-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
            </svg>
          </div>
          <div className="flex items-start justify-between mb-1">
            <h2 className="text-lg font-semibold text-slate-900 group-hover:text-indigo-700 transition-colors">SAT</h2>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">Available</span>
          </div>
          <p className="text-sm text-slate-500 mb-4">Targeted digital SAT-style practice based on your weak skills.</p>
          <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-indigo-600 group-hover:text-indigo-700">
            Open SAT Question Bank
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </span>
        </Link>

        {/* SHSAT — coming soon */}
        <div className="relative rounded-xl border border-slate-200 bg-slate-50 p-6 opacity-70">
          <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center mb-4">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5 text-slate-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
            </svg>
          </div>
          <div className="flex items-start justify-between mb-1">
            <h2 className="text-lg font-semibold text-slate-600">SHSAT</h2>
            <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full">Coming soon</span>
          </div>
          <p className="text-sm text-slate-400">SHSAT practice questions across all scrambled paragraphs, logical reasoning, and math skills.</p>
        </div>

        {/* MCAT — coming soon */}
        <div className="relative rounded-xl border border-slate-200 bg-slate-50 p-6 opacity-70">
          <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center mb-4">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5 text-slate-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
            </svg>
          </div>
          <div className="flex items-start justify-between mb-1">
            <h2 className="text-lg font-semibold text-slate-600">MCAT</h2>
            <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full">Coming soon</span>
          </div>
          <p className="text-sm text-slate-400">MCAT question bank covering biochemistry, psychology, critical analysis, and more.</p>
        </div>
      </div>

      {/* Info footer */}
      <div className="mt-8 bg-indigo-50 border border-indigo-100 rounded-xl p-5">
        <div className="flex items-start gap-3">
          <div className="h-8 w-8 rounded-lg bg-indigo-100 flex items-center justify-center shrink-0">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4 text-indigo-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
          </div>
          <div>
            <p className="text-[13px] font-semibold text-indigo-900 mb-0.5">Smart Practice Path</p>
            <p className="text-[12px] text-indigo-700">
              Complete a full SAT practice test to unlock your personalized practice path — automatically targeted to the exact skills you missed.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
