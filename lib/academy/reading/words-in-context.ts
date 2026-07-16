import type { AcademySkill } from '../types'

export const wordsInContext: AcademySkill = {
  slug: 'words-in-context',
  title: 'Words in Context',
  section: 'reading',
  overview: {
    whatItTests:
      'How words function in specific contexts, not just their dictionary definitions.',
    howItAppears:
      'A short passage appears with one word marked; four choices offer different meanings or replacement words for that word.',
    whyStudentsMissIt:
      "Students pick a familiar definition that does not fit the passage's context, and they fail to read the sentence surrounding the target word closely enough.",
    whatToLookFor:
      'The logical relationship between the target word and the rest of the sentence, especially contrast words like "but" and "however" or continuation words like "and" and "also."',
  },
  strategy: {
    steps: [
      'Cover the choices and predict a general meaning for the word based only on the surrounding context.',
      'Check whether the sentence expresses contrast, continuation, or cause, since that tells you the direction the word must point.',
      'Read each choice back into the sentence and eliminate any that change the meaning or tone.',
      "Pick the choice whose meaning fits the exact context, not just the word's most common definition.",
    ],
    timeSavingTip:
      'Predict your own word before reading the choices. If a choice matches your prediction, it is almost always correct and you can move on quickly.',
    whenNotToOverthink:
      'When one choice clearly matches your prediction and reads naturally in the sentence, trust it. Do not talk yourself into a fancier word that shifts the meaning.',
  },
  commonTraps: [
    {
      title: 'The common-definition trap',
      description:
        'A choice offers the most familiar meaning of the word, which does not fit this particular sentence.',
      avoidance:
        'Words on the SAT are usually tested precisely because they have a secondary meaning. Let the sentence, not your first instinct, decide.',
    },
    {
      title: 'The academic-sounding trap',
      description:
        'A choice uses an impressive or scholarly word that changes the direction or tone of the sentence.',
      avoidance:
        'Fancy is not the same as correct. Read the choice back into the sentence and check that the meaning is unchanged.',
    },
    {
      title: 'The ignored-contrast trap',
      description:
        'A choice ignores a contrast clue such as "but," "however," or "yet" that signals the word must have a specific tone.',
      avoidance:
        'Circle transition words. A contrast word means the target word likely opposes the idea before it.',
    },
    {
      title: 'The near-synonym trap',
      description:
        'A choice is a synonym of the word in isolation but does not carry the exact meaning the sentence requires.',
      avoidance:
        'Two words can share a dictionary meaning yet differ in usage. Test whether the substitution preserves the precise idea.',
    },
  ],
  guidedExamples: [
    {
      id: 'wic-ex-1',
      stimulus:
        'The committee had expected the new policy to spark heated debate, but the discussion proved surprisingly [TEMPERATE]. Members raised concerns calmly, and no one interrupted or raised a voice. By the end of the meeting, even the members who disagreed most strongly had spoken with measured politeness.',
      question: 'As used in the passage, the word [TEMPERATE] most nearly means',
      steps: [
        {
          instruction: 'Read for context',
          content:
            'The passage sets up an expectation of "heated debate" but then says the discussion was "surprisingly" something. The word "surprisingly" plus the contrast "but" signals the discussion was the opposite of heated.',
        },
        {
          instruction: 'Predict a meaning',
          content:
            'The following sentences describe members raising concerns "calmly" and speaking with "measured politeness." Predict a word meaning calm or mild.',
        },
        {
          instruction: 'Eliminate wrong choices',
          content:
            '"Cold" describes temperature, not tone, and is not supported. "Passionate" means the opposite of calm. "Brief" describes length, but nothing tells us the discussion was short.',
        },
        {
          instruction: 'Confirm the correct choice',
          content:
            '"Mild" matches the calm, measured tone the passage describes and fits the contrast with "heated debate."',
        },
      ],
      choices: [
        { label: 'A', text: 'cold' },
        { label: 'B', text: 'mild' },
        { label: 'C', text: 'passionate' },
        { label: 'D', text: 'brief' },
      ],
      correctAnswer: 'B',
      explanation:
        'The passage contrasts an expected "heated debate" with a discussion in which members spoke "calmly" and with "measured politeness." "Mild" captures this calm, gentle tone and fits the contrast signaled by "but" and "surprisingly."',
      wrongAnswerExplanations: {
        A: '"Cold" refers to literal temperature or an unfriendly manner, but the members were polite, not unfriendly, so it does not fit.',
        C: '"Passionate" means intense and emotional, which is the opposite of the calm discussion described and contradicts the contrast with "heated debate."',
        D: '"Brief" describes length, but nothing in the passage indicates the discussion was short; it describes the tone, not the duration.',
      },
    },
    {
      id: 'wic-ex-2',
      stimulus:
        'Dr. Okafor was known for her [EXACTING] standards in the laboratory. She required students to record every measurement to the correct decimal place, repeat each experiment three times, and label every sample by hand. Sloppy work was returned without comment, to be done again.',
      question: 'As used in the passage, the word [EXACTING] most nearly means',
      steps: [
        {
          instruction: 'Read for context',
          content:
            'The passage lists specific demands: recording exact decimals, repeating experiments, labeling by hand. These are strict, detailed requirements.',
        },
        {
          instruction: 'Predict a meaning',
          content:
            'A word describing standards that are strict and demanding. Predict "demanding" or "strict."',
        },
        {
          instruction: 'Eliminate wrong choices',
          content:
            '"Accurate" describes results, not the level of demand placed on students. "Cruel" is too extreme and negative; strict is not the same as cruel. "Reasonable" understates how strict she was.',
        },
        {
          instruction: 'Confirm the correct choice',
          content:
            '"Demanding" matches the strict, detailed requirements the passage describes.',
        },
      ],
      choices: [
        { label: 'A', text: 'accurate' },
        { label: 'B', text: 'cruel' },
        { label: 'C', text: 'demanding' },
        { label: 'D', text: 'reasonable' },
      ],
      correctAnswer: 'C',
      explanation:
        'The details show that Dr. Okafor set strict, detailed requirements for her students. "Demanding" captures standards that ask a great deal, which the examples of repeated experiments and precise measurements illustrate.',
      wrongAnswerExplanations: {
        A: '"Accurate" describes whether something is correct, but "exacting" here describes how much Dr. Okafor demands of her students, not the correctness of a result.',
        B: '"Cruel" is too extreme; the passage shows high standards, not deliberate unkindness, and returning work to be redone is strict, not cruel.',
        D: '"Reasonable" is too mild and does not capture the unusually strict, detailed demands the passage emphasizes.',
      },
    },
    {
      id: 'wic-ex-3',
      stimulus:
        'Early critics dismissed the novelist\'s later work as [DERIVATIVE], claiming that every plot twist and character type had been borrowed from earlier, more famous authors. Only decades later did readers begin to see originality in the way she reassembled these familiar pieces.',
      question: 'As used in the passage, the word [DERIVATIVE] most nearly means',
      steps: [
        {
          instruction: 'Read for context',
          content:
            'The critics "dismissed" the work, and the reason is that plots and characters had been "borrowed from earlier" authors. So the word carries a negative sense of copying.',
        },
        {
          instruction: 'Predict a meaning',
          content:
            'Predict a word meaning unoriginal or copied from others.',
        },
        {
          instruction: 'Eliminate wrong choices',
          content:
            '"Original" is the opposite of what the critics claimed. "Complicated" describes difficulty, not borrowing. "Emotional" is unrelated to the idea of copying.',
        },
        {
          instruction: 'Confirm the correct choice',
          content:
            '"Unoriginal" matches the critics\' complaint that everything was borrowed from earlier authors.',
        },
      ],
      choices: [
        { label: 'A', text: 'original' },
        { label: 'B', text: 'unoriginal' },
        { label: 'C', text: 'complicated' },
        { label: 'D', text: 'emotional' },
      ],
      correctAnswer: 'B',
      explanation:
        'The critics dismissed the work because its plots and characters were "borrowed from earlier" authors. "Unoriginal" matches this charge of copying and is reinforced by the later contrast, when readers finally saw "originality."',
      wrongAnswerExplanations: {
        A: '"Original" is the exact opposite of the critics\' complaint; the later sentence uses "originality" as a contrast, confirming the word here means unoriginal.',
        C: '"Complicated" describes difficulty or intricacy, which the passage never raises; the issue is borrowing, not complexity.',
        D: '"Emotional" refers to feeling and is unrelated to the accusation that the work copied earlier authors.',
      },
    },
  ],
  drillQuestions: [
    {
      id: 'wic-d-001',
      skillSlug: 'words-in-context',
      difficulty: 'easy',
      stimulus:
        'The hikers were grateful for the [ABUNDANT] water along the trail; every mile or two they passed another clear stream where they could refill their bottles.',
      question: 'As used in the passage, the word [ABUNDANT] most nearly means',
      choices: [
        { label: 'A', text: 'plentiful' },
        { label: 'B', text: 'clean' },
        { label: 'C', text: 'cold' },
        { label: 'D', text: 'distant' },
      ],
      correctAnswer: 'A',
      explanation:
        'The detail that streams appeared "every mile or two" shows there was a large amount of water, so "plentiful" fits.',
      wrongAnswerExplanations: {
        B: '"Clean" describes quality, but the emphasis is on how much water there was, not how pure it was.',
        C: '"Cold" describes temperature, which the passage does not discuss.',
        D: '"Distant" contradicts the passage, which says water appeared frequently and close by.',
      },
      teachingPoint:
        'Let the supporting detail ("every mile or two") point you to the meaning that describes quantity.',
    },
    {
      id: 'wic-d-002',
      skillSlug: 'words-in-context',
      difficulty: 'easy',
      stimulus:
        'After weeks of practice, the young pianist gave a [FLAWLESS] performance; she did not miss a single note, and the audience rose to its feet.',
      question: 'As used in the passage, the word [FLAWLESS] most nearly means',
      choices: [
        { label: 'A', text: 'loud' },
        { label: 'B', text: 'perfect' },
        { label: 'C', text: 'quick' },
        { label: 'D', text: 'nervous' },
      ],
      correctAnswer: 'B',
      explanation:
        'The clue "did not miss a single note" shows the performance had no mistakes, so "perfect" fits.',
      wrongAnswerExplanations: {
        A: '"Loud" describes volume, which the passage does not mention.',
        C: '"Quick" describes speed, but nothing indicates the performance was fast.',
        D: '"Nervous" describes emotion and contradicts a performance without a single missed note.',
      },
      teachingPoint:
        'A phrase like "did not miss a single note" directly defines the target word for you.',
    },
    {
      id: 'wic-d-003',
      skillSlug: 'words-in-context',
      difficulty: 'easy',
      stimulus:
        'The manager gave [CONCISE] instructions before the shift began, listing only the three tasks that mattered most and nothing else.',
      question: 'As used in the passage, the word [CONCISE] most nearly means',
      choices: [
        { label: 'A', text: 'brief' },
        { label: 'B', text: 'confusing' },
        { label: 'C', text: 'friendly' },
        { label: 'D', text: 'detailed' },
      ],
      correctAnswer: 'A',
      explanation:
        'Listing "only the three tasks that mattered most and nothing else" shows the instructions were short and to the point, so "brief" fits.',
      wrongAnswerExplanations: {
        B: '"Confusing" contradicts the clear, focused instructions described.',
        C: '"Friendly" describes tone, which the passage does not address.',
        D: '"Detailed" is the opposite of concise; the manager left out everything but the essentials.',
      },
      teachingPoint:
        'Watch for the word "only," which signals that something was limited or brief.',
    },
    {
      id: 'wic-d-004',
      skillSlug: 'words-in-context',
      difficulty: 'medium',
      stimulus:
        'The senator was praised for her [CANDID] remarks; while other speakers avoided the difficult question, she answered it directly and admitted what she did not yet know.',
      question: 'As used in the passage, the word [CANDID] most nearly means',
      choices: [
        { label: 'A', text: 'lengthy' },
        { label: 'B', text: 'honest' },
        { label: 'C', text: 'cheerful' },
        { label: 'D', text: 'cautious' },
      ],
      correctAnswer: 'B',
      explanation:
        'She "answered it directly and admitted what she did not yet know," which shows openness and honesty, so "honest" fits.',
      wrongAnswerExplanations: {
        A: '"Lengthy" describes length, but the passage stresses directness, not how long she spoke.',
        C: '"Cheerful" describes mood, which the passage does not mention.',
        D: '"Cautious" is the opposite of the direct, open answer described; other speakers were cautious, and she was contrasted with them.',
      },
      teachingPoint:
        'When a person is contrasted with those who "avoided" something, the target word usually names the opposite quality.',
    },
    {
      id: 'wic-d-005',
      skillSlug: 'words-in-context',
      difficulty: 'medium',
      stimulus:
        'The report\'s conclusions were [TENTATIVE]; the authors stressed that their sample was small and that further study could easily change the results.',
      question: 'As used in the passage, the word [TENTATIVE] most nearly means',
      choices: [
        { label: 'A', text: 'final' },
        { label: 'B', text: 'detailed' },
        { label: 'C', text: 'uncertain' },
        { label: 'D', text: 'popular' },
      ],
      correctAnswer: 'C',
      explanation:
        'The authors said further study "could easily change the results," which shows the conclusions were not firm, so "uncertain" fits.',
      wrongAnswerExplanations: {
        A: '"Final" is the opposite; the authors admitted the results might change.',
        B: '"Detailed" describes thoroughness, which the passage does not address.',
        D: '"Popular" describes acceptance by others, which is unrelated to the conclusions being unsettled.',
      },
      teachingPoint:
        'If the passage says results "could change," the target word likely means unsettled or uncertain.',
    },
    {
      id: 'wic-d-006',
      skillSlug: 'words-in-context',
      difficulty: 'medium',
      stimulus:
        'Although the city council had promised swift action, its response to the flooding proved [SLUGGISH]; forms took weeks to process, and repairs did not begin until the following season.',
      question: 'As used in the passage, the word [SLUGGISH] most nearly means',
      choices: [
        { label: 'A', text: 'careless' },
        { label: 'B', text: 'slow' },
        { label: 'C', text: 'generous' },
        { label: 'D', text: 'sudden' },
      ],
      correctAnswer: 'B',
      explanation:
        'The contrast "although... swift action" plus details like "forms took weeks" and "repairs did not begin until the following season" show the response was slow.',
      wrongAnswerExplanations: {
        A: '"Careless" suggests errors, but the passage emphasizes delay, not mistakes.',
        C: '"Generous" describes giving, which is unrelated to the pace of the response.',
        D: '"Sudden" is the opposite of the delayed response the passage describes and contradicts the contrast with "swift action."',
      },
      teachingPoint:
        'A contrast word like "although" tells you the response fell short of the promise, here of being "swift."',
    },
    {
      id: 'wic-d-007',
      skillSlug: 'words-in-context',
      difficulty: 'medium',
      stimulus:
        'The essay makes a [COMPELLING] case for planting trees in cities: it cites cooler temperatures, cleaner air, and lower energy bills, and by the final page few readers remain unconvinced.',
      question: 'As used in the passage, the word [COMPELLING] most nearly means',
      choices: [
        { label: 'A', text: 'lengthy' },
        { label: 'B', text: 'forced' },
        { label: 'C', text: 'persuasive' },
        { label: 'D', text: 'unclear' },
      ],
      correctAnswer: 'C',
      explanation:
        'The essay convinces readers with strong reasons, and "few readers remain unconvinced," so "persuasive" fits.',
      wrongAnswerExplanations: {
        A: '"Lengthy" describes length, but the passage stresses how convincing the case is, not how long it is.',
        B: '"Forced" carries a negative sense of being unnatural, which contradicts the praise implied by convincing readers.',
        D: '"Unclear" contradicts the passage, which shows the case was easy to accept.',
      },
      teachingPoint:
        '"Compelling" often means persuasive; confirm with clues about readers being convinced.',
    },
    {
      id: 'wic-d-008',
      skillSlug: 'words-in-context',
      difficulty: 'hard',
      stimulus:
        'The diplomat\'s language was deliberately [GUARDED]. She acknowledged that talks had occurred but refused to confirm any specific agreement, choosing each phrase so that it revealed as little as possible.',
      question: 'As used in the passage, the word [GUARDED] most nearly means',
      choices: [
        { label: 'A', text: 'protected' },
        { label: 'B', text: 'cautious' },
        { label: 'C', text: 'aggressive' },
        { label: 'D', text: 'confused' },
      ],
      correctAnswer: 'B',
      explanation:
        'She "refused to confirm" details and chose phrases to reveal "as little as possible," showing careful restraint, so "cautious" fits. This tests the secondary meaning of "guarded" as careful rather than physically protected.',
      wrongAnswerExplanations: {
        A: '"Protected" is the literal meaning of guarded (as in defended by guards), but here it describes her careful manner of speaking, not physical protection.',
        C: '"Aggressive" is the opposite of the careful, restrained language described.',
        D: '"Confused" contradicts the deliberate, controlled word choice the passage emphasizes.',
      },
      teachingPoint:
        'Hard items often test a secondary meaning. "Guarded" here means cautious, not literally defended.',
    },
    {
      id: 'wic-d-009',
      skillSlug: 'words-in-context',
      difficulty: 'hard',
      stimulus:
        'Where earlier biographers had treated the inventor as a lone genius, this new study takes a more [MEASURED] view, giving equal weight to the collaborators and rivals who shaped his ideas.',
      question: 'As used in the passage, the word [MEASURED] most nearly means',
      choices: [
        { label: 'A', text: 'calculated in size' },
        { label: 'B', text: 'balanced' },
        { label: 'C', text: 'hesitant' },
        { label: 'D', text: 'enthusiastic' },
      ],
      correctAnswer: 'B',
      explanation:
        'The new study is contrasted with treating the inventor as "a lone genius" and instead gives "equal weight" to others, so "balanced" fits.',
      wrongAnswerExplanations: {
        A: '"Calculated in size" is the literal meaning of measured but does not fit a description of a scholarly viewpoint.',
        C: '"Hesitant" suggests reluctance, but the study confidently offers a fuller account, not a timid one.',
        D: '"Enthusiastic" describes excitement, which the passage does not indicate; the emphasis is on fairness and balance.',
      },
      teachingPoint:
        'When a view gives "equal weight" to multiple sides, "measured" means balanced or even-handed.',
    },
    {
      id: 'wic-d-010',
      skillSlug: 'words-in-context',
      difficulty: 'hard',
      stimulus:
        'The critic argued that the film\'s special effects, however impressive, ultimately [ECLIPSED] its story, leaving audiences dazzled by the images yet unable to recall what the characters had wanted.',
      question: 'As used in the passage, the word [ECLIPSED] most nearly means',
      choices: [
        { label: 'A', text: 'darkened' },
        { label: 'B', text: 'overshadowed' },
        { label: 'C', text: 'completed' },
        { label: 'D', text: 'predicted' },
      ],
      correctAnswer: 'B',
      explanation:
        'The effects were so dominant that audiences could not recall the story, so the effects "overshadowed" the story. "Overshadowed" captures how one element drew attention away from another.',
      wrongAnswerExplanations: {
        A: '"Darkened" is close to the literal astronomical meaning of eclipse but does not fit, since the story was overpowered, not made dark.',
        C: '"Completed" suggests finishing, which contradicts the idea that the story was pushed aside.',
        D: '"Predicted" means foretold, which is unrelated to the effects dominating the story.',
      },
      teachingPoint:
        '"Eclipsed" figuratively means to overshadow, when one thing becomes so prominent it hides another.',
    },
  ],
}
