import type { Metadata } from 'next'
import Link from 'next/link'
import { SeoPageLayout } from '@/components/seo/SeoPageLayout'
import { JsonLd } from '@/components/seo/JsonLd'
import { IndependenceCallout } from '@/components/seo/IndependenceCallout'
import { buildSeoMetadata, SITE_URL } from '@/components/seo/seo-meta'

const SLUG = '/resources'

export const metadata: Metadata = buildSeoMetadata({
  title: 'Digital SAT Study Guides and Practice Advice | MockMate',
  description:
    'Read practical Digital SAT guides about adaptive testing, practice-test review, score fluctuations, Desmos, targeted practice, and SAT study planning.',
  slug: SLUG,
})

const ARTICLES: Array<{ href: string; title: string; description: string }> = [
  {
    href: '/resources/how-digital-sat-adaptive-modules-work',
    title: 'How Digital SAT Adaptive Modules Work',
    description:
      'Understand the two-module structure of each section and how Module 1 performance routes you to an easier or harder Module 2.',
  },
  {
    href: '/resources/how-to-review-an-sat-practice-test',
    title: 'How to Review an SAT Practice Test',
    description:
      'A repeatable method for categorizing errors, checking lucky guesses, writing corrections, and scheduling retests.',
  },
  {
    href: '/resources/why-harder-sat-practice-tests-can-lower-your-score',
    title: 'Why Harder SAT Practice Tests Can Produce Lower Scores',
    description:
      'Why difficulty varies between forms, how easy practice creates false confidence, and how to read scores diagnostically.',
  },
  {
    href: '/resources/how-to-use-desmos-on-the-digital-sat',
    title: 'How to Use Desmos on Digital SAT Math',
    description:
      'Practical Desmos moves — graphing, intersections, checking solutions, testing choices — and when hand algebra is faster.',
  },
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

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Digital SAT Study Guides',
  url: `${SITE_URL}${SLUG}`,
  description:
    'Practical Digital SAT guides about adaptive testing, practice-test review, score fluctuations, Desmos, and SAT study planning.',
  hasPart: ARTICLES.map((a) => ({
    '@type': 'Article',
    headline: a.title,
    url: `${SITE_URL}${a.href}`,
  })),
}

export default function ResourcesPage() {
  return (
    <SeoPageLayout>
      <JsonLd data={jsonLd} />

      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        Digital SAT Study Guides
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-slate-600">
        Practical, no-fluff guides to help you understand the Digital SAT, review your
        practice tests effectively, and build a study plan that fits your score range.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {ARTICLES.map((article) => (
          <Link
            key={article.href}
            href={article.href}
            className="group rounded-xl border border-slate-200 p-6 transition-colors hover:border-emerald-300 hover:bg-emerald-50/40"
          >
            <h2 className="text-lg font-semibold text-slate-900 group-hover:text-emerald-700">
              {article.title}
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-slate-700">
              {article.description}
            </p>
            <span className="mt-3 inline-block text-sm font-medium text-emerald-600">
              Read the guide →
            </span>
          </Link>
        ))}
      </div>

      <IndependenceCallout />
    </SeoPageLayout>
  )
}
