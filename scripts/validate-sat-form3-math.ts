/**
 * Validates SAT Form 3 Math Modules.
 * Run: npx tsx scripts/validate-sat-form3-math.ts
 */
import { f3MathModule1Questions } from '../lib/premade-exams/sat/form-3-math-module-1'
import { f3MathModule2EasyQuestions } from '../lib/premade-exams/sat/form-3-math-module-2-easy'
import { f3MathModule2HardQuestions } from '../lib/premade-exams/sat/form-3-math-module-2-hard'
import type { MathQuestion } from '../lib/premade-exams/sat/types'

let failed = 0
const PASS = (msg: string) => console.log('  ✓', msg)
const FAIL = (msg: string) => { console.error('  ✗', msg); failed++ }

function avgDifficulty(qs: MathQuestion[]) {
  const w = { easy: 1, medium: 2, hard: 3 } as const
  return qs.reduce((s, q) => s + w[q.difficulty], 0) / qs.length
}

function validateModule(questions: MathQuestion[], label: string, expectedCount: number) {
  console.log(`\n── ${label} ──`)

  if (questions.length === expectedCount) PASS(`Count: ${questions.length} questions`)
  else FAIL(`Count: expected ${expectedCount}, got ${questions.length}`)

  const ids = questions.map(q => q.id)
  const dupes = ids.filter((id, i) => ids.indexOf(id) !== i)
  if (dupes.length === 0) PASS('No duplicate IDs')
  else FAIL(`Duplicate IDs: ${dupes.join(', ')}`)

  for (const q of questions) {
    if (!q.domain) FAIL(`${q.id}: missing domain`)
    if (!q.skill) FAIL(`${q.id}: missing skill`)
    if (!['easy', 'medium', 'hard'].includes(q.difficulty)) FAIL(`${q.id}: invalid difficulty '${q.difficulty}'`)
    if (!q.question) FAIL(`${q.id}: missing question text`)
    if (!q.explanation) FAIL(`${q.id}: missing explanation`)
    if (q.question.includes('|---') || q.question.includes('| ---')) FAIL(`${q.id}: raw markdown table in question`)
    if (q.type === 'multiple_choice') {
      if (!q.choices || q.choices.length !== 4) FAIL(`${q.id}: must have exactly 4 choices`)
      if (!['A', 'B', 'C', 'D'].includes(q.correctAnswer)) FAIL(`${q.id}: invalid correctAnswer '${q.correctAnswer}'`)
    }
    if (q.type === 'grid_in') {
      if (!q.correctAnswer) FAIL(`${q.id}: grid-in missing correctAnswer`)
      if (!q.acceptableAnswers?.length) FAIL(`${q.id}: grid-in missing acceptableAnswers`)
    }
  }
  if (failed === 0) PASS('All required fields present and valid')

  const domainCounts: Record<string, number> = {}
  for (const q of questions) domainCounts[q.domain] = (domainCounts[q.domain] ?? 0) + 1
  console.log('  Domain distribution:')
  for (const [d, c] of Object.entries(domainCounts)) console.log(`      ${d}: ${c}`)

  const diff = { easy: 0, medium: 0, hard: 0 }
  for (const q of questions) diff[q.difficulty]++
  console.log(`  Difficulty: easy=${diff.easy}  medium=${diff.medium}  hard=${diff.hard}`)

  return { diff, avg: avgDifficulty(questions) }
}

const m1  = validateModule(f3MathModule1Questions,      'Form 3 Math Module 1',      22)
const m2e = validateModule(f3MathModule2EasyQuestions,  'Form 3 Math Module 2 Easy', 22)
const m2h = validateModule(f3MathModule2HardQuestions,  'Form 3 Math Module 2 Hard', 22)

console.log('\n── Cross-module difficulty checks ──')
console.log(`  Avg difficulty (1=easy 3=hard):  M1=${m1.avg.toFixed(2)}  M2E=${m2e.avg.toFixed(2)}  M2H=${m2h.avg.toFixed(2)}`)

if (m2h.avg > m1.avg)  PASS(`M2 Hard avg (${m2h.avg.toFixed(2)}) > M1 avg (${m1.avg.toFixed(2)})`)
else FAIL(`M2 Hard avg should exceed M1 avg`)

if (m2h.avg > m2e.avg) PASS(`M2 Hard avg (${m2h.avg.toFixed(2)}) > M2 Easy avg (${m2e.avg.toFixed(2)})`)
else FAIL(`M2 Hard avg should exceed M2 Easy avg`)

if (m1.avg > 1.5)  PASS(`M1 avg (${m1.avg.toFixed(2)}) > 1.5 — not just easy`)
else FAIL(`M1 avg (${m1.avg.toFixed(2)}) too low — module still feels easy`)

if (m2e.avg > 1.6) PASS(`M2 Easy avg (${m2e.avg.toFixed(2)}) > 1.6 — not childish`)
else FAIL(`M2 Easy avg (${m2e.avg.toFixed(2)}) too low`)

if (m2h.avg >= 2.5) PASS(`M2 Hard avg (${m2h.avg.toFixed(2)}) ≥ 2.5 — genuinely hard`)
else FAIL(`M2 Hard avg (${m2h.avg.toFixed(2)}) should be ≥ 2.5`)

if (m1.diff.easy <= 4) PASS(`M1 easy count (${m1.diff.easy}) ≤ 4 — mostly medium/hard`)
else FAIL(`M1 has ${m1.diff.easy} easy questions — too many`)

console.log(failed === 0 ? '\n✅ All checks passed.\n' : `\n❌ ${failed} check(s) failed.\n`)
process.exit(failed > 0 ? 1 : 0)
