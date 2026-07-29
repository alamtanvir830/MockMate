/**
 * Full Form 3 validator — covers all 6 modules (147 unique questions).
 * Run: npx tsx scripts/validate-sat-form3.ts
 * Exits nonzero on critical failures.
 */
import { f3RwModule1Questions } from '../lib/premade-exams/sat/form-3-rw-module-1'
import { f3RwModule2EasyQuestions } from '../lib/premade-exams/sat/form-3-rw-module-2-easy'
import { f3RwModule2HardQuestions } from '../lib/premade-exams/sat/form-3-rw-module-2-hard'
import { f3MathModule1Questions } from '../lib/premade-exams/sat/form-3-math-module-1'
import { f3MathModule2EasyQuestions } from '../lib/premade-exams/sat/form-3-math-module-2-easy'
import { f3MathModule2HardQuestions } from '../lib/premade-exams/sat/form-3-math-module-2-hard'
import type { RWQuestion, MathQuestion } from '../lib/premade-exams/sat/types'

let errors = 0
let warnings = 0

const ERR = (msg: string) => { console.error('  ✗ ERROR:', msg); errors++ }
const WARN = (msg: string) => { console.warn('  ⚠ WARN:', msg); warnings++ }
const OK = (msg: string) => console.log('  ✓', msg)

// ── Counts ──────────────────────────────────────────────────────────────────

const EXPECTED = {
  rwM1: 27, rwM2Easy: 27, rwM2Hard: 27,
  mathM1: 22, mathM2Easy: 22, mathM2Hard: 22,
  total: 147,
  visibleRoute: 98,
}

console.log('\n════ SAT Form 3 Validator ════')

// ── Per-module count checks ──────────────────────────────────────────────────

function checkCount(qs: unknown[], label: string, expected: number) {
  if (qs.length === expected) OK(`${label}: ${qs.length} questions`)
  else ERR(`${label}: expected ${expected}, got ${qs.length}`)
}

checkCount(f3RwModule1Questions, 'R&W Module 1', EXPECTED.rwM1)
checkCount(f3RwModule2EasyQuestions, 'R&W Module 2 Easy', EXPECTED.rwM2Easy)
checkCount(f3RwModule2HardQuestions, 'R&W Module 2 Hard', EXPECTED.rwM2Hard)
checkCount(f3MathModule1Questions, 'Math Module 1', EXPECTED.mathM1)
checkCount(f3MathModule2EasyQuestions, 'Math Module 2 Easy', EXPECTED.mathM2Easy)
checkCount(f3MathModule2HardQuestions, 'Math Module 2 Hard', EXPECTED.mathM2Hard)

const totalUnique = [
  ...f3RwModule1Questions,
  ...f3RwModule2EasyQuestions,
  ...f3RwModule2HardQuestions,
  ...f3MathModule1Questions,
  ...f3MathModule2EasyQuestions,
  ...f3MathModule2HardQuestions,
].length
if (totalUnique === EXPECTED.total) OK(`Total unique records: ${totalUnique}`)
else ERR(`Total unique records: expected ${EXPECTED.total}, got ${totalUnique}`)

const rwRoute = f3RwModule1Questions.length + f3RwModule2HardQuestions.length
const mathRoute = f3MathModule1Questions.length + f3MathModule2HardQuestions.length
const visibleRoute = rwRoute + mathRoute
if (visibleRoute === EXPECTED.visibleRoute) OK(`Visible hard route: ${visibleRoute} questions`)
else ERR(`Visible hard route: expected ${EXPECTED.visibleRoute}, got ${visibleRoute}`)

// ── Duplicate ID detection ───────────────────────────────────────────────────

console.log('\n── Duplicate IDs ──')
const allIds = [
  ...f3RwModule1Questions,
  ...f3RwModule2EasyQuestions,
  ...f3RwModule2HardQuestions,
  ...f3MathModule1Questions,
  ...f3MathModule2EasyQuestions,
  ...f3MathModule2HardQuestions,
].map(q => q.id)

const seen = new Set<string>()
const dupes: string[] = []
for (const id of allIds) {
  if (seen.has(id)) dupes.push(id)
  seen.add(id)
}
if (dupes.length === 0) OK('No duplicate IDs')
else ERR(`Duplicate IDs found: ${dupes.join(', ')}`)

