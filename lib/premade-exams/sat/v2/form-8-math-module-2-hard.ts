import type { MathMCQuestion, MathGridInQuestion } from '../types'
type MathQuestion = MathMCQuestion | MathGridInQuestion

export const f8MathModule2HardQuestionsV2: MathQuestion[] = [
  // ─── q01 — Algebra — medium ───────────────────────────────────────────────
  {
    id: 'sat-f8-v2-math-m2h-q01',
    section: 'math',
    moduleId: 'f8v2-math-module-2-hard',
    domain: 'Algebra',
    skill: 'Linear functions',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'A line in the xy-plane passes through the points (−3, 7) and (1, −1). What is the y-intercept of the line?',
    choices: [
      { label: 'A', text: '1' },
      { label: 'B', text: '−2' },
      { label: 'C', text: '4' },
      { label: 'D', text: '−1' },
    ],
    correctAnswer: 'A',
    explanation:
      'The slope is m = (−1 − 7) / (1 − (−3)) = −8 / 4 = −2.\n\nUsing point-slope form with the point (1, −1):\ny − (−1) = −2(x − 1)\ny + 1 = −2x + 2\ny = −2x + 1\n\nThe y-intercept is 1.',
    wrongAnswerExplanations: {
      B: 'This is the slope of the line, not the y-intercept.',
      C: 'This results from computing the slope incorrectly as (7 − (−1)) / (1 − (−3)) = 2, then misapplying point-slope form.',
      D: 'This is the y-coordinate of the point (1, −1), not the y-intercept.',
    },
  },

  // ─── q02 — Algebra — medium ───────────────────────────────────────────────
  {
    id: 'sat-f8-v2-math-m2h-q02',
    section: 'math',
    moduleId: 'f8v2-math-module-2-hard',
    domain: 'Algebra',
    skill: 'Linear equations in two variables',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'Company A charges a flat fee of $25 plus $0.40 per mile driven. Company B charges a flat fee of $10 plus $0.70 per mile driven. For how many miles driven are the total charges from the two companies equal?',
    choices: [
      { label: 'A', text: '30' },
      { label: 'B', text: '40' },
      { label: 'C', text: '50' },
      { label: 'D', text: '75' },
    ],
    correctAnswer: 'C',
    explanation:
      'Set the two total-cost expressions equal:\n25 + 0.40m = 10 + 0.70m\n15 = 0.30m\nm = 50\n\nAt 50 miles, both companies charge 25 + 0.40(50) = 25 + 20 = $45.',
    wrongAnswerExplanations: {
      A: 'At 30 miles, Company A charges $37 and Company B charges $31 — they are not equal.',
      B: 'At 40 miles, Company A charges $41 and Company B charges $38 — they are not equal.',
      D: 'This results from dividing the flat-fee difference by the per-mile rate of one company alone rather than the difference of rates.',
    },
  },

  // ─── q03 — Advanced Math — medium-hard ────────────────────────────────────
  {
    id: 'sat-f8-v2-math-m2h-q03',
    section: 'math',
    moduleId: 'f8v2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'The function f is defined by f(x) = −2(x + 1)² + 8. For what positive value of x does f(x) = 0?',
    choices: [
      { label: 'A', text: '0' },
      { label: 'B', text: '1' },
      { label: 'C', text: '2' },
      { label: 'D', text: '3' },
    ],
    correctAnswer: 'B',
    explanation:
      'Set f(x) = 0:\n−2(x + 1)² + 8 = 0\n−2(x + 1)² = −8\n(x + 1)² = 4\nx + 1 = ±2\n\nSo x = 1 or x = −3.\n\nThe positive value is x = 1.\n\nVerification: f(1) = −2(1 + 1)² + 8 = −2(4) + 8 = 0 ✓',
    wrongAnswerExplanations: {
      A: 'f(0) = −2(1)² + 8 = 6, not 0. Setting (x + 1)² = 4 gives x + 1 = ±2, not x = 0.',
      C: 'f(2) = −2(3)² + 8 = −18 + 8 = −10, not 0. Taking the square root of 4 gives ±2, but x + 1 = 2 means x = 1, not 2.',
      D: 'f(3) = −2(4)² + 8 = −32 + 8 = −24, not 0.',
    },
  },

  // ─── q04 — Advanced Math — medium-hard ────────────────────────────────────
  {
    id: 'sat-f8-v2-math-m2h-q04',
    section: 'math',
    moduleId: 'f8v2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Nonlinear equations in one variable and systems of equations in two variables',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'The equation x² − 10x + k = 0 has exactly one real solution. What is the value of k?',
    choices: [
      { label: 'A', text: '5' },
      { label: 'B', text: '10' },
      { label: 'C', text: '20' },
      { label: 'D', text: '25' },
    ],
    correctAnswer: 'D',
    explanation:
      'A quadratic equation has exactly one real solution when the discriminant equals zero.\n\nFor x² − 10x + k = 0, the discriminant is b² − 4ac = (−10)² − 4(1)(k) = 100 − 4k.\n\nSetting the discriminant equal to zero:\n100 − 4k = 0\n4k = 100\nk = 25\n\nWith k = 25, the equation x² − 10x + 25 = (x − 5)² = 0 has exactly one solution, x = 5.',
    wrongAnswerExplanations: {
      A: 'k = 5 gives discriminant 100 − 20 = 80 > 0, which means two distinct real solutions.',
      B: 'k = 10 gives discriminant 100 − 40 = 60 > 0, which means two distinct real solutions.',
      C: 'k = 20 gives discriminant 100 − 80 = 20 > 0, which means two distinct real solutions.',
    },
  },

  // ─── q05 — Problem-Solving and Data Analysis — medium-hard ───────────────
  {
    id: 'sat-f8-v2-math-m2h-q05',
    section: 'math',
    moduleId: 'f8v2-math-module-2-hard',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Two-variable data: models and scatterplots',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'A researcher finds that the relationship between daily study hours (x) and exam score (y) is modeled by the equation y = 3.2x + 45. According to this model, what exam score is predicted for a student who studies 8 hours per day?',
    choices: [
      { label: 'A', text: '70.6' },
      { label: 'B', text: '68.8' },
      { label: 'C', text: '71.2' },
      { label: 'D', text: '73.6' },
    ],
    correctAnswer: 'A',
    explanation:
      'Substitute x = 8 into the model:\ny = 3.2(8) + 45\ny = 25.6 + 45\ny = 70.6\n\nThe predicted exam score is 70.6.',
    wrongAnswerExplanations: {
      B: 'This results from computing 3.1(8) + 45 = 24.8 + 45 = 69.8, using the wrong rate, or another rounding error.',
      C: 'This results from computing 3.2(8) + 46 = 71.2, incorrectly using 46 as the y-intercept.',
      D: 'This results from computing 3.58(8) + 45, using an incorrect slope, or from misreading 3.2 as 3.58.',
    },
  },

  // ─── q06 — Advanced Math — medium-hard ────────────────────────────────────
  {
    id: 'sat-f8-v2-math-m2h-q06',
    section: 'math',
    moduleId: 'f8v2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Equivalent expressions',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'Which of the following is equivalent to (3x² − 4x + 1) / (x − 1), where x ≠ 1?',
    choices: [
      { label: 'A', text: '3x + 1' },
      { label: 'B', text: '3x + 3' },
      { label: 'C', text: '3x − 1' },
      { label: 'D', text: 'x − 1' },
    ],
    correctAnswer: 'C',
    explanation:
      'Factor the numerator 3x² − 4x + 1.\n\nLook for two numbers that multiply to 3(1) = 3 and add to −4: those are −3 and −1.\n3x² − 3x − x + 1 = 3x(x − 1) − 1(x − 1) = (3x − 1)(x − 1)\n\nSo:\n(3x² − 4x + 1) / (x − 1) = (3x − 1)(x − 1) / (x − 1) = 3x − 1, for x ≠ 1.\n\nVerification at x = 2: (12 − 8 + 1) / (2 − 1) = 5 / 1 = 5, and 3(2) − 1 = 5 ✓',
    wrongAnswerExplanations: {
      A: '(3x + 1)(x − 1) = 3x² − 2x − 1, which is not the original numerator.',
      B: '3x + 3 = 3(x + 1). This does not match: at x = 2, it gives 9, but the correct value is 5.',
      D: 'This would require the numerator to equal (x − 1)², which is x² − 2x + 1, not 3x² − 4x + 1.',
    },
  },

  // ─── q07 — Algebra — medium-hard ──────────────────────────────────────────
  {
    id: 'sat-f8-v2-math-m2h-q07',
    section: 'math',
    moduleId: 'f8v2-math-module-2-hard',
    domain: 'Algebra',
    skill: 'Linear inequalities in two variables',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'Which of the following ordered pairs (x, y) satisfies both inequalities below?\n\n2x + y < 10\nx − y > 1',
    choices: [
      { label: 'A', text: '(2, 3)' },
      { label: 'B', text: '(4, 1)' },
      { label: 'C', text: '(3, 4)' },
      { label: 'D', text: '(1, 8)' },
    ],
    correctAnswer: 'B',
    explanation:
      'Test (4, 1):\n  2(4) + 1 = 9 < 10 ✓\n  4 − 1 = 3 > 1 ✓\n\nBoth inequalities are satisfied.\n\nFor reference:\n  (2, 3): 2(2) + 3 = 7 < 10 ✓, but 2 − 3 = −1 > 1 ✗\n  (3, 4): 2(3) + 4 = 10 < 10 ✗ (not strictly less)\n  (1, 8): 2(1) + 8 = 10 < 10 ✗ (not strictly less)',
    wrongAnswerExplanations: {
      A: '(2, 3) satisfies the first inequality but fails the second: 2 − 3 = −1, which is not greater than 1.',
      C: '(3, 4) fails the first inequality: 2(3) + 4 = 10, which is not strictly less than 10.',
      D: '(1, 8) fails the first inequality: 2(1) + 8 = 10, which is not strictly less than 10.',
    },
  },

  // ─── q08 — Advanced Math — medium-hard ────────────────────────────────────
  {
    id: 'sat-f8-v2-math-m2h-q08',
    section: 'math',
    moduleId: 'f8v2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Nonlinear equations in one variable and systems of equations in two variables',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'If 4^(x + 1) = 8^(x − 1), what is the value of x?',
    choices: [
      { label: 'A', text: '1' },
      { label: 'B', text: '2' },
      { label: 'C', text: '3' },
      { label: 'D', text: '5' },
    ],
    correctAnswer: 'D',
    explanation:
      'Rewrite both sides as powers of 2:\n4^(x + 1) = (2²)^(x + 1) = 2^(2x + 2)\n8^(x − 1) = (2³)^(x − 1) = 2^(3x − 3)\n\nSet the exponents equal:\n2x + 2 = 3x − 3\n2 + 3 = 3x − 2x\n5 = x\n\nVerification: 4^(5 + 1) = 4^6 = 4096, and 8^(5 − 1) = 8^4 = 4096 ✓',
    wrongAnswerExplanations: {
      A: 'x = 1 gives 4² = 16 on the left and 8⁰ = 1 on the right — not equal.',
      B: 'x = 2 gives 4³ = 64 on the left and 8¹ = 8 on the right — not equal.',
      C: 'x = 3 gives 4⁴ = 256 on the left and 8² = 64 on the right — not equal.',
    },
  },

  // ─── q09 — Advanced Math — medium-hard ────────────────────────────────────
  {
    id: 'sat-f8-v2-math-m2h-q09',
    section: 'math',
    moduleId: 'f8v2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'The height (in feet) of an object thrown upward from the top of a 80-foot platform is modeled by h(t) = −16t² + 64t + 80, where t is the time in seconds after the object is thrown. After how many seconds does the object reach the ground (h = 0)?',
    choices: [
      { label: 'A', text: '5' },
      { label: 'B', text: '3' },
      { label: 'C', text: '4' },
      { label: 'D', text: '6' },
    ],
    correctAnswer: 'A',
    explanation:
      'Set h(t) = 0:\n−16t² + 64t + 80 = 0\n\nDivide every term by −16:\nt² − 4t − 5 = 0\n\nFactor:\n(t − 5)(t + 1) = 0\n\nSo t = 5 or t = −1.\n\nSince time must be positive, t = 5 seconds.\n\nVerification: h(5) = −16(25) + 64(5) + 80 = −400 + 320 + 80 = 0 ✓',
    wrongAnswerExplanations: {
      B: 'h(3) = −16(9) + 64(3) + 80 = −144 + 192 + 80 = 128 ≠ 0. The object is still 128 feet above the ground at t = 3.',
      C: 'h(4) = −16(16) + 64(4) + 80 = −256 + 256 + 80 = 80 ≠ 0. The object is still 80 feet above the ground at t = 4.',
      D: 'h(6) would be negative, meaning the object already hit the ground before t = 6.',
    },
  },

  // ─── q10 — Problem-Solving and Data Analysis — hard ───────────────────────
  {
    id: 'sat-f8-v2-math-m2h-q10',
    section: 'math',
    moduleId: 'f8v2-math-module-2-hard',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Probability',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'A bag contains 5 red marbles, 3 blue marbles, and 2 green marbles. Two marbles are drawn at random, one at a time, without replacement. What is the probability that both marbles are red?',
    choices: [
      { label: 'A', text: '1/4' },
      { label: 'B', text: '1/5' },
      { label: 'C', text: '2/9' },
      { label: 'D', text: '5/18' },
    ],
    correctAnswer: 'C',
    explanation:
      'There are 10 marbles total.\n\nP(first marble is red) = 5/10 = 1/2\nP(second marble is red | first was red) = 4/9\n\nP(both red) = (5/10) × (4/9) = 20/90 = 2/9\n\nAlternately, using combinations:\nC(5,2) / C(10,2) = 10 / 45 = 2/9 ✓',
    wrongAnswerExplanations: {
      A: '1/4 treats the two draws as independent: (1/2)(1/2). This ignores the fact that the first marble is not replaced.',
      B: '1/5 results from computing (5/10)(4/10) = 20/100 = 1/5, incorrectly assuming replacement.',
      D: '5/18 results from an arithmetic error when simplifying 20/90 — the correct simplification is 2/9, not 5/18.',
    },
  },

  // ─── q11 — Advanced Math — hard ───────────────────────────────────────────
  {
    id: 'sat-f8-v2-math-m2h-q11',
    section: 'math',
    moduleId: 'f8v2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Equivalent expressions',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'Which expression is equivalent to (2x³ − 5x² + 3x) / x, where x ≠ 0?',
    choices: [
      { label: 'A', text: '2x² − 5x − 3' },
      { label: 'B', text: '2x² − 5x + 3' },
      { label: 'C', text: '2x² + 5x − 3' },
      { label: 'D', text: '2x² − 3x + 5' },
    ],
    correctAnswer: 'B',
    explanation:
      'Divide each term in the numerator by x:\n(2x³ − 5x² + 3x) / x = 2x² − 5x + 3\n\nVerification at x = 2:\nNumerator: 2(8) − 5(4) + 3(2) = 16 − 20 + 6 = 2\nDivided by x = 2: 2/2 = 1\n2(4) − 5(2) + 3 = 8 − 10 + 3 = 1 ✓',
    wrongAnswerExplanations: {
      A: 'The sign on the constant term is wrong. Dividing +3x by x gives +3, not −3.',
      C: 'The sign on the 5x term is wrong. Dividing −5x² by x gives −5x, not +5x.',
      D: 'Dividing each term correctly yields 2x² − 5x + 3, not 2x² − 3x + 5. The coefficients of x and the constant are swapped.',
    },
  },

  // ─── q12 — Geometry and Trigonometry — hard ───────────────────────────────
  {
    id: 'sat-f8-v2-math-m2h-q12',
    section: 'math',
    moduleId: 'f8v2-math-module-2-hard',
    domain: 'Geometry and Trigonometry',
    skill: 'Area and volume',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'A right circular cone has a base radius of 6 and a slant height of 10. What is the lateral surface area of the cone?',
    choices: [
      { label: 'A', text: '36π' },
      { label: 'B', text: '48π' },
      { label: 'C', text: '96π' },
      { label: 'D', text: '60π' },
    ],
    correctAnswer: 'D',
    explanation:
      'The lateral surface area of a right circular cone is:\nL = π × r × l\nwhere r is the base radius and l is the slant height.\n\nL = π × 6 × 10 = 60π\n\nNote: The vertical height is not needed. By the Pythagorean theorem, h = √(10² − 6²) = √64 = 8, but the formula uses slant height l = 10.',
    wrongAnswerExplanations: {
      A: '36π = π × 6 × 6 = πr². This is the area of the circular base, not the lateral surface area.',
      B: '48π results from using the vertical height (8) instead of the slant height (10): π × 6 × 8 = 48π.',
      C: '96π doubles the correct answer, perhaps from confusing lateral surface area with total surface area and computing incorrectly.',
    },
  },

  // ─── q13 — Advanced Math — hard ───────────────────────────────────────────
  {
    id: 'sat-f8-v2-math-m2h-q13',
    section: 'math',
    moduleId: 'f8v2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'The function f is defined by f(x) = (x + 3)² − 16. What is the positive x-intercept of the graph of f?',
    choices: [
      { label: 'A', text: '1' },
      { label: 'B', text: '3' },
      { label: 'C', text: '4' },
      { label: 'D', text: '7' },
    ],
    correctAnswer: 'A',
    explanation:
      'Set f(x) = 0 and solve:\n(x + 3)² − 16 = 0\n(x + 3)² = 16\nx + 3 = ±4\n\nCase 1: x + 3 = 4 → x = 1\nCase 2: x + 3 = −4 → x = −7\n\nThe positive x-intercept is x = 1.\n\nVerification: f(1) = (1 + 3)² − 16 = 16 − 16 = 0 ✓',
    wrongAnswerExplanations: {
      B: 'x = 3 is not an x-intercept. f(3) = (6)² − 16 = 36 − 16 = 20 ≠ 0.',
      C: '4 is the value inside the square root step — it is not the x-intercept. x + 3 = 4 gives x = 1, not x = 4.',
      D: '7 is the absolute value of the negative x-intercept (−7), not the positive one.',
    },
  },

  // ─── q14 — Problem-Solving and Data Analysis — hard ───────────────────────
  {
    id: 'sat-f8-v2-math-m2h-q14',
    section: 'math',
    moduleId: 'f8v2-math-module-2-hard',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Two-variable data: models and scatterplots',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'A linear model predicts annual sales revenue (in thousands of dollars) based on advertising spend (in thousands of dollars) using the equation y = 0.85x + 12. Based on this model, by how much does the predicted annual sales revenue increase for each additional $1,000 spent on advertising?',
    choices: [
      { label: 'A', text: '$120' },
      { label: 'B', text: '$1,200' },
      { label: 'C', text: '$850' },
      { label: 'D', text: '$1,700' },
    ],
    correctAnswer: 'C',
    explanation:
      'The slope of the model is 0.85. Since both x and y are measured in thousands of dollars, a 1-unit increase in x (i.e., $1,000 more in advertising) corresponds to a 0.85-unit increase in y.\n\n0.85 thousand dollars = $850\n\nFor each additional $1,000 spent on advertising, predicted annual revenue increases by $850.',
    wrongAnswerExplanations: {
      A: '$120 is the y-intercept value (12 thousand = $12,000) misread as $120, or a unit error.',
      B: '$1,200 confuses the y-intercept (12 thousand dollars = $12,000) with the slope-driven change.',
      D: '$1,700 results from doubling the correct answer, perhaps from misreading the slope as 1.70 instead of 0.85.',
    },
  },

  // ─── q15 — Advanced Math — hard ───────────────────────────────────────────
  {
    id: 'sat-f8-v2-math-m2h-q15',
    section: 'math',
    moduleId: 'f8v2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Nonlinear equations in one variable and systems of equations in two variables',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'The system of equations below is satisfied by two ordered pairs (x, y).\n\ny = x² − 3x + 2\ny = x − 1\n\nWhat is the sum of the x-coordinates of the two solutions?',
    choices: [
      { label: 'A', text: '2' },
      { label: 'B', text: '4' },
      { label: 'C', text: '6' },
      { label: 'D', text: '3' },
    ],
    correctAnswer: 'B',
    explanation:
      'Substitute y = x − 1 into the quadratic:\nx² − 3x + 2 = x − 1\nx² − 4x + 3 = 0\n(x − 1)(x − 3) = 0\nx = 1 or x = 3\n\nThe sum of the x-coordinates is 1 + 3 = 4.\n\nVerification:\n  At x = 1: y = 1 − 1 = 0, and y = 1 − 3 + 2 = 0 ✓\n  At x = 3: y = 3 − 1 = 2, and y = 9 − 9 + 2 = 2 ✓',
    wrongAnswerExplanations: {
      A: '2 is one of the individual solutions (x = 1 and x = 3 together), or the result of adding incorrect roots.',
      C: 'The sum of the y-coordinates is 0 + 2 = 2, not 6. Alternatively, 6 results from solving x² − 3x + 2 = 0 alone (roots 1 and 2), ignoring the substitution.',
      D: '3 is one of the x-values, not the sum of both x-values.',
    },
  },

  // ─── q16 — Geometry and Trigonometry — hard ───────────────────────────────
  {
    id: 'sat-f8-v2-math-m2h-q16',
    section: 'math',
    moduleId: 'f8v2-math-module-2-hard',
    domain: 'Geometry and Trigonometry',
    skill: 'Trigonometry',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'In a right triangle, the angle θ (in the interior of the triangle) satisfies sin(θ) = 5/13. What is the value of tan(θ)?',
    choices: [
      { label: 'A', text: '13/12' },
      { label: 'B', text: '12/13' },
      { label: 'C', text: '5/13' },
      { label: 'D', text: '5/12' },
    ],
    correctAnswer: 'D',
    explanation:
      'If sin(θ) = 5/13, then the opposite side = 5 and the hypotenuse = 13.\n\nBy the Pythagorean theorem:\nadjacent² = hypotenuse² − opposite² = 169 − 25 = 144\nadjacent = 12\n\nTherefore:\ntan(θ) = opposite / adjacent = 5 / 12',
    wrongAnswerExplanations: {
      A: '13/12 is the reciprocal of cos(θ), which equals sec(θ), not tan(θ).',
      B: '12/13 is the value of cos(θ) = adjacent/hypotenuse, not tan(θ).',
      C: '5/13 is the given value of sin(θ), not tan(θ). Tangent uses the adjacent side in the denominator, not the hypotenuse.',
    },
  },

  // ─── q17 — Algebra — grid_in hard ─────────────────────────────────────────
  {
    id: 'sat-f8-v2-math-m2h-q17',
    section: 'math',
    moduleId: 'f8v2-math-module-2-hard',
    domain: 'Algebra',
    skill: 'Linear functions',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'The linear function f is defined by f(x) = 3x − 2. What is the value of f(5)?',
    correctAnswer: '13',
    acceptableAnswers: ['13'],
    explanation:
      'Substitute x = 5:\nf(5) = 3(5) − 2 = 15 − 2 = 13',
  },

  // ─── q18 — Problem-Solving and Data Analysis — grid_in hard ───────────────
  {
    id: 'sat-f8-v2-math-m2h-q18',
    section: 'math',
    moduleId: 'f8v2-math-module-2-hard',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Inference from sample statistics and margin of error',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'A data set has exactly 5 values: 2, 4, x, 8, and 11. If the mean of the data set is 6, what is the value of x?',
    correctAnswer: '5',
    acceptableAnswers: ['5'],
    explanation:
      'The mean of 5 values is (sum) / 5 = 6, so the sum must be 30.\n\n2 + 4 + x + 8 + 11 = 30\n25 + x = 30\nx = 5\n\nVerification: (2 + 4 + 5 + 8 + 11) / 5 = 30 / 5 = 6 ✓',
  },

  // ─── q19 — Advanced Math — grid_in hard ───────────────────────────────────
  {
    id: 'sat-f8-v2-math-m2h-q19',
    section: 'math',
    moduleId: 'f8v2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'The function f is defined by f(x) = x² − 4x − 12. If f(b) = 20 and b > 0, what is the value of b?',
    correctAnswer: '8',
    acceptableAnswers: ['8'],
    explanation:
      'Set f(b) = 20:\nb² − 4b − 12 = 20\nb² − 4b − 32 = 0\n\nFactor:\n(b − 8)(b + 4) = 0\nb = 8 or b = −4\n\nSince b > 0, b = 8.\n\nVerification: f(8) = 64 − 32 − 12 = 20 ✓',
  },

  // ─── q20 — Algebra — grid_in hard ─────────────────────────────────────────
  {
    id: 'sat-f8-v2-math-m2h-q20',
    section: 'math',
    moduleId: 'f8v2-math-module-2-hard',
    domain: 'Algebra',
    skill: 'Systems of two linear equations in two variables',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'In a class of 83 students, the number of girls exceeds the number of boys by 7. How many students in the class are girls?',
    correctAnswer: '45',
    acceptableAnswers: ['45'],
    explanation:
      'Let g = number of girls and b = number of boys.\n\nFrom the given information:\ng + b = 83\ng − b = 7\n\nAdd the two equations:\n2g = 90\ng = 45\n\nVerification: b = 83 − 45 = 38, and 45 − 38 = 7 ✓',
  },

  // ─── q21 — Problem-Solving and Data Analysis — grid_in hard ───────────────
  {
    id: 'sat-f8-v2-math-m2h-q21',
    section: 'math',
    moduleId: 'f8v2-math-module-2-hard',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Probability',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'A bag contains 4 white marbles, 4 black marbles, and 8 gray marbles. One marble is drawn at random. What is the probability that the marble drawn is white?',
    correctAnswer: '0.25',
    acceptableAnswers: ['0.25', '1/4'],
    explanation:
      'The total number of marbles is 4 + 4 + 8 = 16.\nThe number of white marbles is 4.\n\nP(white) = 4/16 = 1/4 = 0.25',
    scoringNotes: 'Accept 1/4 or 0.25. Both are equivalent and gridable.',
  },

  // ─── q22 — Geometry and Trigonometry — grid_in hard ───────────────────────
  {
    id: 'sat-f8-v2-math-m2h-q22',
    section: 'math',
    moduleId: 'f8v2-math-module-2-hard',
    domain: 'Geometry and Trigonometry',
    skill: 'Circles',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'A circle has a radius of 18. A central angle of the circle measures 4 radians. What is the length of the arc subtended by this central angle?',
    correctAnswer: '72',
    acceptableAnswers: ['72'],
    explanation:
      'The arc length formula is:\ns = r × θ\nwhere r is the radius and θ is the central angle in radians.\n\ns = 18 × 4 = 72\n\nNote: 4 radians is a valid angle for an arc since 4 < 2π ≈ 6.28, so the arc is less than a full circle.',
  },
]
