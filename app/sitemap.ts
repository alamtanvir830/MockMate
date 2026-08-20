import type { MetadataRoute } from 'next'

const BASE = 'https://www.mockmateapp.com'
const NEW_PAGE_DATE = '2026-07-30T00:00:00Z'
const SEO_UPDATE_DATE = '2026-08-19T00:00:00Z'
const SKILL_PAGE_DATE = '2026-08-15T00:00:00Z'

export default function sitemap(): MetadataRoute.Sitemap {
  const updatedPages: Array<{ path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }> = [
    { path: '/digital-sat-prep', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/sat-practice-test', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/sat-question-bank', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/sat-reading-writing-academy', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/sat-math-desmos-academy', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/resources', priority: 0.7, changeFrequency: 'weekly' },
    { path: '/resources/most-accurate-sat-practice-tests', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/resources/bluebook-sat-practice-tests', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/resources/how-many-sat-practice-tests', priority: 0.7, changeFrequency: 'monthly' },
  ]

  const newPages: Array<{ path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }> = [
    { path: '/sat-score-reports', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/how-mockmate-works', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/how-we-review-sat-content', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/about', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.5, changeFrequency: 'monthly' },
    { path: '/resources/how-digital-sat-adaptive-modules-work', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/resources/how-to-review-an-sat-practice-test', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/resources/why-harder-sat-practice-tests-can-lower-your-score', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/resources/how-to-use-desmos-on-the-digital-sat', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/resources/sat-study-plan-1100-to-1300', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/resources/sat-study-plan-1300-to-1450', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/pricing', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/terms', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/refund-policy', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/sat-disclaimer', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/ai-disclosure', priority: 0.3, changeFrequency: 'yearly' },
  ]

  const skillPages: Array<{ path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }> = [
    { path: '/resources/sat-reading-writing', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/resources/sat-math', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/resources/sat-transitions-practice', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/resources/sat-words-in-context-practice', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/resources/sat-command-of-evidence-practice', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/resources/sat-boundaries-grammar', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/resources/sat-rhetorical-synthesis', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/resources/sat-algebra-practice', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/resources/sat-systems-of-equations', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/resources/sat-quadratic-equations', priority: 0.6, changeFrequency: 'monthly' },
  ]

  return [
    {
      url: `${BASE}/`,
      lastModified: SEO_UPDATE_DATE,
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...updatedPages.map((page) => ({
      url: `${BASE}${page.path}`,
      lastModified: SEO_UPDATE_DATE,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...newPages.map((page) => ({
      url: `${BASE}${page.path}`,
      lastModified: NEW_PAGE_DATE,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...skillPages.map((page) => ({
      url: `${BASE}${page.path}`,
      lastModified: SKILL_PAGE_DATE,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
  ]
}
