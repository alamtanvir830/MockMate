import type { MathAcademySkill } from './types'

export const psdaSkills: MathAcademySkill[] = [
  // ─────────────────────────────────────────────────────────────────────────────
  // 1. Ratios, Rates & Units
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: 'ratios-rates-units',
    title: 'Ratios, Rates & Units',
    domain: 'problem-solving-data-analysis',
    overview: {
      whatItTests:
        'The ability to set up and solve proportions, convert units using dimensional analysis, and work with rates of change expressed in real-world contexts such as speed, density, and price per unit.',
      howItAppears:
        'Questions describe a situation with a constant ratio or rate — such as a recipe, a map scale, a speed, or a price — and ask you to scale up or down, convert units, or find a missing quantity. Some questions embed a table of values for a proportional relationship.',
      whyStudentsMissIt:
        'Students mix up the numerator and denominator when setting up a proportion, forget to convert units before computing, or compute a rate in the wrong direction (miles per hour vs. hours per mile).',
      whatToLookFor:
        'Keywords like "per," "for every," "at the same rate," and "proportional to" signal a ratio or rate relationship. Unit labels in the answer choices are a clue to check whether unit conversion is needed.',
    },
    strategy: {
      steps: [
        'Identify the known rate or ratio and write it as a fraction with clear unit labels in numerator and denominator.',
        'Set up a proportion: (known ratio) = (unknown ratio), keeping matching units in matching positions.',
        'If unit conversion is needed, multiply by a conversion factor written as a fraction equal to 1 (e.g., 1 km / 0.621 mi) so unwanted units cancel.',
        'Cross-multiply or cancel units to solve for the unknown.',
        'Check that your answer has the correct units and is a reasonable magnitude.',
      ],
      timeSavingTip:
        'Write units on every number as you work. If units in your final answer do not match the question, you have a setup error — catch it before choosing an answer.',
      whenNotToOverthink:
        'If the rate is already in the exact units the question asks for and no conversion is needed, simply multiply the rate by the given quantity.',
    },
    commonTraps: [
      {
        title: 'Flipping the ratio',
        description:
          'Setting up 3 miles / 1 hour when the question requires 1 hour / 3 miles (or vice versa) leads to an answer that is the reciprocal of the correct answer.',
        avoidance:
          'Label every number with its units before cross-multiplying; confirm that the same unit appears in the numerator on both sides of the proportion.',
      },
      {
        title: 'Skipping unit conversion',
        description:
          'A question gives a speed in km/h and asks for distance in meters — computing with km and reporting the answer as meters without converting produces a value that is off by a factor of 1000.',
        avoidance:
          'Before calculating, check whether all units in the problem are consistent. If not, convert first.',
      },
      {
        title: 'Part-to-part vs. part-to-whole confusion',
        description:
          'A ratio of 2 : 3 means 2 parts to 3 parts (total 5 parts). Students sometimes treat 2/3 as 2 out of 3, ignoring that the whole is 5.',
        avoidance:
          'Determine whether the ratio is part-to-part or part-to-whole, and adjust the denominator accordingly before scaling.',
      },
      {
        title: 'Rate of change in the wrong direction',
        description:
          'A problem gives a "filling rate" of 4 gallons per minute, but the question asks how many minutes per gallon — students use 4 instead of 1/4.',
        avoidance:
          'Re-read whether the question asks for quantity-per-time or time-per-quantity, and take the reciprocal if needed.',
      },
    ],
    guidedExamples: [
      {
        id: 'ratios-rates-units-ex-1',
        stimulus:
          'A car travels 156 miles in 3 hours at a constant speed.',
        question: 'At the same speed, how many miles will the car travel in 5 hours?',
        steps: [
          {
            instruction: 'Find the unit rate (miles per hour)',
            content: '156 miles ÷ 3 hours = 52 miles per hour',
          },
          {
            instruction: 'Multiply by the new time',
            content: '52 miles/hour × 5 hours = 260 miles',
          },
          {
            instruction: 'Verify with a proportion',
            content: '156/3 = x/5 → 3x = 780 → x = 260 ✓',
          },
        ],
        choices: [
          { label: 'A', text: '240 miles' },
          { label: 'B', text: '260 miles' },
          { label: 'C', text: '270 miles' },
          { label: 'D', text: '312 miles' },
        ],
        correctAnswer: 'B',
        explanation:
          'Unit rate = 156 ÷ 3 = 52 mph. Distance in 5 hours = 52 × 5 = 260 miles.',
        wrongAnswerExplanations: {
          A: 'This comes from using 48 mph (perhaps computing 156 − 12 = 144 ÷ 3 = 48, an arithmetic error) and multiplying by 5.',
          D: 'This comes from multiplying the original 156 miles by 2 (doubling) rather than scaling by the ratio 5/3.',
        },
      },
      {
        id: 'ratios-rates-units-ex-2',
        stimulus:
          'A recipe for 4 servings calls for 6 cups of flour and 2 cups of sugar.',
        question: 'How many cups of sugar are needed to make 10 servings of the same recipe?',
        steps: [
          {
            instruction: 'Find the sugar-per-serving rate',
            content: '2 cups ÷ 4 servings = 0.5 cups per serving',
          },
          {
            instruction: 'Scale to 10 servings',
            content: '0.5 cups/serving × 10 servings = 5 cups',
          },
          {
            instruction: 'Confirm with a proportion',
            content: '2/4 = x/10 → 4x = 20 → x = 5 ✓',
          },
        ],
        choices: [
          { label: 'A', text: '3 cups' },
          { label: 'B', text: '4 cups' },
          { label: 'C', text: '5 cups' },
          { label: 'D', text: '6 cups' },
        ],
        correctAnswer: 'C',
        explanation:
          'The ratio of sugar to servings is 2 : 4 = 1 : 2. For 10 servings: 10 × (1/2) = 5 cups.',
        wrongAnswerExplanations: {
          B: 'This comes from adding 2 to the original 2 cups for every additional 4 servings — not the correct proportional scaling.',
          D: 'This copies the amount of flour (6 cups) rather than scaling the sugar amount.',
        },
      },
      {
        id: 'ratios-rates-units-ex-3',
        stimulus:
          'A factory produces 840 units of a product in 7 hours. The factory operates at the same constant rate.',
        question: 'How many hours will it take the factory to produce 1,200 units?',
        steps: [
          {
            instruction: 'Find the production rate',
            content: '840 units ÷ 7 hours = 120 units per hour',
          },
          {
            instruction: 'Set up an equation for the unknown time',
            content: '120 units/hour × t hours = 1,200 units → t = 1,200 ÷ 120 = 10',
          },
          {
            instruction: 'Verify',
            content: '120 × 10 = 1,200 ✓',
          },
        ],
        choices: [
          { label: 'A', text: '8 hours' },
          { label: 'B', text: '9 hours' },
          { label: 'C', text: '10 hours' },
          { label: 'D', text: '12 hours' },
        ],
        correctAnswer: 'C',
        explanation:
          'Rate = 840/7 = 120 units/hour. Time = 1200/120 = 10 hours.',
        wrongAnswerExplanations: {
          A: 'This comes from computing 840 × (8/7) ≈ 960, not 1200 — using 8 hours and checking units produced rather than finding the unknown.',
          D: 'This may come from dividing 1200 by 100 (an incorrect rate), or from multiplying the original 7 hours by a rough factor of 1200/700 ≈ 1.7 and rounding to 12.',
        },
      },
    ],
    drillQuestions: [
      {
        id: 'ratios-rates-units-d1',
        skillSlug: 'ratios-rates-units',
        difficulty: 'easy',
        stimulus: 'A printer prints 90 pages in 6 minutes.',
        question: 'At the same rate, how many pages will it print in 10 minutes?',
        choices: [
          { label: 'A', text: '120 pages' },
          { label: 'B', text: '140 pages' },
          { label: 'C', text: '150 pages' },
          { label: 'D', text: '180 pages' },
        ],
        correctAnswer: 'C',
        explanation:
          'Rate = 90/6 = 15 pages per minute. In 10 minutes: 15 × 10 = 150 pages.',
        wrongAnswerExplanations: {
          A: 'This comes from computing 90 + 6 × (10 − 6) = 90 + 24 = 114, rounding to 120 — adding rather than multiplying the rate.',
          D: 'This doubles the original 90 pages, which would only be correct for 12 minutes, not 10.',
        },
        teachingPoint: 'Find the unit rate first, then multiply by the new quantity — this works for any proportional relationship.',
      },
      {
        id: 'ratios-rates-units-d2',
        skillSlug: 'ratios-rates-units',
        difficulty: 'easy',
        stimulus:
          'A garden center sells 3 potted plants for $15.',
        question: 'At this price, how much do 8 potted plants cost?',
        choices: [
          { label: 'A', text: '$30' },
          { label: 'B', text: '$35' },
          { label: 'C', text: '$40' },
          { label: 'D', text: '$45' },
        ],
        correctAnswer: 'C',
        explanation:
          'Unit price = $15 ÷ 3 = $5 per plant. Cost of 8 plants = 8 × $5 = $40.',
        wrongAnswerExplanations: {
          B: 'This comes from computing 15 + (8 − 3) × (15/5) = 15 + 15 = 30, then making an arithmetic error, or from a proportion setup error.',
          D: 'This comes from computing 15 × 3 = 45, multiplying by the original count instead of scaling to 8.',
        },
        teachingPoint: 'Convert to a per-unit price first; then multiplying by any quantity is straightforward.',
      },
      {
        id: 'ratios-rates-units-d3',
        skillSlug: 'ratios-rates-units',
        difficulty: 'medium',
        stimulus:
          'A car uses 2.5 gallons of fuel to travel 62.5 miles.',
        question: 'At this fuel efficiency, how many miles can the car travel on a full tank of 14 gallons?',
        choices: [
          { label: 'A', text: '280 miles' },
          { label: 'B', text: '300 miles' },
          { label: 'C', text: '325 miles' },
          { label: 'D', text: '350 miles' },
        ],
        correctAnswer: 'D',
        explanation:
          'Fuel efficiency = 62.5 ÷ 2.5 = 25 miles per gallon. Distance on 14 gallons = 25 × 14 = 350 miles.',
        wrongAnswerExplanations: {
          C: 'This comes from computing 25 × 13 = 325, using 13 gallons instead of 14.',
          B: 'This comes from incorrectly computing the efficiency as 62.5/2.5 ≈ 21.4 mpg, then multiplying 21.4 × 14 ≈ 300.',
        },
        teachingPoint: 'Compute the unit rate (miles per gallon) precisely before scaling — a small arithmetic error in the rate multiplies through the whole problem.',
      },
      {
        id: 'ratios-rates-units-d4',
        skillSlug: 'ratios-rates-units',
        difficulty: 'medium',
        stimulus:
          'A map uses a scale of 1 inch : 25 miles. Two cities are 3.6 inches apart on the map.',
        question: 'What is the actual distance between the two cities?',
        choices: [
          { label: 'A', text: '75 miles' },
          { label: 'B', text: '80 miles' },
          { label: 'C', text: '90 miles' },
          { label: 'D', text: '100 miles' },
        ],
        correctAnswer: 'C',
        explanation:
          'Actual distance = 3.6 inches × 25 miles/inch = 90 miles.',
        wrongAnswerExplanations: {
          A: 'This comes from using 3 inches instead of 3.6 inches (rounding down the map distance), giving 3 × 25 = 75.',
          D: 'This comes from using 4 inches instead of 3.6 inches, giving 4 × 25 = 100.',
        },
        teachingPoint: 'In map-scale problems, multiply the map distance by the scale factor to get real distance — do not round the map distance.',
      },
      {
        id: 'ratios-rates-units-d5',
        skillSlug: 'ratios-rates-units',
        difficulty: 'hard',
        stimulus:
          'A pump drains a tank at a rate of 45 liters per minute. The tank currently holds 2,700 liters. A second pipe simultaneously fills the tank at a rate of 18 liters per minute.',
        question: 'How many minutes will it take to drain the tank completely?',
        choices: [
          { label: 'A', text: '60 minutes' },
          { label: 'B', text: '90 minutes' },
          { label: 'C', text: '100 minutes' },
          { label: 'D', text: '150 minutes' },
        ],
        correctAnswer: 'C',
        explanation:
          'Net drain rate = 45 − 18 = 27 liters per minute. Time = 2700 ÷ 27 = 100 minutes.',
        wrongAnswerExplanations: {
          B: 'This comes from dividing 2700 by 30 (perhaps computing 45 − 15 = 30 rather than 45 − 18 = 27).',
          D: 'This comes from dividing 2700 by 18 (the fill rate alone) rather than the net rate.',
        },
        teachingPoint: 'When two rates act in opposing directions, subtract to find the net rate, then divide the total quantity by the net rate.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 2. Percentages
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: 'percentages',
    title: 'Percentages',
    domain: 'problem-solving-data-analysis',
    overview: {
      whatItTests:
        'The ability to find a percent of a number, calculate percent increase or decrease, determine the original value before a percent change, and apply markups, discounts, and percent problems embedded in word problems.',
      howItAppears:
        'Questions describe a price change, a population change, a test score, or a survey result using percentage language. Some ask for the new value, some for the percent change, and some for the original value before the change.',
      whyStudentsMissIt:
        'Students compute a percent of the new value instead of the original when finding percent change, or they add a percentage directly to the number instead of converting it to a decimal multiplier first.',
      whatToLookFor:
        'The word "of" signals multiplication: "30% of 80" = 0.30 × 80. "Percent change" always uses the original as the denominator. "Increased by 20%" means multiply by 1.20; "decreased by 20%" means multiply by 0.80.',
    },
    strategy: {
      steps: [
        'Translate the percent to a decimal: divide by 100 (e.g., 35% = 0.35).',
        'For "what is X% of Y": compute X% × Y.',
        'For percent increase: new value = original × (1 + rate). For percent decrease: new value = original × (1 − rate).',
        'For percent change from A to B: percent change = (B − A) / A × 100%.',
        'For finding the original before a change: original = new value ÷ (1 ± rate).',
      ],
      timeSavingTip:
        'Percent increase/decrease problems that use a multiplier (e.g., 1.15 for a 15% increase) can be solved in a single multiplication — you do not need to compute the amount of change first and then add.',
      whenNotToOverthink:
        'If the question asks "what is 50% of X?", just divide X by 2. Round numbers like 25%, 10%, and 5% are quick to compute mentally.',
    },
    commonTraps: [
      {
        title: 'Using the new value as the base for percent change',
        description:
          'A price drops from $80 to $60. Students compute (80 − 60)/60 = 25% instead of (80 − 60)/80 = 25%... wait — in this case both give different answers: 20/60 ≈ 33% vs. 20/80 = 25%. Students use 60 (the new value) instead of 80 (the original).',
        avoidance:
          'Percent change always divides by the ORIGINAL (starting) value. Identify which value came first.',
      },
      {
        title: 'Successive percent changes are not additive',
        description:
          'A price increases by 20% and then decreases by 20%, so students think the net change is 0%. In fact: 100 × 1.20 × 0.80 = 96, a net decrease of 4%.',
        avoidance:
          'Apply each percent change as a multiplier in sequence. Never add or subtract the percentages directly.',
      },
      {
        title: 'Confusing "percent of" with "percent more than"',
        description:
          '"A is 120% of B" means A = 1.20 × B, but "A is 20% more than B" also means A = 1.20 × B. Students sometimes interpret "120% of B" as B + 120.',
        avoidance:
          'Translate "P% of X" as (P/100) × X. "P% more than X" = X × (1 + P/100).',
      },
      {
        title: 'Finding the wrong part of a percent problem',
        description:
          'A question asks for the original price after saying a sale price is 75% of the original. Students multiply the sale price by 0.75 instead of dividing by 0.75.',
        avoidance:
          'If the new value and the percent are both known and you need the original, divide the new value by the percent multiplier.',
      },
    ],
    guidedExamples: [
      {
        id: 'percentages-ex-1',
        stimulus:
          'A jacket originally priced at $120 is on sale for 35% off.',
        question: 'What is the sale price of the jacket?',
        steps: [
          {
            instruction: 'Find the discount amount',
            content: '35% of $120 = 0.35 × 120 = $42',
          },
          {
            instruction: 'Subtract the discount from the original price',
            content: '$120 − $42 = $78',
          },
          {
            instruction: 'Alternatively, use the multiplier directly',
            content: '$120 × (1 − 0.35) = $120 × 0.65 = $78 ✓',
          },
        ],
        choices: [
          { label: 'A', text: '$42' },
          { label: 'B', text: '$75' },
          { label: 'C', text: '$78' },
          { label: 'D', text: '$85' },
        ],
        correctAnswer: 'C',
        explanation:
          'A 35% discount means the buyer pays 65% of the original. $120 × 0.65 = $78.',
        wrongAnswerExplanations: {
          A: 'This is the amount of the discount ($42), not the sale price.',
          B: 'This may come from computing 120 × 0.625 = 75, using 37.5% off instead of 35% off — an arithmetic error.',
        },
      },
      {
        id: 'percentages-ex-2',
        stimulus:
          'A town\'s population was 4,500 last year. This year the population is 4,950.',
        question: 'By what percent did the population increase?',
        steps: [
          {
            instruction: 'Find the amount of increase',
            content: '4,950 − 4,500 = 450',
          },
          {
            instruction: 'Divide by the original population',
            content: '450 ÷ 4,500 = 0.10',
          },
          {
            instruction: 'Convert to a percent',
            content: '0.10 × 100 = 10%',
          },
        ],
        choices: [
          { label: 'A', text: '9.1%' },
          { label: 'B', text: '10%' },
          { label: 'C', text: '11%' },
          { label: 'D', text: '450%' },
        ],
        correctAnswer: 'B',
        explanation:
          'Percent increase = (450 / 4500) × 100 = 10%.',
        wrongAnswerExplanations: {
          A: 'This comes from dividing 450 by the new value 4,950: 450/4,950 ≈ 9.1% — using the wrong base.',
          D: 'This comes from treating the change (450) itself as a percentage without dividing by the original.',
        },
      },
      {
        id: 'percentages-ex-3',
        stimulus:
          'After a 25% price increase, a software subscription now costs $75 per month.',
        question: 'What was the monthly cost before the price increase?',
        steps: [
          {
            instruction: 'Write an equation: original × 1.25 = 75',
            content: 'A 25% increase means the new price is 125% of the original.',
          },
          {
            instruction: 'Solve for the original',
            content: 'original = 75 ÷ 1.25 = 60',
          },
          {
            instruction: 'Verify: $60 × 1.25 = $75 ✓',
            content: 'Confirms the calculation is correct.',
          },
        ],
        choices: [
          { label: 'A', text: '$56.25' },
          { label: 'B', text: '$60' },
          { label: 'C', text: '$62.50' },
          { label: 'D', text: '$65' },
        ],
        correctAnswer: 'B',
        explanation:
          'If $75 is 125% of the original price, then original = 75 / 1.25 = $60.',
        wrongAnswerExplanations: {
          A: 'This comes from computing $75 × 0.75 = $56.25 — applying a 25% decrease to the new price rather than dividing by 1.25.',
          C: 'This comes from computing $75 − $75 × 0.25 × 0.5, a muddled calculation that does not reflect the correct inverse operation.',
        },
      },
    ],
    drillQuestions: [
      {
        id: 'percentages-d1',
        skillSlug: 'percentages',
        difficulty: 'easy',
        question: 'What is 40% of 85?',
        choices: [
          { label: 'A', text: '30' },
          { label: 'B', text: '34' },
          { label: 'C', text: '38' },
          { label: 'D', text: '40' },
        ],
        correctAnswer: 'B',
        explanation: '0.40 × 85 = 34.',
        wrongAnswerExplanations: {
          A: 'This comes from computing 0.40 × 75 = 30, using 75 instead of 85.',
          C: 'This comes from computing 0.40 × 95 = 38, or from rounding 34 upward incorrectly.',
        },
        teachingPoint: 'Convert the percent to a decimal and multiply — "of" always means multiply.',
      },
      {
        id: 'percentages-d2',
        skillSlug: 'percentages',
        difficulty: 'easy',
        stimulus:
          'A test has 60 questions. A student answered 45 of them correctly.',
        question: 'What percent of questions did the student answer correctly?',
        choices: [
          { label: 'A', text: '65%' },
          { label: 'B', text: '70%' },
          { label: 'C', text: '75%' },
          { label: 'D', text: '80%' },
        ],
        correctAnswer: 'C',
        explanation: '45 / 60 = 0.75 = 75%.',
        wrongAnswerExplanations: {
          B: 'This comes from computing 42/60 = 0.70, using 42 correct instead of 45.',
          D: 'This comes from computing 48/60 = 0.80, off by 3 questions.',
        },
        teachingPoint: 'Percent correct = (number correct / total) × 100 — divide the part by the whole, then multiply by 100.',
      },
      {
        id: 'percentages-d3',
        skillSlug: 'percentages',
        difficulty: 'medium',
        stimulus:
          'A store buys a lamp for $40 and marks it up by 65%.',
        question: 'What is the selling price of the lamp?',
        choices: [
          { label: 'A', text: '$60' },
          { label: 'B', text: '$62' },
          { label: 'C', text: '$65' },
          { label: 'D', text: '$66' },
        ],
        correctAnswer: 'D',
        explanation:
          'Selling price = $40 × 1.65 = $66.',
        wrongAnswerExplanations: {
          A: 'This comes from computing $40 + $20 = $60, using a 50% markup instead of 65%.',
          C: 'This reads the markup percentage (65) as the final price in dollars — a common misreading.',
        },
        teachingPoint: 'A markup of p% means the selling price equals the cost times (1 + p/100); do not just add the percentage as a dollar amount.',
      },
      {
        id: 'percentages-d4',
        skillSlug: 'percentages',
        difficulty: 'medium',
        stimulus:
          'A city\'s average temperature in July was 92°F. In August the temperature dropped to 80°F.',
        question: 'What was the approximate percent decrease in the average temperature from July to August?',
        choices: [
          { label: 'A', text: '13%' },
          { label: 'B', text: '15%' },
          { label: 'C', text: '12%' },
          { label: 'D', text: '11%' },
        ],
        correctAnswer: 'A',
        explanation:
          'Percent decrease = (92 − 80) / 92 × 100 = 12 / 92 × 100 ≈ 13.0%.',
        wrongAnswerExplanations: {
          B: 'This comes from dividing 12 by 80 (the new temperature): 12/80 = 15% — using the new value as the base.',
          C: 'This comes from computing 12/100 × 100 = 12%, using 100 as the denominator instead of 92.',
        },
        teachingPoint: 'Percent change always divides by the original (starting) value, not the new value.',
      },
      {
        id: 'percentages-d5',
        skillSlug: 'percentages',
        difficulty: 'hard',
        stimulus:
          'An investment grew by 20% in its first year and then decreased by 15% in its second year.',
        question: 'What was the net percent change in the investment over the two years?',
        choices: [
          { label: 'A', text: '+5%' },
          { label: 'B', text: '+2%' },
          { label: 'C', text: '−2%' },
          { label: 'D', text: '0%' },
        ],
        correctAnswer: 'B',
        explanation:
          'Start with $100. After year 1: 100 × 1.20 = $120. After year 2: 120 × 0.85 = $102. Net change = (102 − 100)/100 = 2% increase.',
        wrongAnswerExplanations: {
          A: 'This adds the two percentages: +20% − 15% = +5%. Successive percent changes cannot simply be added.',
          D: 'This incorrectly assumes the 20% increase and 15% decrease cancel out. They do not, because the 15% decrease applies to the larger post-year-1 amount.',
        },
        teachingPoint: 'For successive percent changes, apply each as a multiplier in sequence — never add or subtract the percentages directly.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 3. One-Variable Data
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: 'one-variable-data',
    title: 'One-Variable Data',
    domain: 'problem-solving-data-analysis',
    overview: {
      whatItTests:
        'Understanding and computing measures of center (mean, median, mode) and spread (range, interquartile range, standard deviation), interpreting them in context, and identifying the shape of a data distribution.',
      howItAppears:
        'Questions present a small data set, a frequency table, a dot plot, a box-and-whisker plot, or a histogram, then ask which measure of center is most appropriate, the effect of adding or removing a data point, or how spread changes when data is scaled.',
      whyStudentsMissIt:
        'Students confuse mean and median, forget to order the data before finding the median, or misidentify which measure is most affected by outliers.',
      whatToLookFor:
        'The presence of outliers suggests the median is the better measure of center. A symmetric distribution with no outliers makes mean and median approximately equal. "Most affected by" a change in an extreme value points to the mean.',
    },
    strategy: {
      steps: [
        'Mean: add all values and divide by the count.',
        'Median: order the data from least to greatest; for an odd count take the middle value; for an even count take the average of the two middle values.',
        'Mode: the value that appears most often (a data set can have no mode, one mode, or multiple modes).',
        'Range: maximum − minimum. IQR: Q3 − Q1 (the middle 50% of data).',
        'To judge which measure to use: if there are outliers or the distribution is skewed, prefer the median over the mean.',
      ],
      timeSavingTip:
        'If the question asks which statistic changes when one value is replaced, reason about direction instead of recalculating: replacing a low value with a higher one increases the mean; the median only changes if the replaced value was the median itself.',
      whenNotToOverthink:
        'If a question simply asks for the mean of a small list of numbers, just add and divide — no complex reasoning needed.',
    },
    commonTraps: [
      {
        title: 'Not ordering the data before finding the median',
        description:
          'Given {5, 12, 3, 9, 7}, students pick the middle position (3rd value = 3) without sorting, when the correct median is 7.',
        avoidance:
          'Always sort the list before identifying the median position.',
      },
      {
        title: 'Confusing mean and median in context',
        description:
          'A data set with a few very large values has a mean much higher than the median. Students report the mean when asked which is "more representative" of a typical value.',
        avoidance:
          'If the data is skewed or has outliers, the median is typically the better measure of a "typical" value. Mean is better for symmetric distributions.',
      },
      {
        title: 'Misidentifying the effect on standard deviation',
        description:
          'Students think adding a value equal to the mean leaves the standard deviation unchanged; in fact, it decreases the standard deviation because the data becomes more concentrated relative to its own mean.',
        avoidance:
          'Standard deviation measures average distance from the mean. Adding a value at the mean adds a data point with zero deviation, which reduces the average.',
      },
      {
        title: 'IQR vs. range confusion',
        description:
          'Students compute max − min (range) when asked for the IQR, or vice versa.',
        avoidance:
          'IQR = Q3 − Q1 (covers the middle 50%). Range = max − min (covers everything). Check which one the question names.',
      },
    ],
    guidedExamples: [
      {
        id: 'one-variable-data-ex-1',
        stimulus:
          'Seven students scored the following on a quiz: 72, 85, 91, 68, 85, 77, 92.',
        question: 'What is the median score?',
        steps: [
          {
            instruction: 'Sort the data from least to greatest',
            content: '68, 72, 77, 85, 85, 91, 92',
          },
          {
            instruction: 'Identify the middle value',
            content: 'With 7 values, the median is the 4th value: 85.',
          },
          {
            instruction: 'Confirm that 85 is in the correct position',
            content: '3 values below (68, 72, 77), 3 values above (85, 91, 92). Middle value = 85. ✓',
          },
        ],
        choices: [
          { label: 'A', text: '77' },
          { label: 'B', text: '81.43' },
          { label: 'C', text: '85' },
          { label: 'D', text: '85.7' },
        ],
        correctAnswer: 'C',
        explanation:
          'Sorted: 68, 72, 77, 85, 85, 91, 92. The 4th value (median) is 85.',
        wrongAnswerExplanations: {
          A: 'This is the 3rd value in the sorted list — the student chose the wrong position.',
          B: 'This is the mean: (68 + 72 + 77 + 85 + 85 + 91 + 92)/7 = 570/7 ≈ 81.4 — the question asked for the median.',
        },
      },
      {
        id: 'one-variable-data-ex-2',
        stimulus:
          'The ages of members of a book club are: 24, 27, 29, 31, 34, 67.',
        question: 'Which measure of center best describes a typical member\'s age, and why?',
        steps: [
          {
            instruction: 'Calculate the mean',
            content: '(24 + 27 + 29 + 31 + 34 + 67) / 6 = 212 / 6 ≈ 35.3',
          },
          {
            instruction: 'Find the median',
            content: 'Sorted: 24, 27, 29, 31, 34, 67. Median = (29 + 31)/2 = 30.',
          },
          {
            instruction: 'Compare and choose',
            content: 'The value 67 is an outlier that pulls the mean up to 35.3. The median (30) better represents the five members clustered between 24 and 34.',
          },
        ],
        choices: [
          { label: 'A', text: 'The mean, because it uses all data values.' },
          { label: 'B', text: 'The median, because it is resistant to the outlier age of 67.' },
          { label: 'C', text: 'The mode, because it appears most often.' },
          { label: 'D', text: 'The range, because it shows how spread out the ages are.' },
        ],
        correctAnswer: 'B',
        explanation:
          'The age of 67 is an outlier that pulls the mean to 35.3, far above most members. The median (30) is not influenced by the outlier and better represents a typical member\'s age.',
        wrongAnswerExplanations: {
          A: 'While the mean uses all data values, that is its weakness when outliers are present — using all values means the outlier distorts the result.',
          C: 'There is no repeated value in this data set, so the mode does not exist here.',
        },
      },
      {
        id: 'one-variable-data-ex-3',
        stimulus:
          'A data set has a mean of 50 and a standard deviation of 8. Every value in the data set is multiplied by 2.',
        question: 'What are the new mean and standard deviation?',
        steps: [
          {
            instruction: 'Apply the scaling rule for the mean',
            content: 'Multiplying every value by 2 multiplies the mean by 2: new mean = 50 × 2 = 100.',
          },
          {
            instruction: 'Apply the scaling rule for standard deviation',
            content: 'Standard deviation also scales by the same factor: new SD = 8 × 2 = 16.',
          },
          {
            instruction: 'Understand why',
            content: 'Each data point doubles, so the distance of each point from the new mean also doubles, increasing the spread by a factor of 2.',
          },
        ],
        choices: [
          { label: 'A', text: 'Mean = 100, SD = 8' },
          { label: 'B', text: 'Mean = 100, SD = 16' },
          { label: 'C', text: 'Mean = 50, SD = 16' },
          { label: 'D', text: 'Mean = 100, SD = 64' },
        ],
        correctAnswer: 'B',
        explanation:
          'Multiplying every value by 2 multiplies both the mean and the standard deviation by 2. New mean = 100, new SD = 16.',
        wrongAnswerExplanations: {
          A: 'This correctly scales the mean but incorrectly leaves the standard deviation unchanged. Scaling all data points also scales the spread.',
          D: 'This incorrectly squares the standard deviation (8² = 64). The SD scales by the same factor as the data, not by the factor squared.',
        },
      },
    ],
    drillQuestions: [
      {
        id: 'one-variable-data-d1',
        skillSlug: 'one-variable-data',
        difficulty: 'easy',
        stimulus: 'Data set: 4, 7, 7, 9, 13.',
        question: 'What is the mean of this data set?',
        choices: [
          { label: 'A', text: '7' },
          { label: 'B', text: '8' },
          { label: 'C', text: '9' },
          { label: 'D', text: '7.5' },
        ],
        correctAnswer: 'B',
        explanation: 'Mean = (4 + 7 + 7 + 9 + 13) / 5 = 40 / 5 = 8.',
        wrongAnswerExplanations: {
          A: 'This is the mode (7 appears twice) and also the median, not the mean.',
          C: 'This may come from computing 4 + 7 + 7 + 9 + 13 = 40 but then dividing by the wrong count, or misidentifying the median as 9.',
        },
        teachingPoint: 'Mean = sum of all values ÷ number of values; do not confuse it with median or mode.',
      },
      {
        id: 'one-variable-data-d2',
        skillSlug: 'one-variable-data',
        difficulty: 'easy',
        stimulus: 'Data set: 3, 8, 12, 15, 21, 24.',
        question: 'What is the median of this data set?',
        choices: [
          { label: 'A', text: '12' },
          { label: 'B', text: '13.5' },
          { label: 'C', text: '15' },
          { label: 'D', text: '14' },
        ],
        correctAnswer: 'B',
        explanation:
          'The data is already sorted. With 6 values, the median is the average of the 3rd and 4th values: (12 + 15)/2 = 13.5.',
        wrongAnswerExplanations: {
          A: 'This takes the 3rd value (12) as the median rather than averaging the 3rd and 4th values.',
          C: 'This takes the 4th value (15) as the median rather than averaging the 3rd and 4th values.',
        },
        teachingPoint: 'For an even-count data set, the median is the average of the two middle values, not either of them individually.',
      },
      {
        id: 'one-variable-data-d3',
        skillSlug: 'one-variable-data',
        difficulty: 'medium',
        stimulus:
          'A data set of 5 values has a mean of 12. A sixth value of 18 is added to the set.',
        question: 'What is the new mean?',
        choices: [
          { label: 'A', text: '13' },
          { label: 'B', text: '15' },
          { label: 'C', text: '12' },
          { label: 'D', text: '14' },
        ],
        correctAnswer: 'A',
        explanation:
          'Total of original 5 values = 5 × 12 = 60. New total = 60 + 18 = 78. New mean = 78 / 6 = 13.',
        wrongAnswerExplanations: {
          B: 'This comes from averaging the old mean and the new value: (12 + 18)/2 = 15, which is not the correct method.',
          D: 'This may come from computing (12 + 18)/2 and misreading or from an arithmetic error on 78/6.',
        },
        teachingPoint: 'To find a new mean after adding a value, reconstruct the total (mean × count), add the new value, and divide by the new count.',
      },
      {
        id: 'one-variable-data-d4',
        skillSlug: 'one-variable-data',
        difficulty: 'medium',
        stimulus:
          'Box-and-whisker plot for a data set: minimum = 10, Q1 = 18, median = 25, Q3 = 34, maximum = 50.',
        question: 'What is the interquartile range (IQR) of the data?',
        choices: [
          { label: 'A', text: '16' },
          { label: 'B', text: '25' },
          { label: 'C', text: '32' },
          { label: 'D', text: '40' },
        ],
        correctAnswer: 'A',
        explanation: 'IQR = Q3 − Q1 = 34 − 18 = 16.',
        wrongAnswerExplanations: {
          D: 'This is the range: max − min = 50 − 10 = 40, not the IQR.',
          B: 'This is the median, not the IQR.',
        },
        teachingPoint: 'IQR = Q3 − Q1; it measures the spread of the middle 50% of data and is different from the full range.',
      },
      {
        id: 'one-variable-data-d5',
        skillSlug: 'one-variable-data',
        difficulty: 'hard',
        stimulus:
          'A data set of 8 values has a mean of 20 and a range of 24. The largest value in the set is 34.',
        question: 'What is the smallest value in the data set?',
        choices: [
          { label: 'A', text: '8' },
          { label: 'B', text: '10' },
          { label: 'C', text: '12' },
          { label: 'D', text: '14' },
        ],
        correctAnswer: 'B',
        explanation:
          'Range = max − min → 24 = 34 − min → min = 34 − 24 = 10.',
        wrongAnswerExplanations: {
          A: 'This comes from computing mean − range = 20 − 24 = −4, then adding something — an incorrect approach that mixes mean and range.',
          C: 'This may come from computing 34 − 22 = 12, using 22 instead of 24 for the range.',
        },
        teachingPoint: 'Range = max − min; rearrange to min = max − range. The mean is a red herring here if the question only asks about range.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 4. Two-Variable Data & Models
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: 'two-variable-data',
    title: 'Two-Variable Data & Models',
    domain: 'problem-solving-data-analysis',
    overview: {
      whatItTests:
        'The ability to read and interpret scatterplots, distinguish between linear and nonlinear models of best fit, use a line or curve of best fit to make predictions, and understand the difference between correlation and causation.',
      howItAppears:
        'Questions show a scatterplot with a line or curve of best fit and ask for a predicted value, the meaning of the slope or intercept, or whether a given statement about causation is supported. Some questions also present a table of bivariate data.',
      whyStudentsMissIt:
        'Students confuse correlation with causation, read the line of best fit off by one grid unit, or misinterpret extrapolation as equally reliable as interpolation.',
      whatToLookFor:
        'Whether the association is positive (both variables increase together), negative (one increases while the other decreases), or no association. Whether the cloud of points suggests a linear or nonlinear pattern. Whether a prediction falls inside (interpolation) or outside (extrapolation) the data range.',
    },
    strategy: {
      steps: [
        'Identify the variables: which is the independent (x-axis) and which is the dependent (y-axis)?',
        'Describe the association: direction (positive/negative), strength (strong/weak), form (linear/nonlinear).',
        'For a line of best fit y = mx + b, interpret m as the change in y per unit increase in x, and b as the predicted y-value when x = 0.',
        'To predict a y-value, substitute the given x into the equation of the line of best fit.',
        'Distinguish correlation from causation: two variables can be strongly correlated without one causing the other.',
      ],
      timeSavingTip:
        'When the question asks for the meaning of the slope, translate it as: "for every 1-unit increase in [x-variable], the model predicts a [slope]-unit [increase/decrease] in [y-variable]."',
      whenNotToOverthink:
        'If the scatterplot clearly shows a positive linear trend and the question just asks the direction of the association, you do not need to compute anything.',
    },
    commonTraps: [
      {
        title: 'Confusing correlation with causation',
        description:
          'Two variables that are strongly correlated (such as ice cream sales and drowning rates) do not cause each other — a third variable (hot weather) may drive both.',
        avoidance:
          'Association or correlation language is acceptable ("associated with"). Causal language ("causes," "leads to") is only supported by a controlled experiment with random assignment.',
      },
      {
        title: 'Misreading the slope sign',
        description:
          'Students see a downward-sloping line of best fit and report a positive association, or vice versa.',
        avoidance:
          'Trace the line: as x increases, does y go up (positive slope) or down (negative slope)?',
      },
      {
        title: 'Overconfidence in extrapolated predictions',
        description:
          'A model built on data from x = 10 to x = 50 is used to predict y at x = 90. Students treat this as equally reliable as a prediction at x = 30.',
        avoidance:
          'Any prediction beyond the observed range is an extrapolation and is less reliable. SAT often asks whether such a prediction is reasonable.',
      },
      {
        title: 'Interpreting the y-intercept in context incorrectly',
        description:
          'A model predicts weight from height with a y-intercept of −130. Students say this means "a person with height 0 weighs −130 pounds," without noting that the intercept is meaningless in context.',
        avoidance:
          'Check whether x = 0 is a meaningful value. If not, note that the y-intercept exists mathematically but has no real-world interpretation.',
      },
    ],
    guidedExamples: [
      {
        id: 'two-variable-data-ex-1',
        stimulus:
          'A scatterplot shows the number of hours students studied (x) and their test scores (y). The line of best fit is y = 5x + 52.',
        question: 'What is the best interpretation of the slope 5 in this context?',
        steps: [
          {
            instruction: 'Identify the slope',
            content: 'The slope is 5. In the equation y = 5x + 52, for every 1-unit increase in x, y increases by 5.',
          },
          {
            instruction: 'Translate to context',
            content: 'x = hours studied, y = test score. So: for every 1 additional hour studied, the model predicts the test score increases by 5 points.',
          },
          {
            instruction: 'Eliminate incorrect interpretations',
            content: 'The slope is not a starting score (that\'s the intercept) and is not the total score for a student who studies 5 hours.',
          },
        ],
        choices: [
          { label: 'A', text: 'A student who does not study is predicted to score 5 points.' },
          { label: 'B', text: 'For every additional hour studied, the predicted score increases by 5 points.' },
          { label: 'C', text: 'A student who studies 5 hours is predicted to score 52 points.' },
          { label: 'D', text: 'The test score increases by 52 points for every 5 hours studied.' },
        ],
        correctAnswer: 'B',
        explanation:
          'The slope of the line of best fit represents the change in y per one-unit increase in x. A slope of 5 means each additional hour studied is associated with a 5-point increase in test score.',
        wrongAnswerExplanations: {
          A: 'A student who does not study (x = 0) has a predicted score of 52 (the y-intercept), not 5.',
          C: 'At x = 5 hours: y = 5(5) + 52 = 77, not 52. Also, 52 is the intercept, not the score at x = 5.',
        },
      },
      {
        id: 'two-variable-data-ex-2',
        stimulus:
          'A researcher collects data on the number of hours of TV watched per week (x) and the number of hours of exercise per week (y) for a sample of adults. The scatterplot shows a strong negative linear association.',
        question: 'Which of the following conclusions is supported by the data?',
        steps: [
          {
            instruction: 'Identify what "strong negative linear association" means',
            content: 'As TV hours (x) increase, exercise hours (y) tend to decrease — the two are negatively correlated.',
          },
          {
            instruction: 'Assess causation vs. correlation',
            content: 'An observational study shows association, not causation. We cannot conclude that watching TV causes less exercise from correlation alone.',
          },
          {
            instruction: 'Choose the correctly worded conclusion',
            content: 'The data supports: "Adults who watch more TV tend to exercise less." It does not support: "Watching TV causes people to exercise less."',
          },
        ],
        choices: [
          { label: 'A', text: 'Watching more TV causes adults to exercise less.' },
          { label: 'B', text: 'Adults who exercise more tend to watch less TV.' },
          { label: 'C', text: 'There is no relationship between TV watching and exercise.' },
          { label: 'D', text: 'Watching TV is the only factor that affects exercise habits.' },
        ],
        correctAnswer: 'B',
        explanation:
          'A negative association means higher x is associated with lower y, and vice versa. Statement B correctly uses "tend to" language (correlation, not causation) and correctly states the negative direction.',
        wrongAnswerExplanations: {
          A: 'This claims causation ("causes"), which cannot be established from a correlational observational study.',
          C: 'The data explicitly shows a strong negative association — "no relationship" is contradicted by the strong linear pattern.',
        },
      },
      {
        id: 'two-variable-data-ex-3',
        stimulus:
          'The line of best fit for a data set is y = −3x + 90, where x is the number of days after a product launch and y is the number of units sold that day. The data was collected for x = 1 through x = 20.',
        question: 'Using the model, what is the predicted number of units sold on day 15?',
        steps: [
          {
            instruction: 'Substitute x = 15 into the equation',
            content: 'y = −3(15) + 90 = −45 + 90 = 45',
          },
          {
            instruction: 'Check that x = 15 is within the data range',
            content: 'The data covers days 1–20, and 15 is within this range, so this is an interpolation — a reliable prediction.',
          },
          {
            instruction: 'Report the answer with units',
            content: 'The model predicts 45 units sold on day 15.',
          },
        ],
        choices: [
          { label: 'A', text: '30 units' },
          { label: 'B', text: '45 units' },
          { label: 'C', text: '55 units' },
          { label: 'D', text: '60 units' },
        ],
        correctAnswer: 'B',
        explanation:
          'y = −3(15) + 90 = −45 + 90 = 45 units.',
        wrongAnswerExplanations: {
          A: 'This comes from computing −3(15) + 75 = 30, using 75 instead of 90 for the intercept.',
          D: 'This comes from computing −3(10) + 90 = 60, substituting x = 10 instead of x = 15.',
        },
      },
    ],
    drillQuestions: [
      {
        id: 'two-variable-data-d1',
        skillSlug: 'two-variable-data',
        difficulty: 'easy',
        stimulus:
          'A scatterplot shows a data cloud that rises from lower left to upper right.',
        question: 'Which of the following best describes the association shown?',
        choices: [
          { label: 'A', text: 'Negative linear association' },
          { label: 'B', text: 'Positive linear association' },
          { label: 'C', text: 'No association' },
          { label: 'D', text: 'Nonlinear association' },
        ],
        correctAnswer: 'B',
        explanation:
          'A cloud that rises from lower left to upper right shows a positive association: as x increases, y also increases.',
        wrongAnswerExplanations: {
          A: 'A negative association would show the cloud falling from upper left to lower right.',
          C: 'No association would show a circular or random scatter with no discernible trend.',
        },
        teachingPoint: 'A scatterplot cloud that rises left-to-right indicates a positive association; one that falls indicates a negative association.',
      },
      {
        id: 'two-variable-data-d2',
        skillSlug: 'two-variable-data',
        difficulty: 'easy',
        stimulus:
          'The line of best fit for a scatterplot is y = 4x + 10.',
        question: 'What is the predicted value of y when x = 6?',
        choices: [
          { label: 'A', text: '30' },
          { label: 'B', text: '34' },
          { label: 'C', text: '40' },
          { label: 'D', text: '24' },
        ],
        correctAnswer: 'B',
        explanation: 'y = 4(6) + 10 = 24 + 10 = 34.',
        wrongAnswerExplanations: {
          A: 'This comes from computing 4(6) + 10 − 4 = 30, a subtraction error.',
          C: 'This comes from computing 4(6) + 10 = 34 but then adding 6 again, or computing 4(6 + 1) + 10 = 40.',
        },
        teachingPoint: 'To use a line of best fit for prediction, substitute the x-value into the equation and evaluate.',
      },
      {
        id: 'two-variable-data-d3',
        skillSlug: 'two-variable-data',
        difficulty: 'medium',
        stimulus:
          'A study finds that cities with more coffee shops per capita also have higher average incomes. The correlation is r = 0.82.',
        question: 'Which conclusion is best supported by this study?',
        choices: [
          { label: 'A', text: 'Opening more coffee shops in a city will increase residents\' incomes.' },
          { label: 'B', text: 'Higher income causes people to open more coffee shops.' },
          { label: 'C', text: 'The number of coffee shops and average income are strongly positively associated.' },
          { label: 'D', text: 'Cities with no coffee shops have the lowest incomes.' },
        ],
        correctAnswer: 'C',
        explanation:
          'A correlation of 0.82 is strong and positive — as coffee shops per capita increase, average income tends to increase. But correlation does not establish causation in either direction.',
        wrongAnswerExplanations: {
          A: 'This claims that adding coffee shops causes higher income, which cannot be concluded from a correlational study.',
          B: 'This claims that higher income causes more coffee shops — also causal reasoning that is not supported by correlation.',
        },
        teachingPoint: 'Correlation describes a relationship between two variables but never establishes which one causes the other — or that either causes the other.',
      },
      {
        id: 'two-variable-data-d4',
        skillSlug: 'two-variable-data',
        difficulty: 'medium',
        stimulus:
          'The line of best fit for data collected from x = 5 to x = 30 is y = 2x + 8. A researcher uses this model to predict y when x = 80.',
        question: 'Which statement best describes the reliability of this prediction?',
        choices: [
          { label: 'A', text: 'The prediction is highly reliable because the equation is exact.' },
          { label: 'B', text: 'The prediction is unreliable because x = 80 is outside the range of the data.' },
          { label: 'C', text: 'The prediction is unreliable because the slope is too small.' },
          { label: 'D', text: 'The prediction is reliable because the line of best fit was computed from real data.' },
        ],
        correctAnswer: 'B',
        explanation:
          'The data was collected for x = 5 to x = 30. Using the model at x = 80 is extrapolation — extending the model beyond the observed range. Such predictions are less reliable because the pattern may not continue.',
        wrongAnswerExplanations: {
          A: 'A line of best fit is not an exact equation — it approximates a trend. And even if it were exact within the data range, extending it outside is still unreliable.',
          D: 'Being computed from real data makes the model reliable within its data range, not outside it.',
        },
        teachingPoint: 'Extrapolation — predicting beyond the observed data range — is less reliable than interpolation because the trend may not continue.',
      },
      {
        id: 'two-variable-data-d5',
        skillSlug: 'two-variable-data',
        difficulty: 'hard',
        stimulus:
          'A linear model for a data set is y = −2.5x + 100, where x is the number of weeks after a campaign begins and y is the number of new signups per week. The model is valid for x = 1 to x = 30.',
        question: 'According to the model, during which week will the number of new signups first fall below 30?',
        choices: [
          { label: 'A', text: 'Week 25' },
          { label: 'B', text: 'Week 27' },
          { label: 'C', text: 'Week 28' },
          { label: 'D', text: 'Week 29' },
        ],
        correctAnswer: 'D',
        explanation:
          'Set −2.5x + 100 < 30: −2.5x < −70 → x > 28. The first integer week greater than 28 is week 29. At x = 28: y = −2.5(28) + 100 = 30 exactly (not below 30). At x = 29: y = −2.5(29) + 100 = 27.5 < 30. ✓',
        wrongAnswerExplanations: {
          A: 'At week 25: y = −2.5(25) + 100 = 37.5, which is still above 30.',
          C: 'At week 28: y = −2.5(28) + 100 = 30 exactly — this is not below 30.',
        },
        teachingPoint: 'Solve the inequality for x to find the threshold, then check the boundary value — strictly less than means the boundary itself is excluded.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 5. Probability
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: 'probability',
    title: 'Probability',
    domain: 'problem-solving-data-analysis',
    overview: {
      whatItTests:
        'Basic probability, the complement rule, conditional probability, two-way tables, and determining whether two events are independent.',
      howItAppears:
        'Questions present a two-way table, a description of a random experiment, or a scenario involving "given that" language. They ask for P(A), P(A and B), P(A | B), or whether two events are independent.',
      whyStudentsMissIt:
        'Students use the wrong denominator when computing conditional probability — they use the whole-table total instead of the row or column total that matches the condition.',
      whatToLookFor:
        '"Given that" or "of those who" signals conditional probability and requires restricting the denominator to the relevant subset. "At least one" often means use the complement rule.',
    },
    strategy: {
      steps: [
        'For basic probability: P(A) = (number of favorable outcomes) / (total outcomes).',
        'Complement rule: P(not A) = 1 − P(A). Use this when "at least one" or "not" appears.',
        'For conditional probability P(A | B): restrict the sample space to event B, then find how many of those also satisfy A. P(A | B) = P(A and B) / P(B).',
        'In a two-way table, identify the correct row or column total as the denominator for conditional probability.',
        'For independence: A and B are independent if P(A | B) = P(A), or equivalently P(A and B) = P(A) × P(B).',
      ],
      timeSavingTip:
        'In two-way tables, circle the condition in "given that ___" and restrict your view to that row or column. The denominator is always that row or column total, not the grand total.',
      whenNotToOverthink:
        'For simple "what fraction of the total satisfies X?" questions, just read the table cell and divide by the grand total — no conditional probability needed.',
    },
    commonTraps: [
      {
        title: 'Using the wrong denominator for conditional probability',
        description:
          'P(studies math | is a senior) requires the denominator to be the total number of seniors, not the total number of all students.',
        avoidance:
          'Identify the conditioning event (the "given" part) and use its total as the denominator.',
      },
      {
        title: 'Confusing "and" with "or"',
        description:
          'P(A and B) requires both events to occur simultaneously. Students sometimes compute P(A) + P(B) when asked for P(A and B), which is the formula for P(A or B) (and even that needs to subtract overlap).',
        avoidance:
          'Translate "and" as intersection (both must be true) and "or" as union (at least one must be true).',
      },
      {
        title: 'Ignoring the complement for "at least one" problems',
        description:
          'Computing the probability of getting at least one head in 3 flips by listing all favorable outcomes is tedious and error-prone. Students miss some cases.',
        avoidance:
          'Use P(at least one head) = 1 − P(no heads). The complement is usually a single simple event.',
      },
      {
        title: 'Assuming independence when it has not been established',
        description:
          'Students multiply probabilities P(A) × P(B) to find P(A and B) without first checking whether A and B are independent.',
        avoidance:
          'Only multiply P(A) × P(B) if the problem states the events are independent or if independence follows from the structure (e.g., separate draws with replacement).',
      },
    ],
    guidedExamples: [
      {
        id: 'probability-ex-1',
        stimulus:
          'A bag contains 4 red marbles, 6 blue marbles, and 2 green marbles. One marble is drawn at random.',
        question: 'What is the probability of drawing a marble that is NOT green?',
        steps: [
          {
            instruction: 'Count total marbles',
            content: '4 + 6 + 2 = 12 marbles total.',
          },
          {
            instruction: 'Use the complement rule',
            content: 'P(not green) = 1 − P(green) = 1 − 2/12 = 1 − 1/6 = 5/6.',
          },
          {
            instruction: 'Verify directly',
            content: 'Non-green marbles = 4 red + 6 blue = 10. P(not green) = 10/12 = 5/6 ✓',
          },
        ],
        choices: [
          { label: 'A', text: '1/6' },
          { label: 'B', text: '2/12' },
          { label: 'C', text: '5/6' },
          { label: 'D', text: '2/3' },
        ],
        correctAnswer: 'C',
        explanation:
          'P(not green) = (12 − 2)/12 = 10/12 = 5/6.',
        wrongAnswerExplanations: {
          A: 'This is P(green) = 2/12 = 1/6, the opposite of what was asked.',
          D: 'This is P(blue) = 6/12 = 1/2, not the probability of any non-green marble.',
        },
      },
      {
        id: 'probability-ex-2',
        stimulus:
          'The table below shows the sport preferences of 80 students.\n\n|           | Soccer | Basketball | Total |\n|-----------|--------|------------|-------|\n| Grade 9   |   14   |    21      |   35  |\n| Grade 10  |   28   |    17      |   45  |\n| Total     |   42   |    38      |   80  |',
        question: 'What is the probability that a randomly selected student prefers soccer, given that the student is in grade 10?',
        steps: [
          {
            instruction: 'Identify the condition',
            content: '"Given that the student is in grade 10" restricts the sample space to grade 10 students only. Total grade 10 students = 45.',
          },
          {
            instruction: 'Find how many grade 10 students prefer soccer',
            content: 'From the table: 28 grade 10 students prefer soccer.',
          },
          {
            instruction: 'Compute the conditional probability',
            content: 'P(soccer | grade 10) = 28/45.',
          },
        ],
        choices: [
          { label: 'A', text: '28/80' },
          { label: 'B', text: '28/42' },
          { label: 'C', text: '28/45' },
          { label: 'D', text: '42/80' },
        ],
        correctAnswer: 'C',
        explanation:
          'Conditional probability: restrict to grade 10 students (45 total). Of those, 28 prefer soccer. P = 28/45.',
        wrongAnswerExplanations: {
          A: 'This uses the grand total (80) as the denominator — the correct denominator for conditional probability is the total for the given condition (45 grade 10 students).',
          B: 'This uses the total number of soccer-preferring students (42) as the denominator, which would be a different conditional probability.',
        },
      },
      {
        id: 'probability-ex-3',
        stimulus:
          'A fair six-sided die is rolled twice. The rolls are independent.',
        question: 'What is the probability of getting an even number on the first roll AND a number greater than 4 on the second roll?',
        steps: [
          {
            instruction: 'Find P(even on first roll)',
            content: 'Even numbers on a die: {2, 4, 6} → P(even) = 3/6 = 1/2.',
          },
          {
            instruction: 'Find P(greater than 4 on second roll)',
            content: 'Numbers greater than 4: {5, 6} → P(> 4) = 2/6 = 1/3.',
          },
          {
            instruction: 'Multiply because the rolls are independent',
            content: 'P(even AND > 4) = (1/2) × (1/3) = 1/6.',
          },
        ],
        choices: [
          { label: 'A', text: '1/4' },
          { label: 'B', text: '1/3' },
          { label: 'C', text: '5/6' },
          { label: 'D', text: '1/6' },
        ],
        correctAnswer: 'D',
        explanation:
          'P(even) = 1/2, P(> 4) = 1/3. Independent events: P = (1/2)(1/3) = 1/6.',
        wrongAnswerExplanations: {
          A: 'This comes from computing (1/2) × (1/2) = 1/4, using P(even) for both rolls.',
          B: 'This is P(> 4) alone, not the joint probability of both events.',
        },
      },
    ],
    drillQuestions: [
      {
        id: 'probability-d1',
        skillSlug: 'probability',
        difficulty: 'easy',
        stimulus:
          'A spinner has 8 equal sections numbered 1 through 8.',
        question: 'What is the probability of landing on a number less than 3?',
        choices: [
          { label: 'A', text: '1/8' },
          { label: 'B', text: '1/4' },
          { label: 'C', text: '3/8' },
          { label: 'D', text: '1/2' },
        ],
        correctAnswer: 'B',
        explanation:
          'Numbers less than 3: {1, 2} — that is 2 outcomes. P = 2/8 = 1/4.',
        wrongAnswerExplanations: {
          A: 'This is the probability of landing on any one specific number (1/8), not numbers less than 3.',
          C: 'This counts numbers less than or equal to 3 ({1, 2, 3} = 3 outcomes): 3/8, but the question asks for strictly less than 3.',
        },
        teachingPoint: '"Less than 3" means {1, 2} — do not include 3 itself.',
      },
      {
        id: 'probability-d2',
        skillSlug: 'probability',
        difficulty: 'easy',
        stimulus:
          'A survey of 50 people found that 30 drink coffee and 20 drink tea. No one drinks both.',
        question: 'What is the probability that a randomly selected person drinks neither coffee nor tea?',
        choices: [
          { label: 'A', text: '0' },
          { label: 'B', text: '2/5' },
          { label: 'C', text: '1/5' },
          { label: 'D', text: '3/5' },
        ],
        correctAnswer: 'A',
        explanation:
          'Total who drink coffee or tea = 30 + 20 = 50. All 50 people are accounted for, so 0 people drink neither. P = 0/50 = 0.',
        wrongAnswerExplanations: {
          B: 'This is P(tea) = 20/50 = 2/5, not the probability of neither.',
          C: 'This may come from assuming 10 people drink neither without reading the numbers carefully.',
        },
        teachingPoint: 'Check whether the groups cover the entire sample before assuming anyone is left out.',
      },
      {
        id: 'probability-d3',
        skillSlug: 'probability',
        difficulty: 'medium',
        stimulus:
          'In a class of 30 students, 18 play a sport and 12 are in the school band. Six students play both a sport and are in the band.',
        question: 'What is the probability that a randomly selected student plays a sport OR is in the band?',
        choices: [
          { label: 'A', text: '18/30' },
          { label: 'B', text: '24/30' },
          { label: 'C', text: '30/30' },
          { label: 'D', text: '12/30' },
        ],
        correctAnswer: 'B',
        explanation:
          'P(sport or band) = P(sport) + P(band) − P(both) = 18/30 + 12/30 − 6/30 = 24/30 = 4/5.',
        wrongAnswerExplanations: {
          A: 'This is only P(sport), ignoring students in band who do not play sports.',
          C: 'This comes from adding 18 + 12 = 30 without subtracting the 6 who do both — double-counting the overlap.',
        },
        teachingPoint: 'For P(A or B), use the inclusion-exclusion formula: P(A) + P(B) − P(A and B), to avoid double-counting the overlap.',
      },
      {
        id: 'probability-d4',
        skillSlug: 'probability',
        difficulty: 'medium',
        stimulus:
          'The table shows data on 100 employees.\n\n|              | Full-time | Part-time | Total |\n|--------------|-----------|-----------|-------|\n| Has benefits |    45     |    15     |   60  |\n| No benefits  |    20     |    20     |   40  |\n| Total        |    65     |    35     |  100  |',
        question: 'What is the probability that a randomly selected employee has benefits, given that the employee is part-time?',
        choices: [
          { label: 'A', text: '15/100' },
          { label: 'B', text: '15/60' },
          { label: 'C', text: '15/35' },
          { label: 'D', text: '35/100' },
        ],
        correctAnswer: 'C',
        explanation:
          'Condition: part-time. Total part-time = 35. Of those, 15 have benefits. P(benefits | part-time) = 15/35 = 3/7.',
        wrongAnswerExplanations: {
          A: 'This uses the grand total (100) as the denominator rather than restricting to part-time employees (35).',
          B: 'This uses the total with benefits (60) as the denominator — that would be P(part-time | benefits), the reverse conditional.',
        },
        teachingPoint: 'Conditional probability: the denominator is the total count of the given condition (part-time = 35), not the grand total.',
      },
      {
        id: 'probability-d5',
        skillSlug: 'probability',
        difficulty: 'hard',
        stimulus:
          'Two events A and B are such that P(A) = 0.4, P(B) = 0.5, and P(A and B) = 0.2.',
        question: 'Are events A and B independent?',
        choices: [
          { label: 'A', text: 'Yes, because P(A and B) = P(A) × P(B).' },
          { label: 'B', text: 'No, because P(A and B) ≠ P(A) + P(B).' },
          { label: 'C', text: 'Yes, because P(A) + P(B) = 0.9.' },
          { label: 'D', text: 'No, because P(A and B) < P(A).' },
        ],
        correctAnswer: 'A',
        explanation:
          'Two events are independent if P(A and B) = P(A) × P(B). Check: 0.4 × 0.5 = 0.20 = P(A and B). ✓ So A and B are independent.',
        wrongAnswerExplanations: {
          B: 'Independence is tested by comparing P(A and B) with P(A) × P(B), not with P(A) + P(B). The addition rule is for unions, not independence.',
          D: 'P(A and B) < P(A) is always true for any event B with P(B) < 1; it does not indicate dependence.',
        },
        teachingPoint: 'Test independence by checking P(A and B) = P(A) × P(B); if this equation holds, the events are independent.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 6. Statistical Claims & Inference
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: 'statistical-claims',
    title: 'Statistical Claims & Inference',
    domain: 'problem-solving-data-analysis',
    overview: {
      whatItTests:
        'The ability to evaluate the validity of statistical claims, understand the difference between observational studies and controlled experiments, assess whether findings from a sample can be generalized to a population, and interpret margin of error.',
      howItAppears:
        'Questions describe a study (survey, experiment, or observational study), then present four answer choices that make different claims — causal vs. associational, generalizable vs. not generalizable, or correctly vs. incorrectly interpreting a confidence interval.',
      whyStudentsMissIt:
        'Students incorrectly extend causal language to observational studies, or they generalize findings beyond the population from which the sample was drawn.',
      whatToLookFor:
        'How was the sample selected? (Random = generalizable to the population; convenience or voluntary = not.) Was there random assignment to treatment groups? (Yes = causal conclusions valid; no = only association can be claimed.)',
    },
    strategy: {
      steps: [
        'Identify the study type: survey/observational study (describes what is) vs. experiment (manipulates a variable).',
        'Check for random sampling: was the sample randomly selected from the target population? If yes, results may generalize; if no, only conclusions about the sample itself are valid.',
        'Check for random assignment: were participants randomly assigned to treatment and control groups? If yes, causal conclusions are valid; if no, only association can be claimed.',
        'Interpret margin of error: a result of 52% with a ±3% margin of error means the true population value is likely between 49% and 55%.',
        'Watch for confounding variables in observational studies: a third variable might explain an apparent association between two others.',
      ],
      timeSavingTip:
        'For each answer choice that uses causal language ("causes," "leads to," "results in"), immediately check whether the study used random assignment. If not, eliminate those choices.',
      whenNotToOverthink:
        'If the question describes a well-designed randomized controlled experiment (random assignment to groups), you can accept causal conclusions and focus on whether the effect is statistically significant, not on whether causation is valid.',
    },
    commonTraps: [
      {
        title: 'Claiming causation from an observational study',
        description:
          'A study observes that people who eat breakfast have higher grades. Students conclude that eating breakfast causes higher grades, ignoring confounds like socioeconomic status.',
        avoidance:
          'Only a randomized controlled experiment with proper controls supports causal claims. Observational studies only establish association.',
      },
      {
        title: 'Generalizing beyond the sampled population',
        description:
          'A study of students at one high school concludes "all American teenagers prefer X." The sample represents only students at that school.',
        avoidance:
          'Conclusions can only generalize to the population from which the sample was randomly drawn. A sample from one school represents only that school\'s students.',
      },
      {
        title: 'Misinterpreting margin of error',
        description:
          'A survey finds 60% ± 4% support a policy. Students think this means the result might be anywhere from 0% to 100%, or that 4% of people were not counted.',
        avoidance:
          'Margin of error defines a confidence interval: the true value is likely within (result − MOE) to (result + MOE). Here: between 56% and 64%.',
      },
      {
        title: 'Ignoring the sampling method',
        description:
          'A study uses volunteers who respond to an online poll. Students treat this as a valid random sample and generalize the results.',
        avoidance:
          'Voluntary response and convenience samples are biased — only random samples from a defined population support generalization.',
      },
    ],
    guidedExamples: [
      {
        id: 'statistical-claims-ex-1',
        stimulus:
          'A researcher randomly selected 200 adults from a city and found that those who reported sleeping fewer than 6 hours per night had higher blood pressure on average than those who slept 7 or more hours.',
        question: 'Which conclusion is best supported by this study?',
        steps: [
          {
            instruction: 'Identify the study type',
            content: 'The researcher observed sleep habits and blood pressure — no variable was manipulated. This is an observational study.',
          },
          {
            instruction: 'Check random sampling',
            content: '200 adults were randomly selected from a city. Results can be generalized to adults in that city.',
          },
          {
            instruction: 'Determine what kind of conclusion is warranted',
            content: 'No random assignment to sleep groups → only association, not causation, can be claimed. The conclusion must say "is associated with" rather than "causes."',
          },
        ],
        choices: [
          { label: 'A', text: 'Sleeping fewer than 6 hours causes higher blood pressure in adults.' },
          { label: 'B', text: 'Among adults in the city, sleeping fewer than 6 hours is associated with higher blood pressure.' },
          { label: 'C', text: 'The results apply to all adults worldwide.' },
          { label: 'D', text: 'Adults who sleep more than 6 hours never have high blood pressure.' },
        ],
        correctAnswer: 'B',
        explanation:
          'The study is observational with random sampling from a city. The correct conclusion is associational ("associated with") and limited to adults in that city — not causal and not universally generalizable.',
        wrongAnswerExplanations: {
          A: 'This claims causation, which requires a randomized experiment with random assignment to sleep conditions. An observational study cannot establish causation.',
          C: 'The sample was drawn from one city. Generalizing to all adults worldwide extends far beyond the sampled population.',
        },
      },
      {
        id: 'statistical-claims-ex-2',
        stimulus:
          'A poll conducted by a news website asked visitors to vote on whether they support a new local tax. Of the 4,000 visitors who responded, 73% said they oppose the tax. The website reports: "73% of residents oppose the new tax."',
        question: 'Which statement best identifies the flaw in the website\'s conclusion?',
        steps: [
          {
            instruction: 'Identify the sampling method',
            content: 'Website visitors who chose to respond — this is a voluntary response sample, not a random sample of residents.',
          },
          {
            instruction: 'Explain why this is biased',
            content: 'People with strong opinions (especially against the tax) are more likely to respond. The sample over-represents those who oppose the tax.',
          },
          {
            instruction: 'Identify the flaw in the conclusion',
            content: 'The conclusion generalizes from a biased voluntary sample to "all residents," which is not supported.',
          },
        ],
        choices: [
          { label: 'A', text: 'The sample size of 4,000 is too small to draw any conclusion.' },
          { label: 'B', text: 'The sample was not randomly selected from the population of all residents, so the results cannot be generalized.' },
          { label: 'C', text: 'The poll should have included more questions to be valid.' },
          { label: 'D', text: 'The website cannot report percentages without a margin of error.' },
        ],
        correctAnswer: 'B',
        explanation:
          'The sample is a voluntary response from website visitors — a convenience/voluntary sample that is not representative of all residents. Generalizing to all residents is invalid.',
        wrongAnswerExplanations: {
          A: '4,000 is actually a reasonably large sample. The problem is not the size but the non-random selection method.',
          C: 'The number of questions is irrelevant to whether the sample is representative of the population.',
        },
      },
      {
        id: 'statistical-claims-ex-3',
        stimulus:
          'A poll of 500 randomly selected voters found that 54% plan to vote for Candidate A, with a margin of error of ±4 percentage points.',
        question: 'Which of the following is a reasonable interpretation of the margin of error?',
        steps: [
          {
            instruction: 'Apply the margin of error to the result',
            content: 'Lower bound: 54% − 4% = 50%. Upper bound: 54% + 4% = 58%.',
          },
          {
            instruction: 'Interpret the confidence interval',
            content: 'The true proportion of all voters who plan to vote for Candidate A is likely between 50% and 58%.',
          },
          {
            instruction: 'Assess each answer choice',
            content: 'The interval includes values above 50%, but also exactly 50% at the lower end — the race is too close to definitively call based on this interval.',
          },
        ],
        choices: [
          { label: 'A', text: 'Candidate A will definitely win because 54% is above 50%.' },
          { label: 'B', text: 'The true proportion of voters who support Candidate A is likely between 50% and 58%.' },
          { label: 'C', text: '4% of the voters could not be counted accurately.' },
          { label: 'D', text: 'The poll is worthless because the margin of error is too large.' },
        ],
        correctAnswer: 'B',
        explanation:
          'Margin of error ±4% creates an interval: 54% ± 4% = [50%, 58%]. The true population proportion is likely within this interval.',
        wrongAnswerExplanations: {
          A: 'The interval includes 50% at its lower bound, so the race could be a tie or closer than the sample suggests — a definitive win cannot be claimed.',
          C: 'Margin of error is a statistical concept about the precision of an estimate, not about counting errors or uncounted voters.',
        },
      },
    ],
    drillQuestions: [
      {
        id: 'statistical-claims-d1',
        skillSlug: 'statistical-claims',
        difficulty: 'easy',
        stimulus:
          'A researcher randomly assigns 60 volunteers into two groups. One group takes a new vitamin supplement; the other takes a placebo. After 8 weeks, the supplement group shows improved energy levels.',
        question: 'What type of study is this, and what conclusion is justified?',
        choices: [
          { label: 'A', text: 'Observational study; the supplement is associated with higher energy.' },
          { label: 'B', text: 'Randomized experiment; the supplement causes improved energy.' },
          { label: 'C', text: 'Survey; the supplement is preferred by volunteers.' },
          { label: 'D', text: 'Observational study; the supplement causes improved energy.' },
        ],
        correctAnswer: 'B',
        explanation:
          'Volunteers were randomly assigned to treatment and control groups — this is a randomized controlled experiment. Random assignment allows a causal conclusion.',
        wrongAnswerExplanations: {
          A: 'An observational study does not randomly assign participants to groups. Because random assignment was used here, causal conclusions are warranted.',
          D: 'This correctly identifies a causal conclusion but incorrectly labels it as an observational study.',
        },
        teachingPoint: 'Random assignment to treatment and control groups is the defining feature of a controlled experiment and is what enables causal conclusions.',
      },
      {
        id: 'statistical-claims-d2',
        skillSlug: 'statistical-claims',
        difficulty: 'easy',
        stimulus:
          'A researcher surveys 50 students at a single middle school and finds that 80% of them prefer online learning. She concludes that 80% of all middle school students in the country prefer online learning.',
        question: 'What is the primary flaw in the researcher\'s conclusion?',
        choices: [
          { label: 'A', text: 'The sample size of 50 is too small.' },
          { label: 'B', text: 'The conclusion generalizes beyond the population from which the sample was drawn.' },
          { label: 'C', text: 'The researcher should have used a percentage other than 80%.' },
          { label: 'D', text: 'Online learning preferences cannot be measured by a survey.' },
        ],
        correctAnswer: 'B',
        explanation:
          'The sample was drawn from one middle school. Valid generalizations can only be made about students at that school, not about all middle school students nationwide.',
        wrongAnswerExplanations: {
          A: 'While a small sample reduces precision, the main flaw is not the sample size but the scope of the generalization — drawing a national conclusion from a single school.',
          C: 'The percentage reported is simply what was found in the data; this is not the flaw.',
        },
        teachingPoint: 'Conclusions can only generalize to the population from which the sample was randomly drawn, not to larger or different populations.',
      },
      {
        id: 'statistical-claims-d3',
        skillSlug: 'statistical-claims',
        difficulty: 'medium',
        stimulus:
          'A national poll randomly sampled 1,000 adults and found that 48% support a new policy, with a margin of error of ±3%. The poll claims the result is statistically significant.',
        question: 'Based on this poll, which statement is best supported?',
        choices: [
          { label: 'A', text: 'Exactly 48% of all adults support the policy.' },
          { label: 'B', text: 'The true support level among all adults is likely between 45% and 51%.' },
          { label: 'C', text: 'Fewer than half of all adults support the policy.' },
          { label: 'D', text: 'The policy will fail because 48% is less than 50%.' },
        ],
        correctAnswer: 'B',
        explanation:
          '48% ± 3% = [45%, 51%]. The true level of support among all adults is likely in this range. Since the interval includes values above 50%, we cannot conclude fewer than half support it.',
        wrongAnswerExplanations: {
          A: 'The exact value is unknown; the margin of error reflects the range of likely values, not a precise count.',
          C: 'The interval [45%, 51%] extends above 50%, so it is possible that a majority support the policy. This claim is not supported.',
        },
        teachingPoint: 'A margin of error creates an interval of plausible values for the true population parameter — conclusions must be consistent with the entire interval, not just the point estimate.',
      },
      {
        id: 'statistical-claims-d4',
        skillSlug: 'statistical-claims',
        difficulty: 'medium',
        stimulus:
          'An observational study finds that students who participate in extracurricular activities have higher GPAs on average than those who do not.',
        question: 'Which conclusion is NOT justified by this study?',
        choices: [
          { label: 'A', text: 'In this sample, participation in extracurricular activities is associated with higher GPA.' },
          { label: 'B', text: 'Participating in extracurricular activities causes students to earn higher GPAs.' },
          { label: 'C', text: 'Students who participate in activities tend to have higher GPAs than those who do not.' },
          { label: 'D', text: 'There is a positive association between extracurricular participation and GPA in this data.' },
        ],
        correctAnswer: 'B',
        explanation:
          'This is an observational study with no random assignment. Causation ("causes students to earn higher GPAs") cannot be established. Choices A, C, and D all use appropriate associational language.',
        wrongAnswerExplanations: {
          A: 'This is a valid associational conclusion from an observational study.',
          C: 'This correctly uses "tend to" language, reflecting an association rather than a causal claim.',
        },
        teachingPoint: 'Without random assignment to treatment and control groups, a study can only establish association, not causation.',
      },
      {
        id: 'statistical-claims-d5',
        skillSlug: 'statistical-claims',
        difficulty: 'hard',
        stimulus:
          'A city wants to estimate the proportion of residents who support a new park. They plan to survey 400 randomly selected residents. A statistician notes that a larger sample would reduce the margin of error.',
        question: 'If the survey sample size is increased from 400 to 1,600 residents (keeping everything else the same), what happens to the margin of error?',
        choices: [
          { label: 'A', text: 'It doubles.' },
          { label: 'B', text: 'It is cut in half.' },
          { label: 'C', text: 'It is cut to one-quarter.' },
          { label: 'D', text: 'It stays the same.' },
        ],
        correctAnswer: 'B',
        explanation:
          'The margin of error is proportional to 1/√n. Increasing n from 400 to 1600 multiplies n by 4, which multiplies √n by 2. So MOE is multiplied by 1/2 — it is cut in half.',
        wrongAnswerExplanations: {
          C: 'Cutting the MOE to one-quarter would require multiplying n by 16 (since MOE ∝ 1/√n, a factor of 4 reduction needs n × 16). Multiplying n by 4 only halves the MOE.',
          D: 'Sample size and margin of error are inversely related — a larger sample produces a smaller margin of error.',
        },
        teachingPoint: 'Margin of error scales as 1/√n; to cut the MOE in half, you must multiply the sample size by 4, not by 2.',
      },
    ],
  },
]
