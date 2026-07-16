export type Difficulty = 'easy' | 'medium' | 'hard'
export type AnswerLabel = 'A' | 'B' | 'C' | 'D'

export interface AcademyChoice {
  label: AnswerLabel
  text: string
}

export interface GuidedStep {
  instruction: string // e.g. "Read the passage carefully"
  content: string // the explanation shown at this step
}

export interface GuidedExample {
  id: string
  stimulus?: string // passage or sentence(s)
  question: string
  steps: GuidedStep[] // reveal one at a time
  choices: AcademyChoice[]
  correctAnswer: AnswerLabel
  explanation: string
  wrongAnswerExplanations: Partial<Record<AnswerLabel, string>>
}

export interface DrillQuestion {
  id: string
  skillSlug: string
  subskill?: string
  difficulty: Difficulty
  stimulus?: string
  question: string
  choices: AcademyChoice[]
  correctAnswer: AnswerLabel
  explanation: string
  wrongAnswerExplanations: Partial<Record<AnswerLabel, string>>
  teachingPoint: string
}

export interface CommonTrap {
  title: string
  description: string
  avoidance: string
}

export interface AcademySkill {
  slug: string
  title: string
  section: 'reading' | 'writing'
  overview: {
    whatItTests: string
    howItAppears: string
    whyStudentsMissIt: string
    whatToLookFor: string
  }
  strategy: {
    steps: string[] // numbered decision process
    timeSavingTip: string
    whenNotToOverthink: string
  }
  commonTraps: CommonTrap[] // at least 4
  guidedExamples: GuidedExample[] // exactly 3
  drillQuestions: DrillQuestion[] // exactly 10
}
