// VERSION 4 — extreme-difficulty rebuild.
// Math modules fully rewritten: M1 is materially harder, M2-Hard targets 8.5-9.2/10 difficulty.
// R&W modules carried forward from V3 with updated identifiers.
// V2 and V3 content files are preserved untouched as historical records.
import type { SATForm } from '../types'
import { f7RwModule1QuestionsV4 } from './form-7-rw-module-1'
import { f7RwModule2EasyQuestionsV4 } from './form-7-rw-module-2-easy'
import { f7RwModule2HardQuestionsV4 } from './form-7-rw-module-2-hard'
import { f7MathModule1QuestionsV4 } from './form-7-math-module-1'
import { f7MathModule2EasyQuestionsV4 } from './form-7-math-module-2-easy'
import { f7MathModule2HardQuestionsV4 } from './form-7-math-module-2-hard'

export const satForm7V4: SATForm = {
  id: 'sat-form-7',
  title: 'SAT Practice Test 7',
  description: 'Full-length adaptive SAT practice exam',
  disclaimer: 'This is an unofficial practice test created for educational purposes. It is not affiliated with or endorsed by College Board®.',
  totalQuestions: 98,
  totalTimeMinutes: 134,
  rwRoutingThreshold: 17,
  mathRoutingThreshold: 12,
  sections: [
    {
      id: 'reading-writing',
      title: 'Reading and Writing',
      totalQuestions: 54,
      totalTimeMinutes: 64,
      modules: [
        {
          id: 'f7v4-rw-module-1',
          title: 'Reading and Writing — Module 1',
          timeMinutes: 32,
          questionCount: 27,
          type: 'routing',
          questions: f7RwModule1QuestionsV4,
        },
        {
          id: 'f7v4-rw-module-2-easy',
          title: 'Reading and Writing — Module 2',
          timeMinutes: 32,
          questionCount: 27,
          type: 'easy',
          questions: f7RwModule2EasyQuestionsV4,
        },
        {
          id: 'f7v4-rw-module-2-hard',
          title: 'Reading and Writing — Module 2',
          timeMinutes: 32,
          questionCount: 27,
          type: 'hard',
          questions: f7RwModule2HardQuestionsV4,
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
          id: 'f7v4-math-module-1',
          title: 'Math — Module 1',
          timeMinutes: 35,
          questionCount: 22,
          type: 'routing',
          questions: f7MathModule1QuestionsV4,
        },
        {
          id: 'f7v4-math-module-2-easy',
          title: 'Math — Module 2',
          timeMinutes: 35,
          questionCount: 22,
          type: 'easy',
          questions: f7MathModule2EasyQuestionsV4,
        },
        {
          id: 'f7v4-math-module-2-hard',
          title: 'Math — Module 2',
          timeMinutes: 35,
          questionCount: 22,
          type: 'hard',
          questions: f7MathModule2HardQuestionsV4,
        },
      ],
    },
  ],
}
