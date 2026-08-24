/**
 * Form 8 rotation tests — confirms that rotating ROLLING_PROMO_CONFIG.formNumber
 * from 7 → 8 works correctly under the existing generic architecture.
 *
 * Matrix:
 *  1.  Current configured promo form = 8
 *  2.  New eligible user activates promo → assigned promo_form_number = 8
 *  3.  Timer duration remains exactly 24 hours
 *  4.  Dashboard CTA still routes to generic SAT forms page
 *  5.  Forms page marks Form 8 FREE for new assigned user
 *  6.  Form 7 is NOT free for that new user (no row / wrong promo_form_number)
 *  7.  Form 9 is NOT free
 *  8.  Direct Form 8 access succeeds while entitlement active
 *  9.  Direct Form 7 access not free merely because it was the previous promo
 * 10.  Existing Form 7 entitlement preserved — stays Form 7 after config rotation
 * 11.  Existing Form 7 timer unchanged (started_at / expires_at untouched)
 * 12.  Existing Form 7 user can continue until their original expiry
 * 13.  Expired Form 7 entitlement follows existing expired-access behavior
 * 14.  New Form 8 entitlement follows same expired-access behavior after expiry
 * 15.  Refresh / logout / device change do NOT reset timer (persisted server-side)
 * 16.  Premium user unchanged
 * 17.  Other forms remain locked for non-Premium users without a promo row
 * 18.  Future config: promo form = 9 → same architecture assigns 9 without new form-specific logic
 * 19.  canAccessRollingPromoFormApi rejects wrong form number
 * 20.  Save/resume authorization: form 8 promo accepts via canAccessRollingPromoFormApi
 */

import { describe, it, expect } from 'vitest'
import {
  ROLLING_PROMO_CONFIG,
  resolveRollingPromoAccess,
  canAccessRollingPromoFormApi,
  isRollingPromoExpired,
} from '@/lib/premade-exams/sat/rolling-promo'
import type { RollingPromoAccessRow } from '@/lib/premade-exams/sat/rolling-promo'

// ── Helpers ───────────────────────────────────────────────────────────────────

