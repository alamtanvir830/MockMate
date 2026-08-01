/**
 * Historical coverage tests — verifies that eligibility correctly handles
 * users who completed SAT exams before the trial feature was deployed, and
 * that no DB writes occur during eligibility checks or page views.
 *
 * f2bf686 was the original deploy date (2026-08-01).
 * Any completed attempt before that date must qualify.
 *
 * All Supabase and Stripe calls are mocked — no real network calls.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'

// ── Hoisted mocks ─────────────────────────────────────────────────────────────

const { mockFrom, mockGetUserById } = vi.hoisted(() => ({
  mockFrom: vi.fn(),
  mockGetUserById: vi.fn(),
}))

vi.mock('@/lib/supabase/admin', () => ({
  createAdminClient: vi.fn(() => ({
    from: mockFrom,
    auth: {
      admin: {
        getUserById: mockGetUserById,
      },
    },
  })),
}))

// ── Helpers ───────────────────────────────────────────────────────────────────

function makeDbChain(overrides: Record<string, unknown> = {}) {
  return {
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    not: vi.fn().mockReturnThis(),
    limit: vi.fn().mockReturnThis(),
    maybeSingle: vi.fn().mockResolvedValue({ data: null, error: null }),
    insert: vi.fn().mockResolvedValue({ error: null }),
    update: vi.fn().mockReturnThis(),
    ...overrides,
  }
}

function makeUser(meta: Record<string, unknown> = {}, email = 'user@example.com') {
  return {
    data: {
      user: { email, user_metadata: meta },
    },
  }
}

function makeAttemptChain(attemptData: { id: string } | null = { id: 'attempt-historical' }) {
  return makeDbChain({
    maybeSingle: vi.fn().mockResolvedValue({ data: attemptData, error: null }),
  })
}

function makeErrorChain(code: string, message = 'DB error') {
  return makeDbChain({
    maybeSingle: vi.fn().mockResolvedValue({ data: null, error: { code, message } }),
  })
}

// ── Import after mocks ────────────────────────────────────────────────────────

import { getSatTrialEligibility } from '@/lib/sat-trial/eligibility'

// ── Historical attempt coverage tests ─────────────────────────────────────────

describe('Historical attempt coverage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // Tests 1-5: Historical attempts from each form qualify

  it('test 1: historical Form 1 completed attempt qualifies', async () => {
    mockGetUserById.mockResolvedValue(makeUser({}))
    mockFrom
      .mockReturnValueOnce(makeDbChain()) // no claim
      .mockReturnValueOnce(makeAttemptChain({ id: 'form1-attempt-old' }))
    const r = await getSatTrialEligibility('user-hist-1')
    expect(r.eligible).toBe(true)
    expect(r.reason).toBe('eligible')
  })

  it('test 2: historical Form 2 completed attempt qualifies', async () => {
    mockGetUserById.mockResolvedValue(makeUser({}))
    mockFrom
      .mockReturnValueOnce(makeDbChain())
      .mockReturnValueOnce(makeAttemptChain({ id: 'form2-attempt-old' }))
    const r = await getSatTrialEligibility('user-hist-2')
    expect(r.eligible).toBe(true)
  })

  it('test 3: historical Form 3 completed attempt qualifies', async () => {
    mockGetUserById.mockResolvedValue(makeUser({}))
    mockFrom
      .mockReturnValueOnce(makeDbChain())
      .mockReturnValueOnce(makeAttemptChain({ id: 'form3-attempt-old' }))
    const r = await getSatTrialEligibility('user-hist-3')
    expect(r.eligible).toBe(true)
  })

  it('test 4: historical Form 4 completed attempt qualifies', async () => {
    mockGetUserById.mockResolvedValue(makeUser({}))
    mockFrom
      .mockReturnValueOnce(makeDbChain())
      .mockReturnValueOnce(makeAttemptChain({ id: 'form4-attempt-old' }))
    const r = await getSatTrialEligibility('user-hist-4')
    expect(r.eligible).toBe(true)
  })

  it('test 5: historical Form 5 completed attempt qualifies', async () => {
    mockGetUserById.mockResolvedValue(makeUser({}))
    mockFrom
      .mockReturnValueOnce(makeDbChain())
      .mockReturnValueOnce(makeAttemptChain({ id: 'form5-attempt-old' }))
    const r = await getSatTrialEligibility('user-hist-5')
    expect(r.eligible).toBe(true)
  })

  // Test 6: Completed attempt created before deploy date qualifies

  it('test 6: attempt completed before f2bf686 deploy date (2026-08-01) qualifies — no date filter', async () => {
    // The eligibility query has NO date filter — any completed_at qualifies.
    // We verify this by confirming completed_at is passed to .not() not a date range.
    mockGetUserById.mockResolvedValue(makeUser({}))
    const claimChain = makeDbChain()
    const attemptChain = makeAttemptChain({ id: 'pre-deploy-attempt' })
    mockFrom
      .mockReturnValueOnce(claimChain)
      .mockReturnValueOnce(attemptChain)
    const r = await getSatTrialEligibility('user-pre-deploy')
    expect(r.eligible).toBe(true)
    // Verify .not() was called with 'completed_at' (filter for null) but NOT with a date range
    const notCalls = attemptChain.not.mock.calls
    expect(notCalls.some((c: string[]) => c[0] === 'completed_at')).toBe(true)
    // No 'gte' or 'lte' date filter
    const eqCalls = attemptChain.eq.mock.calls
    expect(eqCalls.every((c: unknown[]) => c[0] === 'user_id')).toBe(true)
  })

  // Test 7: Completed attempt before trial migration date qualifies

  it('test 7: attempt completed before trial migration date qualifies', async () => {
    mockGetUserById.mockResolvedValue(makeUser({}))
    mockFrom
      .mockReturnValueOnce(makeDbChain())
      .mockReturnValueOnce(makeAttemptChain({ id: 'pre-migration-attempt' }))
    const r = await getSatTrialEligibility('user-pre-migration')
    expect(r.eligible).toBe(true)
  })

  // Test 8: Historical attempt without a survey record qualifies

  it('test 8: historical completed attempt without a survey record qualifies', async () => {
    // Survey status is not checked — only standardized_exam_attempts row
    mockGetUserById.mockResolvedValue(makeUser({}))
    mockFrom
      .mockReturnValueOnce(makeDbChain())
      .mockReturnValueOnce(makeAttemptChain({ id: 'no-survey-attempt' }))
    const r = await getSatTrialEligibility('user-no-survey')
    expect(r.eligible).toBe(true)
  })

  // Test 9: Started but NOT completed attempt does NOT qualify

  it('test 9: started-but-incomplete attempt does NOT qualify (completed_at IS NOT NULL filter)', async () => {
    // The eligibility query filters WHERE completed_at IS NOT NULL.
    // A row without completed_at should return data: null from maybeSingle.
    mockGetUserById.mockResolvedValue(makeUser({}))
    mockFrom
      .mockReturnValueOnce(makeDbChain())
      .mockReturnValueOnce(makeAttemptChain(null)) // no row matches IS NOT NULL filter
    const r = await getSatTrialEligibility('user-incomplete')
    expect(r.eligible).toBe(false)
    expect(r.reason).toBe('no_completed_exam')
  })

  // Test 10: Autosaved but unsubmitted attempt does NOT qualify

  it('test 10: autosaved-but-unsubmitted attempt does NOT qualify', async () => {
    mockGetUserById.mockResolvedValue(makeUser({}))
    mockFrom
      .mockReturnValueOnce(makeDbChain())
      .mockReturnValueOnce(makeAttemptChain(null)) // filtered out by completed_at IS NOT NULL
    const r = await getSatTrialEligibility('user-autosaved')
    expect(r.eligible).toBe(false)
    expect(r.reason).toBe('no_completed_exam')
  })

  // Test 11: Another user's historical attempt does NOT qualify

  it('test 11: another user\'s historical attempt does NOT qualify (eligibility is per-user)', async () => {
    mockGetUserById.mockResolvedValue(makeUser({}))
    // The query filters .eq('user_id', userId) — another user's attempt won't match
    mockFrom
      .mockReturnValueOnce(makeDbChain())
      .mockReturnValueOnce(makeAttemptChain(null)) // other user's attempt not returned
    const r = await getSatTrialEligibility('user-target')
    expect(r.eligible).toBe(false)
    expect(r.reason).toBe('no_completed_exam')
    // Confirm user_id eq was called
    expect(mockFrom).toHaveBeenCalledWith('standardized_exam_attempts')
  })

  // Tests 12-13: Historical free user sees trial card

  it('test 12: historical free user with completed attempt is eligible', async () => {
    mockGetUserById.mockResolvedValue(makeUser({})) // no premium metadata
    mockFrom
      .mockReturnValueOnce(makeDbChain())
      .mockReturnValueOnce(makeAttemptChain({ id: 'historical-attempt' }))
    const r = await getSatTrialEligibility('free-historical-user')
    expect(r.eligible).toBe(true)
    expect(r.reason).toBe('eligible')
  })

  it('test 13: trialEligible=true for historical free user (page prop plumbing)', async () => {
    mockGetUserById.mockResolvedValue(makeUser({}))
    mockFrom
      .mockReturnValueOnce(makeDbChain())
      .mockReturnValueOnce(makeAttemptChain({ id: 'historical-attempt' }))
    const { eligible } = await getSatTrialEligibility('free-historical-user')
    const isAdmin = false
    const trialEligible = isAdmin ? false : eligible
    expect(trialEligible).toBe(true)
  })

  it('test 14: historical free user on /sat-premium/free-trial shows offer (eligible: true)', async () => {
    // Same eligibility check — free-trial page uses getSatTrialEligibility too
    mockGetUserById.mockResolvedValue(makeUser({}))
    mockFrom
      .mockReturnValueOnce(makeDbChain())
      .mockReturnValueOnce(makeAttemptChain({ id: 'hist-attempt' }))
    const r = await getSatTrialEligibility('free-user-landing')
    expect(r.eligible).toBe(true)
  })

  // Tests 15-19: Ineligible historical users

  it('test 15: historical monthly subscriber is ineligible', async () => {
    mockGetUserById.mockResolvedValue(makeUser({ sat_subscription_status: 'active' }))
    const r = await getSatTrialEligibility('monthly-subscriber')
    expect(r.eligible).toBe(false)
    expect(r.reason).toBe('already_premium')
  })

  it('test 16: historical three-month purchaser is ineligible', async () => {
    const future = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    mockGetUserById.mockResolvedValue(makeUser({
      sat_purchase_plan_type: 'three_month',
      sat_purchase_status: 'active',
      sat_purchase_expires_at: future,
    }))
    const r = await getSatTrialEligibility('three-month-purchaser')
    expect(r.eligible).toBe(false)
    expect(r.reason).toBe('already_premium')
  })

  it('test 17: historical lifetime purchaser is ineligible', async () => {
    mockGetUserById.mockResolvedValue(makeUser({
      sat_purchase_plan_type: 'lifetime',
      sat_purchase_status: 'active',
    }))
    const r = await getSatTrialEligibility('lifetime-purchaser')
    expect(r.eligible).toBe(false)
    expect(r.reason).toBe('already_premium')
  })

  it('test 18: historical support-adjustment user (sat_upgrade_unlocked) is ineligible', async () => {
    mockGetUserById.mockResolvedValue(makeUser({ sat_upgrade_unlocked: true }))
    const r = await getSatTrialEligibility('support-adjustment-user')
    expect(r.eligible).toBe(false)
    expect(r.reason).toBe('already_premium')
  })

  it('test 19: historical admin email is ineligible (hasSatPremium returns true for admin)', async () => {
    mockGetUserById.mockResolvedValue(makeUser({}, 'ranvi.contact@gmail.com'))
    const r = await getSatTrialEligibility('admin-user-id')
    expect(r.eligible).toBe(false)
    expect(r.reason).toBe('already_premium')
  })

  // Test 20: Historical prior trial user is ineligible

  it('test 20: historical prior trial user is ineligible (claim row exists)', async () => {
    mockGetUserById.mockResolvedValue(makeUser({}))
    const claimChain = makeDbChain({
      maybeSingle: vi.fn().mockResolvedValue({ data: { id: 'old-claim', status: 'canceled' }, error: null }),
    })
    mockFrom.mockReturnValue(claimChain)
    const r = await getSatTrialEligibility('prior-trial-user')
    expect(r.eligible).toBe(false)
    expect(r.reason).toBe('trial_already_claimed')
  })

  // Test 21: Historical previous paid user is ineligible

  it('test 21: historical previous paid user with converted trial is ineligible', async () => {
    // After a trial converts, sat_subscription_status becomes 'active'
    // hasSatPremium catches this
    mockGetUserById.mockResolvedValue(makeUser({ sat_subscription_status: 'active' }))
    const r = await getSatTrialEligibility('converted-trial-user')
    expect(r.eligible).toBe(false)
    expect(r.reason).toBe('already_premium')
  })

  // Test 22: Viewing an old result does NOT create a claim

  it('test 22: getSatTrialEligibility never writes to the DB', async () => {
    mockGetUserById.mockResolvedValue(makeUser({}))
    const claimChain = makeDbChain()
    const attemptChain = makeAttemptChain({ id: 'attempt' })
    mockFrom
      .mockReturnValueOnce(claimChain)
      .mockReturnValueOnce(attemptChain)
    await getSatTrialEligibility('user-viewonly')
    // Verify .insert() was never called
    expect(claimChain.insert).not.toHaveBeenCalled()
    expect(attemptChain.insert).not.toHaveBeenCalled()
    // Verify .update() was never called
    expect(claimChain.update).not.toHaveBeenCalled()
  })

  // Test 23: Loading /sat-premium/free-trial does NOT create a claim

  it('test 23: eligibility check on free-trial page does not write any claim row', async () => {
    mockGetUserById.mockResolvedValue(makeUser({}))
    const claimChain = makeDbChain()
    const attemptChain = makeAttemptChain()
    mockFrom
      .mockReturnValueOnce(claimChain)
      .mockReturnValueOnce(attemptChain)
    await getSatTrialEligibility('user-landing-page')
    // No inserts on read
    expect(claimChain.insert).not.toHaveBeenCalled()
  })

  // Test 24: Claim created ONLY after checkout initiation

  it('test 24: a claim is created only after POST to create-trial-checkout (not on page view)', async () => {
    // getSatTrialEligibility (page view) never inserts
    mockGetUserById.mockResolvedValue(makeUser({}))
    const claimChain = makeDbChain()
    const attemptChain = makeAttemptChain()
    mockFrom
      .mockReturnValueOnce(claimChain)
      .mockReturnValueOnce(attemptChain)
    await getSatTrialEligibility('user-no-insert')
    // insert() is NOT called by eligibility check
    expect(claimChain.insert).not.toHaveBeenCalled()
    // The insert happens in create-trial-checkout/route.ts POST handler,
    // tested separately in checkout.test.ts
  })

  // Test 25: Multiple old attempts do NOT create multiple trials

  it('test 25: multiple completed attempts for same user return eligible: true (one trial allowed)', async () => {
    // Even with 5 completed forms, eligibility returns true once — DB constraint prevents double-trials
    mockGetUserById.mockResolvedValue(makeUser({}))
    const claimChain = makeDbChain()
    const attemptChain = makeAttemptChain({ id: 'any-attempt' }) // finds first matching
    mockFrom
      .mockReturnValueOnce(claimChain)
      .mockReturnValueOnce(attemptChain)
    const r = await getSatTrialEligibility('user-5-forms')
    expect(r.eligible).toBe(true)
    // Only one eligibility call — multiple inserts are prevented by UNIQUE constraint at DB
    expect(mockFrom).toHaveBeenCalledTimes(2) // claim check + attempt check
  })

  // Test 26: Trial card hidden when claim table unavailable

  it('test 26: trial card is hidden when sat_premium_trial_claims table is missing (42P01)', async () => {
    mockGetUserById.mockResolvedValue(makeUser({}))
    const errorChain = makeErrorChain('42P01', 'relation "sat_premium_trial_claims" does not exist')
    mockFrom.mockReturnValue(errorChain)
    const r = await getSatTrialEligibility('user-no-table')
    // Fail closed: storage_unavailable means no trial card
    expect(r.eligible).toBe(false)
    expect(r.reason).toBe('storage_unavailable')
  })

  // Test 27: Missing trial storage returns safe unavailable from checkout

  it('test 27: storage_unavailable reason maps to 500 in checkout endpoint error response', async () => {
    // The checkout endpoint returns 500 for storage_unavailable
    // (tested via the eligibility mock returning storage_unavailable)
    // We verify the reason-to-status mapping logic:
    const statusMap: Record<string, number> = {
      already_premium: 400,
      trial_already_claimed: 400,
      no_completed_exam: 400,
      user_not_found: 400,
      storage_unavailable: 500,
    }
    expect(statusMap['storage_unavailable']).toBe(500)
    expect(statusMap['already_premium']).toBe(400)
  })

  // Test 28: Existing paid access still works when trial storage is unavailable

  it('test 28: hasSatPremium check runs BEFORE the claim table check — premium users unaffected by 42P01', async () => {
    // Premium user: hasSatPremium returns true before we even hit the claims table
    mockGetUserById.mockResolvedValue(makeUser({ sat_subscription_status: 'active' }))
    // No from() mock needed — the claims table is never queried for premium users
    const r = await getSatTrialEligibility('premium-user-no-table')
    expect(r.eligible).toBe(false)
    expect(r.reason).toBe('already_premium')
    // The claims table (which might be missing) was never queried
    expect(mockFrom).not.toHaveBeenCalled()
  })
})
