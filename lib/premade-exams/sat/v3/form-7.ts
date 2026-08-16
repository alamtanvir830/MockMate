// VERSION 3 — rebuilt with corrected content and proper domain ordering.
// Math modules are fully rewritten from scratch; R&W modules are reordered
// into canonical domain sequence (C&S → II → SEC → EoI).
// V2 content files are preserved untouched as historical record.
import type { SATForm } from '../types'
import { f7RwModule1QuestionsV3 } from './form-7-rw-module-1'
import { f7RwModule2EasyQuestionsV3 } from './form-7-rw-module-2-easy'
import { f7RwModule2HardQuestionsV3 } from './form-7-rw-module-2-hard'
import { f7MathModule1QuestionsV3 } from './form-7-math-module-1'
import { f7MathModule2EasyQuestionsV3 } from './form-7-math-module-2-easy'
import { f7MathModule2HardQuestionsV3 } from './form-7-math-module-2-hard'

export const satForm7V3: SATForm = {
  id: 'sat-form-7',
  title: 'SAT Practice Test 7',
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
          id: 'f7v3-rw-module-1',
          title: 'Reading and Writing — Module 1',
          timeMinutes: 32,
          questionCount: 27,
          type: 'routing',
          questions: f7RwModule1QuestionsV3,
        },
        {
          id: 'f7v3-rw-module-2-easy',
          title: 'Reading and Writing — Module 2',
          timeMinutes: 32,
          questionCount: 27,
          type: 'easy',
          questions: f7RwModule2EasyQuestionsV3,
        },
        {
          id: 'f7v3-rw-module-2-hard',
          title: 'Reading and Writing — Module 2',
          timeMinutes: 32,
          questionCount: 27,
          type: 'hard',
          questions: f7RwModule2HardQuestionsV3,
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
          id: 'f7v3-math-module-1',
          title: 'Math — Module 1',
          timeMinutes: 35,
          questionCount: 22,
          type: 'routing',
          questions: f7MathModule1QuestionsV3,
        },
        {
          id: 'f7v3-math-module-2-easy',
          title: 'Math — Module 2',
          timeMinutes: 35,
          questionCount: 22,
          type: 'easy',
          questions: f7MathModule2EasyQuestionsV3,
        },
        {
          id: 'f7v3-math-module-2-hard',
          title: 'Math — Module 2',
          timeMinutes: 35,
          questionCount: 22,
          type: 'hard',
          questions: f7MathModule2HardQuestionsV3,
        },
      ],
    },
  ],
}
