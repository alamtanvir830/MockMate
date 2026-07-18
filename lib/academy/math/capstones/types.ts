import type { DrillQuestion } from '../../types'

export interface MathCapstoneQuestion extends DrillQuestion {
  capstoneId: string
  module: 1 | 2
  questionNumber: number
}

export interface MathCapstoneInfo {
  id: string
  title: string
  description: string
  module1Questions: MathCapstoneQuestion[]
  module2Questions: MathCapstoneQuestion[]
}
