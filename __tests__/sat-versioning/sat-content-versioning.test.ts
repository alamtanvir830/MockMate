import { describe, it, expect } from 'vitest'
import {
  SAT_CONTENT_VERSION_V1,
  SAT_CONTENT_VERSION_V2,
  SAT_CONTENT_VERSION_V3,
  SAT_CONTENT_VERSION_V4,
  CURRENT_SAT_CONTENT_VERSION,
  LATEST_SAT_FORM_VERSION,
  FORM_MINIMUM_VERSION,
  getLatestSatContentVersion,
  normalizeSatContentVersion,
  isAttemptStaleForForm,
} from '@/lib/premade-exams/sat/version-constants'
import { getSatForm } from '@/lib/premade-exams/sat/sat-form-resolver'
import { satForm1 } from '@/lib/premade-exams/sat/form-1'
import { satForm2 } from '@/lib/premade-exams/sat/form-2'
import { satForm3 } from '@/lib/premade-exams/sat/form-3'
import { satForm4 } from '@/lib/premade-exams/sat/form-4'
import { satForm5 } from '@/lib/premade-exams/sat/form-5'
import { satForm1V2 } from '@/lib/premade-exams/sat/v2/form-1'
import { satForm2V2 } from '@/lib/premade-exams/sat/v2/form-2'
import { satForm3V2 } from '@/lib/premade-exams/sat/v2/form-3'
import { satForm4V2 } from '@/lib/premade-exams/sat/v2/form-4'
import { satForm5V2 } from '@/lib/premade-exams/sat/v2/form-5'
import { satForm7V3 } from '@/lib/premade-exams/sat/v3/form-7'
import { satForm7V4 } from '@/lib/premade-exams/sat/v4/form-7'

// ─── Version constants ────────────────────────────────────────────────────────

describe('SAT content version constants', () => {
  it('V1 is 1', () => expect(SAT_CONTENT_VERSION_V1).toBe(1))
  it('V2 is 2', () => expect(SAT_CONTENT_VERSION_V2).toBe(2))
  it('V3 is 3', () => expect(SAT_CONTENT_VERSION_V3).toBe(3))
  it('V4 is 4', () => expect(SAT_CONTENT_VERSION_V4).toBe(4))
  it('CURRENT is V4', () => expect(CURRENT_SAT_CONTENT_VERSION).toBe(4))
  it('FORM_MINIMUM_VERSION[7] is 4', () => expect(FORM_MINIMUM_VERSION[7]).toBe(4))
  it('FORM_MINIMUM_VERSION[1] is 2 (V2 is minimum for all non-V4 forms)', () => expect(FORM_MINIMUM_VERSION[1]).toBe(2))
})

// ─── Per-form latest version registry ────────────────────────────────────────

describe('LATEST_SAT_FORM_VERSION registry', () => {
  it('covers all 10 forms', () => {
    for (let f = 1; f <= 10; f++) {
      expect(LATEST_SAT_FORM_VERSION[f], `Form ${f} missing from registry`).toBeDefined()
    }
  })

  it('Forms 1–6 latest is V2', () => {
    for (let f = 1; f <= 6; f++) {
      expect(LATEST_SAT_FORM_VERSION[f], `Form ${f} should be V2`).toBe(2)
    }
  })

  it('Form 7 latest is V4', () => {
    expect(LATEST_SAT_FORM_VERSION[7]).toBe(4)
  })

  it('Forms 8–10 latest is V2', () => {
    for (let f = 8; f <= 10; f++) {
      expect(LATEST_SAT_FORM_VERSION[f], `Form ${f} should be V2`).toBe(2)
    }
  })

  it('all values are valid SATContentVersion (1, 2, 3, or 4)', () => {
    const valid = new Set([1, 2, 3, 4])
    for (let f = 1; f <= 10; f++) {
      expect(valid.has(LATEST_SAT_FORM_VERSION[f]), `Form ${f} has invalid version ${LATEST_SAT_FORM_VERSION[f]}`).toBe(true)
    }
  })

  it('LATEST_SAT_FORM_VERSION and FORM_MINIMUM_VERSION are in sync', () => {
    for (let f = 1; f <= 10; f++) {
      expect(LATEST_SAT_FORM_VERSION[f], `Form ${f}: LATEST vs MINIMUM mismatch`).toBe(FORM_MINIMUM_VERSION[f])
    }
  })
})

