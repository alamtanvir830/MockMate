/**
 * Tests for H1: /api/mcat-feedback auth guard
 *
 * NOTE: No test runner is configured in this project (no jest/vitest in package.json).
 * To run these tests, install a test runner:
 *   npm install --save-dev vitest
 * Then add to package.json scripts: "test": "vitest"
 * And run: npm test
 *
 * These tests mock Next.js and Supabase dependencies to unit-test the route handler.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'

// --- Mocks ---

// Track OpenAI calls
const mockOpenAICreate = vi.fn()

// OpenAI constructor must use a regular function (not arrow) to support `new OpenAI()`
vi.mock('openai', () => {
  return {
    default: vi.fn(function () {
      return {
        chat: {
          completions: {
            create: mockOpenAICreate,
          },
        },
      }
    }),
  }
})

// Track Supabase createClient calls
const mockGetUser = vi.fn()
vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn().mockResolvedValue({
    auth: {
      getUser: mockGetUser,
    },
  }),
}))

// Mock MCATAIFeedback type (it's just a type, no runtime import needed)
vi.mock('@/lib/premade-exams/mcat/types', () => ({}))

// --- Helper ---

function makeRequest(body: object = {}): NextRequest {
  return new NextRequest('http://localhost/api/mcat-feedback', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  })
}

const MINIMAL_BODY = {
  chemPhysScore: 125, chemPhysCorrect: 40, chemPhysTotal: 59,
  carsScore: 126, carsCorrect: 42, carsTotal: 53,
  bioBiochemScore: 127, bioBiochemCorrect: 46, bioBiochemTotal: 59,
  psychSocScore: 124, psychSocCorrect: 41, psychSocTotal: 59,
  totalScore: 502,
  disciplineBreakdown: {},
  missedQuestions: [],
}

// --- Tests ---

describe('POST /api/mcat-feedback auth guard', () => {
  beforeEach(() => {
    // Reset module registry so the lazy _openai singleton is cleared between tests.
    vi.resetModules()
    vi.clearAllMocks()
  })

  it('returns 401 when no user is authenticated', async () => {
    mockGetUser.mockResolvedValue({ data: { user: null } })

    // Dynamically import to pick up mocks
    const { POST } = await import('../../app/api/mcat-feedback/route')
    const res = await POST(makeRequest(MINIMAL_BODY))

    expect(res.status).toBe(401)
    const body = await res.json()
    expect(body).toEqual({ error: 'Unauthorized' })
  })

  it('never calls OpenAI when no user is authenticated', async () => {
    mockGetUser.mockResolvedValue({ data: { user: null } })

    const { POST } = await import('../../app/api/mcat-feedback/route')
    await POST(makeRequest(MINIMAL_BODY))

    expect(mockOpenAICreate).not.toHaveBeenCalled()
  })

  it('proceeds to call OpenAI when user is authenticated', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: 'user-123', email: 'test@example.com' } } })

    // Mock a successful OpenAI response
    mockOpenAICreate.mockResolvedValue({
      choices: [{
        message: {
          content: JSON.stringify({
            whatWentWell: 'Good performance.',
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
    const res = await POST(makeRequest(MINIMAL_BODY))

    expect(res.status).toBe(200)
    expect(mockOpenAICreate).toHaveBeenCalledOnce()
  })
})
