import type { MCATSection } from '../types'
import { psPassages4_01to05 } from './psych-soc-p01-p05'
import { psPassages4_06to09 } from './psych-soc-p06-p09'
import { psDiscretes4 } from './psych-soc-discretes'

export const psychSocSection4: MCATSection = {
  id: 'psych-soc',
  title: 'Psychological, Social, and Biological Foundations of Behavior',
  abbreviation: 'Psych/Soc',
  questionCount: 59,
  seededCount: 59,
  timeMinutes: 95,
  breakAfterMinutes: 0,
  breakType: 'none',
  passages: [...psPassages4_01to05, ...psPassages4_06to09],
  discreteQuestions: psDiscretes4,
}
