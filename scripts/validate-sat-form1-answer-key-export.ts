/**
 * Validates the SAT Form 1 answer key export data.
 * Checks all six modules are complete, every question has required fields,
 * and reports visual/table coverage.
 *
 * Run: npx tsx scripts/validate-sat-form1-answer-key-export.ts
 */

import { rwModule1Questions }        from '../lib/premade-exams/sat/rw-module-1'
import { rwModule2EasyQuestions }    from '../lib/premade-exams/sat/rw-module-2-easy'
import { rwModule2HardQuestions }    from '../lib/premade-exams/sat/rw-module-2-hard'
import { mathModule1Questions }      from '../lib/premade-exams/sat/math-module-1'
import { mathModule2EasyQuestions }  from '../lib/premade-exams/sat/math-module-2-easy'
import { mathModule2HardQuestions }  from '../lib/premade-exams/sat/math-module-2-hard'
import type { SATQuestion, RWQuestion, MathMCQuestion, MathGridInQuestion } from '../lib/premade-exams/sat/types'

// ── Module registry ──────────────────────────────────────────────────────────

const MODULES = [
  { label: 'R&W Module 1',       questions: rwModule1Questions as SATQuestion[],       expectedCount: 27 },
  { label: 'R&W Module 2 Easy',  questions: rwModule2EasyQuestions as SATQuestion[],   expectedCount: 27 },
  { label: 'R&W Module 2 Hard',  questions: rwModule2HardQuestions as SATQuestion[],   expectedCount: 27 },
  { label: 'Math Module 1',      questions: mathModule1Questions as SATQuestion[],     expectedCount: 22 },
  { label: 'Math Module 2 Easy', questions: mathModule2EasyQuestions as SATQuestion[], expectedCount: 22 },
  { label: 'Math Module 2 Hard', questions: mathModule2HardQuestions as SATQuestion[], expectedCount: 22 },
]

const SUPPORTED_VISUAL_TYPES = new Set([
  'coordinate_plane', 'scatter', 'bar', 'table', 'geometry',
])

// ── Helpers ──────────────────────────────────────────────────────────────────

let failed = 0
const PASS = (msg: string) => console.log('  ✓', msg)
const FAIL = (msg: string) => { console.error('  ✗', msg); failed++ }
const INFO = (msg: string) => console.log('  ·', msg)
const DIVIDER = '─'.repeat(64)
const HEADER  = '═'.repeat(64)

// ── Main validation ──────────────────────────────────────────────────────────

console.log('\n' + HEADER)
console.log('  SAT Form 1 Answer Key Export — Validation')
console.log(HEADER)

let totalQuestions = 0
let totalVisuals = 0
const unsupportedVisualTypes = new Set<string>()
const allIds = new Set<string>()
const duplicateIds: string[] = []

for (const { label, questions, expectedCount } of MODULES) {
  console.log(`\n${DIVIDER}`)
  console.log(`  ${label}`)
  console.log(DIVIDER)

  // Count check
  if (questions.length === expectedCount) {
    PASS(`Question count: ${questions.length} = ${expectedCount} expected`)
  } else {
    FAIL(`Question count: ${questions.length} ≠ ${expectedCount} expected`)
  }

  totalQuestions += questions.length

  let moduleVisuals = 0
  let fieldErrors = 0

  for (const q of questions) {
    // Duplicate ID check
    if (allIds.has(q.id)) duplicateIds.push(q.id)
    allIds.add(q.id)

    // Required field: correctAnswer
    if (!q.correctAnswer) {
      FAIL(`${q.id}: missing correctAnswer`)
      fieldErrors++
    }

    // Required field: explanation
    if (!q.explanation) {
      FAIL(`${q.id}: missing explanation`)
      fieldErrors++
    }

    // Choices for MC
    const isMC = q.section === 'reading-writing' || ('type' in q && (q as MathMCQuestion).type === 'multiple_choice')
    const isGrid = 'type' in q && (q as MathGridInQuestion).type === 'grid_in'

    if (isMC) {
      const choices = (q as RWQuestion | MathMCQuestion).choices
      if (!choices || choices.length !== 4) {
        FAIL(`${q.id}: MC question must have exactly 4 choices (got ${choices?.length ?? 0})`)
        fieldErrors++
      }
      if (choices && !['A','B','C','D'].includes(q.correctAnswer)) {
        FAIL(`${q.id}: MC correctAnswer '${q.correctAnswer}' not in A/B/C/D`)
        fieldErrors++
      }
    }

    if (isGrid) {
      const gi = q as MathGridInQuestion
      if (!gi.acceptableAnswers || gi.acceptableAnswers.length === 0) {
        FAIL(`${q.id}: grid_in missing acceptableAnswers`)
        fieldErrors++
      }
    }

    // Check for raw markdown tables in content
    const textContent = [
      (q as { stimulus?: string }).stimulus ?? '',
      q.question,
      q.explanation,
    ].join(' ')
    if (textContent.includes('|---') || textContent.includes('| ---')) {
      FAIL(`${q.id}: raw markdown table found in content`)
      fieldErrors++
    }

    // Visual check
    const graphData = (q as { graphData?: { type: string } }).graphData
    if (graphData) {
      moduleVisuals++
      totalVisuals++
      if (!SUPPORTED_VISUAL_TYPES.has(graphData.type)) {
        unsupportedVisualTypes.add(graphData.type)
        FAIL(`${q.id}: unsupported visual type '${graphData.type}'`)
        fieldErrors++
      }
    }
  }

  if (fieldErrors === 0) {
    PASS(`All field checks passed for ${questions.length} questions`)
  }
  INFO(`Questions with visuals in this module: ${moduleVisuals}`)
}

// ── Duplicate ID report ────────────────────────────────────────────────────

console.log(`\n${DIVIDER}`)
console.log('  Duplicate ID Check (across all 6 modules)')
console.log(DIVIDER)
if (duplicateIds.length === 0) {
  PASS(`No duplicate question IDs across all ${totalQuestions} questions`)
} else {
  FAIL(`Duplicate IDs found: ${duplicateIds.join(', ')}`)
}

// ── Summary ────────────────────────────────────────────────────────────────

console.log(`\n${HEADER}`)
console.log('  Summary')
console.log(HEADER)
INFO(`Modules included    : ${MODULES.length}`)
INFO(`Total questions     : ${totalQuestions}`)
INFO(`Visual questions    : ${totalVisuals}`)
INFO(`Supported vis types : ${[...SUPPORTED_VISUAL_TYPES].join(', ')}`)

if (unsupportedVisualTypes.size > 0) {
  FAIL(`Unsupported visual types in export: ${[...unsupportedVisualTypes].join(', ')}`)
} else {
  PASS('All visual types are supported by the SATGraph renderer')
}

const expectedTotal = 27 + 27 + 27 + 22 + 22 + 22 // = 147
if (totalQuestions === expectedTotal) {
  PASS(`Total question count ${totalQuestions} = ${expectedTotal} expected`)
} else {
  FAIL(`Total question count ${totalQuestions} ≠ ${expectedTotal} expected`)
}

console.log(`\n  Checks failed: ${failed}`)
console.log()

if (failed === 0) {
  console.log('✅ All answer key export checks passed.\n')
} else {
  console.log(`❌ ${failed} check(s) failed.\n`)
}

process.exit(failed > 0 ? 1 : 0)
