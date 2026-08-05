import type { MathQuestion } from '../types'

export const f6MathModule1QuestionsV2: MathQuestion[] = [
  // Q1 — Algebra / Linear equations in one variable / easy
  {
    id: 'sat-f6-v2-math-m1-q01',
    section: 'math',
    moduleId: 'f6v2-math-module-1',
    domain: 'Algebra',
    skill: 'Linear equations in one variable',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'If 4x − 3 = 17, what is the value of x?',
    choices: [
      { label: 'A', text: '3' },
      { label: 'B', text: '4' },
      { label: 'C', text: '5' },
      { label: 'D', text: '7' },
    ],
    correctAnswer: 'C',
    explanation:
      '4x − 3 = 17 → 4x = 20 → x = 5. Check: 4(5) − 3 = 20 − 3 = 17. ✓',
    wrongAnswerExplanations: {
      A: 'x = 3 gives 4(3) − 3 = 9 ≠ 17. This may come from computing 17/4 ≈ 4.25, or from incorrectly adding 3 to both sides to get 4x = 14, then dividing incorrectly.',
      B: 'x = 4 gives 4(4) − 3 = 13 ≠ 17. A student might divide 17 − 1 = 16 by 4, or use 4x = 16 after an arithmetic slip.',
      D: 'x = 7 gives 4(7) − 3 = 25 ≠ 17. This results from adding 3 to 17 to get 20 but then subtracting the coefficient (4) instead of dividing: 20 − 4 = 16 ≠ 7.',
    },
  },

  // Q2 — Algebra / Linear functions / easy
  {
    id: 'sat-f6-v2-math-m1-q02',
    section: 'math',
    moduleId: 'f6v2-math-module-1',
    domain: 'Algebra',
    skill: 'Linear functions',
    difficulty: 'easy',
    type: 'multiple_choice',
    stimulus:
      'A car rental company charges a flat fee of $25 plus $0.15 per mile driven.',
    question:
      'Which of the following functions gives the total cost C, in dollars, for driving m miles?',
    choices: [
      { label: 'A', text: 'C(m) = 0.15m' },
      { label: 'B', text: 'C(m) = 25m + 0.15' },
      { label: 'C', text: 'C(m) = 0.15m + 25' },
      { label: 'D', text: 'C(m) = 25 − 0.15m' },
    ],
    correctAnswer: 'C',
    explanation:
      'Total cost = (rate per mile × miles driven) + flat fee = 0.15m + 25. The flat fee of $25 is a constant added regardless of distance; 0.15m is the mileage charge.',
    wrongAnswerExplanations: {
      A: 'C(m) = 0.15m omits the $25 flat fee. This gives only the per-mile charge.',
      B: 'C(m) = 25m + 0.15 treats $25 as the per-mile rate and $0.15 as the flat fee — the roles of the two values are reversed.',
      D: 'C(m) = 25 − 0.15m subtracts the mileage cost, implying driving more miles reduces the total cost. This is the wrong operation.',
    },
  },

  // Q3 — Algebra / Linear inequalities / easy
  {
    id: 'sat-f6-v2-math-m1-q03',
    section: 'math',
    moduleId: 'f6v2-math-module-1',
    domain: 'Algebra',
    skill: 'Linear inequalities in one or two variables',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'Which value of x satisfies 3x + 4 > 19?',
    choices: [
      { label: 'A', text: '3' },
      { label: 'B', text: '4' },
      { label: 'C', text: '5' },
      { label: 'D', text: '6' },
    ],
    correctAnswer: 'D',
    explanation:
      'Solve: 3x + 4 > 19 → 3x > 15 → x > 5. Among the choices, only x = 6 satisfies x > 5. Check: 3(6) + 4 = 22 > 19. ✓',
    wrongAnswerExplanations: {
      A: 'x = 3: 3(3) + 4 = 13, which is not greater than 19.',
      B: 'x = 4: 3(4) + 4 = 16, which is not greater than 19.',
      C: 'x = 5: 3(5) + 4 = 19. The inequality is strict (>), so x = 5 is not a solution — 19 is not greater than 19.',
    },
  },

  // Q4 — Problem-Solving and Data Analysis / Ratios, rates, proportional relationships / easy
  {
    id: 'sat-f6-v2-math-m1-q04',
    section: 'math',
    moduleId: 'f6v2-math-module-1',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Ratios, rates, proportional relationships, and units',
    difficulty: 'easy',
    type: 'multiple_choice',
    stimulus:
      'A recipe calls for 3 cups of flour to make 24 cookies. Priya wants to make 72 cookies using the same recipe.',
    question: 'How many cups of flour does Priya need?',
    choices: [
      { label: 'A', text: '6' },
      { label: 'B', text: '8' },
      { label: 'C', text: '9' },
      { label: 'D', text: '12' },
    ],
    correctAnswer: 'C',
    explanation:
      '72 cookies is 3 times the original 24 cookies, so Priya needs 3 × 3 = 9 cups of flour. Alternatively, using a proportion: (3 cups / 24 cookies) × 72 cookies = 216/24 = 9 cups.',
    wrongAnswerExplanations: {
      A: '6 cups would make 48 cookies (double the original batch), not 72.',
      B: '8 cups results from dividing 72 by 3 × 3 = 9: computing 72/9 = 8 confuses the scaling factor with the denominator.',
      D: '12 cups would make 4 × 24 = 96 cookies, not 72. This overestimates the scaling factor.',
    },
  },

  // Q5 — Problem-Solving and Data Analysis / Percentages / medium
  {
    id: 'sat-f6-v2-math-m1-q05',
    section: 'math',
    moduleId: 'f6v2-math-module-1',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Percentages',
    difficulty: 'medium',
    type: 'multiple_choice',
    stimulus:
      'A jacket originally priced at $120 is on sale for 35% off. After the discount, a sales tax of 8% is applied to the discounted price.',
    question: 'What is the final price of the jacket, in dollars?',
    choices: [
      { label: 'A', text: '$84.24' },
      { label: 'B', text: '$83.16' },
      { label: 'C', text: '$78.00' },
      { label: 'D', text: '$88.56' },
    ],
    correctAnswer: 'A',
    explanation:
      'Step 1 — apply the 35% discount: sale price = 120 × (1 − 0.35) = 120 × 0.65 = $78.00. Step 2 — apply the 8% tax to the sale price: final price = 78 × 1.08 = 78 + 6.24 = $84.24.',
    wrongAnswerExplanations: {
      B: '$83.16 results from computing the tax on a slightly wrong sale price or from a rounding error mid-calculation.',
      C: '$78.00 is the post-discount price before tax is applied. Students who stop after the discount step land here.',
      D: '$88.56 results from applying the operations in the wrong order: taxing the original price first (120 × 1.08 = $129.60) then taking 35% off (129.60 × 0.65 ≈ $84.24), or from a different sequence of errors such as computing 120 − 0.08 × 120 = $110.40 and then 35% off that.',
    },
  },

  // Q6 — Problem-Solving and Data Analysis / One-variable data / medium
  {
    id: 'sat-f6-v2-math-m1-q06',
    section: 'math',
    moduleId: 'f6v2-math-module-1',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'One-variable data: distributions and measures of center and spread',
    difficulty: 'medium',
    type: 'multiple_choice',
    graphData: {
      type: 'table',
      title: 'Daily High Temperatures (°F) for 7 Days',
      headers: ['Day', 'Temperature (°F)'],
      rows: [
        ['Monday', '72'],
        ['Tuesday', '68'],
        ['Wednesday', '75'],
        ['Thursday', '80'],
        ['Friday', '68'],
        ['Saturday', '77'],
        ['Sunday', '72'],
      ],
    },
    question:
      'Based on the table, by how much does the mean daily high temperature exceed the median daily high temperature?',
    choices: [
      { label: 'A', text: '0' },
      { label: 'B', text: 'Approximately 1' },
      { label: 'C', text: '2' },
      { label: 'D', text: '4' },
    ],
    correctAnswer: 'B',
    explanation:
      'Sum of temperatures = 72 + 68 + 75 + 80 + 68 + 77 + 72 = 512. Mean = 512/7 ≈ 73.14. Sorted: {68, 68, 72, 72, 75, 77, 80}. The median (4th value) = 72. Mean − Median ≈ 73.14 − 72 ≈ 1.14, which is approximately 1.',
    wrongAnswerExplanations: {
      A: 'A difference of 0 would mean the mean equals the median. Mean ≈ 73.14 and median = 72, so they are not equal.',
      C: 'A difference of 2 overestimates. 73.14 − 72 ≈ 1.14, which rounds to approximately 1, not 2.',
      D: 'A difference of 4 would require the mean to be 76 or the median to be 69, neither of which is correct.',
    },
  },

  // Q7 — Algebra / Systems of two linear equations / medium
  {
    id: 'sat-f6-v2-math-m1-q07',
    section: 'math',
    moduleId: 'f6v2-math-module-1',
    domain: 'Algebra',
    skill: 'Systems of two linear equations in two variables',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'What is the solution (x, y) to the system of equations below?\n\n2x + 3y = 12\n4x − y = 10',
    choices: [
      { label: 'A', text: '(3, 2)' },
      { label: 'B', text: '(2, 3)' },
      { label: 'C', text: '(4, 1)' },
      { label: 'D', text: '(1, 4)' },
    ],
    correctAnswer: 'A',
    explanation:
      'From 4x − y = 10, solve for y: y = 4x − 10. Substitute into 2x + 3y = 12: 2x + 3(4x − 10) = 12 → 2x + 12x − 30 = 12 → 14x = 42 → x = 3. Then y = 4(3) − 10 = 2. Solution: (3, 2). Check: 2(3) + 3(2) = 12 ✓; 4(3) − 2 = 10 ✓.',
    wrongAnswerExplanations: {
      B: '(2, 3) reverses x and y. Check: 2(2) + 3(3) = 4 + 9 = 13 ≠ 12.',
      C: '(4, 1): 2(4) + 3(1) = 8 + 3 = 11 ≠ 12. Not a solution.',
      D: '(1, 4): 2(1) + 3(4) = 2 + 12 = 14 ≠ 12. Not a solution.',
    },
  },

  // Q8 — Algebra / Linear equations in two variables / medium
  {
    id: 'sat-f6-v2-math-m1-q08',
    section: 'math',
    moduleId: 'f6v2-math-module-1',
    domain: 'Algebra',
    skill: 'Linear equations in two variables',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'Line k has a slope of −2/3 and passes through the point (6, 1). Which of the following is the equation of line k?',
    choices: [
      { label: 'A', text: 'y = −(2/3)x − 5' },
      { label: 'B', text: 'y = (2/3)x − 3' },
      { label: 'C', text: 'y = −(2/3)x + 3' },
      { label: 'D', text: 'y = −(2/3)x + 5' },
    ],
    correctAnswer: 'D',
    explanation:
      'Use point-slope form: y − 1 = −(2/3)(x − 6) → y − 1 = −(2/3)x + 4 → y = −(2/3)x + 5. Check at x = 6: y = −4 + 5 = 1 ✓.',
    wrongAnswerExplanations: {
      A: 'y = −(2/3)x − 5: at x = 6, y = −4 − 5 = −9 ≠ 1. The constant has the wrong sign; subtracting instead of adding 5.',
      B: 'y = (2/3)x − 3 uses a positive slope. The given slope is −2/3, not +2/3.',
      C: 'y = −(2/3)x + 3: at x = 6, y = −4 + 3 = −1 ≠ 1. Students who compute 1 − 4 = −3 for the y-intercept (subtracting instead of finding b = 1 + 4 = 5) get b = 3 from a sign error.',
    },
  },

  // Q9 — Algebra / Linear inequalities / medium
  {
    id: 'sat-f6-v2-math-m1-q09',
    section: 'math',
    moduleId: 'f6v2-math-module-1',
    domain: 'Algebra',
    skill: 'Linear inequalities in one or two variables',
    difficulty: 'medium',
    type: 'multiple_choice',
    stimulus:
      'A delivery company requires that the total weight of cargo on a truck must be no more than 2,400 pounds. Each box weighs 15 pounds, and the driver plus truck equipment together weigh 450 pounds.',
    question:
      'If b represents the number of boxes loaded on the truck, which inequality represents the maximum allowable number of boxes?',
    choices: [
      { label: 'A', text: 'b ≤ 160' },
      { label: 'B', text: 'b ≤ 130' },
      { label: 'C', text: 'b < 130' },
      { label: 'D', text: 'b ≤ 125' },
    ],
    correctAnswer: 'B',
    explanation:
      'Total weight = weight of boxes + fixed weight ≤ 2400. So 15b + 450 ≤ 2400 → 15b ≤ 1950 → b ≤ 130. The maximum is 130 boxes.',
    wrongAnswerExplanations: {
      A: 'b ≤ 160 ignores the 450-pound fixed weight. Dividing 2400 by 15 directly gives 160, but the driver and equipment already occupy 450 lb.',
      C: 'b < 130 uses a strict inequality. "No more than" means ≤, so b = 130 is allowed.',
      D: 'b ≤ 125 underestimates. 15(125) + 450 = 1875 + 450 = 2325 < 2400, so more boxes fit. 15b = 1950 gives b = 130.',
    },
  },

  // Q10 — Advanced Math / Equivalent expressions / medium
  {
    id: 'sat-f6-v2-math-m1-q10',
    section: 'math',
    moduleId: 'f6v2-math-module-1',
    domain: 'Advanced Math',
    skill: 'Equivalent expressions',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'Which expression is equivalent to (3x² − 5x + 2) − (x² + 2x − 7)?',
    choices: [
      { label: 'A', text: '2x² − 7x − 5' },
      { label: 'B', text: '2x² + 7x − 9' },
      { label: 'C', text: '4x² − 3x − 5' },
      { label: 'D', text: '2x² − 7x + 9' },
    ],
    correctAnswer: 'D',
    explanation:
      'Distribute the negative sign: (3x² − 5x + 2) − (x² + 2x − 7) = 3x² − 5x + 2 − x² − 2x + 7. Combine like terms: (3 − 1)x² + (−5 − 2)x + (2 + 7) = 2x² − 7x + 9.',
    wrongAnswerExplanations: {
      A: '2x² − 7x − 5 has the correct x² and x terms but a sign error in the constant. The constant is 2 − (−7) = 2 + 7 = 9, not 2 − 7 = −5.',
      B: '2x² + 7x − 9 has the x coefficient wrong. −5x − 2x = −7x, not +7x, and the constant sign is also wrong.',
      C: '4x² − 3x − 5 adds the x² coefficients instead of subtracting: 3 + 1 = 4 instead of 3 − 1 = 2.',
    },
  },

  // Q11 — Advanced Math / Quadratic equations and functions / medium
  {
    id: 'sat-f6-v2-math-m1-q11',
    section: 'math',
    moduleId: 'f6v2-math-module-1',
    domain: 'Advanced Math',
    skill: 'Quadratic equations and functions',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'Which of the following is a solution to x² − 5x + 6 = 0?',
    choices: [
      { label: 'A', text: 'x = −3' },
      { label: 'B', text: 'x = 2' },
      { label: 'C', text: 'x = −2' },
      { label: 'D', text: 'x = 6' },
    ],
    correctAnswer: 'B',
    explanation:
      'Factor: x² − 5x + 6 = (x − 2)(x − 3) = 0. Solutions: x = 2 or x = 3. Among the choices, x = 2 is listed. Check: (2)² − 5(2) + 6 = 4 − 10 + 6 = 0 ✓.',
    wrongAnswerExplanations: {
      A: 'x = −3: (−3)² − 5(−3) + 6 = 9 + 15 + 6 = 30 ≠ 0. Students may confuse the factors with the roots by negating the wrong signs.',
      C: 'x = −2: (−2)² − 5(−2) + 6 = 4 + 10 + 6 = 20 ≠ 0. Similar sign confusion with factored form.',
      D: 'x = 6: (6)² − 5(6) + 6 = 36 − 30 + 6 = 12 ≠ 0. Students may choose the constant term 6 as a root.',
    },
  },

  // Q12 — Advanced Math / Nonlinear functions / medium
  {
    id: 'sat-f6-v2-math-m1-q12',
    section: 'math',
    moduleId: 'f6v2-math-module-1',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'The function f is defined by f(x) = x³ − 4x. What are all values of x for which f(x) = 0?',
    choices: [
      { label: 'A', text: 'x = −2, 0, and 2' },
      { label: 'B', text: 'x = 0 only' },
      { label: 'C', text: 'x = −4, 0, and 4' },
      { label: 'D', text: 'x = 2 and 4' },
    ],
    correctAnswer: 'A',
    explanation:
      'Set f(x) = 0: x³ − 4x = 0 → x(x² − 4) = 0 → x(x − 2)(x + 2) = 0. Solutions: x = 0, x = 2, x = −2. Check: 0³ − 4(0) = 0 ✓; 8 − 8 = 0 ✓; −8 + 8 = 0 ✓.',
    wrongAnswerExplanations: {
      B: 'x = 0 only accounts for one factor. After factoring out x, the remaining x² − 4 = 0 yields x = ±2.',
      C: 'x = −4, 0, 4 treats x² − 4 = 0 as x² = 4 → x = ±4 instead of x = ±2.',
      D: 'x = 2 and 4 omits x = 0 (from the factor x) and incorrectly lists 4 instead of −2.',
    },
  },

  // Q13 — Geometry and Trigonometry / Area and volume formulas / medium
  {
    id: 'sat-f6-v2-math-m1-q13',
    section: 'math',
    moduleId: 'f6v2-math-module-1',
    domain: 'Geometry and Trigonometry',
    skill: 'Area and volume formulas',
    difficulty: 'medium',
    type: 'multiple_choice',
    stimulus:
      'A cylindrical water tank has a radius of 4 feet and a height of 10 feet.',
    question:
      'What is the volume of the tank, in cubic feet? (Use π ≈ 3.14)',
    choices: [
      { label: 'A', text: '125.6' },
      { label: 'B', text: '251.2' },
      { label: 'C', text: '502.4' },
      { label: 'D', text: '1,004.8' },
    ],
    correctAnswer: 'C',
    explanation:
      'Volume of a cylinder = πr²h = 3.14 × (4)² × 10 = 3.14 × 16 × 10 = 3.14 × 160 = 502.4 cubic feet.',
    wrongAnswerExplanations: {
      A: '125.6 = 3.14 × 4 × 10 uses the radius without squaring it (πrh instead of πr²h).',
      B: '251.2 = 3.14 × 8 × 10 uses the diameter (8) in place of r² in the formula, computing π · d · h.',
      D: '1,004.8 doubles the correct answer. This results from computing π × d² × h with d = 4, treating the diameter as the radius.',
    },
  },

  // Q14 — Geometry and Trigonometry / Lines, angles, and triangles / medium
  {
    id: 'sat-f6-v2-math-m1-q14',
    section: 'math',
    moduleId: 'f6v2-math-module-1',
    domain: 'Geometry and Trigonometry',
    skill: 'Lines, angles, and triangles',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'In triangle PQR, angle P = 48° and angle Q = 73°. What is the measure of angle R, in degrees?',
    choices: [
      { label: 'A', text: '49°' },
      { label: 'B', text: '59°' },
      { label: 'C', text: '69°' },
      { label: 'D', text: '121°' },
    ],
    correctAnswer: 'B',
    explanation:
      'The interior angles of a triangle sum to 180°. Angle R = 180° − 48° − 73° = 180° − 121° = 59°.',
    wrongAnswerExplanations: {
      A: '49° results from an arithmetic error. 180 − 48 = 132, and 132 − 73 = 59, not 49. A student might subtract incorrectly (e.g., 132 − 83 = 49).',
      C: '69° results from misreading 48° as 38° and computing 180 − 38 − 73 = 69.',
      D: '121° is the sum of the two given angles (48 + 73 = 121), not the third angle. The third angle is what remains after subtracting this sum from 180°.',
    },
  },

  // Q15 — Advanced Math / Exponential functions / medium
  {
    id: 'sat-f6-v2-math-m1-q15',
    section: 'math',
    moduleId: 'f6v2-math-module-1',
    domain: 'Advanced Math',
    skill: 'Exponential functions',
    difficulty: 'medium',
    type: 'multiple_choice',
    stimulus:
      'A bacterial population doubles every 3 hours. At time t = 0, the population is 500 bacteria.',
    question:
      'Which function gives the population P after t hours?',
    choices: [
      { label: 'A', text: 'P(t) = 500 · 2^t' },
      { label: 'B', text: 'P(t) = 500 · 3^(t/2)' },
      { label: 'C', text: 'P(t) = 500 · (1/2)^(3t)' },
      { label: 'D', text: 'P(t) = 500 · 2^(t/3)' },
    ],
    correctAnswer: 'D',
    explanation:
      'The population doubles every 3 hours, so in t hours there are t/3 doubling periods. P(t) = 500 · 2^(t/3). Check at t = 3: P(3) = 500 · 2^1 = 1,000 (doubled from 500) ✓. At t = 6: P(6) = 500 · 4 = 2,000 (doubled twice) ✓.',
    wrongAnswerExplanations: {
      A: 'P(t) = 500 · 2^t doubles every 1 hour, not every 3. At t = 3: P = 500 · 8 = 4,000 — three doublings instead of one.',
      B: 'P(t) = 500 · 3^(t/2) uses base 3 (tripling) and a halving period — neither matches a doubling every 3 hours.',
      C: 'P(t) = 500 · (1/2)^(3t) models rapid decay (population halves repeatedly), not growth.',
    },
  },

  // Q16 — Advanced Math / Nonlinear equations in one variable and systems / hard
  {
    id: 'sat-f6-v2-math-m1-q16',
    section: 'math',
    moduleId: 'f6v2-math-module-1',
    domain: 'Advanced Math',
    skill: 'Nonlinear equations in one variable and systems of equations in two variables',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'The system of equations below has two solutions. If (a, b) is the solution with a > 0, what is the value of a?\n\ny = x² − 3x − 4\ny = x − 4',
    choices: [
      { label: 'A', text: '0' },
      { label: 'B', text: '3' },
      { label: 'C', text: '4' },
      { label: 'D', text: '−1' },
    ],
    correctAnswer: 'C',
    explanation:
      'Set the expressions equal: x² − 3x − 4 = x − 4 → x² − 4x = 0 → x(x − 4) = 0 → x = 0 or x = 4. Since a > 0, a = 4. Check: y = 4 − 4 = 0 and y = 16 − 12 − 4 = 0 ✓.',
    wrongAnswerExplanations: {
      A: 'x = 0 is the other solution to the system, but the problem requires a > 0.',
      B: 'x = 3 is not a solution. Check: 9 − 9 − 4 = −4, and 3 − 4 = −1; these differ.',
      D: 'x = −1: y = −1 − 4 = −5, and y = 1 + 3 − 4 = 0; these differ, so x = −1 is not a solution.',
    },
  },

  // Q17 — grid_in / Algebra / Linear equations in one variable / medium
  {
    id: 'sat-f6-v2-math-m1-q17',
    section: 'math',
    moduleId: 'f6v2-math-module-1',
    domain: 'Algebra',
    skill: 'Linear equations in one variable',
    difficulty: 'medium',
    type: 'grid_in',
    question: 'If 5(2x − 3) = 4x + 9, what is the value of x?',
    correctAnswer: '4',
    acceptableAnswers: ['4'],
    explanation:
      'Expand: 10x − 15 = 4x + 9 → 6x = 24 → x = 4. Check: 5(8 − 3) = 25 and 4(4) + 9 = 25 ✓.',
  },

  // Q18 — grid_in / Advanced Math / Quadratic equations / medium
  {
    id: 'sat-f6-v2-math-m1-q18',
    section: 'math',
    moduleId: 'f6v2-math-module-1',
    domain: 'Advanced Math',
    skill: 'Quadratic equations and functions',
    difficulty: 'medium',
    type: 'grid_in',
    question:
      'The equation x² − 6x + k = 0 has exactly one real solution. What is the value of k?',
    correctAnswer: '9',
    acceptableAnswers: ['9'],
    explanation:
      'A quadratic has exactly one real solution when the discriminant is zero: b² − 4ac = 0. Here a = 1, b = −6, c = k: (−6)² − 4(1)(k) = 0 → 36 − 4k = 0 → k = 9. Check: x² − 6x + 9 = (x − 3)² = 0, one solution x = 3 ✓.',
    scoringNotes: 'Only k = 9 is acceptable.',
  },

  // Q19 — grid_in / Algebra / Systems of two linear equations / hard
  {
    id: 'sat-f6-v2-math-m1-q19',
    section: 'math',
    moduleId: 'f6v2-math-module-1',
    domain: 'Algebra',
    skill: 'Systems of two linear equations in two variables',
    difficulty: 'hard',
    type: 'grid_in',
    stimulus:
      'A store sells two types of coffee beans. Type A costs $8 per pound and Type B costs $12 per pound. A 10-pound blend of the two types costs $104 in total.',
    question:
      'How many pounds of Type A coffee are in the blend?',
    correctAnswer: '4',
    acceptableAnswers: ['4'],
    explanation:
      'Let a = pounds of Type A and b = pounds of Type B. System: (1) a + b = 10 and (2) 8a + 12b = 104. From (1): b = 10 − a. Substitute into (2): 8a + 12(10 − a) = 104 → 8a + 120 − 12a = 104 → −4a = −16 → a = 4. Check: 4 lb A + 6 lb B = 10 lb; cost = 32 + 72 = $104 ✓.',
    scoringNotes: 'Answer is 4 pounds. Only the pounds of Type A are asked for.',
  },

  // Q20 — grid_in / Problem-Solving and Data Analysis / Probability / hard
  {
    id: 'sat-f6-v2-math-m1-q20',
    section: 'math',
    moduleId: 'f6v2-math-module-1',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Probability and conditional probability',
    difficulty: 'hard',
    type: 'grid_in',
    graphData: {
      type: 'table',
      title: 'Survey: Exercise Habits by Age Group',
      headers: ['', 'Exercises regularly', 'Does not exercise regularly', 'Total'],
      rows: [
        ['Under 30', '45', '30', '75'],
        ['30 and older', '60', '65', '125'],
        ['Total', '105', '95', '200'],
      ],
    },
    question:
      'Based on the table, if a person who exercises regularly is selected at random, what is the probability that the person is under 30? Express your answer as a fraction or decimal.',
    correctAnswer: '3/7',
    acceptableAnswers: ['3/7', '45/105', '0.4285', '0.4286', '0.429'],
    explanation:
      'Among the 105 people who exercise regularly, 45 are under 30. P(under 30 | exercises regularly) = 45/105 = 3/7 ≈ 0.4286.',
    scoringNotes:
      'Accept 3/7, 45/105, or any decimal rounded to at least 3 decimal places that equals 3/7 (0.428 or 0.429).',
  },

  // Q21 — grid_in / Geometry and Trigonometry / Right triangles and trigonometry / hard
  {
    id: 'sat-f6-v2-math-m1-q21',
    section: 'math',
    moduleId: 'f6v2-math-module-1',
    domain: 'Geometry and Trigonometry',
    skill: 'Right triangles and trigonometry',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'In right triangle ABC, angle C = 90°. If sin(A) = 5/13, what is the value of cos(A)?',
    correctAnswer: '12/13',
    acceptableAnswers: ['12/13', '0.923', '0.9231'],
    explanation:
      'sin(A) = opposite/hypotenuse = 5/13, so the opposite side = 5 and the hypotenuse = 13. By the Pythagorean theorem, adjacent = √(13² − 5²) = √(169 − 25) = √144 = 12. Therefore cos(A) = adjacent/hypotenuse = 12/13 ≈ 0.923.',
    scoringNotes:
      'Accept 12/13 or decimal approximation 0.923 (3 decimal places). Do not accept 0.92.',
  },

  // Q22 — grid_in / Advanced Math / Equivalent expressions / hard
  {
    id: 'sat-f6-v2-math-m1-q22',
    section: 'math',
    moduleId: 'f6v2-math-module-1',
    domain: 'Advanced Math',
    skill: 'Equivalent expressions',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'If (ax + 3)(2x − 5) = 6x² + bx − 15 for all values of x, what is the value of a + b?',
    correctAnswer: '-6',
    acceptableAnswers: ['-6'],
    explanation:
      'Expand (ax + 3)(2x − 5): = 2ax² − 5ax + 6x − 15 = 2ax² + (6 − 5a)x − 15. Match coefficients with 6x² + bx − 15. Coefficient of x²: 2a = 6 → a = 3. Coefficient of x: 6 − 5a = b → 6 − 15 = b → b = −9. Therefore a + b = 3 + (−9) = −6.',
    scoringNotes:
      'Enter −6. The negative sign must be gridded. a = 3 and b = −9 individually are not requested.',
  },
]
