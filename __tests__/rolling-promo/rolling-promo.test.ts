import { describe, it, expect, vi } from 'vitest'
import {
  ROLLING_PROMO_CONFIG,
  isRollingPromoLive,
  isEligibleForRollingPromo,
  isRollingPromoExpired,
  resolveRollingPromoAccess,
} from '@/lib/premade-exams/sat/rolling-promo'
import type { RollingPromoAccessRow } from '@/lib/premade-exams/sat/rolling-promo'

// ── Helpers ───────────────────────────────────────────────────────────────────

const PROMO_STARTS = ROLLING_PROMO_CONFIG.promoStartsAt

function makeRow(overrides: Partial<RollingPromoAccessRow> = {}): RollingPromoAccessRow {
  const now = Date.now()
  return {
    user_id: 'user-1',
    email: 'user@test.com',
    promo_form_number: 7,
    access_started_at: new Date(now).toISOString(),
    access_expires_at: new Date(now + 36 * 60 * 60 * 1000).toISOString(),
    reason: 'rolling_promo_36h_first_visit',
    ...overrides,
  }
}

function expiredRow(): RollingPromoAccessRow {
  const past = Date.now() - 1000
  return makeRow({
    access_started_at: new Date(past - 36 * 60 * 60 * 1000).toISOString(),
    access_expires_at: new Date(past).toISOString(),
  })
}

// ── Config ────────────────────────────────────────────────────────────────────

describe('ROLLING_PROMO_CONFIG', () => {
  it('A: formNumber is 7', () => {
    expect(ROLLING_PROMO_CONFIG.formNumber).toBe(7)
  })

  it('B: durationHours is 36', () => {
    expect(ROLLING_PROMO_CONFIG.durationHours).toBe(36)
  })

  it('C: promoStartsAt matches FORM7_WINDOW_ENDS_AT cutover', () => {
    expect(ROLLING_PROMO_CONFIG.promoStartsAt).toBe('2026-08-18T00:05:00Z')
  })
})

// ── isRollingPromoLive ────────────────────────────────────────────────────────

describe('isRollingPromoLive', () => {
  it('D: returns false before promoStartsAt', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-08-17T23:59:59Z'))
    expect(isRollingPromoLive()).toBe(false)
    vi.useRealTimers()
  })

  it('E: returns true exactly at promoStartsAt', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(PROMO_STARTS))
    expect(isRollingPromoLive()).toBe(true)
    vi.useRealTimers()
  })

  it('F: returns true well after promoStartsAt', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-09-01T00:00:00Z'))
    expect(isRollingPromoLive()).toBe(true)
    vi.useRealTimers()
  })
})

// ── isEligibleForRollingPromo ─────────────────────────────────────────────────

describe('isEligibleForRollingPromo', () => {
  it('G: user created exactly at promoStartsAt is eligible', () => {
    expect(isEligibleForRollingPromo(PROMO_STARTS)).toBe(true)
  })

  it('H: user created 1 second after promoStartsAt is eligible', () => {
    const ts = new Date(new Date(PROMO_STARTS).getTime() + 1000).toISOString()
    expect(isEligibleForRollingPromo(ts)).toBe(true)
  })

  it('I: user created 1 second before promoStartsAt is NOT eligible', () => {
    const ts = new Date(new Date(PROMO_STARTS).getTime() - 1000).toISOString()
    expect(isEligibleForRollingPromo(ts)).toBe(false)
  })

  it('J: user created long before cutover is NOT eligible', () => {
    expect(isEligibleForRollingPromo('2026-01-01T00:00:00Z')).toBe(false)
  })
})

// ── isRollingPromoExpired ─────────────────────────────────────────────────────

describe('isRollingPromoExpired', () => {
  it('K: row with future expires_at is not expired', () => {
    const row = makeRow()
    expect(isRollingPromoExpired(row)).toBe(false)
  })

  it('L: row with past expires_at is expired', () => {
    const row = expiredRow()
    expect(isRollingPromoExpired(row)).toBe(true)
  })
})

// ── resolveRollingPromoAccess ─────────────────────────────────────────────────

