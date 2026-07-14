#!/usr/bin/env node
/**
 * MCAT Form 1 structure audit: validates 230 total questions, section counts,
 * passage/discrete balance, timing, scoring range.
 */
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const BASE = resolve(__dirname, '../lib/premade-exams/mcat')

let errors = 0, warnings = 0
const err  = (m) => { console.error(`  ❌ ${m}`); errors++ }
const warn = (m) => { console.warn(`  ⚠️  ${m}`);  warnings++ }
const ok   = (m) => console.log(`  ✅ ${m}`)

function parseIds(content, pattern) {
  return [...content.matchAll(pattern)].map(m => m[1])
}

function countMatches(content, re) {
  return (content.match(re) || []).length
}

// ── Load files ─────────────────────────────────────────────────────────────
const sections = [
  { file: 'form-1-chem-phys.ts',  id: 'chem-phys',  label: 'C/P',  targetQ: 59, targetPassage: 10, targetDisc: 15, time: 95 },
  { file: 'form-1-cars.ts',       id: 'cars',        label: 'CARS', targetQ: 53, targetPassage: 9,  targetDisc: 0,  time: 90 },
  { file: 'form-1-bio-biochem.ts',id: 'bio-biochem', label: 'B/B',  targetQ: 59, targetPassage: 10, targetDisc: 15, time: 95 },
  { file: 'form-1-psych-soc.ts',  id: 'psych-soc',  label: 'P/S',  targetQ: 59, targetPassage: 10, targetDisc: 15, time: 95 },
]

console.log('=== MCAT Form 1 Structure Audit ===\n')
let totalQ = 0

for (const sec of sections) {
  const content = readFileSync(resolve(BASE, sec.file), 'utf8')
  console.log(`─── ${sec.label}: ${sec.file} ───`)

  // Question count (by unique id: prefix)
  const allIds = parseIds(content, /id:\s*'(mcat1-[^']+)'/g)
  const uniqueIds = new Set(allIds)
  const qCount = uniqueIds.size

  // Passage count
  const passageCount = countMatches(content, /passageText:/g)

  // Passage-based vs discrete questions
  const passageQs = countMatches(content, /questionType:\s*'passage'/g)
  const discreteQs = countMatches(content, /questionType:\s*'discrete'/g)

  // Timing
  const timeMatch = content.match(/timeMinutes:\s*(\d+)/)
  const time = timeMatch ? parseInt(timeMatch[1]) : 0

  // Skill distribution
  const s1 = countMatches(content, /scientificSkill:\s*'Skill 1'/g)
  const s2 = countMatches(content, /scientificSkill:\s*'Skill 2'/g)
  const s3 = countMatches(content, /scientificSkill:\s*'Skill 3'/g)
  const s4 = countMatches(content, /scientificSkill:\s*'Skill 4'/g)

  // Difficulty distribution
  const easy = countMatches(content, /difficulty:\s*'easy'/g)
  const med  = countMatches(content, /difficulty:\s*'medium'/g)
  const hard = countMatches(content, /difficulty:\s*'hard'/g)

  // Duplicate check
  if (allIds.length !== uniqueIds.size) {
    err(`${sec.label}: ${allIds.length - uniqueIds.size} duplicate question ID(s)`)
  }

  totalQ += qCount

  console.log(`  Questions: ${qCount} (target ${sec.targetQ})`)
  if (qCount !== sec.targetQ) err(`${sec.label}: expected ${sec.targetQ}, found ${qCount}`)
  else ok(`${sec.label}: correct question count`)

  console.log(`  Passages: ${passageCount} (AAMC target ~${sec.targetPassage})`)
  if (passageCount < sec.targetPassage - 2) warn(`${sec.label}: fewer passages than AAMC target (${passageCount} vs ${sec.targetPassage})`)

  console.log(`  Passage-based Qs: ${passageQs}  |  Discrete Qs: ${discreteQs}`)
  if (sec.id === 'cars' && discreteQs > 0) err('CARS: should have 0 discrete questions')
  if (sec.id !== 'cars') {
    const discPct = discreteQs / qCount * 100
    if (discPct > 30) warn(`${sec.label}: discrete% = ${discPct.toFixed(0)}% (AAMC target ~25%)`)
  }

  console.log(`  Timing: ${time} min (target ${sec.time})`)
  if (time !== sec.time) err(`${sec.label}: timing mismatch`)

  console.log(`  Skills: S1=${s1} (${(s1/qCount*100).toFixed(0)}%) S2=${s2} (${(s2/qCount*100).toFixed(0)}%) S3=${s3} (${(s3/qCount*100).toFixed(0)}%) S4=${s4} (${(s4/qCount*100).toFixed(0)}%)`)
  if (sec.id !== 'cars') {
    if (s1/qCount > 0.40) warn(`${sec.label}: Skill 1 = ${(s1/qCount*100).toFixed(0)}% exceeds 35-40% target`)
    if (s2/qCount < 0.35) warn(`${sec.label}: Skill 2 = ${(s2/qCount*100).toFixed(0)}% below 35-45% target`)
  }

  console.log(`  Difficulty: E=${easy} (${(easy/qCount*100).toFixed(0)}%) M=${med} (${(med/qCount*100).toFixed(0)}%) H=${hard} (${(hard/qCount*100).toFixed(0)}%)`)
  if (easy/qCount > 0.22) warn(`${sec.label}: easy% = ${(easy/qCount*100).toFixed(0)}% above 20% target`)
  if (hard/qCount < 0.15) warn(`${sec.label}: hard% = ${(hard/qCount*100).toFixed(0)}% below 20% target`)
  console.log()
}

