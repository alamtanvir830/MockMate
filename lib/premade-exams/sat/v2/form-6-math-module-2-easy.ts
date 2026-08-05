import type { MathQuestion } from '../types'

export const f6MathModule2EasyQuestionsV2: MathQuestion[] = [
  // ─── Q01 — Algebra / Linear equations in one variable / easy ─────────────────
  // correctAnswer: C
  {
    id: 'sat-f6-v2-math-m2e-q01',
    section: 'math',
    moduleId: 'f6v2-math-module-2-easy',
    domain: 'Algebra',
    skill: 'Linear equations in one variable',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'If 4x − 3 = 17, what is the value of x?',
    choices: [
      { label: 'A', text: '3' },
      { label: 'B', text: '7' },
      { label: 'C', text: '5' },
      { label: 'D', text: '6' },
    ],
    correctAnswer: 'C',
    explanation:
      'Add 3 to both sides: 4x = 20. Divide by 4: x = 5. Check: 4(5) − 3 = 20 − 3 = 17. ✓',
    wrongAnswerExplanations: {
      A: 'x = 3 results from computing 17 − 3 = 14, then rounding 14 ÷ 4 ≈ 3. The correct first step is adding 3 to both sides to get 4x = 20, then dividing by 4 to get x = 5.',
      B: 'x = 7 could come from adding 3 to 17 to get 20 but then dividing by 3 instead of 4: 20 ÷ 3 ≈ 7. The coefficient of x is 4, so 4x = 20 gives x = 5.',
      D: 'x = 6 does not satisfy the equation: 4(6) − 3 = 24 − 3 = 21 ≠ 17. Correct solution: 4x = 20, x = 5.',
    },
  },

  // ─── Q02 — Advanced Math / Equivalent expressions / easy ─────────────────────
  // correctAnswer: A
  {
    id: 'sat-f6-v2-math-m2e-q02',
    section: 'math',
    moduleId: 'f6v2-math-module-2-easy',
    domain: 'Advanced Math',
    skill: 'Equivalent expressions',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'Which expression is equivalent to 2(3x − 4) + 5x?',
    choices: [
      { label: 'A', text: '11x − 8' },
      { label: 'B', text: '11x + 8' },
      { label: 'C', text: '6x − 8' },
      { label: 'D', text: '11x − 4' },
    ],
    correctAnswer: 'A',
    explanation:
      'Distribute: 2(3x − 4) = 6x − 8. Then add 5x: 6x − 8 + 5x = 11x − 8.',
    wrongAnswerExplanations: {
      B: '11x + 8 uses +8 instead of −8, distributing incorrectly as 2(3x − 4) = 6x + 8. The negative inside the parentheses carries through: 2 × (−4) = −8, so the result is 6x − 8 + 5x = 11x − 8.',
      C: '6x − 8 correctly distributes but omits the +5x term entirely. All terms must be combined: 6x − 8 + 5x = 11x − 8.',
      D: '11x − 4 results from computing 2 × 4 = 4 instead of 8 for the constant. The correct product is 2 × (−4) = −8, giving 11x − 8.',
    },
  },

  // ─── Q03 — Algebra / Linear functions / easy ─────────────────────────────────
  // correctAnswer: D
  {
    id: 'sat-f6-v2-math-m2e-q03',
    section: 'math',
    moduleId: 'f6v2-math-module-2-easy',
    domain: 'Algebra',
    skill: 'Linear functions',
    difficulty: 'easy',
    type: 'multiple_choice',
    question:
      'The function f is defined by f(x) = −2x + 9. What is the value of f(−3)?',
    choices: [
      { label: 'A', text: '3' },
      { label: 'B', text: '13' },
      { label: 'C', text: '−15' },
      { label: 'D', text: '15' },
    ],
    correctAnswer: 'D',
    explanation:
      'Substitute x = −3: f(−3) = −2(−3) + 9 = 6 + 9 = 15.',
    wrongAnswerExplanations: {
      A: 'f(−3) = 3 comes from computing −2(3) + 9 = −6 + 9 = 3, treating x as +3 instead of −3. Since x = −3, the product −2(−3) = +6 (negative times negative equals positive), so f(−3) = 6 + 9 = 15.',
      B: 'f(−3) = 13 results from computing 2(−3) + 9 = −6 + 9 ... wait, that gives 3. More likely 13 comes from ignoring the negative sign on the coefficient: 2(3) + 7 = 13, using wrong values. The correct computation is −2(−3) + 9 = 6 + 9 = 15.',
      C: 'f(−3) = −15 comes from computing −(2(−3) + 9) or negating the whole result. The correct computation is −2(−3) + 9 = 6 + 9 = +15, not −15.',
    },
  },

  // ─── Q04 — Problem-Solving and Data Analysis / Ratios, rates / easy ───────────
  // correctAnswer: B
  {
    id: 'sat-f6-v2-math-m2e-q04',
    section: 'math',
    moduleId: 'f6v2-math-module-2-easy',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Ratios, rates, proportional relationships, and units',
    difficulty: 'easy',
    type: 'multiple_choice',
    question:
      'A car travels 180 miles in 3 hours at a constant speed. At this rate, how many miles does the car travel in 5 hours?',
    choices: [
      { label: 'A', text: '270' },
      { label: 'B', text: '300' },
      { label: 'C', text: '360' },
      { label: 'D', text: '250' },
    ],
    correctAnswer: 'B',
    explanation:
      'Rate = 180 ÷ 3 = 60 miles per hour. Distance in 5 hours = 60 × 5 = 300 miles.',
    wrongAnswerExplanations: {
      A: '270 = 180 + 90 adds only one additional "hour unit" at 90 mph instead of computing the full 5-hour distance. The rate is 60 mph, so 5 hours = 60 × 5 = 300 miles.',
      C: '360 = 180 × 2 doubles the original distance as though 5 hours is twice 3 hours. 5/3 is the correct scale factor: 180 × (5/3) = 300 miles.',
      D: '250 does not follow from any clean calculation with these numbers. 60 mph × 5 hours = 300 miles.',
    },
  },

  // ─── Q05 — Algebra / Linear equations in two variables / easy ────────────────
  // correctAnswer: A
  {
    id: 'sat-f6-v2-math-m2e-q05',
    section: 'math',
    moduleId: 'f6v2-math-module-2-easy',
    domain: 'Algebra',
    skill: 'Linear equations in two variables',
    difficulty: 'easy',
    type: 'multiple_choice',
    question:
      'A line passes through the points (0, 3) and (4, 11). Which of the following is the equation of this line?',
    choices: [
      { label: 'A', text: 'y = 2x + 3' },
      { label: 'B', text: 'y = 3x + 2' },
      { label: 'C', text: 'y = 2x − 3' },
      { label: 'D', text: 'y = 4x + 3' },
    ],
    correctAnswer: 'A',
    explanation:
      'The y-intercept is 3 (from the point (0, 3)). Slope = (11 − 3)/(4 − 0) = 8/4 = 2. Equation: y = 2x + 3. Check with (4, 11): y = 2(4) + 3 = 11. ✓',
    wrongAnswerExplanations: {
      B: 'y = 3x + 2 swaps the slope and y-intercept. The slope is 2 (not 3) and the y-intercept is 3 (not 2), as the point (0, 3) directly gives b = 3.',
      C: 'y = 2x − 3 has the correct slope (2) but the wrong y-intercept sign. The point (0, 3) gives b = +3, not −3. Check: 2(0) − 3 = −3 ≠ 3.',
      D: 'y = 4x + 3 uses the x-coordinate of the second point (4) as the slope. The slope must be computed as rise/run = (11 − 3)/(4 − 0) = 2, not 4.',
    },
  },

  // ─── Q06 — Advanced Math / Nonlinear functions / easy ───────────────────────
  // correctAnswer: D
  {
    id: 'sat-f6-v2-math-m2e-q06',
    section: 'math',
    moduleId: 'f6v2-math-module-2-easy',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'easy',
    type: 'multiple_choice',
    question:
      'The function p is defined by p(x) = x² − 5x + 4. What is the value of p(2)?',
    choices: [
      { label: 'A', text: '4' },
      { label: 'B', text: '0' },
      { label: 'C', text: '8' },
      { label: 'D', text: '−2' },
    ],
    correctAnswer: 'D',
    explanation:
      'Substitute x = 2: p(2) = (2)² − 5(2) + 4 = 4 − 10 + 4 = −2.',
    wrongAnswerExplanations: {
      A: 'p(2) = 4 reports only the constant term without substituting x = 2 into the full expression. The complete evaluation is 4 − 10 + 4 = −2.',
      B: 'p(2) = 0 is incorrect. Students might notice that x = 1 and x = 4 are zeros of p(x) and assume other values also yield 0. p(2) = 4 − 10 + 4 = −2.',
      C: 'p(2) = 8 comes from computing 2² + 4 = 8 and ignoring the −5x term. Every term must be included: 4 − 10 + 4 = −2.',
    },
  },

  // ─── Q07 — Algebra / Systems of two linear equations / medium ────────────────
  // correctAnswer: C
  {
    id: 'sat-f6-v2-math-m2e-q07',
    section: 'math',
    moduleId: 'f6v2-math-module-2-easy',
    domain: 'Algebra',
    skill: 'Systems of two linear equations in two variables',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'What is the x-coordinate of the solution to the following system of equations?\n3x + y = 14\nx − y = 2',
    choices: [
      { label: 'A', text: '2' },
      { label: 'B', text: '5' },
      { label: 'C', text: '4' },
      { label: 'D', text: '3' },
    ],
    correctAnswer: 'C',
    explanation:
      'Add the two equations to eliminate y: 4x = 16, so x = 4. Check: y = x − 2 = 2, and 3(4) + 2 = 14. ✓',
    wrongAnswerExplanations: {
      A: 'x = 2 is the constant in the second equation, not the solution. Substituting x = 2 gives y = 0, but 3(2) + 0 = 6 ≠ 14. Adding equations gives 4x = 16, so x = 4.',
      B: 'x = 5 likely comes from an arithmetic error when adding the equations. (3x + y) + (x − y) = 14 + 2 gives 4x = 16, not 4x = 20. So x = 4.',
      D: 'x = 3 does not satisfy the system: 3(3) + y = 14 → y = 5, and 3 − 5 = −2 ≠ 2. The correct solution from adding equations is x = 4.',
    },
  },

  // ─── Q08 — Problem-Solving and Data Analysis / Percentages / medium ────────────
  // correctAnswer: B
  {
    id: 'sat-f6-v2-math-m2e-q08',
    section: 'math',
    moduleId: 'f6v2-math-module-2-easy',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Percentages',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'A laptop originally costs $480. It is on sale for 35% off. What is the sale price of the laptop?',
    choices: [
      { label: 'A', text: '$168' },
      { label: 'B', text: '$312' },
      { label: 'C', text: '$445' },
      { label: 'D', text: '$648' },
    ],
    correctAnswer: 'B',
    explanation:
      'Discount = 35% of $480 = 0.35 × 480 = $168. Sale price = $480 − $168 = $312. Alternatively, sale price = $480 × (1 − 0.35) = $480 × 0.65 = $312.',
    wrongAnswerExplanations: {
      A: '$168 is the discount amount, not the sale price. Students who correctly compute 0.35 × 480 = 168 but forget to subtract from the original price report the savings rather than the final price. Sale price = $480 − $168 = $312.',
      C: '$445 = $480 − $35 subtracts the percent number (35) directly rather than 35% of $480. The discount is 35% of the price: 0.35 × 480 = $168, so sale price = $480 − $168 = $312.',
      D: '$648 = $480 × 1.35 applies a 35% markup instead of a 35% discount. Students who add rather than subtract the percentage get $648. A discount reduces the price: $480 × 0.65 = $312.',
    },
  },

  // ─── Q09 — Advanced Math / Quadratic equations and functions / medium ──────────
  // correctAnswer: A
  {
    id: 'sat-f6-v2-math-m2e-q09',
    section: 'math',
    moduleId: 'f6v2-math-module-2-easy',
    domain: 'Advanced Math',
    skill: 'Quadratic equations and functions',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'The quadratic function f is defined by f(x) = (x − 3)² − 4. What is the minimum value of f(x)?',
    choices: [
      { label: 'A', text: '−4' },
      { label: 'B', text: '3' },
      { label: 'C', text: '5' },
      { label: 'D', text: '0' },
    ],
    correctAnswer: 'A',
    explanation:
      'The function is in vertex form f(x) = (x − 3)² − 4. The vertex is at (3, −4). Since the parabola opens upward, the minimum value is −4.',
    wrongAnswerExplanations: {
      B: '3 is the x-coordinate of the vertex, not the minimum value of f. The minimum value is the y-coordinate of the vertex: f(3) = (3 − 3)² − 4 = 0 − 4 = −4.',
      C: '5 = 3 + 2, which has no direct geometric meaning here. The minimum occurs at x = 3, giving f(3) = −4.',
      D: '0 = (x − 3)² at x = 3, but students who stop at the squared term forget the −4. f(3) = 0 − 4 = −4, not 0.',
    },
  },

  // ─── Q10 — Problem-Solving and Data Analysis / One-variable data / medium ──────
  // correctAnswer: D
  {
    id: 'sat-f6-v2-math-m2e-q10',
    section: 'math',
    moduleId: 'f6v2-math-module-2-easy',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'One-variable data: distributions and measures of center and spread',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'Five students recorded how many hours they slept last night: 4, 8, 9, 11, 13. Which of the following correctly describes this data set?',
    choices: [
      { label: 'A', text: 'Mean = 8, Range = 9' },
      { label: 'B', text: 'Mean = 9, Range = 8' },
      { label: 'C', text: 'Mean = 10, Range = 9' },
      { label: 'D', text: 'Mean = 9, Range = 9' },
    ],
    correctAnswer: 'D',
    explanation:
      'Mean = (4 + 8 + 9 + 11 + 13) ÷ 5 = 45 ÷ 5 = 9. Range = maximum − minimum = 13 − 4 = 9. Both the mean and range equal 9.',
    wrongAnswerExplanations: {
      A: 'Mean = 8 is incorrect. Sum = 4 + 8 + 9 + 11 + 13 = 45, and 45 ÷ 5 = 9, not 8. The range of 9 is correct, but the wrong mean makes A incorrect.',
      B: 'Range = 8 is incorrect. The range is max − min = 13 − 4 = 9, not 8. The mean of 9 is correct, but the wrong range makes B incorrect.',
      C: 'Mean = 10 is incorrect. Students who add all five values and get 50 (off by 5) and divide by 5 get 10. The correct sum is 45, giving mean = 9. The range of 9 is correct.',
    },
  },

  // ─── Q11 — Algebra / Linear inequalities / medium ────────────────────────────
  // correctAnswer: B
  {
    id: 'sat-f6-v2-math-m2e-q11',
    section: 'math',
    moduleId: 'f6v2-math-module-2-easy',
    domain: 'Algebra',
    skill: 'Linear inequalities in one or two variables',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'Which of the following is the solution to −3x + 9 > 0?',
    choices: [
      { label: 'A', text: 'x > 3' },
      { label: 'B', text: 'x < 3' },
      { label: 'C', text: 'x > −3' },
      { label: 'D', text: 'x < −3' },
    ],
    correctAnswer: 'B',
    explanation:
      'Subtract 9 from both sides: −3x > −9. Divide by −3 and flip the inequality: x < 3.',
    wrongAnswerExplanations: {
      A: 'x > 3 forgets to reverse the inequality direction when dividing by a negative number. Dividing −3x > −9 by −3 reverses > to <, giving x < 3.',
      C: 'x > −3 arises from computing 9 ÷ 3 = 3 and then incorrectly negating to −3. The boundary value is 3 (positive), and the inequality direction is x < 3.',
      D: 'x < −3 correctly flips the inequality sign but uses the wrong boundary value (−3 instead of 3). Dividing −9 by −3 gives +3, not −3. The solution is x < 3.',
    },
  },

  // ─── Q12 — Geometry and Trigonometry / Area and volume formulas / medium ───────
  // correctAnswer: C
  {
    id: 'sat-f6-v2-math-m2e-q12',
    section: 'math',
    moduleId: 'f6v2-math-module-2-easy',
    domain: 'Geometry and Trigonometry',
    skill: 'Area and volume formulas',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'A cylinder has a radius of 4 cm and a height of 5 cm. What is the volume of the cylinder in cubic centimeters? (Use π ≈ 3.14)',
    choices: [
      { label: 'A', text: '62.8' },
      { label: 'B', text: '200.96' },
      { label: 'C', text: '251.2' },
      { label: 'D', text: '502.4' },
    ],
    correctAnswer: 'C',
    explanation:
      'Volume = π × r² × h = 3.14 × 4² × 5 = 3.14 × 16 × 5 = 3.14 × 80 = 251.2 cubic centimeters.',
    wrongAnswerExplanations: {
      A: '62.8 = 3.14 × 4 × 5 uses the radius directly without squaring it. The formula requires r²: r = 4, so r² = 16, and V = 3.14 × 16 × 5 = 251.2.',
      B: '200.96 = 3.14 × 4² × 4 uses the radius (4) as the height instead of 5. The given height is 5 cm: V = 3.14 × 16 × 5 = 251.2.',
      D: '502.4 = 3.14 × 4² × 10 doubles the height to 10 instead of using h = 5. V = 3.14 × 16 × 5 = 251.2.',
    },
  },

  // ─── Q13 — Advanced Math / Nonlinear equations / medium ─────────────────────
  // correctAnswer: D
  {
    id: 'sat-f6-v2-math-m2e-q13',
    section: 'math',
    moduleId: 'f6v2-math-module-2-easy',
    domain: 'Advanced Math',
    skill: 'Nonlinear equations in one variable and systems of equations in two variables',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'What are the solutions to x² + x − 12 = 0?',
    choices: [
      { label: 'A', text: 'x = 3 and x = 4' },
      { label: 'B', text: 'x = −3 and x = −4' },
      { label: 'C', text: 'x = 2 and x = 6' },
      { label: 'D', text: 'x = 3 and x = −4' },
    ],
    correctAnswer: 'D',
    explanation:
      'Factor: x² + x − 12 = (x + 4)(x − 3) = 0. Setting each factor to zero: x = −4 or x = 3. Check: (3)² + 3 − 12 = 0 ✓ and (−4)² + (−4) − 12 = 16 − 4 − 12 = 0 ✓.',
    wrongAnswerExplanations: {
      A: '"x = 3 and x = 4" would require (x − 3)(x − 4) = x² − 7x + 12, not x² + x − 12. The signs of the roots are wrong; one root must be negative since the constant term is negative.',
      B: '"x = −3 and x = −4" would require (x + 3)(x + 4) = x² + 7x + 12, not x² + x − 12. Check: (−3)² + (−3) − 12 = 9 − 3 − 12 = −6 ≠ 0.',
      C: '"x = 2 and x = 6" gives a product of 12 but (x − 2)(x + 6) = x² + 4x − 12, not x² + x − 12. The middle term does not match.',
    },
  },

  // ─── Q14 — Problem-Solving and Data Analysis / Two-variable data / medium ───────
  // correctAnswer: A
  {
    id: 'sat-f6-v2-math-m2e-q14',
    section: 'math',
    moduleId: 'f6v2-math-module-2-easy',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Two-variable data: models and scatterplots',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'A line of best fit has the equation y = −3x + 45, where x is the number of weeks elapsed and y is the number of items remaining in a warehouse. What is the predicted number of items remaining after 8 weeks?',
    choices: [
      { label: 'A', text: '21' },
      { label: 'B', text: '24' },
      { label: 'C', text: '30' },
      { label: 'D', text: '69' },
    ],
    correctAnswer: 'A',
    explanation:
      'Substitute x = 8: y = −3(8) + 45 = −24 + 45 = 21.',
    wrongAnswerExplanations: {
      B: '24 is the absolute value of −3(8), not the answer. Students who compute |−3 × 8| = 24 and stop — forgetting to add 45 — select B. y = −24 + 45 = 21.',
      C: '30 = −3(5) + 45 corresponds to x = 5, not x = 8. Students who substitute the wrong number of weeks get 30. Substitute x = 8: y = −24 + 45 = 21.',
      D: '69 = 3(8) + 45 adds instead of subtracts, dropping the negative sign on the slope. The slope is −3 (inventory decreases), so y = −24 + 45 = 21.',
    },
  },

  // ─── Q15 — Geometry and Trigonometry / Right triangles and trigonometry / medium/hard
  // correctAnswer: C
  {
    id: 'sat-f6-v2-math-m2e-q15',
    section: 'math',
    moduleId: 'f6v2-math-module-2-easy',
    domain: 'Geometry and Trigonometry',
    skill: 'Right triangles and trigonometry',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'In right triangle ABC, angle C is the right angle. If sin(A) = 3/5, what is cos(A)?',
    choices: [
      { label: 'A', text: '3/4' },
      { label: 'B', text: '5/3' },
      { label: 'C', text: '4/5' },
      { label: 'D', text: '3/5' },
    ],
    correctAnswer: 'C',
    explanation:
      'sin(A) = opposite/hypotenuse = 3/5, so opposite = 3 and hypotenuse = 5. By the Pythagorean theorem, adjacent = √(5² − 3²) = √16 = 4. Therefore cos(A) = adjacent/hypotenuse = 4/5.',
    wrongAnswerExplanations: {
      A: '3/4 = tan(A) = opposite/adjacent, not cos(A). Students who compute the tangent ratio instead of cosine select 3/4. Cosine uses adjacent over hypotenuse: 4/5.',
      B: '5/3 = csc(A), the reciprocal of sin(A). Students who invert the given sine ratio without identifying the correct trig function get 5/3. cos(A) = adjacent/hypotenuse = 4/5.',
      D: '3/5 = sin(A), the given information. Students who re-state the given sine as the cosine — without computing the adjacent leg — select 3/5. cos(A) = 4/5.',
    },
  },

  // ─── Q16 — Geometry and Trigonometry / Lines, angles, and triangles / medium/hard
  // correctAnswer: B
  {
    id: 'sat-f6-v2-math-m2e-q16',
    section: 'math',
    moduleId: 'f6v2-math-module-2-easy',
    domain: 'Geometry and Trigonometry',
    skill: 'Lines, angles, and triangles',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'In triangle PQR, the measure of angle P is 47° and the measure of angle Q is 68°. What is the measure of the exterior angle at vertex R?',
    choices: [
      { label: 'A', text: '65°' },
      { label: 'B', text: '115°' },
      { label: 'C', text: '133°' },
      { label: 'D', text: '47°' },
    ],
    correctAnswer: 'B',
    explanation:
      'Angle R = 180° − 47° − 68° = 65°. The exterior angle at R is supplementary to angle R: 180° − 65° = 115°. Equivalently, by the exterior angle theorem, the exterior angle equals the sum of the two non-adjacent interior angles: 47° + 68° = 115°.',
    wrongAnswerExplanations: {
      A: '65° is the interior angle R, not the exterior angle. The exterior angle is supplementary to angle R: 180° − 65° = 115°.',
      C: '133° = 180° − 47°, using only one of the interior angles. The exterior angle at R equals the sum of BOTH remote interior angles: 47° + 68° = 115°.',
      D: '47° = angle P is one remote interior angle alone. The exterior angle theorem requires summing both remote interior angles: 47° + 68° = 115°.',
    },
  },

  // ─── Q17 — Algebra / Linear equations in one variable / medium / grid_in ───────
  {
    id: 'sat-f6-v2-math-m2e-q17',
    section: 'math',
    moduleId: 'f6v2-math-module-2-easy',
    domain: 'Algebra',
    skill: 'Linear equations in one variable',
    difficulty: 'medium',
    type: 'grid_in',
    question: 'If 5(x − 2) = 3x + 8, what is the value of x?',
    correctAnswer: '9',
    acceptableAnswers: ['9'],
    explanation:
      'Distribute: 5x − 10 = 3x + 8. Subtract 3x: 2x − 10 = 8. Add 10: 2x = 18. Divide by 2: x = 9. Check: 5(9 − 2) = 5(7) = 35 and 3(9) + 8 = 27 + 8 = 35. ✓',
    scoringNotes: 'Only accept 9.',
  },

  // ─── Q18 — Algebra / Systems of two linear equations / medium / grid_in ─────────
  {
    id: 'sat-f6-v2-math-m2e-q18',
    section: 'math',
    moduleId: 'f6v2-math-module-2-easy',
    domain: 'Algebra',
    skill: 'Systems of two linear equations in two variables',
    difficulty: 'medium',
    type: 'grid_in',
    question:
      'In the system of equations below, what is the value of y?\n2x + 3y = 22\n2x − y = 6',
    correctAnswer: '4',
    acceptableAnswers: ['4'],
    explanation:
      'Subtract the second equation from the first: 4y = 16, so y = 4. Check: 2x − 4 = 6 → x = 5, and 2(5) + 3(4) = 10 + 12 = 22. ✓',
    scoringNotes: 'Only accept 4.',
  },

  // ─── Q19 — Advanced Math / Equivalent expressions / medium / grid_in ────────────
  {
    id: 'sat-f6-v2-math-m2e-q19',
    section: 'math',
    moduleId: 'f6v2-math-module-2-easy',
    domain: 'Advanced Math',
    skill: 'Equivalent expressions',
    difficulty: 'medium',
    type: 'grid_in',
    question:
      'If (2x + 3)(x − 5) = 2x² + bx − 15 for all values of x, what is the value of b?',
    correctAnswer: '-7',
    acceptableAnswers: ['-7'],
    explanation:
      'Expand using FOIL: 2x·x + 2x·(−5) + 3·x + 3·(−5) = 2x² − 10x + 3x − 15 = 2x² − 7x − 15. Comparing to 2x² + bx − 15, we get b = −7.',
    scoringNotes: 'Accept −7 or -7.',
  },

  // ─── Q20 — Problem-Solving and Data Analysis / Probability / medium/hard / grid_in
  {
    id: 'sat-f6-v2-math-m2e-q20',
    section: 'math',
    moduleId: 'f6v2-math-module-2-easy',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Probability and conditional probability',
    difficulty: 'medium',
    type: 'grid_in',
    question:
      'A bag contains 5 green marbles, 3 red marbles, and 2 blue marbles. If one marble is drawn at random, what is the probability that it is NOT green? Enter your answer as a decimal.',
    correctAnswer: '.5',
    acceptableAnswers: ['.5', '0.5', '1/2'],
    explanation:
      'Total marbles = 5 + 3 + 2 = 10. Non-green marbles = 3 + 2 = 5. P(not green) = 5/10 = 1/2 = 0.5.',
    scoringNotes: 'Accept 1/2, .5, or 0.5.',
  },

  // ─── Q21 — Advanced Math / Nonlinear functions / medium/hard / grid_in ──────────
  {
    id: 'sat-f6-v2-math-m2e-q21',
    section: 'math',
    moduleId: 'f6v2-math-module-2-easy',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'medium',
    type: 'grid_in',
    question:
      'The function f is defined by f(x) = 2x² − 8x + 6. What is the larger value of x for which f(x) = 0?',
    correctAnswer: '3',
    acceptableAnswers: ['3'],
    explanation:
      'Set f(x) = 0: 2x² − 8x + 6 = 0. Divide by 2: x² − 4x + 3 = 0. Factor: (x − 3)(x − 1) = 0. Solutions: x = 1 or x = 3. The larger value is 3.',
    scoringNotes: 'Only accept 3 (the larger solution).',
  },

  // ─── Q22 — Problem-Solving and Data Analysis / Ratios, rates / medium/hard / grid_in
  {
    id: 'sat-f6-v2-math-m2e-q22',
    section: 'math',
    moduleId: 'f6v2-math-module-2-easy',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Ratios, rates, proportional relationships, and units',
    difficulty: 'medium',
    type: 'grid_in',
    question:
      'A recipe for 4 servings requires 3/4 cup of olive oil. A chef wants to make 20 servings. How many cups of olive oil are needed?',
    correctAnswer: '15/4',
    acceptableAnswers: ['15/4', '3.75'],
    explanation:
      'Scale factor = 20 ÷ 4 = 5. Olive oil needed = (3/4) × 5 = 15/4 = 3.75 cups.',
    scoringNotes: 'Accept 15/4 or 3.75.',
  },
]
