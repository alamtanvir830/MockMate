// Centralized SAT exam structure details shown on every form card.
// All question counts and totals live here — update once, applies everywhere.

const MODULES = [
  { label: 'R&W Mod 1', questions: 27 },
  { label: 'Math Mod 1', questions: 22 },
  { label: 'R&W Mod 2', questions: 27 },
  { label: 'Math Mod 2', questions: 22 },
] as const

export function SatExamDetails() {
  return (
    <div className="mt-3 mb-4" aria-label="Exam structure">
      {/* 2×2 module grid */}
      <div className="grid grid-cols-2 gap-x-3 gap-y-2 mb-2.5">
        {MODULES.map(({ label, questions }) => (
          <div key={label}>
            <p className="text-[9px] font-bold uppercase tracking-wide text-slate-500 leading-tight">
              {label}
            </p>
            <p className="text-[9px] font-medium text-slate-400 leading-tight">
              {questions} questions
            </p>
          </div>
        ))}
      </div>

      {/* Summary stats */}
      <div className="border-t border-slate-100 pt-2 space-y-1.5">
        <p className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wide text-slate-500">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} className="h-2.5 w-2.5 shrink-0 text-slate-400" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
          98 questions total
        </p>

        <p className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wide text-slate-500">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} className="h-2.5 w-2.5 shrink-0 text-slate-400" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
          </svg>
          2 hours 14 minutes
        </p>

        <p className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wide text-slate-500">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} className="h-2.5 w-2.5 shrink-0 text-slate-400" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
          </svg>
          Automatically saved
        </p>

        <p className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wide text-slate-500">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} className="h-2.5 w-2.5 shrink-0 text-slate-400" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
          </svg>
          Personalized score + feedback
        </p>
      </div>
    </div>
  )
}
