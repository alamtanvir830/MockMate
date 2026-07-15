#!/usr/bin/env node
// audit-sat-difficulty-high-scorer.mjs
// Audits SAT forms for difficulty signals that would affect high-scorer experience.
// Flags: too many easy questions, weak Math M1, weak Math M2H, scoring inflation risk.

import { readFileSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

const MATH_FILES = {
  'Form 1 Math M1':   'lib/premade-exams/sat/math-module-1.ts',
  'Form 1 Math M2H':  'lib/premade-exams/sat/math-module-2-hard.ts',
  'Form 2 Math M1':   'lib/premade-exams/sat/form-2-math-module-1.ts',
  'Form 2 Math M2H':  'lib/premade-exams/sat/form-2-math-module-2-hard.ts',
  'Form 3 Math M1':   'lib/premade-exams/sat/form-3-math-module-1.ts',
  'Form 3 Math M2H':  'lib/premade-exams/sat/form-3-math-module-2-hard.ts',
  'Form 4 Math M1':   'lib/premade-exams/sat/form-4-math-module-1.ts',
  'Form 4 Math M2H':  'lib/premade-exams/sat/form-4-math-module-2-hard.ts',
  'Form 5 Math M1':   'lib/premade-exams/sat/form-5-math-module-1.ts',
  'Form 5 Math M2H':  'lib/premade-exams/sat/form-5-math-module-2-hard.ts',
}

const RW_HARD_FILES = {
  'Form 1 RW M2H':  'lib/premade-exams/sat/rw-module-2-hard.ts',
  'Form 2 RW M2H':  'lib/premade-exams/sat/form-2-rw-module-2-hard.ts',
  'Form 3 RW M2H':  'lib/premade-exams/sat/form-3-rw-module-2-hard.ts',
  'Form 4 RW M2H':  'lib/premade-exams/sat/form-4-rw-module-2-hard.ts',
  'Form 5 RW M2H':  'lib/premade-exams/sat/form-5-rw-module-2-hard.ts',
}

// Hard-to-bypass-with-Desmos math skill patterns
const DESMOS_TRIVIAL = [
  'data table',
  'scatter plot',
  'line of best fit',
  'regression',
  'line of fit',
  'best-fit line',
]

// Difficulty targets per module type
const TARGETS = {
  'Math M1':  { maxEasy: 30, minMedium: 45, minHard: 10 },   // pct
  'Math M2H': { maxEasy: 10, minMedium: 30, minHard: 35 },
  'RW M2H':   { maxEasy: 15, minMedium: 35, minHard: 30 },
}

let totalIssues = 0
const report = []

function pct(n, total) { return total ? Math.round(n / total * 100) : 0 }

function parseQuestions(src) {
  const qs = []
  const idRx = /id:\s*['"]([^'"]+)['"]/g
  const diffRx = /difficulty:\s*['"]([^'"]+)['"]/g
  const domRx  = /domain:\s*['"]([^'"]+)['"]/g
  const skillRx = /skill:\s*['"]([^'"]+)['"]/g
  const typeRx = /type:\s*['"]([^'"]+)['"]/g

  const ids = [...src.matchAll(idRx)].map(m => m[1])
  const diffs = [...src.matchAll(diffRx)].map(m => m[1])
  const doms = [...src.matchAll(domRx)].map(m => m[1])
  const skills = [...src.matchAll(skillRx)].map(m => m[1])
  const types = [...src.matchAll(typeRx)].map(m => m[1])

  for (let i = 0; i < ids.length; i++) {
    qs.push({ id: ids[i], difficulty: diffs[i], domain: doms[i], skill: skills[i], type: types[i] })
  }
  return qs
}

function extractQuestionTexts(src) {
  const texts = []
  // Extract question field contents
  const qRx = /question:\s*`([^`]*)`/g
  let m
  while ((m = qRx.exec(src)) !== null) texts.push(m[1])
  // Also single-quoted
  const sqRx = /question:\s*'([^']*)'/g
  while ((m = sqRx.exec(src)) !== null) texts.push(m[1])
  return texts
}

function auditFile(label, filePath, moduleType) {
  const absPath = resolve(root, filePath)
  if (!existsSync(absPath)) {
    report.push({ label, issues: [`FILE NOT FOUND: ${filePath}`] })
    return
  }
  const src = readFileSync(absPath, 'utf8')
  const qs = parseQuestions(src)
  const issues = []

  if (qs.length === 0) {
    issues.push('❌ No questions parsed from file')
    report.push({ label, issues })
    return
  }

  // Difficulty distribution
  const easy = qs.filter(q => q.difficulty === 'easy').length
  const medium = qs.filter(q => q.difficulty === 'medium').length
  const hard = qs.filter(q => q.difficulty === 'hard').length
  const total = qs.length

  const easyPct = pct(easy, total)
  const medPct = pct(medium, total)
  const hardPct = pct(hard, total)

  issues.push(`  Difficulty: easy=${easyPct}% (${easy}) | medium=${medPct}% (${medium}) | hard=${hardPct}% (${hard}) | total=${total}`)

  const targets = moduleType.includes('M1') ? TARGETS['Math M1']
    : moduleType.includes('M2H') && moduleType.includes('Math') ? TARGETS['Math M2H']
    : moduleType.includes('RW') ? TARGETS['RW M2H']
    : null

  if (targets) {
    if (easyPct > targets.maxEasy) {
      issues.push(`  ⚠️  Too many EASY questions: ${easyPct}% (max target: ${targets.maxEasy}%)`)
      totalIssues++
    }
    if (medPct < targets.minMedium) {
      issues.push(`  ⚠️  Too few MEDIUM questions: ${medPct}% (min target: ${targets.minMedium}%)`)
      totalIssues++
    }
    if (hardPct < targets.minHard) {
      issues.push(`  ⚠️  Too few HARD questions: ${hardPct}% (min target: ${targets.minHard}%)`)
      totalIssues++
    }
  }

  // Domain distribution for Math
  if (moduleType.includes('Math')) {
    const domains = qs.reduce((acc, q) => { acc[q.domain] = (acc[q.domain]||0)+1; return acc }, {})
    issues.push(`  Domains: ${Object.entries(domains).map(([d,n]) => `${d.split(' ')[0]}=${n}`).join(' | ')}`)
    if (!domains['Algebra']) issues.push(`  ⚠️  Missing Algebra questions`)
    if (!domains['Advanced Math']) issues.push(`  ⚠️  Missing Advanced Math questions`)
    // G&T should appear in at least M1
    const noGeom = !domains['Geometry and Trigonometry']
    if (noGeom && moduleType.includes('M1')) {
      issues.push(`  ⚠️  No Geometry & Trig questions in Math M1 — domain imbalanced`)
      totalIssues++
    }
  }

  // Desmos-trivial check for Math M2H
  if (moduleType.includes('M2H') && moduleType.includes('Math')) {
    const texts = extractQuestionTexts(src)
    let desmosCount = 0
    for (const t of texts) {
      for (const pat of DESMOS_TRIVIAL) {
        if (t.toLowerCase().includes(pat)) {
          desmosCount++
          issues.push(`  ⚠️  Potentially Desmos-trivial question: "${t.substring(0, 80)}..."`)
          break
        }
      }
    }
    if (desmosCount > 2) {
      issues.push(`  ❌ ${desmosCount} questions may be trivially solvable with Desmos regression — reduces challenge for high scorers`)
      totalIssues++
    }
  }

  // Easy question IDs for high-scorer context
  const easyQs = qs.filter(q => q.difficulty === 'easy').map(q => q.id)
  if (easyPct > 20 && (moduleType.includes('M2H') || (moduleType.includes('M1') && easyPct > 35))) {
    issues.push(`  ⚠️  Easy question IDs: ${easyQs.join(', ')}`)
  }

  report.push({ label, issues })
}

// ─── Run audit ────────────────────────────────────────────────────────────────
for (const [label, filePath] of Object.entries(MATH_FILES)) {
  const modType = label.includes('M2H') ? 'Math M2H' : 'Math M1'
  auditFile(label, filePath, modType)
}

for (const [label, filePath] of Object.entries(RW_HARD_FILES)) {
  auditFile(label, filePath, 'RW M2H')
}

// ─── Report ───────────────────────────────────────────────────────────────────
console.log('=== SAT Difficulty Audit (High-Scorer Perspective) ===\n')
console.log('Target: Math M1 ≤30% easy, ≥45% medium, ≥10% hard')
console.log('Target: Math M2H ≤10% easy, ≥30% medium, ≥35% hard')
console.log('Target: RW M2H ≤15% easy, ≥35% medium, ≥30% hard\n')

for (const { label, issues: iss } of report) {
  console.log(`\n${label}:`)
  for (const line of iss) console.log(line)
}

console.log(`\n\nTotal issues flagged: ${totalIssues}`)
if (totalIssues === 0) {
  console.log('✅ All modules meet difficulty targets for high scorers')
} else {
  console.log('⚠️  Difficulty improvements needed — see flags above')
}
