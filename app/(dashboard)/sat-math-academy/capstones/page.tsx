'use client'

import Link from 'next/link'

const CAPSTONE_META = [
  {
    id: 'math-capstone-1',
    title: 'Math Academy Capstone 1',
    description: 'A full 44-question math assessment covering all four domains and all twenty-one skills.',
    module1Label: 'Module 1 · 22 questions',
    module2Label: 'Module 2 · 22 questions',
    badge: 'Capstone 1 of 3',
  },
  {
    id: 'math-capstone-2',
    title: 'Math Academy Capstone 2',
    description: 'A second full-length assessment using a different question set from Capstone 1.',
    module1Label: 'Module 1 · 22 questions',
    module2Label: 'Module 2 · 22 questions',
    badge: 'Capstone 2 of 3',
  },
  {
    id: 'math-capstone-3',
    title: 'Math Academy Capstone 3',
    description: 'A third full-length assessment with a completely new question set across all domains.',
    module1Label: 'Module 1 · 22 questions',
    module2Label: 'Module 2 · 22 questions',
    badge: 'Capstone 3 of 3',
  },
]

export default function MathCapstonesPage() {
  return (
    <div className="max-w-3xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Math Academy Capstones</h1>
        <p className="mt-1 text-sm text-slate-500">
          Full 44-question math assessments. All four domains. All twenty-one skills. Timed. No skill labels during testing.
        </p>
      </div>

      {/* Disclaimer */}
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 space-y-1">
        <p className="font-semibold">Academy assessments — not official SAT forms</p>
        <p className="text-[13px]">
          These capstones are independently created MockMate Academy assessments.
          They do not produce an official SAT score and are not affiliated with College Board.
          Use them to measure your math mastery across all skills.
        </p>
      </div>

      {/* What to expect */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-3">
        <p className="font-semibold text-slate-800 text-sm">What to expect</p>
        <div className="grid gap-3 sm:grid-cols-3 text-center">
          {[
            { label: '44 questions', sub: '2 modules of 22' },
            { label: 'All 21 skills', sub: '4 domains mixed' },
            { label: 'Timed', sub: '35 min per module' },
          ].map(({ label, sub }) => (
            <div key={label} className="rounded-lg bg-slate-50 border border-slate-200 p-3">
              <p className="font-bold text-slate-900 text-sm">{label}</p>
              <p className="text-[11px] text-slate-500 mt-0.5">{sub}</p>
            </div>
          ))}
        </div>
        <ul className="space-y-1.5 text-[13px] text-slate-600">
          {[
            'Skill labels are hidden until you submit each answer.',
            'Mark questions for review and revisit before submitting a module.',
            'Detailed explanations appear after you finish each module.',
            'Results show accuracy by skill and domain — not an official SAT score.',
            'Capstone attempts do not appear in your SAT score history.',
          ].map(item => (
            <li key={item} className="flex items-start gap-2">
              <span className="text-indigo-500 font-bold mt-0.5 shrink-0">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Capstone cards */}
      <div className="space-y-3">
        {CAPSTONE_META.map((c, i) => (
          <div key={c.id} className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-[11px] font-bold text-slate-500">
                    {i + 1}
                  </span>
                  <h2 className="font-semibold text-slate-900 text-sm">{c.title}</h2>
                </div>
                <p className="text-[12px] text-slate-500 ml-9">{c.description}</p>
                <div className="ml-9 flex gap-3 mt-1">
                  <span className="text-[11px] text-slate-400">{c.module1Label}</span>
                  <span className="text-[11px] text-slate-400">·</span>
                  <span className="text-[11px] text-slate-400">{c.module2Label}</span>
                </div>
              </div>
              <Link
                href={`/sat-math-academy/capstones/${c.id}`}
                className="shrink-0 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-2 transition-colors"
              >
                Start Capstone →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Recommendation */}
      <div className="rounded-xl border border-sky-200 bg-sky-50 p-4 text-sm text-sky-800">
        <p className="font-semibold mb-1">Recommended approach</p>
        <p className="text-[13px]">
          Complete Capstone 1 after working through at least two lessons from each domain.
          Use the skill breakdown to find your weakest areas, study those lessons, then take Capstone 2.
        </p>
      </div>
    </div>
  )
}
