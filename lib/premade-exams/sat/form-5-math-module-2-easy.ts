import type { MathQuestion } from './types'

export const f5MathModule2EasyQuestions: MathQuestion[] = [
  // ── Algebra (7) ───────────────────────────────────────────────────────────

  // q01: Linear equations in one variable, easy, multiple_choice
  {
    id: 'sat-f5-math-m2e-q01',
    section: 'math',
    moduleId: 'f5-math-module-2-easy',
    domain: 'Algebra',
    skill: 'Linear equations in one variable',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'If 4x − 3 = 9, what is the value of x?',
    choices: [
      { label: 'A', text: '2' },
      { label: 'B', text: '3' },
      { label: 'C', text: '4' },
      { label: 'D', text: '6' },
    ],
    correctAnswer: 'B',
    explanation:
      'Add 3 to both sides: 4x = 12. Divide by 4: x = 3.',
    wrongAnswerExplanations: {
      A: 'x = 2 gives 4(2) − 3 = 5, not 9.',
      C: 'x = 4 gives 4(4) − 3 = 13, not 9.',
      D: 'x = 6 gives 4(6) − 3 = 21, not 9.',
    },
  },

  // q02: Linear functions, easy, multiple_choice
  {
    id: 'sat-f5-math-m2e-q02',
    section: 'math',
    moduleId: 'f5-math-module-2-easy',
    domain: 'Algebra',
    skill: 'Linear functions',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'The function f is defined by f(x) = 2x + 5. What is the slope of the graph of f in the xy-plane?',
    choices: [
      { label: 'A', text: '5' },
      { label: 'B', text: '7' },
      { label: 'C', text: '2' },
      { label: 'D', text: '10' },
    ],
    correctAnswer: 'C',
    explanation:
      'The function is in slope-intercept form f(x) = mx + b, where m is the slope and b is the y-intercept. Here m = 2, so the slope is 2.',
    wrongAnswerExplanations: {
      A: '5 is the y-intercept (b), not the slope.',
      B: '7 is the sum of the slope and intercept, not the slope alone.',
      D: '10 is not derived from the equation; the coefficient of x is 2.',
    },
  },

  // q03: Linear equations in two variables, easy, multiple_choice
  {
    id: 'sat-f5-math-m2e-q03',
    section: 'math',
    moduleId: 'f5-math-module-2-easy',
    domain: 'Algebra',
    skill: 'Linear equations in two variables',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'Which ordered pair (x, y) is a solution to y = 3x − 1?',
    choices: [
      { label: 'A', text: '(1, 4)' },
      { label: 'B', text: '(2, 5)' },
      { label: 'C', text: '(0, 1)' },
      { label: 'D', text: '(3, 7)' },
    ],
    correctAnswer: 'B',
    explanation:
      'Substitute x = 2: y = 3(2) − 1 = 6 − 1 = 5. The pair (2, 5) satisfies the equation.',
    wrongAnswerExplanations: {
      A: 'x = 1 gives y = 3(1) − 1 = 2, not 4.',
      C: 'x = 0 gives y = 3(0) − 1 = −1, not 1.',
      D: 'x = 3 gives y = 3(3) − 1 = 8, not 7.',
    },
  },

  // q04: Systems of two linear equations, easy, multiple_choice
  {
    id: 'sat-f5-math-m2e-q04',
    section: 'math',
    moduleId: 'f5-math-module-2-easy',
    domain: 'Algebra',
    skill: 'Systems of two linear equations in two variables',
    difficulty: 'easy',
    type: 'multiple_choice',
    question:
      'What is the value of x in the solution to the system of equations below?\ny = x + 3\n2x + y = 9',
    choices: [
      { label: 'A', text: '1' },
      { label: 'B', text: '2' },
      { label: 'C', text: '3' },
      { label: 'D', text: '5' },
    ],
    correctAnswer: 'B',
    explanation:
      'Substitute y = x + 3 into the second equation: 2x + (x + 3) = 9 → 3x + 3 = 9 → 3x = 6 → x = 2.',
    wrongAnswerExplanations: {
      A: 'x = 1 gives y = 4, and 2(1) + 4 = 6 ≠ 9.',
      C: 'x = 3 gives y = 6, and 2(3) + 6 = 12 ≠ 9.',
      D: '5 is the y-value when x = 2, not the x-value.',
    },
  },

  // q05: Linear equations in one variable, easy, grid_in
  {
    id: 'sat-f5-math-m2e-q05',
    section: 'math',
    moduleId: 'f5-math-module-2-easy',
    domain: 'Algebra',
    skill: 'Linear equations in one variable',
    difficulty: 'easy',
    type: 'grid_in',
    question: 'If 5x + 4 = 19, what is the value of x?',
    correctAnswer: '3',
    acceptableAnswers: ['3'],
    explanation:
      'Subtract 4 from both sides: 5x = 15. Divide by 5: x = 3.',
  },

  // q06: Linear inequalities, medium, multiple_choice
  {
    id: 'sat-f5-math-m2e-q06',
    section: 'math',
    moduleId: 'f5-math-module-2-easy',
    domain: 'Algebra',
    skill: 'Linear inequalities in one or two variables',
    difficulty: 'medium',
    type: 'multiple_choice',
    question: 'Which of the following describes all values of x for which 3x − 4 > 8?',
    choices: [
      { label: 'A', text: 'x > 4' },
      { label: 'B', text: 'x > 1' },
      { label: 'C', text: 'x < 4' },
      { label: 'D', text: 'x > 2' },
    ],
    correctAnswer: 'A',
    explanation:
      'Add 4 to both sides: 3x > 12. Divide by 3: x > 4.',
    wrongAnswerExplanations: {
      B: 'x > 1 would result from incorrectly dividing 12 by a wrong number or misreading the inequality.',
      C: 'The inequality sign does not flip here since we divided by a positive number; the correct direction is x > 4.',
      D: 'x > 2 results from subtracting incorrectly; 3x > 6 would give x > 2, but 3x > 12 gives x > 4.',
    },
  },

  // q07: Linear functions, medium, multiple_choice
  {
    id: 'sat-f5-math-m2e-q07',
    section: 'math',
    moduleId: 'f5-math-module-2-easy',
    domain: 'Algebra',
    skill: 'Linear functions',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'A salesperson earns a base salary of $50 per day plus $15 for every item sold. The function f(n) = 15n + 50 models the total daily earnings in dollars, where n is the number of items sold. What does the value 15 represent in this context?',
    choices: [
      { label: 'A', text: 'The total earnings when no items are sold' },
      { label: 'B', text: 'The total number of items the salesperson must sell each day' },
      { label: 'C', text: 'The amount earned in dollars for each item sold' },
      { label: 'D', text: 'The maximum daily earnings in dollars' },
    ],
    correctAnswer: 'C',
    explanation:
      'In the linear function f(n) = 15n + 50, the coefficient 15 is the rate of change. For each additional item sold (increase of 1 in n), the earnings increase by $15. This is the amount earned per item sold.',
    wrongAnswerExplanations: {
      A: 'When n = 0, f(0) = 50. That $50 is the base salary (y-intercept), not 15.',
      B: '15 is a dollar amount per item, not a quantity of items.',
      D: 'There is no stated maximum; as n increases, earnings continue to rise.',
    },
  },

  // ── Advanced Math (6) ─────────────────────────────────────────────────────

  // q08: Quadratic equations, easy, multiple_choice
  {
    id: 'sat-f5-math-m2e-q08',
    section: 'math',
    moduleId: 'f5-math-module-2-easy',
    domain: 'Advanced Math',
    skill: 'Quadratic equations',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'Which of the following are solutions to x² + 5x + 6 = 0?',
    choices: [
      { label: 'A', text: 'x = 2 and x = 3' },
      { label: 'B', text: 'x = −2 and x = −3' },
      { label: 'C', text: 'x = −1 and x = −6' },
      { label: 'D', text: 'x = 1 and x = 6' },
    ],
    correctAnswer: 'B',
    explanation:
      'Factor: x² + 5x + 6 = (x + 2)(x + 3) = 0. Setting each factor to zero gives x = −2 or x = −3.',
    wrongAnswerExplanations: {
      A: 'x = 2 gives 4 + 10 + 6 = 20 ≠ 0. The signs should be negative.',
      C: '(x + 1)(x + 6) = x² + 7x + 6, which has a middle term of 7x, not 5x.',
      D: 'x = 1 gives 1 + 5 + 6 = 12 ≠ 0.',
    },
  },

  // q09: Equivalent expressions, easy, multiple_choice
  {
    id: 'sat-f5-math-m2e-q09',
    section: 'math',
    moduleId: 'f5-math-module-2-easy',
    domain: 'Advanced Math',
    skill: 'Equivalent expressions',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'Which expression is equivalent to (x + 3)(x + 2)?',
    choices: [
      { label: 'A', text: 'x² + 5x + 5' },
      { label: 'B', text: 'x² + 6x + 6' },
      { label: 'C', text: 'x² + 5x + 6' },
      { label: 'D', text: 'x² + 3x + 6' },
    ],
    correctAnswer: 'C',
    explanation:
      'Use FOIL: (x + 3)(x + 2) = x·x + x·2 + 3·x + 3·2 = x² + 2x + 3x + 6 = x² + 5x + 6.',
    wrongAnswerExplanations: {
      A: 'The constant term should be 3 × 2 = 6, not 5.',
      B: 'The middle term should be 2x + 3x = 5x, not 6x.',
      D: 'The middle term is 2x + 3x = 5x, not 3x.',
    },
  },

  // q10: Nonlinear functions, easy, multiple_choice
  {
    id: 'sat-f5-math-m2e-q10',
    section: 'math',
    moduleId: 'f5-math-module-2-easy',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'The function f is defined by f(x) = x² − 3. What is the value of f(4)?',
    choices: [
      { label: 'A', text: '1' },
      { label: 'B', text: '8' },
      { label: 'C', text: '13' },
      { label: 'D', text: '19' },
    ],
    correctAnswer: 'C',
    explanation:
      'Substitute x = 4: f(4) = (4)² − 3 = 16 − 3 = 13.',
    wrongAnswerExplanations: {
      A: '1 results from computing 4 − 3 instead of 4² − 3.',
      B: '8 results from computing 2(4) − 3 + 3 or a similar arithmetic error.',
      D: '19 results from computing 4² + 3 = 19 instead of 4² − 3.',
    },
  },

  // q11: Quadratic equations, medium, multiple_choice
  {
    id: 'sat-f5-math-m2e-q11',
    section: 'math',
    moduleId: 'f5-math-module-2-easy',
    domain: 'Advanced Math',
    skill: 'Quadratic equations',
    difficulty: 'medium',
    type: 'multiple_choice',
    question: 'What are the zeros of the function f(x) = x² − 7x + 10?',
    choices: [
      { label: 'A', text: 'x = −2 and x = −5' },
      { label: 'B', text: 'x = 2 and x = 5' },
      { label: 'C', text: 'x = 1 and x = 10' },
      { label: 'D', text: 'x = 7 and x = 10' },
    ],
    correctAnswer: 'B',
    explanation:
      'Factor: x² − 7x + 10 = (x − 2)(x − 5) = 0. Setting each factor to zero: x = 2 or x = 5.',
    wrongAnswerExplanations: {
      A: '(x + 2)(x + 5) = x² + 7x + 10, which has a positive middle term, not −7x.',
      C: '(x − 1)(x − 10) = x² − 11x + 10, which has −11x, not −7x.',
      D: 'x = 7 gives 49 − 49 + 10 = 10 ≠ 0.',
    },
  },

  // q12: Exponential functions, medium, multiple_choice
  {
    id: 'sat-f5-math-m2e-q12',
    section: 'math',
    moduleId: 'f5-math-module-2-easy',
    domain: 'Advanced Math',
    skill: 'Exponential functions',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'A colony of bacteria starts with 200 cells and doubles every hour. Which function gives the number of bacteria cells B after t hours?',
    choices: [
      { label: 'A', text: 'B(t) = 200 + 2t' },
      { label: 'B', text: 'B(t) = 200t²' },
      { label: 'C', text: 'B(t) = 200(2)^t' },
      { label: 'D', text: 'B(t) = 2(200)^t' },
    ],
    correctAnswer: 'C',
    explanation:
      'The colony starts at 200 and multiplies by 2 each hour. After t hours, the count is 200 × 2^t. This is exponential growth with initial value 200 and growth factor 2.',
    wrongAnswerExplanations: {
      A: 'B(t) = 200 + 2t is linear, adding 2 each hour rather than doubling.',
      B: 'B(t) = 200t² is a quadratic (polynomial) model, not an exponential doubling model.',
      D: 'B(t) = 2(200)^t places the initial amount as the base, which is not how exponential growth is modeled. After 1 hour it gives 2(200) = 400 but after 2 hours it gives 2(40000) = 80000, which is far too large.',
    },
  },

  // q13: Equivalent expressions, medium, grid_in
  {
    id: 'sat-f5-math-m2e-q13',
    section: 'math',
    moduleId: 'f5-math-module-2-easy',
    domain: 'Advanced Math',
    skill: 'Equivalent expressions',
    difficulty: 'medium',
    type: 'grid_in',
    question:
      'The expression (2x + 4) / 2 can be written in the form x + c for some constant c. If x = 5, what is the value of x + c?',
    correctAnswer: '7',
    acceptableAnswers: ['7'],
    explanation:
      'Simplify: (2x + 4) / 2 = x + 2. So c = 2. When x = 5, x + c = 5 + 2 = 7.',
  },

  // ── Problem-Solving and Data Analysis (5) ────────────────────────────────

  // q14: Ratios, rates, proportional relationships, easy, multiple_choice
  {
    id: 'sat-f5-math-m2e-q14',
    section: 'math',
    moduleId: 'f5-math-module-2-easy',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Ratios, rates, proportional relationships, and units',
    difficulty: 'easy',
    type: 'multiple_choice',
    question:
      'A car travels at a constant speed of 60 miles per hour. How many miles does the car travel in 2.5 hours?',
    choices: [
      { label: 'A', text: '100' },
      { label: 'B', text: '120' },
      { label: 'C', text: '150' },
      { label: 'D', text: '180' },
    ],
    correctAnswer: 'C',
    explanation:
      'Distance = speed × time = 60 miles/hour × 2.5 hours = 150 miles.',
    wrongAnswerExplanations: {
      A: '100 miles corresponds to 60 × 1.67 hours, not 2.5 hours.',
      B: '120 miles corresponds to 60 × 2 hours, using 2 instead of 2.5.',
      D: '180 miles corresponds to 60 × 3 hours, using 3 instead of 2.5.',
    },
  },

  // q15: Percentages, easy, multiple_choice
  {
    id: 'sat-f5-math-m2e-q15',
    section: 'math',
    moduleId: 'f5-math-module-2-easy',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Percentages',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'What is 35% of 80?',
    choices: [
      { label: 'A', text: '24' },
      { label: 'B', text: '28' },
      { label: 'C', text: '35' },
      { label: 'D', text: '45' },
    ],
    correctAnswer: 'B',
    explanation:
      '35% of 80 = 0.35 × 80 = 28.',
    wrongAnswerExplanations: {
      A: '24 = 30% of 80. The percent used was 30, not 35.',
      C: '35 is the percent itself, not 35% of 80.',
      D: '45 = 56.25% of 80, which does not match the given percent.',
    },
  },

  // q16: Percentages, medium, multiple_choice
  {
    id: 'sat-f5-math-m2e-q16',
    section: 'math',
    moduleId: 'f5-math-module-2-easy',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Percentages',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'The price of a jacket increased from $60 to $90. By what percent did the price increase?',
    choices: [
      { label: 'A', text: '30%' },
      { label: 'B', text: '33%' },
      { label: 'C', text: '50%' },
      { label: 'D', text: '150%' },
    ],
    correctAnswer: 'C',
    explanation:
      'Percent increase = (change / original) × 100 = (90 − 60) / 60 × 100 = 30 / 60 × 100 = 50%.',
    wrongAnswerExplanations: {
      A: '30% is the dollar amount of the increase ($30), not the percent increase.',
      B: '33% would result from dividing the increase by the new price (30/90 ≈ 33%), but percent change uses the original price.',
      D: '150% would mean the price increased by 1.5 times the original; the new price is 1.5 times the original, but the increase itself is 50%.',
    },
  },

  // q17: Probability, easy, multiple_choice
  {
    id: 'sat-f5-math-m2e-q17',
    section: 'math',
    moduleId: 'f5-math-module-2-easy',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Probability and conditional probability',
    difficulty: 'easy',
    type: 'multiple_choice',
    question:
      'A bag contains 3 red marbles, 5 blue marbles, and 2 green marbles. If one marble is chosen at random, what is the probability that it is red?',
    choices: [
      { label: 'A', text: '1/5' },
      { label: 'B', text: '3/10' },
      { label: 'C', text: '1/3' },
      { label: 'D', text: '3/5' },
    ],
    correctAnswer: 'B',
    explanation:
      'Total marbles = 3 + 5 + 2 = 10. Probability of red = 3/10.',
    wrongAnswerExplanations: {
      A: '1/5 = 2/10, which is the probability of picking green, not red.',
      C: '1/3 would be the probability if there were 9 total marbles, but there are 10.',
      D: '3/5 = 6/10 is the probability of picking blue or green combined.',
    },
  },

  // q18: Data analysis and statistics, medium, multiple_choice
  {
    id: 'sat-f5-math-m2e-q18',
    section: 'math',
    moduleId: 'f5-math-module-2-easy',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'One-variable data: distributions and measures of center and spread',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'Five students took a quiz and received scores of 72, 78, 84, 90, and 96. What is the mean score for the five students?',
    choices: [
      { label: 'A', text: '80' },
      { label: 'B', text: '82' },
      { label: 'C', text: '84' },
      { label: 'D', text: '86' },
    ],
    correctAnswer: 'C',
    explanation:
      'Mean = (72 + 78 + 84 + 90 + 96) / 5 = 420 / 5 = 84.',
    wrongAnswerExplanations: {
      A: '80 would be the mean if the sum were 400, but 72 + 78 + 84 + 90 + 96 = 420.',
      B: '82 is not the mean; the correct sum of 420 divided by 5 gives 84.',
      D: '86 would require a total sum of 430, not 420.',
    },
  },

  // ── Geometry and Trigonometry (4) ─────────────────────────────────────────

  // q19: Area and volume, easy, multiple_choice
  {
    id: 'sat-f5-math-m2e-q19',
    section: 'math',
    moduleId: 'f5-math-module-2-easy',
    domain: 'Geometry and Trigonometry',
    skill: 'Area and volume',
    difficulty: 'easy',
    type: 'multiple_choice',
    question:
      'A rectangle has a length of 8 inches and a width of 5 inches. What is the area of the rectangle in square inches?',
    choices: [
      { label: 'A', text: '13' },
      { label: 'B', text: '26' },
      { label: 'C', text: '40' },
      { label: 'D', text: '64' },
    ],
    correctAnswer: 'C',
    explanation:
      'Area of a rectangle = length × width = 8 × 5 = 40 square inches.',
    wrongAnswerExplanations: {
      A: '13 is the sum of the length and width (8 + 5), not the area.',
      B: '26 is the perimeter (2 × 13), not the area.',
      D: '64 = 8², which uses only the length and ignores the width.',
    },
  },

  // q20: Lines, angles, and triangles, easy, multiple_choice
  {
    id: 'sat-f5-math-m2e-q20',
    section: 'math',
    moduleId: 'f5-math-module-2-easy',
    domain: 'Geometry and Trigonometry',
    skill: 'Lines, angles, and triangles',
    difficulty: 'easy',
    type: 'multiple_choice',
    question:
      'In a triangle, two of the interior angles measure 55° and 70°. What is the measure of the third interior angle?',
    choices: [
      { label: 'A', text: '45°' },
      { label: 'B', text: '55°' },
      { label: 'C', text: '60°' },
      { label: 'D', text: '125°' },
    ],
    correctAnswer: 'B',
    explanation:
      'The interior angles of a triangle sum to 180°. Third angle = 180° − 55° − 70° = 55°.',
    wrongAnswerExplanations: {
      A: '45° = 180° − 55° − 80°; the second angle is 70°, not 80°.',
      C: '60° is a common distractor but does not satisfy 55° + 70° + 60° = 185° ≠ 180°.',
      D: '125° = 55° + 70°, which is the sum of the two known angles, not the missing angle.',
    },
  },

  // q21: Area and volume, medium, multiple_choice
  {
    id: 'sat-f5-math-m2e-q21',
    section: 'math',
    moduleId: 'f5-math-module-2-easy',
    domain: 'Geometry and Trigonometry',
    skill: 'Area and volume',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'A rectangle has a perimeter of 24 inches. The length of the rectangle is 3 times its width. What is the area of the rectangle in square inches?',
    choices: [
      { label: 'A', text: '18' },
      { label: 'B', text: '24' },
      { label: 'C', text: '27' },
      { label: 'D', text: '36' },
    ],
    correctAnswer: 'C',
    explanation:
      'Let the width be w. Then the length is 3w. Perimeter = 2(length + width) = 2(3w + w) = 8w = 24, so w = 3 and the length is 9. Area = 9 × 3 = 27 square inches.',
    wrongAnswerExplanations: {
      A: '18 results from using width = 3 and length = 6 (doubling instead of tripling the width).',
      B: '24 is the perimeter, not the area.',
      D: '36 = 6 × 6, which assumes a square, but the length is 3 times the width here.',
    },
  },

  // q22: Right triangles and trigonometry, medium, grid_in
  {
    id: 'sat-f5-math-m2e-q22',
    section: 'math',
    moduleId: 'f5-math-module-2-easy',
    domain: 'Geometry and Trigonometry',
    skill: 'Right triangles and trigonometry',
    difficulty: 'medium',
    type: 'grid_in',
    question:
      'In a right triangle, one leg has length 6 and the other leg has length 8. What is the length of the hypotenuse?',
    correctAnswer: '10',
    acceptableAnswers: ['10'],
    explanation:
      'By the Pythagorean theorem, hypotenuse² = 6² + 8² = 36 + 64 = 100. Taking the positive square root: hypotenuse = 10.',
  },
]
