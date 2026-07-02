// ─── MCAT Practice Exam Types ──────────────────────────────────────────────────

export type MCATChoiceLabel = 'A' | 'B' | 'C' | 'D'

export interface MCATChoice {
  label: MCATChoiceLabel
  text: string
}

export type MCATScientificSkill = 'Skill 1' | 'Skill 2' | 'Skill 3' | 'Skill 4'
export type MCATDifficulty = 'easy' | 'medium' | 'hard'
export type MCATQuestionType = 'passage' | 'discrete'

export interface MCATTableData {
  type: 'table'
  title?: string
  headers: string[]
  rows: string[][]
}

export interface MCATFigureData {
  type: 'figure'
  title?: string
  description: string  // text description of the figure for Phase 1
}

export type MCATFigure = MCATTableData | MCATFigureData

export interface MCATQuestion {
  id: string
  sectionId: string
  passageId: string | null
  questionType: MCATQuestionType
  discipline: string
  contentCategory: string
  foundationalConcept: string
  scientificSkill: MCATScientificSkill
  difficulty: MCATDifficulty
  question: string
  choices: MCATChoice[]
  correctAnswer: MCATChoiceLabel
  explanation: string
  wrongAnswerExplanations: Partial<Record<MCATChoiceLabel, string>>
  teachingPoint: string
  relatedTopics: string[]
}

export interface MCATPassage {
  id: string
  sectionId: string
  title: string
  passageText: string
  figures?: MCATFigure[]
  questions: MCATQuestion[]
}

export interface MCATSection {
  id: string
  title: string
  abbreviation: string
  questionCount: number       // full exam count (59/53/59/59)
  seededCount: number         // Phase 1 seeded count
  timeMinutes: number
  breakAfterMinutes: number | null  // null = no break after last section
  breakType: 'short' | 'long' | null
  passages: MCATPassage[]
  discreteQuestions: MCATQuestion[]
}

export interface MCATForm {
  id: string
  title: string
  totalQuestions: number
  totalTimeMinutes: number
  disclaimer: string
  sections: MCATSection[]
}

// ─── Attempt types ─────────────────────────────────────────────────────────────

export interface MCATSectionResult {
  sectionId: string
  correct: number
  total: number
  scaledScore: number
}

export interface MCATAIFeedback {
  whatWentWell: string
  strongestSection: string
  weakestSection: string
  weakestDisciplines: string[]
  weakestContentCategories: string[]
  weakestScientificSkills: string[]
  passageVsDiscrete: string
  carsStrategy: string
  contentAreasToReview: string[]
  scienceReasoningToReview: string[]
  recommendedNextSteps: string
}

export interface MCATAttempt {
  id: string
  examId: string
  examTitle: string
  completedAt: string
  // Section scaled scores (118-132 each)
  chemPhysScore: number
  carsScore: number
  bioBiochemScore: number
  psychSocScore: number
  totalScore: number
  // Raw scores per section
  chemPhysCorrect: number
  chemPhysTotal: number
  carsCorrect: number
  carsTotal: number
  bioBiochemCorrect: number
  bioBiochemTotal: number
  psychSocCorrect: number
  psychSocTotal: number
  // All answers: questionId → choice letter
  answers: Record<string, string>
  bookmarks: string[]
  aiFeedback: MCATAIFeedback | null
}
