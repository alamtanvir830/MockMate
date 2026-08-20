/**
 * Targeted SEO upgrade regression tests — August 2026.
 *
 * Covers the three pages updated for Google Search Console query clusters:
 *   - most-accurate-sat-practice-tests (accuracy + FAQ)
 *   - sat-math (Desmos signal in title/description/H1)
 *   - how-to-use-desmos-on-the-digital-sat (breadcrumbs, dateModified, content depth)
 *
 * Does NOT test pages outside this upgrade scope, and does NOT verify branded
 * variants (mockmates / mockmateai) — those are entity signals, not new pages.
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

// ── most-accurate-sat-practice-tests upgrades ─────────────────────────────────

describe('most-accurate page — SEO title upgrade', () => {
  it('metadata title contains "Most Accurate SAT Practice Tests"', () => {
    const content = readPage('resources/most-accurate-sat-practice-tests')
    expect(content).toContain('Most Accurate SAT Practice Tests')
  })

  it('metadata title contains "Digital SAT" for specificity', () => {
    const content = readPage('resources/most-accurate-sat-practice-tests')
    expect(content).toContain('Digital SAT')
  })

  it('H1 still contains "Which SAT Practice Test Is Most Accurate?" (H1 unchanged)', () => {
    const content = readPage('resources/most-accurate-sat-practice-tests')
    expect(content).toContain('Which SAT Practice Test Is Most Accurate?')
  })
})

describe('most-accurate page — description upgrade', () => {
  it('description mentions "accurate" and "Bluebook"', () => {
    const content = readPage('resources/most-accurate-sat-practice-tests')
    expect(content.toLowerCase()).toContain('accurate')
    expect(content).toContain('Bluebook')
  })

  it('description mentions adaptive practice and timing', () => {
    const content = readPage('resources/most-accurate-sat-practice-tests')
    expect(content.toLowerCase()).toContain('adaptive')
    expect(content.toLowerCase()).toContain('timing')
  })
})

describe('most-accurate page — breadcrumb schema', () => {
  it('uses breadcrumbs in buildArticleJsonLd', () => {
    const content = readPage('resources/most-accurate-sat-practice-tests')
    expect(content).toContain('breadcrumbs')
  })

  it('breadcrumbs include /resources href', () => {
    const content = readPage('resources/most-accurate-sat-practice-tests')
    expect(content).toContain("href: '/resources'")
  })
})

describe('most-accurate page — visual breadcrumb nav', () => {
  it('has breadcrumb nav linking back to /resources', () => {
    const content = readPage('resources/most-accurate-sat-practice-tests')
    expect(content).toContain('href="/resources"')
  })

  it('has breadcrumb nav linking back to /', () => {
    const content = readPage('resources/most-accurate-sat-practice-tests')
    expect(content).toContain('href="/"')
  })
})

describe('most-accurate page — FAQ section', () => {
  it('has a Frequently asked questions section', () => {
    const content = readPage('resources/most-accurate-sat-practice-tests')
    expect(content.toLowerCase()).toContain('frequently asked questions')
  })

  it('FAQ answers the "Is Bluebook the most accurate" question', () => {
    const content = readPage('resources/most-accurate-sat-practice-tests')
    expect(content).toContain('Bluebook the most accurate')
  })

  it('FAQ answers the "Are third-party SAT practice tests accurate" question', () => {
    const content = readPage('resources/most-accurate-sat-practice-tests')
    expect(content).toContain('third-party SAT practice tests accurate')
  })

  it('FAQ answers the "predict my real score" question', () => {
    const content = readPage('resources/most-accurate-sat-practice-tests')
    expect(content).toContain('predict my real score')
  })
})

describe('most-accurate page — expanded internal links', () => {
  it('links to /resources/sat-math', () => {
    const content = readPage('resources/most-accurate-sat-practice-tests')
    expect(content).toContain('/resources/sat-math')
  })

  it('links to /resources/sat-reading-writing', () => {
    const content = readPage('resources/most-accurate-sat-practice-tests')
    expect(content).toContain('/resources/sat-reading-writing')
  })

  it('links to /sat-reading-writing-academy', () => {
    const content = readPage('resources/most-accurate-sat-practice-tests')
    expect(content).toContain('/sat-reading-writing-academy')
  })

  it('links to /sat-math-desmos-academy', () => {
    const content = readPage('resources/most-accurate-sat-practice-tests')
    expect(content).toContain('/sat-math-desmos-academy')
  })
})

describe('most-accurate page — dateModified updated', () => {
  it('dateModified is 2026-08-19 (SEO upgrade date)', () => {
    const content = readPage('resources/most-accurate-sat-practice-tests')
    expect(content).toContain('2026-08-19')
  })
})

describe('most-accurate page — no false accuracy claims', () => {
  it('does NOT claim MockMate is "the most accurate" SAT practice test', () => {
    const content = readPage('resources/most-accurate-sat-practice-tests')
    const lc = content.toLowerCase()
    // Should not claim MockMate/third-party is "most accurate"
    expect(lc).not.toContain('mockmate is the most accurate')
    expect(lc).not.toContain('most accurate sat practice test available')
  })

  it('positions Bluebook as the most accurate source', () => {
    const content = readPage('resources/most-accurate-sat-practice-tests')
    expect(content).toContain('Bluebook')
    expect(content.toLowerCase()).toContain('official')
  })
})

// ── sat-math hub upgrades ─────────────────────────────────────────────────────

describe('sat-math page — title includes Desmos signal', () => {
  it('metadata title contains "Desmos"', () => {
    const content = readPage('resources/sat-math')
    expect(content).toContain('Desmos')
  })

  it('metadata title contains "Digital SAT Math"', () => {
    const content = readPage('resources/sat-math')
    expect(content).toContain('Digital SAT Math')
  })

  it('metadata title does NOT use old "Skills, Strategies & Practice" phrasing', () => {
    const content = readPage('resources/sat-math')
    expect(content).not.toContain('Skills, Strategies & Practice | MockMate')
  })
})

describe('sat-math page — H1 upgraded', () => {
  it('H1 contains "Digital SAT Math"', () => {
    const content = readPage('resources/sat-math')
    expect(content).toContain('Digital SAT Math')
  })

  it('H1 contains "Desmos"', () => {
    const content = readPage('resources/sat-math')
    // H1 includes Desmos to match the updated title
    expect(content).toContain('Desmos')
  })

  it('H1 is NOT just "SAT Math" (two words only)', () => {
    const content = readPage('resources/sat-math')
    expect(content).not.toContain('>\\n        SAT Math\\n      <')
  })
})

describe('sat-math page — description mentions Desmos', () => {
  it('description includes "Desmos"', () => {
    const content = readPage('resources/sat-math')
    // Check description constant or inline text
    expect(content).toContain('Desmos')
  })
})

describe('sat-math page — CollectionPage schema preserved', () => {
  it('still uses CollectionPage JSON-LD (not buildArticleJsonLd)', () => {
    const content = readPage('resources/sat-math')
    expect(content).toContain('CollectionPage')
    expect(content).not.toContain('buildArticleJsonLd')
  })
})

// ── how-to-use-desmos upgrades ────────────────────────────────────────────────

describe('desmos page — breadcrumb schema added', () => {
  it('uses breadcrumbs in buildArticleJsonLd', () => {
    const content = readPage('resources/how-to-use-desmos-on-the-digital-sat')
    expect(content).toContain('breadcrumbs')
  })

  it('breadcrumbs include /resources/sat-math as intermediate breadcrumb', () => {
    const content = readPage('resources/how-to-use-desmos-on-the-digital-sat')
    expect(content).toContain('/resources/sat-math')
  })
})

describe('desmos page — visual breadcrumb nav', () => {
  it('has visual breadcrumb linking to /resources', () => {
    const content = readPage('resources/how-to-use-desmos-on-the-digital-sat')
    expect(content).toContain('href="/resources"')
  })

  it('has visual breadcrumb linking to /resources/sat-math', () => {
    const content = readPage('resources/how-to-use-desmos-on-the-digital-sat')
    expect(content).toContain('href="/resources/sat-math"')
  })
})

describe('desmos page — dateModified added', () => {
  it('has dateModified field', () => {
    const content = readPage('resources/how-to-use-desmos-on-the-digital-sat')
    expect(content).toContain('dateModified')
  })

  it('dateModified is 2026-08-19', () => {
    const content = readPage('resources/how-to-use-desmos-on-the-digital-sat')
    expect(content).toContain('2026-08-19')
  })
})

describe('desmos page — ArticleByline has published date', () => {
  it('ArticleByline includes published prop', () => {
    const content = readPage('resources/how-to-use-desmos-on-the-digital-sat')
    expect(content).toContain('published=')
  })
})

describe('desmos page — content depth (sliders section added)', () => {
  it('mentions sliders as a Desmos technique', () => {
    const content = readPage('resources/how-to-use-desmos-on-the-digital-sat')
    expect(content.toLowerCase()).toContain('slider')
  })
})

describe('desmos page — expanded internal links', () => {
  it('links to /resources/sat-math hub', () => {
    const content = readPage('resources/how-to-use-desmos-on-the-digital-sat')
    expect(content).toContain('/resources/sat-math')
  })

  it('links to /sat-question-bank', () => {
    const content = readPage('resources/how-to-use-desmos-on-the-digital-sat')
    expect(content).toContain('/sat-question-bank')
  })

  it('still links to /sat-math-desmos-academy (no regression)', () => {
    const content = readPage('resources/how-to-use-desmos-on-the-digital-sat')
    expect(content).toContain('/sat-math-desmos-academy')
  })
})

// ── Sitemap date ──────────────────────────────────────────────────────────────

describe('Sitemap SEO_UPDATE_DATE reflects August 2026 upgrade', () => {
  it('SEO_UPDATE_DATE is 2026-08-19', () => {
    const sitemap = readFile('app/sitemap.ts')
    expect(sitemap).toContain('2026-08-19T00:00:00Z')
  })

  it('SEO_UPDATE_DATE is NOT the old 2026-08-14 date', () => {
    const sitemap = readFile('app/sitemap.ts')
    expect(sitemap).not.toContain("'2026-08-14T00:00:00Z'")
  })
})

// ── No branded doorway pages created ─────────────────────────────────────────

describe('No branded doorway pages created for mockmates / mockmateai', () => {
  it('no /mockmates route exists', () => {
    expect(() => readPage('mockmates')).toThrow()
  })

  it('no /mockmateai route exists', () => {
    expect(() => readPage('mockmateai')).toThrow()
  })
})

// ── No duplicate pages for same intent ───────────────────────────────────────

describe('No duplicate pages for same search intent', () => {
  it('no separate /sat/desmos page created (desmos content lives on existing pages)', () => {
    expect(() => readPage('sat/desmos')).toThrow()
  })

  it('no duplicate /resources/desmos-sat page created', () => {
    expect(() => readPage('resources/desmos-sat')).toThrow()
  })
})
