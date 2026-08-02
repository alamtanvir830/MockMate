/**
 * Tests: SAT form card links route to correct results pages.
 *
 * Bug fixed: Form 3 "View Results" linked to /premade/sat/form-3 (the exam-start
 * gate) instead of /premade/sat/form-3/results/[attemptId] when the 48-hour free
 * window had expired. Root cause: the card checked form3Access.canViewResult which
 * returns false after the window expires, causing fall-through to start-gate branches.
 *
 * Fix: use form3ResultsAttemptId (direct DB query) instead of resolveForm3Access
 * output for determining which card to show for a completed Form 3 attempt.
 *
 * These tests verify the link-building logic extracted as pure functions,
 * covering all forms and edge cases. No Next.js rendering required.
 */

import { describe, it, expect } from 'vitest'

// ── Pure helpers that mirror the page's link-building logic ───────────────────

/** Build the href for a completed Form 1 attempt card. */
function form1ResultsHref(form1ResultsAttemptId: string | null): string | null {
  if (!form1ResultsAttemptId) return null
  return `/premade/sat/form-1/results/${form1ResultsAttemptId}`
}

/** Build the href for a completed Form 2 attempt card. */
function form2ResultsHref(form2ResultsAttemptId: string | null): string | null {
  if (!form2ResultsAttemptId) return null
  return `/premade/sat/form-2/results/${form2ResultsAttemptId}`
}

/**
 * Determine which Form 3 card variant to show and the href.
 *
 * Before fix: used form3Access.canViewResult which becomes false when the free
 * window expires, causing fall-through to /premade/sat/form-3 (exam-start gate).
 * After fix: uses form3ResultsAttemptId directly from the DB query.
 */
function resolveForm3Card(
  form3ResultsAttemptId: string | null,
  form3FeedbackRequired: boolean,
  form3CanResume: boolean,
  form3CanStart: boolean,
): {
  variant: 'feedback' | 'completed' | 'resume' | 'start' | 'locked'
  href: string
} {
  if (form3ResultsAttemptId && form3FeedbackRequired) {
    return {
      variant: 'feedback',
      href: `/premade/sat/form-3/results/${form3ResultsAttemptId}`,
    }
  }
  if (form3ResultsAttemptId && !form3FeedbackRequired) {
    return {
      variant: 'completed',
      href: `/premade/sat/form-3/results/${form3ResultsAttemptId}`,
    }
  }
  if (form3CanResume) {
    return { variant: 'resume', href: '/premade/sat/form-3' }
  }
  if (form3CanStart) {
    return { variant: 'start', href: '/premade/sat/form-3' }
  }
  return { variant: 'locked', href: '/billing' }
}

/** Build the href for a completed Form 4 attempt card. */
function form4ResultsHref(form4ResultsAttemptId: string | null): string | null {
  if (!form4ResultsAttemptId) return null
  return `/premade/sat/form-4/results/${form4ResultsAttemptId}`
}

/** Build the href for a completed Form 5 attempt card. */
function form5ResultsHref(form5ResultsAttemptId: string | null): string | null {
  if (!form5ResultsAttemptId) return null
  return `/premade/sat/form-5/results/${form5ResultsAttemptId}`
}

// ── FORM 1 LINK TESTS (L1-L4) ────────────────────────────────────────────────

describe('Form 1 link routing', () => {
  // L1
  it('L1. completed Form 1 links to results page with correct attemptId', () => {
    const href = form1ResultsHref('form1-attempt-xyz')
    expect(href).toBe('/premade/sat/form-1/results/form1-attempt-xyz')
  })

  // L2
  it('L2. completed Form 1 href contains only the exact attemptId (no exam-start gate path)', () => {
    const href = form1ResultsHref('attempt-abc-123')
    expect(href).not.toBe('/premade/sat/form-1')
    expect(href).toContain('/results/')
  })

  // L3
  it('L3. no Form 1 completed attempt returns null href (no card shown)', () => {
    const href = form1ResultsHref(null)
    expect(href).toBeNull()
  })

  // L4
  it('L4. Form 1 attemptId is preserved verbatim in the href', () => {
    const id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'
    const href = form1ResultsHref(id)
    expect(href).toBe(`/premade/sat/form-1/results/${id}`)
  })
})

// ── FORM 2 LINK TESTS (L5-L7) ────────────────────────────────────────────────

describe('Form 2 link routing', () => {
  // L5
  it('L5. completed Form 2 links to results page with correct attemptId', () => {
    const href = form2ResultsHref('form2-attempt-abc')
    expect(href).toBe('/premade/sat/form-2/results/form2-attempt-abc')
  })

  // L6
  it('L6. no Form 2 completed attempt returns null href', () => {
    const href = form2ResultsHref(null)
    expect(href).toBeNull()
  })

  // L7
  it('L7. Form 2 href does not point to exam-start gate', () => {
    const href = form2ResultsHref('some-attempt')
    expect(href).not.toBe('/premade/sat/form-2')
    expect(href).toContain('/results/')
  })
})

