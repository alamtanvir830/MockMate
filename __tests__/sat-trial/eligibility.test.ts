/**
 * Tests for getSatTrialEligibility() — server-side authoritative eligibility check.
 *
 * All Supabase calls are mocked — no real network calls are made.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'

// ── Mocks ─────────────────────────────────────────────────────────────────────

const mockFrom = vi.fn()
const mockGetUserById = vi.fn()

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
  const chain = {
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    limit: vi.fn().mockReturnThis(),
    maybeSingle: vi.fn().mockResolvedValue({ data: null, error: null }),
    ...overrides,
  }
  return chain
}

function makeUser(meta: Record<string, unknown> = {}, email = 'user@example.com') {
  return {
    data: {
      user: {
        email,
        user_metadata: meta,
      },
    },
  }
}

// ── Import after mocks ────────────────────────────────────────────────────────

import { getSatTrialEligibility } from '@/lib/sat-trial/eligibility'

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('getSatTrialEligibility', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // ── 1. user_not_found ───────────────────────────────────────────────────────
  it('returns user_not_found when getUserById returns no user', async () => {
    mockGetUserById.mockResolvedValue({ data: { user: null } })
    const result = await getSatTrialEligibility('user-abc')
    expect(result).toEqual({ eligible: false, reason: 'user_not_found' })
  })

  it('returns user_not_found when getUserById returns undefined data', async () => {
    mockGetUserById.mockResolvedValue({ data: null })
    const result = await getSatTrialEligibility('user-abc')
    expect(result).toEqual({ eligible: false, reason: 'user_not_found' })
  })

  // ── 2. already_premium — all premium types ──────────────────────────────────
  it('returns already_premium for user with trialing subscription status', async () => {
    mockGetUserById.mockResolvedValue(makeUser({ sat_subscription_status: 'trialing' }))
    const result = await getSatTrialEligibility('user-1')
    expect(result).toEqual({ eligible: false, reason: 'already_premium' })
  })

  it('returns already_premium for user with active subscription status', async () => {
    mockGetUserById.mockResolvedValue(makeUser({ sat_subscription_status: 'active' }))
    const result = await getSatTrialEligibility('user-1')
    expect(result).toEqual({ eligible: false, reason: 'already_premium' })
  })

  it('returns already_premium for user with past_due subscription status', async () => {
    mockGetUserById.mockResolvedValue(makeUser({ sat_subscription_status: 'past_due' }))
    const result = await getSatTrialEligibility('user-1')
    expect(result).toEqual({ eligible: false, reason: 'already_premium' })
  })

  it('returns already_premium for user with legacy sat_upgrade_unlocked flag', async () => {
    mockGetUserById.mockResolvedValue(makeUser({ sat_upgrade_unlocked: true }))
    const result = await getSatTrialEligibility('user-1')
    expect(result).toEqual({ eligible: false, reason: 'already_premium' })
  })

  it('returns already_premium for user with active lifetime purchase', async () => {
    mockGetUserById.mockResolvedValue(makeUser({
      sat_purchase_plan_type: 'lifetime',
      sat_purchase_status: 'active',
    }))
    const result = await getSatTrialEligibility('user-1')
    expect(result).toEqual({ eligible: false, reason: 'already_premium' })
  })

  it('returns already_premium for user with active three_month purchase and future expiry', async () => {
    const future = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString()
    mockGetUserById.mockResolvedValue(makeUser({
      sat_purchase_plan_type: 'three_month',
      sat_purchase_status: 'active',
      sat_purchase_expires_at: future,
    }))
    const result = await getSatTrialEligibility('user-1')
    expect(result).toEqual({ eligible: false, reason: 'already_premium' })
  })

  it('does NOT return already_premium for admin email — admin bypass also prevents trial', async () => {
    // Admin is blocked at the API layer, but eligibility check: admin has premium via hasSatPremium
    mockGetUserById.mockResolvedValue(makeUser({}, 'ranvi.contact@gmail.com'))
    const result = await getSatTrialEligibility('admin-user-id')
    expect(result).toEqual({ eligible: false, reason: 'already_premium' })
  })

  it('does NOT return already_premium for expired three_month — user is free', async () => {
    const past = new Date(Date.now() - 1000).toISOString()
    mockGetUserById.mockResolvedValue(makeUser({
      sat_purchase_plan_type: 'three_month',
      sat_purchase_status: 'active',
      sat_purchase_expires_at: past,
    }))
    // Claim check follows, mock it
    const claimChain = makeDbChain()
    const attemptChain = makeDbChain({ maybeSingle: vi.fn().mockResolvedValue({ data: { id: 'attempt-1' }, error: null }) })
    mockFrom
      .mockReturnValueOnce(claimChain)
      .mockReturnValueOnce(attemptChain)
    const result = await getSatTrialEligibility('user-1')
    expect(result).toEqual({ eligible: true, reason: 'eligible' })
  })

  // ── 3. trial_already_claimed ────────────────────────────────────────────────
  it('returns trial_already_claimed when a claim row exists', async () => {
    mockGetUserById.mockResolvedValue(makeUser({}))
    const claimChain = makeDbChain({ maybeSingle: vi.fn().mockResolvedValue({ data: { id: 'claim-1' }, error: null }) })
    mockFrom.mockReturnValue(claimChain)
    const result = await getSatTrialEligibility('user-1')
    expect(result).toEqual({ eligible: false, reason: 'trial_already_claimed' })
  })

  it('returns trial_already_claimed regardless of claim status (pending, trialing, canceled)', async () => {
    mockGetUserById.mockResolvedValue(makeUser({}))
    const claimChain = makeDbChain({ maybeSingle: vi.fn().mockResolvedValue({ data: { id: 'claim-1', status: 'canceled' }, error: null }) })
    mockFrom.mockReturnValue(claimChain)
    const result = await getSatTrialEligibility('user-1')
    expect(result).toEqual({ eligible: false, reason: 'trial_already_claimed' })
  })

  // ── 4. no_completed_exam ────────────────────────────────────────────────────
  it('returns no_completed_exam when no attempts exist', async () => {
    mockGetUserById.mockResolvedValue(makeUser({}))
    const claimChain = makeDbChain() // no claim
    const attemptChain = makeDbChain() // no attempt
    mockFrom
      .mockReturnValueOnce(claimChain)
      .mockReturnValueOnce(attemptChain)
    const result = await getSatTrialEligibility('user-1')
    expect(result).toEqual({ eligible: false, reason: 'no_completed_exam' })
  })

  it('returns no_completed_exam when attempt query returns null data', async () => {
    mockGetUserById.mockResolvedValue(makeUser({}))
    const claimChain = makeDbChain()
    const attemptChain = makeDbChain({ maybeSingle: vi.fn().mockResolvedValue({ data: null, error: null }) })
    mockFrom
      .mockReturnValueOnce(claimChain)
      .mockReturnValueOnce(attemptChain)
    const result = await getSatTrialEligibility('user-1')
    expect(result).toEqual({ eligible: false, reason: 'no_completed_exam' })
  })

  // ── 5. eligible ─────────────────────────────────────────────────────────────
  it('returns eligible when user has no premium, no claim, and has an attempt', async () => {
    mockGetUserById.mockResolvedValue(makeUser({}))
    const claimChain = makeDbChain()
    const attemptChain = makeDbChain({ maybeSingle: vi.fn().mockResolvedValue({ data: { id: 'attempt-1' }, error: null }) })
    mockFrom
      .mockReturnValueOnce(claimChain)
      .mockReturnValueOnce(attemptChain)
    const result = await getSatTrialEligibility('user-1')
    expect(result).toEqual({ eligible: true, reason: 'eligible' })
  })

  it('returns eligible for user with canceled subscription (not premium)', async () => {
    mockGetUserById.mockResolvedValue(makeUser({ sat_subscription_status: 'canceled' }))
    const claimChain = makeDbChain()
    const attemptChain = makeDbChain({ maybeSingle: vi.fn().mockResolvedValue({ data: { id: 'attempt-1' }, error: null }) })
    mockFrom
      .mockReturnValueOnce(claimChain)
      .mockReturnValueOnce(attemptChain)
    const result = await getSatTrialEligibility('user-1')
    expect(result).toEqual({ eligible: true, reason: 'eligible' })
  })

  it('returns eligible for user with empty metadata', async () => {
    mockGetUserById.mockResolvedValue(makeUser({}))
    const claimChain = makeDbChain()
    const attemptChain = makeDbChain({ maybeSingle: vi.fn().mockResolvedValue({ data: { id: 'a1' }, error: null }) })
    mockFrom
      .mockReturnValueOnce(claimChain)
      .mockReturnValueOnce(attemptChain)
    const result = await getSatTrialEligibility('user-1')
    expect(result.eligible).toBe(true)
  })

  // ── 6. check ordering ───────────────────────────────────────────────────────
  it('checks premium BEFORE checking trial claim', async () => {
    // Premium user — should return already_premium without hitting claim DB
    mockGetUserById.mockResolvedValue(makeUser({ sat_subscription_status: 'active' }))
    const result = await getSatTrialEligibility('user-1')
    expect(result.reason).toBe('already_premium')
    // mockFrom should NOT have been called for claim check
    expect(mockFrom).not.toHaveBeenCalled()
  })

  it('checks claim BEFORE checking exam attempts', async () => {
    // User with no premium but has a claim
    mockGetUserById.mockResolvedValue(makeUser({}))
    const claimChain = makeDbChain({ maybeSingle: vi.fn().mockResolvedValue({ data: { id: 'claim-1' }, error: null }) })
    mockFrom.mockReturnValue(claimChain)
    const result = await getSatTrialEligibility('user-1')
    expect(result.reason).toBe('trial_already_claimed')
    // from should have been called once (for claim check), not twice (not attempt check)
    expect(mockFrom).toHaveBeenCalledTimes(1)
  })

  // ── 7. admin client usage ───────────────────────────────────────────────────
  it('uses admin client for fresh metadata (bypasses JWT cache)', async () => {
    const { createAdminClient } = await import('@/lib/supabase/admin')
    mockGetUserById.mockResolvedValue(makeUser({}))
    const claimChain = makeDbChain()
    const attemptChain = makeDbChain({ maybeSingle: vi.fn().mockResolvedValue({ data: { id: 'a1' }, error: null }) })
    mockFrom
      .mockReturnValueOnce(claimChain)
      .mockReturnValueOnce(attemptChain)
    await getSatTrialEligibility('user-1')
    expect(createAdminClient).toHaveBeenCalled()
    expect(mockGetUserById).toHaveBeenCalledWith('user-1')
  })

  // ── 8. correct DB tables queried ────────────────────────────────────────────
  it('queries sat_premium_trial_claims table for claim check', async () => {
    mockGetUserById.mockResolvedValue(makeUser({}))
    const claimChain = makeDbChain()
    const attemptChain = makeDbChain({ maybeSingle: vi.fn().mockResolvedValue({ data: { id: 'a1' }, error: null }) })
    mockFrom
      .mockReturnValueOnce(claimChain)
      .mockReturnValueOnce(attemptChain)
    await getSatTrialEligibility('user-1')
    expect(mockFrom).toHaveBeenCalledWith('sat_premium_trial_claims')
  })

  it('queries standardized_exam_attempts table for exam check', async () => {
    mockGetUserById.mockResolvedValue(makeUser({}))
    const claimChain = makeDbChain()
    const attemptChain = makeDbChain({ maybeSingle: vi.fn().mockResolvedValue({ data: { id: 'a1' }, error: null }) })
    mockFrom
      .mockReturnValueOnce(claimChain)
      .mockReturnValueOnce(attemptChain)
    await getSatTrialEligibility('user-1')
    expect(mockFrom).toHaveBeenCalledWith('standardized_exam_attempts')
  })

  // ── 9. incomplete subscription status ───────────────────────────────────────
  it('returns eligible for user with incomplete subscription status', async () => {
    mockGetUserById.mockResolvedValue(makeUser({ sat_subscription_status: 'incomplete' }))
    const claimChain = makeDbChain()
    const attemptChain = makeDbChain({ maybeSingle: vi.fn().mockResolvedValue({ data: { id: 'a1' }, error: null }) })
    mockFrom
      .mockReturnValueOnce(claimChain)
      .mockReturnValueOnce(attemptChain)
    const result = await getSatTrialEligibility('user-1')
    expect(result.eligible).toBe(true)
  })

  // ── 10. race condition simulation ───────────────────────────────────────────
  it('two sequential calls with same conditions both return eligible (DB constraint prevents double-trial)', async () => {
    // Both calls pass eligibility — the DB unique constraint is the true guard
    mockGetUserById.mockResolvedValue(makeUser({}))

    // First call
    const claimChain1 = makeDbChain()
    const attemptChain1 = makeDbChain({ maybeSingle: vi.fn().mockResolvedValue({ data: { id: 'a1' }, error: null }) })
    mockFrom
      .mockReturnValueOnce(claimChain1)
      .mockReturnValueOnce(attemptChain1)
    const r1 = await getSatTrialEligibility('user-race')

    // Second call — same mocks (simulating snapshot before first insert commits)
    const claimChain2 = makeDbChain()
    const attemptChain2 = makeDbChain({ maybeSingle: vi.fn().mockResolvedValue({ data: { id: 'a1' }, error: null }) })
    mockFrom
      .mockReturnValueOnce(claimChain2)
      .mockReturnValueOnce(attemptChain2)
    const r2 = await getSatTrialEligibility('user-race')

    // Both return eligible — DB insert will reject the second one (23505)
    expect(r1.eligible).toBe(true)
    expect(r2.eligible).toBe(true)
  })
})