describe('getLatestSatContentVersion', () => {
  it('returns 2 for Forms 1–6', () => {
    for (let f = 1; f <= 6; f++) {
      expect(getLatestSatContentVersion(f), `Form ${f}`).toBe(2)
    }
  })

  it('returns 4 for Form 7', () => {
    expect(getLatestSatContentVersion(7)).toBe(4)
  })

  it('returns 2 for Forms 8–10', () => {
    for (let f = 8; f <= 10; f++) {
      expect(getLatestSatContentVersion(f), `Form ${f}`).toBe(2)
    }
  })

  it('unknown form number falls back to V2', () => {
    expect(getLatestSatContentVersion(99)).toBe(2)
  })

  it('getSatForm(N, getLatestSatContentVersion(N)) returns actual latest content for every form', () => {
    // Forms 1–6, 8–10: V2 content
    for (const f of [1, 2, 3, 4, 5, 6, 8, 9, 10]) {
      const form = getSatForm(f, getLatestSatContentVersion(f))
      // V2 question IDs contain "-v2-"
      const ids = form.sections.flatMap(s => s.modules.flatMap(m => m.questions.map(q => q.id)))
      const allV2 = ids.every(id => id.includes('-v2-'))
      expect(allV2, `Form ${f}: expected all V2 IDs, got ${ids.filter(id => !id.includes('-v2-')).slice(0, 3).join(', ')}`).toBe(true)
    }
    // Form 7: V4 content
    const f7 = getSatForm(7, getLatestSatContentVersion(7))
    expect(f7).toBe(satForm7V4)
    const f7Ids = f7.sections.flatMap(s => s.modules.flatMap(m => m.questions.map(q => q.id)))
    const allV4 = f7Ids.every(id => id.startsWith('sat-f7-v4-'))
    expect(allV4, 'Form 7: expected all V4 IDs').toBe(true)
  })

  it('fresh-attempt version matches the content actually served — no version inflation', () => {
    // The bug: storing V4 but serving V2. Verify getSatForm(N, getLatestSatContentVersion(N))
    // returns EXACTLY the version stored (not a fallback-inflated version).
    for (let f = 1; f <= 10; f++) {
      const storedVersion = getLatestSatContentVersion(f)
      const form = getSatForm(f, storedVersion)
      // Re-resolve with the stored version — must return the same object (no drift)
      const resolved = getSatForm(f, storedVersion)
      expect(resolved, `Form ${f}: re-resolving stored version returns different object`).toBe(form)
    }
  })
})

// ─── normalizeSatContentVersion ───────────────────────────────────────────────

describe('normalizeSatContentVersion', () => {
  it('1 → V1', () => expect(normalizeSatContentVersion(1)).toBe(1))
  it('2 → V2', () => expect(normalizeSatContentVersion(2)).toBe(2))
  it('3 → V3', () => expect(normalizeSatContentVersion(3)).toBe(3))
  it('4 → V4', () => expect(normalizeSatContentVersion(4)).toBe(4))
  it('undefined → V1 (backward compat)', () => expect(normalizeSatContentVersion(undefined)).toBe(1))
  it('null → V1 (backward compat)', () => expect(normalizeSatContentVersion(null)).toBe(1))
  it('0 → V1 (fail safe)', () => expect(normalizeSatContentVersion(0)).toBe(1))
  it('"2" → V1 (strict — not number 2)', () => expect(normalizeSatContentVersion('2')).toBe(1))
  it('{} → V1 (fail safe)', () => expect(normalizeSatContentVersion({})).toBe(1))
  it('NaN → V1 (fail safe)', () => expect(normalizeSatContentVersion(NaN)).toBe(1))
  it('missing field on old attempt → V1', () => {
    const oldAttempt = { answers: {}, rwM2Type: 'easy' } // no contentVersion
    expect(normalizeSatContentVersion((oldAttempt as Record<string, unknown>).contentVersion)).toBe(1)
  })
})

