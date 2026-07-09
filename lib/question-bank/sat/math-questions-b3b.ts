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
    difficulty: 'medium',
    timeTargetSeconds: 75,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    isWordProblem: true,
    question:
      'A plumber charges a flat fee of $75 plus $45 for each hour of work. A customer receives a bill of $255. How many hours did the plumber work?',
    choices: [
      { label: 'A', text: '3' },
      { label: 'B', text: '4' },
      { label: 'C', text: '5' },
      { label: 'D', text: '6' },
    ],
    correctAnswer: 'B',
    explanation:
      'Set up the equation: 75 + 45h = 255. Subtract 75 from both sides: 45h = 180. Divide by 45: h = 4. The plumber worked 4 hours.',
    wrongAnswerExplanations: {
      A: 'h = 3 gives 75 + 135 = $210, not $255. This comes from subtracting the flat fee incorrectly or dividing by the wrong number.',
      C: 'h = 5 gives 75 + 225 = $300, not $255. This results from forgetting to subtract the flat fee before dividing.',
      D: 'h = 6 gives 75 + 270 = $345, not $255. Far too high — a sign that the flat fee was ignored entirely.',
    },
    teachingPoint:
      'Translate word problems into algebraic equations step by step. Identify the flat (constant) part and the variable part before solving.',
    relatedSkills: ['Linear functions', 'Linear inequalities'],
  },

  {
    id: 'math-b3-027',
    test: 'SAT',
    section: 'math',
    domain: 'Algebra',
    skill: 'Linear equations in two variables',
    difficulty: 'medium',
    timeTargetSeconds: 75,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    isWordProblem: true,
    question:
      'A student models her weekly savings with the equation y = 12x + 50, where x is the number of weeks since she opened a savings account and y is the total amount saved in dollars. What is the best interpretation of the number 12 in this equation?',
    choices: [
      { label: 'A', text: 'The total amount saved after 12 weeks' },
      { label: 'B', text: 'The amount saved each week' },
      { label: 'C', text: 'The amount in the account when it was opened' },
      { label: 'D', text: 'The number of weeks until the account reaches $50' },
    ],
    correctAnswer: 'B',
    explanation:
      'In the linear equation y = 12x + 50, the coefficient of x is the slope. The slope represents the rate of change: for each additional week (increase of 1 in x), the total savings increases by $12. Therefore, 12 is the amount saved each week.',
    wrongAnswerExplanations: {
      A: 'The total after 12 weeks would be y = 12(12) + 50 = 194, not 12 itself. Confusing the coefficient with a time value.',
      C: 'The initial amount when x = 0 is y = 50, which is the y-intercept, not the coefficient 12.',
      D: '12 is a rate, not a time value. The account starts at $50 when opened, so it already has $50 at week 0.',
    },
    teachingPoint:
      'In a linear model y = mx + b, the slope m is always the rate of change (how much y changes per unit of x), and b is the starting value when x = 0.',
    relatedSkills: ['Linear functions', 'Linear equations in one variable'],
  },

  {
    id: 'math-b3-028',
    test: 'SAT',
    section: 'math',
    domain: 'Algebra',
    skill: 'Systems of two linear equations',
    difficulty: 'easy',
    timeTargetSeconds: 60,
    mistakeType: 'careless',
    questionType: 'multiple_choice',
    question:
      'What is the solution (x, y) to the system of equations below?\ny = 2x + 1\ny = 5',
    choices: [
      { label: 'A', text: '(2, 5)' },
      { label: 'B', text: '(3, 5)' },
      { label: 'C', text: '(1, 5)' },
      { label: 'D', text: '(4, 5)' },
    ],
    correctAnswer: 'A',
    explanation:
      'Since y = 5, substitute into the first equation: 5 = 2x + 1. Subtract 1: 4 = 2x. Divide by 2: x = 2. The solution is (2, 5).',
    wrongAnswerExplanations: {
      B: 'x = 3 gives y = 2(3) + 1 = 7, not 5. A careless error in arithmetic after substitution.',
      C: 'x = 1 gives y = 2(1) + 1 = 3, not 5. Setting 2x = 5 instead of 2x + 1 = 5.',
      D: 'x = 4 gives y = 2(4) + 1 = 9, not 5. A sign or arithmetic error in the subtraction step.',
    },
    teachingPoint:
      'When one equation already gives a value for a variable, substitute that value directly into the other equation and solve.',
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
      'In the system of equations below, what is the value of x + y?\nx + 2y = 11\nx − y = 2',
    correctAnswer: '8',
    acceptableAnswers: ['8'],
    explanation:
      'From the second equation, x = y + 2. Substitute into the first: (y + 2) + 2y = 11, which gives 3y + 2 = 11, so 3y = 9 and y = 3. Then x = 3 + 2 = 5. Therefore x + y = 5 + 3 = 8.',
    teachingPoint:
      'When a problem asks for an expression like x + y rather than individual values, solve the system completely and then evaluate the expression. Check: x + 2y = 5 + 6 = 11 ✓ and x − y = 5 − 3 = 2 ✓.',
    relatedSkills: ['Linear equations in one variable', 'Linear functions'],
  },

  {
    id: 'math-b3-030',
    test: 'SAT',
    section: 'math',
    domain: 'Algebra',
    skill: 'Linear inequalities',
    difficulty: 'medium',
    timeTargetSeconds: 75,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    isWordProblem: true,
    question:
      'A parking garage charges $3 for the first hour and $2 for each additional hour. Maria has at most $15 to spend on parking. What is the maximum number of total hours she can park?',
    choices: [
      { label: 'A', text: '5' },
      { label: 'B', text: '6' },
      { label: 'C', text: '7' },
      { label: 'D', text: '8' },
    ],
    correctAnswer: 'C',
    explanation:
      'For h total hours, the cost is 3 + 2(h − 1) = 2h + 1 dollars. Set up the inequality: 2h + 1 ≤ 15. Subtract 1: 2h ≤ 14. Divide by 2: h ≤ 7. The maximum is 7 hours.',
    wrongAnswerExplanations: {
      A: 'h = 5 gives a cost of 2(5) + 1 = $11. She could afford more hours, so this is not the maximum.',
      B: 'h = 6 gives a cost of 2(6) + 1 = $13. Still under $15, so 6 is not the maximum.',
      D: 'h = 8 gives a cost of 2(8) + 1 = $17, which exceeds her $15 budget.',
    },
    teachingPoint:
      'Write a cost expression for h total hours, then set up an inequality. Be careful to model "first hour" and "each additional hour" correctly: additional hours = h − 1.',
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
      'A line passes through the points (2, 5) and (6, 13). Which of the following is the equation of the line?',
    choices: [
      { label: 'A', text: 'y = 2x + 1' },
      { label: 'B', text: 'y = 3x − 1' },
      { label: 'C', text: 'y = 2x − 1' },
      { label: 'D', text: 'y = 4x − 3' },
    ],
    correctAnswer: 'A',
    explanation:
      'First find the slope: m = (13 − 5) / (6 − 2) = 8 / 4 = 2. Then use point-slope form with (2, 5): y − 5 = 2(x − 2), which simplifies to y = 2x − 4 + 5 = 2x + 1. Check: f(2) = 2(2) + 1 = 5 ✓ and f(6) = 2(6) + 1 = 13 ✓.',
    wrongAnswerExplanations: {
      B: 'y = 3x − 1: slope is 3, not 2. A common error is computing (13 − 2) / (6 − 5) = 11, or misreading the coordinates.',
      C: 'y = 2x − 1: correct slope but wrong intercept. This comes from setting up y − 5 = 2(x − 2) and making an arithmetic error: −4 + 5 = 1, not −1.',
      D: 'y = 4x − 3: slope is 4. Possible if the student subtracts coordinates in the wrong order, e.g., (6 − 2) / (13 − 5) is inverted, giving 1/2, but 4 suggests a different arithmetic error.',
    },
    teachingPoint:
      'Slope = (y2 − y1) / (x2 − x1). After finding the slope, substitute one point into y = mx + b to find b. Always verify with both given points.',
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
      'What is the vertex of the parabola defined by f(x) = x² − 6x + 11?',
    choices: [
      { label: 'A', text: '(3, 2)' },
      { label: 'B', text: '(−3, 2)' },
      { label: 'C', text: '(3, −2)' },
      { label: 'D', text: '(6, 11)' },
    ],
    correctAnswer: 'A',
    explanation:
      'The x-coordinate of the vertex is x = −b / (2a) = −(−6) / (2 · 1) = 6 / 2 = 3. Substitute back: f(3) = 9 − 18 + 11 = 2. The vertex is (3, 2).',
    wrongAnswerExplanations: {
      B: '(−3, 2) uses x = −3 instead of +3. A sign error when applying x = −b/(2a) with b = −6: −(−6)/(2) = 3, not −3.',
      C: '(3, −2) has the correct x-value but a sign error in the y-value: f(3) = 9 − 18 + 11 = 2, not −2.',
      D: '(6, 11) confuses the coefficients b and c in standard form with the vertex coordinates.',
    },
    teachingPoint:
      'For f(x) = ax² + bx + c, the vertex x-coordinate is −b/(2a). Substitute this x back into f(x) to find the y-coordinate. Watch signs carefully when b is negative.',
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
    question: 'For what positive value of k does the equation x² + kx + 9 = 0 have exactly one real solution?',
    choices: [
      { label: 'A', text: '3' },
      { label: 'B', text: '6' },
      { label: 'C', text: '9' },
      { label: 'D', text: '12' },
    ],
    correctAnswer: 'B',
    explanation:
      'For exactly one real solution, the discriminant must equal zero: b² − 4ac = k² − 4(1)(9) = k² − 36 = 0. So k² = 36, giving k = ±6. Since the problem asks for a positive value, k = 6.',
    wrongAnswerExplanations: {
      A: 'k = 3 gives discriminant 9 − 36 = −27 < 0, which means no real solutions, not exactly one.',
      C: 'k = 9 gives discriminant 81 − 36 = 45 > 0, which means two distinct real solutions.',
      D: 'k = 12 gives discriminant 144 − 36 = 108 > 0, which also means two distinct real solutions.',
    },
    teachingPoint:
      'A quadratic ax² + bx + c = 0 has exactly one real solution when the discriminant b² − 4ac = 0. Set up that equation and solve for the unknown parameter.',
    relatedSkills: ['Polynomial functions', 'Linear equations in one variable'],
  },

  {
    id: 'math-b3-034',
    test: 'SAT',
    section: 'math',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'medium',
    timeTargetSeconds: 75,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    question:
      'The functions f(x) = x² − 4 and g(x) = x + 2 are defined for all real numbers x. At which values of x do the graphs of f and g intersect?',
    choices: [
      { label: 'A', text: 'x = −2 and x = 3' },
      { label: 'B', text: 'x = −3 and x = 2' },
      { label: 'C', text: 'x = −1 and x = 4' },
      { label: 'D', text: 'x = 0 and x = 5' },
    ],
    correctAnswer: 'A',
    explanation:
      'Set f(x) = g(x): x² − 4 = x + 2. Rearrange: x² − x − 6 = 0. Factor: (x − 3)(x + 2) = 0. So x = 3 or x = −2. Check: f(3) = 5 and g(3) = 5 ✓; f(−2) = 0 and g(−2) = 0 ✓.',
    wrongAnswerExplanations: {
      B: 'x = −3 and x = 2 come from factoring x² − x − 6 incorrectly as (x − 2)(x + 3) = 0, which gives the wrong signs.',
      C: 'x = −1 and x = 4 do not satisfy x² − x − 6 = 0. Check: (−1)² − (−1) − 6 = −4 ≠ 0.',
      D: 'x = 0 and x = 5 do not satisfy the equation. Check: 0² − 0 − 6 = −6 ≠ 0.',
    },
    teachingPoint:
      'To find intersections, set the two functions equal, move all terms to one side, factor, and solve. Always verify each solution in both original functions.',
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
      'Which of the following gives all real zeros of f(x) = x³ − x² − 6x?',
    choices: [
      { label: 'A', text: 'x = 0, x = 3, and x = −2' },
      { label: 'B', text: 'x = 0, x = −3, and x = 2' },
      { label: 'C', text: 'x = 1, x = 3, and x = −2' },
      { label: 'D', text: 'x = 0, x = 2, and x = −3' },
    ],
    correctAnswer: 'A',
    explanation:
      'Factor out x first: f(x) = x(x² − x − 6). Then factor the quadratic: x² − x − 6 = (x − 3)(x + 2). So f(x) = x(x − 3)(x + 2), giving zeros at x = 0, x = 3, and x = −2.',
    wrongAnswerExplanations: {
      B: 'x = −3 and x = 2 come from factoring x² − x − 6 as (x + 3)(x − 2), which expands to x² + x − 6, not x² − x − 6.',
      C: 'x = 1 is not a zero. If x = 1: f(1) = 1 − 1 − 6 = −6 ≠ 0. This error comes from forgetting to factor out x first.',
      D: 'This reverses the signs of the quadratic zeros. x = 2 gives f(2) = 8 − 4 − 12 = −8 ≠ 0.',
    },
    teachingPoint:
      'Always look for a common factor first (here, x). Then factor the remaining polynomial. The zero from the common factor is often missed.',
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
      'Which of the following is equivalent to (x² − 9) / (x + 3) for all x ≠ −3?',
    choices: [
      { label: 'A', text: 'x − 3' },
      { label: 'B', text: 'x + 3' },
      { label: 'C', text: 'x² − 3' },
      { label: 'D', text: '1 / (x − 3)' },
    ],
    correctAnswer: 'A',
    explanation:
      'Factor the numerator as a difference of squares: x² − 9 = (x + 3)(x − 3). Then cancel the common factor (x + 3): (x + 3)(x − 3) / (x + 3) = x − 3. This is valid for all x ≠ −3.',
    wrongAnswerExplanations: {
      B: 'x + 3 would result if the student cancelled incorrectly or confused which factor remains after division.',
      C: 'x² − 3 comes from subtracting 3 from x² without factoring — treating the numerator as if the 9 is separate from the x² term.',
      D: '1/(x − 3) inverts the result. After cancellation, the expression is x − 3, not its reciprocal.',
    },
    teachingPoint:
      'Recognize difference of squares: a² − b² = (a + b)(a − b). Factor completely before cancelling. Only factors (not terms) can be cancelled.',
    relatedSkills: ['Polynomial functions', 'Quadratic equations'],
  },

  {
    id: 'math-b3-037',
    test: 'SAT',
    section: 'math',
    domain: 'Advanced Math',
    skill: 'Exponential functions',
    difficulty: 'medium',
    timeTargetSeconds: 75,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    isWordProblem: true,
    question:
      'A colony of bacteria starts with 500 cells and doubles every 3 hours. How many cells are in the colony after 12 hours?',
    choices: [
      { label: 'A', text: '4,000' },
      { label: 'B', text: '6,000' },
      { label: 'C', text: '8,000' },
      { label: 'D', text: '16,000' },
    ],
    correctAnswer: 'C',
    explanation:
      'The number of doublings in 12 hours is 12 ÷ 3 = 4. The population is 500 × 2⁴ = 500 × 16 = 8,000.',
    wrongAnswerExplanations: {
      A: '4,000 = 500 × 8 = 500 × 2³. This uses only 3 doublings (9 hours), not 4 (12 hours).',
      B: '6,000 is not a power-of-2 multiple of 500, suggesting an arithmetic error or linear thinking (e.g., 500 × 12 / some value).',
      D: '16,000 = 500 × 32 = 500 × 2⁵. This uses 5 doublings, which would correspond to 15 hours, not 12.',
    },
    teachingPoint:
      'For exponential growth with doubling time d, the formula is P(t) = P₀ × 2^(t/d). Divide the total time by the doubling period to find the exponent.',
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
      'A factory uses 3 machines to produce 240 widgets in 8 hours. Assuming each machine works at the same constant rate, how many widgets will 5 machines produce in 10 hours?',
    choices: [
      { label: 'A', text: '300' },
      { label: 'B', text: '400' },
      { label: 'C', text: '500' },
      { label: 'D', text: '600' },
    ],
    correctAnswer: 'C',
    explanation:
      'Find the rate per machine per hour: 240 widgets ÷ 3 machines ÷ 8 hours = 10 widgets per machine per hour. Then multiply by the new values: 10 × 5 machines × 10 hours = 500 widgets.',
    wrongAnswerExplanations: {
      A: '300 comes from multiplying 240 by 5/8 or using only the time ratio without accounting for the extra machines.',
      B: '400 results from scaling only by one factor — either machines (240 × 5/3 = 400) or hours — but not both.',
      D: '600 comes from multiplying 240 by 10/8 × 5/3 = 50/24 ≈ 2.08, then rounding, or from a different proportional error.',
    },
    teachingPoint:
      'In problems with two varying quantities (machines and hours), find the unit rate first (per machine per hour), then scale up by both factors independently.',
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
      'The price of a jacket is increased by 20% and then, one month later, decreased by 15%. Compared to the original price, the final price represents what percent change?',
    choices: [
      { label: 'A', text: '2% increase' },
      { label: 'B', text: '5% decrease' },
      { label: 'C', text: '5% increase' },
      { label: 'D', text: '2% decrease' },
    ],
    correctAnswer: 'A',
    explanation:
      'Multiply the two multipliers: 1.20 × 0.85 = 1.02. The final price is 102% of the original, which is a 2% increase. Example: a $100 jacket rises to $120 then falls to $120 × 0.85 = $102.',
    wrongAnswerExplanations: {
      B: '5% decrease is wrong. The trap is adding/subtracting the percentages directly: 20% − 15% = 5% increase, but choosing "decrease" by sign confusion.',
      C: '5% increase is the most common trap: students add 20% − 15% = 5% linearly, ignoring that the 15% decrease applies to the already-increased price.',
      D: '2% decrease has the right magnitude (2%) but the wrong direction. The final multiplier 1.02 > 1, so it is an increase, not a decrease.',
    },
    teachingPoint:
      'Successive percent changes must be multiplied, not added. A 20% increase then a 15% decrease is 1.20 × 0.85 = 1.02, a 2% net increase.',
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
    question:
      'A bag contains 4 red marbles, 3 blue marbles, and 5 green marbles. One marble is drawn at random. What is the probability that the marble drawn is NOT red?',
    choices: [
      { label: 'A', text: '1/3' },
      { label: 'B', text: '2/3' },
      { label: 'C', text: '1/4' },
      { label: 'D', text: '3/4' },
    ],
    correctAnswer: 'B',
    explanation:
      'Total marbles: 4 + 3 + 5 = 12. Marbles that are not red: 3 + 5 = 8. P(not red) = 8/12 = 2/3.',
    wrongAnswerExplanations: {
      A: '1/3 = 4/12, which is the probability of drawing a RED marble, not a non-red marble.',
      C: '1/4 = 3/12, which equals the number of blue marbles divided by 12 — only one color, not all non-red.',
      D: '3/4 = 9/12; this overcounts. There are only 8 non-red marbles, not 9.',
    },
    teachingPoint:
      'P(not A) = 1 − P(A). Here P(red) = 4/12 = 1/3, so P(not red) = 1 − 1/3 = 2/3. Alternatively, count non-red marbles directly: 8/12 = 2/3.',
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
    question:
      'A fair coin is flipped 50 times, and it lands on heads 28 times. What is the experimental probability of the coin landing on tails?',
    choices: [
      { label: 'A', text: '1/2' },
      { label: 'B', text: '11/25' },
      { label: 'C', text: '14/25' },
      { label: 'D', text: '7/25' },
    ],
    correctAnswer: 'B',
    explanation:
      'Tails occurred 50 − 28 = 22 times out of 50 total flips. The experimental probability of tails = 22/50 = 11/25.',
    wrongAnswerExplanations: {
      A: '1/2 is the theoretical probability, not the experimental probability based on these 50 flips.',
      C: '14/25 = 28/50, which is the experimental probability of HEADS, not tails.',
      D: '7/25 = 14/50; this is half the number of heads divided by 50, an error with no direct basis in the problem.',
    },
    teachingPoint:
      'Experimental probability = (number of times the event occurred) / (total number of trials). Do not confuse experimental probability (from data) with theoretical probability (from perfect assumptions).',
    relatedSkills: ['Probability', 'Ratios, rates, proportional relationships'],
  },

  {
    id: 'math-b3-042',
    test: 'SAT',
    section: 'math',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Statistics (mean/median/mode)',
    difficulty: 'medium',
    timeTargetSeconds: 75,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    question:
      'A data set contains the values 2, 4, 5, 6, 7, 8, and 100. Which measure of center is most affected by the value 100?',
    choices: [
      { label: 'A', text: 'Mean' },
      { label: 'B', text: 'Median' },
      { label: 'C', text: 'Mode' },
      { label: 'D', text: 'Mean and median are equally affected' },
    ],
    correctAnswer: 'A',
    explanation:
      'The mean without 100 is (2+4+5+6+7+8)/6 = 32/6 ≈ 5.3. With 100, the mean is (32+100)/7 = 132/7 ≈ 18.9 — a dramatic change. The median of the full set (7 values sorted) is the 4th value, which is 6. Even if 100 were removed, the median of the 6 remaining values would be (5+6)/2 = 5.5. The median barely changes. The mode is not affected because no value repeats.',
    wrongAnswerExplanations: {
      B: 'The median is the middle value and is resistant to extreme values (outliers). It changes only slightly when an outlier is added or removed.',
      C: 'Mode is the most frequent value. No value repeats in this set, so the mode is undefined and cannot be affected.',
      D: 'The mean and median are NOT equally affected. The mean changes dramatically with an outlier; the median is designed to be resistant to outliers.',
    },
    teachingPoint:
      'The mean is sensitive to outliers because it uses every value in its calculation. The median is resistant to outliers because it depends only on position, not magnitude.',
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
      'In a class of 30 students, 12 scored below 70, 10 scored between 70 and 85 inclusive, and the remaining students scored above 85. What fraction of the class scored 70 or above?',
    choices: [
      { label: 'A', text: '2/5' },
      { label: 'B', text: '3/5' },
      { label: 'C', text: '1/3' },
      { label: 'D', text: '2/3' },
    ],
    correctAnswer: 'B',
    explanation:
      'Students scoring 70 or above = total − those below 70 = 30 − 12 = 18. As a fraction: 18/30 = 3/5. Alternatively: 10 scored 70–85 and 30 − 12 − 10 = 8 scored above 85, for 10 + 8 = 18 total at or above 70, giving 18/30 = 3/5.',
    wrongAnswerExplanations: {
      A: '2/5 = 12/30, which is the fraction who scored BELOW 70, not at or above 70.',
      C: '1/3 = 10/30, which counts only those in the 70–85 range, ignoring the 8 students above 85.',
      D: '2/3 = 20/30; this would require 20 students at or above 70, but 12 + 10 + 8 = 30 total, with only 18 at or above 70.',
    },
    teachingPoint:
      'Read category boundaries carefully. "Scored 70 or above" includes both the 70–85 group and the above-85 group. Find the third group by subtraction if not stated directly.',
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
      'A teacher recorded seven quiz scores: 62, 78, 85, 91, 88, 74, and 83. What is the median score?',
    correctAnswer: '83',
    acceptableAnswers: ['83'],
    explanation:
      'To find the median, first sort the seven scores in ascending order: 62, 74, 78, 83, 85, 88, 91. With 7 values, the median is the 4th value: 83.',
    teachingPoint:
      'Always sort the values before identifying the median. With an odd number of values, the median is the exact middle value. With 7 values, count to the 4th position.',
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
      'Two lines intersect at a point, forming four angles. One of the angles measures 65°. What is the measure, in degrees, of one of its supplementary angles?',
    choices: [
      { label: 'A', text: '65' },
      { label: 'B', text: '90' },
      { label: 'C', text: '115' },
      { label: 'D', text: '125' },
    ],
    correctAnswer: 'C',
    explanation:
      'Supplementary angles sum to 180°. The supplementary angle = 180° − 65° = 115°.',
    wrongAnswerExplanations: {
      A: '65° is the measure of the original angle (or its vertical angle), not its supplement.',
      B: '90° would make the two angles complementary (summing to 90°), not supplementary (summing to 180°).',
      D: '125° = 180° − 55°. This is a careless arithmetic error: subtracting 55 instead of 65.',
    },
    teachingPoint:
      'Supplementary angles sum to 180°; complementary angles sum to 90°. When two lines intersect, adjacent angles are supplementary and opposite angles (vertical angles) are equal.',
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
      'In triangle ABC, angle A measures 70°. The exterior angle at vertex C measures 120°. What is the measure, in degrees, of angle B?',
    choices: [
      { label: 'A', text: '40' },
      { label: 'B', text: '50' },
      { label: 'C', text: '60' },
      { label: 'D', text: '70' },
    ],
    correctAnswer: 'B',
    explanation:
      'By the Exterior Angle Theorem, an exterior angle of a triangle equals the sum of the two non-adjacent interior angles. So the exterior angle at C = angle A + angle B: 120 = 70 + angle B. Therefore angle B = 120 − 70 = 50°.',
    wrongAnswerExplanations: {
      A: '40° = 120° − 70° − 30°, which has no basis in the theorem. Or 110° (interior angle C) − 70° = 40°, incorrectly subtracting angle A from the interior angle at C.',
      C: '60° would result if a student used 120°/2 = 60°, incorrectly assuming the two remote interior angles are equal.',
      D: '70° is the measure of angle A, not angle B.',
    },
    teachingPoint:
      'Exterior Angle Theorem: the measure of an exterior angle of a triangle equals the sum of the measures of the two non-adjacent (remote) interior angles.',
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
      'Triangle PQR is similar to triangle STU. In triangle PQR, PQ = 3 and QR = x + 2. In the corresponding triangle STU, ST = 5 and TU = x + 6. What is the value of x?',
    choices: [
      { label: 'A', text: '4' },
      { label: 'B', text: '2' },
      { label: 'C', text: '6' },
      { label: 'D', text: '3' },
    ],
    correctAnswer: 'A',
    explanation:
      'Since the triangles are similar and PQ corresponds to ST, the ratio of corresponding sides is PQ/ST = 3/5. Set up a proportion with the other pair of corresponding sides: QR/TU = (x + 2)/(x + 6) = 3/5. Cross-multiply: 5(x + 2) = 3(x + 6), giving 5x + 10 = 3x + 18. Subtract 3x from both sides: 2x + 10 = 18. Subtract 10: 2x = 8. So x = 4. Check: QR = 6, TU = 10, and 6/10 = 3/5 ✓.',
    wrongAnswerExplanations: {
      B: 'x = 2 gives QR = 4 and TU = 8, and 4/8 = 1/2 ≠ 3/5. This may result from incorrectly setting 5(x+2) = 3(x+6) and making an arithmetic error.',
      C: 'x = 6 gives QR = 8 and TU = 12, and 8/12 = 2/3 ≠ 3/5. A common error is setting up an incorrect proportion such as QR/PQ = TU/ST.',
      D: 'x = 3 gives QR = 5 and TU = 9, and 5/9 ≠ 3/5. This may come from an arithmetic error in the cross-multiplication step.',
    },
    teachingPoint:
      'In similar triangles, corresponding sides are proportional. Identify which sides correspond, set up the proportion correctly, then cross-multiply and solve. Always verify the answer by checking the ratio.',
    relatedSkills: ['Lines, angles, and triangles', 'Linear equations in one variable'],
  },

  {
    id: 'math-b3-048',
    test: 'SAT',
    section: 'math',
    domain: 'Geometry and Trigonometry',
    skill: 'Right triangles and trigonometry',
    difficulty: 'hard',
    timeTargetSeconds: 90,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    isWordProblem: true,
    question:
      'A ladder leans against a vertical wall. The ladder makes a 72° angle with the ground and its top reaches 18 feet up the wall. What is the length of the ladder, in feet? (Round to the nearest tenth. sin 72° ≈ 0.951, cos 72° ≈ 0.309, tan 72° ≈ 3.078)',
    choices: [
      { label: 'A', text: '17.1' },
      { label: 'B', text: '18.9' },
      { label: 'C', text: '55.4' },
      { label: 'D', text: '5.9' },
    ],
    correctAnswer: 'B',
    explanation:
      'The wall height (18 ft) is the side opposite the 72° angle, and the ladder length L is the hypotenuse. Using sine: sin(72°) = opposite / hypotenuse = 18 / L. Solving: L = 18 / sin(72°) = 18 / 0.951 ≈ 18.9 feet.',
    wrongAnswerExplanations: {
      A: '17.1 ≈ 18 × cos(72°) / sin(72°)... actually 18 × 0.951 = 17.1. This comes from multiplying by sin(72°) instead of dividing — confusing the setup of the ratio.',
      C: '55.4 ≈ 18 / tan(72°) × (some factor), but more directly 18 / 0.309 ≈ 58.3. 55.4 ≈ 18 / cos(72°)... wait: 18/0.309 ≈ 58.3. 55.4 is not directly derivable but might come from using cosine in the wrong ratio: L = 18 / cos(72°) = 18/0.309 ≈ 58 — note that the closest trap choice is using cos instead of sin, giving around 58.3. Choice C at 55.4 represents using tan: 18 × tan(72°) ≈ 18 × 3.078 ≈ 55.4.',
      D: '5.9 ≈ 18 × cos(72°) = 18 × 0.309 ≈ 5.6, or perhaps 18 / tan(72°) ≈ 5.9 is wrong: 18/3.078 ≈ 5.85 ≈ 5.9. This comes from using tan: opposite/adjacent means the adjacent side (base) = opposite/tan = 18/3.078 ≈ 5.9, confusing the base of the triangle with the hypotenuse.',
    },
    teachingPoint:
      'Always label the sides relative to the given angle first: opposite, adjacent, hypotenuse. The ladder is the hypotenuse; the wall height is opposite. Use sin = opposite/hypotenuse, so L = opposite/sin(θ).',
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
      'Points A and B have coordinates A(3, 7) and B(9, 1). What are the coordinates of the midpoint of segment AB?',
    choices: [
      { label: 'A', text: '(6, 4)' },
      { label: 'B', text: '(12, 8)' },
      { label: 'C', text: '(3, 3)' },
      { label: 'D', text: '(6, 8)' },
    ],
    correctAnswer: 'A',
    explanation:
      'The midpoint formula is M = ((x₁ + x₂)/2, (y₁ + y₂)/2). Substituting: M = ((3 + 9)/2, (7 + 1)/2) = (12/2, 8/2) = (6, 4).',
    wrongAnswerExplanations: {
      B: '(12, 8) = (3 + 9, 7 + 1) — the student added the coordinates but forgot to divide by 2.',
      C: '(3, 3): the x-coordinate 3 is just x₁ not the midpoint; the y-value 3 = 7 − 1 − 3 has no clear basis. Likely comes from subtracting instead of adding y-coordinates.',
      D: '(6, 8): the x-coordinate is correct (6), but the y-coordinate is 8 = 7 + 1 without dividing by 2. A partial error — forgetting to divide the y sum by 2.',
    },
    teachingPoint:
      'The midpoint is the average of the coordinates: add x-values and divide by 2, then add y-values and divide by 2. The most common error is adding without dividing.',
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
      'The equation x² + y² − 6x + 4y − 12 = 0 represents a circle in the coordinate plane. What is the radius of the circle?',
    correctAnswer: '5',
    acceptableAnswers: ['5'],
    explanation:
      'Complete the square for both x and y. For x: x² − 6x → (x − 3)² − 9. For y: y² + 4y → (y + 2)² − 4. Substitute: (x − 3)² − 9 + (y + 2)² − 4 − 12 = 0. Simplify: (x − 3)² + (y + 2)² = 25. The equation is now in standard form (x − h)² + (y − k)² = r², so r² = 25 and r = 5.',
    teachingPoint:
      'To find the radius of a circle from a general-form equation, complete the square for both x and y separately. Move the constants to the right side, then take the square root of r² to get r. Always add the completing-the-square constants to BOTH sides.',
    relatedSkills: ['Coordinate geometry', 'Quadratic equations'],
  },
]
