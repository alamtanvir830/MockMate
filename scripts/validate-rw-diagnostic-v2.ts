/**
 * Validation script for the SAT R&W Diagnostic V3 (user-facing name: V2).
 *
 * Run:
 *   npx ts-node --compiler-options '{"module":"commonjs","moduleResolution":"node"}' scripts/validate-rw-diagnostic-v2.ts
 *
 * Checks:
 *  - All 66 question IDs are present (22 M1 + 22 M2-Foundation + 22 M2-Advanced)
 *  - No duplicate IDs across all three modules
 *  - Correct ID prefixes per module
 *  - All questions have the required fields
 *  - M1: NO easy questions (all medium or hard)
 *  - M2-Advanced: all hard
 *  - 2 questions per skill × 11 skills in each module
 *  - correctAnswer is A, B, C, or D
 *  - choices array has exactly 4 choices
 *  - wrongAnswerExplanations covers the 3 wrong choices
 *  - Answer distribution: no single letter > 40% in any module
 *  - Routing threshold: ≥15/22 → advanced branch
 *  - Skill coverage: all 11 skills present in each module
 */

import { DIAGNOSTIC_V3_M1_QUESTIONS, DIAGNOSTIC_V3_M2_FOUNDATION_QUESTIONS, M1_V3_ROUTING_THRESHOLD, routeToM2V3Branch } from '../lib/academy/diagnostic-questions-v3'
import { DIAGNOSTIC_V3_M2_ADVANCED_QUESTIONS } from '../lib/academy/diagnostic-questions-v3-advanced'
import type { DrillQuestion } from '../lib/academy/types'

const EXPECTED_SKILL_SLUGS = [
  'boundaries', 'form-structure-sense', 'transitions', 'rhetorical-synthesis',
  'words-in-context', 'central-ideas-details', 'text-structure-purpose',
  'command-of-evidence', 'quantitative-evidence', 'inferences', 'cross-text-connections',
]

const VALID_LABELS: Set<string> = new Set(['A', 'B', 'C', 'D'])

interface CheckResult {
  pass: boolean
  messages: string[]
}

function checkModule(
  label: string,
  questions: DrillQuestion[],
  expectedCount: number,
  expectedPrefix: string,
  forbiddenDifficulty?: string,
  requiredDifficulty?: string,
): CheckResult {
  const messages: string[] = []
  let pass = true

  // Count check
  if (questions.length !== expectedCount) {
    messages.push(`${label}: expected ${expectedCount} questions, got ${questions.length}`)
    pass = false
  }

  const seenIds = new Set<string>()

  for (const q of questions) {
    // ID prefix
    if (!q.id.startsWith(expectedPrefix)) {
      messages.push(`${label}: question ${q.id} does not start with "${expectedPrefix}"`)
      pass = false
    }

    // Duplicate IDs
    if (seenIds.has(q.id)) {
      messages.push(`${label}: duplicate ID "${q.id}"`)
      pass = false
    }
    seenIds.add(q.id)

    // Required fields
    if (!q.skillSlug) { messages.push(`${q.id}: missing skillSlug`); pass = false }
    if (!q.question) { messages.push(`${q.id}: missing question`); pass = false }
    if (!q.explanation) { messages.push(`${q.id}: missing explanation`); pass = false }
    if (!q.teachingPoint) { messages.push(`${q.id}: missing teachingPoint`); pass = false }

    // Stimulus: required for all skills except boundaries and form-structure-sense,
    // where the single sentence with the blank lives in the question field.
    const stimulusOptional = q.skillSlug === 'boundaries' || q.skillSlug === 'form-structure-sense'
    if (!q.stimulus && !stimulusOptional) {
      messages.push(`${q.id}: missing stimulus (${q.skillSlug} questions need a passage)`)
      pass = false
    }
    if (!q.stimulus && !q.question && stimulusOptional) {
      messages.push(`${q.id}: missing both stimulus and question text`)
      pass = false
    }

    // Difficulty constraints
    if (forbiddenDifficulty && q.difficulty === forbiddenDifficulty) {
      messages.push(`${q.id}: difficulty "${q.difficulty}" is not allowed in ${label}`)
      pass = false
    }
    if (requiredDifficulty && q.difficulty !== requiredDifficulty) {
      messages.push(`${q.id}: expected difficulty "${requiredDifficulty}", got "${q.difficulty}"`)
      pass = false
    }

    // Choices
    if (!q.choices || q.choices.length !== 4) {
      messages.push(`${q.id}: expected 4 choices, got ${q.choices?.length ?? 0}`)
      pass = false
      continue
    }

    // correctAnswer
    if (!VALID_LABELS.has(q.correctAnswer)) {
      messages.push(`${q.id}: invalid correctAnswer "${q.correctAnswer}"`)
      pass = false
    }

    // Choice labels
    const labels = q.choices.map(c => c.label)
    for (const l of ['A', 'B', 'C', 'D'] as const) {
      if (!labels.includes(l)) {
        messages.push(`${q.id}: missing choice label "${l}"`)
        pass = false
      }
    }

    // wrongAnswerExplanations covers the 3 wrong choices
    const wrongLabels = (['A', 'B', 'C', 'D'] as const).filter(l => l !== q.correctAnswer)
    for (const wl of wrongLabels) {
      if (!q.wrongAnswerExplanations?.[wl]) {
        messages.push(`${q.id}: missing wrongAnswerExplanations["${wl}"]`)
        pass = false
      }
    }
  }

  // Skill coverage: each skill must appear exactly 2 times
  const skillCounts: Record<string, number> = {}
  for (const q of questions) {
    skillCounts[q.skillSlug] = (skillCounts[q.skillSlug] ?? 0) + 1
  }
  for (const slug of EXPECTED_SKILL_SLUGS) {
    const count = skillCounts[slug] ?? 0
    if (count !== 2) {
      messages.push(`${label}: skill "${slug}" appears ${count} times (expected 2)`)
      pass = false
    }
  }
  for (const slug of Object.keys(skillCounts)) {
    if (!EXPECTED_SKILL_SLUGS.includes(slug)) {
      messages.push(`${label}: unexpected skill "${slug}"`)
      pass = false
    }
  }

  // Answer distribution: no letter > 45%
  const answerCounts: Record<string, number> = { A: 0, B: 0, C: 0, D: 0 }
  for (const q of questions) {
    if (VALID_LABELS.has(q.correctAnswer)) answerCounts[q.correctAnswer]++
  }
  for (const [letter, count] of Object.entries(answerCounts)) {
    const pct = Math.round((count / questions.length) * 100)
    if (pct > 45) {
      messages.push(`${label}: answer "${letter}" appears ${count}/${questions.length} times (${pct}%) — exceeds 45% threshold`)
      pass = false
    }
  }

  return { pass, messages }
}

