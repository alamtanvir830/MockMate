import type { AcademySkill } from '../types'

export const inferences: AcademySkill = {
  slug: 'inferences',
  title: 'Inferences',
  section: 'reading',
  overview: {
    whatItTests:
      'Drawing the smallest, most defensible conclusion that the passage directly implies.',
    howItAppears:
      'Questions ask "Which inference is best supported by the passage?" or "Based on the passage, what can be inferred about X?"',
    whyStudentsMissIt:
      'Students make inferences that are too large, rely on outside knowledge, or pick answers that merely sound reasonable but are not supported by the text.',
    whatToLookFor:
      'The answer that must be true given what the passage says, not what might be true or what merely seems likely.',
  },
  strategy: {
    steps: [
      'Treat each choice as a claim and ask whether the passage gives enough evidence to prove it.',
      'Eliminate any answer that goes further than the passage supports.',
      'Eliminate any answer that requires outside knowledge.',
      'Choose the most conservative inference that the passage directly supports.',
    ],
    timeSavingTip:
      'Prefer the "smallest" answer. The correct inference is usually the one that stays closest to the text and adds the least.',
    whenNotToOverthink:
      'If one choice simply combines two facts the passage clearly states, and the others reach beyond the text, pick the modest one.',
  },
  commonTraps: [
    {
      title: 'The unsupported-but-plausible trap',
      description:
        'A choice sounds reasonable and could be true, but the passage never provides evidence for it.',
      avoidance:
        'Ask for the specific line that proves it. "Could be true" is not "must be true."',
    },
    {
      title: 'The too-dramatic trap',
      description:
        'A choice offers the most interesting or extreme conclusion, going well beyond the passage.',
      avoidance:
        'The correct inference is usually modest. Distrust answers that feel exciting or sweeping.',
    },
    {
      title: 'The contradiction trap',
      description:
        'A choice conflicts with something the passage actually states.',
      avoidance:
        'Reread the passage to be sure the inference agrees with every stated fact.',
    },
    {
      title: 'The possible-not-supported trap',
      description:
        'A choice describes something that is possible given the passage but not something the passage forces to be true.',
      avoidance:
        'Distinguish "possible" from "supported." Only pick what the passage requires.',
    },
  ],
  guidedExamples: [
    {
      id: 'inf-ex-1',
      stimulus:
        'The town\'s only bookstore closes at 6 p.m. on weekdays. Maria, who works until 6:30 every weekday, has never been able to visit it after work. On weekends, however, the store stays open until 9 p.m., and Maria often stops by on Saturdays.',
      question: 'Which inference is best supported by the passage?',
      steps: [
        {
          instruction: 'Gather the stated facts',
          content:
            'The store closes at 6 p.m. on weekdays; Maria works until 6:30 on weekdays; on weekends it stays open later, and she visits on Saturdays.',
        },
        {
          instruction: 'Test each choice against the facts',
          content:
            'Look for a conclusion that must follow, such as Maria being unable to reach the store after work on weekdays.',
        },
        {
          instruction: 'Eliminate overreaches',
          content:
            'We cannot conclude she dislikes reading or that the store is failing; nothing supports those ideas.',
        },
        {
          instruction: 'Confirm the smallest supported inference',
          content:
            'Since she finishes work after the weekday closing time, she cannot visit on weekday evenings, which is why she goes on Saturdays.',
        },
      ],
      choices: [
        {
          label: 'A',
          text: 'Maria cannot visit the bookstore after work on weekdays.',
        },
        {
          label: 'B',
          text: 'Maria prefers reading on weekends rather than weekdays.',
        },
        {
          label: 'C',
          text: 'The bookstore is likely to close permanently soon.',
        },
        {
          label: 'D',
          text: 'Maria is the store\'s most frequent customer.',
        },
      ],
      correctAnswer: 'A',
      explanation:
        'The store closes at 6 p.m. on weekdays and Maria works until 6:30, so she cannot reach it after work on weekdays. This is the modest conclusion the facts force.',
      wrongAnswerExplanations: {
        B: 'The passage explains a scheduling conflict, not a preference for weekend reading; we cannot infer what she prefers.',
        C: 'Nothing in the passage suggests the store is struggling or closing permanently.',
        D: 'The passage says Maria often visits on Saturdays but never compares her to other customers.',
      },
    },
    {
      id: 'inf-ex-2',
      stimulus:
        'Every plant in the greenhouse is watered by the same automatic system on the same schedule. The ferns near the north wall have begun to wilt, while the ferns in the center remain healthy. A gardener noticed that a cold draft flows along the north wall whenever the outer door opens.',
      question: 'Which inference is best supported by the passage?',
      steps: [
        {
          instruction: 'Gather the stated facts',
          content:
            'All plants get the same water on the same schedule. North-wall ferns wilt; center ferns are healthy. A cold draft hits the north wall.',
        },
        {
          instruction: 'Rule out water as the cause',
          content:
            'Since watering is identical everywhere, water differences cannot explain why only the north ferns wilt.',
        },
        {
          instruction: 'Find the supported factor',
          content:
            'The one difference between the two groups is the cold draft along the north wall, which points to something other than water.',
        },
        {
          instruction: 'Choose the modest inference',
          content:
            'The wilting of the north ferns is probably not caused by watering, since watering is the same for all plants.',
        },
      ],
      choices: [
        {
          label: 'A',
          text: 'The wilting of the north-wall ferns is not caused by a difference in watering.',
        },
        {
          label: 'B',
          text: 'The automatic watering system is broken.',
        },
        {
          label: 'C',
          text: 'Ferns cannot survive in any greenhouse.',
        },
        {
          label: 'D',
          text: 'The center ferns receive more water than the north ferns.',
        },
      ],
      correctAnswer: 'A',
      explanation:
        'Because all plants receive identical watering, a watering difference cannot explain why only the north ferns wilt. The passage supports ruling out watering as the cause.',
      wrongAnswerExplanations: {
        B: 'Nothing indicates the system is broken; it waters all plants the same, and most plants are healthy.',
        C: 'The center ferns are healthy, so it is false that ferns cannot survive in a greenhouse.',
        D: 'The passage states all plants receive the same water, so the center ferns do not get more.',
      },
    },
    {
      id: 'inf-ex-3',
      stimulus:
        'The museum guide explained that the artist signed and dated every finished painting on the back of the canvas. One painting attributed to the artist has no signature or date anywhere on it, and its style differs slightly from her known works. The museum has quietly moved it to a storage room.',
      question: 'Which inference is best supported by the passage?',
      steps: [
        {
          instruction: 'Gather the stated facts',
          content:
            'The artist signed and dated every finished painting. This painting has no signature or date and differs slightly in style. The museum moved it to storage.',
        },
        {
          instruction: 'Combine the facts',
          content:
            'If she signed every finished painting and this one is unsigned, there is reason to doubt it is a genuine finished work by her.',
        },
        {
          instruction: 'Eliminate overreaches',
          content:
            'We cannot conclude for certain it is a forgery or name who made it; the passage only raises doubt.',
        },
        {
          instruction: 'Choose the modest inference',
          content:
            'The museum has reason to question whether the painting is genuinely the artist\'s finished work.',
        },
      ],
      choices: [
        {
          label: 'A',
          text: 'The museum has reason to doubt that the painting is a genuine finished work by the artist.',
        },
        {
          label: 'B',
          text: 'The painting was definitely created by a famous forger.',
        },
        {
          label: 'C',
          text: 'The artist never made unsigned paintings of any kind.',
        },
        {
          label: 'D',
          text: 'The museum plans to destroy the painting.',
        },
      ],
      correctAnswer: 'A',
      explanation:
        'Since the artist signed every finished painting and this one is unsigned and stylistically different, the museum has grounds to doubt it is genuinely her finished work. Moving it to storage fits that doubt.',
      wrongAnswerExplanations: {
        B: 'The passage raises doubt but gives no evidence naming a forger or proving forgery.',
        C: 'The passage says she signed every finished painting; it does not rule out unfinished or other works, so this is too absolute.',
        D: 'Moving a painting to storage is not the same as planning to destroy it.',
      },
    },
  ],
  drillQuestions: [
    {
      id: 'inf-d-001',
      skillSlug: 'inferences',
      difficulty: 'easy',
      stimulus:
        'The recipe requires an oven, but Sam\'s kitchen has only a stovetop and no oven. Sam wants to make the dish tonight.',
      question: 'Which inference is best supported by the passage?',
      choices: [
        {
          label: 'A',
          text: 'Sam cannot make the dish as written without access to an oven.',
        },
        { label: 'B', text: 'Sam is a poor cook.' },
        { label: 'C', text: 'The dish tastes bad.' },
        { label: 'D', text: 'Sam will buy an oven tonight.' },
      ],
      correctAnswer: 'A',
      explanation:
        'The recipe needs an oven and Sam has none, so Sam cannot make the dish as written without one.',
      wrongAnswerExplanations: {
        B: 'Nothing indicates Sam\'s skill level.',
        C: 'The passage says nothing about taste.',
        D: 'There is no evidence Sam plans to buy an oven.',
      },
      teachingPoint:
        'The correct inference simply combines the stated facts without adding new assumptions.',
    },
    {
      id: 'inf-d-002',
      skillSlug: 'inferences',
      difficulty: 'easy',
      stimulus:
        'All members of the hiking club meet on Sundays. Priya cannot attend any Sunday meeting because she works every Sunday.',
      question: 'Which inference is best supported by the passage?',
      choices: [
        {
          label: 'A',
          text: 'Priya misses the hiking club\'s regular meetings.',
        },
        { label: 'B', text: 'Priya dislikes hiking.' },
        { label: 'C', text: 'The hiking club will change its meeting day.' },
        { label: 'D', text: 'Priya works a difficult job.' },
      ],
      correctAnswer: 'A',
      explanation:
        'The club meets on Sundays and Priya works every Sunday, so she misses the regular meetings.',
      wrongAnswerExplanations: {
        B: 'The passage gives a scheduling conflict, not her feelings about hiking.',
        C: 'Nothing suggests the club will change its day.',
        D: 'The passage does not describe her job as difficult.',
      },
      teachingPoint:
        'Stick to what the facts require; do not guess at feelings or future events.',
    },
    {
      id: 'inf-d-003',
      skillSlug: 'inferences',
      difficulty: 'easy',
      stimulus:
        'The last bus leaves the station at 10 p.m. The concert does not end until 10:30 p.m., and Leo has no other way home.',
      question: 'Which inference is best supported by the passage?',
      choices: [
        {
          label: 'A',
          text: 'Leo cannot catch the last bus if he stays until the concert ends.',
        },
        { label: 'B', text: 'Leo will leave the concert early.' },
        { label: 'C', text: 'The concert is sold out.' },
        { label: 'D', text: 'Leo dislikes the band.' },
      ],
      correctAnswer: 'A',
      explanation:
        'The bus leaves at 10 and the concert ends at 10:30, so staying to the end means missing the bus.',
      wrongAnswerExplanations: {
        B: 'The passage does not say Leo will leave early; it only sets up the conflict.',
        C: 'Nothing indicates the concert is sold out.',
        D: 'The passage says nothing about Leo\'s taste in music.',
      },
      teachingPoint:
        'Choose the inference forced by the times given, not a guess about what Leo will do.',
    },
    {
      id: 'inf-d-004',
      skillSlug: 'inferences',
      difficulty: 'medium',
      stimulus:
        'The bakery sells out of its cinnamon rolls before 9 a.m. almost every day. Customers who arrive at opening time, 7 a.m., can usually buy them, but those who come during the lunch hour rarely find any left.',
      question: 'Which inference is best supported by the passage?',
      choices: [
        {
          label: 'A',
          text: 'A customer\'s chance of buying a cinnamon roll is better early in the morning than at lunch.',
        },
        {
          label: 'B',
          text: 'The bakery should bake more cinnamon rolls.',
        },
        {
          label: 'C',
          text: 'Cinnamon rolls are the bakery\'s only product.',
        },
        {
          label: 'D',
          text: 'Lunch customers dislike cinnamon rolls.',
        },
      ],
      correctAnswer: 'A',
      explanation:
        'Rolls are usually available at 7 a.m. but rarely by lunch, so buying them is more likely early in the morning.',
      wrongAnswerExplanations: {
        B: 'Whether the bakery should bake more is an opinion the passage does not support.',
        C: 'The passage never says cinnamon rolls are the only product.',
        D: 'Lunch customers rarely find rolls left because they sell out, not because they dislike them.',
      },
      teachingPoint:
        'Turn the stated pattern into a modest conclusion about likelihood, not a recommendation.',
    },
    {
      id: 'inf-d-005',
      skillSlug: 'inferences',
      difficulty: 'medium',
      stimulus:
        'The new phone model was released only in a few large cities at first. Reviewers in those cities praised it, but people in smaller towns had to wait several months before they could buy it in stores.',
      question: 'Which inference is best supported by the passage?',
      choices: [
        {
          label: 'A',
          text: 'People in smaller towns had less immediate access to the new phone than people in large cities.',
        },
        {
          label: 'B',
          text: 'The phone was poorly made.',
        },
        {
          label: 'C',
          text: 'Reviewers in smaller towns disliked the phone.',
        },
        {
          label: 'D',
          text: 'The phone was cheaper in large cities.',
        },
      ],
      correctAnswer: 'A',
      explanation:
        'The phone launched in a few large cities while smaller towns waited months, so smaller-town buyers had less immediate access.',
      wrongAnswerExplanations: {
        B: 'Reviewers praised it, so there is no support for it being poorly made.',
        C: 'The passage does not mention reviewers in smaller towns.',
        D: 'Price differences by location are never discussed.',
      },
      teachingPoint:
        'Infer only the access difference the passage states; do not add claims about price or quality.',
    },
    {
      id: 'inf-d-006',
      skillSlug: 'inferences',
      difficulty: 'medium',
      stimulus:
        'Every student who passed the final exam had attended at least 90 percent of the class sessions. Devon attended only 70 percent of the sessions this term.',
      question: 'Which inference is best supported by the passage?',
      choices: [
        {
          label: 'A',
          text: 'Devon did not pass the final exam.',
        },
        {
          label: 'B',
          text: 'Devon studied less than other students.',
        },
        {
          label: 'C',
          text: 'The exam was unfair.',
        },
        {
          label: 'D',
          text: 'Devon will retake the class.',
        },
      ],
      correctAnswer: 'A',
      explanation:
        'Everyone who passed attended at least 90 percent of sessions. Devon attended only 70 percent, so he could not be among those who passed.',
      wrongAnswerExplanations: {
        B: 'Attendance is not the same as study time; the passage says nothing about how much Devon studied.',
        C: 'The passage gives no information about the exam\'s fairness.',
        D: 'Whether Devon will retake the class is not stated or implied.',
      },
      teachingPoint:
        'When "every X had Y" and someone lacks Y, you can infer that person is not an X, here, not among those who passed.',
    },
    {
      id: 'inf-d-007',
      skillSlug: 'inferences',
      difficulty: 'medium',
      stimulus:
        'The museum offers free admission on the first Monday of each month. On those days, attendance is roughly triple the usual figure, and the galleries become crowded. On all other days, tickets cost twelve dollars.',
      question: 'Which inference is best supported by the passage?',
      choices: [
        {
          label: 'A',
          text: 'The free admission days draw noticeably larger crowds than regular days.',
        },
        {
          label: 'B',
          text: 'The museum loses money on free days.',
        },
        {
          label: 'C',
          text: 'Visitors prefer the museum\'s art on Mondays.',
        },
        {
          label: 'D',
          text: 'The twelve-dollar ticket is too expensive.',
        },
      ],
      correctAnswer: 'A',
      explanation:
        'Attendance is about triple on free Mondays, and the galleries become crowded, so free days draw noticeably larger crowds.',
      wrongAnswerExplanations: {
        B: 'The passage gives no financial figures, so we cannot infer the museum loses money.',
        C: 'Higher attendance reflects the free admission, not a preference for the art on Mondays.',
        D: 'Whether the ticket is too expensive is an opinion the passage does not support.',
      },
      teachingPoint:
        'Convert the "triple attendance" fact into a modest statement about crowd size, not a claim about finances or opinions.',
    },
    {
      id: 'inf-d-008',
      skillSlug: 'inferences',
      difficulty: 'hard',
      stimulus:
        'The historian notes that the diary\'s author describes seeing the comet "just after the harvest festival." Records from the region place that festival in late September. Astronomers have calculated that the only comet visible from that location in that century appeared in early October of the year 1106.',
      question: 'Which inference is best supported by the passage?',
      choices: [
        {
          label: 'A',
          text: 'The diary entry describing the comet was most likely written in or after early October 1106.',
        },
        {
          label: 'B',
          text: 'The diary\'s author was a professional astronomer.',
        },
        {
          label: 'C',
          text: 'Comets appeared over the region every autumn.',
        },
        {
          label: 'D',
          text: 'The harvest festival was the most important event of the year.',
        },
      ],
      correctAnswer: 'A',
      explanation:
        'The author saw the comet just after the late-September festival, and the only matching comet appeared in early October 1106, so the entry was most likely written in or after that date.',
      wrongAnswerExplanations: {
        B: 'Observing a comet does not make the author an astronomer; the passage gives no such information.',
        C: 'The passage says only one comet was visible that century, contradicting an annual appearance.',
        D: 'The festival is used only to date the sighting; its importance is never established.',
      },
      teachingPoint:
        'Chain the dated facts together (festival in September, comet in October 1106) to reach the modest timing inference.',
    },
    {
      id: 'inf-d-009',
      skillSlug: 'inferences',
      difficulty: 'hard',
      stimulus:
        'A company found that employees who used its optional flexible-hours program reported higher job satisfaction than those who did not. However, the program was available only to employees who had worked at the company for at least five years. Newer employees were not eligible.',
      question: 'Which inference is best supported by the passage?',
      choices: [
        {
          label: 'A',
          text: 'The employees in the flexible-hours program had all worked at the company for at least five years.',
        },
        {
          label: 'B',
          text: 'Flexible hours are the main cause of higher job satisfaction.',
        },
        {
          label: 'C',
          text: 'Newer employees were dissatisfied with their jobs.',
        },
        {
          label: 'D',
          text: 'The company plans to expand the program to all employees.',
        },
      ],
      correctAnswer: 'A',
      explanation:
        'The program was available only to employees with at least five years at the company, so everyone in it met that requirement.',
      wrongAnswerExplanations: {
        B: 'Because only long-tenured employees could join, their satisfaction might come from experience or seniority, not flexible hours; the passage does not establish cause.',
        C: 'The passage does not report newer employees\' satisfaction levels.',
        D: 'There is no information about plans to expand the program.',
      },
      teachingPoint:
        'The safe inference restates the eligibility rule; resist the causal answer, since a hidden factor (tenure) could explain the satisfaction.',
    },
    {
      id: 'inf-d-010',
      skillSlug: 'inferences',
      difficulty: 'hard',
      stimulus:
        'The novelist wrote all her books in longhand and mailed the only handwritten copy to her publisher. One of her novels was lost in a fire at the publisher\'s office before it was ever printed or copied. Scholars today can read summaries of that novel written by an editor who saw the manuscript, but the full text has never been recovered.',
      question: 'Which inference is best supported by the passage?',
      choices: [
        {
          label: 'A',
          text: 'The complete text of the lost novel is no longer available to read.',
        },
        {
          label: 'B',
          text: 'The novelist\'s other books were also destroyed.',
        },
        {
          label: 'C',
          text: 'The lost novel was her best work.',
        },
        {
          label: 'D',
          text: 'The editor rewrote the novel from memory.',
        },
      ],
      correctAnswer: 'A',
      explanation:
        'The only handwritten copy burned before being printed or copied, and the full text has never been recovered, so the complete novel can no longer be read.',
      wrongAnswerExplanations: {
        B: 'Only one novel was lost in the fire; nothing suggests her other books were destroyed.',
        C: 'The passage never evaluates the quality of the lost novel.',
        D: 'The editor wrote summaries, which is not the same as rewriting the full novel from memory.',
      },
      teachingPoint:
        'Combine the facts (only copy, burned, never recovered) into the smallest certain conclusion: the full text is unavailable.',
    },
  ],
}
