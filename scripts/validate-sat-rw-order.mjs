#!/usr/bin/env node
/**
 * Validates SAT R&W module question ordering against the target realistic sequence:
 *
 *  Q1–4   Words in Context
 *  Q5–9   Text Structure and Purpose | Cross-Text Connections | Central Ideas and Details
 *  Q10–13 Command of Evidence (textual or quantitative)
 *  Q14    Inferences
 *  Q15    Inferences | Boundaries | Form, Structure, and Sense
 *  Q16–20 Boundaries | Form, Structure, and Sense
 *  Q21    Boundaries | Form, Structure, and Sense | Transitions
 *  Q22–24 Transitions
 *  Q25    Transitions | Rhetorical Synthesis
 *  Q26–27 Rhetorical Synthesis
 */

import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const BASE = resolve(__dirname, '../lib/premade-exams/sat')

// ── Allowed skills per position ───────────────────────────────────────────────

const ZONE_RULES = [
  // [startQ, endQ, allowed skills (any of)]
  [1,  4,  ['Words in Context']],
  [5,  9,  ['Text Structure and Purpose', 'Cross-Text Connections', 'Central Ideas and Details']],
  [10, 13, ['Command of Evidence']],
  [14, 14, ['Inferences']],
  [15, 15, ['Inferences', 'Boundaries', 'Form, Structure, and Sense']],
  [16, 20, ['Boundaries', 'Form, Structure, and Sense']],
  [21, 21, ['Boundaries', 'Form, Structure, and Sense', 'Transitions']],
  [22, 24, ['Transitions']],
  [25, 25, ['Transitions', 'Rhetorical Synthesis']],
  [26, 27, ['Rhetorical Synthesis']],
]

// Build a per-position lookup
const ALLOWED = new Map()
for (const [start, end, skills] of ZONE_RULES) {
  for (let q = start; q <= end; q++) {
    ALLOWED.set(q, skills)
  }
}

// ── Parser ────────────────────────────────────────────────────────────────────

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
    .filter(b => b.includes("id:") && b.includes("skill:"))
    .map(b => ({
      id: field(b, 'id'),
      skill: field(b, 'skill'),
      domain: field(b, 'domain'),
      difficulty: field(b, 'difficulty'),
      hasChoices: b.includes('choices:') || b.includes('correctAnswer:'),
      hasExplanation: b.includes('explanation:'),
    }))
}

// ── File lists ────────────────────────────────────────────────────────────────

const FORMS = [
  { form: 1, files: [
    ['R&W Module 1',      `${BASE}/rw-module-1.ts`],
    ['R&W Module 2 Easy', `${BASE}/rw-module-2-easy.ts`],
    ['R&W Module 2 Hard', `${BASE}/rw-module-2-hard.ts`],
  ]},
  ...([2, 3, 4, 5].map(n => ({
    form: n, files: [
      [`R&W Module 1`,      `${BASE}/form-${n}-rw-module-1.ts`],
      [`R&W Module 2 Easy`, `${BASE}/form-${n}-rw-module-2-easy.ts`],
      [`R&W Module 2 Hard`, `${BASE}/form-${n}-rw-module-2-hard.ts`],
    ],
  }))),
]

// ── Validation ────────────────────────────────────────────────────────────────

let totalErrors = 0
let totalWarnings = 0
const allIds = new Map()

function err(label, msg) { console.error(`    ❌ ERROR: ${msg}`); totalErrors++ }
function warn(label, msg) { console.warn(`    ⚠️  WARN: ${msg}`); totalWarnings++ }
function ok(msg) { console.log(`    ✅ ${msg}`) }

