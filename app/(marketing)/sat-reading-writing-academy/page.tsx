import type { Metadata } from 'next'
import Link from 'next/link'
import { SeoPageLayout } from '@/components/seo/SeoPageLayout'
import { JsonLd } from '@/components/seo/JsonLd'
import { IndependenceCallout } from '@/components/seo/IndependenceCallout'
import { buildSeoMetadata, SITE_URL } from '@/components/seo/seo-meta'

const SLUG = '/sat-reading-writing-academy'

export const metadata: Metadata = buildSeoMetadata({
  title: 'SAT Reading and Writing Practice | MockMate Academy',
  description:
    'Practice and improve every Digital SAT Reading and Writing skill — Information and Ideas, Craft and Structure, Expression of Ideas, and Standard English Conventions — with lessons and targeted SAT-style questions.',
  slug: SLUG,
})

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'SAT Reading and Writing Practice',
    url: `${SITE_URL}${SLUG}`,
    description:
      'Practice and improve every Digital SAT Reading and Writing skill with lessons, strategy guidance, and targeted SAT-style questions.',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'MockMate Reading and Writing Academy',
    description:
      'Skill-by-skill lessons covering all 11 Digital SAT Reading and Writing skills across four domains, each paired with targeted SAT-style practice.',
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

export default function ReadingWritingAcademyPage() {
  return (
    <SeoPageLayout>
      <JsonLd data={jsonLd} />

      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        Build the Reading and Writing Skills Tested on the Digital SAT
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-slate-600">
        The Reading and Writing Academy breaks the section into 11 teachable skills across
        four domains, each with a focused lesson and matching SAT-style practice.
      </p>

      <Section title="Overview">
        <p>
          Rather than treating Reading and Writing as one big test, the Academy teaches it
          skill by skill, aligned to the four Digital SAT R&W domains. Each lesson pairs
          strategy with worked examples and then routes you to question-bank sets for the
          same skill.
        </p>
      </Section>

      <Section title="Information and Ideas (4 skills)">
        <ul className="ml-5 list-disc space-y-1">
          <li><strong>Central Ideas and Details</strong> — find the main point and the details that support it.</li>
          <li><strong>Command of Evidence</strong> — choose the textual or data evidence that best supports a claim.</li>
          <li><strong>Inferences</strong> — draw conclusions the passage implies but does not state.</li>
          <li><strong>Quantitative Evidence</strong> — read tables, graphs, and figures to support reasoning.</li>
        </ul>
      </Section>

      <Section title="Craft and Structure (3 skills)">
        <ul className="ml-5 list-disc space-y-1">
          <li><strong>Words in Context</strong> — determine precise meaning from surrounding text.</li>
          <li><strong>Text Structure and Purpose</strong> — analyze how a passage is organized and why.</li>
          <li><strong>Cross-Text Connections</strong> — compare and connect ideas across paired passages.</li>
        </ul>
      </Section>

      <Section title="Expression of Ideas (2 skills)">
        <ul className="ml-5 list-disc space-y-1">
          <li><strong>Rhetorical Synthesis</strong> — combine given notes to meet a stated goal.</li>
          <li><strong>Transitions</strong> — choose logical connectors between ideas.</li>
        </ul>
      </Section>

      <Section title="Standard English Conventions (2 skills)">
        <ul className="ml-5 list-disc space-y-1">
          <li><strong>Boundaries</strong> — sentence construction, punctuation, and clause boundaries.</li>
          <li><strong>Form, Structure, and Sense</strong> — grammar, agreement, and logical word form.</li>
        </ul>
      </Section>

      <Section title="How Lessons Connect to Practice">
        <p>
          Every lesson maps to a matching set of skills in the question bank. Learn the
          skill, then immediately practice it on SAT-style items so the strategy sticks.
        </p>
        <p>
          <Link href="/sat-question-bank" className="font-medium text-brand-500 hover:text-brand-600">
            Practice R&W skills in the question bank →
          </Link>
        </p>
      </Section>

      <Section title="Identifying Weak Domains">
        <p>
          Your diagnostic and full-form results show which of the four R&W domains cost
          you the most points, so you know which lessons to start with.
        </p>
      </Section>

      <Section title="Reviewing Missed Questions">
        <p>
          Use an explanation-first review: read the worked explanation before re-solving,
          identify the exact skill being tested, and note the error type. Then reinforce
          that skill with a targeted set.
        </p>
      </Section>

      <Section title="Who It's For">
        <p>
          The Academy helps students across the full score range — from those building
          foundations to those targeting a single stubborn domain.
        </p>
      </Section>

      <Section title="Fitting Into a Study Plan">
        <p>
          The workflow is simple: take an exam, read the report, study the relevant
          Academy lessons, practice question-bank sets, then retake a form.
        </p>
        <p>
          <Link href="/how-mockmate-works" className="font-medium text-brand-500 hover:text-brand-600">
            See the full study cycle →
          </Link>
        </p>
        <p>
          <Link href="/sat-practice-test" className="font-medium text-brand-500 hover:text-brand-600">
            Take a full-length SAT practice test →
          </Link>
        </p>
        <p>
          <Link href="/digital-sat-prep" className="font-medium text-brand-500 hover:text-brand-600">
            Overview of all MockMate Digital SAT prep tools →
          </Link>
        </p>
        <p>
          <Link href="/resources" className="font-medium text-brand-500 hover:text-brand-600">
            Browse SAT study guides and resources →
          </Link>
        </p>
        <p>
          <Link href="/resources/sat-reading-writing" className="font-medium text-brand-500 hover:text-brand-600">
            SAT Reading &amp; Writing: skills, domains, and strategies →
          </Link>
        </p>
      </Section>

      <IndependenceCallout />
    </SeoPageLayout>
  )
}
