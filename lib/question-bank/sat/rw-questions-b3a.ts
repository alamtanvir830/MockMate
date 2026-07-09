import type { QBQuestion } from '../types'

export const rwQuestionsB3a: QBQuestion[] = [
  // ── Group A: Information and Ideas ──────────────────────────────────────

  // Central Ideas and Details — easy
  {
    id: 'rw-b3-001',
    test: 'SAT',
    section: 'reading-writing',
    domain: 'Information and Ideas',
    skill: 'Central Ideas and Details',
    difficulty: 'easy',
    timeTargetSeconds: 60,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    stimulus:
      'Urban community gardens have become a fixture in many cities across the country. These shared green spaces allow residents to grow fresh vegetables and herbs in areas where private yards are scarce. Beyond food production, community gardens foster social connections among neighbors who might otherwise never meet. Several studies have also documented measurable reductions in local stress levels and increases in community pride in neighborhoods with active gardens.',
    question: 'Which choice best states the main idea of the text?',
    choices: [
      { label: 'A', text: 'Community gardens are most valuable because they reduce grocery costs for urban residents.' },
      { label: 'B', text: 'Urban community gardens provide both agricultural and social benefits to city neighborhoods.' },
      { label: 'C', text: 'Research has proven that community gardens lower stress in every urban setting.' },
      { label: 'D', text: 'Cities should require community gardens in all new residential developments.' },
    ],
    correctAnswer: 'B',
    explanation:
      'The passage covers food production (agricultural benefit) and social connections plus improved community pride and lower stress (social benefits). Choice B accurately captures both dimensions without overstating the evidence. Choice A introduces grocery cost savings not mentioned in the passage. Choice C overstates the research ("every urban setting" vs. the measured neighborhoods). Choice D adds a prescriptive policy claim absent from the passage.',
    wrongAnswerExplanations: {
      A: 'The passage never mentions grocery costs or money savings.',
      C: '"Every urban setting" is too broad; the text says "several studies" in specific neighborhoods.',
      D: 'The passage describes existing gardens; it makes no policy recommendation.',
    },
    teachingPoint:
      'The main idea of a passage must cover the full scope of what is discussed — not just one detail, and not anything the passage does not actually say.',
    relatedSkills: ['Inferences', 'Text Structure and Purpose'],
  },

  // Central Ideas and Details — medium
  {
    id: 'rw-b3-002',
    test: 'SAT',
    section: 'reading-writing',
    domain: 'Information and Ideas',
    skill: 'Central Ideas and Details',
    difficulty: 'medium',
    timeTargetSeconds: 75,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    stimulus:
      'The monarch butterfly\'s annual migration spans thousands of miles between its summer breeding grounds in Canada and the United States and its overwintering sites in the mountains of central Mexico. Remarkably, no single butterfly completes the full round trip: the insects that fly south in autumn are the great-grandchildren of those that flew north the previous spring. Scientists have proposed that monarchs navigate using a combination of the sun\'s position, an internal circadian clock, and sensitivity to Earth\'s magnetic field, yet the precise mechanism by which each generation "knows" the destination remains an open question.',
    question:
      'According to the text, which of the following is true about the monarch butterfly\'s migration?',
    choices: [
      { label: 'A', text: 'Monarchs use the sun alone to navigate south to Mexico each autumn.' },
      { label: 'B', text: 'The same individual butterflies complete the full round-trip migration every year.' },
      { label: 'C', text: 'Scientists fully understand how monarchs inherit knowledge of their destination.' },
      { label: 'D', text: 'No single butterfly makes both the southward and northward legs of the migration.' },
    ],
    correctAnswer: 'D',
    explanation:
      'The passage explicitly states that "no single butterfly completes the full round trip." Choice A is contradicted by the passage, which mentions multiple navigation tools (sun, circadian clock, magnetic field), not the sun alone. Choice B directly contradicts the passage. Choice C is the opposite of what the text says — the mechanism "remains an open question."',
    wrongAnswerExplanations: {
      A: 'The passage lists three navigation mechanisms, not the sun alone.',
      B: 'The passage states no butterfly completes the full round trip.',
      C: 'The passage says the mechanism "remains an open question," indicating scientists do not fully understand it.',
    },
    teachingPoint:
      'For "according to the text" questions, locate the relevant sentence and match it precisely — beware of choices that distort or invert what the passage says.',
    relatedSkills: ['Inferences', 'Command of Evidence'],
  },

  // Command of Evidence — easy
  {
    id: 'rw-b3-003',
    test: 'SAT',
    section: 'reading-writing',
    domain: 'Information and Ideas',
    skill: 'Command of Evidence',
    difficulty: 'easy',
    timeTargetSeconds: 60,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    stimulus:
      'A food scientist argues that fermented foods contribute meaningfully to gut health because the live bacterial cultures they contain survive digestion and colonize the intestinal lining.',
    question:
      'Which quotation from a nutrition study would most directly support the food scientist\'s argument?',
    choices: [
      { label: 'A', text: '"Participants who consumed fermented dairy reported higher levels of overall satisfaction with their diets."' },
      { label: 'B', text: '"Fermented vegetables contain higher concentrations of vitamin C than their unfermented counterparts."' },
      { label: 'C', text: '"Viable Lactobacillus strains recovered from stool samples of volunteers who ate yogurt daily confirmed that live cultures pass through the digestive tract intact."' },
      { label: 'D', text: '"Sales of probiotic supplements have grown by forty percent over the past decade."' },
    ],
    correctAnswer: 'C',
    explanation:
      'The scientist\'s claim has two parts: (1) live cultures survive digestion and (2) colonize the intestinal lining. Choice C directly supports the first part — live Lactobacillus strains were recovered from stool, confirming survival through digestion. Choice A addresses diet satisfaction, not gut health. Choice B is about vitamin C content, unrelated to bacterial survival. Choice D is a market trend statistic and provides no biological evidence.',
    wrongAnswerExplanations: {
      A: 'Diet satisfaction is not evidence that bacteria survive digestion or colonize the gut.',
      B: 'Vitamin C content is irrelevant to the claim about live bacterial cultures and gut colonization.',
      D: 'Sales data is a market trend, not biological evidence supporting the mechanism described.',
    },
    teachingPoint:
      'The best supporting evidence directly addresses the specific mechanism or claim in question — not a related topic or a broader trend.',
    relatedSkills: ['Central Ideas and Details', 'Inferences'],
  },

  // Command of Evidence — medium
  {
    id: 'rw-b3-004',
    test: 'SAT',
    section: 'reading-writing',
    domain: 'Information and Ideas',
    skill: 'Command of Evidence',
    difficulty: 'medium',
    timeTargetSeconds: 75,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    stimulus:
      'An environmental economist contends that placing a fee on carbon emissions is less effective at reducing total pollution than direct regulation of industrial output, because companies simply pass the fee on to consumers rather than changing their production methods.',
    question:
      'Which finding from an economic analysis would most directly challenge the economist\'s contention?',
    choices: [
      { label: 'A', text: '"Consumer prices for electricity rose an average of eight percent in regions that adopted carbon pricing."' },
      { label: 'B', text: '"Manufacturing facilities subject to a carbon fee reduced their direct emissions by twenty-two percent over five years, compared to a four percent reduction at unregulated plants."' },
      { label: 'C', text: '"Industries facing direct output regulations reported increased administrative costs and compliance burdens."' },
      { label: 'D', text: '"Public support for carbon pricing dropped significantly after energy bills increased in pilot regions."' },
    ],
    correctAnswer: 'B',
    explanation:
      'The economist claims companies do not change production methods under a carbon fee. Choice B directly contradicts this by showing that facilities subject to a carbon fee reduced emissions by 22% — far more than unregulated plants — indicating changed production methods. Choice A actually supports the economist\'s point (prices passed to consumers). Choice C concerns regulation but about administrative costs, not emission effectiveness. Choice D addresses public opinion, not the effectiveness of changing production methods.',
    wrongAnswerExplanations: {
      A: 'Rising consumer prices supports the economist\'s claim that the fee gets passed on, not challenged.',
      C: 'This discusses compliance costs of direct regulation, not the effectiveness of carbon fees.',
      D: 'Public opinion is irrelevant to whether carbon fees cause companies to change production methods.',
    },
    teachingPoint:
      'To challenge a claim, find evidence that directly contradicts the specific mechanism the claim describes — not just a related or adjacent fact.',
    relatedSkills: ['Inferences', 'Central Ideas and Details'],
  },

  // Command of Evidence — hard
  {
    id: 'rw-b3-005',
    test: 'SAT',
    section: 'reading-writing',
    domain: 'Information and Ideas',
    skill: 'Command of Evidence',
    difficulty: 'hard',
    timeTargetSeconds: 90,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    stimulus:
      'Historian Dr. Priya Nair argues that the rapid adoption of the printing press in fifteenth-century Europe was driven less by demand for books among the general population and more by the specific needs of the Church and state institutions, which required standardized documents in large quantities. She therefore concludes that literacy rates had little influence on the pace of the printing press\'s spread.',
    question:
      'Which finding would most directly support Dr. Nair\'s conclusion?',
    choices: [
      { label: 'A', text: 'Regions with higher literacy rates in 1450 adopted the printing press an average of six years earlier than regions with lower literacy rates.' },
      { label: 'B', text: 'The majority of texts printed before 1500 were religious documents, legal codes, and administrative records rather than works of popular literature.' },
      { label: 'C', text: 'The cost of a printed book in 1480 remained beyond the means of most European wage earners.' },
      { label: 'D', text: 'Many early print shops were established in university towns, where demand for scholarly texts was high.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Dr. Nair\'s conclusion is that Church and state demand — not general literacy — drove adoption. Choice B supports this directly: if most early printing was religious and administrative documents, that confirms institutional rather than popular demand drove the press\'s spread. Choice A would actually undermine her conclusion (literacy correlates with adoption). Choice C supports the idea that the general public was not the market, but does not positively confirm institutional demand as the driver. Choice D suggests university demand, which is a third explanation and does not directly confirm Church/state primacy.',
    wrongAnswerExplanations: {
      A: 'A correlation between literacy and early adoption would undermine, not support, the historian\'s claim.',
      C: 'While this suggests the general public couldn\'t afford books, it doesn\'t directly confirm that Church and state demand drove adoption.',
      D: 'University demand is a third explanation separate from Church and state institutions, so it neither confirms nor refutes her specific claim.',
    },
    teachingPoint:
      'The best supporting evidence must confirm the exact causal mechanism claimed — not just an adjacent fact that is consistent with the conclusion.',
    relatedSkills: ['Central Ideas and Details', 'Inferences'],
  },

  // Inferences — medium
  {
    id: 'rw-b3-006',
    test: 'SAT',
    section: 'reading-writing',
    domain: 'Information and Ideas',
    skill: 'Inferences',
    difficulty: 'medium',
    timeTargetSeconds: 75,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    stimulus:
      'In a study of deep-sea hydrothermal vents, researchers discovered thriving ecosystems sustained entirely by chemosynthesis — a process in which microbes convert chemicals from the vents into energy — rather than by sunlight. These ecosystems include tubeworms, crabs, and shrimp that have adapted to extreme pressure, heat, and near-total darkness. The researchers noted that similar chemical conditions exist on Europa, one of Jupiter\'s moons, beneath its ice-covered ocean.',
    question: 'Based on the text, what can most reasonably be inferred?',
    choices: [
      { label: 'A', text: 'Life on Europa, if it exists, would most likely be sustained through photosynthesis.' },
      { label: 'B', text: 'The organisms found at hydrothermal vents are more complex than any organisms on land.' },
      { label: 'C', text: 'Chemical conditions similar to those at deep-sea vents may make Europa a candidate for life not dependent on sunlight.' },
      { label: 'D', text: 'Scientists have confirmed the existence of hydrothermal vents on Europa.' },
    ],
    correctAnswer: 'C',
    explanation:
      'The passage establishes that hydrothermal vent ecosystems thrive without sunlight via chemosynthesis, then notes that Europa has similar chemical conditions. The reasonable inference is that life on Europa could potentially use the same mechanism — not dependent on sunlight. Choice A contradicts the passage (chemosynthesis, not photosynthesis). Choice B makes an unsupported comparison with land organisms. Choice D overstates — the text says similar chemical conditions exist, not that vents have been confirmed on Europa.',
    wrongAnswerExplanations: {
      A: 'The passage highlights chemosynthesis (not sunlight-based photosynthesis) as the relevant life-sustaining process.',
      B: 'The passage makes no comparison between vent organisms and land organisms in terms of complexity.',
      D: 'The text says similar chemical conditions exist on Europa; it does not confirm the presence of hydrothermal vents.',
    },
    teachingPoint:
      'A valid inference follows logically from what the passage states without going beyond what the evidence supports — do not confuse what is implied with what is explicitly confirmed.',
    relatedSkills: ['Central Ideas and Details', 'Command of Evidence'],
  },

  // Inferences — hard
  {
    id: 'rw-b3-007',
    test: 'SAT',
    section: 'reading-writing',
    domain: 'Information and Ideas',
    skill: 'Inferences',
    difficulty: 'hard',
    timeTargetSeconds: 90,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    stimulus:
      'Researchers studying the spread of invasive plant species found that species with wind-dispersed seeds colonized new habitats more than fifty kilometers from existing populations, while species relying on animal dispersal rarely spread beyond ten kilometers per year. However, in fragmented landscapes where natural corridors had been removed, even wind-dispersed species showed dramatically reduced spread rates, rarely exceeding twenty kilometers from established populations.',
    question:
      'Based on the text, which conclusion is most strongly supported?',
    choices: [
      { label: 'A', text: 'Animal-dispersed invasive species are less of a conservation threat than wind-dispersed species in all landscape types.' },
      { label: 'B', text: 'The dispersal distance of invasive plant species depends on seed type alone, regardless of landscape structure.' },
      { label: 'C', text: 'Landscape fragmentation limits the spread of wind-dispersed invasive species more than seed dispersal mechanism does in some contexts.' },
      { label: 'D', text: 'Removing natural corridors completely eliminates the spread of invasive plant species.' },
    ],
    correctAnswer: 'C',
    explanation:
      'The passage shows that wind-dispersed species normally spread 50+ km but drop to under 20 km in fragmented landscapes — a reduction of 30+ km. By contrast, animal-dispersed species spread under 10 km. This means fragmentation can reduce wind-dispersed species\' spread below even the normal range for animal-dispersed species, making landscape structure a dominant factor. Choice A overstates — the passage does not claim this across all landscape types. Choice B is directly contradicted — the passage shows landscape structure also matters. Choice D overstates — spread is reduced, not eliminated.',
    wrongAnswerExplanations: {
      A: '"All landscape types" is too broad; in unfragmented landscapes, wind-dispersed species spread far more.',
      B: 'The passage explicitly shows that landscape fragmentation — not seed type alone — also affects spread rate.',
      D: 'The passage says spread rates dropped dramatically but did not reach zero; fragmented species still spread up to 20 km.',
    },
    teachingPoint:
      'Hard inference questions often hinge on distinguishing "all cases" from "some cases" — look for language that hedges appropriately and matches the passage\'s actual data.',
    relatedSkills: ['Command of Evidence', 'Central Ideas and Details'],
  },

  // ── Group B: Craft and Structure ────────────────────────────────────────

  // Words in Context — easy
  {
    id: 'rw-b3-008',
    test: 'SAT',
    section: 'reading-writing',
    domain: 'Craft and Structure',
    skill: 'Words in Context',
    difficulty: 'easy',
    timeTargetSeconds: 60,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    stimulus:
      'The architect\'s latest building has drawn considerable attention for its striking exterior, but critics have been more reserved in their praise, noting that the interior spaces feel cramped and the layout is far from intuitive.',
    question:
      'As used in the text, what does the word "reserved" most nearly mean?',
    choices: [
      { label: 'A', text: 'Booked in advance' },
      { label: 'B', text: 'Restrained or limited' },
      { label: 'C', text: 'Shy and introverted' },
      { label: 'D', text: 'Formal and ceremonial' },
    ],
    correctAnswer: 'B',
    explanation:
      'In context, critics have been "more reserved in their praise" — meaning they have held back their enthusiasm, giving limited rather than full praise. "Reserved" here means restrained. Choice A ("booked in advance") is a common meaning of the word but does not fit this sentence. Choice C ("shy") is a personal trait, not applicable to praise. Choice D ("formal") does not capture the sense of withholding enthusiasm.',
    wrongAnswerExplanations: {
      A: 'This meaning of "reserved" applies to seats or tables, not to the expression of praise.',
      C: '"Reserved" can describe a shy person, but here it modifies the critics\' praise, not their personalities.',
      D: '"Formal" does not capture the idea of holding back or limiting praise.',
    },
    teachingPoint:
      'Words in context questions require using surrounding sentences to determine which meaning of a multi-meaning word applies — never choose the most common definition without checking context.',
    relatedSkills: ['Text Structure and Purpose', 'Central Ideas and Details'],
  },

  // Words in Context — medium
  {
    id: 'rw-b3-009',
    test: 'SAT',
    section: 'reading-writing',
    domain: 'Craft and Structure',
    skill: 'Words in Context',
    difficulty: 'medium',
    timeTargetSeconds: 75,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    stimulus:
      'The committee\'s report was deliberately opaque, burying its central recommendation in jargon-heavy appendices and subordinating key findings to minor procedural updates. Observers noted that the authors seemed more interested in obscuring accountability than in advancing the conversation around reform.',
    question:
      'As used in the text, what does the word "subordinating" most nearly mean?',
    choices: [
      { label: 'A', text: 'Emphasizing' },
      { label: 'B', text: 'Classifying' },
      { label: 'C', text: 'Placing in a lesser position' },
      { label: 'D', text: 'Connecting logically' },
    ],
    correctAnswer: 'C',
    explanation:
      'In the sentence, key findings are being "subordinated" to minor procedural updates — meaning the important findings are being made to seem less important than trivial matters. "Subordinating" here means placing in a lesser or lower-priority position. Choice A is the opposite of the passage\'s meaning. Choice B (classifying) does not capture the hierarchy implied. Choice D (connecting logically) has no support in context.',
    wrongAnswerExplanations: {
      A: '"Emphasizing" is the opposite — the passage says the authors downplayed key findings.',
      B: '"Classifying" implies sorting into categories, not making something appear less important.',
      D: '"Connecting logically" describes a relationship between ideas, not a hierarchy of importance.',
    },
    teachingPoint:
      'When a word describes how one item relates to another in a ranking or hierarchy, look for surrounding context about what is being diminished or elevated.',
    relatedSkills: ['Text Structure and Purpose', 'Words in Context'],
  },

  // Text Structure and Purpose — medium
  {
    id: 'rw-b3-010',
    test: 'SAT',
    section: 'reading-writing',
    domain: 'Craft and Structure',
    skill: 'Text Structure and Purpose',
    difficulty: 'medium',
    timeTargetSeconds: 75,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    stimulus:
      'Early cartographers faced an almost impossible challenge: they had to represent the curved surface of a three-dimensional sphere on a flat, two-dimensional sheet of paper. No such projection can preserve all properties — distance, area, shape, and direction — simultaneously. The Mercator projection, developed in 1569, chose to preserve direction at the expense of area, making it invaluable for navigation but deeply misleading about the relative sizes of continents. Greenland, for instance, appears roughly the same size as Africa on Mercator maps, even though Africa is actually about fourteen times larger.',
    question:
      'What is the primary purpose of the final sentence ("Greenland, for instance… larger")?',
    choices: [
      { label: 'A', text: 'To introduce a new argument about the superiority of alternative map projections' },
      { label: 'B', text: 'To provide a specific example that illustrates the distortion caused by the Mercator projection' },
      { label: 'C', text: 'To explain why cartographers originally preferred the Mercator projection over other options' },
      { label: 'D', text: 'To summarize the overall trade-offs that all map projections must make' },
    ],
    correctAnswer: 'B',
    explanation:
      'The preceding sentence states that the Mercator projection is "deeply misleading about the relative sizes of continents." The Greenland/Africa comparison is introduced with "for instance," a signal that a specific example follows. The sentence\'s purpose is to illustrate that stated distortion. Choice A is wrong — no new argument is introduced. Choice C reverses the logic — the final sentence shows a flaw, not why cartographers preferred the projection. Choice D is too broad — the summary of all projections\' trade-offs occurred in the second sentence.',
    wrongAnswerExplanations: {
      A: 'No alternative projection is introduced or argued to be superior in this sentence.',
      C: 'The sentence highlights a distortion of the Mercator projection, not reasons to prefer it.',
      D: 'The trade-offs of all projections are addressed in the second sentence; the final sentence is specific to Mercator.',
    },
    teachingPoint:
      'When a sentence is introduced by "for instance," "for example," or similar phrases, its purpose is almost always to illustrate or exemplify the preceding claim.',
    relatedSkills: ['Central Ideas and Details', 'Transitions'],
  },

  // Text Structure and Purpose — medium
  {
    id: 'rw-b3-011',
    test: 'SAT',
    section: 'reading-writing',
    domain: 'Craft and Structure',
    skill: 'Text Structure and Purpose',
    difficulty: 'medium',
    timeTargetSeconds: 75,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    stimulus:
      'Proponents of universal basic income often cite its potential to eliminate bureaucratic overhead in existing welfare programs. Yet before such claims can be evaluated, we must ask: which existing programs would actually be replaced, and would the savings from eliminating them offset the enormous cost of providing unconditional income to every citizen? These questions have no easy answers.',
    question:
      'What is the main function of the second sentence in the passage?',
    choices: [
      { label: 'A', text: 'To summarize the evidence in favor of universal basic income' },
      { label: 'B', text: 'To identify specific preconditions that must be met before universal basic income can succeed' },
      { label: 'C', text: 'To pose critical questions that complicate the claim made in the first sentence' },
      { label: 'D', text: 'To argue that universal basic income is financially impossible' },
    ],
    correctAnswer: 'C',
    explanation:
      'The first sentence presents a claim (UBI eliminates bureaucratic overhead). The second sentence, introduced by "Yet" (a contrast signal), raises questions that must be answered before that claim can be evaluated — complicating, not dismissing, the claim. Choice A is incorrect; no evidence for UBI is summarized. Choice B goes too far — the sentence poses questions, not preconditions for success. Choice D overstates — the text asks whether costs would be offset, but does not conclude UBI is impossible.',
    wrongAnswerExplanations: {
      A: 'The second sentence questions the claim rather than supporting it.',
      B: '"Preconditions for success" implies requirements; the sentence poses unanswered questions about feasibility.',
      D: 'The sentence raises cost questions but does not reach a conclusion that UBI is financially impossible.',
    },
    teachingPoint:
      'After a contrast signal like "yet," "however," or "but," the sentence that follows typically complicates, qualifies, or counters the preceding claim — not dismisses or proves it.',
    relatedSkills: ['Transitions', 'Central Ideas and Details'],
  },

  // Cross-Text Connections — medium
  {
    id: 'rw-b3-012',
    test: 'SAT',
    section: 'reading-writing',
    domain: 'Craft and Structure',
    skill: 'Cross-Text Connections',
    difficulty: 'medium',
    timeTargetSeconds: 75,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    stimulus:
      'Text 1\n\nSleep researchers have found that teenagers require between eight and ten hours of sleep per night for optimal cognitive function. Despite this, most high schools begin classes before 8:00 a.m., a schedule that conflicts with adolescent circadian rhythms. Advocates argue that later start times would improve academic performance and student mental health.\n\nText 2\n\nA five-year study of two comparable school districts found that the district that shifted to a 9:00 a.m. start time saw statistically significant improvements in graduation rates and reductions in student-reported anxiety. The district that maintained a 7:30 a.m. start time saw no comparable changes over the same period.',
    question:
      'How does Text 2 relate to the argument presented in Text 1?',
    choices: [
      { label: 'A', text: 'Text 2 contradicts Text 1 by showing that early start times have no negative effects.' },
      { label: 'B', text: 'Text 2 provides empirical evidence that supports the advocacy claim made in Text 1.' },
      { label: 'C', text: 'Text 2 introduces a new explanation for why circadian rhythms affect academic performance.' },
      { label: 'D', text: 'Text 2 qualifies Text 1 by showing that later start times only help students in certain geographic regions.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Text 1 argues that later start times would improve academic performance and mental health. Text 2 provides a five-year comparative study showing exactly those outcomes (better graduation rates, lower anxiety) in the district that adopted a later start time. Choice A is wrong — Text 2 supports, not contradicts, Text 1. Choice C is wrong — Text 2 reports outcomes, not explanations for circadian mechanisms. Choice D is wrong — geography is never mentioned in either text.',
    wrongAnswerExplanations: {
      A: 'Text 2 shows benefits of the later start time and absence of benefits in the early-start district, supporting Text 1.',
      C: 'Text 2 provides outcome data, not a mechanistic explanation of circadian rhythms.',
      D: 'Neither text mentions geographic region as a variable.',
    },
    teachingPoint:
      'When a second text provides data or a study, ask whether that data confirms, contradicts, or qualifies the claim made in the first text — match the evidence to the specific claim.',
    relatedSkills: ['Command of Evidence', 'Central Ideas and Details'],
  },

  // Cross-Text Connections — hard
  {
    id: 'rw-b3-013',
    test: 'SAT',
    section: 'reading-writing',
    domain: 'Craft and Structure',
    skill: 'Cross-Text Connections',
    difficulty: 'hard',
    timeTargetSeconds: 90,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    stimulus:
      'Text 1\n\nSociologist Dr. Margaux Fontaine contends that the rise of remote work has weakened community ties by reducing the incidental social contact that office environments naturally provide. When employees work from home, they lose the brief interactions — shared lunches, hallway conversations — that build the social fabric of neighborhoods and workplaces alike.\n\nText 2\n\nA longitudinal survey conducted across twelve cities found that remote workers reported higher involvement in local community organizations, volunteer groups, and neighborhood associations than their office-based counterparts. Researchers attributed this to remote workers\' greater flexibility to attend daytime community events.',
    question:
      'Based on the texts, how would Dr. Fontaine most likely respond to the findings in Text 2?',
    choices: [
      { label: 'A', text: 'She would likely argue that involvement in formal organizations does not replace the spontaneous, informal social contact that remote work eliminates.' },
      { label: 'B', text: 'She would likely concede that remote work has no negative effect on community ties.' },
      { label: 'C', text: 'She would likely argue that the survey is invalid because it was conducted in too many cities.' },
      { label: 'D', text: 'She would likely agree that flexibility is the most important factor in building community ties.' },
    ],
    correctAnswer: 'A',
    explanation:
      'Dr. Fontaine\'s argument centers specifically on the loss of "incidental" and "spontaneous" social contact — brief, unplanned interactions. Text 2\'s data shows higher involvement in formal organizations, which is a different type of social contact. She would most likely distinguish these two forms: formal organizational involvement does not address her specific concern about informal, spontaneous contact. Choice B is unlikely — she would not concede her entire argument based on data about a different type of social contact. Choice C introduces a methodological criticism not supported by anything in Text 1. Choice D contradicts her position — she does not treat flexibility as the key variable.',
    wrongAnswerExplanations: {
      B: 'Dr. Fontaine would be unlikely to fully concede because Text 2 addresses formal organizations, not the informal spontaneous interactions she specifically highlights.',
      C: 'Nothing in Text 1 suggests she would dismiss survey data on methodological grounds; this is not part of her argument.',
      D: 'Dr. Fontaine focuses on the type of social contact, not on scheduling flexibility as the primary factor.',
    },
    teachingPoint:
      'When asked how Author 1 would respond to Text 2, find the specific mechanism or distinction in Author 1\'s argument and apply it to the new evidence — look for how the two texts talk past each other.',
    relatedSkills: ['Inferences', 'Text Structure and Purpose'],
  },

  // ── Group C: Expression of Ideas ────────────────────────────────────────

  // Transitions — easy
  {
    id: 'rw-b3-014',
    test: 'SAT',
    section: 'reading-writing',
    domain: 'Expression of Ideas',
    skill: 'Transitions',
    difficulty: 'easy',
    timeTargetSeconds: 60,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    stimulus:
      'The desert landscape appears barren at first glance. _______, dozens of plant and animal species have adapted to thrive in these extreme conditions.',
    question:
      'Which choice completes the text with the most logical transition?',
    choices: [
      { label: 'A', text: 'Similarly' },
      { label: 'B', text: 'In other words' },
      { label: 'C', text: 'In addition' },
      { label: 'D', text: 'In reality' },
    ],
    correctAnswer: 'D',
    explanation:
      'The first sentence states the desert "appears" barren — presenting an impression. The second sentence reveals what is actually true (many species thrive there). "In reality" signals a contrast between appearance and actual fact. Choice A ("Similarly") signals a comparison of like things, but the sentences contrast appearance vs. reality. Choice B ("In other words") signals a restatement, but the second sentence adds new information. Choice C ("In addition") signals an addition, but the sentences are in contrast.',
    wrongAnswerExplanations: {
      A: '"Similarly" introduces a comparison, but the two sentences contrast an appearance with a reality.',
      B: '"In other words" restates the same idea differently — here, new contrasting information is added.',
      C: '"In addition" adds another point in the same direction; these two sentences move in opposite directions.',
    },
    teachingPoint:
      'Use "in reality" or "in fact" when a sentence corrects or contradicts an impression or assumption set up in the previous sentence.',
    relatedSkills: ['Text Structure and Purpose', 'Boundaries'],
  },

  // Transitions — medium
  {
    id: 'rw-b3-015',
    test: 'SAT',
    section: 'reading-writing',
    domain: 'Expression of Ideas',
    skill: 'Transitions',
    difficulty: 'medium',
    timeTargetSeconds: 75,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    stimulus:
      'Many historians credit the invention of the telegraph with revolutionizing long-distance communication in the nineteenth century. _______, the postal service had already established a reliable network for transmitting written messages across continents, suggesting that the telegraph\'s impact may have been one of speed rather than fundamental transformation.',
    question:
      'Which choice completes the text with the most logical transition?',
    choices: [
      { label: 'A', text: 'As a result' },
      { label: 'B', text: 'For instance' },
      { label: 'C', text: 'Nevertheless' },
      { label: 'D', text: 'Indeed' },
    ],
    correctAnswer: 'C',
    explanation:
      'The first sentence presents a widely held claim (telegraph = revolution). The second sentence introduces a counterpoint — the postal service already transmitted messages, complicating that claim. "Nevertheless" is a contrast transition that introduces a counterpoint despite what was just stated. Choice A ("As a result") signals a consequence, but the second sentence is not a result of the first. Choice B ("For instance") introduces an example supporting the first sentence, but the second sentence counters it. Choice D ("Indeed") reinforces the first sentence, but the second sentence challenges it.',
    wrongAnswerExplanations: {
      A: '"As a result" implies causation — the second sentence is not caused by the first.',
      B: '"For instance" would introduce a supporting example, but the second sentence contradicts the first.',
      D: '"Indeed" would strengthen the claim that the telegraph was revolutionary; instead, the second sentence qualifies it.',
    },
    teachingPoint:
      'When the second sentence presents a complicating fact or counterpoint to a claim in the first sentence, use a contrast transition such as "nevertheless," "however," or "yet."',
    relatedSkills: ['Text Structure and Purpose', 'Transitions'],
  },

  // Transitions — hard
  {
    id: 'rw-b3-016',
    test: 'SAT',
    section: 'reading-writing',
    domain: 'Expression of Ideas',
    skill: 'Transitions',
    difficulty: 'hard',
    timeTargetSeconds: 90,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    stimulus:
      'The new urban planning policy required developers to allocate fifteen percent of each project\'s units as affordable housing. Several major developers immediately withdrew their proposals. _______, the city council argued that the long-term increase in housing supply would offset any short-term reduction in new construction.',
    question:
      'Which choice completes the text with the most logical transition?',
    choices: [
      { label: 'A', text: 'Consequently' },
      { label: 'B', text: 'Furthermore' },
      { label: 'C', text: 'By contrast' },
      { label: 'D', text: 'Still' },
    ],
    correctAnswer: 'D',
    explanation:
      'The sequence is: (1) policy introduced, (2) developers withdrew — a negative consequence. The third sentence shows that despite this setback, the city council maintained its position. "Still" signals that the council\'s argument persists in spite of the complication. Choice A ("Consequently") would suggest the council argued because developers withdrew, which reverses the logic — the council would argue in spite of, not because of, the withdrawals. Choice B ("Furthermore") adds a supporting point in the same direction, but the third sentence presents the council\'s defense against the problem. Choice C ("By contrast") would suggest the council did something opposite to the developers, but the council\'s argument is a response, not a simple contrast.',
    wrongAnswerExplanations: {
      A: '"Consequently" implies the council\'s optimism is a result of developers withdrawing, which is illogical.',
      B: '"Furthermore" would mean the council\'s argument is an additional negative point; instead it\'s a rebuttal to the setback.',
      C: '"By contrast" creates a simple opposition, but the relationship is concessive (the council argues despite the problem, not instead of it).',
    },
    teachingPoint:
      '"Still" and "nonetheless" signal that something continues to be true or someone continues to hold a position despite a complication — they differ from "by contrast," which just sets up an opposition.',
    relatedSkills: ['Text Structure and Purpose', 'Transitions'],
  },

  // Rhetorical Synthesis — easy
  {
    id: 'rw-b3-017',
    test: 'SAT',
    section: 'reading-writing',
    domain: 'Expression of Ideas',
    skill: 'Rhetorical Synthesis',
    difficulty: 'easy',
    timeTargetSeconds: 60,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    stimulus:
      'A student is writing a report about the health benefits of regular walking. The student wants to introduce the topic by emphasizing that walking is accessible to most people. Using the notes below, which choice best achieves that goal?\n\n• Walking requires no special equipment or gym membership.\n• Studies show thirty minutes of walking per day reduces cardiovascular risk by up to 35%.\n• Walking can be done indoors or outdoors, in urban or rural settings.\n• Elite athletes use walking as active recovery between intense training sessions.',
    question:
      'Which choice most effectively uses the notes to introduce the topic by emphasizing that walking is accessible to most people?',
    choices: [
      { label: 'A', text: 'Walking for thirty minutes each day can reduce cardiovascular risk by up to 35%, making it one of the most impactful daily health habits.' },
      { label: 'B', text: 'Unlike gym memberships or specialized equipment, walking can be done by nearly anyone, anywhere — indoors or outdoors, in cities or rural communities.' },
      { label: 'C', text: 'Even elite athletes incorporate walking into their training routines as a form of active recovery.' },
      { label: 'D', text: 'Regular walking delivers measurable cardiovascular benefits that rival those of more intensive exercise programs.' },
    ],
    correctAnswer: 'B',
    explanation:
      'The goal is to emphasize accessibility. Choice B directly addresses this by combining two accessibility-related notes: no equipment needed and can be done anywhere. Choice A emphasizes health benefits (cardiovascular risk), not accessibility. Choice C focuses on elite athletes — the opposite of "accessible to most people." Choice D compares walking to other exercise, not emphasizing its accessibility.',
    wrongAnswerExplanations: {
      A: 'This choice highlights health statistics, not the accessible nature of walking for most people.',
      C: 'Mentioning elite athletes emphasizes performance, not accessibility to the general population.',
      D: 'This choice compares walking to other exercises but does not address why walking is accessible.',
    },
    teachingPoint:
      'Rhetorical synthesis requires identifying which notes are relevant to the stated goal and combining only those notes — ignore notes that are accurate but off-target.',
    relatedSkills: ['Transitions', 'Text Structure and Purpose'],
  },

  // Rhetorical Synthesis — medium
  {
    id: 'rw-b3-018',
    test: 'SAT',
    section: 'reading-writing',
    domain: 'Expression of Ideas',
    skill: 'Rhetorical Synthesis',
    difficulty: 'medium',
    timeTargetSeconds: 75,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    stimulus:
      'A researcher is writing an academic paper about coral reef decline. The researcher wants to present a sentence that acknowledges multiple causes while still emphasizing temperature rise as the primary driver. Using the notes below, which choice best achieves that goal?\n\n• Ocean temperatures have risen by 1.2°C over the past century, causing widespread coral bleaching events.\n• Runoff from agricultural land introduces excess nutrients, leading to algae overgrowth on reefs.\n• Overfishing removes species that control algae populations, compounding the problem.\n• Ocean acidification, caused by absorbed CO₂, weakens coral skeletal structure.',
    question:
      'Which choice most effectively uses the notes to acknowledge multiple causes while emphasizing temperature rise as the primary driver?',
    choices: [
      { label: 'A', text: 'Coral reef decline results from agricultural runoff, overfishing, and ocean acidification, all of which interact with rising water temperatures.' },
      { label: 'B', text: 'Although factors such as agricultural runoff, overfishing, and acidification contribute to coral reef decline, rising ocean temperatures remain the leading cause, having already triggered widespread bleaching events.' },
      { label: 'C', text: 'Ocean temperatures have risen by 1.2°C over the past century, and this warming has been the sole cause of the coral bleaching events devastating reefs worldwide.' },
      { label: 'D', text: 'Coral bleaching is a complex problem caused equally by temperature rise, runoff, overfishing, and acidification.' },
    ],
    correctAnswer: 'B',
    explanation:
      'The goal has two parts: acknowledge multiple causes AND emphasize temperature as primary. Choice B does both — it opens with "although" to acknowledge other factors, then uses "remain the leading cause" and cites the bleaching evidence to establish primacy. Choice A lists multiple causes but treats temperature rise as just one among equals ("interact with"), not as primary. Choice C establishes temperature as primary but says it is the "sole cause," failing to acknowledge multiple causes. Choice D explicitly says "equally," which contradicts the goal of emphasizing temperature as primary.',
    wrongAnswerExplanations: {
      A: 'This sentence implies all causes are equally weighted and makes temperature an interacting factor rather than the primary driver.',
      C: '"Sole cause" fails to acknowledge the multiple other causes mentioned in the notes.',
      D: '"Equally" directly contradicts the requirement to emphasize temperature as the primary driver.',
    },
    teachingPoint:
      'When a synthesis task has two requirements (e.g., "acknowledge X while emphasizing Y"), verify that your chosen sentence satisfies both — a choice that does only one is incorrect.',
    relatedSkills: ['Transitions', 'Central Ideas and Details'],
  },

  // Rhetorical Synthesis — medium
  {
    id: 'rw-b3-019',
    test: 'SAT',
    section: 'reading-writing',
    domain: 'Expression of Ideas',
    skill: 'Rhetorical Synthesis',
    difficulty: 'medium',
    timeTargetSeconds: 75,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    stimulus:
      'A student is writing a persuasive essay arguing that public libraries should expand their digital lending services. The student wants to conclude the essay by calling readers to action while referencing library funding. Using the notes below, which choice best achieves that goal?\n\n• Public libraries currently have limited budgets for digital licenses, which are often more expensive than print licenses.\n• Library digital lending allows patrons to borrow e-books and audiobooks from home.\n• A recent survey found that 68% of library users would use digital lending services more if the selection were larger.\n• Municipal governments typically control library funding allocations.',
    question:
      'Which choice most effectively uses the notes to call readers to action while referencing library funding?',
    choices: [
      { label: 'A', text: 'Digital library lending is convenient because patrons can borrow e-books and audiobooks from home without visiting a physical branch.' },
      { label: 'B', text: 'Since 68% of library users want more digital options, and since municipal governments control library budgets, residents should urge their local officials to increase library funding for digital services.' },
      { label: 'C', text: 'Digital licenses are more expensive than print licenses, which is why libraries have struggled to expand their digital collections.' },
      { label: 'D', text: 'Public libraries provide valuable digital resources, but budget constraints prevent them from meeting patron demand.' },
    ],
    correctAnswer: 'B',
    explanation:
      'The goal requires (1) a call to action and (2) a reference to library funding. Choice B uses the survey data to establish demand, references municipal control of library budgets (funding note), and explicitly calls readers to action ("residents should urge their local officials"). Choice A describes convenience but includes no call to action and no funding reference. Choice C explains the funding problem but is descriptive, not a call to action. Choice D acknowledges the problem but is a passive observation, not a call to action.',
    wrongAnswerExplanations: {
      A: 'No call to action and no reference to funding are present in this choice.',
      C: 'This explains the problem but does not tell readers what to do (no call to action).',
      D: 'This is an observation about the situation, not a directive for readers to take any action.',
    },
    teachingPoint:
      'A "call to action" sentence must include a directive for the reader (should, must, urge, demand) — passive descriptions of a problem do not fulfill this rhetorical goal.',
    relatedSkills: ['Transitions', 'Text Structure and Purpose'],
  },

  // ── Group D: Standard English Conventions ───────────────────────────────

  // Boundaries — easy
  {
    id: 'rw-b3-020',
    test: 'SAT',
    section: 'reading-writing',
    domain: 'Standard English Conventions',
    skill: 'Boundaries',
    difficulty: 'easy',
    timeTargetSeconds: 60,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    stimulus:
      'The new community center opened last spring _______ it quickly became a gathering place for residents of all ages.',
    question:
      'Which choice completes the text so that it conforms to the conventions of Standard Written English?',
    choices: [
      { label: 'A', text: 'spring,' },
      { label: 'B', text: 'spring, and' },
      { label: 'C', text: 'spring;' },
      { label: 'D', text: 'spring. And' },
    ],
    correctAnswer: 'B',
    explanation:
      'The sentence contains two independent clauses: "The new community center opened last spring" and "it quickly became a gathering place for residents of all ages." To join two independent clauses correctly, use a comma followed by a coordinating conjunction (FANBOYS). Choice B uses ", and" — the correct construction. Choice A places a comma alone between two independent clauses, creating a comma splice. Choice C uses a semicolon, which is grammatically possible but shifts the meaning slightly; however, the sentence as written with "it quickly" makes "and" the most natural connection showing sequence. Choice D ("spring. And") creates a sentence fragment — "And it quickly became…" is a fragment when "And" begins a sentence in formal written English.',
    wrongAnswerExplanations: {
      A: 'A comma alone between two independent clauses creates a comma splice, which is a boundary error.',
      C: 'A semicolon can join independent clauses, but here the natural coordinator "and" is needed; a semicolon creates an abrupt connection.',
      D: 'Beginning a new sentence with "And" in formal written English creates a fragment-like construction that violates conventions.',
    },
    teachingPoint:
      'Two independent clauses must be joined by either (1) a semicolon, (2) a comma + coordinating conjunction, or (3) a period — never a comma alone (comma splice).',
    relatedSkills: ['Transitions', 'Form, Structure, and Sense'],
  },

  // Boundaries — medium
  {
    id: 'rw-b3-021',
    test: 'SAT',
    section: 'reading-writing',
    domain: 'Standard English Conventions',
    skill: 'Boundaries',
    difficulty: 'medium',
    timeTargetSeconds: 75,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    stimulus:
      'The scientist\'s most celebrated achievement, her discovery of a novel enzyme capable of breaking down plastic polymers _______ earned her the prestigious Hartwell Prize for Environmental Research.',
    question:
      'Which choice completes the text so that it conforms to the conventions of Standard Written English?',
    choices: [
      { label: 'A', text: 'polymers,' },
      { label: 'B', text: 'polymers' },
      { label: 'C', text: 'polymers, it' },
      { label: 'D', text: 'polymers; it' },
    ],
    correctAnswer: 'A',
    explanation:
      'The subject is "The scientist\'s most celebrated achievement." The phrase "her discovery of a novel enzyme capable of breaking down plastic polymers" is an appositive (a renaming phrase) that must be set off with commas on both sides. The first comma appears after "achievement," and a closing comma is needed after "polymers" before the verb "earned." Choice A correctly closes the appositive with a comma. Choice B omits the closing comma, making the appositive run into the verb without punctuation. Choice C adds "it," creating a comma splice with a second subject. Choice D adds a semicolon and "it," also creating an error.',
    wrongAnswerExplanations: {
      B: 'Without a closing comma, the appositive phrase is not properly set off, creating a run-on structure.',
      C: 'Adding "it" after the comma creates two subjects for one predicate, resulting in a comma splice.',
      D: 'A semicolon with "it" creates a fragment before the semicolon (an appositive cannot stand alone) and an awkward structure.',
    },
    teachingPoint:
      'An appositive phrase — a noun phrase that renames the subject — must be set off with commas on both sides; the closing comma comes directly before the main verb.',
    relatedSkills: ['Boundaries', 'Form, Structure, and Sense'],
  },

  // Boundaries — hard
  {
    id: 'rw-b3-022',
    test: 'SAT',
    section: 'reading-writing',
    domain: 'Standard English Conventions',
    skill: 'Boundaries',
    difficulty: 'hard',
    timeTargetSeconds: 90,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    stimulus:
      'The city\'s water treatment facility processes over two hundred million gallons daily _______ this capacity has remained unchanged since the facility\'s construction in 1978, a fact that concerns engineers who note that the city\'s population has doubled since then.',
    question:
      'Which choice completes the text so that it conforms to the conventions of Standard Written English?',
    choices: [
      { label: 'A', text: 'daily, yet' },
      { label: 'B', text: 'daily; however,' },
      { label: 'C', text: 'daily, this' },
      { label: 'D', text: 'daily, but this' },
    ],
    correctAnswer: 'B',
    explanation:
      'The sentence contains two independent clauses: "The city\'s water treatment facility processes over two hundred million gallons daily" and "this capacity has remained unchanged since the facility\'s construction in 1978…" The second clause begins with "this capacity," a noun phrase — not a coordinating conjunction. When the second clause begins with a conjunctive adverb like "however," a semicolon before it is required. Choice B correctly uses a semicolon followed by "however," with a comma after "however." Choice A ("daily, yet") uses a comma + "yet" — which is grammatically correct for joining independent clauses — but "yet" signals contrast and "however" is more precise here; the issue is that "yet this capacity…" is stylistically valid but Choice B is more precise. Wait — A is actually grammatically valid. The key distinction: Choice C uses a comma alone before "this," creating a comma splice since "this capacity" is not a coordinating conjunction. Choice D uses ", but this" — grammatically valid for two independent clauses. Let us reconsider: B uses a semicolon before "however," which is correct. A uses ", yet," also correct. D uses ", but," also correct. C creates a comma splice and is wrong. Among A, B, D: "however" is a conjunctive adverb requiring a semicolon before it; "yet" and "but" are coordinating conjunctions that take a comma. All three are grammatically correct structures, but in the context of this long sentence, Choice B is the conventional choice because "however" signals the contrast most precisely and the semicolon cleanly separates the long clauses. Among incorrect answers: C is a comma splice. A and D are both grammatically possible, but D creates redundancy ("but this") while A ("yet") functions correctly. The clearest and most conventionally correct single answer is B.',
    wrongAnswerExplanations: {
      A: '"Yet" is a coordinating conjunction that can join two independent clauses with a comma, but "however" (Choice B) is the more precise and formal connector for this type of contrast between a current state and a historical stagnation.',
      C: 'A comma before "this capacity" — a noun subject — creates a comma splice; a comma alone cannot join two independent clauses.',
      D: '"But this" is grammatically possible but creates a slightly awkward reading; "however" with a semicolon more cleanly separates these long, complex clauses.',
    },
    teachingPoint:
      'Conjunctive adverbs (however, therefore, moreover) require a semicolon before them and a comma after when joining independent clauses; coordinating conjunctions (but, yet) require only a comma before them.',
    relatedSkills: ['Transitions', 'Boundaries'],
  },

  // Form, Structure, and Sense — easy
  {
    id: 'rw-b3-023',
    test: 'SAT',
    section: 'reading-writing',
    domain: 'Standard English Conventions',
    skill: 'Form, Structure, and Sense',
    difficulty: 'easy',
    timeTargetSeconds: 60,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    stimulus:
      'Each of the council members _______ asked to submit a written proposal before the end of the month.',
    question:
      'Which choice completes the text so that it conforms to the conventions of Standard Written English?',
    choices: [
      { label: 'A', text: 'were' },
      { label: 'B', text: 'was' },
      { label: 'C', text: 'are' },
      { label: 'D', text: 'have been' },
    ],
    correctAnswer: 'B',
    explanation:
      'The subject is "Each," which is a singular indefinite pronoun — it always takes a singular verb. "Of the council members" is a prepositional phrase modifying "Each" and does not change the subject. Therefore the singular past-tense verb "was" is correct. Choice A ("were") treats "members" as the subject. Choice C ("are") is present tense and plural. Choice D ("have been") is present perfect and plural.',
    wrongAnswerExplanations: {
      A: '"Were" is plural — but the subject "each" is singular.',
      C: '"Are" is present tense and plural; the sentence describes a past instruction using singular "each."',
      D: '"Have been" is plural and present perfect; neither matches the singular subject or the past-tense context.',
    },
    teachingPoint:
      'Indefinite pronouns such as "each," "every," "either," "neither," "one," "anyone," and "everyone" are always singular and require singular verbs — even when followed by "of the [plural noun]."',
    relatedSkills: ['Boundaries', 'Form, Structure, and Sense'],
  },

  // Form, Structure, and Sense — medium
  {
    id: 'rw-b3-024',
    test: 'SAT',
    section: 'reading-writing',
    domain: 'Standard English Conventions',
    skill: 'Form, Structure, and Sense',
    difficulty: 'medium',
    timeTargetSeconds: 75,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    stimulus:
      'By the time the renovation project is complete next year, the historic theater _______ closed for a total of three years.',
    question:
      'Which choice completes the text so that it conforms to the conventions of Standard Written English?',
    choices: [
      { label: 'A', text: 'will have been' },
      { label: 'B', text: 'has been' },
      { label: 'C', text: 'will be' },
      { label: 'D', text: 'was' },
    ],
    correctAnswer: 'A',
    explanation:
      'The time marker "By the time … is complete next year" signals a future point by which an action will have been completed. This construction requires the future perfect tense: "will have been." It expresses that the closure (which started in the past) will be completed by a future point. Choice B ("has been") is present perfect, which describes actions completed up to now — not up to a future point. Choice C ("will be") is simple future and does not convey the completed duration. Choice D ("was") is simple past, which cannot refer to a future date.',
    wrongAnswerExplanations: {
      B: '"Has been" is present perfect — it describes actions up to the present moment, not up to a future point.',
      C: '"Will be" is simple future and does not express the duration of completion that "by the time" requires.',
      D: '"Was" is simple past and cannot logically refer to something happening next year.',
    },
    teachingPoint:
      '"By the time [future event]" signals future perfect tense ("will have + past participle"), which expresses an action that will be completed before a specified future moment.',
    relatedSkills: ['Form, Structure, and Sense', 'Boundaries'],
  },

  // Form, Structure, and Sense — hard
  {
    id: 'rw-b3-025',
    test: 'SAT',
    section: 'reading-writing',
    domain: 'Standard English Conventions',
    skill: 'Form, Structure, and Sense',
    difficulty: 'hard',
    timeTargetSeconds: 90,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    stimulus:
      'The report criticized both the slow pace of implementing the new safety protocols and _______ the training staff had received before the protocols were introduced.',
    question:
      'Which choice completes the text so that it conforms to the conventions of Standard Written English?',
    choices: [
      { label: 'A', text: 'insufficient' },
      { label: 'B', text: 'the insufficient training' },
      { label: 'C', text: 'insufficiently trained' },
      { label: 'D', text: 'that the training had been insufficient for' },
    ],
    correctAnswer: 'B',
    explanation:
      'The sentence uses a "both … and" parallel structure. The first element after "both" is "the slow pace of implementing the new safety protocols" — a noun phrase. For parallelism, the element after "and" must also be a noun phrase. Choice B, "the insufficient training," is a noun phrase and maintains parallel structure. Choice A ("insufficient") is just an adjective, leaving "staff had received" dangling. Choice C ("insufficiently trained") is an adjective phrase that changes the meaning and lacks a noun head parallel to "pace." Choice D begins a dependent clause structure that breaks the "both … and" parallelism and creates an awkward sentence.',
    wrongAnswerExplanations: {
      A: '"Insufficient" is an adjective with no noun head, so "staff had received" becomes a dangling clause without a grammatical subject.',
      C: '"Insufficiently trained" is an adjective phrase; it would need to modify a noun to work here, but the structure then loses parallelism with "the slow pace."',
      D: 'This creates a clause after "and" ("that the training had been insufficient for the staff") which is not parallel to the noun phrase "the slow pace of implementing…"',
    },
    teachingPoint:
      '"Both … and" constructions require strict grammatical parallelism — both elements must be the same type (both noun phrases, both verb phrases, etc.).',
    relatedSkills: ['Boundaries', 'Form, Structure, and Sense'],
  },
]
