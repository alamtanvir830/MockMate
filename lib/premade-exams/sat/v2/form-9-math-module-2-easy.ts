import type { MathMCQuestion, MathGridInQuestion } from '../types'
type MathQuestion = MathMCQuestion | MathGridInQuestion

export const f9MathModule2EasyQuestionsV2: MathQuestion[] = [
  // ── q01–q08: EASY ────────────────────────────────────────────────────────
  {
    id: 'sat-f9-v2-math-m2e-q01',
    section: 'math',
    moduleId: 'f9v2-math-module-2-easy',
    domain: 'Algebra',
    skill: 'Linear equations in one variable',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'If 3x + 7 = 19, what is the value of x?',
    choices: [
      { label: 'A', text: '4' },
      { label: 'B', text: '3' },
      { label: 'C', text: '6' },
      { label: 'D', text: '2' },
    ],
    correctAnswer: 'A',
    explanation:
      'Subtract 7 from both sides: 3x = 12. Divide both sides by 3: x = 4.',
    wrongAnswerExplanations: {
      B: 'Check: 3(3) + 7 = 16, not 19. Subtracting 7 gives 12, and 12 ÷ 3 = 4, not 3.',
      C: 'Check: 3(6) + 7 = 25, not 19. Be careful not to divide 19 by 3 directly.',
      D: 'Check: 3(2) + 7 = 13, not 19. Remember to subtract 7 first before dividing.',
    },
  },
  {
    id: 'sat-f9-v2-math-m2e-q02',
    section: 'math',
    moduleId: 'f9v2-math-module-2-easy',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'The function f is defined by f(x) = x² − 3x + 2. What is f(4)?',
    choices: [
      { label: 'A', text: '2' },
      { label: 'B', text: '4' },
      { label: 'C', text: '6' },
      { label: 'D', text: '8' },
    ],
    correctAnswer: 'C',
    explanation:
      'Substitute x = 4: f(4) = (4)² − 3(4) + 2 = 16 − 12 + 2 = 6.',
    wrongAnswerExplanations: {
      A: 'f(4) = 16 − 12 + 2 = 6, not 2. Make sure to square 4 first, giving 16.',
      B: 'f(4) = 16 − 12 + 2 = 6, not 4. Evaluate 4² = 16, then 16 − 12 = 4, then add 2.',
      D: 'f(4) = 16 − 12 + 2 = 6, not 8. Remember to include the constant +2 in the evaluation.',
    },
  },
  {
    id: 'sat-f9-v2-math-m2e-q03',
    section: 'math',
    moduleId: 'f9v2-math-module-2-easy',
    domain: 'Algebra',
    skill: 'Linear functions',
    difficulty: 'easy',
    type: 'multiple_choice',
    question:
      'A linear function g has a slope of 2 and passes through the point (0, −3). What is the value of g(5)?',
    choices: [
      { label: 'A', text: '3' },
      { label: 'B', text: '5' },
      { label: 'C', text: '6' },
      { label: 'D', text: '7' },
    ],
    correctAnswer: 'D',
    explanation:
      'The slope-intercept form is g(x) = 2x − 3. Substituting x = 5: g(5) = 2(5) − 3 = 10 − 3 = 7.',
    wrongAnswerExplanations: {
      A: 'g(5) = 2(5) − 3 = 7, not 3. The slope is 2, so multiply 2 by 5, then subtract 3.',
      B: 'g(5) = 10 − 3 = 7, not 5. Don\'t forget to apply the slope to x before subtracting the y-intercept magnitude.',
      C: 'g(5) = 10 − 3 = 7, not 6. Make sure to subtract 3 (the negative y-intercept) from 10.',
    },
  },
  {
    id: 'sat-f9-v2-math-m2e-q04',
    section: 'math',
    moduleId: 'f9v2-math-module-2-easy',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Ratios, rates, proportional relationships, and units',
    difficulty: 'easy',
    type: 'multiple_choice',
    question:
      'A machine produces 12 items in 4 hours at a constant rate. At this rate, how many items does the machine produce in 7 hours?',
    choices: [
      { label: 'A', text: '18' },
      { label: 'B', text: '21' },
      { label: 'C', text: '24' },
      { label: 'D', text: '28' },
    ],
    correctAnswer: 'B',
    explanation:
      'The rate is 12 ÷ 4 = 3 items per hour. In 7 hours: 3 × 7 = 21 items.',
    wrongAnswerExplanations: {
      A: '18 would be the output at 6 hours (3 × 6 = 18), not 7 hours. Multiply the rate of 3 items/hour by 7.',
      C: '24 would be the output at 8 hours (3 × 8 = 24), not 7 hours.',
      D: '28 does not correspond to any whole-hour output at this rate. The rate is 3 items/hour, so 3 × 7 = 21.',
    },
  },
  {
    id: 'sat-f9-v2-math-m2e-q05',
    section: 'math',
    moduleId: 'f9v2-math-module-2-easy',
    domain: 'Algebra',
    skill: 'Systems of two linear equations in two variables',
    difficulty: 'easy',
    type: 'multiple_choice',
    question:
      'The system of equations below has solution (x, y).\n\n  x + y = 10\n  x − y = 4\n\nWhat is the value of x · y?',
    choices: [
      { label: 'A', text: '21' },
      { label: 'B', text: '24' },
      { label: 'C', text: '18' },
      { label: 'D', text: '30' },
    ],
    correctAnswer: 'A',
    explanation:
      'Add the equations: 2x = 14, so x = 7. Then y = 10 − 7 = 3. The product x · y = 7 × 3 = 21.',
    wrongAnswerExplanations: {
      B: 'Check: x = 7 and y = 3, so 7 × 3 = 21, not 24. Be careful to find both variables before multiplying.',
      C: 'x · y = 7 × 3 = 21, not 18. Adding the two equations gives x = 7, then y = 3.',
      D: 'x · y = 7 × 3 = 21, not 30. The solution is x = 7, y = 3, not x = 5, y = 6.',
    },
  },
  {
    id: 'sat-f9-v2-math-m2e-q06',
    section: 'math',
    moduleId: 'f9v2-math-module-2-easy',
    domain: 'Advanced Math',
    skill: 'Nonlinear equations in one variable and systems of equations',
    difficulty: 'easy',
    type: 'multiple_choice',
    question:
      'The equation x² = 49 has two solutions. What is the sum of the two solutions?',
    choices: [
      { label: 'A', text: '7' },
      { label: 'B', text: '−7' },
      { label: 'C', text: '0' },
      { label: 'D', text: '49' },
    ],
    correctAnswer: 'C',
    explanation:
      'The solutions are x = 7 and x = −7. Their sum is 7 + (−7) = 0.',
    wrongAnswerExplanations: {
      A: 'x = 7 is only one solution. The equation x² = 49 also has x = −7 as a solution. The sum of both is 0.',
      B: 'x = −7 is only one solution. Don\'t ignore the positive solution x = 7. The sum is 7 + (−7) = 0.',
      D: '49 is the value of x², not the sum of the solutions. The solutions are ±7, and 7 + (−7) = 0.',
    },
  },
  {
    id: 'sat-f9-v2-math-m2e-q07',
    section: 'math',
    moduleId: 'f9v2-math-module-2-easy',
    domain: 'Algebra',
    skill: 'Linear inequalities in one or two variables',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'Which of the following describes all solutions to 2x − 5 > 11?',
    choices: [
      { label: 'A', text: 'x > 3' },
      { label: 'B', text: 'x > 8' },
      { label: 'C', text: 'x > 16' },
      { label: 'D', text: 'x > 6' },
    ],
    correctAnswer: 'B',
    explanation:
      'Add 5 to both sides: 2x > 16. Divide both sides by 2: x > 8.',
    wrongAnswerExplanations: {
      A: 'x > 3 would result from 2x > 6, not 2x > 16. Add 5 to both sides first to get 2x > 16, then divide by 2.',
      C: 'x > 16 would result if you forgot to divide by 2. After adding 5 to get 2x > 16, divide both sides by 2 to get x > 8.',
      D: 'x > 6 would come from 2x > 12. Make sure to add 5 to 11 first: 2x > 16, so x > 8.',
    },
  },
  {
    id: 'sat-f9-v2-math-m2e-q08',
    section: 'math',
    moduleId: 'f9v2-math-module-2-easy',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'One-variable data: distributions and measures of center and spread',
    difficulty: 'easy',
    type: 'multiple_choice',
    question:
      'The five values in a data set are 2, 5, 7, 9, and 12. What is the difference between the median and the mean of the data set?',
    choices: [
      { label: 'A', text: '7' },
      { label: 'B', text: '2' },
      { label: 'C', text: '5' },
      { label: 'D', text: '0' },
    ],
    correctAnswer: 'D',
    explanation:
      'The values in order are 2, 5, 7, 9, 12. The median (middle value) is 7. The mean is (2 + 5 + 7 + 9 + 12) ÷ 5 = 35 ÷ 5 = 7. Median − Mean = 7 − 7 = 0.',
    wrongAnswerExplanations: {
      A: '7 is the value of both the median and the mean, not their difference. Subtracting equal values gives 0.',
      B: 'The difference is 0 because median = mean = 7. Check: (2+5+7+9+12)/5 = 35/5 = 7.',
      C: '5 is one of the data values, not the difference between median and mean. Both are 7, so the difference is 0.',
    },
  },
  // ── q09–q16: MEDIUM ──────────────────────────────────────────────────────
  {
    id: 'sat-f9-v2-math-m2e-q09',
    section: 'math',
    moduleId: 'f9v2-math-module-2-easy',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'The function g is defined by g(x) = 2x² + 3x − 5. What is the value of g(−2)?',
    choices: [
      { label: 'A', text: '−3' },
      { label: 'B', text: '−5' },
      { label: 'C', text: '3' },
      { label: 'D', text: '5' },
    ],
    correctAnswer: 'A',
    explanation:
      'Substitute x = −2: g(−2) = 2(−2)² + 3(−2) − 5 = 2(4) + (−6) − 5 = 8 − 6 − 5 = −3.',
    wrongAnswerExplanations: {
      B: 'g(−2) = 8 − 6 − 5 = −3, not −5. Note that (−2)² = 4 (positive), so 2(4) = 8.',
      C: 'g(−2) = −3, not 3. Watch the sign: 8 − 6 − 5 = −3.',
      D: 'g(−2) = −3, not 5. Make sure to evaluate (−2)² = 4 correctly and include the −5 constant.',
    },
  },
  {
    id: 'sat-f9-v2-math-m2e-q10',
    section: 'math',
    moduleId: 'f9v2-math-module-2-easy',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Probability and conditional probability',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'A bag contains 3 red marbles, 5 blue marbles, and 2 green marbles. If one marble is chosen at random, what is the probability that it is blue?',
    choices: [
      { label: 'A', text: '1/5' },
      { label: 'B', text: '3/10' },
      { label: 'C', text: '1/2' },
      { label: 'D', text: '2/5' },
    ],
    correctAnswer: 'C',
    explanation:
      'There are 3 + 5 + 2 = 10 marbles total. 5 are blue. P(blue) = 5/10 = 1/2.',
    wrongAnswerExplanations: {
      A: '1/5 = 2/10, which would correspond to 2 blue marbles. There are 5 blue marbles out of 10 total: 5/10 = 1/2.',
      B: '3/10 is the probability of selecting a red marble, not a blue marble.',
      D: '2/5 = 4/10 is not correct. There are 5 blue marbles out of 10 total: 5/10 = 1/2.',
    },
  },
  {
    id: 'sat-f9-v2-math-m2e-q11',
    section: 'math',
    moduleId: 'f9v2-math-module-2-easy',
    domain: 'Algebra',
    skill: 'Linear equations in one variable',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'Which of the following expressions is equivalent to 4(x + 3) − 2(x − 1)?',
    choices: [
      { label: 'A', text: '6x + 10' },
      { label: 'B', text: '2x + 10' },
      { label: 'C', text: '6x + 14' },
      { label: 'D', text: '2x + 14' },
    ],
    correctAnswer: 'D',
    explanation:
      'Distribute: 4(x + 3) = 4x + 12 and −2(x − 1) = −2x + 2. Combine: (4x − 2x) + (12 + 2) = 2x + 14.',
    wrongAnswerExplanations: {
      A: '6x + 10 would result from adding instead of subtracting the second group, and miscombining. Distribute carefully: 4x + 12 − 2x + 2 = 2x + 14.',
      B: '2x + 10 comes from a sign error in the constant: −2(x − 1) = −2x + 2, so the constant is 12 + 2 = 14, not 10.',
      C: '6x + 14 would mean the x-coefficients added to 6, but 4 − 2 = 2, not 6.',
    },
  },
  {
    id: 'sat-f9-v2-math-m2e-q12',
    section: 'math',
    moduleId: 'f9v2-math-module-2-easy',
    domain: 'Geometry and Trigonometry',
    skill: 'Area and volume',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'A triangle has a base of 8 and a height of 10. What is the area of the triangle?',
    choices: [
      { label: 'A', text: '36' },
      { label: 'B', text: '40' },
      { label: 'C', text: '44' },
      { label: 'D', text: '80' },
    ],
    correctAnswer: 'B',
    explanation:
      'Area of a triangle = (1/2) × base × height = (1/2) × 8 × 10 = 40.',
    wrongAnswerExplanations: {
      A: '36 is not equal to (1/2)(8)(10). The formula for triangle area is (1/2) × base × height = 40.',
      C: '44 is not the result of (1/2)(8)(10). Multiply: (1/2)(80) = 40.',
      D: '80 is the product of base and height without dividing by 2. Remember: area of a triangle is (1/2) × base × height.',
    },
  },
  {
    id: 'sat-f9-v2-math-m2e-q13',
    section: 'math',
    moduleId: 'f9v2-math-module-2-easy',
    domain: 'Advanced Math',
    skill: 'Equivalent expressions',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'The expression x² + 8x + 15 can be written as (x + a)(x + b), where a and b are positive integers. What is the value of a + b?',
    choices: [
      { label: 'A', text: '8' },
      { label: 'B', text: '6' },
      { label: 'C', text: '15' },
      { label: 'D', text: '3' },
    ],
    correctAnswer: 'A',
    explanation:
      'Factor: x² + 8x + 15 = (x + 3)(x + 5). Here a = 3 and b = 5, so a + b = 3 + 5 = 8.',
    wrongAnswerExplanations: {
      B: 'a + b = 8, not 6. The factors of 15 that add to 8 are 3 and 5 (not 2 and 3, which would give a sum of 5 and a product of 6).',
      C: '15 is the product a · b, not the sum a + b. We need two numbers whose product is 15 and sum is 8: that is 3 and 5.',
      D: '3 is one of the constants in the factored form, but a + b = 3 + 5 = 8.',
    },
  },
  {
    id: 'sat-f9-v2-math-m2e-q14',
    section: 'math',
    moduleId: 'f9v2-math-module-2-easy',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Two-variable data: models and scatterplots',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'A line of best fit for a data set is given by y = 3x + 2. According to this model, what is the predicted value of y when x = 5?',
    choices: [
      { label: 'A', text: '12' },
      { label: 'B', text: '15' },
      { label: 'C', text: '17' },
      { label: 'D', text: '20' },
    ],
    correctAnswer: 'C',
    explanation:
      'Substitute x = 5 into the equation: y = 3(5) + 2 = 15 + 2 = 17.',
    wrongAnswerExplanations: {
      A: 'y = 3(5) + 2 = 17, not 12. Make sure to include the +2 constant and use x = 5, not x = 4 (which gives 3(4)+2 = 14, also not 12).',
      B: '15 = 3(5) but you must also add the y-intercept of 2: y = 15 + 2 = 17.',
      D: 'y = 3(5) + 2 = 17, not 20. Check: 3 × 5 = 15, then 15 + 2 = 17.',
    },
  },
  {
    id: 'sat-f9-v2-math-m2e-q15',
    section: 'math',
    moduleId: 'f9v2-math-module-2-easy',
    domain: 'Geometry and Trigonometry',
    skill: 'Right triangles and trigonometry',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'In a right triangle, the two legs have lengths 5 and 12. What is the length of the hypotenuse?',
    choices: [
      { label: 'A', text: '7' },
      { label: 'B', text: '11' },
      { label: 'C', text: '12' },
      { label: 'D', text: '13' },
    ],
    correctAnswer: 'D',
    explanation:
      'By the Pythagorean theorem: c² = 5² + 12² = 25 + 144 = 169. Therefore c = √169 = 13.',
    wrongAnswerExplanations: {
      A: '7 is the difference of the two legs (12 − 5), not the hypotenuse. Use the Pythagorean theorem: √(25 + 144) = √169 = 13.',
      B: '11 is not a Pythagorean result for legs 5 and 12. c² = 25 + 144 = 169, so c = 13.',
      C: '12 is the length of one leg, not the hypotenuse. The hypotenuse must be longer than either leg: √169 = 13.',
    },
  },
  {
    id: 'sat-f9-v2-math-m2e-q16',
    section: 'math',
    moduleId: 'f9v2-math-module-2-easy',
    domain: 'Geometry and Trigonometry',
    skill: 'Circles',
    difficulty: 'medium',
    type: 'multiple_choice',
    question: 'A circle has a radius of 6. What is the circumference of the circle?',
    choices: [
      { label: 'A', text: '6π' },
      { label: 'B', text: '12π' },
      { label: 'C', text: '18π' },
      { label: 'D', text: '36π' },
    ],
    correctAnswer: 'B',
    explanation:
      'Circumference = 2πr = 2π(6) = 12π.',
    wrongAnswerExplanations: {
      A: '6π = πr, which uses only the radius once. The circumference formula is 2πr = 2π(6) = 12π.',
      C: '18π does not follow from either common formula. Circumference = 2πr = 12π; area = πr² = 36π.',
      D: '36π is the area (π × 6²), not the circumference. Circumference = 2πr = 12π.',
    },
  },
  // ── q17–q22: GRID-IN (medium) ─────────────────────────────────────────────
  {
    id: 'sat-f9-v2-math-m2e-q17',
    section: 'math',
    moduleId: 'f9v2-math-module-2-easy',
    domain: 'Algebra',
    skill: 'Linear functions',
    difficulty: 'medium',
    type: 'grid_in',
    question:
      'The function f is defined by f(x) = 3x − 2. What is the value of f(4)?',
    correctAnswer: '10',
    acceptableAnswers: ['10'],
    explanation:
      'Substitute x = 4: f(4) = 3(4) − 2 = 12 − 2 = 10.',
  },
  {
    id: 'sat-f9-v2-math-m2e-q18',
    section: 'math',
    moduleId: 'f9v2-math-module-2-easy',
    domain: 'Algebra',
    skill: 'Linear equations in one variable',
    difficulty: 'medium',
    type: 'grid_in',
    question: 'If 5x − 8 = 27, what is the value of x?',
    correctAnswer: '7',
    acceptableAnswers: ['7'],
    explanation:
      'Add 8 to both sides: 5x = 35. Divide by 5: x = 7.',
  },
  {
    id: 'sat-f9-v2-math-m2e-q19',
    section: 'math',
    moduleId: 'f9v2-math-module-2-easy',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'medium',
    type: 'grid_in',
    question:
      'The function h is defined by h(x) = 2^x. What is the value of h(5)?',
    correctAnswer: '32',
    acceptableAnswers: ['32'],
    explanation:
      'h(5) = 2^5 = 2 × 2 × 2 × 2 × 2 = 32.',
  },
  {
    id: 'sat-f9-v2-math-m2e-q20',
    section: 'math',
    moduleId: 'f9v2-math-module-2-easy',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Percentages',
    difficulty: 'medium',
    type: 'grid_in',
    question:
      'In a class of 20 students, 15 students completed their homework. What fraction of the students completed their homework? (Enter your answer as a decimal.)',
    correctAnswer: '0.75',
    acceptableAnswers: ['0.75', '3/4', '.75'],
    explanation:
      '15 out of 20 students completed homework. 15 ÷ 20 = 0.75.',
  },
  {
    id: 'sat-f9-v2-math-m2e-q21',
    section: 'math',
    moduleId: 'f9v2-math-module-2-easy',
    domain: 'Advanced Math',
    skill: 'Nonlinear equations in one variable and systems of equations',
    difficulty: 'medium',
    type: 'grid_in',
    question:
      'The graphs of y = x² and y = 6x + 7 intersect at two points. What is the larger y-coordinate of the two intersection points?',
    correctAnswer: '49',
    acceptableAnswers: ['49'],
    explanation:
      'Set x² = 6x + 7, so x² − 6x − 7 = 0. Factor: (x − 7)(x + 1) = 0, giving x = 7 or x = −1. The corresponding y-values are y = 7² = 49 and y = (−1)² = 1. The larger y-coordinate is 49.',
  },
  {
    id: 'sat-f9-v2-math-m2e-q22',
    section: 'math',
    moduleId: 'f9v2-math-module-2-easy',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Inference from sample statistics and margin of error',
    difficulty: 'medium',
    type: 'grid_in',
    question:
      'A survey of 60 students at a school found that 30% of the students prefer math as their favorite subject. Based on the survey, how many of the 60 students prefer math?',
    correctAnswer: '18',
    acceptableAnswers: ['18'],
    explanation:
      '30% of 60 = 0.30 × 60 = 18 students.',
  },
]
