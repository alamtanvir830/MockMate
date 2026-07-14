#!/usr/bin/env node
/**
 * MCAT QBank audit: validates counts, skill distribution, difficulty,
 * passage/discrete balance, answer quality, and metadata completeness.
 */
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const QBASE = resolve(__dirname, '../lib/question-bank/mcat')

let errors = 0, warnings = 0
const err  = (m) => { console.error(`  ❌ ${m}`); errors++ }
const warn = (m) => { console.warn(`  ⚠️  ${m}`); warnings++ }
const ok   = (m) => console.log(`  ✅ ${m}`)

function countMatches(content, re) {
  return (content.match(re) || []).length
}

const sections = [
  { file: 'chem-phys.ts', label: 'QBank C/P',   idPrefix: 'mcat-qb-cp-' },
  { file: 'cars.ts',      label: 'QBank CARS',   idPrefix: 'mcat-qb-cars-' },
  { file: 'bio-biochem.ts',label:'QBank B/B',    idPrefix: 'mcat-qb-bb-' },
  { file: 'psych-soc.ts', label: 'QBank P/S',    idPrefix: 'mcat-qb-ps-' },
]

console.log('=== MCAT QBank Audit ===\n')
const allQBIds = new Set()
let totalQB = 0

for (const sec of sections) {
  const content = readFileSync(resolve(QBASE, sec.file), 'utf8')
  console.log(`─── ${sec.label}: ${sec.file} ───`)

  // Count questions
  const ids = [...content.matchAll(/id:\s*'(mcat-qb-[^']+)'/g)].map(m => m[1])
  const uniqueIds = new Set(ids)
  const qCount = uniqueIds.size

  // Duplicate check
  if (ids.length !== uniqueIds.size) err(`${sec.label}: ${ids.length - uniqueIds.size} duplicate ID(s)`)
  // Cross-section duplicates
  const before = allQBIds.size
  ids.forEach(id => allQBIds.add(id))
  if (allQBIds.size - before < ids.length) err(`${sec.label}: some IDs duplicate with other sections`)

  totalQB += qCount

  // Passage vs discrete
  const passQ = countMatches(content, /questionType:\s*'passage'/g)
  const discQ = countMatches(content, /questionType:\s*'discrete'/g)
  const discPct = (discQ / qCount * 100).toFixed(0)

  // Skill distribution
  const s1 = countMatches(content, /scientificSkill:\s*'Skill 1'/g)
  const s2 = countMatches(content, /scientificSkill:\s*'Skill 2'/g)
  const s3 = countMatches(content, /scientificSkill:\s*'Skill 3'/g)
  const s4 = countMatches(content, /scientificSkill:\s*'Skill 4'/g)

  // Difficulty
  const easy = countMatches(content, /difficulty:\s*'easy'/g)
  const med  = countMatches(content, /difficulty:\s*'medium'/g)
  const hard = countMatches(content, /difficulty:\s*'hard'/g)

  // Quality checks
  const hasExplanation = countMatches(content, /explanation:\s*['`]/g)
  const hasWrongExpl = countMatches(content, /wrongAnswerExplanations:/g)
  const hasCorrectAns = countMatches(content, /correctAnswer:\s*'[ABCD]'/g)
  const rawMarkdown = (content.match(/\|[-]+\|/g) || []).filter(m => {
    // Only raw markdown tables, not proper tableData
    const idx = content.indexOf(m)
    const surrounding = content.slice(Math.max(0, idx-200), idx+200)
    return !surrounding.includes('tableData') && !surrounding.includes('headers:')
  }).length

  console.log(`  Count: ${qCount} | passage: ${passQ} (${(passQ/qCount*100).toFixed(0)}%) | discrete: ${discQ} (${discPct}%)`)
  console.log(`  Skills: S1=${s1}(${(s1/qCount*100).toFixed(0)}%) S2=${s2}(${(s2/qCount*100).toFixed(0)}%) S3=${s3}(${(s3/qCount*100).toFixed(0)}%) S4=${s4}(${(s4/qCount*100).toFixed(0)}%)`)
  console.log(`  Difficulty: E=${easy}(${(easy/qCount*100).toFixed(0)}%) M=${med}(${(med/qCount*100).toFixed(0)}%) H=${hard}(${(hard/qCount*100).toFixed(0)}%)`)
  console.log(`  Quality: explanations=${hasExplanation}/${qCount} | correctAnswer=${hasCorrectAns}/${qCount} | wrongExpl=${hasWrongExpl}/${qCount}`)
  if (rawMarkdown > 0) err(`${sec.label}: ${rawMarkdown} potential raw markdown table(s)`)

  // Skill warnings (same targets as form)
  if (sec.label !== 'QBank CARS') {
    if (s1/qCount > 0.40) warn(`${sec.label}: Skill 1 = ${(s1/qCount*100).toFixed(0)}% (target ~35%)`)
    if (s2/qCount < 0.35) warn(`${sec.label}: Skill 2 = ${(s2/qCount*100).toFixed(0)}% (target ~45%) — too few reasoning questions`)
    if (s4/qCount > 0.20) warn(`${sec.label}: Skill 4 = ${(s4/qCount*100).toFixed(0)}% (target ~10%) — too many data/stats questions`)
  }

  // Difficulty targets: QBank harder than exam (15-20% easy, 45-50% medium, 30-40% hard)
  if (easy/qCount > 0.22) warn(`${sec.label}: easy% = ${(easy/qCount*100).toFixed(0)}% (QBank target ≤20%)`)
  if (hard/qCount < 0.25) warn(`${sec.label}: hard% = ${(hard/qCount*100).toFixed(0)}% (QBank target ≥30%)`)

  // Discrete imbalance
  if (sec.label !== 'QBank CARS' && discQ/qCount > 0.45) warn(`${sec.label}: discrete = ${discPct}% (MCAT-style target: more passage-based)`)

  // Missing metadata
  if (hasExplanation < qCount) err(`${sec.label}: ${qCount - hasExplanation} question(s) missing explanation`)
  if (hasCorrectAns < qCount) err(`${sec.label}: ${qCount - hasCorrectAns} question(s) missing correctAnswer`)

  console.log()
}

console.log(`─── TOTAL QBank: ${totalQB} questions ───`)
console.log(`  Target: 400+ for a comprehensive QBank`)
if (totalQB < 300) warn(`QBank has only ${totalQB} questions — aim for 400+`)
else ok(`QBank total: ${totalQB} questions`)

console.log(`\n${'='.repeat(50)}`)
console.log(`QBank audit: ${errors} error(s), ${warnings} warning(s)`)
if (errors > 0) { console.error('\nAudit FAILED'); process.exit(1) }
else if (warnings > 0) console.warn('\nAudit passed with warnings')
else console.log('\nAudit PASSED ✅')