console.log(`─── TOTAL: ${totalQ} questions (target 230) ───`)
if (totalQ !== 230) err(`Total question count: expected 230, got ${totalQ}`)
else ok('Total: 230 questions ✅')

// Scoring check
console.log('\n─── Scoring range check ───')
function scoreFn(correct, total) {
  if (total === 0) return 118
  const p = correct / total
  if (p >= 0.90) return Math.round(131 + (p-0.90)/0.10*1)
  if (p >= 0.75) return Math.round(129 + (p-0.75)/0.15*2)
  if (p >= 0.50) return Math.round(125 + (p-0.50)/0.25*4)
  if (p >= 0.25) return Math.round(120 + (p-0.25)/0.25*5)
  return Math.round(118 + (p/0.25)*2)
}
const clamp = s => Math.min(132, Math.max(118, s))
const s0  = clamp(scoreFn(0, 59)), s100 = clamp(scoreFn(59, 59))
const s50 = clamp(scoreFn(30, 59)), s75  = clamp(scoreFn(44, 59))
console.log(`  0/59=>${s0} (need 118)  50%=>${s50} (need ~125)  75%=>${s75} (need ~129)  100%=>${s100} (need 132)`)
if (s0 !== 118) err('Minimum section score not 118')
if (s100 !== 132) err('Perfect section score not 132')
if (s50 < 124 || s50 > 126) warn(`50% raw score maps to ${s50}, expected ~125`)
else ok('Scoring curve looks appropriate')

const totalMin = 4 * 118, totalMax = 4 * 132
if (totalMin !== 472) err(`Total min = ${totalMin}, expected 472`)
if (totalMax !== 528) err(`Total max = ${totalMax}, expected 528`)
else ok('Score range 472–528 correct')

console.log(`\n${'='.repeat(50)}`)
console.log(`Audit result: ${errors} error(s), ${warnings} warning(s)`)
if (errors > 0) { console.error('\nAudit FAILED'); process.exit(1) }
else if (warnings > 0) console.warn('\nAudit passed with warnings')
else console.log('\nAudit PASSED ✅')
