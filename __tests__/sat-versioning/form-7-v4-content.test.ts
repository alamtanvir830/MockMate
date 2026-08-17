/**
 * Form 7 V4 content integrity tests.
 * Verifies the V4 rebuild meets the extreme difficulty targets and is
 * free of all structural defects:
 *   - no duplicate answer choices within a question
 *   - no duplicate question IDs (globally and within modules)
 *   - correct answer is always a valid choice label
 *   - grid_in questions have at least one acceptableAnswer
 *   - all domain/skill labels are non-empty strings
 *   - module IDs in question objects match the containing module
 *   - difficulty labels are valid enum values
 *   - Math module structure: Q1-Q16 MC, Q17-Q22 grid_in
 *   - Math M2-Hard meets extreme difficulty thresholds
 *   - V4 objects !== V2 objects !== V3 objects
 */

import { describe, it, expect } from 'vitest'
import { satForm7V4 } from '@/lib/premade-exams/sat/v4/form-7'
import { satForm7V3 } from '@/lib/premade-exams/sat/v3/form-7'
import { getSatForm } from '@/lib/premade-exams/sat/sat-form-resolver'

// ─── Helpers ─────────────────────────────────────────────────────────────────

const rwSection = satForm7V4.sections[0]
const mathSection = satForm7V4.sections[1]

const rwM1 = rwSection.modules[0]
const rwM2Easy = rwSection.modules[1]
const rwM2Hard = rwSection.modules[2]
const mathM1 = mathSection.modules[0]
const mathM2Easy = mathSection.modules[1]
const mathM2Hard = mathSection.modules[2]

const allModules = [rwM1, rwM2Easy, rwM2Hard, mathM1, mathM2Easy, mathM2Hard]
const mathModules = [mathM1, mathM2Easy, mathM2Hard]

const validMCLabels = new Set(['A', 'B', 'C', 'D'])
const validDifficulties = new Set(['easy', 'medium', 'hard'])

// ─── Module-level structure ───────────────────────────────────────────────────

describe('Form 7 V4 — module-level structure', () => {
  it('has exactly 6 modules total (3 RW + 3 Math)', () => {
    const moduleCount = satForm7V4.sections.reduce((sum, s) => sum + s.modules.length, 0)
    expect(moduleCount).toBe(6)
  })

  it('RW Module 1 has exactly 27 questions', () => expect(rwM1.questions).toHaveLength(27))
  it('RW Module 2 Easy has exactly 27 questions', () => expect(rwM2Easy.questions).toHaveLength(27))
  it('RW Module 2 Hard has exactly 27 questions', () => expect(rwM2Hard.questions).toHaveLength(27))
  it('Math Module 1 has exactly 22 questions', () => expect(mathM1.questions).toHaveLength(22))
  it('Math Module 2 Easy has exactly 22 questions', () => expect(mathM2Easy.questions).toHaveLength(22))
  it('Math Module 2 Hard has exactly 22 questions', () => expect(mathM2Hard.questions).toHaveLength(22))

  it('RW M1 type is routing', () => expect(rwM1.type).toBe('routing'))
  it('RW M2 Easy type is easy', () => expect(rwM2Easy.type).toBe('easy'))
  it('RW M2 Hard type is hard', () => expect(rwM2Hard.type).toBe('hard'))
  it('Math M1 type is routing', () => expect(mathM1.type).toBe('routing'))
  it('Math M2 Easy type is easy', () => expect(mathM2Easy.type).toBe('easy'))
  it('Math M2 Hard type is hard', () => expect(mathM2Hard.type).toBe('hard'))

  it('all module IDs start with f7v4-', () => {
    for (const mod of allModules) {
      expect(mod.id, `module '${mod.id}' should use f7v4- prefix`).toMatch(/^f7v4-/)
    }
  })
})

// ─── Math module MC/grid-in split ─────────────────────────────────────────────

describe('Form 7 V4 — Math question type distribution', () => {
  for (const [label, mod] of [['M1', mathM1], ['M2-Easy', mathM2Easy], ['M2-Hard', mathM2Hard]] as const) {
    it(`Math ${label}: Q01-Q16 are multiple_choice, Q17-Q22 are grid_in`, () => {
      const mcSlice = mod.questions.slice(0, 16)
      const gridInSlice = mod.questions.slice(16, 22)
      expect(mcSlice.every(q => (q as { type?: string }).type === 'multiple_choice'),
        `Math ${label} Q1-Q16 should all be multiple_choice`).toBe(true)
      expect(gridInSlice.every(q => (q as { type?: string }).type === 'grid_in'),
        `Math ${label} Q17-Q22 should all be grid_in`).toBe(true)
    })
  }
})

// ─── Question ID uniqueness and naming ───────────────────────────────────────

