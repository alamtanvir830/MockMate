/**
 * Tests for POST /api/stripe/create-trial-checkout
 *
 * All Supabase and Stripe calls are mocked — no real network calls are made.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'

// ── Hoisted mocks (must be before vi.mock calls that reference them) ───────────

const {
  mockFrom,
  mockGetUserById,
  mockUpdateUserById,
  mockGetUser,
  mockPricesRetrieve,
  mockCustomersRetrieve,
  mockCustomersCreate,
  mockSessionsCreate,
  mockGetEligibility,
} = vi.hoisted(() => ({
  mockFrom: vi.fn(),
  mockGetUserById: vi.fn(),
  mockUpdateUserById: vi.fn(),
  mockGetUser: vi.fn(),
  mockPricesRetrieve: vi.fn(),
  mockCustomersRetrieve: vi.fn(),
  mockCustomersCreate: vi.fn(),
  mockSessionsCreate: vi.fn(),
  mockGetEligibility: vi.fn(),
}))

vi.mock('@/lib/supabase/admin', () => ({
  createAdminClient: vi.fn(() => ({
    from: mockFrom,
    auth: {
      admin: {
        getUserById: mockGetUserById,
        updateUserById: mockUpdateUserById,
      },
    },
  })),
}))

vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn().mockImplementation(() => Promise.resolve({
    auth: { getUser: mockGetUser },
  })),
}))

vi.mock('@/lib/stripe/client', () => ({
  getStripe: vi.fn(() => ({
    prices: { retrieve: mockPricesRetrieve },
    customers: { retrieve: mockCustomersRetrieve, create: mockCustomersCreate },
    checkout: { sessions: { create: mockSessionsCreate } },
  })),
}))

vi.mock('@/lib/sat-trial/eligibility', () => ({
  getSatTrialEligibility: mockGetEligibility,
}))

// ── Helpers ───────────────────────────────────────────────────────────────────

function makeRequest() {
  return new Request('http://localhost/api/stripe/create-trial-checkout', {
    method: 'POST',
  })
}

function makeUpdateChain() {
  // The endpoint does: .update({...}).eq(...).eq(...) — two chained eq() calls.
  // The last awaitable is the second eq() which must resolve to { error: null }.
  const terminal = Promise.resolve({ error: null })
  const inner = {
    eq: vi.fn().mockReturnValue(terminal),
  }
  const outer = {
    eq: vi.fn().mockReturnValue(inner),
  }
  return outer
}

function makeDbChain(insertResult = { error: null }, selectData: Record<string, unknown> | null = null) {
  const chain = {
    insert: vi.fn().mockResolvedValue(insertResult),
    update: vi.fn().mockReturnValue(makeUpdateChain()),
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    maybeSingle: vi.fn().mockResolvedValue({ data: selectData, error: null }),
  }
  return chain
}

function validPrice() {
  return {
    unit_amount: 999,
    currency: 'usd',
    type: 'recurring',
    recurring: { interval: 'month' },
  }
}

// ── Import after mocks ────────────────────────────────────────────────────────

import { POST } from '@/app/api/stripe/create-trial-checkout/route'

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('POST /api/stripe/create-trial-checkout', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    process.env.STRIPE_SAT_PREMIUM_MONTHLY_PRICE_ID = 'price_test_monthly'
    process.env.NEXT_PUBLIC_APP_URL = 'http://localhost:3000'
    mockGetEligibility.mockResolvedValue({ eligible: true, reason: 'eligible' })
    mockPricesRetrieve.mockResolvedValue(validPrice())
    mockCustomersRetrieve.mockResolvedValue({ id: 'cus_existing', deleted: false })
    mockCustomersCreate.mockResolvedValue({ id: 'cus_new' })
    mockSessionsCreate.mockResolvedValue({ id: 'cs_test', url: 'https://checkout.stripe.com/test' })
    mockGetUserById.mockResolvedValue({ data: { user: { user_metadata: { stripe_customer_id: 'cus_existing' } } } })
    mockUpdateUserById.mockResolvedValue({ data: { user: {} }, error: null })
    mockGetUser.mockResolvedValue({ data: { user: { id: 'user-1', email: 'user@example.com' } } })
  })

  // ── 1. Auth required ────────────────────────────────────────────────────────
  it('returns 401 when user is not signed in', async () => {
    mockGetUser.mockResolvedValue({ data: { user: null } })
    const res = await POST(makeRequest() as Parameters<typeof POST>[0])
    expect(res.status).toBe(401)
    const body = await res.json()
    expect(body.error).toContain('signed in')
  })

  it('does not call eligibility check for unauthenticated users', async () => {
    mockGetUser.mockResolvedValue({ data: { user: null } })
    await POST(makeRequest() as Parameters<typeof POST>[0])
    expect(mockGetEligibility).not.toHaveBeenCalled()
  })

  // ── 2. Admin blocked ────────────────────────────────────────────────────────
  it('returns 400 for admin user', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: 'admin-1', email: 'ranvi.contact@gmail.com' } } })
    const res = await POST(makeRequest() as Parameters<typeof POST>[0])
    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body.error).toContain('Admin')
  })

  it('does not call eligibility check for admin users', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: 'admin-1', email: 'ranvi.contact@gmail.com' } } })
    await POST(makeRequest() as Parameters<typeof POST>[0])
    expect(mockGetEligibility).not.toHaveBeenCalled()
  })

  // ── 3. Eligibility failures ─────────────────────────────────────────────────
  it('returns 400 with already_premium message', async () => {
    mockGetEligibility.mockResolvedValue({ eligible: false, reason: 'already_premium' })
    const res = await POST(makeRequest() as Parameters<typeof POST>[0])
    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body.error).toContain('already have SAT Premium')
  })

  it('returns 400 with trial_already_claimed message', async () => {
    mockGetEligibility.mockResolvedValue({ eligible: false, reason: 'trial_already_claimed' })
    const res = await POST(makeRequest() as Parameters<typeof POST>[0])
    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body.error).toContain('already claimed')
  })

  it('returns 400 with no_completed_exam message', async () => {
    mockGetEligibility.mockResolvedValue({ eligible: false, reason: 'no_completed_exam' })
    const res = await POST(makeRequest() as Parameters<typeof POST>[0])
    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body.error).toContain('practice exam')
  })

  it('returns 400 with user_not_found message', async () => {
    mockGetEligibility.mockResolvedValue({ eligible: false, reason: 'user_not_found' })
    const res = await POST(makeRequest() as Parameters<typeof POST>[0])
    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body.error).toContain('Account not found')
  })

  it('returns 400 for unknown ineligibility reason with fallback message', async () => {
    mockGetEligibility.mockResolvedValue({ eligible: false, reason: 'unknown_reason' })
    const res = await POST(makeRequest() as Parameters<typeof POST>[0])
    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body.error).toBeTruthy()
  })

  // ── 4. Missing env var ──────────────────────────────────────────────────────
  it('returns 500 when STRIPE_SAT_PREMIUM_MONTHLY_PRICE_ID is not set', async () => {
    delete process.env.STRIPE_SAT_PREMIUM_MONTHLY_PRICE_ID
    const res = await POST(makeRequest() as Parameters<typeof POST>[0])
    expect(res.status).toBe(500)
    const body = await res.json()
    expect(body.error).toContain('not available')
  })

  // ── 5. Stripe price validation ──────────────────────────────────────────────
  it('returns 500 when price amount does not match $9.99', async () => {
    mockPricesRetrieve.mockResolvedValue({ ...validPrice(), unit_amount: 1999 })
    const res = await POST(makeRequest() as Parameters<typeof POST>[0])
    expect(res.status).toBe(500)
    const body = await res.json()
    expect(body.error).toContain('Pricing configuration error')
  })

  it('returns 500 when price currency is not usd', async () => {
    mockPricesRetrieve.mockResolvedValue({ ...validPrice(), currency: 'eur' })
    const res = await POST(makeRequest() as Parameters<typeof POST>[0])
    expect(res.status).toBe(500)
  })

  it('returns 500 when price type is not recurring', async () => {
    mockPricesRetrieve.mockResolvedValue({ ...validPrice(), type: 'one_time' })
    const res = await POST(makeRequest() as Parameters<typeof POST>[0])
    expect(res.status).toBe(500)
  })

  it('returns 500 when price interval is not month', async () => {
    mockPricesRetrieve.mockResolvedValue({ ...validPrice(), recurring: { interval: 'year' } })
    const res = await POST(makeRequest() as Parameters<typeof POST>[0])
    expect(res.status).toBe(500)
  })

  it('returns 500 when Stripe prices.retrieve throws', async () => {
    mockPricesRetrieve.mockRejectedValue(new Error('Stripe API error'))
    const res = await POST(makeRequest() as Parameters<typeof POST>[0])
    expect(res.status).toBe(500)
    const body = await res.json()
    expect(body.error).toContain('Unable to verify pricing')
  })

  // ── 6. Race condition / double-claim prevention ─────────────────────────────
  it('returns 400 when DB insert returns 23505 and no existing session to recover', async () => {
    // First from() = insert chain (23505 error)
    const insertChain = makeDbChain({ error: { code: '23505', message: 'duplicate key' } })
    // Second from() = select chain (claim row has no stripe_checkout_session_id)
    const selectChain = makeDbChain({ error: null }, { stripe_checkout_session_id: null, status: 'pending' })
    mockFrom
      .mockReturnValueOnce(insertChain)
      .mockReturnValueOnce(selectChain)
    const res = await POST(makeRequest() as Parameters<typeof POST>[0])
    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body.error).toContain('already claimed')
  })

  it('returns 400 when 23505 and existing pending session is not retrievable (double-click fallback)', async () => {
    // First from() = insert (23505 error)
    const insertChain = makeDbChain({ error: { code: '23505', message: 'duplicate key' } })
    // Second from() = select (has a session ID in status pending)
    const selectChain = makeDbChain({ error: null }, { stripe_checkout_session_id: 'cs_pending', status: 'pending' })
    mockFrom
      .mockReturnValueOnce(insertChain)
      .mockReturnValueOnce(selectChain)
    // sessions.retrieve is not in the mock (only sessions.create is).
    // The endpoint's try/catch will catch the TypeError from undefined property
    // and fall through to the "already claimed" 400 response.
    const res = await POST(makeRequest() as Parameters<typeof POST>[0])
    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body.error).toContain('already claimed')
  })

  it('returns 500 when DB insert returns non-23505 error', async () => {
    const chain = makeDbChain({ error: { code: '500', message: 'db error' } })
    mockFrom.mockReturnValue(chain)
    const res = await POST(makeRequest() as Parameters<typeof POST>[0])
    expect(res.status).toBe(500)
    const body = await res.json()
    expect(body.error).toContain('Failed to start trial')
  })

  // ── 7. Customer creation / reuse ────────────────────────────────────────────
  it('reuses existing Stripe customer when stripe_customer_id is in metadata', async () => {
    mockGetUserById.mockResolvedValue({
      data: { user: { user_metadata: { stripe_customer_id: 'cus_existing' } } },
    })
    mockCustomersRetrieve.mockResolvedValue({ id: 'cus_existing', deleted: false })
    const chain = makeDbChain()
    mockFrom.mockReturnValue(chain)
    const res = await POST(makeRequest() as Parameters<typeof POST>[0])
    expect(res.status).toBe(200)
    expect(mockCustomersCreate).not.toHaveBeenCalled()
  })

  it('creates new customer when no existing customer ID in metadata', async () => {
    mockGetUserById.mockResolvedValue({ data: { user: { user_metadata: {} } } })
    const chain = makeDbChain()
    mockFrom.mockReturnValue(chain)
    const res = await POST(makeRequest() as Parameters<typeof POST>[0])
    expect(res.status).toBe(200)
    expect(mockCustomersCreate).toHaveBeenCalledWith(
      expect.objectContaining({ email: 'user@example.com', metadata: { mockmate_user_id: 'user-1' } })
    )
  })

  it('creates new customer when existing customer is deleted on Stripe', async () => {
    mockGetUserById.mockResolvedValue({
      data: { user: { user_metadata: { stripe_customer_id: 'cus_deleted' } } },
    })
    mockCustomersRetrieve.mockResolvedValue({ id: 'cus_deleted', deleted: true })
    const chain = makeDbChain()
    mockFrom.mockReturnValue(chain)
    await POST(makeRequest() as Parameters<typeof POST>[0])
    expect(mockCustomersCreate).toHaveBeenCalled()
  })

  it('creates new customer when customers.retrieve throws', async () => {
    mockGetUserById.mockResolvedValue({
      data: { user: { user_metadata: { stripe_customer_id: 'cus_error' } } },
    })
    mockCustomersRetrieve.mockRejectedValue(new Error('Not found'))
    const chain = makeDbChain()
    mockFrom.mockReturnValue(chain)
    await POST(makeRequest() as Parameters<typeof POST>[0])
    expect(mockCustomersCreate).toHaveBeenCalled()
  })

  it('writes new stripe_customer_id to user metadata after creation', async () => {
    mockGetUserById.mockResolvedValue({ data: { user: { user_metadata: {} } } })
    mockCustomersCreate.mockResolvedValue({ id: 'cus_brand_new' })
    const chain = makeDbChain()
    mockFrom.mockReturnValue(chain)
    await POST(makeRequest() as Parameters<typeof POST>[0])
    expect(mockUpdateUserById).toHaveBeenCalledWith(
      'user-1',
      expect.objectContaining({ user_metadata: { stripe_customer_id: 'cus_brand_new' } })
    )
  })

  // ── 8. Success case ─────────────────────────────────────────────────────────
  it('returns 200 with session url on success', async () => {
    const chain = makeDbChain()
    mockFrom.mockReturnValue(chain)
    const res = await POST(makeRequest() as Parameters<typeof POST>[0])
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.url).toBe('https://checkout.stripe.com/test')
  })

  it('creates session with trial_period_days: 7', async () => {
    const chain = makeDbChain()
    mockFrom.mockReturnValue(chain)
    await POST(makeRequest() as Parameters<typeof POST>[0])
    expect(mockSessionsCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        subscription_data: expect.objectContaining({ trial_period_days: 7 }),
      })
    )
  })

  it('sets is_trial: true in metadata', async () => {
    const chain = makeDbChain()
    mockFrom.mockReturnValue(chain)
    await POST(makeRequest() as Parameters<typeof POST>[0])
    expect(mockSessionsCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        metadata: expect.objectContaining({ is_trial: 'true' }),
      })
    )
  })

  it('sets product_key: sat_premium in metadata', async () => {
    const chain = makeDbChain()
    mockFrom.mockReturnValue(chain)
    await POST(makeRequest() as Parameters<typeof POST>[0])
    expect(mockSessionsCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        metadata: expect.objectContaining({ product_key: 'sat_premium' }),
      })
    )
  })

  it('sets success_url with session_id placeholder', async () => {
    const chain = makeDbChain()
    mockFrom.mockReturnValue(chain)
    await POST(makeRequest() as Parameters<typeof POST>[0])
    expect(mockSessionsCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        success_url: expect.stringContaining('{CHECKOUT_SESSION_ID}'),
      })
    )
  })

  it('sets cancel_url to free-trial page', async () => {
    const chain = makeDbChain()
    mockFrom.mockReturnValue(chain)
    await POST(makeRequest() as Parameters<typeof POST>[0])
    expect(mockSessionsCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        cancel_url: expect.stringContaining('free-trial'),
      })
    )
  })

  it('sets mode to subscription', async () => {
    const chain = makeDbChain()
    mockFrom.mockReturnValue(chain)
    await POST(makeRequest() as Parameters<typeof POST>[0])
    expect(mockSessionsCreate).toHaveBeenCalledWith(
      expect.objectContaining({ mode: 'subscription' })
    )
  })

  it('returns 500 when stripe session creation throws', async () => {
    const chain = makeDbChain()
    mockFrom.mockReturnValue(chain)
    mockSessionsCreate.mockRejectedValue(new Error('Stripe down'))
    const res = await POST(makeRequest() as Parameters<typeof POST>[0])
    expect(res.status).toBe(500)
  })
})
