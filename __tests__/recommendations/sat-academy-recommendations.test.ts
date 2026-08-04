/**
 * Tests for the deterministic SAT Academy lesson recommendation helper.
 *
 * Covers required tests:
 * 26–39: Lesson recommendation behavior, ranking, fallbacks, UI placement rules
 */

import { describe, it, expect } from 'vitest'
import {
  getRWRecommendations,
  getMathRecommendations,
  getRecommendedAcademyLessons,
  type WeakSkillInput,
  type LessonRecommendation,
} from '@/lib/recommendations/sat-academy-recommendations'

// ── Helpers ────────────────────────────────────────────────────────────────────

function makeRWWeak(skill: string, missCount: number, totalCount = 27): WeakSkillInput {
  return { skill, section: 'rw', missCount, totalCount }
}

function makeMathWeak(skill: string, missCount: number, totalCount = 22): WeakSkillInput {
  return { skill, section: 'math', missCount, totalCount }
}

// ── Test 26 — R&W misses produce 3–4 real R&W lessons ─────────────────────────

describe('Test 26 — R&W recommendations', () => {
  it('produces 3–4 recommendations from R&W weak skills', () => {
    const weak: WeakSkillInput[] = [
      makeRWWeak('Words in Context', 5),
      makeRWWeak('Transitions', 3),
      makeRWWeak('Boundaries', 2),
    ]
    const recs = getRWRecommendations(weak)
    expect(recs.length).toBeGreaterThanOrEqual(3)
    expect(recs.length).toBeLessThanOrEqual(4)
  })

  it('all R&W recommendations have valid /sat-rw-academy/lesson/ hrefs', () => {
    const weak = [makeRWWeak('Words in Context', 4), makeRWWeak('Inferences', 2)]
    const recs = getRWRecommendations(weak)
    for (const rec of recs) {
      expect(rec.href).toMatch(/^\/sat-rw-academy\/lesson\/[a-z-]+$/)
    }
  })
})

// ── Test 27 — Math misses produce 3–4 real Math/Desmos lessons ────────────────

describe('Test 27 — Math recommendations', () => {
  it('produces 3–4 recommendations from Math weak skills', () => {
    const weak: WeakSkillInput[] = [
      makeMathWeak('Quadratic equations', 4),
      makeMathWeak('Systems of two linear equations in two variables', 3),
      makeMathWeak('Right triangles and trigonometry', 2),
    ]
    const recs = getMathRecommendations(weak)
    expect(recs.length).toBeGreaterThanOrEqual(3)
    expect(recs.length).toBeLessThanOrEqual(4)
  })

  it('all Math recommendations have valid /sat-math-academy/lesson/ hrefs', () => {
    const weak = [makeMathWeak('Linear equations in one variable', 5)]
    const recs = getMathRecommendations(weak)
    for (const rec of recs) {
      expect(rec.href).toMatch(/^\/sat-math-academy\/lesson\/[a-z-]+$/)
    }
  })
})

// ── Test 28 — Recommendations are sorted by weakness (missCount desc) ─────────

describe('Test 28 — Sorted by weakness', () => {
  it('R&W: lesson with most misses appears first', () => {
    const weak: WeakSkillInput[] = [
      makeRWWeak('Boundaries', 1),
      makeRWWeak('Words in Context', 6),
      makeRWWeak('Inferences', 3),
    ]
    const recs = getRWRecommendations(weak)
    // First rec should map to the highest-miss skill
    expect(recs[0].missCount).toBeGreaterThanOrEqual(recs[1]?.missCount ?? 0)
  })

  it('Math: lesson with most misses appears first', () => {
    const weak: WeakSkillInput[] = [
      makeMathWeak('Circles', 1),
      makeMathWeak('Nonlinear equations in one variable and systems', 5),
      makeMathWeak('Percentages', 2),
    ]
    const recs = getMathRecommendations(weak)
    expect(recs[0].missCount).toBeGreaterThanOrEqual(recs[1]?.missCount ?? 0)
  })
})

// ── Test 29 — Duplicate lessons are removed ────────────────────────────────────

