import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Choose your study path — MockMate',
  robots: { index: false, follow: false },
}

export default function ChooseStudyPathPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-12">
      {/* Heading */}
      <div className="text-center mb-10 max-w-xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
          What are you studying for?
        </h1>
        <p className="mt-3 text-base text-slate-500">
          Choose how you want to use MockMate.
        </p>
      </div>

      {/* Cards grid */}
      <div className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

        {/* ── Card 1: SAT ─────────────────────────────────────────────── */}
        <Link
          href="/dashboard"
          className="
            group flex flex-col rounded-2xl border-2 bg-white p-6
            border-[#44A5F0] shadow-sm
            hover:shadow-md hover:border-[#2e90de]
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#44A5F0] focus-visible:ring-offset-2
            transition-all
          "
        >
          {/* Icon */}
          <div
            className="mb-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
            style={{ background: '#EBF5FE' }}
          >
            <svg
              aria-hidden="true"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
              className="h-6 w-6"
              style={{ color: '#44A5F0' }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0118 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
          </div>

          {/* Title */}
          <h2 className="text-lg font-bold text-slate-900 group-hover:text-[#2e90de] transition-colors">
            SAT
          </h2>

          {/* Copy */}
          <p className="mt-2 text-sm text-slate-500 leading-relaxed flex-1">
            Practice with full-length adaptive exams, targeted questions, and SAT learning academies.
          </p>

          {/* CTA */}
          <div className="mt-6">
            <span
              className="
                inline-flex w-full items-center justify-center rounded-lg
                px-4 py-2.5 text-sm font-bold text-white
                min-h-[44px] transition-colors
              "
              style={{ background: '#44A5F0' }}
            >
              Continue with SAT
            </span>
          </div>
        </Link>

        {/* ── Card 2: MCAT ────────────────────────────────────────────── */}
        <Link
          href="/mcat/dashboard"
          className="
            group flex flex-col rounded-2xl border-2 bg-white p-6
            border-slate-200
            hover:border-emerald-400 hover:shadow-md
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2
            transition-all
          "
        >
          {/* Icon */}
          <div className="mb-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50">
            <svg
              aria-hidden="true"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
              className="h-6 w-6 text-emerald-500 group-hover:text-emerald-600 transition-colors"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21a48.25 48.25 0 01-8.135-.687c-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
            </svg>
          </div>

          {/* Title */}
          <h2 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
            MCAT
          </h2>

          {/* Copy */}
          <p className="mt-2 text-sm text-slate-500 leading-relaxed flex-1">
            Full-length MCAT practice exams, targeted question bank, and AI-powered feedback.
          </p>

          {/* CTA */}
          <div className="mt-6">
            <span
              className="
                inline-flex w-full items-center justify-center rounded-lg
                px-4 py-2.5 text-sm font-bold text-slate-700 bg-slate-100
                min-h-[44px] transition-colors
                group-hover:bg-emerald-50 group-hover:text-emerald-700
              "
            >
              Continue with MCAT
            </span>
          </div>
        </Link>

        {/* ── Card 3: Classroom ────────────────────────────────────────── */}
        <Link
          href="/classroom/dashboard"
          className="
            group flex flex-col rounded-2xl border-2 bg-white p-6
            border-slate-200
            hover:border-[#44A5F0] hover:shadow-md
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#44A5F0] focus-visible:ring-offset-2
            transition-all
          "
        >
          {/* Icon */}
          <div className="mb-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100">
            <svg
              aria-hidden="true"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
              className="h-6 w-6 text-slate-500 group-hover:text-[#44A5F0] transition-colors"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
            </svg>
          </div>

          {/* Title */}
          <h2 className="text-base font-bold text-slate-900 group-hover:text-[#2e90de] transition-colors leading-snug">
            Create Your Own Practice Exam for Class
          </h2>

          {/* Copy */}
          <p className="mt-2 text-sm text-slate-500 leading-relaxed flex-1">
            Build your own practice exams for a class, course, or study group.
          </p>

          {/* CTA */}
          <div className="mt-6">
            <span
              className="
                inline-flex w-full items-center justify-center rounded-lg
                px-4 py-2.5 text-sm font-bold text-slate-700 bg-slate-100
                min-h-[44px] transition-colors
                group-hover:bg-[#EBF5FE] group-hover:text-[#2e90de]
              "
            >
              Create Practice Exams
            </span>
          </div>
        </Link>

      </div>
    </div>
  )
}
