import { SITE_URL, OG_IMAGE } from './seo-meta'

export type BreadcrumbItem = { name: string; href?: string }

/** Builds a BreadcrumbList JSON-LD object. Last item should omit href. */
export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
    })),
  }
}

/** Builds Article JSON-LD (+ optional BreadcrumbList) for a resource article. */
export function buildArticleJsonLd({
  headline,
  description,
  slug,
  datePublished,
  dateModified,
  breadcrumbs,
}: {
  headline: string
  description: string
  slug: string
  datePublished: string
  dateModified?: string
  breadcrumbs?: BreadcrumbItem[]
}) {
  const effectiveModified = dateModified ?? datePublished
  const result: Record<string, unknown>[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline,
      description,
      datePublished,
      dateModified: effectiveModified,
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
  if (breadcrumbs) {
    result.push(buildBreadcrumbJsonLd(breadcrumbs))
  }
  return result
}
