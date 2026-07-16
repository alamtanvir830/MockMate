import type { AcademySkill } from '../types'

export const textStructurePurpose: AcademySkill = {
  slug: 'text-structure-purpose',
  title: 'Text Structure and Purpose',
  section: 'reading',
  overview: {
    whatItTests:
      'Understanding why an author includes a specific sentence, example, or paragraph, and how the passage is organized.',
    howItAppears:
      'Questions ask "The primary purpose of the passage is to..." or "The author mentions X mainly in order to..."',
    whyStudentsMissIt:
      'Students describe what a sentence says rather than why the author included it, confusing content with function.',
    whatToLookFor:
      'The logical role of a sentence within the passage: does it provide evidence, introduce a contrast, give an example, qualify a claim, or draw a conclusion?',
  },
  strategy: {
    steps: [
      'Identify the exact sentence or section the question asks about.',
      'Ask what comes immediately before it and what comes immediately after it.',
      'Determine its function: evidence, example, contrast, qualification, or conclusion.',
      'Match your answer to the choice that describes the function, not just the content.',
    ],
    timeSavingTip:
      'Rephrase the sentence\'s job as a verb ("to prove," "to illustrate," "to object"). The right choice usually starts with that verb.',
    whenNotToOverthink:
      'If a transition word like "for example" or "however" clearly signals the sentence\'s role, trust that signal instead of second-guessing.',
  },
  commonTraps: [
    {
      title: 'The content-not-function trap',
      description:
        'A choice accurately restates what the sentence says but does not explain why the author included it.',
      avoidance:
        'Purpose questions ask why, not what. Prefer a choice that names a role, such as "to support" or "to contrast."',
    },
    {
      title: 'The illustrate-versus-argue trap',
      description:
        'A choice says the author is arguing or proving when the sentence only gives an example, or vice versa.',
      avoidance:
        'Match the intensity of the verb to the sentence. An example illustrates; it does not by itself prove.',
    },
    {
      title: 'The too-broad-purpose trap',
      description:
        'A choice describes the purpose so generally ("to describe the topic") that it could apply to any sentence.',
      avoidance:
        'Choose the most specific purpose that fits. A vague purpose is usually a wrong answer.',
    },
    {
      title: 'The ignored-transition trap',
      description:
        'A choice overlooks a transition word ("however," "for instance," "therefore") that reveals the sentence\'s role.',
      avoidance:
        'Circle transitions before answering. They almost always name the sentence\'s function.',
    },
  ],
  guidedExamples: [
    {
      id: 'tsp-ex-1',
      stimulus:
        'Many people believe that goldfish have a memory span of only a few seconds. Researchers, however, have trained goldfish to push levers for food and to navigate simple mazes, tasks the fish still performed correctly months later. These findings suggest that the popular belief badly underestimates the animal\'s memory.',
      question:
        'What is the primary purpose of the second sentence ("Researchers, however...")?',
      steps: [
        {
          instruction: 'Identify the sentence',
          content:
            'The second sentence describes experiments in which goldfish remembered tasks months later.',
        },
        {
          instruction: 'Look before and after',
          content:
            'Before it, the passage states a popular belief that goldfish have very short memories. After it, the passage says this belief is an underestimate.',
        },
        {
          instruction: 'Determine the function',
          content:
            'The word "however" signals a contrast, and the sentence provides evidence that contradicts the popular belief.',
        },
        {
          instruction: 'Match to a choice',
          content:
            'The correct choice describes providing evidence that challenges the common belief, not merely describing goldfish behavior.',
        },
      ],
      choices: [
        {
          label: 'A',
          text: 'to describe how researchers feed goldfish in a laboratory',
        },
        {
          label: 'B',
          text: 'to provide evidence that contradicts the popular belief stated earlier',
        },
        {
          label: 'C',
          text: 'to argue that goldfish are smarter than all other fish',
        },
        {
          label: 'D',
          text: 'to explain why goldfish are difficult to train',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'The word "however" and the experiments both work against the popular belief in the first sentence. The sentence functions as contradicting evidence, which the final sentence confirms.',
      wrongAnswerExplanations: {
        A: 'This restates surface content (feeding), missing the sentence\'s role of contradicting the earlier belief.',
        C: 'The passage never compares goldfish to all other fish; it only challenges a belief about their memory.',
        D: 'This contradicts the sentence, which shows goldfish were successfully trained.',
      },
    },
    {
      id: 'tsp-ex-2',
      stimulus:
        'The author argues that public parks improve city life in measurable ways. She points to a downtown neighborhood that added a small green space and soon saw more foot traffic, higher spending at nearby shops, and lower reported stress among residents. Such concrete outcomes, she notes, are hard to dismiss.',
      question:
        'The author mentions the downtown neighborhood mainly in order to',
      steps: [
        {
          instruction: 'Identify the section',
          content:
            'The middle sentence describes a specific neighborhood that added green space and saw several benefits.',
        },
        {
          instruction: 'Look before and after',
          content:
            'Before it, the author claims parks improve city life "in measurable ways." After it, she calls these "concrete outcomes."',
        },
        {
          instruction: 'Determine the function',
          content:
            'The neighborhood is a specific example that supports the general claim about parks.',
        },
        {
          instruction: 'Match to a choice',
          content:
            'The correct choice describes offering a concrete example to support the author\'s claim.',
        },
      ],
      choices: [
        {
          label: 'A',
          text: 'provide a specific example that supports her claim about parks',
        },
        {
          label: 'B',
          text: 'suggest that the neighborhood was poorly designed before',
        },
        {
          label: 'C',
          text: 'contrast city parks with rural green spaces',
        },
        {
          label: 'D',
          text: 'question whether parks are worth their cost',
        },
      ],
      correctAnswer: 'A',
      explanation:
        'The neighborhood illustrates the general claim that parks improve city life, and the author frames its results as "concrete outcomes" supporting her argument.',
      wrongAnswerExplanations: {
        B: 'The passage does not describe the neighborhood as poorly designed; it highlights the benefits the park brought.',
        C: 'No rural comparison appears; the example is entirely urban.',
        D: 'This is the opposite of the author\'s purpose, which is to defend the value of parks, not question it.',
      },
    },
    {
      id: 'tsp-ex-3',
      stimulus:
        'Solar panels have become dramatically cheaper over the past decade, and installations have surged worldwide. It would be a mistake, though, to assume the transition is finished. In many regions, outdated power grids still cannot store or distribute solar energy efficiently, which limits how much can actually be used.',
      question:
        'What is the primary purpose of the third sentence ("In many regions...")?',
      steps: [
        {
          instruction: 'Identify the sentence',
          content:
            'The third sentence explains that outdated grids limit how much solar energy can actually be used.',
        },
        {
          instruction: 'Look before and after',
          content:
            'The first sentence celebrates cheaper, more widespread solar panels. The second warns against assuming the transition is finished.',
        },
        {
          instruction: 'Determine the function',
          content:
            'The third sentence gives the reason behind the warning: it qualifies the optimistic opening by pointing to a remaining obstacle.',
        },
        {
          instruction: 'Match to a choice',
          content:
            'The correct choice describes identifying a limitation that qualifies the earlier optimism.',
        },
      ],
      choices: [
        {
          label: 'A',
          text: 'celebrate how affordable solar panels have become',
        },
        {
          label: 'B',
          text: 'identify a limitation that qualifies the passage\'s earlier optimism',
        },
        {
          label: 'C',
          text: 'explain how solar panels are manufactured',
        },
        {
          label: 'D',
          text: 'argue that solar energy will never be practical',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'After the warning in sentence two, sentence three names the obstacle, outdated grids, that limits solar use. It qualifies the opening optimism rather than restating it.',
      wrongAnswerExplanations: {
        A: 'The celebration occurs in the first sentence; the third sentence introduces a problem instead.',
        C: 'How panels are made is never discussed.',
        D: 'This is too extreme; the passage notes a current limitation, not that solar energy will never work.',
      },
    },
  ],
  drillQuestions: [
    {
      id: 'tsp-d-001',
      skillSlug: 'text-structure-purpose',
      difficulty: 'easy',
      stimulus:
        'Bamboo is one of the fastest-growing plants on Earth. Some species can grow nearly a meter in a single day. This rapid growth makes bamboo a popular choice for builders who want a renewable material.',
      question:
        'The primary purpose of the second sentence ("Some species...") is to',
      choices: [
        { label: 'A', text: 'give a specific fact that supports the first sentence' },
        { label: 'B', text: 'disagree with the first sentence' },
        { label: 'C', text: 'describe how builders use bamboo' },
        { label: 'D', text: 'introduce a new topic' },
      ],
      correctAnswer: 'A',
      explanation:
        'The first sentence claims bamboo grows fast; the second gives a specific figure (a meter a day) that backs up that claim.',
      wrongAnswerExplanations: {
        B: 'The second sentence agrees with and supports the first, not disagrees.',
        C: 'Builders are discussed in the third sentence, not the second.',
        D: 'The second sentence continues the topic of fast growth rather than introducing a new one.',
      },
      teachingPoint:
        'A sentence that supplies a specific number or fact usually functions to support the general claim before it.',
    },
    {
      id: 'tsp-d-002',
      skillSlug: 'text-structure-purpose',
      difficulty: 'easy',
      stimulus:
        'The new museum wing was designed to be welcoming. For example, wide ramps replaced the old front stairs, and every label was printed in large, high-contrast type.',
      question:
        'The second sentence ("For example...") mainly serves to',
      choices: [
        { label: 'A', text: 'question the design of the museum' },
        { label: 'B', text: 'give examples that illustrate the first sentence' },
        { label: 'C', text: 'describe the museum\'s art collection' },
        { label: 'D', text: 'compare the wing to other museums' },
      ],
      correctAnswer: 'B',
      explanation:
        'The phrase "For example" signals that the sentence illustrates the claim that the wing was designed to be welcoming.',
      wrongAnswerExplanations: {
        A: 'The sentence supports the design rather than questioning it.',
        C: 'The art collection is never mentioned.',
        D: 'No other museums are compared.',
      },
      teachingPoint:
        'The transition "for example" almost always signals a sentence that illustrates the previous claim.',
    },
    {
      id: 'tsp-d-003',
      skillSlug: 'text-structure-purpose',
      difficulty: 'easy',
      stimulus:
        'Most people think lightning never strikes the same place twice. In fact, tall structures like the Empire State Building are struck dozens of times each year.',
      question:
        'The second sentence ("In fact...") mainly serves to',
      choices: [
        { label: 'A', text: 'correct a common misconception' },
        { label: 'B', text: 'agree with the first sentence' },
        { label: 'C', text: 'describe how lightning forms' },
        { label: 'D', text: 'warn readers to stay indoors' },
      ],
      correctAnswer: 'A',
      explanation:
        'The first sentence states a common belief, and the second uses "In fact" to correct it with a counterexample.',
      wrongAnswerExplanations: {
        B: 'The second sentence contradicts, not agrees with, the belief in the first.',
        C: 'How lightning forms is not explained.',
        D: 'No safety advice is given.',
      },
      teachingPoint:
        '"In fact" following a stated belief usually signals a correction of that belief.',
    },
    {
      id: 'tsp-d-004',
      skillSlug: 'text-structure-purpose',
      difficulty: 'medium',
      stimulus:
        'The author praises the city\'s new bike lanes for reducing traffic. Still, she acknowledges that the lanes have drawbacks: during snowstorms, plows have nowhere to push the snow, and some deliveries now take longer. These problems, she concludes, are manageable but real.',
      question:
        'The primary purpose of the second sentence ("Still, she acknowledges...") is to',
      choices: [
        {
          label: 'A',
          text: 'abandon the argument that bike lanes reduce traffic',
        },
        {
          label: 'B',
          text: 'acknowledge drawbacks that qualify the earlier praise',
        },
        { label: 'C', text: 'explain how snowplows operate' },
        { label: 'D', text: 'prove that bike lanes should be removed' },
      ],
      correctAnswer: 'B',
      explanation:
        'The word "Still" signals a concession. The sentence admits drawbacks that qualify the praise in the first sentence without abandoning it.',
      wrongAnswerExplanations: {
        A: 'The author does not abandon her praise; she calls the problems "manageable."',
        C: 'Snowplow operation is a detail, not the purpose of the sentence.',
        D: 'The passage never argues for removing the lanes; it defends them overall.',
      },
      teachingPoint:
        'Words like "still," "yet," and "however" often introduce a concession that qualifies an earlier claim.',
    },
    {
      id: 'tsp-d-005',
      skillSlug: 'text-structure-purpose',
      difficulty: 'medium',
      stimulus:
        'The scientist opens her talk with a puzzle: why do some desert plants flower only once every few decades? She spends the rest of the lecture proposing that these rare blooms are timed to rare rains, ensuring seeds land in moist soil.',
      question:
        'The primary purpose of the first sentence is to',
      choices: [
        {
          label: 'A',
          text: 'raise a question that the rest of the talk sets out to answer',
        },
        { label: 'B', text: 'summarize the scientist\'s final conclusion' },
        { label: 'C', text: 'criticize other researchers\' methods' },
        { label: 'D', text: 'describe how deserts form' },
      ],
      correctAnswer: 'A',
      explanation:
        'The first sentence poses a puzzle, and the rest of the talk proposes an answer, so its purpose is to raise the question that organizes the talk.',
      wrongAnswerExplanations: {
        B: 'The conclusion comes later; the first sentence poses the question, not the answer.',
        C: 'No other researchers are criticized.',
        D: 'How deserts form is not the subject; the flowering schedule is.',
      },
      teachingPoint:
        'An opening question often functions to set up the problem the rest of the passage will solve.',
    },
    {
      id: 'tsp-d-006',
      skillSlug: 'text-structure-purpose',
      difficulty: 'medium',
      stimulus:
        'The report first describes the flood damage in vivid detail. It then lists the repairs already completed. Finally, it turns to the future, outlining steps the town should take to prevent similar flooding.',
      question:
        'Which choice best describes the overall structure of the passage?',
      choices: [
        {
          label: 'A',
          text: 'It moves from a problem, to actions taken, to recommendations for the future.',
        },
        {
          label: 'B',
          text: 'It compares two different towns affected by flooding.',
        },
        {
          label: 'C',
          text: 'It argues that the flood damage was exaggerated.',
        },
        {
          label: 'D',
          text: 'It lists causes of flooding in order of importance.',
        },
      ],
      correctAnswer: 'A',
      explanation:
        'The passage moves in three stages: describing the damage (problem), listing completed repairs (actions), and outlining future prevention (recommendations).',
      wrongAnswerExplanations: {
        B: 'Only one town is discussed; there is no comparison.',
        C: 'The passage describes the damage vividly, not as exaggerated.',
        D: 'The passage does not rank causes of flooding.',
      },
      teachingPoint:
        'For structure questions, track how the passage moves from one stage to the next, such as problem to solution.',
    },
    {
      id: 'tsp-d-007',
      skillSlug: 'text-structure-purpose',
      difficulty: 'medium',
      stimulus:
        'Advocates say the new app will help people read more. The author is not so sure. She points out that the app rewards users for finishing books quickly, which may push them toward short, easy titles rather than encouraging genuine reading.',
      question:
        'The author mentions that the app rewards users for finishing books quickly mainly in order to',
      choices: [
        {
          label: 'A',
          text: 'support a concern that the app may not encourage genuine reading',
        },
        { label: 'B', text: 'praise the app\'s design' },
        { label: 'C', text: 'explain how the app was programmed' },
        { label: 'D', text: 'describe which books are most popular' },
      ],
      correctAnswer: 'A',
      explanation:
        'The author is skeptical, and she cites the reward system as evidence that the app may push users toward easy titles rather than real reading.',
      wrongAnswerExplanations: {
        B: 'The detail is used to raise a concern, not to praise the app.',
        C: 'How the app was programmed is not discussed.',
        D: 'Book popularity is not the point; the concern is about reading habits.',
      },
      teachingPoint:
        'When an author is "not so sure," a detail that follows usually supports the author\'s doubt.',
    },
    {
      id: 'tsp-d-008',
      skillSlug: 'text-structure-purpose',
      difficulty: 'hard',
      stimulus:
        'The historian begins by granting her opponents their strongest point: the treaty did, at first, reduce border conflicts. Only after this concession does she build her case, showing that within five years the same disputes returned in harsher forms. The early calm, she argues, masked a problem the treaty never solved.',
      question:
        'The primary purpose of the first sentence ("The historian begins by granting...") is to',
      choices: [
        {
          label: 'A',
          text: 'concede a strong opposing point before arguing against it',
        },
        {
          label: 'B',
          text: 'state the historian\'s final conclusion',
        },
        {
          label: 'C',
          text: 'provide statistical evidence about border conflicts',
        },
        {
          label: 'D',
          text: 'agree fully with her opponents\' view of the treaty',
        },
      ],
      correctAnswer: 'A',
      explanation:
        'The historian admits the treaty at first reduced conflicts, an opposing point, before showing the conflicts returned. The sentence concedes ground to strengthen her later argument.',
      wrongAnswerExplanations: {
        B: 'Her conclusion comes later; the first sentence is a concession, not the conclusion.',
        C: 'No statistics are provided; the sentence grants a general point.',
        D: 'She does not agree fully; she concedes one point only to argue against the larger claim.',
      },
      teachingPoint:
        'A concession at the start of an argument sets up a "yes, but" structure; its purpose is to grant a point before rebutting it.',
    },
    {
      id: 'tsp-d-009',
      skillSlug: 'text-structure-purpose',
      difficulty: 'hard',
      stimulus:
        'The novel\'s narrator describes the town\'s cheerful festival in loving detail, lingering on the music and bright banners. Only in the final paragraph does the reader learn that the narrator was recalling this scene from a prison cell, years later. Suddenly the warmth of the earlier description reads as longing rather than simple joy.',
      question:
        'The primary purpose of the final paragraph\'s revelation is to',
      choices: [
        {
          label: 'A',
          text: 'reveal that the festival never actually took place',
        },
        {
          label: 'B',
          text: 'change how the reader interprets the earlier description',
        },
        {
          label: 'C',
          text: 'introduce a new character into the story',
        },
        {
          label: 'D',
          text: 'criticize the town for holding a festival',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'Learning that the narrator is in prison recasts the earlier warmth as "longing rather than simple joy," so the revelation reshapes the reader\'s interpretation of what came before.',
      wrongAnswerExplanations: {
        A: 'The passage does not say the festival was imaginary; the narrator is recalling a real scene.',
        C: 'No new character is introduced; the focus stays on the narrator.',
        D: 'The passage does not criticize the town; it shifts the emotional meaning of the memory.',
      },
      teachingPoint:
        'A late revelation often functions to reframe earlier material, changing its meaning in hindsight.',
    },
    {
      id: 'tsp-d-010',
      skillSlug: 'text-structure-purpose',
      difficulty: 'hard',
      stimulus:
        'The essay could have simply asserted that ancient roads were well engineered. Instead, the author devotes a paragraph to a single Roman road still bearing traffic after two thousand years, tracing its layered foundation stone by stone. By dwelling on this one surviving example, she turns an abstract claim into something the reader can almost stand upon.',
      question:
        'The author\'s decision to focus on a single surviving road mainly serves to',
      choices: [
        {
          label: 'A',
          text: 'make an abstract claim vivid and concrete for the reader',
        },
        {
          label: 'B',
          text: 'prove that all ancient roads have survived intact',
        },
        {
          label: 'C',
          text: 'argue that modern roads are poorly built',
        },
        {
          label: 'D',
          text: 'list the materials sold in Roman markets',
        },
      ],
      correctAnswer: 'A',
      explanation:
        'The passage contrasts a bare assertion with a detailed example and says the author "turns an abstract claim into something the reader can almost stand upon," so the example makes the claim vivid.',
      wrongAnswerExplanations: {
        B: 'One surviving road does not prove all roads survived; the passage never makes that claim.',
        C: 'Modern roads are not discussed or criticized.',
        D: 'Roman markets are unrelated to the passage about road engineering.',
      },
      teachingPoint:
        'When an author chooses a vivid single example over a general statement, the purpose is usually to make an abstract idea concrete.',
    },
  ],
}
