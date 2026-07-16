import type { AcademySkill } from '../types'

export const quantitativeEvidence: AcademySkill = {
  slug: 'quantitative-evidence',
  title: 'Quantitative Evidence',
  section: 'reading',
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
    },
    {
      id: 'qe-ex-2',
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
    },
    {
      id: 'qe-ex-3',
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
    },
  ],
  drillQuestions: [
    {
      id: 'qe-d-001',
      skillSlug: 'quantitative-evidence',
      difficulty: 'easy',
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
      difficulty: 'easy',
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
      difficulty: 'easy',
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
      difficulty: 'medium',
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
      difficulty: 'medium',
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
      difficulty: 'medium',
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
      difficulty: 'medium',
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
      difficulty: 'hard',
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
      difficulty: 'hard',
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
      difficulty: 'hard',
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
  ],
}
