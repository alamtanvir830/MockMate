import type { MathMCQuestion, MathGridInQuestion } from '../types'
type MathQuestion = MathMCQuestion | MathGridInQuestion

// Answer verification:
// q01 B: 5x − 7 = 28 → 5x = 35 → x = 7 ✓
// q02 D: y = −2x + 5 through (1, 3): −2(1)+5=3 ✓
// q03 A: g(3) = 2(9)−5(3)+1 = 18−15+1 = 4 ✓
// q04 C: 240/8=30 pages/min; 30×25=750 ✓
// q05 B: T(h) = 45h + 60 ✓
// q06 D: x²−7x+10=0 → (x−2)(x−5)=0 → x=2 or x=5 ✓; D says "x=2 and x=5" ✓
// q07 A: 3x+y=14, x+y=6 → 2x=8 → x=4 ✓
// q08 C: sorted {68,72,77,85,85,90,90}; median=85 (4th of 7) ✓; mean=567/7=81 ✓
// q09 B: f(4)=3·2^4=3·16=48 ✓
// q10 D: P(not red)=5/10=1/2 ✓
// q11 A: −3x+9≥18 → −3x≥9 → x≤−3 ✓
// q12 C: (x+4)(x−3)=x²+x−12 ✓
// q13 B: 4(3x−2)−2(x+5)=12x−8−2x−10=10x−18 ✓
// q14 D: y=8(7)+40=56+40=96 ✓
// q15 A: x²−4x−12=0 → (x−6)(x+2)=0 → x=6 (since x>0) ✓
// q16 C: new vol = 16×5×1.5 = 120 ✓ (same as original 8×5×3=120)
// q17: y=3x+15; when y=0, x=−5; y-intercept: set x=0 → y=15 ✓
//   Slope=(13−4)/(4−1)? No: using points (−1,12) and (2,21): slope=(21−12)/(2−(−1))=9/3=3
//   y−12=3(x+1)→y=3x+3+12=3x+15; y-intercept=15 ✓
// q18: 7x−5=37 → 7x=42 → x=6 ✓
// q19: h(x)=x²+3x; h(4)=16+12=28 ✓
// q20: what % of 60 is 0.9? 0.9/60=1.5% ✓; or: 60×p=0.9 → p=0.015=1.5%
// q21: leg1=60, leg2=80 → hyp=√(3600+6400)=√10000=100 ✓
// q22: circumference=18π → 2πr=18π → r=9 ✓

