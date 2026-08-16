import type { MathQuestion } from '../types'

export const f7MathModule2EasyQuestionsV3: MathQuestion[] = [
  // ─── Q01 — Algebra / Linear equations in one variable / easy ─────────────────
  // VERIFY: 3x − 7 = 14 → 3x = 21 → x = 7. Check: 3(7) − 7 = 21 − 7 = 14 ✓
  {
    id: 'sat-f7-v3-math-m2e-q01',
    section: 'math',
    moduleId: 'f7v3-math-module-2-easy',
    domain: 'Algebra',
    skill: 'Linear equations in one variable',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'If 3x − 7 = 14, what is the value of x?',
    choices: [
      { label: 'A', text: '3' },
      { label: 'B', text: '5' },
      { label: 'C', text: '7' },
      { label: 'D', text: '9' },
    ],
    correctAnswer: 'C',
    explanation:
      'Add 7 to both sides: 3x = 21. Divide both sides by 3: x = 7. Check: 3(7) − 7 = 21 − 7 = 14. ✓',
    wrongAnswerExplanations: {
      A: 'x = 3 gives 3(3) − 7 = 9 − 7 = 2, not 14.',
      B: 'x = 5 gives 3(5) − 7 = 15 − 7 = 8, not 14.',
      D: 'x = 9 gives 3(9) − 7 = 27 − 7 = 20, not 14.',
    },
  },

  // ─── Q02 — Algebra / Linear functions / easy ─────────────────────────────────
  // VERIFY: f(x) = 4x − 1. f(3) = 4(3) − 1 = 12 − 1 = 11 ✓
  {
    id: 'sat-f7-v3-math-m2e-q02',
    section: 'math',
    moduleId: 'f7v3-math-module-2-easy',
    domain: 'Algebra',
    skill: 'Linear functions',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'The function f is defined by f(x) = 4x − 1. What is the value of f(3)?',
    choices: [
      { label: 'A', text: '8' },
      { label: 'B', text: '11' },
      { label: 'C', text: '13' },
      { label: 'D', text: '15' },
    ],
    correctAnswer: 'B',
    explanation:
      'Substitute x = 3: f(3) = 4(3) − 1 = 12 − 1 = 11.',
    wrongAnswerExplanations: {
      A: '8 results from computing 4(3) − 4 = 8, using the wrong constant. The function subtracts 1, not 4: f(3) = 12 − 1 = 11.',
      C: '13 results from computing 4(3) + 1 = 13, adding instead of subtracting. f(3) = 4(3) − 1 = 11.',
      D: '15 results from computing 4(4) − 1 = 15, substituting x = 4 instead of x = 3.',
    },
  },

  // ─── Q03 — Problem-Solving and Data Analysis / Ratios, rates, proportional relationships / easy ─
  // VERIFY: 1 inch = 30 miles. 6 inches → 6 × 30 = 180 miles ✓
  {
    id: 'sat-f7-v3-math-m2e-q03',
    section: 'math',
    moduleId: 'f7v3-math-module-2-easy',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Ratios, rates, proportional relationships, and units',
    difficulty: 'easy',
    type: 'multiple_choice',
    question:
      'A map uses a scale of 1 inch = 30 miles. Two towns are 6 inches apart on the map. What is the actual distance, in miles, between the two towns?',
    choices: [
      { label: 'A', text: '36' },
      { label: 'B', text: '120' },
      { label: 'C', text: '150' },
      { label: 'D', text: '180' },
    ],
    correctAnswer: 'D',
    explanation:
      'Each inch represents 30 miles. 6 inches × 30 miles/inch = 180 miles.',
    wrongAnswerExplanations: {
      A: '36 comes from adding 30 + 6 = 36 instead of multiplying. Each inch represents 30 miles, so 6 inches represents 6 × 30 = 180 miles.',
      B: '120 miles corresponds to 4 inches (4 × 30 = 120), not 6 inches. Multiply the number of inches by the scale: 6 × 30 = 180.',
      C: '150 miles corresponds to 5 inches (5 × 30 = 150), not 6 inches. The correct distance is 6 × 30 = 180 miles.',
    },
  },

  // ─── Q04 — Geometry and Trigonometry / Area and volume formulas / easy ─────────
  // VERIFY: Area of rectangle = l × w = 9 × 5 = 45 sq ft ✓
  {
    id: 'sat-f7-v3-math-m2e-q04',
    section: 'math',
    moduleId: 'f7v3-math-module-2-easy',
    domain: 'Geometry and Trigonometry',
    skill: 'Area and volume',
    difficulty: 'easy',
    type: 'multiple_choice',
    question:
      'A rectangular garden is 9 feet long and 5 feet wide. What is the area of the garden, in square feet?',
    choices: [
      { label: 'A', text: '28' },
      { label: 'B', text: '35' },
      { label: 'C', text: '45' },
      { label: 'D', text: '90' },
    ],
    correctAnswer: 'C',
    explanation:
      'Area of a rectangle = length × width = 9 × 5 = 45 square feet.',
    wrongAnswerExplanations: {
      A: '28 is the perimeter: 2(9 + 5) = 2(14) = 28. The area uses multiplication: 9 × 5 = 45 square feet.',
      B: '35 is not derived from 9 and 5 using any standard formula. The area is length × width = 9 × 5 = 45.',
      D: '90 results from doubling the product: 2(9 × 5) = 90. The area formula does not include a factor of 2; it is simply 9 × 5 = 45.',
    },
  },

  // ─── Q05 — Advanced Math / Nonlinear functions / easy ────────────────────────
  // VERIFY: g(x) = x² − 2x. g(5) = 25 − 10 = 15 ✓
  {
    id: 'sat-f7-v3-math-m2e-q05',
    section: 'math',
    moduleId: 'f7v3-math-module-2-easy',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'The function g is defined by g(x) = x² − 2x. What is the value of g(5)?',
    choices: [
      { label: 'A', text: '10' },
      { label: 'B', text: '15' },
      { label: 'C', text: '20' },
      { label: 'D', text: '25' },
    ],
    correctAnswer: 'B',
    explanation:
      'Substitute x = 5: g(5) = (5)² − 2(5) = 25 − 10 = 15.',
    wrongAnswerExplanations: {
      A: '10 results from computing 2(5) = 10 and ignoring the x² term. Both terms must be evaluated: 25 − 10 = 15.',
      C: '20 results from computing (5)² − 5 = 25 − 5 = 20, using 1 × 5 instead of 2 × 5 in the second term. g(5) = 25 − 10 = 15.',
      D: '25 results from computing only (5)² = 25 and ignoring the −2x term. Subtract 2(5) = 10: g(5) = 25 − 10 = 15.',
    },
  },

  // ─── Q06 — Algebra / Linear inequalities in one or two variables / easy ───────
  // VERIFY: 2x + 5 ≤ 17 → 2x ≤ 12 → x ≤ 6. Check x = 6: 2(6)+5 = 17 ≤ 17 ✓
  {
    id: 'sat-f7-v3-math-m2e-q06',
    section: 'math',
    moduleId: 'f7v3-math-module-2-easy',
    domain: 'Algebra',
    skill: 'Linear inequalities in one or two variables',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'Which value of x satisfies the inequality 2x + 5 ≤ 17?',
    choices: [
      { label: 'A', text: '7' },
      { label: 'B', text: '8' },
      { label: 'C', text: '6' },
      { label: 'D', text: '10' },
    ],
    correctAnswer: 'C',
    explanation:
      'Solve: 2x + 5 ≤ 17 → 2x ≤ 12 → x ≤ 6. The only choice not exceeding 6 is x = 6. Check: 2(6) + 5 = 17 ≤ 17. ✓',
    wrongAnswerExplanations: {
      A: 'x = 7 gives 2(7) + 5 = 14 + 5 = 19, which is greater than 17. The inequality requires x ≤ 6.',
      B: 'x = 8 gives 2(8) + 5 = 16 + 5 = 21, which is greater than 17. The inequality requires x ≤ 6.',
      D: 'x = 10 gives 2(10) + 5 = 20 + 5 = 25, which is greater than 17. The inequality requires x ≤ 6.',
    },
  },

  // ─── Q07 — Problem-Solving and Data Analysis / Percentages / easy ─────────────
  // VERIFY: 20% of 65 = 0.20 × 65 = 13 ✓
  {
    id: 'sat-f7-v3-math-m2e-q07',
    section: 'math',
    moduleId: 'f7v3-math-module-2-easy',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Percentages',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'What is 20% of 65?',
    choices: [
      { label: 'A', text: '10' },
      { label: 'B', text: '13' },
      { label: 'C', text: '16' },
      { label: 'D', text: '20' },
    ],
    correctAnswer: 'B',
    explanation:
      '20% of 65 = 0.20 × 65 = 13.',
    wrongAnswerExplanations: {
      A: '10 = 20% of 50, not 20% of 65. Multiply 0.20 × 65 = 13.',
      C: '16 is approximately 24.6% of 65. The correct answer is 0.20 × 65 = 13.',
      D: '20 is the percent itself, not 20% of 65. To find 20% of 65, compute 0.20 × 65 = 13.',
    },
  },

  // ─── Q08 — Geometry and Trigonometry / Lines, angles, and triangles / easy ─────
  // VERIFY: Triangle angles sum = 180°. 180 − 55 − 75 = 50° ✓
  {
    id: 'sat-f7-v3-math-m2e-q08',
    section: 'math',
    moduleId: 'f7v3-math-module-2-easy',
    domain: 'Geometry and Trigonometry',
    skill: 'Lines, angles, and triangles',
    difficulty: 'easy',
    type: 'multiple_choice',
    question:
      'In a triangle, two angles measure 55° and 75°. What is the measure of the third angle?',
    choices: [
      { label: 'A', text: '40°' },
      { label: 'B', text: '45°' },
      { label: 'C', text: '50°' },
      { label: 'D', text: '60°' },
    ],
    correctAnswer: 'C',
    explanation:
      'The sum of angles in a triangle is 180°. Third angle = 180° − 55° − 75° = 50°.',
    wrongAnswerExplanations: {
      A: '40° gives a total of 55° + 75° + 40° = 170°, not 180°. The third angle must be 180° − 130° = 50°.',
      B: '45° gives a total of 55° + 75° + 45° = 175°, not 180°. Subtract: 180° − 55° − 75° = 50°.',
      D: '60° gives a total of 55° + 75° + 60° = 190°, which exceeds 180°. The third angle is 180° − 55° − 75° = 50°.',
    },
  },

  // ─── Q09 — Algebra / Systems of two linear equations in two variables / medium ──
  // VERIFY: x + 2y = 10 and x = 4. Sub: 4 + 2y = 10 → 2y = 6 → y = 3 ✓
  // Check: 4 + 2(3) = 4 + 6 = 10 ✓
  {
    id: 'sat-f7-v3-math-m2e-q09',
    section: 'math',
    moduleId: 'f7v3-math-module-2-easy',
    domain: 'Algebra',
    skill: 'Systems of two linear equations in two variables',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'What is the value of y in the solution to the system of equations below?\n\nx + 2y = 10\nx = 4',
    choices: [
      { label: 'A', text: '2' },
      { label: 'B', text: '3' },
      { label: 'C', text: '6' },
      { label: 'D', text: '7' },
    ],
    correctAnswer: 'B',
    explanation:
      'Substitute x = 4 into the first equation: 4 + 2y = 10 → 2y = 6 → y = 3.',
    wrongAnswerExplanations: {
      A: 'y = 2 gives x + 2(2) = 4 + 4 = 8 ≠ 10. Subtract 4 from both sides first: 2y = 6, so y = 3.',
      C: 'y = 6 gives x + 2(6) = 4 + 12 = 16 ≠ 10. The correct step is 2y = 10 − 4 = 6, giving y = 3.',
      D: 'y = 7 gives x + 2(7) = 4 + 14 = 18 ≠ 10. Solving 2y = 6 gives y = 3.',
    },
  },

  // ─── Q10 — Advanced Math / Equivalent expressions / medium ───────────────────
  // VERIFY: (x + 4)(x − 3) = x² − 3x + 4x − 12 = x² + x − 12 ✓
  {
    id: 'sat-f7-v3-math-m2e-q10',
    section: 'math',
    moduleId: 'f7v3-math-module-2-easy',
    domain: 'Advanced Math',
    skill: 'Equivalent expressions',
    difficulty: 'medium',
    type: 'multiple_choice',
    question: 'Which expression is equivalent to (x + 4)(x − 3)?',
    choices: [
      { label: 'A', text: 'x² − x − 12' },
      { label: 'B', text: 'x² + x − 12' },
      { label: 'C', text: 'x² + x + 12' },
      { label: 'D', text: 'x² + 7x − 12' },
    ],
    correctAnswer: 'B',
    explanation:
      'Use FOIL: (x + 4)(x − 3) = x² − 3x + 4x − 12 = x² + x − 12.',
    wrongAnswerExplanations: {
      A: 'x² − x − 12 uses −x for the middle term instead of +x. The middle terms are −3x + 4x = +x, so the result is x² + x − 12.',
      C: 'x² + x + 12 uses +12 for the constant instead of −12. The constant term is 4 × (−3) = −12, giving x² + x − 12.',
      D: 'x² + 7x − 12 uses +7x for the middle term. The middle terms are −3x + 4x = x, not 7x. The result is x² + x − 12.',
    },
  },

  // ─── Q11 — Problem-Solving and Data Analysis / One-variable data / medium ─────
  // VERIFY: Data: 8, 12, 14, 15, 16. Mean = (8+12+14+15+16)/5 = 65/5 = 13 ✓
  {
    id: 'sat-f7-v3-math-m2e-q11',
    section: 'math',
    moduleId: 'f7v3-math-module-2-easy',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'One-variable data: distributions and measures of center and spread',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'A student scored 8, 12, 14, 15, and 16 on five quizzes. What is the mean score?',
    choices: [
      { label: 'A', text: '12' },
      { label: 'B', text: '13' },
      { label: 'C', text: '14' },
      { label: 'D', text: '15' },
    ],
    correctAnswer: 'B',
    explanation:
      'Mean = (8 + 12 + 14 + 15 + 16) ÷ 5 = 65 ÷ 5 = 13.',
    wrongAnswerExplanations: {
      A: '12 is not the mean. The sum of all scores is 8 + 12 + 14 + 15 + 16 = 65, and 65 ÷ 5 = 13.',
      C: '14 is the median (middle value when sorted), not the mean. The mean is the sum divided by the count: 65 ÷ 5 = 13.',
      D: '15 is the fourth value in the sorted list, not the mean. The mean is 65 ÷ 5 = 13.',
    },
  },

  // ─── Q12 — Geometry and Trigonometry / Right triangles and trigonometry / medium
  // VERIFY: 3-4-5 right triangle. If legs are 9 and 12, hypotenuse = √(81+144) = √225 = 15 ✓
  {
    id: 'sat-f7-v3-math-m2e-q12',
    section: 'math',
    moduleId: 'f7v3-math-module-2-easy',
    domain: 'Geometry and Trigonometry',
    skill: 'Right triangles and trigonometry',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'A right triangle has legs of length 9 and 12. What is the length of the hypotenuse?',
    choices: [
      { label: 'A', text: '13' },
      { label: 'B', text: '14' },
      { label: 'C', text: '15' },
      { label: 'D', text: '21' },
    ],
    correctAnswer: 'C',
    explanation:
      'By the Pythagorean theorem: c² = 9² + 12² = 81 + 144 = 225. So c = √225 = 15.',
    wrongAnswerExplanations: {
      A: '13 is the hypotenuse of a 5-12-13 right triangle, not a 9-12 right triangle. Here, c² = 81 + 144 = 225, so c = 15.',
      B: '14 does not satisfy the Pythagorean theorem: 9² + 12² = 225 ≠ 14² = 196. The correct hypotenuse is √225 = 15.',
      D: '21 results from adding the legs: 9 + 12 = 21. The Pythagorean theorem requires squaring: c = √(81 + 144) = √225 = 15.',
    },
  },

  // ─── Q13 — Algebra / Linear equations in two variables / medium ───────────────
  // VERIFY: Line passes through (0, 2) and (3, 8). Slope = (8−2)/(3−0) = 6/3 = 2.
  // Equation: y = 2x + 2. At x = 5: y = 2(5) + 2 = 12 ✓
  {
    id: 'sat-f7-v3-math-m2e-q13',
    section: 'math',
    moduleId: 'f7v3-math-module-2-easy',
    domain: 'Algebra',
    skill: 'Linear equations in two variables',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'A line in the xy-plane passes through the points (0, 2) and (3, 8). What is the y-coordinate of the point on this line where x = 5?',
    choices: [
      { label: 'A', text: '10' },
      { label: 'B', text: '12' },
      { label: 'C', text: '14' },
      { label: 'D', text: '17' },
    ],
    correctAnswer: 'B',
    explanation:
      'Find the slope: m = (8 − 2) / (3 − 0) = 6/3 = 2. The y-intercept is 2 (from point (0, 2)), so the equation is y = 2x + 2. At x = 5: y = 2(5) + 2 = 10 + 2 = 12.',
    wrongAnswerExplanations: {
      A: '10 results from computing 2(5) = 10 and forgetting the y-intercept of 2. The equation is y = 2x + 2, so y = 10 + 2 = 12.',
      C: '14 results from using a slope of 3 instead of 2: 3(5) − 1 = 14. The correct slope is (8 − 2)/(3 − 0) = 2, giving y = 2(5) + 2 = 12.',
      D: '17 does not follow from the line through (0, 2) and (3, 8). The correct equation is y = 2x + 2, so at x = 5, y = 12.',
    },
  },

  // ─── Q14 — Advanced Math / Exponential functions / medium ────────────────────
  // VERIFY: P = 500 × (1.04)^t. At t = 0: P = 500. Each year multiplied by 1.04.
  // t = 2: 500 × 1.04² = 500 × 1.0816 = 540.8. t = 1: 500 × 1.04 = 520.
  // Question asks what value of t gives a population that has doubled from initial.
  // Actually: which is the initial value? t=0 → 500. Correct answer for "initial" is 500.
  // VERIFY: f(x) = 3 × 2^x. f(0) = 3×1 = 3. f(1) = 3×2 = 6. f(2) = 3×4 = 12. f(3) = 3×8 = 24 ✓
  {
    id: 'sat-f7-v3-math-m2e-q14',
    section: 'math',
    moduleId: 'f7v3-math-module-2-easy',
    domain: 'Advanced Math',
    skill: 'Exponential functions',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'The function f is defined by f(x) = 3 · 2^x. What is the value of f(3)?',
    choices: [
      { label: 'A', text: '18' },
      { label: 'B', text: '24' },
      { label: 'C', text: '27' },
      { label: 'D', text: '36' },
    ],
    correctAnswer: 'B',
    explanation:
      'Substitute x = 3: f(3) = 3 · 2³ = 3 · 8 = 24.',
    wrongAnswerExplanations: {
      A: '18 results from computing 3 · 2² · (3/2) = 18 or another incorrect calculation. The correct computation is 3 · 2³ = 3 · 8 = 24.',
      C: '27 results from computing 3³ = 27, treating the base as 3 rather than 2. The function has base 2: f(3) = 3 · 2³ = 24.',
      D: '36 results from computing 3 · 12 or another arithmetic error. The exponent applies only to 2: f(3) = 3 · 2³ = 3 · 8 = 24.',
    },
  },

  // ─── Q15 — Problem-Solving and Data Analysis / Two-variable data / medium ──────
  // VERIFY: Model: y = 5x + 20 where x = hours studied, y = score.
  // x = 8 → y = 5(8) + 20 = 40 + 20 = 60. ✓
  {
    id: 'sat-f7-v3-math-m2e-q15',
    section: 'math',
    moduleId: 'f7v3-math-module-2-easy',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Two-variable data: models and scatterplots',
    difficulty: 'medium',
    type: 'multiple_choice',
    stimulus:
      'A linear model predicts a student\'s test score (y) based on the number of hours studied (x): y = 5x + 20.',
    question:
      'According to the model, what test score is predicted for a student who studies 8 hours?',
    choices: [
      { label: 'A', text: '48' },
      { label: 'B', text: '55' },
      { label: 'C', text: '60' },
      { label: 'D', text: '65' },
    ],
    correctAnswer: 'C',
    explanation:
      'Substitute x = 8 into the model: y = 5(8) + 20 = 40 + 20 = 60.',
    wrongAnswerExplanations: {
      A: '48 results from computing 5(8) + 8 = 48, incorrectly using 8 for the constant instead of 20. The model gives 5(8) + 20 = 60.',
      B: '55 results from computing 5(7) + 20 = 35 + 20 = 55, using 7 hours instead of 8. Substituting x = 8: 5(8) + 20 = 60.',
      D: '65 results from computing 5(9) + 20 = 65, using 9 hours instead of 8. The correct substitution is x = 8: 5(8) + 20 = 60.',
    },
  },

  // ─── Q16 — Geometry and Trigonometry / Circles / medium ──────────────────────
  // VERIFY: Circle with radius 6. Area = π × 6² = 36π ✓
  {
    id: 'sat-f7-v3-math-m2e-q16',
    section: 'math',
    moduleId: 'f7v3-math-module-2-easy',
    domain: 'Geometry and Trigonometry',
    skill: 'Circles',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'A circle has a radius of 6. What is the area of the circle, in terms of π?',
    choices: [
      { label: 'A', text: '6π' },
      { label: 'B', text: '12π' },
      { label: 'C', text: '36π' },
      { label: 'D', text: '144π' },
    ],
    correctAnswer: 'C',
    explanation:
      'Area of a circle = πr² = π(6²) = 36π.',
    wrongAnswerExplanations: {
      A: '6π is the radius expressed in terms of π, not the area. The area formula is πr² = π(36) = 36π.',
      B: '12π results from computing 2πr = 2π(6) = 12π, which is the circumference, not the area. Use A = πr² = 36π.',
      D: '144π results from computing π(12)² = 144π, squaring the diameter (12) instead of the radius (6). The area is π(6²) = 36π.',
    },
  },

  // ─── Q17 — Algebra / Linear equations in one variable / easy (grid-in) ─────────
  // VERIFY: 5(x − 2) = 3x + 4 → 5x − 10 = 3x + 4 → 2x = 14 → x = 7
  // Check: 5(7−2) = 5(5) = 25. 3(7)+4 = 21+4 = 25 ✓
  {
    id: 'sat-f7-v3-math-m2e-q17',
    section: 'math',
    moduleId: 'f7v3-math-module-2-easy',
    domain: 'Algebra',
    skill: 'Linear equations in one variable',
    difficulty: 'easy',
    type: 'grid_in',
    question: 'If 5(x − 2) = 3x + 4, what is the value of x?',
    correctAnswer: '7',
    acceptableAnswers: ['7'],
    explanation:
      'Expand: 5x − 10 = 3x + 4. Subtract 3x from both sides: 2x − 10 = 4. Add 10: 2x = 14. Divide by 2: x = 7. Check: 5(7 − 2) = 5(5) = 25 and 3(7) + 4 = 21 + 4 = 25. ✓',
    scoringNotes: 'Only the integer 7 is accepted.',
  },

  // ─── Q18 — Problem-Solving and Data Analysis / Percentages / easy (grid-in) ────
  // VERIFY: Original price = $120. Sale = 25% off. Sale price = 120 × 0.75 = 90 ✓
  {
    id: 'sat-f7-v3-math-m2e-q18',
    section: 'math',
    moduleId: 'f7v3-math-module-2-easy',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Percentages',
    difficulty: 'easy',
    type: 'grid_in',
    question:
      'A jacket originally costs $120. It is on sale for 25% off. What is the sale price of the jacket, in dollars?',
    correctAnswer: '90',
    acceptableAnswers: ['90'],
    explanation:
      'A 25% discount means the buyer pays 100% − 25% = 75% of the original price. Sale price = 0.75 × $120 = $90.',
    scoringNotes: 'Only the integer 90 is accepted.',
  },

  // ─── Q19 — Advanced Math / Nonlinear equations in one variable / medium (grid-in)
  // VERIFY: x² − 5x + 6 = 0 → (x−2)(x−3) = 0 → x = 2 or x = 3.
  // Positive values: 2 and 3. Greater value = 3 ✓
  {
    id: 'sat-f7-v3-math-m2e-q19',
    section: 'math',
    moduleId: 'f7v3-math-module-2-easy',
    domain: 'Advanced Math',
    skill: 'Nonlinear equations in one variable and systems of equations in two variables',
    difficulty: 'medium',
    type: 'grid_in',
    question:
      'If x² − 5x + 6 = 0, what is the greater value of x?',
    correctAnswer: '3',
    acceptableAnswers: ['3'],
    explanation:
      'Factor: x² − 5x + 6 = (x − 2)(x − 3) = 0. Setting each factor to zero gives x = 2 or x = 3. The greater value is 3.',
    scoringNotes: 'Only the integer 3 is accepted.',
  },

  // ─── Q20 — Geometry and Trigonometry / Area and volume formulas / medium (grid-in)
  // VERIFY: Triangle with base 10 and height 8. Area = (1/2)(10)(8) = 40 ✓
  {
    id: 'sat-f7-v3-math-m2e-q20',
    section: 'math',
    moduleId: 'f7v3-math-module-2-easy',
    domain: 'Geometry and Trigonometry',
    skill: 'Area and volume',
    difficulty: 'medium',
    type: 'grid_in',
    question:
      'A triangle has a base of 10 inches and a height of 8 inches. What is the area of the triangle, in square inches?',
    correctAnswer: '40',
    acceptableAnswers: ['40'],
    explanation:
      'Area of a triangle = (1/2) × base × height = (1/2) × 10 × 8 = 40 square inches.',
    scoringNotes: 'Only the integer 40 is accepted.',
  },

  // ─── Q21 — Algebra / Linear functions / medium (grid-in) ─────────────────────
  // VERIFY: f(x) = mx + b. f(0) = 3 → b = 3. f(2) = 9 → 2m + 3 = 9 → 2m = 6 → m = 3.
  // f(x) = 3x + 3. f(5) = 3(5) + 3 = 15 + 3 = 18 ✓
  {
    id: 'sat-f7-v3-math-m2e-q21',
    section: 'math',
    moduleId: 'f7v3-math-module-2-easy',
    domain: 'Algebra',
    skill: 'Linear functions',
    difficulty: 'medium',
    type: 'grid_in',
    question:
      'A linear function f satisfies f(0) = 3 and f(2) = 9. What is the value of f(5)?',
    correctAnswer: '18',
    acceptableAnswers: ['18'],
    explanation:
      'Since f(0) = 3, the y-intercept is 3. The slope is (9 − 3)/(2 − 0) = 6/2 = 3. So f(x) = 3x + 3. Then f(5) = 3(5) + 3 = 15 + 3 = 18.',
    scoringNotes: 'Only the integer 18 is accepted.',
  },

  // ─── Q22 — Problem-Solving and Data Analysis / Probability / medium (grid-in) ──
  // VERIFY: 5 red, 3 blue, 2 yellow = 10 total. P(not yellow) = (10−2)/10 = 8/10 = 4/5.
  // As a fraction: 4/5. As decimal: 0.8 ✓
  {
    id: 'sat-f7-v3-math-m2e-q22',
    section: 'math',
    moduleId: 'f7v3-math-module-2-easy',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Probability and conditional probability',
    difficulty: 'medium',
    type: 'grid_in',
    question:
      'A jar contains 5 red marbles, 3 blue marbles, and 2 yellow marbles. If one marble is selected at random, what is the probability that it is NOT yellow? Enter your answer as a fraction or decimal.',
    correctAnswer: '4/5',
    acceptableAnswers: ['4/5', '8/10', '0.8', '.8'],
    explanation:
      'Total marbles: 5 + 3 + 2 = 10. Yellow marbles: 2. Non-yellow marbles: 10 − 2 = 8. Probability = 8/10 = 4/5 = 0.8.',
    scoringNotes: 'Accept 4/5, 8/10, 0.8, or .8.',
  },
]
