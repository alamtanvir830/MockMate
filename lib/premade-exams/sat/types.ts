// ─── SAT Practice Test Types ──────────────────────────────────────────────────

export type RWDomain =
  | 'Craft and Structure'
  | 'Information and Ideas'
  | 'Standard English Conventions'
  | 'Expression of Ideas'

export type RWSkill =
  | 'Words in Context'
  | 'Text Structure and Purpose'
  | 'Cross-Text Connections'
  | 'Central Ideas and Details'
  | 'Command of Evidence'
  | 'Inferences'
  | 'Rhetorical Synthesis'
  | 'Transitions'
  | 'Boundaries'
  | 'Form, Structure, and Sense'

export type MathDomain =
  | 'Algebra'
  | 'Advanced Math'
  | 'Problem-Solving and Data Analysis'
  | 'Geometry and Trigonometry'

export type Difficulty = 'easy' | 'medium' | 'hard'
export type ModuleType = 'routing' | 'easy' | 'hard'
export type ChoiceLabel = 'A' | 'B' | 'C' | 'D'

export interface Choice {
  label: ChoiceLabel
  text: string
}

export interface RWQuestion {
  id: string
  section: 'reading-writing'
  moduleId: string
  domain: RWDomain
  skill: RWSkill
  difficulty: Difficulty
  stimulus: string
  question: string
  choices: Choice[]
  correctAnswer: ChoiceLabel
  explanation: string
  wrongAnswerExplanations: Partial<Record<ChoiceLabel, string>>
}

export interface MathMCQuestion {
  id: string
  section: 'math'
  moduleId: string
  domain: MathDomain
  skill: string
  difficulty: Difficulty
  type: 'multiple_choice'
  stimulus?: string
  question: string
  choices: Choice[]
  correctAnswer: ChoiceLabel
  explanation: string
  wrongAnswerExplanations: Partial<Record<ChoiceLabel, string>>
}

export interface MathGridInQuestion {
  id: string
  section: 'math'
  moduleId: string
  domain: MathDomain
  skill: string
  difficulty: Difficulty
  type: 'grid_in'
  stimulus?: string
  question: string
  correctAnswer: string
  acceptableAnswers: string[]
  explanation: string
  scoringNotes?: string
}

export type MathQuestion = MathMCQuestion | MathGridInQuestion
export type SATQuestion = RWQuestion | MathQuestion

export interface SATModule {
  id: string
  title: string
  timeMinutes: number
  questionCount: number
  type: ModuleType
  questions: SATQuestion[]
}

export interface SATSection {
  id: 'reading-writing' | 'math'
  title: string
  totalQuestions: number
  totalTimeMinutes: number
  modules: [SATModule, SATModule, SATModule]  // routing, easy, hard
}

export interface SATForm {
  id: string
  title: string
  description: string
  disclaimer: string
  totalQuestions: number
  totalTimeMinutes: number
  rwRoutingThreshold: number   // score >= this → hard Module 2
  mathRoutingThreshold: number
  sections: [SATSection, SATSection]  // [rw, math]
}
