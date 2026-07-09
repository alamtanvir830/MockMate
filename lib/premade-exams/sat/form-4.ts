import type { SATForm } from './types'
import { f4RwModule1Questions } from './form-4-rw-module-1'
import { f4RwModule2EasyQuestions } from './form-4-rw-module-2-easy'
import { f4RwModule2HardQuestions } from './form-4-rw-module-2-hard'
import { f4MathModule1Questions } from './form-4-math-module-1'
import { f4MathModule2EasyQuestions } from './form-4-math-module-2-easy'
import { f4MathModule2HardQuestions } from './form-4-math-module-2-hard'

export const satForm4: SATForm = {
  id: 'sat-form-4',
  title: 'SAT Practice Test 4',
  description: 'Full-length adaptive SAT practice exam',
  disclaimer: 'This is an unofficial practice test created for educational purposes. It is not affiliated with or endorsed by College Board®.',
  totalQuestions: 98,
  totalTimeMinutes: 134,
  rwRoutingThreshold: 17,
  mathRoutingThreshold: 14,
  sections: [
    {
      id: 'reading-writing',
      title: 'Reading and Writing',
      totalQuestions: 54,
      totalTimeMinutes: 64,
      modules: [
        {
          id: 'f4-rw-module-1',
          title: 'Reading and Writing — Module 1',
          timeMinutes: 32,
          questionCount: 27,
          type: 'routing',
          questions: f4RwModule1Questions,
        },
        {
          id: 'f4-rw-module-2-easy',
          title: 'Reading and Writing — Module 2',
          timeMinutes: 32,
          questionCount: 27,
          type: 'easy',
          questions: f4RwModule2EasyQuestions,
        },
        {
          id: 'f4-rw-module-2-hard',
          title: 'Reading and Writing — Module 2',
          timeMinutes: 32,
          questionCount: 27,
          type: 'hard',
          questions: f4RwModule2HardQuestions,
        },
      ],
    },
    {
      id: 'math',
      title: 'Math',
      totalQuestions: 44,
      totalTimeMinutes: 70,
      modules: [
        {
          id: 'f4-math-module-1',
          title: 'Math — Module 1',
          timeMinutes: 35,
          questionCount: 22,
          type: 'routing',
          questions: f4MathModule1Questions,
        },
        {
          id: 'f4-math-module-2-easy',
          title: 'Math — Module 2',
          timeMinutes: 35,
          questionCount: 22,
          type: 'easy',
          questions: f4MathModule2EasyQuestions,
        },
        {
          id: 'f4-math-module-2-hard',
          title: 'Math — Module 2',
          timeMinutes: 35,
          questionCount: 22,
          type: 'hard',
          questions: f4MathModule2HardQuestions,
        },
      ],
    },
  ],
}
