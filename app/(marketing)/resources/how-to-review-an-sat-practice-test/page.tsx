import type { Metadata } from 'next'
import Link from 'next/link'
import { SeoPageLayout } from '@/components/seo/SeoPageLayout'
import { JsonLd } from '@/components/seo/JsonLd'
import { IndependenceCallout } from '@/components/seo/IndependenceCallout'
import { ArticleByline } from '@/components/seo/ArticleByline'
import { buildSeoMetadata } from '@/components/seo/seo-meta'
import { buildArticleJsonLd } from '@/components/seo/article-jsonld'

const SLUG = '/resources/how-to-review-an-sat-practice-test'
const TITLE = 'How to Review an SAT Practice Test'
const DESCRIPTION =
  'A repeatable method for reviewing an SAT practice test: categorize errors, check lucky guesses, write corrections, run targeted practice, and schedule retests.'

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

export default function ReviewPracticeTestArticle() {
  return (
    <SeoPageLayout>
      <JsonLd data={jsonLd} />

      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        {TITLE}
      </h1>
      <ArticleByline />

      <P>
        Taking a practice test is the easy part. The score gain comes from the review, and
        most students rush it. A good review turns every missed question into a specific,
        fixable lesson. Here is a method you can repeat after every full-length test.
      </P>

      <H2>Categorize every error</H2>
      <P>
        Do not just mark a question &quot;wrong.&quot; Label why you missed it. Most errors
        fall into five buckets:
      </P>
      <ul className="mt-3 ml-5 list-disc space-y-1 text-[15px] text-slate-700">
        <li><strong>Concept</strong> — you did not know the underlying rule or method.</li>
        <li><strong>Setup</strong> — you understood the concept but translated the problem incorrectly.</li>
        <li><strong>Careless</strong> — you knew how to solve it but slipped on arithmetic or a misread.</li>
        <li><strong>Timing</strong> — you ran out of time or rushed and guessed.</li>
        <li><strong>Vocabulary</strong> — a word or phrase in the question or answer choices tripped you up.</li>
      </ul>
      <P>
        The category tells you what to do next. Concept errors send you to a lesson; setup
        and careless errors call for a slower, more deliberate process; timing errors mean
        you need pacing practice, not more content.
      </P>

      <H2>Review the questions you got right — especially the guesses</H2>
      <P>
        A correct answer you were unsure about is a future wrong answer waiting to happen.
        Flag every question you guessed on or solved by elimination without real
        confidence. Re-solve them properly. If you cannot reconstruct a clean solution, add
        that skill to your practice list even though it did not cost you points this time.
      </P>

      <H2>Write out corrections</H2>
      <P>
        For each miss, write a short correction in your own words: the correct approach,
        the specific step you got wrong, and what you will do differently. Writing forces
        you to articulate the fix rather than nodding along to an explanation. Keep these
        corrections in one place so you can review them before your next test.
      </P>

      <H2>Turn weaknesses into targeted practice</H2>
      <P>
        Once your errors are categorized, patterns appear — maybe three misses in
        transitions, or repeated setup errors on systems of equations. Practice those
        specific skills rather than doing another full test immediately. Targeted sets are
        far more efficient than random mixed practice.
      </P>
      <P>
        MockMate&apos;s{' '}
        <Link href="/sat-question-bank" className="font-medium text-emerald-600 hover:text-emerald-700">
          question bank
        </Link>{' '}
        groups questions by skill and difficulty, and your{' '}
        <Link href="/sat-score-reports" className="font-medium text-emerald-600 hover:text-emerald-700">
          score report
        </Link>{' '}
        points you straight to your weakest domains.
      </P>

      <H2>Schedule the retest</H2>
      <P>
        Do not retake a full form the next day. Give yourself a few days to work the
        targeted practice and lessons, then schedule the next full-length test to measure
        whether the fixes held. Spacing your tests keeps each one meaningful as a progress
        check rather than a repeated grind.
      </P>

      <H2>Make it a habit</H2>
      <P>
        The students who improve fastest are not the ones who take the most tests — they
        are the ones who review the most carefully. Categorize, correct, target, retest,
        and repeat. Each cycle removes a category of mistakes for good.
      </P>

      <IndependenceCallout />
    </SeoPageLayout>
  )
}