// ─── isAttemptStaleForForm ────────────────────────────────────────────────────

describe('isAttemptStaleForForm', () => {
  it('Form 7 + V1 stored → stale', () => expect(isAttemptStaleForForm(7, 1)).toBe(true))
  it('Form 7 + V2 stored → stale', () => expect(isAttemptStaleForForm(7, 2)).toBe(true))
  it('Form 7 + V3 stored → stale (V4 is now minimum)', () => expect(isAttemptStaleForForm(7, 3)).toBe(true))
  it('Form 7 + V4 stored → not stale', () => expect(isAttemptStaleForForm(7, 4)).toBe(false))
  it('Form 7 + undefined stored → stale (normalizes to V1)', () => expect(isAttemptStaleForForm(7, undefined)).toBe(true))
  it('Form 1 + V1 stored → stale (minimum is V2 for all forms)', () => expect(isAttemptStaleForForm(1, 1)).toBe(true))
  it('Form 1 + V2 stored → not stale (V2 meets minimum)', () => expect(isAttemptStaleForForm(1, 2)).toBe(false))
  it('Form 6 + V1 stored → stale (minimum is V2)', () => expect(isAttemptStaleForForm(6, 1)).toBe(true))
  it('Form 6 + V2 stored → not stale (V2 meets minimum)', () => expect(isAttemptStaleForForm(6, 2)).toBe(false))
  it('Form 8 + V1 stored → stale (minimum is V2)', () => expect(isAttemptStaleForForm(8, 1)).toBe(true))
  it('Form 8 + V2 stored → not stale (V2 meets minimum)', () => expect(isAttemptStaleForForm(8, 2)).toBe(false))
})

// ─── getSatForm resolver ──────────────────────────────────────────────────────

describe('getSatForm — V1 forms', () => {
  it('returns form 1 V1 for contentVersion=1', () => {
    expect(getSatForm(1, 1)).toBe(satForm1)
  })
  it('returns form 2 V1 for contentVersion=1', () => {
    expect(getSatForm(2, 1)).toBe(satForm2)
  })
  it('returns form 3 V1 for contentVersion=1', () => {
    expect(getSatForm(3, 1)).toBe(satForm3)
  })
  it('returns form 4 V1 for contentVersion=1', () => {
    expect(getSatForm(4, 1)).toBe(satForm4)
  })
  it('returns form 5 V1 for contentVersion=1', () => {
    expect(getSatForm(5, 1)).toBe(satForm5)
  })
  it('missing version (undefined) → V1', () => {
    expect(getSatForm(1, undefined)).toBe(satForm1)
  })
  it('null version → V1', () => {
    expect(getSatForm(3, null)).toBe(satForm3)
  })
})

describe('getSatForm — V2 forms', () => {
  it('returns form 1 V2 for contentVersion=2', () => {
    expect(getSatForm(1, 2)).toBe(satForm1V2)
  })
  it('returns form 2 V2 for contentVersion=2', () => {
    expect(getSatForm(2, 2)).toBe(satForm2V2)
  })
  it('returns form 3 V2 for contentVersion=2', () => {
    expect(getSatForm(3, 2)).toBe(satForm3V2)
  })
  it('returns form 4 V2 for contentVersion=2', () => {
    expect(getSatForm(4, 2)).toBe(satForm4V2)
  })
  it('returns form 5 V2 for contentVersion=2', () => {
    expect(getSatForm(5, 2)).toBe(satForm5V2)
  })
  // Form 7 V2 is still accessible for completed-attempt review
  it('returns Form 7 V2 for contentVersion=2', () => {
    const f7v2 = getSatForm(7, 2)
    expect(f7v2.id).toBe('sat-form-7')
    expect(f7v2).not.toBe(satForm7V3)
  })
})

