// ── Question Bank Types ────────────────────────────────────────────────────

export type QBSection = 'reading-writing' | 'math'
export type QBQuestionType = 'multiple_choice' | 'grid_in'

export type RWDomain =
  | 'Craft and Structure'
  | 'Information and Ideas'
  | 'Expression of Ideas'
  | 'Standard English Conventions'

export type MathDomain =
  | 'Algebra'
  | 'Advanced Math'
  | 'Problem-Solving and Data Analysis'
  | 'Geometry and Trigonometry'

export type QBDomain = RWDomain | MathDomain
export type QBDifficulty = 'easy' | 'medium' | 'hard'
export type QBMistakeType = 'concept error' | 'trap answer' | 'careless' | 'time issue'

export interface QBChoice {
  label: 'A' | 'B' | 'C' | 'D'
  text: string
}

export interface QBGraphData {
  type: 'bar' | 'line' | 'scatter' | 'table' | 'coordinate_plane'
  title?: string
  // Table
  headers?: string[]
  rows?: string[][]
  // Bar / line
  labels?: string[]
  datasets?: { label: string; values: number[] }[]
  // Scatter / coordinate_plane axes
  xLabel?: string
  yLabel?: string
  xMin?: number
  xMax?: number
  yMin?: number
  yMax?: number
  gridStep?: number
  // Scatter data points
  points?: [number, number][]
  trendLine?: { slope: number; intercept: number; color?: string }
  // Coordinate plane lines
  lines?: Array<{
    label?: string
    points: [number, number][]
    color?: string
    dashed?: boolean
  }>
  namedPoints?: Array<{ x: number; y: number; label?: string; filled?: boolean }>
  // Legacy
  svgContent?: string
}

export interface QBQuestion {
  id: string
  test: 'SAT'
  section: QBSection
  domain: QBDomain
  skill: string
  subskill?: string
  difficulty: QBDifficulty
  timeTargetSeconds: number
  mistakeType: QBMistakeType
  questionType: QBQuestionType
  stimulus?: string
  /** Exact phrases in the stimulus to render with an underline */
  underlineTargets?: string[]
  graphData?: QBGraphData
  question: string
  choices?: QBChoice[]
  correctAnswer: string
  acceptableAnswers?: string[]
  explanation: string
  wrongAnswerExplanations?: Partial<Record<'A' | 'B' | 'C' | 'D', string>>
  teachingPoint: string
  relatedSkills: string[]
  scoringNotes?: string
  hasGraph?: boolean
  isWordProblem?: boolean
}

// ── Practice Set ──────────────────────────────────────────────────────────────

export interface QBPracticeSetConfig {
  section?: QBSection
  domains?: QBDomain[]
  skills?: string[]
  difficulties?: QBDifficulty[]
  count: number
  mode: 'browse' | 'personalized'
  sourceAttemptId?: string
}

export interface QBPracticeSetResult {
  id: string
  config: QBPracticeSetConfig
  questionIds: string[]
  answers: Record<string, string>
  timeSpentSeconds: Record<string, number>
  completedAt: string
}

// ── Domain accuracy (for Smart Practice Path) ─────────────────────────────────

export interface DomainAccuracy {
  domain: QBDomain
  correct: number
  total: number
  accuracy: number
}

export interface SkillAccuracy {
  skill: string
  domain: QBDomain
  correct: number
  total: number
  accuracy: number
}
