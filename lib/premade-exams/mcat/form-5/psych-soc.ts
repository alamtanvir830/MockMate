import type { MCATSection } from '../types'
import { psPassages5_01to05 } from './psych-soc-p01-p05'
import { psPassages5_06to09 } from './psych-soc-p06-p09'
import { psDiscretes5 } from './psych-soc-discretes'

export const psychSocSection5: MCATSection = {
  id: 'psych-soc',
  title: 'Psychological, Social, and Biological Foundations of Behavior',
  abbreviation: 'Psych/Soc',
  questionCount: 59,
  seededCount: 59,
  timeMinutes: 95,
  breakAfterMinutes: 0,
  breakType: null,
  passages: [...psPassages5_01to05, ...psPassages5_06to09],
  discreteQuestions: psDiscretes5,
}
