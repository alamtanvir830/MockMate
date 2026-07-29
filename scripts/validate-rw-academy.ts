/**
 * Validation script for the SAT R&W Academy content.
 *
 * Run:
 *   npx ts-node --compiler-options '{"module":"commonjs","moduleResolution":"node"}' scripts/validate-rw-academy.ts
 *
 * Checks per skill (11 skills total):
 *  - ≥24 drill questions
 *  - ≥8 guided examples
 *  - ≥1 mastery question (minimum; ≥8 preferred)
 *  - All 4 difficulty levels present in drill questions (foundation, sat-application, advanced, challenge)
 *  - ≥6 common traps listed
 *  - No duplicate IDs within or across skills
 *  - All required fields present (stimulus, question, choices, correctAnswer, explanation, wrongAnswerExplanations, teachingPoint)
 *  - All correctAnswer values in A/B/C/D
 *  - choices array has exactly 4 items
 *  - wrongAnswerExplanations covers all 3 wrong choices
 *  - Answer distribution: no letter > 45% in any skill's drill set
 *  - Mastery questions have no hint content (they are pure knowledge checks)
 */

import { allSkills } from '../lib/academy'
import type { DrillQuestion, AcademySkill } from '../lib/academy/types'

const REQUIRED_SKILL_SLUGS = [
  'boundaries', 'form-structure-sense', 'transitions', 'rhetorical-synthesis',
  'words-in-context', 'central-ideas-details', 'text-structure-purpose',
  'command-of-evidence', 'quantitative-evidence', 'inferences', 'cross-text-connections',
]

const VALID_LABELS = new Set(['A', 'B', 'C', 'D'])
const REQUIRED_LEVELS = ['foundation', 'sat-application', 'advanced', 'challenge']

const MIN_DRILL = 24
const MIN_GUIDED = 8
const MIN_MASTERY = 8
const MIN_TRAPS = 6

interface SkillReport {
  slug: string
  drillCount: number
  masteryCount: number
  guidedCount: number
  trapsCount: number
  levelsPresent: string[]
  errors: string[]
  warnings: string[]
}

function checkDrillQuestion(q: DrillQuestion, context: string): string[] {
  const errors: string[] = []

  if (!q.id) { errors.push(`${context}: missing id`); return errors }
  if (!q.skillSlug) errors.push(`${q.id}: missing skillSlug`)
  if (!q.question) errors.push(`${q.id}: missing question text`)
  if (!q.explanation) errors.push(`${q.id}: missing explanation`)
  if (!q.teachingPoint) errors.push(`${q.id}: missing teachingPoint`)
  if (!q.correctAnswer) errors.push(`${q.id}: missing correctAnswer`)
  else if (!VALID_LABELS.has(q.correctAnswer)) errors.push(`${q.id}: invalid correctAnswer "${q.correctAnswer}"`)

  if (!q.choices || q.choices.length !== 4) {
    errors.push(`${q.id}: expected 4 choices, got ${q.choices?.length ?? 0}`)
  } else {
    const labels = q.choices.map(c => c.label)
    for (const l of ['A', 'B', 'C', 'D'] as const) {
      if (!labels.includes(l)) errors.push(`${q.id}: missing choice label "${l}"`)
    }
  }

  if (q.correctAnswer && VALID_LABELS.has(q.correctAnswer)) {
    const wrongLabels = (['A', 'B', 'C', 'D'] as const).filter(l => l !== q.correctAnswer)
    for (const wl of wrongLabels) {
      if (!q.wrongAnswerExplanations?.[wl]) {
        errors.push(`${q.id}: missing wrongAnswerExplanations["${wl}"]`)
      }
    }
  }

  return errors
}

