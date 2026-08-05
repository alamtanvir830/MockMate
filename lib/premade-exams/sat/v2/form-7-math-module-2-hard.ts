import type { MathMCQuestion, MathGridInQuestion } from '../types'
type MathQuestion = MathMCQuestion | MathGridInQuestion

export const f7MathModule2HardQuestionsV2: MathQuestion[] = [
  // ─── q01 — Algebra — medium ───────────────────────────────────────────────
  {
    id: 'sat-f7-v2-math-m2h-q01',
    section: 'math',
    moduleId: 'f7v2-math-module-2-hard',
    domain: 'Algebra',
    skill: 'Systems of two linear equations in two variables',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'The system of equations below is satisfied by the ordered pair (x, y).\n\n3x + 2y = 16\nx − y = 2\n\nWhat is the value of x + y?',
    choices: [
      { label: 'A', text: '2' },
      { label: 'B', text: '4' },
      { label: 'C', text: '6' },
      { label: 'D', text: '8' },
    ],
    correctAnswer: 'C',
    explanation:
      'From x − y = 2, we get x = y + 2. Substituting into 3x + 2y = 16:\n3(y + 2) + 2y = 16\n3y + 6 + 2y = 16\n5y = 10\ny = 2\n\nThen x = 2 + 2 = 4. Therefore x + y = 4 + 2 = 6.',
    wrongAnswerExplanations: {
      A: 'This is the value of y alone, not x + y.',
      B: 'This is the value of x alone, not x + y.',
      D: 'A common error is adding 3x + 2y = 16 incorrectly. x + y = 6, not 8.',
    },
  },

  // ─── q02 — Algebra — medium ───────────────────────────────────────────────
  {
    id: 'sat-f7-v2-math-m2h-q02',
    section: 'math',
    moduleId: 'f7v2-math-module-2-hard',
    domain: 'Algebra',
    skill: 'Linear functions',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'A line in the xy-plane passes through the points (1, 5) and (3, 11). What is the y-intercept of this line?',
    choices: [
      { label: 'A', text: '2' },
      { label: 'B', text: '3' },
      { label: 'C', text: '5' },
      { label: 'D', text: '8' },
    ],
    correctAnswer: 'A',
    explanation:
      'Slope = (11 − 5) / (3 − 1) = 6 / 2 = 3.\n\nUsing point-slope form with (1, 5):\ny − 5 = 3(x − 1)\ny = 3x − 3 + 5\ny = 3x + 2\n\nThe y-intercept is 2.',
    wrongAnswerExplanations: {
      B: 'This is the slope of the line, not the y-intercept.',
      C: 'This is the y-coordinate of the point (1, 5), not the y-intercept.',
      D: 'This results from incorrectly computing slope as (11 − 3) / (5 − 1) = 2, then misapplying point-slope form.',
    },
  },

  // ─── q03 — Advanced Math — medium-hard ────────────────────────────────────
  {
    id: 'sat-f7-v2-math-m2h-q03',
    section: 'math',
    moduleId: 'f7v2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'The function f is defined by f(x) = x² − 6x + 5. What is the minimum value of f(x)?',
    choices: [
      { label: 'A', text: '−9' },
      { label: 'B', text: '−5' },
      { label: 'C', text: '−1' },
      { label: 'D', text: '−4' },
    ],
    correctAnswer: 'D',
    explanation:
      'Complete the square: f(x) = (x² − 6x + 9) − 9 + 5 = (x − 3)² − 4.\n\nThe vertex is at (3, −4), and since the parabola opens upward, the minimum value is −4.',
    wrongAnswerExplanations: {
      A: 'This results from computing f(0) = 5 and confusing it with −9, or from completing the square incorrectly.',
      B: 'This is the constant term of the original expression, not the minimum value.',
      C: 'This may come from computing the discriminant divided by 4 incorrectly.',
    },
  },

  // ─── q04 — Advanced Math — medium-hard ────────────────────────────────────
  {
    id: 'sat-f7-v2-math-m2h-q04',
    section: 'math',
    moduleId: 'f7v2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Equivalent expressions',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'Which of the following is equivalent to (2x² − 3x + 1) / (x − 1) for all x ≠ 1?',
    choices: [
      { label: 'A', text: 'x − 1' },
      { label: 'B', text: '2x − 1' },
      { label: 'C', text: '2x + 1' },
      { label: 'D', text: 'x + 1' },
    ],
    correctAnswer: 'B',
    explanation:
      'Factor the numerator: 2x² − 3x + 1 = (2x − 1)(x − 1).\n\nTherefore:\n(2x² − 3x + 1) / (x − 1) = (2x − 1)(x − 1) / (x − 1) = 2x − 1, for x ≠ 1.',
    wrongAnswerExplanations: {
      A: 'This would be the result if the numerator were (x − 1)², which it is not.',
      C: 'A sign error when factoring the middle term −3x leads to 2x + 1 instead of 2x − 1.',
      D: 'This ignores the leading coefficient of 2 and incorrectly factors the quadratic.',
    },
  },

  // ─── q05 — Problem-Solving and Data Analysis — medium-hard ────────────────
  {
    id: 'sat-f7-v2-math-m2h-q05',
    section: 'math',
    moduleId: 'f7v2-math-module-2-hard',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Probability',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'A bag contains 4 red marbles, 6 blue marbles, and 5 green marbles. If one marble is selected at random, what is the probability that it is NOT blue?',
    choices: [
      { label: 'A', text: '2/5' },
      { label: 'B', text: '7/15' },
      { label: 'C', text: '3/5' },
      { label: 'D', text: '7/10' },
    ],
    correctAnswer: 'C',
    explanation:
      'Total marbles = 4 + 6 + 5 = 15.\nNon-blue marbles = 4 + 5 = 9.\nP(not blue) = 9/15 = 3/5.',
    wrongAnswerExplanations: {
      A: 'This is the probability of drawing a red marble (4/15 reduced incorrectly), not P(not blue).',
      B: 'This may come from computing 7/15, perhaps from confusing 4 + 3 = 7 as the non-blue count.',
      D: 'This equals 10.5/15, which is not a valid marble count — likely a calculation error.',
    },
  },

  // ─── q06 — Advanced Math — medium-hard ────────────────────────────────────
  {
    id: 'sat-f7-v2-math-m2h-q06',
    section: 'math',
    moduleId: 'f7v2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Exponential functions',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'A colony of bacteria starts with 8 cells at time t = 0 and doubles in size every 3 hours. How many cells are in the colony after 9 hours?',
    choices: [
      { label: 'A', text: '64' },
      { label: 'B', text: '48' },
      { label: 'C', text: '32' },
      { label: 'D', text: '128' },
    ],
    correctAnswer: 'A',
    explanation:
      'The population model is P(t) = 8 · 2^(t/3), where t is in hours.\n\nAt t = 9:\nP(9) = 8 · 2^(9/3) = 8 · 2³ = 8 · 8 = 64.',
    wrongAnswerExplanations: {
      B: 'This results from multiplying 8 by 3 doublings linearly (8 × 6) instead of using exponential growth.',
      C: 'This is 8 · 2² = 32, which would be correct after 6 hours, not 9.',
      D: 'This is 8 · 2⁴ = 128, which would be correct after 12 hours, not 9.',
    },
  },

  // ─── q07 — Algebra — medium-hard ──────────────────────────────────────────
  {
    id: 'sat-f7-v2-math-m2h-q07',
    section: 'math',
    moduleId: 'f7v2-math-module-2-hard',
    domain: 'Algebra',
    skill: 'Linear inequalities in two variables',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'Which ordered pair (x, y) satisfies both inequalities below?\n\ny > 2x − 1\ny < −x + 5',
    choices: [
      { label: 'A', text: '(3, 1)' },
      { label: 'B', text: '(0, −2)' },
      { label: 'C', text: '(2, 4)' },
      { label: 'D', text: '(1, 3)' },
    ],
    correctAnswer: 'D',
    explanation:
      'Test (1, 3):\n• y > 2x − 1: 3 > 2(1) − 1 = 1 ✓\n• y < −x + 5: 3 < −1 + 5 = 4 ✓\n\nBoth inequalities are satisfied.\n\nChecking the others:\n• (3, 1): 1 > 5? No.\n• (0, −2): −2 > −1? No.\n• (2, 4): 4 < 3? No.',
    wrongAnswerExplanations: {
      A: '(3, 1): fails y > 2x − 1 since 1 > 5 is false.',
      B: '(0, −2): fails y > 2x − 1 since −2 > −1 is false.',
      C: '(2, 4): fails y < −x + 5 since 4 < 3 is false.',
    },
  },

  // ─── q08 — Advanced Math — medium-hard ────────────────────────────────────
  {
    id: 'sat-f7-v2-math-m2h-q08',
    section: 'math',
    moduleId: 'f7v2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Systems of equations (nonlinear)',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'The system of equations below has two solutions, (x₁, y₁) and (x₂, y₂).\n\ny = x² − 4\ny = 2x − 1\n\nWhat is the sum x₁ + x₂?',
    choices: [
      { label: 'A', text: '−2' },
      { label: 'B', text: '2' },
      { label: 'C', text: '4' },
      { label: 'D', text: '6' },
    ],
    correctAnswer: 'B',
    explanation:
      'Set the expressions equal:\nx² − 4 = 2x − 1\nx² − 2x − 3 = 0\n(x − 3)(x + 1) = 0\nx = 3 or x = −1\n\nSum of x-values: 3 + (−1) = 2.\n\nAlternatively, by Vieta\'s formulas for x² − 2x − 3 = 0, the sum of roots equals −(−2)/1 = 2.',
    wrongAnswerExplanations: {
      A: 'This is the negative of the correct sum — a sign error when applying Vieta\'s formulas.',
      C: 'This is the product of the roots (from the constant term), not their sum.',
      D: 'This would be the sum if both roots were positive; confusing product and sum leads here.',
    },
  },

  // ─── q09 — Advanced Math — medium-hard ────────────────────────────────────
  {
    id: 'sat-f7-v2-math-m2h-q09',
    section: 'math',
    moduleId: 'f7v2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'The polynomial function p is defined by p(x) = x³ − 3x² − x + 3. What is the product of all real zeros of p?',
    choices: [
      { label: 'A', text: '−9' },
      { label: 'B', text: '−1' },
      { label: 'C', text: '−3' },
      { label: 'D', text: '3' },
    ],
    correctAnswer: 'C',
    explanation:
      'Factor by grouping:\np(x) = x²(x − 3) − 1(x − 3) = (x² − 1)(x − 3) = (x − 1)(x + 1)(x − 3)\n\nThe real zeros are x = 1, x = −1, and x = 3.\n\nProduct = (1)(−1)(3) = −3.',
    wrongAnswerExplanations: {
      A: 'This may result from computing (−1)(3)(3) = −9, incorrectly listing 3 as a double root.',
      B: 'This is the product of only x = 1 and x = −1, ignoring the third zero x = 3.',
      D: 'This is the value of one zero (x = 3) alone, or the product of absolute values without sign.',
    },
  },

  // ─── q10 — Problem-Solving and Data Analysis — hard ───────────────────────
  {
    id: 'sat-f7-v2-math-m2h-q10',
    section: 'math',
    moduleId: 'f7v2-math-module-2-hard',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Two-variable data: models and scatterplots',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'A researcher models the relationship between study hours (x) and exam score (y) with the regression equation ŷ = 2.5x + 10. One student studied 8 hours and scored 35 points. What is the residual for that student\'s score?',
    choices: [
      { label: 'A', text: '5' },
      { label: 'B', text: '−5' },
      { label: 'C', text: '30' },
      { label: 'D', text: '2.5' },
    ],
    correctAnswer: 'A',
    explanation:
      'Predicted value: ŷ = 2.5(8) + 10 = 20 + 10 = 30.\n\nResidual = Actual − Predicted = 35 − 30 = 5.\n\nA positive residual means the student scored higher than the model predicted.',
    wrongAnswerExplanations: {
      B: 'This reverses the residual formula: Predicted − Actual = 30 − 35 = −5. The correct formula is Actual − Predicted.',
      C: 'This is the predicted value itself, not the residual.',
      D: 'This is the slope of the regression line, not the residual.',
    },
  },

  // ─── q11 — Advanced Math — hard ───────────────────────────────────────────
  {
    id: 'sat-f7-v2-math-m2h-q11',
    section: 'math',
    moduleId: 'f7v2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Quadratic equations and functions',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'The quadratic function f is defined by f(x) = 2x² + bx + c. The function has roots at x = 1 and x = 4. What is f(3)?',
    choices: [
      { label: 'A', text: '−8' },
      { label: 'B', text: '8' },
      { label: 'C', text: '4' },
      { label: 'D', text: '−4' },
    ],
    correctAnswer: 'D',
    explanation:
      'Since f has roots x = 1 and x = 4 and leading coefficient 2:\nf(x) = 2(x − 1)(x − 4)\n\nf(3) = 2(3 − 1)(3 − 4) = 2(2)(−1) = −4.\n\nAlternatively, expand: f(x) = 2(x² − 5x + 4) = 2x² − 10x + 8.\nf(3) = 2(9) − 10(3) + 8 = 18 − 30 + 8 = −4.',
    wrongAnswerExplanations: {
      A: 'This results from computing 2(2)(−2) = −8, using (3 − 4) = −2 incorrectly instead of −1.',
      B: 'This is |f(3)| — the correct magnitude but wrong sign.',
      C: 'This may result from evaluating f(x) = (x − 1)(x − 4) without the leading coefficient 2.',
    },
  },

  // ─── q12 — Geometry and Trigonometry — hard ───────────────────────────────
  {
    id: 'sat-f7-v2-math-m2h-q12',
    section: 'math',
    moduleId: 'f7v2-math-module-2-hard',
    domain: 'Geometry and Trigonometry',
    skill: 'Area and volume',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'A solid cylinder has a radius of 3 and a height of 8. A cone with the same base radius and the same height is removed from the center of the cylinder. What is the volume of the remaining solid?',
    choices: [
      { label: 'A', text: '24π' },
      { label: 'B', text: '48π' },
      { label: 'C', text: '72π' },
      { label: 'D', text: '96π' },
    ],
    correctAnswer: 'B',
    explanation:
      'Volume of cylinder = πr²h = π(3²)(8) = 72π.\nVolume of cone = (1/3)πr²h = (1/3)π(9)(8) = 24π.\n\nRemaining volume = 72π − 24π = 48π.',
    wrongAnswerExplanations: {
      A: 'This equals only the volume of the removed cone (24π), not the remaining solid.',
      C: 'This is the cylinder volume before the cone is removed.',
      D: 'This would be the cylinder volume with a different radius or height — the cone subtraction was skipped.',
    },
  },

  // ─── q13 — Advanced Math — hard ───────────────────────────────────────────
  {
    id: 'sat-f7-v2-math-m2h-q13',
    section: 'math',
    moduleId: 'f7v2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Equivalent expressions',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'If x + 1/x = 5, what is the value of x² + 1/x²?',
    choices: [
      { label: 'A', text: '25' },
      { label: 'B', text: '21' },
      { label: 'C', text: '23' },
      { label: 'D', text: '27' },
    ],
    correctAnswer: 'C',
    explanation:
      'Square both sides of x + 1/x = 5:\n(x + 1/x)² = 25\nx² + 2(x · 1/x) + 1/x² = 25\nx² + 2 + 1/x² = 25\nx² + 1/x² = 23.',
    wrongAnswerExplanations: {
      A: 'This is (x + 1/x)² = 25 before subtracting the middle term of 2.',
      B: 'Off by 2 in the wrong direction — perhaps subtracting 4 instead of 2.',
      D: 'This adds 2 instead of subtracting it: 25 + 2 = 27.',
    },
  },

  // ─── q14 — Problem-Solving and Data Analysis — hard ───────────────────────
  {
    id: 'sat-f7-v2-math-m2h-q14',
    section: 'math',
    moduleId: 'f7v2-math-module-2-hard',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Statistical inference',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'A random sample of 200 students at a school found that 60% prefer a four-day school week. A 95% confidence interval for the true proportion has a margin of error of 7 percentage points. Which of the following best describes what this interval means?',
    choices: [
      { label: 'A', text: 'The true proportion of all students who prefer a four-day week is likely between 53% and 67%.' },
      { label: 'B', text: 'Exactly 60% of all students at the school prefer a four-day week.' },
      { label: 'C', text: 'There is a 7% chance the true proportion falls outside the interval.' },
      { label: 'D', text: 'The study should be repeated because the margin of error is too large.' },
    ],
    correctAnswer: 'A',
    explanation:
      'A 95% confidence interval is computed as:\nSample proportion ± margin of error = 60% ± 7% = (53%, 67%).\n\nThis means we are 95% confident the true population proportion lies between 53% and 67%. The interval does not say the true value is exactly 60%, nor does it assign a 7% probability to being outside the interval.',
    wrongAnswerExplanations: {
      B: 'A confidence interval describes a range of plausible values, not a single exact value for the population.',
      C: 'The margin of error is not a probability that the interval is wrong; a 95% CI means 5% chance of not capturing the true value.',
      D: 'There is no absolute threshold that makes a margin of error "too large"; this is a judgment call depending on context, and nothing here indicates the study is invalid.',
    },
  },

  // ─── q15 — Advanced Math — hard ───────────────────────────────────────────
  {
    id: 'sat-f7-v2-math-m2h-q15',
    section: 'math',
    moduleId: 'f7v2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Quadratic equations and functions',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'The equation x² + kx + 9 = 0 has exactly one real solution. What is the sum of all possible values of k?',
    choices: [
      { label: 'A', text: '−6' },
      { label: 'B', text: '6' },
      { label: 'C', text: '12' },
      { label: 'D', text: '0' },
    ],
    correctAnswer: 'D',
    explanation:
      'For exactly one real solution, the discriminant must equal zero:\nb² − 4ac = 0\nk² − 4(1)(9) = 0\nk² = 36\nk = 6 or k = −6\n\nSum of all possible values = 6 + (−6) = 0.',
    wrongAnswerExplanations: {
      A: 'This is one of the two values of k (k = −6), not their sum.',
      B: 'This is the other value of k (k = 6), not their sum.',
      C: 'This is the sum of the absolute values, not the sum of the signed values.',
    },
  },

  // ─── q16 — Geometry and Trigonometry — hard ───────────────────────────────
  {
    id: 'sat-f7-v2-math-m2h-q16',
    section: 'math',
    moduleId: 'f7v2-math-module-2-hard',
    domain: 'Geometry and Trigonometry',
    skill: 'Circles and arc length',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'A circle has a radius of 10. A central angle of 120° is formed by two radii. What is the length of the arc intercepted by this angle?',
    choices: [
      { label: 'A', text: '10π/3' },
      { label: 'B', text: '20π/3' },
      { label: 'C', text: '40π/3' },
      { label: 'D', text: '10π' },
    ],
    correctAnswer: 'B',
    explanation:
      'Arc length = (central angle / 360°) × 2πr\n= (120/360) × 2π(10)\n= (1/3) × 20π\n= 20π/3.',
    wrongAnswerExplanations: {
      A: 'This is (1/3)πr = 10π/3, using only πr instead of the full circumference 2πr.',
      C: 'This uses (240/360) × 2π(10), computing the arc for the reflex angle instead of the 120° angle.',
      D: 'This equals πr, which is only half the circumference — using 180° instead of 120°.',
    },
  },

  // ─── q17 — Algebra — grid_in — hard ───────────────────────────────────────
  {
    id: 'sat-f7-v2-math-m2h-q17',
    section: 'math',
    moduleId: 'f7v2-math-module-2-hard',
    domain: 'Algebra',
    skill: 'Linear equations in one variable',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'What is the value of x that satisfies the equation 5x − 3 = 2x + 30?',
    correctAnswer: '11',
    acceptableAnswers: ['11'],
    explanation:
      '5x − 3 = 2x + 30\n5x − 2x = 30 + 3\n3x = 33\nx = 11\n\nVerification: 5(11) − 3 = 55 − 3 = 52; 2(11) + 30 = 22 + 30 = 52. ✓',
  },

  // ─── q18 — Problem-Solving and Data Analysis — grid_in — hard ─────────────
  {
    id: 'sat-f7-v2-math-m2h-q18',
    section: 'math',
    moduleId: 'f7v2-math-module-2-hard',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Exponential growth and decay',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'A culture of cells starts with 8 cells at time t = 0. The number of cells doubles every 3 hours. How many cells are in the culture after 9 hours?',
    correctAnswer: '64',
    acceptableAnswers: ['64'],
    explanation:
      'Number of cells = 8 × 2^(t/3), where t is measured in hours.\n\nAt t = 9:\nCells = 8 × 2^(9/3) = 8 × 2³ = 8 × 8 = 64.\n\nVerification: t = 0 → 8, t = 3 → 16, t = 6 → 32, t = 9 → 64. ✓',
  },

  // ─── q19 — Advanced Math — grid_in — hard ─────────────────────────────────
  {
    id: 'sat-f7-v2-math-m2h-q19',
    section: 'math',
    moduleId: 'f7v2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'The polynomial p(x) = x³ − 7x² + 14x − 8 has roots that are all positive integers. How many positive integer roots does p have?',
    correctAnswer: '3',
    acceptableAnswers: ['3'],
    explanation:
      'Test positive integer candidates using the Rational Root Theorem (factors of 8: 1, 2, 4, 8):\n\np(1) = 1 − 7 + 14 − 8 = 0 ✓\np(2) = 8 − 28 + 28 − 8 = 0 ✓\np(4) = 64 − 112 + 56 − 8 = 0 ✓\n\nSo p(x) = (x − 1)(x − 2)(x − 4), which has 3 distinct positive integer roots.',
  },

  // ─── q20 — Algebra / Geometry — grid_in — hard ────────────────────────────
  {
    id: 'sat-f7-v2-math-m2h-q20',
    section: 'math',
    moduleId: 'f7v2-math-module-2-hard',
    domain: 'Algebra',
    skill: 'Linear equations in one variable',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'A right triangle has legs of length 10 and 24. What is the area of this triangle?',
    correctAnswer: '120',
    acceptableAnswers: ['120'],
    explanation:
      'Area of a right triangle = (1/2) × leg₁ × leg₂\n= (1/2)(10)(24)\n= (1/2)(240)\n= 120.\n\nNote: The hypotenuse is √(10² + 24²) = √(100 + 576) = √676 = 26, confirming this is a valid right triangle (a 5-12-13 triangle scaled by 2).',
  },

  // ─── q21 — Problem-Solving and Data Analysis — grid_in — hard ─────────────
  {
    id: 'sat-f7-v2-math-m2h-q21',
    section: 'math',
    moduleId: 'f7v2-math-module-2-hard',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Probability',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'A bowl contains 4 red chips and 2 blue chips. If one chip is selected at random, what is the probability that it is red? Enter your answer as a decimal rounded to the nearest thousandth.',
    correctAnswer: '0.667',
    acceptableAnswers: ['0.667', '2/3'],
    explanation:
      'P(red) = number of red chips / total chips = 4 / 6 = 2/3 ≈ 0.6666...\n\nRounded to the nearest thousandth: 0.667.',
  },

  // ─── q22 — Geometry and Trigonometry — grid_in — hard ─────────────────────
  {
    id: 'sat-f7-v2-math-m2h-q22',
    section: 'math',
    moduleId: 'f7v2-math-module-2-hard',
    domain: 'Geometry and Trigonometry',
    skill: 'Area and volume',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'A trapezoid has parallel sides of length 6 and 10, and a height of 6. What is the area of the trapezoid?',
    correctAnswer: '48',
    acceptableAnswers: ['48'],
    explanation:
      'Area of a trapezoid = (1/2)(b₁ + b₂)(h)\n= (1/2)(6 + 10)(6)\n= (1/2)(16)(6)\n= (1/2)(96)\n= 48.',
  },
]
