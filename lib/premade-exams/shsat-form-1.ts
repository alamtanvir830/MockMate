/**
 * SHSAT Form 1 — Pre-made exam data
 *
 * HOW TO REPLACE PLACEHOLDER QUESTIONS:
 * 1. Open this file.
 * 2. Edit the `questions` array below.
 * 3. Each question must have:
 *    - id: unique string (e.g. "q1", "q2", ...)
 *    - section: "ela" or "math"
 *    - question_text: the full question (multi-line OK, use \n)
 *    - options: exactly 4 answer strings in a tuple
 *    - correct_answer: must match one of the options exactly (copy-paste)
 * 4. Save — the exam page picks up changes automatically on next build/deploy.
 *
 * No database changes are needed. The data lives entirely in this file.
 */

export interface SHSATQuestion {
  id: string
  section: 'ela' | 'math'
  question_text: string
  options: [string, string, string, string]
  correct_answer: string // must be an exact match to one of the options
}

export interface SHSATForm {
  id: string
  title: string
  description: string
  timeLimitMinutes: number
  questions: SHSATQuestion[]
}

export const shsatForm1: SHSATForm = {
  id: 'shsat-form-1',
  title: 'SHSAT Form 1',
  description: 'Specialized High Schools Admissions Test — Practice Form 1',
  timeLimitMinutes: 180,
  questions: [
    // ── ELA ──────────────────────────────────────────────────────────────────

    {
      id: 'q1',
      section: 'ela',
      question_text:
        'Read the following sentence and choose the answer that best corrects it.\n\n"Having studied all night, the test was found to be easy by Marcus."\n\nWhich revision corrects the dangling modifier?',
      options: [
        'Having studied all night, Marcus found the test to be easy.',
        'Marcus, having studied all night, the test was easy.',
        'The test was found easy by Marcus, who had studied all night.',
        'Marcus studied all night, the test being easy.',
      ],
      correct_answer: 'Having studied all night, Marcus found the test to be easy.',
    },

    {
      id: 'q2',
      section: 'ela',
      question_text: 'Which sentence uses a semicolon correctly?',
      options: [
        'She loves reading; and writes in her journal every day.',
        'The concert was sold out; however, we found tickets online.',
        'He ran to the store; because he needed milk.',
        'The dog barked loudly; scaring the neighbor\'s cat away from.',
      ],
      correct_answer: 'The concert was sold out; however, we found tickets online.',
    },

    {
      id: 'q3',
      section: 'ela',
      question_text:
        'Read the passage and answer the question.\n\n"The Arctic fox changes the color of its fur with the seasons — white in winter and brown in summer. This adaptation helps it blend into the environment and avoid predators."\n\nWhat is the primary purpose of the Arctic fox\'s color change according to the passage?',
      options: [
        'To attract a mate during different seasons',
        'To regulate its body temperature in extreme cold',
        'To camouflage itself from predators',
        'To signal danger to other foxes nearby',
      ],
      correct_answer: 'To camouflage itself from predators',
    },

    {
      id: 'q4',
      section: 'ela',
      question_text:
        'Choose the word that best completes the sentence.\n\n"The mayor\'s speech was so ________ that many audience members fell asleep."',
      options: ['riveting', 'concise', 'tedious', 'provocative'],
      correct_answer: 'tedious',
    },

    {
      id: 'q5',
      section: 'ela',
      question_text:
        'Which is the best way to combine these two sentences into one?\n\n"Jada won the science fair. She also placed first in the spelling bee."',
      options: [
        'Jada won the science fair, additionally she placed first in the spelling bee.',
        'Jada won the science fair and also placed first in the spelling bee.',
        'Jada won the science fair; but she placed first in the spelling bee.',
        'Jada won the science fair, however she also placed first in the spelling bee.',
      ],
      correct_answer: 'Jada won the science fair and also placed first in the spelling bee.',
    },

    // ── MATH ─────────────────────────────────────────────────────────────────

    {
      id: 'q6',
      section: 'math',
      question_text: 'If 3x + 7 = 28, what is the value of x?',
      options: ['5', '7', '9', '11'],
      correct_answer: '7',
    },

    {
      id: 'q7',
      section: 'math',
      question_text:
        'A store is having a 25% off sale. If a jacket originally costs $84, what is the sale price?',
      options: ['$58', '$63', '$21', '$75'],
      correct_answer: '$63',
    },

    {
      id: 'q8',
      section: 'math',
      question_text:
        'What is the perimeter of a rectangle with a length of 14 cm and a width of 9 cm?',
      options: ['23 cm', '46 cm', '126 cm', '36 cm'],
      correct_answer: '46 cm',
    },

    {
      id: 'q9',
      section: 'math',
      question_text:
        'A bag contains 4 red marbles, 6 blue marbles, and 2 green marbles. If one marble is chosen at random, what is the probability it is blue?',
      options: ['1/2', '1/3', '3/6', '2/12'],
      correct_answer: '1/2',
    },

    {
      id: 'q10',
      section: 'math',
      question_text:
        'The sum of three consecutive integers is 60. What is the largest of the three integers?',
      options: ['18', '19', '20', '21'],
      correct_answer: '21',
    },
  ],
}