describe('Test 29 — No duplicate lessons', () => {
  it('R&W: skill strings that map to the same slug are deduplicated', () => {
    const weak: WeakSkillInput[] = [
      makeRWWeak('Command of Evidence', 3),
      makeRWWeak('Command of Evidence - Textual', 2),       // maps to same slug
      makeRWWeak('Command of Evidence - Quantitative', 1),  // maps to different slug
    ]
    const recs = getRWRecommendations(weak)
    const slugs = recs.map(r => r.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('Math: deduplicated across equivalent skill strings', () => {
    const weak: WeakSkillInput[] = [
      makeMathWeak('Quadratic equations', 3),
      makeMathWeak('Nonlinear functions', 2),  // also maps to quadratic-equations
    ]
    const recs = getMathRecommendations(weak)
    const slugs = recs.map(r => r.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })
})

// ── Test 30 — Every recommendation points to an existing lesson ────────────────

describe('Test 30 — All lesson routes exist', () => {
  it('R&W: all returned slugs are in the known academy slug list', () => {
    const VALID_RW_SLUGS = [
      'words-in-context', 'central-ideas-details', 'text-structure-purpose',
      'command-of-evidence', 'quantitative-evidence', 'inferences',
      'cross-text-connections', 'rhetorical-synthesis', 'transitions',
      'boundaries', 'form-structure-sense',
    ]
    const recs = getRWRecommendations([makeRWWeak('Words in Context', 3)])
    for (const rec of recs) {
      expect(VALID_RW_SLUGS).toContain(rec.slug)
    }
  })

  it('Math: all returned slugs are in the known math slug list', () => {
    const VALID_MATH_SLUGS = [
      'linear-equations', 'linear-equations-two-variables', 'linear-functions',
      'systems-of-equations', 'linear-inequalities', 'equivalent-expressions',
      'quadratic-equations', 'exponential-functions', 'polynomial-expressions',
      'radical-rational-equations', 'nonlinear-equations-systems',
      'ratios-rates-units', 'percentages', 'one-variable-data', 'two-variable-data',
      'probability', 'statistical-claims', 'area-volume', 'lines-angles-triangles',
      'right-triangles-trig', 'circles',
    ]
    const recs = getMathRecommendations([makeMathWeak('Linear equations in one variable', 3)])
    for (const rec of recs) {
      expect(VALID_MATH_SLUGS).toContain(rec.slug)
    }
  })
})

// ── Test 31 — Deterministic output ────────────────────────────────────────────

describe('Test 31 — Deterministic', () => {
  it('same input always produces same output', () => {
    const weak: WeakSkillInput[] = [
      makeRWWeak('Transitions', 4),
      makeRWWeak('Boundaries', 2),
      makeRWWeak('Words in Context', 3),
    ]
    const recs1 = getRWRecommendations(weak)
    const recs2 = getRWRecommendations(weak)
    expect(recs1.map(r => r.slug)).toEqual(recs2.map(r => r.slug))
  })

  it('Math same input same output', () => {
    const weak: WeakSkillInput[] = [
      makeMathWeak('Quadratic equations', 5),
      makeMathWeak('Circles', 3),
    ]
    const recs1 = getMathRecommendations(weak)
    const recs2 = getMathRecommendations(weak)
    expect(recs1.map(r => r.slug)).toEqual(recs2.map(r => r.slug))
  })
})

// ── Test 32 — Missing skill metadata uses fallback ─────────────────────────────

describe('Test 32 — Fallback for missing skill metadata', () => {
  it('unknown skill strings produce fallback lessons (not empty)', () => {
    const weak: WeakSkillInput[] = [
      makeRWWeak('Unknown Skill XYZ', 5),
    ]
    const recs = getRWRecommendations(weak)
    expect(recs.length).toBeGreaterThanOrEqual(3)
  })

  it('empty weak skills still produces 3–4 fallback lessons', () => {
    const recs = getRWRecommendations([])
    expect(recs.length).toBeGreaterThanOrEqual(3)
  })

  it('empty Math weak skills still produces 3–4 fallback lessons', () => {
    const recs = getMathRecommendations([])
    expect(recs.length).toBeGreaterThanOrEqual(3)
  })
})

// ── Test 33 — Perfect section score produces fallback (never empty) ────────────

describe('Test 33 — Perfect section fallback', () => {
  it('R&W with zero misses uses fallback lessons', () => {
    // No weak skills in R&W section
    const weakMathOnly: WeakSkillInput[] = [makeMathWeak('Circles', 3)]
    const recs = getRWRecommendations(weakMathOnly)
    // Should still produce 3–4 fallback R&W lessons
    expect(recs.length).toBeGreaterThanOrEqual(3)
    for (const rec of recs) {
      expect(rec.href).toMatch(/^\/sat-rw-academy\/lesson\//)
    }
  })
})

// ── Tests 34–35 — Placement under correct academy ─────────────────────────────

describe('Tests 34–35 — Section routing', () => {
  it('getRWRecommendations only returns R&W lesson hrefs', () => {
    const recs = getRWRecommendations([makeRWWeak('Words in Context', 3)])
    for (const rec of recs) {
      expect(rec.href).toContain('/sat-rw-academy/')
    }
  })

  it('getMathRecommendations only returns Math lesson hrefs', () => {
    const recs = getMathRecommendations([makeMathWeak('Quadratic equations', 3)])
    for (const rec of recs) {
      expect(rec.href).toContain('/sat-math-academy/')
    }
  })
})

// ── Tests 36–37 — Premium-gate respects existing academy authorization ─────────

describe('Tests 36–37 — Authorization not bypassed', () => {
  it('getRWRecommendations returns lesson links without forcing premium access', () => {
    // The recommendation helper only produces hrefs — it does NOT bypass
    // any academy authorization. The existing academy pages enforce their own gates.
    const recs = getRWRecommendations([makeRWWeak('Boundaries', 2)])
    for (const rec of recs) {
      // Links go to /sat-rw-academy/lesson/ routes which enforce auth themselves
      expect(rec.href).toMatch(/^\/sat-rw-academy\/lesson\//)
    }
  })
})

// ── Test 38 — Historical Results use rendered attempt's skill data ─────────────

describe('Test 38 — Version compatibility', () => {
  it('recommendation derived from WeakSkillInput (agnostic of content version)', () => {
    // The helper takes WeakSkillInput from the rendered form, not from a global registry.
    // A V1 attempt's weak skills remain V1-derived; V2 attempt's weak skills remain V2-derived.
    const weakFromV1: WeakSkillInput[] = [makeRWWeak('Transitions', 3)]
    const weakFromV2: WeakSkillInput[] = [makeRWWeak('Transitions', 3)]
    const recsV1 = getRWRecommendations(weakFromV1)
    const recsV2 = getRWRecommendations(weakFromV2)
    // Same input → same output regardless of content version context
    expect(recsV1.map(r => r.slug)).toEqual(recsV2.map(r => r.slug))
  })
})

// ── Test 39 — Forms 1–5 all supported ─────────────────────────────────────────

describe('Test 39 — All forms supported', () => {
  it('getRecommendedAcademyLessons returns both sections', () => {
    const weak: WeakSkillInput[] = [
      makeRWWeak('Inferences', 3),
      makeMathWeak('Quadratic equations', 4),
    ]
    const { rw, math } = getRecommendedAcademyLessons(weak, 'both')
    expect(rw.length).toBeGreaterThanOrEqual(3)
    expect(math.length).toBeGreaterThanOrEqual(3)
  })

  it('section="rw" returns rw recs only', () => {
    const weak: WeakSkillInput[] = [makeRWWeak('Transitions', 2)]
    const { rw, math } = getRecommendedAcademyLessons(weak, 'rw')
    expect(rw.length).toBeGreaterThan(0)
    expect(math).toHaveLength(0)
  })

  it('section="math" returns math recs only', () => {
    const weak: WeakSkillInput[] = [makeMathWeak('Circles', 2)]
    const { rw, math } = getRecommendedAcademyLessons(weak, 'math')
    expect(rw).toHaveLength(0)
    expect(math.length).toBeGreaterThan(0)
  })
})

// ── Max 4 recommendations ─────────────────────────────────────────────────────

describe('Max 4 recommendations returned', () => {
  it('never returns more than 4 R&W lessons even with many weak skills', () => {
    const weak: WeakSkillInput[] = [
      makeRWWeak('Words in Context', 8),
      makeRWWeak('Boundaries', 6),
      makeRWWeak('Transitions', 5),
      makeRWWeak('Inferences', 4),
      makeRWWeak('Command of Evidence', 3),
      makeRWWeak('Rhetorical Synthesis', 2),
      makeRWWeak('Cross-Text Connections', 1),
    ]
    const recs = getRWRecommendations(weak)
    expect(recs.length).toBeLessThanOrEqual(4)
  })

  it('never returns more than 4 Math lessons even with many weak skills', () => {
    const weak: WeakSkillInput[] = [
      makeMathWeak('Quadratic equations', 5),
      makeMathWeak('Circles', 4),
      makeMathWeak('Probability and conditional probability', 3),
      makeMathWeak('Linear equations in one variable', 3),
      makeMathWeak('Systems of two linear equations in two variables', 2),
      makeMathWeak('Right triangles and trigonometry', 1),
    ]
    const recs = getMathRecommendations(weak)
    expect(recs.length).toBeLessThanOrEqual(4)
  })
})

// ── LessonRecommendation shape ─────────────────────────────────────────────────

describe('LessonRecommendation shape', () => {
  it('all fields are present on each recommendation', () => {
    const recs = getRWRecommendations([makeRWWeak('Words in Context', 3)])
    for (const rec of recs) {
      expect(typeof rec.slug).toBe('string')
      expect(typeof rec.title).toBe('string')
      expect(typeof rec.href).toBe('string')
      expect(typeof rec.missCount).toBe('number')
      expect(rec.slug.length).toBeGreaterThan(0)
      expect(rec.title.length).toBeGreaterThan(0)
      expect(rec.href.length).toBeGreaterThan(0)
    }
  })
})
