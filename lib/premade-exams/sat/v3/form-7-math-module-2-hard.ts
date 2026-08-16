import type { MathQuestion } from '../types'

export const f7MathModule2HardQuestionsV3: MathQuestion[] = [

  // ─── Q01 — Algebra — Linear equations in two variables — medium-hard ──────
  // VERIFY: The line through (a, 2a) with slope (2a − 3)/(a − 1) = 5.
  //   Cross-multiply: 2a − 3 = 5(a − 1) = 5a − 5 → −3 + 5 = 5a − 2a → 2 = 3a → a = 2/3.
  //   Check: points (2/3, 4/3) and (1, 3). Slope = (3 − 4/3)/(1 − 2/3) = (5/3)/(1/3) = 5 ✓
  {
    id: 'sat-f7-v3-math-m2h-q01',
    section: 'math',
    moduleId: 'f7v3-math-module-2-hard',
    domain: 'Algebra',
    skill: 'Linear equations in two variables',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'A line in the xy-plane passes through the points (a, 2a) and (1, 3) and has a slope of 5. What is the value of a?',
    choices: [
      { label: 'A', text: '1/3' },
      { label: 'B', text: '2/3' },
      { label: 'C', text: '3/4' },
      { label: 'D', text: '1' },
    ],
    correctAnswer: 'B',
    explanation:
      'The slope between (a, 2a) and (1, 3) is (3 − 2a)/(1 − a) = 5. Cross-multiplying: 3 − 2a = 5(1 − a) = 5 − 5a. Adding 5a to both sides: 3 + 3a = 5, so 3a = 2 and a = 2/3. Verification: the points are (2/3, 4/3) and (1, 3). Slope = (3 − 4/3)/(1 − 2/3) = (5/3)/(1/3) = 5 ✓.',
    wrongAnswerExplanations: {
      A: 'a = 1/3 results from setting 2a − 3 = 5(a − 1) with incorrect signs, yielding 3a = 1.',
      C: 'a = 3/4 comes from misreading the second coordinate as 2a + 1 instead of 2a, shifting the equation.',
      D: 'a = 1 makes the denominator (1 − a) = 0, which is undefined — the slope formula requires distinct x-values.',
    },
  },

  // ─── Q02 — Advanced Math — Nonlinear functions (quadratic vertex form) — medium-hard ──
  // VERIFY: f(x) = a(x−3)² + k. f(1) = a(−2)² + k = 4a + k = 10. f(5) = a(2)² + k = 4a + k = 10.
  //   Both give 4a + k = 10, so f(1) = f(5) — consistent. f(3) = k (the vertex value).
  //   We also know f(0) = a(−3)² + k = 9a + k = 19.
  //   From 4a + k = 10 → k = 10 − 4a. Substitute: 9a + 10 − 4a = 19 → 5a = 9 → a = 9/5.
  //   Wait — re-read the problem. Let me reframe so we give exactly 2 conditions.
  //   Problem: f(x) = a(x−3)² + k, f(1) = 10, f(0) = 19. Find f(3).
  //   4a + k = 10 ... (i); 9a + k = 19 ... (ii). Subtract (i) from (ii): 5a = 9 → a = 9/5.
  //   k = 10 − 4(9/5) = 10 − 36/5 = 50/5 − 36/5 = 14/5.
  //   f(3) = k = 14/5. That's an ugly answer. Let me pick nicer numbers.
  //   Try: f(x) = a(x−2)² + k. f(0) = 4a + k = 13. f(4) = 4a + k = 13 (symmetric). f(5) = 9a + k.
  //   Pick a = 2, k = 5: f(0) = 4(2)+5 = 13 ✓. f(5) = 9(2)+5 = 23. f(2) = 5.
  //   Question: f(x) = a(x−2)²+k, f(0) = 13, a = 2. Find minimum value.
  //   But we need to find a and k both from two data points:
  //   f(0) = 4a + k = 14; f(6) = 16a + k = 38.
  //   (ii)−(i): 12a = 24 → a = 2; k = 14 − 8 = 6. f(2) = k = 6. ✓ Clean numbers.
  {
    id: 'sat-f7-v3-math-m2h-q02',
    section: 'math',
    moduleId: 'f7v3-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'The function f is defined by f(x) = a(x − 2)² + k, where a and k are constants. If f(0) = 14 and f(6) = 38, what is the minimum value of f(x)?',
    choices: [
      { label: 'A', text: '2' },
      { label: 'B', text: '4' },
      { label: 'C', text: '6' },
      { label: 'D', text: '8' },
    ],
    correctAnswer: 'C',
    explanation:
      'Since f(x) = a(x − 2)² + k, substitute the two given points. f(0) = a(0 − 2)² + k = 4a + k = 14 ... (1). f(6) = a(6 − 2)² + k = 16a + k = 38 ... (2). Subtract (1) from (2): 12a = 24, so a = 2. Substituting back: 4(2) + k = 14, so k = 6. Because a = 2 > 0 the parabola opens upward, and the minimum value is k = 6, achieved at x = 2.',
    wrongAnswerExplanations: {
      A: 'a = 2 is the value of the coefficient, not the minimum value of f(x).',
      B: 'f(2) = 6 but one might mistakenly compute 4a − k = 8 − 6 = 2, confusing signs.',
      D: 'k = 8 results from subtracting incorrectly: k = 14 − 4(2) should be 14 − 8 = 6, not 8.',
    },
  },

  // ─── Q03 — Problem-Solving and Data Analysis — Ratios/rates/units — medium-hard ──
  // VERIFY: Pump A fills 1/4 tank per hour, Pump B drains 1/6 tank per hour.
  //   Net rate = 1/4 − 1/6 = 3/12 − 2/12 = 1/12 tank per hour.
  //   Time to fill = 1/(1/12) = 12 hours.
  //   Starting 1/3 full: remaining = 1 − 1/3 = 2/3.
  //   Time = (2/3)/(1/12) = (2/3) × 12 = 8 hours. ✓
  {
    id: 'sat-f7-v3-math-m2h-q03',
    section: 'math',
    moduleId: 'f7v3-math-module-2-hard',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Ratios, rates, proportional relationships, and units',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'A water tank is one-third full. Pump A fills the tank at a rate that would fill the entire empty tank in 4 hours, while Pump B drains the tank at a rate that would empty the entire full tank in 6 hours. If both pumps operate simultaneously, how many hours will it take to completely fill the tank?',
    choices: [
      { label: 'A', text: '6' },
      { label: 'B', text: '8' },
      { label: 'C', text: '10' },
      { label: 'D', text: '12' },
    ],
    correctAnswer: 'B',
    explanation:
      'Pump A fills at rate 1/4 tank per hour. Pump B drains at rate 1/6 tank per hour. Net filling rate = 1/4 − 1/6 = 3/12 − 2/12 = 1/12 tank per hour. The tank starts 1/3 full, so 2/3 of the tank remains to be filled. Time = (2/3) ÷ (1/12) = (2/3) × 12 = 8 hours.',
    wrongAnswerExplanations: {
      A: '6 hours results from dividing 1/2 (incorrect remaining fraction) by 1/12, or from using only the time to fill an empty tank from scratch with a different net rate.',
      C: '10 hours comes from incorrectly computing the net rate as 1/4 + 1/6 = 5/12 and then dividing 2/3 by an incorrect fraction.',
      D: '12 hours is the time to fill the complete empty tank from scratch at the net rate, ignoring that the tank starts 1/3 full.',
    },
  },

  // ─── Q04 — Geometry and Trigonometry — Right triangles and trig — medium-hard ──
  // VERIFY: Right triangle with legs a and b, hypotenuse c.
  //   sin(θ) = opposite/hypotenuse. If sin(θ) = 5/13, then opposite = 5k, hyp = 13k.
  //   Adjacent leg = √(169k² − 25k²) = √(144k²) = 12k.
  //   tan(θ) = opposite/adjacent = 5k/12k = 5/12. ✓
  {
    id: 'sat-f7-v3-math-m2h-q04',
    section: 'math',
    moduleId: 'f7v3-math-module-2-hard',
    domain: 'Geometry and Trigonometry',
    skill: 'Right triangles and trigonometry',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'In a right triangle, the sine of one of the acute angles is 5/13. What is the tangent of that same angle?',
    choices: [
      { label: 'A', text: '5/12' },
      { label: 'B', text: '12/13' },
      { label: 'C', text: '5/8' },
      { label: 'D', text: '12/5' },
    ],
    correctAnswer: 'A',
    explanation:
      'If sin(θ) = 5/13, then the side opposite θ is 5 and the hypotenuse is 13 (using a 5-12-13 right triangle). By the Pythagorean theorem, the adjacent leg = √(13² − 5²) = √(169 − 25) = √144 = 12. Therefore tan(θ) = opposite/adjacent = 5/12.',
    wrongAnswerExplanations: {
      B: '12/13 is cos(θ), the ratio of the adjacent side to the hypotenuse, not the tangent.',
      C: '5/8 has no basis in the 5-12-13 triangle; it may come from subtracting 5 from 13 incorrectly.',
      D: '12/5 is the tangent of the complementary angle (the other acute angle), not θ.',
    },
  },

  // ─── Q05 — Advanced Math — Equivalent expressions (polynomial) — medium-hard ──
  // VERIFY: (3x − 2)² − (x + 4)(x − 4)
  //   = (9x² − 12x + 4) − (x² − 16)
  //   = 9x² − 12x + 4 − x² + 16
  //   = 8x² − 12x + 20. ✓
  //   Check answer choices won't cause confusion: none equal each other. ✓
  {
    id: 'sat-f7-v3-math-m2h-q05',
    section: 'math',
    moduleId: 'f7v3-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Equivalent expressions',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'Which of the following is equivalent to (3x − 2)² − (x + 4)(x − 4)?',
    choices: [
      { label: 'A', text: '8x² + 12x + 20' },
      { label: 'B', text: '8x² − 12x + 20' },
      { label: 'C', text: '8x² − 12x − 12' },
      { label: 'D', text: '10x² − 12x + 20' },
    ],
    correctAnswer: 'B',
    explanation:
      'Expand (3x − 2)² = 9x² − 12x + 4. Expand (x + 4)(x − 4) = x² − 16 (difference of squares). Subtract: (9x² − 12x + 4) − (x² − 16) = 9x² − 12x + 4 − x² + 16 = 8x² − 12x + 20.',
    wrongAnswerExplanations: {
      A: '8x² + 12x + 20 results from expanding (3x − 2)² as 9x² + 12x + 4 (incorrect middle sign), giving +12x instead of −12x.',
      C: '8x² − 12x − 12 results from treating (x + 4)(x − 4) as x² + 16 instead of x² − 16, so subtracting gives +4 − 16 = −12 as the constant.',
      D: '10x² − 12x + 20 results from expanding (3x − 2)² as 9x² − 12x + 4 and incorrectly subtracting (x + 4)(x − 4) = x² − 16 as −(−x²) = +x², giving 9x² + x² = 10x².',
    },
  },

  // ─── Q06 — Algebra — Systems of linear equations — medium-hard ──────────────
  // VERIFY: The system ax + 3y = 12 and 4x + ay = b has infinitely many solutions.
  //   Infinitely many solutions ↔ ratios are all equal: a/4 = 3/a = 12/b.
  //   From a/4 = 3/a: a² = 12, so a = 2√3 (non-integer, ugly). Let me reframe.
  //   New problem: 2x + ky = 6 and kx + 8y = 12 has infinitely many solutions.
  //   Ratios: 2/k = k/8 = 6/12 = 1/2.
  //   From 2/k = 1/2: k = 4. Check k/8 = 4/8 = 1/2 ✓. Check 6/12 = 1/2 ✓.
  //   k = 4 works perfectly. ✓
  {
    id: 'sat-f7-v3-math-m2h-q06',
    section: 'math',
    moduleId: 'f7v3-math-module-2-hard',
    domain: 'Algebra',
    skill: 'Systems of two linear equations in two variables',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'The system of equations below has infinitely many solutions.\n\n2x + ky = 6\nkx + 8y = 12\n\nWhat is the value of k?',
    choices: [
      { label: 'A', text: '2' },
      { label: 'B', text: '4' },
      { label: 'C', text: '6' },
      { label: 'D', text: '−4' },
    ],
    correctAnswer: 'B',
    explanation:
      'For a system of two linear equations to have infinitely many solutions, the two equations must be scalar multiples of each other. This requires the ratios of corresponding coefficients to be equal:\n2/k = k/8 = 6/12.\n\nFrom 6/12 = 1/2, we need 2/k = 1/2, giving k = 4. Check: k/8 = 4/8 = 1/2 ✓ and 6/12 = 1/2 ✓. With k = 4, the second equation 4x + 8y = 12 is exactly 2 times the first equation 2x + 4y = 6, confirming infinitely many solutions.',
    wrongAnswerExplanations: {
      A: 'k = 2 gives equations 2x + 2y = 6 and 2x + 8y = 12. The y-coefficients differ (ratio 2/8 ≠ 2/2), so these lines intersect at exactly one point.',
      C: 'k = 6 gives ratios 2/6 = 1/3 and 6/8 = 3/4, which are unequal, so the system has one solution (lines intersect).',
      D: 'k = −4 gives a negative coefficient, making ratios 2/(−4) = −1/2 and (−4)/8 = −1/2, which appear equal, but then 6/12 = 1/2 ≠ −1/2, so the equations are not proportional — the system has no solution (parallel lines).',
    },
  },

  // ─── Q07 — Problem-Solving and Data Analysis — Percentages — medium-hard ────
  // VERIFY: Price reduced 20% then 15%.
  //   After 20% off: P × 0.80. After 15% off: P × 0.80 × 0.85 = P × 0.68.
  //   This is a 32% reduction from original price. Percent of original = 68%.
  //   But the question asks: what single percent off equals both discounts combined?
  //   32% off total. ✓
  {
    id: 'sat-f7-v3-math-m2h-q07',
    section: 'math',
    moduleId: 'f7v3-math-module-2-hard',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Percentages',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'A retailer first discounts the price of a television by 20%, then takes an additional 15% off the already-discounted price. The final price is what percent less than the original price?',
    choices: [
      { label: 'A', text: '30%' },
      { label: 'B', text: '32%' },
      { label: 'C', text: '35%' },
      { label: 'D', text: '68%' },
    ],
    correctAnswer: 'B',
    explanation:
      'Let the original price be P. After the 20% discount: 0.80P. After the additional 15% discount on that price: 0.80P × 0.85 = 0.68P. The final price is 68% of the original, so it is 100% − 68% = 32% less than the original price.',
    wrongAnswerExplanations: {
      A: '30% is the simple sum of the two discount rates (20% + 15% − 5%), which only works if the two discounts do not compound. Compounding always produces a slightly larger reduction than the naive sum.',
      C: '35% comes from adding 20% + 15% = 35%, ignoring that the second discount applies to the already-reduced price, not the original.',
      D: '68% is the final price as a percent of the original, not the reduction. The question asks how much less the final price is.',
    },
  },

  // ─── Q08 — Geometry and Trigonometry — Circles — medium-hard ─────────────
  // VERIFY: Circle with center (3, −2), passes through (7, 1).
  //   Radius = √((7−3)² + (1−(−2))²) = √(16 + 9) = √25 = 5.
  //   Equation: (x−3)² + (y+2)² = 25. ✓
  //   For point (3+5, −2) = (8, −2): (8−3)² + (−2+2)² = 25 + 0 = 25 ✓ (on circle).
  //   For point (3, −2+5) = (3, 3): (3−3)² + (3+2)² = 0 + 25 = 25 ✓.
  //   Question: which point does NOT lie on the circle?
  //   Test (0, 2): (0−3)² + (2+2)² = 9 + 16 = 25 ✓ (on circle).
  //   Test (3, 3): on circle (shown above).
  //   Test (6, 3): (6−3)² + (3+2)² = 9 + 25 = 34 ≠ 25. NOT on circle. ✓
  //   Test (8, −2): on circle (shown above).
  //   So (6, 3) is NOT on the circle. ✓
  {
    id: 'sat-f7-v3-math-m2h-q08',
    section: 'math',
    moduleId: 'f7v3-math-module-2-hard',
    domain: 'Geometry and Trigonometry',
    skill: 'Circles',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'A circle in the xy-plane has center (3, −2) and passes through the point (7, 1). Which of the following points does NOT lie on the circle?',
    choices: [
      { label: 'A', text: '(0, 2)' },
      { label: 'B', text: '(3, 3)' },
      { label: 'C', text: '(6, 3)' },
      { label: 'D', text: '(8, −2)' },
    ],
    correctAnswer: 'C',
    explanation:
      'First find the radius: r = √((7 − 3)² + (1 − (−2))²) = √(16 + 9) = √25 = 5. The circle equation is (x − 3)² + (y + 2)² = 25.\n\nTest each point:\n• (0, 2): (−3)² + (4)² = 9 + 16 = 25 ✓ (on circle)\n• (3, 3): (0)² + (5)² = 0 + 25 = 25 ✓ (on circle)\n• (6, 3): (3)² + (5)² = 9 + 25 = 34 ≠ 25 ✗ (NOT on circle)\n• (8, −2): (5)² + (0)² = 25 + 0 = 25 ✓ (on circle)\n\nOnly (6, 3) does not lie on the circle.',
    wrongAnswerExplanations: {
      A: '(0, 2) satisfies (0−3)² + (2+2)² = 9 + 16 = 25, so it lies on the circle.',
      B: '(3, 3) satisfies (3−3)² + (3+2)² = 0 + 25 = 25, so it lies on the circle.',
      D: '(8, −2) satisfies (8−3)² + (−2+2)² = 25 + 0 = 25, so it lies on the circle.',
    },
  },

  // ─── Q09 — Advanced Math — Nonlinear equations (radical/rational) — hard ───
  // VERIFY: √(3x + 4) − √(x + 1) = 1.
  //   Isolate one radical: √(3x + 4) = 1 + √(x + 1).
  //   Square both sides: 3x + 4 = 1 + 2√(x + 1) + (x + 1) = x + 2 + 2√(x + 1).
  //   Simplify: 2x + 2 = 2√(x + 1) → x + 1 = √(x + 1).
  //   Let u = √(x + 1): u = u². So u² − u = 0 → u(u − 1) = 0 → u = 0 or u = 1.
  //   u = 0: √(x+1) = 0 → x = −1. Check: √(3(−1)+4) − √(−1+1) = √1 − 0 = 1 ✓.
  //   u = 1: √(x+1) = 1 → x = 0. Check: √(3(0)+4) − √(0+1) = 2 − 1 = 1 ✓.
  //   Both solutions valid: x = −1 and x = 0. Sum = −1 + 0 = −1.
  //   But the question says "positive value of x" → x = 0? No, 0 is not positive.
  //   Hmm, let me reframe to ensure there's one distinct positive answer.
  //   Try: √(5x + 4) − √(x) = 2.
  //   √(5x + 4) = 2 + √x. Square: 5x + 4 = 4 + 4√x + x → 4x = 4√x → x = √x → x − √x = 0.
  //   √x(√x − 1) = 0 → √x = 0 or √x = 1 → x = 0 or x = 1.
  //   Check x = 0: √4 − 0 = 2 ✓. Check x = 1: √9 − 1 = 3 − 1 = 2 ✓.
  //   Both valid. The question can ask for the sum = 0 + 1 = 1.
  {
    id: 'sat-f7-v3-math-m2h-q09',
    section: 'math',
    moduleId: 'f7v3-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Radical and rational equations',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'What is the sum of all values of x that satisfy √(5x + 4) − √x = 2?',
    choices: [
      { label: 'A', text: '0' },
      { label: 'B', text: '1' },
      { label: 'C', text: '2' },
      { label: 'D', text: '4' },
    ],
    correctAnswer: 'B',
    explanation:
      'Isolate one radical: √(5x + 4) = 2 + √x. Square both sides: 5x + 4 = (2 + √x)² = 4 + 4√x + x. Simplify: 4x = 4√x, so x = √x (dividing both sides by 4). This means √x(√x − 1) = 0, giving √x = 0 or √x = 1, so x = 0 or x = 1.\n\nCheck x = 0: √(0 + 4) − √0 = 2 − 0 = 2 ✓\nCheck x = 1: √(5 + 4) − √1 = 3 − 1 = 2 ✓\n\nBoth solutions are valid. The sum is 0 + 1 = 1.',
    wrongAnswerExplanations: {
      A: 'x = 0 is one of two valid solutions, but the question asks for the sum of all values, so x = 1 must also be included.',
      C: '2 results from incorrectly squaring the equation without isolating a radical first, leading to a single spurious answer.',
      D: '4 comes from a common error of squaring both sides without isolating a radical: treating (√(5x+4) − √x)² = 4 as 5x + 4 − x = 4, giving 4x = 0, then guessing x = 4 from misreading.',
    },
  },

  // ─── Q10 — Algebra — Linear inequalities (two variables / system) — hard ───
  // VERIFY: We need all integer points (x, y) with x + y ≤ 5 AND 2x − y > 1 AND x ≥ 0, y ≥ 0.
  //   This is really a counting problem framed as an inequality system.
  //   Let me make a more elegant MC question instead:
  //   What is the greatest possible integer value of k such that 3(k − 4) < 2k + 1 AND k > −10?
  //   3k − 12 < 2k + 1 → k < 13. And k > −10. So k is an integer with −10 < k < 13.
  //   Greatest integer k = 12.
  //   Verify: k = 12: 3(8) = 24 < 25 = 2(12)+1 ✓. k = 13: 3(9)=27 < 27? No, 27 < 27 is false ✓ (13 excluded).
  {
    id: 'sat-f7-v3-math-m2h-q10',
    section: 'math',
    moduleId: 'f7v3-math-module-2-hard',
    domain: 'Algebra',
    skill: 'Linear inequalities in one or two variables',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'What is the greatest integer value of k that satisfies both inequalities below?\n\n3(k − 4) < 2k + 1\nk > −10',
    choices: [
      { label: 'A', text: '10' },
      { label: 'B', text: '11' },
      { label: 'C', text: '12' },
      { label: 'D', text: '13' },
    ],
    correctAnswer: 'C',
    explanation:
      'Solve the first inequality: 3(k − 4) < 2k + 1 → 3k − 12 < 2k + 1 → k < 13. The second inequality gives k > −10. Together: −10 < k < 13. Since k must be an integer and must be strictly less than 13, the greatest such integer is k = 12.\n\nVerify k = 12: 3(12 − 4) = 3(8) = 24, and 2(12) + 1 = 25. Is 24 < 25? Yes ✓.\nVerify k = 13 fails: 3(13 − 4) = 27, and 2(13) + 1 = 27. Is 27 < 27? No ✗.',
    wrongAnswerExplanations: {
      A: '10 is a valid solution but not the greatest — k = 11 and k = 12 also satisfy the inequalities.',
      B: '11 is valid but not the greatest; k = 12 also works.',
      D: '13 fails the first inequality: 3(13 − 4) = 27 is NOT less than 2(13) + 1 = 27.',
    },
  },

  // ─── Q11 — Advanced Math — Nonlinear systems — hard ──────────────────────
  // VERIFY: System: y = x² − 5x + 6 and y = −x + 6.
  //   Set equal: x² − 5x + 6 = −x + 6 → x² − 4x = 0 → x(x − 4) = 0 → x = 0 or x = 4.
  //   At x = 0: y = 6. At x = 4: y = −4 + 6 = 2.
  //   Points: (0, 6) and (4, 2).
  //   Question: product of y-coordinates = 6 × 2 = 12. ✓
  {
    id: 'sat-f7-v3-math-m2h-q11',
    section: 'math',
    moduleId: 'f7v3-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Nonlinear equations in one variable and systems of equations in two variables',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'The system of equations y = x² − 5x + 6 and y = −x + 6 is satisfied by two points (x₁, y₁) and (x₂, y₂). What is the product y₁ · y₂?',
    choices: [
      { label: 'A', text: '6' },
      { label: 'B', text: '8' },
      { label: 'C', text: '12' },
      { label: 'D', text: '24' },
    ],
    correctAnswer: 'C',
    explanation:
      'Substitute y = −x + 6 into the quadratic: −x + 6 = x² − 5x + 6. Rearrange: 0 = x² − 4x, so x(x − 4) = 0, giving x = 0 or x = 4.\n\nFor x = 0: y = −0 + 6 = 6, giving point (0, 6).\nFor x = 4: y = −4 + 6 = 2, giving point (4, 2).\n\nProduct of y-coordinates: y₁ · y₂ = 6 × 2 = 12.',
    wrongAnswerExplanations: {
      A: '6 is y₁ alone (the y-value when x = 0), not the product.',
      B: '8 might arise from computing (x₁ + x₂) × 2 = 4 × 2 = 8 instead of y₁ · y₂.',
      D: '24 comes from mistakenly computing the product of the x-coordinates times the sum: something like (0 + 4)(6) = 24, confusing sums and products.',
    },
  },

  // ─── Q12 — Problem-Solving and Data Analysis — Statistical inference — hard ─
  // VERIFY: A sample mean and the concept of confidence intervals and inference.
  //   This is a conceptual question about valid statistical conclusions.
  //   No arithmetic needed — test whether student knows the difference between
  //   "correlation → causation" and valid inference claims.
  {
    id: 'sat-f7-v3-math-m2h-q12',
    section: 'math',
    moduleId: 'f7v3-math-module-2-hard',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Statistical inference',
    difficulty: 'hard',
    type: 'multiple_choice',
    stimulus:
      'A school administrator randomly selects 60 students from a high school of 900 students. Of those selected, 24 have a part-time job.',
    question:
      'Based on this sample, which of the following is the most reasonable conclusion about all 900 students at the school?',
    choices: [
      { label: 'A', text: 'Exactly 360 students in the school have a part-time job.' },
      { label: 'B', text: 'Approximately 360 students in the school have a part-time job.' },
      { label: 'C', text: 'Having a part-time job causes students to perform better academically.' },
      { label: 'D', text: 'Every student selected in the sample was truthful about having a job.' },
    ],
    correctAnswer: 'B',
    explanation:
      'The sample proportion of students with part-time jobs is 24/60 = 2/5 = 40%. Applied to the full population of 900 students: 0.40 × 900 = 360. However, because this is a random sample, the result is an estimate — we can say approximately 360 students likely have a part-time job. We cannot say "exactly" because sampling introduces variability.',
    wrongAnswerExplanations: {
      A: 'Saying "exactly 360" overstates the precision of a sample-based estimate. Samples provide approximations, not exact counts for the full population.',
      C: 'Observational data (a survey) cannot establish causation. A correlation (or association) between working and academic performance would require a controlled experiment to conclude causation.',
      D: 'This is not a statistical inference about the population — it is an unmeasurable claim about individual honesty that cannot be determined from the data.',
    },
  },

  // ─── Q13 — Advanced Math — Exponential functions — hard ──────────────────
  // VERIFY: f(x) = a · bˣ. f(0) = a = 5. f(3) = 5 · b³ = 40 → b³ = 8 → b = 2.
  //   f(x) = 5 · 2ˣ.
  //   f(6) = 5 · 2⁶ = 5 · 64 = 320. ✓
  //   Now make it harder: give f(2) and f(5) instead.
  //   f(2) = a · b² = 12. f(5) = a · b⁵ = 96.
  //   Divide: b³ = 96/12 = 8 → b = 2. Then a = 12/4 = 3.
  //   f(x) = 3 · 2ˣ. f(8) = 3 · 256 = 768. ✓
  {
    id: 'sat-f7-v3-math-m2h-q13',
    section: 'math',
    moduleId: 'f7v3-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Exponential functions',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'The function f is defined by f(x) = a · bˣ, where a and b are positive constants. If f(2) = 12 and f(5) = 96, what is f(8)?',
    choices: [
      { label: 'A', text: '384' },
      { label: 'B', text: '576' },
      { label: 'C', text: '768' },
      { label: 'D', text: '1024' },
    ],
    correctAnswer: 'C',
    explanation:
      'Divide f(5) by f(2): (a · b⁵)/(a · b²) = b³ = 96/12 = 8, so b = 2. Substitute back: a · 2² = 12, so 4a = 12 and a = 3. Therefore f(x) = 3 · 2ˣ.\n\nf(8) = 3 · 2⁸ = 3 · 256 = 768.',
    wrongAnswerExplanations: {
      A: '384 = 3 · 128 = 3 · 2⁷, which would be f(7), not f(8) — an off-by-one error.',
      B: '576 results from computing a = 4 (incorrect) and then 4 · 144 = 576, or from incorrectly solving b³ = 8 as b = 2 but then computing a as 12/2³ = 1.5 and multiplying differently.',
      D: '1024 = 2¹⁰, which is 2⁸ alone without the factor a = 3.',
    },
  },

  // ─── Q14 — Geometry and Trigonometry — Area and volume — hard ────────────
  // VERIFY: Cone with radius r and height h. Volume = (1/3)πr²h.
  //   A cone has radius 6 and height 8. Volume = (1/3)π(36)(8) = 96π.
  //   A cylinder has the same volume and height 4. V_cyl = πR²(4) = 96π → R² = 24 → R = 2√6.
  //   That's ugly. Let me use: cylinder same volume, radius R = 2r of cone.
  //   Better: cone r = 3, h = 12. V_cone = (1/3)π(9)(12) = 36π.
  //   Cylinder r = 3, find h: π(9)h = 36π → h = 4. That's not hard enough.
  //   Better multi-step: A right circular cone has radius r and slant height l = 13,
  //   with r = 5. Find the volume. h = √(13²−5²) = √(169−25) = √144 = 12.
  //   V = (1/3)π(25)(12) = 100π. ✓
  {
    id: 'sat-f7-v3-math-m2h-q14',
    section: 'math',
    moduleId: 'f7v3-math-module-2-hard',
    domain: 'Geometry and Trigonometry',
    skill: 'Area and volume',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'A right circular cone has a base radius of 5 and a slant height of 13. What is the volume of the cone?',
    choices: [
      { label: 'A', text: '60π' },
      { label: 'B', text: '80π' },
      { label: 'C', text: '100π' },
      { label: 'D', text: '120π' },
    ],
    correctAnswer: 'C',
    explanation:
      'The slant height, height, and radius of a cone form a right triangle. Using the Pythagorean theorem: h² + r² = l², so h² + 5² = 13², giving h² = 169 − 25 = 144, and h = 12.\n\nVolume of a cone = (1/3)πr²h = (1/3)π(5²)(12) = (1/3)π(25)(12) = 100π.',
    wrongAnswerExplanations: {
      A: '60π results from using h = 13 (the slant height) as the height and computing (1/3)π(25)(13) × (60/100), or from confusing the formula and computing (1/3)π(5)(12) = 20π and misscaling.',
      B: '80π could result from computing the height as 8 (from a 6-8-10 triangle mistake with radius 6) and using (1/3)π(25)(8)... or from a different numeric slip.',
      D: '120π results from forgetting the 1/3 factor: πr²h = π(25)(12) = 300π divided by 2.5 ≈ 120π, or from computing (1/3)π(r²)(h) with r = 6 and h = 12 as (1/3)(36)(12)π = 144π and misreading choices.',
    },
  },

  // ─── Q15 — Advanced Math — Quadratic/polynomial — hard ───────────────────
  // VERIFY: p(x) = 2x³ + bx² + cx − 12. p(2) = 0 means (x−2) is a factor.
  //   p(2) = 16 + 4b + 2c − 12 = 4 + 4b + 2c = 0 → 4b + 2c = −4 → 2b + c = −2 ... (i).
  //   p(−1) = −2 + b − c − 12 = b − c − 14 = 0 → b − c = 14 ... (ii).
  //   Add (i) and (ii): 3b = 12 → b = 4. Then c = −2 − 2(4) = −10.
  //   p(x) = 2x³ + 4x² − 10x − 12. Factor out 2: 2(x³ + 2x² − 5x − 6).
  //   Divide by (x − 2): x³ + 2x² − 5x − 6 ÷ (x − 2).
  //   x³ + 2x² − 5x − 6 = (x − 2)(x² + 4x + 3) = (x − 2)(x + 1)(x + 3).
  //   Check (x − 2): factor ✓. Check (x + 1): p(−1) = 0 ✓.
  //   So p(x) = 2(x − 2)(x + 1)(x + 3). Third zero: x = −3.
  //   p(0) = 2(−2)(1)(3) = −12 ✓ (matches constant term).
  //   b + c = 4 + (−10) = −6. ✓ This is the answer.
  {
    id: 'sat-f7-v3-math-m2h-q15',
    section: 'math',
    moduleId: 'f7v3-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'The polynomial p(x) = 2x³ + bx² + cx − 12 has zeros at x = 2 and x = −1, where b and c are constants. What is the value of b + c?',
    choices: [
      { label: 'A', text: '−6' },
      { label: 'B', text: '−2' },
      { label: 'C', text: '2' },
      { label: 'D', text: '6' },
    ],
    correctAnswer: 'A',
    explanation:
      'Since p(2) = 0: 2(8) + b(4) + c(2) − 12 = 0 → 16 + 4b + 2c − 12 = 0 → 4b + 2c = −4 → 2b + c = −2 ... (1).\n\nSince p(−1) = 0: 2(−1) + b(1) + c(−1) − 12 = 0 → −2 + b − c − 12 = 0 → b − c = 14 ... (2).\n\nAdd equations (1) and (2): 3b = 12, so b = 4. Substitute into (2): 4 − c = 14, so c = −10.\n\nb + c = 4 + (−10) = −6.',
    wrongAnswerExplanations: {
      B: '−2 is the value of 2b + c from equation (1) before solving the system, not the final value of b + c.',
      C: '2 might arise from adding the two zeros (2 + (−1) = 1) and rounding up, or from a sign error in equation (2) that gives b − c = −14 and yields b + c = 2.',
      D: '6 results from confusing b − c = 14 with b + c = 14 (forgetting the sign of c is negative), or from erroneously computing b + c = 4 + 2 = 6 using an incorrect c value.',
    },
  },

  // ─── Q16 — Geometry and Trigonometry — Lines/angles/triangles — hard ─────
  // VERIFY: Two parallel lines cut by a transversal. Angle relationships.
  //   More interesting: triangle with an exterior angle.
  //   In triangle ABC, angle A = 2x, angle B = x + 20, exterior angle at C = 5x − 10.
  //   Exterior angle = sum of remote interior angles: 5x − 10 = 2x + (x + 20) = 3x + 20.
  //   2x − 10 = 20 → 2x = 30 → x = 15.
  //   Wait: 5x − 10 = 3x + 20 → 2x = 30 → x = 15.
  //   Angle A = 30°, Angle B = 35°, interior angle C = 180 − 30 − 35 = 115°.
  //   Exterior angle at C = 180 − 115 = 65°. Check: 5(15) − 10 = 75 − 10 = 65 ✓.
  //   Sum of remote interior = 30 + 35 = 65 ✓.
  //   Question: what is the measure of angle C (interior)? = 115°.
  {
    id: 'sat-f7-v3-math-m2h-q16',
    section: 'math',
    moduleId: 'f7v3-math-module-2-hard',
    domain: 'Geometry and Trigonometry',
    skill: 'Lines, angles, and triangles',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'In triangle ABC, angle A measures 2x degrees, angle B measures (x + 20) degrees, and the exterior angle at vertex C measures (5x − 10) degrees. What is the measure, in degrees, of the interior angle at C?',
    choices: [
      { label: 'A', text: '65°' },
      { label: 'B', text: '95°' },
      { label: 'C', text: '105°' },
      { label: 'D', text: '115°' },
    ],
    correctAnswer: 'D',
    explanation:
      'The exterior angle of a triangle equals the sum of the two non-adjacent interior angles:\n5x − 10 = 2x + (x + 20)\n5x − 10 = 3x + 20\n2x = 30\nx = 15.\n\nAngle A = 2(15) = 30°. Angle B = 15 + 20 = 35°. The sum of interior angles is 180°, so interior angle C = 180° − 30° − 35° = 115°.\n\nVerification: exterior angle at C = 5(15) − 10 = 65° = 30° + 35° ✓.',
    wrongAnswerExplanations: {
      A: '65° is the exterior angle at C, not the interior angle. The interior and exterior angles at any vertex are supplementary (sum to 180°).',
      B: '95° results from incorrectly computing x = 20 (by solving 5x − 10 = 3x + 10 with a sign error), giving interior angle C = 180 − 40 − 40 = 100°, then reading the wrong answer.',
      C: '105° results from a calculation error such as computing interior angle C = 180 − 2(15) − 15 = 180 − 45 = 135°, then misidentifying choices.',
    },
  },

  // ─── Q17 — Algebra — Linear functions — grid_in — hard ───────────────────
  // VERIFY: f(x) = mx + b. f(2) − f(−2) = 4m (the b cancels).
  //   We need this = 24. So 4m = 24 → m = 6.
  //   f(5) − f(3) = 2m = 12.
  //   But if question gives f(2) − f(−2) = 24, asks for f(5) − f(3):
  //   f(5) − f(3) = 5m + b − 3m − b = 2m = 12. ✓
  {
    id: 'sat-f7-v3-math-m2h-q17',
    section: 'math',
    moduleId: 'f7v3-math-module-2-hard',
    domain: 'Algebra',
    skill: 'Linear functions',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'The function f is linear. If f(2) − f(−2) = 24, what is the value of f(5) − f(3)?',
    correctAnswer: '12',
    acceptableAnswers: ['12'],
    explanation:
      'For any linear function f(x) = mx + b, the difference f(a) − f(c) = m(a − c). The slope m is the rate of change per unit of x.\n\nFrom f(2) − f(−2) = 24: the x-difference is 2 − (−2) = 4, so 4m = 24 and m = 6.\n\nFor f(5) − f(3): the x-difference is 5 − 3 = 2, so f(5) − f(3) = 2m = 2(6) = 12.',
  },

  // ─── Q18 — Algebra — Systems of linear equations (three variables reduced) — grid_in — hard ──
  // VERIFY: Three equations with elimination strategy.
  //   x + y = 10 ... (1)
  //   y + z = 15 ... (2)
  //   x + z = 11 ... (3)
  //   Add all three: 2(x + y + z) = 36 → x + y + z = 18.
  //   From (1): z = 18 − 10 = 8. From (2): x = 18 − 15 = 3. From (3): y = 18 − 11 = 7.
  //   Check: x + y = 10 ✓, y + z = 15 ✓, x + z = 11 ✓.
  //   Question asks for x · y · z = 3 · 7 · 8 = 168. That's large for grid-in (max 9999, fine).
  //   Actually ask for x + 2y + z: 3 + 14 + 8 = 25. Simple.
  //   Or ask for z − x = 8 − 3 = 5. Nice clean answer.
  {
    id: 'sat-f7-v3-math-m2h-q18',
    section: 'math',
    moduleId: 'f7v3-math-module-2-hard',
    domain: 'Algebra',
    skill: 'Systems of two linear equations in two variables',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'The three quantities x, y, and z satisfy the following system:\n\nx + y = 10\ny + z = 15\nx + z = 11\n\nWhat is the value of z − x?',
    correctAnswer: '5',
    acceptableAnswers: ['5'],
    explanation:
      'Add all three equations: (x + y) + (y + z) + (x + z) = 10 + 15 + 11, so 2x + 2y + 2z = 36, meaning x + y + z = 18.\n\nSubtract the first equation from this total: z = 18 − 10 = 8.\nSubtract the third equation: y = 18 − 11 = 7.\nSubtract the second equation: x = 18 − 15 = 3.\n\nVerify: 3 + 7 = 10 ✓, 7 + 8 = 15 ✓, 3 + 8 = 11 ✓.\n\nz − x = 8 − 3 = 5.',
  },

  // ─── Q19 — Problem-Solving and Data Analysis — Two-variable data — grid_in — hard ─
  // VERIFY: A linear model ŷ = 1.5x + 20. If the actual value when x = 30 is y = 62,
  //   the predicted value = 1.5(30) + 20 = 45 + 20 = 65.
  //   Residual = actual − predicted = 62 − 65 = −3.
  //   The question asks for the residual = −3.
  //   Grid-in can accept negative. SAT grid-in allows negative with the minus sign.
  //   acceptableAnswers: ['-3']. ✓
  {
    id: 'sat-f7-v3-math-m2h-q19',
    section: 'math',
    moduleId: 'f7v3-math-module-2-hard',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Two-variable data: models and scatterplots',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'A least-squares regression line for a data set is given by ŷ = 1.5x + 20. One data point in the set has an x-value of 30 and an actual y-value of 62. What is the residual for this data point?',
    correctAnswer: '-3',
    acceptableAnswers: ['-3'],
    explanation:
      'Predicted value: ŷ = 1.5(30) + 20 = 45 + 20 = 65.\n\nResidual = Actual − Predicted = 62 − 65 = −3.\n\nThe negative residual indicates the actual value (62) is below the predicted value (65), meaning this data point falls below the regression line.',
  },

  // ─── Q20 — Advanced Math — Nonlinear functions (composition) — grid_in — hard ─
  // VERIFY: f(x) = x² − 3, g(x) = 2x + 1.
  //   f(g(x)) = f(2x + 1) = (2x + 1)² − 3 = 4x² + 4x + 1 − 3 = 4x² + 4x − 2.
  //   g(f(x)) = g(x² − 3) = 2(x² − 3) + 1 = 2x² − 6 + 1 = 2x² − 5.
  //   f(g(2)) = 4(4) + 4(2) − 2 = 16 + 8 − 2 = 22. ✓
  //   g(f(2)) = 2(4) − 5 = 8 − 5 = 3. ✓
  //   f(g(2)) − g(f(2)) = 22 − 3 = 19.
  //   Alternatively, verify: g(2) = 5. f(5) = 25 − 3 = 22. ✓
  //   f(2) = 1. g(1) = 3. ✓ Difference = 19. ✓
  {
    id: 'sat-f7-v3-math-m2h-q20',
    section: 'math',
    moduleId: 'f7v3-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'The functions f and g are defined by f(x) = x² − 3 and g(x) = 2x + 1. What is the value of f(g(2)) − g(f(2))?',
    correctAnswer: '19',
    acceptableAnswers: ['19'],
    explanation:
      'Compute each composition separately.\n\nf(g(2)): First find g(2) = 2(2) + 1 = 5. Then f(5) = 5² − 3 = 25 − 3 = 22.\n\ng(f(2)): First find f(2) = 2² − 3 = 4 − 3 = 1. Then g(1) = 2(1) + 1 = 3.\n\nf(g(2)) − g(f(2)) = 22 − 3 = 19.',
  },

  // ─── Q21 — Algebra — Linear equations in two variables — grid_in — hard ────
  // VERIFY: Line ℓ passes through (p, 2p − 1) and (3p, 4p + 3).
  //   Slope = [(4p + 3) − (2p − 1)] / [(3p) − (p)] = (2p + 4) / (2p) = (p + 2)/p.
  //   We are told slope = 3/2: (p + 2)/p = 3/2.
  //   Cross-multiply: 2(p + 2) = 3p → 2p + 4 = 3p → p = 4.
  //   Check: points are (4, 7) and (12, 19). Slope = (19 − 7)/(12 − 4) = 12/8 = 3/2 ✓.
  //   y-intercept b: y = (3/2)x + b. Using (4, 7): 7 = 6 + b → b = 1.
  //   The question asks for p = 4. ✓
  {
    id: 'sat-f7-v3-math-m2h-q21',
    section: 'math',
    moduleId: 'f7v3-math-module-2-hard',
    domain: 'Algebra',
    skill: 'Linear equations in two variables',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'A line passes through the points (p, 2p − 1) and (3p, 4p + 3), where p is a positive constant. If the slope of the line is 3/2, what is the value of p?',
    correctAnswer: '4',
    acceptableAnswers: ['4'],
    explanation:
      'The slope between (p, 2p − 1) and (3p, 4p + 3) is:\n\nslope = [(4p + 3) − (2p − 1)] / [(3p) − p] = (2p + 4) / (2p) = (p + 2)/p.\n\nSet equal to 3/2: (p + 2)/p = 3/2. Cross-multiply: 2(p + 2) = 3p → 2p + 4 = 3p → p = 4.\n\nVerification: the points are (4, 7) and (12, 19). Slope = (19 − 7)/(12 − 4) = 12/8 = 3/2 ✓.',
  },

  // ─── Q22 — Algebra — Linear equations in one variable (parametric) — grid_in — hard ─
  // VERIFY: The equation (2k − 1)x + 3 = kx + 7 + (k − 2)x has no solution.
  //   Simplify right side: kx + (k − 2)x + 7 = (2k − 2)x + 7.
  //   Left side: (2k − 1)x + 3.
  //   For no solution: coefficients of x must be equal but constants unequal.
  //   Coefficients equal: 2k − 1 = 2k − 2 → −1 = −2. This is NEVER true.
  //   That means the equation is never consistent (no solution for any k)? That can't be right.
  //   Let me re-examine: For no solution we need:
  //   Coefficient of x: 2k − 1 = 2k − 2 → this simplifies to −1 = −2, impossible.
  //   So coefficient of x is never equal: there is always a unique solution (not no solution).
  //   That problem won't work. Let me try a different setup.
  //
  //   Equation: (3k + 1)x − 5 = (k + 3)x + 2(k − 1).
  //   Coefficient of x: 3k + 1 vs k + 3. Set equal for no-solution: 3k + 1 = k + 3 → 2k = 2 → k = 1.
  //   Check constants: left constant: −5; right constant: 2(k−1) = 2(0) = 0.
  //   −5 = 0? No. Good, constants differ → no solution when k = 1. ✓
  //   Answer: k = 1. ✓
  {
    id: 'sat-f7-v3-math-m2h-q22',
    section: 'math',
    moduleId: 'f7v3-math-module-2-hard',
    domain: 'Algebra',
    skill: 'Linear equations in one variable',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'For what value of k does the equation (3k + 1)x − 5 = (k + 3)x + 2(k − 1) have no solution?',
    correctAnswer: '1',
    acceptableAnswers: ['1'],
    explanation:
      'Simplify the right side: (k + 3)x + 2k − 2.\n\nThe equation becomes: (3k + 1)x − 5 = (k + 3)x + 2k − 2.\n\nCollect x-terms on the left and constants on the right:\n[(3k + 1) − (k + 3)]x = 2k − 2 + 5\n(2k − 2)x = 2k + 3.\n\nFor the equation to have no solution, the coefficient of x must equal zero while the right side is nonzero:\n2k − 2 = 0 → k = 1.\n\nCheck that the right side is nonzero when k = 1: 2(1) + 3 = 5 ≠ 0 ✓.\n\nSo when k = 1, the equation becomes 0 · x = 5, which has no solution.',
  },

]