describe('resolveRollingPromoAccess — admin always gets full access', () => {
  it('M: admin without promo row can still start exam', () => {
    const result = resolveRollingPromoAccess({
      isAdmin: true,
      isPremium: false,
      promoRow: null,
      attemptStatus: 'none',
      attemptId: null,
    })
    expect(result.accessSource).toBe('admin')
    expect(result.canStart).toBe(true)
    expect(result.canResume).toBe(false)
  })

  it('N: admin can resume in-progress exam', () => {
    const result = resolveRollingPromoAccess({
      isAdmin: true,
      isPremium: false,
      promoRow: makeRow(),
      attemptStatus: 'in-progress',
      attemptId: 'attempt-1',
    })
    expect(result.accessSource).toBe('admin')
    expect(result.canResume).toBe(true)
  })
})

describe('resolveRollingPromoAccess — premium always gets full access', () => {
  it('O: premium user without promo row can start any form', () => {
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
})

describe('resolveRollingPromoAccess — no promo row', () => {
  it('P: free user without row cannot start or resume', () => {
    const result = resolveRollingPromoAccess({
      isAdmin: false,
      isPremium: false,
      promoRow: null,
      attemptStatus: 'none',
      attemptId: null,
    })
    expect(result.accessSource).toBe('none')
    expect(result.canStart).toBe(false)
    expect(result.canResume).toBe(false)
  })

  it('Q: free user without row can still view completed results', () => {
    const result = resolveRollingPromoAccess({
      isAdmin: false,
      isPremium: false,
      promoRow: null,
      attemptStatus: 'completed',
      attemptId: 'attempt-1',
    })
    expect(result.canViewResult).toBe(true)
    expect(result.canStart).toBe(false)
  })
})

describe('resolveRollingPromoAccess — active promo row', () => {
  it('R: user with active row and no attempt can start', () => {
    const result = resolveRollingPromoAccess({
      isAdmin: false,
      isPremium: false,
      promoRow: makeRow(),
      attemptStatus: 'none',
      attemptId: null,
    })
    expect(result.accessSource).toBe('rolling-promo')
    expect(result.canStart).toBe(true)
    expect(result.canResume).toBe(false)
    expect(result.isExpired).toBe(false)
  })

  it('S: user with active row and in-progress attempt can resume', () => {
    const result = resolveRollingPromoAccess({
      isAdmin: false,
      isPremium: false,
      promoRow: makeRow(),
      attemptStatus: 'in-progress',
      attemptId: 'attempt-1',
    })
    expect(result.accessSource).toBe('rolling-promo')
    expect(result.canResume).toBe(true)
    expect(result.canStart).toBe(false)
  })

  it('T: expiresAt is taken from the promo row', () => {
    const row = makeRow()
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

describe('resolveRollingPromoAccess — expired promo row', () => {
  it('U: expired row denies start and resume for a user who never started', () => {
    const result = resolveRollingPromoAccess({
      isAdmin: false,
      isPremium: false,
      promoRow: expiredRow(),
      attemptStatus: 'none',
      attemptId: null,
    })
    expect(result.accessSource).toBe('none')
    expect(result.canStart).toBe(false)
    expect(result.canResume).toBe(false)
    expect(result.isExpired).toBe(true)
  })

  it('V: expired row still allows viewing completed results', () => {
    const result = resolveRollingPromoAccess({
      isAdmin: false,
      isPremium: false,
      promoRow: expiredRow(),
      attemptStatus: 'completed',
      attemptId: 'attempt-1',
    })
    expect(result.canViewResult).toBe(true)
  })

  it('W: feedback-required state always allows completeFeedback regardless of expiry', () => {
    const result = resolveRollingPromoAccess({
      isAdmin: false,
      isPremium: false,
      promoRow: expiredRow(),
      attemptStatus: 'feedback-required',
      attemptId: 'attempt-1',
    })
    expect(result.canCompleteFeedback).toBe(true)
    expect(result.canViewResult).toBe(true)
  })
})

describe('resolveRollingPromoAccess — campaign versioning', () => {
  it('X: assignedFormNumber comes from promo row, not config', () => {
    // A user who was assigned form 7 before admin rotated to form 8
    const row = makeRow({ promo_form_number: 7 })
    const result = resolveRollingPromoAccess({
      isAdmin: false,
      isPremium: false,
      promoRow: row,
      attemptStatus: 'none',
      attemptId: null,
    })
    // Remains 7 even if ROLLING_PROMO_CONFIG.formNumber were 8
    expect(result.assignedFormNumber).toBe(7)
  })

  it('Y: user with null row gets null assignedFormNumber', () => {
    const result = resolveRollingPromoAccess({
      isAdmin: false,
      isPremium: false,
      promoRow: null,
      attemptStatus: 'none',
      attemptId: null,
    })
    expect(result.assignedFormNumber).toBeNull()
  })
})
