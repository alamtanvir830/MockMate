/**
 * SAT Question Bank routing, product scoping, and premium copy tests.
 *
 * Validates:
 * - SAT sidebar links directly to /question-bank/sat
 * - Workspace detection still treats QB paths as SAT
 * - isNavItemActive handles /question-bank/sat correctly
 * - MCAT QB remains intact in MCAT nav
 * - Premium features copy no longer advertises Forms 1–5, 700+, or 580+
 * - Premium copy now advertises 10 full-length exams and 1,000+ questions
 * - Form 6 free-access window constants remain unchanged
 */

import { describe, it, expect } from 'vitest'
import {
  getDefinitiveWorkspace,
  isNavItemActive,
  SAT_NAV_HREFS,
  MCAT_NAV_HREFS,
  CLASSROOM_NAV_HREFS,
} from '@/lib/workspace/workspace'
import { SAT_PREMIUM_FEATURES } from '@/lib/sat-premium-features'
import { SAT_PREMIUM_CARD_FEATURES } from '@/lib/pricing'
import { FORM6_WINDOW_STARTS_AT, FORM6_WINDOW_ENDS_AT } from '@/lib/premade-exams/sat/form6-access'

// ── Part 1: SAT sidebar routing ───────────────────────────────────────────────

describe('SAT sidebar — Question Bank href', () => {
  it('test 1: SAT_NAV_HREFS contains /question-bank/sat, not /question-bank', () => {
    expect(SAT_NAV_HREFS).toContain('/question-bank/sat')
    expect(SAT_NAV_HREFS).not.toContain('/question-bank')
  })

  it('test 2: MCAT_NAV_HREFS still links to /question-bank/mcat directly', () => {
    expect(MCAT_NAV_HREFS).toContain('/question-bank/mcat')
    expect(MCAT_NAV_HREFS).not.toContain('/question-bank/sat')
    expect(MCAT_NAV_HREFS).not.toContain('/question-bank')
  })

  it('test 3: CLASSROOM_NAV_HREFS contains no question bank link', () => {
    expect(CLASSROOM_NAV_HREFS).not.toContain('/question-bank')
    expect(CLASSROOM_NAV_HREFS).not.toContain('/question-bank/sat')
    expect(CLASSROOM_NAV_HREFS).not.toContain('/question-bank/mcat')
  })
})

// ── Part 2: Workspace detection for QB paths ──────────────────────────────────

describe('getDefinitiveWorkspace — Question Bank paths resolve to correct workspace', () => {
  it('test 4: /question-bank/sat → sat', () => {
    expect(getDefinitiveWorkspace('/question-bank/sat')).toBe('sat')
  })

  it('test 5: /question-bank/sat/personalized/abc → sat', () => {
    expect(getDefinitiveWorkspace('/question-bank/sat/personalized/abc')).toBe('sat')
  })

  it('test 6: /question-bank/sat/results → sat', () => {
    expect(getDefinitiveWorkspace('/question-bank/sat/results')).toBe('sat')
  })

  it('test 7: /question-bank → still sat (backward compat)', () => {
    expect(getDefinitiveWorkspace('/question-bank')).toBe('sat')
  })

  it('test 8: /question-bank/mcat → mcat', () => {
    expect(getDefinitiveWorkspace('/question-bank/mcat')).toBe('mcat')
  })

  it('test 9: /question-bank/history → null (shared route)', () => {
    expect(getDefinitiveWorkspace('/question-bank/history')).toBeNull()
  })
})

// ── Part 3: isNavItemActive for /question-bank/sat ───────────────────────────

describe('isNavItemActive — /question-bank/sat nav item', () => {
  it('test 10: active when on /question-bank/sat itself', () => {
    expect(isNavItemActive('/question-bank/sat', '/question-bank/sat')).toBe(true)
  })

  it('test 11: active when on personalized path', () => {
    expect(isNavItemActive('/question-bank/sat', '/question-bank/sat/personalized/abc123')).toBe(true)
  })

  it('test 12: active when on /question-bank/sat/results', () => {
    expect(isNavItemActive('/question-bank/sat', '/question-bank/sat/results')).toBe(true)
  })

  it('test 13: active when on /question-bank (hub redirect source)', () => {
    expect(isNavItemActive('/question-bank/sat', '/question-bank')).toBe(true)
  })

  it('test 14: NOT active when on /question-bank/mcat', () => {
    expect(isNavItemActive('/question-bank/sat', '/question-bank/mcat')).toBe(false)
  })

  it('test 15: NOT active when on /question-bank/history (shared route)', () => {
    expect(isNavItemActive('/question-bank/sat', '/question-bank/history')).toBe(false)
  })

  it('test 16: NOT active when on /dashboard', () => {
    expect(isNavItemActive('/question-bank/sat', '/dashboard')).toBe(false)
  })
})

