/**
 * Regression tests for SAT R&W double-word rendering defect.
 *
 * Defect class: a word appears in the stimulus immediately after the blank
 * AND at the start of one or more answer choices, causing a double-word when
 * a student mentally fills in the choice.
 *
 * The only confirmed instance was sat-f4-rw-m1-q04 / sat-f4-v2-rw-m1-q04
 * (Antikythera mechanism, Form 4 R&W Module 1).  These tests pin the fix and
 * guard against regressions across all forms.
 */

import { describe, it, expect } from 'vitest'

// Form 1 (module files have no form-number prefix for the base form)
import { rwModule1Questions }     from '@/lib/premade-exams/sat/rw-module-1'
import { rwModule2EasyQuestions } from '@/lib/premade-exams/sat/rw-module-2-easy'
import { rwModule2HardQuestions } from '@/lib/premade-exams/sat/rw-module-2-hard'

import { f2RwModule1Questions }     from '@/lib/premade-exams/sat/form-2-rw-module-1'
import { f2RwModule2EasyQuestions } from '@/lib/premade-exams/sat/form-2-rw-module-2-easy'
import { f2RwModule2HardQuestions } from '@/lib/premade-exams/sat/form-2-rw-module-2-hard'

import { f3RwModule1Questions }     from '@/lib/premade-exams/sat/form-3-rw-module-1'
import { f3RwModule2EasyQuestions } from '@/lib/premade-exams/sat/form-3-rw-module-2-easy'
import { f3RwModule2HardQuestions } from '@/lib/premade-exams/sat/form-3-rw-module-2-hard'

import { f4RwModule1Questions }     from '@/lib/premade-exams/sat/form-4-rw-module-1'
import { f4RwModule2EasyQuestions } from '@/lib/premade-exams/sat/form-4-rw-module-2-easy'
import { f4RwModule2HardQuestions } from '@/lib/premade-exams/sat/form-4-rw-module-2-hard'

import { f5RwModule1Questions }     from '@/lib/premade-exams/sat/form-5-rw-module-1'
import { f5RwModule2EasyQuestions } from '@/lib/premade-exams/sat/form-5-rw-module-2-easy'
import { f5RwModule2HardQuestions } from '@/lib/premade-exams/sat/form-5-rw-module-2-hard'

// V2
import { rwModule1QuestionsV2 }     from '@/lib/premade-exams/sat/v2/rw-module-1'
import { rwModule2EasyQuestionsV2 } from '@/lib/premade-exams/sat/v2/rw-module-2-easy'
import { rwModule2HardQuestionsV2 } from '@/lib/premade-exams/sat/v2/rw-module-2-hard'

import { f2RwModule1QuestionsV2 }     from '@/lib/premade-exams/sat/v2/form-2-rw-module-1'
import { f2RwModule2EasyQuestionsV2 } from '@/lib/premade-exams/sat/v2/form-2-rw-module-2-easy'
import { f2RwModule2HardQuestionsV2 } from '@/lib/premade-exams/sat/v2/form-2-rw-module-2-hard'

import { f3RwModule1QuestionsV2 }     from '@/lib/premade-exams/sat/v2/form-3-rw-module-1'
import { f3RwModule2EasyQuestionsV2 } from '@/lib/premade-exams/sat/v2/form-3-rw-module-2-easy'
import { f3RwModule2HardQuestionsV2 } from '@/lib/premade-exams/sat/v2/form-3-rw-module-2-hard'

import { f4RwModule1QuestionsV2 }     from '@/lib/premade-exams/sat/v2/form-4-rw-module-1'
import { f4RwModule2EasyQuestionsV2 } from '@/lib/premade-exams/sat/v2/form-4-rw-module-2-easy'
import { f4RwModule2HardQuestionsV2 } from '@/lib/premade-exams/sat/v2/form-4-rw-module-2-hard'

import { f5RwModule1QuestionsV2 }     from '@/lib/premade-exams/sat/v2/form-5-rw-module-1'
import { f5RwModule2EasyQuestionsV2 } from '@/lib/premade-exams/sat/v2/form-5-rw-module-2-easy'
import { f5RwModule2HardQuestionsV2 } from '@/lib/premade-exams/sat/v2/form-5-rw-module-2-hard'

// ── Pinned regression: Form 4 Antikythera question ───────────────────────────

