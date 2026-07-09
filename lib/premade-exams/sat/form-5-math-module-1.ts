import type { MathQuestion } from './types'

export const f5MathModule1Questions: MathQuestion[] = [
  // ─── Algebra (q01–q08) ────────────────────────────────────────────────────────

  {
    id: 'sat-f5-math-m1-q01',
    section: 'math',
    moduleId: 'f5-math-module-1',
    domain: 'Algebra',
    skill: 'Linear equations in one variable',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'A food truck charges a flat service fee of $5 plus $3.50 per taco ordered. A customer paid $26 in total. How many tacos did the customer order?',
    choices: [
      { label: 'A', text: '5' },
      { label: 'B', text: '6' },
      { label: 'C', text: '7' },
      { label: 'D', text: '8' },
    ],
    correctAnswer: 'B',
    explanation:
      '5 + 3.50t = 26 → 3.50t = 21 → t = 6. The customer ordered 6 tacos.',
    wrongAnswerExplanations: {
      A: '5 + 3.50(5) = 22.50, not 26.',
      C: '5 + 3.50(7) = 29.50, not 26.',
      D: '5 + 3.50(8) = 33, not 26.',
    },
  },

  {
    id: 'sat-f5-math-m1-q02',
    section: 'math',
    moduleId: 'f5-math-module-1',
    domain: 'Algebra',
    skill: 'Linear equations in two variables',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'A line passes through the points (2, 1) and (8, 13). What is the slope of the line?',
    choices: [
      { label: 'A', text: '1' },
      { label: 'B', text: '2' },
      { label: 'C', text: '3' },
      { label: 'D', text: '4' },
    ],
    correctAnswer: 'B',
    explanation:
      'slope = (13 − 1) / (8 − 2) = 12 / 6 = 2.',
    wrongAnswerExplanations: {
      A: 'This would require a rise of 6 over a run of 6, but the rise is 12.',
      C: 'This would require a rise of 18 over a run of 6, but the rise is 12.',
      D: 'This would require a rise of 24 over a run of 6, but the rise is 12.',
    },
  },

  {
    id: 'sat-f5-math-m1-q03',
    section: 'math',
    moduleId: 'f5-math-module-1',
    domain: 'Algebra',
    skill: 'Linear functions',
    difficulty: 'medium',
    type: 'multiple_choice',
    stimulus:
      'A car rental company charges customers based on the number of miles driven. The total cost C, in dollars, is modeled by the function C(m) = 0.25m + 40, where m is the number of miles driven.',
    question:
      'What is the best interpretation of the value 0.25 in this context?',
    choices: [
      { label: 'A', text: 'The flat daily rental fee is $0.25.' },
      { label: 'B', text: 'The cost increases by $0.25 for each additional mile driven.' },
      { label: 'C', text: 'The total cost is $0.25 when no miles are driven.' },
      { label: 'D', text: 'The car can travel 0.25 miles per dollar spent.' },
    ],
    correctAnswer: 'B',
    explanation:
      'In the linear function C(m) = 0.25m + 40, the coefficient of m is the rate of change. It represents the additional cost per mile: $0.25 per mile driven.',
    wrongAnswerExplanations: {
      A: 'The flat daily fee is the constant term, $40, not 0.25.',
      C: 'When m = 0, C(0) = 40, not 0.25.',
      D: 'The slope gives cost per mile (dollars per mile), not miles per dollar.',
    },
  },

  {
    id: 'sat-f5-math-m1-q04',
    section: 'math',
    moduleId: 'f5-math-module-1',
    domain: 'Algebra',
    skill: 'Systems of two linear equations in two variables',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'What is the x-coordinate of the solution to the system of equations below?\n\n2x + y = 11\nx − y = 1',
    choices: [
      { label: 'A', text: '2' },
      { label: 'B', text: '3' },
      { label: 'C', text: '4' },
      { label: 'D', text: '5' },
    ],
    correctAnswer: 'C',
    explanation:
      'Adding the two equations: (2x + y) + (x − y) = 11 + 1 → 3x = 12 → x = 4.',
    wrongAnswerExplanations: {
      A: 'If x = 2, then 2(2) + y = 11 gives y = 7, but x − y = 2 − 7 = −5 ≠ 1.',
      B: 'If x = 3, then 2(3) + y = 11 gives y = 5, but x − y = 3 − 5 = −2 ≠ 1.',
      D: 'If x = 5, then 2(5) + y = 11 gives y = 1, but x − y = 5 − 1 = 4 ≠ 1.',
    },
  },

  {
    id: 'sat-f5-math-m1-q05',
    section: 'math',
    moduleId: 'f5-math-module-1',
    domain: 'Algebra',
    skill: 'Systems of two linear equations in two variables',
    difficulty: 'medium',
    type: 'grid_in',
    question:
      'In the system of equations below, what is the value of y?\n\n3x + 2y = 20\nx = 4',
    correctAnswer: '4',
    acceptableAnswers: ['4'],
    explanation:
      'Substitute x = 4 into the first equation: 3(4) + 2y = 20 → 12 + 2y = 20 → 2y = 8 → y = 4.',
  },

  {
    id: 'sat-f5-math-m1-q06',
    section: 'math',
    moduleId: 'f5-math-module-1',
    domain: 'Algebra',
    skill: 'Linear inequalities in one or two variables',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'Which of the following is the solution set of 3x − 7 > 8?',
    choices: [
      { label: 'A', text: 'x < 5' },
      { label: 'B', text: 'x > 3' },
      { label: 'C', text: 'x > 5' },
      { label: 'D', text: 'x < −5' },
    ],
    correctAnswer: 'C',
    explanation:
      '3x − 7 > 8 → 3x > 15 → x > 5.',
    wrongAnswerExplanations: {
      A: 'The inequality sign is flipped incorrectly; there is no division by a negative number here.',
      B: '3x > 15 gives x > 5, not x > 3. Dividing 15 by 3 yields 5.',
      D: 'The inequality direction is wrong and the value is negative, which cannot result from adding 7 and dividing by 3.',
    },
  },

  {
    id: 'sat-f5-math-m1-q07',
    section: 'math',
    moduleId: 'f5-math-module-1',
    domain: 'Algebra',
    skill: 'Linear equations in one variable',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'If (x/3) − (2x/5) = k, where k is a constant, and x = 15, what is the value of k?',
    choices: [
      { label: 'A', text: '−3' },
      { label: 'B', text: '−1' },
      { label: 'C', text: '1' },
      { label: 'D', text: '3' },
    ],
    correctAnswer: 'B',
    explanation:
      'Substitute x = 15: (15/3) − (2·15/5) = 5 − 6 = −1. So k = −1.',
    wrongAnswerExplanations: {
      A: '15/3 = 5 and 2(15)/5 = 6. The difference is 5 − 6 = −1, not −3.',
      C: 'The second term (6) is larger than the first (5), so the result is negative, not positive.',
      D: 'This would require 15/3 − 2(15)/5 = 3, which gives 5 − 6 = −1 ≠ 3.',
    },
  },

  {
    id: 'sat-f5-math-m1-q08',
    section: 'math',
    moduleId: 'f5-math-module-1',
    domain: 'Algebra',
    skill: 'Linear functions',
    difficulty: 'medium',
    type: 'grid_in',
    stimulus:
      'A plumber charges a fixed call-out fee plus an hourly rate. After 2 hours of work, the total charge is $130. After 5 hours of work, the total charge is $250.',
    question:
      'What is the plumber\'s fixed call-out fee, in dollars?',
    correctAnswer: '50',
    acceptableAnswers: ['50'],
    explanation:
      'Let f be the fixed fee and r be the hourly rate. From the two data points: f + 2r = 130 and f + 5r = 250. Subtracting the first from the second: 3r = 120 → r = 40. Substituting back: f + 2(40) = 130 → f + 80 = 130 → f = 50.',
  },

  // ─── Advanced Math (q09–q15) ──────────────────────────────────────────────────

  {
    id: 'sat-f5-math-m1-q09',
    section: 'math',
    moduleId: 'f5-math-module-1',
    domain: 'Advanced Math',
    skill: 'Quadratic equations',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'What are the solutions to x² − 7x + 12 = 0?',
    choices: [
      { label: 'A', text: 'x = 2 and x = 6' },
      { label: 'B', text: 'x = 3 and x = 4' },
      { label: 'C', text: 'x = −3 and x = −4' },
      { label: 'D', text: 'x = 1 and x = 12' },
    ],
    correctAnswer: 'B',
    explanation:
      'Factor: x² − 7x + 12 = (x − 3)(x − 4) = 0. So x = 3 or x = 4. Check: 3 + 4 = 7 ✓ and 3 × 4 = 12 ✓.',
    wrongAnswerExplanations: {
      A: '2 + 6 = 8 ≠ 7, and 2 × 6 = 12. The product is correct but the sum is not.',
      C: 'These give (x + 3)(x + 4) = x² + 7x + 12, which has a positive middle term, not negative.',
      D: '1 + 12 = 13 ≠ 7. Neither condition is satisfied.',
    },
  },

  {
    id: 'sat-f5-math-m1-q10',
    section: 'math',
    moduleId: 'f5-math-module-1',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'The function f(x) = −2x² + 8x − 3 has a graph that is a parabola. Which of the following best describes the parabola?',
    choices: [
      { label: 'A', text: 'Opens upward with a minimum value' },
      { label: 'B', text: 'Opens downward with a maximum value' },
      { label: 'C', text: 'Opens upward with a maximum value' },
      { label: 'D', text: 'Opens downward with a minimum value' },
    ],
    correctAnswer: 'B',
    explanation:
      'The leading coefficient is −2, which is negative. A negative leading coefficient means the parabola opens downward, so it has a maximum value (at the vertex), not a minimum.',
    wrongAnswerExplanations: {
      A: 'A parabola opens upward only when the leading coefficient is positive. Here it is −2.',
      C: 'A parabola that opens upward has a minimum, not a maximum.',
      D: 'A downward-opening parabola has a maximum value at the vertex, not a minimum.',
    },
  },

  {
    id: 'sat-f5-math-m1-q11',
    section: 'math',
    moduleId: 'f5-math-module-1',
    domain: 'Advanced Math',
    skill: 'Equivalent expressions',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'Which of the following is equivalent to (x − 3)(x + 5) + 2x?',
    choices: [
      { label: 'A', text: 'x² + 4x − 15' },
      { label: 'B', text: 'x² − 4x − 15' },
      { label: 'C', text: 'x² + 4x + 15' },
      { label: 'D', text: 'x² − 2x − 15' },
    ],
    correctAnswer: 'A',
    explanation:
      'Expand (x − 3)(x + 5) = x² + 5x − 3x − 15 = x² + 2x − 15. Then add 2x: x² + 2x − 15 + 2x = x² + 4x − 15.',
    wrongAnswerExplanations: {
      B: 'x² − 4x − 15 would require subtracting 2x rather than adding it.',
      C: 'The constant term −15 comes from (−3)(5) = −15, not +15.',
      D: 'x² − 2x − 15 does not include the additional +2x from the outside term.',
    },
  },

  {
    id: 'sat-f5-math-m1-q12',
    section: 'math',
    moduleId: 'f5-math-module-1',
    domain: 'Advanced Math',
    skill: 'Quadratic equations',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'For what values of k does the equation x² − 6x + k = 0 have two distinct real solutions?',
    choices: [
      { label: 'A', text: 'k < 9' },
      { label: 'B', text: 'k > 9' },
      { label: 'C', text: 'k = 9' },
      { label: 'D', text: 'k < −9' },
    ],
    correctAnswer: 'A',
    explanation:
      'For two distinct real solutions, the discriminant must be positive: b² − 4ac > 0. Here a = 1, b = −6, c = k. So (−6)² − 4(1)(k) > 0 → 36 − 4k > 0 → 4k < 36 → k < 9.',
    wrongAnswerExplanations: {
      B: 'If k > 9, the discriminant 36 − 4k < 0, meaning no real solutions exist.',
      C: 'If k = 9, the discriminant equals 0, which gives exactly one repeated solution, not two distinct ones.',
      D: 'k < −9 is a subset of k < 9 and too restrictive; any k < 9 (not just k < −9) gives two solutions.',
    },
  },

  {
    id: 'sat-f5-math-m1-q13',
    section: 'math',
    moduleId: 'f5-math-module-1',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'medium',
    type: 'grid_in',
    question:
      'What is the x-coordinate of the vertex of the parabola defined by f(x) = 2x² − 12x + 7?',
    correctAnswer: '3',
    acceptableAnswers: ['3'],
    explanation:
      'The x-coordinate of the vertex is given by x = −b/(2a). Here a = 2, b = −12. So x = −(−12)/(2·2) = 12/4 = 3.',
  },

  {
    id: 'sat-f5-math-m1-q14',
    section: 'math',
    moduleId: 'f5-math-module-1',
    domain: 'Advanced Math',
    skill: 'Exponential functions',
    difficulty: 'medium',
    type: 'multiple_choice',
    stimulus:
      'A savings account has an initial balance of $1,000 and grows at an annual interest rate of 5%, compounded annually.',
    question:
      'Which expression represents the account balance, in dollars, after t years?',
    choices: [
      { label: 'A', text: '1000 + 0.05t' },
      { label: 'B', text: '1000(1.05)^t' },
      { label: 'C', text: '1000(0.05)^t' },
      { label: 'D', text: '1000(1.5)^t' },
    ],
    correctAnswer: 'B',
    explanation:
      'Compounded annual growth at rate r means the balance multiplies by (1 + r) each year. Starting at $1,000 with r = 0.05, the balance after t years is 1000(1 + 0.05)^t = 1000(1.05)^t.',
    wrongAnswerExplanations: {
      A: 'This is linear growth, adding a fixed amount each year, not compound interest.',
      C: '0.05 is the rate, not the growth factor. The growth factor is 1 + 0.05 = 1.05.',
      D: '1.5 would represent a 50% annual rate, not 5%.',
    },
  },

  {
    id: 'sat-f5-math-m1-q15',
    section: 'math',
    moduleId: 'f5-math-module-1',
    domain: 'Advanced Math',
    skill: 'Equivalent expressions',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'Which of the following is equivalent to (x² − 9) / (x² − x − 6), for x ≠ 3 and x ≠ −2?',
    choices: [
      { label: 'A', text: '(x − 3) / (x − 3)' },
      { label: 'B', text: '(x + 3) / (x + 2)' },
      { label: 'C', text: '(x − 3) / (x + 2)' },
      { label: 'D', text: '(x + 3) / (x − 3)' },
    ],
    correctAnswer: 'B',
    explanation:
      'Factor the numerator: x² − 9 = (x + 3)(x − 3). Factor the denominator: x² − x − 6 = (x − 3)(x + 2). Cancel the common factor (x − 3): (x + 3)(x − 3) / [(x − 3)(x + 2)] = (x + 3) / (x + 2).',
    wrongAnswerExplanations: {
      A: '(x−3)/(x−3) = 1 for all valid x, which is not equivalent to the original expression.',
      C: 'The numerator after canceling is (x + 3), not (x − 3).',
      D: 'The denominator after canceling is (x + 2), not (x − 3).',
    },
  },

  // ─── Problem-Solving and Data Analysis (q16–q19) ─────────────────────────────

  {
    id: 'sat-f5-math-m1-q16',
    section: 'math',
    moduleId: 'f5-math-module-1',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Ratios, rates, and proportional relationships',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'A factory produces 360 units in 8 hours. At this same rate, how many units will the factory produce in 15 hours?',
    choices: [
      { label: 'A', text: '540' },
      { label: 'B', text: '630' },
      { label: 'C', text: '675' },
      { label: 'D', text: '720' },
    ],
    correctAnswer: 'C',
    explanation:
      'Unit rate = 360 / 8 = 45 units per hour. In 15 hours: 45 × 15 = 675 units.',
    wrongAnswerExplanations: {
      A: '540 / 15 = 36 units per hour, which is not the rate of 45 units per hour.',
      B: '630 / 15 = 42, which is not 45.',
      D: '720 / 15 = 48, which is not 45. This would be the output in 16 hours.',
    },
  },

  {
    id: 'sat-f5-math-m1-q17',
    section: 'math',
    moduleId: 'f5-math-module-1',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Percentages',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'A jacket originally costs $80. It is first discounted by 20%, then the discounted price is increased by 10%. What is the final price of the jacket?',
    choices: [
      { label: 'A', text: '$70.40' },
      { label: 'B', text: '$72.00' },
      { label: 'C', text: '$74.40' },
      { label: 'D', text: '$78.00' },
    ],
    correctAnswer: 'A',
    explanation:
      'After a 20% discount: $80 × 0.80 = $64. After a 10% increase on $64: $64 × 1.10 = $70.40.',
    wrongAnswerExplanations: {
      B: '$72 would result from applying a net 10% discount (20% − 10% = 10%), but the operations must be applied sequentially, not combined.',
      C: '$74.40 is incorrect. The second increase is 10% of the discounted price ($64), not 10% of the original.',
      D: '$78 = $80 × 0.975, which does not correspond to either operation correctly.',
    },
  },

  {
    id: 'sat-f5-math-m1-q18',
    section: 'math',
    moduleId: 'f5-math-module-1',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Data distributions and statistics',
    difficulty: 'medium',
    type: 'multiple_choice',
    stimulus:
      'A teacher recorded the test scores of five students. The scores were 72, 85, 91, 68, and 84.',
    question:
      'What is the mean score of the five students?',
    choices: [
      { label: 'A', text: '78' },
      { label: 'B', text: '80' },
      { label: 'C', text: '84' },
      { label: 'D', text: '85' },
    ],
    correctAnswer: 'B',
    explanation:
      'Sum of scores = 72 + 85 + 91 + 68 + 84 = 400. Mean = 400 / 5 = 80.',
    wrongAnswerExplanations: {
      A: '78 × 5 = 390 ≠ 400. The sum of all five scores is 400.',
      C: '84 is the fourth score in the list, not the mean.',
      D: '85 is the second score in the list. The mean requires summing all scores and dividing by 5.',
    },
  },

  {
    id: 'sat-f5-math-m1-q19',
    section: 'math',
    moduleId: 'f5-math-module-1',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Probability',
    difficulty: 'medium',
    type: 'grid_in',
    stimulus:
      'A bag contains 5 red marbles, 3 blue marbles, and 2 green marbles, for a total of 10 marbles. One marble is drawn at random.',
    question:
      'What is the probability that the marble drawn is blue? Enter your answer as a fraction or decimal.',
    correctAnswer: '3/10',
    acceptableAnswers: ['3/10', '.3', '0.3'],
    explanation:
      'There are 3 blue marbles out of 10 total. Probability = 3/10 = 0.3.',
  },

  // ─── Geometry and Trigonometry (q20–q22) ─────────────────────────────────────

  {
    id: 'sat-f5-math-m1-q20',
    section: 'math',
    moduleId: 'f5-math-module-1',
    domain: 'Geometry and Trigonometry',
    skill: 'Lines, angles, and triangles',
    difficulty: 'medium',
    type: 'multiple_choice',
    stimulus:
      'Two parallel lines are cut by a transversal. One of the interior angles formed on the same side of the transversal measures 65°.',
    question:
      'What is the measure of the co-interior angle (same-side interior angle) on the other parallel line, in degrees?',
    choices: [
      { label: 'A', text: '25°' },
      { label: 'B', text: '65°' },
      { label: 'C', text: '115°' },
      { label: 'D', text: '130°' },
    ],
    correctAnswer: 'C',
    explanation:
      'Co-interior angles (also called same-side interior or consecutive interior angles) are supplementary when lines are parallel. So the other angle = 180° − 65° = 115°.',
    wrongAnswerExplanations: {
      A: '25° = 90° − 65°, which applies to complementary angles, not co-interior angles.',
      B: '65° would be the alternate interior angle, which is equal, not the co-interior angle.',
      D: '130° = 2 × 65°, which has no geometric basis here.',
    },
  },

  {
    id: 'sat-f5-math-m1-q21',
    section: 'math',
    moduleId: 'f5-math-module-1',
    domain: 'Geometry and Trigonometry',
    skill: 'Right triangles and trigonometry',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'In a right triangle, the two legs have lengths 9 and 12. What is the length of the hypotenuse?',
    choices: [
      { label: 'A', text: '13' },
      { label: 'B', text: '15' },
      { label: 'C', text: '17' },
      { label: 'D', text: '21' },
    ],
    correctAnswer: 'B',
    explanation:
      'By the Pythagorean theorem: c² = 9² + 12² = 81 + 144 = 225. So c = √225 = 15.',
    wrongAnswerExplanations: {
      A: '13² = 169 ≠ 225. A 9-12-13 triangle is not a right triangle.',
      C: '17² = 289 ≠ 225.',
      D: '21² = 441 ≠ 225. This is too large.',
    },
  },

  {
    id: 'sat-f5-math-m1-q22',
    section: 'math',
    moduleId: 'f5-math-module-1',
    domain: 'Geometry and Trigonometry',
    skill: 'Area and volume',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'A rectangle has a length of (3x + 2) and a width of 4. Which expression represents the area of the rectangle?',
    choices: [
      { label: 'A', text: '12x + 2' },
      { label: 'B', text: '12x + 6' },
      { label: 'C', text: '12x + 8' },
      { label: 'D', text: '7x + 6' },
    ],
    correctAnswer: 'C',
    explanation:
      'Area = length × width = 4(3x + 2) = 12x + 8.',
    wrongAnswerExplanations: {
      A: '4(3x + 2) = 12x + 8, not 12x + 2. The constant term must be 4 × 2 = 8.',
      B: '12x + 6 would result from 3(4x + 2) or a different product; 4 × 2 = 8 not 6.',
      D: '7x + 6 appears to add rather than multiply the dimensions.',
    },
  },
]
