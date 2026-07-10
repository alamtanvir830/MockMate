/**
 * Validates SAT Forms 1–5 question-type sequencing across all modules.
 * Flags: 3+ same skill in a row, 4+ same domain in a row, wrong module counts.
 * Run: npx tsx scripts/validate-sat-question-type-sequencing.ts
 */

import { rwModule1Questions }        from '../lib/premade-exams/sat/rw-module-1'
import { rwModule2EasyQuestions }    from '../lib/premade-exams/sat/rw-module-2-easy'
import { rwModule2HardQuestions }    from '../lib/premade-exams/sat/rw-module-2-hard'
import { mathModule1Questions }      from '../lib/premade-exams/sat/math-module-1'
import { mathModule2EasyQuestions }  from '../lib/premade-exams/sat/math-module-2-easy'
import { mathModule2HardQuestions }  from '../lib/premade-exams/sat/math-module-2-hard'

import { f2RwModule1Questions }      from '../lib/premade-exams/sat/form-2-rw-module-1'
import { f2RwModule2EasyQuestions }  from '../lib/premade-exams/sat/form-2-rw-module-2-easy'
import { f2RwModule2HardQuestions }  from '../lib/premade-exams/sat/form-2-rw-module-2-hard'
import { f2MathModule1Questions }    from '../lib/premade-exams/sat/form-2-math-module-1'
import { f2MathModule2EasyQuestions } from '../lib/premade-exams/sat/form-2-math-module-2-easy'
import { f2MathModule2HardQuestions } from '../lib/premade-exams/sat/form-2-math-module-2-hard'

import { f3RwModule1Questions }      from '../lib/premade-exams/sat/form-3-rw-module-1'
import { f3RwModule2EasyQuestions }  from '../lib/premade-exams/sat/form-3-rw-module-2-easy'
import { f3RwModule2HardQuestions }  from '../lib/premade-exams/sat/form-3-rw-module-2-hard'
import { f3MathModule1Questions }    from '../lib/premade-exams/sat/form-3-math-module-1'
import { f3MathModule2EasyQuestions } from '../lib/premade-exams/sat/form-3-math-module-2-easy'
import { f3MathModule2HardQuestions } from '../lib/premade-exams/sat/form-3-math-module-2-hard'

import { f4RwModule1Questions }      from '../lib/premade-exams/sat/form-4-rw-module-1'
import { f4RwModule2EasyQuestions }  from '../lib/premade-exams/sat/form-4-rw-module-2-easy'
import { f4RwModule2HardQuestions }  from '../lib/premade-exams/sat/form-4-rw-module-2-hard'
import { f4MathModule1Questions }    from '../lib/premade-exams/sat/form-4-math-module-1'
import { f4MathModule2EasyQuestions } from '../lib/premade-exams/sat/form-4-math-module-2-easy'
import { f4MathModule2HardQuestions } from '../lib/premade-exams/sat/form-4-math-module-2-hard'

import { f5RwModule1Questions }      from '../lib/premade-exams/sat/form-5-rw-module-1'
import { f5RwModule2EasyQuestions }  from '../lib/premade-exams/sat/form-5-rw-module-2-easy'
import { f5RwModule2HardQuestions }  from '../lib/premade-exams/sat/form-5-rw-module-2-hard'
import { f5MathModule1Questions }    from '../lib/premade-exams/sat/form-5-math-module-1'
import { f5MathModule2EasyQuestions } from '../lib/premade-exams/sat/form-5-math-module-2-easy'
import { f5MathModule2HardQuestions } from '../lib/premade-exams/sat/form-5-math-module-2-hard'

// ── Types ────────────────────────────────────────────────────────────────────

interface AnyQuestion {
  id: string
  domain?: string
  skill?: string
  section?: string
  difficulty?: string
}

interface ModuleSpec {
  formLabel: string
  sectionLabel: string
  moduleLabel: string
  questions: AnyQuestion[]
  expectedCount: number
}

// ── Module registry ──────────────────────────────────────────────────────────

