/**
 * Regression tests for the Form 5 expired-window card guard.
 *
 * Same bug pattern as Form 4: getForm5FreeWindow() always returns non-null,
 * and the sat/page.tsx card condition didn't check expiry — showing
 * "Free for 48 Hours / Expired" for any new non-Premium user.
 *
 * Fix: added `new Date() < new Date(form5FreeWindow.expiresAt)` to the card
 * condition. These tests verify the window is expired and the guard works.
 *
 * 1. getForm5FreeWindow() always returns an object (not null)
 * 2. Form 5 window expiresAt is in the past (expired as of Aug 10, 2026)
 * 3. The expiry guard correctly returns false for the current date
 * 4. A future expiresAt correctly returns true (guard passes for active window)
 * 5. Card condition: user && !isAdmin && !premium && window && !expired && noAttempt
 */

import { describe, it, expect, vi, afterEach } from 'vitest'
import { getForm5FreeWindow, FORM5_WINDOW_ENDS_AT } from '@/lib/premade-exams/sat/form5-access'

afterEach(() => vi.useRealTimers())

describe('getForm5FreeWindow always returns object', () => {
  it('1: returns a non-null window object regardless of current date', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-09-01T00:00:00Z')) // well after expiry
    const window = getForm5FreeWindow()
    expect(window).not.toBeNull()
    expect(window).toHaveProperty('expiresAt')
    expect(window).toHaveProperty('startsAt')
  })
})

describe('Form 5 window is expired', () => {
  it('2: FORM5_WINDOW_ENDS_AT is 2026-08-10T03:47:00Z (Aug 10, 2026)', () => {
    expect(FORM5_WINDOW_ENDS_AT).toBe('2026-08-10T03:47:00Z')
  })

  it('3: expiresAt guard → false after Aug 10, 2026 (window is expired now)', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-08-14T00:00:00Z')) // after expiry
    const freeWindow = getForm5FreeWindow()!
    const isActive = new Date() < new Date(freeWindow.expiresAt)
    expect(isActive).toBe(false)
  })

  it('3b: expiresAt guard → false even 1 second after expiry boundary', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-08-10T03:47:01Z')) // 1s after expiry
    const freeWindow = getForm5FreeWindow()!
    const isActive = new Date() < new Date(freeWindow.expiresAt)
    expect(isActive).toBe(false)
  })
})

describe('expiresAt guard behavior during active window', () => {
  it('4: guard returns true 1 second before expiry (window is active)', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-08-10T03:46:59Z')) // 1s before expiry
    const freeWindow = getForm5FreeWindow()!
    const isActive = new Date() < new Date(freeWindow.expiresAt)
    expect(isActive).toBe(true)
  })
})

describe('Composite card condition (simulates sat/page.tsx guard)', () => {
  it('5: new non-premium user with no attempt → card hidden when window expired', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-08-14T00:00:00Z')) // present day, well after Aug 10

    const user = { id: 'user-1' }
    const isAdmin = false
    const satUpgradeUnlocked = false
    const form5FreeWindow = getForm5FreeWindow()
    const form5AttemptStatus = 'none'

    // This is the exact condition from sat/page.tsx after the fix:
    const showFreeCard =
      user !== null &&
      !isAdmin &&
      !satUpgradeUnlocked &&
      form5FreeWindow !== null &&
      new Date() < new Date(form5FreeWindow.expiresAt) && // <-- the guard added
      form5AttemptStatus === 'none'

    expect(showFreeCard).toBe(false) // card must NOT show for expired window
  })
})
