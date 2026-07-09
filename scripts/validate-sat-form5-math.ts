/**
 * Validates SAT Form 5 Math modules.
 * Run: npx tsx scripts/validate-sat-form5-math.ts
 */
import { f5MathModule1Questions } from '../lib/premade-exams/sat/form-5-math-module-1'
import { f5MathModule2EasyQuestions } from '../lib/premade-exams/sat/form-5-math-module-2-easy'
import { f5MathModule2HardQuestions } from '../lib/premade-exams/sat/form-5-math-module-2-hard'
import type { MathQuestion } from '../lib/premade-exams/sat/types'

let failed = 0
const PASS = (msg: string) => console.log('  ✓', msg)
const FAIL = (msg: string) => { console.error('  ✗', msg); failed++ }
const INFO = (msg: string) => console.log('  ·', msg)

const MODULES = [
  { name: 'Math Module 1', id: 'f5-math-module-1', idPrefix: 'sat-f5-math-m1-q', questions: f5MathModule1Questions, count: 22 },
  { name: 'Math Module 2 Easy', id: 'f5-math-module-2-easy', idPrefix: 'sat-f5-math-m2e-q', questions: f5MathModule2EasyQuestions, count: 22 },
  { name: 'Math Module 2 Hard', id: 'f5-math-module-2-hard', idPrefix: 'sat-f5-math-m2h-q', questions: f5MathModule2HardQuestions, count: 22 },
]

const VALID_DOMAINS = new Set(['Algebra', 'Advanced Math', 'Problem-Solving and Data Analysis', 'Geometry and Trigonometry'])
const VALID_DIFFICULTIES = new Set(['easy', 'medium', 'hard'])

console.log('\n' + '═'.repeat(62))
console.log(' SAT Form 5 — Math Validation')
console.log('═'.repeat(62))

for (const mod of MODULES) {
  console.log(`\n── ${mod.name} ──`)
  const qs = mod.questions as MathQuestion[]

  // Count check
  if (qs.length === mod.count) PASS(`Question count: ${qs.length}`)
  else FAIL(`Question count: ${qs.length} (expected ${mod.count})`)

  // ID checks
  const ids = qs.map(q => q.id)
  const idSet = new Set(ids)
  if (idSet.size === qs.length) PASS('No duplicate IDs')
  else FAIL('Duplicate IDs found')

  for (let i = 1; i <= mod.count; i++) {
    const expected = `${mod.idPrefix}${String(i).padStart(2, '0')}`
    if (!idSet.has(expected)) FAIL(`Missing ID: ${expected}`)
  }

  // Per-question checks
  const domainCount: Record<string, number> = {}
  const diffCount: Record<string, number> = { easy: 0, medium: 0, hard: 0 }
  let gridInCount = 0
  let mcCount = 0

  for (const q of qs) {
    if (q.moduleId !== mod.id) FAIL(`${q.id}: moduleId '${q.moduleId}', expected '${mod.id}'`)
    if (!VALID_DOMAINS.has(q.domain)) FAIL(`${q.id}: invalid domain '${q.domain}'`)
    if (!VALID_DIFFICULTIES.has(q.difficulty)) FAIL(`${q.id}: invalid difficulty '${q.difficulty}'`)
    if (!q.skill) FAIL(`${q.id}: missing skill`)
    if (!q.question) FAIL(`${q.id}: missing question`)
    if (!q.explanation) FAIL(`${q.id}: missing explanation`)

    if (q.type === 'multiple_choice') {
      mcCount++
      if (!q.choices || q.choices.length !== 4) FAIL(`${q.id}: MC must have exactly 4 choices`)
      if (!['A','B','C','D'].includes(q.correctAnswer as string)) FAIL(`${q.id}: MC correctAnswer must be A/B/C/D`)
      // Check distinct choices
      if (q.choices) {
        const vals = q.choices.map(c => c.text)
        if (new Set(vals).size !== vals.length) FAIL(`${q.id}: duplicate choice values`)
      }
    } else if (q.type === 'grid_in') {
      gridInCount++
      if (!q.correctAnswer) FAIL(`${q.id}: grid_in missing correctAnswer`)
      if (!q.acceptableAnswers || q.acceptableAnswers.length === 0) FAIL(`${q.id}: grid_in missing acceptableAnswers`)
      if (q.acceptableAnswers && !q.acceptableAnswers.includes(q.correctAnswer)) {
        FAIL(`${q.id}: correctAnswer '${q.correctAnswer}' not in acceptableAnswers`)
      }
    }

    // No markdown tables
    const fullText = [q.stimulus ?? '', q.question, q.explanation].join(' ')
    if (fullText.includes('|---') || fullText.includes('| ---')) FAIL(`${q.id}: raw markdown table in content`)
    if (/college board/i.test(fullText)) FAIL(`${q.id}: "College Board" in content`)

    domainCount[q.domain] = (domainCount[q.domain] ?? 0) + 1
    diffCount[q.difficulty] = (diffCount[q.difficulty] ?? 0) + 1
  }

  if (gridInCount >= 2) PASS(`Grid-in questions: ${gridInCount}`)
  else FAIL(`Grid-in questions: ${gridInCount} (expected at least 2)`)

  INFO(`MC: ${mcCount}, Grid-in: ${gridInCount}`)
  INFO('Domain breakdown:')
  for (const [d, c] of Object.entries(domainCount).sort()) INFO(`  ${d}: ${c}`)
  INFO(`Difficulty: easy=${diffCount.easy} medium=${diffCount.medium} hard=${diffCount.hard}`)
}

// Cross-module difficulty check for M2H
console.log(`\n── M2H Difficulty Check ──`)
const m2hHardCount = (f5MathModule2HardQuestions as MathQuestion[]).filter(q => q.difficulty === 'hard').length
const m2hTotal = f5MathModule2HardQuestions.length
INFO(`M2H hard questions: ${m2hHardCount}/${m2hTotal}`)
if (m2hHardCount >= Math.floor(m2hTotal * 0.6)) PASS(`M2H is predominantly hard (${m2hHardCount}/${m2hTotal} hard)`)
else FAIL(`M2H should be predominantly hard — only ${m2hHardCount}/${m2hTotal}`)

// Cross-module duplicate ID check
console.log(`\n── Cross-Module Duplicate ID Check ──`)
const allIds = [
  ...f5MathModule1Questions,
  ...f5MathModule2EasyQuestions,
  ...f5MathModule2HardQuestions,
].map(q => q.id)
const seen = new Set<string>()
const dupes: string[] = []
for (const id of allIds) {
  if (seen.has(id)) dupes.push(id)
  seen.add(id)
}
if (dupes.length === 0) PASS(`No duplicate IDs across all 3 modules (${allIds.length} total)`)
else FAIL(`Duplicate IDs across modules: ${dupes.join(', ')}`)

console.log(`\n${failed === 0 ? '✅ All Math Form 5 checks passed.' : `❌ ${failed} check(s) failed.`}\n`)
process.exit(failed > 0 ? 1 : 0)
