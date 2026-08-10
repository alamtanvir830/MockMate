import type { MCATSection } from '../types'
import { psPassages3_01to05 } from './psych-soc-p01-p05'
import { psPassages3_06to09 } from './psych-soc-p06-p09'
import { psDiscretes3 } from './psych-soc-discretes'

export const psychSocSection3: MCATSection = {
  id: 'psych-soc',
  title: 'Psychological, Social, and Biological Foundations of Behavior',
  abbreviation: 'Psych/Soc',
  questionCount: 59,
  seededCount: 59,
  timeMinutes: 95,
  breakAfterMinutes: 0,
  breakType: 'none',
  passages: [...psPassages3_01to05, ...psPassages3_06to09],
  discreteQuestions: psDiscretes3,
}