describe('getSatForm — V3 forms', () => {
  it('returns Form 7 V3 for contentVersion=3', () => {
    expect(getSatForm(7, 3)).toBe(satForm7V3)
  })
  it('Form 7 V3 id is sat-form-7', () => {
    expect(satForm7V3.id).toBe('sat-form-7')
  })
  it('Form 1 with V3 falls through to V2 (no V3 content for form 1)', () => {
    expect(getSatForm(1, 3)).toBe(satForm1V2)
  })
  it('Form 6 with V3 falls through to V2', () => {
    expect(getSatForm(6, 3)).not.toBeUndefined()
  })
  it('Form 8 with V3 falls through to V2', () => {
    expect(getSatForm(8, 3)).not.toBeUndefined()
  })
  it('Form 7 V3 and V2 are different objects', () => {
    expect(getSatForm(7, 3)).not.toBe(getSatForm(7, 2))
  })
})

describe('getSatForm — V4 forms', () => {
  it('returns Form 7 V4 for contentVersion=4', () => {
    expect(getSatForm(7, 4)).toBe(satForm7V4)
  })
  it('Form 7 V4 id is sat-form-7', () => {
    expect(satForm7V4.id).toBe('sat-form-7')
  })
  it('CURRENT_SAT_CONTENT_VERSION resolves Form 7 V4', () => {
    expect(getSatForm(7, CURRENT_SAT_CONTENT_VERSION)).toBe(satForm7V4)
  })
  it('Form 1 with V4 falls through to V2 (no V4 content for form 1)', () => {
    expect(getSatForm(1, 4)).toBe(satForm1V2)
  })
  it('Form 6 with V4 falls through to V2', () => {
    expect(getSatForm(6, 4)).not.toBeUndefined()
  })
  it('Form 8 with V4 falls through to V2', () => {
    expect(getSatForm(8, 4)).not.toBeUndefined()
  })
  it('Form 7 V4 and V3 are different objects', () => {
    expect(getSatForm(7, 4)).not.toBe(getSatForm(7, 3))
  })
  it('Form 7 V4 and V2 are different objects', () => {
    expect(getSatForm(7, 4)).not.toBe(getSatForm(7, 2))
  })
})

describe('getSatForm — throws on invalid form number', () => {
  it('throws for form 0', () => {
    expect(() => getSatForm(0, 1)).toThrow()
  })
  it('throws for form 11 (above supported range)', () => {
    expect(() => getSatForm(11, 2)).toThrow()
  })
})

// ─── V1/V2 content isolation ──────────────────────────────────────────────────

describe('V1 / V2 content isolation', () => {
  it('V1 and V2 form-1 are different objects', () => {
    expect(getSatForm(1, 1)).not.toBe(getSatForm(1, 2))
  })
  it('V1 and V2 form-3 are different objects', () => {
    expect(getSatForm(3, 1)).not.toBe(getSatForm(3, 2))
  })

  it('Form 3 V1 retains original Vieta question (5x² − 30x + p = 0)', () => {
    const f3v1 = getSatForm(3, 1)
    const mathM2Hard = f3v1.sections[1].modules[2]
    const vietaQ = mathM2Hard.questions.find(q => q.id === 'sat-f3-math-m2h-q07')
    expect(vietaQ).toBeDefined()
    expect((vietaQ as { question: string }).question).toContain('5x² − 30x + p = 0')
  })

  it('Form 3 V2 contains corrected Vieta question (5x² − 45x + p = 0)', () => {
    const f3v2 = getSatForm(3, 2)
    const mathM2Hard = f3v2.sections[1].modules[2]
    const vietaQ = mathM2Hard.questions.find(q => q.id === 'sat-f3-v2-math-m2h-q07')
    expect(vietaQ).toBeDefined()
    expect((vietaQ as { question: string }).question).toContain('5x² − 45x + p = 0')
  })

  it('V1 question IDs do not appear in V2 form-1 modules', () => {
    const f1v1 = getSatForm(1, 1)
    const f1v2 = getSatForm(1, 2)
    const v1Ids = new Set(
      f1v1.sections.flatMap(s => s.modules.flatMap(m => m.questions.map(q => q.id)))
    )
    const v2Ids = f1v2.sections.flatMap(s => s.modules.flatMap(m => m.questions.map(q => q.id)))
    const overlap = v2Ids.filter(id => v1Ids.has(id))
    expect(overlap).toHaveLength(0)
  })

  it('V2 question IDs all contain "-v2-"', () => {
    for (let form = 1; form <= 5; form++) {
      const f = getSatForm(form, 2)
      const ids = f.sections.flatMap(s => s.modules.flatMap(m => m.questions.map(q => q.id)))
      const bad = ids.filter(id => !id.includes('-v2-'))
      expect(bad, `Form ${form} V2 IDs without -v2-: ${bad.join(', ')}`).toHaveLength(0)
    }
  })

  it('V1 question IDs do NOT contain "-v2-"', () => {
    for (let form = 1; form <= 5; form++) {
      const f = getSatForm(form, 1)
      const ids = f.sections.flatMap(s => s.modules.flatMap(m => m.questions.map(q => q.id)))
      const bad = ids.filter(id => id.includes('-v2-'))
      expect(bad, `Form ${form} V1 IDs with -v2-: ${bad.join(', ')}`).toHaveLength(0)
    }
  })
})

