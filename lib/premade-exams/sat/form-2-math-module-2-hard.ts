import type { MathQuestion } from './types'

export const f2MathModule2HardQuestions: MathQuestion[] = [
  // ── MEDIUM (6) ─────────────────────────────────────────────────────────────

  {
    id: 'sat2-math-m2h-m01',
    section: 'math',
    moduleId: 'f2-math-module-2-hard',
    domain: 'Algebra',
    skill: 'Systems of two linear equations in two variables',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'The system 3x + 4y = 20 and x + 2y = 8 has solution (x, y). What is the value of 2x − y?',
    choices: [
      { label: 'A', text: '4' },
      { label: 'B', text: '6' },
      { label: 'C', text: '8' },
      { label: 'D', text: '10' },
    ],
    correctAnswer: 'B',
    explanation:
      'From x + 2y = 8: x = 8 − 2y. Substitute: 3(8 − 2y) + 4y = 20 → 24 − 6y + 4y = 20 → −2y = −4 → y = 2. Then x = 8 − 4 = 4. Expression: 2(4) − 2 = 6.',
    wrongAnswerExplanations: {
      A: '4 = x alone, not 2x − y.',
      C: '8 = 2x = 2(4), omitting the −y term.',
      D: '10 = 2x + y = 8 + 2 uses addition instead of subtraction.',
    },
  },

  {
    id: 'sat2-math-m2h-m02',
    section: 'math',
    moduleId: 'f2-math-module-2-hard',
    domain: 'Algebra',
    skill: 'Linear inequalities in one or two variables',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'How many integer values of x satisfy |2x + 3| < 7?',
    choices: [
      { label: 'A', text: '4' },
      { label: 'B', text: '5' },
      { label: 'C', text: '6' },
      { label: 'D', text: '7' },
    ],
    correctAnswer: 'C',
    explanation:
      '|2x + 3| < 7 → −7 < 2x + 3 < 7 → −10 < 2x < 4 → −5 < x < 2. Integer values: −4, −3, −2, −1, 0, 1. That is 6 integers.',
    wrongAnswerExplanations: {
      A: '4 counts only the positive integers in the interval, omitting negatives.',
      B: '5 is off by one — the boundary integers −5 and 2 are excluded (strict inequalities), but the count of interior integers is 6.',
      D: '7 would include a boundary value; the strict inequality excludes x = −5 and x = 2.',
    },
  },

  {
    id: 'sat2-math-m2h-m03',
    section: 'math',
    moduleId: 'f2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Equivalent expressions',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'If log₂(x) = 3, what is the value of log₂(4x)?',
    choices: [
      { label: 'A', text: '4' },
      { label: 'B', text: '5' },
      { label: 'C', text: '6' },
      { label: 'D', text: '12' },
    ],
    correctAnswer: 'B',
    explanation:
      'log₂(4x) = log₂(4) + log₂(x) = 2 + 3 = 5.',
    wrongAnswerExplanations: {
      A: '4 = log₂(x) + 1 adds 1 instead of log₂(4) = 2.',
      C: '6 = log₂(x) + log₂(x) doubles the logarithm instead of adding log₂(4).',
      D: '12 = log₂(4) × log₂(x) = 2 × 3 multiplies instead of adding.',
    },
  },

  {
    id: 'sat2-math-m2h-m04',
    section: 'math',
    moduleId: 'f2-math-module-2-hard',
    domain: 'Geometry and Trigonometry',
    skill: 'Circles',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'A circle has equation (x − 3)² + (y + 1)² = 49. The line y = k is tangent to the circle at its highest point. What is the value of k?',
    choices: [
      { label: 'A', text: '6' },
      { label: 'B', text: '7' },
      { label: 'C', text: '8' },
      { label: 'D', text: '13' },
    ],
    correctAnswer: 'A',
    explanation:
      'Center = (3, −1), radius = √49 = 7. The highest point is at y = center_y + radius = −1 + 7 = 6. A horizontal tangent line at the top has equation y = 6.\n\nDesmos method: Enter (x − 3)² + (y + 1)² = 49 to graph the circle, then add y = k with a slider for k. Raise the slider until the horizontal line just touches the top of the circle at a single point — the slider reads k = 6.',
    wrongAnswerExplanations: {
      B: '7 is the radius, not the y-coordinate of the top of the circle.',
      C: '8 = 1 + 7 uses +1 instead of −1 for the center y-coordinate.',
      D: '13 is not derivable from the center and radius.',
    },
  },

  {
    id: 'sat2-math-m2h-m05',
    section: 'math',
    moduleId: 'f2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Nonlinear equations in one variable and systems of equations',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'The polynomial p(x) = 2x³ − 3x² − 11x + 6 has (x − 3) as a factor. Which of the following is NOT a root of p?',
    choices: [
      { label: 'A', text: '−2' },
      { label: 'B', text: '1/2' },
      { label: 'C', text: '3' },
      { label: 'D', text: '6' },
    ],
    correctAnswer: 'D',
    explanation:
      'Dividing p(x) by (x − 3) yields 2x² + 3x − 2 = (2x − 1)(x + 2). The three roots are x = 3, x = 1/2, and x = −2. The value 6 is not a root.',
    wrongAnswerExplanations: {
      A: 'x = −2: p(−2) = 2(−8) − 3(4) − 11(−2) + 6 = −16 − 12 + 22 + 6 = 0 ✓ — this IS a root.',
      B: 'x = 1/2: p(1/2) = 2(1/8) − 3(1/4) − 11(1/2) + 6 = 1/4 − 3/4 − 11/2 + 6 = 0 ✓ — this IS a root.',
      C: 'x = 3 is explicitly stated as a root via the factor (x − 3).',
    },
  },

  {
    id: 'sat2-math-m2h-m06',
    section: 'math',
    moduleId: 'f2-math-module-2-hard',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Ratios, rates, proportional relationships, and units',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'A chemist has 10 liters of a solution that is 40% alcohol by volume. How many liters of pure alcohol must be added so that the resulting mixture is 60% alcohol?',
    choices: [
      { label: 'A', text: '3' },
      { label: 'B', text: '4' },
      { label: 'C', text: '5' },
      { label: 'D', text: '6' },
    ],
    correctAnswer: 'C',
    explanation:
      'Initial alcohol = 0.40 × 10 = 4 L. After adding x L of pure alcohol: (4 + x)/(10 + x) = 0.60 → 4 + x = 6 + 0.6x → 0.4x = 2 → x = 5.',
    wrongAnswerExplanations: {
      A: 'Adding 3 L: (4+3)/(10+3) = 7/13 ≈ 53.8% ≠ 60%.',
      B: 'Adding 4 L: (4+4)/(10+4) = 8/14 ≈ 57.1% ≠ 60%.',
      D: 'Adding 6 L: (4+6)/(10+6) = 10/16 = 62.5% ≠ 60%.',
    },
  },

  // ── HARD (16) ─────────────────────────────────────────────────────────────

  {
    id: 'sat2-math-m2h-h01',
    section: 'math',
    moduleId: 'f2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'A ball is launched upward from a platform. Its height in feet after t seconds is given by h(t) = −16t² + 64t + 80. What is the maximum height of the ball, in feet?',
    correctAnswer: '144',
    acceptableAnswers: ['144'],
    explanation:
      'The maximum occurs at the vertex. t = −64 / (2 × −16) = −64/−32 = 2 seconds. h(2) = −16(4) + 64(2) + 80 = −64 + 128 + 80 = 144 feet.',
    scoringNotes: 'The answer is 144.',
  },

  {
    id: 'sat2-math-m2h-h02',
    section: 'math',
    moduleId: 'f2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'The function f is defined by f(x) = x² − 5x + 4. If g(x) = f(x − 1), what is the sum of the zeros of g?',
    choices: [
      { label: 'A', text: '5' },
      { label: 'B', text: '6' },
      { label: 'C', text: '7' },
      { label: 'D', text: '9' },
    ],
    correctAnswer: 'C',
    explanation:
      'g(x) = f(x − 1) = (x−1)² − 5(x−1) + 4 = x²−2x+1 − 5x+5+4 = x² − 7x + 10. By Vieta\'s formulas, the sum of the roots = 7. (Roots: x = 5 and x = 2; sum = 7 ✓.)',
    wrongAnswerExplanations: {
      A: '5 is the sum of the zeros of f itself, not g.',
      B: '6 results from incorrectly expanding f(x − 1).',
      D: '9 comes from adding 4 to the original sum, not a valid step.',
    },
  },

  {
    id: 'sat2-math-m2h-h03',
    section: 'math',
    moduleId: 'f2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Nonlinear equations in one variable and systems of equations',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'How many distinct real solutions does 4ˣ − 10 · 2ˣ + 16 = 0 have?',
    choices: [
      { label: 'A', text: '0' },
      { label: 'B', text: '1' },
      { label: 'C', text: '2' },
      { label: 'D', text: '4' },
    ],
    correctAnswer: 'C',
    explanation:
      'Let u = 2ˣ (u > 0). Then 4ˣ = u², so the equation becomes u² − 10u + 16 = 0 → (u − 2)(u − 8) = 0 → u = 2 or u = 8. Since u > 0, both are valid: 2ˣ = 2 → x = 1; 2ˣ = 8 → x = 3. Two distinct real solutions.',
    wrongAnswerExplanations: {
      A: 'Both substitutions yield positive values of u, so both produce real solutions.',
      B: 'Only one solution would occur if the discriminant were zero; here the discriminant is 100 − 64 = 36 > 0.',
      D: '4 would require four roots, but u² − 10u + 16 is quadratic and yields at most two values of u, each producing exactly one value of x.',
    },
  },

  {
    id: 'sat2-math-m2h-h04',
    section: 'math',
    moduleId: 'f2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'The function f is defined by f(x) = x² + bx + c. It is known that f(1) = 7 and f(−1) = 3. What is f(0)?',
    correctAnswer: '4',
    acceptableAnswers: ['4'],
    explanation:
      'f(1) = 1 + b + c = 7 → b + c = 6. f(−1) = 1 − b + c = 3 → −b + c = 2. Adding: 2c = 8 → c = 4. Then b = 2. f(0) = 0 + 0 + c = 4.\n\nDesmos method: Enter y = x² + bx + c and add sliders for b and c. Drag the sliders until the curve passes through both (1, 7) and (−1, 3). Read the y-intercept of the graph directly — it equals f(0) = 4.',
    scoringNotes: 'The answer is 4.',
  },

  {
    id: 'sat2-math-m2h-h05',
    section: 'math',
    moduleId: 'f2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Nonlinear equations in one variable and systems of equations',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'How many ordered pairs (x, y) satisfy both x² + y² = 25 and y = x − 1?',
    choices: [
      { label: 'A', text: '0' },
      { label: 'B', text: '1' },
      { label: 'C', text: '2' },
      { label: 'D', text: '4' },
    ],
    correctAnswer: 'C',
    explanation:
      'Substitute y = x − 1 into the circle equation: x² + (x−1)² = 25 → 2x² − 2x + 1 = 25 → 2x² − 2x − 24 = 0 → x² − x − 12 = 0 → (x−4)(x+3) = 0. Two values x = 4 and x = −3, giving two distinct ordered pairs.',
    wrongAnswerExplanations: {
      A: 'A line with slope 1 does intersect the circle of radius 5 — the discriminant is positive.',
      B: 'Exactly one intersection would require a tangent line; here the line passes through the interior of the circle.',
      D: 'Four intersections would require two separate curves, not a line and a circle.',
    },
  },

  {
    id: 'sat2-math-m2h-h06',
    section: 'math',
    moduleId: 'f2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Nonlinear equations in one variable and systems of equations',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'The sum 1 + 2 + 3 + … + n equals n(n + 1)/2. For what value of n does this sum equal 210?',
    correctAnswer: '20',
    acceptableAnswers: ['20'],
    explanation:
      'n(n + 1)/2 = 210 → n(n + 1) = 420. Testing n = 20: 20 × 21 = 420 ✓. Alternatively, solve n² + n − 420 = 0 using the quadratic formula: n = (−1 + √1681)/2 = (−1 + 41)/2 = 20.',
    scoringNotes: 'The answer is 20.',
  },

  {
    id: 'sat2-math-m2h-h07',
    section: 'math',
    moduleId: 'f2-math-module-2-hard',
    domain: 'Geometry and Trigonometry',
    skill: 'Circles',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'A sector of a circle has a radius of 6 and an area of 12π. What is the central angle of the sector, in degrees?',
    correctAnswer: '120',
    acceptableAnswers: ['120'],
    explanation:
      'Area of sector = (θ/360)πr². So 12π = (θ/360)π(36) → 12 = 36θ/360 = θ/10 → θ = 120°.',
    scoringNotes: 'The answer is 120.',
  },

  {
    id: 'sat2-math-m2h-h08',
    section: 'math',
    moduleId: 'f2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Equivalent expressions',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'If log₂(x) + log₂(x + 6) = 4, what is the value of x?',
    choices: [
      { label: 'A', text: '1' },
      { label: 'B', text: '2' },
      { label: 'C', text: '4' },
      { label: 'D', text: '8' },
    ],
    correctAnswer: 'B',
    explanation:
      'log₂(x(x + 6)) = 4 → x(x + 6) = 2⁴ = 16 → x² + 6x − 16 = 0 → (x + 8)(x − 2) = 0. Since x must be positive for the logarithm to be defined, x = 2. Check: log₂(2) + log₂(8) = 1 + 3 = 4 ✓.',
    wrongAnswerExplanations: {
      A: 'x = 1: log₂(1) + log₂(7) = 0 + log₂(7) ≈ 2.81 ≠ 4.',
      C: 'x = 4: log₂(4) + log₂(10) = 2 + log₂(10) ≈ 5.32 ≠ 4.',
      D: 'x = 8: log₂(8) + log₂(14) = 3 + log₂(14) ≈ 6.81 ≠ 4.',
    },
  },

  {
    id: 'sat2-math-m2h-h09',
    section: 'math',
    moduleId: 'f2-math-module-2-hard',
    domain: 'Geometry and Trigonometry',
    skill: 'Right triangles and trigonometry',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'In a right triangle, sin(θ) = 5/13. What is tan(θ)?',
    choices: [
      { label: 'A', text: '5/12' },
      { label: 'B', text: '5/13' },
      { label: 'C', text: '12/13' },
      { label: 'D', text: '13/5' },
    ],
    correctAnswer: 'A',
    explanation:
      'sin(θ) = opposite/hypotenuse = 5/13. The adjacent side = √(13² − 5²) = √(169 − 25) = √144 = 12. tan(θ) = opposite/adjacent = 5/12.',
    wrongAnswerExplanations: {
      B: '5/13 = sin(θ) itself; tan(θ) uses the adjacent leg in the denominator, not the hypotenuse.',
      C: '12/13 = cos(θ), not tan(θ).',
      D: '13/5 = 1/sin(θ) = csc(θ), the cosecant rather than the tangent.',
    },
  },

  {
    id: 'sat2-math-m2h-h10',
    section: 'math',
    moduleId: 'f2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Exponential functions',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'A geometric sequence has first term 3 and positive common ratio r. If the third term of the sequence is 48, what is the fourth term?',
    correctAnswer: '192',
    acceptableAnswers: ['192'],
    explanation:
      'Third term = 3r² = 48 → r² = 16 → r = 4. Fourth term = 3r³ = 3(64) = 192.',
    scoringNotes: 'The answer is 192.',
  },

  {
    id: 'sat2-math-m2h-h11',
    section: 'math',
    moduleId: 'f2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'The function f is defined by f(x) = (2x + 1)/(x − 3) for x ≠ 3. Which of the following defines f⁻¹(x)?',
    choices: [
      { label: 'A', text: '(3x + 1)/(x − 2)' },
      { label: 'B', text: '(x − 3)/(2x + 1)' },
      { label: 'C', text: '(2x − 1)/(x + 3)' },
      { label: 'D', text: '(x + 3)/(2x − 1)' },
    ],
    correctAnswer: 'A',
    explanation:
      'Set y = (2x + 1)/(x − 3) and solve for x. y(x − 3) = 2x + 1 → xy − 3y = 2x + 1 → xy − 2x = 3y + 1 → x(y − 2) = 3y + 1 → x = (3y + 1)/(y − 2). Replacing y with x: f⁻¹(x) = (3x + 1)/(x − 2).',
    wrongAnswerExplanations: {
      B: '(x − 3)/(2x + 1) is the reciprocal of f, not the inverse.',
      C: '(2x − 1)/(x + 3) results from incorrectly distributing or combining terms.',
      D: '(x + 3)/(2x − 1) reverses numerator and denominator of the original function without solving properly.',
    },
  },

  {
    id: 'sat2-math-m2h-h12',
    section: 'math',
    moduleId: 'f2-math-module-2-hard',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'One-variable data: distributions and measures of center and spread',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'A data set of n values has mean μ and standard deviation σ. A constant c is added to every value in the data set. Which of the following correctly describes the effect on the mean and the standard deviation?',
    choices: [
      { label: 'A', text: 'Both the mean and the standard deviation increase by c.' },
      { label: 'B', text: 'The mean increases by c; the standard deviation is unchanged.' },
      { label: 'C', text: 'The mean is unchanged; the standard deviation increases by c.' },
      { label: 'D', text: 'Both the mean and the standard deviation are unchanged.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Adding c to every value shifts all data by the same amount, raising the mean from μ to μ + c. However, standard deviation measures spread — the distances between data points do not change when every point shifts by the same constant, so σ remains the same.',
    wrongAnswerExplanations: {
      A: 'Standard deviation is a measure of spread (distances between values), which is not affected by a uniform shift.',
      C: 'The mean definitely changes — it shifts by c just as every data value does.',
      D: 'The mean shifts by c, so it is not unchanged.',
    },
  },

  {
    id: 'sat2-math-m2h-h13',
    section: 'math',
    moduleId: 'f2-math-module-2-hard',
    domain: 'Geometry and Trigonometry',
    skill: 'Area and volume',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'A parallelogram has vertices at (0, 0), (4, 0), (5, 3), and (1, 3). What is the area of the parallelogram?',
    correctAnswer: '12',
    acceptableAnswers: ['12'],
    explanation:
      'The base lies along the x-axis from (0, 0) to (4, 0), so base = 4. The height is the perpendicular distance between the two horizontal sides (y = 0 and y = 3), which is 3. Area = base × height = 4 × 3 = 12.',
    scoringNotes: 'The answer is 12.',
  },

  {
    id: 'sat2-math-m2h-h14',
    section: 'math',
    moduleId: 'f2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'A function f satisfies f(x + 2) = x² − 4x + 7 for all x. What is f(3)?',
    choices: [
      { label: 'A', text: '1' },
      { label: 'B', text: '2' },
      { label: 'C', text: '4' },
      { label: 'D', text: '7' },
    ],
    correctAnswer: 'C',
    explanation:
      'Set x + 2 = 3 → x = 1. Then f(3) = f(1 + 2) = 1² − 4(1) + 7 = 1 − 4 + 7 = 4.',
    wrongAnswerExplanations: {
      A: '1 = 1 − 4 + 4 uses the wrong constant.',
      B: '2 results from a sign error in the arithmetic.',
      D: '7 = f(2) evaluates the expression at x = 0 (giving 0 − 0 + 7 = 7), which corresponds to f(2), not f(3).',
    },
  },

  {
    id: 'sat2-math-m2h-h15',
    section: 'math',
    moduleId: 'f2-math-module-2-hard',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Probability and conditional probability',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'Two fair six-sided dice are rolled. Given that the sum of the two dice is at least 9, what is the probability that both dice show the same number?',
    choices: [
      { label: 'A', text: '1/10' },
      { label: 'B', text: '1/5' },
      { label: 'C', text: '1/4' },
      { label: 'D', text: '2/9' },
    ],
    correctAnswer: 'B',
    explanation:
      'Outcomes with sum ≥ 9: (3,6),(4,5),(4,6),(5,4),(5,5),(5,6),(6,3),(6,4),(6,5),(6,6) — 10 outcomes. Of these, doubles are (5,5) and (6,6) — 2 outcomes. P = 2/10 = 1/5.',
    wrongAnswerExplanations: {
      A: '1/10 counts only one double in the sample space, missing (6,6).',
      C: '1/4 overstates the number of doubles relative to the restricted sample space.',
      D: '2/9 would apply if the total number of high-sum outcomes were 9, but there are 10.',
    },
  },

  {
    id: 'sat2-math-m2h-h16',
    section: 'math',
    moduleId: 'f2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'A company\'s cost function is C(x) = 0.01x² + 5x + 200 and its revenue function is R(x) = 20x, where x is the number of units produced and sold. At what value of x is the profit P(x) = R(x) − C(x) maximized?',
    choices: [
      { label: 'A', text: '500' },
      { label: 'B', text: '600' },
      { label: 'C', text: '750' },
      { label: 'D', text: '800' },
    ],
    correctAnswer: 'C',
    explanation:
      'P(x) = 20x − (0.01x² + 5x + 200) = −0.01x² + 15x − 200. This is a downward-opening parabola. Maximum at x = −15 / (2 × −0.01) = −15/−0.02 = 750.',
    wrongAnswerExplanations: {
      A: 'x = 500: P′(500) = −0.02(500) + 15 = 5 > 0 — profit is still increasing at 500.',
      B: 'x = 600: P′(600) = −0.02(600) + 15 = 3 > 0 — profit is still increasing at 600.',
      D: 'x = 800: P′(800) = −0.02(800) + 15 = −1 < 0 — profit has already peaked and is declining.',
    },
  },
]
