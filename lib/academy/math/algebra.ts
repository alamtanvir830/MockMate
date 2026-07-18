import type { MathAcademySkill } from './types'

export const algebraSkills: MathAcademySkill[] = [
  // ─────────────────────────────────────────────────────────────────────────────
  // 1. Linear Equations (one variable)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: 'linear-equations',
    title: 'Linear Equations',
    domain: 'algebra',
    overview: {
      whatItTests:
        'The ability to isolate a variable in a single-variable linear equation, including equations with fractions, parentheses, and variables on both sides.',
      howItAppears:
        'Questions either give a bare equation to solve, or wrap the algebra in a word problem where you must first write the equation and then solve it.',
      whyStudentsMissIt:
        'Students rush through distributing parentheses or clearing fractions and make arithmetic errors, or they set up the equation from a word problem incorrectly by misreading which quantity is unknown.',
      whatToLookFor:
        'Parentheses that require distribution, fractions that can be cleared by multiplying both sides, and "equals" language in word problems such as "costs the same as," "is equal to," or "totals."',
    },
    strategy: {
      steps: [
        'If there are parentheses, distribute first on both sides.',
        'If there are fractions, multiply every term on both sides by the least common denominator to clear them.',
        'Collect variable terms on one side and constant terms on the other.',
        'Divide both sides by the coefficient of the variable.',
        'Substitute your answer back into the original equation to verify.',
      ],
      timeSavingTip:
        'On word problems, underline the sentence that describes what equals what — that sentence directly gives you your equation.',
      whenNotToOverthink:
        'If the equation is already in the form ax = b with no fractions or parentheses, just divide and move on.',
    },
    commonTraps: [
      {
        title: 'Sign error when subtracting',
        description:
          'Subtracting a negative term on one side often becomes adding it on the other, and students flip the sign incorrectly.',
        avoidance:
          'Write out every step. When you move a term across the equals sign, change its sign deliberately and check it.',
      },
      {
        title: 'Incomplete distribution',
        description:
          'Students distribute a coefficient into the first term inside parentheses but forget to multiply every term, e.g., 3(x + 4) becomes 3x + 4 instead of 3x + 12.',
        avoidance:
          'Draw an arrow from the coefficient to each term inside the parentheses before distributing.',
      },
      {
        title: 'Forgetting to multiply ALL terms when clearing fractions',
        description:
          'When multiplying by the LCD to clear fractions, students apply it only to the fraction and not to whole-number terms on the same side.',
        avoidance:
          'Write the LCD as a multiplier in front of every single term in the equation, including constants.',
      },
      {
        title: 'Setting up the wrong unknown in word problems',
        description:
          'Students assign x to the total when the question asks for a part, or vice versa, leading to a correct equation for the wrong quantity.',
        avoidance:
          'Write "Let x = ___" explicitly before writing the equation and confirm at the end that x matches what the question asked for.',
      },
    ],
    guidedExamples: [
      {
        id: 'linear-equations-ex-1',
        question: 'Solve for x: 4(x − 3) + 2 = 3x + 7',
        steps: [
          {
            instruction: 'Distribute the 4',
            content:
              '4(x − 3) + 2 = 3x + 7  →  4x − 12 + 2 = 3x + 7  →  4x − 10 = 3x + 7',
          },
          {
            instruction: 'Collect variable terms on the left',
            content: '4x − 3x − 10 = 7  →  x − 10 = 7',
          },
          {
            instruction: 'Isolate x',
            content: 'x = 7 + 10 = 17',
          },
        ],
        choices: [
          { label: 'A', text: '−17' },
          { label: 'B', text: '3' },
          { label: 'C', text: '17' },
          { label: 'D', text: '27' },
        ],
        correctAnswer: 'C',
        explanation:
          'Distribute to get 4x − 10 = 3x + 7, then subtract 3x from both sides to get x − 10 = 7, then add 10 to get x = 17. Checking: 4(17 − 3) + 2 = 4(14) + 2 = 56 + 2 = 58 and 3(17) + 7 = 51 + 7 = 58. ✓',
        wrongAnswerExplanations: {
          A: 'This comes from treating (x − 3) as −(x − 3) and getting −4x instead of 4x when distributing.',
          B: 'This comes from adding 3x to both sides instead of subtracting, giving 7x = 3 and then incorrectly solving.',
          D: 'This comes from distributing the 4 correctly but then adding 3x to both sides, getting 7x − 10 = 7 → x = 17/7, then making an arithmetic error.',
        },
      },
      {
        id: 'linear-equations-ex-2',
        question: 'Solve for x: (x/3) + (x/6) = 5',
        steps: [
          {
            instruction: 'Clear the fractions by multiplying every term by 6',
            content:
              '6 · (x/3) + 6 · (x/6) = 6 · 5  →  2x + x = 30  →  3x = 30',
          },
          {
            instruction: 'Divide both sides by 3',
            content: 'x = 10',
          },
          {
            instruction: 'Verify',
            content: '(10/3) + (10/6) = 20/6 + 10/6 = 30/6 = 5 ✓',
          },
        ],
        choices: [
          { label: 'A', text: '6' },
          { label: 'B', text: '10' },
          { label: 'C', text: '15' },
          { label: 'D', text: '30' },
        ],
        correctAnswer: 'B',
        explanation:
          'Multiply every term by the LCD of 6 to clear fractions: 2x + x = 30, so 3x = 30 and x = 10.',
        wrongAnswerExplanations: {
          A: 'This comes from multiplying only the fraction terms by 6 but leaving the right side as 5, giving 3x = 5 → x ≈ 1.67, then choosing 6 as the closest answer.',
          D: 'This comes from adding the denominators and solving (x/9) = 5 to get x = 45, or simply multiplying 5 by 6 without collecting like terms.',
        },
      },
      {
        id: 'linear-equations-ex-3',
        stimulus:
          'A store sells two sizes of juice. A small bottle costs $2 and a large bottle costs $5. Marcus buys a total of 8 bottles and spends exactly $25.',
        question: 'How many large bottles did Marcus buy?',
        steps: [
          {
            instruction: 'Define the variable and write the equation',
            content:
              'Let L = number of large bottles. Then small bottles = 8 − L. Total cost: 5L + 2(8 − L) = 25.',
          },
          {
            instruction: 'Distribute and simplify',
            content: '5L + 16 − 2L = 25  →  3L + 16 = 25  →  3L = 9',
          },
          {
            instruction: 'Solve and check',
            content:
              'L = 3. Check: 3 large + 5 small = 8 bottles; 5(3) + 2(5) = 15 + 10 = 25 ✓',
          },
        ],
        choices: [
          { label: 'A', text: '2' },
          { label: 'B', text: '3' },
          { label: 'C', text: '5' },
          { label: 'D', text: '6' },
        ],
        correctAnswer: 'B',
        explanation:
          'Let L be the number of large bottles. Small bottles = 8 − L. Setting up the cost equation: 5L + 2(8 − L) = 25 → 3L = 9 → L = 3.',
        wrongAnswerExplanations: {
          A: 'This likely comes from setting up 5L + 2L = 25 (ignoring the total-count constraint) and then making an arithmetic error.',
          C: 'This is the number of small bottles, not large — the answer to the complementary question.',
        },
      },
    ],
    drillQuestions: [
      {
        id: 'linear-equations-d1',
        skillSlug: 'linear-equations',
        difficulty: 'easy',
        question: 'Solve for x: 3x − 7 = 14',
        choices: [
          { label: 'A', text: '7' },
          { label: 'B', text: '3' },
          { label: 'C', text: '9' },
          { label: 'D', text: '2' },
        ],
        correctAnswer: 'A',
        explanation: '3x = 14 + 7 = 21, so x = 21 ÷ 3 = 7.',
        wrongAnswerExplanations: {
          B: 'This comes from dividing 7 by 3 instead of first adding 7 to both sides.',
          C: 'This comes from computing 14 + 7 = 21 correctly but then dividing by 2 instead of 3.',
        },
        teachingPoint: 'Always undo addition/subtraction before division when isolating a variable.',
      },
      {
        id: 'linear-equations-d2',
        skillSlug: 'linear-equations',
        difficulty: 'easy',
        question: 'Solve for x: 2(x + 5) = 18',
        choices: [
          { label: 'A', text: '4' },
          { label: 'B', text: '14' },
          { label: 'C', text: '9' },
          { label: 'D', text: '6' },
        ],
        correctAnswer: 'A',
        explanation:
          'Divide both sides by 2 first (or distribute): x + 5 = 9, then x = 4. Check: 2(4 + 5) = 2(9) = 18 ✓',
        wrongAnswerExplanations: {
          B: 'This comes from subtracting 5 from 18 before dividing by 2, giving (18 − 5)/1 = 13, or a similar order-of-operations error.',
          C: 'This comes from dividing 18 by 2 to get 9 but forgetting to subtract 5, treating the equation as 2x = 18.',
        },
        teachingPoint: 'Divide both sides by the outside coefficient before dealing with terms inside parentheses, or distribute first — either route works.',
      },
      {
        id: 'linear-equations-d3',
        skillSlug: 'linear-equations',
        difficulty: 'medium',
        question: 'Solve for x: 5x + 4 = 2x − 11',
        choices: [
          { label: 'A', text: '−5' },
          { label: 'B', text: '5' },
          { label: 'C', text: '−7' },
          { label: 'D', text: '7' },
        ],
        correctAnswer: 'A',
        explanation:
          '5x − 2x = −11 − 4 → 3x = −15 → x = −5. Check: 5(−5) + 4 = −21 and 2(−5) − 11 = −21 ✓',
        wrongAnswerExplanations: {
          B: 'This comes from ignoring the negative signs, solving 3x = 15 → x = 5.',
          C: 'This comes from computing 5x − 2x = 3x correctly but then setting 3x = −11 + 4 = −7 instead of −11 − 4.',
        },
        teachingPoint: 'When variables appear on both sides, subtract the smaller variable term from both sides to keep the coefficient positive.',
      },
      {
        id: 'linear-equations-d4',
        skillSlug: 'linear-equations',
        difficulty: 'medium',
        stimulus:
          'A rental company charges a flat fee of $40 plus $15 per hour for equipment. A customer paid a total of $100.',
        question: 'For how many hours did the customer rent the equipment?',
        choices: [
          { label: 'A', text: '3' },
          { label: 'B', text: '4' },
          { label: 'C', text: '5' },
          { label: 'D', text: '6' },
        ],
        correctAnswer: 'B',
        explanation:
          'Set up the equation: 40 + 15h = 100. Subtract 40: 15h = 60. Divide by 15: h = 4.',
        wrongAnswerExplanations: {
          A: 'This comes from subtracting 40 correctly to get 60 but then dividing by 20 instead of 15.',
          C: 'This comes from using the total (100) divided by 15 before subtracting the flat fee, giving 100/15 ≈ 6.67, then rounding down.',
        },
        teachingPoint: 'In word problems with a flat fee, subtract the fixed amount from the total first, then divide by the per-unit rate.',
      },
      {
        id: 'linear-equations-d5',
        skillSlug: 'linear-equations',
        difficulty: 'hard',
        question: 'If (x + 2)/3 + (x − 1)/6 = 5, what is the value of x?',
        choices: [
          { label: 'A', text: '5' },
          { label: 'B', text: '7' },
          { label: 'C', text: '9' },
          { label: 'D', text: '11' },
        ],
        correctAnswer: 'C',
        explanation:
          'Multiply every term by the LCD of 6: 2(x + 2) + (x − 1) = 30 → 2x + 4 + x − 1 = 30 → 3x + 3 = 30 → 3x = 27 → x = 9. Check: (9 + 2)/3 + (9 − 1)/6 = 11/3 + 8/6 = 22/6 + 8/6 = 30/6 = 5 ✓',
        wrongAnswerExplanations: {
          A: 'Substituting x = 5: (7)/3 + (4)/6 = 14/6 + 4/6 = 18/6 = 3 ≠ 5.',
          B: 'Substituting x = 7: (9)/3 + (6)/6 = 3 + 1 = 4 ≠ 5.',
        },
        teachingPoint: 'Multiply every term by the LCD to clear all fractions at once, then solve the resulting integer equation.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 2. Linear Equations in Two Variables
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: 'linear-equations-two-variables',
    title: 'Linear Equations in Two Variables',
    domain: 'algebra',
    overview: {
      whatItTests:
        'Understanding the relationship between two variables in a linear equation — interpreting slope and y-intercept, finding specific values, and working with the equation of a line.',
      howItAppears:
        'Questions present an equation like y = mx + b or ax + by = c and ask for the value of one variable given the other, the slope, the y-intercept, or an interpretation in a real-world context.',
      whyStudentsMissIt:
        'Students confuse slope and y-intercept when interpreting real-world linear models, or they substitute an x-value but solve for x instead of y (or vice versa).',
      whatToLookFor:
        'Key words like "rate," "per," and "each" that signal slope, and "initial," "starting value," or "flat fee" that signal the y-intercept.',
    },
    strategy: {
      steps: [
        'Identify what each variable represents, especially in word problems.',
        'If the equation is not in slope-intercept form (y = mx + b), rewrite it that way.',
        'To find the slope, read off m; to find the y-intercept, read off b or set x = 0.',
        'To find y for a specific x (or x for a specific y), substitute and solve.',
        'Double-check by asking whether your answer has the right units and makes sense in context.',
      ],
      timeSavingTip:
        'When a question just asks for slope or y-intercept, rewrite the equation in y = mx + b form in one step — do not solve for specific points.',
      whenNotToOverthink:
        'If you are asked for the y-intercept, simply set x = 0; you do not need to find the slope first.',
    },
    commonTraps: [
      {
        title: 'Mixing up slope and intercept in context',
        description:
          'In a model like C = 12t + 30, students say 12 is the starting value and 30 is the rate, reversing the roles.',
        avoidance:
          'The coefficient of the variable (here t) is always the rate of change; the constant term is always the starting value.',
      },
      {
        title: 'Not isolating y before reading slope',
        description:
          'Given 3x − 2y = 8, students read the coefficient of x (3) as the slope instead of converting to y = (3/2)x − 4.',
        avoidance:
          'Always rewrite in y = mx + b before identifying slope or y-intercept.',
      },
      {
        title: 'Substituting into the wrong variable',
        description:
          'A question says "when x = 4, find y" and a student substitutes 4 for y instead.',
        avoidance:
          'Underline which variable you are given and which you are solving for before substituting.',
      },
    ],
    guidedExamples: [
      {
        id: 'linear-equations-two-variables-ex-1',
        stimulus:
          'A delivery driver is paid a flat weekly salary of $200 plus $0.30 per mile driven. The total weekly pay P in dollars is modeled by P = 0.30m + 200, where m is the number of miles driven.',
        question: 'What is the best interpretation of 200 in this equation?',
        steps: [
          {
            instruction: 'Identify the form of the equation',
            content:
              'P = 0.30m + 200 is in the form y = mx + b, where 0.30 is the slope (rate per mile) and 200 is the y-intercept (value when m = 0).',
          },
          {
            instruction: 'Interpret the y-intercept',
            content:
              'When m = 0 miles are driven, P = 200. This means the driver earns $200 even with zero miles, which is the flat weekly salary.',
          },
          {
            instruction: 'Eliminate wrong interpretations',
            content:
              '200 is not a rate (that is 0.30). It is not the pay per mile. It is not a total for a specific number of miles.',
          },
        ],
        choices: [
          { label: 'A', text: 'The pay increases by $200 for every mile driven.' },
          { label: 'B', text: 'The driver earns $200 per hour.' },
          { label: 'C', text: 'The driver\'s flat weekly salary, earned regardless of miles driven.' },
          { label: 'D', text: 'The total pay when the driver works 200 miles.' },
        ],
        correctAnswer: 'C',
        explanation:
          'In the equation P = 0.30m + 200, the constant 200 is the y-intercept. Setting m = 0 gives P = 200, meaning the driver earns $200 even without driving any miles — this is the flat weekly salary.',
        wrongAnswerExplanations: {
          A: 'A $200 increase per mile would mean 200 is the slope (coefficient of m), not the constant term.',
          D: 'To find pay at 200 miles, you would substitute m = 200 into the equation, giving P = 0.30(200) + 200 = 260, not 200.',
        },
      },
      {
        id: 'linear-equations-two-variables-ex-2',
        question: 'Line k passes through (0, −3) and (4, 5). What is the equation of line k?',
        steps: [
          {
            instruction: 'Find the slope',
            content:
              'm = (5 − (−3)) / (4 − 0) = 8 / 4 = 2',
          },
          {
            instruction: 'Use the y-intercept directly',
            content:
              'The point (0, −3) is the y-intercept, so b = −3.',
          },
          {
            instruction: 'Write the equation',
            content: 'y = 2x − 3',
          },
        ],
        choices: [
          { label: 'A', text: 'y = 2x + 3' },
          { label: 'B', text: 'y = 2x − 3' },
          { label: 'C', text: 'y = −2x − 3' },
          { label: 'D', text: 'y = (1/2)x − 3' },
        ],
        correctAnswer: 'B',
        explanation:
          'Slope = (5 − (−3))/(4 − 0) = 8/4 = 2. The y-intercept is −3 (from the given point (0, −3)). Equation: y = 2x − 3.',
        wrongAnswerExplanations: {
          A: 'This uses the correct slope but writes the y-intercept as +3 instead of −3, likely from dropping the negative sign of the given point.',
          C: 'This uses the correct intercept but a negative slope. The slope is positive because the line rises from left to right.',
        },
      },
      {
        id: 'linear-equations-two-variables-ex-3',
        question: 'The equation 6x − 3y = 12 is graphed in the xy-plane. What is the slope of the line?',
        steps: [
          {
            instruction: 'Solve for y to put the equation in slope-intercept form',
            content: '6x − 3y = 12  →  −3y = −6x + 12  →  y = 2x − 4',
          },
          {
            instruction: 'Read off the slope',
            content: 'The equation is y = 2x − 4, so the slope m = 2.',
          },
          {
            instruction: 'Verify by noting the y-intercept',
            content: 'Setting x = 0: y = −4. Setting y = 0: x = 2. Rise from (2, 0) to another point: consistent with slope 2.',
          },
        ],
        choices: [
          { label: 'A', text: '−4' },
          { label: 'B', text: '−2' },
          { label: 'C', text: '2' },
          { label: 'D', text: '6' },
        ],
        correctAnswer: 'C',
        explanation:
          'Rewrite 6x − 3y = 12 as y = 2x − 4 by subtracting 6x and dividing by −3. The slope is the coefficient of x, which is 2.',
        wrongAnswerExplanations: {
          A: 'This is the y-intercept (−4), not the slope.',
          D: 'This is the coefficient of x in the original standard-form equation before isolating y; it is not the slope until after you divide by the coefficient of y.',
        },
      },
    ],
    drillQuestions: [
      {
        id: 'linear-equations-two-variables-d1',
        skillSlug: 'linear-equations-two-variables',
        difficulty: 'easy',
        question: 'What is the y-intercept of the line y = −3x + 7?',
        choices: [
          { label: 'A', text: '−3' },
          { label: 'B', text: '3' },
          { label: 'C', text: '7' },
          { label: 'D', text: '−7' },
        ],
        correctAnswer: 'C',
        explanation: 'In y = mx + b, b is the y-intercept. Here b = 7.',
        wrongAnswerExplanations: {
          A: 'This is the slope, not the y-intercept.',
          D: 'This would be the y-intercept if the equation were y = −3x − 7.',
        },
        teachingPoint: 'In y = mx + b, m is the slope and b is the y-intercept — do not confuse the two.',
      },
      {
        id: 'linear-equations-two-variables-d2',
        skillSlug: 'linear-equations-two-variables',
        difficulty: 'easy',
        question: 'If y = 4x − 6 and x = 3, what is y?',
        choices: [
          { label: 'A', text: '3' },
          { label: 'B', text: '6' },
          { label: 'C', text: '9' },
          { label: 'D', text: '18' },
        ],
        correctAnswer: 'B',
        explanation: 'Substitute x = 3: y = 4(3) − 6 = 12 − 6 = 6.',
        wrongAnswerExplanations: {
          C: 'This comes from computing 4(3) − 6 = 12 − 3 = 9, subtracting 3 instead of 6.',
          D: 'This comes from computing 4(3) + 6 = 18, adding instead of subtracting.',
        },
        teachingPoint: 'Substituting means replacing the variable with the given number — make sure to apply the subtraction after multiplying.',
      },
      {
        id: 'linear-equations-two-variables-d3',
        skillSlug: 'linear-equations-two-variables',
        difficulty: 'medium',
        question: 'What is the slope of the line 4x − 2y = 10?',
        choices: [
          { label: 'A', text: '−5' },
          { label: 'B', text: '2' },
          { label: 'C', text: '4' },
          { label: 'D', text: '5' },
        ],
        correctAnswer: 'B',
        explanation:
          'Rewrite: −2y = −4x + 10 → y = 2x − 5. Slope = 2.',
        wrongAnswerExplanations: {
          A: 'This is the y-intercept of y = 2x − 5, not the slope.',
          C: 'This is the coefficient of x before isolating y; dividing by −2 gives 2, not 4.',
        },
        teachingPoint: 'Always isolate y before reading the slope; do not use the coefficient of x from standard form directly.',
      },
      {
        id: 'linear-equations-two-variables-d4',
        skillSlug: 'linear-equations-two-variables',
        difficulty: 'medium',
        stimulus:
          'A candle is 24 cm tall when first lit. It burns at a constant rate of 3 cm per hour. The height H in centimeters is given by H = 24 − 3t, where t is time in hours.',
        question: 'What does the value 24 represent in this equation?',
        choices: [
          { label: 'A', text: 'The rate at which the candle burns' },
          { label: 'B', text: 'The number of hours until the candle is fully burned' },
          { label: 'C', text: 'The height of the candle when it is first lit' },
          { label: 'D', text: 'The height decrease per hour' },
        ],
        correctAnswer: 'C',
        explanation:
          'When t = 0, H = 24. This is the initial height of the candle — 24 cm — before any burning has occurred.',
        wrongAnswerExplanations: {
          A: 'The burn rate is −3 cm per hour (the coefficient of t), not 24.',
          B: 'The candle burns out when H = 0: 24 − 3t = 0 → t = 8 hours, not 24 hours.',
        },
        teachingPoint: 'The constant term in a linear model represents the initial value (when the input is 0), not a rate.',
      },
      {
        id: 'linear-equations-two-variables-d5',
        skillSlug: 'linear-equations-two-variables',
        difficulty: 'hard',
        question: 'Line j passes through (−2, 7) and (4, −5). Which of the following is an equation of line j?',
        choices: [
          { label: 'A', text: 'y = −2x + 3' },
          { label: 'B', text: 'y = 2x + 3' },
          { label: 'C', text: 'y = −2x − 3' },
          { label: 'D', text: 'y = 2x − 3' },
        ],
        correctAnswer: 'A',
        explanation:
          'Slope = (−5 − 7)/(4 − (−2)) = −12/6 = −2. Using point (4, −5): −5 = −2(4) + b → −5 = −8 + b → b = 3. Equation: y = −2x + 3. Check with (−2, 7): y = −2(−2) + 3 = 4 + 3 = 7 ✓',
        wrongAnswerExplanations: {
          B: 'This uses the correct intercept (3) but a positive slope. The slope is negative because the line falls from left to right (y decreases as x increases).',
          D: 'This uses a positive slope and a negative intercept, which are both incorrect based on the two given points.',
        },
        teachingPoint: 'The sign of the slope tells you whether the line rises or falls — always check the direction by looking at whether y increases or decreases as x increases.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 3. Linear Functions
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: 'linear-functions',
    title: 'Linear Functions',
    domain: 'algebra',
    overview: {
      whatItTests:
        'Understanding functions expressed in f(x) notation, evaluating functions at given inputs, interpreting function behavior (increasing/decreasing, rate of change), and connecting tables, equations, and graphs of linear functions.',
      howItAppears:
        'Questions may give f(x) = mx + b and ask for f(a), or give a table of values and ask for the equation, or describe a real-world linear relationship and ask what f(k) represents.',
      whyStudentsMissIt:
        'Students treat f(x) as "f times x" rather than "f evaluated at x," or they confuse a function\'s value at a point with the point\'s coordinates, reading the wrong axis.',
      whatToLookFor:
        'The notation f(a) = ? means "plug a in for x." When given a table, look for a constant rate of change (equal differences in output for equal differences in input).',
    },
    strategy: {
      steps: [
        'Read f(a) as "substitute a for every x in the formula."',
        'If working from a table, confirm the rate of change is constant (Δy/Δx is the same for every pair of rows).',
        'Use two points from the table to compute slope; then use one point to find the y-intercept.',
        'For word problems, identify what one unit of input change does to the output — that is the slope.',
        'Check that your function reproduces all given table values or satisfies all given conditions.',
      ],
      timeSavingTip:
        'When asked for f(0), just read the constant term — you do not need to do any arithmetic.',
      whenNotToOverthink:
        'If the question gives you f(x) and a value of x, substitute immediately. You do not need to find intercepts or slopes unless asked.',
    },
    commonTraps: [
      {
        title: 'Treating f(x) as multiplication',
        description:
          'Students write f(3) = f × 3 instead of substituting 3 into the function rule.',
        avoidance:
          'Remember that f(x) is function notation, not a product. Replace every x in the formula with the given input value.',
      },
      {
        title: 'Non-constant rate of change',
        description:
          'Students assume a table defines a linear function without checking that Δy/Δx is the same in every row.',
        avoidance:
          'Compute the ratio of output change to input change between every consecutive pair of rows; if it varies, the function is not linear.',
      },
      {
        title: 'Confusing f(a) = b with the point (b, a)',
        description:
          'Given f(4) = 9, students sometimes think x = 9 and y = 4 instead of x = 4 and y = 9.',
        avoidance:
          'The input goes inside the parentheses (x-value); the output is what the function equals (y-value).',
      },
    ],
    guidedExamples: [
      {
        id: 'linear-functions-ex-1',
        question: 'If f(x) = 5x − 3, what is f(−2)?',
        steps: [
          {
            instruction: 'Substitute x = −2 into the function',
            content: 'f(−2) = 5(−2) − 3 = −10 − 3 = −13',
          },
          {
            instruction: 'Confirm by considering the sign',
            content:
              'Both terms are negative: 5(−2) = −10 and subtracting 3 makes it more negative, giving −13.',
          },
          {
            instruction: 'Check against the choices',
            content: '−13 matches exactly one answer choice.',
          },
        ],
        choices: [
          { label: 'A', text: '−13' },
          { label: 'B', text: '−7' },
          { label: 'C', text: '7' },
          { label: 'D', text: '13' },
        ],
        correctAnswer: 'A',
        explanation:
          'f(−2) = 5(−2) − 3 = −10 − 3 = −13.',
        wrongAnswerExplanations: {
          B: 'This comes from computing 5(−2) = −10, then subtracting 3 incorrectly as adding 3 to get −7.',
          C: 'This comes from treating 5(−2) as −10 but then writing f(−2) = 10 − 3 = 7 (dropping the negative).',
        },
      },
      {
        id: 'linear-functions-ex-2',
        stimulus:
          'The table below shows selected values of the linear function g.\n\n| x | g(x) |\n|---|------|\n| 1 |   8  |\n| 3 |  14  |\n| 5 |  20  |',
        question: 'Which of the following defines g(x)?',
        steps: [
          {
            instruction: 'Find the slope using two points',
            content:
              'Using (1, 8) and (3, 14): slope = (14 − 8)/(3 − 1) = 6/2 = 3.',
          },
          {
            instruction: 'Find the y-intercept',
            content:
              'Using point (1, 8): 8 = 3(1) + b → b = 5. So g(x) = 3x + 5.',
          },
          {
            instruction: 'Verify with a third point',
            content:
              'g(5) = 3(5) + 5 = 15 + 5 = 20 ✓',
          },
        ],
        choices: [
          { label: 'A', text: 'g(x) = 3x + 5' },
          { label: 'B', text: 'g(x) = 3x + 8' },
          { label: 'C', text: 'g(x) = 6x + 2' },
          { label: 'D', text: 'g(x) = 2x + 6' },
        ],
        correctAnswer: 'A',
        explanation:
          'Slope = (14 − 8)/(3 − 1) = 3. Using (1, 8): b = 8 − 3(1) = 5. So g(x) = 3x + 5.',
        wrongAnswerExplanations: {
          B: 'This uses the correct slope but sets b equal to g(1) = 8 instead of solving for b correctly.',
          D: 'This uses a slope of 2 (perhaps computed as (20 − 8)/(5 − 1) = 12/4 = 3 — actually that gives 3, so slope 2 is an arithmetic error) and an incorrect intercept.',
        },
      },
      {
        id: 'linear-functions-ex-3',
        stimulus:
          'A taxi charges an initial pickup fee and then a constant cost per mile. The function C(m) = 2.5m + 4 models the total cost C in dollars for a trip of m miles.',
        question: 'What is the best interpretation of C(6) = 19?',
        steps: [
          {
            instruction: 'Understand what f(input) = output means',
            content:
              'C(6) means the cost when m = 6 miles. C(6) = 19 means the total cost of a 6-mile trip is $19.',
          },
          {
            instruction: 'Verify: C(6) = 2.5(6) + 4 = 15 + 4 = 19 ✓',
            content: 'The calculation confirms the answer.',
          },
          {
            instruction: 'Eliminate wrong interpretations',
            content:
              'C(6) = 19 does not mean 6 is the cost or that 19 is a number of miles.',
          },
        ],
        choices: [
          { label: 'A', text: 'The cost per mile is $6.' },
          { label: 'B', text: 'A trip that costs $6 covers 19 miles.' },
          { label: 'C', text: 'A 6-mile trip costs $19.' },
          { label: 'D', text: 'The pickup fee for a 19-mile trip is $6.' },
        ],
        correctAnswer: 'C',
        explanation:
          'C(m) gives the cost for m miles. C(6) = 19 means that when m = 6, the cost is $19 — a 6-mile trip costs $19.',
        wrongAnswerExplanations: {
          A: 'The cost per mile is 2.5 (the slope of C), not 6.',
          B: 'This reverses input and output: 6 is the number of miles (input) and 19 is the cost (output), not the other way around.',
        },
      },
    ],
    drillQuestions: [
      {
        id: 'linear-functions-d1',
        skillSlug: 'linear-functions',
        difficulty: 'easy',
        question: 'If f(x) = −2x + 9, what is f(4)?',
        choices: [
          { label: 'A', text: '1' },
          { label: 'B', text: '17' },
          { label: 'C', text: '−17' },
          { label: 'D', text: '−1' },
        ],
        correctAnswer: 'A',
        explanation: 'f(4) = −2(4) + 9 = −8 + 9 = 1.',
        wrongAnswerExplanations: {
          B: 'This comes from computing 2(4) + 9 = 17, using +2 instead of −2.',
          D: 'This comes from computing −2(4) + 9 correctly as 1 but then writing −1 after an arithmetic slip.',
        },
        teachingPoint: 'Function evaluation: replace x with the given number and simplify carefully, keeping track of signs.',
      },
      {
        id: 'linear-functions-d2',
        skillSlug: 'linear-functions',
        difficulty: 'easy',
        stimulus:
          'The function h is defined by h(x) = 6x − 2.',
        question: 'For what value of x does h(x) = 22?',
        choices: [
          { label: 'A', text: '2' },
          { label: 'B', text: '4' },
          { label: 'C', text: '6' },
          { label: 'D', text: '3' },
        ],
        correctAnswer: 'B',
        explanation:
          'Set h(x) = 22: 6x − 2 = 22 → 6x = 24 → x = 4.',
        wrongAnswerExplanations: {
          A: 'This comes from dividing 24 by 12 instead of 6, a slip when handling the equation.',
          C: 'This comes from setting 6x = 22 and then dividing, giving approximately 3.67, then choosing 6.',
        },
        teachingPoint: 'To find x when f(x) is given, write an equation and solve — this is the reverse of evaluating a function.',
      },
      {
        id: 'linear-functions-d3',
        skillSlug: 'linear-functions',
        difficulty: 'medium',
        stimulus:
          'The table below gives values of a linear function p.\n\n| x | p(x) |\n|---|------|\n| 0 |  −1  |\n| 2 |   5  |\n| 4 |  11  |',
        question: 'What is p(7)?',
        choices: [
          { label: 'A', text: '17' },
          { label: 'B', text: '20' },
          { label: 'C', text: '22' },
          { label: 'D', text: '14' },
        ],
        correctAnswer: 'B',
        explanation:
          'Slope = (5 − (−1))/(2 − 0) = 6/2 = 3. y-intercept = −1. So p(x) = 3x − 1. p(7) = 3(7) − 1 = 21 − 1 = 20.',
        wrongAnswerExplanations: {
          A: 'This comes from computing 3(7) − 4 = 17, using an incorrect intercept.',
          D: 'This comes from computing 3(7) − 7 = 14, subtracting 7 instead of 1.',
        },
        teachingPoint: 'Use two table points to find slope, use the (0, y) row directly for the intercept, then evaluate.',
      },
      {
        id: 'linear-functions-d4',
        skillSlug: 'linear-functions',
        difficulty: 'medium',
        question: 'A linear function f satisfies f(2) = 7 and f(6) = 19. What is f(10)?',
        choices: [
          { label: 'A', text: '27' },
          { label: 'B', text: '31' },
          { label: 'C', text: '33' },
          { label: 'D', text: '35' },
        ],
        correctAnswer: 'B',
        explanation:
          'Slope = (19 − 7)/(6 − 2) = 12/4 = 3. Using f(6) = 19: 19 = 3(6) + b → b = 1. So f(x) = 3x + 1. f(10) = 3(10) + 1 = 31.',
        wrongAnswerExplanations: {
          A: 'This comes from using slope 3 but b = 0, giving f(x) = 3x and f(10) = 30, then a slight miscalculation.',
          C: 'This comes from computing slope as (19 − 7)/(6 − 2) = 3 but using f(2) = 7 incorrectly: 7 = 3(2) + b → b = 1, then f(10) = 3(10) + 1 = 31 — so 33 would arise from a slope error, perhaps slope = 3.25.',
        },
        teachingPoint: 'When two function values are given, compute slope from the two points, then use one point to find the intercept.',
      },
      {
        id: 'linear-functions-d5',
        skillSlug: 'linear-functions',
        difficulty: 'hard',
        stimulus:
          'A linear function f has a slope of −4. It is also known that f(3) = 2.',
        question: 'Which of the following is equal to f(−1)?',
        choices: [
          { label: 'A', text: '−14' },
          { label: 'B', text: '18' },
          { label: 'C', text: '14' },
          { label: 'D', text: '−18' },
        ],
        correctAnswer: 'B',
        explanation:
          'f(x) = −4x + b. Using f(3) = 2: 2 = −4(3) + b = −12 + b → b = 14. So f(x) = −4x + 14. f(−1) = −4(−1) + 14 = 4 + 14 = 18.',
        wrongAnswerExplanations: {
          A: 'This comes from computing f(−1) = −4(−1) + b correctly as 4 + b but using b = −18 from a sign error: 2 = −12 + b → b = −14, then 4 + (−18) = −14.',
          C: 'This is the y-intercept b = 14, not f(−1).',
        },
        teachingPoint: 'Find the y-intercept first using the given function value, then substitute the new input.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 4. Systems of Equations
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: 'systems-of-equations',
    title: 'Systems of Equations',
    domain: 'algebra',
    overview: {
      whatItTests:
        'Solving a system of two linear equations in two unknowns by substitution or elimination, and interpreting the solution in context.',
      howItAppears:
        'Questions may give two equations and ask for a specific variable\'s value, the sum x + y, or how many solutions the system has. Word problems set up two equations from a described situation.',
      whyStudentsMissIt:
        'Students solve for one variable and forget to substitute back to find the other, or they make a sign error during elimination when one of the coefficients is negative.',
      whatToLookFor:
        'When one equation already has an isolated variable, use substitution. When coefficients of one variable match (or are easy to match with multiplication), use elimination.',
    },
    strategy: {
      steps: [
        'Decide: substitution (if one variable is already isolated) or elimination (if coefficients are easy to match).',
        'Substitution: express one variable in terms of the other from the simpler equation; substitute into the other equation.',
        'Elimination: multiply one or both equations so that the coefficients of one variable are opposites; add the equations.',
        'Solve the resulting single-variable equation.',
        'Back-substitute to find the other variable; write the solution as an ordered pair (x, y) and verify in both original equations.',
      ],
      timeSavingTip:
        'If the question only asks for x + y (or x − y), you can often add (or subtract) the two equations directly without solving for each variable individually.',
      whenNotToOverthink:
        'If one equation is y = (expression), substitute directly into the other equation — you do not need elimination.',
    },
    commonTraps: [
      {
        title: 'Solving for only one variable',
        description:
          'After eliminating one variable, students find x but stop there when the question actually asked for y (or vice versa).',
        avoidance:
          'Re-read the question after finding one variable. If the question asks for both or for the other variable, substitute back.',
      },
      {
        title: 'Sign error during elimination',
        description:
          'When subtracting one equation from the other, students add instead of subtract, or forget to distribute the negative sign to all terms.',
        avoidance:
          'Instead of subtracting, multiply the equation you want to eliminate by −1 and then add — this makes the sign change explicit.',
      },
      {
        title: 'Forgetting to check for no-solution or infinite-solutions cases',
        description:
          'When asked how many solutions a system has, students solve the system without noticing that both variables cancel out.',
        avoidance:
          'If both variables cancel and you get a false statement (like 0 = 5), there are no solutions. If you get a true statement (like 0 = 0), there are infinite solutions.',
      },
      {
        title: 'Incorrect set-up of word problems',
        description:
          'Students write only one equation for a two-unknown problem, or they assign both unknowns to the same letter.',
        avoidance:
          'Define two separate variables with two separate letters, write one equation per constraint, and confirm there are exactly two equations before solving.',
      },
    ],
    guidedExamples: [
      {
        id: 'systems-of-equations-ex-1',
        question: 'Solve the system: y = 2x − 1 and 3x + y = 14. What is x?',
        steps: [
          {
            instruction: 'Substitute the first equation into the second',
            content:
              '3x + (2x − 1) = 14  →  5x − 1 = 14  →  5x = 15  →  x = 3',
          },
          {
            instruction: 'Find y using the first equation',
            content: 'y = 2(3) − 1 = 6 − 1 = 5',
          },
          {
            instruction: 'Verify in both equations',
            content:
              'y = 2x − 1: 5 = 2(3) − 1 = 5 ✓  |  3x + y = 14: 3(3) + 5 = 14 ✓',
          },
        ],
        choices: [
          { label: 'A', text: '2' },
          { label: 'B', text: '3' },
          { label: 'C', text: '4' },
          { label: 'D', text: '5' },
        ],
        correctAnswer: 'B',
        explanation:
          'Substitute y = 2x − 1 into 3x + y = 14 to get 5x − 1 = 14, so x = 3. (And y = 5.)',
        wrongAnswerExplanations: {
          A: 'Substituting x = 2 into y = 2x − 1 gives y = 3, and 3(2) + 3 = 9 ≠ 14, so x = 2 is wrong.',
          D: 'This is the value of y, not x — the question asked for x.',
        },
      },
      {
        id: 'systems-of-equations-ex-2',
        question: 'Solve by elimination: 3x + 2y = 16 and 3x − y = 7. What is y?',
        steps: [
          {
            instruction: 'Subtract the second equation from the first',
            content:
              '(3x + 2y) − (3x − y) = 16 − 7  →  3y = 9  →  y = 3',
          },
          {
            instruction: 'Find x using the second equation',
            content: '3x − 3 = 7  →  3x = 10  →  x = 10/3',
          },
          {
            instruction: 'Verify y in the first equation',
            content: '3(10/3) + 2(3) = 10 + 6 = 16 ✓',
          },
        ],
        choices: [
          { label: 'A', text: '1' },
          { label: 'B', text: '2' },
          { label: 'C', text: '3' },
          { label: 'D', text: '4' },
        ],
        correctAnswer: 'C',
        explanation:
          'Since both equations have 3x, subtracting eliminates x: 3y = 9, so y = 3.',
        wrongAnswerExplanations: {
          B: 'This comes from adding the equations instead of subtracting, giving 6x + y = 23, then making a further error.',
          D: 'This comes from correctly computing 3y = 9 but then dividing 9 by 3 as 4 (arithmetic error).',
        },
      },
      {
        id: 'systems-of-equations-ex-3',
        stimulus:
          'Two friends together bought 12 items at a market. Pencils cost $0.50 each and notebooks cost $2.00 each. They spent $12 in total.',
        question: 'How many notebooks did they buy?',
        steps: [
          {
            instruction: 'Define variables and set up equations',
            content:
              'Let p = number of pencils, n = number of notebooks. Equation 1 (count): p + n = 12. Equation 2 (cost): 0.5p + 2n = 12.',
          },
          {
            instruction: 'Solve by substitution: p = 12 − n',
            content:
              '0.5(12 − n) + 2n = 12  →  6 − 0.5n + 2n = 12  →  6 + 1.5n = 12  →  1.5n = 6  →  n = 4',
          },
          {
            instruction: 'Verify: p = 12 − 4 = 8; 0.5(8) + 2(4) = 4 + 8 = 12 ✓',
            content: 'Total items: 8 + 4 = 12 ✓',
          },
        ],
        choices: [
          { label: 'A', text: '2' },
          { label: 'B', text: '3' },
          { label: 'C', text: '4' },
          { label: 'D', text: '6' },
        ],
        correctAnswer: 'C',
        explanation:
          'Set up p + n = 12 and 0.5p + 2n = 12. Substitute p = 12 − n to get 1.5n = 6, so n = 4.',
        wrongAnswerExplanations: {
          B: 'n = 3 gives p = 9: cost = 0.5(9) + 2(3) = 4.50 + 6 = $10.50 ≠ $12.',
          D: 'n = 6 gives p = 6: cost = 0.5(6) + 2(6) = 3 + 12 = $15 ≠ $12.',
        },
      },
    ],
    drillQuestions: [
      {
        id: 'systems-of-equations-d1',
        skillSlug: 'systems-of-equations',
        difficulty: 'easy',
        question: 'If y = x + 3 and y = 2x − 1, what is x?',
        choices: [
          { label: 'A', text: '3' },
          { label: 'B', text: '4' },
          { label: 'C', text: '7' },
          { label: 'D', text: '5' },
        ],
        correctAnswer: 'B',
        explanation:
          'Set the two expressions equal: x + 3 = 2x − 1 → 4 = x. So x = 4 (and y = 7).',
        wrongAnswerExplanations: {
          C: 'This is the value of y, not x.',
          A: 'This comes from computing 3 = x − 1 → x = 4 but then writing 3 as the answer to match the first equation\'s constant.',
        },
        teachingPoint: 'When both equations equal y, set the right-hand sides equal to each other and solve for x.',
      },
      {
        id: 'systems-of-equations-d2',
        skillSlug: 'systems-of-equations',
        difficulty: 'easy',
        question: 'What is x + y if x + y = 10 and 2x − y = 5?',
        choices: [
          { label: 'A', text: '5' },
          { label: 'B', text: '10' },
          { label: 'C', text: '15' },
          { label: 'D', text: '8' },
        ],
        correctAnswer: 'B',
        explanation:
          'The first equation directly states x + y = 10. No calculation needed.',
        wrongAnswerExplanations: {
          A: 'This is the value on the right side of the second equation, not x + y.',
          C: 'This comes from adding the right-hand sides of both equations (10 + 5 = 15) without reading the question carefully.',
        },
        teachingPoint: 'Read the question before solving — sometimes the answer appears directly in one of the equations.',
      },
      {
        id: 'systems-of-equations-d3',
        skillSlug: 'systems-of-equations',
        difficulty: 'medium',
        question: 'Solve the system: 2x + 3y = 12 and x − y = 1. What is y?',
        choices: [
          { label: 'A', text: '1' },
          { label: 'B', text: '2' },
          { label: 'C', text: '3' },
          { label: 'D', text: '4' },
        ],
        correctAnswer: 'B',
        explanation:
          'From the second equation, x = y + 1. Substitute: 2(y + 1) + 3y = 12 → 2y + 2 + 3y = 12 → 5y = 10 → y = 2. (x = 3.)',
        wrongAnswerExplanations: {
          A: 'Substituting y = 1: x = 2; check in first: 2(2) + 3(1) = 7 ≠ 12.',
          C: 'This is the value of x, not y — the question asked for y.',
        },
        teachingPoint: 'After solving for one variable, always re-read the question to confirm you are reporting the right quantity.',
      },
      {
        id: 'systems-of-equations-d4',
        skillSlug: 'systems-of-equations',
        difficulty: 'medium',
        question: 'How many solutions does the system 4x − 2y = 6 and 2x − y = 3 have?',
        choices: [
          { label: 'A', text: 'Zero' },
          { label: 'B', text: 'Exactly one' },
          { label: 'C', text: 'Exactly two' },
          { label: 'D', text: 'Infinitely many' },
        ],
        correctAnswer: 'D',
        explanation:
          'Multiply the second equation by 2: 4x − 2y = 6, which is identical to the first equation. Both equations represent the same line, so there are infinitely many solutions.',
        wrongAnswerExplanations: {
          A: 'No solution would require the lines to be parallel but distinct (same slope, different intercept). Here the lines are identical.',
          B: 'Exactly one solution would require the lines to intersect at a single point (different slopes). Here both equations have slope 2.',
        },
        teachingPoint: 'If one equation is a multiple of the other, the two equations define the same line — infinitely many solutions.',
      },
      {
        id: 'systems-of-equations-d5',
        skillSlug: 'systems-of-equations',
        difficulty: 'hard',
        stimulus:
          'Adult tickets to a show cost $8 each and children\'s tickets cost $5 each. A group purchased 20 tickets and paid $136 in total.',
        question: 'How many adult tickets did the group purchase?',
        choices: [
          { label: 'A', text: '8' },
          { label: 'B', text: '10' },
          { label: 'C', text: '12' },
          { label: 'D', text: '14' },
        ],
        correctAnswer: 'C',
        explanation:
          'Let a = adult tickets, c = children\'s tickets. a + c = 20 and 8a + 5c = 136. From the first: c = 20 − a. Substitute: 8a + 5(20 − a) = 136 → 8a + 100 − 5a = 136 → 3a = 36 → a = 12.',
        wrongAnswerExplanations: {
          B: 'a = 10 gives c = 10; cost = 8(10) + 5(10) = 80 + 50 = 130 ≠ 136.',
          D: 'a = 14 gives c = 6; cost = 8(14) + 5(6) = 112 + 30 = 142 ≠ 136.',
        },
        teachingPoint: 'In mixture and ticket word problems, write one equation for quantity (count) and one for value (cost), then solve by substitution.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 5. Linear Inequalities
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: 'linear-inequalities',
    title: 'Linear Inequalities',
    domain: 'algebra',
    overview: {
      whatItTests:
        'Solving one- and two-variable linear inequalities, graphing solution sets on number lines or the coordinate plane, and interpreting inequalities in real-world contexts.',
      howItAppears:
        'Questions ask you to solve an inequality for x, identify the graph of a solution, determine whether a given value satisfies an inequality, or write an inequality to model a constraint in a word problem.',
      whyStudentsMissIt:
        'Students forget to flip the inequality symbol when multiplying or dividing by a negative number, or they choose a solid boundary line when the problem requires a dashed one (strict inequality).',
      whatToLookFor:
        'Negative coefficients on the variable side (they require flipping the sign), and strict vs. non-strict inequality words: "less than / greater than" give strict (<, >) while "at least / at most / no more than / no fewer than" give non-strict (≤, ≥).',
    },
    strategy: {
      steps: [
        'Isolate the variable using the same steps as solving an equation.',
        'When you multiply or divide both sides by a negative number, flip the inequality symbol.',
        'Write the solution in inequality form and, if needed, on a number line (open circle for < or >, closed circle for ≤ or ≥).',
        'For two-variable inequalities, rewrite in y ≤ (or ≥) mx + b form, graph the boundary line, and shade the correct half-plane.',
        'Check by substituting a test value from the solution region back into the original inequality.',
      ],
      timeSavingTip:
        'To test which side of a boundary line to shade, plug in (0, 0) — it is almost never on the boundary, so it gives an instant check.',
      whenNotToOverthink:
        'If the coefficient of the variable is already positive, solve exactly like an equation — the only difference is you write < or > instead of =.',
    },
    commonTraps: [
      {
        title: 'Forgetting to flip the inequality when dividing by a negative',
        description:
          'Solving −3x < 12 by dividing by −3 and writing x < −4 instead of x > −4.',
        avoidance:
          'Circle every step where you multiply or divide by a negative. At each circled step, flip the symbol.',
      },
      {
        title: 'Strict vs. non-strict confusion',
        description:
          'Using < when the problem says "at most" (which requires ≤), or shading a region with a dashed line when the boundary is included.',
        avoidance:
          'Translate carefully: "at most k" → ≤ k, "at least k" → ≥ k, "less than k" → < k, "more than k" → > k.',
      },
      {
        title: 'Shading the wrong half-plane',
        description:
          'Students correctly draw the boundary line but shade the region that does NOT satisfy the inequality.',
        avoidance:
          'Always test a specific point (0, 0 works unless it is on the boundary) in the original inequality; shade the side where the test point makes the inequality true.',
      },
      {
        title: 'Treating a compound inequality incorrectly',
        description:
          'For a < 3x − 6 < b, students solve the two parts independently and miss a sign flip, or forget to apply each operation to all three parts.',
        avoidance:
          'Apply every operation to all three parts of the compound inequality simultaneously.',
      },
    ],
    guidedExamples: [
      {
        id: 'linear-inequalities-ex-1',
        question: 'Solve for x: −4x + 3 ≤ 15',
        steps: [
          {
            instruction: 'Subtract 3 from both sides',
            content: '−4x ≤ 12',
          },
          {
            instruction: 'Divide both sides by −4 and flip the inequality',
            content: 'x ≥ −3',
          },
          {
            instruction: 'Check with a test value: x = 0 (which is ≥ −3)',
            content: '−4(0) + 3 = 3 ≤ 15 ✓. Also check x = −4 (which is < −3): −4(−4) + 3 = 19 ≤ 15? No. ✓ (correctly excluded)',
          },
        ],
        choices: [
          { label: 'A', text: 'x ≤ −3' },
          { label: 'B', text: 'x ≥ −3' },
          { label: 'C', text: 'x ≤ 3' },
          { label: 'D', text: 'x ≥ 3' },
        ],
        correctAnswer: 'B',
        explanation:
          'Subtract 3: −4x ≤ 12. Divide by −4 and flip: x ≥ −3.',
        wrongAnswerExplanations: {
          A: 'This comes from correctly dividing by −4 but forgetting to flip the inequality, giving x ≤ −3.',
          D: 'This comes from dividing 12 by 4 (ignoring the negative) to get x ≥ 3.',
        },
      },
      {
        id: 'linear-inequalities-ex-2',
        stimulus:
          'A school fundraiser needs to raise at least $500. Tickets are sold for $6 each, and the school has already raised $80 from other donations.',
        question: 'Which inequality represents the number of tickets t that must be sold?',
        steps: [
          {
            instruction: 'Write an expression for total money raised',
            content: 'Total = 6t + 80',
          },
          {
            instruction: 'Set up the inequality using "at least $500"',
            content: '6t + 80 ≥ 500',
          },
          {
            instruction: 'Solve to understand the solution',
            content: '6t ≥ 420  →  t ≥ 70',
          },
        ],
        choices: [
          { label: 'A', text: '6t + 80 > 500' },
          { label: 'B', text: '6t + 80 ≥ 500' },
          { label: 'C', text: '6t − 80 ≥ 500' },
          { label: 'D', text: '6t ≥ 500' },
        ],
        correctAnswer: 'B',
        explanation:
          '"At least $500" means the total must be greater than or equal to 500. The total is 6t + 80, giving 6t + 80 ≥ 500.',
        wrongAnswerExplanations: {
          A: '"At least" includes the possibility of reaching exactly $500, so the inequality must be ≥, not >.',
          D: 'This ignores the $80 already raised, requiring ticket sales alone to reach $500 rather than the total.',
        },
      },
      {
        id: 'linear-inequalities-ex-3',
        question: 'Which of the following is a solution to 3 < 2x − 5 ≤ 11?',
        steps: [
          {
            instruction: 'Add 5 to all three parts',
            content: '3 + 5 < 2x ≤ 11 + 5  →  8 < 2x ≤ 16',
          },
          {
            instruction: 'Divide all three parts by 2',
            content: '4 < x ≤ 8',
          },
          {
            instruction: 'Identify which answer choice satisfies 4 < x ≤ 8',
            content: 'x must be strictly greater than 4 and at most 8. Check: x = 4 is excluded (strict <); x = 8 is included (≤); x = 5 satisfies 4 < 5 ≤ 8.',
          },
        ],
        choices: [
          { label: 'A', text: 'x = 4' },
          { label: 'B', text: 'x = 9' },
          { label: 'C', text: 'x = 5' },
          { label: 'D', text: 'x = 0' },
        ],
        correctAnswer: 'C',
        explanation:
          'Solving: 3 < 2x − 5 ≤ 11 → 8 < 2x ≤ 16 → 4 < x ≤ 8. x = 5 satisfies this. x = 4 is excluded (strict inequality), x = 9 > 8, x = 0 < 4.',
        wrongAnswerExplanations: {
          A: 'x = 4 is not a solution because 4 < x means x must be strictly greater than 4, so x = 4 is excluded.',
          B: 'x = 9 fails because 9 > 8, violating x ≤ 8.',
        },
      },
    ],
    drillQuestions: [
      {
        id: 'linear-inequalities-d1',
        skillSlug: 'linear-inequalities',
        difficulty: 'easy',
        question: 'Which value of x satisfies 2x − 5 > 3?',
        choices: [
          { label: 'A', text: 'x = 2' },
          { label: 'B', text: 'x = 4' },
          { label: 'C', text: 'x = 5' },
          { label: 'D', text: 'x = 3' },
        ],
        correctAnswer: 'C',
        explanation:
          '2x − 5 > 3 → 2x > 8 → x > 4. Only x = 5 is strictly greater than 4.',
        wrongAnswerExplanations: {
          B: 'x = 4 gives 2(4) − 5 = 3, which satisfies 2x − 5 = 3 but not 2x − 5 > 3 (strict inequality).',
          D: 'x = 3 gives 2(3) − 5 = 1, and 1 > 3 is false.',
        },
        teachingPoint: 'A strict inequality (>) excludes the boundary value — 4 is not a solution here.',
      },
      {
        id: 'linear-inequalities-d2',
        skillSlug: 'linear-inequalities',
        difficulty: 'easy',
        question: 'Solve for x: 5x − 2 ≤ 18',
        choices: [
          { label: 'A', text: 'x ≤ 4' },
          { label: 'B', text: 'x ≥ 4' },
          { label: 'C', text: 'x ≤ 3' },
          { label: 'D', text: 'x ≤ 5' },
        ],
        correctAnswer: 'A',
        explanation: '5x ≤ 20 → x ≤ 4.',
        wrongAnswerExplanations: {
          B: 'This flips the inequality without any operation that would require flipping (the coefficient 5 is positive).',
          C: 'This comes from computing 18 − 2 = 16 and then dividing by 5 incorrectly as 3.',
        },
        teachingPoint: 'Only flip the inequality when multiplying or dividing by a negative number — a positive coefficient never triggers a flip.',
      },
      {
        id: 'linear-inequalities-d3',
        skillSlug: 'linear-inequalities',
        difficulty: 'medium',
        question: 'Solve for x: −2x + 7 > −1',
        choices: [
          { label: 'A', text: 'x > −4' },
          { label: 'B', text: 'x < −4' },
          { label: 'C', text: 'x < 4' },
          { label: 'D', text: 'x > 4' },
        ],
        correctAnswer: 'C',
        explanation:
          '−2x + 7 > −1 → −2x > −8 → x < 4 (flip when dividing by −2).',
        wrongAnswerExplanations: {
          D: 'This correctly divides by −2 to get x > 4 but forgets to flip the inequality symbol.',
          A: 'This comes from computing 7 − (−1) = 8 incorrectly and dividing, arriving at x > −4.',
        },
        teachingPoint: 'Dividing by a negative requires flipping the inequality symbol — this is the most common error on inequality problems.',
      },
      {
        id: 'linear-inequalities-d4',
        skillSlug: 'linear-inequalities',
        difficulty: 'medium',
        stimulus:
          'A bookshelf can hold at most 30 kg. Each large book weighs 1.5 kg and each small book weighs 0.5 kg. There are already 8 small books on the shelf.',
        question: 'Which inequality represents the number of large books L that can be added?',
        choices: [
          { label: 'A', text: '1.5L ≥ 30' },
          { label: 'B', text: '1.5L + 4 ≤ 30' },
          { label: 'C', text: '1.5L + 4 ≥ 30' },
          { label: 'D', text: '1.5L ≤ 26' },
        ],
        correctAnswer: 'B',
        explanation:
          '8 small books weigh 8 × 0.5 = 4 kg. Adding L large books gives total weight 1.5L + 4. "At most 30 kg" means 1.5L + 4 ≤ 30.',
        wrongAnswerExplanations: {
          A: 'This ignores the weight of the 8 small books already on the shelf.',
          C: '"At most" means ≤, not ≥. This inequality would require exceeding the limit.',
        },
        teachingPoint: '"At most" translates to ≤; include all current weight in the expression before setting up the inequality.',
      },
      {
        id: 'linear-inequalities-d5',
        skillSlug: 'linear-inequalities',
        difficulty: 'hard',
        question: 'If −2 ≤ 3x + 1 < 10, which of the following must be true?',
        choices: [
          { label: 'A', text: '−1 ≤ x < 3' },
          { label: 'B', text: '−1 < x ≤ 3' },
          { label: 'C', text: '0 ≤ x < 3' },
          { label: 'D', text: '−1 ≤ x ≤ 3' },
        ],
        correctAnswer: 'A',
        explanation:
          'Subtract 1 from all parts: −3 ≤ 3x < 9. Divide all parts by 3: −1 ≤ x < 3. The left boundary is included (≤) and the right is excluded (<).',
        wrongAnswerExplanations: {
          B: 'This reverses the inclusion/exclusion: x = −1 IS included (because of ≤) and x = 3 is NOT included (because of <).',
          D: 'This makes both boundaries closed, but the original right inequality is strict (< 10), so x = 3 should be excluded.',
        },
        teachingPoint: 'In a compound inequality, the type of inequality symbol (strict or non-strict) at each end carries through to the solution — track both endpoints independently.',
      },
    ],
  },
]
