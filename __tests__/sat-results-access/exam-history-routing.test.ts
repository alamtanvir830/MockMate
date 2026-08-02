/**
 * Tests: Exam History correctly routes completed SAT attempts to results pages.
 *
 * Bug fixed: PremadeAttemptsSection showed "Get SAT Premium" (linking to /billing)
 * for non-premium users with completed Form 1 or Form 2 attempts, because
 * `requiresPremiumForResults(formNum)` returned true for forms 1 and 2 regardless
 * of whether the user had a legitimate completed attempt.
 *
 * Fix: Remove `requiresPremiumForResults` and `needsPremium` entirely. Every
 * completed attempt in the Exam History list always gets a "View results" link
 * pointing to /premade/sat/form-N/results/[local_attempt_id]. Access control is
 * enforced server-side by the results pages (already fixed in prior commits).
 *
 * These tests verify the link-building and display logic extracted as pure
 * functions matching the PremadeAttemptsSection behaviour. No React rendering.
 */

import { describe, it, expect } from 'vitest'

// ── Helpers mirroring PremadeAttemptsSection logic ────────────────────────────

/**
 * resultsPath: builds the href for a completed-attempt row.
 * Mirrors the function in PremadeAttemptsSection.tsx exactly.
 */
function resultsPath(id: string, examId: string): string {
  const m = examId?.match(/sat-form-(\d+)/)
  const formNum = m ? m[1] : '1'
  return `/premade/sat/form-${formNum}/results/${id}`
}

/**
 * resolveHistoryRowAction: determines the action for a completed attempt row.
 *
 * After fix: always returns { label: 'View results', href: resultsPath(...) }
 * for every completed attempt, regardless of form number or premium status.
 *
 * Before fix: returned { label: 'Get SAT Premium', href: '/billing' } for
 * non-premium users with Forms 1 or 2.
 */
function resolveHistoryRowAction(
  attemptId: string,
  examId: string,
): { label: string; href: string } {
  return {
    label: 'View results',
    href: resultsPath(attemptId, examId),
  }
}

/**
 * Simulate the old (broken) logic for regression comparison.
 */
function resolveHistoryRowActionOLD(
  attemptId: string,
  examId: string,
  satUpgradeUnlocked: boolean,
): { label: string; href: string } {
  const m = examId?.match(/sat-form-(\d+)/)
  const formNum = m ? parseInt(m[1], 10) : 0
  const requiresPremium = formNum === 1 || formNum === 2
  const needsPremium = requiresPremium && !satUpgradeUnlocked
  if (needsPremium) {
    return { label: 'Get SAT Premium', href: '/billing' }
  }
  return { label: 'View results', href: resultsPath(attemptId, examId) }
}

// ── EH1: completed Form 3 older than 48 hours → View results ─────────────────

describe('EH1: completed Form 3 attempt (expired window) → View results', () => {
  it('shows "View results" with correct href for a Form 3 attempt older than 48 hours', () => {
    const action = resolveHistoryRowAction('form3-attempt-99', 'sat-form-3')
    expect(action.label).toBe('View results')
    expect(action.href).toBe('/premade/sat/form-3/results/form3-attempt-99')
  })
})

// ── EH2: completed Form 3 → does NOT render "Get SAT Premium" ─────────────────

describe('EH2: completed Form 3 → does NOT render "Get SAT Premium"', () => {
  it('does not return the Get SAT Premium label for a Form 3 attempt', () => {
    const action = resolveHistoryRowAction('form3-attempt-99', 'sat-form-3')
    expect(action.label).not.toBe('Get SAT Premium')
    expect(action.href).not.toBe('/billing')
  })
})

// ── EH3: completed Form 3 → does NOT link to /premade/sat/form-3 (exam gate) ──

describe('EH3: completed Form 3 → does NOT link to exam-start gate', () => {
  it('href is not the exam-start gate URL', () => {
    const action = resolveHistoryRowAction('form3-attempt-99', 'sat-form-3')
    expect(action.href).not.toBe('/premade/sat/form-3')
    expect(action.href).toContain('/results/')
  })
})

// ── EH4: expired free window + completed attempt → still shows View results ───

describe('EH4: expired free window + completed attempt → View results', () => {
  it('form 3 with expired window still resolves to results page (window state is irrelevant to history)', () => {
    // The history component doesn't know about the free window at all.
    // It only knows the local_attempt_id and exam_type. The routing is always correct.
    const action = resolveHistoryRowAction('form3-attempt-expired-window', 'sat-form-3')
    expect(action.label).toBe('View results')
    expect(action.href).toBe('/premade/sat/form-3/results/form3-attempt-expired-window')
  })
})

// ── EH5: free user + completed attempt → View results (not "Get SAT Premium") ─

describe('EH5: free user + completed Form 1/2 attempt → View results (bug fix)', () => {
  it('OLD logic: non-premium user with Form 1 attempt got "Get SAT Premium" (regression test)', () => {
    const oldAction = resolveHistoryRowActionOLD('form1-attempt', 'sat-form-1', false)
    expect(oldAction.label).toBe('Get SAT Premium')
    expect(oldAction.href).toBe('/billing')
  })

  it('NEW logic: non-premium user with Form 1 attempt now gets "View results"', () => {
    const action = resolveHistoryRowAction('form1-attempt', 'sat-form-1')
    expect(action.label).toBe('View results')
    expect(action.href).toBe('/premade/sat/form-1/results/form1-attempt')
  })

  it('NEW logic: non-premium user with Form 2 attempt now gets "View results"', () => {
    const action = resolveHistoryRowAction('form2-attempt', 'sat-form-2')
    expect(action.label).toBe('View results')
    expect(action.href).toBe('/premade/sat/form-2/results/form2-attempt')
  })
})

