import type { AnswerLabel, Difficulty } from '../types'

export interface CapstoneQuestion {
  id: string
  capstoneId: string
  module: 1 | 2
  questionNumber: number
  skillSlug: string
  subskill?: string
  difficulty: Difficulty
  stimulus?: string
  question: string
  choices: { label: AnswerLabel; text: string }[]
  correctAnswer: AnswerLabel
  explanation: string
  wrongAnswerExplanations: Partial<Record<AnswerLabel, string>>
  teachingPoint: string
  contentVersion: number
}

export interface CapstoneInfo {
  id: 'capstone-1' | 'capstone-2' | 'capstone-3'
  title: string
  description: string
  module1Questions: CapstoneQuestion[]
  module2Questions: CapstoneQuestion[]
}
