import type { MCATForm } from '../types'
import { chemPhysSection5 } from './chem-phys'
import { carsSection5 } from './cars'
import { bioBiochemSection5 } from './bio-biochem'
import { psychSocSection5 } from './psych-soc'

export const mcatForm5: MCATForm = {
  id: 'mcat-form-5',
  title: 'MCAT Practice Exam Form 5',
  totalQuestions: 230,
  totalTimeMinutes: 375,
  disclaimer:
    'This is an unofficial MockMate MCAT-style practice exam. It is not affiliated with, endorsed by, or produced by the Association of American Medical Colleges (AAMC). All questions are original. "MCAT" is a registered trademark of the AAMC.',
  sections: [chemPhysSection5, carsSection5, bioBiochemSection5, psychSocSection5],
}
