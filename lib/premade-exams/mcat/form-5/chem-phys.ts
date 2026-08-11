import type { MCATSection } from '../types'
import { cpPassages5_01to05 } from './chem-phys-p01-p05'
import { cpPassages5_06to10 } from './chem-phys-p06-p10'
import { cpDiscretes5 } from './chem-phys-discretes'

export const chemPhysSection5: MCATSection = {
  id: 'chem-phys',
  title: 'Chemical and Physical Foundations of Biological Systems',
  abbreviation: 'Chem/Phys',
  questionCount: 59,
  seededCount: 59,
  timeMinutes: 95,
  breakAfterMinutes: 10,
  breakType: 'short',
  passages: [...cpPassages5_01to05, ...cpPassages5_06to10],
  discreteQuestions: cpDiscretes5,
}
