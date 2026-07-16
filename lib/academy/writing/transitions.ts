import type { AcademySkill } from '../types'

export const transitions: AcademySkill = {
  slug: 'transitions',
  title: 'Transitions',
  section: 'writing',
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
    },
    {
      title: '"Therefore" with no causal link',
      description:
        'Selecting "therefore," "thus," or "as a result" when the second idea is not caused by the first.',
      avoidance:
        'Confirm that the first sentence is a genuine cause and the second is its effect before choosing a cause-effect transition.',
    },
    {
      title: '"For example" for a consequence',
      description:
        'Using "for example" or "for instance" when the second sentence is a result or a new point rather than an illustration of the first.',
      avoidance:
        'Reserve "for example" for cases where the second sentence gives a specific instance of a general claim in the first.',
    },
    {
      title: '"Additionally" masking a contradiction',
      description:
        'Choosing "additionally" or "furthermore" when the second idea actually contradicts the first.',
      avoidance:
        'If the sentences pull in opposite directions, an addition transition is wrong — use a contrast word instead.',
    },
    {
      title: 'Vague catch-all transitions',
      description:
        'Reaching for "notably" or "indeed" when a precise relationship marker (contrast, cause, example) is actually required.',
      avoidance:
        'Identify the specific relationship and use the transition that names it, not a vague intensifier.',
    },
  ],
  guidedExamples: [
    {
      id: 'tr-ex-1',
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
    },
    {
      id: 'tr-ex-2',
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
    },
    {
      id: 'tr-ex-3',
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
    },
  ],
  drillQuestions: [
    {
      id: 'tr-d-001',
      skillSlug: 'transitions',
      subskill: 'contrast',
      difficulty: 'easy',
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
      stimulus:
        'The theory elegantly explains the movement of the visible stars. _______, it cannot account for the strange orbits astronomers have recently observed at the galaxy’s edge.',
      question: 'Which choice completes the text with the most logical transition?',
      choices: [
        { label: 'A', text: 'Indeed' },
        { label: 'B', text: 'Still' },
        { label: 'C', text: 'Likewise' },
        { label: 'D', text: 'Accordingly' },
      ],
      correctAnswer: 'B',
      explanation:
        'The second sentence concedes a limitation that stands despite the theory’s strengths, so "Still" fits.',
      wrongAnswerExplanations: {
        A: '"Indeed" intensifies agreement, but the second sentence raises a limitation.',
        C: '"Likewise" signals similarity, but the sentences contrast strength with weakness.',
        D: '"Accordingly" signals cause-effect, but the limitation is not a result of the theory’s success.',
      },
      teachingPoint:
        '"Still," "nonetheless," and "even so" acknowledge a limitation that persists despite a strength.',
    },
    {
      id: 'tr-d-010',
      skillSlug: 'transitions',
      subskill: 'sequence',
      difficulty: 'hard',
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
  ],
}
