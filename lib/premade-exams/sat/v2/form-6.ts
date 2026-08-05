// VERSION 2 — immutable content generation. Do not modify.
import type { SATForm } from '../types'
import { f6RwModule1QuestionsV2 } from './form-6-rw-module-1'
import { f6RwModule2EasyQuestionsV2 } from './form-6-rw-module-2-easy'
import { f6RwModule2HardQuestionsV2 } from './form-6-rw-module-2-hard'
import { f6MathModule1QuestionsV2 } from './form-6-math-module-1'
import { f6MathModule2EasyQuestionsV2 } from './form-6-math-module-2-easy'
import { f6MathModule2HardQuestionsV2 } from './form-6-math-module-2-hard'

export const satForm6V2: SATForm = {
  id: 'sat-form-6',
  title: 'SAT Practice Test 6',
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
          id: 'f6v2-rw-module-1',
          title: 'Reading and Writing — Module 1',
          timeMinutes: 32,
          questionCount: 27,
          type: 'routing',
          questions: f6RwModule1QuestionsV2,
        },
        {
          id: 'f6v2-rw-module-2-easy',
          title: 'Reading and Writing — Module 2',
          timeMinutes: 32,
          questionCount: 27,
          type: 'easy',
          questions: f6RwModule2EasyQuestionsV2,
        },
        {
          id: 'f6v2-rw-module-2-hard',
          title: 'Reading and Writing — Module 2',
          timeMinutes: 32,
          questionCount: 27,
          type: 'hard',
          questions: f6RwModule2HardQuestionsV2,
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
          id: 'f6v2-math-module-1',
          title: 'Math — Module 1',
          timeMinutes: 35,
          questionCount: 22,
          type: 'routing',
          questions: f6MathModule1QuestionsV2,
        },
        {
          id: 'f6v2-math-module-2-easy',
          title: 'Math — Module 2',
          timeMinutes: 35,
          questionCount: 22,
          type: 'easy',
          questions: f6MathModule2EasyQuestionsV2,
        },
        {
          id: 'f6v2-math-module-2-hard',
          title: 'Math — Module 2',
          timeMinutes: 35,
          questionCount: 22,
          type: 'hard',
          questions: f6MathModule2HardQuestionsV2,
        },
      ],
    },
  ],
}