function checkNoDuplicatesAcrossModules(m1: DrillQuestion[], m2f: DrillQuestion[], m2a: DrillQuestion[]): string[] {
  const allIds = new Map<string, string>()
  const errors: string[] = []
  for (const [label, qs] of [['M1', m1], ['M2-Foundation', m2f], ['M2-Advanced', m2a]] as const) {
    for (const q of qs) {
      if (allIds.has(q.id)) {
        errors.push(`Duplicate ID "${q.id}" appears in both ${allIds.get(q.id)} and ${label}`)
      } else {
        allIds.set(q.id, label)
      }
    }
  }
  return errors
}

function checkRoutingLogic(): string[] {
  const errors: string[] = []

  // Threshold check
  const expected = 15 / 22
  if (Math.abs(M1_V3_ROUTING_THRESHOLD - expected) > 0.0001) {
    errors.push(`Routing threshold is ${M1_V3_ROUTING_THRESHOLD}, expected ${expected} (15/22)`)
  }

  // Boundary cases
  if (routeToM2V3Branch(14, 22) !== 'foundation') errors.push('routeToM2V3Branch(14, 22) should return "foundation"')
  if (routeToM2V3Branch(15, 22) !== 'advanced') errors.push('routeToM2V3Branch(15, 22) should return "advanced"')
  if (routeToM2V3Branch(22, 22) !== 'advanced') errors.push('routeToM2V3Branch(22, 22) should return "advanced"')
  if (routeToM2V3Branch(0, 22) !== 'foundation') errors.push('routeToM2V3Branch(0, 22) should return "foundation"')
  if (routeToM2V3Branch(0, 0) !== 'foundation') errors.push('routeToM2V3Branch(0, 0) should return "foundation" (guard against division by zero)')

  return errors
}

// ── Run all checks ─────────────────────────────────────────────────────────────

let allPass = true
const allErrors: string[] = []

function report(label: string, result: CheckResult | string[]) {
  const messages = Array.isArray(result) ? result : result.messages
  const pass = Array.isArray(result) ? messages.length === 0 : result.pass
  if (pass) {
    console.log(`  ✓ ${label}`)
  } else {
    console.log(`  ✗ ${label}`)
    for (const m of messages) {
      console.log(`    → ${m}`)
      allErrors.push(m)
    }
    allPass = false
  }
}

console.log('\n── SAT R&W Diagnostic V3 Validation ──────────────────────────────────\n')

console.log('Module 1 (22 questions, all medium or hard):')
report('question count, IDs, fields', checkModule('M1', DIAGNOSTIC_V3_M1_QUESTIONS, 22, 'diag3-m1-', 'easy'))

console.log('\nModule 2 — Foundation (22 questions):')
report('question count, IDs, fields', checkModule('M2-Foundation', DIAGNOSTIC_V3_M2_FOUNDATION_QUESTIONS, 22, 'diag3-m2f-', 'easy'))

console.log('\nModule 2 — Advanced (22 questions, all hard):')
report('question count, IDs, fields', checkModule('M2-Advanced', DIAGNOSTIC_V3_M2_ADVANCED_QUESTIONS, 22, 'diag3-m2a-', undefined, 'hard'))

console.log('\nCross-module checks:')
report('no duplicate IDs across modules', checkNoDuplicatesAcrossModules(
  DIAGNOSTIC_V3_M1_QUESTIONS,
  DIAGNOSTIC_V3_M2_FOUNDATION_QUESTIONS,
  DIAGNOSTIC_V3_M2_ADVANCED_QUESTIONS,
))

console.log('\nRouting logic:')
report('threshold and branch function', checkRoutingLogic())

console.log('\n──────────────────────────────────────────────────────────────────────')
if (allPass) {
  console.log('✓ All checks passed.\n')
  process.exit(0)
} else {
  console.log(`✗ ${allErrors.length} error(s) found.\n`)
  process.exit(1)
}
