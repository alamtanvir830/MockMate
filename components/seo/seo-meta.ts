import type { Metadata } from 'next'

export const SITE_URL = 'https://www.mockmateapp.com'
export const OG_IMAGE = `${SITE_URL}/opengraph-image`

/**
 * Builds a consistent Metadata object for public SEO pages:
 * canonical, OpenGraph, and Twitter card all derived from one slug.
 */
export function buildSeoMetadata({
  title,
  description,
  slug,
}: {
  title: string
  description: string
  slug: string
}): Metadata {
  const url = `${SITE_URL}${slug}`
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: 'MockMate',
      images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [OG_IMAGE],
    },
  }
}
