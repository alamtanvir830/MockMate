import type { MathQuestion } from '../types'

export const f7MathModule1QuestionsV3: MathQuestion[] = [

  // ─── Q01 · EASY · Algebra / Linear equations in one variable ─────────────────
  // VERIFY: 5x − 7 = 18 → 5x = 25 → x = 5. Check: 5(5)−7 = 25−7 = 18 ✓
  {
    id: 'sat-f7-v3-math-m1-q01',
    section: 'math',
    moduleId: 'f7v3-math-module-1',
    domain: 'Algebra',
    skill: 'Linear equations in one variable',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'If 5x − 7 = 18, what is the value of x?',
    choices: [
      { label: 'A', text: '3' },
      { label: 'B', text: '4' },
      { label: 'C', text: '5' },
      { label: 'D', text: '6' },
    ],
    correctAnswer: 'C',
    explanation:
      'Add 7 to both sides: 5x = 25. Divide by 5: x = 5. Verify: 5(5) − 7 = 25 − 7 = 18 ✓.',
    wrongAnswerExplanations: {
      A: 'x = 3 gives 5(3) − 7 = 8, not 18. This results from dividing 18 by 5 and rounding, or from subtracting 5 instead of dividing after adding 7.',
      B: 'x = 4 gives 5(4) − 7 = 13, not 18. A student might compute (18 + 7) / 5 = 5 correctly but then write 4 from a subtraction error (18 − 7 = 11, 11 / 5 ≈ 2, then adding something), or confuse the steps.',
      D: 'x = 6 gives 5(6) − 7 = 23, not 18. A student might add 7 to 18 to get 25, then mistakenly add instead of divide, or compute 18/5 + 7 ≈ 10.6 and round incorrectly to 6.',
    },
  },

  // ─── Q02 · EASY · Algebra / Linear functions ─────────────────────────────────
  // VERIFY: f(x) = 4x − 3. f(−2) = 4(−2) − 3 = −8 − 3 = −11 ✓
  {
    id: 'sat-f7-v3-math-m1-q02',
    section: 'math',
    moduleId: 'f7v3-math-module-1',
    domain: 'Algebra',
    skill: 'Linear functions',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'The function f is defined by f(x) = 4x − 3. What is the value of f(−2)?',
    choices: [
      { label: 'A', text: '−11' },
      { label: 'B', text: '−5' },
      { label: 'C', text: '5' },
      { label: 'D', text: '11' },
    ],
    correctAnswer: 'A',
    explanation:
      'Substitute x = −2: f(−2) = 4(−2) − 3 = −8 − 3 = −11.',
    wrongAnswerExplanations: {
      B: '−5 results from computing 4 − (−2) − 3 = 4 + 2 − 3 = 3… or from treating 4(−2) as −4(2) = −8 then writing −8 + 3 = −5 (adding 3 instead of subtracting 3).',
      C: '5 results from ignoring the negative sign on x and computing f(2) = 4(2) − 3 = 5. This is a common sign error when substituting a negative value.',
      D: '11 results from computing 4(2) + 3 = 11, ignoring the negative sign of x and also treating the −3 as +3.',
    },
  },

  // ─── Q03 · EASY · Problem-Solving and Data Analysis / Ratios, rates, proportions ─
  // VERIFY: Unit rate = 252 miles / 4 hours = 63 mph. In 7 hours: 63 × 7 = 441 miles ✓
  {
    id: 'sat-f7-v3-math-m1-q03',
    section: 'math',
    moduleId: 'f7v3-math-module-1',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Ratios, rates, proportional relationships, and units',
    difficulty: 'easy',
    type: 'multiple_choice',
    stimulus:
      'A car travels at a constant speed of 252 miles in 4 hours.',
    question:
      'At this speed, how many miles will the car travel in 7 hours?',
    choices: [
      { label: 'A', text: '378' },
      { label: 'B', text: '414' },
      { label: 'C', text: '441' },
      { label: 'D', text: '504' },
    ],
    correctAnswer: 'C',
    explanation:
      'Speed = 252 ÷ 4 = 63 miles per hour. Distance in 7 hours = 63 × 7 = 441 miles.',
    wrongAnswerExplanations: {
      A: '378 = 63 × 6, which uses 6 hours instead of 7. A student who subtracts 1 from the multiplier might arrive here.',
      B: '414 could result from estimating the unit rate incorrectly (e.g., using 59 mph: 59 × 7 = 413 ≈ 414), or from computing 252 × (7/4) but with an arithmetic slip.',
      D: '504 = 252 × 2, treating 7 hours as twice the original 4 hours rather than 7/4 times. A student who rounds 7/4 ≈ 2 makes this error.',
    },
  },

  // ─── Q04 · EASY · Advanced Math / Nonlinear functions ───────────────────────
  // VERIFY: g(x) = x² − 5x + 6. g(3) = 9 − 15 + 6 = 0 ✓
  {
    id: 'sat-f7-v3-math-m1-q04',
    section: 'math',
    moduleId: 'f7v3-math-module-1',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'The function g is defined by g(x) = x² − 5x + 6. What is the value of g(3)?',
    choices: [
      { label: 'A', text: '−2' },
      { label: 'B', text: '0' },
      { label: 'C', text: '3' },
      { label: 'D', text: '6' },
    ],
    correctAnswer: 'B',
    explanation:
      'Substitute x = 3: g(3) = (3)² − 5(3) + 6 = 9 − 15 + 6 = 0.',
    wrongAnswerExplanations: {
      A: '−2 results from computing 9 − 15 + 4 = −2 (misreading the constant as 4 instead of 6), or from computing 9 − 5(3) − 6 = 9 − 15 − 6 = −12, then making a different arithmetic error.',
      C: '3 is the value of x being substituted, not the value of g(3). A student might confuse the input with the output.',
      D: '6 is the constant term in the function. A student might read the constant term directly as the answer rather than evaluating the expression.',
    },
  },

  // ─── Q05 · EASY · Geometry and Trigonometry / Area and volume ────────────────
  // VERIFY: Right triangle legs 6 and 8 → hypotenuse = √(36+64) = √100 = 10.
  // Perimeter = 6 + 8 + 10 = 24. Area = (1/2)(6)(8) = 24 ✓
  {
    id: 'sat-f7-v3-math-m1-q05',
    section: 'math',
    moduleId: 'f7v3-math-module-1',
    domain: 'Geometry and Trigonometry',
    skill: 'Area and volume',
    difficulty: 'easy',
    type: 'multiple_choice',
    question:
      'A right triangle has legs of length 6 and 8. What is the area of the triangle?',
    choices: [
      { label: 'A', text: '14' },
      { label: 'B', text: '24' },
      { label: 'C', text: '30' },
      { label: 'D', text: '48' },
    ],
    correctAnswer: 'B',
    explanation:
      'Area of a triangle = (1/2) × base × height. For a right triangle, the two legs are the base and height: Area = (1/2)(6)(8) = (1/2)(48) = 24.',
    wrongAnswerExplanations: {
      A: '14 = 6 + 8, the sum of the two legs. This confuses area with the sum of the two shorter sides.',
      C: '30 results from using the perimeter formula incorrectly. The hypotenuse = √(36 + 64) = 10, and 6 + 8 + 10 = 24 for the perimeter — not 30. Alternatively, a student who uses Area = (1/2)(6)(10) = 30 mistakes the hypotenuse for a height.',
      D: '48 = 6 × 8, which is the area of a rectangle with those dimensions. Forgetting to multiply by (1/2) gives this result.',
    },
  },

  // ─── Q06 · EASY · Algebra / Linear equations in two variables ─────────────────
  // VERIFY: Line with slope 2 through (1, 3): y − 3 = 2(x − 1) → y = 2x + 1.
  // At x = 0: y = 1. y-intercept = 1 ✓
  {
    id: 'sat-f7-v3-math-m1-q06',
    section: 'math',
    moduleId: 'f7v3-math-module-1',
    domain: 'Algebra',
    skill: 'Linear equations in two variables',
    difficulty: 'easy',
    type: 'multiple_choice',
    question:
      'A line in the xy-plane has slope 2 and passes through the point (1, 3). What is the y-intercept of this line?',
    choices: [
      { label: 'A', text: '−1' },
      { label: 'B', text: '1' },
      { label: 'C', text: '3' },
      { label: 'D', text: '5' },
    ],
    correctAnswer: 'B',
    explanation:
      'Using point-slope form: y − 3 = 2(x − 1) → y = 2x − 2 + 3 → y = 2x + 1. The y-intercept is 1.',
    wrongAnswerExplanations: {
      A: '−1 results from computing b = y − mx = 3 − 2(1) = 1, but then applying a sign error and writing −1. Or from using y = 2x − 1 after an arithmetic mistake: 3 − 2(1) = 3 − 2 = 1 — wait, actually b = 1 is correct. Some students subtract 2 from 3 incorrectly (3 − 4 = −1) by doubling x instead of computing 2(1) = 2.',
      C: '3 is the y-value of the given point (1, 3). A student might confuse the y-coordinate of the given point with the y-intercept.',
      D: '5 results from computing 3 + 2 = 5, adding the slope to the given y-value instead of computing b = y − mx = 3 − 2 = 1.',
    },
  },

  // ─── Q07 · MEDIUM · Algebra / Systems of two linear equations ────────────────
  // VERIFY: 2x + 3y = 12 and 4x − y = 10.
  // From eq2: y = 4x − 10. Sub into eq1: 2x + 3(4x−10) = 12 → 2x + 12x − 30 = 12
  // → 14x = 42 → x = 3. y = 4(3)−10 = 2. Check eq1: 2(3)+3(2)=6+6=12 ✓ eq2: 4(3)−2=10 ✓
  {
    id: 'sat-f7-v3-math-m1-q07',
    section: 'math',
    moduleId: 'f7v3-math-module-1',
    domain: 'Algebra',
    skill: 'Systems of two linear equations in two variables',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'What is the solution (x, y) to the system of equations below?\n\n2x + 3y = 12\n4x − y = 10',
    choices: [
      { label: 'A', text: '(2, 3)' },
      { label: 'B', text: '(3, 2)' },
      { label: 'C', text: '(4, 1)' },
      { label: 'D', text: '(1, 6)' },
    ],
    correctAnswer: 'B',
    explanation:
      'From the second equation, y = 4x − 10. Substitute into the first: 2x + 3(4x − 10) = 12 → 2x + 12x − 30 = 12 → 14x = 42 → x = 3. Then y = 4(3) − 10 = 2. Solution: (3, 2). Check: 2(3) + 3(2) = 6 + 6 = 12 ✓ and 4(3) − 2 = 12 − 2 = 10 ✓.',
    wrongAnswerExplanations: {
      A: '(2, 3): Check eq1: 2(2)+3(3)=4+9=13≠12. Check eq2: 4(2)−3=5≠10. This swaps x and y from the correct answer.',
      C: '(4, 1): Check eq1: 2(4)+3(1)=8+3=11≠12. Fails both equations.',
      D: '(1, 6): Check eq1: 2(1)+3(6)=2+18=20≠12. A student might guess based on numbers appearing in the equations.',
    },
  },

  // ─── Q08 · MEDIUM · Advanced Math / Equivalent expressions ──────────────────
  // VERIFY: (3x − 4)(2x + 5) = 6x² + 15x − 8x − 20 = 6x² + 7x − 20 ✓
  {
    id: 'sat-f7-v3-math-m1-q08',
    section: 'math',
    moduleId: 'f7v3-math-module-1',
    domain: 'Advanced Math',
    skill: 'Equivalent expressions',
    difficulty: 'medium',
    type: 'multiple_choice',
    question: 'Which of the following is equivalent to (3x − 4)(2x + 5)?',
    choices: [
      { label: 'A', text: '6x² − 20' },
      { label: 'B', text: '6x² + 7x − 20' },
      { label: 'C', text: '6x² − 7x − 20' },
      { label: 'D', text: '6x² + 23x − 20' },
    ],
    correctAnswer: 'B',
    explanation:
      'Use FOIL: (3x)(2x) + (3x)(5) + (−4)(2x) + (−4)(5) = 6x² + 15x − 8x − 20 = 6x² + 7x − 20.',
    wrongAnswerExplanations: {
      A: '6x² − 20 omits the middle term entirely. This is the error of computing only the first and last products: (3x)(2x) + (−4)(5) = 6x² − 20, forgetting the cross-terms 15x and −8x.',
      C: '6x² − 7x − 20 has the correct magnitude but the wrong sign for the middle term. It results from computing (3x)(2x) − (3x)(5) + (4)(2x) + (−4)(5) — an error in applying the signs of the factors.',
      D: '6x² + 23x − 20 results from computing the middle terms as (3x)(5) + (4)(2x) = 15x + 8x = 23x, ignoring the negative sign on −4.',
    },
  },

  // ─── Q09 · MEDIUM · Algebra / Linear inequalities ────────────────────────────
  // VERIFY: A company produces at least 200 units/day. Each machine produces 35 units/day.
  // Already have 2 machines producing 70 units. Need 35m + 70 ≥ 200 → 35m ≥ 130 → m ≥ 130/35
  // = 26/7 ≈ 3.71, so m ≥ 4 additional machines (rounding up since machines are whole numbers).
  // But the question asks for the inequality (not the rounded result), so m ≥ 130/35.
  // Let's restructure cleanly: each machine produces 25 units. Have 3 machines = 75.
  // Need total ≥ 200. 25m + 75 ≥ 200 → 25m ≥ 125 → m ≥ 5. Clean integer answer.
  // CHECK: 25(5) + 75 = 125 + 75 = 200 ✓ At least 5 additional machines.
  {
    id: 'sat-f7-v3-math-m1-q09',
    section: 'math',
    moduleId: 'f7v3-math-module-1',
    domain: 'Algebra',
    skill: 'Linear inequalities in one or two variables',
    difficulty: 'medium',
    type: 'multiple_choice',
    stimulus:
      'A factory already has 3 machines, each producing 25 units per day. The factory needs to produce at least 200 units per day total. The factory plans to add m more machines, each also producing 25 units per day.',
    question:
      'Which inequality gives the minimum number of additional machines m the factory must add?',
    choices: [
      { label: 'A', text: 'm ≥ 3' },
      { label: 'B', text: 'm ≥ 4' },
      { label: 'C', text: 'm ≥ 5' },
      { label: 'D', text: 'm ≥ 8' },
    ],
    correctAnswer: 'C',
    explanation:
      'Current production: 3 × 25 = 75 units. Total with m additional machines: 25m + 75 ≥ 200. Solving: 25m ≥ 125, so m ≥ 5. Verify: 25(5) + 75 = 125 + 75 = 200 ✓.',
    wrongAnswerExplanations: {
      A: 'm ≥ 3 ignores the 3 machines already in place. A student might compute 3 machines needed to reach some intermediate target, or confuse the existing machine count with the required additional count.',
      B: 'm ≥ 4 results from computing 200/25 = 8 total machines needed but then subtracting only 4 from 8, possibly forgetting that the 3 existing machines should reduce the count by 3 (not 4): 8 − 3 = 5, not 4.',
      D: 'm ≥ 8 results from dividing 200 by 25 to get 8 without subtracting the 3 already-existing machines. This gives the total number of machines needed, not the additional machines needed.',
    },
  },

  // ─── Q10 · MEDIUM · Problem-Solving and Data Analysis / Statistics ────────────
  // VERIFY: Data set: 12, 15, 18, 21, 24, 27, 30.
  // Mean = (12+15+18+21+24+27+30)/7 = 147/7 = 21.
  // Median = middle value = 4th value = 21 (since 7 values). Mean = Median = 21.
  // Adding a value of 21: new set has 8 values, sorted: 12,15,18,21,21,24,27,30.
  // New mean = (147+21)/8 = 168/8 = 21 (unchanged). New median = (21+21)/2 = 21 (unchanged). ✓
  {
    id: 'sat-f7-v3-math-m1-q10',
    section: 'math',
    moduleId: 'f7v3-math-module-1',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'One-variable data: distributions and measures of center and spread',
    difficulty: 'medium',
    type: 'multiple_choice',
    stimulus:
      'A data set consists of the values 12, 15, 18, 21, 24, 27, and 30. An eighth value equal to 21 is added to the data set.',
    question:
      'Which of the following correctly describes the effect of adding the eighth value on the mean and median of the data set?',
    choices: [
      { label: 'A', text: 'Both the mean and median increase.' },
      { label: 'B', text: 'The mean increases; the median stays the same.' },
      { label: 'C', text: 'Both the mean and median stay the same.' },
      { label: 'D', text: 'The mean stays the same; the median decreases.' },
    ],
    correctAnswer: 'C',
    explanation:
      'Original mean = (12 + 15 + 18 + 21 + 24 + 27 + 30) / 7 = 147 / 7 = 21. Original median (4th of 7 sorted values) = 21. After adding 21: new mean = 168 / 8 = 21 (unchanged). New median = average of 4th and 5th values in the sorted 8-value set (21, 21) = 21 (unchanged). Both stay the same.',
    wrongAnswerExplanations: {
      A: 'The mean and median both equal 21, and adding another 21 to the set does not change either measure. Adding a value equal to the mean keeps the mean constant.',
      B: 'The mean does not increase. Adding a value exactly equal to the current mean of 21 leaves the mean unchanged at 21.',
      D: 'The median does not decrease. After adding 21, the sorted set is 12, 15, 18, 21, 21, 24, 27, 30. The median is (21 + 21)/2 = 21, unchanged from the original 21.',
    },
  },

  // ─── Q11 · MEDIUM · Advanced Math / Nonlinear equations ─────────────────────
  // VERIFY: x² + 6x + 5 = 0 → (x+1)(x+5) = 0 → x = −1 or x = −5.
  // Sum of solutions = −1 + (−5) = −6. Check: by Vieta's, sum = −b/a = −6/1 = −6 ✓
  {
    id: 'sat-f7-v3-math-m1-q11',
    section: 'math',
    moduleId: 'f7v3-math-module-1',
    domain: 'Advanced Math',
    skill: 'Nonlinear equations in one variable and systems of equations in two variables',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'What is the sum of all values of x that satisfy x² + 6x + 5 = 0?',
    choices: [
      { label: 'A', text: '−6' },
      { label: 'B', text: '−5' },
      { label: 'C', text: '5' },
      { label: 'D', text: '6' },
    ],
    correctAnswer: 'A',
    explanation:
      'Factor: x² + 6x + 5 = (x + 1)(x + 5) = 0. Solutions: x = −1 and x = −5. Sum = −1 + (−5) = −6. (Alternatively, by Vieta\'s formulas, the sum of roots = −b/a = −6/1 = −6.)',
    wrongAnswerExplanations: {
      B: '−5 is one of the two roots, not their sum. A student might find only one solution and report it as the answer.',
      C: '5 is the product of the roots (by Vieta\'s: c/a = 5/1 = 5), not their sum. A student who confuses the sum and product formulas might select this.',
      D: '6 is the positive version of the coefficient of x, not the sum of roots. A student who ignores the negative sign from Vieta\'s formula (sum = −b/a, not b/a) would get +6.',
    },
  },

  // ─── Q12 · MEDIUM · Algebra / Equivalent expressions ────────────────────────
  // VERIFY: 4(2x − 3) − 3(x + 5) = 8x − 12 − 3x − 15 = 5x − 27 ✓
  {
    id: 'sat-f7-v3-math-m1-q12',
    section: 'math',
    moduleId: 'f7v3-math-module-1',
    domain: 'Algebra',
    skill: 'Equivalent expressions',
    difficulty: 'medium',
    type: 'multiple_choice',
    question: 'Which expression is equivalent to 4(2x − 3) − 3(x + 5)?',
    choices: [
      { label: 'A', text: '5x + 3' },
      { label: 'B', text: '5x − 3' },
      { label: 'C', text: '5x − 27' },
      { label: 'D', text: '11x − 27' },
    ],
    correctAnswer: 'C',
    explanation:
      'Distribute: 4(2x − 3) = 8x − 12 and 3(x + 5) = 3x + 15. Then: (8x − 12) − (3x + 15) = 8x − 12 − 3x − 15 = 5x − 27.',
    wrongAnswerExplanations: {
      A: '5x + 3 results from computing (8x − 12) − (3x − 15) = 5x + 3, treating the −3 in the second group as −(−15) = +15 and the sign on 15 incorrectly.',
      B: '5x − 3 results from computing 8x − 3x = 5x correctly but then computing −12 − 15 = −3 rather than −27, perhaps adding instead of subtracting: −12 + 15 = +3 gives 5x + 3, or −12 + 9 = −3 from an arithmetic error.',
      D: '11x − 27 results from computing 8x + 3x = 11x instead of 8x − 3x = 5x, adding the x-terms instead of subtracting them.',
    },
  },

  // ─── Q13 · MEDIUM · Problem-Solving and Data Analysis / Percentages ────────────
  // VERIFY: Original price = $80. After 15% discount: 80 × (1 − 0.15) = 80 × 0.85 = 68.
  // After additional 10% off the discounted price: 68 × (1 − 0.10) = 68 × 0.90 = 61.20.
  // Total % saved = (80 − 61.20)/80 = 18.80/80 = 0.235 = 23.5%. So price paid = $61.20 ✓
  {
    id: 'sat-f7-v3-math-m1-q13',
    section: 'math',
    moduleId: 'f7v3-math-module-1',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Percentages',
    difficulty: 'medium',
    type: 'multiple_choice',
    stimulus:
      'A jacket originally priced at $80 is on sale for 15% off. A store loyalty card gives an additional 10% off the sale price.',
    question:
      'What is the final price of the jacket after both discounts are applied?',
    choices: [
      { label: 'A', text: '$56.00' },
      { label: 'B', text: '$60.00' },
      { label: 'C', text: '$61.20' },
      { label: 'D', text: '$68.00' },
    ],
    correctAnswer: 'C',
    explanation:
      'After the 15% discount: $80 × 0.85 = $68.00. After the additional 10% off the sale price: $68.00 × 0.90 = $61.20.',
    wrongAnswerExplanations: {
      A: '$56.00 results from applying a combined 30% discount (15% + 10% + 5% error, or treating the discounts as additive at 30%): $80 × 0.70 = $56. The discounts are sequential, not simply additive.',
      B: '$60.00 results from applying a combined 25% discount (15% + 10% added together): $80 × 0.75 = $60. This is incorrect because the second 10% applies to the already-discounted price, not the original.',
      D: '$68.00 is the price after only the first 15% discount, before applying the loyalty card\'s additional 10% discount.',
    },
  },

  // ─── Q14 · MEDIUM · Advanced Math / Exponential functions ───────────────────
  // VERIFY: P(t) = 500 · (1.06)^t. In 2 years: 500 · (1.06)^2 = 500 · 1.1236 = 561.80 ≈ 562.
  // But the question asks which expression represents the population after t years —
  // this is conceptual. Let's make it: what is the growth factor for the population
  // doubling every 12 years, starting at 500: P(t) = 500 · 2^(t/12).
  // Actually simpler: What is P(3) for P(t) = 200 · (1.5)^t?
  // P(3) = 200 · (1.5)^3 = 200 · 3.375 = 675 ✓
  {
    id: 'sat-f7-v3-math-m1-q14',
    section: 'math',
    moduleId: 'f7v3-math-module-1',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'medium',
    type: 'multiple_choice',
    stimulus:
      'The number of bacteria in a culture is modeled by the function P(t) = 200 · (1.5)^t, where t is the time in hours after the experiment begins.',
    question:
      'How many bacteria does the model predict will be in the culture after 3 hours?',
    choices: [
      { label: 'A', text: '450' },
      { label: 'B', text: '500' },
      { label: 'C', text: '600' },
      { label: 'D', text: '675' },
    ],
    correctAnswer: 'D',
    explanation:
      'Substitute t = 3: P(3) = 200 · (1.5)^3. Compute (1.5)^3 = 1.5 × 1.5 × 1.5 = 2.25 × 1.5 = 3.375. So P(3) = 200 × 3.375 = 675.',
    wrongAnswerExplanations: {
      A: '450 = 200 × 2.25 = 200 × (1.5)^2, which computes only two hours of growth instead of three.',
      B: '500 might result from computing 200 × (1.5 + 1) = 200 × 2.5 = 500, treating the exponent additively rather than multiplicatively.',
      C: '600 = 200 × 3, which treats (1.5)^3 as simply 3 × 1 = 3, confusing the exponent with multiplication.',
    },
  },

  // ─── Q15 · HARD · Algebra / Linear equations in two variables ────────────────
  // VERIFY: Line through (a, 0) and (0, b) where 3a + 2b = 24 and the x-intercept
  // is twice the y-intercept: a = 2b. Sub: 3(2b) + 2b = 24 → 6b + 2b = 24 → 8b = 24 → b = 3.
  // a = 6. Line passes through (6, 0) and (0, 3). Slope = (3−0)/(0−6) = −1/2.
  // Equation: y = −(1/2)x + 3. The value of 2a + 3b = 2(6) + 3(3) = 12 + 9 = 21.
  // CHECK: 3(6)+2(3) = 18+6 = 24 ✓. a = 2b: 6 = 2(3) ✓.
  {
    id: 'sat-f7-v3-math-m1-q15',
    section: 'math',
    moduleId: 'f7v3-math-module-1',
    domain: 'Algebra',
    skill: 'Linear equations in two variables',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'A line in the xy-plane has an x-intercept of a and a y-intercept of b, where a ≠ 0 and b ≠ 0. The x-intercept is twice the y-intercept, and 3a + 2b = 24. What is the value of 2a + 3b?',
    choices: [
      { label: 'A', text: '18' },
      { label: 'B', text: '21' },
      { label: 'C', text: '24' },
      { label: 'D', text: '27' },
    ],
    correctAnswer: 'B',
    explanation:
      'The x-intercept is twice the y-intercept: a = 2b. Substitute into 3a + 2b = 24: 3(2b) + 2b = 6b + 2b = 8b = 24, so b = 3. Then a = 2(3) = 6. The value of 2a + 3b = 2(6) + 3(3) = 12 + 9 = 21.',
    wrongAnswerExplanations: {
      A: '18 might result from computing 2a + 3b = 2(6) + 3(2) = 12 + 6 = 18, using b = 2 instead of b = 3 (confusing the ratio: the student may have set b = 2a instead of a = 2b).',
      C: '24 is the value of 3a + 2b given in the problem, not the value of 2a + 3b. A student might read the question incorrectly and return the given constraint.',
      D: '27 might result from computing 2a + 3b with incorrect values, such as a = 6 and b = 5 (from a different setup), or from setting a = 3b instead of a = 2b and solving accordingly.',
    },
  },

  // ─── Q16 · HARD · Geometry and Trigonometry / Right triangles and trigonometry ──
  // VERIFY: Triangle with angle A = 30°, hypotenuse = 20. Side opposite A = 20 · sin(30°) = 20 · 0.5 = 10.
  // Side adjacent to A = 20 · cos(30°) = 20 · (√3/2) = 10√3 ≈ 17.32.
  // But the question: in right triangle with right angle at C, angle A = 30°, AB (hypotenuse) = 16.
  // BC (opposite to A) = 16 · sin(30°) = 16 · 0.5 = 8. AC (adjacent to A) = 16 · cos(30°) = 16 · (√3/2) = 8√3.
  // Area = (1/2) · BC · AC = (1/2)(8)(8√3) = (1/2)(64√3) = 32√3 ✓
  {
    id: 'sat-f7-v3-math-m1-q16',
    section: 'math',
    moduleId: 'f7v3-math-module-1',
    domain: 'Geometry and Trigonometry',
    skill: 'Right triangles and trigonometry',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'In right triangle ABC, angle C = 90° and angle A = 30°. The hypotenuse AB has length 16. What is the area of triangle ABC?',
    choices: [
      { label: 'A', text: '16√3' },
      { label: 'B', text: '32√3' },
      { label: 'C', text: '48' },
      { label: 'D', text: '64√3' },
    ],
    correctAnswer: 'B',
    explanation:
      'With right angle at C and angle A = 30°, angle B = 60°. Side BC (opposite to A) = AB · sin(30°) = 16 · (1/2) = 8. Side AC (adjacent to A) = AB · cos(30°) = 16 · (√3/2) = 8√3. Area = (1/2)(BC)(AC) = (1/2)(8)(8√3) = (1/2)(64√3) = 32√3.',
    wrongAnswerExplanations: {
      A: '16√3 results from computing (1/2)(8)(4√3), halving the adjacent side again, or from using only one of the legs and dividing by 2 in the wrong place: (1/2)(16)(√3) = 8√3 — but then doubling incorrectly — or from computing Area = (1/2)(base)(height) with base = 16 and height = √3.',
      C: '48 might result from mistakenly using the hypotenuse as a leg and computing Area = (1/2)(16)(6) = 48, approximating 8√3 ≈ 6 incorrectly, or treating the triangle as if it were a 6-8-10 triangle scaled up.',
      D: '64√3 results from computing the full product (8)(8√3) = 64√3 without the factor of 1/2 in the area formula.',
    },
  },

  // ─── Q17 · HARD · Algebra / Linear equations in one variable · GRID-IN ───────
  // VERIFY: 2(3t − 4) = 5t − 1. 6t − 8 = 5t − 1. 6t − 5t = −1 + 8. t = 7.
  // Check: 2(3·7 − 4) = 2(21−4) = 2(17) = 34. 5(7)−1 = 35−1 = 34 ✓
  {
    id: 'sat-f7-v3-math-m1-q17',
    section: 'math',
    moduleId: 'f7v3-math-module-1',
    domain: 'Algebra',
    skill: 'Linear equations in one variable',
    difficulty: 'hard',
    type: 'grid_in',
    question: 'If 2(3t − 4) = 5t − 1, what is the value of t?',
    correctAnswer: '7',
    acceptableAnswers: ['7'],
    explanation:
      'Distribute: 6t − 8 = 5t − 1. Subtract 5t from both sides: t − 8 = −1. Add 8: t = 7. Check: 2(3(7) − 4) = 2(17) = 34 and 5(7) − 1 = 34 ✓.',
    scoringNotes: 'Only 7 is acceptable.',
  },

  // ─── Q18 · HARD · Advanced Math / Nonlinear functions · GRID-IN ──────────────
  // VERIFY: h(x) = x² − 4x − 12. Find positive x-intercept.
  // x² − 4x − 12 = 0 → (x−6)(x+2) = 0 → x = 6 or x = −2. Positive x-intercept = 6.
  // Check: 6² − 4(6) − 12 = 36 − 24 − 12 = 0 ✓
  {
    id: 'sat-f7-v3-math-m1-q18',
    section: 'math',
    moduleId: 'f7v3-math-module-1',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'The function h is defined by h(x) = x² − 4x − 12. What is the positive x-intercept of the graph of y = h(x) in the xy-plane?',
    correctAnswer: '6',
    acceptableAnswers: ['6'],
    explanation:
      'Set h(x) = 0: x² − 4x − 12 = 0. Factor: (x − 6)(x + 2) = 0. Solutions: x = 6 or x = −2. The positive x-intercept is 6. Verify: 6² − 4(6) − 12 = 36 − 24 − 12 = 0 ✓.',
    scoringNotes: 'Only 6 is acceptable.',
  },

  // ─── Q19 · HARD · Problem-Solving and Data Analysis / Probability · GRID-IN ───
  // VERIFY: 40 students total. 14 play both sports. 22 play only basketball. 4 play only soccer.
  // P(basketball | plays at least one sport) requires knowing totals.
  // Simpler: table approach.
  // Students: 30 in chess club, 20 in debate club, 8 in both, total students = 50.
  // Wait — let me use a clean problem.
  // 50 students surveyed: 28 like math, 20 like science, 10 like both.
  // P(likes math but not science) = (28−10)/50 = 18/50 = 9/25.
  // CHECK: 28−10 = 18 students like math but not science. 18/50 = 9/25 = 0.36 ✓
  {
    id: 'sat-f7-v3-math-m1-q19',
    section: 'math',
    moduleId: 'f7v3-math-module-1',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Probability and conditional probability',
    difficulty: 'hard',
    type: 'grid_in',
    stimulus:
      'In a survey of 50 students, 28 said they like math, 20 said they like science, and 10 said they like both math and science.',
    question:
      'If a student is selected at random from those surveyed, what is the probability that the selected student likes math but does not like science? Enter your answer as a fraction or decimal.',
    correctAnswer: '9/25',
    acceptableAnswers: ['9/25', '18/50', '0.36', '.36'],
    explanation:
      'Students who like math but not science = 28 − 10 = 18. Total students = 50. Probability = 18/50 = 9/25 = 0.36.',
    scoringNotes: 'Accept 9/25, 18/50, 0.36, or .36.',
  },

  // ─── Q20 · HARD · Advanced Math / Radical and rational equations · GRID-IN ────
  // VERIFY: √(2x + 9) = x. Square both sides: 2x + 9 = x².
  // x² − 2x − 9 = 0. x = (2 ± √(4+36))/2 = (2 ± √40)/2 = (2 ± 2√10)/2 = 1 ± √10.
  // √10 ≈ 3.162. x = 1 + 3.162 ≈ 4.162 (check: √(2·4.162+9) = √(17.324) ≈ 4.162 ✓).
  // x = 1 − √10 ≈ −2.162 (check: √(2(−2.162)+9) = √(4.676) ≈ 2.162, but x = −2.162 ≠ 2.162 — extraneous).
  // That gives an irrational answer. Let me redesign for a clean integer.
  // √(3x + 4) = x − 2. Square: 3x + 4 = x² − 4x + 4 → x² − 7x = 0 → x(x−7) = 0 → x = 0 or x = 7.
  // Check x = 7: √(21+4) = √25 = 5 and 7−2 = 5 ✓.
  // Check x = 0: √(0+4) = 2 and 0−2 = −2. 2 ≠ −2, extraneous. Valid answer: x = 7 ✓
  {
    id: 'sat-f7-v3-math-m1-q20',
    section: 'math',
    moduleId: 'f7v3-math-module-1',
    domain: 'Advanced Math',
    skill: 'Radical and rational equations',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'What is the value of x that satisfies √(3x + 4) = x − 2? (Note: √ denotes the principal square root.)',
    correctAnswer: '7',
    acceptableAnswers: ['7'],
    explanation:
      'Square both sides (requiring x − 2 ≥ 0, so x ≥ 2): 3x + 4 = (x − 2)² = x² − 4x + 4. Rearrange: x² − 7x = 0 → x(x − 7) = 0. Solutions: x = 0 or x = 7. Check x = 0: √(0 + 4) = 2, but 0 − 2 = −2. Since 2 ≠ −2, x = 0 is extraneous. Check x = 7: √(21 + 4) = √25 = 5 and 7 − 2 = 5 ✓. The answer is x = 7.',
    scoringNotes: 'Only 7 is acceptable. x = 0 is extraneous.',
  },

  // ─── Q21 · HARD · Advanced Math / Nonlinear equations (system) · GRID-IN ─────
  // VERIFY: y = x² − 3x and y = x + 5. Set equal: x² − 3x = x + 5 → x² − 4x − 5 = 0
  // → (x−5)(x+1) = 0 → x = 5 or x = −1.
  // At x = 5: y = 5 + 5 = 10 → point (5, 10).
  // At x = −1: y = −1 + 5 = 4 → point (−1, 4).
  // The greater x-value at an intersection is 5.
  // Check x=5 in first eq: y = 25−15 = 10 ✓. Sum of y-values = 10 + 4 = 14 ✓
  {
    id: 'sat-f7-v3-math-m1-q21',
    section: 'math',
    moduleId: 'f7v3-math-module-1',
    domain: 'Advanced Math',
    skill: 'Nonlinear equations in one variable and systems of equations in two variables',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'In the xy-plane, the graphs of y = x² − 3x and y = x + 5 intersect at two points. What is the sum of the y-coordinates of the two intersection points?',
    correctAnswer: '14',
    acceptableAnswers: ['14'],
    explanation:
      'Set equal: x² − 3x = x + 5 → x² − 4x − 5 = 0 → (x − 5)(x + 1) = 0. So x = 5 or x = −1. At x = 5: y = 5 + 5 = 10. At x = −1: y = −1 + 5 = 4. Sum of y-coordinates = 10 + 4 = 14. Verify both points in y = x² − 3x: y(5) = 25 − 15 = 10 ✓; y(−1) = 1 + 3 = 4 ✓.',
    scoringNotes: 'Only 14 is acceptable.',
  },

  // ─── Q22 · HARD · Geometry and Trigonometry / Circles · GRID-IN ──────────────
  // VERIFY: Circle equation (x−3)² + (y+2)² = 25. Center = (3, −2), radius = 5.
  // Area = π·r² = 25π.
  // A chord is drawn from (3+5, −2) = (8, −2) to a point where x = 3.
  // At x=3: (3−3)² + (y+2)² = 25 → (y+2)² = 25 → y = 3 or y = −7.
  // Points on circle at x=3: (3, 3) and (3, −7). Chord length = |3−(−7)| = 10.
  // The question: a chord passes through the center = diameter = 2r = 10. ← simpler.
  // Instead: What is the length of the chord of the circle (x−3)² + (y+2)² = 25 that passes
  // through the center (i.e., the diameter)?
  // Diameter = 2×5 = 10 ✓
  // To make it less trivial: find the length of the chord connecting x = 0 intersections.
  // At x=0: (−3)² + (y+2)² = 25 → (y+2)² = 25−9 = 16 → y+2 = ±4 → y = 2 or y = −6.
  // Points: (0, 2) and (0, −6). Length = |2−(−6)| = 8.
  // CHECK: distance from (0,2) to (0,−6) = 8 ✓. Also verify on circle:
  // (0−3)²+(2+2)² = 9+16 = 25 ✓; (0−3)²+(−6+2)² = 9+16 = 25 ✓
  {
    id: 'sat-f7-v3-math-m1-q22',
    section: 'math',
    moduleId: 'f7v3-math-module-1',
    domain: 'Geometry and Trigonometry',
    skill: 'Circles',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'The equation of a circle in the xy-plane is (x − 3)² + (y + 2)² = 25. A vertical chord of the circle lies on the line x = 0. What is the length of this chord?',
    correctAnswer: '8',
    acceptableAnswers: ['8'],
    explanation:
      'Substitute x = 0 into the circle equation: (0 − 3)² + (y + 2)² = 25 → 9 + (y + 2)² = 25 → (y + 2)² = 16 → y + 2 = ±4 → y = 2 or y = −6. The two intersection points are (0, 2) and (0, −6). The length of the chord is |2 − (−6)| = 8. Verify: (0−3)²+(2+2)²=9+16=25 ✓ and (0−3)²+(−6+2)²=9+16=25 ✓.',
    scoringNotes: 'Only 8 is acceptable.',
  },

]
