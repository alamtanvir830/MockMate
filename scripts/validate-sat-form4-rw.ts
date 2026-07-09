/**
 * Validates SAT Form 4 Reading & Writing Modules.
 * Run: npx tsx scripts/validate-sat-form4-rw.ts
 */
import { f4RwModule1Questions } from '../lib/premade-exams/sat/form-4-rw-module-1'
import { f4RwModule2EasyQuestions } from '../lib/premade-exams/sat/form-4-rw-module-2-easy'
import { f4RwModule2HardQuestions } from '../lib/premade-exams/sat/form-4-rw-module-2-hard'
import type { RWQuestion } from '../lib/premade-exams/sat/types'

let failed = 0
const PASS = (msg: string) => console.log('  ✓', msg)
const FAIL = (msg: string) => { console.error('  ✗', msg); failed++ }

function validateModule(questions: RWQuestion[], label: string, expectedCount: number) {
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
    if (!q.choices || q.choices.length !== 4) FAIL(`${q.id}: must have exactly 4 choices`)
    if (!['A', 'B', 'C', 'D'].includes(q.correctAnswer)) FAIL(`${q.id}: invalid correctAnswer '${q.correctAnswer}'`)
  }
  PASS('All required fields present and valid')

  const domainCounts: Record<string, number> = {}
  for (const q of questions) domainCounts[q.domain] = (domainCounts[q.domain] ?? 0) + 1
  console.log('  Domain distribution:')
  for (const [d, c] of Object.entries(domainCounts)) console.log(`      ${d}: ${c}`)

  const diff = { easy: 0, medium: 0, hard: 0 }
  for (const q of questions) diff[q.difficulty as 'easy' | 'medium' | 'hard']++
  console.log(`  Difficulty: easy=${diff.easy}  medium=${diff.medium}  hard=${diff.hard}`)
}

validateModule(f4RwModule1Questions, 'RW Module 1 (routing)', 27)
validateModule(f4RwModule2EasyQuestions, 'RW Module 2 Easy', 27)
validateModule(f4RwModule2HardQuestions, 'RW Module 2 Hard', 27)

console.log(failed === 0 ? '\n✅ All checks passed.\n' : `\n❌ ${failed} check(s) failed.\n`)
process.exit(failed > 0 ? 1 : 0)
