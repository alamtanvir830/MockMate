#!/usr/bin/env node
/**
 * Validates SAT module question ordering and difficulty distributions.
 *
 * R&W expected order:
 *   Q1–5   → Craft and Structure
 *   Q6–13  → Information and Ideas
 *   Q14–16 → Expression of Ideas
 *   Q17–27 → Standard English Conventions
 *
 * Math expected order:
 *   Q1–5   → easy
 *   Q6–15  → medium
 *   Q16–22 → hard
 *
 * Also checks:
 *   - No duplicate question IDs across all files
 *   - Total question counts (27 RW, 22 Math)
 *   - SEC questions (domain = Standard English Conventions) total 9–11 per RW module
 */

import { readFileSync } from 'fs'
import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const BASE = resolve(__dirname, '../lib/premade-exams/sat')

// ── File lists ─────────────────────────────────────────────────────────────

const RW_FILES = [
  `${BASE}/rw-module-1.ts`,
  `${BASE}/rw-module-2-easy.ts`,
  `${BASE}/rw-module-2-hard.ts`,
  ...([2, 3, 4, 5].flatMap(n => [
    `${BASE}/form-${n}-rw-module-1.ts`,
    `${BASE}/form-${n}-rw-module-2-easy.ts`,
    `${BASE}/form-${n}-rw-module-2-hard.ts`,
  ])),
]

const MATH_FILES = [
  `${BASE}/math-module-1.ts`,
  `${BASE}/math-module-2-easy.ts`,
  `${BASE}/math-module-2-hard.ts`,
  ...([2, 3, 4, 5].flatMap(n => [
    `${BASE}/form-${n}-math-module-1.ts`,
    `${BASE}/form-${n}-math-module-2-easy.ts`,
    `${BASE}/form-${n}-math-module-2-hard.ts`,
  ])),
]

// ── Parser ─────────────────────────────────────────────────────────────────