// ─── Module structure invariants ──────────────────────────────────────────────

describe('V2 module structure', () => {
  const MODULE_COUNTS = { rw: [27, 27, 27], math: [22, 22, 22] } as const

  for (let form = 1; form <= 5; form++) {
    it(`Form ${form} V2 has 27/27/27 RW and 22/22/22 Math questions`, () => {
      const f = getSatForm(form, 2)
      const rw = f.sections[0]
      const math = f.sections[1]
      expect(rw.modules.map(m => m.questions.length)).toEqual([...MODULE_COUNTS.rw])
      expect(math.modules.map(m => m.questions.length)).toEqual([...MODULE_COUNTS.math])
    })
  }

  for (let form = 1; form <= 5; form++) {
    it(`Form ${form} V1 still has 27/27/27 RW and 22/22/22 Math questions`, () => {
      const f = getSatForm(form, 1)
      const rw = f.sections[0]
      const math = f.sections[1]
      expect(rw.modules.map(m => m.questions.length)).toEqual([...MODULE_COUNTS.rw])
      expect(math.modules.map(m => m.questions.length)).toEqual([...MODULE_COUNTS.math])
    })
  }

  it('Adaptive module types: routing / easy / hard for all forms V2', () => {
    for (let form = 1; form <= 5; form++) {
      const f = getSatForm(form, 2)
      for (const section of f.sections) {
        const types = section.modules.map(m => m.type)
        expect(types).toEqual(['routing', 'easy', 'hard'])
      }
    }
  })
})

// ─── V2 question-ID uniqueness ────────────────────────────────────────────────

describe('V2 question IDs are globally unique', () => {
  it('no duplicate question IDs within a single V2 form', () => {
    for (let form = 1; form <= 5; form++) {
      const f = getSatForm(form, 2)
      const allIds = f.sections.flatMap(s => s.modules.flatMap(m => m.questions.map(q => q.id)))
      const unique = new Set(allIds)
      expect(unique.size, `Form ${form} V2 has duplicate IDs`).toBe(allIds.length)
    }
  })

  it('no duplicate question IDs across all V2 forms', () => {
    const allIds: string[] = []
    for (let form = 1; form <= 5; form++) {
      const f = getSatForm(form, 2)
      allIds.push(...f.sections.flatMap(s => s.modules.flatMap(m => m.questions.map(q => q.id))))
    }
    const unique = new Set(allIds)
    expect(unique.size).toBe(allIds.length)
  })
})

// ─── V1 immutability snapshot: answer keys ────────────────────────────────────

