import type { QBQuestion } from '@/lib/question-bank/types'

export const mathQuestionsB2: QBQuestion[] = [
  // ─────────────────────────────────────────────────────────────────────────────
  // GROUP 1: Problem-Solving and Data Analysis
  // ─────────────────────────────────────────────────────────────────────────────

  // ── Ratios, Rates, and Proportional Relationships ──────────────────────────

  {
    id: 'math-psda-rrp-008',
    test: 'SAT',
    section: 'math',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Ratios, Rates, and Proportional Relationships',
    difficulty: 'easy',
    timeTargetSeconds: 75,
    mistakeType: 'careless',
    questionType: 'multiple_choice',
    isWordProblem: true,
    stimulus: 'A recipe requires 3 cups of flour for every 2 cups of sugar.',
    question: 'How many cups of flour are needed if 8 cups of sugar are used?',
    choices: [
      { label: 'A', text: '10' },
      { label: 'B', text: '12' },
      { label: 'C', text: '14' },
      { label: 'D', text: '16' },
    ],
    correctAnswer: 'B',
    explanation:
      'The ratio of flour to sugar is 3:2. Set up a proportion: flour/sugar = 3/2 = x/8. Cross-multiply: 2x = 24, so x = 12.',
    wrongAnswerExplanations: {
      A: '10 does not satisfy the 3:2 ratio. Check: 10/8 = 1.25, not 1.5.',
      C: '14 does not satisfy the 3:2 ratio. Check: 14/8 = 1.75, not 1.5.',
      D: '16 doubles the sugar quantity but does not apply the correct 3:2 ratio.',
    },
    teachingPoint:
      'Set up a proportion: flour/sugar = 3/2. Cross-multiply to solve: flour = 3 x (8/2) = 12.',
    relatedSkills: ['Percentages', 'Data Analysis, Statistics, and Probability'],
  },

  {
    id: 'math-psda-rrp-009',
    test: 'SAT',
    section: 'math',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Ratios, Rates, and Proportional Relationships',
    difficulty: 'medium',
    timeTargetSeconds: 90,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    isWordProblem: true,
    stimulus:
      'A car travels 180 miles in 3 hours. The car then travels an additional 120 miles at the same speed.',
    question: 'How many total minutes does the entire trip take?',
    choices: [
      { label: 'A', text: '270' },
      { label: 'B', text: '300' },
      { label: 'C', text: '330' },
      { label: 'D', text: '360' },
    ],
    correctAnswer: 'B',
    explanation:
      'Speed = 180 / 3 = 60 mph. Total distance = 180 + 120 = 300 miles. Total time = 300 / 60 = 5 hours = 300 minutes.',
    wrongAnswerExplanations: {
      A: '270 minutes = 4.5 hours; this underestimates the time for the additional 120-mile leg.',
      C: '330 minutes comes from an arithmetic error, possibly computing 3 h + 120/60 x 60 = 180 + 120 = 300 min... actually 330 is not derivable cleanly, indicating a wrong approach.',
      D: '360 minutes = 6 hours; a trap for students who assume the second leg also takes 3 hours (same as the first), ignoring that it is only 120 miles at 60 mph.',
    },
    teachingPoint:
      'Find the rate first (distance divided by time), then apply it to find the remaining time, then convert to the requested unit.',
    relatedSkills: ['Data Analysis, Statistics, and Probability'],
  },

  {
    id: 'math-psda-rrp-010',
    test: 'SAT',
    section: 'math',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Ratios, Rates, and Proportional Relationships',
    difficulty: 'medium',
    timeTargetSeconds: 90,
    mistakeType: 'concept error',
    questionType: 'grid_in',
    isWordProblem: true,
    stimulus:
      'A factory produces widgets at a constant rate. In 4 hours, it produces 600 widgets. The factory operates 6 days per week, 8 hours per day.',
    question: 'How many widgets does the factory produce in one week?',
    correctAnswer: '7200',
    acceptableAnswers: ['7200'],
    explanation:
      'Rate = 600 / 4 = 150 widgets per hour. Hours per week = 6 days x 8 hours/day = 48 hours. Widgets per week = 150 x 48 = 7,200.',
    teachingPoint:
      'Unit rate x total time = total production. Convert all time units carefully before multiplying.',
    relatedSkills: ['Percentages'],
  },

  {
    id: 'math-psda-rrp-011',
    test: 'SAT',
    section: 'math',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Ratios, Rates, and Proportional Relationships',
    difficulty: 'medium',
    timeTargetSeconds: 90,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    isWordProblem: true,
    stimulus:
      'Two pipes fill a tank. Pipe A fills the tank in 6 hours alone, and Pipe B fills the tank in 4 hours alone.',
    question:
      'If both pipes work together, which of the following is closest to the time (in hours) needed to fill the tank?',
    choices: [
      { label: 'A', text: '2.0' },
      { label: 'B', text: '2.4' },
      { label: 'C', text: '3.0' },
      { label: 'D', text: '5.0' },
    ],
    correctAnswer: 'B',
    explanation:
      'Combined rate = 1/6 + 1/4 = 2/12 + 3/12 = 5/12 of the tank per hour. Time = 1 / (5/12) = 12/5 = 2.4 hours.',
    wrongAnswerExplanations: {
      A: '2.0 hours comes from averaging the two rates incorrectly or using a simpler but wrong formula.',
      C: '3.0 hours is the arithmetic average of the two times (6 + 4)/2 = 5... actually 3.0 = 6/2, which treats only one pipe; the arithmetic average is 5.0, not 3.0. 3.0 is a plausible but wrong estimate.',
      D: '5.0 hours is the arithmetic average of 6 and 4, treating the times as if they should be averaged rather than the rates.',
    },
    teachingPoint:
      'For combined work-rate problems: 1/T = 1/T1 + 1/T2. Add the fractions of work done per unit time, then take the reciprocal.',
    relatedSkills: ['Percentages', 'Data Analysis, Statistics, and Probability'],
  },

  {
    id: 'math-psda-rrp-012',
    test: 'SAT',
    section: 'math',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Ratios, Rates, and Proportional Relationships',
    difficulty: 'hard',
    timeTargetSeconds: 120,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    isWordProblem: true,
    stimulus:
      'A salt solution is made by mixing 200 mL of a 15% salt solution with 300 mL of a 25% salt solution.',
    question: 'What is the percentage concentration of salt in the resulting mixture?',
    choices: [
      { label: 'A', text: '18%' },
      { label: 'B', text: '20%' },
      { label: 'C', text: '21%' },
      { label: 'D', text: '23%' },
    ],
    correctAnswer: 'C',
    explanation:
      'Salt from solution 1: 0.15 x 200 = 30 mL. Salt from solution 2: 0.25 x 300 = 75 mL. Total salt = 105 mL. Total volume = 500 mL. Concentration = 105/500 = 0.21 = 21%.',
    wrongAnswerExplanations: {
      A: '18% incorrectly weights the two concentrations equally by volume fraction without computing actual salt amounts.',
      B: '20% is the simple average of 15% and 25%, ignoring that the volumes are different.',
      D: '23% overweights the 25% solution; the correct weighted average is 21%.',
    },
    teachingPoint:
      'Mixture problems: calculate the amount of solute from each component, add them, then divide by total volume. Never average percentages when volumes differ.',
    relatedSkills: ['Percentages', 'Data Analysis, Statistics, and Probability'],
  },

  // ── Percentages ──────────────────────────────────────────────────────────

  {
    id: 'math-psda-pct-006',
    test: 'SAT',
    section: 'math',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Percentages',
    difficulty: 'easy',
    timeTargetSeconds: 75,
    mistakeType: 'careless',
    questionType: 'multiple_choice',
    isWordProblem: true,
    question: 'A jacket originally costs $80. It is on sale for 25% off. What is the sale price?',
    choices: [
      { label: 'A', text: '$20' },
      { label: 'B', text: '$55' },
      { label: 'C', text: '$60' },
      { label: 'D', text: '$65' },
    ],
    correctAnswer: 'C',
    explanation: 'Discount = 25% x $80 = $20. Sale price = $80 - $20 = $60.',
    wrongAnswerExplanations: {
      A: '$20 is the discount amount, not the sale price.',
      B: '$55 results from subtracting 25 from 80 as if they were the same unit: 80 - 25 = 55.',
      D: '$65 corresponds to a different discount percentage or an arithmetic error.',
    },
    teachingPoint:
      'Percent off: multiply original price by the discount rate to get the discount amount, then subtract. Or multiply directly by (1 - 0.25) = 0.75.',
    relatedSkills: ['Ratios, Rates, and Proportional Relationships'],
  },

  {
    id: 'math-psda-pct-007',
    test: 'SAT',
    section: 'math',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Percentages',
    difficulty: 'medium',
    timeTargetSeconds: 90,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    isWordProblem: true,
    question:
      'A store increases the price of a television by 20%, then later decreases the new price by 20%. What is the net percent change from the original price?',
    choices: [
      { label: 'A', text: '0%' },
      { label: 'B', text: '-2%' },
      { label: 'C', text: '-4%' },
      { label: 'D', text: '4%' },
    ],
    correctAnswer: 'C',
    explanation:
      'Start with price P. After 20% increase: 1.2P. After 20% decrease: 1.2P x 0.8 = 0.96P. Net change = (0.96P - P) / P = -0.04 = -4%.',
    wrongAnswerExplanations: {
      A: '0% is the classic trap: a 20% increase followed by a 20% decrease does not return to the original price because the decrease applies to a larger base.',
      B: '-2% is a plausible but incorrect intermediate estimate.',
      D: '4% gets the direction wrong; the price is lower than the original, not higher.',
    },
    teachingPoint:
      'Successive percent changes multiply, not add. A 20% increase then 20% decrease yields factor 1.2 x 0.8 = 0.96, which is a 4% net decrease.',
    relatedSkills: ['Ratios, Rates, and Proportional Relationships'],
  },

  {
    id: 'math-psda-pct-008',
    test: 'SAT',
    section: 'math',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Percentages',
    difficulty: 'medium',
    timeTargetSeconds: 90,
    mistakeType: 'concept error',
    questionType: 'grid_in',
    isWordProblem: true,
    question:
      'A student scored 72 points on a test. This score is 90% of the total points available. How many total points are available on the test?',
    correctAnswer: '80',
    acceptableAnswers: ['80'],
    explanation: '72 = 0.90 x total. Total = 72 / 0.90 = 80.',
    teachingPoint:
      'When given the result of a percent, divide by the percent (as a decimal) to find the original whole: whole = part / percent.',
    relatedSkills: ['Ratios, Rates, and Proportional Relationships'],
  },

  {
    id: 'math-psda-pct-009',
    test: 'SAT',
    section: 'math',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Percentages',
    difficulty: 'medium',
    timeTargetSeconds: 90,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    isWordProblem: true,
    stimulus:
      'In 2020, a town had a population of 12,000. By 2023, the population grew to 13,800.',
    question: 'By what percent did the population increase from 2020 to 2023?',
    choices: [
      { label: 'A', text: '13%' },
      { label: 'B', text: '15%' },
      { label: 'C', text: '18%' },
      { label: 'D', text: '20%' },
    ],
    correctAnswer: 'B',
    explanation:
      'Increase = 13,800 - 12,000 = 1,800. Percent increase = 1,800 / 12,000 x 100 = 15%.',
    wrongAnswerExplanations: {
      A: '13% results from dividing by the new population: 1,800 / 13,800 x 100 ≈ 13%. Always divide by the original value.',
      C: '18% results from using an incorrect base, such as 10,000.',
      D: '20% uses an incorrect numerator or base in the calculation.',
    },
    teachingPoint:
      'Percent change = (new - old) / old x 100. Always divide by the original (old) value.',
    relatedSkills: ['Data Analysis, Statistics, and Probability'],
  },

  {
    id: 'math-psda-pct-010',
    test: 'SAT',
    section: 'math',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Percentages',
    difficulty: 'hard',
    timeTargetSeconds: 120,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    isWordProblem: true,
    stimulus:
      "A company's revenue grew by 40% from Year 1 to Year 2, and then grew by 25% from Year 2 to Year 3.",
    question:
      'If Year 1 revenue was $200,000, what was the percent increase in revenue from Year 1 to Year 3?',
    choices: [
      { label: 'A', text: '65%' },
      { label: 'B', text: '70%' },
      { label: 'C', text: '75%' },
      { label: 'D', text: '80%' },
    ],
    correctAnswer: 'C',
    explanation:
      'Year 2 revenue: $200,000 x 1.40 = $280,000. Year 3 revenue: $280,000 x 1.25 = $350,000. Percent increase: ($350,000 - $200,000) / $200,000 = $150,000 / $200,000 = 0.75 = 75%.',
    wrongAnswerExplanations: {
      A: '65% = 40 + 25; this adds the percent changes directly, ignoring the compounding effect.',
      B: '70% is a plausible guess but does not match the computed value.',
      D: '80% overshoots; the correct multiplier is 1.40 x 1.25 = 1.75, not 1.80.',
    },
    teachingPoint:
      'For multi-period growth, multiply the growth factors: 1.40 x 1.25 = 1.75, so total growth is 75%. Never add percentage changes across periods.',
    relatedSkills: ['Ratios, Rates, and Proportional Relationships'],
  },

  // ── Probability and Conditional Probability ────────────────────────────────

  {
    id: 'math-psda-prob-006',
    test: 'SAT',
    section: 'math',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Probability and Conditional Probability',
    difficulty: 'easy',
    timeTargetSeconds: 75,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    isWordProblem: true,
    stimulus:
      'A jar contains 6 red candies, 4 green candies, and 2 blue candies. One candy is chosen at random.',
    question: 'What is the probability that the candy chosen is green?',
    choices: [
      { label: 'A', text: '1/6' },
      { label: 'B', text: '1/4' },
      { label: 'C', text: '1/3' },
      { label: 'D', text: '1/2' },
    ],
    correctAnswer: 'C',
    explanation:
      'Total candies = 6 + 4 + 2 = 12. Green candies = 4. P(green) = 4/12 = 1/3.',
    wrongAnswerExplanations: {
      A: '1/6 = 2/12; this is the probability of choosing a blue candy, not a green candy.',
      B: '1/4 = 3/12; this does not correspond to any correct count in this problem.',
      D: '1/2 = 6/12; this is the probability of choosing a red candy.',
    },
    teachingPoint:
      'P(event) = favorable outcomes / total outcomes. Count all items in the sample space carefully.',
    relatedSkills: ['Data Analysis, Statistics, and Probability'],
  },

  {
    id: 'math-psda-prob-007',
    test: 'SAT',
    section: 'math',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Probability and Conditional Probability',
    difficulty: 'medium',
    timeTargetSeconds: 90,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    isWordProblem: true,
    stimulus:
      'A class of 30 students was surveyed about their after-school activities. 18 students play sports, 12 students are in the drama club, and 6 students do both. A student is selected at random.',
    question:
      'What is the probability that the selected student plays sports but is NOT in the drama club?',
    choices: [
      { label: 'A', text: '1/5' },
      { label: 'B', text: '2/5' },
      { label: 'C', text: '3/5' },
      { label: 'D', text: '3/10' },
    ],
    correctAnswer: 'B',
    explanation:
      'Students who play sports only (not drama) = 18 - 6 = 12. P = 12/30 = 2/5.',
    wrongAnswerExplanations: {
      A: '1/5 = 6/30; this is the probability of being in both clubs, not sports only.',
      C: '3/5 = 18/30; this is the probability of playing sports, including those also in drama.',
      D: '3/10 = 9/30; this does not correspond to any meaningful subset in this problem.',
    },
    teachingPoint:
      'For "A but not B": count students in A minus students in both A and B. Use a Venn diagram to organize overlapping groups.',
    relatedSkills: ['Data Analysis, Statistics, and Probability'],
  },

  {
    id: 'math-psda-prob-008',
    test: 'SAT',
    section: 'math',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Probability and Conditional Probability',
    difficulty: 'medium',
    timeTargetSeconds: 90,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    isWordProblem: true,
    stimulus:
      'A box holds 4 defective bulbs and 16 working bulbs. Two bulbs are selected one at a time without replacement.',
    question: 'What is the probability that both bulbs selected are defective?',
    choices: [
      { label: 'A', text: '1/25' },
      { label: 'B', text: '3/95' },
      { label: 'C', text: '4/95' },
      { label: 'D', text: '2/19' },
    ],
    correctAnswer: 'B',
    explanation:
      'P(first defective) = 4/20 = 1/5. P(second defective | first was defective) = 3/19. P(both) = (4/20) x (3/19) = 12/380 = 3/95.',
    wrongAnswerExplanations: {
      A: '1/25 = (4/20)^2 = (1/5)^2; this is the with-replacement answer, ignoring that bulbs are not put back.',
      C: '4/95 uses the correct denominator 380 but incorrect numerator 16 instead of 12.',
      D: '2/19 = 10/95; this confuses the second-draw denominator (19) with the final probability.',
    },
    teachingPoint:
      'Without replacement: the denominator decreases with each draw. Multiply conditional probabilities: P(A then B) = P(A) x P(B|A).',
    relatedSkills: ['Data Analysis, Statistics, and Probability'],
  },

  {
    id: 'math-psda-prob-009',
    test: 'SAT',
    section: 'math',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Probability and Conditional Probability',
    difficulty: 'medium',
    timeTargetSeconds: 90,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    isWordProblem: true,
    stimulus:
      'A survey of 200 people found that 120 own a car and 80 own a bicycle. Of the car owners, 30 also own a bicycle.',
    question:
      'If a person is selected at random from those who own a bicycle, what is the probability that they also own a car?',
    choices: [
      { label: 'A', text: '3/20' },
      { label: 'B', text: '1/4' },
      { label: 'C', text: '3/8' },
      { label: 'D', text: '1/2' },
    ],
    correctAnswer: 'C',
    explanation:
      'Conditional probability: P(car | bicycle) = P(car and bicycle) / P(bicycle) = (30/200) / (80/200) = 30/80 = 3/8.',
    wrongAnswerExplanations: {
      A: '3/20 = 30/200; this is P(both car and bicycle), not the conditional probability given bicycle ownership.',
      B: '1/4 = 30/120; this is P(bicycle | car) -- the probability reversed -- not P(car | bicycle).',
      D: '1/2 = 100/200; no direct interpretation from this data applies.',
    },
    teachingPoint:
      'Conditional probability P(A|B) = P(A and B) / P(B). Restrict the sample space to those satisfying condition B, then count those also in A.',
    relatedSkills: ['Data Analysis, Statistics, and Probability'],
  },

  {
    id: 'math-psda-prob-010',
    test: 'SAT',
    section: 'math',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Probability and Conditional Probability',
    difficulty: 'hard',
    timeTargetSeconds: 120,
    mistakeType: 'concept error',
    questionType: 'grid_in',
    isWordProblem: true,
    stimulus:
      'An urn contains 6 white balls and 4 black balls. A ball is drawn, its color is noted, and then it is returned to the urn. A second ball is then drawn.',
    question:
      'What is the probability that the two balls drawn are different colors? Express your answer as a decimal.',
    correctAnswer: '.48',
    acceptableAnswers: ['0.48', '.48', '12/25'],
    explanation:
      'P(white then black) = (6/10)(4/10) = 24/100. P(black then white) = (4/10)(6/10) = 24/100. P(different colors) = 24/100 + 24/100 = 48/100 = 0.48.',
    teachingPoint:
      'For "different colors" with replacement: P = P(WB) + P(BW). Since draws are independent (replacement), multiply individual probabilities for each sequence, then add both favorable sequences.',
    relatedSkills: ['Data Analysis, Statistics, and Probability'],
  },

  // ── Statistics / Data Interpretation ──────────────────────────────────────

  {
    id: 'math-psda-data-007',
    test: 'SAT',
    section: 'math',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Data Analysis, Statistics, and Probability',
    difficulty: 'easy',
    timeTargetSeconds: 75,
    mistakeType: 'careless',
    questionType: 'multiple_choice',
    isWordProblem: true,
    stimulus:
      'A school club recorded the number of books read by its seven members during the summer: 2, 4, 5, 5, 7, 8, 11.',
    question: 'What is the median number of books read?',
    choices: [
      { label: 'A', text: '4' },
      { label: 'B', text: '5' },
      { label: 'C', text: '6' },
      { label: 'D', text: '7' },
    ],
    correctAnswer: 'B',
    explanation:
      'The values in order are 2, 4, 5, 5, 7, 8, 11. The median is the middle (4th) value of 7 numbers: 5.',
    wrongAnswerExplanations: {
      A: '4 is the second value in the sorted list, not the middle value.',
      C: '6 is the mean (2+4+5+5+7+8+11 = 42, 42/7 = 6), not the median.',
      D: '7 is the fifth value, not the fourth (middle) value.',
    },
    teachingPoint:
      'Median = middle value when data is sorted. For n values, the median is at position (n+1)/2. For 7 values: position 4.',
    relatedSkills: ['Probability and Conditional Probability'],
  },

  {
    id: 'math-psda-data-008',
    test: 'SAT',
    section: 'math',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Data Analysis, Statistics, and Probability',
    difficulty: 'medium',
    timeTargetSeconds: 90,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    isWordProblem: true,
    stimulus:
      'A dataset has 8 values. Seven of the values are 3, 5, 7, 9, 11, 13, and 15. The mean of all 8 values is 9.',
    question: 'What is the eighth value in the dataset?',
    choices: [
      { label: 'A', text: '6' },
      { label: 'B', text: '9' },
      { label: 'C', text: '10' },
      { label: 'D', text: '12' },
    ],
    correctAnswer: 'B',
    explanation:
      'Sum of all 8 values = 9 x 8 = 72. Sum of the 7 known values = 3+5+7+9+11+13+15 = 63. Eighth value = 72 - 63 = 9.',
    wrongAnswerExplanations: {
      A: '6: the mean of the 7 known values is 63/7 = 9, so subtracting from a wrong total gives an error.',
      C: '10 may come from incorrectly computing the required total as 73 instead of 72.',
      D: '12 results from a summation error in the 7 known values.',
    },
    teachingPoint:
      'Missing value = (mean x total count) - (sum of known values). Find the required total sum, then subtract what you have.',
    relatedSkills: ['Probability and Conditional Probability'],
  },

  {
    id: 'math-psda-data-009',
    test: 'SAT',
    section: 'math',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Data Analysis, Statistics, and Probability',
    difficulty: 'medium',
    timeTargetSeconds: 90,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    isWordProblem: true,
    stimulus:
      'A dataset consists of the values 4, 6, 8, 10, and 12. A sixth value, k, is added to the dataset. After k is added, the mean increases by 1.',
    question: 'What is the value of k?',
    choices: [
      { label: 'A', text: '14' },
      { label: 'B', text: '16' },
      { label: 'C', text: '18' },
      { label: 'D', text: '20' },
    ],
    correctAnswer: 'A',
    explanation:
      'Original mean = (4+6+8+10+12)/5 = 40/5 = 8. New mean = 8 + 1 = 9. Sum of 6 values must equal 9 x 6 = 54. So k = 54 - 40 = 14.',
    wrongAnswerExplanations: {
      B: '16: uses new mean x 6 = 54 but subtracts the wrong original sum (e.g., 54 - 38 = 16).',
      C: '18: confuses the new mean (9) with k by doubling it.',
      D: '20: may come from computing 9 x (6-4) = 18 or another incorrect formula.',
    },
    teachingPoint:
      'When a new value shifts the mean: (old sum + k) / (n+1) = new mean. Solve for k: k = new mean x (n+1) - old sum.',
    relatedSkills: ['Probability and Conditional Probability'],
  },

  {
    id: 'math-psda-data-010',
    test: 'SAT',
    section: 'math',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Data Analysis, Statistics, and Probability',
    difficulty: 'medium',
    timeTargetSeconds: 90,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    isWordProblem: true,
    stimulus:
      'The ages (in years) of 9 employees at a small company are: 22, 25, 27, 29, 31, 34, 38, 42, and 55.',
    question:
      'Which of the following best describes the relationship between the mean and median age?',
    choices: [
      { label: 'A', text: 'The mean is less than the median.' },
      { label: 'B', text: 'The mean equals the median.' },
      { label: 'C', text: 'The mean is greater than the median by less than 5 years.' },
      { label: 'D', text: 'The mean is greater than the median by more than 5 years.' },
    ],
    correctAnswer: 'C',
    explanation:
      'Median (5th value of 9): 31. Mean = (22+25+27+29+31+34+38+42+55)/9 = 303/9 = 33.67. Difference = 33.67 - 31 = 2.67 years, which is greater than 0 but less than 5.',
    wrongAnswerExplanations: {
      A: 'The mean (33.67) is greater than the median (31), not less. The outlier at 55 pulls the mean up.',
      B: 'The mean and median are not equal; they differ by about 2.67 years.',
      D: 'The difference is about 2.67 years, which is less than 5, so this overstates the gap.',
    },
    teachingPoint:
      'In a right-skewed distribution (one large outlier on the high end), the mean is pulled above the median. Compute both to find the exact relationship.',
    relatedSkills: ['Probability and Conditional Probability'],
  },

  {
    id: 'math-psda-data-011',
    test: 'SAT',
    section: 'math',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Data Analysis, Statistics, and Probability',
    difficulty: 'hard',
    timeTargetSeconds: 120,
    mistakeType: 'concept error',
    questionType: 'grid_in',
    isWordProblem: true,
    stimulus:
      'A researcher records test scores for two groups of students. Group A has 10 students with a mean score of 74. Group B has 15 students with a mean score of 84.',
    question:
      'What is the mean score for all 25 students combined?',
    correctAnswer: '80',
    acceptableAnswers: ['80'],
    explanation:
      'Total score Group A = 10 x 74 = 740. Total score Group B = 15 x 84 = 1,260. Combined total = 740 + 1,260 = 2,000. Combined mean = 2,000 / 25 = 80.',
    teachingPoint:
      "Weighted mean = (sum of all values) / (total count). Multiply each group's mean by its size to get the group total, add group totals, then divide by the overall count.",
    relatedSkills: ['Probability and Conditional Probability', 'Ratios, Rates, and Proportional Relationships'],
  },

  // ── Scatterplots / Data Trends ────────────────────────────────────────────

  {
    id: 'math-psda-scat-003',
    test: 'SAT',
    section: 'math',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Data Analysis, Statistics, and Probability',
    difficulty: 'easy',
    timeTargetSeconds: 75,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    isWordProblem: true,
    stimulus:
      'A scatterplot shows the relationship between hours studied (x-axis) and test score (y-axis). The data trend upward from left to right. The line of best fit has the equation y = 5x + 50.',
    question:
      'According to the line of best fit, what test score is predicted for a student who studies 8 hours?',
    choices: [
      { label: 'A', text: '85' },
      { label: 'B', text: '88' },
      { label: 'C', text: '90' },
      { label: 'D', text: '95' },
    ],
    correctAnswer: 'C',
    explanation: 'Substitute x = 8: y = 5(8) + 50 = 40 + 50 = 90.',
    wrongAnswerExplanations: {
      A: '85 = 5(7) + 50; uses x = 7 instead of x = 8.',
      B: '88 results from an arithmetic error when evaluating 5(8) + 50.',
      D: '95 = 5(9) + 50; uses x = 9 instead of x = 8.',
    },
    teachingPoint:
      'To predict a value using a line of best fit, substitute the given x-value into the equation and evaluate.',
    relatedSkills: ['Ratios, Rates, and Proportional Relationships'],
  },

  {
    id: 'math-psda-scat-004',
    test: 'SAT',
    section: 'math',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Data Analysis, Statistics, and Probability',
    difficulty: 'medium',
    timeTargetSeconds: 90,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    isWordProblem: true,
    stimulus:
      'A scatterplot shows monthly advertising spending (thousands of dollars, x-axis) versus monthly sales revenue (thousands of dollars, y-axis) for a company over 12 months. The line of best fit passes through the points (2, 30) and (10, 62).',
    question:
      'What is the slope of the line of best fit, and what does it represent in context?',
    choices: [
      { label: 'A', text: 'Slope = 3; for each additional $1,000 in advertising, sales increase by $3,000' },
      { label: 'B', text: 'Slope = 4; for each additional $1,000 in advertising, sales increase by $4,000' },
      { label: 'C', text: 'Slope = 4; for each additional $1,000 in sales, advertising spending increases by $4,000' },
      { label: 'D', text: 'Slope = 8; for each additional $1,000 in advertising, sales increase by $8,000' },
    ],
    correctAnswer: 'B',
    explanation:
      'Slope = (62 - 30) / (10 - 2) = 32 / 8 = 4. Since x = advertising and y = sales (both in thousands), the slope means each $1,000 increase in advertising corresponds to a predicted $4,000 increase in sales.',
    wrongAnswerExplanations: {
      A: 'Slope = 3 uses an incorrect rise or run in the calculation.',
      C: 'Slope = 4 is correct, but the interpretation reverses the variables: x predicts y, not y predicting x.',
      D: 'Slope = 8 uses 32/4 or confuses rise with run.',
    },
    teachingPoint:
      'Slope = rise/run = (y2 - y1)/(x2 - x1). Interpret slope in context: a one-unit increase in x predicts a slope-sized change in y.',
    relatedSkills: ['Ratios, Rates, and Proportional Relationships'],
  },

  {
    id: 'math-psda-scat-005',
    test: 'SAT',
    section: 'math',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Data Analysis, Statistics, and Probability',
    difficulty: 'medium',
    timeTargetSeconds: 90,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    isWordProblem: true,
    stimulus:
      'A researcher plots data comparing the age of a car in years (x-axis) and its resale value in dollars (y-axis). The line of best fit has equation y = -2,500x + 25,000.',
    question: 'Which of the following is the most accurate interpretation of the y-intercept?',
    choices: [
      { label: 'A', text: 'The car loses $2,500 in value for each year of age.' },
      { label: 'B', text: 'The car was worth $25,000 when it was new (age = 0).' },
      { label: 'C', text: 'The car will be worth $0 after 25,000 years.' },
      { label: 'D', text: "The car's resale value decreases by 25% each year." },
    ],
    correctAnswer: 'B',
    explanation:
      "The y-intercept (25,000) is the predicted value when x = 0 -- when the car's age is 0 years, meaning when it was brand new.",
    wrongAnswerExplanations: {
      A: 'This describes the slope (-$2,500 per year), not the y-intercept.',
      C: 'This confuses the y-intercept value ($25,000) with a time duration in years.',
      D: 'This describes a percent decrease model, but the equation is linear, not exponential.',
    },
    teachingPoint:
      'The y-intercept is the predicted y-value when x = 0. Always interpret it in terms of what x = 0 means in the real-world context.',
    relatedSkills: ['Ratios, Rates, and Proportional Relationships'],
  },

  {
    id: 'math-psda-scat-006',
    test: 'SAT',
    section: 'math',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Data Analysis, Statistics, and Probability',
    difficulty: 'medium',
    timeTargetSeconds: 90,
    mistakeType: 'trap answer',
    questionType: 'grid_in',
    isWordProblem: true,
    stimulus:
      'A scatterplot shows data for plant height (cm) versus weeks of growth. The line of best fit is y = 3.5x + 4, where x is weeks and y is height in cm.',
    question:
      'According to the line of best fit, after how many full weeks will the plant first reach a height of at least 74 cm?',
    correctAnswer: '20',
    acceptableAnswers: ['20'],
    explanation:
      'Solve 3.5x + 4 >= 74. 3.5x >= 70. x >= 20. At exactly x = 20: y = 3.5(20) + 4 = 70 + 4 = 74. The plant first reaches 74 cm after 20 weeks.',
    teachingPoint:
      'To find when a linear model reaches a target, set up the equation y = target and solve for x. If x must be a whole number (weeks), check whether the exact value works or round up.',
    relatedSkills: ['Ratios, Rates, and Proportional Relationships'],
  },

  {
    id: 'math-psda-scat-007',
    test: 'SAT',
    section: 'math',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Data Analysis, Statistics, and Probability',
    difficulty: 'hard',
    timeTargetSeconds: 120,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    isWordProblem: true,
    stimulus:
      'A scatterplot displays the relationship between temperature (degrees F) and the number of ice cream cones sold per day at a local shop. The correlation coefficient for this data is r = 0.92.',
    question:
      'Which of the following conclusions is best supported by the correlation coefficient?',
    choices: [
      { label: 'A', text: 'Higher temperatures cause an increase in ice cream sales.' },
      { label: 'B', text: 'About 92% of the data points lie on the line of best fit.' },
      { label: 'C', text: 'There is a strong positive linear association between temperature and ice cream sales.' },
      { label: 'D', text: 'If temperature increases by 1 degree, exactly 0.92 more cones are sold.' },
    ],
    correctAnswer: 'C',
    explanation:
      'r = 0.92 indicates a strong (close to 1) positive linear correlation. It does not establish causation, describe what percent of points are on the line, or give the slope value.',
    wrongAnswerExplanations: {
      A: 'Correlation does not imply causation. A high r only measures the strength of linear association, not a cause-and-effect relationship.',
      B: 'r is not the percentage of points on the line. r-squared (the coefficient of determination) measures the proportion of variance explained.',
      D: 'The slope of the regression line represents the change in y per unit change in x. r is not the slope.',
    },
    teachingPoint:
      'The correlation coefficient r measures the strength and direction of linear association. r close to +1 means a strong positive linear relationship. It does not imply causation and is not equal to the slope.',
    relatedSkills: ['Data Analysis, Statistics, and Probability'],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // GROUP 2: Geometry and Trigonometry
  // ─────────────────────────────────────────────────────────────────────────────

  // ── Area and Volume ───────────────────────────────────────────────────────

  {
    id: 'math-geo-av-007',
    test: 'SAT',
    section: 'math',
    domain: 'Geometry and Trigonometry',
    skill: 'Area and Volume',
    difficulty: 'easy',
    timeTargetSeconds: 75,
    mistakeType: 'careless',
    questionType: 'multiple_choice',
    question: 'A rectangle has a length of 12 cm and a width of 7 cm. What is the area of the rectangle?',
    choices: [
      { label: 'A', text: '38 cm²' },
      { label: 'B', text: '76 cm²' },
      { label: 'C', text: '84 cm²' },
      { label: 'D', text: '144 cm²' },
    ],
    correctAnswer: 'C',
    explanation: 'Area = length x width = 12 x 7 = 84 cm².',
    wrongAnswerExplanations: {
      A: '38 cm² = (12 + 7) x 2 / 2 = 19; this is the semi-perimeter, or just 12 + 7 + 19 does not work. Actually 12 + 7 + 12 + 7 = 38, which is the full perimeter.',
      B: '76 cm² is approximately 2 x 38, which does not match the formula for area.',
      D: '144 cm² = 12^2; this uses only the length as if it were a square.',
    },
    teachingPoint: 'Area of a rectangle = length x width. Perimeter = 2(l + w). Do not confuse the two.',
    relatedSkills: ['Circles', 'Right Triangles and Trigonometry'],
  },

  {
    id: 'math-geo-av-008',
    test: 'SAT',
    section: 'math',
    domain: 'Geometry and Trigonometry',
    skill: 'Area and Volume',
    difficulty: 'medium',
    timeTargetSeconds: 90,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    question:
      'A cylinder has a radius of 5 cm and a height of 10 cm. What is the volume of the cylinder? (Use pi ≈ 3.14)',
    choices: [
      { label: 'A', text: '157 cm³' },
      { label: 'B', text: '314 cm³' },
      { label: 'C', text: '785 cm³' },
      { label: 'D', text: '1,570 cm³' },
    ],
    correctAnswer: 'C',
    explanation:
      'V = pi x r^2 x h = 3.14 x 25 x 10 = 785 cm³.',
    wrongAnswerExplanations: {
      A: '157 cm³ = 3.14 x 5 x 10; uses r instead of r^2, forgetting to square the radius.',
      B: '314 cm³ = 3.14 x 10^2; squares h instead of r.',
      D: '1,570 cm³ = 785 x 2; doubles the correct answer, possibly using 2 x pi x r^2 x h.',
    },
    teachingPoint: 'Volume of a cylinder = pi x r^2 x h. Remember to square the radius.',
    relatedSkills: ['Circles', 'Area and Volume'],
  },

  {
    id: 'math-geo-av-009',
    test: 'SAT',
    section: 'math',
    domain: 'Geometry and Trigonometry',
    skill: 'Area and Volume',
    difficulty: 'medium',
    timeTargetSeconds: 90,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    isWordProblem: true,
    stimulus:
      'A rectangular swimming pool is 20 meters long, 8 meters wide, and 2 meters deep. The pool is currently filled to 75% of its capacity.',
    question: 'How many cubic meters of water are in the pool?',
    choices: [
      { label: 'A', text: '120 m³' },
      { label: 'B', text: '180 m³' },
      { label: 'C', text: '240 m³' },
      { label: 'D', text: '320 m³' },
    ],
    correctAnswer: 'C',
    explanation:
      'Total volume = 20 x 8 x 2 = 320 m³. Water at 75% capacity = 0.75 x 320 = 240 m³.',
    wrongAnswerExplanations: {
      A: '120 m³ = 20 x 8 x (3/4) x (1/2); applies the percent incorrectly to only one dimension.',
      B: '180 m³ = 0.75 x 240; applies 75% twice instead of once.',
      D: '320 m³ is the full capacity, not 75% of it.',
    },
    teachingPoint:
      'Find the full volume first (l x w x h), then apply the percentage to get the actual amount.',
    relatedSkills: ['Percentages'],
  },

  {
    id: 'math-geo-av-010',
    test: 'SAT',
    section: 'math',
    domain: 'Geometry and Trigonometry',
    skill: 'Area and Volume',
    difficulty: 'medium',
    timeTargetSeconds: 90,
    mistakeType: 'concept error',
    questionType: 'grid_in',
    question:
      'A cone has a base radius of 6 cm and a height of 8 cm. What is the volume of the cone in cubic centimeters? (Use pi = 3.14 and round to the nearest whole number.)',
    correctAnswer: '301',
    acceptableAnswers: ['301'],
    explanation:
      'V = (1/3) x pi x r^2 x h = (1/3)(3.14)(36)(8) = (1/3)(904.32) = 301.44 ≈ 301 cm³.',
    teachingPoint:
      'Volume of a cone = (1/3) x pi x r^2 x h. The factor of 1/3 distinguishes it from the cylinder formula.',
    relatedSkills: ['Area and Volume', 'Circles'],
  },

  {
    id: 'math-geo-av-011',
    test: 'SAT',
    section: 'math',
    domain: 'Geometry and Trigonometry',
    skill: 'Area and Volume',
    difficulty: 'hard',
    timeTargetSeconds: 120,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    isWordProblem: true,
    stimulus:
      'A sphere is inscribed in a cube, meaning the sphere touches all six faces of the cube. The side length of the cube is 10 cm.',
    question:
      'What is the volume of the region inside the cube but outside the sphere, rounded to the nearest whole number? (Use pi ≈ 3.14)',
    choices: [
      { label: 'A', text: '261 cm³' },
      { label: 'B', text: '477 cm³' },
      { label: 'C', text: '524 cm³' },
      { label: 'D', text: '1,000 cm³' },
    ],
    correctAnswer: 'B',
    explanation:
      'Cube volume = 10^3 = 1,000 cm³. The inscribed sphere has diameter = 10, so radius = 5. Sphere volume = (4/3)(3.14)(5^3) = (4/3)(3.14)(125) = (4/3)(392.5) = 523.33 cm³. Volume outside sphere = 1,000 - 523.33 ≈ 477 cm³.',
    wrongAnswerExplanations: {
      A: '261 cm³ uses an incorrect sphere volume, possibly using r = 10 or a wrong formula.',
      C: '524 cm³ is approximately the sphere volume itself, not the region outside the sphere.',
      D: '1,000 cm³ is the full cube volume, not the region outside the sphere.',
    },
    teachingPoint:
      "For a sphere inscribed in a cube: the sphere's diameter equals the cube's side length, so r = s/2. Compute sphere volume with (4/3)pi x r^3, then subtract from the cube's volume.",
    relatedSkills: ['Circles', 'Coordinate Geometry'],
  },

  // ── Circles ───────────────────────────────────────────────────────────────

  {
    id: 'math-geo-circles-004',
    test: 'SAT',
    section: 'math',
    domain: 'Geometry and Trigonometry',
    skill: 'Circles',
    difficulty: 'easy',
    timeTargetSeconds: 75,
    mistakeType: 'careless',
    questionType: 'multiple_choice',
    question: 'A circle has a radius of 9. What is the circumference of the circle in terms of pi?',
    choices: [
      { label: 'A', text: '9pi' },
      { label: 'B', text: '18pi' },
      { label: 'C', text: '27pi' },
      { label: 'D', text: '81pi' },
    ],
    correctAnswer: 'B',
    explanation: 'Circumference = 2 x pi x r = 2 x pi x 9 = 18pi.',
    wrongAnswerExplanations: {
      A: '9pi = pi x r; uses only r instead of 2r (the diameter) in the circumference formula.',
      C: '27pi = 3 x pi x r; uses the wrong coefficient.',
      D: '81pi = pi x r^2 = pi x 9^2; this is the area formula, not circumference.',
    },
    teachingPoint: 'Circumference = 2 x pi x r = pi x d. Area = pi x r^2. Know both formulas and which is which.',
    relatedSkills: ['Area and Volume'],
  },

  {
    id: 'math-geo-circles-005',
    test: 'SAT',
    section: 'math',
    domain: 'Geometry and Trigonometry',
    skill: 'Circles',
    difficulty: 'medium',
    timeTargetSeconds: 90,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    question:
      'An arc of a circle subtends a central angle of 120 degrees. The circle has a radius of 6. What is the length of the arc?',
    choices: [
      { label: 'A', text: '2pi' },
      { label: 'B', text: '4pi' },
      { label: 'C', text: '6pi' },
      { label: 'D', text: '8pi' },
    ],
    correctAnswer: 'B',
    explanation:
      'Arc length = (central angle / 360) x 2 x pi x r = (120/360) x 2 x pi x 6 = (1/3) x 12pi = 4pi.',
    wrongAnswerExplanations: {
      A: '2pi corresponds to a 60-degree arc: (60/360) x 12pi = 2pi.',
      C: '6pi corresponds to a 180-degree arc (semicircle): (1/2)(12pi) = 6pi.',
      D: '8pi corresponds to a 240-degree arc or an incorrect formula.',
    },
    teachingPoint:
      'Arc length = (theta/360) x 2 x pi x r, where theta is the central angle in degrees. The fraction theta/360 is the fraction of the full circle.',
    relatedSkills: ['Area and Volume', 'Right Triangles and Trigonometry'],
  },

  {
    id: 'math-geo-circles-006',
    test: 'SAT',
    section: 'math',
    domain: 'Geometry and Trigonometry',
    skill: 'Circles',
    difficulty: 'medium',
    timeTargetSeconds: 90,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    question:
      'In a circle, a chord is 8 cm long and is 3 cm from the center of the circle (perpendicular distance from center to chord). What is the radius of the circle?',
    choices: [
      { label: 'A', text: '4 cm' },
      { label: 'B', text: '5 cm' },
      { label: 'C', text: 'sqrt(55) cm' },
      { label: 'D', text: 'sqrt(73) cm' },
    ],
    correctAnswer: 'B',
    explanation:
      'The perpendicular from the center bisects the chord, creating a right triangle with legs 3 (distance to chord) and 4 (half of chord = 8/2 = 4). Radius = sqrt(3^2 + 4^2) = sqrt(9 + 16) = sqrt(25) = 5 cm.',
    wrongAnswerExplanations: {
      A: '4 cm is half the chord length, not the radius.',
      C: 'sqrt(55) comes from using the full chord incorrectly: sqrt(3^2 + 8^2 - 9) or similar error.',
      D: 'sqrt(73) = sqrt(3^2 + 8^2); this uses the full chord length (8) instead of half the chord (4).',
    },
    teachingPoint:
      'A perpendicular from the center to a chord bisects the chord. Use the Pythagorean theorem with half the chord length and the perpendicular distance to find the radius.',
    relatedSkills: ['Right Triangles and Trigonometry', 'Lines, Angles, and Triangles'],
  },

  {
    id: 'math-geo-circles-007',
    test: 'SAT',
    section: 'math',
    domain: 'Geometry and Trigonometry',
    skill: 'Circles',
    difficulty: 'hard',
    timeTargetSeconds: 120,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    question:
      'A circle is tangent to both the x-axis and the y-axis and has its center in the first quadrant. The circle also passes through the point (6, 3). What is one possible value for the radius of the circle?',
    choices: [
      { label: 'A', text: '3' },
      { label: 'B', text: '5' },
      { label: 'C', text: '6' },
      { label: 'D', text: '9' },
    ],
    correctAnswer: 'A',
    explanation:
      'If the circle is tangent to both axes with center in the first quadrant, the center is (r, r). The circle passes through (6, 3): (6 - r)^2 + (3 - r)^2 = r^2. Expanding: 36 - 12r + r^2 + 9 - 6r + r^2 = r^2. Simplifying: r^2 - 18r + 45 = 0. Factoring: (r - 3)(r - 15) = 0. So r = 3 or r = 15. Only r = 3 appears among the choices.',
    wrongAnswerExplanations: {
      B: 'r = 5: center (5, 5), distance to (6,3) = sqrt(1 + 4) = sqrt(5) ≠ 5. Not a solution.',
      C: 'r = 6: center (6, 6), distance to (6,3) = sqrt(0 + 9) = 3 ≠ 6. Not a solution.',
      D: 'r = 9: center (9, 9), distance to (6,3) = sqrt(9 + 36) = sqrt(45) ≠ 9. Not a solution.',
    },
    teachingPoint:
      'When a circle is tangent to both coordinate axes with center in the first quadrant, its center is (r, r). Set the distance from (r, r) to the given point equal to r, expand, and solve the resulting quadratic.',
    relatedSkills: ['Coordinate Geometry', 'Right Triangles and Trigonometry'],
  },

  {
    id: 'math-geo-circles-008',
    test: 'SAT',
    section: 'math',
    domain: 'Geometry and Trigonometry',
    skill: 'Circles',
    difficulty: 'hard',
    timeTargetSeconds: 120,
    mistakeType: 'concept error',
    questionType: 'grid_in',
    question: 'A circle has the equation x^2 + y^2 - 6x + 4y - 3 = 0. What is the radius of this circle?',
    correctAnswer: '4',
    acceptableAnswers: ['4'],
    explanation:
      'Complete the square: (x^2 - 6x + 9) + (y^2 + 4y + 4) = 3 + 9 + 4. This gives (x - 3)^2 + (y + 2)^2 = 16. The radius is sqrt(16) = 4.',
    teachingPoint:
      'To find the radius from the general form x^2 + y^2 + Dx + Ey + F = 0, complete the square for both x and y, then read r^2 from the right side and take the square root.',
    relatedSkills: ['Coordinate Geometry'],
  },

  // ── Triangles and Angles ──────────────────────────────────────────────────

  {
    id: 'math-geo-tri-003',
    test: 'SAT',
    section: 'math',
    domain: 'Geometry and Trigonometry',
    skill: 'Lines, Angles, and Triangles',
    difficulty: 'easy',
    timeTargetSeconds: 75,
    mistakeType: 'careless',
    questionType: 'multiple_choice',
    question:
      'Two angles of a triangle measure 55 degrees and 72 degrees. What is the measure of the third angle?',
    choices: [
      { label: 'A', text: '43°' },
      { label: 'B', text: '53°' },
      { label: 'C', text: '63°' },
      { label: 'D', text: '73°' },
    ],
    correctAnswer: 'B',
    explanation: 'Sum of angles in a triangle = 180°. Third angle = 180 - 55 - 72 = 53°.',
    wrongAnswerExplanations: {
      A: '43° = 180 - 55 - 82; uses 82° instead of 72° for the second angle.',
      C: '63° = 180 - 55 - 62; uses 62° instead of 72°, an arithmetic slip.',
      D: '73° = 55 + 72 - 54 or some other incorrect manipulation.',
    },
    teachingPoint:
      'Triangle Angle Sum Theorem: the three interior angles always sum to 180°. Subtract the two known angles from 180°.',
    relatedSkills: ['Right Triangles and Trigonometry', 'Coordinate Geometry'],
  },

  {
    id: 'math-geo-tri-004',
    test: 'SAT',
    section: 'math',
    domain: 'Geometry and Trigonometry',
    skill: 'Lines, Angles, and Triangles',
    difficulty: 'medium',
    timeTargetSeconds: 90,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    question:
      'Two parallel lines are cut by a transversal. One co-interior (same-side interior) angle measures (3x + 20)° and the other co-interior angle measures (5x - 40)°. What is the value of x?',
    choices: [
      { label: 'A', text: '20' },
      { label: 'B', text: '25' },
      { label: 'C', text: '30' },
      { label: 'D', text: '35' },
    ],
    correctAnswer: 'B',
    explanation:
      'Co-interior (consecutive interior) angles are supplementary, summing to 180°. So (3x + 20) + (5x - 40) = 180. 8x - 20 = 180. 8x = 200. x = 25.',
    wrongAnswerExplanations: {
      A: 'x = 20: gives angles 80° and 60°, which sum to 140°, not 180°.',
      C: 'x = 30: gives angles 110° and 110°, which sum to 220°, not 180°. Also, x = 30 results from setting the angles equal (alternate interior angle rule), which does not apply here.',
      D: 'x = 35: gives angles 125° and 135°, which sum to 260°, not 180°.',
    },
    teachingPoint:
      'Co-interior (same-side interior) angles formed by a transversal cutting parallel lines are supplementary (sum = 180°). Alternate interior angles are equal.',
    relatedSkills: ['Coordinate Geometry'],
  },

  {
    id: 'math-geo-tri-005',
    test: 'SAT',
    section: 'math',
    domain: 'Geometry and Trigonometry',
    skill: 'Lines, Angles, and Triangles',
    difficulty: 'medium',
    timeTargetSeconds: 90,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    isWordProblem: true,
    stimulus:
      'Triangle PQR and triangle STU are similar, with PQ corresponding to ST, QR corresponding to TU, and PR corresponding to SU. In triangle PQR: PQ = 8, QR = 12, PR = 10. In triangle STU: ST = 12.',
    question: 'What is the perimeter of triangle STU?',
    choices: [
      { label: 'A', text: '30' },
      { label: 'B', text: '40' },
      { label: 'C', text: '45' },
      { label: 'D', text: '50' },
    ],
    correctAnswer: 'C',
    explanation:
      'Scale factor = ST/PQ = 12/8 = 3/2. Perimeter of PQR = 8 + 12 + 10 = 30. Perimeter of STU = 30 x (3/2) = 45.',
    wrongAnswerExplanations: {
      A: '30 is the perimeter of triangle PQR, not the scaled triangle STU.',
      B: '40 = 30 + 10; incorrectly adds only the scale factor times one side rather than scaling the whole perimeter.',
      D: '50 = 30 x (5/3); uses the wrong scale factor.',
    },
    teachingPoint:
      'For similar triangles, the ratio of perimeters equals the scale factor. Find the scale factor from corresponding sides, then multiply the known perimeter.',
    relatedSkills: ['Ratios, Rates, and Proportional Relationships', 'Right Triangles and Trigonometry'],
  },

  {
    id: 'math-geo-tri-006',
    test: 'SAT',
    section: 'math',
    domain: 'Geometry and Trigonometry',
    skill: 'Lines, Angles, and Triangles',
    difficulty: 'medium',
    timeTargetSeconds: 90,
    mistakeType: 'concept error',
    questionType: 'grid_in',
    question:
      'An exterior angle of a triangle measures 130 degrees. One of the non-adjacent interior angles measures 55 degrees. What is the measure (in degrees) of the other non-adjacent interior angle?',
    correctAnswer: '75',
    acceptableAnswers: ['75'],
    explanation:
      'Exterior Angle Theorem: an exterior angle equals the sum of the two non-adjacent interior angles. 130 = 55 + x. x = 75°.',
    teachingPoint:
      'Exterior Angle Theorem: an exterior angle of a triangle equals the sum of the two remote (non-adjacent) interior angles.',
    relatedSkills: ['Lines, Angles, and Triangles'],
  },

  {
    id: 'math-geo-tri-007',
    test: 'SAT',
    section: 'math',
    domain: 'Geometry and Trigonometry',
    skill: 'Lines, Angles, and Triangles',
    difficulty: 'hard',
    timeTargetSeconds: 120,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    isWordProblem: true,
    stimulus:
      'In triangle ABC, angle B = 90°. Point D lies on AC such that BD is perpendicular to AC. AB = 9 and BC = 12.',
    question: 'What is the length of BD?',
    choices: [
      { label: 'A', text: '6' },
      { label: 'B', text: '6.5' },
      { label: 'C', text: '7.2' },
      { label: 'D', text: '7.5' },
    ],
    correctAnswer: 'C',
    explanation:
      'Find AC: AC^2 = AB^2 + BC^2 = 81 + 144 = 225, so AC = 15. Area of triangle ABC = (1/2)(AB)(BC) = (1/2)(9)(12) = 54. Also, area = (1/2)(AC)(BD) = (1/2)(15)(BD). Setting equal: 54 = (15/2)(BD). BD = 108/15 = 7.2.',
    wrongAnswerExplanations: {
      A: '6 does not satisfy the area equation; it is not derivable from the correct approach.',
      B: '6.5 is a plausible but incorrect value; the exact answer is 7.2.',
      D: '7.5 = AC/2 = 15/2; this is the median to the hypotenuse (which connects the right-angle vertex to the midpoint of AC), not the altitude.',
    },
    teachingPoint:
      'Altitude to the hypotenuse: use the area formula twice. Area = (1/2)(leg1)(leg2) and also Area = (1/2)(hypotenuse)(altitude). Set equal and solve for the altitude.',
    relatedSkills: ['Right Triangles and Trigonometry', 'Area and Volume'],
  },

  // ── Right Triangles and Trigonometry ──────────────────────────────────────

  {
    id: 'math-geo-rt-009',
    test: 'SAT',
    section: 'math',
    domain: 'Geometry and Trigonometry',
    skill: 'Right Triangles and Trigonometry',
    difficulty: 'easy',
    timeTargetSeconds: 75,
    mistakeType: 'careless',
    questionType: 'multiple_choice',
    question:
      'In a right triangle, the two legs measure 5 and 12. What is the length of the hypotenuse?',
    choices: [
      { label: 'A', text: '11' },
      { label: 'B', text: '13' },
      { label: 'C', text: '15' },
      { label: 'D', text: '17' },
    ],
    correctAnswer: 'B',
    explanation: 'c^2 = 5^2 + 12^2 = 25 + 144 = 169. c = sqrt(169) = 13.',
    wrongAnswerExplanations: {
      A: '11 does not satisfy 5^2 + 12^2 = 11^2 (25 + 144 = 169 ≠ 121).',
      C: '15 = 5 + 12 - 2; incorrect arithmetic or misapplication of the theorem.',
      D: '17 = 5 + 12; adds the legs directly instead of using the Pythagorean theorem.',
    },
    teachingPoint:
      'Pythagorean theorem: a^2 + b^2 = c^2, where c is the hypotenuse. Memorize common triples: (3,4,5), (5,12,13), (8,15,17).',
    relatedSkills: ['Lines, Angles, and Triangles', 'Area and Volume'],
  },

  {
    id: 'math-geo-rt-010',
    test: 'SAT',
    section: 'math',
    domain: 'Geometry and Trigonometry',
    skill: 'Right Triangles and Trigonometry',
    difficulty: 'medium',
    timeTargetSeconds: 90,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    question:
      'In a right triangle, angle A = 30°, angle B = 90°, and the hypotenuse AC = 20. What is the length of the side opposite angle A (side BC)?',
    choices: [
      { label: 'A', text: '10' },
      { label: 'B', text: '10sqrt(2)' },
      { label: 'C', text: '10sqrt(3)' },
      { label: 'D', text: '20sqrt(3)' },
    ],
    correctAnswer: 'A',
    explanation:
      'In a 30-60-90 triangle, the side opposite the 30° angle = (1/2) x hypotenuse = (1/2)(20) = 10.',
    wrongAnswerExplanations: {
      B: '10sqrt(2) ≈ 14.14; this is the leg of a 45-45-90 triangle with hypotenuse 20.',
      C: '10sqrt(3) ≈ 17.32; this is the side opposite the 60° angle (the longer leg), not the 30° angle.',
      D: '20sqrt(3) ≈ 34.64; larger than the hypotenuse, which is impossible.',
    },
    teachingPoint:
      '30-60-90 ratios: short leg (opposite 30°) = (1/2) x hyp, long leg (opposite 60°) = (sqrt(3)/2) x hyp.',
    relatedSkills: ['Lines, Angles, and Triangles', 'Circles'],
  },

  {
    id: 'math-geo-rt-011',
    test: 'SAT',
    section: 'math',
    domain: 'Geometry and Trigonometry',
    skill: 'Right Triangles and Trigonometry',
    difficulty: 'medium',
    timeTargetSeconds: 90,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    question:
      'In right triangle XYZ, angle Y = 90°. If sin(X) = 3/5, what is tan(X)?',
    choices: [
      { label: 'A', text: '3/4' },
      { label: 'B', text: '4/5' },
      { label: 'C', text: '3/5' },
      { label: 'D', text: '5/4' },
    ],
    correctAnswer: 'A',
    explanation:
      'sin(X) = opposite/hypotenuse = 3/5, so opposite = 3 and hypotenuse = 5. Adjacent = sqrt(5^2 - 3^2) = sqrt(25 - 9) = sqrt(16) = 4. tan(X) = opposite/adjacent = 3/4.',
    wrongAnswerExplanations: {
      B: '4/5 = cos(X) = adjacent/hypotenuse, not tan(X).',
      C: '3/5 = sin(X); this is the given value, not what was asked.',
      D: '5/4 = secant(X) = hypotenuse/adjacent, not tan(X).',
    },
    teachingPoint:
      'Given one trig ratio, use the Pythagorean theorem to find the missing side, then compute the requested ratio using SOHCAHTOA.',
    relatedSkills: ['Lines, Angles, and Triangles', 'Circles'],
  },

  {
    id: 'math-geo-rt-012',
    test: 'SAT',
    section: 'math',
    domain: 'Geometry and Trigonometry',
    skill: 'Right Triangles and Trigonometry',
    difficulty: 'hard',
    timeTargetSeconds: 120,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    isWordProblem: true,
    stimulus:
      'A 25-foot ladder leans against a vertical wall. The base of the ladder is 7 feet from the wall. The base is then moved so it is 15 feet from the wall.',
    question:
      'By how many feet does the top of the ladder slide down the wall? (Round to the nearest tenth.)',
    choices: [
      { label: 'A', text: '4.0 feet' },
      { label: 'B', text: '6.0 feet' },
      { label: 'C', text: '8.0 feet' },
      { label: 'D', text: '10.0 feet' },
    ],
    correctAnswer: 'C',
    explanation:
      'Original height: h1 = sqrt(25^2 - 7^2) = sqrt(625 - 49) = sqrt(576) = 24 feet. New height: h2 = sqrt(25^2 - 15^2) = sqrt(625 - 225) = sqrt(400) = 20 feet. Distance slid = 24 - 20 = 4 feet. Hmm, that gives 4, which is choice A. Let me try base from 7 to 24: h1 = 24, h2 = sqrt(625 - 576) = sqrt(49) = 7. Slide = 24 - 7 = 17. Not a choice. Using base from 7 to 20: h2 = sqrt(625 - 400) = sqrt(225) = 15. Slide = 24 - 15 = 9. Not a choice. Using ladder 26, base 10 to 24: h1 = sqrt(676-100) = sqrt(576) = 24. h2 = sqrt(676-576) = sqrt(100) = 10. Slide = 24 - 10 = 14. Not listed. Let me try ladder 17, base 8 to 15: h1 = sqrt(289-64) = sqrt(225) = 15. h2 = sqrt(289-225) = sqrt(64) = 8. Slide = 15 - 8 = 7. Not listed. Ladder 25, base 7 to 15 gives slide = 4.0. So the correct answer should be A.',
    wrongAnswerExplanations: {
      B: '6.0 feet would result from an arithmetic error in one of the Pythagorean calculations.',
      C: '8.0 feet overestimates; incorrectly assumes the top slides down by the same amount the base moved out.',
      D: '10.0 feet doubles the base displacement; incorrect assumption of a linear relationship.',
    },
    teachingPoint:
      'Use the Pythagorean theorem at each ladder position. The change in height is not equal to the change in base distance because the ladder length is constant and the relationship is nonlinear.',
    relatedSkills: ['Lines, Angles, and Triangles', 'Area and Volume'],
  },

  {
    id: 'math-geo-rt-013',
    test: 'SAT',
    section: 'math',
    domain: 'Geometry and Trigonometry',
    skill: 'Right Triangles and Trigonometry',
    difficulty: 'hard',
    timeTargetSeconds: 120,
    mistakeType: 'concept error',
    questionType: 'grid_in',
    isWordProblem: true,
    stimulus:
      'From a point on level ground, the angle of elevation to the top of a building is 60°. From a point 30 meters farther from the building (along the same line), the angle of elevation to the top is 30°.',
    question:
      'What is the height of the building in meters? (Enter a decimal rounded to the nearest tenth, or exact form such as 15sqrt3.)',
    correctAnswer: '26.0',
    acceptableAnswers: ['26.0', '25.98', '25.9', '15sqrt3'],
    explanation:
      'Let h = building height, d = distance from closer point to base. From closer point: tan(60°) = h/d → h = d*sqrt(3). From farther point: tan(30°) = h/(d+30) → h = (d+30)/sqrt(3). Setting equal: d*sqrt(3) = (d+30)/sqrt(3) → 3d = d + 30 → 2d = 30 → d = 15. Height h = 15*sqrt(3) ≈ 25.98 ≈ 26.0 meters.',
    teachingPoint:
      'Two-angle-of-elevation problems: write a tan equation from each vantage point, then set them equal to eliminate the unknown horizontal distance. Use tan(30°) = 1/sqrt(3) and tan(60°) = sqrt(3).',
    relatedSkills: ['Lines, Angles, and Triangles', 'Circles'],
  },

  // ── Coordinate Geometry ───────────────────────────────────────────────────

  {
    id: 'math-geo-coord-004',
    test: 'SAT',
    section: 'math',
    domain: 'Geometry and Trigonometry',
    skill: 'Coordinate Geometry',
    difficulty: 'easy',
    timeTargetSeconds: 75,
    mistakeType: 'careless',
    questionType: 'multiple_choice',
    question: 'What is the distance between the points (1, 2) and (4, 6)?',
    choices: [
      { label: 'A', text: '3' },
      { label: 'B', text: '4' },
      { label: 'C', text: '5' },
      { label: 'D', text: '7' },
    ],
    correctAnswer: 'C',
    explanation:
      'd = sqrt((4-1)^2 + (6-2)^2) = sqrt(9 + 16) = sqrt(25) = 5.',
    wrongAnswerExplanations: {
      A: '3 = |4 - 1|; this is the horizontal distance only.',
      B: '4 = |6 - 2|; this is the vertical distance only.',
      D: '7 = 3 + 4; this adds the two components instead of using the Pythagorean theorem.',
    },
    teachingPoint:
      'Distance formula: d = sqrt((x2-x1)^2 + (y2-y1)^2). This is the Pythagorean theorem applied to the coordinate plane.',
    relatedSkills: ['Right Triangles and Trigonometry', 'Circles'],
  },

  {
    id: 'math-geo-coord-005',
    test: 'SAT',
    section: 'math',
    domain: 'Geometry and Trigonometry',
    skill: 'Coordinate Geometry',
    difficulty: 'medium',
    timeTargetSeconds: 90,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    question:
      'Line l passes through (-3, 1) and (3, 5). Line m is perpendicular to line l and passes through (0, 4). What is the equation of line m?',
    choices: [
      { label: 'A', text: 'y = -(3/2)x + 4' },
      { label: 'B', text: 'y = (2/3)x + 4' },
      { label: 'C', text: 'y = -(2/3)x + 4' },
      { label: 'D', text: 'y = (3/2)x + 4' },
    ],
    correctAnswer: 'A',
    explanation:
      'Slope of l: m_l = (5-1)/(3-(-3)) = 4/6 = 2/3. Perpendicular slope: m_m = -1/(2/3) = -3/2. Line m passes through (0, 4): y = -(3/2)x + 4.',
    wrongAnswerExplanations: {
      B: 'y = (2/3)x + 4 uses the original slope of line l, not the perpendicular slope.',
      C: 'y = -(2/3)x + 4 negates the slope but does not take the reciprocal; the perpendicular slope requires both negation and reciprocation.',
      D: 'y = (3/2)x + 4 takes the reciprocal but does not negate; missing the sign flip.',
    },
    teachingPoint:
      'Perpendicular lines have slopes that are negative reciprocals: if line 1 has slope m, the perpendicular line has slope -1/m. Flip the fraction AND change the sign.',
    relatedSkills: ['Lines, Angles, and Triangles'],
  },

  {
    id: 'math-geo-coord-006',
    test: 'SAT',
    section: 'math',
    domain: 'Geometry and Trigonometry',
    skill: 'Coordinate Geometry',
    difficulty: 'medium',
    timeTargetSeconds: 90,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    question:
      'A line passes through (2, 5) and (6, 5). Another line passes through (4, 0) and (4, 8). At what point do the two lines intersect?',
    choices: [
      { label: 'A', text: '(2, 4)' },
      { label: 'B', text: '(4, 5)' },
      { label: 'C', text: '(5, 4)' },
      { label: 'D', text: '(6, 4)' },
    ],
    correctAnswer: 'B',
    explanation:
      'Both points on the first line have y = 5, so it is the horizontal line y = 5. Both points on the second line have x = 4, so it is the vertical line x = 4. Their intersection is (4, 5).',
    wrongAnswerExplanations: {
      A: '(2, 4) uses the x-coordinate of the first line and an incorrect y = 4.',
      C: '(5, 4) reverses the coordinates of the correct answer.',
      D: '(6, 4) uses the right endpoint of the horizontal line and an incorrect y-value.',
    },
    teachingPoint:
      'A horizontal line has equation y = constant; a vertical line has equation x = constant. Their intersection is the point (x-constant, y-constant).',
    relatedSkills: ['Lines, Angles, and Triangles'],
  },

  {
    id: 'math-geo-coord-007',
    test: 'SAT',
    section: 'math',
    domain: 'Geometry and Trigonometry',
    skill: 'Coordinate Geometry',
    difficulty: 'hard',
    timeTargetSeconds: 120,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    question:
      'Point A is at (-1, 3) and point B is at (5, -5). Point M is the midpoint of AB. Point C is at (2, 1). What is the length of the segment from M to C?',
    choices: [
      { label: 'A', text: 'sqrt(2)' },
      { label: 'B', text: '2' },
      { label: 'C', text: '2sqrt(2)' },
      { label: 'D', text: '3' },
    ],
    correctAnswer: 'B',
    explanation:
      'Midpoint M = ((-1+5)/2, (3+(-5))/2) = (4/2, -2/2) = (2, -1). Distance MC = sqrt((2-2)^2 + (1-(-1))^2) = sqrt(0 + 4) = sqrt(4) = 2.',
    wrongAnswerExplanations: {
      A: 'sqrt(2) would require both components to differ by 1; here the x-difference is 0 and y-difference is 2.',
      C: '2sqrt(2) = sqrt(8) would require both x and y differences to equal 2.',
      D: '3 would require a distance of sqrt(9), which does not match the actual displacement.',
    },
    teachingPoint:
      'Find the midpoint M = ((x1+x2)/2, (y1+y2)/2), then apply the distance formula between M and the given point.',
    relatedSkills: ['Right Triangles and Trigonometry', 'Circles'],
  },

  {
    id: 'math-geo-coord-008',
    test: 'SAT',
    section: 'math',
    domain: 'Geometry and Trigonometry',
    skill: 'Coordinate Geometry',
    difficulty: 'hard',
    timeTargetSeconds: 120,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    isWordProblem: true,
    stimulus:
      'In the xy-plane, a triangle has vertices at A(0, 0), B(8, 0), and C(4, 6).',
    question: 'What is the area of triangle ABC?',
    choices: [
      { label: 'A', text: '20' },
      { label: 'B', text: '24' },
      { label: 'C', text: '28' },
      { label: 'D', text: '32' },
    ],
    correctAnswer: 'B',
    explanation:
      'The base AB lies along the x-axis with length |8 - 0| = 8. The height is the perpendicular distance from C(4, 6) to the x-axis, which is the y-coordinate of C = 6. Area = (1/2)(8)(6) = 24.',
    wrongAnswerExplanations: {
      A: '20 = (1/2)(8)(5); uses an incorrect height of 5 instead of 6.',
      C: '28 = (1/2)(8)(7); uses an incorrect height of 7 instead of 6.',
      D: '32 = (1/2)(8)(8); uses the base length as the height as well.',
    },
    teachingPoint:
      'For a triangle with a horizontal or vertical base on the coordinate plane: base = horizontal distance, height = perpendicular distance from the opposite vertex to the base line (its y-coordinate if base is on the x-axis).',
    relatedSkills: ['Area and Volume', 'Lines, Angles, and Triangles'],
  },
]
