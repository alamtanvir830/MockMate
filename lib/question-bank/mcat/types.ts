export type MCATQBSection = 'chem-phys' | 'cars' | 'bio-biochem' | 'psych-soc'
export type MCATQBDifficulty = 'easy' | 'medium' | 'hard'
export type MCATQBQuestionType = 'passage' | 'discrete'
export type MCATQBSkill = 'Skill 1' | 'Skill 2' | 'Skill 3' | 'Skill 4'

export interface MCATQBTableData {
  headers: string[]
  rows: string[][]
  caption?: string
}

export interface MCATQBQuestion {
  id: string
  test: 'MCAT'
  section: MCATQBSection
  discipline: string
  contentCategory: string
  foundationalConcept: string
  scientificSkill: MCATQBSkill
  difficulty: MCATQBDifficulty
  questionType: MCATQBQuestionType
  passageText?: string
  tableData?: MCATQBTableData
  question: string
  choices: { label: 'A' | 'B' | 'C' | 'D'; text: string }[]
  correctAnswer: 'A' | 'B' | 'C' | 'D'
  explanation: string
  wrongAnswerExplanations: Partial<Record<'A' | 'B' | 'C' | 'D', string>>
  teachingPoint: string
  relatedTopics: string[]
}

export interface MCATQBPracticeSetResult {
  id: string
  questionIds: string[]
  answers: Record<string, string>
  timeSpentSeconds: Record<string, number>
  completedAt: string
  config: {
    section?: MCATQBSection
    difficulties?: MCATQBDifficulty[]
    skills?: MCATQBSkill[]
    count: number
  }
}
