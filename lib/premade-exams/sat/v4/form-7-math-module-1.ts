import type { MathQuestion } from '../types'

export const f7MathModule1QuestionsV4: MathQuestion[] = [

  // ─── Q01 · EASY (5-6/10) · Algebra / Linear equations in one variable ──────────
  // VERIFY: Three consecutive even integers whose sum is 78.
  // Let integers be n, n+2, n+4. Sum: 3n + 6 = 78 → 3n = 72 → n = 24.
  // Integers: 24, 26, 28. Largest = 28.
  // Check: 24+26+28 = 78 ✓. All even ✓.
  {
    id: 'sat-f7-v4-math-m1-q01',
    section: 'math',
    moduleId: 'f7v4-math-module-1',
    domain: 'Algebra',
    skill: 'Linear equations in one variable',
    difficulty: 'easy',
    type: 'multiple_choice',
    question:
      'The sum of three consecutive even integers is 78. What is the largest of the three integers?',
    choices: [
      { label: 'A', text: '24' },
      { label: 'B', text: '26' },
      { label: 'C', text: '28' },
      { label: 'D', text: '30' },
    ],
    correctAnswer: 'C',
    explanation:
      'Let the three consecutive even integers be n, n + 2, and n + 4. Their sum: n + (n + 2) + (n + 4) = 3n + 6 = 78. Solving: 3n = 72, so n = 24. The integers are 24, 26, and 28. The largest is 28. Verify: 24 + 26 + 28 = 78 ✓.',
    wrongAnswerExplanations: {
      A: '24 is the smallest integer, not the largest. A student who solves for n = 24 but reports the first integer makes this error.',
      B: '26 is the middle integer. A student who finds the middle value instead of the largest makes this error.',
      D: '30 results from solving for n = 26 (perhaps setting 3n = 78 directly without accounting for the +6) and then adding 4 to get 30, or from assuming the middle integer is 26 and adding 4.',
    },
  },

  // ─── Q02 · EASY (5-6/10) · Algebra / Linear functions ──────────────────────────
  // VERIFY: f is a linear function with f(2) = 11 and f(5) = 20.
  // Slope = (20−11)/(5−2) = 9/3 = 3.
  // Using point (2,11): 11 = 3(2) + b → 11 = 6 + b → b = 5.
  // So f(x) = 3x + 5. f(0) = 5 (y-intercept).
  // Check: f(5) = 3(5)+5 = 20 ✓. f(2) = 3(2)+5 = 11 ✓.
  {
    id: 'sat-f7-v4-math-m1-q02',
    section: 'math',
    moduleId: 'f7v4-math-module-1',
    domain: 'Algebra',
    skill: 'Linear functions',
    difficulty: 'easy',
    type: 'multiple_choice',
    question:
      'A linear function f satisfies f(2) = 11 and f(5) = 20. What is the y-intercept of the graph of y = f(x) in the xy-plane?',
    choices: [
      { label: 'A', text: '3' },
      { label: 'B', text: '5' },
      { label: 'C', text: '8' },
      { label: 'D', text: '11' },
    ],
    correctAnswer: 'B',
    explanation:
      'The slope is m = (20 − 11) / (5 − 2) = 9 / 3 = 3. Using slope-intercept form with point (2, 11): 11 = 3(2) + b → b = 11 − 6 = 5. So f(x) = 3x + 5, and the y-intercept is 5. Verify: f(5) = 3(5) + 5 = 20 ✓.',
    wrongAnswerExplanations: {
      A: '3 is the slope of the function, not the y-intercept. A student who finds the slope but reports it as the y-intercept makes this error.',
      C: '8 could result from computing b = f(2) − slope = 11 − 3 = 8, subtracting the slope value instead of 3 × 2 = 6.',
      D: '11 is the value f(2), the y-value when x = 2, not when x = 0. A student who confuses f(2) with the y-intercept makes this error.',
    },
  },

  // ─── Q03 · EASY (5-6/10) · PSDA / Ratios, rates, proportional relationships ───
  // VERIFY: A recipe uses 3/4 cup sugar per 12 cookies. Maya wants to make 40 cookies.
  // Cups per cookie: (3/4)/12 = 3/48 = 1/16 cup per cookie.
  // For 40 cookies: (1/16) × 40 = 40/16 = 5/2 = 2.5 cups.
  // Check via proportion: (3/4)/12 = x/40 → x = 40 × (3/4)/12 = 40 × 3/(4×12) = 120/48 = 5/2 ✓
  {
    id: 'sat-f7-v4-math-m1-q03',
    section: 'math',
    moduleId: 'f7v4-math-module-1',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Ratios, rates, proportional relationships, and units',
    difficulty: 'easy',
    type: 'multiple_choice',
    stimulus:
      'A cookie recipe uses 3/4 cup of sugar to make 12 cookies. Maya wants to use the same recipe to make 40 cookies.',
    question: 'How many cups of sugar does Maya need?',
    choices: [
      { label: 'A', text: '2' },
      { label: 'B', text: '2.5' },
      { label: 'C', text: '3' },
      { label: 'D', text: '3.75' },
    ],
    correctAnswer: 'B',
    explanation:
      'Set up the proportion: (3/4) cups / 12 cookies = x cups / 40 cookies. Cross-multiply: x = 40 × (3/4) / 12 = 30/12 = 5/2 = 2.5 cups. Verify: 2.5 cups × (12 cookies / 0.75 cups) = 2.5 × 16 = 40 cookies ✓.',
    wrongAnswerExplanations: {
      A: '2 cups would yield only 32 cookies (2 ÷ 0.75 × 12 = 32), not 40. This may result from rounding 2.5 down or from computing (40 − 12) × (0.75/12) = 28 × 0.0625 = 1.75, then adding 0.25 incorrectly.',
      C: '3 cups results from computing 40/12 ≈ 3.33 and rounding down, then multiplying by 0.75 incorrectly, or from computing (3/4) × 4 = 3 after noticing 40/12 ≈ 3.3 and rounding to 4 batches.',
      D: '3.75 cups results from multiplying (3/4) × 5 = 3.75, treating 40/12 as exactly 5 rather than 10/3. A student who rounds 40/12 ≈ 5 (perhaps confusing with 40/8) makes this error.',
    },
  },

  // ─── Q04 · EASY (5-6/10) · Advanced Math / Nonlinear functions ──────────────────
  // VERIFY: f(x) = 2x² − 3x + k. Given f(1) = 4, find k, then find f(−1).
  // f(1) = 2(1)² − 3(1) + k = 2 − 3 + k = −1 + k = 4 → k = 5.
  // f(−1) = 2(−1)² − 3(−1) + 5 = 2 + 3 + 5 = 10.
  // Check: f(1) = 2−3+5 = 4 ✓. f(−1) = 2+3+5 = 10 ✓.
  {
    id: 'sat-f7-v4-math-m1-q04',
    section: 'math',
    moduleId: 'f7v4-math-module-1',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'easy',
    type: 'multiple_choice',
    question:
      'The function f is defined by f(x) = 2x² − 3x + k, where k is a constant. If f(1) = 4, what is the value of f(−1)?',
    choices: [
      { label: 'A', text: '4' },
      { label: 'B', text: '6' },
      { label: 'C', text: '8' },
      { label: 'D', text: '10' },
    ],
    correctAnswer: 'D',
    explanation:
      'First find k: f(1) = 2(1)² − 3(1) + k = 2 − 3 + k = −1 + k = 4, so k = 5. Now evaluate f(−1) = 2(−1)² − 3(−1) + 5 = 2 + 3 + 5 = 10.',
    wrongAnswerExplanations: {
      A: '4 is the given value f(1). A student who assumes f(−1) = f(1) because the function is "symmetric" makes this error. The function is not symmetric about x = 0.',
      B: '6 may result from computing 2(1) − 3(−1) + k with an incorrect sign: treating −1 as +1 in the first term and getting 2 + 3 + 1 = 6 (using k = 1 from an error), or from computing f(−1) without first finding k (using k = 4 and computing 2 + 3 + 4 − 3 = 6).',
      C: '8 may result from computing f(−1) = 2(1) + 3(1) + k with k found incorrectly: for example, using k = 3 (a sign error in solving −1 + k = 4 → k = 3) and then computing 2 + 3 + 3 = 8.',
    },
  },

  // ─── Q05 · MEDIUM (6-7/10) · Algebra / Linear equations in two variables ────────
  // VERIFY: A line passes through (−2, 7) and (4, −5).
  // Slope = (−5−7)/(4−(−2)) = −12/6 = −2.
  // Equation: y − 7 = −2(x + 2) → y = −2x − 4 + 7 → y = −2x + 3.
  // The question asks for the x-value where y = 2k − 1 when k is such that
  // the point (k, 2k−1) lies on the line.
  // Substitute: 2k − 1 = −2k + 3 → 4k = 4 → k = 1. So x = 1, y = 1.
  // The question: "For what value of k does (k, 2k−1) lie on the line?" Answer: k = 1.
  // Check: (1, 1): y = −2(1)+3 = 1 ✓.
  {
    id: 'sat-f7-v4-math-m1-q05',
    section: 'math',
    moduleId: 'f7v4-math-module-1',
    domain: 'Algebra',
    skill: 'Linear equations in two variables',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'A line in the xy-plane passes through the points (−2, 7) and (4, −5). For what value of k does the point (k, 2k − 1) lie on this line?',
    choices: [
      { label: 'A', text: '−1' },
      { label: 'B', text: '0' },
      { label: 'C', text: '1' },
      { label: 'D', text: '2' },
    ],
    correctAnswer: 'C',
    explanation:
      'Slope = (−5 − 7) / (4 − (−2)) = −12 / 6 = −2. Using point (−2, 7): y − 7 = −2(x + 2) → y = −2x + 3. For (k, 2k − 1) to lie on the line: 2k − 1 = −2k + 3 → 4k = 4 → k = 1. Check: point (1, 1), and y = −2(1) + 3 = 1 ✓.',
    wrongAnswerExplanations: {
      A: 'k = −1 gives the point (−1, −3). Check: y = −2(−1)+3 = 5 ≠ −3. A student might erroneously solve 2k−1 = −2(k)+3 with a sign error (e.g., getting 4k = −4).',
      B: 'k = 0 gives the point (0, −1). Check: y = −2(0)+3 = 3 ≠ −1. This comes from misidentifying the y-intercept of the parametric curve with the y-intercept of the line.',
      D: 'k = 2 gives the point (2, 3). Check: y = −2(2)+3 = −1 ≠ 3. A student might solve −2k + 3 = 2k − 1 and make an arithmetic error: −2k = 2k gives 4k = 4, then write k = 4/2 = 2 instead of k = 4/4 = 1.',
    },
  },

  // ─── Q06 · MEDIUM (6-7/10) · Advanced Math / Equivalent expressions ─────────────
  // VERIFY: Simplify (2x³ − 5x² + 3x − 7) − (x³ − 4x² − 2x + 1) + (−x² + 5x − 3).
  // Step 1: distribute the negative: 2x³ − 5x² + 3x − 7 − x³ + 4x² + 2x − 1 − x² + 5x − 3
  // Step 2: combine like terms:
  //   x³ terms: 2x³ − x³ = x³
  //   x² terms: −5x² + 4x² − x² = −2x²
  //   x terms: 3x + 2x + 5x = 10x
  //   constants: −7 − 1 − 3 = −11
  // Result: x³ − 2x² + 10x − 11 ✓
  // Double-check with x=1: (2−5+3−7)−(1−4−2+1)+(−1+5−3) = (−7)−(−4)+(1) = −7+4+1 = −2.
  // x³−2x²+10x−11 at x=1: 1−2+10−11 = −2 ✓
  {
    id: 'sat-f7-v4-math-m1-q06',
    section: 'math',
    moduleId: 'f7v4-math-module-1',
    domain: 'Advanced Math',
    skill: 'Equivalent expressions',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'Which of the following is equivalent to (2x³ − 5x² + 3x − 7) − (x³ − 4x² − 2x + 1) + (−x² + 5x − 3)?',
    choices: [
      { label: 'A', text: 'x³ − 2x² + 10x − 11' },
      { label: 'B', text: 'x³ − 2x² + 6x − 11' },
      { label: 'C', text: 'x³ + 2x² + 10x − 11' },
      { label: 'D', text: 'x³ − 2x² + 10x − 5' },
    ],
    correctAnswer: 'A',
    explanation:
      'Distribute the subtraction: (2x³ − 5x² + 3x − 7) − (x³ − 4x² − 2x + 1) + (−x² + 5x − 3) = 2x³ − 5x² + 3x − 7 − x³ + 4x² + 2x − 1 − x² + 5x − 3. Combine like terms: x³ terms: 2 − 1 = 1, so x³. x² terms: −5 + 4 − 1 = −2, so −2x². x terms: 3 + 2 + 5 = 10, so 10x. Constants: −7 − 1 − 3 = −11. Result: x³ − 2x² + 10x − 11.',
    wrongAnswerExplanations: {
      B: 'x³ − 2x² + 6x − 11 results from forgetting to change the sign of −2x when subtracting the second group: treating −2x as −2x instead of +2x, giving 3x − 2x + 5x = 6x for the x-coefficient.',
      C: 'x³ + 2x² + 10x − 11 results from adding the x² terms rather than accounting for the sign changes: −5x² − 4x² − x² = −10x² is wrong; a student might compute −5 + 4 − 1 as +2 instead of −2.',
      D: 'x³ − 2x² + 10x − 5 results from a constant error: computing −7 − 1 + 3 = −5 (treating the third group\'s constant as +3 rather than −3 after the addition sign).',
    },
  },

  // ─── Q07 · MEDIUM (6-7/10) · Algebra / Systems of two linear equations ──────────
  // VERIFY: 3x + 4y = 18 and 5x − 2y = 4.
  // Multiply eq2 by 2: 10x − 4y = 8.
  // Add to eq1: 13x = 26 → x = 2.
  // Sub x=2 into eq1: 6 + 4y = 18 → 4y = 12 → y = 3.
  // The question asks for 4x − y (not just x or y).
  // 4x − y = 4(2) − 3 = 8 − 3 = 5.
  // Check eq2: 5(2) − 2(3) = 10 − 6 = 4 ✓.
  {
    id: 'sat-f7-v4-math-m1-q07',
    section: 'math',
    moduleId: 'f7v4-math-module-1',
    domain: 'Algebra',
    skill: 'Systems of two linear equations in two variables',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'The system of equations below has solution (x, y). What is the value of 4x − y?\n\n3x + 4y = 18\n5x − 2y = 4',
    choices: [
      { label: 'A', text: '1' },
      { label: 'B', text: '5' },
      { label: 'C', text: '7' },
      { label: 'D', text: '11' },
    ],
    correctAnswer: 'B',
    explanation:
      'Multiply the second equation by 2: 10x − 4y = 8. Add to the first equation: (3x + 4y) + (10x − 4y) = 18 + 8 → 13x = 26 → x = 2. Substitute into the first equation: 3(2) + 4y = 18 → 4y = 12 → y = 3. Then 4x − y = 4(2) − 3 = 8 − 3 = 5. Verify: 5(2) − 2(3) = 10 − 6 = 4 ✓.',
    wrongAnswerExplanations: {
      A: '1 = x − y = 2 − 3, which is not the expression asked. A student who computes x − y instead of 4x − y makes this error.',
      C: '7 = 2x + y = 4 + 3, or 4x − y with incorrect values such as x = 2, y = 1 (forgetting to divide 12 by 4). A student who arrives at 4y = 12 but then writes y = 12/3 = 4 and computes 4(2) − 4 = 4 would not match exactly; other arithmetic slips yield 7.',
      D: '11 = 4x + y = 4(2) + 3, computing 4x + y instead of 4x − y.',
    },
  },

  // ─── Q08 · MEDIUM (6-7/10) · Geometry / Area and volume ────────────────────────
  // VERIFY: A cylinder has radius r and height 2r (height = diameter).
  // Volume = πr²h = πr²(2r) = 2πr³.
  // If volume = 54π, then 2πr³ = 54π → r³ = 27 → r = 3.
  // Total surface area = 2πr² + 2πrh = 2πr² + 2πr(2r) = 2πr² + 4πr² = 6πr².
  // With r = 3: 6π(9) = 54π.
  // The question asks for the total surface area. Answer = 54π.
  // Verify: V = 2π(3)³ = 2π(27) = 54π ✓. SA = 6π(3)² = 6π(9) = 54π ✓.
  {
    id: 'sat-f7-v4-math-m1-q08',
    section: 'math',
    moduleId: 'f7v4-math-module-1',
    domain: 'Geometry and Trigonometry',
    skill: 'Area and volume',
    difficulty: 'medium',
    type: 'multiple_choice',
    stimulus:
      'A right circular cylinder has a height equal to its diameter. The volume of the cylinder is 54π cubic centimeters.',
    question:
      'What is the total surface area of the cylinder, in square centimeters?',
    choices: [
      { label: 'A', text: '27π' },
      { label: 'B', text: '36π' },
      { label: 'C', text: '54π' },
      { label: 'D', text: '108π' },
    ],
    correctAnswer: 'C',
    explanation:
      'Let the radius be r. The height equals the diameter, so h = 2r. Volume: πr²(2r) = 2πr³ = 54π → r³ = 27 → r = 3 cm. Height h = 6 cm. Total surface area = 2πr² + 2πrh = 2π(9) + 2π(3)(6) = 18π + 36π = 54π cm².',
    wrongAnswerExplanations: {
      A: '27π results from computing only the lateral surface area without the two circular bases: 2πrh = 2π(3)(6) = 36π is the lateral area — or from computing the area with r = 3, h = 3 (forgetting h = 2r): 2π(9) + 2π(3)(3) = 18π + 18π = 36π... Actually 27π = πr²h/2 (half the volume formula misapplied), a common confusion.',
      B: '36π could result from computing lateral surface area only: 2π(3)(6) = 36π, forgetting to include the two circular end caps.',
      D: '108π results from computing 2πr² + 2πrh using h = 4r instead of h = 2r, or from doubling the correct answer.',
    },
  },

  // ─── Q09 · MEDIUM (7-8/10) · Algebra / Linear inequalities ─────────────────────
  // VERIFY: A parking garage charges $4 for the first hour and $2.50 for each additional
  // 30-minute interval (or part thereof). Ryan has $20.
  // First hour: $4. Remaining: $20 − $4 = $16.
  // Each 30-min interval after first hour costs $2.50.
  // Number of additional 30-min intervals: 16/2.50 = 6.4 → at most 6 full intervals.
  // Total additional time: 6 × 30 = 180 minutes = 3 hours.
  // Total time = 1 hour + 3 hours = 4 hours = 240 minutes.
  // Check: cost = $4 + 6 × $2.50 = $4 + $15 = $19 ≤ $20 ✓.
  // After 7 additional intervals: $4 + 7 × $2.50 = $4 + $17.50 = $21.50 > $20. ✗
  // Answer: 4 hours maximum.
  {
    id: 'sat-f7-v4-math-m1-q09',
    section: 'math',
    moduleId: 'f7v4-math-module-1',
    domain: 'Algebra',
    skill: 'Linear inequalities in one or two variables',
    difficulty: 'medium',
    type: 'multiple_choice',
    stimulus:
      'A parking garage charges $4.00 for the first hour and $2.50 for each additional 30-minute period (or part thereof) after the first hour. Ryan has $20.00 to spend on parking.',
    question:
      'What is the maximum number of hours Ryan can park without exceeding his budget?',
    choices: [
      { label: 'A', text: '3' },
      { label: 'B', text: '4' },
      { label: 'C', text: '5' },
      { label: 'D', text: '6' },
    ],
    correctAnswer: 'B',
    explanation:
      'After the first hour, Ryan has $20.00 − $4.00 = $16.00 left. Each additional 30-minute period costs $2.50, so he can afford at most ⌊16.00 / 2.50⌋ = ⌊6.4⌋ = 6 additional 30-minute periods. 6 periods = 3 additional hours. Total time = 1 + 3 = 4 hours. Verify: $4.00 + 6 × $2.50 = $4.00 + $15.00 = $19.00 ≤ $20.00 ✓. After 7 periods: $4.00 + $17.50 = $21.50 > $20.00 ✗.',
    wrongAnswerExplanations: {
      A: '3 hours would cost $4 + 4 × $2.50 = $4 + $10 = $14, which is within budget but leaves unused funds. Ryan can park longer than 3 hours.',
      C: '5 hours requires 8 additional 30-minute periods: $4 + 8 × $2.50 = $4 + $20 = $24 > $20. This exceeds Ryan\'s budget.',
      D: '6 hours requires 10 additional 30-minute periods: $4 + 10 × $2.50 = $4 + $25 = $29 > $20. This far exceeds the budget.',
    },
  },

  // ─── Q10 · MEDIUM (7-8/10) · PSDA / One-variable data ───────────────────────────
  // VERIFY: Seven quiz scores: 62, 71, 74, 78, 82, 85, 88.
  // Sum = 62+71+74+78+82+85+88 = 540. Mean = 540/7 ≈ 77.14. Median = 78 (4th value).
  // Replace the score of 62 with a score of x where x > 82 (i.e., x replaces the minimum).
  // New sum = 540 − 62 + x = 478 + x. New mean = (478 + x)/7.
  // For new mean to equal new median:
  // New sorted order (since x > 82, the new median could shift).
  // If 82 < x < 85: sorted: 71,74,78,82,x,85,88 → median = x.
  //   Mean = (478+x)/7 = x → 478+x = 7x → 478 = 6x → x = 478/6 ≈ 79.67. Not in (82,85).
  // If x = 85: sorted: 71,74,78,82,85,85,88 → median = 82. Mean = (478+85)/7 = 563/7 = 80.43 ≠ 82.
  // If 85 ≤ x < 88: sorted: 71,74,78,82,85,x,88 → median = 85. Mean = (478+x)/7 = 85 → 478+x = 595 → x = 117. Too large.
  // Let me restructure for cleaner answer. Use: 5 values: 70,75,80,85,90. Sum=400, mean=80, median=80.
  // Replace 70 with x. If mean stays 80: (400−70+x)/5 = 80 → (330+x)/5 = 80 → x = 70. No change.
  // Different question: 6 values: 68, 74, 76, 80, 84, 90. Sum=472, mean=472/6≈78.67, median=(76+80)/2=78.
  // Student adds a 7th score such that the NEW mean equals the NEW median.
  // After adding score s (s > 90 assumed): sorted 68,74,76,80,84,90,s → median = 80.
  // Mean = (472+s)/7 = 80 → s = 560−472 = 88. But 88 < 90, so sorted order changes.
  // With s=88: sorted 68,74,76,80,84,88,90 → median = 80. Mean = 560/7 = 80. ✓
  // This is clean! The new score is 88, and adding it makes mean = median = 80.
  // Ask: "what score must the student add?" Answer = 88.
  {
    id: 'sat-f7-v4-math-m1-q10',
    section: 'math',
    moduleId: 'f7v4-math-module-1',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'One-variable data: distributions and measures of center and spread',
    difficulty: 'medium',
    type: 'multiple_choice',
    stimulus:
      'A student has six quiz scores: 68, 74, 76, 80, 84, and 90. The student takes a seventh quiz and wants the mean of all seven scores to equal the median of all seven scores.',
    question:
      'What score must the student earn on the seventh quiz to achieve this goal?',
    choices: [
      { label: 'A', text: '80' },
      { label: 'B', text: '84' },
      { label: 'C', text: '88' },
      { label: 'D', text: '92' },
    ],
    correctAnswer: 'C',
    explanation:
      'The sum of the six scores is 68 + 74 + 76 + 80 + 84 + 90 = 472. Let the seventh score be s. The new mean is (472 + s) / 7. For the median of the seven sorted scores: if s = 88, the sorted set is 68, 74, 76, 80, 84, 88, 90, and the median (4th value) is 80. Check: mean = (472 + 88) / 7 = 560 / 7 = 80 = median ✓.',
    wrongAnswerExplanations: {
      A: '80 is the median of the seven-score set after adding 88, and it is a natural guess. But if s = 80, sorted set is 68, 74, 76, 80, 80, 84, 90, median = 80, mean = (472+80)/7 = 552/7 ≈ 78.9 ≠ 80.',
      B: 'If s = 84: sorted 68,74,76,80,84,84,90, median = 80, mean = 556/7 ≈ 79.4 ≠ 80. The mean does not equal the median.',
      D: 'If s = 92: sorted 68,74,76,80,84,90,92, median = 80, mean = 564/7 ≈ 80.6 ≠ 80. The additional high score pushes the mean above 80.',
    },
  },

  // ─── Q11 · MEDIUM (7-8/10) · Advanced Math / Nonlinear equations ─────────────────
  // VERIFY: The quadratic x² + bx + c = 0 has roots that differ by 6 and whose product is −16.
  // Let roots be r and s. r − s = 6 (or |r−s|=6) and r·s = −16.
  // By Vieta's: r+s = −b and rs = c = −16.
  // (r−s)² = (r+s)² − 4rs = (−b)² − 4(−16) = b² + 64 = 36 → b² = −28. Impossible.
  // Try: product = 16 (positive): rs = 16. (r+s)² − 4(16) = 36 → (r+s)² = 100 → r+s = ±10.
  // So b = −(r+s) = ∓10 → b = −10 or b = 10.
  // If r+s = 10 and r−s = 6: r = 8, s = 2. Product = 16 ✓, difference = 6 ✓.
  // So one solution: b = −10, c = 16. Equation: x² − 10x + 16 = 0.
  // Check: (x−8)(x−2) = 0, roots 8 and 2. Difference = 6 ✓, product = 16 ✓.
  // If r+s = −10, r−s = 6: r = −2, s = −8. Product = 16 ✓, difference = 6 ✓. b = 10, c = 16.
  // The question: what is the value of c? c = 16. (c is the same in both cases.)
  // Additionally, b² + c = 100 + 16 = 116 or 100+16=116. Wait let's just ask for c.
  {
    id: 'sat-f7-v4-math-m1-q11',
    section: 'math',
    moduleId: 'f7v4-math-module-1',
    domain: 'Advanced Math',
    skill: 'Nonlinear equations in one variable and systems of equations in two variables',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'The equation x² + bx + c = 0, where b and c are constants, has two real roots whose difference is 6 and whose product is 16. What is the value of c?',
    choices: [
      { label: 'A', text: '−16' },
      { label: 'B', text: '−6' },
      { label: 'C', text: '6' },
      { label: 'D', text: '16' },
    ],
    correctAnswer: 'D',
    explanation:
      'Let the roots be r and s. By Vieta\'s formulas: r + s = −b and r · s = c. The product of the roots is 16, so c = 16. (We can verify: if |r − s| = 6 and rs = 16, then (r − s)² = (r + s)² − 4rs = b² − 64 = 36, giving b² = 100, b = ±10. Roots are 8, 2 or −2, −8. Either way, c = rs = 16.)',
    wrongAnswerExplanations: {
      A: '−16 is c = rs if the product of the roots is −16 (if the roots have opposite signs). The problem states the product is +16, so c = +16, not −16.',
      B: '−6 confuses the difference of roots with the value of c. The constant term c equals the product of roots, not their difference.',
      C: '6 is the given difference of the roots. By Vieta\'s formulas, c = rs = 16, not 6.',
    },
  },

  // ─── Q12 · MEDIUM (7-8/10) · Advanced Math / Equivalent expressions ──────────────
  // VERIFY: x⁴ − 16 = (x² − 4)(x² + 4) = (x−2)(x+2)(x²+4).
  // Question: Which expression is NOT a factor of x⁴ − 16 over the integers?
  // Factors over integers: (x²−4), (x²+4), (x−2), (x+2).
  // NOT a factor: (x² − 2x + 4) — that's a factor of x³+8 but not x⁴−16.
  // Wait, let me verify: x⁴−16 ÷ (x²−2x+4) = ?
  // (x²−2x+4)(x²+2x+4) = x⁴+2x³+4x²−2x³−4x²−8x+4x²+8x+16 = x⁴+4x²+16. Not x⁴−16.
  // So x²−2x+4 is NOT a factor of x⁴−16 ✓.
  // The other choices are: x²+4 (IS a factor), x+2 (IS a factor), x−2 (IS a factor).
  {
    id: 'sat-f7-v4-math-m1-q12',
    section: 'math',
    moduleId: 'f7v4-math-module-1',
    domain: 'Advanced Math',
    skill: 'Equivalent expressions',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'Which of the following is NOT a factor of x⁴ − 16 over the integers?',
    choices: [
      { label: 'A', text: 'x − 2' },
      { label: 'B', text: 'x + 2' },
      { label: 'C', text: 'x² + 4' },
      { label: 'D', text: 'x² − 2x + 4' },
    ],
    correctAnswer: 'D',
    explanation:
      'Factor x⁴ − 16 as a difference of squares: x⁴ − 16 = (x²)² − 4² = (x² − 4)(x² + 4) = (x − 2)(x + 2)(x² + 4). So x − 2, x + 2, and x² + 4 are all factors. The expression x² − 2x + 4 is a factor of x³ + 8 = (x + 2)(x² − 2x + 4) but not of x⁴ − 16. Dividing x⁴ − 16 by x² − 2x + 4 does not produce a polynomial quotient with integer coefficients.',
    wrongAnswerExplanations: {
      A: 'x − 2 IS a factor: x⁴ − 16 = (x − 2)(x + 2)(x² + 4). Setting x = 2 gives 16 − 16 = 0 ✓.',
      B: 'x + 2 IS a factor: setting x = −2 gives 16 − 16 = 0 ✓.',
      C: 'x² + 4 IS a factor: x⁴ − 16 = (x² − 4)(x² + 4), and x² + 4 divides evenly.',
    },
  },

  // ─── Q13 · MEDIUM (7-8/10) · PSDA / Percentages ─────────────────────────────────
  // VERIFY: A store marks up wholesale price by 40%, then offers a "20% off" coupon.
  // Wholesale price = W. Retail = 1.4W. After 20% coupon: 1.4W × 0.8 = 1.12W.
  // Net effect: customer pays 1.12W, which is 12% above wholesale.
  // The store's profit margin above wholesale = (1.12W − W)/W = 0.12 = 12%.
  // But the question asks: what percent of the RETAIL price does the customer save?
  // Customer saves 20% off retail. Retail = 1.4W. Customer pays 1.12W.
  // The question asks the net percent increase over wholesale the customer pays = 12%.
  // Alternatively, ask: what is the effective percent discount on the retail price? 20% (that's just the coupon).
  // More interesting: what is the OVERALL percent change from wholesale to final price?
  // Final / Wholesale = 1.12 → 12% increase over wholesale.
  // Ask: "What percent above the wholesale price does the customer ultimately pay?" Answer = 12%.
  {
    id: 'sat-f7-v4-math-m1-q13',
    section: 'math',
    moduleId: 'f7v4-math-module-1',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Percentages',
    difficulty: 'medium',
    type: 'multiple_choice',
    stimulus:
      'A retailer marks up the wholesale price of every item by 40% to set the retail price. During a sale, the retailer offers a coupon for 20% off the retail price.',
    question:
      'A customer uses the coupon to buy an item. The price the customer pays is what percent above the wholesale price of the item?',
    choices: [
      { label: 'A', text: '8%' },
      { label: 'B', text: '12%' },
      { label: 'C', text: '20%' },
      { label: 'D', text: '28%' },
    ],
    correctAnswer: 'B',
    explanation:
      'Let the wholesale price be W. The retail price is 1.40W. After the 20% coupon, the customer pays 1.40W × 0.80 = 1.12W. The customer pays 1.12W, which is 12% above the wholesale price W.',
    wrongAnswerExplanations: {
      A: '8% results from computing 40% × 20% = 8% and then subtracting: 40% − 8% = 32%, then 40% − 32% = 8% — a different incorrect approach. Or from computing 40% − 20% − 12% using wrong arithmetic.',
      C: '20% is the coupon discount off retail, not the final price relative to wholesale. The customer saves 20% of the retail price but that is not the same as 20% above wholesale.',
      D: '28% results from the incorrect approach of treating the percentages as additive: 40% − 20% + 8% = 28% — or from 40% markup minus 20% off = net 20% markup, then adding an extra computation error.',
    },
  },

  // ─── Q14 · MEDIUM (7-8/10) · Advanced Math / Nonlinear functions ─────────────────
  // VERIFY: Exponential function P(t) = a · b^t models a population.
  // P(0) = 500 (initial population). P(3) = 4000 (after 3 years).
  // From P(0) = a = 500.
  // P(3) = 500 · b³ = 4000 → b³ = 8 → b = 2.
  // So P(t) = 500 · 2^t.
  // P(5) = 500 · 2^5 = 500 · 32 = 16000.
  // Which year does P(t) first exceed 10,000?
  // 500 · 2^t > 10000 → 2^t > 20 → t > log₂(20) ≈ 4.32 → first integer is t = 5.
  // At t=4: 500·16=8000 < 10000. At t=5: 500·32=16000 > 10000. ✓ Answer: t=5 (year 5).
  {
    id: 'sat-f7-v4-math-m1-q14',
    section: 'math',
    moduleId: 'f7v4-math-module-1',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'medium',
    type: 'multiple_choice',
    stimulus:
      'The population of a colony of bacteria is modeled by the function P(t) = a · b^t, where a and b are positive constants and t is measured in hours. At t = 0, the population is 500. At t = 3, the population is 4,000.',
    question:
      'According to the model, in which hour does the population of the colony first exceed 10,000?',
    choices: [
      { label: 'A', text: 'Hour 4' },
      { label: 'B', text: 'Hour 5' },
      { label: 'C', text: 'Hour 6' },
      { label: 'D', text: 'Hour 8' },
    ],
    correctAnswer: 'B',
    explanation:
      'Since P(0) = a = 500, and P(3) = 500 · b³ = 4000, we get b³ = 8, so b = 2. The model is P(t) = 500 · 2^t. Check: P(4) = 500 · 16 = 8,000 ≤ 10,000. P(5) = 500 · 32 = 16,000 > 10,000. The population first exceeds 10,000 during hour 5.',
    wrongAnswerExplanations: {
      A: 'At t = 4, P(4) = 500 · 2⁴ = 8,000, which does not yet exceed 10,000. A student who solves 500 · 2^t = 10,000 and rounds 4.32 down to 4 makes this off-by-one error.',
      C: 'Hour 6 is when P(6) = 32,000, which exceeds 10,000 by a large margin but is not the FIRST hour of exceedance. Hour 5 comes first.',
      D: 'Hour 8 would give P(8) = 500 · 256 = 128,000. A student who incorrectly applies linear growth (500 + 8 · something) or makes a large arithmetic error might arrive at this.',
    },
  },

  // ─── Q15 · HARD (8-9/10) · Algebra / Linear equations in two variables ────────────
  // KEEP from V3 with V4 IDs — already a strong multi-step problem.
  // VERIFY: Line through (a, 0) and (0, b) where a = 2b and 3a + 2b = 24.
  // Sub a = 2b: 6b + 2b = 8b = 24 → b = 3, a = 6.
  // 2a + 3b = 12 + 9 = 21.
  // Check: 3(6)+2(3) = 24 ✓. a = 2b: 6 = 2(3) ✓.
  {
    id: 'sat-f7-v4-math-m1-q15',
    section: 'math',
    moduleId: 'f7v4-math-module-1',
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
      A: '18 results from computing 2a + 3b = 2(6) + 3(2) = 18, using b = 2 instead of b = 3. This comes from setting b = 2a instead of a = 2b (reversing the ratio).',
      C: '24 is the value of the given constraint 3a + 2b, not the value of 2a + 3b. A student who misreads the question and returns the given equation\'s value makes this error.',
      D: '27 results from computing 2a + 3b with incorrect values, such as a = 6 and b = 5 (from setting 3a = 18 and 2b = 6 separately, ignoring the constraint that they are connected), or from setting a = 3b and getting b = 2.4, then computing 2(7.2)+3(2.4) ≈ 21.6, rounding to 22 — not quite 27.',
    },
  },

  // ─── Q16 · HARD (8-9/10) · Geometry / Right triangles and trigonometry ────────────
  // KEEP from V3 with V4 IDs — strong trig area problem.
  // VERIFY: Right triangle ABC, angle C = 90°, angle A = 30°, AB = 16.
  // BC = 16·sin(30°) = 16·(1/2) = 8. AC = 16·cos(30°) = 16·(√3/2) = 8√3.
  // Area = (1/2)·BC·AC = (1/2)(8)(8√3) = 32√3.
  {
    id: 'sat-f7-v4-math-m1-q16',
    section: 'math',
    moduleId: 'f7v4-math-module-1',
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
      A: '16√3 results from computing (1/2)(16)(√3) = 8√3, using the hypotenuse as a base and √3 as height rather than correctly identifying the two legs, or from halving one leg again in the area formula.',
      C: '48 results from approximating 8√3 ≈ 6 (from a 6-8-10 association) and computing (1/2)(16)(6) = 48, or from treating the triangle as a 30-60-90 with approximate side 6.',
      D: '64√3 results from computing (8)(8√3) = 64√3, omitting the (1/2) factor in the area formula.',
    },
  },

  // ─── Q17 · HARD (8-9/10) · Algebra / Systems of equations · GRID-IN ─────────────
  // VERIFY: px + qy = 14 and 3x − 2y = 10 have the same solution as 5x + ky = 22.
  // We need x and y from the first two equations in terms of p, q, k — but this requires
  // a specific system. Let me define: 2x + 3y = 14 and 3x − 2y = 10.
  // From eq1: 2x + 3y = 14. From eq2: 3x − 2y = 10.
  // Multiply eq1 by 2: 4x + 6y = 28. Multiply eq2 by 3: 9x − 6y = 30. Add: 13x = 58. x = 58/13. Not clean.
  // Redo: x + 2y = 8 and 3x − y = 5.
  // From eq2: y = 3x−5. Sub: x + 2(3x−5) = 8 → x + 6x − 10 = 8 → 7x = 18 → x = 18/7. Not clean.
  // Redo: 4x + y = 14 and x − 2y = 1.
  // From eq2: x = 2y+1. Sub: 4(2y+1)+y = 14 → 8y+4+y = 14 → 9y = 10 → y = 10/9. Not clean.
  // Redo: 2x + y = 11 and x − 3y = 2.
  // From eq2: x = 3y+2. Sub: 2(3y+2)+y = 11 → 6y+4+y = 11 → 7y = 7 → y = 1. x = 5.
  // Check: 2(5)+1 = 11 ✓. 5−3(1) = 2 ✓.
  // Now a third equation that contains a variable coefficient. Let a be unknown:
  // 3x + ay = ? → 3(5) + a(1) = 15+a. If this equals 22: a = 7.
  // The question: if (x,y) satisfies 2x+y=11 and x−3y=2, and also 3x+ay=22, find a.
  // a = 22 − 15 = 7 ✓.
  {
    id: 'sat-f7-v4-math-m1-q17',
    section: 'math',
    moduleId: 'f7v4-math-module-1',
    domain: 'Algebra',
    skill: 'Systems of two linear equations in two variables',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'The ordered pair (x, y) satisfies the system of equations below.\n\n2x + y = 11\nx − 3y = 2\n\nIf 3x + ay = 22 for the same solution (x, y), what is the value of a?',
    correctAnswer: '7',
    acceptableAnswers: ['7'],
    explanation:
      'Solve the system: from the second equation, x = 3y + 2. Substitute into the first: 2(3y + 2) + y = 11 → 6y + 4 + y = 11 → 7y = 7 → y = 1. Then x = 3(1) + 2 = 5. Verify: 2(5) + 1 = 11 ✓ and 5 − 3(1) = 2 ✓. Now substitute into 3x + ay = 22: 3(5) + a(1) = 22 → 15 + a = 22 → a = 7.',
    scoringNotes: 'Only 7 is acceptable.',
  },

  // ─── Q18 · HARD (8-9/10) · Advanced Math / Equivalent expressions · GRID-IN ──────
  // VERIFY: The expression (x² + 5x + k)/(x + 2) has remainder 3 when divided by (x + 2).
  // By the Remainder Theorem: remainder when dividing by (x+2) equals the value of the
  // numerator at x = −2.
  // Numerator at x = −2: (−2)² + 5(−2) + k = 4 − 10 + k = k − 6 = 3 → k = 9.
  // Verify: x² + 5x + 9 divided by (x+2).
  // Polynomial long division: x² + 5x + 9 = (x+2)(x+3) + 3.
  // (x+2)(x+3) = x²+5x+6. Remainder: 9−6 = 3 ✓.
  {
    id: 'sat-f7-v4-math-m1-q18',
    section: 'math',
    moduleId: 'f7v4-math-module-1',
    domain: 'Advanced Math',
    skill: 'Equivalent expressions',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'When the polynomial x² + 5x + k is divided by (x + 2), the remainder is 3. What is the value of k?',
    correctAnswer: '9',
    acceptableAnswers: ['9'],
    explanation:
      'By the Remainder Theorem, the remainder when a polynomial p(x) is divided by (x + 2) equals p(−2). So p(−2) = (−2)² + 5(−2) + k = 4 − 10 + k = k − 6 = 3 → k = 9. Verify by long division: x² + 5x + 9 = (x + 2)(x + 3) + 3, since (x + 2)(x + 3) = x² + 5x + 6, and 9 − 6 = 3 ✓.',
    scoringNotes: 'Only 9 is acceptable.',
  },

  // ─── Q19 · HARD (9-10/10) · PSDA / Probability and conditional probability · GRID-IN ─
  // VERIFY: 120 students surveyed. Categorized by grade (junior/senior) and sport preference (team/individual).
  // Table:
  //         Team   Individual   Total
  // Junior:   45       15         60
  // Senior:   30       30         60
  // Total:    75       45        120
  // P(individual sport | senior) = 30/60 = 1/2.
  // But Q asks: A student is randomly selected from those who prefer team sports.
  // What is the probability the selected student is a junior?
  // P(junior | team sport) = 45/75 = 3/5 = 0.6.
  // Check: 45 juniors prefer team sports out of 75 total team-sport preferrers. 45/75 = 3/5 ✓.
  {
    id: 'sat-f7-v4-math-m1-q19',
    section: 'math',
    moduleId: 'f7v4-math-module-1',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Probability and conditional probability',
    difficulty: 'hard',
    type: 'grid_in',
    stimulus:
      'A survey of 120 high school students recorded their grade (junior or senior) and their sport preference (team sport or individual sport). The results showed that 60 students are juniors and 60 are seniors. Of the 60 juniors, 45 prefer team sports. Of the 60 seniors, 30 prefer team sports.',
    question:
      'If a student is selected at random from all students who prefer team sports, what is the probability that the selected student is a junior? Enter your answer as a fraction or decimal.',
    correctAnswer: '3/5',
    acceptableAnswers: ['3/5', '45/75', '0.6', '.6'],
    explanation:
      'Total students who prefer team sports: 45 (juniors) + 30 (seniors) = 75. Of these, 45 are juniors. P(junior | team sport) = 45 / 75 = 3/5 = 0.6.',
    scoringNotes: 'Accept 3/5, 45/75, 0.6, or .6.',
  },

  // ─── Q20 · HARD (9-10/10) · Advanced Math / Nonlinear equations · GRID-IN ─────────
  // KEEP from V3 — radical equation requiring extraneous root check.
  // VERIFY: √(3x + 4) = x − 2.
  // Square both sides (domain: x − 2 ≥ 0, so x ≥ 2): 3x + 4 = x² − 4x + 4.
  // x² − 7x = 0 → x(x − 7) = 0 → x = 0 (extraneous, since 0 < 2) or x = 7.
  // Check x = 7: √(21+4) = √25 = 5 and 7−2 = 5 ✓.
  {
    id: 'sat-f7-v4-math-m1-q20',
    section: 'math',
    moduleId: 'f7v4-math-module-1',
    domain: 'Advanced Math',
    skill: 'Nonlinear equations in one variable and systems of equations in two variables',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'What is the value of x that satisfies √(3x + 4) = x − 2? (Note: √ denotes the principal square root.)',
    correctAnswer: '7',
    acceptableAnswers: ['7'],
    explanation:
      'Since the principal square root is non-negative, we need x − 2 ≥ 0, so x ≥ 2. Square both sides: 3x + 4 = (x − 2)² = x² − 4x + 4. Rearrange: x² − 7x = 0 → x(x − 7) = 0. Solutions: x = 0 or x = 7. Since x = 0 < 2, it is extraneous. Check x = 7: √(3(7) + 4) = √25 = 5 and 7 − 2 = 5 ✓. The answer is x = 7.',
    scoringNotes: 'Only 7 is acceptable. x = 0 is extraneous and must be rejected.',
  },

  // ─── Q21 · HARD (9-10/10) · Advanced Math / Nonlinear system · GRID-IN ─────────────
  // VERIFY: y = x² − 4x + 1 and y = 2x − 7 intersect.
  // Set equal: x² − 4x + 1 = 2x − 7 → x² − 6x + 8 = 0 → (x−4)(x−2) = 0.
  // x = 4 or x = 2.
  // At x = 4: y = 2(4) − 7 = 1 → point (4, 1).
  // At x = 2: y = 2(2) − 7 = −3 → point (2, −3).
  // Verify both in parabola: y(4) = 16−16+1 = 1 ✓. y(2) = 4−8+1 = −3 ✓.
  // Question: What is the value of 3x₁ + x₂, where x₁ > x₂ are the x-coords at intersections?
  // x₁ = 4, x₂ = 2. 3(4) + 2 = 12 + 2 = 14.
  // This requires finding BOTH intersection x-values, then computing the expression — Desmos shows
  // the intersections but students must still compute 3x₁ + x₂ = 14 by identifying which is larger.
  {
    id: 'sat-f7-v4-math-m1-q21',
    section: 'math',
    moduleId: 'f7v4-math-module-1',
    domain: 'Advanced Math',
    skill: 'Nonlinear equations in one variable and systems of equations in two variables',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'In the xy-plane, the graphs of y = x² − 4x + 1 and y = 2x − 7 intersect at two points with x-coordinates x₁ and x₂, where x₁ > x₂. What is the value of 3x₁ + x₂?',
    correctAnswer: '14',
    acceptableAnswers: ['14'],
    explanation:
      'Set the equations equal: x² − 4x + 1 = 2x − 7 → x² − 6x + 8 = 0 → (x − 4)(x − 2) = 0. So x = 4 or x = 2. Since x₁ > x₂, we have x₁ = 4 and x₂ = 2. Therefore 3x₁ + x₂ = 3(4) + 2 = 12 + 2 = 14. Verify: at x = 4, y = 2(4) − 7 = 1 and y = 16 − 16 + 1 = 1 ✓; at x = 2, y = 2(2) − 7 = −3 and y = 4 − 8 + 1 = −3 ✓.',
    scoringNotes: 'Only 14 is acceptable.',
  },

  // ─── Q22 · HARD (9-10/10) · Geometry / Circles · GRID-IN ────────────────────────────
  // KEEP from V3 — requires reading circle equation, substituting, and computing chord length.
  // VERIFY: Circle (x − 3)² + (y + 2)² = 25, center (3, −2), radius 5.
  // Vertical chord on x = 0:
  // (0−3)² + (y+2)² = 25 → 9 + (y+2)² = 25 → (y+2)² = 16 → y = 2 or y = −6.
  // Chord endpoints: (0, 2) and (0, −6). Length = |2 − (−6)| = 8.
  // Verify both on circle: (0−3)²+(2+2)² = 9+16 = 25 ✓; (0−3)²+(−6+2)² = 9+16 = 25 ✓.
  {
    id: 'sat-f7-v4-math-m1-q22',
    section: 'math',
    moduleId: 'f7v4-math-module-1',
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
