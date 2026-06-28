import type { SATForm } from './types'
import { rwModule1Questions } from './rw-module-1'
import { rwModule2EasyQuestions } from './rw-module-2-easy'
import { rwModule2HardQuestions } from './rw-module-2-hard'
import { mathModule1Questions } from './math-module-1'
import { mathModule2EasyQuestions } from './math-module-2-easy'
import { mathModule2HardQuestions } from './math-module-2-hard'

export const satForm1: SATForm = {
  id: 'sat-form-1',
  title: 'SAT Practice Test 1',
  description: 'Full-length adaptive SAT practice exam',
  disclaimer: 'This is an unofficial practice test created for educational purposes. It is not affiliated with or endorsed by College Board®.',
  totalQuestions: 98,          // 27+27 RW + 22+22 Math (student sees routing + one M2)
  totalTimeMinutes: 134,       // 32 + 32 RW + 35 + 35 Math
  rwRoutingThreshold: 14,      // ≥ 14/27 correct in M1 → Hard M2
  mathRoutingThreshold: 11,    // ≥ 11/22 correct in M1 → Hard M2
  sections: [
    {
      id: 'reading-writing',
      title: 'Reading and Writing',
      totalQuestions: 54,
      totalTimeMinutes: 64,
      modules: [
        {
          id: 'rw-module-1',
          title: 'Reading and Writing — Module 1',
          timeMinutes: 32,
          questionCount: 27,
          type: 'routing',
          questions: rwModule1Questions,
        },
        {
          id: 'rw-module-2-easy',
          title: 'Reading and Writing — Module 2',
          timeMinutes: 32,
          questionCount: 27,
          type: 'easy',
          questions: rwModule2EasyQuestions,
        },
        {
          id: 'rw-module-2-hard',
          title: 'Reading and Writing — Module 2',
          timeMinutes: 32,
          questionCount: 27,
          type: 'hard',
          questions: rwModule2HardQuestions,
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
          id: 'math-module-1',
          title: 'Math — Module 1',
          timeMinutes: 35,
          questionCount: 22,
          type: 'routing',
          questions: mathModule1Questions,
        },
        {
          id: 'math-module-2-easy',
          title: 'Math — Module 2',
          timeMinutes: 35,
          questionCount: 22,
          type: 'easy',
          questions: mathModule2EasyQuestions,
        },
        {
          id: 'math-module-2-hard',
          title: 'Math — Module 2',
          timeMinutes: 35,
          questionCount: 22,
          type: 'hard',
          questions: mathModule2HardQuestions,
        },
      ],
    },
  ],
}