describe('V1 answer key snapshot (Form 3 Math M2H)', () => {
  it('Q07 (Vieta) correct answer is still C', () => {
    const f3 = getSatForm(3, 1)
    const m2h = f3.sections[1].modules[2]
    const q07 = m2h.questions.find(q => q.id === 'sat-f3-math-m2h-q07') as { correctAnswer: string }
    expect(q07.correctAnswer).toBe('C')
  })

  it('Form 3 V1 Q01 answer is unchanged (C)', () => {
    const f3 = getSatForm(3, 1)
    const m2h = f3.sections[1].modules[2]
    const q01 = m2h.questions.find(q => q.id === 'sat-f3-math-m2h-q01') as { correctAnswer: string }
    expect(q01.correctAnswer).toBe('C')
  })
})

// ─── New attempt receives V3 ───────────────────────────────────────────────────

describe('New attempt content version', () => {
  it('CURRENT_SAT_CONTENT_VERSION is 4', () => {
    expect(CURRENT_SAT_CONTENT_VERSION).toBe(4)
  })

  it('resolving CURRENT for form 7 returns V4 form', () => {
    const resolved = getSatForm(7, CURRENT_SAT_CONTENT_VERSION)
    expect(resolved).toBe(satForm7V4)
    expect(resolved).not.toBe(getSatForm(7, 3))
    expect(resolved).not.toBe(getSatForm(7, 2))
  })

  it('resolving CURRENT for form 1 still returns V2 (no V4 for form 1)', () => {
    const resolved = getSatForm(1, CURRENT_SAT_CONTENT_VERSION)
    expect(resolved).toBe(satForm1V2)
    expect(resolved).not.toBe(satForm1)
  })
})

// ─── Historical attempt backward compatibility ─────────────────────────────────

describe('Historical attempt backward compat', () => {
  it('attempt with no contentVersion normalizes to V1', () => {
    const stored = { answers: {}, rwM2Type: 'easy', mathM2Type: 'easy' }
    const version = normalizeSatContentVersion((stored as Record<string, unknown>).contentVersion)
    expect(version).toBe(1)
    expect(getSatForm(3, version)).toBe(satForm3)
  })

  it('attempt with contentVersion=1 uses V1 form', () => {
    const stored = { contentVersion: 1 }
    const version = normalizeSatContentVersion(stored.contentVersion)
    expect(getSatForm(2, version)).toBe(satForm2)
  })

  it('attempt with contentVersion=2 uses V2 form', () => {
    const stored = { contentVersion: 2 }
    const version = normalizeSatContentVersion(stored.contentVersion)
    expect(getSatForm(4, version)).toBe(satForm4V2)
  })

  it('Form 7 attempt with contentVersion=2 resolves to V2 form (completed attempt review)', () => {
    const stored = { contentVersion: 2 }
    const version = normalizeSatContentVersion(stored.contentVersion)
    const form = getSatForm(7, version)
    // Must NOT be V3 — a completed V2 Form 7 review must show V2 questions
    expect(form).not.toBe(satForm7V3)
    expect(form.id).toBe('sat-form-7')
  })

  it('Form 7 attempt with contentVersion=3 resolves to V3 form (completed V3 review)', () => {
    const stored = { contentVersion: 3 }
    const version = normalizeSatContentVersion(stored.contentVersion)
    const form = getSatForm(7, version)
    expect(form).toBe(satForm7V3)
    // Must NOT be V4 — a completed V3 Form 7 review must show V3 questions
    expect(form).not.toBe(satForm7V4)
  })

  it('Form 7 attempt with contentVersion=4 resolves to V4 form', () => {
    const stored = { contentVersion: 4 }
    const version = normalizeSatContentVersion(stored.contentVersion)
    expect(getSatForm(7, version)).toBe(satForm7V4)
  })

  it('changing V2 form does not affect V1 form object', () => {
    const v1 = getSatForm(3, 1)
    const v2 = getSatForm(3, 2)
    // They are completely different object references
    expect(v1).not.toBe(v2)
    // Changing V2 does not affect V1 question data
    const v1Q = v1.sections[1].modules[2].questions[0]
    const v2Q = v2.sections[1].modules[2].questions[0]
    expect(v1Q).not.toBe(v2Q)
  })
})

