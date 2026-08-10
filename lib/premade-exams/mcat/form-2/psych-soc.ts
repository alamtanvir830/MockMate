import type { MCATSection } from '../types'
import { psPassages01to05 } from './psych-soc-p01-p05'
import { psPassages06to09 } from './psych-soc-p06-p09'
import { psDiscretes } from './psych-soc-discretes'

export const psychSocSection2: MCATSection = {
  id: 'psych-soc',
  title: 'Psychological, Social, and Biological Foundations of Behavior',
  abbreviation: 'Psych/Soc',
  questionCount: 59,
  seededCount: 59,
  timeMinutes: 95,
  breakAfterMinutes: null,
  breakType: null,
  passages: [...psPassages01to05, ...psPassages06to09],
  discreteQuestions: psDiscretes,
}
