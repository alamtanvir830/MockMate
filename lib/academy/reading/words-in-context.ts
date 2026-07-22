import type { AcademySkill } from '../types'

export const wordsInContext: AcademySkill = {
  slug: 'words-in-context',
  title: 'Words in Context',
  section: 'reading',
  objective:
    'By the end of this lesson, you will be able to select the word or phrase that most precisely captures the author\'s intended meaning based on how the word functions in its local and broader context.',
  estimatedMinutes: 20,
  subskills: [
    'Local Context Clues',
    'Broader Passage Context',
    'Connotation and Tone',
    'Degree and Intensity',
    'Part-of-Speech Precision',
    'Near-Synonym Distinctions',
    'High-Utility Academic Vocabulary',
  ],
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
      level: 'sat-application',
      hints: [
        'Look at the transition word that connects this sentence to the one before it.',
        'The following sentences describe how the members actually spoke. What tone do those descriptions suggest?',
        'The word "heated" in the first sentence is the opposite of what you are looking for.',
      ],
      coachTakeaway:
        'Contrast transitions ("but," "however") nearly always signal that the target word must oppose the idea before them. On test day, circle that transition first, then predict the opposite of the nearby adjective.',
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
      level: 'sat-application',
      hints: [
        'List the specific requirements the passage describes. What single adjective covers all of them?',
        'Think about the difference between accurate (correctness of a result) and demanding (amount required of a person).',
        'The passage is describing her standards — what she requires — not what the students produce.',
      ],
      coachTakeaway:
        'When a passage lists detailed requirements, the target word usually names the intensity of those demands. Distinguish between words that describe results ("accurate") and words that describe how much is asked ("demanding").',
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
      level: 'advanced',
      hints: [
        'What did the critics accuse the novelist of doing? Focus on the phrase "borrowed from earlier... authors."',
        'Notice that the passage later uses "originality" as a contrast. What must the target word mean if "originality" is its opposite here?',
        'Eliminate any choice that describes style or quality rather than the relationship to earlier works.',
      ],
      coachTakeaway:
        'Hard items often use a word\'s secondary sense. When a passage contrasts the target word with "originality," you know the word means the absence of originality. Use internal contrasts as your compass.',
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
      level: 'foundation',
      difficulty: 'easy',
      errorCategory: 'local-context-clue',
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
      level: 'foundation',
      difficulty: 'easy',
      errorCategory: 'local-context-clue',
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
      level: 'foundation',
      difficulty: 'easy',
      errorCategory: 'local-context-clue',
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
      level: 'sat-application',
      difficulty: 'medium',
      errorCategory: 'contrast-clue',
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
      level: 'sat-application',
      difficulty: 'medium',
      errorCategory: 'broader-passage-context',
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
      level: 'sat-application',
      difficulty: 'medium',
      errorCategory: 'contrast-clue',
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
      level: 'sat-application',
      difficulty: 'medium',
      errorCategory: 'near-synonym-distinction',
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
      level: 'advanced',
      difficulty: 'hard',
      errorCategory: 'secondary-meaning',
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
      level: 'advanced',
      difficulty: 'hard',
      errorCategory: 'secondary-meaning',
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
      level: 'advanced',
      difficulty: 'hard',
      errorCategory: 'secondary-meaning',
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
    {
      id: 'wic-d-011',
      skillSlug: 'words-in-context',
      level: 'sat-application',
      difficulty: 'medium',
      errorCategory: 'connotation',
      stimulus:
        'When the laboratory published its findings, the lead researcher offered only a [RESTRAINED] comment to the press. She acknowledged the result was interesting but declined to celebrate, noting that replication by other teams was still needed.',
      question: 'As used in the passage, the word [RESTRAINED] most nearly means',
      choices: [
        { label: 'A', text: 'measured' },
        { label: 'B', text: 'silent' },
        { label: 'C', text: 'enthusiastic' },
        { label: 'D', text: 'dismissive' },
      ],
      correctAnswer: 'A',
      explanation:
        'The researcher spoke but kept her excitement in check, declining to celebrate. "Measured" captures this deliberately moderate, controlled tone, whereas "silent" overstates how little she said and "enthusiastic" contradicts her caution.',
      wrongAnswerExplanations: {
        B: '"Silent" is too extreme; she did speak, she just held back her enthusiasm.',
        C: '"Enthusiastic" contradicts the passage; she deliberately declined to celebrate.',
        D: '"Dismissive" implies she rejected the result, but she called it "interesting" — she was cautious, not dismissive.',
      },
      teachingPoint:
        'Positive near-synonyms can differ in intensity. "Measured" conveys controlled moderation, while "restrained" and "measured" share a connotation of deliberate self-control.',
    },
    {
      id: 'wic-d-012',
      skillSlug: 'words-in-context',
      level: 'advanced',
      difficulty: 'hard',
      errorCategory: 'degree-and-intensity',
      stimulus:
        'The new conservation policy did not eliminate the threat to the wetland entirely; it merely [DIMINISHED] it, reducing the rate of drainage without halting it. Environmentalists welcomed the change but cautioned that the habitat remained vulnerable.',
      question: 'As used in the passage, the word [DIMINISHED] most nearly means',
      choices: [
        { label: 'A', text: 'ended' },
        { label: 'B', text: 'reduced' },
        { label: 'C', text: 'ignored' },
        { label: 'D', text: 'reversed' },
      ],
      correctAnswer: 'B',
      explanation:
        'The passage explicitly contrasts "not eliminate" with what the policy actually achieved — "reducing the rate" without halting drainage. "Reduced" matches that partial improvement, making it clearly the correct degree.',
      wrongAnswerExplanations: {
        A: '"Ended" is synonymous with "eliminate," which the passage says the policy did not do.',
        C: '"Ignored" means the threat was overlooked, but the policy actively acted on it, just partially.',
        D: '"Reversed" implies the drainage was undone entirely, which overstates the policy\'s effect.',
      },
      teachingPoint:
        'When a passage says something was "not eliminated" but only partly changed, the target word must reflect partial reduction, not full removal.',
    },
    {
      id: 'wic-d-013',
      skillSlug: 'words-in-context',
      level: 'sat-application',
      difficulty: 'medium',
      errorCategory: 'part-of-speech-precision',
      stimulus:
        'The committee chair acted as a [MODERATOR] during the heated session, keeping each speaker to a strict time limit and steering the discussion away from personal attacks.',
      question: 'As used in the passage, the word [MODERATOR] most nearly means',
      choices: [
        { label: 'A', text: 'a person who manages and controls discussion' },
        { label: 'B', text: 'a person who presents an argument' },
        { label: 'C', text: 'a person who takes sides in a debate' },
        { label: 'D', text: 'a person who records the minutes of a meeting' },
      ],
      correctAnswer: 'A',
      explanation:
        'The chair kept speakers to time limits and steered discussion — active management and control of the session. "A person who manages and controls discussion" captures both functions the passage describes.',
      wrongAnswerExplanations: {
        B: 'Presenting an argument is a participant\'s role, not the role of the person imposing time limits and steering the group.',
        C: 'Taking sides contradicts the neutral, controlling function described; a moderator does not advocate.',
        D: 'Recording minutes is a clerical task; the chair here is actively controlling the session, not just transcribing it.',
      },
      teachingPoint:
        'When a noun describes a role, look at the actions attributed to it in the passage and match the choice that names those actions.',
    },
    {
      id: 'wic-d-014',
      skillSlug: 'words-in-context',
      level: 'foundation',
      difficulty: 'easy',
      errorCategory: 'academic-vocabulary',
      stimulus:
        'The chemical reaction was [REVERSIBLE]: when the scientists cooled the mixture back to room temperature, the two substances separated and returned to their original forms.',
      question: 'As used in the passage, the word [REVERSIBLE] most nearly means',
      choices: [
        { label: 'A', text: 'able to be undone' },
        { label: 'B', text: 'extremely fast' },
        { label: 'C', text: 'difficult to observe' },
        { label: 'D', text: 'producing heat' },
      ],
      correctAnswer: 'A',
      explanation:
        'The passage shows the reaction going backward: cooling the mixture caused the substances to separate and return to their original forms. "Able to be undone" precisely captures this ability to return to the starting state.',
      wrongAnswerExplanations: {
        B: '"Extremely fast" describes speed, but nothing in the passage comments on how quickly the reaction occurred.',
        C: '"Difficult to observe" contradicts the passage, which describes what the scientists directly observed happening.',
        D: '"Producing heat" describes one type of reaction but is not what the passage says; it describes the ability to reverse, not heat production.',
      },
      teachingPoint:
        'In science passages, the sentence after the target word often demonstrates its meaning. Use that demonstration as your definition.',
    },
    {
      id: 'wic-d-015',
      skillSlug: 'words-in-context',
      level: 'challenge',
      difficulty: 'hard',
      errorCategory: 'broader-passage-context',
      stimulus:
        'The architect\'s early sketches were straightforward, but as the project evolved, the plans became increasingly [LABYRINTHINE]. The finished building confused visitors who expected a clear path from entrance to exit; instead, corridors folded back on themselves and stairways arrived unexpectedly at dead ends.',
      question: 'As used in the passage, the word [LABYRINTHINE] most nearly means',
      choices: [
        { label: 'A', text: 'elaborate and deliberately confusing' },
        { label: 'B', text: 'large and impressive' },
        { label: 'C', text: 'carefully organized' },
        { label: 'D', text: 'symmetrical and geometric' },
      ],
      correctAnswer: 'A',
      explanation:
        'The broader context — corridors folding back, stairways leading to dead ends, visitors unable to find a clear path — shows the building\'s layout was both complex and disorienting. "Elaborate and deliberately confusing" captures both the complexity and the resulting confusion.',
      wrongAnswerExplanations: {
        B: '"Large and impressive" describes scale but says nothing about the disorienting layout that the passage emphasizes.',
        C: '"Carefully organized" is the opposite of what the passage shows; the corridors and stairways confuse rather than guide.',
        D: '"Symmetrical and geometric" implies order and predictability, whereas the passage describes unexpected dead ends and folding corridors.',
      },
      teachingPoint:
        'When the broader context describes an effect (visitors confused, corridors folding back), the target word\'s meaning must account for that effect, not just describe the object\'s appearance.',
    },
  ],
  masteryQuestions: [
    {
      id: 'wic-m-001',
      skillSlug: 'words-in-context',
      level: 'foundation',
      difficulty: 'easy',
      errorCategory: 'local-context-clue',
      stimulus:
        'The puppy was [TIMID] around strangers; it hid behind its owner\'s legs and would not take a treat from an unfamiliar hand.',
      question: 'As used in the passage, the word [TIMID] most nearly means',
      choices: [
        { label: 'A', text: 'shy' },
        { label: 'B', text: 'aggressive' },
        { label: 'C', text: 'playful' },
        { label: 'D', text: 'sleepy' },
      ],
      correctAnswer: 'A',
      explanation:
        'The puppy hid and refused a treat from strangers, showing fear and shyness. "Shy" fits this context precisely.',
      wrongAnswerExplanations: {
        B: '"Aggressive" means threatening behavior, which is the opposite of hiding and avoiding contact.',
        C: '"Playful" would suggest the puppy wanted interaction, but it avoided strangers.',
        D: '"Sleepy" describes tiredness, which is never mentioned in the passage.',
      },
      teachingPoint:
        'Behaviors like hiding and refusing contact are local clues that point to shyness.',
    },
    {
      id: 'wic-m-002',
      skillSlug: 'words-in-context',
      level: 'foundation',
      difficulty: 'easy',
      errorCategory: 'local-context-clue',
      stimulus:
        'The old bridge was declared [HAZARDOUS] after inspectors found cracked supports and a leaning guardrail. Drivers were immediately rerouted to a safer crossing.',
      question: 'As used in the passage, the word [HAZARDOUS] most nearly means',
      choices: [
        { label: 'A', text: 'crowded' },
        { label: 'B', text: 'dangerous' },
        { label: 'C', text: 'expensive' },
        { label: 'D', text: 'historic' },
      ],
      correctAnswer: 'B',
      explanation:
        'Cracked supports and a leaning guardrail caused drivers to be rerouted, showing the bridge posed a safety risk. "Dangerous" fits.',
      wrongAnswerExplanations: {
        A: '"Crowded" describes too many people, not structural defects.',
        C: '"Expensive" describes cost, which the passage never discusses.',
        D: '"Historic" describes age or significance, which is unrelated to the safety problem described.',
      },
      teachingPoint:
        'Structural defects followed by a rerouting are clear local clues that the word means dangerous.',
    },
    {
      id: 'wic-m-003',
      skillSlug: 'words-in-context',
      level: 'sat-application',
      difficulty: 'medium',
      errorCategory: 'connotation',
      stimulus:
        'The professor\'s feedback was frank but never [HARSH]. She identified every weakness in the paper, yet her phrasing always suggested a path forward rather than a verdict of failure.',
      question: 'As used in the passage, the word [HARSH] most nearly means',
      choices: [
        { label: 'A', text: 'thorough' },
        { label: 'B', text: 'cruel or hurtful' },
        { label: 'C', text: 'lengthy' },
        { label: 'D', text: 'informal' },
      ],
      correctAnswer: 'B',
      explanation:
        'The passage contrasts "frank but never" something with phrasing that "suggested a path forward." The contrast shows the professor avoided feedback that wounds or demeans, so "cruel or hurtful" fits.',
      wrongAnswerExplanations: {
        A: '"Thorough" describes completeness, but the passage emphasizes tone, not whether she covered every detail.',
        C: '"Lengthy" describes how long the feedback was, which the passage does not address.',
        D: '"Informal" describes register or style, not the emotional quality the passage contrasts with kindness.',
      },
      teachingPoint:
        'When a passage says feedback was honest "but never" something, that something names the negative emotional extreme the author avoids.',
    },
    {
      id: 'wic-m-004',
      skillSlug: 'words-in-context',
      level: 'sat-application',
      difficulty: 'medium',
      errorCategory: 'connotation',
      stimulus:
        'The historian\'s prose was [VIVID]: her descriptions of the battlefield placed the reader squarely in the smoke and noise, making abstract events feel immediate and real.',
      question: 'As used in the passage, the word [VIVID] most nearly means',
      choices: [
        { label: 'A', text: 'colorful and lifelike' },
        { label: 'B', text: 'brief and efficient' },
        { label: 'C', text: 'technically precise' },
        { label: 'D', text: 'emotionally restrained' },
      ],
      correctAnswer: 'A',
      explanation:
        'The descriptions "placed the reader squarely" in the scene and made events feel "immediate and real," showing the prose was lifelike and richly detailed. "Colorful and lifelike" fits.',
      wrongAnswerExplanations: {
        B: '"Brief and efficient" describes conciseness, but the passage emphasizes sensory richness and immediacy.',
        C: '"Technically precise" suggests scientific accuracy, not the kind of sensory immersion the passage describes.',
        D: '"Emotionally restrained" is the opposite of prose that makes readers feel present in the smoke and noise.',
      },
      teachingPoint:
        'When a passage describes writing that places readers inside an experience, "vivid" means lifelike and richly sensory.',
    },
    {
      id: 'wic-m-005',
      skillSlug: 'words-in-context',
      level: 'advanced',
      difficulty: 'hard',
      errorCategory: 'near-synonym-distinction',
      stimulus:
        'The two proposals were superficially [ANALOGOUS]: both called for a tax on fuel and both directed revenue to public transit. But they differed profoundly in scope, with one targeting only commercial vehicles and the other applying to all drivers.',
      question: 'As used in the passage, the word [ANALOGOUS] most nearly means',
      choices: [
        { label: 'A', text: 'identical in all respects' },
        { label: 'B', text: 'similar in certain features' },
        { label: 'C', text: 'opposing in purpose' },
        { label: 'D', text: 'unrelated to each other' },
      ],
      correctAnswer: 'B',
      explanation:
        'The adverb "superficially" signals the similarity is limited, and the passage immediately shows the proposals differ profoundly. "Similar in certain features" captures a partial, surface-level resemblance.',
      wrongAnswerExplanations: {
        A: '"Identical in all respects" contradicts the passage, which emphasizes the proposals\' profound differences in scope.',
        C: '"Opposing in purpose" goes too far; the passage says the proposals share structural similarities even if they differ in scope.',
        D: '"Unrelated to each other" contradicts the shared features the passage describes.',
      },
      teachingPoint:
        '"Analogous" means similar in relevant ways, not identical. The word "superficially" limits the similarity and is a key modifier to notice.',
    },
    {
      id: 'wic-m-006',
      skillSlug: 'words-in-context',
      level: 'advanced',
      difficulty: 'hard',
      errorCategory: 'near-synonym-distinction',
      stimulus:
        'Critics called the new regulations [ONEROUS], arguing that the reporting requirements demanded so much time and documentation that small businesses would struggle to comply without hiring additional staff.',
      question: 'As used in the passage, the word [ONEROUS] most nearly means',
      choices: [
        { label: 'A', text: 'burdensome' },
        { label: 'B', text: 'unfair' },
        { label: 'C', text: 'unnecessary' },
        { label: 'D', text: 'vague' },
      ],
      correctAnswer: 'A',
      explanation:
        'The critics point to the demands on time, documentation, and staffing as making compliance difficult — these are burdens. "Burdensome" precisely names the weight of these demands.',
      wrongAnswerExplanations: {
        B: '"Unfair" implies a judgment about justice, but the critics focus on the practical burden of compliance, not on whether the regulations are just.',
        C: '"Unnecessary" claims the regulations serve no purpose, but the passage does not argue that; it argues they are too demanding.',
        D: '"Vague" suggests the requirements are unclear, but the passage implies the requirements are very specific — just overwhelming.',
      },
      teachingPoint:
        '"Onerous" means burdensome in terms of effort or difficulty; it does not mean unjust or vague. Use the passage\'s evidence about time and staffing to confirm.',
    },
    {
      id: 'wic-m-007',
      skillSlug: 'words-in-context',
      level: 'challenge',
      difficulty: 'hard',
      errorCategory: 'broader-passage-context',
      stimulus:
        'Throughout the novel, the narrator presents herself as a [DISINTERESTED] observer of the family\'s conflicts, never taking sides and always reporting each person\'s grievances with equal care. Only in the final chapter does the reader discover that she is the illegitimate daughter of the household\'s patriarch, which reframes her careful neutrality as something far more complex.',
      question: 'As used in the passage, the word [DISINTERESTED] most nearly means',
      choices: [
        { label: 'A', text: 'unbiased and impartial' },
        { label: 'B', text: 'bored and inattentive' },
        { label: 'C', text: 'uninvolved with the family' },
        { label: 'D', text: 'dishonest about her motives' },
      ],
      correctAnswer: 'A',
      explanation:
        'The narrator presents herself as never taking sides and reporting all grievances "with equal care" — the hallmarks of an impartial observer. "Unbiased and impartial" captures this presented neutrality, which the final chapter reveals to be complicated but does not negate as the narrator\'s own self-presentation.',
      wrongAnswerExplanations: {
        B: '"Bored and inattentive" confuses "disinterested" with "uninterested." The narrator is highly attentive; she reports every grievance with care.',
        C: '"Uninvolved with the family" contradicts the revelation that she is the patriarch\'s daughter; she is deeply connected to the family.',
        D: '"Dishonest about her motives" may be implied by the ending, but it is not what "disinterested" means as used here; the word describes her presented stance, not her concealment.',
      },
      teachingPoint:
        '"Disinterested" means impartial, not uninterested. The common confusion between these two is itself a classic SAT trap.',
    },
    {
      id: 'wic-m-008',
      skillSlug: 'words-in-context',
      level: 'challenge',
      difficulty: 'hard',
      errorCategory: 'broader-passage-context',
      stimulus:
        'Early in the expedition, the geologist described the rock formation as [ANOMALOUS], noting that its mineral composition did not match the surrounding strata and could not be explained by the volcanic history of the region. Her team spent three days collecting samples before concluding that the formation had been carried there by an ancient glacier.',
      question: 'As used in the passage, the word [ANOMALOUS] most nearly means',
      choices: [
        { label: 'A', text: 'difficult to reach' },
        { label: 'B', text: 'deviating from what is expected or typical' },
        { label: 'C', text: 'composed of unusual minerals' },
        { label: 'D', text: 'recently formed by volcanic activity' },
      ],
      correctAnswer: 'B',
      explanation:
        'The formation did not match the surrounding strata and could not be explained by the region\'s volcanic history — it fell outside what the geological context would predict. "Deviating from what is expected or typical" captures this mismatch with the norm.',
      wrongAnswerExplanations: {
        A: '"Difficult to reach" describes accessibility; the passage never says the formation was hard to get to, and the team collected samples from it.',
        C: '"Composed of unusual minerals" is a specific detail the passage mentions, but it is the evidence for anomalousness, not the definition of the word itself.',
        D: '"Recently formed by volcanic activity" contradicts the passage, which says the volcanic history could not explain the formation.',
      },
      teachingPoint:
        'The definition of "anomalous" must be broader than any one detail. Use the full context — mineral mismatch, unexplained by local history, ultimately explained by glaciation — to confirm that the word means "departing from the expected pattern."',
    },
  ],
}
