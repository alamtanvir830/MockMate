#!/usr/bin/env node
/**
 * MCAT question quality audit: checks for duplicate IDs, missing metadata,
 * answer completeness, raw markdown, and copyrighted-source references.
 */
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const FBASE = resolve(__dirname, '../lib/premade-exams/mcat')
const QBASE = resolve(__dirname, '../lib/question-bank/mcat')

let errors = 0, warnings = 0
const err  = (m) => { console.error(`  ❌ ${m}`); errors++ }
const warn = (m) => { console.warn(`  ⚠️  ${m}`); warnings++ }
const ok   = (m) => console.log(`  ✅ ${m}`)

const allIds = new Map()

const files = [
  { path: resolve(FBASE, 'form-1-chem-phys.ts'),  label: 'F1 C/P',   idPat: /id:\s*'(mcat1-cp-\d+)'/g },
  { path: resolve(FBASE, 'form-1-cars.ts'),        label: 'F1 CARS',  idPat: /id:\s*'(mcat1-cars-\d+)'/g },
  { path: resolve(FBASE, 'form-1-bio-biochem.ts'), label: 'F1 B/B',   idPat: /id:\s*'(mcat1-bb-\d+)'/g },
  { path: resolve(FBASE, 'form-1-psych-soc.ts'),   label: 'F1 P/S',   idPat: /id:\s*'(mcat1-ps-\d+)'/g },
  { path: resolve(QBASE, 'chem-phys.ts'),          label: 'QB C/P',   idPat: /id:\s*'(mcat-qb-cp-\d+)'/g },
  { path: resolve(QBASE, 'cars.ts'),               label: 'QB CARS',  idPat: /id:\s*'(mcat-qb-cars-\d+)'/g },
  { path: resolve(QBASE, 'bio-biochem.ts'),         label: 'QB B/B',   idPat: /id:\s*'(mcat-qb-bb-\d+)'/g },
  { path: resolve(QBASE, 'psych-soc.ts'),           label: 'QB P/S',   idPat: /id:\s*'(mcat-qb-ps-\d+)'/g },
]

// Copyright risk words
const COPYRIGHT_RISKS = [
  /AAMC official/i, /from the official/i, /aamc\.org/i,
  /UWorld/i, /Jack Westin/i, /Kaplan MCAT/i, /Blueprint MCAT/i, /Princeton Review MCAT/i,
  /adapted from.*official/i
]

console.log('=== MCAT Question Quality Audit ===\n')

for (const f of files) {
  const content = readFileSync(f.path, 'utf8')
  console.log(`─── ${f.label} ───`)

  // Duplicate IDs
  const ids = [...content.matchAll(f.idPat)].map(m => m[1])
  let dupCount = 0
  for (const id of ids) {
    if (allIds.has(id)) {
      err(`Duplicate ID: '${id}' (also in ${allIds.get(id)})`)
      dupCount++
    } else {
      allIds.set(id, f.label)
    }
  }
  if (dupCount === 0) ok(`No duplicate IDs (${ids.length} questions)`)

  // Missing answer key
  const answerCount = (content.match(/correctAnswer:\s*'[ABCD]'/g) || []).length
  if (answerCount < ids.length) err(`${ids.length - answerCount} question(s) missing correctAnswer`)

  // Missing explanation
  const explCount = (content.match(/explanation:/g) || []).length
  if (explCount < ids.length) err(`${ids.length - explCount} question(s) missing explanation`)

  // Missing teaching point
  const teachCount = (content.match(/teachingPoint:/g) || []).length
  if (teachCount < ids.length * 0.5) warn(`Only ${teachCount}/${ids.length} questions have teachingPoint`)

  // Raw markdown tables (not in tableData)
  const rawMD = [...content.matchAll(/\|[\s-]+\|/g)]
  let rawMDCount = 0
  for (const m of rawMD) {
    const idx = content.indexOf(m[0])
    const ctx = content.slice(Math.max(0, idx - 300), idx + 100)
    if (!ctx.includes('tableData') && !ctx.includes('headers:') && !ctx.includes('passageText') && !ctx.includes('stimulus')) {
      rawMDCount++
    }
  }
  if (rawMDCount > 0) err(`${rawMDCount} potential raw markdown table(s) outside tableData`)
  else ok('No raw markdown tables')

  // Copyright risk scan
  let riskCount = 0
  for (const re of COPYRIGHT_RISKS) {
    const matches = content.match(re)
    if (matches) {
      warn(`Possible copyright risk: "${matches[0]}"`)
      riskCount++
    }
  }
  if (riskCount === 0) ok('No copyright risk phrases found')

  // Check valid answer distribution (not all A or all B)
  const aCount = (content.match(/correctAnswer:\s*'A'/g) || []).length
  const bCount = (content.match(/correctAnswer:\s*'B'/g) || []).length
  const cCount = (content.match(/correctAnswer:\s*'C'/g) || []).length
  const dCount = (content.match(/correctAnswer:\s*'D'/g) || []).length
  const total = aCount + bCount + cCount + dCount
  const maxPct = Math.max(aCount, bCount, cCount, dCount) / total
  if (maxPct > 0.40) warn(`Answer key skewed: A=${aCount} B=${bCount} C=${cCount} D=${dCount} (one option >40%)`)
  else ok(`Answer key distribution OK: A=${aCount} B=${bCount} C=${cCount} D=${dCount}`)

  console.log()
}

console.log(`${'='.repeat(50)}`)
console.log(`Quality audit: ${errors} error(s), ${warnings} warning(s)`)
if (errors > 0) { console.error('\nAudit FAILED'); process.exit(1) }
else if (warnings > 0) console.warn('\nAudit passed with warnings')
else console.log('\nAudit PASSED ✅')
