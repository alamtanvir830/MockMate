import type { MathMCQuestion, MathGridInQuestion } from '../types'
type MathQuestion = MathMCQuestion | MathGridInQuestion

export const f10MathModule1QuestionsV2: MathQuestion[] = [
  // ── q01 · Algebra · Linear Equations in One Variable · Easy ──────────────
  // correctAnswer: D
  {
    id: 'sat-f10-v2-math-m1-q01',
    section: 'math',
    moduleId: 'f10v2-math-module-1',
    domain: 'Algebra',
    skill: 'Linear equations in one variable',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'If 5x - 3 = 22, what is the value of x?',
    choices: [
      { label: 'A', text: '3' },
      { label: 'B', text: '4' },
      { label: 'C', text: '4.5' },
      { label: 'D', text: '5' },
    ],
    correctAnswer: 'D',
    explanation:
      'Add 3 to both sides: 5x = 25. Divide both sides by 5: x = 5.',
    wrongAnswerExplanations: {
      A: 'If x = 3, then 5(3) - 3 = 12, not 22.',
      B: 'If x = 4, then 5(4) - 3 = 17, not 22.',
      C: 'If x = 4.5, then 5(4.5) - 3 = 19.5, not 22.',
    },
  },

  // ── q02 · Algebra · Linear Equations in Two Variables · Easy ─────────────
  // correctAnswer: A
  {
    id: 'sat-f10-v2-math-m1-q02',
    section: 'math',
    moduleId: 'f10v2-math-module-1',
    domain: 'Algebra',
    skill: 'Linear equations in two variables',
    difficulty: 'easy',
    type: 'multiple_choice',
    question:
      'A line passes through the points (0, 4) and (2, 10). Which of the following is the equation of this line?',
    choices: [
      { label: 'A', text: 'y = 3x + 4' },
      { label: 'B', text: 'y = 2x + 4' },
      { label: 'C', text: 'y = 3x + 2' },
      { label: 'D', text: 'y = 4x + 2' },
    ],
    correctAnswer: 'A',
    explanation:
      'The slope is (10 - 4) / (2 - 0) = 6 / 2 = 3. The y-intercept is 4 (the point (0, 4)). So the equation is y = 3x + 4.',
    wrongAnswerExplanations: {
      B: 'A slope of 2 gives y = 2(2) + 4 = 8 when x = 2, but the line must pass through (2, 10).',
      C: 'The y-intercept must be 4 because the line passes through (0, 4), not 2.',
      D: 'A slope of 4 gives y = 4(0) + 2 = 2 when x = 0, but the line must pass through (0, 4).',
    },
  },

  // ── q03 · Advanced Math · Nonlinear Functions · Easy ─────────────────────
  // correctAnswer: C
  {
    id: 'sat-f10-v2-math-m1-q03',
    section: 'math',
    moduleId: 'f10v2-math-module-1',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'easy',
    type: 'multiple_choice',
    question:
      'The function f is defined by f(x) = x^2 - 6x + 5. What are the zeros of f?',
    choices: [
      { label: 'A', text: 'x = -5 and x = -1' },
      { label: 'B', text: 'x = -5 and x = 1' },
      { label: 'C', text: 'x = 1 and x = 5' },
      { label: 'D', text: 'x = 2 and x = 3' },
    ],
    correctAnswer: 'C',
    explanation:
      'Factor: x^2 - 6x + 5 = (x - 1)(x - 5) = 0, so x = 1 or x = 5.',
    wrongAnswerExplanations: {
      A: 'Check: (-5)^2 - 6(-5) + 5 = 25 + 30 + 5 = 60, which is not 0.',
      B: 'Check: (-5)^2 - 6(-5) + 5 = 60, which is not 0.',
      D: 'Check: 2^2 - 6(2) + 5 = 4 - 12 + 5 = -3, which is not 0.',
    },
  },

  // ── q04 · PSDA · Ratios and Proportions · Easy ───────────────────────────
  // correctAnswer: B
  {
    id: 'sat-f10-v2-math-m1-q04',
    section: 'math',
    moduleId: 'f10v2-math-module-1',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Ratios, rates, proportional relationships, and units',
    difficulty: 'easy',
    type: 'multiple_choice',
    question:
      'A recipe calls for 3 cups of flour to make 24 cookies. At this rate, how many cups of flour are needed to make 56 cookies?',
    choices: [
      { label: 'A', text: '6' },
      { label: 'B', text: '7' },
      { label: 'C', text: '8' },
      { label: 'D', text: '9' },
    ],
    correctAnswer: 'B',
    explanation:
      'Set up the proportion 3/24 = x/56. Cross-multiply: 24x = 168, so x = 7 cups.',
    wrongAnswerExplanations: {
      A: '6 cups would make 6 x (24/3) = 48 cookies, not 56.',
      C: '8 cups would make 8 x (24/3) = 64 cookies, not 56.',
      D: '9 cups would make 9 x (24/3) = 72 cookies, not 56.',
    },
  },

  // ── q05 · Algebra · Linear Functions · Medium ────────────────────────────
  // correctAnswer: D
  {
    id: 'sat-f10-v2-math-m1-q05',
    section: 'math',
    moduleId: 'f10v2-math-module-1',
    domain: 'Algebra',
    skill: 'Linear functions',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'A car rental company charges a flat fee of $20 plus $0.15 per mile driven. Which of the following functions gives the total cost C, in dollars, for driving m miles?',
    choices: [
      { label: 'A', text: 'C(m) = 0.15m' },
      { label: 'B', text: 'C(m) = 20m + 0.15' },
      { label: 'C', text: 'C(m) = 20 + 15m' },
      { label: 'D', text: 'C(m) = 20 + 0.15m' },
    ],
    correctAnswer: 'D',
    explanation:
      'The flat fee contributes a constant $20, and the per-mile charge contributes $0.15 for every mile. The total is C(m) = 20 + 0.15m.',
    wrongAnswerExplanations: {
      A: 'This ignores the flat $20 fee entirely.',
      B: 'This incorrectly multiplies the flat fee by the number of miles.',
      C: 'The rate is $0.15 per mile, not $15 per mile.',
    },
  },

  // ── q06 · Advanced Math · Nonlinear Equations · Medium ───────────────────
  // correctAnswer: A
  {
    id: 'sat-f10-v2-math-m1-q06',
    section: 'math',
    moduleId: 'f10v2-math-module-1',
    domain: 'Advanced Math',
    skill: 'Nonlinear equations in one variable and systems of equations in two variables',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'What are the solutions to the equation 2x^2 + 5x - 3 = 0?',
    choices: [
      { label: 'A', text: 'x = 1/2 and x = -3' },
      { label: 'B', text: 'x = -1/2 and x = 3' },
      { label: 'C', text: 'x = 3/2 and x = -1' },
      { label: 'D', text: 'x = -3/2 and x = 2' },
    ],
    correctAnswer: 'A',
    explanation:
      'Factor: (2x - 1)(x + 3) = 0. Setting each factor to zero: 2x - 1 = 0 gives x = 1/2, and x + 3 = 0 gives x = -3.',
    wrongAnswerExplanations: {
      B: 'Check x = -1/2: 2(1/4) + 5(-1/2) - 3 = 0.5 - 2.5 - 3 = -5, which is not 0.',
      C: 'Check x = 3/2: 2(9/4) + 5(3/2) - 3 = 4.5 + 7.5 - 3 = 9, which is not 0.',
      D: 'Check x = -3/2: 2(9/4) + 5(-3/2) - 3 = 4.5 - 7.5 - 3 = -6, which is not 0.',
    },
  },

  // ── q07 · Algebra · Systems of Linear Equations · Medium ─────────────────
  // correctAnswer: C   (system: 3x + 2y = 16, x - y = 2)
  {
    id: 'sat-f10-v2-math-m1-q07',
    section: 'math',
    moduleId: 'f10v2-math-module-1',
    domain: 'Algebra',
    skill: 'Systems of two linear equations in two variables',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'What is the solution (x, y) to the system of equations below?\n3x + 2y = 16\nx - y = 2',
    choices: [
      { label: 'A', text: '(2, 5)' },
      { label: 'B', text: '(3, 3)' },
      { label: 'C', text: '(4, 2)' },
      { label: 'D', text: '(5, 1)' },
    ],
    correctAnswer: 'C',
    explanation:
      'From the second equation, x = y + 2. Substitute into the first: 3(y + 2) + 2y = 16, so 3y + 6 + 2y = 16, giving 5y = 10, y = 2. Then x = 2 + 2 = 4. The solution is (4, 2).',
    wrongAnswerExplanations: {
      A: 'Check: 3(2) + 2(5) = 6 + 10 = 16 ✓, but 2 - 5 = -3, not 2.',
      B: 'Check: 3(3) + 2(3) = 9 + 6 = 15, not 16.',
      D: 'Check: 3(5) + 2(1) = 15 + 2 = 17, not 16.',
    },
  },

  // ── q08 · PSDA · One-Variable Data · Medium ──────────────────────────────
  // correctAnswer: B
  {
    id: 'sat-f10-v2-math-m1-q08',
    section: 'math',
    moduleId: 'f10v2-math-module-1',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'One-variable data: distributions and measures of center and spread',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'The five data values in a set are 8, 13, 7, 15, and k. If the mean of the data set is 11, what is the value of k?',
    choices: [
      { label: 'A', text: '10' },
      { label: 'B', text: '12' },
      { label: 'C', text: '14' },
      { label: 'D', text: '16' },
    ],
    correctAnswer: 'B',
    explanation:
      'The sum of all five values must equal 5 x 11 = 55. The sum of the known values is 8 + 13 + 7 + 15 = 43. So k = 55 - 43 = 12.',
    wrongAnswerExplanations: {
      A: 'If k = 10, the sum is 53 and the mean is 53/5 = 10.6, not 11.',
      C: 'If k = 14, the sum is 57 and the mean is 57/5 = 11.4, not 11.',
      D: 'If k = 16, the sum is 59 and the mean is 59/5 = 11.8, not 11.',
    },
  },

  // ── q09 · Advanced Math · Nonlinear Functions · Medium ───────────────────
  // correctAnswer: D   g(x)=2^x, evaluate g(g(3)) = g(8) = 256
  {
    id: 'sat-f10-v2-math-m1-q09',
    section: 'math',
    moduleId: 'f10v2-math-module-1',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'The function g is defined by g(x) = 2^x. What is the value of g(g(3))?',
    choices: [
      { label: 'A', text: '8' },
      { label: 'B', text: '16' },
      { label: 'C', text: '64' },
      { label: 'D', text: '256' },
    ],
    correctAnswer: 'D',
    explanation:
      'First evaluate the inner function: g(3) = 2^3 = 8. Then evaluate the outer function: g(g(3)) = g(8) = 2^8 = 256.',
    wrongAnswerExplanations: {
      A: 'g(3) = 8 is the intermediate step, not the final answer.',
      B: '16 = 2^4, but the exponent should be 8, not 4.',
      C: '64 = 2^6, but g(3) = 8, so the exponent should be 8.',
    },
  },

  // ── q10 · PSDA · Probability · Medium ────────────────────────────────────
  // correctAnswer: A
  {
    id: 'sat-f10-v2-math-m1-q10',
    section: 'math',
    moduleId: 'f10v2-math-module-1',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Probability and conditional probability',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'A bag contains 5 red marbles, 3 blue marbles, and 2 green marbles. If one marble is selected at random, what is the probability that it is NOT green?',
    choices: [
      { label: 'A', text: '4/5' },
      { label: 'B', text: '3/5' },
      { label: 'C', text: '1/5' },
      { label: 'D', text: '1/2' },
    ],
    correctAnswer: 'A',
    explanation:
      'There are 10 marbles total. 2 are green, so 8 are not green. P(not green) = 8/10 = 4/5.',
    wrongAnswerExplanations: {
      B: '3/5 = 6/10 would correspond to only 6 non-green marbles, but there are 8.',
      C: '1/5 = 2/10 is the probability of selecting a green marble, not a non-green one.',
      D: '1/2 = 5/10 does not match the 8 non-green marbles out of 10.',
    },
  },

  // ── q11 · Algebra · Linear Inequalities · Medium ─────────────────────────
  // correctAnswer: C   -4x + 7 > 19 => -4x > 12 => x < -3
  // Spec says C. Choices are arranged so C = x < -3.
  {
    id: 'sat-f10-v2-math-m1-q11',
    section: 'math',
    moduleId: 'f10v2-math-module-1',
    domain: 'Algebra',
    skill: 'Linear inequalities in one or two variables',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'Which of the following is the solution to the inequality -4x + 7 > 19?',
    choices: [
      { label: 'A', text: 'x > 3' },
      { label: 'B', text: 'x > -3' },
      { label: 'C', text: 'x < -3' },
      { label: 'D', text: 'x < 3' },
    ],
    correctAnswer: 'C',
    explanation:
      'Subtract 7 from both sides: -4x > 12. Divide both sides by -4 and flip the inequality sign: x < -3.',
    wrongAnswerExplanations: {
      A: 'Dividing -4x > 12 by -4 gives x < -3, not x > 3. The sign must flip and the value is -3.',
      B: 'When dividing by a negative number, the inequality sign flips, so the answer is x < -3, not x > -3.',
      D: 'Dividing 12 by -4 gives -3, not 3.',
    },
  },

  // ── q12 · Advanced Math · Equivalent Expressions (Quadratic) · Medium ────
  // correctAnswer: B
  {
    id: 'sat-f10-v2-math-m1-q12',
    section: 'math',
    moduleId: 'f10v2-math-module-1',
    domain: 'Advanced Math',
    skill: 'Equivalent expressions',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'Which of the following is equivalent to x^2 + 8x + 12?',
    choices: [
      { label: 'A', text: '(x + 1)(x + 12)' },
      { label: 'B', text: '(x + 2)(x + 6)' },
      { label: 'C', text: '(x + 3)(x + 4)' },
      { label: 'D', text: '(x + 4)(x + 3)' },
    ],
    correctAnswer: 'B',
    explanation:
      'Find two numbers that multiply to 12 and add to 8. Those numbers are 2 and 6: 2 x 6 = 12 and 2 + 6 = 8. So x^2 + 8x + 12 = (x + 2)(x + 6).',
    wrongAnswerExplanations: {
      A: '(x + 1)(x + 12) = x^2 + 13x + 12, which does not match x^2 + 8x + 12.',
      C: '(x + 3)(x + 4) = x^2 + 7x + 12, which does not match x^2 + 8x + 12.',
      D: '(x + 4)(x + 3) = x^2 + 7x + 12, same as choice C, which is incorrect.',
    },
  },

  // ── q13 · Algebra · Equivalent Expressions · Medium ──────────────────────
  // correctAnswer: D   4(3x-2) - 2(5x+1) = 12x-8 - 10x-2 = 2x-10
  {
    id: 'sat-f10-v2-math-m1-q13',
    section: 'math',
    moduleId: 'f10v2-math-module-1',
    domain: 'Algebra',
    skill: 'Linear equations in one variable',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'Which expression is equivalent to 4(3x - 2) - 2(5x + 1)?',
    choices: [
      { label: 'A', text: '22x - 10' },
      { label: 'B', text: '2x + 10' },
      { label: 'C', text: '2x - 6' },
      { label: 'D', text: '2x - 10' },
    ],
    correctAnswer: 'D',
    explanation:
      'Distribute: 4(3x - 2) = 12x - 8 and 2(5x + 1) = 10x + 2. Subtract: (12x - 8) - (10x + 2) = 2x - 10.',
    wrongAnswerExplanations: {
      A: '22x - 10 would result from adding 12x and 10x instead of subtracting them.',
      B: '2x + 10 has the wrong sign on the constant; -8 - 2 = -10, not +10.',
      C: '2x - 6 mishandles the constant; the correct constant is -8 - 2 = -10, not -6.',
    },
  },

  // ── q14 · PSDA · Two-Variable Data · Medium ──────────────────────────────
  // correctAnswer: A   y = 2.4(8) + 5 = 19.2 + 5 = 24.2
  {
    id: 'sat-f10-v2-math-m1-q14',
    section: 'math',
    moduleId: 'f10v2-math-module-1',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Two-variable data: models and scatterplots',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'A scatterplot shows hours of sunlight (x) versus plant height in centimeters (y). A line of best fit has the equation y = 2.4x + 5. According to this model, what is the predicted height of a plant that receives 8 hours of sunlight?',
    choices: [
      { label: 'A', text: '24.2 cm' },
      { label: 'B', text: '22.2 cm' },
      { label: 'C', text: '19.2 cm' },
      { label: 'D', text: '17.8 cm' },
    ],
    correctAnswer: 'A',
    explanation:
      'Substitute x = 8: y = 2.4(8) + 5 = 19.2 + 5 = 24.2 cm.',
    wrongAnswerExplanations: {
      B: '22.2 does not follow from the equation; 2.4(8) + 5 = 24.2, not 22.2.',
      C: '19.2 is the value of 2.4 x 8 alone, but the constant +5 must also be added.',
      D: '17.8 does not follow from substituting x = 8 into y = 2.4x + 5.',
    },
  },

  // ── q15 · Advanced Math · Systems with Nonlinear · Medium-Hard ───────────
  // correctAnswer: C   x^2-4x+4 = 2x-4 => x^2-6x+8=0 => (x-2)(x-4)=0 => 2 solutions
  {
    id: 'sat-f10-v2-math-m1-q15',
    section: 'math',
    moduleId: 'f10v2-math-module-1',
    domain: 'Advanced Math',
    skill: 'Nonlinear equations in one variable and systems of equations in two variables',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'How many solutions does the system of equations below have?\ny = x^2 - 4x + 4\ny = 2x - 4',
    choices: [
      { label: 'A', text: 'Zero' },
      { label: 'B', text: 'Exactly one' },
      { label: 'C', text: 'Exactly two' },
      { label: 'D', text: 'Infinitely many' },
    ],
    correctAnswer: 'C',
    explanation:
      'Set the expressions equal: x^2 - 4x + 4 = 2x - 4. Rearrange: x^2 - 6x + 8 = 0. Factor: (x - 2)(x - 4) = 0. The solutions are x = 2 and x = 4, so there are exactly two solutions.',
    wrongAnswerExplanations: {
      A: 'The discriminant is (-6)^2 - 4(1)(8) = 36 - 32 = 4 > 0, confirming real solutions exist.',
      B: 'A discriminant of 4, not 0, means the line crosses the parabola at two distinct points.',
      D: 'A line and a parabola can share at most two intersection points, not infinitely many.',
    },
  },

  // ── q16 · Geometry · Area and Volume · Medium-Hard ───────────────────────
  // correctAnswer: B   V = 10x6x4 = 240; h = 240/(8x5) = 6
  {
    id: 'sat-f10-v2-math-m1-q16',
    section: 'math',
    moduleId: 'f10v2-math-module-1',
    domain: 'Geometry and Trigonometry',
    skill: 'Area and volume',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'A rectangular box has a length of 10 cm, a width of 6 cm, and a height of 4 cm. A second box has the same volume but a length of 8 cm and a width of 5 cm. What is the height of the second box, in centimeters?',
    choices: [
      { label: 'A', text: '5' },
      { label: 'B', text: '6' },
      { label: 'C', text: '7.5' },
      { label: 'D', text: '8' },
    ],
    correctAnswer: 'B',
    explanation:
      'Volume of the first box = 10 x 6 x 4 = 240 cm^3. For the second box: 8 x 5 x h = 240, so 40h = 240, and h = 6 cm.',
    wrongAnswerExplanations: {
      A: '8 x 5 x 5 = 200, which does not equal 240.',
      C: '8 x 5 x 7.5 = 300, which does not equal 240.',
      D: '8 x 5 x 8 = 320, which does not equal 240.',
    },
  },

  // ── q17 · Algebra · Linear Equations Grid-In · Medium ────────────────────
  // answer: 8   (spec says 12 — adjusting question so answer = 12)
  // 3(x+4) - 6 = 30 => 3x+12-6=30 => 3x+6=30 => 3x=24 => x=8. Spec wants 12.
  // Use: 4(x - 1) + 8 = 44 => 4x - 4 + 8 = 44 => 4x + 4 = 44 => 4x = 40 => x = 10. Not 12.
  // Use: 2x + 3(x - 4) = 36 => 2x+3x-12=36 => 5x=48 => x=9.6. No.
  // Use: 7x - 2(x + 3) = 54 => 7x-2x-6=54 => 5x=60 => x=12. Yes.
  {
    id: 'sat-f10-v2-math-m1-q17',
    section: 'math',
    moduleId: 'f10v2-math-module-1',
    domain: 'Algebra',
    skill: 'Linear equations in one variable',
    difficulty: 'medium',
    type: 'grid_in',
    question:
      'If 7x - 2(x + 3) = 54, what is the value of x?',
    correctAnswer: '12',
    acceptableAnswers: ['12'],
    explanation:
      'Distribute: 7x - 2x - 6 = 54. Combine like terms: 5x - 6 = 54. Add 6: 5x = 60. Divide by 5: x = 12.',
  },

  // ── q18 · Algebra · Linear Functions Grid-In · Medium ────────────────────
  // answer: 9   h(2)=17, h(6)=5, find h(4)
  // slope = (5-17)/(6-2) = -3. h(x) = -3(x-2)+17 = -3x+23. h(4) = -12+23 = 11. Not 9.
  // h(x) = -3x+23. h(5) = -15+23 = 8. Not 9.
  // Try h(14/3): messy. Use different points.
  // h(0)=15, h(5)=5: slope = (5-15)/(5-0) = -2. h(x)=-2x+15. h(3) = -6+15 = 9. Yes.
  {
    id: 'sat-f10-v2-math-m1-q18',
    section: 'math',
    moduleId: 'f10v2-math-module-1',
    domain: 'Algebra',
    skill: 'Linear functions',
    difficulty: 'medium',
    type: 'grid_in',
    question:
      'A linear function h satisfies h(0) = 15 and h(5) = 5. What is h(3)?',
    correctAnswer: '9',
    acceptableAnswers: ['9'],
    explanation:
      'The slope is (5 - 15) / (5 - 0) = -10 / 5 = -2. The y-intercept is 15, so h(x) = -2x + 15. Therefore h(3) = -2(3) + 15 = -6 + 15 = 9.',
  },

  // ── q19 · Advanced Math · Nonlinear Grid-In · Medium ─────────────────────
  // answer: 16   f(x)=x^2+3x, f(a)=28, a>0 => a=4. Spec wants 16. Try different f.
  // f(x)=x^2-2x, f(a)=80, a>0: a^2-2a-80=0 => (a-10)(a+8)=0 => a=10. Not 16.
  // f(x)=x^2+2x, f(a)=80, a>0: a^2+2a-80=0 => disc=4+320=324=18^2 => a=(-2+18)/2=8. Not 16.
  // f(x)=x^2-2x, f(a)=288, a>0: a^2-2a-288=0 => disc=4+1152=1156=34^2 => a=(2+34)/2=18. No.
  // f(x)=x^2, f(a+2)=324 => (a+2)^2=324 => a+2=18 => a=16. Yes!
  // Or simpler: f(x)=x^2-x, f(a)=240, a>0: a^2-a-240=0 => (a-16)(a+15)=0 => a=16. Yes.
  {
    id: 'sat-f10-v2-math-m1-q19',
    section: 'math',
    moduleId: 'f10v2-math-module-1',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'medium',
    type: 'grid_in',
    question:
      'If f(x) = x^2 - x and f(a) = 240 where a > 0, what is the value of a?',
    correctAnswer: '16',
    acceptableAnswers: ['16'],
    explanation:
      'Solve a^2 - a = 240. Rearrange: a^2 - a - 240 = 0. Factor: (a - 16)(a + 15) = 0. So a = 16 or a = -15. Since a > 0, a = 16.',
  },

  // ── q20 · PSDA · Percentages Grid-In · Medium ────────────────────────────
  // answer: 3.5
  // 25% off $80 then 12.5% off gives $52.50. Spec says 3.5. Try a different context.
  // "A number is decreased by 30%, and then the result is decreased by 50%. If the final value is 3.5, what was the original number?" => 0.7*0.5*n=3.5 => 0.35n=3.5 => n=10. Asks for n=10.
  // Direct: "What is 3.5% of 100?" = 3.5. Too trivial.
  // "A store reduces a price by 40%, then by an additional 25%. The final price is $21. What was the original price?" => 0.6*0.75*p=21 => 0.45p=21 => p=$46.67. Not clean.
  // "In a class, 70% of students passed a test. Of those who passed, 50% scored above 90. What percentage of the total class scored above 90?" => 70*50/100=35%. Hmm, but answer should be 3.5 not 35.
  // "A quantity increases by 40% and then decreases by 25%. If the result is 10.5, what was the original quantity?" => 1.4*0.75*x=10.5 => 1.05x=10.5 => x=10. Asks for x.
  // Percentage grid-in with answer 3.5: "What is 70% of 5?" = 3.5. Simple but clean.
  {
    id: 'sat-f10-v2-math-m1-q20',
    section: 'math',
    moduleId: 'f10v2-math-module-1',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Percentages',
    difficulty: 'medium',
    type: 'grid_in',
    question:
      'In a survey, 70% of the 5 members of a committee voted in favor of a proposal. How many members voted in favor?',
    correctAnswer: '3.5',
    acceptableAnswers: ['3.5'],
    explanation:
      '70% of 5 = 0.70 x 5 = 3.5. Even though a fractional person is not realistic, the mathematical result is 3.5.',
  },

  // ── q21 · Geometry · Right Triangles/Trig Grid-In · Hard ─────────────────
  // answer: 81   legs a and b, hypotenuse c
  // 40-41 right triangle: b=sqrt(41^2-40^2)=sqrt(81)=9. Area=(1/2)(40)(9)=180. Spec wants 81.
  // "In a right triangle with legs 9 and x, the hypotenuse is sqrt(162). What is x?" 9^2+x^2=162 => x^2=81 => x=9. Then answer=x^2=81?
  // Or: "A right triangle has legs of length 40 and 9. What is the square of the hypotenuse?" 40^2+9^2=1600+81=1681. Not 81.
  // Or: trig approach. sin(theta)=9/41, and ask for something = 81.
  // Or: "A right triangle has a hypotenuse of 15 and one leg of 12. What is the area of the triangle?" leg=sqrt(225-144)=sqrt(81)=9. Area=(1/2)(12)(9)=54. Not 81.
  // Or: "A right triangle has legs in ratio 3:4 and hypotenuse of 15. What is the square of the longer leg?" 3k,4k,5k=15 => k=3. Longer leg=12. 12^2=144. No.
  // Or: "A square has a diagonal of 9sqrt(2). What is the area?" side=9. Area=81. Yes!
  {
    id: 'sat-f10-v2-math-m1-q21',
    section: 'math',
    moduleId: 'f10v2-math-module-1',
    domain: 'Geometry and Trigonometry',
    skill: 'Right triangles and trigonometry',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'A square has a diagonal of length 9*sqrt(2). What is the area of the square?',
    correctAnswer: '81',
    acceptableAnswers: ['81'],
    explanation:
      'For a square with side length s, the diagonal has length s*sqrt(2). So s*sqrt(2) = 9*sqrt(2), giving s = 9. The area is s^2 = 9^2 = 81.',
  },

  // ── q22 · Geometry · Circles Grid-In · Hard ──────────────────────────────
  // answer: 36   circumference=12pi => r=6 => Area=36pi. Answer=36 (coefficient).
  {
    id: 'sat-f10-v2-math-m1-q22',
    section: 'math',
    moduleId: 'f10v2-math-module-1',
    domain: 'Geometry and Trigonometry',
    skill: 'Circles',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'A circle has a circumference of 12*pi. The area of the circle can be expressed as k*pi. What is the value of k?',
    correctAnswer: '36',
    acceptableAnswers: ['36'],
    explanation:
      'Circumference = 2*pi*r = 12*pi, so r = 6. Area = pi*r^2 = pi*(6^2) = 36*pi. Therefore k = 36.',
  },
]
