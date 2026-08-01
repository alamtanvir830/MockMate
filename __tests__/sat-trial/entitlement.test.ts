/**
 * Tests for SAT Premium entitlement with trial subscription status.
 *
 * Covers hasSatPremium(), evalSatPremiumMeta(), and getQBAccess() for trialing users.
 */

import { describe, it, expect } from 'vitest'
import { hasSatPremium } from '@/lib/auth/server'
import { evalSatPremiumMeta } from '@/hooks/use-entitlements'
import { getQBAccess } from '@/lib/question-bank/access'

// ── Helpers ───────────────────────────────────────────────────────────────────

function makeUser(meta: Record<string, unknown> = {}) {
  return { email: 'user@example.com', user_metadata: meta }
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('hasSatPremium — trialing subscription', () => {
  // ── 1. trialing grants premium ──────────────────────────────────────────────
  it('returns true when sat_subscription_status is trialing', () => {
    expect(hasSatPremium(makeUser({ sat_subscription_status: 'trialing' }))).toBe(true)
  })

  it('returns false when sat_subscription_status is canceled (after trial)', () => {
    expect(hasSatPremium(makeUser({ sat_subscription_status: 'canceled' }))).toBe(false)
  })

  it('returns false when sat_subscription_status is incomplete_expired', () => {
    expect(hasSatPremium(makeUser({ sat_subscription_status: 'incomplete_expired' }))).toBe(false)
  })

  it('returns false when sat_subscription_status is unpaid', () => {
    expect(hasSatPremium(makeUser({ sat_subscription_status: 'unpaid' }))).toBe(false)
  })

  it('returns true when sat_subscription_status is active (converted from trial)', () => {
    expect(hasSatPremium(makeUser({ sat_subscription_status: 'active' }))).toBe(true)
  })

  it('returns true when sat_subscription_status is past_due', () => {
    expect(hasSatPremium(makeUser({ sat_subscription_status: 'past_due' }))).toBe(true)
  })

  it('returns false for null user', () => {
    expect(hasSatPremium(null)).toBe(false)
  })

  it('returns false for undefined user', () => {
    expect(hasSatPremium(undefined)).toBe(false)
  })
})

describe('evalSatPremiumMeta — trialing subscription (client hook)', () => {
  // ── 2. evalSatPremiumMeta mirrors hasSatPremium for trialing ────────────────
  it('returns true for trialing status', () => {
    expect(evalSatPremiumMeta({ sat_subscription_status: 'trialing' })).toBe(true)
  })

  it('returns false for canceled status', () => {
    expect(evalSatPremiumMeta({ sat_subscription_status: 'canceled' })).toBe(false)
  })

  it('returns true for active status (converted)', () => {
    expect(evalSatPremiumMeta({ sat_subscription_status: 'active' })).toBe(true)
  })

  it('returns false for empty metadata', () => {
    expect(evalSatPremiumMeta({})).toBe(false)
  })

  it('matches hasSatPremium output for trialing user', () => {
    const meta = { sat_subscription_status: 'trialing' }
    const server = hasSatPremium({ user_metadata: meta })
    const client = evalSatPremiumMeta(meta)
    expect(client).toBe(server)
    expect(client).toBe(true)
  })

  it('matches hasSatPremium output for canceled-after-trial user', () => {
    const meta = { sat_subscription_status: 'canceled' }
    const server = hasSatPremium({ user_metadata: meta })
    const client = evalSatPremiumMeta(meta)
    expect(client).toBe(server)
    expect(client).toBe(false)
  })
})

describe('getQBAccess — QB access during and after trial', () => {
  // ── 3. QB access during trial ───────────────────────────────────────────────
  it('grants QB premium access when user is trialing', () => {
    const user = makeUser({ sat_subscription_status: 'trialing' })
    const access = getQBAccess(user)
    expect(access.hasPremiumAccess).toBe(true)
  })

  it('revokes QB premium access after trial cancellation', () => {
    const user = makeUser({ sat_subscription_status: 'canceled' })
    const access = getQBAccess(user)
    expect(access.hasPremiumAccess).toBe(false)
  })

  it('grants QB premium access when trial converts to active', () => {
    const user = makeUser({ sat_subscription_status: 'active' })
    const access = getQBAccess(user)
    expect(access.hasPremiumAccess).toBe(true)
  })

  it('returns hasPremiumAccess:false for null user', () => {
    const access = getQBAccess(null)
    expect(access.hasPremiumAccess).toBe(false)
  })

  it('returns hasPremiumAccess:false for free user with no metadata', () => {
    const user = makeUser({})
    const access = getQBAccess(user)
    expect(access.hasPremiumAccess).toBe(false)
  })
})
