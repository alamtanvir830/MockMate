import type { MathMCQuestion, MathGridInQuestion } from '../types'
type MathQuestion = MathMCQuestion | MathGridInQuestion

// Answer verification (all computed before writing):
// q01 C: 3x + 5 = 20 → 3x = 15 → x = 5 ✓
// q02 A: slope = (7−1)/(2−0) = 3, b = 1; at x=4: 3(4)+1=13 ✓
// q03 D: f(x)=2x²−3; f(−2)=2(4)−3=8−3=5 ✓
// q04 B: 180 mi ÷ 3 hr = 60 mph; 60 × 5 = 300 ✓
// q05 C: C(x)=12x+35; C(6)=72+35=107 ✓
// q06 A: x²−5x+6=0 → (x−2)(x−3)=0 → larger root = 3 ✓
// q07 D: 2x+3y=24, x+y=9 → subtract → x+2y=15; from x+y=9: y=6, x=3; x−y=−3 ✓
// q08 B: sorted {12,15,18,18,22,25,30}; median=18 (4th of 7) ✓
// q09 C: g(x)=3^x; g(3)=27 ✓
// q10 A: 5 red of 10 total → P(red)=5/10=1/2 ✓
// q11 D: 2x+5<17 → 2x<12 → x<6 ✓
// q12 B: (x+5)(x−2)=x²+3x−10 ✓
// q13 C: 5(2x−3)+4(x+1)=10x−15+4x+4=14x−11 ✓
// q14 A: pattern x→y: (1,5),(3,11),(5,17),(7,23); slope=3, b=2; at x=10: 32 ✓
// q15 D: y=x²−4 and y=2x−1 → x²−2x−3=0 → (x−3)(x+1)=0; x=3 gives y=5, x=−1 gives y=−3; larger x=3 ✓
// q16 B: rectangle 8×6=48; triangle base 12, (1/2)(12)h=48 → h=8 ✓
// q17: x+y=14, x−y=2 → 2x=16 → x=8 ✓
// q18: f(x)=3x−2; f(2)=6−2=4 ✓
// q19: h(x)=2x²−5; h(5)=2(25)−5=50−5=45 ✓
// q20: 1 out of 40 = (1/40)×100=2.5% ✓
// q21: hyp=80, sin A=4/5; opposite = 80×(4/5)=64 ✓
// q22: circumference=10π → 2πr=10π → r=5; area=π(5²)=25π; numerical coeff = 25 ✓

