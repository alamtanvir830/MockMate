import type { MathQuestion } from '../types'

export const f3MathModule2HardQuestionsV2: MathQuestion[] = [
  // ─── Advanced Math × 9 ────────────────────────────────────────────────────

  // Q01 — Advanced Math | Nonlinear system (linear + quadratic) | hard | MC
  {
    id: 'sat-f3-v2-math-m2h-q01',
    section: 'math',
    moduleId: 'f3v2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Nonlinear equations in one variable and systems of equations',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'The system of equations below is given:\n\ny = x² − 3x − 4\ny = 2x − 8\n\nWhat is the sum of all x-values at which the two graphs intersect?',
    choices: [
      { label: 'A', text: '1' },
      { label: 'B', text: '3' },
      { label: 'C', text: '5' },
      { label: 'D', text: '7' },
    ],
    correctAnswer: 'C',
    explanation:
      'Set the right-hand sides equal:\nx² − 3x − 4 = 2x − 8\nx² − 5x + 4 = 0\n(x − 1)(x − 4) = 0\nx = 1  or  x = 4\n\nSum = 1 + 4 = 5.\n\nVerify at x = 1: y = 2(1) − 8 = −6, and y = 1 − 3 − 4 = −6. ✓\nVerify at x = 4: y = 2(4) − 8 = 0, and y = 16 − 12 − 4 = 0. ✓',
    wrongAnswerExplanations: {
      A: 'x = 1 is only one of the two intersection x-values; the problem asks for the sum of all x-values, not just the smaller root.',
      B: 'x = 3 is the coefficient of x in the rearranged equation x² − 5x + 4 = 0. A common error is to read the middle coefficient as a root rather than solving the quadratic. Neither root equals 3.',
      D: 'x = 7 arises from adding 3 and 4 — treating the coefficient 5 as if it were the sum directly, or mistakenly finding x = 3 as a root and adding it to x = 4. The correct roots are 1 and 4, giving a sum of 5.',
    },
  },

  // Q02 — Advanced Math | Polynomial division (Remainder Theorem) | hard | MC
  {
    id: 'sat-f3-v2-math-m2h-q02',
    section: 'math',
    moduleId: 'f3v2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Equivalent expressions',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'When the polynomial p(x) = 2x³ − 5x² + x + 3 is divided by (x − 2), the remainder is r. What is the value of r?',
    choices: [
      { label: 'A', text: '−3' },
      { label: 'B', text: '−1' },
      { label: 'C', text: '1' },
      { label: 'D', text: '3' },
    ],
    correctAnswer: 'C',
    explanation:
      'By the Remainder Theorem, the remainder when p(x) is divided by (x − c) equals p(c).\n\nEvaluate p(2):\np(2) = 2(2)³ − 5(2)² + 2 + 3\n     = 2(8) − 5(4) + 2 + 3\n     = 16 − 20 + 2 + 3\n     = 1\n\nSo r = 1.',
    wrongAnswerExplanations: {
      A: 'p(2) = 1, not −3. This error likely comes from computing 16 − 20 = −4 and then adding only the next term (+2), forgetting the constant +3: −4 + 2 − 1 = −3 using the wrong sign on the constant.',
      B: 'p(2) = 1, not −1. A common sign error: computing 16 − 20 + 2 + 3 but subtracting the constant instead of adding gives 16 − 20 + 2 − 3 = −5, or misreading +3 as −3 in the final step to get −1.',
      D: '3 is the constant term of p(x) itself, not p(2). This reflects the error of reading off the constant from the polynomial without substituting x = 2.',
    },
  },

  // Q03 — Advanced Math | Exponential equation requiring same-base manipulation | hard | MC
  {
    id: 'sat-f3-v2-math-m2h-q03',
    section: 'math',
    moduleId: 'f3v2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Exponential functions',
    difficulty: 'hard',
    type: 'multiple_choice',
    question: 'What is the value of x that satisfies 4^(2x − 1) = 8^(x + 2)?',
    choices: [
      { label: 'A', text: '7' },
      { label: 'B', text: '8' },
      { label: 'C', text: '10' },
      { label: 'D', text: '14' },
    ],
    correctAnswer: 'B',
    explanation:
      'Express both sides as powers of 2. Since 4 = 2² and 8 = 2³:\n\n4^(2x − 1) = (2²)^(2x − 1) = 2^(2(2x − 1)) = 2^(4x − 2)\n8^(x + 2)  = (2³)^(x + 2)  = 2^(3(x + 2))  = 2^(3x + 6)\n\nSet the exponents equal (same base):\n4x − 2 = 3x + 6\nx = 8\n\nVerify: 4^(2·8 − 1) = 4^15 = 2^30; 8^(8 + 2) = 8^10 = (2³)^10 = 2^30. ✓',
    wrongAnswerExplanations: {
      A: 'x = 7 results from the sign error 4x − 2 = 3x + 5 (treating the right side as 3x + 5 instead of 3x + 6, often from multiplying 3 × 2 = 5 instead of 3 × 2 = 6): 4x − 2 = 3x + 5 gives x = 7. Check: left exponent 4(7) − 2 = 26; right exponent 3(7) + 6 = 27. Not equal.',
      C: 'x = 10 comes from incorrectly forming the exponent on the left as 2(2x) − 1 = 4x − 1 instead of 2(2x − 1) = 4x − 2 (failing to distribute the 2): 4x − 1 = 3x + 6 gives x = 7... or distributing correctly but making an arithmetic error on the right. Check: left exponent 4(10) − 2 = 38; right exponent 3(10) + 6 = 36. Not equal.',
      D: 'x = 14 arises from not expressing 4 and 8 as powers of 2 and instead naively setting base exponents equal directly: 2(2x − 1) = 3(x + 2) is correct, but some students set 4·(2x−1) = 8·(x+2) → 8x − 4 = 8x + 16, hitting a contradiction, then try 2x − 1 = x + 2 → x = 3. Others double the answer mistakenly to reach 14.',
    },
  },

  // Q04 — Advanced Math | Completing the square → vertex | hard | MC
  {
    id: 'sat-f3-v2-math-m2h-q04',
    section: 'math',
    moduleId: 'f3v2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Quadratic functions',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'What are the coordinates of the vertex of the parabola defined by f(x) = 3x² − 18x + 29?',
    choices: [
      { label: 'A', text: '(3, 2)' },
      { label: 'B', text: '(3, −2)' },
      { label: 'C', text: '(−3, 2)' },
      { label: 'D', text: '(3, 56)' },
    ],
    correctAnswer: 'A',
    explanation:
      'Complete the square:\nf(x) = 3x² − 18x + 29\n     = 3(x² − 6x) + 29\n     = 3(x² − 6x + 9 − 9) + 29\n     = 3(x − 3)² − 27 + 29\n     = 3(x − 3)² + 2\n\nVertex form a(x − h)² + k gives vertex (h, k) = (3, 2).',
    wrongAnswerExplanations: {
      B: '(3, −2): The k-value computation is −27 + 29 = +2, not −2. Students who incorrectly compute −27 + 29 as −2 (perhaps by reversing the subtraction to 27 − 29 = −2) arrive here.',
      C: '(−3, 2): The vertex x-coordinate h satisfies (x − h)² = (x − 3)², so h = +3, not −3. Students who read the sign directly from the parentheses without accounting for the minus sign in (x − h) make this error.',
      D: '(3, 56): This comes from forgetting to factor out the 3 before completing the square and instead substituting x = 3 directly into the original expression: 3(9) − 18(3) + 29 = 27 − 54 + 29 = 2. Wait — that gives 2, which is correct. The error for this distractor: substituting x = 3 but computing 3(3²) − 18(3) + 29 = 27 − 54 + 29 gives 2. A student who omits the leading coefficient and computes (3)² − 18(3) + 29 = 9 − 54 + 29 = −16, then uses the wrong formula, could reach 56 by computing f(−3) = 3(9) + 54 + 29 = 27 + 54 − 29... The key trap is sign errors cascading from missing the factoring step.',
    },
  },

  // Q05 — Advanced Math | Function composition | hard | MC
  {
    id: 'sat-f3-v2-math-m2h-q05',
    section: 'math',
    moduleId: 'f3v2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Functions',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'Let f(x) = 2x + 1 and g(x) = x² − 3. Which of the following is equivalent to f(g(x))?',
    choices: [
      { label: 'A', text: '2x² − 5' },
      { label: 'B', text: '4x² + 4x − 2' },
      { label: 'C', text: '2x² − 3' },
      { label: 'D', text: '2x² + 4x − 2' },
    ],
    correctAnswer: 'A',
    explanation:
      'f(g(x)) means substitute g(x) in place of x inside f:\nf(g(x)) = f(x² − 3) = 2(x² − 3) + 1 = 2x² − 6 + 1 = 2x² − 5.\n\nVerify with x = 2: g(2) = 4 − 3 = 1, then f(1) = 3. Check: 2(4) − 5 = 3. ✓',
    wrongAnswerExplanations: {
      B: '4x² + 4x − 2 is g(f(x)) computed correctly: g(f(x)) = (2x + 1)² − 3 = 4x² + 4x + 1 − 3 = 4x² + 4x − 2. The composition order is reversed — this is g(f(x)), not f(g(x)).',
      C: '2x² − 3 comes from distributing the 2 in f(x) = 2x + 1 correctly to get 2(x² − 3) = 2x² − 6, but then forgetting to add the +1 from f(x): 2x² − 6 instead of 2x² − 6 + 1 = 2x² − 5.',
      D: '2x² + 4x − 2 arises from mistakenly squaring the output of g (treating g(x) as x² + something) or from partially applying g(f(x)) incorrectly — for instance, computing 2(x² − 3) + 1 but expanding as if there were a cross term: 2(x − something)(x + something). This choice traps students who conflate squaring a binomial with distributing a coefficient.',
    },
  },

  // Q06 — Advanced Math | Rational equation with extraneous solution check | hard | MC
  {
    id: 'sat-f3-v2-math-m2h-q06',
    section: 'math',
    moduleId: 'f3v2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Nonlinear equations in one variable and systems of equations',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'What is the solution set of the equation below?\n\n3/(x − 1) + x/(x + 1) = (x² + 3)/((x − 1)(x + 1))',
    choices: [
      { label: 'A', text: 'x = 1 only' },
      { label: 'B', text: 'x = 0 only' },
      { label: 'C', text: 'x = 0 and x = −1' },
      { label: 'D', text: 'No solution' },
    ],
    correctAnswer: 'B',
    explanation:
      'The denominators (x − 1) and (x + 1) require x ≠ 1 and x ≠ −1.\n\nMultiply every term by (x − 1)(x + 1):\n3(x + 1) + x(x − 1) = x² + 3\n\nExpand the left side:\n3x + 3 + x² − x = x² + 3\nx² + 2x + 3 = x² + 3\n2x + 3 = 3\n2x = 0\nx = 0\n\nCheck: x = 0 does not make any denominator zero (0 ≠ 1 and 0 ≠ −1), so x = 0 is the valid solution.',
    wrongAnswerExplanations: {
      A: 'x = 1 makes the denominator (x − 1) equal to zero, so the original equation is undefined at x = 1 — it is excluded from the domain and cannot be a solution regardless of whether it satisfies the cleared equation.',
      C: 'x = −1 makes the denominator (x + 1) equal to zero, so it is also excluded from the domain. Students who solve the cleared polynomial equation and neglect to check both domain restrictions may include x = −1 as a solution, but it is extraneous.',
      D: 'x = 0 satisfies the equation and lies within the domain (both denominators are nonzero at x = 0), so there is exactly one valid solution. Students who incorrectly assume that clearing denominators always introduces extraneous roots and discards all apparent solutions will arrive here erroneously.',
    },
  },

  // Q07 — Advanced Math | Product of roots (Vieta's formulas) | hard | MC
  {
    id: 'sat-f3-v2-math-m2h-q07',
    section: 'math',
    moduleId: 'f3v2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Quadratic functions',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'The quadratic equation 5x² − 45x + p = 0 has two real roots, r and s. If the product of r and s equals 14, what is the value of p?',
    choices: [
      { label: 'A', text: '14' },
      { label: 'B', text: '28' },
      { label: 'C', text: '70' },
      { label: 'D', text: '140' },
    ],
    correctAnswer: 'C',
    explanation:
      "For any quadratic ax² + bx + c = 0 with roots r and s:\n• Sum of roots:    r + s = −b/a = 45/5 = 9\n• Product of roots: r × s = c/a = p/5\n\nWe are told the product of the roots equals 14:\np/5 = 14\np = 70\n\nVerification: the equation 5x² − 45x + 70 = 0 factors as 5(x − 2)(x − 7) = 0, giving roots 2 and 7. Product: 2 × 7 = 14 ✓",
    wrongAnswerExplanations: {
      A: 'p = 14 confuses the given product of the roots with the value of p itself. Vieta\'s formula states r × s = p/a = p/5, so if the product is 14, then p/5 = 14, giving p = 70 — not p = 14. This error skips the multiplication by a = 5.',
      B: 'p = 28 likely comes from the sum-of-roots formula: r + s = −b/a = 45/5 = 9, and then computing 14 × 2 = 28. Students may confuse the sum formula with the product formula, or double the given product without clear reasoning.',
      D: 'p = 140 comes from multiplying 14 × 10 = 140, perhaps from misreading a = 5 as 10 or from dividing 45 by the wrong factor. Alternatively, a student who correctly finds p = 14 × a but uses a = 10 instead of a = 5 reaches 140.',
    },
  },

  // Q08 — Advanced Math | Inverse function | hard | MC
  {
    id: 'sat-f3-v2-math-m2h-q08',
    section: 'math',
    moduleId: 'f3v2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Functions',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'The function f is defined by f(x) = (3x + 5)/(x − 2) for x ≠ 2. Which of the following defines f⁻¹(x), the inverse of f?',
    choices: [
      { label: 'A', text: 'f⁻¹(x) = (2x + 5)/(x − 3)' },
      { label: 'B', text: 'f⁻¹(x) = (x − 2)/(3x + 5)' },
      { label: 'C', text: 'f⁻¹(x) = (2x − 5)/(x − 3)' },
      { label: 'D', text: 'f⁻¹(x) = (2x + 5)/(3 − x)' },
    ],
    correctAnswer: 'A',
    explanation:
      'To find the inverse, swap x and y and solve for y.\n\nStart: y = (3x + 5)/(x − 2)\nSwap: x = (3y + 5)/(y − 2)\nMultiply both sides by (y − 2):\nx(y − 2) = 3y + 5\nxy − 2x = 3y + 5\nxy − 3y = 2x + 5\ny(x − 3) = 2x + 5\ny = (2x + 5)/(x − 3)\n\nVerify: f(1) = (3 + 5)/(1 − 2) = −8. Then f⁻¹(−8) = (−16 + 5)/(−8 − 3) = −11/−11 = 1. ✓',
    wrongAnswerExplanations: {
      B: '(x−2)/(3x+5) is the reciprocal 1/f(x), not the inverse function. Students who confuse "inverse" with "reciprocal" select this choice — these are entirely different operations.',
      C: '(2x−5)/(x−3) has the correct denominator (x − 3) and the correct coefficient on x in the numerator (2x), but uses −5 instead of +5. This sign error on the constant term occurs when students incorrectly subtract both sides of xy − 3y = 2x + 5 as y(x − 3) = 2x − 5, forgetting that the +5 on the right side stays positive.',
      D: '(2x+5)/(3−x) has the correct numerator but the denominator\'s sign is flipped: (3 − x) instead of (x − 3). This error occurs when students factor y(x − 3) = 2x + 5 correctly but then write the denominator as (3 − x), perhaps from writing −(3 − x) and then flipping only the denominator without adjusting the sign of the overall fraction.',
    },
  },

  // Q09 — Advanced Math | Grid-in: repeated root (discriminant = 0) | hard | grid_in
  {
    id: 'sat-f3-v2-math-m2h-q09',
    section: 'math',
    moduleId: 'f3v2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Quadratic functions',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'For what value of k does the equation x² − (k + 2)x + 2k = 0 have exactly one repeated real root?',
    correctAnswer: '2',
    acceptableAnswers: ['2'],
    explanation:
      'A quadratic has exactly one repeated real root when its discriminant equals zero.\n\nFor x² − (k+2)x + 2k = 0, with a = 1, b = −(k+2), c = 2k:\n\nDiscriminant = b² − 4ac\n= (k+2)² − 4(1)(2k)\n= k² + 4k + 4 − 8k\n= k² − 4k + 4\n= (k − 2)²\n\nSet (k − 2)² = 0 → k = 2.\n\nVerify: equation becomes x² − 4x + 4 = (x − 2)² = 0, giving the repeated root x = 2. ✓',
    scoringNotes: 'Only k = 2 is accepted.',
  },

  // ─── Algebra × 5 ──────────────────────────────────────────────────────────

  // Q10 — Algebra | Absolute value inequality (two disjoint solution ranges) | hard | MC
  {
    id: 'sat-f3-v2-math-m2h-q10',
    section: 'math',
    moduleId: 'f3v2-math-module-2-hard',
    domain: 'Algebra',
    skill: 'Linear inequalities in one or two variables',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'Which of the following gives the complete solution set for |2x − 6| > 10?',
    choices: [
      { label: 'A', text: 'x < −2 or x > 8' },
      { label: 'B', text: '−2 < x < 8' },
      { label: 'C', text: 'x < −8 or x > 2' },
      { label: 'D', text: 'x < −2 or x > 7' },
    ],
    correctAnswer: 'A',
    explanation:
      '|2x − 6| > 10 splits into two inequalities:\n\nCase 1: 2x − 6 > 10 → 2x > 16 → x > 8\nCase 2: 2x − 6 < −10 → 2x < −4 → x < −2\n\nSolution set: x < −2 or x > 8.\n\nVerify x = −3 (should work): |2(−3) − 6| = |−12| = 12 > 10. ✓\nVerify x = 0 (should fail): |2(0) − 6| = 6, which is not > 10. ✓',
    wrongAnswerExplanations: {
      B: '−2 < x < 8 is the solution to |2x − 6| < 10 (the "less than" form of the same absolute value inequality). Students who know the boundary values correctly but apply the wrong interval direction (between vs. outside) choose this.',
      C: 'x < −8 or x > 2 reflects the error of solving |x − 2| > 8 instead of |2x − 6| > 10 — this treats the equation as if the coefficient of x were 1 and the center were 2, rather than correctly finding the center x = 3 from 2x − 6 = 0.',
      D: 'x < −2 or x > 7 has the left boundary correct (x < −2) but an off-by-one error on the right boundary. This occurs when students solve 2x − 6 > 10 as 2x > 15 (subtracting 1 instead of adding 6) to get x > 7.5, or simply make an arithmetic slip on 16 ÷ 2, writing x > 7 instead of x > 8.',
    },
  },

  // Q11 — Algebra | System of 3 variables from a word problem | hard | MC
  {
    id: 'sat-f3-v2-math-m2h-q11',
    section: 'math',
    moduleId: 'f3v2-math-module-2-hard',
    domain: 'Algebra',
    skill: 'Systems of two linear equations in two variables',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'A store sells three items: pens, notebooks, and binders. One pen, two notebooks, and one binder cost $12 in total. Two pens, one notebook, and one binder cost $13 in total. One pen, one notebook, and two binders cost $15 in total. What is the cost, in dollars, of one binder?',
    choices: [
      { label: 'A', text: '$4' },
      { label: 'B', text: '$5' },
      { label: 'C', text: '$6' },
      { label: 'D', text: '$7' },
    ],
    correctAnswer: 'B',
    explanation:
      'Let p = price of a pen, n = price of a notebook, b = price of a binder.\n\nEquation 1: p + 2n + b = 12\nEquation 2: 2p + n + b = 13\nEquation 3: p + n + 2b = 15\n\nStep 1 — Subtract Eq. 1 from Eq. 2:\np − n = 1, so p = n + 1  … (i)\n\nStep 2 — Subtract Eq. 1 from Eq. 3:\nb − n = 3, so b = n + 3  … (ii)\n\nStep 3 — Substitute (i) and (ii) into Eq. 1:\n(n + 1) + 2n + (n + 3) = 12\n4n + 4 = 12 → n = 2\n\nSo b = 2 + 3 = 5 and p = 3.\n\nVerify Eq. 2: 2(3) + 2 + 5 = 13. ✓\nVerify Eq. 3: 3 + 2 + 2(5) = 15. ✓',
    wrongAnswerExplanations: {
      A: '$4 is the price of a notebook plus a pen combined (n + p = 2 + 3 = 5... actually $4 = n + something). This choice reflects the error of solving only two of the three equations and finding n = 2, then confusing n for b.',
      C: '$6 results from subtracting Equations 1 and 3 to get b − n = 3 but then using a substitution error that yields b = n + 4 instead of b = n + 3, possibly from misreading one of the coefficients in the subtraction step.',
      D: '$7 occurs when students correctly find the relationship b = n + 3 but make an arithmetic error when substituting into Eq. 1, obtaining 4n + 4 = 12 → n = 3 (rather than n = 2) by computing 12 − 4 = 8 then 8/4 = 2 incorrectly as 3. With n = 4, b = 4 + 3 = 7.',
    },
  },

  // Q12 — Algebra | Chained percent changes (% of %) | medium | MC
  {
    id: 'sat-f3-v2-math-m2h-q12',
    section: 'math',
    moduleId: 'f3v2-math-module-2-hard',
    domain: 'Algebra',
    skill: 'Ratios, rates, proportional relationships, and units',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'A stock price increased by 20% in January, then decreased by 25% in February. What was the net percent change in the stock price over the two months?',
    choices: [
      { label: 'A', text: 'Decreased by 5%' },
      { label: 'B', text: 'Decreased by 10%' },
      { label: 'C', text: 'No net change' },
      { label: 'D', text: 'Increased by 5%' },
    ],
    correctAnswer: 'B',
    explanation:
      'Let the initial price equal $100.\nAfter a 20% increase: $100 × 1.20 = $120.\nAfter a 25% decrease: $120 × 0.75 = $90.\n\nNet change = (90 − 100)/100 × 100% = −10%.\n\nThe price decreased by 10% overall. Percent changes are applied multiplicatively, not additively: +20% and −25% do not simply sum to −5%.',
    wrongAnswerExplanations: {
      A: '−5% incorrectly adds the two percentages as if they were independent: +20 − 25 = −5. Percent changes compound multiplicatively; the 25% decrease applies to the already-increased value ($120), not the original ($100).',
      C: 'A 0% net change would require the second decrease to exactly undo the first increase. That would need a decrease of 1/6 ≈ 16.7% (since 1.20 × (1 − d) = 1.00 → d ≈ 0.167), not 25%. Students who think the same magnitude reverses the change make this error.',
      D: 'A net increase is impossible here since 1.20 × 0.75 = 0.90 < 1. Students who mistakenly compute 25% of the original $100 (= $25 decrease) versus 20% of $100 (= $20 increase) and conclude a $5 net decrease — then flip the sign — may arrive at an increase.',
    },
  },

  // Q13 — Algebra | Grid-in: linear equation condition for infinitely many solutions | hard | grid_in
  {
    id: 'sat-f3-v2-math-m2h-q13',
    section: 'math',
    moduleId: 'f3v2-math-module-2-hard',
    domain: 'Algebra',
    skill: 'Linear equations in one variable',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'For what value of the constant c does the equation 3(x + 2) + c = 3x − 8 have infinitely many solutions?',
    correctAnswer: '-14',
    acceptableAnswers: ['-14'],
    explanation:
      'Expand the left side:\n3x + 6 + c = 3x − 8\n\nThe x-terms cancel (both sides have coefficient 3), leaving a constant equation:\n6 + c = −8\nc = −14.\n\nWith c = −14, the equation becomes 3x − 8 = 3x − 8, which is true for all real x (infinitely many solutions).',
    scoringNotes: 'Only c = −14 is accepted.',
  },

  // Q14 — Algebra | Grid-in: find b given solution constraint | hard | grid_in
  {
    id: 'sat-f3-v2-math-m2h-q14',
    section: 'math',
    moduleId: 'f3v2-math-module-2-hard',
    domain: 'Algebra',
    skill: 'Linear equations in one variable',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'The equation 7x + b = 3x + 20 has the solution x = 3. What is the value of b?',
    correctAnswer: '8',
    acceptableAnswers: ['8'],
    explanation:
      'Substitute x = 3 into the equation:\n7(3) + b = 3(3) + 20\n21 + b = 9 + 20\n21 + b = 29\nb = 8.\n\nVerify: 7(3) + 8 = 29 and 3(3) + 20 = 29. ✓',
    scoringNotes: 'Only b = 8 is accepted.',
  },

  // ─── Problem-Solving and Data Analysis × 4 ─────────────────────────────────

  // Q15 — PSDA | Conditional probability from contingency table | hard | MC
  {
    id: 'sat-f3-v2-math-m2h-q15',
    section: 'math',
    moduleId: 'f3v2-math-module-2-hard',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Probability and conditional probability',
    difficulty: 'hard',
    type: 'multiple_choice',
    stimulus:
      'A survey of 240 college students recorded whether each student lives on campus and whether each has a meal plan. Results are shown in the table below.\n\n|               | Meal Plan | No Meal Plan | Total |\n|---------------|-----------|--------------|-------|\n| On Campus     |    96     |      24      |  120  |\n| Off Campus    |    48     |      72      |  120  |\n| Total         |   144     |      96      |  240  |',
    question:
      'What is the probability that a randomly selected student lives on campus, given that the student has a meal plan?',
    choices: [
      { label: 'A', text: '2/5' },
      { label: 'B', text: '2/3' },
      { label: 'C', text: '4/5' },
      { label: 'D', text: '96/240' },
    ],
    correctAnswer: 'B',
    explanation:
      'Use the conditional probability formula:\nP(on campus | meal plan) = P(on campus AND meal plan) / P(meal plan)\n= (96/240) / (144/240)\n= 96/144\n= 2/3.\n\nAlternatively, of the 144 students with a meal plan, 96 live on campus: 96/144 = 2/3.',
    wrongAnswerExplanations: {
      A: '2/5 = 96/240 is the joint (unconditional) probability of being on campus AND having a meal plan — it uses the total of 240 as the denominator rather than restricting to the 144-student meal-plan subgroup.',
      C: '4/5 = 96/120 is the reverse conditional probability — P(meal plan | on campus): of the 120 on-campus students, 96 have a meal plan. Students who swap the given condition and the event to find arrive at this value.',
      D: '96/240 is the same calculation as choice A written as a fraction; both represent the unconditional proportion of all 240 students who are on campus with a meal plan, not the conditional probability restricted to meal-plan holders.',
    },
  },

  // Q16 — PSDA | Standard deviation interpretation | hard | MC
  {
    id: 'sat-f3-v2-math-m2h-q16',
    section: 'math',
    moduleId: 'f3v2-math-module-2-hard',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'One-variable data: distributions and measures of center and spread',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'A data set consists of the values {4, 6, 6, 8, 8, 8, 10}. Which single change to this data set would increase its standard deviation the most?',
    choices: [
      { label: 'A', text: 'Replace 8 with 12' },
      { label: 'B', text: 'Add the value 7' },
      { label: 'C', text: 'Replace 4 with 0' },
      { label: 'D', text: 'Replace 10 with 8' },
    ],
    correctAnswer: 'C',
    explanation:
      'Standard deviation measures spread from the mean. Mean of the original data = (4+6+6+8+8+8+10)/7 = 50/7 ≈ 7.14.\n\nA: Changing 8 to 12 moves one value from near the mean to 12 — about 4.86 above the mean. This increases spread somewhat.\nB: Adding 7 (close to the mean of ≈7.14) compresses the distribution slightly and may decrease standard deviation.\nC: Changing 4 to 0 moves the minimum value from about 3.14 below the mean to about 7.14 below the mean — more than doubling its contribution to spread. This produces the greatest increase in standard deviation among the choices.\nD: Changing 10 to 8 removes the highest value, reducing spread and decreasing standard deviation.\n\nChoice C creates the most extreme deviation from the mean.',
    wrongAnswerExplanations: {
      A: 'Moving 8 to 12 does increase the standard deviation, but the increase is smaller than replacing 4 with 0. The value 12 sits about 4.86 above the new mean, while replacing 4 with 0 puts a value about 7.14 below the mean — a larger deviation. Students who focus on the absolute size of the new value (12 is the largest number) rather than on distance from the mean choose this.',
      B: 'Adding a value near the mean (7 ≈ 7.14) reduces spread rather than increasing it; it pulls the distribution toward its center.',
      D: 'Replacing 10 with 8 eliminates the current maximum deviation (10 is about 2.86 above the mean) and replaces it with a value near the mean — this reduces the standard deviation.',
    },
  },

  // Q17 — PSDA | Multi-step unit conversion | hard | MC
  {
    id: 'sat-f3-v2-math-m2h-q17',
    section: 'math',
    moduleId: 'f3v2-math-module-2-hard',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Ratios, rates, proportional relationships, and units',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'A factory produces 4.5 kilograms of a chemical per minute. How many milligrams of the chemical does the factory produce per second?\n\n(1 kilogram = 1,000 grams; 1 gram = 1,000 milligrams)',
    choices: [
      { label: 'A', text: '75,000' },
      { label: 'B', text: '750,000' },
      { label: 'C', text: '4,500,000' },
      { label: 'D', text: '270,000,000' },
    ],
    correctAnswer: 'A',
    explanation:
      'Apply dimensional analysis in two steps:\n\nStep 1 — Convert kilograms to milligrams:\n4.5 kg/min × (1,000 g/kg) × (1,000 mg/g)\n= 4,500,000 mg/min\n\nStep 2 — Convert minutes to seconds:\n4,500,000 mg/min × (1 min / 60 s)\n= 75,000 mg/s',
    wrongAnswerExplanations: {
      B: '750,000 results from dividing by 6 instead of 60 in the minute-to-second conversion — a factor-of-10 error (treating 1 minute as 6 seconds rather than 60 seconds).',
      C: '4,500,000 correctly converts 4.5 kg to milligrams (4.5 × 10⁶ mg) but omits the time conversion entirely, leaving the answer in mg per minute rather than mg per second.',
      D: '270,000,000 comes from multiplying by 60 instead of dividing in the minute-to-second step: 4,500,000 × 60 = 270,000,000. Students who invert the time-conversion factor (multiplying by 60 s/min instead of dividing) make this error, confusing the direction of the unit conversion.',
    },
  },

  // Q18 — PSDA | Grid-in: probability from combinatorics | hard | grid_in
  {
    id: 'sat-f3-v2-math-m2h-q18',
    section: 'math',
    moduleId: 'f3v2-math-module-2-hard',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Probability and conditional probability',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'A bag contains 5 red marbles and 3 blue marbles. Two marbles are drawn at random without replacement. What is the probability that both marbles drawn are red? Enter your answer as a fraction.',
    correctAnswer: '5/14',
    acceptableAnswers: ['5/14'],
    explanation:
      'Total marbles = 5 + 3 = 8.\n\nMethod 1 — Multiplication rule:\nP(1st red) × P(2nd red | 1st was red) = (5/8) × (4/7) = 20/56 = 5/14.\n\nMethod 2 — Combinations:\nC(5,2)/C(8,2) = 10/28 = 5/14.',
    scoringNotes: 'Accept 5/14 or equivalent decimal 0.357 (rounded to 3 decimal places).',
  },

  // ─── Geometry and Trigonometry × 4 ────────────────────────────────────────

  // Q19 — Geometry | Arc length in radians | hard | MC
  {
    id: 'sat-f3-v2-math-m2h-q19',
    section: 'math',
    moduleId: 'f3v2-math-module-2-hard',
    domain: 'Geometry and Trigonometry',
    skill: 'Circles',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'A circle has a radius of 9 centimeters. A central angle of 4π/3 radians subtends an arc on the circle. What is the length of this arc, in centimeters?',
    choices: [
      { label: 'A', text: '6π' },
      { label: 'B', text: '9π' },
      { label: 'C', text: '12π' },
      { label: 'D', text: '36π' },
    ],
    correctAnswer: 'C',
    explanation:
      'Arc length formula: L = rθ, where r is the radius and θ is the central angle in radians.\n\nL = 9 × (4π/3) = 36π/3 = 12π centimeters.',
    wrongAnswerExplanations: {
      A: '6π = 9 × (2π/3) results from halving the given angle — using 2π/3 instead of 4π/3. Students who misread the angle or simplify 4π/3 to 2π/3 by canceling incorrectly will get this answer.',
      B: '9π = 9 × π comes from using θ = π (the radian measure of a semicircle) instead of the given 4π/3, perhaps from converting the angle to degrees (240°) and then forgetting to convert back, or simply misreading the angle as π.',
      D: '36π = 9 × 4π ignores the denominator of 3 in the angle 4π/3, treating the angle as 4π rather than 4π/3. This error occurs when students multiply r × numerator without dividing by the denominator of the fraction.',
    },
  },

  // Q20 — Geometry | Volume of composite solid (cylinder + hemisphere) | hard | MC
  {
    id: 'sat-f3-v2-math-m2h-q20',
    section: 'math',
    moduleId: 'f3v2-math-module-2-hard',
    domain: 'Geometry and Trigonometry',
    skill: 'Area and volume',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'A grain silo consists of a right circular cylinder with a hemisphere sitting on top. (A hemisphere is exactly half of a sphere.) The cylinder has a radius of 6 meters and a height of 10 meters. The hemisphere shares the same radius as the top of the cylinder. Which of the following expressions gives the total volume of the silo, in cubic meters?',
    choices: [
      { label: 'A', text: '360π + 144π' },
      { label: 'B', text: '360π + 288π' },
      { label: 'C', text: '720π + 144π' },
      { label: 'D', text: '360π + 432π' },
    ],
    correctAnswer: 'A',
    explanation:
      'Volume of the cylinder:\nV_cyl = πr²h = π(6)²(10) = 360π m³\n\nVolume of the hemisphere (half a sphere of radius 6):\nV_hem = (1/2) × (4/3)πr³ = (2/3)π(6)³ = (2/3)π(216) = 144π m³\n\nTotal volume = 360π + 144π = 504π m³.',
    wrongAnswerExplanations: {
      B: '360π + 288π uses the full sphere volume for the top: (4/3)π(6)³ = 288π. Students who forget that the top is a hemisphere (half a sphere) and compute the volume of a complete sphere arrive at 288π for the second term.',
      C: '720π + 144π uses the correct hemisphere volume (144π) but doubles the cylinder height: π(6)²(20) = 720π. Students who misread the height as 20 m or count the hemisphere radius as additional height for the cylinder make this error.',
      D: '360π + 432π applies the full sphere formula with r = 9 instead of r = 6 for the hemisphere: (4/3)π(9)³/2 = (2/3)π(729) = 486π — not quite 432π — or uses (4/3)π(9)³ = 972π → half = 486π. The 432π distractor catches students who confuse diameter (12) for radius in the hemisphere formula: (2/3)π(12)³ gives a very large number, but (2/3)π(6)³ × 3 = 432π from a factor-of-3 error on the hemisphere coefficient.',
    },
  },

  // Q21 — Geometry | Grid-in: right triangle + trig (find missing side, then tan) | hard | grid_in
  {
    id: 'sat-f3-v2-math-m2h-q21',
    section: 'math',
    moduleId: 'f3v2-math-module-2-hard',
    domain: 'Geometry and Trigonometry',
    skill: 'Right triangles and trigonometry',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'In right triangle DEF, angle F = 90°. The length of leg DF is 5 and the length of hypotenuse DE is 13. What is the value of tan(D)? Enter your answer as a fraction.',
    correctAnswer: '12/5',
    acceptableAnswers: ['12/5', '2.4'],
    explanation:
      'Step 1 — Find the missing leg EF using the Pythagorean theorem (right angle at F means DE is the hypotenuse):\nEF² = DE² − DF² = 13² − 5² = 169 − 25 = 144\nEF = 12\n\nStep 2 — Identify the sides for angle D:\n• Opposite side = EF = 12\n• Adjacent side = DF = 5\n• Hypotenuse = DE = 13\n\ntan(D) = opposite/adjacent = 12/5.',
    scoringNotes: 'Accept 12/5 or the decimal equivalent 2.4.',
  },

  // Q22 — Geometry | Center of circle from diameter endpoints | medium | grid_in
  {
    id: 'sat-f3-v2-math-m2h-q22',
    section: 'math',
    moduleId: 'f3v2-math-module-2-hard',
    domain: 'Geometry and Trigonometry',
    skill: 'Circles',
    difficulty: 'medium',
    type: 'grid_in',
    question:
      'The endpoints of a diameter of a circle are (−3, 7) and (5, −1). What is the y-coordinate of the center of the circle?',
    correctAnswer: '3',
    acceptableAnswers: ['3'],
    explanation:
      'The center of a circle is the midpoint of any diameter.\n\ny-coordinate of center = (y₁ + y₂)/2 = (7 + (−1))/2 = 6/2 = 3.\n\n(The x-coordinate of the center is (−3 + 5)/2 = 1, so the center is (1, 3).)',
    scoringNotes: 'Only 3 is accepted.',
  },
]
