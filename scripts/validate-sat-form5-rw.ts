/**
 * Validates SAT Form 5 Reading & Writing modules.
 * Run: npx tsx scripts/validate-sat-form5-rw.ts
 */
import { f5RwModule1Questions } from '../lib/premade-exams/sat/form-5-rw-module-1'
import { f5RwModule2EasyQuestions } from '../lib/premade-exams/sat/form-5-rw-module-2-easy'
import { f5RwModule2HardQuestions } from '../lib/premade-exams/sat/form-5-rw-module-2-hard'
import type { RWQuestion } from '../lib/premade-exams/sat/types'

let failed = 0
const PASS = (msg: string) => console.log('  ✓', msg)
const FAIL = (msg: string) => { console.error('  ✗', msg); failed++ }
const INFO = (msg: string) => console.log('  ·', msg)

const MODULES = [
  { name: 'RW Module 1', id: 'f5-rw-module-1', idPrefix: 'sat-f5-rw-m1-q', questions: f5RwModule1Questions, count: 27 },
  { name: 'RW Module 2 Easy', id: 'f5-rw-module-2-easy', idPrefix: 'sat-f5-rw-m2e-q', questions: f5RwModule2EasyQuestions, count: 27 },
  { name: 'RW Module 2 Hard', id: 'f5-rw-module-2-hard', idPrefix: 'sat-f5-rw-m2h-q', questions: f5RwModule2HardQuestions, count: 27 },
]

const VALID_DOMAINS = new Set(['Craft and Structure', 'Information and Ideas', 'Standard English Conventions', 'Expression of Ideas'])
const VALID_SKILLS = new Set([
  'Words in Context', 'Text Structure and Purpose', 'Cross-Text Connections',
  'Central Ideas and Details', 'Command of Evidence', 'Inferences',
  'Rhetorical Synthesis', 'Transitions', 'Boundaries', 'Form, Structure, and Sense',
])
const VALID_DIFFICULTIES = new Set(['easy', 'medium', 'hard'])
const GRAMMAR_SKILLS = new Set(['Boundaries', 'Form, Structure, and Sense', 'Transitions', 'Rhetorical Synthesis'])

console.log('\n' + '═'.repeat(62))
console.log(' SAT Form 5 — Reading & Writing Validation')
console.log('═'.repeat(62))

for (const mod of MODULES) {
  console.log(`\n── ${mod.name} ──`)
  const qs = mod.questions as RWQuestion[]

  // Count check
  if (qs.length === mod.count) PASS(`Question count: ${qs.length}`)
  else FAIL(`Question count: ${qs.length} (expected ${mod.count})`)

  // ID checks
  const ids = qs.map(q => q.id)
  const allIds = new Set(ids)
  if (allIds.size === qs.length) PASS('No duplicate IDs')
  else FAIL(`Duplicate IDs found`)

  for (let i = 1; i <= mod.count; i++) {
    const expected = `${mod.idPrefix}${String(i).padStart(2, '0')}`
    if (!allIds.has(expected)) FAIL(`Missing ID: ${expected}`)
  }

  // Per-question checks
  let grammarCount = 0
  const domainCount: Record<string, number> = {}
  const skillCount: Record<string, number> = {}
  const diffCount: Record<string, number> = { easy: 0, medium: 0, hard: 0 }

  for (const q of qs) {
    if (q.moduleId !== mod.id) FAIL(`${q.id}: moduleId is '${q.moduleId}', expected '${mod.id}'`)
    if (!VALID_DOMAINS.has(q.domain)) FAIL(`${q.id}: invalid domain '${q.domain}'`)
    if (!VALID_SKILLS.has(q.skill)) FAIL(`${q.id}: invalid skill '${q.skill}'`)
    if (!VALID_DIFFICULTIES.has(q.difficulty)) FAIL(`${q.id}: invalid difficulty '${q.difficulty}'`)
    if (!q.stimulus) FAIL(`${q.id}: missing stimulus`)
    if (!q.question) FAIL(`${q.id}: missing question`)
    if (!q.choices || q.choices.length !== 4) FAIL(`${q.id}: must have exactly 4 choices`)
    if (!['A','B','C','D'].includes(q.correctAnswer)) FAIL(`${q.id}: invalid correctAnswer '${q.correctAnswer}'`)
    if (!q.explanation) FAIL(`${q.id}: missing explanation`)
    if (!q.wrongAnswerExplanations) FAIL(`${q.id}: missing wrongAnswerExplanations`)

    // Risky content
    const fullText = [q.stimulus ?? '', q.question, q.explanation].join(' ')
    if (/college board/i.test(fullText)) FAIL(`${q.id}: "College Board" in content`)
    if (/official SAT/i.test(fullText)) FAIL(`${q.id}: "official SAT" in content`)
    if (/adapted from/i.test(q.stimulus ?? '')) FAIL(`${q.id}: "adapted from" in stimulus`)
    if (q.stimulus?.includes('|---') || q.stimulus?.includes('| ---')) FAIL(`${q.id}: raw markdown table in stimulus`)

    // Cross-Text format
    if (q.skill === 'Cross-Text Connections' && q.stimulus && !q.stimulus.includes('\n\nText 2')) {
      FAIL(`${q.id}: Cross-Text stimulus missing blank-line separator before Text 2`)
    }

    if (GRAMMAR_SKILLS.has(q.skill)) grammarCount++
    domainCount[q.domain] = (domainCount[q.domain] ?? 0) + 1
    skillCount[q.skill] = (skillCount[q.skill] ?? 0) + 1
    diffCount[q.difficulty] = (diffCount[q.difficulty] ?? 0) + 1
  }

  // Grammar question count (10–12 target)
  if (grammarCount >= 10 && grammarCount <= 12) PASS(`Grammar-style questions: ${grammarCount} (within 10–12 target)`)
  else FAIL(`Grammar-style questions: ${grammarCount} (expected 10–12)`)

  // Domain breakdown
  INFO('Domain breakdown:')
  for (const [d, c] of Object.entries(domainCount).sort()) INFO(`  ${d}: ${c}`)
  INFO('Skill breakdown:')
  for (const [s, c] of Object.entries(skillCount).sort()) INFO(`  ${s}: ${c}`)
  INFO(`Difficulty: easy=${diffCount.easy} medium=${diffCount.medium} hard=${diffCount.hard}`)
}

// Cross-module duplicate ID check
console.log(`\n── Cross-Module Duplicate ID Check ──`)
const allIds = [
  ...f5RwModule1Questions,
  ...f5RwModule2EasyQuestions,
  ...f5RwModule2HardQuestions,
].map(q => q.id)
const seen = new Set<string>()
const dupes: string[] = []
for (const id of allIds) {
  if (seen.has(id)) dupes.push(id)
  seen.add(id)
}
if (dupes.length === 0) PASS(`No duplicate IDs across all 3 modules (${allIds.length} total)`)
else FAIL(`Duplicate IDs across modules: ${dupes.join(', ')}`)

console.log(`\n${failed === 0 ? '✅ All RW Form 5 checks passed.' : `❌ ${failed} check(s) failed.`}\n`)
process.exit(failed > 0 ? 1 : 0)
