import type { AcademySkill } from '../types'

export const transitions: AcademySkill = {
  slug: 'transitions',
  title: 'Transitions',
  section: 'writing',
  objective:
    'By the end of this lesson, you will be able to choose the transition word or phrase that accurately reflects the logical relationship between two ideas in a passage.',
  estimatedMinutes: 18,
  subskills: [
    'Contrast Transitions',
    'Cause and Effect Transitions',
    'Addition Transitions',
    'Example Transitions',
    'Concession Transitions',
    'Emphasis Transitions',
    'Sequence Transitions',
    'Near-Synonym Distinctions',
  ],
  overview: {
    whatItTests:
      'Whether a transition word or phrase correctly expresses the logical relationship between two ideas.',
    howItAppears:
      'A sentence contains a blank for a transition, and four transition words or phrases are offered as options.',
    whyStudentsMissIt:
      'Students choose a transition that sounds sophisticated rather than one that matches the actual logical relationship, and they fail to identify whether the link is contrast, addition, cause, example, or concession.',
    whatToLookFor:
      'The logical relationship between the sentence before the blank and the sentence after it: does the second idea agree with, contradict, follow from, or illustrate the first?',
  },
  strategy: {
    steps: [
      'Read both sentences — the one before the blank and the one after — carefully and completely.',
      'Determine the relationship between them: contrast, addition, cause-effect, example, concession, or sequence.',
      'Match that relationship to the correct category of transition (contrast → however; addition → furthermore; cause-effect → therefore; example → for instance; concession → granted; sequence → next).',
      'Eliminate every choice that expresses the wrong relationship, even if it "sounds" academic.',
      'Confirm the survivor by re-reading both sentences with the transition in place.',
    ],
    timeSavingTip:
      'Before looking at the choices, predict the relationship in your own words ("these ideas contrast" / "the second causes the first"). Then pick the option that matches your prediction.',
    whenNotToOverthink:
      'You never need outside knowledge for transitions — only the two sentences on the page. If the relationship is obvious, trust it and move on.',
  },
  commonTraps: [
    {
      title: 'Contrast word for continuous ideas',
      description:
        'Choosing "however" or "nevertheless" when the second idea actually continues or reinforces the first.',
      avoidance:
        'Only use a contrast transition when the second idea genuinely opposes or qualifies the first.',
      miniExample:
        'WRONG: "The harvest was plentiful. However, the farmers stored the surplus." RIGHT: "The harvest was plentiful. Additionally, the farmers stored the surplus." (Both ideas point the same direction.)',
      category: 'meaning',
    },
    {
      title: '"Therefore" with no causal link',
      description:
        'Selecting "therefore," "thus," or "as a result" when the second idea is not caused by the first.',
      avoidance:
        'Confirm that the first sentence is a genuine cause and the second is its effect before choosing a cause-effect transition.',
      miniExample:
        'WRONG: "The river runs through the valley. Therefore, the valley has rich soil." — only if the river actually caused the soil quality can "therefore" be used.',
      category: 'meaning',
    },
    {
      title: '"For example" for a consequence',
      description:
        'Using "for example" or "for instance" when the second sentence is a result or a new point rather than an illustration of the first.',
      avoidance:
        'Reserve "for example" for cases where the second sentence gives a specific instance of a general claim in the first.',
      miniExample:
        'WRONG: "The power failed. For example, the clinic had to close." RIGHT: "The power failed. As a result, the clinic had to close." (The closure is an effect, not an illustration.)',
      category: 'meaning',
    },
    {
      title: '"Additionally" masking a contradiction',
      description:
        'Choosing "additionally" or "furthermore" when the second idea actually contradicts the first.',
      avoidance:
        'If the sentences pull in opposite directions, an addition transition is wrong — use a contrast word instead.',
      miniExample:
        'WRONG: "The data supported the theory. Additionally, three key predictions failed." RIGHT: "The data supported the theory. However, three key predictions failed." (The failures contradict the support.)',
      category: 'meaning',
    },
    {
      title: 'Vague catch-all transitions',
      description:
        'Reaching for "notably" or "indeed" when a precise relationship marker (contrast, cause, example) is actually required.',
      avoidance:
        'Identify the specific relationship and use the transition that names it, not a vague intensifier.',
      miniExample:
        'WRONG: "The bridge collapsed without warning. Indeed, three trucks were crossing at the time." RIGHT: "The bridge collapsed without warning. Moreover, three trucks were crossing at the time." (Addition, not mere emphasis.)',
      category: 'meaning',
    },
    {
      title: `Confusing sequence transitions with cause-effect transitions`,
      description: `Students reach for "therefore" or "as a result" when a passage describes steps in a fixed order rather than a cause producing an effect. Sequence transitions ("next," "then," "subsequently," "afterward") mark order in time; cause-effect transitions mark a logical consequence.`,
      avoidance: `Ask: "Did sentence 1 make sentence 2 happen, or did sentence 2 simply come after sentence 1 in a process?" If sentence 2 is the next step in a procedure rather than a result, use a sequence transition, not a cause-effect one.`,
    },
  ],
  guidedExamples: [
    {
      id: 'tr-ex-1',
      level: 'foundation',
      hints: [
        'Read both sentences and decide: does the second idea support, oppose, or result from the first?',
        'The first sentence says the alloy is ideal; the second says it has a drawback. What kind of relationship is that?',
      ],
      stimulus:
        'The new alloy is remarkably lightweight, making it ideal for aircraft components. _______, its resistance to corrosion is far lower than that of traditional titanium, limiting its use in humid environments.',
      question: 'Which choice completes the text with the most logical transition?',
      steps: [
        {
          instruction: 'Summarize sentence one',
          content:
            'The first sentence praises the alloy: it is lightweight and ideal for aircraft.',
        },
        {
          instruction: 'Summarize sentence two',
          content:
            'The second sentence names a drawback: poor corrosion resistance that limits its use.',
        },
        {
          instruction: 'Name the relationship',
          content:
            'A positive followed by a negative is a contrast — the second idea qualifies the first.',
        },
        {
          instruction: 'Match the category',
          content:
            'Contrast transitions include "however," "nevertheless," and "in contrast." An addition or cause transition would be wrong.',
        },
        {
          instruction: 'Select',
          content:
            '"However" correctly signals the shift from advantage to disadvantage.',
        },
      ],
      choices: [
        { label: 'A', text: 'However' },
        { label: 'B', text: 'Therefore' },
        { label: 'C', text: 'Similarly' },
        { label: 'D', text: 'For instance' },
      ],
      correctAnswer: 'A',
      explanation:
        'The first sentence gives an advantage and the second a disadvantage, a contrast that "However" captures.',
      wrongAnswerExplanations: {
        B: '"Therefore" signals cause-effect, but the drawback is not a result of the alloy being lightweight.',
        C: '"Similarly" signals likeness, but the two sentences oppose each other.',
        D: '"For instance" signals an example, but the second sentence is a contrasting drawback, not an illustration.',
      },
      coachTakeaway:
        'Name the direction of each sentence before reading the choices: sentence 1 goes UP (positive), sentence 2 goes DOWN (negative). Any transition that means "same direction" or "cause" is automatically wrong.',
    },
    {
      id: 'tr-ex-2',
      level: 'foundation',
      hints: [
        'What happened in sentence 1? What happened in sentence 2?',
        'Did sentence 2 happen because of sentence 1, or despite it, or as an example of it?',
      ],
      stimulus:
        'Heavy rainfall saturated the hillside for three straight weeks. _______, the sodden ground gave way, sending a wall of mud across the road below.',
      question: 'Which choice completes the text with the most logical transition?',
      steps: [
        {
          instruction: 'Read sentence one',
          content:
            'Weeks of rain soaked the hillside — this is a cause.',
        },
        {
          instruction: 'Read sentence two',
          content:
            'The saturated ground collapsed into a mudslide — this is the effect.',
        },
        {
          instruction: 'Name the relationship',
          content:
            'Cause followed by effect calls for a cause-effect transition.',
        },
        {
          instruction: 'Select',
          content:
            '"As a result" (or "consequently," "therefore") correctly links the cause to its effect.',
        },
      ],
      choices: [
        { label: 'A', text: 'Nevertheless' },
        { label: 'B', text: 'As a result' },
        { label: 'C', text: 'In contrast' },
        { label: 'D', text: 'For example' },
      ],
      correctAnswer: 'B',
      explanation:
        'The rain caused the collapse, so a cause-effect transition ("As a result") is required.',
      wrongAnswerExplanations: {
        A: '"Nevertheless" signals contrast, but the collapse follows logically from the rain.',
        C: '"In contrast" signals opposition, but the sentences are a cause and its effect.',
        D: '"For example" would treat the collapse as an illustration, not as the consequence it is.',
      },
      coachTakeaway:
        'Ask: "Could I say \'because of sentence 1, sentence 2 happened\'?" If yes, use a cause-effect transition. Contrast and example transitions are traps when the second sentence is a direct consequence.',
    },
    {
      id: 'tr-ex-3',
      level: 'sat-application',
      hints: [
        'Both sentences describe benefits of the same program. Is the second benefit a contrast, a result, or simply another positive outcome?',
        'When the second idea adds to the first without changing direction, what category of transition fits?',
      ],
      stimulus:
        'The volunteer program improved literacy rates in the district. _______, it fostered lasting friendships between tutors and the families they served.',
      question: 'Which choice completes the text with the most logical transition?',
      steps: [
        {
          instruction: 'Read sentence one',
          content:
            'The program produced one benefit: higher literacy rates.',
        },
        {
          instruction: 'Read sentence two',
          content:
            'The program produced a second, related benefit: lasting friendships.',
        },
        {
          instruction: 'Name the relationship',
          content:
            'A second point in the same direction as the first is addition.',
        },
        {
          instruction: 'Select',
          content:
            '"Moreover" (or "furthermore," "in addition") adds the second benefit to the first.',
        },
      ],
      choices: [
        { label: 'A', text: 'However' },
        { label: 'B', text: 'Instead' },
        { label: 'C', text: 'Moreover' },
        { label: 'D', text: 'Otherwise' },
      ],
      correctAnswer: 'C',
      explanation:
        'Both sentences describe benefits pointing the same direction, so the addition transition "Moreover" fits.',
      wrongAnswerExplanations: {
        A: '"However" signals contrast, but both ideas are positive benefits.',
        B: '"Instead" signals replacement of one idea by another, which does not happen here.',
        D: '"Otherwise" signals an alternative or consequence of not doing something, which is illogical here.',
      },
      coachTakeaway:
        'Before choosing "however," verify the second sentence actually reverses or limits the first. If it simply piles on another point, the answer is always an addition word — "moreover," "furthermore," or "in addition."',
    },
    {
      id: 'tr-ex-4',
      level: 'sat-application',
      stimulus: `The scientists confirmed that the compound was stable at room temperature. _______, they discovered it broke down rapidly when exposed to ultraviolet light.`,
      question: 'Which choice completes the text with the most logical transition?',
      steps: [
        {
          instruction: 'Summarize sentence one',
          content: `Sentence one presents a positive finding: the compound is stable at room temperature.`,
        },
        {
          instruction: 'Summarize sentence two',
          content: `Sentence two presents a negative finding: the compound degrades under UV light.`,
        },
        {
          instruction: 'Name the relationship',
          content: `A strength followed by a limitation is a contrast — the second idea qualifies the first.`,
        },
        {
          instruction: 'Select',
          content: `"However" signals the shift from a positive result to a limiting drawback. Cause-effect and addition transitions would both be wrong.`,
        },
      ],
      choices: [
        { label: 'A', text: 'Therefore' },
        { label: 'B', text: 'Similarly' },
        { label: 'C', text: 'However' },
        { label: 'D', text: 'In addition' },
      ],
      correctAnswer: 'C',
      explanation: `The first sentence reports a strength; the second reports a limiting flaw. This contrast calls for "However."`,
      wrongAnswerExplanations: {
        A: `"Therefore" implies the UV breakdown was caused by the room-temperature stability, which is logically incorrect.`,
        B: `"Similarly" signals that the second finding matches the first in direction, but they point opposite ways.`,
        D: `"In addition" treats the UV breakdown as another positive feature, ignoring the fact that it contradicts the first result.`,
      },
      coachTakeaway: `Label each sentence's direction before reading the choices: sentence 1 is positive (stable), sentence 2 is negative (breaks down). Any transition that means "same direction" is automatically eliminated.`,
    },
    {
      id: 'tr-ex-5',
      level: 'sat-application',
      stimulus: `Biologists have long studied how social insects communicate. _______, honeybees perform elaborate waggle dances to convey the distance and direction of food sources to their hivemates.`,
      question: 'Which choice completes the text with the most logical transition?',
      steps: [
        {
          instruction: 'Identify the relationship',
          content: `Sentence one makes a general claim: biologists study how social insects communicate. Sentence two gives a specific instance: the waggle dance of honeybees.`,
        },
        {
          instruction: 'Name the category',
          content: `A specific case that illustrates a general statement calls for an example transition.`,
        },
        {
          instruction: 'Eliminate wrong categories',
          content: `The waggle dance did not cause the biologists' interest (no cause-effect), and the sentences are not contrasting (no contrast transition needed).`,
        },
        {
          instruction: 'Select',
          content: `"For instance" correctly introduces the waggle dance as a concrete illustration of insect communication.`,
        },
      ],
      choices: [
        { label: 'A', text: 'For instance' },
        { label: 'B', text: 'In contrast' },
        { label: 'C', text: 'Consequently' },
        { label: 'D', text: 'Nevertheless' },
      ],
      correctAnswer: 'A',
      explanation: `The waggle dance is a specific example of how a social insect communicates. "For instance" is the correct example transition.`,
      wrongAnswerExplanations: {
        B: `"In contrast" signals opposition, but the waggle dance supports and illustrates the general claim.`,
        C: `"Consequently" implies the waggle dance resulted from the biologists' study, which is not what the passage says.`,
        D: `"Nevertheless" signals a contrasting persistence despite something, but the two sentences are not in opposition.`,
      },
      coachTakeaway: `Ask yourself: "Is sentence 2 an instance of the category named in sentence 1?" If yes, use an example transition. The trap is a cause-effect word ("consequently") that sounds academic but misidentifies the relationship.`,
    },
    {
      id: 'tr-ex-6',
      level: 'advanced',
      stimulus: `The new traffic management software was expensive to implement. _______, city officials chose to invest in it because independent audits projected long-term savings that far exceeded the upfront costs.`,
      question: 'Which choice completes the text with the most logical transition?',
      steps: [
        {
          instruction: 'Identify sentence one',
          content: `Sentence one acknowledges a drawback: the software is expensive.`,
        },
        {
          instruction: 'Identify sentence two',
          content: `Sentence two reveals that despite the cost, officials chose to invest because the long-term savings outweigh it.`,
        },
        {
          instruction: 'Name the relationship',
          content: `Sentence one concedes a real obstacle; sentence two explains that the action was taken anyway. This is a concession-and-persistence structure.`,
        },
        {
          instruction: 'Select',
          content: `"Nonetheless" signals that the decision to invest holds despite the acknowledged expense.`,
        },
      ],
      choices: [
        { label: 'A', text: 'For example' },
        { label: 'B', text: 'As a result' },
        { label: 'C', text: 'Similarly' },
        { label: 'D', text: 'Nonetheless' },
      ],
      correctAnswer: 'D',
      explanation: `The first sentence concedes a real difficulty (high cost); the second sentence describes what happened despite it. "Nonetheless" captures the concession-persistence structure precisely.`,
      wrongAnswerExplanations: {
        A: `"For example" would treat the investment decision as an illustration of a general point, which is not what the passage is doing.`,
        B: `"As a result" implies the officials invested because of the high cost, reversing the logic of the passage.`,
        C: `"Similarly" signals that the two sentences move in the same direction, but they contrast (expensive vs. worth it).`,
      },
      coachTakeaway: `When you see a real drawback acknowledged in sentence 1 and then an action taken in sentence 2 despite that drawback, reach for "nonetheless," "nevertheless," or "even so" — not "however," which merely signals contrast without the concession nuance.`,
    },
    {
      id: 'tr-ex-7',
      level: 'advanced',
      stimulus: `Engineers had long assumed that the ancient aqueduct functioned primarily as a drinking-water supply. _______, chemical analysis of mineral deposits found inside the channel revealed that it carried water for irrigation, not human consumption.`,
      question: 'Which choice completes the text with the most logical transition?',
      steps: [
        {
          instruction: 'Identify sentence one',
          content: `Sentence one states the old assumption: the aqueduct supplied drinking water.`,
        },
        {
          instruction: 'Identify sentence two',
          content: `Sentence two reveals the actual truth: new evidence shows the aqueduct was used for irrigation, contradicting the assumption.`,
        },
        {
          instruction: 'Name the relationship',
          content: `A prior assumption being overturned by new evidence is not just contrast — it is specifically a correction of a previous belief. "In fact" is used precisely when evidence contradicts what was assumed.`,
        },
        {
          instruction: 'Select',
          content: `"In fact" introduces the corrected reality that overturns the assumption stated in sentence one.`,
        },
      ],
      choices: [
        { label: 'A', text: 'In fact' },
        { label: 'B', text: 'Furthermore' },
        { label: 'C', text: 'As a result' },
        { label: 'D', text: 'Granted' },
      ],
      correctAnswer: 'A',
      explanation: `"In fact" introduces evidence that directly contradicts and corrects a prior assumption. Here the chemical analysis overturns what engineers had long believed.`,
      wrongAnswerExplanations: {
        B: `"Furthermore" adds a new supporting point, but the second sentence contradicts the first rather than supporting it.`,
        C: `"As a result" implies the irrigation use resulted from the assumption, which makes no logical sense.`,
        D: `"Granted" concedes a point but does not introduce a correction; it acknowledges rather than contradicts.`,
      },
      coachTakeaway: `"In fact" is the transition for the "assumption vs. reality" structure: sentence 1 states what was believed, sentence 2 reveals what was actually true. It is stronger than "however" because it specifically signals that the second sentence corrects the first.`,
    },
    {
      id: 'tr-ex-8',
      level: 'challenge',
      stimulus: `Proponents of the four-day workweek cite studies showing improved employee well-being and reduced turnover. _______, critics argue that the model suits knowledge workers but is impractical for manufacturing, retail, and healthcare, where coverage cannot simply be compressed.`,
      question: 'Which choice completes the text with the most logical transition?',
      steps: [
        {
          instruction: 'Identify sentence one',
          content: `Sentence one presents the proponents' position: evidence supporting the four-day workweek.`,
        },
        {
          instruction: 'Identify sentence two',
          content: `Sentence two introduces the critics' counterpoint: the model has real-world limits in certain industries.`,
        },
        {
          instruction: 'Name the relationship',
          content: `The passage presents two opposing viewpoints. The transition needs to signal a pivot from the proponents' argument to the critics' qualification without dismissing either side.`,
        },
        {
          instruction: 'Select',
          content: `"That said" (meaning "even so" or "with that acknowledged") pivots cleanly from the proponents' evidence to the critics' rebuttal.`,
        },
      ],
      choices: [
        { label: 'A', text: 'Therefore' },
        { label: 'B', text: 'That said' },
        { label: 'C', text: 'Similarly' },
        { label: 'D', text: 'In addition' },
      ],
      correctAnswer: 'B',
      explanation: `"That said" acknowledges the proponents' evidence (sentence 1) and then pivots to the critics' counterpoint (sentence 2). It is the precise concession transition for presenting opposing viewpoints.`,
      wrongAnswerExplanations: {
        A: `"Therefore" implies the critics' objections follow logically as a consequence of the proponents' evidence, which reverses the adversarial structure.`,
        C: `"Similarly" signals that the critics agree with the proponents, but they are raising an opposing concern.`,
        D: `"In addition" treats the critics' objection as another point of support, ignoring the fact that it contradicts the proponents.`,
      },
      coachTakeaway: `When a passage moves from one viewpoint to an opposing viewpoint, "that said," "even so," or "with that in mind" signal the pivot. These transitions are distinct from "however" because they explicitly acknowledge the first viewpoint before introducing the second. Look for the two-sides structure in the passage as your cue.`,
    },
  ],
  drillQuestions: [
    {
      id: 'tr-d-001',
      skillSlug: 'transitions',
      subskill: 'contrast',
      difficulty: 'easy',
      level: 'foundation',
      errorCategory: 'wrong-direction-transition',
      stimulus:
        'The forecast promised clear skies all weekend. _______, a sudden storm rolled in on Saturday afternoon.',
      question: 'Which choice completes the text with the most logical transition?',
      choices: [
        { label: 'A', text: 'Therefore' },
        { label: 'B', text: 'However' },
        { label: 'C', text: 'Likewise' },
        { label: 'D', text: 'In addition' },
      ],
      correctAnswer: 'B',
      explanation:
        'The storm contradicts the promised clear skies, so "However" signals the contrast.',
      wrongAnswerExplanations: {
        A: '"Therefore" implies the storm resulted from the forecast, which is illogical.',
        C: '"Likewise" signals similarity, but the sentences oppose each other.',
        D: '"In addition" signals more of the same, but the storm reverses the forecast.',
      },
      teachingPoint:
        'When the second sentence overturns the first, use a contrast transition.',
    },
    {
      id: 'tr-d-002',
      skillSlug: 'transitions',
      subskill: 'addition',
      difficulty: 'easy',
      level: 'foundation',
      errorCategory: 'wrong-direction-transition',
      stimulus:
        'The new library offers thousands of e-books. _______, it provides free access to dozens of research databases.',
      question: 'Which choice completes the text with the most logical transition?',
      choices: [
        { label: 'A', text: 'Nevertheless' },
        { label: 'B', text: 'In contrast' },
        { label: 'C', text: 'Additionally' },
        { label: 'D', text: 'Otherwise' },
      ],
      correctAnswer: 'C',
      explanation:
        'The second sentence adds another resource the library offers, so "Additionally" fits.',
      wrongAnswerExplanations: {
        A: '"Nevertheless" signals contrast, but both sentences list resources.',
        B: '"In contrast" signals opposition, which does not exist here.',
        D: '"Otherwise" signals a consequence of not doing something, which is illogical.',
      },
      teachingPoint:
        'A second benefit or feature pointing the same way calls for an addition transition.',
    },
    {
      id: 'tr-d-003',
      skillSlug: 'transitions',
      subskill: 'cause-effect',
      difficulty: 'easy',
      level: 'foundation',
      errorCategory: 'cause-effect-misidentification',
      stimulus:
        'The bakery ran out of flour before noon. _______, it had to close early for the day.',
      question: 'Which choice completes the text with the most logical transition?',
      choices: [
        { label: 'A', text: 'Consequently' },
        { label: 'B', text: 'However' },
        { label: 'C', text: 'For example' },
        { label: 'D', text: 'Meanwhile' },
      ],
      correctAnswer: 'A',
      explanation:
        'Running out of flour caused the early closing, so the cause-effect transition "Consequently" is correct.',
      wrongAnswerExplanations: {
        B: '"However" signals contrast, but the closing follows from the shortage.',
        C: '"For example" signals an illustration, but the closing is a consequence.',
        D: '"Meanwhile" signals simultaneous events, not a cause and its effect.',
      },
      teachingPoint:
        'When the first sentence causes the second, use a cause-effect transition.',
    },
    {
      id: 'tr-d-004',
      skillSlug: 'transitions',
      subskill: 'contrast',
      difficulty: 'medium',
      level: 'sat-application',
      errorCategory: 'wrong-direction-transition',
      stimulus:
        'Solar panels are becoming cheaper to manufacture each year. _______, the cost of installing them on older homes remains stubbornly high.',
      question: 'Which choice completes the text with the most logical transition?',
      choices: [
        { label: 'A', text: 'Furthermore' },
        { label: 'B', text: 'Yet' },
        { label: 'C', text: 'Thus' },
        { label: 'D', text: 'Namely' },
      ],
      correctAnswer: 'B',
      explanation:
        'Falling manufacturing costs contrast with stubbornly high installation costs, so "Yet" signals the tension.',
      wrongAnswerExplanations: {
        A: '"Furthermore" signals addition, but the sentences pull in opposite directions.',
        C: '"Thus" signals cause-effect, but the high installation cost is not caused by cheaper panels.',
        D: '"Namely" introduces a clarification, not a contrasting point.',
      },
      teachingPoint:
        'A falling-versus-rising pairing is a contrast, even when both facts concern the same topic.',
    },
    {
      id: 'tr-d-005',
      skillSlug: 'transitions',
      subskill: 'addition',
      difficulty: 'medium',
      level: 'sat-application',
      errorCategory: 'wrong-direction-transition',
      stimulus:
        'The researchers documented a sharp decline in the frog population. _______, they recorded unusually high levels of pesticide in the surrounding water.',
      question: 'Which choice completes the text with the most logical transition?',
      choices: [
        { label: 'A', text: 'On the other hand' },
        { label: 'B', text: 'Furthermore' },
        { label: 'C', text: 'Instead' },
        { label: 'D', text: 'Granted' },
      ],
      correctAnswer: 'B',
      explanation:
        'The second finding adds to the first as part of the same investigation, so "Furthermore" fits.',
      wrongAnswerExplanations: {
        A: '"On the other hand" signals contrast, but both findings support the same concern.',
        C: '"Instead" signals replacement, which does not occur here.',
        D: '"Granted" signals concession, but the researchers are not conceding a point.',
      },
      teachingPoint:
        'Two supporting findings in one study join with an addition transition.',
    },
    {
      id: 'tr-d-006',
      skillSlug: 'transitions',
      subskill: 'cause-effect',
      difficulty: 'medium',
      level: 'sat-application',
      errorCategory: 'cause-effect-misidentification',
      stimulus:
        'The company automated its warehouse sorting last spring. _______, order-processing times fell by nearly forty percent.',
      question: 'Which choice completes the text with the most logical transition?',
      choices: [
        { label: 'A', text: 'Nonetheless' },
        { label: 'B', text: 'For instance' },
        { label: 'C', text: 'As a result' },
        { label: 'D', text: 'In comparison' },
      ],
      correctAnswer: 'C',
      explanation:
        'Automation caused faster processing, so the cause-effect transition "As a result" is correct.',
      wrongAnswerExplanations: {
        A: '"Nonetheless" signals contrast, but the faster times follow from automation.',
        B: '"For instance" signals an example, but the drop is an effect, not an illustration.',
        D: '"In comparison" signals a comparison, not a cause and effect.',
      },
      teachingPoint:
        'A change followed by its measurable outcome calls for a cause-effect transition.',
    },
    {
      id: 'tr-d-007',
      skillSlug: 'transitions',
      subskill: 'concession',
      difficulty: 'medium',
      level: 'sat-application',
      errorCategory: 'concession-misidentification',
      stimulus:
        'The proposal has clear economic benefits for the town. _______, some residents worry about its impact on local wildlife.',
      question: 'Which choice completes the text with the most logical transition?',
      choices: [
        { label: 'A', text: 'Admittedly' },
        { label: 'B', text: 'Therefore' },
        { label: 'C', text: 'Similarly' },
        { label: 'D', text: 'Finally' },
      ],
      correctAnswer: 'A',
      explanation:
        'The writer concedes a counterpoint (wildlife concerns) that qualifies the benefits, so "Admittedly" fits.',
      wrongAnswerExplanations: {
        B: '"Therefore" signals cause-effect, but the concern is not caused by the benefits.',
        C: '"Similarly" signals likeness, but the second idea qualifies the first.',
        D: '"Finally" signals the last item in a sequence, not a concession.',
      },
      teachingPoint:
        'Use a concession transition when the writer acknowledges a point that runs against the main claim.',
    },
    {
      id: 'tr-d-008',
      skillSlug: 'transitions',
      subskill: 'example',
      difficulty: 'hard',
      level: 'advanced',
      errorCategory: 'example-vs-effect-confusion',
      stimulus:
        'Many desert plants have evolved striking adaptations to conserve water. _______, the barrel cactus stores months of moisture in its ribbed, expandable stem.',
      question: 'Which choice completes the text with the most logical transition?',
      choices: [
        { label: 'A', text: 'However' },
        { label: 'B', text: 'For example' },
        { label: 'C', text: 'As a result' },
        { label: 'D', text: 'Conversely' },
      ],
      correctAnswer: 'B',
      explanation:
        'The barrel cactus is a specific instance of the general claim about desert-plant adaptations, so "For example" fits.',
      wrongAnswerExplanations: {
        A: '"However" signals contrast, but the cactus supports the general claim.',
        C: '"As a result" signals cause-effect, but the cactus is an illustration, not an effect.',
        D: '"Conversely" signals opposition, which does not exist between the general claim and its example.',
      },
      teachingPoint:
        'When a specific case follows a general statement, use an example transition.',
    },
    {
      id: 'tr-d-009',
      skillSlug: 'transitions',
      subskill: 'concession',
      difficulty: 'hard',
      level: 'advanced',
      errorCategory: 'concession-misidentification',
      stimulus:
        'The theory elegantly explains the movement of the visible stars. _______, it cannot account for the strange orbits astronomers have recently observed at the galaxy\'s edge.',
      question: 'Which choice completes the text with the most logical transition?',
      choices: [
        { label: 'A', text: 'Indeed' },
        { label: 'B', text: 'Still' },
        { label: 'C', text: 'Likewise' },
        { label: 'D', text: 'Accordingly' },
      ],
      correctAnswer: 'B',
      explanation:
        'The second sentence concedes a limitation that stands despite the theory\'s strengths, so "Still" fits.',
      wrongAnswerExplanations: {
        A: '"Indeed" intensifies agreement, but the second sentence raises a limitation.',
        C: '"Likewise" signals similarity, but the sentences contrast strength with weakness.',
        D: '"Accordingly" signals cause-effect, but the limitation is not a result of the theory\'s success.',
      },
      teachingPoint:
        '"Still," "nonetheless," and "even so" acknowledge a limitation that persists despite a strength.',
    },
    {
      id: 'tr-d-010',
      skillSlug: 'transitions',
      subskill: 'sequence',
      difficulty: 'hard',
      level: 'advanced',
      errorCategory: 'sequence-misidentification',
      stimulus:
        'The chef first reduces the stock until it thickens into a glaze. _______, she folds in the herbs so their aroma is not lost to the heat.',
      question: 'Which choice completes the text with the most logical transition?',
      choices: [
        { label: 'A', text: 'Instead' },
        { label: 'B', text: 'In contrast' },
        { label: 'C', text: 'Only then' },
        { label: 'D', text: 'For example' },
      ],
      correctAnswer: 'C',
      explanation:
        'The sentence describes ordered steps; "Only then" signals the next stage in the sequence after the glaze forms.',
      wrongAnswerExplanations: {
        A: '"Instead" signals replacement, but the steps happen in order, one after another.',
        B: '"In contrast" signals opposition, but the two steps are sequential, not contrasting.',
        D: '"For example" signals an illustration, but the second step is not an example of the first.',
      },
      teachingPoint:
        'When actions occur in a fixed order, use a sequence transition to mark the next step.',
    },
    {
      id: 'tr-d-011',
      skillSlug: 'transitions',
      subskill: 'near-synonym distinction',
      difficulty: 'hard',
      level: 'advanced',
      errorCategory: 'near-synonym-confusion',
      stimulus:
        'The committee acknowledged that budget constraints were real. _______, it voted to proceed with the full renovation plan rather than a scaled-back version.',
      question: 'Which choice completes the text with the most logical transition?',
      choices: [
        { label: 'A', text: 'However' },
        { label: 'B', text: 'Nevertheless' },
        { label: 'C', text: 'Consequently' },
        { label: 'D', text: 'Furthermore' },
      ],
      correctAnswer: 'B',
      explanation:
        '"Nevertheless" signals that the committee acted in spite of the acknowledged constraints — it concedes the obstacle before stating that the action proceeded anyway. "However" also signals contrast, but "nevertheless" more precisely captures the sense of acting despite a recognized difficulty.',
      wrongAnswerExplanations: {
        A: '"However" works grammatically but is less precise here: "nevertheless" specifically conveys persistence in the face of an acknowledged obstacle, which is exactly what the sentence describes.',
        C: '"Consequently" implies the committee voted to proceed because of the constraints, which inverts the logic.',
        D: '"Furthermore" signals addition, but the vote runs counter to the budget concern, not alongside it.',
      },
      teachingPoint:
        '"Nevertheless" (and "nonetheless") mean "in spite of what was just said." Use them when the writer first concedes a real difficulty, then describes an action taken anyway. "However" is more neutral and can signal any contrast.',
    },
    {
      id: 'tr-d-012',
      skillSlug: 'transitions',
      subskill: 'concession',
      difficulty: 'medium',
      level: 'sat-application',
      errorCategory: 'concession-misidentification',
      stimulus:
        'The new transit line will cut commute times significantly for workers in the eastern districts. _______ construction will disrupt surface traffic for at least eighteen months, most city planners support the project.',
      question: 'Which choice completes the text with the most logical transition?',
      choices: [
        { label: 'A', text: 'Though' },
        { label: 'B', text: 'Because' },
        { label: 'C', text: 'Moreover' },
        { label: 'D', text: 'As a result' },
      ],
      correctAnswer: 'A',
      explanation:
        '"Though" introduces a concession — the disruption is acknowledged, but support for the project persists anyway. It correctly links the two contrasting ideas within the sentence.',
      wrongAnswerExplanations: {
        B: '"Because" implies that the disruption is the reason planners support the project, which reverses the logic.',
        C: '"Moreover" signals addition, but the disruption qualifies the support rather than adding to it.',
        D: '"As a result" suggests the disruption caused the support, which is illogical.',
      },
      teachingPoint:
        '"Though," "although," and "even though" introduce a concessive clause that acknowledges a drawback before the main point. Look for the structure: [concession clause] + [main claim].',
    },
    {
      id: 'tr-d-013',
      skillSlug: 'transitions',
      subskill: 'cause-effect across paragraphs',
      difficulty: 'hard',
      level: 'advanced',
      errorCategory: 'cause-effect-misidentification',
      stimulus:
        'Decades of intensive irrigation in the valley steadily drew down the underground water table. _______, dozens of traditional hand-dug wells that had served farming communities for generations began to run dry.',
      question: 'Which choice completes the text with the most logical transition?',
      choices: [
        { label: 'A', text: 'In contrast' },
        { label: 'B', text: 'For instance' },
        { label: 'C', text: 'Over time' },
        { label: 'D', text: 'As a consequence' },
      ],
      correctAnswer: 'D',
      explanation:
        'The irrigation depleted the water table, and that depletion caused the wells to fail. "As a consequence" correctly signals this causal chain across the two sentences.',
      wrongAnswerExplanations: {
        A: '"In contrast" signals opposition, but the failing wells follow directly from the depleted water table.',
        B: '"For instance" would treat the drying wells as an illustration of a general point rather than a direct consequence of the irrigation.',
        C: '"Over time" signals that something happened gradually but does not specify a causal link, leaving the relationship between the sentences ambiguous.',
      },
      teachingPoint:
        'When sentence 2 describes a direct outcome of sentence 1, use a consequence transition ("as a consequence," "as a result," "consequently"). Distinguish from example transitions, which introduce an illustration rather than a direct outcome.',
    },
    {
      id: 'tr-d-014',
      skillSlug: 'transitions',
      subskill: 'sequence within a process',
      difficulty: 'medium',
      level: 'sat-application',
      errorCategory: 'sequence-misidentification',
      stimulus:
        'To make the dye, the weavers first grind the dried beetle shells into a fine powder. _______, they dissolve the powder in a mildly acidic solution to release its vivid crimson pigment.',
      question: 'Which choice completes the text with the most logical transition?',
      choices: [
        { label: 'A', text: 'However' },
        { label: 'B', text: 'Next' },
        { label: 'C', text: 'Therefore' },
        { label: 'D', text: 'For example' },
      ],
      correctAnswer: 'B',
      explanation:
        'The two sentences describe consecutive steps in a process. "Next" marks the second step following the first, which is exactly the sequence relationship here.',
      wrongAnswerExplanations: {
        A: '"However" signals contrast, but dissolving the powder is the step that follows grinding — not a reversal.',
        C: '"Therefore" implies the grinding caused the dissolving to happen, conflating a sequential step with a causal result.',
        D: '"For example" would suggest dissolving is an illustration of grinding, not the next step in the procedure.',
      },
      teachingPoint:
        'When a passage describes steps in order ("first...next...then...finally"), each step transition should be a sequence word. "Next" and "then" indicate the following step; "therefore" incorrectly suggests cause rather than order.',
    },
    {
      id: 'tr-d-015',
      skillSlug: 'transitions',
      subskill: 'emphasis distinction',
      difficulty: 'hard',
      level: 'challenge',
      errorCategory: 'near-synonym-confusion',
      stimulus:
        'The ceramic vessel is already remarkable for its age — nearly four thousand years old. _______, the pigments used to paint its geometric patterns have never faded, defying every expectation researchers held about ancient organic dyes.',
      question: 'Which choice completes the text with the most logical transition?',
      choices: [
        { label: 'A', text: 'Indeed' },
        { label: 'B', text: 'In fact' },
        { label: 'C', text: 'Moreover' },
        { label: 'D', text: 'Nevertheless' },
      ],
      correctAnswer: 'C',
      explanation:
        'The second sentence adds another astonishing quality (unfaded pigments) on top of the already-noted age. "Moreover" signals addition of a second impressive point. "Indeed" and "in fact" intensify or confirm what was just said rather than adding a new dimension; "nevertheless" signals concession, which is wrong here.',
      wrongAnswerExplanations: {
        A: '"Indeed" would confirm or intensify the age already mentioned, but the second sentence introduces a separate, distinct quality — the pigments — not a further confirmation of the age.',
        B: '"In fact" is used to correct a misconception or sharpen a claim, neither of which applies here; the second sentence is genuinely new information being added.',
        D: '"Nevertheless" signals that the second idea holds despite the first, implying contradiction. The unfaded pigments do not oppose the vessel\'s age; they add to its impressiveness.',
      },
      teachingPoint:
        '"Moreover" adds a new supporting point. "Indeed" and "in fact" confirm or sharpen the same point. "Nevertheless" concedes and pivots. When the second sentence brings fresh information that piles onto the first — rather than repeating or contradicting it — "moreover" (or "furthermore") is the right choice.',
    },
    {
      id: 'tr-d-016',
      skillSlug: 'transitions',
      subskill: 'contrast',
      difficulty: 'easy',
      level: 'foundation',
      stimulus: `The hiking trail was rated as beginner-friendly by the park service. _______, several sections feature steep, uneven terrain that can challenge even experienced walkers.`,
      question: 'Which choice completes the text with the most logical transition?',
      choices: [
        { label: 'A', text: 'In contrast' },
        { label: 'B', text: 'Therefore' },
        { label: 'C', text: 'Additionally' },
        { label: 'D', text: 'For instance' },
      ],
      correctAnswer: 'A',
      explanation: `The beginner-friendly rating contrasts with the challenging terrain described in sentence two. "In contrast" correctly signals this opposition.`,
      wrongAnswerExplanations: {
        B: `"Therefore" implies the challenging terrain results from the beginner-friendly rating, which is illogical.`,
        C: `"Additionally" signals another supporting feature, but the second sentence contradicts the first.`,
        D: `"For instance" would treat the steep sections as an illustration of the beginner-friendly rating, which is the opposite of what the sentence does.`,
      },
      teachingPoint: `When the second sentence directly contradicts or limits the first, use a contrast transition. "In contrast" explicitly signals that two things differ from each other.`,
    },
    {
      id: 'tr-d-017',
      skillSlug: 'transitions',
      subskill: 'cause-effect',
      difficulty: 'easy',
      level: 'foundation',
      stimulus: `A water main burst under the main street during rush hour. _______, traffic backed up for several kilometers in all directions.`,
      question: 'Which choice completes the text with the most logical transition?',
      choices: [
        { label: 'A', text: 'Nevertheless' },
        { label: 'B', text: 'In addition' },
        { label: 'C', text: 'As a result' },
        { label: 'D', text: 'For example' },
      ],
      correctAnswer: 'C',
      explanation: `The burst water main caused the traffic backup. "As a result" correctly identifies this cause-and-effect relationship.`,
      wrongAnswerExplanations: {
        A: `"Nevertheless" signals contrast, but the traffic backup follows directly from the burst pipe.`,
        B: `"In addition" signals another feature pointing in the same direction, but the backup is a consequence of the burst, not an additional independent fact.`,
        D: `"For example" would treat the backup as an illustration of a general claim, not as a consequence of the pipe burst.`,
      },
      teachingPoint: `Confirm the causal link before choosing a cause-effect transition: can you say "because sentence 1 happened, sentence 2 happened"? If yes, use "as a result," "consequently," or "therefore."`,
    },
    {
      id: 'tr-d-018',
      skillSlug: 'transitions',
      subskill: 'addition',
      difficulty: 'medium',
      level: 'sat-application',
      stimulus: `The updated smartphone model features a significantly improved battery life. _______, its camera system now supports professional-grade video recording at higher frame rates.`,
      question: 'Which choice completes the text with the most logical transition?',
      choices: [
        { label: 'A', text: 'However' },
        { label: 'B', text: 'Instead' },
        { label: 'C', text: 'In contrast' },
        { label: 'D', text: 'Furthermore' },
      ],
      correctAnswer: 'D',
      explanation: `Both sentences describe improvements to the updated phone model. The second improvement adds to the first in the same positive direction. "Furthermore" correctly signals addition of another supporting point.`,
      wrongAnswerExplanations: {
        A: `"However" signals contrast, but the camera upgrade is another benefit, not a drawback or qualification.`,
        B: `"Instead" signals replacement of one idea by another, but the camera improvement comes on top of the battery improvement, not instead of it.`,
        C: `"In contrast" signals opposition, but both sentences point in the same positive direction.`,
      },
      teachingPoint: `Two improvements or benefits moving in the same direction always call for an addition transition. Before reaching for "however," confirm the sentences actually oppose each other.`,
    },
    {
      id: 'tr-d-019',
      skillSlug: 'transitions',
      subskill: 'example',
      difficulty: 'medium',
      level: 'sat-application',
      stimulus: `Architects increasingly incorporate natural materials into modern building designs. _______, several award-winning office towers built in Scandinavia over the last decade feature load-bearing timber frames rather than steel or concrete.`,
      question: 'Which choice completes the text with the most logical transition?',
      choices: [
        { label: 'A', text: 'Nevertheless' },
        { label: 'B', text: 'As a result' },
        { label: 'C', text: 'For instance' },
        { label: 'D', text: 'On the other hand' },
      ],
      correctAnswer: 'C',
      explanation: `The Scandinavian office towers are a concrete illustration of the general trend stated in sentence one. "For instance" correctly introduces an example.`,
      wrongAnswerExplanations: {
        A: `"Nevertheless" signals contrast, but the Scandinavian example aligns with and illustrates the general trend.`,
        B: `"As a result" implies the Scandinavian towers were caused by the trend rather than being an instance of it.`,
        D: `"On the other hand" signals opposing viewpoints, but the example supports the first sentence.`,
      },
      teachingPoint: `When sentence 2 names a specific case of the general category described in sentence 1, use an example transition. The key test: "Is this a specific type of what sentence 1 described?"`,
    },
    {
      id: 'tr-d-020',
      skillSlug: 'transitions',
      subskill: 'concession',
      difficulty: 'medium',
      level: 'sat-application',
      stimulus: `The proposed merger would create significant economies of scale and give the combined company a stronger position in international markets. _______, regulators are concerned that the deal could reduce competition and harm smaller suppliers.`,
      question: 'Which choice completes the text with the most logical transition?',
      choices: [
        { label: 'A', text: 'For example' },
        { label: 'B', text: 'Consequently' },
        { label: 'C', text: 'Even so' },
        { label: 'D', text: 'Similarly' },
      ],
      correctAnswer: 'C',
      explanation: `Sentence one acknowledges genuine business advantages of the merger. Sentence two introduces a counterpoint: regulatory concern. "Even so" — a concession transition — correctly pivots from the advantages to the qualification.`,
      wrongAnswerExplanations: {
        A: `"For example" would treat the regulatory concern as an illustration of the business advantages, which is the opposite of the relationship.`,
        B: `"Consequently" implies the regulatory concern is caused by the business advantages, but the concern stands as a separate opposing viewpoint.`,
        D: `"Similarly" signals that the regulators agree with the business case, but they actually oppose it.`,
      },
      teachingPoint: `"Even so," "that said," "nonetheless," and "still" all signal concession: the first sentence offers a real point, and the second acknowledges it but introduces a qualification or objection anyway.`,
    },
    {
      id: 'tr-d-021',
      skillSlug: 'transitions',
      subskill: 'near-synonym distinction',
      difficulty: 'hard',
      level: 'advanced',
      stimulus: `The early survey data suggested that support for the referendum was lukewarm at best. _______, polling conducted just two weeks before the vote showed the measure passing by a comfortable margin.`,
      question: 'Which choice completes the text with the most logical transition?',
      choices: [
        { label: 'A', text: 'In fact' },
        { label: 'B', text: 'Moreover' },
        { label: 'C', text: 'Accordingly' },
        { label: 'D', text: 'Likewise' },
      ],
      correctAnswer: 'A',
      explanation: `Sentence one states an expectation (lukewarm support). Sentence two reveals a reality that contradicts it (comfortable margin). "In fact" is the precise transition for correcting a prior expectation with actual evidence.`,
      wrongAnswerExplanations: {
        B: `"Moreover" adds another supporting point, but the later polling does not add to the early survey — it contradicts it.`,
        C: `"Accordingly" signals that the second event follows logically from the first, but the later polling contradicts rather than follows from the early data.`,
        D: `"Likewise" signals similarity, but the two polling results point in opposite directions.`,
      },
      teachingPoint: `"In fact" is used to correct or sharply contradict an earlier assumption or expectation. Distinguish it from "moreover" (addition) and "accordingly" (logical consequence).`,
    },
    {
      id: 'tr-d-022',
      skillSlug: 'transitions',
      subskill: 'sequence',
      difficulty: 'hard',
      level: 'advanced',
      stimulus: `The conservators carefully removed the centuries of grime from the painting's surface using a controlled solvent. _______, they applied a thin layer of protective varnish to stabilize the newly revealed pigments.`,
      question: 'Which choice completes the text with the most logical transition?',
      choices: [
        { label: 'A', text: 'Nonetheless' },
        { label: 'B', text: 'As a result' },
        { label: 'C', text: 'Subsequently' },
        { label: 'D', text: 'Namely' },
      ],
      correctAnswer: 'C',
      explanation: `The two sentences describe consecutive steps in a conservation process. "Subsequently" marks the second action as occurring after the first in time — a sequence relationship, not a causal one.`,
      wrongAnswerExplanations: {
        A: `"Nonetheless" signals contrast, but the varnish application does not oppose the cleaning step.`,
        B: `"As a result" implies the varnishing was caused by the cleaning, conflating a sequential step with a causal outcome.`,
        D: `"Namely" introduces a clarification or specification, but the varnish step is the next stage in the process, not a clarification of the cleaning step.`,
      },
      teachingPoint: `Sequence transitions ("subsequently," "afterward," "next," "then") mark temporal order. Do not substitute "as a result" unless the second event genuinely would not have happened without the first.`,
    },
    {
      id: 'tr-d-023',
      skillSlug: 'transitions',
      subskill: 'near-synonym distinction',
      difficulty: 'hard',
      level: 'advanced',
      stimulus: `The documentary team spent three years filming in the Amazon rainforest. _______, they captured more than four hundred hours of footage, including rare recordings of species previously unknown to science.`,
      question: 'Which choice completes the text with the most logical transition?',
      choices: [
        { label: 'A', text: 'In that time' },
        { label: 'B', text: 'Nevertheless' },
        { label: 'C', text: 'Otherwise' },
        { label: 'D', text: 'Specifically' },
      ],
      correctAnswer: 'A',
      explanation: `Sentence two quantifies what the team accomplished during the three years mentioned in sentence one. "In that time" is the precise bridge showing that the footage was gathered within the period already specified.`,
      wrongAnswerExplanations: {
        B: `"Nevertheless" signals that the filming happened despite some obstacle, but the passage introduces no obstacle.`,
        C: `"Otherwise" signals an alternative or the consequence of not acting, neither of which applies here.`,
        D: `"Specifically" narrows to a sub-case of what was just said, but the four hundred hours is a summary of the entire period, not a specific subset.`,
      },
      teachingPoint: `When sentence two describes what happened during a time period named in sentence one, "in that time," "during this period," or "over those years" creates the most precise bridge. Resist vague or contrast transitions when a time-frame connection is implied.`,
    },
    {
      id: 'tr-d-024',
      skillSlug: 'transitions',
      subskill: 'cross-paragraph relationship',
      difficulty: 'hard',
      level: 'challenge',
      stimulus: `For decades, urban planners promoted the construction of large shopping malls as engines of suburban economic growth. _______, the rise of e-commerce and shifting consumer preferences have left many of these malls largely vacant, prompting cities to reimagine the properties as mixed-use residential and cultural spaces.`,
      question: 'Which choice completes the text with the most logical transition?',
      choices: [
        { label: 'A', text: 'Similarly' },
        { label: 'B', text: 'In addition' },
        { label: 'C', text: 'Therefore' },
        { label: 'D', text: 'Over time' },
      ],
      correctAnswer: 'D',
      explanation: `The passage describes how conditions changed across a span of decades: what planners once promoted has now fallen into vacancy. "Over time" precisely signals this gradual historical shift without overstating a causal relationship.`,
      wrongAnswerExplanations: {
        A: `"Similarly" implies the e-commerce shift mirrors the planners' original promotion, but the sentences describe opposing trends.`,
        B: `"In addition" treats the mall vacancy as another supporting feature of the planners' strategy, which contradicts the passage.`,
        C: `"Therefore" implies the planners' promotion caused the rise of e-commerce and shifting preferences, which is the wrong direction of causation.`,
      },
      teachingPoint: `"Over time" is a sequence-plus-change transition used when a passage moves from past conditions to present ones that contrast with or evolved from them. It signals historical change without asserting direct causation.`,
    },
  ],
  masteryQuestions: [
    {
      id: 'trans-m-001',
      skillSlug: 'transitions',
      subskill: 'contrast',
      difficulty: 'easy',
      level: 'foundation',
      errorCategory: 'wrong-direction-transition',
      stimulus:
        'The coastal path was officially reopened after the storm damage was repaired. _______, several sections remained muddy and difficult to walk.',
      question: 'Which choice completes the text with the most logical transition?',
      choices: [
        { label: 'A', text: 'Therefore' },
        { label: 'B', text: 'Still' },
        { label: 'C', text: 'Similarly' },
        { label: 'D', text: 'Additionally' },
      ],
      correctAnswer: 'B',
      explanation:
        '"Still" signals that the muddy sections persist despite the reopening — a contrast between the official status and the real condition.',
      wrongAnswerExplanations: {
        A: '"Therefore" implies the mud resulted from the reopening, which is illogical.',
        C: '"Similarly" signals likeness, but the second sentence limits what the first announced.',
        D: '"Additionally" would suggest the mud is another positive feature, which contradicts the context.',
      },
      teachingPoint:
        '"Still" works like "however" or "nevertheless" when the second idea qualifies or contradicts the first.',
    },
    {
      id: 'trans-m-002',
      skillSlug: 'transitions',
      subskill: 'addition',
      difficulty: 'easy',
      level: 'foundation',
      errorCategory: 'wrong-direction-transition',
      stimulus:
        'The new community garden provides fresh vegetables at no cost to local families. _______, it offers weekly workshops on sustainable growing techniques.',
      question: 'Which choice completes the text with the most logical transition?',
      choices: [
        { label: 'A', text: 'In contrast' },
        { label: 'B', text: 'However' },
        { label: 'C', text: 'In addition' },
        { label: 'D', text: 'As a result' },
      ],
      correctAnswer: 'C',
      explanation:
        'The workshops are a second benefit the garden offers — the same positive direction as the first sentence. "In addition" signals another supporting point.',
      wrongAnswerExplanations: {
        A: '"In contrast" implies the workshops oppose the free vegetables, which makes no sense.',
        B: '"However" signals contrast, but both sentences describe benefits.',
        D: '"As a result" implies the workshops happen because of the free vegetables, which is not stated.',
      },
      teachingPoint:
        'Two benefits or features moving in the same direction always call for an addition transition.',
    },
    {
      id: 'trans-m-003',
      skillSlug: 'transitions',
      subskill: 'cause-effect',
      difficulty: 'medium',
      level: 'sat-application',
      errorCategory: 'cause-effect-misidentification',
      stimulus:
        'A late frost damaged the orchard\'s blossoms in early April. _______, the apple harvest that autumn was the smallest in over a decade.',
      question: 'Which choice completes the text with the most logical transition?',
      choices: [
        { label: 'A', text: 'Nevertheless' },
        { label: 'B', text: 'Consequently' },
        { label: 'C', text: 'For instance' },
        { label: 'D', text: 'Meanwhile' },
      ],
      correctAnswer: 'B',
      explanation:
        'The frost caused the blossoms to fail, which led to the poor harvest. "Consequently" correctly links the cause (frost damage) to the effect (reduced harvest).',
      wrongAnswerExplanations: {
        A: '"Nevertheless" signals contrast, but the small harvest results from the frost rather than occurring despite it.',
        C: '"For instance" would treat the harvest as an example of a general claim, not a consequence of the frost.',
        D: '"Meanwhile" signals simultaneous events rather than a causal sequence.',
      },
      teachingPoint:
        'When you can insert "because of sentence 1, sentence 2 happened," a cause-effect transition is correct.',
    },
    {
      id: 'trans-m-004',
      skillSlug: 'transitions',
      subskill: 'example',
      difficulty: 'medium',
      level: 'sat-application',
      errorCategory: 'example-vs-effect-confusion',
      stimulus:
        'Ancient Andean engineers developed sophisticated methods for building in earthquake-prone terrain. _______, many structures at Machu Picchu were assembled with interlocking stone blocks that shift slightly during tremors and then resettle without mortar.',
      question: 'Which choice completes the text with the most logical transition?',
      choices: [
        { label: 'A', text: 'As a result' },
        { label: 'B', text: 'Nevertheless' },
        { label: 'C', text: 'For example' },
        { label: 'D', text: 'In contrast' },
      ],
      correctAnswer: 'C',
      explanation:
        'The interlocking stone technique at Machu Picchu illustrates the general claim about ancient engineering methods. "For example" introduces this specific instance.',
      wrongAnswerExplanations: {
        A: '"As a result" implies the Machu Picchu technique resulted from the sophistication, conflating illustration with effect.',
        B: '"Nevertheless" signals contrast, but the Machu Picchu example supports and illustrates the first sentence.',
        D: '"In contrast" signals opposition, but the example aligns with the general claim.',
      },
      teachingPoint:
        'Specific examples illustrate general claims — use "for example" or "for instance" when the second sentence names a concrete case.',
    },
    {
      id: 'trans-m-005',
      skillSlug: 'transitions',
      subskill: 'near-synonym distinction',
      difficulty: 'hard',
      level: 'advanced',
      errorCategory: 'near-synonym-confusion',
      stimulus:
        'Critics predicted the exhibit would draw modest interest from the local art community. _______, visitors arrived from fourteen countries within the first week of opening.',
      question: 'Which choice completes the text with the most logical transition?',
      choices: [
        { label: 'A', text: 'However' },
        { label: 'B', text: 'In fact' },
        { label: 'C', text: 'Moreover' },
        { label: 'D', text: 'Granted' },
      ],
      correctAnswer: 'B',
      explanation:
        '"In fact" sharpens and corrects the critics\' prediction by revealing the actual outcome, which exceeded expectations. It introduces a reality that overrides the earlier claim.',
      wrongAnswerExplanations: {
        A: '"However" is a broad contrast word that works but is less precise than "in fact," which specifically signals that the reality contradicts an expectation or assumption.',
        C: '"Moreover" adds a new supporting point rather than correcting a mistaken prediction.',
        D: '"Granted" concedes a point made by others, but the sentence is not conceding anything — it is correcting the critics.',
      },
      teachingPoint:
        '"In fact" is used to correct or sharply contrast an assumption or expectation with the actual truth. It is stronger and more specific than "however" in contexts where a prediction or belief is being overturned.',
    },
    {
      id: 'trans-m-006',
      skillSlug: 'transitions',
      subskill: 'near-synonym distinction',
      difficulty: 'hard',
      level: 'advanced',
      errorCategory: 'near-synonym-confusion',
      stimulus:
        'The early trials of the new pavement material showed excellent resistance to cracking. _______, long-term testing revealed that the surface became dangerously slippery when wet.',
      question: 'Which choice completes the text with the most logical transition?',
      choices: [
        { label: 'A', text: 'Accordingly' },
        { label: 'B', text: 'Furthermore' },
        { label: 'C', text: 'Nonetheless' },
        { label: 'D', text: 'In particular' },
      ],
      correctAnswer: 'C',
      explanation:
        '"Nonetheless" signals that the slippery flaw exists even though the material performed well in early trials. It correctly captures the contrast: the early success did not prevent the later problem.',
      wrongAnswerExplanations: {
        A: '"Accordingly" signals that the second event follows as a logical consequence of the first — but the slippery surface is a problem despite the early success, not because of it.',
        B: '"Furthermore" signals addition, but the wet-surface danger opposes the positive early results.',
        D: '"In particular" singles out a specific sub-case of a general point rather than contrasting it.',
      },
      teachingPoint:
        '"Nonetheless" and "nevertheless" both signal contrast following a concession. They are especially appropriate when an early success or acknowledged strength is followed by a persistent flaw or limitation.',
    },
    {
      id: 'trans-m-007',
      skillSlug: 'transitions',
      subskill: 'cross-paragraph relationship',
      difficulty: 'hard',
      level: 'challenge',
      errorCategory: 'cause-effect-misidentification',
      stimulus:
        'Nineteenth-century urban planners designed broad boulevards to allow sunlight into dense city centers and to ease the movement of goods. _______, those same wide roads later became magnets for automobile traffic, accelerating the noise and air-quality problems the planners had never foreseen.',
      question: 'Which choice completes the text with the most logical transition?',
      choices: [
        { label: 'A', text: 'For instance' },
        { label: 'B', text: 'In addition' },
        { label: 'C', text: 'Ironically' },
        { label: 'D', text: 'Therefore' },
      ],
      correctAnswer: 'C',
      explanation:
        '"Ironically" is the precise word when an outcome is the opposite of what was intended. The planners designed the roads to improve urban conditions, but those same roads caused new urban problems — a result that is directly contrary to their intention.',
      wrongAnswerExplanations: {
        A: '"For instance" would treat the automobile traffic as an example of the planners\' goals, which reverses the logic.',
        B: '"In addition" suggests the traffic problems are simply another benefit, ignoring the fact that they contradict the planning goals.',
        D: '"Therefore" implies the traffic problems resulted logically and intentionally from the boulevard design, missing the unintended nature of the outcome.',
      },
      teachingPoint:
        '"Ironically" signals an outcome that is the opposite of what was intended or expected — a specific type of contrast reserved for unintended reversals. It is more precise than "however" when the second sentence describes a twist.',
    },
    {
      id: 'trans-m-008',
      skillSlug: 'transitions',
      subskill: 'cross-paragraph relationship',
      difficulty: 'hard',
      level: 'challenge',
      errorCategory: 'concession-misidentification',
      stimulus:
        'Advocates of the reforestation program note that planting millions of trees will absorb substantial amounts of carbon dioxide over the coming decades. _______, ecologists warn that monoculture plantations — vast tracts of a single tree species — can harm native biodiversity and even increase wildfire risk.',
      question: 'Which choice completes the text with the most logical transition?',
      choices: [
        { label: 'A', text: 'Consequently' },
        { label: 'B', text: 'Similarly' },
        { label: 'C', text: 'That said' },
        { label: 'D', text: 'For example' },
      ],
      correctAnswer: 'C',
      explanation:
        '"That said" is a concession transition that acknowledges the first point (carbon absorption) while pivoting to the ecologists\' counterpoint (biodiversity harm and fire risk). It signals: "the advocates\' argument has merit, but here is an important qualification."',
      wrongAnswerExplanations: {
        A: '"Consequently" implies the biodiversity harm results from the carbon absorption, conflating a causal relationship with a contrast of viewpoints.',
        B: '"Similarly" suggests the ecologists\' warning agrees with the advocates\' position, but they express an opposing concern.',
        D: '"For example" would treat the ecologists\' warning as an illustration of the advocates\' claim, which contradicts the structure of the passage.',
      },
      teachingPoint:
        '"That said" (along with "even so," "with that in mind") is used to pivot from one viewpoint to a qualifying or opposing viewpoint, acknowledging the first before introducing the second. It is the appropriate transition when two sides of a debate are being presented.',
    },
  ],
}