// ── R&W domain distribution ─────────────────────────────────────────────────

const RW_DOMAINS = [
  'Information and Ideas',
  'Craft and Structure',
  'Expression of Ideas',
  'Standard English Conventions',
]

function checkRWModule(qs: RWQuestion[], label: string) {
  console.log(`\n── ${label} ──`)
  const domainCounts: Record<string, number> = {}
  for (const q of qs) domainCounts[q.domain] = (domainCounts[q.domain] ?? 0) + 1

  for (const d of RW_DOMAINS) {
    const n = domainCounts[d] ?? 0
    if (n === 0) ERR(`Missing domain: ${d}`)
    else console.log(`    ${d}: ${n}`)
  }

  // Answer distribution (warn if any answer > 45%)
  const answerCounts: Record<string, number> = { A: 0, B: 0, C: 0, D: 0 }
  for (const q of qs) answerCounts[q.correctAnswer] = (answerCounts[q.correctAnswer] ?? 0) + 1
  for (const [ans, n] of Object.entries(answerCounts)) {
    const pct = Math.round((n / qs.length) * 100)
    if (pct > 45) WARN(`${label}: Answer "${ans}" = ${pct}% (above 45% threshold)`)
  }

  // Check for required fields
  for (const q of qs) {
    if (!q.stimulus) ERR(`${q.id}: missing stimulus`)
    if (!q.question) ERR(`${q.id}: missing question`)
    if (!q.explanation) ERR(`${q.id}: missing explanation`)
    if (!q.correctAnswer) ERR(`${q.id}: missing correctAnswer`)
    if (!['A','B','C','D'].includes(q.correctAnswer)) ERR(`${q.id}: invalid correctAnswer "${q.correctAnswer}"`)
    if (!q.choices || q.choices.length !== 4) ERR(`${q.id}: must have exactly 4 choices`)
    // Detect unrendered markdown table markers in question text
    if (q.question.includes('|---') || q.question.includes('| ---')) {
      WARN(`${q.id}: raw markdown separator in question — use StimulusRenderer table format`)
    }
    if (!q.wrongAnswerExplanations) WARN(`${q.id}: missing wrongAnswerExplanations`)
  }

  OK(`${label}: field validation complete`)
}

checkRWModule(f3RwModule1Questions, 'R&W Module 1')
checkRWModule(f3RwModule2EasyQuestions, 'R&W Module 2 Easy')
checkRWModule(f3RwModule2HardQuestions, 'R&W Module 2 Hard')

// ── Math domain distribution ────────────────────────────────────────────────

const MATH_DOMAINS = [
  'Algebra',
  'Advanced Math',
  'Problem-Solving and Data Analysis',
  'Geometry and Trigonometry',
]

function checkMathModule(qs: MathQuestion[], label: string) {
  console.log(`\n── ${label} ──`)
  const domainCounts: Record<string, number> = {}
  for (const q of qs) domainCounts[q.domain] = (domainCounts[q.domain] ?? 0) + 1

  for (const d of MATH_DOMAINS) {
    const n = domainCounts[d] ?? 0
    if (n === 0) ERR(`Missing domain: ${d}`)
    else console.log(`    ${d}: ${n}`)
  }

  // Difficulty distribution
  const diff: Record<string, number> = { easy: 0, medium: 0, hard: 0 }
  for (const q of qs) diff[q.difficulty] = (diff[q.difficulty] ?? 0) + 1
  console.log(`    Difficulty: easy=${diff.easy} medium=${diff.medium} hard=${diff.hard}`)

  // Field validation
  for (const q of qs) {
    if (!q.question) ERR(`${q.id}: missing question`)
    if (!q.explanation) ERR(`${q.id}: missing explanation`)
    if (!['easy','medium','hard'].includes(q.difficulty)) ERR(`${q.id}: invalid difficulty`)
    if (q.type === 'multiple_choice') {
      if (!q.choices || q.choices.length !== 4) ERR(`${q.id}: must have exactly 4 choices`)
      if (!['A','B','C','D'].includes(q.correctAnswer)) ERR(`${q.id}: invalid correctAnswer`)
    }
    if (q.type === 'grid_in') {
      if (!q.correctAnswer) ERR(`${q.id}: grid-in missing correctAnswer`)
      if (!(q as { acceptableAnswers?: string[] }).acceptableAnswers?.length) {
        WARN(`${q.id}: grid-in missing acceptableAnswers`)
      }
    }
    // Detect raw asterisk multiplication
    if (/\b\w\*\w\b/.test(q.question)) WARN(`${q.id}: raw asterisk multiplication in question — use Unicode · or spell out`)
    // Detect caret exponents
    if (/\^\d/.test(q.question)) WARN(`${q.id}: caret exponent in question — use Unicode superscripts (² ³ etc)`)
  }

  OK(`${label}: field validation complete`)
}

