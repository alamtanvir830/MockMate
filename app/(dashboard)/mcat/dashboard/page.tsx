import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'MCAT Dashboard — MockMate',
  robots: { index: false, follow: false },
}

const ICON_EXAMS = (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} className="h-5 w-5" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
  </svg>
)

const ICON_QB = (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} className="h-5 w-5" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21a48.25 48.25 0 01-8.135-.687c-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
  </svg>
)

const ICON_HISTORY = (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} className="h-5 w-5" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const ICON_NOTES = (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} className="h-5 w-5" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
  </svg>
)

const cards = [
  {
    href: '/premade/mcat',
    label: 'MCAT Practice Exams',
    description: 'Full-length MCAT-style practice with section timers and AI coaching.',
    icon: ICON_EXAMS,
  },
  {
    href: '/question-bank/mcat',
    label: 'MCAT Question Bank',
    description: 'Build targeted practice sets by subject, discipline, and difficulty.',
    icon: ICON_QB,
  },
  {
    href: '/exams',
    label: 'Exam History',
    description: 'Review your completed MCAT practice attempts.',
    icon: ICON_HISTORY,
  },
  {
    href: '/notes',
    label: 'Personal Notes',
    description: 'Capture study notes across any topic.',
    icon: ICON_NOTES,
  },
]

export default function MCATDashboardPage() {
  return (
    <div className="max-w-2xl mx-auto py-4 sm:py-8 space-y-8">

      {/* Header */}
      <div className="flex items-start gap-4">
        <div
          className="shrink-0 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50"
          aria-hidden="true"
        >
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} className="h-6 w-6 text-emerald-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21a48.25 48.25 0 01-8.135-.687c-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
          </svg>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">MCAT Prep</h1>
          <p className="mt-1 text-sm text-slate-500">
            Full-length practice exams, targeted question sets, and AI-powered feedback.
          </p>
        </div>
      </div>

      {/* Primary CTA */}
      <Link
        href="/premade/mcat"
        className="
          flex items-center justify-center gap-2.5
          w-full rounded-xl px-6 py-4
          text-base font-semibold text-white bg-emerald-600
          transition-opacity hover:opacity-90
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500
        "
      >
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-5 w-5 shrink-0" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 010 1.972l-11.54 6.347a1.125 1.125 0 01-1.667-.986V5.653z" />
        </svg>
        Take a Practice Exam
      </Link>

      {/* Navigation cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {cards.map(({ href, label, description, icon }) => (
          <Link
            key={href}
            href={href}
            className="
              flex items-center gap-3 rounded-xl border border-slate-200 bg-white
              px-5 py-4 transition-shadow hover:shadow-md
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-1
            "
          >
            <span className="shrink-0 text-slate-400" aria-hidden="true">{icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-800">{label}</p>
              <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{description}</p>
            </div>
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4 shrink-0 text-slate-300" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </Link>
        ))}
      </div>

      <p className="text-xs text-slate-400 text-center">
        MCAT® is a registered trademark of the AAMC. MockMate is not affiliated with or endorsed by the AAMC.
      </p>
    </div>
  )
}