// ─── Form 7 V3 structure invariants ───────────────────────────────────────────

describe('Form 7 V3 module structure', () => {
  it('has 27/27/27 RW questions', () => {
    const rw = satForm7V3.sections[0]
    expect(rw.modules.map(m => m.questions.length)).toEqual([27, 27, 27])
  })

  it('has 22/22/22 Math questions', () => {
    const math = satForm7V3.sections[1]
    expect(math.modules.map(m => m.questions.length)).toEqual([22, 22, 22])
  })

  it('module types are routing / easy / hard for both sections', () => {
    for (const section of satForm7V3.sections) {
      const types = section.modules.map(m => m.type)
      expect(types).toEqual(['routing', 'easy', 'hard'])
    }
  })

  it('all module IDs use f7v3- prefix', () => {
    const moduleIds = satForm7V3.sections.flatMap(s => s.modules.map(m => m.id))
    for (const id of moduleIds) {
      expect(id, `Module ID '${id}' should start with 'f7v3-'`).toMatch(/^f7v3-/)
    }
  })

  it('all question IDs use sat-f7-v3- prefix', () => {
    const allIds = satForm7V3.sections.flatMap(s =>
      s.modules.flatMap(m => m.questions.map(q => q.id))
    )
    const bad = allIds.filter(id => !id.startsWith('sat-f7-v3-'))
    expect(bad, `Non-V3 IDs found: ${bad.join(', ')}`).toHaveLength(0)
  })

  it('no duplicate question IDs within Form 7 V3', () => {
    const allIds = satForm7V3.sections.flatMap(s =>
      s.modules.flatMap(m => m.questions.map(q => q.id))
    )
    const unique = new Set(allIds)
    expect(unique.size, 'Form 7 V3 has duplicate question IDs').toBe(allIds.length)
  })

  it('V3 IDs do not overlap with V2 IDs', () => {
    const v2 = getSatForm(7, 2)
    const v2Ids = new Set(
      v2.sections.flatMap(s => s.modules.flatMap(m => m.questions.map(q => q.id)))
    )
    const v3Ids = satForm7V3.sections.flatMap(s =>
      s.modules.flatMap(m => m.questions.map(q => q.id))
    )
    const overlap = v3Ids.filter(id => v2Ids.has(id))
    expect(overlap, `V3/V2 ID overlap: ${overlap.join(', ')}`).toHaveLength(0)
  })

  it('Math M1 has 16 MC and 6 grid_in questions', () => {
    const mathM1 = satForm7V3.sections[1].modules[0]
    const mc = mathM1.questions.filter(q => (q as { type?: string }).type === 'multiple_choice')
    const gridIn = mathM1.questions.filter(q => (q as { type?: string }).type === 'grid_in')
    expect(mc).toHaveLength(16)
    expect(gridIn).toHaveLength(6)
  })

  it('Math M2-Hard has 16 MC and 6 grid_in questions', () => {
    const mathM2H = satForm7V3.sections[1].modules[2]
    const mc = mathM2H.questions.filter(q => (q as { type?: string }).type === 'multiple_choice')
    const gridIn = mathM2H.questions.filter(q => (q as { type?: string }).type === 'grid_in')
    expect(mc).toHaveLength(16)
    expect(gridIn).toHaveLength(6)
  })

  it('Form 7 V3 Math M2-Hard contains hard-difficulty questions', () => {
    const mathM2H = satForm7V3.sections[1].modules[2]
    const hardQs = mathM2H.questions.filter(q => (q as { difficulty?: string }).difficulty === 'hard')
    expect(hardQs.length).toBeGreaterThanOrEqual(10)
  })
})

// ─── Form 7 V4 structure invariants ───────────────────────────────────────────

