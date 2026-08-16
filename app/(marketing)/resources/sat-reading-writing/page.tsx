import type { Metadata } from 'next'
import Link from 'next/link'
import { SeoPageLayout } from '@/components/seo/SeoPageLayout'
import { JsonLd } from '@/components/seo/JsonLd'
import { IndependenceCallout } from '@/components/seo/IndependenceCallout'
import { buildSeoMetadata, SITE_URL } from '@/components/seo/seo-meta'
import { buildBreadcrumbJsonLd } from '@/components/seo/article-jsonld'

const SLUG = '/resources/sat-reading-writing'

export const metadata: Metadata = buildSeoMetadata({
  title: 'SAT Reading & Writing: Skills, Strategies & Practice | MockMate',
  description:
    'Complete guide to SAT Reading & Writing. Covers all four domains — Information and Ideas, Craft and Structure, Expression of Ideas, and Standard English Conventions — with targeted strategies for each question type.',
  slug: SLUG,
})

type SkillEntry = { href: string; title: string; description: string }

const INFORMATION_IDEAS: SkillEntry[] = [
  {
    href: '/resources/sat-command-of-evidence-practice',
    title: 'Command of Evidence',
    description:
      'Textual and quantitative evidence questions ask you to find the part of a passage (or data in a table/chart) that directly supports a given claim.',
  },
]

const CRAFT_STRUCTURE: SkillEntry[] = [
  {
    href: '/resources/sat-words-in-context-practice',
    title: 'Words in Context',
    description:
      "Determine the precise meaning of a word or phrase as it is used in the passage, or choose the word that best completes a blank while matching the passage's register and meaning.",
  },
]

const EXPRESSION_IDEAS: SkillEntry[] = [
  {
    href: '/resources/sat-rhetorical-synthesis',
    title: 'Rhetorical Synthesis',
    description:
      'Given a set of notes or bullet points, choose the sentence that best synthesizes the information to achieve a stated rhetorical goal.',
  },
  {
    href: '/resources/sat-transitions-practice',
    title: 'Transitions',
    description:
      'Select the transition word or phrase that correctly expresses the logical relationship — contrast, cause-effect, addition, sequence — between two sentences or clauses.',
  },
]

const STANDARD_ENGLISH: SkillEntry[] = [
  {
    href: '/resources/sat-boundaries-grammar',
    title: 'Boundaries',
    description:
      'Determine the correct punctuation (period, semicolon, comma, colon, or no punctuation) between or within clauses, based on whether each clause is independent or dependent.',
  },
]

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'SAT Reading & Writing Skills Hub',
    url: `${SITE_URL}${SLUG}`,
    description:
      'A practical guide to all four SAT Reading & Writing domains with skill-specific strategy articles and resources.',
    hasPart: [
      ...INFORMATION_IDEAS,
      ...CRAFT_STRUCTURE,
      ...EXPRESSION_IDEAS,
      ...STANDARD_ENGLISH,
    ].map((s) => ({
      '@type': 'Article',
      headline: s.title,
      url: `${SITE_URL}${s.href}`,
    })),
  },
  buildBreadcrumbJsonLd([
    { name: 'Home', href: '/' },
    { name: 'Resources', href: '/resources' },
    { name: 'SAT Reading & Writing' },
  ]),
]

function SkillCard({ skill }: { skill: SkillEntry }) {
  return (
    <Link
      href={skill.href}
      className="group rounded-xl border border-slate-200 p-5 transition-colors hover:border-brand-300 hover:bg-brand-50/40"
    >
      <h3 className="text-base font-semibold text-slate-900 group-hover:text-brand-600">
        {skill.title}
      </h3>
      <p className="mt-1.5 text-[14px] leading-relaxed text-slate-600">
        {skill.description}
      </p>
      <span className="mt-2 inline-block text-sm font-medium text-brand-500">
        Study strategies →
      </span>
    </Link>
  )
}

function Domain({
  name,
  description,
  skills,
}: {
  name: string
  description: string
  skills: SkillEntry[]
}) {
  return (
    <section className="mt-12">
      <h2 className="text-xl font-bold text-slate-900">{name}</h2>
      <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{description}</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {skills.map((s) => (
          <SkillCard key={s.href} skill={s} />
        ))}
      </div>
    </section>
  )
}

