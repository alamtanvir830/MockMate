/**
 * Tests for M2: Forms 4 and 5 entitlement checks in
 *   - /api/premade/save-attempt
 *   - /api/sat/in-progress (POST handler)
 *
 * NOTE: No test runner is configured in this project (no jest/vitest in package.json).
 * To run these tests, install a test runner:
 *   npm install --save-dev vitest
 * Then add to package.json scripts: "test": "vitest"
 * And run: npm test
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'

// --- Mocks ---

const mockGetUser = vi.fn()
const mockSelect = vi.fn()
const mockInsert = vi.fn()
const mockFrom = vi.fn()
const mockUpsert = vi.fn()

const supabaseMock = {
  auth: { getUser: mockGetUser },
  from: mockFrom,
}

vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn().mockResolvedValue(supabaseMock),
}))

const mockGetEntitlements = vi.fn()
vi.mock('@/lib/entitlements', () => ({
  getEntitlements: mockGetEntitlements,
}))

vi.mock('@/lib/auth/admin', () => ({
  isMockMateAdmin: vi.fn((user) => user?.email === 'admin@mockmate.com'),
}))

vi.mock('@/lib/supabase/resolve-user-identity', () => ({
  resolveUserIdentity: vi.fn().mockResolvedValue({ user_name: 'Test User', user_email: 'test@example.com' }),
}))

vi.mock('@/lib/premade-exams/sat/form3-access', () => ({
  canNonPremiumAccessForm3Api: vi.fn().mockResolvedValue(false),
}))

// --- Helpers ---

const NORMAL_USER = { id: 'user-123', email: 'user@example.com' }
const ADMIN_USER = { id: 'admin-456', email: 'admin@mockmate.com' }

function makeSaveAttemptRequest(formNumber: number, user = NORMAL_USER): { req: NextRequest, user: typeof user } {
  const req = new NextRequest('http://localhost/api/premade/save-attempt', {
    method: 'POST',
    body: JSON.stringify({
      localAttemptId: 'local-123',
      examType: 'SAT',
      formNumber,
      examTitle: `SAT Form ${formNumber}`,
      totalScore: 1400,
      rwScore: 700,
      mathScore: 700,
      rwCorrect: 44,
      rwTotal: 54,
      mathCorrect: 44,
      mathTotal: 44,
      rwM2Type: 'hard',
      mathM2Type: 'hard',
      moduleBreakdown: {},
      weakSkills: [],
      submittedAnswers: {},
      completedAt: new Date().toISOString(),
      responses: [],
    }),
    headers: { 'Content-Type': 'application/json' },
  })
  return { req, user }
}

function makeInProgressRequest(formNumber: number, user = NORMAL_USER): { req: NextRequest, user: typeof user } {
  const req = new NextRequest('http://localhost/api/sat/in-progress', {
    method: 'POST',
    body: JSON.stringify({
      formNumber,
      localAttemptId: 'local-123',
      answers: {},
      bookmarks: [],
      strikeouts: {},
      rwM2Type: 'easy',
      mathM2Type: 'easy',
      currentPhaseTag: 'rw_m1',
      currentSection: null,
      currentModule: null,
      currentQuestionIdx: null,
      secsLeft: null,
      timerRunning: false,
    }),
    headers: { 'Content-Type': 'application/json' },
  })
  return { req, user }
}

function setupSupabaseMock() {
  // Chain builder: from().select().eq().eq().single() etc.
  const chainMock = {
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    insert: vi.fn().mockResolvedValue({ data: [{ id: 'inserted-id' }], error: null }),
    upsert: vi.fn().mockResolvedValue({ error: null }),
    single: vi.fn().mockResolvedValue({ data: { id: 'inserted-id' }, error: null }),
    maybeSingle: vi.fn().mockResolvedValue({ data: null, error: null }),
  }
  chainMock.select.mockReturnValue({ ...chainMock, count: 0 })
  mockFrom.mockReturnValue(chainMock)
}

// ========================================
// save-attempt route tests
// ========================================

describe('POST /api/premade/save-attempt — Forms 4 and 5 entitlement gate', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    setupSupabaseMock()
  })

  it('blocks non-premium user from submitting Form 4', async () => {
    mockGetUser.mockResolvedValue({ data: { user: NORMAL_USER } })
    mockGetEntitlements.mockResolvedValue({ satUpgradeUnlocked: false })

    const { POST } = await import('../../app/api/premade/save-attempt/route')
    const { req } = makeSaveAttemptRequest(4)
    const res = await POST(req)

    expect(res.status).toBe(403)
    const body = await res.json()
    expect(body.error).toContain('SAT Premium')
  })

  it('blocks non-premium user from submitting Form 5', async () => {
    mockGetUser.mockResolvedValue({ data: { user: NORMAL_USER } })
    mockGetEntitlements.mockResolvedValue({ satUpgradeUnlocked: false })

    const { POST } = await import('../../app/api/premade/save-attempt/route')
    const { req } = makeSaveAttemptRequest(5)
    const res = await POST(req)

    expect(res.status).toBe(403)
    const body = await res.json()
    expect(body.error).toContain('SAT Premium')
  })

  it('allows premium user to submit Form 4', async () => {
    mockGetUser.mockResolvedValue({ data: { user: NORMAL_USER } })
    mockGetEntitlements.mockResolvedValue({ satUpgradeUnlocked: true })

    const { POST } = await import('../../app/api/premade/save-attempt/route')
    const { req } = makeSaveAttemptRequest(4)
    const res = await POST(req)

    // Should proceed past the entitlement check (200 or 500 from DB mock, not 403)
    expect(res.status).not.toBe(403)
  })

  it('allows admin user to submit Form 5 without premium', async () => {
    mockGetUser.mockResolvedValue({ data: { user: ADMIN_USER } })
    mockGetEntitlements.mockResolvedValue({ satUpgradeUnlocked: false })

    const { POST } = await import('../../app/api/premade/save-attempt/route')
    const { req } = makeSaveAttemptRequest(5, ADMIN_USER)
    const res = await POST(req)

    expect(res.status).not.toBe(403)
  })

  it('Form 2 check still works — blocks non-premium for Form 2 (regression)', async () => {
    mockGetUser.mockResolvedValue({ data: { user: NORMAL_USER } })
    mockGetEntitlements.mockResolvedValue({ satUpgradeUnlocked: false })

    const { POST } = await import('../../app/api/premade/save-attempt/route')
    const { req } = makeSaveAttemptRequest(2)
    const res = await POST(req)

    expect(res.status).toBe(403)
  })

  it('Form 3 check still works — blocks expired non-premium for Form 3 (regression)', async () => {
    mockGetUser.mockResolvedValue({ data: { user: NORMAL_USER } })
    mockGetEntitlements.mockResolvedValue({ satUpgradeUnlocked: false })

    const { POST } = await import('../../app/api/premade/save-attempt/route')
    const { req } = makeSaveAttemptRequest(3)
    const res = await POST(req)

    // canNonPremiumAccessForm3Api returns false (mocked above), so should 403
    expect(res.status).toBe(403)
  })
})

// ========================================
// sat/in-progress route tests
// ========================================

describe('POST /api/sat/in-progress — Forms 4 and 5 entitlement gate', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    setupSupabaseMock()
  })

  it('blocks non-premium user from autosaving Form 4', async () => {
    mockGetUser.mockResolvedValue({ data: { user: NORMAL_USER } })
    mockGetEntitlements.mockResolvedValue({ satUpgradeUnlocked: false })

    const { POST } = await import('../../app/api/sat/in-progress/route')
    const { req } = makeInProgressRequest(4)
    const res = await POST(req)

    expect(res.status).toBe(403)
    const body = await res.json()
    expect(body.error).toContain('SAT Premium')
  })

  it('blocks non-premium user from autosaving Form 5', async () => {
    mockGetUser.mockResolvedValue({ data: { user: NORMAL_USER } })
    mockGetEntitlements.mockResolvedValue({ satUpgradeUnlocked: false })

    const { POST } = await import('../../app/api/sat/in-progress/route')
    const { req } = makeInProgressRequest(5)
    const res = await POST(req)

    expect(res.status).toBe(403)
    const body = await res.json()
    expect(body.error).toContain('SAT Premium')
  })

  it('allows premium user to autosave Form 4', async () => {
    mockGetUser.mockResolvedValue({ data: { user: NORMAL_USER } })
    mockGetEntitlements.mockResolvedValue({ satUpgradeUnlocked: true })

    const { POST } = await import('../../app/api/sat/in-progress/route')
    const { req } = makeInProgressRequest(4)
    const res = await POST(req)

    expect(res.status).not.toBe(403)
  })

  it('allows admin user to autosave Form 5 without premium', async () => {
    mockGetUser.mockResolvedValue({ data: { user: ADMIN_USER } })
    mockGetEntitlements.mockResolvedValue({ satUpgradeUnlocked: false })

    const { POST } = await import('../../app/api/sat/in-progress/route')
    const { req } = makeInProgressRequest(5, ADMIN_USER)
    const res = await POST(req)

    expect(res.status).not.toBe(403)
  })
})
