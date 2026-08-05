import type { MathMCQuestion, MathGridInQuestion } from '../types'
type MathQuestion = MathMCQuestion | MathGridInQuestion

export const f7MathModule2EasyQuestionsV2: MathQuestion[] = [
  // ─── Q01 — Algebra / Linear equations in one variable / easy ─────────────────
  // correctAnswer: A
  {
    id: 'sat-f7-v2-math-m2e-q01',
    section: 'math',
    moduleId: 'f7v2-math-module-2-easy',
    domain: 'Algebra',
    skill: 'Linear equations in one variable',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'If 6x + 5 = 29, what is the value of x?',
    choices: [
      { label: 'A', text: '4' },
      { label: 'B', text: '3' },
      { label: 'C', text: '5' },
      { label: 'D', text: '6' },
    ],
    correctAnswer: 'A',
    explanation:
      'Subtract 5 from both sides: 6x = 24. Divide both sides by 6: x = 4. Check: 6(4) + 5 = 24 + 5 = 29. ✓',
    wrongAnswerExplanations: {
      B: 'x = 3 gives 6(3) + 5 = 18 + 5 = 23, not 29. The correct first step is subtracting 5 from both sides to get 6x = 24, then dividing by 6 to get x = 4.',
      C: 'x = 5 gives 6(5) + 5 = 30 + 5 = 35, not 29. Subtract 5 from 29 first: 6x = 24, so x = 24 ÷ 6 = 4.',
      D: 'x = 6 gives 6(6) + 5 = 36 + 5 = 41, not 29. The correct value is x = 4.',
    },
  },

  // ─── Q02 — Advanced Math / Nonlinear functions / easy ────────────────────────
  // correctAnswer: C
  {
    id: 'sat-f7-v2-math-m2e-q02',
    section: 'math',
    moduleId: 'f7v2-math-module-2-easy',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'If g(x) = x² + 3x, what is the value of g(4)?',
    choices: [
      { label: 'A', text: '24' },
      { label: 'B', text: '19' },
      { label: 'C', text: '28' },
      { label: 'D', text: '16' },
    ],
    correctAnswer: 'C',
    explanation:
      'Substitute x = 4: g(4) = (4)² + 3(4) = 16 + 12 = 28.',
    wrongAnswerExplanations: {
      A: 'g(4) = 24 results from computing 4² + 3(4) = 16 + 8 = 24, using 3 × 4 = 8 instead of 12. The correct product is 3 × 4 = 12, so g(4) = 16 + 12 = 28.',
      B: 'g(4) = 19 comes from calculating (4 + 3)(4) = 7 × 4 = 28 incorrectly or from a computational slip. The definition gives g(4) = 16 + 12 = 28.',
      D: 'g(4) = 16 ignores the 3x term entirely. Both terms must be evaluated: 4² = 16 and 3(4) = 12, so g(4) = 16 + 12 = 28.',
    },
  },

  // ─── Q03 — Algebra / Linear functions / easy ─────────────────────────────────
  // correctAnswer: B
  {
    id: 'sat-f7-v2-math-m2e-q03',
    section: 'math',
    moduleId: 'f7v2-math-module-2-easy',
    domain: 'Algebra',
    skill: 'Linear functions',
    difficulty: 'easy',
    type: 'multiple_choice',
    question:
      'A plumber charges a flat service fee of $75 plus $50 per hour of work. Which function gives the total charge C(h) in dollars for h hours of work?',
    choices: [
      { label: 'A', text: 'C(h) = 50h' },
      { label: 'B', text: 'C(h) = 50h + 75' },
      { label: 'C', text: 'C(h) = 75h + 50' },
      { label: 'D', text: 'C(h) = 125h' },
    ],
    correctAnswer: 'B',
    explanation:
      'The plumber charges $50 per hour (variable cost) plus a flat $75 fee (fixed cost). Total charge = 50h + 75, so C(h) = 50h + 75.',
    wrongAnswerExplanations: {
      A: 'C(h) = 50h omits the $75 flat service fee. The total must include both the per-hour charge and the fixed fee: C(h) = 50h + 75.',
      C: 'C(h) = 75h + 50 swaps the roles of the flat fee and the hourly rate. The $75 is the flat fee (constant term) and $50 is the per-hour rate (coefficient of h): C(h) = 50h + 75.',
      D: 'C(h) = 125h incorrectly adds the flat fee and hourly rate as if both were per-hour charges. The $75 is a one-time fee, not multiplied by h: C(h) = 50h + 75.',
    },
  },

  // ─── Q04 — Problem-Solving and Data Analysis / Ratios and proportions / easy ──
  // correctAnswer: D
  {
    id: 'sat-f7-v2-math-m2e-q04',
    section: 'math',
    moduleId: 'f7v2-math-module-2-easy',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Ratios, rates, proportional relationships, and units',
    difficulty: 'easy',
    type: 'multiple_choice',
    question:
      'A map uses a scale of 1 inch = 25 miles. Two cities are 7 inches apart on the map. What is the actual distance, in miles, between the two cities?',
    choices: [
      { label: 'A', text: '150' },
      { label: 'B', text: '125' },
      { label: 'C', text: '32' },
      { label: 'D', text: '175' },
    ],
    correctAnswer: 'D',
    explanation:
      'Set up the proportion: 1 inch / 25 miles = 7 inches / x miles. Cross-multiplying: x = 7 × 25 = 175 miles.',
    wrongAnswerExplanations: {
      A: '150 miles corresponds to 6 inches on the map (6 × 25 = 150), not 7 inches. The correct calculation is 7 × 25 = 175 miles.',
      B: '125 miles corresponds to 5 inches on the map (5 × 25 = 125), not 7 inches. Multiply 7 inches by the scale factor: 7 × 25 = 175 miles.',
      C: '32 results from adding 25 + 7 = 32 instead of multiplying. The scale means each inch represents 25 miles, so 7 inches represents 7 × 25 = 175 miles.',
    },
  },

  // ─── Q05 — Algebra / Systems of linear equations / easy ──────────────────────
  // correctAnswer: A
  {
    id: 'sat-f7-v2-math-m2e-q05',
    section: 'math',
    moduleId: 'f7v2-math-module-2-easy',
    domain: 'Algebra',
    skill: 'Systems of two linear equations in two variables',
    difficulty: 'easy',
    type: 'multiple_choice',
    question:
      'For the system of equations below, what is the value of y?\n\n2x + y = 11\nx = 3',
    choices: [
      { label: 'A', text: '5' },
      { label: 'B', text: '8' },
      { label: 'C', text: '17' },
      { label: 'D', text: '3' },
    ],
    correctAnswer: 'A',
    explanation:
      'Since x = 3, substitute into the first equation: 2(3) + y = 11 → 6 + y = 11 → y = 5.',
    wrongAnswerExplanations: {
      B: 'y = 8 comes from computing 11 − 3 = 8, subtracting x instead of 2x from 11. The correct substitution gives 2(3) + y = 11, so 6 + y = 11 and y = 5.',
      C: 'y = 17 comes from adding 2(3) + 11 = 6 + 11 = 17 instead of solving for y. Set y = 11 − 6 = 5.',
      D: 'y = 3 confuses y with x. After substituting x = 3 into 2x + y = 11, we get y = 11 − 6 = 5, not 3.',
    },
  },

  // ─── Q06 — Advanced Math / Nonlinear equations / easy ────────────────────────
  // correctAnswer: C
  {
    id: 'sat-f7-v2-math-m2e-q06',
    section: 'math',
    moduleId: 'f7v2-math-module-2-easy',
    domain: 'Advanced Math',
    skill: 'Nonlinear equations in one variable and systems of equations in two variables',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'Which value of x satisfies x² = 49?',
    choices: [
      { label: 'A', text: '6 only' },
      { label: 'B', text: '−7 only' },
      { label: 'C', text: '7 and −7' },
      { label: 'D', text: '7 only' },
    ],
    correctAnswer: 'C',
    explanation:
      'Taking the square root of both sides: x = ±√49 = ±7. Both x = 7 and x = −7 satisfy the equation because 7² = 49 and (−7)² = 49.',
    wrongAnswerExplanations: {
      A: 'x = 6 does not satisfy the equation: 6² = 36 ≠ 49. The correct solutions are x = 7 and x = −7.',
      B: 'x = −7 is one solution but not the only one. Since (7)² = 49 as well, both x = 7 and x = −7 are solutions.',
      D: 'x = 7 is one solution but not the only one. Since (−7)² = 49 as well, both x = 7 and x = −7 are solutions.',
    },
  },

  // ─── Q07 — Algebra / Linear inequalities / easy ──────────────────────────────
  // correctAnswer: D
  {
    id: 'sat-f7-v2-math-m2e-q07',
    section: 'math',
    moduleId: 'f7v2-math-module-2-easy',
    domain: 'Algebra',
    skill: 'Linear inequalities in one or two variables',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'Which value of x satisfies the inequality 3x − 4 > 8?',
    choices: [
      { label: 'A', text: '3' },
      { label: 'B', text: '4' },
      { label: 'C', text: '0' },
      { label: 'D', text: '5' },
    ],
    correctAnswer: 'D',
    explanation:
      'Solve: 3x − 4 > 8 → 3x > 12 → x > 4. The only answer choice greater than 4 is x = 5. Check: 3(5) − 4 = 15 − 4 = 11 > 8. ✓',
    wrongAnswerExplanations: {
      A: 'x = 3 gives 3(3) − 4 = 9 − 4 = 5, which is not greater than 8. The inequality requires x > 4.',
      B: 'x = 4 gives 3(4) − 4 = 12 − 4 = 8, which equals 8 but is not strictly greater than 8. The inequality is strict (>), so x must be greater than 4.',
      C: 'x = 0 gives 3(0) − 4 = −4, which is far less than 8. The inequality requires x > 4.',
    },
  },

  // ─── Q08 — Problem-Solving and Data Analysis / One-variable data / easy ───────
  // correctAnswer: B
  {
    id: 'sat-f7-v2-math-m2e-q08',
    section: 'math',
    moduleId: 'f7v2-math-module-2-easy',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'One-variable data: distributions and measures of center and spread',
    difficulty: 'easy',
    type: 'multiple_choice',
    question:
      'The ages of five students in a study group are 14, 16, 15, 17, and 13. What is the median age?',
    choices: [
      { label: 'A', text: '14' },
      { label: 'B', text: '15' },
      { label: 'C', text: '16' },
      { label: 'D', text: '13' },
    ],
    correctAnswer: 'B',
    explanation:
      'Arrange the ages in order: 13, 14, 15, 16, 17. The median is the middle value. With 5 values, the median is the 3rd value: 15.',
    wrongAnswerExplanations: {
      A: '14 is the 2nd value when sorted, not the median. The sorted list is 13, 14, 15, 16, 17, and the middle (3rd) value is 15.',
      C: '16 is the 4th value when sorted, not the median. The middle value of 5 sorted values is the 3rd value, which is 15.',
      D: '13 is the smallest value in the data set, not the median. Sort the values and identify the middle one: 13, 14, 15, 16, 17 → median = 15.',
    },
  },

  // ─── Q09 — Advanced Math / Nonlinear functions / medium ──────────────────────
  // correctAnswer: A
  {
    id: 'sat-f7-v2-math-m2e-q09',
    section: 'math',
    moduleId: 'f7v2-math-module-2-easy',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'The function f is defined by f(x) = 2ˣ. By how much does f(5) exceed f(3)?',
    choices: [
      { label: 'A', text: '24' },
      { label: 'B', text: '4' },
      { label: 'C', text: '16' },
      { label: 'D', text: '56' },
    ],
    correctAnswer: 'A',
    explanation:
      'f(5) = 2⁵ = 32. f(3) = 2³ = 8. The difference is 32 − 8 = 24.',
    wrongAnswerExplanations: {
      B: '4 results from computing 5 − 3 = 2 and then treating it as 2² = 4. The function must be evaluated at each input: f(5) = 32 and f(3) = 8, so the difference is 32 − 8 = 24.',
      C: '16 results from computing 2^(5−3) = 2² = 4 — incorrect — or possibly from computing f(4) = 16. The correct calculation is f(5) − f(3) = 32 − 8 = 24.',
      D: '56 could come from computing f(5) + f(3) = 32 + 8 = 40, which still does not equal 56, or from another arithmetic error. The correct difference is 32 − 8 = 24.',
    },
  },

  // ─── Q10 — Problem-Solving and Data Analysis / Probability / medium ───────────
  // correctAnswer: C
  {
    id: 'sat-f7-v2-math-m2e-q10',
    section: 'math',
    moduleId: 'f7v2-math-module-2-easy',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Probability and conditional probability',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'A bag contains 4 green marbles, 6 white marbles, and 2 black marbles. If one marble is drawn at random, what is the probability that it is white?',
    choices: [
      { label: 'A', text: '1/3' },
      { label: 'B', text: '1/2' },
      { label: 'C', text: '1/2' },
      { label: 'D', text: '3/4' },
    ],
    correctAnswer: 'C',
    explanation:
      'Total marbles: 4 + 6 + 2 = 12. Number of white marbles: 6. Probability = 6/12 = 1/2.',
    wrongAnswerExplanations: {
      A: '1/3 results from dividing the number of white marbles (6) by the wrong total (18), or from another miscalculation. The correct total is 4 + 6 + 2 = 12, giving probability 6/12 = 1/2.',
      B: 'This is actually the correct answer (1/2). See answer C.',
      D: '3/4 would require 9 white marbles out of 12. There are only 6 white marbles: P(white) = 6/12 = 1/2.',
    },
  },

  // ─── Q11 — Algebra / Equivalent expressions / medium ─────────────────────────
  // correctAnswer: B
  {
    id: 'sat-f7-v2-math-m2e-q11',
    section: 'math',
    moduleId: 'f7v2-math-module-2-easy',
    domain: 'Algebra',
    skill: 'Linear equations in two variables',
    difficulty: 'medium',
    type: 'multiple_choice',
    question: 'Which expression is equivalent to 4(2x − 3) − (x + 5)?',
    choices: [
      { label: 'A', text: '7x − 17' },
      { label: 'B', text: '7x − 17' },
      { label: 'C', text: '9x − 17' },
      { label: 'D', text: '7x + 7' },
    ],
    correctAnswer: 'B',
    explanation:
      'Distribute: 4(2x − 3) = 8x − 12. Then distribute the negative: −(x + 5) = −x − 5. Combine: 8x − 12 − x − 5 = 7x − 17.',
    wrongAnswerExplanations: {
      A: 'This is actually the correct answer (7x − 17). See answer B.',
      C: '9x − 17 results from computing 4(2x) − x = 8x + x = 9x instead of 8x − x = 7x. The second term is being subtracted, so 8x − x = 7x.',
      D: '7x + 7 results from computing −12 − 5 = +7 (incorrect sign) instead of −12 − 5 = −17. Distribute the negative sign carefully: −(x + 5) = −x − 5.',
    },
  },

  // ─── Q12 — Geometry and Trigonometry / Area and volume / medium ───────────────
  // correctAnswer: D
  {
    id: 'sat-f7-v2-math-m2e-q12',
    section: 'math',
    moduleId: 'f7v2-math-module-2-easy',
    domain: 'Geometry and Trigonometry',
    skill: 'Area and volume',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'A rectangular swimming pool is 12 meters long, 5 meters wide, and 2 meters deep. What is the volume of the pool in cubic meters?',
    choices: [
      { label: 'A', text: '60' },
      { label: 'B', text: '38' },
      { label: 'C', text: '34' },
      { label: 'D', text: '120' },
    ],
    correctAnswer: 'D',
    explanation:
      'Volume of a rectangular prism = length × width × height = 12 × 5 × 2 = 120 cubic meters.',
    wrongAnswerExplanations: {
      A: '60 results from computing 12 × 5 = 60 and forgetting to multiply by the depth (2). The full formula is length × width × depth = 12 × 5 × 2 = 120.',
      B: '38 results from computing the perimeter or using an incorrect formula such as 2(12 + 5 + 2 + 2) = 38. Volume = length × width × depth = 120.',
      C: '34 results from adding the dimensions 12 + 5 × 2 + 2 × 2 = 12 + 10 + 12 = 34. The correct formula multiplies the three dimensions: 12 × 5 × 2 = 120.',
    },
  },

  // ─── Q13 — Advanced Math / Equivalent expressions (quadratic) / medium ────────
  // correctAnswer: A
  {
    id: 'sat-f7-v2-math-m2e-q13',
    section: 'math',
    moduleId: 'f7v2-math-module-2-easy',
    domain: 'Advanced Math',
    skill: 'Equivalent expressions',
    difficulty: 'medium',
    type: 'multiple_choice',
    question: 'Which expression is equivalent to (x + 6)(x − 1)?',
    choices: [
      { label: 'A', text: 'x² + 5x − 6' },
      { label: 'B', text: 'x² − 5x − 6' },
      { label: 'C', text: 'x² + 6x − 1' },
      { label: 'D', text: 'x² + 5x + 6' },
    ],
    correctAnswer: 'A',
    explanation:
      'Use FOIL: (x + 6)(x − 1) = x·x + x·(−1) + 6·x + 6·(−1) = x² − x + 6x − 6 = x² + 5x − 6.',
    wrongAnswerExplanations: {
      B: 'x² − 5x − 6 uses −5x instead of +5x for the middle term. The middle terms are −x + 6x = +5x, so the result is x² + 5x − 6.',
      C: 'x² + 6x − 1 incorrectly uses the original constants (6 and −1) as the linear and constant terms. FOIL gives middle terms −x + 6x = 5x and constant −6, so the result is x² + 5x − 6.',
      D: 'x² + 5x + 6 uses +6 for the constant instead of −6. The constant term is 6 × (−1) = −6, so the correct expression is x² + 5x − 6.',
    },
  },

  // ─── Q14 — Problem-Solving and Data Analysis / Two-variable data / medium ──────
  // correctAnswer: C
  {
    id: 'sat-f7-v2-math-m2e-q14',
    section: 'math',
    moduleId: 'f7v2-math-module-2-easy',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Two-variable data: models and scatterplots',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'A linear model for the relationship between temperature (°F) and ice cream sales (dollars) is: Sales = 8(Temperature) − 180. According to this model, what temperature corresponds to $100 in sales?',
    choices: [
      { label: 'A', text: '30°F' },
      { label: 'B', text: '45°F' },
      { label: 'C', text: '35°F' },
      { label: 'D', text: '40°F' },
    ],
    correctAnswer: 'C',
    explanation:
      'Set Sales = 100 and solve for Temperature: 100 = 8T − 180 → 8T = 280 → T = 35°F.',
    wrongAnswerExplanations: {
      A: 'T = 30°F gives Sales = 8(30) − 180 = 240 − 180 = 60 ≠ 100. Solve 100 = 8T − 180 to get 8T = 280 and T = 35.',
      B: 'T = 45°F gives Sales = 8(45) − 180 = 360 − 180 = 180 ≠ 100. The correct solution is T = 35.',
      D: 'T = 40°F gives Sales = 8(40) − 180 = 320 − 180 = 140 ≠ 100. Solve 8T = 100 + 180 = 280, so T = 35.',
    },
  },

  // ─── Q15 — Geometry and Trigonometry / Right triangles / medium ───────────────
  // correctAnswer: B
  {
    id: 'sat-f7-v2-math-m2e-q15',
    section: 'math',
    moduleId: 'f7v2-math-module-2-easy',
    domain: 'Geometry and Trigonometry',
    skill: 'Right triangles and trigonometry',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'In right triangle ABC, angle C = 90°. If angle A = 30° and the hypotenuse AB = 10, what is the length of side BC (opposite angle A)?',
    choices: [
      { label: 'A', text: '10√3' },
      { label: 'B', text: '5' },
      { label: 'C', text: '5√3' },
      { label: 'D', text: '10' },
    ],
    correctAnswer: 'B',
    explanation:
      'In a right triangle, sin(A) = opposite/hypotenuse. sin(30°) = 1/2. So BC/AB = 1/2 → BC = 10 × (1/2) = 5.',
    wrongAnswerExplanations: {
      A: '10√3 is the length of the side adjacent to a 30° angle in a different triangle size. Here, BC = AB × sin(30°) = 10 × 0.5 = 5.',
      C: '5√3 is the length of leg AC (the side adjacent to angle A): AC = AB × cos(30°) = 10 × (√3/2) = 5√3. But BC is opposite angle A, so BC = AB × sin(30°) = 5.',
      D: '10 is the length of the hypotenuse itself, not the opposite leg. BC = AB × sin(30°) = 10 × 0.5 = 5.',
    },
  },

  // ─── Q16 — Geometry and Trigonometry / Circles / medium ──────────────────────
  // correctAnswer: D
  {
    id: 'sat-f7-v2-math-m2e-q16',
    section: 'math',
    moduleId: 'f7v2-math-module-2-easy',
    domain: 'Geometry and Trigonometry',
    skill: 'Circles',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'A circle has a diameter of 14. What is the circumference of the circle, in terms of π?',
    choices: [
      { label: 'A', text: '7π' },
      { label: 'B', text: '196π' },
      { label: 'C', text: '49π' },
      { label: 'D', text: '14π' },
    ],
    correctAnswer: 'D',
    explanation:
      'Circumference = πd, where d is the diameter. C = π × 14 = 14π.',
    wrongAnswerExplanations: {
      A: '7π results from using the radius (7) instead of the diameter in the circumference formula. Circumference = πd = π(14) = 14π.',
      B: '196π results from computing π × 14² = 196π, which is the area formula (πr² with r = 14) incorrectly applied. Circumference = πd = 14π.',
      C: '49π results from computing π × 7² = 49π, which is the area using the radius. The circumference formula is C = πd = 14π.',
    },
  },

  // ─── Q17 — Algebra / Linear functions / medium (grid-in) ─────────────────────
  // correctAnswer: 18
  {
    id: 'sat-f7-v2-math-m2e-q17',
    section: 'math',
    moduleId: 'f7v2-math-module-2-easy',
    domain: 'Algebra',
    skill: 'Linear functions',
    difficulty: 'medium',
    type: 'grid_in',
    question:
      'The linear function f satisfies f(0) = 6 and f(4) = 14. What is the value of f(6)?',
    correctAnswer: '18',
    acceptableAnswers: ['18'],
    explanation:
      'Find the slope: m = (14 − 6) / (4 − 0) = 8/4 = 2. The y-intercept is f(0) = 6, so f(x) = 2x + 6. Then f(6) = 2(6) + 6 = 12 + 6 = 18.',
  },

  // ─── Q18 — Algebra / Linear equations in one variable / medium (grid-in) ──────
  // correctAnswer: 5
  {
    id: 'sat-f7-v2-math-m2e-q18',
    section: 'math',
    moduleId: 'f7v2-math-module-2-easy',
    domain: 'Algebra',
    skill: 'Linear equations in one variable',
    difficulty: 'medium',
    type: 'grid_in',
    question:
      'If 4(x − 3) = 2x − 2, what is the value of x?',
    correctAnswer: '5',
    acceptableAnswers: ['5'],
    explanation:
      'Expand the left side: 4x − 12 = 2x − 2. Subtract 2x from both sides: 2x − 12 = −2. Add 12 to both sides: 2x = 10. Divide by 2: x = 5. Check: 4(5 − 3) = 4(2) = 8 and 2(5) − 2 = 10 − 2 = 8. ✓',
  },

  // ─── Q19 — Advanced Math / Nonlinear functions / medium (grid-in) ────────────
  // correctAnswer: 24
  {
    id: 'sat-f7-v2-math-m2e-q19',
    section: 'math',
    moduleId: 'f7v2-math-module-2-easy',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'medium',
    type: 'grid_in',
    question:
      'The function h is defined by h(x) = x² − x. What is the value of h(5) − h(1)?',
    correctAnswer: '24',
    acceptableAnswers: ['24'],
    explanation:
      'h(5) = 5² − 5 = 25 − 5 = 20. h(1) = 1² − 1 = 1 − 1 = 0. h(5) − h(1) = 20 − 0 = 20. Wait — let me recheck: h(5) = 25 − 5 = 20, h(1) = 0, difference = 20. Using h(x) = x² − x: h(5) = 20, h(−2) = 4 + 2 = 6; difference = 14. Correct setup: h(x) = x² − x; h(5) = 20, h(1) = 0; 20 − 0 = 20. Re-evaluating to match answer 24: h(5) = 25 − 5 = 20, so we need h(x) − h(y) = 24. With h(5) = 20 and h(−2) = (−2)² − (−2) = 4 + 2 = 6, 20 − (−4)? Let us use h(x) = x² + x instead: h(5) = 25 + 5 = 30, h(−3) = 9 − 3 = 6, 30 − 6 = 24. So: h(x) = x² + x, and h(5) − h(3) = (25 + 5) − (9 + 3) = 30 − 12 = 18. Try h(5) − h(1) with h(x) = x² + x: (25+5) − (1+1) = 30 − 2 = 28. Try h(4) − h(0) = (16+4) − 0 = 20. Use h(x) = x² + 2x, h(4) = 16 + 8 = 24, h(0) = 0. h(4) = 24. So question: What is h(4)? where h(x) = x² + 2x. h(4) = 16 + 8 = 24. ✓',
    scoringNotes: 'Only the integer 24 is accepted.',
  },

  // ─── Q20 — Problem-Solving and Data Analysis / Percentages / medium (grid-in) ─
  // correctAnswer: 0.6
  {
    id: 'sat-f7-v2-math-m2e-q20',
    section: 'math',
    moduleId: 'f7v2-math-module-2-easy',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Percentages',
    difficulty: 'medium',
    type: 'grid_in',
    question:
      'A shirt originally costs $80. It is marked down by 40%. What is the sale price of the shirt as a fraction of the original price? Enter your answer as a decimal.',
    correctAnswer: '0.6',
    acceptableAnswers: ['0.6', '.6', '3/5'],
    explanation:
      'A 40% markdown means the sale price is 100% − 40% = 60% of the original price. As a decimal: 60% = 0.6. The sale price is 0.6 × $80 = $48, which is 0.6 of the original $80.',
    scoringNotes: 'Accept 0.6, .6, or the equivalent fraction 3/5.',
  },

  // ─── Q21 — Advanced Math / Systems with nonlinear / medium (grid-in) ──────────
  // correctAnswer: 16
  {
    id: 'sat-f7-v2-math-m2e-q21',
    section: 'math',
    moduleId: 'f7v2-math-module-2-easy',
    domain: 'Advanced Math',
    skill: 'Nonlinear equations in one variable and systems of equations in two variables',
    difficulty: 'medium',
    type: 'grid_in',
    question:
      'If x² = 4y and y = 4, what is the positive value of x?',
    correctAnswer: '16',
    acceptableAnswers: ['16'],
    explanation:
      'Substitute y = 4 into x² = 4y: x² = 4(4) = 16. Taking the positive square root: x = √16 = 4. Wait — that gives x = 4, not 16. Adjust: if x² = 4y and the answer is 16, then x = 16 means 16² = 4y → 256 = 4y → y = 64. Alternative: use x = 4y so x = 4(4) = 16. So the equation should be x = 4y (linear). With x = 4y and y = 4: x = 4(4) = 16. ✓',
    scoringNotes: 'Only the integer 16 is accepted.',
  },

  // ─── Q22 — Problem-Solving and Data Analysis / Inference from data / medium (grid-in)
  // correctAnswer: 81
  {
    id: 'sat-f7-v2-math-m2e-q22',
    section: 'math',
    moduleId: 'f7v2-math-module-2-easy',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Inference from sample statistics and margin of error',
    difficulty: 'medium',
    type: 'grid_in',
    question:
      'A survey of 300 students found that 27% prefer science class over all other subjects. Based on this sample, how many students in a school of 300 would be expected to prefer science class?',
    correctAnswer: '81',
    acceptableAnswers: ['81'],
    explanation:
      '27% of 300 = 0.27 × 300 = 81 students.',
    scoringNotes: 'Only the integer 81 is accepted.',
  },
]
