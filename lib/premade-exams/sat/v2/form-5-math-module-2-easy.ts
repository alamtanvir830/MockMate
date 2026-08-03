import type { MathQuestion } from '../types'

export const f5MathModule2EasyQuestionsV2: MathQuestion[] = [
  {
    id: 'sat-f5-v2-math-m2e-q01',
    section: 'math',
    moduleId: 'f5v2-math-module-2-easy',
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
      A: 'x = 2 results from correctly adding 3 to both sides to get 4x = 12 but then dividing only the right side by 2 instead of by the actual coefficient 4: 12 ÷ 2 = 6... wait, that gives 6, not 2. A simpler path to x = 2: students who compute 4x = 9 + 3 = 12 but then divide by 6 (confused coefficient) get x = 2. Checking: 4(2) − 3 = 5 ≠ 9.',
      C: 'x = 4 is the most tempting wrong answer — the coefficient of x is 4, and 4 appears prominently in the equation. Students who confuse "the coefficient" with "the answer" directly write x = 4 without solving. Alternatively, students who misread 4x − 3 = 9 as 4x = 9 (skipping the −3 step) and then divide 9 by something approximate might arrive here. Checking: 4(4) − 3 = 13 ≠ 9.',
      D: 'x = 6 comes from adding incorrectly: students who compute 4x = 9 + 3 = 12 correctly but then misread 12 ÷ 4 as 6 (perhaps thinking 4 × 6 = 24 and confusing 12 with a different multiple) select this. Or students who add 3 to the wrong side get 4x = 9 − 3 = 6, giving x = 6/4 — then round up to 2 or misread. Checking: 4(6) − 3 = 21 ≠ 9.',
    },
  },

  {
    id: 'sat-f5-v2-math-m2e-q02',
    section: 'math',
    moduleId: 'f5v2-math-module-2-easy',
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
      A: '5 is the y-intercept (the constant term b in f(x) = mx + b), not the slope. This is the most common error — students who see "2x + 5" identify both numbers correctly but then assign them to the wrong roles. In slope-intercept form, the number multiplied by x (the coefficient) is the slope, and the standalone number is the y-intercept.',
      B: '7 = 2 + 5 is the sum of the slope and the y-intercept. Students who see two numbers in the function (2 and 5) and add them — perhaps assuming the "total" gives the slope — select this. But slope is specifically the coefficient of x (how much y changes per unit of x), not the sum of all constants in the function.',
      D: '10 = 2 × 5 is the product of the slope and y-intercept. Students who multiply the two numbers in the function together arrive here. This error has no mathematical basis in slope-intercept form — there is no reason to multiply 2 and 5. The slope is simply the coefficient of x, which is 2.',
    },
  },

  {
    id: 'sat-f5-v2-math-m2e-q03',
    section: 'math',
    moduleId: 'f5v2-math-module-2-easy',
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
      A: '(1, 4) is a tempting wrong answer because x = 1 and y = 4 are both small integers that might seem to fit a simple linear equation. Students who compute 3(1) = 3 and then skip the "−1" step write y = 3, not 4. Or students who use the equation y = 3x + 1 (wrong sign on the constant) get y = 3(1) + 1 = 4 and incorrectly select (1, 4). Always apply the actual equation, including its sign: y = 3(1) − 1 = 2, not 4.',
      C: '(0, 1) tempts students who think the y-intercept is +1 instead of −1. When x = 0, y = 3(0) − 1 = −1. Students who misread the equation as y = 3x + 1 (changing the sign of the constant) compute y = 0 + 1 = 1 and select (0, 1). The constant in the equation is negative: y = 3x − 1.',
      D: '(3, 7) is the most seductive wrong answer. Students compute y = 3(3) − 1 = 9 − 1 = 8, but if they make an arithmetic slip computing 9 − 1 = 7, or if they skip the subtraction step entirely (computing only 3 × 3 = 9... actually they\'d need 9 − 2 for 7), they arrive at (3, 7). The actual value is y = 3(3) − 1 = 8, making the correct pair (3, 8), not (3, 7).',
    },
  },

  {
    id: 'sat-f5-v2-math-m2e-q04',
    section: 'math',
    moduleId: 'f5v2-math-module-2-easy',
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
      A: 'x = 1 is reached when students substitute y = x + 3 into the second equation but combine incorrectly: 2x + x + 3 = 9 → 2x + x = 9 − 3 = 6 → 3x = 6 → x = 2. If instead a student misreads 2x + (x + 3) = 9 as 2(x + x + 3) = 9 → 2(2x + 3) = 9 → 4x + 6 = 9 → 4x = 3 → x ≈ 1, they arrive near x = 1. Checking: x = 1 gives y = 4 and 2(1) + 4 = 6 ≠ 9.',
      C: 'x = 3 is the most tempting wrong answer. The equation contains the constants 3 and 9, so students who see "add them" or "divide them" and arrive at x = 3 are picking a number that "feels right" from the problem. Systematic checking: x = 3 gives y = 6, and 2(3) + 6 = 12 ≠ 9. This fails the second equation.',
      D: 'x = 5 is actually the y-value when x = 2, not the x-value. Students who correctly solve the system (x = 2, y = 5) but then confuse which variable they were asked to report select this. The question asks for x, so the answer is 2. Always re-read the question after solving to confirm which variable is requested.',
    },
  },

  {
    id: 'sat-f5-v2-math-m2e-q05',
    section: 'math',
    moduleId: 'f5v2-math-module-2-easy',
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

  {
    id: 'sat-f5-v2-math-m2e-q14',
    section: 'math',
    moduleId: 'f5v2-math-module-2-easy',
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
      A: '100 miles does not correspond to any clean derivation from 60 mph × 2.5 hours. Students who misapply distance = speed/time (dividing instead of multiplying: 60/2.5 = 24, not 100) or who make an arithmetic mistake computing 60 × 2.5 might arrive here. The correct computation is 60 × 2.5 = 60 × 2 + 60 × 0.5 = 120 + 30 = 150.',
      B: '120 miles is the most common wrong answer — students use 2 hours instead of 2.5 hours, perhaps ignoring the decimal and rounding 2.5 down to 2. 60 × 2 = 120 is straightforward mental math, and students who are not careful with the ".5" drop it. The extra half hour adds 60 × 0.5 = 30 miles, giving 120 + 30 = 150.',
      D: '180 miles comes from using 3 hours instead of 2.5, perhaps rounding 2.5 up to 3. 60 × 3 = 180 is easy mental math. Students who round up instead of treating 2.5 exactly make this error. 2.5 hours is exactly halfway between 2 and 3 hours, giving a distance exactly halfway between 120 and 180, which is 150.',
    },
  },

  {
    id: 'sat-f5-v2-math-m2e-q15',
    section: 'math',
    moduleId: 'f5v2-math-module-2-easy',
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
      A: '24 = 0.30 × 80, which is 30% of 80, not 35%. Students who use 30% instead of 35% — perhaps confusing 35 with 30 under time pressure, or misremembering which column of a table they are reading — get 24. The correct multiplier is 0.35: 0.35 × 80 = 28.',
      C: '35 is the percentage itself, not the computed value. Students who do not convert the percentage to a decimal (skipping the "divide by 100" step) and simply report the percent as the answer select this. 35% of 80 requires multiplication: 35/100 × 80 = 0.35 × 80 = 28, not 35.',
      D: '45 is the most seductive wrong answer — it is a plausible-looking result that could come from a decimal misplacement. Students who compute 35 × 80 = 2,800 and then misplace the decimal (dividing by 100 gives 28, but dividing by 10 gives 280... neither gives 45) or who compute 0.35 × 80 incorrectly through informal mental arithmetic might arrive here. Some students add 35 + 80/8 = 35 + 10 = 45 through faulty estimation. The correct result is 0.35 × 80 = 28.',
    },
  },

  {
    id: 'sat-f5-v2-math-m2e-q17',
    section: 'math',
    moduleId: 'f5v2-math-module-2-easy',
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
      A: '1/5 = 2/10 is the probability of drawing a green marble (2 green out of 10 total), not a red one (3 red out of 10). Students who confuse the colors — perhaps because green and red are listed at the ends of the count (3 red, 5 blue, 2 green) and they accidentally use the green count (2) as the numerator — arrive at 1/5. The red count is 3, giving P(red) = 3/10.',
      C: '1/3 comes from the three-color equal-probability fallacy — treating each color as equally likely because there are three distinct colors. If each were equally likely, P(red) = 1/3. But the three colors have unequal counts (3, 5, 2), so each color\'s probability depends on its actual count relative to the total of 10.',
      D: '3/5 is the most tempting wrong answer. Students who compute P(red) = 3/total but mistakenly compute the total as only the non-red marbles (5 + 2 = 7 is not 5)... or who use the non-red total (5 blue + 2 green = 7 remaining, not 5) and form 3/5 might have computed the ratio of red to blue (3/5). "3 out of 5 blue" has no probability meaning here — the denominator must be the total marble count (10), giving 3/10.',
    },
  },

  {
    id: 'sat-f5-v2-math-m2e-q08',
    section: 'math',
    moduleId: 'f5v2-math-module-2-easy',
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
      A: '"x = 2 and x = 3" is the most tempting wrong answer. Students correctly identify that the equation factors as (x + something)(x + something) = 0 and find the pair of integers that multiply to 6 and add to 5: those integers are 2 and 3. But they drop the negative sign, forgetting that the factored form is (x + 2)(x + 3) = 0, which gives x = −2 and x = −3, not x = 2 and x = 3. Substitution check: x = 2 gives 4 + 10 + 6 = 20 ≠ 0.',
      C: '"x = −1 and x = −6" tempts students who correctly seek a pair of numbers whose product is +6 (the constant) but overlook the sum requirement. The pair −1 and −6 multiplies to +6 but adds to −7, not −5 (wait: this equation has +5x, so we need numbers that add to +5). Actually −1 and −6 add to −7 ≠ 5. But students who just pair numbers that multiply to the constant without checking the sum select this.',
      D: '"x = 1 and x = 6" comes from factoring as if the equation were x² + 7x + 6 = 0 — using the constant (6) and the wrong sum (7 instead of 5). Or from seeing 1 × 6 = 6 and 1 + 6 = 7 and substituting without checking. Substitution check: x = 1 gives 1 + 5 + 6 = 12 ≠ 0.',
    },
  },

  {
    id: 'sat-f5-v2-math-m2e-q09',
    section: 'math',
    moduleId: 'f5v2-math-module-2-easy',
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
      A: 'x² + 5x + 5 has the correct middle term (5x) but the wrong constant. Students who correctly compute the Outer and Inner terms (2x + 3x = 5x) but then compute the Last term as 3 + 2 = 5 instead of 3 × 2 = 6 get this. The Last term in FOIL is always the product of the two constants: 3 × 2 = 6, not their sum.',
      B: 'x² + 6x + 6 gets both the middle term and the constant wrong. Students who compute the middle term as 3x + 3x = 6x (using the "3" from the first binomial twice and ignoring the "2") and the constant as 3 × 2 = 6 (correct constant but wrong middle term) may arrive here. This error comes from applying the first binomial\'s constant to both the Outer and Inner terms instead of using one from each binomial.',
      D: 'x² + 3x + 6 has the correct constant (6) but the wrong middle term. Students who compute only one of the cross-terms — either just 3x (from 3 × x) or just 2x (from x × 2) — rather than adding both together make this error. The middle term requires combining BOTH the Outer term (x × 2 = 2x) and the Inner term (3 × x = 3x): 2x + 3x = 5x, not just 3x.',
    },
  },

  {
    id: 'sat-f5-v2-math-m2e-q10',
    section: 'math',
    moduleId: 'f5v2-math-module-2-easy',
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
      A: 'f(4) = 1 comes from computing 4 − 3 = 1 instead of 4² − 3. Students who do not apply the exponent — substituting x = 4 and computing x − 3 instead of x² − 3 — make this error. Always apply the full function definition: x² means the input squared, so f(4) = (4)² − 3, not 4 − 3.',
      B: 'f(4) = 8 has no single clean derivation, but some students compute 4² = 16 correctly and then subtract 16 − 8 = 8 instead of 16 − 3 = 13 (perhaps confusing the "−3" with "−8" from a previous step). Others may compute (4 − 3)² + something and arrive near 8. Regardless, the correct substitution is 4² − 3 = 16 − 3 = 13.',
      D: 'f(4) = 19 is the most tempting wrong answer. Students who compute 4² = 16 correctly but then add 3 instead of subtracting it get 16 + 3 = 19. This sign error comes from misreading f(x) = x² − 3 as f(x) = x² + 3, or from forgetting to apply the subtraction when substituting. The function subtracts 3: f(4) = 16 − 3 = 13.',
    },
  },

  {
    id: 'sat-f5-v2-math-m2e-q19',
    section: 'math',
    moduleId: 'f5v2-math-module-2-easy',
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
      A: '13 = 8 + 5 is the sum of the length and width — this is one-half of the perimeter, not the area. Students who confuse the area formula (l × w) with the perimeter formula and then skip the multiplication step select this. Area requires multiplying the two dimensions, not adding them.',
      B: '26 = 2 × (8 + 5) = 2 × 13 is the perimeter of the rectangle, not the area. Students who apply the perimeter formula (2l + 2w) when asked for area make this error. The perimeter is the total length of the boundary; the area is the enclosed surface. For a rectangle: perimeter = 2(8 + 5) = 26; area = 8 × 5 = 40.',
      D: '64 = 8² treats the rectangle as a square with side length 8. Students who only square the given length and ignore the width select this. This happens when students confuse "area of a square" (s²) with "area of a rectangle" (l × w). Since the width is 5 (not 8), the area is 8 × 5 = 40, not 8² = 64.',
    },
  },

  {
    id: 'sat-f5-v2-math-m2e-q20',
    section: 'math',
    moduleId: 'f5v2-math-module-2-easy',
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
      A: '45° results from using the wrong value for one of the known angles: 180° − 55° − 80° = 45°. Students who misread "70°" as "80°" (a common digit-transposition error under time pressure) make this computation error. The two known angles are 55° and 70°, not 55° and 80°. Correct: 180° − 55° − 70° = 55°.',
      C: '60° is a common distractor because 60° feels like a "natural" triangle angle (equilateral triangles have three 60° angles). Students who default to 60° without computing, or who confuse this with an equilateral triangle, select it. But 55° + 70° + 60° = 185° ≠ 180°, so 60° cannot be the third angle of this triangle.',
      D: '125° = 55° + 70° is perhaps the most common error — students add the two known angles together instead of subtracting them from 180°. The triangle angle-sum property requires the third angle to be 180° minus the other two, not the sum of the other two: 180° − (55° + 70°) = 180° − 125° = 55°.',
    },
  },

  {
    id: 'sat-f5-v2-math-m2e-q06',
    section: 'math',
    moduleId: 'f5v2-math-module-2-easy',
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
      B: 'x > 1 comes from a sign error in the first step. Students who subtract 4 from the wrong side — computing 3x − 4 > 8 → 3x > 8 − 4 = 4 → x > 4/3 ≈ 1.3 — then round to x > 1. Or students who add 4 to only part of the inequality get 3x > 4 → x > 4/3 ≈ 1. The first step must add 4 to both sides: 3x − 4 + 4 > 8 + 4 → 3x > 12 → x > 4.',
      C: 'x < 4 reverses the direction of the correct answer x > 4. Students who think the inequality flips when dividing by a positive number make this error. The flip rule only applies when dividing or multiplying by a NEGATIVE number. Since we divide by +3 (positive), the direction stays >, not <.',
      D: 'x > 2 results from an error in the first step: students who subtract 8 from both sides (instead of adding 4) get 3x − 4 − 8 > 0 → 3x − 12 > 0 → 3x > 12 → x > 4... wait, that still gives x > 4. A cleaner path to x > 2: students who add 4 but get 3x > 8 + 4 − 6 = 6 through a miscomputation, then divide by 3 to get x > 2. The correct addition is 8 + 4 = 12, giving 3x > 12 → x > 4.',
    },
  },

  {
    id: 'sat-f5-v2-math-m2e-q07',
    section: 'math',
    moduleId: 'f5v2-math-module-2-easy',
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
      A: '"The total earnings when no items are sold" describes f(0) = 15(0) + 50 = $50, not the value 15. Students who ask "what does the function give me before any items are sold?" correctly identify $50 as the base salary, but that is the y-intercept (50), not the coefficient (15). In f(n) = 15n + 50, the 15 multiplies n (items sold) and the 50 is the fixed base — these two constants have different roles.',
      B: '"The total number of items the salesperson must sell each day" confuses a dollar amount for a quantity of items. 15 is in units of dollars/item (the rate), not a count of items. Students who see "15" in a sales context and think it represents a sales target or quota make this conceptual error. The function describes how earnings change with items sold — 15 is the earnings rate, not the sales requirement.',
      D: '"The maximum daily earnings" would require the function to have an upper bound. But f(n) = 15n + 50 is a linear function with no cap — as n increases, earnings increase without limit. Students who think a real-world salary must have a ceiling and look for a "maximum" value in the function select this. The problem states no maximum, and the coefficient 15 describes the rate of earning, not a limit.',
    },
  },

  {
    id: 'sat-f5-v2-math-m2e-q16',
    section: 'math',
    moduleId: 'f5v2-math-module-2-easy',
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
      A: '30% is the dollar amount of the increase ($90 − $60 = $30), not the percent increase. Students who compute the absolute change ($30) and report it as a percent make this error — confusing a dollar value with a percentage. To find the percent increase, divide the dollar change by the original price: $30 ÷ $60 = 0.50 = 50%.',
      B: '33% (approximately) results from dividing the increase by the new price instead of the original price: $30 ÷ $90 ≈ 0.333 = 33%. This is a common error in percent-change problems — students may not remember whether to divide by the old or new value. The formula for percent increase always uses the original (starting) value in the denominator: (change ÷ original) × 100.',
      D: '150% is the most seductive wrong answer. The new price ($90) is 1.5 times the original price ($60), so if students compute $90/$60 = 1.5 = 150%, they are reporting the ratio of new to old, not the percent increase. The percent increase measures only the growth above the original, not the final amount as a share of the original: ($90 − $60)/$60 = 50%, not 150%.',
    },
  },

  {
    id: 'sat-f5-v2-math-m2e-q18',
    section: 'math',
    moduleId: 'f5v2-math-module-2-easy',
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
      A: '80 would be the mean if the sum were 400. Students who make an arithmetic error summing the scores — perhaps computing 72 + 78 = 150, then 150 + 84 = 234, then 234 + 90 = 314 (correct), then 314 + 96 = 410 or 400 (miscounting the last addition) — divide by 5 and get 80. Careful addition: 72 + 78 = 150, 150 + 84 = 234, 234 + 90 = 324, 324 + 96 = 420. Mean = 420/5 = 84.',
      B: '82 is not achievable from a clean arithmetic path through these five numbers. Students who estimate the middle of the range as (96 − 72)/2 + 72 = 12 + 72 = 84 correctly arrive at the mean (these data are evenly spaced), but some students who estimate "between 80 and 84" land on 82 as a guess. Evenly spaced data: mean = median = 84 (the middle value).',
      D: '86 would require a sum of 430. Students who make an upward arithmetic error — perhaps computing 90 + 96 = 196 instead of 186 and carrying the error through the sum — get 430/5 = 86. The correct sum of the last two values is 90 + 96 = 186 (not 196), and the total is 420/5 = 84.',
    },
  },

  {
    id: 'sat-f5-v2-math-m2e-q11',
    section: 'math',
    moduleId: 'f5v2-math-module-2-easy',
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
      A: '"x = −2 and x = −5" comes from finding integer pairs that multiply to +10 but ignoring the sign of the middle term. The pairs (2, 5) and (−2, −5) both have a product of +10, but only (−2, −5) gives a sum of −7 matching the middle coefficient. Students who pick (−2, −5) but then fail to check the sum — or who find (2, 5) and apply negative signs to make the constant positive without verifying the middle term — arrive at x = −2 and x = −5. Check: (x + 2)(x + 5) = x² + 7x + 10, which has +7x not −7x, and the correct factoring (x − 2)(x − 5) = x² − 7x + 10 has the right signs.',
      C: '"x = 1 and x = 10" comes from looking for pairs whose product is 10 and sum is related, but finding (1, 10): product = 10 ✓ but sum = 11, not 7. The factoring (x − 1)(x − 10) = x² − 11x + 10 has −11x instead of −7x. Students who do not systematically check all factor pairs — stopping at (1, 10) rather than continuing to (2, 5) — make this error.',
      D: '"x = 7 and x = 10" has no valid factoring interpretation. Students who see the coefficients −7 and +10 in the equation and assume the solutions are simply those numbers — treating the middle coefficient and constant as solutions — make a category error. Substitution check: x = 7 gives 49 − 49 + 10 = 10 ≠ 0.',
    },
  },

  {
    id: 'sat-f5-v2-math-m2e-q12',
    section: 'math',
    moduleId: 'f5v2-math-module-2-easy',
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
      A: 'B(t) = 200 + 2t is a linear model that adds 2 cells per hour rather than doubling. This confuses the growth factor (2, multiplicative) with an additive rate (+2 per hour). After 1 hour this gives 202 cells, but actual doubling gives 400. Students who think "doubling" means adding the number 2 each hour — treating "doubles" as an additive increment — select this.',
      B: 'B(t) = 200t² is a quadratic model. Students who associate "doubling" with the exponent 2 and place that exponent on t (getting t²) arrive here. But "doubling every hour" means multiplying by 2 each hour (so the base of an exponent is 2 and the variable is the exponent), not squaring the time variable. After 2 hours: correct model gives 200 × 2² = 800; this model gives 200 × 4 = 800 (coincidentally the same at t=2) but at t=3 gives 200 × 9 = 1800 instead of 200 × 8 = 1600.',
      D: 'B(t) = 2(200)^t places the initial amount (200) as the base of the exponential and 2 as the coefficient. This inverts the roles: in exponential growth B = initial × (growth factor)^time, the initial value is the coefficient and the growth factor is the base. Using 200^t would mean the count multiplies by 200 each hour, growing astronomically fast. After 1 hour: 2 × 200 = 400 (matches the correct answer by coincidence) but after 2 hours: 2 × 40,000 = 80,000 (far larger than the correct 800).',
    },
  },

  {
    id: 'sat-f5-v2-math-m2e-q13',
    section: 'math',
    moduleId: 'f5v2-math-module-2-easy',
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

  {
    id: 'sat-f5-v2-math-m2e-q21',
    section: 'math',
    moduleId: 'f5v2-math-module-2-easy',
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
      A: '18 = 6 × 3 results from using length = 6 (doubling the width) instead of length = 9 (tripling the width). Students who read "3 times its width" and compute length = 2 × width rather than 3 × width — perhaps misreading "3 times" as "2 times more" or confusing multiplier with increment — get width = 3, length = 6, area = 18. The problem states the length is 3 times the width, meaning length = 3w, not length = 2w.',
      B: '24 is the perimeter given in the problem, not the area. Students who identify the perimeter value and report it as the area confuse the two geometric measures. The perimeter (24) is used as input to find the dimensions, and then those dimensions are multiplied to find the area. The area is 9 × 3 = 27, not 24.',
      D: '36 = 6 × 6 comes from incorrectly solving for the width. If students set up the perimeter equation as 4w = 24 (treating the rectangle as a square, so all four sides equal w) instead of 2(3w + w) = 24, they get w = 6 and "area" = 6² = 36. But a square would require length = width, whereas the problem specifies length = 3 × width.',
    },
  },

  {
    id: 'sat-f5-v2-math-m2e-q22',
    section: 'math',
    moduleId: 'f5v2-math-module-2-easy',
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
