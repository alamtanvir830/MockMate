// VERSION 2 — immutable content generation. Do not modify.
import type { SATForm } from '../types'
import { f9RwModule1QuestionsV2 } from './form-9-rw-module-1'
import { f9RwModule2EasyQuestionsV2 } from './form-9-rw-module-2-easy'
import { f9RwModule2HardQuestionsV2 } from './form-9-rw-module-2-hard'
import { f9MathModule1QuestionsV2 } from './form-9-math-module-1'
import { f9MathModule2EasyQuestionsV2 } from './form-9-math-module-2-easy'
import { f9MathModule2HardQuestionsV2 } from './form-9-math-module-2-hard'

export const satForm9V2: SATForm = {
  id: 'sat-form-9',
  title: 'SAT Practice Test 9',
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
          id: 'f9v2-rw-module-1',
          title: 'Reading and Writing — Module 1',
          timeMinutes: 32,
          questionCount: 27,
          type: 'routing',
          questions: f9RwModule1QuestionsV2,
        },
        {
          id: 'f9v2-rw-module-2-easy',
          title: 'Reading and Writing — Module 2',
          timeMinutes: 32,
          questionCount: 27,
          type: 'easy',
          questions: f9RwModule2EasyQuestionsV2,
        },
        {
          id: 'f9v2-rw-module-2-hard',
          title: 'Reading and Writing — Module 2',
          timeMinutes: 32,
          questionCount: 27,
          type: 'hard',
          questions: f9RwModule2HardQuestionsV2,
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
          id: 'f9v2-math-module-1',
          title: 'Math — Module 1',
          timeMinutes: 35,
          questionCount: 22,
          type: 'routing',
          questions: f9MathModule1QuestionsV2,
        },
        {
          id: 'f9v2-math-module-2-easy',
          title: 'Math — Module 2',
          timeMinutes: 35,
          questionCount: 22,
          type: 'easy',
          questions: f9MathModule2EasyQuestionsV2,
        },
        {
          id: 'f9v2-math-module-2-hard',
          title: 'Math — Module 2',
          timeMinutes: 35,
          questionCount: 22,
          type: 'hard',
          questions: f9MathModule2HardQuestionsV2,
        },
      ],
    },
  ],
}
