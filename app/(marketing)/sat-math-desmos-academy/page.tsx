import type { Metadata } from 'next'
import Link from 'next/link'
import { SeoPageLayout } from '@/components/seo/SeoPageLayout'
import { JsonLd } from '@/components/seo/JsonLd'
import { IndependenceCallout } from '@/components/seo/IndependenceCallout'
import { buildSeoMetadata, SITE_URL } from '@/components/seo/seo-meta'

const SLUG = '/sat-math-desmos-academy'

export const metadata: Metadata = buildSeoMetadata({
  title: 'SAT Math and Desmos Practice | MockMate Academy',
  description:
    'Practice Digital SAT Math across all 21 skills — Algebra, Advanced Math, data analysis, geometry — plus Desmos graphing strategies for the digital calculator on test day.',
  slug: SLUG,
})

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'SAT Math and Desmos Practice',
    url: `${SITE_URL}${SLUG}`,
    description:
      'Practice Digital SAT Math across all 21 skills, plus Desmos graphing strategies for the digital calculator on test day.',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'MockMate Math and Desmos Academy',
    description:
      '21 Digital SAT Math skill lessons across Algebra, Advanced Math, Problem-Solving and Data Analysis, and Geometry and Trigonometry, plus Desmos training and a practice sandbox.',
    url: `${SITE_URL}${SLUG}`,
    provider: { '@type': 'Organization', name: 'MockMate', url: SITE_URL },
  },
]

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold text-slate-900">{title}</h2>
      <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-slate-700">
        {children}
      </div>
    </section>
  )
}

export default function MathDesmosAcademyPage() {
  return (
    <SeoPageLayout>
      <JsonLd data={jsonLd} />

      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        Learn Digital SAT Math and Use Desmos Strategically
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-slate-600">
        The Math and Desmos Academy covers 21 Math skills across all four Digital SAT Math
        domains and teaches you when Desmos speeds you up — and when hand algebra is
        faster.
      </p>

      <Section title="Overview">
        <p>
          The Academy pairs skill-by-skill Math lessons with dedicated Desmos training, so
          you build both the underlying math and the calculator fluency that saves time on
          test day.
        </p>
      </Section>

      <Section title="Algebra (5 skills)">
        <ul className="ml-5 list-disc space-y-1">
          <li>Linear equations</li>
          <li>Linear equations in two variables</li>
          <li>Linear functions</li>
          <li>Linear inequalities</li>
          <li>Systems of equations</li>
        </ul>
      </Section>

      <Section title="Advanced Math (6 skills)">
        <ul className="ml-5 list-disc space-y-1">
          <li>Polynomial expressions</li>
          <li>Equivalent expressions</li>
          <li>Exponential functions</li>
          <li>Quadratic equations</li>
          <li>Radical and rational equations</li>
          <li>Nonlinear equations and systems</li>
        </ul>
      </Section>

      <Section title="Problem-Solving and Data Analysis (6 skills)">
        <ul className="ml-5 list-disc space-y-1">
          <li>Ratios, rates, and units</li>
          <li>Percentages</li>
          <li>One-variable data</li>
          <li>Two-variable data</li>
          <li>Statistical claims</li>
          <li>Probability</li>
        </ul>
      </Section>

      <Section title="Geometry and Trigonometry (4 skills)">
        <ul className="ml-5 list-disc space-y-1">
          <li>Lines, angles, and triangles</li>
          <li>Right triangles and trigonometry</li>
          <li>Circles</li>
          <li>Area and volume</li>
        </ul>
      </Section>

      <Section title="Desmos Mastery">
        <p>
          The Desmos module teaches the moves that matter on the exam: graphing equations,
          finding intersections, checking algebraic solutions visually, and testing answer
          choices directly on the graph.
        </p>
      </Section>

      <Section title="When Desmos Helps">
        <p>
          Desmos shines on graphing-based questions, systems of equations, and anything
          that benefits from visualization — where a quick graph beats a page of algebra.
        </p>
      </Section>

      <Section title="When Algebra Is Faster">
        <p>
          For basic arithmetic, simple linear steps, and questions built on a memorized
          formula, hand algebra is usually quicker than typing into the calculator.
          Knowing which path is faster is itself a test skill.
        </p>
      </Section>

      <Section title="Desmos Sandbox">
        <p>
          The Desmos sandbox is a free-play environment to build calculator fluency before
          test day, so the tool feels automatic when it counts.
        </p>
      </Section>

      <Section title="Avoiding Overreliance">
        <p>
          Desmos is a checking and speed tool, not a substitute for understanding the
          math. Students who lean on it for every question tend to lose time; the goal is
          to know when to reach for it.
        </p>
      </Section>

      <Section title="Connecting to the Question Bank">
        <p>
          After a lesson, practice the same skill in the question bank to lock it in —
          especially the skills your score report flags as weak.
        </p>
        <p>
          <Link href="/sat-question-bank" className="font-medium text-brand-500 hover:text-brand-600">
            Practice Math skills in the question bank →
          </Link>
        </p>
      </Section>

      <IndependenceCallout />
    </SeoPageLayout>
  )
}
