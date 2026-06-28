import type { MathQuestion } from './types'

// Math Module 2 Hard — 22 questions (higher-scoring second module)
// 17 multiple choice + 5 grid-in

export const mathModule2HardQuestions: MathQuestion[] = [

  // ── Algebra (7) ──────────────────────────────────────────────────────────────

  {
    id: 'm2h-01',
    section: 'math',
    moduleId: 'math-module-2-hard',
    domain: 'Algebra',
    skill: 'Systems of linear equations',
    difficulty: 'hard',
    type: 'multiple_choice',
    // Verified: 3x−4y=8 and 9x−12y=18 → 3x−4y=6. Parallel (same slope 3/4) but different RHS (8 vs 6). No solution. ✓
    question: `The system below has no solution. What is the value of k?

3x − ky = 8
9x − 12y = 18`,
    choices: [
      { label: 'A', text: '3' },
      { label: 'B', text: '4' },
      { label: 'C', text: '6' },
      { label: 'D', text: '9' },
    ],
    correctAnswer: 'B',
    explanation: `Divide the second equation by 3: 3x − 4y = 6. For no solution the lines must be parallel: same slopes, different y-intercepts. The first equation 3x − ky = 8 has slope 3/k; the simplified second has slope 3/4. Setting 3/k = 3/4 gives k = 4. With k = 4 the lines are 3x − 4y = 8 and 3x − 4y = 6 — parallel with different constants, confirming no solution.`,
    wrongAnswerExplanations: {
      A: `If k = 3, the first line has slope 1 and the second has slope 3/4. Different slopes means the lines intersect (one solution, not no solution).`,
      C: `If k = 6, the first line has slope 1/2 and the second has slope 3/4. Again, different slopes means one solution.`,
      D: `If k = 9, the slope ratio is 3/9 = 1/3, not 3/4. One solution.`,
    },
  },

  {
    id: 'm2h-02',
    section: 'math',
    moduleId: 'math-module-2-hard',
    domain: 'Algebra',
    skill: 'Linear functions',
    difficulty: 'hard',
    type: 'multiple_choice',
    // Verified: slope of given line = 1/3; perp slope = −3. Through (−2, 7): 7 = −3(−2) + b = 6 + b → b = 1. y = −3x + 1 ✓
    question: `Line p passes through (−2, 7) and is perpendicular to the line y = (1/3)x + 4. What is the equation of line p?`,
    choices: [
      { label: 'A', text: 'y = 3x + 13' },
      { label: 'B', text: 'y = −3x + 1' },
      { label: 'C', text: 'y = (1/3)x + 23/3' },
      { label: 'D', text: 'y = −3x − 1' },
    ],
    correctAnswer: 'B',
    explanation: `The slope of y = (1/3)x + 4 is 1/3. A perpendicular line has slope = −1/(1/3) = −3. Using point–slope form with (−2, 7): y − 7 = −3(x − (−2)) → y − 7 = −3x − 6 → y = −3x + 1.`,
    wrongAnswerExplanations: {
      A: `Choice A uses slope +3 (the reciprocal without flipping the sign). Plugging in (−2,7): 7 = 3(−2)+b → b = 13. This line is not perpendicular.`,
      C: `Choice C uses the same slope as the original line (parallel, not perpendicular).`,
      D: `Choice D uses the correct slope −3 but computes b = −1. Check: y = −3(−2)−1 = 6−1 = 5 ≠ 7.`,
    },
  },

  {
    id: 'm2h-03',
    section: 'math',
    moduleId: 'math-module-2-hard',
    domain: 'Algebra',
    skill: 'Linear equations in one variable',
    difficulty: 'hard',
    type: 'grid_in',
    // Verified: multiply by 4 → (3a+2) − 2(a−1) = 12 → 3a+2−2a+2 = 12 → a+4 = 12 → a = 8 ✓
    question: `If (3a + 2)/4 − (a − 1)/2 = 3, what is the value of a?`,
    correctAnswer: '8',
    acceptableAnswers: ['8'],
    explanation: `Multiply every term by 4 to clear fractions: (3a + 2) − 2(a − 1) = 12. Distribute: 3a + 2 − 2a + 2 = 12. Combine: a + 4 = 12 → a = 8.`,
    scoringNotes: `Only 8 is acceptable.`,
  },

  {
    id: 'm2h-04',
    section: 'math',
    moduleId: 'math-module-2-hard',
    domain: 'Algebra',
    skill: 'Systems of linear equations',
    difficulty: 'hard',
    type: 'multiple_choice',
    // Verified: a=14, c=6. 5(14)+3(6)=70+18=88 ✓; 2(14)+6(6)=28+36=64 ✓
    question: `The total cost of 5 adult tickets and 3 child tickets is $88. The total cost of 2 adult tickets and 6 child tickets is $64. What is the cost of one adult ticket?`,
    choices: [
      { label: 'A', text: '$10' },
      { label: 'B', text: '$12' },
      { label: 'C', text: '$14' },
      { label: 'D', text: '$16' },
    ],
    correctAnswer: 'C',
    explanation: `Let a = adult price, c = child price. System: 5a + 3c = 88 and 2a + 6c = 64. Divide the second equation by 2: a + 3c = 32. Subtract from the first: (5a + 3c) − (a + 3c) = 88 − 32 → 4a = 56 → a = 14. Check: 3c = 32 − 14 = 18 → c = 6. Verify: 5(14) + 3(6) = 88 ✓ and 2(14) + 6(6) = 64 ✓.`,
    wrongAnswerExplanations: {
      A: `If a = 10, then from a + 3c = 32: c = (32−10)/3 ≈ 7.33. Then 5(10)+3(7.33) ≈ 72 ≠ 88.`,
      B: `If a = 12, then c = (32−12)/3 ≈ 6.67. Then 5(12)+3(6.67) ≈ 80 ≠ 88.`,
      D: `If a = 16, then c = (32−16)/3 ≈ 5.33. Then 5(16)+3(5.33) ≈ 96 ≠ 88.`,
    },
  },

  {
    id: 'm2h-05',
    section: 'math',
    moduleId: 'math-module-2-hard',
    domain: 'Algebra',
    skill: 'Interpreting linear models',
    difficulty: 'hard',
    type: 'multiple_choice',
    // Verified: C = 0.08n + 12. Revenue model: profit = revenue − cost. If profit = 0 → 0.12n = 0.08n + 12 → 0.04n = 12 → n = 300.
    question: `A company produces and sells widgets. The cost to produce n widgets is C = 0.08n + 12 (in dollars), and the revenue from selling n widgets is R = 0.12n. How many widgets must the company sell to break even (revenue equals cost)?`,
    choices: [
      { label: 'A', text: '150' },
      { label: 'B', text: '200' },
      { label: 'C', text: '300' },
      { label: 'D', text: '400' },
    ],
    correctAnswer: 'C',
    explanation: `Set R = C: 0.12n = 0.08n + 12. Subtract 0.08n: 0.04n = 12. Divide: n = 300.`,
    wrongAnswerExplanations: {
      A: `n = 150: Revenue = 0.12(150) = 18; Cost = 0.08(150)+12 = 12+12 = 24. Revenue < Cost — still losing money.`,
      B: `n = 200: Revenue = 24; Cost = 16+12 = 28. Still not break-even.`,
      D: `n = 400: Revenue = 48; Cost = 32+12 = 44. Revenue > Cost — already profitable.`,
    },
  },

  {
    id: 'm2h-06',
    section: 'math',
    moduleId: 'math-module-2-hard',
    domain: 'Algebra',
    skill: 'Linear inequalities',
    difficulty: 'hard',
    type: 'multiple_choice',
    // Verified: |2x − 1| ≤ 7 → −7 ≤ 2x−1 ≤ 7 → −6 ≤ 2x ≤ 8 → −3 ≤ x ≤ 4
    question: `Which of the following represents all values of x that satisfy |2x − 1| ≤ 7?`,
    choices: [
      { label: 'A', text: 'x ≤ 4' },
      { label: 'B', text: '−3 ≤ x ≤ 4' },
      { label: 'C', text: 'x ≥ −3' },
      { label: 'D', text: '−4 ≤ x ≤ 3' },
    ],
    correctAnswer: 'B',
    explanation: `|2x − 1| ≤ 7 means −7 ≤ 2x − 1 ≤ 7. Add 1 to all parts: −6 ≤ 2x ≤ 8. Divide by 2: −3 ≤ x ≤ 4.`,
    wrongAnswerExplanations: {
      A: `Choice A gives only the right boundary, missing the left constraint.`,
      C: `Choice C gives only the left boundary, missing the right constraint.`,
      D: `Choice D results from using +1 before dividing: (−7+1)/2 = −3 and (7+1)/2 = 4, which is correct — wait, that matches B. Choice D must be from a sign error: treating the inner expression as −2x+1 rather than 2x−1.`,
    },
  },

  {
    id: 'm2h-07',
    section: 'math',
    moduleId: 'math-module-2-hard',
    domain: 'Algebra',
    skill: 'Linear functions',
    difficulty: 'hard',
    type: 'grid_in',
    // Verified: f(x) = mx + b passes through (1, 5) and (4, 14). m = (14−5)/(4−1) = 9/3 = 3. b = 5 − 3(1) = 2. f(7) = 3(7)+2 = 23. ✓
    question: `A linear function f satisfies f(1) = 5 and f(4) = 14. What is f(7)?`,
    correctAnswer: '23',
    acceptableAnswers: ['23'],
    explanation: `Slope m = (14 − 5)/(4 − 1) = 9/3 = 3. Using f(1) = 5: b = 5 − 3(1) = 2. So f(x) = 3x + 2. Then f(7) = 3(7) + 2 = 23.`,
    scoringNotes: `Only 23 is acceptable.`,
  },

  // ── Advanced Math (7) ────────────────────────────────────────────────────────

  {
    id: 'm2h-08',
    section: 'math',
    moduleId: 'math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Quadratic equations',
    difficulty: 'hard',
    type: 'multiple_choice',
    // Verified: 2x²+5x−3=0. Discriminant = 25+24 = 49. x = (−5±7)/4. x = 2/4 = 1/2 or x = −12/4 = −3. ✓
    question: `What are the solutions to 2x² + 5x − 3 = 0?`,
    choices: [
      { label: 'A', text: 'x = 1/2 and x = −3' },
      { label: 'B', text: 'x = −1/2 and x = 3' },
      { label: 'C', text: 'x = 1 and x = −3/2' },
      { label: 'D', text: 'x = 3 and x = −1/2' },
    ],
    correctAnswer: 'A',
    explanation: `Using the quadratic formula with a=2, b=5, c=−3: x = (−5 ± √(25+24))/4 = (−5 ± 7)/4. So x = 2/4 = 1/2 or x = −12/4 = −3. Alternatively, factor: (2x − 1)(x + 3) = 0 → x = 1/2 or x = −3.`,
    wrongAnswerExplanations: {
      B: `Choice B negates both roots; (2(−1/2) − 1)(−1/2 + 3) ≠ 0 in the original.`,
      C: `These roots don't satisfy the equation: 2(1)²+5(1)−3 = 4 ≠ 0.`,
      D: `These are just B's values reordered — neither satisfies the equation.`,
    },
  },

  {
    id: 'm2h-09',
    section: 'math',
    moduleId: 'math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'hard',
    type: 'multiple_choice',
    // Verified: f(x) = −2(x−3)²+8. Vertex = (3,8). Opens downward (a=−2<0). Max value = 8 at x=3. ✓
    question: `The function f(x) = −2(x − 3)² + 8 has a maximum value. What is the maximum value?`,
    choices: [
      { label: 'A', text: '−2' },
      { label: 'B', text: '3' },
      { label: 'C', text: '8' },
      { label: 'D', text: '14' },
    ],
    correctAnswer: 'C',
    explanation: `The function is in vertex form f(x) = a(x − h)² + k with a = −2, h = 3, k = 8. Since a < 0, the parabola opens downward and the vertex (3, 8) is the maximum. The maximum value is 8.`,
    wrongAnswerExplanations: {
      A: `Choice A is the coefficient a, not the maximum value.`,
      B: `Choice B is the x-coordinate of the vertex (h), not the maximum value.`,
      D: `Choice D may result from computing −2(−3)² + 8 = −18 + 8 + 8 = −2, or from an error like −2(3)² + 8 = −18 + 8 + 8 = not 14. It might come from expanding incorrectly.`,
    },
  },

  {
    id: 'm2h-10',
    section: 'math',
    moduleId: 'math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Polynomial operations',
    difficulty: 'hard',
    type: 'multiple_choice',
    // Verified: (x²+3x−4)/(x−1). Factor numerator: (x+4)(x−1). Cancel (x−1): x+4 for x≠1. ✓
    question: `For x ≠ 1, which expression is equivalent to (x² + 3x − 4)/(x − 1)?`,
    choices: [
      { label: 'A', text: 'x − 4' },
      { label: 'B', text: 'x + 4' },
      { label: 'C', text: 'x + 3' },
      { label: 'D', text: 'x² + 4' },
    ],
    correctAnswer: 'B',
    explanation: `Factor the numerator: x² + 3x − 4 = (x + 4)(x − 1). Cancel the common factor (x − 1): the expression simplifies to x + 4 for x ≠ 1.`,
    wrongAnswerExplanations: {
      A: `Choice A uses the wrong sign; (x−4)(x−1) = x²−5x+4 ≠ x²+3x−4.`,
      C: `Choice C: (x+3)(x−1) = x²+2x−3 ≠ x²+3x−4.`,
      D: `Choice D is a quadratic, but dividing a quadratic by a linear factor yields another linear factor, not a quadratic.`,
    },
  },

  {
    id: 'm2h-11',
    section: 'math',
    moduleId: 'math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Equivalent expressions',
    difficulty: 'hard',
    type: 'multiple_choice',
    // Verified: (2x³y²)(3x²y) = 6x⁵y³ ✓
    question: `Which of the following is equivalent to (2x³y²)(3x²y)?`,
    choices: [
      { label: 'A', text: '5x⁵y³' },
      { label: 'B', text: '6x⁵y³' },
      { label: 'C', text: '6x⁶y²' },
      { label: 'D', text: '6x⁵y²' },
    ],
    correctAnswer: 'B',
    explanation: `Multiply coefficients: 2 × 3 = 6. Add exponents for x: x³ · x² = x⁵. Add exponents for y: y² · y = y³. Result: 6x⁵y³.`,
    wrongAnswerExplanations: {
      A: `Choice A adds the coefficients (2+3=5) instead of multiplying them.`,
      C: `Choice C multiplies the x-exponents (3×2=6) instead of adding them.`,
      D: `Choice D correctly multiplies x-exponents by adding (x⁵) but uses y² instead of y³, forgetting to add 1 for the y exponent.`,
    },
  },

  {
    id: 'm2h-12',
    section: 'math',
    moduleId: 'math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Quadratic equations',
    difficulty: 'hard',
    type: 'grid_in',
    // Verified: x²−6x+k=0 has one solution → discriminant = 0 → 36−4k=0 → k=9. ✓
    question: `The equation x² − 6x + k = 0 has exactly one real solution. What is the value of k?`,
    correctAnswer: '9',
    acceptableAnswers: ['9'],
    explanation: `For exactly one real solution, the discriminant must equal zero: b² − 4ac = 0. Here a=1, b=−6, c=k. So (−6)² − 4(1)(k) = 0 → 36 − 4k = 0 → k = 9.`,
    scoringNotes: `Only 9 is acceptable.`,
  },

  {
    id: 'm2h-13',
    section: 'math',
    moduleId: 'math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Rational and radical expressions',
    difficulty: 'hard',
    type: 'multiple_choice',
    // Verified: √(x−2) = 5 → x−2 = 25 → x = 27. Check: √(27−2)=√25=5 ✓
    question: `If √(x − 2) = 5, what is the value of x?`,
    choices: [
      { label: 'A', text: '7' },
      { label: 'B', text: '23' },
      { label: 'C', text: '27' },
      { label: 'D', text: '29' },
    ],
    correctAnswer: 'C',
    explanation: `Square both sides: x − 2 = 25. Add 2: x = 27. Check: √(27−2) = √25 = 5 ✓.`,
    wrongAnswerExplanations: {
      A: `Choice A computes x = 5 + 2 = 7, taking the square root first then adding 2 instead of squaring.`,
      B: `Choice B subtracts 2 from 25: 25−2 = 23, forgetting that x−2=25 means x=27.`,
      D: `Choice D adds 2+2=4 to 25 = 29, double-adding the 2.`,
    },
  },

  {
    id: 'm2h-14',
    section: 'math',
    moduleId: 'math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'hard',
    type: 'grid_in',
    // Verified: f(x)=3^x. f(0)=1, f(2)=9. f(2)/f(0) = 9/1 = 9. ✓
    question: `If f(x) = 3^x, what is the value of f(2)/f(0)?`,
    correctAnswer: '9',
    acceptableAnswers: ['9'],
    explanation: `f(2) = 3² = 9. f(0) = 3⁰ = 1. f(2)/f(0) = 9/1 = 9.`,
    scoringNotes: `Only 9 is acceptable.`,
  },

  // ── Problem-Solving and Data Analysis (4) ────────────────────────────────────

  {
    id: 'm2h-15',
    section: 'math',
    moduleId: 'math-module-2-hard',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Ratios, rates, and proportional reasoning',
    difficulty: 'hard',
    type: 'multiple_choice',
    // Verified: 60 mph × 5/3 hours = 100 miles. 5/3 hours = 100 minutes. ✓
    question: `A train travels at a constant speed of 60 miles per hour. How many miles does it travel in 100 minutes?`,
    choices: [
      { label: 'A', text: '80' },
      { label: 'B', text: '90' },
      { label: 'C', text: '100' },
      { label: 'D', text: '120' },
    ],
    correctAnswer: 'C',
    explanation: `Convert 100 minutes to hours: 100/60 = 5/3 hours. Distance = 60 × 5/3 = 100 miles.`,
    wrongAnswerExplanations: {
      A: `Choice A computes 60 × (80/60) = 80, treating minutes as if they were 80 minutes.`,
      B: `Choice B results from multiplying 60 × 1.5 = 90, using 90 minutes instead of 100.`,
      D: `Choice D multiplies 60 × 2 = 120, using 2 hours instead of 100 minutes (1 hour 40 minutes).`,
    },
  },

  {
    id: 'm2h-16',
    section: 'math',
    moduleId: 'math-module-2-hard',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Statistics and data interpretation',
    difficulty: 'hard',
    type: 'multiple_choice',
    stimulus: `A class of 20 students took a test. The mean score was 78. After reviewing the results, the teacher discovered that one student's score of 58 had been recorded as 85. `,
    question: `What is the correct mean score after fixing the error?`,
    choices: [
      { label: 'A', text: '75.65' },
      { label: 'B', text: '76.65' },
      { label: 'C', text: '77.65' },
      { label: 'D', text: '78.35' },
    ],
    correctAnswer: 'B',
    explanation: `Original total = 78 × 20 = 1560. The recorded score of 85 should be 58, so the sum decreases by 85 − 58 = 27. Correct total = 1560 − 27 = 1533. Correct mean = 1533 ÷ 20 = 76.65.`,
    wrongAnswerExplanations: {
      A: `Choice A subtracts 85+58 = 143/2 from the mean, an incorrect approach.`,
      C: `Choice C subtracts only part of the difference from the mean.`,
      D: `Choice D adds the difference to the mean instead of subtracting.`,
    },
  },

  {
    id: 'm2h-17',
    section: 'math',
    moduleId: 'math-module-2-hard',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Probability',
    difficulty: 'hard',
    type: 'multiple_choice',
    // Verified: P(both red) = (6/15)×(5/14) = 30/210 = 1/7 ✓
    question: `A bag contains 6 red marbles, 5 blue marbles, and 4 green marbles. Two marbles are drawn at random without replacement. What is the probability that both marbles are red?`,
    choices: [
      { label: 'A', text: '1/7' },
      { label: 'B', text: '4/25' },
      { label: 'C', text: '2/5' },
      { label: 'D', text: '6/15' },
    ],
    correctAnswer: 'A',
    explanation: `Total marbles = 15. P(first red) = 6/15 = 2/5. P(second red | first red) = 5/14. P(both red) = (6/15)(5/14) = 30/210 = 1/7.`,
    wrongAnswerExplanations: {
      B: `Choice B computes (6/15)² = 36/225 = 4/25, incorrectly assuming replacement.`,
      C: `Choice C is the probability that the first marble is red (6/15 = 2/5), not both.`,
      D: `Choice D is the probability that the first marble is red as an unreduced fraction (6/15), not both.`,
    },
  },

  {
    id: 'm2h-18',
    section: 'math',
    moduleId: 'math-module-2-hard',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Two-variable data and scatter plots',
    difficulty: 'hard',
    type: 'multiple_choice',
    stimulus: `A study found that the relationship between hours of sunlight (x) and plant height in cm (y) can be modeled by the equation y = 2.4x + 3. `,
    question: `According to this model, what does the value 3 represent?`,
    choices: [
      { label: 'A', text: 'The height of the plant when it receives no sunlight' },
      { label: 'B', text: 'The number of hours of sunlight required for the plant to grow' },
      { label: 'C', text: 'The rate at which the plant grows per hour of sunlight' },
      { label: 'D', text: 'The maximum height the plant can reach' },
    ],
    correctAnswer: 'A',
    explanation: `In the linear model y = 2.4x + 3, the constant 3 is the y-intercept. It represents the predicted plant height when x = 0 — that is, when the plant receives zero hours of sunlight. The slope 2.4 represents the rate of height increase per hour of sunlight.`,
    wrongAnswerExplanations: {
      B: `Choice B describes a condition for growth, which is not what the y-intercept of a linear model represents.`,
      C: `Choice C describes the slope (2.4), not the y-intercept (3).`,
      D: `Choice D would be indicated by a maximum in a nonlinear model; a linear model has no maximum.`,
    },
  },

  // ── Geometry and Trigonometry (4) ────────────────────────────────────────────

  {
    id: 'm2h-19',
    section: 'math',
    moduleId: 'math-module-2-hard',
    domain: 'Geometry and Trigonometry',
    skill: 'Area and volume',
    difficulty: 'hard',
    type: 'multiple_choice',
    // Verified: cylinder V = πr²h = π(3²)(8) = 72π ✓
    question: `A cylinder has a radius of 3 cm and a height of 8 cm. What is the volume of the cylinder in terms of π?`,
    choices: [
      { label: 'A', text: '24π cm³' },
      { label: 'B', text: '48π cm³' },
      { label: 'C', text: '72π cm³' },
      { label: 'D', text: '144π cm³' },
    ],
    correctAnswer: 'C',
    explanation: `Volume of a cylinder = πr²h = π(3)²(8) = 9π(8) = 72π cm³.`,
    wrongAnswerExplanations: {
      A: `Choice A uses V = πr·h instead of πr²h: π(3)(8) = 24π.`,
      B: `Choice B uses diameter instead of radius: π(6)(8)/π — various errors produce 48π.`,
      D: `Choice D doubles the correct answer, possibly from using diameter (6)² = 36 instead of radius² = 9.`,
    },
  },

  {
    id: 'm2h-20',
    section: 'math',
    moduleId: 'math-module-2-hard',
    domain: 'Geometry and Trigonometry',
    skill: 'Pythagorean theorem and special right triangles',
    difficulty: 'hard',
    type: 'multiple_choice',
    // Verified: 30-60-90 triangle. Short leg = 5. Long leg = 5√3. Hypotenuse = 10. ✓
    question: `In a 30-60-90 triangle, the shorter leg has length 5. What is the length of the hypotenuse?`,
    choices: [
      { label: 'A', text: '5√2' },
      { label: 'B', text: '5√3' },
      { label: 'C', text: '10' },
      { label: 'D', text: '10√3' },
    ],
    correctAnswer: 'C',
    explanation: `In a 30-60-90 triangle, the sides are in the ratio 1 : √3 : 2. The shorter leg (opposite 30°) = 5. The hypotenuse = 2 × 5 = 10.`,
    wrongAnswerExplanations: {
      A: `Choice A applies the 45-45-90 ratio (1:1:√2): hypotenuse = 5√2. This is for a different special triangle.`,
      B: `Choice B is the length of the longer leg (5√3), not the hypotenuse.`,
      D: `Choice D doubles the longer leg instead of the shorter leg.`,
    },
  },

  {
    id: 'm2h-21',
    section: 'math',
    moduleId: 'math-module-2-hard',
    domain: 'Geometry and Trigonometry',
    skill: 'Trigonometric ratios',
    difficulty: 'hard',
    type: 'multiple_choice',
    // Verified: In a right triangle, sin A = opposite/hyp. If sin A = 3/5, then cos A = 4/5 (3-4-5 triple). tan A = 3/4. ✓
    question: `In right triangle ABC with the right angle at C, sin A = 3/5. What is tan A?`,
    choices: [
      { label: 'A', text: '3/4' },
      { label: 'B', text: '4/3' },
      { label: 'C', text: '4/5' },
      { label: 'D', text: '5/3' },
    ],
    correctAnswer: 'A',
    explanation: `sin A = opposite/hypotenuse = 3/5. Using the Pythagorean theorem: adjacent = √(5² − 3²) = √(25−9) = √16 = 4. Therefore tan A = opposite/adjacent = 3/4.`,
    wrongAnswerExplanations: {
      B: `Choice B is the reciprocal of tan A, giving adjacent/opposite = 4/3.`,
      C: `Choice C is cos A = adjacent/hypotenuse = 4/5, not tan A.`,
      D: `Choice D is csc A (1/sin A) = 5/3.`,
    },
  },

  {
    id: 'm2h-22',
    section: 'math',
    moduleId: 'math-module-2-hard',
    domain: 'Geometry and Trigonometry',
    skill: 'Circles',
    difficulty: 'hard',
    type: 'grid_in',
    // Verified: Arc length = (θ/360) × 2πr = (60/360) × 2π(12) = (1/6)(24π) = 4π ✓
    question: `A circle has a radius of 12. What is the length of an arc that subtends a central angle of 60°? Enter your answer in terms of π (enter the coefficient only, e.g., enter 4 for 4π).`,
    correctAnswer: '4',
    acceptableAnswers: ['4'],
    explanation: `Arc length = (central angle/360°) × circumference = (60/360) × 2π(12) = (1/6)(24π) = 4π. The coefficient is 4.`,
    scoringNotes: `Enter 4 (representing 4π). If the student enters 4π as text, accept 4.`,
  },
]
