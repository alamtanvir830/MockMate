import Link from 'next/link'
import { AcademyNav } from '@/components/dashboard/AcademyNav'

export default function SatRwAcademyPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">SAT R&W Academy</h1>
        <p className="mt-1 text-sm text-slate-500">
          Learn every major SAT Reading and Writing skill, practice with original questions, and build a personalized plan around your weakest areas.
        </p>
      </div>

      {/* Internal nav */}
      <AcademyNav />

      {/* Course sections */}
      <div>
        <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-3">Course Sections</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Reading Skills */}
          <Link href="/sat-rw-academy/reading" className="group block rounded-xl border border-slate-200 bg-white p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100 transition-colors">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-semibold text-slate-900">Reading Skills</p>
                  <span className="inline-flex items-center rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-xs font-medium text-emerald-700">6 skills</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">Words in Context, Central Ideas, Text Structure, Command of Evidence, Quantitative Evidence, Inferences</p>
              </div>
            </div>
          </Link>

          {/* Writing Skills */}
          <Link href="/sat-rw-academy/writing" className="group block rounded-xl border border-slate-200 bg-white p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 group-hover:bg-slate-200 transition-colors">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-semibold text-slate-900">Writing Skills</p>
                  <span className="inline-flex items-center rounded-full bg-slate-100 border border-slate-200 px-2 py-0.5 text-xs font-medium text-slate-600">4 skills</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">Boundaries, Form &amp; Structure, Transitions, Rhetorical Synthesis</p>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Tools */}
      <div>
        <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-3">Tools</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {/* Vocabulary Trainer */}
          <Link href="/sat-rw-academy/vocabulary" className="group block rounded-xl border border-slate-200 bg-white p-5 hover:shadow-md transition-shadow">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50 text-violet-600 group-hover:bg-violet-100 transition-colors mb-3">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
              </svg>
            </div>
            <p className="font-semibold text-slate-900 text-sm mb-0.5">Vocabulary Trainer</p>
            <p className="text-xs text-slate-500">120+ academic words</p>
          </Link>

          {/* Transition Trainer */}
          <Link href="/sat-rw-academy/transitions" className="group block rounded-xl border border-slate-200 bg-white p-5 hover:shadow-md transition-shadow">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-amber-600 group-hover:bg-amber-100 transition-colors mb-3">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
              </svg>
            </div>
            <p className="font-semibold text-slate-900 text-sm mb-0.5">Transition Trainer</p>
            <p className="text-xs text-slate-500">60+ original questions</p>
          </Link>

          {/* Reading Speed */}
          <Link href="/sat-rw-academy/reading-speed" className="group block rounded-xl border border-slate-200 bg-white p-5 hover:shadow-md transition-shadow">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-50 text-sky-600 group-hover:bg-sky-100 transition-colors mb-3">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
            </div>
            <p className="font-semibold text-slate-900 text-sm mb-0.5">Reading Speed</p>
            <p className="text-xs text-slate-500">RSVP trainer</p>
          </Link>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-slate-400 leading-relaxed">
        All MockMate academy content is independently created for practice purposes. MockMate is not affiliated with, endorsed by, or sponsored by College Board. SAT® is a trademark of College Board.
      </p>
    </div>
  )
}