describe('Form 7 V4 — question ID uniqueness and naming', () => {
  it('all question IDs start with sat-f7-v4-', () => {
    const allIds = satForm7V4.sections.flatMap(s =>
      s.modules.flatMap(m => m.questions.map(q => q.id))
    )
    const bad = allIds.filter(id => !id.startsWith('sat-f7-v4-'))
    expect(bad, `IDs without sat-f7-v4- prefix: ${bad.join(', ')}`).toHaveLength(0)
  })

  it('no duplicate question IDs within Form 7 V4', () => {
    const allIds = satForm7V4.sections.flatMap(s =>
      s.modules.flatMap(m => m.questions.map(q => q.id))
    )
    const seen = new Set<string>()
    const dupes: string[] = []
    for (const id of allIds) {
      if (seen.has(id)) dupes.push(id)
      seen.add(id)
    }
    expect(dupes, `Duplicate IDs: ${dupes.join(', ')}`).toHaveLength(0)
  })

  it('V4 question IDs do not collide with V3 question IDs', () => {
    const v3Ids = new Set(
      satForm7V3.sections.flatMap(s => s.modules.flatMap(m => m.questions.map(q => q.id)))
    )
    const v4Ids = satForm7V4.sections.flatMap(s =>
      s.modules.flatMap(m => m.questions.map(q => q.id))
    )
    const collision = v4Ids.filter(id => v3Ids.has(id))
    expect(collision, `V4/V3 ID collisions: ${collision.join(', ')}`).toHaveLength(0)
  })

  it('V4 question IDs do not collide with V2 question IDs', () => {
    const v2 = getSatForm(7, 2)
    const v2Ids = new Set(
      v2.sections.flatMap(s => s.modules.flatMap(m => m.questions.map(q => q.id)))
    )
    const v4Ids = satForm7V4.sections.flatMap(s =>
      s.modules.flatMap(m => m.questions.map(q => q.id))
    )
    const collision = v4Ids.filter(id => v2Ids.has(id))
    expect(collision, `V4/V2 ID collisions: ${collision.join(', ')}`).toHaveLength(0)
  })
})

// ─── Multiple-choice answer integrity ────────────────────────────────────────

describe('Form 7 V4 — MC answer integrity', () => {
  it('every MC question has exactly 4 choices labeled A B C D', () => {
    const errors: string[] = []
    for (const mod of allModules) {
      for (const q of mod.questions) {
        const mq = q as { type?: string; choices?: { label: string; text: string }[] }
        if (mq.type !== 'multiple_choice') continue
        if (!mq.choices || mq.choices.length !== 4) {
          errors.push(`${q.id}: has ${mq.choices?.length ?? 0} choices (expected 4)`)
          continue
        }
        const labels = mq.choices.map(c => c.label)
        if (!['A', 'B', 'C', 'D'].every((l, i) => l === labels[i])) {
          errors.push(`${q.id}: choice labels are [${labels.join(',')}] (expected A,B,C,D)`)
        }
      }
    }
    expect(errors, errors.join('\n')).toHaveLength(0)
  })

  it('no MC question has duplicate choice text', () => {
    const errors: string[] = []
    for (const mod of allModules) {
      for (const q of mod.questions) {
        const mq = q as { type?: string; choices?: { label: string; text: string }[] }
        if (mq.type !== 'multiple_choice' || !mq.choices) continue
        const texts = mq.choices.map(c => c.text.trim())
        const uniqueTexts = new Set(texts)
        if (uniqueTexts.size !== texts.length) {
          const dupes = texts.filter((t, i) => texts.indexOf(t) !== i)
          errors.push(`${q.id}: duplicate choice text(s): ${dupes.join(' | ')}`)
        }
      }
    }
    expect(errors, `MC questions with duplicate choices:\n${errors.join('\n')}`).toHaveLength(0)
  })

  it('every MC correctAnswer is A, B, C, or D', () => {
    const errors: string[] = []
    for (const mod of allModules) {
      for (const q of mod.questions) {
        const mq = q as { type?: string; correctAnswer?: string }
        if (mq.type !== 'multiple_choice') continue
        if (!validMCLabels.has(mq.correctAnswer ?? '')) {
          errors.push(`${q.id}: correctAnswer='${mq.correctAnswer}'`)
        }
      }
    }
    expect(errors, errors.join('\n')).toHaveLength(0)
  })

  it('every MC correctAnswer matches one of its own choices', () => {
    const errors: string[] = []
    for (const mod of allModules) {
      for (const q of mod.questions) {
        const mq = q as { type?: string; choices?: { label: string }[]; correctAnswer?: string }
        if (mq.type !== 'multiple_choice' || !mq.choices) continue
        const hasMatch = mq.choices.some(c => c.label === mq.correctAnswer)
        if (!hasMatch) {
          errors.push(`${q.id}: correctAnswer='${mq.correctAnswer}' not in choices`)
        }
      }
    }
    expect(errors, errors.join('\n')).toHaveLength(0)
  })
})

// ─── Grid-in answer integrity ─────────────────────────────────────────────────

