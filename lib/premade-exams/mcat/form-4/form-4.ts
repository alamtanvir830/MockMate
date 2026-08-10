import type { MCATForm } from '../types'
import { chemPhysSection4 } from './chem-phys'
import { carsSection4 } from './cars'
import { bioBiochemSection4 } from './bio-biochem'
import { psychSocSection4 } from './psych-soc'

export const mcatForm4: MCATForm = {
  id: 'mcat-form-4',
  title: 'MCAT Practice Exam Form 4',
  totalQuestions: 230,
  totalTimeMinutes: 375,
  disclaimer:
    'This is an unofficial MockMate MCAT-style practice exam. It is not affiliated with, endorsed by, or produced by the Association of American Medical Colleges (AAMC). All questions are original. "MCAT" is a registered trademark of the AAMC.',
  sections: [chemPhysSection4, carsSection4, bioBiochemSection4, psychSocSection4],
}
