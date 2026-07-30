import type { Metadata } from 'next'
import Link from 'next/link'
import { SeoPageLayout } from '@/components/seo/SeoPageLayout'
import { JsonLd } from '@/components/seo/JsonLd'
import { IndependenceCallout } from '@/components/seo/IndependenceCallout'
import { ArticleByline } from '@/components/seo/ArticleByline'
import { buildSeoMetadata } from '@/components/seo/seo-meta'
import { buildArticleJsonLd } from '@/components/seo/article-jsonld'

const SLUG = '/resources/sat-study-plan-1300-to-1450'
const TITLE = 'SAT Study Plan for Students Scoring 1300–1450'
const DESCRIPTION =
  'An SAT study plan for students scoring 1300–1450: eliminating recurring errors, harder practice, advanced math, evidence and inference, grammar precision, and full-length testing.'

export const metadata: Metadata = buildSeoMetadata({
  title: `${TITLE} | MockMate`,
  description: DESCRIPTION,
  slug: SLUG,
})

const jsonLd = buildArticleJsonLd({
  headline: TITLE,
  description: DESCRIPTION,
  slug: SLUG,
  datePublished: '2026-07-01',
})

function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 text-[15px] leading-relaxed text-slate-700">{children}</p>
}
function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-10 text-xl font-bold text-slate-900">{children}</h2>
}

export default function StudyPlan1300Article() {
  return (
    <SeoPageLayout>
      <JsonLd data={jsonLd} />

      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        {TITLE}
      </h1>
      <ArticleByline />

      <P>
        Scoring between 1300 and 1450 means the fundamentals are already in place. Getting
        higher is a game of precision: you are no longer learning whole topics from scratch
        but hunting down the handful of recurring errors and hardest question types that
        separate a strong score from an elite one.
      </P>

      <H2>Target high-value recurring errors</H2>
      <P>
        At this level, points are lost in patterns, not randomly. Review several recent
        full-length tests together and look for errors that repeat: maybe you consistently
        miss the second-hardest algebra question, or slip on inference questions with
        subtle wording. A few recurring error types, fixed, can be worth 30 to 50 points.
      </P>

      <H2>Practice on the harder branch</H2>
      <P>
        Easy and medium questions are no longer where your points come from. You need
        volume on hard questions specifically. Because the Digital SAT&apos;s harder Module
        2 is where the top score ranges live, your practice should skew toward that
        difficulty. Understanding the{' '}
        <Link href="/resources/how-digital-sat-adaptive-modules-work" className="font-medium text-emerald-600 hover:text-emerald-700">
          adaptive module structure
        </Link>{' '}
        helps you see why the hardest questions matter most.
      </P>

      <H2>Sharpen advanced math</H2>
      <P>
        Advanced Math — quadratics, exponentials, polynomial and rational expressions,
        nonlinear systems — is often the difference between 1400 and 1500. These topics
        appear more heavily on the harder branch and are where high scorers stall. Drill
        them until the harder variants feel routine, and use Desmos strategically to check
        and speed up your work.
      </P>

      <H2>Master evidence and inference</H2>
      <P>
        On Reading and Writing, the toughest questions cluster in Command of Evidence,
        Inferences, and Quantitative Evidence. These reward careful reading and precise
        logic rather than vocabulary. Practice choosing the answer that is fully supported
        — not merely plausible — and learn to eliminate choices that overreach or shift the
        claim.
      </P>

      <H2>Push grammar precision</H2>
      <P>
        You likely get most conventions questions right, but the last few require exact
        rule knowledge: subtle boundary decisions, modifier placement, and agreement in
        complex sentences. Nail down the specific rules behind the questions you still miss
        instead of relying on what &quot;sounds right.&quot;
      </P>

      <H2>Test full-length and expect score variation</H2>
      <P>
        Keep taking full-length forms under real timing to build stamina and pacing. Expect
        some variation between forms — a harder form can produce a lower total without
        meaning you regressed. Judge progress by your{' '}
        <Link href="/sat-score-reports" className="font-medium text-emerald-600 hover:text-emerald-700">
          domain and skill breakdown
        </Link>
        , not the raw number on any single test. For more on this, see{' '}
        <Link href="/resources/why-harder-sat-practice-tests-can-lower-your-score" className="font-medium text-emerald-600 hover:text-emerald-700">
          why harder practice tests can lower your score
        </Link>
        .
      </P>

      <H2>Keep practice targeted</H2>
      <P>
        Every full test should feed a short, targeted practice list. Use MockMate&apos;s{' '}
        <Link href="/sat-question-bank" className="font-medium text-emerald-600 hover:text-emerald-700">
          question bank
        </Link>{' '}
        to drill the exact hard skills your reports flag. At this level, precision practice
        on a few weaknesses beats broad review every time.
      </P>

      <IndependenceCallout />
    </SeoPageLayout>
  )
}
