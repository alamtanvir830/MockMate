/**
 * Regression tests for the "dashboard says Premium, Academy says no" bug class.
 *
 * Root cause: the Stripe webhook writes entitlement via
 * admin.auth.admin.updateUserById(), which does not push a new access token to
 * the user's existing browser session. Any gate that read the raw session user
 * (supabase.auth.getUser()) instead of admin-refreshed metadata could see stale
 * pre-purchase metadata until the session's JWT naturally refreshed — even
 * though the purchase was fully verified and persisted. getFreshAuthUser() is
 * the shared fix: every SAT Premium gate must resolve entitlement through it
 * (or getEntitlements()) instead of hasSatPremium(user)/getQBAccess(user)
 * directly on the session object.
 *
 * All Supabase calls are mocked — no real network calls are made.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'

const mockGetUserById = vi.fn()

vi.mock('@/lib/supabase/admin', () => ({
  createAdminClient: vi.fn(() => ({
    auth: { admin: { getUserById: mockGetUserById } },
  })),
}))

vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn().mockResolvedValue({
    auth: { getUser: vi.fn().mockResolvedValue({ data: { user: null } }) },
  }),
}))

import { getFreshAuthUser, getEntitlements } from '@/lib/entitlements'
import { hasSatPremium } from '@/lib/auth/server'
import { getQBAccess } from '@/lib/question-bank/access'

function freshMeta(meta: Record<string, unknown>) {
  mockGetUserById.mockResolvedValue({ data: { user: { user_metadata: meta } } })
}

const FUTURE = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString()
const PAST = new Date(Date.now() - 1).toISOString()

beforeEach(() => {
  vi.clearAllMocks()
})

describe('getFreshAuthUser — bypasses stale session JWT metadata', () => {
  it('returns null for a null session user (unauthenticated)', async () => {
    expect(await getFreshAuthUser(null)).toBeNull()
  })

  it('replaces stale session metadata with admin-refreshed metadata', async () => {
    freshMeta({ sat_purchase_plan_type: 'lifetime', sat_purchase_status: 'active', sat_purchase_expires_at: null })

    // Session object as it would look right after checkout, before the JWT refreshes:
    // the browser still has pre-purchase (empty) metadata baked into its access token.
    const staleSessionUser = { id: 'user-1', email: 'user@example.com', user_metadata: {} }

    const fresh = await getFreshAuthUser(staleSessionUser)
    expect(fresh?.user_metadata.sat_purchase_plan_type).toBe('lifetime')
    expect(mockGetUserById).toHaveBeenCalledWith('user-1')
  })

  it('a stale session user reading raw metadata would incorrectly deny lifetime premium', async () => {
    freshMeta({ sat_purchase_plan_type: 'lifetime', sat_purchase_status: 'active', sat_purchase_expires_at: null })
    const staleSessionUser = { id: 'user-2', email: 'user@example.com', user_metadata: {} }

    // The exact bug: gating on the raw session user sees no purchase yet.
    expect(hasSatPremium(staleSessionUser)).toBe(false)
    // The fix: gating on the fresh-refetched user sees the real, persisted entitlement.
    expect(hasSatPremium(await getFreshAuthUser(staleSessionUser))).toBe(true)
  })
})

describe('Academy / Question Bank / dashboard gates agree once both read fresh metadata', () => {
  const scenarios: { name: string; meta: Record<string, unknown>; expected: boolean }[] = [
    { name: 'active lifetime purchase', meta: { sat_purchase_plan_type: 'lifetime', sat_purchase_status: 'active', sat_purchase_expires_at: null }, expected: true },
    { name: 'active monthly subscription', meta: { sat_subscription_status: 'active' }, expected: true },
    { name: 'past_due monthly subscription (Stripe retry window)', meta: { sat_subscription_status: 'past_due' }, expected: true },
    { name: 'canceled monthly subscription', meta: { sat_subscription_status: 'canceled' }, expected: false },
    { name: 'active three-month purchase, not yet expired', meta: { sat_purchase_plan_type: 'three_month', sat_purchase_status: 'active', sat_purchase_expires_at: FUTURE }, expected: true },
    { name: 'expired three-month purchase', meta: { sat_purchase_plan_type: 'three_month', sat_purchase_status: 'active', sat_purchase_expires_at: PAST }, expected: false },
    { name: 'refunded lifetime purchase', meta: { sat_purchase_plan_type: 'lifetime', sat_purchase_status: 'refunded' }, expected: false },
    { name: 'no purchase at all', meta: {}, expected: false },
  ]

  for (const { name, meta, expected } of scenarios) {
    it(`${name} → hasSatPremium and getQBAccess agree (expected: ${expected})`, async () => {
      freshMeta(meta)
      const sessionUser = { id: 'user-x', email: 'user@example.com', user_metadata: {} }
      const fresh = await getFreshAuthUser(sessionUser)

      expect(hasSatPremium(fresh)).toBe(expected)
      expect(getQBAccess(fresh).hasPremiumAccess).toBe(expected)
    })
  }

  it('lifetime purchase does not require a subscription row (access_expires_at is null, not treated as inactive)', async () => {
    freshMeta({ sat_purchase_plan_type: 'lifetime', sat_purchase_status: 'active', sat_purchase_expires_at: null })
    const fresh = await getFreshAuthUser({ id: 'user-lifetime', email: 'user@example.com' })
    expect(hasSatPremium(fresh)).toBe(true)
  })
})

describe('getEntitlements() (dashboard/billing) agrees with getFreshAuthUser() (Academy/QB) for the same metadata', () => {
  it('both resolve lifetime purchase as active premium from the same underlying admin fetch', async () => {
    freshMeta({ sat_purchase_plan_type: 'lifetime', sat_purchase_status: 'active', sat_purchase_expires_at: null })

    const { createClient } = await import('@/lib/supabase/server')
    vi.mocked(createClient).mockResolvedValue({
      auth: { getUser: vi.fn().mockResolvedValue({ data: { user: { id: 'user-y', email: 'user@example.com' } } }) },
    } as never)

    const entitlements = await getEntitlements()
    const freshUser = await getFreshAuthUser({ id: 'user-y', email: 'user@example.com' })

    expect(entitlements.satUpgradeUnlocked).toBe(true)
    expect(hasSatPremium(freshUser)).toBe(true)
    expect(entitlements.satUpgradeUnlocked).toBe(hasSatPremium(freshUser))
  })

  it('returns satUpgradeUnlocked:false when there is no session user (unauthenticated)', async () => {
    const { createClient } = await import('@/lib/supabase/server')
    vi.mocked(createClient).mockResolvedValue({
      auth: { getUser: vi.fn().mockResolvedValue({ data: { user: null } }) },
    } as never)

    const entitlements = await getEntitlements()
    expect(entitlements.satUpgradeUnlocked).toBe(false)
  })
})
