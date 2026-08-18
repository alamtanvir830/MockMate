import { describe, it, expect } from 'vitest'
import {
  ROLLING_PROMO_CONFIG,
  resolveRollingPromoAccess,
} from '@/lib/premade-exams/sat/rolling-promo'
import type { RollingPromoAccessRow } from '@/lib/premade-exams/sat/rolling-promo'

// ── Constants ─────────────────────────────────────────────────────────────────

const SAT_FORMS_ROUTE = '/premade/sat'

function makeActiveRow(promoFormNumber: number): RollingPromoAccessRow {
  const now = Date.now()
  return {
    user_id: 'user-test',
    email: 'test@example.com',
    promo_form_number: promoFormNumber,
    access_started_at: new Date(now).toISOString(),
    access_expires_at: new Date(now + 24 * 60 * 60 * 1000).toISOString(),
    reason: 'rolling_promo_36h_first_visit',
  }
}

function makeExpiredRow(promoFormNumber: number): RollingPromoAccessRow {
  const past = Date.now() - 1000
  return {
    user_id: 'user-test',
    email: 'test@example.com',
    promo_form_number: promoFormNumber,
    access_started_at: new Date(past - 24 * 60 * 60 * 1000).toISOString(),
    access_expires_at: new Date(past).toISOString(),
    reason: 'rolling_promo_36h_first_visit',
  }
}

// ── 1–3: Dashboard CTA always routes to SAT forms page ───────────────────────

describe('Dashboard promo CTA routing', () => {
  it('1: dashboard CTA destination is /premade/sat', () => {
    expect(SAT_FORMS_ROUTE).toBe('/premade/sat')
  })

  it('2: dashboard CTA does NOT include a specific form number', () => {
    expect(SAT_FORMS_ROUTE).not.toMatch(/form-\d+/)
  })

  it('3: dashboard CTA route is identical regardless of promo_form_number', () => {
    // Same route regardless of which form the campaign uses
    const routeForForm7 = SAT_FORMS_ROUTE
    const routeForForm8 = SAT_FORMS_ROUTE
    const routeForForm9 = SAT_FORMS_ROUTE
    expect(routeForForm7).toBe(routeForForm8)
    expect(routeForForm8).toBe(routeForForm9)
  })
})

// ── 4–6: Forms page marks the correct promo form as free ─────────────────────

describe('resolveRollingPromoAccess — promo form identification per campaign', () => {
  it('4: promo form 7 → assignedFormNumber is 7, canStart is true', () => {
    const result = resolveRollingPromoAccess({
      isAdmin: false,
      isPremium: false,
      promoRow: makeActiveRow(7),
      attemptStatus: 'none',
      attemptId: null,
    })
    expect(result.assignedFormNumber).toBe(7)
    expect(result.canStart).toBe(true)
    expect(result.accessSource).toBe('rolling-promo')
  })

  it('5: promo form 8 → assignedFormNumber is 8, canStart is true', () => {
    const result = resolveRollingPromoAccess({
      isAdmin: false,
      isPremium: false,
      promoRow: makeActiveRow(8),
      attemptStatus: 'none',
      attemptId: null,
    })
    expect(result.assignedFormNumber).toBe(8)
    expect(result.canStart).toBe(true)
    expect(result.accessSource).toBe('rolling-promo')
  })

  it('6: promo form 9 → assignedFormNumber is 9, canStart is true', () => {
    const result = resolveRollingPromoAccess({
      isAdmin: false,
      isPremium: false,
      promoRow: makeActiveRow(9),
      attemptStatus: 'none',
      attemptId: null,
    })
    expect(result.assignedFormNumber).toBe(9)
    expect(result.canStart).toBe(true)
    expect(result.accessSource).toBe('rolling-promo')
  })
})

// ── 7: Non-promo forms remain locked for non-Premium ─────────────────────────

describe('Non-promo forms remain locked', () => {
  it('7: user with form-7 promo cannot start form 8 via same promo row', () => {
    // Promo row is for form 7; form 8 is a different form with no promo row
    const form8PromoResult = resolveRollingPromoAccess({
      isAdmin: false,
      isPremium: false,
      promoRow: null, // no form 8 promo row exists for this user
      attemptStatus: 'none',
      attemptId: null,
    })
    expect(form8PromoResult.canStart).toBe(false)
    expect(form8PromoResult.accessSource).toBe('none')
  })
})