export const f9MathModule1QuestionsV2: MathQuestion[] = [
  // Q1 — Algebra / Linear equations in one variable / easy — correct: C
  {
    id: 'sat-f9-v2-math-m1-q01',
    section: 'math',
    moduleId: 'f9v2-math-module-1',
    domain: 'Algebra',
    skill: 'Linear equations in one variable',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'If 3x + 5 = 20, what is the value of x?',
    choices: [
      { label: 'A', text: '4' },
      { label: 'B', text: '6' },
      { label: 'C', text: '5' },
      { label: 'D', text: '8' },
    ],
    correctAnswer: 'C',
    explanation:
      '3x + 5 = 20 → 3x = 15 → x = 5. Check: 3(5) + 5 = 15 + 5 = 20. ✓',
    wrongAnswerExplanations: {
      A: 'x = 4 gives 3(4) + 5 = 17 ≠ 20. A common error is subtracting 5 from 20 to get 15 but then dividing by 3 + 1 = 4 instead of just 3.',
      B: 'x = 6 gives 3(6) + 5 = 23 ≠ 20. This may result from adding 5 to 20 to get 25 and then dividing incorrectly, or from a sign error.',
      D: 'x = 8 gives 3(8) + 5 = 29 ≠ 20. This error likely comes from skipping the subtraction step and dividing 20 + 5 = 25 by 3, rounding to 8.',
    },
  },

  // Q2 — Algebra / Linear equations in two variables / easy — correct: A
  {
    id: 'sat-f9-v2-math-m1-q02',
    section: 'math',
    moduleId: 'f9v2-math-module-1',
    domain: 'Algebra',
    skill: 'Linear equations in two variables',
    difficulty: 'easy',
    type: 'multiple_choice',
    question:
      'A line passes through the points (0, 1) and (2, 7). What is the value of y when x = 4?',
    choices: [
      { label: 'A', text: '13' },
      { label: 'B', text: '9' },
      { label: 'C', text: '15' },
      { label: 'D', text: '11' },
    ],
    correctAnswer: 'A',
    explanation:
      'Slope m = (7 − 1) / (2 − 0) = 6 / 2 = 3. The y-intercept is 1 (given by the point (0, 1)), so y = 3x + 1. At x = 4: y = 3(4) + 1 = 13. ✓',
    wrongAnswerExplanations: {
      B: 'y = 9 corresponds to x = 8/3, not x = 4. This may come from using slope = (7 − 1)/(2 − 0) = 3 correctly but then computing 3(2) + 3 = 9, adding 3 twice.',
      C: 'y = 15 results from computing slope = 4 instead of 3, giving 4(4) − 1 = 15. The slope should be 6/2 = 3, not 4.',
      D: 'y = 11 comes from using slope = (7 − 1)/(2 − 0) = 3 but forgetting to add the y-intercept: 3(4) − 1 = 11 instead of 3(4) + 1 = 13.',
    },
  },

  // Q3 — Advanced Math / Nonlinear functions / easy — correct: D
  {
    id: 'sat-f9-v2-math-m1-q03',
    section: 'math',
    moduleId: 'f9v2-math-module-1',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'If f(x) = 2x² − 3, what is the value of f(−2)?',
    choices: [
      { label: 'A', text: '−11' },
      { label: 'B', text: '1' },
      { label: 'C', text: '−5' },
      { label: 'D', text: '5' },
    ],
    correctAnswer: 'D',
    explanation:
      'f(−2) = 2(−2)² − 3 = 2(4) − 3 = 8 − 3 = 5. Note that (−2)² = 4, not −4. ✓',
    wrongAnswerExplanations: {
      A: 'f = −11 comes from computing 2(−2)² − 3 as 2(−4) − 3 = −8 − 3 = −11. The error is squaring −2 as −4 instead of +4.',
      B: 'f = 1 comes from computing 2(4) − 3 = 5 correctly but then subtracting 4 again, getting 5 − 4 = 1.',
      C: 'f = −5 results from substituting x = −2 as −2² = −4 (negative) and computing 2(−4) + 3 = −8 + 3 = −5, mixing up operations.',
    },
  },

  // Q4 — Problem-Solving and Data Analysis / Ratios, rates, and proportions / easy — correct: B
  {
    id: 'sat-f9-v2-math-m1-q04',
    section: 'math',
    moduleId: 'f9v2-math-module-1',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Ratios, rates, and proportions',
    difficulty: 'easy',
    type: 'multiple_choice',
    question:
      'A car travels 180 miles in 3 hours at a constant speed. At this rate, how many miles will the car travel in 5 hours?',
    choices: [
      { label: 'A', text: '240' },
      { label: 'B', text: '300' },
      { label: 'C', text: '270' },
      { label: 'D', text: '360' },
    ],
    correctAnswer: 'B',
    explanation:
      'Speed = 180 ÷ 3 = 60 mph. Distance in 5 hours = 60 × 5 = 300 miles. ✓',
    wrongAnswerExplanations: {
      A: '240 miles corresponds to 4 hours at 60 mph, not 5 hours. The student may have added 60 once instead of multiplying by 5.',
      C: '270 miles comes from adding 90 (half of 180) to 180, as if 5 hours is 1.5 times 3 hours. But 5/3 ≈ 1.67, so this approach is wrong.',
      D: '360 miles comes from multiplying 180 × 2, treating 5 hours as twice 3 hours. But 5 ≠ 2 × 3.',
    },
  },

  // Q5 — Algebra / Linear functions / medium — correct: C
  {
    id: 'sat-f9-v2-math-m1-q05',
    section: 'math',
    moduleId: 'f9v2-math-module-1',
    domain: 'Algebra',
    skill: 'Linear functions',
    difficulty: 'medium',
    type: 'multiple_choice',
    stimulus:
      'A plumber charges a flat service fee of $35 plus $12 per hour for labor.',
    question:
      'If a customer is billed $107, how many hours did the plumber work?',
    choices: [
      { label: 'A', text: '5' },
      { label: 'B', text: '8' },
      { label: 'C', text: '6' },
      { label: 'D', text: '7' },
    ],
    correctAnswer: 'C',
    explanation:
      'Total cost: 35 + 12h = 107 → 12h = 72 → h = 6. Check: 35 + 12(6) = 35 + 72 = 107. ✓',
    wrongAnswerExplanations: {
      A: 'h = 5 gives 35 + 12(5) = 35 + 60 = 95 ≠ 107. The student may have divided 107 − 35 = 72 by a wrong number, such as 72/15 ≈ 5.',
      B: 'h = 8 gives 35 + 12(8) = 35 + 96 = 131 ≠ 107. This comes from dividing 107 by 12 ≈ 8.9 and rounding, without first subtracting the flat fee.',
      D: 'h = 7 gives 35 + 12(7) = 35 + 84 = 119 ≠ 107. The student may have computed (107 − 35) / 10 = 7.2 ≈ 7, using the wrong rate.',
    },
  },

  // Q6 — Advanced Math / Nonlinear equations in one variable / medium — correct: A
  {
    id: 'sat-f9-v2-math-m1-q06',
    section: 'math',
    moduleId: 'f9v2-math-module-1',
    domain: 'Advanced Math',
    skill: 'Nonlinear equations in one variable',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'What is the larger of the two solutions to x² − 5x + 6 = 0?',
    choices: [
      { label: 'A', text: '3' },
      { label: 'B', text: '6' },
      { label: 'C', text: '2' },
      { label: 'D', text: '5' },
    ],
    correctAnswer: 'A',
    explanation:
      'Factor: x² − 5x + 6 = (x − 2)(x − 3) = 0, so x = 2 or x = 3. The larger solution is 3. ✓',
    wrongAnswerExplanations: {
      B: 'x = 6 is not a solution: 36 − 30 + 6 = 12 ≠ 0. This may come from confusing the constant term 6 with a root.',
      C: 'x = 2 is indeed a solution, but it is the smaller one. The question asks for the larger solution.',
      D: 'x = 5 is not a solution: 25 − 25 + 6 = 6 ≠ 0. This likely comes from misreading the coefficient −5 as a root.',
    },
  },

  // Q7 — Algebra / Systems of two linear equations in two variables / medium — correct: D
  {
    id: 'sat-f9-v2-math-m1-q07',
    section: 'math',
    moduleId: 'f9v2-math-module-1',
    domain: 'Algebra',
    skill: 'Systems of two linear equations in two variables',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'If 2x + 3y = 24 and x + y = 9, what is the value of x − y?',
    choices: [
      { label: 'A', text: '6' },
      { label: 'B', text: '0' },
      { label: 'C', text: '3' },
      { label: 'D', text: '−3' },
    ],
    correctAnswer: 'D',
    explanation:
      'Subtract the second equation from the first: (2x + 3y) − (x + y) = 24 − 9 → x + 2y = 15. From x + y = 9, subtract: y = 6. Then x = 9 − 6 = 3. So x − y = 3 − 6 = −3. Check: 2(3) + 3(6) = 6 + 18 = 24 ✓ and 3 + 6 = 9 ✓.',
    wrongAnswerExplanations: {
      A: 'x − y = 6 would require x = 9, y = 3, but then 2(9) + 3(3) = 18 + 9 = 27 ≠ 24. The roles of x and y were swapped.',
      B: 'x − y = 0 means x = y. Substituting into x + y = 9 gives x = y = 4.5, but 2(4.5) + 3(4.5) = 22.5 ≠ 24.',
      C: 'x − y = 3 means x = y + 3. Substituting into x + y = 9 gives 2y + 3 = 9, y = 3, x = 6. But 2(6) + 3(3) = 21 ≠ 24.',
    },
  },

  // Q8 — Problem-Solving and Data Analysis / One-variable data / medium — correct: B
  {
    id: 'sat-f9-v2-math-m1-q08',
    section: 'math',
    moduleId: 'f9v2-math-module-1',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'One-variable data: distributions and measures of center and spread',
    difficulty: 'medium',
    type: 'multiple_choice',
    stimulus:
      'A data set of seven quiz scores is listed below: 12, 15, 18, 18, 22, 25, 30.',
    question:
      'What is the median score? (The values are already listed in order.)',
    choices: [
      { label: 'A', text: '20' },
      { label: 'B', text: '18' },
      { label: 'C', text: '22' },
      { label: 'D', text: '17' },
    ],
    correctAnswer: 'B',
    explanation:
      'With 7 values in order, the median is the 4th value: 12, 15, 18, [18], 22, 25, 30. The median is 18. ✓',
    wrongAnswerExplanations: {
      A: '20 is the mean: (12+15+18+18+22+25+30)/7 = 140/7 = 20. The question asks for the median, not the mean.',
      C: '22 is the 5th value, one position past the middle. With 7 values, the median is at position (7+1)/2 = 4, not 5.',
      D: '17 is not in the data set. This may come from averaging the middle two values (15 + 18) / 2 = 16.5 or misidentifying which value is central.',
    },
  },

  // Q9 — Advanced Math / Nonlinear functions / medium — correct: C
  {
    id: 'sat-f9-v2-math-m1-q09',
    section: 'math',
    moduleId: 'f9v2-math-module-1',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'If g(x) = 3^x, what is the value of g(3)?',
    choices: [
      { label: 'A', text: '9' },
      { label: 'B', text: '18' },
      { label: 'C', text: '27' },
      { label: 'D', text: '6' },
    ],
    correctAnswer: 'C',
    explanation:
      'g(3) = 3^3 = 3 × 3 × 3 = 27. ✓',
    wrongAnswerExplanations: {
      A: '3^2 = 9, not 3^3. This is a common error of computing the exponent as one less than given.',
      B: '18 = 3 × 6 or 6 × 3 but is not a power of 3. The student may have computed 3 × 3 + 3^2 = 9 + 9 = 18.',
      D: '6 = 2 × 3 and is not a power of 3. The student may have confused exponentiation with multiplication: 3 × x = 3 × 3 = 9 or computed 3 + 3 = 6.',
    },
  },

  // Q10 — Problem-Solving and Data Analysis / Probability / medium — correct: A
  {
    id: 'sat-f9-v2-math-m1-q10',
    section: 'math',
    moduleId: 'f9v2-math-module-1',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Probability and conditional probability',
    difficulty: 'medium',
    type: 'multiple_choice',
    stimulus:
      'A bag contains 5 red marbles, 3 blue marbles, and 2 green marbles. One marble is chosen at random.',
    question: 'What is the probability that the marble chosen is red?',
    choices: [
      { label: 'A', text: '1/2' },
      { label: 'B', text: '1/3' },
      { label: 'C', text: '3/10' },
      { label: 'D', text: '5/8' },
    ],
    correctAnswer: 'A',
    explanation:
      'Total marbles = 5 + 3 + 2 = 10. P(red) = 5/10 = 1/2. ✓',
    wrongAnswerExplanations: {
      B: '1/3 comes from dividing by 3 colors rather than by total marbles: there are not 3 marbles per color, so 1/3 is incorrect.',
      C: '3/10 is the probability of choosing a blue marble (3 blue out of 10 total), not a red marble.',
      D: '5/8 uses only 8 as the denominator, ignoring the 2 green marbles. The total count is 10, not 8.',
    },
  },

  // Q11 — Algebra / Linear inequalities in one or two variables / medium — correct: D
  {
    id: 'sat-f9-v2-math-m1-q11',
    section: 'math',
    moduleId: 'f9v2-math-module-1',
    domain: 'Algebra',
    skill: 'Linear inequalities in one or two variables',
    difficulty: 'medium',
    type: 'multiple_choice',
    question: 'Which of the following is the solution set of 2x + 5 < 17?',
    choices: [
      { label: 'A', text: 'x > 6' },
      { label: 'B', text: 'x ≤ 6' },
      { label: 'C', text: 'x ≥ 6' },
      { label: 'D', text: 'x < 6' },
    ],
    correctAnswer: 'D',
    explanation:
      '2x + 5 < 17 → 2x < 12 → x < 6. The inequality sign stays the same because we divided by a positive number. ✓',
    wrongAnswerExplanations: {
      A: 'x > 6 reverses the inequality direction without justification. Subtracting 5 and dividing by 2 (both positive steps) should not flip the sign.',
      B: 'x ≤ 6 uses a non-strict inequality. The original inequality is strict (<), so the solution must also be strict.',
      C: 'x ≥ 6 both reverses the direction and uses a non-strict inequality, resulting from treating the original as an equation and then flipping incorrectly.',
    },
  },

  // Q12 — Advanced Math / Equivalent expressions / medium — correct: B
  {
    id: 'sat-f9-v2-math-m1-q12',
    section: 'math',
    moduleId: 'f9v2-math-module-1',
    domain: 'Advanced Math',
    skill: 'Equivalent expressions',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'Which of the following is equivalent to (x + 5)(x − 2)?',
    choices: [
      { label: 'A', text: 'x² − 3x − 10' },
      { label: 'B', text: 'x² + 3x − 10' },
      { label: 'C', text: 'x² + 7x − 10' },
      { label: 'D', text: 'x² − 10' },
    ],
    correctAnswer: 'B',
    explanation:
      'Use FOIL: (x + 5)(x − 2) = x² − 2x + 5x − 10 = x² + 3x − 10. ✓',
    wrongAnswerExplanations: {
      A: 'x² − 3x − 10 results from computing +5x − 2x as −3x instead of +3x — the student may have confused the sign of x when applying FOIL to the outer and inner terms.',
      C: 'x² + 7x − 10 comes from adding the two constants as inner/outer terms: +5 + 2 = 7 instead of −2 + 5 = 3.',
      D: 'x² − 10 omits the middle term entirely, which results from only multiplying the first and last terms and ignoring the cross terms.',
    },
  },

  // Q13 — Algebra / Equivalent expressions / medium — correct: C
  {
    id: 'sat-f9-v2-math-m1-q13',
    section: 'math',
    moduleId: 'f9v2-math-module-1',
    domain: 'Algebra',
    skill: 'Equivalent expressions',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'Which of the following is equivalent to 5(2x − 3) + 4(x + 1)?',
    choices: [
      { label: 'A', text: '14x + 8' },
      { label: 'B', text: '14x − 7' },
      { label: 'C', text: '14x − 11' },
      { label: 'D', text: '18x − 11' },
    ],
    correctAnswer: 'C',
    explanation:
      '5(2x − 3) + 4(x + 1) = 10x − 15 + 4x + 4 = 14x − 11. ✓',
    wrongAnswerExplanations: {
      A: '14x + 8 results from computing −15 + 4 = +8 instead of −11. The student added the constants with the wrong signs.',
      B: '14x − 7 may come from computing −15 + 4 = −7 after an arithmetic mistake, or from distributing 5(2x − 3) as 10x − 3 (without multiplying 5 × 3 = 15).',
      D: '18x − 11 comes from computing 5(2x) + 4(x) = 10x + 4x = 14x correctly but then also adding 5 + 4 = 9 to the coefficient instead of multiplying only x terms.',
    },
  },

  // Q14 — Problem-Solving and Data Analysis / Two-variable data / medium — correct: A
  {
    id: 'sat-f9-v2-math-m1-q14',
    section: 'math',
    moduleId: 'f9v2-math-module-1',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Two-variable data: models and scatterplots',
    difficulty: 'medium',
    type: 'multiple_choice',
    stimulus:
      'The table below shows a linear relationship between x and y.\n\n| x | y |\n|---|---|\n| 1 | 5 |\n| 3 | 11 |\n| 5 | 17 |\n| 7 | 23 |',
    question:
      'Based on the linear relationship shown in the table, what is the value of y when x = 10?',
    choices: [
      { label: 'A', text: '32' },
      { label: 'B', text: '29' },
      { label: 'C', text: '35' },
      { label: 'D', text: '30' },
    ],
    correctAnswer: 'A',
    explanation:
      'The slope is (11 − 5) / (3 − 1) = 6 / 2 = 3. Using point (1, 5): y − 5 = 3(x − 1) → y = 3x + 2. At x = 10: y = 3(10) + 2 = 32. Check: all table values satisfy y = 3x + 2. ✓',
    wrongAnswerExplanations: {
      B: 'y = 29 comes from using slope 3 but setting the y-intercept incorrectly as −1: y = 3(10) − 1 = 29. The y-intercept should be +2.',
      C: 'y = 35 may come from using slope 3 correctly but computing y = 3(10) + 5 = 35, mistakenly using the y-value from x = 1 as the y-intercept.',
      D: 'y = 30 results from computing slope as 3 but applying the pattern as adding 3 per step of 1 starting from x = 7 incorrectly: 23 + 3(2) = 29 or from rounding.',
    },
  },

  // Q15 — Advanced Math / Systems with nonlinear / medium-hard — correct: D
  {
    id: 'sat-f9-v2-math-m1-q15',
    section: 'math',
    moduleId: 'f9v2-math-module-1',
    domain: 'Advanced Math',
    skill: 'Systems of equations',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'The system of equations y = x² − 4 and y = 2x − 1 has two solutions. What is the larger x-value at a point of intersection?',
    choices: [
      { label: 'A', text: '1' },
      { label: 'B', text: '−1' },
      { label: 'C', text: '2' },
      { label: 'D', text: '3' },
    ],
    correctAnswer: 'D',
    explanation:
      'Set x² − 4 = 2x − 1 → x² − 2x − 3 = 0 → (x − 3)(x + 1) = 0 → x = 3 or x = −1. Check x = 3: y = 2(3) − 1 = 5, and y = 3² − 4 = 5. ✓ The larger x-value is 3.',
    wrongAnswerExplanations: {
      A: 'x = 1 is not a solution: 1² − 4 = −3, but 2(1) − 1 = 1, so −3 ≠ 1. This may come from solving x² − 2x − 3 = 0 incorrectly by setting x = 1 as a trial.',
      B: 'x = −1 is one of the two solutions, but it is the smaller x-value. The question asks for the larger.',
      C: 'x = 2 is not a solution: 2² − 4 = 0, but 2(2) − 1 = 3, so 0 ≠ 3. This may result from trying x = 2 after noticing the −4 constant.',
    },
  },

  // Q16 — Geometry and Trigonometry / Area and volume / medium-hard — correct: B
  {
    id: 'sat-f9-v2-math-m1-q16',
    section: 'math',
    moduleId: 'f9v2-math-module-1',
    domain: 'Geometry and Trigonometry',
    skill: 'Area and volume',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'A rectangle has a length of 8 and a width of 6. A triangle with a base of 12 has the same area as the rectangle. What is the height of the triangle?',
    choices: [
      { label: 'A', text: '6' },
      { label: 'B', text: '8' },
      { label: 'C', text: '4' },
      { label: 'D', text: '10' },
    ],
    correctAnswer: 'B',
    explanation:
      'Area of rectangle = 8 × 6 = 48. Area of triangle = (1/2) × base × height → 48 = (1/2)(12)(h) → 48 = 6h → h = 8. ✓',
    wrongAnswerExplanations: {
      A: 'h = 6 comes from setting 12h = 48 (omitting the 1/2 factor for triangle area), giving h = 4 — but 4 ≠ 6. Alternatively, the student may have used 6 directly from the rectangle width.',
      C: 'h = 4 comes from dividing the rectangle area by the base: 48 / 12 = 4, forgetting to account for the 1/2 factor in the triangle area formula.',
      D: 'h = 10 does not satisfy any consistent computation. It may come from adding the rectangle dimensions 8 + 6 = 14 and then subtracting 4, or from a misapplied formula.',
    },
  },

  // Q17 — Algebra / Linear equations in two variables / grid_in — answer: 8
  {
    id: 'sat-f9-v2-math-m1-q17',
    section: 'math',
    moduleId: 'f9v2-math-module-1',
    domain: 'Algebra',
    skill: 'Linear equations in two variables',
    difficulty: 'medium',
    type: 'grid_in',
    question:
      'If x + y = 14 and x − y = 2, what is the value of x?',
    correctAnswer: '8',
    acceptableAnswers: ['8'],
    explanation:
      'Add the two equations: (x + y) + (x − y) = 14 + 2 → 2x = 16 → x = 8. Check: if x = 8, then 8 + y = 14 → y = 6, and 8 − 6 = 2. ✓',
  },

  // Q18 — Algebra / Linear functions / grid_in — answer: 4
  {
    id: 'sat-f9-v2-math-m1-q18',
    section: 'math',
    moduleId: 'f9v2-math-module-1',
    domain: 'Algebra',
    skill: 'Linear functions',
    difficulty: 'medium',
    type: 'grid_in',
    question:
      'If f(x) = 3x − 2, what is the value of f(2)?',
    correctAnswer: '4',
    acceptableAnswers: ['4'],
    explanation:
      'f(2) = 3(2) − 2 = 6 − 2 = 4. ✓',
  },

  // Q19 — Advanced Math / Nonlinear functions / grid_in — answer: 45
  {
    id: 'sat-f9-v2-math-m1-q19',
    section: 'math',
    moduleId: 'f9v2-math-module-1',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'medium',
    type: 'grid_in',
    question:
      'If h(x) = 2x² − 5, what is the value of h(5)?',
    correctAnswer: '45',
    acceptableAnswers: ['45'],
    explanation:
      'h(5) = 2(5)² − 5 = 2(25) − 5 = 50 − 5 = 45. ✓',
  },

  // Q20 — Problem-Solving and Data Analysis / Percentages / grid_in — answer: 2.5
  {
    id: 'sat-f9-v2-math-m1-q20',
    section: 'math',
    moduleId: 'f9v2-math-module-1',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Percentages',
    difficulty: 'medium',
    type: 'grid_in',
    question:
      'A class has 40 students. If 1 student scored above 95 on an exam, what percentage of the class scored above 95?',
    correctAnswer: '2.5',
    acceptableAnswers: ['2.5'],
    explanation:
      'Percentage = (1 / 40) × 100 = 2.5%. ✓',
    scoringNotes: 'Accept 2.5 only.',
  },

  // Q21 — Geometry and Trigonometry / Right triangles and trigonometry / grid_in — answer: 64
  {
    id: 'sat-f9-v2-math-m1-q21',
    section: 'math',
    moduleId: 'f9v2-math-module-1',
    domain: 'Geometry and Trigonometry',
    skill: 'Right triangles and trigonometry',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'In a right triangle, the hypotenuse has length 80. If sin A = 4/5, what is the length of the side opposite angle A?',
    correctAnswer: '64',
    acceptableAnswers: ['64'],
    explanation:
      'sin A = opposite / hypotenuse = 4/5. So opposite = (4/5) × 80 = 64. ✓',
  },

  // Q22 — Geometry and Trigonometry / Circles / grid_in — answer: 25
  {
    id: 'sat-f9-v2-math-m1-q22',
    section: 'math',
    moduleId: 'f9v2-math-module-1',
    domain: 'Geometry and Trigonometry',
    skill: 'Circles',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'A circle has a circumference of 10π. What is the area of the circle divided by π?',
    correctAnswer: '25',
    acceptableAnswers: ['25'],
    explanation:
      'Circumference = 2πr = 10π → r = 5. Area = πr² = π(25) = 25π. Area divided by π = 25. ✓',
  },
]