export default function SatReadingWritingHub() {
  return (
    <SeoPageLayout>
      <JsonLd data={jsonLd} />

      <div className="text-sm text-slate-500 mb-4">
        <Link href="/resources" className="hover:text-brand-600">Resources</Link>
        <span className="mx-1.5">›</span>
        <span>SAT Reading &amp; Writing</span>
      </div>

      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        SAT Reading &amp; Writing
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-slate-600">
        The Digital SAT Reading &amp; Writing section contains 54 questions across two modules.
        Every question is accompanied by a short passage — between 25 and 150 words — and
        tests one of four question domains. Knowing what each domain tests is the first step
        to answering questions more efficiently.
      </p>

      <div className="mt-8 rounded-xl border border-brand-200 bg-brand-50/50 p-5">
        <p className="text-sm font-semibold text-brand-800">
          Practice with MockMate&apos;s SAT R&amp;W Academy
        </p>
        <p className="mt-1 text-[14px] text-brand-700 leading-relaxed">
          MockMate&apos;s Reading &amp; Writing Academy covers all 11 skill areas — from Boundaries
          and Transitions to Command of Evidence and Cross-Text Connections — with lessons,
          diagnostic quizzes, and targeted practice questions.
        </p>
        <Link
          href="/sat-reading-writing-academy"
          className="mt-3 inline-block rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-4 py-2 transition-colors"
        >
          Go to R&amp;W Academy
        </Link>
      </div>

      <Domain
        name="Information and Ideas"
        description="Questions in this domain ask you to read carefully and reason about what the text actually says. You may need to identify the main idea, make a supported inference, find textual evidence, or interpret data in a table alongside a passage."
        skills={INFORMATION_IDEAS}
      />

      <Domain
        name="Craft and Structure"
        description="These questions focus on how language is used rather than what it says. You will interpret vocabulary in context, analyze a passage's structure or purpose, and connect ideas across two paired texts."
        skills={CRAFT_STRUCTURE}
      />

      <Domain
        name="Expression of Ideas"
        description="Expression of Ideas questions ask you to write or revise — choosing sentences that best complete a passage, connect ideas with appropriate transitions, or synthesize notes into a coherent statement that achieves a specific rhetorical goal."
        skills={EXPRESSION_IDEAS}
      />

      <Domain
        name="Standard English Conventions"
        description="The conventions domain tests grammar and punctuation rules directly. Questions cover sentence boundaries (knowing when to use a period, semicolon, comma, or colon), subject-verb agreement, verb tense, pronoun reference, and modifier placement."
        skills={STANDARD_ENGLISH}
      />

      <section className="mt-12">
        <h2 className="text-xl font-bold text-slate-900">How the R&amp;W section is structured</h2>
        <p className="mt-3 text-[15px] leading-relaxed text-slate-700">
          The Reading &amp; Writing section is adaptive at the module level. All students take
          a common Module 1 (27 questions, 32 minutes). Your performance on Module 1 routes
          you to either a harder or an easier Module 2. A harder Module 2 makes it possible
          to earn a higher scaled score; an easier Module 2 has a lower score ceiling.
          Questions within each module are not adaptive — difficulty does not change based
          on individual answers.
        </p>
        <p className="mt-4 text-[15px] leading-relaxed text-slate-700">
          The four domains do not appear in a fixed order. Questions are drawn from all
          four domains across both modules. You cannot predict the next question type
          by what you just answered.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-slate-900">Where to go next</h2>
        <div className="mt-4 flex flex-col gap-2 text-[15px]">
          <Link href="/sat-reading-writing-academy" className="text-brand-600 hover:underline">→ MockMate SAT R&amp;W Academy — lessons for all 11 skills</Link>
          <Link href="/resources/how-digital-sat-adaptive-modules-work" className="text-brand-600 hover:underline">→ How Digital SAT adaptive modules work</Link>
          <Link href="/resources" className="text-brand-600 hover:underline">→ All SAT resources</Link>
          <Link href="/sat-practice-test" className="text-brand-600 hover:underline">→ Take a free full-length SAT practice test</Link>
        </div>
      </section>

      <IndependenceCallout />
    </SeoPageLayout>
  )
}
