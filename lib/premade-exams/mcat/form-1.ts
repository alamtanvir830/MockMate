import type { MCATForm } from './types'
import { chemPhysSection } from './form-1-chem-phys'
import { carsSection } from './form-1-cars'
import { bioBiochemSection } from './form-1-bio-biochem'
import { psychSocSection } from './form-1-psych-soc'

export const mcatForm1: MCATForm = {
  id: 'mcat-form-1',
  title: 'MCAT Practice Exam Form 1',
  totalQuestions: 230,
  totalTimeMinutes: 375,
  disclaimer:
    'This is an unofficial MockMate MCAT-style practice exam. It is not affiliated with, endorsed by, or produced by the Association of American Medical Colleges (AAMC). All questions are original. "MCAT" is a registered trademark of the AAMC.',
  sections: [chemPhysSection, carsSection, bioBiochemSection, psychSocSection],
}