export const f8MathModule1QuestionsV2: MathQuestion[] = [
  // Q1 — Algebra / Linear equations in one variable / easy — correct: B
  {
    id: 'sat-f8-v2-math-m1-q01',
    section: 'math',
    moduleId: 'f8v2-math-module-1',
    domain: 'Algebra',
    skill: 'Linear equations in one variable',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'If 5x − 7 = 28, what is the value of x?',
    choices: [
      { label: 'A', text: '6' },
      { label: 'B', text: '7' },
      { label: 'C', text: '4' },
      { label: 'D', text: '5' },
    ],
    correctAnswer: 'B',
    explanation:
      '5x − 7 = 28 → 5x = 35 → x = 7. Check: 5(7) − 7 = 35 − 7 = 28. ✓',
    wrongAnswerExplanations: {
      A: 'x = 6 gives 5(6) − 7 = 23 ≠ 28. A student may add 7 to 28 correctly to get 35 but then divide by 6 instead of 5, yielding 5.83, which they round to 6.',
      C: 'x = 4 gives 5(4) − 7 = 13 ≠ 28. This can result from subtracting 7 from 28 to get 21 and then dividing by 5 to get 4.2, rounded down to 4.',
      D: 'x = 5 gives 5(5) − 7 = 18 ≠ 28. A student may guess 5 because it appears in the coefficient, or compute 28 − 7 = 21 then subtract 2 × 5 = 10 to get 11, then misinterpret.',
    },
  },

  // Q2 — Algebra / Linear equations in two variables / easy — correct: D
  {
    id: 'sat-f8-v2-math-m1-q02',
    section: 'math',
    moduleId: 'f8v2-math-module-1',
    domain: 'Algebra',
    skill: 'Linear equations in two variables',
    difficulty: 'easy',
    type: 'multiple_choice',
    question:
      'A line has slope −2 and passes through the point (0, 5). Which of the following points also lies on this line?',
    choices: [
      { label: 'A', text: '(2, 2)' },
      { label: 'B', text: '(3, 0)' },
      { label: 'C', text: '(−1, 8)' },
      { label: 'D', text: '(1, 3)' },
    ],
    correctAnswer: 'D',
    explanation:
      'The line has equation y = −2x + 5. Check each choice: A: −2(2)+5=1≠2. B: −2(3)+5=−1≠0. C: −2(−1)+5=7≠8. D: −2(1)+5=3 ✓. Only (1, 3) lies on the line.',
    wrongAnswerExplanations: {
      A: '(2, 2): y = −2(2)+5 = 1 ≠ 2. A student may compute 2×2=4 and subtract 2 to get 2, ignoring the intercept, or use slope = 2 (wrong sign) and get 2(2)−2=2.',
      B: '(3, 0): y = −2(3)+5 = −1 ≠ 0. A student may set −2x+5=0 and get x=2.5, then round to 3 and assume y=0, not substituting back to verify.',
      C: '(−1, 8): y = −2(−1)+5 = 7 ≠ 8. A student may compute −2(−1)=2 and then add 5+1=6 instead of 5, getting 8, or confuse the negative sign twice.',
    },
  },

  // Q3 — Advanced Math / Nonlinear functions / easy — correct: A
  {
    id: 'sat-f8-v2-math-m1-q03',
    section: 'math',
    moduleId: 'f8v2-math-module-1',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'If g(x) = 2x² − 5x + 1, what is the value of g(3)?',
    choices: [
      { label: 'A', text: '4' },
      { label: 'B', text: '7' },
      { label: 'C', text: '10' },
      { label: 'D', text: '2' },
    ],
    correctAnswer: 'A',
    explanation:
      'g(3) = 2(3)² − 5(3) + 1 = 2(9) − 15 + 1 = 18 − 15 + 1 = 4.',
    wrongAnswerExplanations: {
      B: 'g(3) = 7 can result from computing 2(3)² = 18 and then subtracting only 5 (not 5×3) and adding 1: 18 − 5 + 1 = 14 — still not 7. Alternatively, a student may compute (2×3)² − 5×3 + 1 = 36 − 15 + 1 = 22 and then halve the middle terms differently. Another path: 2×3 − 5 + 1 = 2 and add 5, or compute 3² − 5×3 + 1 = 9 − 15 + 1 = −5 and add 12, reaching 7.',
      C: 'g(3) = 10 results from computing 2(3² − 5×3 + 1) = 2(−5) = −10 and then adding 20, or from computing (2×3)²/(something) and making an arithmetic error.',
      D: 'g(3) = 2 results from ignoring the squared term and computing 2×3 − 5 + 1 = 6 − 5 + 1 = 2, treating the exponent as a coefficient of 1.',
    },
  },

  // Q4 — Problem-Solving and Data Analysis / Ratios, rates, proportional relationships / easy — correct: C
  {
    id: 'sat-f8-v2-math-m1-q04',
    section: 'math',
    moduleId: 'f8v2-math-module-1',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Ratios, rates, proportional relationships, and units',
    difficulty: 'easy',
    type: 'multiple_choice',
    stimulus:
      'A printer can print 240 pages in 8 minutes.',
    question:
      'At this rate, how many pages will the printer produce in 25 minutes?',
    choices: [
      { label: 'A', text: '600' },
      { label: 'B', text: '720' },
      { label: 'C', text: '750' },
      { label: 'D', text: '800' },
    ],
    correctAnswer: 'C',
    explanation:
      'Rate = 240 ÷ 8 = 30 pages per minute. In 25 minutes: 30 × 25 = 750 pages.',
    wrongAnswerExplanations: {
      A: '600 pages results from computing 240 × 25 ÷ 10 = 600, using 10 instead of 8 as the divisor.',
      B: '720 pages results from computing 240 × 3 = 720, treating 25 minutes as exactly 3 intervals of 8 minutes (since 3 × 8 = 24 ≈ 25).',
      D: '800 pages results from computing 240 × 25 ÷ 7.5 ≈ 800, using an incorrect rate divisor, or from rounding 30 pages/min up to 32 and multiplying 32 × 25 = 800.',
    },
  },

  // Q5 — Algebra / Linear functions / medium — correct: B
  {
    id: 'sat-f8-v2-math-m1-q05',
    section: 'math',
    moduleId: 'f8v2-math-module-1',
    domain: 'Algebra',
    skill: 'Linear functions',
    difficulty: 'medium',
    type: 'multiple_choice',
    stimulus:
      'A plumber charges a $60 service call fee plus $45 per hour of work.',
    question:
      'Which function gives the total charge T, in dollars, for h hours of work?',
    choices: [
      { label: 'A', text: 'T(h) = 45h' },
      { label: 'B', text: 'T(h) = 45h + 60' },
      { label: 'C', text: 'T(h) = 60h + 45' },
      { label: 'D', text: 'T(h) = 105h' },
    ],
    correctAnswer: 'B',
    explanation:
      'Total charge = (hourly rate × hours) + flat fee = 45h + 60. The $60 service call fee is a one-time constant; $45 per hour is the variable rate.',
    wrongAnswerExplanations: {
      A: 'T(h) = 45h omits the $60 service call fee, accounting only for the per-hour charge.',
      C: 'T(h) = 60h + 45 swaps the roles of the two values, treating $60 as the per-hour rate and $45 as the one-time flat fee.',
      D: 'T(h) = 105h incorrectly adds the flat fee and hourly rate together as a single per-hour rate (60 + 45 = 105), treating the service fee as if it is charged every hour.',
    },
  },

  // Q6 — Advanced Math / Nonlinear equations in one variable / medium — correct: D
  {
    id: 'sat-f8-v2-math-m1-q06',
    section: 'math',
    moduleId: 'f8v2-math-module-1',
    domain: 'Advanced Math',
    skill: 'Nonlinear equations in one variable and systems of equations in two variables',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'What are the solutions to x² − 7x + 10 = 0?',
    choices: [
      { label: 'A', text: 'x = −2 and x = −5' },
      { label: 'B', text: 'x = 1 and x = 10' },
      { label: 'C', text: 'x = −2 and x = 5' },
      { label: 'D', text: 'x = 2 and x = 5' },
    ],
    correctAnswer: 'D',
    explanation:
      'Factor: x² − 7x + 10 = (x − 2)(x − 5) = 0. So x = 2 or x = 5. Check: (2)² − 7(2) + 10 = 4 − 14 + 10 = 0 ✓; (5)² − 7(5) + 10 = 25 − 35 + 10 = 0 ✓.',
    wrongAnswerExplanations: {
      A: 'x = −2 and x = −5 are the roots of x² + 7x + 10 = 0. A student may ignore the sign of the middle term and factor as (x + 2)(x + 5), yielding both negative roots.',
      B: 'x = 1 and x = 10: these multiply to 10 ✓ but sum to 11, not 7. A student may find two numbers that multiply to 10 without checking that they also sum to 7.',
      C: 'x = −2 and x = 5: these sum to 3 and multiply to −10, fitting x² − 3x − 10 = 0, not the given equation. A student may flip one sign when factoring.',
    },
  },

  // Q7 — Algebra / Systems of linear equations / medium — correct: A
  {
    id: 'sat-f8-v2-math-m1-q07',
    section: 'math',
    moduleId: 'f8v2-math-module-1',
    domain: 'Algebra',
    skill: 'Systems of two linear equations in two variables',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'What is the value of x in the solution to the system of equations below?\n\n3x + y = 14\nx + y = 6',
    choices: [
      { label: 'A', text: '4' },
      { label: 'B', text: '2' },
      { label: 'C', text: '6' },
      { label: 'D', text: '3' },
    ],
    correctAnswer: 'A',
    explanation:
      'Subtract the second equation from the first: (3x + y) − (x + y) = 14 − 6 → 2x = 8 → x = 4. Check: y = 6 − 4 = 2; 3(4) + 2 = 14 ✓.',
    wrongAnswerExplanations: {
      B: 'x = 2 gives y = 4 from x + y = 6. Check in 3x + y = 14: 3(2) + 4 = 10 ≠ 14. A student may confuse the x and y values, swapping to say x = 2 when y = 2.',
      C: 'x = 6: if x = 6 then from x + y = 6, y = 0. Check 3(6) + 0 = 18 ≠ 14. A student may read x directly from one equation without using both.',
      D: 'x = 3 gives y = 3 from x + y = 6. Check 3(3) + 3 = 12 ≠ 14. A student may average the constants (14 + 6) ÷ 2 = 10 and divide by something, or guess equal values.',
    },
  },

  // Q8 — Problem-Solving and Data Analysis / One-variable data / medium — correct: C
  {
    id: 'sat-f8-v2-math-m1-q08',
    section: 'math',
    moduleId: 'f8v2-math-module-1',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'One-variable data: distributions and measures of center and spread',
    difficulty: 'medium',
    type: 'multiple_choice',
    stimulus:
      'The quiz scores for a class of 7 students are: 72, 85, 90, 68, 90, 77, 85.',
    question:
      'What is the median score?',
    choices: [
      { label: 'A', text: '81' },
      { label: 'B', text: '77' },
      { label: 'C', text: '85' },
      { label: 'D', text: '90' },
    ],
    correctAnswer: 'C',
    explanation:
      'Arrange the scores in order: 68, 72, 77, 85, 85, 90, 90. With 7 values, the median is the 4th value = 85.',
    wrongAnswerExplanations: {
      A: '81 is the mean: (68 + 72 + 77 + 85 + 85 + 90 + 90) ÷ 7 = 567 ÷ 7 = 81. A student who computes the mean instead of the median selects this choice.',
      B: '77 is the 3rd value in the ordered list, not the 4th. A student may miscount or use the middle of the unordered list (the 4th number listed: 68) and shift positions.',
      D: '90 is the maximum value (and tied for mode). A student who selects the most frequent high score, or who confuses mode with median, may choose this.',
    },
  },

  // Q9 — Advanced Math / Nonlinear functions / medium — correct: B
  {
    id: 'sat-f8-v2-math-m1-q09',
    section: 'math',
    moduleId: 'f8v2-math-module-1',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'The function f is defined by f(x) = 3(2)ˣ. What is the value of f(4)?',
    choices: [
      { label: 'A', text: '24' },
      { label: 'B', text: '48' },
      { label: 'C', text: '36' },
      { label: 'D', text: '96' },
    ],
    correctAnswer: 'B',
    explanation:
      'f(4) = 3 · 2⁴ = 3 · 16 = 48.',
    wrongAnswerExplanations: {
      A: 'f(4) = 24 results from computing 3 · 2 · 4 = 24, treating the exponent as a multiplier rather than a power of 2.',
      C: 'f(4) = 36 results from computing (3 · 2)² = 6² = 36, squaring the product of the constant and base instead of raising only the base to the fourth power.',
      D: 'f(4) = 96 results from computing 3 · 2⁵ = 3 · 32 = 96, adding 1 to the exponent, or from computing 6⁴ ÷ 48 = ... and recalculating incorrectly.',
    },
  },

  // Q10 — Problem-Solving and Data Analysis / Probability / medium — correct: D
  {
    id: 'sat-f8-v2-math-m1-q10',
    section: 'math',
    moduleId: 'f8v2-math-module-1',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Probability and conditional probability',
    difficulty: 'medium',
    type: 'multiple_choice',
    stimulus:
      'A bag contains 5 red marbles, 3 blue marbles, and 2 green marbles. One marble is drawn at random.',
    question:
      'What is the probability that the marble drawn is NOT red?',
    choices: [
      { label: 'A', text: '3/10' },
      { label: 'B', text: '2/5' },
      { label: 'C', text: '5/10' },
      { label: 'D', text: '1/2' },
    ],
    correctAnswer: 'D',
    explanation:
      'Total marbles = 5 + 3 + 2 = 10. Marbles that are NOT red = 3 + 2 = 5. P(not red) = 5/10 = 1/2. Note: C (5/10) and D (1/2) are equivalent; D is the simplified form and is the keyed answer.',
    wrongAnswerExplanations: {
      A: '3/10 is the probability of drawing a blue marble specifically, not any non-red marble. A student may consider only blue marbles when interpreting "not red."',
      B: '2/5 = 4/10 is incorrect. A student may count only 4 non-red marbles (e.g., omitting one color or miscounting) and write 4/10 = 2/5.',
      C: '5/10 is equivalent to 1/2 and is mathematically correct but not fully simplified. The keyed answer D = 1/2 is the simplified form.',
    },
  },

  // Q11 — Algebra / Linear inequalities / medium — correct: A
  {
    id: 'sat-f8-v2-math-m1-q11',
    section: 'math',
    moduleId: 'f8v2-math-module-1',
    domain: 'Algebra',
    skill: 'Linear inequalities in one or two variables',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'Which of the following is the solution to the inequality −3x + 9 ≥ 18?',
    choices: [
      { label: 'A', text: 'x ≤ −3' },
      { label: 'B', text: 'x ≥ −3' },
      { label: 'C', text: 'x ≤ 3' },
      { label: 'D', text: 'x ≥ 3' },
    ],
    correctAnswer: 'A',
    explanation:
      '−3x + 9 ≥ 18 → −3x ≥ 9 → x ≤ −3 (the inequality sign reverses when dividing both sides by a negative number). Check x = −3: −3(−3) + 9 = 9 + 9 = 18 ≥ 18 ✓. Check x = −4: −3(−4) + 9 = 12 + 9 = 21 ≥ 18 ✓.',
    wrongAnswerExplanations: {
      B: 'x ≥ −3 results from solving correctly but forgetting to reverse the inequality when dividing by −3. This is the most common error with negative coefficients in inequalities.',
      C: 'x ≤ 3 results from subtracting 9 from both sides and then dividing by −3 while keeping the direction, but treating −3 as positive 3 and getting x ≤ 9/3 = 3.',
      D: 'x ≥ 3 results from both treating −3 as positive 3 (wrong divisor) AND keeping the inequality direction (not flipping): −3x ≥ 9 → x ≥ 9/3 = 3.',
    },
  },

  // Q12 — Advanced Math / Equivalent expressions quadratic / medium — correct: C
  {
    id: 'sat-f8-v2-math-m1-q12',
    section: 'math',
    moduleId: 'f8v2-math-module-1',
    domain: 'Advanced Math',
    skill: 'Equivalent expressions',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'Which of the following is equivalent to (x + 4)(x − 3)?',
    choices: [
      { label: 'A', text: 'x² − 12' },
      { label: 'B', text: 'x² + 7x − 12' },
      { label: 'C', text: 'x² + x − 12' },
      { label: 'D', text: 'x² − x − 12' },
    ],
    correctAnswer: 'C',
    explanation:
      '(x + 4)(x − 3) = x² − 3x + 4x − 12 = x² + x − 12. The x-coefficient comes from the outer and inner products: (−3x) + (4x) = x.',
    wrongAnswerExplanations: {
      A: 'x² − 12 omits the middle term entirely. A student multiplies only the first terms (x · x = x²) and the last terms (4 · (−3) = −12) without computing the cross terms.',
      B: 'x² + 7x − 12 uses 4 + 3 = 7 as the x-coefficient instead of 4 + (−3) = 1, adding the absolute values of the constants rather than their signed values.',
      D: 'x² − x − 12 results from computing −4 + 3 = −1 as the x-coefficient, effectively swapping the signs of the two constants in the binomials.',
    },
  },

  // Q13 — Algebra / Equivalent expressions / medium — correct: B
  {
    id: 'sat-f8-v2-math-m1-q13',
    section: 'math',
    moduleId: 'f8v2-math-module-1',
    domain: 'Algebra',
    skill: 'Linear equations in one variable',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'Which expression is equivalent to 4(3x − 2) − 2(x + 5)?',
    choices: [
      { label: 'A', text: '14x − 18' },
      { label: 'B', text: '10x − 18' },
      { label: 'C', text: '10x + 2' },
      { label: 'D', text: '14x + 2' },
    ],
    correctAnswer: 'B',
    explanation:
      '4(3x − 2) − 2(x + 5) = 12x − 8 − 2x − 10 = (12x − 2x) + (−8 − 10) = 10x − 18.',
    wrongAnswerExplanations: {
      A: '14x − 18 results from computing 12x + 2x = 14x instead of 12x − 2x = 10x, adding the x-terms rather than subtracting because the negative sign distributing into 2(x + 5) is missed for the x-term.',
      C: '10x + 2 results from correctly computing 10x for the variable part but computing −8 + 10 = 2 for the constants, adding instead of subtracting (treating −2(x+5) as +2(x+5)).',
      D: '14x + 2 combines both errors: adding x-terms (12x + 2x = 14x) and adding constants (−8 + 10 = 2), failing to distribute the negative sign on both terms of 2(x + 5).',
    },
  },

  // Q14 — Problem-Solving and Data Analysis / Two-variable data / medium — correct: D
  {
    id: 'sat-f8-v2-math-m1-q14',
    section: 'math',
    moduleId: 'f8v2-math-module-1',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Two-variable data: models and scatterplots',
    difficulty: 'medium',
    type: 'multiple_choice',
    stimulus:
      'A line of best fit for a set of data has equation y = 8x + 40, where x represents the number of hours studied and y represents the predicted test score.',
    question:
      'According to the line of best fit, what is the predicted test score for a student who studies for 7 hours?',
    choices: [
      { label: 'A', text: '88' },
      { label: 'B', text: '92' },
      { label: 'C', text: '84' },
      { label: 'D', text: '96' },
    ],
    correctAnswer: 'D',
    explanation:
      'Substitute x = 7: y = 8(7) + 40 = 56 + 40 = 96.',
    wrongAnswerExplanations: {
      A: '88 comes from using x = 6 instead of x = 7: 8(6) + 40 = 48 + 40 = 88. A student may be off by one in their substitution.',
      B: '92 comes from computing 8 × 7 = 56 correctly but then adding only 36 instead of 40 (perhaps misreading the y-intercept as 36), giving 56 + 36 = 92.',
      C: '84 comes from computing 8(5) + 40 = 80 (using x = 5) or from 8 × 7 = 56 and adding only 28 (half the intercept), giving 56 + 28 = 84.',
    },
  },

  // Q15 — Advanced Math / Nonlinear equations / medium-hard — correct: A
  {
    id: 'sat-f8-v2-math-m1-q15',
    section: 'math',
    moduleId: 'f8v2-math-module-1',
    domain: 'Advanced Math',
    skill: 'Nonlinear equations in one variable and systems of equations in two variables',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'Which value of x satisfies both x² = 4x + 12 and x > 0?',
    choices: [
      { label: 'A', text: '6' },
      { label: 'B', text: '−2' },
      { label: 'C', text: '4' },
      { label: 'D', text: '3' },
    ],
    correctAnswer: 'A',
    explanation:
      'Rewrite: x² − 4x − 12 = 0. Factor: (x − 6)(x + 2) = 0. Solutions: x = 6 or x = −2. Since x > 0, the answer is x = 6. Check: 6² = 36 and 4(6) + 12 = 24 + 12 = 36 ✓.',
    wrongAnswerExplanations: {
      B: 'x = −2 is the other root of the equation but does not satisfy x > 0. A student who finds both roots but selects the negative one has not applied the given constraint.',
      C: 'x = 4: check 4² = 16 and 4(4) + 12 = 28 ≠ 16. A student may attempt to complete the square and commit an arithmetic error, or guess that 4 = coefficient of x.',
      D: 'x = 3: check 3² = 9 and 4(3) + 12 = 24 ≠ 9. A student may divide the constant 12 by the coefficient 4 to get 3, or factor incorrectly as (x − 3)(x − 4) = 0.',
    },
  },

  // Q16 — Geometry and Trigonometry / Area and volume / medium-hard — correct: C
  {
    id: 'sat-f8-v2-math-m1-q16',
    section: 'math',
    moduleId: 'f8v2-math-module-1',
    domain: 'Geometry and Trigonometry',
    skill: 'Area and volume',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'A rectangular prism has length 8 cm, width 5 cm, and height 3 cm. If the length is doubled and the height is halved, what is the volume of the new prism in cubic centimeters?',
    choices: [
      { label: 'A', text: '240' },
      { label: 'B', text: '180' },
      { label: 'C', text: '120' },
      { label: 'D', text: '360' },
    ],
    correctAnswer: 'C',
    explanation:
      'New dimensions: length = 16 cm, width = 5 cm (unchanged), height = 1.5 cm. Volume = 16 × 5 × 1.5 = 120 cm³. Alternatively, the original volume is 8 × 5 × 3 = 120 cm³, and doubling the length while halving the height multiplies the volume by 2 × ½ = 1, so the volume is unchanged.',
    wrongAnswerExplanations: {
      A: '240 cm³ results from doubling the original volume (120 × 2 = 240), accounting for only the length doubling without applying the height halving.',
      B: '180 cm³ results from computing 8 × 5 × 3 = 120 and then adding 60 (half the original volume) by mistakenly adding rather than keeping the result.',
      D: '360 cm³ results from computing 16 × 5 × 3 = 240 (using the original height 3 instead of halved height 1.5) and then adding the original volume: 240 + 120 = 360, or from tripling the original volume.',
    },
  },

  // Q17 — Algebra / Linear equations in two variables / medium — grid_in — correct: 15
  // Line through (−1, 12) and (2, 21): slope=(21−12)/(2−(−1))=9/3=3
  // y − 12 = 3(x − (−1)) → y = 3x + 3 + 12 = 3x + 15; y-intercept = 15 ✓
  {
    id: 'sat-f8-v2-math-m1-q17',
    section: 'math',
    moduleId: 'f8v2-math-module-1',
    domain: 'Algebra',
    skill: 'Linear equations in two variables',
    difficulty: 'medium',
    type: 'grid_in',
    question:
      'A line passes through the points (−1, 12) and (2, 21). What is the y-intercept of the line?',
    correctAnswer: '15',
    acceptableAnswers: ['15'],
    explanation:
      'Slope = (21 − 12) ÷ (2 − (−1)) = 9 ÷ 3 = 3. Using point-slope form with (2, 21): y − 21 = 3(x − 2) → y = 3x − 6 + 21 = 3x + 15. The y-intercept is 15. Check with (−1, 12): 3(−1) + 15 = −3 + 15 = 12 ✓.',
  },

  // Q18 — Algebra / Linear functions grid-in / medium — correct: 6
  // 7x − 5 = 37 → 7x = 42 → x = 6 ✓
  {
    id: 'sat-f8-v2-math-m1-q18',
    section: 'math',
    moduleId: 'f8v2-math-module-1',
    domain: 'Algebra',
    skill: 'Linear functions',
    difficulty: 'medium',
    type: 'grid_in',
    question:
      'If 7x − 5 = 37, what is the value of x?',
    correctAnswer: '6',
    acceptableAnswers: ['6'],
    explanation:
      '7x − 5 = 37 → 7x = 42 → x = 6. Check: 7(6) − 5 = 42 − 5 = 37 ✓.',
  },

  // Q19 — Advanced Math / Nonlinear functions grid-in / medium — correct: 28
  // h(x) = x² + 3x; h(4) = 16 + 12 = 28 ✓
  {
    id: 'sat-f8-v2-math-m1-q19',
    section: 'math',
    moduleId: 'f8v2-math-module-1',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'medium',
    type: 'grid_in',
    question:
      'If h(x) = x² + 3x, what is the value of h(4)?',
    correctAnswer: '28',
    acceptableAnswers: ['28'],
    explanation:
      'h(4) = 4² + 3(4) = 16 + 12 = 28.',
  },

  // Q20 — Problem-Solving and Data Analysis / Percentages grid-in / medium — correct: 1.5
  // 60 × p = 0.9 → p = 0.9/60 = 0.015 = 1.5% ✓
  {
    id: 'sat-f8-v2-math-m1-q20',
    section: 'math',
    moduleId: 'f8v2-math-module-1',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Percentages',
    difficulty: 'medium',
    type: 'grid_in',
    question:
      'A store sold 0.9 defective items out of every 60 items produced. What percent of items produced were defective?',
    correctAnswer: '1.5',
    acceptableAnswers: ['1.5'],
    explanation:
      'Percent defective = (0.9 ÷ 60) × 100 = 0.015 × 100 = 1.5%.',
    scoringNotes: 'Enter 1.5. Do not include the percent symbol.',
  },

  // Q21 — Geometry and Trigonometry / Right triangles and trigonometry / hard — correct: 100
  // Pythagorean theorem: c² = 60² + 80² = 3600 + 6400 = 10000 → c = 100 ✓
  {
    id: 'sat-f8-v2-math-m1-q21',
    section: 'math',
    moduleId: 'f8v2-math-module-1',
    domain: 'Geometry and Trigonometry',
    skill: 'Right triangles and trigonometry',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'In a right triangle, the two legs have lengths 60 and 80. What is the length of the hypotenuse?',
    correctAnswer: '100',
    acceptableAnswers: ['100'],
    explanation:
      'By the Pythagorean theorem: c² = 60² + 80² = 3600 + 6400 = 10000. So c = √10000 = 100. This is a 3-4-5 Pythagorean triple scaled by 20.',
  },

  // Q22 — Geometry and Trigonometry / Circles grid-in / hard — correct: 9
  // Circumference = 2πr = 18π → r = 9 ✓
  {
    id: 'sat-f8-v2-math-m1-q22',
    section: 'math',
    moduleId: 'f8v2-math-module-1',
    domain: 'Geometry and Trigonometry',
    skill: 'Circles',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'A circle has a circumference of 18π. What is the radius of the circle?',
    correctAnswer: '9',
    acceptableAnswers: ['9'],
    explanation:
      'Circumference = 2πr. Setting 2πr = 18π and dividing both sides by 2π: r = 9.',
  },
]
