/**
 * Regression tests — ensures existing flows are unaffected by the trial feature.
 *
 * All Supabase and Stripe calls are mocked.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'

// ── Hoisted mocks ─────────────────────────────────────────────────────────────

const {
  mockFrom,
  mockGetUserById,
  mockUpdateUserById,
  mockConstructEvent,
  mockListLineItems,
  mockRetrieveSubscription,
  mockUpdateBySession,
  mockUpdateBySubscription,
} = vi.hoisted(() => ({
  mockFrom: vi.fn(),
  mockGetUserById: vi.fn(),
  mockUpdateUserById: vi.fn(),
  mockConstructEvent: vi.fn(),
  mockListLineItems: vi.fn(),
  mockRetrieveSubscription: vi.fn(),
  mockUpdateBySession: vi.fn(),
  mockUpdateBySubscription: vi.fn(),
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
  createClient: vi.fn().mockResolvedValue({
    auth: { getUser: vi.fn().mockResolvedValue({ data: { user: null } }) },
  }),
}))

vi.mock('@/lib/stripe/client', () => ({
  getStripe: vi.fn(() => ({
    webhooks: { constructEvent: mockConstructEvent },
    checkout: {
      sessions: {
        listLineItems: mockListLineItems,
      },
    },
    subscriptions: { retrieve: mockRetrieveSubscription },
    customers: { retrieve: vi.fn() },
  })),
}))

vi.mock('@/lib/sat-trial/claims', () => ({
  updateTrialClaimBySession: mockUpdateBySession,
  updateTrialClaimBySubscription: mockUpdateBySubscription,
}))

// ── Helpers ───────────────────────────────────────────────────────────────────

function setupDbMocks(insertError: { code?: string; message?: string } | null = null) {
  const chain = {
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    order: vi.fn().mockReturnThis(),
    limit: vi.fn().mockReturnThis(),
    maybeSingle: vi.fn().mockResolvedValue({ data: null, error: null }),
    insert: vi.fn().mockResolvedValue({ error: insertError }),
    update: vi.fn().mockReturnThis(),
    upsert: vi.fn().mockResolvedValue({ error: null }),
  }
  mockFrom.mockReturnValue(chain)
  return chain
}

function makeWebhookRequest(body: unknown) {
  return new Request('http://localhost/api/stripe/webhook', {
    method: 'POST',
    headers: { 'stripe-signature': 'valid_sig', 'content-type': 'application/json' },
    body: JSON.stringify(body),
  })
}

function makeUser(meta: Record<string, unknown> = {}) {
  return { email: 'user@example.com', user_metadata: meta }
}

// ── Import after mocks ────────────────────────────────────────────────────────

import { POST } from '@/app/api/stripe/webhook/route'
import {
  hasSatPremium,
  hasActiveThreeMonthPurchase,
  hasLifetimePurchase,
  isAdminUser,
} from '@/lib/auth/server'
import { recordOneTimePurchase } from '@/lib/entitlements'

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('Regression — existing flows unaffected by trial feature', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    process.env.STRIPE_WEBHOOK_SECRET = 'whsec_test'
    process.env.STRIPE_SAT_PREMIUM_MONTHLY_PRICE_ID = 'price_monthly_test'
    process.env.STRIPE_SAT_PREMIUM_3_MONTH_PRICE_ID = 'price_3month_test'
    setupDbMocks()
    mockUpdateUserById.mockResolvedValue({ data: { user: {} }, error: null })
    mockGetUserById.mockResolvedValue({ data: { user: { user_metadata: {} } } })
    mockUpdateBySession.mockResolvedValue(undefined)
    mockUpdateBySubscription.mockResolvedValue(undefined)
  })

  // ── 1. Monthly purchase flow ─────────────────────────────────────────────────
  it('subscription checkout without is_trial still syncs subscription', async () => {
    const fakeEvent = {
      id: 'evt_monthly_r1',
      type: 'checkout.session.completed',
      data: {
        object: {
          id: 'cs_monthly_r1',
          mode: 'subscription',
          metadata: { mockmate_user_id: 'user-r1', product_key: 'sat_premium' },
          subscription: 'sub_r1',
          customer: 'cus_r1',
        },
      },
    }
    mockConstructEvent.mockReturnValue(fakeEvent)
    mockRetrieveSubscription.mockResolvedValue({
      id: 'sub_r1',
      status: 'active',
      items: { data: [{ price: { id: 'price_monthly_test', product: 'prod_1' } }] },
      cancel_at_period_end: false,
      canceled_at: null,
      ended_at: null,
    })

    const res = await POST(makeWebhookRequest(fakeEvent) as Parameters<typeof POST>[0])
    expect(res.status).toBe(200)
    expect(mockUpdateUserById).toHaveBeenCalledWith(
      'user-r1',
      expect.objectContaining({ user_metadata: expect.any(Object) })
    )
    expect(mockUpdateBySession).not.toHaveBeenCalled()
  })

  it('monthly subscriber has hasSatPremium:true via active status', () => {
    const user = makeUser({ sat_subscription_status: 'active' })
    expect(hasSatPremium(user)).toBe(true)
  })

  it('monthly subscription entitlement unchanged by trial feature imports', () => {
    // Importing trial claims should not break existing entitlement
    const user = makeUser({ sat_subscription_status: 'active' })
    expect(hasSatPremium(user)).toBe(true)
  })

  // ── 2. One-time purchase flow ─────────────────────────────────────────────────
  it('existing one-time lifetime purchase webhook still works', async () => {
    const fakeEvent = {
      id: 'evt_lifetime_r4',
      type: 'checkout.session.completed',
      data: {
        object: {
          id: 'cs_lifetime_r4',
          mode: 'payment',
          payment_status: 'paid',
          payment_intent: 'pi_r4',
          customer: 'cus_r4',
          metadata: {
            mockmate_user_id: 'user-r4',
            product_key: 'sat_premium',
            plan_type: 'lifetime',
          },
        },
      },
    }
    mockConstructEvent.mockReturnValue(fakeEvent)
    mockListLineItems.mockResolvedValue({ data: [{ price: { id: 'price_3month_test' } }] })
    setupDbMocks()

    const res = await POST(makeWebhookRequest(fakeEvent) as Parameters<typeof POST>[0])
    expect(res.status).toBe(200)
    expect(mockUpdateBySession).not.toHaveBeenCalled()
    expect(mockUpdateBySubscription).not.toHaveBeenCalled()
  })

  it('lifetime purchase still grants hasSatPremium:true', () => {
    const user = makeUser({ sat_purchase_plan_type: 'lifetime', sat_purchase_status: 'active' })
    expect(hasSatPremium(user)).toBe(true)
    expect(hasLifetimePurchase(user)).toBe(true)
  })

  it('three_month purchase still grants hasSatPremium:true with future expiry', () => {
    const future = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString()
    const user = makeUser({
      sat_purchase_plan_type: 'three_month',
      sat_purchase_status: 'active',
      sat_purchase_expires_at: future,
    })
    expect(hasSatPremium(user)).toBe(true)
    expect(hasActiveThreeMonthPurchase(user)).toBe(true)
  })

  // ── 3. Existing webhook idempotency ──────────────────────────────────────────
  it('existing idempotency guard still prevents duplicate processing', async () => {
    const fakeEvent = {
      id: 'evt_idem_r7',
      type: 'checkout.session.completed',
      data: { object: { id: 'cs_idem', mode: 'payment', payment_status: 'paid', metadata: {} } },
    }
    mockConstructEvent.mockReturnValue(fakeEvent)
    setupDbMocks({ code: '23505', message: 'duplicate key' })

    const res = await POST(makeWebhookRequest(fakeEvent) as Parameters<typeof POST>[0])
    expect(res.status).toBe(200)
    expect(mockUpdateUserById).not.toHaveBeenCalled()
  })

  // ── 4. Already-premium users are not eligible for trial ──────────────────────
  it('hasSatPremium returns true for existing premium — eligibility would reject them', () => {
    // Trial eligibility calls hasSatPremium — existing premium users are rejected
    const user = makeUser({ sat_purchase_plan_type: 'lifetime', sat_purchase_status: 'active' })
    expect(hasSatPremium(user)).toBe(true)
    // This is what getSatTrialEligibility checks — already_premium
  })

  it('trialing user also has hasSatPremium:true — they cannot claim another trial', () => {
    const user = makeUser({ sat_subscription_status: 'trialing' })
    expect(hasSatPremium(user)).toBe(true)
    // They also have a trial claim row — double-blocked
  })

  // ── 5. recordOneTimePurchase idempotency unaffected ──────────────────────────
  it('recordOneTimePurchase idempotency still works with 23505', async () => {
    setupDbMocks({ code: '23505', message: 'duplicate key' })
    const result = await recordOneTimePurchase('user-r14', {
      planType: 'lifetime',
      stripeCheckoutSessionId: 'cs_r14',
      accessStartedAt: new Date(),
      accessExpiresAt: null,
    })
    expect(result).toBe(false)
    expect(mockUpdateUserById).not.toHaveBeenCalled()
  })

  it('recordOneTimePurchase succeeds normally for new purchases', async () => {
    setupDbMocks()
    const result = await recordOneTimePurchase('user-r15', {
      planType: 'lifetime',
      stripeCheckoutSessionId: 'cs_r15',
      accessStartedAt: new Date(),
      accessExpiresAt: null,
    })
    expect(result).toBe(true)
    expect(mockUpdateUserById).toHaveBeenCalledWith(
      'user-r15',
      expect.objectContaining({ user_metadata: expect.any(Object) })
    )
  })

  // ── 6. Legacy sat_upgrade_unlocked unaffected ────────────────────────────────
  it('legacy sat_upgrade_unlocked flag still grants premium access', () => {
    const user = makeUser({ sat_upgrade_unlocked: true })
    expect(hasSatPremium(user)).toBe(true)
  })

  it('legacy user is not eligible for trial (hasSatPremium returns true for them)', () => {
    const user = makeUser({ sat_upgrade_unlocked: true })
    // getSatTrialEligibility would return already_premium for this user
    expect(hasSatPremium(user)).toBe(true)
  })

  // ── 7. Admin email still bypasses all checks ──────────────────────────────────
  it('admin email hasSatPremium:true regardless of metadata', () => {
    const admin = { email: 'ranvi.contact@gmail.com', user_metadata: {} }
    expect(hasSatPremium(admin)).toBe(true)
  })

  // ── 8. subscription.updated still syncs without trial side-effects ────────────
  it('customer.subscription.updated does not call trial helpers', async () => {
    const fakeEvent = {
      id: 'evt_updated_r19',
      type: 'customer.subscription.updated',
      data: {
        object: {
          id: 'sub_updated_r19',
          status: 'active',
          customer: 'cus_r19',
          items: { data: [{ price: { id: 'price_monthly_test', product: 'prod_1' } }] },
          metadata: { mockmate_user_id: 'user-r19' },
          cancel_at_period_end: false,
          canceled_at: null,
          ended_at: null,
        },
      },
    }
    mockConstructEvent.mockReturnValue(fakeEvent)

    await POST(makeWebhookRequest(fakeEvent) as Parameters<typeof POST>[0])
    expect(mockUpdateBySession).not.toHaveBeenCalled()
    // updateBySubscription is NOT called for subscription.updated (only on deleted and invoice.paid)
    expect(mockUpdateBySubscription).not.toHaveBeenCalled()
  })

  // ── 9. invoice.payment_failed still logs without trial side-effects ───────────
  it('invoice.payment_failed does not call trial helpers', async () => {
    const fakeEvent = {
      id: 'evt_payfailed_r20',
      type: 'invoice.payment_failed',
      data: {
        object: {
          id: 'in_failed',
          parent: { subscription_details: { subscription: 'sub_failed' } },
        },
      },
    }
    mockConstructEvent.mockReturnValue(fakeEvent)

    const res = await POST(makeWebhookRequest(fakeEvent) as Parameters<typeof POST>[0])
    expect(res.status).toBe(200)
    expect(mockUpdateBySession).not.toHaveBeenCalled()
    expect(mockUpdateBySubscription).not.toHaveBeenCalled()
  })

  // ── 10. hasSatPremium is deterministic ───────────────────────────────────────
  it('hasSatPremium returns same result for repeated calls on same object', () => {
    const user = makeUser({ sat_subscription_status: 'active' })
    expect(hasSatPremium(user)).toBe(hasSatPremium(user))
  })

  // ── 11. Free user with no metadata has no premium ────────────────────────────
  it('free user with completely empty metadata returns hasSatPremium:false', () => {
    const user = makeUser({})
    expect(hasSatPremium(user)).toBe(false)
  })

  // ── 12. Expired three_month is not premium ───────────────────────────────────
  it('expired three_month purchase is not premium (trial may be eligible)', () => {
    const past = new Date(Date.now() - 1000).toISOString()
    const user = makeUser({
      sat_purchase_plan_type: 'three_month',
      sat_purchase_status: 'active',
      sat_purchase_expires_at: past,
    })
    expect(hasSatPremium(user)).toBe(false)
  })

  // ── 13. Null user has no premium ────────────────────────────────────────────
  it('null user always returns hasSatPremium:false', () => {
    expect(hasSatPremium(null)).toBe(false)
  })

  // ── 14. isAdminUser check ────────────────────────────────────────────────────
  it('non-admin email is not an admin user', () => {
    expect(isAdminUser({ email: 'student@example.com', user_metadata: {} })).toBe(false)
  })

  // ── 15. past_due is still considered premium ─────────────────────────────────
  it('past_due subscription is treated as premium (within Stripe retry window)', () => {
    const user = makeUser({ sat_subscription_status: 'past_due' })
    expect(hasSatPremium(user)).toBe(true)
  })

  // ── 16. webhook 200 on unknown event type ────────────────────────────────────
  it('webhook returns 200 for completely unknown event types (no crash)', async () => {
    const fakeEvent = {
      id: 'evt_future_event',
      type: 'new.future.stripe.event',
      data: { object: { id: 'future_obj' } },
    }
    mockConstructEvent.mockReturnValue(fakeEvent)

    const res = await POST(makeWebhookRequest(fakeEvent) as Parameters<typeof POST>[0])
    expect(res.status).toBe(200)
  })
})
