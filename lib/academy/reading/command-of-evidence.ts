import type { AcademySkill } from '../types'

export const commandOfEvidence: AcademySkill = {
  slug: 'command-of-evidence',
  title: 'Command of Evidence',
  section: 'reading',
  overview: {
    whatItTests:
      'Finding the specific part of a passage that directly supports a given claim.',
    howItAppears:
      'A question asks which quotation from the text best supports a stated conclusion, or which piece of evidence would most strengthen a claim.',
    whyStudentsMissIt:
      'Students choose evidence that is related to the topic but does not directly support the specific claim, confusing "relevant" with "sufficient."',
    whatToLookFor:
      'The evidence that directly and completely supports the exact claim, not just any statement about the same subject.',
  },
  strategy: {
    steps: [
      'Identify the exact claim being tested and state it in your own words.',
      'For each evidence choice, ask whether that sentence, by itself, proves the claim.',
      'Eliminate evidence that only partly supports the claim, requires an extra assumption, or merely mentions the topic.',
      'Choose the evidence that most directly and completely addresses the claim.',
    ],
    timeSavingTip:
      'Restate the claim before reading the choices, then test each choice against that exact wording rather than the general topic.',
    whenNotToOverthink:
      'If one choice restates the claim almost directly and the others only touch the topic, pick the direct one without hunting for hidden flaws.',
  },
  commonTraps: [
    {
      title: 'The right-topic-wrong-claim trap',
      description:
        'A choice mentions the correct subject but does not actually prove the specific claim in question.',
      avoidance:
        'Being about the same topic is not enough. The evidence must support the exact point being made.',
    },
    {
      title: 'The interesting-not-relevant trap',
      description:
        'A choice is the most striking or memorable sentence but does not connect to the claim.',
      avoidance:
        'Ignore how interesting a sentence is. Judge only whether it supports the claim.',
    },
    {
      title: 'The logical-leap trap',
      description:
        'A choice supports the claim only if you add an assumption the passage does not state.',
      avoidance:
        'Good evidence should support the claim on its own, without you supplying missing steps.',
    },
    {
      title: 'The contradicting-evidence trap',
      description:
        'A choice actually weakens or contradicts the claim it is supposed to support.',
      avoidance:
        'Check the direction. Evidence that undercuts the claim is always wrong for a "supports" question.',
    },
  ],
  guidedExamples: [
    {
      id: 'coe-ex-1',
      stimulus:
        'A student council wanted to know whether a later school start time would help students. They surveyed classmates and reviewed attendance records. They found that after a nearby district pushed its start time from 7:30 to 8:15, the number of students arriving late fell by nearly half. Grades in first-period classes also rose slightly. Some parents complained about the new bus schedule, and a few after-school sports had to shift practice times. Overall, the council concluded that a later start improved punctuality.',
      question:
        'Which quotation best supports the council\'s conclusion that a later start improved punctuality?',
      steps: [
        {
          instruction: 'State the claim',
          content:
            'The claim is specifically about punctuality: that a later start reduced lateness.',
        },
        {
          instruction: 'Test each choice against the claim',
          content:
            'Look for the sentence that directly shows fewer students arriving late, not one about grades, buses, or sports.',
        },
        {
          instruction: 'Eliminate off-claim choices',
          content:
            'The grades sentence supports a different benefit. The bus and sports sentences are complaints, not evidence of punctuality.',
        },
        {
          instruction: 'Confirm the correct choice',
          content:
            'The sentence about lateness "falling by nearly half" directly proves improved punctuality.',
        },
      ],
      choices: [
        {
          label: 'A',
          text: '"the number of students arriving late fell by nearly half"',
        },
        { label: 'B', text: '"Grades in first-period classes also rose slightly."' },
        {
          label: 'C',
          text: '"Some parents complained about the new bus schedule"',
        },
        {
          label: 'D',
          text: '"a few after-school sports had to shift practice times"',
        },
      ],
      correctAnswer: 'A',
      explanation:
        'The claim is about punctuality. The sentence stating that lateness "fell by nearly half" directly measures punctuality and supports the conclusion.',
      wrongAnswerExplanations: {
        B: 'Rising grades support a benefit for learning, not the specific claim about punctuality.',
        C: 'A complaint about buses is a drawback, not evidence that punctuality improved.',
        D: 'Shifting sports practices is another drawback and says nothing about lateness.',
      },
    },
    {
      id: 'coe-ex-2',
      stimulus:
        'A biologist claimed that a certain frog species relies on sound, not sight, to find mates. In her study, she noted that the frogs call loudly through the night. She observed that males with louder calls attracted more females, even on moonless nights when visibility was near zero. She also recorded that the frogs are brightly colored and that they live near fast-moving streams. The bright color, she admitted, seemed to play no role in mating.',
      question:
        'Which finding best supports the claim that the frogs rely on sound rather than sight to find mates?',
      steps: [
        {
          instruction: 'State the claim',
          content:
            'The claim is that sound, not sight, drives mate-finding.',
        },
        {
          instruction: 'Test each choice',
          content:
            'The strongest evidence would show mating success tied to sound even when sight is impossible.',
        },
        {
          instruction: 'Eliminate weaker choices',
          content:
            'Bright color and stream location do not show sound matters. The biologist even says color plays no role.',
        },
        {
          instruction: 'Confirm the correct choice',
          content:
            'Louder males attracting more females "on moonless nights when visibility was near zero" proves sound works without sight.',
        },
      ],
      choices: [
        {
          label: 'A',
          text: 'Males with louder calls attracted more females even on moonless nights.',
        },
        { label: 'B', text: 'The frogs are brightly colored.' },
        { label: 'C', text: 'The frogs live near fast-moving streams.' },
        {
          label: 'D',
          text: 'The frogs call loudly through the night.',
        },
      ],
      correctAnswer: 'A',
      explanation:
        'The claim is that sound matters more than sight. Louder males succeeding "on moonless nights when visibility was near zero" shows mating depends on sound even without sight, directly supporting the claim.',
      wrongAnswerExplanations: {
        B: 'Bright color relates to sight, and the biologist says it plays no role, so it does not support the claim.',
        C: 'Living near streams is background information and does not address sound versus sight.',
        D: 'That the frogs call loudly shows they make sound, but not that sound, rather than sight, determines mating success.',
      },
    },
    {
      id: 'coe-ex-3',
      stimulus:
        'A city argued that its new recycling program was working because residents were throwing away less trash. In its report, the city noted that the amount of general garbage sent to the landfill dropped by twenty percent in the program\'s first year. The report also mentioned that the city hired ten new sanitation workers, that recycling bins were painted blue, and that a local newspaper praised the mayor. Officials said the landfill figures were the clearest sign of success.',
      question:
        'Which quotation best supports the city\'s claim that the recycling program reduced the amount of trash thrown away?',
      steps: [
        {
          instruction: 'State the claim',
          content:
            'The claim is that less trash is being thrown away because of the program.',
        },
        {
          instruction: 'Test each choice',
          content:
            'The best evidence would directly measure how much garbage went to the landfill.',
        },
        {
          instruction: 'Eliminate off-claim choices',
          content:
            'Hiring workers, painting bins, and newspaper praise do not measure trash amounts.',
        },
        {
          instruction: 'Confirm the correct choice',
          content:
            'The twenty percent drop in garbage sent to the landfill directly proves less trash is being thrown away.',
        },
      ],
      choices: [
        {
          label: 'A',
          text: '"the amount of general garbage sent to the landfill dropped by twenty percent"',
        },
        { label: 'B', text: '"the city hired ten new sanitation workers"' },
        { label: 'C', text: '"recycling bins were painted blue"' },
        { label: 'D', text: '"a local newspaper praised the mayor"' },
      ],
      correctAnswer: 'A',
      explanation:
        'The claim is about less trash being thrown away. The twenty percent drop in landfill garbage directly measures that reduction and supports the claim.',
      wrongAnswerExplanations: {
        B: 'Hiring workers is about staffing, not the amount of trash discarded.',
        C: 'The color of bins is a cosmetic detail that does not measure trash reduction.',
        D: 'Newspaper praise is an opinion about the mayor, not evidence of reduced trash.',
      },
    },
  ],
  drillQuestions: [
    {
      id: 'coe-d-001',
      skillSlug: 'command-of-evidence',
      difficulty: 'easy',
      stimulus:
        'A gardener claimed that adding compost helped her tomatoes grow larger. She kept two identical beds, adding compost to one and nothing extra to the other. The composted bed produced tomatoes that were noticeably bigger. Both beds received the same amount of water and sunlight.',
      question:
        'Which detail best supports the claim that compost helped the tomatoes grow larger?',
      choices: [
        {
          label: 'A',
          text: 'The composted bed produced tomatoes that were noticeably bigger.',
        },
        { label: 'B', text: 'She kept two identical beds.' },
        { label: 'C', text: 'Both beds received the same amount of water.' },
        { label: 'D', text: 'The gardener grew tomatoes.' },
      ],
      correctAnswer: 'A',
      explanation:
        'The claim is that compost led to larger tomatoes. The bigger tomatoes in the composted bed directly show that result.',
      wrongAnswerExplanations: {
        B: 'Having two beds sets up the experiment but does not by itself show compost worked.',
        C: 'Equal water controls the experiment but does not measure the size difference the claim is about.',
        D: 'That she grew tomatoes is background, not evidence about compost.',
      },
      teachingPoint:
        'The best evidence directly shows the outcome the claim describes, here, larger tomatoes.',
    },
    {
      id: 'coe-d-002',
      skillSlug: 'command-of-evidence',
      difficulty: 'easy',
      stimulus:
        'A coach believed that a short warm-up reduced player injuries. Over one season, players who did the warm-up missed far fewer games due to injury than those who skipped it. The team also bought new uniforms and traveled to more away games that year.',
      question:
        'Which detail best supports the claim that the warm-up reduced injuries?',
      choices: [
        {
          label: 'A',
          text: 'Players who did the warm-up missed far fewer games due to injury.',
        },
        { label: 'B', text: 'The team bought new uniforms.' },
        { label: 'C', text: 'The team traveled to more away games.' },
        { label: 'D', text: 'The season lasted several months.' },
      ],
      correctAnswer: 'A',
      explanation:
        'The claim is about fewer injuries. The detail that warm-up players missed fewer games due to injury directly supports it.',
      wrongAnswerExplanations: {
        B: 'New uniforms have nothing to do with injuries.',
        C: 'More travel does not measure injury rates.',
        D: 'The season length is background information, not evidence.',
      },
      teachingPoint:
        'Match the evidence to the exact outcome in the claim and ignore unrelated details.',
    },
    {
      id: 'coe-d-003',
      skillSlug: 'command-of-evidence',
      difficulty: 'easy',
      stimulus:
        'A librarian argued that a reading challenge encouraged students to read more books. She reported that during the challenge, the average number of books each student checked out rose from three to seven. She also noted that the library added new shelves and hosted an author visit.',
      question:
        'Which detail best supports the claim that the challenge encouraged students to read more?',
      choices: [
        {
          label: 'A',
          text: 'The average number of books each student checked out rose from three to seven.',
        },
        { label: 'B', text: 'The library added new shelves.' },
        { label: 'C', text: 'The library hosted an author visit.' },
        { label: 'D', text: 'The librarian organized the challenge.' },
      ],
      correctAnswer: 'A',
      explanation:
        'The rise in books checked out per student directly measures the increase in reading the claim describes.',
      wrongAnswerExplanations: {
        B: 'Adding shelves is about storage, not how much students read.',
        C: 'An author visit is an event, not a measure of reading amount.',
        D: 'That she organized it does not show whether it worked.',
      },
      teachingPoint:
        'Numbers that directly measure the claimed change make the strongest evidence.',
    },
    {
      id: 'coe-d-004',
      skillSlug: 'command-of-evidence',
      difficulty: 'medium',
      stimulus:
        'A researcher argued that a new streetlight design made drivers slow down at a dangerous intersection. After the lights were installed, the average speed of cars passing through fell from 40 to 31 miles per hour. The number of nearby parking spaces stayed the same, and a bakery opened on the corner that year.',
      question:
        'Which finding best supports the claim that the new streetlights made drivers slow down?',
      choices: [
        {
          label: 'A',
          text: 'The average speed of cars fell from 40 to 31 miles per hour.',
        },
        { label: 'B', text: 'A bakery opened on the corner.' },
        { label: 'C', text: 'The number of parking spaces stayed the same.' },
        { label: 'D', text: 'The intersection was considered dangerous.' },
      ],
      correctAnswer: 'A',
      explanation:
        'The claim is about drivers slowing down. The drop in average speed directly measures that change.',
      wrongAnswerExplanations: {
        B: 'A bakery opening is unrelated to driving speed.',
        C: 'Parking spaces staying the same tells us nothing about speed.',
        D: 'Calling the intersection dangerous is background, not evidence that speed dropped.',
      },
      teachingPoint:
        'Distinguish evidence that measures the outcome from details that merely share the setting.',
    },
    {
      id: 'coe-d-005',
      skillSlug: 'command-of-evidence',
      difficulty: 'medium',
      stimulus:
        'A teacher claimed that letting students choose their own essay topics improved the quality of their writing, not just their enthusiasm. When she compared essays, those written on self-chosen topics received higher scores from an outside grader who did not know which topics were assigned. Students also reported enjoying the assignment more, and the class period ran five minutes long.',
      question:
        'Which finding best supports the specific claim that free topic choice improved writing quality?',
      choices: [
        {
          label: 'A',
          text: 'Essays on self-chosen topics received higher scores from an outside grader.',
        },
        { label: 'B', text: 'Students reported enjoying the assignment more.' },
        { label: 'C', text: 'The class period ran five minutes long.' },
        { label: 'D', text: 'The teacher compared two sets of essays.' },
      ],
      correctAnswer: 'A',
      explanation:
        'The claim is about quality, not just enjoyment. Higher scores from an impartial grader directly measure improved writing quality.',
      wrongAnswerExplanations: {
        B: 'Enjoyment supports enthusiasm, which the claim explicitly sets aside; it does not prove quality improved.',
        C: 'The class running long is irrelevant to writing quality.',
        D: 'Comparing essays sets up the study but does not by itself show quality improved.',
      },
      teachingPoint:
        'When a claim distinguishes quality from enthusiasm, choose evidence about quality and reject evidence about enjoyment.',
    },
    {
      id: 'coe-d-006',
      skillSlug: 'command-of-evidence',
      difficulty: 'medium',
      stimulus:
        'An economist claimed that a town\'s new farmers market helped local farmers earn more, not just attract shoppers. Surveys showed that participating farmers reported a thirty percent rise in their monthly income after joining. The market also drew large crowds on weekends, and a new parking lot was built nearby.',
      question:
        'Which finding best supports the specific claim that the market helped farmers earn more?',
      choices: [
        {
          label: 'A',
          text: 'Participating farmers reported a thirty percent rise in monthly income.',
        },
        { label: 'B', text: 'The market drew large crowds on weekends.' },
        { label: 'C', text: 'A new parking lot was built nearby.' },
        { label: 'D', text: 'The town started a farmers market.' },
      ],
      correctAnswer: 'A',
      explanation:
        'The claim is about farmers earning more. The reported rise in farmers\' income directly supports that specific point.',
      wrongAnswerExplanations: {
        B: 'Large crowds show attendance, not that farmers earned more.',
        C: 'A parking lot is infrastructure, unrelated to farmer income.',
        D: 'Starting the market is background, not evidence about earnings.',
      },
      teachingPoint:
        'Crowds and popularity are not the same as income; match evidence to the exact claim.',
    },
    {
      id: 'coe-d-007',
      skillSlug: 'command-of-evidence',
      difficulty: 'medium',
      stimulus:
        'A scientist argued that a certain bird migrates using Earth\'s magnetic field rather than landmarks. In an experiment, birds kept in a room with an artificially reversed magnetic field consistently flew in the wrong direction, even though familiar landmarks were visible through the windows. The birds were also fed a special diet and weighed each morning.',
      question:
        'Which finding best supports the claim that the birds navigate by the magnetic field rather than landmarks?',
      choices: [
        {
          label: 'A',
          text: 'Birds in a reversed magnetic field flew the wrong way despite visible familiar landmarks.',
        },
        { label: 'B', text: 'The birds were fed a special diet.' },
        { label: 'C', text: 'The birds were weighed each morning.' },
        { label: 'D', text: 'The birds were kept in a room.' },
      ],
      correctAnswer: 'A',
      explanation:
        'The claim contrasts magnetic navigation with landmarks. Birds flying the wrong way when the field is reversed, even with landmarks visible, shows the field, not landmarks, guides them.',
      wrongAnswerExplanations: {
        B: 'Diet is irrelevant to how the birds navigate.',
        C: 'Daily weighing does not test navigation.',
        D: 'Being kept in a room is part of the setup, not evidence about magnetic navigation.',
      },
      teachingPoint:
        'For a claim that pits one cause against another, the best evidence isolates the two, here, changing the field while keeping landmarks visible.',
    },
    {
      id: 'coe-d-008',
      skillSlug: 'command-of-evidence',
      difficulty: 'hard',
      stimulus:
        'A historian argued that a medieval city\'s wealth came mainly from trade, not from its famous silver mine, which many assume was the source. She noted that the city\'s records show the mine\'s output had already dwindled to almost nothing decades before the city reached its peak prosperity. Meanwhile, customs documents from those peak years list thousands of taxed shipments passing through the city\'s harbor. The city was also known for its grand cathedral and its annual festival.',
      question:
        'Which finding best supports the claim that the city\'s wealth came from trade rather than the silver mine?',
      choices: [
        {
          label: 'A',
          text: 'The mine\'s output had dwindled to almost nothing decades before the city\'s peak prosperity.',
        },
        {
          label: 'B',
          text: 'The city was known for its grand cathedral.',
        },
        {
          label: 'C',
          text: 'The city held an annual festival.',
        },
        {
          label: 'D',
          text: 'The silver mine was famous throughout the region.',
        },
      ],
      correctAnswer: 'A',
      explanation:
        'The claim is that trade, not the mine, drove the wealth. Evidence that the mine had nearly stopped producing before the city grew rich rules out the mine as the source, directly supporting the claim. (The customs documents also help, but among these choices, the mine\'s early decline is the one offered.)',
      wrongAnswerExplanations: {
        B: 'A grand cathedral shows the city was rich but does not identify trade as the source.',
        C: 'A festival is a cultural detail unrelated to the source of wealth.',
        D: 'The mine\'s fame is exactly what the historian argues against; its fame is not evidence that it caused the wealth.',
      },
      teachingPoint:
        'To support "X, not Y," strong evidence rules Y out. Here, showing the mine had failed removes it as the cause.',
    },
    {
      id: 'coe-d-009',
      skillSlug: 'command-of-evidence',
      difficulty: 'hard',
      stimulus:
        'A psychologist proposed that people remember stories better than lists because stories connect facts through cause and effect. In her study, two groups memorized the same ten facts: one group received them as an unordered list, the other woven into a short story. A week later, the story group recalled far more facts. Both groups spent the same amount of time studying, and both were given the test in the same quiet room.',
      question:
        'Which finding best supports the claim that story form, rather than study conditions, improved memory?',
      choices: [
        {
          label: 'A',
          text: 'A week later, the story group recalled far more facts than the list group.',
        },
        {
          label: 'B',
          text: 'Both groups were tested in the same quiet room.',
        },
        {
          label: 'C',
          text: 'Both groups memorized ten facts.',
        },
        {
          label: 'D',
          text: 'The study took place over the course of a week.',
        },
      ],
      correctAnswer: 'A',
      explanation:
        'With study time, facts, and testing conditions held equal, the story group recalling more directly shows the story form itself improved memory.',
      wrongAnswerExplanations: {
        B: 'Equal testing conditions control the experiment but do not by themselves show the story helped; they only rule out one alternative.',
        C: 'Both groups having the same facts is part of the setup, not evidence of the outcome.',
        D: 'The one-week span is a detail about timing, not evidence that story form worked.',
      },
      teachingPoint:
        'When conditions are held equal, the outcome difference itself is the evidence; controls rule out alternatives but do not prove the claim on their own.',
    },
    {
      id: 'coe-d-010',
      skillSlug: 'command-of-evidence',
      difficulty: 'hard',
      stimulus:
        'A critic argued that a playwright\'s early comedies already contained the serious themes of her later tragedies, so the shift in her career was less sudden than it appears. To support this, one would want evidence that the early comedies deal with weighty subjects beneath their humor. The plays are known for their fast pacing, their large casts, and their witty wordplay. One early comedy, beneath its jokes, follows a family slowly torn apart by debt and quietly ends with a father left alone.',
      question:
        'Which detail best supports the claim that the early comedies already contained serious themes?',
      choices: [
        {
          label: 'A',
          text: 'One early comedy, beneath its jokes, follows a family torn apart by debt and ends with a father left alone.',
        },
        { label: 'B', text: 'The plays are known for their fast pacing.' },
        { label: 'C', text: 'The plays feature large casts.' },
        { label: 'D', text: 'The plays are full of witty wordplay.' },
      ],
      correctAnswer: 'A',
      explanation:
        'The claim is that serious themes lay beneath the comedy. A comedy that, beneath its jokes, portrays a family destroyed by debt and ends on a lonely note directly shows those serious themes.',
      wrongAnswerExplanations: {
        B: 'Fast pacing is a stylistic feature of comedy, not evidence of serious themes.',
        C: 'Large casts describe scale, not thematic depth.',
        D: 'Witty wordplay is a comedic trait and, if anything, points to lightness rather than seriousness.',
      },
      teachingPoint:
        'For a claim about hidden depth, choose the detail that shows the serious content, not the surface style.',
    },
  ],
}
