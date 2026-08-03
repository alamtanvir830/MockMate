import type { MathQuestion } from './types'

export const f3MathModule2HardQuestions: MathQuestion[] = [
  // ─── Advanced Math × 9 ────────────────────────────────────────────────────

  // Q01 — Advanced Math | Nonlinear system (linear + quadratic) | hard | MC
  {
    id: 'sat-f3-math-m2h-q01',
    section: 'math',
    moduleId: 'f3-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Nonlinear equations in one variable and systems of equations',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'The system of equations below is given:\n\ny = x² − 3x − 4\ny = 2x − 8\n\nWhat is the sum of all x-values at which the two graphs intersect?',
    choices: [
      { label: 'A', text: '1' },
      { label: 'B', text: '3' },
      { label: 'C', text: '5' },
      { label: 'D', text: '7' },
    ],
    correctAnswer: 'C',
    explanation:
      'Set the right-hand sides equal:\nx² − 3x − 4 = 2x − 8\nx² − 5x + 4 = 0\n(x − 1)(x − 4) = 0\nx = 1  or  x = 4\n\nSum = 1 + 4 = 5.\n\nVerify at x = 1: y = 2(1) − 8 = −6, and y = 1 − 3 − 4 = −6. ✓\nVerify at x = 4: y = 2(4) − 8 = 0, and y = 16 − 12 − 4 = 0. ✓',
    wrongAnswerExplanations: {
      A: '1 is only one of the two intersection x-values; the problem asks for their sum.',
      B: '3 is the coefficient of x after rearranging (x² − 5x + 4 = 0) and is not a root or their sum.',
      D: '7 = 3 + 4 uses an incorrect second root (3 is not a solution); the roots are 1 and 4.',
    },
  },

  // Q02 — Advanced Math | Polynomial division (Remainder Theorem) | hard | MC
  {
    id: 'sat-f3-math-m2h-q02',
    section: 'math',
    moduleId: 'f3-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Equivalent expressions',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'When the polynomial p(x) = 2x³ − 5x² + x + 3 is divided by (x − 2), the remainder is r. What is the value of r?',
    choices: [
      { label: 'A', text: '−3' },
      { label: 'B', text: '−1' },
      { label: 'C', text: '1' },
      { label: 'D', text: '3' },
    ],
    correctAnswer: 'C',
    explanation:
      'By the Remainder Theorem, the remainder when p(x) is divided by (x − c) equals p(c).\n\nEvaluate p(2):\np(2) = 2(2)³ − 5(2)² + 2 + 3\n     = 2(8) − 5(4) + 2 + 3\n     = 16 − 20 + 2 + 3\n     = 1\n\nSo r = 1.',
    wrongAnswerExplanations: {
      A: 'p(2) = 1, not −3. This error likely comes from dropping the constant term +3.',
      B: 'p(2) = 1, not −1. A sign error on one of the terms produces this wrong result.',
      D: '3 is the constant term of p(x), not its value at x = 2.',
    },
  },

  // Q03 — Advanced Math | Exponential equation requiring same-base manipulation | hard | MC
  {
    id: 'sat-f3-math-m2h-q03',
    section: 'math',
    moduleId: 'f3-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Exponential functions',
    difficulty: 'hard',
    type: 'multiple_choice',
    question: 'What is the value of x that satisfies 4^(2x − 1) = 8^(x + 2)?',
    choices: [
      { label: 'A', text: '7' },
      { label: 'B', text: '8' },
      { label: 'C', text: '10' },
      { label: 'D', text: '14' },
    ],
    correctAnswer: 'B',
    explanation:
      'Express both sides as powers of 2. Since 4 = 2² and 8 = 2³:\n\n4^(2x − 1) = (2²)^(2x − 1) = 2^(2(2x − 1)) = 2^(4x − 2)\n8^(x + 2)  = (2³)^(x + 2)  = 2^(3(x + 2))  = 2^(3x + 6)\n\nSet the exponents equal (same base):\n4x − 2 = 3x + 6\nx = 8\n\nVerify: 4^(2·8 − 1) = 4^15 = 2^30; 8^(8 + 2) = 8^10 = (2³)^10 = 2^30. ✓',
    wrongAnswerExplanations: {
      A: 'x = 7: left exponent = 4(7) − 2 = 26; right exponent = 3(7) + 6 = 27. Not equal.',
      C: 'x = 10: left exponent = 4(10) − 2 = 38; right exponent = 3(10) + 6 = 36. Not equal.',
      D: 'x = 14: left exponent = 4(14) − 2 = 54; right exponent = 3(14) + 6 = 48. Not equal.',
    },
  },

  // Q04 — Advanced Math | Completing the square → vertex | hard | MC
  {
    id: 'sat-f3-math-m2h-q04',
    section: 'math',
    moduleId: 'f3-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Quadratic functions',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'What are the coordinates of the vertex of the parabola defined by f(x) = 3x² − 18x + 29?',
    choices: [
      { label: 'A', text: '(3, 2)' },
      { label: 'B', text: '(3, −2)' },
      { label: 'C', text: '(−3, 2)' },
      { label: 'D', text: '(6, 2)' },
    ],
    correctAnswer: 'A',
    explanation:
      'Complete the square:\nf(x) = 3x² − 18x + 29\n     = 3(x² − 6x) + 29\n     = 3(x² − 6x + 9 − 9) + 29\n     = 3(x − 3)² − 27 + 29\n     = 3(x − 3)² + 2\n\nVertex form a(x − h)² + k gives vertex (h, k) = (3, 2).',
    wrongAnswerExplanations: {
      B: '(3, −2): The constant is k = +2, not −2. Note that −27 + 29 = +2.',
      C: '(−3, 2): The vertex x-coordinate comes from (x − 3)², giving h = +3, not −3.',
      D: '(6, 2): The vertex x is half the coefficient of x divided by a: 18/(2·3) = 3, not 6.',
    },
  },

  // Q05 — Advanced Math | Function composition | hard | MC
  {
    id: 'sat-f3-math-m2h-q05',
    section: 'math',
    moduleId: 'f3-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Functions',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'Let f(x) = 2x + 1 and g(x) = x² − 3. Which of the following is equivalent to f(g(x))?',
    choices: [
      { label: 'A', text: '2x² − 5' },
      { label: 'B', text: '4x² + 4x − 2' },
      { label: 'C', text: '2x² − 3' },
      { label: 'D', text: '(2x + 1)² − 3' },
    ],
    correctAnswer: 'A',
    explanation:
      'f(g(x)) means substitute g(x) in place of x inside f:\nf(g(x)) = f(x² − 3) = 2(x² − 3) + 1 = 2x² − 6 + 1 = 2x² − 5.\n\nVerify with x = 2: g(2) = 4 − 3 = 1, then f(1) = 3. Check: 2(4) − 5 = 3. ✓',
    wrongAnswerExplanations: {
      B: '4x² + 4x − 2 is g(f(x)) = (2x+1)² − 3 = 4x² + 4x + 1 − 3 — the composition order is reversed.',
      C: '2x² − 3 forgets to add the +1 from f(x) = 2x + 1: 2(x²−3) + 1 = 2x² − 5, not 2x² − 3.',
      D: '(2x+1)² − 3 is the unfactored form of g(f(x)), not f(g(x)).',
    },
  },

  // Q06 — Advanced Math | Rational equation with extraneous solution check | hard | MC
  {
    id: 'sat-f3-math-m2h-q06',
    section: 'math',
    moduleId: 'f3-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Nonlinear equations in one variable and systems of equations',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'What is the solution set of the equation below?\n\n3/(x − 1) + x/(x + 1) = (x² + 3)/((x − 1)(x + 1))',
    choices: [
      { label: 'A', text: 'x = 1 only' },
      { label: 'B', text: 'x = 0 only' },
      { label: 'C', text: 'x = 0 and x = 1' },
      { label: 'D', text: 'No solution' },
    ],
    correctAnswer: 'B',
    explanation:
      'The denominators (x − 1) and (x + 1) require x ≠ 1 and x ≠ −1.\n\nMultiply every term by (x − 1)(x + 1):\n3(x + 1) + x(x − 1) = x² + 3\n\nExpand the left side:\n3x + 3 + x² − x = x² + 3\nx² + 2x + 3 = x² + 3\n2x + 3 = 3\n2x = 0\nx = 0\n\nCheck: x = 0 does not make any denominator zero (0 ≠ 1 and 0 ≠ −1), so x = 0 is the valid solution.',
    wrongAnswerExplanations: {
      A: 'x = 1 makes the denominator (x − 1) equal to zero, so it is excluded from the domain — it cannot be a solution.',
      C: 'x = 1 is not in the domain of the original equation, so it cannot be included in the solution set.',
      D: 'x = 0 satisfies the equation and is in the domain, so there is one valid solution.',
    },
  },

  // Q07 — Advanced Math | Product of roots (Vieta's formulas) | hard | MC
  {
    id: 'sat-f3-math-m2h-q07',
    section: 'math',
    moduleId: 'f3-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Quadratic functions',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'The quadratic equation 5x² − 45x + p = 0 has two real roots, r and s. If the product of r and s equals 14, what is the value of p?',
    choices: [
      { label: 'A', text: '14' },
      { label: 'B', text: '28' },
      { label: 'C', text: '70' },
      { label: 'D', text: '140' },
    ],
    correctAnswer: 'C',
    explanation:
      "For any quadratic ax² + bx + c = 0 with roots r and s:\n• Sum of roots:    r + s = −b/a = 45/5 = 9\n• Product of roots: r × s = c/a = p/5\n\nWe are told the product of the roots equals 14:\np/5 = 14\np = 70\n\nVerification: the equation 5x² − 45x + 70 = 0 factors as 5(x − 2)(x − 7) = 0, giving roots 2 and 7. Product: 2 × 7 = 14 ✓",
    wrongAnswerExplanations: {
      A: 'p = 14 gives a product of roots equal to 14/5 = 2.8, not 14.',
      B: 'p = 28 gives a product of roots equal to 28/5 = 5.6, not 14.',
      D: 'p = 140 gives a product of roots equal to 140/5 = 28, not 14.',
    },
  },

  // Q08 — Advanced Math | Inverse function | hard | MC
  {
    id: 'sat-f3-math-m2h-q08',
    section: 'math',
    moduleId: 'f3-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Functions',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'The function f is defined by f(x) = (3x + 5)/(x − 2) for x ≠ 2. Which of the following defines f⁻¹(x), the inverse of f?',
    choices: [
      { label: 'A', text: 'f⁻¹(x) = (2x + 5)/(x − 3)' },
      { label: 'B', text: 'f⁻¹(x) = (x − 2)/(3x + 5)' },
      { label: 'C', text: 'f⁻¹(x) = (3x − 5)/(x + 2)' },
      { label: 'D', text: 'f⁻¹(x) = (2x − 5)/(3 − x)' },
    ],
    correctAnswer: 'A',
    explanation:
      'To find the inverse, swap x and y and solve for y.\n\nStart: y = (3x + 5)/(x − 2)\nSwap: x = (3y + 5)/(y − 2)\nMultiply both sides by (y − 2):\nx(y − 2) = 3y + 5\nxy − 2x = 3y + 5\nxy − 3y = 2x + 5\ny(x − 3) = 2x + 5\ny = (2x + 5)/(x − 3)\n\nVerify: f(1) = (3 + 5)/(1 − 2) = −8. Then f⁻¹(−8) = (−16 + 5)/(−8 − 3) = −11/−11 = 1. ✓',
    wrongAnswerExplanations: {
      B: '(x−2)/(3x+5) is the reciprocal 1/f(x), not the inverse function.',
      C: '(3x−5)/(x+2) has the wrong sign on the constant; it should be +5 in the numerator, not −5.',
      D: '(2x−5)/(3−x) has −5 instead of +5 in the numerator — an incorrect sign on the constant term.',
    },
  },

  // Q09 — Advanced Math | Grid-in: repeated root (discriminant = 0) | hard | grid_in
  {
    id: 'sat-f3-math-m2h-q09',
    section: 'math',
    moduleId: 'f3-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Quadratic functions',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'For what value of k does the equation x² − (k + 2)x + 2k = 0 have exactly one repeated real root?',
    correctAnswer: '2',
    acceptableAnswers: ['2'],
    explanation:
      'A quadratic has exactly one repeated real root when its discriminant equals zero.\n\nFor x² − (k+2)x + 2k = 0, with a = 1, b = −(k+2), c = 2k:\n\nDiscriminant = b² − 4ac\n= (k+2)² − 4(1)(2k)\n= k² + 4k + 4 − 8k\n= k² − 4k + 4\n= (k − 2)²\n\nSet (k − 2)² = 0 → k = 2.\n\nVerify: equation becomes x² − 4x + 4 = (x − 2)² = 0, giving the repeated root x = 2. ✓',
    scoringNotes: 'Only k = 2 is accepted.',
  },

  // ─── Algebra × 5 ──────────────────────────────────────────────────────────

  // Q10 — Algebra | Absolute value inequality (two disjoint solution ranges) | hard | MC
  {
    id: 'sat-f3-math-m2h-q10',
    section: 'math',
    moduleId: 'f3-math-module-2-hard',
    domain: 'Algebra',
    skill: 'Linear inequalities in one or two variables',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'Which of the following gives the complete solution set for |2x − 6| > 10?',
    choices: [
      { label: 'A', text: 'x < −2 or x > 8' },
      { label: 'B', text: '−2 < x < 8' },
      { label: 'C', text: 'x < −8 or x > 2' },
      { label: 'D', text: 'x > 8 only' },
    ],
    correctAnswer: 'A',
    explanation:
      '|2x − 6| > 10 splits into two inequalities:\n\nCase 1: 2x − 6 > 10 → 2x > 16 → x > 8\nCase 2: 2x − 6 < −10 → 2x < −4 → x < −2\n\nSolution set: x < −2 or x > 8.\n\nVerify x = −3 (should work): |2(−3) − 6| = |−12| = 12 > 10. ✓\nVerify x = 0 (should fail): |2(0) − 6| = 6, which is not > 10. ✓',
    wrongAnswerExplanations: {
      B: '−2 < x < 8 is the solution to |2x − 6| < 10 (strict "less than" absolute value inequality) — the direction is reversed.',
      C: 'x < −8 or x > 2 comes from solving |x − 2| > 8; this problem has center 3 (from 2x − 6 = 0 → x = 3).',
      D: 'Only listing the right branch misses the equally valid left branch x < −2.',
    },
  },

  // Q11 — Algebra | System of 3 variables from a word problem | hard | MC
  {
    id: 'sat-f3-math-m2h-q11',
    section: 'math',
    moduleId: 'f3-math-module-2-hard',
    domain: 'Algebra',
    skill: 'Systems of two linear equations in two variables',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'A store sells three items: pens, notebooks, and binders. One pen, two notebooks, and one binder cost $12 in total. Two pens, one notebook, and one binder cost $13 in total. One pen, one notebook, and two binders cost $15 in total. What is the cost, in dollars, of one binder?',
    choices: [
      { label: 'A', text: '$4' },
      { label: 'B', text: '$5' },
      { label: 'C', text: '$6' },
      { label: 'D', text: '$7' },
    ],
    correctAnswer: 'B',
    explanation:
      'Let p = price of a pen, n = price of a notebook, b = price of a binder.\n\nEquation 1: p + 2n + b = 12\nEquation 2: 2p + n + b = 13\nEquation 3: p + n + 2b = 15\n\nStep 1 — Subtract Eq. 1 from Eq. 2:\np − n = 1, so p = n + 1  … (i)\n\nStep 2 — Subtract Eq. 1 from Eq. 3:\nb − n = 3, so b = n + 3  … (ii)\n\nStep 3 — Substitute (i) and (ii) into Eq. 1:\n(n + 1) + 2n + (n + 3) = 12\n4n + 4 = 12 → n = 2\n\nSo b = 2 + 3 = 5 and p = 3.\n\nVerify Eq. 2: 2(3) + 2 + 5 = 13. ✓\nVerify Eq. 3: 3 + 2 + 2(5) = 15. ✓',
    wrongAnswerExplanations: {
      A: '$4: b = n + 1 would give 4n + 2 = 12 → n = 2.5, which is inconsistent with the other equations.',
      C: '$6: b = n + 4 would give 4n + 5 = 12 → n = 1.75, which is inconsistent.',
      D: '$7: b = n + 5 would give 4n + 6 = 12 → n = 1.5, which is inconsistent.',
    },
  },

  // Q12 — Algebra | Chained percent changes (% of %) | medium | MC
  {
    id: 'sat-f3-math-m2h-q12',
    section: 'math',
    moduleId: 'f3-math-module-2-hard',
    domain: 'Algebra',
    skill: 'Ratios, rates, proportional relationships, and units',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'A stock price increased by 20% in January, then decreased by 25% in February. What was the net percent change in the stock price over the two months?',
    choices: [
      { label: 'A', text: 'Decreased by 5%' },
      { label: 'B', text: 'Decreased by 10%' },
      { label: 'C', text: 'No net change' },
      { label: 'D', text: 'Increased by 5%' },
    ],
    correctAnswer: 'B',
    explanation:
      'Let the initial price equal $100.\nAfter a 20% increase: $100 × 1.20 = $120.\nAfter a 25% decrease: $120 × 0.75 = $90.\n\nNet change = (90 − 100)/100 × 100% = −10%.\n\nThe price decreased by 10% overall. Percent changes are applied multiplicatively, so +20% and −25% do not simply add to −5%.',
    wrongAnswerExplanations: {
      A: '−5% incorrectly adds the two percentages (+20 − 25 = −5). Percent changes must be applied sequentially and multiplicatively.',
      C: 'A 0% net change would require 1.20 × r = 1, giving r = 1/1.20 ≈ 83.3% (a decrease of 16.7%), not 25%.',
      D: 'A net increase is impossible here since 1.20 × 0.75 = 0.90 < 1.',
    },
  },

  // Q13 — Algebra | Grid-in: linear equation condition for infinitely many solutions | hard | grid_in
  {
    id: 'sat-f3-math-m2h-q13',
    section: 'math',
    moduleId: 'f3-math-module-2-hard',
    domain: 'Algebra',
    skill: 'Linear equations in one variable',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'For what value of the constant c does the equation 3(x + 2) + c = 3x − 8 have infinitely many solutions?',
    correctAnswer: '-14',
    acceptableAnswers: ['-14'],
    explanation:
      'Expand the left side:\n3x + 6 + c = 3x − 8\n\nThe x-terms cancel (both sides have coefficient 3), leaving a constant equation:\n6 + c = −8\nc = −14.\n\nWith c = −14, the equation becomes 3x − 8 = 3x − 8, which is true for all real x (infinitely many solutions).',
    scoringNotes: 'Only c = −14 is accepted.',
  },

  // Q14 — Algebra | Grid-in: find b given solution constraint | hard | grid_in
  {
    id: 'sat-f3-math-m2h-q14',
    section: 'math',
    moduleId: 'f3-math-module-2-hard',
    domain: 'Algebra',
    skill: 'Linear equations in one variable',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'The equation 7x + b = 3x + 20 has the solution x = 3. What is the value of b?',
    correctAnswer: '8',
    acceptableAnswers: ['8'],
    explanation:
      'Substitute x = 3 into the equation:\n7(3) + b = 3(3) + 20\n21 + b = 9 + 20\n21 + b = 29\nb = 8.\n\nVerify: 7(3) + 8 = 29 and 3(3) + 20 = 29. ✓',
    scoringNotes: 'Only b = 8 is accepted.',
  },

  // ─── Problem-Solving and Data Analysis × 4 ─────────────────────────────────

  // Q15 — PSDA | Conditional probability from contingency table | hard | MC
  {
    id: 'sat-f3-math-m2h-q15',
    section: 'math',
    moduleId: 'f3-math-module-2-hard',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Probability and conditional probability',
    difficulty: 'hard',
    type: 'multiple_choice',
    stimulus:
      'A survey of 240 college students recorded whether each student lives on campus and whether each has a meal plan. Results are shown in the table below.\n\n|               | Meal Plan | No Meal Plan | Total |\n|---------------|-----------|--------------|-------|\n| On Campus     |    96     |      24      |  120  |\n| Off Campus    |    48     |      72      |  120  |\n| Total         |   144     |      96      |  240  |',
    question:
      'What is the probability that a randomly selected student lives on campus, given that the student has a meal plan?',
    choices: [
      { label: 'A', text: '2/5' },
      { label: 'B', text: '2/3' },
      { label: 'C', text: '4/5' },
      { label: 'D', text: '1/2' },
    ],
    correctAnswer: 'B',
    explanation:
      'Use the conditional probability formula:\nP(on campus | meal plan) = P(on campus AND meal plan) / P(meal plan)\n= (96/240) / (144/240)\n= 96/144\n= 2/3.\n\nAlternatively, of the 144 students with a meal plan, 96 live on campus: 96/144 = 2/3.',
    wrongAnswerExplanations: {
      A: '2/5 = 96/240 is the overall (unconditional) probability of being on campus with a meal plan — it does not restrict to the meal-plan subgroup.',
      C: '4/5 = 96/120 is the probability of having a meal plan given on-campus residence — the reverse conditional.',
      D: '1/2 = 120/240 is the unconditional probability of living on campus, ignoring meal plan status.',
    },
  },

  // Q16 — PSDA | Standard deviation interpretation | hard | MC
  {
    id: 'sat-f3-math-m2h-q16',
    section: 'math',
    moduleId: 'f3-math-module-2-hard',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'One-variable data: distributions and measures of center and spread',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'A data set consists of the values {4, 6, 6, 8, 8, 8, 10}. Which single change to this data set would increase its standard deviation the most?',
    choices: [
      { label: 'A', text: 'Replace 8 with 9' },
      { label: 'B', text: 'Add the value 7' },
      { label: 'C', text: 'Replace 4 with 0' },
      { label: 'D', text: 'Replace 10 with 8' },
    ],
    correctAnswer: 'C',
    explanation:
      'Standard deviation measures spread from the mean. Mean of the original data = (4+6+6+8+8+8+10)/7 = 50/7 ≈ 7.14.\n\nA: Changing 8 to 9 is a minor shift near the mean — minimal effect on spread.\nB: Adding 7 (close to the mean of ≈7.14) compresses the distribution slightly and may decrease standard deviation.\nC: Changing 4 to 0 moves the smallest value from about 3.14 below the mean to about 7.14 below the mean — a large increase in spread. This is the greatest increase in standard deviation.\nD: Changing 10 to 8 removes the highest outlier, reducing spread and decreasing standard deviation.\n\nChoice C creates the most extreme deviation from the mean.',
    wrongAnswerExplanations: {
      A: 'Moving 8 to 9 is a small perturbation near the mean; the effect on standard deviation is negligible.',
      B: 'A value near the mean reduces spread; adding 7 (≈ the mean) pulls the distribution inward.',
      D: 'Replacing 10 with 8 eliminates an extreme value, reducing the standard deviation.',
    },
  },

  // Q17 — PSDA | Multi-step unit conversion | hard | MC
  {
    id: 'sat-f3-math-m2h-q17',
    section: 'math',
    moduleId: 'f3-math-module-2-hard',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Ratios, rates, proportional relationships, and units',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'A factory produces 4.5 kilograms of a chemical per minute. How many milligrams of the chemical does the factory produce per second?\n\n(1 kilogram = 1,000 grams; 1 gram = 1,000 milligrams)',
    choices: [
      { label: 'A', text: '75,000' },
      { label: 'B', text: '750,000' },
      { label: 'C', text: '4,500,000' },
      { label: 'D', text: '270,000,000' },
    ],
    correctAnswer: 'A',
    explanation:
      'Apply dimensional analysis in two steps:\n\nStep 1 — Convert kilograms to milligrams:\n4.5 kg/min × (1,000 g/kg) × (1,000 mg/g)\n= 4,500,000 mg/min\n\nStep 2 — Convert minutes to seconds:\n4,500,000 mg/min × (1 min / 60 s)\n= 75,000 mg/s',
    wrongAnswerExplanations: {
      B: '750,000 results from dividing by 6 instead of 60 in the final step (using 10 s/min instead of 60 s/min).',
      C: '4,500,000 is the production in mg per minute — the per-minute to per-second conversion was skipped.',
      D: '270,000,000 comes from multiplying by 60 (instead of dividing) in the minute-to-second conversion.',
    },
  },

  // Q18 — PSDA | Grid-in: probability from combinatorics | hard | grid_in
  {
    id: 'sat-f3-math-m2h-q18',
    section: 'math',
    moduleId: 'f3-math-module-2-hard',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Probability and conditional probability',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'A bag contains 5 red marbles and 3 blue marbles. Two marbles are drawn at random without replacement. What is the probability that both marbles drawn are red? Enter your answer as a fraction.',
    correctAnswer: '5/14',
    acceptableAnswers: ['5/14'],
    explanation:
      'Total marbles = 5 + 3 = 8.\n\nMethod 1 — Multiplication rule:\nP(1st red) × P(2nd red | 1st was red) = (5/8) × (4/7) = 20/56 = 5/14.\n\nMethod 2 — Combinations:\nC(5,2)/C(8,2) = 10/28 = 5/14.',
    scoringNotes: 'Accept 5/14 or equivalent decimal 0.357 (rounded to 3 decimal places).',
  },

  // ─── Geometry and Trigonometry × 4 ────────────────────────────────────────

  // Q19 — Geometry | Arc length in radians | hard | MC
  {
    id: 'sat-f3-math-m2h-q19',
    section: 'math',
    moduleId: 'f3-math-module-2-hard',
    domain: 'Geometry and Trigonometry',
    skill: 'Circles',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'A circle has a radius of 9 centimeters. A central angle of 4π/3 radians subtends an arc on the circle. What is the length of this arc, in centimeters?',
    choices: [
      { label: 'A', text: '6π' },
      { label: 'B', text: '9π' },
      { label: 'C', text: '12π' },
      { label: 'D', text: '36π' },
    ],
    correctAnswer: 'C',
    explanation:
      'Arc length formula: L = rθ, where r is the radius and θ is the central angle in radians.\n\nL = 9 × (4π/3) = 36π/3 = 12π centimeters.',
    wrongAnswerExplanations: {
      A: '6π = 9 × (2π/3) uses an angle of 2π/3 rather than the given 4π/3.',
      B: '9π = 9 × π uses θ = π (a semicircle), not 4π/3.',
      D: '36π = 9 × 4π ignores the denominator of 3 in the angle 4π/3.',
    },
  },

  // Q20 — Geometry | Volume of composite solid (cylinder + hemisphere) | hard | MC
  {
    id: 'sat-f3-math-m2h-q20',
    section: 'math',
    moduleId: 'f3-math-module-2-hard',
    domain: 'Geometry and Trigonometry',
    skill: 'Area and volume',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'A grain silo consists of a right circular cylinder with a hemisphere sitting on top. (A hemisphere is exactly half of a sphere.) The cylinder has a radius of 6 meters and a height of 10 meters. The hemisphere shares the same radius as the top of the cylinder. Which of the following expressions gives the total volume of the silo, in cubic meters?',
    choices: [
      { label: 'A', text: '360π + 144π' },
      { label: 'B', text: '360π + 288π' },
      { label: 'C', text: '720π + 144π' },
      { label: 'D', text: '360π + 72π' },
    ],
    correctAnswer: 'A',
    explanation:
      'Volume of the cylinder:\nV_cyl = πr²h = π(6)²(10) = 360π m³\n\nVolume of the hemisphere (half a sphere of radius 6):\nV_hem = (1/2) × (4/3)πr³ = (2/3)π(6)³ = (2/3)π(216) = 144π m³\n\nTotal volume = 360π + 144π = 504π m³.',
    wrongAnswerExplanations: {
      B: '288π is the volume of a full sphere, (4/3)π(6³); the hemisphere is half that, which is 144π.',
      C: '720π doubles the cylinder height to 20 m; the correct cylinder height is 10 m.',
      D: '72π = (1/3)π(6³) is one-third of a full sphere, not one-half.',
    },
  },

  // Q21 — Geometry | Grid-in: right triangle + trig (find missing side, then tan) | hard | grid_in
  {
    id: 'sat-f3-math-m2h-q21',
    section: 'math',
    moduleId: 'f3-math-module-2-hard',
    domain: 'Geometry and Trigonometry',
    skill: 'Right triangles and trigonometry',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'In right triangle DEF, angle F = 90°. The length of leg DF is 5 and the length of hypotenuse DE is 13. What is the value of tan(D)? Enter your answer as a fraction.',
    correctAnswer: '12/5',
    acceptableAnswers: ['12/5', '2.4'],
    explanation:
      'Step 1 — Find the missing leg EF using the Pythagorean theorem (right angle at F means DE is the hypotenuse):\nEF² = DE² − DF² = 13² − 5² = 169 − 25 = 144\nEF = 12\n\nStep 2 — Identify the sides for angle D:\n• Opposite side = EF = 12\n• Adjacent side = DF = 5\n• Hypotenuse = DE = 13\n\ntan(D) = opposite/adjacent = 12/5.',
    scoringNotes: 'Accept 12/5 or the decimal equivalent 2.4.',
  },

  // Q22 — Geometry | Center of circle from diameter endpoints | medium | grid_in
  {
    id: 'sat-f3-math-m2h-q22',
    section: 'math',
    moduleId: 'f3-math-module-2-hard',
    domain: 'Geometry and Trigonometry',
    skill: 'Circles',
    difficulty: 'medium',
    type: 'grid_in',
    question:
      'The endpoints of a diameter of a circle are (−3, 7) and (5, −1). What is the y-coordinate of the center of the circle?',
    correctAnswer: '3',
    acceptableAnswers: ['3'],
    explanation:
      'The center of a circle is the midpoint of any diameter.\n\ny-coordinate of center = (y₁ + y₂)/2 = (7 + (−1))/2 = 6/2 = 3.\n\n(The x-coordinate of the center is (−3 + 5)/2 = 1, so the center is (1, 3).)',
    scoringNotes: 'Only 3 is accepted.',
  },
]