checkMathModule(f3MathModule1Questions, 'Math Module 1')
checkMathModule(f3MathModule2EasyQuestions, 'Math Module 2 Easy')
checkMathModule(f3MathModule2HardQuestions, 'Math Module 2 Hard')

// ── Route separation check ──────────────────────────────────────────────────

console.log('\n── Route Separation ──')
const m1RWAvgDiff = f3RwModule1Questions.map(q => ({ easy: 1, medium: 2, hard: 3 }[q.difficulty]!)).reduce((a, b) => a + b, 0) / f3RwModule1Questions.length
const m2HardRWAvgDiff = f3RwModule2HardQuestions.map(q => ({ easy: 1, medium: 2, hard: 3 }[q.difficulty]!)).reduce((a, b) => a + b, 0) / f3RwModule2HardQuestions.length
const m2EasyRWAvgDiff = f3RwModule2EasyQuestions.map(q => ({ easy: 1, medium: 2, hard: 3 }[q.difficulty]!)).reduce((a, b) => a + b, 0) / f3RwModule2EasyQuestions.length

console.log(`  R&W M1 avg difficulty: ${m1RWAvgDiff.toFixed(2)}`)
console.log(`  R&W M2 Easy avg difficulty: ${m2EasyRWAvgDiff.toFixed(2)}`)
console.log(`  R&W M2 Hard avg difficulty: ${m2HardRWAvgDiff.toFixed(2)}`)
if (m2HardRWAvgDiff > m2EasyRWAvgDiff) OK('R&W hard route harder than easy route')
else WARN('R&W hard route not harder than easy route on average')

const m1MathAvgDiff = f3MathModule1Questions.map(q => ({ easy: 1, medium: 2, hard: 3 }[q.difficulty]!)).reduce((a, b) => a + b, 0) / f3MathModule1Questions.length
const m2HardMathAvgDiff = f3MathModule2HardQuestions.map(q => ({ easy: 1, medium: 2, hard: 3 }[q.difficulty]!)).reduce((a, b) => a + b, 0) / f3MathModule2HardQuestions.length
const m2EasyMathAvgDiff = f3MathModule2EasyQuestions.map(q => ({ easy: 1, medium: 2, hard: 3 }[q.difficulty]!)).reduce((a, b) => a + b, 0) / f3MathModule2EasyQuestions.length

console.log(`  Math M1 avg difficulty: ${m1MathAvgDiff.toFixed(2)}`)
console.log(`  Math M2 Easy avg difficulty: ${m2EasyMathAvgDiff.toFixed(2)}`)
console.log(`  Math M2 Hard avg difficulty: ${m2HardMathAvgDiff.toFixed(2)}`)
if (m2HardMathAvgDiff > m2EasyMathAvgDiff) OK('Math hard route harder than easy route')
else WARN('Math hard route not harder than easy route on average')

// ── Final report ─────────────────────────────────────────────────────────────

console.log('\n════ Summary ════')
if (errors === 0 && warnings === 0) {
  console.log('✓ All checks passed — 0 errors, 0 warnings')
} else if (errors === 0) {
  console.log(`✓ 0 critical errors | ⚠ ${warnings} warnings`)
} else {
  console.log(`✗ ${errors} critical errors | ⚠ ${warnings} warnings`)
}

if (errors > 0) process.exit(1)
