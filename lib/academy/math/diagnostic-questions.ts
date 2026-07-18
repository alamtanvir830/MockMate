// Math Academy diagnostic question bank.
// 42 questions — 2 per skill (1 easy + 1 harder) across all 21 skills.
// All content is independently created; not sourced from any third-party test-prep material.

import type { MathSkillSlug } from './skill-mapping'

export const MATH_DIAGNOSTIC_VERSION = 1
export const MATH_DIAGNOSTIC_TOTAL_QUESTIONS = 42

export interface MathDiagnosticQuestion {
  id: string
  skillSlug: MathSkillSlug
  difficulty: 'easy' | 'medium' | 'hard'
  question: string
  stimulus?: string
  choices: { label: 'A' | 'B' | 'C' | 'D'; text: string }[]
  correctAnswer: 'A' | 'B' | 'C' | 'D'
  explanation: string
}

export const MATH_DIAGNOSTIC_QUESTIONS: MathDiagnosticQuestion[] = [

  // ── Algebra: Linear Equations ────────────────────────────────────────────────
  {
    id: 'math-diag-linear-equations-easy',
    skillSlug: 'linear-equations',
    difficulty: 'easy',
    question: 'If 3x + 7 = 22, what is the value of x?',
    choices: [
      { label: 'A', text: '3' },
      { label: 'B', text: '5' },
      { label: 'C', text: '7' },
      { label: 'D', text: '9' },
    ],
    correctAnswer: 'B',
    explanation: 'Subtract 7 from both sides: 3x = 15. Divide by 3: x = 5.',
  },
  {
    id: 'math-diag-linear-equations-hard',
    skillSlug: 'linear-equations',
    difficulty: 'hard',
    question: 'If 2(3x − 4) = 5x + 1, what is the value of x?',
    choices: [
      { label: 'A', text: '7' },
      { label: 'B', text: '9' },
      { label: 'C', text: '11' },
      { label: 'D', text: '13' },
    ],
    correctAnswer: 'B',
    explanation: 'Expand: 6x − 8 = 5x + 1. Subtract 5x: x − 8 = 1. Add 8: x = 9.',
  },

  // ── Algebra: Linear Equations in Two Variables ────────────────────────────────
  {
    id: 'math-diag-linear-equations-two-variables-easy',
    skillSlug: 'linear-equations-two-variables',
    difficulty: 'easy',
    question: 'The equation y = 2x + 3 is graphed in the xy-plane. What is the y-intercept of the graph?',
    choices: [
      { label: 'A', text: '2' },
      { label: 'B', text: '3' },
      { label: 'C', text: '5' },
      { label: 'D', text: '6' },
    ],
    correctAnswer: 'B',
    explanation: 'In y = mx + b, the y-intercept is b. Here b = 3.',
  },
  {
    id: 'math-diag-linear-equations-two-variables-hard',
    skillSlug: 'linear-equations-two-variables',
    difficulty: 'hard',
    question: 'In the xy-plane, the graph of y = kx − 4 passes through the point (3, 5). What is the value of k?',
    choices: [
      { label: 'A', text: '1' },
      { label: 'B', text: '2' },
      { label: 'C', text: '3' },
      { label: 'D', text: '4' },
    ],
    correctAnswer: 'C',
    explanation: 'Substitute x = 3, y = 5: 5 = 3k − 4. Add 4: 9 = 3k. Divide: k = 3.',
  },

  // ── Algebra: Linear Functions ─────────────────────────────────────────────────
  {
    id: 'math-diag-linear-functions-easy',
    skillSlug: 'linear-functions',
    difficulty: 'easy',
    question: 'A car rental company charges a flat fee of $20 plus $0.30 per mile driven. Which equation models the total cost C, in dollars, for driving m miles?',
    choices: [
      { label: 'A', text: 'C = 0.30m' },
      { label: 'B', text: 'C = 20m + 0.30' },
      { label: 'C', text: 'C = 20 + 0.30m' },
      { label: 'D', text: 'C = 20 − 0.30m' },
    ],
    correctAnswer: 'C',
    explanation: 'The flat fee is a constant $20 and the per-mile charge contributes 0.30m, giving C = 20 + 0.30m.',
  },
  {
    id: 'math-diag-linear-functions-hard',
    skillSlug: 'linear-functions',
    difficulty: 'hard',
    question: 'The function f is defined by f(x) = ax + b, where a and b are constants. If f(2) = 5 and f(6) = 13, what is the value of a + b?',
    choices: [
      { label: 'A', text: '2' },
      { label: 'B', text: '3' },
      { label: 'C', text: '4' },
      { label: 'D', text: '5' },
    ],
    correctAnswer: 'B',
    explanation: 'From f(2) = 5: 2a + b = 5. From f(6) = 13: 6a + b = 13. Subtract: 4a = 8, so a = 2. Then b = 5 − 4 = 1. a + b = 3.',
  },

  // ── Algebra: Systems of Equations ────────────────────────────────────────────
  {
    id: 'math-diag-systems-of-equations-easy',
    skillSlug: 'systems-of-equations',
    difficulty: 'easy',
    question: 'In the system of equations x + y = 10 and x − y = 4, what is the value of x?',
    choices: [
      { label: 'A', text: '3' },
      { label: 'B', text: '5' },
      { label: 'C', text: '7' },
      { label: 'D', text: '9' },
    ],
    correctAnswer: 'C',
    explanation: 'Add the equations: 2x = 14, so x = 7.',
  },
  {
    id: 'math-diag-systems-of-equations-hard',
    skillSlug: 'systems-of-equations',
    difficulty: 'hard',
    question: 'In the system 2x + 3y = 12 and 4x + 6y = k, for what value of k does the system have infinitely many solutions?',
    choices: [
      { label: 'A', text: '6' },
      { label: 'B', text: '12' },
      { label: 'C', text: '18' },
      { label: 'D', text: '24' },
    ],
    correctAnswer: 'D',
    explanation: 'For infinitely many solutions the second equation must be a multiple of the first. Multiplying the first by 2 gives 4x + 6y = 24, so k = 24.',
  },

  // ── Algebra: Linear Inequalities ─────────────────────────────────────────────
  {
    id: 'math-diag-linear-inequalities-easy',
    skillSlug: 'linear-inequalities',
    difficulty: 'easy',
    question: 'If 4x − 3 > 9, what is the least integer value of x?',
    choices: [
      { label: 'A', text: '2' },
      { label: 'B', text: '3' },
      { label: 'C', text: '4' },
      { label: 'D', text: '5' },
    ],
    correctAnswer: 'C',
    explanation: 'Add 3: 4x > 12. Divide by 4: x > 3. The least integer greater than 3 is 4.',
  },
  {
    id: 'math-diag-linear-inequalities-hard',
    skillSlug: 'linear-inequalities',
    difficulty: 'hard',
    question: 'A store sells notebooks for $3 each and pens for $1.50 each. Jada has at most $15 to spend. If she buys 2 notebooks, what is the maximum number of pens she can buy?',
    choices: [
      { label: 'A', text: '4' },
      { label: 'B', text: '5' },
      { label: 'C', text: '6' },
      { label: 'D', text: '7' },
    ],
    correctAnswer: 'C',
    explanation: '2(3) + 1.50p ≤ 15 → 6 + 1.50p ≤ 15 → 1.50p ≤ 9 → p ≤ 6.',
  },

  // ── Advanced Math: Equivalent Expressions ────────────────────────────────────
  {
    id: 'math-diag-equivalent-expressions-easy',
    skillSlug: 'equivalent-expressions',
    difficulty: 'easy',
    question: 'Which expression is equivalent to 3x² + 6x?',
    choices: [
      { label: 'A', text: '3x(x + 6)' },
      { label: 'B', text: '3x(x + 2)' },
      { label: 'C', text: '3(x² + 6)' },
      { label: 'D', text: '6x(x + 1)' },
    ],
    correctAnswer: 'B',
    explanation: 'Factor out the GCF of 3x: 3x(x + 2).',
  },
  {
    id: 'math-diag-equivalent-expressions-hard',
    skillSlug: 'equivalent-expressions',
    difficulty: 'hard',
    question: 'Which expression is equivalent to (2x + 3)² − (2x − 3)²?',
    choices: [
      { label: 'A', text: '24x' },
      { label: 'B', text: '8x² + 18' },
      { label: 'C', text: '12x' },
      { label: 'D', text: '4x² − 9' },
    ],
    correctAnswer: 'A',
    explanation: 'Using the identity (a + b)² − (a − b)² = 4ab with a = 2x and b = 3: 4(2x)(3) = 24x.',
  },

  // ── Advanced Math: Quadratic Equations & Functions ───────────────────────────
  {
    id: 'math-diag-quadratic-equations-easy',
    skillSlug: 'quadratic-equations',
    difficulty: 'easy',
    question: 'What are the solutions to x² − 5x + 6 = 0?',
    choices: [
      { label: 'A', text: 'x = 1 and x = 6' },
      { label: 'B', text: 'x = 2 and x = 3' },
      { label: 'C', text: 'x = −2 and x = −3' },
      { label: 'D', text: 'x = −1 and x = −6' },
    ],
    correctAnswer: 'B',
    explanation: 'Factor: (x − 2)(x − 3) = 0, so x = 2 or x = 3.',
  },
  {
    id: 'math-diag-quadratic-equations-hard',
    skillSlug: 'quadratic-equations',
    difficulty: 'hard',
    question: 'The function f is defined by f(x) = x² − 6x + 5. For what value of x does f reach its minimum?',
    choices: [
      { label: 'A', text: '2' },
      { label: 'B', text: '3' },
      { label: 'C', text: '4' },
      { label: 'D', text: '5' },
    ],
    correctAnswer: 'B',
    explanation: 'The x-coordinate of the vertex is −b/(2a) = 6/(2·1) = 3.',
  },

  // ── Advanced Math: Exponential Functions ─────────────────────────────────────
  {
    id: 'math-diag-exponential-functions-easy',
    skillSlug: 'exponential-functions',
    difficulty: 'easy',
    question: 'A bank account starts with $1,000 and grows at a rate of 5% per year. Which expression represents the value after t years?',
    choices: [
      { label: 'A', text: '1000(1.5)^t' },
      { label: 'B', text: '1000 + 0.05t' },
      { label: 'C', text: '1000(1.05)^t' },
      { label: 'D', text: '1000(0.95)^t' },
    ],
    correctAnswer: 'C',
    explanation: 'Compound growth: P(1 + r)^t = 1000(1.05)^t. Choice D would model decay.',
  },
  {
    id: 'math-diag-exponential-functions-hard',
    skillSlug: 'exponential-functions',
    difficulty: 'hard',
    question: 'The function f(x) = 3 · 2^x is doubled to form g(x), where g(x) = f(x + k). What is the value of k?',
    choices: [
      { label: 'A', text: '1' },
      { label: 'B', text: '2' },
      { label: 'C', text: '3' },
      { label: 'D', text: '6' },
    ],
    correctAnswer: 'A',
    explanation: 'g(x) = 2 · f(x) = 6 · 2^x. f(x + k) = 3 · 2^(x+k) = 3 · 2^k · 2^x. For this to equal 6 · 2^x, we need 3 · 2^k = 6, so 2^k = 2 and k = 1.',
  },

  // ── Advanced Math: Polynomial Expressions ────────────────────────────────────
  {
    id: 'math-diag-polynomial-expressions-easy',
    skillSlug: 'polynomial-expressions',
    difficulty: 'easy',
    question: 'What is the degree of the polynomial 4x³ − 2x² + x − 7?',
    choices: [
      { label: 'A', text: '1' },
      { label: 'B', text: '2' },
      { label: 'C', text: '3' },
      { label: 'D', text: '4' },
    ],
    correctAnswer: 'C',
    explanation: 'The degree is the highest power of the variable. Here the highest power is 3.',
  },
  {
    id: 'math-diag-polynomial-expressions-hard',
    skillSlug: 'polynomial-expressions',
    difficulty: 'hard',
    question: 'Which expression is equivalent to (x² + 3x − 2)(x − 1)?',
    choices: [
      { label: 'A', text: 'x³ + 2x² − 5x + 2' },
      { label: 'B', text: 'x³ + 2x² + 5x − 2' },
      { label: 'C', text: 'x³ − 4x² + 5x − 2' },
      { label: 'D', text: 'x³ + 4x² − 5x + 2' },
    ],
    correctAnswer: 'A',
    explanation: 'Distribute: x³ − x² + 3x² − 3x − 2x + 2 = x³ + 2x² − 5x + 2.',
  },

  // ── Advanced Math: Radical & Rational Equations ──────────────────────────────
  {
    id: 'math-diag-radical-rational-equations-easy',
    skillSlug: 'radical-rational-equations',
    difficulty: 'easy',
    question: 'What is the value of √49 + √16?',
    choices: [
      { label: 'A', text: '√65' },
      { label: 'B', text: '9' },
      { label: 'C', text: '11' },
      { label: 'D', text: '13' },
    ],
    correctAnswer: 'C',
    explanation: '√49 = 7 and √16 = 4. Their sum is 7 + 4 = 11.',
  },
  {
    id: 'math-diag-radical-rational-equations-hard',
    skillSlug: 'radical-rational-equations',
    difficulty: 'hard',
    question: 'If 2/x + 3/x = 5, what is the value of x?',
    choices: [
      { label: 'A', text: '1' },
      { label: 'B', text: '2' },
      { label: 'C', text: '3' },
      { label: 'D', text: '5' },
    ],
    correctAnswer: 'A',
    explanation: 'Combine the fractions: (2 + 3)/x = 5, so 5/x = 5, which gives x = 1.',
  },

  // ── Advanced Math: Nonlinear Equations & Systems ─────────────────────────────
  {
    id: 'math-diag-nonlinear-equations-systems-easy',
    skillSlug: 'nonlinear-equations-systems',
    difficulty: 'easy',
    question: 'For what value(s) of x does x² = 16?',
    choices: [
      { label: 'A', text: 'x = 4 only' },
      { label: 'B', text: 'x = −4 only' },
      { label: 'C', text: 'x = 4 and x = −4' },
      { label: 'D', text: 'x = 8 and x = −8' },
    ],
    correctAnswer: 'C',
    explanation: 'x² = 16 means x = √16 = ±4. Both values satisfy the equation.',
  },
  {
    id: 'math-diag-nonlinear-equations-systems-hard',
    skillSlug: 'nonlinear-equations-systems',
    difficulty: 'hard',
    question: 'In the system y = x² and y = x + 6, which values of x are solutions?',
    choices: [
      { label: 'A', text: 'x = −2 and x = 3' },
      { label: 'B', text: 'x = 2 and x = −3' },
      { label: 'C', text: 'x = 6 and x = −1' },
      { label: 'D', text: 'x = −6 and x = 1' },
    ],
    correctAnswer: 'A',
    explanation: 'Substitute: x² = x + 6 → x² − x − 6 = 0 → (x − 3)(x + 2) = 0 → x = 3 or x = −2.',
  },

  // ── PSDA: Ratios, Rates & Units ───────────────────────────────────────────────
  {
    id: 'math-diag-ratios-rates-units-easy',
    skillSlug: 'ratios-rates-units',
    difficulty: 'easy',
    question: 'A car travels 180 miles in 3 hours. What is the car\'s average speed in miles per hour?',
    choices: [
      { label: 'A', text: '45 mph' },
      { label: 'B', text: '60 mph' },
      { label: 'C', text: '75 mph' },
      { label: 'D', text: '90 mph' },
    ],
    correctAnswer: 'B',
    explanation: 'Speed = distance ÷ time = 180 ÷ 3 = 60 mph.',
  },
  {
    id: 'math-diag-ratios-rates-units-hard',
    skillSlug: 'ratios-rates-units',
    difficulty: 'hard',
    question: 'A recipe uses 2.5 cups of flour for every 12 cookies. How many cups of flour are needed to make 60 cookies?',
    choices: [
      { label: 'A', text: '10.5' },
      { label: 'B', text: '12' },
      { label: 'C', text: '12.5' },
      { label: 'D', text: '15' },
    ],
    correctAnswer: 'C',
    explanation: 'Set up a proportion: 2.5/12 = x/60. Cross-multiply: 12x = 150. x = 12.5 cups.',
  },

  // ── PSDA: Percentages ─────────────────────────────────────────────────────────
  {
    id: 'math-diag-percentages-easy',
    skillSlug: 'percentages',
    difficulty: 'easy',
    question: 'A jacket is originally priced at $80. It is on sale for 25% off. What is the sale price?',
    choices: [
      { label: 'A', text: '$20' },
      { label: 'B', text: '$55' },
      { label: 'C', text: '$60' },
      { label: 'D', text: '$65' },
    ],
    correctAnswer: 'C',
    explanation: 'Discount = 80 × 0.25 = $20. Sale price = 80 − 20 = $60.',
  },
  {
    id: 'math-diag-percentages-hard',
    skillSlug: 'percentages',
    difficulty: 'hard',
    question: 'A population increased from 4,000 to 5,200. What was the percent increase?',
    choices: [
      { label: 'A', text: '23%' },
      { label: 'B', text: '25%' },
      { label: 'C', text: '28%' },
      { label: 'D', text: '30%' },
    ],
    correctAnswer: 'D',
    explanation: 'Percent increase = (5200 − 4000)/4000 × 100 = 1200/4000 × 100 = 30%.',
  },

  // ── PSDA: One-Variable Data ───────────────────────────────────────────────────
  {
    id: 'math-diag-one-variable-data-easy',
    skillSlug: 'one-variable-data',
    difficulty: 'easy',
    question: 'What is the mode of the data set {3, 5, 7, 7, 8}?',
    choices: [
      { label: 'A', text: '5' },
      { label: 'B', text: '6' },
      { label: 'C', text: '7' },
      { label: 'D', text: '8' },
    ],
    correctAnswer: 'C',
    explanation: '7 appears twice, more than any other value, so it is the mode.',
  },
  {
    id: 'math-diag-one-variable-data-hard',
    skillSlug: 'one-variable-data',
    difficulty: 'hard',
    question: 'The mean of the data set {6, 8, 10, x, 12} is 9. What is the value of x?',
    choices: [
      { label: 'A', text: '7' },
      { label: 'B', text: '8' },
      { label: 'C', text: '9' },
      { label: 'D', text: '10' },
    ],
    correctAnswer: 'C',
    explanation: '(6 + 8 + 10 + x + 12)/5 = 9 → 36 + x = 45 → x = 9.',
  },

  // ── PSDA: Two-Variable Data & Models ─────────────────────────────────────────
  {
    id: 'math-diag-two-variable-data-easy',
    skillSlug: 'two-variable-data',
    difficulty: 'easy',
    question: 'In a scatterplot showing a positive association, as x increases, y generally:',
    choices: [
      { label: 'A', text: 'Decreases' },
      { label: 'B', text: 'Stays the same' },
      { label: 'C', text: 'Increases' },
      { label: 'D', text: 'First increases, then decreases' },
    ],
    correctAnswer: 'C',
    explanation: 'A positive association means the two variables tend to increase together.',
  },
  {
    id: 'math-diag-two-variable-data-hard',
    skillSlug: 'two-variable-data',
    difficulty: 'hard',
    question: 'The line of best fit for a data set passes through (0, 4) and (5, 14). What is the slope of the line?',
    choices: [
      { label: 'A', text: '1.5' },
      { label: 'B', text: '2' },
      { label: 'C', text: '2.5' },
      { label: 'D', text: '3' },
    ],
    correctAnswer: 'B',
    explanation: 'Slope = (14 − 4)/(5 − 0) = 10/5 = 2.',
  },

  // ── PSDA: Probability ─────────────────────────────────────────────────────────
  {
    id: 'math-diag-probability-easy',
    skillSlug: 'probability',
    difficulty: 'easy',
    question: 'A bag contains 3 red marbles and 7 blue marbles. If one marble is drawn at random, what is the probability it is red?',
    choices: [
      { label: 'A', text: '3/10' },
      { label: 'B', text: '7/10' },
      { label: 'C', text: '3/7' },
      { label: 'D', text: '1/3' },
    ],
    correctAnswer: 'A',
    explanation: 'P(red) = 3/(3 + 7) = 3/10.',
  },
  {
    id: 'math-diag-probability-hard',
    skillSlug: 'probability',
    difficulty: 'hard',
    question: 'A student randomly guesses on all 5 questions of a multiple-choice quiz, where each question has 4 options and exactly one correct answer. What is the probability of answering all 5 questions correctly?',
    choices: [
      { label: 'A', text: '1/64' },
      { label: 'B', text: '1/256' },
      { label: 'C', text: '1/512' },
      { label: 'D', text: '1/1024' },
    ],
    correctAnswer: 'D',
    explanation: 'Each question has a 1/4 chance of being correct. For all 5: (1/4)^5 = 1/1024.',
  },

  // ── PSDA: Statistical Claims & Inference ──────────────────────────────────────
  {
    id: 'math-diag-statistical-claims-easy',
    skillSlug: 'statistical-claims',
    difficulty: 'easy',
    question: 'A researcher surveys 100 students at one high school and finds that 60 prefer science to math. Which conclusion is best supported?',
    choices: [
      { label: 'A', text: 'All students in the country prefer science to math' },
      { label: 'B', text: 'Exactly 60% of all high school students prefer science to math' },
      { label: 'C', text: 'About 60% of students at that school may prefer science to math' },
      { label: 'D', text: 'The sample is too small to draw any conclusion' },
    ],
    correctAnswer: 'C',
    explanation: 'Survey results can be generalised only to the population that was sampled — in this case, students at that specific school.',
  },
  {
    id: 'math-diag-statistical-claims-hard',
    skillSlug: 'statistical-claims',
    difficulty: 'hard',
    question: 'A study finds that students who eat breakfast score higher on tests. Which conclusion is most appropriate?',
    choices: [
      { label: 'A', text: 'Eating breakfast causes higher test scores' },
      { label: 'B', text: 'Higher test scores cause students to eat breakfast' },
      { label: 'C', text: 'There is an association between eating breakfast and test scores, but causation cannot be determined from this study' },
      { label: 'D', text: 'Any student who eats breakfast will score higher on tests' },
    ],
    correctAnswer: 'C',
    explanation: 'Observational studies can show association but cannot establish causation because of potential confounding variables.',
  },

  // ── Geometry: Area & Volume ───────────────────────────────────────────────────
  {
    id: 'math-diag-area-volume-easy',
    skillSlug: 'area-volume',
    difficulty: 'easy',
    question: 'A rectangle has a length of 8 cm and a width of 5 cm. What is the area of the rectangle?',
    choices: [
      { label: 'A', text: '13 cm²' },
      { label: 'B', text: '26 cm²' },
      { label: 'C', text: '40 cm²' },
      { label: 'D', text: '80 cm²' },
    ],
    correctAnswer: 'C',
    explanation: 'Area = length × width = 8 × 5 = 40 cm².',
  },
  {
    id: 'math-diag-area-volume-hard',
    skillSlug: 'area-volume',
    difficulty: 'hard',
    question: 'A cylinder has a radius of 3 and a height of 10. What is its volume, in terms of π?',
    choices: [
      { label: 'A', text: '30π' },
      { label: 'B', text: '60π' },
      { label: 'C', text: '90π' },
      { label: 'D', text: '120π' },
    ],
    correctAnswer: 'C',
    explanation: 'V = πr²h = π(3²)(10) = 90π.',
  },

  // ── Geometry: Lines, Angles & Triangles ───────────────────────────────────────
  {
    id: 'math-diag-lines-angles-triangles-easy',
    skillSlug: 'lines-angles-triangles',
    difficulty: 'easy',
    question: 'In triangle ABC, angle A = 45° and angle B = 75°. What is the measure of angle C?',
    choices: [
      { label: 'A', text: '50°' },
      { label: 'B', text: '55°' },
      { label: 'C', text: '60°' },
      { label: 'D', text: '65°' },
    ],
    correctAnswer: 'C',
    explanation: 'The angles of a triangle sum to 180°. C = 180 − 45 − 75 = 60°.',
  },
  {
    id: 'math-diag-lines-angles-triangles-hard',
    skillSlug: 'lines-angles-triangles',
    difficulty: 'hard',
    question: 'Two parallel lines are cut by a transversal. One of the co-interior (same-side interior) angles measures 110°. What is the measure of the other co-interior angle?',
    choices: [
      { label: 'A', text: '70°' },
      { label: 'B', text: '80°' },
      { label: 'C', text: '100°' },
      { label: 'D', text: '110°' },
    ],
    correctAnswer: 'A',
    explanation: 'Co-interior angles between parallel lines are supplementary: 180° − 110° = 70°.',
  },

  // ── Geometry: Right Triangles & Trigonometry ──────────────────────────────────
  {
    id: 'math-diag-right-triangles-trig-easy',
    skillSlug: 'right-triangles-trig',
    difficulty: 'easy',
    question: 'In a right triangle, the hypotenuse is 13 and one leg is 5. What is the length of the other leg?',
    choices: [
      { label: 'A', text: '8' },
      { label: 'B', text: '10' },
      { label: 'C', text: '12' },
      { label: 'D', text: '14' },
    ],
    correctAnswer: 'C',
    explanation: 'By the Pythagorean theorem: 5² + b² = 13² → 25 + b² = 169 → b² = 144 → b = 12.',
  },
  {
    id: 'math-diag-right-triangles-trig-hard',
    skillSlug: 'right-triangles-trig',
    difficulty: 'hard',
    question: 'In a right triangle, the side opposite angle θ has length 3 and the hypotenuse has length 5. What is sin(θ)?',
    choices: [
      { label: 'A', text: '3/4' },
      { label: 'B', text: '4/5' },
      { label: 'C', text: '3/5' },
      { label: 'D', text: '5/3' },
    ],
    correctAnswer: 'C',
    explanation: 'sin(θ) = opposite/hypotenuse = 3/5.',
  },

  // ── Geometry: Circles ─────────────────────────────────────────────────────────
  {
    id: 'math-diag-circles-easy',
    skillSlug: 'circles',
    difficulty: 'easy',
    question: 'What is the circumference of a circle with radius 7, in terms of π?',
    choices: [
      { label: 'A', text: '7π' },
      { label: 'B', text: '14π' },
      { label: 'C', text: '49π' },
      { label: 'D', text: '98π' },
    ],
    correctAnswer: 'B',
    explanation: 'C = 2πr = 2π(7) = 14π.',
  },
  {
    id: 'math-diag-circles-hard',
    skillSlug: 'circles',
    difficulty: 'hard',
    question: 'A circle has a center at (2, 3) and passes through the point (6, 3). What is the area of the circle, in terms of π?',
    choices: [
      { label: 'A', text: '4π' },
      { label: 'B', text: '8π' },
      { label: 'C', text: '16π' },
      { label: 'D', text: '32π' },
    ],
    correctAnswer: 'C',
    explanation: 'The radius is the distance from (2, 3) to (6, 3): r = |6 − 2| = 4. Area = πr² = π(4²) = 16π.',
  },
]

