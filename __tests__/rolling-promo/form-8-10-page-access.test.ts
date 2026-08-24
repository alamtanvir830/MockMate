/**
 * Form 8–10 page-level rolling-promo access tests.
 *
 * Validates the resolver behavior that each form's page.tsx depends on
 * after the rolling-promo check was added. The page pattern:
 *   - queries sat_rolling_promo_access with .eq('promo_form_number', FORM_NUMBER)
 *   - calls resolveRollingPromoAccess with that row (or null if missing)
 *   - renders SATExamTakerClient if any canX flag is true; else UpgradeGate
 *
 * Test matrix:
 *  1.  active promo_form_number=8 → Form 8 page canStart=true
 *  2.  no promo row → Form 8 page locked
 *  3.  promo_form_number=7 (DB filter returns null for Form 8 query) → Form 8 locked
 *  4.  promo_form_number=9 (DB filter returns null for Form 8 query) → Form 8 locked
 *  5.  expired promo_form_number=8 → Form 8 locked (isExpired=true)
 *  6.  Premium user → bypassed (resolveRollingPromoAccess isPremium=true)
 *  7.  active Form 8 promo + in-progress → canResume=true
 *  8.  active Form 8 promo + completed → canViewResult=true
 *  9.  active Form 8 promo + feedback-required → canCompleteFeedback=true
 * 10.  Form 9 page: active promo_form_number=9 → canStart=true (same generic resolver)
 * 11.  Form 10 page: active promo_form_number=10 → canStart=true (same generic resolver)
 * 12.  Form 7 promo user has no row for Form 8 query → Form 8 stays locked
 * 13.  Form 8 expired + in-progress → isExpired=true, canResume=false (expired UX branch)
 * 14.  Admin bypasses promo check entirely
 * 15.  Future rotation: promo_form_number=9 → same resolver, canStart=true for Form 9 page
 */

import { describe, it, expect } from 'vitest'
import { resolveRollingPromoAccess } from '@/lib/premade-exams/sat/rolling-promo'
import type { RollingPromoAccessRow } from '@/lib/premade-exams/sat/rolling-promo'

// ── Helpers ───────────────────────────────────────────────────────────────────

function activeRow(formNumber: number): RollingPromoAccessRow {
  const now = Date.now()
  return {
    user_id: 'user-test',
    email: 'test@example.com',
    promo_form_number: formNumber,
    access_started_at: new Date(now).toISOString(),
    access_expires_at: new Date(now + 24 * 60 * 60 * 1000).toISOString(),
    reason: 'rolling_promo_36h_first_visit',
  }
}

function expiredRow(formNumber: number): RollingPromoAccessRow {
  const past = Date.now() - 1000
  return {
    user_id: 'user-test',
    email: 'test@example.com',
    promo_form_number: formNumber,
    access_started_at: new Date(past - 24 * 60 * 60 * 1000).toISOString(),
    access_expires_at: new Date(past).toISOString(),
    reason: 'rolling_promo_36h_first_visit',
  }
}

// ── Form 8 page access ────────────────────────────────────────────────────────

describe('Form 8 page: active promo_form_number=8', () => {
  it('1: canStart=true → page renders SATExamTakerClient', () => {
    const result = resolveRollingPromoAccess({
      isAdmin: false,
      isPremium: false,
      promoRow: activeRow(8),
      attemptStatus: 'none',
      attemptId: null,
    })
    expect(result.canStart).toBe(true)
    expect(result.accessSource).toBe('rolling-promo')
    expect(result.isExpired).toBe(false)
  })
})

describe('Form 8 page: no promo row', () => {
  it('2: canStart=false → page renders UpgradeGate (locked)', () => {
    const result = resolveRollingPromoAccess({
      isAdmin: false,
      isPremium: false,
      promoRow: null,
      attemptStatus: 'none',
      attemptId: null,
    })
    expect(result.canStart).toBe(false)
    expect(result.canResume).toBe(false)
    expect(result.accessSource).toBe('none')
  })
})

describe('Form 8 page: user has promo_form_number=7', () => {
  it('3: page queries .eq(promo_form_number, 8) → DB returns null → locked', () => {
    // The DB .eq('promo_form_number', 8) filter excludes the form-7 row.
    // Page receives promoRow=null → same as no row.
    const result = resolveRollingPromoAccess({
      isAdmin: false,
      isPremium: false,
      promoRow: null,
      attemptStatus: 'none',
      attemptId: null,
    })
    expect(result.canStart).toBe(false)
    expect(result.accessSource).toBe('none')
  })
})

describe('Form 8 page: user has promo_form_number=9', () => {
  it('4: page queries .eq(promo_form_number, 8) → DB returns null → locked', () => {
    const result = resolveRollingPromoAccess({
      isAdmin: false,
      isPremium: false,
      promoRow: null,
      attemptStatus: 'none',
      attemptId: null,
    })
    expect(result.canStart).toBe(false)
  })
})

describe('Form 8 page: expired promo_form_number=8', () => {
  it('5: isExpired=true, canStart=false → page renders UpgradeGate (expired UX)', () => {
    const result = resolveRollingPromoAccess({
      isAdmin: false,
      isPremium: false,
      promoRow: expiredRow(8),
      attemptStatus: 'none',
      attemptId: null,
    })
    expect(result.canStart).toBe(false)
    expect(result.isExpired).toBe(true)
    expect(result.accessSource).toBe('none')
  })
})

