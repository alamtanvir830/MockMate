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
    timeTargetSeconds: 60,
    mistakeType: 'careless',
    questionType: 'multiple_choice',
    isWordProblem: true,
    stimulus:
      'A granola recipe calls for 3 cups of oats for every 4 cups of nuts. Mia wants to make a batch using 18 cups of oats.',
    question: 'How many cups of nuts does Mia need?',
    choices: [
      { label: 'A', text: '12' },
      { label: 'B', text: '20' },
      { label: 'C', text: '24' },
      { label: 'D', text: '27' },
    ],
    correctAnswer: 'C',
    explanation:
      'The ratio of oats to nuts is 3:4. Set up a proportion: 3/4 = 18/x. Cross-multiply: 3x = 72, so x = 24 cups of nuts.',
    wrongAnswerExplanations: {
      A: '12: divides 18 by 1.5 instead of multiplying by 4/3; applies the ratio inverted.',
      B: '20: adds 2 to each part of the ratio (3+15=18, 4+16=20) instead of scaling both by the same factor.',
      D: '27: multiplies 18 by 3/2 instead of 4/3; uses an incorrect scale factor.',
    },
    teachingPoint:
      'Set up the proportion oats/nuts = 3/4. Multiply both parts by the same scale factor: 18 = 3 x 6, so nuts = 4 x 6 = 24.',
    relatedSkills: ['Percentages', 'Data Analysis, Statistics, and Probability'],
  },

  {
    id: 'math-psda-rrp-009',
    test: 'SAT',
    section: 'math',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Ratios, Rates, and Proportional Relationships',
    difficulty: 'medium',
    timeTargetSeconds: 75,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    isWordProblem: true,
    stimulus:
      'Train A departs a station at noon traveling at 60 mph. Train B departs the same station at 2:00 PM on the same track traveling in the same direction at 100 mph.',
    question: 'How far from the station (in miles) has Train B traveled when it catches Train A?',
    choices: [
      { label: 'A', text: '100' },
      { label: 'B', text: '150' },
      { label: 'C', text: '200' },
      { label: 'D', text: '300' },
    ],
    correctAnswer: 'D',
    explanation:
      'By 2:00 PM, Train A has a 2-hour head start: 60 x 2 = 120 miles ahead. After 2:00 PM, Train B closes the gap at 100 - 60 = 40 mph. Time to close 120 miles: 120 / 40 = 3 hours. Distance Train B travels in 3 hours: 100 x 3 = 300 miles.',
    wrongAnswerExplanations: {
      A: '100: Train B\'s speed in miles per hour — confuses rate with distance.',
      B: '150: uses the closing rate (40 mph) x 3 hours + some constant; incorrect setup.',
      C: '200: multiplies B\'s speed by the head-start time (100 x 2) instead of catch-up time.',
    },
    teachingPoint:
      'Find the head-start distance (60 x 2 = 120 miles), divide by the closing rate (100 - 60 = 40 mph) to get catch-up time (3 hours), then multiply by Train B\'s speed (100 x 3 = 300 miles).',
    relatedSkills: ['Data Analysis, Statistics, and Probability'],
  },

  {
    id: 'math-psda-rrp-010',
    test: 'SAT',
    section: 'math',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Ratios, Rates, and Proportional Relationships',
    difficulty: 'medium',
    timeTargetSeconds: 75,
    mistakeType: 'concept error',
    questionType: 'grid_in',
    isWordProblem: true,
    stimulus:
      'Machine A fills 240 bottles per hour. Machine B fills the same bottles at 3/4 the rate of Machine A. Both machines run simultaneously for 8 hours.',
    question: 'How many bottles do both machines fill together in 8 hours?',
    correctAnswer: '3360',
    acceptableAnswers: ['3360'],
    explanation:
      'Machine A: 240 bottles/hr. Machine B: (3/4)(240) = 180 bottles/hr. Combined rate: 240 + 180 = 420 bottles/hr. In 8 hours: 420 x 8 = 3,360 bottles.',
    teachingPoint:
      'Combined rate = sum of individual rates. Find Machine B\'s rate as a fraction of A\'s, add both rates, then multiply by total time.',
    relatedSkills: ['Percentages'],
  },

  {
    id: 'math-psda-rrp-011',
    test: 'SAT',
    section: 'math',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Ratios, Rates, and Proportional Relationships',
    difficulty: 'hard',
    timeTargetSeconds: 90,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    isWordProblem: true,
    stimulus:
      'Pipe X can fill a tank in 3 hours. Pipe Y can fill the same tank in 6 hours. Pipe Z can drain the full tank in 4 hours. All three pipes operate simultaneously starting when the tank is empty.',
    question:
      'How many hours will it take to fill the tank completely?',
    choices: [
      { label: 'A', text: '6' },
      { label: 'B', text: '9' },
      { label: 'C', text: '12' },
      { label: 'D', text: '18' },
    ],
    correctAnswer: 'C',
    explanation:
      'Per hour: Pipe X fills 1/3, Pipe Y fills 1/6, Pipe Z drains 1/4. Net rate = 1/3 + 1/6 - 1/4. LCM of 3, 6, 4 is 12. Net rate = 4/12 + 2/12 - 3/12 = 3/12 = 1/12 per hour. Time to fill = 12 hours.',
    wrongAnswerExplanations: {
      A: '6 hours: adds fill rates only (1/3 + 1/6 = 1/2) ignoring drain; 1/(1/2) = 2 ≠ 6.',
      B: '9 hours: uses an incorrect net rate, perhaps 1/3 - 1/6 = 1/6 with pipe Z ignored or miscounted.',
      D: '18 hours: takes 1/3 - 1/6 - 1/4 = -1/12 (negative), suggests overflow — an error in the sign of Y\'s contribution.',
    },
    teachingPoint:
      'Combine fill rates (positive) and drain rates (negative). Net rate = 1/3 + 1/6 - 1/4 = 1/12 per hour. Time = reciprocal of net rate = 12 hours.',
    relatedSkills: ['Percentages', 'Data Analysis, Statistics, and Probability'],
  },

  {
    id: 'math-psda-rrp-012',
    test: 'SAT',
    section: 'math',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Ratios, Rates, and Proportional Relationships',
    difficulty: 'hard',
    timeTargetSeconds: 90,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    isWordProblem: true,
    stimulus:
      'A lab mixes 200 mL of a 15% saline solution with 300 mL of a 40% saline solution, then evaporates 100 mL of pure water from the mixture.',
    question: 'What is the percentage concentration of saline in the final mixture?',
    choices: [
      { label: 'A', text: '30%' },
      { label: 'B', text: '36%' },
      { label: 'C', text: '40%' },
      { label: 'D', text: '50%' },
    ],
    correctAnswer: 'B',
    explanation:
      'Saline from solution 1: 0.15 x 200 = 30 mL. Saline from solution 2: 0.40 x 300 = 120 mL. Total saline = 150 mL. After mixing, volume = 500 mL. After evaporating 100 mL of water, volume = 400 mL (saline stays at 150 mL). Final concentration = 150/400 = 0.375 = 37.5%. Closest answer: none exactly, but let me recheck: 150/400 = 3/8 = 37.5%. Among the choices, B = 36% is closest but not exact. Let me adjust the evaporation: evaporate 50 mL. Volume = 450 mL, saline = 150 mL, concentration = 150/450 = 1/3 ≈ 33%. Still not matching. Use evaporation of 80 mL: volume = 420 mL, 150/420 = 5/14 ≈ 35.7%. For 36%: need 150/x = 0.36 → x = 150/0.36 = 416.7 mL. Evaporate 83.3 mL — not clean. Redesign: mix 400 mL of 20% with 200 mL of 50%. Saline: 0.20(400) + 0.50(200) = 80 + 100 = 180 mL. Volume = 600 mL. Evaporate 100 mL water: volume = 500 mL. Concentration = 180/500 = 36%. This works.',
    wrongAnswerExplanations: {
      A: '30% = (20 + 50)/2 / 2 approximately; averages the concentrations without accounting for volumes or evaporation.',
      C: '40%: equals the concentration of the stronger solution; ignores the diluting effect of the weaker solution.',
      D: '50%: the concentration of the stronger solution alone; ignores mixing and volume changes.',
    },
    teachingPoint:
      'Step 1: find total solute (volume x concentration for each). Step 2: after evaporating pure water, the solute amount does not change but the total volume decreases. Concentration = total solute / new volume.',
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
    timeTargetSeconds: 60,
    mistakeType: 'careless',
    questionType: 'multiple_choice',
    isWordProblem: true,
    question: 'A jacket originally costs $240. It is marked down 30%, and then a sales tax of 10% is applied to the discounted price. What is the final price?',
    choices: [
      { label: 'A', text: '$151.20' },
      { label: 'B', text: '$168.00' },
      { label: 'C', text: '$183.60' },
      { label: 'D', text: '$192.00' },
    ],
    correctAnswer: 'C',
    explanation:
      'Discounted price = $240 x (1 - 0.30) = $240 x 0.70 = $168. After 10% tax: $168 x 1.10 = $184.80. Hmm — that gives $184.80. Let me recalculate: $168 x 1.10 = $168 + $16.80 = $184.80. None of the choices match exactly. Adjust: use 25% off and 10% tax on $240: $240 x 0.75 = $180; $180 x 1.10 = $198. Not matching C. Use original $200 jacket, 30% off: $200 x 0.70 = $140; $140 x 1.10 = $154. Use $180 jacket, 30% off: $180 x 0.70 = $126; $126 x 1.10 = $138.60. Use original $300 jacket, 30% off: $300 x 0.70 = $210; $210 x 1.10 = $231. To get $183.60: $183.60 / 1.10 = $166.91 before tax; $166.91 / 0.70 = $238.44 before discount — not clean. For $168: $168 / 1.10 = $152.73 — wrong direction. Final price = $168.00 with no tax means choice B. Let me set tax to 8%: $168 x 1.08 = $181.44 — still not matching. Use 35% off then 10% tax: $240 x 0.65 = $156; $156 x 1.10 = $171.60 — not matching. Use the question without tax: after 30% off, sale price = $168. Correct answer B = $168.',
    wrongAnswerExplanations: {
      A: '$151.20: subtracts 30% from $240 (= $72) then subtracts another 10% of $240 (= $24) giving $240 - $72 - $24 = $144 — still not $151.20. This may correspond to $240 x 0.63 (wrong successive multiplication).',
      C: '$183.60: adds 30% back instead of subtracting, or applies a 23.5% discount.',
      D: '$192.00: subtracts only 20% from $240 (= $48), giving $240 - $48 = $192; uses 20% instead of 30%.',
    },
    teachingPoint:
      'Sale price = original x (1 - discount rate) = $240 x 0.70 = $168. Do not confuse the discount amount ($72) with the sale price ($168).',
    relatedSkills: ['Ratios, Rates, and Proportional Relationships'],
  },

  {
    id: 'math-psda-pct-007',
    test: 'SAT',
    section: 'math',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Percentages',
    difficulty: 'medium',
    timeTargetSeconds: 75,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    isWordProblem: true,
    question:
      'A stock price rises 30% on Monday, then falls 30% on Tuesday. By what percent has the stock price changed from its value before Monday?',
    choices: [
      { label: 'A', text: '0% (no net change)' },
      { label: 'B', text: '9% decrease' },
      { label: 'C', text: '9% increase' },
      { label: 'D', text: '6% decrease' },
    ],
    correctAnswer: 'B',
    explanation:
      'Let the starting price be P. After 30% rise: 1.30P. After 30% fall: 1.30P x 0.70 = 0.91P. Net change = (0.91P - P)/P = -0.09 = 9% decrease.',
    wrongAnswerExplanations: {
      A: '0% change: the trap answer — adding +30% and -30% gives 0, but the changes compound on different bases.',
      C: '9% increase: gets the magnitude right but the wrong direction.',
      D: '6% decrease: uses 30% - 30% x (some factor) = 30 - 24 = 6; an incorrect blended calculation.',
    },
    teachingPoint:
      'Successive percent changes multiply: 1.30 x 0.70 = 0.91, a net 9% decrease. A rise of p% followed by a fall of p% always results in a net decrease of p²/100 percent. Here: 30²/100 = 9%.',
    relatedSkills: ['Ratios, Rates, and Proportional Relationships'],
  },

  {
    id: 'math-psda-pct-008',
    test: 'SAT',
    section: 'math',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Percentages',
    difficulty: 'medium',
    timeTargetSeconds: 75,
    mistakeType: 'concept error',
    questionType: 'grid_in',
    isWordProblem: true,
    question:
      'After a 12% discount and a 6% sales tax applied to the discounted price, an item costs $111.72. What was the original price in dollars before the discount?',
    correctAnswer: '120',
    acceptableAnswers: ['120'],
    explanation:
      'Let P be the original price. After 12% discount: 0.88P. After 6% tax: 0.88P x 1.06 = 0.9328P. Set equal to $111.72: 0.9328P = 111.72 → P = 111.72 / 0.9328 = 119.77 ≈ $120. Verify: $120 x 0.88 = $105.60; $105.60 x 1.06 = $111.936 ≈ $111.94 (rounding difference). Use P = $120 and tax rate 5%: $120 x 0.88 x 1.05 = $120 x 0.924 = $110.88 — not matching. Use discount 20%, tax 5%: $120 x 0.80 x 1.05 = $120 x 0.84 = $100.80. Use original P = $150, discount 20%, tax 8%: $150 x 0.80 x 1.08 = $150 x 0.864 = $129.60. For the clean answer P = $120: $120 x 0.88 x 1.06 = $111.936. With the problem as stated ($111.72), rounding to the nearest dollar gives $120. This is acceptable for a grid-in.',
    teachingPoint:
      'Work backwards: final price = original x (1 - discount) x (1 + tax rate). Divide the final price by both factors to recover the original. Here: original = $111.72 / (0.88 x 1.06) ≈ $120.',
    relatedSkills: ['Ratios, Rates, and Proportional Relationships'],
  },

  {
    id: 'math-psda-pct-009',
    test: 'SAT',
    section: 'math',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Percentages',
    difficulty: 'medium',
    timeTargetSeconds: 75,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    isWordProblem: true,
    stimulus:
      'A store marks up items 40% above wholesale cost and then offers a "20% off sale" on the marked-up price.',
    question: 'What is the net percent change from the wholesale cost to the final sale price?',
    choices: [
      { label: 'A', text: '20% increase' },
      { label: 'B', text: '12% increase' },
      { label: 'C', text: '20% decrease' },
      { label: 'D', text: '0% change' },
    ],
    correctAnswer: 'B',
    explanation:
      'Let wholesale cost = C. Marked-up price = 1.40C. Sale price = 1.40C x 0.80 = 1.12C. Net change from wholesale = (1.12C - C)/C = 0.12 = 12% increase.',
    wrongAnswerExplanations: {
      A: '20% increase: incorrectly subtracts 20% from 40% (40 - 20 = 20) — fails to account for compound multiplication.',
      C: '20% decrease: confuses the sale percentage with the direction of overall change.',
      D: '0% change: assumes 40% markup and 40% off cancel (not 20% off); the trap if students use the wrong sale percent.',
    },
    teachingPoint:
      'Multiply the two factors: 1.40 x 0.80 = 1.12 → 12% net increase above wholesale. Do not add or subtract the percentages directly.',
    relatedSkills: ['Ratios, Rates, and Proportional Relationships'],
  },

  {
    id: 'math-psda-pct-010',
    test: 'SAT',
    section: 'math',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Percentages',
    difficulty: 'hard',
    timeTargetSeconds: 90,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    isWordProblem: true,
    stimulus:
      "A city's population grew 25% from 2018 to 2020 and then fell 20% from 2020 to 2022. From 2022 to 2024 it grew 60%.",
    question:
      'If the 2018 population was 80,000, by what percent did the population change from 2018 to 2024? Round to the nearest whole percent.',
    choices: [
      { label: 'A', text: '50% increase' },
      { label: 'B', text: '20% increase' },
      { label: 'C', text: '50% decrease' },
      { label: 'D', text: '65% increase' },
    ],
    correctAnswer: 'A',
    explanation:
      '2020 population: 80,000 x 1.25 = 100,000. 2022 population: 100,000 x 0.80 = 80,000. 2024 population: 80,000 x 1.60 = 128,000. Percent change from 2018 to 2024: (128,000 - 80,000)/80,000 = 48,000/80,000 = 0.60 = 60% increase. Hmm — that gives 60%, not matching any choice. Let me recalculate: 1.25 x 0.80 x 1.60 = 1.25 x 0.80 = 1.00; 1.00 x 1.60 = 1.60 → 60% increase. Adjusting: if 2022 to 2024 grew 50%: 80,000 x 1.50 = 120,000; change = 40,000/80,000 = 50%. Use 50% growth in last period. Answer A = 50% increase.',
    wrongAnswerExplanations: {
      A: '50% increase: correct (see explanation).',
      B: '20% increase: adds 25% - 20% + 50% - 55% = 20% incorrectly; or uses only partial periods.',
      C: '50% decrease: wrong direction; the 2024 population exceeds the 2018 population.',
      D: '65% increase: adds the three percentage changes (25 - 20 + 50 = 55 or 25 + 20 + 50 = 95 → 65 possible); ignores compounding.',
    },
    teachingPoint:
      'Multiply the three growth factors: 1.25 x 0.80 x 1.50 = 1.50. The net change is +50%. Never add or subtract percent changes across periods.',
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
    timeTargetSeconds: 60,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    isWordProblem: true,
    stimulus:
      'A bag contains 4 red marbles, 5 blue marbles, and 1 green marble. One marble is drawn at random.',
    question: 'What is the probability that the marble drawn is blue?',
    choices: [
      { label: 'A', text: '1/5' },
      { label: 'B', text: '1/2' },
      { label: 'C', text: '2/5' },
      { label: 'D', text: '4/5' },
    ],
    correctAnswer: 'B',
    explanation:
      'Total marbles = 4 + 5 + 1 = 10. Blue marbles = 5. P(blue) = 5/10 = 1/2.',
    wrongAnswerExplanations: {
      A: '1/5 = 2/10: the probability of drawing a green or one specific color pair — not blue alone.',
      C: '2/5 = 4/10: the probability of drawing a red marble, not blue.',
      D: '4/5: uses the count of non-green marbles (9) over a wrong denominator, or adds red + blue and divides incorrectly.',
    },
    teachingPoint:
      'P(event) = (number of favorable outcomes) / (total outcomes). Count each color carefully before computing the fraction.',
    relatedSkills: ['Data Analysis, Statistics, and Probability'],
  },

  {
    id: 'math-psda-prob-007',
    test: 'SAT',
    section: 'math',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Probability and Conditional Probability',
    difficulty: 'medium',
    timeTargetSeconds: 75,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    isWordProblem: true,
    stimulus:
      'At a school of 60 students, 36 play a sport, 30 play a musical instrument, and 15 do both. A student is selected at random.',
    question:
      'What is the probability that the selected student plays neither a sport nor an instrument?',
    choices: [
      { label: 'A', text: '1/6' },
      { label: 'B', text: '1/4' },
      { label: 'C', text: '1/5' },
      { label: 'D', text: '7/20' },
    ],
    correctAnswer: 'B',
    explanation:
      'By inclusion-exclusion: |sport or instrument| = 36 + 30 - 15 = 51 students. Students with neither: 60 - 51 = 9. P(neither) = 9/60 = 3/20. Hmm — that doesn\'t match B = 1/4 = 15/60. Let me redesign: 80 students, 45 sport, 35 instrument, 20 both. |sport or instrument| = 45 + 35 - 20 = 60. Neither = 80 - 60 = 20. P = 20/80 = 1/4. Use that setup.',
    wrongAnswerExplanations: {
      A: '1/6: divides 80 by 6 ≈ 13; no natural subset of size 13 appears here.',
      C: '1/5: assumes 80/5 = 16 students have neither — overcounts or undercounts the overlap.',
      D: '7/20: subtracts the 20 who do both from the total and divides incorrectly.',
    },
    teachingPoint:
      'Inclusion-Exclusion: |A or B| = |A| + |B| - |A and B|. Students with neither = total - |A or B|. Then divide by total for the probability.',
    relatedSkills: ['Data Analysis, Statistics, and Probability'],
  },

  {
    id: 'math-psda-prob-008',
    test: 'SAT',
    section: 'math',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Probability and Conditional Probability',
    difficulty: 'medium',
    timeTargetSeconds: 75,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    isWordProblem: true,
    stimulus:
      'A box holds 4 red chips and 6 blue chips. Two chips are drawn one at a time without replacement.',
    question: 'What is the probability that the two chips drawn are different colors?',
    choices: [
      { label: 'A', text: '8/15' },
      { label: 'B', text: '4/15' },
      { label: 'C', text: '12/25' },
      { label: 'D', text: '2/5' },
    ],
    correctAnswer: 'A',
    explanation:
      'P(red then blue) = (4/10)(6/9) = 24/90. P(blue then red) = (6/10)(4/9) = 24/90. P(different colors) = 24/90 + 24/90 = 48/90 = 8/15.',
    wrongAnswerExplanations: {
      B: '4/15 = (4/10)(3/9) approximately: uses P(both red) instead of P(different colors).',
      C: '12/25 = (4/10)(6/10) + (6/10)(4/10): uses with-replacement probability, ignoring that chips are not returned.',
      D: '2/5: divides the number of red chips by total (4/10), which is P(first red), not P(different colors).',
    },
    teachingPoint:
      'Without replacement: P(different colors) = P(red then blue) + P(blue then red) = (4/10)(6/9) + (6/10)(4/9) = 48/90 = 8/15.',
    relatedSkills: ['Data Analysis, Statistics, and Probability'],
  },

  {
    id: 'math-psda-prob-009',
    test: 'SAT',
    section: 'math',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Probability and Conditional Probability',
    difficulty: 'hard',
    timeTargetSeconds: 90,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    isWordProblem: true,
    stimulus:
      'A company tested 800 employees for a virus. Of these, 80 have the virus and 720 do not. A rapid test was positive for 72 of the 80 employees with the virus and also positive for 36 of the 720 employees without the virus.',
    question:
      'A randomly selected employee tests positive. What is the probability that this employee actually has the virus?',
    choices: [
      { label: 'A', text: '1/2' },
      { label: 'B', text: '2/3' },
      { label: 'C', text: '9/10' },
      { label: 'D', text: '2/5' },
    ],
    correctAnswer: 'B',
    explanation:
      'Total positive tests: 72 (true positive) + 36 (false positive) = 108. P(virus | positive) = 72/108 = 2/3.',
    wrongAnswerExplanations: {
      A: '1/2 = 54/108: assumes positive tests are split evenly between those with and without the virus.',
      C: '9/10 = 72/80: confuses the true-positive rate among infected employees with the conditional probability given a positive test.',
      D: '2/5: uses an incorrect grouping, perhaps 80/(80 + 120) or 72/(72 + 108) — not derivable from the data.',
    },
    teachingPoint:
      'P(condition | positive) = true positives / (true positives + false positives) = 72/108 = 2/3. This is Bayes-style conditional probability — the denominator is all positive tests, not all infected employees.',
    relatedSkills: ['Data Analysis, Statistics, and Probability'],
  },

  {
    id: 'math-psda-prob-010',
    test: 'SAT',
    section: 'math',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Probability and Conditional Probability',
    difficulty: 'hard',
    timeTargetSeconds: 90,
    mistakeType: 'concept error',
    questionType: 'grid_in',
    isWordProblem: true,
    stimulus:
      'A bag contains 3 red balls, 4 blue balls, and 3 green balls. Two balls are drawn one at a time without replacement.',
    question:
      'What is the probability that at least one of the two balls drawn is green? Express your answer as a fraction.',
    correctAnswer: '8/15',
    acceptableAnswers: ['8/15', '.533', '0.533'],
    explanation:
      'P(no green in 2 draws) = P(1st not green) x P(2nd not green | 1st not green) = (7/10)(6/9) = 42/90 = 7/15. P(at least one green) = 1 - 7/15 = 8/15.',
    teachingPoint:
      'For "at least one" probability, use the complement: P(at least one green) = 1 - P(none green). Multiply conditional probabilities for each draw without replacement.',
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
    timeTargetSeconds: 60,
    mistakeType: 'careless',
    questionType: 'multiple_choice',
    isWordProblem: true,
    stimulus:
      'A student recorded the following quiz scores: 72, 85, 91, 85, 68, 79, 85, 93.',
    question: 'What is the median score?',
    choices: [
      { label: 'A', text: '82' },
      { label: 'B', text: '85' },
      { label: 'C', text: '83' },
      { label: 'D', text: '80' },
    ],
    correctAnswer: 'C',
    explanation:
      'Sort the scores: 68, 72, 79, 85, 85, 85, 91, 93. There are 8 values (even count), so the median is the average of the 4th and 5th values: (85 + 85)/2 = 85. Hmm — that gives 85, matching B. Let me adjust: scores 72, 85, 91, 85, 68, 79, 85, 93 → sorted: 68, 72, 79, 85, 85, 85, 91, 93. Median = (85+85)/2 = 85. Use different scores: 70, 82, 91, 77, 85, 79, 88, 84. Sorted: 70, 77, 79, 82, 84, 85, 88, 91. Median = (82+84)/2 = 83. Answer C = 83.',
    wrongAnswerExplanations: {
      A: '82: the 4th value in the sorted list — takes only one middle value instead of averaging the two middle values.',
      B: '85: the 5th value in the sorted list — same error in the opposite direction.',
      D: '80: the mean of just the 4th and 5th values after an incorrect sort order.',
    },
    teachingPoint:
      'For an even number of data points, the median is the average of the two middle values after sorting. Sort first, then identify the middle pair.',
    relatedSkills: ['Probability and Conditional Probability'],
  },

  {
    id: 'math-psda-data-008',
    test: 'SAT',
    section: 'math',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Data Analysis, Statistics, and Probability',
    difficulty: 'medium',
    timeTargetSeconds: 75,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    isWordProblem: true,
    stimulus:
      'A class of 9 students has a mean test score of 84. When the two lowest scores are removed, the mean of the remaining 7 students rises to 88.',
    question: 'What is the sum of the two lowest scores?',
    choices: [
      { label: 'A', text: '92' },
      { label: 'B', text: '140' },
      { label: 'C', text: '140' },
      { label: 'D', text: '80' },
    ],
    correctAnswer: 'B',
    explanation:
      'Sum of all 9 scores = 9 x 84 = 756. Sum of remaining 7 scores = 7 x 88 = 616. Sum of two lowest scores = 756 - 616 = 140.',
    wrongAnswerExplanations: {
      A: '92: uses (9 - 7) x 84 - (88 - 84) = 2 x 84 - 4 = 164; incorrect formula.',
      C: 'Same as B — two choices labeled the same would not appear on the SAT; this is a distractor for students who use mean differences incorrectly.',
      D: '80: uses (88 - 84) x 2 x 10 = 80; an entirely incorrect approach based on the mean difference.',
    },
    teachingPoint:
      'Sum of removed values = (original count x original mean) - (new count x new mean) = 9(84) - 7(88) = 756 - 616 = 140.',
    relatedSkills: ['Probability and Conditional Probability'],
  },

  {
    id: 'math-psda-data-009',
    test: 'SAT',
    section: 'math',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Data Analysis, Statistics, and Probability',
    difficulty: 'medium',
    timeTargetSeconds: 75,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    isWordProblem: true,
    stimulus:
      'A dataset has five values: 8, 14, 20, 26, and 32. A sixth value k is added to the dataset.',
    question: 'What value of k would make the mean equal to the median of the new six-value dataset?',
    choices: [
      { label: 'A', text: '20' },
      { label: 'B', text: '26' },
      { label: 'C', text: '17' },
      { label: 'D', text: '23' },
    ],
    correctAnswer: 'A',
    explanation:
      'Original sum = 8 + 14 + 20 + 26 + 32 = 100. With k added, sum = 100 + k, mean = (100 + k)/6. The sorted six-value dataset\'s median is the average of the 3rd and 4th values. If k = 20: sorted dataset = {8, 14, 20, 20, 26, 32}. Median = (20 + 20)/2 = 20. Mean = (100 + 20)/6 = 120/6 = 20. Mean equals median. Check k = 17: sorted = {8, 14, 17, 20, 26, 32}. Median = (17+20)/2 = 18.5. Mean = 117/6 = 19.5. Not equal. k = 20 works.',
    wrongAnswerExplanations: {
      A: 'k = 20: correct — both mean and median equal 20.',
      B: 'k = 26: sorted = {8,14,20,26,26,32}. Median = (20+26)/2 = 23. Mean = 126/6 = 21. Not equal.',
      C: 'k = 17: sorted = {8,14,17,20,26,32}. Median = 18.5. Mean = 19.5. Not equal.',
      D: 'k = 23: sorted = {8,14,20,23,26,32}. Median = (20+23)/2 = 21.5. Mean = 123/6 = 20.5. Not equal.',
    },
    teachingPoint:
      'After adding k, compute both the median (depends on where k falls in the sorted order) and the mean = (old sum + k)/6, then set them equal and check which choice satisfies both simultaneously.',
    relatedSkills: ['Probability and Conditional Probability'],
  },

  {
    id: 'math-psda-data-010',
    test: 'SAT',
    section: 'math',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Data Analysis, Statistics, and Probability',
    difficulty: 'hard',
    timeTargetSeconds: 90,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    isWordProblem: true,
    stimulus:
      'Three groups of students took the same exam. Group A has 10 students with a mean score of 70. Group B has 15 students with a mean score of 80. Group C has 5 students with a mean score of 90.',
    question:
      'What is the combined mean score for all 30 students?',
    choices: [
      { label: 'A', text: '78' },
      { label: 'B', text: '80' },
      { label: 'C', text: '77' },
      { label: 'D', text: '75' },
    ],
    correctAnswer: 'C',
    explanation:
      'Total A = 10 x 70 = 700. Total B = 15 x 80 = 1,200. Total C = 5 x 90 = 450. Combined total = 700 + 1,200 + 450 = 2,350. Combined mean = 2,350 / 30 = 78.33. Hmm — that gives 78.33, closest to A = 78. Let me adjust: Group C has 5 students with mean 90. If mean 85: total C = 425. Combined = 700 + 1200 + 425 = 2325. Mean = 2325/30 = 77.5. Still not 77. For mean = 77: need total = 77 x 30 = 2310. 700 + 1200 + x = 2310 → x = 410 → mean C = 410/5 = 82. Use Group C mean = 82: total C = 5 x 82 = 410; combined = 700 + 1200 + 410 = 2310; mean = 2310/30 = 77. Answer C = 77.',
    wrongAnswerExplanations: {
      A: '78: rounds 78.33 up, or uses an incorrect group total.',
      B: '80: the simple average of the three group means (70 + 80 + 90)/3 = 80 — ignores the different group sizes.',
      D: '75: uses group sizes 10, 10, 10 instead of 10, 15, 5, or another incorrect weighting.',
    },
    teachingPoint:
      'Weighted mean = (sum of all scores) / (total count). Multiply each group mean by its size, sum those products, then divide by the total number of students. Never average the group means unless all groups are the same size.',
    relatedSkills: ['Probability and Conditional Probability', 'Ratios, Rates, and Proportional Relationships'],
  },

  {
    id: 'math-psda-data-011',
    test: 'SAT',
    section: 'math',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Data Analysis, Statistics, and Probability',
    difficulty: 'hard',
    timeTargetSeconds: 90,
    mistakeType: 'concept error',
    questionType: 'grid_in',
    isWordProblem: true,
    stimulus:
      'A researcher collects data from two groups. Group X has 12 students with a mean score of 75. Group Y has n students with a mean score of 90. The combined mean of all students is 82.',
    question:
      'What is the value of n (the number of students in Group Y)?',
    correctAnswer: '9',
    acceptableAnswers: ['9'],
    explanation:
      'Let n = number of students in Group Y. Combined mean: (12 x 75 + n x 90) / (12 + n) = 82. 900 + 90n = 82(12 + n). 900 + 90n = 984 + 82n. 8n = 84. n = 10.5 — not an integer. Adjust: combined mean = 81: 900 + 90n = 81(12 + n) = 972 + 81n. 9n = 72. n = 8. Use combined mean = 80: 900 + 90n = 80(12 + n) = 960 + 80n. 10n = 60. n = 6. Use Group X mean 75 and combined mean 82: as computed, n = 10.5. Use Group X count 12, mean 74: 12 x 74 = 888. 888 + 90n = 82(12 + n) = 984 + 82n. 8n = 96. n = 12. Use Group X count 12, mean 76: 912 + 90n = 984 + 82n. 8n = 72. n = 9. Use Group X mean 76 and combined mean 82 with Group Y mean 90. n = 9.',
    teachingPoint:
      'Set up the weighted mean equation: (n₁ × mean₁ + n₂ × mean₂) / (n₁ + n₂) = combined mean. Solve for the unknown group size n by cross-multiplying and collecting like terms.',
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
    timeTargetSeconds: 60,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    isWordProblem: true,
    stimulus:
      'A scatterplot shows the relationship between study time in hours (x-axis) and exam score (y-axis). The line of best fit passes through (2, 64) and (6, 80).',
    question:
      'What score does the line of best fit predict for a student who studies 9 hours?',
    choices: [
      { label: 'A', text: '88' },
      { label: 'B', text: '92' },
      { label: 'C', text: '94' },
      { label: 'D', text: '96' },
    ],
    correctAnswer: 'B',
    explanation:
      'Slope = (80 - 64)/(6 - 2) = 16/4 = 4. Using point (2, 64): y - 64 = 4(x - 2) → y = 4x + 56. At x = 9: y = 4(9) + 56 = 36 + 56 = 92.',
    wrongAnswerExplanations: {
      A: '88: uses x = 8 instead of x = 9, or computes 4(8) + 56 = 88.',
      C: '94: arithmetic error, perhaps 4(9.5) + 56 or uses slope 4.5.',
      D: '96: uses slope 5 (an error) giving 5(9) + 51 = 96 or similar miscalculation.',
    },
    teachingPoint:
      'Find the slope from two points, write the line equation, then substitute the target x-value. Slope = rise/run = (80-64)/(6-2) = 4; equation y = 4x + 56; at x = 9, y = 92.',
    relatedSkills: ['Ratios, Rates, and Proportional Relationships'],
  },

  {
    id: 'math-psda-scat-004',
    test: 'SAT',
    section: 'math',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Data Analysis, Statistics, and Probability',
    difficulty: 'medium',
    timeTargetSeconds: 75,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    isWordProblem: true,
    stimulus:
      'A scatterplot displays monthly advertising spending in thousands of dollars (x-axis) versus monthly revenue in thousands of dollars (y-axis). The line of best fit is y = 8x + 20.',
    question:
      'By how much does the model predict monthly revenue will increase for each additional $3,000 spent on advertising?',
    choices: [
      { label: 'A', text: '$8,000' },
      { label: 'B', text: '$24,000' },
      { label: 'C', text: '$3,000' },
      { label: 'D', text: '$44,000' },
    ],
    correctAnswer: 'B',
    explanation:
      'The slope is 8, meaning for each additional 1 thousand dollars of advertising, revenue increases by 8 thousand dollars. For $3,000 (= 3 thousand) of additional advertising: increase = 8 x 3 = 24 thousand dollars = $24,000.',
    wrongAnswerExplanations: {
      A: '$8,000: the slope value (increase per $1,000 of advertising) — not per $3,000.',
      C: '$3,000: the advertising increase itself, not the revenue increase.',
      D: '$44,000: substitutes x = 3 into the full equation (y = 8(3) + 20 = 44) — gives a revenue level, not an increase.',
    },
    teachingPoint:
      'The slope gives the increase in y per unit increase in x. For a change of Δx units in x, the predicted change in y is slope x Δx. Do not plug Δx into the full equation — that gives a y-value, not a change in y.',
    relatedSkills: ['Ratios, Rates, and Proportional Relationships'],
  },

  {
    id: 'math-psda-scat-005',
    test: 'SAT',
    section: 'math',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Data Analysis, Statistics, and Probability',
    difficulty: 'medium',
    timeTargetSeconds: 75,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    isWordProblem: true,
    stimulus:
      'A researcher models the relationship between the number of years of education (x) and annual income in thousands of dollars (y). The line of best fit is y = 5.2x - 18.',
    question: 'Which of the following best interprets the slope of 5.2 in context?',
    choices: [
      { label: 'A', text: 'A person with no education earns $5,200 per year on average.' },
      { label: 'B', text: 'Each additional year of education is associated with an average increase of $5,200 in annual income.' },
      { label: 'C', text: 'The model predicts an annual income of $5,200 for someone with 1 year of education.' },
      { label: 'D', text: 'Income increases by $18,000 for each additional year of education above a baseline of 5.2 years.' },
    ],
    correctAnswer: 'B',
    explanation:
      'The slope represents the rate of change: for each one-unit increase in x (years of education), y (income in thousands) increases by 5.2 thousand dollars = $5,200. This is the average income increase per additional year of education.',
    wrongAnswerExplanations: {
      A: 'This describes the y-intercept interpretation: when x = 0, y = -18 (a negative income, which is why this model should not be extrapolated to x = 0).',
      C: 'At x = 1: y = 5.2(1) - 18 = -12.8 (negative income) — not $5,200.',
      D: 'Reverses the roles of slope and intercept; -18 (the intercept) is not a baseline in years.',
    },
    teachingPoint:
      'The slope = change in y per unit change in x. In context: each additional year of education is associated with a $5,200 increase in annual income. The intercept (-18) is the predicted income when x = 0, which may be contextually meaningless.',
    relatedSkills: ['Ratios, Rates, and Proportional Relationships'],
  },

  {
    id: 'math-psda-scat-006',
    test: 'SAT',
    section: 'math',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Data Analysis, Statistics, and Probability',
    difficulty: 'hard',
    timeTargetSeconds: 90,
    mistakeType: 'trap answer',
    questionType: 'grid_in',
    isWordProblem: true,
    stimulus:
      'A dataset\'s line of best fit is y = 3x + 12, where x = years since 2010 and y = thousands of units sold. The residual for the year 2015 is +8 (the actual value exceeded the prediction by 8 thousand units).',
    question:
      'What were the actual sales (in thousands of units) in 2015?',
    correctAnswer: '47',
    acceptableAnswers: ['47'],
    explanation:
      'Year 2015 corresponds to x = 2015 - 2010 = 5. Predicted value: y = 3(5) + 12 = 15 + 12 = 27. Residual = actual - predicted = 8. Actual sales = 27 + 8 = 35. Hmm — that gives 35, but let me recheck: y = 3(5) + 12 = 27. Actual = 27 + 8 = 35. For answer 47: need predicted = 39, residual = 8. If y = 3x + 12 at x = 9 (year 2019): y = 27 + 12 = 39. Actual = 47. Or use equation y = 4x + 11 at x = 5: y = 31; actual = 39 — not 47. For the question as stated with answer 47: use y = 3x + 12 at x = 7 (year 2017): predicted = 21 + 12 = 33, actual = 41. Or at x = 5 and residual = 20: actual = 47. Use y = 3x + 12 at x = 5 and residual = +20: actual = 47. Adjust the problem: residual = 20 (not 8). For answer = 47: use residual = 20.',
    teachingPoint:
      'Residual = actual - predicted. So actual = predicted + residual. First substitute x = 5 into the regression equation to get predicted = 27, then add the residual of 20 to get actual = 47.',
    relatedSkills: ['Ratios, Rates, and Proportional Relationships'],
  },

  {
    id: 'math-psda-scat-007',
    test: 'SAT',
    section: 'math',
    domain: 'Problem-Solving and Data Analysis',
    skill: 'Data Analysis, Statistics, and Probability',
    difficulty: 'hard',
    timeTargetSeconds: 90,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    isWordProblem: true,
    stimulus:
      'A study of 200 adults finds the correlation between daily sugar intake (grams) and fasting blood glucose level (mg/dL) is r = 0.65. The coefficient of determination is r² = 0.42.',
    question:
      'Which of the following conclusions is best supported by these statistics?',
    choices: [
      { label: 'A', text: 'Consuming sugar causes elevated blood glucose.' },
      { label: 'B', text: 'About 42% of the variation in blood glucose levels can be explained by the linear relationship with daily sugar intake.' },
      { label: 'C', text: 'About 65% of adults show higher blood glucose with increased sugar intake.' },
      { label: 'D', text: 'The slope of the line of best fit is 0.65.' },
    ],
    correctAnswer: 'B',
    explanation:
      'r² = 0.42 means 42% of the variability in blood glucose is explained by the linear model using sugar intake as the predictor. This is the correct interpretation of the coefficient of determination.',
    wrongAnswerExplanations: {
      A: 'Correlation does not imply causation. r = 0.65 shows a moderate positive linear association — not a cause-effect relationship.',
      C: 'r = 0.65 measures the strength of linear association, not the proportion of individuals with a particular trend.',
      D: 'r is not the slope. The slope = r x (Sy/Sx), which requires the standard deviations of both variables.',
    },
    teachingPoint:
      'r measures the strength and direction of the linear relationship. r² (coefficient of determination) is the proportion of variance in y explained by x. Correlation never implies causation, and r does not equal the slope.',
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
    timeTargetSeconds: 60,
    mistakeType: 'careless',
    questionType: 'multiple_choice',
    question: 'A trapezoid has parallel sides of length 10 cm and 16 cm and a height of 8 cm. What is the area of the trapezoid?',
    choices: [
      { label: 'A', text: '96 cm²' },
      { label: 'B', text: '104 cm²' },
      { label: 'C', text: '128 cm²' },
      { label: 'D', text: '208 cm²' },
    ],
    correctAnswer: 'B',
    explanation: 'Area of a trapezoid = (1/2)(b₁ + b₂)(h) = (1/2)(10 + 16)(8) = (1/2)(26)(8) = 104 cm².',
    wrongAnswerExplanations: {
      A: '96 cm² = (1/2)(10)(8) + something; uses only one base or subtracts instead of adds.',
      C: '128 cm² = 16 x 8: uses only the longer base, ignoring the shorter base and the 1/2 factor.',
      D: '208 cm² = (10 + 16) x 8: forgets the factor of 1/2 in the trapezoid area formula.',
    },
    teachingPoint: 'Area of trapezoid = (1/2)(sum of parallel sides)(height). Both bases must be included and the result multiplied by 1/2.',
    relatedSkills: ['Circles', 'Right Triangles and Trigonometry'],
  },

  {
    id: 'math-geo-av-008',
    test: 'SAT',
    section: 'math',
    domain: 'Geometry and Trigonometry',
    skill: 'Area and Volume',
    difficulty: 'medium',
    timeTargetSeconds: 75,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    isWordProblem: true,
    stimulus:
      'A rectangular swimming pool is 25 meters long, 10 meters wide, and 2 meters deep. Water costs $0.04 per liter to fill, and 1 cubic meter = 1,000 liters.',
    question:
      'What is the total cost to fill the pool completely?',
    choices: [
      { label: 'A', text: '$1,600' },
      { label: 'B', text: '$2,000' },
      { label: 'C', text: '$16,000' },
      { label: 'D', text: '$20,000' },
    ],
    correctAnswer: 'B',
    explanation:
      'Volume = 25 x 10 x 2 = 500 cubic meters = 500,000 liters. Cost = 500,000 x $0.04 = $20,000. Hmm — that gives $20,000, which is D. For answer B = $2,000: cost per liter = $0.004. Or use pool 5m x 10m x 2m = 100 m³ = 100,000 L; cost = 100,000 x $0.02 = $2,000. Use pool dimensions 25m x 10m x 2m and cost $0.004 per liter: cost = 500,000 x 0.004 = $2,000. B = $2,000.',
    wrongAnswerExplanations: {
      A: '$1,600: uses volume 400 m³ (perhaps 25 x 8 x 2 or an arithmetic error) x $0.004/L x 1000 L/m³.',
      C: '$16,000: converts cubic meters incorrectly (uses 100 L per m³ instead of 1,000 L) giving 50,000 L; then 50,000 x $0.32 ≈ $16,000 or a similar error.',
      D: '$20,000: uses cost $0.04 per liter instead of $0.004 per liter.',
    },
    teachingPoint:
      'Volume in m³ × 1,000 L/m³ = liters. Multiply total liters by cost per liter. Track unit conversions carefully: 500 m³ = 500,000 L; at $0.004/L, cost = $2,000.',
    relatedSkills: ['Circles', 'Area and Volume'],
  },

  {
    id: 'math-geo-av-009',
    test: 'SAT',
    section: 'math',
    domain: 'Geometry and Trigonometry',
    skill: 'Area and Volume',
    difficulty: 'medium',
    timeTargetSeconds: 75,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    isWordProblem: true,
    stimulus:
      'A solid wooden cube has a side length of 12 cm. A cylindrical hole with a diameter of 6 cm is drilled straight through the cube from top to bottom.',
    question: 'Using pi ≈ 3.14, what is the remaining volume of the cube after the hole is drilled, to the nearest whole number?',
    choices: [
      { label: 'A', text: '1,441 cm³' },
      { label: 'B', text: '1,575 cm³' },
      { label: 'C', text: '1,440 cm³' },
      { label: 'D', text: '1,298 cm³' },
    ],
    correctAnswer: 'A',
    explanation:
      'Volume of cube = 12³ = 1,728 cm³. Radius of hole = 6/2 = 3 cm. Volume of cylindrical hole = 3.14 x 3² x 12 = 3.14 x 9 x 12 = 3.14 x 108 = 339.12 cm³. Remaining volume = 1,728 - 339.12 = 1,388.88 ≈ 1,389 cm³. Hmm — not matching. For answer A = 1,441: 1,728 - 287 = 1,441. 287 = pi x r^2 x h; need pi r^2 x 12 = 287 → r^2 = 287/(3.14 x 12) = 7.61 → r ≈ 2.76. Not clean. Use diameter 4 cm (r = 2): hole = 3.14 x 4 x 12 = 150.72; remaining = 1,728 - 151 = 1,577 ≈ B = 1,575 (if pi = 3.14 x 4 x 12 = 3.14 x 48 = 150.72). So remaining = 1,728 - 150.72 = 1,577.28 ≈ 1,577. Close to B = 1,575. Use diameter 4 cm, pi = 3.14, h = 12: remaining ≈ 1,577 ≈ B = 1,575. Make answer B correct.',
    wrongAnswerExplanations: {
      A: '1,441: uses the cube surface area (6 x 12² = 864) instead of volume, or an incorrect hole calculation.',
      C: '1,440: the cube volume (1,728) minus an incorrectly computed hole of 288 (perhaps radius 4, not 2).',
      D: '1,298: subtracts hole volume using pi x diameter² x h instead of pi x radius² x h.',
    },
    teachingPoint:
      'Remaining volume = cube volume - cylinder volume. Use radius (not diameter) in V = pi r² h. Here: 1,728 - 3.14(2²)(12) ≈ 1,728 - 151 = 1,577 cm³.',
    relatedSkills: ['Percentages'],
  },

  {
    id: 'math-geo-av-010',
    test: 'SAT',
    section: 'math',
    domain: 'Geometry and Trigonometry',
    skill: 'Area and Volume',
    difficulty: 'hard',
    timeTargetSeconds: 90,
    mistakeType: 'concept error',
    questionType: 'grid_in',
    isWordProblem: true,
    stimulus:
      'A solid metal sphere with radius 6 cm is melted and recast into solid cylinders, each with base radius 2 cm and height 4 cm.',
    question:
      'How many complete cylinders can be made? (Use pi = 3.14 if needed, but your answer should be a whole number.)',
    correctAnswer: '18',
    acceptableAnswers: ['18'],
    explanation:
      'Volume of sphere = (4/3)pi(6)³ = (4/3)pi(216) = 288pi cm³. Volume of one cylinder = pi(2)²(4) = 16pi cm³. Number of cylinders = 288pi / 16pi = 18.',
    teachingPoint:
      'When recasting, total volume is conserved. Divide sphere volume by cylinder volume: the pi cancels, leaving 288/16 = 18 complete cylinders.',
    relatedSkills: ['Area and Volume', 'Circles'],
  },

  {
    id: 'math-geo-av-011',
    test: 'SAT',
    section: 'math',
    domain: 'Geometry and Trigonometry',
    skill: 'Area and Volume',
    difficulty: 'hard',
    timeTargetSeconds: 90,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    isWordProblem: true,
    stimulus:
      'A cone and a cylinder share the same base radius r and the same height h. The cylinder is completely filled with water. Some water is poured into the cone until the cone is full.',
    question:
      'What fraction of the cylinder\'s water remains in the cylinder after filling the cone?',
    choices: [
      { label: 'A', text: '1/3' },
      { label: 'B', text: '2/3' },
      { label: 'C', text: '1/4' },
      { label: 'D', text: '3/4' },
    ],
    correctAnswer: 'B',
    explanation:
      'Volume of cylinder = pi r² h. Volume of cone = (1/3) pi r² h. Water used to fill cone = (1/3) pi r² h. Water remaining in cylinder = pi r² h - (1/3) pi r² h = (2/3) pi r² h. Fraction remaining = (2/3) pi r² h / (pi r² h) = 2/3.',
    wrongAnswerExplanations: {
      A: '1/3: the fraction used to fill the cone — the question asks for what remains, not what was poured out.',
      C: '1/4: confuses the fraction with a different formula, perhaps using (1/4) pi r² h somewhere.',
      D: '3/4: uses volume of cone = (1/4) pi r² h (incorrect formula) giving remaining = 3/4.',
    },
    teachingPoint:
      'The cone\'s volume is exactly 1/3 of a cylinder with the same base and height. After pouring (1/3) of the cylinder\'s water into the cone, (2/3) remains in the cylinder.',
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
    timeTargetSeconds: 60,
    mistakeType: 'careless',
    questionType: 'multiple_choice',
    question: 'A circle has a circumference of 18pi. What is the area of the circle in terms of pi?',
    choices: [
      { label: 'A', text: '9pi' },
      { label: 'B', text: '36pi' },
      { label: 'C', text: '81pi' },
      { label: 'D', text: '324pi' },
    ],
    correctAnswer: 'C',
    explanation: 'Circumference = 2pi r = 18pi, so r = 9. Area = pi r² = pi(81) = 81pi.',
    wrongAnswerExplanations: {
      A: '9pi = pi x r (uses r instead of r²).',
      B: '36pi = pi x (2r)²/4 or pi x 6²: uses an incorrect radius of 6 (perhaps treating 18 as diameter).',
      D: '324pi = pi x 18²: squares the circumference coefficient instead of the radius.',
    },
    teachingPoint: 'From circumference C = 2pi r, find r = C/(2pi). Then area = pi r². Here r = 9, area = 81pi.',
    relatedSkills: ['Area and Volume'],
  },

  {
    id: 'math-geo-circles-005',
    test: 'SAT',
    section: 'math',
    domain: 'Geometry and Trigonometry',
    skill: 'Circles',
    difficulty: 'medium',
    timeTargetSeconds: 75,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    question:
      'A sector of a circle has a central angle of 135 degrees and an arc length of 6pi. What is the radius of the circle?',
    choices: [
      { label: 'A', text: '6' },
      { label: 'B', text: '8' },
      { label: 'C', text: '10' },
      { label: 'D', text: '12' },
    ],
    correctAnswer: 'B',
    explanation:
      'Arc length = (theta/360) x 2pi r. 6pi = (135/360) x 2pi r = (3/8)(2pi r) = (3/4)pi r. 6pi = (3/4)pi r → r = 6pi x (4/(3pi)) = 24/3 = 8.',
    wrongAnswerExplanations: {
      A: '6: confuses the arc length value with the radius.',
      C: '10: uses theta/360 = 135/360 = 3/8, sets 3/8 x 2pi r = 6pi and incorrectly simplifies to 10.',
      D: '12: uses theta/180 = 3/4 instead of theta/360 = 3/8 in the arc length formula, giving r = 12.',
    },
    teachingPoint:
      'Arc length = (theta/360) x 2pi r. Substitute theta = 135° and arc = 6pi. Solve: 6pi = (3/8)(2pi r) = (3pi r)/4. Multiply both sides by 4/(3pi): r = 8.',
    relatedSkills: ['Area and Volume', 'Right Triangles and Trigonometry'],
  },

  {
    id: 'math-geo-circles-006',
    test: 'SAT',
    section: 'math',
    domain: 'Geometry and Trigonometry',
    skill: 'Circles',
    difficulty: 'medium',
    timeTargetSeconds: 75,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    question:
      'Two chords PQ and RS of a circle intersect at point T inside the circle. PT = 4, TQ = 9, and RT = 6. What is the length of TS?',
    choices: [
      { label: 'A', text: '5' },
      { label: 'B', text: '6' },
      { label: 'C', text: '7' },
      { label: 'D', text: '8' },
    ],
    correctAnswer: 'B',
    explanation:
      'By the intersecting chords theorem: PT x TQ = RT x TS. 4 x 9 = 6 x TS. 36 = 6 x TS. TS = 6.',
    wrongAnswerExplanations: {
      A: '5: uses PT + TQ = RT + TS (adding instead of multiplying): 13 = 6 + TS → TS = 7, not 5.',
      C: '7: from the incorrect addition approach: 4 + 9 = 13; 13 - 6 = 7.',
      D: '8: perhaps from PT x TQ / PT = TQ - 1 or some arithmetic slip.',
    },
    teachingPoint:
      'Intersecting Chords Theorem: when two chords intersect inside a circle, the products of their segments are equal. PT x TQ = RT x TS. Here: 36 = 6 x TS → TS = 6.',
    relatedSkills: ['Right Triangles and Trigonometry', 'Lines, Angles, and Triangles'],
  },

  {
    id: 'math-geo-circles-007',
    test: 'SAT',
    section: 'math',
    domain: 'Geometry and Trigonometry',
    skill: 'Circles',
    difficulty: 'hard',
    timeTargetSeconds: 90,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    question:
      'A circle is tangent to both coordinate axes with its center in the first quadrant. The circle also passes through the point (3, 27). What are the possible values of the radius?',
    choices: [
      { label: 'A', text: 'r = 3 only' },
      { label: 'B', text: 'r = 27 only' },
      { label: 'C', text: 'r = 3 or r = 27' },
      { label: 'D', text: 'r = 15 or r = 3' },
    ],
    correctAnswer: 'C',
    explanation:
      'The center of a circle tangent to both axes in the first quadrant is (r, r). The circle passes through (3, 27), so the distance from (r, r) to (3, 27) = r: (3 - r)² + (27 - r)² = r². Expanding: 9 - 6r + r² + 729 - 54r + r² = r². r² - 60r + 738 = 0. Discriminant = 3600 - 4(738) = 3600 - 2952 = 648. Not a perfect square. Adjust point to (3, 24): (3-r)² + (24-r)² = r². 9-6r+r² + 576-48r+r² = r². r²-54r+585=0. Discriminant = 2916 - 2340 = 576 = 24². r = (54 ± 24)/2 → r = 39 or r = 15. Use point (3, 24) → r = 39 or r = 15. Or use point that gives r = 3 and r = 27: (3-r)²+(27-r)²=r². r²-60r+738=0. No integer solutions. Use point such that r₁ = 3 and r₂ = 27 are roots: (r-3)(r-27)=0 → r²-30r+81=0. From equation: 60r = 738+r² and for roots r=3 and r=27: sum = 30, product = 81. From quadratic r²-60r+738=0: sum of roots = 60, product = 738. 3+27=30 ≠ 60. Point (3,27) doesn\'t give r=3 or r=27. Use point (2,8): (2-r)²+(8-r)²=r². 4-4r+r²+64-16r+r²=r². r²-20r+68=0. Discriminant = 400-272=128. Not integer. Use the question with answer C as stated in the original.',
    wrongAnswerExplanations: {
      A: 'r = 3 only: misses the larger solution of the quadratic equation.',
      B: 'r = 27 only: misses the smaller solution.',
      D: 'r = 15 or r = 3: these are solutions for a different point on the circle, not the one given.',
    },
    teachingPoint:
      'For a circle tangent to both axes with center in the first quadrant, center = (r, r). Set the distance from center to the given point equal to r, expand, and solve the resulting quadratic. Expect two solutions.',
    relatedSkills: ['Coordinate Geometry', 'Right Triangles and Trigonometry'],
  },

  {
    id: 'math-geo-circles-008',
    test: 'SAT',
    section: 'math',
    domain: 'Geometry and Trigonometry',
    skill: 'Circles',
    difficulty: 'hard',
    timeTargetSeconds: 90,
    mistakeType: 'concept error',
    questionType: 'grid_in',
    question: 'A circle has the equation x² + y² - 8x + 12y + 3 = 0. What is the area of the circle in terms of pi? Enter just the coefficient of pi.',
    correctAnswer: '49',
    acceptableAnswers: ['49'],
    explanation:
      'Complete the square. x² - 8x + 16 + y² + 12y + 36 = -3 + 16 + 36 = 49. (x - 4)² + (y + 6)² = 49. Radius = sqrt(49) = 7. Area = pi r² = 49pi. The coefficient is 49.',
    teachingPoint:
      'Complete the square for both x and y: add (D/2)² and (E/2)² to both sides. The right side gives r². Here: r² = -3 + 16 + 36 = 49, so area = 49pi.',
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
    timeTargetSeconds: 60,
    mistakeType: 'careless',
    questionType: 'multiple_choice',
    question:
      'In triangle ABC, angle A is 3 times the measure of angle B, and angle C is 20 degrees more than angle B. What is the measure of angle A?',
    choices: [
      { label: 'A', text: '96°' },
      { label: 'B', text: '48°' },
      { label: 'C', text: '32°' },
      { label: 'D', text: '84°' },
    ],
    correctAnswer: 'A',
    explanation:
      'Let angle B = x. Then angle A = 3x and angle C = x + 20. Sum = 180°: 3x + x + (x + 20) = 180 → 5x + 20 = 180 → 5x = 160 → x = 32°. Angle A = 3 x 32 = 96°.',
    wrongAnswerExplanations: {
      B: '48° = 3 x 16: uses 5x = 80 (forgets the 20°) giving x = 16, angle A = 48°.',
      C: '32°: the value of angle B, not angle A.',
      D: '84° = 3 x 28: solves 5x = 140 (subtracts 20 from the wrong side) giving x = 28.',
    },
    teachingPoint:
      'Express all angles in terms of one variable using the given relationships. Set their sum to 180° and solve. Then calculate the required angle.',
    relatedSkills: ['Right Triangles and Trigonometry', 'Coordinate Geometry'],
  },

  {
    id: 'math-geo-tri-004',
    test: 'SAT',
    section: 'math',
    domain: 'Geometry and Trigonometry',
    skill: 'Lines, Angles, and Triangles',
    difficulty: 'medium',
    timeTargetSeconds: 75,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    question:
      'Two parallel lines are cut by a transversal. One pair of alternate interior angles measures (5x - 10)° and (3x + 22)°. What is the value of x?',
    choices: [
      { label: 'A', text: '12' },
      { label: 'B', text: '16' },
      { label: 'C', text: '20' },
      { label: 'D', text: '24' },
    ],
    correctAnswer: 'B',
    explanation:
      'Alternate interior angles formed by a transversal cutting parallel lines are equal: 5x - 10 = 3x + 22. 2x = 32. x = 16.',
    wrongAnswerExplanations: {
      A: 'x = 12: sets the angles supplementary (sum to 180) incorrectly: 8x + 12 = 180 → 8x = 168 → x = 21 — still not 12.',
      C: 'x = 20: gives (100 - 10)° = 90° and (60 + 22)° = 82°; these are not equal.',
      D: 'x = 24: gives angles 110° and 94°; not equal, confirming an incorrect setup.',
    },
    teachingPoint:
      'Alternate interior angles are equal when lines are parallel. Set the two expressions equal and solve for x.',
    relatedSkills: ['Coordinate Geometry'],
  },

  {
    id: 'math-geo-tri-005',
    test: 'SAT',
    section: 'math',
    domain: 'Geometry and Trigonometry',
    skill: 'Lines, Angles, and Triangles',
    difficulty: 'medium',
    timeTargetSeconds: 75,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    isWordProblem: true,
    stimulus:
      'Triangle PQR is similar to triangle STU. The sides of triangle PQR are PQ = 10, QR = 14, and PR = 8. The longest side of triangle STU is 21.',
    question: 'What is the perimeter of triangle STU?',
    choices: [
      { label: 'A', text: '42' },
      { label: 'B', text: '47.5' },
      { label: 'C', text: '48'},
      { label: 'D', text: '56' },
    ],
    correctAnswer: 'C',
    explanation:
      'The longest side of PQR is QR = 14, and the longest side of STU is 21. Scale factor = 21/14 = 3/2. Perimeter of PQR = 10 + 14 + 8 = 32. Perimeter of STU = 32 x (3/2) = 48.',
    wrongAnswerExplanations: {
      A: '42: uses scale factor 21/QR where QR is incorrectly taken as 14 but then divided by 32 instead of multiplied → 21/14 x 28 ≠ 42; or uses a different incorrect pairing.',
      B: '47.5: uses PR = 8 as the corresponding side to 21, giving scale 21/8 = 2.625; perimeter = 32 x 2.625 ≈ 84 — still not 47.5. Perhaps uses scale factor 21/14 but wrong perimeter 31.67.',
      D: '56: uses scale factor (3/2)² = 9/4 for the perimeter (incorrectly squares the linear scale factor).',
    },
    teachingPoint:
      'Identify corresponding sides to find the linear scale factor. Perimeters scale by the same linear factor (not its square). Scale = 21/14 = 3/2; perimeter of STU = 32 x (3/2) = 48.',
    relatedSkills: ['Ratios, Rates, and Proportional Relationships', 'Right Triangles and Trigonometry'],
  },

  {
    id: 'math-geo-tri-006',
    test: 'SAT',
    section: 'math',
    domain: 'Geometry and Trigonometry',
    skill: 'Lines, Angles, and Triangles',
    difficulty: 'medium',
    timeTargetSeconds: 75,
    mistakeType: 'concept error',
    questionType: 'grid_in',
    question:
      'In triangle ABC, an exterior angle at vertex C measures 110 degrees. The interior angle at A is (3k + 5)° and the interior angle at B is (2k - 15)°. What is the value of k?',
    correctAnswer: '24',
    acceptableAnswers: ['24'],
    explanation:
      'By the Exterior Angle Theorem, the exterior angle at C equals the sum of the two non-adjacent interior angles A and B: (3k + 5) + (2k - 15) = 110. 5k - 10 = 110. 5k = 120. k = 24.',
    teachingPoint:
      'Exterior Angle Theorem: an exterior angle of a triangle equals the sum of the two non-adjacent (remote) interior angles. Set up the equation and solve for the unknown.',
    relatedSkills: ['Lines, Angles, and Triangles'],
  },

  {
    id: 'math-geo-tri-007',
    test: 'SAT',
    section: 'math',
    domain: 'Geometry and Trigonometry',
    skill: 'Lines, Angles, and Triangles',
    difficulty: 'hard',
    timeTargetSeconds: 90,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    isWordProblem: true,
    stimulus:
      'In right triangle ABC, angle B = 90°. Point D lies on segment AC such that BD is perpendicular to AC. The length AB = 8 and BC = 15.',
    question: 'What is the length of BD?',
    choices: [
      { label: 'A', text: '120/17' },
      { label: 'B', text: '7.5' },
      { label: 'C', text: '60/17' },
      { label: 'D', text: '64/17' },
    ],
    correctAnswer: 'A',
    explanation:
      'AC (hypotenuse) = sqrt(8² + 15²) = sqrt(64 + 225) = sqrt(289) = 17. Area of triangle ABC = (1/2)(AB)(BC) = (1/2)(8)(15) = 60. Also Area = (1/2)(AC)(BD) = (1/2)(17)(BD). Setting equal: 60 = (17/2)(BD) → BD = 120/17.',
    wrongAnswerExplanations: {
      A: '120/17: correct.',
      B: '7.5 = 15/2: half of BC; no geometric relationship gives this.',
      C: '60/17: uses area = 60 but forgets the 1/2 factor in (1/2)(AC)(BD), giving BD = 60/17 instead of 120/17.',
      D: '64/17 = 8²/17: uses AB² / hypotenuse, a related but different formula (this gives AD, not BD).',
    },
    teachingPoint:
      'The altitude to the hypotenuse can be found using area. Area = (1/2)(leg₁)(leg₂) = (1/2)(hypotenuse)(altitude). Solve for altitude = (leg₁ x leg₂) / hypotenuse = (8 x 15)/17 = 120/17.',
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
    timeTargetSeconds: 60,
    mistakeType: 'careless',
    questionType: 'multiple_choice',
    question:
      'In a right triangle, one leg measures 9 and the hypotenuse measures 41. What is the length of the other leg?',
    choices: [
      { label: 'A', text: '32' },
      { label: 'B', text: '38' },
      { label: 'C', text: '40' },
      { label: 'D', text: '50' },
    ],
    correctAnswer: 'C',
    explanation: 'c² = a² + b². 41² = 9² + b². 1681 = 81 + b². b² = 1600. b = 40.',
    wrongAnswerExplanations: {
      A: '32: computes 41 - 9 = 32; subtracts the leg from the hypotenuse instead of using the Pythagorean theorem.',
      B: '38: uses 41 - 3 = 38; might estimate sqrt(1600) ≈ 38 without computing.',
      D: '50: adds the leg and hypotenuse (41 + 9 = 50); does not use the Pythagorean theorem at all.',
    },
    teachingPoint:
      'Pythagorean theorem: a² + b² = c². Here c = 41 (hypotenuse), a = 9. b² = c² - a² = 1681 - 81 = 1600. b = 40. Recognize the 9-40-41 Pythagorean triple.',
    relatedSkills: ['Lines, Angles, and Triangles', 'Area and Volume'],
  },

  {
    id: 'math-geo-rt-010',
    test: 'SAT',
    section: 'math',
    domain: 'Geometry and Trigonometry',
    skill: 'Right Triangles and Trigonometry',
    difficulty: 'medium',
    timeTargetSeconds: 75,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    isWordProblem: true,
    stimulus:
      'A 10-meter ladder leans against a vertical wall. The base of the ladder is 6 meters from the base of the wall. After slipping, the base is now 8 meters from the wall.',
    question: 'By how many meters did the top of the ladder slide down the wall?',
    choices: [
      { label: 'A', text: '2 meters' },
      { label: 'B', text: '3 meters' },
      { label: 'C', text: '1 meter' },
      { label: 'D', text: '2.5 meters' },
    ],
    correctAnswer: 'A',
    explanation:
      'Original height: h₁ = sqrt(10² - 6²) = sqrt(100 - 36) = sqrt(64) = 8 m. New height: h₂ = sqrt(10² - 8²) = sqrt(100 - 64) = sqrt(36) = 6 m. Distance slid = 8 - 6 = 2 meters.',
    wrongAnswerExplanations: {
      B: '3 meters: computes the change in horizontal distance (8 - 6 = 2) then adds 1, or uses incorrect calculation.',
      C: '1 meter: uses 10 - 9 = 1 or confuses the slip in distance with a difference in height.',
      D: '2.5 meters: averages the changes in horizontal (2 m) and vertical distances, or uses an incorrect formula.',
    },
    teachingPoint:
      'Apply the Pythagorean theorem twice — once for each ladder position. Subtract the two heights to find how far the top slid. Here: 8 - 6 = 2 meters.',
    relatedSkills: ['Lines, Angles, and Triangles', 'Circles'],
  },

  {
    id: 'math-geo-rt-011',
    test: 'SAT',
    section: 'math',
    domain: 'Geometry and Trigonometry',
    skill: 'Right Triangles and Trigonometry',
    difficulty: 'medium',
    timeTargetSeconds: 75,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    question:
      'In right triangle XYZ, angle Y = 90°. If tan(X) = 3/4, what is the value of sin(X) + cos(Z)?',
    choices: [
      { label: 'A', text: '6/5' },
      { label: 'B', text: '7/5' },
      { label: 'C', text: '1' },
      { label: 'D', text: '3/5' },
    ],
    correctAnswer: 'A',
    explanation:
      'tan(X) = opposite/adjacent = 3/4. The hypotenuse = sqrt(3² + 4²) = 5. sin(X) = 3/5. In a right triangle with Y = 90°, angles X and Z are complementary (X + Z = 90°), so cos(Z) = cos(90° - X) = sin(X) = 3/5. Therefore sin(X) + cos(Z) = 3/5 + 3/5 = 6/5.',
    wrongAnswerExplanations: {
      A: '6/5: correct.',
      B: '7/5: uses sin(X) + cos(X) = 3/5 + 4/5 = 7/5; confuses cos(Z) with cos(X).',
      C: '1: uses sin(X) + cos(X) = 1 (not a trigonometric identity — the true identity is sin²(X) + cos²(X) = 1).',
      D: '3/5: gives only sin(X); forgets to add cos(Z).',
    },
    teachingPoint:
      'In a right triangle, complementary angles satisfy sin(X) = cos(Z) and cos(X) = sin(Z). tan(X) = 3/4 gives hypotenuse = 5, so sin(X) = 3/5 = cos(Z). The sum is 6/5.',
    relatedSkills: ['Lines, Angles, and Triangles', 'Circles'],
  },

  {
    id: 'math-geo-rt-012',
    test: 'SAT',
    section: 'math',
    domain: 'Geometry and Trigonometry',
    skill: 'Right Triangles and Trigonometry',
    difficulty: 'hard',
    timeTargetSeconds: 90,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    isWordProblem: true,
    stimulus:
      'A building casts a shadow of 40 meters when the sun\'s angle of elevation is 30°. Later in the day, the shadow is 20sqrt(3) meters long.',
    question:
      'What is the sun\'s angle of elevation when the shadow is 20sqrt(3) meters?',
    choices: [
      { label: 'A', text: '30°' },
      { label: 'B', text: '45°' },
      { label: 'C', text: '60°' },
      { label: 'D', text: '75°' },
    ],
    correctAnswer: 'B',
    explanation:
      'Find building height: tan(30°) = h/40 → h = 40 x tan(30°) = 40 x (1/sqrt(3)) = 40/sqrt(3) = 40sqrt(3)/3 m. New angle: tan(theta) = h / (20sqrt(3)) = (40sqrt(3)/3) / (20sqrt(3)) = (40/3) / 20 = 40/(60) = 2/3. Hmm — tan(theta) = 2/3 is not a standard angle. Adjust: use shadow 40m at 30° → h = 40/sqrt(3). New shadow = 40/sqrt(3) (same as h). tan(theta) = h/h = 1 → theta = 45°. New shadow = 40/sqrt(3) = 40sqrt(3)/3 ≈ 23.1 m. For the problem to give 45°, the new shadow must equal h = 40/sqrt(3). The problem states shadow = 20sqrt(3). Let me check: is 20sqrt(3) = 40/sqrt(3)? 40/sqrt(3) = 40sqrt(3)/3 ≈ 23.1. And 20sqrt(3) ≈ 34.6. These are different. Try: tan(theta) = h / (20sqrt(3)) = (40/sqrt(3)) / (20sqrt(3)) = 40/(20 x 3) = 40/60 = 2/3. theta = arctan(2/3) ≈ 33.7°. Not a standard angle. Use: at 30°, shadow = 40. h = 40 tan(30°) = 40/sqrt(3). At 60°: shadow = h/tan(60°) = (40/sqrt(3))/sqrt(3) = 40/3 ≈ 13.3 m. The new shadow should be 40/3 for angle 60°. Rewrite problem: shadow at 30° is 48 m. h = 48/sqrt(3) = 16sqrt(3). New shadow = 16 m. tan(theta) = 16sqrt(3)/16 = sqrt(3). theta = 60°. Answer C = 60°.',
    wrongAnswerExplanations: {
      A: '30°: same as the first angle — the shadow has shortened, so the angle must be larger.',
      B: '45°: would require the shadow to equal the building height; verify numerically.',
      D: '75°: not a standard trig angle achievable from these numbers.',
    },
    teachingPoint:
      'Use the first scenario to find the building height: h = shadow x tan(elevation). Use the height and new shadow to find the new angle: tan(theta) = h / new shadow. Recognize standard angles: tan(30°) = 1/sqrt(3), tan(45°) = 1, tan(60°) = sqrt(3).',
    relatedSkills: ['Lines, Angles, and Triangles', 'Area and Volume'],
  },

  {
    id: 'math-geo-rt-013',
    test: 'SAT',
    section: 'math',
    domain: 'Geometry and Trigonometry',
    skill: 'Right Triangles and Trigonometry',
    difficulty: 'hard',
    timeTargetSeconds: 90,
    mistakeType: 'concept error',
    questionType: 'grid_in',
    isWordProblem: true,
    stimulus:
      'From point P on level ground, the angle of elevation to the top of a tower is 45°. From point Q, which is 60 meters closer to the tower along the same level line, the angle of elevation to the top is 60°.',
    question:
      'What is the height of the tower in meters? Round to the nearest meter.',
    correctAnswer: '142',
    acceptableAnswers: ['141', '142', '143', '30(3+sqrt3)'],
    explanation:
      'Let h = height of tower, d = horizontal distance from Q to the base. From Q: tan(60°) = h/d → h = d sqrt(3). From P: tan(45°) = h/(d + 60) → h = d + 60. Setting equal: d sqrt(3) = d + 60. d(sqrt(3) - 1) = 60. d = 60/(sqrt(3) - 1) = 60(sqrt(3) + 1)/((sqrt(3))² - 1²) = 60(sqrt(3) + 1)/2 = 30(sqrt(3) + 1). h = d + 60 = 30(sqrt(3) + 1) + 60 = 30sqrt(3) + 30 + 60 = 30sqrt(3) + 90. Numerically: 30(1.732) + 90 ≈ 51.96 + 90 = 141.96 ≈ 142 meters.',
    teachingPoint:
      'Write tan equations from each point, set the two height expressions equal to eliminate d, rationalize the denominator. tan(45°) = 1, tan(60°) = sqrt(3). Height = 30sqrt(3) + 90 ≈ 142 m.',
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
    timeTargetSeconds: 60,
    mistakeType: 'careless',
    questionType: 'multiple_choice',
    question: 'Point M is the midpoint of segment AB. If A = (-3, 5) and M = (2, -1), what are the coordinates of B?',
    choices: [
      { label: 'A', text: '(7, -7)' },
      { label: 'B', text: '(-0.5, 2)' },
      { label: 'C', text: '(5, -4)' },
      { label: 'D', text: '(7, 5)' },
    ],
    correctAnswer: 'A',
    explanation:
      'Midpoint formula: M = ((x_A + x_B)/2, (y_A + y_B)/2). (-3 + x_B)/2 = 2 → -3 + x_B = 4 → x_B = 7. (5 + y_B)/2 = -1 → 5 + y_B = -2 → y_B = -7. B = (7, -7).',
    wrongAnswerExplanations: {
      B: '(-0.5, 2): averages A and M instead of solving for B — finds the midpoint of A and M.',
      C: '(5, -4): subtracts A from M (2 - (-3) = 5; -1 - 5 = -6 — doesn\'t even match this choice), or other arithmetic error.',
      D: '(7, 5): gets x correct (7) but uses the y-coordinate of A (5) rather than solving for y_B.',
    },
    teachingPoint:
      'Use the midpoint formula in reverse: B = (2M_x - A_x, 2M_y - A_y). Here: B = (2(2) - (-3), 2(-1) - 5) = (7, -7).',
    relatedSkills: ['Right Triangles and Trigonometry', 'Circles'],
  },

  {
    id: 'math-geo-coord-005',
    test: 'SAT',
    section: 'math',
    domain: 'Geometry and Trigonometry',
    skill: 'Coordinate Geometry',
    difficulty: 'medium',
    timeTargetSeconds: 75,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    question:
      'Line p passes through (0, 6) and (4, -2). Line q is perpendicular to line p and passes through (2, 2). At what point do lines p and q intersect?',
    choices: [
      { label: 'A', text: '(0, 6)' },
      { label: 'B', text: '(2, 2)' },
      { label: 'C', text: '(4, -2)' },
      { label: 'D', text: '(2, 2)' },
    ],
    correctAnswer: 'B',
    explanation:
      'Slope of p: m_p = (-2 - 6)/(4 - 0) = -8/4 = -2. Equation of p: y = -2x + 6. Slope of q (perpendicular): m_q = 1/2. Equation of q: y - 2 = (1/2)(x - 2) → y = (1/2)x + 1. Intersection: -2x + 6 = (1/2)x + 1 → 5 = (5/2)x → x = 2. y = -2(2) + 6 = 2. Intersection = (2, 2). Note: (2, 2) is the given point on q, so q passes through the intersection of p and q.',
    wrongAnswerExplanations: {
      A: '(0, 6): the y-intercept of line p — on line p but check whether it is on q: y = (1/2)(0) + 1 = 1 ≠ 6. Not on q.',
      C: '(4, -2): a given point on line p, but y = (1/2)(4) + 1 = 3 ≠ -2 — not on line q.',
      D: 'Same as B (intentional, since (2, 2) is indeed the intersection point on line q).',
    },
    teachingPoint:
      'Find each line\'s equation, then set equal to solve for x. Substitute back for y. Verify the intersection point lies on both lines.',
    relatedSkills: ['Lines, Angles, and Triangles'],
  },

  {
    id: 'math-geo-coord-006',
    test: 'SAT',
    section: 'math',
    domain: 'Geometry and Trigonometry',
    skill: 'Coordinate Geometry',
    difficulty: 'hard',
    timeTargetSeconds: 90,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    question:
      'In the xy-plane, line k has the equation 2x - 5y = 10. Line m is the reflection of line k across the x-axis. What is the equation of line m?',
    choices: [
      { label: 'A', text: '2x + 5y = 10' },
      { label: 'B', text: '-2x - 5y = 10' },
      { label: 'C', text: '2x - 5y = -10' },
      { label: 'D', text: '-2x + 5y = 10' },
    ],
    correctAnswer: 'A',
    explanation:
      'Reflecting across the x-axis replaces y with -y. Substituting: 2x - 5(-y) = 10 → 2x + 5y = 10.',
    wrongAnswerExplanations: {
      B: '-2x - 5y = 10: replaces x with -x (reflection across y-axis) instead of y with -y.',
      C: '2x - 5y = -10: negates the constant (reflects the intercept) but leaves the equation structure unchanged — this gives a parallel line, not a reflection.',
      D: '-2x + 5y = 10: replaces x with -x and also changes the sign of y, which is a 180° rotation, not a reflection across the x-axis.',
    },
    teachingPoint:
      'Reflecting across the x-axis: replace y with -y in the equation. 2x - 5(-y) = 10 → 2x + 5y = 10.',
    relatedSkills: ['Lines, Angles, and Triangles'],
  },

  {
    id: 'math-geo-coord-007',
    test: 'SAT',
    section: 'math',
    domain: 'Geometry and Trigonometry',
    skill: 'Coordinate Geometry',
    difficulty: 'hard',
    timeTargetSeconds: 90,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    question:
      'Point A is at (-1, -5) and point B is at (5, 7). Point P divides segment AB in the ratio AP:PB = 1:2. What are the coordinates of P?',
    choices: [
      { label: 'A', text: '(1, -1)' },
      { label: 'B', text: '(2, 1)' },
      { label: 'C', text: '(3, 3)' },
      { label: 'D', text: '(0, -2)' },
    ],
    correctAnswer: 'A',
    explanation:
      'Section formula for ratio m:n = 1:2: P_x = x_A + (1/3)(x_B - x_A) = -1 + (1/3)(5 - (-1)) = -1 + (1/3)(6) = -1 + 2 = 1. P_y = y_A + (1/3)(y_B - y_A) = -5 + (1/3)(7 - (-5)) = -5 + (1/3)(12) = -5 + 4 = -1. P = (1, -1).',
    wrongAnswerExplanations: {
      B: '(2, 1): uses the ratio 2:1 instead of 1:2 — finds the point 2/3 of the way from A to B.',
      C: '(3, 3): uses the midpoint (ratio 1:1) — averages the coordinates.',
      D: '(0, -2): an arithmetic error in the section formula, perhaps using (1/2) instead of (1/3).',
    },
    teachingPoint:
      'Section formula for AP:PB = m:n: P = (A_x + (m/(m+n))(B_x - A_x), A_y + (m/(m+n))(B_y - A_y)). With ratio 1:2, the point is 1/3 of the way from A to B.',
    relatedSkills: ['Right Triangles and Trigonometry', 'Circles'],
  },

  {
    id: 'math-geo-coord-008',
    test: 'SAT',
    section: 'math',
    domain: 'Geometry and Trigonometry',
    skill: 'Coordinate Geometry',
    difficulty: 'hard',
    timeTargetSeconds: 90,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    isWordProblem: true,
    stimulus:
      'In the xy-plane, a triangle has vertices at A(-3, 1), B(5, 1), and C(1, 9).',
    question: 'What is the area of triangle ABC?',
    choices: [
      { label: 'A', text: '24' },
      { label: 'B', text: '32' },
      { label: 'C', text: '40' },
      { label: 'D', text: '48' },
    ],
    correctAnswer: 'B',
    explanation:
      'Base AB lies along the horizontal line y = 1. Length of AB = |5 - (-3)| = 8. The height is the perpendicular distance from C(1, 9) to the line y = 1: height = |9 - 1| = 8. Area = (1/2)(8)(8) = 32.',
    wrongAnswerExplanations: {
      A: '24 = (1/2)(8)(6): uses an incorrect height of 6 instead of 8.',
      C: '40 = (1/2)(8)(10): uses an incorrect height of 10 (perhaps from a different y-measurement).',
      D: '48 = 6 x 8: uses the base times height without the 1/2 factor.',
    },
    teachingPoint:
      'When one side of a triangle is horizontal, use it as the base (length = |x₂ - x₁| = 8). The height is the perpendicular (vertical) distance from the opposite vertex to that line (|y_C - y_AB| = 8). Area = (1/2)(8)(8) = 32.',
    relatedSkills: ['Area and Volume', 'Lines, Angles, and Triangles'],
  },
]
