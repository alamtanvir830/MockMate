import type { MCATSection } from '../types'
import { cpPassages4_01to05 } from './chem-phys-p01-p05'
import { cpPassages4_06to10 } from './chem-phys-p06-p10'
import { cpDiscretes4 } from './chem-phys-discretes'

export const chemPhysSection4: MCATSection = {
  id: 'chem-phys',
  title: 'Chemical and Physical Foundations of Biological Systems',
  abbreviation: 'Chem/Phys',
  questionCount: 59,
  seededCount: 59,
  timeMinutes: 95,
  breakAfterMinutes: 10,
  breakType: 'optional',
  passages: [...cpPassages4_01to05, ...cpPassages4_06to10],
  discreteQuestions: cpDiscretes4,
}
