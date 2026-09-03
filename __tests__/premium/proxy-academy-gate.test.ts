/**
 * Regression tests for the proxy.ts (middleware) SAT Premium gate on
 * /sat-rw-academy/* and /sat-math-academy/* sub-routes.
 *
 * Root cause: proxy.ts had its own hand-rolled entitlement check that never
 * called hasSatPremium() and never recognized one-time purchases (lifetime /
 * three_month) — only the legacy sat_upgrade_unlocked flag and an active
 * monthly subscription. A verified lifetime or three-month purchaser was
 * redirected to /billing before the (already-fixed) page/API-level checks
 * ever ran, because middleware executes first. The fix replaces the inline
 * duplicate with the real hasSatPremium() so there is exactly one
 * authoritative check.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'

const mockGetUser = vi.fn()

vi.mock('@supabase/ssr', () => ({
  createServerClient: vi.fn(() => ({
    auth: { getUser: mockGetUser },
  })),
}))

import { proxy } from '@/proxy'

function makeRequest(pathname: string) {
  return new NextRequest(new URL(pathname, 'https://mockmateapp.com'))
}

function makeUser(meta: Record<string, unknown> = {}, email = 'user@example.com') {
  return { id: 'user-1', email, user_metadata: meta }
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('proxy.ts — /sat-rw-academy/* premium gate', () => {
  it('allows an active lifetime purchaser through to a sub-route (the exact reported bug)', async () => {
    mockGetUser.mockResolvedValue({
      data: { user: makeUser({ sat_purchase_plan_type: 'lifetime', sat_purchase_status: 'active' }) },
    })
    const res = await proxy(makeRequest('/sat-rw-academy/diagnostic'))
    expect(res.status).not.toBe(307)
    expect(res.headers.get('location')).toBeNull()
  })

  it('allows an active, non-expired three-month purchaser through', async () => {
    const future = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString()
    mockGetUser.mockResolvedValue({
      data: { user: makeUser({ sat_purchase_plan_type: 'three_month', sat_purchase_status: 'active', sat_purchase_expires_at: future }) },
    })
    const res = await proxy(makeRequest('/sat-rw-academy/diagnostic'))
    expect(res.headers.get('location')).toBeNull()
  })

  it('redirects an expired three-month purchaser to /billing', async () => {
    const past = new Date(Date.now() - 1000).toISOString()
    mockGetUser.mockResolvedValue({
      data: { user: makeUser({ sat_purchase_plan_type: 'three_month', sat_purchase_status: 'active', sat_purchase_expires_at: past }) },
    })
    const res = await proxy(makeRequest('/sat-rw-academy/diagnostic'))
    expect(res.headers.get('location')).toContain('/billing')
  })

  it('allows an active monthly subscriber through (already worked pre-fix)', async () => {
    mockGetUser.mockResolvedValue({ data: { user: makeUser({ sat_subscription_status: 'active' }) } })
    const res = await proxy(makeRequest('/sat-rw-academy/diagnostic'))
    expect(res.headers.get('location')).toBeNull()
  })

  it('redirects a user with no purchase at all to /billing', async () => {
    mockGetUser.mockResolvedValue({ data: { user: makeUser({}) } })
    const res = await proxy(makeRequest('/sat-rw-academy/diagnostic'))
    expect(res.headers.get('location')).toContain('/billing')
  })

  it('redirects an unauthenticated request to /login', async () => {
    mockGetUser.mockResolvedValue({ data: { user: null } })
    const res = await proxy(makeRequest('/sat-rw-academy/diagnostic'))
    expect(res.headers.get('location')).toContain('/login')
  })

  it('does not gate the Academy course home (preview route)', async () => {
    mockGetUser.mockResolvedValue({ data: { user: makeUser({}) } })
    const res = await proxy(makeRequest('/sat-rw-academy'))
    expect(res.headers.get('location')).toBeNull()
  })
})

describe('proxy.ts — /sat-math-academy/* premium gate', () => {
  it('allows an active lifetime purchaser through to a sub-route', async () => {
    mockGetUser.mockResolvedValue({
      data: { user: makeUser({ sat_purchase_plan_type: 'lifetime', sat_purchase_status: 'active' }) },
    })
    const res = await proxy(makeRequest('/sat-math-academy/diagnostic'))
    expect(res.headers.get('location')).toBeNull()
  })

  it('redirects a user with no purchase at all to /billing', async () => {
    mockGetUser.mockResolvedValue({ data: { user: makeUser({}) } })
    const res = await proxy(makeRequest('/sat-math-academy/diagnostic'))
    expect(res.headers.get('location')).toContain('/billing')
  })
})
