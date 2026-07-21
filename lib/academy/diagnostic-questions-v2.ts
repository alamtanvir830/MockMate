// Adaptive two-module SAT R&W diagnostic (v2).
// Module 1 (20 questions) is fixed. A student's Module 1 accuracy routes them to
// either the Hard or the Easy Module 2 (16 questions each). Total: 36 questions.
//
// Keep this file free of browser-only APIs so it runs safely in the Edge runtime.
// Every question here is original and self-contained.

import type { DrillQuestion } from './types'

export const DIAGNOSTIC_V2_VERSION = 2

// Students scoring at or above this fraction on Module 1 are routed to the Hard module.
export const M1_ROUTING_THRESHOLD = 0.70

// ── Module 1: 20 questions (3 easy, 12 medium, 5 hard) ──────────────────────────
export const DIAGNOSTIC_M1_QUESTIONS: DrillQuestion[] = [
  // words-in-context (2)
  {
    id: 'diag2-m1-001',
    skillSlug: 'words-in-context',
    difficulty: 'easy',
    stimulus:
      'The volunteers were surprised by how [ROBUST] the young saplings had become after only one growing season. Trees that had been thin, bending twigs in the spring now stood upright against strong winds, their trunks thick enough to resist a firm push from an adult hand.',
    question: 'As used in the text, [ROBUST] most nearly means',
    choices: [
      { label: 'A', text: 'sturdy' },
      { label: 'B', text: 'colorful' },
      { label: 'C', text: 'numerous' },
      { label: 'D', text: 'youthful' },
    ],
    correctAnswer: 'A',
    explanation:
      'The passage contrasts thin, bending twigs with trunks now "thick enough to resist a firm push" and able to "stand upright against strong winds." These details describe physical strength and stability, so "sturdy" fits precisely.',
    wrongAnswerExplanations: {
      B: '"Colorful" describes appearance, but the passage focuses on the strength of the trunks, not their color.',
      C: '"Numerous" describes quantity, yet the passage discusses how strong individual saplings became, not how many there were.',
      D: '"Youthful" restates that the saplings are young, but that is the state being contrasted with their new strength, not the meaning of the word.',
    },
    teachingPoint:
      'Match the target word to the concrete details around it; here the physical description of thick, wind-resistant trunks points directly to strength.',
  },
  {
    id: 'diag2-m1-002',
    skillSlug: 'words-in-context',
    difficulty: 'medium',
    stimulus:
      'Reviewers had expected the composer\'s new symphony to be as loud and grand as her earlier work, so many were startled by its [RESTRAINED] opening. Instead of a wall of brass, the piece begins with a single flute, its melody so quiet that listeners lean forward to catch each note.',
    question: 'As used in the text, [RESTRAINED] most nearly means',
    choices: [
      { label: 'A', text: 'confused' },
      { label: 'B', text: 'subdued' },
      { label: 'C', text: 'lengthy' },
      { label: 'D', text: 'cheerful' },
    ],
    correctAnswer: 'B',
    explanation:
      'The opening is contrasted with a "loud and grand" style and described as a single, quiet flute melody. "Subdued" captures this soft, held-back quality, which is why listeners must lean forward to hear it.',
    wrongAnswerExplanations: {
      A: '"Confused" suggests disorder, but the passage describes a deliberately quiet, controlled opening, not a chaotic one.',
      C: '"Lengthy" describes duration, which the passage never addresses; the emphasis is on softness, not length.',
      D: '"Cheerful" describes mood, but the passage stresses quietness and understatement rather than happiness.',
    },
    teachingPoint:
      'When a word is set against an expectation ("loud and grand"), the correct meaning usually points the opposite direction.',
  },
  // central-ideas-details (2)
  {
    id: 'diag2-m1-003',
    skillSlug: 'central-ideas-details',
    difficulty: 'medium',
    stimulus:
      'Marine biologist Dr. Priya Nair studies how coral reefs recover after bleaching events. Her surveys show that reefs near strong ocean currents regain their color and fish populations far faster than sheltered reefs. Nair argues that the currents constantly deliver cooler water and drifting coral larvae, giving damaged reefs a steady supply of the resources they need to rebuild.',
    question: 'Which choice best states the main idea of the text?',
    choices: [
      { label: 'A', text: 'Coral bleaching is becoming more frequent in sheltered waters than in open ocean.' },
      { label: 'B', text: 'Ocean currents help bleached reefs recover by supplying cooler water and new coral larvae.' },
      { label: 'C', text: 'Dr. Nair prefers studying reefs that are located near strong ocean currents.' },
      { label: 'D', text: 'Fish populations recover more slowly than coral color after a bleaching event.' },
    ],
    correctAnswer: 'B',
    explanation:
      'The passage centers on why current-exposed reefs recover faster: the currents supply cooler water and drifting larvae. Choice B captures both the observed pattern and Nair\'s explanation for it, which together form the main idea.',
    wrongAnswerExplanations: {
      A: 'The passage never compares how often bleaching occurs in different locations; it discusses recovery speed, not frequency.',
      C: 'Nair\'s personal preference is not stated; the text reports her findings, not her favorite study sites.',
      D: 'The passage does not rank the recovery of fish populations against coral color; it groups them as things that return faster near currents.',
    },
    teachingPoint:
      'The main idea ties the evidence to its explanation; a detail that is true but narrow (like one comparison) is not the whole point.',
  },
  {
    id: 'diag2-m1-004',
    skillSlug: 'central-ideas-details',
    difficulty: 'medium',
    stimulus:
      'In the 1920s, librarian Belpré became the first Puerto Rican employed by the New York Public Library. Noticing that the shelves held almost no books in Spanish, she began telling folktales aloud to neighborhood children, then wrote several of those stories down for publication. Her bilingual story hours drew families who had rarely felt the library was meant for them.',
    question: 'According to the text, what motivated Belpré to write down folktales?',
    choices: [
      { label: 'A', text: 'She wanted to be promoted within the New York Public Library.' },
      { label: 'B', text: 'The library had very few books available in Spanish.' },
      { label: 'C', text: 'Publishers had specifically requested Puerto Rican folktales.' },
      { label: 'D', text: 'Children were unable to attend her spoken story hours.' },
    ],
    correctAnswer: 'B',
    explanation:
      'The passage states that Belpré noticed "the shelves held almost no books in Spanish" and then began telling and writing down folktales. This lack of Spanish-language material is presented as the reason she created new stories.',
    wrongAnswerExplanations: {
      A: 'The passage never mentions a promotion or any career ambition as her motive.',
      C: 'No publisher request is described; she wrote the stories after noticing the gap on the shelves herself.',
      D: 'Children did attend her story hours; the text says her bilingual sessions drew families, so attendance was not the problem.',
    },
    teachingPoint:
      'For an "according to the text" detail question, find the sentence that states the cause directly rather than one that merely sounds plausible.',
  },
  // text-structure-purpose (2)
  {
    id: 'diag2-m1-005',
    skillSlug: 'text-structure-purpose',
    difficulty: 'medium',
    stimulus:
      'For decades, engineers assumed that taller wind turbines always captured more energy, since winds blow faster at higher altitudes. A recent study complicates this rule. In valleys where cold air pools at night, the strongest, steadiest winds actually occur closer to the ground, meaning a shorter turbine can sometimes outperform a taller, more expensive one.',
    question: 'What is the main purpose of the text?',
    choices: [
      { label: 'A', text: 'To argue that wind turbines should never be built in valleys' },
      { label: 'B', text: 'To describe the process of installing a wind turbine' },
      { label: 'C', text: 'To present evidence that qualifies a common assumption about turbine height' },
      { label: 'D', text: 'To compare the costs of two competing turbine manufacturers' },
    ],
    correctAnswer: 'C',
    explanation:
      'The text opens with a widely held assumption ("taller... always captured more energy") and then introduces a study that "complicates this rule." Its purpose is to qualify that assumption by showing a case where shorter turbines can do better.',
    wrongAnswerExplanations: {
      A: 'The text does not oppose valley turbines; it notes that in valleys, shorter turbines can sometimes work better.',
      B: 'No installation process is described; the focus is on wind behavior, not construction steps.',
      D: 'Cost is mentioned only briefly, and no specific manufacturers are compared.',
    },
    teachingPoint:
      'When a passage states a rule and then says a study "complicates" it, the purpose is usually to qualify or limit that rule, not to overturn it entirely.',
  },
  {
    id: 'diag2-m1-006',
    skillSlug: 'text-structure-purpose',
    difficulty: 'hard',
    stimulus:
      'The following is adapted from a nineteenth-century essay on memory.\n\nWe imagine memory as a storehouse, its shelves lined with fixed images we may retrieve unchanged. Yet each act of recall is also an act of revision. To remember the face of a friend is to paint it anew, brush by brush, coloring it with all we have felt since we last met. The storehouse, then, is no storehouse at all, but a workshop.',
    question: 'What is the main rhetorical effect of the final sentence?',
    choices: [
      { label: 'A', text: 'It offers a specific historical example that supports the storehouse comparison.' },
      { label: 'B', text: 'It replaces the initial metaphor with one that better fits the author\'s argument.' },
      { label: 'C', text: 'It concedes that the author\'s earlier claim about memory was mistaken.' },
      { label: 'D', text: 'It introduces a new topic that the rest of the passage will explore.' },
    ],
    correctAnswer: 'B',
    explanation:
      'The passage sets up the "storehouse" metaphor only to reject it, arguing that recall involves revision, like painting a face "anew." The final sentence swaps the storehouse for a "workshop," a metaphor that better matches the idea of memory as active creation.',
    wrongAnswerExplanations: {
      A: 'The sentence offers no historical example; it substitutes one figure of speech for another.',
      C: 'The author never made the storehouse claim as their own belief; it is the common assumption being corrected, so there is no personal concession.',
      D: 'The workshop image concludes the argument rather than opening a new topic to explore.',
    },
    teachingPoint:
      'Track how a passage handles its own metaphors; replacing one image with a better-fitting one is a common way authors drive home a corrected view.',
  },
  // command-of-evidence (2)
  {
    id: 'diag2-m1-007',
    skillSlug: 'command-of-evidence',
    difficulty: 'medium',
    stimulus:
      'A team of ecologists hypothesized that planting rows of native wildflowers between crop fields would increase the number of pollinating insects visiting the crops. To test this, they compared two neighboring farms over one summer: one with wildflower rows and one without.',
    question:
      'Which finding, if true, would most directly support the ecologists\' hypothesis?',
    choices: [
      { label: 'A', text: 'The farm with wildflower rows recorded far more pollinator visits to its crops than the farm without them.' },
      { label: 'B', text: 'The wildflowers on the first farm bloomed earlier than expected that summer.' },
      { label: 'C', text: 'Both farms used the same brand of fertilizer throughout the growing season.' },
      { label: 'D', text: 'The farm without wildflower rows had slightly larger fields than the other farm.' },
    ],
    correctAnswer: 'A',
    explanation:
      'The hypothesis predicts that wildflower rows increase pollinator visits to crops. A finding that the wildflower farm recorded far more pollinator visits directly matches that predicted outcome and supports the claim.',
    wrongAnswerExplanations: {
      B: 'When the wildflowers bloomed says nothing about whether more pollinators visited the crops, which is what the hypothesis is about.',
      C: 'Matching fertilizer helps rule out a confounding variable, but it does not by itself show that wildflowers increased pollinator visits.',
      D: 'A difference in field size is a possible complication, not evidence that wildflowers boosted pollinator activity.',
    },
    teachingPoint:
      'Supporting evidence must match the specific outcome the hypothesis predicts, not just relate to the general topic.',
  },
  {
    id: 'diag2-m1-008',
    skillSlug: 'command-of-evidence',
    difficulty: 'hard',
    stimulus:
      'Historian Lucia Ferrand claims that a medieval town\'s wealth came primarily from its wool trade rather than its famous vineyards. Skeptics note that the town\'s surviving artwork overwhelmingly depicts grapes and wine, suggesting vineyards were central to its identity and, likely, its economy.',
    question:
      'Which finding, if true, would most strongly support Ferrand\'s claim against the skeptics\' objection?',
    choices: [
      { label: 'A', text: 'The town\'s surviving artwork was mostly commissioned by a single wine-loving family.' },
      { label: 'B', text: 'Neighboring towns also produced artwork depicting grapes and wine.' },
      { label: 'C', text: 'Surviving tax records show that wool sales generated several times more revenue than wine sales.' },
      { label: 'D', text: 'The town held an annual festival celebrating the grape harvest.' },
    ],
    correctAnswer: 'C',
    explanation:
      'Ferrand\'s claim is specifically about the source of wealth. Tax records showing wool generated several times more revenue than wine directly measure income and support her economic argument, outweighing the artistic evidence the skeptics cite.',
    wrongAnswerExplanations: {
      A: 'This weakens the skeptics\' reliance on artwork as evidence of the economy, but it does not itself show wool was the main source of wealth.',
      B: 'Artwork in neighboring towns says nothing about which industry produced this town\'s wealth.',
      D: 'A grape festival reinforces the vineyards\' cultural importance, which supports the skeptics rather than Ferrand.',
    },
    teachingPoint:
      'To support a claim about a specific measure (here, wealth), look for evidence that measures that thing directly, not evidence about culture or reputation.',
  },
  // quantitative-evidence (1)
  {
    id: 'diag2-m1-009',
    skillSlug: 'quantitative-evidence',
    difficulty: 'medium',
    stimulus:
      'A city compared bus ridership before and after making rides free on weekends. Before the change, average Saturday ridership was 4,200 passengers. After the change, average Saturday ridership rose to 7,100 passengers, while average weekday ridership, which remained paid, stayed nearly constant at about 9,000 passengers.',
    question:
      'Which choice best uses data from the text to support the conclusion that making weekend rides free increased ridership?',
    choices: [
      { label: 'A', text: 'Weekday ridership stayed near 9,000 passengers throughout the study.' },
      { label: 'B', text: 'Saturday ridership rose from 4,200 to 7,100 passengers after rides became free.' },
      { label: 'C', text: 'Weekday ridership was higher than Saturday ridership both before and after the change.' },
      { label: 'D', text: 'The city measured ridership on both weekends and weekdays.' },
    ],
    correctAnswer: 'B',
    explanation:
      'The conclusion is that free weekend rides raised ridership. The Saturday increase from 4,200 to 7,100 passengers, occurring right after rides became free, is the data point that directly supports that cause-and-effect conclusion.',
    wrongAnswerExplanations: {
      A: 'Steady weekday ridership serves as a comparison baseline, but it does not itself show the weekend increase caused by the free-ride policy.',
      C: 'That weekdays were busier than Saturdays is true but irrelevant to whether the free-ride policy raised weekend numbers.',
      D: 'Noting that both were measured describes the method, not the result that supports the conclusion.',
    },
    teachingPoint:
      'Pick the statistic that shows the change the conclusion is about; a steady comparison group is useful context but is not the supporting number itself.',
  },
  // inferences (2)
  {
    id: 'diag2-m1-010',
    skillSlug: 'inferences',
    difficulty: 'medium',
    stimulus:
      'The desert pupfish survives in isolated springs where water temperatures swing wildly between day and night. Individuals raised in laboratory tanks kept at a single steady temperature grow quickly but often die when returned to the wild. Researchers suspect that the natural temperature swings, though stressful, prepare the fish to endure conditions that constant comfort does not.',
    question:
      'Which choice most logically completes the text? The findings suggest that for the desert pupfish, ______',
    choices: [
      { label: 'A', text: 'exposure to varying temperatures may be necessary to survive in the wild.' },
      { label: 'B', text: 'laboratory tanks are unable to keep water at a steady temperature.' },
      { label: 'C', text: 'faster growth always leads to a longer lifespan in the wild.' },
      { label: 'D', text: 'the species will soon disappear from its natural springs.' },
    ],
    correctAnswer: 'A',
    explanation:
      'Fish raised at a steady temperature die in the wild, while researchers think natural swings "prepare the fish to endure" harsh conditions. It logically follows that experiencing varying temperatures may be necessary for wild survival.',
    wrongAnswerExplanations: {
      B: 'The tanks clearly can hold a steady temperature; that steady condition is exactly what the study describes.',
      C: 'The passage shows the opposite: fast-growing lab fish often die, so faster growth does not guarantee a longer wild lifespan.',
      D: 'The text gives no information about the species going extinct; it discusses survival differences between lab and wild fish.',
    },
    teachingPoint:
      'A valid inference stays within the evidence; extend the given cause-and-effect relationship rather than predicting dramatic outcomes the text never mentions.',
  },
  {
    id: 'diag2-m1-011',
    skillSlug: 'inferences',
    difficulty: 'medium',
    stimulus:
      'Archaeologists excavating a 3,000-year-old harbor found stone anchors carved in a style known only from a distant island culture. No writing from either group survives to record contact between them. Yet the anchors, along with pottery bearing that island\'s distinctive glaze, lay in the harbor\'s oldest layers.',
    question:
      'Which choice most logically completes the text? The evidence most strongly suggests that ______',
    choices: [
      { label: 'A', text: 'the two cultures were trading or traveling between each other far earlier than written records would indicate.' },
      { label: 'B', text: 'the island culture eventually conquered the people who built the harbor.' },
      { label: 'C', text: 'the harbor was abandoned shortly after it was first constructed.' },
      { label: 'D', text: 'stone anchors were more valuable than pottery to the harbor\'s builders.' },
    ],
    correctAnswer: 'A',
    explanation:
      'Island-style anchors and island-glazed pottery in the harbor\'s oldest layers imply contact, even though no writing records it. The most supported inference is that the cultures were in contact earlier than written records could show.',
    wrongAnswerExplanations: {
      B: 'Objects showing contact do not indicate conquest; there is no evidence of warfare or domination.',
      C: 'The presence of early artifacts says nothing about when or whether the harbor was abandoned.',
      D: 'The passage does not compare the value of anchors and pottery to the builders.',
    },
    teachingPoint:
      'Foreign-style objects in a location imply contact or exchange, but they do not by themselves imply conquest, abandonment, or relative value.',
  },
  // cross-text-connections (1)
  {
    id: 'diag2-m1-012',
    skillSlug: 'cross-text-connections',
    difficulty: 'hard',
    stimulus:
      'Text 1: Urban planner Devi argues that adding bike lanes reliably reduces car traffic. As more residents feel safe cycling, she writes, they leave their cars at home, and streets grow calmer for everyone.\n\nText 2: Transportation researcher Cole cautions that new bike lanes often fill with cyclists who previously walked or took the bus, not former drivers. Unless driving is also made less convenient, he notes, car traffic tends to hold steady even after lanes are added.',
    question:
      'Based on the texts, how would Cole most likely respond to Devi\'s argument?',
    choices: [
      { label: 'A', text: 'By agreeing that bike lanes are the single most effective way to calm city streets' },
      { label: 'B', text: 'By noting that new cyclists often come from walkers and bus riders rather than from drivers' },
      { label: 'C', text: 'By arguing that cities should remove existing bike lanes to reduce congestion' },
      { label: 'D', text: 'By claiming that residents rarely feel safe cycling regardless of bike lanes' },
    ],
    correctAnswer: 'B',
    explanation:
      'Devi assumes new cyclists are former drivers, so traffic falls. Cole\'s central point is that new cyclists often previously walked or took the bus, so driving stays steady. He would most likely respond by raising exactly that objection.',
    wrongAnswerExplanations: {
      A: 'Cole is skeptical that bike lanes reduce car traffic on their own, so he would not call them the most effective calming measure.',
      C: 'Cole never advocates removing bike lanes; he argues they must be paired with measures that discourage driving.',
      D: 'Cole does not dispute that people feel safe cycling; he disputes where the new cyclists come from.',
    },
    teachingPoint:
      'To predict one author\'s response to another, pinpoint the specific assumption they disagree about, not their general topic.',
  },
  // boundaries (2)
  {
    id: 'diag2-m1-013',
    skillSlug: 'boundaries',
    difficulty: 'easy',
    stimulus:
      'The town installed solar panels on the roof of its library _______ the building now generates most of its own electricity during the summer.',
    question:
      'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { label: 'A', text: ', and' },
      { label: 'B', text: ',' },
      { label: 'C', text: '; and' },
      { label: 'D', text: 'and' },
    ],
    correctAnswer: 'A',
    explanation:
      'Both "The town installed solar panels on the roof of its library" and "the building now generates most of its own electricity during the summer" are independent clauses. Two independent clauses are correctly joined by a comma plus the coordinating conjunction "and."',
    wrongAnswerExplanations: {
      B: 'A comma alone between two independent clauses creates a comma splice.',
      C: 'A semicolon already joins independent clauses, so adding "and" is redundant and incorrect.',
      D: '"And" with no comma before it fuses two independent clauses into a run-on.',
    },
    teachingPoint:
      'Two independent clauses join with a comma plus a FANBOYS conjunction; the comma goes before the conjunction, and no semicolon is used with it.',
  },
  {
    id: 'diag2-m1-014',
    skillSlug: 'boundaries',
    difficulty: 'medium',
    stimulus:
      'The novelist kept one unusual habit throughout her career _______ she wrote every first draft entirely by hand, filling dozens of notebooks before typing a single word.',
    question:
      'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { label: 'A', text: ':' },
      { label: 'B', text: ',' },
      { label: 'C', text: ', which' },
      { label: 'D', text: ' and' },
    ],
    correctAnswer: 'A',
    explanation:
      'The first clause is a complete sentence, and what follows names and explains the "one unusual habit." A colon after a complete clause correctly introduces this elaboration.',
    wrongAnswerExplanations: {
      B: 'A comma alone joins two independent clauses here, creating a comma splice.',
      C: '", which she wrote every first draft" is ungrammatical, since "which" cannot take the new subject "she."',
      D: '"And" with no comma before it creates a run-on and also loses the explanatory relationship a colon provides.',
    },
    teachingPoint:
      'A colon after a complete clause is ideal when the words that follow identify or explain something just named.',
  },
  // form-structure-sense (2)
  {
    id: 'diag2-m1-015',
    skillSlug: 'form-structure-sense',
    difficulty: 'easy',
    stimulus:
      'By the time the rescue team reached the stranded climbers, the sun _______ behind the ridge, and the temperature was dropping fast.',
    question:
      'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { label: 'A', text: 'had already set' },
      { label: 'B', text: 'has already set' },
      { label: 'C', text: 'is already setting' },
      { label: 'D', text: 'already sets' },
    ],
    correctAnswer: 'A',
    explanation:
      'The sun set before the team arrived, so the earlier action needs the past perfect tense. "Had already set" correctly places the sunset before the past-tense arrival described in the sentence.',
    wrongAnswerExplanations: {
      B: '"Has already set" is present perfect and clashes with the past-tense narration ("reached," "was dropping").',
      C: '"Is already setting" is present tense and does not fit a scene narrated in the past.',
      D: '"Already sets" is simple present and describes a habitual action, not a completed past event.',
    },
    teachingPoint:
      'Use the past perfect ("had" plus the past participle) for an action completed before another past event in the same sentence.',
  },
  {
    id: 'diag2-m1-016',
    skillSlug: 'form-structure-sense',
    difficulty: 'medium',
    stimulus:
      'Each of the museum\'s three new wings _______ a different century of regional art, allowing visitors to trace how local styles changed over time.',
    question:
      'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { label: 'A', text: 'feature' },
      { label: 'B', text: 'features' },
      { label: 'C', text: 'have featured' },
      { label: 'D', text: 'are featuring' },
    ],
    correctAnswer: 'B',
    explanation:
      'The subject is "Each," a singular pronoun, so the verb must be singular. "Features" agrees with "each," even though the plural noun "wings" sits between them as a distraction.',
    wrongAnswerExplanations: {
      A: '"Feature" is plural and does not agree with the singular subject "Each."',
      C: '"Have featured" is plural and also shifts the tense unnecessarily away from the simple present the sentence uses.',
      D: '"Are featuring" is plural and does not agree with the singular subject "Each."',
    },
    teachingPoint:
      '"Each," "every," and "one" are singular subjects; ignore the plural noun in a phrase like "of the three wings" when choosing the verb.',
  },
  // transitions (2)
  {
    id: 'diag2-m1-017',
    skillSlug: 'transitions',
    difficulty: 'medium',
    stimulus:
      'The startup\'s first app was praised by critics but downloaded by almost no one. _______ the founders decided to redesign it around the single feature that early users mentioned most.',
    question:
      'Which choice completes the text with the most logical transition?',
    choices: [
      { label: 'A', text: 'In contrast,' },
      { label: 'B', text: 'For example,' },
      { label: 'C', text: 'As a result,' },
      { label: 'D', text: 'Nevertheless,' },
    ],
    correctAnswer: 'C',
    explanation:
      'The first sentence describes a problem (few downloads), and the second describes the founders\' response to it. "As a result" correctly signals that the redesign was a consequence of the poor download numbers.',
    wrongAnswerExplanations: {
      A: '"In contrast" signals opposition, but the redesign follows from the problem rather than contrasting with it.',
      B: '"For example" introduces an illustration, yet the second sentence is a response, not an example of the first.',
      D: '"Nevertheless" signals a concession against expectation, but the redesign is the expected reaction to low downloads, not a surprising one.',
    },
    teachingPoint:
      'When the second sentence describes what someone does because of the first, a cause-and-effect transition like "as a result" is correct.',
  },
  {
    id: 'diag2-m1-018',
    skillSlug: 'transitions',
    difficulty: 'medium',
    stimulus:
      'Deep-sea creatures live in near-total darkness, so many have lost the ability to see color. The vampire squid, _______ has unusually large eyes that detect the faint blue glow of other animals, helping it navigate a lightless world.',
    question:
      'Which choice completes the text with the most logical transition?',
    choices: [
      { label: 'A', text: 'therefore,' },
      { label: 'B', text: 'however,' },
      { label: 'C', text: 'likewise,' },
      { label: 'D', text: 'in addition,' },
    ],
    correctAnswer: 'B',
    explanation:
      'The first sentence says many deep-sea animals have lost their vision, but the vampire squid has large, sensitive eyes. "However" signals this contrast between the general trend and the squid\'s exception.',
    wrongAnswerExplanations: {
      A: '"Therefore" signals a result, but the squid\'s keen eyes are the opposite of what the first sentence would lead you to expect.',
      C: '"Likewise" signals similarity, yet the squid differs from the animals that lost their vision.',
      D: '"In addition" adds a similar point, but the squid contrasts with rather than extends the earlier claim.',
    },
    teachingPoint:
      'When a specific example goes against the general pattern just described, use a contrast transition such as "however."',
  },
  // rhetorical-synthesis (2)
  {
    id: 'diag2-m1-019',
    skillSlug: 'rhetorical-synthesis',
    difficulty: 'medium',
    stimulus:
      'While researching a local river, a student took the following notes:\n\n- The Willow River flows for 60 miles through three towns.\n- In 1975, factories dumped waste directly into the river.\n- By 1990, new laws banned this dumping.\n- Today, native trout have returned to the river for the first time in decades.',
    question:
      'The student wants to emphasize the improvement in the river\'s health. Which choice most effectively uses relevant information from the notes to accomplish this goal?',
    choices: [
      { label: 'A', text: 'The Willow River flows for 60 miles through three towns before reaching the sea.' },
      { label: 'B', text: 'Once polluted by factory waste, the Willow River is now clean enough that native trout have returned.' },
      { label: 'C', text: 'In 1975, factories dumped their waste directly into the Willow River.' },
      { label: 'D', text: 'New laws banning waste dumping were passed by 1990.' },
    ],
    correctAnswer: 'B',
    explanation:
      'The goal is to emphasize improvement. Choice B contrasts the river\'s polluted past with its recovery, using the return of native trout as evidence of improved health, which directly fulfills the goal.',
    wrongAnswerExplanations: {
      A: 'The river\'s length and route say nothing about improvement in its health.',
      C: 'Describing only the pollution shows the problem but not the recovery the student wants to emphasize.',
      D: 'Noting the new laws describes a cause but omits the improved outcome, so it emphasizes policy rather than the river\'s health.',
    },
    teachingPoint:
      'To emphasize improvement, pick the choice that pairs a "before" problem with an "after" result, not one that states only one side.',
  },
  {
    id: 'diag2-m1-020',
    skillSlug: 'rhetorical-synthesis',
    difficulty: 'hard',
    stimulus:
      'A student writing about two composers took these notes:\n\n- Composer Ravel valued clear, precise structures in his music.\n- Composer Debussy favored blurred, dreamlike textures.\n- Both composers were French and active in the early 1900s.\n- Critics often grouped the two together despite their differences.',
    question:
      'The student wants to highlight a key difference between the two composers. Which choice most effectively uses the notes to accomplish this goal?',
    choices: [
      { label: 'A', text: 'Ravel and Debussy were both French composers active in the early 1900s.' },
      { label: 'B', text: 'Critics often grouped Ravel and Debussy together despite their differences.' },
      { label: 'C', text: 'Whereas Ravel valued clear, precise structures, Debussy favored blurred, dreamlike textures.' },
      { label: 'D', text: 'Both Ravel and Debussy composed music in France during the early twentieth century.' },
    ],
    correctAnswer: 'C',
    explanation:
      'The goal is to highlight a difference. Choice C uses "whereas" to directly contrast Ravel\'s precise structures with Debussy\'s dreamlike textures, drawing on the two notes that describe their opposing styles.',
    wrongAnswerExplanations: {
      A: 'This emphasizes what the composers shared, not how they differed.',
      B: 'Noting that critics grouped them together highlights a similarity in reception rather than a difference in style.',
      D: 'Like choice A, this stresses common ground (place and era) rather than a contrast.',
    },
    teachingPoint:
      'When the goal is to show a difference, choose the option that sets the two subjects against each other, often with a word like "whereas" or "while."',
  },
]

