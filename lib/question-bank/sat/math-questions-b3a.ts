import type { QBQuestion } from '../types'

export const mathQuestionsB3a: QBQuestion[] = [
  // ── Group A: Algebra (7 questions) ──────────────────────────────────────────

  {
    id: 'math-b3-001',
    test: 'SAT',
    section: 'math',
    domain: 'Algebra',
    skill: 'Linear equations in one variable',
    difficulty: 'easy',
    timeTargetSeconds: 60,
    mistakeType: 'careless',
    questionType: 'multiple_choice',
    stimulus:
      'A bookstore sells notebooks for $3 each. A student buys some notebooks and pays a one-time membership fee of $12. The student spends a total of $33.',
    question: 'How many notebooks did the student buy?',
    choices: [
      { label: 'A', text: '5' },
      { label: 'B', text: '7' },
      { label: 'C', text: '9' },
      { label: 'D', text: '11' },
    ],
    correctAnswer: 'B',
    explanation:
      'Let n = number of notebooks. The equation is 3n + 12 = 33. Subtract 12 from both sides: 3n = 21. Divide by 3: n = 7.',
    wrongAnswerExplanations: {
      A: 'Dividing 15 by 3 gives 5 — a student might subtract only part of the fee or make an arithmetic error. Check: 3(5) + 12 = 27 ≠ 33.',
      C: 'Some students add the fee instead of subtracting it: 3n = 33 + 12 = 45 → n = 15... or skip the fee entirely: 33/3 = 11, then subtract 2. Reread the problem carefully.',
      D: 'Dividing the total by the price without subtracting the fee: 33 ÷ 3 = 11. The fee must be removed first.',
    },
    teachingPoint:
      'Translate a word problem into a linear equation: identify the fixed cost (membership fee) and variable cost (price per notebook), set their sum equal to the total, then solve for the unknown.',
    relatedSkills: ['Linear equations in two variables', 'Ratios, rates, proportional relationships'],
    isWordProblem: true,
  },

  {
    id: 'math-b3-002',
    test: 'SAT',
    section: 'math',
    domain: 'Algebra',
    skill: 'Linear equations in one variable',
    difficulty: 'medium',
    timeTargetSeconds: 75,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    question: 'What is the value of x in the equation (x/3) − (x/4) = 5?',
    choices: [
      { label: 'A', text: '30' },
      { label: 'B', text: '48' },
      { label: 'C', text: '60' },
      { label: 'D', text: '75' },
    ],
    correctAnswer: 'C',
    explanation:
      'Find a common denominator of 12: (4x/12) − (3x/12) = 5 → x/12 = 5 → x = 60. Verify: 60/3 − 60/4 = 20 − 15 = 5. ✓',
    wrongAnswerExplanations: {
      A: 'A student might subtract the denominators (4 − 3 = 1... actually confuse 3 and 4): 5 × (3 + 4 − 1) = 30. This is not correct algebraic procedure.',
      B: 'Multiplying 5 by the LCM (12) and then subtracting 12: 60 − 12 = 48. This confuses LCM multiplication with subtraction of the denominator.',
      D: 'Multiplying 5 by 15 (the sum of the denominators): 5 × 15 = 75. Adding denominators is not the correct procedure here.',
    },
    teachingPoint:
      'When subtracting fractions with variables, find the least common denominator (LCD), rewrite each fraction, then combine. Here LCD = 12 turns x/3 − x/4 into x/12.',
    relatedSkills: ['Equivalent expressions', 'Linear equations in two variables'],
  },

  {
    id: 'math-b3-003',
    test: 'SAT',
    section: 'math',
    domain: 'Algebra',
    skill: 'Linear equations in two variables',
    difficulty: 'easy',
    timeTargetSeconds: 60,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    question: 'What is the slope of the line defined by the equation 4x − 2y = 10?',
    choices: [
      { label: 'A', text: '−5' },
      { label: 'B', text: '2' },
      { label: 'C', text: '4' },
      { label: 'D', text: '5' },
    ],
    correctAnswer: 'B',
    explanation:
      'Rewrite in slope-intercept form y = mx + b. Start with 4x − 2y = 10. Subtract 4x: −2y = −4x + 10. Divide by −2: y = 2x − 5. The slope m = 2.',
    wrongAnswerExplanations: {
      A: 'Using the constant term −5 as the slope instead of the y-intercept. After solving, −5 is the y-intercept, not the slope.',
      C: 'Taking the coefficient of x before isolating y: in 4x − 2y = 10, the coefficient of x is 4, but y must be isolated first to find the actual slope.',
      D: 'Dividing the constant (10) by the coefficient of y (2): 10/2 = 5. This is the y-intercept calculation error (should be −10/−2, not 10/2).',
    },
    teachingPoint:
      'To find the slope of a linear equation in standard form Ax + By = C, rearrange to slope-intercept form y = mx + b by isolating y. The slope is the coefficient of x after division.',
    relatedSkills: ['Linear functions', 'Systems of two linear equations'],
  },

  {
    id: 'math-b3-004',
    test: 'SAT',
    section: 'math',
    domain: 'Algebra',
    skill: 'Linear equations in two variables',
    difficulty: 'medium',
    timeTargetSeconds: 75,
    mistakeType: 'concept error',
    questionType: 'grid_in',
    question:
      'The line with equation 3x − 4y = 24 passes through the point (k, −3). What is the value of k?',
    correctAnswer: '4',
    acceptableAnswers: ['4'],
    explanation:
      'Substitute y = −3 into the equation: 3x − 4(−3) = 24 → 3x + 12 = 24 → 3x = 12 → x = 4. So k = 4.',
    teachingPoint:
      'To find an unknown coordinate on a line, substitute the known coordinate into the equation and solve for the unknown. Careful with sign changes when substituting negative values.',
    relatedSkills: ['Linear equations in one variable', 'Systems of two linear equations'],
  },

  {
    id: 'math-b3-005',
    test: 'SAT',
    section: 'math',
    domain: 'Algebra',
    skill: 'Systems of two linear equations',
    difficulty: 'medium',
    timeTargetSeconds: 75,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    question:
      'The system of equations below has solution (x, y). What is the value of x + y?\n\n2x + y = 11\nx − y = 1',
    choices: [
      { label: 'A', text: '5' },
      { label: 'B', text: '7' },
      { label: 'C', text: '9' },
      { label: 'D', text: '10' },
    ],
    correctAnswer: 'B',
    explanation:
      'Add the two equations: (2x + y) + (x − y) = 11 + 1 → 3x = 12 → x = 4. Substitute into x − y = 1: 4 − y = 1 → y = 3. Therefore x + y = 4 + 3 = 7.',
    wrongAnswerExplanations: {
      A: 'This equals x − y = 1 after solving, which is the value of one of the original expressions, not x + y.',
      C: 'A student might compute x + 2y or 2x + y = 11 and misread what is asked. Or solve for 2x + y instead of x + y.',
      D: 'Adding both right-hand sides: 11 + 1 = 12, then halving: 12/2... or reading 3x = 12 and writing 12 as the answer before dividing.',
    },
    teachingPoint:
      'When asked for a combination like x + y, check whether adding or subtracting the equations directly gives that expression — it can save steps. Here, adding gives 3x, so you still solve normally, but always re-read what is being asked.',
    relatedSkills: ['Linear equations in two variables', 'Linear equations in one variable'],
  },

  {
    id: 'math-b3-006',
    test: 'SAT',
    section: 'math',
    domain: 'Algebra',
    skill: 'Linear inequalities',
    difficulty: 'medium',
    timeTargetSeconds: 75,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    question: 'Which of the following represents all values of x that satisfy 3 − 2x < 11?',
    choices: [
      { label: 'A', text: 'x < −4' },
      { label: 'B', text: 'x > −4' },
      { label: 'C', text: 'x < 4' },
      { label: 'D', text: 'x > 4' },
    ],
    correctAnswer: 'B',
    explanation:
      'Start with 3 − 2x < 11. Subtract 3 from both sides: −2x < 8. Divide both sides by −2 and flip the inequality sign: x > −4.',
    wrongAnswerExplanations: {
      A: 'Dividing by −2 without flipping the inequality sign gives x < −4. When dividing or multiplying an inequality by a negative number, the direction must reverse.',
      C: 'Adding 3 to both sides first: −2x < 14 → x > −7. This is a different error path. Choice C (x < 4) comes from treating −2x < 8 as 2x < 8 → x < 4, forgetting the negative sign.',
      D: 'Treating −2x < 8 as 2x < 8 and then flipping: 2x < 8 → x < 4, then incorrectly reversing to x > 4.',
    },
    teachingPoint:
      'The critical rule for inequalities: whenever you multiply or divide both sides by a negative number, reverse the inequality sign. Forgetting this is the most common error.',
    relatedSkills: ['Linear equations in one variable', 'Linear functions'],
  },

  {
    id: 'math-b3-007',
    test: 'SAT',
    section: 'math',
    domain: 'Algebra',
    skill: 'Linear functions',
    difficulty: 'hard',
    timeTargetSeconds: 90,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    stimulus:
      'A car rental company charges a flat daily fee plus a per-mile rate. On Monday, a customer drove 80 miles and was charged $52. On Tuesday, a different customer drove 120 miles and was charged $68.',
    question:
      'If the total charge is modeled by a linear function C(m) = pm + d, where m is the number of miles driven, what is the daily flat fee d?',
    choices: [
      { label: 'A', text: '$12' },
      { label: 'B', text: '$20' },
      { label: 'C', text: '$28' },
      { label: 'D', text: '$36' },
    ],
    correctAnswer: 'B',
    explanation:
      'Set up two equations: 80p + d = 52 and 120p + d = 68. Subtract the first from the second: 40p = 16 → p = 0.40. Substitute back: 80(0.40) + d = 52 → 32 + d = 52 → d = 20. The flat fee is $20.',
    wrongAnswerExplanations: {
      A: 'Using only the difference: 68 − 52 = 16, then 16 − 4 = 12. This does not follow from the correct system-of-equations approach.',
      C: 'Plugging in incorrectly or computing d = 52 − 80(0.30) = 52 − 24 = 28 by using the wrong per-mile rate.',
      D: 'Subtracting in the wrong order or using 0.20 per mile: 80(0.20) = 16, then d = 52 − 16 = 36. The per-mile rate must be found first.',
    },
    teachingPoint:
      'A linear function defined by two data points can be found by solving a system of two equations in two unknowns (slope and y-intercept). Find the rate of change first (slope), then use one point to find the fixed component.',
    relatedSkills: ['Systems of two linear equations', 'Ratios, rates, proportional relationships'],
    isWordProblem: true,
  },

  // ── Group B: Advanced Math (6 questions) ────────────────────────────────────

  {
    id: 'math-b3-008',
    test: 'SAT',
    section: 'math',
    domain: 'Advanced Math',
    skill: 'Quadratic equations',
    difficulty: 'easy',
    timeTargetSeconds: 60,
    mistakeType: 'careless',
    questionType: 'multiple_choice',
    question: 'Which of the following gives the solutions to x² − 5x + 6 = 0?',
    choices: [
      { label: 'A', text: 'x = 1 and x = 6' },
      { label: 'B', text: 'x = 2 and x = 3' },
      { label: 'C', text: 'x = −2 and x = −3' },
      { label: 'D', text: 'x = −1 and x = 6' },
    ],
    correctAnswer: 'B',
    explanation:
      'Factor: x² − 5x + 6 = (x − 2)(x − 3) = 0. Set each factor to zero: x − 2 = 0 → x = 2, and x − 3 = 0 → x = 3. Verify: (2)² − 5(2) + 6 = 4 − 10 + 6 = 0 ✓; (3)² − 5(3) + 6 = 9 − 15 + 6 = 0 ✓.',
    wrongAnswerExplanations: {
      A: 'Factors that multiply to 6 and add to −7, not −5. Check: 1 + 6 = 7 ≠ 5.',
      C: 'Using negative signs for both roots gives (x + 2)(x + 3) = x² + 5x + 6, which has a positive middle term, not −5x.',
      D: 'The product of −1 and 6 is −6, not +6, so these cannot be roots of x² − 5x + 6 = 0.',
    },
    teachingPoint:
      'To factor x² + bx + c, find two numbers that multiply to c and add to b. Here: find factors of 6 that add to −5 → these are −2 and −3, giving roots x = 2 and x = 3.',
    relatedSkills: ['Equivalent expressions', 'Nonlinear functions'],
  },

  {
    id: 'math-b3-009',
    test: 'SAT',
    section: 'math',
    domain: 'Advanced Math',
    skill: 'Quadratic equations',
    difficulty: 'medium',
    timeTargetSeconds: 75,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    question:
      'The equation x² + 6x + 7 = 0 is rewritten in the form (x + a)² = b. What is the value of b?',
    choices: [
      { label: 'A', text: '−2' },
      { label: 'B', text: '2' },
      { label: 'C', text: '7' },
      { label: 'D', text: '9' },
    ],
    correctAnswer: 'B',
    explanation:
      'Complete the square: x² + 6x + 7 = 0. Take half the coefficient of x: 6/2 = 3. Square it: 3² = 9. Add and subtract 9: (x² + 6x + 9) − 9 + 7 = 0 → (x + 3)² − 2 = 0 → (x + 3)² = 2. So a = 3 and b = 2.',
    wrongAnswerExplanations: {
      A: 'Writing (x + 3)² = −2 results from moving the constant to the wrong side: −9 + 7 = −2 is correct for the left side, but then you must subtract −2 (add 2) to get b = 2 on the right.',
      C: 'Using the original constant 7 as b without completing the square.',
      D: 'Confusing the "added square" (9) with the final value of b. After adding 9 to complete the square, you must account for the original constant term.',
    },
    teachingPoint:
      'Completing the square: for x² + bx + c, add and subtract (b/2)² inside the equation. The result is (x + b/2)² = (b/2)² − c. Carry the original constant carefully.',
    relatedSkills: ['Quadratic equations', 'Equivalent expressions'],
  },

  {
    id: 'math-b3-010',
    test: 'SAT',
    section: 'math',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'medium',
    timeTargetSeconds: 75,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    question: 'If f(x) = x² − 3x + 4, what is f(−2)?',
    choices: [
      { label: 'A', text: '2' },
      { label: 'B', text: '6' },
      { label: 'C', text: '14' },
      { label: 'D', text: '18' },
    ],
    correctAnswer: 'C',
    explanation:
      'Substitute x = −2: f(−2) = (−2)² − 3(−2) + 4 = 4 − (−6) + 4 = 4 + 6 + 4 = 14.',
    wrongAnswerExplanations: {
      A: 'Computing f(−2) = (−2)² − 3(−2) + 4 but making a sign error: 4 − 6 + 4 = 2 (treating −3(−2) as −6 rather than +6).',
      B: 'Substituting x = 2 (positive) instead of x = −2: 4 − 6 + 4 = 2, or computing −2² = −4 instead of (−2)² = 4: −4 + 6 + 4 = 6.',
      D: 'A student might compute (−2)² = 4, then −3(2) = −6 and forget the negative: 4 + (−6) + 4... or calculate 4 + 6 + 8 = 18 by doubling the constant.',
    },
    teachingPoint:
      'When evaluating a function at a negative input, use parentheses around the substituted value: f(−2) = (−2)² − 3(−2) + 4. Remember (−2)² = +4 and −3(−2) = +6.',
    relatedSkills: ['Quadratic equations', 'Equivalent expressions'],
  },

  {
    id: 'math-b3-011',
    test: 'SAT',
    section: 'math',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'hard',
    timeTargetSeconds: 90,
    mistakeType: 'time issue',
    questionType: 'multiple_choice',
    question:
      'The graphs of y = x² − 4x + 3 and y = x − 1 intersect at two points. What is the sum of the x-coordinates of those two points?',
    choices: [
      { label: 'A', text: '3' },
      { label: 'B', text: '4' },
      { label: 'C', text: '5' },
      { label: 'D', text: '6' },
    ],
    correctAnswer: 'C',
    explanation:
      'Set the two expressions equal: x² − 4x + 3 = x − 1. Rearrange: x² − 5x + 4 = 0. Factor: (x − 1)(x − 4) = 0, giving x = 1 and x = 4. Sum = 1 + 4 = 5. Verify with y = x − 1: at x = 1, y = 0; at x = 4, y = 3. Check in parabola: 1 − 4 + 3 = 0 ✓; 16 − 16 + 3 = 3 ✓.',
    wrongAnswerExplanations: {
      A: 'The product of the two x-values is 1 × 4 = 4... or identifying only x = 3 (a root of the original parabola) without completing the intersection step.',
      B: 'The product of the roots by Vieta\'s formula is c/a = 4, not their sum. Confusing sum and product of roots.',
      D: 'Using the sum of roots formula on the original parabola (x² − 4x + 3): sum = 4/1 = 4, but forgetting to rearrange the equation before applying Vieta\'s formulas.',
    },
    teachingPoint:
      'To find intersections of two curves, set them equal and solve the resulting equation. For a quadratic ax² + bx + c = 0, the sum of roots is −b/a (Vieta\'s formula), which can save computation.',
    relatedSkills: ['Quadratic equations', 'Systems of two linear equations'],
  },

  {
    id: 'math-b3-012',
    test: 'SAT',
    section: 'math',
    domain: 'Advanced Math',
    skill: 'Equivalent expressions',
    difficulty: 'medium',
    timeTargetSeconds: 75,
    mistakeType: 'careless',
    questionType: 'multiple_choice',
    question:
      'Which of the following is equivalent to (2x² + 5x − 3) − (x² − 2x + 4)?',
    choices: [
      { label: 'A', text: 'x² + 3x − 7' },
      { label: 'B', text: 'x² + 7x + 1' },
      { label: 'C', text: 'x² + 7x − 7' },
      { label: 'D', text: '3x² + 3x + 1' },
    ],
    correctAnswer: 'C',
    explanation:
      'Distribute the minus sign: (2x² + 5x − 3) − (x² − 2x + 4) = 2x² + 5x − 3 − x² + 2x − 4. Combine like terms: (2x² − x²) + (5x + 2x) + (−3 − 4) = x² + 7x − 7.',
    wrongAnswerExplanations: {
      A: 'Correctly subtracting x² and combining constant terms (−3 − 4 = −7) but subtracting the x-terms instead of adding: 5x − 2x = 3x instead of 5x + 2x = 7x.',
      B: 'Combining x-terms correctly (7x) but sign error on the constant: −3 − (−4) = −3 + 4 = 1 instead of −3 + (−4) = −7.',
      D: 'Adding the x² terms instead of subtracting: 2x² + x² = 3x², then combining other terms incorrectly.',
    },
    teachingPoint:
      'When subtracting a polynomial, distribute the negative sign to every term inside the parentheses: the sign of each term flips. Then group and combine like terms carefully.',
    relatedSkills: ['Quadratic equations', 'Nonlinear functions'],
  },

  {
    id: 'math-b3-013',
    test: 'SAT',
    section: 'math',
    domain: 'Advanced Math',
    skill: 'Exponential functions',
    difficulty: 'hard',
    timeTargetSeconds: 90,
    mistakeType: 'concept error',
    questionType: 'grid_in',
    question:
      'If 4^(x+1) = 8^(x−1), what is the value of x?',
    correctAnswer: '5',
    acceptableAnswers: ['5'],
    explanation:
      'Rewrite both sides using base 2: 4 = 2² and 8 = 2³. So (2²)^(x+1) = (2³)^(x−1) → 2^(2x+2) = 2^(3x−3). Since the bases are equal, set the exponents equal: 2x + 2 = 3x − 3 → 2 + 3 = 3x − 2x → x = 5. Verify: 4^(5+1) = 4^6 = 4096; 8^(5−1) = 8^4 = 4096. ✓',
    teachingPoint:
      'When solving exponential equations, express all terms as powers of the same base, then set the exponents equal. Common base choices: 2 (for 2, 4, 8, 16, 32), 3 (for 3, 9, 27), 5 (for 5, 25).',
    relatedSkills: ['Nonlinear functions', 'Linear equations in one variable'],
  },

  // ── Group C: Problem-Solving and Data Analysis (6 questions) ────────────────

  {
    id: 'math-b3-014',
    test: 'SAT',
    section: 'math',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Ratios, rates, proportional relationships',
    difficulty: 'easy',
    timeTargetSeconds: 60,
    mistakeType: 'careless',
    questionType: 'multiple_choice',
    stimulus:
      'A printer can print 180 pages in 6 minutes.',
    question: 'At this rate, how many pages can the printer print in 25 minutes?',
    choices: [
      { label: 'A', text: '450' },
      { label: 'B', text: '600' },
      { label: 'C', text: '750' },
      { label: 'D', text: '900' },
    ],
    correctAnswer: 'C',
    explanation:
      'Unit rate: 180 ÷ 6 = 30 pages per minute. In 25 minutes: 30 × 25 = 750 pages.',
    wrongAnswerExplanations: {
      A: 'Computing 30 × 15 = 450 (using 15 instead of 25) or 18 × 25 = 450 (using the wrong rate).',
      B: 'Multiplying 180 × (25/6) but rounding 25/6 ≈ 4 instead of using the exact rate: 180 × 4 = 720... or computing 24 × 25 = 600 using the wrong unit rate.',
      D: 'Computing 30 × 30 = 900 (using 30 minutes instead of 25) or multiplying 180 by 5 = 900.',
    },
    teachingPoint:
      'For unit-rate problems: (1) find the rate per single unit by dividing, (2) multiply by the desired quantity. Always identify the unit rate first.',
    relatedSkills: ['Percentages', 'Linear functions'],
    isWordProblem: true,
  },

  {
    id: 'math-b3-015',
    test: 'SAT',
    section: 'math',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Ratios, rates, proportional relationships',
    difficulty: 'medium',
    timeTargetSeconds: 75,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    stimulus:
      'A recipe requires 2 cups of flour for every 3 cups of oats and every 1.5 cups of sugar. A baker wants to make a larger batch using 9 cups of oats.',
    question:
      'How many cups of flour does the baker need for this larger batch?',
    choices: [
      { label: 'A', text: '4' },
      { label: 'B', text: '6' },
      { label: 'C', text: '8' },
      { label: 'D', text: '13.5' },
    ],
    correctAnswer: 'B',
    explanation:
      'The ratio of flour to oats is 2:3. If oats = 9, then flour = 9 × (2/3) = 6 cups.',
    wrongAnswerExplanations: {
      A: 'Subtracting: 9 − 3 = 6 extra oats, then 2 + (6/3) = 4. This incorrectly applies an additive rather than multiplicative approach.',
      C: 'Using the sugar ratio instead: 9 ÷ 1.5 = 6 multiplier, then 6 × (4/3)... or finding that oats tripled (3 → 9) and tripling 2 + 2/3 rounding to 8.',
      D: 'Multiplying flour by oats directly: 2 × 9 = 18, then dividing by something... or adding flour + sugar in the original recipe and scaling: (2 + 1.5) × (9/3) = 3.5 × 3 = 10.5 ≈ 13.5.',
    },
    teachingPoint:
      'When scaling a recipe using a ratio, find the scale factor by dividing the new quantity of one ingredient by its original quantity. Then multiply all other ingredients by that same factor.',
    relatedSkills: ['Percentages', 'Linear equations in one variable'],
    isWordProblem: true,
  },

  {
    id: 'math-b3-016',
    test: 'SAT',
    section: 'math',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Percentages',
    difficulty: 'medium',
    timeTargetSeconds: 75,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    stimulus:
      'A jacket originally costs $80. It is first marked up by 25%, and then that new price is discounted by 20%.',
    question: 'What is the final price of the jacket?',
    choices: [
      { label: 'A', text: '$76' },
      { label: 'B', text: '$80' },
      { label: 'C', text: '$84' },
      { label: 'D', text: '$96' },
    ],
    correctAnswer: 'B',
    explanation:
      'After 25% markup: $80 × 1.25 = $100. After 20% discount: $100 × 0.80 = $80. The final price is $80.',
    wrongAnswerExplanations: {
      A: 'Applying a net change of −5%: $80 × 0.95 = $76. While 25% − 20% = 5% seems right, percent changes are multiplicative not additive: the 20% discount applies to the already-increased price.',
      C: 'Computing 25% − 20% = 5% increase: $80 × 1.05 = $84. Same additive error, but applied as an increase.',
      D: 'Applying only the 20% markup on $80: $80 × 1.20 = $96, ignoring the discount step.',
    },
    teachingPoint:
      'Successive percent changes are multiplicative, not additive. A 25% increase followed by a 20% decrease gives a net factor of 1.25 × 0.80 = 1.00 — back to the original price. Never add or subtract the percents directly.',
    relatedSkills: ['Ratios, rates, proportional relationships', 'Linear functions'],
    isWordProblem: true,
  },

  {
    id: 'math-b3-017',
    test: 'SAT',
    section: 'math',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Probability',
    difficulty: 'easy',
    timeTargetSeconds: 60,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    stimulus:
      'A bag contains 5 red marbles, 3 blue marbles, and 2 green marbles. One marble is selected at random.',
    question: 'What is the probability that the selected marble is NOT red?',
    choices: [
      { label: 'A', text: '1/5' },
      { label: 'B', text: '1/2' },
      { label: 'C', text: '2/5' },
      { label: 'D', text: '1/10' },
    ],
    correctAnswer: 'B',
    explanation:
      'Total marbles: 5 + 3 + 2 = 10. Non-red marbles: 3 + 2 = 5. P(not red) = 5/10 = 1/2.',
    wrongAnswerExplanations: {
      A: 'Taking 1 divided by the number of non-red colors (2 colors: blue and green) = 1/2, then misreading as 1/5. Or using only green marbles: 2/10 = 1/5.',
      C: 'Using only blue marbles as "not red": 3/10 + some confusion, or dividing non-red (5) by non-total (not 10): P = 5/12.5 ≈ 2/5. Some students may write 4/10 = 2/5 by miscounting.',
      D: 'Probability of drawing a specific single marble (1 out of 10), confusing "not red" with one specific marble.',
    },
    teachingPoint:
      'P(not A) = 1 − P(A) = (total − favorable)/total. Always count all marbles for the denominator and all non-target marbles for the numerator.',
    relatedSkills: ['Statistics (mean/median/range)', 'Ratios, rates, proportional relationships'],
    isWordProblem: true,
  },

  {
    id: 'math-b3-018',
    test: 'SAT',
    section: 'math',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Statistics (mean/median/range)',
    difficulty: 'medium',
    timeTargetSeconds: 75,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    stimulus:
      'A class of 4 students scored 70, 80, 90, and 100 on a test. A fifth student then takes the test.',
    question:
      'If the fifth student\'s score increases the class mean by exactly 3 points, what score did the fifth student receive?',
    choices: [
      { label: 'A', text: '88' },
      { label: 'B', text: '95' },
      { label: 'C', text: '100' },
      { label: 'D', text: '103' },
    ],
    correctAnswer: 'C',
    explanation:
      'Original sum: 70 + 80 + 90 + 100 = 340. Original mean: 340/4 = 85. New mean: 85 + 3 = 88. New total sum (5 students): 88 × 5 = 440. Fifth student\'s score: 440 − 340 = 100.',
    wrongAnswerExplanations: {
      A: 'Reporting the new mean (88) as the fifth student\'s score. The new mean is 88, but the fifth student\'s score must be calculated separately using the total sum.',
      B: 'Adding 3 to the highest score: 100 − (100 − 95) confusion, or guessing without applying the mean formula.',
      D: 'Adding 3 to the original mean: 85 + 3 = 88... wait, or adding 3 to the highest score 100: 103. Some students simply add 3 to the original mean or the highest score.',
    },
    teachingPoint:
      'To find a missing value that produces a target mean: (1) calculate the current sum, (2) compute the target mean × new count to get the required total sum, (3) subtract the current sum. Mean × count = sum is the key relationship.',
    relatedSkills: ['Probability', 'Ratios, rates, proportional relationships'],
    isWordProblem: true,
  },

  {
    id: 'math-b3-019',
    test: 'SAT',
    section: 'math',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Statistics (mean/median/range)',
    difficulty: 'hard',
    timeTargetSeconds: 90,
    mistakeType: 'concept error',
    questionType: 'grid_in',
    stimulus:
      'A data set consists of six values: 14, 22, x, 30, 38, and 42. The mean of this data set is 28.',
    question: 'What is the value of x?',
    correctAnswer: '22',
    acceptableAnswers: ['22'],
    explanation:
      'The mean of 6 values equals 28, so their sum = 28 × 6 = 168. Sum of known values: 14 + 22 + 30 + 38 + 42 = 146. Therefore x = 168 − 146 = 22. Verify: (14 + 22 + 22 + 30 + 38 + 42)/6 = 168/6 = 28. ✓',
    teachingPoint:
      'When given the mean and all values except one, use sum = mean × count to find the required total, then subtract the sum of known values to find the missing one. Always verify by recomputing the mean.',
    relatedSkills: ['Statistics (mean/median/range)', 'Linear equations in one variable'],
    isWordProblem: true,
  },

  // ── Group D: Geometry and Trigonometry (6 questions) ────────────────────────

  {
    id: 'math-b3-020',
    test: 'SAT',
    section: 'math',
    domain: 'Geometry and Trigonometry',
    skill: 'Area and volume',
    difficulty: 'easy',
    timeTargetSeconds: 60,
    mistakeType: 'careless',
    questionType: 'multiple_choice',
    stimulus:
      'A triangle has a base of 14 cm and a height of 9 cm.',
    question: 'What is the area of the triangle, in square centimeters?',
    choices: [
      { label: 'A', text: '23' },
      { label: 'B', text: '46' },
      { label: 'C', text: '63' },
      { label: 'D', text: '126' },
    ],
    correctAnswer: 'C',
    explanation:
      'Area of a triangle = (1/2) × base × height = (1/2) × 14 × 9 = (1/2) × 126 = 63 square centimeters.',
    wrongAnswerExplanations: {
      A: 'Adding the base and height: 14 + 9 = 23. This gives a perimeter-type sum, not area.',
      B: 'Doubling the sum of base and height: 2 × (14 + 9) = 46. This calculates a perimeter-based quantity, not area.',
      D: 'Multiplying base by height without the factor of 1/2: 14 × 9 = 126. The triangle area formula requires dividing by 2.',
    },
    teachingPoint:
      'Area of a triangle = (1/2) × base × height. The most common error is forgetting to multiply by 1/2. A triangle is half the area of a parallelogram with the same base and height.',
    relatedSkills: ['Area and volume', 'Lines, angles, and triangles'],
    isWordProblem: true,
  },

  {
    id: 'math-b3-021',
    test: 'SAT',
    section: 'math',
    domain: 'Geometry and Trigonometry',
    skill: 'Area and volume',
    difficulty: 'medium',
    timeTargetSeconds: 75,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    stimulus:
      'A large rectangle has length 10 and width 8. A smaller rectangle with length 4 and width 3 is cut out from one corner of the large rectangle.',
    question:
      'What is the area of the remaining shape after the smaller rectangle is removed?',
    choices: [
      { label: 'A', text: '56' },
      { label: 'B', text: '68' },
      { label: 'C', text: '72' },
      { label: 'D', text: '80' },
    ],
    correctAnswer: 'B',
    explanation:
      'Area of large rectangle: 10 × 8 = 80. Area of small rectangle: 4 × 3 = 12. Remaining area: 80 − 12 = 68.',
    wrongAnswerExplanations: {
      A: 'Subtracting the perimeter of the small rectangle instead of its area: 80 − 2(4 + 3) = 80 − 14 = 66... or computing (10 − 4) × (8 − 3) = 6 × 5 = 30, which is wrong, or using 80 − 24 = 56 by computing 4 × 6 = 24.',
      C: "Computing only the large rectangle's area: 10 × 8 = 80 and then subtracting 8 (one dimension) instead of 12: 80 − 8 = 72.",
      D: "Reporting the large rectangle's area without subtracting the cutout: 10 × 8 = 80.",
    },
    teachingPoint:
      'For composite shapes, use the "whole minus part" strategy: compute the area of the full shape, compute the area of the removed part, then subtract. Keep area and perimeter formulas distinct.',
    relatedSkills: ['Area and volume', 'Similar triangles'],
    isWordProblem: true,
  },

  {
    id: 'math-b3-022',
    test: 'SAT',
    section: 'math',
    domain: 'Geometry and Trigonometry',
    skill: 'Lines, angles, and triangles',
    difficulty: 'medium',
    timeTargetSeconds: 75,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    stimulus:
      'Two parallel lines are cut by a transversal. One of the angles formed measures 65°. The angle on the same side of the transversal, between the parallel lines (a co-interior angle, also called a consecutive interior angle), is labeled y°.',
    question: 'What is the value of y?',
    choices: [
      { label: 'A', text: '25' },
      { label: 'B', text: '65' },
      { label: 'C', text: '115' },
      { label: 'D', text: '130' },
    ],
    correctAnswer: 'C',
    explanation:
      'Co-interior angles (also called consecutive interior angles or same-side interior angles) formed by a transversal crossing parallel lines are supplementary: they add up to 180°. So y = 180° − 65° = 115°.',
    wrongAnswerExplanations: {
      A: 'Computing the complement: 90° − 65° = 25°. Complementary angles sum to 90°, not relevant here.',
      B: 'Using the alternate interior angle theorem: alternate interior angles are equal (both 65°), but y is the co-interior angle, not the alternate interior angle.',
      D: 'Doubling 65°: 65 × 2 = 130. This doesn\'t correspond to any standard angle relationship.',
    },
    teachingPoint:
      'When a transversal crosses parallel lines: alternate interior angles are equal; co-interior (same-side interior) angles are supplementary (sum to 180°); corresponding angles are equal. Know which pair is which.',
    relatedSkills: ['Similar triangles', 'Right triangles and trigonometry'],
  },

  {
    id: 'math-b3-023',
    test: 'SAT',
    section: 'math',
    domain: 'Geometry and Trigonometry',
    skill: 'Similar triangles',
    difficulty: 'medium',
    timeTargetSeconds: 75,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    stimulus:
      'Triangle ABC is similar to triangle DEF. In triangle ABC, AB = 6 and BC = 10. In triangle DEF, DE = 9.',
    question: 'What is the length of EF?',
    choices: [
      { label: 'A', text: '13' },
      { label: 'B', text: '15' },
      { label: 'C', text: '18' },
      { label: 'D', text: '20' },
    ],
    correctAnswer: 'B',
    explanation:
      'Since triangle ABC ~ triangle DEF, corresponding sides are proportional: AB/DE = BC/EF. Substituting: 6/9 = 10/EF → EF = 10 × (9/6) = 10 × 1.5 = 15.',
    wrongAnswerExplanations: {
      A: 'Adding the scale increase to BC: 10 + 3 = 13. The scale factor is multiplicative (×1.5), not additive (the difference between DE and AB is 3).',
      C: 'Multiplying DE by the ratio 9/6: EF = 9 × (10/6) = 15... or computing EF = BC × (DE/AB) correctly but multiplying again: 10 × 9/5 = 18.',
      D: 'Using an incorrect ratio: EF = BC × (AB/DE) = 10 × (6/9)... or EF = DE + BC = 9 + 11 = 20.',
    },
    teachingPoint:
      'In similar triangles, corresponding sides are in the same ratio (the scale factor). Set up the proportion so matching sides are in matching positions: AB/DE = BC/EF. Always verify which vertices correspond.',
    relatedSkills: ['Lines, angles, and triangles', 'Right triangles and trigonometry'],
  },

  {
    id: 'math-b3-024',
    test: 'SAT',
    section: 'math',
    domain: 'Geometry and Trigonometry',
    skill: 'Right triangles and trigonometry',
    difficulty: 'medium',
    timeTargetSeconds: 75,
    mistakeType: 'careless',
    questionType: 'grid_in',
    stimulus:
      'A right triangle has legs of length 5 and 12.',
    question: 'What is the length of the hypotenuse?',
    correctAnswer: '13',
    acceptableAnswers: ['13'],
    explanation:
      'Apply the Pythagorean theorem: a² + b² = c². So 5² + 12² = c² → 25 + 144 = c² → 169 = c² → c = 13. This is the 5-12-13 Pythagorean triple.',
    teachingPoint:
      'The Pythagorean theorem states a² + b² = c² for a right triangle with legs a and b and hypotenuse c. Memorizing common triples (3-4-5, 5-12-13, 8-15-17) saves time on the SAT.',
    relatedSkills: ['Similar triangles', 'Coordinate geometry'],
    isWordProblem: true,
  },

  {
    id: 'math-b3-025',
    test: 'SAT',
    section: 'math',
    domain: 'Geometry and Trigonometry',
    skill: 'Coordinate geometry',
    difficulty: 'hard',
    timeTargetSeconds: 90,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    question:
      'Points P and Q have coordinates P(a, 3) and Q(7, a). The midpoint of segment PQ has y-coordinate equal to 5. What is the value of a?',
    choices: [
      { label: 'A', text: '5' },
      { label: 'B', text: '6' },
      { label: 'C', text: '7' },
      { label: 'D', text: '8' },
    ],
    correctAnswer: 'C',
    explanation:
      'The midpoint of PQ has coordinates ((a + 7)/2, (3 + a)/2). The y-coordinate of the midpoint is (3 + a)/2. Setting this equal to 5: (3 + a)/2 = 5 → 3 + a = 10 → a = 7.',
    wrongAnswerExplanations: {
      A: 'Setting the y-coordinate equal to 5 and solving (3 + a)/2 = 5 but writing a = 5 by confusing the target value with the answer.',
      B: 'Computing the average of 5 and 7: (5 + 7)/2 = 6. This misuses the midpoint formula by averaging the target y-value with the x-coordinate of Q.',
      D: 'Setting 3 + a = 5 (forgetting to account for the division by 2): a = 5 − 3 = 2... or computing 3 + a = 10 and adding instead: 3 + a = 10 → a = 10 − 2 = 8.',
    },
    teachingPoint:
      'The midpoint formula for points (x₁, y₁) and (x₂, y₂) is M = ((x₁+x₂)/2, (y₁+y₂)/2). When the coordinates involve algebraic expressions, substitute into the appropriate component and solve the resulting equation.',
    relatedSkills: ['Right triangles and trigonometry', 'Linear equations in two variables'],
  },
]
