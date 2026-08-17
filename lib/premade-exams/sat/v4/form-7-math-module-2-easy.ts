import type { MathQuestion } from '../types'

export const f7MathModule2EasyQuestionsV4: MathQuestion[] = [
  // ─── Q01 — Algebra / Linear equations in one variable / easy ─────────────────
  // VERIFY: 4x − 9 = 11 → 4x = 20 → x = 5. Check: 4(5) − 9 = 20 − 9 = 11 ✓
  {
    id: 'sat-f7-v4-math-m2e-q01',
    section: 'math',
    moduleId: 'f7v4-math-module-2-easy',
    domain: 'Algebra',
    skill: 'Linear equations in one variable',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'If 4x − 9 = 11, what is the value of x?',
    choices: [
      { label: 'A', text: '3' },
      { label: 'B', text: '4' },
      { label: 'C', text: '5' },
      { label: 'D', text: '6' },
    ],
    correctAnswer: 'C',
    explanation:
      'Add 9 to both sides: 4x = 20. Divide both sides by 4: x = 5. Check: 4(5) − 9 = 20 − 9 = 11. ✓',
    wrongAnswerExplanations: {
      A: 'x = 3 gives 4(3) − 9 = 12 − 9 = 3, not 11.',
      B: 'x = 4 gives 4(4) − 9 = 16 − 9 = 7, not 11.',
      D: 'x = 6 gives 4(6) − 9 = 24 − 9 = 15, not 11.',
    },
  },

  // ─── Q02 — Algebra / Linear functions / easy ─────────────────────────────────
  // VERIFY: f(x) = 3x + 2. f(4) = 3(4) + 2 = 12 + 2 = 14 ✓
  {
    id: 'sat-f7-v4-math-m2e-q02',
    section: 'math',
    moduleId: 'f7v4-math-module-2-easy',
    domain: 'Algebra',
    skill: 'Linear functions',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'The function f is defined by f(x) = 3x + 2. What is the value of f(4)?',
    choices: [
      { label: 'A', text: '9' },
      { label: 'B', text: '12' },
      { label: 'C', text: '14' },
      { label: 'D', text: '16' },
    ],
    correctAnswer: 'C',
    explanation:
      'Substitute x = 4: f(4) = 3(4) + 2 = 12 + 2 = 14.',
    wrongAnswerExplanations: {
      A: '9 results from computing 3(4) − 3 = 9, subtracting 3 instead of adding 2. The function adds 2: f(4) = 12 + 2 = 14.',
      B: '12 results from computing only 3(4) = 12, forgetting the constant term +2. The full expression is 3(4) + 2 = 14.',
      D: '16 results from computing 3(4) + 4 = 16, using +4 instead of +2. The constant is 2, so f(4) = 12 + 2 = 14.',
    },
  },

  // ─── Q03 — Problem-Solving and Data Analysis / Ratios, rates, proportional relationships / easy ─
  // VERIFY: 1 cm = 50 km. 8 cm → 8 × 50 = 400 km ✓
  {
    id: 'sat-f7-v4-math-m2e-q03',
    section: 'math',
    moduleId: 'f7v4-math-module-2-easy',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Ratios, rates, proportional relationships, and units',
    difficulty: 'easy',
    type: 'multiple_choice',
    question:
      'A map uses a scale of 1 centimeter = 50 kilometers. Two cities are 8 centimeters apart on the map. What is the actual distance, in kilometers, between the two cities?',
    choices: [
      { label: 'A', text: '58' },
      { label: 'B', text: '250' },
      { label: 'C', text: '350' },
      { label: 'D', text: '400' },
    ],
    correctAnswer: 'D',
    explanation:
      'Each centimeter represents 50 kilometers. 8 centimeters × 50 km/cm = 400 km.',
    wrongAnswerExplanations: {
      A: '58 comes from adding 50 + 8 = 58 instead of multiplying. Each centimeter represents 50 km, so 8 cm represents 8 × 50 = 400 km.',
      B: '250 km corresponds to 5 cm (5 × 50 = 250), not 8 cm. Multiply 8 × 50 = 400.',
      C: '350 km corresponds to 7 cm (7 × 50 = 350), not 8 cm. The correct distance is 8 × 50 = 400 km.',
    },
  },

  // ─── Q04 — Geometry and Trigonometry / Area and volume / easy ────────────────
  // VERIFY: Area of rectangle = l × w = 11 × 6 = 66 sq ft ✓
  {
    id: 'sat-f7-v4-math-m2e-q04',
    section: 'math',
    moduleId: 'f7v4-math-module-2-easy',
    domain: 'Geometry and Trigonometry',
    skill: 'Area and volume',
    difficulty: 'easy',
    type: 'multiple_choice',
    question:
      'A rectangular patio is 11 feet long and 6 feet wide. What is the area of the patio, in square feet?',
    choices: [
      { label: 'A', text: '34' },
      { label: 'B', text: '55' },
      { label: 'C', text: '66' },
      { label: 'D', text: '132' },
    ],
    correctAnswer: 'C',
    explanation:
      'Area of a rectangle = length × width = 11 × 6 = 66 square feet.',
    wrongAnswerExplanations: {
      A: '34 is the perimeter: 2(11 + 6) = 2(17) = 34. The area uses multiplication: 11 × 6 = 66 square feet.',
      B: '55 is not derived from 11 and 6 using a standard formula. The area is 11 × 6 = 66.',
      D: '132 results from doubling the product: 2(11 × 6) = 132. The area formula is simply length × width = 66.',
    },
  },

  // ─── Q05 — Advanced Math / Nonlinear functions / easy ────────────────────────
  // VERIFY: h(x) = x² + 3x. h(4) = 16 + 12 = 28 ✓
  {
    id: 'sat-f7-v4-math-m2e-q05',
    section: 'math',
    moduleId: 'f7v4-math-module-2-easy',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'The function h is defined by h(x) = x² + 3x. What is the value of h(4)?',
    choices: [
      { label: 'A', text: '16' },
      { label: 'B', text: '24' },
      { label: 'C', text: '28' },
      { label: 'D', text: '32' },
    ],
    correctAnswer: 'C',
    explanation:
      'Substitute x = 4: h(4) = (4)² + 3(4) = 16 + 12 = 28.',
    wrongAnswerExplanations: {
      A: '16 results from computing only (4)² = 16 and ignoring the 3x term. Both terms must be evaluated: 16 + 12 = 28.',
      B: '24 results from computing 3(4) × 2 = 24 or another error. The correct computation is 4² + 3(4) = 16 + 12 = 28.',
      D: '32 results from computing (4)² + 4² = 32, squaring 4 twice. The function adds x² and 3x: 16 + 12 = 28.',
    },
  },

  // ─── Q06 — Algebra / Linear inequalities in one or two variables / easy ───────
  // VERIFY: 3x − 4 ≤ 14 → 3x ≤ 18 → x ≤ 6. The only choice at or below 6 is x = 6.
  // Check x = 6: 3(6) − 4 = 18 − 4 = 14 ≤ 14 ✓
  {
    id: 'sat-f7-v4-math-m2e-q06',
    section: 'math',
    moduleId: 'f7v4-math-module-2-easy',
    domain: 'Algebra',
    skill: 'Linear inequalities in one or two variables',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'Which value of x satisfies the inequality 3x − 4 ≤ 14?',
    choices: [
      { label: 'A', text: '6' },
      { label: 'B', text: '7' },
      { label: 'C', text: '8' },
      { label: 'D', text: '9' },
    ],
    correctAnswer: 'A',
    explanation:
      'Solve: 3x − 4 ≤ 14 → 3x ≤ 18 → x ≤ 6. The only choice not exceeding 6 is x = 6. Check: 3(6) − 4 = 14 ≤ 14. ✓',
    wrongAnswerExplanations: {
      B: 'x = 7 gives 3(7) − 4 = 21 − 4 = 17, which is greater than 14. The inequality requires x ≤ 6.',
      C: 'x = 8 gives 3(8) − 4 = 24 − 4 = 20, which is greater than 14. The inequality requires x ≤ 6.',
      D: 'x = 9 gives 3(9) − 4 = 27 − 4 = 23, which is greater than 14. The inequality requires x ≤ 6.',
    },
  },

  // ─── Q07 — Problem-Solving and Data Analysis / Percentages / easy ─────────────
  // VERIFY: 35% of 80 = 0.35 × 80 = 28 ✓
  {
    id: 'sat-f7-v4-math-m2e-q07',
    section: 'math',
    moduleId: 'f7v4-math-module-2-easy',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Percentages',
    difficulty: 'easy',
    type: 'multiple_choice',
    question:
      'A store received 80 shipments last month. If 35% of the shipments arrived late, how many shipments arrived late?',
    choices: [
      { label: 'A', text: '24' },
      { label: 'B', text: '28' },
      { label: 'C', text: '32' },
      { label: 'D', text: '35' },
    ],
    correctAnswer: 'B',
    explanation:
      '35% of 80 = 0.35 × 80 = 28 shipments.',
    wrongAnswerExplanations: {
      A: '24 = 30% of 80. The problem states 35%: 0.35 × 80 = 28.',
      C: '32 = 40% of 80. Multiply 0.35 × 80 = 28.',
      D: '35 is the percent itself, not 35% of 80. To find 35% of 80, compute 0.35 × 80 = 28.',
    },
  },

  // ─── Q08 — Geometry and Trigonometry / Lines, angles, and triangles / easy ─────
  // VERIFY: Triangle angles sum = 180°. 180 − 48 − 67 = 65° ✓
  {
    id: 'sat-f7-v4-math-m2e-q08',
    section: 'math',
    moduleId: 'f7v4-math-module-2-easy',
    domain: 'Geometry and Trigonometry',
    skill: 'Lines, angles, and triangles',
    difficulty: 'easy',
    type: 'multiple_choice',
    question:
      'In a triangle, two angles measure 48° and 67°. What is the measure of the third angle?',
    choices: [
      { label: 'A', text: '55°' },
      { label: 'B', text: '60°' },
      { label: 'C', text: '65°' },
      { label: 'D', text: '70°' },
    ],
    correctAnswer: 'C',
    explanation:
      'The sum of angles in a triangle is 180°. Third angle = 180° − 48° − 67° = 65°.',
    wrongAnswerExplanations: {
      A: '55° gives a total of 48° + 67° + 55° = 170°, not 180°. The third angle must be 180° − 115° = 65°.',
      B: '60° gives a total of 48° + 67° + 60° = 175°, not 180°. Subtract: 180° − 48° − 67° = 65°.',
      D: '70° gives a total of 48° + 67° + 70° = 185°, which exceeds 180°. The third angle is 180° − 48° − 67° = 65°.',
    },
  },

  // ─── Q09 — Algebra / Systems of two linear equations in two variables / medium ──
  // VERIFY: 2x + y = 13 and x = 5. Sub: 2(5) + y = 13 → 10 + y = 13 → y = 3 ✓
  // Check: 2(5) + 3 = 10 + 3 = 13 ✓
  {
    id: 'sat-f7-v4-math-m2e-q09',
    section: 'math',
    moduleId: 'f7v4-math-module-2-easy',
    domain: 'Algebra',
    skill: 'Systems of two linear equations in two variables',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'What is the value of y in the solution to the system of equations below?\n\n2x + y = 13\nx = 5',
    choices: [
      { label: 'A', text: '1' },
      { label: 'B', text: '3' },
      { label: 'C', text: '4' },
      { label: 'D', text: '8' },
    ],
    correctAnswer: 'B',
    explanation:
      'Substitute x = 5 into the first equation: 2(5) + y = 13 → 10 + y = 13 → y = 3.',
    wrongAnswerExplanations: {
      A: 'y = 1 gives 2(5) + 1 = 11 ≠ 13. Subtract 10 from both sides: y = 13 − 10 = 3.',
      C: 'y = 4 gives 2(5) + 4 = 14 ≠ 13. The correct step is y = 13 − 10 = 3.',
      D: 'y = 8 gives 2(5) + 8 = 18 ≠ 13. Solving 10 + y = 13 gives y = 3.',
    },
  },

  // ─── Q10 — Advanced Math / Equivalent expressions / medium ───────────────────
  // VERIFY: (x + 5)(x − 2) = x² − 2x + 5x − 10 = x² + 3x − 10 ✓
  {
    id: 'sat-f7-v4-math-m2e-q10',
    section: 'math',
    moduleId: 'f7v4-math-module-2-easy',
    domain: 'Advanced Math',
    skill: 'Equivalent expressions',
    difficulty: 'medium',
    type: 'multiple_choice',
    question: 'Which expression is equivalent to (x + 5)(x − 2)?',
    choices: [
      { label: 'A', text: 'x² − 3x − 10' },
      { label: 'B', text: 'x² + 3x + 10' },
      { label: 'C', text: 'x² + 3x − 10' },
      { label: 'D', text: 'x² + 7x − 10' },
    ],
    correctAnswer: 'C',
    explanation:
      'Use FOIL: (x + 5)(x − 2) = x² − 2x + 5x − 10 = x² + 3x − 10.',
    wrongAnswerExplanations: {
      A: 'x² − 3x − 10 uses −3x for the middle term instead of +3x. The middle terms are −2x + 5x = +3x, so the result is x² + 3x − 10.',
      B: 'x² + 3x + 10 has +10 for the constant instead of −10. The constant term is 5 × (−2) = −10, giving x² + 3x − 10.',
      D: 'x² + 7x − 10 uses +7x for the middle term. The middle terms are −2x + 5x = +3x, not 7x. The result is x² + 3x − 10.',
    },
  },

  // ─── Q11 — Problem-Solving and Data Analysis / One-variable data / medium ─────
  // VERIFY: Data: 6, 9, 11, 14, 15. Mean = (6+9+11+14+15)/5 = 55/5 = 11 ✓
  {
    id: 'sat-f7-v4-math-m2e-q11',
    section: 'math',
    moduleId: 'f7v4-math-module-2-easy',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'One-variable data: distributions and measures of center and spread',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'A student scored 6, 9, 11, 14, and 15 on five assignments. What is the mean score?',
    choices: [
      { label: 'A', text: '10' },
      { label: 'B', text: '11' },
      { label: 'C', text: '12' },
      { label: 'D', text: '14' },
    ],
    correctAnswer: 'B',
    explanation:
      'Mean = (6 + 9 + 11 + 14 + 15) ÷ 5 = 55 ÷ 5 = 11.',
    wrongAnswerExplanations: {
      A: '10 is not the mean. The sum is 6 + 9 + 11 + 14 + 15 = 55, and 55 ÷ 5 = 11.',
      C: '12 is not the correct mean. The sum is 55, and 55 ÷ 5 = 11, not 12.',
      D: '14 is one of the data values, not the mean. The mean is the sum divided by the count: 55 ÷ 5 = 11.',
    },
  },

  // ─── Q12 — Geometry and Trigonometry / Right triangles and trigonometry / medium
  // VERIFY: 5-12-13 right triangle. Legs 5 and 12. hypotenuse = √(25+144) = √169 = 13 ✓
  {
    id: 'sat-f7-v4-math-m2e-q12',
    section: 'math',
    moduleId: 'f7v4-math-module-2-easy',
    domain: 'Geometry and Trigonometry',
    skill: 'Right triangles and trigonometry',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'A right triangle has legs of length 5 and 12. What is the length of the hypotenuse?',
    choices: [
      { label: 'A', text: '11' },
      { label: 'B', text: '13' },
      { label: 'C', text: '15' },
      { label: 'D', text: '17' },
    ],
    correctAnswer: 'B',
    explanation:
      'By the Pythagorean theorem: c² = 5² + 12² = 25 + 144 = 169. So c = √169 = 13.',
    wrongAnswerExplanations: {
      A: '11 does not satisfy the Pythagorean theorem: 5² + 12² = 169 ≠ 121. The correct hypotenuse is √169 = 13.',
      C: '15 is the hypotenuse of a 9-12-15 right triangle (a scaled 3-4-5). Here c = √(25 + 144) = √169 = 13.',
      D: '17 results from adding the legs: 5 + 12 = 17. The Pythagorean theorem requires squaring: c = √(25 + 144) = 13.',
    },
  },

  // ─── Q13 — Algebra / Linear equations in two variables / medium ───────────────
  // VERIFY: Line passes through (0, 3) and (4, 11). Slope = (11−3)/(4−0) = 8/4 = 2.
  // Equation: y = 2x + 3. At x = 6: y = 2(6) + 3 = 15 ✓
  {
    id: 'sat-f7-v4-math-m2e-q13',
    section: 'math',
    moduleId: 'f7v4-math-module-2-easy',
    domain: 'Algebra',
    skill: 'Linear equations in two variables',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'A line in the xy-plane passes through the points (0, 3) and (4, 11). What is the y-coordinate of the point on this line where x = 6?',
    choices: [
      { label: 'A', text: '13' },
      { label: 'B', text: '15' },
      { label: 'C', text: '17' },
      { label: 'D', text: '19' },
    ],
    correctAnswer: 'B',
    explanation:
      'Find the slope: m = (11 − 3) / (4 − 0) = 8/4 = 2. The y-intercept is 3 (from point (0, 3)), so the equation is y = 2x + 3. At x = 6: y = 2(6) + 3 = 12 + 3 = 15.',
    wrongAnswerExplanations: {
      A: '13 results from computing 2(5) + 3 = 13, using x = 5 instead of x = 6. Substitute x = 6: y = 2(6) + 3 = 15.',
      C: '17 results from using a slope of 7 instead of 2, or another arithmetic error. The correct slope is (11 − 3)/(4 − 0) = 2, giving y = 2(6) + 3 = 15.',
      D: '19 results from computing 2(8) + 3 = 19, substituting x = 8 instead of x = 6. At x = 6: y = 12 + 3 = 15.',
    },
  },

  // ─── Q14 — Advanced Math / Exponential functions / medium ────────────────────
  // VERIFY: f(x) = 2 · 3^x. f(0) = 2. f(1) = 6. f(2) = 18. f(3) = 54 ✓
  {
    id: 'sat-f7-v4-math-m2e-q14',
    section: 'math',
    moduleId: 'f7v4-math-module-2-easy',
    domain: 'Advanced Math',
    skill: 'Exponential functions',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'The function f is defined by f(x) = 2 · 3^x. What is the value of f(3)?',
    choices: [
      { label: 'A', text: '18' },
      { label: 'B', text: '27' },
      { label: 'C', text: '54' },
      { label: 'D', text: '162' },
    ],
    correctAnswer: 'C',
    explanation:
      'Substitute x = 3: f(3) = 2 · 3³ = 2 · 27 = 54.',
    wrongAnswerExplanations: {
      A: '18 = 2 · 3² = 2 · 9, which uses the exponent 2 instead of 3. The correct computation is 2 · 3³ = 2 · 27 = 54.',
      B: '27 results from computing 3³ = 27 and ignoring the factor of 2. The function multiplies by 2: f(3) = 2 · 27 = 54.',
      D: '162 = 2 · 3⁴ = 2 · 81, which uses the exponent 4 instead of 3. The correct exponent is 3: f(3) = 2 · 27 = 54.',
    },
  },

  // ─── Q15 — Problem-Solving and Data Analysis / Two-variable data / medium ──────
  // VERIFY: Model: y = 4x + 15 where x = days practiced, y = score.
  // x = 10 → y = 4(10) + 15 = 40 + 15 = 55 ✓
  {
    id: 'sat-f7-v4-math-m2e-q15',
    section: 'math',
    moduleId: 'f7v4-math-module-2-easy',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Two-variable data: models and scatterplots',
    difficulty: 'medium',
    type: 'multiple_choice',
    stimulus:
      'A linear model predicts a player\'s game score (y) based on the number of days practiced (x): y = 4x + 15.',
    question:
      'According to the model, what score is predicted for a player who has practiced for 10 days?',
    choices: [
      { label: 'A', text: '40' },
      { label: 'B', text: '50' },
      { label: 'C', text: '55' },
      { label: 'D', text: '60' },
    ],
    correctAnswer: 'C',
    explanation:
      'Substitute x = 10 into the model: y = 4(10) + 15 = 40 + 15 = 55.',
    wrongAnswerExplanations: {
      A: '40 results from computing 4(10) = 40 and forgetting the constant term of 15. The model gives 4(10) + 15 = 55.',
      B: '50 results from computing 4(10) + 10 = 50, incorrectly using 10 for the constant instead of 15. y = 40 + 15 = 55.',
      D: '60 results from computing 4(10) + 20 = 60, using 20 instead of 15. The constant is 15: y = 40 + 15 = 55.',
    },
  },

  // ─── Q16 — Geometry and Trigonometry / Circles / medium ──────────────────────
  // VERIFY: Circle with radius 7. Area = π × 7² = 49π ✓
  {
    id: 'sat-f7-v4-math-m2e-q16',
    section: 'math',
    moduleId: 'f7v4-math-module-2-easy',
    domain: 'Geometry and Trigonometry',
    skill: 'Circles',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'A circle has a radius of 7. What is the area of the circle, in terms of π?',
    choices: [
      { label: 'A', text: '7π' },
      { label: 'B', text: '14π' },
      { label: 'C', text: '49π' },
      { label: 'D', text: '196π' },
    ],
    correctAnswer: 'C',
    explanation:
      'Area of a circle = πr² = π(7²) = 49π.',
    wrongAnswerExplanations: {
      A: '7π is the radius expressed in terms of π, not the area. The area formula is πr² = π(49) = 49π.',
      B: '14π results from computing 2πr = 2π(7) = 14π, which is the circumference, not the area. Use A = πr² = 49π.',
      D: '196π results from computing π(14)² = 196π, squaring the diameter (14) instead of the radius (7). The area is π(7²) = 49π.',
    },
  },

  // ─── Q17 — Algebra / Linear equations in one variable / easy (grid-in) ─────────
  // VERIFY: 6(x − 3) = 4x + 2 → 6x − 18 = 4x + 2 → 2x = 20 → x = 10
  // Check: 6(10−3) = 6(7) = 42. 4(10)+2 = 42 ✓
  {
    id: 'sat-f7-v4-math-m2e-q17',
    section: 'math',
    moduleId: 'f7v4-math-module-2-easy',
    domain: 'Algebra',
    skill: 'Linear equations in one variable',
    difficulty: 'easy',
    type: 'grid_in',
    question: 'If 6(x − 3) = 4x + 2, what is the value of x?',
    correctAnswer: '10',
    acceptableAnswers: ['10'],
    explanation:
      'Expand: 6x − 18 = 4x + 2. Subtract 4x from both sides: 2x − 18 = 2. Add 18: 2x = 20. Divide by 2: x = 10. Check: 6(10 − 3) = 6(7) = 42 and 4(10) + 2 = 42. ✓',
    scoringNotes: 'Only the integer 10 is accepted.',
  },

  // ─── Q18 — Problem-Solving and Data Analysis / Percentages / easy (grid-in) ────
  // VERIFY: Original price = $250. Sale = 20% off. Sale price = 250 × 0.80 = 200 ✓
  {
    id: 'sat-f7-v4-math-m2e-q18',
    section: 'math',
    moduleId: 'f7v4-math-module-2-easy',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Percentages',
    difficulty: 'easy',
    type: 'grid_in',
    question:
      'A bicycle originally costs $250. It is on sale for 20% off. What is the sale price of the bicycle, in dollars?',
    correctAnswer: '200',
    acceptableAnswers: ['200'],
    explanation:
      'A 20% discount means the buyer pays 100% − 20% = 80% of the original price. Sale price = 0.80 × $250 = $200.',
    scoringNotes: 'Only the integer 200 is accepted.',
  },

  // ─── Q19 — Advanced Math / Nonlinear equations in one variable / medium (grid-in)
  // VERIFY: x² − 8x + 15 = 0 → (x−3)(x−5) = 0 → x = 3 or x = 5.
  // Positive values: 3 and 5. Sum = 3 + 5 = 8 ✓
  {
    id: 'sat-f7-v4-math-m2e-q19',
    section: 'math',
    moduleId: 'f7v4-math-module-2-easy',
    domain: 'Advanced Math',
    skill: 'Nonlinear equations in one variable and systems of equations in two variables',
    difficulty: 'medium',
    type: 'grid_in',
    question:
      'If x² − 8x + 15 = 0, what is the sum of all values of x?',
    correctAnswer: '8',
    acceptableAnswers: ['8'],
    explanation:
      'Factor: x² − 8x + 15 = (x − 3)(x − 5) = 0. Setting each factor to zero gives x = 3 or x = 5. The sum of all values is 3 + 5 = 8.',
    scoringNotes: 'Only the integer 8 is accepted.',
  },

  // ─── Q20 — Geometry and Trigonometry / Area and volume / medium (grid-in)
  // VERIFY: Triangle with base 14 and height 9. Area = (1/2)(14)(9) = 63 ✓
  {
    id: 'sat-f7-v4-math-m2e-q20',
    section: 'math',
    moduleId: 'f7v4-math-module-2-easy',
    domain: 'Geometry and Trigonometry',
    skill: 'Area and volume',
    difficulty: 'medium',
    type: 'grid_in',
    question:
      'A triangle has a base of 14 centimeters and a height of 9 centimeters. What is the area of the triangle, in square centimeters?',
    correctAnswer: '63',
    acceptableAnswers: ['63'],
    explanation:
      'Area of a triangle = (1/2) × base × height = (1/2) × 14 × 9 = 63 square centimeters.',
    scoringNotes: 'Only the integer 63 is accepted.',
  },

  // ─── Q21 — Algebra / Linear functions / medium (grid-in) ─────────────────────
  // VERIFY: f(x) = mx + b. f(0) = −1 → b = −1. f(3) = 8 → 3m − 1 = 8 → 3m = 9 → m = 3.
  // f(x) = 3x − 1. f(7) = 3(7) − 1 = 21 − 1 = 20 ✓
  {
    id: 'sat-f7-v4-math-m2e-q21',
    section: 'math',
    moduleId: 'f7v4-math-module-2-easy',
    domain: 'Algebra',
    skill: 'Linear functions',
    difficulty: 'medium',
    type: 'grid_in',
    question:
      'A linear function f satisfies f(0) = −1 and f(3) = 8. What is the value of f(7)?',
    correctAnswer: '20',
    acceptableAnswers: ['20'],
    explanation:
      'Since f(0) = −1, the y-intercept is −1. The slope is (8 − (−1)) / (3 − 0) = 9/3 = 3. So f(x) = 3x − 1. Then f(7) = 3(7) − 1 = 21 − 1 = 20.',
    scoringNotes: 'Only the integer 20 is accepted.',
  },

  // ─── Q22 — Problem-Solving and Data Analysis / Probability / medium (grid-in) ──
  // VERIFY: 4 red, 6 blue, 2 green = 12 total. P(not red) = (12−4)/12 = 8/12 = 2/3.
  // As a fraction: 2/3. As decimal: 0.6̄... but rounded 2/3 or 8/12 ✓
  {
    id: 'sat-f7-v4-math-m2e-q22',
    section: 'math',
    moduleId: 'f7v4-math-module-2-easy',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Probability and conditional probability',
    difficulty: 'medium',
    type: 'grid_in',
    question:
      'A bag contains 4 red marbles, 6 blue marbles, and 2 green marbles. If one marble is selected at random, what is the probability that it is NOT red? Enter your answer as a fraction or decimal.',
    correctAnswer: '2/3',
    acceptableAnswers: ['2/3', '8/12', '4/6', '.667', '0.667', '.6667', '0.6667'],
    explanation:
      'Total marbles: 4 + 6 + 2 = 12. Red marbles: 4. Non-red marbles: 12 − 4 = 8. Probability = 8/12 = 2/3 ≈ 0.667.',
    scoringNotes: 'Accept 2/3, 8/12, 4/6, .667, 0.667, .6667, or 0.6667.',
  },
]
