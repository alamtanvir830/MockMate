import type { Metadata } from 'next'
import Link from 'next/link'
import { SeoPageLayout } from '@/components/seo/SeoPageLayout'
import { JsonLd } from '@/components/seo/JsonLd'
import { IndependenceCallout } from '@/components/seo/IndependenceCallout'
import { buildSeoMetadata, SITE_URL } from '@/components/seo/seo-meta'

const SLUG = '/resources'

export const metadata: Metadata = buildSeoMetadata({
  title: 'SAT Resources: Guides, Skills, Strategies & Study Plans | MockMate',
  description:
    'Practical Digital SAT guides covering practice-test strategy, Reading & Writing skills, Math skills, study planning, adaptive modules, and Desmos — no fluff.',
  slug: SLUG,
})

type Article = { href: string; title: string; description: string }

const PRACTICE_TEST_ARTICLES: Article[] = [
  {
    href: '/resources/most-accurate-sat-practice-tests',
    title: 'Which SAT Practice Test Is Most Accurate?',
    description:
      'Why official College Board/Bluebook tests set the accuracy benchmark, and how to evaluate additional practice material.',
  },
  {
    href: '/resources/bluebook-sat-practice-tests',
    title: 'How to Use Bluebook SAT Practice Tests Effectively',
    description:
      "How to set up official Bluebook tests, simulate test-day conditions, review your results, and combine them with additional practice.",
  },
  {
    href: '/resources/how-many-sat-practice-tests',
    title: 'How Many SAT Practice Tests Should You Take?',
    description:
      'The right number depends on your timeline, score gap, and review quality — not volume. Includes 4-week and 8-week example schedules.',
  },
  {
    href: '/resources/how-to-review-an-sat-practice-test',
    title: 'How to Review an SAT Practice Test',
    description:
      'A repeatable review loop: categorize errors, check lucky guesses, write corrections, target weak skills, and schedule retests.',
  },
  {
    href: '/resources/why-harder-sat-practice-tests-can-lower-your-score',
    title: 'Why Harder SAT Practice Tests Can Produce Lower Scores',
    description:
      'Why difficulty varies between forms, how easy practice creates false confidence, and how to read scores diagnostically.',
  },
]

const STRATEGY_ARTICLES: Article[] = [
  {
    href: '/resources/how-digital-sat-adaptive-modules-work',
    title: 'How Digital SAT Adaptive Modules Work',
    description:
      'Understand the two-module structure and how your Module 1 performance routes you to a harder or easier Module 2.',
  },
  {
    href: '/resources/how-to-use-desmos-on-the-digital-sat',
    title: 'How to Use Desmos on Digital SAT Math',
    description:
      'Practical Desmos moves — graphing, intersections, checking solutions, testing choices — and when hand algebra is faster.',
  },
]

const STUDY_PLAN_ARTICLES: Article[] = [
  {
    href: '/resources/sat-study-plan-1100-to-1300',
    title: 'SAT Study Plan for Students Scoring 1100–1300',
    description:
      'A structured plan focused on grammar and algebra foundations, domain review, and targeted weekly practice.',
  },
  {
    href: '/resources/sat-study-plan-1300-to-1450',
    title: 'SAT Study Plan for Students Scoring 1300–1450',
    description:
      'A plan for high scorers: eliminating recurring errors, advanced math, precise grammar, and full-length testing.',
  },
]

const RW_HUB: Article = {
  href: '/resources/sat-reading-writing',
  title: 'SAT Reading & Writing: Skills & Strategies',
  description:
    'A hub for all four R&W domains — Information and Ideas, Craft and Structure, Expression of Ideas, and Standard English Conventions — with skill-specific strategy guides.',
}

const MATH_HUB: Article = {
  href: '/resources/sat-math',
  title: 'SAT Math: Skills & Strategies',
  description:
    'A hub for all four Math domains — Algebra, Advanced Math, Problem-Solving & Data Analysis, and Geometry & Trigonometry — with skill-specific strategy guides and Desmos tips.',
}

