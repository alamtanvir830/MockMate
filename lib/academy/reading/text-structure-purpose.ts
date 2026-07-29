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
    {
      title: `The first-sentence-as-conclusion trap`,
      description: `Students assume the first sentence states the author's main conclusion, when it often introduces a position the author will qualify, complicate, or eventually reject.`,
      avoidance: `Read through the passage before judging the first sentence's function. An opening sentence that gets contradicted or narrowed later is setting up a contrast, not announcing the final verdict.`,
    },
    {
      title: `The single-example-as-proof trap`,
      description: `A choice claims the author uses a specific example "to prove" a broad point, when the example merely illustrates one instance of it.`,
      avoidance: `One example illustrates; it doesn't prove. If the passage offers one case study, anecdote, or instance, the correct verb is almost always "to illustrate" or "to provide an example," not "to prove" or "to demonstrate conclusively."`,
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
    {
      id: 'tsp-ex-4',
      level: 'foundation',
      hints: [
        `Look at the signal phrase "For example" and decide what it always signals.`,
        `Ask: does the sentence about the city park say anything new, or does it restate and show the claim before it?`,
        `The function verb in the right answer should describe showing or illustrating, not arguing or questioning.`,
      ],
      coachTakeaway: `On the SAT, "for example" is one of the clearest structural signals you will see. It always signals that what follows is an illustration of the preceding claim — never a proof, never a contradiction. When you spot it, your work is almost done: the sentence's purpose is to illustrate.`,
      stimulus: `Urban green spaces have measurable benefits for nearby residents. For example, a study of one mid-sized city found that neighborhoods within half a kilometer of a public park reported lower stress levels and higher rates of outdoor social activity than those without park access.`,
      question: `The second sentence ("For example, a study...") primarily serves to`,
      steps: [
        {
          instruction: `Identify the signal`,
          content: `The second sentence opens with "For example," which explicitly announces its function.`,
        },
        {
          instruction: `State what the example shows`,
          content: `It describes one city where park proximity correlated with lower stress and more social activity.`,
        },
        {
          instruction: `Connect it to the claim`,
          content: `The first sentence claims green spaces have measurable benefits. The second provides a measured instance of those benefits.`,
        },
        {
          instruction: `Match to a choice`,
          content: `The correct answer will describe illustrating or supporting the first sentence's claim, not proving it universally or introducing a new topic.`,
        },
      ],
      choices: [
        { label: 'A', text: `argue that all cities need more parks` },
        { label: 'B', text: `question whether urban green spaces reduce stress` },
        { label: 'C', text: `provide a specific example that illustrates the claim in the first sentence` },
        { label: 'D', text: `introduce data that contradicts the opening statement` },
      ],
      correctAnswer: 'C',
      explanation: `The "for example" signal and the park study both work to illustrate the opening claim about measurable benefits. The sentence's function is to provide a concrete instance of what the first sentence asserts.`,
      wrongAnswerExplanations: {
        A: `The sentence describes one study, not a universal prescription for all cities.`,
        B: `The study supports the idea that green spaces reduce stress; it does not question it.`,
        D: `The study reinforces the opening claim rather than contradicting it.`,
      },
    },
    {
      id: 'tsp-ex-5',
      level: 'sat-application',
      hints: [
        `Ask what role the opening sentence plays relative to the rest of the passage.`,
        `Notice the phrase "this assumption" in the second sentence — what does it point back to?`,
        `If the first sentence sets up a belief that the passage will challenge, its function is to introduce a position to be complicated.`,
      ],
      coachTakeaway: `When a passage opens with a widely-held belief and then challenges it, the first sentence's function is not to state the author's view — it's to introduce the target of the author's critique. This "introduce-then-complicate" structure is common on the SAT, so always read past the first sentence before deciding its purpose.`,
      stimulus: `It is commonly assumed that longer study sessions produce better learning outcomes. This assumption, however, ignores decades of research on spaced practice: students who spread shorter study sessions across multiple days consistently outperform those who cram the same material into a single long session, even when total study time is equal.`,
      question: `The primary purpose of the first sentence is to`,
      steps: [
        {
          instruction: `Identify what the first sentence says`,
          content: `It states a common assumption: longer study sessions are better.`,
        },
        {
          instruction: `Read what follows`,
          content: `The second sentence begins with "This assumption, however," signaling that what comes next will challenge the first sentence's claim.`,
        },
        {
          instruction: `Determine the function`,
          content: `The first sentence introduces a belief that the rest of the passage will contradict. Its role is to set up the target of the author's argument.`,
        },
        {
          instruction: `Match to a choice`,
          content: `The correct answer describes introducing a common belief that the passage will go on to challenge.`,
        },
      ],
      choices: [
        { label: 'A', text: `summarize the final conclusion of the passage` },
        { label: 'B', text: `introduce a widely-held assumption that the passage will challenge` },
        { label: 'C', text: `describe how students should organize their schedules` },
        { label: 'D', text: `provide evidence that cramming is an effective study strategy` },
      ],
      correctAnswer: 'B',
      explanation: `The first sentence states a common assumption that the second sentence immediately challenges with "however." Its function is to introduce the belief the passage will critique, not to assert the author's own view.`,
      wrongAnswerExplanations: {
        A: `The passage's conclusion is that spaced practice outperforms cramming — the opposite of the first sentence's claim.`,
        C: `The sentence states an assumption about study sessions; it does not give scheduling advice.`,
        D: `The passage argues against cramming, so the first sentence's claim is the one the evidence contradicts, not supports.`,
      },
    },
    {
      id: 'tsp-ex-6',
      level: 'advanced',
      hints: [
        `Notice the phrase "by contrast" and ask what it always signals.`,
        `The first and second sentences describe two different groups. What is the relationship between them?`,
        `Ask whether the second sentence agrees with, contradicts, or simply adds to the first.`,
      ],
      coachTakeaway: `The phrase "by contrast" is a structural anchor: it tells you the second element is being compared to the first, and they differ. On the SAT, when you see "by contrast," predict that the sentence's function is to highlight a difference — and then look for the choice that names the comparison.`,
      stimulus: `The early factory workers of the nineteenth century typically labored twelve to sixteen hours a day, six days a week, with no paid leave and no legal protection against dismissal. By contrast, modern manufacturing employees in most industrialized nations work regulated hours under contracts that guarantee paid vacation, sick leave, and protections against arbitrary termination.`,
      question: `The second sentence ("By contrast, modern manufacturing...") primarily serves to`,
      steps: [
        {
          instruction: `Identify the signal phrase`,
          content: `"By contrast" explicitly signals a comparison in which the second item differs from the first.`,
        },
        {
          instruction: `Identify the two items being compared`,
          content: `The first sentence describes nineteenth-century factory workers; the second describes modern manufacturing employees.`,
        },
        {
          instruction: `Determine the relationship`,
          content: `The two descriptions differ: early workers had long hours and no protections; modern workers have regulated hours and legal guarantees.`,
        },
        {
          instruction: `Match to a choice`,
          content: `The correct answer will describe the second sentence as highlighting the difference between the two groups, not agreeing with the first or introducing an unrelated topic.`,
        },
      ],
      choices: [
        { label: 'A', text: `support the claim that factory conditions have always been difficult` },
        { label: 'B', text: `provide historical background on how factories were built` },
        { label: 'C', text: `highlight the contrast between early and modern manufacturing workers' conditions` },
        { label: 'D', text: `argue that current labor laws should be strengthened further` },
      ],
      correctAnswer: 'C',
      explanation: `The "by contrast" signal and the two descriptions of workers in different eras establish a direct comparison. The second sentence's function is to highlight how much working conditions have changed.`,
      wrongAnswerExplanations: {
        A: `The second sentence shows that conditions have improved, not that they have always been difficult.`,
        B: `How factories were constructed is never discussed; the focus is on workers' conditions and legal protections.`,
        D: `The passage describes current protections but does not argue they are insufficient or should be expanded.`,
      },
    },
    {
      id: 'tsp-ex-7',
      level: 'advanced',
      hints: [
        `Ask what the closing sentence adds after the author has already made her main argument.`,
        `Does the final sentence summarize what came before it, introduce a new problem, or acknowledge a remaining limitation?`,
        `Words like "yet" and "still" in a final sentence often signal a qualification — something the argument cannot fully resolve.`,
      ],
      coachTakeaway: `A final sentence that uses "yet" or "still" after an otherwise positive argument signals a closing qualification: the author admits the argument has a limit. On the SAT, these closing qualifications almost always have the function of acknowledging what the evidence does not fully settle, making the argument more nuanced.`,
      stimulus: `The author argues persuasively that community gardens reduce food insecurity in dense urban areas. She cites three large-scale studies showing consistent drops in household hunger rates in neighborhoods where gardens were established. Her case for community gardens as a practical intervention is compelling and well-supported. Yet she acknowledges that the studies cannot determine whether the gardens themselves reduced hunger or whether the type of neighborhood willing to build a garden was already improving along other economic dimensions.`,
      question: `The primary purpose of the final sentence is to`,
      steps: [
        {
          instruction: `Identify what precedes the final sentence`,
          content: `The previous sentences argue that community gardens reduce food insecurity and describe supporting evidence.`,
        },
        {
          instruction: `Read the final sentence carefully`,
          content: `It begins with "Yet," signals a turn, and acknowledges that the studies cannot determine whether gardens caused the reduction or whether other neighborhood factors did.`,
        },
        {
          instruction: `Determine the function`,
          content: `The final sentence concedes a limitation of the evidence — a causal uncertainty the studies cannot resolve.`,
        },
        {
          instruction: `Match to a choice`,
          content: `The correct answer will describe acknowledging a limitation or a question the evidence leaves open.`,
        },
      ],
      choices: [
        { label: 'A', text: `restate the author's central argument in different words` },
        { label: 'B', text: `introduce a new study that overturns the earlier evidence` },
        { label: 'C', text: `dismiss the three studies as methodologically unreliable` },
        { label: 'D', text: `acknowledge a causal uncertainty that the studies cannot fully resolve` },
      ],
      correctAnswer: 'D',
      explanation: `The "yet" signals a qualification after an otherwise positive argument. The final sentence concedes that the studies cannot prove whether gardens caused the improvements or whether a confounding neighborhood trend did. This is a closing acknowledgment of a limitation, not a restatement or a refutation.`,
      wrongAnswerExplanations: {
        A: `The final sentence introduces a doubt, not a restatement; the argument itself was already made in the previous sentences.`,
        B: `No new overturning study is introduced; the author qualifies the same three studies already cited.`,
        C: `The author calls her case "compelling and well-supported"; she acknowledges a causal uncertainty, not a methodological failure.`,
      },
    },
    {
      id: 'tsp-ex-8',
      level: 'challenge',
      hints: [
        `Notice that the passage describes a structural choice the author made — opening with questions rather than assertions.`,
        `Ask why an author might pose questions at the start of an essay instead of stating conclusions.`,
        `The final sentence of the passage itself names the effect of this technique. Trust it.`,
      ],
      coachTakeaway: `When a passage analyzes an author's structural choice (rather than just reporting content), the question is almost always asking you to identify the rhetorical effect of that choice. Look for the sentence in the passage that names the effect — the author usually tells you directly — and match it to the correct answer.`,
      stimulus: `The sociologist opens her book not with a thesis but with a series of questions: Why do some neighborhoods absorb newcomers easily while others resist them? What makes a place feel like home to one person and alien to another? By withholding her conclusions at the outset, she forces readers to sit with the uncertainty she spent years studying, making them feel — before they understand — why the questions matter.`,
      question: `The primary purpose of describing the sociologist's opening technique is to`,
      steps: [
        {
          instruction: `Identify the technique`,
          content: `The sociologist opens with questions rather than a thesis, withholding her conclusions.`,
        },
        {
          instruction: `Find the effect named in the passage`,
          content: `The passage says this "forces readers to sit with the uncertainty" and makes them "feel — before they understand — why the questions matter."`,
        },
        {
          instruction: `Determine the passage's purpose`,
          content: `The passage is analyzing the rhetorical effect of this technique: it creates a felt sense of the problem before offering answers.`,
        },
        {
          instruction: `Match to a choice`,
          content: `The correct answer will describe explaining how the technique produces a specific effect on readers — not criticizing or summarizing the technique.`,
        },
      ],
      choices: [
        { label: 'A', text: `criticize the sociologist for failing to state her argument clearly at the outset` },
        { label: 'B', text: `summarize the questions that the sociologist's book will answer` },
        { label: 'C', text: `explain how the technique of opening with questions creates a felt sense of uncertainty before offering conclusions` },
        { label: 'D', text: `argue that sociologists should always open their books with a series of questions` },
      ],
      correctAnswer: 'C',
      explanation: `The passage describes the technique and then names its effect: readers feel why the questions matter before they understand the answers. The purpose is to analyze the rhetorical effect of the opening choice, which choice C captures precisely.`,
      wrongAnswerExplanations: {
        A: `The passage admires the technique; describing it as "forcing readers" is positive, not critical.`,
        B: `The passage does not summarize what the book will answer; it analyzes the effect of delaying those answers.`,
        D: `The passage analyzes one sociologist's choice; it does not prescribe a rule for all sociologists.`,
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
    {
      id: 'tsp-d-016',
      skillSlug: 'text-structure-purpose',
      level: 'foundation',
      difficulty: 'easy',
      errorCategory: 'sentence-function',
      stimulus: `Wolves were once hunted to near-extinction across much of North America. They were reintroduced to Yellowstone National Park in 1995. Since then, researchers have documented significant recovery of vegetation along riverbanks as deer, wary of wolves, began to avoid certain grazing areas.`,
      question: `The third sentence ("Since then, researchers...") primarily serves to`,
      choices: [
        { label: 'A', text: `argue that all national parks should reintroduce wolves` },
        { label: 'B', text: `describe an unexpected outcome that followed from the reintroduction` },
        { label: 'C', text: `explain why wolves were originally hunted` },
        { label: 'D', text: `contradict the claim that wolves were reintroduced` },
      ],
      correctAnswer: 'B',
      explanation: `The third sentence describes what happened after the reintroduction: vegetation recovered because deer behavior changed. This is a result that followed the event described in the second sentence.`,
      wrongAnswerExplanations: {
        A: `The passage describes one park's results, not a universal recommendation for all parks.`,
        C: `The reasons wolves were hunted are not explained; the passage focuses on their reintroduction and its effects.`,
        D: `The third sentence builds on the reintroduction rather than disputing it.`,
      },
      teachingPoint: `A sentence placed after an event and beginning with "since then" or "after" typically describes the outcome or consequence of that event.`,
    },
    {
      id: 'tsp-d-017',
      skillSlug: 'text-structure-purpose',
      level: 'foundation',
      difficulty: 'easy',
      errorCategory: 'sentence-function',
      stimulus: `The new transit line has reduced commute times across the city. This is especially true for residents of the eastern neighborhoods, who previously faced a forty-minute bus transfer to reach downtown. Now many of them arrive in under twenty minutes.`,
      question: `The second sentence ("This is especially true...") mainly serves to`,
      choices: [
        { label: 'A', text: `contradict the first sentence by pointing out an exception` },
        { label: 'B', text: `question whether the transit line is actually faster` },
        { label: 'C', text: `narrow the first sentence's general claim to a specific group that benefited most` },
        { label: 'D', text: `explain how the transit line was designed` },
      ],
      correctAnswer: 'C',
      explanation: `The phrase "especially true for" signals that the second sentence focuses the general claim on one particular group — eastern residents — who saw the greatest benefit. This narrows and illustrates the first sentence.`,
      wrongAnswerExplanations: {
        A: `The second sentence supports and focuses the first sentence; it does not contradict it.`,
        B: `The sentence confirms faster commutes for a specific group rather than questioning the claim.`,
        D: `How the transit line was designed is never discussed; the focus is on commute time outcomes.`,
      },
      teachingPoint: `A sentence beginning with "especially" or "this is particularly true for" narrows a general claim to a specific subgroup without contradicting the original.`,
    },
    {
      id: 'tsp-d-018',
      skillSlug: 'text-structure-purpose',
      level: 'sat-application',
      difficulty: 'medium',
      errorCategory: 'author-purpose',
      stimulus: `The novelist spent years researching the history of the textile industry before writing her book. She visited abandoned mills, interviewed retired workers, and read union archives dating back to the 1880s. These preparations, reviewers noted, gave the novel a texture of historical specificity that few works of fiction achieve.`,
      question: `The second sentence ("She visited abandoned mills...") primarily serves to`,
      choices: [
        { label: 'A', text: `introduce a debate about how novelists should conduct research` },
        { label: 'B', text: `detail the specific research activities that explain the first sentence's claim` },
        { label: 'C', text: `describe the plot of the novelist's book` },
        { label: 'D', text: `argue that fiction is a more effective form than nonfiction` },
      ],
      correctAnswer: 'B',
      explanation: `The first sentence claims the novelist spent years on research. The second sentence enumerates exactly what that research involved — mills, workers, archives — which explains and substantiates the first sentence's claim.`,
      wrongAnswerExplanations: {
        A: `No debate about research methods appears; the passage describes what one novelist did.`,
        C: `The novel's plot is never described; the focus is on how the novel was researched and its resulting quality.`,
        D: `No comparison of fiction and nonfiction is made; the passage is about this novelist's preparation.`,
      },
      teachingPoint: `A sentence that lists specific activities following a general claim about effort or preparation functions to explain and substantiate that claim.`,
    },
    {
      id: 'tsp-d-019',
      skillSlug: 'text-structure-purpose',
      level: 'sat-application',
      difficulty: 'medium',
      errorCategory: 'overall-text-structure',
      stimulus: `The essay opens by praising the city's newly expanded cycling infrastructure. It then pivots to the concerns of business owners on commercial streets who say deliveries have become slower and parking has been reduced. The essay closes by proposing a pilot program that would test a hybrid design, preserving bike lanes on residential streets while maintaining loading zones on commercial ones.`,
      question: `Which choice best describes the overall structure of the passage?`,
      choices: [
        { label: 'A', text: `It presents a solution, identifies problems with it, then abandons the original idea.` },
        { label: 'B', text: `It describes a benefit, introduces a complication, and proposes a compromise.` },
        { label: 'C', text: `It compares two competing infrastructure designs from different cities.` },
        { label: 'D', text: `It argues that cycling infrastructure should never be built in commercial areas.` },
      ],
      correctAnswer: 'B',
      explanation: `The essay moves from praising the expansion (benefit) to noting business owners' concerns (complication) to proposing a hybrid design (compromise). Choice B names all three stages correctly.`,
      wrongAnswerExplanations: {
        A: `The essay does not abandon the original idea; it proposes a hybrid that preserves cycling infrastructure in some areas.`,
        C: `No other cities are compared; the essay focuses on one city's design challenge.`,
        D: `The essay actually proposes keeping bike lanes in residential areas; it does not argue against all cycling infrastructure.`,
      },
      teachingPoint: `For structure questions, track the sequence of moves — praise or assertion, complication, then resolution — and match the choice that names all three.`,
    },
    {
      id: 'tsp-d-020',
      skillSlug: 'text-structure-purpose',
      level: 'sat-application',
      difficulty: 'medium',
      errorCategory: 'contrast-and-qualification',
      stimulus: `Researchers have long assumed that memory consolidation during sleep is a passive process in which the brain simply replays the day's events. Recent findings complicate this picture. Studies using neural imaging suggest that the sleeping brain actively selects which memories to strengthen, suppressing some traces and reinforcing others based on their predicted future usefulness.`,
      question: `The third sentence ("Studies using neural imaging...") primarily serves to`,
      choices: [
        { label: 'A', text: `support the long-held assumption that sleep is a passive process` },
        { label: 'B', text: `present evidence that qualifies the second sentence's challenge to older assumptions` },
        { label: 'C', text: `provide specific evidence that supports the "recent findings" mentioned in the second sentence` },
        { label: 'D', text: `argue that neural imaging is a flawed research method` },
      ],
      correctAnswer: 'C',
      explanation: `The second sentence announces that recent findings complicate the older view. The third sentence names the specific evidence — neural imaging studies showing active memory selection — that justifies this claim. It supplies the proof for the second sentence's assertion.`,
      wrongAnswerExplanations: {
        A: `The third sentence contradicts, not supports, the passive-process assumption.`,
        B: `The third sentence reinforces the second sentence rather than qualifying it further.`,
        D: `Neural imaging is presented as evidence; its reliability is not questioned.`,
      },
      teachingPoint: `When a sentence claims "recent findings complicate X," the next sentence usually supplies the specific evidence for that claim. Its function is to substantiate, not to introduce yet another complication.`,
    },
    {
      id: 'tsp-d-021',
      skillSlug: 'text-structure-purpose',
      level: 'advanced',
      difficulty: 'hard',
      errorCategory: 'rhetorical-moves',
      stimulus: `The journalist opens her investigation by citing the company's own press release, which promises "an unmatched commitment to worker safety." She then quotes from fourteen interviews with current and former employees who describe inadequate protective equipment, unreported injuries, and managers who discouraged workers from filing safety complaints. The contrast between the company's stated values and the workers' experiences forms the spine of her argument.`,
      question: `The journalist's decision to open with the company's press release primarily serves to`,
      choices: [
        { label: 'A', text: `praise the company for its stated commitment to worker safety` },
        { label: 'B', text: `summarize the journalist's conclusion that the company is a model employer` },
        { label: 'C', text: `introduce expert commentary on labor law compliance` },
        { label: 'D', text: `establish the company's own claim as a standard against which its actual practices will be measured` },
      ],
      correctAnswer: 'D',
      explanation: `The press release sets the standard the company claims to meet. The employee interviews then reveal how far reality falls short. Opening with the company's own words allows the journalist to use them as a benchmark, making the gap between promise and practice the argument's foundation.`,
      wrongAnswerExplanations: {
        A: `The journalist cites the press release not to endorse it but to create a foil for the employee testimony that follows.`,
        B: `The investigation's conclusion is that the company fails its workers, not that it is a model employer.`,
        C: `No legal experts are quoted; the evidence consists of employee interviews, not legal commentary.`,
      },
      teachingPoint: `When a journalist or critic opens with the subject's own claims, the purpose is almost always to set up a contrast — to use the subject's stated values as a measure of how far their actions fall short.`,
    },
    {
      id: 'tsp-d-022',
      skillSlug: 'text-structure-purpose',
      level: 'advanced',
      difficulty: 'hard',
      errorCategory: 'paragraph-function',
      stimulus: `A long-term study tracked two thousand adults over twenty years, measuring their exercise habits and their cognitive performance on standardized tests. The first section of the paper confirms what previous research suggested: people who exercised regularly in their forties outperformed sedentary peers on memory tests in their sixties. The second section, however, focuses on a subgroup of participants who began exercising only in their fifties. Surprisingly, this late-starting group showed nearly the same cognitive advantages as those who had exercised for two decades.`,
      question: `The second section of the study (beginning with "however") primarily serves to`,
      choices: [
        { label: 'A', text: `prove that exercise in one's forties has no effect on later cognitive performance` },
        { label: 'B', text: `question the reliability of the cognitive tests used in the first section` },
        { label: 'C', text: `describe how the study recruited its two thousand participants` },
        { label: 'D', text: `complicate the first section's finding by showing that starting later may produce similar benefits` },
      ],
      correctAnswer: 'D',
      explanation: `The first section confirms that early, sustained exercise helps cognition. The second section introduces a surprising nuance: starting in one's fifties yields nearly the same result. This complicates the first finding by showing that early starts may not be required to gain the benefit.`,
      wrongAnswerExplanations: {
        A: `The first section confirms that exercise in one's forties does help; the second section complicates, not refutes, that finding.`,
        B: `The second section presents a new finding about late starters; it does not challenge the measurement tools.`,
        C: `Recruitment methods are never described; the focus is on the exercise subgroup's results.`,
      },
      teachingPoint: `A second section or paragraph that begins with "however" and focuses on a subgroup typically serves to qualify or complicate the first finding — not overturn it.`,
    },
    {
      id: 'tsp-d-023',
      skillSlug: 'text-structure-purpose',
      level: 'advanced',
      difficulty: 'hard',
      errorCategory: 'tone-and-stance',
      stimulus: `The memoir's author spends three chapters on her childhood in a small coastal town, recounting tide pools, summer storms, and the routines of fishing families with obvious affection. In the fourth chapter, she learns she must leave for a city school. What is striking is what she does not say: there is no direct statement of grief, no admission of how much she dreads the departure. Instead, she lists the objects she decides to leave behind — a jar of sand, a piece of driftwood, a photograph — and ends the chapter there.`,
      question: `The author's observation about what the memoirist does not say primarily serves to`,
      choices: [
        { label: 'A', text: `criticize the memoirist for being unwilling to express her emotions directly` },
        { label: 'B', text: `explain why the fourth chapter is the weakest part of the memoir` },
        { label: 'C', text: `identify a technique by which the memoirist conveys grief indirectly through the objects she leaves behind` },
        { label: 'D', text: `argue that all memoirists should avoid stating their emotions directly` },
      ],
      correctAnswer: 'C',
      explanation: `The author notes the absence of direct emotional language and points instead to the list of abandoned objects. This analysis identifies how the memoirist communicates grief through concrete details rather than statements — an indirect technique the observer is naming and explaining.`,
      wrongAnswerExplanations: {
        A: `The observation is analytical and admiring, not critical; the technique of indirect expression is presented as meaningful, not as a flaw.`,
        B: `The fourth chapter is not called weak; its restraint is presented as a deliberate and effective choice.`,
        D: `The passage analyzes one memoirist's approach, not a universal rule for the genre.`,
      },
      teachingPoint: `When a critic points out what an author does not say, the purpose is usually to analyze how the author conveys meaning through absence or indirection rather than direct statement.`,
    },
    {
      id: 'tsp-d-024',
      skillSlug: 'text-structure-purpose',
      level: 'challenge',
      difficulty: 'hard',
      errorCategory: 'overall-text-structure',
      stimulus: `The philosopher begins by granting that consequentialist ethics offers a rigorous framework for evaluating actions by their outcomes. She then spends two paragraphs developing the most sophisticated version of the consequentialist position she can, steel-manning arguments she will ultimately reject. Only in the fourth paragraph does she begin her critique, targeting not the weakest form of the view but the strongest version she has just constructed. She closes by conceding that her objections leave the consequentialist with responses to make, and that the dispute is not settled.`,
      question: `Which choice best describes the overall structure of the passage?`,
      choices: [
        { label: 'A', text: `It compares two philosophers who hold opposing views on consequentialism.` },
        { label: 'B', text: `It presents a moral argument and then proves it is definitively correct.` },
        { label: 'C', text: `It traces the historical development of consequentialist ethics from its origins to the present day.` },
        { label: 'D', text: `It introduces a philosophical position, builds its strongest form, critiques that form, and closes by acknowledging the debate is ongoing.` },
      ],
      correctAnswer: 'D',
      explanation: `The passage moves in four stages: granting the framework's rigor (introduction), building its strongest version (steel-manning), critiquing that version (objection), and acknowledging the dispute remains open (closing concession). Choice D is the only option that names all four stages.`,
      wrongAnswerExplanations: {
        A: `Only one philosopher is discussed; no opposing philosopher is introduced.`,
        B: `The passage ends by conceding the consequentialist has responses available — the opposite of a definitive proof.`,
        C: `No historical development is traced; the structure is argumentative, moving from concession through critique to qualified conclusion.`,
      },
      teachingPoint: `For challenge-level structure questions, track every stage including any closing qualification. A passage that ends with "the debate is not settled" signals an inconclusive structure — the correct answer must include that nuance.`,
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
