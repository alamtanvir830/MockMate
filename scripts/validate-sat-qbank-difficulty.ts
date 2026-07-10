/**
 * Validates SAT Question Bank difficulty distribution after upgrades.
 * Run: npx tsx scripts/validate-sat-qbank-difficulty.ts
 */
import { rwQuestions } from '../lib/question-bank/sat/rw-questions'
import { mathQuestions } from '../lib/question-bank/sat/math-questions'
import type { QBQuestion } from '../lib/question-bank/types'

let failed = 0
const PASS = (msg: string) => console.log('  ✓', msg)
const FAIL = (msg: string) => { console.error('  ✗', msg); failed++ }
const INFO = (msg: string) => console.log('  ·', msg)

const DIVIDER = '─'.repeat(62)

const allQuestions = [...rwQuestions, ...mathQuestions]
const rwTotal = rwQuestions.length
const mathTotal = mathQuestions.length
const grandTotal = allQuestions.length

console.log('\n' + '═'.repeat(62))
console.log(' SAT Question Bank — Difficulty Upgrade Validation')
console.log('═'.repeat(62))
console.log(`\n  Reading & Writing : ${rwTotal} questions`)
console.log(`  Math              : ${mathTotal} questions`)
console.log(`  Total             : ${grandTotal} questions`)

// ── Duplicate ID Check ────────────────────────────────────────────────────────
console.log(`\n${DIVIDER}`)
console.log('  Duplicate ID Check')
console.log(DIVIDER)
{
  const ids = allQuestions.map(q => q.id)
  const seen = new Set<string>()
  const dupes: string[] = []
  for (const id of ids) {
    if (seen.has(id)) dupes.push(id)
    seen.add(id)
  }
  if (dupes.length === 0) PASS(`No duplicate IDs across ${grandTotal} questions`)
  else FAIL(`Duplicate IDs found: ${dupes.join(', ')}`)
}

// ── Required Fields Check ─────────────────────────────────────────────────────
console.log(`\n${DIVIDER}`)
console.log('  Required Fields & Content Quality')
console.log(DIVIDER)
{
  let fieldErrors = 0
  for (const q of allQuestions) {
    if (!q.domain)        { FAIL(`${q.id}: missing domain`);       fieldErrors++ }
    if (!q.skill)         { FAIL(`${q.id}: missing skill`);        fieldErrors++ }
    if (!q.question)      { FAIL(`${q.id}: missing question`);     fieldErrors++ }
    if (!q.explanation)   { FAIL(`${q.id}: missing explanation`);  fieldErrors++ }
    if (!q.correctAnswer) { FAIL(`${q.id}: missing correctAnswer`); fieldErrors++ }
    if (!q.teachingPoint) { FAIL(`${q.id}: missing teachingPoint`); fieldErrors++ }
    if (!q.relatedSkills || q.relatedSkills.length === 0) FAIL(`${q.id}: missing relatedSkills`)

    if (q.questionType === 'multiple_choice') {
      if (!q.choices || q.choices.length !== 4) FAIL(`${q.id}: MC must have exactly 4 choices`)
      if (q.choices && !['A','B','C','D'].includes(q.correctAnswer)) FAIL(`${q.id}: MC correctAnswer '${q.correctAnswer}' not A/B/C/D`)
    }
    if (q.questionType === 'grid_in') {
      if (!q.acceptableAnswers || q.acceptableAnswers.length === 0) FAIL(`${q.id}: grid_in missing acceptableAnswers`)
      if (q.acceptableAnswers && !q.acceptableAnswers.includes(q.correctAnswer)) FAIL(`${q.id}: correctAnswer '${q.correctAnswer}' not in acceptableAnswers`)
    }

    // No raw markdown tables
    const fullText = [q.stimulus ?? '', q.question, q.explanation].join(' ')
    if (fullText.includes('|---') || fullText.includes('| ---')) FAIL(`${q.id}: raw markdown table in content`)

    // Risky wording
    if (/college board/i.test(fullText)) FAIL(`${q.id}: "College Board" in content`)
    if (/official SAT/i.test(fullText)) FAIL(`${q.id}: "official SAT" in content`)
    if (/real SAT/i.test(fullText)) FAIL(`${q.id}: "real SAT" in content`)
    if (/adapted from/i.test(q.stimulus ?? '')) FAIL(`${q.id}: "adapted from" in stimulus`)

    // Cross-text formatting
    if (q.stimulus?.includes('Text 2') && !q.stimulus.includes('\n\nText 2')) {
      FAIL(`${q.id}: Cross-Text missing blank-line separator before Text 2`)
    }
  }
  if (fieldErrors === 0) PASS('All required fields present and valid')
}

