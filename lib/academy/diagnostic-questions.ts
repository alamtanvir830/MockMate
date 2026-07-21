// Shared diagnostic question builder used by both the client quiz UI and server grading.
// Keep this file free of browser-only APIs so it runs safely in the Edge runtime.

import { allSkills } from './index'
import type { DrillQuestion } from './types'
import { getDomainForSkill } from './types'
import {
  DIAGNOSTIC_M1_QUESTIONS,
  DIAGNOSTIC_M2_EASY_QUESTIONS,
  DIAGNOSTIC_M2_HARD_QUESTIONS,
} from './diagnostic-questions-v2'

export const DIAGNOSTIC_VERSION = 1

// Re-export the v2 adaptive-diagnostic API so callers can import everything from
// this single module. The v1 exports above remain unchanged.
export {
  DIAGNOSTIC_V2_VERSION,
  M1_ROUTING_THRESHOLD,
  buildDiagnosticM1Questions,
  buildDiagnosticM2EasyQuestions,
  buildDiagnosticM2HardQuestions,
  routeToM2Branch,
} from './diagnostic-questions-v2'

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

// Built once on first call, then cached in module scope.
// Includes every v2 question across Module 1 and both Module 2 branches so the
// server can grade any submitted v2 response by ID.
let _registryV2: Map<string, DiagnosticQuestionMeta> | null = null

export function getDiagnosticV2Registry(): Map<string, DiagnosticQuestionMeta> {
  if (_registryV2) return _registryV2
  _registryV2 = new Map()
  const all: DrillQuestion[] = [
    ...DIAGNOSTIC_M1_QUESTIONS,
    ...DIAGNOSTIC_M2_EASY_QUESTIONS,
    ...DIAGNOSTIC_M2_HARD_QUESTIONS,
  ]
  for (const q of all) {
    const skill = allSkills.find(s => s.slug === q.skillSlug)
    _registryV2.set(q.id, {
      correctAnswer: q.correctAnswer,
      skillSlug: q.skillSlug,
      difficulty: q.difficulty,
      domainSlug: getDomainForSkill(q.skillSlug),
      section: skill?.section ?? 'reading',
    })
  }
  return _registryV2
}
