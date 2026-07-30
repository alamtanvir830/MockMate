import type { Metadata } from 'next'
import Link from 'next/link'
import { SeoPageLayout } from '@/components/seo/SeoPageLayout'
import { JsonLd } from '@/components/seo/JsonLd'
import { IndependenceCallout } from '@/components/seo/IndependenceCallout'
import { ArticleByline } from '@/components/seo/ArticleByline'
import { buildSeoMetadata } from '@/components/seo/seo-meta'
import { buildArticleJsonLd } from '@/components/seo/article-jsonld'

const SLUG = '/resources/sat-study-plan-1100-to-1300'
const TITLE = 'SAT Study Plan for Students Scoring 1100–1300'
const DESCRIPTION =
  'A structured SAT study plan for students scoring 1100–1300: diagnostic testing, grammar and algebra foundations, domain review, targeted practice, and a weekly schedule.'

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

export default function StudyPlan1100Article() {
  return (
    <SeoPageLayout>
      <JsonLd data={jsonLd} />

      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        {TITLE}
      </h1>
      <ArticleByline />

      <P>
        If you are scoring between 1100 and 1300, you already have real ability — the goal
        now is to convert scattered strengths into consistent points. At this range, the
        fastest gains usually come from firming up foundations and cutting careless errors,
        not from chasing the hardest questions. Here is a plan built for that.
      </P>

      <H2>Start with a full diagnostic test</H2>
      <P>
        Begin with one full-length practice test under real timing. You cannot plan
        efficiently without knowing where your points are leaking. Take the test, then
        study the domain and skill breakdown to see whether Reading and Writing or Math is
        costing you more, and which specific domains are weakest.
      </P>

      <H2>Rebuild grammar and algebra foundations</H2>
      <P>
        Two areas produce outsized gains in this range. In Reading and Writing, the
        Standard English Conventions questions — punctuation, boundaries, and grammar — are
        learnable rules that reward direct study. In Math, linear equations, systems, and
        basic algebra appear constantly. Master these foundations first, because they show
        up on nearly every form.
      </P>

      <H2>Review one domain at a time</H2>
      <P>
        Rather than studying everything at once, work through your weak domains in order of
        impact. Spend a focused block on a single domain — say, transitions or ratios and
        rates — learn the underlying skill, then practice only that skill until it feels
        automatic before moving on.
      </P>
      <P>
        MockMate&apos;s{' '}
        <Link href="/sat-reading-writing-academy" className="font-medium text-emerald-600 hover:text-emerald-700">
          Reading and Writing Academy
        </Link>{' '}
        and{' '}
        <Link href="/sat-math-desmos-academy" className="font-medium text-emerald-600 hover:text-emerald-700">
          Math and Desmos Academy
        </Link>{' '}
        are organized exactly this way, skill by skill.
      </P>

      <H2>Do targeted practice, not random drills</H2>
      <P>
        After each lesson, practice the matching skill in the{' '}
        <Link href="/sat-question-bank" className="font-medium text-emerald-600 hover:text-emerald-700">
          question bank
        </Link>
        . Targeted sets reinforce what you just learned and build accuracy on your weak
        skills far faster than mixed practice, which mostly rehearses things you already
        know.
      </P>

      <H2>A sample weekly plan</H2>
      <ul className="mt-3 ml-5 list-disc space-y-1 text-[15px] text-slate-700">
        <li><strong>Day 1:</strong> Lesson + targeted practice on your weakest R&W domain.</li>
        <li><strong>Day 2:</strong> Lesson + targeted practice on your weakest Math domain.</li>
        <li><strong>Day 3:</strong> Second weak R&W skill + review of Day 1 corrections.</li>
        <li><strong>Day 4:</strong> Second weak Math skill + review of Day 2 corrections.</li>
        <li><strong>Day 5:</strong> Mixed practice set covering the week&apos;s skills.</li>
        <li><strong>Weekend:</strong> One full-length form, then a careful review.</li>
      </ul>

      <H2>Review mistakes every session</H2>
      <P>
        In this range, careless and setup errors quietly cost dozens of points. After every
        practice set and every full test, categorize your misses and write short
        corrections. Eliminating repeated careless mistakes alone can move a 1200 toward a
        1300 without learning a single new concept.
      </P>
      <P>
        Repeat the cycle — diagnose, learn, practice, retest — and your weak domains will
        shrink week by week. For the full workflow, see{' '}
        <Link href="/how-mockmate-works" className="font-medium text-emerald-600 hover:text-emerald-700">
          how MockMate works
        </Link>
        .
      </P>

      <IndependenceCallout />
    </SeoPageLayout>
  )
}
