// VERSION 2 — immutable content generation. Do not modify.
// V1 source of truth: lib/premade-exams/sat/form-1.ts
import type { SATForm } from '../types'
import { rwModule1QuestionsV2 } from './rw-module-1'
import { rwModule2EasyQuestionsV2 } from './rw-module-2-easy'
import { rwModule2HardQuestionsV2 } from './rw-module-2-hard'
import { mathModule1QuestionsV2 } from './math-module-1'
import { mathModule2EasyQuestionsV2 } from './math-module-2-easy'
import { mathModule2HardQuestionsV2 } from './math-module-2-hard'

export const satForm1V2: SATForm = {
  id: 'sat-form-1',
  title: 'SAT Practice Test 1',
  description: 'Full-length adaptive SAT practice exam',
  disclaimer: 'This is an unofficial practice test created for educational purposes. It is not affiliated with or endorsed by College Board®.',
  totalQuestions: 98,
  totalTimeMinutes: 134,
  rwRoutingThreshold: 14,
  mathRoutingThreshold: 11,
  sections: [
    {
      id: 'reading-writing',
      title: 'Reading and Writing',
      totalQuestions: 54,
      totalTimeMinutes: 64,
      modules: [
        {
          id: 'f1v2-rw-module-1',
          title: 'Reading and Writing — Module 1',
          timeMinutes: 32,
          questionCount: 27,
          type: 'routing',
          questions: rwModule1QuestionsV2,
        },
        {
          id: 'f1v2-rw-module-2-easy',
          title: 'Reading and Writing — Module 2',
          timeMinutes: 32,
          questionCount: 27,
          type: 'easy',
          questions: rwModule2EasyQuestionsV2,
        },
        {
          id: 'f1v2-rw-module-2-hard',
          title: 'Reading and Writing — Module 2',
          timeMinutes: 32,
          questionCount: 27,
          type: 'hard',
          questions: rwModule2HardQuestionsV2,
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
          id: 'f1v2-math-module-1',
          title: 'Math — Module 1',
          timeMinutes: 35,
          questionCount: 22,
          type: 'routing',
          questions: mathModule1QuestionsV2,
        },
        {
          id: 'f1v2-math-module-2-easy',
          title: 'Math — Module 2',
          timeMinutes: 35,
          questionCount: 22,
          type: 'easy',
          questions: mathModule2EasyQuestionsV2,
        },
        {
          id: 'f1v2-math-module-2-hard',
          title: 'Math — Module 2',
          timeMinutes: 35,
          questionCount: 22,
          type: 'hard',
          questions: mathModule2HardQuestionsV2,
        },
      ],
    },
  ],
}
