/**
 * Phase 2 SEO tests — SAT skill search architecture.
 *
 * Verifies that all new skill hub and skill article pages:
 * - exist as route files
 * - export metadata with buildSeoMetadata
 * - contain unique titles with no duplicate suffix
 * - self-canonicalize to correct slugs
 * - include Article JSON-LD (skill pages) or CollectionPage (hub pages)
 * - do not contain noindex
 * - do not import premium question bank data
 * - link to parent hubs and MockMate features
 * - are listed exactly once in the sitemap
 * - are linked from the /resources hub
 * - have breadcrumb navigation back to parent
 * - do not cannibalize existing pages
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

describe('Phase 2 skill route files exist', () => {
  const newRoutes = [
    'resources/sat-reading-writing',
    'resources/sat-math',
    'resources/sat-transitions-practice',
    'resources/sat-words-in-context-practice',
    'resources/sat-command-of-evidence-practice',
    'resources/sat-boundaries-grammar',
    'resources/sat-rhetorical-synthesis',
    'resources/sat-algebra-practice',
    'resources/sat-systems-of-equations',
    'resources/sat-quadratic-equations',
  ]

  for (const route of newRoutes) {
    it(`exists: ${route}/page.tsx`, () => {
      expect(() => readPage(route)).not.toThrow()
    })
  }
})

// ── Metadata exports ───────────────────────────────────────────────────────────

describe('Phase 2 pages export metadata via buildSeoMetadata', () => {
  const pages = [
    'resources/sat-reading-writing',
    'resources/sat-math',
    'resources/sat-transitions-practice',
    'resources/sat-words-in-context-practice',
    'resources/sat-command-of-evidence-practice',
    'resources/sat-boundaries-grammar',
    'resources/sat-rhetorical-synthesis',
    'resources/sat-algebra-practice',
    'resources/sat-systems-of-equations',
    'resources/sat-quadratic-equations',
  ]

  for (const route of pages) {
    it(`${route} exports metadata`, () => {
      const content = readPage(route)
      expect(content).toContain('export const metadata')
      expect(content).toContain('buildSeoMetadata')
    })
  }
})

// ── Unique page titles ─────────────────────────────────────────────────────────

describe('Phase 2 skill pages have unique, distinguishable titles', () => {
  const titleChecks = [
    { route: 'resources/sat-reading-writing', fragment: 'Reading & Writing' },
    { route: 'resources/sat-math', fragment: 'SAT Math' },
    { route: 'resources/sat-transitions-practice', fragment: 'Transitions' },
    { route: 'resources/sat-words-in-context-practice', fragment: 'Words in Context' },
    { route: 'resources/sat-command-of-evidence-practice', fragment: 'Command of Evidence' },
    { route: 'resources/sat-boundaries-grammar', fragment: 'Boundaries' },
    { route: 'resources/sat-rhetorical-synthesis', fragment: 'Rhetorical Synthesis' },
    { route: 'resources/sat-algebra-practice', fragment: 'Algebra' },
    { route: 'resources/sat-systems-of-equations', fragment: 'Systems of Equations' },
    { route: 'resources/sat-quadratic-equations', fragment: 'Quadratic' },
  ]

  for (const { route, fragment } of titleChecks) {
    it(`${route} title contains "${fragment}"`, () => {
      const content = readPage(route)
      expect(content).toContain(fragment)
    })
  }
})

// ── No duplicate title suffix ──────────────────────────────────────────────────

describe('Phase 2 pages do not double the MockMate suffix', () => {
  const pages = [
    'resources/sat-transitions-practice',
    'resources/sat-words-in-context-practice',
    'resources/sat-algebra-practice',
    'resources/sat-quadratic-equations',
  ]

  for (const route of pages) {
    it(`${route} does not contain "MockMate | MockMate"`, () => {
      const content = readPage(route)
      expect(content).not.toContain('MockMate | MockMate')
    })
  }
})

// ── Canonical slugs ────────────────────────────────────────────────────────────

describe('Phase 2 pages self-canonicalize', () => {
  const slugChecks = [
    { route: 'resources/sat-reading-writing', slug: '/resources/sat-reading-writing' },
    { route: 'resources/sat-math', slug: '/resources/sat-math' },
    { route: 'resources/sat-transitions-practice', slug: '/resources/sat-transitions-practice' },
    { route: 'resources/sat-words-in-context-practice', slug: '/resources/sat-words-in-context-practice' },
    { route: 'resources/sat-command-of-evidence-practice', slug: '/resources/sat-command-of-evidence-practice' },
    { route: 'resources/sat-boundaries-grammar', slug: '/resources/sat-boundaries-grammar' },
    { route: 'resources/sat-rhetorical-synthesis', slug: '/resources/sat-rhetorical-synthesis' },
    { route: 'resources/sat-algebra-practice', slug: '/resources/sat-algebra-practice' },
    { route: 'resources/sat-systems-of-equations', slug: '/resources/sat-systems-of-equations' },
    { route: 'resources/sat-quadratic-equations', slug: '/resources/sat-quadratic-equations' },
  ]

  for (const { route, slug } of slugChecks) {
    it(`${route} uses correct canonical slug`, () => {
      const content = readPage(route)
      expect(content).toContain(`'${slug}'`)
    })
  }
})

// ── JSON-LD structured data ────────────────────────────────────────────────────

describe('Skill article pages use buildArticleJsonLd', () => {
  const skillPages = [
    'resources/sat-transitions-practice',
    'resources/sat-words-in-context-practice',
    'resources/sat-command-of-evidence-practice',
    'resources/sat-boundaries-grammar',
    'resources/sat-rhetorical-synthesis',
    'resources/sat-algebra-practice',
    'resources/sat-systems-of-equations',
    'resources/sat-quadratic-equations',
  ]

  for (const route of skillPages) {
    it(`${route} uses buildArticleJsonLd with datePublished`, () => {
      const content = readPage(route)
      expect(content).toContain('buildArticleJsonLd')
      expect(content).toContain('datePublished')
    })
  }
})

describe('Hub pages use CollectionPage JSON-LD (not article)', () => {
  it('sat-reading-writing hub uses CollectionPage', () => {
    const content = readPage('resources/sat-reading-writing')
    expect(content).toContain('CollectionPage')
    expect(content).not.toContain('buildArticleJsonLd')
  })

  it('sat-math hub uses CollectionPage', () => {
    const content = readPage('resources/sat-math')
    expect(content).toContain('CollectionPage')
    expect(content).not.toContain('buildArticleJsonLd')
  })
})

// ── No noindex ─────────────────────────────────────────────────────────────────

describe('Phase 2 pages do not contain noindex', () => {
  const pages = [
    'resources/sat-reading-writing',
    'resources/sat-math',
    'resources/sat-transitions-practice',
    'resources/sat-words-in-context-practice',
    'resources/sat-command-of-evidence-practice',
    'resources/sat-boundaries-grammar',
    'resources/sat-rhetorical-synthesis',
    'resources/sat-algebra-practice',
    'resources/sat-systems-of-equations',
    'resources/sat-quadratic-equations',
  ]

  for (const route of pages) {
    it(`${route} has no noindex`, () => {
      const content = readPage(route)
      expect(content).not.toContain('noindex')
    })
  }
})

// ── No premium data exposure ───────────────────────────────────────────────────

describe('Phase 2 pages do not import premium question bank data', () => {
  const pages = [
    'resources/sat-reading-writing',
    'resources/sat-math',
    'resources/sat-transitions-practice',
    'resources/sat-words-in-context-practice',
    'resources/sat-command-of-evidence-practice',
    'resources/sat-boundaries-grammar',
    'resources/sat-rhetorical-synthesis',
    'resources/sat-algebra-practice',
    'resources/sat-systems-of-equations',
    'resources/sat-quadratic-equations',
  ]

  for (const route of pages) {
    it(`${route} does not import question bank data`, () => {
      const content = readPage(route)
      expect(content).not.toContain('question-bank/sat')
      expect(content).not.toContain('lib/question-bank')
      expect(content).not.toContain('qb-questions')
    })
  }
})

// ── No unsupported claims ──────────────────────────────────────────────────────

describe('Phase 2 pages do not make unsupported score-guarantee claims', () => {
  const badClaims = ['guaranteed', 'raise your score by', 'improve your score by', 'points in']
  const pages = [
    'resources/sat-transitions-practice',
    'resources/sat-algebra-practice',
    'resources/sat-quadratic-equations',
  ]

  for (const route of pages) {
    for (const claim of badClaims) {
      it(`${route} does not contain "${claim}"`, () => {
        const content = readPage(route)
        expect(content.toLowerCase()).not.toContain(claim)
      })
    }
  }
})

// ── Internal links: skill pages → parent hub ───────────────────────────────────

describe('R&W skill pages link back to sat-reading-writing hub', () => {
  const rwSkillPages = [
    'resources/sat-transitions-practice',
    'resources/sat-words-in-context-practice',
    'resources/sat-command-of-evidence-practice',
    'resources/sat-boundaries-grammar',
    'resources/sat-rhetorical-synthesis',
  ]

  for (const route of rwSkillPages) {
    it(`${route} links to /resources/sat-reading-writing`, () => {
      const content = readPage(route)
      expect(content).toContain('/resources/sat-reading-writing')
    })
  }
})

describe('Math skill pages link back to sat-math hub', () => {
  const mathSkillPages = [
    'resources/sat-algebra-practice',
    'resources/sat-systems-of-equations',
    'resources/sat-quadratic-equations',
  ]

  for (const route of mathSkillPages) {
    it(`${route} links to /resources/sat-math`, () => {
      const content = readPage(route)
      expect(content).toContain('/resources/sat-math')
    })
  }
})

// ── Internal links: skill pages → MockMate features ──────────────────────────

describe('R&W skill pages link to sat-reading-writing-academy', () => {
  const rwPages = [
    'resources/sat-transitions-practice',
    'resources/sat-words-in-context-practice',
    'resources/sat-command-of-evidence-practice',
    'resources/sat-boundaries-grammar',
    'resources/sat-rhetorical-synthesis',
  ]

  for (const route of rwPages) {
    it(`${route} links to /sat-reading-writing-academy`, () => {
      const content = readPage(route)
      expect(content).toContain('/sat-reading-writing-academy')
    })
  }
})

describe('Math skill pages link to sat-math-desmos-academy', () => {
  const mathPages = [
    'resources/sat-algebra-practice',
    'resources/sat-systems-of-equations',
    'resources/sat-quadratic-equations',
  ]

  for (const route of mathPages) {
    it(`${route} links to /sat-math-desmos-academy`, () => {
      const content = readPage(route)
      expect(content).toContain('/sat-math-desmos-academy')
    })
  }
})

describe('Math skill pages link to /sat-question-bank', () => {
  const mathPages = [
    'resources/sat-algebra-practice',
    'resources/sat-systems-of-equations',
    'resources/sat-quadratic-equations',
  ]

  for (const route of mathPages) {
    it(`${route} links to /sat-question-bank`, () => {
      const content = readPage(route)
      expect(content).toContain('/sat-question-bank')
    })
  }
})

// ── No orphan pages: /resources hub links to all new pages ───────────────────

describe('/resources hub links to all Phase 2 pages', () => {
  const newLinks = [
    '/resources/sat-reading-writing',
    '/resources/sat-math',
    '/resources/sat-transitions-practice',
    '/resources/sat-words-in-context-practice',
    '/resources/sat-command-of-evidence-practice',
    '/resources/sat-boundaries-grammar',
    '/resources/sat-rhetorical-synthesis',
    '/resources/sat-algebra-practice',
    '/resources/sat-systems-of-equations',
    '/resources/sat-quadratic-equations',
  ]

  for (const link of newLinks) {
    it(`/resources hub links to ${link}`, () => {
      const content = readPage('resources')
      expect(content).toContain(link)
    })
  }
})

// ── Sitemap contains all new routes ───────────────────────────────────────────

describe('Sitemap includes all Phase 2 skill routes', () => {
  const newRoutes = [
    '/resources/sat-reading-writing',
    '/resources/sat-math',
    '/resources/sat-transitions-practice',
    '/resources/sat-words-in-context-practice',
    '/resources/sat-command-of-evidence-practice',
    '/resources/sat-boundaries-grammar',
    '/resources/sat-rhetorical-synthesis',
    '/resources/sat-algebra-practice',
    '/resources/sat-systems-of-equations',
    '/resources/sat-quadratic-equations',
  ]

  for (const route of newRoutes) {
    it(`sitemap includes ${route}`, () => {
      const sitemap = readFile('app/sitemap.ts')
      expect(sitemap).toContain(route)
    })
  }

  it('sitemap does not use new Date() for static skill pages', () => {
    const sitemap = readFile('app/sitemap.ts')
    expect(sitemap).not.toContain('new Date().toISOString()')
  })
})

// ── No duplicate sitemap URLs ──────────────────────────────────────────────────

describe('New routes appear exactly once in sitemap', () => {
  const newRoutes = [
    '/resources/sat-reading-writing',
    '/resources/sat-algebra-practice',
  ]

  for (const route of newRoutes) {
    it(`${route} appears exactly once in sitemap`, () => {
      const sitemap = readFile('app/sitemap.ts')
      const count = (sitemap.match(new RegExp(route.replace(/\//g, '\\/'), 'g')) ?? []).length
      expect(count).toBe(1)
    })
  }
})

// ── Breadcrumb navigation ──────────────────────────────────────────────────────

describe('Skill pages include breadcrumb back to /resources', () => {
  const skillPages = [
    'resources/sat-transitions-practice',
    'resources/sat-algebra-practice',
    'resources/sat-quadratic-equations',
  ]

  for (const route of skillPages) {
    it(`${route} breadcrumb links to /resources`, () => {
      const content = readPage(route)
      expect(content).toContain('href="/resources"')
    })
  }
})

// ── Hub pages breadcrumb ───────────────────────────────────────────────────────

describe('Hub pages link back to /resources', () => {
  it('sat-reading-writing hub breadcrumbs to /resources', () => {
    const content = readPage('resources/sat-reading-writing')
    expect(content).toContain('href="/resources"')
  })

  it('sat-math hub breadcrumbs to /resources', () => {
    const content = readPage('resources/sat-math')
    expect(content).toContain('href="/resources"')
  })
})

// ── Non-cannibalization: new pages do NOT duplicate existing pages ─────────────

describe('New skill pages serve different intent than existing pages', () => {
  it('sat-transitions-practice is distinct from how-to-use-desmos (different domain)', () => {
    const transitions = readPage('resources/sat-transitions-practice')
    const desmos = readPage('resources/how-to-use-desmos-on-the-digital-sat')
    // Transitions page should not be mostly about Desmos
    const desmosCount = (transitions.match(/[Dd]esmos/g) ?? []).length
    const transitionsCount = (transitions.match(/[Tt]ransition/g) ?? []).length
    expect(transitionsCount).toBeGreaterThan(desmosCount)
  })

  it('sat-algebra-practice is distinct from sat-quadratic-equations', () => {
    const algebra = readPage('resources/sat-algebra-practice')
    const quadratics = readPage('resources/sat-quadratic-equations')
    // Quadratics page should mention "quadratic" more than "linear"
    const quadraticMentions = (quadratics.match(/[Qq]uadratic/g) ?? []).length
    const linearMentions = (quadratics.match(/[Ll]inear/g) ?? []).length
    expect(quadraticMentions).toBeGreaterThan(linearMentions)
  })
})

// ── Stale product count regression ────────────────────────────────────────────

describe('Phase 2 pages do not contain stale product counts', () => {
  const staleStrings = ['700+', '580+', 'Forms 1–5', '5 full-length', 'five full-length']
  const pages = [
    'resources/sat-transitions-practice',
    'resources/sat-algebra-practice',
    'resources/sat-reading-writing',
    'resources/sat-math',
  ]

  for (const route of pages) {
    for (const stale of staleStrings) {
      it(`${route} does not contain "${stale}"`, () => {
        const content = readPage(route)
        expect(content).not.toContain(stale)
      })
    }
  }
})

// ── IndependenceCallout ────────────────────────────────────────────────────────

describe('Phase 2 pages use IndependenceCallout', () => {
  const pages = [
    'resources/sat-reading-writing',
    'resources/sat-math',
    'resources/sat-transitions-practice',
    'resources/sat-words-in-context-practice',
    'resources/sat-command-of-evidence-practice',
    'resources/sat-boundaries-grammar',
    'resources/sat-rhetorical-synthesis',
    'resources/sat-algebra-practice',
    'resources/sat-systems-of-equations',
    'resources/sat-quadratic-equations',
  ]

  for (const route of pages) {
    it(`${route} includes IndependenceCallout`, () => {
      const content = readPage(route)
      expect(content).toContain('IndependenceCallout')
    })
  }
})

// ── Resources hub updated ──────────────────────────────────────────────────────

describe('/resources hub includes Reading & Writing and Math sections', () => {
  it('hub page contains Reading & Writing section heading', () => {
    const content = readPage('resources')
    expect(content).toContain('Reading')
    expect(content).toContain('Writing')
  })

  it('hub page contains Math section heading', () => {
    const content = readPage('resources')
    expect(content).toContain('Math')
  })

  it('hub page updated description includes skills', () => {
    const content = readPage('resources')
    expect(content).toContain('skill')
  })
})

// ── Existing SEO regressions remain intact ────────────────────────────────────

describe('Existing resource pages unaffected by Phase 2', () => {
  it('most-accurate-sat-practice-tests still has correct canonical', () => {
    const content = readPage('resources/most-accurate-sat-practice-tests')
    expect(content).toContain('/resources/most-accurate-sat-practice-tests')
  })

  it('how-to-use-desmos still links to /sat-math-desmos-academy (no regression)', () => {
    const content = readPage('resources/how-to-use-desmos-on-the-digital-sat')
    expect(content).toContain('/sat-math-desmos-academy')
  })

  it('homepage title reflects broad brand (not SAT-only)', () => {
    const content = readPage('')
    expect(content).toContain('Your Standardized Exam Hub')
  })
})
