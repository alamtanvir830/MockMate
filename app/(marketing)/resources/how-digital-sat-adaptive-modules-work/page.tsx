import type { Metadata } from 'next'
import Link from 'next/link'
import { SeoPageLayout } from '@/components/seo/SeoPageLayout'
import { JsonLd } from '@/components/seo/JsonLd'
import { IndependenceCallout } from '@/components/seo/IndependenceCallout'
import { ArticleByline } from '@/components/seo/ArticleByline'
import { buildSeoMetadata } from '@/components/seo/seo-meta'
import { buildArticleJsonLd } from '@/components/seo/article-jsonld'

const SLUG = '/resources/how-digital-sat-adaptive-modules-work'
const TITLE = 'How Digital SAT Adaptive Modules Work'
const DESCRIPTION =
  'Understand how the Digital SAT splits each section into two modules and how your Module 1 performance routes you to an easier or harder Module 2.'

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

export default function AdaptiveModulesArticle() {
  return (
    <SeoPageLayout>
      <JsonLd data={jsonLd} />

      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        {TITLE}
      </h1>
      <ArticleByline />

      <P>
        The Digital SAT is a multistage adaptive test. That phrase sounds technical, but
        the idea is simple: the exam adjusts its difficulty based on how you perform
        partway through. Understanding exactly how that adjustment happens changes how you
        should approach the test — and why your first module matters far more than its
        question count suggests.
      </P>

      <H2>Two modules per section</H2>
      <P>
        Both the Reading and Writing section and the Math section are split into two
        modules. In Reading and Writing, each module has 27 questions with 32 minutes to
        answer them. In Math, each module has 22 questions with 35 minutes. You always
        complete Module 1 first, then Module 2. The two modules together produce your
        section score.
      </P>

      <H2>The first module is the same for everyone</H2>
      <P>
        Module 1 is a mixed-difficulty module delivered to every test taker in that
        section. It contains easy, medium, and hard questions blended together. Because
        everyone sees a comparable first module, your performance on it becomes the signal
        the test uses to decide what comes next.
      </P>

      <H2>Module 1 performance routes you to Module 2</H2>
      <P>
        Once you finish Module 1, the exam evaluates how you did and routes you to one of
        two versions of Module 2: a harder branch or an easier branch. Students who
        perform well on Module 1 are sent to the harder Module 2; students who struggle are
        sent to the easier one. You do not choose your branch, and you are not told which
        one you received.
      </P>

      <H2>Why this matters for your score</H2>
      <P>
        Here is the crucial part: the harder Module 2 has a higher scoring ceiling. The
        top score ranges are only reachable through the harder branch. If you land on the
        easier Module 2, you can still earn a solid score, but the very highest outcomes
        are effectively capped. This means the first module is not just &quot;half the
        section&quot; — it is the gate that determines how high you can score at all.
      </P>
      <P>
        The practical takeaway is to treat Module 1 with full focus and pacing discipline.
        Do not save energy for later; a strong Module 1 unlocks the harder questions that
        let you demonstrate a top score.
      </P>

      <H2>How MockMate simulates adaptive routing</H2>
      <P>
        MockMate&apos;s full-length forms recreate this structure. Everyone starts with the
        same Module 1, and your performance determines whether Module 2 follows the harder
        or easier branch — the same mechanic as the real exam. That lets your practice
        feel like the actual adaptive test and helps you build the pacing habits that pay
        off on Module 1.
      </P>
      <P>
        You can see this in action by taking a{' '}
        <Link href="/sat-practice-test" className="font-medium text-brand-500 hover:text-brand-600">
          full-length practice test
        </Link>
        , then reviewing your{' '}
        <Link href="/sat-score-reports" className="font-medium text-brand-500 hover:text-brand-600">
          score report
        </Link>{' '}
        to see how each module contributed.
      </P>

      <H2>A note on accuracy</H2>
      <P>
        MockMate is not affiliated with the College Board. Our forms model the adaptive
        structure of the Digital SAT for practice purposes, and practice scores are
        estimates rather than official results. The real exam&apos;s exact routing
        thresholds are set by the College Board and are not published in full.
      </P>

      <IndependenceCallout />
    </SeoPageLayout>
  )
}
