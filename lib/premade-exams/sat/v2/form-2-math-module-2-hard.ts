import type { MathQuestion } from '../types'

export const f2MathModule2HardQuestionsV2: MathQuestion[] = [
  // ── MEDIUM (6) ─────────────────────────────────────────────────────────────

  {
    id: 'sat-f2-v2-math-m2h-qm01',
    section: 'math',
    moduleId: 'f2v2-math-module-2-hard',
    domain: 'Algebra',
    skill: 'Systems of two linear equations in two variables',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'A laboratory technician is mixing two chemical solutions. The first equation, 3x + 4y = 20, represents the total concentration requirement for compound A, where x and y are the volumes (in liters) of Solution 1 and Solution 2 respectively. The second equation, x + 2y = 8, represents the volume constraint for compound B. What is the value of 2x − y for the unique solution (x, y) to this system?',
    choices: [
      { label: 'A', text: '4' },
      { label: 'B', text: '6' },
      { label: 'C', text: '8' },
      { label: 'D', text: '10' },
    ],
    correctAnswer: 'B',
    explanation:
      'From x + 2y = 8: x = 8 − 2y. Substitute into the first equation: 3(8 − 2y) + 4y = 20 → 24 − 6y + 4y = 20 → −2y = −4 → y = 2. Then x = 8 − 4 = 4. Expression: 2(4) − 2 = 6.',
    wrongAnswerExplanations: {
      A: '4 is the value of x alone; this error comes from computing x but forgetting to evaluate the full expression 2x − y.',
      C: '8 = 2x = 2(4), which correctly doubles x but omits subtracting y = 2. This error comes from reading the expression as "2x" rather than "2x − y."',
      D: '10 = 2x + y = 8 + 2, which uses addition instead of subtraction. This error comes from misreading the minus sign in 2x − y as a plus sign.',
    },
  },

  {
    id: 'sat-f2-v2-math-m2h-qm02',
    section: 'math',
    moduleId: 'f2v2-math-module-2-hard',
    domain: 'Algebra',
    skill: 'Linear inequalities in one or two variables',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'A noise level sensor records readings that satisfy |2x + 3| < 7, where x represents the deviation in decibels from a baseline measurement. How many integer values of x fall within the acceptable range?',
    choices: [
      { label: 'A', text: '4' },
      { label: 'B', text: '5' },
      { label: 'C', text: '6' },
      { label: 'D', text: '7' },
    ],
    correctAnswer: 'C',
    explanation:
      '|2x + 3| < 7 → −7 < 2x + 3 < 7 → −10 < 2x < 4 → −5 < x < 2. The integer values strictly between −5 and 2 are: −4, −3, −2, −1, 0, 1. That is 6 integers.',
    wrongAnswerExplanations: {
      A: '4 is the count of non-negative integers in the solution: 0 and 1 plus two negative integers if miscounted. This error typically comes from only considering integers close to 0 and missing the lower negative values −4 and −3.',
      B: '5 is an off-by-one error — often from including −5 or 2 as boundary integers, forgetting that the strict inequality < excludes the endpoints. The boundaries −5 and 2 are not in the solution set.',
      D: '7 would result from including one or both boundary values (−5 or 2) as if the inequality were ≤ rather than <. The strict inequality means neither endpoint is counted.',
    },
  },

  {
    id: 'sat-f2-v2-math-m2h-qm03',
    section: 'math',
    moduleId: 'f2v2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Equivalent expressions',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'A signal processing algorithm uses logarithms to compress data values. If log₂(x) = 3, what is the value of log₂(4x)?',
    choices: [
      { label: 'A', text: '4' },
      { label: 'B', text: '5' },
      { label: 'C', text: '6' },
      { label: 'D', text: '12' },
    ],
    correctAnswer: 'B',
    explanation:
      'Apply the product rule: log₂(4x) = log₂(4) + log₂(x) = 2 + 3 = 5.',
    wrongAnswerExplanations: {
      A: '4 results from adding 1 to log₂(x) instead of log₂(4). This error comes from computing log₄(4) = 1 (log of 4 in base 4) rather than log₂(4) = 2.',
      C: '6 results from treating log₂(4x) as log₂(x) + log₂(x) = 2 × 3 = 6 — incorrectly doubling the logarithm rather than adding log₂(4) = 2. This confuses multiplication of the argument (4x) with squaring it (x²).',
      D: '12 = log₂(4) × log₂(x) = 2 × 3, which multiplies the logarithms rather than adding them. The product rule for logarithms says log(ab) = log(a) + log(b), not log(a) × log(b).',
    },
  },

  {
    id: 'sat-f2-v2-math-m2h-qm04',
    section: 'math',
    moduleId: 'f2v2-math-module-2-hard',
    domain: 'Geometry and Trigonometry',
    skill: 'Circles',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'An engineer models the cross-section of a cylindrical pipe with the equation (x − 3)² + (y + 1)² = 49 on a coordinate grid, where units are in centimeters. A horizontal support beam must be placed tangent to the pipe at its highest point. What is the y-coordinate of this tangent line?',
    choices: [
      { label: 'A', text: '6' },
      { label: 'B', text: '7' },
      { label: 'C', text: '8' },
      { label: 'D', text: '13' },
    ],
    correctAnswer: 'A',
    explanation:
      'Center = (3, −1), radius = √49 = 7. The highest point of the circle is at y = center_y + radius = −1 + 7 = 6. The horizontal tangent line at the top has equation y = 6.',
    wrongAnswerExplanations: {
      B: '7 is the radius of the circle. This error comes from reading off the radius directly and using it as the y-coordinate without adding it to the center\'s y-coordinate of −1.',
      C: '8 = 1 + 7 uses positive 1 for the center\'s y-coordinate instead of negative 1. This error comes from misreading (y + 1)² = 49 and taking the center as (3, 1) rather than (3, −1).',
      D: '13 is not derivable from the given equation using correct geometry. It may arise from adding the center coordinates (3 + (−1) = 2) to the radius (7) in an invalid way, or from other arithmetic errors involving the equation\'s constants.',
    },
  },

  {
    id: 'sat-f2-v2-math-m2h-qm05',
    section: 'math',
    moduleId: 'f2v2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Nonlinear equations in one variable and systems of equations',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'A materials scientist models the strength of an alloy with the polynomial p(x) = 2x³ − 3x² − 11x + 6, where x represents temperature in hundreds of degrees Celsius. A colleague confirms that (x − 3) is a factor of p(x). Which of the following is NOT a zero of p(x)?',
    choices: [
      { label: 'A', text: '−2' },
      { label: 'B', text: '1/2' },
      { label: 'C', text: '3' },
      { label: 'D', text: '6' },
    ],
    correctAnswer: 'D',
    explanation:
      'Since (x − 3) is a factor, divide p(x) by (x − 3) using synthetic division or polynomial long division to get the quotient 2x² + 3x − 2. Factor this: (2x − 1)(x + 2). The three zeros are x = 3, x = 1/2, and x = −2. The value 6 is not a zero of p(x). Note: p(6) = 2(216) − 3(36) − 11(6) + 6 = 432 − 108 − 66 + 6 = 264 ≠ 0.',
    wrongAnswerExplanations: {
      A: 'x = −2 is a zero: p(−2) = 2(−8) − 3(4) − 11(−2) + 6 = −16 − 12 + 22 + 6 = 0 ✓. Selecting this choice confuses a zero with a non-zero — perhaps because −2 is negative and seems "unlikely" without verification.',
      B: 'x = 1/2 is a zero: p(1/2) = 2(1/8) − 3(1/4) − 11(1/2) + 6 = 1/4 − 3/4 − 11/2 + 6 = 0 ✓. Selecting this choice may reflect unfamiliarity with non-integer zeros or an error in evaluating fractions in the polynomial.',
      C: 'x = 3 is explicitly a zero via the given factor (x − 3). Selecting this choice ignores the given information that (x − 3) is a factor, which directly implies p(3) = 0.',
    },
  },

  {
    id: 'sat-f2-v2-math-m2h-qm06',
    section: 'math',
    moduleId: 'f2v2-math-module-2-hard',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Ratios, rates, proportional relationships, and units',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'A pharmaceutical technician has 10 liters of a saline solution that is 40% alcohol by volume. Pure alcohol (100% concentration) must be added to reach a target concentration of 60% alcohol for a new formulation. How many liters of pure alcohol must be added?',
    choices: [
      { label: 'A', text: '3' },
      { label: 'B', text: '4' },
      { label: 'C', text: '5' },
      { label: 'D', text: '6' },
    ],
    correctAnswer: 'C',
    explanation:
      'Initial alcohol = 0.40 × 10 = 4 L. Let x = liters of pure alcohol added. New total volume = 10 + x; new alcohol volume = 4 + x. Set up: (4 + x)/(10 + x) = 0.60 → 4 + x = 6 + 0.6x → 0.4x = 2 → x = 5.',
    wrongAnswerExplanations: {
      A: 'Adding 3 L yields (4 + 3)/(10 + 3) = 7/13 ≈ 53.8%, not 60%. This error often comes from setting up the equation without accounting for the increase in total volume: treating the denominator as remaining 10 would give (4 + x)/10 = 0.60 → x = 2, and then adjusting by rough estimation to 3.',
      B: 'Adding 4 L yields (4 + 4)/(10 + 4) = 8/14 ≈ 57.1%, not 60%. This error often results from incorrectly solving 4 + x = 0.60(10) rather than 0.60(10 + x) — ignoring that adding alcohol increases total volume.',
      D: 'Adding 6 L yields (4 + 6)/(10 + 6) = 10/16 = 62.5%, not 60%. This overshoots the target, often the result of solving 0.60 × 10 = 6 and concluding that 6 liters of alcohol needs to be added to a fixed total, rather than accounting for the increased denominator.',
    },
  },

  // ── HARD (16) ─────────────────────────────────────────────────────────────

  {
    id: 'sat-f2-v2-math-m2h-qh01',
    section: 'math',
    moduleId: 'f2v2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'A ball is launched upward from a 80-foot-tall platform by a spring-loaded mechanism. Its height above the ground in feet, t seconds after launch, is modeled by h(t) = −16t² + 64t + 80. What is the maximum height of the ball above the ground, in feet?',
    correctAnswer: '144',
    acceptableAnswers: ['144'],
    explanation:
      'For a quadratic h(t) = at² + bt + c, the vertex (maximum if a < 0) occurs at t = −b/(2a). Here: t = −64/(2 × −16) = 2 seconds. Maximum height: h(2) = −16(4) + 64(2) + 80 = −64 + 128 + 80 = 144 feet. Common errors to avoid: computing h(0) = 80 (the initial platform height, not the maximum) or computing only the vertex t-value and reporting t = 2 instead of h(2) = 144.',
    scoringNotes: 'The answer is 144.',
  },

  {
    id: 'sat-f2-v2-math-m2h-qh02',
    section: 'math',
    moduleId: 'f2v2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'The function f is defined by f(x) = x² − 5x + 4. A second function is defined by g(x) = f(x − 1). What is the sum of the zeros of g?',
    choices: [
      { label: 'A', text: '5' },
      { label: 'B', text: '6' },
      { label: 'C', text: '7' },
      { label: 'D', text: '9' },
    ],
    correctAnswer: 'C',
    explanation:
      'Expand g(x) = f(x − 1) = (x − 1)² − 5(x − 1) + 4 = x² − 2x + 1 − 5x + 5 + 4 = x² − 7x + 10. By Vieta\'s formulas, the sum of the zeros equals the negative of the coefficient of x divided by the leading coefficient: 7/1 = 7. Verification: x² − 7x + 10 = (x − 5)(x − 2), so the zeros are 5 and 2, and 5 + 2 = 7.',
    wrongAnswerExplanations: {
      A: '5 is the sum of the zeros of f(x) itself (zeros are 4 and 1: sum = 5). This error comes from applying Vieta\'s formula to f rather than computing and using g.',
      B: '6 arises from expanding g(x) incorrectly, typically by writing f(x − 1) = (x − 1)² − 5(x − 1) + 4 and making a sign error in the middle term — for example, distributing −5(x − 1) as −5x − 5 instead of −5x + 5, which gives x² − 7x + 2 + 4... or other partial expansion mistakes leading to a coefficient of −6 for x instead of −7.',
      D: '9 may arise from adding the horizontal shift (1) to the sum of zeros of f (5 + 4 = 9 using f\'s zeros incorrectly shifted), or from an arithmetic error in expanding and collecting like terms.',
    },
  },

  {
    id: 'sat-f2-v2-math-m2h-qh03',
    section: 'math',
    moduleId: 'f2v2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Nonlinear equations in one variable and systems of equations',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'How many distinct real solutions does the equation 4ˣ − 10 · 2ˣ + 16 = 0 have?',
    choices: [
      { label: 'A', text: '0' },
      { label: 'B', text: '1' },
      { label: 'C', text: '2' },
      { label: 'D', text: '4' },
    ],
    correctAnswer: 'C',
    explanation:
      'Substitute u = 2ˣ, where u > 0. Since 4ˣ = (2²)ˣ = (2ˣ)² = u², the equation becomes u² − 10u + 16 = 0. Factor: (u − 2)(u − 8) = 0, giving u = 2 or u = 8. Both values are positive, so both are valid. Solving back: 2ˣ = 2 → x = 1; 2ˣ = 8 = 2³ → x = 3. Two distinct real solutions: x = 1 and x = 3.',
    wrongAnswerExplanations: {
      A: '0 solutions would mean no positive u satisfies the quadratic, but u = 2 and u = 8 are both positive. This error may come from an incorrect factoring attempt that produces a negative discriminant, or from failing to recognize that 4ˣ = (2ˣ)².',
      B: '1 solution would result if the quadratic in u had a repeated root (discriminant = 0), but here the discriminant is 100 − 64 = 36 > 0, giving two distinct roots. This error may also arise from correctly finding u = 2 and u = 8 but dismissing u = 8 as "too large" without checking its validity.',
      D: '4 solutions would require the substitution to produce four distinct values of x, but since u = 2ˣ is a one-to-one function, each value of u yields exactly one value of x. A quadratic in u has at most two roots, each mapping to at most one x.',
    },
  },

  {
    id: 'sat-f2-v2-math-m2h-qh04',
    section: 'math',
    moduleId: 'f2v2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'A parabola has equation f(x) = x² + bx + c. The parabola passes through the point (1, 7) and through the point (−1, 3). What is the value of f(0)?',
    correctAnswer: '4',
    acceptableAnswers: ['4'],
    explanation:
      'Set up the system: f(1) = 1 + b + c = 7, so b + c = 6. f(−1) = 1 − b + c = 3, so −b + c = 2. Adding the two equations: 2c = 8, so c = 4. Then b = 6 − c = 2. Therefore f(0) = 0² + b(0) + c = c = 4. Note: f(0) equals c, the y-intercept of the parabola, so once c is found the answer is immediate.',
    scoringNotes: 'The answer is 4.',
  },

  {
    id: 'sat-f2-v2-math-m2h-qh05',
    section: 'math',
    moduleId: 'f2v2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Nonlinear equations in one variable and systems of equations',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'A surveyor uses the equations x² + y² = 25 and y = x − 1 to locate two boundary markers on a circular property boundary, where distances are in hundreds of feet. How many distinct ordered pairs (x, y) satisfy both equations simultaneously?',
    choices: [
      { label: 'A', text: '0' },
      { label: 'B', text: '1' },
      { label: 'C', text: '2' },
      { label: 'D', text: '4' },
    ],
    correctAnswer: 'C',
    explanation:
      'Substitute y = x − 1 into x² + y² = 25: x² + (x − 1)² = 25 → x² + x² − 2x + 1 = 25 → 2x² − 2x − 24 = 0 → x² − x − 12 = 0 → (x − 4)(x + 3) = 0. Solutions: x = 4 (giving y = 3) and x = −3 (giving y = −4). Two distinct ordered pairs.',
    wrongAnswerExplanations: {
      A: '0 intersections would mean the line misses the circle entirely (discriminant < 0). Here the discriminant of x² − x − 12 is 1 + 48 = 49 > 0, confirming real intersections. This error may come from incorrectly expanding (x − 1)² as x² − 1 instead of x² − 2x + 1, producing a quadratic with no real roots.',
      B: '1 intersection would mean the line is tangent to the circle (discriminant = 0). Here the discriminant is 49 ≠ 0, so the line passes through the interior and exits on the other side, creating two intersection points.',
      D: '4 intersections would require two distinct curves each contributing two intersection points. A line and a circle can intersect in at most 2 points, so 4 is geometrically impossible for this system.',
    },
  },

  {
    id: 'sat-f2-v2-math-m2h-qh06',
    section: 'math',
    moduleId: 'f2v2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Nonlinear equations in one variable and systems of equations',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'The formula for the sum of the first n positive integers is S = n(n + 1)/2. A fundraiser collects donations in which the kth donor contributes k dollars, for k = 1, 2, 3, ..., n. If the total amount collected is $210, what is the value of n, the total number of donors?',
    correctAnswer: '20',
    acceptableAnswers: ['20'],
    explanation:
      'Set n(n + 1)/2 = 210, so n(n + 1) = 420. This is equivalent to n² + n − 420 = 0. Using the quadratic formula: n = (−1 ± √(1 + 1680))/2 = (−1 ± √1681)/2 = (−1 ± 41)/2. Taking the positive root: n = 40/2 = 20. Check: 20 × 21/2 = 210 ✓. (Note: n = −21 is rejected since the number of donors must be a positive integer.)',
    scoringNotes: 'The answer is 20.',
  },

  {
    id: 'sat-f2-v2-math-m2h-qh07',
    section: 'math',
    moduleId: 'f2v2-math-module-2-hard',
    domain: 'Geometry and Trigonometry',
    skill: 'Circles',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'An architect is designing a curved skylight. The skylight is a sector of a circle with radius 6 meters and area 12π square meters. What is the central angle of the sector, in degrees?',
    correctAnswer: '120',
    acceptableAnswers: ['120'],
    explanation:
      'The area of a sector is A = (θ/360°) × πr². Substituting: 12π = (θ/360°) × π(6²) = (θ/360°) × 36π. Dividing both sides by π: 12 = 36θ/360 = θ/10. Therefore θ = 120°.',
    scoringNotes: 'The answer is 120.',
  },

  {
    id: 'sat-f2-v2-math-m2h-qh08',
    section: 'math',
    moduleId: 'f2v2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Equivalent expressions',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'A data scientist models a compression ratio using the equation log₂(x) + log₂(x + 6) = 4, where x represents a positive file size parameter. What is the value of x?',
    choices: [
      { label: 'A', text: '1' },
      { label: 'B', text: '2' },
      { label: 'C', text: '4' },
      { label: 'D', text: '8' },
    ],
    correctAnswer: 'B',
    explanation:
      'Using the product rule: log₂(x(x + 6)) = 4 → x(x + 6) = 2⁴ = 16 → x² + 6x − 16 = 0 → (x + 8)(x − 2) = 0. The solutions are x = 2 and x = −8. Since x must be positive for log₂(x) to be defined, x = 2. Verification: log₂(2) + log₂(8) = 1 + 3 = 4 ✓.',
    wrongAnswerExplanations: {
      A: 'x = 1: log₂(1) + log₂(7) = 0 + log₂(7) ≈ 2.81 ≠ 4. This error may arise from setting x(x + 6) = 4 (treating 2⁴ as 4 rather than 16), then solving the resulting quadratic to get a value near 1.',
      C: 'x = 4: log₂(4) + log₂(10) = 2 + log₂(10) ≈ 5.32 ≠ 4. This error may arise from solving log₂(x) = 4 directly and getting x = 2⁴ = 16... or from making an error in applying the product rule that leads to solving 2x = 4 instead of x(x + 6) = 16.',
      D: 'x = 8: log₂(8) + log₂(14) = 3 + log₂(14) ≈ 6.81 ≠ 4. This error often arises from solving log₂(x) = 4 alone (ignoring the second logarithm term) to get x = 2⁴ = 16 and then mistakenly choosing the nearest answer choice.',
    },
  },

  {
    id: 'sat-f2-v2-math-m2h-qh09',
    section: 'math',
    moduleId: 'f2v2-math-module-2-hard',
    domain: 'Geometry and Trigonometry',
    skill: 'Right triangles and trigonometry',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'A ramp rises at an angle θ from horizontal. A structural engineer determines that sin(θ) = 5/13. What is tan(θ)?',
    choices: [
      { label: 'A', text: '5/12' },
      { label: 'B', text: '5/13' },
      { label: 'C', text: '12/13' },
      { label: 'D', text: '13/5' },
    ],
    correctAnswer: 'A',
    explanation:
      'sin(θ) = opposite/hypotenuse = 5/13. Using the Pythagorean theorem: adjacent = √(13² − 5²) = √(169 − 25) = √144 = 12. Therefore tan(θ) = opposite/adjacent = 5/12.',
    wrongAnswerExplanations: {
      B: '5/13 is sin(θ) itself, not tan(θ). This error comes from copying the given ratio without computing tan(θ), or from confusing "tan" with "sin" in the definitions.',
      C: '12/13 = cos(θ) = adjacent/hypotenuse. This error comes from computing the adjacent side correctly (12) but then forming cos(θ) = 12/13 rather than tan(θ) = 12/... wait — specifically, 12/13 means the student computed the adjacent (12) and the hypotenuse (13) but formed adjacent/hypotenuse (cosine) rather than opposite/adjacent (tangent).',
      D: '13/5 = csc(θ) = hypotenuse/opposite = 1/sin(θ), the cosecant of θ. This error comes from inverting the given ratio 5/13 without computing the adjacent side first — interpreting "the reciprocal" as the answer to "find tangent."',
    },
  },

  {
    id: 'sat-f2-v2-math-m2h-qh10',
    section: 'math',
    moduleId: 'f2v2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Exponential functions',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'A biologist observes a population of bacteria whose size follows a geometric sequence. The initial count is 3 thousand cells. The population has a positive common ratio r. The count at the third time period exceeds the count at the second time period by 36 thousand cells. What is the count at the fourth time period, in thousands of cells?',
    correctAnswer: '192',
    acceptableAnswers: ['192'],
    explanation:
      'The terms of the geometric sequence are: a₁ = 3, a₂ = 3r, a₃ = 3r². The condition "third term exceeds second term by 36" gives: 3r² − 3r = 36 → r² − r − 12 = 0 → (r − 4)(r + 3) = 0 → r = 4 or r = −3. Since the ratio is positive, r = 4. The fourth term: a₄ = 3r³ = 3(64) = 192 thousand cells. Verification: sequence is 3, 12, 48, 192, and 48 − 12 = 36 ✓.',
    scoringNotes: 'The answer is 192.',
  },

  {
    id: 'sat-f2-v2-math-m2h-qh11',
    section: 'math',
    moduleId: 'f2v2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'The function f is defined by f(x) = (2x + 1)/(x − 3) for x ≠ 3. Which of the following expressions defines f⁻¹(x), the inverse of f?',
    choices: [
      { label: 'A', text: '(3x + 1)/(x − 2)' },
      { label: 'B', text: '(x − 3)/(2x + 1)' },
      { label: 'C', text: '(2x − 1)/(x + 3)' },
      { label: 'D', text: '(x + 3)/(2 − x)' },
    ],
    correctAnswer: 'A',
    explanation:
      'To find f⁻¹(x), set y = (2x + 1)/(x − 3) and solve for x in terms of y. Multiply both sides by (x − 3): y(x − 3) = 2x + 1 → xy − 3y = 2x + 1 → xy − 2x = 3y + 1 → x(y − 2) = 3y + 1 → x = (3y + 1)/(y − 2). Replacing y with x: f⁻¹(x) = (3x + 1)/(x − 2).',
    wrongAnswerExplanations: {
      B: '(x − 3)/(2x + 1) is 1/f(x) — the reciprocal of f, not its inverse. This error comes from swapping numerator and denominator of f(x) rather than performing the algebraic steps to swap x and y and solve.',
      C: '(2x − 1)/(x + 3) results from incorrectly solving for x after cross-multiplying — specifically, from distributing y(x − 3) as xy − 3 rather than xy − 3y, or from making a sign error when moving 2x to the left side.',
      D: '(x + 3)/(2 − x) arises from a specific combination of sign errors: correctly moving the −3y term but making a sign error in the denominator when factoring, writing (y − 2) as (2 − y) and then flipping numerator and denominator without adjusting signs, effectively producing a negatively-signed version of the correct answer.',
    },
  },

  {
    id: 'sat-f2-v2-math-m2h-qh12',
    section: 'math',
    moduleId: 'f2v2-math-module-2-hard',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'One-variable data: distributions and measures of center and spread',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'A quality control analyst measures the diameter of n machine parts. The measurements have mean μ millimeters and standard deviation σ millimeters. The calibration of the measuring instrument is found to be systematically off, and a constant c is added to every recorded measurement to correct the values. Which of the following correctly describes the effect on the mean and the standard deviation of the corrected dataset?',
    choices: [
      { label: 'A', text: 'Both the mean and the standard deviation increase by c.' },
      { label: 'B', text: 'The mean increases by c; the standard deviation is unchanged.' },
      { label: 'C', text: 'The mean is unchanged; the standard deviation increases by c.' },
      { label: 'D', text: 'Both the mean and the standard deviation are unchanged.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Adding a constant c to every data value shifts the entire distribution by c, raising the mean from μ to μ + c. However, the standard deviation measures the spread of the data — the distances between individual values and the mean. When every value shifts by the same constant, all these distances remain identical, so σ is unchanged. Formally: the new mean is μ + c, and for each value xᵢ, the new deviation is (xᵢ + c) − (μ + c) = xᵢ − μ, which is the same as before.',
    wrongAnswerExplanations: {
      A: 'Standard deviation measures spread — the variation among values relative to the mean. Adding the same constant c to every value shifts every value and the mean by exactly c, so the deviations from the mean remain unchanged, and σ does not increase. This error conflates the effect on the mean (which shifts) with the effect on spread (which doesn\'t).',
      C: 'The mean definitely changes when a constant is added to every value. If every measurement increases by c, their average increases by c as well. Claiming the mean is unchanged contradicts this basic property.',
      D: 'The mean shifts by c (so it is not unchanged), even though the standard deviation remains the same. This choice gets the standard deviation right but incorrectly extends that reasoning to the mean.',
    },
  },

  {
    id: 'sat-f2-v2-math-m2h-qh13',
    section: 'math',
    moduleId: 'f2v2-math-module-2-hard',
    domain: 'Geometry and Trigonometry',
    skill: 'Area and volume',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'On an architectural blueprint, a four-sided plot of land is represented as a parallelogram with consecutive vertices at A(1, 1), B(6, 3), C(8, 8), and D(3, 6), where units are in centimeters on the blueprint. What is the area of the parallelogram, in square centimeters?',
    correctAnswer: '21',
    acceptableAnswers: ['21'],
    explanation:
      'From vertex A, form two adjacent edge vectors: AB = (6 − 1, 3 − 1) = (5, 2) and AD = (3 − 1, 6 − 1) = (2, 5). The area of a parallelogram equals the absolute value of the cross product of these vectors: |AB × AD| = |(5)(5) − (2)(2)| = |25 − 4| = 21 square centimeters. This can be verified with the shoelace formula: A = ½|x_A(y_B − y_D) + x_B(y_C − y_A) + x_C(y_D − y_B) + x_D(y_A − y_C)| = ½|1(3 − 6) + 6(8 − 1) + 8(6 − 3) + 3(1 − 8)| = ½|−3 + 42 + 24 − 21| = ½(42) = 21.',
    scoringNotes: 'The answer is 21.',
  },

  {
    id: 'sat-f2-v2-math-m2h-qh14',
    section: 'math',
    moduleId: 'f2v2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'A function f satisfies f(x + 2) = x² − 4x + 7 for all real values of x. What is f(3)?',
    choices: [
      { label: 'A', text: '1' },
      { label: 'B', text: '2' },
      { label: 'C', text: '4' },
      { label: 'D', text: '7' },
    ],
    correctAnswer: 'C',
    explanation:
      'To find f(3), determine the value of x such that x + 2 = 3, which gives x = 1. Then: f(3) = f(1 + 2) = 1² − 4(1) + 7 = 1 − 4 + 7 = 4.',
    wrongAnswerExplanations: {
      A: '1 comes from evaluating x² − 4x + 7 at x = 3 directly: 9 − 12 + 7 = 4... not 1. Alternatively, 1 may arise from computing f(3) = 3² − 4(3) + 7 = 4 correctly and then making a further arithmetic error, or from incorrectly substituting x = −1 (setting x + 2 = 1 instead of 3) to get 1 + 4 + 7 = 12, then misreading.',
      B: '2 results from a sign error: correctly identifying x = 1 but computing 1 − 4 + 7 as 1 − 5 = ... or computing 1² − 4(1) = −3 + 7 = 4 and then subtracting something extra, arriving at 2 from partial arithmetic.',
      D: '7 = f(2): setting x = 0 gives f(0 + 2) = f(2) = 0 − 0 + 7 = 7. This error comes from substituting x = 0 — perhaps from setting x + 2 = 2 rather than x + 2 = 3, or from directly reading off the constant term c = 7 as the answer.',
    },
  },

  {
    id: 'sat-f2-v2-math-m2h-qh15',
    section: 'math',
    moduleId: 'f2v2-math-module-2-hard',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Probability and conditional probability',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'Two fair six-sided dice are rolled simultaneously. Given that the sum of the two dice is at least 9, what is the probability that both dice show the same number?',
    choices: [
      { label: 'A', text: '1/10' },
      { label: 'B', text: '1/5' },
      { label: 'C', text: '1/4' },
      { label: 'D', text: '2/9' },
    ],
    correctAnswer: 'B',
    explanation:
      'List all outcomes with sum ≥ 9 (each pair is ordered): (3,6), (4,5), (4,6), (5,4), (5,5), (5,6), (6,3), (6,4), (6,5), (6,6) — exactly 10 outcomes. Among these, the doubles (both dice same) are (5,5) and (6,6) — exactly 2 outcomes. P(both same | sum ≥ 9) = 2/10 = 1/5.',
    wrongAnswerExplanations: {
      A: '1/10 counts only one double in the restricted sample space, missing (6,6). This error typically comes from listing (5,5) as the only double with sum ≥ 9 and not recognizing that (6,6) has sum 12 ≥ 9 and is also a double.',
      C: '1/4 = 2/8, which would apply if there were only 8 outcomes with sum ≥ 9, not 10. This error comes from missing two outcomes — typically (3,6) and (6,3), the pair summing to 9 with the lower die showing 3 — leaving 8 in the sample space.',
      D: '2/9 would apply if there were 9 outcomes with sum ≥ 9, not 10. This off-by-one error typically comes from overlooking one specific outcome — often (6,3) or (3,6) — when listing the restricted sample space.',
    },
  },

  {
    id: 'sat-f2-v2-math-m2h-qh16',
    section: 'math',
    moduleId: 'f2v2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'A small electronics manufacturer models its operations with cost function C(x) = 0.01x² + 5x + 200 and revenue function R(x) = 20x, where x is the number of units produced and sold per week. At what weekly production level x does the profit P(x) = R(x) − C(x) reach its maximum?',
    choices: [
      { label: 'A', text: '500' },
      { label: 'B', text: '600' },
      { label: 'C', text: '750' },
      { label: 'D', text: '800' },
    ],
    correctAnswer: 'C',
    explanation:
      'P(x) = R(x) − C(x) = 20x − (0.01x² + 5x + 200) = −0.01x² + 15x − 200. This is a downward-opening parabola (a = −0.01 < 0), so the vertex gives the maximum. The vertex x-coordinate is x = −b/(2a) = −15/(2 × −0.01) = −15/−0.02 = 750. Maximum profit occurs at x = 750 units per week.',
    wrongAnswerExplanations: {
      A: 'x = 500: The marginal profit P\'(500) = −0.02(500) + 15 = −10 + 15 = 5 > 0, meaning profit is still increasing at 500 — the maximum has not yet been reached. This error may come from incorrectly using the vertex formula with the cost function\'s vertex rather than the profit function\'s vertex.',
      B: 'x = 600: P\'(600) = −0.02(600) + 15 = −12 + 15 = 3 > 0 — profit is still increasing at 600. This error may come from an arithmetic mistake in the vertex formula, perhaps computing b/a = 15/0.02 = 750 and then subtracting some amount, or from using an incorrect version of the profit function.',
      D: 'x = 800: P\'(800) = −0.02(800) + 15 = −16 + 15 = −1 < 0 — profit has peaked and is now declining at 800. This error comes from using the vertex formula with the wrong sign or wrong coefficient — for instance, computing −(−5)/(2 × −0.01) = 5/(−0.02) = −250 and adjusting incorrectly, or mistakenly using the original cost coefficient 0.01 without doubling it in the denominator.',
    },
  },
]
