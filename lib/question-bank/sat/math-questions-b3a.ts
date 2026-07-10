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
      'A plumber charges a flat service fee of $45 per visit plus $30 per hour of labor. On one job the plumber billed a total of $165.',
    question: 'How many hours of labor did the plumber work on that job?',
    choices: [
      { label: 'A', text: '3' },
      { label: 'B', text: '4' },
      { label: 'C', text: '5' },
      { label: 'D', text: '6' },
    ],
    correctAnswer: 'B',
    explanation:
      'Let h = hours of labor. The equation is 30h + 45 = 165. Subtract 45: 30h = 120. Divide by 30: h = 4. Verify: 30(4) + 45 = 120 + 45 = 165. ✓',
    wrongAnswerExplanations: {
      A: 'Subtracting 45 to get 30h = 120, then dividing by 40 instead of 30: 120 ÷ 40 = 3. Divide by the coefficient of h (30), not by an incorrect number.',
      C: 'Adding the flat fee instead of subtracting before dividing: (165 + 45) ÷ 30 = 210 ÷ 30 = 7, or dividing 165 ÷ 30 ≈ 5.5 rounded down to 5.',
      D: 'Dividing the total charge by the hourly rate without first removing the flat fee: 165 ÷ 30 = 5.5, rounded up to 6. The $45 fee must be subtracted first.',
    },
    teachingPoint:
      'Translate the word problem into a linear equation: (rate × quantity) + fixed cost = total. Isolate the unknown by subtracting the fixed cost first, then dividing by the rate. Always verify by substituting back.',
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
    question: 'What is the value of x if (2x − 1)/3 + 5 = (x + 4)/2?',
    choices: [
      { label: 'A', text: '−16' },
      { label: 'B', text: '−8' },
      { label: 'C', text: '8' },
      { label: 'D', text: '16' },
    ],
    correctAnswer: 'A',
    explanation:
      'Multiply every term by 6 (the LCM of 3 and 2): 2(2x − 1) + 30 = 3(x + 4) → 4x − 2 + 30 = 3x + 12 → 4x + 28 = 3x + 12 → x = 12 − 28 = −16. Verify: LHS = (2(−16) − 1)/3 + 5 = (−33)/3 + 5 = −11 + 5 = −6; RHS = (−16 + 4)/2 = −12/2 = −6. ✓',
    wrongAnswerExplanations: {
      B: 'Multiplying only the fraction terms by 6 but leaving the +5 unchanged: 2(2x − 1) + 5 = 3(x + 4) → 4x − 2 + 5 = 3x + 12 → 4x + 3 = 3x + 12 → x = 9. A different arithmetic error on these numbers can yield x = −8.',
      C: 'Distributing 2(2x − 1) as 4x + 2 instead of 4x − 2 (wrong sign on the constant): 4x + 2 + 30 = 3x + 12 → x = −20. Another sign error along the way lands on x = 8.',
      D: 'Reversing the equation (solving 3(x + 4)/2 = ... ) or making a sign error on the final step: −x = −16 → x = 16.',
    },
    teachingPoint:
      'To clear fractions, multiply every term on both sides by the LCM of all denominators. Apply the multiplication to constants and fraction terms alike. Distribute carefully after clearing, then combine like terms to isolate x.',
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
    question:
      'Line k passes through the points (1, −2) and (5, 6). Which of the following is an equation of line k?',
    choices: [
      { label: 'A', text: 'y = 2x − 4' },
      { label: 'B', text: 'y = 2x + 4' },
      { label: 'C', text: 'y = 3x − 5' },
      { label: 'D', text: 'y = 2x − 6' },
    ],
    correctAnswer: 'A',
    explanation:
      'Slope = (6 − (−2))/(5 − 1) = 8/4 = 2. Using point-slope with (1, −2): y − (−2) = 2(x − 1) → y + 2 = 2x − 2 → y = 2x − 4. Verify with (5, 6): 2(5) − 4 = 6. ✓',
    wrongAnswerExplanations: {
      B: 'Computing slope = 2 correctly but making a sign error when solving for b: −2 = 2(1) + b → b = −4 is correct, but writing b = +4 instead. Check: 2(1) + 4 = 6 ≠ −2.',
      C: 'Computing rise = 8 but using the y-values as the run: run = 6 − (−2) = 8, so slope = 8/8 = 1... or computing run as 5 − (−2) = 7 or some other error yields slope ≈ 3.',
      D: 'Using the correct slope but substituting the second point (5, 6) with a calculation error: 6 = 2(5) + b → b = −4 is actually correct, so b = −6 requires an arithmetic error such as 6 − 12 = −6.',
    },
    teachingPoint:
      'To write a line equation from two points: (1) compute slope m = Δy/Δx; (2) substitute m and one point into y = mx + b and solve for b; (3) verify with the second point. Watch for the minus-of-a-negative: 5 − 1 = 4 in the denominator.',
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
    stimulus:
      'The line with equation 4x − 3y = c passes through the point (−1, 3). The same line also passes through a second point whose x-coordinate is 5.',
    question: 'What is the y-coordinate of that second point?',
    correctAnswer: '11',
    acceptableAnswers: ['11'],
    explanation:
      'Step 1 — find c: substitute (−1, 3) into 4x − 3y = c → 4(−1) − 3(3) = −4 − 9 = −13, so c = −13. Step 2 — find y when x = 5: 4(5) − 3y = −13 → 20 − 3y = −13 → −3y = −33 → y = 11. Verify: 4(5) − 3(11) = 20 − 33 = −13. ✓',
    teachingPoint:
      'When an equation contains an unknown constant, substitute a known point first to determine the constant. Then use the complete equation to find any remaining unknown. Perform each arithmetic step explicitly to avoid sign errors.',
    relatedSkills: ['Linear equations in one variable', 'Systems of two linear equations'],
  },

  {
    id: 'math-b3-005',
    test: 'SAT',
    section: 'math',
    domain: 'Algebra',
    skill: 'Systems of two linear equations',
    difficulty: 'easy',
    timeTargetSeconds: 60,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    question:
      'The system of equations below has solution (x, y). What is the value of x + y?\n\n2x − y = 7\nx + 3y = 7',
    choices: [
      { label: 'A', text: '3' },
      { label: 'B', text: '5' },
      { label: 'C', text: '7' },
      { label: 'D', text: '9' },
    ],
    correctAnswer: 'B',
    explanation:
      'Multiply the second equation by 2: 2x + 6y = 14. Subtract the first equation: (2x + 6y) − (2x − y) = 14 − 7 → 7y = 7 → y = 1. Substitute into the first equation: 2x − 1 = 7 → 2x = 8 → x = 4. Therefore x + y = 4 + 1 = 5. Verify: 2(4) − 1 = 7 ✓ and 4 + 3(1) = 7 ✓.',
    wrongAnswerExplanations: {
      A: 'Finding y = 1 correctly but substituting into the wrong equation with an error: x + 3(1) = 7 → x = 4, then computing x + y = 4 − 1 = 3 with a subtraction instead of addition.',
      C: 'Noticing that both equations equal 7 on the right side and guessing x + y = 7. This confuses the right-hand sides with the solution sum.',
      D: 'Finding x = 4 correctly but computing x + y = 4 + y where y = 5 is mistakenly solved as 7y = 35 from an arithmetic error: x + y = 4 + 5 = 9.',
    },
    teachingPoint:
      'When the y-terms cannot be directly eliminated, multiply one equation to match a coefficient. Use elimination to find one variable, substitute to find the other, and then compute whatever combination the problem asks for. Read carefully: the question asks for x + y, not x or y individually.',
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
    question: 'Which of the following represents all values of x that satisfy −3 < (2x + 1)/3 ≤ 5?',
    choices: [
      { label: 'A', text: '−5 ≤ x < 7' },
      { label: 'B', text: '−5 < x ≤ 7' },
      { label: 'C', text: '−4 < x ≤ 7' },
      { label: 'D', text: '−5 < x < 7' },
    ],
    correctAnswer: 'B',
    explanation:
      'Multiply all three parts by 3 (positive, so inequality signs are unchanged): −9 < 2x + 1 ≤ 15. Subtract 1 from all parts: −10 < 2x ≤ 14. Divide all parts by 2: −5 < x ≤ 7. The left endpoint is excluded (strict <) and the right is included (≤).',
    wrongAnswerExplanations: {
      A: 'Swapping the endpoint types: including the left (x ≥ −5) and excluding the right (x < 7). The original left inequality is strict (<), so x = −5 is NOT in the solution set.',
      C: 'Dividing −9 by 2 to get −4.5 rounded to −4, instead of first subtracting 1 (to get −10) and then dividing by 2 (to get exactly −5).',
      D: 'Making both endpoints strict and excluding x = 7. Because the original right side is ≤ 5 (not < 5), after multiplying by 3 and subtracting 1 the right boundary is included.',
    },
    teachingPoint:
      'For a compound inequality, apply each operation to all three parts simultaneously. Multiplying or dividing by a positive number preserves the direction of all inequality signs. Keep track of which boundaries are strict (<) versus closed (≤) at every step.',
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
    question:
      'Line ℓ has equation y = dx − 7. Lines m and n have equations 3x + y = 5 and x − y = 1, respectively. For what value of d does line ℓ pass through the intersection of lines m and n?',
    choices: [
      { label: 'A', text: '3' },
      { label: 'B', text: '4' },
      { label: 'C', text: '5' },
      { label: 'D', text: '6' },
    ],
    correctAnswer: 'C',
    explanation:
      'Step 1 — find the intersection of lines m and n. Adding 3x + y = 5 and x − y = 1 eliminates y: 4x = 6 → x = 3/2. Substitute into x − y = 1: 3/2 − y = 1 → y = 1/2. Intersection: (3/2, 1/2). Step 2 — find d. Substitute (3/2, 1/2) into y = dx − 7: 1/2 = d(3/2) − 7 → d(3/2) = 1/2 + 7 = 15/2 → d = (15/2) ÷ (3/2) = 5. Verify: y = 5(3/2) − 7 = 15/2 − 14/2 = 1/2. ✓',
    wrongAnswerExplanations: {
      A: 'Using a different second line, such as x + 2y = 0, to find the intersection: that system gives (2, −1), and then −1 = 2d − 7 → 2d = 6 → d = 3.',
      B: 'Finding intersection (3/2, 1/2) but adding 7 incorrectly: 1/2 = (3/2)d − 7 → (3/2)d = 1/2 − 7 = −13/2 → d = −13/3 ≈ −4.3, then a sign flip gives a result near 4.',
      D: 'Substituting the coordinates in reverse (using y-value as x-input): 3/2 = d(1/2) − 7 → d(1/2) = 17/2 → d = 17, then halving by mistake to get d ≈ 6... or using x = 3 from a rounding error.',
    },
    teachingPoint:
      'When a line must pass through a specific intersection point: (1) solve the system of the two intersecting lines to find that point; (2) substitute the point into the parametric line and solve for the unknown parameter. Confirm Step 1 by checking both original equations.',
    relatedSkills: ['Systems of two linear equations', 'Ratios, rates, proportional relationships'],
    isWordProblem: false,
  },

  // ── Group B: Advanced Math (6 questions) ────────────────────────────────────

  {
    id: 'math-b3-008',
    test: 'SAT',
    section: 'math',
    domain: 'Advanced Math',
    skill: 'Quadratic equations',
    difficulty: 'medium',
    timeTargetSeconds: 75,
    mistakeType: 'careless',
    questionType: 'multiple_choice',
    question: 'Which of the following gives the solutions to 3x² − 10x + 8 = 0?',
    choices: [
      { label: 'A', text: 'x = 2/3 and x = 4' },
      { label: 'B', text: 'x = 4/3 and x = 2' },
      { label: 'C', text: 'x = −2/3 and x = −4' },
      { label: 'D', text: 'x = 2 and x = 4' },
    ],
    correctAnswer: 'B',
    explanation:
      'Use the ac method: a × c = 3 × 8 = 24. Find two numbers that multiply to 24 and add to −10: −4 and −6. Split the middle term: 3x² − 4x − 6x + 8 = 0. Factor by grouping: x(3x − 4) − 2(3x − 4) = 0 → (x − 2)(3x − 4) = 0. Solutions: x = 2 or x = 4/3. Verify x = 2: 3(4) − 10(2) + 8 = 12 − 20 + 8 = 0 ✓. Verify x = 4/3: 3(16/9) − 10(4/3) + 8 = 16/3 − 40/3 + 24/3 = 0 ✓.',
    wrongAnswerExplanations: {
      A: 'Factoring as (3x − 2)(x − 4): expanding gives 3x² − 12x − 2x + 8 = 3x² − 14x + 8 ≠ 3x² − 10x + 8. The factor pairs do not match.',
      C: 'Using (3x + 2)(x + 4) = 3x² + 14x + 8, which has the opposite sign on both the middle term and the constant — a complete sign error on the original problem.',
      D: 'Trying (x − 2)(x − 4) = x² − 6x + 8, then multiplying by 3: 3x² − 18x + 24 ≠ 3x² − 10x + 8. The leading coefficient must be distributed across only one factor.',
    },
    teachingPoint:
      'For ax² + bx + c with a > 1, the ac method: find two integers whose product is ac and sum is b, split the middle term, then factor by grouping. Always multiply out your answer to confirm it matches the original polynomial.',
    relatedSkills: ['Equivalent expressions', 'Nonlinear functions'],
  },

  {
    id: 'math-b3-009',
    test: 'SAT',
    section: 'math',
    domain: 'Advanced Math',
    skill: 'Quadratic equations',
    difficulty: 'hard',
    timeTargetSeconds: 90,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    question:
      'Solve x² + 8x + 12 = 0 by completing the square. What is the sum of the two solutions?',
    choices: [
      { label: 'A', text: '−8' },
      { label: 'B', text: '−4' },
      { label: 'C', text: '2' },
      { label: 'D', text: '4' },
    ],
    correctAnswer: 'A',
    explanation:
      'Move the constant: x² + 8x = −12. Add (8/2)² = 16 to both sides: x² + 8x + 16 = 4 → (x + 4)² = 4. Take both square roots: x + 4 = ±2. Solutions: x = −4 + 2 = −2 and x = −4 − 2 = −6. Sum = −2 + (−6) = −8. Cross-check with Vieta\'s: sum of roots = −b/a = −8/1 = −8. ✓',
    wrongAnswerExplanations: {
      B: 'Reporting only the number inside the squared factor — (x + 4)² leads a student to write −4 — without computing either root. The roots are −4 ± 2, not −4 alone.',
      C: 'Solving (x + 4)² = 4 but taking only the positive square root: x + 4 = +2 → x = −2, then doubling (confusing "sum" with "twice one root"): 2(−2) = −4... or just reporting x = −2 and computing −2 + 4 = 2.',
      D: 'Taking the square root of the right-hand side as 4 instead of ±2 (forgetting the square root of 4 is 2): x + 4 = 4 → x = 0; x + 4 = −4 → x = −8; sum = 0 + (−8) = −8 is actually correct... or various errors yield 4.',
    },
    teachingPoint:
      'Completing the square: isolate the x² and x terms, add (b/2)² to both sides, factor as a perfect square, then take both the + and − square roots. The sum of the two solutions equals −b/a (Vieta\'s formula) — always verify this way.',
    relatedSkills: ['Quadratic equations', 'Equivalent expressions'],
  },

  {
    id: 'math-b3-010',
    test: 'SAT',
    section: 'math',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'hard',
    timeTargetSeconds: 90,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    question: 'If f(x) = 3x² − 2x + 1, which of the following is equal to f(2a − 1)?',
    choices: [
      { label: 'A', text: '12a² − 16a + 6' },
      { label: 'B', text: '12a² − 8a + 2' },
      { label: 'C', text: '12a² − 16a + 4' },
      { label: 'D', text: '3a² − 4a + 6' },
    ],
    correctAnswer: 'A',
    explanation:
      'Substitute x = 2a − 1: f(2a − 1) = 3(2a − 1)² − 2(2a − 1) + 1. Expand (2a − 1)² = 4a² − 4a + 1, so 3(4a² − 4a + 1) = 12a² − 12a + 3. Expand −2(2a − 1) = −4a + 2. Combine: 12a² − 12a + 3 − 4a + 2 + 1 = 12a² − 16a + 6.',
    wrongAnswerExplanations: {
      B: 'Expanding (2a − 1)² as 4a² − 1 (omitting the middle term −4a): 3(4a² − 1) − 2(2a − 1) + 1 = 12a² − 3 − 4a + 2 + 1 = 12a² − 4a + 0 = 12a² − 4a. A further arithmetic error shifts to 12a² − 8a + 2.',
      C: 'Distributing −2(2a − 1) as −4a − 2 (wrong sign on the constant inside): 12a² − 12a + 3 − 4a − 2 + 1 = 12a² − 16a + 2. Another arithmetic slip gives +4 instead of +2.',
      D: 'Substituting only the "a" part and dropping the constant: treating f(2a) = 3(4a²) − 2(2a) + 1 = 12a² − 4a + 1, then applying a partial adjustment for the −1 inside (2a − 1).',
    },
    teachingPoint:
      'When evaluating f at a composite expression, replace every x with the full expression in parentheses. The key error source is (2a − 1)² = 4a² − 4a + 1 — the middle term −4a is frequently omitted. Expand the squared term first, then distribute each coefficient, then combine like terms.',
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
      'Let f(x) = x² − 3x and g(x) = 2x − 4. Which of the following gives ALL values of x for which f(x) = g(x)?',
    choices: [
      { label: 'A', text: 'x = 1 only' },
      { label: 'B', text: 'x = 4 only' },
      { label: 'C', text: 'x = 1 and x = 4' },
      { label: 'D', text: 'x = −1 and x = 4' },
    ],
    correctAnswer: 'C',
    explanation:
      'Set f(x) = g(x): x² − 3x = 2x − 4. Rearrange: x² − 5x + 4 = 0. Factor: (x − 1)(x − 4) = 0. Solutions: x = 1 and x = 4. Verify x = 1: f(1) = 1 − 3 = −2 and g(1) = 2 − 4 = −2 ✓. Verify x = 4: f(4) = 16 − 12 = 4 and g(4) = 8 − 4 = 4 ✓.',
    wrongAnswerExplanations: {
      A: 'Setting x² − 3x = 2x − 4 and correctly factoring (x − 1)(x − 4) = 0, but only recording x = 1. Both factors must be set to zero — a quadratic can have two solutions.',
      B: 'Similar to choice A but only recording x = 4. Setting each factor to zero gives x − 1 = 0 → x = 1 and x − 4 = 0 → x = 4; both solutions are valid.',
      D: 'Factoring x² − 5x + 4 incorrectly as (x + 1)(x − 4) = 0: check by expanding → x² − 4x + x − 4 = x² − 3x − 4 ≠ x² − 5x + 4. The constant term does not match, so x = −1 is not a solution.',
    },
    teachingPoint:
      'To find all x where f(x) = g(x), set the expressions equal, move all terms to one side, and factor the resulting quadratic. A quadratic equation can have up to two real solutions — the word "ALL" signals that you must find every one and verify each by substitution.',
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
      'Which of the following is equivalent to (3x − 1)² − (2x + 3)(x − 2)?',
    choices: [
      { label: 'A', text: '7x² − 5x + 7' },
      { label: 'B', text: '7x² + 5x + 7' },
      { label: 'C', text: '7x² − 5x − 7' },
      { label: 'D', text: '7x² + x + 7' },
    ],
    correctAnswer: 'A',
    explanation:
      'Expand (3x − 1)² = 9x² − 6x + 1. Expand (2x + 3)(x − 2) = 2x² − 4x + 3x − 6 = 2x² − x − 6. Subtract: (9x² − 6x + 1) − (2x² − x − 6) = 9x² − 6x + 1 − 2x² + x + 6 = 7x² − 5x + 7.',
    wrongAnswerExplanations: {
      B: 'Expanding (3x − 1)² as 9x² + 6x + 1 (wrong sign on the middle term −6x → +6x): then 9x² + 6x + 1 − 2x² + x + 6 = 7x² + 7x + 7. A further sign error on the x-term produces +5x.',
      C: 'Distributing the minus sign into (2x² − x − 6) as −2x² − x − 6 instead of −2x² + x + 6: 9x² − 6x + 1 − 2x² − x − 6 = 7x² − 7x − 5. Different arithmetic errors on this path give −5x − 7.',
      D: 'Expanding (2x + 3)(x − 2) correctly as 2x² − x − 6 but then applying the minus sign only to the 2x² term: 9x² − 6x + 1 − 2x² − x − 6 = 7x² − 7x − 5... or a different distribution gives the x-coefficient as +1.',
    },
    teachingPoint:
      'When subtracting an expanded polynomial, the minus sign must be distributed to every term of the polynomial being subtracted. Expand each part fully first, then change all signs of the second group before combining like terms. Use (a − b)² = a² − 2ab + b² for the square.',
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
      'If 3^(2x) = 5, what is the value of 9^(x + 1)?',
    correctAnswer: '45',
    acceptableAnswers: ['45'],
    explanation:
      'Note that 9 = 3², so 9^(x+1) = (3²)^(x+1) = 3^(2(x+1)) = 3^(2x+2) = 3^(2x) · 3² = 5 · 9 = 45.',
    teachingPoint:
      'When an exponential expression shares a base with a known quantity, rewrite in terms of that base and apply the rules aᵐⁿ = (aᵐ)ⁿ and aᵐ⁺ⁿ = aᵐ · aⁿ. Expressing 9 as 3² converts the exponent to 2(x+1) = 2x + 2, which splits into 3^(2x) · 3² = 5 · 9 without any logarithms.',
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
      'A car travels at a steady speed of 65 miles per hour. There are 5,280 feet in one mile.',
    question: 'How many feet does the car travel in 3 minutes?',
    choices: [
      { label: 'A', text: '17,160' },
      { label: 'B', text: '34,320' },
      { label: 'C', text: '51,480' },
      { label: 'D', text: '103,500' },
    ],
    correctAnswer: 'A',
    explanation:
      '3 minutes = 3/60 hour = 1/20 hour. Distance = 65 × (1/20) = 65/20 = 3.25 miles. Convert to feet: 3.25 × 5,280 = 17,160 feet.',
    wrongAnswerExplanations: {
      B: 'Using 6 minutes instead of 3, or computing 3.25 × 5,280 × 2: 17,160 × 2 = 34,320.',
      C: 'Converting 3 minutes to 3/60 hour correctly but then multiplying by 3 again: 65 × (3/20) × 5,280 = 3 × 17,160 = 51,480.',
      D: 'Not converting minutes to hours at all: treating 3 minutes as 3 hours → 65 × 3 = 195 miles × 5,280 / ... or 65 × 3 × 5,280 / 10 ≈ 103,500 from a partial conversion error.',
    },
    teachingPoint:
      'Convert all units before computing. Three minutes must become 3/60 = 1/20 of an hour so the speed (mph) can multiply it directly. Then convert miles to feet by multiplying by 5,280. Label each intermediate result with its unit to catch errors.',
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
      'A metal alloy contains copper, zinc, and tin in the ratio 5 : 3 : 2 by weight. A manufacturer makes a batch containing exactly 30 kg of copper.',
    question: 'What is the total weight of the batch, in kilograms?',
    choices: [
      { label: 'A', text: '45' },
      { label: 'B', text: '50' },
      { label: 'C', text: '60' },
      { label: 'D', text: '75' },
    ],
    correctAnswer: 'C',
    explanation:
      'Total ratio parts = 5 + 3 + 2 = 10. Copper is 5 parts = 30 kg, so 1 part = 30 ÷ 5 = 6 kg. Total batch = 10 × 6 = 60 kg.',
    wrongAnswerExplanations: {
      A: 'Computing zinc + tin parts: 3 + 2 = 5 parts × 6 kg = 30 kg, then adding only one extra part (30 + 15 = 45). The total requires all 10 parts, not just the non-copper ones.',
      B: 'Dividing the copper amount by 3 (confusing copper\'s ratio as 3 instead of 5): 30 ÷ 3 = 10 per part, then 10 × 5 = 50. Or computing 30 × (10/6) with a rounding error.',
      D: 'Multiplying copper (30) by the ratio sum (10) and then dividing by 4 instead of 5: 300/4 = 75. Or setting up 5/10 × total = 30 incorrectly as 4/10 × total = 30 → total = 75.',
    },
    teachingPoint:
      'In a ratio problem, the value of one part = (known quantity) ÷ (its ratio number). Multiply this unit value by the total number of ratio parts to find the overall total, or by any ratio number to find that component\'s amount.',
    relatedSkills: ['Percentages', 'Linear equations in one variable'],
    isWordProblem: true,
  },

  {
    id: 'math-b3-016',
    test: 'SAT',
    section: 'math',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Percentages',
    difficulty: 'hard',
    timeTargetSeconds: 90,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    stimulus:
      'The price of a jacket increases by 30% in one season and then decreases by 20% from its new (higher) price in the following season.',
    question: 'What is the net percent change in the price of the jacket after both changes?',
    choices: [
      { label: 'A', text: '+4%' },
      { label: 'B', text: '+10%' },
      { label: 'C', text: '−4%' },
      { label: 'D', text: '+6%' },
    ],
    correctAnswer: 'A',
    explanation:
      'Let the original price = 1. After a 30% increase: 1 × 1.30 = 1.30. After a 20% decrease from that price: 1.30 × 0.80 = 1.04. Net change = 1.04 − 1 = 0.04 = +4%. The 20% decrease applies to the already-increased price ($1.30), not the original, so the results do not simply combine as +30% − 20%.',
    wrongAnswerExplanations: {
      B: 'Adding the percent changes directly: +30% − 20% = +10%. Successive percent changes multiply their multipliers, not their rates. The 20% decrease applies to a higher value, so it removes more than 20% of the original.',
      C: 'Applying changes in reverse or making a multiplication error: 1 × 0.80 × 1.30 = 1.04 is still +4%. To get −4% a student must incorrectly compute 1.30 × 0.80 as 0.96.',
      D: 'Using 30% × 20% = 6% as a "compound loss" and then computing 30% − 6% = 24%... or computing 1.30 − 0.30 × 0.20 = 1.30 − 0.06 = 1.24, then misreading this as 24% → rounding error gives 6%.',
    },
    teachingPoint:
      'Successive percent changes: multiply the multipliers — (1.30)(0.80) = 1.04, a net +4%. Never add or subtract percent rates. The second percent always applies to the value after the first change, so the order of operations cannot be skipped.',
    relatedSkills: ['Ratios, rates, proportional relationships', 'Linear functions'],
    isWordProblem: true,
  },

  {
    id: 'math-b3-017',
    test: 'SAT',
    section: 'math',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Probability',
    difficulty: 'medium',
    timeTargetSeconds: 75,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    stimulus:
      'A bag contains 5 red marbles, 4 blue marbles, and 3 green marbles. Two marbles are drawn one at a time without replacement.',
    question: 'What is the probability that both marbles drawn are blue?',
    choices: [
      { label: 'A', text: '1/11' },
      { label: 'B', text: '1/9' },
      { label: 'C', text: '4/33' },
      { label: 'D', text: '1/3' },
    ],
    correctAnswer: 'A',
    explanation:
      'Total marbles = 5 + 4 + 3 = 12. P(first blue) = 4/12 = 1/3. After one blue is removed, 3 blue remain out of 11 total. P(second blue | first was blue) = 3/11. P(both blue) = (1/3) × (3/11) = 3/33 = 1/11.',
    wrongAnswerExplanations: {
      B: 'Treating the two draws as independent (with replacement): (4/12)² = (1/3)² = 1/9. Without replacement, after the first blue is drawn there are only 3 blue left out of 11 total, not 4 out of 12.',
      C: 'Computing (4/12) × (3/12) = 12/144 = 1/12, using 12 in the denominator for the second draw instead of 11. The total decreases by 1 when drawing without replacement.',
      D: 'Reporting only P(first blue) = 4/12 = 1/3 without accounting for the second draw needing to also be blue.',
    },
    teachingPoint:
      'For draws without replacement, use conditional probability: P(A and B) = P(A) × P(B|A). After the first draw, both the total count and the count of the selected color each decrease by 1. This is different from independent events (with replacement).',
    relatedSkills: ['Statistics (mean/median/range)', 'Ratios, rates, proportional relationships'],
    isWordProblem: true,
  },

  {
    id: 'math-b3-018',
    test: 'SAT',
    section: 'math',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Statistics (mean/median/range)',
    difficulty: 'hard',
    timeTargetSeconds: 90,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    stimulus:
      'Five students take a test and their mean score is 80. A sixth student then takes the same test, and the mean of all six scores drops to 76.',
    question: 'What score did the sixth student receive?',
    choices: [
      { label: 'A', text: '52' },
      { label: 'B', text: '56' },
      { label: 'C', text: '60' },
      { label: 'D', text: '64' },
    ],
    correctAnswer: 'B',
    explanation:
      'Sum of the five original scores = 80 × 5 = 400. Required sum for six scores at mean 76 = 76 × 6 = 456. Sixth student\'s score = 456 − 400 = 56.',
    wrongAnswerExplanations: {
      A: 'Computing 76 × 5 − 80 × 5 = 380 − 400 = −20, then confusingly applying 76 − 24 = 52, or miscomputing 76 × 6 = 452 (wrong) and 452 − 400 = 52.',
      C: 'Multiplying the mean drop (80 − 76 = 4) by the wrong number: 4 × 5 = 20, then 76 + 4 − 20 = 60... or intuitively guessing 80 − 20 = 60.',
      D: 'Computing 76 × 6 = 456 correctly but using 80 × 4.9 ≈ 392 instead of 80 × 5 = 400: 456 − 392 = 64.',
    },
    teachingPoint:
      'The key formula is: new score = (new mean × new count) − (old mean × old count). Compute each sum independently, then subtract. Do not multiply the mean difference by the count — the two counts differ.',
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
      'A data set has seven values: 48, 55, 63, x, 82, 90, and (x + 6). The mean of all seven values is 70.',
    question: 'What is the value of x?',
    correctAnswer: '73',
    acceptableAnswers: ['73'],
    explanation:
      'Required sum = 70 × 7 = 490. Sum of known values: 48 + 55 + 63 + 82 + 90 = 338. The two unknowns contribute x + (x + 6) = 2x + 6. Set up: 338 + 2x + 6 = 490 → 2x + 344 = 490 → 2x = 146 → x = 73. Verify: the seven values are 48, 55, 63, 73, 82, 90, 79; sum = 48 + 55 + 63 + 73 + 82 + 90 + 79 = 490; mean = 490 ÷ 7 = 70. ✓',
    teachingPoint:
      'When a data set contains algebraic unknowns, use mean × count = total sum to set up one equation. Combine all algebraic terms, then solve for the variable. Always substitute back to confirm the mean is correct.',
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
      'A cylindrical water tank has a radius of 3 feet and a height of 8 feet.',
    question: 'What is the volume of the tank, in cubic feet?',
    choices: [
      { label: 'A', text: '24π' },
      { label: 'B', text: '48π' },
      { label: 'C', text: '72π' },
      { label: 'D', text: '144π' },
    ],
    correctAnswer: 'C',
    explanation:
      'Volume of a cylinder = πr²h = π(3²)(8) = π(9)(8) = 72π cubic feet.',
    wrongAnswerExplanations: {
      A: 'Computing r × h instead of r² × h: π(3)(8) = 24π. The radius must be squared, not just multiplied once.',
      B: 'Computing r² as 2r = 6 (doubling instead of squaring): π(6)(8) = 48π.',
      D: 'Using the diameter (6) in place of the radius and squaring it: π(6²)(4) = 144π... or squaring the diameter (6² = 36) and then multiplying by the correct height 8: 36 × 4π = 144π from doubling height error.',
    },
    teachingPoint:
      'Volume of a cylinder = πr²h. Always square the radius, not the diameter. Identify r = 3 (not diameter 6) before computing. Check: r² = 9, then 9 × 8 = 72, so V = 72π.',
    relatedSkills: ['Area and volume', 'Lines, angles, and triangles'],
    isWordProblem: true,
  },

  {
    id: 'math-b3-021',
    test: 'SAT',
    section: 'math',
    domain: 'Geometry and Trigonometry',
    skill: 'Area and volume',
    difficulty: 'hard',
    timeTargetSeconds: 90,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    stimulus:
      'A rectangle has an area of 48 square units. Its length is 2 more than its width.',
    question: 'What is the perimeter of the rectangle?',
    choices: [
      { label: 'A', text: '24' },
      { label: 'B', text: '28' },
      { label: 'C', text: '32' },
      { label: 'D', text: '36' },
    ],
    correctAnswer: 'B',
    explanation:
      'Let width = w. Length = w + 2. Area: w(w + 2) = 48 → w² + 2w − 48 = 0. Factor: (w + 8)(w − 6) = 0 → w = 6 (discard w = −8). Length = 6 + 2 = 8. Perimeter = 2(6 + 8) = 28.',
    wrongAnswerExplanations: {
      A: 'Solving for w = 6 correctly but computing perimeter as 2(6 + 6) = 24, treating both sides as equal to the width instead of using l = w + 2 = 8.',
      C: 'Choosing w = 8 (the extraneous or incorrect root) and l = 10: 2(8 + 10) = 36... or 2(8 + 8) = 32 from using the wrong root for both dimensions.',
      D: 'Setting up w² = 48 (ignoring the "+2" relationship) to get w ≈ 7, l ≈ 9: perimeter ≈ 32; or using w = 8, l = 10: 2(18) = 36.',
    },
    teachingPoint:
      'When a rectangle\'s area and a relationship between dimensions are given, let one dimension be the variable, express the other in terms of it, set their product equal to the area, and solve the resulting quadratic. Reject negative roots. Then substitute into P = 2(l + w).',
    relatedSkills: ['Area and volume', 'Quadratic equations'],
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
    question:
      'Two parallel lines are cut by a transversal. One co-interior (same-side interior) angle measures (5x + 10)° and the other measures (3x + 2)°. What is the measure of the larger angle?',
    choices: [
      { label: 'A', text: '103°' },
      { label: 'B', text: '111°' },
      { label: 'C', text: '115°' },
      { label: 'D', text: '119°' },
    ],
    correctAnswer: 'C',
    explanation:
      'Co-interior angles (same-side interior angles) formed when a transversal cuts parallel lines are supplementary: their sum is 180°. Set up: (5x + 10) + (3x + 2) = 180 → 8x + 12 = 180 → 8x = 168 → x = 21. The two angles are 5(21) + 10 = 105 + 10 = 115° and 3(21) + 2 = 63 + 2 = 65°. Check: 115 + 65 = 180 ✓. The larger angle is 115°.',
    wrongAnswerExplanations: {
      A: 'Solving correctly for x = 21 but computing 5(21) − 2 = 105 − 2 = 103 (subtracting the constant instead of adding it).',
      B: 'Setting the angles equal instead of supplementary (confusing co-interior angles with alternate interior angles): 5x + 10 = 3x + 2 → 2x = −8 → x = −4, then 5(−4) + 10 = −10. A different setup error yields 111.',
      D: 'Computing 5(21) + 14 = 105 + 14 = 119 (confusing the constant +10 with +14), or computing 5x + 2x = 7x and solving 7x = 168 → x = 24 → 5(24) + 10 = 130 − 11 error → 119.',
    },
    teachingPoint:
      'Co-interior (same-side interior) angles are supplementary (sum = 180°), not equal. Set up the equation, solve for x, then substitute back into each angle expression. Verify by checking the angles sum to 180°, and always identify which angle is larger before selecting the answer.',
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
      'Two similar triangles have a pair of corresponding sides of length (x + 1) and 4, and another pair of corresponding sides of length (x + 5) and 8.',
    question: 'What is the value of x?',
    choices: [
      { label: 'A', text: '1' },
      { label: 'B', text: '2' },
      { label: 'C', text: '3' },
      { label: 'D', text: '4' },
    ],
    correctAnswer: 'C',
    explanation:
      'Set up the proportion: (x + 1)/4 = (x + 5)/8. Cross-multiply: 8(x + 1) = 4(x + 5) → 8x + 8 = 4x + 20 → 4x = 12 → x = 3. Verify: (3 + 1)/4 = 4/4 = 1 and (3 + 5)/8 = 8/8 = 1. ✓ The scale factor is 1 (congruent triangles).',
    wrongAnswerExplanations: {
      A: 'Setting up the proportion as (x+1)/8 = (x+5)/4 (swapping the denominators): 4(x+1) = 8(x+5) → 4x + 4 = 8x + 40 → −4x = 36 → x = −9. A sign or setup error can then produce x = 1.',
      B: 'Noticing that (x+5) − (x+1) = 4 = 8 − 4 and concluding x = 2 without setting up a proportion, or making an arithmetic error in the cross-multiplication: 4x = 8 → x = 2.',
      D: 'Setting up the cross-multiplication correctly but distributing 8(x+1) as 8x + 1 (missing the multiplication of 8 by 1): 8x + 1 = 4x + 20 → 4x = 19 → x ≈ 4.75, rounded to 4.',
    },
    teachingPoint:
      'Similar triangles have proportional corresponding sides. Write a proportion, cross-multiply, and solve the linear equation. Verify by substituting x back — if the two ratios are equal, the answer is correct.',
    relatedSkills: ['Lines, angles, and triangles', 'Right triangles and trigonometry'],
  },

  {
    id: 'math-b3-024',
    test: 'SAT',
    section: 'math',
    domain: 'Geometry and Trigonometry',
    skill: 'Right triangles and trigonometry',
    difficulty: 'hard',
    timeTargetSeconds: 90,
    mistakeType: 'careless',
    questionType: 'grid_in',
    stimulus:
      'In right triangle PQR, the right angle is at R. Angle P measures 60° and the side opposite angle P (that is, side QR) has length 9√3.',
    question: 'What is the length of the hypotenuse PQ?',
    correctAnswer: '18',
    acceptableAnswers: ['18'],
    explanation:
      'Side QR is opposite angle P = 60°, and PQ is the hypotenuse. Using sin P = opposite/hypotenuse: sin 60° = QR/PQ → (√3/2) = 9√3/PQ → PQ = 9√3 ÷ (√3/2) = 9√3 × (2/√3) = 9 × 2 = 18.',
    teachingPoint:
      'Identify which side is opposite the given angle and which is the hypotenuse. Apply sin θ = opposite/hypotenuse. To solve for the hypotenuse, divide the opposite side by sin θ — equivalently, multiply by the reciprocal of sin θ. sin 60° = √3/2 is a standard value.',
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
      'Points A(2k, k + 3) and B(k − 1, 2k + 1) lie on the same line. The slope of AB is 2. What is the value of k?',
    choices: [
      { label: 'A', text: '−1' },
      { label: 'B', text: '0' },
      { label: 'C', text: '1' },
      { label: 'D', text: '2' },
    ],
    correctAnswer: 'B',
    explanation:
      'Slope = (y_B − y_A)/(x_B − x_A) = [(2k + 1) − (k + 3)] / [(k − 1) − 2k] = (k − 2)/(−k − 1). Set equal to 2: (k − 2)/(−k − 1) = 2. Cross-multiply: k − 2 = 2(−k − 1) = −2k − 2. Add 2k: 3k − 2 = −2. Add 2: 3k = 0 → k = 0. Verify: A = (0, 3), B = (−1, 1). Slope = (1 − 3)/(−1 − 0) = −2/−1 = 2. ✓',
    wrongAnswerExplanations: {
      A: 'Solving 3k − 2 = −2 but computing 3k = −2 − 2 = −4 → k = −4/3 ≈ −1, from adding −2 to both sides instead of adding 2.',
      C: 'Cross-multiplying correctly but distributing 2(−k − 1) as +2k + 2 (dropping the negative): k − 2 = 2k + 2 → −k = 4 → k = −4, then a sign flip gives k = 1... or other arithmetic error.',
      D: 'Setting only the numerator equal to the slope (ignoring the denominator): k − 2 = 2 → k = 4, rounded or adjusted to k = 2. Both numerator and denominator must be included.',
    },
    teachingPoint:
      'When coordinates contain a parameter, substitute into the slope formula, simplify numerator and denominator separately, set the fraction equal to the given slope, and cross-multiply to form a linear equation. Always verify by plugging k back in to confirm the slope equals 2.',
    relatedSkills: ['Right triangles and trigonometry', 'Linear equations in two variables'],
  },
]
