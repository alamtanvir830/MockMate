import Link from 'next/link'

export default function SATPremadePage() {
  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link href="/premade" className="hover:text-indigo-600 transition-colors">Pre-made Exams</Link>
        <span>/</span>
        <span className="text-slate-900 font-medium">SAT</span>
      </div>

      <h1 className="text-2xl font-bold text-slate-900 mb-2">SAT Practice Forms</h1>
      <p className="text-slate-500 text-sm leading-relaxed mb-8 max-w-2xl">
        Each full-length adaptive SAT-style exam includes 98 questions across Reading and Writing and Math, with 2 hours and 14 minutes of timed practice. After you finish, MockMate instantly generates your estimated score report, AI feedback, weak-area breakdown, and targeted practice sets from the Question Bank.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Form 1 — active */}
        <Link
          href="/premade/sat/form-1"
          className="rounded-xl border border-indigo-200 bg-white p-6 hover:border-indigo-400 hover:shadow-sm transition-all group"
        >
          <div className="h-9 w-9 rounded-lg bg-indigo-50 flex items-center justify-center mb-4">
            <span className="text-sm font-bold text-indigo-600">1</span>
          </div>
          <h2 className="font-semibold text-slate-900 group-hover:text-indigo-700 transition-colors mb-1">
            Form 1
          </h2>
          <p className="text-xs text-slate-500">Reading &amp; Writing + Math · 98 questions · 2 hr 14 min · 400–1600</p>
        </Link>

        {/* Form 2 — active */}
        <Link
          href="/premade/sat/form-2"
          className="rounded-xl border border-indigo-200 bg-white p-6 hover:border-indigo-400 hover:shadow-sm transition-all group"
        >
          <div className="h-9 w-9 rounded-lg bg-indigo-50 flex items-center justify-center mb-4">
            <span className="text-sm font-bold text-indigo-600">2</span>
          </div>
          <h2 className="font-semibold text-slate-900 group-hover:text-indigo-700 transition-colors mb-1">
            Form 2
          </h2>
          <p className="text-xs text-slate-500">Reading &amp; Writing + Math · 98 questions · 2 hr 14 min · 400–1600</p>
        </Link>

        {/* Form 3 — active */}
        <Link
          href="/premade/sat/form-3"
          className="rounded-xl border border-indigo-200 bg-white p-6 hover:border-indigo-400 hover:shadow-sm transition-all group"
        >
          <div className="h-9 w-9 rounded-lg bg-indigo-50 flex items-center justify-center mb-4">
            <span className="text-sm font-bold text-indigo-600">3</span>
          </div>
          <h2 className="font-semibold text-slate-900 group-hover:text-indigo-700 transition-colors mb-1">
            Form 3
          </h2>
          <p className="text-xs text-slate-500">Reading &amp; Writing + Math · 98 questions · 2 hr 14 min · 400–1600</p>
        </Link>
      </div>
    </div>
  )
}