function parseBlocks(content) {
  const m = content.match(/=\s*\[/)
  if (!m) return []
  const start = content.indexOf('[', m.index)
  const blocks = []
  let depth = 0, blockStart = -1
  let inSingle = false, inDouble = false, inBacktick = false, esc = false

  for (let i = start; i < content.length; i++) {
    const ch = content[i]
    if (esc) { esc = false; continue }
    if (ch === '\\' && (inSingle || inDouble || inBacktick)) { esc = true; continue }
    if (inSingle) { if (ch === "'") inSingle = false; continue }
    if (inDouble) { if (ch === '"') inDouble = false; continue }
    if (inBacktick) { if (ch === '`') inBacktick = false; continue }
    if (ch === "'") { inSingle = true; continue }
    if (ch === '"') { inDouble = true; continue }
    if (ch === '`') { inBacktick = true; continue }
    if (ch === '{') {
      if (depth === 0) blockStart = i
      depth++
    } else if (ch === '}') {
      depth--
      if (depth === 0 && blockStart >= 0) {
        blocks.push(content.slice(blockStart, i + 1))
        blockStart = -1
      }
    }
  }
  return blocks
}

function extractField(block, field) {
  const patterns = [
    new RegExp(`${field}:\\s*\`([^\`]+)\``, 's'),
    new RegExp(`${field}:\\s*'([^']+)'`),
    new RegExp(`${field}:\\s*"([^"]+)"`),
  ]
  for (const p of patterns) {
    const m = block.match(p)
    if (m) return m[1].trim()
  }
  return null
}

function parseQuestions(filePath) {
  let content
  try { content = readFileSync(filePath, 'utf8') } catch { return null }
  const blocks = parseBlocks(content).filter(b => b.includes('id:'))
  return blocks.map(b => ({
    id: extractField(b, 'id'),
    domain: extractField(b, 'domain'),
    skill: extractField(b, 'skill'),
    difficulty: extractField(b, 'difficulty'),
  }))
}

// ── Domain ordering ────────────────────────────────────────────────────────

const RW_DOMAIN_ORDER = {
  'Craft and Structure': 0,
  'Information and Ideas': 1,
  'Expression of Ideas': 2,
  'Standard English Conventions': 3,
}

const DIFF_ORDER = { easy: 0, medium: 1, hard: 2 }

// ── Validation ─────────────────────────────────────────────────────────────

let totalErrors = 0
let totalWarnings = 0
const allIds = new Map()

function error(file, msg) {
  console.error(`  ❌ ERROR: ${msg}`)
  totalErrors++
}

function warn(file, msg) {
  console.warn(`  ⚠️  WARN: ${msg}`)
  totalWarnings++
}

function ok(msg) {
  console.log(`  ✅ ${msg}`)
}

function validateRW(filePath) {
  const name = filePath.split('/').pop()
  console.log(`\n[R&W] ${name}`)

  const qs = parseQuestions(filePath)
  if (!qs) { error(filePath, 'File not found'); return }

  // Count check
  if (qs.length !== 27) {
    error(filePath, `Expected 27 questions, found ${qs.length}`)
  } else {
    ok(`27 questions`)
  }

  // Duplicate IDs
  for (const q of qs) {
    if (!q.id) { error(filePath, `Question with missing id`); continue }
    if (allIds.has(q.id)) {
      error(filePath, `Duplicate id '${q.id}' (also in ${allIds.get(q.id)})`)
    } else {
      allIds.set(q.id, name)
    }
  }

  // Domain ordering check
  const domainSeq = qs.map(q => RW_DOMAIN_ORDER[q.domain] ?? 9)
  let lastDomain = -1
  let orderErrors = []
  for (let i = 0; i < domainSeq.length; i++) {
    if (domainSeq[i] < lastDomain) {
      orderErrors.push(`Q${i + 1} (${qs[i].domain}) comes after domain ${lastDomain}`)
    }
    lastDomain = Math.max(lastDomain, domainSeq[i])
  }
  if (orderErrors.length > 0) {
    error(filePath, `Domain order violations:\n    ${orderErrors.join('\n    ')}`)
  } else {
    ok(`Domain order correct (C&S → I&I → EoI → SEC)`)
  }

  // Zone checks: Q1-5 should be mostly C&S, Q17-27 mostly SEC
  const q1to5Domains = qs.slice(0, 5).map(q => q.domain)
  const csDomainCount = q1to5Domains.filter(d => d === 'Craft and Structure').length
  if (csDomainCount < 3) {
    warn(filePath, `Q1–5 only has ${csDomainCount}/5 Craft & Structure questions (want ≥3)`)
  } else {
    ok(`Q1–5: ${csDomainCount}/5 Craft & Structure`)
  }

  const q17to27Domains = qs.slice(16).map(q => q.domain)
  const secCount = q17to27Domains.filter(d => d === 'Standard English Conventions').length
  if (secCount < 7) {
    warn(filePath, `Q17–27 only has ${secCount}/11 SEC questions (want ≥7)`)
  } else {
    ok(`Q17–27: ${secCount}/11 SEC questions`)
  }

  // Total SEC count
  const totalSEC = qs.filter(q => q.domain === 'Standard English Conventions').length
  if (totalSEC < 9 || totalSEC > 11) {
    warn(filePath, `Total SEC questions: ${totalSEC} (expected 9–11)`)
  } else {
    ok(`SEC total: ${totalSEC} (in range 9–11)`)
  }

  // M2-Hard specific: no easy questions
  if (name.includes('module-2-hard')) {
    const easyCount = qs.filter(q => q.difficulty === 'easy').length
    const medCount = qs.filter(q => q.difficulty === 'medium').length
    if (easyCount > 0) {
      error(filePath, `M2 Hard has ${easyCount} easy question(s) — should be 0`)
    }
    if (medCount > 5) {
      warn(filePath, `M2 Hard has ${medCount} medium questions (ideally ≤5)`)
    } else {
      ok(`M2 Hard difficulty OK: 0 easy, ${medCount} medium`)
    }
  }
}

function validateMath(filePath) {
  const name = filePath.split('/').pop()
  console.log(`\n[MATH] ${name}`)

  const qs = parseQuestions(filePath)
  if (!qs) { error(filePath, 'File not found'); return }

  // Count check
  if (qs.length !== 22) {
    error(filePath, `Expected 22 questions, found ${qs.length}`)
  } else {
    ok(`22 questions`)
  }

  // Duplicate IDs
  for (const q of qs) {
    if (!q.id) { error(filePath, `Question with missing id`); continue }
    if (allIds.has(q.id)) {
      error(filePath, `Duplicate id '${q.id}' (also in ${allIds.get(q.id)})`)
    } else {
      allIds.set(q.id, name)
    }
  }

  // Difficulty ordering check
  const diffSeq = qs.map(q => DIFF_ORDER[q.difficulty] ?? 1)
  let lastDiff = -1
  let orderErrors = []
  for (let i = 0; i < diffSeq.length; i++) {
    if (diffSeq[i] < lastDiff) {
      orderErrors.push(`Q${i + 1} (${qs[i].difficulty}) comes after difficulty ${lastDiff}`)
    }
    lastDiff = Math.max(lastDiff, diffSeq[i])
  }
  if (orderErrors.length > 0) {
    error(filePath, `Difficulty order violations:\n    ${orderErrors.join('\n    ')}`)
  } else {
    ok(`Difficulty order correct (easy → medium → hard)`)
  }

  // Zone checks for M1 (routing module)
  if (name.includes('module-1')) {
    const q1to5Diffs = qs.slice(0, 5).map(q => q.difficulty)
    const easyInFirstFive = q1to5Diffs.filter(d => d === 'easy').length
    if (easyInFirstFive < 3) {
      warn(filePath, `Q1–5 only has ${easyInFirstFive} easy questions (want ≥3 for soft start)`)
    } else {
      ok(`Q1–5: ${easyInFirstFive} easy questions`)
    }

    const q16to22Diffs = qs.slice(15).map(q => q.difficulty)
    const hardInLast7 = q16to22Diffs.filter(d => d === 'hard').length
    if (hardInLast7 < 4) {
      warn(filePath, `Q16–22 only has ${hardInLast7} hard questions (want ≥4)`)
    } else {
      ok(`Q16–22: ${hardInLast7} hard questions`)
    }
  }

  // M2-Hard specific: no easy questions
  if (name.includes('module-2-hard')) {
    const easyCount = qs.filter(q => q.difficulty === 'easy').length
    const medCount = qs.filter(q => q.difficulty === 'medium').length
    if (easyCount > 0) {
      error(filePath, `M2 Hard has ${easyCount} easy question(s) — should be 0`)
    }
    if (medCount > 3) {
      warn(filePath, `M2 Hard has ${medCount} medium questions (ideally ≤3)`)
    } else {
      ok(`M2 Hard difficulty OK: 0 easy, ${medCount} medium`)
    }
  }
}

// ── Main ───────────────────────────────────────────────────────────────────

console.log('=== SAT Form Order & Difficulty Validator ===\n')

for (const f of RW_FILES) validateRW(f)
for (const f of MATH_FILES) validateMath(f)

console.log('\n' + '='.repeat(50))
console.log(`Total: ${totalErrors} error(s), ${totalWarnings} warning(s)`)

if (totalErrors > 0) {
  console.error('\nValidation FAILED')
  process.exit(1)
} else if (totalWarnings > 0) {
  console.warn('\nValidation passed with warnings')
  process.exit(0)
} else {
  console.log('\nValidation PASSED ✅')
  process.exit(0)
}
