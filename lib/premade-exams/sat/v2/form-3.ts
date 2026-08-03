// VERSION 2 — immutable content generation. Do not modify.
// V1 source of truth: lib/premade-exams/sat/form-3.ts
import type { SATForm } from '../types'
import { f3RwModule1QuestionsV2 } from './form-3-rw-module-1'
import { f3RwModule2EasyQuestionsV2 } from './form-3-rw-module-2-easy'
import { f3RwModule2HardQuestionsV2 } from './form-3-rw-module-2-hard'
import { f3MathModule1QuestionsV2 } from './form-3-math-module-1'
import { f3MathModule2EasyQuestionsV2 } from './form-3-math-module-2-easy'
import { f3MathModule2HardQuestionsV2 } from './form-3-math-module-2-hard'

export const satForm3V2: SATForm = {
  id: 'sat-form-3',
  title: 'SAT Practice Test 3',
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
          id: 'f3v2-rw-module-1',
          title: 'Reading and Writing — Module 1',
          timeMinutes: 32,
          questionCount: 27,
          type: 'routing',
          questions: f3RwModule1QuestionsV2,
        },
        {
          id: 'f3v2-rw-module-2-easy',
          title: 'Reading and Writing — Module 2',
          timeMinutes: 32,
          questionCount: 27,
          type: 'easy',
          questions: f3RwModule2EasyQuestionsV2,
        },
        {
          id: 'f3v2-rw-module-2-hard',
          title: 'Reading and Writing — Module 2',
          timeMinutes: 32,
          questionCount: 27,
          type: 'hard',
          questions: f3RwModule2HardQuestionsV2,
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
          id: 'f3v2-math-module-1',
          title: 'Math — Module 1',
          timeMinutes: 35,
          questionCount: 22,
          type: 'routing',
          questions: f3MathModule1QuestionsV2,
        },
        {
          id: 'f3v2-math-module-2-easy',
          title: 'Math — Module 2',
          timeMinutes: 35,
          questionCount: 22,
          type: 'easy',
          questions: f3MathModule2EasyQuestionsV2,
        },
        {
          id: 'f3v2-math-module-2-hard',
          title: 'Math — Module 2',
          timeMinutes: 35,
          questionCount: 22,
          type: 'hard',
          questions: f3MathModule2HardQuestionsV2,
        },
      ],
    },
  ],
}
