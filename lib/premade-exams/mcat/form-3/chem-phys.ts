import type { MCATSection } from '../types'
import { chemPhysPassages3_01to05 } from './chem-phys-p01-p05'
import { chemPhysPassages3_06to10 } from './chem-phys-p06-p10'
import { chemPhysDiscretes3 } from './chem-phys-discretes'

export const chemPhysSection3: MCATSection = {
  id: 'chem-phys',
  title: 'Chemical and Physical Foundations of Biological Systems',
  abbreviation: 'Chem/Phys',
  questionCount: 59,
  seededCount: 59,
  timeMinutes: 95,
  breakAfterMinutes: 10,
  breakType: 'short',
  passages: [...chemPhysPassages3_01to05, ...chemPhysPassages3_06to10],
  discreteQuestions: chemPhysDiscretes3,
}
