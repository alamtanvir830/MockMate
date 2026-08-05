import type { RWQuestion } from '../types'

export const f7RwModule1QuestionsV2: RWQuestion[] = [
  // ─── q01 | easy | Craft and Structure — Words in Context | correctAnswer: C ───
  {
    id: 'sat-f7-v2-rw-m1-q01',
    section: 'reading-writing',
    moduleId: 'f7v2-rw-module-1',
    domain: 'Craft and Structure',
    skill: 'Words in Context',
    difficulty: 'easy',
    stimulus:
      'The town librarian catalogued thousands of donated books each year. Because the collection grew faster than the shelves could accommodate, surplus volumes were _______ in the basement until staff could determine where each one belonged.',
    question: 'Which choice completes the text with the most logical and precise word or phrase?',
    choices: [
      { label: 'A', text: 'displayed' },
      { label: 'B', text: 'donated' },
      { label: 'C', text: 'stored' },
      { label: 'D', text: 'catalogued' },
    ],
    correctAnswer: 'C',
    explanation:
      '"Stored" means kept in a place temporarily for future use, which matches the idea of placing surplus books in the basement while staff figured out where to shelve them.',
    wrongAnswerExplanations: {
      A: '"Displayed" means arranged for public viewing, but the passage indicates the books were placed out of sight in a basement, not exhibited.',
      B: '"Donated" means given as a gift; the books had already been donated before this step, so the word does not fit the action described.',
      D: '"Catalogued" refers to recording items in a list, but the passage says books were put in the basement pending placement, not that they were being catalogued there.',
    },
  },

  // ─── q02 | easy | Craft and Structure — Words in Context | correctAnswer: A ───
  {
    id: 'sat-f7-v2-rw-m1-q02',
    section: 'reading-writing',
    moduleId: 'f7v2-rw-module-1',
    domain: 'Craft and Structure',
    skill: 'Words in Context',
    difficulty: 'easy',
    stimulus:
      'The new community garden was an immediate success. Neighbors who had rarely spoken began working side by side, and the shared project proved _______ — fostering friendships that outlasted the growing season.',
    question: 'Which choice completes the text with the most logical and precise word or phrase?',
    choices: [
      { label: 'A', text: 'unifying' },
      { label: 'B', text: 'exhausting' },
      { label: 'C', text: 'decorative' },
      { label: 'D', text: 'optional' },
    ],
    correctAnswer: 'A',
    explanation:
      '"Unifying" means bringing people together into a harmonious whole, which fits the description of neighbors bonding through the shared garden project.',
    wrongAnswerExplanations: {
      B: '"Exhausting" means draining energy, which might be physically true of gardening but contradicts the positive, social outcome described.',
      C: '"Decorative" refers to adding visual appeal; while a garden can be decorative, the passage focuses on the social bonds it created, not its appearance.',
      D: '"Optional" means not required, which says nothing about the social effect the passage emphasizes.',
    },
  },

  // ─── q03 | easy | Expression of Ideas — Transitions | correctAnswer: D ───
  {
    id: 'sat-f7-v2-rw-m1-q03',
    section: 'reading-writing',
    moduleId: 'f7v2-rw-module-1',
    domain: 'Expression of Ideas',
    skill: 'Transitions',
    difficulty: 'easy',
    stimulus:
      'Early astronomers believed the universe was static and unchanging. _______, observations of distant galaxies in the twentieth century revealed that the universe is expanding at an accelerating rate.',
    question: 'Which choice completes the text with the most logical transition?',
    choices: [
      { label: 'A', text: 'Similarly,' },
      { label: 'B', text: 'Therefore,' },
      { label: 'C', text: 'In other words,' },
      { label: 'D', text: 'However,' },
    ],
    correctAnswer: 'D',
    explanation:
      '"However" signals a contrast, which is appropriate here because the second sentence contradicts the static-universe belief described in the first sentence.',
    wrongAnswerExplanations: {
      A: '"Similarly" signals that the two sentences share the same idea, but the sentences present opposing views.',
      B: '"Therefore" signals a conclusion drawn from the preceding idea, but the second sentence does not follow logically from the first — it contradicts it.',
      C: '"In other words" signals a restatement, but the second sentence introduces new, contradictory information rather than restating the first.',
    },
  },

  // ─── q04 | easy | Standard English Conventions — Boundaries | correctAnswer: B ───
  {
    id: 'sat-f7-v2-rw-m1-q04',
    section: 'reading-writing',
    moduleId: 'f7v2-rw-module-1',
    domain: 'Standard English Conventions',
    skill: 'Boundaries',
    difficulty: 'easy',
    stimulus:
      'The ceramic workshop drew participants of all ages _______ children as young as six worked alongside retired professionals to shape clay into bowls and sculptures.',
    question: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { label: 'A', text: 'and,' },
      { label: 'B', text: '; children' },
      { label: 'C', text: ', children' },
      { label: 'D', text: 'and children' },
    ],
    correctAnswer: 'B',
    explanation:
      'The original sentence contains two independent clauses. A semicolon correctly joins two independent clauses without a coordinating conjunction. Choice B inserts the semicolon and keeps "children" at the start of the second independent clause.',
    wrongAnswerExplanations: {
      A: 'Adding "and," creates a comma-splice-like structure; "and," after the comma produces awkward punctuation and does not clearly separate the independent clauses.',
      C: 'A comma alone between two independent clauses creates a comma splice, which is a sentence boundary error.',
      D: 'Inserting "and children" without a comma or semicolon fuses two independent clauses into a run-on sentence.',
    },
  },

  // ─── q05 | medium | Craft and Structure — Words in Context | correctAnswer: C ───
  {
    id: 'sat-f7-v2-rw-m1-q05',
    section: 'reading-writing',
    moduleId: 'f7v2-rw-module-1',
    domain: 'Craft and Structure',
    skill: 'Words in Context',
    difficulty: 'medium',
    stimulus:
      'Ethnobotanists study the relationships between human cultures and the plant world, documenting traditional knowledge that might otherwise be lost. Because this knowledge is often held by a dwindling number of elders, researchers approach their interviews with great _______, aware that each session may be among the last opportunities to record the information.',
    question: 'Which choice completes the text with the most logical and precise word or phrase?',
    choices: [
      { label: 'A', text: 'skepticism' },
      { label: 'B', text: 'enthusiasm' },
      { label: 'C', text: 'urgency' },
      { label: 'D', text: 'caution' },
    ],
    correctAnswer: 'C',
    explanation:
      '"Urgency" means pressing importance requiring swift action, which fits the context: researchers know opportunities to record vanishing knowledge are limited, so they feel a pressing need to act quickly.',
    wrongAnswerExplanations: {
      A: '"Skepticism" means doubt or disbelief; while researchers might verify information, the passage focuses on the time-sensitive nature of the interviews, not on questioning the elders\' credibility.',
      B: '"Enthusiasm" means eager interest, which is plausible but too vague — the passage specifically highlights the risk of losing knowledge forever, suggesting urgency rather than mere excitement.',
      D: '"Caution" means carefulness to avoid danger or mistakes; while interviewers may be careful, the clause "each session may be among the last opportunities" emphasizes the time pressure (urgency), not a need to avoid errors.',
    },
  },

  // ─── q06 | medium | Information and Ideas — Central Ideas and Details | correctAnswer: D ───
  {
    id: 'sat-f7-v2-rw-m1-q06',
    section: 'reading-writing',
    moduleId: 'f7v2-rw-module-1',
    domain: 'Information and Ideas',
    skill: 'Central Ideas and Details',
    difficulty: 'medium',
    stimulus:
      'The passenger pigeon, once the most abundant bird in North America, was declared extinct in 1914 when the last known individual, Martha, died in a Cincinnati zoo. Flocks had once darkened the sky for hours as billions of birds flew overhead. Their collapse, from perhaps five billion individuals to zero in roughly fifty years, resulted from a combination of industrial-scale commercial hunting and rapid deforestation of the eastern hardwood forests on which the species depended. The speed and totality of the extinction shocked naturalists of the era and became a landmark case study in how human activity could eliminate even the most plentiful species.',
    question: 'Which choice best states the main idea of the text?',
    choices: [
      { label: 'A', text: 'Martha, the last passenger pigeon, died in captivity because zoo conditions were poorly suited to the species.' },
      { label: 'B', text: 'Deforestation was a greater threat to the passenger pigeon than commercial hunting.' },
      { label: 'C', text: 'The passenger pigeon\'s abundance made naturalists confident it could never go extinct.' },
      { label: 'D', text: 'The rapid extinction of the once-numerous passenger pigeon demonstrated that human activities could wipe out even the most plentiful species.' },
    ],
    correctAnswer: 'D',
    explanation:
      'The passage describes the pigeon\'s staggering former abundance, the human causes of its collapse, and concludes that its extinction became a landmark case showing that even abundant species are not safe from human-driven extinction — exactly what choice D states.',
    wrongAnswerExplanations: {
      A: 'The passage mentions Martha briefly as a date marker but does not discuss zoo conditions or claim they caused her death.',
      B: 'The passage names both hunting and deforestation as causes without ranking one above the other, so claiming deforestation was greater misrepresents the text.',
      C: 'The passage says naturalists were shocked by the extinction, but it does not say their shock stemmed from overconfidence in the species\' abundance.',
    },
  },

  // ─── q07 | medium | Expression of Ideas — Rhetorical Synthesis | correctAnswer: A ───
  {
    id: 'sat-f7-v2-rw-m1-q07',
    section: 'reading-writing',
    moduleId: 'f7v2-rw-module-1',
    domain: 'Expression of Ideas',
    skill: 'Rhetorical Synthesis',
    difficulty: 'medium',
    stimulus:
      'A student is preparing a report on fermentation technology in ancient societies and has gathered the following notes:\n\n• Fermentation was used independently in Mesopotamia, Egypt, China, and Mesoamerica thousands of years ago.\n• Ancient Egyptians used fermentation to produce bread and beer as early as 3000 BCE.\n• The Aztec civilization fermented agave sap to create pulque, a beverage consumed in ceremonial contexts.\n• Chinese brewers fermented grain into rice wine (huangjiu) by at least 7000 BCE, making it one of the earliest known fermented beverages.\n• In each culture, fermentation served both nutritional and social or ritual functions.',
    question:
      'The student wants to emphasize that fermentation technology arose in multiple civilizations without contact with one another. Which choice most effectively uses relevant information from the notes to accomplish this goal?',
    choices: [
      { label: 'A', text: 'Fermentation developed independently across Mesopotamia, Egypt, China, and Mesoamerica, suggesting that different civilizations arrived at the same technique without influencing one another.' },
      { label: 'B', text: 'Ancient Egyptians fermented grain to produce bread and beer, while the Aztecs created pulque from agave sap for ceremonial use.' },
      { label: 'C', text: 'Chinese brewers fermented grain into rice wine by at least 7000 BCE, making it one of the earliest recorded instances of fermentation.' },
      { label: 'D', text: 'Fermentation served both nutritional and social purposes in many ancient cultures around the world.' },
    ],
    correctAnswer: 'A',
    explanation:
      'Choice A directly states that fermentation arose independently in multiple civilizations, fulfilling the goal of emphasizing parallel independent discovery. It draws on the note about four distinct civilizations and implies no cross-cultural contact.',
    wrongAnswerExplanations: {
      B: 'This choice compares two civilizations\' products but does not make the point about independent, contact-free development.',
      C: 'This choice highlights China\'s early use but focuses on a single civilization, not on the independent multi-civilization pattern.',
      D: 'This choice summarizes the functions of fermentation broadly but does not address independent development across separate civilizations.',
    },
  },

  // ─── q08 | medium | Expression of Ideas — Transitions | correctAnswer: B ───
  {
    id: 'sat-f7-v2-rw-m1-q08',
    section: 'reading-writing',
    moduleId: 'f7v2-rw-module-1',
    domain: 'Expression of Ideas',
    skill: 'Transitions',
    difficulty: 'medium',
    stimulus:
      'Researchers studying urban heat islands have found that cities with abundant tree canopy experience significantly lower summer temperatures than comparable cities without trees. _______, a comprehensive 2023 analysis of forty metropolitan areas found that neighborhoods with greater than 30 percent canopy cover were on average 4°C cooler during peak afternoon hours than neighborhoods with less than 10 percent cover.',
    question: 'Which choice completes the text with the most logical transition?',
    choices: [
      { label: 'A', text: 'On the other hand,' },
      { label: 'B', text: 'For instance,' },
      { label: 'C', text: 'Nevertheless,' },
      { label: 'D', text: 'As a result,' },
    ],
    correctAnswer: 'B',
    explanation:
      '"For instance" introduces a specific example that illustrates the general finding stated in the first sentence. The 2023 analysis is a concrete illustration of the broader claim about tree canopy and temperature.',
    wrongAnswerExplanations: {
      A: '"On the other hand" signals a contrast, but the second sentence supports — rather than contradicts — the first.',
      C: '"Nevertheless" signals that something happens despite an obstacle, implying a concession; the second sentence does not concede anything.',
      D: '"As a result" signals a cause-and-effect relationship, but the second sentence is an example, not a consequence of the first sentence.',
    },
  },

  // ─── q09 | medium | Craft and Structure — Words in Context | correctAnswer: D ───
  {
    id: 'sat-f7-v2-rw-m1-q09',
    section: 'reading-writing',
    moduleId: 'f7v2-rw-module-1',
    domain: 'Craft and Structure',
    skill: 'Words in Context',
    difficulty: 'medium',
    stimulus:
      'Forensic linguists analyze language patterns to help identify anonymous authors. By comparing stylistic features such as sentence length, vocabulary range, and the frequency of specific grammatical constructions, they can often _______ a disputed text to a known writer with a surprisingly high degree of confidence.',
    question: 'Which choice completes the text with the most logical and precise word or phrase?',
    choices: [
      { label: 'A', text: 'translate' },
      { label: 'B', text: 'contradict' },
      { label: 'C', text: 'publish' },
      { label: 'D', text: 'attribute' },
    ],
    correctAnswer: 'D',
    explanation:
      '"Attribute" means to assign a work to a particular author based on evidence, which is precisely what forensic linguists do when they link a disputed text to a known writer.',
    wrongAnswerExplanations: {
      A: '"Translate" means to convert text from one language to another; the passage is about identifying authorship, not changing the language.',
      B: '"Contradict" means to assert the opposite; forensic linguists match texts to authors rather than opposing them.',
      C: '"Publish" means to make available to the public; the passage is about identifying authorship, not about releasing the text.',
    },
  },

  // ─── q10 | medium | Information and Ideas — Central Ideas and Details | correctAnswer: C ───
  {
    id: 'sat-f7-v2-rw-m1-q10',
    section: 'reading-writing',
    moduleId: 'f7v2-rw-module-1',
    domain: 'Information and Ideas',
    skill: 'Central Ideas and Details',
    difficulty: 'medium',
    stimulus:
      'In the nineteenth century, the concept of the "self-made man" became a cornerstone of American cultural identity. Popular biographies of figures such as Andrew Carnegie and John D. Rockefeller framed their subjects\' success as the product of individual virtue — hard work, thrift, and perseverance — while largely omitting the structural advantages, inherited networks, and favorable economic conditions that also shaped their rises. Historians now recognize that this narrative, however inspiring, obscured as much as it revealed about the mechanisms of upward mobility in industrializing America.',
    question: 'According to the text, which of the following is true about popular nineteenth-century biographies of wealthy figures?',
    choices: [
      { label: 'A', text: 'They accurately depicted the role of inherited networks in their subjects\' success.' },
      { label: 'B', text: 'They were primarily written by economists who studied industrial growth.' },
      { label: 'C', text: 'They emphasized individual virtues while leaving out structural factors that also contributed to their subjects\' success.' },
      { label: 'D', text: 'They caused historians to overestimate the importance of hard work in achieving upward mobility.' },
    ],
    correctAnswer: 'C',
    explanation:
      'The passage explicitly states that popular biographies framed success as the product of individual virtue "while largely omitting the structural advantages, inherited networks, and favorable economic conditions." Choice C accurately restates this claim.',
    wrongAnswerExplanations: {
      A: 'This directly contradicts the passage, which says structural advantages and inherited networks were largely omitted.',
      B: 'The passage does not discuss who wrote the biographies or their professional backgrounds.',
      D: 'The passage says the narrative obscured mechanisms of mobility; it does not say historians were led to overestimate hard work specifically.',
    },
  },

  // ─── q11 | medium | Information and Ideas — Command of Evidence (Textual) | correctAnswer: A ───
  {
    id: 'sat-f7-v2-rw-m1-q11',
    section: 'reading-writing',
    moduleId: 'f7v2-rw-module-1',
    domain: 'Information and Ideas',
    skill: 'Command of Evidence',
    difficulty: 'medium',
    stimulus:
      'Researchers studying the social behavior of elephants have noted that herds demonstrate remarkable coordination when threatened by predators. A lead female, typically the oldest and most experienced individual in the herd, positions herself between the threat and younger members, while other adults form a protective circle. Scientists observe that herds led by older matriarchs show a higher survival rate for calves during periods of drought and predation than herds led by younger females.',
    question:
      'A biologist argues that elephant herd survival is positively correlated with the experience and age of the lead female. Which quotation from the passage best supports this argument?',
    choices: [
      { label: 'A', text: '"herds led by older matriarchs show a higher survival rate for calves during periods of drought and predation than herds led by younger females"' },
      { label: 'B', text: '"A lead female, typically the oldest and most experienced individual in the herd, positions herself between the threat and younger members"' },
      { label: 'C', text: '"other adults form a protective circle"' },
      { label: 'D', text: '"Researchers studying the social behavior of elephants have noted that herds demonstrate remarkable coordination when threatened"' },
    ],
    correctAnswer: 'A',
    explanation:
      'Choice A directly provides quantitative comparative evidence — older matriarchs correlate with higher calf survival — which directly supports the biologist\'s argument about age and experience benefiting herd survival.',
    wrongAnswerExplanations: {
      B: 'This describes a behavior of the lead female but does not provide evidence of a survival advantage linked to her age or experience.',
      C: 'This describes the behavior of other adults, not the lead female, and provides no comparative survival data.',
      D: 'This is a general introductory observation about coordination and does not connect matriarch age to survival outcomes.',
    },
  },

  // ─── q12 | medium | Expression of Ideas — Transitions | correctAnswer: B ───
  {
    id: 'sat-f7-v2-rw-m1-q12',
    section: 'reading-writing',
    moduleId: 'f7v2-rw-module-1',
    domain: 'Expression of Ideas',
    skill: 'Transitions',
    difficulty: 'medium',
    stimulus:
      'The technique of freeze-drying preserves food by removing moisture in a vacuum at very low temperatures, locking in flavor and nutritional content far more effectively than conventional drying methods. _______, freeze-dried foods can be rehydrated quickly and taste almost identical to their fresh counterparts.',
    question: 'Which choice completes the text with the most logical transition?',
    choices: [
      { label: 'A', text: 'In contrast,' },
      { label: 'B', text: 'Furthermore,' },
      { label: 'C', text: 'However,' },
      { label: 'D', text: 'Consequently,' },
    ],
    correctAnswer: 'B',
    explanation:
      '"Furthermore" adds an additional benefit to those already mentioned, which is appropriate here — the second sentence adds another advantage (quick rehydration and preserved taste) to the ones described in the first.',
    wrongAnswerExplanations: {
      A: '"In contrast" signals an opposition, but the second sentence continues listing benefits rather than opposing the first.',
      C: '"However" signals a concession or contrast; the second sentence does not contradict or qualify the first.',
      D: '"Consequently" signals a result caused by the preceding event; the second sentence is an additional advantage, not a consequence of the preservation method described.',
    },
  },

  // ─── q13 | medium | Information and Ideas — Command of Evidence (Quantitative) | correctAnswer: D ───
  {
    id: 'sat-f7-v2-rw-m1-q13',
    section: 'reading-writing',
    moduleId: 'f7v2-rw-module-1',
    domain: 'Information and Ideas',
    skill: 'Command of Evidence',
    difficulty: 'medium',
    stimulus:
      'A research team examined the relationship between daily reading habits and vocabulary size in adults. Participants recorded their daily reading time in minutes and completed a standardized vocabulary assessment. The team hypothesized that adults who read more than sixty minutes per day would score substantially higher on the vocabulary assessment than those who read fewer than thirty minutes per day.',
    graphData: {
      type: 'table',
      title: 'Vocabulary Scores by Daily Reading Time',
      headers: ['Daily Reading Time', 'Average Vocabulary Score (out of 100)', 'Number of Participants'],
      rows: [
        ['< 30 minutes', '61', '120'],
        ['30–60 minutes', '74', '95'],
        ['> 60 minutes', '88', '80'],
      ],
    },
    question: 'Which choice best uses data from the table to support the research team\'s hypothesis?',
    choices: [
      { label: 'A', text: 'Adults who read 30–60 minutes per day scored 74 on average, higher than those reading fewer than 30 minutes.' },
      { label: 'B', text: 'The greatest number of participants (120) fell in the lowest reading-time category.' },
      { label: 'C', text: 'All three reading groups scored above 60 on the vocabulary assessment.' },
      { label: 'D', text: 'Adults reading more than 60 minutes per day scored an average of 88, compared to 61 for those reading fewer than 30 minutes — a difference of 27 points.' },
    ],
    correctAnswer: 'D',
    explanation:
      'The hypothesis specifically compares adults reading more than 60 minutes to those reading fewer than 30 minutes. Choice D cites those two groups\' scores (88 vs. 61), showing a 27-point gap that directly supports the claim of a "substantial" difference.',
    wrongAnswerExplanations: {
      A: 'This compares the middle group to the lowest group, not the comparison the hypothesis specifies.',
      B: 'The number of participants is irrelevant to the hypothesis about vocabulary scores.',
      C: 'Noting that all groups exceeded 60 does not speak to the substantial difference the hypothesis predicts between the highest and lowest reading groups.',
    },
  },

  // ─── q14 | medium | Craft and Structure — Text Structure and Purpose | correctAnswer: C ───
  {
    id: 'sat-f7-v2-rw-m1-q14',
    section: 'reading-writing',
    moduleId: 'f7v2-rw-module-1',
    domain: 'Craft and Structure',
    skill: 'Text Structure and Purpose',
    difficulty: 'medium',
    stimulus:
      'Consider the humble sand dune. At first glance, a dune appears to be an inert pile of sand, fixed in place by its own weight. Yet dunes are among the most dynamic landforms on Earth. Individual sand grains are continuously lifted by wind, carried forward, and deposited on the slip face — the steep downwind side of the dune — causing the entire structure to migrate slowly across the landscape. Some dunes travel tens of meters per year, and in certain desert regions they have been documented advancing on and swallowing entire villages.',
    question: 'What is the main purpose of the text?',
    choices: [
      { label: 'A', text: 'To warn readers about the danger that migrating dunes pose to human settlements' },
      { label: 'B', text: 'To describe the geological processes that create deserts in arid regions' },
      { label: 'C', text: 'To challenge the assumption that sand dunes are static by explaining how they actually migrate' },
      { label: 'D', text: 'To compare sand dunes with other dynamic landforms such as glaciers and river deltas' },
    ],
    correctAnswer: 'C',
    explanation:
      'The passage opens by contrasting the appearance of dunes as inert with the reality that they are highly dynamic, then explains the mechanism (grain movement and slip-face deposition) that causes migration. The purpose is to correct a misconception about dune behavior.',
    wrongAnswerExplanations: {
      A: 'While the passage mentions dunes engulfing villages, this is one illustrative detail, not the primary purpose.',
      B: 'The passage does not discuss desert formation or the broader geological processes that produce arid regions.',
      D: 'No comparison with glaciers or river deltas appears in the passage.',
    },
  },

  // ─── q15 | medium | Information and Ideas — Inferences | correctAnswer: A ───
  {
    id: 'sat-f7-v2-rw-m1-q15',
    section: 'reading-writing',
    moduleId: 'f7v2-rw-module-1',
    domain: 'Information and Ideas',
    skill: 'Inferences',
    difficulty: 'medium',
    stimulus:
      'Textile historian Dr. Yemi Okafor has spent two decades documenting handwoven fabrics produced by communities in West Africa. She argues that these textiles encode historical and social information — including lineage, status, and regional affiliation — through patterns and colors that trained observers can decode. In recent years, as mass-produced imitations have proliferated in global markets, distinguishing authentic handwoven pieces from machine-made replicas has become increasingly difficult even for experts.',
    question: 'Which inference is best supported by the text?',
    choices: [
      { label: 'A', text: 'The spread of mass-produced imitations may complicate efforts to use textiles as historical and social records.' },
      { label: 'B', text: 'Dr. Okafor believes machine-made textiles are superior in quality to authentic handwoven pieces.' },
      { label: 'C', text: 'The communities that produce handwoven textiles have embraced mass production as an economic opportunity.' },
      { label: 'D', text: 'Textile patterns in West Africa have changed significantly over the past two decades due to globalization.' },
    ],
    correctAnswer: 'A',
    explanation:
      'The passage states that textiles encode historical and social information and that distinguishing authentic from fake pieces has become harder. It follows logically that if experts cannot reliably identify authentic textiles, using those textiles as historical and social records becomes more difficult.',
    wrongAnswerExplanations: {
      B: 'The passage does not suggest Dr. Okafor views machine-made textiles as superior; quite the opposite concern is implied.',
      C: 'The passage says mass-produced imitations have proliferated in global markets but does not state that the producing communities themselves have embraced or driven that trend.',
      D: 'The passage does not claim that the patterns themselves have changed; the concern is about replication, not alteration of authentic designs.',
    },
  },

  // ─── q16 | medium | Standard English Conventions — Boundaries | correctAnswer: D ───
  {
    id: 'sat-f7-v2-rw-m1-q16',
    section: 'reading-writing',
    moduleId: 'f7v2-rw-module-1',
    domain: 'Standard English Conventions',
    skill: 'Boundaries',
    difficulty: 'medium',
    stimulus:
      'The Edo Kingdom, centered in present-day Nigeria, produced extraordinary bronze castings from at least the thirteenth century onward _______ these works, known as the Benin Bronzes, depicted royal ceremonies, warriors, and court officials in remarkable detail.',
    question: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { label: 'A', text: 'onward, these works' },
      { label: 'B', text: 'onward these works,' },
      { label: 'C', text: 'onward and these works,' },
      { label: 'D', text: 'onward; these works,' },
    ],
    correctAnswer: 'D',
    explanation:
      'Two independent clauses must be separated by a semicolon (or a period) when no coordinating conjunction is used. Choice D correctly places a semicolon after "onward" and keeps "these works" as the subject of the second independent clause.',
    wrongAnswerExplanations: {
      A: 'A comma alone between two independent clauses creates a comma splice.',
      B: 'No punctuation between the two independent clauses creates a fused (run-on) sentence.',
      C: 'Adding "and" without a comma before it between two independent clauses creates a run-on; the comma is misplaced after "works" rather than before "and."',
    },
  },

  // ─── q17 | medium | Standard English Conventions — Form, Structure, and Sense | correctAnswer: B ───
  {
    id: 'sat-f7-v2-rw-m1-q17',
    section: 'reading-writing',
    moduleId: 'f7v2-rw-module-1',
    domain: 'Standard English Conventions',
    skill: 'Form, Structure, and Sense',
    difficulty: 'medium',
    stimulus:
      'The committee members, each of whom had reviewed the lengthy proposal independently, _______ their assessments before the formal vote.',
    question: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { label: 'A', text: 'were share' },
      { label: 'B', text: 'shared' },
      { label: 'C', text: 'sharing' },
      { label: 'D', text: 'has shared' },
    ],
    correctAnswer: 'B',
    explanation:
      '"Shared" is the simple past tense that agrees with the plural subject "committee members" and provides a complete verb for the main clause. The action (sharing assessments) happened before the vote, so simple past is appropriate.',
    wrongAnswerExplanations: {
      A: '"Were share" is not a grammatical verb form in Standard English.',
      C: '"Sharing" is a participle and does not function as the main verb of the sentence without an auxiliary; the sentence would have no main verb.',
      D: '"Has shared" is third-person singular present perfect; the subject "committee members" is plural, requiring a plural verb, and the context calls for simple past rather than present perfect.',
    },
  },

  // ─── q18 | medium | Expression of Ideas — Transitions | correctAnswer: C ───
  {
    id: 'sat-f7-v2-rw-m1-q18',
    section: 'reading-writing',
    moduleId: 'f7v2-rw-module-1',
    domain: 'Expression of Ideas',
    skill: 'Transitions',
    difficulty: 'medium',
    stimulus:
      'Early clinical trials of the new antibiotic showed that it eliminated the target bacteria in more than 90 percent of cases. _______, the drug produced significant gastrointestinal side effects in roughly a third of participants, raising questions about its suitability for long-term treatment.',
    question: 'Which choice completes the text with the most logical transition?',
    choices: [
      { label: 'A', text: 'Additionally,' },
      { label: 'B', text: 'As a result,' },
      { label: 'C', text: 'Even so,' },
      { label: 'D', text: 'In summary,' },
    ],
    correctAnswer: 'C',
    explanation:
      '"Even so" signals a concession — acknowledging the antibiotic\'s efficacy while introducing the counterbalancing problem of side effects. This transition captures the contrast between the positive finding and the complicating drawback.',
    wrongAnswerExplanations: {
      A: '"Additionally" adds information in the same direction as the first sentence; it cannot signal the contrasting drawback described in the second sentence.',
      B: '"As a result" implies the side effects are caused by the effectiveness, which is not what the passage claims.',
      D: '"In summary" signals a conclusion that recaps what came before; the second sentence introduces new, contrasting information rather than summarizing.',
    },
  },

  // ─── q19 | hard | Craft and Structure — Words in Context | correctAnswer: A ───
  {
    id: 'sat-f7-v2-rw-m1-q19',
    section: 'reading-writing',
    moduleId: 'f7v2-rw-module-1',
    domain: 'Craft and Structure',
    skill: 'Words in Context',
    difficulty: 'hard',
    stimulus:
      'Philosopher of science Ian Hacking argues that certain scientific categories do not merely describe pre-existing natural kinds but instead _______ the very phenomena they purport to classify. Once a diagnostic category is established and widely applied, individuals who are labeled by it may begin to understand and enact their experiences in ways shaped by that label, thereby transforming the category\'s real-world referent.',
    question: 'Which choice completes the text with the most logical and precise word or phrase?',
    choices: [
      { label: 'A', text: 'constitute' },
      { label: 'B', text: 'observe' },
      { label: 'C', text: 'contest' },
      { label: 'D', text: 'predict' },
    ],
    correctAnswer: 'A',
    explanation:
      '"Constitute" means to make up or bring into being, which fits Hacking\'s argument that classification does not merely reflect but actually creates or shapes the phenomena — a category actively constitutes what it names.',
    wrongAnswerExplanations: {
      B: '"Observe" means to watch or notice, which would support the traditional scientific view that categories passively detect pre-existing phenomena — the opposite of Hacking\'s argument.',
      C: '"Contest" means to dispute or challenge; while Hacking challenges the traditional view, the blank must describe what scientific categories do to phenomena, not what Hacking does to other philosophers\' claims.',
      D: '"Predict" means to forecast a future event; the passage is about the active shaping of phenomena, not about forecasting them.',
    },
  },

  // ─── q20 | hard | Craft and Structure — Text Structure and Purpose | correctAnswer: D ───
  {
    id: 'sat-f7-v2-rw-m1-q20',
    section: 'reading-writing',
    moduleId: 'f7v2-rw-module-1',
    domain: 'Craft and Structure',
    skill: 'Text Structure and Purpose',
    difficulty: 'hard',
    stimulus:
      'When historians of cartography examine medieval European maps, they encounter a striking feature: the maps are oriented with east at the top rather than north. This convention reflects the theological geography of the era, in which Jerusalem and, beyond it, the Garden of Eden were placed at the apex of the world. Such maps were not meant to guide travelers — they were meant to organize spiritual and cosmological understanding. The modern reader, accustomed to north-at-top orientation, risks misreading these documents as failed attempts at geographic accuracy when they were in fact highly successful attempts at a different kind of representation altogether.',
    question: 'What is the primary purpose of the final sentence of the text?',
    choices: [
      { label: 'A', text: 'To recommend that historians adopt a new methodology for studying medieval maps' },
      { label: 'B', text: 'To argue that medieval Europeans had superior geographic knowledge compared to modern people' },
      { label: 'C', text: 'To provide a historical example of how cartographic conventions have changed over time' },
      { label: 'D', text: 'To caution against evaluating medieval maps by standards they were never intended to meet' },
    ],
    correctAnswer: 'D',
    explanation:
      'The final sentence warns that modern readers risk "misreading" these maps as failed geographic documents, and corrects this by explaining they succeeded at a different purpose. Its function is to caution against applying an inappropriate modern standard to a medieval artifact.',
    wrongAnswerExplanations: {
      A: 'The passage does not recommend a specific new methodology; it makes a conceptual point about interpretation.',
      B: 'The passage contrasts medieval and modern orientations but does not claim medieval Europeans had superior geographic knowledge.',
      C: 'Describing changing conventions is a function of the earlier sentences; the final sentence uses that change to make a normative point about how not to read old maps.',
    },
  },

  // ─── q21 | hard | Information and Ideas — Command of Evidence (Textual) | correctAnswer: B ───
  {
    id: 'sat-f7-v2-rw-m1-q21',
    section: 'reading-writing',
    moduleId: 'f7v2-rw-module-1',
    domain: 'Information and Ideas',
    skill: 'Command of Evidence',
    difficulty: 'hard',
    stimulus:
      'Literary scholar Dr. Priya Nair contends that the unreliable narrator in twentieth-century fiction is not merely a technical device for creating suspense but a philosophical statement about the impossibility of objective self-knowledge. She argues that when narrators contradict themselves, omit key facts, or misinterpret their own motivations, skilled authors are enacting — rather than just describing — the epistemic limits that psychoanalytic and phenomenological thinkers had been theorizing since the late nineteenth century.',
    question:
      'Which finding, if true, would most directly support Dr. Nair\'s argument?',
    choices: [
      { label: 'A', text: 'Sales of twentieth-century novels featuring unreliable narrators increased significantly after critics began praising their structural complexity.' },
      { label: 'B', text: 'Authors known to have read Freud and Husserl produced narrators whose self-contradictions closely mirror the specific epistemic failures those thinkers described.' },
      { label: 'C', text: 'The unreliable narrator device appears in fiction from many cultures, not only Western literary traditions.' },
      { label: 'D', text: 'Readers who encounter unreliable narrators report higher levels of engagement with the plot than readers of omniscient third-person narratives.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Dr. Nair argues that unreliable narrators enact the epistemic limits theorized by psychoanalysts and phenomenologists. If authors who actually read Freud and Husserl created narrators that mirror those thinkers\' specific ideas, that directly supports the claim that the device is a deliberate philosophical enactment, not just a suspense technique.',
    wrongAnswerExplanations: {
      A: 'Sales data relates to commercial reception, not to the philosophical intent Dr. Nair argues the device reflects.',
      C: 'Cross-cultural prevalence shows the device is widespread but does not address whether it enacts specific philosophical ideas about self-knowledge.',
      D: 'Reader engagement is a psychological response, not evidence that authors used the device to enact philosophical claims about epistemic limits.',
    },
  },

  // ─── q22 | hard | Information and Ideas — Inferences | correctAnswer: C ───
  {
    id: 'sat-f7-v2-rw-m1-q22',
    section: 'reading-writing',
    moduleId: 'f7v2-rw-module-1',
    domain: 'Information and Ideas',
    skill: 'Inferences',
    difficulty: 'hard',
    stimulus:
      'The acoustic ecology of old-growth forests differs substantially from that of second-growth forests of the same species. In old-growth stands, the structural heterogeneity of the canopy — created by trees of vastly different ages, heights, and decay states — produces an environment in which sound propagates unevenly and multiple frequency ranges can coexist without interfering with one another. Second-growth forests, with their more uniform canopy structure, lack this acoustic partitioning. Ornithologists have documented that bird communities in old-growth forests contain a greater diversity of species with distinct song frequencies than communities in second-growth forests, even when food resources are comparable.',
    question: 'Which inference is best supported by the passage?',
    choices: [
      { label: 'A', text: 'Bird species in old-growth forests produce louder calls than those in second-growth forests to compete for acoustic space.' },
      { label: 'B', text: 'Second-growth forests support larger bird populations than old-growth forests because of their uniform canopy.' },
      { label: 'C', text: 'The structural complexity of old-growth forests may help support greater bird species diversity by enabling more song frequencies to coexist.' },
      { label: 'D', text: 'Birds in second-growth forests eventually adapt their song frequencies to match those of old-growth species.' },
    ],
    correctAnswer: 'C',
    explanation:
      'The passage links old-growth canopy heterogeneity to acoustic partitioning (multiple frequencies coexisting) and then notes that old-growth forests have more diverse bird communities with distinct song frequencies. It follows that the structural complexity facilitates coexistence of diverse songs, supporting more species.',
    wrongAnswerExplanations: {
      A: 'The passage describes acoustic partitioning — a system where frequencies do not interfere — which would reduce rather than increase the need for louder calls.',
      B: 'The passage discusses species diversity, not population size, and does not suggest second-growth forests have larger bird populations.',
      D: 'The passage does not discuss adaptation of song frequencies over time in second-growth forests.',
    },
  },

  // ─── q23 | hard | Expression of Ideas — Rhetorical Synthesis | correctAnswer: D ───
  {
    id: 'sat-f7-v2-rw-m1-q23',
    section: 'reading-writing',
    moduleId: 'f7v2-rw-module-1',
    domain: 'Expression of Ideas',
    skill: 'Rhetorical Synthesis',
    difficulty: 'hard',
    stimulus:
      'A student is preparing an essay on the economic consequences of the 2010 Deepwater Horizon oil spill and has gathered the following notes:\n\n• The Deepwater Horizon explosion in April 2010 released approximately 4.9 million barrels of oil into the Gulf of Mexico over 87 days.\n• Commercial fishing closures affected more than 88,000 square miles of Gulf waters at the spill\'s peak, devastating fishing-dependent communities.\n• Tourism revenues along Gulf Coast states dropped by an estimated $23 billion in the two years following the spill.\n• BP ultimately paid more than $65 billion in cleanup costs, legal settlements, and government penalties.\n• Small business owners in affected areas reported that recovery of normal revenues took between three and seven years.',
    question:
      'The student wants to illustrate that the economic damage from the spill extended beyond the immediate fishing industry to other sectors and persisted over many years. Which choice most effectively uses relevant information from the notes to accomplish this goal?',
    choices: [
      { label: 'A', text: 'The Deepwater Horizon explosion released approximately 4.9 million barrels of oil over 87 days, making it one of the largest oil spills in history.' },
      { label: 'B', text: 'Fishing closures covered more than 88,000 square miles of Gulf waters, devastating communities that depended on commercial fishing.' },
      { label: 'C', text: 'BP paid more than $65 billion in cleanup costs, legal settlements, and government penalties as a consequence of the spill.' },
      { label: 'D', text: 'Beyond the fishing industry, Gulf tourism revenues fell an estimated $23 billion, and small business owners across affected areas reported that revenues did not return to normal for three to seven years.' },
    ],
    correctAnswer: 'D',
    explanation:
      'The goal is to show that economic damage extended beyond fishing and persisted over time. Choice D cites tourism revenue loss (a different sector from fishing) and the multi-year recovery timeline for small businesses, directly addressing both elements of the stated goal.',
    wrongAnswerExplanations: {
      A: 'This describes the physical scale of the spill, not the economic consequences beyond the fishing industry.',
      B: 'This addresses fishing industry impact only, not the extension of damage to other sectors.',
      C: 'BP\'s payments describe corporate financial liability rather than the economic harm sustained by communities and sectors beyond fishing.',
    },
  },

  // ─── q24 | hard | Craft and Structure — Words in Context | correctAnswer: A ───
  {
    id: 'sat-f7-v2-rw-m1-q24',
    section: 'reading-writing',
    moduleId: 'f7v2-rw-module-1',
    domain: 'Craft and Structure',
    skill: 'Words in Context',
    difficulty: 'hard',
    stimulus:
      'The legal doctrine of adverse possession allows a person who occupies another\'s land openly and continuously for a statutory period to claim ownership. Critics argue that the doctrine is _______ — conferring a legal windfall on those who benefit from another\'s inattention — while proponents counter that it serves the productive policy goal of ensuring land is actively used rather than left idle.',
    question: 'Which choice completes the text with the most logical and precise word or phrase?',
    choices: [
      { label: 'A', text: 'inequitable' },
      { label: 'B', text: 'innovative' },
      { label: 'C', text: 'transparent' },
      { label: 'D', text: 'provisional' },
    ],
    correctAnswer: 'A',
    explanation:
      '"Inequitable" means unfair, which directly captures critics\' objection that adverse possession rewards occupiers at the expense of inattentive but legitimate owners — a matter of fairness and justice.',
    wrongAnswerExplanations: {
      B: '"Innovative" means novel or creative; critics are not objecting that the doctrine is too new or imaginative, so this word does not fit their critique.',
      C: '"Transparent" means open or clear; critics are concerned about unfairness, not about a lack of clarity in the doctrine.',
      D: '"Provisional" means temporary or conditional; the doctrine grants permanent ownership after a statutory period, and critics object to this outcome as unfair, not as conditional.',
    },
  },

  // ─── q25 | hard | Craft and Structure — Cross-Text Connections | correctAnswer: B ───
  {
    id: 'sat-f7-v2-rw-m1-q25',
    section: 'reading-writing',
    moduleId: 'f7v2-rw-module-1',
    domain: 'Craft and Structure',
    skill: 'Cross-Text Connections',
    difficulty: 'hard',
    stimulus:
      'Text 1\nSociologist Dr. Amara Diallo argues that remote work arrangements fundamentally alter the structure of professional identity. When work and home occupy the same physical space, workers lose the spatial and temporal boundaries that once helped them define themselves as distinct from their roles. Without a commute, a dedicated office, or a clear end-of-day transition, employees may struggle to maintain a coherent sense of self that is not wholly defined by professional demands.\n\nText 2\nOrganizational psychologist Dr. Neil Farquhar challenges the assumption that spatial separation from the workplace is necessary for a stable professional identity. His longitudinal research found that remote workers who established consistent personal routines — defined start and stop times, dedicated workspaces within the home, and deliberate end-of-day rituals — reported identity stability comparable to that of in-office workers. Farquhar concludes that it is routine structure, not physical location, that underlies professional identity.',
    question: 'Based on the texts, how would Dr. Farquhar most likely respond to Dr. Diallo\'s argument?',
    choices: [
      { label: 'A', text: 'By agreeing that remote workers inevitably experience an erosion of professional identity regardless of the routines they adopt' },
      { label: 'B', text: 'By arguing that the boundaries Diallo considers spatially dependent can be recreated through deliberate personal routines, making location less decisive than Diallo claims' },
      { label: 'C', text: 'By suggesting that professional identity is irrelevant to workers\' well-being and that Diallo\'s concerns are overstated' },
      { label: 'D', text: 'By contending that remote work is only beneficial for workers who already had a strong professional identity before working from home' },
    ],
    correctAnswer: 'B',
    explanation:
      'Farquhar\'s research directly counters Diallo\'s spatial argument by showing that deliberate routines — which can substitute for physical boundaries — preserve identity stability. He would therefore respond to Diallo by arguing that the boundaries she treats as spatially determined can in fact be recreated through routine, diminishing location\'s role.',
    wrongAnswerExplanations: {
      A: 'Farquhar\'s findings show that remote workers with good routines do maintain identity stability, so he would not agree that erosion is inevitable.',
      C: 'Farquhar does not dismiss professional identity as irrelevant; his entire research agenda is premised on its importance.',
      D: 'Farquhar attributes stability to current routine structure, not to pre-existing identity strength; this is not a position supported by Text 2.',
    },
  },

  // ─── q26 | hard | Standard English Conventions — Boundaries | correctAnswer: C ───
  {
    id: 'sat-f7-v2-rw-m1-q26',
    section: 'reading-writing',
    moduleId: 'f7v2-rw-module-1',
    domain: 'Standard English Conventions',
    skill: 'Boundaries',
    difficulty: 'hard',
    stimulus:
      'Mathematician Emmy Noether\'s 1915 theorem, which established a profound correspondence between symmetries in physics and conservation laws _______ remains one of the most celebrated results in theoretical physics, even though it was largely overlooked during her lifetime.',
    question: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { label: 'A', text: 'laws, it' },
      { label: 'B', text: 'laws it' },
      { label: 'C', text: 'laws,' },
      { label: 'D', text: 'laws; it' },
    ],
    correctAnswer: 'C',
    explanation:
      'The subject of the sentence is "Noether\'s 1915 theorem" and "which established … conservation laws" is a non-restrictive relative clause modifying it. After the clause ends, a comma closes the parenthetical and the main verb "remains" follows. Only a single comma after "laws" is needed — the main clause continues without a new subject.',
    wrongAnswerExplanations: {
      A: 'Adding "it" after "laws," creates a second subject for the main clause, producing a comma splice or a fused structure in which the pronoun is redundant.',
      B: '"laws it" without punctuation creates a run-on because no punctuation separates the end of the relative clause from any continuation.',
      D: '"laws; it" inserts a semicolon and a new subject "it," turning the end of the relative clause into a separate independent clause joined with a semicolon, which incorrectly splits what should be a single sentence.',
    },
  },

  // ─── q27 | hard | Standard English Conventions — Form, Structure, and Sense | correctAnswer: A ───
  {
    id: 'sat-f7-v2-rw-m1-q27',
    section: 'reading-writing',
    moduleId: 'f7v2-rw-module-1',
    domain: 'Standard English Conventions',
    skill: 'Form, Structure, and Sense',
    difficulty: 'hard',
    stimulus:
      'Scholars who study the transmission of ancient manuscripts note that scribal errors accumulated over generations of copying: a word misread in one copy would be reproduced faithfully in all subsequent copies, _______ the error permanent until a more accurate source manuscript was rediscovered.',
    question: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { label: 'A', text: 'rendering' },
      { label: 'B', text: 'which renders' },
      { label: 'C', text: 'to render' },
      { label: 'D', text: 'rendered' },
    ],
    correctAnswer: 'A',
    explanation:
      '"Rendering" functions as a participial phrase attached to the preceding main clause, describing the result of faithful reproduction of the error. A participial phrase correctly modifies the preceding action without creating an additional independent clause.',
    wrongAnswerExplanations: {
      B: '"Which renders" introduces a relative clause, but "which" would need a clear noun antecedent — the clause becomes ambiguous and awkward because it sits after an independent clause ending with "copies."',
      C: '"To render" is an infinitive that implies purpose (in order to render), suggesting the copies were made with the goal of making the error permanent, which distorts the meaning.',
      D: '"Rendered" as a simple past verb would require a subject and would create a second independent clause joined only by a comma — a comma splice.',
    },
  },
]
