import Link from 'next/link'

export default function PremadeExamsPage() {
  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold text-slate-900 mb-1">Pre-made Exams</h1>
      <p className="text-slate-500 mb-8">Choose a standardized test to practice.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* SAT — active */}
        <Link
          href="/premade/sat"
          className="relative rounded-xl border border-indigo-200 bg-white p-6 hover:border-indigo-400 hover:shadow-sm transition-all group"
        >
          <div className="h-10 w-10 rounded-lg bg-indigo-50 flex items-center justify-center mb-4">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5 text-indigo-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-slate-900 mb-1 group-hover:text-indigo-700 transition-colors">SAT</h2>
          <p className="text-sm text-slate-500">Adaptive practice forms · 400–1600 score estimate.</p>
        </Link>

        {/* SHSAT — active */}
        <Link
          href="/premade/shsat"
          className="relative rounded-xl border border-indigo-200 bg-white p-6 hover:border-indigo-400 hover:shadow-sm transition-all group"
        >
          <div className="h-10 w-10 rounded-lg bg-indigo-50 flex items-center justify-center mb-4">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5 text-indigo-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-slate-900 mb-1 group-hover:text-indigo-700 transition-colors">
            SHSAT
          </h2>
          <p className="text-sm text-slate-500">
            Specialized High Schools Admissions Test practice forms.
          </p>
        </Link>
      </div>
    </div>
  )
}
