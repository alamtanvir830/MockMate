import type { Metadata } from 'next'
import Link from 'next/link'
import { SeoPageLayout } from '@/components/seo/SeoPageLayout'
import { JsonLd } from '@/components/seo/JsonLd'
import { IndependenceCallout } from '@/components/seo/IndependenceCallout'
import { buildSeoMetadata, SITE_URL } from '@/components/seo/seo-meta'

const SLUG = '/sat-question-bank'

export const metadata: Metadata = buildSeoMetadata({
  title: 'SAT Question Bank: 1,000+ Math & Reading/Writing Questions | MockMate',
  description:
    'Practice SAT-style Math and Reading and Writing questions by domain, skill, and difficulty with detailed explanations and targeted practice sets.',
  slug: SLUG,
})

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'SAT Question Bank',
    url: `${SITE_URL}${SLUG}`,
    description:
      'Practice SAT-style Math and Reading and Writing questions by domain, skill, and difficulty with detailed explanations and targeted practice sets.',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: 'MockMate SAT Question Bank: Math & Reading/Writing',
    description:
      '1,000+ independently created SAT-style Math and Reading and Writing questions organized by domain, skill, and difficulty, each with a worked explanation.',
    url: `${SITE_URL}${SLUG}`,
    creator: { '@type': 'Organization', name: 'MockMate' },
    keywords: [
      'SAT practice questions',
      'Digital SAT Math',
      'Digital SAT Reading and Writing',
      'SAT skills practice',
    ],
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

export default function SatQuestionBankPage() {
  return (
    <SeoPageLayout>
      <JsonLd data={jsonLd} />

      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        SAT Question Bank: 1,000+ Practice Questions
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-slate-600">
        The MockMate question bank lets you practice by domain, skill, and difficulty
        instead of drilling random questions — so your time targets exactly what your
        score report says to fix.
      </p>

      <Section title="Question Count">
        <p>
          The bank holds 1,000+ SAT-style questions covering both sections of the Digital
          SAT, split across Reading and Writing and Math. Every question is independently
          created in the Digital SAT style and comes with a full explanation.
        </p>
      </Section>

      <Section title="Reading and Writing Coverage">
        <p>
          Reading and Writing questions span all four domains — Information and Ideas,
          Craft and Structure, Expression of Ideas, and Standard English Conventions — and
          include all 11 R&W skill types tested on the exam.
        </p>
      </Section>

      <Section title="Math Coverage">
        <p>
          Math questions span all four domains — Algebra, Advanced Math, Problem-Solving
          and Data Analysis, and Geometry and Trigonometry — covering all 21 Math skill
          types.
        </p>
      </Section>

      <Section title="Difficulty Levels">
        <p>
          Questions are labeled Easy, Medium, or Hard and are distributed across all three
          levels, so you can warm up or push into the harder items that separate top
          scores.
        </p>
      </Section>

      <Section title="Detailed Explanations">
        <p>
          Every question has a worked explanation that walks through the solution. Wrong-
          answer explanations identify the specific error type — a misread, a setup
          mistake, a computation slip — so you learn why a distractor was tempting.
        </p>
      </Section>

      <Section title="Targeted Practice Sets">
        <p>
          Sets are grouped by domain and skill, not shuffled at random. You can choose to
          practice only, say, Systems of Equations, and get a focused set rather than a
          mixed bag.
        </p>
      </Section>

      <Section title="Personalized Weak-Skill Practice">
        <p>
          After you complete a full form, MockMate can generate practice sets aimed at
          your weakest domains, turning your score report directly into your next study
          session.
        </p>
      </Section>

      <Section title="Practice History">
        <p>
          Your completed sets and per-set scores are tracked, so you can see which skills
          you have already reviewed and how your accuracy is trending.
        </p>
      </Section>

      <Section title="How the Question Bank Works With Full Exams">
        <p>
          Take a form, read your results, identify the weakest skill, practice matching
          sets in the question bank, then retake a form to confirm the gain. The bank is
          the &quot;target weak skills&quot; step in the larger study cycle.
        </p>
      </Section>

      <Section title="Avoiding Unfocused Practice">
        <p>
          Random practice spreads your effort thinly across skills you already have. By
          grouping questions by skill and difficulty, the bank concentrates your time on
          the specific gaps costing you points.
        </p>
      </Section>

      <Section title="Who Benefits Most">
        <p>
          Students who already know their weaknesses and students reviewing right after a
          full form get the most value, because both can point the bank straight at the
          skills that matter.
        </p>
      </Section>

      <Section title="Explore More">
        <ul className="ml-5 list-disc space-y-1">
          <li><Link href="/digital-sat-prep" className="font-medium text-brand-500 hover:text-brand-600">Digital SAT Prep overview</Link></li>
          <li><Link href="/sat-practice-test" className="font-medium text-brand-500 hover:text-brand-600">SAT Practice Test</Link></li>
          <li><Link href="/sat-reading-writing-academy" className="font-medium text-brand-500 hover:text-brand-600">Reading and Writing Academy</Link></li>
          <li><Link href="/sat-math-desmos-academy" className="font-medium text-brand-500 hover:text-brand-600">Math and Desmos Academy</Link></li>
          <li><Link href="/pricing" className="font-medium text-brand-500 hover:text-brand-600">Pricing</Link></li>
          <li><Link href="/resources/sat-reading-writing" className="font-medium text-brand-500 hover:text-brand-600">SAT Reading &amp; Writing skills guide</Link></li>
          <li><Link href="/resources/sat-math" className="font-medium text-brand-500 hover:text-brand-600">SAT Math skills guide</Link></li>
        </ul>
      </Section>

      <IndependenceCallout />
    </SeoPageLayout>
  )
}