// ── Registry ───────────────────────────────────────────────────────────────────

export interface MathDiagnosticQuestionMeta {
  correctAnswer: string
  skillSlug: MathSkillSlug
  difficulty: string
  domainSlug: string
}

let _registry: Map<string, MathDiagnosticQuestionMeta> | null = null

export function getMathDiagnosticRegistry(): Map<string, MathDiagnosticQuestionMeta> {
  if (_registry) return _registry
  _registry = new Map()
  for (const q of MATH_DIAGNOSTIC_QUESTIONS) {
    _registry.set(q.id, {
      correctAnswer: q.correctAnswer,
      skillSlug: q.skillSlug,
      difficulty: q.difficulty,
      domainSlug: skillToDomain(q.skillSlug),
    })
  }
  return _registry
}

function skillToDomain(slug: MathSkillSlug): string {
  const ALGEBRA = ['linear-equations', 'linear-equations-two-variables', 'linear-functions', 'systems-of-equations', 'linear-inequalities']
  const ADV = ['equivalent-expressions', 'quadratic-equations', 'exponential-functions', 'polynomial-expressions', 'radical-rational-equations', 'nonlinear-equations-systems']
  const PSDA = ['ratios-rates-units', 'percentages', 'one-variable-data', 'two-variable-data', 'probability', 'statistical-claims']
  if (ALGEBRA.includes(slug)) return 'algebra'
  if (ADV.includes(slug)) return 'advanced-math'
  if (PSDA.includes(slug)) return 'problem-solving-data-analysis'
  return 'geometry-trigonometry'
}

export const MATH_DOMAIN_TITLES: Record<string, string> = {
  'algebra': 'Algebra',
  'advanced-math': 'Advanced Math',
  'problem-solving-data-analysis': 'Problem-Solving & Data Analysis',
  'geometry-trigonometry': 'Geometry & Trigonometry',
}
