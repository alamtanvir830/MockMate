import type { MathQuestion } from './types'

export const f2MathModule2EasyQuestions: MathQuestion[] = [
  // ── EASY (6) ──────────────────────────────────────────────────────────────

  {
    id: 'sat2-math-m2e-e01',
    section: 'math',
    moduleId: 'f2-math-module-2-easy',
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
      A: '7 = 2(4) − 1 uses x = 4; but 3(4) + 7 = 19, not 22.',
      C: '11 = 2(6) − 1 uses x = 6; but 3(6) + 7 = 25, not 22.',
      D: '13 = x + 8 confuses the calculation; substitute correctly.',
    },
  },

  {
    id: 'sat2-math-m2e-e02',
    section: 'math',
    moduleId: 'f2-math-module-2-easy',
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
      A: '3 = 36/12 divides the perimeter by the length, ignoring the perimeter formula.',
      C: '8 would give perimeter 2(12 + 8) = 40, not 36.',
      D: '12 equals the length; the width must be smaller since perimeter is only 36.',
    },
  },

  {
    id: 'sat2-math-m2e-e03',
    section: 'math',
    moduleId: 'f2-math-module-2-easy',
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
    id: 'sat2-math-m2e-e04',
    section: 'math',
    moduleId: 'f2-math-module-2-easy',
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
    id: 'sat2-math-m2e-e05',
    section: 'math',
    moduleId: 'f2-math-module-2-easy',
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
    id: 'sat2-math-m2e-e06',
    section: 'math',
    moduleId: 'f2-math-module-2-easy',
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
    id: 'sat2-math-m2e-m01',
    section: 'math',
    moduleId: 'f2-math-module-2-easy',
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
    id: 'sat2-math-m2e-m02',
    section: 'math',
    moduleId: 'f2-math-module-2-easy',
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
    id: 'sat2-math-m2e-m03',
    section: 'math',
    moduleId: 'f2-math-module-2-easy',
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
      A: '10 = x + y, the sum rather than the product.',
      B: '12 is not the product of x = 5 and y = 3.',
      D: '18 would require xy with different values of x and y than the system produces.',
    },
  },

  {
    id: 'sat2-math-m2e-m04',
    section: 'math',
    moduleId: 'f2-math-module-2-easy',
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
      A: '17 = h(g(2)) = h(6) = 17; this reverses the order of composition.',
      B: '22 applies an incorrect operation to the result 5.',
      D: '32 = 5² + 7 uses the wrong constant.',
    },
  },

  {
    id: 'sat2-math-m2e-m05',
    section: 'math',
    moduleId: 'f2-math-module-2-easy',
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
      A: '16% confuses the dollar change ($16) with the percent change.',
      B: '18% ≈ (16/96) × 100 divides by the new price instead of the original.',
      D: '25% would be a $20 increase from $80; the actual increase is $16.',
    },
  },

  {
    id: 'sat2-math-m2e-m06',
    section: 'math',
    moduleId: 'f2-math-module-2-easy',
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
      A: 'x ≥ −2 fails to reverse the inequality when dividing by −3.',
      B: 'x ≤ 2 results from a sign error in the arithmetic.',
      D: 'x ≥ 2 fails on both the arithmetic and the sign reversal.',
    },
  },

  {
    id: 'sat2-math-m2e-m07',
    section: 'math',
    moduleId: 'f2-math-module-2-easy',
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
      '3(x + k) = 3x + 3k, so the equation becomes 3x + 6 = 3x + 3k → 6 = 3k → k = 2. With k = 2, both sides are identical for every x.',
    wrongAnswerExplanations: {
      A: 'k = 0 gives 3x + 6 = 3x, which simplifies to 6 = 0 — no solution.',
      B: 'k = 1 gives 6 = 3 — no solution.',
      D: 'k = 3 gives 6 = 9 — no solution.',
    },
  },

  {
    id: 'sat2-math-m2e-m08',
    section: 'math',
    moduleId: 'f2-math-module-2-easy',
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
    id: 'sat2-math-m2e-m09',
    section: 'math',
    moduleId: 'f2-math-module-2-easy',
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
    id: 'sat2-math-m2e-m10',
    section: 'math',
    moduleId: 'f2-math-module-2-easy',
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
    id: 'sat2-math-m2e-m11',
    section: 'math',
    moduleId: 'f2-math-module-2-easy',
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
    id: 'sat2-math-m2e-m12',
    section: 'math',
    moduleId: 'f2-math-module-2-easy',
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
      A: '5 is one root, not the product.',
      B: '7 is the sum of the roots, not the product.',
      D: '12 does not follow from any standard computation with these coefficients.',
    },
  },

  {
    id: 'sat2-math-m2e-m13',
    section: 'math',
    moduleId: 'f2-math-module-2-easy',
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
      A: '1/5 = 2/10 is the probability of drawing green only.',
      B: '1/3 is not consistent with any simple count from these values.',
      D: '3/5 = 6/10; but only 5 of the 10 marbles are non-blue.',
    },
  },

  // ── HARD (3) ──────────────────────────────────────────────────────────────

  {
    id: 'sat2-math-m2e-h01',
    section: 'math',
    moduleId: 'f2-math-module-2-easy',
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
    id: 'sat2-math-m2e-h02',
    section: 'math',
    moduleId: 'f2-math-module-2-easy',
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
      B: '−1 results from an arithmetic error when evaluating f(2).',
      C: '1 = 8 − 16 + 9 uses the wrong constant.',
      D: '3 = −8 + 16 − 5 uses a sign error in the formula.',
    },
  },

  {
    id: 'sat2-math-m2e-h03',
    section: 'math',
    moduleId: 'f2-math-module-2-easy',
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
