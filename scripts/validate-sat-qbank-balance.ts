/**
 * Validates the SAT Question Bank balance, counts, and content quality.
 * Run: npx tsx scripts/validate-sat-qbank-balance.ts
 */
import { rwQuestions } from '../lib/question-bank/sat/rw-questions'
import { mathQuestions } from '../lib/question-bank/sat/math-questions'
import type { QBQuestion } from '../lib/question-bank/types'

let failed = 0
const PASS = (msg: string) => console.log('  ✓', msg)
const FAIL = (msg: string) => { console.error('  ✗', msg); failed++ }
const INFO = (msg: string) => console.log('  ·', msg)

const DIVIDER = '─'.repeat(62)

// ── Totals ────────────────────────────────────────────────────────────────────
const allQuestions = [...rwQuestions, ...mathQuestions]
const rwTotal = rwQuestions.length
const mathTotal = mathQuestions.length
const grandTotal = allQuestions.length

console.log('\n' + '═'.repeat(62))
console.log(' SAT Question Bank Validation')
console.log('═'.repeat(62))
console.log(`\n  Reading & Writing : ${rwTotal} questions`)
console.log(`  Math              : ${mathTotal} questions`)
console.log(`  Total             : ${grandTotal} questions`)

// ── Duplicate ID check ─────────────────────────────────────────────────────
{
  console.log(`\n── Duplicate ID Check ──`)
  const ids = allQuestions.map(q => q.id)
  const dupeSet = new Set<string>()
  const seen = new Set<string>()
  for (const id of ids) {
    if (seen.has(id)) dupeSet.add(id)
    seen.add(id)
  }
  if (dupeSet.size === 0) PASS(`No duplicate IDs across ${grandTotal} questions`)
  else FAIL(`Duplicate IDs found: ${[...dupeSet].join(', ')}`)
}

// ── Required fields check ──────────────────────────────────────────────────
{
  console.log(`\n── Required Fields Check ──`)
  let fieldErrors = 0
  for (const q of allQuestions) {
    if (!q.domain)       { FAIL(`${q.id}: missing domain`);       fieldErrors++ }
    if (!q.skill)        { FAIL(`${q.id}: missing skill`);        fieldErrors++ }
    if (!q.question)     { FAIL(`${q.id}: missing question text`); fieldErrors++ }
    if (!q.explanation)  { FAIL(`${q.id}: missing explanation`);  fieldErrors++ }
    if (!q.correctAnswer){ FAIL(`${q.id}: missing correctAnswer`); fieldErrors++ }
    // MC must have 4 choices
    if (q.questionType === 'multiple_choice') {
      if (!q.choices || q.choices.length !== 4) FAIL(`${q.id}: must have exactly 4 choices`)
      if (q.choices && !['A','B','C','D'].includes(q.correctAnswer)) FAIL(`${q.id}: correctAnswer '${q.correctAnswer}' not A/B/C/D`)
    }
    // Grid-in should not have choices
    if (q.questionType === 'grid_in' && q.choices) FAIL(`${q.id}: grid_in should not have choices array`)
    // Check no raw markdown tables
    if (q.stimulus?.includes('|---') || q.stimulus?.includes('| ---')) FAIL(`${q.id}: raw markdown table in stimulus`)
    if (q.question.includes('|---') || q.question.includes('| ---')) FAIL(`${q.id}: raw markdown table in question`)
    // Cross-text formatting
    if (q.stimulus?.includes('Text 2') && !q.stimulus.includes('\n\nText 2')) {
      FAIL(`${q.id}: Text 2 missing blank-line separator`)
    }
    // Risky phrasing
    const text = [q.stimulus ?? '', q.question, q.explanation].join(' ')
    if (/college board/i.test(text)) FAIL(`${q.id}: "College Board" in question content`)
    if (/official SAT/i.test(text)) FAIL(`${q.id}: "official SAT" in question content`)
    if (/adapted from/i.test(q.stimulus ?? '')) FAIL(`${q.id}: "adapted from" in stimulus (implies real source)`)
  }
  if (fieldErrors === 0) PASS('All required fields present and valid')
}

// ── R&W Domain/Skill Breakdown ────────────────────────────────────────────
{
  console.log(`\n── Reading & Writing Breakdown ──`)
  const domainMap: Record<string, Record<string, number>> = {}
  const diffMap: Record<string, number> = { easy: 0, medium: 0, hard: 0 }

  for (const q of rwQuestions) {
    if (!domainMap[q.domain]) domainMap[q.domain] = {}
    domainMap[q.domain][q.skill] = (domainMap[q.domain][q.skill] ?? 0) + 1
    diffMap[q.difficulty] = (diffMap[q.difficulty] ?? 0) + 1
  }

  for (const [domain, skills] of Object.entries(domainMap).sort()) {
    const domainTotal = Object.values(skills).reduce((a, b) => a + b, 0)
    INFO(`${domain}: ${domainTotal} questions`)
    for (const [skill, count] of Object.entries(skills).sort()) {
      INFO(`    ${skill}: ${count}`)
    }
  }

  INFO(`Difficulty: easy=${diffMap.easy} medium=${diffMap.medium} hard=${diffMap.hard}`)

  if (rwTotal >= 255) PASS(`R&W total (${rwTotal}) ≥ 255 — 100 new questions confirmed`)
  else FAIL(`R&W total (${rwTotal}) < 255 — expected 100 new questions added`)
}

// ── Math Domain/Skill Breakdown ───────────────────────────────────────────
{
  console.log(`\n── Math Breakdown ──`)
  const domainMap: Record<string, Record<string, number>> = {}
  const diffMap: Record<string, number> = { easy: 0, medium: 0, hard: 0 }
  let gridInCount = 0

  for (const q of mathQuestions) {
    if (!domainMap[q.domain]) domainMap[q.domain] = {}
    domainMap[q.domain][q.skill] = (domainMap[q.domain][q.skill] ?? 0) + 1
    diffMap[q.difficulty] = (diffMap[q.difficulty] ?? 0) + 1
    if (q.questionType === 'grid_in') gridInCount++
  }

  for (const [domain, skills] of Object.entries(domainMap).sort()) {
    const domainTotal = Object.values(skills).reduce((a, b) => a + b, 0)
    INFO(`${domain}: ${domainTotal} questions`)
    for (const [skill, count] of Object.entries(skills).sort()) {
      INFO(`    ${skill}: ${count}`)
    }
  }

  INFO(`Difficulty: easy=${diffMap.easy} medium=${diffMap.medium} hard=${diffMap.hard}`)
  INFO(`Grid-in questions: ${gridInCount}`)

  if (mathTotal >= 259) PASS(`Math total (${mathTotal}) ≥ 259 — 100 new questions confirmed`)
  else FAIL(`Math total (${mathTotal}) < 259 — expected 100 new questions added`)

  if (gridInCount >= 10) PASS(`Grid-in count (${gridInCount}) ≥ 10`)
  else FAIL(`Grid-in count (${gridInCount}) < 10 — add more grid-in questions`)
}

// ── Grand Total ───────────────────────────────────────────────────────────
{
  console.log(`\n── Grand Total ──`)
  if (grandTotal >= 514) PASS(`Total (${grandTotal}) ≥ 514 — 200 new questions confirmed`)
  else FAIL(`Total (${grandTotal}) < 514 — expected 200 new questions`)
}

// ── Result ────────────────────────────────────────────────────────────────
console.log(`\n${failed === 0 ? '✅ All checks passed.' : `❌ ${failed} check(s) failed.`}\n`)
process.exit(failed > 0 ? 1 : 0)
