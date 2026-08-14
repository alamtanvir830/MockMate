/**
 * Regression tests for the SAT resource hub and article routes.
 *
 * These tests validate metadata, internal links, sitemap entries, and
 * non-cannibalization of existing commercial SEO pages.
 */

import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { join } from 'path'

const ROOT = join(process.cwd())

function readPage(routePath: string): string {
  return readFileSync(join(ROOT, 'app/(marketing)', routePath, 'page.tsx'), 'utf8')
}

function readFile(filePath: string): string {
  return readFileSync(join(ROOT, filePath), 'utf8')
}

// ── Route existence ────────────────────────────────────────────────────────────

describe('Resource route files exist', () => {
  const routes = [
    'resources',
    'resources/most-accurate-sat-practice-tests',
    'resources/bluebook-sat-practice-tests',
    'resources/how-many-sat-practice-tests',
    'resources/how-to-review-an-sat-practice-test',
    'resources/why-harder-sat-practice-tests-can-lower-your-score',
    'resources/how-digital-sat-adaptive-modules-work',
    'resources/how-to-use-desmos-on-the-digital-sat',
    'resources/sat-study-plan-1100-to-1300',
    'resources/sat-study-plan-1300-to-1450',
  ]

  for (const route of routes) {
    it(`exists: /app/(marketing)/${route}/page.tsx`, () => {
      expect(() => readPage(route)).not.toThrow()
    })
  }
})

// ── Unique titles ──────────────────────────────────────────────────────────────

describe('Each resource page has a unique, non-empty title', () => {
  const pages = [
    { route: 'resources/most-accurate-sat-practice-tests', expectedTitle: 'Which SAT Practice Test Is Most Accurate?' },
    { route: 'resources/bluebook-sat-practice-tests', expectedTitle: 'Bluebook SAT Practice Tests' },
    { route: 'resources/how-many-sat-practice-tests', expectedTitle: 'How Many SAT Practice Tests Should You Take?' },
    { route: 'resources/how-to-review-an-sat-practice-test', expectedTitle: 'How to Review an SAT Practice Test' },
  ]

  for (const { route, expectedTitle } of pages) {
    it(`${route} contains expected title fragment`, () => {
      const content = readPage(route)
      expect(content).toContain(expectedTitle)
    })
  }
})

// ── Canonical slugs ────────────────────────────────────────────────────────────

describe('Each resource page self-canonicalizes to the correct slug', () => {
  const slugChecks = [
    { route: 'resources/most-accurate-sat-practice-tests', slug: '/resources/most-accurate-sat-practice-tests' },
    { route: 'resources/bluebook-sat-practice-tests', slug: '/resources/bluebook-sat-practice-tests' },
    { route: 'resources/how-many-sat-practice-tests', slug: '/resources/how-many-sat-practice-tests' },
  ]

  for (const { route, slug } of slugChecks) {
    it(`${route} uses correct canonical slug`, () => {
      const content = readPage(route)
      expect(content).toContain(`'${slug}'`)
    })
  }
})

// ── Metadata presence ──────────────────────────────────────────────────────────

describe('New resource pages export metadata', () => {
  const routes = [
    'resources/most-accurate-sat-practice-tests',
    'resources/bluebook-sat-practice-tests',
    'resources/how-many-sat-practice-tests',
  ]

  for (const route of routes) {
    it(`${route} exports metadata`, () => {
      const content = readPage(route)
      expect(content).toContain('export const metadata')
      expect(content).toContain('buildSeoMetadata')
    })
  }
})

// ── JSON-LD structured data ────────────────────────────────────────────────────

describe('New resource pages include Article JSON-LD', () => {
  const routes = [
    'resources/most-accurate-sat-practice-tests',
    'resources/bluebook-sat-practice-tests',
    'resources/how-many-sat-practice-tests',
  ]

  for (const route of routes) {
    it(`${route} uses buildArticleJsonLd`, () => {
      const content = readPage(route)
      expect(content).toContain('buildArticleJsonLd')
      expect(content).toContain('datePublished')
    })
  }

  it('article-jsonld utility sets MockMate Editorial Team author', () => {
    const util = readFile('components/seo/article-jsonld.ts')
    expect(util).toContain('MockMate Editorial Team')
  })
})

// ── No noindex ─────────────────────────────────────────────────────────────────

describe('Resource pages do not contain noindex', () => {
  const routes = [
    'resources',
    'resources/most-accurate-sat-practice-tests',
    'resources/bluebook-sat-practice-tests',
    'resources/how-many-sat-practice-tests',
  ]

  for (const route of routes) {
    it(`${route} has no noindex directive`, () => {
      const content = readPage(route)
      expect(content).not.toContain('noindex')
    })
  }
})

// ── No premium data exposure ───────────────────────────────────────────────────

describe('Resource pages do not reference premium question bank data', () => {
  const routes = [
    'resources/most-accurate-sat-practice-tests',
    'resources/bluebook-sat-practice-tests',
    'resources/how-many-sat-practice-tests',
  ]

  for (const route of routes) {
    it(`${route} does not import question bank data`, () => {
      const content = readPage(route)
      expect(content).not.toContain('question-bank/sat')
      expect(content).not.toContain('lib/question-bank')
      expect(content).not.toContain('qb-questions')
    })
  }
})

// ── Internal links resolve to existing public routes ──────────────────────────

