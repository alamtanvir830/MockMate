import { describe, it, expect } from 'vitest'
import {
  SAT_CONTENT_VERSION_V1,
  SAT_CONTENT_VERSION_V2,
  CURRENT_SAT_CONTENT_VERSION,
  normalizeSatContentVersion,
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

// ─── Version constants ────────────────────────────────────────────────────────

describe('SAT content version constants', () => {
  it('V1 is 1', () => expect(SAT_CONTENT_VERSION_V1).toBe(1))
  it('V2 is 2', () => expect(SAT_CONTENT_VERSION_V2).toBe(2))
  it('CURRENT is V2', () => expect(CURRENT_SAT_CONTENT_VERSION).toBe(2))
})

// ─── normalizeSatContentVersion ───────────────────────────────────────────────

describe('normalizeSatContentVersion', () => {
  it('1 → V1', () => expect(normalizeSatContentVersion(1)).toBe(1))
  it('2 → V2', () => expect(normalizeSatContentVersion(2)).toBe(2))
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
  it('CURRENT_SAT_CONTENT_VERSION resolves V2', () => {
    expect(getSatForm(1, CURRENT_SAT_CONTENT_VERSION)).toBe(satForm1V2)
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

// ─── New attempt receives V2 ───────────────────────────────────────────────────

describe('New attempt content version', () => {
  it('CURRENT_SAT_CONTENT_VERSION is 2', () => {
    expect(CURRENT_SAT_CONTENT_VERSION).toBe(2)
  })

  it('resolving CURRENT for form 1 returns V2 form', () => {
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