function validate(formNum, label, filePath) {
  const shortPath = filePath.split('/').pop()
  console.log(`\n  [Form ${formNum}] ${label} (${shortPath})`)

  const qs = parseQuestions(filePath)
  if (!qs) { err(label, 'File not found'); return }

  // Count check
  if (qs.length !== 27) {
    err(label, `Expected 27 questions, found ${qs.length}`)
  } else {
    ok(`27 questions`)
  }

  // Duplicate IDs
  let hasDupId = false
  for (const q of qs) {
    if (!q.id) { err(label, `Missing id`); hasDupId = true; continue }
    if (allIds.has(q.id)) {
      err(label, `Duplicate id '${q.id}' (also in ${allIds.get(q.id)})`)
      hasDupId = true
    } else {
      allIds.set(q.id, shortPath)
    }
  }
  if (!hasDupId) ok(`No duplicate IDs`)

  // Metadata completeness
  let missingMeta = 0
  for (const q of qs) {
    if (!q.hasChoices) { err(label, `Q id=${q.id} missing choices/correctAnswer`); missingMeta++ }
    if (!q.hasExplanation) { err(label, `Q id=${q.id} missing explanation`); missingMeta++ }
    if (!q.domain) { err(label, `Q id=${q.id} missing domain`); missingMeta++ }
    if (!q.skill) { err(label, `Q id=${q.id} missing skill`); missingMeta++ }
  }
  if (missingMeta === 0) ok(`All questions have required metadata`)

  // Per-question zone check
  const zoneErrors = []
  for (let i = 0; i < qs.length; i++) {
    const pos = i + 1
    const allowed = ALLOWED.get(pos)
    if (!allowed) continue
    const skill = qs[i].skill || '(unknown)'
    if (!allowed.includes(skill)) {
      zoneErrors.push({ pos, id: qs[i].id, expected: allowed.join(' | '), actual: skill })
    }
  }

  if (zoneErrors.length === 0) {
    ok(`All 27 questions in correct zone`)
  } else {
    for (const e of zoneErrors) {
      err(label, `Q${e.pos} (${e.id}): expected [${e.expected}], got "${e.actual}"`)
    }
  }

  // Skill count sanity checks
  const counts = {}
  for (const q of qs) {
    counts[q.skill] = (counts[q.skill] || 0) + 1
  }

  const wic = counts['Words in Context'] || 0
  if (wic < 4) warn(label, `Only ${wic} Words in Context questions (need ≥4 for Q1–4)`)

  const trans = counts['Transitions'] || 0
  if (trans < 3) warn(label, `Only ${trans} Transitions questions (need ≥3 for Q22–24)`)

  const rs = counts['Rhetorical Synthesis'] || 0
  if (rs < 2) warn(label, `Only ${rs} Rhetorical Synthesis questions (need ≥2 for Q26–27)`)
}

// ── Main ──────────────────────────────────────────────────────────────────────

console.log('=== SAT R&W Order Validator ===\n')
console.log('Target sequence:')
console.log('  Q1–4:   Words in Context')
console.log('  Q5–9:   Text Structure | Cross-Text Connections | Central Ideas and Details')
console.log('  Q10–13: Command of Evidence')
console.log('  Q14:    Inferences')
console.log('  Q15:    Inferences | Boundaries | Form, Structure, and Sense')
console.log('  Q16–20: Boundaries | Form, Structure, and Sense')
console.log('  Q21:    Boundaries | Form, Structure, and Sense | Transitions')
console.log('  Q22–24: Transitions')
console.log('  Q25:    Transitions | Rhetorical Synthesis')
console.log('  Q26–27: Rhetorical Synthesis\n')

for (const { form, files } of FORMS) {
  console.log(`\n${'─'.repeat(60)}`)
  console.log(`Form ${form}`)
  for (const [label, path] of files) {
    validate(form, label, path)
  }
}

console.log('\n' + '='.repeat(60))
console.log(`Total: ${totalErrors} error(s), ${totalWarnings} warning(s)`)

if (totalErrors > 0) {
  console.error('\nValidation FAILED')
  process.exit(1)
} else if (totalWarnings > 0) {
  console.warn('\nValidation passed with warnings')
} else {
  console.log('\nValidation PASSED ✅')
}
process.exit(totalErrors > 0 ? 1 : 0)