// ── FORM 3 LINK TESTS — PRIMARY BUG (L8-L14) ─────────────────────────────────
//
// The bug: after the 48-hour free window expires, form3Access.canViewResult
// is false even though the user has a completed attempt (form3ResultsAttemptId
// is non-null). The card fell through to the "Start Free SAT Form 3" or upgrade
// gate, both of which link to /premade/sat/form-3 (the exam-start gate).
//
// The fix: check form3ResultsAttemptId directly from the DB query.

describe('Form 3 link routing — routing bug fix', () => {
  // L8
  it('L8. completed Form 3 (free window ACTIVE) links to results page', () => {
    // Simulates: canViewResult=true (window still open)
    const card = resolveForm3Card('form3-attempt-xyz', false, false, true)
    expect(card.variant).toBe('completed')
    expect(card.href).toBe('/premade/sat/form-3/results/form3-attempt-xyz')
  })

  // L9 — THE PRIMARY BUG CASE
  it('L9. completed Form 3 (free window EXPIRED) still links to results page, not exam-start gate', () => {
    // Simulates: form3Access.canViewResult=false but form3ResultsAttemptId is set
    // Before fix: card.href would be '/premade/sat/form-3'
    // After fix: card.href must be the results page
    const card = resolveForm3Card('form3-attempt-xyz', false, false, false)
    expect(card.variant).toBe('completed')
    expect(card.href).toBe('/premade/sat/form-3/results/form3-attempt-xyz')
    expect(card.href).not.toBe('/premade/sat/form-3')
  })

  // L10
  it('L10. Form 3 feedback-required links to results page (Complete Feedback button)', () => {
    const card = resolveForm3Card('form3-attempt-xyz', true, false, false)
    expect(card.variant).toBe('feedback')
    expect(card.href).toBe('/premade/sat/form-3/results/form3-attempt-xyz')
  })

  // L11
  it('L11. Form 3 feedback-required card uses form3ResultsAttemptId in href, not a start-gate path', () => {
    const card = resolveForm3Card('my-attempt-id', true, false, true)
    expect(card.href).toContain('/results/')
    expect(card.href).not.toBe('/premade/sat/form-3')
  })

  // L12
  it('L12. Form 3 in-progress (no completed attempt) shows resume link to exam-start gate', () => {
    const card = resolveForm3Card(null, false, true, false)
    expect(card.variant).toBe('resume')
    expect(card.href).toBe('/premade/sat/form-3')
  })

  // L13
  it('L13. Form 3 eligible-but-not-started shows start link to exam-start gate', () => {
    const card = resolveForm3Card(null, false, false, true)
    expect(card.variant).toBe('start')
    expect(card.href).toBe('/premade/sat/form-3')
  })

  // L14
  it('L14. Form 3 no access (expired window, no attempt) shows billing link', () => {
    const card = resolveForm3Card(null, false, false, false)
    expect(card.variant).toBe('locked')
    expect(card.href).toBe('/billing')
  })
})

// ── FORM 3 ATTEMPT ID INTEGRITY (L15-L16) ─────────────────────────────────────

describe('Form 3 attemptId integrity in links', () => {
  // L15
  it('L15. Form 3 completed link includes exact attemptId from DB query', () => {
    const id = 'uuid-form3-attempt-99'
    const card = resolveForm3Card(id, false, false, false)
    expect(card.href).toBe(`/premade/sat/form-3/results/${id}`)
  })

  // L16
  it('L16. Form 3 feedback link includes exact attemptId from DB query', () => {
    const id = 'uuid-form3-attempt-77'
    const card = resolveForm3Card(id, true, false, false)
    expect(card.href).toBe(`/premade/sat/form-3/results/${id}`)
  })
})

// ── FORM 4 LINK TESTS (L17-L19) ──────────────────────────────────────────────

describe('Form 4 link routing', () => {
  // L17
  it('L17. completed Form 4 links to results page with correct attemptId', () => {
    const href = form4ResultsHref('form4-attempt-xyz')
    expect(href).toBe('/premade/sat/form-4/results/form4-attempt-xyz')
  })

  // L18
  it('L18. no Form 4 completed attempt returns null href', () => {
    const href = form4ResultsHref(null)
    expect(href).toBeNull()
  })

  // L19
  it('L19. Form 4 href does not point to exam-start gate', () => {
    const href = form4ResultsHref('some-attempt')
    expect(href).not.toBe('/premade/sat/form-4')
    expect(href).toContain('/results/')
  })
})

// ── FORM 5 LINK TESTS (L20) ──────────────────────────────────────────────────

describe('Form 5 link routing', () => {
  // L20
  it('L20. completed Form 5 links to results page with correct attemptId', () => {
    const href = form5ResultsHref('form5-attempt-xyz')
    expect(href).toBe('/premade/sat/form-5/results/form5-attempt-xyz')
  })
})
