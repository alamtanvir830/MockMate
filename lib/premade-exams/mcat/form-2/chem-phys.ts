import type { MCATSection } from '../types'
import { cpPassages01to05 } from './chem-phys-p01-p05'
import { cpPassages06to10 } from './chem-phys-p06-p10'
import { cpDiscretes } from './chem-phys-discretes'

export const chemPhysSection2: MCATSection = {
  id: 'chem-phys',
  title: 'Chemical and Physical Foundations of Biological Systems',
  abbreviation: 'Chem/Phys',
  questionCount: 59,
  seededCount: 59,
  timeMinutes: 95,
  breakAfterMinutes: 10,
  breakType: 'short',
  passages: [...cpPassages01to05, ...cpPassages06to10],
  discreteQuestions: cpDiscretes,
}
