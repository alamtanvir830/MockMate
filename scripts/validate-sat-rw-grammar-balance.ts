/**
 * Validates SAT R&W grammar (Standard English Conventions) balance across all forms.
 * Run: npx tsx scripts/validate-sat-rw-grammar-balance.ts
 */
import { rwModule1Questions } from '../lib/premade-exams/sat/rw-module-1'
import { rwModule2EasyQuestions } from '../lib/premade-exams/sat/rw-module-2-easy'
import { rwModule2HardQuestions } from '../lib/premade-exams/sat/rw-module-2-hard'
import { f2RwModule1Questions } from '../lib/premade-exams/sat/form-2-rw-module-1'
import { f2RwModule2EasyQuestions } from '../lib/premade-exams/sat/form-2-rw-module-2-easy'
import { f2RwModule2HardQuestions } from '../lib/premade-exams/sat/form-2-rw-module-2-hard'
import { f3RwModule1Questions } from '../lib/premade-exams/sat/form-3-rw-module-1'
import { f3RwModule2EasyQuestions } from '../lib/premade-exams/sat/form-3-rw-module-2-easy'
import { f3RwModule2HardQuestions } from '../lib/premade-exams/sat/form-3-rw-module-2-hard'
import { f4RwModule1Questions } from '../lib/premade-exams/sat/form-4-rw-module-1'
import { f4RwModule2EasyQuestions } from '../lib/premade-exams/sat/form-4-rw-module-2-easy'
import { f4RwModule2HardQuestions } from '../lib/premade-exams/sat/form-4-rw-module-2-hard'
import type { RWQuestion } from '../lib/premade-exams/sat/types'

let failed = 0
const PASS = (msg: string) => console.log('  ✓', msg)
const FAIL = (msg: string) => { console.error('  ✗', msg); failed++ }

function validateModule(questions: RWQuestion[], label: string) {
  console.log(`\n── ${label} ──`)

  // Count
  if (questions.length === 27) PASS(`Count: 27 questions`)
  else FAIL(`Count: expected 27, got ${questions.length}`)

  // No duplicate IDs
  const ids = questions.map(q => q.id)
  const dupes = ids.filter((id, i) => ids.indexOf(id) !== i)
  if (dupes.length === 0) PASS('No duplicate IDs')
  else FAIL(`Duplicate IDs: ${dupes.join(', ')}`)

  // Required fields
  let fieldErrors = 0
  for (const q of questions) {
    if (!q.domain) { FAIL(`${q.id}: missing domain`); fieldErrors++ }
    if (!q.skill) { FAIL(`${q.id}: missing skill`); fieldErrors++ }
    if (!q.question) { FAIL(`${q.id}: missing question text`); fieldErrors++ }
    if (!q.explanation) { FAIL(`${q.id}: missing explanation`); fieldErrors++ }
    if (!q.choices || q.choices.length !== 4) { FAIL(`${q.id}: must have exactly 4 choices`); fieldErrors++ }
    if (!['A', 'B', 'C', 'D'].includes(q.correctAnswer)) { FAIL(`${q.id}: invalid correctAnswer '${q.correctAnswer}'`); fieldErrors++ }
    if (!['easy', 'medium', 'hard'].includes(q.difficulty)) { FAIL(`${q.id}: invalid difficulty '${q.difficulty}'`); fieldErrors++ }
    // Detect raw markdown tables
    if (q.stimulus?.includes('|---') || q.stimulus?.includes('| ---')) FAIL(`${q.id}: raw markdown table in stimulus`)
    if (q.question.includes('|---') || q.question.includes('| ---')) FAIL(`${q.id}: raw markdown table in question`)
    // Detect Text1/Text2 run-together bug (only when no blank line before "Text 2")
    if (q.stimulus?.includes('Text 2') && !q.stimulus.includes('\n\nText 2')) {
      FAIL(`${q.id}: Text 2 follows Text 1 without a blank-line separator`)
    }
  }
  if (fieldErrors === 0) PASS('All required fields present and valid')

  // Domain/skill breakdown
  const skillCounts: Record<string, number> = {}
  for (const q of questions) skillCounts[q.skill] = (skillCounts[q.skill] ?? 0) + 1

  const secCount = (skillCounts['Boundaries'] ?? 0) + (skillCounts['Form, Structure, and Sense'] ?? 0)
  const grammarCount = secCount + (skillCounts['Transitions'] ?? 0) + (skillCounts['Rhetorical Synthesis'] ?? 0)

  console.log('  Skill breakdown:')
  for (const [skill, count] of Object.entries(skillCounts).sort()) {
    console.log(`    ${skill}: ${count}`)
  }
  console.log(`  SEC (Boundaries + FSS): ${secCount}`)
  console.log(`  Grammar-style (SEC + Transitions + RS): ${grammarCount}`)

  if (secCount >= 6) PASS(`SEC count (${secCount}) ≥ 6 — adequate grammar coverage`)
  else FAIL(`SEC count (${secCount}) < 6 — insufficient grammar coverage`)

  if (grammarCount >= 10) PASS(`Grammar-style count (${grammarCount}) ≥ 10 — target met`)
  else FAIL(`Grammar-style count (${grammarCount}) < 10 — below target`)

  return { secCount, grammarCount }
}

console.log('\n════════════════════════════════════════')
console.log(' SAT R&W Grammar Balance Validation')
console.log('════════════════════════════════════════')

const modules = [
  { label: 'Form 1 — M1 (routing)',   qs: rwModule1Questions },
  { label: 'Form 1 — M2 Easy',        qs: rwModule2EasyQuestions },
  { label: 'Form 1 — M2 Hard',        qs: rwModule2HardQuestions },
  { label: 'Form 2 — M1 (routing)',   qs: f2RwModule1Questions },
  { label: 'Form 2 — M2 Easy',        qs: f2RwModule2EasyQuestions },
  { label: 'Form 2 — M2 Hard',        qs: f2RwModule2HardQuestions },
  { label: 'Form 3 — M1 (routing)',   qs: f3RwModule1Questions },
  { label: 'Form 3 — M2 Easy',        qs: f3RwModule2EasyQuestions },
  { label: 'Form 3 — M2 Hard',        qs: f3RwModule2HardQuestions },
  { label: 'Form 4 — M1 (routing)',   qs: f4RwModule1Questions },
  { label: 'Form 4 — M2 Easy',        qs: f4RwModule2EasyQuestions },
  { label: 'Form 4 — M2 Hard',        qs: f4RwModule2HardQuestions },
]

for (const { label, qs } of modules) {
  validateModule(qs, label)
}

console.log(`\n${failed === 0 ? '✅ All checks passed.' : `❌ ${failed} check(s) failed.`}\n`)
process.exit(failed > 0 ? 1 : 0)
