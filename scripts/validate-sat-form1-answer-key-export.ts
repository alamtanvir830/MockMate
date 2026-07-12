/**
 * Validates the SAT Form 1 answer key export data.
 * Checks all six modules are complete, every question has required fields,
 * reports visual/table coverage, and verifies print route + button wiring.
 *
 * Run: npx tsx scripts/validate-sat-form1-answer-key-export.ts
 */

import * as fs   from 'fs'
import * as path from 'path'

import { rwModule1Questions }        from '../lib/premade-exams/sat/rw-module-1'
import { rwModule2EasyQuestions }    from '../lib/premade-exams/sat/rw-module-2-easy'
import { rwModule2HardQuestions }    from '../lib/premade-exams/sat/rw-module-2-hard'
import { mathModule1Questions }      from '../lib/premade-exams/sat/math-module-1'
import { mathModule2EasyQuestions }  from '../lib/premade-exams/sat/math-module-2-easy'
import { mathModule2HardQuestions }  from '../lib/premade-exams/sat/math-module-2-hard'
import type { SATQuestion, RWQuestion, MathMCQuestion, MathGridInQuestion } from '../lib/premade-exams/sat/types'

const ROOT = path.join(__dirname, '..')

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
const SEP  = '-'.repeat(64)
const HEAD = '='.repeat(64)

// ── Main audit ───────────────────────────────────────────────────────────────

console.log('\n' + HEAD)
console.log('  SAT Form 1 Answer Key Export -- Validation')
console.log(HEAD)

let totalQuestions = 0
let totalVisuals = 0
const unsupportedVisualTypes = new Set<string>()
const allIds = new Set<string>()
const duplicateIds: string[] = []

for (const { label, questions, expectedCount } of MODULES) {
  console.log('\n' + SEP)
  console.log('  ' + label)
  console.log(SEP)

  if (questions.length === expectedCount) {
    PASS(`Question count: ${questions.length} = ${expectedCount} expected`)
  } else {
    FAIL(`Question count: ${questions.length} != ${expectedCount} expected`)
  }

  totalQuestions += questions.length

  let moduleVisuals = 0
  let fieldErrors = 0

  for (const q of questions) {
    if (allIds.has(q.id)) duplicateIds.push(q.id)
    allIds.add(q.id)

    if (!q.correctAnswer) { FAIL(`${q.id}: missing correctAnswer`); fieldErrors++ }
    if (!q.explanation)   { FAIL(`${q.id}: missing explanation`);   fieldErrors++ }

    const isMC   = q.section === 'reading-writing' || ('type' in q && (q as MathMCQuestion).type === 'multiple_choice')
    const isGrid = 'type' in q && (q as MathGridInQuestion).type === 'grid_in'

    if (isMC) {
      const choices = (q as RWQuestion | MathMCQuestion).choices
      if (!choices || choices.length !== 4) {
        FAIL(`${q.id}: MC must have 4 choices (got ${choices?.length ?? 0})`)
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

    const textContent = [
      (q as { stimulus?: string }).stimulus ?? '',
      q.question,
      q.explanation,
    ].join(' ')
    if (textContent.includes('|---') || textContent.includes('| ---')) {
      FAIL(`${q.id}: raw markdown table in content`)
      fieldErrors++
    }

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

  if (fieldErrors === 0) PASS(`All field checks passed for ${questions.length} questions`)
  INFO(`Visuals in this module: ${moduleVisuals}`)
}

// ── Duplicate ID check ───────────────────────────────────────────────────────

console.log('\n' + SEP)
console.log('  Duplicate ID check')
console.log(SEP)
if (duplicateIds.length === 0) {
  PASS(`No duplicate IDs across ${totalQuestions} questions`)
} else {
  FAIL(`Duplicate IDs: ${duplicateIds.join(', ')}`)
}

// ── Print route and button wiring ────────────────────────────────────────────

console.log('\n' + SEP)
console.log('  Print route and button wiring')
console.log(SEP)
{
  const printPage = path.join(
    ROOT,
    'app/(print)/premade/sat/form-1/answer-key/[attemptId]/page.tsx',
  )
  if (fs.existsSync(printPage)) {
    PASS('Print route exists: app/(print)/premade/sat/form-1/answer-key/[attemptId]')
  } else {
    FAIL('Print route missing: app/(print)/premade/sat/form-1/answer-key/[attemptId]')
  }

  const contentFile = path.join(
    ROOT,
    'app/(print)/premade/sat/form-1/answer-key/[attemptId]/AnswerKeyContent.tsx',
  )
  if (fs.existsSync(contentFile)) {
    PASS('AnswerKeyContent component exists')
  } else {
    FAIL('AnswerKeyContent component missing')
  }

  const examTakerSrc = fs.readFileSync(
    path.join(ROOT, 'components/premade/SATExamTaker.tsx'),
    'utf-8',
  )
  if (examTakerSrc.includes('/premade/sat/form-1/answer-key/')) {
    PASS('SATExamTaker button links to print route /premade/sat/form-1/answer-key/')
  } else {
    FAIL('SATExamTaker button does not link to print route')
  }
  if (examTakerSrc.includes('full-answer-key')) {
    FAIL('SATExamTaker still references old /full-answer-key dashboard route')
  } else {
    PASS('Old /full-answer-key dashboard route not referenced in button')
  }
  if (examTakerSrc.includes('Download Full Form 1 Answer Key PDF')) {
    PASS('Button text is "Download Full Form 1 Answer Key PDF"')
  } else {
    FAIL('Button text does not match "Download Full Form 1 Answer Key PDF"')
  }
}

// ── Summary ───────────────────────────────────────────────────────────────────

console.log('\n' + HEAD)
console.log('  Summary')
console.log(HEAD)
INFO(`Modules included : ${MODULES.length}`)
INFO(`Total questions  : ${totalQuestions}`)
INFO(`Visual questions : ${totalVisuals}`)
INFO(`Vis types        : ${[...SUPPORTED_VISUAL_TYPES].join(', ')}`)

if (unsupportedVisualTypes.size > 0) {
  FAIL(`Unsupported visual types: ${[...unsupportedVisualTypes].join(', ')}`)
} else {
  PASS('All visual types supported by SATGraph renderer')
}

const expected = 27 + 27 + 27 + 22 + 22 + 22 // 147
if (totalQuestions === expected) {
  PASS(`Total count ${totalQuestions} = ${expected} expected`)
} else {
  FAIL(`Total count ${totalQuestions} != ${expected} expected`)
}

console.log(`\n  Checks failed: ${failed}`)
console.log()
if (failed === 0) {
  console.log('All answer key export checks passed.\n')
} else {
  console.log(`${failed} check(s) failed.\n`)
}
process.exit(failed > 0 ? 1 : 0)