const modules: ModuleSpec[] = [
  // Form 1
  { formLabel: 'Form 1', sectionLabel: 'R&W', moduleLabel: 'Module 1',    questions: rwModule1Questions as AnyQuestion[],       expectedCount: 27 },
  { formLabel: 'Form 1', sectionLabel: 'R&W', moduleLabel: 'Module 2 Easy', questions: rwModule2EasyQuestions as AnyQuestion[], expectedCount: 27 },
  { formLabel: 'Form 1', sectionLabel: 'R&W', moduleLabel: 'Module 2 Hard', questions: rwModule2HardQuestions as AnyQuestion[], expectedCount: 27 },
  { formLabel: 'Form 1', sectionLabel: 'Math', moduleLabel: 'Module 1',   questions: mathModule1Questions as AnyQuestion[],     expectedCount: 22 },
  { formLabel: 'Form 1', sectionLabel: 'Math', moduleLabel: 'Module 2 Easy', questions: mathModule2EasyQuestions as AnyQuestion[], expectedCount: 22 },
  { formLabel: 'Form 1', sectionLabel: 'Math', moduleLabel: 'Module 2 Hard', questions: mathModule2HardQuestions as AnyQuestion[], expectedCount: 22 },
  // Form 2
  { formLabel: 'Form 2', sectionLabel: 'R&W', moduleLabel: 'Module 1',    questions: f2RwModule1Questions as AnyQuestion[],     expectedCount: 27 },
  { formLabel: 'Form 2', sectionLabel: 'R&W', moduleLabel: 'Module 2 Easy', questions: f2RwModule2EasyQuestions as AnyQuestion[], expectedCount: 27 },
  { formLabel: 'Form 2', sectionLabel: 'R&W', moduleLabel: 'Module 2 Hard', questions: f2RwModule2HardQuestions as AnyQuestion[], expectedCount: 27 },
  { formLabel: 'Form 2', sectionLabel: 'Math', moduleLabel: 'Module 1',   questions: f2MathModule1Questions as AnyQuestion[],   expectedCount: 22 },
  { formLabel: 'Form 2', sectionLabel: 'Math', moduleLabel: 'Module 2 Easy', questions: f2MathModule2EasyQuestions as AnyQuestion[], expectedCount: 22 },
  { formLabel: 'Form 2', sectionLabel: 'Math', moduleLabel: 'Module 2 Hard', questions: f2MathModule2HardQuestions as AnyQuestion[], expectedCount: 22 },
  // Form 3
  { formLabel: 'Form 3', sectionLabel: 'R&W', moduleLabel: 'Module 1',    questions: f3RwModule1Questions as AnyQuestion[],     expectedCount: 27 },
  { formLabel: 'Form 3', sectionLabel: 'R&W', moduleLabel: 'Module 2 Easy', questions: f3RwModule2EasyQuestions as AnyQuestion[], expectedCount: 27 },
  { formLabel: 'Form 3', sectionLabel: 'R&W', moduleLabel: 'Module 2 Hard', questions: f3RwModule2HardQuestions as AnyQuestion[], expectedCount: 27 },
  { formLabel: 'Form 3', sectionLabel: 'Math', moduleLabel: 'Module 1',   questions: f3MathModule1Questions as AnyQuestion[],   expectedCount: 22 },
  { formLabel: 'Form 3', sectionLabel: 'Math', moduleLabel: 'Module 2 Easy', questions: f3MathModule2EasyQuestions as AnyQuestion[], expectedCount: 22 },
  { formLabel: 'Form 3', sectionLabel: 'Math', moduleLabel: 'Module 2 Hard', questions: f3MathModule2HardQuestions as AnyQuestion[], expectedCount: 22 },
  // Form 4
  { formLabel: 'Form 4', sectionLabel: 'R&W', moduleLabel: 'Module 1',    questions: f4RwModule1Questions as AnyQuestion[],     expectedCount: 27 },
  { formLabel: 'Form 4', sectionLabel: 'R&W', moduleLabel: 'Module 2 Easy', questions: f4RwModule2EasyQuestions as AnyQuestion[], expectedCount: 27 },
  { formLabel: 'Form 4', sectionLabel: 'R&W', moduleLabel: 'Module 2 Hard', questions: f4RwModule2HardQuestions as AnyQuestion[], expectedCount: 27 },
  { formLabel: 'Form 4', sectionLabel: 'Math', moduleLabel: 'Module 1',   questions: f4MathModule1Questions as AnyQuestion[],   expectedCount: 22 },
  { formLabel: 'Form 4', sectionLabel: 'Math', moduleLabel: 'Module 2 Easy', questions: f4MathModule2EasyQuestions as AnyQuestion[], expectedCount: 22 },
  { formLabel: 'Form 4', sectionLabel: 'Math', moduleLabel: 'Module 2 Hard', questions: f4MathModule2HardQuestions as AnyQuestion[], expectedCount: 22 },
  // Form 5
  { formLabel: 'Form 5', sectionLabel: 'R&W', moduleLabel: 'Module 1',    questions: f5RwModule1Questions as AnyQuestion[],     expectedCount: 27 },
  { formLabel: 'Form 5', sectionLabel: 'R&W', moduleLabel: 'Module 2 Easy', questions: f5RwModule2EasyQuestions as AnyQuestion[], expectedCount: 27 },
  { formLabel: 'Form 5', sectionLabel: 'R&W', moduleLabel: 'Module 2 Hard', questions: f5RwModule2HardQuestions as AnyQuestion[], expectedCount: 27 },
  { formLabel: 'Form 5', sectionLabel: 'Math', moduleLabel: 'Module 1',   questions: f5MathModule1Questions as AnyQuestion[],   expectedCount: 22 },
  { formLabel: 'Form 5', sectionLabel: 'Math', moduleLabel: 'Module 2 Easy', questions: f5MathModule2EasyQuestions as AnyQuestion[], expectedCount: 22 },
  { formLabel: 'Form 5', sectionLabel: 'Math', moduleLabel: 'Module 2 Hard', questions: f5MathModule2HardQuestions as AnyQuestion[], expectedCount: 22 },
]

