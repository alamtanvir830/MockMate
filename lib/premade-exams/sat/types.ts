// ─── SAT Practice Test Types ──────────────────────────────────────────────────

// ─── Graph Data Types ─────────────────────────────────────────────────────────

export interface CoordinatePlaneData {
  type: 'coordinate_plane'
  xMin: number
  xMax: number
  yMin: number
  yMax: number
  gridStep?: number
  xLabel?: string
  yLabel?: string
  lines?: Array<{
    label?: string
    points: [number, number][]
    color?: string
    dashed?: boolean
  }>
  points?: Array<{
    x: number
    y: number
    label?: string
    filled?: boolean
  }>
}

export interface ScatterPlotData {
  type: 'scatter'
  xLabel?: string
  yLabel?: string
  title?: string
  xMin?: number
  xMax?: number
  yMin?: number
  yMax?: number
  points: [number, number][]
  trendLine?: { slope: number; intercept: number; color?: string }
}

export interface BarChartData {
  type: 'bar'
  title?: string
  xLabel?: string
  yLabel?: string
  labels: string[]
  values: number[]
}

export interface TableGraphData {
  type: 'table'
  title?: string
  headers: string[]
  rows: string[][]
}

export type GeometryElement =
  | { kind: 'poly'; pts: [number, number][]; fill?: string; stroke?: string }
  | { kind: 'right_angle'; v: [number, number]; a: [number, number]; b: [number, number] }
  | { kind: 'arc'; center: [number, number]; from: [number, number]; to: [number, number]; r?: number; label?: string }
  | { kind: 'circle'; cx: number; cy: number; r: number; fill?: string; stroke?: string }
  | { kind: 'label'; x: number; y: number; text: string; dx?: number; dy?: number; anchor?: 'start' | 'middle' | 'end'; weight?: string; size?: number }
  | { kind: 'point'; x: number; y: number; label?: string; dx?: number; dy?: number }
  | { kind: 'seg'; p1: [number, number]; p2: [number, number]; stroke?: string; dashed?: boolean }

export interface GeometryFigureData {
  type: 'geometry'
  title?: string
  viewBox: { xMin: number; xMax: number; yMin: number; yMax: number }
  elements: GeometryElement[]
}

export type SATGraphData = CoordinatePlaneData | ScatterPlotData | BarChartData | TableGraphData | GeometryFigureData

// ─── Domain / Skill / Difficulty ─────────────────────────────────────────────

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
  /** Optional rendered table/graph for data-based RW questions (e.g. Command of Evidence) */
  graphData?: SATGraphData
  /** Exact phrases in the stimulus that the question refers to as "underlined" */
  underlineTargets?: string[]
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
  graphData?: SATGraphData
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
  graphData?: SATGraphData
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
