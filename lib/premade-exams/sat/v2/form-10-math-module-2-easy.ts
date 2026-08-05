import type { MathMCQuestion, MathGridInQuestion } from '../types'
type MathQuestion = MathMCQuestion | MathGridInQuestion

export const f10MathModule2EasyQuestionsV2: MathQuestion[] = [
  // ── q01–q08: EASY ────────────────────────────────────────────────────────

  // ─── Q01 — Algebra / Linear equations in one variable / easy ─────────────
  // correctAnswer: B
  {
    id: 'sat-f10-v2-math-m2e-q01',
    section: 'math',
    moduleId: 'f10v2-math-module-2-easy',
    domain: 'Algebra',
    skill: 'Linear equations in one variable',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'If 6x + 5 = 29, what is the value of x?',
    choices: [
      { label: 'A', text: '3' },
      { label: 'B', text: '4' },
      { label: 'C', text: '5' },
      { label: 'D', text: '6' },
    ],
    correctAnswer: 'B',
    explanation:
      'Subtract 5 from both sides: 6x = 24. Divide both sides by 6: x = 4. Check: 6(4) + 5 = 24 + 5 = 29. ✓',
    wrongAnswerExplanations: {
      A: 'x = 3 gives 6(3) + 5 = 23, not 29. Subtract 5 from both sides first to get 6x = 24, then divide by 6.',
      C: 'x = 5 gives 6(5) + 5 = 35, not 29. The correct steps are 6x = 29 − 5 = 24, so x = 24 ÷ 6 = 4.',
      D: 'x = 6 gives 6(6) + 5 = 41, not 29. Isolate x by subtracting 5 and then dividing by 6: x = 24 ÷ 6 = 4.',
    },
  },

  // ─── Q02 — Advanced Math / Nonlinear functions / easy ────────────────────
  // correctAnswer: D
  {
    id: 'sat-f10-v2-math-m2e-q02',
    section: 'math',
    moduleId: 'f10v2-math-module-2-easy',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'The function h is defined by h(x) = x² + 4x − 5. What is h(2)?',
    choices: [
      { label: 'A', text: '3' },
      { label: 'B', text: '5' },
      { label: 'C', text: '6' },
      { label: 'D', text: '7' },
    ],
    correctAnswer: 'D',
    explanation:
      'Substitute x = 2: h(2) = (2)² + 4(2) − 5 = 4 + 8 − 5 = 7.',
    wrongAnswerExplanations: {
      A: 'h(2) = 4 + 8 − 5 = 7, not 3. Make sure to evaluate all three terms: 4 + 8 = 12, then 12 − 5 = 7.',
      B: 'h(2) = 7, not 5. A common error is computing 2² = 2 instead of 4. The correct value is 4 + 8 − 5 = 7.',
      C: 'h(2) = 7, not 6. Check: (2)² = 4, 4(2) = 8, so 4 + 8 − 5 = 7.',
    },
  },

  // ─── Q03 — Algebra / Linear functions / easy ─────────────────────────────
  // correctAnswer: A
  {
    id: 'sat-f10-v2-math-m2e-q03',
    section: 'math',
    moduleId: 'f10v2-math-module-2-easy',
    domain: 'Algebra',
    skill: 'Linear functions',
    difficulty: 'easy',
    type: 'multiple_choice',
    question:
      'A linear function p is defined by p(x) = 5x − 7. What is the value of p(3)?',
    choices: [
      { label: 'A', text: '8' },
      { label: 'B', text: '10' },
      { label: 'C', text: '12' },
      { label: 'D', text: '15' },
    ],
    correctAnswer: 'A',
    explanation:
      'Substitute x = 3: p(3) = 5(3) − 7 = 15 − 7 = 8.',
    wrongAnswerExplanations: {
      B: 'p(3) = 15 − 7 = 8, not 10. Make sure to subtract 7 from 15, not from 5.',
      C: 'p(3) = 8, not 12. The result is 5(3) − 7 = 15 − 7 = 8.',
      D: '15 is the value of 5(3) before subtracting the constant. Complete the calculation: 15 − 7 = 8.',
    },
  },

  // ─── Q04 — PSDA / Ratios, rates, proportional relationships / easy ────────
  // correctAnswer: C
  {
    id: 'sat-f10-v2-math-m2e-q04',
    section: 'math',
    moduleId: 'f10v2-math-module-2-easy',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Ratios, rates, proportional relationships, and units',
    difficulty: 'easy',
    type: 'multiple_choice',
    question:
      'A printer can print 48 pages in 4 minutes at a constant rate. At this rate, how many pages can it print in 7 minutes?',
    choices: [
      { label: 'A', text: '72' },
      { label: 'B', text: '80' },
      { label: 'C', text: '84' },
      { label: 'D', text: '96' },
    ],
    correctAnswer: 'C',
    explanation:
      'Rate = 48 ÷ 4 = 12 pages per minute. In 7 minutes: 12 × 7 = 84 pages.',
    wrongAnswerExplanations: {
      A: '72 = 48 × (3/2) uses a scale factor of 3/2 instead of 7/4. The rate is 12 pages per minute, so 7 minutes gives 12 × 7 = 84.',
      B: '80 does not follow from any clean calculation with these numbers. The rate is 12 pages/min, so 7 min gives 84 pages.',
      D: '96 = 48 × 2 doubles the original count as though 7 minutes is twice 4 minutes. 7/4 is the correct scale factor: 48 × (7/4) = 84.',
    },
  },

  // ─── Q05 — Algebra / Linear equations in two variables / easy ────────────
  // correctAnswer: B
  {
    id: 'sat-f10-v2-math-m2e-q05',
    section: 'math',
    moduleId: 'f10v2-math-module-2-easy',
    domain: 'Algebra',
    skill: 'Linear equations in two variables',
    difficulty: 'easy',
    type: 'multiple_choice',
    question:
      'The equation 2x + y = 14 represents a line. What is the y-intercept of this line?',
    choices: [
      { label: 'A', text: '2' },
      { label: 'B', text: '14' },
      { label: 'C', text: '7' },
      { label: 'D', text: '−7' },
    ],
    correctAnswer: 'B',
    explanation:
      'Set x = 0: 2(0) + y = 14, so y = 14. The y-intercept is 14.',
    wrongAnswerExplanations: {
      A: '2 is the coefficient of x, not the y-intercept. To find the y-intercept, set x = 0: y = 14.',
      C: '7 = 14 ÷ 2 divides the constant by the coefficient of x, which is not the correct method. Setting x = 0 gives y = 14.',
      D: '−7 is negative and does not match any correct operation on these values. Setting x = 0 in 2x + y = 14 gives y = 14.',
    },
  },

  // ─── Q06 — Advanced Math / Equivalent expressions / easy ─────────────────
  // correctAnswer: D
  {
    id: 'sat-f10-v2-math-m2e-q06',
    section: 'math',
    moduleId: 'f10v2-math-module-2-easy',
    domain: 'Advanced Math',
    skill: 'Equivalent expressions',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'Which expression is equivalent to 3(2x + 5) − 4x?',
    choices: [
      { label: 'A', text: '2x + 5' },
      { label: 'B', text: '10x + 15' },
      { label: 'C', text: '2x − 15' },
      { label: 'D', text: '2x + 15' },
    ],
    correctAnswer: 'D',
    explanation:
      'Distribute: 3(2x + 5) = 6x + 15. Then subtract 4x: 6x + 15 − 4x = 2x + 15.',
    wrongAnswerExplanations: {
      A: '2x + 5 omits multiplying the constant 5 by 3. Distributing correctly gives 6x + 15, and 6x − 4x = 2x, so the result is 2x + 15.',
      B: '10x + 15 comes from adding 6x + 4x instead of subtracting. The expression has −4x, so 6x − 4x = 2x, giving 2x + 15.',
      C: '2x − 15 uses a negative constant, but 3(+5) = +15. The correct result is 2x + 15.',
    },
  },

  // ─── Q07 — Algebra / Systems of two linear equations / easy ──────────────
  // correctAnswer: A
  {
    id: 'sat-f10-v2-math-m2e-q07',
    section: 'math',
    moduleId: 'f10v2-math-module-2-easy',
    domain: 'Algebra',
    skill: 'Systems of two linear equations in two variables',
    difficulty: 'easy',
    type: 'multiple_choice',
    question:
      'What is the solution (x, y) to the system of equations below?\nx + y = 10\nx − y = 4',
    choices: [
      { label: 'A', text: '(7, 3)' },
      { label: 'B', text: '(3, 7)' },
      { label: 'C', text: '(6, 4)' },
      { label: 'D', text: '(5, 5)' },
    ],
    correctAnswer: 'A',
    explanation:
      'Add the equations: 2x = 14, so x = 7. Substitute into x + y = 10: 7 + y = 10, so y = 3. The solution is (7, 3).',
    wrongAnswerExplanations: {
      B: '(3, 7) reverses x and y. Adding the equations gives 2x = 14, so x = 7, not 3. Then y = 10 − 7 = 3.',
      C: '(6, 4) does not satisfy both equations: 6 − 4 = 2, not 4. The correct solution is x = 7, y = 3.',
      D: '(5, 5) satisfies x + y = 10 but not x − y = 4: 5 − 5 = 0 ≠ 4. The correct solution is (7, 3).',
    },
  },

  // ─── Q08 — PSDA / Percentages / easy ─────────────────────────────────────
  // correctAnswer: C
  {
    id: 'sat-f10-v2-math-m2e-q08',
    section: 'math',
    moduleId: 'f10v2-math-module-2-easy',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Percentages',
    difficulty: 'easy',
    type: 'multiple_choice',
    question:
      'A shirt originally costs $40. It is on sale for 30% off. What is the sale price of the shirt?',
    choices: [
      { label: 'A', text: '$10' },
      { label: 'B', text: '$12' },
      { label: 'C', text: '$28' },
      { label: 'D', text: '$30' },
    ],
    correctAnswer: 'C',
    explanation:
      'Discount = 30% × $40 = 0.30 × 40 = $12. Sale price = $40 − $12 = $28.',
    wrongAnswerExplanations: {
      A: '$10 is not related to a 30% discount on $40. The discount is 0.30 × 40 = $12, so the sale price is $40 − $12 = $28.',
      B: '$12 is the discount amount, not the sale price. Subtract the discount from the original price: $40 − $12 = $28.',
      D: '$30 = $40 − $10 uses a $10 discount (25%), not 30%. The correct discount is $12, giving a sale price of $28.',
    },
  },

  // ── q09–q16: MEDIUM (MC) ─────────────────────────────────────────────────

  // ─── Q09 — Advanced Math / Nonlinear equations / medium ──────────────────
  // correctAnswer: B
  {
    id: 'sat-f10-v2-math-m2e-q09',
    section: 'math',
    moduleId: 'f10v2-math-module-2-easy',
    domain: 'Advanced Math',
    skill: 'Nonlinear equations in one variable and systems of equations',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'Which value of x satisfies the equation x² − 5x + 6 = 0?',
    choices: [
      { label: 'A', text: '1' },
      { label: 'B', text: '2' },
      { label: 'C', text: '4' },
      { label: 'D', text: '6' },
    ],
    correctAnswer: 'B',
    explanation:
      'Factor: x² − 5x + 6 = (x − 2)(x − 3) = 0. The solutions are x = 2 and x = 3. Among the choices, x = 2 is correct.',
    wrongAnswerExplanations: {
      A: 'Check x = 1: 1 − 5 + 6 = 2 ≠ 0. Factor the equation: (x − 2)(x − 3) = 0, giving x = 2 or x = 3.',
      C: 'Check x = 4: 16 − 20 + 6 = 2 ≠ 0. The correct solutions are x = 2 and x = 3.',
      D: 'Check x = 6: 36 − 30 + 6 = 12 ≠ 0. Factor to get (x − 2)(x − 3) = 0, so x = 2 or x = 3.',
    },
  },

  // ─── Q10 — PSDA / One-variable data / medium ─────────────────────────────
  // correctAnswer: D
  {
    id: 'sat-f10-v2-math-m2e-q10',
    section: 'math',
    moduleId: 'f10v2-math-module-2-easy',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'One-variable data: distributions and measures of center and spread',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'The five data values 4, 7, 9, 12, and 18 are recorded for a sample. What is the range of this data set?',
    choices: [
      { label: 'A', text: '10' },
      { label: 'B', text: '12' },
      { label: 'C', text: '13' },
      { label: 'D', text: '14' },
    ],
    correctAnswer: 'D',
    explanation:
      'Range = maximum − minimum = 18 − 4 = 14.',
    wrongAnswerExplanations: {
      A: '10 = 12 − 2, which uses neither the maximum nor the minimum correctly. Range = max − min = 18 − 4 = 14.',
      B: '12 is one of the data values, not the range. Range = 18 − 4 = 14.',
      C: '13 = 18 − 5 subtracts the count of data values from the maximum instead of the minimum. Range = 18 − 4 = 14.',
    },
  },

  // ─── Q11 — Algebra / Linear inequalities / medium ────────────────────────
  // correctAnswer: A
  {
    id: 'sat-f10-v2-math-m2e-q11',
    section: 'math',
    moduleId: 'f10v2-math-module-2-easy',
    domain: 'Algebra',
    skill: 'Linear inequalities in one or two variables',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'Which of the following is a solution to the inequality 3x − 4 > 8?',
    choices: [
      { label: 'A', text: '5' },
      { label: 'B', text: '4' },
      { label: 'C', text: '3' },
      { label: 'D', text: '2' },
    ],
    correctAnswer: 'A',
    explanation:
      'Solve: 3x − 4 > 8 → 3x > 12 → x > 4. Among the choices, only x = 5 satisfies x > 4.',
    wrongAnswerExplanations: {
      B: 'x = 4 gives 3(4) − 4 = 8, which is not strictly greater than 8. The inequality requires x > 4, so x = 5 is the correct choice.',
      C: 'x = 3 gives 3(3) − 4 = 5, which is less than 8. The solution requires x > 4.',
      D: 'x = 2 gives 3(2) − 4 = 2, which is far less than 8. Only x = 5 satisfies the inequality x > 4.',
    },
  },

  // ─── Q12 — Geometry / Area and volume / medium ───────────────────────────
  // correctAnswer: C
  {
    id: 'sat-f10-v2-math-m2e-q12',
    section: 'math',
    moduleId: 'f10v2-math-module-2-easy',
    domain: 'Geometry and Trigonometry',
    skill: 'Area and volume',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'A rectangle has a length of 9 and a width of 4. What is the area of the rectangle?',
    choices: [
      { label: 'A', text: '26' },
      { label: 'B', text: '30' },
      { label: 'C', text: '36' },
      { label: 'D', text: '40' },
    ],
    correctAnswer: 'C',
    explanation:
      'Area of a rectangle = length × width = 9 × 4 = 36.',
    wrongAnswerExplanations: {
      A: '26 = 2(9 + 4) = 2(13) is the perimeter, not the area. Area = 9 × 4 = 36.',
      B: '30 does not correspond to any standard formula applied to length 9 and width 4. Area = 9 × 4 = 36.',
      D: '40 could come from rounding or misreading the dimensions. The exact area is 9 × 4 = 36.',
    },
  },

  // ─── Q13 — Advanced Math / Equivalent expressions / medium ───────────────
  // correctAnswer: B
  {
    id: 'sat-f10-v2-math-m2e-q13',
    section: 'math',
    moduleId: 'f10v2-math-module-2-easy',
    domain: 'Advanced Math',
    skill: 'Equivalent expressions',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'Which expression is equivalent to (x + 4)(x − 3)?',
    choices: [
      { label: 'A', text: 'x² − x − 7' },
      { label: 'B', text: 'x² + x − 12' },
      { label: 'C', text: 'x² − x + 12' },
      { label: 'D', text: 'x² + x + 12' },
    ],
    correctAnswer: 'B',
    explanation:
      'Use FOIL: (x + 4)(x − 3) = x² − 3x + 4x − 12 = x² + x − 12.',
    wrongAnswerExplanations: {
      A: 'x² − x − 7 uses an incorrect constant (−7 instead of −12). The product of 4 and −3 is −12: x² + x − 12.',
      C: 'x² − x + 12 has the wrong sign on the middle term and the constant. The inner and outer terms give −3x + 4x = +x, and 4 × (−3) = −12: result is x² + x − 12.',
      D: 'x² + x + 12 has the wrong sign on the constant. 4 × (−3) = −12, so the constant is −12, not +12.',
    },
  },

  // ─── Q14 — PSDA / Two-variable data / medium ─────────────────────────────
  // correctAnswer: D
  {
    id: 'sat-f10-v2-math-m2e-q14',
    section: 'math',
    moduleId: 'f10v2-math-module-2-easy',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Two-variable data: models and scatterplots',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'A scatterplot shows a positive linear association between study hours and test scores. If the line of best fit passes through (2, 60) and (6, 80), what score does the model predict for a student who studies 10 hours?',
    choices: [
      { label: 'A', text: '90' },
      { label: 'B', text: '95' },
      { label: 'C', text: '98' },
      { label: 'D', text: '100' },
    ],
    correctAnswer: 'D',
    explanation:
      'Slope = (80 − 60) ÷ (6 − 2) = 20 ÷ 4 = 5. Using point (2, 60): y − 60 = 5(x − 2) → y = 5x + 50. At x = 10: y = 5(10) + 50 = 100.',
    wrongAnswerExplanations: {
      A: '90 = 60 + 30 adds 3 × 10 to the y-intercept using an incorrect slope. The slope is 5, and y = 5(10) + 50 = 100.',
      B: '95 does not result from the correct line equation y = 5x + 50. At x = 10, y = 50 + 50 = 100.',
      C: '98 does not follow from the line of best fit. The correct prediction is y = 5(10) + 50 = 100.',
    },
  },

  // ─── Q15 — Geometry / Lines, angles, triangles / medium ──────────────────
  // correctAnswer: A
  {
    id: 'sat-f10-v2-math-m2e-q15',
    section: 'math',
    moduleId: 'f10v2-math-module-2-easy',
    domain: 'Geometry and Trigonometry',
    skill: 'Lines, angles, and triangles',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'In a triangle, two angles measure 55° and 75°. What is the measure of the third angle?',
    choices: [
      { label: 'A', text: '50°' },
      { label: 'B', text: '55°' },
      { label: 'C', text: '60°' },
      { label: 'D', text: '70°' },
    ],
    correctAnswer: 'A',
    explanation:
      'The sum of angles in a triangle is 180°. Third angle = 180° − 55° − 75° = 50°.',
    wrongAnswerExplanations: {
      B: '55° would make the triangle have two equal angles, but 55° + 75° + 55° = 185° ≠ 180°. The third angle is 180° − 55° − 75° = 50°.',
      C: '60° gives a total of 55° + 75° + 60° = 190° ≠ 180°. Angles in a triangle sum to 180°, so the third angle is 50°.',
      D: '70° gives a total of 55° + 75° + 70° = 200° ≠ 180°. The correct third angle is 180° − 130° = 50°.',
    },
  },

  // ─── Q16 — Geometry / Right triangles and trigonometry / medium ──────────
  // correctAnswer: C
  {
    id: 'sat-f10-v2-math-m2e-q16',
    section: 'math',
    moduleId: 'f10v2-math-module-2-easy',
    domain: 'Geometry and Trigonometry',
    skill: 'Right triangles and trigonometry',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'In a right triangle, one leg has length 8 and the hypotenuse has length 10. What is the length of the other leg?',
    choices: [
      { label: 'A', text: '4' },
      { label: 'B', text: '5' },
      { label: 'C', text: '6' },
      { label: 'D', text: '7' },
    ],
    correctAnswer: 'C',
    explanation:
      'By the Pythagorean theorem: a² + 8² = 10² → a² = 100 − 64 = 36 → a = 6.',
    wrongAnswerExplanations: {
      A: 'a = 4 gives 4² + 8² = 16 + 64 = 80 ≠ 100. Use a² = 10² − 8² = 100 − 64 = 36, so a = 6.',
      B: 'a = 5 gives 5² + 8² = 25 + 64 = 89 ≠ 100. The correct answer is a = √36 = 6.',
      D: 'a = 7 gives 7² + 8² = 49 + 64 = 113 ≠ 100. By the Pythagorean theorem, a² = 36, so a = 6.',
    },
  },

  // ── q17–q22: GRID-IN (medium) ─────────────────────────────────────────────

  // ─── Q17 — Algebra / Linear equations in one variable / medium ───────────
  // correctAnswer: 14
  {
    id: 'sat-f10-v2-math-m2e-q17',
    section: 'math',
    moduleId: 'f10v2-math-module-2-easy',
    domain: 'Algebra',
    skill: 'Linear equations in one variable',
    difficulty: 'medium',
    type: 'grid_in',
    question:
      'If 2x − 4 = 24, what is the value of x?',
    correctAnswer: '14',
    acceptableAnswers: ['14'],
    explanation:
      'Add 4 to both sides: 2x = 28. Divide by 2: x = 14. Check: 2(14) − 4 = 28 − 4 = 24. ✓',
  },

  // ─── Q18 — Algebra / Linear functions / medium ───────────────────────────
  // correctAnswer: 5
  {
    id: 'sat-f10-v2-math-m2e-q18',
    section: 'math',
    moduleId: 'f10v2-math-module-2-easy',
    domain: 'Algebra',
    skill: 'Linear functions',
    difficulty: 'medium',
    type: 'grid_in',
    question:
      'The function g is defined by g(x) = 4x − 3. For what value of x does g(x) = 17?',
    correctAnswer: '5',
    acceptableAnswers: ['5'],
    explanation:
      'Set g(x) = 17: 4x − 3 = 17. Add 3: 4x = 20. Divide by 4: x = 5. Check: 4(5) − 3 = 20 − 3 = 17. ✓',
  },

  // ─── Q19 — Advanced Math / Nonlinear functions / medium ──────────────────
  // correctAnswer: 27
  {
    id: 'sat-f10-v2-math-m2e-q19',
    section: 'math',
    moduleId: 'f10v2-math-module-2-easy',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'medium',
    type: 'grid_in',
    question:
      'The function f is defined by f(x) = x² − x − 3. What is f(6)?',
    correctAnswer: '27',
    acceptableAnswers: ['27'],
    explanation:
      'Substitute x = 6: f(6) = (6)² − 6 − 3 = 36 − 6 − 3 = 27.',
  },

  // ─── Q20 — PSDA / Ratios, rates, proportional relationships / medium ──────
  // correctAnswer: 0.8
  {
    id: 'sat-f10-v2-math-m2e-q20',
    section: 'math',
    moduleId: 'f10v2-math-module-2-easy',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Ratios, rates, proportional relationships, and units',
    difficulty: 'medium',
    type: 'grid_in',
    question:
      'A recipe uses 2 cups of flour to make 2.5 dozen cookies. At this rate, how many cups of flour are needed to make 1 dozen cookies?',
    correctAnswer: '0.8',
    acceptableAnswers: ['0.8', '4/5'],
    explanation:
      'Cups per dozen = 2 ÷ 2.5 = 0.8 cups per dozen. For 1 dozen: 0.8 cups.',
  },

  // ─── Q21 — Advanced Math / Nonlinear equations / medium ──────────────────
  // correctAnswer: 25
  {
    id: 'sat-f10-v2-math-m2e-q21',
    section: 'math',
    moduleId: 'f10v2-math-module-2-easy',
    domain: 'Advanced Math',
    skill: 'Nonlinear equations in one variable and systems of equations',
    difficulty: 'medium',
    type: 'grid_in',
    question:
      'If x² = 625 and x > 0, what is the value of x?',
    correctAnswer: '25',
    acceptableAnswers: ['25'],
    explanation:
      'Take the positive square root: x = √625 = 25. Check: 25² = 625. ✓',
  },

  // ─── Q22 — PSDA / Inference from sample statistics / medium ──────────────
  // correctAnswer: 15
  {
    id: 'sat-f10-v2-math-m2e-q22',
    section: 'math',
    moduleId: 'f10v2-math-module-2-easy',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Inference from sample statistics and margin of error',
    difficulty: 'medium',
    type: 'grid_in',
    question:
      'In a survey of 60 students, 25% said they prefer studying in the morning. How many students said they prefer studying in the morning?',
    correctAnswer: '15',
    acceptableAnswers: ['15'],
    explanation:
      '25% of 60 = 0.25 × 60 = 15 students.',
  },
]
