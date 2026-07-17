// Shared diagnostic question builder used by both the client quiz UI and server grading.
// Keep this file free of browser-only APIs so it runs safely in the Edge runtime.

import { allSkills } from './index'
import type { DrillQuestion } from './types'
import { getDomainForSkill } from './types'

export const DIAGNOSTIC_VERSION = 1

const READING_SKILL_SLUGS = [
  'words-in-context',
  'central-ideas-details',
  'text-structure-purpose',
  'command-of-evidence',
  'quantitative-evidence',
  'inferences',
  'cross-text-connections',
]

const WRITING_SKILL_SLUGS = [
  'boundaries',
  'form-structure-sense',
  'transitions',
  'rhetorical-synthesis',
]

// Deterministic: same inputs always produce the same question list.
// Reading:  indices 0 (easy) and 9 (hard) per skill → 14 questions
// Writing:  indices 0 (easy), 4 (medium), 9 (hard) per skill → 12 questions
// Total:    26 questions
export function buildDiagnosticQuestions(): DrillQuestion[] {
  const questions: DrillQuestion[] = []
  for (const slug of READING_SKILL_SLUGS) {
    const skill = allSkills.find(s => s.slug === slug)
    if (!skill) continue
    const dqs = skill.drillQuestions
    if (dqs[0]) questions.push(dqs[0])
    if (dqs[9]) questions.push(dqs[9])
  }
  for (const slug of WRITING_SKILL_SLUGS) {
    const skill = allSkills.find(s => s.slug === slug)
    if (!skill) continue
    const dqs = skill.drillQuestions
    if (dqs[0]) questions.push(dqs[0])
    if (dqs[4]) questions.push(dqs[4])
    if (dqs[9]) questions.push(dqs[9])
  }
  return questions
}

export interface DiagnosticQuestionMeta {
  correctAnswer: string
  skillSlug: string
  difficulty: string
  domainSlug: string | null
  section: 'reading' | 'writing'
}

// Built once on first call, then cached in module scope.
let _registry: Map<string, DiagnosticQuestionMeta> | null = null

export function getDiagnosticRegistry(): Map<string, DiagnosticQuestionMeta> {
  if (_registry) return _registry
  const questions = buildDiagnosticQuestions()
  _registry = new Map()
  for (const q of questions) {
    const skill = allSkills.find(s => s.slug === q.skillSlug)
    _registry.set(q.id, {
      correctAnswer: q.correctAnswer,
      skillSlug: q.skillSlug,
      difficulty: q.difficulty,
      domainSlug: getDomainForSkill(q.skillSlug),
      section: skill?.section ?? 'reading',
    })
  }
  return _registry
}
