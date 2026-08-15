import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/dashboard/',
          '/exams/',
          '/premade/',
          '/question-bank/',
          '/sat-rw-academy/',
          '/sat-math-academy/',
          '/admin/',
          '/billing/',
          '/notes/',
          '/performance/',
          '/groups/',
          '/study-round/',
          '/reading-speed/',
          '/settings/',
          '/join/',
          '/api/',
          '/auth/',
        ],
      },
    ],
    sitemap: 'https://www.mockmateapp.com/sitemap.xml',
  }
}