const RW_SKILL_ARTICLES: Article[] = [
  {
    href: '/resources/sat-transitions-practice',
    title: 'SAT Transitions Practice',
    description:
      'The four logical relationships SAT Transitions questions test, the most common wrong-answer traps, and a repeatable strategy with a worked original example.',
  },
  {
    href: '/resources/sat-words-in-context-practice',
    title: 'SAT Words in Context Practice',
    description:
      'Why the most familiar word definition is often wrong, how to predict meaning from context before reading the choices, and worked examples for both question types.',
  },
  {
    href: '/resources/sat-command-of-evidence-practice',
    title: 'SAT Command of Evidence',
    description:
      'Textual and quantitative subtypes explained, the critical difference between relevant and sufficient evidence, and strategies for each.',
  },
  {
    href: '/resources/sat-boundaries-grammar',
    title: 'SAT Boundaries: Sentence Boundary Rules',
    description:
      'The punctuation rules for periods, semicolons, commas, and colons — and a systematic strategy for identifying clause types to eliminate wrong answers.',
  },
  {
    href: '/resources/sat-rhetorical-synthesis',
    title: 'SAT Rhetorical Synthesis',
    description:
      'How to read the stated rhetorical goal carefully, why fact-dense answers often miss the mark, and strategies for each common goal type.',
  },
]

const MATH_SKILL_ARTICLES: Article[] = [
  {
    href: '/resources/sat-algebra-practice',
    title: 'SAT Algebra Practice',
    description:
      'Linear equations, linear functions, and word problems — including how to translate real-world scenarios into equations and when to use Desmos.',
  },
  {
    href: '/resources/sat-systems-of-equations',
    title: 'SAT Systems of Equations',
    description:
      'When to use substitution, elimination, or Desmos; how to determine the number of solutions; and worked examples covering each question type.',
  },
  {
    href: '/resources/sat-quadratic-equations',
    title: 'SAT Quadratic Equations',
    description:
      'Factoring, the quadratic formula, and Desmos graphing — with guidance on which approach is fastest for each question type and a forms reference table.',
  },
]

const ALL_ARTICLES = [
  ...PRACTICE_TEST_ARTICLES,
  ...STRATEGY_ARTICLES,
  ...STUDY_PLAN_ARTICLES,
  RW_HUB,
  MATH_HUB,
  ...RW_SKILL_ARTICLES,
  ...MATH_SKILL_ARTICLES,
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'SAT Resources',
  url: `${SITE_URL}${SLUG}`,
  description:
    'Practical Digital SAT guides covering practice-test strategy, Reading & Writing skills, Math skills, study planning, adaptive modules, and Desmos.',
  hasPart: ALL_ARTICLES.map((a) => ({
    '@type': 'Article',
    headline: a.title,
    url: `${SITE_URL}${a.href}`,
  })),
}

function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={article.href}
      className="group rounded-xl border border-slate-200 p-6 transition-colors hover:border-brand-300 hover:bg-brand-50/40"
    >
      <h3 className="text-lg font-semibold text-slate-900 group-hover:text-brand-600">
        {article.title}
      </h3>
      <p className="mt-2 text-[15px] leading-relaxed text-slate-700">
        {article.description}
      </p>
      <span className="mt-3 inline-block text-sm font-medium text-brand-500">
        Read the guide →
      </span>
    </Link>
  )
}

function Section({ title, articles }: { title: string; articles: Article[] }) {
  return (
    <section className="mt-12">
      <h2 className="text-lg font-bold text-slate-800">{title}</h2>
      <div className="mt-4 grid gap-5 sm:grid-cols-2">
        {articles.map((article) => (
          <ArticleCard key={article.href} article={article} />
        ))}
      </div>
    </section>
  )
}

export default function ResourcesPage() {
  return (
    <SeoPageLayout>
      <JsonLd data={jsonLd} />

      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        SAT Resources
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-slate-600">
        Useful guides, strategies, and study plans for Digital SAT preparation — written to
        be practical rather than generic.
      </p>

      <Section title="SAT Practice Tests" articles={PRACTICE_TEST_ARTICLES} />
      <Section title="Strategy" articles={STRATEGY_ARTICLES} />
      <Section title="Study Plans" articles={STUDY_PLAN_ARTICLES} />

      <section className="mt-12">
        <h2 className="text-lg font-bold text-slate-800">Reading &amp; Writing</h2>
        <p className="mt-2 text-[15px] text-slate-600">
          Skill-specific guides for all four R&amp;W domains.
        </p>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <ArticleCard article={RW_HUB} />
          {RW_SKILL_ARTICLES.map((article) => (
            <ArticleCard key={article.href} article={article} />
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-lg font-bold text-slate-800">Math</h2>
        <p className="mt-2 text-[15px] text-slate-600">
          Skill-specific guides for SAT Math — from linear algebra to quadratics, with
          Desmos strategy throughout.
        </p>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <ArticleCard article={MATH_HUB} />
          {MATH_SKILL_ARTICLES.map((article) => (
            <ArticleCard key={article.href} article={article} />
          ))}
        </div>
      </section>

      <IndependenceCallout />
    </SeoPageLayout>
  )
}
