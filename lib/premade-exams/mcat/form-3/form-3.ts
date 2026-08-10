import type { MCATForm } from '../types'
import { chemPhysSection3 } from './chem-phys'
import { carsSection3 } from './cars'
import { bioBiochemSection3 } from './bio-biochem'
import { psychSocSection3 } from './psych-soc'

export const mcatForm3: MCATForm = {
  id: 'mcat-form-3',
  title: 'MCAT Practice Exam Form 3',
  totalQuestions: 230,
  totalTimeMinutes: 375,
  disclaimer:
    'This is an unofficial MockMate MCAT-style practice exam. It is not affiliated with, endorsed by, or produced by the Association of American Medical Colleges (AAMC). All questions are original. "MCAT" is a registered trademark of the AAMC.',
  sections: [chemPhysSection3, carsSection3, bioBiochemSection3, psychSocSection3],
}
