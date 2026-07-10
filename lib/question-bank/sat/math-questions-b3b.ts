import type { QBQuestion } from '../types'

export const mathQuestionsB3b: QBQuestion[] = [
  // ─────────────────────────────────────────────────────────────────────────────
  // GROUP A: Algebra
  // ─────────────────────────────────────────────────────────────────────────────

  {
    id: 'math-b3-026',
    test: 'SAT',
    section: 'math',
    domain: 'Algebra',
    skill: 'Linear equations in one variable',
    difficulty: 'hard',
    timeTargetSeconds: 90,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    isWordProblem: true,
    question:
      'A plumbing company charges a $100 dispatch fee plus $80 per hour for the first 4 hours. Each additional hour beyond the fourth is billed at $100 (a 25% overtime rate). Any job that requires replacement parts also incurs a flat $55 materials fee. A customer receives a bill of $775 and the invoice confirms parts were used. How many total hours did the plumber work?',
    choices: [
      { label: 'A', text: '4' },
      { label: 'B', text: '5' },
      { label: 'C', text: '6' },
      { label: 'D', text: '7' },
    ],
    correctAnswer: 'D',
    explanation:
      'Fixed costs: $100 dispatch + $55 materials = $155. Cost for the first 4 regular hours: 4 × $80 = $320. Total after 4 hours with fixed fees: $155 + $320 = $475. Remaining amount: $775 − $475 = $300. Overtime hours: $300 / $100 = 3. Total hours: 4 + 3 = 7. Verify: $100 + $55 + 4($80) + 3($100) = $100 + $55 + $320 + $300 = $775 ✓.',
    wrongAnswerExplanations: {
      A: '4 hours (no overtime): bill = $100 + $55 + 4($80) = $475 ≠ $775. The bill is far too low — the remaining $300 must be explained by overtime.',
      B: '5 hours (1 overtime hour): bill = $100 + $55 + $320 + $100 = $575 ≠ $775.',
      C: '6 hours (2 overtime hours): bill = $100 + $55 + $320 + $200 = $675 ≠ $775.',
    },
    teachingPoint:
      'Tiered billing with multiple fixed fees: list every component separately (dispatch, materials, regular hours, overtime hours). Compute all fixed and regular-time costs first, then divide the remaining amount by the overtime rate to find overtime hours. Here $775 − $155 − $320 = $300 remaining, and $300 / $100 = 3 overtime hours, giving 4 + 3 = 7 total hours.',
    relatedSkills: ['Linear functions', 'Linear inequalities'],
  },

  {
    id: 'math-b3-027',
    test: 'SAT',
    section: 'math',
    domain: 'Algebra',
    skill: 'Linear equations in two variables',
    difficulty: 'easy',
    timeTargetSeconds: 60,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    isWordProblem: true,
    question:
      'A warehouse manager models monthly storage cost with C = 3.50w + 120n, where w is the total weight in pounds of goods stored and n is the number of storage units rented. Which of the following is the best interpretation of the number 120 in this equation?',
    choices: [
      { label: 'A', text: 'The total cost when 120 units are rented' },
      { label: 'B', text: 'The cost per pound of goods stored' },
      { label: 'C', text: 'The monthly cost per storage unit rented, independent of weight' },
      { label: 'D', text: 'The total storage cost when no goods are stored' },
    ],
    correctAnswer: 'C',
    explanation:
      'In C = 3.50w + 120n, the coefficient 120 is multiplied by n, the number of storage units rented. It represents the flat monthly cost added per additional storage unit, regardless of how much weight is stored. Each additional unit rented increases monthly cost by $120.',
    wrongAnswerExplanations: {
      A: 'The total cost when 120 units are rented would also depend on w. The number 120 is a per-unit rate, not a total cost for a specific quantity.',
      B: 'The cost per pound is 3.50, the coefficient of w. The number 120 is the coefficient of n, the number of units.',
      D: 'When w = 0, the cost is still 120n, which depends on n. The number 120 is a per-unit rate, not a standalone fixed cost.',
    },
    teachingPoint:
      'In a two-variable linear model, each coefficient is the rate of change for its paired variable. The coefficient 120 tells you how much C increases per additional storage unit rented, holding weight constant.',
    relatedSkills: ['Linear functions', 'Linear equations in one variable'],
  },

  {
    id: 'math-b3-028',
    test: 'SAT',
    section: 'math',
    domain: 'Algebra',
    skill: 'Systems of two linear equations',
    difficulty: 'medium',
    timeTargetSeconds: 75,
    mistakeType: 'careless',
    questionType: 'multiple_choice',
    question:
      'What is the solution (x, y) to the system of equations below?\n5x + 3y = 29\n3x − 2y = 6',
    choices: [
      { label: 'A', text: '(4, 3)' },
      { label: 'B', text: '(3, 4)' },
      { label: 'C', text: '(1, 8)' },
      { label: 'D', text: '(5, 2)' },
    ],
    correctAnswer: 'A',
    explanation:
      'The y-coefficients (+3 and −2) are not opposites, so use elimination. Multiply the first equation by 2: 10x + 6y = 58. Multiply the second equation by 3: 9x − 6y = 18. Add the two new equations: (10x + 6y) + (9x − 6y) = 58 + 18, giving 19x = 76 and x = 4. Substitute x = 4 into the first equation: 5(4) + 3y = 29, so 20 + 3y = 29 and y = 3. The solution is (4, 3). Verify in the second equation: 3(4) − 2(3) = 12 − 6 = 6 ✓.',
    wrongAnswerExplanations: {
      B: '(3, 4): x and y values are swapped. Check: 5(3) + 3(4) = 15 + 12 = 27 ≠ 29. Swapping coordinates is a common error when both numbers appear in the solution.',
      C: '(1, 8): check 5(1) + 3(8) = 5 + 24 = 29 ✓ for the first equation, but 3(1) − 2(8) = 3 − 16 = −13 ≠ 6. This point satisfies only the first equation.',
      D: '(5, 2): check 5(5) + 3(2) = 25 + 6 = 31 ≠ 29. A careless arithmetic error — perhaps targeting 31 rather than 29.',
    },
    teachingPoint:
      'When y-coefficients are not already opposite, create opposite coefficients using the LCM method: multiply equation 1 by 2 and equation 2 by 3 to produce +6y and −6y, then add to eliminate y. Always verify the solution in both original equations.',
    relatedSkills: ['Linear equations in one variable', 'Linear functions'],
  },

  {
    id: 'math-b3-029',
    test: 'SAT',
    section: 'math',
    domain: 'Algebra',
    skill: 'Systems of two linear equations',
    difficulty: 'hard',
    timeTargetSeconds: 90,
    mistakeType: 'concept error',
    questionType: 'grid_in',
    question:
      'In the system of equations below, what is the value of 3x − 2y?\n3x + 2y = 19\nx + 4y = 13',
    correctAnswer: '11',
    acceptableAnswers: ['11'],
    explanation:
      'From the second equation, x = 13 − 4y. Substitute into the first: 3(13 − 4y) + 2y = 19, giving 39 − 12y + 2y = 19, so −10y = −20 and y = 2. Then x = 13 − 4(2) = 13 − 8 = 5. Verify: 3(5) + 2(2) = 15 + 4 = 19 ✓ and 5 + 4(2) = 13 ✓. Now evaluate: 3x − 2y = 3(5) − 2(2) = 15 − 4 = 11.',
    teachingPoint:
      'When the answer requested is an expression (3x − 2y) rather than just x or y, solve the system completely for both variables first, then evaluate the expression. Do not try to shortcut by manipulating the equations to directly produce the expression — solve for x and y individually and verify in both equations before computing.',
    relatedSkills: ['Linear equations in one variable', 'Linear functions'],
  },

  {
    id: 'math-b3-030',
    test: 'SAT',
    section: 'math',
    domain: 'Algebra',
    skill: 'Linear inequalities',
    difficulty: 'hard',
    timeTargetSeconds: 90,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    isWordProblem: true,
    question:
      'A bakery produces loaves of bread at a cost of $2.80 per loaf. City health regulations require the bakery to produce at least 60 loaves per day, and the oven can handle at most 150 loaves per day. In addition, the bakery\'s daily ingredient budget requires spending at least $196 but no more than $336 on production costs. Only whole numbers of loaves may be produced each day. Which of the following is a valid daily production amount?',
    choices: [
      { label: 'A', text: '55' },
      { label: 'B', text: '70' },
      { label: 'C', text: '125' },
      { label: 'D', text: '155' },
    ],
    correctAnswer: 'B',
    explanation:
      'Let n = number of loaves. Write all constraints: (1) n ≥ 60 (health regulation floor); (2) n ≤ 150 (oven capacity ceiling); (3) 196 ≤ 2.80n ≤ 336 (budget range). Solve the budget inequality: 196 / 2.80 = 70 and 336 / 2.80 = 120, giving 70 ≤ n ≤ 120. Intersect all constraints: effective floor = max(60, 70) = 70 (budget is more restrictive); effective ceiling = min(150, 120) = 120 (budget is more restrictive). Valid range: 70 ≤ n ≤ 120. Check each choice: A) 55 — below the health minimum (60) and budget floor (70); B) 70 — exactly at the binding lower bound: 70 ≤ 70 ≤ 120 ✓, cost = 2.80 × 70 = $196 ✓; C) 125 — exceeds budget ceiling: 2.80 × 125 = $350 > $336; D) 155 — exceeds oven capacity (150) and budget ceiling.',
    wrongAnswerExplanations: {
      A: '55 loaves violates both the health regulation minimum of 60 loaves and the budget floor (2.80 × 55 = $154 < $196). Two separate constraints are violated.',
      C: '125 loaves produces ingredient cost 2.80 × 125 = $350, which exceeds the daily budget maximum of $336, even though it is within the oven capacity.',
      D: '155 loaves exceeds the oven capacity limit of 150 loaves per day and also violates the budget ceiling ($2.80 × 155 = $434 > $336).',
    },
    teachingPoint:
      'Compound inequality problems with multiple constraints: translate each constraint into an inequality, solve the budget inequality separately (70 ≤ n ≤ 120), then find the intersection of all constraints. Effective bounds: floor = max of all lower bounds = 70; ceiling = min of all upper bounds = 120. The budget constraints are more binding than the operational ones.',
    relatedSkills: ['Linear equations in one variable', 'Systems of two linear equations'],
  },

  {
    id: 'math-b3-031',
    test: 'SAT',
    section: 'math',
    domain: 'Algebra',
    skill: 'Linear functions',
    difficulty: 'medium',
    timeTargetSeconds: 75,
    mistakeType: 'careless',
    questionType: 'multiple_choice',
    question:
      'Line ℓ passes through the points (−4, 9) and (2, −3). Line m is perpendicular to line ℓ and passes through the point (1, 4). What is the y-coordinate of the point where line m crosses the y-axis?',
    choices: [
      { label: 'A', text: '7/2' },
      { label: 'B', text: '5' },
      { label: 'C', text: '9/2' },
      { label: 'D', text: '7' },
    ],
    correctAnswer: 'A',
    explanation:
      'Step 1 — slope of ℓ: (−3 − 9) / (2 − (−4)) = −12 / 6 = −2. Step 2 — slope of m (negative reciprocal of −2): 1/2. Step 3 — equation of m through (1, 4) with slope 1/2: y − 4 = (1/2)(x − 1), so y = (1/2)x − 1/2 + 4 = (1/2)x + 7/2. Step 4 — y-intercept (set x = 0): y = 7/2. The y-axis crossing is at y = 7/2.',
    wrongAnswerExplanations: {
      B: '5: an arithmetic error in point-slope expansion — adding 1/2 instead of subtracting 1/2 from 4, giving y = (1/2)x + 9/2 and then computing 9/2 ≈ 4.5 or misreading the answer as 5.',
      C: '9/2: computing (1/2)(−1) = +1/2 (sign error) and then 4 + 1/2 = 9/2. The correct expansion gives (1/2)(−1) = −1/2, so the y-intercept is 4 − 1/2 = 7/2, not 9/2.',
      D: '7: using the slope of line ℓ (−2) instead of the perpendicular slope (1/2) for line m — writing y − 4 = −2(x − 1) gives y = −2x + 6, y-intercept 6; or confusing the x-coordinate of the given point (x = 1) with a y-value.',
    },
    teachingPoint:
      'Four-step perpendicular line problem: (1) slope from two points; (2) perpendicular slope = negative reciprocal; (3) point-slope form; (4) set x = 0 for the y-intercept. When the perpendicular slope is 1/2, expanding (1/2)(x − 1) gives (1/2)x − 1/2, so the y-intercept = 4 − 1/2 = 7/2.',
    relatedSkills: ['Linear equations in two variables', 'Linear equations in one variable'],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // GROUP B: Advanced Math
  // ─────────────────────────────────────────────────────────────────────────────

  {
    id: 'math-b3-032',
    test: 'SAT',
    section: 'math',
    domain: 'Advanced Math',
    skill: 'Quadratic equations',
    difficulty: 'medium',
    timeTargetSeconds: 75,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    question:
      'The function f(x) = 3x² − 18x + 7 has its vertex at the point (h, k). What is the minimum value of f(x)?',
    choices: [
      { label: 'A', text: '−30' },
      { label: 'B', text: '−27' },
      { label: 'C', text: '−20' },
      { label: 'D', text: '7' },
    ],
    correctAnswer: 'C',
    explanation:
      'Find h = −b/(2a) = −(−18)/(2 × 3) = 18/6 = 3. Find k = f(3) = 3(3²) − 18(3) + 7 = 27 − 54 + 7 = −20. Since a = 3 > 0 the parabola opens upward, so the minimum value is k = −20.',
    wrongAnswerExplanations: {
      A: '−30: computing 3(9) − 18(3) + 7 = 27 − 54 + 7 but then subtracting 7 instead of adding, getting 27 − 54 − 7 = −34, or misreading −20 as −30.',
      B: '−27: omitting the constant term +7 and computing only 3(9) − 18(3) = 27 − 54 = −27. The constant c = 7 must be included when evaluating f(3).',
      D: '7: using the y-intercept f(0) = 7 as the minimum value. The minimum occurs at the vertex (x = 3), not at x = 0.',
    },
    teachingPoint:
      'For f(x) = ax² + bx + c with a > 0, the minimum value is k = f(h) where h = −b/(2a). Here h = 3 and k = f(3) = 3(9) − 18(3) + 7 = −20. Do not forget to include the constant term c = 7 when evaluating f(h). The y-intercept (f(0) = 7) is not the minimum.',
    relatedSkills: ['Polynomial functions', 'Advanced Math'],
  },

  {
    id: 'math-b3-033',
    test: 'SAT',
    section: 'math',
    domain: 'Advanced Math',
    skill: 'Quadratic equations',
    difficulty: 'hard',
    timeTargetSeconds: 90,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    question:
      'The equation 2x² + kx + 18 = 0 has exactly one real solution. Which of the following could be a value of k?',
    choices: [
      { label: 'A', text: '6' },
      { label: 'B', text: '10' },
      { label: 'C', text: '12' },
      { label: 'D', text: '15' },
    ],
    correctAnswer: 'C',
    explanation:
      'For exactly one real solution the discriminant must equal zero: b² − 4ac = 0. Here a = 2, b = k, c = 18. Setting discriminant to zero: k² − 4(2)(18) = k² − 144 = 0, so k² = 144 and k = ±12. Among the choices, k = 12. Verify: 2x² + 12x + 18 = 2(x² + 6x + 9) = 2(x + 3)², which has exactly one solution x = −3 ✓.',
    wrongAnswerExplanations: {
      A: 'k = 6: discriminant = 6² − 144 = 36 − 144 = −108 < 0. No real solutions exist — not exactly one.',
      B: 'k = 10: discriminant = 100 − 144 = −44 < 0. Still no real solutions.',
      D: 'k = 15: discriminant = 225 − 144 = 81 > 0. Two distinct real solutions exist (√81 = 9), not exactly one.',
    },
    teachingPoint:
      'Exactly one real solution (a repeated root) requires discriminant = 0: k² = 4ac = 4(2)(18) = 144, so k = ±12. With k = 12: 2x² + 12x + 18 = 2(x + 3)² — confirm by expanding. A negative discriminant means no real solutions; a positive discriminant means two.',
    relatedSkills: ['Polynomial functions', 'Linear inequalities'],
  },

  {
    id: 'math-b3-034',
    test: 'SAT',
    section: 'math',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'hard',
    timeTargetSeconds: 90,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    question:
      'The functions f(x) = x² − 2x and g(x) = x + 4 intersect at two points. What is the sum of the x-coordinates of the two intersection points?',
    choices: [
      { label: 'A', text: '1' },
      { label: 'B', text: '3' },
      { label: 'C', text: '5' },
      { label: 'D', text: '7' },
    ],
    correctAnswer: 'B',
    explanation:
      'Set f(x) = g(x): x² − 2x = x + 4. Rearrange: x² − 3x − 4 = 0. Factor: (x − 4)(x + 1) = 0, giving x = 4 or x = −1. Verify: f(4) = 16 − 8 = 8 and g(4) = 4 + 4 = 8 ✓; f(−1) = 1 + 2 = 3 and g(−1) = −1 + 4 = 3 ✓. Sum of x-coordinates: 4 + (−1) = 3. By Vieta\'s formulas, for x² − 3x − 4 = 0, the sum of roots = −(−3)/1 = 3.',
    wrongAnswerExplanations: {
      A: '1: a sign error in rearranging — writing x² − x − 4 = 0 instead of x² − 3x − 4 = 0, then applying Vieta\'s to get sum = 1.',
      C: '5: computing the difference |4 − (−1)| = 5 instead of the sum. The problem asks for 4 + (−1) = 3, not the distance between the intersection x-values.',
      D: '7: a sign error when moving x + 4 to the left side — writing x² − 2x − x − 4 = 0 as x² − x − 4 = 0 (combining −2x and −x incorrectly as −x instead of −3x), then finding different roots.',
    },
    teachingPoint:
      'To find intersections of a parabola and a line: set equal, move all terms to one side to form ax² + bx + c = 0, and factor. The sum of the two x-values equals −b/a by Vieta\'s formulas (a fast check). Here x² − 3x − 4 = 0 gives sum = 3. Always verify both intersection points in both original functions.',
    relatedSkills: ['Quadratic equations', 'Polynomial functions'],
  },

  {
    id: 'math-b3-035',
    test: 'SAT',
    section: 'math',
    domain: 'Advanced Math',
    skill: 'Polynomial functions',
    difficulty: 'medium',
    timeTargetSeconds: 75,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    question:
      'The polynomial p(x) = 6x³ − 11x² − 3x + 2 has x = 2 as one of its roots. Which of the following shows the complete factored form of p(x)?',
    choices: [
      { label: 'A', text: '(x − 2)(6x² + x + 1)' },
      { label: 'B', text: '(x − 2)(2x + 1)(3x − 1)' },
      { label: 'C', text: '(x − 2)(2x − 1)(3x + 1)' },
      { label: 'D', text: '(x + 2)(2x + 1)(3x − 1)' },
    ],
    correctAnswer: 'B',
    explanation:
      'Since x = 2 is a root, (x − 2) is a factor. Use synthetic division with root 2 on coefficients 6, −11, −3, 2. Bring down 6. Multiply 6 × 2 = 12; add: −11 + 12 = 1. Multiply 1 × 2 = 2; add: −3 + 2 = −1. Multiply −1 × 2 = −2; add: 2 + (−2) = 0. The quotient is 6x² + x − 1. Factor 6x² + x − 1 using the AC method (a · c = 6 · (−1) = −6; factors of −6 that sum to +1 are +3 and −2): 6x² + 3x − 2x − 1 = 3x(2x + 1) − 1(2x + 1) = (3x − 1)(2x + 1). So p(x) = (x − 2)(2x + 1)(3x − 1). Verify: p(2) = 6(8) − 11(4) − 6 + 2 = 48 − 44 − 6 + 2 = 0 ✓.',
    wrongAnswerExplanations: {
      A: '(x − 2)(6x² + x + 1): the quadratic 6x² + x + 1 does not factor over the integers (discriminant = 1 − 24 = −23 < 0), so this form is incomplete. The correct quotient from synthetic division is 6x² + x − 1 (note the negative constant), not 6x² + x + 1.',
      C: '(x − 2)(2x − 1)(3x + 1): expanding gives (x−2)(6x² + 2x − 3x − 1) = (x−2)(6x² − x − 1). But the correct quotient is 6x² + x − 1, not 6x² − x − 1. This results from a sign error in the synthetic division remainder.',
      D: '(x + 2)(2x + 1)(3x − 1): uses (x + 2) implying x = −2 is a root. Check: p(−2) = 6(−8) − 11(4) − 3(−2) + 2 = −48 − 44 + 6 + 2 = −84 ≠ 0.',
    },
    teachingPoint:
      'When given a root, perform synthetic division to find the quotient polynomial, then factor the quotient using the AC method. Here synthetic division by 2 yields quotient 6x² + x − 1, and 6x² + x − 1 = (2x + 1)(3x − 1). Verify the original root p(2) = 0 and confirm the factored form expands back to the original polynomial.',
    relatedSkills: ['Quadratic equations', 'Nonlinear functions'],
  },

  {
    id: 'math-b3-036',
    test: 'SAT',
    section: 'math',
    domain: 'Advanced Math',
    skill: 'Rational expressions',
    difficulty: 'hard',
    timeTargetSeconds: 90,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    question:
      'Which of the following is equivalent to (2x² − 5x − 3) / (2x² − x − 1) for all values where the expression is defined?',
    choices: [
      { label: 'A', text: '(x − 3) / (x − 1)' },
      { label: 'B', text: '(2x + 1) / (x + 1)' },
      { label: 'C', text: '(x + 3) / (x + 1)' },
      { label: 'D', text: '(x − 3) / (x + 1)' },
    ],
    correctAnswer: 'A',
    explanation:
      'Factor the numerator 2x² − 5x − 3 using the AC method (a · c = 2 · (−3) = −6; factors of −6 that sum to −5 are −6 and +1): 2x² − 6x + x − 3 = 2x(x − 3) + 1(x − 3) = (2x + 1)(x − 3). Factor the denominator 2x² − x − 1 (a · c = −2; factors of −2 that sum to −1 are −2 and +1): 2x² − 2x + x − 1 = 2x(x − 1) + 1(x − 1) = (2x + 1)(x − 1). Cancel the common factor (2x + 1): result = (x − 3)/(x − 1), valid for x ≠ −1/2 and x ≠ 1.',
    wrongAnswerExplanations: {
      B: '(2x + 1)/(x + 1): fails to cancel (2x + 1) and misidentifies the remaining denominator factor. Check: (2x+1)(x+1) = 2x² + 3x + 1, which is not the denominator 2x² − x − 1.',
      C: '(x + 3)/(x + 1): a sign error in factoring the numerator — writing (x + 3) instead of (x − 3). Check: (2x + 1)(x + 3) = 2x² + 7x + 3 ≠ 2x² − 5x − 3.',
      D: '(x − 3)/(x + 1): the numerator factor (x − 3) is correct after cancellation, but the remaining denominator is (x − 1), not (x + 1). A sign error in factoring the denominator leads to this mistake.',
    },
    teachingPoint:
      'To simplify rational expressions with leading coefficient a ≠ 1, use the AC method on both numerator and denominator. Identify the common factor (here 2x + 1) by comparing the factored forms and cancel it. Verify each factored form by expanding before simplifying.',
    relatedSkills: ['Polynomial functions', 'Quadratic equations'],
  },

  {
    id: 'math-b3-037',
    test: 'SAT',
    section: 'math',
    domain: 'Advanced Math',
    skill: 'Exponential functions',
    difficulty: 'hard',
    timeTargetSeconds: 90,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    isWordProblem: true,
    question:
      'At time t = 0 hours, a bacterial culture contains 500 cells. The population triples every 5 hours. What is the population at t = 20 hours?',
    choices: [
      { label: 'A', text: '10,000' },
      { label: 'B', text: '20,000' },
      { label: 'C', text: '40,500' },
      { label: 'D', text: '121,500' },
    ],
    correctAnswer: 'C',
    explanation:
      'The population model is P(t) = 500 × 3^(t/5). At t = 20: the exponent is 20/5 = 4 tripling periods. P(20) = 500 × 3^4 = 500 × 81 = 40,500. Verify by tracing: t = 0 → 500; t = 5 → 1,500; t = 10 → 4,500; t = 15 → 13,500; t = 20 → 40,500 ✓.',
    wrongAnswerExplanations: {
      A: '10,000: result of linear thinking — treating growth as additive rather than multiplicative, e.g., computing 500 + 1,500 × 4 = 6,500 and then misreading, or some other non-exponential calculation.',
      B: '20,000: perhaps misidentifying the base as 2 and computing 500 × 2^(20/5) = 500 × 16 = 8,000, then doubling erroneously, or applying a partial exponential rule incorrectly.',
      D: '121,500 = 500 × 3^5: using 5 tripling periods (corresponding to t = 25) instead of 4. The number of tripling periods from t = 0 to t = 20 is 20/5 = 4, not 5.',
    },
    teachingPoint:
      'For exponential growth with tripling time d, the model is P(t) = P₀ × 3^(t/d). The exponent t/d counts the number of complete tripling periods. At t = 20 with d = 5, there are exactly 4 periods: 3^4 = 81, giving P(20) = 500 × 81 = 40,500. Tracing step-by-step (500 → 1,500 → 4,500 → 13,500 → 40,500) is the most reliable verification.',
    relatedSkills: ['Nonlinear functions', 'Ratios, rates, proportional relationships'],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // GROUP C: Problem-Solving and Data Analysis
  // ─────────────────────────────────────────────────────────────────────────────

  {
    id: 'math-b3-038',
    test: 'SAT',
    section: 'math',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Ratios, rates, proportional relationships',
    difficulty: 'medium',
    timeTargetSeconds: 75,
    mistakeType: 'time issue',
    questionType: 'multiple_choice',
    isWordProblem: true,
    question:
      'A concrete mix requires cement, sand, and gravel in the ratio 2:3:7 by weight. A contractor first prepares a batch totaling 480 kilograms. She then prepares a second batch that is 1.5 times the weight of the first batch. How many total kilograms of sand are used across both batches combined?',
    choices: [
      { label: 'A', text: '120' },
      { label: 'B', text: '180' },
      { label: 'C', text: '300' },
      { label: 'D', text: '360' },
    ],
    correctAnswer: 'C',
    explanation:
      'The ratio 2:3:7 has 2 + 3 + 7 = 12 total parts. Sand accounts for 3/12 = 1/4 of the mixture. First batch sand: 480 × (1/4) = 120 kg. Second batch total weight: 480 × 1.5 = 720 kg. Second batch sand: 720 × (1/4) = 180 kg. Total sand: 120 + 180 = 300 kg.',
    wrongAnswerExplanations: {
      A: '120 kg: the correct sand amount for the first batch only. The second batch (720 kg × 1/4 = 180 kg of sand) was not added.',
      B: '180 kg: the correct sand amount for the second batch only. The first batch sand (120 kg) was not included.',
      D: '360 kg: computing sand as 1/3 of each batch (misreading the sand part as 1/3 of the total ratio rather than 3/12 = 1/4), giving 160 + 240 = 400, or using the full combined weight 1,200 × 1/4 = 300 but then adding incorrectly.',
    },
    teachingPoint:
      'In a three-component ratio, each component fraction = its part / total parts. Sand = 3/(2+3+7) = 1/4. Compute each batch separately: first batch 480 × 1/4 = 120 kg; second batch 720 × 1/4 = 180 kg; total = 300 kg. Note: "1.5 times the weight" means the second batch is 720 kg total, not 480 + 1.5 × 480.',
    relatedSkills: ['Percentages', 'Linear equations in one variable'],
  },

  {
    id: 'math-b3-039',
    test: 'SAT',
    section: 'math',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Percentages',
    difficulty: 'hard',
    timeTargetSeconds: 90,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    isWordProblem: true,
    question:
      'A retailer purchases a jacket for $100 wholesale. She marks up the price by 60%. Later she discounts the marked-up price by 25%. A customer then uses a coupon for an additional 10% off the discounted price, and 8% sales tax is applied to the coupon price. What is the final price the customer pays?',
    choices: [
      { label: 'A', text: '$99.29' },
      { label: 'B', text: '$108.00' },
      { label: 'C', text: '$116.64' },
      { label: 'D', text: '$130.37' },
    ],
    correctAnswer: 'C',
    explanation:
      'Apply each step sequentially using multipliers. After 60% markup: $100 × 1.60 = $160. After 25% discount: $160 × 0.75 = $120. After 10% coupon: $120 × 0.90 = $108. After 8% tax: $108 × 1.08 = $116.64. The combined multiplier is 1.60 × 0.75 × 0.90 × 1.08 = 1.1664, and $100 × 1.1664 = $116.64.',
    wrongAnswerExplanations: {
      A: '$99.29: combining all percentage changes linearly — attempting 60% − 25% − 10% + 8% = 33% net increase and computing $100 × 1.33 = $133, or $100 × (1 − 0.17) = $83, then applying further arithmetic errors. Percentage multipliers can never be summed across steps.',
      B: '$108.00: stopping after the coupon step and forgetting the 8% sales tax. $108 is the pre-tax price after markup, discount, and coupon.',
      D: '$130.37: applying the 8% tax to the $160 marked-up price before any discounts, or applying tax after only one discount and skipping the coupon — for example $160 × 0.75 × 1.08 ≈ $129.60.',
    },
    teachingPoint:
      'Four-step percentage chain: convert each step to a multiplier and apply sequentially to the running price. Markup: ×1.60; discount: ×0.75; coupon: ×0.90; tax: ×1.08. Full chain: $100 × 1.60 × 0.75 × 0.90 × 1.08 = $116.64. Never add or subtract percentage rates across steps — each percentage is applied to a different base price.',
    relatedSkills: ['Ratios, rates, proportional relationships', 'Linear equations in one variable'],
  },

  {
    id: 'math-b3-040',
    test: 'SAT',
    section: 'math',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Probability',
    difficulty: 'easy',
    timeTargetSeconds: 60,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    isWordProblem: true,
    question:
      'A bag contains red, green, and blue marbles. The probability of randomly drawing a red marble is 2/5, and the probability of drawing a green marble is 1/4. If there are 80 marbles in the bag total, how many blue marbles are there?',
    choices: [
      { label: 'A', text: '12' },
      { label: 'B', text: '20' },
      { label: 'C', text: '28' },
      { label: 'D', text: '32' },
    ],
    correctAnswer: 'C',
    explanation:
      'Find P(blue) = 1 − P(red) − P(green) = 1 − 2/5 − 1/4. Convert to a common denominator of 20: 2/5 = 8/20 and 1/4 = 5/20. So P(blue) = 20/20 − 8/20 − 5/20 = 7/20. Number of blue marbles = 80 × (7/20) = 560/20 = 28.',
    wrongAnswerExplanations: {
      A: '12: a fraction arithmetic error — perhaps computing 2/5 + 1/4 by adding numerators and denominators to get 3/9 = 1/3, and then blue = 80 × (1 − 1/3) / something, yielding 12. Always find a common denominator before subtracting fractions.',
      B: '20: computing P(blue) = 1/4 by subtracting only P(red) incorrectly, or computing 1 − 3/4 = 1/4 (treating the two given probabilities as summing to 3/4), giving 80 × 1/4 = 20.',
      D: '32: computing 2/5 × 80 = 32, which gives the number of red marbles, not blue. Or adding rather than subtracting the probabilities.',
    },
    teachingPoint:
      'All probabilities in a complete sample space sum to 1. Find P(blue) = 1 − 2/5 − 1/4, using common denominator 20: 1 − 8/20 − 5/20 = 7/20. Multiply by total: 80 × 7/20 = 28. Always convert to a common denominator before subtracting fractions.',
    relatedSkills: ['Statistics (mean/median/mode)', 'Ratios, rates, proportional relationships'],
  },

  {
    id: 'math-b3-041',
    test: 'SAT',
    section: 'math',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Probability',
    difficulty: 'medium',
    timeTargetSeconds: 75,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    isWordProblem: true,
    question:
      'A survey of 80 students found that 48 play a sport, 30 play an instrument, and 14 do both. A student is chosen at random from those who play at least one of these activities. What is the probability that the selected student plays an instrument but not a sport?',
    choices: [
      { label: 'A', text: '16/64' },
      { label: 'B', text: '16/80' },
      { label: 'C', text: '14/64' },
      { label: 'D', text: '30/80' },
    ],
    correctAnswer: 'A',
    explanation:
      'Use inclusion-exclusion to find students who participate in at least one activity: 48 + 30 − 14 = 64. Students who play instrument but not sport (instrument only) = 30 − 14 = 16. Conditional probability = 16/64 = 1/4.',
    wrongAnswerExplanations: {
      B: '16/80: correctly computes instrument-only students (16) but uses the total class size of 80 as the denominator. The problem conditions on the 64 students who play at least one activity, not all 80.',
      C: '14/64: uses the 14 who do both instead of the 16 who play instrument only. "Instrument but not sport" requires excluding those who participate in both.',
      D: '30/80: uses all 30 instrument players (including dual participants) divided by all 80 students. This ignores both the conditional sample space restriction and the requirement to exclude sport players.',
    },
    teachingPoint:
      'Two-layer conditional probability: (1) restrict the sample space using inclusion-exclusion — at-least-one = 48 + 30 − 14 = 64; (2) count the favorable outcomes within that restricted space — instrument only = 30 − 14 = 16. Probability = 16/64. The phrase "at least one activity" changes the denominator from 80 to 64.',
    relatedSkills: ['Probability', 'Ratios, rates, proportional relationships'],
  },

  {
    id: 'math-b3-042',
    test: 'SAT',
    section: 'math',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Statistics (mean/median/mode)',
    difficulty: 'hard',
    timeTargetSeconds: 90,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    question:
      'A data set is right-skewed when it has a long tail to the right. In a right-skewed distribution, which measure is greater: the mean or the median? Also, consider the data set {4, 6, 7, 8, 10, 12}. When the value 200 is added to form a 7-element set, which of the following correctly describes the effect on both measures?',
    choices: [
      { label: 'A', text: 'In a right-skewed distribution the mean equals the median; adding 200 increases both by the same amount.' },
      { label: 'B', text: 'In a right-skewed distribution the median is greater; adding 200 increases the median substantially but the mean only slightly.' },
      { label: 'C', text: 'In a right-skewed distribution the mean is greater; adding 200 increases the mean substantially but the median only slightly.' },
      { label: 'D', text: 'In a right-skewed distribution the mean is greater; adding 200 increases both the mean and the median substantially.' },
    ],
    correctAnswer: 'C',
    explanation:
      'In a right-skewed distribution, the long right tail pulls the mean toward the extreme high values while the median remains near the center. So the mean is greater than the median. For the specific data set: original {4, 6, 7, 8, 10, 12} has mean = 47/6 ≈ 7.83 and median = (7 + 8)/2 = 7.5. After adding 200, the sorted 7-element set is {4, 6, 7, 8, 10, 12, 200}. New mean = 247/7 ≈ 35.29 — an increase of about 27.5. New median = 4th value = 8 — an increase of only 0.5. The mean increases substantially; the median increases only slightly.',
    wrongAnswerExplanations: {
      A: 'The mean and median are not equal in a right-skewed distribution — extreme right-tail values pull the mean above the median. Adding the outlier 200 affects the two measures by vastly different amounts.',
      B: 'The median is resistant to outliers; the mean is not. In a right-skewed distribution the mean is pulled toward high values, making it greater — not the median. Adding 200 increases the mean dramatically while barely shifting the median.',
      D: 'The median does not increase substantially. Adding 200 to {4, 6, 7, 8, 10, 12} shifts the median from 7.5 (average of 3rd and 4th values in the 6-element set) to 8 (the 4th value in the 7-element sorted set) — an increase of only 0.5.',
    },
    teachingPoint:
      'In right-skewed data, extreme high values drag the mean rightward but barely affect the median, so mean > median. Verify: adding 200 to {4, 6, 7, 8, 10, 12} raises the mean from ≈7.83 to ≈35.29 (+27.5) but shifts the median from 7.5 to 8 (+0.5). The median depends only on position, not magnitude, so it is resistant to extreme outliers.',
    relatedSkills: ['Statistics', 'Probability'],
  },

  {
    id: 'math-b3-043',
    test: 'SAT',
    section: 'math',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Statistics',
    difficulty: 'medium',
    timeTargetSeconds: 75,
    mistakeType: 'careless',
    questionType: 'multiple_choice',
    isWordProblem: true,
    question:
      'A student scored 72, 78, 84, and 90 on four tests. After taking a fifth test, the mean of all five scores is 80. The teacher drops the single lowest score before computing the course grade. What is the student\'s course mean after the lowest score is dropped?',
    choices: [
      { label: 'A', text: '80' },
      { label: 'B', text: '82' },
      { label: 'C', text: '83' },
      { label: 'D', text: '84' },
    ],
    correctAnswer: 'B',
    explanation:
      'Required total for a mean of 80 across 5 tests: 80 × 5 = 400. Sum of the four known scores: 72 + 78 + 84 + 90 = 324. Fifth score: 400 − 324 = 76. All five scores: 72, 76, 78, 84, 90. The lowest score is 72. Drop 72; remaining four scores: 76, 78, 84, 90. Course mean = (76 + 78 + 84 + 90) / 4 = 328 / 4 = 82.',
    wrongAnswerExplanations: {
      A: '80: using the given mean of all five tests (80) as the course mean, without performing step 2 (removing the lowest score). Dropping the lowest score always raises the mean above the five-test average.',
      C: '83: dropping the fifth score (76) instead of the lowest score (72). The five scores are 72, 76, 78, 84, 90; the lowest is 72, not 76. Dropping 76 gives (72 + 78 + 84 + 90)/4 = 324/4 = 81, not 83.',
      D: '84: dropping both the lowest and the fifth score, leaving only three scores (78, 84, 90), giving mean = 252/3 = 84. Only the single lowest score is dropped, not the fifth-test score separately.',
    },
    teachingPoint:
      'Two-step problem: (1) find the fifth score using required total = target mean × count (400 − 324 = 76); (2) list all five scores (72, 76, 78, 84, 90), identify the minimum (72), remove it, and recompute the mean over the remaining four: (76 + 78 + 84 + 90)/4 = 328/4 = 82.',
    relatedSkills: ['Probability', 'Ratios, rates, proportional relationships'],
  },

  {
    id: 'math-b3-044',
    test: 'SAT',
    section: 'math',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Statistics',
    difficulty: 'hard',
    timeTargetSeconds: 90,
    mistakeType: 'time issue',
    questionType: 'grid_in',
    question:
      'A researcher recorded nine patient wait times in minutes: 18, 7, 23, 11, 35, 9, 27, 14, and 19. What is the median wait time?',
    correctAnswer: '18',
    acceptableAnswers: ['18'],
    explanation:
      'Sort all nine values in ascending order: 7, 9, 11, 14, 18, 19, 23, 27, 35. With 9 values (odd count), the median is the middle value at position (9 + 1)/2 = 5. The 5th value in the sorted list is 18.',
    teachingPoint:
      'With an odd number of data values n, the median is the single value at position (n + 1)/2 in sorted order. With 9 values, the median is at position 5. Write out all 9 values in ascending order before identifying the 5th — placing even one value out of order shifts the median. Sorted: 7, 9, 11, 14, 18, 19, 23, 27, 35. The 5th value is 18.',
    relatedSkills: ['Statistics (mean/median/mode)', 'Probability'],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // GROUP D: Geometry and Trigonometry
  // ─────────────────────────────────────────────────────────────────────────────

  {
    id: 'math-b3-045',
    test: 'SAT',
    section: 'math',
    domain: 'Geometry and Trigonometry',
    skill: 'Lines, angles, and triangles',
    difficulty: 'easy',
    timeTargetSeconds: 60,
    mistakeType: 'careless',
    questionType: 'multiple_choice',
    question:
      'Two parallel lines are cut by a transversal. One of the co-interior (same-side interior) angles measures 74°. What is the measure, in degrees, of the other co-interior angle on the same side of the transversal?',
    choices: [
      { label: 'A', text: '74' },
      { label: 'B', text: '90' },
      { label: 'C', text: '106' },
      { label: 'D', text: '116' },
    ],
    correctAnswer: 'C',
    explanation:
      'Co-interior angles (also called same-side interior or consecutive interior angles) formed by a transversal crossing two parallel lines are supplementary — they sum to 180°. If one co-interior angle is 74°, the other is 180° − 74° = 106°.',
    wrongAnswerExplanations: {
      A: '74°: co-interior angles are supplementary (sum to 180°), not equal. Equal angles would be alternate interior angles or corresponding angles.',
      B: '90°: co-interior angles sum to 180°, not 90°. Complementary pairs sum to 90° — that is a different relationship.',
      D: '116°: a subtraction error — computing 180° − 64° = 116° rather than 180° − 74° = 106°. Be careful not to misread 74° as 64°.',
    },
    teachingPoint:
      'Parallel-line angle relationships: alternate interior angles are equal; corresponding angles are equal; co-interior (same-side interior) angles are supplementary. Here 74° + 106° = 180°, confirming the supplementary relationship.',
    relatedSkills: ['Similar triangles', 'Right triangles and trigonometry'],
  },

  {
    id: 'math-b3-046',
    test: 'SAT',
    section: 'math',
    domain: 'Geometry and Trigonometry',
    skill: 'Lines, angles, and triangles',
    difficulty: 'medium',
    timeTargetSeconds: 75,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    question:
      'In triangle ABC, angle A is three times angle B, and angle C measures 40°. What is the measure, in degrees, of angle A?',
    choices: [
      { label: 'A', text: '60' },
      { label: 'B', text: '75' },
      { label: 'C', text: '90' },
      { label: 'D', text: '105' },
    ],
    correctAnswer: 'D',
    explanation:
      'Let angle B = x. Then angle A = 3x and angle C = 40°. Triangle angle sum: x + 3x + 40 = 180, giving 4x = 140 and x = 35. Therefore angle A = 3(35) = 105°. Verify: 105 + 35 + 40 = 180 ✓.',
    wrongAnswerExplanations: {
      A: '60°: computing 180/3 = 60 by assuming all angles are equal, which ignores the constraint that angle C = 40° and angle A = 3 × angle B.',
      B: '75°: a computation error — perhaps writing 4x + 40 = 180 but then computing 4x = 145 and x = 36.25, then rounding angle A = 3(25) = 75. Or misapplying the angle relationships.',
      C: '90°: confusing the problem as asking for a right angle or computing 4x = 120 (subtracting 40 from 160 instead of 140), giving x = 30 and angle A = 90.',
    },
    teachingPoint:
      'Express every angle in terms of one variable and use the triangle angle sum (180°) to write one equation. Here angle B = x, angle A = 3x, angle C = 40°: so x + 3x + 40 = 180 → 4x = 140 → x = 35, and angle A = 3(35) = 105°. Always verify the three angles sum to exactly 180°.',
    relatedSkills: ['Similar triangles', 'Lines, angles, and triangles'],
  },

  {
    id: 'math-b3-047',
    test: 'SAT',
    section: 'math',
    domain: 'Geometry and Trigonometry',
    skill: 'Similar triangles',
    difficulty: 'hard',
    timeTargetSeconds: 90,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    question:
      'Triangle PQR is similar to triangle STU, with vertices matched in order (P↔S, Q↔T, R↔U). Side PQ = 3x + 1, side ST = 5x − 3, side QR = 3y − 2, and side TU = 5y − 7. A third pair of corresponding sides gives PR = 16 and SU = 24. What is the value of x + y?',
    choices: [
      { label: 'A', text: '11' },
      { label: 'B', text: '14' },
      { label: 'C', text: '17' },
      { label: 'D', text: '20' },
    ],
    correctAnswer: 'C',
    explanation:
      'All corresponding side ratios equal the same scale factor. From the known sides: PR/SU = 16/24 = 2/3. For the first algebraic pair, set PQ/ST = 2/3: (3x + 1)/(5x − 3) = 2/3. Cross-multiply: 3(3x + 1) = 2(5x − 3), giving 9x + 3 = 10x − 6, so x = 9. Check: PQ = 3(9) + 1 = 28 and ST = 5(9) − 3 = 42; ratio 28/42 = 2/3 ✓. For the second algebraic pair, set QR/TU = 2/3: (3y − 2)/(5y − 7) = 2/3. Cross-multiply: 3(3y − 2) = 2(5y − 7), giving 9y − 6 = 10y − 14, so y = 8. Check: QR = 3(8) − 2 = 22 and TU = 5(8) − 7 = 33; ratio 22/33 = 2/3 ✓. Therefore x + y = 9 + 8 = 17.',
    wrongAnswerExplanations: {
      A: '11: a sign error in the cross-multiplication for the first proportion — expanding 3(3x + 1) = 2(5x − 3) as 9x + 3 = 10x + 6 (instead of 10x − 6) and getting x = −3, then computing |−3| + 8 = 11.',
      B: '14: an arithmetic error in solving for x — perhaps computing 9x + 3 = 10x − 6 correctly but then solving as x = 9 − 3 = 6 (misapplying the algebra), then 6 + 8 = 14.',
      D: '20: a sign error in the second proportion — expanding 3(3y − 2) = 2(5y − 7) as 9y − 6 = 10y − 14 correctly but then computing y = −14 + 6 = −8 and then taking |−8| = 8, while also making an error in x to get x = 12, giving 12 + 8 = 20.',
    },
    teachingPoint:
      'In similar triangle problems with algebraic sides: (1) find the scale factor from the known numerical pair (16/24 = 2/3); (2) set up and solve separate proportions for each algebraic pair. Two independent cross-multiplication equations — 9x + 3 = 10x − 6 giving x = 9, and 9y − 6 = 10y − 14 giving y = 8 — yield x + y = 17. Verify each side ratio equals 2/3.',
    relatedSkills: ['Lines, angles, and triangles', 'Linear equations in one variable'],
  },

  {
    id: 'math-b3-048',
    test: 'SAT',
    section: 'math',
    domain: 'Geometry and Trigonometry',
    skill: 'Right triangles and trigonometry',
    difficulty: 'medium',
    timeTargetSeconds: 75,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    question:
      'In right triangle XYZ, the right angle is at Y. If cos(X) = 8/17, what is the value of tan(Z)?',
    choices: [
      { label: 'A', text: '8/15' },
      { label: 'B', text: '15/8' },
      { label: 'C', text: '8/17' },
      { label: 'D', text: '15/17' },
    ],
    correctAnswer: 'A',
    explanation:
      'Since the right angle is at Y, cos(X) = adjacent/hypotenuse = XY/XZ = 8/17, so XY = 8 and XZ = 17. By the Pythagorean theorem: YZ² = XZ² − XY² = 289 − 64 = 225, so YZ = 15. For angle Z: opposite side = XY = 8, adjacent side = YZ = 15. Therefore tan(Z) = 8/15.',
    wrongAnswerExplanations: {
      B: '15/8 = tan(X): the ratio opposite X (YZ = 15) to adjacent X (XY = 8). This is tan(X), not tan(Z). The opposite and adjacent labels swap when moving from angle X to angle Z.',
      C: '8/17 = cos(X): copying the given cosine value directly without computing the tangent for angle Z, which requires a different pair of sides.',
      D: '15/17 = sin(X): the ratio of the side opposite X (YZ = 15) to the hypotenuse (XZ = 17). This is sin(X), not tan(Z).',
    },
    teachingPoint:
      'In a right triangle with right angle at Y, the two acute angles share the same three sides but with opposite "opposite/adjacent" labels. For angle X: adjacent = XY = 8, opposite = YZ = 15. For angle Z: adjacent = YZ = 15, opposite = XY = 8. Always re-label sides relative to the angle being evaluated. tan(Z) = 8/15.',
    relatedSkills: ['Similar triangles', 'Lines, angles, and triangles'],
  },

  {
    id: 'math-b3-049',
    test: 'SAT',
    section: 'math',
    domain: 'Geometry and Trigonometry',
    skill: 'Coordinate geometry',
    difficulty: 'medium',
    timeTargetSeconds: 75,
    mistakeType: 'careless',
    questionType: 'multiple_choice',
    question:
      'Point M is the midpoint of segment AB, where A = (1, 9) and B = (7, −3). Point C has coordinates (c, −1). The slope of segment MC equals the slope of segment AB. What is the value of c?',
    choices: [
      { label: 'A', text: '2' },
      { label: 'B', text: '4' },
      { label: 'C', text: '6' },
      { label: 'D', text: '8' },
    ],
    correctAnswer: 'C',
    explanation:
      'Step 1 — midpoint M: M = ((1 + 7)/2, (9 + (−3))/2) = (8/2, 6/2) = (4, 3). Step 2 — slope of AB: (−3 − 9)/(7 − 1) = −12/6 = −2. Step 3 — slope of MC must also equal −2. M = (4, 3) and C = (c, −1). Slope of MC = (−1 − 3)/(c − 4) = −4/(c − 4). Set equal to −2: −4/(c − 4) = −2. Solve: c − 4 = −4/(−2) = 2, so c = 6. Verify: slope MC = (−1 − 3)/(6 − 4) = −4/2 = −2 ✓.',
    wrongAnswerExplanations: {
      A: '2: a sign error in solving −4/(c − 4) = −2 — computing c − 4 = −4/2 = −2 (using the negative of the slope) and getting c = 2 instead of recognizing that −4/(c − 4) = −2 gives c − 4 = 2.',
      B: '4: using the x-coordinate of midpoint M (4) directly as the answer, without applying the slope condition.',
      D: '8: a computation error in the midpoint — computing M as ((1+7)/2, (9−3)/2) = (4, 3) correctly but then misapplying the slope equation as (−1−3)/(c−4) = 2 (wrong sign for the slope) to get c − 4 = −4/2 = −2, then c = 2, and then miscalculating further to arrive at 8.',
    },
    teachingPoint:
      'Three-step coordinate problem: (1) find midpoint M = ((1+7)/2, (9−3)/2) = (4, 3); (2) find slope of AB = −12/6 = −2; (3) set slope of MC equal to slope of AB: (−1−3)/(c−4) = −2 → −4 = −2(c−4) → c−4 = 2 → c = 6. Check: slope MC = −4/2 = −2 ✓.',
    relatedSkills: ['Lines, angles, and triangles', 'Similar triangles'],
  },

  {
    id: 'math-b3-050',
    test: 'SAT',
    section: 'math',
    domain: 'Geometry and Trigonometry',
    skill: 'Circles',
    difficulty: 'hard',
    timeTargetSeconds: 90,
    mistakeType: 'concept error',
    questionType: 'grid_in',
    question:
      'The equation x² + y² − 8x + 6y + 16 = 0 represents a circle in the coordinate plane. What is the radius of this circle?',
    correctAnswer: '3',
    acceptableAnswers: ['3'],
    explanation:
      'Complete the square for x: x² − 8x = (x − 4)² − 16. Complete the square for y: y² + 6y = (y + 3)² − 9. Substitute back: (x − 4)² − 16 + (y + 3)² − 9 + 16 = 0. Combine constants: −16 − 9 + 16 = −9. So (x − 4)² + (y + 3)² = 9. In standard form (x − h)² + (y − k)² = r², we have r² = 9, giving r = 3. The center is (4, −3) and the radius is 3.',
    teachingPoint:
      'To find the radius from a general circle equation: complete the square for both x and y. For x² − 8x: half-coefficient of x is −4, so (x − 4)² − 16. For y² + 6y: half-coefficient of y is 3, so (y + 3)² − 9. Collect constants on the right: −(−16) − (−9) − 16 = 9, giving r² = 9 and r = 3. The original constant +16 exactly cancels the 16 from completing the x-square, making the final arithmetic clean.',
    relatedSkills: ['Coordinate geometry', 'Quadratic equations'],
  },
]
