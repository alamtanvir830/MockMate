import type { MathQuestion } from '../types'

export const f6MathModule2HardQuestionsV2: MathQuestion[] = [
  // ─── Q01 — easy — Algebra | Linear equations in one variable | MC: B ────────
  // Solve: 3(x + 4) − 7 = 2(x + 1) + 8
  // 3x + 12 − 7 = 2x + 2 + 8 → 3x + 5 = 2x + 10 → x = 5
  // Verify: 3(9) − 7 = 27 − 7 = 20; 2(6) + 8 = 12 + 8 = 20 ✓
  {
    id: 'sat-f6-v2-math-m2h-q01',
    section: 'math',
    moduleId: 'f6v2-math-module-2-hard',
    domain: 'Algebra',
    skill: 'Linear equations in one variable',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'What value of x satisfies 3(x + 4) − 7 = 2(x + 1) + 8?',
    choices: [
      { label: 'A', text: '3' },
      { label: 'B', text: '5' },
      { label: 'C', text: '7' },
      { label: 'D', text: '10' },
    ],
    correctAnswer: 'B',
    explanation:
      'Distribute on both sides: 3x + 12 − 7 = 2x + 2 + 8 → 3x + 5 = 2x + 10. Subtract 2x from both sides: x + 5 = 10 → x = 5. Verify: 3(5 + 4) − 7 = 3(9) − 7 = 27 − 7 = 20, and 2(5 + 1) + 8 = 2(6) + 8 = 20 ✓.',
    wrongAnswerExplanations: {
      A: 'x = 3 results from distributing 3(x + 4) as 3x + 4 (omitting the multiplication on 4), giving 3x − 3 = 2x + 10 → x = 13, then a further arithmetic error. Alternatively, forgetting to distribute the 3 on both constants yields a shifted equation with solution x = 3.',
      C: 'x = 7 arises from combining like terms incorrectly after distributing — for example, writing 3x + 5 = 2x + 12 (computing 2 + 8 = 10 but writing 12), which gives x = 7.',
      D: 'x = 10 results from failing to collect constant terms on the right side, treating the equation as 3x − 7 = 2x + 10 (dropping the +12 from distribution), which gives x = 17, or from an arithmetic slip that produces x = 10.',
    },
  },

  // ─── Q02 — easy — Algebra | Linear equations in two variables | MC: D ────────
  // Line through (1, 3) and (4, 9): slope = (9−3)/(4−1) = 6/3 = 2
  // y − 3 = 2(x − 1) → y = 2x + 1
  // At x = 7: y = 2(7) + 1 = 15
  {
    id: 'sat-f6-v2-math-m2h-q02',
    section: 'math',
    moduleId: 'f6v2-math-module-2-hard',
    domain: 'Algebra',
    skill: 'Linear equations in two variables',
    difficulty: 'easy',
    type: 'multiple_choice',
    question:
      'A line passes through the points (1, 3) and (4, 9). What is the y-value on the line when x = 7?',
    choices: [
      { label: 'A', text: '11' },
      { label: 'B', text: '13' },
      { label: 'C', text: '14' },
      { label: 'D', text: '15' },
    ],
    correctAnswer: 'D',
    explanation:
      'Slope = (9 − 3)/(4 − 1) = 6/3 = 2. Using point (1, 3): 3 = 2(1) + b → b = 1, so the line is y = 2x + 1. At x = 7: y = 2(7) + 1 = 14 + 1 = 15.',
    wrongAnswerExplanations: {
      A: 'y = 11 results from computing the slope incorrectly as 1 — for example, dividing the run by the rise: (4 − 1)/(9 − 3) = 3/6 = 0.5, then computing a wrong equation, or from a different slope error that ultimately yields y = 11 at x = 7.',
      B: 'y = 13 results from finding the correct slope (2) but an incorrect y-intercept of −1: computing b = 3 − 2(1) = 1 but writing −1, then evaluating 2(7) − 1 = 13.',
      C: 'y = 14 omits the y-intercept entirely — the student found slope = 2 and computed 2 × 7 = 14, forgetting to add the intercept b = 1.',
    },
  },

  // ─── Q03 — medium — Advanced Math | Equivalent expressions | MC: A ──────────
  // (3x² − 2x + 1)(x + 3): 3x³ + 9x² − 2x² − 6x + x + 3 = 3x³ + 7x² − 5x + 3
  // Add (x² + 2x − 4): 3x³ + 8x² − 3x − 1
  {
    id: 'sat-f6-v2-math-m2h-q03',
    section: 'math',
    moduleId: 'f6v2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Equivalent expressions',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'Which of the following is equivalent to (3x² − 2x + 1)(x + 3) + (x² + 2x − 4)?',
    choices: [
      { label: 'A', text: '3x³ + 8x² − 3x − 1' },
      { label: 'B', text: '3x³ + 7x² − 5x + 3' },
      { label: 'C', text: '3x³ + 8x² − 3x + 3' },
      { label: 'D', text: '3x³ + 10x² − 3x − 1' },
    ],
    correctAnswer: 'A',
    explanation:
      'Expand (3x² − 2x + 1)(x + 3): (3x²)(x) + (3x²)(3) + (−2x)(x) + (−2x)(3) + (1)(x) + (1)(3) = 3x³ + 9x² − 2x² − 6x + x + 3 = 3x³ + 7x² − 5x + 3. Now add (x² + 2x − 4): x³: 3x³; x²: 7x² + x² = 8x²; x: −5x + 2x = −3x; constant: 3 − 4 = −1. Result: 3x³ + 8x² − 3x − 1.',
    wrongAnswerExplanations: {
      B: '3x³ + 7x² − 5x + 3 is the product (3x² − 2x + 1)(x + 3) before adding the second polynomial. The student correctly expanded the product but forgot to add (x² + 2x − 4).',
      C: '3x³ + 8x² − 3x + 3 has correct x³, x², and x terms but an incorrect constant. The constant should be 3 − 4 = −1, not +3. The student kept the expansion constant (+3) without subtracting 4.',
      D: '3x³ + 10x² − 3x − 1 has the correct constant but the x²-coefficient is wrong: 10 instead of 8. This results from computing 9x² + x² + x² = 11x² or some other overcounting of the x² terms when adding the two polynomials.',
    },
  },

  // ─── Q04 — medium — Advanced Math | Nonlinear functions | MC: C ─────────────
  // f(x) = x² − 8x + 15. f(2) = 4 − 16 + 15 = 3.
  // f(k) = 3: k² − 8k + 15 = 3 → k² − 8k + 12 = 0 → (k−2)(k−6) = 0 → k=2 or k=6.
  // Since k ≠ 2, k = 6.
  {
    id: 'sat-f6-v2-math-m2h-q04',
    section: 'math',
    moduleId: 'f6v2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'The function f(x) = x² − 8x + 15 satisfies f(2) = f(k) for some value k ≠ 2. What is the value of k?',
    choices: [
      { label: 'A', text: '4' },
      { label: 'B', text: '5' },
      { label: 'C', text: '6' },
      { label: 'D', text: '8' },
    ],
    correctAnswer: 'C',
    explanation:
      'Evaluate f(2): f(2) = (2)² − 8(2) + 15 = 4 − 16 + 15 = 3. Set f(k) = 3: k² − 8k + 15 = 3 → k² − 8k + 12 = 0. Factor: (k − 2)(k − 6) = 0, giving k = 2 or k = 6. Since k ≠ 2, the answer is k = 6. This symmetry also follows from the vertex being at x = 4, and both x = 2 and x = 6 lie exactly 2 units from the vertex.',
    wrongAnswerExplanations: {
      A: 'k = 4 is the x-coordinate of the vertex (the axis of symmetry), not the symmetric partner of x = 2. While 4 is the axis of symmetry, the question asks for a value other than 2 that gives the same function value.',
      B: 'k = 5 is a zero of f (since f(5) = 25 − 40 + 15 = 0) but f(5) = 0 ≠ 3 = f(2), so k = 5 does not satisfy f(2) = f(k).',
      D: 'k = 8 gives f(8) = 64 − 64 + 15 = 15 ≠ 3 = f(2). This error may arise from incorrectly solving k² − 8k + 12 = 0 as completing the square to (k − 4)² = 4, giving k = 6 or k = 2, but then confusing the axis value with the answer.',
    },
  },

  // ─── Q05 — medium — PSDA | Probability and conditional probability | MC: D ──
  // 90 Spanish students: 54 passed. 60 French students: 42 passed.
  // P(French | passed) = 42/(54+42) = 42/96 = 7/16
  {
    id: 'sat-f6-v2-math-m2h-q05',
    section: 'math',
    moduleId: 'f6v2-math-module-2-hard',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Probability and conditional probability',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'At a school, 90 students take Spanish and 60 students take French. Of the Spanish students, 54 passed the final exam. Of the French students, 42 passed the final exam. A student who passed the final exam is selected at random. What is the probability that the selected student takes French?',
    choices: [
      { label: 'A', text: '7/25' },
      { label: 'B', text: '3/5' },
      { label: 'C', text: '9/16' },
      { label: 'D', text: '7/16' },
    ],
    correctAnswer: 'D',
    explanation:
      'The sample space is restricted to students who passed the final: 54 (Spanish) + 42 (French) = 96 total passers. Of these, 42 take French. P(French | passed) = 42/96 = 7/16.',
    wrongAnswerExplanations: {
      A: '7/25 = 42/150 uses all 150 students as the denominator, ignoring the condition that we select only from those who passed. This is P(takes French AND passed), not the conditional probability.',
      B: '3/5 reflects a misreading where the student computes 60/100 or confuses the French total (60) with the passing total in some way, using an incorrect denominator.',
      C: '9/16 = 54/96 is the probability that the selected passer takes Spanish, not French. The student correctly found the denominator 96 but used the Spanish passers (54) instead of the French passers (42).',
    },
  },

  // ─── Q06 — medium — Advanced Math | Quadratic equations and functions | MC: B
  // x² + bx − 12 = 0 has roots 3 and r. Product: 3r = −12 → r = −4.
  // Sum: 3 + (−4) = −1 = −b → b = 1.
  {
    id: 'sat-f6-v2-math-m2h-q06',
    section: 'math',
    moduleId: 'f6v2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Quadratic equations and functions',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'The quadratic equation x² + bx − 12 = 0 has two integer roots, one of which is 3. What is the value of b?',
    choices: [
      { label: 'A', text: '−4' },
      { label: 'B', text: '1' },
      { label: 'C', text: '4' },
      { label: 'D', text: '−1' },
    ],
    correctAnswer: 'B',
    explanation:
      "Since x = 3 is a root, by Vieta's formulas the product of the roots equals the constant term (with sign): 3 × r = −12 → r = −4. The sum of the roots is 3 + (−4) = −1 = −b, giving b = 1. Verify: x² + x − 12 = (x − 3)(x + 4) = 0 ✓, with roots 3 and −4.",
    wrongAnswerExplanations: {
      A: 'b = −4 is the value of the second root r, not b. The student found r = −4 correctly but reported r instead of computing b = −(sum of roots) = −(−1) = 1.',
      C: 'b = 4 results from using the product of the roots with the wrong sign: treating 3 × r = +12 → r = 4, then writing b = 4. This ignores the sign of the constant term in the quadratic.',
      D: 'b = −1 results from computing the sum 3 + (−4) = −1 and writing that directly as b, instead of recognizing that the sum of roots equals −b, so b = −(−1) = 1.',
    },
  },

  // ─── Q07 — medium — Algebra | Linear functions | MC: A ─────────────────────
  // f(x) = mx + c. f(2) = 7, f(5) = 16.
  // m = (16−7)/(5−2) = 9/3 = 3. c = 7 − 3(2) = 1. f(0) = 1.
  {
    id: 'sat-f6-v2-math-m2h-q07',
    section: 'math',
    moduleId: 'f6v2-math-module-2-hard',
    domain: 'Algebra',
    skill: 'Linear functions',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'A linear function f satisfies f(2) = 7 and f(5) = 16. What is the value of f(0)?',
    choices: [
      { label: 'A', text: '1' },
      { label: 'B', text: '3' },
      { label: 'C', text: '4' },
      { label: 'D', text: '6' },
    ],
    correctAnswer: 'A',
    explanation:
      'The slope is m = (16 − 7)/(5 − 2) = 9/3 = 3. Using the point (2, 7): 7 = 3(2) + c → c = 7 − 6 = 1. So f(x) = 3x + 1 and f(0) = 3(0) + 1 = 1. Verify: f(2) = 6 + 1 = 7 ✓ and f(5) = 15 + 1 = 16 ✓.',
    wrongAnswerExplanations: {
      B: 'f(0) = 3 is the slope itself, not the y-intercept. The student correctly found slope m = 3 but reported the slope as the value of f(0) without using a point to find the y-intercept.',
      C: 'f(0) = 4 results from computing the y-intercept as c = 7 − 3 = 4, subtracting only the slope rather than 3 × 2 = 6 from the y-value at x = 2.',
      D: 'f(0) = 6 results from a slope computation or substitution error — for example computing 3(2) = 5 instead of 6, giving c = 7 − 5 = 2 and then misreading 2 as 6, or averaging f(2) and f(5) to get 11.5 and subtracting 5.5.',
    },
  },

  // ─── Q08 — medium — Advanced Math | Exponential functions | MC: D ───────────
  // Account doubles every 4 years: A(t) = 1200·2^(t/4).
  // After 12 years: A(12) = 1200·2^3 = 1200·8 = 9600.
  {
    id: 'sat-f6-v2-math-m2h-q08',
    section: 'math',
    moduleId: 'f6v2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Exponential functions',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'An account starts with $1,200 and doubles in value every 4 years. Which of the following correctly gives the value of the account after t years, and what is its value after 12 years?',
    choices: [
      { label: 'A', text: 'A(t) = 1200(2)^t; value after 12 years is $4,915,200' },
      { label: 'B', text: 'A(t) = 1200(1.5)^(t/4); value after 12 years is $4,050' },
      { label: 'C', text: 'A(t) = 1200(2)^(t/4); value after 12 years is $4,800' },
      { label: 'D', text: 'A(t) = 1200(2)^(t/4); value after 12 years is $9,600' },
    ],
    correctAnswer: 'D',
    explanation:
      'Because the account doubles every 4 years, the model is A(t) = 1200 · 2^(t/4). The exponent t/4 counts the number of 4-year doubling periods. After 12 years: A(12) = 1200 · 2^(12/4) = 1200 · 2³ = 1200 · 8 = $9,600.',
    wrongAnswerExplanations: {
      A: 'A(t) = 1200(2)^t treats each year as a full doubling period rather than doubling once every 4 years. At t = 12, this gives 1200 × 2^12 = 1200 × 4096 = $4,915,200 — a massive overstatement of growth.',
      B: 'A base of 1.5 represents 50% growth per 4-year period, not a doubling (which requires base 2). At t = 12, this gives 1200 × (1.5)^3 = 1200 × 3.375 = $4,050, which is far less than the correct $9,600.',
      C: 'The model A(t) = 1200(2)^(t/4) is correct, but the computed value is wrong. 2^(12/4) = 2³ = 8, and 1200 × 8 = 9600, not 4800. The error comes from computing 1200 × 4 = 4800, confusing 2^(12/4) = 4 with the correct 2^3 = 8.',
    },
  },

  // ─── Q09 — medium — Advanced Math | Nonlinear functions | MC: C ─────────────
  // f(x) = 2x − 3, g(x) = x² + 5x − 2.
  // g(f(x)) = g(2x−3) = (2x−3)² + 5(2x−3) − 2
  //         = 4x² − 12x + 9 + 10x − 15 − 2
  //         = 4x² − 2x − 8
  {
    id: 'sat-f6-v2-math-m2h-q09',
    section: 'math',
    moduleId: 'f6v2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Nonlinear functions',
    difficulty: 'medium',
    type: 'multiple_choice',
    question:
      'Let f(x) = 2x − 3 and g(x) = x² + 5x − 2. Which of the following is equivalent to g(f(x))?',
    choices: [
      { label: 'A', text: '4x² + 2x − 8' },
      { label: 'B', text: '4x² − 2x + 8' },
      { label: 'C', text: '4x² − 2x − 8' },
      { label: 'D', text: '2x² + 10x − 7' },
    ],
    correctAnswer: 'C',
    explanation:
      'Substitute f(x) = 2x − 3 into g: g(f(x)) = (2x − 3)² + 5(2x − 3) − 2. Expand (2x − 3)² = 4x² − 12x + 9. Expand 5(2x − 3) = 10x − 15. Combine all terms: 4x² − 12x + 9 + 10x − 15 − 2 = 4x² + (−12 + 10)x + (9 − 15 − 2) = 4x² − 2x − 8.',
    wrongAnswerExplanations: {
      A: '4x² + 2x − 8 has the correct x² and constant terms but the wrong sign on the x-coefficient. This arises from computing −12x + 10x with a sign error, writing +2x instead of −2x.',
      B: '4x² − 2x + 8 has the correct x² and x terms but the wrong constant. The constant is 9 − 15 − 2 = −8, not +8. The student likely computed 9 − 15 = −6 and then added 2 instead of subtracting it.',
      D: '2x² + 10x − 7 results from computing f(g(x)) — composing in the wrong order. f(g(x)) = 2(x² + 5x − 2) − 3 = 2x² + 10x − 4 − 3 = 2x² + 10x − 7.',
    },
  },

  // ─── Q10 — hard — PSDA | Two-variable data: models and scatterplots | MC: B ─
  // Regression ŷ = −1.4x + 72, r = −0.89. Prediction at x = 25: ŷ = −35 + 72 = 37.
  {
    id: 'sat-f6-v2-math-m2h-q10',
    section: 'math',
    moduleId: 'f6v2-math-module-2-hard',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Two-variable data: models and scatterplots',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'A researcher models the relationship between daily screen time in hours (x) and sleep quality score (y, scale 0–100) using the regression equation ŷ = −1.4x + 72, with a correlation coefficient of −0.89. Which of the following conclusions is best supported?',
    choices: [
      { label: 'A', text: 'Screen time causes poor sleep quality, and a student with 25 screen hours daily will have a sleep score of about 72.' },
      { label: 'B', text: 'There is a strong negative association between screen time and sleep quality, and the model predicts a sleep score of 37 for someone with 25 daily screen hours.' },
      { label: 'C', text: 'There is a weak positive association between screen time and sleep quality, and the slope shows sleep improves by 1.4 points per screen hour.' },
      { label: 'D', text: 'There is a strong negative association, and the model predicts a sleep score of 107 for someone with 25 daily screen hours.' },
    ],
    correctAnswer: 'B',
    explanation:
      'The correlation r = −0.89 is close to −1, indicating a strong negative association — as screen time increases, sleep quality tends to decrease. A correlation alone does not establish causation. The prediction at x = 25: ŷ = −1.4(25) + 72 = −35 + 72 = 37. Choice B correctly identifies the association strength, avoids an unwarranted causal claim, and computes the prediction correctly.',
    wrongAnswerExplanations: {
      A: 'The word "causes" overstates what a regression model can conclude — correlation does not establish causation. Also, 72 is the y-intercept (predicted score at x = 0 screen hours), not the prediction at x = 25.',
      C: 'r = −0.89 indicates a strong negative association, not a weak positive one. The slope −1.4 means sleep quality decreases by 1.4 points per additional screen hour — the opposite of improvement.',
      D: 'The association description is correct, but the computation is wrong. Getting 107 requires adding instead of subtracting: 1.4(25) + 72 = 35 + 72 = 107, which ignores the negative slope. The correct value is −35 + 72 = 37.',
    },
  },

  // ─── Q11 — hard — Advanced Math | Nonlinear equations in one variable and systems | MC: D
  // y = x² − 5x + 4 and y = x − 2. Set equal: x² − 5x + 4 = x − 2 → x² − 6x + 6 = 0.
  // Product of roots (Vieta's): c/a = 6.
  {
    id: 'sat-f6-v2-math-m2h-q11',
    section: 'math',
    moduleId: 'f6v2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Nonlinear equations in one variable and systems of equations in two variables',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'The system of equations y = x² − 5x + 4 and y = x − 2 intersects at two points in the xy-plane. What is the product of the x-coordinates of the two intersection points?',
    choices: [
      { label: 'A', text: '2' },
      { label: 'B', text: '4' },
      { label: 'C', text: '5' },
      { label: 'D', text: '6' },
    ],
    correctAnswer: 'D',
    explanation:
      "Set the expressions equal: x² − 5x + 4 = x − 2. Rearrange: x² − 6x + 6 = 0. By Vieta's formulas, the product of the roots of x² + bx + c = 0 equals c. Here c = 6, so the product of the x-coordinates is 6. (Discriminant check: (−6)² − 4(6) = 36 − 24 = 12 > 0, confirming two real intersections.)",
    wrongAnswerExplanations: {
      A: 'Product = 2 reflects the constant from y = x − 2, not from the rearranged quadratic. After setting equations equal, the resulting quadratic is x² − 6x + 6 = 0, which has product of roots 6.',
      B: 'Product = 4 is the constant term in the original quadratic y = x² − 5x + 4, not in the rearranged equation x² − 6x + 6 = 0. Subtracting y = x − 2 changes the constant to +6.',
      C: 'Product = 5 is the absolute value of the coefficient of x in the original quadratic (−5x). By Vieta\'s, the product of roots equals the constant term of the rearranged equation (6), not the linear coefficient.',
    },
  },

  // ─── Q12 — hard — Geometry and Trigonometry | Area and volume formulas | MC: A
  // Cone: slant height l = 10, lateral area = πrl = 60π → r = 6.
  // Height: h² = l² − r² = 100 − 36 = 64 → h = 8.
  // Volume = (1/3)π(36)(8) = 96π.
  {
    id: 'sat-f6-v2-math-m2h-q12',
    section: 'math',
    moduleId: 'f6v2-math-module-2-hard',
    domain: 'Geometry and Trigonometry',
    skill: 'Area and volume formulas',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'A right circular cone has a slant height of 10 and a lateral surface area of 60π. What is the volume of the cone?',
    choices: [
      { label: 'A', text: '96π' },
      { label: 'B', text: '120π' },
      { label: 'C', text: '144π' },
      { label: 'D', text: '288π' },
    ],
    correctAnswer: 'A',
    explanation:
      'Lateral surface area of a cone = πrl. Setting πrl = 60π with l = 10: r = 60π/(10π) = 6. The height h satisfies h² + r² = l²: h² = 100 − 36 = 64, so h = 8. Volume = (1/3)πr²h = (1/3)π(36)(8) = (1/3)(288π) = 96π.',
    wrongAnswerExplanations: {
      B: '120π results from using the slant height as the height directly: V = (1/3)π(36)(10) = 120π. The height must be found using the Pythagorean theorem with the slant height and radius.',
      C: '144π results from a volume formula error — perhaps computing V = πr²h/2 or including extra factors. With r = 6 and h = 8: πr²h = 288π, and dividing by 2 rather than 3 gives 144π.',
      D: '288π results from computing πr²h without the factor of 1/3: V = π(36)(8) = 288π. This is three times the correct answer.',
    },
  },

  // ─── Q13 — hard — Advanced Math | Equivalent expressions | MC: C ─────────────
  // (4x³ − 6x² + 2x)/(2x) = 2x² − 3x + 1 for x ≠ 0.
  // Add x² − x: 3x² − 4x + 1.
  {
    id: 'sat-f6-v2-math-m2h-q13',
    section: 'math',
    moduleId: 'f6v2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Equivalent expressions',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'For x ≠ 0, which expression is equivalent to (4x³ − 6x² + 2x)/(2x) + x² − x?',
    choices: [
      { label: 'A', text: '3x² − 2x + 1' },
      { label: 'B', text: '2x² − 4x + 1' },
      { label: 'C', text: '3x² − 4x + 1' },
      { label: 'D', text: '3x² − 2x − 1' },
    ],
    correctAnswer: 'C',
    explanation:
      'First simplify (4x³ − 6x² + 2x)/(2x) by dividing each term: 4x³/(2x) − 6x²/(2x) + 2x/(2x) = 2x² − 3x + 1. Then add x² − x: (2x² − 3x + 1) + (x² − x) = 3x² − 4x + 1.',
    wrongAnswerExplanations: {
      A: '3x² − 2x + 1 has the correct x² and constant terms but the wrong x-coefficient. The x terms are −3x (from the simplified fraction) and −x (from the added polynomial), which sum to −4x, not −2x. The student may have added −3x + x = −2x (using the wrong sign on the added term).',
      B: '2x² − 4x + 1 results from forgetting to add x² when combining: the student correctly simplified the fraction to 2x² − 3x + 1, then added only −x but not the x² term, giving 2x² − 4x + 1.',
      D: '3x² − 2x − 1 has the wrong x-coefficient (−2x instead of −4x) and wrong constant (−1 instead of +1). This combines the −2x error from choice A with a sign error on the constant: treating +1 − x as −1 for some arithmetic reason.',
    },
  },

  // ─── Q14 — hard — PSDA | Inference from sample statistics and margin of error | MC: B
  // 95% CI = 54% ± 4% = [50%, 58%].
  {
    id: 'sat-f6-v2-math-m2h-q14',
    section: 'math',
    moduleId: 'f6v2-math-module-2-hard',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Inference from sample statistics and margin of error',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'A polling organization surveyed a random sample of 600 registered voters and found that 54% support a new transit measure, with a margin of error of ±4 percentage points at a 95% confidence level. Which of the following is the most appropriate conclusion?',
    choices: [
      { label: 'A', text: 'Exactly 54% of all registered voters support the measure.' },
      { label: 'B', text: 'The organization can be 95% confident that the true proportion of all registered voters who support the measure is between 50% and 58%.' },
      { label: 'C', text: 'If the survey were repeated, exactly 95% of registered voters would express support.' },
      { label: 'D', text: 'Because 54% exceeds 50%, the measure is guaranteed to pass.' },
    ],
    correctAnswer: 'B',
    explanation:
      'A 95% confidence interval is sample proportion ± margin of error: 54% ± 4% = [50%, 58%]. The correct interpretation is that we are 95% confident the true population proportion falls in this interval. Margin of error accounts for sampling variability — the estimate is not exact and outcomes are not guaranteed.',
    wrongAnswerExplanations: {
      A: '"Exactly 54%" ignores the margin of error. The margin of error quantifies sampling uncertainty; the true proportion could be anywhere from 50% to 58%.',
      C: 'The 95% confidence level refers to the reliability of the estimation procedure over many repeated samples, not to voter behavior. It does not mean 95% of voters support the measure.',
      D: 'Statistical inference cannot guarantee election outcomes. Furthermore, the lower bound of the confidence interval is exactly 50%, meaning majority support is not certain even within the interval.',
    },
  },

  // ─── Q15 — hard — Advanced Math | Nonlinear equations in one variable | MC: D
  // 2/(x−1) + 3/(x+2) = 1, x ≠ 1, x ≠ −2.
  // Multiply by (x−1)(x+2): 2(x+2) + 3(x−1) = (x−1)(x+2)
  // 5x + 1 = x² + x − 2 → x² − 4x − 3 = 0.
  // Product of solutions (Vieta's): c/a = −3.
  {
    id: 'sat-f6-v2-math-m2h-q15',
    section: 'math',
    moduleId: 'f6v2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Nonlinear equations in one variable and systems of equations in two variables',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'The equation 2/(x − 1) + 3/(x + 2) = 1 has two real solutions (where x ≠ 1 and x ≠ −2). What is the product of those two solutions?',
    choices: [
      { label: 'A', text: '−7' },
      { label: 'B', text: '−4' },
      { label: 'C', text: '3' },
      { label: 'D', text: '−3' },
    ],
    correctAnswer: 'D',
    explanation:
      "Multiply both sides by (x − 1)(x + 2): 2(x + 2) + 3(x − 1) = (x − 1)(x + 2). Expand: 2x + 4 + 3x − 3 = x² + x − 2 → 5x + 1 = x² + x − 2 → x² − 4x − 3 = 0. By Vieta's formulas, the product of the roots equals the constant term c/a = −3/1 = −3. Check both solutions are not excluded: solutions are 2 ± √7 ≈ 4.65 and −0.65, neither equal to 1 or −2 ✓.",
    wrongAnswerExplanations: {
      A: 'Product = −7 does not match any Vieta computation from x² − 4x − 3 = 0. This may arise from multiplying the denominators: (x−1)(x+2) → x² + x − 2, then misreading the constant as −7.',
      B: 'Product = −4 is the coefficient of x in the quadratic (i.e., the sum of the roots by Vieta\'s is 4, not the product). The student confused Vieta\'s formula for sum (−b/a = 4) with the formula for product (c/a = −3).',
      C: 'Product = 3 is the absolute value of the correct answer. The student found |c| = 3 but lost the negative sign when rearranging 5x + 1 = x² + x − 2, perhaps writing x² − 4x + 3 = 0 with +3 instead of −3.',
    },
  },

  // ─── Q16 — hard — Geometry and Trigonometry | Right triangles and trigonometry | MC: A
  // 30-60-90 triangle, hypotenuse = 16.
  // Opposite 30° = 16 × sin30° = 16 × 1/2 = 8.
  {
    id: 'sat-f6-v2-math-m2h-q16',
    section: 'math',
    moduleId: 'f6v2-math-module-2-hard',
    domain: 'Geometry and Trigonometry',
    skill: 'Right triangles and trigonometry',
    difficulty: 'hard',
    type: 'multiple_choice',
    question:
      'In a right triangle, one acute angle measures 30° and the hypotenuse has length 16. What is the length of the side opposite the 30° angle?',
    choices: [
      { label: 'A', text: '8' },
      { label: 'B', text: '8√3' },
      { label: 'C', text: '16√3' },
      { label: 'D', text: '16√2' },
    ],
    correctAnswer: 'A',
    explanation:
      'In a right triangle, sin(30°) = opposite/hypotenuse = 1/2. So opposite = 16 × (1/2) = 8. This also follows from the 30-60-90 side ratios 1 : √3 : 2; with hypotenuse 16 (the "2" part), the shortest side opposite 30° is 16/2 = 8.',
    wrongAnswerExplanations: {
      B: '8√3 is the side adjacent to the 30° angle (opposite the 60° angle): cos(30°) × 16 = (√3/2) × 16 = 8√3. This is the longer leg, not the one opposite 30°.',
      C: '16√3 results from multiplying the full hypotenuse by √3 rather than by 1/2. This would occur if the student used the cos(30°) ratio but incorrectly applied it to the hypotenuse as a multiplier.',
      D: '16√2 uses the ratio for a 45-45-90 triangle (sin45° = √2/2), applying the wrong triangle type. The leg of a 45-45-90 triangle with hypotenuse 16 would be 16 × (√2/2) = 8√2, but choice D says 16√2, which is yet another factor-of-2 error.',
    },
  },

  // ─── Q17 — hard — grid_in — Algebra | Systems of two linear equations | ───────
  // 3x + 2y = 16 and x − y = 2.
  // x = y + 2; 3(y+2) + 2y = 16 → 5y = 10 → y = 2; x = 4. xy = 8.
  {
    id: 'sat-f6-v2-math-m2h-q17',
    section: 'math',
    moduleId: 'f6v2-math-module-2-hard',
    domain: 'Algebra',
    skill: 'Systems of two linear equations in two variables',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'In the system of equations below, what is the value of xy?\n\n3x + 2y = 16\nx − y = 2',
    correctAnswer: '8',
    acceptableAnswers: ['8'],
    explanation:
      'From the second equation: x = y + 2. Substitute into the first: 3(y + 2) + 2y = 16 → 3y + 6 + 2y = 16 → 5y = 10 → y = 2. Then x = 2 + 2 = 4. Verify: 3(4) + 2(2) = 12 + 4 = 16 ✓ and 4 − 2 = 2 ✓. Therefore xy = (4)(2) = 8.',
    scoringNotes: 'Answer must be 8.',
  },

  // ─── Q18 — hard — grid_in — PSDA | One-variable data: distributions and measures of center
  // Five scores: 68, 75, 82, 90, 95. Sum = 410. Mean of 6 scores = 84.
  // 6th score = 84×6 − 410 = 504 − 410 = 94.
  {
    id: 'sat-f6-v2-math-m2h-q18',
    section: 'math',
    moduleId: 'f6v2-math-module-2-hard',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'One-variable data: distributions and measures of center and spread',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      "Five students scored 68, 75, 82, 90, and 95 on a test. A sixth student takes the same test. After the sixth score is included, the mean of all six scores is 84. What is the sixth student's score?",
    correctAnswer: '94',
    acceptableAnswers: ['94'],
    explanation:
      'The mean of six scores is 84, so the total sum must be 84 × 6 = 504. The sum of the five known scores is 68 + 75 + 82 + 90 + 95 = 410. The sixth score = 504 − 410 = 94. Verify: (410 + 94)/6 = 504/6 = 84 ✓.',
    scoringNotes: 'Answer must be 94.',
  },

  // ─── Q19 — hard — grid_in — Advanced Math | Quadratic equations and functions ─
  // Parabola through (0, 3), (1, 0), (3, 0).
  // y = a(x−1)(x−3). At (0,3): 3 = a(−1)(−3) = 3a → a = 1.
  // y = (x−1)(x−3) = x²−4x+3. Vertex at x = 2: y(2) = (1)(−1) = −1. Min = −1.
  {
    id: 'sat-f6-v2-math-m2h-q19',
    section: 'math',
    moduleId: 'f6v2-math-module-2-hard',
    domain: 'Advanced Math',
    skill: 'Quadratic equations and functions',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'A parabola passes through the points (0, 3), (1, 0), and (3, 0). What is the minimum value of the function?',
    correctAnswer: '-1',
    acceptableAnswers: ['-1'],
    explanation:
      'The x-intercepts at x = 1 and x = 3 mean the quadratic is y = a(x − 1)(x − 3). Using (0, 3): 3 = a(0 − 1)(0 − 3) = a(3) → a = 1. So y = (x − 1)(x − 3) = x² − 4x + 3. The axis of symmetry is x = (1 + 3)/2 = 2. The minimum value is y(2) = (2 − 1)(2 − 3) = (1)(−1) = −1.',
    scoringNotes: 'Answer must be −1. Grid as -1.',
  },

  // ─── Q20 — hardest — grid_in — Algebra | Linear inequalities in one or two variables
  // Supplier A: 500 + 12n. Supplier B: 200 + 15n.
  // A < B: 500 + 12n < 200 + 15n → 300 < 3n → n > 100. Min whole number = 101.
  {
    id: 'sat-f6-v2-math-m2h-q20',
    section: 'math',
    moduleId: 'f6v2-math-module-2-hard',
    domain: 'Algebra',
    skill: 'Linear inequalities in one or two variables',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      "A manufacturer can produce widgets using two suppliers. Supplier A charges a fixed setup fee of $500 plus $12 per widget. Supplier B charges a fixed setup fee of $200 plus $15 per widget. What is the minimum whole number of widgets for which Supplier A's total cost is strictly less than Supplier B's total cost?",
    correctAnswer: '101',
    acceptableAnswers: ['101'],
    explanation:
      'Set up the inequality for Supplier A to be cheaper: 500 + 12n < 200 + 15n. Subtract 12n from both sides: 500 < 200 + 3n. Subtract 200: 300 < 3n → n > 100. The minimum whole-number value is n = 101. Check at n = 101: A costs 500 + 12(101) = $1,712 and B costs 200 + 15(101) = $1,715. Indeed 1712 < 1715 ✓. At n = 100: A = $1,700 and B = $1,700 — equal, not strictly less.',
    scoringNotes: 'Answer must be 101.',
  },

  // ─── Q21 — hardest — grid_in — PSDA | Ratios, rates, proportional relationships
  // Distance 1: 120 mi at 60 mph → 2 hrs. Distance 2: 80 mi at 40 mph → 2 hrs.
  // Average speed = 200/4 = 50 mph.
  {
    id: 'sat-f6-v2-math-m2h-q21',
    section: 'math',
    moduleId: 'f6v2-math-module-2-hard',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Ratios, rates, proportional relationships, and units',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'A driver travels the first 120 miles of a trip at an average speed of 60 miles per hour and the remaining 80 miles at an average speed of 40 miles per hour. What is the average speed, in miles per hour, for the entire trip?',
    correctAnswer: '50',
    acceptableAnswers: ['50'],
    explanation:
      'Average speed = total distance ÷ total time. Time for segment 1: 120 ÷ 60 = 2 hours. Time for segment 2: 80 ÷ 40 = 2 hours. Total distance: 200 miles. Total time: 4 hours. Average speed = 200 ÷ 4 = 50 miles per hour.',
    scoringNotes: 'Answer must be 50.',
  },

  // ─── Q22 — hardest — grid_in — Geometry and Trigonometry | Circles ───────────
  // Circle (x−2)² + (y+3)² = 25: center (2,−3), radius 5.
  // Chord length 8: half-chord = 4. d² + 4² = 5² → d = 3.
  {
    id: 'sat-f6-v2-math-m2h-q22',
    section: 'math',
    moduleId: 'f6v2-math-module-2-hard',
    domain: 'Geometry and Trigonometry',
    skill: 'Circles',
    difficulty: 'hard',
    type: 'grid_in',
    question:
      'A circle has equation (x − 2)² + (y + 3)² = 25. A chord of this circle has a length of 8. What is the distance from the center of the circle to this chord?',
    correctAnswer: '3',
    acceptableAnswers: ['3'],
    explanation:
      'The circle has center (2, −3) and radius r = √25 = 5. The perpendicular from the center to a chord bisects the chord, forming a right triangle with legs d (the distance sought) and half the chord length (8/2 = 4), and hypotenuse r = 5. By the Pythagorean theorem: d² + 4² = 5² → d² + 16 = 25 → d² = 9 → d = 3.',
    scoringNotes: 'Answer must be 3.',
  },
]
