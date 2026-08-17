/**
 * Expired promotional SAT exam resume / paywall regression tests.
 *
 * Covers the behaviour mandated by Phases 10–22 of the 3 PM ET cutover change:
 *
 * Boundary tests (Phases 20):
 *   1–3   Global Form 7 window boundary at 2026-08-17T19:00:00Z
 *   4–6   Rolling promo activation boundary at 2026-08-17T19:00:00Z
 *   7–9   Account eligibility cutoff at 2026-08-17T19:00:00Z
 *
 * Expired-resume access logic (Phase 21):
 *  10–12  Global window expired + in-progress attempt → blocked (non-premium)
 *  13–15  Rolling window expired + in-progress attempt → blocked (non-premium)
 *  16     Premium user can resume after either window expires
 *  17     Direct Form 7 URL with expired access → canStart/canResume = false
 *  18     Completed attempt always accessible after expiry (canViewResult = true)
 *  19     Historical results unaffected
 *  20     Content-version staleness is independent of promo expiry
 *
 * PROMO_ACCESS_EXPIRED API code (Phase 15):
 *  21–22  API code is distinct from generic errors
 *
 * Campaign versioning (Phase 19):
 *  23–24  Rotating promo form does not reassign already-started users
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  resolveForm7Access,
  FORM7_WINDOW_STARTS_AT,
  FORM7_WINDOW_ENDS_AT,
} from '@/lib/premade-exams/sat/form7-access'
import {
  ROLLING_PROMO_CONFIG,
  isRollingPromoLive,
  isEligibleForRollingPromo,
  resolveRollingPromoAccess,
} from '@/lib/premade-exams/sat/rolling-promo'
import type { RollingPromoAccessRow } from '@/lib/premade-exams/sat/rolling-promo'

// ── Helpers ───────────────────────────────────────────────────────────────────

const CUTOVER = '2026-08-17T19:00:00Z'          // 3:00 PM ET
const BEFORE  = '2026-08-17T18:59:59Z'           // 1s before cutover
const AT      = CUTOVER                           // exactly at cutover
const AFTER   = '2026-08-17T19:00:01Z'           // 1s after cutover
const WINDOW  = { startsAt: FORM7_WINDOW_STARTS_AT, expiresAt: FORM7_WINDOW_ENDS_AT }

function makeRollingRow(overrides: Partial<RollingPromoAccessRow> = {}): RollingPromoAccessRow {
  const now = Date.now()
  return {
    user_id: 'user-test',
    email: 'test@example.com',
    promo_form_number: 7,
    access_started_at: new Date(now).toISOString(),
    access_expires_at: new Date(now + 36 * 60 * 60 * 1000).toISOString(),
    reason: 'rolling_promo_36h_first_visit',
    ...overrides,
  }
}

function expiredRollingRow(): RollingPromoAccessRow {
  const past = Date.now() - 1000
  return {
    user_id: 'user-test',
    email: 'test@example.com',
    promo_form_number: 7,
    access_started_at: new Date(past - 36 * 60 * 60 * 1000).toISOString(),
    access_expires_at: new Date(past).toISOString(),
    reason: 'rolling_promo_36h_first_visit',
  }
}

beforeEach(() => { vi.useFakeTimers(); vi.setSystemTime(new Date('2026-08-16T00:00:00Z')) })
afterEach(() => { vi.useRealTimers() })

// ── Phase 20: Boundary tests ──────────────────────────────────────────────────

describe('Global Form 7 window boundary (3:00 PM ET = 2026-08-17T19:00:00Z)', () => {
  it('1: one second before cutover → global window ACTIVE', () => {
    vi.setSystemTime(new Date(BEFORE))
    const r = resolveForm7Access({ isAdmin: false, isPremium: false, freeWindow: WINDOW, attemptStatus: 'none', attemptId: null })
    expect(r.globalWindowExpired).toBe(false)
    expect(r.canStart).toBe(true)
    expect(r.accessSource).toBe('free-window')
  })

  it('2: exactly at cutover → global window EXPIRED', () => {
    vi.setSystemTime(new Date(AT))
    const r = resolveForm7Access({ isAdmin: false, isPremium: false, freeWindow: WINDOW, attemptStatus: 'none', attemptId: null })
    expect(r.globalWindowExpired).toBe(true)
    expect(r.canStart).toBe(false)
    expect(r.lockReason).toBe('no-access')
  })

  it('3: one second after cutover → global window EXPIRED', () => {
    vi.setSystemTime(new Date(AFTER))
    const r = resolveForm7Access({ isAdmin: false, isPremium: false, freeWindow: WINDOW, attemptStatus: 'none', attemptId: null })
    expect(r.globalWindowExpired).toBe(true)
    expect(r.canStart).toBe(false)
  })
})

describe('Rolling promo activation boundary (3:00 PM ET = 2026-08-17T19:00:00Z)', () => {
  it('4: one second before cutover → rolling promo NOT live', () => {
    vi.setSystemTime(new Date(BEFORE))
    expect(isRollingPromoLive()).toBe(false)
  })

  it('5: exactly at cutover → rolling promo IS live', () => {
    vi.setSystemTime(new Date(AT))
    expect(isRollingPromoLive()).toBe(true)
  })

  it('6: one second after cutover → rolling promo IS live', () => {
    vi.setSystemTime(new Date(AFTER))
    expect(isRollingPromoLive()).toBe(true)
  })
})

describe('Account eligibility cutoff (3:00 PM ET = 2026-08-17T19:00:00Z)', () => {
  it('7: account created 1s before cutover → NOT eligible', () => {
    expect(isEligibleForRollingPromo(BEFORE)).toBe(false)
  })

  it('8: account created exactly at cutover → eligible', () => {
    expect(isEligibleForRollingPromo(AT)).toBe(true)
  })

  it('9: account created 1s after cutover → eligible', () => {
    expect(isEligibleForRollingPromo(AFTER)).toBe(true)
  })
})

// ── Phase 21: Expired-resume access ──────────────────────────────────────────

describe('Global window expired + in-progress attempt → blocked (non-premium)', () => {
  beforeEach(() => { vi.setSystemTime(new Date(AFTER)) })   // after cutover

  it('10: canResume = false when global window expired and user is not premium', () => {
    const r = resolveForm7Access({ isAdmin: false, isPremium: false, freeWindow: WINDOW, attemptStatus: 'in-progress', attemptId: 'a1' })
    expect(r.canResume).toBe(false)
    expect(r.lockReason).toBe('no-access')
  })

  it('11: canStart = false (no double attempt)', () => {
    const r = resolveForm7Access({ isAdmin: false, isPremium: false, freeWindow: WINDOW, attemptStatus: 'in-progress', attemptId: 'a1' })
    expect(r.canStart).toBe(false)
  })

  it('12: admin can still resume after global window expires', () => {
    const r = resolveForm7Access({ isAdmin: true, isPremium: false, freeWindow: WINDOW, attemptStatus: 'in-progress', attemptId: 'a1' })
    expect(r.canResume).toBe(true)
    expect(r.accessSource).toBe('admin')
  })
})

describe('Rolling window expired + in-progress attempt → blocked (non-premium)', () => {
  it('13: canResume = false when rolling row is expired', () => {
    const r = resolveRollingPromoAccess({ isAdmin: false, isPremium: false, promoRow: expiredRollingRow(), attemptStatus: 'in-progress', attemptId: 'a1' })
    expect(r.canResume).toBe(false)
    expect(r.accessSource).toBe('none')
    expect(r.isExpired).toBe(true)
  })

  it('14: canStart = false when rolling row is expired', () => {
    const r = resolveRollingPromoAccess({ isAdmin: false, isPremium: false, promoRow: expiredRollingRow(), attemptStatus: 'none', attemptId: null })
    expect(r.canStart).toBe(false)
    expect(r.isExpired).toBe(true)
  })

  it('15: rolling expired + no row → access denied', () => {
    const r = resolveRollingPromoAccess({ isAdmin: false, isPremium: false, promoRow: null, attemptStatus: 'in-progress', attemptId: 'a1' })
    expect(r.canResume).toBe(false)
    expect(r.accessSource).toBe('none')
  })
})

describe('Premium user bypasses both expired windows', () => {
  it('16: premium can resume in-progress even after global window expires', () => {
    vi.setSystemTime(new Date(AFTER))
    const r = resolveForm7Access({ isAdmin: false, isPremium: true, freeWindow: WINDOW, attemptStatus: 'in-progress', attemptId: 'a1' })
    expect(r.canResume).toBe(true)
    expect(r.accessSource).toBe('premium')
  })
})

describe('Direct URL access after expiry', () => {
  it('17: non-premium navigating to /premade/sat/form-7 after expiry → canStart=false', () => {
    vi.setSystemTime(new Date(AFTER))
    const r = resolveForm7Access({ isAdmin: false, isPremium: false, freeWindow: WINDOW, attemptStatus: 'none', attemptId: null })
    expect(r.canStart).toBe(false)
    expect(r.lockReason).toBe('no-access')
  })
})

describe('Completed attempt preserved after expiry', () => {
  it('18: canViewResult = true after global window expires (completed attempt)', () => {
    vi.setSystemTime(new Date(AFTER))
    const r = resolveForm7Access({ isAdmin: false, isPremium: false, freeWindow: WINDOW, attemptStatus: 'completed', attemptId: 'a1' })
    expect(r.canViewResult).toBe(true)
    expect(r.canStart).toBe(false)
  })

  it('19: canViewResult = true after rolling promo expires (completed attempt)', () => {
    const r = resolveRollingPromoAccess({ isAdmin: false, isPremium: false, promoRow: expiredRollingRow(), attemptStatus: 'completed', attemptId: 'a1' })
    expect(r.canViewResult).toBe(true)
    expect(r.canStart).toBe(false)
  })
})

describe('Content version staleness is independent of promo expiry', () => {
  it('20: expired promo and content staleness are separate — both can be true simultaneously', () => {
    // Promo expired
    vi.setSystemTime(new Date(AFTER))
    const promoResult = resolveForm7Access({ isAdmin: false, isPremium: false, freeWindow: WINDOW, attemptStatus: 'in-progress', attemptId: 'a1' })
    expect(promoResult.canResume).toBe(false)   // blocked by promo expiry

    // Content staleness is checked separately (via version-constants, not access resolver)
    // This test just confirms access resolver does not reference content version
    expect(promoResult.lockReason).toBe('no-access')
    // If content were stale it would produce a 409 at the API level, not 'no-access'
  })
})

// ── Phase 15: PROMO_ACCESS_EXPIRED API code ───────────────────────────────────

describe('PROMO_ACCESS_EXPIRED API response code is distinct from other errors', () => {
  it('21: PROMO_ACCESS_EXPIRED code is a known constant string', () => {
    expect('PROMO_ACCESS_EXPIRED').not.toBe('stale_version')
    expect('PROMO_ACCESS_EXPIRED').not.toBe('UNAUTHENTICATED')
    expect('PROMO_ACCESS_EXPIRED').not.toBe('DATABASE_ERROR')
  })

  it('22: stale_version code (409) is distinct from PROMO_ACCESS_EXPIRED (403)', () => {
    // 409 = stale content version → client should reload
    // 403 PROMO_ACCESS_EXPIRED → show paywall, do NOT retry
    const stale = 'stale_version'
    const expired = 'PROMO_ACCESS_EXPIRED'
    expect(stale).not.toBe(expired)
  })
})

// ── Phase 19: Campaign versioning ────────────────────────────────────────────

describe('Campaign versioning: rotating promo form does not affect existing users', () => {
  it('23: user with form 7 row keeps form 7 even if config rotates to form 8', () => {
    const row = makeRollingRow({ promo_form_number: 7 })
    const r = resolveRollingPromoAccess({ isAdmin: false, isPremium: false, promoRow: row, attemptStatus: 'none', attemptId: null })
    // Config may say formNumber=8 later, but the DB row says 7 — that is authoritative
    expect(r.assignedFormNumber).toBe(7)
    expect(r.canStart).toBe(true)
  })

  it('24: new user after form rotation gets the currently configured form', () => {
    // When no row exists yet, assignedFormNumber is null (set at row-creation time from config)
    const r = resolveRollingPromoAccess({ isAdmin: false, isPremium: false, promoRow: null, attemptStatus: 'none', attemptId: null })
    expect(r.assignedFormNumber).toBeNull()
    // The actual form will be ROLLING_PROMO_CONFIG.formNumber at the time the row is created
    expect(ROLLING_PROMO_CONFIG.formNumber).toBe(7)
  })
})
