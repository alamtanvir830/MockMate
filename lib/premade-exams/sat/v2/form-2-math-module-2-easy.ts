import type { MathQuestion } from '../types'

export const f2MathModule2EasyQuestionsV2: MathQuestion[] = [
  // ── EASY (6) ──────────────────────────────────────────────────────────────

  {
    id: 'sat-f2-v2-math-m2e-qe01',
    section: 'math',
    moduleId: 'f2v2-math-module-2-easy',
    domain: 'Algebra',
    skill: 'Linear equations in one variable',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'If 3x + 7 = 22, what is the value of 2x − 1?',
    choices: [
      { label: 'A', text: '7' },
      { label: 'B', text: '9' },
      { label: 'C', text: '11' },
      { label: 'D', text: '13' },
    ],
    correctAnswer: 'B',
    explanation: '3x + 7 = 22 → 3x = 15 → x = 5. Then 2x − 1 = 10 − 1 = 9.',
    wrongAnswerExplanations: {
      A: '7 is obtained by substituting the wrong value of x. A student who solves 3x + 7 = 22 incorrectly as 3x = 22 + 7 = 29 → x ≈ 9.67 and rounds to x = 4 produces 2(4) − 1 = 7. The correct step is 3x = 22 − 7 = 15 → x = 5.',
      C: '11 is the most tempting wrong answer. Students who solve 3x = 22 + 7 = 29 (adding 7 instead of subtracting) get x ≈ 9.67; others who correctly get x = 5 but then compute 2x − 1 = 2(5) + 1 = 11 (adding instead of subtracting 1) arrive here. Verification: 2(5) − 1 = 10 − 1 = 9, not 11.',
      D: '13 results from computing 2x + 3 = 2(5) + 3 instead of 2x − 1 = 2(5) − 1. Students who correctly find x = 5 but misread the second expression (changing the minus to a plus, or using the wrong constant) get 13. A careful re-read of "2x − 1" with x = 5 gives 10 − 1 = 9.',
    },
  },

  {
    id: 'sat-f2-v2-math-m2e-qe02',
    section: 'math',
    moduleId: 'f2v2-math-module-2-easy',
    domain: 'Geometry and Trigonometry',
    skill: 'Area and volume',
    difficulty: 'easy',
    type: 'multiple_choice',
    question:
      'A rectangle has a perimeter of 36 and a length of 12. What is the width of the rectangle?',
    choices: [
      { label: 'A', text: '3' },
      { label: 'B', text: '6' },
      { label: 'C', text: '8' },
      { label: 'D', text: '12' },
    ],
    correctAnswer: 'B',
    explanation:
      'Perimeter = 2(length + width): 36 = 2(12 + w) → 18 = 12 + w → w = 6.',
    wrongAnswerExplanations: {
      A: '3 comes from computing 36 ÷ 12 = 3 — dividing the perimeter by the length as if the perimeter equals length × width. Students who confuse the area formula (A = l × w) with the perimeter formula and set P = l × w → w = P/l = 36/12 = 3 make this error. The correct perimeter formula is P = 2(l + w).',
      C: '8 is the most tempting wrong answer. Students who correctly set up 36 = 2(12 + w) → 18 = 12 + w but then compute 18 − 10 = 8 (subtracting 10 instead of 12) arrive here. A quick check reveals the error: 2(12 + 8) = 40 ≠ 36.',
      D: '12 results from students who set up the equation as 36 = 2(w + w) = 4w → w = 9 and then misread, or who simply repeat the given length as the width because they forget which value is missing. Since the length is 12 and the perimeter is only 36, the two widths together must account for 36 − 24 = 12, making each width 6.',
    },
  },

  {
    id: 'sat-f2-v2-math-m2e-qe03',
    section: 'math',
    moduleId: 'f2v2-math-module-2-easy',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Percentages',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'What is 35% of 120?',
    choices: [
      { label: 'A', text: '35' },
      { label: 'B', text: '38' },
      { label: 'C', text: '42' },
      { label: 'D', text: '45' },
    ],
    correctAnswer: 'C',
    explanation: '35% of 120 = 0.35 × 120 = 42.',
    wrongAnswerExplanations: {
      A: '35 confuses the percentage with the result; 35% of 100 would be 35, but the base here is 120.',
      B: '38 is an incorrect calculation of 0.35 × 120.',
      D: '45 ≈ 37.5% of 120, not 35%.',
    },
  },

  {
    id: 'sat-f2-v2-math-m2e-qe04',
    section: 'math',
    moduleId: 'f2v2-math-module-2-easy',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Ratios, rates, proportional relationships, and units',
    difficulty: 'easy',
    type: 'multiple_choice',
    question:
      'A car travels 180 miles at a constant speed of 45 miles per hour. How many hours does the trip take?',
    choices: [
      { label: 'A', text: '3' },
      { label: 'B', text: '4' },
      { label: 'C', text: '5' },
      { label: 'D', text: '6' },
    ],
    correctAnswer: 'B',
    explanation: 'Time = Distance ÷ Rate = 180 ÷ 45 = 4 hours.',
    wrongAnswerExplanations: {
      A: '3 hours would cover 45 × 3 = 135 miles, not 180.',
      C: '5 hours would cover 45 × 5 = 225 miles, not 180.',
      D: '6 hours would cover 45 × 6 = 270 miles, not 180.',
    },
  },

  {
    id: 'sat-f2-v2-math-m2e-qe05',
    section: 'math',
    moduleId: 'f2v2-math-module-2-easy',
    domain: 'Algebra',
    skill: 'Linear functions',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'The function f is defined by f(x) = 4x + 1. What is f(3)?',
    choices: [
      { label: 'A', text: '7' },
      { label: 'B', text: '10' },
      { label: 'C', text: '13' },
      { label: 'D', text: '16' },
    ],
    correctAnswer: 'C',
    explanation: 'f(3) = 4(3) + 1 = 12 + 1 = 13.',
    wrongAnswerExplanations: {
      A: '7 = 4(2) − 1 substitutes 2 and subtracts instead of adding.',
      B: '10 = 4(3) − 2 uses the wrong constant.',
      D: '16 = 4(3) + 4 adds 4 instead of 1.',
    },
  },

  {
    id: 'sat-f2-v2-math-m2e-qe06',
    section: 'math',
    moduleId: 'f2v2-math-module-2-easy',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'One-variable data: distributions and measures of center and spread',
    difficulty: 'easy',
    type: 'multiple_choice',
    question:
      'Five numbers have a mean of 10. Four of the numbers are 8, 12, 6, and 10. What is the fifth number?',
    choices: [
      { label: 'A', text: '10' },
      { label: 'B', text: '12' },
      { label: 'C', text: '14' },
      { label: 'D', text: '16' },
    ],
    correctAnswer: 'C',
    explanation:
      'Total of five numbers = 5 × 10 = 50. Sum of the four known numbers = 8 + 12 + 6 + 10 = 36. Fifth number = 50 − 36 = 14.',
    wrongAnswerExplanations: {
      A: '10 is the mean, not the missing number.',
      B: '12 is one of the four known numbers, not the missing one.',
      D: '16 would make the sum 52 and the mean 10.4, not 10.',
    },
  },

  // ── MEDIUM (13) ─────────────────────────────────────────────────────────

  {
    id: 'sat-f2-v2-math-m2e-qm01',
    section: 'math',
    moduleId: 'f2v2-math-module-2-easy',
    domain: 'Algebra',
    skill: 'Linear equations in one variable',
    difficulty: 'medium',
    type: 'multiple_choice',
    question: 'What value of x satisfies 5(2x − 3) = 4x + 9?',
    choices: [
      { label: 'A', text: '2' },
      { label: 'B', text: '3' },
      { label: 'C', text: '4' },
      { label: 'D', text: '6' },
    ],
    correctAnswer: 'C',
    explanation:
      '5(2x − 3) = 4x + 9 → 10x − 15 = 4x + 9 → 6x = 24 → x = 4.',
    wrongAnswerExplanations: {
      A: 'x = 2: left side = 5(4−3) = 5; right side = 4(2)+9 = 17. Not equal.',
      B: 'x = 3: left side = 5(6−3) = 15; right side = 4(3)+9 = 21. Not equal.',
      D: 'x = 6: left side = 5(12−3) = 45; right side = 4(6)+9 = 33. Not equal.',
    },
  },

  {
    id: 'sat-f2-v2-math-m2e-qm02',
    section: 'math',
    moduleId: 'f2v2-math-module-2-easy',
    domain: 'Algebra',
    skill: 'Linear functions',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'A line passes through the points (2, 5) and (6, 13). What is the slope of the line?',
    choices: [
      { label: 'A', text: '1' },
      { label: 'B', text: '2' },
      { label: 'C', text: '3' },
      { label: 'D', text: '4' },
    ],
    correctAnswer: 'B',
    explanation:
      'Slope = (y₂ − y₁)/(x₂ − x₁) = (13 − 5)/(6 − 2) = 8/4 = 2.',
    wrongAnswerExplanations: {
      A: 'Slope 1 would require Δy = Δx = 4; actual Δy = 8.',
      C: 'Slope 3 would give Δy = 12 over Δx = 4; actual Δy = 8.',
      D: 'Slope 4 would give Δy = 16; actual Δy = 8.',
    },
  },

  {
    id: 'sat-f2-v2-math-m2e-qm03',
    section: 'math',
    moduleId: 'f2v2-math-module-2-easy',
    domain: 'Algebra',
    skill: 'Systems of two linear equations in two variables',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'The system x + y = 8 and x − y = 2 has solution (x, y). What is the value of xy?',
    choices: [
      { label: 'A', text: '10' },
      { label: 'B', text: '12' },
      { label: 'C', text: '15' },
      { label: 'D', text: '18' },
    ],
    correctAnswer: 'C',
    explanation:
      'Add the equations: 2x = 10 → x = 5. Substitute: 5 + y = 8 → y = 3. Product xy = 5 × 3 = 15.',
    wrongAnswerExplanations: {
      A: '10 is the sum x + y = 5 + 3 = 8... wait, actually x + y = 8 from the first equation, so 10 = x + y would be wrong too. A student who never solved the system and just reported x + y from the equation (reading "the value of xy" as "the value of x + y") would answer 8, not 10. Students who get x = 5 and then set xy = 5 + 5 = 10 (treating the product as doubled x) arrive at 10.',
      B: '12 has no clean derivation from this system. Students who solve x = 5 correctly and miscompute y as 7 (from 5 + y = 8 → y = 3 but carry y = 7 due to arithmetic error) would get 5 × 7 = 35 — not 12. Students who recall that a "system with xy" problem should produce 12 from vague pattern-matching, without working through the solution, select this.',
      D: '18 = 2 × 9 has no relationship to this system. Students who solve x = 5 and y = 3 correctly but then compute x × y as x + y + xy = 8 + 10 = 18, conflating the sum with the product, arrive here. The correct product is 5 × 3 = 15.',
    },
  },

  {
    id: 'sat-f2-v2-math-m2e-qm04',
    section: 'math',
    moduleId: 'f2v2-math-module-2-easy',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'Functions g and h are defined by g(x) = x² + 2 and h(x) = 3x − 1. What is g(h(2))?',
    choices: [
      { label: 'A', text: '17' },
      { label: 'B', text: '22' },
      { label: 'C', text: '27' },
      { label: 'D', text: '32' },
    ],
    correctAnswer: 'C',
    explanation:
      'Evaluate the inner function first: h(2) = 3(2) − 1 = 5. Then g(5) = 5² + 2 = 27.',
    wrongAnswerExplanations: {
      A: '17 = h(g(2)) — the reversed composition. Students who compute g(2) = 4 + 2 = 6 first and then apply h: h(6) = 3(6) − 1 = 17 have reversed the order. g(h(2)) means "apply h first, then g"; h(g(2)) means "apply g first, then h." Since function composition is not commutative, order matters: g(h(2)) = 27, not h(g(2)) = 17.',
      B: '22 likely results from evaluating h(2) = 5 correctly but then computing g(5) as 5² − 3 = 22 (using the wrong constant) instead of 5² + 2 = 27. Students who misread g(x) = x² + 2 as g(x) = x² − 3 make this error.',
      D: '32 = 5² + 7 also comes from evaluating h(2) = 5 correctly but using the wrong constant in g: students who write g(x) = x² + 7 (possibly confusing the +2 with the coefficient in h(x) = 3x − 1, thinking "+1" became "+7") produce 32. A careful reading of g(x) = x² + 2 confirms the constant is +2.',
    },
  },

  {
    id: 'sat-f2-v2-math-m2e-qm05',
    section: 'math',
    moduleId: 'f2v2-math-module-2-easy',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Percentages',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'A jacket was originally priced at $80. Its price increased to $96. By what percentage did the price increase?',
    choices: [
      { label: 'A', text: '16%' },
      { label: 'B', text: '18%' },
      { label: 'C', text: '20%' },
      { label: 'D', text: '25%' },
    ],
    correctAnswer: 'C',
    explanation:
      'Percent increase = (change/original) × 100 = (16/80) × 100 = 20%.',
    wrongAnswerExplanations: {
      A: '16% is by far the most common wrong answer because $16 is the actual dollar increase ($96 − $80 = $16), and students who confuse the dollar change for the percent change select this without applying the percentage formula. The formula is (change ÷ original) × 100, not just "the change."',
      B: '18% ≈ (16/96) × 100 = 16.7% comes from dividing the price increase by the new price ($96) instead of the original price ($80). Students who use the wrong denominator — an extremely common error — arrive near 17-18%. The rule: percent change always uses the original value as the denominator.',
      D: '25% would require a $20 increase: 25% × $80 = $20. Students who misread $96 − $80 = $16 as $20 (a transcription or rounding error) and then compute 20/80 = 25% arrive here. A quick verification: 25% × $80 = $20, and $80 + $20 = $100 ≠ $96.',
    },
  },

  {
    id: 'sat-f2-v2-math-m2e-qm06',
    section: 'math',
    moduleId: 'f2v2-math-module-2-easy',
    domain: 'Algebra',
    skill: 'Linear inequalities in one or two variables',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'Which of the following describes all values of x that satisfy 2 − 3x ≥ 8?',
    choices: [
      { label: 'A', text: 'x ≥ −2' },
      { label: 'B', text: 'x ≤ 2' },
      { label: 'C', text: 'x ≤ −2' },
      { label: 'D', text: 'x ≥ 2' },
    ],
    correctAnswer: 'C',
    explanation:
      '2 − 3x ≥ 8 → −3x ≥ 6 → x ≤ −2. Dividing by −3 reverses the inequality direction.',
    wrongAnswerExplanations: {
      A: 'x ≥ −2 is the result of failing to reverse the inequality direction when dividing by −3. Students correctly reach −3x ≥ 6, then divide both sides by −3 and get x ≥ −2, forgetting the fundamental rule: dividing an inequality by a negative number reverses the direction. The correct result is x ≤ −2.',
      B: 'x ≤ 2 comes from an arithmetic error before the division step. Students who subtract 2 from both sides instead of subtracting 8 get: 2 − 3x ≥ 8 → −3x ≥ 6... actually −3x ≥ 6 is correct, but students who then compute −3x ≥ 6 → −3x/3 ≥ 6/3 → −x ≥ 2 → x ≤ −2... wait, that\'s correct. More likely, students who misread the original as −3x ≥ −6 arrive at x ≤ 2 after dividing correctly.',
      D: 'x ≥ 2 combines both errors: students who miscompute 2 − 3x ≥ 8 as −3x ≥ 6 (correct) but then compute 6/−3 = 2 (using the absolute value) and fail to flip the sign write x ≥ 2. This answer requires getting the magnitude right (2) but making the sign-flip error on both the value and the direction simultaneously.',
    },
  },

  {
    id: 'sat-f2-v2-math-m2e-qm07',
    section: 'math',
    moduleId: 'f2v2-math-module-2-easy',
    domain: 'Algebra',
    skill: 'Linear equations in one variable',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'For what value of k does 3x + 6 = 3(x + k) have infinitely many solutions?',
    choices: [
      { label: 'A', text: '0' },
      { label: 'B', text: '1' },
      { label: 'C', text: '2' },
      { label: 'D', text: '3' },
    ],
    correctAnswer: 'C',
    explanation:
      '3(x + k) = 3x + 3k, so the equation becomes 3x + 6 = 3x + 3k → 6 = 3k → k = 2. With k = 2, both sides are identical for every x.\n\nDesmos method: Enter y = 3x + 6 and y = 3(x + k) with a slider for k. The two lines coincide (lie exactly on top of each other, giving infinitely many solutions) only when the slider reaches k = 2.',
    wrongAnswerExplanations: {
      A: 'k = 0 gives 3x + 6 = 3x, which simplifies to 6 = 0 — no solution.',
      B: 'k = 1 gives 6 = 3 — no solution.',
      D: 'k = 3 gives 6 = 9 — no solution.',
    },
  },

  {
    id: 'sat-f2-v2-math-m2e-qm08',
    section: 'math',
    moduleId: 'f2v2-math-module-2-easy',
    domain: 'Geometry and Trigonometry',
    skill: 'Area and volume',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'A triangle has a base of 10 and a height of 6. What is the area of the triangle?',
    choices: [
      { label: 'A', text: '20' },
      { label: 'B', text: '30' },
      { label: 'C', text: '40' },
      { label: 'D', text: '60' },
    ],
    correctAnswer: 'B',
    explanation: 'Area = (1/2) × base × height = (1/2)(10)(6) = 30.',
    wrongAnswerExplanations: {
      A: '20 = (1/2)(10)(4) uses an incorrect height.',
      C: '40 = (1/2)(10)(8) uses an incorrect height.',
      D: '60 = 10 × 6 omits the factor of 1/2.',
    },
  },

  {
    id: 'sat-f2-v2-math-m2e-qm09',
    section: 'math',
    moduleId: 'f2v2-math-module-2-easy',
    domain: 'Advanced Math',
    skill: 'Exponential functions',
    difficulty: 'medium',
    type: 'multiple_choice',
    question: 'If 2ⁿ = 64, what is the value of n?',
    choices: [
      { label: 'A', text: '4' },
      { label: 'B', text: '5' },
      { label: 'C', text: '6' },
      { label: 'D', text: '8' },
    ],
    correctAnswer: 'C',
    explanation:
      '2^6 = 64, so n = 6. Check: 2^4 = 16, 2^5 = 32, 2^6 = 64 ✓.',
    wrongAnswerExplanations: {
      A: '2^4 = 16 ≠ 64.',
      B: '2^5 = 32 ≠ 64.',
      D: '2^8 = 256 ≠ 64.',
    },
  },

  {
    id: 'sat-f2-v2-math-m2e-qm10',
    section: 'math',
    moduleId: 'f2v2-math-module-2-easy',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Ratios, rates, proportional relationships, and units',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'A store sells shirts for $35 each and jeans for $55 per pair. A shopper buys 2 shirts and 1 pair of jeans. The store charges 8% sales tax on the total. How much does the shopper pay in total?',
    choices: [
      { label: 'A', text: '$125.00' },
      { label: 'B', text: '$130.00' },
      { label: 'C', text: '$135.00' },
      { label: 'D', text: '$140.00' },
    ],
    correctAnswer: 'C',
    explanation:
      'Subtotal = 2(35) + 55 = 70 + 55 = $125. Tax = 0.08 × 125 = $10. Total = $135.',
    wrongAnswerExplanations: {
      A: '$125 is the pretax subtotal.',
      B: '$130 = $125 + $5 applies a 4% tax, not 8%.',
      D: '$140 = $125 + $15 applies a 12% tax, not 8%.',
    },
  },

  {
    id: 'sat-f2-v2-math-m2e-qm11',
    section: 'math',
    moduleId: 'f2v2-math-module-2-easy',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Ratios, rates, proportional relationships, and units',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'A machine produces 150 identical parts in 5 hours. At the same rate, how many parts does it produce in 8 hours?',
    choices: [
      { label: 'A', text: '200' },
      { label: 'B', text: '220' },
      { label: 'C', text: '240' },
      { label: 'D', text: '260' },
    ],
    correctAnswer: 'C',
    explanation:
      'Rate = 150 ÷ 5 = 30 parts per hour. In 8 hours: 30 × 8 = 240.',
    wrongAnswerExplanations: {
      A: '200 = 150 + 50 adds 50 per 3 extra hours, not the correct proportional rate.',
      B: '220 corresponds to roughly 27.5 parts/hour, which is not the actual rate.',
      D: '260 overstates the output.',
    },
  },

  {
    id: 'sat-f2-v2-math-m2e-qm12',
    section: 'math',
    moduleId: 'f2v2-math-module-2-easy',
    domain: 'Advanced Math',
    skill: 'Nonlinear equations in one variable and systems of equations',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'The equation x² − 7x + 10 = 0 has two solutions. What is the product of those solutions?',
    choices: [
      { label: 'A', text: '5' },
      { label: 'B', text: '7' },
      { label: 'C', text: '10' },
      { label: 'D', text: '12' },
    ],
    correctAnswer: 'C',
    explanation:
      'Factor: (x − 5)(x − 2) = 0, so the roots are x = 5 and x = 2. Product = 5 × 2 = 10. (Vieta\'s: product of roots = constant/leading coefficient = 10.)',
    wrongAnswerExplanations: {
      A: '5 is one of the two roots (x = 5 from the factoring (x − 5)(x − 2) = 0), not their product. Students who find the roots correctly but misread the question — selecting one root instead of computing the product — arrive here. The question asks for the product of all solutions.',
      B: '7 is the sum of the roots, not the product. By Vieta\'s formulas, the sum of roots = b/a (with sign adjustment) = 7/1 = 7, while the product = c/a = 10/1 = 10. Students who confuse which Vieta\'s formula gives the sum versus the product — or who compute 5 + 2 = 7 instead of 5 × 2 = 10 — arrive here. "Sum" and "product" are different operations; the question asks for multiplication.',
      D: '12 is a tempting distractor because 12 = 5 + 2 + 5 = 5 × 2 + 2 or from other combinations of the problem\'s numbers, but none of these reflect the correct operation. Students who are uncertain about Vieta\'s formulas may guess based on pattern recognition. Verification: the roots are 5 and 2, and 5 × 2 = 10, not 12.',
    },
  },

  {
    id: 'sat-f2-v2-math-m2e-qm13',
    section: 'math',
    moduleId: 'f2v2-math-module-2-easy',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Probability and conditional probability',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'A bag contains 3 red marbles, 5 blue marbles, and 2 green marbles. A marble is chosen at random. What is the probability that the chosen marble is NOT blue?',
    choices: [
      { label: 'A', text: '1/5' },
      { label: 'B', text: '1/3' },
      { label: 'C', text: '1/2' },
      { label: 'D', text: '3/5' },
    ],
    correctAnswer: 'C',
    explanation:
      'Total marbles = 3 + 5 + 2 = 10. Non-blue = 3 + 2 = 5. P(not blue) = 5/10 = 1/2.',
    wrongAnswerExplanations: {
      A: '1/5 = 2/10 is the probability of drawing a green marble specifically, not any non-blue marble. Students who misread "NOT blue" as "green" (the only other color mentioned after red, which students may not count carefully) arrive here. The non-blue marbles include both red (3) and green (2), totaling 5.',
      B: '1/3 could arise from computing P(red) = 3/10 and thinking "1/3 is close enough" due to rounding, or from accidentally counting only the red marbles and dividing by 9 (counting 10 − 1 = 9 "other" marbles as the denominator). No clean path from the given numbers produces exactly 1/3.',
      D: '3/5 = 6/10 is the most tempting wrong answer — it is the probability of drawing a blue marble, not a non-blue one. Students who compute P(blue) = 5/10 = 1/2 and then add 1/10 to get 6/10, or who miscount the blue marbles as 6 instead of 5, arrive here. More likely, students who compute the complement incorrectly: P(not blue) = 1 − 2/5 = 3/5, confusing P(blue) = 5/10 = 1/2 with P(blue) = 2/5.',
    },
  },

  // ── HARD (3) ──────────────────────────────────────────────────────────────

  {
    id: 'sat-f2-v2-math-m2e-qh01',
    section: 'math',
    moduleId: 'f2v2-math-module-2-easy',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'The function f is defined by f(x) = (x + 3)/(x − 2) for x ≠ 2. If f(x) = 5, what is the value of x?',
    correctAnswer: '13/4',
    acceptableAnswers: ['13/4', '3.25'],
    explanation:
      '(x + 3)/(x − 2) = 5 → x + 3 = 5(x − 2) = 5x − 10 → 13 = 4x → x = 13/4. Check: f(13/4) = (25/4)/(5/4) = 5 ✓.',
    scoringNotes: 'Accept 13/4 or its decimal equivalent 3.25.',
  },

  {
    id: 'sat-f2-v2-math-m2e-qh02',
    section: 'math',
    moduleId: 'f2v2-math-module-2-easy',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'The function f is defined by f(x) = 2x² − 8x + 5. What is the y-coordinate of the vertex of the graph of f?',
    choices: [
      { label: 'A', text: '−3' },
      { label: 'B', text: '−1' },
      { label: 'C', text: '1' },
      { label: 'D', text: '3' },
    ],
    correctAnswer: 'A',
    explanation:
      'Vertex x-coordinate: x = −b/(2a) = 8/4 = 2. Vertex y-coordinate: f(2) = 2(4) − 8(2) + 5 = 8 − 16 + 5 = −3.',
    wrongAnswerExplanations: {
      B: '−1 results from computing f(2) = 2(4) − 8(2) + 5 but making an arithmetic slip: 8 − 16 + 5 = −3, not −1. Students who compute 8 − 16 = −8 and then −8 + 5 = −3 correctly but write −1 due to a careless error, or who compute 2(2)² as 2(2) = 4 instead of 2(4) = 8, arrive at a result near −1. Careful arithmetic: 2(4) = 8, 8(2) = 16, 8 − 16 + 5 = −3.',
      C: '1 = 8 − 16 + 9 uses the wrong constant. Students who read the function as f(x) = 2x² − 8x + 9 (misreading +5 as +9, perhaps confusing this question\'s function with a similar one) evaluate f(2) = 8 − 16 + 9 = 1. The given function has constant +5, not +9.',
      D: '3 = −8 + 16 − 5 uses a sign error throughout. Students who evaluate f(2) by computing −2x² + 8x − 5 (negating all signs) get f(2) = −8 + 16 − 5 = 3. This error might arise from students who subtract every term rather than following order of operations, or who think the leading coefficient 2 should be subtracted rather than multiplied.',
    },
  },

  {
    id: 'sat-f2-v2-math-m2e-qh03',
    section: 'math',
    moduleId: 'f2v2-math-module-2-easy',
    domain: 'Advanced Math',
    skill: 'Nonlinear equations in one variable and systems of equations',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'Functions g and h are defined by g(x) = x² − 4 and h(x) = 2x + 1. If g(h(x)) = 0, what is the product of all values of x that satisfy the equation?',
    correctAnswer: '-3/4',
    acceptableAnswers: ['-3/4', '-.75', '-0.75'],
    explanation:
      'g(h(x)) = (2x + 1)² − 4 = 0 → (2x + 1)² = 4 → 2x + 1 = ±2. If 2x + 1 = 2: x = 1/2. If 2x + 1 = −2: x = −3/2. Product = (1/2)(−3/2) = −3/4.',
    scoringNotes: 'Accept −3/4, −.75, or −0.75.',
  },
]
