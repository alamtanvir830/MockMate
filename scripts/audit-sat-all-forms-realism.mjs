#!/usr/bin/env node
// audit-sat-all-forms-realism.mjs
// Checks all SAT Forms 1–5 for structure, domain balance, difficulty, and metadata integrity.

import { createRequire } from 'module'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { existsSync } from 'fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

// ─── Dynamic import helper ────────────────────────────────────────────────────
async function loadModule(rel) {
  const abs = resolve(root, rel)
  if (!existsSync(abs)) return null
  try {
    // Strip TypeScript — use ts-node or require trick won't work; use direct eval approach
    // We'll use a regex-based parser to extract question arrays from TS files
    const { readFileSync } = await import('fs')
    return readFileSync(abs, 'utf8')
  } catch { return null }
}

// ─── Parse question arrays from TS source ─────────────────────────────────────
function parseQuestions(src) {
  const questions = []
  // Match individual question objects by id field
  const idMatches = [...src.matchAll(/id:\s*['"]([^'"]+)['"]/g)]
  const domainMatches = [...src.matchAll(/domain:\s*['"]([^'"]+)['"]/g)]
  const skillMatches = [...src.matchAll(/skill:\s*['"]([^'"]+)['"]/g)]
  const diffMatches = [...src.matchAll(/difficulty:\s*['"]([^'"]+)['"]/g)]
  const sectionMatches = [...src.matchAll(/section:\s*['"]([^'"]+)['"]/g)]
  const typeMatches = [...src.matchAll(/type:\s*['"]([^'"]+)['"]/g)]
  const correctMatches = [...src.matchAll(/correctAnswer:\s*['"]([^'"]+)['"]/g)]

  for (let i = 0; i < idMatches.length; i++) {
    questions.push({
      id: idMatches[i]?.[1] ?? '?',
      domain: domainMatches[i]?.[1] ?? '?',
      skill: skillMatches[i]?.[1] ?? '?',
      difficulty: diffMatches[i]?.[1] ?? '?',
      section: sectionMatches[i]?.[1] ?? '?',
      type: typeMatches[i]?.[1] ?? 'multiple_choice',
      correctAnswer: correctMatches[i]?.[1] ?? '?',
    })
  }
  return questions
}

// ─── Module file map ──────────────────────────────────────────────────────────
const FORMS = {
  'Form 1': {
    'rw-m1':    'lib/premade-exams/sat/rw-module-1.ts',
    'rw-m2e':   'lib/premade-exams/sat/rw-module-2-easy.ts',
    'rw-m2h':   'lib/premade-exams/sat/rw-module-2-hard.ts',
    'math-m1':  'lib/premade-exams/sat/math-module-1.ts',
    'math-m2e': 'lib/premade-exams/sat/math-module-2-easy.ts',
    'math-m2h': 'lib/premade-exams/sat/math-module-2-hard.ts',
  },
  'Form 2': {
    'rw-m1':    'lib/premade-exams/sat/form-2-rw-module-1.ts',
    'rw-m2e':   'lib/premade-exams/sat/form-2-rw-module-2-easy.ts',
    'rw-m2h':   'lib/premade-exams/sat/form-2-rw-module-2-hard.ts',
    'math-m1':  'lib/premade-exams/sat/form-2-math-module-1.ts',
    'math-m2e': 'lib/premade-exams/sat/form-2-math-module-2-easy.ts',
    'math-m2h': 'lib/premade-exams/sat/form-2-math-module-2-hard.ts',
  },
  'Form 3': {
    'rw-m1':    'lib/premade-exams/sat/form-3-rw-module-1.ts',
    'rw-m2e':   'lib/premade-exams/sat/form-3-rw-module-2-easy.ts',
    'rw-m2h':   'lib/premade-exams/sat/form-3-rw-module-2-hard.ts',
    'math-m1':  'lib/premade-exams/sat/form-3-math-module-1.ts',
    'math-m2e': 'lib/premade-exams/sat/form-3-math-module-2-easy.ts',
    'math-m2h': 'lib/premade-exams/sat/form-3-math-module-2-hard.ts',
  },
  'Form 4': {
    'rw-m1':    'lib/premade-exams/sat/form-4-rw-module-1.ts',
    'rw-m2e':   'lib/premade-exams/sat/form-4-rw-module-2-easy.ts',
    'rw-m2h':   'lib/premade-exams/sat/form-4-rw-module-2-hard.ts',
    'math-m1':  'lib/premade-exams/sat/form-4-math-module-1.ts',
    'math-m2e': 'lib/premade-exams/sat/form-4-math-module-2-easy.ts',
    'math-m2h': 'lib/premade-exams/sat/form-4-math-module-2-hard.ts',
  },
  'Form 5': {
    'rw-m1':    'lib/premade-exams/sat/form-5-rw-module-1.ts',
    'rw-m2e':   'lib/premade-exams/sat/form-5-rw-module-2-easy.ts',
    'rw-m2h':   'lib/premade-exams/sat/form-5-rw-module-2-hard.ts',
    'math-m1':  'lib/premade-exams/sat/form-5-math-module-1.ts',
    'math-m2e': 'lib/premade-exams/sat/form-5-math-module-2-easy.ts',
    'math-m2h': 'lib/premade-exams/sat/form-5-math-module-2-hard.ts',
  },
}