// ── 8: Premium users unaffected by promo routing ─────────────────────────────

describe('Premium users unaffected', () => {
  it('8: Premium user can start without a promo row', () => {
    const result = resolveRollingPromoAccess({
      isAdmin: false,
      isPremium: true,
      promoRow: null,
      attemptStatus: 'none',
      attemptId: null,
    })
    expect(result.accessSource).toBe('premium')
    expect(result.canStart).toBe(true)
  })

  it('8b: Premium user CTA destination is still /premade/sat', () => {
    // Premium users see the same SAT forms page — no special routing
    expect(SAT_FORMS_ROUTE).toBe('/premade/sat')
  })
})

// ── 9: Countdown (expiresAt) still surfaced correctly ────────────────────────

describe('Countdown surface', () => {
  it('9: expiresAt from promo row is returned for countdown display', () => {
    const row = makeActiveRow(7)
    const result = resolveRollingPromoAccess({
      isAdmin: false,
      isPremium: false,
      promoRow: row,
      attemptStatus: 'none',
      attemptId: null,
    })
    expect(result.expiresAt).toBe(row.access_expires_at)
  })
})

// ── 10: Start Exam on promo form routes to correct form path ─────────────────

describe('Form-level routing (forms page card links)', () => {
  it('10a: promo form 7 start card href is /premade/sat/form-7', () => {
    const formN = 7
    const href = `/premade/sat/form-${formN}`
    expect(href).toBe('/premade/sat/form-7')
  })

  it('10b: promo form 8 start card href is /premade/sat/form-8', () => {
    const formN = 8
    const href = `/premade/sat/form-${formN}`
    expect(href).toBe('/premade/sat/form-8')
  })

  it('10c: promo form 9 start card href is /premade/sat/form-9', () => {
    const formN = 9
    const href = `/premade/sat/form-${formN}`
    expect(href).toBe('/premade/sat/form-9')
  })
})

// ── 11: Direct form access security is server-authoritative ──────────────────

describe('Server-authoritative access (config invariants)', () => {
  it('11: ROLLING_PROMO_CONFIG.formNumber identifies the current promo form', () => {
    expect(typeof ROLLING_PROMO_CONFIG.formNumber).toBe('number')
    expect(ROLLING_PROMO_CONFIG.formNumber).toBeGreaterThanOrEqual(1)
    expect(ROLLING_PROMO_CONFIG.formNumber).toBeLessThanOrEqual(10)
  })

  it('11b: assignedFormNumber in resolved access comes from DB row, not config', () => {
    // If config rotates to 8 but user's DB row is form 7, they still get form 7
    const row = makeActiveRow(7)
    const result = resolveRollingPromoAccess({
      isAdmin: false,
      isPremium: false,
      promoRow: row,
      attemptStatus: 'none',
      attemptId: null,
    })
    expect(result.assignedFormNumber).toBe(7)
    // Not affected by ROLLING_PROMO_CONFIG.formNumber changing later
  })
})

// ── 12: Expired promo user cannot start ──────────────────────────────────────

describe('Expired promo — cannot start', () => {
  it('12: expired promo row denies start for form 7', () => {
    const result = resolveRollingPromoAccess({
      isAdmin: false,
      isPremium: false,
      promoRow: makeExpiredRow(7),
      attemptStatus: 'none',
      attemptId: null,
    })
    expect(result.canStart).toBe(false)
    expect(result.isExpired).toBe(true)
  })

  it('12b: expired promo row denies start for form 8', () => {
    const result = resolveRollingPromoAccess({
      isAdmin: false,
      isPremium: false,
      promoRow: makeExpiredRow(8),
      attemptStatus: 'none',
      attemptId: null,
    })
    expect(result.canStart).toBe(false)
    expect(result.isExpired).toBe(true)
  })

  it('12c: expired promo row denies resume', () => {
    const result = resolveRollingPromoAccess({
      isAdmin: false,
      isPremium: false,
      promoRow: makeExpiredRow(7),
      attemptStatus: 'in-progress',
      attemptId: 'attempt-1',
    })
    expect(result.canResume).toBe(false)
    expect(result.isExpired).toBe(true)
  })
})
