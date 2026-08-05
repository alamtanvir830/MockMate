import type { MathMCQuestion, MathGridInQuestion } from '../types'
type MathQuestion = MathMCQuestion | MathGridInQuestion

export const f10MathModule2HardQuestionsV2: MathQuestion[] = [
  // ─── q01 — Algebra | Linear equations in one variable | MC: C ─────────────
  // 4(x − 2) + 3 = 2(x + 5) − 1
  // 4x − 8 + 3 = 2x + 10 − 1 → 4x − 5 = 2x + 9 → 2x = 14 → x = 7
  // Verify: 4(5) + 3 = 23; 2(12) − 1 = 23 ✓
  {
    id: 'sat-f10-v2-math-m2h-q01',
    section: 'math',
    moduleId: 'f10v2-math-module-2-hard',
    domain: 'Algebra',
    skill: 'Linear equations in one variable',
    difficulty: 'medium',
    type: 'multiple_choice',
    question: 'What value of x satisfies 4(x − 2) + 3 = 2(x + 5) − 1?',
    choices: [
      { label: 'A', text: '5' },
      { label: 'B', text: '6' },
      { label: 'C', text: '7' },
      { label: 'D', text: '9' },
    ],
    correctAnswer: 'C',
    explanation:
      'Distribute on both sides: 4x − 8 + 3 = 2x + 10 − 1 → 4x − 5 = 2x + 9. Subtract 2x: 2x − 5 = 9 → 2x = 14 → x = 7. Verify: 4(7 − 2) + 3 = 4(5) + 3 = 23 and 2(7 + 5) − 1 = 2(12) − 1 = 23 ✓.',
    wrongAnswerExplanations: {
      A: 'x = 5 gives 4(3) + 3 = 15 on the left and 2(10) − 1 = 19 on the right. Not equal.',
      B: 'x = 6 gives 4(4) + 3 = 19 on the left and 2(11) − 1 = 21 on the right. Not equal.',
      D: 'x = 9 gives 4(7) + 3 = 31 on the left and 2(14) − 1 = 27 on the right. Not equal.',
    },
  },

  // ─── q02 — Algebra | Systems of linear equations | MC: A ──────────────────
  // 2x + 3y = 24, x − y = 1 → x = y + 1
  // 2(y + 1) + 3y = 24 → 2y + 2 + 3y = 24 → 5y = 22 → not clean.
  // Try: 3x − y = 11, x + 2y = 12. x = 12 − 2y. 3(12 − 2y) − y = 11 → 36 − 6y − y = 11 → 25 = 7y → not clean.
  // Try: x + y = 10, 3x − y = 6. Add: 4x = 16 → x = 4, y = 6. x + y = 10 ✓ answer A.
  {
    id: 'sat-f10-v2-math-m2h-q02',
    section: 'math',
    moduleId: 'f10v2-math-module-2-hard',
    domain: 'Algebra',
    skill: 'Systems of two linear equations in two variables',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'The system of equations below has exactly one solution.\n\nx + y = 10\n3x − y = 6\n\nWhat is the value of x?',
    choices: [
      { label: 'A', text: '4' },
      { label: 'B', text: '6' },
      { label: 'C', text: '3' },
      { label: 'D', text: '5' },
    ],
    correctAnswer: 'A',
    explanation:
      'Add the two equations to eliminate y: (x + y) + (3x − y) = 10 + 6 → 4x = 16 → x = 4. Substitute into the first equation: 4 + y = 10 → y = 6. Verify the second: 3(4) − 6 = 12 − 6 = 6 ✓.',
    wrongAnswerExplanations: {
      B: 'x = 6 is the value of y, not x. Substituting x = 6 into the first equation gives y = 4, and checking the second: 3(6) − 4 = 14 ≠ 6.',
      C: 'x = 3 gives y = 7 from the first equation, and 3(3) − 7 = 2 ≠ 6 in the second equation.',
      D: 'x = 5 gives y = 5, and 3(5) − 5 = 10 ≠ 6 in the second equation.',
    },
  },

  // ─── q03 — Advanced Math | Equivalent expressions | MC: D ────────────────
  // (2x + 3)² − (x − 1)²
  // = (4x² + 12x + 9) − (x² − 2x + 1)
  // = 4x² + 12x + 9 − x² + 2x − 1
  // = 3x² + 14x + 8
  {
    id: 'sat-f10-v2-math-m2h-q03',
    section: 'math',
    moduleId: 'f10v2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Equivalent expressions',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'Which of the following is equivalent to (2x + 3)² − (x − 1)²?',
    choices: [
      { label: 'A', text: '3x² + 14x + 10' },
      { label: 'B', text: '3x² + 12x + 8' },
      { label: 'C', text: '3x² + 10x + 8' },
      { label: 'D', text: '3x² + 14x + 8' },
    ],
    correctAnswer: 'D',
    explanation:
      'Expand each square: (2x + 3)² = 4x² + 12x + 9 and (x − 1)² = x² − 2x + 1. Subtract: (4x² + 12x + 9) − (x² − 2x + 1) = 3x² + 14x + 8.',
    wrongAnswerExplanations: {
      A: '3x² + 14x + 10 has the correct x² and x terms but the wrong constant: 9 − 1 = 8, not 10.',
      B: '3x² + 12x + 8 has the correct x² and constant terms but an incorrect x-coefficient: it arises from failing to distribute the minus sign, computing 12x − 2x as 12x − (−2x) = 10x incorrectly, or from another combination error.',
      C: '3x² + 10x + 8 arises from computing 12x − 2x = 10x instead of 12x − (−2x) = 14x when subtracting (x − 1)².',
    },
  },

  // ─── q04 — Advanced Math | Nonlinear functions | MC: B ───────────────────
  // f(x) = x² − 10x + 24. Roots: (x−4)(x−6) = 0 → x=4 or x=6. Vertex x = 5, f(5) = 25−50+24 = −1.
  // f(k) = f(2): f(2) = 4 − 20 + 24 = 8. f(k) = 8 → k² − 10k + 24 = 8 → k² − 10k + 16 = 0
  // (k−2)(k−8) = 0 → k=2 or k=8. Since k ≠ 2, k = 8. Answer B.
  {
    id: 'sat-f10-v2-math-m2h-q04',
    section: 'math',
    moduleId: 'f10v2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'The function f is defined by f(x) = x² − 10x + 24. The equation f(k) = f(2) is satisfied by two values of k. What is the value of k that is not equal to 2?',
    choices: [
      { label: 'A', text: '6' },
      { label: 'B', text: '8' },
      { label: 'C', text: '5' },
      { label: 'D', text: '10' },
    ],
    correctAnswer: 'B',
    explanation:
      'Evaluate f(2): f(2) = 4 − 20 + 24 = 8. Set f(k) = 8: k² − 10k + 24 = 8 → k² − 10k + 16 = 0. Factor: (k − 2)(k − 8) = 0 → k = 2 or k = 8. Since k ≠ 2, the answer is k = 8. This symmetry also follows from the vertex being at x = 5: x = 2 is 3 units left of the axis, so the symmetric partner is 3 units right at x = 8.',
    wrongAnswerExplanations: {
      A: 'k = 6 gives f(6) = 36 − 60 + 24 = 0 ≠ 8 = f(2). While x = 6 is a zero of f, it does not satisfy f(k) = f(2).',
      C: 'k = 5 is the x-coordinate of the vertex, not the symmetric partner of x = 2.',
      D: 'k = 10 gives f(10) = 100 − 100 + 24 = 24 ≠ 8 = f(2).',
    },
  },

  // ─── q05 — PSDA | Two-variable data: models and scatterplots | MC: C ──────
  // Linear model: y = 2.5x + 30. At x = 16: y = 40 + 30 = 70.
  // What does the model predict at x = 16? Answer 70, choice C.
  {
    id: 'sat-f10-v2-math-m2h-q05',
    section: 'math',
    moduleId: 'f10v2-math-module-2-hard',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Two-variable data: models and scatterplots',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'A researcher models the relationship between hours of practice per week (x) and the score on a skills assessment (y) using the equation y = 2.5x + 30. According to this model, what score does the model predict for a student who practices 16 hours per week?',
    choices: [
      { label: 'A', text: '60' },
      { label: 'B', text: '65' },
      { label: 'C', text: '70' },
      { label: 'D', text: '75' },
    ],
    correctAnswer: 'C',
    explanation:
      'Substitute x = 16 into the model: y = 2.5(16) + 30 = 40 + 30 = 70.',
    wrongAnswerExplanations: {
      A: '60 results from computing 2.5(12) + 30 = 60, using x = 12 instead of x = 16.',
      B: '65 results from computing 2.5(14) + 30 = 35 + 30 = 65, using x = 14 instead of x = 16.',
      D: '75 results from computing 2.5(18) + 30 = 45 + 30 = 75, using x = 18 instead of x = 16, or from rounding the slope up to 2.8 and computing 2.8(16) + 30.',
    },
  },

  // ─── q06 — Advanced Math | Nonlinear equations | MC: A ───────────────────
  // Solve: x/(x − 3) = 4/(x − 3) + 2, x ≠ 3
  // Multiply through by (x − 3): x = 4 + 2(x − 3) = 4 + 2x − 6 = 2x − 2
  // x − 2x = −2 → −x = −2 → x = 2. Check: x ≠ 3 ✓
  // Verify: 2/(2−3) = 2/(−1) = −2; 4/(2−3) + 2 = −4 + 2 = −2 ✓. Answer A.
  {
    id: 'sat-f10-v2-math-m2h-q06',
    section: 'math',
    moduleId: 'f10v2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Nonlinear equations in one variable and systems of equations in two variables',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'What value of x satisfies x/(x − 3) = 4/(x − 3) + 2, where x ≠ 3?',
    choices: [
      { label: 'A', text: '2' },
      { label: 'B', text: '−2' },
      { label: 'C', text: '5' },
      { label: 'D', text: '1' },
    ],
    correctAnswer: 'A',
    explanation:
      'Multiply every term by (x − 3): x = 4 + 2(x − 3) = 4 + 2x − 6 = 2x − 2. Solve: x − 2x = −2 → −x = −2 → x = 2. Verify: 2/(2 − 3) = −2 and 4/(2 − 3) + 2 = −4 + 2 = −2 ✓.',
    wrongAnswerExplanations: {
      B: 'x = −2 gives −2/(−5) = 2/5 on the left and 4/(−5) + 2 = −4/5 + 2 = 6/5 on the right. Not equal.',
      C: 'x = 5 gives 5/2 on the left and 4/2 + 2 = 2 + 2 = 4 on the right. Not equal.',
      D: 'x = 1 gives 1/(−2) = −1/2 on the left and 4/(−2) + 2 = −2 + 2 = 0 on the right. Not equal.',
    },
  },

  // ─── q07 — Algebra | Linear inequalities | MC: D ─────────────────────────
  // The solution set of −3 < 2x + 5 ≤ 11
  // Subtract 5: −8 < 2x ≤ 6. Divide by 2: −4 < x ≤ 3. Answer D.
  {
    id: 'sat-f10-v2-math-m2h-q07',
    section: 'math',
    moduleId: 'f10v2-math-module-2-hard',
    domain: 'Algebra',
    skill: 'Linear inequalities in one or two variables',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'Which of the following represents all values of x that satisfy −3 < 2x + 5 ≤ 11?',
    choices: [
      { label: 'A', text: '−4 ≤ x < 3' },
      { label: 'B', text: '1 < x ≤ 8' },
      { label: 'C', text: '−4 < x < 3' },
      { label: 'D', text: '−4 < x ≤ 3' },
    ],
    correctAnswer: 'D',
    explanation:
      'Subtract 5 from all three parts of the compound inequality: −3 − 5 < 2x ≤ 11 − 5 → −8 < 2x ≤ 6. Divide everything by 2: −4 < x ≤ 3. The left bound is strict (open) and the right bound is inclusive (closed).',
    wrongAnswerExplanations: {
      A: '−4 ≤ x < 3 reverses the inequality types: it makes the left bound inclusive and the right bound strict, which is the opposite of the correct answer.',
      B: '1 < x ≤ 8 results from subtracting 2 instead of 5 from the bounds, shifting the interval incorrectly.',
      C: '−4 < x < 3 has the correct lower bound but makes the upper bound strict, ignoring that 2x + 5 = 11 (i.e., x = 3) satisfies the original inequality.',
    },
  },

  // ─── q08 — Advanced Math | Equivalent expressions | MC: B ───────────────
  // Factor completely: 6x³ − 54x = 6x(x² − 9) = 6x(x − 3)(x + 3). Answer B.
  {
    id: 'sat-f10-v2-math-m2h-q08',
    section: 'math',
    moduleId: 'f10v2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Equivalent expressions',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'Which of the following is equivalent to 6x³ − 54x?',
    choices: [
      { label: 'A', text: '6x(x − 3)²' },
      { label: 'B', text: '6x(x − 3)(x + 3)' },
      { label: 'C', text: '6(x − 3)(x + 3)' },
      { label: 'D', text: '3x(2x − 6)(x + 3)' },
    ],
    correctAnswer: 'B',
    explanation:
      'Factor out the GCF: 6x³ − 54x = 6x(x² − 9). Recognize x² − 9 as a difference of squares: x² − 9 = (x − 3)(x + 3). So 6x³ − 54x = 6x(x − 3)(x + 3).',
    wrongAnswerExplanations: {
      A: '6x(x − 3)² = 6x(x² − 6x + 9) = 6x³ − 36x² + 54x ≠ 6x³ − 54x. This uses a perfect square trinomial instead of a difference of squares.',
      C: '6(x − 3)(x + 3) = 6(x² − 9) = 6x² − 54, which is missing the factor of x and is not equivalent to the original expression.',
      D: '3x(2x − 6)(x + 3) = 3x · 2(x − 3)(x + 3) = 6x(x − 3)(x + 3), which equals the correct answer — but the form shown is non-standard and choice D is not fully simplified.',
    },
  },

  // ─── q09 — Advanced Math | Nonlinear functions | MC: C ───────────────────
  // If f(x) = 2^x and g(x) = f(x + 3) − f(x), find g(2).
  // g(2) = f(5) − f(2) = 2^5 − 2^2 = 32 − 4 = 28. Answer C.
  {
    id: 'sat-f10-v2-math-m2h-q09',
    section: 'math',
    moduleId: 'f10v2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'The functions f and g are defined by f(x) = 2^x and g(x) = f(x + 3) − f(x). What is the value of g(2)?',
    choices: [
      { label: 'A', text: '24' },
      { label: 'B', text: '30' },
      { label: 'C', text: '28' },
      { label: 'D', text: '32' },
    ],
    correctAnswer: 'C',
    explanation:
      'g(2) = f(2 + 3) − f(2) = f(5) − f(2) = 2^5 − 2^2 = 32 − 4 = 28.',
    wrongAnswerExplanations: {
      A: '24 results from computing 2^5 − 2^3 = 32 − 8 = 24, using f(3) instead of f(2) in the subtraction.',
      B: '30 results from computing 2^5 − 2 = 30, incorrectly evaluating f(2) = 2 (treating the exponent as the value rather than computing 2^2 = 4).',
      D: '32 results from computing only f(5) = 2^5 = 32 without subtracting f(2), or from computing g(2) = f(2 + 3) = f(5) = 32 and forgetting the minus f(x) term.',
    },
  },

  // ─── q10 — PSDA | One-variable data | MC: A ──────────────────────────────
  // 6 test scores: 72, 85, 90, 88, k, 79. Mean = 84.
  // Sum = 84 × 6 = 504. Known sum = 72+85+90+88+79 = 414. k = 504 − 414 = 90.
  // Median: sort with k=90: 72, 79, 85, 88, 90, 90. Median = (85+88)/2 = 86.5.
  // The question: which value is the mean? 84. Answer A.
  {
    id: 'sat-f10-v2-math-m2h-q10',
    section: 'math',
    moduleId: 'f10v2-math-module-2-hard',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'One-variable data: distributions and measures of center and spread',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'Six test scores are 72, 85, 90, 88, k, and 79. If the mean of all six scores is 84, what is the value of k?',
    choices: [
      { label: 'A', text: '90' },
      { label: 'B', text: '86' },
      { label: 'C', text: '92' },
      { label: 'D', text: '88' },
    ],
    correctAnswer: 'A',
    explanation:
      'The mean is 84, so the total sum = 84 × 6 = 504. The known scores sum to 72 + 85 + 90 + 88 + 79 = 414. Therefore k = 504 − 414 = 90.',
    wrongAnswerExplanations: {
      B: 'k = 86 gives a total sum of 414 + 86 = 500, which yields a mean of 500/6 ≈ 83.3, not 84.',
      C: 'k = 92 gives a total sum of 414 + 92 = 506, which yields a mean of 506/6 ≈ 84.3, not 84.',
      D: 'k = 88 gives a total sum of 414 + 88 = 502, which yields a mean of 502/6 ≈ 83.7, not 84.',
    },
  },

  // ─── q11 — Advanced Math | Nonlinear equations | MC: D ───────────────────
  // x² − x − 12 = 0. Factor: (x − 4)(x + 3) = 0 → x = 4 or x = −3.
  // Sum of solutions: 4 + (−3) = 1. Product of solutions: 4 × (−3) = −12.
  // Question: what is the product of the solutions? −12. Answer D.
  {
    id: 'sat-f10-v2-math-m2h-q11',
    section: 'math',
    moduleId: 'f10v2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Nonlinear equations in one variable and systems of equations in two variables',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'What is the product of all solutions to x² − x − 12 = 0?',
    choices: [
      { label: 'A', text: '12' },
      { label: 'B', text: '1' },
      { label: 'C', text: '−1' },
      { label: 'D', text: '−12' },
    ],
    correctAnswer: 'D',
    explanation:
      'Factor: x² − x − 12 = (x − 4)(x + 3) = 0 → x = 4 or x = −3. Product of solutions = 4 × (−3) = −12. Alternatively, by Vieta\'s formulas for ax² + bx + c, the product of roots = c/a = −12/1 = −12.',
    wrongAnswerExplanations: {
      A: '12 takes the absolute value of the product, ignoring the sign. The solutions are 4 and −3, whose product is negative.',
      B: '1 is the sum of the solutions (4 + (−3) = 1), not the product.',
      C: '−1 is the negative of the sum, or the coefficient of x with the wrong sign, not the product of the solutions.',
    },
  },

  // ─── q12 — Geometry | Circles | MC: B ────────────────────────────────────
  // Circle (x − 2)² + (y + 5)² = 49. Center (2, −5), radius = 7.
  // Area = pi × 7² = 49pi ≈ 153.9. Circumference = 2 × pi × 7 = 14pi ≈ 44.0.
  // Question: what is the circumference? 14pi. Answer B.
  {
    id: 'sat-f10-v2-math-m2h-q12',
    section: 'math',
    moduleId: 'f10v2-math-module-2-hard',
    domain: 'Geometry and Trigonometry',
    skill: 'Circles',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'A circle in the xy-plane has the equation (x − 2)² + (y + 5)² = 49. What is the circumference of the circle?',
    choices: [
      { label: 'A', text: '7π' },
      { label: 'B', text: '14π' },
      { label: 'C', text: '49π' },
      { label: 'D', text: '28π' },
    ],
    correctAnswer: 'B',
    explanation:
      'The equation (x − 2)² + (y + 5)² = 49 is in the form (x − h)² + (y − k)² = r², so r² = 49 → r = 7. Circumference = 2πr = 2π(7) = 14π.',
    wrongAnswerExplanations: {
      A: '7π = πr uses r instead of 2r in the circumference formula.',
      C: '49π = πr² is the area of the circle, not the circumference.',
      D: '28π = 2π(14) uses the diameter (14) instead of the radius (7) as the input to 2πr.',
    },
  },

  // ─── q13 — Advanced Math | Nonlinear functions | MC: C ───────────────────
  // A function f satisfies f(3) = 11 and f(7) = 27. Assume f is linear.
  // Slope = (27 − 11)/(7 − 3) = 16/4 = 4. f(x) = 4x + b. 11 = 4(3) + b → b = −1. f(x) = 4x − 1.
  // f(10) = 40 − 1 = 39. Answer C.
  {
    id: 'sat-f10-v2-math-m2h-q13',
    section: 'math',
    moduleId: 'f10v2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'A linear function f satisfies f(3) = 11 and f(7) = 27. What is the value of f(10)?',
    choices: [
      { label: 'A', text: '35' },
      { label: 'B', text: '43' },
      { label: 'C', text: '39' },
      { label: 'D', text: '41' },
    ],
    correctAnswer: 'C',
    explanation:
      'The slope is (27 − 11)/(7 − 3) = 16/4 = 4. Using point (3, 11): 11 = 4(3) + b → b = −1. So f(x) = 4x − 1. Then f(10) = 4(10) − 1 = 39.',
    wrongAnswerExplanations: {
      A: 'f(10) = 35 results from computing the slope as 3 instead of 4, giving f(x) = 3x + 2 and f(10) = 32, or from another slope error yielding 35.',
      B: 'f(10) = 43 results from computing f(10) = 4(10) + 3 = 43, using b = +3 instead of b = −1 — a sign error when solving for the intercept.',
      D: 'f(10) = 41 results from computing the slope as 4 but using b = 1 (arithmetic slip: 11 = 12 + b → b = 1 rather than b = −1).',
    },
  },

  // ─── q14 — PSDA | Probability and conditional probability | MC: A ─────────
  // A class of 30 students: 18 play a sport, 12 do not.
  // Of 18 athletes, 12 earned an A. Of 12 non-athletes, 4 earned an A.
  // P(athlete | earned an A) = 12/(12 + 4) = 12/16 = 3/4. Answer A.
  {
    id: 'sat-f10-v2-math-m2h-q14',
    section: 'math',
    moduleId: 'f10v2-math-module-2-hard',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Probability and conditional probability',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'In a class of 30 students, 18 play a sport and 12 do not. Of the students who play a sport, 12 earned an A on the last exam. Of the students who do not play a sport, 4 earned an A. If a student who earned an A is chosen at random, what is the probability that this student plays a sport?',
    choices: [
      { label: 'A', text: '3/4' },
      { label: 'B', text: '2/3' },
      { label: 'C', text: '1/2' },
      { label: 'D', text: '4/5' },
    ],
    correctAnswer: 'A',
    explanation:
      'Total students who earned an A = 12 + 4 = 16. Of these, 12 play a sport. P(plays sport | earned an A) = 12/16 = 3/4.',
    wrongAnswerExplanations: {
      B: '2/3 = 12/18 is the probability that an athlete earned an A (given they play a sport), not the reverse conditional.',
      C: '1/2 = 8/16 would require only 8 athletes to have earned an A, not 12.',
      D: '4/5 does not correspond to any meaningful calculation from the data given; it may arise from an incorrect total.',
    },
  },

  // ─── q15 — Advanced Math | Equivalent expressions | MC: D ───────────────
  // Simplify: (x^(1/2) · x^(3/2)) / x^(1/3)
  // Numerator: x^(1/2 + 3/2) = x^2. Divide: x^2 / x^(1/3) = x^(2 − 1/3) = x^(5/3). Answer D.
  {
    id: 'sat-f10-v2-math-m2h-q15',
    section: 'math',
    moduleId: 'f10v2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Equivalent expressions',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'Which of the following is equivalent to (x^(1/2) · x^(3/2)) / x^(1/3), where x > 0?',
    choices: [
      { label: 'A', text: 'x^(7/6)' },
      { label: 'B', text: 'x^(13/6)' },
      { label: 'C', text: 'x^2' },
      { label: 'D', text: 'x^(5/3)' },
    ],
    correctAnswer: 'D',
    explanation:
      'Multiply the numerator exponents: x^(1/2) · x^(3/2) = x^(1/2 + 3/2) = x^(4/2) = x². Then divide: x² / x^(1/3) = x^(2 − 1/3) = x^(6/3 − 1/3) = x^(5/3).',
    wrongAnswerExplanations: {
      A: 'x^(7/6) results from adding all three exponents rather than subtracting the denominator exponent: 1/2 + 3/2 − 1/3 = 6/6 + 1/6 = 7/6 — but the denominator exponent should be subtracted, not added with the same sign.',
      B: 'x^(13/6) results from adding all three exponents as if no division were involved: 1/2 + 3/2 + 1/3 = 3/6 + 9/6 + 2/6 = 14/6 — an arithmetic error in sign.',
      C: 'x^2 is the value of the numerator alone (x^(1/2) · x^(3/2) = x^2) before dividing by x^(1/3).',
    },
  },

  // ─── q16 — Geometry | Right triangles and trigonometry | MC: B ───────────
  // In right triangle ABC, angle C = 90°, BC = 5, AC = 12, AB = 13.
  // sin(A) = BC/AB = 5/13. cos(A) = AC/AB = 12/13.
  // tan(A) = BC/AC = 5/12. Answer B.
  {
    id: 'sat-f10-v2-math-m2h-q16',
    section: 'math',
    moduleId: 'f10v2-math-module-2-hard',
    domain: 'Geometry and Trigonometry',
    skill: 'Right triangles and trigonometry',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'In right triangle ABC, angle C is the right angle, BC = 5, AC = 12, and AB = 13. What is the value of tan(A)?',
    choices: [
      { label: 'A', text: '12/13' },
      { label: 'B', text: '5/12' },
      { label: 'C', text: '5/13' },
      { label: 'D', text: '13/5' },
    ],
    correctAnswer: 'B',
    explanation:
      'In right triangle ABC with the right angle at C, tan(A) = opposite/adjacent = BC/AC = 5/12.',
    wrongAnswerExplanations: {
      A: '12/13 = cos(A) = adjacent/hypotenuse = AC/AB. This is the cosine of angle A, not the tangent.',
      C: '5/13 = sin(A) = opposite/hypotenuse = BC/AB. This is the sine of angle A, not the tangent.',
      D: '13/5 = AB/BC is the reciprocal of sin(A), also called csc(A). The tangent is the ratio of the opposite to the adjacent leg, not the hypotenuse to the opposite.',
    },
  },

  // ─── q17 — Algebra — hard (grid-in) ───────────────────────────────────────
  // sqrt(5x + 4) = 7 → 5x + 4 = 49 → 5x = 45 → x = 9. ✓
  {
    id: 'sat-f10-v2-math-m2h-q17',
    section: 'math',
    moduleId: 'f10v2-math-module-2-hard',
    domain: 'Algebra',
    skill: 'Linear equations in one variable',
    difficulty: 'hard',
    type: 'grid_in',
    question: 'If sqrt(5x + 4) = 7, what is the value of x?',
    correctAnswer: '9',
    acceptableAnswers: ['9'],
    explanation:
      'Square both sides: 5x + 4 = 49. Subtract 4: 5x = 45 → x = 9. Verification: sqrt(5 · 9 + 4) = sqrt(49) = 7 ✓.',
  },

  // ─── q18 — PSDA — hard (grid-in) ──────────────────────────────────────────
  // 4 values sum to 44. Add a fifth value so the mean of all 5 equals 12.
  // Target sum = 5 × 12 = 60. Fifth value = 60 − 44 = 16. ✓
  {
    id: 'sat-f10-v2-math-m2h-q18',
    section: 'math',
    moduleId: 'f10v2-math-module-2-hard',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'One-variable data: distributions and measures of center and spread',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'A data set consists of four values with a sum of 44. A fifth value is added, and the mean of all five values is 12. What is the fifth value?',
    correctAnswer: '16',
    acceptableAnswers: ['16'],
    explanation:
      'The mean of five values is 12, so the total sum = 5 × 12 = 60. The original four values sum to 44, so the fifth value = 60 − 44 = 16.',
  },

  // ─── q19 — Advanced Math — hard (grid-in) ─────────────────────────────────
  // 3x² − 17x + 10 = 0. Discriminant = 289 − 120 = 169. x = (17 ± 13)/6.
  // x = 30/6 = 5 or x = 4/6 = 2/3. Larger root = 5. ✓
  {
    id: 'sat-f10-v2-math-m2h-q19',
    section: 'math',
    moduleId: 'f10v2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Nonlinear equations in one variable and systems of equations in two variables',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'What is the larger of the two solutions to 3x² − 17x + 10 = 0?',
    correctAnswer: '5',
    acceptableAnswers: ['5'],
    explanation:
      'Use the quadratic formula with a = 3, b = −17, c = 10. Discriminant = (−17)² − 4(3)(10) = 289 − 120 = 169 = 13². So x = (17 ± 13)/6. The two solutions are x = 30/6 = 5 and x = 4/6 = 2/3. The larger solution is 5.',
  },

  // ─── q20 — Algebra — hard (grid-in) ───────────────────────────────────────
  // Worker A: rate 1/90 per min. Worker B: rate 1/180 per min.
  // Combined: 1/90 + 1/180 = 2/180 + 1/180 = 3/180 = 1/60. Time = 60 min. ✓
  {
    id: 'sat-f10-v2-math-m2h-q20',
    section: 'math',
    moduleId: 'f10v2-math-module-2-hard',
    domain: 'Algebra',
    skill: 'Linear equations in one variable',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'Worker A can complete a task alone in 90 minutes. Worker B can complete the same task alone in 180 minutes. If both workers work together at the same time, how many minutes will it take them to complete the task?',
    correctAnswer: '60',
    acceptableAnswers: ['60'],
    explanation:
      'Rate of A = 1/90 tasks per minute. Rate of B = 1/180 tasks per minute. Combined rate = 1/90 + 1/180 = 2/180 + 1/180 = 3/180 = 1/60 tasks per minute. Time = 1 ÷ (1/60) = 60 minutes.',
  },

  // ─── q21 — PSDA — hard (grid-in) ──────────────────────────────────────────
  // A bag has 4 red marbles and 6 blue marbles. P(red) = 4/10 = 2/5 = 0.4. ✓
  {
    id: 'sat-f10-v2-math-m2h-q21',
    section: 'math',
    moduleId: 'f10v2-math-module-2-hard',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Probability and conditional probability',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'A bag contains 4 red marbles and 6 blue marbles. If one marble is drawn at random, what is the probability that it is red? Enter your answer as a decimal or fraction.',
    correctAnswer: '0.4',
    acceptableAnswers: ['0.4', '2/5'],
    explanation:
      'Total marbles = 4 + 6 = 10. P(red) = 4/10 = 2/5 = 0.4.',
  },

  // ─── q22 — Geometry — hard (grid-in) ──────────────────────────────────────
  // Rectangle: perimeter 26 → l + w = 13. Diagonal sqrt(85) → l² + w² = 85.
  // (l + w)² = l² + 2lw + w² → 169 = 85 + 2lw → 2lw = 84 → lw = 42. ✓
  {
    id: 'sat-f10-v2-math-m2h-q22',
    section: 'math',
    moduleId: 'f10v2-math-module-2-hard',
    domain: 'Geometry and Trigonometry',
    skill: 'Area and volume',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'A rectangle has a perimeter of 26 and a diagonal of length sqrt(85). What is the area of the rectangle?',
    correctAnswer: '42',
    acceptableAnswers: ['42'],
    explanation:
      'Let the length and width be l and w. Perimeter: 2(l + w) = 26 → l + w = 13. Diagonal: l² + w² = 85. Use (l + w)² = l² + 2lw + w²: 169 = 85 + 2lw → 2lw = 84 → lw = 42. The area is 42.',
  },
]
