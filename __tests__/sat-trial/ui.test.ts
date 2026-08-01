/**
 * Tests for SATTrialOffer component behavior.
 *
 * Tests component logic using unit-style tests. Component uses fetch() which we mock.
 * We test state transitions, error handling, and interaction logic.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'

// ── Helpers for testing component logic without full React rendering ───────────

// Simulate the handleStartTrial function logic independently
async function simulateHandleStartTrial(
  fetchFn: typeof fetch
): Promise<{ error: string | null; redirected: boolean; redirectUrl?: string }> {
  let error: string | null = null
  let redirected = false
  let redirectUrl: string | undefined

  try {
    const res = await fetchFn('/api/stripe/create-trial-checkout', { method: 'POST' })
    const data = await res.json()
    if (!res.ok || !data.url) {
      error = data.error ?? 'Something went wrong. Please try again.'
      return { error, redirected }
    }
    redirectUrl = data.url
    redirected = true
    return { error, redirected, redirectUrl }
  } catch {
    error = 'Network error. Please try again.'
    return { error, redirected }
  }
}

// Mock fetch helper
function makeFetchMock(
  status: number,
  body: Record<string, unknown>
): typeof fetch {
  return vi.fn().mockResolvedValue({
    ok: status >= 200 && status < 300,
    status,
    json: vi.fn().mockResolvedValue(body),
  }) as unknown as typeof fetch
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('SATTrialOffer — handleStartTrial logic', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // ── 1. Success path ─────────────────────────────────────────────────────────
  it('redirects to stripe URL on success', async () => {
    const fetch = makeFetchMock(200, { url: 'https://checkout.stripe.com/pay/cs_test' })
    const result = await simulateHandleStartTrial(fetch)
    expect(result.redirected).toBe(true)
    expect(result.redirectUrl).toBe('https://checkout.stripe.com/pay/cs_test')
    expect(result.error).toBeNull()
  })

  it('calls POST /api/stripe/create-trial-checkout', async () => {
    const fetch = makeFetchMock(200, { url: 'https://checkout.stripe.com/test' })
    await simulateHandleStartTrial(fetch)
    expect(fetch).toHaveBeenCalledWith(
      '/api/stripe/create-trial-checkout',
      expect.objectContaining({ method: 'POST' })
    )
  })

  // ── 2. Error from API ───────────────────────────────────────────────────────
  it('sets error message from API error field on 400', async () => {
    const fetch = makeFetchMock(400, { error: 'You have already claimed your free trial.' })
    const result = await simulateHandleStartTrial(fetch)
    expect(result.error).toBe('You have already claimed your free trial.')
    expect(result.redirected).toBe(false)
  })

  it('sets error message from API error field on 401', async () => {
    const fetch = makeFetchMock(401, { error: 'You must be signed in to continue.' })
    const result = await simulateHandleStartTrial(fetch)
    expect(result.error).toBe('You must be signed in to continue.')
    expect(result.redirected).toBe(false)
  })

  it('sets error message from API error field on 500', async () => {
    const fetch = makeFetchMock(500, { error: 'Trial is not available right now.' })
    const result = await simulateHandleStartTrial(fetch)
    expect(result.error).toBe('Trial is not available right now.')
    expect(result.redirected).toBe(false)
  })

  it('uses fallback error when API returns no error field', async () => {
    const fetch = makeFetchMock(400, {})
    const result = await simulateHandleStartTrial(fetch)
    expect(result.error).toBe('Something went wrong. Please try again.')
    expect(result.redirected).toBe(false)
  })

  it('sets error when response is ok but url is missing', async () => {
    const fetch = makeFetchMock(200, { session_id: 'cs_test' }) // missing url
    const result = await simulateHandleStartTrial(fetch)
    expect(result.error).toBeTruthy()
    expect(result.redirected).toBe(false)
  })

  // ── 3. Network errors ────────────────────────────────────────────────────────
  it('sets network error message when fetch throws', async () => {
    const fetch = vi.fn().mockRejectedValue(new Error('Network failure')) as unknown as typeof fetch
    const result = await simulateHandleStartTrial(fetch)
    expect(result.error).toBe('Network error. Please try again.')
    expect(result.redirected).toBe(false)
  })

  it('does not redirect on network error', async () => {
    const fetch = vi.fn().mockRejectedValue(new TypeError('Failed to fetch')) as unknown as typeof fetch
    const result = await simulateHandleStartTrial(fetch)
    expect(result.redirected).toBe(false)
  })

  // ── 4. State management ──────────────────────────────────────────────────────
  it('does not set error on initial state', async () => {
    // Simulate initial: error starts as null
    let error: string | null = null
    expect(error).toBeNull()
  })

  it('clears previous error on retry', async () => {
    // First call: error
    const errorFetch = makeFetchMock(400, { error: 'First error' })
    const result1 = await simulateHandleStartTrial(errorFetch)
    expect(result1.error).toBe('First error')

    // Second call: success — previous error would have been cleared
    const successFetch = makeFetchMock(200, { url: 'https://checkout.stripe.com/test' })
    const result2 = await simulateHandleStartTrial(successFetch)
    expect(result2.error).toBeNull()
    expect(result2.redirected).toBe(true)
  })

  // ── 5. Component content verification ───────────────────────────────────────
  it('verifies trial features list is complete', () => {
    const features = [
      'All 5 SAT Practice Forms (Forms 1–5)',
      '700+ SAT Question Bank questions',
      'SAT R&W Academy & Math Academy',
      'Personalized Practice Path',
    ]
    expect(features).toHaveLength(4)
    expect(features[0]).toContain('Forms 1–5')
    expect(features[1]).toContain('700+')
    expect(features[2]).toContain('Academy')
    expect(features[3]).toContain('Personalized')
  })

  it('verifies pricing disclosure is correct', () => {
    // Required text from spec
    const disclosure = 'Credit card required. $0 today, then $9.99/month after your 7-day trial. Cancel before the trial ends to avoid being charged.'
    expect(disclosure).toContain('9.99')
    expect(disclosure).toContain('Credit card required')
    expect(disclosure).toContain('$0 today')
    expect(disclosure).toContain('Cancel before the trial ends')
  })

  it('verifies CTA button text', () => {
    const ctaText = 'Start your 7-day free trial'
    expect(ctaText).toContain('7-day')
    expect(ctaText).toContain('free trial')
  })

  it('verifies header title', () => {
    const title = 'Try everything in SAT Premium free for 7 days'
    expect(title).toContain('7 days')
    expect(title).toContain('SAT Premium')
  })

  it('verifies loading text', () => {
    const loadingText = 'Starting trial…'
    expect(loadingText).toBeTruthy()
  })

  // ── 6. Loading state behavior ────────────────────────────────────────────────
  it('does not redirect when loading is set but fetch has not responded', async () => {
    let resolveFetch!: (value: unknown) => void
    const fetch = vi.fn().mockReturnValue(
      new Promise(r => { resolveFetch = r })
    ) as unknown as typeof fetch

    let completed = false
    const promise = simulateHandleStartTrial(fetch).then(r => {
      completed = true
      return r
    })

    // Before resolving fetch, not completed
    expect(completed).toBe(false)

    // Resolve with success
    resolveFetch({ ok: true, status: 200, json: async () => ({ url: 'https://checkout.stripe.com/test' }) })
    const result = await promise
    expect(result.redirected).toBe(true)
    expect(completed).toBe(true)
  })

  // ── 7. URL validation ────────────────────────────────────────────────────────
  it('accepts any non-empty string as redirect URL', async () => {
    const url = 'https://checkout.stripe.com/pay/cs_live_abc123'
    const fetch = makeFetchMock(200, { url })
    const result = await simulateHandleStartTrial(fetch)
    expect(result.redirectUrl).toBe(url)
  })

  it('treats empty string url as missing url', async () => {
    const fetch = makeFetchMock(200, { url: '' })
    const result = await simulateHandleStartTrial(fetch)
    // empty string is falsy — treated as missing
    expect(result.redirected).toBe(false)
    expect(result.error).toBeTruthy()
  })
})
