import type { MCATSection } from '../types'
import { bbPassages01to05 } from './bio-biochem-p01-p05'
import { bbPassages06to10 } from './bio-biochem-p06-p10'
import { bbDiscretes } from './bio-biochem-discretes'

export const bioBiochemSection2: MCATSection = {
  id: 'bio-biochem',
  title: 'Biological and Biochemical Foundations of Living Systems',
  abbreviation: 'Bio/Biochem',
  questionCount: 59,
  seededCount: 59,
  timeMinutes: 95,
  breakAfterMinutes: 10,
  breakType: 'short',
  passages: [...bbPassages01to05, ...bbPassages06to10],
  discreteQuestions: bbDiscretes,
}