describe('Form 7 V4 — grid_in answer integrity', () => {
  it('every grid_in has a non-empty correctAnswer', () => {
    const errors: string[] = []
    for (const mod of mathModules) {
      for (const q of mod.questions) {
        const gq = q as { type?: string; correctAnswer?: string }
        if (gq.type !== 'grid_in') continue
        if (!gq.correctAnswer || gq.correctAnswer.trim() === '') {
          errors.push(`${q.id}: empty correctAnswer`)
        }
      }
    }
    expect(errors, errors.join('\n')).toHaveLength(0)
  })

  it('every grid_in has at least one acceptableAnswer', () => {
    const errors: string[] = []
    for (const mod of mathModules) {
      for (const q of mod.questions) {
        const gq = q as { type?: string; acceptableAnswers?: string[] }
        if (gq.type !== 'grid_in') continue
        if (!gq.acceptableAnswers || gq.acceptableAnswers.length === 0) {
          errors.push(`${q.id}: missing or empty acceptableAnswers`)
        }
      }
    }
    expect(errors, errors.join('\n')).toHaveLength(0)
  })
})

// ─── Domain/skill/difficulty metadata ────────────────────────────────────────

describe('Form 7 V4 — question metadata integrity', () => {
  it('every question has a non-empty domain', () => {
    const errors: string[] = []
    for (const mod of allModules) {
      for (const q of mod.questions) {
        const meta = q as { domain?: string }
        if (!meta.domain || meta.domain.trim() === '') {
          errors.push(`${q.id}: missing domain`)
        }
      }
    }
    expect(errors, errors.join('\n')).toHaveLength(0)
  })

  it('every question has a non-empty skill', () => {
    const errors: string[] = []
    for (const mod of allModules) {
      for (const q of mod.questions) {
        const meta = q as { skill?: string }
        if (!meta.skill || meta.skill.trim() === '') {
          errors.push(`${q.id}: missing skill`)
        }
      }
    }
    expect(errors, errors.join('\n')).toHaveLength(0)
  })

  it('every question has a valid difficulty label', () => {
    const errors: string[] = []
    for (const mod of allModules) {
      for (const q of mod.questions) {
        const meta = q as { difficulty?: string }
        if (!validDifficulties.has(meta.difficulty ?? '')) {
          errors.push(`${q.id}: difficulty='${meta.difficulty}'`)
        }
      }
    }
    expect(errors, errors.join('\n')).toHaveLength(0)
  })

  it('every question has a non-empty explanation', () => {
    const errors: string[] = []
    for (const mod of allModules) {
      for (const q of mod.questions) {
        const meta = q as { explanation?: string }
        if (!meta.explanation || meta.explanation.trim() === '') {
          errors.push(`${q.id}: missing explanation`)
        }
      }
    }
    expect(errors, errors.join('\n')).toHaveLength(0)
  })

  it('every question moduleId matches its containing module', () => {
    const errors: string[] = []
    for (const mod of allModules) {
      for (const q of mod.questions) {
        const meta = q as { moduleId?: string }
        if (meta.moduleId !== mod.id) {
          errors.push(`${q.id}: moduleId='${meta.moduleId}' but in module '${mod.id}'`)
        }
      }
    }
    expect(errors, errors.join('\n')).toHaveLength(0)
  })
})

// ─── Extreme difficulty thresholds ────────────────────────────────────────────

describe('Form 7 V4 — difficulty distribution (extreme targets)', () => {
  it('Math M2-Hard has ALL 22 questions at difficulty=hard', () => {
    const hardCount = mathM2Hard.questions.filter(
      q => (q as { difficulty?: string }).difficulty === 'hard'
    ).length
    expect(hardCount).toBe(22)
  })

  it('Math M1 has at least 8 hard-difficulty questions (materially harder than V3)', () => {
    const hardCount = mathM1.questions.filter(
      q => (q as { difficulty?: string }).difficulty === 'hard'
    ).length
    expect(hardCount).toBeGreaterThanOrEqual(8)
  })

  it('Math M1 has at least 4 easy questions (routing accessibility)', () => {
    const easyCount = mathM1.questions.filter(
      q => (q as { difficulty?: string }).difficulty === 'easy'
    ).length
    expect(easyCount).toBeGreaterThanOrEqual(4)
  })

  it('Math M2-Easy has at least 6 easy questions (adaptive routing serves students who need support)', () => {
    const easyCount = mathM2Easy.questions.filter(
      q => (q as { difficulty?: string }).difficulty === 'easy'
    ).length
    expect(easyCount).toBeGreaterThanOrEqual(6)
  })
})

// ─── V2/V3 immutability ───────────────────────────────────────────────────────

describe('Form 7 V4 — V2/V3 immutability', () => {
  const form7V2 = getSatForm(7, 2)

  it('Form 7 V4 is a different object from Form 7 V3', () => {
    expect(satForm7V4).not.toBe(satForm7V3)
  })

  it('Form 7 V4 is a different object from Form 7 V2', () => {
    expect(satForm7V4).not.toBe(form7V2)
  })

  it('V4 sections array is different from V3 sections array', () => {
    expect(satForm7V4.sections).not.toBe(satForm7V3.sections)
  })

  it('V4 Math M2 Hard module object is different from V3 Math M2 Hard', () => {
    const v3MathM2H = satForm7V3.sections[1].modules[2]
    expect(mathM2Hard).not.toBe(v3MathM2H)
  })
})