describe('Form 4 Antikythera question — double-this defect (fixed)', () => {
  it('V1: stimulus does not contain "this" immediately after the blank', () => {
    const q = f4RwModule1Questions.find(q => q.id === 'sat-f4-rw-m1-q04')
    expect(q).toBeDefined()
    expect(q!.stimulus).not.toMatch(/_______\s+this\b/)
    expect(q!.stimulus).toContain('_______')
  })

  it('V2: stimulus does not contain "this" immediately after the blank', () => {
    const q = f4RwModule1QuestionsV2.find(q => q.id === 'sat-f4-v2-rw-m1-q04')
    expect(q).toBeDefined()
    expect(q!.stimulus).not.toMatch(/_______\s+this\b/)
    expect(q!.stimulus).toContain('_______')
  })

  it('V1: correct answer is still C and choice C starts with semicolon-this', () => {
    const q = f4RwModule1Questions.find(q => q.id === 'sat-f4-rw-m1-q04')!
    expect(q.correctAnswer).toBe('C')
    const choiceC = q.choices.find(c => c.label === 'C')
    expect(choiceC?.text).toMatch(/^;\s*this\b/)
  })

  it('V2: correct answer is still C and choice C starts with semicolon-this', () => {
    const q = f4RwModule1QuestionsV2.find(q => q.id === 'sat-f4-v2-rw-m1-q04')!
    expect(q.correctAnswer).toBe('C')
    const choiceC = q.choices.find(c => c.label === 'C')
    expect(choiceC?.text).toMatch(/^;\s*this\b/)
  })

  it('V1: filled-in correct answer reads without double-word', () => {
    const q = f4RwModule1Questions.find(q => q.id === 'sat-f4-rw-m1-q04')!
    const choiceC = q.choices.find(c => c.label === 'C')!
    const filled = q.stimulus.replace('_______', choiceC.text)
    expect(filled).not.toMatch(/\bthis\s+this\b/)
    const thisCount = (filled.match(/\bthis\b/gi) ?? []).length
    expect(thisCount).toBe(1)
  })

  it('V2: filled-in correct answer reads without double-word', () => {
    const q = f4RwModule1QuestionsV2.find(q => q.id === 'sat-f4-v2-rw-m1-q04')!
    const choiceC = q.choices.find(c => c.label === 'C')!
    const filled = q.stimulus.replace('_______', choiceC.text)
    expect(filled).not.toMatch(/\bthis\s+this\b/)
    const thisCount = (filled.match(/\bthis\b/gi) ?? []).length
    expect(thisCount).toBe(1)
  })
})

// ── Comprehensive audit: no double-word defect in any form ───────────────────
//
// For every question across all R&W modules: if the stimulus has a blank
// and the word immediately after the blank also appears at the start of
// any choice, filling that choice in would create a double-word.
// Assert no such collision exists.

type RWQuestion = {
  id: string
  stimulus: string
  choices: { label: string; text: string }[]
}

function findDoubleWordDefects(questions: RWQuestion[]): string[] {
  const defects: string[] = []
  for (const q of questions) {
    if (!q.stimulus.includes('_______')) continue
    // Extract the word immediately following the blank
    const match = q.stimulus.match(/_______\s+(\w+)/)
    if (!match) continue
    const wordAfterBlank = match[1].toLowerCase()
    // Check if any choice starts with the same word
    for (const choice of q.choices) {
      // Strip leading punctuation/whitespace to get the first content word
      const choiceFirstWord = choice.text.trim().replace(/^[;:,\s]+/, '').match(/^(\w+)/)?.[1]?.toLowerCase()
      if (choiceFirstWord && choiceFirstWord === wordAfterBlank) {
        defects.push(`${q.id} — blank followed by "${wordAfterBlank}", choice ${choice.label} starts with "${choice.text.trim()}"`)
      }
    }
  }
  return defects
}

const allModules: [string, RWQuestion[]][] = [
  ['F1-M1-V1',  rwModule1Questions],
  ['F1-M2E-V1', rwModule2EasyQuestions],
  ['F1-M2H-V1', rwModule2HardQuestions],
  ['F2-M1-V1',  f2RwModule1Questions],
  ['F2-M2E-V1', f2RwModule2EasyQuestions],
  ['F2-M2H-V1', f2RwModule2HardQuestions],
  ['F3-M1-V1',  f3RwModule1Questions],
  ['F3-M2E-V1', f3RwModule2EasyQuestions],
  ['F3-M2H-V1', f3RwModule2HardQuestions],
  ['F4-M1-V1',  f4RwModule1Questions],
  ['F4-M2E-V1', f4RwModule2EasyQuestions],
  ['F4-M2H-V1', f4RwModule2HardQuestions],
  ['F5-M1-V1',  f5RwModule1Questions],
  ['F5-M2E-V1', f5RwModule2EasyQuestions],
  ['F5-M2H-V1', f5RwModule2HardQuestions],
  ['F1-M1-V2',  rwModule1QuestionsV2],
  ['F1-M2E-V2', rwModule2EasyQuestionsV2],
  ['F1-M2H-V2', rwModule2HardQuestionsV2],
  ['F2-M1-V2',  f2RwModule1QuestionsV2],
  ['F2-M2E-V2', f2RwModule2EasyQuestionsV2],
  ['F2-M2H-V2', f2RwModule2HardQuestionsV2],
  ['F3-M1-V2',  f3RwModule1QuestionsV2],
  ['F3-M2E-V2', f3RwModule2EasyQuestionsV2],
  ['F3-M2H-V2', f3RwModule2HardQuestionsV2],
  ['F4-M1-V2',  f4RwModule1QuestionsV2],
  ['F4-M2E-V2', f4RwModule2EasyQuestionsV2],
  ['F4-M2H-V2', f4RwModule2HardQuestionsV2],
  ['F5-M1-V2',  f5RwModule1QuestionsV2],
  ['F5-M2E-V2', f5RwModule2EasyQuestionsV2],
  ['F5-M2H-V2', f5RwModule2HardQuestionsV2],
]

describe('Double-word rendering defect audit — all R&W modules', () => {
  for (const [label, questions] of allModules) {
    it(`${label}: no question has a word immediately after the blank that also starts a choice`, () => {
      const defects = findDoubleWordDefects(questions)
      expect(defects).toEqual([])
    })
  }
})
