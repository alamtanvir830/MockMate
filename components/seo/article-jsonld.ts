import { SITE_URL, OG_IMAGE } from './seo-meta'

/** Builds Article + WebPage JSON-LD for a resource article. */
export function buildArticleJsonLd({
  headline,
  description,
  slug,
  datePublished,
  dateModified = '2026-07-30',
}: {
  headline: string
  description: string
  slug: string
  datePublished: string
  dateModified?: string
}) {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline,
      description,
      datePublished,
      dateModified,
      author: { '@type': 'Organization', name: 'MockMate Editorial Team' },
      publisher: {
        '@type': 'Organization',
        name: 'MockMate',
        logo: { '@type': 'ImageObject', url: OG_IMAGE },
      },
      image: OG_IMAGE,
      mainEntityOfPage: `${SITE_URL}${slug}`,
    },
  ]
}
