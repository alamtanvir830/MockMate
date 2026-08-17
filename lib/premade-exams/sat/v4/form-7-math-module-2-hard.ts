import type { MathQuestion } from '../types'

export const f7MathModule2HardQuestionsV4: MathQuestion[] = [

  // ─── Q01 · 7-8/10 · Algebra · Linear inequalities in one or two variables ──────
  // VERIFY: The feasible region of 3x + 2y ≤ 24, x + 4y ≤ 20, x ≥ 0, y ≥ 0.
  // Corner vertices:
  //   (0,0): objective 0.
  //   (8,0): x-intercept of 3x+2y=24. Objective = 5(8)+3(0)=40.
  //   (0,5): y-intercept of x+4y=20. Objective = 5(0)+3(5)=15.
  //   Intersection of 3x+2y=24 and x+4y=20:
  //     Multiply second by 2: 2x+8y=40. Subtract from 2×first: 6x+4y=48 minus 2x+8y=40 → 4x-4y=8 → x-y=2.
  //     Also x+4y=20, so (2+y)+4y=20 → 5y=18 → y=18/5, x=18/5+2=28/5.
  //     Objective = 5(28/5)+3(18/5) = 28 + 54/5 = 28 + 10.8 = 38.8. Not maximum.
  //   Maximum is at (8,0): value = 40.
  // Independent check: gradient of 5x+3y points to upper-right; binding constraint at (8,0).
  {
    id: 'sat-f7-v4-math-m2h-q01',
    section: 'math',
    moduleId: 'f7v4-math-module-2-hard',
    domain: 'Algebra',
    skill: 'Linear inequalities in one or two variables',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'A system of constraints is given by 3x + 2y ≤ 24, x + 4y ≤ 20, x ≥ 0, and y ≥ 0. What is the maximum value of 5x + 3y subject to these constraints?',
    choices: [
      { label: 'A', text: '38' },
      { label: 'B', text: '39' },
      { label: 'C', text: '40' },
      { label: 'D', text: '42' },
    ],
    correctAnswer: 'C',
    explanation:
      'The feasible region is bounded by the four constraints. The vertices are (0, 0), (8, 0), (28/5, 18/5), and (0, 5). Evaluate 5x + 3y at each: at (0,0) → 0; at (8,0) → 40; at (28/5, 18/5) → 28 + 54/5 = 38.8; at (0,5) → 15. The maximum value is 40 at the vertex (8, 0). To find the intersection of 3x + 2y = 24 and x + 4y = 20: multiply the second equation by 2 to get 2x + 8y = 40, subtract from 6x + 4y = 48 to get 4x − 4y = 8, so x = y + 2; substituting gives y = 18/5 and x = 28/5.',
    wrongAnswerExplanations: {
      A: '38 comes from rounding down the interior vertex value 38.8, confusing it with the maximum.',
      B: '39 results from using the wrong vertex coordinates, perhaps evaluating at (3, 8) due to a system-solving error.',
      D: '42 might come from ignoring the x + 4y ≤ 20 constraint and using the unconstrained maximum, or computing 5(8) + 3(2/3).',
    },
  },

  // ─── Q02 · 7-8/10 · Algebra · Systems of two linear equations in two variables ──
  // VERIFY: System: (k+1)x + 2y = 7 and 3x + (k-1)y = 5.
  // For infinitely many solutions, the system must be dependent: ratios of coefficients equal.
  // (k+1)/3 = 2/(k-1) = 7/5.
  // From 7/5: k+1 = 21/5 → k = 16/5. Check 2/(k-1) = 2/(16/5-1) = 2/(11/5) = 10/11 ≠ 7/5. Inconsistent — no infinite solutions from ratio 7/5.
  // For unique solution failure (parallel lines — no solution): (k+1)/3 = 2/(k-1) but 7/5 ≠ 2/(k-1).
  // (k+1)(k-1) = 6 → k² - 1 = 6 → k² = 7 → k = √7. This gives non-integer k.
  // Redesign: ax + by = c and dx + ey = f. Use a cleaner parameterization.
  // System: kx − 3y = 6 and 2x + (k−5)y = −4.
  // For no solution: k/(2) = −3/(k−5) and 6/(−4) ≠ k/2.
  // k(k−5) = −6 → k²−5k+6 = 0 → (k−2)(k−3) = 0 → k=2 or k=3.
  // Check k=2: 2/2=1; −3/(2−5)=−3/−3=1 ✓. Ratio of constants: 6/−4 = −3/2 ≠ 1. No solution ✓.
  // Check k=3: 3/2; −3/(3−5)=−3/−2=3/2 ✓. Ratio of constants: 6/−4=−3/2 ≠ 3/2. No solution ✓.
  // The question asks: for which value of k does the system have no solution? Answer: both 2 and 3 work.
  // Revise to ask for the sum k₁ + k₂ = 5. Product of roots = 6. Let the answer be 5.
  {
    id: 'sat-f7-v4-math-m2h-q02',
    section: 'math',
    moduleId: 'f7v4-math-module-2-hard',
    domain: 'Algebra',
    skill: 'Systems of two linear equations in two variables',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'The system of equations kx − 3y = 6 and 2x + (k − 5)y = −4 has no solution for two values of the constant k. What is the sum of those two values of k?',
    choices: [
      { label: 'A', text: '3' },
      { label: 'B', text: '5' },
      { label: 'C', text: '6' },
      { label: 'D', text: '7' },
    ],
    correctAnswer: 'B',
    explanation:
      'For the system to have no solution, the coefficient ratios must be equal but the constant ratio must differ. Setting k/2 = −3/(k − 5): cross-multiplying gives k(k − 5) = −6, so k² − 5k + 6 = 0, which factors as (k − 2)(k − 3) = 0. This gives k = 2 or k = 3. For k = 2: coefficient ratio = 1, constant ratio = 6/(−4) = −3/2 ≠ 1, so no solution ✓. For k = 3: coefficient ratio = 3/2, constant ratio = 6/(−4) = −3/2 ≠ 3/2, so no solution ✓. The sum is 2 + 3 = 5.',
    wrongAnswerExplanations: {
      A: '3 is one of the individual values of k, not their sum.',
      C: '6 is the product of the two k-values (from Vieta\'s formulas), not their sum.',
      D: '7 results from a sign error in the quadratic: k² − 5k − 6 = 0 has roots 6 and −1, summing to 5, but computing the sum as 6 + 1 = 7 instead.',
    },
  },

  // ─── Q03 · 7-8/10 · Algebra · Linear functions ──────────────────────────────────
  // VERIFY: f and g are linear. f(x) = mx + b. g(x) = px + q.
  // Given: f(g(x)) = 6x − 11 and g(f(x)) = 6x + 1.
  // f(g(x)) = m(px + q) + b = mpx + (mq + b) = 6x − 11 → mp = 6, mq + b = −11.
  // g(f(x)) = p(mx + b) + q = pmx + (pb + q) = 6x + 1 → pm = 6 ✓, pb + q = 1.
  // So mp = 6, mq + b = −11, pb + q = 1.
  // Subtract: (mq + b) − (pb + q) = −12 → q(m − 1) − b(p − 1) = −12.
  // Also from mp = 6, try m = 2, p = 3: 2q + b = −11 and 3b + q = 1.
  // From second: q = 1 − 3b. Substitute: 2(1 − 3b) + b = −11 → 2 − 6b + b = −11 → −5b = −13 → b = 13/5. Ugly.
  // Try m = 3, p = 2: 3q + b = −11 and 2b + q = 1 → q = 1 − 2b → 3(1−2b)+b = −11 → 3 − 6b + b = −11 → −5b = −14 → b = 14/5. Still ugly.
  // Try m = 6, p = 1: 6q + b = −11 and b + q = 1 → b = 1 − q → 6q + 1 − q = −11 → 5q = −12 → q = −12/5. Ugly.
  // Redesign: f(g(2)) = ? given f(g(x)) = 6x − 11. Just evaluate: f(g(2)) = 6(2) − 11 = 1.
  // Also g(f(2)) = 6(2) + 1 = 13. Ask for f(g(2)) + g(f(2)) = 1 + 13 = 14.
  // Desmos resistance: can graph to see these are linear composites but question asks for sum.
  {
    id: 'sat-f7-v4-math-m2h-q03',
    section: 'math',
    moduleId: 'f7v4-math-module-2-hard',
    domain: 'Algebra',
    skill: 'Linear functions',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'Functions f and g are both linear. It is known that f(g(x)) = 6x − 11 and g(f(x)) = 6x + 1 for all values of x. What is the value of f(g(2)) + g(f(0))?',
    choices: [
      { label: 'A', text: '0' },
      { label: 'B', text: '1' },
      { label: 'C', text: '2' },
      { label: 'D', text: '14' },
    ],
    correctAnswer: 'C',
    explanation:
      'Evaluate each composite directly using the given formulas. f(g(2)) = 6(2) − 11 = 12 − 11 = 1. g(f(0)) = 6(0) + 1 = 1. Therefore f(g(2)) + g(f(0)) = 1 + 1 = 2. The key insight is that f(g(x)) and g(f(x)) are given as explicit formulas in x, so we substitute directly rather than solving for f and g individually.',
    wrongAnswerExplanations: {
      A: '0 results from computing f(g(2)) − g(f(0)) instead of the sum, or from incorrectly computing 6(2) − 11 = 1 and 6(0) + 1 = 1 and then subtracting.',
      B: '1 is the value of f(g(2)) alone; forgetting to add g(f(0)) gives this error.',
      D: '14 comes from evaluating f(g(2)) + g(f(2)) = 1 + 13 = 14 — using x = 2 in both expressions instead of x = 0 for the second.',
    },
  },

  // ─── Q04 · 7-8/10 · Advanced Math · Equivalent expressions ──────────────────────
  // VERIFY: Simplify (x² − 9)/(x² − x − 6) + (x − 2)/(x + 2) for x ≠ 3 and x ≠ −2.
  // Factor: x²−9 = (x−3)(x+3), x²−x−6 = (x−3)(x+2).
  // First fraction: (x−3)(x+3)/[(x−3)(x+2)] = (x+3)/(x+2) for x≠3.
  // Sum: (x+3)/(x+2) + (x−2)/(x+2) = [(x+3)+(x−2)]/(x+2) = (2x+1)/(x+2).
  // Check at x=1: (1−9)/(1−1−6) + (1−2)/(1+2) = (−8)/(−6) + (−1)/3 = 4/3 − 1/3 = 3/3 = 1.
  // (2(1)+1)/(1+2) = 3/3 = 1 ✓.
  // Choices must differ from this clean form to require real algebraic work.
  {
    id: 'sat-f7-v4-math-m2h-q04',
    section: 'math',
    moduleId: 'f7v4-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Equivalent expressions',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'Which of the following is equivalent to (x² − 9)/(x² − x − 6) + (x − 2)/(x + 2) for all x ≠ 3 and x ≠ −2?',
    choices: [
      { label: 'A', text: '(2x + 1)/(x + 2)' },
      { label: 'B', text: '(x + 1)/(x − 3)' },
      { label: 'C', text: '(2x − 1)/(x − 2)' },
      { label: 'D', text: '(x² − 4)/(x² − x − 6)' },
    ],
    correctAnswer: 'A',
    explanation:
      'Factor the denominators: x² − 9 = (x − 3)(x + 3) and x² − x − 6 = (x − 3)(x + 2). The first fraction becomes (x − 3)(x + 3)/[(x − 3)(x + 2)] = (x + 3)/(x + 2), valid for x ≠ 3. Now both fractions share the denominator (x + 2): (x + 3)/(x + 2) + (x − 2)/(x + 2) = (x + 3 + x − 2)/(x + 2) = (2x + 1)/(x + 2). Verify at x = 1: (−8)/(−6) + (−1)/3 = 4/3 − 1/3 = 1, and (2(1)+1)/(1+2) = 3/3 = 1 ✓.',
    wrongAnswerExplanations: {
      B: '(x + 1)/(x − 3) comes from incorrectly cancelling (x + 2) factors in the sum rather than combining over a common denominator.',
      C: '(2x − 1)/(x − 2) results from a sign error when combining the numerators: writing (x + 3) + (x − 2) = 2x − 1 instead of 2x + 1.',
      D: '(x² − 4)/(x² − x − 6) is found by adding the original numerators without first simplifying the first fraction — a failure to cancel the (x − 3) factor.',
    },
  },

  // ─── Q05 · 8/10 · Advanced Math · Nonlinear equations in one variable ─────────
  // VERIFY: Solve √(x + 6) = x. Square both sides: x + 6 = x² → x² − x − 6 = 0 → (x − 3)(x + 2) = 0.
  // Solutions to squared equation: x = 3 or x = −2.
  // Check x = −2: √(−2 + 6) = √4 = 2, but right side = −2. 2 ≠ −2. Extraneous ✗.
  // Check x = 3: √(3 + 6) = √9 = 3, and right side = 3. 3 = 3. ✓
  // Only valid solution: x = 3. Sum of valid solutions = 3.
  {
    id: 'sat-f7-v4-math-m2h-q05',
    section: 'math',
    moduleId: 'f7v4-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Nonlinear equations in one variable and systems of equations in two variables',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'How many real solutions does the equation √(x + 6) = x have, and what is the sum of those solutions?',
    choices: [
      { label: 'A', text: 'One solution; sum is 3' },
      { label: 'B', text: 'Two solutions; sum is 1' },
      { label: 'C', text: 'One solution; sum is −2' },
      { label: 'D', text: 'Two solutions; sum is 3' },
    ],
    correctAnswer: 'A',
    explanation:
      'Square both sides: x + 6 = x², so x² − x − 6 = 0, which factors as (x − 3)(x + 2) = 0, giving x = 3 or x = −2. Check x = −2: √(−2 + 6) = √4 = 2, but the right side is −2; since 2 ≠ −2, x = −2 is extraneous. Check x = 3: √(3 + 6) = √9 = 3 ✓. There is exactly one real solution, x = 3, with sum 3. Note: the square root is always non-negative, so x = √(x+6) ≥ 0, which immediately rules out x = −2.',
    wrongAnswerExplanations: {
      B: 'Two solutions with sum 1 results from accepting both x = 3 and x = −2 (sum = 3 + (−2) = 1) without checking for extraneous roots. Since √(x+6) ≥ 0, the solution x = −2 fails: √4 = 2 ≠ −2.',
      C: 'One solution with sum −2 results from keeping the extraneous root x = −2 and discarding the valid root x = 3. Always substitute back into the original equation — x = 3 satisfies √9 = 3 ✓, while x = −2 gives √4 = 2 ≠ −2.',
      D: 'Two solutions with sum 3 would require two valid roots that sum to 3; however, only x = 3 satisfies the original equation.',
    },
  },

  // ─── Q06 · 8/10 · Advanced Math · Nonlinear functions ──────────────────────────
  // VERIFY: p(x) = (x − r)(x − s)(x − t), roots r, s, t.
  // Given: r + s + t = 6 (Vieta: −coeff of x²), rs + rt + st = 11 (Vieta: coeff of x), rst = 6 (Vieta: −constant).
  // p(x) = x³ − 6x² + 11x − 6. Verify: (x−1)(x−2)(x−3) = (x²−3x+2)(x−3) = x³−3x²−3x²+9x+2x−6 = x³−6x²+11x−6. Roots 1,2,3 ✓.
  // r+s+t=1+2+3=6 ✓. rs+rt+st=2+3+6=11 ✓. rst=6 ✓.
  // Now ask for p(−1): (−1)³ − 6(−1)² + 11(−1) − 6 = −1 − 6 − 11 − 6 = −24.
  // Alternatively: p(−1) = (−1−1)(−1−2)(−1−3) = (−2)(−3)(−4) = −24 ✓.
  // Question setup: give Vieta conditions, ask for p(−1).
  {
    id: 'sat-f7-v4-math-m2h-q06',
    section: 'math',
    moduleId: 'f7v4-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'A cubic polynomial p(x) has three distinct real roots. The sum of the roots is 6, the sum of all pairwise products of the roots is 11, and the product of all three roots is 6. What is the value of p(−1) if the leading coefficient of p(x) is 1?',
    choices: [
      { label: 'A', text: '−30' },
      { label: 'B', text: '−24' },
      { label: 'C', text: '−18' },
      { label: 'D', text: '24' },
    ],
    correctAnswer: 'B',
    explanation:
      'By Vieta\'s formulas for a monic cubic x³ + bx² + cx + d with roots r, s, t: r + s + t = −b = 6, rs + rt + st = c = 11, and rst = −d = 6. So p(x) = x³ − 6x² + 11x − 6. Evaluating at x = −1: p(−1) = (−1)³ − 6(−1)² + 11(−1) − 6 = −1 − 6 − 11 − 6 = −24. Alternatively, the roots are 1, 2, and 3 (since 1+2+3=6, 1·2+1·3+2·3=11, 1·2·3=6), so p(−1) = (−1−1)(−1−2)(−1−3) = (−2)(−3)(−4) = −24.',
    wrongAnswerExplanations: {
      A: '−30 comes from computing (−1 − 1)(−1 − 2)(−1 − 4) = (−2)(−3)(−5) = −30, incorrectly identifying the roots as 1, 2, 4 rather than 1, 2, 3.',
      C: '−18 results from evaluating p(−1) = −1 − 6(1) + 11(−1) − 6 with a sign error on the last term, e.g., computing −1 − 6 − 11 + 0 = −18.',
      D: '24 comes from computing |p(−1)| correctly but forgetting the negative sign, or from evaluating p(1) = 1 − 6 + 11 − 6 = 0 and confusing p(1) with p(−1).',
    },
  },

  // ─── Q07 · 8/10 · Geometry and Trigonometry · Right triangles and trigonometry ─
  // VERIFY: Triangle ABC with right angle at C. sin(A) = 3/5, so cos(A) = 4/5, tan(A) = 3/4.
  // BC = 3k, AC = 4k, AB = 5k for some k.
  // Point D is on AB such that CD ⊥ AB (altitude from C to hypotenuse).
  // BD = BC²/AB = 9k²/5k = 9k/5. AD = AC²/AB = 16k²/5k = 16k/5.
  // CD = (BC · AC)/AB = 12k²/5k = 12k/5.
  // sin(∠CBD) in triangle BDC: sin(∠CBD) = CD/BC = (12k/5)/(3k) = 12/15 = 4/5.
  // But ∠CBD = ∠ABC since D is on AB.
  // sin(B) = AC/AB = 4k/5k = 4/5 = cos(A) ✓.
  // Question: what is tan(∠ACD)?
  // In triangle ACD: AC = 4k, AD = 16k/5, CD = 12k/5.
  // tan(∠ACD) = AD/CD = (16k/5)/(12k/5) = 16/12 = 4/3.
  // Note: ∠ACD + ∠A = 90° (since triangle ACD is right-angled at D), so tan(∠ACD) = tan(90°−A) = cot(A) = 1/tan(A) = 4/3 ✓.
  {
    id: 'sat-f7-v4-math-m2h-q07',
    section: 'math',
    moduleId: 'f7v4-math-module-2-hard',
    domain: 'Geometry and Trigonometry',
    skill: 'Right triangles and trigonometry',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'In right triangle ABC, the right angle is at C and sin(A) = 3/5. Point D lies on hypotenuse AB such that CD is perpendicular to AB. What is the value of tan(∠ACD)?',
    choices: [
      { label: 'A', text: '3/4' },
      { label: 'B', text: '3/5' },
      { label: 'C', text: '4/3' },
      { label: 'D', text: '4/5' },
    ],
    correctAnswer: 'C',
    explanation:
      'Since sin(A) = 3/5, use a 3-4-5 right triangle: BC = 3, AC = 4, AB = 5. The altitude from C to hypotenuse AB creates triangle ACD with the right angle at D. In triangle ACD, ∠A is the same angle A from the original triangle, ∠ADC = 90°, so ∠ACD = 90° − A. Therefore tan(∠ACD) = cot(A) = cos(A)/sin(A) = (4/5)/(3/5) = 4/3. Alternatively: AD = AC²/AB = 16/5 and CD = AC · BC/AB = 12/5, so tan(∠ACD) = AD/CD = (16/5)/(12/5) = 4/3.',
    wrongAnswerExplanations: {
      A: '3/4 is tan(A) itself — a student who computes tan(∠ACD) = tan(A) by confusing the angle in sub-triangle ACD with angle A.',
      B: '3/5 is sin(A), likely chosen by a student who reads sin instead of tan or who confuses ∠ACD with angle A.',
      D: '4/5 is cos(A) = sin(B), likely obtained by computing a trig ratio for angle A or B rather than for angle ACD.',
    },
  },

  // ─── Q08 · 8/10 · Problem-Solving and Data Analysis · Probability ──────────────
  // VERIFY: A table shows students by grade (11, 12) and subject preference (Math, Science, English).
  // Grade 11: Math=18, Science=12, English=10. Total Grade 11 = 40.
  // Grade 12: Math=14, Science=16, English=10. Total Grade 12 = 40.
  // Total Math=32, Total Science=28, Total English=20. Grand total=80.
  // P(Math | Grade 12) = 14/40 = 7/20.
  // P(Grade 12 | Science) = 16/28 = 4/7.
  // P(English | Grade 11) = 10/40 = 1/4.
  // Question asks for P(Grade 12 | Math) = 14/32 = 7/16.
  // Desmos resistance: table must be read carefully; conditional direction is easy to flip.
  {
    id: 'sat-f7-v4-math-m2h-q08',
    section: 'math',
    moduleId: 'f7v4-math-module-2-hard',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Probability and conditional probability',
    difficulty: 'hard',
    type: 'multiple_choice',
    stimulus:
      'The table below shows the distribution of 80 students by grade level and subject preference.\n\n| | Math | Science | English | Total |\n|---|---|---|---|---|\n| Grade 11 | 18 | 12 | 10 | 40 |\n| Grade 12 | 14 | 16 | 10 | 40 |\n| Total | 32 | 28 | 20 | 80 |',
    question:
      'A student is selected at random from those who prefer Math. What is the probability that the selected student is in Grade 12?',
    choices: [
      { label: 'A', text: '7/20' },
      { label: 'B', text: '7/16' },
      { label: 'C', text: '14/40' },
      { label: 'D', text: '9/16' },
    ],
    correctAnswer: 'B',
    explanation:
      'We want P(Grade 12 | Math) = P(Grade 12 AND Math) / P(Math) = (14/80) / (32/80) = 14/32 = 7/16. Of the 32 students who prefer Math, 14 are in Grade 12, giving probability 14/32 = 7/16.',
    wrongAnswerExplanations: {
      A: '7/20 = 14/40 is P(Math | Grade 12), the reverse conditional — a student who conditions on Grade 12 rather than on Math.',
      C: '14/40 equals 7/20 written with the Grade 12 total; this is the same reversal error as A, expressed differently.',
      D: '9/16 = 18/32 represents the Grade 11 Math students out of all Math students — selecting Grade 11 instead of Grade 12.',
    },
  },

  // ─── Q09 · 8/10 · Algebra · Linear equations in two variables ────────────────────
  // VERIFY: Line ℓ₁ has equation 4x − 3y = 12. Line ℓ₂ passes through origin and is perpendicular to ℓ₁.
  // Slope of ℓ₁: 4x − 3y = 12 → y = (4/3)x − 4. Slope = 4/3.
  // Slope of ℓ₂ (perpendicular): m = −3/4. ℓ₂: y = −(3/4)x.
  // Intersection: (4/3)x − 4 = −(3/4)x → (4/3 + 3/4)x = 4 → (16/12 + 9/12)x = 4 → (25/12)x = 4 → x = 48/25.
  // y = −(3/4)(48/25) = −144/100 = −36/25.
  // Distance from origin to intersection: √((48/25)² + (36/25)²) = (1/25)√(2304 + 1296) = (1/25)√3600 = 60/25 = 12/5.
  // Check: distance from origin to ℓ₁ = |4(0)−3(0)−12|/√(16+9) = 12/5 ✓ (foot of perpendicular from origin to line).
  // Question: what is the distance from the origin to the point where ℓ₁ and ℓ₂ intersect?
  {
    id: 'sat-f7-v4-math-m2h-q09',
    section: 'math',
    moduleId: 'f7v4-math-module-2-hard',
    domain: 'Algebra',
    skill: 'Linear equations in two variables',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'Line ℓ₁ has equation 4x − 3y = 12. Line ℓ₂ passes through the origin and is perpendicular to ℓ₁. What is the distance from the origin to the point of intersection of ℓ₁ and ℓ₂?',
    choices: [
      { label: 'A', text: '8/5' },
      { label: 'B', text: '12/5' },
      { label: 'C', text: '5/2' },
      { label: 'D', text: '3' },
    ],
    correctAnswer: 'B',
    explanation:
      'The slope of ℓ₁ is 4/3 (rewrite as y = (4/3)x − 4). The perpendicular slope is −3/4, so ℓ₂: y = −(3/4)x. Setting equal: (4/3)x − 4 = −(3/4)x → (4/3 + 3/4)x = 4 → (25/12)x = 4 → x = 48/25. Then y = −(3/4)(48/25) = −36/25. Distance from origin = √((48/25)² + (36/25)²) = (1/25)√(2304 + 1296) = (1/25)√3600 = 60/25 = 12/5. Equivalently, the distance from a point to a line formula gives |4(0) − 3(0) − 12|/√(4² + 3²) = 12/5.',
    wrongAnswerExplanations: {
      A: '8/5 comes from using the x-intercept of ℓ₁ (which is (3, 0)) and computing its distance to the origin as 3, then confusing with 8/5 from an intermediate calculation.',
      C: '5/2 results from computing the distance as 12/√(4·3·1) = 2.5, using the wrong denominator in the point-to-line formula.',
      D: '3 is the x-intercept of ℓ₁ (set y = 0: x = 3) — a student who finds the x-intercept and reports its distance to the origin.',
    },
  },

  // ─── Q10 · 8-9/10 · Advanced Math · Nonlinear functions ────────────────────────
  // VERIFY: f(x) = 2^(x/3). Two conditions: passes through (3, 2) — Check: 2^(3/3)=2^1=2 ✓.
  // Given g(x) = f(x+a) + b (transformation). g passes through (0, 3) and (6, 5).
  // g(0) = f(0+a) + b = 2^(a/3) + b = 3.
  // g(6) = f(6+a) + b = 2^((6+a)/3) + b = 2^(2+a/3) + b = 4 · 2^(a/3) + b = 5.
  // Let u = 2^(a/3): u + b = 3 and 4u + b = 5. Subtract: 3u = 2 → u = 2/3.
  // b = 3 − 2/3 = 7/3. a/3 = log₂(2/3) = log₂(2) − log₂(3) = 1 − log₂(3).
  // This gives messy a. Let me redesign.
  //
  // f(x) = 2^x. Exponential model. h(t) = A · 2^(t/k). h(0) = A = 100. h(3) = 100 · 2^(3/k) = 150.
  // 2^(3/k) = 3/2 → 3/k = log₂(3/2) → k = 3/log₂(3/2). Ask: at what time does h = 200?
  // h(t) = 200 → 2^(t/k) = 2 → t/k = 1 → t = k = 3/log₂(3/2). Messy.
  //
  // Redesign with clean numbers: h(t) = a · b^t. h(1) = 6, h(3) = 24.
  // h(3)/h(1) = ab³/(ab) = b² = 24/6 = 4 → b = 2. a = h(1)/b = 6/2 = 3.
  // h(t) = 3 · 2^t. When does h(t) = 96? 3 · 2^t = 96 → 2^t = 32 = 2^5 → t = 5.
  // Desmos resistance: question asks for what value of t, and while Desmos can graph it, student must understand the base-2 exponential structure.
  {
    id: 'sat-f7-v4-math-m2h-q10',
    section: 'math',
    moduleId: 'f7v4-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'An exponential function h is defined by h(t) = a · bᵗ, where a and b are positive constants. If h(1) = 6 and h(3) = 24, for what value of t does h(t) = 96?',
    choices: [
      { label: 'A', text: '4' },
      { label: 'B', text: '5' },
      { label: 'C', text: '6' },
      { label: 'D', text: '8' },
    ],
    correctAnswer: 'B',
    explanation:
      'From h(3)/h(1) = (a · b³)/(a · b) = b² = 24/6 = 4, so b = 2. Then a = h(1)/b = 6/2 = 3. Thus h(t) = 3 · 2ᵗ. Setting h(t) = 96: 3 · 2ᵗ = 96 → 2ᵗ = 32 = 2⁵ → t = 5. Verify: h(5) = 3 · 32 = 96 ✓.',
    wrongAnswerExplanations: {
      A: 't = 4 results from computing h(4) = 3 · 16 = 48, then mistakenly concluding t = 4 produces 96 by doubling — confusing h(4) with the target or computing one step instead of the correct two-step doubling.',
      C: 't = 6 comes from finding b = 2 correctly but then solving 2ᵗ = 96 directly rather than 2ᵗ = 32, mistakenly taking t = 6.',
      D: 't = 8 results from using b = 4 (confusing b² = 4 with b = 4) and solving 6 · 4ᵗ = 96 → 4ᵗ = 16 → t = 2, then incorrectly reading t = 8.',
    },
  },

  // ─── Q11 · 8-9/10 · Geometry and Trigonometry · Circles ────────────────────────
  // VERIFY: Circle C: x² + y² − 6x + 4y − 12 = 0.
  // Complete the square: (x−3)² − 9 + (y+2)² − 4 − 12 = 0 → (x−3)² + (y+2)² = 25.
  // Center (3, −2), radius = 5.
  // Line: y = (4/3)x + c is tangent to C.
  // Distance from center (3, −2) to line 4x − 3y + 3c = 0 (rewrite y = (4/3)x+c → 4x − 3y + 3c = 0... wait: (4/3)x − y + c = 0 → multiply by 3: 4x − 3y + 3c = 0).
  // Wait: y = (4/3)x + c → 4x − 3y + 3c = 0.
  // Distance = |4(3) − 3(−2) + 3c|/5 = |12 + 6 + 3c|/5 = |18 + 3c|/5 = 5.
  // |18 + 3c| = 25 → 18 + 3c = 25 or 18 + 3c = −25.
  // 3c = 7 → c = 7/3, or 3c = −43 → c = −43/3.
  // Sum of c values: 7/3 + (−43/3) = −36/3 = −12.
  // Product of c values: (7/3)(−43/3) = −301/9. Ugly.
  // Question: sum of the two values of c. Answer = −12.
  {
    id: 'sat-f7-v4-math-m2h-q11',
    section: 'math',
    moduleId: 'f7v4-math-module-2-hard',
    domain: 'Geometry and Trigonometry',
    skill: 'Circles',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'The equation x² + y² − 6x + 4y − 12 = 0 defines a circle in the xy-plane. The line y = (4/3)x + c is tangent to this circle for two values of the constant c. What is the sum of those two values of c?',
    choices: [
      { label: 'A', text: '−18' },
      { label: 'B', text: '−12' },
      { label: 'C', text: '6' },
      { label: 'D', text: '12' },
    ],
    correctAnswer: 'B',
    explanation:
      'Complete the square: (x − 3)² + (y + 2)² = 25, giving center (3, −2) and radius 5. Rewrite the tangent line as 4x − 3y + 3c = 0. The distance from (3, −2) to this line equals the radius: |4(3) − 3(−2) + 3c|/√(16 + 9) = |18 + 3c|/5 = 5. So |18 + 3c| = 25, giving 18 + 3c = 25 (→ c = 7/3) or 18 + 3c = −25 (→ c = −43/3). The sum is 7/3 + (−43/3) = −36/3 = −12.',
    wrongAnswerExplanations: {
      A: '−18 results from computing the sum before dividing: solving |18 + 3c| = 25 as 3c = 7 and 3c = −43, summing 3c values to get −36, but forgetting to divide by 3.',
      C: '6 comes from mistakenly using center (3, 2) instead of (3, −2) — a sign error in completing the square for y — giving |12 − 6 + 3c|/5 = 5, i.e., |6 + 3c| = 25, with c-values summing to −4, or from another computational variant.',
      D: '12 is the negative of the correct answer, arising from a consistent sign reversal throughout the distance calculation.',
    },
  },

  // ─── Q12 · 8-9/10 · Problem-Solving and Data Analysis · Statistical inference ───
  // VERIFY: Conceptual question about margin of error and confidence intervals.
  // A study reports: "The mean exam score is 74, with a 95% confidence interval of (70, 78)."
  // Margin of error = (78−70)/2 = 4.
  // Claims to evaluate:
  // I. 95% of individual scores lie between 70 and 78. FALSE — CI is about population mean, not individual scores.
  // II. If we repeated the sampling many times, approximately 95% of the resulting confidence intervals would contain the true population mean. TRUE — definition of 95% CI.
  // III. There is a 95% probability that the population mean lies between 70 and 78. AMBIGUOUS — frequentist interpretation says this CI either contains the true mean or it doesn't; but the question is whether this statement is correct under the correct interpretation.
  // Actually statement III is false under frequentist interpretation (the parameter is fixed), but commonly accepted under colloquial interpretation. For SAT purposes:
  // Question asks which statement is a correct interpretation of the confidence interval.
  {
    id: 'sat-f7-v4-math-m2h-q12',
    section: 'math',
    moduleId: 'f7v4-math-module-2-hard',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Inference from sample statistics and margin of error',
    difficulty: 'hard',
    type: 'multiple_choice',
    stimulus:
      'A researcher randomly selected 200 students from a large school and measured their scores on a standardized test. The sample mean was 74 points with a margin of error of 4 points at a 95% confidence level.',
    question:
      'Based on this study, which of the following is the best interpretation of the margin of error?',
    choices: [
      { label: 'A', text: 'Approximately 95% of all students at the school scored between 70 and 78 points.' },
      { label: 'B', text: 'The researcher is 95% confident that the true mean score for all students at the school is between 70 and 78 points.' },
      { label: 'C', text: 'There is a 95% probability that any randomly selected student scored between 70 and 78 points.' },
      { label: 'D', text: 'If a second sample of 200 students were selected, the sample mean would be between 70 and 78 points with 95% probability.' },
    ],
    correctAnswer: 'B',
    explanation:
      'The margin of error at a 95% confidence level means that we are 95% confident that the interval from (74 − 4) = 70 to (74 + 4) = 78 captures the true population mean. This is the correct interpretation of a confidence interval: it refers to the plausible range for the population mean, not for individual scores. Choice B correctly states this. A and C misapply the interval to individual scores. D describes re-sampling behavior but overstates it — a new sample mean need not fall within the original interval.',
    wrongAnswerExplanations: {
      A: 'This incorrectly applies the confidence interval to individual scores. A confidence interval estimates the population mean, not the distribution of individual data points.',
      C: 'Like A, this conflates the confidence interval for the mean with a range for individual observations. The 95% refers to the method\'s long-run success rate, not a probability statement about one student.',
      D: 'A second sample would yield its own confidence interval, and that interval might or might not overlap with the original. The margin of error doesn\'t guarantee where future sample means will fall.',
    },
  },

  // ─── Q13 · 8-9/10 · Advanced Math · Equivalent expressions ─────────────────────
  // VERIFY: We have x² + bx + c = (x + p)(x + q) where p + q = b and pq = c.
  // Problem: for which value of k does x² + kx + 9 factor as a perfect square (x + m)²?
  // (x + m)² = x² + 2mx + m². So m² = 9 → m = ±3. k = 2m = ±6.
  // So k = 6 or k = −6. But we want only one value; restrict to positive k: k = 6.
  //
  // Better question (more deception): ax² + bx + c. Complete the square.
  // 2x² + 12x + k = 2(x² + 6x) + k = 2[(x+3)² − 9] + k = 2(x+3)² − 18 + k.
  // Vertex is at (−3, k−18). Minimum value = k−18.
  // The expression equals 2(x+3)² + (k−18). Which form reveals the minimum directly?
  // The question asks: what value of k makes the minimum value equal to 5? k−18=5 → k=23.
  // Verify: 2x²+12x+23. Discriminant = 144 − 184 = −40 < 0, so no real roots. Minimum at x=−3: 2(9)+12(−3)+23 = 18−36+23 = 5 ✓.
  {
    id: 'sat-f7-v4-math-m2h-q13',
    section: 'math',
    moduleId: 'f7v4-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Equivalent expressions',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'The expression 2x² + 12x + k, where k is a constant, can be written in the form 2(x + 3)² + m for some constant m. If the minimum value of 2x² + 12x + k is 5, what is the value of k?',
    choices: [
      { label: 'A', text: '14' },
      { label: 'B', text: '23' },
      { label: 'C', text: '32' },
      { label: 'D', text: '41' },
    ],
    correctAnswer: 'B',
    explanation:
      'Completing the square: 2x² + 12x + k = 2(x² + 6x) + k = 2[(x + 3)² − 9] + k = 2(x + 3)² − 18 + k. So m = k − 18. The minimum value of 2(x + 3)² + m is m (since 2(x + 3)² ≥ 0 with equality at x = −3). Setting m = 5: k − 18 = 5, so k = 23. Verify: 2(−3)² + 12(−3) + 23 = 18 − 36 + 23 = 5 ✓.',
    wrongAnswerExplanations: {
      A: '14 results from setting k = 5 + 9 = 14, mistakenly computing m = k − 9 instead of m = k − 18 (forgetting the factor of 2 when expanding 2(x+3)² = 2x² + 12x + 18).',
      C: '32 comes from solving 2(k − 18) = 5 → k − 18 = 2.5 → k = 20.5, rounding incorrectly; or from computing k = 18 + 5 + 9 = 32, double-counting 9.',
      D: '41 results from setting the minimum equal to 2m: 2m = 5 → m = 2.5, then k = 18 + 2.5 × 9.2, a complete arithmetic error from misapplying the square-completion formula.',
    },
  },

  // ─── Q14 · 8-9/10 · Problem-Solving and Data Analysis · Percentages ─────────────
  // VERIFY: Price A = P. Increases by 20%: new price = 1.2P.
  // Then decreases by d%: final = 1.2P · (1 − d/100) = P · 0.96 (a 4% net decrease).
  // VERIFY: A jacket is marked up 25%, then marked down 20% from the marked-up price.
  // Net factor: 1.25 × 0.80 = 1.00. Final price = 100% of original → 0% net change.
  // The counterintuitive result is that the compounded changes cancel each other exactly.
  // Choices test three specific misconceptions:
  //   A ($96): Only reverses the 25% increase — ignores the 20% decrease.
  //   B ($114): Treats net change as a simple +5% (adds 25 − 20), so original = 120/1.05 ≈ 114.
  //   C ($120): Correct — 1.25 × 0.80 = 1.00, so final equals original.
  //   D ($150): Only reverses the 20% decrease — ignores the 25% increase.
  // Verify C: 120 × 1.25 = 150; 150 × 0.80 = 120 ✓.
  // Verify A is wrong: 96 × 1.25 = 120; 120 × 0.80 = 96 ≠ 120 ✗.
  // Verify D is wrong: 150 × 1.25 = 187.50; 187.50 × 0.80 = 150 ≠ 120 ✗.
  {
    id: 'sat-f7-v4-math-m2h-q14',
    section: 'math',
    moduleId: 'f7v4-math-module-2-hard',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Percentages',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'The price of a jacket was first increased by 25%, then decreased by 20% from the increased price. The final price is $120. What was the original price of the jacket, in dollars?',
    choices: [
      { label: 'A', text: '$96' },
      { label: 'B', text: '$114' },
      { label: 'C', text: '$120' },
      { label: 'D', text: '$150' },
    ],
    correctAnswer: 'C',
    explanation:
      'Let P be the original price. After a 25% increase: 1.25P. After a 20% decrease from that: 1.25P × 0.80 = 1.00P. The two changes cancel exactly, so the final price equals the original price. Since the final price is $120, the original price was also $120. Verify: $120 × 1.25 = $150; $150 × 0.80 = $120 ✓. The key insight is that a 25% increase followed by a 20% decrease does NOT produce a 5% net change — it produces a 0% net change because the 20% decrease is applied to the already-inflated price.',
    wrongAnswerExplanations: {
      A: '$96 results from reversing only the 25% increase: $120 ÷ 1.25 = $96. This ignores the 20% decrease. Verify that $96 is wrong: $96 × 1.25 = $120, then $120 × 0.80 = $96 ≠ $120.',
      B: '$114 results from treating the two percent changes as a simple sum: 25% − 20% = 5% net increase, giving $120 ÷ 1.05 ≈ $114. Percent changes compound multiplicatively, not additively: the net factor is 1.25 × 0.80 = 1.00, not 1.05.',
      D: '$150 results from reversing only the 20% decrease: $120 ÷ 0.80 = $150. This ignores the 25% increase. Verify: $150 × 1.25 = $187.50, then $187.50 × 0.80 = $150 ≠ $120.',
    },
  },

  // ─── Q15 · 8-9/10 · Advanced Math · Nonlinear equations — rational function ──────
  // VERIFY: g(x) = (x² − x − 6)/(x² − kx + 4) has exactly one value of x not in the domain.
  // x not in domain when denominator = 0: x² − kx + 4 = 0.
  // For exactly one excluded value, the quadratic has exactly one real root (discriminant = 0):
  // k² − 16 = 0 → k² = 16 → k = 4 or k = −4.
  // For k = 4: denominator = x² − 4x + 4 = (x−2)². Only x = 2 excluded.
  // Check if x = 2 also makes numerator = 0: 4 − 2 − 6 = −4 ≠ 0. So x = 2 is truly excluded (not removable). ✓
  // For k = −4: denominator = x² + 4x + 4 = (x+2)². Only x = −2 excluded.
  // Check numerator at x = −2: 4 + 2 − 6 = 0. So numerator is also 0 at x = −2: removable discontinuity!
  // Factor numerator: x² − x − 6 = (x − 3)(x + 2). So g(x) = (x−3)(x+2)/(x+2)² = (x−3)/(x+2) for x ≠ −2.
  // This means the "hole" at x = −2 means the function has a removable discontinuity, not a vertical asymptote.
  // If "not in the domain" means any x where denominator = 0, then k = −4 gives x = −2 excluded.
  // But if we require it to be a true (non-removable) exclusion, only k = 4 works.
  // Question: for how many values of k does g(x) have exactly one x-value not in its domain?
  // If we count removable discontinuities: both k = 4 and k = −4 give one excluded x-value. Sum = 0.
  // Refined question: what is the sum of all values of k for which g has exactly one vertical asymptote?
  // Only k = 4 gives a true asymptote. k = −4 gives a hole and no asymptote.
  // Answer: k = 4. But if question asks sum, only one value.
  // Let me redesign the question to ask for the product of all k-values satisfying the "excluded domain" condition (any k where discriminant = 0, i.e., k = ±4). Product = −16.
  {
    id: 'sat-f7-v4-math-m2h-q15',
    section: 'math',
    moduleId: 'f7v4-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Nonlinear equations in one variable and systems of equations in two variables',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'The function g is defined by g(x) = (x² − x − 6)/(x² − kx + 4), where k is a constant. For two values of k, the denominator of g has exactly one real root (counting multiplicity). For which of these two values of k does g have a vertical asymptote (rather than a removable discontinuity) at the excluded x-value?',
    choices: [
      { label: 'A', text: 'k = −4 only' },
      { label: 'B', text: 'k = 4 only' },
      { label: 'C', text: 'Both k = −4 and k = 4' },
      { label: 'D', text: 'Neither k = −4 nor k = 4' },
    ],
    correctAnswer: 'B',
    explanation:
      'The denominator x² − kx + 4 has a double root when its discriminant is zero: k² − 16 = 0, giving k = 4 or k = −4. For k = 4: denominator = (x − 2)², excluded x = 2. Check the numerator x² − x − 6 = (x − 3)(x + 2) at x = 2: (2 − 3)(2 + 2) = (−1)(4) = −4 ≠ 0. Since the numerator is nonzero at x = 2, the function has a true vertical asymptote there. For k = −4: denominator = (x + 2)², excluded x = −2. Numerator at x = −2: (−2 − 3)(−2 + 2) = (−5)(0) = 0. The factor (x + 2) appears in both numerator and denominator, creating a removable discontinuity (hole), not a vertical asymptote. Therefore only k = 4 produces a vertical asymptote.',
    wrongAnswerExplanations: {
      A: 'k = −4 produces a removable discontinuity because (x + 2) is a common factor of numerator and denominator, not a vertical asymptote.',
      C: 'Only k = 4 creates a vertical asymptote; k = −4 creates a hole because the excluded x-value also zeros the numerator.',
      D: 'Both values make the denominator have a repeated root; the distinction is whether the numerator also vanishes, which only k = −4 triggers.',
    },
  },

  // ─── Q16 · 9/10 · Geometry and Trigonometry · Area and volume ───────────────────
  // VERIFY: Cone with base radius r and height h. A plane parallel to the base cuts the cone at height h/3 from the apex.
  // The cross-section is a smaller, similar cone with height h/3 and radius r/3 (by similar triangles: ratio = (h/3)/h = 1/3).
  // Volume of small cone (apex to cut): (1/3)π(r/3)²(h/3) = (1/3)π(r²/9)(h/3) = πr²h/81.
  // Volume of full cone: (1/3)πr²h.
  // Volume of frustum (bottom portion): (1/3)πr²h − πr²h/81 = πr²h(27/81 − 1/81) = πr²h(26/81).
  // Fraction of total volume in frustum = 26/81.
  // Fraction in top small cone = 1/27.
  // Desmos resistant: requires recognizing the similar-cone ratio and computing two volumes.
  {
    id: 'sat-f7-v4-math-m2h-q16',
    section: 'math',
    moduleId: 'f7v4-math-module-2-hard',
    domain: 'Geometry and Trigonometry',
    skill: 'Area and volume',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'A solid right circular cone has base radius r and height h. A plane parallel to the base cuts the cone at a distance of h/3 from the apex, creating a smaller cone on top and a frustum on the bottom. What fraction of the total cone\'s volume is the volume of the frustum?',
    choices: [
      { label: 'A', text: '2/3' },
      { label: 'B', text: '24/27' },
      { label: 'C', text: '26/27' },
      { label: 'D', text: '26/81' },
    ],
    correctAnswer: 'C',
    explanation:
      'The plane cuts at distance h/3 from the apex, so the small cone has height h/3. By similar triangles, its base radius is r · (h/3)/h = r/3. Volume of small cone: (1/3)π(r/3)²(h/3) = (1/3)π(r²/9)(h/3) = πr²h/81. Volume of full cone: (1/3)πr²h = 27πr²h/81. Frustum volume: (27 − 1)πr²h/81 = 26πr²h/81. Fraction of total: (26πr²h/81)/(27πr²h/81) = 26/27.',
    wrongAnswerExplanations: {
      A: '2/3 results from treating the cut as occurring at h/3 from the base (not the apex), giving a small cone of height 2h/3 with volume 8/27 of the total, leaving 1 − 8/27 = 19/27, or from a simple ratio error.',
      B: '24/27 = 8/9 comes from computing the linear scale factor 1/3 and subtracting its square (1/9) rather than its cube (1/27): 1 − 1/9 = 8/9.',
      D: '26/81 is the fraction as a part of 81 units, but the denominator should be 27 (the whole cone\'s 27 units), not 81; this error treats the frustum volume numerator correctly but uses the wrong total.',
    },
  },

  // ─── Q17 · 9/10 · Advanced Math · Nonlinear functions — grid in ─────────────────
  // VERIFY: f(x) = x³ − 7x + 6. Find the value of [f(x+h) − f(x)]/h as h → 0... no calculus.
  // Alternative: f(x) = x³ − 6x² + 11x − 6 = (x−1)(x−2)(x−3). Roots: 1, 2, 3.
  // Given g(x) = f(x)/x for x ≠ 0. Find the sum of all x where g(x) = 0.
  // g(x) = 0 when f(x) = 0 and x ≠ 0: roots of f that are ≠ 0.
  // Roots of f: 1, 2, 3. None is 0. Sum = 1 + 2 + 3 = 6.
  //
  // Better: p(x) = x⁴ − 5x² + 4 = (x²−1)(x²−4) = (x−1)(x+1)(x−2)(x+2). Roots: ±1, ±2. Sum = 0.
  //
  // Truly hard: Given that x = 2 is a root of p(x) = x³ + ax² + bx − 12 and x = −3 is also a root, find the third root.
  // p(2) = 8 + 4a + 2b − 12 = 0 → 4a + 2b = 4 → 2a + b = 2. ... (i)
  // p(−3) = −27 + 9a − 3b − 12 = 0 → 9a − 3b = 39 → 3a − b = 13. ... (ii)
  // (i)+(ii): 5a = 15 → a = 3. b = 2 − 2(3) = −4.
  // p(x) = x³ + 3x² − 4x − 12. By Vieta: product of roots = 12 (since constant = −12, leading coeff = 1, product = 12/1 = 12).
  // Sum of roots = −3 (coeff of x²). 2 + (−3) + r = −3 → r = −2.
  // Or factor: p(x)/(x−2)/(x+3): p(x) = (x−2)(x+3)(x+2). Third root = −2.
  // Check: p(−2) = −8 + 12 + 8 − 12 = 0 ✓.
  // Grid-in answer: −2. Acceptable: −2.
  {
    id: 'sat-f7-v4-math-m2h-q17',
    section: 'math',
    moduleId: 'f7v4-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'The polynomial p(x) = x³ + ax² + bx − 12 has roots at x = 2 and x = −3, where a and b are constants. What is the third root of p(x)?',
    correctAnswer: '-2',
    acceptableAnswers: ['-2'],
    explanation:
      'Using p(2) = 0: 8 + 4a + 2b − 12 = 0 → 2a + b = 2 ... (1). Using p(−3) = 0: −27 + 9a − 3b − 12 = 0 → 3a − b = 13 ... (2). Adding (1) and (2): 5a = 15 → a = 3, then b = 2 − 6 = −4. So p(x) = x³ + 3x² − 4x − 12. By Vieta\'s formulas, the sum of roots = −a = −3, so 2 + (−3) + r = −3 → r = −2. Verify: p(−2) = −8 + 12 + 8 − 12 = 0 ✓. Alternatively, factor: p(x) = (x − 2)(x + 3)(x + 2), confirming the third root is −2.',
    scoringNotes: 'Grid-in accepts −2. Students may not grid negatives incorrectly — the negative sign must be entered.',
  },

  // ─── Q18 · 9/10 · Algebra · Linear inequalities in one or two variables — grid in ─
  // VERIFY: Find the number of integer solutions to |2x − 5| < 7 AND x² < 25.
  // |2x − 5| < 7: −7 < 2x − 5 < 7 → −2 < 2x < 12 → −1 < x < 6.
  // x² < 25: −5 < x < 5.
  // Intersection: −1 < x < 5.
  // Integer solutions: x = 0, 1, 2, 3, 4. Count = 5.
  // Desmos resistant: combining a linear inequality with a nonlinear one and counting integers.
  {
    id: 'sat-f7-v4-math-m2h-q18',
    section: 'math',
    moduleId: 'f7v4-math-module-2-hard',
    domain: 'Algebra',
    skill: 'Linear inequalities in one or two variables',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'How many integers x satisfy both |2x − 5| < 7 and x² < 25 simultaneously?',
    correctAnswer: '5',
    acceptableAnswers: ['5'],
    explanation:
      'Solve |2x − 5| < 7: this gives −7 < 2x − 5 < 7, so −2 < 2x < 12, meaning −1 < x < 6. Solve x² < 25: −5 < x < 5. The intersection of −1 < x < 6 and −5 < x < 5 is −1 < x < 5. The integers in this range are x = 0, 1, 2, 3, 4 — a total of 5 integers. Note: x = −1 and x = 5 are excluded because the inequalities are strict.',
    scoringNotes: 'Integer count only; answer is exactly 5.',
  },

  // ─── Q19 · 9/10 · Geometry and Trigonometry · Lines, angles, and triangles ─────
  // VERIFY: Triangle ABC. A = (0,0), B = (12,0), C = (0,9). AC = 9, BC = 15, AB = 12.
  // Right angle at A. altitude from C to AB is AC⊥AB since A is already at origin and AB is on x-axis. Wait — right angle at A means legs are AB=12 and AC=9.
  // Wait: C = (0,9), A=(0,0), B=(12,0). CA = 9 (vertical), AB = 12 (horizontal), CB = √(144+81) = √225 = 15.
  // The altitude from C to hypotenuse CB: need the altitude from A to hypotenuse CB.
  // Altitude from A to CB: foot D on CB.
  // Line CB: from C=(0,9) to B=(12,0). Direction vector: (12, −9). Parametric: (12t, 9−9t).
  // AD = D − A = (12t, 9−9t). Perpendicular to CB: (12t)(12) + (9−9t)(−9) = 0.
  // 144t − 81 + 81t = 0 → 225t = 81 → t = 81/225 = 9/25.
  // D = (12 · 9/25, 9 − 9 · 9/25) = (108/25, 9 − 81/25) = (108/25, 225/25 − 81/25) = (108/25, 144/25).
  // AD = √((108/25)² + (144/25)²) = (1/25)√(11664 + 20736) = (1/25)√32400 = 180/25 = 36/5.
  // Alternatively: altitude to hypotenuse = (leg₁ · leg₂)/hypotenuse = (12 · 9)/15 = 108/15 = 36/5 ✓.
  // Grid-in: 36/5 = 7.2. acceptableAnswers: ['36/5', '7.2'].
  {
    id: 'sat-f7-v4-math-m2h-q19',
    section: 'math',
    moduleId: 'f7v4-math-module-2-hard',
    domain: 'Geometry and Trigonometry',
    skill: 'Lines, angles, and triangles',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'In right triangle ABC, the right angle is at vertex A. The leg AB has length 12 and the leg AC has length 9. What is the length of the altitude drawn from vertex A to the hypotenuse BC?',
    correctAnswer: '36/5',
    acceptableAnswers: ['36/5', '7.2', '7.20'],
    explanation:
      'The hypotenuse BC = √(AB² + AC²) = √(144 + 81) = √225 = 15. The altitude from the right angle to the hypotenuse has length h = (AB · AC)/BC = (12 · 9)/15 = 108/15 = 36/5 = 7.2. This follows from the area formula: the area of triangle ABC = (1/2)(AB)(AC) = (1/2)(12)(9) = 54, and also = (1/2)(BC)(h) = (1/2)(15)h. Setting equal: 15h/2 = 54 → h = 108/15 = 36/5.',
    scoringNotes: 'Acceptable: 36/5 or 7.2 or 7.20. Both fraction and decimal forms acceptable.',
  },

  // ─── Q20 · 10/10 · Advanced Math · Nonlinear equations — grid in ─────────────────
  // VERIFY: System: y = x² − 4x + 7 and y = 2x − 1.
  // Substitute: x² − 4x + 7 = 2x − 1 → x² − 6x + 8 = 0 → (x−2)(x−4) = 0 → x = 2 or x = 4.
  // At x = 2: y = 4 − 8 + 7 = 3. Point (2, 3). Check: 2(2)−1 = 3 ✓.
  // At x = 4: y = 16 − 16 + 7 = 7. Point (4, 7). Check: 2(4)−1 = 7 ✓.
  // Two intersection points: (2, 3) and (4, 7). Distance between them:
  // d = √((4−2)² + (7−3)²) = √(4 + 16) = √20 = 2√5.
  // But grid-in needs a number. 2√5 ≈ 4.47. Not clean.
  // Instead ask: what is the value of x₁² + x₂² where x₁, x₂ are x-coordinates?
  // x₁² + x₂² = (x₁ + x₂)² − 2x₁x₂ = 6² − 2(8) = 36 − 16 = 20. Grid-in: 20.
  // Desmos resistance: graph shows intersection points at x = 2 and x = 4, but question asks for x₁² + x₂² which requires Vieta's formulas — not directly read from graph.
  {
    id: 'sat-f7-v4-math-m2h-q20',
    section: 'math',
    moduleId: 'f7v4-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Nonlinear equations in one variable and systems of equations in two variables',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'The parabola y = x² − 4x + 7 and the line y = 2x − 1 intersect at two points in the xy-plane. If x₁ and x₂ are the x-coordinates of these two points, what is the value of x₁² + x₂²?',
    correctAnswer: '20',
    acceptableAnswers: ['20'],
    explanation:
      'Substitute y = 2x − 1 into y = x² − 4x + 7: x² − 4x + 7 = 2x − 1, so x² − 6x + 8 = 0. By Vieta\'s formulas: x₁ + x₂ = 6 and x₁x₂ = 8. Then x₁² + x₂² = (x₁ + x₂)² − 2x₁x₂ = 36 − 16 = 20. Verification: the roots are x = 2 and x = 4 (from (x − 2)(x − 4) = 0), so 2² + 4² = 4 + 16 = 20 ✓. The Desmos-resistant element is that the question asks for x₁² + x₂², which requires algebraic manipulation of Vieta\'s formulas rather than direct reading of intersection coordinates.',
    scoringNotes: 'Answer is exactly 20. No alternate forms needed.',
  },

  // ─── Q21 · 10/10 · Geometry and Trigonometry · Circles — grid in ─────────────────
  // VERIFY: A circle has center O = (0,0) and radius 5. A chord PQ has endpoints on the circle with midpoint M = (3, 0).
  // Since M is the midpoint of PQ and O = (0,0): OM ⊥ PQ (perpendicular from center to chord bisects chord).
  // OM = 3. Half-chord length = √(r² − OM²) = √(25 − 9) = √16 = 4. So PQ = 8.
  // A second chord RS passes through M and is perpendicular to PQ (so RS is horizontal, along y = 0... wait, PQ is perpendicular to OM, so PQ is vertical).
  // OM is along x-axis (horizontal). PQ ⊥ OM → PQ is vertical. P = (3, 4), Q = (3, −4). PQ = 8.
  // RS passes through M = (3, 0) and is perpendicular to PQ, so RS is horizontal.
  // RS on y = 0 (x-axis). Intersect circle x²+y²=25 at y=0: x²=25 → x=±5. R=(−5,0), S=(5,0). RS = 10.
  // But that's just the diameter. Too easy.
  //
  // Better: Two chords AB and CD intersect inside the circle at point P.
  // AP = 3, PB = 8, CP = 4. Find PD.
  // Intersecting chords theorem: AP · PB = CP · PD → 3 · 8 = 4 · PD → 24 = 4PD → PD = 6.
  //
  // Make it harder: chord AB has length 14 and chord CD has length 13. They intersect at P where AP = 6 (so PB = 8). Find CP and PD.
  // AP · PB = CP · PD → 6 · 8 = CP · PD = 48. Also CP + PD = 13.
  // CP · PD = 48 and CP + PD = 13. So CP and PD are roots of t² − 13t + 48 = 0.
  // Discriminant = 169 − 192 = −23 < 0. No real solution. Inconsistent.
  // Try: chord AB = 10 (AP=3, PB=7), CP+PD=11. CP·PD=21. t²−11t+21=0. Disc=121−84=37. Not integer.
  // Use: AP=4, PB=9 → product=36. CD=13 → CP+PD=13. t²−13t+36=0 → (t−4)(t−9)=0. CP=4 or 9, PD=9 or 4. CP=4, PD=9 (or reversed).
  // Question: what is CP if CP < PD? Answer: 4.
  // But now add a complexity layer: the circle has radius r. Find r given that A, B, C, D lie on the circle and the chords are as above.
  // AB = 13, CD = 13. Both have length 13. Their midpoints from center...
  // Perpendicular from center to AB bisects AB: if AB = 13 and AP = 4, PB = 9, the midpoint of AB is 6.5 from A, so midpoint is 6.5 − 4 = 2.5 from P.
  // Distance from center O to AB: √(r² − (13/2)²) = √(r² − 169/4).
  // Let the foot of perpendicular from O to AB be M₁ and to CD be M₂.
  // M₁ is midpoint of AB, distance from P to M₁ = |6.5 − 4| = 2.5.
  // M₂ is midpoint of CD, distance from P to M₂ = |6.5 − 4| = 2.5 (same by symmetry since CP=4, PD=9, CD=13, midpoint at 6.5, distance from P = 2.5).
  // OM₁ = OM₂. Let OM₁ = d (same for both since same chord length).
  // In triangle OM₁P: OP² = OM₁² + PM₁² (if OM₁ ⊥ AB and PM₁ is along AB): OP² = d² + 2.5².
  // For circle: d² + (6.5)² = r² → d = √(r² − 42.25).
  // OP² = r² − 42.25 + 6.25 = r² − 36. Need another condition to find r.
  // OP = distance between intersection point P and center O.
  // This requires knowing coordinates of P. Without more info, r is indeterminate.
  //
  // FINAL CLEAN DESIGN for Q21 (10/10 difficulty):
  // Chord AB and chord CD intersect at P inside a circle of radius 5. AP = 2, PB = 8. CD is a diameter.
  // Since CD is a diameter, CD = 2r = 10. CP · PD = AP · PB = 2 · 8 = 16. CP + PD = 10.
  // t² − 10t + 16 = 0 → (t−2)(t−8) = 0 → CP = 2, PD = 8 (or reversed).
  // So P is at distance 2 from C and 8 from D (where CD is the diameter).
  // Center O is midpoint of diameter CD. OP = |CP − r| = |2 − 5| = 3 (P is 3 from center along the diameter).
  // Distance from P to center O = CP − r/2? Wait: if C and D are endpoints and O is midpoint, CO = OD = 5.
  // OP = CO − CP = 5 − 2 = 3 (P is between C and O since CP = 2 < 5).
  // Now: what is the distance from O to chord AB?
  // AB is a chord. OP = 3 (along the diameter). AP = 2, PB = 8. AB = 10.
  // Let M be the midpoint of AB. AM = MB = 5. PM = AM − AP = 5 − 2 = 3 (if A, P, M, B in that order).
  // Wait: AP = 2, PB = 8, AB = 10, midpoint M is at 5 from A. PM = |MP| = |5 − 2| = 3.
  // OM ⊥ AB and OM is the distance from O to AB. In triangle OPM (right-angled at M):
  // OM² + PM² = OP² → Wait, we need the angle between OP and AB.
  // OP is along CD (the diameter). AB intersects CD at P. The angle between AB and CD is θ.
  // OM ⊥ AB, PM is along AB, PM = 3. OP = 3.
  // The right triangle OPM: OM² = OP² − PM² (if ∠OMP = 90°) — but ∠OMP = 90° only if OM ⊥ PM, which holds since OM ⊥ AB and PM is along AB. Yes!
  // OM² = OP² − PM² = 9 − 9 = 0 → OM = 0.
  // So the center O lies on chord AB! That means AB is also a diameter!
  // But then AB and CD are both diameters intersecting at P... and if OP = 3 ≠ 0, P ≠ O, contradiction.
  // I made an error: if OM ⊥ AB and PM is along AB, then right triangle OPM has:
  // OP² = OM² + MP² → 9 = OM² + 9 → OM = 0. So O lies on AB, making AB a diameter of length 10. ✓ But AP=2, PB=8, so P ≠ O (which is midpoint of AB), consistent with P being the intersection at distance 2 from one end of diameter AB.
  // But we said AB is NOT specified as a diameter, just a chord. The math says it must be a diameter given these conditions. The question can ask: "Is AB a diameter?" No — let me pick different numbers.
  //
  // NEW numbers: r=5, AP=3, PB=3 (so AB is a chord with midpoint at P, since equal segments). Then CP·PD=9, CP+PD=10. t²-10t+9=0 → (t−1)(t−9)=0 → CP=1, PD=9 (or reversed).
  // O is midpoint of CD. CP=1, so OP = CO−CP = 5−1 = 4. P is 4 from O along diameter CD.
  // AB has midpoint at P (since AP=PB=3). So OM=0 (O lies on AB? No: M is midpoint of AB = P, so OM = OP = 4.
  // Distance from O to AB = OM = OP... No, OM ⊥ AB. O does not necessarily lie on AB.
  // Distance from O to AB: Let d = OM. r² = d² + (AB/2)² = d² + 9 → 25 = d² + 9 → d = 4.
  // And OP = 4 (computed above). So OM = OP = 4. This means O, M, P are related.
  // M = P (midpoint of AB is P). OM = distance from O to P = 4. OM ⊥ AB means OP ⊥ AB.
  // But OP is along CD (since P is on diameter CD) and OM ⊥ AB means CD ⊥ AB. So AB ⊥ CD.
  // Interesting constraint: when CD is a diameter and AB's midpoint is P, then AB ⊥ CD.
  // So with these numbers, AB ⊥ CD is forced. The problem would need to say AB ⊥ CD.
  //
  // TRULY HARD Q21: Intersecting chords with a parameter and asking for a non-obvious derived quantity.
  // Circle with radius 5. Chords AB and CD intersect at P. Given:
  //   - AP = t, PB = 4, so AB = t + 4.
  //   - CP = 2t − 1, PD = 2, so CD = 2t + 1.
  //   - Intersecting chords: AP · PB = CP · PD → 4t = 2(2t−1) = 4t − 2. This gives 0 = −2. Contradiction!
  // Try: AP·PB = CP·PD → t·4 = (2t−1)·2 → 4t = 4t−2 → 0 = −2. Still contradiction.
  // Try: AP=t, PB=9−t, CP=3, PD = t(9−t)/3.
  // Use t=3: AP=3, PB=6, product=18. CP=3, PD=6. CD=9.
  // Half of AB: 4.5. Distance from O to AB: √(25−20.25)=√4.75 — messy.
  //
  // FINAL FINAL CLEAN Q21: Use Power of a Point (external version — secant from external point).
  // External point P outside circle of radius 5. Two secants from P:
  // Secant 1: passes through A (near) and B (far). PA = 2, PB = 8.
  // Secant 2: passes through C (near) and D (far). PC = k, PD = k + 10 (CD = 10 = diameter).
  // Power of point: PA · PB = PC · PD → 16 = k(k+10) → k² + 10k − 16 = 0 → k = (−10 ± √(100+64))/2 = (−10 ± √164)/2. Not clean.
  //
  // Use: PA=1, PB=9. Power = 9. PC · PD = 9. CD = 10. PC(PC+10)=9 → PC²+10PC−9=0 → PC=(−10+√136)/2. Not clean.
  //
  // RESET Q21 to a clean, hard geometry+algebra problem:
  // Circle with equation (x−1)²+(y−2)²=25. Line y=mx passes through origin and is tangent to the circle.
  // Find all values of m, then compute their sum.
  // Distance from (1,2) to line mx−y=0: |m(1)−2|/√(m²+1) = 5.
  // (m−2)²/(m²+1) = 25 → (m−2)² = 25(m²+1) → m²−4m+4 = 25m²+25 → 24m²+4m+21=0.
  // Discriminant = 16 − 4(24)(21) = 16 − 2016 < 0. No real solutions! Circle centered at (1,2) radius 5 — origin is inside the circle since distance from center to origin = √(1+4) = √5 < 5. Lines through an interior point cannot be tangent. Correct: no tangent lines through the origin.
  //
  // FINAL Q21: Power of a Point — clean integer version.
  // A point P is outside a circle. From P, a tangent PT and a secant PRS are drawn.
  // PT = 6, PR = 3. What is the length RS?
  // Power of point: PT² = PR · PS → 36 = 3 · PS → PS = 12. RS = PS − PR = 12 − 3 = 9.
  // Too simple. Add: also, the chord through the circle from P in a second direction has near-distance PA and far-distance PB with PA + PB = 20 and PA · PB = 36. Find PA.
  // PA and PB: sum = 20, product = 36. t² − 20t + 36 = 0 → t = (20 ± √(400−144))/2 = (20 ± 16)/2 → t = 18 or t = 2.
  // PA = 2 (near), PB = 18 (far). RS = PS − PR = 9 as before.
  // Question: what is RS + PA = 9 + 2 = 11? Not interesting.
  //
  // NOTE: Q22 below is also grid_in per spec (Q17–Q22 all grid_in). Q21 grid_in confirmed.
  // Q21 FINAL FINAL: Hard circle + quadratic system (10/10).
  // The circle C₁ has equation x² + y² = 25 and the circle C₂ has equation (x−7)² + y² = 16.
  // Find the x-coordinate of each intersection point. Subtract: x²+y²=25 and (x-7)²+y²=16.
  // Subtract: x²−(x−7)²= 25−16 = 9 → x²−x²+14x−49 = 9 → 14x = 58 → x = 58/14 = 29/7.
  // Then y²= 25−(29/7)² = 25 − 841/49 = (1225−841)/49 = 384/49. y = ±√(384/49) = ±8√6/7. Not clean.
  //
  // Use centers (0,0) r=5 and (8,0) r=5: same radii. Intersection: x²+y²=25 and (x-8)²+y²=25.
  // Subtract: x²−(x−8)² = 0 → 16x−64 = 0 → x = 4. y² = 25−16 = 9 → y = ±3.
  // Two intersection points (4, 3) and (4, −3). Distance between them = 6.
  // The question should ask something non-trivial after finding this.
  // Ask: what is the area of the quadrilateral formed by the two circle centers and the two intersection points?
  // Centers: O₁=(0,0), O₂=(8,0). Intersections: P=(4,3), Q=(4,−3).
  // Quadrilateral O₁PO₂Q: vertices (0,0),(4,3),(8,0),(4,−3). This is a rhombus (by symmetry).
  // Diagonals: O₁O₂ = 8 (horizontal), PQ = 6 (vertical). Area = (d₁ · d₂)/2 = (8 · 6)/2 = 24.
  // Grid-in: 24. This is a clean, hard problem requiring multiple steps.
  {
    id: 'sat-f7-v4-math-m2h-q21',
    section: 'math',
    moduleId: 'f7v4-math-module-2-hard',
    domain: 'Geometry and Trigonometry',
    skill: 'Circles',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'Two circles, each with radius 5, have centers at (0, 0) and (8, 0). The two circles intersect at two points P and Q. What is the area of the quadrilateral whose vertices are the two centers and the two intersection points?',
    correctAnswer: '24',
    acceptableAnswers: ['24'],
    explanation:
      'Find the intersection points by subtracting the circle equations. Circle 1: x² + y² = 25. Circle 2: (x − 8)² + y² = 25. Expanding Circle 2: x² − 16x + 64 + y² = 25. Subtracting Circle 1: −16x + 64 = 0 → x = 4. Then y² = 25 − 16 = 9 → y = ±3. So P = (4, 3) and Q = (4, −3). The four vertices of the quadrilateral are O₁ = (0, 0), P = (4, 3), O₂ = (8, 0), Q = (4, −3). This quadrilateral is a rhombus (each side equals √(16 + 9) = 5). Its diagonals are O₁O₂ (length 8) and PQ (length 6), which are perpendicular. Area = (d₁ · d₂)/2 = (8 · 6)/2 = 24.',
    scoringNotes: 'Answer is exactly 24. No alternate forms needed.',
  },

  // ─── Q22 · 10/10 · Advanced Math · Nonlinear functions — multiple choice ────────
  // VERIFY: f(x) = x³ + ax² + bx + c has three distinct real roots p, q, r satisfying:
  //   p + q + r = 5  (Vieta: −a = 5 → a = −5)
  //   pq + pr + qr = 7  (Vieta: b = 7)
  //   pqr = 2  (Vieta: −c = 2 → c = −2)
  // So f(x) = x³ − 5x² + 7x − 2.
  // The question asks for f(1) + f(−1) − a − b − c.
  // f(1) = 1 − 5 + 7 − 2 = 1.
  // f(−1) = −1 − 5 − 7 − 2 = −15.
  // a = −5, b = 7, c = −2. a + b + c = −5 + 7 − 2 = 0.
  // f(1) + f(−1) − (a + b + c) = 1 + (−15) − 0 = −14.
  //
  // Check: is f(1)+f(−1) expressible in terms of Vieta sums?
  // f(x) = (x−p)(x−q)(x−r). f(1) = (1−p)(1−q)(1−r).
  // Expand: = 1 − (p+q+r) + (pq+pr+qr) − pqr = 1 − 5 + 7 − 2 = 1 ✓.
  // f(−1) = (−1−p)(−1−q)(−1−r) = −(1+p)(1+q)(1+r).
  // (1+p)(1+q)(1+r) = 1 + (p+q+r) + (pq+pr+qr) + pqr = 1 + 5 + 7 + 2 = 15.
  // f(−1) = −15 ✓. So f(1) + f(−1) = 1 − 15 = −14. And a+b+c = −5+7−2 = 0.
  // Answer: f(1) + f(−1) − (a+b+c) = −14 − 0 = −14.
  //
  // Desmos resistance: Desmos can find the polynomial and evaluate it, but the question asks for a
  // combination involving coefficients, requiring students to understand Vieta's formulas to even
  // set up the problem. The "transformed quantity" (f(1)+f(−1)−a−b−c) is not directly graphable.
  {
    id: 'sat-f7-v4-math-m2h-q22',
    section: 'math',
    moduleId: 'f7v4-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'The monic cubic polynomial f(x) = x³ + ax² + bx + c has three distinct real roots p, q, and r. The sum of the roots is 5, the sum of all pairwise products of the roots is 7, and the product of all three roots is 2. What is the value of f(1) + f(−1) − (a + b + c)?',
    correctAnswer: '-14',
    acceptableAnswers: ['-14'],
    explanation:
      'By Vieta\'s formulas for a monic cubic: p + q + r = −a = 5 → a = −5; pq + pr + qr = b = 7; pqr = −c = 2 → c = −2. So f(x) = x³ − 5x² + 7x − 2. Evaluate: f(1) = 1 − 5 + 7 − 2 = 1. f(−1) = (−1) − 5(1) + 7(−1) − 2 = −1 − 5 − 7 − 2 = −15. Then a + b + c = −5 + 7 − 2 = 0. Therefore f(1) + f(−1) − (a + b + c) = 1 + (−15) − 0 = −14. Alternative via factored form: f(1) = (1−p)(1−q)(1−r) = 1 − (p+q+r) + (pq+pr+qr) − pqr = 1 − 5 + 7 − 2 = 1. f(−1) = −(1+p)(1+q)(1+r) = −[1 + (p+q+r) + (pq+pr+qr) + pqr] = −(1 + 5 + 7 + 2) = −15. The key insight is applying Vieta\'s formulas to evaluate f at ±1 using the symmetric-function expansion.',
    scoringNotes: 'Answer is −14. The negative sign must be entered. Grid-in allows negative values.',
  },

]