// ── R&W Difficulty Distribution ───────────────────────────────────────────────
console.log(`\n${DIVIDER}`)
console.log('  Reading & Writing Difficulty Distribution')
console.log(DIVIDER)
{
  const rwDiff = { easy: 0, medium: 0, hard: 0 }
  const domainDiff: Record<string, { easy: number; medium: number; hard: number }> = {}

  for (const q of rwQuestions) {
    rwDiff[q.difficulty] = (rwDiff[q.difficulty] ?? 0) + 1
    if (!domainDiff[q.domain]) domainDiff[q.domain] = { easy: 0, medium: 0, hard: 0 }
    domainDiff[q.domain][q.difficulty]++
  }

  const rwEasyPct = Math.round(rwDiff.easy / rwTotal * 100)
  const rwMedPct  = Math.round(rwDiff.medium / rwTotal * 100)
  const rwHardPct = Math.round(rwDiff.hard / rwTotal * 100)

  INFO(`Total: ${rwTotal} | easy=${rwDiff.easy} (${rwEasyPct}%) medium=${rwDiff.medium} (${rwMedPct}%) hard=${rwDiff.hard} (${rwHardPct}%)`)

  if (rwEasyPct <= 25) PASS(`R&W easy ${rwEasyPct}% ≤ 25% target`)
  else FAIL(`R&W easy ${rwEasyPct}% > 25% — too many easy questions`)

  if (rwHardPct >= 30) PASS(`R&W hard ${rwHardPct}% ≥ 30% target`)
  else FAIL(`R&W hard ${rwHardPct}% < 30% — not enough hard questions`)

  INFO('By domain:')
  for (const [domain, counts] of Object.entries(domainDiff).sort()) {
    const total = counts.easy + counts.medium + counts.hard
    INFO(`  ${domain}: easy=${counts.easy} medium=${counts.medium} hard=${counts.hard} (total ${total})`)
  }
}

// ── Math Difficulty Distribution ──────────────────────────────────────────────
console.log(`\n${DIVIDER}`)
console.log('  Math Difficulty Distribution')
console.log(DIVIDER)
{
  const mathDiff = { easy: 0, medium: 0, hard: 0 }
  const domainDiff: Record<string, { easy: number; medium: number; hard: number }> = {}
  let gridInCount = 0

  for (const q of mathQuestions) {
    mathDiff[q.difficulty] = (mathDiff[q.difficulty] ?? 0) + 1
    if (!domainDiff[q.domain]) domainDiff[q.domain] = { easy: 0, medium: 0, hard: 0 }
    domainDiff[q.domain][q.difficulty]++
    if (q.questionType === 'grid_in') gridInCount++
  }

  const mathEasyPct = Math.round(mathDiff.easy / mathTotal * 100)
  const mathMedPct  = Math.round(mathDiff.medium / mathTotal * 100)
  const mathHardPct = Math.round(mathDiff.hard / mathTotal * 100)

  INFO(`Total: ${mathTotal} | easy=${mathDiff.easy} (${mathEasyPct}%) medium=${mathDiff.medium} (${mathMedPct}%) hard=${mathDiff.hard} (${mathHardPct}%)`)
  INFO(`Grid-in questions: ${gridInCount}`)

  if (mathEasyPct <= 25) PASS(`Math easy ${mathEasyPct}% ≤ 25% target`)
  else FAIL(`Math easy ${mathEasyPct}% > 25% — too many easy questions`)

  if (mathHardPct >= 30) PASS(`Math hard ${mathHardPct}% ≥ 30% target`)
  else FAIL(`Math hard ${mathHardPct}% < 30% — not enough hard questions`)

  INFO('By domain:')
  for (const [domain, counts] of Object.entries(domainDiff).sort()) {
    const total = counts.easy + counts.medium + counts.hard
    INFO(`  ${domain}: easy=${counts.easy} medium=${counts.medium} hard=${counts.hard} (total ${total})`)
  }
}

// ── Grand Totals ──────────────────────────────────────────────────────────────
console.log(`\n${DIVIDER}`)
console.log('  Grand Total Distribution')
console.log(DIVIDER)
{
  const allDiff = { easy: 0, medium: 0, hard: 0 }
  for (const q of allQuestions) allDiff[q.difficulty]++

  const easyPct = Math.round(allDiff.easy / grandTotal * 100)
  const medPct  = Math.round(allDiff.medium / grandTotal * 100)
  const hardPct = Math.round(allDiff.hard / grandTotal * 100)

  INFO(`easy=${allDiff.easy} (${easyPct}%) medium=${allDiff.medium} (${medPct}%) hard=${allDiff.hard} (${hardPct}%)`)

  if (grandTotal >= 614) PASS(`Total questions: ${grandTotal} ≥ 614 (none deleted)`)
  else FAIL(`Total questions: ${grandTotal} < 614 — questions were deleted!`)

  if (easyPct <= 25) PASS(`Overall easy % = ${easyPct}% ≤ 25%`)
  else FAIL(`Overall easy % = ${easyPct}% — still too many easy questions`)

  if (hardPct >= 30) PASS(`Overall hard % = ${hardPct}% ≥ 30%`)
  else FAIL(`Overall hard % = ${hardPct}% — not enough hard questions`)

  // Roughly half should have been upgraded (hard count increased vs baseline of 183)
  const BASELINE_HARD = 183 // easy 138 medium 293 hard 183 (pre-upgrade)
  if (allDiff.hard > BASELINE_HARD) PASS(`Hard count ${allDiff.hard} > baseline ${BASELINE_HARD} (improvement confirmed)`)
  else FAIL(`Hard count ${allDiff.hard} ≤ baseline ${BASELINE_HARD} (no improvement in hard count)`)
}

// ── Result ────────────────────────────────────────────────────────────────────
console.log()
if (failed === 0) {
  console.log('✅ All difficulty upgrade checks passed.\n')
} else {
  console.log(`❌ ${failed} check(s) failed.\n`)
}
process.exit(failed > 0 ? 1 : 0)
