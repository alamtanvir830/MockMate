import type { QBQuestion } from '../types'

export const mathQuestionsB5a: QBQuestion[] = [
  // ─────────────────────────────────────────────────────────────────────────────
  // ALGEBRA — Linear equations in one variable (math-b5a-001 to math-b5a-008)
  // ─────────────────────────────────────────────────────────────────────────────

  {
    // No solution: (k−1)x − 4x = k+15 → (k−5)x = k+15. k=5 → 0=20. ✓
    id: 'math-b5a-001',
    test: 'SAT',
    section: 'math',
    domain: 'Algebra',
    skill: 'Linear equations in one variable',
    difficulty: 'hard',
    timeTargetSeconds: 75,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    question: `For what value of k does the equation (k − 1)x − 15 = 4x + k have no solution?`,
    choices: [
      { label: 'A', text: '−5' },
      { label: 'B', text: '1' },
      { label: 'C', text: '3' },
      { label: 'D', text: '5' },
    ],
    correctAnswer: 'D',
    explanation: `Collect x-terms on the left: (k − 1)x − 4x = k + 15, giving (k − 5)x = k + 15. A linear equation has no solution when the coefficient of x is zero but the constant side is nonzero. Setting k − 5 = 0 gives k = 5. Substituting back yields 0 · x = 20, i.e., 0 = 20, which is a contradiction. Therefore k = 5 produces no solution.`,
    teachingPoint: `An equation has no solution when the variable terms cancel (coefficient equals zero) but the constants produce a false statement. Set the x-coefficient equal to zero and verify the remaining equation is a contradiction.`,
    relatedSkills: ['Systems of two linear equations in two variables'],
  },

  {
    // Infinitely many solutions: left 2x−19, right 2x−14−c. Match constants: −19=−14−c → c=5. ✓
    id: 'math-b5a-002',
    test: 'SAT',
    section: 'math',
    domain: 'Algebra',
    skill: 'Linear equations in one variable',
    difficulty: 'hard',
    timeTargetSeconds: 80,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    question: `If 3(2x − 5) − 4(x + 1) = 2(x − 7) − c has infinitely many solutions, what is the value of c?`,
    choices: [
      { label: 'A', text: '−5' },
      { label: 'B', text: '1' },
      { label: 'C', text: '3' },
      { label: 'D', text: '5' },
    ],
    correctAnswer: 'D',
    explanation: `Expand the left side: 6x − 15 − 4x − 4 = 2x − 19. Expand the right side: 2x − 14 − c. The equation is 2x − 19 = 2x − 14 − c. For infinitely many solutions the equation must be an identity, so the constants must match: −19 = −14 − c, giving c = −14 + 19 = 5. Verify: both sides become 2x − 19, which is true for all x.`,
    teachingPoint: `For infinitely many solutions, after simplifying both sides the constant terms must be equal as well as the variable coefficients. Equate the constants and solve for the unknown parameter.`,
    relatedSkills: ['Linear equations in two variables'],
  },

  {
    // 2(3x+1)=(5x−3)+4 → 6x+2=5x+1 → x=−1. But choices are positive, so reframe:
    // Use equation: (3x−1)/2 = (x+5)/4 + 1 → multiply by 4: 2(3x−1)=(x+5)+4 → 6x−2=x+9 → 5x=11 → x=11/5. Not clean.
    // Clean: 5x + 7 = 3(x − 1) + 18 → 5x+7=3x+15 → 2x=8 → x=4. ✓ Choices: A=1,B=2,C=3,D=4.
    id: 'math-b5a-003',
    test: 'SAT',
    section: 'math',
    domain: 'Algebra',
    skill: 'Linear equations in one variable',
    difficulty: 'hard',
    timeTargetSeconds: 75,
    mistakeType: 'careless',
    questionType: 'multiple_choice',
    question: `What is the value of x in the equation 5x + 7 = 3(x − 1) + 18?`,
    choices: [
      { label: 'A', text: '1' },
      { label: 'B', text: '2' },
      { label: 'C', text: '3' },
      { label: 'D', text: '4' },
    ],
    correctAnswer: 'D',
    explanation: `Expand the right side: 3x − 3 + 18 = 3x + 15. The equation becomes 5x + 7 = 3x + 15. Subtract 3x from both sides: 2x + 7 = 15. Subtract 7: 2x = 8. Divide by 2: x = 4. Verify: 5(4) + 7 = 27 and 3(4 − 1) + 18 = 9 + 18 = 27 ✓.`,
    teachingPoint: `Expand all parentheses before collecting like terms. Move variable terms to one side and constants to the other, then divide. Always substitute back to verify.`,
    relatedSkills: ['Linear inequalities in one or two variables'],
  },

  {
    // 2(3x+4) − 5(x−2) = 4x − 1 → 6x+8−5x+10 = 4x−1 → x+18=4x−1 → 19=3x → x=19/3. Not clean.
    // Clean: (3x+5)/4 − (x−1)/2 = 2 → multiply by 4: (3x+5)−2(x−1)=8 → 3x+5−2x+2=8 → x+7=8 → x=1. ✓
    id: 'math-b5a-004',
    test: 'SAT',
    section: 'math',
    domain: 'Algebra',
    skill: 'Linear equations in one variable',
    difficulty: 'hard',
    timeTargetSeconds: 80,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    question: `What is the value of x if (3x + 5)/4 − (x − 1)/2 = 2?`,
    choices: [
      { label: 'A', text: '−3' },
      { label: 'B', text: '1' },
      { label: 'C', text: '−1' },
      { label: 'D', text: '3' },
    ],
    correctAnswer: 'B',
    explanation: `Multiply every term by 4 to clear the denominators: (3x + 5) − 2(x − 1) = 8. Expand: 3x + 5 − 2x + 2 = 8, so x + 7 = 8. Therefore x = 1. Verify: (3 + 5)/4 − (1 − 1)/2 = 8/4 − 0 = 2 ✓.`,
    teachingPoint: `Multiply all terms by the LCD to eliminate fractions in one step. Then distribute carefully — especially across subtracted parentheses where the sign must be applied to every term inside.`,
    relatedSkills: ['Systems of two linear equations in two variables'],
  },

  {
    // Infinitely many solutions: 2(3x−4)=6x−k → 6x−8=6x−k → −8=−k → k=8. ✓
    id: 'math-b5a-005',
    test: 'SAT',
    section: 'math',
    domain: 'Algebra',
    skill: 'Linear equations in one variable',
    difficulty: 'hard',
    timeTargetSeconds: 75,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    question: `The equation 2(3x − 4) = 6x − k has infinitely many solutions. What is the value of k?`,
    choices: [
      { label: 'A', text: '−8' },
      { label: 'B', text: '−4' },
      { label: 'C', text: '4' },
      { label: 'D', text: '8' },
    ],
    correctAnswer: 'D',
    explanation: `Expand the left side: 6x − 8 = 6x − k. The x-coefficients already match. For infinitely many solutions the constants must also match: −8 = −k, so k = 8. The equation then reads 6x − 8 = 6x − 8, an identity true for all x.`,
    teachingPoint: `An equation has infinitely many solutions when it simplifies to a true identity. After expanding, match both the variable coefficients and the constant terms to determine the value of any unknown parameter.`,
    relatedSkills: ['Linear equations in two variables'],
  },

  {
    // 4(x+3)−2(3x−1) = 6 → 4x+12−6x+2=6 → −2x+14=6 → −2x=−8 → x=4. ✓
    id: 'math-b5a-006',
    test: 'SAT',
    section: 'math',
    domain: 'Algebra',
    skill: 'Linear equations in one variable',
    difficulty: 'hard',
    timeTargetSeconds: 75,
    mistakeType: 'careless',
    questionType: 'multiple_choice',
    question: `What is the value of x in the equation 4(x + 3) − 2(3x − 1) = 6?`,
    choices: [
      { label: 'A', text: '−4' },
      { label: 'B', text: '−2' },
      { label: 'C', text: '2' },
      { label: 'D', text: '4' },
    ],
    correctAnswer: 'D',
    explanation: `Expand: 4x + 12 − 6x + 2 = 6, so −2x + 14 = 6. Subtract 14: −2x = −8. Divide by −2: x = 4. Verify: 4(7) − 2(11) = 28 − 22 = 6 ✓.`,
    teachingPoint: `Distribute each multiplier to every term inside the parentheses, being careful to handle the subtracted group by changing all internal signs. Combine like terms, then isolate the variable.`,
    relatedSkills: ['Linear word problems'],
  },

  {
    // No solution: (a+2)x+5 = ax+8 → 2x = 3 → unique solution for any a.
    // Better: (2a)x + 3 = (a+1)x + 7. x coeff: 2a=a+1 → a=1. Constants: 3≠7 ✓ no solution when a=1.
    id: 'math-b5a-007',
    test: 'SAT',
    section: 'math',
    domain: 'Algebra',
    skill: 'Linear equations in one variable',
    difficulty: 'hard',
    timeTargetSeconds: 80,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    question: `For what value of a does the equation 2ax + 3 = (a + 1)x + 7 have no solution?`,
    choices: [
      { label: 'A', text: '−1' },
      { label: 'B', text: '1' },
      { label: 'C', text: '0' },
      { label: 'D', text: '2' },
    ],
    correctAnswer: 'B',
    explanation: `Collect x-terms: (2a − a − 1)x = 7 − 3, giving (a − 1)x = 4. For no solution the coefficient of x must be zero: a − 1 = 0, so a = 1. With a = 1 the equation becomes 0 · x = 4, i.e., 0 = 4, which is false. Any other value of a yields a unique solution.`,
    teachingPoint: `After collecting variable terms, the coefficient of x controls the number of solutions. Zero coefficient with a nonzero right side gives no solution; zero on both sides gives infinitely many solutions.`,
    relatedSkills: ['Systems of two linear equations in two variables'],
  },

  {
    // (x+1)/3 + (2x−1)/6 = x − 2. Multiply by 6: 2(x+1)+(2x−1)=6x−12 → 2x+2+2x−1=6x−12 → 4x+1=6x−12 → −2x=−13 → x=13/2. Not integer.
    // Try: (x+2)/5 + (x−1)/10 = 2. Multiply by 10: 2(x+2)+(x−1)=20 → 2x+4+x−1=20 → 3x+3=20 → x=17/3. Not integer.
    // Try: (2x+3)/5 + (x−1)/10 = 3. Multiply by 10: 2(2x+3)+(x−1)=30 → 4x+6+x−1=30 → 5x+5=30 → 5x=25 → x=5. ✓
    id: 'math-b5a-008',
    test: 'SAT',
    section: 'math',
    domain: 'Algebra',
    skill: 'Linear equations in one variable',
    difficulty: 'hard',
    timeTargetSeconds: 80,
    mistakeType: 'careless',
    questionType: 'multiple_choice',
    question: `What is the value of x if (2x + 3)/5 + (x − 1)/10 = 3?`,
    choices: [
      { label: 'A', text: '3' },
      { label: 'B', text: '4' },
      { label: 'C', text: '5' },
      { label: 'D', text: '6' },
    ],
    correctAnswer: 'C',
    explanation: `Multiply every term by 10 (the LCD of 5 and 10): 2(2x + 3) + (x − 1) = 30. Expand: 4x + 6 + x − 1 = 30, so 5x + 5 = 30. Subtract 5: 5x = 25. Divide by 5: x = 5. Verify: (13)/5 + (4)/10 = 13/5 + 2/5 = 15/5 = 3 ✓.`,
    teachingPoint: `Multiply every term by the LCM of all denominators to clear all fractions simultaneously. Expand carefully and collect like terms before isolating the variable.`,
    relatedSkills: ['Linear inequalities in one or two variables'],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // ALGEBRA — Linear inequalities in one or two variables (math-b5a-009 to math-b5a-013)
  // ─────────────────────────────────────────────────────────────────────────────

  {
    // −3(2x−4)>5x−1 → −6x+12>5x−1 → 13>11x → x<13/11. ✓
    id: 'math-b5a-009',
    test: 'SAT',
    section: 'math',
    domain: 'Algebra',
    skill: 'Linear inequalities in one or two variables',
    difficulty: 'hard',
    timeTargetSeconds: 80,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    question: `Which of the following is the solution to −3(2x − 4) > 5x − 1?`,
    choices: [
      { label: 'A', text: 'x < 13/11' },
      { label: 'B', text: 'x > 13/11' },
      { label: 'C', text: 'x < −11/13' },
      { label: 'D', text: 'x > −11/13' },
    ],
    correctAnswer: 'A',
    explanation: `Expand the left side: −6x + 12 > 5x − 1. Add 6x to both sides: 12 > 11x − 1. Add 1: 13 > 11x. Divide by 11 (positive, so the direction stays the same): x < 13/11. The inequality direction does not flip here.`,
    teachingPoint: `When solving a linear inequality, the direction flips only when multiplying or dividing by a negative number. Move all variable terms to one side by adding or subtracting, then divide by the coefficient of x.`,
    relatedSkills: ['Linear equations in one variable'],
  },

  {
    // Company can spend at most $1,200: 8a+15b ≤ 1,200. ✓
    id: 'math-b5a-010',
    test: 'SAT',
    section: 'math',
    domain: 'Algebra',
    skill: 'Linear inequalities in one or two variables',
    difficulty: 'hard',
    timeTargetSeconds: 85,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    isWordProblem: true,
    question: `A company can spend at most $1,200 on materials. Each unit of Product A costs $8 and each unit of Product B costs $15. If the company orders a units of A and b units of B, which inequality represents all possible orders?`,
    choices: [
      { label: 'A', text: '8a + 15b ≤ 1,200' },
      { label: 'B', text: '8a + 15b ≥ 1,200' },
      { label: 'C', text: '8a + 15b < 1,200' },
      { label: 'D', text: '15a + 8b ≤ 1,200' },
    ],
    correctAnswer: 'A',
    explanation: `The total cost is 8a + 15b dollars. "At most $1,200" means the total cost must be less than or equal to $1,200, so 8a + 15b ≤ 1,200. Choice B reverses the direction. Choice C uses strict inequality (excluding exactly $1,200). Choice D swaps the costs for each product.`,
    teachingPoint: `"At most" translates to ≤ and "at least" translates to ≥. Carefully match each cost to its corresponding product before writing the inequality.`,
    relatedSkills: ['Linear word problems'],
  },

  {
    // −2 ≤ 3x+4 ≤ 10 → −6 ≤ 3x ≤ 6 → −2 ≤ x ≤ 2.
    // 6x+5: min = 6(−2)+5=−7; max = 6(2)+5=17. So −7 ≤ 6x+5 ≤ 17. ✓ Answer B.
    id: 'math-b5a-011',
    test: 'SAT',
    section: 'math',
    domain: 'Algebra',
    skill: 'Linear inequalities in one or two variables',
    difficulty: 'hard',
    timeTargetSeconds: 80,
    mistakeType: 'careless',
    questionType: 'multiple_choice',
    question: `If −2 ≤ 3x + 4 ≤ 10, which of the following gives all possible values of 6x + 5?`,
    choices: [
      { label: 'A', text: '−7 ≤ 6x + 5 ≤ 9' },
      { label: 'B', text: '−7 ≤ 6x + 5 ≤ 17' },
      { label: 'C', text: '−3 ≤ 6x + 5 ≤ 13' },
      { label: 'D', text: '1 ≤ 6x + 5 ≤ 13' },
    ],
    correctAnswer: 'B',
    explanation: `Subtract 4 from all three parts of the compound inequality: −6 ≤ 3x ≤ 6. Divide by 3: −2 ≤ x ≤ 2. Multiply by 6: −12 ≤ 6x ≤ 12. Add 5: −7 ≤ 6x + 5 ≤ 17. Alternatively, multiply the original compound inequality by 2: −4 ≤ 6x + 8 ≤ 20, then subtract 3: −7 ≤ 6x + 5 ≤ 17.`,
    teachingPoint: `To find the range of a new expression, isolate the variable from the given compound inequality, then substitute its range into the new expression. Alternatively, manipulate the given inequality algebraically to match the target expression.`,
    relatedSkills: ['Linear equations in one variable'],
  },

  {
    // 3x−2y>6. Point D (3,2): 9−4=5. 5>6 is false. Point C (4,3): 12−6=6. 6>6 false.
    // Redesign: 2x−y>3. A(0,0): 0>3 false. B(1,0): 2>3 false. C(2,1): 4−1=3>3 false. D(3,1): 6−1=5>3 true. ✓
    id: 'math-b5a-012',
    test: 'SAT',
    section: 'math',
    domain: 'Algebra',
    skill: 'Linear inequalities in one or two variables',
    difficulty: 'hard',
    timeTargetSeconds: 80,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    question: `Which of the following points lies in the solution region of the inequality 2x − y > 3?`,
    choices: [
      { label: 'A', text: '(0, 0)' },
      { label: 'B', text: '(1, 0)' },
      { label: 'C', text: '(2, 1)' },
      { label: 'D', text: '(3, 1)' },
    ],
    correctAnswer: 'D',
    explanation: `Substitute each point into 2x − y > 3. Point A (0, 0): 0 − 0 = 0; 0 > 3 is false. Point B (1, 0): 2 − 0 = 2; 2 > 3 is false. Point C (2, 1): 4 − 1 = 3; 3 > 3 is false (strict inequality). Point D (3, 1): 6 − 1 = 5; 5 > 3 is true. Therefore (3, 1) is in the solution region.`,
    teachingPoint: `To test whether a point satisfies a linear inequality, substitute its coordinates directly into the inequality and evaluate. Remember that strict inequalities (>) exclude the boundary line itself.`,
    relatedSkills: ['Linear equations in two variables'],
  },

  {
    // Manager needs ≥ 40 employees; at most 280 labor-hours.
    // f+p≥40 and 8f+4p≤280. ✓ Answer A.
    id: 'math-b5a-013',
    test: 'SAT',
    section: 'math',
    domain: 'Algebra',
    skill: 'Linear inequalities in one or two variables',
    difficulty: 'hard',
    timeTargetSeconds: 85,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    isWordProblem: true,
    question: `A store manager needs at least 40 employees working on a weekend. Full-time employees (f) work 8-hour shifts and part-time employees (p) work 4-hour shifts. The store can schedule at most 280 labor-hours total. Which system best represents these constraints?`,
    choices: [
      { label: 'A', text: 'f + p ≥ 40 and 8f + 4p ≤ 280' },
      { label: 'B', text: 'f + p ≤ 40 and 8f + 4p ≥ 280' },
      { label: 'C', text: 'f + p ≥ 40 and 8f + 4p ≥ 280' },
      { label: 'D', text: '8f + 4p ≥ 40 and f + p ≤ 280' },
    ],
    correctAnswer: 'A',
    explanation: `The total headcount must be at least 40, so f + p ≥ 40. Each full-time employee contributes 8 hours and each part-time employee contributes 4 hours, for 8f + 4p total labor-hours. The store can schedule at most 280 labor-hours, so 8f + 4p ≤ 280. Answer B reverses both directions. Answer D confuses headcount with labor-hours.`,
    teachingPoint: `In systems of inequality word problems, translate "at least" as ≥ and "at most" as ≤. Write a separate inequality for each constraint (here, headcount and labor-hours), taking care to assign the correct coefficient to each variable.`,
    relatedSkills: ['Linear word problems', 'Systems of two linear equations in two variables'],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // ALGEBRA — Systems of two linear equations (math-b5a-014 to math-b5a-021)
  // ─────────────────────────────────────────────────────────────────────────────

  {
    // 3x+ky=12 and 6x+4y=24=2(3x+2y). For infinite solutions: ky=2y → k=2. ✓
    id: 'math-b5a-014',
    test: 'SAT',
    section: 'math',
    domain: 'Algebra',
    skill: 'Systems of two linear equations in two variables',
    difficulty: 'hard',
    timeTargetSeconds: 85,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    question: `The system 3x + ky = 12 and 6x + 4y = 24 has infinitely many solutions. What is the value of k?`,
    choices: [
      { label: 'A', text: '2' },
      { label: 'B', text: '1' },
      { label: 'C', text: '4' },
      { label: 'D', text: '6' },
    ],
    correctAnswer: 'A',
    explanation: `For infinitely many solutions the two equations must be equivalent — one must be a scalar multiple of the other. The second equation 6x + 4y = 24 is exactly 2 times the first: 2(3x + ky) = 6x + 2ky must equal 6x + 4y = 24. Therefore 2k = 4, giving k = 2. The right-hand sides also match: 2 × 12 = 24 ✓.`,
    teachingPoint: `A system has infinitely many solutions when one equation is a constant multiple of the other (the lines coincide). Determine the scale factor from the x-coefficients, then apply it to the y-coefficient to find the unknown.`,
    relatedSkills: ['Linear equations in two variables'],
  },

  {
    // Parallel: same slope, different intercepts. slope of eq1: y=(2/3)x−2; eq2: kx−12y=18 → y=(k/12)x−3/2. Parallel: k/12=2/3 → k=8. Intercepts: −2≠−3/2 ✓.
    id: 'math-b5a-015',
    test: 'SAT',
    section: 'math',
    domain: 'Algebra',
    skill: 'Systems of two linear equations in two variables',
    difficulty: 'hard',
    timeTargetSeconds: 90,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    question: `For what value of k does the system 2x − 3y = 6 and kx − 12y = 18 have no solution?`,
    choices: [
      { label: 'A', text: '4' },
      { label: 'B', text: '8' },
      { label: 'C', text: '6' },
      { label: 'D', text: '12' },
    ],
    correctAnswer: 'B',
    explanation: `Rewrite equation 1 in slope-intercept form: y = (2/3)x − 2, slope = 2/3. Rewrite equation 2: y = (k/12)x − 3/2, slope = k/12. For no solution (parallel lines), set slopes equal: k/12 = 2/3, so k = 8. Check that the y-intercepts differ: −2 ≠ −3/2, confirming the lines are parallel but not coincident.`,
    teachingPoint: `A system has no solution when the equations represent parallel lines with the same slope but different y-intercepts. Set the slopes equal to find the unknown parameter, then verify the y-intercepts are different.`,
    relatedSkills: ['Linear equations in two variables', 'Linear functions'],
  },

  {
    // Two lines same: y=(2/3)x−4 and 4x−6y=24 → y=(2/3)x−4. Identical. Infinitely many solutions. ✓
    id: 'math-b5a-016',
    test: 'SAT',
    section: 'math',
    domain: 'Algebra',
    skill: 'Systems of two linear equations in two variables',
    difficulty: 'hard',
    timeTargetSeconds: 80,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    question: `How many solutions does the system y = (2/3)x − 4 and 4x − 6y = 24 have?`,
    choices: [
      { label: 'A', text: 'Exactly one solution' },
      { label: 'B', text: 'Exactly two solutions' },
      { label: 'C', text: 'No solution' },
      { label: 'D', text: 'Infinitely many solutions' },
    ],
    correctAnswer: 'D',
    explanation: `Rewrite the second equation in slope-intercept form: −6y = −4x + 24, so y = (2/3)x − 4. This is identical to the first equation, meaning both equations represent the same line. Every point on that line is a solution, so the system has infinitely many solutions.`,
    teachingPoint: `Before concluding how many solutions a system has, convert both equations to the same form and compare directly. Identical equations yield infinitely many solutions; parallel non-identical lines yield no solution; non-parallel lines yield exactly one solution.`,
    relatedSkills: ['Linear equations in two variables'],
  },

  {
    // m=math hours, r=reading hours. m+r=7 and 40m+30r=240.
    // p=7−m → 40m+30(7−m)=240 → 10m+210=240 → 10m=30 → m=3. ✓
    id: 'math-b5a-017',
    test: 'SAT',
    section: 'math',
    domain: 'Algebra',
    skill: 'Systems of two linear equations in two variables',
    difficulty: 'hard',
    timeTargetSeconds: 90,
    mistakeType: 'careless',
    questionType: 'multiple_choice',
    isWordProblem: true,
    question: `A tutoring center charges $40 per hour for math and $30 per hour for reading tutoring. A student had 7 total hours of tutoring last week and was charged $240. How many hours of math tutoring did the student receive?`,
    choices: [
      { label: 'A', text: '3' },
      { label: 'B', text: '2' },
      { label: 'C', text: '4' },
      { label: 'D', text: '5' },
    ],
    correctAnswer: 'A',
    explanation: `Let m = math hours and r = reading hours. The system is m + r = 7 and 40m + 30r = 240. From the first equation, r = 7 − m. Substituting: 40m + 30(7 − m) = 240 → 40m + 210 − 30m = 240 → 10m = 30 → m = 3. Verify: r = 4, and 40(3) + 30(4) = 120 + 120 = 240 ✓.`,
    teachingPoint: `Set up one equation for the total count and one for the total cost. Solve the count equation for one variable, substitute into the cost equation, and solve for the remaining variable.`,
    relatedSkills: ['Linear word problems'],
  },

  {
    // 5x+2y=20 and 3x−4y=6. Mult eq1 by 2: 10x+4y=40. Add eq2: 13x=46 → x=46/13. Not clean.
    // Redesign: 4x+3y=17 and 2x−y=1. From eq2: y=2x−1. Into eq1: 4x+3(2x−1)=17 → 4x+6x−3=17 → 10x=20 → x=2, y=3. ✓
    id: 'math-b5a-018',
    test: 'SAT',
    section: 'math',
    domain: 'Algebra',
    skill: 'Systems of two linear equations in two variables',
    difficulty: 'hard',
    timeTargetSeconds: 90,
    mistakeType: 'careless',
    questionType: 'multiple_choice',
    question: `In the system 4x + 3y = 17 and 2x − y = 1, what is the value of x + y?`,
    choices: [
      { label: 'A', text: '3' },
      { label: 'B', text: '5' },
      { label: 'C', text: '4' },
      { label: 'D', text: '6' },
    ],
    correctAnswer: 'B',
    explanation: `From the second equation, y = 2x − 1. Substitute into the first: 4x + 3(2x − 1) = 17 → 4x + 6x − 3 = 17 → 10x = 20 → x = 2. Then y = 2(2) − 1 = 3. Therefore x + y = 2 + 3 = 5. Verify: 4(2) + 3(3) = 8 + 9 = 17 ✓ and 2(2) − 3 = 1 ✓.`,
    teachingPoint: `Use substitution when one equation is easy to solve for a single variable. After finding both values, compute the requested combination rather than stopping at just one variable.`,
    relatedSkills: ['Linear equations in one variable'],
  },

  {
    // 7x+3y=41 and 2x−y=4. y=2x−4. 7x+3(2x−4)=41 → 7x+6x−12=41 → 13x=53. Not clean.
    // Redesign: 3x+5y=31 and x−y=1. x=y+1. 3(y+1)+5y=31 → 3y+3+5y=31 → 8y=28 → y=7/2. Not clean.
    // Try: 5x+2y=16 and x+y=5. x=5−y. 5(5−y)+2y=16 → 25−5y+2y=16 → −3y=−9 → y=3, x=2. ✓ x+y=5.
    id: 'math-b5a-019',
    test: 'SAT',
    section: 'math',
    domain: 'Algebra',
    skill: 'Systems of two linear equations in two variables',
    difficulty: 'hard',
    timeTargetSeconds: 85,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    question: `In the system 5x + 2y = 16 and x + y = 5, what is the value of y?`,
    choices: [
      { label: 'A', text: '1' },
      { label: 'B', text: '2' },
      { label: 'C', text: '3' },
      { label: 'D', text: '4' },
    ],
    correctAnswer: 'C',
    explanation: `From the second equation, x = 5 − y. Substitute into the first: 5(5 − y) + 2y = 16 → 25 − 5y + 2y = 16 → 25 − 3y = 16 → 3y = 9 → y = 3. Verify: x = 2 and 5(2) + 2(3) = 10 + 6 = 16 ✓.`,
    teachingPoint: `When one equation is already solved for a variable or can be solved easily, substitution is the most efficient method. Substitute the expression into the other equation and solve for the remaining unknown.`,
    relatedSkills: ['Linear equations in one variable'],
  },

  {
    // 3x+2y=12 and 5x−2y=4. Add: 8x=16 → x=2. Then 6+2y=12 → y=3. x+y=5. ✓
    id: 'math-b5a-020',
    test: 'SAT',
    section: 'math',
    domain: 'Algebra',
    skill: 'Systems of two linear equations in two variables',
    difficulty: 'hard',
    timeTargetSeconds: 85,
    mistakeType: 'time issue',
    questionType: 'multiple_choice',
    question: `What is the value of x + y given the system 3x + 2y = 12 and 5x − 2y = 4?`,
    choices: [
      { label: 'A', text: '3' },
      { label: 'B', text: '4' },
      { label: 'C', text: '5' },
      { label: 'D', text: '6' },
    ],
    correctAnswer: 'C',
    explanation: `The y-coefficients are already opposites (+2 and −2). Add the two equations: 8x = 16, so x = 2. Substitute into the first equation: 3(2) + 2y = 12 → 6 + 2y = 12 → y = 3. Therefore x + y = 2 + 3 = 5. Verify with the second equation: 5(2) − 2(3) = 10 − 6 = 4 ✓.`,
    teachingPoint: `When y-coefficients in two equations are equal in magnitude but opposite in sign, adding the equations immediately eliminates y. This is the most direct path to solving by elimination.`,
    relatedSkills: ['Linear equations in two variables'],
  },

  {
    // 2x+5y=20 and 3x−y=6. Mult eq2 by 5: 15x−5y=30. Add: 17x=50. Not clean.
    // Redesign: 3x−y=7 and x+2y=7. Mult eq1 by 2: 6x−2y=14. Add eq2: 7x=21 → x=3, y=2. x−y=1. ✓
    id: 'math-b5a-021',
    test: 'SAT',
    section: 'math',
    domain: 'Algebra',
    skill: 'Systems of two linear equations in two variables',
    difficulty: 'hard',
    timeTargetSeconds: 90,
    mistakeType: 'careless',
    questionType: 'multiple_choice',
    question: `In the system 3x − y = 7 and x + 2y = 7, what is the value of x − y?`,
    choices: [
      { label: 'A', text: '1' },
      { label: 'B', text: '2' },
      { label: 'C', text: '3' },
      { label: 'D', text: '4' },
    ],
    correctAnswer: 'A',
    explanation: `Multiply the first equation by 2: 6x − 2y = 14. Add the second equation: 7x = 21, so x = 3. Substitute into the second equation: 3 + 2y = 7 → y = 2. Therefore x − y = 3 − 2 = 1. Verify in the first equation: 3(3) − 2 = 7 ✓.`,
    teachingPoint: `Choose a multiplier that makes one pair of coefficients equal in magnitude. Adding or subtracting the resulting equations eliminates that variable. After finding both values, evaluate the requested expression.`,
    relatedSkills: ['Linear equations in one variable'],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // ALGEBRA — Linear functions (math-b5a-022 to math-b5a-029)
  // ─────────────────────────────────────────────────────────────────────────────

  {
    // slope=(19−11)/(7−3)=2. f(x)=2x+5. f(0)=5. ✓
    id: 'math-b5a-022',
    test: 'SAT',
    section: 'math',
    domain: 'Algebra',
    skill: 'Linear functions',
    difficulty: 'hard',
    timeTargetSeconds: 80,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    question: `A linear function f satisfies f(3) = 11 and f(7) = 19. What is f(0)?`,
    choices: [
      { label: 'A', text: '3' },
      { label: 'B', text: '4' },
      { label: 'C', text: '5' },
      { label: 'D', text: '7' },
    ],
    correctAnswer: 'C',
    explanation: `The slope is (19 − 11)/(7 − 3) = 8/4 = 2. Using point-slope form through (3, 11): f(x) = 2(x − 3) + 11 = 2x + 5. Therefore f(0) = 2(0) + 5 = 5.`,
    teachingPoint: `For a linear function, compute the slope from two known values, then use one point to write the equation in the form f(x) = mx + b. Evaluate the equation at the desired input.`,
    relatedSkills: ['Linear equations in two variables'],
  },

  {
    // y-int=−3, passes through (4,9). slope=(9−(−3))/(4−0)=3. g(x)=3x−3. x-int: 3x−3=0 → x=1. ✓
    id: 'math-b5a-023',
    test: 'SAT',
    section: 'math',
    domain: 'Algebra',
    skill: 'Linear functions',
    difficulty: 'hard',
    timeTargetSeconds: 80,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    question: `A linear function g has a y-intercept of −3 and passes through (4, 9). What is the x-intercept of g?`,
    choices: [
      { label: 'A', text: '1' },
      { label: 'B', text: '−4/3' },
      { label: 'C', text: '3/4' },
      { label: 'D', text: '4/3' },
    ],
    correctAnswer: 'A',
    explanation: `The slope is (9 − (−3))/(4 − 0) = 12/4 = 3. With y-intercept −3 the function is g(x) = 3x − 3. Set g(x) = 0: 3x − 3 = 0, so x = 1. The x-intercept is 1.`,
    teachingPoint: `Use the y-intercept (where x = 0) and one other point to find the slope, write the full linear equation, then set it equal to zero and solve to find the x-intercept.`,
    relatedSkills: ['Linear equations in two variables'],
  },

  {
    // slope=(−7−7)/(5−(−2))=−14/7=−2. h(x)=−2x+3. h(1)=1. Answer: B=1. ✓
    id: 'math-b5a-024',
    test: 'SAT',
    section: 'math',
    domain: 'Algebra',
    skill: 'Linear functions',
    difficulty: 'hard',
    timeTargetSeconds: 85,
    mistakeType: 'careless',
    questionType: 'multiple_choice',
    question: `The function h is linear, h(−2) = 7, and h(5) = −7. What is the value of h(1)?`,
    choices: [
      { label: 'A', text: '1' },
      { label: 'B', text: '−1' },
      { label: 'C', text: '3' },
      { label: 'D', text: '−3' },
    ],
    correctAnswer: 'A',
    explanation: `The slope is (−7 − 7)/(5 − (−2)) = −14/7 = −2. Using (−2, 7): h(x) = −2(x + 2) + 7 = −2x + 3. So h(1) = −2(1) + 3 = 1. Verify: h(−2) = 4 + 3 = 7 ✓ and h(5) = −10 + 3 = −7 ✓.`,
    teachingPoint: `Find the slope between the two given points, then use one of them in point-slope form to write the complete equation. Verify the equation reproduces both original values before evaluating at the new input.`,
    relatedSkills: ['Linear equations in two variables'],
  },

  {
    // slope of ℓ through (−1,4) and (3,−4): (−4−4)/(3−(−1))=−8/4=−2. Perp slope: 1/2.
    // Through (2,1): y−1=(1/2)(x−2) → y=(1/2)x. Check: (1/2)(2)=1 ✓. Answer B.
    id: 'math-b5a-025',
    test: 'SAT',
    section: 'math',
    domain: 'Algebra',
    skill: 'Linear functions',
    difficulty: 'hard',
    timeTargetSeconds: 90,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    question: `Line ℓ passes through (−1, 4) and (3, −4). Which equation represents a line perpendicular to ℓ that passes through (2, 1)?`,
    choices: [
      { label: 'A', text: 'y = (1/2)x' },
      { label: 'B', text: 'y = −2x + 5' },
      { label: 'C', text: 'y = 2x − 3' },
      { label: 'D', text: 'y = −(1/2)x + 2' },
    ],
    correctAnswer: 'A',
    explanation: `The slope of ℓ is (−4 − 4)/(3 − (−1)) = −8/4 = −2. A perpendicular line has slope equal to the negative reciprocal: 1/2. Using point-slope form through (2, 1): y − 1 = (1/2)(x − 2) → y = (1/2)x − 1 + 1 = (1/2)x. Verify: (1/2)(2) = 1 ✓.`,
    teachingPoint: `Perpendicular lines have slopes that are negative reciprocals. After computing the slope of the given line, negate and invert it, then write the perpendicular line through the given point using point-slope form.`,
    relatedSkills: ['Linear equations in two variables'],
  },

  {
    // slope=(760−460)/(50−20)=300/30=10. C=10n+b. 460=10(20)+b → b=260. C(0)=260. ✓
    id: 'math-b5a-026',
    test: 'SAT',
    section: 'math',
    domain: 'Algebra',
    skill: 'Linear functions',
    difficulty: 'hard',
    timeTargetSeconds: 85,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    isWordProblem: true,
    question: `The cost C (in dollars) of producing n items follows a linear model. When n = 20, C = 460, and when n = 50, C = 760. What is the cost when n = 0?`,
    choices: [
      { label: 'A', text: '$160' },
      { label: 'B', text: '$260' },
      { label: 'C', text: '$200' },
      { label: 'D', text: '$300' },
    ],
    correctAnswer: 'B',
    explanation: `The variable cost per item (slope) is (760 − 460)/(50 − 20) = 300/30 = $10 per item. Using the point (20, 460): C = 10(n − 20) + 460 = 10n + 260. When n = 0, C = $260. This is the fixed cost of production.`,
    teachingPoint: `In a linear cost model, the slope is the per-unit variable cost and the y-intercept (cost when n = 0) is the fixed cost. Use any two data points to find the slope, write the equation, then evaluate at n = 0.`,
    relatedSkills: ['Linear word problems'],
  },

  {
    // g(3)=f(2·3+1)=f(7)=3(7)−7=14. ✓ Answer C.
    id: 'math-b5a-027',
    test: 'SAT',
    section: 'math',
    domain: 'Algebra',
    skill: 'Linear functions',
    difficulty: 'hard',
    timeTargetSeconds: 75,
    mistakeType: 'careless',
    questionType: 'multiple_choice',
    question: `If f(x) = 3x − 7 and g(x) = f(2x + 1), what is g(3)?`,
    choices: [
      { label: 'A', text: '7' },
      { label: 'B', text: '12' },
      { label: 'C', text: '14' },
      { label: 'D', text: '16' },
    ],
    correctAnswer: 'C',
    explanation: `First evaluate the inner expression: 2(3) + 1 = 7. Then apply f: f(7) = 3(7) − 7 = 21 − 7 = 14. Therefore g(3) = 14.`,
    teachingPoint: `To evaluate a composed function, substitute the input into the inner expression first, then pass that result to the outer function. Work from the inside out.`,
    relatedSkills: ['Linear equations in one variable'],
  },

  {
    // slope of 3x−5y=15 is 3/5. Line n: y=(3/5)x+4. x-int: 0=(3/5)x+4 → x=−20/3. ✓
    id: 'math-b5a-028',
    test: 'SAT',
    section: 'math',
    domain: 'Algebra',
    skill: 'Linear functions',
    difficulty: 'hard',
    timeTargetSeconds: 85,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    question: `Line m has the equation 3x − 5y = 15. Line n is parallel to m and has a y-intercept of 4. What is the x-intercept of line n?`,
    choices: [
      { label: 'A', text: '−20/3' },
      { label: 'B', text: '20/3' },
      { label: 'C', text: '−4' },
      { label: 'D', text: '4' },
    ],
    correctAnswer: 'A',
    explanation: `Rewrite line m: −5y = −3x + 15, so y = (3/5)x − 3. The slope is 3/5. Line n is parallel with slope 3/5 and y-intercept 4: y = (3/5)x + 4. Set y = 0 for the x-intercept: (3/5)x = −4, so x = −4 · (5/3) = −20/3.`,
    teachingPoint: `Parallel lines share the same slope. Find the slope of the given line, use the stated y-intercept to write the parallel line, then set y = 0 and solve for the x-intercept.`,
    relatedSkills: ['Linear equations in two variables'],
  },

  {
    // slope=(b+12−b)/4=3. f(a+1)=f(a)+3=b+3. ✓
    id: 'math-b5a-029',
    test: 'SAT',
    section: 'math',
    domain: 'Algebra',
    skill: 'Linear functions',
    difficulty: 'hard',
    timeTargetSeconds: 80,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    question: `A linear function f satisfies f(a) = b and f(a + 4) = b + 12. What is the value of f(a + 1)?`,
    choices: [
      { label: 'A', text: 'b + 1' },
      { label: 'B', text: 'b + 2' },
      { label: 'C', text: 'b + 3' },
      { label: 'D', text: 'b + 4' },
    ],
    correctAnswer: 'C',
    explanation: `The slope of f is (b + 12 − b)/((a + 4) − a) = 12/4 = 3. Since f is linear with slope 3, each unit increase in the input raises the output by 3. Therefore f(a + 1) = b + 3 · 1 = b + 3.`,
    teachingPoint: `For any linear function, the output changes by (slope × change in input). Compute the slope from the two given points, then multiply by the desired change in input to find the new output.`,
    relatedSkills: ['Linear equations in two variables'],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // ALGEBRA — Linear equations in two variables (math-b5a-030 to math-b5a-034)
  // ─────────────────────────────────────────────────────────────────────────────

  {
    // ax+by=12, passes (3,0) and (0,4). 3a=12→a=4; 4b=12→b=3. a+b=7. ✓
    id: 'math-b5a-030',
    test: 'SAT',
    section: 'math',
    domain: 'Algebra',
    skill: 'Linear equations in two variables',
    difficulty: 'hard',
    timeTargetSeconds: 85,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    question: `The line ax + by = 12 passes through (3, 0) and (0, 4). What is the value of a + b?`,
    choices: [
      { label: 'A', text: '2' },
      { label: 'B', text: '4' },
      { label: 'C', text: '5' },
      { label: 'D', text: '7' },
    ],
    correctAnswer: 'D',
    explanation: `Substitute (3, 0): 3a + b(0) = 12, so a = 4. Substitute (0, 4): a(0) + 4b = 12, so b = 3. Therefore a + b = 4 + 3 = 7.`,
    teachingPoint: `Substituting the x-intercept (where y = 0) immediately gives the value of a, and substituting the y-intercept (where x = 0) immediately gives b. No slope calculation is needed.`,
    relatedSkills: ['Linear functions'],
  },

  {
    // 6x−4y=20 → y=(3/2)x−5. m=3/2, b=−5. ✓ Answer B.
    id: 'math-b5a-031',
    test: 'SAT',
    section: 'math',
    domain: 'Algebra',
    skill: 'Linear equations in two variables',
    difficulty: 'hard',
    timeTargetSeconds: 80,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    question: `The equation 6x − 4y = 20 is written in the form y = mx + b. Which of the following correctly states m and b?`,
    choices: [
      { label: 'A', text: 'm = 2/3, b = −5' },
      { label: 'B', text: 'm = 3/2, b = 5' },
      { label: 'C', text: 'm = −3/2, b = 5' },
      { label: 'D', text: 'm = 3/2, b = −5' },
    ],
    correctAnswer: 'D',
    explanation: `Isolate y: subtract 6x from both sides to get −4y = −6x + 20, then divide by −4: y = (3/2)x − 5. So m = 3/2 and b = −5.`,
    teachingPoint: `To convert from standard form to slope-intercept form, subtract the x-term from both sides and divide every term by the coefficient of y. Keep careful track of signs when dividing by a negative number.`,
    relatedSkills: ['Linear functions'],
  },

  {
    // 2x+3y=12 → y=−(2/3)x+4. slope=−2/3. Perp slope=3/2.
    // Through (−2,5): y−5=(3/2)(x+2) → y=(3/2)x+3+5=(3/2)x+8. y-int=8. ✓
    id: 'math-b5a-032',
    test: 'SAT',
    section: 'math',
    domain: 'Algebra',
    skill: 'Linear equations in two variables',
    difficulty: 'hard',
    timeTargetSeconds: 90,
    mistakeType: 'careless',
    questionType: 'multiple_choice',
    question: `A line passes through (−2, 5) and is perpendicular to 2x + 3y = 12. What is the y-intercept of that line?`,
    choices: [
      { label: 'A', text: '8' },
      { label: 'B', text: '14' },
      { label: 'C', text: '11/3' },
      { label: 'D', text: '2' },
    ],
    correctAnswer: 'A',
    explanation: `Rewrite 2x + 3y = 12 as y = −(2/3)x + 4, slope = −2/3. The perpendicular slope is 3/2 (negative reciprocal). Using point-slope form through (−2, 5): y − 5 = (3/2)(x + 2) → y = (3/2)x + 3 + 5 = (3/2)x + 8. The y-intercept is 8.`,
    teachingPoint: `Find the slope of the given line by rewriting it in slope-intercept form, take the negative reciprocal for the perpendicular slope, then apply point-slope form using the given point to identify the y-intercept.`,
    relatedSkills: ['Linear functions'],
  },

  {
    // (4)x−py=8 passes through (5,4): 20−4p=8 → 4p=12 → p=3. ✓
    id: 'math-b5a-033',
    test: 'SAT',
    section: 'math',
    domain: 'Algebra',
    skill: 'Linear equations in two variables',
    difficulty: 'hard',
    timeTargetSeconds: 80,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    question: `In the xy-plane, the line 4x − py = 8 passes through the point (5, 4). What is the value of p?`,
    choices: [
      { label: 'A', text: '2' },
      { label: 'B', text: '5' },
      { label: 'C', text: '4' },
      { label: 'D', text: '3' },
    ],
    correctAnswer: 'D',
    explanation: `Substitute x = 5 and y = 4: 4(5) − p(4) = 8 → 20 − 4p = 8 → 4p = 12 → p = 3.`,
    teachingPoint: `If a line passes through a specific point, those coordinates satisfy the equation. Substitute both values directly and solve for the unknown parameter.`,
    relatedSkills: ['Linear equations in one variable'],
  },

  {
    // slope through (1,3) and (4,9) = (9−3)/(4−1)=2. Line: y=2x+1. Same slope m=2, different y-int: y=2x−1 (Answer B). ✓
    id: 'math-b5a-034',
    test: 'SAT',
    section: 'math',
    domain: 'Algebra',
    skill: 'Linear equations in two variables',
    difficulty: 'hard',
    timeTargetSeconds: 85,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    question: `Which of the following is parallel to the line through (1, 3) and (4, 9) but has a different y-intercept?`,
    choices: [
      { label: 'A', text: 'y = 2x + 1' },
      { label: 'B', text: 'y = (1/2)x + 2' },
      { label: 'C', text: 'y = 3x + 1' },
      { label: 'D', text: 'y = 2x − 1' },
    ],
    correctAnswer: 'D',
    explanation: `The slope through (1, 3) and (4, 9) is (9 − 3)/(4 − 1) = 6/3 = 2. The original line is y = 2x + 1. A parallel line must have slope 2 and a different y-intercept. Choice D: y = 2x − 1 has slope 2 and y-intercept −1 — satisfying both conditions. Choice A: y = 2x + 1 is the original line itself (same slope and y-intercept). Choice B: y = (1/2)x + 2 has slope 1/2, not 2 — not parallel. Choice C: y = 3x + 1 has slope 3, not 2 — not parallel.`,
    teachingPoint: `Two lines are parallel if and only if they have the same slope and different y-intercepts. After finding the slope of the original line, identify the answer choice that matches only the slope.`,
    relatedSkills: ['Linear functions'],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // ALGEBRA — Linear word problems (math-b5a-035 to math-b5a-040)
  // ─────────────────────────────────────────────────────────────────────────────

  {
    // 30+0.25m=20+0.35m → 10=0.10m → m=100. ✓
    id: 'math-b5a-035',
    test: 'SAT',
    section: 'math',
    domain: 'Algebra',
    skill: 'Linear word problems',
    difficulty: 'hard',
    timeTargetSeconds: 95,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    isWordProblem: true,
    question: `Company A charges $30 flat plus $0.25 per mile. Company B charges $20 flat plus $0.35 per mile. For how many miles do both companies charge the same total?`,
    choices: [
      { label: 'A', text: '80' },
      { label: 'B', text: '90' },
      { label: 'C', text: '100' },
      { label: 'D', text: '110' },
    ],
    correctAnswer: 'C',
    explanation: `Let m = miles. Company A total: 30 + 0.25m. Company B total: 20 + 0.35m. Set equal: 30 + 0.25m = 20 + 0.35m → 10 = 0.10m → m = 100. At 100 miles both charge $55.`,
    teachingPoint: `To find the break-even mileage between two linear cost models, write an expression for each company's total cost, set them equal, and solve for the mileage variable.`,
    relatedSkills: ['Systems of two linear equations in two variables', 'Linear functions'],
  },

  {
    // s+p=80, 25s+45p=2700. s=80−p. 25(80−p)+45p=2700 → 2000+20p=2700 → p=35. ✓
    id: 'math-b5a-036',
    test: 'SAT',
    section: 'math',
    domain: 'Algebra',
    skill: 'Linear word problems',
    difficulty: 'hard',
    timeTargetSeconds: 95,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    isWordProblem: true,
    question: `A gym sold standard memberships at $25/month and premium memberships at $45/month. In April, 80 total memberships were sold for $2,700 in fees. How many premium memberships were sold?`,
    choices: [
      { label: 'A', text: '25' },
      { label: 'B', text: '35' },
      { label: 'C', text: '30' },
      { label: 'D', text: '45' },
    ],
    correctAnswer: 'B',
    explanation: `Let s = standard and p = premium memberships. System: s + p = 80 and 25s + 45p = 2,700. From the first equation, s = 80 − p. Substituting: 25(80 − p) + 45p = 2,700 → 2,000 − 25p + 45p = 2,700 → 20p = 700 → p = 35. Verify: s = 45; 25(45) + 45(35) = 1,125 + 1,575 = 2,700 ✓.`,
    teachingPoint: `Mixture-type word problems yield a two-variable system: one equation for total count and one for total value. Substitute the count equation into the value equation to solve directly.`,
    relatedSkills: ['Systems of two linear equations in two variables'],
  },

  {
    // d+(300−d)=300. d/60+(300−d)/40=6. Mult by 120: 2d+3(300−d)=720 → −d=−180 → d=180. ✓
    id: 'math-b5a-037',
    test: 'SAT',
    section: 'math',
    domain: 'Algebra',
    skill: 'Linear word problems',
    difficulty: 'hard',
    timeTargetSeconds: 100,
    mistakeType: 'careless',
    questionType: 'multiple_choice',
    isWordProblem: true,
    question: `Maria drives at 60 mph for the first portion and 40 mph for the rest of a 300-mile trip. The total trip takes 6 hours. How many miles did she drive at 60 mph?`,
    choices: [
      { label: 'A', text: '120' },
      { label: 'B', text: '150' },
      { label: 'C', text: '180' },
      { label: 'D', text: '200' },
    ],
    correctAnswer: 'C',
    explanation: `Let d = miles driven at 60 mph. Miles at 40 mph = 300 − d. Total time equation: d/60 + (300 − d)/40 = 6. Multiply by 120: 2d + 3(300 − d) = 720 → 2d + 900 − 3d = 720 → −d = −180 → d = 180. Verify: 180/60 + 120/40 = 3 + 3 = 6 hours ✓.`,
    teachingPoint: `In distance-rate-time problems, time = distance ÷ rate. Write separate time expressions for each segment and sum them to equal the total time. Multiply through by the LCD to clear fractions.`,
    relatedSkills: ['Linear equations in one variable', 'Systems of two linear equations in two variables'],
  },

  {
    // n=notebooks, p=pens. n+p=12, 4n+1.5p=33. p=12−n. 4n+1.5(12−n)=33 → 4n+18−1.5n=33 → 2.5n=15 → n=6. ✓
    id: 'math-b5a-038',
    test: 'SAT',
    section: 'math',
    domain: 'Algebra',
    skill: 'Linear word problems',
    difficulty: 'hard',
    timeTargetSeconds: 95,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    isWordProblem: true,
    question: `Alex buys 12 items total — notebooks at $4 each and pens at $1.50 each — and spends exactly $33. How many notebooks did Alex buy?`,
    choices: [
      { label: 'A', text: '4' },
      { label: 'B', text: '6' },
      { label: 'C', text: '5' },
      { label: 'D', text: '7' },
    ],
    correctAnswer: 'B',
    explanation: `Let n = notebooks and p = pens. System: n + p = 12 and 4n + 1.5p = 33. Substitute p = 12 − n: 4n + 1.5(12 − n) = 33 → 4n + 18 − 1.5n = 33 → 2.5n = 15 → n = 6. Verify: 6 notebooks + 6 pens = 12 items; 4(6) + 1.5(6) = 24 + 9 = 33 ✓.`,
    teachingPoint: `Mixed-price purchase problems use a count equation and a cost equation. Solve the count equation for one variable, substitute, and solve — then verify both conditions are satisfied.`,
    relatedSkills: ['Systems of two linear equations in two variables'],
  },

  {
    // Net rate: (360−440)/(7−3)=−80/4=−20 gal/hr. At t=10: 360+(−20)(3)=300. ✓
    id: 'math-b5a-039',
    test: 'SAT',
    section: 'math',
    domain: 'Algebra',
    skill: 'Linear word problems',
    difficulty: 'hard',
    timeTargetSeconds: 95,
    mistakeType: 'time issue',
    questionType: 'multiple_choice',
    isWordProblem: true,
    question: `A tank starts with 500 gallons. At hour 3 it has 440 gallons, and at hour 7 it has 360 gallons. Assuming the volume changes at a constant net rate, how many gallons will the tank contain at hour 10?`,
    choices: [
      { label: 'A', text: '290' },
      { label: 'B', text: '295' },
      { label: 'C', text: '300' },
      { label: 'D', text: '310' },
    ],
    correctAnswer: 'C',
    explanation: `The net rate of change is (360 − 440)/(7 − 3) = −80/4 = −20 gallons per hour. Starting from hour 7 with 360 gallons and running 3 more hours: 360 + (−20)(3) = 360 − 60 = 300 gallons.`,
    teachingPoint: `When a quantity changes at a constant rate, use any two data points to calculate that rate, then multiply by the elapsed time and add to a known reference value to extrapolate.`,
    relatedSkills: ['Linear functions', 'Linear equations in two variables'],
  },

  {
    // Fixed cost + variable cost problem: total = fixed + rate × units.
    // Delivery: $5/package + $50 base. Courier: $8/package + $20 base. Equal: 50+5p=20+8p → 30=3p → p=10. ✓
    id: 'math-b5a-040',
    test: 'SAT',
    section: 'math',
    domain: 'Algebra',
    skill: 'Linear word problems',
    difficulty: 'hard',
    timeTargetSeconds: 95,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    isWordProblem: true,
    question: `Service A charges a $50 base fee plus $5 per package. Service B charges a $20 base fee plus $8 per package. For how many packages is the total cost the same for both services?`,
    choices: [
      { label: 'A', text: '8' },
      { label: 'B', text: '10' },
      { label: 'C', text: '9' },
      { label: 'D', text: '12' },
    ],
    correctAnswer: 'B',
    explanation: `Let p = number of packages. Service A: 50 + 5p. Service B: 20 + 8p. Set equal: 50 + 5p = 20 + 8p → 30 = 3p → p = 10. At 10 packages, both cost $100. Service A: 50 + 50 = 100 ✓. Service B: 20 + 80 = 100 ✓.`,
    teachingPoint: `When two linear cost models share the same total, set the expressions equal and solve for the quantity. The break-even quantity is where one service transitions from cheaper to more expensive than the other.`,
    relatedSkills: ['Linear functions', 'Systems of two linear equations in two variables'],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // ADVANCED MATH — Multiple Choice (math-b5a-041 to math-b5a-048)
  // ─────────────────────────────────────────────────────────────────────────────

  {
    // 2x²−7x−4=0. Factor: (2x+1)(x−4)=0. x=−1/2 or x=4. Verify x=4: 32−28−4=0 ✓. Answer D.
    id: 'math-b5a-041',
    test: 'SAT',
    section: 'math',
    domain: 'Advanced Math',
    skill: 'Quadratic equations',
    difficulty: 'hard',
    timeTargetSeconds: 85,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    question: `Which of the following is a solution to 2x² − 7x − 4 = 0?`,
    choices: [
      { label: 'A', text: '−4' },
      { label: 'B', text: '−2' },
      { label: 'C', text: '1/2' },
      { label: 'D', text: '4' },
    ],
    correctAnswer: 'D',
    explanation: `Factor 2x² − 7x − 4 by finding two numbers whose product is 2 × (−4) = −8 and whose sum is −7: those are −8 and 1. Rewrite: 2x² − 8x + x − 4 = 2x(x − 4) + 1(x − 4) = (2x + 1)(x − 4). Setting each factor to zero: x = −1/2 or x = 4. Substituting x = 4: 2(16) − 7(4) − 4 = 32 − 28 − 4 = 0 ✓.`,
    teachingPoint: `Factor a quadratic ax² + bx + c by finding two numbers whose product equals ac and whose sum equals b, then factor by grouping. Verify each solution by direct substitution.`,
    relatedSkills: ['Polynomial operations', 'Linear equations in one variable'],
  },

  {
    // f(x)=x²−6x+k=(x−3)²−9+k. Minimum=k−9=−4 → k=5. ✓
    id: 'math-b5a-042',
    test: 'SAT',
    section: 'math',
    domain: 'Advanced Math',
    skill: 'Quadratic equations',
    difficulty: 'hard',
    timeTargetSeconds: 90,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    question: `The function f(x) = x² − 6x + k has a minimum value of −4. What is the value of k?`,
    choices: [
      { label: 'A', text: '5' },
      { label: 'B', text: '9' },
      { label: 'C', text: '13' },
      { label: 'D', text: '−4' },
    ],
    correctAnswer: 'A',
    explanation: `Complete the square: x² − 6x + k = (x − 3)² − 9 + k. Since (x − 3)² ≥ 0, the minimum value occurs at x = 3 and equals k − 9. Setting k − 9 = −4 gives k = 5. Verify: f(3) = 9 − 18 + 5 = −4 ✓.`,
    teachingPoint: `The minimum value of a quadratic with positive leading coefficient is the constant term in vertex form (x − h)² + m. Complete the square to convert, then set the minimum equal to the given value and solve.`,
    relatedSkills: ['Linear functions', 'Function notation'],
  },

  {
    // Remainder Theorem: p(3)=2(27)−5(9)+3(3)−7=54−45+9−7=11. ✓
    id: 'math-b5a-043',
    test: 'SAT',
    section: 'math',
    domain: 'Advanced Math',
    skill: 'Polynomial operations',
    difficulty: 'hard',
    timeTargetSeconds: 80,
    mistakeType: 'careless',
    questionType: 'multiple_choice',
    question: `What is the remainder when 2x³ − 5x² + 3x − 7 is divided by (x − 3)?`,
    choices: [
      { label: 'A', text: '−7' },
      { label: 'B', text: '11' },
      { label: 'C', text: '5' },
      { label: 'D', text: '23' },
    ],
    correctAnswer: 'B',
    explanation: `By the Remainder Theorem, dividing p(x) by (x − 3) gives remainder p(3). Evaluate: 2(27) − 5(9) + 3(3) − 7 = 54 − 45 + 9 − 7 = 11.`,
    teachingPoint: `The Remainder Theorem states that the remainder when p(x) is divided by (x − a) equals p(a). Substitute x = a into the polynomial and compute directly, avoiding long division entirely.`,
    relatedSkills: ['Quadratic equations', 'Function notation'],
  },

  {
    // P(t)=200·3^(t/4). At t=4: 200·3=600 (tripled) ✓. Answer B.
    id: 'math-b5a-044',
    test: 'SAT',
    section: 'math',
    domain: 'Advanced Math',
    skill: 'Exponential functions',
    difficulty: 'hard',
    timeTargetSeconds: 85,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    question: `A population of bacteria triples every 4 hours. If the initial population is 200, which expression gives the population after t hours?`,
    choices: [
      { label: 'A', text: '200 · 3^(4t)' },
      { label: 'B', text: '200 + 3t' },
      { label: 'C', text: '200 · (t/4)^3' },
      { label: 'D', text: '200 · 3^(t/4)' },
    ],
    correctAnswer: 'D',
    explanation: `The growth factor is 3 per 4-hour period. After t hours, the number of completed 4-hour periods is t/4. The population is 200 · 3^(t/4). At t = 4: 200 · 3^1 = 600, which is three times 200 ✓. At t = 8: 200 · 9 = 1,800, which is three times 600 ✓.`,
    teachingPoint: `Exponential growth with period T uses the form P₀ · r^(t/T). The exponent t/T counts how many full periods have elapsed, and r is the multiplying factor per period.`,
    relatedSkills: ['Function notation'],
  },

  {
    // Discriminant=0: b²−4ac=64−4c=0 → c=16. (x+4)²=0, x=−4 ✓. Answer C.
    id: 'math-b5a-045',
    test: 'SAT',
    section: 'math',
    domain: 'Advanced Math',
    skill: 'Quadratic equations',
    difficulty: 'hard',
    timeTargetSeconds: 90,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    question: `For what positive value of c does x² + 8x + c = 0 have exactly one real solution?`,
    choices: [
      { label: 'A', text: '4' },
      { label: 'B', text: '8' },
      { label: 'C', text: '16' },
      { label: 'D', text: '32' },
    ],
    correctAnswer: 'C',
    explanation: `A quadratic has exactly one real solution when its discriminant equals zero: b² − 4ac = 0. With a = 1 and b = 8: 64 − 4c = 0, so c = 16. The equation becomes x² + 8x + 16 = (x + 4)² = 0, giving the single solution x = −4.`,
    teachingPoint: `The discriminant b² − 4ac determines the nature of solutions. Zero discriminant means one repeated real root, and the quadratic factors as a perfect square trinomial.`,
    relatedSkills: ['Polynomial operations'],
  },

  {
    // g(f(x))=x → g is inverse of f. g(7): f(x)=7 → 2x+3=7 → x=2. g(7)=2. ✓
    id: 'math-b5a-046',
    test: 'SAT',
    section: 'math',
    domain: 'Advanced Math',
    skill: 'Function notation',
    difficulty: 'hard',
    timeTargetSeconds: 85,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    question: `If f(x) = 2x + 3 and g(f(x)) = x for all x, what is g(7)?`,
    choices: [
      { label: 'A', text: '2' },
      { label: 'B', text: '4' },
      { label: 'C', text: '11' },
      { label: 'D', text: '17' },
    ],
    correctAnswer: 'A',
    explanation: `Since g(f(x)) = x, g is the inverse function of f. To find g(7), solve f(x) = 7: 2x + 3 = 7 → x = 2. Therefore g(7) = 2.`,
    teachingPoint: `If g(f(x)) = x, then g undoes f, meaning g is the inverse of f. To evaluate g at a value v, find the input x such that f(x) = v and solve for x — that x is g(v).`,
    relatedSkills: ['Linear functions', 'Exponential functions'],
  },

  {
    // Compound interest: Value=1000·(1.06)^n. ✓ Answer C.
    id: 'math-b5a-047',
    test: 'SAT',
    section: 'math',
    domain: 'Advanced Math',
    skill: 'Exponential functions',
    difficulty: 'hard',
    timeTargetSeconds: 85,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    question: `An investment of $1,000 grows at an annual rate of 6%, compounded annually. Which expression gives the value after n years?`,
    choices: [
      { label: 'A', text: '1,000(0.06)^n' },
      { label: 'B', text: '1,000 + 60n' },
      { label: 'C', text: '1,000(1.06)^n' },
      { label: 'D', text: '1,000(1 + n)^(0.06)' },
    ],
    correctAnswer: 'C',
    explanation: `For annual compound interest at rate r, the value after n years is P(1 + r)^n. With P = 1,000 and r = 0.06, the expression is 1,000(1.06)^n. Choice A uses 0.06 as the base, which is less than 1 (the investment would shrink). Choice B gives simple interest. Choice D misplaces the exponent and the rate.`,
    teachingPoint: `Compound interest uses an exponential model with base (1 + rate), not the rate alone. The original principal is retained and interest is added each period, which is why the base exceeds 1 for growth.`,
    relatedSkills: ['Quadratic equations'],
  },

  {
    // Factor Theorem: p(2)=0. 8+4a−8−8=0 → 4a−8=0 → a=2. ✓
    id: 'math-b5a-048',
    test: 'SAT',
    section: 'math',
    domain: 'Advanced Math',
    skill: 'Polynomial operations',
    difficulty: 'hard',
    timeTargetSeconds: 85,
    mistakeType: 'careless',
    questionType: 'multiple_choice',
    question: `If (x − 2) is a factor of x³ + ax² − 4x − 8, what is the value of a?`,
    choices: [
      { label: 'A', text: '−2' },
      { label: 'B', text: '0' },
      { label: 'C', text: '2' },
      { label: 'D', text: '4' },
    ],
    correctAnswer: 'C',
    explanation: `By the Factor Theorem, (x − 2) is a factor if and only if p(2) = 0. Substitute x = 2: 8 + 4a − 8 − 8 = 0 → 4a − 8 = 0 → a = 2. Verify: p(x) = x³ + 2x² − 4x − 8 = x²(x + 2) − 4(x + 2) = (x² − 4)(x + 2) = (x − 2)(x + 2)² ✓.`,
    teachingPoint: `The Factor Theorem states that (x − a) is a factor of p(x) if and only if p(a) = 0. Substitute the root value directly into the polynomial, set it to zero, and solve for the unknown coefficient.`,
    relatedSkills: ['Quadratic equations', 'Linear equations in one variable'],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // ADVANCED MATH — Grid-in (math-b5a-049 to math-b5a-050)
  // ─────────────────────────────────────────────────────────────────────────────

  {
    // x²−10x+k=0 two positive integer solutions r,s: r+s=10, rs=k.
    // Pairs: (1,9)→k=9, (2,8)→k=16, (3,7)→k=21, (4,6)→k=24, (5,5)→k=25.
    // Sum of all possible k: 9+16+21+24+25=95. ✓ Grid-in: 95.
    id: 'math-b5a-049',
    test: 'SAT',
    section: 'math',
    domain: 'Advanced Math',
    skill: 'Quadratic equations',
    difficulty: 'hard',
    timeTargetSeconds: 100,
    mistakeType: 'careless',
    questionType: 'grid_in',
    question: `The quadratic equation x² − 10x + k = 0 has two positive integer solutions. What is the sum of all possible values of k?`,
    correctAnswer: '95',
    explanation: `By Vieta's formulas, if r and s are the two solutions, then r + s = 10 and rs = k. The ordered pairs of positive integers summing to 10 are (1, 9), (2, 8), (3, 7), (4, 6), and (5, 5). The corresponding values of k = rs are 9, 16, 21, 24, and 25. The sum of all possible values of k is 9 + 16 + 21 + 24 + 25 = 95.`,
    teachingPoint: `Vieta's formulas for x² + bx + c = 0 state that the sum of the roots equals −b and the product equals c. Enumerate all pairs of positive integers satisfying the sum condition, compute each product, and sum the results.`,
    relatedSkills: ['Polynomial operations', 'Linear equations in one variable'],
  },

  {
    // 4^(x+1)=8^(x−1) → 2^(2x+2)=2^(3x−3) → 2x+2=3x−3 → x=5. Verify: 4^6=4096, 8^4=4096 ✓.
    id: 'math-b5a-050',
    test: 'SAT',
    section: 'math',
    domain: 'Advanced Math',
    skill: 'Exponential functions',
    difficulty: 'hard',
    timeTargetSeconds: 95,
    mistakeType: 'concept error',
    questionType: 'grid_in',
    question: `If 4^(x + 1) = 8^(x − 1), what is the value of x?`,
    correctAnswer: '5',
    explanation: `Rewrite both sides as powers of 2: 4^(x+1) = (2²)^(x+1) = 2^(2x+2) and 8^(x−1) = (2³)^(x−1) = 2^(3x−3). Since the bases are equal, set the exponents equal: 2x + 2 = 3x − 3 → x = 5. Verify: 4^6 = 4,096 and 8^4 = 4,096 ✓.`,
    teachingPoint: `To solve exponential equations with different bases, express all terms using the same prime base. With a common base, equate the exponents and solve the resulting linear equation. Always verify the solution.`,
    relatedSkills: ['Linear equations in one variable', 'Polynomial operations'],
  },
]