describe('isNavItemActive — /question-bank/mcat nav item (MCAT regression)', () => {
  it('test 17: active when on /question-bank/mcat', () => {
    expect(isNavItemActive('/question-bank/mcat', '/question-bank/mcat')).toBe(true)
  })

  it('test 18: active when on MCAT sub-route', () => {
    expect(isNavItemActive('/question-bank/mcat', '/question-bank/mcat/results')).toBe(true)
  })

  it('test 19: NOT active when on /question-bank/sat', () => {
    expect(isNavItemActive('/question-bank/mcat', '/question-bank/sat')).toBe(false)
  })
})

// ── Part 4: SAT Premium features copy — no stale counts ──────────────────────

describe('SAT_PREMIUM_FEATURES — no stale copy', () => {
  const allTitles = SAT_PREMIUM_FEATURES.map(f => f.title)
  const allDescriptions = SAT_PREMIUM_FEATURES.map(f => f.description)
  const allText = [...allTitles, ...allDescriptions].join(' ')

  it('test 20: does not contain "Forms 1–5" or "Forms 1-5"', () => {
    expect(allText).not.toMatch(/Forms 1[–-]5/)
  })

  it('test 21: does not contain "5 full-length" or "five full-length"', () => {
    expect(allText.toLowerCase()).not.toMatch(/\bfive full-length\b/)
    expect(allText).not.toMatch(/\b5 full-length\b/)
  })

  it('test 22: does not contain "700+" as a question count', () => {
    expect(allText).not.toContain('700+')
  })

  it('test 23: does not contain "580+"', () => {
    expect(allText).not.toContain('580+')
  })

  it('test 24: advertises 10 full-length exams', () => {
    expect(allText).toMatch(/10 Full-Length SAT Practice Exams/i)
  })

  it('test 25: advertises 1,000+ question bank questions', () => {
    expect(allText).toMatch(/1,000\+/)
  })
})

describe('SAT_PREMIUM_CARD_FEATURES (pricing.ts) — no stale copy', () => {
  const allText = SAT_PREMIUM_CARD_FEATURES.join(' ')

  it('test 26: does not contain "Forms 1–5"', () => {
    expect(allText).not.toMatch(/Forms 1[–-]5/)
  })

  it('test 27: does not contain "700+"', () => {
    expect(allText).not.toContain('700+')
  })

  it('test 28: advertises 10 full-length exams', () => {
    expect(allText).toMatch(/10 Full-Length SAT Practice Exams/i)
  })

  it('test 29: advertises 1,000+ question bank questions', () => {
    expect(allText).toMatch(/1,000\+/)
  })
})

// ── Part 5: MCAT QB regression ───────────────────────────────────────────────

describe('MCAT QB regression — MCAT nav intact', () => {
  it('test 30: MCAT nav has /question-bank/mcat link', () => {
    expect(MCAT_NAV_HREFS).toContain('/question-bank/mcat')
  })

  it('test 31: MCAT nav does not link to SAT QB', () => {
    expect(MCAT_NAV_HREFS).not.toContain('/question-bank/sat')
  })

  it('test 32: MCAT workspace resolved from /question-bank/mcat', () => {
    expect(getDefinitiveWorkspace('/question-bank/mcat')).toBe('mcat')
  })

  it('test 33: MCAT question bank sub-routes still resolve to mcat', () => {
    expect(getDefinitiveWorkspace('/question-bank/mcat/results')).toBe('mcat')
  })
})

// ── Part 6: Form 6 regression — promotion unchanged ──────────────────────────

describe('Form 6 free access — constants unchanged', () => {
  it('test 34: Form 6 window start date is 2026-08-12', () => {
    expect(FORM6_WINDOW_STARTS_AT).toBe('2026-08-12T00:00:00Z')
  })

  it('test 35: Form 6 window end date is 2026-08-15', () => {
    expect(FORM6_WINDOW_ENDS_AT).toBe('2026-08-15T00:00:00Z')
  })

  it('test 36: Form 6 window is 72 hours', () => {
    const durationMs = new Date(FORM6_WINDOW_ENDS_AT).getTime() - new Date(FORM6_WINDOW_STARTS_AT).getTime()
    expect(durationMs).toBe(72 * 60 * 60 * 1000)
  })
})

// ── Part 7: Product scoping — SAT QB active state covers SAT sub-routes ──────

describe('SAT product scoping — no MCAT QB active in SAT context', () => {
  it('test 37: /question-bank/mcat not matched by SAT /question-bank/sat nav item', () => {
    expect(isNavItemActive('/question-bank/sat', '/question-bank/mcat')).toBe(false)
  })

  it('test 38: /question-bank/mcat/results not matched by SAT /question-bank/sat nav item', () => {
    expect(isNavItemActive('/question-bank/sat', '/question-bank/mcat/results')).toBe(false)
  })

  it('test 39: /question-bank/sat not matched by MCAT /question-bank/mcat nav item', () => {
    expect(isNavItemActive('/question-bank/mcat', '/question-bank/sat')).toBe(false)
  })
})
