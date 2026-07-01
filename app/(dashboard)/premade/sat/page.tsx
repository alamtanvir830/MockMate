import Link from 'next/link'

const forms = [
  { num: '1', href: '/premade/sat/form-1' },
  { num: '2', href: '/premade/sat/form-2' },
  { num: '3', href: '/premade/sat/form-3' },
]

const cardDetails = [
  'Reading & Writing + Math',
  '98 questions',
  '2 hr 14 min',
  '400–1600 estimated score range',
]

export default function SATPremadePage() {
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
        {/* Left: exam specs */}
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

        {/* Arrow */}
        <div className="flex sm:flex-col items-center gap-1.5 px-2">
          <span className="text-[11px] text-slate-400 whitespace-nowrap">followed by</span>
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="h-4 w-4 text-slate-300 rotate-90 sm:rotate-0 shrink-0">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </div>

        {/* Right: output features */}
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
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {forms.map(({ num, href }) => (
          <Link
            key={num}
            href={href}
            className="rounded-xl border border-indigo-200 bg-white p-6 hover:border-indigo-400 hover:shadow-sm transition-all group flex flex-col"
          >
            <div className="h-9 w-9 rounded-lg bg-indigo-50 flex items-center justify-center mb-4 shrink-0">
              <span className="text-sm font-bold text-indigo-600">{num}</span>
            </div>
            <h2 className="font-semibold text-slate-900 group-hover:text-indigo-700 transition-colors mb-3">
              Form {num}
            </h2>
            <ul className="space-y-1.5 mt-auto">
              {cardDetails.map((detail) => (
                <li key={detail} className="text-xs text-slate-400 flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-slate-200 shrink-0" />
                  {detail}
                </li>
              ))}
            </ul>
          </Link>
        ))}
      </div>
    </div>
  )
}