describe('Resource pages link to verified public routes', () => {
  it('most-accurate page links to /sat-practice-test', () => {
    const content = readPage('resources/most-accurate-sat-practice-tests')
    expect(content).toContain('href="/sat-practice-test"')
  })

  it('most-accurate page links to /sat-question-bank', () => {
    const content = readPage('resources/most-accurate-sat-practice-tests')
    expect(content).toContain('href="/sat-question-bank"')
  })

  it('most-accurate page links to review article', () => {
    const content = readPage('resources/most-accurate-sat-practice-tests')
    expect(content).toContain('/resources/how-to-review-an-sat-practice-test')
  })

  it('bluebook page links to /sat-practice-test', () => {
    const content = readPage('resources/bluebook-sat-practice-tests')
    expect(content).toContain('href="/sat-practice-test"')
  })

  it('how-many page links to /sat-question-bank', () => {
    const content = readPage('resources/how-many-sat-practice-tests')
    expect(content).toContain('href="/sat-question-bank"')
  })

  it('how-many page links to review article', () => {
    const content = readPage('resources/how-many-sat-practice-tests')
    expect(content).toContain('/resources/how-to-review-an-sat-practice-test')
  })
})

// ── Hub page contains all articles ────────────────────────────────────────────

describe('/resources hub lists all articles', () => {
  const expectedLinks = [
    '/resources/most-accurate-sat-practice-tests',
    '/resources/bluebook-sat-practice-tests',
    '/resources/how-many-sat-practice-tests',
    '/resources/how-to-review-an-sat-practice-test',
    '/resources/why-harder-sat-practice-tests-can-lower-your-score',
    '/resources/how-digital-sat-adaptive-modules-work',
    '/resources/how-to-use-desmos-on-the-digital-sat',
    '/resources/sat-study-plan-1100-to-1300',
    '/resources/sat-study-plan-1300-to-1450',
  ]

  for (const link of expectedLinks) {
    it(`hub links to ${link}`, () => {
      const content = readPage('resources')
      expect(content).toContain(link)
    })
  }
})

// ── Sitemap includes new routes ────────────────────────────────────────────────

describe('Sitemap includes new resource routes', () => {
  const newRoutes = [
    '/resources/most-accurate-sat-practice-tests',
    '/resources/bluebook-sat-practice-tests',
    '/resources/how-many-sat-practice-tests',
  ]

  for (const route of newRoutes) {
    it(`sitemap.ts includes ${route}`, () => {
      const sitemap = readFile('app/sitemap.ts')
      expect(sitemap).toContain(route)
    })
  }

  it('sitemap does not use new Date() for static pages', () => {
    const sitemap = readFile('app/sitemap.ts')
    expect(sitemap).not.toContain('new Date().toISOString()')
  })
})

// ── Stale product count regression ────────────────────────────────────────────

describe('New resource pages do not contain stale product counts', () => {
  const staleStrings = ['700+', '580+', 'Forms 1–5', '5 full-length', 'five full-length']
  const routes = [
    'resources/most-accurate-sat-practice-tests',
    'resources/bluebook-sat-practice-tests',
    'resources/how-many-sat-practice-tests',
  ]

  for (const route of routes) {
    for (const stale of staleStrings) {
      it(`${route} does not contain "${stale}"`, () => {
        const content = readPage(route)
        expect(content).not.toContain(stale)
      })
    }
  }
})

// ── Independence callout present ──────────────────────────────────────────────

describe('Resource pages use IndependenceCallout', () => {
  const routes = [
    'resources/most-accurate-sat-practice-tests',
    'resources/bluebook-sat-practice-tests',
    'resources/how-many-sat-practice-tests',
  ]

  for (const route of routes) {
    it(`${route} includes IndependenceCallout`, () => {
      const content = readPage(route)
      expect(content).toContain('IndependenceCallout')
    })
  }
})

// ── Existing SEO regression ────────────────────────────────────────────────────

describe('Prior SEO metadata remains intact', () => {
  it('homepage title contains 10 Practice Tests + 1,000+', () => {
    const content = readPage('')
    expect(content).toContain('10 Practice Tests')
    expect(content).toContain('1,000+')
  })

  it('sat-practice-test title contains 10 Full-Length Digital SAT Exams', () => {
    const content = readPage('sat-practice-test')
    expect(content).toContain('10 Full-Length Digital SAT Exams')
  })

  it('sat-question-bank title contains Math & Reading/Writing', () => {
    const content = readPage('sat-question-bank')
    expect(content).toContain('Math & Reading/Writing Questions')
  })

  it('sat-practice-test description is singular (one free exam)', () => {
    const content = readPage('sat-practice-test')
    expect(content).toContain('Take a free full-length Digital SAT practice test')
    expect(content).not.toContain('Take free, full-length')
  })
})

// ── SAT practice test page links to new resources ─────────────────────────────

describe('/sat-practice-test links to new resource articles', () => {
  const expectedLinks = [
    '/resources/most-accurate-sat-practice-tests',
    '/resources/bluebook-sat-practice-tests',
    '/resources/how-many-sat-practice-tests',
    '/resources/how-to-review-an-sat-practice-test',
  ]

  for (const link of expectedLinks) {
    it(`sat-practice-test links to ${link}`, () => {
      const content = readPage('sat-practice-test')
      expect(content).toContain(link)
    })
  }
})

// ── No /sat/math-practice-test page created ───────────────────────────────────

describe('SAT math practice page was intentionally not created', () => {
  it('no /sat/math-practice-test route exists', () => {
    expect(() => readFile('app/(marketing)/sat/math-practice-test/page.tsx')).toThrow()
  })
})