const RW_SKILLS_ORDER = [
  'Words in Context',
  'Text Structure and Purpose',
  'Central Ideas and Details',
  'Cross-Text Connections',
  'Command of Evidence',
  'Inferences',
  'Rhetorical Synthesis',
  'Transitions',
  'Boundaries',
  'Form, Structure, and Sense',
]

const MATH_DOMAINS = ['Algebra', 'Advanced Math', 'Problem-Solving and Data Analysis', 'Geometry and Trigonometry']

// AAMC-aligned difficulty targets per module type
const DIFF_TARGETS = {
  'rw-m1':    { easy: [30, 50], medium: [40, 60], hard: [5, 20] },
  'rw-m2e':   { easy: [40, 65], medium: [30, 55], hard: [0, 15] },
  'rw-m2h':   { easy: [0, 20],  medium: [35, 55], hard: [25, 50] },
  'math-m1':  { easy: [15, 35], medium: [45, 65], hard: [10, 30] },
  'math-m2e': { easy: [35, 55], medium: [40, 55], hard: [0, 15] },
  'math-m2h': { easy: [0, 15],  medium: [35, 55], hard: [30, 55] },
}

// Expected question counts
const Q_COUNTS = {
  'rw-m1': 27, 'rw-m2e': 27, 'rw-m2h': 27,
  'math-m1': 22, 'math-m2e': 22, 'math-m2h': 22,
}

let errors = 0, warnings = 0
const issues = []

function flag(level, form, mod, msg) {
  issues.push({ level, form, mod, msg })
  if (level === 'ERROR') errors++
  else warnings++
}

function pct(n, total) { return total ? Math.round(n / total * 100) : 0 }
function dist(arr, key) {
  return arr.reduce((acc, q) => { acc[q[key]] = (acc[q[key]] || 0) + 1; return acc }, {})
}

// Track all IDs globally for duplicate detection
const allIds = new Map()

