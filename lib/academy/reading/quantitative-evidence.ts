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
    {
      title: `The wrong-column trap`,
      description: `A choice picks a number from the right table but the wrong column — for example, reading a "2020" value when the claim is about "2023," or reading "total revenue" when the claim is about "revenue per customer."`,
      avoidance: `Before selecting a value, re-read the claim and trace your finger to the exact row and column that matches both the category and the time period named. Wrong-column errors feel convincing because the number exists in the table.`,
    },
    {
      title: `The relative-vs-absolute trap`,
      description: `A choice confuses a relative change (something increased by 10%) with an absolute level (something reached 10%), or vice versa. The claim says one thing; the answer restates the other.`,
      avoidance: `Ask: does the claim use a change word (rose, fell, grew, dropped) or a level word (was, equaled, reached)? Match the type of language in the answer to the type of claim being made.`,
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
    {
      id: 'qe-ex-4',
      level: 'foundation',
      hints: [
        `Identify the year the claim is about and check whether that year appears in the table.`,
        `Find the value for the named year and compare it to the threshold stated in the claim.`,
        `Ask: is the claim about the right year, the right number, and the right comparison?`,
      ],
      stimulus: `A city tracked the percentage of residents who used public transit as their primary commute method.\n\nYear | Transit Use (%)\n2015 | 31\n2017 | 38\n2019 | 44\n2021 | 51\n\nA transportation planner wrote: "By 2021, a majority of residents had switched to public transit as their main way to commute."`,
      question: `Does the data support the planner's claim?`,
      steps: [
        {
          instruction: `Identify the claim's key terms`,
          content: `The claim states that by 2021, a majority — meaning more than 50 percent — used public transit as their primary commute.`,
        },
        {
          instruction: `Find the value for 2021`,
          content: `The table shows 51 percent in 2021.`,
        },
        {
          instruction: `Check the threshold`,
          content: `51 percent is more than 50 percent, so a majority did use transit in 2021.`,
        },
        {
          instruction: `Decide support`,
          content: `The data directly confirms the claim: 51 percent exceeds the majority threshold.`,
        },
      ],
      choices: [
        { label: 'A', text: `Yes, because 51 percent is more than half, which meets the definition of a majority.` },
        { label: 'B', text: `No, because the data only goes to 2021 and the trend might reverse.` },
        { label: 'C', text: `Yes, because transit use increased in every interval shown.` },
        { label: 'D', text: `No, because 51 percent is not a large enough majority to be meaningful.` },
      ],
      correctAnswer: 'A',
      explanation: `A majority means more than 50 percent. The 2021 figure is 51 percent, which exceeds that threshold. The data supports the planner's claim directly.`,
      wrongAnswerExplanations: {
        B: `The claim is about 2021, and the data does include 2021. Whether the trend continues after that is irrelevant to the stated claim.`,
        C: `Transit use did rise each interval, but this is a reason supporting a trend claim, not the reason supporting a majority claim. The correct reason is that 51 percent exceeds 50 percent.`,
        D: `"Majority" has a precise meaning — more than half — and 51 percent meets it. The claim does not specify the size of the majority.`,
      },
      coachTakeaway: `For majority claims, you only need to check whether the named value exceeds 50 percent. The size of the majority beyond that threshold is irrelevant unless the claim says "overwhelming majority" or uses some other qualifier.`,
    },
    {
      id: 'qe-ex-5',
      level: 'sat-application',
      hints: [
        `Identify exactly what column the claim is referencing — revenue per store, or total revenue?`,
        `Find the values for both years mentioned in the claim.`,
        `Check: did the right metric actually increase, or did only a different metric increase?`,
      ],
      stimulus: `A retail chain reported the following financial data for two years.\n\nYear | Total Revenue ($M) | Number of Stores | Revenue per Store ($M)\n2020 | 120 | 40 | 3.0\n2023 | 180 | 90 | 2.0\n\nA financial analyst wrote: "From 2020 to 2023, the chain became more productive on a per-store basis, as revenue per store increased."`,
      question: `Does the data support the analyst's claim?`,
      steps: [
        {
          instruction: `Identify what the claim says`,
          content: `The claim is that revenue per store increased from 2020 to 2023.`,
        },
        {
          instruction: `Find the relevant column`,
          content: `Revenue per store: 2020 = $3.0M, 2023 = $2.0M.`,
        },
        {
          instruction: `Compare the values`,
          content: `$2.0M in 2023 is less than $3.0M in 2020, so revenue per store fell, not rose.`,
        },
        {
          instruction: `Decide support`,
          content: `The data contradicts the claim. The analyst appears to have looked at total revenue (which did rise) rather than revenue per store.`,
        },
      ],
      choices: [
        { label: 'A', text: `Yes, because total revenue rose from $120M to $180M.` },
        { label: 'B', text: `No, because revenue per store fell from $3.0M to $2.0M, contradicting the claim.` },
        { label: 'C', text: `Yes, because the chain opened more stores, which increased productivity.` },
        { label: 'D', text: `No, because the data does not include information about revenue per store.` },
      ],
      correctAnswer: 'B',
      explanation: `The claim is specifically about revenue per store. The table shows this fell from $3.0M to $2.0M. Although total revenue rose, that is a different metric. The data does not support — in fact, it contradicts — the analyst's claim.`,
      wrongAnswerExplanations: {
        A: `Total revenue did rise, but the claim is about per-store revenue, which fell. Reading the wrong column is a classic trap.`,
        C: `Opening more stores can raise total revenue while lowering per-store productivity, which is exactly what happened here.`,
        D: `Revenue per store is listed in the table's right column; the data does include it.`,
      },
      coachTakeaway: `Always match the metric in the claim to the exact column in the table. "Total revenue" and "revenue per store" are different columns with different stories — and they can point in opposite directions.`,
    },
    {
      id: 'qe-ex-6',
      level: 'advanced',
      hints: [
        `The claim uses the word "every." What does that require you to check?`,
        `Go through each year-to-year change in the table and note the direction of each.`,
        `A single year where the value does not rise is enough to defeat an "every year" claim.`,
      ],
      stimulus: `A school district measured the percentage of students who passed the state reading assessment each year.\n\nYear | Pass Rate (%)\n2018 | 64\n2019 | 68\n2020 | 65\n2021 | 71\n2022 | 74\n\nA school board member stated: "The pass rate improved every year from 2018 to 2022."`,
      question: `Does the data support the board member's claim?`,
      steps: [
        {
          instruction: `State what the claim requires`,
          content: `"Every year" means each year-to-year change must show an increase.`,
        },
        {
          instruction: `Check each interval`,
          content: `2018–2019: 64 to 68 (up). 2019–2020: 68 to 65 (down). 2020–2021: 65 to 71 (up). 2021–2022: 71 to 74 (up).`,
        },
        {
          instruction: `Identify the exception`,
          content: `The 2019–2020 interval shows a drop from 68 to 65. This interrupts the streak.`,
        },
        {
          instruction: `Decide support`,
          content: `Because one year-to-year change is negative, the data does not support the "every year" claim.`,
        },
      ],
      choices: [
        { label: 'A', text: `Yes, because the overall rate rose from 64 to 74 over the period.` },
        { label: 'B', text: `Yes, because the pass rate improved in most of the years shown.` },
        { label: 'C', text: `No, because the pass rate dropped from 2019 to 2020, so it did not improve every year.` },
        { label: 'D', text: `No, because the 2022 pass rate was not above 80 percent.` },
      ],
      correctAnswer: 'C',
      explanation: `The claim requires improvement in every year. The pass rate fell from 68 percent in 2019 to 65 percent in 2020. That single dip defeats an "every year" claim, even though the overall trend across the full period is upward.`,
      wrongAnswerExplanations: {
        A: `A net increase over the full period is not the same as an increase in every individual year.`,
        B: `"Most years" is a weaker condition than "every year." The claim says every year, so a majority is insufficient.`,
        D: `The claim is about whether the rate improved every year, not about whether it reached 80 percent.`,
      },
      coachTakeaway: `"Every year" is an absolute claim. Check every single year-to-year interval. One dip defeats the claim no matter how strong the overall trend is. This is one of the most common traps on quantitative evidence questions.`,
    },
    {
      id: 'qe-ex-7',
      level: 'advanced',
      hints: [
        `The claim is about "average donation per donor," not total donations. Which column gives you that?`,
        `What arithmetic do you need to perform to find average donation per donor?`,
        `Compare the calculated values for both years and check whether one is higher.`,
      ],
      stimulus: `A nonprofit recorded fundraising data for two consecutive years.\n\nYear | Total Donations ($) | Number of Donors\n2021 | 48,000 | 160\n2022 | 54,000 | 200\n\nA fundraising director claimed: "In 2022, our average donation per donor was higher than in 2021."`,
      question: `Does the data support the director's claim?`,
      steps: [
        {
          instruction: `Identify what the claim requires`,
          content: `The claim is about average donation per donor, which equals total donations divided by number of donors.`,
        },
        {
          instruction: `Calculate for 2021`,
          content: `$48,000 ÷ 160 donors = $300 per donor.`,
        },
        {
          instruction: `Calculate for 2022`,
          content: `$54,000 ÷ 200 donors = $270 per donor.`,
        },
        {
          instruction: `Compare and decide`,
          content: `$270 in 2022 is less than $300 in 2021, so the average donation per donor actually fell. The claim is not supported.`,
        },
      ],
      choices: [
        { label: 'A', text: `Yes, because total donations rose from $48,000 to $54,000.` },
        { label: 'B', text: `Yes, because the number of donors increased from 160 to 200.` },
        { label: 'C', text: `No, because the average donation per donor fell from $300 in 2021 to $270 in 2022.` },
        { label: 'D', text: `No, because the data does not specify how many donors gave more than once.` },
      ],
      correctAnswer: 'C',
      explanation: `The average donation per donor is total donations divided by number of donors. In 2021: $48,000 ÷ 160 = $300. In 2022: $54,000 ÷ 200 = $270. The 2022 average is lower, so the data contradicts the director's claim.`,
      wrongAnswerExplanations: {
        A: `Total donations rising does not mean the per-donor average rose; more donors can inflate the total while each gives less.`,
        B: `A larger donor pool also does not prove the average per donor increased; it is a different measure entirely.`,
        D: `Repeat donors are not relevant to this calculation, which only requires total donations and total donor count.`,
      },
      coachTakeaway: `When a claim involves a "per" metric, you must calculate it — do not assume a higher total implies a higher per-unit value. Tables that give totals and counts invite this exact mistake.`,
    },
    {
      id: 'qe-ex-8',
      level: 'challenge',
      hints: [
        `The claim has two parts: one about a specific country and one about all countries combined. Check each part separately.`,
        `For the first part, find the exact value for Country X in the relevant year.`,
        `For the second part, you need to average all countries' values — not just look at one.`,
      ],
      stimulus: `A report recorded annual plastic waste per capita (in kilograms) for five countries in 2022.\n\nCountry | Plastic Waste per Capita (kg)\nCountry A | 68\nCountry B | 42\nCountry C | 55\nCountry D | 91\nCountry E | 34\n\nA researcher wrote: "Country D produced the most plastic waste per capita in 2022, and the average across all five countries exceeded 55 kilograms."`,
      question: `Does the data support both parts of the researcher's claim?`,
      steps: [
        {
          instruction: `Check the first part`,
          content: `Country D had 91 kg, which is higher than A (68), B (42), C (55), and E (34). Country D did produce the most.`,
        },
        {
          instruction: `Check the second part — set up the calculation`,
          content: `Average = sum of all values ÷ number of countries = (68 + 42 + 55 + 91 + 34) ÷ 5.`,
        },
        {
          instruction: `Calculate the average`,
          content: `68 + 42 = 110; 110 + 55 = 165; 165 + 91 = 256; 256 + 34 = 290. Average = 290 ÷ 5 = 58 kg.`,
        },
        {
          instruction: `Evaluate the second part`,
          content: `58 kg is greater than 55 kg, so the average did exceed 55 kg. Both parts of the claim are supported.`,
        },
      ],
      choices: [
        { label: 'A', text: `Yes, Country D produced the most, and the five-country average of 58 kg exceeded 55 kg.` },
        { label: 'B', text: `No, because the average of the five countries is exactly 55 kg, not above it.` },
        { label: 'C', text: `No, because Country A, not Country D, produced the most plastic waste.` },
        { label: 'D', text: `Yes, because three of the five countries had values above 42 kg.` },
      ],
      correctAnswer: 'A',
      explanation: `Country D's 91 kg is the highest value in the table (first part: supported). The sum of all five values is 290 kg; divided by 5, the average is 58 kg, which exceeds 55 kg (second part: supported). Both parts of the claim are confirmed by the data.`,
      wrongAnswerExplanations: {
        B: `The average is 58 kg, not 55. This choice makes an arithmetic error.`,
        C: `Country A had 68 kg, which is less than Country D's 91 kg, so Country D does lead.`,
        D: `Three countries having values above 42 kg is a true but irrelevant observation; it does not address either part of the researcher's actual claim.`,
      },
      coachTakeaway: `When a claim has two parts, evaluate them separately and in order. For an average claim, you must add all values and divide — you cannot eyeball it. One accurate part and one incorrect part means the full claim is not supported.`,
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
    {
      id: 'qe-d-016',
      skillSlug: 'quantitative-evidence',
      level: 'foundation',
      difficulty: 'easy',
      errorCategory: 'value-comparison',
      stimulus: `A table shows the number of customer complaints received by four branches of a bank last quarter.\n\nBranch | Complaints\nNorth | 17\nSouth | 31\nEast | 9\nWest | 24\n\nA manager reported: "The East branch received the fewest complaints of any branch last quarter."`,
      question: `Does the data support the manager's report?`,
      choices: [
        { label: 'A', text: `Yes, because East's 9 complaints is the lowest value in the table.` },
        { label: 'B', text: `No, because North had fewer complaints than East.` },
        { label: 'C', text: `No, because South had the most complaints, not the fewest.` },
        { label: 'D', text: `Yes, because West had 24 complaints.` },
      ],
      correctAnswer: 'A',
      explanation: `East had 9 complaints, fewer than North (17), South (31), and West (24). Since 9 is the lowest value in the table, the data supports the manager's report.`,
      wrongAnswerExplanations: {
        B: `North had 17 complaints, more than East's 9, so North did not have fewer than East.`,
        C: `That South had the most is true but does not confirm the claim about East being lowest; a direct comparison with all branches is what matters.`,
        D: `West's 24 complaints does not confirm East as the minimum; it only shows West had more than East.`,
      },
      teachingPoint: `To verify a "fewest" claim, confirm the named value is smaller than every other value in the table — not just most of them.`,
    },
    {
      id: 'qe-d-017',
      skillSlug: 'quantitative-evidence',
      level: 'foundation',
      difficulty: 'easy',
      errorCategory: 'value-comparison',
      stimulus: `A table shows daily step counts for three friends over one week (Monday to Friday average).\n\nFriend | Avg. Daily Steps\nMaria | 8,200\nLiam | 11,500\nPreya | 9,700\n\nA fitness coach noted: "Liam averaged more daily steps than both Maria and Preya."`,
      question: `Does the data support the coach's note?`,
      choices: [
        { label: 'A', text: `Yes, because 11,500 is higher than both 8,200 and 9,700.` },
        { label: 'B', text: `No, because Preya had more steps than Liam.` },
        { label: 'C', text: `No, because the data does not include weekend step counts.` },
        { label: 'D', text: `Yes, because Maria had the fewest steps of the three.` },
      ],
      correctAnswer: 'A',
      explanation: `Liam averaged 11,500 steps per day, more than Maria's 8,200 and Preya's 9,700. The data directly supports the coach's note.`,
      wrongAnswerExplanations: {
        B: `Preya averaged 9,700 steps, fewer than Liam's 11,500, so Preya did not have more than Liam.`,
        C: `The claim is about the Monday-to-Friday averages shown in the table. The absence of weekend data does not invalidate the comparison the table does include.`,
        D: `That Maria had the fewest is true but does not confirm the specific claim that Liam exceeded both others; a direct comparison of Liam against each person is needed.`,
      },
      teachingPoint: `For a "more than both" claim, confirm the named value is strictly greater than each of the other two values individually.`,
    },
    {
      id: 'qe-d-018',
      skillSlug: 'quantitative-evidence',
      level: 'sat-application',
      difficulty: 'medium',
      errorCategory: 'wrong-column',
      stimulus: `A university tracked graduation rates and average time-to-degree for three programs.\n\nProgram | Graduation Rate (%) | Avg. Years to Degree\nEngineering | 82 | 4.6\nBusiness | 91 | 3.9\nHumanities | 78 | 4.1\n\nAn administrator claimed: "Engineering students take longer to graduate on average than students in either of the other two programs."`,
      question: `Does the data support the administrator's claim?`,
      choices: [
        { label: 'A', text: `No, because Engineering has a lower graduation rate than Business.` },
        { label: 'B', text: `No, because Humanities students take longer than Engineering students.` },
        { label: 'C', text: `Yes, because Engineering's average of 4.6 years is higher than Business (3.9) and Humanities (4.1).` },
        { label: 'D', text: `Yes, because Engineering has a lower graduation rate, meaning more students struggle and stay longer.` },
      ],
      correctAnswer: 'C',
      explanation: `The claim is about average years to degree. Engineering's 4.6 years is longer than Business (3.9) and Humanities (4.1). The data supports the claim.`,
      wrongAnswerExplanations: {
        A: `Graduation rate is the wrong column for this claim; the claim is about time to degree, not completion percentage.`,
        B: `Humanities students average 4.1 years, fewer than Engineering's 4.6. This misreads the time-to-degree column.`,
        D: `This reasoning infers a causal connection that the data does not show; the claim is supported directly by the time-to-degree values, without needing to speculate about why.`,
      },
      teachingPoint: `Identify the exact column the claim references before looking at any values. A table with multiple columns invites wrong-column errors.`,
    },
    {
      id: 'qe-d-019',
      skillSlug: 'quantitative-evidence',
      level: 'sat-application',
      difficulty: 'medium',
      errorCategory: 'qualifier-overreach',
      stimulus: `A survey asked 300 high school students which subject they found most challenging. Results: Math 135, Science 90, English 45, History 30. A teacher claimed: "The majority of students surveyed found math to be the most challenging subject."`,
      question: `Does the data support the teacher's claim?`,
      choices: [
        { label: 'A', text: `Yes, because Math received more responses than Science, English, and History combined.` },
        { label: 'B', text: `No, because only 135 of 300 students chose Math, which is 45 percent — below a majority.` },
        { label: 'C', text: `Yes, because Math was the single most popular answer.` },
        { label: 'D', text: `No, because Science was the second most common answer, making Math less dominant.` },
      ],
      correctAnswer: 'B',
      explanation: `A majority means more than half (more than 150 of 300). Math received 135 responses, which is 45 percent — below the majority threshold. Although Math was the most popular single answer, it was chosen by less than half of students.`,
      wrongAnswerExplanations: {
        A: `Math did not exceed all others combined: Science (90) + English (45) + History (30) = 165, which is more than Math's 135. And regardless, majority means over half of all respondents, not more than any other group.`,
        C: `Being the most popular single answer is a plurality, not a majority. These are different thresholds.`,
        D: `Science being second is irrelevant to whether Math constitutes a majority; the only relevant check is whether Math's count exceeds half the total.`,
      },
      teachingPoint: `Majority (over half) and plurality (most popular single answer) are not the same. Always calculate the percentage of the total before confirming a majority claim.`,
    },
    {
      id: 'qe-d-020',
      skillSlug: 'quantitative-evidence',
      level: 'sat-application',
      difficulty: 'medium',
      errorCategory: 'trend-projection',
      stimulus: `A table shows the percentage of a town's energy coming from renewable sources.\n\nYear | Renewable Share (%)\n2016 | 12\n2018 | 19\n2020 | 27\n2022 | 34\n\nA town councilor stated: "At this rate, the town will be drawing 50 percent of its energy from renewables by 2024."`,
      question: `Does the data support the councilor's claim?`,
      choices: [
        { label: 'A', text: `No, because the most recent data point in the table is 2022, and the table provides no figure for 2024.` },
        { label: 'B', text: `Yes, because the renewable share has been rising by about 7–8 percentage points every two years.` },
        { label: 'C', text: `Yes, because 34 percent is already close to 50 percent.` },
        { label: 'D', text: `No, because the renewable share was declining in the years shown.` },
      ],
      correctAnswer: 'A',
      explanation: `The data ends in 2022 at 34 percent. The claim projects to 2024, which is beyond the last data point. Extrapolating a trend does not constitute data support; 2024 was not measured.`,
      wrongAnswerExplanations: {
        B: `Even if the rate of growth suggests 50 percent is plausible by 2024, an extrapolation from past trends is not the same as data evidence. The 2024 figure does not appear in the table.`,
        C: `34 percent is not close enough to 50 percent to confirm the claim, and proximity does not substitute for actual data.`,
        D: `The renewable share was rising, not declining, in the years shown.`,
      },
      teachingPoint: `Claims about future or unmeasured time periods are not supported by data that ends before those periods. A plausible extrapolation is still an extrapolation.`,
    },
    {
      id: 'qe-d-021',
      skillSlug: 'quantitative-evidence',
      level: 'advanced',
      difficulty: 'hard',
      errorCategory: 'percentage-vs-count',
      stimulus: `A hospital tracked surgical outcomes for two surgeons over one year.\n\nSurgeon | Procedures Performed | Complication-Free Rate (%)\nDr. Chen | 50 | 96\nDr. Okafor | 200 | 88\n\nA hospital administrator claimed: "Dr. Chen had fewer total complications than Dr. Okafor."`,
      question: `Does the data support the administrator's claim?`,
      choices: [
        { label: 'A', text: `No, because Dr. Chen performed fewer procedures, so the comparison is unfair.` },
        { label: 'B', text: `No, because Dr. Okafor had a higher total number of complication-free procedures.` },
        { label: 'C', text: `No, because Dr. Chen had a higher complication-free rate, meaning fewer complications per procedure, not fewer total.` },
        { label: 'D', text: `Yes, because Dr. Chen had 2 complications (4% of 50), while Dr. Okafor had 24 complications (12% of 200).` },
      ],
      correctAnswer: 'D',
      explanation: `Total complications = procedures × complication rate. Dr. Chen: 4% of 50 = 2 complications. Dr. Okafor: 12% of 200 = 24 complications. 2 is fewer than 24, so the data supports the administrator's claim.`,
      wrongAnswerExplanations: {
        A: `Whether the comparison is "fair" is not the question; the question is whether the data supports the claim about total numbers.`,
        B: `Dr. Okafor performing more complication-free procedures (176 vs 48) is about a different metric. The claim is about total complications, which requires multiplying the complication rate by total procedures.`,
        C: `This confuses rate with count. Dr. Chen did have a lower complication rate per procedure, but the claim is about total complications — and 2 is indeed fewer than 24.`,
      },
      teachingPoint: `When a claim is about a total count and you are given rates and totals, multiply to find the actual count. A lower rate does not automatically mean fewer total events when volumes differ.`,
    },
    {
      id: 'qe-d-022',
      skillSlug: 'quantitative-evidence',
      level: 'advanced',
      difficulty: 'hard',
      errorCategory: 'causation-vs-correlation',
      stimulus: `A table shows two measurements for six cities: median household income and average number of restaurant visits per household per month.\n\nCity | Median Income ($) | Avg. Restaurant Visits/Month\nCity 1 | 42,000 | 3.1\nCity 2 | 55,000 | 4.0\nCity 3 | 61,000 | 4.8\nCity 4 | 74,000 | 5.6\nCity 5 | 83,000 | 6.2\nCity 6 | 97,000 | 7.1\n\nA food industry analyst wrote: "This data proves that higher income directly causes households to dine out more frequently."`,
      question: `Does the data support the analyst's causal claim?`,
      choices: [
        { label: 'A', text: `Yes, because in every city, higher income corresponds to more restaurant visits.` },
        { label: 'B', text: `Yes, because the data covers six cities, which is a large enough sample to prove causation.` },
        { label: 'C', text: `No, because restaurant visits declined in at least one city despite rising income.` },
        { label: 'D', text: `No, because the data shows a consistent pattern but does not establish that income is the cause of dining frequency.` },
      ],
      correctAnswer: 'D',
      explanation: `The two variables move together across all six cities, which is a strong correlation. However, observational data showing that two things rise together cannot establish that one causes the other. Other factors — such as cultural norms, local restaurant density, or cost of living — could explain both patterns simultaneously.`,
      wrongAnswerExplanations: {
        A: `A perfect correlation across all cities is still correlation, not proof of causation. The word "proves" in the claim requires experimental evidence.`,
        B: `Sample size does not convert correlation into causation. Causal claims require experimental designs, not just more observational data points.`,
        C: `Restaurant visits did not decline in any city in the data shown; the pattern is consistently positive.`,
      },
      teachingPoint: `No matter how consistent a correlation is across the data, observational tables cannot prove causation. The word "proves" or "directly causes" in a claim is a red flag that requires experimental, not correlational, evidence.`,
    },
    {
      id: 'qe-d-023',
      skillSlug: 'quantitative-evidence',
      level: 'advanced',
      difficulty: 'hard',
      errorCategory: 'ratio-and-proportion',
      stimulus: `A company tracks two products' performance.\n\nProduct | Units Sold | Total Revenue ($)\nProduct X | 400 | 12,000\nProduct Y | 150 | 7,500\n\nA sales director claimed: "Product Y generates more revenue per unit sold than Product X."`,
      question: `Does the data support the director's claim?`,
      choices: [
        { label: 'A', text: `No, because Product X generated more total revenue.` },
        { label: 'B', text: `No, because Product X sold more units, indicating greater market demand.` },
        { label: 'C', text: `Yes, because Product Y's revenue per unit ($50) is higher than Product X's ($30).` },
        { label: 'D', text: `Yes, because Product Y had fewer units sold, so each unit must cost more.` },
      ],
      correctAnswer: 'C',
      explanation: `Revenue per unit = total revenue ÷ units sold. Product X: $12,000 ÷ 400 = $30 per unit. Product Y: $7,500 ÷ 150 = $50 per unit. Product Y's per-unit revenue ($50) is higher than Product X's ($30), so the data supports the director's claim.`,
      wrongAnswerExplanations: {
        A: `Total revenue is the wrong metric. The claim is about revenue per unit, which requires a ratio calculation.`,
        B: `Units sold reflects volume, not per-unit revenue. Selling more units at a lower price per unit can generate higher total revenue.`,
        D: `This reaches the correct conclusion but for the wrong reason — fewer units does not automatically mean a higher unit price. The ratio must be calculated.`,
      },
      teachingPoint: `Claims about "per unit" or "per item" metrics require dividing total by count. Do not compare totals when the claim specifies a ratio.`,
    },
    {
      id: 'qe-d-024',
      skillSlug: 'quantitative-evidence',
      level: 'challenge',
      difficulty: 'hard',
      errorCategory: 'two-part-claim',
      stimulus: `A research team measured two variables for five urban neighborhoods: percentage of residents who walk to work, and average monthly spending on transportation per household.\n\nNeighborhood | Walk-to-Work Rate (%) | Monthly Transport Spending ($)\nRiverdale | 12 | 310\nHillcrest | 34 | 185\nSunset | 8 | 420\nMidtown | 41 | 160\nEastpark | 27 | 240\n\nA city planner wrote: "Midtown has the highest walk-to-work rate among the five neighborhoods, and Hillcrest residents spend less on transportation per month than residents of Riverdale."`,
      question: `Does the data support both parts of the planner's claim?`,
      choices: [
        { label: 'A', text: `No, because Hillcrest has the highest walk-to-work rate, not Midtown, though the Hillcrest-Riverdale spending comparison is correct.` },
        { label: 'B', text: `No, because Midtown does have the highest walk-to-work rate, but Hillcrest's monthly spending ($185) is higher than Riverdale's ($310).` },
        { label: 'C', text: `No, because neither part is correct: Hillcrest leads in walk-to-work rate and Riverdale spends less than Hillcrest.` },
        { label: 'D', text: `Yes, because Midtown's 41% walk-to-work rate is the highest of the five, and Hillcrest's $185 monthly transport spending is lower than Riverdale's $310.` },
      ],
      correctAnswer: 'D',
      explanation: `Check each part separately. Walk-to-work rates: Midtown 41%, Hillcrest 34%, Eastpark 27%, Riverdale 12%, Sunset 8%. Midtown's 41% is the highest — first part supported. Monthly transport spending: Hillcrest $185, Riverdale $310. $185 is less than $310 — second part supported. Both parts of the claim are confirmed by the data.`,
      wrongAnswerExplanations: {
        A: `Hillcrest's walk-to-work rate is 34%, which is less than Midtown's 41%. Midtown does lead, so this choice misreads the table.`,
        B: `Hillcrest's $185 is lower than Riverdale's $310, not higher. This choice confuses the direction of the comparison.`,
        C: `Both errors in this choice are wrong: Midtown does have the highest walk-to-work rate, and Hillcrest does spend less than Riverdale.`,
      },
      teachingPoint: `For two-part claims, check each part independently against the correct rows and columns. A claim can be fully supported, partially supported, or fully unsupported — verify each part before deciding.`,
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
