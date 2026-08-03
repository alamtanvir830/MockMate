import type { MathQuestion } from '../types'

export const f5MathModule1QuestionsV2: MathQuestion[] = [
  {
    id: 'sat-f5-v2-math-m1-q01',
    section: 'math',
    moduleId: 'f5v2-math-module-1',
    domain: 'Geometry and Trigonometry',
    skill: 'Circles',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'In the xy-plane, the points A(1, 3) and B(7, −1) are the endpoints of a diameter of a circle. Which of the following is the equation of the circle?',
    choices: [
      { label: 'A', text: '(x − 4)² + (y − 1)² = 13' },
      { label: 'B', text: '(x − 4)² + (y − 1)² = 52' },
      { label: 'C', text: '(x − 3)² + (y − 1)² = 13' },
      { label: 'D', text: '(x − 4)² + (y + 1)² = 13' },
    ],
    correctAnswer: 'A',
    explanation:
      'The center of the circle is the midpoint of the diameter: center = ((1 + 7)/2, (3 + (−1))/2) = (4, 1). The radius equals half the diameter length. Diameter length = √((7 − 1)² + (−1 − 3)²) = √(36 + 16) = √52. So r = √52 / 2, and r² = 52/4 = 13. The equation is (x − 4)² + (y − 1)² = 13.',
    wrongAnswerExplanations: {
      B: 'Choice B is the most seductive error: students correctly compute the diameter length squared (d² = 6² + 4² = 52) but forget that the radius is half the diameter, so r² = d²/4 = 52/4 = 13, not 52. This is easy to miss because √52 appears in the working and students may copy it directly as r² rather than dividing by 4.',
      C: 'Choice C has the correct radius (r² = 13) but an incorrect center. The midpoint formula gives x = (1 + 7)/2 = 8/2 = 4, not 3. Students who compute (7 − 1)/2 = 3 instead of (1 + 7)/2 = 4 are finding half the horizontal distance rather than the average x-coordinate.',
      D: 'Choice D has the correct radius and x-coordinate of the center but a sign error in the y-component. The center y-coordinate is (3 + (−1))/2 = 2/2 = 1, giving (y − 1)² in the equation. Students who write (y + 1) have confused the sign of the center, placing it at (4, −1) instead of (4, 1).',
    },
  },

  {
    id: 'sat-f5-v2-math-m1-q02',
    section: 'math',
    moduleId: 'f5v2-math-module-1',
    domain: 'Algebra',
    skill: 'Linear equations in two variables',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'Line ℓ passes through the points (−2, 5) and (4, −1). Line m is perpendicular to line ℓ and passes through the point (3, 2). What is the y-intercept of line m?',
    choices: [
      { label: 'A', text: '−1' },
      { label: 'B', text: '0' },
      { label: 'C', text: '−3' },
      { label: 'D', text: '5' },
    ],
    correctAnswer: 'A',
    explanation:
      'First find the slope of line ℓ: m_ℓ = (−1 − 5) / (4 − (−2)) = −6 / 6 = −1. The slope of a line perpendicular to ℓ is the negative reciprocal: m_m = 1. Line m has slope 1 and passes through (3, 2): using point-slope form, y − 2 = 1(x − 3) → y = x − 1. The y-intercept is −1.',
    wrongAnswerExplanations: {
      B: 'A y-intercept of 0 comes from using y = mx directly without applying the point-slope adjustment. Students who know the perpendicular slope is 1 but then write y = x instead of y − 2 = 1(x − 3) land here. Verification: y = x passes through (3, 3), not (3, 2).',
      C: 'A y-intercept of −3 is a very tempting error: students who correctly write y = x + b and substitute (3, 2) to get 2 = 3 + b might solve b = 2 − 3 = −1, which gives the right answer, but those who compute b = −3 likely subtracted 3 on the wrong side, getting b = −(2 + 1) = −3.',
      D: 'A y-intercept of 5 is also plausible: students who confuse slope with the original line ℓ (slope −1) may think the perpendicular slope is also −1 and solve y = −x + b using (3, 2): 2 = −3 + b → b = 5. That line has the right intercept structure but uses the wrong slope — the perpendicular to slope −1 has slope +1, not −1.',
    },
  },

  {
    id: 'sat-f5-v2-math-m1-q03',
    section: 'math',
    moduleId: 'f5v2-math-module-1',
    domain: 'Algebra',
    skill: 'Linear functions',
    difficulty: 'easy',
    type: 'multiple_choice',
    stimulus:
      'A dog walker charges a flat fee of $10 per visit plus $5 for each additional dog walked. The total charge T, in dollars, for walking d dogs in a single visit is given by T(d) = 5d + 10.',
    question:
      'What is the total charge for walking 4 dogs in a single visit?',
    choices: [
      { label: 'A', text: '$20' },
      { label: 'B', text: '$25' },
      { label: 'C', text: '$30' },
      { label: 'D', text: '$40' },
    ],
    correctAnswer: 'C',
    explanation:
      'Substitute d = 4 into the function: T(4) = 5(4) + 10 = 20 + 10 = 30. The total charge is $30.',
    wrongAnswerExplanations: {
      A: 'Choice A is incorrect. $20 equals 5(4) without adding the flat fee of $10.',
      B: 'Choice B is incorrect. $25 results from computing 5(3) + 10, using d = 3 instead of d = 4.',
      D: 'Choice D is incorrect. $40 results from computing 5(4) + 20, using an incorrect flat fee of $20.',
    },
  },

  {
    id: 'sat-f5-v2-math-m1-q04',
    section: 'math',
    moduleId: 'f5v2-math-module-1',
    domain: 'Algebra',
    skill: 'Systems of two linear equations in two variables',
    difficulty: 'easy',
    type: 'multiple_choice',
    question:
      'What is the value of y in the system of equations below?\n\nx + y = 9\nx = 3',
    choices: [
      { label: 'A', text: '3' },
      { label: 'B', text: '6' },
      { label: 'C', text: '9' },
      { label: 'D', text: '12' },
    ],
    correctAnswer: 'B',
    explanation:
      'Substitute x = 3 into the first equation: 3 + y = 9. Subtract 3 from both sides: y = 6.',
    wrongAnswerExplanations: {
      A: 'Choice A is incorrect. 3 is the value of x, not y.',
      C: 'Choice C is incorrect. 9 is the sum x + y, not the value of y alone.',
      D: 'Choice D is incorrect. 12 results from adding x to the sum instead of subtracting.',
    },
  },

  {
    id: 'sat-f5-v2-math-m1-q05',
    section: 'math',
    moduleId: 'f5v2-math-module-1',
    domain: 'Algebra',
    skill: 'Systems of two linear equations in two variables',
    difficulty: 'medium',
    type: 'grid_in',
    question:
      'In the system of equations below, what is the value of y?\n\n3x + 2y = 20\nx = 4',
    correctAnswer: '4',
    acceptableAnswers: ['4'],
    explanation:
      'Substitute x = 4 into the first equation: 3(4) + 2y = 20 → 12 + 2y = 20 → 2y = 8 → y = 4.',
  },

  {
    id: 'sat-f5-v2-math-m1-q06',
    section: 'math',
    moduleId: 'f5v2-math-module-1',
    domain: 'Algebra',
    skill: 'Linear inequalities in one or two variables',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'Which of the following is the solution set of 3x − 7 > 8?',
    choices: [
      { label: 'A', text: 'x < 5' },
      { label: 'B', text: 'x > 3' },
      { label: 'C', text: 'x > 5' },
      { label: 'D', text: 'x < −5' },
    ],
    correctAnswer: 'C',
    explanation:
      '3x − 7 > 8 → 3x > 15 → x > 5.',
    wrongAnswerExplanations: {
      A: 'Choice A flips the inequality sign without cause. A sign flip is only required when multiplying or dividing both sides by a negative number; here we divide by +3, so the direction is preserved. This is the most tempting wrong answer for students who mechanically flip the inequality every time they see a "≠" step in their work.',
      B: 'Choice B has the correct direction but the wrong value. Students who add 7 to get 3x > 15 and then divide by 5 instead of 3 arrive at x > 3. This substitution error (treating the coefficient 3 as if it were 5) is particularly easy to make when the problem has already used the number 7.',
      D: 'Choice D has both the wrong sign and wrong value. A negative result would require subtracting rather than adding 7. Students who misread the original as 3x − 7 < 8 and subtract 7 from both sides (getting 3x < 1) and then divide by a perceived negative coefficient might generate this, but it combines multiple errors simultaneously.',
    },
  },

  {
    id: 'sat-f5-v2-math-m1-q08',
    section: 'math',
    moduleId: 'f5v2-math-module-1',
    domain: 'Algebra',
    skill: 'Linear functions',
    difficulty: 'medium',
    type: 'grid_in',
    stimulus:
      'A plumber charges a fixed call-out fee plus an hourly rate. After 2 hours of work, the total charge is $130. After 5 hours of work, the total charge is $250.',
    question:
      'What is the plumber\'s fixed call-out fee, in dollars?',
    correctAnswer: '50',
    acceptableAnswers: ['50'],
    explanation:
      'Let f be the fixed fee and r be the hourly rate. From the two data points: f + 2r = 130 and f + 5r = 250. Subtracting the first from the second: 3r = 120 → r = 40. Substituting back: f + 2(40) = 130 → f + 80 = 130 → f = 50.',
  },

  {
    id: 'sat-f5-v2-math-m1-q16',
    section: 'math',
    moduleId: 'f5v2-math-module-1',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Ratios, rates, and proportional relationships',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'A factory produces 360 units in 8 hours. At this same rate, how many units will the factory produce in 15 hours?',
    choices: [
      { label: 'A', text: '540' },
      { label: 'B', text: '630' },
      { label: 'C', text: '675' },
      { label: 'D', text: '720' },
    ],
    correctAnswer: 'C',
    explanation:
      'Unit rate = 360 / 8 = 45 units per hour. In 15 hours: 45 × 15 = 675 units.',
    wrongAnswerExplanations: {
      A: '540 / 15 = 36 units per hour, which is not the rate of 45 units per hour.',
      B: '630 / 15 = 42, which is not 45.',
      D: '720 / 15 = 48, which is not 45. This would be the output in 16 hours.',
    },
  },

  {
    id: 'sat-f5-v2-math-m1-q17',
    section: 'math',
    moduleId: 'f5v2-math-module-1',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Percentages',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'A jacket originally costs $80. It is first discounted by 20%, then the discounted price is increased by 10%. What is the final price of the jacket?',
    choices: [
      { label: 'A', text: '$70.40' },
      { label: 'B', text: '$72.00' },
      { label: 'C', text: '$74.40' },
      { label: 'D', text: '$78.00' },
    ],
    correctAnswer: 'A',
    explanation:
      'After a 20% discount: $80 × 0.80 = $64. After a 10% increase on $64: $64 × 1.10 = $70.40.',
    wrongAnswerExplanations: {
      B: 'Choice B ($72) is the most tempting wrong answer. Students who reason "20% off then 10% back on = net 10% off" compute $80 × 0.90 = $72. This seems logically sound but is wrong because the 10% increase applies to the already-discounted price ($64), not the original price. The percentage operations must be applied sequentially: $80 × 0.80 × 1.10 = $70.40, not $80 × 0.90.',
      C: 'Choice C ($74.40) results from computing the 10% increase on the original $80 rather than on the discounted price: $80 − 16 + $8 = $72... or from some students computing $80 × 0.80 = $64 correctly but then adding 10% of the original $80 ($8) instead of 10% of $64 ($6.40). Either path yields $64 + $8 = $72, not $74.40. Actually $74.40 arises from $64 + 10.40, which would be 10% of $104, suggesting a compounding confusion.',
      D: 'Choice D ($78) results from applying only the 10% increase without the 20% discount, or from computing a single net 2.5% discount: $80 × 0.975. This error suggests the student applied neither operation correctly — the answer is a hint that both sequential steps must be executed.',
    },
  },

  {
    id: 'sat-f5-v2-math-m1-q18',
    section: 'math',
    moduleId: 'f5v2-math-module-1',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Data distributions and statistics',
    difficulty: 'hard',
    type: 'multiple_choice',
    stimulus:
      'A data set of seven values is listed in increasing order: 14, 19, k, 27, 31, 38, 45, where k is an integer with 19 ≤ k ≤ 27.',
    question:
      'A value of k is chosen so that when k is replaced by k + 8, the median increases but the mean does not change. Which of the following could be the value of k?',
    choices: [
      { label: 'A', text: '19' },
      { label: 'B', text: '23' },
      { label: 'C', text: '26' },
      { label: 'D', text: 'No such value of k exists.' },
    ],
    correctAnswer: 'D',
    explanation:
      'The mean of the seven values is (14 + 19 + k + 27 + 31 + 38 + 45) / 7 = (174 + k) / 7. If k is replaced by k + 8, the new mean is (174 + k + 8) / 7 = (182 + k) / 7. For the mean to remain unchanged, we need (182 + k) / 7 = (174 + k) / 7, which requires 182 + k = 174 + k → 182 = 174, a contradiction. So adding 8 to k always increases the mean by 8/7. There is no integer value of k in [19, 27] for which replacing k with k + 8 leaves the mean unchanged. The answer is D.',
    wrongAnswerExplanations: {
      A: 'Choice A (k = 19) is the easiest-looking option and tempts students who think the smallest k minimizes the effect of adding 8. But no matter which value of k is chosen, replacing k with k + 8 always adds exactly 8 to the sum and therefore always raises the mean by 8/7 ≈ 1.14. There is nothing special about k = 19 that would cancel this effect.',
      B: 'Choice B (k = 23) is tempting because 23 is the median of the range [19, 27], and students might expect some symmetry property to hold at the midpoint. But replacing 23 with 31 both increases the median (the 4th value becomes larger) and increases the mean by 8/7. No value of k can satisfy "median increases but mean stays the same" because raising any single data point always raises the mean.',
      C: 'Choice C (k = 26) is the most tempting because at k = 26, the current median is 27 (the 4th value). Replacing 26 with 34 would make 34 the new 4th value, increasing the median from 27 to 31 — the median does increase. However, the mean also increases from (174 + 26)/7 ≈ 28.57 to (174 + 34)/7 ≈ 29.71. Students seduced by the median condition alone may ignore the mean condition entirely.',
    },
  },

  {
    id: 'sat-f5-v2-math-m1-q19',
    section: 'math',
    moduleId: 'f5v2-math-module-1',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Probability',
    difficulty: 'medium',
    type: 'grid_in',
    stimulus:
      'A bag contains 5 red marbles, 3 blue marbles, and 2 green marbles, for a total of 10 marbles. One marble is drawn at random.',
    question:
      'What is the probability that the marble drawn is blue? Enter your answer as a fraction or decimal.',
    correctAnswer: '3/10',
    acceptableAnswers: ['3/10', '.3', '0.3'],
    explanation:
      'There are 3 blue marbles out of 10 total. Probability = 3/10 = 0.3.',
  },

  {
    id: 'sat-f5-v2-math-m1-q09',
    section: 'math',
    moduleId: 'f5v2-math-module-1',
    domain: 'Advanced Math',
    skill: 'Quadratic equations',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'What are the solutions to x² − 7x + 12 = 0?',
    choices: [
      { label: 'A', text: 'x = 2 and x = 6' },
      { label: 'B', text: 'x = 3 and x = 4' },
      { label: 'C', text: 'x = −3 and x = −4' },
      { label: 'D', text: 'x = 1 and x = 12' },
    ],
    correctAnswer: 'B',
    explanation:
      'Factor: x² − 7x + 12 = (x − 3)(x − 4) = 0. So x = 3 or x = 4. Check: 3 + 4 = 7 ✓ and 3 × 4 = 12 ✓.',
    wrongAnswerExplanations: {
      A: 'Choice A (x = 2 and x = 6) is the most tempting wrong answer because the product 2 × 6 = 12 matches the constant term. Students who focus only on "what two numbers multiply to 12?" without also checking "what two numbers add to −7?" select this pair. The correct pair must satisfy both: r + s = 7 and r × s = 12, giving 3 and 4, not 2 and 6.',
      C: 'Choice C gives the right magnitudes (3 and 4) but the wrong signs. The equation x² − 7x + 12 has a negative middle term and positive constant, which requires both factors to be negative: (x − 3)(x − 4) = 0. Choosing (x + 3)(x + 4) = 0 would arise from x² + 7x + 12 = 0, where both signs are positive.',
      D: 'Choice D (x = 1 and x = 12) comes from noticing that 1 × 12 = 12 and assuming any pair that multiplies to 12 is valid. But 1 + 12 = 13 ≠ 7, so this pair fails the sum condition. Students who find factors of 12 by listing (1, 12), (2, 6), (3, 4) and stop at the first pair without checking the sum make this error.',
    },
  },

  {
    id: 'sat-f5-v2-math-m1-q10',
    section: 'math',
    moduleId: 'f5v2-math-module-1',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'hard',
    type: 'multiple_choice',
    stimulus:
      'A radioactive substance decays so that the amount remaining is halved every 6 years. A sample initially contains 960 grams.',
    question:
      'Which inequality can be used to find the number of complete 6-year periods, n, after which the remaining amount first falls below 20 grams?',
    choices: [
      { label: 'A', text: '960 · (1/2)^n < 20' },
      { label: 'B', text: '960 · (1/2)^n > 20' },
      { label: 'C', text: '960 · 2^n < 20' },
      { label: 'D', text: '960 − 6n < 20' },
    ],
    correctAnswer: 'A',
    explanation:
      'After each 6-year period, the amount is multiplied by 1/2. After n periods the amount is 960 · (1/2)^n. For this to fall below 20 grams, we need 960 · (1/2)^n < 20. Solving: (1/2)^n < 20/960 = 1/48, so 2^n > 48. Since 2⁵ = 32 < 48 and 2⁶ = 64 > 48, the smallest integer n is 6, meaning it first falls below 20 grams after 6 complete 6-year periods (i.e., after 36 years).',
    wrongAnswerExplanations: {
      B: 'Choice B reverses the inequality direction. 960 · (1/2)^n > 20 identifies all periods when the amount is still above 20 grams — the opposite of what the question asks. Students who confuse "falls below 20" with "exceeds 20" select this. A useful check: at n = 0, 960 · 1 = 960 > 20 is true, but the amount has not fallen below 20 at period 0.',
      C: 'Choice C uses 2^n (a growing exponential) instead of (1/2)^n (a decaying exponential). Both involve powers of 2, making this a very tempting error for students who remember "half-life involves 2" but write it as multiplication rather than division. 960 · 2^n would model doubling every 6 years — exactly the opposite of decay.',
      D: 'Choice D uses a linear model (960 − 6n) that subtracts a constant 6 each period. While this might seem to reflect "halved every 6 years" (years ÷ 6), it confuses the period number n with the actual time elapsed in years, and linear subtraction cannot model exponential decay. This model also eventually goes negative, which is physically impossible for a mass.',
    },
  },

  {
    id: 'sat-f5-v2-math-m1-q11',
    section: 'math',
    moduleId: 'f5v2-math-module-1',
    domain: 'Advanced Math',
    skill: 'Equivalent expressions',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'Which of the following is equivalent to (x − 3)(x + 5) + 2x?',
    choices: [
      { label: 'A', text: 'x² + 4x − 15' },
      { label: 'B', text: 'x² − 4x − 15' },
      { label: 'C', text: 'x² + 4x + 15' },
      { label: 'D', text: 'x² − 2x − 15' },
    ],
    correctAnswer: 'A',
    explanation:
      'Expand (x − 3)(x + 5) = x² + 5x − 3x − 15 = x² + 2x − 15. Then add 2x: x² + 2x − 15 + 2x = x² + 4x − 15.',
    wrongAnswerExplanations: {
      B: 'x² − 4x − 15 would require subtracting 2x rather than adding it.',
      C: 'The constant term −15 comes from (−3)(5) = −15, not +15.',
      D: 'x² − 2x − 15 does not include the additional +2x from the outside term.',
    },
  },

  {
    id: 'sat-f5-v2-math-m1-q13',
    section: 'math',
    moduleId: 'f5v2-math-module-1',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'medium',
    type: 'grid_in',
    question:
      'What is the x-coordinate of the vertex of the parabola defined by f(x) = 2x² − 12x + 7?',
    correctAnswer: '3',
    acceptableAnswers: ['3'],
    explanation:
      'The x-coordinate of the vertex is given by x = −b/(2a). Here a = 2, b = −12. So x = −(−12)/(2·2) = 12/4 = 3.',
  },

  {
    id: 'sat-f5-v2-math-m1-q14',
    section: 'math',
    moduleId: 'f5v2-math-module-1',
    domain: 'Advanced Math',
    skill: 'Exponential functions',
    difficulty: 'medium',
    type: 'multiple_choice',
    stimulus:
      'A savings account has an initial balance of $1,000 and grows at an annual interest rate of 5%, compounded annually.',
    question:
      'Which expression represents the account balance, in dollars, after t years?',
    choices: [
      { label: 'A', text: '1000 + 0.05t' },
      { label: 'B', text: '1000(1.05)^t' },
      { label: 'C', text: '1000(0.05)^t' },
      { label: 'D', text: '1000(1.5)^t' },
    ],
    correctAnswer: 'B',
    explanation:
      'Compounded annual growth at rate r means the balance multiplies by (1 + r) each year. Starting at $1,000 with r = 0.05, the balance after t years is 1000(1 + 0.05)^t = 1000(1.05)^t.',
    wrongAnswerExplanations: {
      A: 'This is linear growth, adding a fixed amount each year, not compound interest.',
      C: '0.05 is the rate, not the growth factor. The growth factor is 1 + 0.05 = 1.05.',
      D: '1.5 would represent a 50% annual rate, not 5%.',
    },
  },

  {
    id: 'sat-f5-v2-math-m1-q20',
    section: 'math',
    moduleId: 'f5v2-math-module-1',
    domain: 'Geometry and Trigonometry',
    skill: 'Lines, angles, and triangles',
    difficulty: 'medium',
    type: 'multiple_choice',
    stimulus:
      'Two parallel lines are cut by a transversal. One of the interior angles formed on the same side of the transversal measures 65°.',
    question:
      'What is the measure of the co-interior angle (same-side interior angle) on the other parallel line, in degrees?',
    choices: [
      { label: 'A', text: '25°' },
      { label: 'B', text: '65°' },
      { label: 'C', text: '115°' },
      { label: 'D', text: '130°' },
    ],
    correctAnswer: 'C',
    explanation:
      'Co-interior angles (also called same-side interior or consecutive interior angles) are supplementary when lines are parallel. So the other angle = 180° − 65° = 115°.',
    wrongAnswerExplanations: {
      A: '25° = 90° − 65°, which applies to complementary angles, not co-interior angles.',
      B: '65° would be the alternate interior angle, which is equal, not the co-interior angle.',
      D: '130° = 2 × 65°, which has no geometric basis here.',
    },
  },

  {
    id: 'sat-f5-v2-math-m1-q21',
    section: 'math',
    moduleId: 'f5v2-math-module-1',
    domain: 'Geometry and Trigonometry',
    skill: 'Right triangles and trigonometry',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'In a right triangle, the two legs have lengths 9 and 12. What is the length of the hypotenuse?',
    choices: [
      { label: 'A', text: '13' },
      { label: 'B', text: '15' },
      { label: 'C', text: '17' },
      { label: 'D', text: '21' },
    ],
    correctAnswer: 'B',
    explanation:
      'By the Pythagorean theorem: c² = 9² + 12² = 81 + 144 = 225. So c = √225 = 15.',
    wrongAnswerExplanations: {
      A: '13² = 169 ≠ 225. A 9-12-13 triangle is not a right triangle.',
      C: '17² = 289 ≠ 225.',
      D: '21² = 441 ≠ 225. This is too large.',
    },
  },

  {
    id: 'sat-f5-v2-math-m1-q07',
    section: 'math',
    moduleId: 'f5v2-math-module-1',
    domain: 'Algebra',
    skill: 'Linear equations in one variable',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'If (x/3) − (2x/5) = k, where k is a constant, and x = 15, what is the value of k?',
    choices: [
      { label: 'A', text: '−3' },
      { label: 'B', text: '−1' },
      { label: 'C', text: '1' },
      { label: 'D', text: '3' },
    ],
    correctAnswer: 'B',
    explanation:
      'Substitute x = 15: (15/3) − (2·15/5) = 5 − 6 = −1. So k = −1.',
    wrongAnswerExplanations: {
      A: 'Choice A results from computing 15/5 = 3 for the first term instead of 15/3 = 5, and then subtracting the second term: 3 − 6 = −3. This swapping of the denominators (dividing by 5 in the first fraction and by 3 in the second) is a tempting error when fractions appear close together.',
      C: 'Choice C results from computing both terms correctly (5 and 6) but ignoring the subtraction direction, writing 6 − 5 = 1 instead of 5 − 6 = −1. Students who add the absolute values or reverse the order because they expect a positive answer land here.',
      D: 'Choice D comes from substituting x = 15 but computing the first fraction as 15/(3 − 2) = 15/1 = 15 (subtracting the numerator coefficients) and the second as 15/5 = 3, then computing 15/5 = 3. The correct approach evaluates each fraction independently before subtracting.',
    },
  },

  {
    id: 'sat-f5-v2-math-m1-q12',
    section: 'math',
    moduleId: 'f5v2-math-module-1',
    domain: 'Advanced Math',
    skill: 'Quadratic equations',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'For what values of k does the equation x² − 6x + k = 0 have two distinct real solutions?',
    choices: [
      { label: 'A', text: 'k < 9' },
      { label: 'B', text: 'k > 9' },
      { label: 'C', text: 'k = 9' },
      { label: 'D', text: 'k < −9' },
    ],
    correctAnswer: 'A',
    explanation:
      'For two distinct real solutions, the discriminant must be positive: b² − 4ac > 0. Here a = 1, b = −6, c = k. So (−6)² − 4(1)(k) > 0 → 36 − 4k > 0 → 4k < 36 → k < 9.',
    wrongAnswerExplanations: {
      B: 'Choice B is the most common error: students who set up 36 − 4k > 0 correctly and then divide by −4 forget to flip the inequality sign, writing k > 9 instead of k < 9. Dividing by −4 requires reversing the direction: 36 > 4k → k < 9.',
      C: 'Choice C (k = 9) is what you need for exactly one repeated root (the "tangent" case), because the discriminant = 36 − 4(9) = 0. Students who confuse "two distinct real solutions" with "has real solutions at all" may choose this. The condition discriminant > 0 is needed for two distinct roots, not discriminant ≥ 0.',
      D: 'Choice D (k < −9) is too restrictive. Any value of k less than 9 — including k = 0, k = −1, or k = 8 — gives a positive discriminant and therefore two distinct solutions. Students who confuse the boundary condition or who miscompute the discriminant boundary as 4k < −36 (rather than 4k < 36) arrive at k < −9.',
    },
  },

  {
    id: 'sat-f5-v2-math-m1-q15',
    section: 'math',
    moduleId: 'f5v2-math-module-1',
    domain: 'Advanced Math',
    skill: 'Equivalent expressions',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'Which of the following is equivalent to (x² − 9) / (x² − x − 6), for x ≠ 3 and x ≠ −2?',
    choices: [
      { label: 'A', text: '(x − 3) / (x − 3)' },
      { label: 'B', text: '(x + 3) / (x + 2)' },
      { label: 'C', text: '(x − 3) / (x + 2)' },
      { label: 'D', text: '(x + 3) / (x − 3)' },
    ],
    correctAnswer: 'B',
    explanation:
      'Factor the numerator: x² − 9 = (x + 3)(x − 3). Factor the denominator: x² − x − 6 = (x − 3)(x + 2). Cancel the common factor (x − 3): (x + 3)(x − 3) / [(x − 3)(x + 2)] = (x + 3) / (x + 2).',
    wrongAnswerExplanations: {
      A: 'Choice A results from incorrectly factoring x² − 9 as (x − 3)(x − 3) and x² − x − 6 as (x − 3)(x − 3) as well, then canceling everything. In reality x² − 9 is a difference of squares: (x + 3)(x − 3). Students who forget the difference-of-squares pattern and write (x − 3)² in the numerator make this error, producing 1 as the "simplified" result.',
      C: 'Choice C keeps the correct denominator (x + 2) but has the wrong numerator (x − 3) rather than (x + 3). This results from incorrectly factoring x² − 9 as (x − 3)² instead of (x + 3)(x − 3), then canceling one (x − 3) and being left with the other.',
      D: 'Choice D has the correct numerator (x + 3) but the wrong denominator (x − 3) instead of (x + 2). This results from incorrectly factoring x² − x − 6 as (x − 3)(x + 3) instead of (x − 3)(x + 2), perhaps by mistakenly using +3 instead of +2 as the second factor. Students who check: does (x − 3)(x + 3) = x² − 9? Yes — but that is the numerator, not the denominator.',
    },
  },

  {
    id: 'sat-f5-v2-math-m1-q22',
    section: 'math',
    moduleId: 'f5v2-math-module-1',
    domain: 'Geometry and Trigonometry',
    skill: 'Area and volume',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'A cylinder has a radius of r and a height equal to twice its radius. A cone has the same radius r and the same height as the cylinder. What fraction of the cylinder\'s volume is the cone\'s volume?',
    choices: [
      { label: 'A', text: '1/6' },
      { label: 'B', text: '1/4' },
      { label: 'C', text: '1/3' },
      { label: 'D', text: '2/3' },
    ],
    correctAnswer: 'C',
    explanation:
      'Height of both shapes: h = 2r. Volume of cylinder: V_cyl = πr²h = πr²(2r) = 2πr³. Volume of cone: V_cone = (1/3)πr²h = (1/3)πr²(2r) = (2/3)πr³. Fraction = V_cone / V_cyl = (2πr³/3) / (2πr³) = 1/3.',
    wrongAnswerExplanations: {
      A: 'Choice A (1/6) results from correctly computing V_cone = (2/3)πr³ and V_cyl = 2πr³, but then computing 1/3 ÷ 2 = 1/6 — treating 1/3 as if it were the cone-to-cylinder ratio before accounting for the shared h = 2r. In reality the 1/3 factor in the cone formula cancels with the same h in the cylinder, and the final ratio is 1/3 regardless of the value of h. The error is thinking the h = 2r makes the cone extra small relative to a "standard" cylinder.',
      B: 'Choice B (1/4) has no clean derivation but tempts students who vaguely recall "one-quarter" as the answer to some volume comparison. A common path: V_cone / V_cyl = [(1/3)πr²h] / [πr²h] = 1/3, so a student who misremembers the cone formula as (1/4)πr²h generates exactly this fraction.',
      D: 'Choice D (2/3) is the most seductive wrong answer because it is a real and important ratio — but it applies to a sphere inscribed in a cylinder, not a cone. A hemisphere has volume (2/3)πr³ and its circumscribed cylinder has volume πr³, giving ratio 2/3. Students who confuse the cone-cylinder comparison with the sphere-cylinder comparison select this. The cone-to-cylinder ratio is always 1/3, by definition of the cone volume formula.',
    },
  },
]
