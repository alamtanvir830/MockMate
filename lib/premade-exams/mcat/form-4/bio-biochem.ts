import type { MCATSection } from '../types'
import { bbPassages4_01to05 } from './bio-biochem-p01-p05'
import { bbPassages4_06to10 } from './bio-biochem-p06-p10'
import { bbDiscretes4 } from './bio-biochem-discretes'

export const bioBiochemSection4: MCATSection = {
  id: 'bio-biochem',
  title: 'Biological and Biochemical Foundations of Living Systems',
  abbreviation: 'Bio/Biochem',
  questionCount: 59,
  seededCount: 59,
  timeMinutes: 95,
  breakAfterMinutes: 10,
  breakType: 'short',
  passages: [...bbPassages4_01to05, ...bbPassages4_06to10],
  discreteQuestions: bbDiscretes4,
}
