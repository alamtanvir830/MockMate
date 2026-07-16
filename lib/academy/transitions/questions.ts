import type { TransitionCategory } from './categories'

export interface TransitionQuestion {
  id: string                    // 'tr-mod-001' through 'tr-mod-063'
  category: TransitionCategory
  difficulty: 'easy' | 'medium' | 'hard'
  stimulus: string              // two sentences; blank is start of sentence 2
  question: string              // "Which choice most logically completes the text?"
  choices: { label: 'A' | 'B' | 'C' | 'D'; text: string }[]
  correctAnswer: 'A' | 'B' | 'C' | 'D'
  explanation: string
  wrongAnswerExplanations: Partial<Record<'A' | 'B' | 'C' | 'D', string>>
  categoryExplanation: string   // 1 sentence: why this is [category]
}

const Q = 'Which choice most logically completes the text?'

export const transitionQuestions: TransitionQuestion[] = [
  // ============ ADDITION (tr-mod-001 to tr-mod-007) ============
  {
    id: 'tr-mod-001',
    category: 'addition',
    difficulty: 'easy',
    stimulus:
      'The community garden supplies fresh vegetables to more than two hundred families each summer. _______, it hosts free weekend workshops on composting and seed saving.',
    question: Q,
    choices: [
      { label: 'A', text: 'In addition' },
      { label: 'B', text: 'However' },
      { label: 'C', text: 'For example' },
      { label: 'D', text: 'Therefore' },
    ],
    correctAnswer: 'A',
    explanation:
      'Both sentences describe benefits the garden provides. The second lists a further benefit on top of the first, so an addition transition that stacks the two positive points is needed.',
    wrongAnswerExplanations: {
      B: '"However" signals opposition, but the workshops do not contradict the vegetable supply.',
      C: '"For example" would require the workshops to be an instance of supplying vegetables, which they are not.',
      D: '"Therefore" claims the workshops result from the vegetable supply, but no cause-effect link is stated.',
    },
    categoryExplanation: 'This is addition because the second sentence piles another benefit onto the first without changing direction.',
  },
  {
    id: 'tr-mod-002',
    category: 'addition',
    difficulty: 'easy',
    stimulus:
      'The new tablet weighs less than a paperback novel and slips easily into a coat pocket. _______, its battery lasts a full workday on a single charge.',
    question: Q,
    choices: [
      { label: 'A', text: 'Nevertheless' },
      { label: 'B', text: 'Moreover' },
      { label: 'C', text: 'In conclusion' },
      { label: 'D', text: 'As a result' },
    ],
    correctAnswer: 'B',
    explanation:
      'Both sentences praise the tablet, listing portability first and long battery life second. "Moreover" adds a second favorable feature to the first.',
    wrongAnswerExplanations: {
      A: '"Nevertheless" signals a reversal, but long battery life does not push against being lightweight.',
      C: '"In conclusion" would signal a wrap-up, yet the sentence introduces new information rather than summarizing.',
      D: '"As a result" would make battery life a consequence of low weight, which is not the relationship.',
    },
    categoryExplanation: 'This is addition because the second feature simply extends the list of strengths begun in the first sentence.',
  },
  {
    id: 'tr-mod-003',
    category: 'addition',
    difficulty: 'medium',
    stimulus:
      'Marine biologists found that the reef supported an unusually dense population of parrotfish. _______, the surrounding seagrass beds sheltered several species of juvenile sharks rarely observed in the region.',
    question: Q,
    choices: [
      { label: 'A', text: 'For instance' },
      { label: 'B', text: 'On the other hand' },
      { label: 'C', text: 'Additionally' },
      { label: 'D', text: 'Consequently' },
    ],
    correctAnswer: 'C',
    explanation:
      'The passage catalogs the biodiversity of the area: first the parrotfish, then the juvenile sharks. "Additionally" adds a second finding to the first.',
    wrongAnswerExplanations: {
      A: '"For instance" would make the sharks an example of the parrotfish claim, but they are a separate finding.',
      B: '"On the other hand" signals contrast, yet both observations reinforce the same point about biodiversity.',
      D: '"Consequently" claims the sharks resulted from the parrotfish, a cause-effect link the text does not support.',
    },
    categoryExplanation: 'This is addition because a second independent observation is layered onto the first to build the same point.',
  },
  {
    id: 'tr-mod-004',
    category: 'addition',
    difficulty: 'medium',
    stimulus:
      'The museum\'s renovation added three new galleries devoted to contemporary photography. _______, curators installed an interactive studio where visitors can experiment with darkroom techniques.',
    question: Q,
    choices: [
      { label: 'A', text: 'Furthermore' },
      { label: 'B', text: 'In contrast' },
      { label: 'C', text: 'To clarify' },
      { label: 'D', text: 'Hence' },
    ],
    correctAnswer: 'A',
    explanation:
      'Both sentences describe additions made during the renovation. "Furthermore" introduces the interactive studio as one more upgrade alongside the new galleries.',
    wrongAnswerExplanations: {
      B: '"In contrast" would set the studio against the galleries, but both are complementary additions.',
      C: '"To clarify" would restate the first sentence, yet the studio is new information, not a restatement.',
      D: '"Hence" would make the studio a consequence of the galleries, which is not implied.',
    },
    categoryExplanation: 'This is addition because the studio is another renovation feature added to the galleries already mentioned.',
  },
  {
    id: 'tr-mod-005',
    category: 'addition',
    difficulty: 'medium',
    stimulus:
      'Economists noted that the region\'s exports of processed timber grew by nearly a fifth last year. _______, its shipments of specialty paper reached a record volume over the same period.',
    question: Q,
    choices: [
      { label: 'A', text: 'Nonetheless' },
      { label: 'B', text: 'Besides' },
      { label: 'C', text: 'In short' },
      { label: 'D', text: 'For this reason' },
    ],
    correctAnswer: 'B',
    explanation:
      'Both sentences report growth in the region\'s exports. "Besides" adds the paper figure to the timber figure as parallel evidence of an expanding sector.',
    wrongAnswerExplanations: {
      A: '"Nonetheless" implies the second fact conflicts with the first, but both show export growth.',
      C: '"In short" signals a summary, yet the sentence adds a new statistic rather than condensing prior ones.',
      D: '"For this reason" claims paper shipments resulted from timber exports, which the text does not establish.',
    },
    categoryExplanation: 'This is addition because a parallel export statistic is added to strengthen the same claim of growth.',
  },
  {
    id: 'tr-mod-006',
    category: 'addition',
    difficulty: 'hard',
    stimulus:
      'The eighteenth-century essayist was celebrated for prose that balanced wit against moral seriousness, a rare pairing in the periodicals of her day. _______, she edited two influential journals whose circulation reshaped the reading habits of an emerging middle class.',
    question: Q,
    choices: [
      { label: 'A', text: 'Even so' },
      { label: 'B', text: 'Namely' },
      { label: 'C', text: 'Moreover' },
      { label: 'D', text: 'Thus' },
    ],
    correctAnswer: 'C',
    explanation:
      'The first sentence praises her prose; the second praises her editorial influence. "Moreover" adds a second distinct achievement to build a fuller portrait of her importance.',
    wrongAnswerExplanations: {
      A: '"Even so" signals concession or reversal, but her editing does not counter her reputation as a stylist.',
      B: '"Namely" would specify or rename the first claim, yet editing journals is a separate accomplishment, not a specification of her prose.',
      D: '"Thus" would make the editorial career a consequence of her prose, which the text does not argue.',
    },
    categoryExplanation: 'This is addition because a second, independent accomplishment is stacked onto the first to enlarge the case for her significance.',
  },
  {
    id: 'tr-mod-007',
    category: 'addition',
    difficulty: 'hard',
    stimulus:
      'The proposed transit plan would extend light rail service to three underserved suburbs within the decade. _______, it earmarks funding for protected bicycle corridors linking those suburbs to the regional trail network.',
    question: Q,
    choices: [
      { label: 'A', text: 'By contrast' },
      { label: 'B', text: 'Additionally' },
      { label: 'C', text: 'In other words' },
      { label: 'D', text: 'Accordingly' },
    ],
    correctAnswer: 'B',
    explanation:
      'The plan\'s two provisions, rail extension and bicycle corridors, both expand transportation access. "Additionally" presents the second provision as a further element of the same plan.',
    wrongAnswerExplanations: {
      A: '"By contrast" would oppose the two provisions, but they work toward the same goal of expanded mobility.',
      C: '"In other words" would restate the first provision, yet bicycle corridors are a new commitment, not a paraphrase.',
      D: '"Accordingly" would make the corridors a consequence of the rail plan, which is not the stated relationship.',
    },
    categoryExplanation: 'This is addition because the second provision is presented as another component of the plan rather than a result or restatement of the first.',
  },

  // ============ CONTRAST (tr-mod-008 to tr-mod-014) ============
  {
    id: 'tr-mod-008',
    category: 'contrast',
    difficulty: 'easy',
    stimulus:
      'Forecasters had predicted a mild, dry autumn across the valley. _______, the region saw its heaviest rainfall in a decade by mid-October.',
    question: Q,
    choices: [
      { label: 'A', text: 'Likewise' },
      { label: 'B', text: 'However' },
      { label: 'C', text: 'For instance' },
      { label: 'D', text: 'Therefore' },
    ],
    correctAnswer: 'B',
    explanation:
      'The forecast predicted dry weather, but the actual weather was extremely wet. "However" marks the sharp reversal between prediction and outcome.',
    wrongAnswerExplanations: {
      A: '"Likewise" signals similarity, but the outcome was the opposite of the forecast.',
      C: '"For instance" would make the rainfall an example of a mild autumn, which is contradictory.',
      D: '"Therefore" would make the rain a consequence of the forecast, but a forecast cannot cause weather.',
    },
    categoryExplanation: 'This is contrast because the actual rainfall directly opposes the dry weather that was predicted.',
  },
  {
    id: 'tr-mod-009',
    category: 'contrast',
    difficulty: 'easy',
    stimulus:
      'Critics expected the sequel to disappoint after such a beloved first film. _______, audiences left theaters praising it as the stronger of the two.',
    question: Q,
    choices: [
      { label: 'A', text: 'In fact' },
      { label: 'B', text: 'Furthermore' },
      { label: 'C', text: 'Yet' },
      { label: 'D', text: 'Subsequently' },
    ],
    correctAnswer: 'C',
    explanation:
      'The critics expected disappointment, but audiences found the sequel superior. "Yet" captures the clash between the low expectation and the positive reception.',
    wrongAnswerExplanations: {
      A: '"In fact" would emphasize or confirm the expectation of disappointment, but the outcome overturns it.',
      B: '"Furthermore" would add a supporting point, yet the second sentence reverses the first rather than reinforcing it.',
      D: '"Subsequently" signals time order, but the point is the contradiction, not the sequence of events.',
    },
    categoryExplanation: 'This is contrast because the favorable reception runs directly against the predicted disappointment.',
  },
  {
    id: 'tr-mod-010',
    category: 'contrast',
    difficulty: 'medium',
    stimulus:
      'Solar panels installed a decade ago typically converted less than fifteen percent of sunlight into usable electricity. _______, several panels now entering the market exceed twenty-two percent efficiency.',
    question: Q,
    choices: [
      { label: 'A', text: 'In contrast' },
      { label: 'B', text: 'Similarly' },
      { label: 'C', text: 'For example' },
      { label: 'D', text: 'As a result' },
    ],
    correctAnswer: 'A',
    explanation:
      'The sentence sets older, less efficient panels against newer, more efficient ones. "In contrast" highlights the difference between the two generations of technology.',
    wrongAnswerExplanations: {
      B: '"Similarly" signals likeness, but the two figures differ sharply.',
      C: '"For example" would make the new panels an instance of the old ones, which is illogical.',
      D: '"As a result" would make new efficiency a consequence of old inefficiency, which is not the relationship.',
    },
    categoryExplanation: 'This is contrast because it juxtaposes the low efficiency of old panels against the high efficiency of new ones.',
  },
  {
    id: 'tr-mod-011',
    category: 'contrast',
    difficulty: 'medium',
    stimulus:
      'Many assume that dense city centers are the loudest places a person can live. _______, some rural highways generate noise levels that rival a crowded downtown intersection at rush hour.',
    question: Q,
    choices: [
      { label: 'A', text: 'Indeed' },
      { label: 'B', text: 'On the other hand' },
      { label: 'C', text: 'In addition' },
      { label: 'D', text: 'Consequently' },
    ],
    correctAnswer: 'B',
    explanation:
      'The assumption is that cities are loudest, but rural highways can be just as loud. "On the other hand" introduces the counterexample that pushes against the common belief.',
    wrongAnswerExplanations: {
      A: '"Indeed" would confirm the assumption, but the second sentence challenges it.',
      C: '"In addition" would simply add a point, yet the sentence works to undercut, not extend, the first idea.',
      D: '"Consequently" would make rural noise a result of urban noise, which is not stated.',
    },
    categoryExplanation: 'This is contrast because the rural-highway data opposes the assumption that cities are the loudest places.',
  },
  {
    id: 'tr-mod-012',
    category: 'contrast',
    difficulty: 'medium',
    stimulus:
      'The startup\'s founders projected that the app would need at least three years to turn a profit. _______, it reached the break-even point within eleven months of its launch.',
    question: Q,
    choices: [
      { label: 'A', text: 'Nevertheless' },
      { label: 'B', text: 'Therefore' },
      { label: 'C', text: 'To illustrate' },
      { label: 'D', text: 'Meanwhile' },
    ],
    correctAnswer: 'A',
    explanation:
      'The founders predicted a slow three-year path to profit, but the app broke even far sooner. "Nevertheless" marks the gap between the cautious forecast and the swift result.',
    wrongAnswerExplanations: {
      B: '"Therefore" would present the early profit as a consequence of the projection, but a projection does not cause a result.',
      C: '"To illustrate" would make the eleven-month figure an example of the projection, which contradicts it.',
      D: '"Meanwhile" signals two things happening at once, but the sentence contrasts a forecast with an outcome.',
    },
    categoryExplanation: 'This is contrast because the rapid break-even directly opposes the slow timeline the founders had projected.',
  },
  {
    id: 'tr-mod-013',
    category: 'contrast',
    difficulty: 'hard',
    stimulus:
      'Traditional accounts credit a single inventor with the sewing machine, portraying its design as the flash of one mind. _______, patent records reveal a tangle of competing claims, each builder refining a rival\'s neglected mechanism.',
    question: Q,
    choices: [
      { label: 'A', text: 'Accordingly' },
      { label: 'B', text: 'Conversely' },
      { label: 'C', text: 'Above all' },
      { label: 'D', text: 'In particular' },
    ],
    correctAnswer: 'B',
    explanation:
      'The traditional single-inventor story is set against the messy, collaborative picture in the patent records. "Conversely" signals that the evidence reverses the tidy account.',
    wrongAnswerExplanations: {
      A: '"Accordingly" would present the patent tangle as a consequence of the traditional account, but it undercuts that account instead.',
      C: '"Above all" emphasizes a most-important point, yet the second sentence opposes rather than intensifies the first.',
      D: '"In particular" would make the patent records a specific case of the single-inventor claim, which contradicts them.',
    },
    categoryExplanation: 'This is contrast because the patent evidence directly opposes the single-inventor narrative the passage first describes.',
  },
  {
    id: 'tr-mod-014',
    category: 'contrast',
    difficulty: 'hard',
    stimulus:
      'The novelist\'s early reviewers dismissed her fragmented chapters as the mark of an undisciplined talent. _______, later scholars have argued that this very fragmentation anticipates the structural experiments of the modernist writers who followed.',
    question: Q,
    choices: [
      { label: 'A', text: 'By contrast' },
      { label: 'B', text: 'Likewise' },
      { label: 'C', text: 'For this reason' },
      { label: 'D', text: 'Finally' },
    ],
    correctAnswer: 'A',
    explanation:
      'Early reviewers saw the fragmentation as a flaw; later scholars see it as a visionary strength. "By contrast" marks the reversal between these two verdicts.',
    wrongAnswerExplanations: {
      B: '"Likewise" signals agreement, but the two groups reach opposite judgments.',
      C: '"For this reason" would make the scholars\' praise a consequence of the dismissal, which is not the logic.',
      D: '"Finally" signals the last item in a sequence, but the sentence opposes two views rather than ordering steps.',
    },
    categoryExplanation: 'This is contrast because the scholars\' reappraisal directly opposes the early reviewers\' dismissal.',
  },

  // ============ CAUSE & EFFECT (tr-mod-015 to tr-mod-021) ============
  {
    id: 'tr-mod-015',
    category: 'cause-effect',
    difficulty: 'easy',
    stimulus:
      'A late frost destroyed most of the region\'s apple blossoms in early spring. _______, orchards produced only a third of their usual harvest that autumn.',
    question: Q,
    choices: [
      { label: 'A', text: 'As a result' },
      { label: 'B', text: 'However' },
      { label: 'C', text: 'For example' },
      { label: 'D', text: 'In addition' },
    ],
    correctAnswer: 'A',
    explanation:
      'The frost is the cause and the reduced harvest is the effect. "As a result" links the ruined blossoms directly to the small crop.',
    wrongAnswerExplanations: {
      B: '"However" signals contrast, but the small harvest follows logically from the frost rather than opposing it.',
      C: '"For example" would make the poor harvest an instance of the frost, but it is a consequence.',
      D: '"In addition" would simply add a fact, missing the clear causal chain.',
    },
    categoryExplanation: 'This is cause-effect because the frost directly produced the reduced harvest.',
  },
  {
    id: 'tr-mod-016',
    category: 'cause-effect',
    difficulty: 'easy',
    stimulus:
      'The bridge was closed for emergency repairs on the busiest commuting route into the city. _______, drivers faced delays of up to an hour on nearby streets.',
    question: Q,
    choices: [
      { label: 'A', text: 'Nonetheless' },
      { label: 'B', text: 'Consequently' },
      { label: 'C', text: 'Namely' },
      { label: 'D', text: 'Meanwhile' },
    ],
    correctAnswer: 'B',
    explanation:
      'Closing the main bridge caused traffic to overwhelm nearby streets. "Consequently" ties the closure to the resulting delays.',
    wrongAnswerExplanations: {
      A: '"Nonetheless" signals a reversal, but the delays follow directly from the closure.',
      C: '"Namely" would specify the closure, yet the delays are an outcome, not a specification.',
      D: '"Meanwhile" signals simultaneous events, but the sentence expresses a cause leading to an effect.',
    },
    categoryExplanation: 'This is cause-effect because the bridge closure directly caused the commuter delays.',
  },
  {
    id: 'tr-mod-017',
    category: 'cause-effect',
    difficulty: 'medium',
    stimulus:
      'Researchers introduced a native predatory beetle to control the invasive aphids overrunning the wheat fields. _______, aphid populations fell to manageable levels within two growing seasons.',
    question: Q,
    choices: [
      { label: 'A', text: 'In contrast' },
      { label: 'B', text: 'Thus' },
      { label: 'C', text: 'To clarify' },
      { label: 'D', text: 'Besides' },
    ],
    correctAnswer: 'B',
    explanation:
      'Introducing the predator is the cause; the drop in aphids is the effect. "Thus" signals that the decline resulted from the beetle\'s introduction.',
    wrongAnswerExplanations: {
      A: '"In contrast" signals opposition, but the aphid decline is exactly what the intervention aimed to cause.',
      C: '"To clarify" would restate the first sentence, yet the decline is a new outcome, not a restatement.',
      D: '"Besides" adds a separate point, missing the causal link between predator and result.',
    },
    categoryExplanation: 'This is cause-effect because releasing the predatory beetle brought about the fall in aphid numbers.',
  },
  {
    id: 'tr-mod-018',
    category: 'cause-effect',
    difficulty: 'medium',
    stimulus:
      'The city doubled the frequency of buses along its most crowded corridor and lowered fares during off-peak hours. _______, weekday ridership climbed by nearly a third over the following year.',
    question: Q,
    choices: [
      { label: 'A', text: 'For instance' },
      { label: 'B', text: 'Even so' },
      { label: 'C', text: 'As a result' },
      { label: 'D', text: 'In other words' },
    ],
    correctAnswer: 'C',
    explanation:
      'More frequent buses and cheaper fares caused ridership to rise. "As a result" connects the service changes to the increase in riders.',
    wrongAnswerExplanations: {
      A: '"For instance" would make the ridership gain an example of the service changes, but it is their effect.',
      B: '"Even so" signals a concession, but the rise in ridership follows naturally from the improvements.',
      D: '"In other words" would restate the first sentence, yet the ridership figure is a new outcome.',
    },
    categoryExplanation: 'This is cause-effect because the improved service and lower fares produced the surge in ridership.',
  },
  {
    id: 'tr-mod-019',
    category: 'cause-effect',
    difficulty: 'medium',
    stimulus:
      'The publisher moved its entire catalog behind a paid subscription and removed free article previews. _______, casual visitors who once browsed the site daily drifted away within weeks.',
    question: Q,
    choices: [
      { label: 'A', text: 'Hence' },
      { label: 'B', text: 'Similarly' },
      { label: 'C', text: 'Granted' },
      { label: 'D', text: 'Next' },
    ],
    correctAnswer: 'A',
    explanation:
      'Removing free access is the cause; the loss of casual visitors is the effect. "Hence" shows the audience drop followed from the paywall decision.',
    wrongAnswerExplanations: {
      B: '"Similarly" signals likeness, but the two sentences describe a cause and its result, not parallel facts.',
      C: '"Granted" signals concession, yet the second sentence is an outcome, not an admitted counterpoint.',
      D: '"Next" signals mere sequence, missing the causal force of the paywall on the audience.',
    },
    categoryExplanation: 'This is cause-effect because the paywall directly caused casual visitors to leave.',
  },
  {
    id: 'tr-mod-020',
    category: 'cause-effect',
    difficulty: 'hard',
    stimulus:
      'A prolonged drought thinned the grasslands that migrating herds depend on during their northward passage. _______, predators that once ambushed the herds along the river crossings scattered in search of scarcer prey.',
    question: Q,
    choices: [
      { label: 'A', text: 'Admittedly' },
      { label: 'B', text: 'Consequently' },
      { label: 'C', text: 'In summary' },
      { label: 'D', text: 'Initially' },
    ],
    correctAnswer: 'B',
    explanation:
      'The drought thinned the grasslands, which drove the herds and in turn the predators to disperse. "Consequently" traces the chain from failing grasslands to scattered predators.',
    wrongAnswerExplanations: {
      A: '"Admittedly" signals a concession, but the predators\' dispersal is a downstream effect, not a conceded point.',
      C: '"In summary" would signal a wrap-up, yet the sentence advances a new consequence rather than summarizing.',
      D: '"Initially" signals the first step in a sequence, but the emphasis is on causation, not chronology.',
    },
    categoryExplanation: 'This is cause-effect because the drought-driven loss of grassland caused the predators to scatter.',
  },
  {
    id: 'tr-mod-021',
    category: 'cause-effect',
    difficulty: 'hard',
    stimulus:
      'The central bank raised interest rates sharply to cool an overheating housing market. _______, mortgage applications fell to their lowest level in a generation as would-be buyers postponed their purchases.',
    question: Q,
    choices: [
      { label: 'A', text: 'By contrast' },
      { label: 'B', text: 'For this reason' },
      { label: 'C', text: 'To put it differently' },
      { label: 'D', text: 'Furthermore' },
    ],
    correctAnswer: 'B',
    explanation:
      'The rate hike is the cause and the collapse in mortgage applications is the effect. "For this reason" links the higher rates to the retreat of buyers.',
    wrongAnswerExplanations: {
      A: '"By contrast" signals opposition, but the drop in applications is exactly what the rate hike was meant to trigger.',
      C: '"To put it differently" would restate the first sentence, yet the second reports a distinct outcome.',
      D: '"Furthermore" would add a parallel point, missing the direct causal relationship between rates and applications.',
    },
    categoryExplanation: 'This is cause-effect because the interest-rate increase caused mortgage applications to plummet.',
  },

  // ============ EXAMPLE (tr-mod-022 to tr-mod-028) ============
  {
    id: 'tr-mod-022',
    category: 'example',
    difficulty: 'easy',
    stimulus:
      'Several everyday plants can thrive with very little water. _______, the snake plant survives for weeks between waterings and tolerates deep shade.',
    question: Q,
    choices: [
      { label: 'A', text: 'For example' },
      { label: 'B', text: 'However' },
      { label: 'C', text: 'Therefore' },
      { label: 'D', text: 'In conclusion' },
    ],
    correctAnswer: 'A',
    explanation:
      'The first sentence makes a general claim about drought-tolerant plants; the second names the snake plant as a specific case. "For example" introduces that illustration.',
    wrongAnswerExplanations: {
      B: '"However" signals contrast, but the snake plant supports rather than opposes the general claim.',
      C: '"Therefore" would make the snake plant a consequence of the claim, but it is an illustration.',
      D: '"In conclusion" would signal a summary, yet the sentence provides a specific instance.',
    },
    categoryExplanation: 'This is example because the snake plant is a specific instance of the general claim about hardy plants.',
  },
  {
    id: 'tr-mod-023',
    category: 'example',
    difficulty: 'easy',
    stimulus:
      'Some birds are remarkable mimics of sounds they hear in their environment. _______, the lyrebird can reproduce camera shutters, chainsaws, and the calls of a dozen other species.',
    question: Q,
    choices: [
      { label: 'A', text: 'Nevertheless' },
      { label: 'B', text: 'For instance' },
      { label: 'C', text: 'As a result' },
      { label: 'D', text: 'Moreover' },
    ],
    correctAnswer: 'B',
    explanation:
      'The general point is that some birds are excellent mimics; the lyrebird is offered as a concrete case. "For instance" introduces that example.',
    wrongAnswerExplanations: {
      A: '"Nevertheless" signals contrast, but the lyrebird confirms the mimicry claim.',
      C: '"As a result" would make the lyrebird a consequence of the claim, not an illustration of it.',
      D: '"Moreover" would add a new point, but the second sentence exemplifies the first rather than extending it.',
    },
    categoryExplanation: 'This is example because the lyrebird is a specific instance of birds that mimic sounds.',
  },
  {
    id: 'tr-mod-024',
    category: 'example',
    difficulty: 'medium',
    stimulus:
      'Ancient engineers devised ingenious ways to move water across long distances without pumps. _______, Roman aqueducts used a gentle, continuous downward slope to carry water dozens of miles by gravity alone.',
    question: Q,
    choices: [
      { label: 'A', text: 'In contrast' },
      { label: 'B', text: 'Specifically' },
      { label: 'C', text: 'Consequently' },
      { label: 'D', text: 'Likewise' },
    ],
    correctAnswer: 'B',
    explanation:
      'The first sentence states a general point about ancient water engineering; the second gives the Roman aqueduct as a detailed instance. "Specifically" narrows from the general claim to the example.',
    wrongAnswerExplanations: {
      A: '"In contrast" signals opposition, but the aqueduct illustrates rather than contradicts the claim.',
      C: '"Consequently" would make the aqueduct a consequence of the claim, not an example.',
      D: '"Likewise" signals a second parallel case, but only one general claim and one example are present.',
    },
    categoryExplanation: 'This is example because the Roman aqueduct is a specific illustration of ingenious ancient water engineering.',
  },
  {
    id: 'tr-mod-025',
    category: 'example',
    difficulty: 'medium',
    stimulus:
      'Certain materials change their properties dramatically when cooled to extreme temperatures. _______, some metals lose all electrical resistance and conduct current without any energy loss near absolute zero.',
    question: Q,
    choices: [
      { label: 'A', text: 'To illustrate' },
      { label: 'B', text: 'Nonetheless' },
      { label: 'C', text: 'In addition' },
      { label: 'D', text: 'Hence' },
    ],
    correctAnswer: 'A',
    explanation:
      'The general claim is that materials change at extreme cold; superconducting metals are the illustrating case. "To illustrate" introduces the specific example.',
    wrongAnswerExplanations: {
      B: '"Nonetheless" signals contrast, but the metals demonstrate the claim rather than opposing it.',
      C: '"In addition" would add a separate fact, yet the second sentence is an example of the first.',
      D: '"Hence" would make superconductivity a consequence of the general claim, not an illustration of it.',
    },
    categoryExplanation: 'This is example because zero-resistance metals are a concrete instance of materials changing under extreme cold.',
  },
  {
    id: 'tr-mod-026',
    category: 'example',
    difficulty: 'medium',
    stimulus:
      'Folk traditions often encode practical knowledge about the local environment. _______, coastal communities in the region timed their fishing by a rhyme that tracked the tides across the lunar month.',
    question: Q,
    choices: [
      { label: 'A', text: 'By contrast' },
      { label: 'B', text: 'Therefore' },
      { label: 'C', text: 'For example' },
      { label: 'D', text: 'Finally' },
    ],
    correctAnswer: 'C',
    explanation:
      'The general idea is that folklore stores practical knowledge; the tide rhyme is a concrete case. "For example" introduces that instance.',
    wrongAnswerExplanations: {
      A: '"By contrast" signals opposition, but the rhyme supports the general claim.',
      B: '"Therefore" would make the rhyme a consequence, but it is an illustration of the claim.',
      D: '"Finally" signals the last step in a sequence, but the sentence gives an example, not an ordered step.',
    },
    categoryExplanation: 'This is example because the tide rhyme is a specific instance of folklore encoding practical knowledge.',
  },
  {
    id: 'tr-mod-027',
    category: 'example',
    difficulty: 'hard',
    stimulus:
      'The composer built entire movements from tiny rhythmic cells that recur and transform across a symphony. _______, the four-note motif opening his best-known work reappears in more than a dozen guises before the finale.',
    question: Q,
    choices: [
      { label: 'A', text: 'In particular' },
      { label: 'B', text: 'On the other hand' },
      { label: 'C', text: 'As a result' },
      { label: 'D', text: 'Overall' },
    ],
    correctAnswer: 'A',
    explanation:
      'The first sentence describes his general technique; the second points to the famous four-note motif as a precise example. "In particular" narrows from the method to the specific case.',
    wrongAnswerExplanations: {
      B: '"On the other hand" signals contrast, but the motif demonstrates the technique rather than opposing it.',
      C: '"As a result" would make the motif a consequence of the technique, not an instance of it.',
      D: '"Overall" signals a summary, yet the sentence zooms in on a single example instead of wrapping up.',
    },
    categoryExplanation: 'This is example because the four-note motif is a specific instance of the composer\'s cell-based technique.',
  },
  {
    id: 'tr-mod-028',
    category: 'example',
    difficulty: 'hard',
    stimulus:
      'Legal reformers of the era often disguised radical proposals in the cautious language of precedent. _______, one jurist argued for sweeping property rights for women while insisting he merely clarified statutes that had stood for centuries.',
    question: Q,
    choices: [
      { label: 'A', text: 'Nevertheless' },
      { label: 'B', text: 'To illustrate' },
      { label: 'C', text: 'Consequently' },
      { label: 'D', text: 'In brief' },
    ],
    correctAnswer: 'B',
    explanation:
      'The general observation is that reformers cloaked radical ideas in conservative language; the jurist is a specific case. "To illustrate" introduces that example.',
    wrongAnswerExplanations: {
      A: '"Nevertheless" signals contrast, but the jurist exemplifies the pattern rather than defying it.',
      C: '"Consequently" would make the jurist a consequence of the general claim, not an illustration.',
      D: '"In brief" signals a summary, yet the sentence supplies a detailed example instead of condensing.',
    },
    categoryExplanation: 'This is example because the jurist is a specific instance of reformers hiding radical aims in cautious language.',
  },

  // ============ CONCESSION (tr-mod-029 to tr-mod-035) ============
  {
    id: 'tr-mod-029',
    category: 'concession',
    difficulty: 'easy',
    stimulus:
      'The recipe calls for imported saffron, which can be expensive and hard to find. _______ the spice is costly, a single pinch flavors an entire pot, so a small jar lasts for years.',
    question: Q,
    choices: [
      { label: 'A', text: 'Although' },
      { label: 'B', text: 'Because' },
      { label: 'C', text: 'Since' },
      { label: 'D', text: 'Once' },
    ],
    correctAnswer: 'A',
    explanation:
      'The writer admits the saffron is expensive but argues it is still worthwhile because a little goes far. "Although" concedes the cost before making the stronger point.',
    wrongAnswerExplanations: {
      B: '"Because" would make the cost the reason a jar lasts for years, but cost is not the cause of longevity.',
      C: '"Since" also asserts causation, yet the sentence admits a drawback rather than explaining a cause.',
      D: '"Once" signals time order, but the relationship is a conceded point, not a sequence.',
    },
    categoryExplanation: 'This is concession because the writer grants the saffron\'s expense before arguing it is still worth buying.',
  },
  {
    id: 'tr-mod-030',
    category: 'concession',
    difficulty: 'easy',
    stimulus:
      'The old theater\'s seats are cramped and its lobby is showing its age. _______ these shortcomings, the acoustics remain the finest of any hall in the city.',
    question: Q,
    choices: [
      { label: 'A', text: 'Because of' },
      { label: 'B', text: 'Despite' },
      { label: 'C', text: 'As a result of' },
      { label: 'D', text: 'In addition to' },
    ],
    correctAnswer: 'B',
    explanation:
      'The writer acknowledges the theater\'s flaws but maintains that its acoustics are unmatched. "Despite" concedes the drawbacks before asserting the strength.',
    wrongAnswerExplanations: {
      A: '"Because of" would make the flaws the cause of the great acoustics, which is illogical.',
      C: '"As a result of" also asserts causation, but the acoustics are not caused by the shortcomings.',
      D: '"In addition to" would treat the acoustics as another flaw, but they are a redeeming strength.',
    },
    categoryExplanation: 'This is concession because the writer grants the theater\'s flaws before affirming its superior acoustics.',
  },
  {
    id: 'tr-mod-031',
    category: 'concession',
    difficulty: 'medium',
    stimulus:
      'The electric ferry costs far more to build than a conventional diesel vessel. _______ the higher upfront price, its minimal fuel and maintenance costs make it cheaper to operate over two decades of service.',
    question: Q,
    choices: [
      { label: 'A', text: 'Thanks to' },
      { label: 'B', text: 'Owing to' },
      { label: 'C', text: 'Notwithstanding' },
      { label: 'D', text: 'Given' },
    ],
    correctAnswer: 'C',
    explanation:
      'The writer admits the ferry costs more to build but argues it is cheaper over its lifetime. "Notwithstanding" concedes the high price before the stronger claim.',
    wrongAnswerExplanations: {
      A: '"Thanks to" credits the high price for the savings, but the savings come despite it, not because of it.',
      B: '"Owing to" asserts causation, yet the upfront cost does not cause the long-run savings.',
      D: '"Given" would treat the high price as a reason supporting the conclusion, but it works against it.',
    },
    categoryExplanation: 'This is concession because the writer grants the ferry\'s high build cost before arguing it is cheaper overall.',
  },
  {
    id: 'tr-mod-032',
    category: 'concession',
    difficulty: 'medium',
    stimulus:
      '_______ the survey drew responses from only a few hundred participants, its findings closely matched those of far larger national studies conducted the same year.',
    question: Q,
    choices: [
      { label: 'A', text: 'Even though' },
      { label: 'B', text: 'So that' },
      { label: 'C', text: 'As soon as' },
      { label: 'D', text: 'In order that' },
    ],
    correctAnswer: 'A',
    explanation:
      'The writer concedes the small sample size but stresses that the results still aligned with major studies. "Even though" admits the limitation before the reassuring point.',
    wrongAnswerExplanations: {
      B: '"So that" signals purpose, but the small sample was not designed to match the larger studies.',
      C: '"As soon as" signals time order, yet the relationship is a conceded limitation, not a sequence.',
      D: '"In order that" signals purpose, but the sentence admits a weakness rather than stating an aim.',
    },
    categoryExplanation: 'This is concession because the writer grants the small sample size before affirming the survey\'s reliable findings.',
  },
  {
    id: 'tr-mod-033',
    category: 'concession',
    difficulty: 'medium',
    stimulus:
      'The young pianist had far less formal training than her celebrated rivals. _______, she interpreted the difficult sonata with a maturity that stunned the competition judges.',
    question: Q,
    choices: [
      { label: 'A', text: 'For instance' },
      { label: 'B', text: 'Admittedly' },
      { label: 'C', text: 'Still' },
      { label: 'D', text: 'Therefore' },
    ],
    correctAnswer: 'C',
    explanation:
      'The sentence acknowledges her limited training yet emphasizes her remarkable performance. "Still" concedes the disadvantage while affirming she excelled anyway.',
    wrongAnswerExplanations: {
      A: '"For instance" would make her performance an example of limited training, which is contradictory.',
      B: '"Admittedly" would concede the performance itself, but the performance is the strong point, not the conceded one.',
      D: '"Therefore" would make her skill a consequence of little training, which reverses the logic.',
    },
    categoryExplanation: 'This is concession because the writer grants her limited training before affirming her exceptional performance.',
  },
  {
    id: 'tr-mod-034',
    category: 'concession',
    difficulty: 'hard',
    stimulus:
      'Critics rightly note that the biography glosses over the diplomat\'s most controversial negotiations. _______ that omission, the book remains the most thorough account we have of his early career and private correspondence.',
    question: Q,
    choices: [
      { label: 'A', text: 'Because of' },
      { label: 'B', text: 'For all' },
      { label: 'C', text: 'By means of' },
      { label: 'D', text: 'In light of' },
    ],
    correctAnswer: 'B',
    explanation:
      'The writer concedes the biography\'s gap but insists it is still the best available account. "For all" acknowledges the flaw before maintaining the favorable judgment.',
    wrongAnswerExplanations: {
      A: '"Because of" would credit the omission for the book\'s thoroughness, which is illogical.',
      C: '"By means of" signals a method, but the omission is not a tool used to achieve thoroughness.',
      D: '"In light of" would make the omission a reason supporting the praise, but it works against it.',
    },
    categoryExplanation: 'This is concession because the writer grants the biography\'s omission before affirming its overall value.',
  },
  {
    id: 'tr-mod-035',
    category: 'concession',
    difficulty: 'hard',
    stimulus:
      'The expedition\'s maps of the coastline were riddled with errors born of primitive instruments and bad weather. _______, they guided the next generation of navigators safely through waters no European vessel had charted before.',
    question: Q,
    choices: [
      { label: 'A', text: 'Consequently' },
      { label: 'B', text: 'Granted, they were flawed, and yet' },
      { label: 'C', text: 'For that reason' },
      { label: 'D', text: 'Similarly' },
    ],
    correctAnswer: 'B',
    explanation:
      'The writer openly admits the maps were flawed but argues they were nonetheless invaluable to later navigators. The "granted... and yet" construction concedes the flaw before pivoting to the stronger claim.',
    wrongAnswerExplanations: {
      A: '"Consequently" would make the maps\' usefulness a result of their errors, which is contradictory.',
      C: '"For that reason" also treats the errors as the cause of the maps\' value, reversing the logic.',
      D: '"Similarly" signals likeness, but the sentence pivots from a weakness to a strength rather than drawing a parallel.',
    },
    categoryExplanation: 'This is concession because the writer grants the maps\' errors before arguing they still guided later navigators.',
  },

  // ============ SEQUENCE (tr-mod-036 to tr-mod-042) ============
  {
    id: 'tr-mod-036',
    category: 'sequence',
    difficulty: 'easy',
    stimulus:
      'To develop the film, the technician immersed the exposed roll in a chemical bath for several minutes. _______, she rinsed it thoroughly and hung it to dry in a darkened room.',
    question: Q,
    choices: [
      { label: 'A', text: 'Next' },
      { label: 'B', text: 'However' },
      { label: 'C', text: 'For example' },
      { label: 'D', text: 'In contrast' },
    ],
    correctAnswer: 'A',
    explanation:
      'The passage describes steps in a process performed in order: first the chemical bath, then the rinse. "Next" marks the following step in the procedure.',
    wrongAnswerExplanations: {
      B: '"However" signals contrast, but the rinse follows the bath rather than opposing it.',
      C: '"For example" would make rinsing an instance of the bath, but it is a later step.',
      D: '"In contrast" would set the steps against each other, yet they are consecutive parts of one process.',
    },
    categoryExplanation: 'This is sequence because rinsing is the next step after the chemical bath in a time-ordered process.',
  },
  {
    id: 'tr-mod-037',
    category: 'sequence',
    difficulty: 'easy',
    stimulus:
      'The volunteers first cleared the trail of fallen branches and loose stones. _______, they laid fresh gravel and marked the route with painted blazes.',
    question: Q,
    choices: [
      { label: 'A', text: 'Nevertheless' },
      { label: 'B', text: 'Afterward' },
      { label: 'C', text: 'That is' },
      { label: 'D', text: 'Therefore' },
    ],
    correctAnswer: 'B',
    explanation:
      'The sentence lists tasks completed in order: clearing the trail first, then laying gravel. "Afterward" signals the later stage of the work.',
    wrongAnswerExplanations: {
      A: '"Nevertheless" signals contrast, but the gravel work follows the clearing rather than opposing it.',
      C: '"That is" would restate the clearing, yet laying gravel is a new step.',
      D: '"Therefore" would make the gravel a consequence, but the sentence tracks the order of tasks.',
    },
    categoryExplanation: 'This is sequence because laying gravel happens after clearing the trail in a time-ordered set of steps.',
  },
  {
    id: 'tr-mod-038',
    category: 'sequence',
    difficulty: 'medium',
    stimulus:
      'A butterfly\'s life begins when the female deposits her eggs on a host plant chosen for the larvae. _______, the emerging caterpillars feed almost continuously, molting several times as they grow.',
    question: Q,
    choices: [
      { label: 'A', text: 'In summary' },
      { label: 'B', text: 'Subsequently' },
      { label: 'C', text: 'On the contrary' },
      { label: 'D', text: 'For instance' },
    ],
    correctAnswer: 'B',
    explanation:
      'The passage traces the stages of a life cycle in order: egg-laying first, then the feeding caterpillar stage. "Subsequently" marks the next phase in time.',
    wrongAnswerExplanations: {
      A: '"In summary" signals a wrap-up, but the sentence advances to a new stage rather than summarizing.',
      C: '"On the contrary" signals contradiction, yet the caterpillar stage follows the egg stage naturally.',
      D: '"For instance" would make the caterpillar stage an example of egg-laying, which is illogical.',
    },
    categoryExplanation: 'This is sequence because the caterpillar stage comes after egg-laying in the ordered life cycle.',
  },
  {
    id: 'tr-mod-039',
    category: 'sequence',
    difficulty: 'medium',
    stimulus:
      'Once the negotiators had agreed on the broad terms of the treaty, each delegation returned home to consult its government. _______, the parties reconvened to sign the final document before an assembly of witnesses.',
    question: Q,
    choices: [
      { label: 'A', text: 'Namely' },
      { label: 'B', text: 'By contrast' },
      { label: 'C', text: 'Finally' },
      { label: 'D', text: 'Furthermore' },
    ],
    correctAnswer: 'C',
    explanation:
      'The passage narrates events in order: agreeing on terms, consulting governments, and at last signing. "Finally" marks the concluding step in the sequence.',
    wrongAnswerExplanations: {
      A: '"Namely" would specify the earlier step, but the signing is a later event, not a specification.',
      B: '"By contrast" signals opposition, yet the signing continues the process rather than opposing it.',
      D: '"Furthermore" would add a parallel point, but the sentence marks the last stage of an ordered sequence.',
    },
    categoryExplanation: 'This is sequence because the signing is the final step in the time-ordered progress of the negotiations.',
  },
  {
    id: 'tr-mod-040',
    category: 'sequence',
    difficulty: 'medium',
    stimulus:
      'The bakery\'s bread begins with a slow overnight rise that develops the dough\'s flavor. _______, the loaves are shaped by hand and left to proof once more before baking.',
    question: Q,
    choices: [
      { label: 'A', text: 'Then' },
      { label: 'B', text: 'However' },
      { label: 'C', text: 'In fact' },
      { label: 'D', text: 'As a result' },
    ],
    correctAnswer: 'A',
    explanation:
      'The passage describes the bread-making steps in order: the overnight rise, then shaping and a second proof. "Then" marks the next stage in the procedure.',
    wrongAnswerExplanations: {
      B: '"However" signals contrast, but shaping follows the rise rather than opposing it.',
      C: '"In fact" would emphasize the first step, yet the sentence advances to a new step.',
      D: '"As a result" would frame shaping as a consequence of the rise, but the point is the order of steps.',
    },
    categoryExplanation: 'This is sequence because shaping the loaves is the next step after the overnight rise in an ordered process.',
  },
  {
    id: 'tr-mod-041',
    category: 'sequence',
    difficulty: 'hard',
    stimulus:
      'When a distant star exhausts the hydrogen at its core, it swells into a red giant that engulfs its innermost planets. _______, the exhausted core collapses and sheds its outer layers, leaving behind a slowly cooling ember of a star.',
    question: Q,
    choices: [
      { label: 'A', text: 'Eventually' },
      { label: 'B', text: 'On the other hand' },
      { label: 'C', text: 'For example' },
      { label: 'D', text: 'In other words' },
    ],
    correctAnswer: 'A',
    explanation:
      'The passage narrates a star\'s stages in temporal order: first the red-giant phase, then the later collapse. "Eventually" marks the subsequent stage in this progression.',
    wrongAnswerExplanations: {
      B: '"On the other hand" signals contrast, but the collapse follows the red-giant phase in sequence.',
      C: '"For example" would make the collapse an instance of the red-giant phase, which is illogical.',
      D: '"In other words" would restate the red-giant phase, yet the collapse is a distinct later stage.',
    },
    categoryExplanation: 'This is sequence because the core collapse is a later stage that follows the red-giant phase in the star\'s life.',
  },
  {
    id: 'tr-mod-042',
    category: 'sequence',
    difficulty: 'hard',
    stimulus:
      'Archaeologists first map a site with ground-penetrating radar to locate buried structures without disturbing the soil. _______, they open narrow test trenches to confirm the readings before committing to a full excavation.',
    question: Q,
    choices: [
      { label: 'A', text: 'Nevertheless' },
      { label: 'B', text: 'Only then' },
      { label: 'C', text: 'To clarify' },
      { label: 'D', text: 'Indeed' },
    ],
    correctAnswer: 'B',
    explanation:
      'The passage lays out the method in order: radar mapping first, then test trenches. "Only then" marks the step that follows once the mapping is done.',
    wrongAnswerExplanations: {
      A: '"Nevertheless" signals contrast, but the trenching follows the mapping rather than opposing it.',
      C: '"To clarify" would restate the mapping step, yet trenching is a distinct later action.',
      D: '"Indeed" would emphasize the mapping, but the sentence advances to the next procedural step.',
    },
    categoryExplanation: 'This is sequence because opening test trenches is the next step after radar mapping in the excavation procedure.',
  },

  // ============ CLARIFICATION (tr-mod-043 to tr-mod-049) ============
  {
    id: 'tr-mod-043',
    category: 'clarification',
    difficulty: 'easy',
    stimulus:
      'The museum is open to the public on a pay-what-you-wish basis. _______, visitors decide for themselves how much, if anything, to contribute at the door.',
    question: Q,
    choices: [
      { label: 'A', text: 'In other words' },
      { label: 'B', text: 'However' },
      { label: 'C', text: 'Therefore' },
      { label: 'D', text: 'Meanwhile' },
    ],
    correctAnswer: 'A',
    explanation:
      'The second sentence restates the pay-what-you-wish policy in plainer, more concrete terms. "In other words" signals that it re-explains the same idea.',
    wrongAnswerExplanations: {
      B: '"However" signals contrast, but the second sentence agrees with and clarifies the first.',
      C: '"Therefore" would make the explanation a consequence, but it merely restates the policy.',
      D: '"Meanwhile" signals simultaneous events, yet both sentences describe the same policy.',
    },
    categoryExplanation: 'This is clarification because the second sentence restates the pay-what-you-wish policy more plainly.',
  },
  {
    id: 'tr-mod-044',
    category: 'clarification',
    difficulty: 'easy',
    stimulus:
      'The device operates entirely off the grid. _______, it draws all its power from a small built-in solar panel and needs no wall outlet.',
    question: Q,
    choices: [
      { label: 'A', text: 'Nevertheless' },
      { label: 'B', text: 'That is' },
      { label: 'C', text: 'For this reason' },
      { label: 'D', text: 'First' },
    ],
    correctAnswer: 'B',
    explanation:
      'The second sentence explains what "off the grid" means in practical detail. "That is" signals a restatement that clarifies the first sentence.',
    wrongAnswerExplanations: {
      A: '"Nevertheless" signals contrast, but the second sentence supports and explains the first.',
      C: '"For this reason" would make the solar detail a consequence, yet it defines the first claim.',
      D: '"First" signals a step in a sequence, but the sentence restates rather than begins a process.',
    },
    categoryExplanation: 'This is clarification because the second sentence explains precisely what operating off the grid means.',
  },
  {
    id: 'tr-mod-045',
    category: 'clarification',
    difficulty: 'medium',
    stimulus:
      'The new policy applies only to full-time employees hired after the merger. _______, workers who joined before the two companies combined are exempt from its provisions.',
    question: Q,
    choices: [
      { label: 'A', text: 'In particular' },
      { label: 'B', text: 'Otherwise' },
      { label: 'C', text: 'To put it differently' },
      { label: 'D', text: 'Consequently' },
    ],
    correctAnswer: 'C',
    explanation:
      'The second sentence recasts the eligibility rule from the opposite angle, spelling out who is exempt. "To put it differently" signals a clarifying restatement.',
    wrongAnswerExplanations: {
      A: '"In particular" would introduce a specific example, but the sentence rephrases the whole rule.',
      B: '"Otherwise" signals an alternative condition, yet both sentences describe the same rule.',
      D: '"Consequently" would make the exemption a consequence, but it simply restates the policy\'s scope.',
    },
    categoryExplanation: 'This is clarification because the second sentence re-expresses the eligibility rule in clearer terms.',
  },
  {
    id: 'tr-mod-046',
    category: 'clarification',
    difficulty: 'medium',
    stimulus:
      'The forest is managed on a principle of selective harvesting. _______, foresters remove only a small fraction of mature trees each year while leaving the canopy largely intact.',
    question: Q,
    choices: [
      { label: 'A', text: 'More specifically' },
      { label: 'B', text: 'On the other hand' },
      { label: 'C', text: 'As a result' },
      { label: 'D', text: 'Likewise' },
    ],
    correctAnswer: 'A',
    explanation:
      'The second sentence defines the vague phrase "selective harvesting" in concrete terms. "More specifically" signals a clarifying restatement that sharpens the first idea.',
    wrongAnswerExplanations: {
      B: '"On the other hand" signals contrast, but the second sentence explains rather than opposes the first.',
      C: '"As a result" would make the detail a consequence, yet it defines the harvesting principle.',
      D: '"Likewise" signals a parallel, but the sentences describe the same practice, not two similar ones.',
    },
    categoryExplanation: 'This is clarification because the second sentence spells out precisely what selective harvesting involves.',
  },
  {
    id: 'tr-mod-047',
    category: 'clarification',
    difficulty: 'medium',
    stimulus:
      'The composer wrote the piece in a strict palindromic form. _______, the second half of the score is the first half played in reverse, note for note.',
    question: Q,
    choices: [
      { label: 'A', text: 'Nonetheless' },
      { label: 'B', text: 'To clarify' },
      { label: 'C', text: 'Therefore' },
      { label: 'D', text: 'Besides' },
    ],
    correctAnswer: 'B',
    explanation:
      'The second sentence explains what "palindromic form" means so a reader can picture it. "To clarify" signals that it re-explains the technical term.',
    wrongAnswerExplanations: {
      A: '"Nonetheless" signals contrast, but the second sentence agrees with and defines the first.',
      C: '"Therefore" would make the explanation a consequence, yet it restates the meaning of the form.',
      D: '"Besides" would add a separate point, but the sentence clarifies rather than adds.',
    },
    categoryExplanation: 'This is clarification because the second sentence explains what the palindromic form means in concrete detail.',
  },
  {
    id: 'tr-mod-048',
    category: 'clarification',
    difficulty: 'hard',
    stimulus:
      'The philosopher argued that moral duties are agent-relative rather than universal. _______, an obligation that binds one person in a given situation need not bind another standing in different relations to the same event.',
    question: Q,
    choices: [
      { label: 'A', text: 'By contrast' },
      { label: 'B', text: 'That is to say' },
      { label: 'C', text: 'Hence' },
      { label: 'D', text: 'For example' },
    ],
    correctAnswer: 'B',
    explanation:
      'The second sentence unpacks the abstract phrase "agent-relative" into an accessible explanation. "That is to say" signals a clarifying restatement of the claim.',
    wrongAnswerExplanations: {
      A: '"By contrast" signals opposition, but the second sentence explains rather than opposes the first.',
      C: '"Hence" would make the explanation a consequence, yet it merely restates what agent-relative means.',
      D: '"For example" would offer a specific case, but the sentence gives a general definition, not an instance.',
    },
    categoryExplanation: 'This is clarification because the second sentence restates the abstract claim about agent-relative duties in plainer terms.',
  },
  {
    id: 'tr-mod-049',
    category: 'clarification',
    difficulty: 'hard',
    stimulus:
      'The economists described the market as informationally efficient. _______, prices already reflect all publicly available data, so no ordinary trader can consistently beat the average by studying the news.',
    question: Q,
    choices: [
      { label: 'A', text: 'In other words' },
      { label: 'B', text: 'Even so' },
      { label: 'C', text: 'Finally' },
      { label: 'D', text: 'Moreover' },
    ],
    correctAnswer: 'A',
    explanation:
      'The second sentence translates the technical term "informationally efficient" into a plain account of what it implies. "In other words" signals a clarifying restatement.',
    wrongAnswerExplanations: {
      B: '"Even so" signals concession or contrast, but the second sentence agrees with and explains the first.',
      C: '"Finally" signals the last step of a sequence, yet the sentence restates a definition.',
      D: '"Moreover" would add a new point, but the second sentence re-explains rather than extends the first.',
    },
    categoryExplanation: 'This is clarification because the second sentence restates what an informationally efficient market means in everyday language.',
  },

  // ============ EMPHASIS (tr-mod-050 to tr-mod-056) ============
  {
    id: 'tr-mod-050',
    category: 'emphasis',
    difficulty: 'easy',
    stimulus:
      'The volunteers cleaned up the entire riverbank in a single weekend. _______, they hauled away nearly two tons of debris in just two days.',
    question: Q,
    choices: [
      { label: 'A', text: 'In fact' },
      { label: 'B', text: 'However' },
      { label: 'C', text: 'Nevertheless' },
      { label: 'D', text: 'For example' },
    ],
    correctAnswer: 'A',
    explanation:
      'The second sentence drives home just how much the volunteers accomplished, stressing the scale with a striking figure. "In fact" intensifies and confirms the first claim.',
    wrongAnswerExplanations: {
      B: '"However" signals contrast, but the second sentence reinforces rather than opposes the first.',
      C: '"Nevertheless" also signals reversal, yet the debris figure strengthens the point.',
      D: '"For example" would offer a mere illustration, but the sentence heightens the impact of the claim.',
    },
    categoryExplanation: 'This is emphasis because the second sentence stresses how impressive the cleanup was with a striking detail.',
  },
  {
    id: 'tr-mod-051',
    category: 'emphasis',
    difficulty: 'easy',
    stimulus:
      'The bridge was built to withstand powerful earthquakes. _______, engineers designed it to survive a tremor stronger than any recorded in the region\'s history.',
    question: Q,
    choices: [
      { label: 'A', text: 'On the other hand' },
      { label: 'B', text: 'Indeed' },
      { label: 'C', text: 'In conclusion' },
      { label: 'D', text: 'Meanwhile' },
    ],
    correctAnswer: 'B',
    explanation:
      'The second sentence underscores just how earthquake-resistant the bridge is, raising the stakes of the first claim. "Indeed" confirms and intensifies the point.',
    wrongAnswerExplanations: {
      A: '"On the other hand" signals contrast, but the sentence reinforces the first idea.',
      C: '"In conclusion" signals a wrap-up, yet the sentence stresses a point rather than summarizing.',
      D: '"Meanwhile" signals simultaneous events, but the second sentence emphasizes the first.',
    },
    categoryExplanation: 'This is emphasis because the second sentence stresses the extreme degree of the bridge\'s earthquake resistance.',
  },
  {
    id: 'tr-mod-052',
    category: 'emphasis',
    difficulty: 'medium',
    stimulus:
      'The vaccine proved effective across every age group in the trial. _______, it prevented severe illness in more than ninety-five percent of the oldest participants, the group most at risk.',
    question: Q,
    choices: [
      { label: 'A', text: 'Notably' },
      { label: 'B', text: 'In contrast' },
      { label: 'C', text: 'Otherwise' },
      { label: 'D', text: 'Subsequently' },
    ],
    correctAnswer: 'A',
    explanation:
      'The second sentence highlights an especially impressive result within the general finding. "Notably" draws attention to this striking detail and stresses its importance.',
    wrongAnswerExplanations: {
      B: '"In contrast" signals opposition, but the elderly result reinforces the overall effectiveness.',
      C: '"Otherwise" signals an alternative, yet the sentence emphasizes rather than presents a different case.',
      D: '"Subsequently" signals time order, but the point is the significance of the finding, not its timing.',
    },
    categoryExplanation: 'This is emphasis because the second sentence spotlights an especially important, striking result.',
  },
  {
    id: 'tr-mod-053',
    category: 'emphasis',
    difficulty: 'medium',
    stimulus:
      'The ancient library held one of the largest book collections of its age. _______, it may have housed several hundred thousand scrolls at the height of its influence.',
    question: Q,
    choices: [
      { label: 'A', text: 'By contrast' },
      { label: 'B', text: 'In fact' },
      { label: 'C', text: 'To clarify' },
      { label: 'D', text: 'Next' },
    ],
    correctAnswer: 'B',
    explanation:
      'The second sentence intensifies the claim about the library\'s size by supplying a staggering figure. "In fact" confirms and heightens the point.',
    wrongAnswerExplanations: {
      A: '"By contrast" signals opposition, but the figure reinforces the claim about the library\'s size.',
      C: '"To clarify" would simply restate the first sentence, yet this sentence amplifies it with a dramatic number.',
      D: '"Next" signals a step in a sequence, but the sentence stresses a point rather than ordering events.',
    },
    categoryExplanation: 'This is emphasis because the second sentence stresses the library\'s scale with an arresting figure.',
  },
  {
    id: 'tr-mod-054',
    category: 'emphasis',
    difficulty: 'medium',
    stimulus:
      'The coach credited the team\'s discipline for its championship run. _______, she insisted that their willingness to practice long after others had gone home mattered more than raw talent.',
    question: Q,
    choices: [
      { label: 'A', text: 'Above all' },
      { label: 'B', text: 'However' },
      { label: 'C', text: 'For instance' },
      { label: 'D', text: 'As a result' },
    ],
    correctAnswer: 'A',
    explanation:
      'The second sentence singles out discipline as the most important factor of all. "Above all" stresses that this quality outweighs everything else.',
    wrongAnswerExplanations: {
      B: '"However" signals contrast, but the second sentence reinforces the emphasis on discipline.',
      C: '"For instance" would offer an example, yet the sentence ranks discipline as supremely important.',
      D: '"As a result" would make the discipline claim a consequence, but it heightens the first point.',
    },
    categoryExplanation: 'This is emphasis because the second sentence stresses discipline as the single most important factor.',
  },
  {
    id: 'tr-mod-055',
    category: 'emphasis',
    difficulty: 'hard',
    stimulus:
      'The manuscript\'s marginal notes offer historians a rare glimpse into how medieval readers reacted to the text. _______, a single scribbled objection beside one passage overturned a century of assumptions about the poem\'s intended audience.',
    question: Q,
    choices: [
      { label: 'A', text: 'Similarly' },
      { label: 'B', text: 'Significantly' },
      { label: 'C', text: 'In summary' },
      { label: 'D', text: 'Meanwhile' },
    ],
    correctAnswer: 'B',
    explanation:
      'The second sentence stresses how consequential one marginal note proved to be, underscoring its importance. "Significantly" flags the striking weight of the detail.',
    wrongAnswerExplanations: {
      A: '"Similarly" signals a parallel, but the sentence heightens the point rather than drawing a comparison.',
      C: '"In summary" signals a wrap-up, yet the sentence emphasizes a dramatic detail rather than summarizing.',
      D: '"Meanwhile" signals simultaneous events, but the second sentence stresses the first claim\'s importance.',
    },
    categoryExplanation: 'This is emphasis because the second sentence stresses how momentous a single marginal note turned out to be.',
  },
  {
    id: 'tr-mod-056',
    category: 'emphasis',
    difficulty: 'hard',
    stimulus:
      'The reform expanded access to clean drinking water across the province\'s remote districts. _______, it cut rates of waterborne illness among children so sharply that neighboring provinces rushed to copy the program.',
    question: Q,
    choices: [
      { label: 'A', text: 'Crucially' },
      { label: 'B', text: 'On the contrary' },
      { label: 'C', text: 'That is' },
      { label: 'D', text: 'Afterward' },
    ],
    correctAnswer: 'A',
    explanation:
      'The second sentence highlights the reform\'s most important outcome, stressing its dramatic effect on children\'s health. "Crucially" flags this as the vital point.',
    wrongAnswerExplanations: {
      B: '"On the contrary" signals contradiction, but the health outcome reinforces the reform\'s success.',
      C: '"That is" would restate the first sentence, yet this sentence amplifies it with a new, striking result.',
      D: '"Afterward" signals mere time order, but the sentence stresses importance, not chronology.',
    },
    categoryExplanation: 'This is emphasis because the second sentence stresses the reform\'s most important and striking result.',
  },

  // ============ SUMMARY (tr-mod-057 to tr-mod-063) ============
  {
    id: 'tr-mod-057',
    category: 'summary',
    difficulty: 'easy',
    stimulus:
      'The trip was over budget, the weather was miserable, and half the group fell ill by the third day. _______, the vacation was one everyone was glad to see end.',
    question: Q,
    choices: [
      { label: 'A', text: 'In short' },
      { label: 'B', text: 'However' },
      { label: 'C', text: 'For example' },
      { label: 'D', text: 'Meanwhile' },
    ],
    correctAnswer: 'A',
    explanation:
      'The second sentence sums up the string of misfortunes into one overall verdict. "In short" signals that it condenses the preceding details into a takeaway.',
    wrongAnswerExplanations: {
      B: '"However" signals contrast, but the final judgment follows from the problems rather than opposing them.',
      C: '"For example" would introduce an instance, yet the sentence wraps up rather than illustrates.',
      D: '"Meanwhile" signals simultaneous events, but the sentence draws a conclusion from the whole.',
    },
    categoryExplanation: 'This is summary because the second sentence condenses the listed troubles into one overall conclusion.',
  },
  {
    id: 'tr-mod-058',
    category: 'summary',
    difficulty: 'easy',
    stimulus:
      'The candidate had the strongest experience, the clearest plan, and the widest support among voters. _______, she was the obvious choice for the position.',
    question: Q,
    choices: [
      { label: 'A', text: 'Nevertheless' },
      { label: 'B', text: 'Overall' },
      { label: 'C', text: 'For instance' },
      { label: 'D', text: 'First' },
    ],
    correctAnswer: 'B',
    explanation:
      'The second sentence ties the listed strengths together into a single verdict. "Overall" signals a summary of the preceding points.',
    wrongAnswerExplanations: {
      A: '"Nevertheless" signals contrast, but the conclusion follows from the strengths rather than opposing them.',
      C: '"For instance" would offer an example, yet the sentence sums up the case.',
      D: '"First" signals the opening of a sequence, but the sentence draws a final conclusion.',
    },
    categoryExplanation: 'This is summary because the second sentence gathers the listed strengths into one overall judgment.',
  },
  {
    id: 'tr-mod-059',
    category: 'summary',
    difficulty: 'medium',
    stimulus:
      'The new manufacturing process uses less energy, produces fewer emissions, and yields a sturdier product than the method it replaces. _______, it improves on the old approach in nearly every measurable way.',
    question: Q,
    choices: [
      { label: 'A', text: 'In sum' },
      { label: 'B', text: 'By contrast' },
      { label: 'C', text: 'Specifically' },
      { label: 'D', text: 'Afterward' },
    ],
    correctAnswer: 'A',
    explanation:
      'The second sentence rolls the three listed advantages into a single overarching statement. "In sum" signals a summary of the preceding points.',
    wrongAnswerExplanations: {
      B: '"By contrast" signals opposition, but the conclusion follows from the listed benefits.',
      C: '"Specifically" would narrow to a detail, yet the sentence broadens into a general takeaway.',
      D: '"Afterward" signals time order, but the sentence concludes rather than continues a sequence.',
    },
    categoryExplanation: 'This is summary because the second sentence sums up the listed advantages into one overarching conclusion.',
  },
  {
    id: 'tr-mod-060',
    category: 'summary',
    difficulty: 'medium',
    stimulus:
      'The study tracked diet, exercise, sleep, and stress across thousands of participants over ten years. _______, its authors concluded that no single habit mattered as much as the consistency with which people kept all four in balance.',
    question: Q,
    choices: [
      { label: 'A', text: 'For example' },
      { label: 'B', text: 'Ultimately' },
      { label: 'C', text: 'On the other hand' },
      { label: 'D', text: 'In addition' },
    ],
    correctAnswer: 'B',
    explanation:
      'The second sentence delivers the overarching finding that the long study arrived at. "Ultimately" signals the conclusion drawn from all the preceding work.',
    wrongAnswerExplanations: {
      A: '"For example" would offer an instance, yet the sentence states the study\'s overall conclusion.',
      C: '"On the other hand" signals contrast, but the conclusion follows from the study rather than opposing it.',
      D: '"In addition" would add a separate point, but the sentence wraps up the findings.',
    },
    categoryExplanation: 'This is summary because the second sentence states the overall conclusion drawn from the whole study.',
  },
  {
    id: 'tr-mod-061',
    category: 'summary',
    difficulty: 'medium',
    stimulus:
      'The novel weaves together three families, two centuries, and a dozen shifting narrators. _______, it is a sprawling portrait of a single town seen from every possible angle.',
    question: Q,
    choices: [
      { label: 'A', text: 'To sum up' },
      { label: 'B', text: 'Nonetheless' },
      { label: 'C', text: 'To illustrate' },
      { label: 'D', text: 'Then' },
    ],
    correctAnswer: 'A',
    explanation:
      'The second sentence distills the novel\'s many threads into a single description of what it ultimately is. "To sum up" signals that condensation.',
    wrongAnswerExplanations: {
      B: '"Nonetheless" signals contrast, but the description follows from the listed elements.',
      C: '"To illustrate" would offer a specific example, yet the sentence summarizes the whole work.',
      D: '"Then" signals sequence, but the sentence draws together the parts rather than ordering them.',
    },
    categoryExplanation: 'This is summary because the second sentence condenses the novel\'s many elements into one overall description.',
  },
  {
    id: 'tr-mod-062',
    category: 'summary',
    difficulty: 'hard',
    stimulus:
      'The empire\'s roads sped its armies, its coinage unified distant markets, and its shared language let officials govern across a thousand miles. _______, its lasting achievement was less any single conquest than the machinery of administration that outlived its rulers.',
    question: Q,
    choices: [
      { label: 'A', text: 'For instance' },
      { label: 'B', text: 'In the end' },
      { label: 'C', text: 'Conversely' },
      { label: 'D', text: 'Moreover' },
    ],
    correctAnswer: 'B',
    explanation:
      'The second sentence gathers the listed administrative strengths into a single overarching verdict on the empire\'s legacy. "In the end" signals that concluding summary.',
    wrongAnswerExplanations: {
      A: '"For instance" would introduce an example, yet the sentence draws an overall conclusion.',
      C: '"Conversely" signals contrast, but the verdict follows from the listed strengths rather than opposing them.',
      D: '"Moreover" would add another point, but the sentence sums up rather than extends the list.',
    },
    categoryExplanation: 'This is summary because the second sentence draws the empire\'s listed strengths into one concluding judgment about its legacy.',
  },
  {
    id: 'tr-mod-063',
    category: 'summary',
    difficulty: 'hard',
    stimulus:
      'The report documents rising sea temperatures, shifting migration routes, and the collapse of once-reliable fisheries along the coast. _______, it paints a picture of an ecosystem being remade faster than the communities that depend on it can adapt.',
    question: Q,
    choices: [
      { label: 'A', text: 'In conclusion' },
      { label: 'B', text: 'Even so' },
      { label: 'C', text: 'Namely' },
      { label: 'D', text: 'Subsequently' },
    ],
    correctAnswer: 'A',
    explanation:
      'The second sentence pulls the report\'s separate findings into one sweeping takeaway. "In conclusion" signals that it wraps up and sums the preceding evidence.',
    wrongAnswerExplanations: {
      B: '"Even so" signals concession or contrast, but the takeaway follows from the findings rather than opposing them.',
      C: '"Namely" would specify one item, yet the sentence generalizes across all the findings.',
      D: '"Subsequently" signals time order, but the sentence concludes rather than continues a sequence.',
    },
    categoryExplanation: 'This is summary because the second sentence gathers the report\'s findings into one overarching conclusion.',
  },
]
