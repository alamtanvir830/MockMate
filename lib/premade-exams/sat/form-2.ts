import type { SATForm } from './types'
import { f2RwModule1Questions } from './form-2-rw-module-1'
import { f2RwModule2EasyQuestions } from './form-2-rw-module-2-easy'
import { f2RwModule2HardQuestions } from './form-2-rw-module-2-hard'
import { f2MathModule1Questions } from './form-2-math-module-1'
import { f2MathModule2EasyQuestions } from './form-2-math-module-2-easy'
import { f2MathModule2HardQuestions } from './form-2-math-module-2-hard'

export const satForm2: SATForm = {
  id: 'sat-form-2',
  title: 'SAT Practice Test 2',
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
          id: 'f2-rw-module-1',
          title: 'Reading and Writing — Module 1',
          timeMinutes: 32,
          questionCount: 27,
          type: 'routing',
          questions: f2RwModule1Questions,
        },
        {
          id: 'f2-rw-module-2-easy',
          title: 'Reading and Writing — Module 2',
          timeMinutes: 32,
          questionCount: 27,
          type: 'easy',
          questions: f2RwModule2EasyQuestions,
        },
        {
          id: 'f2-rw-module-2-hard',
          title: 'Reading and Writing — Module 2',
          timeMinutes: 32,
          questionCount: 27,
          type: 'hard',
          questions: f2RwModule2HardQuestions,
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
          id: 'f2-math-module-1',
          title: 'Math — Module 1',
          timeMinutes: 35,
          questionCount: 22,
          type: 'routing',
          questions: f2MathModule1Questions,
        },
        {
          id: 'f2-math-module-2-easy',
          title: 'Math — Module 2',
          timeMinutes: 35,
          questionCount: 22,
          type: 'easy',
          questions: f2MathModule2EasyQuestions,
        },
        {
          id: 'f2-math-module-2-hard',
          title: 'Math — Module 2',
          timeMinutes: 35,
          questionCount: 22,
          type: 'hard',
          questions: f2MathModule2HardQuestions,
        },
      ],
    },
  ],
}
