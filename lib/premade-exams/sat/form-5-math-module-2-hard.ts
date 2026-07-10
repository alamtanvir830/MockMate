import type { MathQuestion } from './types'

export const f5MathModule2HardQuestions: MathQuestion[] = [
  {
    id: 'sat-f5-math-m2h-q01',
    section: 'math',
    moduleId: 'f5-math-module-2-hard',
    domain: 'Algebra',
    skill: 'Systems of two linear equations in two variables',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'The system of equations 4x + ky = 8 and 2x + 3y = 5 has no solution. What is the value of k?',
    choices: [
      { label: 'A', text: '3' },
      { label: 'B', text: '6' },
      { label: 'C', text: '−6' },
      { label: 'D', text: '12' },
    ],
    correctAnswer: 'B',
    explanation:
      'A system of two linear equations has no solution when the lines are parallel — same slope but different y-intercepts. For the first equation 4x + ky = 8, the slope is −4/k. For the second equation 2x + 3y = 5, the slope is −2/3. Set slopes equal: −4/k = −2/3 → 4/k = 2/3 → k = 6. Now check whether the lines are truly parallel (not identical): with k = 6, the first equation is 4x + 6y = 8, or 2x + 3y = 4 (dividing by 2). The second is 2x + 3y = 5. Since 4 ≠ 5, the lines have equal slopes but different y-intercepts — they are parallel and the system has no solution. Answer: k = 6.',
    wrongAnswerExplanations: {
      A: 'k = 3 gives 4x + 3y = 8 and 2x + 3y = 5. Subtracting the second from the first: 2x = 3, so x = 3/2 and y = 4/3. This is one unique solution, not no solution.',
      C: 'k = −6 gives slope 4/6 = 2/3 for the first line and −2/3 for the second — the slopes differ (one positive, one negative), so the lines intersect and there is one solution.',
      D: 'k = 12 gives slope −4/12 = −1/3 for the first line, which differs from −2/3. Different slopes mean the lines intersect (one solution).',
    },
  },

  {
    id: 'sat-f5-math-m2h-q07',
    section: 'math',
    moduleId: 'f5-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Quadratic equations',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'Which of the following is equivalent to x² − 10x + 29?',
    choices: [
      { label: 'A', text: '(x − 5)² + 4' },
      { label: 'B', text: '(x − 5)² − 4' },
      { label: 'C', text: '(x + 5)² + 4' },
      { label: 'D', text: '(x − 10)² + 29' },
    ],
    correctAnswer: 'A',
    explanation:
      'Complete the square: x² − 10x + 29 = (x² − 10x + 25) + 4 = (x − 5)² + 4. The vertex form is (x − 5)² + 4.',
    wrongAnswerExplanations: {
      B: '(x − 5)² − 4 = x² − 10x + 25 − 4 = x² − 10x + 21, which has a different constant term.',
      C: '(x + 5)² + 4 = x² + 10x + 25 + 4 = x² + 10x + 29, with the wrong sign on the middle term.',
      D: '(x − 10)² + 29 = x² − 20x + 100 + 29 = x² − 20x + 129, which is entirely different.',
    },
  },

  {
    id: 'sat-f5-math-m2h-q14',
    section: 'math',
    moduleId: 'f5-math-module-2-hard',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Ratios, rates, proportional relationships, and units',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'Machine A can complete a job in 6 hours. Machine B can complete the same job in 9 hours. If both machines work together, how many hours will it take them to complete the job?',
    choices: [
      { label: 'A', text: '3.0' },
      { label: 'B', text: '3.6' },
      { label: 'C', text: '4.5' },
      { label: 'D', text: '5.4' },
    ],
    correctAnswer: 'B',
    explanation:
      'Machine A\'s rate is 1/6 of the job per hour; Machine B\'s rate is 1/9. Combined rate = 1/6 + 1/9 = 3/18 + 2/18 = 5/18 jobs per hour. Time = 1 ÷ (5/18) = 18/5 = 3.6 hours.',
    wrongAnswerExplanations: {
      A: '3.0 hours is the harmonic mean of 6 and 9 computed incorrectly as (6 + 9)/5 = 3, confusing the formula.',
      C: '4.5 hours is the average of 6/2 and 9/2, not the combined work rate calculation.',
      D: '5.4 hours is the result of averaging 6 and 9 then applying an incorrect reciprocal.',
    },
  },

  {
    id: 'sat-f5-math-m2h-q02',
    section: 'math',
    moduleId: 'f5-math-module-2-hard',
    domain: 'Algebra',
    skill: 'Linear equations in one variable',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'What value of x satisfies (x + 3)/4 − (x − 3)/6 = 2?',
    choices: [
      { label: 'A', text: '5' },
      { label: 'B', text: '7' },
      { label: 'C', text: '9' },
      { label: 'D', text: '11' },
    ],
    correctAnswer: 'C',
    explanation:
      'Multiply every term by 12 (the LCM of 4 and 6): 12·(x+3)/4 − 12·(x−3)/6 = 12·2. This gives 3(x + 3) − 2(x − 3) = 24. Expand: 3x + 9 − 2x + 6 = 24. Combine: x + 15 = 24 → x = 9. Verify: (9+3)/4 − (9−3)/6 = 12/4 − 6/6 = 3 − 1 = 2 ✓.',
    wrongAnswerExplanations: {
      A: 'x = 5 results from incorrectly distributing the negative sign as −2(x + 3) instead of −2(x − 3), changing the sign of the 3.',
      B: 'x = 7 results from multiplying only the numerators by 12 without correctly clearing the denominators (for example, treating the equation as x + 3 − (x − 3) = 24).',
      D: 'x = 11 comes from adding the fractions instead of subtracting, giving 3(x+3) + 2(x−3) = 24 → 5x + 3 = 24 → x = 21/5, then rounding up incorrectly to 11.',
    },
  },

  {
    id: 'sat-f5-math-m2h-q08',
    section: 'math',
    moduleId: 'f5-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'If f(x) = x² − 4x and g(x) = 2x − 7, for how many values of x does f(x) = g(x)?',
    choices: [
      { label: 'A', text: 'Zero' },
      { label: 'B', text: 'One' },
      { label: 'C', text: 'Two' },
      { label: 'D', text: 'Three' },
    ],
    correctAnswer: 'C',
    explanation:
      'Set f(x) = g(x): x² − 4x = 2x − 7. Rearrange: x² − 6x + 7 = 0. Compute the discriminant: b² − 4ac = (−6)² − 4(1)(7) = 36 − 28 = 8. Since 8 > 0, there are two distinct real solutions. The parabola and the line intersect at exactly two points.',
    wrongAnswerExplanations: {
      A: 'Zero intersections would require the discriminant to be negative. Here the discriminant is 8 > 0, so two intersections exist.',
      B: 'One intersection would require the discriminant to equal zero (the line is tangent to the parabola). Here the discriminant is 8, not 0.',
      D: 'Three intersections are impossible when one equation is linear and the other is quadratic — there can be at most two.',
    },
  },

  {
    id: 'sat-f5-math-m2h-q15',
    section: 'math',
    moduleId: 'f5-math-module-2-hard',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Percentages',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'A jacket is marked up by 40% from its wholesale cost, then placed on sale at 25% off the marked price. The final sale price is what percent of the original wholesale cost?',
    choices: [
      { label: 'A', text: '95%' },
      { label: 'B', text: '105%' },
      { label: 'C', text: '115%' },
      { label: 'D', text: '125%' },
    ],
    correctAnswer: 'B',
    explanation:
      'Let the wholesale cost be C. Marked price = 1.40C. Sale price = 0.75 × 1.40C = 1.05C. The sale price is 1.05C, which is 105% of the wholesale cost.',
    wrongAnswerExplanations: {
      A: '95% would result from a 5% net decrease; subtracting 40% − 25% = 15% net markup incorrectly gives 115%, not 95%.',
      C: '115% results from incorrectly computing 40% − 25% = 15% net markup and adding it to 100%.',
      D: '125% results from adding 40% and 25% instead of applying them sequentially.',
    },
  },

  {
    id: 'sat-f5-math-m2h-q03',
    section: 'math',
    moduleId: 'f5-math-module-2-hard',
    domain: 'Algebra',
    skill: 'Linear functions',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'A linear function f satisfies f(3) = 11 and f(−1) = −5. What is f(7)?',
    choices: [
      { label: 'A', text: '23' },
      { label: 'B', text: '27' },
      { label: 'C', text: '31' },
      { label: 'D', text: '35' },
    ],
    correctAnswer: 'B',
    explanation:
      'Find the slope: m = (11 − (−5))/(3 − (−1)) = 16/4 = 4. Use point-slope with (3, 11): f(x) = 4(x − 3) + 11 = 4x − 12 + 11 = 4x − 1. Check: f(−1) = −4 − 1 = −5 ✓. Then f(7) = 4(7) − 1 = 28 − 1 = 27.',
    wrongAnswerExplanations: {
      A: 'f(7) = 23 results from using slope 3 instead of 4.',
      C: 'f(7) = 31 comes from using the correct slope but adding the y-intercept twice.',
      D: 'f(7) = 35 results from forgetting to subtract 1 (the y-intercept) after computing 4 × 9.',
    },
  },

  {
    id: 'sat-f5-math-m2h-q09',
    section: 'math',
    moduleId: 'f5-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Equivalent expressions',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'Which expression is equivalent to (x² − 9)/(x² − x − 6) for x ≠ 3 and x ≠ −2?',
    choices: [
      { label: 'A', text: '(x + 3)/(x + 2)' },
      { label: 'B', text: '(x − 3)/(x − 2)' },
      { label: 'C', text: '(x + 3)/(x − 2)' },
      { label: 'D', text: '(x − 3)/(x + 2)' },
    ],
    correctAnswer: 'A',
    explanation:
      'Factor the numerator: x² − 9 = (x − 3)(x + 3). Factor the denominator: x² − x − 6 = (x − 3)(x + 2). Cancel the common factor (x − 3): (x − 3)(x + 3)/[(x − 3)(x + 2)] = (x + 3)/(x + 2), valid for x ≠ 3.',
    wrongAnswerExplanations: {
      B: '(x − 3)/(x − 2) incorrectly factors the denominator as (x − 3)(x − 2), but x² − x − 6 = (x − 3)(x + 2).',
      C: '(x + 3)/(x − 2) uses a correct numerator factor but incorrect denominator factoring.',
      D: '(x − 3)/(x + 2) cancels the wrong factor from the numerator, leaving the (x − 3) term instead of (x + 3).',
    },
  },

  {
    id: 'sat-f5-math-m2h-q16',
    section: 'math',
    moduleId: 'f5-math-module-2-hard',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Data distributions and statistics',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'A data set of seven values has a mean of 12 and a median of 10. A new value of 30 is added to the set. Which of the following must be true?',
    choices: [
      { label: 'A', text: 'The mean increases and the median stays the same.' },
      { label: 'B', text: 'Both the mean and the median increase.' },
      { label: 'C', text: 'The mean increases and the median could increase or stay the same.' },
      { label: 'D', text: 'The mean stays the same and the median increases.' },
    ],
    correctAnswer: 'C',
    explanation:
      'The mean of the original 7 values is 12, so their sum is 84. Adding 30 gives a new sum of 114 with 8 values, so the new mean = 114/8 = 14.25, which is greater than 12. The mean must increase. For the median: originally with 7 values, the median is the 4th value = 10. With 8 values, the new median is the average of the 4th and 5th values. Adding 30 (a large value) to the ordered list places it at the end, shifting positions. The new median depends on where the other values fall — it could stay at 10 or increase, but it cannot decrease. Therefore the mean definitely increases, while the median could increase or stay the same.',
    wrongAnswerExplanations: {
      A: 'Saying the median "stays the same" is too strong — adding 30 can shift the median upward depending on the distribution of the other values.',
      B: 'The median does not necessarily increase; if enough values are clustered near 10, the median position (average of 4th and 5th) could remain 10.',
      D: 'The mean cannot stay the same after adding a value of 30 that is above the current mean of 12.',
    },
  },

  {
    id: 'sat-f5-math-m2h-q04',
    section: 'math',
    moduleId: 'f5-math-module-2-hard',
    domain: 'Algebra',
    skill: 'Linear inequalities in one or two variables',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'Which of the following represents all values of x that satisfy both −2 < 3x + 1 ≤ 10 and x > −1/3?',
    choices: [
      { label: 'A', text: 'x > −1/3' },
      { label: 'B', text: '−1 < x ≤ 3' },
      { label: 'C', text: '−1/3 < x ≤ 3' },
      { label: 'D', text: '0 < x ≤ 3' },
    ],
    correctAnswer: 'C',
    explanation:
      'Solve the compound inequality −2 < 3x + 1 ≤ 10. Subtract 1 throughout: −3 < 3x ≤ 9. Divide by 3: −1 < x ≤ 3. Now intersect with x > −1/3. Since −1/3 > −1, the intersection is x > −1/3 AND x ≤ 3, giving −1/3 < x ≤ 3.',
    wrongAnswerExplanations: {
      A: 'x > −1/3 ignores the upper bound x ≤ 3 from the compound inequality.',
      B: '−1 < x ≤ 3 is the solution to the compound inequality alone, before intersecting with x > −1/3.',
      D: '0 < x ≤ 3 incorrectly rounds −1/3 to 0 as the lower bound.',
    },
  },

  {
    id: 'sat-f5-math-m2h-q10',
    section: 'math',
    moduleId: 'f5-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Quadratic equations',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'The equation 3x² − 12x + k = 0 has exactly one real solution. What is the value of k?',
    correctAnswer: '12',
    acceptableAnswers: ['12'],
    explanation:
      'For exactly one real solution, the discriminant must equal zero. Here a = 3, b = −12, c = k. Discriminant: b² − 4ac = (−12)² − 4(3)(k) = 144 − 12k = 0 → 12k = 144 → k = 12.',
  },

  {
    id: 'sat-f5-math-m2h-q17',
    section: 'math',
    moduleId: 'f5-math-module-2-hard',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Probability and conditional probability',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'In a group of 80 students, 45 study French, 30 study Spanish, and 15 study both languages. A student is selected at random from those who study Spanish. What is the probability that this student also studies French? Enter your answer as a fraction.',
    correctAnswer: '1/2',
    acceptableAnswers: ['1/2', '.5', '0.5', '15/30'],
    explanation:
      'We need P(French | Spanish) = P(French and Spanish) / P(Spanish). The number of students who study both is 15. The number who study Spanish is 30. Conditional probability = 15/30 = 1/2.',
  },

  {
    id: 'sat-f5-math-m2h-q05',
    section: 'math',
    moduleId: 'f5-math-module-2-hard',
    domain: 'Algebra',
    skill: 'Systems of two linear equations in two variables',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'In the system of equations 5x + 2y = 23 and 3x − 2y = 1, what is the value of x + y?',
    correctAnswer: '7',
    acceptableAnswers: ['7'],
    explanation:
      'Add the two equations to eliminate y: (5x + 2y) + (3x − 2y) = 23 + 1 → 8x = 24 → x = 3. Substitute x = 3 into the second equation: 3(3) − 2y = 1 → 9 − 2y = 1 → 2y = 8 → y = 4. Therefore x + y = 3 + 4 = 7.',
  },

  {
    id: 'sat-f5-math-m2h-q11',
    section: 'math',
    moduleId: 'f5-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Polynomial functions',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'The polynomial p(x) = x³ − 2x² − 5x + 6 has x = 1 as one of its roots. Which of the following shows the complete factored form of p(x)?',
    choices: [
      { label: 'A', text: '(x − 1)(x − 3)(x + 2)' },
      { label: 'B', text: '(x − 1)(x + 3)(x − 2)' },
      { label: 'C', text: '(x + 1)(x − 3)(x − 2)' },
      { label: 'D', text: '(x − 1)(x − 3)(x − 2)' },
    ],
    correctAnswer: 'A',
    explanation:
      'Since x = 1 is a root, divide p(x) by (x − 1). Performing polynomial long division or synthetic division: x³ − 2x² − 5x + 6 ÷ (x − 1) gives x² − x − 6. Factor x² − x − 6 = (x − 3)(x + 2). Therefore p(x) = (x − 1)(x − 3)(x + 2). Verify: roots are x = 1, x = 3, x = −2. Check: p(3) = 27 − 18 − 15 + 6 = 0 ✓. p(−2) = −8 − 8 + 10 + 6 = 0 ✓.',
    wrongAnswerExplanations: {
      B: '(x − 1)(x + 3)(x − 2) expands to x³ − 0x² − 5x + 6, which has coefficient 0 for x² instead of −2.',
      C: '(x + 1)(x − 3)(x − 2) would have x = −1 as a root, but p(−1) = −1 − 2 + 5 + 6 = 8 ≠ 0.',
      D: '(x − 1)(x − 3)(x − 2) has roots 1, 3, 2. Check: p(2) = 8 − 8 − 10 + 6 = −4 ≠ 0.',
    },
  },

  {
    id: 'sat-f5-math-m2h-q18',
    section: 'math',
    moduleId: 'f5-math-module-2-hard',
    domain: 'Geometry and Trigonometry',
    skill: 'Circles',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'What is the radius of the circle defined by the equation x² + y² − 6x + 8y − 11 = 0?',
    choices: [
      { label: 'A', text: '6' },
      { label: 'B', text: '7' },
      { label: 'C', text: '8' },
      { label: 'D', text: '√56' },
    ],
    correctAnswer: 'A',
    explanation:
      'Complete the square for x and y. Group: (x² − 6x) + (y² + 8y) = 11. Complete the square: (x² − 6x + 9) + (y² + 8y + 16) = 11 + 9 + 16 = 36. So (x − 3)² + (y + 4)² = 36. The radius is √36 = 6.',
    wrongAnswerExplanations: {
      B: 'r = 7 comes from computing √(9 + 16 + 11) = √36 = 6 but then incorrectly taking the square root of 49 instead of 36.',
      C: 'r = 8 results from adding 9 + 16 but neglecting to add these to the right side, then computing √(11 + 64) ≈ 8.',
      D: '√56 results from incorrectly completing the square with the wrong constants added.',
    },
  },

  {
    id: 'sat-f5-math-m2h-q06',
    section: 'math',
    moduleId: 'f5-math-module-2-hard',
    domain: 'Algebra',
    skill: 'Linear equations in two variables',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'A line passes through the points (a, 1) and (4, 7), and has slope 3. What is the value of a?',
    correctAnswer: '2',
    acceptableAnswers: ['2'],
    explanation:
      'Slope = (7 − 1)/(4 − a) = 6/(4 − a) = 3. Solving: 4 − a = 2 → a = 2.',
  },

  {
    id: 'sat-f5-math-m2h-q12',
    section: 'math',
    moduleId: 'f5-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Exponential functions',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'A population of bacteria decreases by 20% every 3 hours. If the initial population is 5,000, which function gives the population P(t) after t hours?',
    choices: [
      { label: 'A', text: 'P(t) = 5000(0.80)^(t/3)' },
      { label: 'B', text: 'P(t) = 5000(0.20)^(3t)' },
      { label: 'C', text: 'P(t) = 5000(0.80)^(3t)' },
      { label: 'D', text: 'P(t) = 5000(1.20)^(t/3)' },
    ],
    correctAnswer: 'A',
    explanation:
      'A 20% decrease means 80% remains each period. The period is 3 hours, so after t hours there are t/3 periods. The function is P(t) = 5000 · (0.80)^(t/3). Check: at t = 0, P = 5000 ✓. At t = 3, P = 5000 · 0.80 = 4000, which is a 20% decrease ✓.',
    wrongAnswerExplanations: {
      B: '0.20 is the percent lost, not the percent remaining; using 0.20 as the base gives far too fast a decay.',
      C: 'P(t) = 5000(0.80)^(3t) uses 3t as the exponent instead of t/3, making the decay rate 3 times too fast.',
      D: '1.20 indicates a 20% increase per period, not a decrease.',
    },
  },

  {
    id: 'sat-f5-math-m2h-q19',
    section: 'math',
    moduleId: 'f5-math-module-2-hard',
    domain: 'Geometry and Trigonometry',
    skill: 'Right triangles and trigonometry',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'In a right triangle, one acute angle measures 30°. The side opposite the 60° angle has length 4√3. What is the length of the hypotenuse?',
    choices: [
      { label: 'A', text: '4' },
      { label: 'B', text: '8' },
      { label: 'C', text: '6√3' },
      { label: 'D', text: '12' },
    ],
    correctAnswer: 'B',
    explanation:
      'In a 30-60-90 triangle, the sides are in ratio 1 : √3 : 2. The side opposite 60° has length (√3) × (short side). So √3 × s = 4√3 → s = 4. The hypotenuse = 2s = 2 × 4 = 8.',
    wrongAnswerExplanations: {
      A: '4 is the length of the short leg (opposite 30°), not the hypotenuse.',
      C: '6√3 results from multiplying 4√3 by √3 instead of dividing by √3 to find s, then doubling incorrectly.',
      D: '12 results from multiplying 4√3 by the ratio √3 then multiplying again, overcounting the scaling.',
    },
  },

  {
    id: 'sat-f5-math-m2h-q13',
    section: 'math',
    moduleId: 'f5-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'Let f(x) = 2x + 3 and g(x) = x² − 1. What is the value of g(f(1))?',
    correctAnswer: '24',
    acceptableAnswers: ['24'],
    explanation:
      'First compute f(1) = 2(1) + 3 = 5. Then compute g(f(1)) = g(5) = 5² − 1 = 25 − 1 = 24.',
  },

  {
    id: 'sat-f5-math-m2h-q20',
    section: 'math',
    moduleId: 'f5-math-module-2-hard',
    domain: 'Geometry and Trigonometry',
    skill: 'Area and volume',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'A solid consists of a cylinder of radius 3 and height 5 with a cone of radius 3 and height 4 placed on top of it. What is the total volume of the solid? (Use π = π; leave answer in terms of π.)',
    choices: [
      { label: 'A', text: '51π' },
      { label: 'B', text: '57π' },
      { label: 'C', text: '63π' },
      { label: 'D', text: '75π' },
    ],
    correctAnswer: 'B',
    explanation:
      'Volume of cylinder = πr²h = π(3²)(5) = 45π. Volume of cone = (1/3)πr²h = (1/3)π(9)(4) = 12π. Total = 45π + 12π = 57π.',
    wrongAnswerExplanations: {
      A: '51π = 45π + 6π. The error is computing the cone volume as (1/3)πr·h = (1/3)π(3)(4) = 4π (using r instead of r²), which gives 45 + 4 = 49π; an alternate path producing 51π uses the incorrect formula (1/3)π(2r)h/2 — in any case, the cone volume must use r² = 9, not r = 3.',
      C: '63π = 45π + 18π. The error is computing the cone volume as πr²h with the 1/3 factor missing but using h = 2 instead of h = 4: π(9)(2) = 18π. The correct cone formula always includes the 1/3 factor.',
      D: '75π = 45π + 30π. The error is treating the cone as a cylinder of the same radius and height: π(9)(4) = 36π is far too large; with the addition error 45 + 30 = 75, the 1/3 factor was omitted and only part of r²h was used.',
    },
  },

  {
    id: 'sat-f5-math-m2h-q21',
    section: 'math',
    moduleId: 'f5-math-module-2-hard',
    domain: 'Geometry and Trigonometry',
    skill: 'Lines, angles, and triangles',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'Triangle PQR is similar to triangle STU with PQ corresponding to ST and QR corresponding to TU. If PQ = 6, QR = 9, PR = 12, and ST = 10, what is the length of TU?',
    choices: [
      { label: 'A', text: '12' },
      { label: 'B', text: '15' },
      { label: 'C', text: '18' },
      { label: 'D', text: '20' },
    ],
    correctAnswer: 'B',
    explanation:
      'Since the triangles are similar, the ratio of corresponding sides is constant. The ratio is ST/PQ = 10/6 = 5/3. Therefore TU = QR × (5/3) = 9 × (5/3) = 15.',
    wrongAnswerExplanations: {
      A: 'TU = 12 mistakenly uses PR (the third side of the original triangle) as TU without applying the scale factor.',
      C: 'TU = 18 results from using a scale factor of 2 (doubling QR) instead of multiplying by 5/3.',
      D: 'TU = 20 uses the scale factor 5/3 applied to PR = 12 rather than to QR = 9.',
    },
  },

  {
    id: 'sat-f5-math-m2h-q22',
    section: 'math',
    moduleId: 'f5-math-module-2-hard',
    domain: 'Geometry and Trigonometry',
    skill: 'Circles',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'A circle has a radius of 9. A central angle of 80° intercepts an arc. What is the length of that arc? (Use π; express your answer in terms of π.)',
    correctAnswer: '4π',
    acceptableAnswers: ['4π', '4pi'],
    explanation:
      'Arc length = (central angle / 360°) × 2πr = (80/360) × 2π(9) = (2/9) × 18π = 4π.',
  },
]