// ── Helpers ──────────────────────────────────────────────────────────────────

function findRunViolations(labels: string[], threshold: number): { start: number; length: number; value: string }[] {
  const violations: { start: number; length: number; value: string }[] = []
  let i = 0
  while (i < labels.length) {
    let j = i + 1
    while (j < labels.length && labels[j] === labels[i]) j++
    const run = j - i
    if (run >= threshold) {
      violations.push({ start: i, length: run, value: labels[i] })
    }
    i = j
  }
  return violations
}

// ── Main audit ───────────────────────────────────────────────────────────────

let totalFailed = 0
let totalWarned = 0

const DIVIDER = '─'.repeat(72)
const HEADER  = '═'.repeat(72)

console.log('\n' + HEADER)
console.log('  SAT Forms 1–5 — Question-Type Sequencing Audit')
console.log(HEADER)

for (const mod of modules) {
  const { formLabel, sectionLabel, moduleLabel, questions, expectedCount } = mod
  const label = `${formLabel} · ${sectionLabel} · ${moduleLabel}`
  const skills  = questions.map(q => q.skill  ?? '(no skill)')
  const domains = questions.map(q => q.domain ?? '(no domain)')
  const ids     = questions.map(q => q.id)

  const skillViolations  = findRunViolations(skills,  3)
  const domainViolations = findRunViolations(domains, 4)
  const missingSkill   = questions.filter(q => !q.skill).map(q => q.id)
  const missingDomain  = questions.filter(q => !q.domain).map(q => q.id)
  const countOk = questions.length === expectedCount

  const hasIssues = !countOk || skillViolations.length > 0 || domainViolations.length > 0 ||
                    missingSkill.length > 0 || missingDomain.length > 0

  if (hasIssues) {
    console.log(`\n${DIVIDER}`)
    console.log(`  ⚠  ${label}`)
    console.log(DIVIDER)

    if (!countOk) {
      console.log(`  ✗ COUNT: expected ${expectedCount}, got ${questions.length}`)
      totalFailed++
    } else {
      console.log(`  · count: ${questions.length} ✓`)
    }

    if (missingSkill.length > 0) {
      console.log(`  ✗ MISSING skill on: ${missingSkill.join(', ')}`)
      totalFailed++
    }
    if (missingDomain.length > 0) {
      console.log(`  ✗ MISSING domain on: ${missingDomain.join(', ')}`)
      totalFailed++
    }

    for (const v of skillViolations) {
      const affectedIds = ids.slice(v.start, v.start + v.length).join(', ')
      console.log(`  ✗ SKILL ×${v.length} in a row: "${v.value}"`)
      console.log(`       positions ${v.start + 1}–${v.start + v.length}: ${affectedIds}`)
      totalFailed++
    }

    for (const v of domainViolations) {
      const affectedIds = ids.slice(v.start, v.start + v.length).join(', ')
      console.log(`  ⚠ DOMAIN ×${v.length} in a row: "${v.value}"`)
      console.log(`       positions ${v.start + 1}–${v.start + v.length}: ${affectedIds}`)
      totalWarned++
    }

    // Print full skill sequence for context
    console.log(`  · sequence: ${skills.map((s, i) => `Q${i+1}:${s.split(' ').slice(-2).join(' ')}`).join(' → ')}`)
  }
}

// ── Summary ──────────────────────────────────────────────────────────────────

console.log(`\n${HEADER}`)
console.log('  Summary')
console.log(HEADER)
console.log(`  Modules audited : ${modules.length}`)
console.log(`  Failures        : ${totalFailed}`)
console.log(`  Warnings        : ${totalWarned}`)
console.log()

if (totalFailed === 0 && totalWarned === 0) {
  console.log('✅ All sequencing checks passed — no clusters detected.\n')
} else if (totalFailed === 0) {
  console.log(`⚠️  ${totalWarned} domain-cluster warning(s) — no hard failures.\n`)
} else {
  console.log(`❌ ${totalFailed} sequencing violation(s) found — fix before committing.\n`)
}

process.exit(totalFailed > 0 ? 1 : 0)
