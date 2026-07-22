import type { AcademySkill } from '../types'

export const textStructurePurpose: AcademySkill = {
  slug: 'text-structure-purpose',
  title: 'Text Structure and Purpose',
  section: 'reading',
  objective:
    'By the end of this lesson, you will be able to identify how an author structures a passage or positions a sentence or paragraph to advance a specific rhetorical purpose.',
  estimatedMinutes: 22,
  subskills: [
    'Sentence Function',
    'Paragraph Function',
    'Overall Text Structure',
    'Author Purpose',
    'Rhetorical Moves',
    'Contrast and Qualification',
    'Tone and Stance',
  ],
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
      level: 'sat-application',
      hints: [
        'Identify the transition word that begins the sentence and decide what function it signals.',
        'Ask: does the second sentence agree with, disagree with, or ignore the first sentence?',
        'Look at the third sentence — it uses the word "underestimates," which tells you the direction the second sentence points.',
      ],
      coachTakeaway:
        'The word "however" almost always signals a sentence that contradicts or qualifies what came before it. On test day, when you see "however," predict that the sentence\'s function is to challenge, contradict, or complicate the previous claim.',
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
      level: 'sat-application',
      hints: [
        'Look at the sentence immediately before the neighborhood is mentioned. What does the author claim there?',
        'Ask: is the neighborhood used to make a general point, or is it the main point itself?',
        'Notice the word "points to" in the first sentence — this signals that what follows is evidence for a claim.',
      ],
      coachTakeaway:
        'When an author makes a general claim and then introduces a specific place or event, the specific thing is almost always an example that supports the general claim. The function is "to illustrate" or "to provide a specific example."',
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
      level: 'advanced',
      hints: [
        'Look at the sentence immediately before the third sentence. What does it warn the reader not to assume?',
        'The third sentence begins with "In many regions." Is this a positive development or a problem?',
        'Ask what the third sentence adds to the second sentence\'s warning. Does it celebrate, explain, or contradict?',
      ],
      coachTakeaway:
        'When a passage moves from a positive claim (sentence 1) to a warning (sentence 2) to a specific obstacle (sentence 3), the third sentence\'s function is to support the warning by naming the specific reason for it. Its role is to qualify or limit the earlier optimism.',
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
      level: 'foundation',
      difficulty: 'easy',
      errorCategory: 'sentence-function',
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
      level: 'foundation',
      difficulty: 'easy',
      errorCategory: 'sentence-function',
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
      level: 'foundation',
      difficulty: 'easy',
      errorCategory: 'sentence-function',
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
      level: 'sat-application',
      difficulty: 'medium',
      errorCategory: 'contrast-and-qualification',
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
      level: 'sat-application',
      difficulty: 'medium',
      errorCategory: 'author-purpose',
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
      level: 'sat-application',
      difficulty: 'medium',
      errorCategory: 'overall-text-structure',
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
      level: 'sat-application',
      difficulty: 'medium',
      errorCategory: 'rhetorical-moves',
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
      level: 'advanced',
      difficulty: 'hard',
      errorCategory: 'contrast-and-qualification',
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
      level: 'advanced',
      difficulty: 'hard',
      errorCategory: 'rhetorical-moves',
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
      level: 'advanced',
      difficulty: 'hard',
      errorCategory: 'rhetorical-moves',
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
    {
      id: 'tsp-d-011',
      skillSlug: 'text-structure-purpose',
      level: 'sat-application',
      difficulty: 'medium',
      errorCategory: 'sentence-function',
      stimulus:
        'The author claims that high-altitude training improves athletic performance even after athletes return to lower elevations. She cites the case of a distance runner who trained at 2,400 meters for eight weeks, then returned to sea level and set a personal record in her next three races. This result, the author suggests, is consistent with evidence from dozens of similar studies.',
      question:
        'The second sentence (about the distance runner) primarily serves to',
      choices: [
        {
          label: 'A',
          text: 'provide a specific example that illustrates the author\'s general claim',
        },
        {
          label: 'B',
          text: 'introduce a counterexample that undermines the first sentence',
        },
        {
          label: 'C',
          text: 'explain the physiological mechanism behind altitude training',
        },
        {
          label: 'D',
          text: 'argue that all athletes should train at 2,400 meters',
        },
      ],
      correctAnswer: 'A',
      explanation:
        'The first sentence makes a general claim; the second sentence provides one specific case that supports it. The third sentence then places that case in a broader pattern of evidence, confirming the second sentence\'s role as an illustrative example.',
      wrongAnswerExplanations: {
        B: 'The runner\'s success supports the claim rather than undermining it; there is no counterexample here.',
        C: 'The passage describes what happened to the runner, not why altitude training works physiologically.',
        D: '"All athletes should" is a prescriptive claim the passage never makes; it describes one case, not a universal recommendation.',
      },
      teachingPoint:
        'A specific case placed between a general claim and a reference to broader evidence is almost always an illustrative example, not a proof or a counterexample.',
    },
    {
      id: 'tsp-d-012',
      skillSlug: 'text-structure-purpose',
      level: 'advanced',
      difficulty: 'hard',
      errorCategory: 'paragraph-function',
      stimulus:
        'Proponents of the new zoning law argue that it will increase affordable housing by allowing higher-density construction in historically low-density neighborhoods. A second paragraph in the editorial then presents a different view: opponents contend that without price controls, developers will build market-rate units that do not address the existing shortage. The editorial concludes that both sides agree more housing is needed but disagree sharply about whether the proposed law will produce housing that is actually affordable.',
      question:
        'The second paragraph of the editorial mainly serves to',
      choices: [
        {
          label: 'A',
          text: 'introduce a competing perspective that complicates the argument in the first paragraph',
        },
        {
          label: 'B',
          text: 'provide statistical evidence supporting the zoning law',
        },
        {
          label: 'C',
          text: 'summarize the editorial\'s final conclusion',
        },
        {
          label: 'D',
          text: 'explain how price controls work in real estate markets',
        },
      ],
      correctAnswer: 'A',
      explanation:
        'The first paragraph presents the proponents\' view; the second paragraph presents opponents\' view. This second paragraph complicates the picture by showing the argument is contested, which the conclusion then characterizes as a shared goal with a disputed method.',
      wrongAnswerExplanations: {
        B: 'No statistics appear in the second paragraph; it presents the opponents\' argument in general terms.',
        C: 'The conclusion appears in the third paragraph, not the second.',
        D: 'Price controls are mentioned but not explained; the paragraph\'s purpose is to present a counterargument, not to teach about price controls.',
      },
      teachingPoint:
        'When a paragraph introduces a competing view after a first paragraph has presented a position, its function is to complicate or balance the argument, not to support it.',
    },
    {
      id: 'tsp-d-013',
      skillSlug: 'text-structure-purpose',
      level: 'sat-application',
      difficulty: 'medium',
      errorCategory: 'overall-text-structure',
      stimulus:
        'The article opens with a striking statistic: more than forty percent of all food produced globally is never consumed. It then traces three causes — overproduction at the farm, spoilage during transport, and consumer purchasing habits — before turning to a series of proposed solutions, including better refrigeration infrastructure and changes to expiration labeling.',
      question:
        'Which choice best describes the overall structure of the passage?',
      choices: [
        {
          label: 'A',
          text: 'It presents a problem, identifies its causes, and then proposes solutions.',
        },
        {
          label: 'B',
          text: 'It compares two competing approaches to reducing food waste.',
        },
        {
          label: 'C',
          text: 'It argues that consumers are solely responsible for food waste.',
        },
        {
          label: 'D',
          text: 'It disputes the statistic in its opening sentence.',
        },
      ],
      correctAnswer: 'A',
      explanation:
        'The passage opens with the statistic as a problem, explains three causes, and then offers solutions. This is a classic problem-cause-solution structure.',
      wrongAnswerExplanations: {
        B: 'No two competing approaches are compared; the passage presents causes and solutions without pitting them against each other.',
        C: 'Consumer habits are one of three causes named; the passage does not single out consumers as solely responsible.',
        D: 'The passage never questions the statistic; it uses it as evidence of the problem.',
      },
      teachingPoint:
        'For structure questions, identify the sequence of moves the passage makes — what comes first, second, and third — and match it to the choice that names that sequence.',
    },
    {
      id: 'tsp-d-014',
      skillSlug: 'text-structure-purpose',
      level: 'advanced',
      difficulty: 'hard',
      errorCategory: 'author-purpose',
      stimulus:
        'Some economists have argued that raising the minimum wage inevitably reduces employment, as employers respond by cutting hours or hiring fewer workers. The study\'s authors do not dispute that this can occur in some markets. What they add, however, is evidence from ten cities where minimum wage increases coincided with rising employment in the low-wage service sector. They argue that the relationship between minimum wage and employment is more context-dependent than the simple inverse often assumed.',
      question:
        'The study\'s authors mention the ten cities primarily in order to',
      choices: [
        {
          label: 'A',
          text: 'provide evidence that qualifies the claim that wage increases always reduce employment',
        },
        {
          label: 'B',
          text: 'prove that minimum wage increases never reduce employment',
        },
        {
          label: 'C',
          text: 'argue that economists who predict job losses are dishonest',
        },
        {
          label: 'D',
          text: 'explain how service industries hire workers',
        },
      ],
      correctAnswer: 'A',
      explanation:
        'The authors concede that wage increases can reduce employment in some cases, then cite ten cities where the opposite occurred. The cities provide evidence that the relationship is not always inverse — they qualify, rather than overturn, the economists\' claim.',
      wrongAnswerExplanations: {
        B: '"Never" overstates the authors\' position; they explicitly say reductions can occur in some markets.',
        C: 'The authors engage the economists\' evidence, not their honesty; the passage is a methodological argument, not an accusation.',
        D: 'The passage never explains hiring practices in service industries; it uses employment outcomes as evidence for a broader point about the minimum wage.',
      },
      teachingPoint:
        'When authors concede one point and then introduce evidence from specific cases, those cases serve to qualify the original claim, not to refute it entirely. The function verb is "to qualify," not "to disprove."',
    },
    {
      id: 'tsp-d-015',
      skillSlug: 'text-structure-purpose',
      level: 'challenge',
      difficulty: 'hard',
      errorCategory: 'tone-and-stance',
      stimulus:
        'The travel writer opens her account of the city with a catalog of the smells she encountered on the first morning: cinnamon from a bakery cart, exhaust from a passing bus, and the salt-and-seaweed sharpness of the harbor two streets away. Only then does she tell us where she is. The technique forces the reader to experience the city as the writer did — not as a labeled destination but as a sensory presence that exists before it can be named.',
      question:
        'The primary purpose of describing the writer\'s technique in this passage is to',
      choices: [
        {
          label: 'A',
          text: 'explain how the technique creates an immersive, sense-first experience of a place before naming it',
        },
        {
          label: 'B',
          text: 'criticize the writer for refusing to tell readers where she is',
        },
        {
          label: 'C',
          text: 'argue that smell is a more reliable sense than sight for travel writing',
        },
        {
          label: 'D',
          text: 'provide a general history of travel writing as a genre',
        },
      ],
      correctAnswer: 'A',
      explanation:
        'The passage describes the technique (catalog of smells before naming the city) and then explains its effect (the reader experiences the city as a sensory presence before it is labeled). The purpose is to analyze how the technique produces a specific kind of immersion.',
      wrongAnswerExplanations: {
        B: 'The passage admires the technique, not criticizes it; the word "forces" here means compels in a positive way, as the explanation confirms.',
        C: 'The passage never compares senses or argues that smell is more reliable than sight in travel writing.',
        D: 'The passage analyzes one writer\'s specific technique, not the history of the travel writing genre.',
      },
      teachingPoint:
        'When a passage describes a technique and then explains what it achieves, the purpose is to analyze that technique\'s rhetorical effect — the how and the why together.',
    },
  ],
  masteryQuestions: [
    {
      id: 'tsp-m-001',
      skillSlug: 'text-structure-purpose',
      level: 'foundation',
      difficulty: 'easy',
      errorCategory: 'sentence-function',
      stimulus:
        'The platypus is one of the few mammals that lay eggs. A female platypus typically lays one to three eggs per breeding season. This unusual reproductive trait has long fascinated biologists studying mammalian evolution.',
      question:
        'The second sentence ("A female platypus typically lays...") primarily serves to',
      choices: [
        { label: 'A', text: 'add a specific detail that supports the first sentence' },
        { label: 'B', text: 'contradict the claim that platypuses lay eggs' },
        { label: 'C', text: 'explain why biologists study evolution' },
        { label: 'D', text: 'compare platypuses to other egg-laying animals' },
      ],
      correctAnswer: 'A',
      explanation:
        'The first sentence states that platypuses lay eggs; the second adds a specific quantity (one to three per season), which supports and elaborates on the first sentence\'s claim.',
      wrongAnswerExplanations: {
        B: 'The second sentence confirms the first, not contradicts it.',
        C: 'Why biologists study evolution is not the topic of the second sentence.',
        D: 'No other animals are compared; the sentence focuses on platypuses alone.',
      },
      teachingPoint:
        'A sentence that adds a specific quantity or frequency to a general claim serves to support and elaborate on that claim.',
    },
    {
      id: 'tsp-m-002',
      skillSlug: 'text-structure-purpose',
      level: 'foundation',
      difficulty: 'easy',
      errorCategory: 'sentence-function',
      stimulus:
        'Monarch butterflies migrate thousands of miles each year. For instance, populations in eastern North America travel from Canada to central Mexico, a journey that can exceed 4,000 kilometers.',
      question:
        'The second sentence ("For instance...") mainly serves to',
      choices: [
        { label: 'A', text: 'illustrate the first sentence with a specific example' },
        { label: 'B', text: 'question whether monarch butterflies actually migrate' },
        { label: 'C', text: 'explain the biology of butterfly wing development' },
        { label: 'D', text: 'contrast eastern and western butterfly populations' },
      ],
      correctAnswer: 'A',
      explanation:
        'The phrase "For instance" signals an example. The eastern North America population\'s journey illustrates the general claim that monarchs migrate thousands of miles.',
      wrongAnswerExplanations: {
        B: 'The sentence supports, not questions, the migration claim.',
        C: 'Wing development is never discussed.',
        D: 'The sentence focuses on eastern populations without contrasting them with western ones.',
      },
      teachingPoint:
        '"For instance" almost always introduces an example that illustrates the sentence before it.',
    },
    {
      id: 'tsp-m-003',
      skillSlug: 'text-structure-purpose',
      level: 'sat-application',
      difficulty: 'medium',
      errorCategory: 'paragraph-function',
      stimulus:
        'The first part of the study confirms what earlier research suggested: patients who exercise regularly recover from surgery faster on average than those who do not. The second part, however, complicates this picture. Among patients over seventy, the relationship between exercise and recovery speed was weak and statistically insignificant, leading the authors to caution that age may be a moderating variable.',
      question:
        'The second part of the study (beginning with "however") primarily serves to',
      choices: [
        {
          label: 'A',
          text: 'qualify the first finding by identifying a group for which it does not clearly apply',
        },
        {
          label: 'B',
          text: 'confirm that all patients benefit equally from exercise before surgery',
        },
        {
          label: 'C',
          text: 'argue that the first part of the study was conducted incorrectly',
        },
        {
          label: 'D',
          text: 'explain what statistical significance means in medical research',
        },
      ],
      correctAnswer: 'A',
      explanation:
        'The first finding applies to patients generally; the second finding shows the relationship is weak among patients over seventy. This qualifies the original conclusion by identifying an exception, not overturning it.',
      wrongAnswerExplanations: {
        B: 'This contradicts the second part; it shows older patients do not benefit clearly, so all patients do not benefit equally.',
        C: 'The second part does not criticize the method of the first; it presents a new finding for a different subgroup.',
        D: 'Statistical significance is mentioned but not explained; the passage\'s purpose is to present the finding, not define the term.',
      },
      teachingPoint:
        'When a second finding applies to a subgroup and complicates a general finding, its function is to qualify — narrow the scope of — the first finding.',
    },
    {
      id: 'tsp-m-004',
      skillSlug: 'text-structure-purpose',
      level: 'sat-application',
      difficulty: 'medium',
      errorCategory: 'overall-text-structure',
      stimulus:
        'The essay begins with a portrait of a nineteenth-century textile mill worker who had no legal recourse when injured on the job. It then traces the gradual development of workplace safety laws over the following century, from early state statutes to federal regulations enacted in the 1970s. The essay closes by asking whether current safety standards are adequate for new kinds of hazards introduced by modern technology.',
      question:
        'Which choice best describes the overall structure of the passage?',
      choices: [
        {
          label: 'A',
          text: 'It moves from a historical example, to a narrative of reform, to a question about present adequacy.',
        },
        {
          label: 'B',
          text: 'It compares American and European approaches to workplace safety.',
        },
        {
          label: 'C',
          text: 'It argues that federal regulations enacted in the 1970s solved all workplace safety problems.',
        },
        {
          label: 'D',
          text: 'It presents two conflicting views of whether workplace injuries have declined.',
        },
      ],
      correctAnswer: 'A',
      explanation:
        'The passage moves from an opening historical portrait, through a century of legal development, to a closing question about current standards. Choice A correctly names all three stages.',
      wrongAnswerExplanations: {
        B: 'No European comparison appears; the passage focuses on the United States.',
        C: 'The 1970s regulations are part of the narrative, not the conclusion; the essay ends by questioning current adequacy, not declaring the problem solved.',
        D: 'No two conflicting views about injury rates appear; the structure is chronological and ends with a question, not a debate.',
      },
      teachingPoint:
        'Structure questions require tracking the sequence of the whole passage. Name each stage in order and match the choice that lists them correctly.',
    },
    {
      id: 'tsp-m-005',
      skillSlug: 'text-structure-purpose',
      level: 'advanced',
      difficulty: 'hard',
      errorCategory: 'author-purpose',
      stimulus:
        'The critic opens by acknowledging that the film is technically accomplished: its cinematography is precise, its editing is seamless, and its sound design is inventive. What it lacks, she argues, is moral imagination. Every character acts from pure self-interest, and the film treats this as natural and inevitable rather than as a choice worth examining. Great cinema, the critic suggests, does not simply reflect the world as it is; it asks the viewer to consider whether the world could be otherwise.',
      question:
        'The primary purpose of the final sentence of the passage is to',
      choices: [
        {
          label: 'A',
          text: 'state a broader standard that the critic uses to explain why the film falls short despite its technical merits',
        },
        {
          label: 'B',
          text: 'praise the film for encouraging viewers to think about the world differently',
        },
        {
          label: 'C',
          text: 'argue that technical accomplishment is more important than moral imagination in film',
        },
        {
          label: 'D',
          text: 'summarize the plot of the film being reviewed',
        },
      ],
      correctAnswer: 'A',
      explanation:
        'The critic has established that the film is technically accomplished but morally limited. The final sentence articulates a standard — great cinema makes viewers consider whether the world could be otherwise — that explains why technical achievement alone is insufficient and why this film falls short.',
      wrongAnswerExplanations: {
        B: 'The final sentence describes what great cinema should do, not what this film does; the film is criticized for not doing this.',
        C: 'The critic argues the opposite — that moral imagination is what the film lacks and what distinguishes great cinema.',
        D: 'The passage never summarizes the film\'s plot; it evaluates the film\'s moral stance.',
      },
      teachingPoint:
        'A final sentence that states a principle or standard usually functions to explain the criterion by which the author is judging whatever was discussed in the rest of the passage.',
    },
    {
      id: 'tsp-m-006',
      skillSlug: 'text-structure-purpose',
      level: 'advanced',
      difficulty: 'hard',
      errorCategory: 'rhetorical-moves',
      stimulus:
        'The environmental report could have listed pollution data in a table and left it there. Instead, the authors chose to open with three pages describing a single estuary: its once-thriving oyster beds, the year the harvest collapsed, the fishermen who left the region. Only after this narrative does the report present its data. The choice was deliberate, the authors write in their introduction: data alone rarely moves decision-makers to act.',
      question:
        'The opening narrative about the estuary primarily serves to',
      choices: [
        {
          label: 'A',
          text: 'make the environmental data emotionally resonant by grounding it in a specific human and ecological story',
        },
        {
          label: 'B',
          text: 'prove that oyster farming is the most economically important activity in the region',
        },
        {
          label: 'C',
          text: 'argue that the data in the report is unreliable without a narrative framework',
        },
        {
          label: 'D',
          text: 'compare the estuary\'s decline to similar events in other regions',
        },
      ],
      correctAnswer: 'A',
      explanation:
        'The authors explain their choice: data alone rarely moves decision-makers, so the narrative is a rhetorical strategy to make the data emotionally compelling. The estuary story grounds the abstract data in specific human and ecological consequence.',
      wrongAnswerExplanations: {
        B: 'The estuary narrative is not a proof of economic importance; it is an emotional and rhetorical framing device.',
        C: 'The authors do not claim the data is unreliable; they argue that accurate data alone is often insufficient to prompt action.',
        D: 'No other regions are compared; the narrative focuses solely on the single estuary.',
      },
      teachingPoint:
        'When an author explains why they chose a narrative over data, the narrative\'s purpose is the rhetorical effect the author names — in this case, making data emotionally compelling to move decision-makers.',
    },
    {
      id: 'tsp-m-007',
      skillSlug: 'text-structure-purpose',
      level: 'challenge',
      difficulty: 'hard',
      errorCategory: 'tone-and-stance',
      stimulus:
        'The biographer writes of her subject with evident admiration throughout the first two chapters. In the third chapter, however, her tone shifts almost imperceptibly. She continues to use respectful language, but her sentences grow longer and her qualifications multiply: she notes that the subject\'s celebrated generosity was "not untouched by a desire for recognition" and that his public modesty "coexisted with a sharp awareness of his own legacy." A careful reader will notice that the book has begun to revise its earlier portrait without openly withdrawing its praise.',
      question:
        'The primary purpose of the passage is to',
      choices: [
        {
          label: 'A',
          text: 'identify and analyze a subtle tonal shift in the biography that begins to complicate the earlier admiring portrait',
        },
        {
          label: 'B',
          text: 'argue that the biographer is being dishonest about her subject',
        },
        {
          label: 'C',
          text: 'summarize the achievements described in the biography\'s first two chapters',
        },
        {
          label: 'D',
          text: 'prove that all biographies eventually turn critical of their subjects',
        },
      ],
      correctAnswer: 'A',
      explanation:
        'The passage closely tracks a change in tone — longer sentences, multiplying qualifications, phrases like "not untouched by" — and names its effect: the book revises its portrait without withdrawing its praise. The purpose is to identify and analyze this rhetorical shift.',
      wrongAnswerExplanations: {
        B: '"Dishonest" implies deliberate deception; the passage describes a careful, subtle revision, not a dishonest one.',
        C: 'The first two chapters\' achievements are not summarized; the passage focuses on what changes in the third chapter.',
        D: '"All biographies" is a universal claim the passage never makes; it analyzes one specific biography.',
      },
      teachingPoint:
        'When a passage traces a subtle change in tone — noting specific word choices and sentence patterns — its purpose is to identify and analyze that rhetorical shift, not to evaluate the author\'s honesty or summarize content.',
    },
    {
      id: 'tsp-m-008',
      skillSlug: 'text-structure-purpose',
      level: 'challenge',
      difficulty: 'hard',
      errorCategory: 'contrast-and-qualification',
      stimulus:
        'Linguists once described language change as a form of decay — a corruption of an earlier, purer standard. This view is now largely discredited. Most contemporary linguists treat change as a neutral process, neither improvement nor deterioration, driven by social contact, generational turnover, and shifting patterns of use. Some go further, arguing that what looks like decay from one social position often represents innovation from another. The field has moved from prescriptivism to a position that, while not entirely without judgments, is far more descriptive in orientation.',
      question:
        'Which choice best describes the structure of the passage?',
      choices: [
        {
          label: 'A',
          text: 'It traces a shift in how linguists understand language change, from a view of decay to a broadly descriptive position, noting that some linguists take the revisionist view even further.',
        },
        {
          label: 'B',
          text: 'It argues that the older view of language decay is correct and that modern linguists have abandoned rigor.',
        },
        {
          label: 'C',
          text: 'It presents two equally valid views of language change without indicating which the field now favors.',
        },
        {
          label: 'D',
          text: 'It compares the approaches of individual linguists without describing any broader trend in the field.',
        },
      ],
      correctAnswer: 'A',
      explanation:
        'The passage moves from the old "decay" view to the now-dominant descriptive position, then notes that some linguists push further toward seeing change as innovation. The final sentence confirms the field\'s overall direction. Choice A accurately captures all three stages.',
      wrongAnswerExplanations: {
        B: 'The passage says the decay view is "largely discredited," not that it is correct or that modern linguists lack rigor.',
        C: 'The passage clearly indicates which view the field now favors — the descriptive position — so it does not present two equally valid views.',
        D: 'The passage describes a broad field-level trend and the overall direction of the discipline, not a comparison of individual linguists.',
      },
      teachingPoint:
        'For structure questions about passages that trace intellectual history, track three things: what the old view was, what replaced it, and whether any further development is noted. The correct choice names all three stages.',
    },
  ],
}
