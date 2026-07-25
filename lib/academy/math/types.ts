// Math Academy skill type.
// Reuses DrillQuestion, GuidedExample, CommonTrap, KnowledgeCheck, and
// RuleTableRow from the shared academy types so the lesson UI can share
// rendering logic with the R&W Academy.

import type {
  DrillQuestion,
  GuidedExample,
  CommonTrap,
  KnowledgeCheck,
  RuleTableRow,
  AcademyChoice,
  AnswerLabel,
} from '../types'
import type { MathDomainSlug } from './skill-mapping'

export type { DrillQuestion, GuidedExample, CommonTrap, KnowledgeCheck, RuleTableRow }

export type DesmosClassification = 'recommended' | 'optional' | 'not-recommended'

export interface MathAcademySkill {
  slug: string
  title: string
  domain: MathDomainSlug

  // ── Lesson metadata ─────────────────────────────────────────────────────────
  objective?: string           // "By the end of this lesson, you will be able to…"
  estimatedMinutes?: number    // typical full-lesson completion time
  subskills?: string[]         // internal subskill names used for mastery breakdown
  desmosClassification?: DesmosClassification

  // ── Lesson stages ───────────────────────────────────────────────────────────
  overview: {
    whatItTests: string
    howItAppears: string
    whyStudentsMissIt: string
    whatToLookFor: string
    skillAnatomy?: string[]    // ordered list of components the student must identify
    keyFormulas?: string[]     // plain-text formula statements (no raw LaTeX)
    quickCheckQuestion?: {     // one-minute orientation check; does not count toward mastery
      stimulus?: string
      question: string
      choices: AcademyChoice[]
      correctAnswer: AnswerLabel
      explanation: string
    }
  }

  strategy: {
    intro?: string             // 1–2 sentence framing
    steps: string[]
    ruleTable?: RuleTableRow[] // situation | valid | example | invalid
    timeSavingTip: string
    whenNotToOverthink: string
    desmosDecision?: string    // when Desmos is faster vs. manual
    tryItQuestion?: {          // supported question immediately after strategy steps
      stimulus?: string
      question: string
      choices: AcademyChoice[]
      correctAnswer: AnswerLabel
      explanation: string
    }
  }

  commonTraps: CommonTrap[]    // uses shared type — supports miniExample and category
  guidedExamples: GuidedExample[]
  drillQuestions: DrillQuestion[]
  masteryQuestions?: DrillQuestion[]   // separate pool for the Mastery assessment; falls
                                       // back to drillQuestions when absent
  knowledgeChecks?: KnowledgeCheck[]
}