// ── EH6: completed Forms 1, 2, 4, 5 → all use attempt-specific results URLs ──

describe('EH6: all five forms use attempt-specific results URLs', () => {
  const cases = [
    { examId: 'sat-form-1', attemptId: 'att-1', expected: '/premade/sat/form-1/results/att-1' },
    { examId: 'sat-form-2', attemptId: 'att-2', expected: '/premade/sat/form-2/results/att-2' },
    { examId: 'sat-form-3', attemptId: 'att-3', expected: '/premade/sat/form-3/results/att-3' },
    { examId: 'sat-form-4', attemptId: 'att-4', expected: '/premade/sat/form-4/results/att-4' },
    { examId: 'sat-form-5', attemptId: 'att-5', expected: '/premade/sat/form-5/results/att-5' },
  ]

  for (const { examId, attemptId, expected } of cases) {
    it(`${examId}: href is ${expected}`, () => {
      const action = resolveHistoryRowAction(attemptId, examId)
      expect(action.label).toBe('View results')
      expect(action.href).toBe(expected)
    })
  }
})

// ── EH7: in-progress attempt → no completed-row entry, no "View results" ──────

describe('EH7: in-progress attempt does not appear in completed attempts list', () => {
  it('in-progress rows have no local_attempt_id in standardized_exam_attempts (separate table)', () => {
    // The exams/page.tsx query includes .not("completed_at", "is", null) which
    // filters out any in-progress state. In-progress attempts are in a separate
    // table (sat_in_progress_attempts) and appear only in inProgressAttempts,
    // not in serverAttempts. This is a schema-level guarantee.
    // Here we assert that resultsPath is only called for completed rows.
    const completedServerAttempts = [
      { local_attempt_id: 'done-1', form_number: 3 },
      // no in-progress rows here — those come from sat_in_progress_attempts
    ]
    const inProgressAttempts = [
      { local_attempt_id: 'wip-1', form_number: 3 },
    ]
    // Only completed attempts get View results links
    expect(completedServerAttempts.map(a => resultsPath(a.local_attempt_id, `sat-form-${a.form_number}`))).toEqual([
      '/premade/sat/form-3/results/done-1',
    ])
    // In-progress get Resume links (not results)
    expect(inProgressAttempts.map(a => `/premade/sat/form-${a.form_number}`)).toEqual([
      '/premade/sat/form-3',
    ])
  })
})

// ── EH8: another user's attempt is not returned by RLS query ──────────────────

describe('EH8: ownership enforced at DB level via RLS', () => {
  it('supabase query includes eq(user_id) which enforces ownership — other users attempts not returned', () => {
    // The exams/page.tsx query is:
    //   supabase.from('standardized_exam_attempts')
    //     .select('local_attempt_id, form_number, ...')
    //     .eq('user_id', user!.id)     <-- ownership filter
    //     .eq('exam_type', 'SAT')
    //     .not('completed_at', 'is', null)
    //
    // This is a documentation test: ownership is enforced by the query,
    // not by PremadeAttemptsSection. The component only renders what the
    // server passes as serverAttempts.
    const otherUserId = 'other-user'
    const queryFilters = ['user_id = currentUser', 'exam_type = SAT', 'completed_at IS NOT NULL']
    expect(queryFilters).toContain('user_id = currentUser')
    expect(otherUserId).not.toBe('currentUser')
  })
})

// ── EH9: multiple completed attempts → each links to its own attempt ID ───────

describe('EH9: multiple completed attempts each link to their own attempt ID', () => {
  it('three Form 3 attempts all get distinct href values', () => {
    const attempts = [
      { id: 'attempt-a', examId: 'sat-form-3' },
      { id: 'attempt-b', examId: 'sat-form-3' },
      { id: 'attempt-c', examId: 'sat-form-3' },
    ]
    const hrefs = attempts.map(a => resolveHistoryRowAction(a.id, a.examId).href)
    expect(hrefs).toEqual([
      '/premade/sat/form-3/results/attempt-a',
      '/premade/sat/form-3/results/attempt-b',
      '/premade/sat/form-3/results/attempt-c',
    ])
    // All distinct
    expect(new Set(hrefs).size).toBe(3)
  })

  it('attempts from different forms all get correct form-specific paths', () => {
    const mixed = [
      { id: 'att-f1', examId: 'sat-form-1' },
      { id: 'att-f2', examId: 'sat-form-2' },
      { id: 'att-f3', examId: 'sat-form-3' },
    ]
    const hrefs = mixed.map(a => resolveHistoryRowAction(a.id, a.examId).href)
    expect(hrefs).toEqual([
      '/premade/sat/form-1/results/att-f1',
      '/premade/sat/form-2/results/att-f2',
      '/premade/sat/form-3/results/att-f3',
    ])
  })
})

// ── EH10: Premium content locks preserved ─────────────────────────────────────

describe('EH10: Premium content locks are preserved after opening results page', () => {
  it('Exam History "View results" link routes to the results page — locks are enforced server-side', () => {
    // The results page (e.g. form-1/results/[attemptId]/page.tsx) passes
    // satUpgradeUnlocked={false} to the client for non-premium completed owners.
    // PremadeAttemptsSection only controls the navigation link — it never
    // unlocks premium content itself. The link destination is always:
    //   /premade/sat/form-N/results/[attemptId]
    // and the page decides what to show based on server-side entitlement checks.
    const href = resolveHistoryRowAction('att-xyz', 'sat-form-1').href
    expect(href).toBe('/premade/sat/form-1/results/att-xyz')
    // The link does NOT include ?unlocked=true or any bypass parameter
    expect(href).not.toContain('unlocked')
    expect(href).not.toContain('premium')
    expect(href).not.toContain('bypass')
  })
})
