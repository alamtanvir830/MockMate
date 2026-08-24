/**
 * Regression tests for the Form 4 expired-window card guard.
 *
 * Root cause: getForm4FreeWindow() always returns a non-null object regardless
 * of expiry. The sat/page.tsx card condition previously didn't check whether
 * the window was still active — it showed "Free for 72 Hours / Expired" for
 * any new non-Premium user.
 *
 * Fix: added `new Date() < new Date(form4FreeWindow.expiresAt)` to the card
 * condition. These tests verify the window is expired and the guard works.
 *
 * 1. getForm4FreeWindow() always returns an object (not null)
 * 2. Form 4 window expiresAt is in the past (expired as of Aug 7, 2026)
 * 3. The expiry guard correctly returns false for the current date
 * 4. A future expiresAt correctly returns true (guard passes for active window)
 * 5. Card condition: user && !isAdmin && !premium && window && !expired && noAttempt
 */

import { describe, it, expect, vi, afterEach } from 'vitest'
import { getForm4FreeWindow, FORM4_WINDOW_ENDS_AT } from '@/lib/premade-exams/sat/form4-access'

afterEach(() => vi.useRealTimers())

describe('getForm4FreeWindow always returns object', () => {
  it('1: returns a non-null window object regardless of current date', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-09-01T00:00:00Z')) // well after expiry
    const window = getForm4FreeWindow()
    expect(window).not.toBeNull()
    expect(window).toHaveProperty('expiresAt')
    expect(window).toHaveProperty('startsAt')
  })
})

describe('Form 4 window is expired', () => {
  it('2: FORM4_WINDOW_ENDS_AT is 2026-08-07T14:00:00Z (Aug 7, 2026)', () => {
    expect(FORM4_WINDOW_ENDS_AT).toBe('2026-08-07T14:00:00Z')
  })

  it('3: expiresAt guard → false after Aug 7, 2026 (window is expired now)', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-08-14T00:00:00Z')) // after expiry
    const freeWindow = getForm4FreeWindow()!
    const isActive = new Date() < new Date(freeWindow.expiresAt)
    expect(isActive).toBe(false)
  })

  it('3b: expiresAt guard → false even 1 second after expiry boundary', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-08-07T14:00:01Z')) // 1s after expiry
    const freeWindow = getForm4FreeWindow()!
    const isActive = new Date() < new Date(freeWindow.expiresAt)
    expect(isActive).toBe(false)
  })
})

describe('expiresAt guard behavior during active window', () => {
  it('4: guard returns true 1 second before expiry (window is active)', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-08-07T13:59:59Z')) // 1s before expiry
    const freeWindow = getForm4FreeWindow()!
    const isActive = new Date() < new Date(freeWindow.expiresAt)
    expect(isActive).toBe(true)
  })
})

describe('Composite card condition (simulates sat/page.tsx guard)', () => {
  it('5: new non-premium user with no attempt → card hidden when window expired', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-08-14T00:00:00Z')) // present day, well after Aug 7

    const user = { id: 'user-1' }
    const isAdmin = false
    const satUpgradeUnlocked = false
    const form4FreeWindow = getForm4FreeWindow()
    const form4AttemptStatus = 'none'

    // This is the exact condition from sat/page.tsx after the fix:
    const showFreeCard =
      user !== null &&
      !isAdmin &&
      !satUpgradeUnlocked &&
      form4FreeWindow !== null &&
      new Date() < new Date(form4FreeWindow.expiresAt) && // <-- the guard added
      form4AttemptStatus === 'none'

    expect(showFreeCard).toBe(false) // card must NOT show for expired window
  })
})
