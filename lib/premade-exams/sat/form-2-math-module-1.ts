import type { MathQuestion } from './types'

export const f2MathModule1Questions: MathQuestion[] = [
  // ── EASY (1) ──────────────────────────────────────────────────────────────

  {
    id: 'sat2-math-m1-e01',
    section: 'math',
    moduleId: 'f2-math-module-1',
    domain: 'Algebra',
    skill: 'Linear functions',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'A function f is defined by f(x) = 5x − 3. If f(a) = 22, what is f(a + 2)?',
    choices: [
      { label: 'A', text: '27' },
      { label: 'B', text: '32' },
      { label: 'C', text: '24' },
      { label: 'D', text: '29' },
    ],
    correctAnswer: 'B',
    explanation:
      'f(a) = 22, and f is linear with slope 5. Increasing the input by 2 increases the output by 5 × 2 = 10. Therefore f(a + 2) = 22 + 10 = 32.',
    wrongAnswerExplanations: {
      A: '27 = 22 + 5 only accounts for one unit of input increase; the input increases by 2, so the output increases by 5 × 2 = 10.',
      C: '24 = 22 + 2 adds the input change directly to the output; the slope of 5 must be applied.',
      D: '29 = 22 + 7 does not follow from slope 5 and an input change of 2.',
    },
  },

  // ── MEDIUM (11) ─────────────────────────────────────────────────────────

  {
    id: 'sat2-math-m1-m01',
    section: 'math',
    moduleId: 'f2-math-module-1',
    domain: 'Algebra',
    skill: 'Linear equations in one variable',
    difficulty: 'medium',
    type: 'multiple_choice',
    question: 'The equation (5/3)x − 2 = (2/3)x + 6 is satisfied by x = p. What is the value of 3p − 4?',
    choices: [
      { label: 'A', text: '20' },
      { label: 'B', text: '16' },
      { label: 'C', text: '8' },
      { label: 'D', text: '14' },
    ],
    correctAnswer: 'A',
    explanation:
      'Subtract (2/3)x from both sides: (5/3 − 2/3)x − 2 = 6, so (3/3)x = x and x − 2 = 6, giving x = 8. Therefore p = 8 and 3p − 4 = 24 − 4 = 20.',
    wrongAnswerExplanations: {
      B: '16 = 3(6) − 2 mistakenly uses the constant 6 in place of the solved value x = 8.',
      C: '8 is the value of p itself, not 3p − 4.',
      D: '14 = 3(6) − 4 substitutes 6 instead of 8 into the expression.',
    },
  },

  {
    id: 'sat2-math-m1-m02',
    section: 'math',
    moduleId: 'f2-math-module-1',
    domain: 'Algebra',
    skill: 'Systems of two linear equations in two variables',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'The system below has solution (x, y). What is the value of x − y?\n\n3x − 2y = 13\n2x + y = 11',
    choices: [
      { label: 'A', text: '2' },
      { label: 'B', text: '4' },
      { label: 'C', text: '6' },
      { label: 'D', text: '8' },
    ],
    correctAnswer: 'B',
    explanation:
      'From the second equation: y = 11 − 2x. Substitute into the first: 3x − 2(11 − 2x) = 13 → 3x − 22 + 4x = 13 → 7x = 35 → x = 5. Then y = 11 − 10 = 1. Therefore x − y = 5 − 1 = 4.',
    wrongAnswerExplanations: {
      A: 'x − y = 2 would require x = 3, y = 1, but 2(3) + 1 = 7 ≠ 11.',
      C: 'x − y = 6 would require x = 7, y = 1, but 2(7) + 1 = 15 ≠ 11.',
      D: 'x − y = 8 would require x = 9, y = 1, but 2(9) + 1 = 19 ≠ 11.',
    },
  },

  {
    id: 'sat2-math-m1-m03',
    section: 'math',
    moduleId: 'f2-math-module-1',
    domain: 'Algebra',
    skill: 'Linear equations in two variables',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'A freight company charges a flat fee of $40 per shipment plus $0.18 per pound. A competing company charges $16 per shipment plus $0.30 per pound. For what shipment weight, in pounds, is the total charge the same for both companies?',
    choices: [
      { label: 'A', text: '150' },
      { label: 'B', text: '175' },
      { label: 'C', text: '200' },
      { label: 'D', text: '225' },
    ],
    correctAnswer: 'C',
    explanation:
      'Set the two costs equal: 40 + 0.18w = 16 + 0.30w. Subtract 0.18w and 16 from both sides: 24 = 0.12w. Divide: w = 24 ÷ 0.12 = 200 pounds.',
    wrongAnswerExplanations: {
      A: 'At 150 lb: Company 1 costs $67.00; Company 2 costs $61.00. Not equal.',
      B: 'At 175 lb: Company 1 costs $71.50; Company 2 costs $68.50. Not equal.',
      D: 'At 225 lb: Company 1 costs $80.50; Company 2 costs $83.50. Not equal.',
    },
  },

  {
    id: 'sat2-math-m1-m04',
    section: 'math',
    moduleId: 'f2-math-module-1',
    domain: 'Algebra',
    skill: 'Linear inequalities in one or two variables',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'Which of the following describes all values of x that satisfy −5 < 3 − 2x ≤ 7?',
    choices: [
      { label: 'A', text: '−2 ≤ x < 4' },
      { label: 'B', text: '−2 < x ≤ 4' },
      { label: 'C', text: 'x < −2 or x ≥ 4' },
      { label: 'D', text: '−4 ≤ x < 2' },
    ],
    correctAnswer: 'A',
    explanation:
      'Subtract 3 throughout: −8 < −2x ≤ 4. Divide by −2 and reverse both inequality signs: 4 > x ≥ −2. Written in standard order: −2 ≤ x < 4.',
    wrongAnswerExplanations: {
      B: 'The strict and non-strict signs are switched. The left inequality −5 < 3 − 2x becomes (after solving) x < 4 (strict), and the right inequality 3 − 2x ≤ 7 becomes x ≥ −2 (non-strict).',
      C: 'This is a union of two intervals, which comes from solving an absolute-value inequality, not a compound inequality of this form.',
      D: 'These bounds result from dividing by −2 without reversing the inequalities.',
    },
  },

  {
    id: 'sat2-math-m1-m05',
    section: 'math',
    moduleId: 'f2-math-module-1',
    domain: 'Algebra',
    skill: 'Linear functions',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'Line ℓ has equation 4x − 3y = 24. Line m is parallel to ℓ and passes through the point (6, 2). What is the y-intercept of line m?',
    choices: [
      { label: 'A', text: '−6' },
      { label: 'B', text: '−8' },
      { label: 'C', text: '6' },
      { label: 'D', text: '8' },
    ],
    correctAnswer: 'A',
    explanation:
      'Rewrite ℓ in slope-intercept form: y = (4/3)x − 8. Slope = 4/3. Line m has the same slope and passes through (6, 2): y − 2 = (4/3)(x − 6) → y = (4/3)x − 8 + 2 = (4/3)x − 6. The y-intercept is −6.',
    wrongAnswerExplanations: {
      B: '−8 is the y-intercept of ℓ, not m. Line m passes through a different point, shifting the intercept from −8 to −6.',
      C: '6 is the x-coordinate of the given point, not the y-intercept.',
      D: '8 is the magnitude of ℓ\'s y-intercept with the wrong sign.',
    },
  },

  {
    id: 'sat2-math-m1-m06',
    section: 'math',
    moduleId: 'f2-math-module-1',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Ratios, rates, proportional relationships, and units',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'The volume V (gallons) of water in a tank at time t (minutes) follows the linear model V = rt + s. At t = 4, V = 30; at t = 10, V = 60. What is the value of s?',
    choices: [
      { label: 'A', text: '5' },
      { label: 'B', text: '10' },
      { label: 'C', text: '15' },
      { label: 'D', text: '20' },
    ],
    correctAnswer: 'B',
    explanation:
      'Two equations: 4r + s = 30 and 10r + s = 60. Subtract the first from the second: 6r = 30, so r = 5. Substitute back: 4(5) + s = 30 → s = 10.',
    wrongAnswerExplanations: {
      A: 's = 5 gives V(4) = 5(4) + 5 = 25 ≠ 30.',
      C: 's = 15 gives r = (30 − 15)/4 = 3.75; then V(10) = 37.5 + 15 = 52.5 ≠ 60.',
      D: 's = 20 gives r = (30 − 20)/4 = 2.5; then V(10) = 25 + 20 = 45 ≠ 60.',
    },
  },

  {
    id: 'sat2-math-m1-m07',
    section: 'math',
    moduleId: 'f2-math-module-1',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Percentages',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'Course enrollment increased 25% from 2021 to 2022, then decreased 20% from 2022 to 2023. The 2023 enrollment is what percent of the 2021 enrollment?',
    choices: [
      { label: 'A', text: '95%' },
      { label: 'B', text: '100%' },
      { label: 'C', text: '105%' },
      { label: 'D', text: '108%' },
    ],
    correctAnswer: 'B',
    explanation:
      'Let 2021 enrollment = 100. After 25% increase: 125. After 20% decrease: 125 × 0.80 = 100. The 2023 enrollment equals 100% of the 2021 enrollment.',
    wrongAnswerExplanations: {
      A: '95% would result from a net 5% decrease, but the calculations give exactly 100%.',
      C: '105% comes from incorrectly adding and subtracting the percentages (25 − 20 = 5) instead of applying them multiplicatively.',
      D: '108% significantly overstates the result.',
    },
  },

  {
    id: 'sat2-math-m1-m08',
    section: 'math',
    moduleId: 'f2-math-module-1',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Two-variable data: models and scatterplots',
    difficulty: 'medium',
    type: 'multiple_choice',
    graphData: {
      type: 'scatter',
      xLabel: 'Hours of Practice per Week',
      yLabel: 'Score (out of 100)',
      title: 'Practice Hours vs. Assessment Score',
      xMin: 0,
      xMax: 12,
      yMin: 40,
      yMax: 100,
      points: [
        [1, 48], [2, 52], [3, 58], [4, 63], [5, 67],
        [6, 70], [7, 74], [8, 77], [9, 80], [10, 83], [11, 86],
      ],
      trendLine: { slope: 4, intercept: 44, color: '#4f46e5' },
    },
    question:
      'The scatter plot shows assessment scores for students who practice different numbers of hours per week, along with a line of best fit. A student increases practice from 3 hours to 9 hours per week. According to the line of best fit, by approximately how many points does the predicted score increase?',
    choices: [
      { label: 'A', text: '18' },
      { label: 'B', text: '22' },
      { label: 'C', text: '24' },
      { label: 'D', text: '30' },
    ],
    correctAnswer: 'C',
    explanation:
      'The line of best fit has slope 4 (approximately 4 points per additional hour). The change in hours is 9 − 3 = 6, so the predicted score increase is 4 × 6 = 24 points.',
    wrongAnswerExplanations: {
      A: '18 results from using a slope of 3; the actual slope of the best-fit line is 4.',
      B: '22 is not consistent with a slope of 4 applied over 6 hours.',
      D: '30 uses a slope of 5; the line shown has a slope closer to 4.',
    },
  },

  {
    id: 'sat2-math-m1-m09',
    section: 'math',
    moduleId: 'f2-math-module-1',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'The function p is defined by p(x) = x² + bx − 1. If p(3) = 8, what is the value of 3 · p(−2)?',
    choices: [
      { label: 'A', text: '3' },
      { label: 'B', text: '6' },
      { label: 'C', text: '9' },
      { label: 'D', text: '12' },
    ],
    correctAnswer: 'C',
    explanation:
      'p(3) = 9 + 3b − 1 = 8 → 8 + 3b = 8 → 3b = 0 → b = 0. So p(x) = x² − 1. Then p(−2) = 4 − 1 = 3, and 3 · p(−2) = 9.',
    wrongAnswerExplanations: {
      A: '3 is the value of p(−2) itself, not 3 · p(−2).',
      B: '6 = 2 × p(−2) multiplies by 2 instead of 3.',
      D: '12 would require p(−2) = 4, which would happen if b = −1 and p(−2) = 4 + 2 − 1 = 5 — but b = 0.',
    },
  },

  {
    id: 'sat2-math-m1-m10',
    section: 'math',
    moduleId: 'f2-math-module-1',
    domain: 'Advanced Math',
    skill: 'Exponential functions',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'A culture of bacteria doubles every 3 hours. At time t = 0 there are 500 bacteria. Which of the following represents the number of bacteria at time t hours?',
    choices: [
      { label: 'A', text: '500 · 2^(t/3)' },
      { label: 'B', text: '500 · 3^(t/2)' },
      { label: 'C', text: '500 · 2^(3t)' },
      { label: 'D', text: '500 · (1/2)^(t/3)' },
    ],
    correctAnswer: 'A',
    explanation:
      'The population doubles every 3 hours, so after t hours it has completed t/3 full doubling periods. The number of bacteria is 500 · 2^(t/3). Verification: at t = 3, the count is 500 · 2^1 = 1,000 — doubled once ✓.',
    wrongAnswerExplanations: {
      B: '500 · 3^(t/2) triples every 2 hours, which is neither the correct base (2) nor the correct period (3 hours).',
      C: '500 · 2^(3t) grows far too fast — at t = 1 it gives 500 · 8 = 4,000 instead of the expected 500 · 2^(1/3) ≈ 630.',
      D: '500 · (1/2)^(t/3) describes exponential decay (halving every 3 hours), the opposite of doubling.',
    },
  },

  {
    id: 'sat2-math-m1-m11',
    section: 'math',
    moduleId: 'f2-math-module-1',
    domain: 'Advanced Math',
    skill: 'Equivalent expressions',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'Which of the following is equivalent to (2x³ − 5x² + x) / x for x ≠ 0?',
    choices: [
      { label: 'A', text: '2x³ − 5x²' },
      { label: 'B', text: '2x² − 5x + 1' },
      { label: 'C', text: '2x² − 5x' },
      { label: 'D', text: '2x³ − 5x² + 1' },
    ],
    correctAnswer: 'B',
    explanation:
      'Divide each term by x: (2x³)/x − (5x²)/x + x/x = 2x² − 5x + 1.',
    wrongAnswerExplanations: {
      A: '2x³ − 5x² does not divide by x at all — the exponents are unchanged.',
      C: '2x² − 5x forgets to divide the last term (+x) by x; +x divided by x equals +1.',
      D: '2x³ − 5x² + 1 correctly handles only the last term but leaves the first two un-divided.',
    },
  },

  // ── HARD (10) ─────────────────────────────────────────────────────────────

  {
    id: 'sat2-math-m1-h01',
    section: 'math',
    moduleId: 'f2-math-module-1',
    domain: 'Algebra',
    skill: 'Systems of two linear equations in two variables',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'For what value of k does the system below have no solution?\n\n6x − 4y = 10\n3x − ky = 7',
    choices: [
      { label: 'A', text: '1' },
      { label: 'B', text: '2' },
      { label: 'C', text: '3' },
      { label: 'D', text: '4' },
    ],
    correctAnswer: 'B',
    explanation:
      'Divide the first equation by 2: 3x − 2y = 5. The second equation is 3x − ky = 7. For no solution the lines must be parallel: equal slopes but different y-intercepts. The slope of 3x − 2y = 5 is 3/2, and the slope of 3x − ky = 7 is 3/k. Setting 3/k = 3/2 gives k = 2. Check: with k = 2, the equations become 3x − 2y = 5 and 3x − 2y = 7, which are parallel and distinct — no solution ✓.\n\nDesmos method: Enter y = (6x − 10)/4 and y = (3x − 7)/k using a slider for k. Increase k from 1. At k = 2 the two lines become parallel — they appear side by side with no intersection point, confirming the system has no solution.',
    wrongAnswerExplanations: {
      A: 'k = 1 gives slopes 3/2 and 3/1 = 3 — the lines intersect at one point.',
      C: 'k = 3 gives slopes 3/2 and 1 — the lines intersect at one point.',
      D: 'k = 4 gives slopes 3/2 and 3/4 — the lines intersect at one point.',
    },
  },

  {
    id: 'sat2-math-m1-h02',
    section: 'math',
    moduleId: 'f2-math-module-1',
    domain: 'Algebra',
    skill: 'Linear equations in two variables',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'The line with equation ax + 3y = 12 has x-intercept 4 and passes through the point (2, b). What is the value of b?',
    correctAnswer: '2',
    acceptableAnswers: ['2'],
    explanation:
      'The x-intercept is 4, meaning the line passes through (4, 0): a(4) + 3(0) = 12 → 4a = 12 → a = 3. The equation is 3x + 3y = 12, or x + y = 4. Substituting (2, b): 2 + b = 4 → b = 2.',
    scoringNotes: 'The answer is 2.',
  },

  {
    id: 'sat2-math-m1-h03',
    section: 'math',
    moduleId: 'f2-math-module-1',
    domain: 'Advanced Math',
    skill: 'Nonlinear equations in one variable and systems of equations',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'The system y = x² − 3x + 2 and y = x − 1 has two solutions. What is the sum of the x-coordinates of these solutions?',
    choices: [
      { label: 'A', text: '2' },
      { label: 'B', text: '3' },
      { label: 'C', text: '4' },
      { label: 'D', text: '5' },
    ],
    correctAnswer: 'C',
    explanation:
      'Set x² − 3x + 2 = x − 1 → x² − 4x + 3 = 0. By Vieta\'s formulas, the sum of the roots equals −(−4)/1 = 4. (The roots are x = 1 and x = 3; their sum is 4.)',
    wrongAnswerExplanations: {
      A: '2 is the product of the two x-values using one incorrect root; the actual roots are 1 and 3 with sum 4.',
      B: '3 is one of the two x-coordinates, not their sum.',
      D: '5 would be the sum if both roots shifted by 1; the correct roots give a sum of 4.',
    },
  },

  {
    id: 'sat2-math-m1-h04',
    section: 'math',
    moduleId: 'f2-math-module-1',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'The function f is defined by f(x) = a(x − 3)² + k. The minimum value of f is −5, and f(5) = 3. What is the value of a?',
    choices: [
      { label: 'A', text: '1' },
      { label: 'B', text: '2' },
      { label: 'C', text: '3' },
      { label: 'D', text: '4' },
    ],
    correctAnswer: 'B',
    explanation:
      'The vertex of f(x) = a(x − 3)² + k is at (3, k). Since a > 0, the minimum value is k = −5. Substituting into f(5) = 3: a(5 − 3)² + (−5) = 3 → 4a − 5 = 3 → 4a = 8 → a = 2.\n\nDesmos method: Enter y = a(x − 3)² − 5 and add a slider for a. Adjust a until the parabola passes through the point (5, 3); the vertex stays fixed at (3, −5). The slider reads a = 2.',
    wrongAnswerExplanations: {
      A: 'a = 1 gives f(5) = 4(1) − 5 = −1 ≠ 3.',
      C: 'a = 3 gives f(5) = 4(3) − 5 = 7 ≠ 3.',
      D: 'a = 4 gives f(5) = 4(4) − 5 = 11 ≠ 3.',
    },
  },

  {
    id: 'sat2-math-m1-h05',
    section: 'math',
    moduleId: 'f2-math-module-1',
    domain: 'Advanced Math',
    skill: 'Nonlinear equations in one variable and systems of equations',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'For what positive value of k does 2x² + kx + 8 = 0 have exactly one real solution?',
    choices: [
      { label: 'A', text: '4' },
      { label: 'B', text: '6' },
      { label: 'C', text: '8' },
      { label: 'D', text: '10' },
    ],
    correctAnswer: 'C',
    explanation:
      'Exactly one real solution requires discriminant = 0: k² − 4(2)(8) = 0 → k² − 64 = 0 → k² = 64 → k = ±8. The positive value is k = 8.\n\nDesmos method: Enter y = 2x² + kx + 8 and add a slider for k. Increase k from 0. When k < 8 the parabola stays above the x-axis (no real solutions); at k = 8 it becomes tangent to the x-axis at exactly one point; for k > 8 it crosses the x-axis twice.',
    wrongAnswerExplanations: {
      A: 'k = 4: discriminant = 16 − 64 = −48 < 0 — no real solutions.',
      B: 'k = 6: discriminant = 36 − 64 = −28 < 0 — no real solutions.',
      D: 'k = 10: discriminant = 100 − 64 = 36 > 0 — two distinct real solutions.',
    },
  },

  {
    id: 'sat2-math-m1-h06',
    section: 'math',
    moduleId: 'f2-math-module-1',
    domain: 'Advanced Math',
    skill: 'Exponential functions',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'An investment account earns interest compounded annually. Its balance triples every 12 years. Which of the following is closest to the annual interest rate?',
    choices: [
      { label: 'A', text: '9.6%' },
      { label: 'B', text: '12.0%' },
      { label: 'C', text: '16.7%' },
      { label: 'D', text: '25.0%' },
    ],
    correctAnswer: 'A',
    explanation:
      'The balance triples every 12 years: (1 + r)^12 = 3. Solving: 1 + r = 3^(1/12). Since 3^(1/12) = e^(ln3/12) ≈ e^(0.0916) ≈ 1.096, the annual rate r ≈ 0.096 ≈ 9.6%.',
    wrongAnswerExplanations: {
      B: '12% annually gives (1.12)^12 ≈ 3.90, which more than triples in 12 years.',
      C: '16.7% per year is the arithmetic rate 200%/12; compound growth uses geometric, not arithmetic, division.',
      D: '25% annually gives (1.25)^12 ≈ 14.6 — far more than tripling.',
    },
  },

  {
    id: 'sat2-math-m1-h07',
    section: 'math',
    moduleId: 'f2-math-module-1',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Probability and conditional probability',
    difficulty: 'hard',
    type: 'multiple_choice',
    graphData: {
      type: 'table',
      title: 'Commute Method and Arrival Status',
      headers: ['', 'On Time', 'Late', 'Total'],
      rows: [
        ['Train', '84', '21', '105'],
        ['Bus', '48', '32', '80'],
        ['Total', '132', '53', '185'],
      ],
    },
    question:
      'The table summarizes commute data for 185 workers. A worker who arrived late is chosen at random. What is the probability that the worker took the train?',
    choices: [
      { label: 'A', text: '21/185' },
      { label: 'B', text: '21/53' },
      { label: 'C', text: '21/105' },
      { label: 'D', text: '53/185' },
    ],
    correctAnswer: 'B',
    explanation:
      'We need P(Train | Late) = (number of train commuters who were late) / (total late commuters) = 21/53.',
    wrongAnswerExplanations: {
      A: '21/185 is the joint probability P(Train and Late) — the probability a randomly chosen worker is both a train commuter and late, not the conditional probability.',
      C: '21/105 is P(Late | Train), which reverses the condition and outcome.',
      D: '53/185 is the overall probability of being late, P(Late), regardless of transit mode.',
    },
  },

  {
    id: 'sat2-math-m1-h08',
    section: 'math',
    moduleId: 'f2-math-module-1',
    domain: 'Geometry and Trigonometry',
    skill: 'Lines, angles, and triangles',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'In triangle ABC, AB = 6 and AC = 10. Point D lies on segment BC such that AD bisects angle A, and BD = 4. What is the length of DC?',
    choices: [
      { label: 'A', text: '5' },
      { label: 'B', text: '20/3' },
      { label: 'C', text: '7' },
      { label: 'D', text: '8' },
    ],
    correctAnswer: 'B',
    explanation:
      'By the Angle Bisector Theorem, BD/DC = AB/AC = 6/10 = 3/5. Since BD = 4: 4/DC = 3/5 → DC = 4 × (5/3) = 20/3.',
    wrongAnswerExplanations: {
      A: '5 would be DC if BD/DC = 4/5, but the correct ratio is 3/5 from the theorem.',
      C: '7 does not follow from the Angle Bisector Theorem; the exact value is 20/3 ≈ 6.67.',
      D: '8 results from inverting the ratio: DC = BD × (AC/AB) should use the correct proportion from the theorem.',
    },
  },

  {
    id: 'sat2-math-m1-h09',
    section: 'math',
    moduleId: 'f2-math-module-1',
    domain: 'Geometry and Trigonometry',
    skill: 'Right triangles and trigonometry',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'In right triangle XYZ, angle Y = 90°. XY = 8 and XZ = 17. What is sin(X) + cos(X)? Express your answer as a fraction.',
    correctAnswer: '23/17',
    acceptableAnswers: ['23/17', '1.352941', '1.35'],
    explanation:
      'Find the missing leg: YZ = √(17² − 8²) = √(289 − 64) = √225 = 15. From angle X: sin(X) = opposite/hypotenuse = YZ/XZ = 15/17; cos(X) = adjacent/hypotenuse = XY/XZ = 8/17. Sum = 15/17 + 8/17 = 23/17.',
    scoringNotes: 'Accept 23/17 or its decimal equivalent 1.35 (rounded to 2 decimal places).',
  },

  {
    id: 'sat2-math-m1-h10',
    section: 'math',
    moduleId: 'f2-math-module-1',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'One-variable data: distributions and measures of center and spread',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'Five distinct positive integers, listed in increasing order, are: 2, a, 7, b, 16. The mean of the five integers is 8. If a < 7 < b < 16, what is one possible value of b?',
    correctAnswer: '11',
    acceptableAnswers: ['9', '10', '11', '12'],
    explanation:
      'Mean = 8 over 5 values → total sum = 40. So 2 + a + 7 + b + 16 = 40 → a + b = 15. For b to satisfy 7 < b < 16 and a = 15 − b to satisfy 2 < a < 7, we need 8 < b < 13. Any integer from 9 to 12 is valid.',
    scoringNotes: 'Accept any integer value from 9 to 12 inclusive.',
  },
]
