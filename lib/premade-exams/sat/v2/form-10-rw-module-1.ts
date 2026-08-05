import type { RWQuestion } from '../types'

export const f10RwModule1QuestionsV2: RWQuestion[] = [
  // ─── q01 | easy | Craft and Structure — Words in Context | correctAnswer: A ───
  {
    id: 'sat-f10-v2-rw-m1-q01',
    section: 'reading-writing',
    moduleId: 'f10v2-rw-module-1',
    domain: 'Craft and Structure',
    skill: 'Words in Context',
    difficulty: 'easy',
    stimulus:
      'The pediatric ward redesign was intended to feel _______ : soft colors on the walls, curved furniture with no sharp edges, and small alcoves where families could sit together privately were all chosen to reduce anxiety in young patients.',
    question: 'Which choice completes the text with the most logical and precise word or phrase?',
    choices: [
      { label: 'A', text: 'welcoming' },
      { label: 'B', text: 'sterile' },
      { label: 'C', text: 'imposing' },
      { label: 'D', text: 'minimalist' },
    ],
    correctAnswer: 'A',
    explanation:
      '"Welcoming" means inviting and conducive to comfort, which precisely fits the passage: the soft colors, rounded furniture, and private family spaces all describe a space designed to put anxious young patients at ease, which is the defining quality of a welcoming environment.',
    wrongAnswerExplanations: {
      B: '"Sterile" typically describes clinical cleanliness, but the passage emphasizes warmth and comfort rather than medical antisepticism — the design choices listed are not associated with sterility.',
      C: '"Imposing" means grand or overwhelming in a way that inspires awe or intimidation, which directly contradicts a design aimed at reducing anxiety in children.',
      D: '"Minimalist" emphasizes simplicity and reduction of elements; while the space may be uncluttered, the passage focuses on the emotional effect of the design rather than its aesthetic spareness.',
    },
  },

  // ─── q02 | easy | Craft and Structure — Words in Context | correctAnswer: C ───
  {
    id: 'sat-f10-v2-rw-m1-q02',
    section: 'reading-writing',
    moduleId: 'f10v2-rw-module-1',
    domain: 'Craft and Structure',
    skill: 'Words in Context',
    difficulty: 'easy',
    stimulus:
      'The documentary filmmaker\'s approach to interviewing was _______ : she spent weeks living near her subjects before turning on a camera, believing that people reveal their truest selves only when they no longer feel observed.',
    question: 'Which choice completes the text with the most logical and precise word or phrase?',
    choices: [
      { label: 'A', text: 'confrontational' },
      { label: 'B', text: 'hasty' },
      { label: 'C', text: 'unobtrusive' },
      { label: 'D', text: 'formulaic' },
    ],
    correctAnswer: 'C',
    explanation:
      '"Unobtrusive" means not attracting attention or interfering; the filmmaker deliberately made herself part of the background so that subjects would forget they were being observed. This is the central feature of her method, making "unobtrusive" the most precise descriptor.',
    wrongAnswerExplanations: {
      A: '"Confrontational" implies a direct, challenging manner — the opposite of someone who waits weeks to avoid drawing attention to herself and her camera.',
      B: '"Hasty" means done quickly without care; the filmmaker\'s weeks-long preparation before filming is the opposite of haste.',
      D: '"Formulaic" means following a standard, predictable pattern; the passage presents her method as deliberate and patient, not as adherence to a formula.',
    },
  },

  // ─── q03 | easy | Expression of Ideas — Transitions | correctAnswer: B ───
  {
    id: 'sat-f10-v2-rw-m1-q03',
    section: 'reading-writing',
    moduleId: 'f10v2-rw-module-1',
    domain: 'Expression of Ideas',
    skill: 'Transitions',
    difficulty: 'easy',
    stimulus:
      'Geothermal energy systems draw heat directly from the earth and can provide consistent power regardless of weather conditions. _______, they require drilling to significant depths, a process that is both expensive and technically demanding.',
    question: 'Which choice completes the text with the most logical transition?',
    choices: [
      { label: 'A', text: 'Similarly,' },
      { label: 'B', text: 'However,' },
      { label: 'C', text: 'As a result,' },
      { label: 'D', text: 'For example,' },
    ],
    correctAnswer: 'B',
    explanation:
      'The first sentence describes an advantage of geothermal energy (reliable, weather-independent power). The second sentence introduces a limitation (deep drilling costs and complexity). This contrast is precisely what "however" signals — a turn from what has been established to a complicating factor.',
    wrongAnswerExplanations: {
      A: '"Similarly" signals that the second idea parallels or resembles the first; a drawback does not parallel an advantage.',
      C: '"As a result" signals a cause-and-effect relationship; the drilling requirement is not caused by geothermal reliability — it is a separate constraint of the technology.',
      D: '"For example" introduces a specific instance of a general claim; the second sentence is not an example of reliable weather-independent power.',
    },
  },

  // ─── q04 | easy | Standard English Conventions — Boundaries | correctAnswer: D ───
  {
    id: 'sat-f10-v2-rw-m1-q04',
    section: 'reading-writing',
    moduleId: 'f10v2-rw-module-1',
    domain: 'Standard English Conventions',
    skill: 'Boundaries',
    difficulty: 'easy',
    stimulus:
      'The restoration team spent three years cleaning the ceiling murals _______ work that required scaffolding, specialized solvents, and an almost microscopic attention to detail.',
    question: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { label: 'A', text: 'murals, it was' },
      { label: 'B', text: 'murals which was' },
      { label: 'C', text: 'murals, and this was' },
      { label: 'D', text: 'murals —' },
    ],
    correctAnswer: 'D',
    explanation:
      'A dash is the correct punctuation here because the information that follows ("work that required...") is an appositive that elaborates on what the ceiling mural cleaning involved. A dash sets off this explanatory phrase clearly and correctly without creating a run-on or fragmenting the sentence.',
    wrongAnswerExplanations: {
      A: 'Adding "it was" after a comma creates an awkward construction; the pronoun "it" lacks a clear, grammatically coherent antecedent in this context and produces a run-on sentence.',
      B: '"Which was" creates a relative clause that requires a comma before the relative pronoun to modify the noun properly; without the comma, this construction is nonstandard.',
      C: '"And this was" adds an unnecessary coordinating conjunction that creates a wordy and grammatically weak compound structure where a simple appositive would suffice.',
    },
  },

  // ─── q05 | medium | Craft and Structure — Words in Context | correctAnswer: A ───
  {
    id: 'sat-f10-v2-rw-m1-q05',
    section: 'reading-writing',
    moduleId: 'f10v2-rw-module-1',
    domain: 'Craft and Structure',
    skill: 'Words in Context',
    difficulty: 'medium',
    stimulus:
      'The ethnobotanist\'s field notes were remarkable for their _______ quality: rather than reducing plants to their chemical compounds or commercial uses, she recorded the stories, ceremonies, and seasonal rhythms through which Indigenous communities understood each species, preserving knowledge that no laboratory assay could capture.',
    question: 'Which choice completes the text with the most logical and precise word or phrase?',
    choices: [
      { label: 'A', text: 'ethnographic' },
      { label: 'B', text: 'speculative' },
      { label: 'C', text: 'reductive' },
      { label: 'D', text: 'empirical' },
    ],
    correctAnswer: 'A',
    explanation:
      '"Ethnographic" refers to the systematic study and documentation of human cultures and social practices. The field notes record ceremonies, stories, and cultural rhythms — precisely what ethnographic documentation involves. The contrast with laboratory assays reinforces that her approach is cultural rather than purely chemical.',
    wrongAnswerExplanations: {
      B: '"Speculative" means based on conjecture rather than evidence; the field notes are described as systematic records of observed cultural practices, not guesses.',
      C: '"Reductive" means oversimplifying a complex subject; the passage explicitly states she avoided reducing plants to their compounds, making "reductive" the opposite of her approach.',
      D: '"Empirical" means based on observation and experiment; while field notes are observational, this word is most associated with scientific measurement, which the passage specifically contrasts with her cultural approach.',
    },
  },

  // ─── q06 | medium | Information and Ideas — Central Ideas and Details | correctAnswer: C ───
  {
    id: 'sat-f10-v2-rw-m1-q06',
    section: 'reading-writing',
    moduleId: 'f10v2-rw-module-1',
    domain: 'Information and Ideas',
    skill: 'Central Ideas and Details',
    difficulty: 'medium',
    stimulus:
      'Tardigrades — microscopic eight-legged animals sometimes called "water bears" — are among the most resilient organisms ever studied. When exposed to conditions that would destroy virtually any other life form, including extreme radiation, the vacuum of space, temperatures near absolute zero, and pressures six times greater than the deepest ocean trench, tardigrades enter a state called cryptobiosis: they expel nearly all water from their cells, retract their limbs, and suspend all measurable metabolic activity. In this desiccated state, they can survive for decades, then resume normal life when favorable conditions return. Scientists study tardigrades not as curiosities but as models for understanding the biochemical limits of life itself.',
    question: 'Which choice best states the main idea of the text?',
    choices: [
      { label: 'A', text: 'Tardigrades are the only organisms capable of surviving in outer space, which makes them uniquely valuable to space exploration research.' },
      { label: 'B', text: 'The process of cryptobiosis allows tardigrades to avoid predators and survive seasonal shortages of food and water.' },
      { label: 'C', text: 'Tardigrades\' extraordinary ability to endure extreme conditions through cryptobiosis makes them scientifically important models for studying the limits of life.' },
      { label: 'D', text: 'Tardigrades can survive greater pressures than any other animal, making them particularly interesting to deep-sea researchers.' },
    ],
    correctAnswer: 'C',
    explanation:
      'The passage opens by stating tardigrades are among the most resilient organisms studied, explains the mechanism of their resilience (cryptobiosis), and closes by stating scientists study them as models for understanding the biochemical limits of life. Choice C captures all three elements: the extraordinary resilience, the mechanism, and the scientific significance.',
    wrongAnswerExplanations: {
      A: 'The passage mentions space as one of many hostile environments, not as the primary reason tardigrades are studied; the passage does not limit their value to space exploration.',
      B: 'The passage does not mention predator avoidance; cryptobiosis is described as a response to extreme physical conditions, not as a predator-defense strategy.',
      D: 'Deep-sea pressure is listed as just one of several extreme conditions; the passage does not single out deep-sea researchers or claim tardigrades outperform all animals only in pressure tolerance.',
    },
  },

  // ─── q07 | medium | Expression of Ideas — Rhetorical Synthesis | correctAnswer: B ───
  {
    id: 'sat-f10-v2-rw-m1-q07',
    section: 'reading-writing',
    moduleId: 'f10v2-rw-module-1',
    domain: 'Expression of Ideas',
    skill: 'Rhetorical Synthesis',
    difficulty: 'medium',
    stimulus:
      'A student is writing a report about the decline of cursive handwriting instruction in public schools. The student has gathered the following notes:\n\n' +
      '- By 2013, the Common Core State Standards no longer required cursive instruction, leaving the decision to individual states.\n' +
      '- A 2020 survey found that fewer than 40% of U.S. elementary schools devoted regular class time to cursive.\n' +
      '- Research published in 2021 found that writing by hand — including cursive — activates different neural pathways than typing, potentially enhancing memory and comprehension.\n' +
      '- Several states, including California and Texas, have since passed laws requiring cursive to be taught in public schools.\n' +
      '- Critics of mandated cursive instruction argue that time spent on cursive could be used for digital literacy skills more relevant to modern workplaces.',
    question:
      'The student wants to introduce the debate over cursive instruction by acknowledging both its potential cognitive benefits and the concerns of its critics. Which choice most effectively uses relevant information from the notes to accomplish this goal?',
    choices: [
      { label: 'A', text: 'Because fewer than 40% of elementary schools teach cursive regularly, several states have passed laws to mandate its instruction.' },
      { label: 'B', text: 'Although research suggests that handwriting activates neural pathways that may improve memory, critics argue that classroom time devoted to cursive comes at the cost of more immediately applicable digital literacy skills.' },
      { label: 'C', text: 'Since the Common Core Standards stopped requiring cursive in 2013, the decision about whether to teach it has been left to individual states and school districts.' },
      { label: 'D', text: 'States such as California and Texas have passed laws mandating cursive instruction, reversing the trend that followed the 2013 Common Core changes.' },
    ],
    correctAnswer: 'B',
    explanation:
      'The student\'s goal is to introduce the debate by acknowledging both the cognitive benefits of cursive and the concerns of critics. Choice B accomplishes both: it cites the neural pathway research as the cognitive benefit and presents the critics\' argument about digital literacy as the counterpoint, precisely framing the debate the student intends to discuss.',
    wrongAnswerExplanations: {
      A: 'Choice A draws a connection between low instruction rates and state mandates but addresses neither the cognitive benefits nor the critics\' concerns.',
      C: 'Choice C describes the policy history (Common Core removing the requirement) but mentions neither the cognitive research nor the critical perspective on cursive.',
      D: 'Choice D describes the legislative response in some states but does not introduce the cognitive benefits or the critics\' argument — it presents only one side of the broader debate.',
    },
  },

  // ─── q08 | medium | Expression of Ideas — Transitions | correctAnswer: D ───
  {
    id: 'sat-f10-v2-rw-m1-q08',
    section: 'reading-writing',
    moduleId: 'f10v2-rw-module-1',
    domain: 'Expression of Ideas',
    skill: 'Transitions',
    difficulty: 'medium',
    stimulus:
      'Early studies of volcanic island formation suggested that the islands emerged in geological sequence as a tectonic plate moved steadily over a fixed hot spot in the mantle. _______, more recent research has revealed that the hot spot itself can migrate, making the timing and positioning of island formation considerably more complex than the original model predicted.',
    question: 'Which choice completes the text with the most logical transition?',
    choices: [
      { label: 'A', text: 'Therefore,' },
      { label: 'B', text: 'In addition,' },
      { label: 'C', text: 'For instance,' },
      { label: 'D', text: 'Nevertheless,' },
    ],
    correctAnswer: 'D',
    explanation:
      '"Nevertheless" signals that despite what was established in the first sentence (the original fixed-hot-spot model), new findings complicate or challenge that picture. It correctly introduces the concessive idea that even though the early model seemed complete, recent research has shown it to be an oversimplification.',
    wrongAnswerExplanations: {
      A: '"Therefore" signals a conclusion that follows logically from the previous statement; the newer research does not follow from the older model — it revises it.',
      B: '"In addition" signals that the second idea supplements the first; but the newer research about a migrating hot spot contrasts with the original model rather than adding to it.',
      C: '"For instance" introduces a specific example of a general claim; the newer research is not an example of the original model but a challenge to it.',
    },
  },

  // ─── q09 | medium | Craft and Structure — Words in Context | correctAnswer: A ───
  {
    id: 'sat-f10-v2-rw-m1-q09',
    section: 'reading-writing',
    moduleId: 'f10v2-rw-module-1',
    domain: 'Craft and Structure',
    skill: 'Words in Context',
    difficulty: 'medium',
    stimulus:
      'When the urban planner presented her proposal for converting derelict rail yards into green corridors, city council members were initially _______ : several had already allocated funds to mixed-use commercial development on the same parcels, and they were reluctant to revisit decisions that had taken months of negotiation to reach.',
    question: 'Which choice completes the text with the most logical and precise word or phrase?',
    choices: [
      { label: 'A', text: 'resistant' },
      { label: 'B', text: 'intrigued' },
      { label: 'C', text: 'indifferent' },
      { label: 'D', text: 'enthusiastic' },
    ],
    correctAnswer: 'A',
    explanation:
      '"Resistant" means opposing or reluctant to accept change, which is exactly what the passage describes: the council members had prior financial and political commitments and were reluctant to revisit months of negotiation. The passage\'s explanation of their reluctance directly supports "resistant" as the correct characterization.',
    wrongAnswerExplanations: {
      B: '"Intrigued" means curious or interested; the passage describes reluctance and prior commitments, not curiosity or openness to the proposal.',
      C: '"Indifferent" means having no particular interest or concern; the council members clearly do care — they are actively resistant because of their prior investment in competing plans.',
      D: '"Enthusiastic" means eagerly interested, which directly contradicts their reluctance to revisit prior decisions.',
    },
  },

  // ─── q10 | medium | Information and Ideas — Central Ideas and Details | correctAnswer: C ───
  {
    id: 'sat-f10-v2-rw-m1-q10',
    section: 'reading-writing',
    moduleId: 'f10v2-rw-module-1',
    domain: 'Information and Ideas',
    skill: 'Central Ideas and Details',
    difficulty: 'medium',
    stimulus:
      'Mycelial networks — the thread-like root structures of fungi — extend through forest soil for miles, forming connections between the root systems of trees of different species. Through these networks, trees transfer carbon, water, and nutrients; larger or older trees often supply seedlings in shaded understories with sugar that the seedlings cannot produce themselves through photosynthesis. Ecologists have described this system as a "wood wide web," but some researchers caution against romanticizing it: the transfers are driven by concentration gradients and chemical signaling, not by any intentional cooperative behavior. Whether the network is best described as mutual aid or as the inevitable outcome of fungal self-interest remains an active area of debate.',
    question: 'According to the text, why do some researchers caution against calling mycelial networks a "wood wide web"?',
    choices: [
      { label: 'A', text: 'They believe the term exaggerates the geographic scale of mycelial networks.' },
      { label: 'B', text: 'They argue that fungal networks harm trees more often than they help them.' },
      { label: 'C', text: 'They are concerned that the term implies intentional cooperation that the underlying chemistry does not support.' },
      { label: 'D', text: 'They contend that the transfers within the network are too slow to be significant for seedling survival.' },
    ],
    correctAnswer: 'C',
    explanation:
      'The passage states that researchers caution against "romanticizing" the network and clarifies that transfers are driven by concentration gradients and chemical signaling, "not by any intentional cooperative behavior." This directly supports Choice C: the concern is that the popular term implies deliberate cooperation when the mechanism is chemical, not intentional.',
    wrongAnswerExplanations: {
      A: 'The passage does not question the geographic scale of the networks — it describes them as extending for miles. No researcher quoted disputes this.',
      B: 'The passage does not suggest the networks harm trees; the debate is about whether transfers represent cooperation or fungal self-interest, not harm.',
      D: 'The passage makes no claim about the speed of transfers; the debate is about motivation and mechanism, not rate.',
    },
  },

  // ─── q11 | medium | Information and Ideas — Command of Evidence (Textual) | correctAnswer: B ───
  {
    id: 'sat-f10-v2-rw-m1-q11',
    section: 'reading-writing',
    moduleId: 'f10v2-rw-module-1',
    domain: 'Information and Ideas',
    skill: 'Command of Evidence',
    difficulty: 'medium',
    stimulus:
      'Historian Priya Menon argues that the 1905 Bengal Partition was as much an economic intervention as a political one. She contends that by dividing the commercially active province, British administrators sought to redirect trade flows in ways that would benefit British-owned enterprises in Calcutta at the expense of the emerging Indian mercantile class in Dhaka and Chittagong. Critics of her thesis acknowledge the economic disruption caused by the partition but maintain that administrative convenience — specifically, the difficulty of governing a province of 85 million people — was the primary driver.',
    question:
      'Which quotation from a colonial-era administrative document would most directly support Menon\'s argument?',
    choices: [
      { label: 'A', text: '"The partition is regrettable but necessary; a province of such size cannot be administered efficiently by a single lieutenant-governor."' },
      { label: 'B', text: '"By separating Dhaka from the western markets, we ensure that the surplus trade volume will be redirected toward Calcutta and the British commercial houses operating there."' },
      { label: 'C', text: '"Nationalist opposition to the partition has been unexpectedly fierce, and we must consider measures to contain the growing swadeshi movement."' },
      { label: 'D', text: '"The eastern districts have historically been underserved by the Calcutta administration, and a separate province will allow more direct governance of the region."' },
    ],
    correctAnswer: 'B',
    explanation:
      'Menon\'s argument is that the partition was designed to redirect trade away from Indian merchants in Dhaka and Chittagong toward British commercial interests in Calcutta. Choice B is a direct statement of exactly this intention: separating Dhaka from western markets to redirect trade toward Calcutta and British commercial houses, which is the precise economic mechanism Menon identifies.',
    wrongAnswerExplanations: {
      A: 'Choice A emphasizes the administrative rationale (governing a large population) — the explanation offered by Menon\'s critics, not evidence supporting her economic argument.',
      C: 'Choice C discusses the nationalist reaction to the partition; this is a consequence of the policy, not evidence of the economic motives Menon attributes to British administrators.',
      D: 'Choice D frames the partition as a governance improvement for underserved eastern districts — an administrative justification that also aligns with the critics\' position, not Menon\'s.',
    },
  },

  // ─── q12 | medium | Expression of Ideas — Transitions | correctAnswer: D ───
  {
    id: 'sat-f10-v2-rw-m1-q12',
    section: 'reading-writing',
    moduleId: 'f10v2-rw-module-1',
    domain: 'Expression of Ideas',
    skill: 'Transitions',
    difficulty: 'medium',
    stimulus:
      'Traditional brick-and-mortar retailers have invested heavily in redesigning their store layouts to create more experiential shopping environments, featuring demonstration zones, lounge areas, and interactive product displays. _______, online sales of the same product categories have continued to grow at double-digit rates, suggesting that enhanced in-store experiences have not reversed consumer preference for digital purchasing.',
    question: 'Which choice completes the text with the most logical transition?',
    choices: [
      { label: 'A', text: 'Consequently,' },
      { label: 'B', text: 'Specifically,' },
      { label: 'C', text: 'Similarly,' },
      { label: 'D', text: 'Even so,' },
    ],
    correctAnswer: 'D',
    explanation:
      '"Even so" is a concessive transition meaning "despite what has just been said." The first sentence describes significant investment in experiential retail; the second notes that online sales have continued to grow anyway, suggesting the investment has not achieved its goal. "Even so" correctly signals this concessive relationship.',
    wrongAnswerExplanations: {
      A: '"Consequently" signals a result or effect; the continued growth of online sales is not caused by retailers\' redesign investments — it persists in spite of them.',
      B: '"Specifically" introduces a specific detail or elaboration; the second sentence does not narrow or specify the first but contradicts its implied outcome.',
      C: '"Similarly" signals a parallel; online growth is not parallel to in-store investment — it is a countervailing trend.',
    },
  },

  // ─── q13 | medium | Information and Ideas — Command of Evidence (Quantitative) | correctAnswer: A ───
  {
    id: 'sat-f10-v2-rw-m1-q13',
    section: 'reading-writing',
    moduleId: 'f10v2-rw-module-1',
    domain: 'Information and Ideas',
    skill: 'Command of Evidence',
    difficulty: 'medium',
    stimulus:
      'A marine ecologist studying coral bleaching events recorded water temperature and percentage of bleached coral across six reef sites over a single summer season. She hypothesized that sites with higher average water temperatures would show greater proportions of bleached coral.',
    question: 'Which choice best uses data from the table to support the ecologist\'s hypothesis?',
    graphData: {
      type: 'table',
      title: 'Water Temperature and Coral Bleaching by Reef Site',
      headers: ['Reef Site', 'Avg. Water Temp. (°C)', 'Bleached Coral (%)'],
      rows: [
        ['Lagoon North', '27', '12'],
        ['Outer Flat', '29', '31'],
        ['Channel South', '26', '8'],
        ['Windward Crest', '31', '54'],
        ['Leeward Shelf', '28', '22'],
        ['Deep Margin', '24', '3'],
      ],
    },
    choices: [
      { label: 'A', text: 'Windward Crest, with the highest average temperature at 31°C, also had the greatest proportion of bleached coral at 54%, while Deep Margin, with the lowest temperature at 24°C, had only 3% bleaching.' },
      { label: 'B', text: 'Outer Flat and Leeward Shelf had temperatures within one degree of each other, yet their bleaching rates differed by nine percentage points.' },
      { label: 'C', text: 'Channel South recorded only 8% bleaching despite being one of the cooler sites, which suggests factors other than temperature may also affect bleaching rates.' },
      { label: 'D', text: 'All six reef sites recorded some degree of coral bleaching, indicating that bleaching is a regionwide phenomenon regardless of local water temperature.' },
    ],
    correctAnswer: 'A',
    explanation:
      'The ecologist hypothesizes that higher water temperatures correspond to greater coral bleaching. Choice A directly supports this by comparing the site with the highest temperature (Windward Crest, 31°C, 54% bleaching) with the site with the lowest temperature (Deep Margin, 24°C, 3% bleaching), showing a clear relationship at both ends of the temperature range.',
    wrongAnswerExplanations: {
      B: 'Choice B highlights two sites with similar temperatures but different bleaching rates, which complicates rather than supports the hypothesis that temperature drives bleaching.',
      C: 'Choice C suggests that factors other than temperature may matter — this actively undermines the hypothesis rather than supporting it.',
      D: 'Choice D addresses the presence of bleaching across all sites but says nothing about the relationship between temperature and bleaching severity, so it does not support the specific hypothesis.',
    },
  },

  // ─── q14 | medium | Craft and Structure — Text Structure and Purpose | correctAnswer: C ───
  {
    id: 'sat-f10-v2-rw-m1-q14',
    section: 'reading-writing',
    moduleId: 'f10v2-rw-module-1',
    domain: 'Craft and Structure',
    skill: 'Text Structure and Purpose',
    difficulty: 'medium',
    stimulus:
      'Linguist Rosario Delgado opens her essay with a scene from a community center in San Antonio, where a grandmother code-switches effortlessly between Spanish and English mid-sentence as she tells her granddaughter a story. Delgado uses this scene to contest the common assumption that code-switching signals linguistic confusion or deficiency; instead, she argues, it demonstrates sophisticated bilingual competence. The remainder of the essay draws on sociolinguistic research to show that speakers who code-switch most fluently tend to have stronger command of both languages, not weaker command of either.',
    question: 'Which choice best describes the overall structure of the text?',
    choices: [
      { label: 'A', text: 'The text poses a research question about code-switching and then surveys conflicting studies to arrive at a tentative conclusion.' },
      { label: 'B', text: 'The text introduces a theoretical framework for studying bilingualism and applies it to a specific case to illustrate its predictive power.' },
      { label: 'C', text: 'The text uses a concrete example to challenge a misconception, then describes how research supports the alternative explanation.' },
      { label: 'D', text: 'The text profiles a bilingual speaker to argue that code-switching is an innate rather than a learned behavior.' },
    ],
    correctAnswer: 'C',
    explanation:
      'The passage moves in two clear steps: first, Delgado presents a concrete scene (a grandmother code-switching) to challenge the common view that code-switching signals deficiency; then she draws on sociolinguistic research to support her alternative claim (that fluent code-switchers have stronger command of both languages). This matches Choice C precisely.',
    wrongAnswerExplanations: {
      A: 'The passage does not pose a research question and does not survey conflicting studies — it opens with a scene, asserts a thesis, and cites supporting research.',
      B: 'The passage does not introduce a theoretical framework that is then applied; it uses a scene to contest a misconception, which is different from applying a framework to a case.',
      D: 'The passage says nothing about whether code-switching is innate or learned; the grandmother example is used to illustrate competence, not to make a claim about its origin.',
    },
  },

  // ─── q15 | medium | Information and Ideas — Inferences | correctAnswer: B ───
  {
    id: 'sat-f10-v2-rw-m1-q15',
    section: 'reading-writing',
    moduleId: 'f10v2-rw-module-1',
    domain: 'Information and Ideas',
    skill: 'Inferences',
    difficulty: 'medium',
    stimulus:
      'When the Aral Sea — once the world\'s fourth-largest lake — began shrinking in the 1960s, Soviet planners had diverted the rivers that fed it to irrigate cotton fields in Central Asia. By 2007, the main body of the lake had lost more than 90% of its volume. The exposed lakebed became a source of salt- and pesticide-laden dust storms that spread hundreds of miles, contaminating farmland and contributing to respiratory illness among communities throughout the region. Fish processing plants that had employed tens of thousands were left standing on dry land, kilometers from the receded shoreline.',
    question: 'What can most reasonably be inferred about the Soviet irrigation project based on the passage?',
    choices: [
      { label: 'A', text: 'The project succeeded in its primary agricultural goal but was quickly reversed when the environmental damage became apparent.' },
      { label: 'B', text: 'The project prioritized short-term agricultural output without adequately accounting for the long-term ecological and human consequences of depleting the Aral Sea.' },
      { label: 'C', text: 'Soviet planners were unaware that diverting the rivers would reduce the Aral Sea\'s volume, as the causal relationship was not understood at the time.' },
      { label: 'D', text: 'The dust storms and health consequences were confined to the immediate shoreline communities and did not affect agricultural production elsewhere.' },
    ],
    correctAnswer: 'B',
    explanation:
      'The passage describes massive, far-reaching consequences: over 90% loss of lake volume, toxic dust storms affecting communities hundreds of miles away, and destroyed fishing economies. These outcomes together imply a failure to anticipate or weigh long-term ecological and human costs — consistent with prioritizing short-term cotton production. This is the most reasonable inference the evidence supports.',
    wrongAnswerExplanations: {
      A: 'The passage does not say the project was reversed; the fish processing plants were left standing on dry land, suggesting the situation was not quickly corrected.',
      C: 'The passage does not describe planners\' awareness or ignorance; inferring ignorance from the passage goes beyond what the text states and is not the most reasonable inference.',
      D: 'The passage explicitly states the dust storms spread "hundreds of miles" and contaminated farmland, directly contradicting the claim that consequences were confined to the shoreline.',
    },
  },

  // ─── q16 | medium | Standard English Conventions — Boundaries | correctAnswer: D ───
  {
    id: 'sat-f10-v2-rw-m1-q16',
    section: 'reading-writing',
    moduleId: 'f10v2-rw-module-1',
    domain: 'Standard English Conventions',
    skill: 'Boundaries',
    difficulty: 'medium',
    stimulus:
      'Ichthyologist Dr. Amara Osei spent six months studying blind cavefish in the subterranean rivers of the Yucatan Peninsula _______ she documented seventeen previously unrecorded behavioral adaptations, including a form of acoustic navigation that had never been observed in freshwater species.',
    question: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { label: 'A', text: 'Peninsula, and during this time' },
      { label: 'B', text: 'Peninsula and during this time' },
      { label: 'C', text: 'Peninsula, during this time,' },
      { label: 'D', text: 'Peninsula; during this time,' },
    ],
    correctAnswer: 'D',
    explanation:
      'The sentence contains two independent clauses: "Dr. Osei spent six months studying blind cavefish..." and "she documented seventeen previously unrecorded behavioral adaptations..." A semicolon correctly separates two independent clauses. The phrase "during this time" is then a transitional adverbial that is set off by a comma before the main clause that follows — making "Peninsula; during this time," the grammatically correct choice.',
    wrongAnswerExplanations: {
      A: 'Adding "and" after the comma creates a compound sentence with a coordinating conjunction, which is grammatically acceptable in principle, but the additional phrase "during this time" requires its own punctuation — without a comma after "time," the reader cannot easily parse the modifier from the main clause.',
      B: 'Without a comma before the coordinating conjunction "and," joining two independent clauses violates the convention that a comma precedes a coordinating conjunction in a compound sentence.',
      C: 'Using only a comma before "during this time" creates a comma splice: two independent clauses joined only by a comma, which is a Standard English error.',
    },
  },

  // ─── q17 | medium | Standard English Conventions — Form, Structure, and Sense | correctAnswer: A ───
  {
    id: 'sat-f10-v2-rw-m1-q17',
    section: 'reading-writing',
    moduleId: 'f10v2-rw-module-1',
    domain: 'Standard English Conventions',
    skill: 'Form, Structure, and Sense',
    difficulty: 'medium',
    stimulus:
      'The architectural firm\'s lead designer, known for her unconventional approach to public buildings, _______ that the new civic center\'s facade should incorporate native stone from the region rather than the imported marble specified in the original blueprint.',
    question: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { label: 'A', text: 'argued' },
      { label: 'B', text: 'arguing' },
      { label: 'C', text: 'to argue' },
      { label: 'D', text: 'having argued' },
    ],
    correctAnswer: 'A',
    explanation:
      'The subject of the sentence is "The architectural firm\'s lead designer," which is a singular noun phrase. The sentence requires a finite, conjugated verb to complete the main clause. "Argued" is the simple past tense form that correctly serves as the main verb and agrees with the singular subject.',
    wrongAnswerExplanations: {
      B: '"Arguing" is a present participle; used here, it would create a dangling or fragmentary construction because there is no finite verb in the clause to anchor the sentence.',
      C: '"To argue" is an infinitive; infinitives cannot serve as the main verb of an independent clause, so this choice produces a sentence fragment.',
      D: '"Having argued" is a perfect participial phrase; it cannot function as the main verb of a clause and would leave the sentence without a proper predicate.',
    },
  },

  // ─── q18 | medium | Expression of Ideas — Transitions | correctAnswer: C ───
  {
    id: 'sat-f10-v2-rw-m1-q18',
    section: 'reading-writing',
    moduleId: 'f10v2-rw-module-1',
    domain: 'Expression of Ideas',
    skill: 'Transitions',
    difficulty: 'medium',
    stimulus:
      'Proponents of restorative justice programs argue that traditional incarceration fails to address the root causes of criminal behavior and does little to repair the harm experienced by victims. _______, they advocate for structured dialogue between offenders and those they have harmed, community mediation, and rehabilitative services that target the conditions — poverty, trauma, substance dependency — that often underlie criminal acts.',
    question: 'Which choice completes the text with the most logical transition?',
    choices: [
      { label: 'A', text: 'By contrast,' },
      { label: 'B', text: 'As a result,' },
      { label: 'C', text: 'Instead,' },
      { label: 'D', text: 'For instance,' },
    ],
    correctAnswer: 'C',
    explanation:
      '"Instead" signals a substitution: rather than traditional incarceration (which proponents criticize), they propose something different. The second sentence describes what proponents advocate in place of incarceration, making "instead" the precise transition that captures the substitution relationship.',
    wrongAnswerExplanations: {
      A: '"By contrast" typically introduces a comparison between two different subjects or ideas; here, the sentence is describing the alternative approach of the same group (proponents), so "by contrast" is imprecise.',
      B: '"As a result" signals a causal relationship; the advocacy for restorative programs is the position, not the effect, of the criticism of incarceration.',
      D: '"For instance" introduces a specific example of a general claim; the second sentence is not an example of how incarceration fails but rather a description of the alternative the proponents support.',
    },
  },

  // ─── q19 | hard | Craft and Structure — Words in Context | correctAnswer: B ───
  {
    id: 'sat-f10-v2-rw-m1-q19',
    section: 'reading-writing',
    moduleId: 'f10v2-rw-module-1',
    domain: 'Craft and Structure',
    skill: 'Words in Context',
    difficulty: 'hard',
    stimulus:
      'Poet and essayist Claudia Rankine describes her work as operating in a _______ space: her prose poems borrow documentary fragments — court transcripts, news headlines, medical records — and arrange them alongside lyric meditation, creating texts that resist being classified as either journalism or poetry, even as they depend on the resources of both.',
    question: 'Which choice completes the text with the most logical and precise word or phrase?',
    choices: [
      { label: 'A', text: 'polemical' },
      { label: 'B', text: 'liminal' },
      { label: 'C', text: 'didactic' },
      { label: 'D', text: 'nostalgic' },
    ],
    correctAnswer: 'B',
    explanation:
      '"Liminal" means occupying a position at or on both sides of a boundary or threshold — between two states or categories. Rankine\'s work is described as resisting classification as either journalism or poetry while drawing on both; it exists at the threshold between genres. "Liminal" is the precise academic term for this in-between, boundary-occupying quality.',
    wrongAnswerExplanations: {
      A: '"Polemical" means strongly argumentative or controversial in a confrontational way; while Rankine\'s work may be politically engaged, the passage specifically describes its generic ambiguity, not its argumentative posture.',
      C: '"Didactic" means intended to teach or moralize; the passage focuses on the form of the work (blending documentary and lyric) rather than its instructional intent.',
      D: '"Nostalgic" means longing for the past; the passage describes a formal and generic characteristic of the work, not its emotional orientation toward memory or loss.',
    },
  },

  // ─── q20 | hard | Craft and Structure — Text Structure and Purpose | correctAnswer: D ───
  {
    id: 'sat-f10-v2-rw-m1-q20',
    section: 'reading-writing',
    moduleId: 'f10v2-rw-module-1',
    domain: 'Craft and Structure',
    skill: 'Text Structure and Purpose',
    difficulty: 'hard',
    stimulus:
      'Philosopher of science Helen Longino contends that scientific objectivity is not a property of individual scientists or their methods but of scientific communities. Individual researchers inevitably bring background assumptions, values, and cultural perspectives to their work — not as corrupting influences to be eliminated but as inescapable features of any inquiry. Objectivity, on Longino\'s view, emerges only through the community practices that subject these assumptions to critical scrutiny: public venues for criticism, uptake of criticism by the community, shared standards for evaluating evidence, and equality of intellectual authority among participants. A finding gains the status of objective knowledge not when a lone researcher is neutral but when a community of inquirers has subjected it to rigorous, multi-perspectival critique.',
    question: 'What is the primary purpose of the text?',
    choices: [
      { label: 'A', text: 'To refute the claim that scientific communities can produce objective knowledge by showing that individual biases always distort collective conclusions.' },
      { label: 'B', text: 'To describe the historical development of the concept of scientific objectivity from individual to communal standards.' },
      { label: 'C', text: 'To argue that individual scientists should eliminate their personal values before participating in scientific inquiry.' },
      { label: 'D', text: 'To explain Longino\'s argument that objectivity is a communal achievement produced by critical community practices rather than by value-free individual researchers.' },
    ],
    correctAnswer: 'D',
    explanation:
      'The text presents Longino\'s thesis, explains its core claims (background assumptions are inescapable; objectivity emerges from community practices), and elaborates the four conditions she identifies. The purpose is explanatory: to convey Longino\'s argument that objectivity is communal, not individual. Choice D accurately captures both the subject (Longino\'s argument) and the content (community practices vs. individual neutrality).',
    wrongAnswerExplanations: {
      A: 'The text does not refute the possibility of communal objectivity — it argues for it. Longino\'s point is that community practices produce objectivity, not that they fail to do so.',
      B: 'The text describes Longino\'s philosophical position, not the historical development of the concept of objectivity. No historical timeline or evolution of the idea is presented.',
      C: 'Longino\'s view is the opposite: she argues that individual values and background assumptions cannot be eliminated and should not be treated as corrupting influences. The text does not recommend value elimination.',
    },
  },

  // ─── q21 | hard | Information and Ideas — Command of Evidence (Textual) | correctAnswer: A ───
  {
    id: 'sat-f10-v2-rw-m1-q21',
    section: 'reading-writing',
    moduleId: 'f10v2-rw-module-1',
    domain: 'Information and Ideas',
    skill: 'Command of Evidence',
    difficulty: 'hard',
    stimulus:
      'Historians of early modern England have long debated whether the enclosure movement — the conversion of shared common land into privately held fields — primarily reflected economic rationalization or deliberate social coercion of the rural poor. Revisionist scholar Naomi Whitfield argues that enclosure\'s effects were regionally uneven and that many communities negotiated terms with landlords, preserving some access rights well into the eighteenth century. Critics of the revisionist view maintain that even where negotiation occurred, the structural power imbalance between landlords and commoners rendered the outcomes effectively coercive.',
    question:
      'Which finding, if true, would most directly support the critics\' position rather than Whitfield\'s?',
    choices: [
      { label: 'A', text: 'Archival records from enclosure negotiations show that communities that retained access rights did so in exchange for surrendering other longstanding entitlements, resulting in a net reduction in commoners\' autonomy.' },
      { label: 'B', text: 'The pace of enclosure varied significantly by region, with some counties experiencing nearly complete enclosure by 1700 while others retained large common areas into the nineteenth century.' },
      { label: 'C', text: 'Landlords who enclosed land without negotiation faced higher rates of rural unrest and property destruction than those who negotiated with affected communities.' },
      { label: 'D', text: 'Several large estates in the Midlands developed written agreements with tenant communities that were enforced by local magistrates throughout the seventeenth century.' },
    ],
    correctAnswer: 'A',
    explanation:
      'The critics\' position is that even where negotiation occurred, structural power imbalances made outcomes effectively coercive — that is, commoners did not freely choose their terms. Choice A directly supports this by showing that negotiated outcomes still resulted in a net reduction of commoners\' autonomy: even the "agreements" traded away other rights, meaning the process was not truly voluntary or beneficial to commoners, consistent with the critics\' coercion thesis.',
    wrongAnswerExplanations: {
      B: 'Regional variation in the pace of enclosure supports Whitfield\'s revisionist claim that effects were uneven — this strengthens her position, not the critics\'.',
      C: 'Higher unrest where no negotiation occurred suggests that negotiation was a genuine mitigating factor — this lends some support to Whitfield\'s view that negotiation mattered, not the critics\'.',
      D: 'Written, enforceable agreements between estates and tenant communities support Whitfield\'s claim that negotiation produced real, lasting outcomes — not the critics\' claim that such agreements were effectively coercive.',
    },
  },

  // ─── q22 | hard | Information and Ideas — Inferences | correctAnswer: C ───
  {
    id: 'sat-f10-v2-rw-m1-q22',
    section: 'reading-writing',
    moduleId: 'f10v2-rw-module-1',
    domain: 'Information and Ideas',
    skill: 'Inferences',
    difficulty: 'hard',
    stimulus:
      'Cognitive scientist Miriam Halvorsen studies the phenomenon of "category learning under distributional shift" — what happens when the statistical patterns a brain has learned no longer match the patterns it encounters in a new environment. Her research has shown that organisms trained exclusively on one set of stimuli often perform far worse than chance when the underlying distribution changes, not simply worse than an organism trained on the new distribution. She attributes this to "negative transfer": the learned categories actively interfere with forming accurate new ones, because the prior model generates confident but systematically wrong predictions.',
    question: 'Based on the passage, what can most reasonably be inferred about an organism experiencing severe negative transfer?',
    choices: [
      { label: 'A', text: 'It performs as well as an organism with no prior training because the prior learning has been entirely erased.' },
      { label: 'B', text: 'It requires more time to learn new categories than an organism with no prior training, but eventually reaches the same level of performance.' },
      { label: 'C', text: 'Its prior learned model causes it to make confident errors in the new environment, performing worse than if it had no prior training at all.' },
      { label: 'D', text: 'It avoids applying previously learned categories to new stimuli by recognizing that the statistical distribution has changed.' },
    ],
    correctAnswer: 'C',
    explanation:
      'The passage states that organisms experiencing negative transfer perform "far worse than chance" — worse than an organism with no training on the new distribution. Halvorsen attributes this to learned categories that actively interfere and generate "confident but systematically wrong predictions." Choice C captures both features: confidence and systematic error, with performance worse than no prior training.',
    wrongAnswerExplanations: {
      A: 'The passage states performance falls below chance — worse than untrained organisms — which directly contradicts the idea that prior learning has been erased, leaving the organism at baseline.',
      B: 'The passage does not suggest organisms eventually recover to comparable performance; it describes negative transfer as active interference, not merely a temporary lag.',
      D: 'The passage says the prior model generates confident but wrong predictions, implying the organism does not recognize the distributional shift — it applies the old model inappropriately rather than detecting the change.',
    },
  },

  // ─── q23 | hard | Expression of Ideas — Rhetorical Synthesis | correctAnswer: B ───
  {
    id: 'sat-f10-v2-rw-m1-q23',
    section: 'reading-writing',
    moduleId: 'f10v2-rw-module-1',
    domain: 'Expression of Ideas',
    skill: 'Rhetorical Synthesis',
    difficulty: 'hard',
    stimulus:
      'A student is writing a research paper on the reintroduction of wolves to Yellowstone National Park and their ecological effects. The student has gathered the following notes:\n\n' +
      '- Wolves were reintroduced to Yellowstone in 1995 after a 70-year absence.\n' +
      '- Within a decade, elk herds had been reduced in size and, crucially, elk began avoiding river valleys and riparian zones where they were most vulnerable to predation.\n' +
      '- The reduction in elk grazing pressure in riparian zones allowed willows, aspens, and cottonwoods to recover, providing habitat for beavers.\n' +
      '- Beaver dams altered stream hydrology, slowing water flow, reducing erosion, and creating wetlands that supported diverse bird and fish communities.\n' +
      '- Some ecologists describe this chain of effects as a "trophic cascade" — a top-down ecological transformation triggered by the reintroduction of a apex predator.',
    question:
      'The student wants to explain the concept of a trophic cascade to readers unfamiliar with ecology by tracing the chain of effects from the wolf reintroduction to the recovery of stream ecosystems. Which choice most effectively uses relevant information from the notes to accomplish this goal?',
    choices: [
      { label: 'A', text: 'Wolves were reintroduced to Yellowstone in 1995, and ecologists have described the resulting ecological changes as a trophic cascade.' },
      { label: 'B', text: 'After wolves were reintroduced, elk avoided river valleys, allowing riparian vegetation to recover; the returning willows and aspens attracted beavers whose dams slowed stream flow and created wetlands, demonstrating how a single predator can trigger ecosystem-wide transformation.' },
      { label: 'C', text: 'The reintroduction of wolves reduced elk herd sizes, which had been growing unchecked during the 70-year absence of a top predator.' },
      { label: 'D', text: 'Beaver dams created wetlands that supported diverse bird and fish communities, illustrating the importance of riparian habitat to Yellowstone\'s biodiversity.' },
    ],
    correctAnswer: 'B',
    explanation:
      'The goal is to trace the chain of effects from wolf reintroduction to stream ecosystem recovery in a way that explains the trophic cascade concept to general readers. Choice B does this step by step: wolves returned → elk avoided river valleys → riparian plants recovered → beavers returned → dams altered hydrology → wetlands formed. It also names the concept explicitly ("ecosystem-wide transformation"), making the chain clear for non-specialists.',
    wrongAnswerExplanations: {
      A: 'Choice A names the reintroduction and the concept but provides no chain of effects — it does not explain what a trophic cascade is or how it unfolded.',
      C: 'Choice C mentions only one step (wolf reintroduction reducing elk numbers) without tracing the chain through to vegetation recovery, beavers, or stream changes.',
      D: 'Choice D starts at the end of the chain (beaver dams and wetlands) without explaining how wolves triggered the sequence, leaving the causal chain incomplete for readers unfamiliar with the concept.',
    },
  },

  // ─── q24 | hard | Craft and Structure — Words in Context | correctAnswer: D ───
  {
    id: 'sat-f10-v2-rw-m1-q24',
    section: 'reading-writing',
    moduleId: 'f10v2-rw-module-1',
    domain: 'Craft and Structure',
    skill: 'Words in Context',
    difficulty: 'hard',
    stimulus:
      'The political theorist\'s critique of deliberative democracy was _______ : rather than dismissing the tradition outright, she worked carefully through the internal logic of deliberation as a normative ideal, accepting its core commitments before demonstrating that the conditions it requires — perfect information, equal voice, freedom from strategic action — cannot be satisfied in any actual political context and thus render the model aspirational at best and mystifying at worst.',
    question: 'Which choice completes the text with the most logical and precise word or phrase?',
    choices: [
      { label: 'A', text: 'dismissive' },
      { label: 'B', text: 'cursory' },
      { label: 'C', text: 'partisan' },
      { label: 'D', text: 'immanent' },
    ],
    correctAnswer: 'D',
    explanation:
      '"Immanent critique" is a technical term in philosophy and political theory referring to a critique that works from within a tradition\'s own assumptions and commitments — accepting its premises before showing their internal contradictions or unattainable requirements. The passage describes exactly this: the theorist accepts the core commitments of deliberative democracy before showing its conditions cannot be met. "Immanent" is the precise term for this method.',
    wrongAnswerExplanations: {
      A: '"Dismissive" means treating something as unworthy of consideration; the passage explicitly states she did not dismiss the tradition outright — she engaged with it carefully on its own terms.',
      B: '"Cursory" means hasty and superficial; the passage describes a careful, thorough engagement with the internal logic of the tradition, the opposite of cursory.',
      C: '"Partisan" means biased in favor of a particular cause; the passage describes a rigorous analytical method, not a politically motivated attack on a rival tradition.',
    },
  },

  // ─── q25 | hard | Craft and Structure — Cross-Text Connections | correctAnswer: A ───
  {
    id: 'sat-f10-v2-rw-m1-q25',
    section: 'reading-writing',
    moduleId: 'f10v2-rw-module-1',
    domain: 'Craft and Structure',
    skill: 'Cross-Text Connections',
    difficulty: 'hard',
    stimulus:
      'Text 1\n\nEcologist Fatima Osei argues that rewilding — reintroducing large predators and other keystone species to landscapes from which they have been removed — offers a more ecologically effective and cost-efficient approach to conservation than habitat management strategies that rely on continuous human intervention. By restoring self-regulating ecosystems, rewilding can maintain biodiversity without the sustained labor and expense of active management programs.\n\nText 2\n\nConservation biologist Daniel Ashworth contends that rewilding projects often overlook the social and economic realities of rural communities adjacent to rewilded areas. Reintroduced predators, he notes, create genuine conflicts with livestock farming and can generate sustained opposition from the communities whose long-term cooperation is essential for any conservation strategy to succeed. Without meaningful engagement with these communities, even ecologically successful rewilding projects risk being reversed by political pressure.',
    question: 'Based on the texts, how would Ashworth most likely respond to Osei\'s argument about rewilding\'s advantages?',
    choices: [
      { label: 'A', text: 'By acknowledging that rewilding may be ecologically effective while arguing that its failure to account for community impacts undermines its practical viability as a conservation strategy.' },
      { label: 'B', text: 'By disputing the ecological premise that keystone species reintroductions reliably restore self-regulating ecosystems.' },
      { label: 'C', text: 'By agreeing that community opposition to rewilding can be resolved through improved public communication campaigns.' },
      { label: 'D', text: 'By arguing that active habitat management is equally cost-effective and should therefore be preferred over rewilding on economic grounds alone.' },
    ],
    correctAnswer: 'A',
    explanation:
      'Ashworth does not dispute the ecological effectiveness of rewilding — he focuses on social and political risks. He would likely concede that rewilding can achieve ecological goals (accepting Osei\'s premise) while arguing that the failure to engage with rural communities creates risks that undermine practical viability, including potential reversal by political pressure. Choice A captures both moves: conceding the ecological point and redirecting to community and political concerns.',
    wrongAnswerExplanations: {
      B: 'Ashworth does not dispute the ecological premise of rewilding; his critique is social and political, not a challenge to the ecology of keystone species reintroductions.',
      C: 'Ashworth does not suggest communication campaigns can resolve opposition — his argument is about substantive conflicts with livestock farming and the need for genuine community engagement, not improved messaging.',
      D: 'Ashworth does not argue that active management is more cost-effective; cost and efficiency are Osei\'s focus, not his. His argument is about community relations and political sustainability.',
    },
  },

  // ─── q26 | hard | Standard English Conventions — Boundaries | correctAnswer: C ───
  {
    id: 'sat-f10-v2-rw-m1-q26',
    section: 'reading-writing',
    moduleId: 'f10v2-rw-module-1',
    domain: 'Standard English Conventions',
    skill: 'Boundaries',
    difficulty: 'hard',
    stimulus:
      'The commission\'s final report, released after eighteen months of testimony and deliberation _______ that the agency had systematically underreported contamination levels at three of the five sites under review, and it recommended sweeping changes to the monitoring protocols used across the entire watershed.',
    question: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { label: 'A', text: 'deliberation: concluded' },
      { label: 'B', text: 'deliberation, it concluded' },
      { label: 'C', text: 'deliberation, concluded' },
      { label: 'D', text: 'deliberation — concluded' },
    ],
    correctAnswer: 'C',
    explanation:
      'The main subject of the sentence is "The commission\'s final report," and "released after eighteen months of testimony and deliberation" is a participial phrase that modifies it. After the modifying phrase closes, the main verb "concluded" follows with a comma to set off the intervening phrase from the predicate. This is the standard pattern: [Subject], [modifying phrase], [verb] — correctly represented by Choice C.',
    wrongAnswerExplanations: {
      A: 'A colon before "concluded" is incorrect here; colons introduce lists or elaborations but cannot separate a subject from its verb within a clause.',
      B: 'Adding "it" creates a second subject pronoun, making the sentence have two subjects ("report" and "it") for one predicate, which is a non-standard and redundant construction.',
      D: 'A dash before "concluded" is not appropriate here; dashes set off parenthetical or emphatic information but should not appear between a modifying phrase and the main verb in this syntactic context, as it would disrupt the logical flow from subject to predicate.',
    },
  },

  // ─── q27 | hard | Standard English Conventions — Form, Structure, and Sense | correctAnswer: B ───
  {
    id: 'sat-f10-v2-rw-m1-q27',
    section: 'reading-writing',
    moduleId: 'f10v2-rw-module-1',
    domain: 'Standard English Conventions',
    skill: 'Form, Structure, and Sense',
    difficulty: 'hard',
    stimulus:
      'The research team\'s new model for predicting hurricane intensification _______ not only the sea surface temperature data that forecasters have long relied upon but also atmospheric instability indices and moisture profiles at multiple vertical levels, factors that earlier models had omitted.',
    question: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { label: 'A', text: 'incorporate' },
      { label: 'B', text: 'incorporates' },
      { label: 'C', text: 'incorporating' },
      { label: 'D', text: 'have incorporated' },
    ],
    correctAnswer: 'B',
    explanation:
      'The subject of the sentence is "The research team\'s new model," which is singular. The verb must agree with this singular subject in the third person: "incorporates" is the correct present tense, third-person singular form. The "not only...but also" construction in the sentence connects two objects of the verb (sea surface temperature data and atmospheric indices) but does not change the subject or number of the verb.',
    wrongAnswerExplanations: {
      A: '"Incorporate" is a plural or base form; it does not agree with the singular subject "model" in standard third-person present tense.',
      C: '"Incorporating" is a present participle; it cannot serve as the main verb of the sentence without an auxiliary verb, leaving the sentence without a finite predicate.',
      D: '"Have incorporated" is a plural present perfect form that conflicts with the singular subject "model" — the correct form would be "has incorporated" — and the present perfect tense is not needed here since the sentence describes the current capabilities of the model, not a completed past action.',
    },
  },
]
