import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Classroom — MockMate',
  robots: { index: false, follow: false },
}

// The (dashboard) layout handles authentication — unauthenticated users are
// redirected to /login by the shared layout before this page renders.

export default function ClassroomDashboardPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] px-4 py-12">
      <div className="w-full max-w-lg text-center">

        {/* Icon */}
        <div
          className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl"
          style={{ background: '#EBF5FE' }}
        >
          <svg
            aria-hidden="true"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.6}
            className="h-8 w-8"
            style={{ color: '#44A5F0' }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
          </svg>
        </div>

        {/* Coming soon badge */}
        <span
          className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold mb-4"
          style={{ background: '#EBF5FE', color: '#44A5F0' }}
        >
          Coming soon
        </span>

        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-snug">
          Create Your Own Practice Exam for Class
        </h1>

        <p className="mt-4 text-base text-slate-500 leading-relaxed">
          Build custom practice exams for your class, course, or study group — with your own questions, timing, and scoring. This feature is under active development.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/exams/create"
            className="
              inline-flex items-center justify-center rounded-lg px-5 py-2.5
              text-sm font-bold text-white min-h-[44px] transition-colors
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#44A5F0] focus-visible:ring-offset-2
            "
            style={{ background: '#44A5F0' }}
          >
            Try existing exam builder
          </Link>
          <Link
            href="/choose-study-path"
            className="
              inline-flex items-center justify-center rounded-lg px-5 py-2.5
              text-sm font-medium text-slate-600 bg-slate-100 min-h-[44px] transition-colors
              hover:bg-slate-200
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2
            "
          >
            Back to study paths
          </Link>
        </div>
      </div>
    </div>
  )
}
