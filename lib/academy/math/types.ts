// Math Academy skill type.
// Reuses DrillQuestion and GuidedExample from the shared academy types
// so the lesson UI can share rendering logic.

import type { DrillQuestion, GuidedExample } from '../types'
import type { MathDomainSlug } from './skill-mapping'

export type { DrillQuestion, GuidedExample }

export interface MathAcademySkill {
  slug: string
  title: string
  domain: MathDomainSlug
  overview: {
    whatItTests: string
    howItAppears: string
    whyStudentsMissIt: string
    whatToLookFor: string
  }
  strategy: {
    steps: string[]
    timeSavingTip: string
    whenNotToOverthink: string
  }
  commonTraps: { title: string; description: string; avoidance: string }[]
  guidedExamples: GuidedExample[]
  drillQuestions: DrillQuestion[]
}
