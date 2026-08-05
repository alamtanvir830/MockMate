import type { MathMCQuestion, MathGridInQuestion } from '../types'
type MathQuestion = MathMCQuestion | MathGridInQuestion

export const f9MathModule2HardQuestionsV2: MathQuestion[] = [
  // ─── q01 — Algebra — medium ───────────────────────────────────────────────
  {
    id: 'sat-f9-v2-math-m2h-q01',
    section: 'math',
    moduleId: 'f9v2-math-module-2-hard',
    domain: 'Algebra',
    skill: 'Linear equations in two variables',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'A line in the xy-plane has slope −3 and passes through the point (2, 5). Which of the following is an equation of this line?',
    choices: [
      { label: 'A', text: 'y = −3x + 7' },
      { label: 'B', text: 'y = −3x + 11' },
      { label: 'C', text: 'y = 3x − 1' },
      { label: 'D', text: 'y = −3x − 1' },
    ],
    correctAnswer: 'B',
    explanation:
      'Using point-slope form with m = −3 and the point (2, 5):\ny − 5 = −3(x − 2)\ny − 5 = −3x + 6\ny = −3x + 11\n\nVerification: −3(2) + 11 = −6 + 11 = 5 ✓',
    wrongAnswerExplanations: {
      A: 'y = −3x + 7 gives y = −6 + 7 = 1 at x = 2, not 5. The b-value was computed incorrectly as 5 − 3(−2) = 5 − 6 rather than 5 + 6.',
      C: 'y = 3x − 1 uses the wrong sign for the slope. The slope is −3, not +3.',
      D: 'y = −3x − 1 gives y = −7 at x = 2, not 5. Subtracting 6 instead of adding gives b = 5 − 6 = −1.',
    },
  },

  // ─── q02 — Algebra — medium ───────────────────────────────────────────────
  {
    id: 'sat-f9-v2-math-m2h-q02',
    section: 'math',
    moduleId: 'f9v2-math-module-2-hard',
    domain: 'Algebra',
    skill: 'Systems of two linear equations in two variables',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'The system of equations below has exactly one solution.\n\nx + y = 3\n3x − y = 13\n\nWhat is the value of y in the solution?',
    choices: [
      { label: 'A', text: '3' },
      { label: 'B', text: '1' },
      { label: 'C', text: '−2' },
      { label: 'D', text: '−1' },
    ],
    correctAnswer: 'D',
    explanation:
      'Add the two equations to eliminate y:\n(x + y) + (3x − y) = 3 + 13\n4x = 16\nx = 4\n\nSubstitute x = 4 into the first equation:\n4 + y = 3\ny = −1\n\nVerification: 3(4) − (−1) = 12 + 1 = 13 ✓',
    wrongAnswerExplanations: {
      A: 'y = 3 is the value on the right side of the first equation, not the value of y in the solution.',
      B: 'y = 1 results from solving x + y = 3 with x = 2, but substituting into the second equation gives 3(2) − 1 = 5 ≠ 13.',
      C: 'y = −2 results from a sign error when substituting. If x = 4, then y = 3 − 4 = −1, not −2.',
    },
  },

  // ─── q03 — Advanced Math — medium-hard ────────────────────────────────────
  {
    id: 'sat-f9-v2-math-m2h-q03',
    section: 'math',
    moduleId: 'f9v2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'The function g is defined by g(x) = 2x² − 8x + 6. What are the x-intercepts of the graph of g in the xy-plane?',
    choices: [
      { label: 'A', text: 'x = 1 and x = 3' },
      { label: 'B', text: 'x = −1 and x = −3' },
      { label: 'C', text: 'x = 2 and x = 6' },
      { label: 'D', text: 'x = 1 and x = −3' },
    ],
    correctAnswer: 'A',
    explanation:
      'Set g(x) = 0:\n2x² − 8x + 6 = 0\n\nDivide every term by 2:\nx² − 4x + 3 = 0\n\nFactor:\n(x − 1)(x − 3) = 0\nx = 1  or  x = 3\n\nVerification:\ng(1) = 2(1) − 8(1) + 6 = 2 − 8 + 6 = 0 ✓\ng(3) = 2(9) − 8(3) + 6 = 18 − 24 + 6 = 0 ✓',
    wrongAnswerExplanations: {
      B: 'x = −1 and x = −3 are the negatives of the correct roots. (x + 1)(x + 3) = x² + 4x + 3, whose roots have the wrong signs.',
      C: 'x = 2 and x = 6 arise from factoring incorrectly without first dividing by 2. g(2) = 8 − 16 + 6 = −2 ≠ 0.',
      D: 'x = 1 and x = −3 arise from factoring (x − 1)(x + 3) = x² + 2x − 3, which does not match x² − 4x + 3.',
    },
  },

  // ─── q04 — Advanced Math — medium-hard ────────────────────────────────────
  {
    id: 'sat-f9-v2-math-m2h-q04',
    section: 'math',
    moduleId: 'f9v2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Nonlinear equations in one variable and systems of equations in two variables',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'Which value of x satisfies the equation 2^(2x) = 32?',
    choices: [
      { label: 'A', text: '2' },
      { label: 'B', text: '3' },
      { label: 'C', text: '2.5' },
      { label: 'D', text: '4' },
    ],
    correctAnswer: 'C',
    explanation:
      'Write 32 as a power of 2: 32 = 2^5.\n\nSo the equation becomes 2^(2x) = 2^5.\nSince the bases are equal, set the exponents equal:\n2x = 5\nx = 5/2 = 2.5\n\nVerification: 2^(2 × 2.5) = 2^5 = 32 ✓',
    wrongAnswerExplanations: {
      A: 'x = 2 gives 2^4 = 16, not 32.',
      B: 'x = 3 gives 2^6 = 64, not 32.',
      D: 'x = 4 gives 2^8 = 256, not 32.',
    },
  },

  // ─── q05 — Problem-Solving and Data Analysis — medium-hard ───────────────
  {
    id: 'sat-f9-v2-math-m2h-q05',
    section: 'math',
    moduleId: 'f9v2-math-module-2-hard',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Two-variable data: models and scatterplots',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'A scientist models the relationship between temperature in degrees Celsius (x) and enzyme reaction rate in units per minute (y) using the linear equation y = 1.4x + 12. According to this model, what is the predicted reaction rate when the temperature is 20°C?',
    choices: [
      { label: 'A', text: '38.8' },
      { label: 'B', text: '40.0' },
      { label: 'C', text: '36.4' },
      { label: 'D', text: '42.4' },
    ],
    correctAnswer: 'B',
    explanation:
      'Substitute x = 20 into the model:\ny = 1.4(20) + 12\ny = 28 + 12\ny = 40.0\n\nThe predicted reaction rate is 40.0 units per minute.',
    wrongAnswerExplanations: {
      A: '38.8 results from computing 1.4(19) + 12 = 26.6 + 12, using x = 19 instead of x = 20.',
      C: '36.4 results from using the wrong y-intercept: 1.4(20) + 8 = 28 + 8 = 36, close to 36.4, suggesting the intercept was misread as 8 instead of 12.',
      D: '42.4 results from using an incorrect slope of 1.52 or adding an extra constant to the model.',
    },
  },

  // ─── q06 — Advanced Math — medium-hard ────────────────────────────────────
  {
    id: 'sat-f9-v2-math-m2h-q06',
    section: 'math',
    moduleId: 'f9v2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Equivalent expressions',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'Which of the following is equivalent to (4x³ + 8x² − 12x) / (4x), where x ≠ 0?',
    choices: [
      { label: 'A', text: 'x² + 2x + 3' },
      { label: 'B', text: 'x² + 2x − 4' },
      { label: 'C', text: 'x³ + 2x² − 3x' },
      { label: 'D', text: 'x² + 2x − 3' },
    ],
    correctAnswer: 'D',
    explanation:
      'Divide each term in the numerator by 4x:\n(4x³)/(4x) + (8x²)/(4x) + (−12x)/(4x)\n= x² + 2x − 3\n\nVerification at x = 2:\nNumerator: 4(8) + 8(4) − 12(2) = 32 + 32 − 24 = 40\nDenominator: 4(2) = 8\n40/8 = 5\nx² + 2x − 3 at x = 2: 4 + 4 − 3 = 5 ✓',
    wrongAnswerExplanations: {
      A: 'The sign on the constant is wrong. Dividing −12x by 4x gives −3, not +3.',
      B: 'The constant term is wrong. Dividing −12x by 4x gives −3, not −4.',
      C: 'Dividing by 4x reduces each power by 1 and the coefficient by 4. x³ + 2x² − 3x results from dividing only by 4, not by 4x.',
    },
  },

  // ─── q07 — Algebra — medium-hard ──────────────────────────────────────────
  {
    id: 'sat-f9-v2-math-m2h-q07',
    section: 'math',
    moduleId: 'f9v2-math-module-2-hard',
    domain: 'Algebra',
    skill: 'Linear inequalities in two variables',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'Which of the following ordered pairs (x, y) satisfies both inequalities below?\n\nx − 2y > −6\n3x + y ≤ 15',
    choices: [
      { label: 'A', text: '(3, 4)' },
      { label: 'B', text: '(0, 3)' },
      { label: 'C', text: '(5, 1)' },
      { label: 'D', text: '(1, 5)' },
    ],
    correctAnswer: 'A',
    explanation:
      'Test (3, 4):\n  x − 2y = 3 − 8 = −5 > −6 ✓\n  3x + y = 9 + 4 = 13 ≤ 15 ✓\n\nBoth inequalities are satisfied by (3, 4).\n\nFor reference:\n  (0, 3): 0 − 6 = −6 > −6? No — not strictly greater. ✗\n  (5, 1): 5 − 2 = 3 > −6 ✓, but 3(5) + 1 = 16 ≤ 15? No. ✗\n  (1, 5): 1 − 10 = −9 > −6? No. ✗',
    wrongAnswerExplanations: {
      B: '(0, 3) fails the first inequality: 0 − 2(3) = −6, which is not strictly greater than −6.',
      C: '(5, 1) fails the second inequality: 3(5) + 1 = 16, which is not ≤ 15.',
      D: '(1, 5) fails the first inequality: 1 − 2(5) = −9, which is not > −6.',
    },
  },

  // ─── q08 — Advanced Math — medium-hard ────────────────────────────────────
  {
    id: 'sat-f9-v2-math-m2h-q08',
    section: 'math',
    moduleId: 'f9v2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Nonlinear equations in one variable and systems of equations in two variables',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'The equation x² + 6x + k = 0 has no real solutions. Which of the following could be the value of k?',
    choices: [
      { label: 'A', text: '5' },
      { label: 'B', text: '9' },
      { label: 'C', text: '12' },
      { label: 'D', text: '7' },
    ],
    correctAnswer: 'C',
    explanation:
      'A quadratic equation has no real solutions when its discriminant is negative:\nb² − 4ac < 0\n\nFor x² + 6x + k = 0 (with a = 1, b = 6, c = k):\n(6)² − 4(1)(k) < 0\n36 − 4k < 0\n36 < 4k\nk > 9\n\nAmong the answer choices, only k = 12 satisfies k > 9.\n\nVerification: discriminant = 36 − 4(12) = 36 − 48 = −12 < 0 ✓',
    wrongAnswerExplanations: {
      A: 'k = 5: discriminant = 36 − 20 = 16 > 0, so the equation has two distinct real solutions.',
      B: 'k = 9: discriminant = 36 − 36 = 0, so the equation has exactly one real solution (a repeated root), not no real solutions.',
      D: 'k = 7: discriminant = 36 − 28 = 8 > 0, so the equation has two distinct real solutions.',
    },
  },

  // ─── q09 — Advanced Math — medium-hard ────────────────────────────────────
  {
    id: 'sat-f9-v2-math-m2h-q09',
    section: 'math',
    moduleId: 'f9v2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'The function h is defined by h(x) = 3 · 2^x. What is the value of h(4) − h(2)?',
    choices: [
      { label: 'A', text: '30' },
      { label: 'B', text: '36' },
      { label: 'C', text: '24' },
      { label: 'D', text: '48' },
    ],
    correctAnswer: 'B',
    explanation:
      'Compute each value separately:\nh(4) = 3 · 2^4 = 3 · 16 = 48\nh(2) = 3 · 2^2 = 3 · 4 = 12\n\nh(4) − h(2) = 48 − 12 = 36',
    wrongAnswerExplanations: {
      A: '30 is not the correct result. A common error is computing 3 · (2^4 − 2^2) = 3 · 14 = 42, or subtracting exponents: 3 · 2^(4−2) = 3 · 4 = 12, neither of which equals 30.',
      C: '24 results from computing h(4) − h(3) = 48 − 24 = 24, using the wrong second term.',
      D: '48 is the value of h(4) alone, without subtracting h(2).',
    },
  },

  // ─── q10 — Problem-Solving and Data Analysis — hard ───────────────────────
  {
    id: 'sat-f9-v2-math-m2h-q10',
    section: 'math',
    moduleId: 'f9v2-math-module-2-hard',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Probability',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'A box contains 6 red cards, 4 blue cards, and 2 yellow cards. Two cards are drawn one at a time without replacement. What is the probability that the first card drawn is red and the second card drawn is blue?',
    choices: [
      { label: 'A', text: '1/6' },
      { label: 'B', text: '4/33' },
      { label: 'C', text: '1/3' },
      { label: 'D', text: '2/11' },
    ],
    correctAnswer: 'D',
    explanation:
      'There are 12 cards total.\n\nP(first card is red) = 6/12 = 1/2\nP(second card is blue | first card was red) = 4/11\n\nBy the multiplication rule:\nP(first red AND second blue) = (1/2) × (4/11) = 4/22 = 2/11',
    wrongAnswerExplanations: {
      A: '1/6 treats the draws as independent: (6/12) × (4/12) = 24/144 = 1/6. This ignores the without-replacement condition — only 11 cards remain after the first draw.',
      B: '4/33 results from computing (4/12) × (3/11) = 12/132 = 1/11, which is the probability that both cards are blue, not red then blue.',
      C: '1/3 results from (6/12) × (4/10) or another incorrect denominator for the second draw.',
    },
  },

  // ─── q11 — Advanced Math — hard ───────────────────────────────────────────
  {
    id: 'sat-f9-v2-math-m2h-q11',
    section: 'math',
    moduleId: 'f9v2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Equivalent expressions',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'Which of the following expressions is equivalent to (x² − 9)/(x + 3) + (x² − 4)/(x − 2), for x ≠ −3 and x ≠ 2?',
    choices: [
      { label: 'A', text: '2x − 1' },
      { label: 'B', text: '2x − 5' },
      { label: 'C', text: '2x + 5' },
      { label: 'D', text: 'x² − 6' },
    ],
    correctAnswer: 'A',
    explanation:
      'Factor each numerator using difference of squares or standard factoring:\nx² − 9 = (x − 3)(x + 3), so (x² − 9)/(x + 3) = x − 3\nx² − 4 = (x − 2)(x + 2), so (x² − 4)/(x − 2) = x + 2\n\nAdd the simplified expressions:\n(x − 3) + (x + 2) = 2x − 1\n\nVerification at x = 4:\n(16 − 9)/(4 + 3) + (16 − 4)/(4 − 2) = 7/7 + 12/2 = 1 + 6 = 7\n2(4) − 1 = 7 ✓',
    wrongAnswerExplanations: {
      B: '2x − 5 results from incorrectly simplifying (x² − 4)/(x − 2) as x − 2 instead of x + 2, then adding: (x − 3) + (x − 2) = 2x − 5.',
      C: '2x + 5 results from incorrectly simplifying (x² − 9)/(x + 3) as x + 3 instead of x − 3, then adding: (x + 3) + (x + 2) = 2x + 5.',
      D: 'x² − 6 results from multiplying the simplified terms rather than adding them, or from another algebraic error.',
    },
  },

  // ─── q12 — Geometry and Trigonometry — hard ───────────────────────────────
  {
    id: 'sat-f9-v2-math-m2h-q12',
    section: 'math',
    moduleId: 'f9v2-math-module-2-hard',
    domain: 'Geometry and Trigonometry',
    skill: 'Area and volume',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'A cylinder has a base radius of 5 and a height of 10. A cone with the same base radius and the same height is removed from the cylinder. What is the volume of the remaining solid?',
    choices: [
      { label: 'A', text: '(400/3)π' },
      { label: 'B', text: '150π' },
      { label: 'C', text: '(500/3)π' },
      { label: 'D', text: '250π' },
    ],
    correctAnswer: 'C',
    explanation:
      'Volume of the cylinder:\nV_cyl = πr²h = π(5²)(10) = 250π\n\nVolume of the cone:\nV_cone = (1/3)πr²h = (1/3)π(25)(10) = (250/3)π\n\nVolume of the remaining solid:\nV = V_cyl − V_cone = 250π − (250/3)π\n= (750/3)π − (250/3)π\n= (500/3)π',
    wrongAnswerExplanations: {
      A: '(400/3)π results from using r = 5 and h = 8 instead of h = 10: V_cyl = 200π, V_cone = (200/3)π, remainder = (400/3)π.',
      B: '150π results from computing (2/3) × 225π, using the wrong radius or height in one of the formulas.',
      D: '250π is the volume of the full cylinder alone, before removing the cone.',
    },
  },

  // ─── q13 — Advanced Math — hard ───────────────────────────────────────────
  {
    id: 'sat-f9-v2-math-m2h-q13',
    section: 'math',
    moduleId: 'f9v2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'The graph of f(x) = a(x − 2)² + k passes through the points (0, 10) and (4, 10), and the vertex of the parabola lies below the x-axis. Which of the following is the value of k?',
    choices: [
      { label: 'A', text: '10' },
      { label: 'B', text: '−6' },
      { label: 'C', text: '6' },
      { label: 'D', text: '2' },
    ],
    correctAnswer: 'B',
    explanation:
      'Because f(0) = f(4) = 10 and the axis of symmetry is x = 2, both points are symmetric about x = 2. This is consistent with the vertex form f(x) = a(x − 2)² + k.\n\nUsing the point (0, 10):\na(0 − 2)² + k = 10\n4a + k = 10   …(1)\n\nThe vertex value is k. Since the vertex lies below the x-axis, k < 0.\n\nAmong the choices, only k = −6 is negative.\n\nCheck: from (1), a = (10 − (−6))/4 = 16/4 = 4 > 0, so the parabola opens upward and the vertex is a minimum.\nf(0) = 4(0 − 2)² − 6 = 16 − 6 = 10 ✓\nf(4) = 4(4 − 2)² − 6 = 16 − 6 = 10 ✓\nVertex value: k = −6 < 0 ✓',
    wrongAnswerExplanations: {
      A: 'k = 10 would place the vertex at y = 10, which is not below the x-axis.',
      C: 'k = 6 would place the vertex at y = 6 > 0, which is not below the x-axis.',
      D: 'k = 2 would place the vertex at y = 2 > 0, which is not below the x-axis.',
    },
  },

  // ─── q14 — Problem-Solving and Data Analysis — hard ───────────────────────
  {
    id: 'sat-f9-v2-math-m2h-q14',
    section: 'math',
    moduleId: 'f9v2-math-module-2-hard',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Two-variable data: models and scatterplots',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'A researcher uses a least-squares regression line to model the relationship between weekly hours of exercise (x) and resting heart rate in beats per minute (y). The regression equation is y = −2.5x + 85. Which of the following is the best interpretation of the slope of this model?',
    choices: [
      { label: 'A', text: 'For each additional hour of exercise per week, the resting heart rate is predicted to increase by 2.5 bpm.' },
      { label: 'B', text: 'The resting heart rate for someone who exercises 0 hours per week is predicted to be 2.5 bpm.' },
      { label: 'C', text: 'For each additional hour of exercise per week, the resting heart rate is predicted to be 85 bpm lower.' },
      { label: 'D', text: 'For each additional hour of exercise per week, the resting heart rate is predicted to decrease by 2.5 bpm.' },
    ],
    correctAnswer: 'D',
    explanation:
      'The slope of the linear model y = −2.5x + 85 is −2.5. In context, the slope represents the predicted change in the response variable (y) for each one-unit increase in the explanatory variable (x).\n\nSince the slope is −2.5, for each additional hour of exercise per week, the predicted resting heart rate decreases by 2.5 beats per minute.\n\nThe negative slope reflects an inverse relationship: more exercise is associated with a lower resting heart rate.',
    wrongAnswerExplanations: {
      A: 'The slope is negative, so the heart rate is predicted to decrease, not increase, with more exercise.',
      B: '2.5 is the magnitude of the slope, not the resting heart rate at x = 0. The y-intercept (85) gives the predicted heart rate at 0 hours of exercise.',
      C: '85 is the y-intercept of the model, not the slope. The slope is −2.5 bpm per hour, not −85 bpm per hour.',
    },
  },

  // ─── q15 — Advanced Math — hard ───────────────────────────────────────────
  {
    id: 'sat-f9-v2-math-m2h-q15',
    section: 'math',
    moduleId: 'f9v2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Nonlinear equations in one variable and systems of equations in two variables',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'The system of equations below has two solutions.\n\ny = x² − 5x + 4\ny = 2x − 6\n\nWhat is the product of the x-coordinates of the two solutions?',
    choices: [
      { label: 'A', text: '10' },
      { label: 'B', text: '−4' },
      { label: 'C', text: '7' },
      { label: 'D', text: '4' },
    ],
    correctAnswer: 'A',
    explanation:
      'Substitute y = 2x − 6 into the quadratic equation:\nx² − 5x + 4 = 2x − 6\nx² − 7x + 10 = 0\n\nFactor:\n(x − 2)(x − 5) = 0\nx = 2  or  x = 5\n\nProduct of the x-coordinates: 2 × 5 = 10\n\nVerification:\n  At x = 2: y = 2(2) − 6 = −2; and y = 4 − 10 + 4 = −2 ✓\n  At x = 5: y = 2(5) − 6 = 4; and y = 25 − 25 + 4 = 4 ✓',
    wrongAnswerExplanations: {
      B: '−4 is the product of the roots of the quadratic x² − 5x + 4 = 0 alone (roots 1 and 4, product 4 — wait, 1 × 4 = 4, not −4). −4 does not arise correctly here.',
      C: '7 is the sum of the x-coordinates (2 + 5), not their product.',
      D: '4 is the product of the roots (1 and 4) of the original quadratic x² − 5x + 4 = 0, which applies before the linear equation y = 2x − 6 is substituted in.',
    },
  },

  // ─── q16 — Geometry and Trigonometry — hard ───────────────────────────────
  {
    id: 'sat-f9-v2-math-m2h-q16',
    section: 'math',
    moduleId: 'f9v2-math-module-2-hard',
    domain: 'Geometry and Trigonometry',
    skill: 'Trigonometry',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'In a right triangle, an acute angle θ satisfies tan(θ) = 4/3. What is the value of sin(θ)?',
    choices: [
      { label: 'A', text: '3/5' },
      { label: 'B', text: '3/4' },
      { label: 'C', text: '4/5' },
      { label: 'D', text: '5/4' },
    ],
    correctAnswer: 'C',
    explanation:
      'If tan(θ) = 4/3, then the opposite side = 4 and the adjacent side = 3.\n\nBy the Pythagorean theorem:\nhypotenuse² = 4² + 3² = 16 + 9 = 25\nhypotenuse = 5\n\nTherefore:\nsin(θ) = opposite/hypotenuse = 4/5',
    wrongAnswerExplanations: {
      A: '3/5 is the value of cos(θ) = adjacent/hypotenuse, not sin(θ).',
      B: '3/4 is the reciprocal of the given tangent ratio (cot(θ)), not sin(θ).',
      D: '5/4 is greater than 1, so it cannot be a sine value. It would be csc(θ) = hypotenuse/opposite = 5/4.',
    },
  },

  // ─── q17 — Algebra — grid_in hard ─────────────────────────────────────────
  {
    id: 'sat-f9-v2-math-m2h-q17',
    section: 'math',
    moduleId: 'f9v2-math-module-2-hard',
    domain: 'Algebra',
    skill: 'Linear functions',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'The linear function f satisfies f(3) = 1 and f(7) = 13. What is the value of f(5)?',
    correctAnswer: '7',
    acceptableAnswers: ['7'],
    explanation:
      'Find the slope:\nm = (13 − 1)/(7 − 3) = 12/4 = 3\n\nWrite the equation using point-slope form with the point (3, 1):\nf(x) = 3(x − 3) + 1 = 3x − 9 + 1 = 3x − 8\n\nEvaluate at x = 5:\nf(5) = 3(5) − 8 = 15 − 8 = 7\n\nVerification:\nf(3) = 3(3) − 8 = 1 ✓\nf(7) = 3(7) − 8 = 13 ✓',
  },

  // ─── q18 — Problem-Solving and Data Analysis — grid_in hard ───────────────
  {
    id: 'sat-f9-v2-math-m2h-q18',
    section: 'math',
    moduleId: 'f9v2-math-module-2-hard',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Inference from sample statistics and margin of error',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'A data set has exactly six values: 12, 18, 22, x, 30, and 35. If the mean of the data set is 24, what is the value of x?',
    correctAnswer: '27',
    acceptableAnswers: ['27'],
    explanation:
      'The mean of 6 values is (sum)/6 = 24, so the total sum must be:\n24 × 6 = 144\n\nFind the sum of the known values:\n12 + 18 + 22 + 30 + 35 = 117\n\nSolve for x:\n117 + x = 144\nx = 27\n\nVerification: (12 + 18 + 22 + 27 + 30 + 35)/6 = 144/6 = 24 ✓',
  },

  // ─── q19 — Advanced Math — grid_in hard ───────────────────────────────────
  {
    id: 'sat-f9-v2-math-m2h-q19',
    section: 'math',
    moduleId: 'f9v2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'The function p is defined by p(x) = x² − 2x − 24. If p(c) = 0 and c > 0, what is the value of c?',
    correctAnswer: '6',
    acceptableAnswers: ['6'],
    explanation:
      'Set p(c) = 0:\nc² − 2c − 24 = 0\n\nFactor:\n(c − 6)(c + 4) = 0\nc = 6  or  c = −4\n\nSince c > 0, c = 6.\n\nVerification: p(6) = 36 − 12 − 24 = 0 ✓',
  },

  // ─── q20 — Algebra — grid_in hard ─────────────────────────────────────────
  {
    id: 'sat-f9-v2-math-m2h-q20',
    section: 'math',
    moduleId: 'f9v2-math-module-2-hard',
    domain: 'Algebra',
    skill: 'Systems of two linear equations in two variables',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'At a school event, adult tickets are sold for $6 each and student tickets are sold for $4 each. A total of 120 tickets are sold for a total revenue of $640. How many adult tickets were sold?',
    correctAnswer: '80',
    acceptableAnswers: ['80'],
    explanation:
      'Let a = number of adult tickets and s = number of student tickets.\n\nSet up the system:\na + s = 120   …(total tickets)\n6a + 4s = 640   …(total revenue)\n\nFrom the first equation: s = 120 − a.\nSubstitute into the second:\n6a + 4(120 − a) = 640\n6a + 480 − 4a = 640\n2a = 160\na = 80\n\nVerification: s = 120 − 80 = 40.\nRevenue: 6(80) + 4(40) = 480 + 160 = 640 ✓',
  },

  // ─── q21 — Problem-Solving and Data Analysis — grid_in hard ───────────────
  {
    id: 'sat-f9-v2-math-m2h-q21',
    section: 'math',
    moduleId: 'f9v2-math-module-2-hard',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Probability',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'A spinner is divided into 8 equal sections numbered 1 through 8. If the spinner is spun once, what is the probability of landing on a number greater than 4?',
    correctAnswer: '0.5',
    acceptableAnswers: ['0.5', '1/2'],
    explanation:
      'The numbers greater than 4 on the spinner are: 5, 6, 7, and 8. That is 4 favorable outcomes out of 8 equally likely outcomes.\n\nP(number > 4) = 4/8 = 1/2 = 0.5',
    scoringNotes: 'Accept 1/2 or 0.5. Both are equivalent and gridable.',
  },

  // ─── q22 — Geometry and Trigonometry — grid_in hard ───────────────────────
  {
    id: 'sat-f9-v2-math-m2h-q22',
    section: 'math',
    moduleId: 'f9v2-math-module-2-hard',
    domain: 'Geometry and Trigonometry',
    skill: 'Circles',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'A circle has a radius of 14. A central angle of the circle measures 4 radians. What is the length of the arc subtended by this central angle?',
    correctAnswer: '56',
    acceptableAnswers: ['56'],
    explanation:
      'The arc length formula is:\ns = r · θ\nwhere r is the radius and θ is the central angle measured in radians.\n\ns = 14 × 4 = 56\n\nNote: 4 radians < 2π ≈ 6.283, so the arc is less than a full circle, which is valid.',
  },
]