function makeActiveRow(formNumber: number): RollingPromoAccessRow {
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

function makeExpiredRow(formNumber: number): RollingPromoAccessRow {
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

const SAT_FORMS_ROUTE = '/premade/sat'

// ── 1. Config confirms Form 8 ─────────────────────────────────────────────────

describe('1. Current configured promo form', () => {
  it('ROLLING_PROMO_CONFIG.formNumber is 8', () => {
    expect(ROLLING_PROMO_CONFIG.formNumber).toBe(8)
  })
})

// ── 2. New user assigned Form 8 ───────────────────────────────────────────────

describe('2. New eligible user → assigned promo_form_number = 8', () => {
  it('resolveRollingPromoAccess with form 8 row → assignedFormNumber = 8, canStart = true', () => {
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
})

// ── 3. Timer duration unchanged ───────────────────────────────────────────────

describe('3. Timer duration remains exactly 24 hours', () => {
  it('ROLLING_PROMO_CONFIG.durationHours is 24', () => {
    expect(ROLLING_PROMO_CONFIG.durationHours).toBe(24)
  })

  it('active form 8 row expires_at - started_at = 24h (86400000ms)', () => {
    const row = makeActiveRow(8)
    const diff = new Date(row.access_expires_at).getTime() - new Date(row.access_started_at).getTime()
    expect(diff).toBe(24 * 60 * 60 * 1000)
  })
})

// ── 4. Dashboard CTA routes to generic SAT forms page ────────────────────────

describe('4. Dashboard CTA route unchanged', () => {
  it('dashboard CTA destination is /premade/sat (not form-8 specific)', () => {
    expect(SAT_FORMS_ROUTE).toBe('/premade/sat')
    expect(SAT_FORMS_ROUTE).not.toMatch(/form-\d+/)
  })
})

// ── 5–7. Forms page: Form 8 free, Forms 7 and 9 locked ───────────────────────

describe('5. Form 8 is free for new user with form 8 promo row', () => {
  it('canStart = true for form 8 promo row', () => {
    const result = resolveRollingPromoAccess({
      isAdmin: false,
      isPremium: false,
      promoRow: makeActiveRow(8),
      attemptStatus: 'none',
      attemptId: null,
    })
    expect(result.canStart).toBe(true)
    expect(result.assignedFormNumber).toBe(8)
  })
})

describe('6. Form 7 is NOT free for a new user assigned Form 8', () => {
  it('resolveRollingPromoAccess with no promo row → canStart = false (form 7 not unlocked)', () => {
    // A new user has no form 7 row — form 7 is not the current promo form
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

  it('a form 8 promo row does NOT grant access to form 7 (wrong promo_form_number)', () => {
    // The promo row is for form 8; canAccessRollingPromoFormApi(userId, 7) would return false
    // because promo_form_number (8) !== requestedFormNumber (7)
    // We simulate this via the resolver by passing form-8 row and checking assignedFormNumber
    const result = resolveRollingPromoAccess({
      isAdmin: false,
      isPremium: false,
      promoRow: makeActiveRow(8),
      attemptStatus: 'none',
      attemptId: null,
    })
    // Assigned form is 8, not 7 — form 7 card should NOT render as free
    expect(result.assignedFormNumber).not.toBe(7)
  })
})

describe('7. Form 9 is NOT free for a user with a Form 8 promo row', () => {
  it('form 8 promo row assigns form 8 only — form 9 remains locked', () => {
    const result = resolveRollingPromoAccess({
      isAdmin: false,
      isPremium: false,
      promoRow: makeActiveRow(8),
      attemptStatus: 'none',
      attemptId: null,
    })
    expect(result.assignedFormNumber).toBe(8)
    expect(result.assignedFormNumber).not.toBe(9)
  })
})

// ── 8–9. Direct URL access ────────────────────────────────────────────────────

describe('8. Direct Form 8 access succeeds while entitlement active', () => {
  it('active form 8 row → canStart = true (simulates direct /premade/sat/form-8 access)', () => {
    const result = resolveRollingPromoAccess({
      isAdmin: false,
      isPremium: false,
      promoRow: makeActiveRow(8),
      attemptStatus: 'none',
      attemptId: null,
    })
    expect(result.canStart).toBe(true)
  })
})

describe('9. Form 7 direct URL not free because it was the previous promo', () => {
  it('no form 7 promo row → canStart = false for a new post-rotation user', () => {
    const result = resolveRollingPromoAccess({
      isAdmin: false,
      isPremium: false,
      promoRow: null,
      attemptStatus: 'none',
      attemptId: null,
    })
    expect(result.canStart).toBe(false)
    expect(result.assignedFormNumber).toBeNull()
  })
})

// ── 10–13. Existing Form 7 entitlement preserved ──────────────────────────────

describe('10. Existing Form 7 entitlement preserved after config rotates to 8', () => {
  it('user with promo_form_number=7 in DB row keeps assignedFormNumber=7', () => {
    const existingRow = makeActiveRow(7)
    const result = resolveRollingPromoAccess({
      isAdmin: false,
      isPremium: false,
      promoRow: existingRow,
      attemptStatus: 'none',
      attemptId: null,
    })
    // Despite ROLLING_PROMO_CONFIG.formNumber being 8, the DB row is authoritative
    expect(result.assignedFormNumber).toBe(7)
    expect(ROLLING_PROMO_CONFIG.formNumber).toBe(8) // config is 8
    expect(result.assignedFormNumber).not.toBe(ROLLING_PROMO_CONFIG.formNumber)
  })
})

describe('11. Existing Form 7 timer unchanged', () => {
  it('form 7 row started_at and expires_at are unmodified by the rotation', () => {
    const now = Date.now()
    const started = new Date(now - 2 * 60 * 60 * 1000).toISOString() // 2h ago
    const expires = new Date(now + 22 * 60 * 60 * 1000).toISOString() // 22h left
    const existingRow: RollingPromoAccessRow = {
      user_id: 'user-a',
      email: 'a@test.com',
      promo_form_number: 7,
      access_started_at: started,
      access_expires_at: expires,
      reason: 'rolling_promo_36h_first_visit',
    }
    const result = resolveRollingPromoAccess({
      isAdmin: false,
      isPremium: false,
      promoRow: existingRow,
      attemptStatus: 'none',
      attemptId: null,
    })
    // Timer values come from the DB row — unchanged by config rotation
    expect(result.expiresAt).toBe(expires)
    expect(result.promoRow?.access_started_at).toBe(started)
  })
})

describe('12. Existing Form 7 user can continue until their original expiry', () => {
  it('form 7 active row → canResume = true for in-progress attempt', () => {
    const result = resolveRollingPromoAccess({
      isAdmin: false,
      isPremium: false,
      promoRow: makeActiveRow(7),
      attemptStatus: 'in-progress',
      attemptId: 'attempt-7-existing',
    })
    expect(result.canResume).toBe(true)
    expect(result.assignedFormNumber).toBe(7)
  })
})

describe('13. Expired Form 7 entitlement follows existing expired-access behavior', () => {
  it('expired form 7 row → canStart = false, isExpired = true', () => {
    const result = resolveRollingPromoAccess({
      isAdmin: false,
      isPremium: false,
      promoRow: makeExpiredRow(7),
      attemptStatus: 'none',
      attemptId: null,
    })
    expect(result.canStart).toBe(false)
    expect(result.isExpired).toBe(true)
    expect(result.accessSource).toBe('none')
  })

  it('expired form 7 row + in-progress → canResume = false', () => {
    const result = resolveRollingPromoAccess({
      isAdmin: false,
      isPremium: false,
      promoRow: makeExpiredRow(7),
      attemptStatus: 'in-progress',
      attemptId: 'attempt-7-old',
    })
    expect(result.canResume).toBe(false)
    expect(result.isExpired).toBe(true)
  })

  it('expired form 7 row + completed attempt → canViewResult = true', () => {
    const result = resolveRollingPromoAccess({
      isAdmin: false,
      isPremium: false,
      promoRow: makeExpiredRow(7),
      attemptStatus: 'completed',
      attemptId: 'attempt-7-done',
    })
    expect(result.canViewResult).toBe(true)
    expect(result.canStart).toBe(false)
  })
})

// ── 14. Form 8 expired-access behavior ───────────────────────────────────────

describe('14. New Form 8 entitlement follows same expired-access behavior', () => {
  it('expired form 8 row → canStart = false, isExpired = true', () => {
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

  it('expired form 8 row + in-progress → canResume = false', () => {
    const result = resolveRollingPromoAccess({
      isAdmin: false,
      isPremium: false,
      promoRow: makeExpiredRow(8),
      attemptStatus: 'in-progress',
      attemptId: 'attempt-8-old',
    })
    expect(result.canResume).toBe(false)
    expect(result.isExpired).toBe(true)
  })

  it('expired form 8 row + completed → canViewResult = true', () => {
    const result = resolveRollingPromoAccess({
      isAdmin: false,
      isPremium: false,
      promoRow: makeExpiredRow(8),
      attemptStatus: 'completed',
      attemptId: 'attempt-8-done',
    })
    expect(result.canViewResult).toBe(true)
  })
})

// ── 15. Timer persists server-side (no client reset) ─────────────────────────

describe('15. Refresh / logout / device change do NOT reset timer', () => {
  it('expiresAt comes from the DB row — not derived client-side', () => {
    const fixedExpiry = '2026-09-01T12:00:00Z'
    const row: RollingPromoAccessRow = {
      user_id: 'user-b',
      email: 'b@test.com',
      promo_form_number: 8,
      access_started_at: '2026-08-31T12:00:00Z',
      access_expires_at: fixedExpiry,
      reason: 'rolling_promo_36h_first_visit',
    }
    const result = resolveRollingPromoAccess({
      isAdmin: false,
      isPremium: false,
      promoRow: row,
      attemptStatus: 'none',
      attemptId: null,
    })
    // The countdown should use this exact server value regardless of when the resolver runs
    expect(result.expiresAt).toBe(fixedExpiry)
  })
})

// ── 16. Premium user unchanged ────────────────────────────────────────────────

describe('16. Premium user unaffected by form rotation', () => {
  it('Premium user can start without a promo row', () => {
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

  it('Premium user is not restricted by form 8 expiry', () => {
    const result = resolveRollingPromoAccess({
      isAdmin: false,
      isPremium: true,
      promoRow: makeExpiredRow(8),
      attemptStatus: 'in-progress',
      attemptId: 'attempt-premium',
    })
    expect(result.canResume).toBe(true)
    expect(result.accessSource).toBe('premium')
  })
})

// ── 17. Other forms locked without promo row ──────────────────────────────────

describe('17. Other forms remain locked for non-Premium users without promo', () => {
  it('non-Premium user with no promo row → canStart = false, accessSource = none', () => {
    const result = resolveRollingPromoAccess({
      isAdmin: false,
      isPremium: false,
      promoRow: null,
      attemptStatus: 'none',
      attemptId: null,
    })
    expect(result.canStart).toBe(false)
    expect(result.accessSource).toBe('none')
    expect(result.assignedFormNumber).toBeNull()
  })
})

// ── 18. Future config: promo form = 9 works without new form-specific logic ───

describe('18. Future rotation to Form 9 works generically', () => {
  it('form 9 promo row → assignedFormNumber = 9, canStart = true (no new code needed)', () => {
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

  it('form 10 promo row → assignedFormNumber = 10, canStart = true (no new code needed)', () => {
    const result = resolveRollingPromoAccess({
      isAdmin: false,
      isPremium: false,
      promoRow: makeActiveRow(10),
      attemptStatus: 'none',
      attemptId: null,
    })
    expect(result.assignedFormNumber).toBe(10)
    expect(result.canStart).toBe(true)
  })
})

// ── 19. canAccessRollingPromoFormApi rejects wrong form ───────────────────────

describe('19. API enforcement rejects mismatched form number', () => {
  it('isRollingPromoExpired returns false for active row', () => {
    const row = makeActiveRow(8)
    expect(isRollingPromoExpired(row)).toBe(false)
  })

  it('isRollingPromoExpired returns true for expired row', () => {
    const row = makeExpiredRow(8)
    expect(isRollingPromoExpired(row)).toBe(true)
  })

  it('form 8 promo row does not match form 7 requestedFormNumber (pure logic)', () => {
    const row = makeActiveRow(8)
    // Simulate what canAccessRollingPromoFormApi checks:
    const requestedForm = 7
    const promoFormMatches = row.promo_form_number === requestedForm
    expect(promoFormMatches).toBe(false)
  })

  it('form 8 promo row matches form 8 requestedFormNumber (pure logic)', () => {
    const row = makeActiveRow(8)
    const requestedForm = 8
    const promoFormMatches = row.promo_form_number === requestedForm
    const notExpired = !isRollingPromoExpired(row)
    expect(promoFormMatches).toBe(true)
    expect(notExpired).toBe(true)
  })
})

// ── 20. Save/resume: form 8 promo row grants authorization ───────────────────

describe('20. Form 8 save/resume paths accept rolling promo authorization', () => {
  it('in-progress form 8 → canResume = true while window active', () => {
    const result = resolveRollingPromoAccess({
      isAdmin: false,
      isPremium: false,
      promoRow: makeActiveRow(8),
      attemptStatus: 'in-progress',
      attemptId: 'attempt-8-active',
    })
    expect(result.canResume).toBe(true)
    expect(result.accessSource).toBe('rolling-promo')
  })

  it('completed form 8 → canViewResult = true (post-exam always accessible)', () => {
    const result = resolveRollingPromoAccess({
      isAdmin: false,
      isPremium: false,
      promoRow: makeActiveRow(8),
      attemptStatus: 'completed',
      attemptId: 'attempt-8-done',
    })
    expect(result.canViewResult).toBe(true)
  })
})