// ── Module 2 (Easy branch): 16 questions (6 easy, 9 medium, 1 hard) ─────────────
export const DIAGNOSTIC_M2_EASY_QUESTIONS: DrillQuestion[] = [
  {
    id: 'diag2-m2e-001',
    skillSlug: 'words-in-context',
    difficulty: 'easy',
    stimulus:
      'The coach praised the team\'s [PERSISTENT] effort; even when they fell behind by two goals, the players kept attacking, refusing to slow down until the final whistle blew.',
    question: 'As used in the text, [PERSISTENT] most nearly means',
    choices: [
      { label: 'A', text: 'determined' },
      { label: 'B', text: 'graceful' },
      { label: 'C', text: 'occasional' },
      { label: 'D', text: 'nervous' },
    ],
    correctAnswer: 'A',
    explanation:
      'The players "kept attacking" and refused "to slow down" even while losing, showing steady, unyielding effort. "Determined" captures this refusal to give up.',
    wrongAnswerExplanations: {
      B: '"Graceful" describes elegance of movement, which the passage does not discuss.',
      C: '"Occasional" means happening now and then, the opposite of the continuous effort described.',
      D: '"Nervous" describes anxiety, but the passage stresses steady effort, not fear.',
    },
    teachingPoint:
      'Details showing a refusal to stop point to a word about determination, not one about style or emotion.',
  },
  {
    id: 'diag2-m2e-002',
    skillSlug: 'central-ideas-details',
    difficulty: 'easy',
    stimulus:
      'Honeybees communicate the location of food through a "waggle dance." A returning bee moves in a figure-eight pattern on the honeycomb, and the angle and length of its waggle tell other bees the direction and distance of the flowers it found.',
    question: 'Which choice best states the main idea of the text?',
    choices: [
      { label: 'A', text: 'Honeybees prefer certain flowers over others when gathering food.' },
      { label: 'B', text: 'The waggle dance lets a honeybee tell others where food is located.' },
      { label: 'C', text: 'Honeycombs are built in a figure-eight pattern by worker bees.' },
      { label: 'D', text: 'Bees travel long distances in search of flowers each day.' },
    ],
    correctAnswer: 'B',
    explanation:
      'The passage explains that the waggle dance communicates the "direction and distance" of food to other bees. Choice B captures this central function of the dance.',
    wrongAnswerExplanations: {
      A: 'The passage does not discuss which flowers bees prefer.',
      C: 'The figure-eight is the pattern of the dance, not how honeycombs are built.',
      D: 'Distance is mentioned only as information the dance conveys, not as the main point.',
    },
    teachingPoint:
      'The main idea is the function the passage is built around; watch for a detail (like "figure-eight") being mistaken for the topic.',
  },
  {
    id: 'diag2-m2e-003',
    skillSlug: 'boundaries',
    difficulty: 'easy',
    stimulus:
      'The bakery sells out of its cinnamon rolls by mid-morning _______ regular customers now arrive before dawn to be sure of getting one.',
    question:
      'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { label: 'A', text: ', so' },
      { label: 'B', text: ',' },
      { label: 'C', text: 'so' },
      { label: 'D', text: '; so' },
    ],
    correctAnswer: 'A',
    explanation:
      'Both clauses are independent, and the second is a result of the first. A comma plus the coordinating conjunction "so" correctly joins them and shows the cause-and-effect relationship.',
    wrongAnswerExplanations: {
      B: 'A comma alone between two independent clauses is a comma splice.',
      C: '"So" without a comma fuses the two clauses into a run-on.',
      D: 'A semicolon plus "so" is redundant; the semicolon already joins the clauses without a conjunction.',
    },
    teachingPoint:
      '"So" is a FANBOYS coordinating conjunction: pair it with a comma before it, not a semicolon.',
  },
  {
    id: 'diag2-m2e-004',
    skillSlug: 'form-structure-sense',
    difficulty: 'easy',
    stimulus:
      'The results of the annual survey _______ published every January, giving residents a clear picture of how their neighborhood has changed.',
    question:
      'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { label: 'A', text: 'is' },
      { label: 'B', text: 'are' },
      { label: 'C', text: 'was' },
      { label: 'D', text: 'has been' },
    ],
    correctAnswer: 'B',
    explanation:
      'The subject is "results," which is plural, so the verb must be plural. "Are" agrees with "results," even though the singular noun "survey" appears in the phrase between them.',
    wrongAnswerExplanations: {
      A: '"Is" is singular and does not agree with the plural subject "results."',
      C: '"Was" is singular and also shifts to the past tense, which the present-tense sentence does not support.',
      D: '"Has been" is singular and does not agree with the plural subject "results."',
    },
    teachingPoint:
      'Find the true subject before the verb; ignore a singular noun inside an "of the ___" phrase.',
  },
  {
    id: 'diag2-m2e-005',
    skillSlug: 'transitions',
    difficulty: 'easy',
    stimulus:
      'Sea otters spend much of their day grooming their thick fur. _______ they lack the blubber that keeps most marine mammals warm, so clean, air-trapping fur is their main defense against the cold.',
    question: 'Which choice completes the text with the most logical transition?',
    choices: [
      { label: 'A', text: 'However,' },
      { label: 'B', text: 'After all,' },
      { label: 'C', text: 'Instead,' },
      { label: 'D', text: 'By comparison,' },
    ],
    correctAnswer: 'B',
    explanation:
      'The second sentence explains why otters groom so much: they lack blubber and rely on their fur for warmth. "After all" introduces this underlying reason for the behavior described first.',
    wrongAnswerExplanations: {
      A: '"However" signals contrast, but the second sentence supports rather than opposes the first.',
      C: '"Instead" signals a replacement, yet no alternative to grooming is being offered.',
      D: '"By comparison" sets up a comparison, but the second sentence gives a reason, not a comparison.',
    },
    teachingPoint:
      'When the second sentence explains why the first is true, a reason-giving transition like "after all" fits.',
  },
  {
    id: 'diag2-m2e-006',
    skillSlug: 'inferences',
    difficulty: 'easy',
    stimulus:
      'A greenhouse study found that tomato plants exposed to a gentle daily breeze from a fan grew shorter but developed noticeably thicker, stronger stems than plants grown in still air. Gardeners have long noticed that seedlings started indoors often topple over when first moved outside.',
    question:
      'Which choice most logically completes the text? The study suggests that indoor seedlings might grow sturdier if ______',
    choices: [
      { label: 'A', text: 'they were exposed to some air movement while growing.' },
      { label: 'B', text: 'they were kept in completely still air until fully grown.' },
      { label: 'C', text: 'they were given far more water than usual.' },
      { label: 'D', text: 'they were harvested earlier in the season.' },
    ],
    correctAnswer: 'A',
    explanation:
      'Plants exposed to a breeze grew thicker, stronger stems. Since indoor seedlings often topple, it follows that giving them some air movement while growing could make them sturdier.',
    wrongAnswerExplanations: {
      B: 'Still air produced weaker stems, so keeping seedlings in still air would not make them sturdier.',
      C: 'The study concerned air movement, not watering, so more water is unsupported.',
      D: 'Harvest timing is not connected to stem strength in the passage.',
    },
    teachingPoint:
      'A logical completion applies the study\'s finding directly; here, the breeze that strengthened stems is the fix for weak seedlings.',
  },
  {
    id: 'diag2-m2e-007',
    skillSlug: 'text-structure-purpose',
    difficulty: 'medium',
    stimulus:
      'Most people believe that the fastest way to cool a hot drink is to add ice immediately. Yet a quick experiment tells a different story. If you wait a few minutes before adding ice, the drink loses heat to the surrounding air first, so the ice you add later melts more slowly and cools the drink further.',
    question: 'What is the main purpose of the text?',
    choices: [
      { label: 'A', text: 'To explain why a common belief about cooling drinks is not quite right' },
      { label: 'B', text: 'To warn readers about the dangers of drinking beverages too hot' },
      { label: 'C', text: 'To compare different brands of ice available in stores' },
      { label: 'D', text: 'To argue that cold drinks are healthier than hot ones' },
    ],
    correctAnswer: 'A',
    explanation:
      'The passage states a common belief and then says an experiment "tells a different story," explaining a better method. Its purpose is to correct or refine that common belief about cooling drinks.',
    wrongAnswerExplanations: {
      B: 'The passage never warns about the danger of hot drinks; it discusses how to cool them efficiently.',
      C: 'No brands of ice are compared.',
      D: 'The passage does not claim cold drinks are healthier; it addresses cooling technique.',
    },
    teachingPoint:
      'When a text presents a belief and then says the evidence differs, its purpose is usually to correct or qualify that belief.',
  },
  {
    id: 'diag2-m2e-008',
    skillSlug: 'command-of-evidence',
    difficulty: 'medium',
    stimulus:
      'A researcher proposed that students who take handwritten notes remember lecture material better than students who type their notes. She planned a study to test this idea with two groups of students attending the same lectures.',
    question:
      'Which result, if true, would most directly support the researcher\'s proposal?',
    choices: [
      { label: 'A', text: 'On a test a week later, the handwriting group recalled more lecture material than the typing group.' },
      { label: 'B', text: 'The typing group finished writing their notes faster than the handwriting group.' },
      { label: 'C', text: 'Both groups reported enjoying the lectures equally.' },
      { label: 'D', text: 'The handwriting group used more colorful pens than the typing group.' },
    ],
    correctAnswer: 'A',
    explanation:
      'The proposal predicts that handwriting leads to better memory of material. A later test showing the handwriting group recalled more lecture material directly matches that predicted outcome.',
    wrongAnswerExplanations: {
      B: 'Finishing faster measures speed, not memory, so it does not support the claim about recall.',
      C: 'Equal enjoyment says nothing about which group remembered more.',
      D: 'Pen color is irrelevant to how well students remembered the material.',
    },
    teachingPoint:
      'Supporting evidence should measure the exact outcome the claim predicts, here memory of the material, not speed or enjoyment.',
  },
  {
    id: 'diag2-m2e-009',
    skillSlug: 'words-in-context',
    difficulty: 'medium',
    stimulus:
      'The editor was known for her [METICULOUS] attention to detail; she checked every date, spelling, and citation twice, and she returned any article with even a single error uncorrected.',
    question: 'As used in the text, [METICULOUS] most nearly means',
    choices: [
      { label: 'A', text: 'careless' },
      { label: 'B', text: 'thorough' },
      { label: 'C', text: 'friendly' },
      { label: 'D', text: 'hurried' },
    ],
    correctAnswer: 'B',
    explanation:
      'She "checked every date, spelling, and citation twice" and rejected any article with a single error. These details describe extremely careful, complete work, so "thorough" fits.',
    wrongAnswerExplanations: {
      A: '"Careless" is the opposite of the exacting behavior described.',
      C: '"Friendly" describes manner, which the passage does not address.',
      D: '"Hurried" suggests rushing, but checking everything twice describes patience, not haste.',
    },
    teachingPoint:
      'Let a list of careful actions define the word; checking things twice signals thoroughness, not speed or attitude.',
  },
  {
    id: 'diag2-m2e-010',
    skillSlug: 'boundaries',
    difficulty: 'medium',
    stimulus:
      'The lighthouse had guided ships for over a century _______ by the 1980s, satellite navigation had made its beam nearly obsolete.',
    question:
      'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { label: 'A', text: ', but' },
      { label: 'B', text: ',' },
      { label: 'C', text: ', however' },
      { label: 'D', text: 'but,' },
    ],
    correctAnswer: 'A',
    explanation:
      'Both clauses are independent, and they contrast the lighthouse\'s long service with its later obsolescence. A comma plus the coordinating conjunction "but" correctly joins them and marks the contrast.',
    wrongAnswerExplanations: {
      B: 'A comma alone between two independent clauses is a comma splice.',
      C: '"However" is a conjunctive adverb, so a comma before it still leaves a comma splice; it would need a semicolon.',
      D: 'The comma belongs before "but," not after it.',
    },
    teachingPoint:
      'For two independent clauses that contrast, use a comma plus "but," not a comma plus "however."',
  },
  {
    id: 'diag2-m2e-011',
    skillSlug: 'form-structure-sense',
    difficulty: 'medium',
    stimulus:
      'The scientist explained that the fossil, discovered deep in the canyon walls, _______ far older than any specimen the team had previously found.',
    question:
      'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { label: 'A', text: 'were' },
      { label: 'B', text: 'was' },
      { label: 'C', text: 'are' },
      { label: 'D', text: 'have been' },
    ],
    correctAnswer: 'B',
    explanation:
      'The subject is the singular noun "fossil"; the phrase "discovered deep in the canyon walls" is a modifier that does not change the subject. The singular verb "was" agrees with "fossil."',
    wrongAnswerExplanations: {
      A: '"Were" is plural and does not agree with the singular subject "fossil."',
      C: '"Are" is plural and does not agree with the singular subject "fossil."',
      D: '"Have been" is plural and does not agree with the singular subject "fossil."',
    },
    teachingPoint:
      'A descriptive phrase set off between commas does not affect subject-verb agreement; match the verb to the real subject.',
  },
  {
    id: 'diag2-m2e-012',
    skillSlug: 'transitions',
    difficulty: 'medium',
    stimulus:
      'The first electric cars of the early 1900s were quiet and easy to start. _______ they could travel only short distances before their heavy batteries needed recharging, which limited their appeal to city drivers.',
    question: 'Which choice completes the text with the most logical transition?',
    choices: [
      { label: 'A', text: 'Similarly,' },
      { label: 'B', text: 'Still,' },
      { label: 'C', text: 'As a result,' },
      { label: 'D', text: 'For instance,' },
    ],
    correctAnswer: 'B',
    explanation:
      'The first sentence lists advantages of early electric cars, and the second names a serious drawback. "Still" signals this contrast, showing the limitation despite the benefits.',
    wrongAnswerExplanations: {
      A: '"Similarly" signals likeness, but the second sentence contrasts with the first.',
      C: '"As a result" signals cause and effect, yet the short range is not caused by the cars being quiet and easy to start.',
      D: '"For instance" introduces an example, but the second sentence gives a drawback, not an example of the advantages.',
    },
    teachingPoint:
      'When benefits are followed by a drawback, a contrast transition like "still" or "however" is correct.',
  },
  {
    id: 'diag2-m2e-013',
    skillSlug: 'quantitative-evidence',
    difficulty: 'medium',
    stimulus:
      'A school tested whether a new tutoring program improved reading scores. Students who attended at least ten tutoring sessions raised their average reading score from 72 to 85 over the semester. Students who attended fewer than ten sessions saw their average rise only from 71 to 74.',
    question:
      'Which choice best uses data from the text to support the idea that attending more tutoring sessions helped students improve?',
    choices: [
      { label: 'A', text: 'Students who attended fewer than ten sessions started with an average score of 71.' },
      { label: 'B', text: 'Students who attended at least ten sessions raised their average from 72 to 85, a far larger gain than the lower-attendance group\'s rise from 71 to 74.' },
      { label: 'C', text: 'Both groups of students began the semester with similar average reading scores.' },
      { label: 'D', text: 'The tutoring program lasted for one full semester.' },
    ],
    correctAnswer: 'B',
    explanation:
      'The claim is that attending more sessions helped students improve. Comparing the high-attendance gain (72 to 85) with the low-attendance gain (71 to 74) shows a much larger improvement for frequent attenders, directly supporting the claim.',
    wrongAnswerExplanations: {
      A: 'The starting score of the low-attendance group alone shows no improvement or comparison.',
      C: 'Similar starting scores set up a fair comparison but do not show that more sessions helped.',
      D: 'The program\'s length describes the study, not the effect of attendance on improvement.',
    },
    teachingPoint:
      'To support a claim about "more helping," compare the gains of the two groups, not just one group\'s numbers.',
  },
  {
    id: 'diag2-m2e-014',
    skillSlug: 'rhetorical-synthesis',
    difficulty: 'medium',
    stimulus:
      'A student researching a bridge took these notes:\n\n- The Ironford Bridge opened in 1932.\n- It was the longest steel bridge in the state at the time.\n- It carries about 40,000 vehicles each day.\n- It was repainted and reinforced in 2018.',
    question:
      'The student wants to emphasize the bridge\'s importance to daily travel. Which choice most effectively uses the notes to accomplish this goal?',
    choices: [
      { label: 'A', text: 'The Ironford Bridge, which opened in 1932, carries about 40,000 vehicles each day.' },
      { label: 'B', text: 'The Ironford Bridge was repainted and reinforced in 2018.' },
      { label: 'C', text: 'When it opened, the Ironford Bridge was the longest steel bridge in the state.' },
      { label: 'D', text: 'The Ironford Bridge opened in 1932.' },
    ],
    correctAnswer: 'A',
    explanation:
      'The goal is to emphasize daily travel. Choice A highlights that the bridge carries "about 40,000 vehicles each day," the note that directly shows its importance to everyday travel.',
    wrongAnswerExplanations: {
      B: 'The 2018 repainting concerns maintenance, not daily travel.',
      C: 'Being the longest steel bridge emphasizes engineering, not daily use.',
      D: 'The opening date alone says nothing about daily travel.',
    },
    teachingPoint:
      'Choose the fact that matches the stated goal; for "daily travel," the traffic count is the relevant detail.',
  },
  {
    id: 'diag2-m2e-015',
    skillSlug: 'cross-text-connections',
    difficulty: 'medium',
    stimulus:
      'Text 1: Author Reyes argues that reading printed books helps people concentrate better than reading on screens, because printed pages have no notifications or links to distract the reader.\n\nText 2: Author Osei points out that many e-readers now offer distraction-free modes with no notifications at all, suggesting that the device matters less than how it is set up.',
    question: 'Based on the texts, Osei would most likely respond to Reyes by pointing out that',
    choices: [
      { label: 'A', text: 'printed books are more expensive than most e-readers.' },
      { label: 'B', text: 'screens can be set up to remove the distractions Reyes describes.' },
      { label: 'C', text: 'people should stop reading on screens entirely.' },
      { label: 'D', text: 'notifications improve concentration for most readers.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Reyes blames screens for distractions like notifications and links. Osei notes that e-readers now offer distraction-free modes, so he would respond that screens can be configured to remove exactly those distractions.',
    wrongAnswerExplanations: {
      A: 'Neither text discusses the cost of books or devices.',
      C: 'Osei defends screen reading, so he would not tell people to stop using screens.',
      D: 'Osei does not claim notifications help; he points out that they can be turned off.',
    },
    teachingPoint:
      'One author\'s response targets the specific assumption of the other; here Osei challenges the idea that screens are inherently distracting.',
  },
  {
    id: 'diag2-m2e-016',
    skillSlug: 'inferences',
    difficulty: 'hard',
    stimulus:
      'Certain desert plants open the pores in their leaves only at night, when the air is cool and moist, and keep them sealed during the scorching day. This timing lets them take in the carbon dioxide they need while losing far less water than plants that open their pores under the midday sun.',
    question:
      'Which choice most logically completes the text? This suggests that a plant\'s survival in the desert depends partly on ______',
    choices: [
      { label: 'A', text: 'when, rather than only whether, it opens its leaf pores.' },
      { label: 'B', text: 'growing far taller than surrounding plants.' },
      { label: 'C', text: 'avoiding the intake of carbon dioxide altogether.' },
      { label: 'D', text: 'keeping its leaf pores open at all hours of the day.' },
    ],
    correctAnswer: 'A',
    explanation:
      'The plants gain the same carbon dioxide but lose less water simply by opening their pores at night instead of at midday. The key factor is the timing of opening, so survival depends partly on when the pores open, not just whether they do.',
    wrongAnswerExplanations: {
      B: 'The passage says nothing about plant height as a survival factor.',
      C: 'The plants still take in carbon dioxide; they just do so at night, so avoiding it entirely is wrong.',
      D: 'Keeping pores open all day is exactly the water-wasting behavior these plants avoid.',
    },
    teachingPoint:
      'When a passage shows that the same action produces different results depending on when it happens, the inference should focus on timing.',
  },
]

// ── Module 2 (Hard branch): 16 questions (0 easy, 6 medium, 10 hard) ────────────
export const DIAGNOSTIC_M2_HARD_QUESTIONS: DrillQuestion[] = [
  {
    id: 'diag2-m2h-001',
    skillSlug: 'words-in-context',
    difficulty: 'hard',
    stimulus:
      'The senator\'s support for the treaty was, at best, [QUALIFIED]. She endorsed its broad goals in public statements yet privately attached so many conditions to her vote that allies wondered whether she would back it at all when the moment came.',
    question: 'As used in the text, [QUALIFIED] most nearly means',
    choices: [
      { label: 'A', text: 'certified' },
      { label: 'B', text: 'limited' },
      { label: 'C', text: 'skilled' },
      { label: 'D', text: 'enthusiastic' },
    ],
    correctAnswer: 'B',
    explanation:
      'Her support came "at best" with "so many conditions" that allies doubted it. "Qualified" here means restricted or hedged, so "limited" captures the sense of support offered only with reservations.',
    wrongAnswerExplanations: {
      A: '"Certified" is a common meaning of "qualified" but does not fit support hedged with conditions.',
      C: '"Skilled" is the most familiar meaning of "qualified," yet it describes ability, not the conditional nature of her support.',
      D: '"Enthusiastic" contradicts the passage, which shows hesitant, condition-laden support.',
    },
    teachingPoint:
      'Hard items often hinge on a secondary meaning; "qualified" can mean limited or hedged, not just credentialed.',
  },
  {
    id: 'diag2-m2h-002',
    skillSlug: 'words-in-context',
    difficulty: 'hard',
    stimulus:
      'Rather than settling the debate, the new fossil only [MUDDIED] it further. Each expert read the same delicate bones differently, and what had seemed a clear line of descent now branched into a tangle of competing family trees.',
    question: 'As used in the text, [MUDDIED] most nearly means',
    choices: [
      { label: 'A', text: 'clarified' },
      { label: 'B', text: 'dirtied' },
      { label: 'C', text: 'complicated' },
      { label: 'D', text: 'concluded' },
    ],
    correctAnswer: 'C',
    explanation:
      'Instead of settling the debate, the fossil turned a "clear line" into a "tangle of competing" theories. "Muddied" here means made more confusing, so "complicated" fits the figurative sense.',
    wrongAnswerExplanations: {
      A: '"Clarified" is the opposite; the fossil made the debate less clear, not more.',
      B: '"Dirtied" is the literal meaning of muddied but does not fit a debate becoming more confusing.',
      D: '"Concluded" suggests the debate ended, but the passage shows it grew more unsettled.',
    },
    teachingPoint:
      'A figurative verb like "muddied" takes its meaning from the result described; here a tangle of theories signals confusion, not literal dirt.',
  },
  {
    id: 'diag2-m2h-003',
    skillSlug: 'central-ideas-details',
    difficulty: 'hard',
    stimulus:
      'Economists once assumed that people always act to maximize their own financial gain. But in the "ultimatum game," one player offers to split a sum of money, and the second can accept or reject the split. Rejecting means both players get nothing. Time and again, players reject offers they consider unfair, walking away with nothing rather than accept a lopsided deal.',
    question: 'Which choice best states the main idea of the text?',
    choices: [
      { label: 'A', text: 'The ultimatum game is the most reliable way to study human decision-making.' },
      { label: 'B', text: 'People sometimes sacrifice financial gain to reject what they see as unfair.' },
      { label: 'C', text: 'Economists have never agreed on how people make financial decisions.' },
      { label: 'D', text: 'Players in the ultimatum game usually accept whatever offer they are given.' },
    ],
    correctAnswer: 'B',
    explanation:
      'The passage uses the ultimatum game to challenge the assumption that people always maximize gain, showing that players "reject offers they consider unfair" even at a cost to themselves. Choice B captures this central finding.',
    wrongAnswerExplanations: {
      A: 'The passage uses the game as evidence but never claims it is the most reliable method.',
      C: 'The text describes a shift in one assumption, not a permanent lack of agreement among economists.',
      D: 'The passage says the opposite: players often reject unfair offers rather than accept them.',
    },
    teachingPoint:
      'When an example is used to overturn an assumption, the main idea is the corrected view the example demonstrates.',
  },
  {
    id: 'diag2-m2h-004',
    skillSlug: 'text-structure-purpose',
    difficulty: 'hard',
    stimulus:
      'The following is adapted from a naturalist\'s field journal.\n\nI had come to the marsh expecting silence and found instead a chorus. The bittern\'s low boom rolled across the reeds like a distant drum; unseen frogs answered in a thousand small clicks; and beneath it all ran the ceaseless whisper of wind through the grass. To call such a place "empty," as the surveyors\' maps did, is to confess only that one has never listened.',
    question: 'What is the main function of the final sentence in the text?',
    choices: [
      { label: 'A', text: 'It summarizes the specific animal sounds the naturalist has just described.' },
      { label: 'B', text: 'It draws a pointed conclusion that rebukes a mistaken label for the marsh.' },
      { label: 'C', text: 'It introduces a new setting that contrasts with the marsh.' },
      { label: 'D', text: 'It admits that the naturalist\'s first impression of the marsh was correct.' },
    ],
    correctAnswer: 'B',
    explanation:
      'After cataloging the marsh\'s rich sounds, the final sentence concludes that calling the place "empty" only reveals that one "has never listened." This sharply rebukes the surveyors\' label as the product of not paying attention.',
    wrongAnswerExplanations: {
      A: 'The sentence does not restate the sounds; it delivers a judgment about the mistaken "empty" label.',
      C: 'No new setting is introduced; the focus stays on the marsh.',
      D: 'The naturalist expected silence but found a chorus, so the first impression was wrong, not confirmed.',
    },
    teachingPoint:
      'A closing sentence that turns detailed observations into a pointed judgment is functioning to drive home the author\'s corrected view.',
  },
  {
    id: 'diag2-m2h-005',
    skillSlug: 'command-of-evidence',
    difficulty: 'hard',
    stimulus:
      'A linguist argued that a rare language\'s unusual word order arose from contact with a neighboring language centuries ago, not from independent internal change. Critics counter that languages can develop similar structures on their own, without any outside influence.',
    question:
      'Which finding, if true, would most strongly support the linguist\'s argument over the critics\' objection?',
    choices: [
      { label: 'A', text: 'The rare language shares its unusual word order only with the specific neighboring language, and both borrowed vocabulary from each other during the same period.' },
      { label: 'B', text: 'Several unrelated languages around the world happen to share the same unusual word order.' },
      { label: 'C', text: 'The rare language has fewer speakers today than it did centuries ago.' },
      { label: 'D', text: 'The neighboring language has since changed its own word order.' },
    ],
    correctAnswer: 'A',
    explanation:
      'The linguist claims contact caused the word order. Evidence that the rare language shares this order specifically with its neighbor and that the two exchanged vocabulary at the same time points to contact rather than independent change, directly supporting the argument.',
    wrongAnswerExplanations: {
      B: 'Unrelated languages sharing the order supports the critics\' claim that such structures can arise independently.',
      C: 'The number of speakers today is unrelated to how the word order originated.',
      D: 'A later change in the neighbor\'s word order says nothing about whether contact caused the original feature.',
    },
    teachingPoint:
      'To support a "contact caused it" claim, look for evidence linking the two specific languages, not evidence that the feature appears widely and independently.',
  },
  {
    id: 'diag2-m2h-006',
    skillSlug: 'inferences',
    difficulty: 'hard',
    stimulus:
      'In a classic experiment, infants were shown two screens: one displaying the correct number of objects they had just watched being hidden, and one displaying an impossible number. Infants consistently stared longer at the impossible display. Because infants tend to look longer at events that violate their expectations, researchers concluded that even before they can speak, infants track small quantities.',
    question:
      'Which choice most logically completes the text? The reasoning depends on the assumption that ______',
    choices: [
      { label: 'A', text: 'infants prefer brightly colored screens to dull ones.' },
      { label: 'B', text: 'longer looking reliably signals that an infant finds something unexpected.' },
      { label: 'C', text: 'infants can be taught to count before they learn to speak.' },
      { label: 'D', text: 'the two screens were shown to infants in a random order.' },
    ],
    correctAnswer: 'B',
    explanation:
      'The conclusion that infants track quantities rests on treating longer looking as a sign of surprise at the impossible display. That link is an assumption: without it, the extra looking time would not indicate that infants noticed the wrong number.',
    wrongAnswerExplanations: {
      A: 'Color preference is never mentioned and is not what the researchers relied on.',
      C: 'The study concerns tracking small quantities, not teaching infants to count.',
      D: 'Randomized order affects experimental design, but the reasoning specifically depends on interpreting looking time as surprise.',
    },
    teachingPoint:
      'An argument\'s hidden assumption is the unstated link its conclusion needs; here, that longer looking means the infant was surprised.',
  },
  {
    id: 'diag2-m2h-007',
    skillSlug: 'cross-text-connections',
    difficulty: 'hard',
    stimulus:
      'Text 1: Critic Alvarez maintains that a novel\'s greatness lies in its language. A gripping plot may keep readers turning pages, she writes, but only prose of real beauty earns a book a lasting place in literature.\n\nText 2: Novelist Tan replies that this view flatters critics at the expense of readers. Most people, he observes, remember stories, not sentences; the novels that endure across generations are those whose plots grip the imagination, whatever their prose.',
    question: 'Based on the texts, Alvarez and Tan would most likely disagree over which of the following questions?',
    choices: [
      { label: 'A', text: 'Whether novels can contain both a strong plot and beautiful prose' },
      { label: 'B', text: 'Whether beautiful prose or a gripping plot is more essential to a novel\'s lasting greatness' },
      { label: 'C', text: 'Whether most readers finish the novels they begin' },
      { label: 'D', text: 'Whether critics read more novels than ordinary readers do' },
    ],
    correctAnswer: 'B',
    explanation:
      'Alvarez credits lasting greatness to beautiful language, while Tan credits it to gripping plots that readers remember. Their disagreement is precisely over which of these two elements is more essential to a novel\'s enduring greatness.',
    wrongAnswerExplanations: {
      A: 'Neither author denies a novel could have both; they dispute which element matters more.',
      C: 'Whether readers finish novels is not a point either author raises.',
      D: 'Tan mentions critics versus readers only in passing; the core dispute is about prose versus plot.',
    },
    teachingPoint:
      'To find the point of disagreement, identify the single question each author answers differently, not a side comment.',
  },
  {
    id: 'diag2-m2h-008',
    skillSlug: 'boundaries',
    difficulty: 'hard',
    stimulus:
      'The cartographer labored over the map for years, with every coastline traced from careful surveys, every mountain range shaded by hand _______ and when it was finally printed, collectors across the continent clamored for a copy.',
    question:
      'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { label: 'A', text: ',' },
      { label: 'B', text: ';' },
      { label: 'C', text: '.' },
      { label: 'D', text: ': and' },
    ],
    correctAnswer: 'A',
    explanation:
      'The descriptive phrase "with every coastline traced... shaded by hand" must be closed off before the sentence continues to its next clause. A comma closes that phrase, after which "and when it was finally printed..." attaches correctly to the main sentence.',
    wrongAnswerExplanations: {
      B: 'A semicolon requires an independent clause on each side, but "with every coastline traced... shaded by hand" is a modifying phrase, not a full sentence.',
      C: 'A period would strand the descriptive phrase before it as a fragment lacking its own subject and verb.',
      D: 'A colon plus "and" is ungrammatical here and does not introduce a list or clean elaboration.',
    },
    teachingPoint:
      'A descriptive "with..." phrase is set off with commas; it cannot stand on its own with a semicolon or period.',
  },
  {
    id: 'diag2-m2h-009',
    skillSlug: 'boundaries',
    difficulty: 'hard',
    stimulus:
      'The researchers reached a surprising conclusion _______ the coral colonies that survived the heat wave were not the largest or oldest, but rather those growing in patches of shifting shade.',
    question:
      'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { label: 'A', text: ':' },
      { label: 'B', text: ', which' },
      { label: 'C', text: ',' },
      { label: 'D', text: ' that' },
    ],
    correctAnswer: 'A',
    explanation:
      'The first clause is complete, and the words that follow state and explain the "surprising conclusion." A colon after a complete clause correctly introduces this elaboration.',
    wrongAnswerExplanations: {
      B: '", which the coral colonies that survived" is ungrammatical, since "which" cannot introduce a new full clause with its own subject here.',
      C: 'A comma alone joins two independent clauses, creating a comma splice.',
      D: '"That" produces "a surprising conclusion that the coral colonies... were," which is awkward and does not match the sentence, and it loses the clean introduction a colon provides.',
    },
    teachingPoint:
      'When a complete clause promises a conclusion and the next words deliver it, a colon is the precise choice for introducing that elaboration.',
  },
  {
    id: 'diag2-m2h-010',
    skillSlug: 'form-structure-sense',
    difficulty: 'hard',
    stimulus:
      'Neither the sweeping murals on the ceiling nor the intricate mosaic covering the floor _______ enough, on its own, to explain why the ancient hall still draws thousands of visitors each year.',
    question:
      'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { label: 'A', text: 'are' },
      { label: 'B', text: 'were' },
      { label: 'C', text: 'is' },
      { label: 'D', text: 'have been' },
    ],
    correctAnswer: 'C',
    explanation:
      'In a "neither...nor" subject, the verb agrees with the nearer noun, which is "the intricate mosaic," a singular. The singular present-tense verb "is" agrees with it and matches the present-tense clause "still draws."',
    wrongAnswerExplanations: {
      A: '"Are" is plural, but the nearer noun in the "neither...nor" pair is singular, so a plural verb is wrong.',
      B: '"Were" is plural and also shifts to the past tense, clashing with the present-tense "draws."',
      D: '"Have been" is plural and does not agree with the singular nearer noun "mosaic."',
    },
    teachingPoint:
      'With "neither...nor," the verb agrees with the noun closer to it, so check that nearer noun before choosing singular or plural.',
  },
  {
    id: 'diag2-m2h-011',
    skillSlug: 'form-structure-sense',
    difficulty: 'medium',
    stimulus:
      'The committee, after months of heated debate and several failed votes, _______ finally agreed on a design for the memorial.',
    question:
      'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { label: 'A', text: 'have' },
      { label: 'B', text: 'has' },
      { label: 'C', text: 'having' },
      { label: 'D', text: 'to have' },
    ],
    correctAnswer: 'B',
    explanation:
      '"The committee" is a singular collective noun acting as one unit, so it takes the singular verb "has." The long interrupting phrase between commas does not change the subject.',
    wrongAnswerExplanations: {
      A: '"Have" is plural and does not agree with the singular collective subject "the committee."',
      C: '"Having" is a participle, not a finite verb, so it leaves the sentence without a main verb.',
      D: '"To have" is an infinitive and cannot serve as the sentence\'s main verb here.',
    },
    teachingPoint:
      'Treat a collective noun like "committee" as singular when it acts as one unit, and ignore the interrupting phrase between commas.',
  },
  {
    id: 'diag2-m2h-012',
    skillSlug: 'transitions',
    difficulty: 'hard',
    stimulus:
      'The new bridge design was praised for cutting construction costs by nearly a third. Its slender supports, _______ demanded a more expensive maintenance schedule, since thinner steel had to be inspected far more often to guard against fatigue.',
    question: 'Which choice completes the text with the most logical transition?',
    choices: [
      { label: 'A', text: 'for instance,' },
      { label: 'B', text: 'however,' },
      { label: 'C', text: 'as a result,' },
      { label: 'D', text: 'in short,' },
    ],
    correctAnswer: 'B',
    explanation:
      'The first sentence praises the design\'s lower construction costs, but the second reveals a hidden cost: more expensive maintenance. "However" signals this contrast between the savings and the added expense.',
    wrongAnswerExplanations: {
      A: '"For instance" introduces an example, but the maintenance cost contradicts the savings rather than illustrating them.',
      C: '"As a result" signals that the higher maintenance follows from the lower construction cost, but the two are opposing effects, not a cause and its result.',
      D: '"In short" signals a summary, yet the second sentence adds a new, contrasting point rather than summarizing.',
    },
    teachingPoint:
      'When an initial benefit is offset by a hidden drawback, a contrast transition like "however" captures the reversal.',
  },
  {
    id: 'diag2-m2h-013',
    skillSlug: 'transitions',
    difficulty: 'medium',
    stimulus:
      'The town\'s recycling rate had stalled for years despite public campaigns. The council then began charging households by the bag for trash while keeping recycling free. _______ recycling rates climbed sharply within a single year.',
    question: 'Which choice completes the text with the most logical transition?',
    choices: [
      { label: 'A', text: 'Nonetheless,' },
      { label: 'B', text: 'Consequently,' },
      { label: 'C', text: 'By contrast,' },
      { label: 'D', text: 'Meanwhile,' },
    ],
    correctAnswer: 'B',
    explanation:
      'Charging for trash while keeping recycling free is the cause, and the sharp rise in recycling is its effect. "Consequently" correctly signals that the increase resulted from the new policy.',
    wrongAnswerExplanations: {
      A: '"Nonetheless" signals an unexpected result, but the rise is the expected outcome of the new charges.',
      C: '"By contrast" sets up an opposition, yet the rise follows directly from the policy rather than contrasting with it.',
      D: '"Meanwhile" signals simultaneous events, but the rise is a consequence of the policy, not a parallel event.',
    },
    teachingPoint:
      'When a policy is followed by its predictable effect, a cause-and-effect transition like "consequently" is correct.',
  },
  {
    id: 'diag2-m2h-014',
    skillSlug: 'rhetorical-synthesis',
    difficulty: 'hard',
    stimulus:
      'A student studying two methods of teaching swimming took these notes:\n\n- Method A introduces breathing techniques before any strokes.\n- Method B introduces strokes first and adds breathing later.\n- A study found Method A students passed a safety test after 6 weeks on average.\n- Method B students passed the same test after 9 weeks on average.',
    question:
      'The student wants to make a claim about the efficiency of Method A, supported by the study. Which choice most effectively uses the notes to accomplish this goal?',
    choices: [
      { label: 'A', text: 'Method A introduces breathing techniques before any strokes are taught.' },
      { label: 'B', text: 'Method A appears more efficient: its students passed the safety test after 6 weeks, three weeks sooner than Method B students.' },
      { label: 'C', text: 'Method B introduces strokes first and adds breathing techniques later.' },
      { label: 'D', text: 'Both methods aim to prepare students to pass the same safety test.' },
    ],
    correctAnswer: 'B',
    explanation:
      'The goal is a study-supported claim about Method A\'s efficiency. Choice B states the efficiency claim and backs it with the timing data (6 weeks versus 9), directly using the study results.',
    wrongAnswerExplanations: {
      A: 'This describes Method A\'s approach but makes no efficiency claim and cites no study data.',
      C: 'This describes Method B and offers no support for a claim about Method A\'s efficiency.',
      D: 'Noting a shared goal does not compare the methods\' efficiency.',
    },
    teachingPoint:
      'A study-supported claim must pair the assertion (more efficient) with the specific data that proves it (weeks to pass).',
  },
  {
    id: 'diag2-m2h-015',
    skillSlug: 'quantitative-evidence',
    difficulty: 'medium',
    stimulus:
      'A study tracked wolf and elk populations in a park after wolves were reintroduced. In the first five years, the elk population fell from about 17,000 to 9,000. Over the same period, the number of young aspen trees, which elk feed on heavily, roughly tripled as fewer elk browsed the saplings.',
    question:
      'Which choice best uses data from the text to support the claim that reintroducing wolves indirectly benefited aspen trees?',
    choices: [
      { label: 'A', text: 'The wolf population grew steadily after the animals were reintroduced.' },
      { label: 'B', text: 'As the elk population fell from about 17,000 to 9,000, the number of young aspen trees roughly tripled.' },
      { label: 'C', text: 'Elk feed heavily on young aspen trees throughout the year.' },
      { label: 'D', text: 'The study tracked both wolf and elk populations over five years.' },
    ],
    correctAnswer: 'B',
    explanation:
      'The claim is that wolves indirectly helped aspens by reducing elk. The paired data, elk dropping from 17,000 to 9,000 while young aspens roughly tripled, shows exactly this indirect benefit and supports the claim.',
    wrongAnswerExplanations: {
      A: 'Wolf population growth alone does not connect wolves to aspen recovery.',
      C: 'That elk eat aspens gives background but does not show the trees actually increased.',
      D: 'Describing what the study tracked is method, not evidence of the benefit.',
    },
    teachingPoint:
      'For an "indirect benefit" claim, choose the data pairing the middle cause (fewer elk) with the final effect (more aspens).',
  },
  {
    id: 'diag2-m2h-016',
    skillSlug: 'central-ideas-details',
    difficulty: 'medium',
    stimulus:
      'When the printing press spread through Europe, many scholars feared it would fill the world with error-ridden books and cheapen learning. In practice, the flood of printed texts forced readers to compare sources and weigh conflicting claims, sharpening the very habits of judgment the critics feared would decay.',
    question: 'Which choice best states the main idea of the text?',
    choices: [
      { label: 'A', text: 'The printing press produced more books filled with errors than scholars had predicted.' },
      { label: 'B', text: 'A technology feared to weaken careful thinking ended up strengthening it.' },
      { label: 'C', text: 'Scholars in Europe were generally opposed to new technologies.' },
      { label: 'D', text: 'Readers preferred handwritten books to printed ones for many years.' },
    ],
    correctAnswer: 'B',
    explanation:
      'The passage contrasts scholars\' fear that printing would "cheapen learning" with the outcome that it "sharpen[ed]" readers\' judgment. Choice B captures this reversal: a feared technology strengthened the very thinking it was expected to harm.',
    wrongAnswerExplanations: {
      A: 'The passage does not confirm that more error-filled books appeared; it emphasizes improved reading habits.',
      C: 'The text discusses one specific fear about printing, not a general opposition to all technology.',
      D: 'No comparison of reader preference for handwritten versus printed books is made.',
    },
    teachingPoint:
      'When a passage sets an expected fear against an opposite outcome, the main idea is that reversal, not either half alone.',
  },
]

// ── Routing + builders ──────────────────────────────────────────────────────────

export function routeToM2Branch(m1Correct: number, m1Total: number): 'easy' | 'hard' {
  if (m1Total <= 0) return 'easy'
  return m1Correct / m1Total >= M1_ROUTING_THRESHOLD ? 'hard' : 'easy'
}

export function buildDiagnosticM1Questions(): DrillQuestion[] {
  return DIAGNOSTIC_M1_QUESTIONS
}

export function buildDiagnosticM2EasyQuestions(): DrillQuestion[] {
  return DIAGNOSTIC_M2_EASY_QUESTIONS
}

export function buildDiagnosticM2HardQuestions(): DrillQuestion[] {
  return DIAGNOSTIC_M2_HARD_QUESTIONS
}
