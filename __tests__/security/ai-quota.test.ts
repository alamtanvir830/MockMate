/**
 * Tests for lib/security/aiDailyQuota.ts
 *
 * Verifies the consumeAiQuota helper:
 *   - Returns null (allowed) when the RPC reports allowed=true
 *   - Returns a 429 response when the RPC reports allowed=false
 *   - Returns a 503 response when the RPC errors
 *   - Quota is consumed (RPC called) BEFORE any OpenAI invocation
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'

// ── Supabase mock ──────────────────────────────────────────────────────────────

const mockRpc = vi.fn()
const mockGetUser = vi.fn()

vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn().mockResolvedValue({
    auth: {
      getUser: mockGetUser,
    },
    rpc: mockRpc,
  }),
}))

// ── OpenAI mock (to assert it is NOT called when denied) ──────────────────────

const mockOpenAICreate = vi.fn()

vi.mock('openai', () => ({
  default: vi.fn(function () {
    return {
      chat: {
        completions: {
          create: mockOpenAICreate,
        },
      },
    }
  }),
}))

// Mock MCAT types (type-only import — no runtime values needed)
vi.mock('@/lib/premade-exams/mcat/types', () => ({}))

// ── Helper ─────────────────────────────────────────────────────────────────────

function makeRequest(url: string, body: object = {}): NextRequest {
  return new NextRequest(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  })
}

const MCAT_BODY = {
  chemPhysScore: 125, chemPhysCorrect: 40, chemPhysTotal: 59,
  carsScore: 126, carsCorrect: 42, carsTotal: 53,
  bioBiochemScore: 127, bioBiochemCorrect: 46, bioBiochemTotal: 59,
  psychSocScore: 124, psychSocCorrect: 41, psychSocTotal: 59,
  totalScore: 502,
  disciplineBreakdown: {},
  missedQuestions: [],
}

const FAKE_USER = { id: 'user-abc', email: 'test@example.com' }

const QUOTA_ALLOWED = {
  allowed: true,
  limit_count: 25,
  used_count: 1,
  remaining_count: 24,
  reset_at: new Date(Date.now() + 3600 * 1000).toISOString(),
}

const QUOTA_DENIED = {
  allowed: false,
  limit_count: 25,
  used_count: 25,
  remaining_count: 0,
  reset_at: new Date(Date.now() + 3600 * 1000).toISOString(),
}

// ── consumeAiQuota unit tests ──────────────────────────────────────────────────

describe('consumeAiQuota', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })

  it('returns null (allowed) when RPC reports allowed=true', async () => {
    mockRpc.mockResolvedValue({ data: QUOTA_ALLOWED, error: null })

    const { consumeAiQuota } = await import('../../lib/security/aiDailyQuota')
    const result = await consumeAiQuota('mcat_feedback')

    expect(result).toBeNull()
  })

  it('returns 429 response when RPC reports allowed=false', async () => {
    mockRpc.mockResolvedValue({ data: QUOTA_DENIED, error: null })

    const { consumeAiQuota } = await import('../../lib/security/aiDailyQuota')
    const result = await consumeAiQuota('mcat_feedback')

    expect(result).not.toBeNull()
    expect(result!.denied.status).toBe(429)

    const body = await result!.denied.json()
    expect(body.error).toMatch(/today's AI feedback limit/i)
    expect(body.reset_at).toBeDefined()
  })

  it('includes correct rate-limit headers in the 429 response', async () => {
    mockRpc.mockResolvedValue({ data: QUOTA_DENIED, error: null })

    const { consumeAiQuota } = await import('../../lib/security/aiDailyQuota')
    const result = await consumeAiQuota('mcat_feedback')

    expect(result).not.toBeNull()
    const headers = result!.denied.headers
    expect(headers.get('Retry-After')).not.toBeNull()
    expect(headers.get('X-RateLimit-Limit')).toBe('25')
    expect(headers.get('X-RateLimit-Remaining')).toBe('0')
    expect(headers.get('X-RateLimit-Reset')).not.toBeNull()
  })

  it('returns 503 when RPC returns an error', async () => {
    mockRpc.mockResolvedValue({
      data: null,
      error: { code: 'PGRST301', message: 'function does not exist' },
    })

    const { consumeAiQuota } = await import('../../lib/security/aiDailyQuota')
    const result = await consumeAiQuota('mcat_feedback')

    expect(result).not.toBeNull()
    expect(result!.denied.status).toBe(503)

    const body = await result!.denied.json()
    expect(body.error).toMatch(/temporarily unavailable/i)
  })

  it('returns 503 when RPC throws unexpectedly', async () => {
    mockRpc.mockRejectedValue(new Error('Network error'))

    const { consumeAiQuota } = await import('../../lib/security/aiDailyQuota')
    const result = await consumeAiQuota('other_ai_feedback')

    expect(result).not.toBeNull()
    expect(result!.denied.status).toBe(503)
  })
})

// ── Integration: quota check fires BEFORE OpenAI ──────────────────────────────

describe('POST /api/mcat-feedback quota enforcement', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })

  it('returns 429 and never calls OpenAI when quota is exhausted', async () => {
    mockGetUser.mockResolvedValue({ data: { user: FAKE_USER } })
    mockRpc.mockResolvedValue({ data: QUOTA_DENIED, error: null })

    const { POST } = await import('../../app/api/mcat-feedback/route')
    const res = await POST(makeRequest('http://localhost/api/mcat-feedback', MCAT_BODY))

    expect(res.status).toBe(429)
    expect(mockOpenAICreate).not.toHaveBeenCalled()
  })

  it('returns 503 and never calls OpenAI when quota system errors', async () => {
    mockGetUser.mockResolvedValue({ data: { user: FAKE_USER } })
    mockRpc.mockResolvedValue({
      data: null,
      error: { code: 'DB_ERROR', message: 'connection refused' },
    })

    const { POST } = await import('../../app/api/mcat-feedback/route')
    const res = await POST(makeRequest('http://localhost/api/mcat-feedback', MCAT_BODY))

    expect(res.status).toBe(503)
    expect(mockOpenAICreate).not.toHaveBeenCalled()
  })

  it('calls OpenAI when quota is available and user is authenticated', async () => {
    mockGetUser.mockResolvedValue({ data: { user: FAKE_USER } })
    mockRpc.mockResolvedValue({ data: QUOTA_ALLOWED, error: null })
    mockOpenAICreate.mockResolvedValue({
      choices: [{
        message: {
          content: JSON.stringify({
            whatWentWell: 'Strong performance.',
            strongestSection: 'CARS',
            weakestSection: 'Chem/Phys',
            weakestDisciplines: ['General Chemistry'],
            weakestContentCategories: ['Electrochemistry'],
            weakestScientificSkills: ['Skill 3'],
            passageVsDiscrete: 'Passage-based questions were stronger.',
            carsStrategy: 'Focus on active reading.',
            contentAreasToReview: ['Thermodynamics'],
            scienceReasoningToReview: ['Data interpretation'],
            recommendedNextSteps: '1. Review weak areas.',
          }),
        },
      }],
    })

    const { POST } = await import('../../app/api/mcat-feedback/route')
    const res = await POST(makeRequest('http://localhost/api/mcat-feedback', MCAT_BODY))

    expect(res.status).toBe(200)
    expect(mockOpenAICreate).toHaveBeenCalledOnce()
  })

  it('returns 401 and never calls quota RPC when no user is authenticated', async () => {
    mockGetUser.mockResolvedValue({ data: { user: null } })

    const { POST } = await import('../../app/api/mcat-feedback/route')
    const res = await POST(makeRequest('http://localhost/api/mcat-feedback', MCAT_BODY))

    expect(res.status).toBe(401)
    expect(mockRpc).not.toHaveBeenCalled()
    expect(mockOpenAICreate).not.toHaveBeenCalled()
  })
})
