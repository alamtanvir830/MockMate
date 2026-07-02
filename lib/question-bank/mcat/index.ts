export { chemPhysQuestions } from './chem-phys'
export { carsQuestions } from './cars'
export { bioBiochemQuestions } from './bio-biochem'
export { psychSocQuestions } from './psych-soc'

import { chemPhysQuestions } from './chem-phys'
import { carsQuestions } from './cars'
import { bioBiochemQuestions } from './bio-biochem'
import { psychSocQuestions } from './psych-soc'
import type { MCATQBQuestion, MCATQBSection } from './types'

export const allMCATQBQuestions: MCATQBQuestion[] = [
  ...chemPhysQuestions,
  ...carsQuestions,
  ...bioBiochemQuestions,
  ...psychSocQuestions,
]

export const MCAT_QB_SECTIONS: { value: MCATQBSection; label: string; count: number }[] = [
  { value: 'chem-phys', label: 'Chem/Phys', count: chemPhysQuestions.length },
  { value: 'cars', label: 'CARS', count: carsQuestions.length },
  { value: 'bio-biochem', label: 'Bio/Biochem', count: bioBiochemQuestions.length },
  { value: 'psych-soc', label: 'Psych/Soc', count: psychSocQuestions.length },
]

export const MCAT_QB_DISCIPLINES: Record<MCATQBSection, string[]> = {
  'chem-phys': ['General Chemistry', 'Physics', 'Organic Chemistry', 'Biochemistry'],
  'cars': ['Philosophy', 'Arts and Humanities', 'Social Sciences', 'Ethics'],
  'bio-biochem': ['Biology', 'Biochemistry', 'Genetics', 'Physiology'],
  'psych-soc': ['Psychology', 'Sociology'],
}
