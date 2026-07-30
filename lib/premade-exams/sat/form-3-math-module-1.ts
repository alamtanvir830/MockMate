import type { MathQuestion } from './types'

export const f3MathModule1Questions: MathQuestion[] = [
  // ── Q01 · Algebra · easy · MC · "Linear equations in one variable" ────────
  {
    id: 'sat-f3-math-m1-q01',
    section: 'math',
    moduleId: 'f3-math-module-1',
    domain: 'Algebra',
    skill: 'Linear equations in one variable',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'Solve for x: 5(x − 2) = 3x + 8',
    choices: [
      { label: 'A', text: '6' },
      { label: 'B', text: '7' },
      { label: 'C', text: '9' },
      { label: 'D', text: '11' },
    ],
    correctAnswer: 'C',
    explanation:
      'Distribute: 5x − 10 = 3x + 8. Subtract 3x from both sides: 2x − 10 = 8. Add 10: 2x = 18. Divide by 2: x = 9. Verify: 5(9 − 2) = 35 and 3(9) + 8 = 35 ✓.',
    wrongAnswerExplanations: {
      A: 'x = 6: left side = 5(4) = 20, right side = 3(6) + 8 = 26. These are not equal.',
      B: 'x = 7: left side = 5(5) = 25, right side = 3(7) + 8 = 29. These are not equal.',
      D: 'x = 11: left side = 5(9) = 45, right side = 3(11) + 8 = 41. These are not equal.',
    },
  },

  // ── Q02 · Algebra · easy · MC · "Linear functions" ───────────────────────
  {
    id: 'sat-f3-math-m1-q02',
    section: 'math',
    moduleId: 'f3-math-module-1',
    domain: 'Algebra',
    skill: 'Linear functions',
    difficulty: 'easy',
    type: 'multiple_choice',
    question:
      'A taxi charges a base fare of $3.50 plus $1.20 per mile. Which function gives the total cost C(m), in dollars, for a trip of m miles?',
    choices: [
      { label: 'A', text: 'C(m) = 1.20m' },
      { label: 'B', text: 'C(m) = 3.50m + 1.20' },
      { label: 'C', text: 'C(m) = 3.50 + 1.20m' },
      { label: 'D', text: 'C(m) = 4.70m' },
    ],
    correctAnswer: 'C',
    explanation:
      'Total cost = fixed base fare + (rate per mile) × (miles). C(m) = 3.50 + 1.20m.',
    wrongAnswerExplanations: {
      A: 'This omits the base fare of $3.50.',
      B: 'This swaps the two values: $3.50 should be the flat fee, not the per-mile rate.',
      D: '4.70 = 3.50 + 1.20 adds the two constants together as if both were per-mile charges, ignoring that $3.50 is fixed.',
    },
  },

  // ── Q03 · Algebra · medium · MC · "Linear functions" ─────────────────────
  {
    id: 'sat-f3-math-m1-q03',
    section: 'math',
    moduleId: 'f3-math-module-1',
    domain: 'Algebra',
    skill: 'Linear functions',
    difficulty: 'medium',
    type: 'multiple_choice',
    // Verified: slope = (3−11)/(5−1) = −2; h(x) = −2x+13; h(8) = −3.
    question: 'The function h is linear. h(1) = 11 and h(5) = 3. What is the value of h(8)?',
    choices: [
      { label: 'A', text: '−5' },
      { label: 'B', text: '−3' },
      { label: 'C', text: '1' },
      { label: 'D', text: '5' },
    ],
    correctAnswer: 'B',
    explanation:
      'Slope = (3 − 11)/(5 − 1) = −8/4 = −2. Using point (1, 11): h(x) = −2x + 13. h(8) = −2(8) + 13 = −16 + 13 = −3.',
    wrongAnswerExplanations: {
      A: 'h(x) = −5 when −2x + 13 = −5 → x = 9, not x = 8.',
      C: 'h(x) = 1 when −2x + 13 = 1 → x = 6, not x = 8.',
      D: 'h(5) = 3, not 5. h(x) = 5 when −2x + 13 = 5 → x = 4.',
    },
  },

  // ── Q04 · Algebra · medium · MC · "Systems of linear equations" ──────────
  {
    id: 'sat-f3-math-m1-q04',
    section: 'math',
    moduleId: 'f3-math-module-1',
    domain: 'Algebra',
    skill: 'Systems of two linear equations in two variables',
    difficulty: 'medium',
    type: 'multiple_choice',
    // m + c = 80; 2.50m + 1.50c = 150.
    // c = 80 − m; 2.50m + 1.50(80 − m) = 150 → 2.50m + 120 − 1.50m = 150 → m = 30.
    question:
      'A bakery sells muffins for $2.50 each and cookies for $1.50 each. On a given morning, the bakery sold a combined total of 80 muffins and cookies and collected exactly $150 in revenue from those sales. How many muffins were sold?',
    choices: [
      { label: 'A', text: '20' },
      { label: 'B', text: '30' },
      { label: 'C', text: '50' },
      { label: 'D', text: '60' },
    ],
    correctAnswer: 'B',
    explanation:
      'Let m = number of muffins and c = number of cookies.\n\nEquation 1 (count): m + c = 80\nEquation 2 (revenue): 2.50m + 1.50c = 150\n\nFrom Equation 1: c = 80 − m. Substitute into Equation 2:\n2.50m + 1.50(80 − m) = 150\n2.50m + 120 − 1.50m = 150\nm = 30\n\nVerify: c = 50; revenue = 2.50(30) + 1.50(50) = 75 + 75 = $150 ✓',
    wrongAnswerExplanations: {
      A: '20 muffins and 60 cookies gives revenue = 2.50(20) + 1.50(60) = 50 + 90 = $140, not $150.',
      C: '50 is the number of cookies, not muffins — a common error from solving for c instead of m.',
      D: '60 muffins and 20 cookies gives revenue = 2.50(60) + 1.50(20) = 150 + 30 = $180, not $150.',
    },
  },

  // ── Q05 · Algebra · medium · MC · "Linear inequalities" ──────────────────
  {
    id: 'sat-f3-math-m1-q05',
    section: 'math',
    moduleId: 'f3-math-module-1',
    domain: 'Algebra',
    skill: 'Linear inequalities',
    difficulty: 'medium',
    type: 'multiple_choice',
    // (74+83+79+x)/4 ≥ 80 → 236+x ≥ 320 → x ≥ 84.
    question:
      "A student needs to earn an average of at least 80 on four tests to receive a B grade. The student's first three scores are 74, 83, and 79. What is the minimum score the student must earn on the fourth test?",
    choices: [
      { label: 'A', text: '80' },
      { label: 'B', text: '82' },
      { label: 'C', text: '84' },
      { label: 'D', text: '86' },
    ],
    correctAnswer: 'C',
    explanation:
      'Set up: (74 + 83 + 79 + x)/4 ≥ 80. The sum of the first three scores is 236. So 236 + x ≥ 320, giving x ≥ 84. The minimum score needed is 84.',
    wrongAnswerExplanations: {
      A: 'Score of 80: total = 316; average = 316/4 = 79 < 80. Not sufficient.',
      B: 'Score of 82: total = 318; average = 318/4 = 79.5 < 80. Not sufficient.',
      D: 'While 86 would satisfy the requirement, 84 is the minimum. Any score above 84 also works, but the question asks for the minimum.',
    },
  },

  // ── Q06 · Algebra · hard · MC · "Systems of linear equations" ────────────
  {
    id: 'sat-f3-math-m1-q06',
    section: 'math',
    moduleId: 'f3-math-module-1',
    domain: 'Algebra',
    skill: 'Systems of linear equations',
    difficulty: 'hard',
    type: 'multiple_choice',
    // For infinitely many solutions: equations must be identical.
    // Multiply eq2 by 3/2: (3/2)(6x−4y)=c·(3/2) → 9x−6y = 3c/2.
    // Compare to eq2 as given: 9x−6y = c. Multiply eq1 by 3/2: 9x−6y = 21. So c = 21.
    question:
      'For what value of c does the system below have infinitely many solutions?\n\n6x − 4y = 14\n9x − 6y = c',
    choices: [
      { label: 'A', text: '14' },
      { label: 'B', text: '18' },
      { label: 'C', text: '21' },
      { label: 'D', text: '28' },
    ],
    correctAnswer: 'C',
    explanation:
      'Infinitely many solutions occur when both equations describe the same line. Multiply the first equation by 3/2: (3/2)(6x − 4y) = (3/2)(14) → 9x − 6y = 21. For this to equal the second equation, c = 21.',
    wrongAnswerExplanations: {
      A: 'c = 14 would make the constant terms equal but the coefficient of x in the second equation (9) is 3/2 times that in the first (6), so the constant must also be scaled by 3/2: 14 × 3/2 = 21.',
      B: 'c = 18 gives lines with the same slope but different y-intercepts (parallel, no solution).',
      D: 'c = 28 = 2 × 14 scales by 2 instead of 3/2; scaling the coefficients (6→9 is ×3/2) requires the same factor on the constant.',
    },
  },

  // ── Q07 · Advanced Math · medium · MC · "Equivalent algebraic expressions" ─
  {
    id: 'sat-f3-math-m1-q07',
    section: 'math',
    moduleId: 'f3-math-module-1',
    domain: 'Advanced Math',
    skill: 'Equivalent algebraic expressions',
    difficulty: 'medium',
    type: 'multiple_choice',
    // Complete the square: 2x²+12x+19 = 2(x²+6x)+19 = 2(x+3)²−18+19 = 2(x+3)²+1.
    question: 'Which of the following is equivalent to 2x² + 12x + 19?',
    choices: [
      { label: 'A', text: '2(x + 3)² − 1' },
      { label: 'B', text: '2(x + 3)² + 1' },
      { label: 'C', text: '(2x + 6)² + 1' },
      { label: 'D', text: '2(x + 6)² + 19' },
    ],
    correctAnswer: 'B',
    explanation:
      'Complete the square: 2x² + 12x + 19 = 2(x² + 6x) + 19. To complete the square inside the parentheses, add and subtract (6/2)² = 9: = 2(x² + 6x + 9 − 9) + 19 = 2(x + 3)² − 18 + 19 = 2(x + 3)² + 1.',
    wrongAnswerExplanations: {
      A: 'The constant inside is −18 + 19 = +1, not −1. The error is computing −18 + 19 as −1 instead of +1.',
      C: '(2x + 6)² = 4x² + 24x + 36, which has a leading coefficient of 4, not 2. This is not equivalent to the original expression.',
      D: '2(x + 6)² = 2(x² + 12x + 36) = 2x² + 24x + 72. The middle-term coefficient would be 24, but the original expression has 12x.',
    },
  },

  // ── Q08 · Advanced Math · medium · MC · "Nonlinear functions" ────────────
  {
    id: 'sat-f3-math-m1-q08',
    section: 'math',
    moduleId: 'f3-math-module-1',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'medium',
    type: 'multiple_choice',
    // f(x) = 2^x, g(x) = f(x+3) = 2^(x+3) = 8·2^x.
    question:
      'Let f(x) = 2^x and g(x) = f(x + 3). Which of the following is equivalent to g(x)?',
    choices: [
      { label: 'A', text: '2^x + 3' },
      { label: 'B', text: '8 · 2^x' },
      { label: 'C', text: '6 · 2^x' },
      { label: 'D', text: '2^x + 8' },
    ],
    correctAnswer: 'B',
    explanation:
      'g(x) = f(x + 3) = 2^(x + 3). Using the exponent product rule: 2^(x + 3) = 2^x · 2^3 = 8 · 2^x.',
    wrongAnswerExplanations: {
      A: '2^x + 3 is a vertical shift; replacing x with x + 3 in f does not add 3 to the output.',
      C: '2^3 = 8, not 6. 6 · 2^x would come from an incorrect computation of 2^3.',
      D: '2^x + 8 adds 8 as if it were a vertical shift; the horizontal shift produces multiplication, not addition.',
    },
  },

  // ── Q09 · Advanced Math · medium · MC · "Equivalent algebraic expressions"
  {
    id: 'sat-f3-math-m1-q09',
    section: 'math',
    moduleId: 'f3-math-module-1',
    domain: 'Advanced Math',
    skill: 'Equivalent algebraic expressions',
    difficulty: 'medium',
    type: 'multiple_choice',
    // Factor: 3x²+7x−6. Product = −18, sum = 7 → 9 and −2.
    // 3x²+9x−2x−6 = 3x(x+3)−2(x+3) = (3x−2)(x+3). Divide by (x+3): 3x−2.
    question:
      'Which expression is equivalent to (3x² + 7x − 6) / (x + 3), for x ≠ −3?',
    choices: [
      { label: 'A', text: '3x − 2' },
      { label: 'B', text: '3x + 2' },
      { label: 'C', text: '3x − 2 + 12/(x + 3)' },
      { label: 'D', text: 'x − 2' },
    ],
    correctAnswer: 'A',
    explanation:
      'Factor the numerator. Find two numbers with product 3 × (−6) = −18 and sum 7: those are 9 and −2. Rewrite: 3x² + 9x − 2x − 6 = 3x(x + 3) − 2(x + 3) = (3x − 2)(x + 3). Dividing by (x + 3) gives 3x − 2.',
    wrongAnswerExplanations: {
      B: '(3x + 2)(x + 3) = 3x² + 11x + 6 ≠ 3x² + 7x − 6.',
      C: 'The division has no remainder because (x + 3) is a factor of the numerator; no remainder term is needed.',
      D: 'x − 2 has no x² term, so (x − 2)(x + 3) = x² + x − 6, which is a degree-2 polynomial but does not equal the numerator.',
    },
  },

  // ── Q10 · Advanced Math · hard · MC · "Nonlinear equations in one variable"
  {
    id: 'sat-f3-math-m1-q10',
    section: 'math',
    moduleId: 'f3-math-module-1',
    domain: 'Advanced Math',
    skill: 'Nonlinear equations in one variable',
    difficulty: 'hard',
    type: 'multiple_choice',
    // Let u = x+4: u²−5u+6=0 → (u−2)(u−3)=0 → u=2,3.
    // x = u−4: x=−2 or x=−1. Sum = −3.
    question:
      'The equation (x + 4)² − 5(x + 4) + 6 = 0 has two solutions. What is the sum of the two solutions?',
    choices: [
      { label: 'A', text: '−8' },
      { label: 'B', text: '−3' },
      { label: 'C', text: '5' },
      { label: 'D', text: '−5' },
    ],
    correctAnswer: 'B',
    explanation:
      'Substitute u = x + 4. The equation becomes u² − 5u + 6 = 0 → (u − 2)(u − 3) = 0 → u = 2 or u = 3. Converting back: x = u − 4 gives x = −2 or x = −1. Sum = −2 + (−1) = −3.',
    wrongAnswerExplanations: {
      A: '−8 = −4 + (−4) would come from forgetting to subtract 4 when converting u back to x, or from subtracting 4 twice.',
      C: '5 = 2 + 3 is the sum of the u-values, not the x-values.',
      D: '−5 is the coefficient of u in the equation; it is not the sum of the solutions.',
    },
  },

  // ── Q11 · Advanced Math · hard · MC · "Nonlinear functions" ──────────────
  {
    id: 'sat-f3-math-m1-q11',
    section: 'math',
    moduleId: 'f3-math-module-1',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'hard',
    type: 'multiple_choice',
    // P(t) = 500·3^(t/4). Verify: P(4)=500·3=1500 ✓, P(8)=500·9=4500 ✓.
    question:
      'A population of bacteria triples every 4 hours. At time t = 0, the population is 500. Which function gives the population P after t hours?',
    choices: [
      { label: 'A', text: 'P(t) = 500 · 3^t' },
      { label: 'B', text: 'P(t) = 500 · 3^(t/4)' },
      { label: 'C', text: 'P(t) = 500 · (1/3)^(t/4)' },
      { label: 'D', text: 'P(t) = 500 + 1500t' },
    ],
    correctAnswer: 'B',
    explanation:
      'The population triples every 4 hours, so in t hours there are t/4 tripling periods. P(t) = 500 · 3^(t/4). Check: P(4) = 500 · 3^1 = 1500 (tripled from 500 ✓); P(8) = 500 · 3^2 = 4500 (tripled again ✓).',
    wrongAnswerExplanations: {
      A: 'P(t) = 500 · 3^t would triple every 1 hour (not every 4 hours). P(4) = 500 · 81 = 40500, far above 1500.',
      C: '(1/3)^(t/4) is a decreasing function; this would model a population shrinking by a factor of 3 every 4 hours.',
      D: 'This is a linear model. Exponential tripling cannot be modeled by a linear function.',
    },
  },

  // ── Q12 · Advanced Math · medium · grid_in · "Equivalent algebraic expressions"
  {
    id: 'sat-f3-math-m1-q12',
    section: 'math',
    moduleId: 'f3-math-module-1',
    domain: 'Advanced Math',
    skill: 'Equivalent algebraic expressions',
    difficulty: 'medium',
    type: 'grid_in',
    // x²−y² = (x+y)(x−y) = 40; x−y=5 → x+y=8.
    question: 'If x² − y² = 40 and x − y = 5, what is the value of x + y?',
    correctAnswer: '8',
    acceptableAnswers: ['8'],
    explanation:
      'The difference of squares identity gives x² − y² = (x + y)(x − y). Substituting x − y = 5: (x + y)(5) = 40 → x + y = 8.',
    scoringNotes: 'Only 8 is acceptable.',
  },

  // ── Q13 · Advanced Math · medium · MC · "Nonlinear equations in one variable"
  {
    id: 'sat-f3-math-m1-q13',
    section: 'math',
    moduleId: 'f3-math-module-1',
    domain: 'Advanced Math',
    skill: 'Nonlinear equations in one variable',
    difficulty: 'medium',
    type: 'multiple_choice',
    // 2x²+8x+8=0 → x²+4x+4=0 → (x+2)²=0 → x=−2 (one repeated root).
    question: 'How many distinct real solutions does the equation 2x² + 8x + 8 = 0 have?',
    choices: [
      { label: 'A', text: 'Zero' },
      { label: 'B', text: 'Exactly one' },
      { label: 'C', text: 'Exactly two' },
      { label: 'D', text: 'Infinitely many' },
    ],
    correctAnswer: 'B',
    explanation:
      'Divide both sides by 2: x² + 4x + 4 = 0. Factor: (x + 2)² = 0 → x = −2. There is exactly one distinct real solution (a repeated root). Alternatively, the discriminant is b² − 4ac = 16 − 16 = 0, which confirms one repeated real root.',
    wrongAnswerExplanations: {
      A: 'Zero distinct real solutions requires a negative discriminant. Here the discriminant is 0, giving one real solution.',
      C: 'Two distinct real solutions require a positive discriminant. Since the discriminant is 0, there is only one (repeated) solution.',
      D: 'Infinitely many solutions would require the equation to reduce to 0 = 0. This equation has the single solution x = −2.',
    },
  },

  // ── Q14 · PSDA · easy · MC · "Ratios, rates, proportional relationships, and units"
  {
    id: 'sat-f3-math-m1-q14',
    section: 'math',
    moduleId: 'f3-math-module-1',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Ratios, rates, proportional relationships, and units',
    difficulty: 'easy',
    type: 'multiple_choice',
    // Speed = 260/4 = 65 mph. Distance in 7 hours = 65×7 = 455.
    question:
      'A car travels 260 miles in 4 hours at a constant speed. At the same speed, how many miles will it travel in 7 hours?',
    choices: [
      { label: 'A', text: '390' },
      { label: 'B', text: '420' },
      { label: 'C', text: '455' },
      { label: 'D', text: '520' },
    ],
    correctAnswer: 'C',
    explanation:
      'Speed = 260 ÷ 4 = 65 miles per hour. Distance in 7 hours = 65 × 7 = 455 miles.',
    wrongAnswerExplanations: {
      A: '390 = 65 × 6 corresponds to 6 hours of travel, not 7.',
      B: '420 = 60 × 7 uses an incorrect speed of 60 mph instead of 65 mph.',
      D: '520 = 65 × 8 corresponds to 8 hours of travel, not 7.',
    },
  },

  // ── Q15 · PSDA · medium · grid_in · "Percentages" ───────────────────────
  {
    id: 'sat-f3-math-m1-q15',
    section: 'math',
    moduleId: 'f3-math-module-1',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Percentages',
    difficulty: 'medium',
    type: 'grid_in',
    // 1.25p = 1125 → p = 1125/1.25 = 900.
    question:
      'After a 25% price increase, a laptop costs $1,125. What was the original price of the laptop, in dollars?',
    correctAnswer: '900',
    acceptableAnswers: ['900'],
    explanation:
      'A 25% increase means the new price equals 125% of the original. Let p be the original price: 1.25p = 1125 → p = 1125 ÷ 1.25 = $900.',
    scoringNotes: 'Only 900 is acceptable.',
  },

  // ── Q16 · PSDA · medium · MC · "Data distributions" ─────────────────────
  {
    id: 'sat-f3-math-m1-q16',
    section: 'math',
    moduleId: 'f3-math-module-1',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Data distributions',
    difficulty: 'medium',
    type: 'multiple_choice',
    // Data: {4, 7, 9, 12, 15, 21, 40}. n=7, sorted.
    // Mean = (4+7+9+12+15+21+40)/7 = 108/7 ≈ 15.43.
    // Median = 12 (4th of 7 values).
    // Mean (≈15.43) > Median (12). Right-skewed due to outlier 40.
    question:
      'The data set {4, 7, 9, 12, 15, 21, 40} has mean M and median m. Which of the following is true?',
    choices: [
      { label: 'A', text: 'M = m' },
      { label: 'B', text: 'M < m' },
      { label: 'C', text: 'M > m' },
      { label: 'D', text: 'M = 3m' },
    ],
    correctAnswer: 'C',
    explanation:
      'Sum = 4 + 7 + 9 + 12 + 15 + 21 + 40 = 108. Mean M = 108/7 ≈ 15.43. Median m = 12 (the 4th value in the ordered list of 7). Since 15.43 > 12, M > m. The large outlier (40) pulls the mean above the median.',
    wrongAnswerExplanations: {
      A: 'M = m only when the distribution is perfectly symmetric. The outlier 40 makes the data right-skewed, so mean exceeds median.',
      B: 'M < m would indicate a left-skewed distribution (an outlier on the low end). Here the outlier is on the high end, making M > m.',
      D: 'M = 3m would require M ≈ 36, but M ≈ 15.43.',
    },
  },

  // ── Q17 · PSDA · hard · MC · "Probability" ───────────────────────────────
  {
    id: 'sat-f3-math-m1-q17',
    section: 'math',
    moduleId: 'f3-math-module-1',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Probability',
    difficulty: 'hard',
    type: 'multiple_choice',
    // Total = 12. P(1st red) = 5/12. P(2nd red | 1st red) = 4/11.
    // P(both red) = 20/132 = 5/33.
    question:
      'A box contains 5 red chips, 4 blue chips, and 3 white chips. Two chips are drawn at random without replacement. What is the probability that both chips are red?',
    choices: [
      { label: 'A', text: '5/33' },
      { label: 'B', text: '25/144' },
      { label: 'C', text: '1/6' },
      { label: 'D', text: '5/12' },
    ],
    correctAnswer: 'A',
    explanation:
      'Total chips = 5 + 4 + 3 = 12. P(first chip is red) = 5/12. After removing one red chip, 4 red chips remain out of 11 total. P(second chip is red | first was red) = 4/11. P(both red) = (5/12)(4/11) = 20/132 = 5/33.',
    wrongAnswerExplanations: {
      B: '25/144 = (5/12)² treats the two draws as independent (with replacement). The problem specifies without replacement, so the denominator decreases after the first draw.',
      C: '1/6 ≈ 0.167 slightly overestimates the correct answer of 5/33 ≈ 0.152.',
      D: '5/12 is the probability that the first chip drawn is red — it does not account for the second draw.',
    },
  },

  // ── Q18 · PSDA · hard · grid_in · "Ratios, rates, proportional relationships, and units"
  {
    id: 'sat-f3-math-m1-q18',
    section: 'math',
    moduleId: 'f3-math-module-1',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Ratios, rates, proportional relationships, and units',
    difficulty: 'hard',
    type: 'grid_in',
    // Ratio 6:2:1. Total parts = 9. Flour = 6 parts = 15 cups → 1 part = 2.5 cups.
    // Total = 9 × 2.5 = 22.5.
    question:
      'A recipe uses flour, sugar, and butter in the ratio 6 : 2 : 1. A baker uses exactly 15 cups of flour. How many total cups of all three ingredients are used?',
    correctAnswer: '22.5',
    acceptableAnswers: ['22.5', '45/2'],
    explanation:
      'The ratio 6 : 2 : 1 has 6 + 2 + 1 = 9 total parts. Flour represents 6 parts = 15 cups, so 1 part = 2.5 cups. Total cups = 9 × 2.5 = 22.5.',
    scoringNotes: 'Accept 22.5 or the equivalent fraction 45/2.',
  },

  // ── Q19 · Geometry · easy · MC · "Angles, triangles" ─────────────────────
  {
    id: 'sat-f3-math-m1-q19',
    section: 'math',
    moduleId: 'f3-math-module-1',
    domain: 'Geometry and Trigonometry',
    skill: 'Angles, triangles',
    difficulty: 'easy',
    type: 'multiple_choice',
    // (x+15)+(2x−5)+(x+10)=180 → 4x+20=180 → x=40.
    question:
      'A triangle has interior angles measuring (x + 15)°, (2x − 5)°, and (x + 10)°. What is the value of x?',
    choices: [
      { label: 'A', text: '30' },
      { label: 'B', text: '35' },
      { label: 'C', text: '40' },
      { label: 'D', text: '45' },
    ],
    correctAnswer: 'C',
    explanation:
      'The interior angles of a triangle sum to 180°: (x + 15) + (2x − 5) + (x + 10) = 180 → 4x + 20 = 180 → 4x = 160 → x = 40. Check: 55° + 75° + 50° = 180° ✓',
    wrongAnswerExplanations: {
      A: 'x = 30 gives angles 45°, 55°, and 40° — sum = 140° ≠ 180°.',
      B: 'x = 35 gives angles 50°, 65°, and 45° — sum = 160° ≠ 180°.',
      D: 'x = 45 gives angles 60°, 85°, and 55° — sum = 200° ≠ 180°.',
    },
  },

  // ── Q20 · Geometry · medium · MC · "Area and perimeter" ──────────────────
  {
    id: 'sat-f3-math-m1-q20',
    section: 'math',
    moduleId: 'f3-math-module-1',
    domain: 'Geometry and Trigonometry',
    skill: 'Area and perimeter',
    difficulty: 'medium',
    type: 'multiple_choice',
    // C = 2πr = 28π → r = 14. Area = π(14)² = 196π.
    question:
      'A circular garden has a circumference of 28π feet. What is the area of the garden, in square feet?',
    choices: [
      { label: 'A', text: '49π' },
      { label: 'B', text: '56π' },
      { label: 'C', text: '196π' },
      { label: 'D', text: '784π' },
    ],
    correctAnswer: 'C',
    explanation:
      'Circumference = 2πr = 28π → r = 14 feet. Area = πr² = π(14)² = 196π square feet.',
    wrongAnswerExplanations: {
      A: '49π = π(7)² — this halves the radius twice (28 → 14 → 7) before squaring.',
      B: '56π confuses circumference and area formulas by doubling the circumference value.',
      D: '784π = π(28)² uses the diameter (or the raw circumference coefficient 28) as the radius.',
    },
  },

  // ── Q21 · Geometry · medium · MC · "Right triangles and trigonometry" ────
  {
    id: 'sat-f3-math-m1-q21',
    section: 'math',
    moduleId: 'f3-math-module-1',
    domain: 'Geometry and Trigonometry',
    skill: 'Right triangles and trigonometry',
    difficulty: 'medium',
    type: 'multiple_choice',
    // height² = 17²−8² = 289−64 = 225 → height = 15. sin(θ) = 15/17.
    question:
      'A 17-foot ladder leans against a vertical wall. The base of the ladder rests on horizontal ground 8 feet from the base of the wall. What is the value of sin(θ), where θ is the angle the ladder makes with the ground?',
    choices: [
      { label: 'A', text: '8/17' },
      { label: 'B', text: '8/15' },
      { label: 'C', text: '15/17' },
      { label: 'D', text: '17/15' },
    ],
    correctAnswer: 'C',
    explanation:
      'The wall is vertical, so the ladder, wall, and ground form a right triangle. Find the height using the Pythagorean theorem: height² = 17² − 8² = 289 − 64 = 225 → height = 15 feet. The angle θ is at the base of the ladder. The side opposite θ is the height (15) and the hypotenuse is the ladder (17). sin(θ) = opposite/hypotenuse = 15/17.',
    wrongAnswerExplanations: {
      A: '8/17 is cos(θ) — the ratio of the adjacent side (8, along the ground) to the hypotenuse (17). This gives cosine, not sine.',
      B: '8/15 divides two leg lengths rather than using the hypotenuse. Sine is always opposite divided by hypotenuse.',
      D: '17/15 exceeds 1, which is impossible for a sine value. This inverts the correct ratio.',
    },
  },

  // ── Q22 · Geometry · hard · grid_in · "Area and perimeter" ───────────────
  {
    id: 'sat-f3-math-m1-q22',
    section: 'math',
    moduleId: 'f3-math-module-1',
    domain: 'Geometry and Trigonometry',
    skill: 'Area and perimeter',
    difficulty: 'hard',
    type: 'grid_in',
    // Pythagorean triple 10-24-26: 10²+24²=100+576=676=26². Area = (10×24)/2 = 120.
    // longer leg (24) minus shorter leg (10) = 14. Problem states "14 more."
    question:
      'A right triangle has a hypotenuse of length 26. The longer leg is 14 more than the shorter leg. What is the area of the triangle, in square units?',
    correctAnswer: '120',
    acceptableAnswers: ['120'],
    explanation:
      'Let the shorter leg = a. Then the longer leg = a + 14. By the Pythagorean theorem: a² + (a + 14)² = 26² → a² + a² + 28a + 196 = 676 → 2a² + 28a − 480 = 0 → a² + 14a − 240 = 0. Factor: (a + 24)(a − 10) = 0 → a = 10 (rejecting the negative value). The legs are 10 and 24. Area = (1/2)(10)(24) = 120 square units.',
    scoringNotes: 'Only 120 is acceptable.',
  },
]
