import type { Metadata } from 'next'
import Link from 'next/link'
import { SeoPageLayout } from '@/components/seo/SeoPageLayout'
import { JsonLd } from '@/components/seo/JsonLd'
import { IndependenceCallout } from '@/components/seo/IndependenceCallout'
import { buildSeoMetadata, SITE_URL } from '@/components/seo/seo-meta'

const SLUG = '/sat-practice-test'

export const metadata: Metadata = buildSeoMetadata({
  title: 'Digital SAT Practice Test | Adaptive SAT-Style Exam | MockMate',
  description:
    'Take a timed, module-adaptive Digital SAT-style practice test and receive an instant estimated score with detailed domain and skill results.',
  slug: SLUG,
})

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Digital SAT Practice Test',
    url: `${SITE_URL}${SLUG}`,
    description:
      'Take a timed, module-adaptive Digital SAT-style practice test and receive an instant estimated score with detailed domain and skill results.',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'MockMate Digital SAT Practice Test',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Web',
    url: `${SITE_URL}${SLUG}`,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: '48-hour free access to Forms 1, 2, and 3 for new users.',
    },
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

export default function SatPracticeTestPage() {
  return (
    <SeoPageLayout>
      <JsonLd data={jsonLd} />

      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        Take a Full-Length Digital SAT-Style Practice Test
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-slate-600">
        MockMate&apos;s practice tests recreate the timing, structure, and module-adaptive
        routing of the Digital SAT, then hand you an instant estimated score with a full
        domain and skill breakdown.
      </p>

      <div className="mt-6">
        <Link
          href="/signup?next=/premade/sat"
          className="inline-block rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
        >
          Start a SAT Practice Test
        </Link>
      </div>

      <Section title="What's Included">
        <p>
          Each form contains 98 questions — 54 Reading and Writing and 44 Math — and runs
          134 minutes. The Math modules allow an on-screen calculator and Desmos, just
          like the real exam.
        </p>
      </Section>

      <Section title="Reading and Writing Modules">
        <p>
          Two Reading and Writing modules, 27 questions each, 32 minutes each. Together
          they cover all four R&W domains: Information and Ideas, Craft and Structure,
          Expression of Ideas, and Standard English Conventions.
        </p>
      </Section>

      <Section title="Math Modules">
        <p>
          Two Math modules, 22 questions each, 35 minutes each. Together they cover all
          four Math domains: Algebra, Advanced Math, Problem-Solving and Data Analysis,
          and Geometry and Trigonometry.
        </p>
      </Section>

      <Section title="How Module-Adaptive Routing Works">
        <p>
          Everyone starts with the same first module (M1). Your performance on M1
          determines whether your second module (M2) follows the harder or the easier
          branch. Reaching the harder branch is what makes the highest score ranges
          available, so the first module matters more than its question count suggests.
        </p>
      </Section>

      <Section title="Test Timing">
        <ul className="ml-5 list-disc space-y-1">
          <li>Reading and Writing Module 1: 27 questions · 32 minutes</li>
          <li>Reading and Writing Module 2: 27 questions · 32 minutes</li>
          <li>Math Module 1: 22 questions · 35 minutes</li>
          <li>Math Module 2: 22 questions · 35 minutes</li>
          <li>Total: 98 questions · 134 minutes</li>
        </ul>
      </Section>

      <Section title="Autosave and Resume">
        <p>
          Your answers are saved automatically as you go. If your browser closes or your
          connection drops mid-test, you can return and resume the in-progress attempt
          without losing work.
        </p>
      </Section>

      <Section title="After You Submit">
        <p>
          As soon as you submit, you receive an instant estimated score: a total on the
          400–1600 scale plus separate Reading and Writing and Math section scores.
        </p>
      </Section>

      <Section title="Score Report">
        <p>
          The report goes deeper than a number. It shows domain-level performance,
          skill-level performance, every question marked correct or incorrect, and a
          worked explanation for each item.
        </p>
        <p>
          <Link href="/sat-score-reports" className="font-medium text-emerald-600 hover:text-emerald-700">
            See a full breakdown of the score report →
          </Link>
        </p>
      </Section>

      <Section title="How to Use Results">
        <p>
          Review your mistakes first, identify the domains where you lost the most points,
          then drill those weak skills in the question bank before your next full test.
        </p>
        <p>
          <Link href="/sat-question-bank" className="font-medium text-emerald-600 hover:text-emerald-700">
            Practice weak skills in the question bank →
          </Link>
        </p>
      </Section>

      <Section title="Who Should Take It">
        <p>
          Students at any level benefit. A full form works as a diagnostic if you&apos;re
          starting out and as a progress check if you&apos;re already deep into prep.
        </p>
      </Section>

      <Section title="Getting Started">
        <p>
          Create a free account and you get 48-hour free access to Form 1, Form 2, or
          Form 3 — enough to complete a full practice test at no cost.
        </p>
      </Section>

      <IndependenceCallout />
    </SeoPageLayout>
  )
}
