import type { MathMCQuestion, MathGridInQuestion } from '../types'
type MathQuestion = MathMCQuestion | MathGridInQuestion

export const f8MathModule2EasyQuestionsV2: MathQuestion[] = [
  // ── q01–q08 EASY ─────────────────────────────────────────────────────────

  {
    id: 'sat-f8-v2-math-m2e-q01',
    section: 'math',
    moduleId: 'f8v2-math-module-2-easy',
    domain: 'Algebra',
    skill: 'Linear equations in one variable',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'If 3x + 7 = 22, what is the value of x?',
    choices: [
      { label: 'A', text: '3' },
      { label: 'B', text: '4' },
      { label: 'C', text: '6' },
      { label: 'D', text: '5' },
    ],
    correctAnswer: 'D',
    explanation:
      'Subtract 7 from both sides: 3x = 15. Divide by 3: x = 5.',
    wrongAnswerExplanations: {
      A: 'If x = 3, then 3(3) + 7 = 16, not 22.',
      B: 'If x = 4, then 3(4) + 7 = 19, not 22.',
      C: 'If x = 6, then 3(6) + 7 = 25, not 22.',
    },
  },

  {
    id: 'sat-f8-v2-math-m2e-q02',
    section: 'math',
    moduleId: 'f8v2-math-module-2-easy',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'The function f is defined by f(x) = x² − 4. What is the value of f(3)?',
    choices: [
      { label: 'A', text: '3' },
      { label: 'B', text: '5' },
      { label: 'C', text: '7' },
      { label: 'D', text: '9' },
    ],
    correctAnswer: 'B',
    explanation:
      'Substitute x = 3: f(3) = (3)² − 4 = 9 − 4 = 5.',
    wrongAnswerExplanations: {
      A: '3 is the input value, not the output.',
      C: 'A common error is computing 3 + 4 = 7 instead of 3² − 4.',
      D: '9 = 3², but you must still subtract 4.',
    },
  },

  {
    id: 'sat-f8-v2-math-m2e-q03',
    section: 'math',
    moduleId: 'f8v2-math-module-2-easy',
    domain: 'Algebra',
    skill: 'Linear functions',
    difficulty: 'easy',
    type: 'multiple_choice',
    question:
      'The graph of a linear function passes through the points (0, 1) and (1, 3). What is the slope of the line?',
    choices: [
      { label: 'A', text: '2' },
      { label: 'B', text: '1' },
      { label: 'C', text: '3' },
      { label: 'D', text: '0' },
    ],
    correctAnswer: 'A',
    explanation:
      'Slope = (y₂ − y₁) / (x₂ − x₁) = (3 − 1) / (1 − 0) = 2/1 = 2.',
    wrongAnswerExplanations: {
      B: '1 is the y-intercept, not the slope.',
      C: '3 is the y-value at x = 1, not the rate of change.',
      D: 'A slope of 0 would mean the line is horizontal, but the y-values change.',
    },
  },

  {
    id: 'sat-f8-v2-math-m2e-q04',
    section: 'math',
    moduleId: 'f8v2-math-module-2-easy',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Ratios, rates, proportional relationships, and units',
    difficulty: 'easy',
    type: 'multiple_choice',
    question:
      'A recipe uses flour and sugar in a ratio of 3 to 5. If a baker uses 15 cups of flour, how many cups of flour and sugar are used in total?',
    choices: [
      { label: 'A', text: '20' },
      { label: 'B', text: '25' },
      { label: 'C', text: '40' },
      { label: 'D', text: '45' },
    ],
    correctAnswer: 'C',
    explanation:
      'The ratio 3:5 means for every 3 cups of flour there are 5 cups of sugar. With 15 cups of flour (which is 3 × 5), sugar = 5 × 5 = 25 cups. Total = 15 + 25 = 40.',
    wrongAnswerExplanations: {
      A: '20 accounts for only part of the calculation.',
      B: '25 is the amount of sugar alone, not the total.',
      D: '45 results from adding incorrectly or using the wrong multiplier.',
    },
  },

  {
    id: 'sat-f8-v2-math-m2e-q05',
    section: 'math',
    moduleId: 'f8v2-math-module-2-easy',
    domain: 'Algebra',
    skill: 'Systems of two linear equations in two variables',
    difficulty: 'easy',
    type: 'multiple_choice',
    question:
      'x + y = 10\nx − y = 4\nBased on the system of equations above, what is the value of x?',
    choices: [
      { label: 'A', text: '3' },
      { label: 'B', text: '4' },
      { label: 'C', text: '6' },
      { label: 'D', text: '7' },
    ],
    correctAnswer: 'D',
    explanation:
      'Adding the two equations: 2x = 14, so x = 7. (Check: y = 10 − 7 = 3, and 7 − 3 = 4. ✓)',
    wrongAnswerExplanations: {
      A: '3 is the value of y, not x.',
      B: '4 is the right-hand side of the second equation, not x.',
      C: 'Averaging the two right-hand sides gives 7, not 6; x = 7.',
    },
  },

  {
    id: 'sat-f8-v2-math-m2e-q06',
    section: 'math',
    moduleId: 'f8v2-math-module-2-easy',
    domain: 'Advanced Math',
    skill: 'Nonlinear equations in one variable and systems of equations in two variables',
    difficulty: 'easy',
    type: 'multiple_choice',
    question:
      'If x² = 16 and x > 0, what is the value of x?',
    choices: [
      { label: 'A', text: '2' },
      { label: 'B', text: '4' },
      { label: 'C', text: '8' },
      { label: 'D', text: '16' },
    ],
    correctAnswer: 'B',
    explanation:
      'Taking the positive square root of both sides: x = √16 = 4.',
    wrongAnswerExplanations: {
      A: '2² = 4, not 16.',
      C: '8² = 64, not 16.',
      D: '16 is x², not x.',
    },
  },

  {
    id: 'sat-f8-v2-math-m2e-q07',
    section: 'math',
    moduleId: 'f8v2-math-module-2-easy',
    domain: 'Algebra',
    skill: 'Linear inequalities in one or two variables',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'Which value of x satisfies 2x − 3 > 7?',
    choices: [
      { label: 'A', text: 'x > 2' },
      { label: 'B', text: 'x > 4' },
      { label: 'C', text: 'x > 5' },
      { label: 'D', text: 'x > 7' },
    ],
    correctAnswer: 'C',
    explanation:
      'Add 3 to both sides: 2x > 10. Divide by 2: x > 5.',
    wrongAnswerExplanations: {
      A: 'x > 2 comes from dividing 7 by 3 rather than solving correctly.',
      B: 'x > 4 results from not adding 3 before dividing.',
      D: 'x > 7 mistakes the right-hand side for the answer.',
    },
  },

  {
    id: 'sat-f8-v2-math-m2e-q08',
    section: 'math',
    moduleId: 'f8v2-math-module-2-easy',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'One-variable data: distributions and measures of center and spread',
    difficulty: 'easy',
    type: 'multiple_choice',
    question:
      'The five values in a data set are 4, 6, 8, 10, and 12. What is the mean of the data set?',
    choices: [
      { label: 'A', text: '8' },
      { label: 'B', text: '9' },
      { label: 'C', text: '10' },
      { label: 'D', text: '6' },
    ],
    correctAnswer: 'A',
    explanation:
      'Mean = (4 + 6 + 8 + 10 + 12) / 5 = 40 / 5 = 8.',
    wrongAnswerExplanations: {
      B: '9 is not the result of dividing the correct sum by 5.',
      C: '10 is the median (middle value) when arranged in order, not the mean.',
      D: '6 is the second-smallest value, not the mean.',
    },
  },

  // ── q09–q16 MEDIUM ───────────────────────────────────────────────────────

  {
    id: 'sat-f8-v2-math-m2e-q09',
    section: 'math',
    moduleId: 'f8v2-math-module-2-easy',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'The function g is defined by g(x) = x² − 2x + 1. What is the minimum value of g(x)?',
    choices: [
      { label: 'A', text: '−1' },
      { label: 'B', text: '1' },
      { label: 'C', text: '−2' },
      { label: 'D', text: '0' },
    ],
    correctAnswer: 'D',
    explanation:
      'g(x) = x² − 2x + 1 = (x − 1)². Since (x − 1)² ≥ 0 for all real x, the minimum value is 0, achieved at x = 1.',
    wrongAnswerExplanations: {
      A: '−1 is not achievable because a perfect square is never negative.',
      B: '1 is the x-value where the minimum occurs, not the minimum value of g(x).',
      C: '−2 is not achievable; the vertex form shows the minimum is 0.',
    },
  },

  {
    id: 'sat-f8-v2-math-m2e-q10',
    section: 'math',
    moduleId: 'f8v2-math-module-2-easy',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Probability and conditional probability',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'A bag contains 3 red marbles, 5 blue marbles, and 2 green marbles. If one marble is chosen at random, what is the probability that it is blue?',
    choices: [
      { label: 'A', text: '1/5' },
      { label: 'B', text: '1/2' },
      { label: 'C', text: '3/10' },
      { label: 'D', text: '3/5' },
    ],
    correctAnswer: 'B',
    explanation:
      'Total marbles = 3 + 5 + 2 = 10. P(blue) = 5/10 = 1/2.',
    wrongAnswerExplanations: {
      A: '1/5 = 2/10, which is the probability of choosing a green marble.',
      C: '3/10 is the probability of choosing a red marble.',
      D: '3/5 = 6/10, which overcounts the blue marbles.',
    },
  },

  {
    id: 'sat-f8-v2-math-m2e-q11',
    section: 'math',
    moduleId: 'f8v2-math-module-2-easy',
    domain: 'Algebra',
    skill: 'Linear equations in two variables',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'Which expression is equivalent to 3(2x − 4) + 6?',
    choices: [
      { label: 'A', text: '6x − 6' },
      { label: 'B', text: '6x + 6' },
      { label: 'C', text: '6x − 18' },
      { label: 'D', text: '2x − 6' },
    ],
    correctAnswer: 'A',
    explanation:
      'Distribute: 3(2x − 4) + 6 = 6x − 12 + 6 = 6x − 6.',
    wrongAnswerExplanations: {
      B: '6x + 6 would result if −12 + 6 were incorrectly computed as +6.',
      C: '6x − 18 results from forgetting to add the +6 outside the parentheses.',
      D: '2x − 6 results from not distributing the 3 to both terms inside the parentheses.',
    },
  },

  {
    id: 'sat-f8-v2-math-m2e-q12',
    section: 'math',
    moduleId: 'f8v2-math-module-2-easy',
    domain: 'Geometry and Trigonometry',
    skill: 'Area and volume',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'A rectangle has a length of 8 units and a width of 5 units. What is the area of the rectangle, in square units?',
    choices: [
      { label: 'A', text: '26' },
      { label: 'B', text: '30' },
      { label: 'C', text: '40' },
      { label: 'D', text: '45' },
    ],
    correctAnswer: 'C',
    explanation:
      'Area = length × width = 8 × 5 = 40 square units.',
    wrongAnswerExplanations: {
      A: '26 is the perimeter: 2(8 + 5) = 26, not the area.',
      B: '30 results from adding instead of multiplying: 8 + 5 + 8 + 9 or similar error.',
      D: '45 = 9 × 5, using 9 instead of 8.',
    },
  },

  {
    id: 'sat-f8-v2-math-m2e-q13',
    section: 'math',
    moduleId: 'f8v2-math-module-2-easy',
    domain: 'Advanced Math',
    skill: 'Equivalent expressions',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'Which of the following is equivalent to x² + 6x + 9?',
    choices: [
      { label: 'A', text: '(x + 6)²' },
      { label: 'B', text: '(x − 3)²' },
      { label: 'C', text: '(x + 6)(x − 3)' },
      { label: 'D', text: '(x + 3)²' },
    ],
    correctAnswer: 'D',
    explanation:
      'x² + 6x + 9 is a perfect square trinomial: (x + 3)² = x² + 6x + 9. ✓',
    wrongAnswerExplanations: {
      A: '(x + 6)² = x² + 12x + 36, which does not match.',
      B: '(x − 3)² = x² − 6x + 9, which has −6x, not +6x.',
      C: '(x + 6)(x − 3) = x² + 3x − 18, which does not match.',
    },
  },

  {
    id: 'sat-f8-v2-math-m2e-q14',
    section: 'math',
    moduleId: 'f8v2-math-module-2-easy',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Two-variable data: models and scatterplots',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'The scatterplot below shows the relationship between the number of hours students studied and their test scores. Which statement best describes the association shown?\n\n(Hours studied: 1, 2, 3, 4, 5 — corresponding approximate scores: 55, 62, 70, 78, 85)',
    choices: [
      { label: 'A', text: 'There is no association between hours studied and test scores.' },
      { label: 'B', text: 'There is a positive association: as hours studied increase, test scores tend to increase.' },
      { label: 'C', text: 'There is a negative association: as hours studied increase, test scores tend to decrease.' },
      { label: 'D', text: 'The association is nonlinear because the scores increase then decrease.' },
    ],
    correctAnswer: 'B',
    explanation:
      'As the number of hours studied increases from 1 to 5, the test scores increase from approximately 55 to 85. This is a positive association.',
    wrongAnswerExplanations: {
      A: 'There is a clear pattern in the data, so association does exist.',
      C: 'The scores increase as hours increase, making the association positive, not negative.',
      D: 'The data shows a consistent increase rather than a rise-and-fall pattern.',
    },
  },

  {
    id: 'sat-f8-v2-math-m2e-q15',
    section: 'math',
    moduleId: 'f8v2-math-module-2-easy',
    domain: 'Geometry and Trigonometry',
    skill: 'Right triangles and trigonometry',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'In a right triangle, the two legs have lengths 6 and 8. What is the length of the hypotenuse?',
    choices: [
      { label: 'A', text: '10' },
      { label: 'B', text: '7' },
      { label: 'C', text: '14' },
      { label: 'D', text: '12' },
    ],
    correctAnswer: 'A',
    explanation:
      'By the Pythagorean theorem: c² = 6² + 8² = 36 + 64 = 100, so c = √100 = 10.',
    wrongAnswerExplanations: {
      B: '7 is approximately the average of 6 and 8, not the hypotenuse.',
      C: '14 = 6 + 8, but the Pythagorean theorem requires squaring, not adding.',
      D: '12 results from computing 6 + 8 − 2 or another arithmetic error.',
    },
  },

  {
    id: 'sat-f8-v2-math-m2e-q16',
    section: 'math',
    moduleId: 'f8v2-math-module-2-easy',
    domain: 'Geometry and Trigonometry',
    skill: 'Circles',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'A circle has a radius of 7. What is the circumference of the circle?',
    choices: [
      { label: 'A', text: '7π' },
      { label: 'B', text: '49π' },
      { label: 'C', text: '14π' },
      { label: 'D', text: '28π' },
    ],
    correctAnswer: 'C',
    explanation:
      'Circumference = 2πr = 2π(7) = 14π.',
    wrongAnswerExplanations: {
      A: '7π = πr, which is only half the circumference formula.',
      B: '49π = πr², which is the area of the circle, not the circumference.',
      D: '28π = 4πr, which uses the wrong coefficient.',
    },
  },

  // ── q17–q22 GRID-IN (medium) ──────────────────────────────────────────────

  {
    id: 'sat-f8-v2-math-m2e-q17',
    section: 'math',
    moduleId: 'f8v2-math-module-2-easy',
    domain: 'Algebra',
    skill: 'Linear functions',
    difficulty: 'medium',
    type: 'grid_in',
    question:
      'The function f is defined by f(x) = 3x + 2. What is the value of f(6)?',
    correctAnswer: '20',
    acceptableAnswers: ['20'],
    explanation:
      'Substitute x = 6: f(6) = 3(6) + 2 = 18 + 2 = 20.',
  },

  {
    id: 'sat-f8-v2-math-m2e-q18',
    section: 'math',
    moduleId: 'f8v2-math-module-2-easy',
    domain: 'Algebra',
    skill: 'Linear equations in one variable',
    difficulty: 'medium',
    type: 'grid_in',
    question:
      'If 4x − 5 = 7, what is the value of x?',
    correctAnswer: '3',
    acceptableAnswers: ['3'],
    explanation:
      'Add 5 to both sides: 4x = 12. Divide by 4: x = 3.',
  },

  {
    id: 'sat-f8-v2-math-m2e-q19',
    section: 'math',
    moduleId: 'f8v2-math-module-2-easy',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'medium',
    type: 'grid_in',
    question:
      'The function h is defined by h(x) = x² + 1. What is the value of h(7)?',
    correctAnswer: '50',
    acceptableAnswers: ['50'],
    explanation:
      'Substitute x = 7: h(7) = (7)² + 1 = 49 + 1 = 50.',
  },

  {
    id: 'sat-f8-v2-math-m2e-q20',
    section: 'math',
    moduleId: 'f8v2-math-module-2-easy',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Percentages',
    difficulty: 'medium',
    type: 'grid_in',
    question:
      'In a survey of 500 students, 40% said their favorite subject is science. What fraction of the students, expressed as a decimal, said science is their favorite subject?',
    correctAnswer: '0.4',
    acceptableAnswers: ['0.4', '.4'],
    explanation:
      '40% expressed as a decimal is 40/100 = 0.4.',
  },

  {
    id: 'sat-f8-v2-math-m2e-q21',
    section: 'math',
    moduleId: 'f8v2-math-module-2-easy',
    domain: 'Advanced Math',
    skill: 'Nonlinear equations in one variable and systems of equations in two variables',
    difficulty: 'medium',
    type: 'grid_in',
    question:
      'The system of equations below is given.\ny = x²\ny = 6x\nWhat is the positive value of y at the non-zero solution of the system?',
    correctAnswer: '36',
    acceptableAnswers: ['36'],
    explanation:
      'Set the expressions equal: x² = 6x → x² − 6x = 0 → x(x − 6) = 0. The non-zero solution is x = 6. Then y = 6(6) = 36.',
  },

  {
    id: 'sat-f8-v2-math-m2e-q22',
    section: 'math',
    moduleId: 'f8v2-math-module-2-easy',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Inference from sample statistics and margin of error',
    difficulty: 'medium',
    type: 'grid_in',
    question:
      'A school conducted a survey of 60 students chosen at random. The results showed that 20% of those surveyed preferred math as their favorite subject. Based on these results, how many students in the surveyed group preferred math?',
    correctAnswer: '12',
    acceptableAnswers: ['12'],
    explanation:
      '20% of 60 = 0.20 × 60 = 12 students.',
  },
]
