#!/usr/bin/env node
// validate-sat-qbank-count-and-quality.mjs
// Validates the SAT Question Bank for count, distribution, and quality signals.

import { readFileSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

const RW_FILES = [
  'lib/question-bank/sat/rw-questions.ts',
  'lib/question-bank/sat/rw-questions-b1.ts',
  'lib/question-bank/sat/rw-questions-b2.ts',
  'lib/question-bank/sat/rw-questions-b3a.ts',
  'lib/question-bank/sat/rw-questions-b3b.ts',
  'lib/question-bank/sat/rw-questions-b4.ts',
]

const MATH_FILES = [
  'lib/question-bank/sat/math-questions.ts',
  'lib/question-bank/sat/math-questions-b1.ts',
  'lib/question-bank/sat/math-questions-b2.ts',
  'lib/question-bank/sat/math-questions-b3a.ts',
  'lib/question-bank/sat/math-questions-b3b.ts',
  'lib/question-bank/sat/math-questions-b4.ts',
]

// IDs to skip from aggregate files (they're re-spreads of batch files)
const AGGREGATE_RW = 'lib/question-bank/sat/rw-questions.ts'
const AGGREGATE_MATH = 'lib/question-bank/sat/math-questions.ts'

const RISKY_PHRASES = [
  'official sat',
  'college board question',
  'bluebook',
  '© college board',
  '© the college board',
  'all rights reserved',
  'from the official sat',
  'reproduced from',
]

const REQUIRED_MIN = 700

let errors = 0
let warnings = 0
const allIds = new Set()

function extractField(blockSrc, field) {
  // Template literal — handles multi-line; lazy so we stop at first unescaped backtick
  const bt = new RegExp(`${field}:\\s*\`([\\s\\S]*?)\``, 'm').exec(blockSrc)
  if (bt) return bt[1]
  // Single-quoted string — handle \' escaped apostrophes
  const sq = new RegExp(`${field}:\\s*'((?:[^'\\\\]|\\\\.)*)'`, 'm').exec(blockSrc)
  if (sq) return sq[1]
  // Double-quoted string — handle \" escaped quotes
  const dq = new RegExp(`${field}:\\s*"((?:[^"\\\\]|\\\\.)*)"`, 'm').exec(blockSrc)
  if (dq) return dq[1]
  return null
}

function parseQuestionBlocks(src) {
  const blocks = []
  // Split on id: fields to get individual questions
  const idRx = /id:\s*['"]([^'"]+)['"]/g
  let m
  const positions = []
  while ((m = idRx.exec(src)) !== null) {
    positions.push({ id: m[1], pos: m.index })
  }
  for (let i = 0; i < positions.length; i++) {
    const start = positions[i].pos
    const end = positions[i + 1]?.pos ?? src.length
    blocks.push({ id: positions[i].id, src: src.slice(start, end) })
  }
  return blocks
}

function auditFile(relPath, expectedSection) {
  const abs = resolve(root, relPath)
  if (!existsSync(abs)) {
    return []
  }
  const src = readFileSync(abs, 'utf8')
  const blocks = parseQuestionBlocks(src)

  const questions = []
  for (const { id, src: blockSrc } of blocks) {
    // Skip spread refs that just echo block IDs
    if (!id.startsWith('rw-') && !id.startsWith('math-')) continue

    const domain   = extractField(blockSrc, 'domain')
    const skill    = extractField(blockSrc, 'skill')
    const diff     = extractField(blockSrc, 'difficulty')
    const qType    = extractField(blockSrc, 'questionType')
    const question = extractField(blockSrc, 'question')
    const expl     = extractField(blockSrc, 'explanation')
    const correct  = extractField(blockSrc, 'correctAnswer')
    const teaching = extractField(blockSrc, 'teachingPoint')

    questions.push({ id, domain, skill, difficulty: diff, questionType: qType,
      question, explanation: expl, correctAnswer: correct, teachingPoint: teaching, blockSrc })
  }
  return questions
}

// ─── Collect all questions, deduplicating by file role ───────────────────────
// Aggregate files (rw-questions.ts, math-questions.ts) re-spread batch files.
// Only count each question once.

const seenIds = new Set()

function collectFrom(files, section) {
  const collected = []
  for (const f of files) {
    const isAggregate = f === AGGREGATE_RW || f === AGGREGATE_MATH
    const qs = auditFile(f, section)
    for (const q of qs) {
      if (seenIds.has(q.id)) continue
      seenIds.add(q.id)
      collected.push({ ...q, _file: f })
    }
  }
  return collected
}

const rwAll   = collectFrom(RW_FILES, 'reading-writing')
const mathAll = collectFrom(MATH_FILES, 'math')
const all     = [...rwAll, ...mathAll]

const total = all.length
const rwCount   = rwAll.length
const mathCount = mathAll.length

console.log('\n=== SAT Question Bank — Count & Quality Audit ===\n')
console.log(`Total questions:  ${total}  (target: ≥${REQUIRED_MIN})`)
console.log(`  R&W:            ${rwCount}`)
console.log(`  Math:           ${mathCount}\n`)

if (total < REQUIRED_MIN) {
  console.log(`❌ FAIL: total ${total} < ${REQUIRED_MIN} required`)
  errors++
} else {
  console.log(`✅ PASS: total ${total} ≥ ${REQUIRED_MIN}`)
}

// ─── Domain distribution ──────────────────────────────────────────────────────
const domainCounts = {}
for (const q of all) {
  domainCounts[q.domain] = (domainCounts[q.domain] || 0) + 1
}
console.log('\nDomain distribution:')
for (const [d, n] of Object.entries(domainCounts).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${d.padEnd(45)} ${n}`)
}

// ─── Difficulty distribution ──────────────────────────────────────────────────
const diffCounts = { easy: 0, medium: 0, hard: 0 }
for (const q of all) {
  if (q.difficulty === 'easy' || q.difficulty === 'medium' || q.difficulty === 'hard') {
    diffCounts[q.difficulty]++
  }
}
const pct = (n) => `${Math.round(n / total * 100)}%`
console.log('\nDifficulty distribution:')
console.log(`  Easy:   ${diffCounts.easy}  (${pct(diffCounts.easy)})`)
console.log(`  Medium: ${diffCounts.medium}  (${pct(diffCounts.medium)})`)
console.log(`  Hard:   ${diffCounts.hard}  (${pct(diffCounts.hard)})`)

// ─── Quality checks ───────────────────────────────────────────────────────────
console.log('\n--- Quality Checks ---\n')

let dupIds = 0, missingExpl = 0, missingAnswer = 0, missingMeta = 0,
    gridInMissingAccepted = 0, rawMarkdownTables = 0, riskyPhrases = 0,
    missingTeachingPoint = 0, dupStems = 0

const stemsSeen = new Set()

for (const q of all) {
  // Duplicate IDs
  if (allIds.has(q.id)) {
    console.log(`  ❌ Duplicate ID: ${q.id}`)
    dupIds++; errors++
  }
  allIds.add(q.id)

  // Duplicate stems
  const stemKey = (q.question ?? '').trim().slice(0, 80).toLowerCase()
  if (stemKey && stemsSeen.has(stemKey)) {
    // Only flag very close duplicates
    console.log(`  ⚠️  Similar question stem: "${stemKey.slice(0, 60)}"`)
    dupStems++; warnings++
  }
  if (stemKey) stemsSeen.add(stemKey)

  // Missing metadata
  if (!q.domain || !q.skill || !q.difficulty) {
    console.log(`  ❌ Missing metadata on: ${q.id}`)
    missingMeta++; errors++
  }

  // Missing explanation
  if (!q.explanation || q.explanation.trim().length < 20) {
    console.log(`  ❌ Missing/short explanation: ${q.id}`)
    missingExpl++; errors++
  }

  // Missing answer
  if (!q.correctAnswer) {
    console.log(`  ❌ Missing correctAnswer: ${q.id}`)
    missingAnswer++; errors++
  }

  // Grid-in missing acceptableAnswers
  if (q.questionType === 'grid_in') {
    const hasAccepted = q.blockSrc.includes('acceptableAnswers')
    if (!hasAccepted) {
      console.log(`  ❌ Grid-in missing acceptableAnswers: ${q.id}`)
      gridInMissingAccepted++; errors++
    }
  }

  // Missing teachingPoint
  if (!q.teachingPoint || q.teachingPoint.trim().length < 10) {
    console.log(`  ⚠️  Missing/short teachingPoint: ${q.id}`)
    missingTeachingPoint++; warnings++
  }

  // Raw markdown tables in question text
  if ((q.question ?? '').includes('|---') || (q.question ?? '').includes('| ---')) {
    console.log(`  ❌ Raw markdown table in question: ${q.id}`)
    rawMarkdownTables++; errors++
  }

  // Risky legal phrases
  const combined = [(q.question ?? ''), (q.explanation ?? ''), (q.blockSrc ?? '')].join(' ').toLowerCase()
  for (const phrase of RISKY_PHRASES) {
    if (combined.includes(phrase)) {
      console.log(`  ⚠️  Risky phrase "${phrase}" in: ${q.id}`)
      riskyPhrases++; warnings++
      break
    }
  }
}

// ─── Summary ──────────────────────────────────────────────────────────────────
console.log('\n--- Quality Summary ---')
console.log(`  Duplicate IDs:               ${dupIds}`)
console.log(`  Similar stems (approx):      ${dupStems}`)
console.log(`  Missing metadata:            ${missingMeta}`)
console.log(`  Missing explanation:         ${missingExpl}`)
console.log(`  Missing answer:              ${missingAnswer}`)
console.log(`  Grid-in missing accepted:    ${gridInMissingAccepted}`)
console.log(`  Missing teaching point:      ${missingTeachingPoint}`)
console.log(`  Raw markdown tables:         ${rawMarkdownTables}`)
console.log(`  Risky legal phrases:         ${riskyPhrases}`)

console.log(`\n${errors} error(s), ${warnings} warning(s)`)

if (total >= REQUIRED_MIN && errors === 0) {
  console.log('\n✅ VALIDATION PASSED — Question bank is ready for 700+ marketing copy\n')
} else if (total >= REQUIRED_MIN) {
  console.log(`\n⚠️  Count OK but ${errors} quality error(s) found — fix before launch\n`)
} else {
  console.log(`\n❌ VALIDATION FAILED — Need ${REQUIRED_MIN - total} more questions\n`)
}
