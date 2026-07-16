'use client'

import Link from 'next/link'

const writingSkills = [
  {
    slug: 'boundaries',
    title: 'Boundaries',
    description: 'Master sentence boundaries, fragments, run-ons, and punctuation.',
  },
  {
    slug: 'form-structure-sense',
    title: 'Form, Structure, and Sense',
    description: 'Subject-verb agreement, pronouns, tense, parallel structure, and word choice.',
  },
  {
    slug: 'transitions',
    title: 'Transitions',
    description: 'Choose the transition that correctly expresses the logical relationship.',
  },
  {
    slug: 'rhetorical-synthesis',
    title: 'Rhetorical Synthesis',
    description: 'Use provided notes to construct a sentence that accomplishes a specific writing goal.',
  },
]

export default function WritingSkillsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Writing Skills</h1>
        <p className="mt-1 text-sm text-slate-500">4 skills</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {writingSkills.map((skill) => (
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