async function auditModule(formName, modKey, filePath) {
  const src = await loadModule(filePath)
  if (!src) {
    flag('ERROR', formName, modKey, `File not found: ${filePath}`)
    return []
  }

  const qs = parseQuestions(src)
  const expected = Q_COUNTS[modKey]
  const isRW = modKey.startsWith('rw')

  // Count check
  if (qs.length !== expected) {
    flag('ERROR', formName, modKey, `Question count: ${qs.length} (expected ${expected})`)
  }

  // Duplicate ID check
  for (const q of qs) {
    if (allIds.has(q.id)) {
      flag('ERROR', formName, modKey, `Duplicate ID: ${q.id} (also in ${allIds.get(q.id)})`)
    }
    allIds.set(q.id, `${formName}/${modKey}`)
  }

  // Difficulty distribution
  const diffs = dist(qs, 'difficulty')
  const targets = DIFF_TARGETS[modKey]
  if (targets) {
    for (const [level, [min, max]] of Object.entries(targets)) {
      const pctVal = pct(diffs[level] || 0, qs.length)
      if (pctVal < min) flag('WARN', formName, modKey,
        `Difficulty ${level}: ${pctVal}% — below target ${min}% (${diffs[level] || 0}/${qs.length})`)
      if (pctVal > max) flag('WARN', formName, modKey,
        `Difficulty ${level}: ${pctVal}% — above target ${max}% (${diffs[level] || 0}/${qs.length})`)
    }
  }

  // Domain/skill distribution
  if (isRW) {
    const skills = dist(qs, 'skill')
    const wic = skills['Words in Context'] || 0
    const sec = (skills['Boundaries'] || 0) + (skills['Form, Structure, and Sense'] || 0)
    const synth = skills['Rhetorical Synthesis'] || 0
    const trans = skills['Transitions'] || 0

    if (wic < 2 || wic > 6) flag('WARN', formName, modKey,
      `Words in Context count: ${wic} (expect 3–5 per module)`)
    if (modKey !== 'rw-m2e' && sec < 4) flag('WARN', formName, modKey,
      `SEC (Boundaries+FSS) count: ${sec} — may be too low`)
    if (modKey !== 'rw-m2e' && synth + trans < 4) flag('WARN', formName, modKey,
      `Transitions+RhetSynth count: ${synth + trans} — may be too low`)
  } else {
    const domains = dist(qs, 'domain')
    if (!domains['Algebra']) flag('WARN', formName, modKey, 'No Algebra questions')
    if (!domains['Advanced Math']) flag('WARN', formName, modKey, 'No Advanced Math questions')
    // Geometry optional in some modules but should appear somewhere
  }

  // Missing metadata
  for (const q of qs) {
    if (!q.domain || q.domain === '?') flag('ERROR', formName, modKey, `Missing domain on ${q.id}`)
    if (!q.skill || q.skill === '?') flag('WARN', formName, modKey, `Missing skill on ${q.id}`)
    if (!q.difficulty || q.difficulty === '?') flag('WARN', formName, modKey, `Missing difficulty on ${q.id}`)
    if (!q.correctAnswer || q.correctAnswer === '?') flag('ERROR', formName, modKey, `Missing correctAnswer on ${q.id}`)
  }

  return qs
}

// ─── Main ─────────────────────────────────────────────────────────────────────
console.log('=== SAT Forms 1–5 Realism Audit ===\n')

for (const [formName, modules] of Object.entries(FORMS)) {
  console.log(`── ${formName} ──`)
  for (const [modKey, filePath] of Object.entries(modules)) {
    await auditModule(formName, modKey, filePath)
  }
}

// ─── Report ───────────────────────────────────────────────────────────────────
console.log('\n=== Issues Found ===\n')

const byForm = {}
for (const issue of issues) {
  const key = issue.form
  if (!byForm[key]) byForm[key] = []
  byForm[key].push(issue)
}

for (const [form, formIssues] of Object.entries(byForm)) {
  console.log(`\n${form}:`)
  for (const i of formIssues) {
    const prefix = i.level === 'ERROR' ? '  ❌' : '  ⚠️ '
    console.log(`${prefix} [${i.mod}] ${i.msg}`)
  }
}

console.log(`\n\nSummary: ${errors} error(s), ${warnings} warning(s)`)
if (errors === 0 && warnings === 0) {
  console.log('✅ All SAT forms pass realism audit')
} else if (errors === 0) {
  console.log('⚠️  Audit passed with warnings')
} else {
  console.log('❌ Audit FAILED')
}
