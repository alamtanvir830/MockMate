import type { MCATSection } from '../types'
import { bioBiochemPassages3_01to05 } from './bio-biochem-p01-p05'
import { bioBiochemPassages3_06to10 } from './bio-biochem-p06-p10'
import { bioBiochemDiscretes3 } from './bio-biochem-discretes'

export const bioBiochemSection3: MCATSection = {
  id: 'bio-biochem',
  title: 'Biological and Biochemical Foundations of Living Systems',
  abbreviation: 'Bio/Biochem',
  questionCount: 59,
  seededCount: 59,
  timeMinutes: 95,
  breakAfterMinutes: 10,
  breakType: 'short',
  passages: [...bioBiochemPassages3_01to05, ...bioBiochemPassages3_06to10],
  discreteQuestions: bioBiochemDiscretes3,
}
