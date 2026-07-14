import type { MathQuestion } from './types'

export const f5MathModule1Questions: MathQuestion[] = [
  {
    id: 'sat-f5-math-m1-q01',
    section: 'math',
    moduleId: 'f5-math-module-1',
    domain: 'Geometry and Trigonometry',
    skill: 'Circles',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'In the xy-plane, the points A(1, 3) and B(7, −1) are the endpoints of a diameter of a circle. Which of the following is the equation of the circle?',
    choices: [
      { label: 'A', text: '(x − 4)² + (y − 1)² = 13' },
      { label: 'B', text: '(x − 4)² + (y − 1)² = 52' },
      { label: 'C', text: '(x − 3)² + (y − 1)² = 13' },
      { label: 'D', text: '(x − 4)² + (y + 1)² = 13' },
    ],
    correctAnswer: 'A',
    explanation:
      'The center of the circle is the midpoint of the diameter: center = ((1 + 7)/2, (3 + (−1))/2) = (4, 1). The radius equals half the diameter length. Diameter length = √((7 − 1)² + (−1 − 3)²) = √(36 + 16) = √52. So r = √52 / 2, and r² = 52/4 = 13. The equation is (x − 4)² + (y − 1)² = 13.',
    wrongAnswerExplanations: {
      B: 'Choice B uses r² = 52, which is the square of the full diameter length, not the radius squared. The radius is half the diameter, so r² = 52/4 = 13.',
      C: 'Choice C uses an incorrect center. The midpoint of A(1, 3) and B(7, −1) is ((1+7)/2, (3+(−1))/2) = (4, 1), not (3, 1).',
      D: 'Choice D uses y + 1 instead of y − 1, which would place the center at (4, −1). The correct center is (4, 1).',
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
      'Line ℓ passes through the points (−2, 5) and (4, −1). Line m is perpendicular to line ℓ and passes through the point (3, 2). What is the y-intercept of line m?',
    choices: [
      { label: 'A', text: '−1' },
      { label: 'B', text: '0' },
      { label: 'C', text: '−3' },
      { label: 'D', text: '5' },
    ],
    correctAnswer: 'A',
    explanation:
      'First find the slope of line ℓ: m_ℓ = (−1 − 5) / (4 − (−2)) = −6 / 6 = −1. The slope of a line perpendicular to ℓ is the negative reciprocal: m_m = 1. Line m has slope 1 and passes through (3, 2): using point-slope form, y − 2 = 1(x − 3) → y = x − 1. The y-intercept is −1.',
    wrongAnswerExplanations: {
      B: 'Choice B is incorrect. y = x would pass through the origin, but it does not pass through (3, 2) since 2 ≠ 3.',
      C: 'Choice C is incorrect. A y-intercept of −3 would give y = x − 3. Checking the point (3, 2): 3 − 3 = 0 ≠ 2.',
      D: 'Choice D is incorrect. A y-intercept of 5 would give y = x + 5, which has slope 1 but fails the point check: 3 + 5 = 8 ≠ 2.',
    },
  },

  {
    id: 'sat-f5-math-m1-q03',
    section: 'math',
    moduleId: 'f5-math-module-1',
    domain: 'Algebra',
    skill: 'Linear functions',
    difficulty: 'easy',
    type: 'multiple_choice',
    stimulus:
      'A dog walker charges a flat fee of $10 per visit plus $5 for each additional dog walked. The total charge T, in dollars, for walking d dogs in a single visit is given by T(d) = 5d + 10.',
    question:
      'What is the total charge for walking 4 dogs in a single visit?',
    choices: [
      { label: 'A', text: '$20' },
      { label: 'B', text: '$25' },
      { label: 'C', text: '$30' },
      { label: 'D', text: '$40' },
    ],
    correctAnswer: 'C',
    explanation:
      'Substitute d = 4 into the function: T(4) = 5(4) + 10 = 20 + 10 = 30. The total charge is $30.',
    wrongAnswerExplanations: {
      A: 'Choice A is incorrect. $20 equals 5(4) without adding the flat fee of $10.',
      B: 'Choice B is incorrect. $25 results from computing 5(3) + 10, using d = 3 instead of d = 4.',
      D: 'Choice D is incorrect. $40 results from computing 5(4) + 20, using an incorrect flat fee of $20.',
    },
  },

  {
    id: 'sat-f5-math-m1-q04',
    section: 'math',
    moduleId: 'f5-math-module-1',
    domain: 'Algebra',
    skill: 'Systems of two linear equations in two variables',
    difficulty: 'easy',
    type: 'multiple_choice',
    question:
      'What is the value of y in the system of equations below?\n\nx + y = 9\nx = 3',
    choices: [
      { label: 'A', text: '3' },
      { label: 'B', text: '6' },
      { label: 'C', text: '9' },
      { label: 'D', text: '12' },
    ],
    correctAnswer: 'B',
    explanation:
      'Substitute x = 3 into the first equation: 3 + y = 9. Subtract 3 from both sides: y = 6.',
    wrongAnswerExplanations: {
      A: 'Choice A is incorrect. 3 is the value of x, not y.',
      C: 'Choice C is incorrect. 9 is the sum x + y, not the value of y alone.',
      D: 'Choice D is incorrect. 12 results from adding x to the sum instead of subtracting.',
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
    difficulty: 'hard',
    type: 'multiple_choice',
    stimulus:
      'A data set of seven values is listed in increasing order: 14, 19, k, 27, 31, 38, 45, where k is an integer with 19 ≤ k ≤ 27.',
    question:
      'A value of k is chosen so that when k is replaced by k + 8, the median increases but the mean does not change. Which of the following could be the value of k?',
    choices: [
      { label: 'A', text: '19' },
      { label: 'B', text: '23' },
      { label: 'C', text: '26' },
      { label: 'D', text: 'No such value of k exists.' },
    ],
    correctAnswer: 'D',
    explanation:
      'The mean of the seven values is (14 + 19 + k + 27 + 31 + 38 + 45) / 7 = (174 + k) / 7. If k is replaced by k + 8, the new mean is (174 + k + 8) / 7 = (182 + k) / 7. For the mean to remain unchanged, we need (182 + k) / 7 = (174 + k) / 7, which requires 182 + k = 174 + k → 182 = 174, a contradiction. So adding 8 to k always increases the mean by 8/7. There is no integer value of k in [19, 27] for which replacing k with k + 8 leaves the mean unchanged. The answer is D.',
    wrongAnswerExplanations: {
      A: 'Choice A is incorrect. If k = 19, replacing it with 27 shifts the mean by +8/7. The mean always changes when any data value changes.',
      B: 'Choice B is incorrect. If k = 23, replacing it with 31 changes the mean from (174 + 23)/7 = 28.1 to (174 + 31)/7 = 29.3. The mean increases.',
      C: 'Choice C is incorrect. If k = 26, replacing it with 34 changes the mean. In all cases, changing one data value changes the sum and therefore the mean.',
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
    difficulty: 'hard',
    type: 'multiple_choice',
    stimulus:
      'A radioactive substance decays so that the amount remaining is halved every 6 years. A sample initially contains 960 grams.',
    question:
      'Which inequality can be used to find the number of complete 6-year periods, n, after which the remaining amount first falls below 20 grams?',
    choices: [
      { label: 'A', text: '960 · (1/2)^n < 20' },
      { label: 'B', text: '960 · (1/2)^n > 20' },
      { label: 'C', text: '960 · 2^n < 20' },
      { label: 'D', text: '960 − 6n < 20' },
    ],
    correctAnswer: 'A',
    explanation:
      'After each 6-year period, the amount is multiplied by 1/2. After n periods the amount is 960 · (1/2)^n. For this to fall below 20 grams, we need 960 · (1/2)^n < 20. Solving: (1/2)^n < 20/960 = 1/48, so 2^n > 48. Since 2⁵ = 32 < 48 and 2⁶ = 64 > 48, the smallest integer n is 6, meaning it first falls below 20 grams after 6 complete 6-year periods (i.e., after 36 years).',
    wrongAnswerExplanations: {
      B: 'Choice B is incorrect. The inequality 960 · (1/2)^n > 20 would identify periods when the amount is still above 20 grams, not when it first falls below.',
      C: 'Choice C is incorrect. 960 · 2^n grows over time (doubling), which does not model decay. A decaying quantity uses (1/2)^n, not 2^n.',
      D: 'Choice D is incorrect. 960 − 6n is a linear model that decreases by 6 each period. Radioactive decay is exponential, not linear. This model would also predict negative amounts for large n.',
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

  {
    id: 'sat-f5-math-m1-q22',
    section: 'math',
    moduleId: 'f5-math-module-1',
    domain: 'Geometry and Trigonometry',
    skill: 'Area and volume',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'A cylinder has a radius of r and a height equal to twice its radius. A cone has the same radius r and the same height as the cylinder. What fraction of the cylinder\'s volume is the cone\'s volume?',
    choices: [
      { label: 'A', text: '1/6' },
      { label: 'B', text: '1/4' },
      { label: 'C', text: '1/3' },
      { label: 'D', text: '2/3' },
    ],
    correctAnswer: 'C',
    explanation:
      'Height of both shapes: h = 2r. Volume of cylinder: V_cyl = πr²h = πr²(2r) = 2πr³. Volume of cone: V_cone = (1/3)πr²h = (1/3)πr²(2r) = (2/3)πr³. Fraction = V_cone / V_cyl = (2πr³/3) / (2πr³) = 1/3.',
    wrongAnswerExplanations: {
      A: 'Choice A is incorrect. 1/6 would result from dividing the cone formula (1/3)πr²h by 2, but the denominator is the full cylinder volume 2πr³, not πr³.',
      B: 'Choice B is incorrect. 1/4 does not correspond to either volume formula. The cone\'s volume is always 1/3 of the volume of a cylinder with the same base and height.',
      D: 'Choice D is incorrect. 2/3 is the ratio of a sphere\'s volume to its circumscribed cylinder\'s volume — not the cone-to-cylinder ratio here.',
    },
  },
]
