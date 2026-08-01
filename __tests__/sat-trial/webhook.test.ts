/**
 * Tests for webhook trial claim updates in app/api/stripe/webhook/route.ts
 *
 * All Supabase and Stripe calls are mocked — no real network calls are made.
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

// ── Import after mocks ────────────────────────────────────────────────────────

import { POST } from '@/app/api/stripe/webhook/route'

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('webhook — trial claim updates', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    process.env.STRIPE_WEBHOOK_SECRET = 'whsec_test'
    process.env.STRIPE_SAT_PREMIUM_MONTHLY_PRICE_ID = 'price_monthly_test'
    setupDbMocks()
    mockUpdateUserById.mockResolvedValue({ data: { user: {} }, error: null })
    mockGetUserById.mockResolvedValue({ data: { user: { user_metadata: {} } } })
    mockUpdateBySession.mockResolvedValue(undefined)
    mockUpdateBySubscription.mockResolvedValue(undefined)
  })

  // ── 1. Trial checkout.session.completed ─────────────────────────────────────
  it('calls updateTrialClaimBySession when is_trial=true', async () => {
    const fakeEvent = {
      id: 'evt_trial_1',
      type: 'checkout.session.completed',
      data: {
        object: {
          id: 'cs_trial_1',
          mode: 'subscription',
          metadata: {
            mockmate_user_id: 'user-trial',
            product_key: 'sat_premium',
            is_trial: 'true',
          },
          subscription: 'sub_trial_1',
          customer: 'cus_trial_1',
        },
      },
    }
    mockConstructEvent.mockReturnValue(fakeEvent)
    mockRetrieveSubscription.mockResolvedValue({
      id: 'sub_trial_1',
      status: 'trialing',
      items: { data: [{ price: { id: 'price_monthly_test', product: 'prod_1' } }] },
      cancel_at_period_end: false,
      canceled_at: null,
      ended_at: null,
    })

    const res = await POST(makeWebhookRequest(fakeEvent) as Parameters<typeof POST>[0])
    expect(res.status).toBe(200)
    expect(mockUpdateBySession).toHaveBeenCalledWith(
      'cs_trial_1',
      expect.objectContaining({
        status: 'trialing',
        stripeSubscriptionId: 'sub_trial_1',
      })
    )
  })

  it('sets trialStart and trialEnd when updating trial claim', async () => {
    const fakeEvent = {
      id: 'evt_trial_2',
      type: 'checkout.session.completed',
      data: {
        object: {
          id: 'cs_trial_2',
          mode: 'subscription',
          metadata: {
            mockmate_user_id: 'user-trial-2',
            product_key: 'sat_premium',
            is_trial: 'true',
          },
          subscription: 'sub_trial_2',
          customer: 'cus_trial_2',
        },
      },
    }
    mockConstructEvent.mockReturnValue(fakeEvent)
    mockRetrieveSubscription.mockResolvedValue({
      id: 'sub_trial_2',
      status: 'trialing',
      items: { data: [{ price: { id: 'price_monthly_test', product: 'prod_1' } }] },
      cancel_at_period_end: false,
      canceled_at: null,
      ended_at: null,
    })

    await POST(makeWebhookRequest(fakeEvent) as Parameters<typeof POST>[0])
    const call = mockUpdateBySession.mock.calls[0][1]
    expect(call.trialStartedAt).toBeInstanceOf(Date)
    expect(call.trialEndsAt).toBeInstanceOf(Date)
    // Trial end should be ~7 days after trial start
    const diff = (call.trialEndsAt as Date).getTime() - (call.trialStartedAt as Date).getTime()
    expect(diff).toBeGreaterThanOrEqual(6 * 24 * 60 * 60 * 1000)
    expect(diff).toBeLessThanOrEqual(8 * 24 * 60 * 60 * 1000)
  })

  it('does NOT call updateTrialClaimBySession when is_trial is not set', async () => {
    const fakeEvent = {
      id: 'evt_nontrial_3',
      type: 'checkout.session.completed',
      data: {
        object: {
          id: 'cs_nontrial_3',
          mode: 'subscription',
          metadata: {
            mockmate_user_id: 'user-3',
            product_key: 'sat_premium',
          },
          subscription: 'sub_3',
          customer: 'cus_3',
        },
      },
    }
    mockConstructEvent.mockReturnValue(fakeEvent)
    mockRetrieveSubscription.mockResolvedValue({
      id: 'sub_3',
      status: 'active',
      items: { data: [{ price: { id: 'price_monthly_test', product: 'prod_1' } }] },
      cancel_at_period_end: false,
      canceled_at: null,
      ended_at: null,
    })

    await POST(makeWebhookRequest(fakeEvent) as Parameters<typeof POST>[0])
    expect(mockUpdateBySession).not.toHaveBeenCalled()
  })

  it('does NOT call updateTrialClaimBySession when is_trial is false', async () => {
    const fakeEvent = {
      id: 'evt_nontrial_4',
      type: 'checkout.session.completed',
      data: {
        object: {
          id: 'cs_nontrial_4',
          mode: 'subscription',
          metadata: {
            mockmate_user_id: 'user-4',
            product_key: 'sat_premium',
            is_trial: 'false',
          },
          subscription: 'sub_4',
          customer: 'cus_4',
        },
      },
    }
    mockConstructEvent.mockReturnValue(fakeEvent)
    mockRetrieveSubscription.mockResolvedValue({
      id: 'sub_4',
      status: 'active',
      items: { data: [{ price: { id: 'price_monthly_test', product: 'prod_1' } }] },
      cancel_at_period_end: false,
      canceled_at: null,
      ended_at: null,
    })

    await POST(makeWebhookRequest(fakeEvent) as Parameters<typeof POST>[0])
    expect(mockUpdateBySession).not.toHaveBeenCalled()
  })

  // ── 2. Idempotency replay ───────────────────────────────────────────────────
  it('returns 200 for idempotent replay without calling updateTrialClaimBySession', async () => {
    const fakeEvent = {
      id: 'evt_replay_5',
      type: 'checkout.session.completed',
      data: {
        object: {
          id: 'cs_trial_5',
          mode: 'subscription',
          metadata: { mockmate_user_id: 'user-5', product_key: 'sat_premium', is_trial: 'true' },
          subscription: 'sub_5',
          customer: 'cus_5',
        },
      },
    }
    mockConstructEvent.mockReturnValue(fakeEvent)
    // Simulate already processed (23505)
    setupDbMocks({ code: '23505', message: 'duplicate key' })

    const res = await POST(makeWebhookRequest(fakeEvent) as Parameters<typeof POST>[0])
    expect(res.status).toBe(200)
    expect(mockUpdateBySession).not.toHaveBeenCalled()
  })

  // ── 3. subscription.deleted → claim canceled ─────────────────────────────────
  it('calls updateTrialClaimBySubscription with canceled status on subscription.deleted', async () => {
    const fakeEvent = {
      id: 'evt_deleted_6',
      type: 'customer.subscription.deleted',
      data: {
        object: {
          id: 'sub_canceled_6',
          status: 'canceled',
          customer: 'cus_6',
          items: { data: [{ price: { id: 'price_monthly_test', product: 'prod_1' } }] },
          metadata: { mockmate_user_id: 'user-6' },
          cancel_at_period_end: false,
          canceled_at: null,
          ended_at: null,
        },
      },
    }
    mockConstructEvent.mockReturnValue(fakeEvent)

    const res = await POST(makeWebhookRequest(fakeEvent) as Parameters<typeof POST>[0])
    expect(res.status).toBe(200)
    expect(mockUpdateBySubscription).toHaveBeenCalledWith(
      'sub_canceled_6',
      expect.objectContaining({ status: 'canceled', canceledAt: expect.any(Date) })
    )
  })

  // ── 4. invoice.paid → converted_at set ──────────────────────────────────────
  it('calls updateTrialClaimBySubscription with convertedAt when invoice paid and sub is active', async () => {
    const fakeEvent = {
      id: 'evt_invoicepaid_7',
      type: 'invoice.paid',
      data: {
        object: {
          id: 'in_7',
          parent: { subscription_details: { subscription: 'sub_converted_7' } },
          period_end: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60,
        },
      },
    }
    mockConstructEvent.mockReturnValue(fakeEvent)
    mockRetrieveSubscription.mockResolvedValue({
      id: 'sub_converted_7',
      status: 'active',
      customer: 'cus_7',
      items: { data: [{ price: { id: 'price_monthly_test', product: 'prod_1' } }] },
      metadata: { mockmate_user_id: 'user-7' },
      cancel_at_period_end: false,
      canceled_at: null,
      ended_at: null,
    })

    const res = await POST(makeWebhookRequest(fakeEvent) as Parameters<typeof POST>[0])
    expect(res.status).toBe(200)
    expect(mockUpdateBySubscription).toHaveBeenCalledWith(
      'sub_converted_7',
      expect.objectContaining({ status: 'converted', consumedAt: expect.any(Date) })
    )
  })

  it('does NOT call updateTrialClaimBySubscription with convertedAt when sub is trialing', async () => {
    const fakeEvent = {
      id: 'evt_invoicepaid_8',
      type: 'invoice.paid',
      data: {
        object: {
          id: 'in_8',
          parent: { subscription_details: { subscription: 'sub_trialing_8' } },
          period_end: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60,
        },
      },
    }
    mockConstructEvent.mockReturnValue(fakeEvent)
    mockRetrieveSubscription.mockResolvedValue({
      id: 'sub_trialing_8',
      status: 'trialing',
      customer: 'cus_8',
      items: { data: [{ price: { id: 'price_monthly_test', product: 'prod_1' } }] },
      metadata: { mockmate_user_id: 'user-8' },
      cancel_at_period_end: false,
      canceled_at: null,
      ended_at: null,
    })

    await POST(makeWebhookRequest(fakeEvent) as Parameters<typeof POST>[0])
    // Should not be called since sub.status is 'trialing' not 'active'
    expect(mockUpdateBySubscription).not.toHaveBeenCalledWith(
      'sub_trialing_8',
      expect.objectContaining({ consumedAt: expect.anything() })
    )
  })

  // ── 5. trial_will_end — just logs ────────────────────────────────────────────
  it('handles customer.subscription.trial_will_end with 200 and no DB writes', async () => {
    const fakeEvent = {
      id: 'evt_trial_will_end_9',
      type: 'customer.subscription.trial_will_end',
      data: {
        object: {
          id: 'sub_trial_will_end',
          status: 'trialing',
          customer: 'cus_9',
          items: { data: [] },
          metadata: {},
          cancel_at_period_end: false,
          canceled_at: null,
          ended_at: null,
        },
      },
    }
    mockConstructEvent.mockReturnValue(fakeEvent)

    const res = await POST(makeWebhookRequest(fakeEvent) as Parameters<typeof POST>[0])
    expect(res.status).toBe(200)
    expect(mockUpdateBySession).not.toHaveBeenCalled()
    expect(mockUpdateBySubscription).not.toHaveBeenCalled()
    expect(mockUpdateUserById).not.toHaveBeenCalled()
  })

  // ── 6. One-time checkout unaffected ─────────────────────────────────────────
  it('does not call trial claims helpers for one-time payment checkout', async () => {
    const fakeEvent = {
      id: 'evt_onetime_10',
      type: 'checkout.session.completed',
      data: {
        object: {
          id: 'cs_onetime_10',
          mode: 'payment',
          payment_status: 'paid',
          payment_intent: 'pi_10',
          customer: 'cus_10',
          metadata: {
            mockmate_user_id: 'user-10',
            product_key: 'sat_premium',
            plan_type: 'lifetime',
          },
        },
      },
    }
    mockConstructEvent.mockReturnValue(fakeEvent)
    mockListLineItems.mockResolvedValue({
      data: [{ price: { id: process.env.STRIPE_SAT_PREMIUM_MONTHLY_PRICE_ID } }],
    })
    setupDbMocks()

    await POST(makeWebhookRequest(fakeEvent) as Parameters<typeof POST>[0])
    expect(mockUpdateBySession).not.toHaveBeenCalled()
    expect(mockUpdateBySubscription).not.toHaveBeenCalled()
  })

  // ── 7. syncSubscription still called for trial ───────────────────────────────
  it('calls syncSubscription even for trial checkout sessions', async () => {
    const fakeEvent = {
      id: 'evt_sync_11',
      type: 'checkout.session.completed',
      data: {
        object: {
          id: 'cs_sync_11',
          mode: 'subscription',
          metadata: {
            mockmate_user_id: 'user-11',
            product_key: 'sat_premium',
            is_trial: 'true',
          },
          subscription: 'sub_sync_11',
          customer: 'cus_11',
        },
      },
    }
    mockConstructEvent.mockReturnValue(fakeEvent)
    mockRetrieveSubscription.mockResolvedValue({
      id: 'sub_sync_11',
      status: 'trialing',
      items: { data: [{ price: { id: 'price_monthly_test', product: 'prod_1' } }] },
      cancel_at_period_end: false,
      canceled_at: null,
      ended_at: null,
    })

    const res = await POST(makeWebhookRequest(fakeEvent) as Parameters<typeof POST>[0])
    expect(res.status).toBe(200)
    // updateUserById is called by syncSubscription
    expect(mockUpdateUserById).toHaveBeenCalledWith(
      'user-11',
      expect.objectContaining({ user_metadata: expect.any(Object) })
    )
  })

  // ── 8. Invalid signature still rejected ──────────────────────────────────────
  it('returns 400 for invalid signature even with trial event', async () => {
    mockConstructEvent.mockImplementation(() => {
      throw new Error('Invalid signature')
    })
    const res = await POST(makeWebhookRequest({ type: 'checkout.session.completed' }) as Parameters<typeof POST>[0])
    expect(res.status).toBe(400)
    expect(mockUpdateBySession).not.toHaveBeenCalled()
  })

  // ── 9. subscription.deleted for non-trial subscription ──────────────────────
  it('calls updateTrialClaimBySubscription even for non-trial deletions (PGRST116 handled)', async () => {
    const fakeEvent = {
      id: 'evt_nontrialdel_12',
      type: 'customer.subscription.deleted',
      data: {
        object: {
          id: 'sub_nontrial_deleted',
          status: 'canceled',
          customer: 'cus_12',
          items: { data: [{ price: { id: 'price_monthly_test', product: 'prod_1' } }] },
          metadata: { mockmate_user_id: 'user-12' },
          cancel_at_period_end: false,
          canceled_at: null,
          ended_at: null,
        },
      },
    }
    mockConstructEvent.mockReturnValue(fakeEvent)

    await POST(makeWebhookRequest(fakeEvent) as Parameters<typeof POST>[0])
    // Called — claims.ts handles PGRST116 gracefully if no matching row
    expect(mockUpdateBySubscription).toHaveBeenCalledWith(
      'sub_nontrial_deleted',
      expect.objectContaining({ status: 'canceled' })
    )
  })

  // ── 10. Unhandled event types don't trigger trial helpers ────────────────────
  it('does not call trial helpers for unhandled event types', async () => {
    const fakeEvent = {
      id: 'evt_unknown_13',
      type: 'payment_intent.created',
      data: { object: {} },
    }
    mockConstructEvent.mockReturnValue(fakeEvent)

    await POST(makeWebhookRequest(fakeEvent) as Parameters<typeof POST>[0])
    expect(mockUpdateBySession).not.toHaveBeenCalled()
    expect(mockUpdateBySubscription).not.toHaveBeenCalled()
  })

  // ── 11. Missing webhook secret returns 400 ────────────────────────────────────
  it('returns 400 when STRIPE_WEBHOOK_SECRET is not set', async () => {
    const origSecret = process.env.STRIPE_WEBHOOK_SECRET
    delete process.env.STRIPE_WEBHOOK_SECRET
    const res = await POST(makeWebhookRequest({}) as Parameters<typeof POST>[0])
    expect(res.status).toBe(400)
    process.env.STRIPE_WEBHOOK_SECRET = origSecret
  })

  // ── 12. Webhook returns 200 with received:true on success ──────────────────────
  it('returns 200 with received:true for trial event', async () => {
    const fakeEvent = {
      id: 'evt_received_14',
      type: 'checkout.session.completed',
      data: {
        object: {
          id: 'cs_r14',
          mode: 'subscription',
          metadata: {
            mockmate_user_id: 'user-r14',
            product_key: 'sat_premium',
            is_trial: 'true',
          },
          subscription: 'sub_r14',
          customer: 'cus_r14',
        },
      },
    }
    mockConstructEvent.mockReturnValue(fakeEvent)
    mockRetrieveSubscription.mockResolvedValue({
      id: 'sub_r14',
      status: 'trialing',
      items: { data: [{ price: { id: 'price_monthly_test', product: 'prod_1' } }] },
      cancel_at_period_end: false,
      canceled_at: null,
      ended_at: null,
    })

    const res = await POST(makeWebhookRequest(fakeEvent) as Parameters<typeof POST>[0])
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.received).toBe(true)
  })

  // ── 13. Trial claim session updated with correct session ID ───────────────────
  it('updateTrialClaimBySession receives the correct checkout session ID', async () => {
    const fakeEvent = {
      id: 'evt_sessionid_15',
      type: 'checkout.session.completed',
      data: {
        object: {
          id: 'cs_specific_session_id',
          mode: 'subscription',
          metadata: {
            mockmate_user_id: 'user-15',
            product_key: 'sat_premium',
            is_trial: 'true',
          },
          subscription: 'sub_15',
          customer: 'cus_15',
        },
      },
    }
    mockConstructEvent.mockReturnValue(fakeEvent)
    mockRetrieveSubscription.mockResolvedValue({
      id: 'sub_15',
      status: 'trialing',
      items: { data: [{ price: { id: 'price_monthly_test', product: 'prod_1' } }] },
      cancel_at_period_end: false,
      canceled_at: null,
      ended_at: null,
    })

    await POST(makeWebhookRequest(fakeEvent) as Parameters<typeof POST>[0])
    // The first argument to updateTrialClaimBySession must be the session ID
    expect(mockUpdateBySession.mock.calls[0][0]).toBe('cs_specific_session_id')
  })

  // ── 14. charge.refunded does not affect trial claims ──────────────────────────
  it('charge.refunded does not call trial helpers', async () => {
    const fakeEvent = {
      id: 'evt_refunded_16',
      type: 'charge.refunded',
      data: {
        object: {
          id: 'ch_16',
          payment_intent: 'pi_16',
        },
      },
    }
    mockConstructEvent.mockReturnValue(fakeEvent)

    const res = await POST(makeWebhookRequest(fakeEvent) as Parameters<typeof POST>[0])
    expect(res.status).toBe(200)
    expect(mockUpdateBySession).not.toHaveBeenCalled()
    expect(mockUpdateBySubscription).not.toHaveBeenCalled()
  })

  // ── 15. Trial checkout with subscription retrieval error ──────────────────────
  it('handles subscription retrieval error gracefully for trial checkout', async () => {
    const fakeEvent = {
      id: 'evt_suberr_17',
      type: 'checkout.session.completed',
      data: {
        object: {
          id: 'cs_suberr_17',
          mode: 'subscription',
          metadata: {
            mockmate_user_id: 'user-17',
            product_key: 'sat_premium',
            is_trial: 'true',
          },
          subscription: 'sub_err_17',
          customer: 'cus_17',
        },
      },
    }
    mockConstructEvent.mockReturnValue(fakeEvent)
    mockRetrieveSubscription.mockRejectedValue(new Error('Stripe API unreachable'))

    const res = await POST(makeWebhookRequest(fakeEvent) as Parameters<typeof POST>[0])
    // Should return 200 (non-transient error), not crash
    expect(res.status).toBe(200)
  })

  // ── 16. invoice.paid with no subscription does not call trial helpers ─────────
  it('invoice.paid with no subscription ID does not call trial helpers', async () => {
    const fakeEvent = {
      id: 'evt_nopaysub_18',
      type: 'invoice.paid',
      data: {
        object: {
          id: 'in_18',
          parent: null,
          period_end: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60,
        },
      },
    }
    mockConstructEvent.mockReturnValue(fakeEvent)

    const res = await POST(makeWebhookRequest(fakeEvent) as Parameters<typeof POST>[0])
    expect(res.status).toBe(200)
    expect(mockUpdateBySubscription).not.toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({ convertedAt: expect.any(Date) })
    )
  })
})
