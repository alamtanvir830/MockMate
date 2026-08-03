import type { RWQuestion } from '../types'

// Domain distribution: Craft and Structure ×7, Information and Ideas ×7,
//   Standard English Conventions ×7, Expression of Ideas ×6  (total = 27)
// Difficulty distribution: easy ×10, medium ×12, hard ×5  (total = 27)

export const f3RwModule2EasyQuestionsV2: RWQuestion[] = [
  // ─── Craft and Structure (7) ──────────────────────────────────────────────

  {
    id: 'sat-f3-v2-rw-m2e-q01',
    section: 'reading-writing',
    moduleId: 'f3v2-rw-module-2-easy',
    domain: 'Craft and Structure',
    skill: 'Words in Context',
    difficulty: 'easy',
    stimulus:
      'The wildlife sanctuary\'s newest enclosure was designed to _______ the natural habitat of the animals it houses, incorporating native plant species, a freshwater stream, and soil composition matched to the region where the animals originated.',
    question:
      'Which choice completes the text with the most logical and precise word or phrase?',
    choices: [
      { label: 'A', text: 'replicate' },
      { label: 'B', text: 'overshadow' },
      { label: 'C', text: 'replace' },
      { label: 'D', text: 'observe' },
    ],
    correctAnswer: 'A',
    explanation:
      '"Replicate" means to copy or reproduce exactly, fitting the description of an enclosure that re-creates the animals\' natural habitat through native plants, water, and soil.',
    wrongAnswerExplanations: {
      B: '"Overshadow" means to make something seem less important by comparison. It is tempting because "overshadow" involves a kind of relationship between the enclosure and the original habitat — one eclipses the other. However, the passage describes incorporating native plants, water, and soil to recreate, not outshine, the natural environment.',
      C: '"Replace" is the most tempting wrong answer. Like "replicate," "replace" involves substituting one thing for another. Students who think "the enclosure replaces the habitat" might select this. However, "replace" implies fully substituting and eliminating the original, whereas the enclosure is meant to mimic a habitat that still exists elsewhere; the animals simply aren\'t there anymore. "Replicate" specifically means to copy or reproduce, which is what the detailed list of native plants and matched soil describes.',
      D: '"Observe" makes no grammatical or logical sense here: an enclosure cannot observe a habitat. Students who confuse the subject of the verb (the enclosure) with the scientists designing it might think "the scientists observe the habitat and recreate it" — but the blank needs a word describing what the enclosure does, not what the scientists do.',
    },
  },

  {
    id: 'sat-f3-v2-rw-m2e-q02',
    section: 'reading-writing',
    moduleId: 'f3v2-rw-module-2-easy',
    domain: 'Craft and Structure',
    skill: 'Words in Context',
    difficulty: 'easy',
    stimulus:
      'The volunteer coordinator praised her team\'s work as _______, noting that they had responded to each request promptly and completed every task with little oversight — a level of self-management she rarely witnessed in new volunteers.',
    question:
      'Which choice completes the text with the most logical and precise word or phrase?',
    choices: [
      { label: 'A', text: 'autonomous' },
      { label: 'B', text: 'cautious' },
      { label: 'C', text: 'reluctant' },
      { label: 'D', text: 'informal' },
    ],
    correctAnswer: 'A',
    explanation:
      '"Autonomous" means self-directed or operating independently — directly matching the description of volunteers who needed little oversight.',
    wrongAnswerExplanations: {
      B: '"Cautious" means careful and wary, but the passage emphasizes independence rather than caution.',
      C: '"Reluctant" means unwilling, which contradicts the description of volunteers who responded promptly.',
      D: '"Informal" refers to style or setting, not to the quality of self-management being praised.',
    },
  },

  {
    id: 'sat-f3-v2-rw-m2e-q03',
    section: 'reading-writing',
    moduleId: 'f3v2-rw-module-2-easy',
    domain: 'Craft and Structure',
    skill: 'Words in Context',
    difficulty: 'medium',
    stimulus:
      'Researchers who study long-term climate records must work with data that is _______ at best: temperature measurements from the distant past rely on indirect proxies such as tree rings and ice cores, which introduce uncertainty that cannot be fully resolved.',
    question:
      'Which choice completes the text with the most logical and precise word or phrase?',
    choices: [
      { label: 'A', text: 'redundant' },
      { label: 'B', text: 'comprehensive' },
      { label: 'C', text: 'approximate' },
      { label: 'D', text: 'precise' },
    ],
    correctAnswer: 'C',
    explanation:
      '"Approximate" means close but not exact — fitting data derived from indirect proxies that introduce unresolvable uncertainty.',
    wrongAnswerExplanations: {
      A: '"Redundant" means unnecessarily duplicated or repetitive. Students who think "the same temperature is measured multiple times through different proxies" and equate that with redundancy might select this. However, using multiple proxies is a methodological attempt to cross-check uncertain data, not to repeat the same measurement unnecessarily. "Redundant" does not describe a limitation; it describes excess repetition.',
      B: '"Comprehensive" means thorough and covering all aspects. Students who think that researchers using multiple indirect proxies (tree rings and ice cores) have a comprehensive approach might choose this. But the passage says the data "cannot be fully resolved" — the proxies introduce uncertainty, not completeness. "Comprehensive" contradicts the limitation being described.',
      D: '"Precise" is the most seductive wrong answer. It means exact and accurate — and the passage does discuss precision, but the point is that the data lacks it. Students who misread the sentence structure might think "climate records are precise at best" would make sense as a positive statement. But the phrase "at best" signals a maximum quality — not the best-case scenario of precision, but the best-case scenario of approximate accuracy. "Approximate at best" means even the most favorable reading of the data is only approximately correct.',
    },
  },

  {
    id: 'sat-f3-v2-rw-m2e-q04',
    section: 'reading-writing',
    moduleId: 'f3v2-rw-module-2-easy',
    domain: 'Craft and Structure',
    skill: 'Words in Context',
    difficulty: 'medium',
    stimulus:
      'The historian argued that the significance of the treaty had been _______ by later scholarship: because the conflict it ended was overshadowed by the larger war that followed, most accounts barely mentioned the agreement that had briefly stabilized the region.',
    question:
      'Which choice completes the text with the most logical and precise word or phrase?',
    choices: [
      { label: 'A', text: 'preserved' },
      { label: 'B', text: 'celebrated' },
      { label: 'C', text: 'minimized' },
      { label: 'D', text: 'questioned' },
    ],
    correctAnswer: 'C',
    explanation:
      '"Minimized" means reduced in perceived importance, which fits the claim that later scholarship barely mentioned the treaty because its conflict was overshadowed.',
    wrongAnswerExplanations: {
      A: '"Preserved" is tempting because later scholarship could logically be said to have preserved (kept alive) awareness of the treaty — but the passage says most accounts "barely mentioned" it, indicating neglect, not careful preservation. Students who don\'t read the second half of the sentence carefully may assume later scholarship would have preserved a significant treaty.',
      B: '"Celebrated" is the most clearly wrong answer — the passage says the treaty was ignored ("barely mentioned"), not honored. However, it is still a tempting choice for students who think a significant agreement would naturally receive celebratory attention from later historians.',
      D: '"Questioned" is the most tempting wrong answer. If a treaty was "overshadowed" and not discussed much, one might assume that scholars who did mention it disputed its importance or validity. "Questioned" also sounds like a sophisticated scholarly activity — evaluating significance rather than merely overlooking it. However, the passage says most accounts barely mentioned it at all, not that they contested its significance. Neglect is different from questioning.',
    },
  },

  {
    id: 'sat-f3-v2-rw-m2e-q05',
    section: 'reading-writing',
    moduleId: 'f3v2-rw-module-2-easy',
    domain: 'Craft and Structure',
    skill: 'Text Structure and Purpose',
    difficulty: 'easy',
    stimulus:
      'Mushrooms are not plants but belong to the kingdom Fungi. Unlike plants, fungi cannot photosynthesize; instead, they obtain energy by decomposing organic matter or by forming partnerships with plants whose roots they colonize. In these partnerships, the fungus supplies the plant with water and minerals absorbed through its extensive network of thread-like filaments, while the plant provides the fungus with sugars produced through photosynthesis.',
    question: 'What is the main purpose of this passage?',
    choices: [
      { label: 'A', text: 'To argue that fungi should be reclassified as plants' },
      {
        label: 'B',
        text: 'To explain how fungi differ from plants and how some fungi partner with plants',
      },
      {
        label: 'C',
        text: 'To warn readers about the dangers of consuming wild mushrooms',
      },
      {
        label: 'D',
        text: 'To compare the nutritional value of fungi with that of plants',
      },
    ],
    correctAnswer: 'B',
    explanation:
      'The passage contrasts fungi with plants (no photosynthesis) and then explains the mutualistic partnership some fungi form with plants — its purpose is to explain differences and relationships.',
    wrongAnswerExplanations: {
      A: '"To argue that fungi should be reclassified as plants" is tempting because the passage does raise the question of classification — it opens by saying mushrooms are "not plants." Students who read this as the beginning of an argument about what fungi should be classified as may select this. But the passage argues that fungi belong to their own kingdom precisely by explaining how they differ from plants — making the case for their separate classification, not for reclassifying them as plants.',
      C: '"To warn readers about the dangers of consuming wild mushrooms" is tempting because mushrooms are the first noun in the passage, and many readers associate mushrooms with the real-world warning about eating toxic varieties. But the passage contains no warning, no mention of toxicity, and no advice about foraging. Students who bring external knowledge about mushroom safety to the passage mistake their own assumptions for the text\'s content.',
      D: '"To compare the nutritional value of fungi with that of plants" is tempting because the passage describes what fungi eat (they decompose matter or receive sugars from plants) and what plants eat (they produce sugars through photosynthesis). Students who interpret "what something eats" as nutritional content might infer a nutritional comparison. But the passage is about energy acquisition methods, not nutritional profiles for human consumption.',
    },
  },

  {
    id: 'sat-f3-v2-rw-m2e-q06',
    section: 'reading-writing',
    moduleId: 'f3v2-rw-module-2-easy',
    domain: 'Craft and Structure',
    skill: 'Text Structure and Purpose',
    difficulty: 'medium',
    stimulus:
      'The town\'s first proposal to build a new community center was defeated by voters in 2018. Proponents revised the design to reduce costs and resubmitted it; that version also failed. In 2022, organizers shifted their approach entirely, partnering with the county library system to co-develop a shared facility. This proposal passed with 68% approval — the widest margin in any local infrastructure vote in a decade.',
    question: 'Which choice best describes the overall structure of this passage?',
    choices: [
      {
        label: 'A',
        text: 'It describes two failed attempts and one successful revision of the same approach',
      },
      {
        label: 'B',
        text: 'It argues that voters are too resistant to change to support necessary infrastructure',
      },
      {
        label: 'C',
        text: 'It presents a series of unsuccessful efforts followed by a strategic change that produced success',
      },
      {
        label: 'D',
        text: 'It compares the costs of three different community center designs',
      },
    ],
    correctAnswer: 'C',
    explanation:
      'The passage narrates two failed proposals followed by a strategic change (partnering with the library system) that produced a successful vote — matching the pattern of repeated failures leading to a new approach.',
    wrongAnswerExplanations: {
      A: 'The third attempt was not a revision of the same approach; it was a fundamentally different strategy involving a new partner.',
      B: 'The passage does not argue that voters are generally resistant — in fact, the third proposal passed easily.',
      D: 'No cost comparison between designs is presented.',
    },
  },

  {
    id: 'sat-f3-v2-rw-m2e-q07',
    section: 'reading-writing',
    moduleId: 'f3v2-rw-module-2-easy',
    domain: 'Craft and Structure',
    skill: 'Cross-Text Connections',
    difficulty: 'hard',
    stimulus:
      'Text 1: Urban heat islands — areas where dense pavement and buildings absorb and re-emit solar radiation — are a well-documented problem. Researchers have shown that urban cores can be up to 7°C warmer than surrounding rural areas on calm, clear nights. Expanding tree canopy cover is often proposed as a cost-effective mitigation strategy.\n\nText 2: A recent urban forestry study found that while tree planting in neighborhoods reduced surface temperatures by measurable amounts, the effect was highly localized. Trees on the south side of a building cooled that building\'s exterior wall significantly, but temperature sensors across the street showed no statistically significant change. The researchers concluded that strategic placement, rather than broad canopy expansion, is critical.',
    question:
      'Based on the texts, how would the author of Text 2 most likely respond to the proposal mentioned in Text 1?',
    choices: [
      {
        label: 'A',
        text: 'By arguing that tree planting has no measurable effect on urban temperatures',
      },
      {
        label: 'B',
        text: 'By agreeing that canopy expansion helps but emphasizing that placement strategy matters more than overall coverage',
      },
      {
        label: 'C',
        text: 'By suggesting that urban heat islands are not caused by pavement and buildings',
      },
      {
        label: 'D',
        text: 'By recommending that urban planners abandon tree-planting programs in favor of other interventions',
      },
    ],
    correctAnswer: 'B',
    explanation:
      'Text 2 confirms that trees do reduce surface temperatures (a measurable effect), but the researchers\' conclusion that "strategic placement is critical" qualifies the broad canopy expansion proposal in Text 1 — supporting trees in principle while redirecting attention to where they are planted.',
    wrongAnswerExplanations: {
      A: 'Text 2 found measurable reductions near trees, so the author would not claim there is no effect.',
      C: 'Text 2 does not challenge the cause of urban heat islands as described in Text 1.',
      D: 'Text 2 does not recommend abandoning tree programs; it recommends better placement strategy.',
    },
  },

  // ─── Information and Ideas (7) ────────────────────────────────────────────

  {
    id: 'sat-f3-v2-rw-m2e-q08',
    section: 'reading-writing',
    moduleId: 'f3v2-rw-module-2-easy',
    domain: 'Information and Ideas',
    skill: 'Central Ideas and Details',
    difficulty: 'easy',
    stimulus:
      'Glass frogs of Central and South America get their name from their translucent skin, which allows the internal organs — heart, liver, digestive tract — to be seen from the outside. Scientists long assumed this transparency was purely a passive feature, but recent research suggests it may serve an active camouflage function. When resting on leaves, the frogs hide red blood cells in their liver, reducing the redness visible through their skin and making them harder to detect against green foliage.',
    question:
      'According to the passage, what did recent research reveal about glass frog transparency?',
    choices: [
      {
        label: 'A',
        text: 'Transparency in glass frogs is caused by a lack of pigment in the skin cells',
      },
      {
        label: 'B',
        text: 'Glass frogs use their transparency actively as a form of camouflage by controlling the visibility of their blood',
      },
      {
        label: 'C',
        text: 'Transparent skin helps glass frogs absorb sunlight more efficiently than opaque frogs',
      },
      {
        label: 'D',
        text: 'The transparency of glass frogs has no functional purpose and is simply a genetic trait',
      },
    ],
    correctAnswer: 'B',
    explanation:
      'The passage states that glass frogs hide red blood cells in their liver when resting, reducing redness visible through their skin — an active use of transparency for camouflage.',
    wrongAnswerExplanations: {
      A: 'The passage does not explain the cellular mechanism of transparency.',
      C: 'Sunlight absorption is not mentioned.',
      D: 'The passage explicitly says transparency may serve an active camouflage function, directly contradicting this choice.',
    },
  },

  {
    id: 'sat-f3-v2-rw-m2e-q09',
    section: 'reading-writing',
    moduleId: 'f3v2-rw-module-2-easy',
    domain: 'Information and Ideas',
    skill: 'Central Ideas and Details',
    difficulty: 'medium',
    stimulus:
      'Stonehenge, the prehistoric monument on Salisbury Plain in England, was constructed in multiple phases spanning roughly 1,500 years, beginning around 3000 BCE. The monument\'s purpose remains debated, but evidence from the site includes remains that suggest it served as a burial ground during its earliest phases. Astronomical alignments — the monument faces the rising sun on the summer solstice — indicate it also functioned as a calendar or ceremonial site.',
    question: 'Which of the following is supported by details in the passage?',
    choices: [
      {
        label: 'A',
        text: 'Stonehenge was built in a single construction phase over several decades',
      },
      {
        label: 'B',
        text: 'Stonehenge faces the setting sun on the winter solstice',
      },
      {
        label: 'C',
        text: 'Archaeologists have reached a consensus that Stonehenge was primarily used for astronomical purposes',
      },
      {
        label: 'D',
        text: 'Stonehenge served multiple purposes, including burial and astronomical observation',
      },
    ],
    correctAnswer: 'D',
    explanation:
      'The passage mentions remains consistent with burial during early phases and astronomical alignments — supporting the claim that Stonehenge served multiple purposes.',
    wrongAnswerExplanations: {
      A: '"Built in a single construction phase over several decades" directly contradicts the passage, which states construction "spanned roughly 1,500 years" in "multiple phases." Students who read quickly might register the long time span without noticing "multiple phases," assuming instead that the 1,500 years was one continuous project phase.',
      B: '"Faces the setting sun on the winter solstice" contains two errors (setting/rising and winter/summer) that require a student to misremember both the direction of the sun and the season. The most tempting version of this error is confusing "summer" with "winter" — since both are solstices, and winter is the other one — without necessarily getting the sun direction wrong too.',
      C: '"Archaeologists have reached a consensus that Stonehenge was primarily used for astronomical purposes" is the most seductive wrong answer. It is grounded in real content from the passage (astronomical alignments are explicitly described), and naming a specific function (astronomical observation) sounds authoritative and well-informed. The key error: the passage says purpose "remains debated," directly contradicting the claim of consensus. Students who focus on what the passage describes without noticing the hedge phrase will select this.',
    },
  },

  {
    id: 'sat-f3-v2-rw-m2e-q10',
    section: 'reading-writing',
    moduleId: 'f3v2-rw-module-2-easy',
    domain: 'Information and Ideas',
    skill: 'Command of Evidence',
    difficulty: 'easy',
    stimulus:
      'A researcher studying language acquisition found that children raised in bilingual households reached the same language milestones as children in monolingual households, though bilingual children\'s vocabularies in each individual language were slightly smaller. The researcher concluded that bilingualism does not delay language development.',
    question:
      'Which finding would most directly support the researcher\'s conclusion?',
    choices: [
      {
        label: 'A',
        text: 'Bilingual children\'s combined vocabulary across both languages was equal to or larger than monolingual children\'s single-language vocabulary',
      },
      {
        label: 'B',
        text: 'Bilingual children performed better than monolingual children on spatial reasoning tests',
      },
      {
        label: 'C',
        text: 'Parents of bilingual children reported higher satisfaction with their children\'s language progress',
      },
      {
        label: 'D',
        text: 'Bilingual children began speaking their first words at the same age as monolingual children',
      },
    ],
    correctAnswer: 'D',
    explanation:
      'If bilingual children began speaking first words at the same age, this directly supports the finding that bilingualism does not delay a key developmental language milestone.',
    wrongAnswerExplanations: {
      A: 'Choice A (combined vocabulary being equal to or larger than monolingual vocabulary) is the most tempting wrong answer. The passage actually mentions that bilingual children\'s per-language vocabularies are "slightly smaller," and Choice A addresses that apparent disadvantage directly by showing the combined total is not smaller. This is relevant and sounds convincing. However, the researcher\'s specific conclusion concerns developmental milestones — when children achieve language benchmarks (like first words) — not total vocabulary size. Vocabulary size and milestone timing are different dimensions of language development.',
      B: 'Choice B (spatial reasoning) is outside the scope of language acquisition entirely. Students who know from external sources that bilingualism improves executive function (including spatial tasks) might select this, but the researcher\'s conclusion is specifically about language development timelines — not cognitive benefits in other domains.',
      C: 'Parental satisfaction reports are anecdotal and subjective — parents who chose bilingual environments may be biased toward reporting positive outcomes. This does not directly address whether children hit developmental milestones at expected ages, which is what "does not delay development" means in objective terms.',
    },
  },

  {
    id: 'sat-f3-v2-rw-m2e-q11',
    section: 'reading-writing',
    moduleId: 'f3v2-rw-module-2-easy',
    domain: 'Information and Ideas',
    skill: 'Command of Evidence',
    difficulty: 'medium',
    stimulus:
      'An ecologist studying pollinator populations collected data across six flower farm sites:\n\nSite | Pesticide Use | Bee Population (colonies/hectare)\nAlpha | High | 1.2\nBeta | High | 1.4\nGamma | Moderate | 2.8\nDelta | Moderate | 2.6\nEpsilon | None | 4.1\nZeta | None | 3.9\n\nThe ecologist concluded that reduced pesticide use is associated with higher bee populations.',
    question: 'Which claim is best supported by the data in the table?',
    choices: [
      {
        label: 'A',
        text: 'Sites with high pesticide use have no bee populations at all',
      },
      {
        label: 'B',
        text: 'Sites with no pesticide use consistently have higher bee populations than sites with high pesticide use',
      },
      {
        label: 'C',
        text: 'Moderate pesticide use is equivalent to no pesticide use in terms of bee populations',
      },
      {
        label: 'D',
        text: 'Beta site has healthier soil than Alpha site because it has slightly more bees',
      },
    ],
    correctAnswer: 'B',
    explanation:
      'Epsilon (4.1) and Zeta (3.9) with no pesticides have notably higher counts than Alpha (1.2) and Beta (1.4) with high pesticides. This pattern is consistent across both pairs — directly supporting option B.',
    wrongAnswerExplanations: {
      A: 'High-pesticide sites have bee populations of 1.2 and 1.4 colonies/hectare — not zero.',
      C: 'Moderate sites (2.6–2.8) are between high (1.2–1.4) and no-pesticide sites (3.9–4.1) — not equivalent to no-pesticide sites.',
      D: 'Soil health is not mentioned in the table; the data concerns only pesticide use and bee populations.',
    },
  },

  {
    id: 'sat-f3-v2-rw-m2e-q12',
    section: 'reading-writing',
    moduleId: 'f3v2-rw-module-2-easy',
    domain: 'Information and Ideas',
    skill: 'Command of Evidence',
    difficulty: 'medium',
    stimulus:
      'A nutritionist studying breakfast habits and school performance found that students who ate breakfast showed better concentration and scored higher on afternoon quizzes than those who skipped breakfast. She argued that schools should provide free breakfast programs to improve student outcomes.',
    question:
      'Which evidence, if true, would most weaken the nutritionist\'s argument for school-provided breakfast programs?',
    choices: [
      {
        label: 'A',
        text: 'Students who ate breakfast at home showed similar concentration and quiz performance to students who ate school-provided breakfast',
      },
      {
        label: 'B',
        text: 'Students who skipped breakfast reported higher levels of hunger in the morning',
      },
      {
        label: 'C',
        text: 'Schools that provided free breakfast saw improved attendance rates',
      },
      {
        label: 'D',
        text: 'Students who ate school breakfast participated more actively in morning classes',
      },
    ],
    correctAnswer: 'A',
    explanation:
      'If home-eaten breakfast produces the same benefits as school-provided breakfast, the argument that schools must provide it specifically is weakened — the benefit comes from eating breakfast, not from the school providing it.',
    wrongAnswerExplanations: {
      B: 'Students skipping breakfast reporting hunger supports the importance of eating breakfast, which strengthens rather than weakens the argument.',
      C: 'Improved attendance further supports the value of school breakfast programs, not weakens it.',
      D: 'Increased participation in morning class supports the program\'s benefits, not undermines them.',
    },
  },

  {
    id: 'sat-f3-v2-rw-m2e-q13',
    section: 'reading-writing',
    moduleId: 'f3v2-rw-module-2-easy',
    domain: 'Information and Ideas',
    skill: 'Inferences',
    difficulty: 'medium',
    stimulus:
      'Research conducted at a large urban hospital found that patients who had a single point of contact — one nurse or coordinator responsible for managing their care — had shorter hospital stays, fewer readmissions, and higher satisfaction scores than patients whose care was managed by a rotating team with no designated coordinator.',
    question:
      'Which of the following can be most reasonably inferred from the passage?',
    choices: [
      {
        label: 'A',
        text: 'Urban hospitals are generally better managed than rural hospitals',
      },
      {
        label: 'B',
        text: 'Coordinated, consistent contact in patient care may improve both outcomes and patient experience',
      },
      {
        label: 'C',
        text: 'Rotating care teams always perform worse than single-point-of-contact systems',
      },
      {
        label: 'D',
        text: 'Hospital satisfaction scores are an unreliable measure of care quality',
      },
    ],
    correctAnswer: 'B',
    explanation:
      'The data shows that patients with a single coordinator had better outcomes and satisfaction — reasonably suggesting that coordinated, consistent contact benefits care quality and experience.',
    wrongAnswerExplanations: {
      A: 'The study does not compare urban and rural hospitals.',
      C: '"Always" is too absolute; the data shows a pattern in this one hospital study, not a universal law.',
      D: 'The passage uses satisfaction scores as evidence without questioning their reliability.',
    },
  },

  {
    id: 'sat-f3-v2-rw-m2e-q14',
    section: 'reading-writing',
    moduleId: 'f3v2-rw-module-2-easy',
    domain: 'Information and Ideas',
    skill: 'Command of Evidence',
    difficulty: 'hard',
    stimulus:
      'A sociologist examining social media use among teenagers found that teens who spent more than four hours per day on social media reported higher rates of loneliness than those who spent fewer than two hours. She concluded that heavy social media use causes loneliness in teenagers.',
    question:
      'Which consideration most undermines the sociologist\'s causal conclusion?',
    choices: [
      {
        label: 'A',
        text: 'The sociologist did not include teenagers under the age of thirteen',
      },
      {
        label: 'B',
        text: 'Some teenagers who spent more than four hours on social media also reported feeling happy',
      },
      {
        label: 'C',
        text: 'The study was conducted over only one month',
      },
      {
        label: 'D',
        text: 'Lonely teenagers may use social media more because they lack in-person social connections, rather than social media causing their loneliness',
      },
    ],
    correctAnswer: 'D',
    explanation:
      'The sociologist\'s study shows correlation, not causation. If lonely teens use social media more because they lack real-world connections, the causal arrow runs the other way — this is a classic reverse-causation problem that directly undermines her conclusion.',
    wrongAnswerExplanations: {
      A: 'Excluding younger teens affects generalizability but not the fundamental causal inference problem.',
      B: 'Some happy heavy users does not address the general correlation or the causal direction question.',
      C: 'Duration affects reliability but does not directly address the direction-of-causation problem.',
    },
  },

  // ─── Standard English Conventions (7) ────────────────────────────────────

  {
    id: 'sat-f3-v2-rw-m2e-q15',
    section: 'reading-writing',
    moduleId: 'f3v2-rw-module-2-easy',
    domain: 'Standard English Conventions',
    skill: 'Form, Structure, and Sense',
    difficulty: 'easy',
    stimulus: `Maria and her younger brother spent the summer restoring an old wooden rowboat they had found in their grandfather's shed. Together they sanded the hull, replaced the cracked seats, and painted it a bright shade of blue. By August, the boat belonged as much to her brother as it did to ______.`,
    question: `Which choice completes the text so that it conforms to the conventions of Standard English?`,
    choices: [
      { label: 'A', text: 'she' },
      { label: 'B', text: 'her' },
      { label: 'C', text: 'hers' },
      { label: 'D', text: 'herself' },
    ],
    correctAnswer: 'B',
    explanation: `The pronoun is the object of the preposition "to," so it must be in the objective case. "Her" is the objective form and correctly completes the phrase "belonged as much to her brother as it did to her."`,
    wrongAnswerExplanations: {
      A: `"She" is the subjective case, used for the subject of a clause, not for the object of the preposition "to."`,
      C: `"Hers" is a possessive pronoun that stands in for a noun (as in "the boat is hers"); it cannot serve as the object of "to" in this construction.`,
      D: `The reflexive "herself" is used only when the object refers back to the subject of the same clause, which is not the case here.`,
    },
  },

  {
    id: 'sat-f3-v2-rw-m2e-q16',
    section: 'reading-writing',
    moduleId: 'f3v2-rw-module-2-easy',
    domain: 'Standard English Conventions',
    skill: 'Form, Structure, and Sense',
    difficulty: 'easy',
    stimulus: `The community garden welcomes volunteers of all experience levels. On a typical Saturday, members can be found planting seedlings, watering the raised beds, and ______ the compost bins. Newcomers quickly learn that even small tasks contribute to the garden's success.`,
    question: `Which choice completes the text so that it conforms to the conventions of Standard English?`,
    choices: [
      { label: 'A', text: 'they turn' },
      { label: 'B', text: 'to turn' },
      { label: 'C', text: 'turning' },
      { label: 'D', text: 'the turning of' },
    ],
    correctAnswer: 'C',
    explanation: `The sentence lists a series of activities using "-ing" forms: "planting seedlings, watering the raised beds, and turning the compost bins." The gerund "turning" matches the form of the other items in the list, maintaining parallel structure.`,
    wrongAnswerExplanations: {
      A: `"They turn" is a full clause with a subject and verb, which breaks the parallel structure of the "-ing" phrases.`,
      B: `The infinitive "to turn" does not match the "-ing" form of "planting" and "watering," so it is not parallel with the other list items.`,
      D: `The noun phrase "the turning of" is not parallel with the verb-based "-ing" phrases and produces an awkward, mismatched list.`,
    },
  },

  {
    id: 'sat-f3-v2-rw-m2e-q17',
    section: 'reading-writing',
    moduleId: 'f3v2-rw-module-2-easy',
    domain: 'Standard English Conventions',
    skill: 'Form, Structure, and Sense',
    difficulty: 'easy',
    stimulus:
      'The two candidates for the position _______ strongly different backgrounds: one had spent twenty years in academic research, while the other had built and sold three successful technology companies.',
    question:
      'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { label: 'A', text: 'brings' },
      { label: 'B', text: 'has brought' },
      { label: 'C', text: 'brought' },
      { label: 'D', text: 'bring' },
    ],
    correctAnswer: 'C',
    explanation:
      'The subject "two candidates" is plural, and the past-tense context (candidates with established backgrounds being described) requires the simple past "brought."',
    wrongAnswerExplanations: {
      A: '"Brings" is singular present tense — wrong in both number and tense.',
      B: '"Has brought" is singular and uses the present perfect, inconsistent with the past-tense context.',
      D: '"Bring" is plural present tense, but the context requires past tense to match the description of the candidates\' backgrounds.',
    },
  },

  {
    id: 'sat-f3-v2-rw-m2e-q18',
    section: 'reading-writing',
    moduleId: 'f3v2-rw-module-2-easy',
    domain: 'Standard English Conventions',
    skill: 'Boundaries',
    difficulty: 'medium',
    stimulus:
      'The lighthouse had been decommissioned for nearly thirty years _______ a preservation society restored it and opened it to the public as a museum.',
    question:
      'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { label: 'A', text: '; when' },
      { label: 'B', text: '; however,' },
      { label: 'C', text: ', but' },
      { label: 'D', text: 'but' },
    ],
    correctAnswer: 'C',
    explanation:
      'A comma followed by the coordinating conjunction "but" correctly joins two independent clauses with a contrast relationship.',
    wrongAnswerExplanations: {
      A: '"When" is a subordinating conjunction; placing a semicolon before it is non-standard — semicolons must be followed by an independent clause or conjunctive adverb.',
      B: '"However" signals contrast correctly in meaning, but it is a conjunctive adverb and would require restructuring the second clause to work after a semicolon.',
      D: '"But" without a comma before it does not correctly punctuate the junction of two independent clauses.',
    },
  },

  {
    id: 'sat-f3-v2-rw-m2e-q19',
    section: 'reading-writing',
    moduleId: 'f3v2-rw-module-2-easy',
    domain: 'Standard English Conventions',
    skill: 'Form, Structure, and Sense',
    difficulty: 'medium',
    stimulus:
      'Painted in the final decade of the artist\'s life, _______ rich with texture, movement, and a compressed emotional intensity that earlier works in the series lacked.',
    question:
      'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { label: 'A', text: 'these late canvases are' },
      { label: 'B', text: 'there were these late canvases that are' },
      { label: 'C', text: 'the richness of these late canvases is' },
      { label: 'D', text: 'it was these late canvases that were' },
    ],
    correctAnswer: 'A',
    explanation:
      'The participial phrase "Painted in the final decade of the artist\'s life" must modify the subject of the main clause. "These late canvases" correctly identifies what was painted, avoiding a dangling modifier.',
    wrongAnswerExplanations: {
      B: 'The awkward "there were... that are" construction creates tense inconsistency and unnecessary complexity.',
      C: '"The richness of these late canvases" makes the subject "richness," which was not painted — creating a dangling modifier.',
      D: '"It was... that were" creates an expletive construction and tense inconsistency, and does not cleanly resolve the participial phrase.',
    },
  },

  {
    id: 'sat-f3-v2-rw-m2e-q20',
    section: 'reading-writing',
    moduleId: 'f3v2-rw-module-2-easy',
    domain: 'Standard English Conventions',
    skill: 'Boundaries',
    difficulty: 'medium',
    stimulus:
      'The documentary featured three overlooked chapters of local history _______ the founding of the city\'s first public library in 1887, the 1923 flood that reshaped its waterfront, and the labor strike of 1951 that transformed working conditions in the region.',
    question:
      'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { label: 'A', text: ';' },
      { label: 'B', text: ':' },
      { label: 'C', text: ',' },
      { label: 'D', text: '— and' },
    ],
    correctAnswer: 'B',
    explanation:
      'A colon after a complete independent clause correctly introduces the list that specifies what the "three overlooked chapters" were.',
    wrongAnswerExplanations: {
      A: 'A semicolon joins two independent clauses; what follows here is a list elaborating on the preceding clause, not an independent clause.',
      C: 'A comma alone before a list introduced by a complete statement is insufficient; a colon is the standard punctuation for this construction.',
      D: '"— and" creates a grammatically awkward construction; the dash alone could work informally, but adding "and" before the first list item is non-standard.',
    },
  },

  {
    id: 'sat-f3-v2-rw-m2e-q21',
    section: 'reading-writing',
    moduleId: 'f3v2-rw-module-2-easy',
    domain: 'Standard English Conventions',
    skill: 'Boundaries',
    difficulty: 'hard',
    stimulus:
      'The expedition\'s lead botanist catalogued more than 200 previously undocumented plant species _______ this figure represented only a fraction of the total biodiversity in the region.',
    question:
      'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { label: 'A', text: ',' },
      { label: 'B', text: '; yet' },
      { label: 'C', text: ': yet' },
      { label: 'D', text: ', yet' },
    ],
    correctAnswer: 'D',
    explanation:
      '"Yet" is a coordinating conjunction that signals contrast. A comma before a coordinating conjunction joining two independent clauses is the standard construction.',
    wrongAnswerExplanations: {
      A: 'A comma alone between two independent clauses is a comma splice.',
      B: 'A semicolon followed by a coordinating conjunction is non-standard; semicolons are paired with conjunctive adverbs (e.g., "however"), not coordinating conjunctions like "yet."',
      C: 'A colon followed by "yet" is non-standard; colons introduce explanations or lists, not contrasting clauses.',
    },
  },

  // ─── Expression of Ideas (6) ──────────────────────────────────────────────

  {
    id: 'sat-f3-v2-rw-m2e-q22',
    section: 'reading-writing',
    moduleId: 'f3v2-rw-module-2-easy',
    domain: 'Expression of Ideas',
    skill: 'Transitions',
    difficulty: 'easy',
    stimulus:
      'The school district decided to adopt a four-day school week to reduce operating costs. _______, teachers reported feeling less burned out, and student attendance rates improved noticeably in the first semester.',
    question: 'Which choice completes the text with the most logical transition?',
    choices: [
      { label: 'A', text: 'However' },
      { label: 'B', text: 'By contrast' },
      { label: 'C', text: 'As a result' },
      { label: 'D', text: 'That said' },
    ],
    correctAnswer: 'C',
    explanation:
      '"As a result" signals that what follows is an outcome of the decision described in the first sentence — improved teacher wellbeing and attendance are direct results of the policy change.',
    wrongAnswerExplanations: {
      A: '"However" signals that the second sentence introduces a complication, qualification, or contrast to the first. Students might read the transition as: "The district adopted a four-day week for financial reasons; however, it turns out teachers and students benefited too." This sounds like "however" because the teacher wellbeing and attendance were perhaps unintended benefits. But "however" signals opposition — as if the benefits somehow contradict or complicate the decision — when in fact they support and reinforce it. "As a result" captures the causal relationship correctly.',
      B: '"By contrast" explicitly signals opposition. It would require the second sentence to describe something that stands against the first sentence\'s content. Since teachers feeling better and attendance improving are consistent with the school district\'s goals (not opposed to them), "by contrast" is clearly wrong — yet students who expect second sentences to introduce complications may reach for it.',
      D: '"That said" is the most interesting wrong answer. It signals "despite what I just said" or "with that caveat in mind" — a soft concession. Students might read: "The district adopted the four-day week for cost reasons; that said, teachers reported less burnout" — as if teacher wellbeing slightly complicates or qualifies the financial motivation. But the positive outcomes are not qualifications; they are additional results of the same decision. A true "that said" sentence would introduce a downside or limit to the policy.',
    },
  },

  {
    id: 'sat-f3-v2-rw-m2e-q23',
    section: 'reading-writing',
    moduleId: 'f3v2-rw-module-2-easy',
    domain: 'Expression of Ideas',
    skill: 'Transitions',
    difficulty: 'easy',
    stimulus:
      'The coastal town had relied on fishing as its primary industry for more than a century. _______, as fish populations declined due to overfishing and warming ocean temperatures, local leaders began investing in eco-tourism and aquaculture to diversify the economy.',
    question: 'Which choice completes the text with the most logical transition?',
    choices: [
      { label: 'A', text: 'Therefore' },
      { label: 'B', text: 'Similarly' },
      { label: 'C', text: 'As a result' },
      { label: 'D', text: 'However' },
    ],
    correctAnswer: 'D',
    explanation:
      '"However" signals contrast between the town\'s long reliance on fishing and the shift away from it — appropriate because the second sentence describes a departure from the established pattern.',
    wrongAnswerExplanations: {
      A: '"Therefore" signals that the second sentence is a logical conclusion derived from the first. A student might read: "The town relied on fishing for a century → therefore [i.e., because fishing is the foundation], local leaders are now adapting by investing in eco-tourism." But "therefore" implies the adaptation is a direct consequence of the reliance, not of the crisis threatening it. The second sentence describes change despite (not because of) the fishing tradition, which is why contrast is the right relationship.',
      B: '"Similarly" signals that the second sentence parallels the first in some way. Students might construct: "The town relied on fishing for a century; similarly, it is now doubling down on aquaculture [also water-based]." But aquaculture and eco-tourism represent diversification away from fishing, not a continuation of the same pattern. Even if aquaculture is superficially water-based, the second sentence describes a departure from the established monoculture, not a similar approach.',
      C: '"As a result" implies that the fish population decline and eco-tourism investment are a consequence of the century of fishing reliance. Students who read it as "they relied on fishing for a century → as a result, they now face problems → as a result, they diversified" have a multi-step chain that the passage compresses into one sentence. The "as a result" would need to refer back to the problems (described in the second clause of the second sentence: "fish populations declined") rather than to the century of fishing, making the transition word misaligned with where it appears.',
    },
  },

  {
    id: 'sat-f3-v2-rw-m2e-q24',
    section: 'reading-writing',
    moduleId: 'f3v2-rw-module-2-easy',
    domain: 'Expression of Ideas',
    skill: 'Transitions',
    difficulty: 'medium',
    stimulus:
      'Studies have shown that reading fiction can improve a person\'s ability to understand others\' emotions. _______, the same benefit has not been consistently demonstrated for people who primarily read non-fiction or factual articles on similar human-interest topics.',
    question: 'Which choice completes the text with the most logical transition?',
    choices: [
      { label: 'A', text: 'Similarly' },
      { label: 'B', text: 'Therefore' },
      { label: 'C', text: 'Nevertheless' },
      { label: 'D', text: 'Interestingly' },
    ],
    correctAnswer: 'D',
    explanation:
      '"Interestingly" signals that the second sentence presents a noteworthy or perhaps unexpected observation — the contrast between fiction and non-fiction is surprising given that both cover human experience, making it genuinely interesting rather than simply contradictory.',
    wrongAnswerExplanations: {
      A: '"Similarly" signals that the second sentence presents an analogous result in a parallel case. Students might read: "Fiction improves emotional understanding; similarly, non-fiction also does [because both are reading]." But the second sentence says the benefit was NOT demonstrated for non-fiction readers — the exact opposite of "similarly." Students who expect reading in general to share benefits across genres may select this.',
      B: '"Therefore" signals a logical consequence. Students might reason: "Fiction reading improves emotional understanding → therefore, the same effect was tested on non-fiction readers." But "therefore" in position [before the second sentence] would imply that the result of the first claim (fiction helping readers) logically produced the result described in the second. The absence of effect in non-fiction is not caused by the presence of effect in fiction — they are independent findings from different groups.',
      C: '"Nevertheless" is the most tempting wrong answer. Students might read: "Fiction readers gain benefits [implying researchers expected non-fiction readers to gain them too]. Nevertheless, the same benefit was not found for non-fiction readers" — as if researchers tried to extend the finding despite doubts, but it failed. This reading makes intuitive sense. However, "nevertheless" implies overcoming an obstacle or acting despite difficulty: "X is true; nevertheless, Y still occurred." Here the second sentence is simply reporting an absence of effect, not describing something that persisted despite the first sentence\'s claim. "Interestingly" better captures the unexpected contrast without implying opposition or adversity.',
    },
  },

  {
    id: 'sat-f3-v2-rw-m2e-q25',
    section: 'reading-writing',
    moduleId: 'f3v2-rw-module-2-easy',
    domain: 'Expression of Ideas',
    skill: 'Transitions',
    difficulty: 'medium',
    stimulus:
      'Researchers found that people who kept a written log of their daily water intake consumed, on average, 20% more water than those who did not track their intake. _______, participants who received automated phone reminders saw only a 4% increase — suggesting that active record-keeping engages awareness more effectively than passive prompting.',
    question: 'Which choice completes the text with the most logical transition?',
    choices: [
      { label: 'A', text: 'In addition' },
      { label: 'B', text: 'Similarly' },
      { label: 'C', text: 'By contrast' },
      { label: 'D', text: 'As a result' },
    ],
    correctAnswer: 'C',
    explanation:
      '"By contrast" directly signals the comparison between two different intervention groups — those who logged actively versus those who received passive reminders — setting up the concluding observation about relative effectiveness.',
    wrongAnswerExplanations: {
      A: '"In addition" signals that the second sentence adds a similar or related point, but the second sentence introduces a much smaller effect — making it a contrasting comparison, not an addition.',
      B: '"Similarly" signals an analogous result, but the 4% figure is far lower than the 20% figure, indicating a different rather than similar outcome.',
      D: '"As a result" implies that participants receiving reminders is a consequence of the first group\'s logging, which is not the relationship described.',
    },
  },

  {
    id: 'sat-f3-v2-rw-m2e-q26',
    section: 'reading-writing',
    moduleId: 'f3v2-rw-module-2-easy',
    domain: 'Expression of Ideas',
    skill: 'Rhetorical Synthesis',
    difficulty: 'hard',
    stimulus:
      'A student is writing a report about the benefits of school gardens for a health class. The student has gathered the following notes:\n• Students who tended school gardens ate more vegetables at lunch than students without access to gardens.\n• Schools with garden programs reported increased student interest in science and biology topics.\n• Gardening requires physical activity — digging, carrying, and planting — that contributes to students\' daily movement goals.\n• Several schools noted that garden maintenance tasks gave students with attention difficulties a productive, calming outlet.\n• Teachers reported that the garden provided a concrete context for math lessons involving measurement and estimation.',
    question:
      'The student wants to highlight that school gardens support student wellbeing across both physical and emotional dimensions. Which choice most effectively uses relevant information from the notes to accomplish this goal?',
    choices: [
      {
        label: 'A',
        text: 'School gardens expose students to science and math in practical ways, with teachers reporting that gardening supports lessons in biology, measurement, and estimation.',
      },
      {
        label: 'B',
        text: 'Students with school gardens eat more vegetables and are more interested in science, showing that gardens can affect both diet and academics.',
      },
      {
        label: 'C',
        text: 'School gardens provide physical activity through tasks like digging and planting while also offering students with attention difficulties a calming, productive outlet — supporting wellbeing in both body and mind.',
      },
      {
        label: 'D',
        text: 'School gardens have been shown to increase vegetable consumption, and several teachers have found them useful for math instruction.',
      },
    ],
    correctAnswer: 'C',
    explanation:
      'Choice C directly addresses the stated goal by citing the physical dimension (activity through gardening tasks) and the emotional dimension (calming outlet for students with attention difficulties), using both to argue for wellbeing across physical and emotional domains.',
    wrongAnswerExplanations: {
      A: 'Choice A emphasizes academic subject integration (science, math) rather than physical and emotional wellbeing, so it does not accomplish the stated goal.',
      B: 'Choice B addresses diet and academic interest — neither of which maps precisely to the physical/emotional wellbeing framing the goal requires.',
      D: 'Choice D mentions vegetable consumption and math instruction, not physical activity or emotional wellbeing.',
    },
  },

  {
    id: 'sat-f3-v2-rw-m2e-q27',
    section: 'reading-writing',
    moduleId: 'f3v2-rw-module-2-easy',
    domain: 'Expression of Ideas',
    skill: 'Rhetorical Synthesis',
    difficulty: 'hard',
    stimulus:
      'A student is writing a paragraph about the advantages of public libraries for their civics class. The student has gathered the following notes:\n• Public libraries provide free access to books, computers, and internet services.\n• Many libraries offer job search assistance, tax preparation help, and literacy programs.\n• In 2023, U.S. public libraries recorded more than 1.3 billion in-person and digital visits.\n• Library cards are free to all residents, regardless of income.\n• Some libraries have begun hosting small business support workshops and makerspaces.',
    question:
      'The student wants to emphasize that public libraries serve community needs beyond lending books. Which choice most effectively uses relevant information from the notes to accomplish this goal?',
    choices: [
      {
        label: 'A',
        text: 'In 2023, U.S. public libraries had more than 1.3 billion visits, which shows how popular they are.',
      },
      {
        label: 'B',
        text: 'Public libraries are visited by billions of people each year and offer free library cards to all residents, regardless of income.',
      },
      {
        label: 'C',
        text: 'Public libraries have always provided books and are increasingly important in the modern world.',
      },
      {
        label: 'D',
        text: 'Public libraries offer far more than books: they provide free internet access, job search help, literacy programs, and even small business workshops — making them comprehensive community resources.',
      },
    ],
    correctAnswer: 'D',
    explanation:
      'Choice D lists specific services beyond books (internet, job search, literacy, business workshops), directly supporting the goal of emphasizing services beyond lending.',
    wrongAnswerExplanations: {
      A: 'Citing visit numbers speaks to popularity, not to the range of services beyond books.',
      B: 'This choice focuses on visit numbers and card access — useful facts, but they do not specifically emphasize services beyond books.',
      C: 'This choice is vague and does not cite specific non-book services.',
    },
  },
]
