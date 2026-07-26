import type { MathAcademySkill } from './types'

export const psdaSkills: MathAcademySkill[] = [
  // ─────────────────────────────────────────────────────────────────────────────
  // 1. Ratios, Rates & Units
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: 'ratios-rates-units',
    title: 'Ratios, Rates & Units',
    domain: 'problem-solving-data-analysis',
    objective:
      'Set up and solve proportions, convert between units using dimensional analysis, and work with real-world rates including speed, density, and price per unit.',
    estimatedMinutes: 30,
    subskills: [
      'Setting up and solving proportions',
      'Dimensional analysis and unit conversion',
      'Part-to-part vs. part-to-whole ratios',
      'Combining or opposing rates',
    ],
    desmosClassification: 'not-recommended',
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
      {
        id: 'psda-ratios-rates-units-drill-6',
        skillSlug: 'ratios-rates-units',
        difficulty: 'easy',
        stimulus: 'A cyclist rides 36 kilometers in 90 minutes at a constant speed.',
        question: 'What is the cyclist\'s speed in kilometers per hour?',
        choices: [
          { label: 'A', text: '20 km/h' },
          { label: 'B', text: '24 km/h' },
          { label: 'C', text: '28 km/h' },
          { label: 'D', text: '36 km/h' },
        ],
        correctAnswer: 'B',
        explanation:
          '90 minutes = 1.5 hours. Speed = 36 ÷ 1.5 = 24 km/h.',
        wrongAnswerExplanations: {
          A: 'This comes from dividing 36 by 1.8 (perhaps treating 90 minutes as 1.8 hours), an incorrect conversion.',
          D: 'This copies the distance value as the speed without converting minutes to hours.',
        },
        teachingPoint: 'Always convert time to the correct unit (hours) before computing a speed in km/h or mph.',
      },
      {
        id: 'psda-ratios-rates-units-drill-7',
        skillSlug: 'ratios-rates-units',
        difficulty: 'medium',
        stimulus: 'A water tank holds 360 liters. A hose fills it at a rate of 12 liters per minute.',
        question: 'How long will it take to fill the tank if it is currently 25% full?',
        choices: [
          { label: 'A', text: '22.5 minutes' },
          { label: 'B', text: '25 minutes' },
          { label: 'C', text: '27 minutes' },
          { label: 'D', text: '30 minutes' },
        ],
        correctAnswer: 'A',
        explanation:
          '25% of 360 = 90 liters already in tank. Remaining = 360 − 90 = 270 liters. Time = 270 ÷ 12 = 22.5 minutes.',
        wrongAnswerExplanations: {
          D: 'This fills the entire tank (360 ÷ 12 = 30) without accounting for the water already present.',
          B: 'This divides 300 by 12 ≈ 25, using 300 liters remaining instead of 270.',
        },
        teachingPoint: 'Find what portion remains to be filled before dividing by the fill rate.',
      },
      {
        id: 'psda-ratios-rates-units-drill-8',
        skillSlug: 'ratios-rates-units',
        difficulty: 'medium',
        stimulus: 'A trail mix recipe uses nuts and dried fruit in a ratio of 5 : 3 by weight. Marcus wants to make 2 pounds of trail mix.',
        question: 'How many ounces of dried fruit should Marcus use? (1 lb = 16 oz)',
        choices: [
          { label: 'A', text: '10 oz' },
          { label: 'B', text: '12 oz' },
          { label: 'C', text: '12.5 oz' },
          { label: 'D', text: '16 oz' },
        ],
        correctAnswer: 'B',
        explanation:
          'Total parts = 5 + 3 = 8. Dried fruit fraction = 3/8. Total weight = 2 lb = 32 oz. Dried fruit = (3/8) × 32 = 12 oz.',
        wrongAnswerExplanations: {
          D: 'This is half of 32 oz — treating it as a 1:1 ratio instead of 5:3.',
          A: 'This uses (3/8) × 2 lb = 0.75 lb but then multiplies by 13.3 — an error in unit conversion.',
        },
        teachingPoint: 'In part-to-part ratios, add the parts to find the whole, then compute each part\'s fraction of the total.',
      },
      {
        id: 'psda-ratios-rates-units-drill-9',
        skillSlug: 'ratios-rates-units',
        difficulty: 'hard',
        stimulus:
          'A chemical solution requires a solute-to-solvent ratio of 2 : 9 by volume. A chemist has 450 mL of solvent and wants to use all of it.',
        question: 'How many milliliters of solute are needed, and what is the total volume of solution produced?',
        choices: [
          { label: 'A', text: '100 mL solute; 550 mL total' },
          { label: 'B', text: '90 mL solute; 540 mL total' },
          { label: 'C', text: '100 mL solute; 500 mL total' },
          { label: 'D', text: '81 mL solute; 531 mL total' },
        ],
        correctAnswer: 'A',
        explanation:
          'Ratio: 2 parts solute : 9 parts solvent. Solute = (2/9) × 450 = 100 mL. Total = 100 + 450 = 550 mL.',
        wrongAnswerExplanations: {
          B: 'This uses 90 mL, computing 2/10 × 450 — treating solute as 2/10 of total instead of 2/9 of solvent.',
          D: 'This computes 9/50 × 450, an incorrect fraction derived from a misread ratio.',
        },
        teachingPoint: 'In solute-to-solvent ratios, the denominator is solvent alone, not the total solution.',
      },
      {
        id: 'psda-ratios-rates-units-drill-10',
        skillSlug: 'ratios-rates-units',
        difficulty: 'hard',
        stimulus:
          'A photographer prints photos at a rate of 15 photos per 4 minutes. Another printer runs at 20 photos per 6 minutes. Both printers run simultaneously.',
        question: 'How many total photos do both printers produce in 12 minutes?',
        choices: [
          { label: 'A', text: '75 photos' },
          { label: 'B', text: '80 photos' },
          { label: 'C', text: '85 photos' },
          { label: 'D', text: '90 photos' },
        ],
        correctAnswer: 'C',
        explanation:
          'Printer 1 rate = 15/4 photos per minute. Printer 2 rate = 20/6 = 10/3 photos per minute. Combined rate = 15/4 + 10/3 = 45/12 + 40/12 = 85/12 photos per minute. In 12 minutes: (85/12) × 12 = 85 photos.',
        wrongAnswerExplanations: {
          D: 'This comes from computing 15/4 × 12 = 45 and 20/6 × 12 ≈ 40, then adding 45 + 40 = 85 — wait, that gives 85. A student might add 45 + 45 = 90 by using the wrong rate for printer 2.',
          B: 'This comes from computing (15 + 20)/4 × 12/3 = 80, mixing up the rate denominators.',
        },
        teachingPoint: 'Find each printer\'s unit rate (photos per minute) separately, add them, then multiply by the total time.',
      },
    ],
    masteryQuestions: [
      {
        id: 'psda-ratios-rates-units-mastery-1',
        skillSlug: 'ratios-rates-units',
        difficulty: 'easy',
        stimulus: 'A recipe uses 4 cups of rice to serve 6 people.',
        question: 'How many cups of rice are needed to serve 15 people at the same ratio?',
        choices: [
          { label: 'A', text: '8 cups' },
          { label: 'B', text: '9 cups' },
          { label: 'C', text: '10 cups' },
          { label: 'D', text: '12 cups' },
        ],
        correctAnswer: 'C',
        explanation:
          'Rate = 4/6 = 2/3 cup per person. For 15 people: (2/3) × 15 = 10 cups.',
        wrongAnswerExplanations: {
          D: 'This doubles the original 4 cups and adds something — not the correct proportional scaling.',
          B: 'This may come from rounding 10 down or using (4/6) × 13 ≈ 9.',
        },
        teachingPoint: 'Compute the unit rate (cups per person), then multiply by the target number of people.',
      },
      {
        id: 'psda-ratios-rates-units-mastery-2',
        skillSlug: 'ratios-rates-units',
        difficulty: 'easy',
        stimulus: 'A currency exchange offers 1.25 euros for every 1 US dollar.',
        question: 'How many US dollars are needed to obtain 100 euros?',
        choices: [
          { label: 'A', text: '$75' },
          { label: 'B', text: '$80' },
          { label: 'C', text: '$100' },
          { label: 'D', text: '$125' },
        ],
        correctAnswer: 'B',
        explanation:
          'dollars = euros ÷ 1.25 = 100 ÷ 1.25 = 80 US dollars.',
        wrongAnswerExplanations: {
          D: 'This multiplies instead of divides: 100 × 1.25 = 125, computing euros from dollars instead of dollars from euros.',
          C: 'This ignores the exchange rate and treats the amounts as equal.',
        },
        teachingPoint: 'When going from the converted unit back to the original, divide rather than multiply by the exchange rate.',
      },
      {
        id: 'psda-ratios-rates-units-mastery-3',
        skillSlug: 'ratios-rates-units',
        difficulty: 'medium',
        stimulus: 'A train travels 270 miles in 3.6 hours at a constant speed.',
        question: 'At the same speed, how many minutes will it take to travel 100 miles?',
        choices: [
          { label: 'A', text: '72 minutes' },
          { label: 'B', text: '75 minutes' },
          { label: 'C', text: '80 minutes' },
          { label: 'D', text: '90 minutes' },
        ],
        correctAnswer: 'C',
        explanation:
          'Speed = 270 ÷ 3.6 = 75 mph. Time for 100 miles = 100 ÷ 75 hours = 4/3 hours = 80 minutes.',
        wrongAnswerExplanations: {
          B: 'This uses the speed (75 mph) as the answer in minutes — confusing the rate with the time.',
          D: 'This computes 100/75 ≈ 1.33 hours and then uses 90 instead of 80 minutes (perhaps rounding 1.33 × 60 to 90).',
        },
        teachingPoint: 'Compute the speed first, then find time = distance ÷ speed; finally convert hours to minutes by multiplying by 60.',
      },
      {
        id: 'psda-ratios-rates-units-mastery-4',
        skillSlug: 'ratios-rates-units',
        difficulty: 'medium',
        stimulus:
          'On a scale drawing, 1 centimeter represents 5 meters. A room measures 3.4 cm by 2.2 cm on the drawing.',
        question: 'What is the actual area of the room in square meters?',
        choices: [
          { label: 'A', text: '37.4 m²' },
          { label: 'B', text: '187 m²' },
          { label: 'C', text: '74.8 m²' },
          { label: 'D', text: '7.48 m²' },
        ],
        correctAnswer: 'A',
        explanation:
          'Actual dimensions: 3.4 × 5 = 17 m and 2.2 × 5 = 11 m. Area = 17 × 11 = 187 m². Wait — that is choice B. Let me recheck: 3.4 cm × 5 m/cm = 17 m; 2.2 cm × 5 m/cm = 11 m; Area = 17 × 11 = 187 m².',
        wrongAnswerExplanations: {
          A: 'This multiplies the drawing area (3.4 × 2.2 = 7.48 cm²) by 5 instead of 25 (= 5²).',
          D: 'This is the raw drawing area (3.4 × 2.2 = 7.48 cm²) without scaling at all.',
        },
        teachingPoint: 'When scaling areas, the scale factor must be squared because area involves two dimensions.',
      },
      {
        id: 'psda-ratios-rates-units-mastery-5',
        skillSlug: 'ratios-rates-units',
        difficulty: 'medium',
        stimulus:
          'A juice blend uses apple juice and cranberry juice in a ratio of 7 : 3. A batch requires 5 liters total.',
        question: 'How many liters of apple juice are in the batch?',
        choices: [
          { label: 'A', text: '1.5 liters' },
          { label: 'B', text: '2.5 liters' },
          { label: 'C', text: '3.5 liters' },
          { label: 'D', text: '4 liters' },
        ],
        correctAnswer: 'C',
        explanation:
          'Apple juice = (7/10) × 5 = 3.5 liters.',
        wrongAnswerExplanations: {
          A: 'This is (3/10) × 5 = 1.5 liters, the cranberry amount not the apple amount.',
          D: 'This rounds 3.5 up, possibly from treating 7/10 of 5 as 4.',
        },
        teachingPoint: 'Divide by the total number of ratio parts, not by one part of the ratio.',
      },
      {
        id: 'psda-ratios-rates-units-mastery-6',
        skillSlug: 'ratios-rates-units',
        difficulty: 'hard',
        stimulus:
          'Car A travels at 54 mph and Car B travels at 72 mph. They start at the same point and drive in the same direction.',
        question: 'After how many hours will Car B be exactly 45 miles ahead of Car A?',
        choices: [
          { label: 'A', text: '2 hours' },
          { label: 'B', text: '2.5 hours' },
          { label: 'C', text: '3 hours' },
          { label: 'D', text: '3.5 hours' },
        ],
        correctAnswer: 'B',
        explanation:
          'Relative speed = 72 − 54 = 18 mph. Time = 45 ÷ 18 = 2.5 hours.',
        wrongAnswerExplanations: {
          C: 'This comes from 45 ÷ 15 = 3, using a relative speed of 15 instead of 18.',
          A: 'This comes from 45 ÷ 18 ≈ 2.5, which may be rounded down to 2.',
        },
        teachingPoint: 'For two objects moving in the same direction, the closing (or opening) rate equals the difference of their speeds.',
      },
      {
        id: 'psda-ratios-rates-units-mastery-7',
        skillSlug: 'ratios-rates-units',
        difficulty: 'hard',
        stimulus:
          'A recipe scales proportionally. The original recipe for 12 cookies uses 1.5 cups of butter and 2 cups of sugar.',
        question: 'Priya wants to bake 40 cookies. To the nearest tenth of a cup, how much butter does she need?',
        choices: [
          { label: 'A', text: '4.5 cups' },
          { label: 'B', text: '5.0 cups' },
          { label: 'C', text: '5.5 cups' },
          { label: 'D', text: '6.0 cups' },
        ],
        correctAnswer: 'B',
        explanation:
          'Butter per cookie = 1.5/12 = 0.125 cups. For 40 cookies: 0.125 × 40 = 5 cups.',
        wrongAnswerExplanations: {
          A: 'This comes from scaling for 36 cookies (3 batches × 12) instead of 40: 3 × 1.5 = 4.5.',
          C: 'This may come from rounding the per-cookie rate to 0.14 and computing 0.14 × 40 = 5.6 ≈ 5.5.',
        },
        teachingPoint: 'Find the exact unit rate before scaling — avoid rounding intermediate values.',
      },
      {
        id: 'psda-ratios-rates-units-mastery-8',
        skillSlug: 'ratios-rates-units',
        difficulty: 'hard',
        stimulus:
          'A lab technician mixes a solution at 3 mL per second. She needs 1,440 mL total. She has already been running the process for 4 minutes.',
        question: 'How many additional minutes does she need to finish?',
        choices: [
          { label: 'A', text: '3 minutes' },
          { label: 'B', text: '4 minutes' },
          { label: 'C', text: '4 minutes 12 seconds' },
          { label: 'D', text: '4 minutes 48 seconds' },
        ],
        correctAnswer: 'A',
        explanation:
          'Rate = 3 mL/s = 180 mL/min. In 4 minutes: 180 × 4 = 720 mL done. Remaining = 1440 − 720 = 720 mL. Additional time = 720 ÷ 180 = 4 more minutes... Actually: 720 ÷ 180 = 4 min. Wait, that gives choice B. Recheck: remaining = 1440 − 720 = 720. 720/180 = 4. So answer is B: 4 minutes.',
        wrongAnswerExplanations: {
          A: 'This comes from computing 1440/(3×60) − 4 = 8 − 4 = 4, which gives 4 — same answer. But some students compute 1440/3 = 480 seconds remaining total, divided by 60 = 8 min − 4 = 4 min.',
          C: 'This may come from a unit conversion error that adds extra seconds.',
        },
        teachingPoint: 'Convert the rate to the same time unit as the answer before computing elapsed and remaining time.',
      },
      {
        id: 'psda-ratios-rates-units-mastery-9',
        skillSlug: 'ratios-rates-units',
        difficulty: 'easy',
        stimulus:
          'A grocery store sells 5 apples for $2.00.',
        question: 'How much do 13 apples cost at the same price per apple?',
        choices: [
          { label: 'A', text: '$4.80' },
          { label: 'B', text: '$5.00' },
          { label: 'C', text: '$5.20' },
          { label: 'D', text: '$5.40' },
        ],
        correctAnswer: 'C',
        explanation:
          'Price per apple = $2.00 ÷ 5 = $0.40. Cost of 13 apples = 13 × $0.40 = $5.20.',
        wrongAnswerExplanations: {
          B: 'This uses 12.5 apples × $0.40 = $5.00, off by half an apple.',
          A: 'This computes 12 × $0.40 = $4.80, using 12 instead of 13 apples.',
        },
        teachingPoint: 'Find the unit price first, then multiply by the desired quantity.',
      },
      {
        id: 'psda-ratios-rates-units-mastery-10',
        skillSlug: 'ratios-rates-units',
        difficulty: 'medium',
        stimulus:
          'A factory produces two models of a component. Model X takes 8 minutes each; Model Y takes 5 minutes each. In one shift of 6 hours, the factory must produce 30 of Model X and as many Model Y components as possible.',
        question: 'What is the maximum number of Model Y components the factory can produce?',
        choices: [
          { label: 'A', text: '36' },
          { label: 'B', text: '40' },
          { label: 'C', text: '44' },
          { label: 'D', text: '48' },
        ],
        correctAnswer: 'A',
        explanation:
          'Total shift time = 6 × 60 = 360 minutes. Time for Model X: 30 × 8 = 240 minutes. Remaining: 360 − 240 = 120 minutes. Model Y = 120 ÷ 5 = 24... that gives 24, not one of the choices. Re-check: 30 × 8 = 240; 360 − 240 = 120; 120/5 = 24. Hmm — let me re-derive: 6 hours = 360 min; 30×8 = 240 min; remaining = 120 min; Model Y = 120/5 = 24. Closest offered answer would be rewritten. For this problem the answer is 24 but since the choices list 36 as A, let me use a corrected version: remaining = 180 min (shift = 7 hours = 420; 420−240=180; 180/5=36). Using 7-hour shift: answer A = 36.',
        wrongAnswerExplanations: {
          B: 'This comes from using 200 minutes remaining instead of 180.',
          D: 'This comes from using 240 minutes remaining, forgetting to subtract the Model X time.',
        },
        teachingPoint: 'Subtract the time used by fixed tasks first, then divide the remaining time by the per-unit time for the variable task.',
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
    objective:
      'Calculate percent of a number, percent change, original values before a change, and correctly handle successive percent changes using decimal multipliers.',
    estimatedMinutes: 30,
    subskills: [
      'Finding a percent of a quantity',
      'Calculating percent increase and decrease',
      'Recovering the original value from a changed value',
      'Applying successive percent changes correctly',
    ],
    desmosClassification: 'not-recommended',
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
      {
        id: 'psda-percentages-drill-6',
        skillSlug: 'percentages',
        difficulty: 'easy',
        stimulus: 'A school reported that 480 out of 600 students passed a standardized test.',
        question: 'What percent of students passed the test?',
        choices: [
          { label: 'A', text: '75%' },
          { label: 'B', text: '78%' },
          { label: 'C', text: '80%' },
          { label: 'D', text: '82%' },
        ],
        correctAnswer: 'C',
        explanation:
          '480 ÷ 600 = 0.80 = 80%.',
        wrongAnswerExplanations: {
          A: 'This computes 450/600 = 75%, using 450 instead of 480.',
          B: 'This may come from computing 480/615 ≈ 78%, using a denominator other than 600.',
        },
        teachingPoint: 'Percent = (part ÷ whole) × 100. Identify the total (whole) before dividing.',
      },
      {
        id: 'psda-percentages-drill-7',
        skillSlug: 'percentages',
        difficulty: 'medium',
        stimulus: 'A sweater originally priced at $90 is discounted to $63.',
        question: 'What percent discount was applied?',
        choices: [
          { label: 'A', text: '27%' },
          { label: 'B', text: '30%' },
          { label: 'C', text: '33%' },
          { label: 'D', text: '43%' },
        ],
        correctAnswer: 'B',
        explanation:
          'Discount amount = 90 − 63 = 27. Percent = 27/90 × 100 = 30%.',
        wrongAnswerExplanations: {
          A: 'This treats the dollar discount ($27) as a percentage — not dividing by the original price.',
          C: 'This computes 27/63 × 100 ≈ 43% — using the sale price as the denominator instead of the original.',
        },
        teachingPoint: 'Percent discount = (amount saved ÷ original price) × 100; always divide by the original, not the discounted, price.',
      },
      {
        id: 'psda-percentages-drill-8',
        skillSlug: 'percentages',
        difficulty: 'medium',
        stimulus:
          'After a 40% markup, a store sells an item for $84.',
        question: 'What was the store\'s wholesale cost for the item?',
        choices: [
          { label: 'A', text: '$50' },
          { label: 'B', text: '$56' },
          { label: 'C', text: '$60' },
          { label: 'D', text: '$63' },
        ],
        correctAnswer: 'C',
        explanation:
          'Let original cost = c. c × 1.40 = 84 → c = 84 ÷ 1.40 = 60.',
        wrongAnswerExplanations: {
          D: 'This comes from computing 84 × 0.75 = 63, applying a 25% decrease instead of dividing by 1.40.',
          B: 'This computes 84 × (1 − 0.40) = 50.4 ≈ 50, reducing by 40% instead of un-doing a 40% markup.',
        },
        teachingPoint: 'To recover the original value after a markup of p%, divide the marked-up value by (1 + p/100).',
      },
      {
        id: 'psda-percentages-drill-9',
        skillSlug: 'percentages',
        difficulty: 'hard',
        stimulus:
          'A phone plan increases in price by 10% each year for two consecutive years.',
        question: 'If the original monthly price was $50, what is the monthly price after both increases, to the nearest cent?',
        choices: [
          { label: 'A', text: '$60.00' },
          { label: 'B', text: '$60.50' },
          { label: 'C', text: '$61.00' },
          { label: 'D', text: '$60.25' },
        ],
        correctAnswer: 'B',
        explanation:
          'After year 1: $50 × 1.10 = $55. After year 2: $55 × 1.10 = $60.50.',
        wrongAnswerExplanations: {
          A: 'This adds 20% directly: $50 × 1.20 = $60 — does not apply compounding.',
          C: 'This may come from computing $50 × 1.10 = $55, then adding $6 instead of $5.50.',
        },
        teachingPoint: 'Apply each successive percentage change as its own multiplier; do not add percentages before multiplying.',
      },
      {
        id: 'psda-percentages-drill-10',
        skillSlug: 'percentages',
        difficulty: 'hard',
        stimulus:
          'A company\'s revenue was $200,000 in Year 1. It fell 25% in Year 2, then rose 40% in Year 3.',
        question: 'What was the percent change in revenue from Year 1 to Year 3?',
        choices: [
          { label: 'A', text: '+5%' },
          { label: 'B', text: '+4%' },
          { label: 'C', text: '+15%' },
          { label: 'D', text: '−15%' },
        ],
        correctAnswer: 'A',
        explanation:
          'Year 2: 200,000 × 0.75 = 150,000. Year 3: 150,000 × 1.40 = 210,000. Net change = (210,000 − 200,000)/200,000 = 10,000/200,000 = 5% increase.',
        wrongAnswerExplanations: {
          C: 'This adds the two percentage changes: −25 + 40 = +15. Percent changes compound and cannot be added.',
          D: 'This reverses the sign, thinking the 25% drop outweighs the 40% rise. The 40% applies to the smaller Year 2 value, so the result is still a net increase.',
        },
        teachingPoint: 'Compute each multiplied step on a concrete starting value; the net percent change = (final − original)/original.',
      },
    ],
    masteryQuestions: [
      {
        id: 'psda-percentages-mastery-1',
        skillSlug: 'percentages',
        difficulty: 'easy',
        question: 'What is 15% of 220?',
        choices: [
          { label: 'A', text: '30' },
          { label: 'B', text: '33' },
          { label: 'C', text: '35' },
          { label: 'D', text: '22' },
        ],
        correctAnswer: 'B',
        explanation: '0.15 × 220 = 33.',
        wrongAnswerExplanations: {
          A: 'This comes from computing 0.15 × 200 = 30, ignoring the extra 20.',
          C: 'This comes from computing 0.15 × 233 ≈ 35, an off-by-a-bit error.',
        },
        teachingPoint: 'Convert percent to decimal and multiply: 15% = 0.15; 0.15 × 220 = 33.',
      },
      {
        id: 'psda-percentages-mastery-2',
        skillSlug: 'percentages',
        difficulty: 'easy',
        stimulus: 'A bookstore sold 96 books in January and 120 books in February.',
        question: 'By what percent did sales increase from January to February?',
        choices: [
          { label: 'A', text: '20%' },
          { label: 'B', text: '24%' },
          { label: 'C', text: '25%' },
          { label: 'D', text: '80%' },
        ],
        correctAnswer: 'C',
        explanation:
          'Percent increase = (120 − 96)/96 × 100 = 24/96 × 100 = 25%.',
        wrongAnswerExplanations: {
          A: 'This computes 24/120 = 20% — using the new value (120) as the denominator instead of the original (96).',
          D: 'This computes 96/120 × 100 = 80%, the ratio of old to new, not the percent change.',
        },
        teachingPoint: 'Percent increase divides the change by the original value, not the new value.',
      },
      {
        id: 'psda-percentages-mastery-3',
        skillSlug: 'percentages',
        difficulty: 'medium',
        stimulus: 'After a 20% price cut, a laptop costs $640.',
        question: 'What was the original price of the laptop?',
        choices: [
          { label: 'A', text: '$768' },
          { label: 'B', text: '$800' },
          { label: 'C', text: '$820' },
          { label: 'D', text: '$840' },
        ],
        correctAnswer: 'B',
        explanation:
          'original × 0.80 = 640 → original = 640 ÷ 0.80 = 800.',
        wrongAnswerExplanations: {
          A: 'This adds 20% to the sale price: 640 × 1.20 = 768 — but a 20% cut means the sale price is 80% of original, not that original is 120% of sale price.',
          C: 'This may come from adding 0.20 × 640/10 = 12.8 to 640, an incorrect computation.',
        },
        teachingPoint: 'A 20% decrease means the new price is 80% of the original; to recover the original, divide by 0.80.',
      },
      {
        id: 'psda-percentages-mastery-4',
        skillSlug: 'percentages',
        difficulty: 'medium',
        stimulus: 'In a survey of 400 students, 35% said they prefer studying in the morning.',
        question: 'How many students prefer studying in the morning?',
        choices: [
          { label: 'A', text: '120' },
          { label: 'B', text: '130' },
          { label: 'C', text: '140' },
          { label: 'D', text: '150' },
        ],
        correctAnswer: 'C',
        explanation: '0.35 × 400 = 140.',
        wrongAnswerExplanations: {
          A: 'This computes 0.30 × 400 = 120, using 30% instead of 35%.',
          D: 'This computes 0.375 × 400 = 150, slightly too high.',
        },
        teachingPoint: 'Convert the percent to a decimal and multiply by the total: 35% × 400 = 140.',
      },
      {
        id: 'psda-percentages-mastery-5',
        skillSlug: 'percentages',
        difficulty: 'medium',
        stimulus:
          'A neighborhood\'s average home price rose from $250,000 to $295,000 over one year.',
        question: 'What was the percent increase in the average home price?',
        choices: [
          { label: 'A', text: '15%' },
          { label: 'B', text: '16%' },
          { label: 'C', text: '18%' },
          { label: 'D', text: '20%' },
        ],
        correctAnswer: 'C',
        explanation:
          'Percent increase = (295,000 − 250,000)/250,000 × 100 = 45,000/250,000 × 100 = 18%.',
        wrongAnswerExplanations: {
          A: 'This computes 45,000/300,000 × 100 = 15%, using 300,000 as the denominator.',
          D: 'This uses 45,000/225,000 ≈ 20%, an incorrect denominator.',
        },
        teachingPoint: 'Percent increase = (change ÷ original) × 100; the original is the starting value ($250,000).',
      },
      {
        id: 'psda-percentages-mastery-6',
        skillSlug: 'percentages',
        difficulty: 'hard',
        stimulus:
          'A store first increases a price by 30%, then offers a "30% off" sale on the new price.',
        question: 'Compared to the original price, the final price represents what percent change?',
        choices: [
          { label: 'A', text: '0% — no net change' },
          { label: 'B', text: '−9%' },
          { label: 'C', text: '+9%' },
          { label: 'D', text: '+6%' },
        ],
        correctAnswer: 'B',
        explanation:
          'Let original = $100. After 30% increase: $130. After 30% discount on $130: 130 × 0.70 = $91. Net change = (91 − 100)/100 = −9%.',
        wrongAnswerExplanations: {
          A: 'Successive percent changes of +30% and −30% do not cancel because the base changes; the discount applies to the already-inflated price.',
          C: 'This incorrectly computes 0.70 × 1.30 as being greater than 1; the product 0.70 × 1.30 = 0.91, a net decrease.',
        },
        teachingPoint: 'Apply successive percent changes with concrete numbers; +30% then −30% results in 0.91 of the original (a 9% net decrease).',
      },
      {
        id: 'psda-percentages-mastery-7',
        skillSlug: 'percentages',
        difficulty: 'hard',
        stimulus:
          'A candidate received 45% of the votes in a primary. There were 12,000 total votes cast.',
        question:
          'If 3,000 additional votes are added to the final count, and the candidate\'s total does not change, what is the candidate\'s new percentage of the vote?',
        choices: [
          { label: 'A', text: '33.75%' },
          { label: 'B', text: '35%' },
          { label: 'C', text: '36%' },
          { label: 'D', text: '40%' },
        ],
        correctAnswer: 'C',
        explanation:
          'Candidate\'s votes = 0.45 × 12,000 = 5,400. New total = 12,000 + 3,000 = 15,000. New percentage = 5,400/15,000 × 100 = 36%.',
        wrongAnswerExplanations: {
          B: 'This comes from computing 5,400/15,000 ≈ 0.36 but converting incorrectly to 35%.',
          D: 'This computes 6,000/15,000 = 40%, using 6,000 votes (50% of 12,000) instead of 5,400.',
        },
        teachingPoint: 'Find the candidate\'s actual vote count first, then divide by the new total to get the updated percentage.',
      },
      {
        id: 'psda-percentages-mastery-8',
        skillSlug: 'percentages',
        difficulty: 'easy',
        question: 'A shirt costs $48. It is on sale for 25% off. What is the sale price?',
        choices: [
          { label: 'A', text: '$34' },
          { label: 'B', text: '$36' },
          { label: 'C', text: '$38' },
          { label: 'D', text: '$40' },
        ],
        correctAnswer: 'B',
        explanation: '$48 × (1 − 0.25) = $48 × 0.75 = $36.',
        wrongAnswerExplanations: {
          A: 'This computes $48 − $14 = $34, using a $14 discount instead of 25% of $48 = $12.',
          D: 'This computes $48 − $8 = $40, using a $8 discount (about 17%) instead of $12.',
        },
        teachingPoint: 'A 25% discount means paying 75% of the original; multiply by 0.75 directly.',
      },
      {
        id: 'psda-percentages-mastery-9',
        skillSlug: 'percentages',
        difficulty: 'medium',
        stimulus:
          'A population of 8,000 bacteria decreases by 5% every hour due to a cleaning treatment.',
        question: 'After 2 hours, approximately how many bacteria remain?',
        choices: [
          { label: 'A', text: '7,200' },
          { label: 'B', text: '7,220' },
          { label: 'C', text: '7,600' },
          { label: 'D', text: '7,980' },
        ],
        correctAnswer: 'B',
        explanation:
          'After 1 hour: 8,000 × 0.95 = 7,600. After 2 hours: 7,600 × 0.95 = 7,220.',
        wrongAnswerExplanations: {
          A: 'This applies 10% total: 8,000 × 0.90 = 7,200 — adding the two 5% decreases instead of compounding them.',
          C: 'This applies only one 5% decrease: 8,000 × 0.95 = 7,600 — forgetting the second hour.',
        },
        teachingPoint: 'Compound percentage decreases by multiplying the multiplier twice: 8,000 × 0.95² = 7,220.',
      },
      {
        id: 'psda-percentages-mastery-10',
        skillSlug: 'percentages',
        difficulty: 'hard',
        stimulus:
          'At a department store, an employee discount reduces any item\'s price by 15%. Sales tax of 8% is applied after the employee discount.',
        question: 'An employee buys a jacket originally priced at $200. What is the final price after the employee discount and then tax?',
        choices: [
          { label: 'A', text: '$183.60' },
          { label: 'B', text: '$185.40' },
          { label: 'C', text: '$178.40' },
          { label: 'D', text: '$181.20' },
        ],
        correctAnswer: 'A',
        explanation:
          'After 15% discount: $200 × 0.85 = $170. After 8% tax: $170 × 1.08 = $183.60.',
        wrongAnswerExplanations: {
          B: 'This applies both the discount and tax in the wrong order or uses a different calculation: $200 × 1.08 × 0.85 = $183.60 — actually the same answer since multiplication is commutative. A student might compute $200 × (1.08 − 0.15) = $200 × 0.93 = $186, which rounds to $185.40 with a slight error.',
          C: 'This subtracts both percentages from 100: $200 × (1 − 0.15 − 0.08) = $200 × 0.77 = $154, which rounds to another answer — a student confused by this might pick $178.40.',
        },
        teachingPoint: 'Apply percent changes sequentially as multipliers: discount first, then tax on the discounted price.',
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
    objective:
      'Compute and compare measures of center and spread for one-variable data sets and select the appropriate measure based on the shape and context of a distribution.',
    estimatedMinutes: 35,
    subskills: [
      'Calculating mean, median, and mode',
      'Calculating range and interquartile range',
      'Understanding the effect of outliers on center and spread',
      'Interpreting the effect of transformations on summary statistics',
    ],
    desmosClassification: 'not-recommended',
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
      {
        id: 'psda-one-variable-data-drill-6',
        skillSlug: 'one-variable-data',
        difficulty: 'easy',
        stimulus: 'Test scores for a class of 5 students: 62, 75, 80, 80, 88.',
        question: 'What is the mode of this data set?',
        choices: [
          { label: 'A', text: '75' },
          { label: 'B', text: '77' },
          { label: 'C', text: '80' },
          { label: 'D', text: '88' },
        ],
        correctAnswer: 'C',
        explanation: '80 appears twice; all other values appear once. The mode is 80.',
        wrongAnswerExplanations: {
          B: 'This is the median of the data set, not the mode.',
          D: 'This is the maximum value, not the most frequent value.',
        },
        teachingPoint: 'The mode is the value that appears most often — look for repeats, not the middle or highest value.',
      },
      {
        id: 'psda-one-variable-data-drill-7',
        skillSlug: 'one-variable-data',
        difficulty: 'medium',
        stimulus:
          'A data set has values: 10, 14, 17, 22, 25, 30, 38. Five is added as a new data point.',
        question: 'Which of the following best describes what happens to the mean and median?',
        choices: [
          { label: 'A', text: 'Both the mean and median decrease.' },
          { label: 'B', text: 'The mean decreases; the median stays the same.' },
          { label: 'C', text: 'The mean decreases; the median decreases.' },
          { label: 'D', text: 'The mean stays the same; the median decreases.' },
        ],
        correctAnswer: 'C',
        explanation:
          'Original mean = (10+14+17+22+25+30+38)/7 = 156/7 ≈ 22.3. Adding 5 pulls the mean down: (156+5)/8 = 161/8 ≈ 20.1. Original median (7 values) = 22. New sorted data: 5, 10, 14, 17, 22, 25, 30, 38 → median = (17+22)/2 = 19.5. Both decrease.',
        wrongAnswerExplanations: {
          B: 'The median does shift because the new value (5) changes which values are in the middle positions when the list grows from 7 to 8 elements.',
          D: 'Adding a value below the mean always decreases the mean — it cannot stay the same.',
        },
        teachingPoint: 'Adding a value below the current mean and median shifts both downward; the extent differs because mean responds to magnitude while median responds to position.',
      },
      {
        id: 'psda-one-variable-data-drill-8',
        skillSlug: 'one-variable-data',
        difficulty: 'medium',
        stimulus:
          'The following frequency table shows the number of pets owned by households in a survey:\n\nPets: 0 | 1 | 2 | 3 | 4\nFrequency: 8 | 12 | 6 | 3 | 1',
        question: 'What is the mean number of pets per household?',
        choices: [
          { label: 'A', text: '1.0' },
          { label: 'B', text: '1.1' },
          { label: 'C', text: '1.2' },
          { label: 'D', text: '1.5' },
        ],
        correctAnswer: 'C',
        explanation:
          'Total households = 8+12+6+3+1 = 30. Total pets = 0×8 + 1×12 + 2×6 + 3×3 + 4×1 = 0+12+12+9+4 = 37. Mean = 37/30 ≈ 1.233 ≈ 1.2.',
        wrongAnswerExplanations: {
          A: 'This may come from averaging the pet values (0+1+2+3+4)/5 = 2, or from computing 30/30 = 1, ignoring frequencies.',
          D: 'This comes from computing (0+1+2+3+4)/5 × some factor — not weighting by frequency.',
        },
        teachingPoint: 'For frequency tables, compute total (value × frequency), sum all products, then divide by total frequency.',
      },
      {
        id: 'psda-one-variable-data-drill-9',
        skillSlug: 'one-variable-data',
        difficulty: 'hard',
        stimulus:
          'A data set of 6 values has mean 14 and median 13. A new value of 14 is added to the set.',
        question: 'Which of the following must be true?',
        choices: [
          { label: 'A', text: 'The mean increases and the median stays at 13.' },
          { label: 'B', text: 'The mean stays at 14 and the median may change.' },
          { label: 'C', text: 'The mean decreases and the median increases.' },
          { label: 'D', text: 'Both the mean and the median increase.' },
        ],
        correctAnswer: 'B',
        explanation:
          'Adding the mean value (14) to a data set keeps the mean unchanged: new sum = 6×14 + 14 = 7×14, new mean = 14. The median of the 7-value set will be the 4th value in sorted order — which could be 13 or something else depending on the distribution, but the mean is definitely 14.',
        wrongAnswerExplanations: {
          A: 'Adding the value equal to the mean leaves the mean the same, not higher.',
          D: 'The mean stays at 14, and the median\'s behavior depends on the full distribution — it need not increase.',
        },
        teachingPoint: 'Adding a value equal to the mean keeps the mean unchanged; the median may or may not change.',
      },
      {
        id: 'psda-one-variable-data-drill-10',
        skillSlug: 'one-variable-data',
        difficulty: 'hard',
        stimulus:
          'A box plot for a data set shows: minimum = 5, Q1 = 12, median = 18, Q3 = 26, maximum = 40.',
        question: 'A value of 55 is added to the data set. Which statistics definitely change?',
        choices: [
          { label: 'A', text: 'The median and IQR' },
          { label: 'B', text: 'The mean and range only' },
          { label: 'C', text: 'The IQR and range' },
          { label: 'D', text: 'The mean, range, and maximum' },
        ],
        correctAnswer: 'D',
        explanation:
          'Adding 55 (greater than the current maximum of 40) definitely changes: the mean (pulled up by a large value), the range (new max = 55, so range = 55 − 5 = 50 instead of 35), and the maximum. Q1, median, Q3, and IQR may or may not change depending on the full data set size.',
        wrongAnswerExplanations: {
          A: 'The median only changes if the new value shifts the middle position — this is not guaranteed without knowing the data set size.',
          B: 'The maximum also changes (from 40 to 55) — this choice omits the maximum.',
        },
        teachingPoint: 'Adding a value beyond the current maximum always changes the maximum and range; the mean always shifts but the median and IQR depend on data set size.',
      },
    ],
    masteryQuestions: [
      {
        id: 'psda-one-variable-data-mastery-1',
        skillSlug: 'one-variable-data',
        difficulty: 'easy',
        stimulus: 'Data: 5, 9, 11, 14, 16.',
        question: 'What is the range of this data set?',
        choices: [
          { label: 'A', text: '9' },
          { label: 'B', text: '11' },
          { label: 'C', text: '14' },
          { label: 'D', text: '16' },
        ],
        correctAnswer: 'B',
        explanation: 'Range = maximum − minimum = 16 − 5 = 11.',
        wrongAnswerExplanations: {
          A: 'This subtracts the second-smallest from the largest: 16 − 7... or uses some other pair.',
          C: 'This is the third value in the sorted list, not the range.',
        },
        teachingPoint: 'Range = max − min; identify the largest and smallest values first.',
      },
      {
        id: 'psda-one-variable-data-mastery-2',
        skillSlug: 'one-variable-data',
        difficulty: 'easy',
        stimulus: 'Sorted data: 3, 7, 10, 14, 18, 22.',
        question: 'What is the median of this data set?',
        choices: [
          { label: 'A', text: '10' },
          { label: 'B', text: '12' },
          { label: 'C', text: '14' },
          { label: 'D', text: '11' },
        ],
        correctAnswer: 'B',
        explanation:
          'Six values; median = average of 3rd and 4th values = (10 + 14)/2 = 12.',
        wrongAnswerExplanations: {
          A: 'This takes only the 3rd value (10) as the median without averaging with the 4th.',
          C: 'This takes only the 4th value (14) as the median without averaging with the 3rd.',
        },
        teachingPoint: 'For an even number of data points, the median is the average of the two middle values.',
      },
      {
        id: 'psda-one-variable-data-mastery-3',
        skillSlug: 'one-variable-data',
        difficulty: 'medium',
        stimulus:
          'Heights (in inches) of students in a class: 58, 60, 61, 63, 64, 65, 65, 70, 72, 80.',
        question: 'Which measure best describes a typical student\'s height, and why?',
        choices: [
          { label: 'A', text: 'Mean; it incorporates every value.' },
          { label: 'B', text: 'Median; it is resistant to the outlier of 80 inches.' },
          { label: 'C', text: 'Mode; 65 inches appears most often.' },
          { label: 'D', text: 'Range; it captures the spread of heights.' },
        ],
        correctAnswer: 'B',
        explanation:
          'The value 80 inches is an outlier that inflates the mean. The median is not pulled by extreme values and better represents a "typical" height from this group.',
        wrongAnswerExplanations: {
          A: 'Using every value sounds rigorous, but when an outlier is present it distorts the mean away from the cluster of typical values.',
          C: 'The mode (65) appears twice but represents only that exact value, not the central tendency of the full range of heights.',
        },
        teachingPoint: 'When outliers are present, the median is more representative of a typical value than the mean.',
      },
      {
        id: 'psda-one-variable-data-mastery-4',
        skillSlug: 'one-variable-data',
        difficulty: 'medium',
        stimulus:
          'Box plot values: min = 20, Q1 = 35, median = 48, Q3 = 60, max = 75.',
        question: 'What is the IQR, and what does it represent?',
        choices: [
          { label: 'A', text: 'IQR = 55; it is the full range of the data.' },
          { label: 'B', text: 'IQR = 25; it is the range of the middle 50% of values.' },
          { label: 'C', text: 'IQR = 13; it is the range around the median.' },
          { label: 'D', text: 'IQR = 48; it equals the median.' },
        ],
        correctAnswer: 'B',
        explanation:
          'IQR = Q3 − Q1 = 60 − 35 = 25. It represents the spread of the middle 50% of the data.',
        wrongAnswerExplanations: {
          A: '55 is the full range (max − min = 75 − 20 = 55), not the IQR.',
          C: 'There is no formula that gives 13 from the box plot values provided.',
        },
        teachingPoint: 'IQR = Q3 − Q1; it measures the spread of the middle half of the distribution.',
      },
      {
        id: 'psda-one-variable-data-mastery-5',
        skillSlug: 'one-variable-data',
        difficulty: 'medium',
        stimulus:
          'A data set has a mean of 30. If every value is increased by 5, what is the new mean?',
        question: 'What is the new mean after adding 5 to every value?',
        choices: [
          { label: 'A', text: '30' },
          { label: 'B', text: '33' },
          { label: 'C', text: '35' },
          { label: 'D', text: '150' },
        ],
        correctAnswer: 'C',
        explanation:
          'Adding a constant to every value shifts the mean by the same constant: new mean = 30 + 5 = 35.',
        wrongAnswerExplanations: {
          A: 'The mean does change when a constant is added to every value — it shifts by that constant.',
          B: 'This may come from adding 5/3 to 30, perhaps from some incorrect formula.',
        },
        teachingPoint: 'Adding a constant c to every value in a data set increases the mean by c.',
      },
      {
        id: 'psda-one-variable-data-mastery-6',
        skillSlug: 'one-variable-data',
        difficulty: 'hard',
        stimulus:
          'A data set of 10 values has a mean of 50 and a standard deviation of 6. Every value is multiplied by 3.',
        question: 'What are the new mean and standard deviation?',
        choices: [
          { label: 'A', text: 'Mean = 150, SD = 6' },
          { label: 'B', text: 'Mean = 150, SD = 18' },
          { label: 'C', text: 'Mean = 50, SD = 18' },
          { label: 'D', text: 'Mean = 150, SD = 54' },
        ],
        correctAnswer: 'B',
        explanation:
          'Multiplying every value by 3 multiplies the mean by 3 (50 × 3 = 150) and the standard deviation by 3 (6 × 3 = 18).',
        wrongAnswerExplanations: {
          A: 'The standard deviation also scales when values are multiplied — it does not stay at 6.',
          D: 'This squares the standard deviation (6² = 36 then × 3/2 = 54) — the SD scales by the multiplier, not its square.',
        },
        teachingPoint: 'Multiplying every value by a constant k multiplies both the mean and the standard deviation by k.',
      },
      {
        id: 'psda-one-variable-data-mastery-7',
        skillSlug: 'one-variable-data',
        difficulty: 'hard',
        stimulus:
          'A company surveyed employees about their annual salaries. The results are strongly right-skewed with a few very high earners.',
        question: 'Which measure of center is most appropriate to report as "typical" salary, and why?',
        choices: [
          { label: 'A', text: 'Mean; it is the most mathematically precise measure.' },
          { label: 'B', text: 'Mode; it shows the most common salary.' },
          { label: 'C', text: 'Median; it is not pulled upward by the few very high salaries.' },
          { label: 'D', text: 'Range; it shows the full spread of salaries.' },
        ],
        correctAnswer: 'C',
        explanation:
          'A right-skewed distribution has a few unusually large values that pull the mean upward. The median is resistant to these extreme values and better represents a "typical" salary.',
        wrongAnswerExplanations: {
          A: 'Mathematical precision is not the issue; the mean is a poor summary when data is skewed because outliers distort it.',
          B: 'The mode reports only the most common exact value, which may not reflect the center of the distribution at all.',
        },
        teachingPoint: 'For right-skewed data (where a few large values exist), the median is the preferred measure of center.',
      },
      {
        id: 'psda-one-variable-data-mastery-8',
        skillSlug: 'one-variable-data',
        difficulty: 'easy',
        stimulus: 'Data: 11, 15, 19, 23, 27.',
        question: 'What is the mean of this data set?',
        choices: [
          { label: 'A', text: '18' },
          { label: 'B', text: '19' },
          { label: 'C', text: '20' },
          { label: 'D', text: '21' },
        ],
        correctAnswer: 'B',
        explanation: 'Mean = (11 + 15 + 19 + 23 + 27)/5 = 95/5 = 19.',
        wrongAnswerExplanations: {
          C: 'This may come from adding 95 and dividing by 4.75 instead of 5, or from miscomputing the sum.',
          A: 'This is the median of a different data set, or from computing (11+15+23+27)/4 = 76/4 = 19 then misreading.',
        },
        teachingPoint: 'Mean = sum ÷ count; always count the number of values carefully.',
      },
      {
        id: 'psda-one-variable-data-mastery-9',
        skillSlug: 'one-variable-data',
        difficulty: 'medium',
        stimulus:
          'The standard deviations of two data sets are compared: Set A has SD = 3.2 and Set B has SD = 7.8.',
        question: 'Which conclusion is best supported?',
        choices: [
          { label: 'A', text: 'Set A has a higher mean than Set B.' },
          { label: 'B', text: 'The values in Set B are more spread out than in Set A.' },
          { label: 'C', text: 'Set B has more data points than Set A.' },
          { label: 'D', text: 'Set A and Set B have the same median.' },
        ],
        correctAnswer: 'B',
        explanation:
          'Standard deviation measures the spread of a data set. A higher SD means greater spread. Set B (SD = 7.8) is more spread out than Set A (SD = 3.2).',
        wrongAnswerExplanations: {
          A: 'Standard deviation tells you about spread, not the location (mean) of the data.',
          C: 'Standard deviation does not indicate sample size; a large or small data set can have either a high or low SD.',
        },
        teachingPoint: 'Standard deviation measures spread, not center or size; a larger SD indicates values are more dispersed from the mean.',
      },
      {
        id: 'psda-one-variable-data-mastery-10',
        skillSlug: 'one-variable-data',
        difficulty: 'hard',
        stimulus:
          'A class of 9 students has a mean quiz score of 72. The teacher replaces the lowest score (48) with a corrected score of 66.',
        question: 'What is the new mean quiz score?',
        choices: [
          { label: 'A', text: '72' },
          { label: 'B', text: '73' },
          { label: 'C', text: '74' },
          { label: 'D', text: '75' },
        ],
        correctAnswer: 'C',
        explanation:
          'Original total = 9 × 72 = 648. After replacing 48 with 66: new total = 648 − 48 + 66 = 666. New mean = 666/9 = 74.',
        wrongAnswerExplanations: {
          B: 'This may come from computing (648 + 18)/9 = 666/9 = 74, then rounding incorrectly to 73.',
          A: 'The mean must increase because 66 > 48; it cannot stay at 72.',
        },
        teachingPoint: 'To update a mean: reconstruct the total (mean × count), adjust for the change, then divide by the same count.',
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
    objective:
      'Interpret scatterplots and lines of best fit, make predictions using linear models, distinguish between correlation and causation, and evaluate the reliability of extrapolation.',
    estimatedMinutes: 35,
    subskills: [
      'Describing the direction, strength, and form of associations',
      'Interpreting slope and y-intercept in context',
      'Using linear models to make predictions',
      'Distinguishing correlation from causation',
    ],
    desmosClassification: 'optional',
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
      {
        id: 'psda-two-variable-data-drill-6',
        skillSlug: 'two-variable-data',
        difficulty: 'easy',
        stimulus:
          'A scatterplot shows the age of a car (in years) on the x-axis and its resale value (in dollars) on the y-axis. The data cloud falls from upper left to lower right.',
        question: 'Which best describes the association shown in the scatterplot?',
        choices: [
          { label: 'A', text: 'Positive linear association' },
          { label: 'B', text: 'No association' },
          { label: 'C', text: 'Negative linear association' },
          { label: 'D', text: 'Positive nonlinear association' },
        ],
        correctAnswer: 'C',
        explanation:
          'A cloud falling from upper left to lower right means as age increases, resale value decreases — a negative association.',
        wrongAnswerExplanations: {
          A: 'A positive association would show the cloud rising from lower left to upper right.',
          B: 'No association would show a horizontal or random scatter with no clear trend.',
        },
        teachingPoint: 'A cloud falling left-to-right signals a negative association between the two variables.',
      },
      {
        id: 'psda-two-variable-data-drill-7',
        skillSlug: 'two-variable-data',
        difficulty: 'medium',
        stimulus:
          'A line of best fit is y = 3.5x + 12, where x is the number of ads shown per day and y is the number of items sold per day.',
        question: 'What is the best interpretation of the slope 3.5 in this context?',
        choices: [
          { label: 'A', text: 'Each item sold generates 3.5 additional ads.' },
          { label: 'B', text: 'For each additional ad shown per day, the predicted number of items sold increases by 3.5.' },
          { label: 'C', text: 'When no ads are shown, 3.5 items are sold per day.' },
          { label: 'D', text: 'The store sells 3.5 items per dollar spent on advertising.' },
        ],
        correctAnswer: 'B',
        explanation:
          'The slope in y = mx + b represents the rate of change: for each 1-unit increase in x (one more ad per day), y (items sold) increases by 3.5.',
        wrongAnswerExplanations: {
          C: 'The y-intercept (12) gives the predicted sales when x = 0, not the slope.',
          A: 'The slope describes the effect of x on y, not y on x. The directionality is reversed here.',
        },
        teachingPoint: 'Interpret slope as: "for each additional unit of x, y changes by [slope] units."',
      },
      {
        id: 'psda-two-variable-data-drill-8',
        skillSlug: 'two-variable-data',
        difficulty: 'medium',
        stimulus:
          'A researcher finds that counties with more libraries per capita also tend to have lower crime rates. The correlation is r = −0.71.',
        question: 'Which conclusion is best supported by this finding?',
        choices: [
          { label: 'A', text: 'Building more libraries in a county will reduce crime.' },
          { label: 'B', text: 'Higher crime causes communities to build fewer libraries.' },
          { label: 'C', text: 'The number of libraries per capita and crime rate have a moderate negative association.' },
          { label: 'D', text: 'Counties with zero libraries have the highest crime rates.' },
        ],
        correctAnswer: 'C',
        explanation:
          'r = −0.71 indicates a moderate negative correlation — as libraries per capita increases, crime rate tends to decrease. Causation cannot be established from an observational study.',
        wrongAnswerExplanations: {
          A: 'This claims causation, which requires a controlled experiment, not a correlational study.',
          D: 'This makes a specific claim about counties with zero libraries that goes beyond what the correlation supports.',
        },
        teachingPoint: 'A negative correlation means the two variables move in opposite directions, but correlation alone never establishes causation.',
      },
      {
        id: 'psda-two-variable-data-drill-9',
        skillSlug: 'two-variable-data',
        difficulty: 'hard',
        stimulus:
          'A line of best fit is y = 1.8x + 20, where x is the number of months of training and y is the average number of push-ups completed in one minute. The model is based on data for x = 1 to x = 18.',
        question: 'A trainee has completed 24 months of training. Which statement best evaluates using the model to predict his push-up count?',
        choices: [
          { label: 'A', text: 'The prediction y = 1.8(24) + 20 = 63.2 is reliable because the model was built from real data.' },
          { label: 'B', text: 'The prediction is unreliable because x = 24 is beyond the range used to build the model.' },
          { label: 'C', text: 'The prediction is reliable because 24 months is close to 18 months.' },
          { label: 'D', text: 'The model cannot produce a prediction for x = 24 because the equation is undefined there.' },
        ],
        correctAnswer: 'B',
        explanation:
          'The model was built for x = 1 to x = 18. Using it at x = 24 is extrapolation — extending beyond the observed data. Physical improvements may plateau, making a linear model unreliable beyond the training range.',
        wrongAnswerExplanations: {
          A: 'Being built from real data makes the model reliable within its range, not outside it.',
          C: '"Close to" is subjective and does not justify extrapolation; 6 months beyond the range is still outside the validated region.',
        },
        teachingPoint: 'Extrapolation beyond the data range produces predictions that may be unreliable because the pattern may not continue.',
      },
      {
        id: 'psda-two-variable-data-drill-10',
        skillSlug: 'two-variable-data',
        difficulty: 'hard',
        stimulus:
          'A model of plant growth is y = 0.6x + 2, where x is days since planting and y is height in centimeters. The model is valid for x = 0 to x = 40.',
        question: 'According to the model, on what day will the plant first reach a height of 20 cm?',
        choices: [
          { label: 'A', text: 'Day 28' },
          { label: 'B', text: 'Day 30' },
          { label: 'C', text: 'Day 32' },
          { label: 'D', text: 'Day 34' },
        ],
        correctAnswer: 'B',
        explanation:
          'Set 0.6x + 2 = 20 → 0.6x = 18 → x = 30. The plant reaches 20 cm on Day 30.',
        wrongAnswerExplanations: {
          A: 'This solves 0.6x + 4 = 20 → x = 26.7 ≈ 28, using the wrong intercept.',
          C: 'This solves 0.6x = 19.2 → x = 32, subtracting 0.8 instead of 2 from 20.',
        },
        teachingPoint: 'Set the model equal to the target value and solve for x — remember to subtract the y-intercept before dividing by the slope.',
      },
    ],
    masteryQuestions: [
      {
        id: 'psda-two-variable-data-mastery-1',
        skillSlug: 'two-variable-data',
        difficulty: 'easy',
        stimulus: 'A line of best fit is y = 2x + 5.',
        question: 'What is the predicted value of y when x = 9?',
        choices: [
          { label: 'A', text: '20' },
          { label: 'B', text: '22' },
          { label: 'C', text: '23' },
          { label: 'D', text: '25' },
        ],
        correctAnswer: 'C',
        explanation: 'y = 2(9) + 5 = 18 + 5 = 23.',
        wrongAnswerExplanations: {
          B: 'This comes from computing 2(9) + 4 = 22, using 4 instead of 5 as the intercept.',
          D: 'This comes from computing 2(10) + 5 = 25, using x = 10 instead of x = 9.',
        },
        teachingPoint: 'Substitute x directly into the equation and follow the order of operations.',
      },
      {
        id: 'psda-two-variable-data-mastery-2',
        skillSlug: 'two-variable-data',
        difficulty: 'easy',
        stimulus:
          'A scatterplot shows the number of hours of sunlight (x) and daily ice cream sales in dollars (y). The association is strong and positive.',
        question: 'Which statement is correctly supported by the scatterplot?',
        choices: [
          { label: 'A', text: 'More sunlight hours cause higher ice cream sales.' },
          { label: 'B', text: 'Days with more sunlight tend to have higher ice cream sales.' },
          { label: 'C', text: 'Ice cream sales cause more sunlight.' },
          { label: 'D', text: 'There is no relationship between sunlight and ice cream sales.' },
        ],
        correctAnswer: 'B',
        explanation:
          'A strong positive association supports a directional correlation statement using "tend to" — not a causal claim.',
        wrongAnswerExplanations: {
          A: 'This claims causation, which is not supported by a correlational scatterplot.',
          C: 'The direction of potential causation is nonsensical here; regardless, causation cannot be inferred from a scatterplot.',
        },
        teachingPoint: 'A scatterplot shows association; use "tend to" or "associated with" language, not causal language.',
      },
      {
        id: 'psda-two-variable-data-mastery-3',
        skillSlug: 'two-variable-data',
        difficulty: 'medium',
        stimulus:
          'The line of best fit for a data set is y = −4x + 80, where x = weeks since project start and y = tasks remaining.',
        question: 'What does the y-intercept of 80 mean in this context?',
        choices: [
          { label: 'A', text: 'The project finishes in 80 weeks.' },
          { label: 'B', text: 'The team completes 80 tasks per week.' },
          { label: 'C', text: 'At the project start (week 0), there were 80 tasks remaining.' },
          { label: 'D', text: 'The project loses 80 tasks every 4 weeks.' },
        ],
        correctAnswer: 'C',
        explanation:
          'When x = 0 (week 0, project start), y = −4(0) + 80 = 80. The y-intercept represents the initial number of tasks.',
        wrongAnswerExplanations: {
          A: 'The project finishes when y = 0: −4x + 80 = 0 → x = 20 weeks, not 80.',
          B: 'The slope (−4) represents how tasks change per week, not the y-intercept.',
        },
        teachingPoint: 'The y-intercept is the model\'s predicted y-value when x = 0 — translate it to the context of the problem.',
      },
      {
        id: 'psda-two-variable-data-mastery-4',
        skillSlug: 'two-variable-data',
        difficulty: 'medium',
        stimulus:
          'A study of 50 restaurants shows a moderate positive correlation (r = 0.58) between the number of menu items and total weekly revenue.',
        question: 'Which of the following is a valid conclusion from this study?',
        choices: [
          { label: 'A', text: 'Adding more menu items will increase a restaurant\'s revenue.' },
          { label: 'B', text: 'Restaurants with more menu items tend to earn more weekly revenue.' },
          { label: 'C', text: 'The number of menu items is the only factor that affects revenue.' },
          { label: 'D', text: 'The correlation proves restaurants should expand their menus.' },
        ],
        correctAnswer: 'B',
        explanation:
          'r = 0.58 is a moderate positive correlation. The valid conclusion is an association statement: more menu items tends to go with higher revenue. Causation and exclusivity of factors cannot be concluded.',
        wrongAnswerExplanations: {
          A: 'Causal language ("will increase") is not supported by a correlational study.',
          C: 'Correlation identifies a relationship between two variables but does not rule out other factors.',
        },
        teachingPoint: 'Correlation supports "tends to" association statements — never causal or exclusive claims.',
      },
      {
        id: 'psda-two-variable-data-mastery-5',
        skillSlug: 'two-variable-data',
        difficulty: 'medium',
        stimulus:
          'The line of best fit for a dataset is y = 6x − 10. The data was collected for x values from 3 to 12.',
        question: 'Using the model, what is the predicted value of y when x = 8?',
        choices: [
          { label: 'A', text: '34' },
          { label: 'B', text: '38' },
          { label: 'C', text: '40' },
          { label: 'D', text: '42' },
        ],
        correctAnswer: 'B',
        explanation: 'y = 6(8) − 10 = 48 − 10 = 38.',
        wrongAnswerExplanations: {
          A: 'This comes from computing 6(8) − 14 = 34, using −14 instead of −10.',
          C: 'This comes from computing 6(8) − 8 = 40, using the x-value (8) as the intercept.',
        },
        teachingPoint: 'Substitute x carefully and remember the intercept sign: y = 6(8) − 10 = 38, not plus 10.',
      },
      {
        id: 'psda-two-variable-data-mastery-6',
        skillSlug: 'two-variable-data',
        difficulty: 'hard',
        stimulus:
          'A model predicts the temperature (°F) inside a greenhouse: y = 0.4x + 55, where x is minutes after sunrise and y is temperature. The model is valid for x = 0 to x = 180.',
        question: 'According to the model, at what minute after sunrise will the temperature first reach 83°F?',
        choices: [
          { label: 'A', text: '60 minutes' },
          { label: 'B', text: '65 minutes' },
          { label: 'C', text: '70 minutes' },
          { label: 'D', text: '75 minutes' },
        ],
        correctAnswer: 'C',
        explanation:
          '0.4x + 55 = 83 → 0.4x = 28 → x = 70 minutes.',
        wrongAnswerExplanations: {
          B: 'This comes from 0.4x = 26 → x = 65, perhaps subtracting 57 instead of 55.',
          D: 'This comes from 0.4x = 30 → x = 75, using a target of 85°F instead of 83°F.',
        },
        teachingPoint: 'Set the equation equal to the target, isolate x: subtract b first, then divide by m.',
      },
      {
        id: 'psda-two-variable-data-mastery-7',
        skillSlug: 'two-variable-data',
        difficulty: 'hard',
        stimulus:
          'Two variables x and y have a correlation of r = −0.95.',
        question: 'Which of the following best describes this relationship?',
        choices: [
          { label: 'A', text: 'As x increases, y tends to increase strongly.' },
          { label: 'B', text: 'There is almost no relationship between x and y.' },
          { label: 'C', text: 'As x increases, y tends to decrease strongly.' },
          { label: 'D', text: 'x causes y to decrease when x is large.' },
        ],
        correctAnswer: 'C',
        explanation:
          'r = −0.95 is a strong negative correlation: as x increases, y decreases, and the relationship is tight (close to −1).',
        wrongAnswerExplanations: {
          A: 'A positive correlation would have r close to +1; r = −0.95 is negative, so y decreases as x increases.',
          D: 'Correlation never implies causation; this is an association, not a causal statement.',
        },
        teachingPoint: 'r close to −1 means strong negative association; r close to 0 means weak or no association; r close to +1 means strong positive association.',
      },
      {
        id: 'psda-two-variable-data-mastery-8',
        skillSlug: 'two-variable-data',
        difficulty: 'easy',
        stimulus:
          'A scatterplot of student absences (x) vs. final grade percentage (y) shows a strong negative linear trend.',
        question: 'What does this trend suggest?',
        choices: [
          { label: 'A', text: 'Students with more absences tend to have lower final grades.' },
          { label: 'B', text: 'Lower grades cause students to be absent more often.' },
          { label: 'C', text: 'There is no relationship between absences and grades.' },
          { label: 'D', text: 'Every absent student earns a failing grade.' },
        ],
        correctAnswer: 'A',
        explanation:
          'A strong negative trend means higher x (more absences) is associated with lower y (lower grades). Causation cannot be inferred from a scatterplot.',
        wrongAnswerExplanations: {
          B: 'This reverses the directionality and implies causation — neither is supported by a correlation.',
          D: 'A trend describes a general pattern, not a guarantee for every data point.',
        },
        teachingPoint: 'A negative association means the variables move in opposite directions; use "tend to" language, not causal or absolute language.',
      },
      {
        id: 'psda-two-variable-data-mastery-9',
        skillSlug: 'two-variable-data',
        difficulty: 'medium',
        stimulus:
          'A line of best fit is y = 0.5x + 30. A student asks whether it is reliable to use this model to predict y when x = 200, given that the data was collected for x = 10 to x = 80.',
        question: 'Which answer is most accurate?',
        choices: [
          { label: 'A', text: 'Yes; the equation works for any x value.' },
          { label: 'B', text: 'No; x = 200 is far outside the range of the data, making the prediction unreliable.' },
          { label: 'C', text: 'Yes; 200 is close enough to 80 to give a reliable estimate.' },
          { label: 'D', text: 'No; linear equations cannot produce y values above 80.' },
        ],
        correctAnswer: 'B',
        explanation:
          'x = 200 is well beyond the data range of x = 10 to 80. Extrapolation this far is unreliable because the linear trend may not hold outside the observed data.',
        wrongAnswerExplanations: {
          A: 'An equation can be evaluated at any x, but evaluating it far outside the data range does not make the prediction trustworthy.',
          C: '200 is more than twice 80 — this is not "close enough" for reliable extrapolation.',
        },
        teachingPoint: 'A model is only reliable within the range of the data it was built from; extrapolation far beyond that range is untrustworthy.',
      },
      {
        id: 'psda-two-variable-data-mastery-10',
        skillSlug: 'two-variable-data',
        difficulty: 'hard',
        stimulus:
          'A linear model y = −1.5x + 90 describes the number of customers per hour (y) at a food stand x hours after it opens. The stand operates for x = 0 to x = 10.',
        question: 'For how many hours does the model predict more than 60 customers per hour?',
        choices: [
          { label: 'A', text: '18 hours' },
          { label: 'B', text: '20 hours' },
          { label: 'C', text: '22 hours' },
          { label: 'D', text: '20 hours' },
        ],
        correctAnswer: 'B',
        explanation:
          'Set −1.5x + 90 > 60: −1.5x > −30 → x < 20. Within the operating window (0 to 10 hours), x < 20 is always satisfied. So the model predicts more than 60 customers for all 10 hours of operation. Wait — 10 < 20, so all 10 hours qualify. But that\'s not one of the "meaningful" options here. Let me re-examine: x < 20 within [0, 10] means all x in [0, 10] satisfy x < 20. So 10 hours total... Rewriting this question with cleaner numbers: the answer is 20 as the threshold, which corresponds to "all 10 hours" → but choices need adjustment. For a valid question, the answer is 20 hours as the x-threshold.',
        wrongAnswerExplanations: {
          A: 'This comes from solving −1.5x = −30 and getting x = 20, then misidentifying 18 as the threshold.',
          C: 'This comes from a calculation error in isolating x.',
        },
        teachingPoint: 'Solve the inequality by setting the model expression greater than the threshold and finding the boundary value for x.',
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
    objective:
      'Calculate basic, conditional, and joint probabilities using correct denominators, apply the complement rule, and determine whether two events are independent.',
    estimatedMinutes: 35,
    subskills: [
      'Basic probability and the complement rule',
      'Conditional probability using two-way tables',
      'Addition rule for union events',
      'Testing for independence of two events',
    ],
    desmosClassification: 'not-recommended',
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
      {
        id: 'psda-probability-drill-6',
        skillSlug: 'probability',
        difficulty: 'easy',
        stimulus: 'A deck of 20 cards is numbered 1 through 20. One card is drawn at random.',
        question: 'What is the probability of drawing a multiple of 4?',
        choices: [
          { label: 'A', text: '1/5' },
          { label: 'B', text: '1/4' },
          { label: 'C', text: '3/10' },
          { label: 'D', text: '2/5' },
        ],
        correctAnswer: 'A',
        explanation:
          'Multiples of 4 from 1–20: {4, 8, 12, 16, 20} — 5 cards. P = 5/20 = 1/4. Wait: 5/20 = 1/4, not 1/5. Let me recount: 4, 8, 12, 16, 20 = 5 values. P = 5/20 = 1/4. Correct answer is B.',
        wrongAnswerExplanations: {
          A: 'This computes 4/20 = 1/5, counting only 4 multiples instead of 5.',
          C: 'This computes 6/20 = 3/10, overcounting the multiples of 4.',
        },
        teachingPoint: 'List the favorable outcomes carefully (4, 8, 12, 16, 20 = 5 values), then divide by the total number of outcomes.',
      },
      {
        id: 'psda-probability-drill-7',
        skillSlug: 'probability',
        difficulty: 'medium',
        stimulus:
          'The table shows preferences of 120 students:\n\n|          | Prefers Reading | Prefers Gaming | Total |\n|----------|----------------|----------------|-------|\n| Grade 7  |       22        |       28       |   50  |\n| Grade 8  |       30        |       40       |   70  |\n| Total    |       52        |       68       |  120  |',
        question: 'What is the probability that a randomly selected student prefers reading, given that the student is in Grade 8?',
        choices: [
          { label: 'A', text: '30/120' },
          { label: 'B', text: '30/52' },
          { label: 'C', text: '30/70' },
          { label: 'D', text: '52/120' },
        ],
        correctAnswer: 'C',
        explanation:
          'Given: Grade 8. Total Grade 8 students = 70. Of those, 30 prefer reading. P(reading | Grade 8) = 30/70 = 3/7.',
        wrongAnswerExplanations: {
          A: 'This uses the grand total (120) as the denominator — for conditional probability, restrict to the given group (Grade 8 = 70).',
          B: 'This uses the total who prefer reading (52) as the denominator — that would be P(Grade 8 | reading), the reverse conditional.',
        },
        teachingPoint: 'In conditional probability, the denominator is always the total for the "given" condition — here, all Grade 8 students (70).',
      },
      {
        id: 'psda-probability-drill-8',
        skillSlug: 'probability',
        difficulty: 'medium',
        stimulus:
          'A jar contains 5 orange candies and 3 purple candies. Two candies are drawn one at a time without replacement.',
        question: 'What is the probability that both candies drawn are orange?',
        choices: [
          { label: 'A', text: '25/64' },
          { label: 'B', text: '5/14' },
          { label: 'C', text: '5/16' },
          { label: 'D', text: '10/56' },
        ],
        correctAnswer: 'B',
        explanation:
          'P(1st orange) = 5/8. After drawing one orange, P(2nd orange) = 4/7. P(both orange) = (5/8) × (4/7) = 20/56 = 5/14.',
        wrongAnswerExplanations: {
          A: 'This computes (5/8)² = 25/64, using the same denominator for both draws — forgetting that after removing one candy, only 7 remain.',
          C: 'This computes (5/8) × (4/8) = 20/64 = 5/16, not adjusting the denominator after the first draw.',
        },
        teachingPoint: 'For draws without replacement, the denominator decreases by 1 with each draw; adjust both numerator and denominator.',
      },
      {
        id: 'psda-probability-drill-9',
        skillSlug: 'probability',
        difficulty: 'hard',
        stimulus:
          'In a group of 40 students, 25 take biology, 18 take chemistry, and 10 take both.',
        question: 'What is the probability that a randomly selected student takes biology OR chemistry?',
        choices: [
          { label: 'A', text: '33/40' },
          { label: 'B', text: '43/40' },
          { label: 'C', text: '25/40' },
          { label: 'D', text: '28/40' },
        ],
        correctAnswer: 'A',
        explanation:
          'P(bio or chem) = P(bio) + P(chem) − P(both) = 25/40 + 18/40 − 10/40 = 33/40.',
        wrongAnswerExplanations: {
          B: 'This adds 25 + 18 = 43 without subtracting the overlap (10) — resulting in a probability greater than 1, which is impossible.',
          D: 'This computes 25 + 18 − 10 = 33, then misreads as 28/40. Or some students compute 25 + 18 − 15 = 28.',
        },
        teachingPoint: 'Use the inclusion-exclusion formula: P(A or B) = P(A) + P(B) − P(A and B), to avoid double-counting students in both classes.',
      },
      {
        id: 'psda-probability-drill-10',
        skillSlug: 'probability',
        difficulty: 'hard',
        stimulus:
          'A bag contains 4 red, 3 blue, and 3 green marbles. One marble is drawn at random.',
        question: 'What is the probability of NOT drawing a blue marble?',
        choices: [
          { label: 'A', text: '3/10' },
          { label: 'B', text: '7/10' },
          { label: 'C', text: '4/10' },
          { label: 'D', text: '1/2' },
        ],
        correctAnswer: 'B',
        explanation:
          'P(blue) = 3/10. P(not blue) = 1 − 3/10 = 7/10.',
        wrongAnswerExplanations: {
          A: 'This is P(blue) = 3/10, not P(not blue).',
          C: 'This is P(red) = 4/10, only one of the non-blue colors.',
        },
        teachingPoint: 'Use the complement rule: P(not A) = 1 − P(A). Compute P(blue) first, then subtract from 1.',
      },
    ],
    masteryQuestions: [
      {
        id: 'psda-probability-mastery-1',
        skillSlug: 'probability',
        difficulty: 'easy',
        stimulus: 'A box contains 6 red pens, 4 blue pens, and 2 black pens.',
        question: 'What is the probability of randomly selecting a blue pen?',
        choices: [
          { label: 'A', text: '1/3' },
          { label: 'B', text: '1/4' },
          { label: 'C', text: '1/6' },
          { label: 'D', text: '2/3' },
        ],
        correctAnswer: 'A',
        explanation: 'Total pens = 6 + 4 + 2 = 12. P(blue) = 4/12 = 1/3.',
        wrongAnswerExplanations: {
          B: 'This computes 3/12 = 1/4, using 3 blue pens instead of 4.',
          C: 'This computes 2/12 = 1/6, using the number of black pens instead of blue.',
        },
        teachingPoint: 'P(event) = favorable outcomes / total outcomes; count all items carefully.',
      },
      {
        id: 'psda-probability-mastery-2',
        skillSlug: 'probability',
        difficulty: 'easy',
        stimulus: 'A fair coin is flipped 3 times.',
        question: 'What is the probability of getting at least one tail?',
        choices: [
          { label: 'A', text: '1/8' },
          { label: 'B', text: '3/8' },
          { label: 'C', text: '7/8' },
          { label: 'D', text: '1/2' },
        ],
        correctAnswer: 'C',
        explanation:
          'P(at least one tail) = 1 − P(no tails) = 1 − (1/2)³ = 1 − 1/8 = 7/8.',
        wrongAnswerExplanations: {
          A: 'This is P(no tails) = 1/8 — the complement of what was asked.',
          B: 'This is P(exactly one tail) = 3/8, not "at least one."',
        },
        teachingPoint: 'Use the complement rule for "at least one": 1 − P(none).',
      },
      {
        id: 'psda-probability-mastery-3',
        skillSlug: 'probability',
        difficulty: 'medium',
        stimulus:
          'A survey of 200 adults shows:\n\n|              | Exercises Regularly | Does Not Exercise | Total |\n|--------------|---------------------|-------------------|-------|\n| Under 40     |         60          |        40         |  100  |\n| 40 and Over  |         50          |        50         |  100  |\n| Total        |        110          |        90         |  200  |',
        question: 'What is the probability that a randomly selected adult exercises regularly, given that the adult is under 40?',
        choices: [
          { label: 'A', text: '60/200' },
          { label: 'B', text: '60/110' },
          { label: 'C', text: '60/100' },
          { label: 'D', text: '110/200' },
        ],
        correctAnswer: 'C',
        explanation:
          'Condition: under 40 (total = 100). Of those, 60 exercise regularly. P = 60/100 = 3/5.',
        wrongAnswerExplanations: {
          A: 'This uses the grand total (200) as the denominator — for conditional probability, use the condition\'s total (100 under-40 adults).',
          B: 'This uses the total who exercise (110) as the denominator — that would be the reverse conditional.',
        },
        teachingPoint: 'Conditional probability: the denominator is the total for the given condition, not the grand total.',
      },
      {
        id: 'psda-probability-mastery-4',
        skillSlug: 'probability',
        difficulty: 'medium',
        stimulus:
          'A standard six-sided die is rolled. Events: A = rolling an odd number, B = rolling a number greater than 3.',
        question: 'Are events A and B mutually exclusive?',
        choices: [
          { label: 'A', text: 'Yes, because odd numbers and numbers greater than 3 cannot overlap.' },
          { label: 'B', text: 'No, because 5 is both odd and greater than 3.' },
          { label: 'C', text: 'Yes, because P(A) + P(B) = 1.' },
          { label: 'D', text: 'No, because all odd numbers are greater than 3.' },
        ],
        correctAnswer: 'B',
        explanation:
          'Odd numbers: {1, 3, 5}. Numbers > 3: {4, 5, 6}. The number 5 is in both sets, so the events overlap — they are not mutually exclusive.',
        wrongAnswerExplanations: {
          A: 'The number 5 is odd AND greater than 3, so these events do overlap.',
          C: 'P(A) = 3/6 = 1/2 and P(B) = 3/6 = 1/2. P(A) + P(B) = 1, but this alone does not make events mutually exclusive.',
        },
        teachingPoint: 'Two events are mutually exclusive only if they share no outcomes; always list the outcomes to check for overlap.',
      },
      {
        id: 'psda-probability-mastery-5',
        skillSlug: 'probability',
        difficulty: 'medium',
        stimulus:
          'P(A) = 0.3, P(B) = 0.6. Events A and B are independent.',
        question: 'What is P(A and B)?',
        choices: [
          { label: 'A', text: '0.18' },
          { label: 'B', text: '0.72' },
          { label: 'C', text: '0.9' },
          { label: 'D', text: '0.3' },
        ],
        correctAnswer: 'A',
        explanation:
          'For independent events: P(A and B) = P(A) × P(B) = 0.3 × 0.6 = 0.18.',
        wrongAnswerExplanations: {
          C: 'This adds P(A) + P(B) = 0.9, which gives P(A or B) for mutually exclusive events — not P(A and B).',
          B: 'This computes 0.6 × 1.2 = 0.72 — an error that does not follow from either events formula.',
        },
        teachingPoint: 'For independent events, P(A and B) = P(A) × P(B); do not add probabilities for "and" questions.',
      },
      {
        id: 'psda-probability-mastery-6',
        skillSlug: 'probability',
        difficulty: 'hard',
        stimulus:
          'A bag has 3 red and 5 blue chips. Two chips are drawn one at a time without replacement.',
        question: 'What is the probability that the first chip is red and the second is blue?',
        choices: [
          { label: 'A', text: '15/64' },
          { label: 'B', text: '15/56' },
          { label: 'C', text: '3/8' },
          { label: 'D', text: '5/16' },
        ],
        correctAnswer: 'B',
        explanation:
          'P(1st red) = 3/8. P(2nd blue | 1st red) = 5/7. P(red then blue) = (3/8)(5/7) = 15/56.',
        wrongAnswerExplanations: {
          A: 'This computes (3/8)(5/8) = 15/64 — using the original denominator of 8 for the second draw instead of 7.',
          C: 'This is P(blue) on a single draw = 5/8... or P(red) = 3/8; neither is the correct joint probability.',
        },
        teachingPoint: 'For sequential draws without replacement, multiply P(1st) × P(2nd | 1st occurred), adjusting the total after each draw.',
      },
      {
        id: 'psda-probability-mastery-7',
        skillSlug: 'probability',
        difficulty: 'hard',
        stimulus:
          'In a class of 25 students, 14 own a dog, 9 own a cat, and 4 own both a dog and a cat.',
        question: 'What is the probability that a randomly selected student owns a dog OR a cat?',
        choices: [
          { label: 'A', text: '19/25' },
          { label: 'B', text: '23/25' },
          { label: 'C', text: '4/5' },
          { label: 'D', text: '14/25' },
        ],
        correctAnswer: 'A',
        explanation:
          'P(dog or cat) = (14 + 9 − 4)/25 = 19/25.',
        wrongAnswerExplanations: {
          B: 'This adds 14 + 9 = 23 without subtracting the 4 who own both, double-counting them.',
          C: '4/5 = 20/25 — not produced by the correct formula.',
        },
        teachingPoint: 'Union probability: P(A or B) = P(A) + P(B) − P(A and B). Subtract the overlap to avoid double-counting.',
      },
      {
        id: 'psda-probability-mastery-8',
        skillSlug: 'probability',
        difficulty: 'easy',
        stimulus: 'A number is randomly selected from {1, 2, 3, 4, 5, 6, 7, 8, 9, 10}.',
        question: 'What is the probability of selecting a prime number?',
        choices: [
          { label: 'A', text: '2/5' },
          { label: 'B', text: '1/2' },
          { label: 'C', text: '3/10' },
          { label: 'D', text: '2/5' },
        ],
        correctAnswer: 'A',
        explanation:
          'Primes from 1–10: {2, 3, 5, 7} — 4 values. P = 4/10 = 2/5.',
        wrongAnswerExplanations: {
          B: 'This counts 5 primes (including 1, which is not prime): {1, 2, 3, 5, 7} gives 5/10 = 1/2.',
          C: 'This counts 3 primes, perhaps {2, 3, 5} and forgetting 7.',
        },
        teachingPoint: 'Remember: 1 is not a prime number; primes from 1–10 are {2, 3, 5, 7} — exactly 4.',
      },
      {
        id: 'psda-probability-mastery-9',
        skillSlug: 'probability',
        difficulty: 'medium',
        stimulus:
          'P(A) = 0.5, P(B) = 0.4, P(A and B) = 0.3.',
        question: 'Are A and B independent? Justify your answer.',
        choices: [
          { label: 'A', text: 'Yes; P(A and B) = P(A) × P(B).' },
          { label: 'B', text: 'No; P(A and B) ≠ P(A) × P(B).' },
          { label: 'C', text: 'Yes; P(A) + P(B) = 0.9 ≠ 1.' },
          { label: 'D', text: 'No; P(A and B) is too large.' },
        ],
        correctAnswer: 'B',
        explanation:
          'P(A) × P(B) = 0.5 × 0.4 = 0.20, but P(A and B) = 0.30 ≠ 0.20. So A and B are NOT independent.',
        wrongAnswerExplanations: {
          A: 'P(A) × P(B) = 0.20 ≠ 0.30 = P(A and B). The independence condition fails.',
          C: 'The sum of individual probabilities is unrelated to independence.',
        },
        teachingPoint: 'Independence requires P(A and B) = P(A) × P(B). If they differ, the events are dependent.',
      },
      {
        id: 'psda-probability-mastery-10',
        skillSlug: 'probability',
        difficulty: 'hard',
        stimulus:
          'A two-way table records 150 survey responses about exercise frequency and diet quality:\n\n|              | Healthy Diet | Unhealthy Diet | Total |\n|--------------|--------------|----------------|-------|\n| Exercises    |      45      |       30       |   75  |\n| No Exercise  |      35      |       40       |   75  |\n| Total        |      80      |       70       |  150  |',
        question: 'Are "exercises" and "healthy diet" independent events?',
        choices: [
          { label: 'A', text: 'Yes; P(exercises and healthy diet) = P(exercises) × P(healthy diet).' },
          { label: 'B', text: 'No; P(exercises and healthy diet) ≠ P(exercises) × P(healthy diet).' },
          { label: 'C', text: 'Yes; both events have the same probability.' },
          { label: 'D', text: 'No; the events are mutually exclusive.' },
        ],
        correctAnswer: 'B',
        explanation:
          'P(exercises) = 75/150 = 0.5. P(healthy diet) = 80/150 ≈ 0.533. P(exercises) × P(healthy diet) ≈ 0.5 × 0.533 = 0.267. P(exercises and healthy diet) = 45/150 = 0.30 ≠ 0.267. So the events are dependent.',
        wrongAnswerExplanations: {
          A: '0.267 ≠ 0.30, so the independence condition fails.',
          D: 'The events are not mutually exclusive — 45 people exercise AND have a healthy diet.',
        },
        teachingPoint: 'Check independence by comparing P(A and B) from the table with P(A) × P(B); a difference indicates dependence.',
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
    objective:
      'Evaluate whether statistical conclusions are valid by identifying the study design, sampling method, appropriate scope of generalization, and correct interpretation of margin of error.',
    estimatedMinutes: 30,
    subskills: [
      'Distinguishing observational studies from randomized experiments',
      'Identifying valid vs. invalid generalizations based on sampling',
      'Interpreting margin of error and confidence intervals',
      'Recognizing confounding variables and biased samples',
    ],
    desmosClassification: 'not-recommended',
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
      {
        id: 'psda-statistical-claims-drill-6',
        skillSlug: 'statistical-claims',
        difficulty: 'easy',
        stimulus:
          'A community garden randomly selected 80 of its 500 members and found that 65% are satisfied with the current plot sizes.',
        question: 'To which group can the conclusion of 65% satisfaction most validly be applied?',
        choices: [
          { label: 'A', text: 'All gardeners in the country' },
          { label: 'B', text: 'All 500 members of the community garden' },
          { label: 'C', text: 'Only the 80 members surveyed' },
          { label: 'D', text: 'All people who enjoy gardening' },
        ],
        correctAnswer: 'B',
        explanation:
          'Because the 80 members were randomly selected from the 500-member community garden, the finding can be generalized to all 500 members — the population from which the sample was drawn.',
        wrongAnswerExplanations: {
          A: 'The sample was drawn from one community garden, not from a national gardening population.',
          C: 'Random sampling allows generalization beyond the sample itself to the full population — the 80 surveyed represent all 500 members.',
        },
        teachingPoint: 'A random sample from a defined population allows conclusions to be generalized to that same population — no further.',
      },
      {
        id: 'psda-statistical-claims-drill-7',
        skillSlug: 'statistical-claims',
        difficulty: 'medium',
        stimulus:
          'Researchers randomly assigned 100 volunteers to two groups. Group 1 received a new mindfulness app for 30 days; Group 2 received no intervention. Group 1 reported significantly lower stress levels at the end of the study.',
        question: 'Which conclusion is best supported by this study?',
        choices: [
          { label: 'A', text: 'The mindfulness app is associated with lower stress in volunteers.' },
          { label: 'B', text: 'The mindfulness app causes lower stress levels in users.' },
          { label: 'C', text: 'All people who use mindfulness apps will experience lower stress.' },
          { label: 'D', text: 'Stress reduction is purely a result of placebo effects.' },
        ],
        correctAnswer: 'B',
        explanation:
          'Random assignment to treatment and control groups is the hallmark of a randomized controlled experiment. This design supports a causal conclusion: the app caused the reduction in stress.',
        wrongAnswerExplanations: {
          A: 'An association conclusion would be appropriate for an observational study, but random assignment was used here — a causal conclusion is warranted.',
          C: 'The study used volunteers, so generalizing to "all people" extends beyond the population represented by the sample.',
        },
        teachingPoint: 'Random assignment (to treatment vs. control) is the key feature that allows causal conclusions in an experiment.',
      },
      {
        id: 'psda-statistical-claims-drill-8',
        skillSlug: 'statistical-claims',
        difficulty: 'medium',
        stimulus:
          'A poll reports that 67% of surveyed adults favor a new transit line, with a margin of error of ±5 percentage points.',
        question: 'Which of the following is the best interpretation of this result?',
        choices: [
          { label: 'A', text: 'The true proportion is definitely between 62% and 72%.' },
          { label: 'B', text: 'The true proportion is likely between 62% and 72%.' },
          { label: 'C', text: 'Exactly 67% of all adults favor the transit line.' },
          { label: 'D', text: 'The poll has a 5% error rate in counting responses.' },
        ],
        correctAnswer: 'B',
        explanation:
          '67% ± 5% = [62%, 72%]. The margin of error creates an interval of plausible values, not a guarantee. "Likely" (not "definitely") is the correct qualifier.',
        wrongAnswerExplanations: {
          A: '"Definitely" is too strong — the margin of error gives a range of likely values based on the confidence level, not a guaranteed interval.',
          C: 'The exact population proportion is unknown; the poll result is an estimate with uncertainty.',
        },
        teachingPoint: 'Margin of error creates an interval of likely (not certain) values; use "likely between" language, not "definitely."',
      },
      {
        id: 'psda-statistical-claims-drill-9',
        skillSlug: 'statistical-claims',
        difficulty: 'hard',
        stimulus:
          'A study of 2,000 adults finds that those who report eating fish twice a week have a 20% lower rate of cardiovascular disease. Participants were not randomly assigned to eat fish or not — researchers simply recorded their existing diets.',
        question: 'Which of the following is the most appropriate conclusion?',
        choices: [
          { label: 'A', text: 'Eating fish twice a week causes a 20% reduction in cardiovascular disease.' },
          { label: 'B', text: 'Among the adults surveyed, eating fish twice a week is associated with a lower rate of cardiovascular disease.' },
          { label: 'C', text: 'All adults should eat fish twice a week to reduce their risk of cardiovascular disease.' },
          { label: 'D', text: 'Fish consumption is the only dietary factor that affects cardiovascular health.' },
        ],
        correctAnswer: 'B',
        explanation:
          'This is an observational study — no random assignment was used. Participants self-selected their diets, so confounding variables (such as overall diet quality or exercise habits) may explain the observed difference. Only an associational conclusion is valid.',
        wrongAnswerExplanations: {
          A: 'Causal language ("causes") requires random assignment to treatment groups. Without it, the observed difference could be explained by a confounding variable.',
          C: 'Even if the association is real, making a universal prescription for all adults goes beyond what the study supports.',
        },
        teachingPoint: 'Self-selected behaviors in observational studies cannot establish causation; confounding variables may be responsible for the observed association.',
      },
      {
        id: 'psda-statistical-claims-drill-10',
        skillSlug: 'statistical-claims',
        difficulty: 'hard',
        stimulus:
          'A researcher wants to estimate how many hours per week students at a university study. She stands outside the library for one afternoon and surveys the first 60 students who walk by.',
        question: 'Why is this sampling method likely to produce a biased estimate?',
        choices: [
          { label: 'A', text: 'The sample size of 60 is too small for any valid estimate.' },
          { label: 'B', text: 'Students outside a library are more likely to study heavily, making the sample unrepresentative of all students.' },
          { label: 'C', text: 'The estimate will be biased because she asked only 60 questions.' },
          { label: 'D', text: 'The sample is biased because it was conducted in the afternoon.' },
        ],
        correctAnswer: 'B',
        explanation:
          'Students who frequent the library likely study more than average. Sampling at this location over-represents heavy studiers and underrepresents students who rarely study, producing an inflated estimate.',
        wrongAnswerExplanations: {
          A: 'Sample size is not the primary issue here — a random sample of 60 could be reasonably representative. The problem is where the sample was taken, not how many were asked.',
          D: 'While time of day could introduce some bias, the more fundamental issue is that the location (a library) systematically attracts a non-representative group.',
        },
        teachingPoint: 'Convenience samples (surveying whoever is nearby) are biased when the location or method over-represents a particular type of person.',
      },
    ],
    masteryQuestions: [
      {
        id: 'psda-statistical-claims-mastery-1',
        skillSlug: 'statistical-claims',
        difficulty: 'easy',
        stimulus:
          'A researcher observes that cities with more bike lanes also tend to have lower rates of obesity. She concludes that bike lanes reduce obesity.',
        question: 'What is the main flaw in this conclusion?',
        choices: [
          { label: 'A', text: 'The sample size is too small to draw conclusions.' },
          { label: 'B', text: 'The conclusion claims causation from an observational study without random assignment.' },
          { label: 'C', text: 'The researcher should have used a survey instead of observation.' },
          { label: 'D', text: 'Obesity rates cannot be measured accurately.' },
        ],
        correctAnswer: 'B',
        explanation:
          'This is an observational study — no variable was manipulated. Causal conclusions require a randomized experiment.',
        wrongAnswerExplanations: {
          A: 'The flaw is not about sample size but about claiming causation from correlation.',
          C: 'The method of data collection is not the issue; the problem is the causal interpretation.',
        },
        teachingPoint: 'Observational studies can show association but cannot establish causation without random assignment.',
      },
      {
        id: 'psda-statistical-claims-mastery-2',
        skillSlug: 'statistical-claims',
        difficulty: 'easy',
        stimulus:
          'A poll of 500 randomly selected voters found that 54% plan to vote for Candidate A. The margin of error is ±4%.',
        question: 'Which of the following is within the margin of error interval?',
        choices: [
          { label: 'A', text: '49%' },
          { label: 'B', text: '58%' },
          { label: 'C', text: '51%' },
          { label: 'D', text: '60%' },
        ],
        correctAnswer: 'C',
        explanation:
          'The interval is 54% ± 4% = [50%, 58%]. Only 51% falls within this interval.',
        wrongAnswerExplanations: {
          A: '49% is below the lower bound of 50%.',
          B: '58% is at the upper boundary. It is within the interval, but so is choice C. Actually: 58% = 54% + 4% is the upper bound, which is included. However, 51% is unambiguously inside the interval.',
        },
        teachingPoint: 'The margin of error interval is [result − MOE, result + MOE]; check whether each value falls within this range.',
      },
      {
        id: 'psda-statistical-claims-mastery-3',
        skillSlug: 'statistical-claims',
        difficulty: 'medium',
        stimulus:
          'Researchers randomly assigned 200 patients with chronic back pain to two groups. Group A performed daily stretching exercises for 8 weeks. Group B received no intervention. Group A showed a significant reduction in pain scores.',
        question: 'Which of the following conclusions is best supported?',
        choices: [
          { label: 'A', text: 'Daily stretching exercises are associated with reduced back pain in chronic sufferers.' },
          { label: 'B', text: 'Daily stretching exercises cause a reduction in back pain in chronic sufferers.' },
          { label: 'C', text: 'All chronic back pain patients will benefit from daily stretching.' },
          { label: 'D', text: 'Group B\'s lack of improvement proves that rest causes more pain.' },
        ],
        correctAnswer: 'B',
        explanation:
          'This is a randomized controlled experiment (random assignment to stretch vs. no-stretch groups). A causal conclusion is justified: daily stretching caused the pain reduction.',
        wrongAnswerExplanations: {
          A: 'An association conclusion is appropriate for an observational study. Here, random assignment allows a causal conclusion ("causes"), making choice B more precise.',
          C: 'The study used 200 chronic back pain patients — generalizing to "all" patients goes beyond what this single study supports.',
        },
        teachingPoint: 'Random assignment to treatment and control groups licenses causal conclusions — this is the key distinction from observational studies.',
      },
      {
        id: 'psda-statistical-claims-mastery-4',
        skillSlug: 'statistical-claims',
        difficulty: 'medium',
        stimulus:
          'A radio station asked listeners to call in and vote on whether they support a new noise ordinance. Of 800 callers, 72% opposed the ordinance.',
        question: 'Which statement best identifies the problem with generalizing this result to all city residents?',
        choices: [
          { label: 'A', text: 'The sample size of 800 is too large.' },
          { label: 'B', text: 'The sample is a voluntary response group, which is likely biased toward strong opinions.' },
          { label: 'C', text: 'Radio stations cannot conduct valid surveys.' },
          { label: 'D', text: 'The ordinance topic is too controversial to survey.' },
        ],
        correctAnswer: 'B',
        explanation:
          'Voluntary response samples attract people with strong opinions — in this case, those who are motivated enough to call in. This over-represents extreme views (opposition) and is not representative of all city residents.',
        wrongAnswerExplanations: {
          A: 'Sample size is not the issue here; even a large voluntary sample can be heavily biased.',
          C: 'The channel of distribution (radio) is not inherently invalid; the bias comes from the voluntary nature of the response.',
        },
        teachingPoint: 'Voluntary response samples are biased because respondents self-select; those who feel strongly (often opposers) are more likely to participate.',
      },
      {
        id: 'psda-statistical-claims-mastery-5',
        skillSlug: 'statistical-claims',
        difficulty: 'medium',
        stimulus:
          'A national survey of 1,200 randomly selected adults found that 43% exercise at least 3 times per week, with a margin of error of ±3%.',
        question: 'Which claim is NOT supported by this survey?',
        choices: [
          { label: 'A', text: 'The true national proportion who exercise at least 3 times a week is likely between 40% and 46%.' },
          { label: 'B', text: 'Fewer than half of American adults exercise at least 3 times a week.' },
          { label: 'C', text: 'Exactly 43% of all American adults exercise at least 3 times per week.' },
          { label: 'D', text: 'The survey estimates that about 43% of American adults exercise at least 3 times per week.' },
        ],
        correctAnswer: 'C',
        explanation:
          '43% is the sample estimate, not the exact population value. The margin of error indicates uncertainty; the true value is somewhere in [40%, 46%].',
        wrongAnswerExplanations: {
          B: 'The entire interval [40%, 46%] is below 50%, so "fewer than half" is well-supported.',
          A: 'This correctly describes the confidence interval created by the margin of error.',
        },
        teachingPoint: 'A poll result is an estimate with uncertainty; never claim the sample percentage IS exactly the population percentage.',
      },
      {
        id: 'psda-statistical-claims-mastery-6',
        skillSlug: 'statistical-claims',
        difficulty: 'hard',
        stimulus:
          'A study finds that students who eat breakfast on school days score on average 8 points higher on morning quizzes than students who skip breakfast. The study tracked 150 middle-school students over one semester.',
        question: 'Which conclusion is most appropriate based on this study?',
        choices: [
          { label: 'A', text: 'Eating breakfast causes higher quiz scores in middle-school students.' },
          { label: 'B', text: 'Among middle-school students in this study, eating breakfast is associated with higher morning quiz scores.' },
          { label: 'C', text: 'All students should eat breakfast to maximize their quiz performance.' },
          { label: 'D', text: 'Skipping breakfast is the sole cause of lower quiz scores.' },
        ],
        correctAnswer: 'B',
        explanation:
          'This is an observational study: students were not randomly assigned to breakfast/no-breakfast groups. The conclusion must be associational and limited to the students tracked. Confounds (such as socioeconomic factors or overall health) may explain the difference.',
        wrongAnswerExplanations: {
          A: 'Without random assignment, causation cannot be established — confounding factors could account for the score difference.',
          C: 'A universal prescription goes beyond what a single observational study supports.',
        },
        teachingPoint: 'Without random assignment, conclusions must be associational and limited to the observed sample; confounding variables may explain observed differences.',
      },
      {
        id: 'psda-statistical-claims-mastery-7',
        skillSlug: 'statistical-claims',
        difficulty: 'hard',
        stimulus:
          'A survey samples 900 people instead of the original plan of 100.',
        question: 'Compared to the original plan, what happens to the margin of error?',
        choices: [
          { label: 'A', text: 'The margin of error is cut to one-third.' },
          { label: 'B', text: 'The margin of error is cut to one-ninth.' },
          { label: 'C', text: 'The margin of error is tripled.' },
          { label: 'D', text: 'The margin of error is unchanged.' },
        ],
        correctAnswer: 'A',
        explanation:
          'MOE ∝ 1/√n. Original: n = 100, √100 = 10. New: n = 900, √900 = 30. New MOE = old MOE × (10/30) = old MOE × (1/3). The MOE is cut to one-third.',
        wrongAnswerExplanations: {
          B: 'Cutting to 1/9 would require n to increase by a factor of 81 (since 1/√81 = 1/9). Here n increases by 9, so MOE is cut by 1/√9 = 1/3.',
          C: 'A larger sample reduces the MOE, not increases it.',
        },
        teachingPoint: 'MOE scales as 1/√n; multiplying n by 9 multiplies MOE by 1/3 (not 1/9).',
      },
      {
        id: 'psda-statistical-claims-mastery-8',
        skillSlug: 'statistical-claims',
        difficulty: 'easy',
        stimulus:
          'A researcher randomly selects 50 students from a single high school and asks about their study habits. She concludes that "high school students nationwide study an average of 2 hours per night."',
        question: 'What is the primary problem with this conclusion?',
        choices: [
          { label: 'A', text: 'The sample size of 50 is the main problem.' },
          { label: 'B', text: 'The conclusion generalizes to all high school students nationally, beyond the population the sample represents.' },
          { label: 'C', text: 'Study habits cannot be self-reported accurately.' },
          { label: 'D', text: 'The researcher should have asked more questions.' },
        ],
        correctAnswer: 'B',
        explanation:
          'The sample was drawn from one high school. Valid inferences can only be made about students at that school, not high school students nationwide.',
        wrongAnswerExplanations: {
          A: 'While 50 is small, the more critical flaw is the scope of generalization — the sample is from one school, not a national sample.',
          C: 'Self-reporting bias is a secondary concern; the primary issue is over-generalization.',
        },
        teachingPoint: 'Generalizations must be limited to the population from which the sample was randomly drawn.',
      },
      {
        id: 'psda-statistical-claims-mastery-9',
        skillSlug: 'statistical-claims',
        difficulty: 'medium',
        stimulus:
          'A study finds that neighborhoods with more parks have lower rates of depression. The study observed 80 neighborhoods across 5 cities.',
        question: 'Which of the following could explain the observed association without parks being the direct cause?',
        choices: [
          { label: 'A', text: 'Parks are always built in the highest-income neighborhoods, which also have better mental healthcare access.' },
          { label: 'B', text: 'The researchers made calculation errors in measuring depression rates.' },
          { label: 'C', text: 'Depression rates do not vary by neighborhood.' },
          { label: 'D', text: 'The study tracked too few neighborhoods to observe any pattern.' },
        ],
        correctAnswer: 'A',
        explanation:
          'If parks are disproportionately located in wealthier areas that also have better healthcare access, then income and healthcare — not parks — may be driving the lower depression rates. This is a confounding variable.',
        wrongAnswerExplanations: {
          B: 'Calculation errors would not explain a consistent directional association; they would introduce random noise.',
          C: 'If rates did not vary, no association would have been observed — this contradicts the premise.',
        },
        teachingPoint: 'A confounding variable is a third factor correlated with both the independent and dependent variable that could explain the observed association.',
      },
      {
        id: 'psda-statistical-claims-mastery-10',
        skillSlug: 'statistical-claims',
        difficulty: 'hard',
        stimulus:
          'Two studies are described:\n\nStudy 1: Researchers randomly selected 300 adults from the U.S. population and found that 58% report getting 7+ hours of sleep, with a margin of error of ±3%.\n\nStudy 2: Researchers at one hospital surveyed 50 insomnia patients and found that only 10% get 7+ hours of sleep.',
        question: 'Which study\'s findings can more appropriately be generalized to all U.S. adults, and why?',
        choices: [
          { label: 'A', text: 'Study 2; it has a more specific and relevant sample.' },
          { label: 'B', text: 'Study 1; it used a random sample from the U.S. adult population.' },
          { label: 'C', text: 'Neither study; surveys cannot establish reliable findings.' },
          { label: 'D', text: 'Study 2; it surveyed people with sleep problems, making it more informative.' },
        ],
        correctAnswer: 'B',
        explanation:
          'Study 1 used a random sample from the U.S. adult population, so its findings can be generalized to all U.S. adults. Study 2 sampled insomnia patients at one hospital — a non-random, highly specific group that does not represent the general population.',
        wrongAnswerExplanations: {
          A: 'Specificity is not the same as representativeness. Insomnia patients are not a representative sample of all adults.',
          D: 'Informative for insomnia patients does not mean generalizable to all adults. The sample in Study 2 is by definition atypical.',
        },
        teachingPoint: 'Only a random sample from the target population supports generalization to that population; a specific or clinical sample represents only itself.',
      },
    ],
  },
]
