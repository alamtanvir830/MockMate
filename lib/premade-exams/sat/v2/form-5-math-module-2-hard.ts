import type { MathQuestion } from '../types'

export const f5MathModule2HardQuestionsV2: MathQuestion[] = [
  {
    id: 'sat-f5-v2-math-m2h-q01',
    section: 'math',
    moduleId: 'f5v2-math-module-2-hard',
    domain: 'Algebra',
    skill: 'Systems of two linear equations in two variables',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'For the system of equations 4x + ky = 8 and 2x + 3y = 5 to have no solution, what must be the value of k? Justify why the value you select produces parallel — not coincident — lines.',
    choices: [
      { label: 'A', text: '3' },
      { label: 'B', text: '6' },
      { label: 'C', text: '−6' },
      { label: 'D', text: '12' },
    ],
    correctAnswer: 'B',
    explanation:
      'A system has no solution when the lines are parallel — equal slopes but different y-intercepts. Rewrite in slope-intercept form: line 1 has slope −4/k; line 2 has slope −2/3. Set −4/k = −2/3 → k = 6. Now verify the lines are parallel (not coincident): with k = 6, line 1 becomes 4x + 6y = 8, which simplifies to 2x + 3y = 4. Line 2 is 2x + 3y = 5. Same left side, different constants — parallel, not coincident. Therefore k = 6 produces no solution.',
    wrongAnswerExplanations: {
      A: 'k = 3 gives slopes −4/3 and −2/3, which are unequal. The lines intersect at one point; the system has a unique solution.',
      C: 'k = −6 gives slope 4/6 = 2/3 for line 1 and −2/3 for line 2. The slopes have opposite signs, so the lines intersect — one solution exists.',
      D: 'k = 12 gives slope −4/12 = −1/3 for line 1 and −2/3 for line 2. The slopes differ, so the lines intersect — one solution exists.',
    },
  },

  {
    id: 'sat-f5-v2-math-m2h-q02',
    section: 'math',
    moduleId: 'f5v2-math-module-2-hard',
    domain: 'Algebra',
    skill: 'Linear equations in one variable',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'Company A charges a flat fee of $24 plus $3 per mile driven. Company B charges a flat fee of $10 plus $4.75 per mile. For how many miles driven do the two companies charge the same total amount?',
    choices: [
      { label: 'A', text: '5' },
      { label: 'B', text: '7' },
      { label: 'C', text: '8' },
      { label: 'D', text: '12' },
    ],
    correctAnswer: 'C',
    explanation:
      'Set the two expressions equal: 24 + 3m = 10 + 4.75m. Subtract 3m from both sides: 24 = 10 + 1.75m. Subtract 10: 14 = 1.75m → m = 14/1.75 = 8. Verify: Company A: 24 + 3(8) = 48. Company B: 10 + 4.75(8) = 10 + 38 = 48 ✓.',
    wrongAnswerExplanations: {
      A: 'm = 5: Company A charges 24 + 15 = 39; Company B charges 10 + 23.75 = 33.75. Not equal. This error comes from dividing 14 by 2.8 rather than 1.75.',
      B: 'm = 7: Company A charges 24 + 21 = 45; Company B charges 10 + 33.25 = 43.25. Not equal. This results from computing 12/1.75 (using 12 instead of 14) as the numerator.',
      D: 'm = 12: This results from subtracting the flat fees (24 − 10 = 14) and then dividing by the wrong rate difference (14/1.17 ≈ 12), for example using (4.75 − 3.58) instead of (4.75 − 3).',
    },
  },

  {
    id: 'sat-f5-v2-math-m2h-q03',
    section: 'math',
    moduleId: 'f5v2-math-module-2-hard',
    domain: 'Algebra',
    skill: 'Linear functions',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'A linear function f satisfies f(3) = 11 and f(−1) = −5. What is f(7)?',
    choices: [
      { label: 'A', text: '23' },
      { label: 'B', text: '27' },
      { label: 'C', text: '31' },
      { label: 'D', text: '35' },
    ],
    correctAnswer: 'B',
    explanation:
      'Slope: m = (11 − (−5)) / (3 − (−1)) = 16/4 = 4. Using point-slope: f(x) = 4(x − 3) + 11 = 4x − 1. Verify: f(−1) = −4 − 1 = −5 ✓. Then f(7) = 4(7) − 1 = 28 − 1 = 27.',
    wrongAnswerExplanations: {
      A: 'f(7) = 23 results from computing slope as (11 − 5)/(3 − (−1)) = 6/4 = 1.5, then using f(x) = 1.5x + 6.5 (wrong slope and intercept).',
      C: 'f(7) = 31 comes from using the correct slope but computing the y-intercept as +1 instead of −1, giving f(x) = 4x + 1 → f(7) = 29. Alternatively, computing 4(8) − 1 by using x = 8 instead of x = 7 gives 31.',
      D: 'f(7) = 35 results from forgetting to subtract the y-intercept and computing f(7) = 4(7) + 7 = 35 by carrying the +7 offset from point (3, 11) without adjusting.',
    },
  },

  {
    id: 'sat-f5-v2-math-m2h-q04',
    section: 'math',
    moduleId: 'f5v2-math-module-2-hard',
    domain: 'Algebra',
    skill: 'Linear inequalities in one or two variables',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'A laboratory protocol requires that a solution\'s concentration c (in mg/mL) satisfy both −2 < 3c + 1 ≤ 10 and c > −1/3. Which of the following represents all permissible values of c?',
    choices: [
      { label: 'A', text: 'c > −1/3' },
      { label: 'B', text: '−1 < c ≤ 3' },
      { label: 'C', text: '−1/3 < c ≤ 3' },
      { label: 'D', text: '0 < c ≤ 3' },
    ],
    correctAnswer: 'C',
    explanation:
      'Solve −2 < 3c + 1 ≤ 10: subtract 1 to get −3 < 3c ≤ 9, then divide by 3: −1 < c ≤ 3. Intersect with c > −1/3: since −1/3 > −1, the binding lower bound is −1/3. Intersection: −1/3 < c ≤ 3.',
    wrongAnswerExplanations: {
      A: 'c > −1/3 ignores the upper bound c ≤ 3 from the compound inequality, leaving the solution set unbounded above.',
      B: '−1 < c ≤ 3 is the solution to the compound inequality alone, before intersecting with c > −1/3. This lower bound is too permissive.',
      D: '0 < c ≤ 3 incorrectly rounds the lower bound −1/3 ≈ −0.33 up to 0, excluding valid values in the interval (−1/3, 0].',
    },
  },

  {
    id: 'sat-f5-v2-math-m2h-q05',
    section: 'math',
    moduleId: 'f5v2-math-module-2-hard',
    domain: 'Algebra',
    skill: 'Systems of two linear equations in two variables',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'In the system of equations 5x + 2y = 23 and 3x − 2y = 1, what is the value of x + y?',
    correctAnswer: '7',
    acceptableAnswers: ['7'],
    explanation:
      'Add the equations to eliminate y: 8x = 24 → x = 3. Substitute into 3(3) − 2y = 1: 9 − 2y = 1 → y = 4. Therefore x + y = 7.',
  },

  {
    id: 'sat-f5-v2-math-m2h-q06',
    section: 'math',
    moduleId: 'f5v2-math-module-2-hard',
    domain: 'Algebra',
    skill: 'Linear equations in two variables',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'Line ℓ passes through (a, 1) and (4, 7) and has slope 3. What is the value of a?',
    correctAnswer: '2',
    acceptableAnswers: ['2'],
    explanation:
      'Using the slope formula: (7 − 1)/(4 − a) = 3 → 6/(4 − a) = 3 → 4 − a = 2 → a = 2.',
  },

  {
    id: 'sat-f5-v2-math-m2h-q14',
    section: 'math',
    moduleId: 'f5v2-math-module-2-hard',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Ratios, rates, proportional relationships, and units',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'Pipe A fills a tank in 6 hours and Pipe B fills the same tank in 9 hours. Both pipes are opened simultaneously. How many hours does it take to fill the tank?',
    choices: [
      { label: 'A', text: '3.0' },
      { label: 'B', text: '3.6' },
      { label: 'C', text: '4.5' },
      { label: 'D', text: '5.4' },
    ],
    correctAnswer: 'B',
    explanation:
      'Combined rate = 1/6 + 1/9 = 3/18 + 2/18 = 5/18 tanks per hour. Time = 1 ÷ (5/18) = 18/5 = 3.6 hours.',
    wrongAnswerExplanations: {
      A: '3.0 hours results from computing the harmonic mean incorrectly as (6 + 9)/5 = 3, confusing the combined-rate formula.',
      C: '4.5 hours is the arithmetic mean of 6/2 = 3 and 9/2 = 4.5, not a valid combined-work computation.',
      D: '5.4 hours results from averaging 6 and 9 (= 7.5) and then applying an incorrect reciprocal, or from computing 1/(1/6 − 1/9) = 18 as though the pipes were working against each other and dividing by a different constant.',
    },
  },

  {
    id: 'sat-f5-v2-math-m2h-q15',
    section: 'math',
    moduleId: 'f5v2-math-module-2-hard',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Percentages',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'A jacket is marked up 40% above its wholesale cost, then discounted 25% off the marked price during a sale. The sale price is then subject to a 10% sales tax. The final price paid by the customer is what percent of the original wholesale cost? (Round to the nearest whole percent.)',
    choices: [
      { label: 'A', text: '105%' },
      { label: 'B', text: '116%' },
      { label: 'C', text: '125%' },
      { label: 'D', text: '154%' },
    ],
    correctAnswer: 'B',
    explanation:
      'Let wholesale cost = C. Marked price = 1.40C. Sale price = 0.75 × 1.40C = 1.05C. After 10% tax: 1.10 × 1.05C = 1.155C ≈ 116% of C.',
    wrongAnswerExplanations: {
      A: '105% is the sale price before tax (1.05C), omitting the final 10% sales tax step.',
      C: '125% results from adding 40% and subtracting 25% arithmetically (100 + 40 − 25 = 115%) and then adding 10 percentage points more (115 + 10 = 125), treating percentages as additive rather than multiplicative.',
      D: '154% results from applying the 10% tax to the marked price (1.40C) before the 25% discount: 1.40 × 1.10 = 1.54C, skipping the discount step.',
    },
  },

  {
    id: 'sat-f5-v2-math-m2h-q16',
    section: 'math',
    moduleId: 'f5v2-math-module-2-hard',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Data distributions and statistics',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'A data set of seven values has a mean of 12 and a median of 10. A new value of 30 is added to the data set. Which of the following must be true?',
    choices: [
      { label: 'A', text: 'The mean increases and the median stays the same.' },
      { label: 'B', text: 'Both the mean and the median increase.' },
      { label: 'C', text: 'The mean increases and the median could increase or stay the same.' },
      { label: 'D', text: 'The mean stays the same and the median increases.' },
    ],
    correctAnswer: 'C',
    explanation:
      'Original sum = 7 × 12 = 84. New sum = 84 + 30 = 114; new mean = 114/8 = 14.25 > 12 — the mean definitely increases. For the median: originally with 7 values, the median is the 4th value = 10. With 8 values, the median is the average of the 4th and 5th values after sorting. Adding 30 appends it to the high end. The new 4th value is unchanged (it was the original 4th), but the 5th value is the original 5th. If the original 5th value = 10, the new median = (10 + 10)/2 = 10 (unchanged). If the original 5th value > 10, the new median > 10 (increases). So the median could increase or stay the same — but cannot decrease. The mean definitely increases; the median may or may not increase.',
    wrongAnswerExplanations: {
      A: 'Saying the median "stays the same" is too strong. If the original 5th value exceeded 10, the new median (average of 4th and 5th) would be above 10, so the median could increase.',
      B: 'The median does not necessarily increase. If all values from position 4 through 5 equal 10, the new median remains 10. "Must be true" requires certainty.',
      D: 'The mean cannot stay the same: adding 30 (which exceeds the current mean of 12) to the sum and increasing the count by 1 must raise the mean.',
    },
  },

  {
    id: 'sat-f5-v2-math-m2h-q17',
    section: 'math',
    moduleId: 'f5v2-math-module-2-hard',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Probability and conditional probability',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'In a group of 80 students, 45 study French, 30 study Spanish, and 15 study both languages. A student is selected at random from those who study Spanish. What is the probability that this student also studies French? Enter your answer as a fraction.',
    correctAnswer: '1/2',
    acceptableAnswers: ['1/2', '.5', '0.5', '15/30'],
    explanation:
      'We need P(French | Spanish). Among the 30 students who study Spanish, 15 also study French. P(French | Spanish) = 15/30 = 1/2.',
  },

  {
    id: 'sat-f5-v2-math-m2h-q07',
    section: 'math',
    moduleId: 'f5v2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Quadratic equations',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'The height h (in feet) of a projectile t seconds after launch is modeled by h(t) = −16t² + 80t + 6. What is the maximum height, in feet, reached by the projectile?',
    choices: [
      { label: 'A', text: '106' },
      { label: 'B', text: '100' },
      { label: 'C', text: '112' },
      { label: 'D', text: '120' },
    ],
    correctAnswer: 'A',
    explanation:
      'The maximum occurs at t = −b/(2a) = −80/(2 × −16) = −80/(−32) = 2.5 seconds. h(2.5) = −16(2.5)² + 80(2.5) + 6 = −16(6.25) + 200 + 6 = −100 + 200 + 6 = 106 feet.',
    wrongAnswerExplanations: {
      B: '100 feet results from computing h(2.5) = −16(6.25) + 80(2.5) = −100 + 200 = 100, omitting the initial height constant +6.',
      C: '112 feet may arise from computing h(2) = −16(4) + 80(2) + 6 = −64 + 160 + 6 = 102 then rounding incorrectly, or from using t = −80/(−16) = 5 (omitting the 2 in 2a): h(5) = −16(25) + 400 + 6 = 6.',
      D: '120 feet results from treating −16(2.5²) as −16(5) = −80 instead of −16(6.25) = −100, giving −80 + 200 + 6 = 126, then subtracting 6 again incorrectly.',
    },
  },

  {
    id: 'sat-f5-v2-math-m2h-q08',
    section: 'math',
    moduleId: 'f5v2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'The functions f(x) = x² − 4x and g(x) = 2x − 7 are graphed in the xy-plane. At how many points do the graphs intersect, and what is the sum of the x-coordinates of those intersection points?',
    choices: [
      { label: 'A', text: 'They intersect at 1 point; x-coordinate = 3' },
      { label: 'B', text: 'They do not intersect' },
      { label: 'C', text: 'They intersect at 2 points; sum of x-coordinates = 6' },
      { label: 'D', text: 'They intersect at 2 points; sum of x-coordinates = 4' },
    ],
    correctAnswer: 'C',
    explanation:
      'Set x² − 4x = 2x − 7 → x² − 6x + 7 = 0. Discriminant = (−6)² − 4(1)(7) = 36 − 28 = 8 > 0: two distinct real solutions. By Vieta\'s formulas, the sum of the roots = −(−6)/1 = 6. The graphs intersect at 2 points with x-coordinates summing to 6.',
    wrongAnswerExplanations: {
      A: 'One intersection would require the discriminant to equal 0. Here discriminant = 8 ≠ 0, so there are two intersections, not one.',
      B: 'No intersection would require the discriminant to be negative. Here discriminant = 8 > 0, so two intersections exist.',
      D: 'Sum = 4 would require the coefficient of x in x² − 6x + 7 = 0 to be −4. By Vieta\'s formulas the sum of roots equals −(coefficient of x)/1 = 6, not 4.',
    },
  },

  {
    id: 'sat-f5-v2-math-m2h-q09',
    section: 'math',
    moduleId: 'f5v2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Equivalent expressions',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'Which expression is equivalent to (x² − 9)/(x² − x − 6) for x ≠ 3 and x ≠ −2?',
    choices: [
      { label: 'A', text: '(x + 3)/(x + 2)' },
      { label: 'B', text: '(x − 3)/(x − 2)' },
      { label: 'C', text: '(x + 3)/(x − 2)' },
      { label: 'D', text: '(x − 3)/(x + 2)' },
    ],
    correctAnswer: 'A',
    explanation:
      'Numerator: x² − 9 = (x − 3)(x + 3). Denominator: x² − x − 6 = (x − 3)(x + 2). Cancel (x − 3): result is (x + 3)/(x + 2), valid for x ≠ 3 and x ≠ −2.',
    wrongAnswerExplanations: {
      B: '(x − 3)/(x − 2) results from incorrectly factoring the denominator as (x − 3)(x − 2); but x² − x − 6 ≠ (x − 3)(x − 2) because (x − 3)(x − 2) = x² − 5x + 6.',
      C: '(x + 3)/(x − 2) gets the numerator factor right but uses the wrong denominator factor (x − 2) instead of (x + 2).',
      D: '(x − 3)/(x + 2) cancels (x + 3) from the numerator instead of (x − 3), leaving the wrong remaining factor.',
    },
  },

  {
    id: 'sat-f5-v2-math-m2h-q10',
    section: 'math',
    moduleId: 'f5v2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Quadratic equations',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'The equation 3x² − 12x + k = 0 has exactly one real solution. What is the value of k?',
    correctAnswer: '12',
    acceptableAnswers: ['12'],
    explanation:
      'For exactly one real solution, the discriminant equals zero: b² − 4ac = (−12)² − 4(3)(k) = 144 − 12k = 0 → k = 12.',
  },

  {
    id: 'sat-f5-v2-math-m2h-q11',
    section: 'math',
    moduleId: 'f5v2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Polynomial functions',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'The polynomial p(x) = x³ − 2x² − 5x + 6 has x = 1 as a root. A student claims the other two roots are x = 3 and x = −2. Without multiplying out, which of the following correctly verifies this claim using Vieta\'s formulas?',
    choices: [
      { label: 'A', text: 'Sum of all three roots: 1 + 3 + (−2) = 2, which equals −(−2)/1 = 2 ✓; product: 1 × 3 × (−2) = −6, which equals −6/1 = −6 ✓' },
      { label: 'B', text: 'Sum of roots = 1 + 3 + 2 = 6; product = 1 × 3 × 2 = 6 ✓' },
      { label: 'C', text: 'The roots must be 1, −3, and 2 because the constant term is 6 and the coefficient of x is −5' },
      { label: 'D', text: 'p(3) = 27 − 18 − 15 + 6 = 0 ✓; p(−2) = −8 − 8 + 10 + 6 = 0 ✓; therefore the factorization is (x − 1)(x + 3)(x − 2)' },
    ],
    correctAnswer: 'A',
    explanation:
      'For p(x) = x³ − 2x² − 5x + 6, Vieta\'s formulas give: sum of roots = 2 (coefficient of x² with sign flipped = −(−2)/1 = 2) and product of roots = −6 (constant term with alternating sign = −6/1 = −6). Roots 1, 3, −2: sum = 1 + 3 − 2 = 2 ✓; product = (1)(3)(−2) = −6 ✓. The sum of products of pairs also checks: (1)(3) + (1)(−2) + (3)(−2) = 3 − 2 − 6 = −5, matching the coefficient of x ✓.',
    wrongAnswerExplanations: {
      B: 'Using all positive roots 1, 3, 2 gives sum = 6 ≠ 2 and product = 6 ≠ −6. This fails both Vieta checks; x = 2 is not a root since p(2) = 8 − 8 − 10 + 6 = −4 ≠ 0.',
      C: 'Roots 1, −3, 2 give sum = 0 ≠ 2 and product = −6. While the product matches, the sum fails, so these cannot all be roots. Vieta\'s formulas require all conditions to hold simultaneously.',
      D: 'The final factorization stated in D is (x − 1)(x + 3)(x − 2), which would have roots 1, −3, 2 — not 1, 3, −2. While the verification p(3) = 0 and p(−2) = 0 is correct, the stated factored form contradicts the verified roots, making D internally inconsistent.',
    },
  },

  {
    id: 'sat-f5-v2-math-m2h-q12',
    section: 'math',
    moduleId: 'f5v2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Exponential functions',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'A population of bacteria triples every 6 hours. The population starts at 500. A researcher wants the population to be between 10,000 and 15,000 (exclusive). Which of the following represents the number of complete 6-hour periods n after which this condition is first met?',
    choices: [
      { label: 'A', text: 'n = 3' },
      { label: 'B', text: 'n = 4' },
      { label: 'C', text: 'n = 2' },
      { label: 'D', text: 'n = 5' },
    ],
    correctAnswer: 'A',
    explanation:
      'After n periods, population = 500 · 3^n. n = 1: 500 · 3 = 1,500 (too low). n = 2: 500 · 9 = 4,500 (too low). n = 3: 500 · 27 = 13,500 (between 10,000 and 15,000 ✓). n = 4: 500 · 81 = 40,500 (too high). The condition is first met at n = 3.',
    wrongAnswerExplanations: {
      B: 'At n = 4, the population is 500 · 81 = 40,500, which exceeds 15,000. The condition is not met at n = 4.',
      C: 'At n = 2, the population is 500 · 9 = 4,500, which is below 10,000. The condition is not yet met at n = 2.',
      D: 'At n = 5, the population is 500 · 243 = 121,500, far above 15,000. This represents three periods beyond when the condition first fails the upper bound.',
    },
  },

  {
    id: 'sat-f5-v2-math-m2h-q13',
    section: 'math',
    moduleId: 'f5v2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'Let f(x) = 2x + 3 and g(x) = x² − 1. What is the value of g(f(1))?',
    correctAnswer: '24',
    acceptableAnswers: ['24'],
    explanation:
      'f(1) = 2(1) + 3 = 5. g(f(1)) = g(5) = 5² − 1 = 25 − 1 = 24.',
  },

  {
    id: 'sat-f5-v2-math-m2h-q18',
    section: 'math',
    moduleId: 'f5v2-math-module-2-hard',
    domain: 'Geometry and Trigonometry',
    skill: 'Circles',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'The equation x² + y² − 6x + 8y − 11 = 0 defines a circle in the xy-plane. What is the radius of this circle?',
    choices: [
      { label: 'A', text: '6' },
      { label: 'B', text: '7' },
      { label: 'C', text: '8' },
      { label: 'D', text: '√56' },
    ],
    correctAnswer: 'A',
    explanation:
      'Complete the square: (x² − 6x + 9) + (y² + 8y + 16) = 11 + 9 + 16 = 36. So (x − 3)² + (y + 4)² = 36. Radius = √36 = 6.',
    wrongAnswerExplanations: {
      B: 'r = 7 would require r² = 49. A student who adds 9 + 16 = 25 to the right side but forgets to include 11 gets r² = 25, giving r = 5; another path to 7 is computing √(9 + 16 + 11 + 13) with an arithmetic error.',
      C: 'r = 8 results from omitting 11 from the right side: 9 + 16 = 25 → r = 5. More likely, forgetting to add the completing-the-square constants to the right side, leaving r² = 11 + large number.',
      D: 'r = √56 results from adding 9 + 16 = 25 to 11 correctly to get 36, but then computing the square root of (36 − something) or misreading the equation.',
    },
  },

  {
    id: 'sat-f5-v2-math-m2h-q19',
    section: 'math',
    moduleId: 'f5v2-math-module-2-hard',
    domain: 'Geometry and Trigonometry',
    skill: 'Right triangles and trigonometry',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'In a right triangle, one leg has length 5 and the hypotenuse has length 13. A second triangle is similar to the first, with its shortest side equal to 15. What is the length of the hypotenuse of the second triangle?',
    choices: [
      { label: 'A', text: '25' },
      { label: 'B', text: '39' },
      { label: 'C', text: '32.5' },
      { label: 'D', text: '35' },
    ],
    correctAnswer: 'B',
    explanation:
      'First triangle: legs 5 and 12 (since 5² + 12² = 25 + 144 = 169 = 13²), hypotenuse 13. The shortest side is 5. Second triangle has shortest side = 15. Scale factor = 15/5 = 3. Hypotenuse of second triangle = 3 × 13 = 39.',
    wrongAnswerExplanations: {
      A: '25 results from multiplying the shortest side by itself (5 × 5 = 25) or from applying the scale factor to the wrong value, not to the hypotenuse of 13.',
      C: '32.5 results from using a scale factor of 2.5 by treating the middle leg (12) as the shortest side: scale = 15/12 = 1.25... or from 13 × 2.5 = 32.5, where 2.5 is obtained by dividing 15 by 6 instead of 5.',
      D: '35 results from applying the scale factor (3) to the other leg: 12 × 3 = 36, then rounding down or from adding the scale factor times a different side.',
    },
  },

  {
    id: 'sat-f5-v2-math-m2h-q20',
    section: 'math',
    moduleId: 'f5v2-math-module-2-hard',
    domain: 'Geometry and Trigonometry',
    skill: 'Area and volume',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'A silo consists of a cylinder of radius 3 and height 5 topped by a hemisphere of radius 3. What is the total volume of the silo, in terms of π?',
    choices: [
      { label: 'A', text: '45π + 9π' },
      { label: 'B', text: '45π + 18π' },
      { label: 'C', text: '45π + 36π' },
      { label: 'D', text: '27π + 18π' },
    ],
    correctAnswer: 'B',
    explanation:
      'Volume of cylinder = πr²h = π(9)(5) = 45π. Volume of hemisphere = (2/3)πr³ = (2/3)π(27) = 18π. Total = 45π + 18π = 63π.',
    wrongAnswerExplanations: {
      A: '9π for the hemisphere results from computing (1/3)πr² × h with r = 3 and h = 1 (using the hemisphere formula incorrectly), or from (2/3)π(3²) = 6π... likely from applying the full sphere formula (4/3)πr³/4 = πr³/3 = 9π, confusing hemisphere with quarter-sphere.',
      C: '36π for the hemisphere results from computing the full sphere volume (4/3)πr³ = (4/3)π(27) = 36π without halving it for the hemisphere.',
      D: '27π for the cylinder results from computing πr²h = π(9)(3) = 27π using the hemisphere radius (3) as the height instead of the cylinder\'s height (5).',
    },
  },

  {
    id: 'sat-f5-v2-math-m2h-q21',
    section: 'math',
    moduleId: 'f5v2-math-module-2-hard',
    domain: 'Geometry and Trigonometry',
    skill: 'Lines, angles, and triangles',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'Triangle PQR is similar to triangle STU, with PQ corresponding to ST and QR corresponding to TU. In triangle PQR, the perimeter is 36 and PQ = 6. In triangle STU, ST = 10. What is the perimeter of triangle STU?',
    choices: [
      { label: 'A', text: '48' },
      { label: 'B', text: '60' },
      { label: 'C', text: '54' },
      { label: 'D', text: '72' },
    ],
    correctAnswer: 'B',
    explanation:
      'Scale factor = ST/PQ = 10/6 = 5/3. Perimeters of similar figures scale by the same ratio: perimeter of STU = 36 × (5/3) = 60.',
    wrongAnswerExplanations: {
      A: '48 results from adding 4 (the difference ST − PQ = 10 − 6 = 4) to each of the three "sides" of the perimeter: 36 + 3(4) = 48. This incorrectly applies the additive difference rather than the multiplicative scale factor.',
      C: '54 results from using a scale factor of 3/2 — for example, from 9/6 = 3/2 instead of the correct 10/6 = 5/3 — giving 36 × 1.5 = 54.',
      D: '72 results from approximating the scale factor as 2 (rounding 10/6 ≈ 2) and multiplying 36 × 2 = 72.',
    },
  },

  {
    id: 'sat-f5-v2-math-m2h-q22',
    section: 'math',
    moduleId: 'f5v2-math-module-2-hard',
    domain: 'Geometry and Trigonometry',
    skill: 'Circles',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'A circle has a radius of 9. A central angle of 80° intercepts an arc. What is the length of that arc? (Express your answer in terms of π.)',
    correctAnswer: '4π',
    acceptableAnswers: ['4π', '4pi'],
    explanation:
      'Arc length = (central angle / 360°) × 2πr = (80/360) × 2π(9) = (2/9) × 18π = 36π/9 = 4π.',
  },
]
