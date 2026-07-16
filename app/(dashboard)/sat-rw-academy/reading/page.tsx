'use client'

import Link from 'next/link'

const readingSkills = [
  {
    slug: 'words-in-context',
    title: 'Words in Context',
    description: 'Understand how words function in specific contexts.',
  },
  {
    slug: 'central-ideas-details',
    title: 'Central Ideas and Details',
    description: 'Identify the main idea and directly stated details.',
  },
  {
    slug: 'text-structure-purpose',
    title: 'Text Structure and Purpose',
    description: 'Understand why authors include specific sentences or examples.',
  },
  {
    slug: 'command-of-evidence',
    title: 'Command of Evidence',
    description: 'Find the specific textual evidence that supports a claim.',
  },
  {
    slug: 'quantitative-evidence',
    title: 'Quantitative Evidence',
    description: 'Connect data from tables and graphs to written claims.',
  },
  {
    slug: 'inferences',
    title: 'Inferences',
    description: 'Draw the smallest defensible conclusion the passage supports.',
  },
]

export default function ReadingSkillsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Reading Skills</h1>
        <p className="mt-1 text-sm text-slate-500">6 skills</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {readingSkills.map((skill) => (
          <div
            key={skill.slug}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm flex flex-col gap-3"
          >
            <div className="flex-1">
              <p className="font-semibold text-slate-900 text-sm leading-snug mb-1">{skill.title}</p>
              <p className="text-xs text-slate-500 leading-relaxed">{skill.description}</p>
            </div>

            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex items-center rounded-full bg-slate-100 border border-slate-200 px-2 py-0.5 text-xs font-medium text-slate-500">
                Not Started
              </span>
              <Link href={`/sat-rw-academy/lesson/${skill.slug}`}>
                <button className="rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-1.5 transition-colors whitespace-nowrap">
                  Open Lesson
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
