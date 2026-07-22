import type { AcademySkill } from '../types'

export const quantitativeEvidence: AcademySkill = {
  slug: 'quantitative-evidence',
  title: 'Quantitative Evidence',
  section: 'reading',
  objective:
    'By the end of this lesson, you will be able to evaluate whether a student\'s description of data from a table or graph is accurate, and select the answer that correctly represents what the data shows without overstating or understating the information.',
  estimatedMinutes: 24,
  subskills: [
    'Reading Tables',
    'Reading Bar and Line Graphs',
    'Identifying Trends',
    'Comparing Values',
    'Claim Support with Data',
    'Avoiding Numerical Overreach',
    'Units and Labels',
  ],
  overview: {
    whatItTests:
      'Reading a table, graph, or data description and connecting the quantitative data to a written claim.',
    howItAppears:
      'A passage with data (described inline or in a small table) is followed by a question about whether a claim is supported, weakened, or left unaddressed by the data.',
    whyStudentsMissIt:
      'Students misread axis labels or units, assume correlation implies causation, or choose answers based on the topic rather than checking the specific values.',
    whatToLookFor:
      'The exact values, labels, and units, and what the data actually shows versus what it does not show.',
  },
  strategy: {
    steps: [
      'Read the data description or table carefully and identify what is being measured and in what units.',
      'Read the claim in the question and state exactly what it asserts.',
      'Find the specific data point or points that relate to the claim.',
      'Decide whether the data directly supports, contradicts, or simply does not address the claim.',
    ],
    timeSavingTip:
      'Underline the units and the years or categories in the data first. Most wrong answers come from mixing up which value goes with which label.',
    whenNotToOverthink:
      'If the data plainly shows the number the claim needs, and no trick with units or categories is present, accept it and move on.',
  },
  commonTraps: [
    {
      title: 'The same-topic trap',
      description:
        'A choice restates the claim\'s topic and assumes the data must support it, without checking the actual numbers.',
      avoidance:
        'Verify the specific values. Being about the same subject is not the same as being supported by the data.',
    },
    {
      title: 'The trend-continues trap',
      description:
        'A choice assumes a trend seen in one time period continues into years the data does not cover.',
      avoidance:
        'Only use the range of data given. Do not project beyond the years or categories shown.',
    },
    {
      title: 'The correlation-as-causation trap',
      description:
        'A choice claims one thing caused another simply because both changed together in the data.',
      avoidance:
        'Data showing two values moving together does not prove one caused the other.',
    },
    {
      title: 'The overlooked-qualifier trap',
      description:
        'A choice uses a word like "most," "all," or "every" that the data does not actually support.',
      avoidance:
        'Check whether the numbers justify absolute words. A single high value does not prove "most" or "all."',
    },
  ],
  guidedExamples: [
    {
      id: 'qe-ex-1',
      level: 'foundation',
      hints: [
        'Start by listing all four values side by side.',
        'Find the largest number among the four values.',
        'Compare that largest number to the town named in the claim.',
      ],
      stimulus:
        'A study measured the average daily water use per person in four towns in 2022. According to the data, Town A used 90 liters, Town B used 120 liters, Town C used 75 liters, and Town D used 110 liters. A researcher wrote: "Among these four towns, residents of Town B used the most water per person in 2022."',
      question:
        'Does the data support the researcher\'s statement about Town B?',
      steps: [
        {
          instruction: 'Identify the units and values',
          content:
            'The data gives average daily water use per person in liters: A=90, B=120, C=75, D=110.',
        },
        {
          instruction: 'State the claim',
          content:
            'The claim is that Town B used the most water per person among the four towns.',
        },
        {
          instruction: 'Compare the values',
          content:
            'Town B\'s 120 liters is higher than A (90), C (75), and D (110), so B is the highest.',
        },
        {
          instruction: 'Decide support',
          content:
            'Since B has the largest value, the data supports the claim that B used the most.',
        },
      ],
      choices: [
        {
          label: 'A',
          text: 'Yes, because Town B\'s 120 liters is the highest of the four values.',
        },
        {
          label: 'B',
          text: 'No, because Town D used more water than Town B.',
        },
        {
          label: 'C',
          text: 'No, because the data does not list Town B.',
        },
        {
          label: 'D',
          text: 'Yes, because Town C used the least water.',
        },
      ],
      correctAnswer: 'A',
      explanation:
        'Town B used 120 liters, more than A (90), C (75), and D (110). Because 120 is the highest value, the data supports the claim that Town B used the most water per person.',
      wrongAnswerExplanations: {
        B: 'Town D used 110 liters, which is less than Town B\'s 120, so this misreads the values.',
        C: 'Town B is listed in the data with 120 liters, so this is factually wrong.',
        D: 'That Town C used the least is true but does not by itself confirm the claim about Town B; the relevant comparison is B against the others.',
      },
      coachTakeaway:
        'For "the most" or "the least" claims, list every value and confirm the named item wins the comparison. The trap is picking a choice that is true but does not directly address the stated claim.',
    },
    {
      id: 'qe-ex-2',
      level: 'sat-application',
      hints: [
        'Notice the year in the claim and check whether the data includes that year.',
        'Even if a trend is rising, can data from 2022 tell you about 2024?',
        'What is the highest value in the data, and does it reach 50 percent?',
      ],
      stimulus:
        'A survey tracked the percentage of a school\'s students who walked to school. According to the data, the figure was 20 percent in 2018, 28 percent in 2020, and 35 percent in 2022. A columnist claimed: "The data show that by 2024, more than half of the school\'s students walked to school."',
      question:
        'Does the data support the columnist\'s claim about 2024?',
      steps: [
        {
          instruction: 'Identify the units and values',
          content:
            'The data gives the percentage walking in three years: 2018 = 20 percent, 2020 = 28 percent, 2022 = 35 percent.',
        },
        {
          instruction: 'State the claim',
          content:
            'The claim is that by 2024, more than half (over 50 percent) walked to school.',
        },
        {
          instruction: 'Check the data range',
          content:
            'The data stops at 2022 (35 percent). There is no 2024 figure, and 35 percent is still below 50 percent.',
        },
        {
          instruction: 'Decide support',
          content:
            'The claim projects beyond the data into a year not measured, so the data does not support it.',
        },
      ],
      choices: [
        {
          label: 'A',
          text: 'Yes, because the percentage rose every year in the data.',
        },
        {
          label: 'B',
          text: 'No, because the data stops at 2022 and never reaches 50 percent.',
        },
        {
          label: 'C',
          text: 'Yes, because 35 percent is more than half.',
        },
        {
          label: 'D',
          text: 'No, because the percentage was falling over time.',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'The data ends at 2022 with 35 percent, below half, and gives no figure for 2024. The claim projects a trend into a year the data does not cover, so the data does not support it.',
      wrongAnswerExplanations: {
        A: 'A rising trend does not guarantee the figure will exceed 50 percent in a year that was never measured.',
        C: '35 percent is not more than half; this misreads the value.',
        D: 'The percentage was rising, not falling, so this misstates the trend.',
      },
      coachTakeaway:
        'Any claim about a time period beyond the last data point is automatically unsupported. The trend-continues trap is one of the most common wrong answers on quantitative evidence questions.',
    },
    {
      id: 'qe-ex-3',
      level: 'advanced',
      hints: [
        'Both ice cream sales and rescues rise in the same month — but why might that be?',
        'Think about what else changes in July that could cause both to rise independently.',
        'The key question is: does rising together prove one causes the other?',
      ],
      stimulus:
        'Researchers recorded two things each month for a year: the number of ice cream cones sold at a beach stand and the number of swimmers who needed help from lifeguards. Both numbers were highest in July and lowest in January. A blogger wrote: "This data proves that eating ice cream causes people to need rescuing."',
      question:
        'Does the data support the blogger\'s claim?',
      steps: [
        {
          instruction: 'Identify what is measured',
          content:
            'The data tracks ice cream sales and lifeguard rescues by month; both peak in July and dip in January.',
        },
        {
          instruction: 'State the claim',
          content:
            'The claim is that eating ice cream causes people to need rescuing.',
        },
        {
          instruction: 'Consider other explanations',
          content:
            'Both numbers rise in summer, likely because more people visit the beach in warm months. Rising together does not mean one causes the other.',
        },
        {
          instruction: 'Decide support',
          content:
            'The data shows the two rise and fall together but does not prove ice cream causes rescues.',
        },
      ],
      choices: [
        {
          label: 'A',
          text: 'Yes, because both numbers peak in the same month.',
        },
        {
          label: 'B',
          text: 'Yes, because ice cream sales were recorded first.',
        },
        {
          label: 'C',
          text: 'No, because the two rising together does not show one causes the other.',
        },
        {
          label: 'D',
          text: 'No, because ice cream sales were lowest in July.',
        },
      ],
      correctAnswer: 'C',
      explanation:
        'The two numbers move together, most likely because summer brings more beachgoers who both buy ice cream and swim. Two values rising together does not prove one causes the other.',
      wrongAnswerExplanations: {
        A: 'Peaking in the same month shows correlation, not causation; a shared cause like summer weather can explain both.',
        B: 'The order in which data was recorded says nothing about cause.',
        D: 'Ice cream sales were highest, not lowest, in July, so this misreads the data.',
      },
      coachTakeaway:
        'Any time a claim uses the word "causes" or "proves" and the data is simply a correlation, the claim is unsupported. Always ask whether a third factor (like season) could explain both changes independently.',
    },
  ],
  drillQuestions: [
    {
      id: 'qe-d-001',
      skillSlug: 'quantitative-evidence',
      level: 'foundation',
      difficulty: 'easy',
      errorCategory: 'value-comparison',
      stimulus:
        'A chart shows the number of library visits per month: January 400, February 350, March 500. A note claims: "March had the most visits of the three months."',
      question: 'Does the data support the note\'s claim?',
      choices: [
        { label: 'A', text: 'Yes, because 500 is the highest value.' },
        { label: 'B', text: 'No, because January had the most visits.' },
        { label: 'C', text: 'No, because March is not in the data.' },
        { label: 'D', text: 'Yes, because February had 350 visits.' },
      ],
      correctAnswer: 'A',
      explanation:
        'March had 500 visits, more than January (400) and February (350), so it had the most.',
      wrongAnswerExplanations: {
        B: 'January had 400, fewer than March\'s 500.',
        C: 'March is in the data with 500 visits.',
        D: 'February\'s 350 does not confirm the claim about March; the relevant point is that 500 is highest.',
      },
      teachingPoint:
        'For "the most" claims, simply compare all listed values and confirm the named one is largest.',
    },
    {
      id: 'qe-d-002',
      skillSlug: 'quantitative-evidence',
      level: 'foundation',
      difficulty: 'easy',
      errorCategory: 'value-comparison',
      stimulus:
        'A table lists rainfall in centimeters: City X 12, City Y 8, City Z 15. A report states: "City Y received the least rainfall."',
      question: 'Does the data support the report\'s statement?',
      choices: [
        { label: 'A', text: 'Yes, because City Y\'s 8 cm is the lowest value.' },
        { label: 'B', text: 'No, because City Z had the least.' },
        { label: 'C', text: 'Yes, because City X had 12 cm.' },
        { label: 'D', text: 'No, because all cities had the same rainfall.' },
      ],
      correctAnswer: 'A',
      explanation:
        'City Y received 8 cm, less than City X (12) and City Z (15), so it had the least rainfall.',
      wrongAnswerExplanations: {
        B: 'City Z had the most (15 cm), not the least.',
        C: 'City X\'s value does not confirm the claim about City Y being lowest.',
        D: 'The cities had different amounts, so this is false.',
      },
      teachingPoint:
        'For "the least" claims, confirm the named value is the smallest in the data.',
    },
    {
      id: 'qe-d-003',
      skillSlug: 'quantitative-evidence',
      level: 'foundation',
      difficulty: 'easy',
      errorCategory: 'value-comparison',
      stimulus:
        'A study reports the average sleep per night for two groups: students who used phones before bed slept 6.5 hours, and students who did not slept 8 hours. A summary claims: "Students who avoided phones before bed slept more on average."',
      question: 'Does the data support the summary\'s claim?',
      choices: [
        {
          label: 'A',
          text: 'Yes, because 8 hours is more than 6.5 hours.',
        },
        {
          label: 'B',
          text: 'No, because phone users slept longer.',
        },
        {
          label: 'C',
          text: 'No, because both groups slept the same amount.',
        },
        {
          label: 'D',
          text: 'Yes, because phones were used before bed.',
        },
      ],
      correctAnswer: 'A',
      explanation:
        'Students who avoided phones slept 8 hours versus 6.5 for phone users, so they slept more on average.',
      wrongAnswerExplanations: {
        B: 'Phone users slept 6.5 hours, which is less, not more.',
        C: 'The two groups differ (8 vs 6.5 hours), so they did not sleep the same amount.',
        D: 'That phones were used is a fact but does not, by itself, confirm which group slept more.',
      },
      teachingPoint:
        'Match the group named in the claim to its exact value and compare directly.',
    },
    {
      id: 'qe-d-004',
      skillSlug: 'quantitative-evidence',
      level: 'sat-application',
      difficulty: 'medium',
      errorCategory: 'trend-reading',
      stimulus:
        'A table shows a company\'s online sales as a share of total sales: 2019 was 10 percent, 2021 was 18 percent, 2023 was 25 percent. A manager claims: "Online sales have grown as a share of the company\'s total sales."',
      question: 'Does the data support the manager\'s claim?',
      choices: [
        {
          label: 'A',
          text: 'Yes, because the share rose from 10 to 25 percent over the years shown.',
        },
        {
          label: 'B',
          text: 'No, because the share fell over time.',
        },
        {
          label: 'C',
          text: 'Yes, because total sales doubled.',
        },
        {
          label: 'D',
          text: 'No, because the data only covers online sales.',
        },
      ],
      correctAnswer: 'A',
      explanation:
        'The share rose from 10 percent (2019) to 18 percent (2021) to 25 percent (2023), so online sales grew as a share of total sales.',
      wrongAnswerExplanations: {
        B: 'The share rose, not fell, across the years shown.',
        C: 'The data gives shares, not total sales figures, so we cannot say total sales doubled; but the claim about share growth still holds.',
        D: 'The data gives the share of total sales, which is exactly what the claim needs.',
      },
      teachingPoint:
        'Read the label carefully: a "share of total" rising is different from raw sales rising, and here it matches the claim.',
    },
    {
      id: 'qe-d-005',
      skillSlug: 'quantitative-evidence',
      level: 'sat-application',
      difficulty: 'medium',
      errorCategory: 'qualifier-overreach',
      stimulus:
        'A survey of 200 people asked their favorite fruit: 90 chose apples, 60 chose bananas, and 50 chose oranges. A writer claims: "Most people surveyed chose apples as their favorite fruit."',
      question: 'Does the data support the writer\'s claim?',
      choices: [
        {
          label: 'A',
          text: 'Yes, because apples got more votes than any other fruit.',
        },
        {
          label: 'B',
          text: 'No, because only 90 of 200 chose apples, which is not most.',
        },
        {
          label: 'C',
          text: 'Yes, because apples received exactly half the votes.',
        },
        {
          label: 'D',
          text: 'No, because bananas were the most popular.',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'Apples got 90 of 200 votes, which is 45 percent, less than half. "Most" means more than half, so the data does not support the claim even though apples were the top single choice.',
      wrongAnswerExplanations: {
        A: 'Getting the most votes makes apples the plurality, but "most people" means over half, and 90 of 200 is under half.',
        C: '90 of 200 is 45 percent, not exactly half.',
        D: 'Bananas got 60 votes, fewer than apples, so bananas were not the most popular.',
      },
      teachingPoint:
        'Watch the word "most": it means more than half, which is stricter than simply being the top choice.',
    },
    {
      id: 'qe-d-006',
      skillSlug: 'quantitative-evidence',
      level: 'sat-application',
      difficulty: 'medium',
      errorCategory: 'trend-projection',
      stimulus:
        'A chart tracks a town\'s recycling rate: 30 percent in 2015, 45 percent in 2018, and 55 percent in 2021. A columnist claims: "By 2025, the town\'s recycling rate reached 80 percent."',
      question: 'Does the data support the columnist\'s claim?',
      choices: [
        {
          label: 'A',
          text: 'Yes, because the rate kept climbing.',
        },
        {
          label: 'B',
          text: 'No, because the data ends in 2021 and includes no figure for 2025.',
        },
        {
          label: 'C',
          text: 'Yes, because 55 percent rounds up to 80 percent.',
        },
        {
          label: 'D',
          text: 'No, because the recycling rate was decreasing.',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'The data stops at 2021 (55 percent) and gives no value for 2025. The claim projects beyond the data, so it is not supported.',
      wrongAnswerExplanations: {
        A: 'A climbing trend does not prove the rate reached a specific value in a year not measured.',
        C: '55 percent does not round to 80 percent; this misreads the numbers.',
        D: 'The rate was rising, not decreasing.',
      },
      teachingPoint:
        'Do not extend a trend past the last year of data; claims about unmeasured years are unsupported.',
    },
    {
      id: 'qe-d-007',
      skillSlug: 'quantitative-evidence',
      level: 'sat-application',
      difficulty: 'medium',
      errorCategory: 'causation-vs-correlation',
      stimulus:
        'A study recorded, for each of 12 months, the number of hours of sunshine and the number of visitors to an outdoor market. Sunnier months tended to have more visitors. A blogger writes: "The data proves that sunshine causes people to shop at the market."',
      question: 'Does the data support the blogger\'s causal claim?',
      choices: [
        {
          label: 'A',
          text: 'Yes, because sunshine and visitors both went up together.',
        },
        {
          label: 'B',
          text: 'No, because the data shows a relationship but does not prove sunshine causes the increase.',
        },
        {
          label: 'C',
          text: 'Yes, because the study lasted 12 months.',
        },
        {
          label: 'D',
          text: 'No, because sunnier months had fewer visitors.',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'Sunshine and visitors rising together is a correlation. Other factors, such as warmer weather or weekend timing, could explain both, so the data does not prove causation.',
      wrongAnswerExplanations: {
        A: 'Two things rising together shows correlation, not that one causes the other.',
        C: 'The length of the study does not establish cause.',
        D: 'The data shows sunnier months had more visitors, not fewer, so this misreads it.',
      },
      teachingPoint:
        'A relationship in data ("tended to") is not proof of cause; watch for causal words like "causes" or "proves."',
    },
    {
      id: 'qe-d-008',
      skillSlug: 'quantitative-evidence',
      level: 'advanced',
      difficulty: 'hard',
      errorCategory: 'total-vs-per-unit',
      stimulus:
        'A report gives two figures for a factory: total energy use rose from 1,000 to 1,200 megawatt-hours from 2020 to 2023, while energy use per unit produced fell from 5.0 to 3.5 megawatt-hours. A manager claims: "The factory became more energy efficient per unit between 2020 and 2023."',
      question: 'Does the data support the manager\'s claim?',
      choices: [
        {
          label: 'A',
          text: 'No, because total energy use went up.',
        },
        {
          label: 'B',
          text: 'Yes, because energy use per unit fell from 5.0 to 3.5.',
        },
        {
          label: 'C',
          text: 'No, because per-unit energy use rose.',
        },
        {
          label: 'D',
          text: 'Yes, because the factory produced fewer units.',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'Efficiency per unit is measured by energy per unit produced, which fell from 5.0 to 3.5 megawatt-hours. A lower figure means more efficiency per unit, so the claim is supported even though total energy use rose.',
      wrongAnswerExplanations: {
        A: 'Total energy use rising does not address efficiency per unit; the claim is specifically about per-unit efficiency.',
        C: 'Per-unit energy use fell, not rose; this misreads the second figure.',
        D: 'The data does not say the factory produced fewer units; total energy could rise with more production while per-unit use falls.',
      },
      teachingPoint:
        'Distinguish total from per-unit measures; a claim about per-unit efficiency must be judged by the per-unit figure.',
    },
    {
      id: 'qe-d-009',
      skillSlug: 'quantitative-evidence',
      level: 'advanced',
      difficulty: 'hard',
      errorCategory: 'percentage-vs-count',
      stimulus:
        'A table shows test scores for two schools. School P: 40 percent of students scored above 80. School Q: 65 percent of students scored above 80. However, School P had 1,000 students and School Q had 100 students. A writer claims: "More students scored above 80 at School P than at School Q."',
      question: 'Does the data support the writer\'s claim?',
      choices: [
        {
          label: 'A',
          text: 'No, because School Q had a higher percentage above 80.',
        },
        {
          label: 'B',
          text: 'Yes, because 40 percent of 1,000 is 400, more than 65 percent of 100, which is 65.',
        },
        {
          label: 'C',
          text: 'No, because both schools had the same number of students.',
        },
        {
          label: 'D',
          text: 'Yes, because School P had a higher percentage above 80.',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'The claim is about the number of students, not the percentage. School P: 40 percent of 1,000 = 400 students. School Q: 65 percent of 100 = 65 students. So 400 is more than 65, and the claim is supported.',
      wrongAnswerExplanations: {
        A: 'A higher percentage at School Q does not mean more students, because School P is much larger.',
        C: 'The schools had different sizes (1,000 vs 100 students).',
        D: 'School P had a lower percentage (40 vs 65), not higher; the claim is true because of the larger population, not a higher percentage.',
      },
      teachingPoint:
        'A percentage and a count are different; to compare numbers of students, multiply the percentage by each school\'s size.',
    },
    {
      id: 'qe-d-010',
      skillSlug: 'quantitative-evidence',
      level: 'advanced',
      difficulty: 'hard',
      errorCategory: 'average-vs-spread',
      stimulus:
        'A survey measured customer satisfaction on a scale from 1 to 10 for two products. Product A had an average score of 7.0 with responses ranging from 6 to 8. Product B had an average score of 7.0 with responses ranging from 2 to 10. A reviewer claims: "Both products earned the same average score, so customers agreed equally about both."',
      question:
        'Does the data support the reviewer\'s claim that customers agreed equally about both products?',
      choices: [
        {
          label: 'A',
          text: 'Yes, because both averages were 7.0.',
        },
        {
          label: 'B',
          text: 'No, because Product B\'s scores were much more spread out, showing less agreement.',
        },
        {
          label: 'C',
          text: 'Yes, because both products scored on a 1-to-10 scale.',
        },
        {
          label: 'D',
          text: 'No, because Product A had a higher average.',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'Equal averages do not mean equal agreement. Product A\'s scores clustered tightly (6 to 8), while Product B\'s ranged widely (2 to 10), so customers disagreed much more about Product B.',
      wrongAnswerExplanations: {
        A: 'The same average says nothing about how much responses varied; agreement depends on the spread, not the mean.',
        C: 'Using the same scale does not show customers agreed equally.',
        D: 'Both products had the same average of 7.0, so Product A did not score higher.',
      },
      teachingPoint:
        'Two data sets can share an average yet differ greatly in spread; agreement depends on the range, not just the mean.',
    },
    {
      id: 'qe-d-011',
      skillSlug: 'quantitative-evidence',
      level: 'sat-application',
      difficulty: 'medium',
      errorCategory: 'label-misread',
      stimulus:
        'The table below describes results from a visitor survey at three national parks in one summer season.\n\nPark | Visitors (thousands)\nRedrock Canyon | 210\nLake Meridian | 85\nPinecrest Valley | 155\n\nA tourism analyst wrote: "Among the three parks, Lake Meridian attracted the fewest visitors during the survey period."',
      question: 'Does the data support the analyst\'s claim?',
      choices: [
        {
          label: 'A',
          text: 'Yes, because Lake Meridian\'s 85,000 visitors is the lowest of the three values.',
        },
        {
          label: 'B',
          text: 'No, because Pinecrest Valley had fewer visitors than Lake Meridian.',
        },
        {
          label: 'C',
          text: 'Yes, because Redrock Canyon had the most visitors.',
        },
        {
          label: 'D',
          text: 'No, because the table does not include visitor totals for Lake Meridian.',
        },
      ],
      correctAnswer: 'A',
      explanation:
        'Lake Meridian recorded 85,000 visitors, which is lower than both Redrock Canyon (210,000) and Pinecrest Valley (155,000). The data supports the claim that Lake Meridian attracted the fewest visitors.',
      wrongAnswerExplanations: {
        B: 'Pinecrest Valley had 155,000 visitors, more than Lake Meridian\'s 85,000, so Pinecrest Valley did not have fewer.',
        C: 'That Redrock Canyon led in visitors is true but does not by itself confirm the claim about Lake Meridian being last; a direct comparison of all three is needed.',
        D: 'Lake Meridian is listed in the table with 85,000 visitors, so the table does include its total.',
      },
      teachingPoint:
        'To verify a "fewest" or "most" claim, compare every value in the table directly — do not rely on what seems largest or smallest at a glance.',
    },
    {
      id: 'qe-d-012',
      skillSlug: 'quantitative-evidence',
      level: 'advanced',
      difficulty: 'hard',
      errorCategory: 'trend-qualifier',
      stimulus:
        'The table below shows annual average temperatures (in degrees Celsius) recorded at a research station over five years.\n\nYear | Average Temperature (°C)\n2018 | 11.2\n2019 | 11.5\n2020 | 11.4\n2021 | 11.8\n2022 | 12.0\n\nA climate writer stated: "The data confirm that temperatures at the station increased without interruption every year from 2018 through 2022."',
      question: 'Does the data support the writer\'s claim?',
      choices: [
        {
          label: 'A',
          text: 'Yes, because the temperature was higher in 2022 than in 2018.',
        },
        {
          label: 'B',
          text: 'No, because the temperature dipped slightly in 2020 compared to 2019, interrupting the rise.',
        },
        {
          label: 'C',
          text: 'Yes, because the overall trend across the five years was upward.',
        },
        {
          label: 'D',
          text: 'No, because the data only covers four years, not five.',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'The claim requires an uninterrupted annual increase, but the temperature fell from 11.5°C in 2019 to 11.4°C in 2020. Because this one-year dip interrupts the consecutive rise, the data does not support the claim as written.',
      wrongAnswerExplanations: {
        A: 'A higher value in 2022 compared to 2018 shows a net increase over five years, but it does not confirm that the temperature rose every single year without exception.',
        C: 'An overall upward trend is not the same as an uninterrupted year-by-year increase; the claim specifically says "without interruption."',
        D: 'The data covers five years (2018 through 2022 inclusive), so this is incorrect.',
      },
      teachingPoint:
        'Read qualifier words in claims carefully. "Without interruption" means every single year-to-year change must be positive; a single dip defeats the claim even if the overall trend is upward.',
    },
    {
      id: 'qe-d-013',
      skillSlug: 'quantitative-evidence',
      level: 'advanced',
      difficulty: 'hard',
      errorCategory: 'ratio-and-proportion',
      stimulus:
        'The table below shows data for three neighborhood community centers.\n\nCenter | Members | Programs Offered\nMaple Street | 240 | 12\nRiver North | 180 | 15\nEastwood | 300 | 10\n\nA city planner wrote: "River North Community Center offers the greatest number of programs per member of any of the three centers."',
      question: 'Does the data support the planner\'s claim?',
      choices: [
        {
          label: 'A',
          text: 'No, because River North has the fewest members and therefore the smallest total reach.',
        },
        {
          label: 'B',
          text: 'Yes, because River North offers more programs than either Maple Street or Eastwood.',
        },
        {
          label: 'C',
          text: 'Yes, because River North\'s ratio of programs to members is higher than that of the other two centers.',
        },
        {
          label: 'D',
          text: 'No, because Eastwood has the most members, meaning it serves more people per program.',
        },
      ],
      correctAnswer: 'C',
      explanation:
        'The claim is about programs per member, which requires dividing programs by members for each center. River North: 15 ÷ 180 ≈ 0.083 programs per member. Maple Street: 12 ÷ 240 = 0.05. Eastwood: 10 ÷ 300 ≈ 0.033. River North\'s ratio is highest, so the data supports the claim.',
      wrongAnswerExplanations: {
        A: 'The claim is about programs per member, not total reach or membership size; fewer members with more programs can produce a higher ratio.',
        B: 'River North does offer the most programs in absolute terms (15), but the claim is specifically about programs per member, which requires a ratio calculation, not a raw count comparison.',
        D: 'Eastwood serving more people per program is not the same as offering more programs per member; the planner\'s claim is about the programs-to-members ratio, which Eastwood has the lowest of the three.',
      },
      teachingPoint:
        'When a claim involves "per" (per member, per dollar, per unit), you must calculate a ratio for each item — raw numbers alone will mislead you.',
    },
    {
      id: 'qe-d-014',
      skillSlug: 'quantitative-evidence',
      level: 'foundation',
      difficulty: 'easy',
      errorCategory: 'value-comparison',
      stimulus:
        'The table below shows the number of books donated to a school library drive by four homerooms.\n\nHomeroom | Books Donated\nRoom 101 | 34\nRoom 102 | 27\nRoom 103 | 41\nRoom 104 | 19\n\nA student newspaper reported: "Room 103 donated more books than any other homeroom in the drive."',
      question: 'Does the data support the newspaper\'s claim?',
      choices: [
        {
          label: 'A',
          text: 'Yes, because Room 103\'s 41 books is the highest total of the four homerooms.',
        },
        {
          label: 'B',
          text: 'No, because Room 101 donated more books than Room 103.',
        },
        {
          label: 'C',
          text: 'No, because the table does not show how many books each homeroom kept.',
        },
        {
          label: 'D',
          text: 'Yes, because Room 104 donated the fewest books.',
        },
      ],
      correctAnswer: 'A',
      explanation:
        'Room 103 donated 41 books, which is more than Room 101 (34), Room 102 (27), and Room 104 (19). Since 41 is the highest value in the table, the data supports the newspaper\'s claim.',
      wrongAnswerExplanations: {
        B: 'Room 101 donated 34 books, which is fewer than Room 103\'s 41, so this misreads the values.',
        C: 'The claim is about books donated, which the table shows directly; books kept is not relevant.',
        D: 'That Room 104 donated the fewest (19) is true but does not confirm Room 103 was the highest; the winning value must be compared against all others, not just the lowest.',
      },
      teachingPoint:
        'To confirm a "more than any other" claim, check the named value against every other value in the table, not just the lowest one.',
    },
    {
      id: 'qe-d-015',
      skillSlug: 'quantitative-evidence',
      level: 'challenge',
      difficulty: 'hard',
      errorCategory: 'qualifier-overreach',
      stimulus:
        'The table below shows average commute times (in minutes) for workers in three districts over two years.\n\nDistrict | 2020 Avg. Commute | 2023 Avg. Commute\nNorthgate | 38 | 35\nWestfield | 44 | 47\nCentral | 31 | 31\n\nAn urban planner stated: "Between 2020 and 2023, commute times fell across all three districts."',
      question: 'Does the data support the planner\'s claim?',
      choices: [
        {
          label: 'A',
          text: 'Yes, because commute times fell in two of the three districts.',
        },
        {
          label: 'B',
          text: 'No, because Westfield\'s commute time increased and Central\'s commute time stayed the same, so commute times did not fall in all three districts.',
        },
        {
          label: 'C',
          text: 'Yes, because the average commute across the three districts fell from 2020 to 2023.',
        },
        {
          label: 'D',
          text: 'No, because Northgate\'s commute time increased between 2020 and 2023.',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'The claim requires commute times to have fallen in all three districts. Northgate\'s time did fall (38 to 35), but Westfield\'s rose (44 to 47) and Central\'s remained unchanged (31 to 31). Because the claim says "all three districts" and two of the three do not show a fall, the data does not support it.',
      wrongAnswerExplanations: {
        A: 'A fall in two out of three districts does not satisfy the claim that commute times fell "across all three." "All" means every single one.',
        C: 'Even if the overall average across the three districts fell, the planner\'s claim specifies "all three districts" individually, and Westfield rose while Central held steady.',
        D: 'Northgate\'s commute time fell from 38 to 35 minutes, not increased; this choice misreads the table.',
      },
      teachingPoint:
        '"All" is an absolute word. When a claim uses "all," every single item must meet the condition. If even one does not, the claim fails — regardless of what the majority shows.',
    },
  ],
  masteryQuestions: [
    {
      id: 'qe-m-001',
      skillSlug: 'quantitative-evidence',
      level: 'foundation',
      difficulty: 'easy',
      errorCategory: 'value-comparison',
      stimulus:
        'The table below shows the number of volunteers who signed up for a neighborhood cleanup in four zones.\n\nZone | Volunteers\nZone A | 22\nZone B | 35\nZone C | 18\nZone D | 29\n\nA coordinator noted: "Zone B had the most volunteers of any zone."',
      question: 'Does the data support the coordinator\'s note?',
      choices: [
        { label: 'A', text: 'Yes, because Zone B\'s 35 is the highest value in the table.' },
        { label: 'B', text: 'No, because Zone D had more volunteers than Zone B.' },
        { label: 'C', text: 'No, because Zone C had the fewest volunteers, not Zone A.' },
        { label: 'D', text: 'Yes, because Zone A had 22 volunteers.' },
      ],
      correctAnswer: 'A',
      explanation:
        'Zone B recorded 35 volunteers, more than Zone A (22), Zone C (18), and Zone D (29). The data supports the coordinator\'s claim.',
      wrongAnswerExplanations: {
        B: 'Zone D had 29 volunteers, fewer than Zone B\'s 35.',
        C: 'This statement about Zone C is true but irrelevant to whether Zone B led the count.',
        D: 'Zone A\'s value does not verify the claim about Zone B being highest.',
      },
      teachingPoint:
        'Confirm the named value is strictly greater than every other value in the table.',
    },
    {
      id: 'qe-m-002',
      skillSlug: 'quantitative-evidence',
      level: 'foundation',
      difficulty: 'easy',
      errorCategory: 'value-comparison',
      stimulus:
        'A table records the number of days of rain in four cities during one month.\n\nCity | Rainy Days\nPalmora | 8\nStonefield | 14\nVexby | 11\nCraigmont | 6\n\nA meteorologist claimed: "Craigmont had fewer rainy days than any other city during the month."',
      question: 'Does the data support the meteorologist\'s claim?',
      choices: [
        { label: 'A', text: 'Yes, because Craigmont\'s 6 days is the lowest value listed.' },
        { label: 'B', text: 'No, because Palmora had fewer rainy days than Craigmont.' },
        { label: 'C', text: 'Yes, because Stonefield had the most rainy days.' },
        { label: 'D', text: 'No, because all four cities had the same number of rainy days.' },
      ],
      correctAnswer: 'A',
      explanation:
        'Craigmont had 6 rainy days, fewer than Palmora (8), Vexby (11), and Stonefield (14). The data supports the claim that Craigmont had the fewest.',
      wrongAnswerExplanations: {
        B: 'Palmora had 8 rainy days, more than Craigmont\'s 6, not fewer.',
        C: 'Stonefield leading in rainy days is true but does not directly confirm that Craigmont had the fewest; a full comparison is needed.',
        D: 'The cities had different totals, so this is false.',
      },
      teachingPoint:
        'For "fewer than any other" claims, the named value must be smaller than every other value in the table.',
    },
    {
      id: 'qe-m-003',
      skillSlug: 'quantitative-evidence',
      level: 'sat-application',
      difficulty: 'medium',
      errorCategory: 'trend-reading',
      stimulus:
        'The table below shows the percentage of households in a town that owned at least one bicycle over four years.\n\nYear | Households with Bicycle (%)\n2015 | 18\n2017 | 24\n2019 | 29\n2021 | 33\n\nA city planner stated: "Bicycle ownership among households in the town grew steadily from 2015 to 2021."',
      question: 'Does the data support the planner\'s claim?',
      choices: [
        {
          label: 'A',
          text: 'Yes, because the percentage increased in each two-year interval shown.',
        },
        {
          label: 'B',
          text: 'No, because the percentage fell at least once during the period.',
        },
        {
          label: 'C',
          text: 'Yes, because the 2021 figure is more than double the 2015 figure.',
        },
        {
          label: 'D',
          text: 'No, because the data only includes even years.',
        },
      ],
      correctAnswer: 'A',
      explanation:
        'The percentage rose at each recorded interval: 18 to 24 (2015–2017), 24 to 29 (2017–2019), and 29 to 33 (2019–2021). Each step increased, consistent with the claim of steady growth.',
      wrongAnswerExplanations: {
        B: 'The percentage never fell in the data shown; it rose at every recorded step.',
        C: '33 percent is not more than double 18 percent (which would be 36 percent), so this overstates the comparison — and it does not address whether the growth was steady.',
        D: 'The data covering only even years does not prevent it from showing a trend over the years it does record.',
      },
      teachingPoint:
        'A "grew steadily" claim is supported when every recorded step shows an increase, even if years between data points are not measured.',
    },
    {
      id: 'qe-m-004',
      skillSlug: 'quantitative-evidence',
      level: 'sat-application',
      difficulty: 'medium',
      errorCategory: 'qualifier-overreach',
      stimulus:
        'A survey asked 150 college students to name their primary source for news. Responses: social media, 72 students; television, 45 students; newspapers or news websites, 33 students. A researcher wrote: "The majority of students surveyed identified social media as their primary news source."',
      question: 'Does the data support the researcher\'s claim?',
      choices: [
        {
          label: 'A',
          text: 'Yes, because social media received more responses than television and newspapers combined.',
        },
        {
          label: 'B',
          text: 'No, because only 72 of 150 students chose social media, which is 48 percent — less than a majority.',
        },
        {
          label: 'C',
          text: 'Yes, because social media got more responses than either other category alone.',
        },
        {
          label: 'D',
          text: 'No, because television was the most popular source.',
        },
      ],
      correctAnswer: 'B',
      explanation:
        '"Majority" means more than half. Social media received 72 of 150 responses, which is 48 percent — just below half. Because 72 is not more than 75 (which would be exactly half of 150), the claim is not supported.',
      wrongAnswerExplanations: {
        A: 'Television (45) plus newspapers (33) equals 78 responses, which is actually more than social media\'s 72, so this premise is also wrong — and regardless, "majority" means over half of all respondents, not more than other groups combined.',
        C: 'Getting more responses than any single other category makes social media the top choice (plurality), but a majority requires over 50 percent of all responses.',
        D: 'Television received 45 responses, fewer than social media\'s 72, so television was not the most popular.',
      },
      teachingPoint:
        '"Majority" and "plurality" are not the same. Majority means more than half of the total; plurality means more than any single other option.',
    },
    {
      id: 'qe-m-005',
      skillSlug: 'quantitative-evidence',
      level: 'advanced',
      difficulty: 'hard',
      errorCategory: 'claim-scope',
      stimulus:
        'The table below shows monthly energy output (in megawatt-hours) from two power sources at a facility over four months.\n\nMonth | Solar Output | Wind Output\nMarch | 420 | 310\nApril | 510 | 290\nMay | 580 | 330\nJune | 620 | 275\n\nAn engineer claimed: "Solar output exceeded wind output in every month recorded, and the gap between them widened over the four months."',
      question: 'Does the data support both parts of the engineer\'s claim?',
      choices: [
        {
          label: 'A',
          text: 'Yes, because solar exceeded wind in each month and the difference increased from March to June.',
        },
        {
          label: 'B',
          text: 'No, because wind output exceeded solar output in at least one month.',
        },
        {
          label: 'C',
          text: 'Yes, because solar output increased every month while wind output stayed flat.',
        },
        {
          label: 'D',
          text: 'No, because solar exceeded wind every month but the gap narrowed from April to May.',
        },
      ],
      correctAnswer: 'A',
      explanation:
        'Solar output exceeded wind output in all four months. The differences are: March 110, April 220, May 250, June 345. Each month\'s gap is larger than the previous month\'s, so the gap did widen consistently. Both parts of the claim are supported.',
      wrongAnswerExplanations: {
        B: 'Solar exceeded wind in all four months: 420 > 310, 510 > 290, 580 > 330, 620 > 275. Wind never exceeded solar.',
        C: 'Solar output did increase every month (420, 510, 580, 620), but wind output did not stay flat — it varied (310, 290, 330, 275). The claim says "gap widened," not that wind was flat.',
        D: 'The gap in April is 220 (510 − 290) and in May is 250 (580 − 330), so the gap grew from April to May, not narrowed. This choice misreads the table.',
      },
      teachingPoint:
        'When a claim has two parts ("exceeded" and "gap widened"), check each part separately against the data before deciding whether the full claim is supported.',
    },
    {
      id: 'qe-m-006',
      skillSlug: 'quantitative-evidence',
      level: 'advanced',
      difficulty: 'hard',
      errorCategory: 'causation-vs-correlation',
      stimulus:
        'A health department table records, for five consecutive years, the number of new gyms opened in a county and the average body mass index (BMI) of county residents.\n\nYear | New Gyms | Average BMI\n2018 | 3 | 27.8\n2019 | 5 | 27.5\n2020 | 4 | 27.6\n2021 | 7 | 27.1\n2022 | 9 | 26.8\n\nA health columnist wrote: "This data proves that opening more gyms in a county directly lowers residents\' average BMI."',
      question: 'Does the data support the columnist\'s claim?',
      choices: [
        {
          label: 'A',
          text: 'Yes, because in most years when more gyms opened, average BMI fell.',
        },
        {
          label: 'B',
          text: 'No, because the data shows a correlation between gym openings and BMI but cannot prove one caused the other.',
        },
        {
          label: 'C',
          text: 'Yes, because average BMI declined in four of the five years.',
        },
        {
          label: 'D',
          text: 'No, because average BMI rose in 2020 when fewer gyms opened than in 2019, disproving any relationship.',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'The data shows that both the number of new gyms and average BMI changed over the same period, but this is a correlation, not a proven causal relationship. Many other factors — changes in diet, economic conditions, public health campaigns — could explain the BMI trend. The columnist\'s use of "directly lowers" and "proves" goes beyond what a correlation table can establish.',
      wrongAnswerExplanations: {
        A: 'Even if the pattern holds in most years, a pattern in observational data cannot prove causation — that is the correlation-causation distinction.',
        C: 'The BMI trend is real, but whether it is caused by the gyms is what the data cannot answer; noting the BMI decline does not address the causal claim.',
        D: 'The 2020 dip is one inconsistency, but it does not "disprove any relationship" — and the stronger reason to reject the claim is the causation problem even if the pattern were perfect.',
      },
      teachingPoint:
        'Data that shows two variables moving in the same direction over time establishes correlation. Words like "proves" and "directly causes" require experimental evidence that observational tables cannot provide.',
    },
    {
      id: 'qe-m-007',
      skillSlug: 'quantitative-evidence',
      level: 'advanced',
      difficulty: 'hard',
      errorCategory: 'qualifier-overreach',
      stimulus:
        'The table below shows the percentage of students at four high schools who reported reading for pleasure at least once a week.\n\nSchool | Students Reading Weekly (%)\nHillcrest | 62\nOakdale | 54\nRiverside | 71\nPinewood | 49\n\nA district administrator claimed: "At every school in the district, more than half of students read for pleasure at least once a week."',
      question: 'Does the data support the administrator\'s claim?',
      choices: [
        {
          label: 'A',
          text: 'Yes, because the average across all four schools exceeds 50 percent.',
        },
        {
          label: 'B',
          text: 'No, because Pinewood\'s figure of 49 percent is below 50 percent, meaning the claim does not hold for every school.',
        },
        {
          label: 'C',
          text: 'Yes, because three of the four schools reported figures above 50 percent.',
        },
        {
          label: 'D',
          text: 'No, because Oakdale also reported a figure below 50 percent.',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'The claim requires every school to exceed 50 percent. Pinewood\'s figure is 49 percent, which falls below that threshold. Because the claim says "every school" and one school does not meet the condition, the data does not support it.',
      wrongAnswerExplanations: {
        A: 'Even if the district average exceeds 50 percent, the claim is specifically about each school individually; an average can conceal one school falling short.',
        C: 'Three out of four meeting the condition is not the same as all four. "Every" is an absolute term that requires no exceptions.',
        D: 'Oakdale reported 54 percent, which is above 50 percent, so Oakdale does meet the condition. Only Pinewood falls short.',
      },
      teachingPoint:
        'When a claim uses "every" or "all," a single exception disproves it. Scan every row in the table before confirming an absolute claim.',
    },
    {
      id: 'qe-m-008',
      skillSlug: 'quantitative-evidence',
      level: 'challenge',
      difficulty: 'hard',
      errorCategory: 'percentage-vs-count',
      stimulus:
        'The table below shows data on two medical clinics that participated in a vaccination program last spring.\n\nClinic | Patients Seen | Patients Vaccinated | Vaccination Rate (%)\nNorthview | 800 | 480 | 60\nSouthpark | 250 | 175 | 70\n\nA public health official wrote: "Southpark Clinic vaccinated a higher percentage of its patients, and it also vaccinated more patients in total, than Northview Clinic."',
      question: 'Does the data support both parts of the official\'s claim?',
      choices: [
        {
          label: 'A',
          text: 'Yes, because Southpark had a higher vaccination rate and served patients more efficiently.',
        },
        {
          label: 'B',
          text: 'No, because while Southpark had a higher vaccination rate (70% vs 60%), Northview vaccinated more patients in total (480 vs 175).',
        },
        {
          label: 'C',
          text: 'Yes, because 70 percent is greater than 60 percent, and Southpark is a smaller clinic.',
        },
        {
          label: 'D',
          text: 'No, because Northview had a higher vaccination rate than Southpark.',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'The first part of the claim is correct: Southpark\'s vaccination rate was 70 percent versus Northview\'s 60 percent. The second part is incorrect: Northview vaccinated 480 patients while Southpark vaccinated only 175. A higher rate at a smaller clinic does not translate into a higher absolute count. The data supports only the first part of the claim.',
      wrongAnswerExplanations: {
        A: 'Southpark\'s higher rate is confirmed, but the claim also states it vaccinated more patients in total — which the table directly contradicts (175 < 480).',
        C: 'Southpark being smaller explains why its rate differs from its count, but the question is whether the official\'s claim is supported, and the "more patients in total" part is wrong.',
        D: 'Northview\'s vaccination rate was 60 percent, which is lower than Southpark\'s 70 percent, so this directly contradicts the table.',
      },
      teachingPoint:
        'A two-part claim can be partially supported. Always evaluate each part independently: a higher percentage does not mean a higher count when clinic sizes differ.',
    },
  ],
}