describe('Form 8 page: Premium user', () => {
  it('6: isPremium=true → canStart=true regardless of promo row', () => {
    const result = resolveRollingPromoAccess({
      isAdmin: false,
      isPremium: true,
      promoRow: null,
      attemptStatus: 'none',
      attemptId: null,
    })
    expect(result.canStart).toBe(true)
    expect(result.accessSource).toBe('premium')
  })
})

describe('Form 8 page: active promo + in-progress attempt', () => {
  it('7: canResume=true → page renders SATExamTakerClient for resume', () => {
    const result = resolveRollingPromoAccess({
      isAdmin: false,
      isPremium: false,
      promoRow: activeRow(8),
      attemptStatus: 'in-progress',
      attemptId: 'attempt-1',
    })
    expect(result.canResume).toBe(true)
    expect(result.canStart).toBe(false)
    expect(result.accessSource).toBe('rolling-promo')
  })
})

describe('Form 8 page: active promo + completed attempt', () => {
  it('8: canViewResult=true → page renders SATExamTakerClient for results', () => {
    const result = resolveRollingPromoAccess({
      isAdmin: false,
      isPremium: false,
      promoRow: activeRow(8),
      attemptStatus: 'completed',
      attemptId: 'attempt-1',
    })
    expect(result.canViewResult).toBe(true)
    expect(result.accessSource).toBe('rolling-promo')
  })
})

describe('Form 8 page: active promo + feedback-required', () => {
  it('9: canCompleteFeedback=true → page renders SATExamTakerClient', () => {
    const result = resolveRollingPromoAccess({
      isAdmin: false,
      isPremium: false,
      promoRow: activeRow(8),
      attemptStatus: 'feedback-required',
      attemptId: 'attempt-1',
    })
    expect(result.canCompleteFeedback).toBe(true)
  })
})

// ── Form 9 page access (same resolver, formNumber=9) ─────────────────────────

describe('Form 9 page: active promo_form_number=9', () => {
  it('10: canStart=true → Form 9 page opens for promo user', () => {
    const result = resolveRollingPromoAccess({
      isAdmin: false,
      isPremium: false,
      promoRow: activeRow(9),
      attemptStatus: 'none',
      attemptId: null,
    })
    expect(result.canStart).toBe(true)
    expect(result.assignedFormNumber).toBe(9)
    expect(result.accessSource).toBe('rolling-promo')
  })
})

// ── Form 10 page access ───────────────────────────────────────────────────────

describe('Form 10 page: active promo_form_number=10', () => {
  it('11: canStart=true → Form 10 page opens for promo user', () => {
    const result = resolveRollingPromoAccess({
      isAdmin: false,
      isPremium: false,
      promoRow: activeRow(10),
      attemptStatus: 'none',
      attemptId: null,
    })
    expect(result.canStart).toBe(true)
    expect(result.assignedFormNumber).toBe(10)
    expect(result.accessSource).toBe('rolling-promo')
  })
})

// ── Cross-form isolation ──────────────────────────────────────────────────────

describe('Form 8 page: user with Form 7 promo cannot access Form 8', () => {
  it('12: DB filter .eq(promo_form_number, 8) returns null for Form 7 user → locked', () => {
    // The page queries .eq('promo_form_number', 8) — Form 7 row is NOT returned.
    // This simulates what the DB returns to the Form 8 page for a Form 7 promo user.
    const result = resolveRollingPromoAccess({
      isAdmin: false,
      isPremium: false,
      promoRow: null, // DB returns null because .eq('promo_form_number', 8) excludes form-7 row
      attemptStatus: 'none',
      attemptId: null,
    })
    expect(result.canStart).toBe(false)
    expect(result.accessSource).toBe('none')
  })
})

describe('Form 8 page: expired promo + in-progress attempt → expired UX', () => {
  it('13: isExpired=true, canResume=false → triggers expired-access UpgradeGate branch', () => {
    const result = resolveRollingPromoAccess({
      isAdmin: false,
      isPremium: false,
      promoRow: expiredRow(8),
      attemptStatus: 'in-progress',
      attemptId: 'attempt-1',
    })
    expect(result.isExpired).toBe(true)
    expect(result.canResume).toBe(false)
    expect(result.canStart).toBe(false)
    // Page checks: if (rollingAccess.isExpired && inProgressRow.data) → expired UX gate
  })
})

describe('Form 8 page: admin bypasses promo check', () => {
  it('14: isAdmin=true → canStart=true even with no promo row', () => {
    const result = resolveRollingPromoAccess({
      isAdmin: true,
      isPremium: false,
      promoRow: null,
      attemptStatus: 'none',
      attemptId: null,
    })
    expect(result.canStart).toBe(true)
    expect(result.accessSource).toBe('admin')
  })
})

describe('Future rotation: promo_form_number=9 → Form 9 generic page works without new code', () => {
  it('15: same resolveRollingPromoAccess call with formNumber=9 row → canStart=true', () => {
    // Simulates rotating ROLLING_PROMO_CONFIG.formNumber to 9.
    // The Form 9 page queries .eq('promo_form_number', 9), gets the row, resolves access.
    const result = resolveRollingPromoAccess({
      isAdmin: false,
      isPremium: false,
      promoRow: activeRow(9),
      attemptStatus: 'none',
      attemptId: null,
    })
    expect(result.canStart).toBe(true)
    expect(result.assignedFormNumber).toBe(9)
    // No form-9-specific code was needed — same resolver handles it generically
  })
})
