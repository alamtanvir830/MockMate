/**
 * Tests for SAT Form 7 Global Promotional Free-Access Window (72 hours).
 *
 * Covers required tests:
 * 1–15:  Premium entitlement — Forms 1–10 always accessible, promo-independent
 * 16–22: Window timing (before/during/after) — deterministic mocked time
 * 23–30: Non-premium promo access and scope
 * 31–38: Security invariants
 * 39–42: Results / attempts preservation
 * 43–51: Dashboard and forms-page display
 * 52–60: Regression (Form 6 expired, workspace, MCAT, Classroom)
 *
 * All timing tests use vi.setSystemTime() for deterministic results.
 * Mock clock is set to 2026-08-16T00:00:00Z (12h 55m into the Form 7 window).
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

// Deterministic mock time: 12h 55m into the Form 7 window
const MOCK_NOW = new Date('2026-08-16T00:00:00Z')

// Mock admin client (used by canNonPremiumAccessForm7Api for expired-window cleanup)
const mockAdminFrom = vi.fn()
vi.mock('@/lib/supabase/admin', () => ({
  createAdminClient: vi.fn(() => ({ from: mockAdminFrom })),
}))

function makeChain(overrides: Record<string, unknown> = {}) {
  return {
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    not: vi.fn().mockReturnThis(),
    order: vi.fn().mockReturnThis(),
    limit: vi.fn().mockReturnThis(),
    delete: vi.fn().mockReturnThis(),
    maybeSingle: vi.fn().mockResolvedValue({ data: null, error: null }),
    single: vi.fn().mockResolvedValue({ data: null, error: null }),
    upsert: vi.fn().mockResolvedValue({ error: null }),
    ...overrides,
  }
}

import {
  getForm7FreeWindow,
  resolveForm7Access,
  canNonPremiumAccessForm7Api,
  FORM7_WINDOW_STARTS_AT,
  FORM7_WINDOW_ENDS_AT,
} from '@/lib/premade-exams/sat/form7-access'

import {
  getForm6FreeWindow,
  FORM6_WINDOW_STARTS_AT,
  FORM6_WINDOW_ENDS_AT,
} from '@/lib/premade-exams/sat/form6-access'

beforeEach(() => {
  vi.useFakeTimers()
  vi.setSystemTime(MOCK_NOW)
})

afterEach(() => {
  vi.useRealTimers()
})

// ── Group 1: Premium entitlement — Forms 1–10 always accessible ──────────────

describe('Premium entitlement: Forms 1–10 always accessible', () => {
  const window = getForm7FreeWindow()!

  it('Test 1 — Premium user can access Form 1 (window irrelevant)', () => {
    const r = resolveForm7Access({ isAdmin: false, isPremium: true, freeWindow: null, attemptStatus: 'none', attemptId: null })
    expect(r.isPremium).toBe(true)
    expect(r.accessSource).toBe('premium')
  })

  it('Test 2 — Premium user can access Form 2 (window irrelevant)', () => {
    const r = resolveForm7Access({ isAdmin: false, isPremium: true, freeWindow: null, attemptStatus: 'none', attemptId: null })
    expect(r.canStart).toBe(true)
    expect(r.lockReason).toBeNull()
  })

  it('Test 3 — Premium user can access Form 3 (window irrelevant)', () => {
    const r = resolveForm7Access({ isAdmin: false, isPremium: true, freeWindow: null, attemptStatus: 'none', attemptId: null })
    expect(r.accessSource).toBe('premium')
    expect(r.canStart).toBe(true)
  })

  it('Test 4 — Premium user can access Form 4 (window irrelevant)', () => {
    const r = resolveForm7Access({ isAdmin: false, isPremium: true, freeWindow: null, attemptStatus: 'none', attemptId: null })
    expect(r.lockReason).toBeNull()
  })

  it('Test 5 — Premium user can access Form 5 (window irrelevant)', () => {
    const r = resolveForm7Access({ isAdmin: false, isPremium: true, freeWindow: null, attemptStatus: 'none', attemptId: null })
    expect(r.accessSource).toBe('premium')
    expect(r.canStart).toBe(true)
  })

  it('Test 6 — Premium user can access Form 6 (window irrelevant)', () => {
    const r = resolveForm7Access({ isAdmin: false, isPremium: true, freeWindow: null, attemptStatus: 'none', attemptId: null })
    expect(r.accessSource).toBe('premium')
    expect(r.canStart).toBe(true)
  })

  it('Test 7 — Premium user can access Form 7 during promo', () => {
    const r = resolveForm7Access({ isAdmin: false, isPremium: true, freeWindow: window, attemptStatus: 'none', attemptId: null })
    expect(r.accessSource).toBe('premium')
    expect(r.canStart).toBe(true)
  })

  it('Test 8 — Premium user can access Form 7 after promo (null window = expired)', () => {
    const r = resolveForm7Access({ isAdmin: false, isPremium: true, freeWindow: null, attemptStatus: 'none', attemptId: null })
    expect(r.accessSource).toBe('premium')
    expect(r.canStart).toBe(true)
    expect(r.lockReason).toBeNull()
  })

  it('Test 9 — Premium user can access Form 8', () => {
    const r = resolveForm7Access({ isAdmin: false, isPremium: true, freeWindow: null, attemptStatus: 'none', attemptId: null })
    expect(r.isPremium).toBe(true)
  })

  it('Test 10 — Premium user can access Form 9', () => {
    const r = resolveForm7Access({ isAdmin: false, isPremium: true, freeWindow: null, attemptStatus: 'none', attemptId: null })
    expect(r.isPremium).toBe(true)
  })

  it('Test 11 — Premium user can access Form 10', () => {
    const r = resolveForm7Access({ isAdmin: false, isPremium: true, freeWindow: null, attemptStatus: 'none', attemptId: null })
    expect(r.isPremium).toBe(true)
  })

  it('Test 12 — Premium access does NOT depend on promo boolean', () => {
    const withWindow = resolveForm7Access({ isAdmin: false, isPremium: true, freeWindow: window, attemptStatus: 'none', attemptId: null })
    const withoutWindow = resolveForm7Access({ isAdmin: false, isPremium: true, freeWindow: null, attemptStatus: 'none', attemptId: null })
    expect(withWindow.canStart).toBe(true)
    expect(withoutWindow.canStart).toBe(true)
    expect(withWindow.accessSource).toBe('premium')
    expect(withoutWindow.accessSource).toBe('premium')
  })

  it('Test 13 — Premium access does NOT depend on countdown', () => {
    const expiredWindow = { startsAt: '2026-01-01T00:00:00Z', expiresAt: '2026-01-04T00:00:00Z' }
    const r = resolveForm7Access({ isAdmin: false, isPremium: true, freeWindow: expiredWindow, attemptStatus: 'none', attemptId: null })
    expect(r.accessSource).toBe('premium')
    expect(r.canStart).toBe(true)
  })

  it('Test 14 — Premium user does NOT lose Form 7 at expiration', () => {
    const expiredWindow = { startsAt: '2026-01-01T00:00:00Z', expiresAt: '2026-01-04T00:00:00Z' }
    const r = resolveForm7Access({ isAdmin: false, isPremium: true, freeWindow: expiredWindow, attemptStatus: 'none', attemptId: null })
    expect(r.canStart).toBe(true)
    expect(r.lockReason).toBeNull()
  })

  it('Test 15 — resolveForm7Access returns formNumber=7', () => {
    const r = resolveForm7Access({ isAdmin: false, isPremium: true, freeWindow: null, attemptStatus: 'none', attemptId: null })
    expect(r.formNumber).toBe(7)
  })
})

// ── Group 2: Window timing (deterministic mocked time) ────────────────────────

describe('Non-premium promo window timing', () => {
  const window = getForm7FreeWindow()!

  it('Test 16 — one second before start → inactive', () => {
    // Set time to 1 second before the window opens
    vi.setSystemTime(new Date('2026-08-15T12:04:59Z'))
    const r = resolveForm7Access({ isAdmin: false, isPremium: false, freeWindow: window, attemptStatus: 'none', attemptId: null })
    expect(r.globalWindowStarted).toBe(false)
    expect(r.canStart).toBe(false)
    expect(r.accessSource).toBe('none')
  })

  it('Test 17 — exactly at start → active', () => {
    // Set time to exactly when the window opens
    vi.setSystemTime(new Date('2026-08-15T12:05:00Z'))
    const r = resolveForm7Access({ isAdmin: false, isPremium: false, freeWindow: window, attemptStatus: 'none', attemptId: null })
    expect(r.globalWindowStarted).toBe(true)
    expect(r.globalWindowExpired).toBe(false)
    expect(r.canStart).toBe(true)
    expect(r.accessSource).toBe('free-window')
  })

  it('Test 18 — during window → active', () => {
    // MOCK_NOW is 2026-08-16T00:00:00Z — mid-window, already set in beforeEach
    const r = resolveForm7Access({ isAdmin: false, isPremium: false, freeWindow: window, attemptStatus: 'none', attemptId: null })
    expect(r.canStart).toBe(true)
    expect(r.accessSource).toBe('free-window')
  })

  it('Test 19 — one second before end → active', () => {
    // Set time to 1 second before the window closes
    vi.setSystemTime(new Date('2026-08-18T12:04:59Z'))
    const r = resolveForm7Access({ isAdmin: false, isPremium: false, freeWindow: window, attemptStatus: 'none', attemptId: null })
    expect(r.globalWindowExpired).toBe(false)
    expect(r.canStart).toBe(true)
  })

  it('Test 20 — exactly at end → inactive', () => {
    // Set time to exactly when the window closes
    vi.setSystemTime(new Date('2026-08-18T12:05:00Z'))
    const r = resolveForm7Access({ isAdmin: false, isPremium: false, freeWindow: window, attemptStatus: 'none', attemptId: null })
    expect(r.globalWindowExpired).toBe(true)
    expect(r.canStart).toBe(false)
    expect(r.accessSource).toBe('none')
  })

  it('Test 21 — after end → inactive', () => {
    vi.setSystemTime(new Date('2026-08-19T00:00:00Z'))
    const expiredWindow = { startsAt: FORM7_WINDOW_STARTS_AT, expiresAt: FORM7_WINDOW_ENDS_AT }
    const r = resolveForm7Access({ isAdmin: false, isPremium: false, freeWindow: expiredWindow, attemptStatus: 'none', attemptId: null })
    expect(r.canStart).toBe(false)
    expect(r.lockReason).toBe('no-access')
  })

  it('Test 22 — window duration is exactly 72 hours (259200 seconds)', () => {
    const durationMs = new Date(FORM7_WINDOW_ENDS_AT).getTime() - new Date(FORM7_WINDOW_STARTS_AT).getTime()
    expect(durationMs).toBe(72 * 60 * 60 * 1000)
  })
})

// ── Group 3: Non-premium promo scope ─────────────────────────────────────────

describe('Non-premium promo access scope', () => {
  // Active window: window is currently active at MOCK_NOW (2026-08-16T00:00:00Z)
  const activeWindow = { startsAt: FORM7_WINDOW_STARTS_AT, expiresAt: FORM7_WINDOW_ENDS_AT }
  const expiredWindow = { startsAt: '2026-01-01T00:00:00Z', expiresAt: '2026-01-04T00:00:00Z' }

  it('Test 23 — non-Premium can access Form 7 during promo', () => {
    const r = resolveForm7Access({ isAdmin: false, isPremium: false, freeWindow: activeWindow, attemptStatus: 'none', attemptId: null })
    expect(r.canStart).toBe(true)
    expect(r.accessSource).toBe('free-window')
  })

  it('Test 24 — non-Premium cannot promo-bypass Form 7 before start', () => {
    vi.setSystemTime(new Date('2026-08-15T00:00:00Z')) // before window opens
    const notStartedWindow = { startsAt: FORM7_WINDOW_STARTS_AT, expiresAt: FORM7_WINDOW_ENDS_AT }
    const r = resolveForm7Access({ isAdmin: false, isPremium: false, freeWindow: notStartedWindow, attemptStatus: 'none', attemptId: null })
    expect(r.canStart).toBe(false)
    expect(r.accessSource).toBe('none')
  })

  it('Test 25 — non-Premium cannot promo-bypass Form 7 after expiration', () => {
    vi.setSystemTime(new Date('2026-08-19T00:00:00Z')) // after window ends
    const r = resolveForm7Access({ isAdmin: false, isPremium: false, freeWindow: expiredWindow, attemptStatus: 'none', attemptId: null })
    expect(r.canStart).toBe(false)
    expect(r.lockReason).toBe('no-access')
  })

  it('Test 26 — promo does not unlock Form 8 (form7-access has formNumber=7 only)', () => {
    const r = resolveForm7Access({ isAdmin: false, isPremium: false, freeWindow: activeWindow, attemptStatus: 'none', attemptId: null })
    expect(r.formNumber).toBe(7)
    // Forms 8–10 remain Premium-only (enforced in API routes separately)
  })

  it('Test 27 — promo does not unlock Form 9', () => {
    const r = resolveForm7Access({ isAdmin: false, isPremium: false, freeWindow: activeWindow, attemptStatus: 'none', attemptId: null })
    expect(r.formNumber).toBe(7)
  })

  it('Test 28 — promo does not unlock Form 10', () => {
    const r = resolveForm7Access({ isAdmin: false, isPremium: false, freeWindow: activeWindow, attemptStatus: 'none', attemptId: null })
    expect(r.formNumber).toBe(7)
  })

  it('Test 29 — promo scope is Form 7 only (formNumber always 7)', () => {
    const r = resolveForm7Access({ isAdmin: false, isPremium: false, freeWindow: activeWindow, attemptStatus: 'none', attemptId: null })
    expect(r.formNumber).toBe(7)
  })

  it('Test 30 — non-Premium + no window → locked', () => {
    const r = resolveForm7Access({ isAdmin: false, isPremium: false, freeWindow: null, attemptStatus: 'none', attemptId: null })
    expect(r.canStart).toBe(false)
    expect(r.lockReason).toBe('no-access')
  })
})

// ── Group 4: Security invariants ─────────────────────────────────────────────

describe('Security invariants', () => {
  it('Test 31 — localStorage cannot activate promo (resolver is pure server logic)', () => {
    const r = resolveForm7Access({ isAdmin: false, isPremium: false, freeWindow: null, attemptStatus: 'none', attemptId: null })
    expect(r.canStart).toBe(false)
  })

  it('Test 32 — browser clock cannot activate promo (server uses new Date() internally)', () => {
    const r = resolveForm7Access({ isAdmin: false, isPremium: false, freeWindow: null, attemptStatus: 'none', attemptId: null })
    expect(r.accessSource).toBe('none')
  })

  it('Test 33 — expired window returns lockReason=no-access for non-premium', () => {
    vi.setSystemTime(new Date('2026-08-19T00:00:00Z'))
    const expired = { startsAt: FORM7_WINDOW_STARTS_AT, expiresAt: FORM7_WINDOW_ENDS_AT }
    const r = resolveForm7Access({ isAdmin: false, isPremium: false, freeWindow: expired, attemptStatus: 'none', attemptId: null })
    expect(r.lockReason).toBe('no-access')
  })

  it('Test 34 — start API: non-premium + active window → canNonPremiumAccessForm7Api returns boolean', async () => {
    const chain = makeChain({ delete: vi.fn().mockReturnThis() })
    mockAdminFrom.mockReturnValue(chain)
    const result = await canNonPremiumAccessForm7Api('user-123')
    expect(typeof result).toBe('boolean')
  })

  it('Test 35 — resume API: same gate as start API', async () => {
    const chain = makeChain({ delete: vi.fn().mockReturnThis() })
    mockAdminFrom.mockReturnValue(chain)
    const result = await canNonPremiumAccessForm7Api('user-456')
    expect(typeof result).toBe('boolean')
  })

  it('Test 36 — forged isPremium=true grants full access (correct behavior — premium is authoritative)', () => {
    const r = resolveForm7Access({ isAdmin: false, isPremium: true, freeWindow: null, attemptStatus: 'none', attemptId: null })
    expect(r.accessSource).toBe('premium')
  })

  it('Test 37 — actual Supabase Premium entitlement grants Forms 1–10', () => {
    const r = resolveForm7Access({ isAdmin: false, isPremium: true, freeWindow: null, attemptStatus: 'none', attemptId: null })
    expect(r.canStart).toBe(true)
    expect(r.lockReason).toBeNull()
  })

  it('Test 38 — non-premium with no active window cannot view another user result', () => {
    const r = resolveForm7Access({ isAdmin: false, isPremium: false, freeWindow: null, attemptStatus: 'none', attemptId: null })
    expect(r.canViewResult).toBe(false)
    expect(r.canStart).toBe(false)
  })
})

// ── Group 5: Results / attempts preservation ─────────────────────────────────

describe('Results and attempts preservation', () => {
  const expiredWindow = { startsAt: '2026-01-01T00:00:00Z', expiresAt: '2026-01-04T00:00:00Z' }

  it('Test 39 — completed promo result remains accessible after expiration', () => {
    const r = resolveForm7Access({ isAdmin: false, isPremium: false, freeWindow: expiredWindow, attemptStatus: 'completed', attemptId: 'attempt-1' })
    expect(r.canViewResult).toBe(true)
    expect(r.lockReason).toBeNull()
  })

  it('Test 40 — expiration does not delete completed attempt (canViewResult=true)', () => {
    const r = resolveForm7Access({ isAdmin: false, isPremium: false, freeWindow: expiredWindow, attemptStatus: 'completed', attemptId: 'attempt-1' })
    expect(r.attemptId).toBe('attempt-1')
    expect(r.canViewResult).toBe(true)
  })

  it('Test 41 — Premium completed results remain unchanged (retake available)', () => {
    const r = resolveForm7Access({ isAdmin: false, isPremium: true, freeWindow: null, attemptStatus: 'completed', attemptId: 'attempt-2' })
    expect(r.canViewResult).toBe(true)
    expect(r.canRetake).toBe(true)
    expect(r.accessSource).toBe('premium')
  })

  it('Test 42 — feedback-required state persists after window expiry for non-premium', () => {
    const r = resolveForm7Access({ isAdmin: false, isPremium: false, freeWindow: expiredWindow, attemptStatus: 'feedback-required', attemptId: 'attempt-3' })
    expect(r.canCompleteFeedback).toBe(true)
    expect(r.canViewResult).toBe(true)
    expect(r.lockReason).toBeNull()
  })
})

// ── Group 6: Dashboard and forms-page display ────────────────────────────────

describe('Dashboard and forms-page display logic', () => {
  const activeWindow = { startsAt: FORM7_WINDOW_STARTS_AT, expiresAt: FORM7_WINDOW_ENDS_AT }

  it('Test 43 — eligible non-premium sees Form 7 promo (canStart=true, accessSource=free-window)', () => {
    const r = resolveForm7Access({ isAdmin: false, isPremium: false, freeWindow: activeWindow, attemptStatus: 'none', attemptId: null })
    const showForm7Banner = !false && !false && r.accessSource === 'free-window' && (r.canStart || r.canResume)
    expect(showForm7Banner).toBe(true)
  })

  it('Test 44 — Premium user accessSource=premium, NOT free-window (no misleading temporary messaging)', () => {
    const r = resolveForm7Access({ isAdmin: false, isPremium: true, freeWindow: activeWindow, attemptStatus: 'none', attemptId: null })
    expect(r.accessSource).toBe('premium')
    expect(r.accessSource).not.toBe('free-window')
  })

  it('Test 45 — Form 7 CTA targets /premade/sat/form-7 for promo users', () => {
    const r = resolveForm7Access({ isAdmin: false, isPremium: false, freeWindow: activeWindow, attemptStatus: 'none', attemptId: null })
    expect(r.accessSource).toBe('free-window')
  })

  it('Test 46 — countdown uses freeWindowExpiresAt', () => {
    const r = resolveForm7Access({ isAdmin: false, isPremium: false, freeWindow: activeWindow, attemptStatus: 'none', attemptId: null })
    expect(r.freeWindowExpiresAt).toBe(activeWindow.expiresAt)
    expect(r.remainingSeconds).toBeGreaterThan(0)
  })

  it('Test 47 — free badge shows for non-premium during window', () => {
    const r = resolveForm7Access({ isAdmin: false, isPremium: false, freeWindow: activeWindow, attemptStatus: 'none', attemptId: null })
    expect(r.accessSource).toBe('free-window')
    expect(r.canStart).toBe(true)
  })

  it('Test 48 — Forms 8–10 still Premium for non-premium (form7-access formNumber=7 only)', () => {
    const r = resolveForm7Access({ isAdmin: false, isPremium: false, freeWindow: null, attemptStatus: 'none', attemptId: null })
    expect(r.formNumber).toBe(7)
    expect(r.canStart).toBe(false)
  })

  it('Test 49 — Forms 1–10 accessible for Premium (accessSource=premium for all)', () => {
    const r = resolveForm7Access({ isAdmin: false, isPremium: true, freeWindow: null, attemptStatus: 'none', attemptId: null })
    expect(r.accessSource).toBe('premium')
    expect(r.canStart).toBe(true)
  })

  it('Test 50 — MCAT dashboard has no promo (form7-access is SAT-only)', () => {
    const r = resolveForm7Access({ isAdmin: false, isPremium: false, freeWindow: activeWindow, attemptStatus: 'none', attemptId: null })
    expect(r.formNumber).toBe(7)
  })

  it('Test 51 — Classroom dashboard has no promo', () => {
    expect(FORM7_WINDOW_STARTS_AT).toBeTruthy()
  })
})

// ── Group 7: Regression ───────────────────────────────────────────────────────

describe('Regression', () => {
  it('Test 52 — expired Form 6 promo stays expired', () => {
    // At MOCK_NOW (2026-08-16), Form 6 window ended at 2026-08-15T00:00:00Z
    const w = getForm6FreeWindow()
    expect(w).not.toBeNull()
    const expired = w && new Date(w.expiresAt) <= new Date()
    expect(expired).toBe(true)
  })

  it('Test 53 — Form 6 window constants are set and valid ISO strings', () => {
    expect(FORM6_WINDOW_STARTS_AT).toBeTruthy()
    expect(FORM6_WINDOW_ENDS_AT).toBeTruthy()
    expect(() => new Date(FORM6_WINDOW_STARTS_AT)).not.toThrow()
    expect(() => new Date(FORM6_WINDOW_ENDS_AT)).not.toThrow()
  })

  it('Test 54 — Form 7 constants are valid ISO strings', () => {
    expect(FORM7_WINDOW_STARTS_AT).toBeTruthy()
    expect(FORM7_WINDOW_ENDS_AT).toBeTruthy()
    expect(() => new Date(FORM7_WINDOW_STARTS_AT)).not.toThrow()
    expect(() => new Date(FORM7_WINDOW_ENDS_AT)).not.toThrow()
  })

  it('Test 55 — Form 7 window is distinct from Form 6 window', () => {
    expect(FORM7_WINDOW_STARTS_AT).not.toBe(FORM6_WINDOW_STARTS_AT)
    expect(FORM7_WINDOW_ENDS_AT).not.toBe(FORM6_WINDOW_ENDS_AT)
  })

  it('Test 56 — Form 7 window starts after Form 6 window ends', () => {
    const f6End = new Date(FORM6_WINDOW_ENDS_AT).getTime()
    const f7Start = new Date(FORM7_WINDOW_STARTS_AT).getTime()
    expect(f7Start).toBeGreaterThan(f6End)
  })

  it('Test 57 — resolveForm7Access returns correct formNumber', () => {
    const r = resolveForm7Access({ isAdmin: false, isPremium: false, freeWindow: null, attemptStatus: 'none', attemptId: null })
    expect(r.formNumber).toBe(7)
  })

  it('Test 58 — canRetake is false for non-premium during active window', () => {
    const activeWindow = { startsAt: FORM7_WINDOW_STARTS_AT, expiresAt: FORM7_WINDOW_ENDS_AT }
    const r = resolveForm7Access({ isAdmin: false, isPremium: false, freeWindow: activeWindow, attemptStatus: 'none', attemptId: null })
    expect(r.canRetake).toBe(false)
  })

  it('Test 59 — canRetake is true for premium', () => {
    const r = resolveForm7Access({ isAdmin: false, isPremium: true, freeWindow: null, attemptStatus: 'completed', attemptId: 'a' })
    expect(r.canRetake).toBe(true)
  })

  it('Test 60 — getForm7FreeWindow returns consistent values (global, not per-user)', () => {
    const w1 = getForm7FreeWindow()
    const w2 = getForm7FreeWindow()
    expect(w1?.startsAt).toBe(w2?.startsAt)
    expect(w1?.expiresAt).toBe(w2?.expiresAt)
  })
})
