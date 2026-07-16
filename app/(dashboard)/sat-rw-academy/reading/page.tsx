'use client'

import Link from 'next/link'

const readingSkills = [
  {
    slug: 'words-in-context',
    title: 'Words in Context',
    description: 'Understand how words function in specific contexts, including unfamiliar uses of familiar words.',
    domain: 'Craft and Structure',
  },
  {
    slug: 'central-ideas-details',
    title: 'Central Ideas and Details',
    description: 'Identify the main idea and distinguish it from supporting details and irrelevant information.',
    domain: 'Information and Ideas',
  },
  {
    slug: 'text-structure-purpose',
    title: 'Text Structure and Purpose',
    description: 'Understand why authors include specific sentences, examples, or evidence.',
    domain: 'Craft and Structure',
  },
  {
    slug: 'command-of-evidence',
    title: 'Command of Evidence',
    description: 'Find the specific textual evidence that best supports a claim.',
    domain: 'Information and Ideas',
  },
  {
    slug: 'quantitative-evidence',
    title: 'Quantitative Evidence',
    description: 'Connect data from tables, graphs, and charts to written claims.',
    domain: 'Information and Ideas',
  },
  {
    slug: 'inferences',
    title: 'Inferences',
    description: 'Draw the smallest defensible conclusion the passage directly supports.',
    domain: 'Information and Ideas',
  },
  {
    slug: 'cross-text-connections',
    title: 'Cross-Text Connections',
    description: 'Compare two paired passages to identify how their claims agree, disagree, or qualify each other.',
    domain: 'Craft and Structure',
    isNew: true,
  },
]

export default function ReadingSkillsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Reading Skills</h1>
        <p className="mt-1 text-sm text-slate-500">7 skills across Information and Ideas and Craft and Structure</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {readingSkills.map((skill) => (
          <div
            key={skill.slug}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm flex flex-col gap-3"
          >
            <div className="flex-1">
              <div className="flex items-start justify-between gap-2 mb-1">
                <p className="font-semibold text-slate-900 text-sm leading-snug">{skill.title}</p>
                {'isNew' in skill && skill.isNew && (
                  <span className="shrink-0 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-semibold px-2 py-0.5">
                    New
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">{skill.description}</p>
              <p className="text-[10px] text-slate-400 mt-1.5">{skill.domain}</p>
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