describe('Form 7 V4 module structure', () => {
  it('has 27/27/27 RW questions', () => {
    const rw = satForm7V4.sections[0]
    expect(rw.modules.map(m => m.questions.length)).toEqual([27, 27, 27])
  })

  it('has 22/22/22 Math questions', () => {
    const math = satForm7V4.sections[1]
    expect(math.modules.map(m => m.questions.length)).toEqual([22, 22, 22])
  })

  it('module types are routing / easy / hard for both sections', () => {
    for (const section of satForm7V4.sections) {
      const types = section.modules.map(m => m.type)
      expect(types).toEqual(['routing', 'easy', 'hard'])
    }
  })

  it('all module IDs use f7v4- prefix', () => {
    const moduleIds = satForm7V4.sections.flatMap(s => s.modules.map(m => m.id))
    for (const id of moduleIds) {
      expect(id, `Module ID '${id}' should start with 'f7v4-'`).toMatch(/^f7v4-/)
    }
  })

  it('all question IDs use sat-f7-v4- prefix', () => {
    const allIds = satForm7V4.sections.flatMap(s =>
      s.modules.flatMap(m => m.questions.map(q => q.id))
    )
    const bad = allIds.filter(id => !id.startsWith('sat-f7-v4-'))
    expect(bad, `Non-V4 IDs found: ${bad.join(', ')}`).toHaveLength(0)
  })

  it('no duplicate question IDs within Form 7 V4', () => {
    const allIds = satForm7V4.sections.flatMap(s =>
      s.modules.flatMap(m => m.questions.map(q => q.id))
    )
    const unique = new Set(allIds)
    expect(unique.size, 'Form 7 V4 has duplicate question IDs').toBe(allIds.length)
  })

  it('V4 IDs do not overlap with V3 IDs', () => {
    const v3Ids = new Set(
      satForm7V3.sections.flatMap(s => s.modules.flatMap(m => m.questions.map(q => q.id)))
    )
    const v4Ids = satForm7V4.sections.flatMap(s =>
      s.modules.flatMap(m => m.questions.map(q => q.id))
    )
    const overlap = v4Ids.filter(id => v3Ids.has(id))
    expect(overlap, `V4/V3 ID overlap: ${overlap.join(', ')}`).toHaveLength(0)
  })

  it('V4 IDs do not overlap with V2 IDs', () => {
    const v2 = getSatForm(7, 2)
    const v2Ids = new Set(
      v2.sections.flatMap(s => s.modules.flatMap(m => m.questions.map(q => q.id)))
    )
    const v4Ids = satForm7V4.sections.flatMap(s =>
      s.modules.flatMap(m => m.questions.map(q => q.id))
    )
    const overlap = v4Ids.filter(id => v2Ids.has(id))
    expect(overlap, `V4/V2 ID overlap: ${overlap.join(', ')}`).toHaveLength(0)
  })

  it('Math M1 has 16 MC and 6 grid_in questions', () => {
    const mathM1 = satForm7V4.sections[1].modules[0]
    const mc = mathM1.questions.filter(q => (q as { type?: string }).type === 'multiple_choice')
    const gridIn = mathM1.questions.filter(q => (q as { type?: string }).type === 'grid_in')
    expect(mc).toHaveLength(16)
    expect(gridIn).toHaveLength(6)
  })

  it('Math M2-Hard has 16 MC and 6 grid_in questions', () => {
    const mathM2H = satForm7V4.sections[1].modules[2]
    const mc = mathM2H.questions.filter(q => (q as { type?: string }).type === 'multiple_choice')
    const gridIn = mathM2H.questions.filter(q => (q as { type?: string }).type === 'grid_in')
    expect(mc).toHaveLength(16)
    expect(gridIn).toHaveLength(6)
  })

  it('Form 7 V4 Math M2-Hard has ≥17 hard-difficulty questions', () => {
    const mathM2H = satForm7V4.sections[1].modules[2]
    const hardQs = mathM2H.questions.filter(q => (q as { difficulty?: string }).difficulty === 'hard')
    expect(hardQs.length).toBeGreaterThanOrEqual(17)
  })

  it('Form 7 V4 is a different object from V3', () => {
    expect(satForm7V4).not.toBe(satForm7V3)
  })

  it('Form 7 V4 is a different object from V2', () => {
    expect(satForm7V4).not.toBe(getSatForm(7, 2))
  })
})
