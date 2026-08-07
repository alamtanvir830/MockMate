import type { Metadata } from 'next'
import Link from 'next/link'
import { SeoPageLayout } from '@/components/seo/SeoPageLayout'
import { JsonLd } from '@/components/seo/JsonLd'
import { IndependenceCallout } from '@/components/seo/IndependenceCallout'
import { buildSeoMetadata, SITE_URL } from '@/components/seo/seo-meta'

const SLUG = '/how-mockmate-works'

export const metadata: Metadata = buildSeoMetadata({
  title: 'How MockMate Digital SAT Prep Works | MockMate',
  description:
    'Learn how MockMate combines adaptive SAT-style exams, score reports, targeted question practice, and focused SAT courses into one study workflow.',
  slug: SLUG,
})

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'How MockMate Digital SAT Prep Works',
  url: `${SITE_URL}${SLUG}`,
  description:
    'Learn how MockMate combines adaptive SAT-style exams, score reports, targeted question practice, and focused SAT courses into one study workflow.',
}

const STEPS: Array<{ title: string; body: React.ReactNode }> = [
  { title: 'Create a free account', body: 'Sign up in under a minute to unlock your first practice test.' },
  {
    title: 'Start a full-length SAT-style practice test',
    body: 'New users get 48-hour free access to Forms 1, 2, and 3 — enough to complete a full test at no cost.',
  },
  {
    title: 'Experience module-adaptive routing',
    body: 'Your performance on Module 1 sets the difficulty of Module 2, just like the real Digital SAT.',
  },
  {
    title: 'Answers autosaved',
    body: 'Your progress saves automatically, so you can resume an interrupted attempt without losing work.',
  },
  {
    title: 'Receive an instant score report',
    body: 'Get an estimated total, section scores, and domain and skill breakdowns the moment you submit.',
  },
  {
    title: 'Review every question with explanations',
    body: 'Read the worked explanation for each item and note the specific error on anything you missed.',
  },
  {
    title: 'Identify your 2–3 weakest skill domains',
    body: 'The report highlights where you lost the most points, so you know exactly where to focus.',
  },
  {
    title: 'Practice targeted question sets',
    body: 'Drill those weak domains in the 1,000+ question bank with focused, skill-specific sets.',
  },
  {
    title: 'Study focused lessons',
    body: 'Reinforce the underlying skills in the Reading and Writing or Math and Desmos Academy.',
  },
  {
    title: 'Track improvement and retest',
    body: 'Watch your accuracy trend upward, then schedule your next full-length form to confirm the gains.',
  },
]

export default function HowMockMateWorksPage() {
  return (
    <SeoPageLayout>
      <JsonLd data={jsonLd} />

      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        A Clear SAT Preparation Cycle
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-slate-600">
        MockMate turns SAT prep into a repeatable loop: Test → Review → Target Weak Skills
        → Learn → Retest. Each pass through the cycle sharpens the skills your score report
        says matter most.
      </p>

      <ol className="mt-10 space-y-6">
        {STEPS.map((step, i) => (
          <li key={step.title} className="flex gap-4">
            <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">
              {i + 1}
            </span>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">{step.title}</h2>
              <p className="mt-1 text-[15px] leading-relaxed text-slate-700">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/signup?next=/premade/sat"
          className="rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
        >
          Start Free Practice Test
        </Link>
        <Link
          href="/sat-score-reports"
          className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          See how score reports work
        </Link>
      </div>

      <IndependenceCallout />
    </SeoPageLayout>
  )
}