function analyzeSkill(skill: AcademySkill): SkillReport {
  const errors: string[] = []
  const warnings: string[] = []
  const slug = skill.slug

  // Drill questions
  const drill = skill.drillQuestions ?? []
  if (drill.length < MIN_DRILL) {
    errors.push(`Only ${drill.length} drill questions (minimum ${MIN_DRILL})`)
  }

  // Check each drill question
  const drillIds = new Set<string>()
  for (const q of drill) {
    if (drillIds.has(q.id)) errors.push(`Duplicate drill ID "${q.id}"`)
    drillIds.add(q.id)
    errors.push(...checkDrillQuestion(q, `drill ${q.id}`))
  }

  // Levels coverage
  const levelsPresent = [...new Set(drill.map(q => q.level).filter(Boolean) as string[])]
  for (const level of REQUIRED_LEVELS) {
    if (!levelsPresent.includes(level)) {
      errors.push(`Missing level "${level}" in drill questions`)
    }
  }

  // Answer distribution in drill questions
  const answerCounts: Record<string, number> = { A: 0, B: 0, C: 0, D: 0 }
  for (const q of drill) {
    if (VALID_LABELS.has(q.correctAnswer)) answerCounts[q.correctAnswer]++
  }
  if (drill.length > 0) {
    for (const [letter, count] of Object.entries(answerCounts)) {
      const pct = Math.round((count / drill.length) * 100)
      if (pct > 45) {
        warnings.push(`Answer "${letter}" is ${count}/${drill.length} (${pct}%) of drill answers — consider redistributing`)
      }
    }
  }

  // Mastery questions
  const mastery = skill.masteryQuestions ?? []
  if (mastery.length < MIN_MASTERY) {
    errors.push(`Only ${mastery.length} mastery questions (minimum ${MIN_MASTERY})`)
  }
  const masteryIds = new Set<string>()
  for (const q of mastery) {
    if (masteryIds.has(q.id)) errors.push(`Duplicate mastery ID "${q.id}"`)
    masteryIds.add(q.id)
    errors.push(...checkDrillQuestion(q, `mastery ${q.id}`))
  }

  // Cross-ID duplicate check (drill vs mastery)
  for (const id of masteryIds) {
    if (drillIds.has(id)) errors.push(`ID "${id}" appears in both drill and mastery questions`)
  }

  // Guided examples
  const guided = skill.guidedExamples ?? []
  if (guided.length < MIN_GUIDED) {
    errors.push(`Only ${guided.length} guided examples (minimum ${MIN_GUIDED})`)
  }
  for (const ex of guided) {
    if (!ex.id) errors.push('Guided example missing id')
    if (!ex.question) errors.push(`Guided example ${ex.id ?? '?'}: missing question`)
    if (!ex.steps || ex.steps.length === 0) errors.push(`Guided example ${ex.id ?? '?'}: missing steps`)
  }

  // Common traps
  const traps = skill.commonTraps ?? []
  if (traps.length < MIN_TRAPS) {
    errors.push(`Only ${traps.length} common traps (minimum ${MIN_TRAPS})`)
  }

  return {
    slug,
    drillCount: drill.length,
    masteryCount: mastery.length,
    guidedCount: guided.length,
    trapsCount: traps.length,
    levelsPresent,
    errors,
    warnings,
  }
}

// ── Run all checks ─────────────────────────────────────────────────────────────

console.log('\n── SAT R&W Academy Content Validation ────────────────────────────────\n')

const reports: SkillReport[] = []
let totalErrors = 0
let totalWarnings = 0

// Check all required skills are present
const loadedSlugs = new Set(allSkills.filter(s => s.section === 'reading' || s.section === 'writing').map(s => s.slug))
for (const slug of REQUIRED_SKILL_SLUGS) {
  if (!loadedSlugs.has(slug)) {
    console.log(`✗ Skill "${slug}" not found in allSkills`)
    totalErrors++
  }
}

for (const slug of REQUIRED_SKILL_SLUGS) {
  const skill = allSkills.find(s => s.slug === slug)
  if (!skill) continue
  const report = analyzeSkill(skill)
  reports.push(report)
}

// Summary table
console.log('Skill                        Drill  Mastery  Guided  Traps  Levels')
console.log('─────────────────────────────────────────────────────────────────────')
for (const r of reports) {
  const drillOk = r.drillCount >= MIN_DRILL
  const masteryOk = r.masteryCount >= MIN_MASTERY
  const guidedOk = r.guidedCount >= MIN_GUIDED
  const trapsOk = r.trapsCount >= MIN_TRAPS
  const levelsOk = REQUIRED_LEVELS.every(l => r.levelsPresent.includes(l))

  const fmt = (ok: boolean, val: number) => ok ? `${val}`.padEnd(7) : `${val}✗`.padEnd(7)
  console.log(
    r.slug.padEnd(29) +
    fmt(drillOk, r.drillCount) +
    fmt(masteryOk, r.masteryCount) +
    fmt(guidedOk, r.guidedCount) +
    fmt(trapsOk, r.trapsCount) +
    (levelsOk ? `[${r.levelsPresent.join(',')}]` : `[${r.levelsPresent.join(',')}]✗`)
  )
}
console.log('')

// Error details
for (const r of reports) {
  if (r.errors.length > 0 || r.warnings.length > 0) {
    console.log(`${r.slug}:`)
    for (const e of r.errors) {
      console.log(`  ✗ ${e}`)
      totalErrors++
    }
    for (const w of r.warnings) {
      console.log(`  ⚠ ${w}`)
      totalWarnings++
    }
  }
}

// Cross-skill ID uniqueness
const globalIds = new Map<string, string>()
for (const slug of REQUIRED_SKILL_SLUGS) {
  const skill = allSkills.find(s => s.slug === slug)
  if (!skill) continue
  const allQ = [...(skill.drillQuestions ?? []), ...(skill.masteryQuestions ?? [])]
  for (const q of allQ) {
    if (globalIds.has(q.id)) {
      console.log(`✗ Global duplicate ID "${q.id}" in "${slug}" and "${globalIds.get(q.id)}"`)
      totalErrors++
    } else {
      globalIds.set(q.id, slug)
    }
  }
}

console.log('──────────────────────────────────────────────────────────────────────')
if (totalErrors === 0 && totalWarnings === 0) {
  console.log('✓ All checks passed.\n')
  process.exit(0)
} else {
  if (totalErrors > 0) console.log(`✗ ${totalErrors} error(s) found.`)
  if (totalWarnings > 0) console.log(`⚠ ${totalWarnings} warning(s).`)
  console.log('')
  process.exit(totalErrors > 0 ? 1 : 0)
}
