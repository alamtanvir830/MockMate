#!/usr/bin/env node
/**
 * Validates SAT Math Module 1 difficulty across Forms 1–5.
 *
 * Checks:
 *   - 22 questions per module
 *   - Difficulty distribution (Easy ≤3, Hard 5–7)
 *   - Domain balance (Algebra 6–7, AdvMath 6–7, PSDA 4–5, Geo 4–5)
 *   - Average difficulty: M1 > M2E and M1 < M2H
 *   - No duplicate IDs across all files
 *   - All questions have correctAnswer and explanation
 *   - Grid-ins have acceptableAnswers
 */

import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const BASE = resolve(__dirname, '../lib/premade-exams/sat')

const DIFF_SCORE = { easy: 1, medium: 2, hard: 3 }

// ── Parser ─────────────────────────────────────────────────────────────────

function parseBlocks(content) {
  const m = content.match(/=\s*\[/)
  if (!m) return []
  const start = content.indexOf('[', m.index)
  const blocks = []
  let depth = 0, bs = -1
  let inS = false, inD = false, inB = false, esc = false
  for (let i = start; i < content.length; i++) {
    const ch = content[i]
    if (esc) { esc = false; continue }
    if (ch === '\\' && (inS || inD || inB)) { esc = true; continue }
    if (inS) { if (ch === "'") inS = false; continue }
    if (inD) { if (ch === '"') inD = false; continue }
    if (inB) { if (ch === '`') inB = false; continue }
    if (ch === "'") { inS = true; continue }
    if (ch === '"') { inD = true; continue }
    if (ch === '`') { inB = true; continue }
    if (ch === '{') { if (depth === 0) bs = i; depth++ }
    else if (ch === '}') {
      depth--
      if (depth === 0 && bs >= 0) { blocks.push(content.slice(bs, i + 1)); bs = -1 }
    }
  }
  return blocks
}

function field(block, name) {
  for (const re of [
    new RegExp(`${name}:\\s*\`([^\`]+)\``, 's'),
    new RegExp(`${name}:\\s*'([^']+)'`),
    new RegExp(`${name}:\\s*"([^"]+)"`),
  ]) {
    const m = block.match(re)
    if (m) return m[1].trim()
  }
  return null
}

function parseQuestions(filePath) {
  let content
  try { content = readFileSync(filePath, 'utf8') } catch { return null }
  return parseBlocks(content)
    .filter(b => b.includes("id:") && (b.includes("difficulty:") || b.includes("domain:")))
    .map(b => ({
      id: field(b, 'id'),
      domain: field(b, 'domain'),
      skill: field(b, 'skill'),
      difficulty: field(b, 'difficulty'),
      type: field(b, 'type'),
      hasCorrectAnswer: b.includes('correctAnswer:'),
      hasExplanation: b.includes('explanation:'),
      hasAcceptableAnswers: b.includes('acceptableAnswers:') || b.includes('acceptedAnswers:'),
      hasMarkdownTable: /\|\s*[-]+\s*\|/.test(b),
    }))
}

// ── Module file lists ──────────────────────────────────────────────────────

const FORMS = [1, 2, 3, 4, 5]

function m1Path(n)  { return n === 1 ? `${BASE}/math-module-1.ts`        : `${BASE}/form-${n}-math-module-1.ts` }
function m2ePath(n) { return n === 1 ? `${BASE}/math-module-2-easy.ts`   : `${BASE}/form-${n}-math-module-2-easy.ts` }
function m2hPath(n) { return n === 1 ? `${BASE}/math-module-2-hard.ts`   : `${BASE}/form-${n}-math-module-2-hard.ts` }

// ── Helpers ────────────────────────────────────────────────────────────────

function avgDiff(qs) {
  if (!qs || qs.length === 0) return 0
  const sum = qs.reduce((s, q) => s + (DIFF_SCORE[q.difficulty] ?? 2), 0)
  return sum / qs.length
}

function counts(qs, key) {
  const c = {}
  for (const q of qs) { const v = q[key] || '?'; c[v] = (c[v] || 0) + 1 }
  return c
}

// ── Validation ─────────────────────────────────────────────────────────────

let totalErrors = 0
let totalWarnings = 0
const allIds = new Map()

function err(msg)  { console.error(`    ❌ ERROR: ${msg}`); totalErrors++ }
function warn(msg) { console.warn(`    ⚠️  WARN: ${msg}`); totalWarnings++ }
function ok(msg)   { console.log(`    ✅ ${msg}`) }

function validateForm(n) {
  const label = `Form ${n} Math M1`
  const shortPath = m1Path(n).split('/').pop()
  console.log(`\n  [${label}] (${shortPath})`)

  const m1  = parseQuestions(m1Path(n))
  const m2e = parseQuestions(m2ePath(n))
  const m2h = parseQuestions(m2hPath(n))

  if (!m1) { err('M1 file not found'); return }

  // ── Count ──────────────────────────────────────────────────────────────
  if (m1.length !== 22) {
    err(`Expected 22 questions, found ${m1.length}`)
  } else {
    ok(`22 questions`)
  }

  // ── Duplicates ─────────────────────────────────────────────────────────
  let hasDup = false
  for (const q of m1) {
    if (!q.id) { err(`Question missing id`); hasDup = true; continue }
    if (allIds.has(q.id)) {
      err(`Duplicate id '${q.id}' (also in ${allIds.get(q.id)})`)
      hasDup = true
    } else {
      allIds.set(q.id, shortPath)
    }
  }
  if (!hasDup) ok(`No duplicate IDs`)

  // ── Metadata completeness ──────────────────────────────────────────────
  let missingMeta = 0
  for (const q of m1) {
    if (!q.hasCorrectAnswer) { err(`id=${q.id} missing correctAnswer`); missingMeta++ }
    if (!q.hasExplanation)   { err(`id=${q.id} missing explanation`); missingMeta++ }
    if (q.type === 'grid_in' && !q.hasAcceptableAnswers) {
      err(`id=${q.id} is grid_in but missing acceptableAnswers`)
      missingMeta++
    }
    if (q.hasMarkdownTable) {
      warn(`id=${q.id} may contain a raw markdown table`)
    }
  }
  if (missingMeta === 0) ok(`All metadata present`)

  // ── Difficulty distribution ────────────────────────────────────────────
  const diffCounts = counts(m1, 'difficulty')
  const easy   = diffCounts.easy   || 0
  const medium = diffCounts.medium || 0
  const hard   = diffCounts.hard   || 0
  console.log(`    📊 Difficulty: ${easy}E / ${medium}M / ${hard}H`)

  if (easy > 3)  err(`Too many easy questions: ${easy} (max 3)`)
  if (hard < 5)  err(`Too few hard questions: ${hard} (need ≥5)`)
  if (hard > 7)  warn(`Many hard questions: ${hard} (target 5–7)`)
  if (easy <= 3 && hard >= 5 && hard <= 7) ok(`Difficulty distribution in target range`)

  // ── Domain distribution ────────────────────────────────────────────────
  const domCounts = counts(m1, 'domain')
  const alg = domCounts['Algebra'] || 0
  const adv = domCounts['Advanced Math'] || 0
  const psd = domCounts['Problem-Solving and Data Analysis'] || 0
  const geo = domCounts['Geometry and Trigonometry'] || 0
  console.log(`    📊 Domains: Algebra=${alg} AdvMath=${adv} PSDA=${psd} Geo=${geo}`)

  if (alg < 5 || alg > 8)  warn(`Algebra count ${alg} outside 5–8 range`)
  if (adv < 5 || adv > 8)  warn(`Advanced Math count ${adv} outside 5–8 range`)
  if (psd < 3)              warn(`PSDA count ${psd} low (target ≥3)`)
  if (geo < 3)              warn(`Geometry count ${geo} low (target ≥3)`)
  const dominated = Math.max(alg, adv, psd, geo)
  if (dominated > 10)       warn(`One domain dominates with ${dominated} questions`)
  if (alg >= 5 && adv >= 5 && psd >= 3 && geo >= 3) ok(`Domain distribution balanced`)

  // ── Average difficulty comparison ──────────────────────────────────────
  const avgM1  = avgDiff(m1)
  const avgM2E = avgDiff(m2e)
  const avgM2H = avgDiff(m2h)
  console.log(`    📊 Avg difficulty: M2E=${avgM2E.toFixed(2)}  M1=${avgM1.toFixed(2)}  M2H=${avgM2H.toFixed(2)}`)

  if (m2e && avgM1 <= avgM2E) err(`M1 avg (${avgM1.toFixed(2)}) is ≤ M2E avg (${avgM2E.toFixed(2)})`)
  if (m2h && avgM1 >= avgM2H) err(`M1 avg (${avgM1.toFixed(2)}) is ≥ M2H avg (${avgM2H.toFixed(2)})`)
  if (m2e && m2h && avgM1 > avgM2E && avgM1 < avgM2H) ok(`M1 difficulty correctly between M2E and M2H`)
}

// ── Main ───────────────────────────────────────────────────────────────────

console.log('=== SAT Math Module 1 Difficulty Validator ===\n')
console.log('Target: Easy ≤3 | Hard 5–7 | M2E < M1 < M2H\n')

for (const n of FORMS) {
  console.log(`${'─'.repeat(60)}`)
  validateForm(n)
}

console.log('\n' + '='.repeat(60))
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
