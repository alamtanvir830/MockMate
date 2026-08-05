import type { RWQuestion } from '../types'

export const f9RwModule2HardQuestionsV2: RWQuestion[] = [
  // ─── Q01 (D) ── Craft and Structure ── Words in Context ── medium ─────────────

  {
    id: 'sat-f9-v2-rw-m2h-q01',
    section: 'reading-writing',
    moduleId: 'f9v2-rw-module-2-hard',
    domain: 'Craft and Structure',
    skill: 'Words in Context',
    difficulty: 'medium',
    stimulus:
      'The archivist\'s reputation rested on her ability to remain _______ in the face of sensational discoveries: when she unearthed a cache of letters suggesting that a celebrated nineteenth-century poet had secretly renounced his published philosophy, she documented her findings with the same meticulous neutrality she brought to the cataloguing of routine correspondence, refusing to editorialize about implications she considered outside her professional mandate.',
    question:
      'Which choice completes the text with the most logical and precise word or phrase?',
    choices: [
      { label: 'A', text: 'credulous' },
      { label: 'B', text: 'circumspect' },
      { label: 'C', text: 'dispassionate' },
      { label: 'D', text: 'scrupulous' },
    ],
    correctAnswer: 'D',
    explanation:
      '"Scrupulous" means meticulous, careful, and conscientious about doing what is right or accurate. The passage elaborates on the archivist\'s behavior through the phrase "meticulous neutrality" and her refusal to editorialize — she remained precise and principled in her professional duties even when confronted with sensational material. "Scrupulous" captures both the carefulness and the principled restraint the passage describes.',
    wrongAnswerExplanations: {
      A: '"Credulous" means gullible or readily believing unverified claims. The passage gives no indication the archivist questioned the authenticity of the letters; the relevant quality is her professional conduct, not her epistemic credulity.',
      B: '"Circumspect" means wary and unwilling to take risks. While it connotes caution, it describes a disposition toward decision-making under uncertainty rather than the methodical, principled carefulness in documentation that the passage emphasizes.',
      C: '"Dispassionate" means emotionally detached. This captures the neutrality dimension but misses the active carefulness — the meticulous precision — that "scrupulous" adds. The passage describes both neutrality and rigorous accuracy, not merely a lack of emotion.',
    },
  },

  // ─── Q02 (B) ── Craft and Structure ── Words in Context ── medium ─────────────

  {
    id: 'sat-f9-v2-rw-m2h-q02',
    section: 'reading-writing',
    moduleId: 'f9v2-rw-module-2-hard',
    domain: 'Craft and Structure',
    skill: 'Words in Context',
    difficulty: 'medium',
    stimulus:
      'The debut novel was widely praised for its structural _______ : moving between four narrative timelines and three continents, the author wove each strand so that individual revelations in one timeline retroactively recontextualized events in another, creating a reading experience in which the meaning of early scenes was perpetually subject to revision as later chapters accumulated.',
    question:
      'Which choice completes the text with the most logical and precise word or phrase?',
    choices: [
      { label: 'A', text: 'symmetry' },
      { label: 'B', text: 'intricacy' },
      { label: 'C', text: 'economy' },
      { label: 'D', text: 'cohesion' },
    ],
    correctAnswer: 'B',
    explanation:
      '"Intricacy" means the quality of having many complexly interrelated parts or elements. The passage describes a multi-timeline, multi-continental structure in which revelations in one strand retroactively alter the meaning of another — a description of elaborate, mutually dependent complexity. "Intricacy" precisely names this property of intricate structural interconnection.',
    wrongAnswerExplanations: {
      A: '"Symmetry" implies a balanced, proportional correspondence between parts. The passage emphasizes dynamic revision of meaning across timelines, which is a relationship of mutual transformation rather than of mirrored balance.',
      C: '"Economy" means achieving maximum effect with minimal means — a quality of compression and efficiency. The passage emphasizes elaborateness and multiplicity (four timelines, three continents), the opposite of economical restraint.',
      D: '"Cohesion" means holding together as a unified whole. While the novel is described as unified by its interwoven strands, "cohesion" does not capture the elaborateness and mutual revision of meaning that the passage foregrounds. A simple linear narrative could be cohesive; "intricacy" names the specific kind of complexity the author is praised for.',
    },
  },

  // ─── Q03 (A) ── Expression of Ideas ── Transitions ── medium ────────────────

  {
    id: 'sat-f9-v2-rw-m2h-q03',
    section: 'reading-writing',
    moduleId: 'f9v2-rw-module-2-hard',
    domain: 'Expression of Ideas',
    skill: 'Transitions',
    difficulty: 'medium',
    stimulus:
      'Early sociological studies of urban poverty tended to locate its causes in cultural pathologies — the supposed attitudes, habits, and values of poor communities themselves. _______, a generation of structural sociologists demonstrated that poverty concentrations in cities were better explained by decisions made at the macro level: discriminatory mortgage lending, racially selective highway construction, and deliberate disinvestment in public services that preceded and shaped the behaviors the earlier researchers had observed.',
    question:
      'Which choice completes the text with the most logical transition?',
    choices: [
      { label: 'A', text: 'Subsequently,' },
      { label: 'B', text: 'Similarly,' },
      { label: 'C', text: 'Therefore,' },
      { label: 'D', text: 'In particular,' },
    ],
    correctAnswer: 'A',
    explanation:
      '"Subsequently" signals a temporal sequence — what came next. The passage describes an earlier generation of researchers and then introduces a later generation whose work challenged the earlier findings. "Subsequently" correctly marks this chronological succession while implicitly signaling a shift in the scholarly consensus.',
    wrongAnswerExplanations: {
      B: '"Similarly" signals that the second sentence adds a parallel point to the first. But the structural sociologists\' work directly contradicts the earlier cultural-pathology approach, making a similarity connector logically incorrect.',
      C: '"Therefore" signals a logical consequence or conclusion drawn from the preceding material. The structural sociologists did not reach their findings because of the cultural-pathology studies; their work challenged and superseded those studies rather than following from them.',
      D: '"In particular" signals a specific instance of the preceding general claim. The second sentence is not a specific example of cultural-pathology sociology; it introduces a competing paradigm that overtook it.',
    },
  },

  // ─── Q04 (C) ── Standard English Conventions ── Boundaries ── medium-hard ────

  {
    id: 'sat-f9-v2-rw-m2h-q04',
    section: 'reading-writing',
    moduleId: 'f9v2-rw-module-2-hard',
    domain: 'Standard English Conventions',
    skill: 'Boundaries',
    difficulty: 'medium',
    stimulus:
      'The commission\'s final report identified three overlapping causes of the infrastructure failure: inadequate maintenance funding, deferred inspections dating back nearly a decade, and _______ the contractor\'s use of substandard materials was never flagged during routine audits.',
    question:
      'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { label: 'A', text: 'a regulatory gap—' },
      { label: 'B', text: 'a regulatory gap,' },
      { label: 'C', text: 'a regulatory gap in which' },
      { label: 'D', text: 'a regulatory gap; and' },
    ],
    correctAnswer: 'C',
    explanation:
      'The sentence lists three causes after the colon. The third item is "a regulatory gap in which the contractor\'s use of substandard materials was never flagged during routine audits" — a noun phrase followed by a relative clause that defines the gap. This construction makes "a regulatory gap in which..." a grammatically complete and parallel third element in the list. The relative clause "in which..." integrates the explanation into the noun phrase, completing the parallel series.',
    wrongAnswerExplanations: {
      A: 'An em-dash after "a regulatory gap" would introduce an explanatory aside but would create an unresolved em-dash construction — the sentence has no closing em-dash, and the structure after the dash would be a run-on independent clause grafted onto the list.',
      B: 'A comma after "a regulatory gap" leaves "the contractor\'s use of substandard materials was never flagged during routine audits" as a free-floating independent clause spliced onto the sentence with only a comma, creating a comma splice.',
      D: 'A semicolon would separate the third list item from the preceding two, which are joined in a colon-introduced list. Semicolons can separate list items only when the items themselves contain commas; here, the items are short phrases, making the semicolon structurally disruptive and the conjunction redundant.',
    },
  },

  // ─── Q05 (D) ── Craft and Structure ── Words in Context ── medium-hard ────────

  {
    id: 'sat-f9-v2-rw-m2h-q05',
    section: 'reading-writing',
    moduleId: 'f9v2-rw-module-2-hard',
    domain: 'Craft and Structure',
    skill: 'Words in Context',
    difficulty: 'medium',
    stimulus:
      'The epidemiologist\'s findings were remarkable for their _______ : rather than reporting aggregate infection rates across the general population, she disaggregated the data by neighborhood, occupation, housing density, and primary language, revealing that the outbreak had affected discrete communities in ways that varied by as much as forty percentage points and that any summary statistic would have entirely concealed.',
    question:
      'Which choice completes the text with the most logical and precise word or phrase?',
    choices: [
      { label: 'A', text: 'comprehensiveness' },
      { label: 'B', text: 'precision' },
      { label: 'C', text: 'transparency' },
      { label: 'D', text: 'granularity' },
    ],
    correctAnswer: 'D',
    explanation:
      '"Granularity" refers to the level of detail at which data is captured or analyzed — the degree to which a dataset is broken into fine-grained, specific categories rather than broad aggregates. The passage contrasts aggregate reporting with disaggregated analysis across multiple demographic and geographic dimensions; this is precisely what "granularity" names. The epidemiologist\'s findings are remarkable for how finely they subdivide the data.',
    wrongAnswerExplanations: {
      A: '"Comprehensiveness" means covering everything broadly. The passage does not praise the study for its breadth across the entire population but for its fine subdivision of data within the population — "comprehensiveness" implies scope, not granular detail.',
      B: '"Precision" means exactness or accuracy in measurement. While the disaggregation produces more accurate pictures of specific communities, the passage\'s emphasis is on the level of subdivision — the fine-grained breakdown — rather than on the accuracy of any single measurement.',
      C: '"Transparency" means openness and accessibility of information or methods. Nothing in the passage concerns the epidemiologist\'s disclosure of her methods or data; the celebrated quality is the fine-grained analytical structure of her findings.',
    },
  },

  // ─── Q06 (B) ── Information and Ideas ── Central Ideas and Details ── medium-hard

  {
    id: 'sat-f9-v2-rw-m2h-q06',
    section: 'reading-writing',
    moduleId: 'f9v2-rw-module-2-hard',
    domain: 'Information and Ideas',
    skill: 'Central Ideas and Details',
    difficulty: 'medium',
    stimulus:
      'The history of cartography challenges a naive assumption that maps simply record pre-existing geographic reality. Early European cartographers routinely depicted coastlines they had never surveyed, populated blank interiors with allegorical creatures, and assigned territorial claims to regions that no European had visited. These choices were not errors or decorative whimsy but deliberate assertions — maps functioned as instruments of possession, circulated among monarchs and investors to validate contested claims of sovereignty over lands and peoples. The resulting documents shaped the very political geography they purported to describe, as nations organized expeditions and drew treaties according to the maps in their possession rather than according to conditions in the territories themselves.',
    question:
      'Which choice most accurately states the central idea of the passage?',
    choices: [
      { label: 'A', text: 'Early cartographers deliberately falsified coastlines and interiors to deceive investors and monarchs who lacked independent means of verification.' },
      { label: 'B', text: 'Early maps were not neutral records of geographic reality but active instruments that shaped the political and territorial world they claimed to depict.' },
      { label: 'C', text: 'The allegorical creatures depicted in the interiors of early maps reveal that cartographers understood them to be artistic rather than scientific documents.' },
      { label: 'D', text: 'Cartographic inaccuracies in the early modern period led to costly misallocation of resources, as expeditions were organized around maps that misrepresented actual conditions.' },
    ],
    correctAnswer: 'B',
    explanation:
      'The passage argues that maps were not passive records of reality but active political instruments: they asserted possession, shaped sovereign claims, and organized expeditions according to the map\'s depictions rather than actual conditions. Choice B accurately captures this central claim — maps shaped the world they claimed to describe — without overstating any particular detail.',
    wrongAnswerExplanations: {
      A: 'The passage does not characterize the cartographers\' choices as deliberate falsification intended to deceive. It frames the choices as "deliberate assertions" of territorial claims — a different kind of intentional act with a different purpose. The passage does not attribute deception as the motive.',
      C: 'The passage mentions allegorical creatures as one example among several of deliberate choices, but it does not conclude from this that cartographers understood maps as art. The argument runs in the opposite direction: these apparently decorative choices were actually political assertions.',
      D: 'The passage mentions that expeditions were organized according to maps, which implies potential misallocation, but the passage does not discuss costs or resource misallocation. This choice introduces a specific practical consequence the passage does not address.',
    },
  },

  // ─── Q07 (A) ── Expression of Ideas ── Rhetorical Synthesis ── medium-hard ────

  {
    id: 'sat-f9-v2-rw-m2h-q07',
    section: 'reading-writing',
    moduleId: 'f9v2-rw-module-2-hard',
    domain: 'Expression of Ideas',
    skill: 'Rhetorical Synthesis',
    difficulty: 'medium',
    stimulus:
      'A student is writing a report on the decline of printed daily newspapers. While researching, the student found the following information:\n\n- Between 2006 and 2022, total US daily newspaper circulation fell from approximately 55 million to 20 million copies.\n- Print advertising revenue for US newspapers declined by more than 80 percent between 2006 and 2020.\n- Over the same period, digital advertising revenue for newspapers grew but never compensated for print losses; by 2020, digital ad revenue was roughly one-fifth of what print had generated in 2006.\n- Since 2005, more than 2,500 US newspapers — the majority of them local papers — have closed entirely.\n- Research shows that communities that lose their local newspaper experience measurable increases in municipal bond interest rates, suggesting reduced civic accountability.',
    question:
      'The student wants to emphasize the economic inadequacy of digital advertising as a replacement for print revenue. Which choice most effectively uses the notes to accomplish this goal?',
    choices: [
      {
        label: 'A',
        text: 'Although newspapers\' digital advertising revenue grew as print readership declined, it recovered only a fraction of what was lost: by 2020, digital ad revenue amounted to roughly one-fifth of the print advertising revenue newspapers had earned in 2006.',
      },
      {
        label: 'B',
        text: 'The collapse of print advertising revenue — a decline of more than 80 percent between 2006 and 2020 — drove the closure of more than 2,500 American newspapers, the majority of them local papers serving smaller communities.',
      },
      {
        label: 'C',
        text: 'US daily newspaper circulation fell sharply from 55 million copies in 2006 to 20 million in 2022, a 64 percent drop that reflects the broader shift of readers away from print media and toward digital platforms.',
      },
      {
        label: 'D',
        text: 'Communities that lose their local newspapers face measurable civic consequences, including higher municipal bond interest rates — a finding that illustrates the broader social costs of the newspaper industry\'s economic distress.',
      },
    ],
    correctAnswer: 'A',
    explanation:
      'The goal is to emphasize the economic inadequacy of digital advertising as a replacement for print revenue. Choice A directly compares digital and print ad revenue by citing the specific ratio (one-fifth), making the inadequacy of the replacement quantitatively clear. It also acknowledges that digital revenue did grow — conceding the partial shift — before showing that growth was far too small to compensate.',
    wrongAnswerExplanations: {
      B: 'This choice emphasizes the decline in print advertising revenue and the resulting closures, but it does not compare digital revenue to print revenue or address whether digital advertising could serve as a replacement. The specific goal of demonstrating digital\'s inadequacy as a replacement is not addressed.',
      C: 'This choice describes the drop in circulation, which is a readership metric rather than an advertising revenue metric. It does not address the advertising revenue comparison that the goal specifies.',
      D: 'This choice pivots to the civic consequences of newspaper closures. While relevant to a broader argument about newspaper decline, it does not address the economic comparison between digital and print advertising revenue.',
    },
  },

  // ─── Q08 (C) ── Expression of Ideas ── Transitions ── medium-hard ────────────

  {
    id: 'sat-f9-v2-rw-m2h-q08',
    section: 'reading-writing',
    moduleId: 'f9v2-rw-module-2-hard',
    domain: 'Expression of Ideas',
    skill: 'Transitions',
    difficulty: 'medium',
    stimulus:
      'The philosopher Gilbert Ryle introduced the concept of the "category mistake" to describe errors in which properties or predicates appropriate to one logical type are applied to another: asking what color a musical scale is, or demanding to know in which room of a building a university is located. _______, scholars in cognitive science and linguistics have extended Ryle\'s framework to analyze how ordinary speakers routinely commit category errors when reasoning about mental states, applying the vocabulary of spatial location and physical causation to entities — beliefs, intentions, desires — that do not occupy space or exert physical force.',
    question:
      'Which choice completes the text with the most logical transition?',
    choices: [
      { label: 'A', text: 'By contrast,' },
      { label: 'B', text: 'For example,' },
      { label: 'C', text: 'More recently,' },
      { label: 'D', text: 'As a result,' },
    ],
    correctAnswer: 'C',
    explanation:
      '"More recently" signals a temporal progression — Ryle introduced the concept, and then, at a later point in time, scholars in cognitive science and linguistics extended it. The passage describes an intellectual development over time, and "more recently" marks the later phase of that development without implying logical causation or contrast.',
    wrongAnswerExplanations: {
      A: '"By contrast" signals opposition between the two sentences. But the second sentence extends and applies Ryle\'s framework rather than contrasting with it; cognitive scientists are building on, not disagreeing with, Ryle\'s work.',
      B: '"For example" signals that the second sentence is a specific illustration of the preceding general claim. But the work of cognitive scientists and linguists is a new development beyond Ryle\'s original examples, not simply another instance of what was described in the first sentence.',
      D: '"As a result" signals that the second sentence is a consequence caused by the first. While Ryle\'s work may have influenced subsequent scholars, the passage presents the cognitive science application as a development that extended the framework, not as a direct causal outcome of Ryle\'s definition.',
    },
  },

  // ─── Q09 (D) ── Craft and Structure ── Words in Context ── medium-hard ────────

  {
    id: 'sat-f9-v2-rw-m2h-q09',
    section: 'reading-writing',
    moduleId: 'f9v2-rw-module-2-hard',
    domain: 'Craft and Structure',
    skill: 'Words in Context',
    difficulty: 'medium',
    stimulus:
      'The senator\'s prepared remarks were careful and measured, but her unscripted responses during the question period revealed the _______ nature of the legislation she was defending: when pressed on implementation costs, timeline discrepancies, and enforcement mechanisms, she either contradicted her own written testimony or offered formulations so vague that they were compatible with any position the questioner proposed.',
    question:
      'Which choice completes the text with the most logical and precise word or phrase?',
    choices: [
      { label: 'A', text: 'controversial' },
      { label: 'B', text: 'speculative' },
      { label: 'C', text: 'provisional' },
      { label: 'D', text: 'inchoate' },
    ],
    correctAnswer: 'D',
    explanation:
      '"Inchoate" means not yet fully formed or developed — undeveloped, incomplete, incoherent. The senator\'s unscripted stumbling (contradictions with her own testimony, vague formulations compatible with any position) reveals that the legislation had not been thought through clearly; it was internally unformed. "Inchoate" precisely names this quality of being conceptually undeveloped, not merely disputed or tentative.',
    wrongAnswerExplanations: {
      A: '"Controversial" means generating disagreement or debate among different parties. The passage does not show people disagreeing with the legislation; it shows the senator herself unable to give consistent or coherent answers about it. The problem is internal incoherence, not external controversy.',
      B: '"Speculative" means based on conjecture rather than established fact or evidence. While it implies uncertainty, it suggests the legislation was theoretical or unproven rather than internally undeveloped and contradictory.',
      C: '"Provisional" means temporary or conditional, subject to revision. This implies the legislation was a placeholder — deliberately not final — rather than poorly conceived. The senator\'s contradiction of her own testimony suggests the problem is conceptual incoherence, not intentional tentativeness.',
    },
  },

  // ─── Q10 (B) ── Information and Ideas ── Central Ideas and Details ── medium-hard

  {
    id: 'sat-f9-v2-rw-m2h-q10',
    section: 'reading-writing',
    moduleId: 'f9v2-rw-module-2-hard',
    domain: 'Information and Ideas',
    skill: 'Central Ideas and Details',
    difficulty: 'medium',
    stimulus:
      'Paleoanthropologists studying Homo naledi, a small-brained hominin discovered in South Africa\'s Rising Star cave system, have encountered an interpretive puzzle: the species\'s brain volume — comparable to that of species that predated it by more than a million years — exists alongside skeletal features associated with complex locomotion, a hand morphology capable of fine manipulation, and depositional contexts suggesting deliberate placement of the dead in a location difficult of access. The puzzle is not that a small-brained hominin possessed physical capabilities; it is that the combination of anatomical and behavioral evidence challenges the assumption that large brains were a necessary precondition for the kinds of social and mortuary behaviors previously attributed exclusively to cognitively sophisticated hominins.',
    question:
      'Which choice best states the main claim of the passage?',
    choices: [
      { label: 'A', text: 'Homo naledi\'s small brain volume confirms that cognitive complexity in hominins is entirely determined by brain size rather than by morphological features.' },
      { label: 'B', text: 'Evidence from Homo naledi challenges the view that large brain size was a necessary prerequisite for complex social and mortuary behaviors in hominins.' },
      { label: 'C', text: 'The Rising Star cave system is an unusual depositional context that limits paleoanthropologists\' ability to draw reliable inferences about Homo naledi\'s behavior.' },
      { label: 'D', text: 'Homo naledi possessed the physical capabilities for complex locomotion and manipulation despite lacking the brain volume typical of later Homo species.' },
    ],
    correctAnswer: 'B',
    explanation:
      'The passage\'s central puzzle is explicitly stated in the final sentence: the combination of anatomical and behavioral evidence "challenges the assumption that large brains were a necessary precondition" for complex social and mortuary behaviors. Choice B restates this claim accurately and precisely, focusing on the challenge to the precondition assumption rather than on any single piece of physical or anatomical evidence.',
    wrongAnswerExplanations: {
      A: 'The passage argues the opposite: Homo naledi\'s evidence challenges brain-size-centric assumptions. Choice A misreads the passage as confirming that brain size determines cognitive complexity.',
      C: 'The passage does not suggest the cave context limits inference; rather, it uses the depositional context as evidence for deliberate placement of the dead. The cave system is presented as informative, not as a methodological obstacle.',
      D: 'This choice accurately describes a detail from the passage — the physical capabilities — but frames the main claim too narrowly. The central claim is not about the mismatch between physical capability and brain size; it is about what that mismatch implies for our understanding of cognitive prerequisites for complex behavior.',
    },
  },

  // ─── Q11 (A) ── Information and Ideas ── Command of Evidence (Textual) ── medium-hard

  {
    id: 'sat-f9-v2-rw-m2h-q11',
    section: 'reading-writing',
    moduleId: 'f9v2-rw-module-2-hard',
    domain: 'Information and Ideas',
    skill: 'Command of Evidence',
    difficulty: 'medium',
    stimulus:
      'Historian Leah Feldman argues that the nineteenth-century institution of the lending library was less a vehicle for mass literacy than an instrument for the social calibration of reading taste. Lending libraries did make books accessible to readers who could not afford purchase, but their catalogues were actively curated by proprietors who excluded politically radical titles, erotica, and certain categories of working-class fiction while prioritizing morally instructive works and improving literature. The result, Feldman contends, was not the free circulation of ideas but the managed formation of a respectable middle-class reading public.',
    question:
      'Which finding, if true, would most directly support Feldman\'s argument?',
    choices: [
      {
        label: 'A',
        text: 'Archival records from a major Victorian lending library show that titles advocating republican government were systematically removed from the catalogue within months of publication, while moral conduct manuals were retained and prominently displayed.',
      },
      {
        label: 'B',
        text: 'The introduction of lending libraries in manufacturing towns was followed by measurable increases in literacy rates among working-class adults within a decade.',
      },
      {
        label: 'C',
        text: 'Nineteenth-century lending library proprietors frequently complained in their correspondence about the difficulty of sourcing sufficient copies of popular novels to meet patron demand.',
      },
      {
        label: 'D',
        text: 'A survey of lending library subscribers from 1850 found that a majority of members were drawn from the professional middle class rather than from artisan or laboring populations.',
      },
    ],
    correctAnswer: 'A',
    explanation:
      'Feldman\'s argument is that lending library proprietors actively curated their catalogues to exclude politically radical titles and prioritize morally instructive ones, shaping taste rather than freely circulating ideas. Choice A provides a concrete archival example of exactly this mechanism — systematic exclusion of republican titles and retention of moral conduct manuals — directly evidencing the active curation Feldman describes.',
    wrongAnswerExplanations: {
      B: 'Evidence of rising literacy rates would support the view that lending libraries were vehicles for mass literacy — the position Feldman is arguing against. This would undercut rather than support her claim.',
      C: 'Difficulty sourcing popular novels describes supply logistics, not catalogue curation. This finding does not bear on whether proprietors selectively excluded certain categories of content.',
      D: 'A middle-class subscriber base could be consistent with Feldman\'s argument about managed formation of middle-class readership, but it does not directly evidence the active curation of content — the mechanism Feldman identifies. It describes who read, not what was available or withheld.',
    },
  },

  // ─── Q12 (C) ── Expression of Ideas ── Transitions ── medium-hard ─────────────

  {
    id: 'sat-f9-v2-rw-m2h-q12',
    section: 'reading-writing',
    moduleId: 'f9v2-rw-module-2-hard',
    domain: 'Expression of Ideas',
    skill: 'Transitions',
    difficulty: 'medium',
    stimulus:
      'Animal cognition researchers have documented tool use in a growing number of non-human species, including crows, octopuses, dolphins, and various primates. _______, the presence of tool use does not in itself constitute evidence of the kind of causal reasoning that psychologists call "physical cognition" — the ability to understand how and why physical interventions produce the effects they do, rather than merely learning associations between actions and outcomes through trial and error.',
    question:
      'Which choice completes the text with the most logical transition?',
    choices: [
      { label: 'A', text: 'Additionally,' },
      { label: 'B', text: 'Specifically,' },
      { label: 'C', text: 'Even so,' },
      { label: 'D', text: 'As a result,' },
    ],
    correctAnswer: 'C',
    explanation:
      '"Even so" introduces a concessive contrast — it acknowledges the truth of the preceding claim while asserting that a qualifying or contrary point holds despite it. The passage first acknowledges documented tool use across many species, then introduces the important caveat that tool use alone does not prove causal reasoning. "Even so" precisely marks this concessive relationship: granted that tool use is widely documented, it still does not constitute evidence of physical cognition.',
    wrongAnswerExplanations: {
      A: '"Additionally" signals that the second sentence adds a supporting or complementary point to the first. But the second sentence introduces a qualification that limits what can be inferred from the first sentence\'s findings, not an additional supporting claim.',
      B: '"Specifically" signals that the second sentence narrows or elaborates on a detail of the first. The second sentence does not narrow or exemplify tool use; it introduces a logical caveat about what tool use implies.',
      D: '"As a result" signals a causal consequence. The logical point about the limits of tool-use evidence does not follow causally from the documented prevalence of tool use; it is a conceptual distinction, not a consequence.',
    },
  },

  // ─── Q13 (D) ── Information and Ideas ── Command of Evidence (Quantitative) ── medium-hard

  {
    id: 'sat-f9-v2-rw-m2h-q13',
    section: 'reading-writing',
    moduleId: 'f9v2-rw-module-2-hard',
    domain: 'Information and Ideas',
    skill: 'Command of Evidence',
    difficulty: 'medium',
    graphData: {
      type: 'table',
      title: 'Antibiotic Prescription Rates and Resistance Prevalence by Setting (Selected Countries, 2019)',
      headers: ['Country', 'Outpatient Rx per 1,000 pop.', 'Inpatient Rx per 1,000 pop.', 'Resistance prevalence (%)', 'Setting'],
      rows: [
        ['Sweden', '138', '44', '8', 'High-income, regulated'],
        ['Germany', '163', '67', '14', 'High-income, regulated'],
        ['United States', '217', '89', '19', 'High-income, mixed'],
        ['Brazil', '296', '121', '31', 'Middle-income, mixed'],
        ['India', '412', '198', '47', 'Middle-income, low-regulation'],
        ['Nigeria', '387', '174', '52', 'Middle-income, low-regulation'],
      ],
    },
    stimulus:
      'A public health researcher studying antibiotic stewardship programs wrote: "The data suggest a consistent relationship between antibiotic prescription rates and resistance prevalence across income levels and regulatory settings, with countries that prescribe at higher rates showing substantially higher rates of bacterial resistance — a pattern that holds even when controlling for income, since high-income countries with less restrictive prescribing habits show greater resistance than high-income peers with stricter controls."',
    question:
      'Which choice best describes data from the table that support the researcher\'s claim about high-income countries with different prescribing regimes?',
    choices: [
      {
        label: 'A',
        text: 'India and Nigeria both show prescription rates above 380 per 1,000 outpatients and resistance prevalence above 47 percent, confirming that low-regulation middle-income countries have the highest resistance burdens globally.',
      },
      {
        label: 'B',
        text: 'Brazil\'s outpatient prescription rate of 296 per 1,000 population and resistance prevalence of 31 percent place it between high-income and low-regulation middle-income countries, illustrating a gradient across the full dataset.',
      },
      {
        label: 'C',
        text: 'Total antibiotic prescriptions — combining outpatient and inpatient figures — rise consistently from Sweden (182) through Germany (230) to the United States (306), confirming a dose-response relationship in high-income countries.',
      },
      {
        label: 'D',
        text: 'Among the three high-income countries, the United States, which is classified as "mixed" regulation, shows both higher combined prescription rates (217 outpatient, 89 inpatient) and higher resistance prevalence (19 percent) than Sweden or Germany, whose stricter regulation corresponds to rates of 8 and 14 percent respectively.',
      },
    ],
    correctAnswer: 'D',
    explanation:
      'The researcher\'s specific claim is that high-income countries with less restrictive prescribing show greater resistance than high-income peers with stricter controls. Choice D directly tests this within the high-income group: the US (mixed regulation, higher prescription rates, 19 percent resistance) vs. Sweden and Germany (regulated, lower rates, 8 and 14 percent resistance). This within-group comparison among high-income countries is exactly what the researcher points to as holding even when income is controlled.',
    wrongAnswerExplanations: {
      A: 'This choice describes low-regulation middle-income countries (India and Nigeria), which does not address the researcher\'s specific claim about variation within high-income countries controlled for income level.',
      B: 'This choice uses Brazil to illustrate a gradient across the full dataset. While consistent with the broader pattern, it does not specifically support the researcher\'s narrower claim about high-income countries with different regulatory environments.',
      C: 'This choice calculates combined prescription totals, but the researcher\'s claim is about resistance prevalence as the outcome variable, and Sweden\'s resistance (8 percent) vs. Germany\'s (14 percent) vs. the United States\' (19 percent) is the relevant comparison — not prescription volume alone. Choice D is more precise because it explicitly links higher prescribing to higher resistance within the high-income group.',
    },
  },

  // ─── Q14 (B) ── Craft and Structure ── Text Structure and Purpose ── medium-hard

  {
    id: 'sat-f9-v2-rw-m2h-q14',
    section: 'reading-writing',
    moduleId: 'f9v2-rw-module-2-hard',
    domain: 'Craft and Structure',
    skill: 'Text Structure and Purpose',
    difficulty: 'medium',
    stimulus:
      'The anthropologist Ruth Benedict drew a celebrated distinction between "shame cultures" and "guilt cultures." In a shame culture, behavioral conformity is enforced through public exposure and the threat of social humiliation; transgression matters because others see it. In a guilt culture, the regulating mechanism is internal — an internalized moral standard that generates self-condemnation regardless of whether the transgression is witnessed. Benedict offered Japan and ancient Greece as shame cultures and modern Protestant societies as guilt cultures. Subsequent anthropologists have challenged the dichotomy extensively: cross-cultural studies reveal that most societies use both mechanisms in varying proportions, that individuals within any society differ substantially in their reliance on each, and that the historical portrait of Japan as exclusively shame-oriented was based on incomplete data gathered under conditions of wartime censorship.',
    question:
      'Which choice best describes the overall structure of the passage?',
    choices: [
      { label: 'A', text: 'It traces the historical origin of a psychological concept, explains how it was misunderstood, and proposes a revised framework to replace it.' },
      { label: 'B', text: 'It presents an influential conceptual distinction, illustrates it with the examples its author used, and then describes how subsequent scholarship has complicated and challenged it.' },
      { label: 'C', text: 'It introduces two competing theories of behavioral regulation, presents evidence for each, and concludes that one has greater empirical support.' },
      { label: 'D', text: 'It argues that Benedict\'s distinction between shame and guilt cultures was fundamentally correct but that her choice of examples was historically inaccurate.' },
    ],
    correctAnswer: 'B',
    explanation:
      'The passage follows this precise structure: (1) introduces Benedict\'s shame/guilt distinction; (2) explains each mechanism and provides Benedict\'s own examples; (3) describes how subsequent anthropologists challenged the dichotomy with cross-cultural studies and critiques of the Japan portrait. Choice B captures all three stages accurately.',
    wrongAnswerExplanations: {
      A: 'The passage does not propose a revised framework to replace the dichotomy; it reports that subsequent scholars have challenged it but does not articulate a replacement model.',
      C: 'The passage does not present two competing theories with evidence adjudicated between them. It presents one scholar\'s distinction and then describes the challenges to that distinction — a different structure from two-sided competition.',
      D: 'The passage does not conclude that Benedict\'s distinction was "fundamentally correct." The subsequent scholarship challenges the dichotomy itself (finding that most societies use both mechanisms), not merely the accuracy of specific examples.',
    },
  },

  // ─── Q15 (A) ── Information and Ideas ── Inferences ── medium-hard ─────────────

  {
    id: 'sat-f9-v2-rw-m2h-q15',
    section: 'reading-writing',
    moduleId: 'f9v2-rw-module-2-hard',
    domain: 'Information and Ideas',
    skill: 'Inferences',
    difficulty: 'medium',
    stimulus:
      'In the late nineteenth century, germ theory displaced miasma theory as the dominant explanation for infectious disease, but the transition was neither immediate nor complete. Many physicians continued to invoke miasmatic language well into the 1890s even as they acknowledged Pasteur\'s and Koch\'s demonstrations of specific microbial causation. Historians of medicine have interpreted this persistence less as ignorance than as a rational response to institutional pressures: miasmatic explanations supported sanitation-based public health measures — improved drainage, clean water, refuse removal — that were practical, politically achievable, and often effective, even if their theoretical basis was incorrect. Germ theory, by contrast, initially offered an etiology without a reliable therapeutic arsenal; knowing the pathogen did not immediately yield a cure.',
    question:
      'Based on the passage, what can most reasonably be inferred about why some physicians persisted in using miasmatic language after germ theory was established?',
    choices: [
      {
        label: 'A',
        text: 'Miasmatic explanations remained practically useful for advocating sanitation interventions that reduced disease even though the theoretical basis for those interventions was being superseded.',
      },
      {
        label: 'B',
        text: 'Physicians who continued using miasmatic language were unaware of Koch\'s and Pasteur\'s microbial findings and had not yet encountered the primary literature establishing germ theory.',
      },
      {
        label: 'C',
        text: 'Miasmatic theory was preferred over germ theory because it provided physicians with a reliable therapeutic arsenal for treating infectious diseases at the point of care.',
      },
      {
        label: 'D',
        text: 'The persistence of miasmatic language reflected popular demand from patients who were more comfortable with environmental explanations for disease than with the concept of invisible pathogens.',
      },
    ],
    correctAnswer: 'A',
    explanation:
      'The passage directly states that historians interpret the persistence of miasmatic language as "a rational response to institutional pressures" because miasmatic explanations supported practically effective sanitation measures that were "achievable" and "often effective, even if their theoretical basis was incorrect." Choice A accurately captures this inference: the continued utility of the language for sanitation advocacy explains its persistence despite theoretical supersession.',
    wrongAnswerExplanations: {
      B: 'The passage explicitly rejects ignorance as the explanation ("less as ignorance than as a rational response to institutional pressures") and states that these physicians acknowledged microbial causation even while retaining miasmatic language.',
      C: 'The passage states the opposite: germ theory "initially offered an etiology without a reliable therapeutic arsenal." It is germ theory, not miasma theory, that lacked therapeutic tools. Miasmatic theory supported sanitation, not individual therapeutics.',
      D: 'The passage does not mention patient preferences or popular demand. The institutional pressures identified concern public health infrastructure and political achievability, not patient psychology.',
    },
  },

  // ─── Q16 (C) ── Standard English Conventions ── Boundaries ── hard ──────────

  {
    id: 'sat-f9-v2-rw-m2h-q16',
    section: 'reading-writing',
    moduleId: 'f9v2-rw-module-2-hard',
    domain: 'Standard English Conventions',
    skill: 'Boundaries',
    difficulty: 'hard',
    stimulus:
      'The committee\'s review concluded that the project had failed on three interdependent counts: the original feasibility assessment had underestimated construction costs by nearly forty percent _______ the procurement process had bypassed the competitive bidding requirements mandated by the city charter, and the project manager had signed off on invoices for work that independent auditors later determined had never been performed.',
    question:
      'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { label: 'A', text: 'therefore' },
      { label: 'B', text: 'however' },
      { label: 'C', text: '; the procurement process' },
      { label: 'D', text: ', and the procurement process' },
    ],
    correctAnswer: 'C',
    explanation:
      'The sentence after the colon lists three items using semicolons to separate them — the standard punctuation when list items are long or complex. The first item ends with "by nearly forty percent," and the second item begins with "the procurement process." A semicolon between them correctly separates the first and second items in a colon-introduced list whose items are independent clauses. The third item is already connected with ", and," completing the series.',
    wrongAnswerExplanations: {
      A: 'Inserting "therefore" without punctuation after "forty percent" creates a run-on sentence — two independent clauses joined without appropriate punctuation. Additionally, "therefore" implies the second item is a consequence of the first, which is logically inaccurate; the items are listed as parallel failures, not causal chain.',
      B: 'Like choice A, "however" without punctuation creates a run-on, and "however" signals a contrast between the first and second items. The passage presents the three counts as parallel failures, not as contrasting findings.',
      D: 'Using ", and the procurement process" here would create a list using commas for the first pair and then "; and" for the final item — a mismatch. More critically, when the list items are themselves full independent clauses (as they are here), semicolons are required to separate items; a comma before "and" would create a comma splice between the first two independent clauses.',
    },
  },

  // ─── Q17 (D) ── Standard English Conventions ── Form, Structure, and Sense ── hard

  {
    id: 'sat-f9-v2-rw-m2h-q17',
    section: 'reading-writing',
    moduleId: 'f9v2-rw-module-2-hard',
    domain: 'Standard English Conventions',
    skill: 'Form, Structure, and Sense',
    difficulty: 'hard',
    stimulus:
      'Neither the lead investigator nor the junior researchers _______ prepared to defend the methodology when the peer reviewers raised objections about the sampling frame; the team had assumed the standard approach would be accepted without detailed justification and had not prepared a systematic rebuttal.',
    question:
      'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { label: 'A', text: 'was' },
      { label: 'B', text: 'are' },
      { label: 'C', text: 'has been' },
      { label: 'D', text: 'were' },
    ],
    correctAnswer: 'D',
    explanation:
      'With a "neither...nor" construction, the verb agrees with the subject closest to the verb — the "proximity rule." The subject closest to the verb is "the junior researchers," which is plural. Therefore, the verb must be plural: "were." The sentence also describes a completed past event (the peer review exchange), so a simple past tense ("were") is appropriate.',
    wrongAnswerExplanations: {
      A: '"Was" is singular past tense. Under the proximity rule, the verb must agree with "the junior researchers" (plural), making "was" incorrect regardless of tense.',
      B: '"Are" is plural present tense, which correctly agrees with the plural nearest subject but uses the wrong tense. The sentence describes a past event and uses past tense throughout ("raised," "had assumed," "had not prepared"), so a present tense verb is inconsistent.',
      C: '"Has been" is singular perfect tense. It fails on both counts: it is singular (should be plural under proximity rule) and uses a present-perfect form inconsistent with the simple past narrative context.',
    },
  },

  // ─── Q18 (B) ── Expression of Ideas ── Transitions ── hard ──────────────────

  {
    id: 'sat-f9-v2-rw-m2h-q18',
    section: 'reading-writing',
    moduleId: 'f9v2-rw-module-2-hard',
    domain: 'Expression of Ideas',
    skill: 'Transitions',
    difficulty: 'hard',
    stimulus:
      'Proponents of randomized controlled trials (RCTs) in social policy argue that RCTs provide the most reliable evidence of causal impact because random assignment eliminates selection bias, ensuring that differences between treatment and control groups reflect the intervention rather than pre-existing differences between participants. _______, the conditions that make RCTs methodologically clean — controlled settings, defined populations, fixed protocols — may also make their findings ungeneralizable to the complex, uncontrolled environments in which social policies are actually implemented.',
    question:
      'Which choice completes the text with the most logical transition?',
    choices: [
      { label: 'A', text: 'Consequently,' },
      { label: 'B', text: 'Paradoxically,' },
      { label: 'C', text: 'Similarly,' },
      { label: 'D', text: 'In other words,' },
    ],
    correctAnswer: 'B',
    explanation:
      '"Paradoxically" signals that the second sentence presents a situation that seems contradictory or ironic given the first. The paradox here is precise: the very conditions that make RCTs methodologically rigorous (controlled settings, fixed protocols) are the same conditions that make their results ungeneralizable to real-world implementation. The strength that validates internal validity simultaneously undermines external validity — a genuine paradox rather than a simple contrast or consequence.',
    wrongAnswerExplanations: {
      A: '"Consequently" signals a causal result. The second sentence does not follow as a consequence of the first; rather, it introduces a tension within the same methodology. Saying that RCT rigor consequently undermines generalizability conflates identifying a logical tension with describing a causal sequence.',
      C: '"Similarly" signals that the second sentence adds a parallel or analogous point. But the second sentence introduces a qualifying complication, not an analogous claim; it qualifies the strength described in the first sentence rather than adding to it.',
      D: '"In other words" signals a restatement or clarification of the preceding sentence in simpler terms. The second sentence introduces a new, complicating consideration — the generalizability problem — not a rephrasing of the first sentence\'s point about RCT validity.',
    },
  },

  // ─── Q19 (A) ── Craft and Structure ── Words in Context ── hard ───────────────

  {
    id: 'sat-f9-v2-rw-m2h-q19',
    section: 'reading-writing',
    moduleId: 'f9v2-rw-module-2-hard',
    domain: 'Craft and Structure',
    skill: 'Words in Context',
    difficulty: 'hard',
    stimulus:
      'The diplomat\'s account of the summit negotiations was striking for its _______ quality: rather than offering the confident interpretive narrative typical of diplomatic memoir, the book preserved the indeterminacy of events as they unfolded, recording what participants said without adjudicating what they meant, and cataloguing decisions without explaining the intentions or pressures that drove them, leaving readers with the unsettling sense of contingency that the participants themselves had experienced in real time.',
    question:
      'Which choice completes the text with the most logical and precise word or phrase?',
    choices: [
      { label: 'A', text: 'phenomenological' },
      { label: 'B', text: 'anecdotal' },
      { label: 'C', text: 'impressionistic' },
      { label: 'D', text: 'equivocal' },
    ],
    correctAnswer: 'A',
    explanation:
      '"Phenomenological" in its literary and philosophical sense describes an approach that records experience as it presents itself to consciousness — the things themselves as encountered, without imposing interpretive frameworks or causal explanations. The diplomat\'s book, as described, preserves events as they appeared in real time, records what was said without adjudicating meaning, and catalogues decisions without explaining them — exactly a phenomenological quality: attention to the structure of lived experience without theoretical reduction.',
    wrongAnswerExplanations: {
      B: '"Anecdotal" means based on informal accounts or isolated stories rather than systematic evidence. The passage does not suggest the book is informal, unrepresentative, or methodologically weak; it describes a deliberate narrative stance of non-interpretation, which is different from anecdotal reporting.',
      C: '"Impressionistic" means based on personal subjective impressions rather than systematic analysis. While this captures something of the book\'s resistance to definitive interpretation, it implies personal subjectivity rather than the careful recording of events-as-experienced that the passage emphasizes. The diplomat records what happened, not personal impressions of it.',
      D: '"Equivocal" means ambiguous or open to more than one interpretation. This describes a quality of language or evidence, not a narrative stance or methodology. The passage describes how the book was written (without adjudicating meaning), not a quality of the book\'s own language.',
    },
  },

  // ─── Q20 (C) ── Craft and Structure ── Text Structure and Purpose ── hard ─────

  {
    id: 'sat-f9-v2-rw-m2h-q20',
    section: 'reading-writing',
    moduleId: 'f9v2-rw-module-2-hard',
    domain: 'Craft and Structure',
    skill: 'Text Structure and Purpose',
    difficulty: 'hard',
    stimulus:
      'Critics who dismiss minimalist fiction as emotionally thin miss the logic of its aesthetics. The minimalist mode, as practiced by writers such as Raymond Carver and Amy Hempel, operates on the principle of strategic omission: what is withheld from the surface of a text exerts pressure from beneath, generating emotional intensity precisely because the reader must perform the inferential labor that the text declines to perform on their behalf. A character who says "fine" in response to a devastating piece of news is not emotionally inert — the gap between the word and the situation creates a charge that more explicit emotional narration would discharge rather than sustain. Minimalism, understood correctly, is not the absence of feeling but a technique for pressurizing it.',
    question:
      'The primary purpose of this passage is to',
    choices: [
      { label: 'A', text: 'survey the historical development of minimalist fiction from its origins to its contemporary practitioners.' },
      { label: 'B', text: 'compare the emotional strategies of minimalist and maximalist fiction to demonstrate that neither approach is universally superior.' },
      { label: 'C', text: 'defend minimalist fiction against a common misreading by explaining the aesthetic principle that makes its emotional restraint function as intensity.' },
      { label: 'D', text: 'argue that readers who find minimalist fiction emotionally thin lack the inferential sophistication required to engage with literary art.' },
    ],
    correctAnswer: 'C',
    explanation:
      'The passage opens by identifying a specific critical dismissal (minimalism as emotionally thin), then provides a counter-argument explaining how the technique of strategic omission generates emotional intensity rather than absence. The purpose is to defend minimalism against that misreading by explaining the mechanism through which its restraint works. The concluding sentence makes this explicit: "Minimalism... is not the absence of feeling but a technique for pressurizing it."',
    wrongAnswerExplanations: {
      A: 'The passage does not trace historical development; it names two practitioners (Carver and Hempel) only as examples, not as part of a historical survey.',
      B: 'The passage does not compare minimalism to maximalism or evaluate both approaches. It exclusively addresses minimalism, arguing in its defense, without constructing a comparison.',
      D: 'The passage does not characterize readers who misread minimalism as unsophisticated. It addresses critics who dismiss the mode and explains why they are wrong, but it does so by analyzing the aesthetic technique, not by attacking the intelligence or sophistication of those critics.',
    },
  },

  // ─── Q21 (D) ── Information and Ideas ── Command of Evidence (Textual) ── hard

  {
    id: 'sat-f9-v2-rw-m2h-q21',
    section: 'reading-writing',
    moduleId: 'f9v2-rw-module-2-hard',
    domain: 'Information and Ideas',
    skill: 'Command of Evidence',
    difficulty: 'hard',
    stimulus:
      'Sociologist Elijah Anderson has argued that in certain urban neighborhoods, young men adopt what he calls a "code of the street" — a set of informal rules governing interpersonal conduct that prizes toughness, reputational assertion, and the willingness to use violence in response to perceived disrespect. Anderson is careful to note, however, that most residents of these neighborhoods, including most young men, do not personally subscribe to the code; rather, they are compelled to demonstrate literacy in it — to perform credible familiarity with the code\'s norms — because failure to do so invites victimization by those who do. The distinction between sincere adherents and performative compliance is, Anderson argues, crucial to any accurate understanding of the code\'s social dynamics.',
    question:
      'Which quotation from a sociological study would most directly undermine Anderson\'s distinction between sincere adherents and performative compliers?',
    choices: [
      {
        label: 'A',
        text: '"Young men in high-violence neighborhoods who demonstrate familiarity with street codes are significantly less likely to be victimized than those who appear unfamiliar with the norms."',
      },
      {
        label: 'B',
        text: '"Residents of neighborhoods where street codes are prevalent report high levels of stress from navigating the gap between their private values and their public performances."',
      },
      {
        label: 'C',
        text: '"The code of the street has been documented in neighborhoods across multiple cities and appears robust to demographic differences in race, ethnicity, and socioeconomic background."',
      },
      {
        label: 'D',
        text: '"Longitudinal tracking of young men who initially described themselves as performative compliers found that the majority had adopted the code\'s values sincerely within five years, suggesting that sustained performance reshapes underlying belief."',
      },
    ],
    correctAnswer: 'D',
    explanation:
      'Anderson\'s distinction between sincere adherents and performative compliers depends on the claim that most young men genuinely do not subscribe to the code\'s values but perform familiarity as a survival strategy. Choice D undermines this directly: if sustained performance of the code tends to reshape underlying belief, then the distinction between performing and believing collapses over time, making the sincere/performative division Anderson draws less analytically stable than he claims.',
    wrongAnswerExplanations: {
      A: 'This finding would actually support Anderson\'s account by confirming the instrumental rationality of performing code literacy: it reduces victimization, which is precisely the survival logic Anderson describes. It does not undermine the sincere/performative distinction.',
      B: 'Reported stress from navigating the gap between private values and public performance supports Anderson\'s distinction by confirming that the two can diverge and that people experience this divergence. This is consistent with Anderson\'s account, not a challenge to it.',
      C: 'The demographic robustness of the code describes its prevalence; it says nothing about the proportion of sincere adherents vs. performative compliers and does not challenge the distinction between them.',
    },
  },

  // ─── Q22 (B) ── Information and Ideas ── Inferences ── hard ──────────────────

  {
    id: 'sat-f9-v2-rw-m2h-q22',
    section: 'reading-writing',
    moduleId: 'f9v2-rw-module-2-hard',
    domain: 'Information and Ideas',
    skill: 'Inferences',
    difficulty: 'hard',
    stimulus:
      'Research on the "audience design" of language — the ways speakers tailor their utterances to particular listeners — has produced a nuanced literature on accommodation and differentiation. When speakers perceive their interlocutor as a member of an in-group, they tend to accommodate toward that interlocutor\'s speech features: adopting similar rates, rhythms, lexical choices, and even accents. When speakers perceive their interlocutor as an out-group member — especially one whose status is ambiguous or threatening — they often differentiate, accentuating features that mark their own group identity more emphatically than they would in neutral conditions. Critically, accommodation is typically below the threshold of conscious awareness, while differentiation is more often a strategic, partially deliberate choice.',
    question:
      'Based on the passage, what can most reasonably be inferred about a native speaker of a regional dialect who speaks with an even stronger regional accent when addressing someone perceived as culturally dismissive of that region?',
    choices: [
      {
        label: 'A',
        text: 'The speaker is unconsciously accommodating toward the interlocutor\'s speech patterns because the interlocutor represents a higher-status group.',
      },
      {
        label: 'B',
        text: 'The speaker is engaging in differentiation — a partially deliberate strategy for marking in-group identity more emphatically in response to a perceived out-group member who may be construed as threatening or status-ambiguous.',
      },
      {
        label: 'C',
        text: 'The speaker is demonstrating accommodation failure, reverting to baseline dialect features because the accommodation process has broken down in the presence of an unsympathetic interlocutor.',
      },
      {
        label: 'D',
        text: 'The speaker is performing a form of unconscious convergence, assimilating toward speech patterns associated with cultural authenticity rather than toward the interlocutor\'s specific speech features.',
      },
    ],
    correctAnswer: 'B',
    explanation:
      'The passage states that when speakers perceive an interlocutor as an out-group member, "especially one whose status is ambiguous or threatening," they "differentiate, accentuating features that mark their own group identity more emphatically." Someone culturally dismissive of a region would register as an out-group member whose status might be construed as socially superior or threatening. The passage also notes that differentiation is "more often a strategic, partially deliberate choice." Choice B applies both elements of the passage\'s account accurately.',
    wrongAnswerExplanations: {
      A: 'The scenario describes the speaker accentuating their regional features more strongly, which is differentiation, not accommodation. Accommodation involves moving toward the interlocutor\'s speech patterns, not away from them. The passage also specifies that accommodation is typically unconscious, but the speaker here is strengthening, not converging.',
      C: 'The passage does not discuss "accommodation failure" as a mechanism. Accentuating regional features more strongly is not a breakdown of accommodation but a deliberate act of differentiation — a distinct strategy the passage describes separately.',
      D: 'The passage distinguishes accommodation (moving toward the interlocutor\'s features) from differentiation (moving away to accentuate group identity). The speaker is doing the latter. Calling it "convergence" misapplies the terminology; the speaker is diverging from the interlocutor, not converging toward any other target.',
    },
  },

  // ─── Q23 (A) ── Expression of Ideas ── Rhetorical Synthesis ── hard ───────────

  {
    id: 'sat-f9-v2-rw-m2h-q23',
    section: 'reading-writing',
    moduleId: 'f9v2-rw-module-2-hard',
    domain: 'Expression of Ideas',
    skill: 'Rhetorical Synthesis',
    difficulty: 'hard',
    stimulus:
      'A student is writing a research paper on the limitations of GDP as a measure of national well-being. While conducting research, the student recorded the following notes:\n\n- GDP measures the total monetary value of goods and services produced within a country in a given period, regardless of how production affects social or environmental conditions.\n- Hurricane damage generates GDP growth through reconstruction spending; treating illness generates GDP growth through medical expenditure — both increase measured output while representing social harms.\n- GDP assigns no value to unpaid caregiving labor (childcare, elder care) performed primarily by women, despite its substantial contribution to social reproduction.\n- Bhutan\'s Gross National Happiness index incorporates psychological well-being, cultural vitality, environmental sustainability, and governance quality alongside economic output.\n- Studies comparing GDP rankings with rankings on happiness indices, life expectancy, and social trust show only modest correlations for countries above a basic threshold of material sufficiency.',
    question:
      'The student wants to illustrate a specific structural paradox in GDP — that the measure can record social harm as economic gain — using two concrete examples from the notes. Which choice most effectively accomplishes this goal?',
    choices: [
      {
        label: 'A',
        text: 'GDP\'s design produces a fundamental paradox: it treats reconstruction spending after a hurricane and medical expenditure generated by illness as equivalent contributions to national output, meaning that the measure improves precisely when society experiences serious harm.',
      },
      {
        label: 'B',
        text: 'GDP is an incomplete measure of well-being because it ignores unpaid caregiving labor and assigns no value to environmental sustainability, omissions that Bhutan\'s Gross National Happiness index was explicitly designed to correct.',
      },
      {
        label: 'C',
        text: 'Countries with high GDP rankings do not necessarily enjoy high levels of happiness, social trust, or life expectancy — a finding that suggests GDP captures at best a modest portion of what contributes to national well-being.',
      },
      {
        label: 'D',
        text: 'Because GDP measures all economic activity without distinguishing productive from harmful transactions, it cannot serve as a meaningful guide to the policies that improve citizens\' actual quality of life.',
      },
    ],
    correctAnswer: 'A',
    explanation:
      'The goal is to illustrate the specific structural paradox that GDP records social harm as economic gain, using two concrete examples. Choice A identifies and names the paradox explicitly ("fundamental paradox") and deploys both examples from the notes (hurricane reconstruction spending and illness-generated medical expenditure) to illustrate how GDP improves precisely when harm occurs. This is the most targeted and precise match to the stated goal.',
    wrongAnswerExplanations: {
      B: 'This choice draws on the unpaid caregiving and environmental notes, not on the hurricane and illness examples. It addresses omissions from GDP rather than the paradox that harm registers as gain — a related but distinct limitation.',
      C: 'This choice uses the happiness/life expectancy correlation note. While relevant to GDP\'s limitations, it does not illustrate the specific structural paradox through concrete examples from the notes. It makes a statistical claim rather than naming the mechanism.',
      D: 'This choice articulates the structural problem at a general level but does not use either of the two concrete examples (hurricane/illness) from the notes. The goal specifically asks for illustration using concrete examples, which D does not provide.',
    },
  },

  // ─── Q24 (C) ── Craft and Structure ── Words in Context ── hard ───────────────

  {
    id: 'sat-f9-v2-rw-m2h-q24',
    section: 'reading-writing',
    moduleId: 'f9v2-rw-module-2-hard',
    domain: 'Craft and Structure',
    skill: 'Words in Context',
    difficulty: 'hard',
    stimulus:
      'Legal scholars have debated whether constitutional interpretation should be _______ or evolutionary: originalists insist that a constitution\'s meaning was fixed at ratification by the public understanding of the ratifying generation, while living constitutionalists argue that constitutional provisions must be read in light of evolving societal values and conditions that the founders could not have anticipated — a dispute whose resolution has profound implications for how courts treat questions of personal liberty, federal power, and equal protection.',
    question:
      'Which choice completes the text with the most logical and precise word or phrase?',
    choices: [
      { label: 'A', text: 'textual' },
      { label: 'B', text: 'strict' },
      { label: 'C', text: 'originalist' },
      { label: 'D', text: 'conservative' },
    ],
    correctAnswer: 'C',
    explanation:
      'The passage sets up a binary debate between two named interpretive philosophies: the blank identifies the first position, and "evolutionary" (living constitutionalism) identifies the second. The subsequent sentences define the first position as the view that meaning was fixed at ratification by the ratifying generation\'s understanding — the precise definition of originalism. "Originalist" is both the standard label for this position and the term that makes the binary construction coherent, since "originalist or evolutionary" directly names the two schools the passage then elaborates.',
    wrongAnswerExplanations: {
      A: '"Textual" means focused on the text itself, but in constitutional debate, textualism is a distinct methodology from originalism. A textualist reads the text\'s plain meaning; an originalist reads it according to the ratifying generation\'s understanding. The passage defines the first position as the latter, so "textual" is the wrong label even if related.',
      B: '"Strict" as in "strict constructionism" is a colloquial term sometimes used interchangeably with originalism but is not the precise technical label for the position defined in the passage — that meaning was fixed by the ratifying generation\'s public understanding. "Strict" also lacks a clear antonym in "evolutionary" the way "originalist" does.',
      D: '"Conservative" is a political rather than a legal-interpretive term. Constitutional originalists may be politically conservative, but the passage uses legal-interpretive vocabulary throughout, and "conservative or evolutionary" would be an incoherent binary that mixes political with legal categories.',
    },
  },

  // ─── Q25 (B) ── Craft and Structure ── Cross-Text Connections ── hard ─────────

  {
    id: 'sat-f9-v2-rw-m2h-q25',
    section: 'reading-writing',
    moduleId: 'f9v2-rw-module-2-hard',
    domain: 'Craft and Structure',
    skill: 'Cross-Text Connections',
    difficulty: 'hard',
    stimulus:
      'Text 1\nThe case for algorithmic decision-making in criminal sentencing rests on the claim that actuarial risk scores are more consistent and less susceptible to the idiosyncratic biases of individual judges. Human judges have been shown to vary their sentencing decisions based on time of day, case sequencing, and extra-legal factors including the defendant\'s race and socioeconomic presentation. A calibrated algorithm, applied uniformly, eliminates these sources of arbitrary variation and produces more predictable, legally defensible outcomes across a caseload.\n\nText 2\nAlgorithmic risk-assessment tools trained on historical criminal justice data will inevitably replicate the systemic disparities embedded in that data. If past arrest rates, conviction rates, and recidivism measurements reflect racially biased policing and prosecution patterns — as extensive scholarship has demonstrated — then a tool trained to predict future behavior from these inputs will encode and perpetuate those biases at scale, laundering historical discrimination as statistical objectivity. The problem with algorithmic sentencing is not that it introduces bias but that it institutionalizes bias while claiming to have eliminated it.',
    question:
      'The author of Text 2 would most likely respond to the argument in Text 1 by claiming that',
    choices: [
      {
        label: 'A',
        text: 'the inconsistency of human sentencing is a more serious problem than algorithmic bias because variability at least allows for case-by-case leniency, whereas algorithms enforce rigidity uniformly.',
      },
      {
        label: 'B',
        text: 'the consistency that Text 1 cites as a virtue of algorithmic sentencing becomes a serious defect if the algorithm consistently perpetuates the racial and socioeconomic disparities embedded in its training data.',
      },
      {
        label: 'C',
        text: 'algorithmic risk scores are impossible to calibrate accurately because criminal behavior is too complex and context-dependent to be captured by actuarial models.',
      },
      {
        label: 'D',
        text: 'individual judges should be replaced not by algorithms but by diverse panels of judges whose aggregate decisions would reflect a wider range of perspectives and thereby reduce idiosyncratic bias.',
      },
    ],
    correctAnswer: 'B',
    explanation:
      'Text 2\'s central argument is that the consistency praised in Text 1 is precisely the problem: an algorithm consistently perpetuates historical biases at scale, "laundering historical discrimination as statistical objectivity." The author of Text 2 directly targets the consistency-as-virtue claim and reframes it as a defect. Choice B captures this exact argumentative move: redeploying Text 1\'s premise (consistency) and showing why, given biased training data, that same consistency becomes the mechanism of harm.',
    wrongAnswerExplanations: {
      A: 'Text 2 does not defend human inconsistency or argue for case-by-case leniency. Its objection to algorithmic sentencing is not that humans are preferable because they can be inconsistent; it is that algorithms institutionalize historical bias. Text 2 does not rehabilitate human inconsistency.',
      C: 'Text 2 does not argue that algorithmic models are inherently inaccurate because behavior is too complex. It argues that accuracy is beside the point if the training data itself reflects biased patterns. The objection is about the data source, not about the model\'s technical capacity.',
      D: 'Text 2 makes no proposal for how to reform sentencing practices. It critiques algorithmic tools without endorsing a specific alternative. Proposing diverse panels goes beyond anything Text 2 asserts.',
    },
  },

  // ─── Q26 (D) ── Standard English Conventions ── Boundaries ── hard ──────────

  {
    id: 'sat-f9-v2-rw-m2h-q26',
    section: 'reading-writing',
    moduleId: 'f9v2-rw-module-2-hard',
    domain: 'Standard English Conventions',
    skill: 'Boundaries',
    difficulty: 'hard',
    stimulus:
      'The restoration project faced a challenge no one had fully anticipated _______ the original blueprints had been water-damaged and were partially illegible, the contractor had retired and could not be located, and the building\'s interior walls concealed structural modifications that no permit record documented.',
    question:
      'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { label: 'A', text: ': however,' },
      { label: 'B', text: ', specifically' },
      { label: 'C', text: '; moreover,' },
      { label: 'D', text: ': the original blueprints' },
    ],
    correctAnswer: 'D',
    explanation:
      'The sentence says "a challenge no one had fully anticipated" and then needs to enumerate what that challenge consisted of. A colon is the correct punctuation to introduce a list or elaboration that explains or specifies the noun just mentioned. "The original blueprints had been water-damaged..." begins the first of three items in the explanation. Choice D provides the colon followed by the first item, creating a grammatically complete and conventionally correct sentence.',
    wrongAnswerExplanations: {
      A: '": however," introduces the elaboration with a contrast marker. "However" implies the content that follows is contrary to what preceded it, but the list of challenges is not contrasting with the anticipated challenge — it is the content of that challenge. The colon is correct here but "however" is logically wrong.',
      B: '", specifically" uses a comma, which is insufficient to attach an independent clause. The material following the blank includes independent clauses ("the original blueprints had been water-damaged"), so a comma before the elaborating content creates a comma splice.',
      C: '"; moreover," signals that the second part adds another point supporting or compounding the first. A semicolon here would separate the first independent clause ("The restoration project faced a challenge no one had fully anticipated") from what follows, but "moreover" implies the following is an additional, separate claim — not the specification of what the challenge was. The colon in D is the correct punctuation for introducing an explanatory elaboration of a noun.',
    },
  },

  // ─── Q27 (A) ── Standard English Conventions ── Form, Structure, and Sense ── hard

  {
    id: 'sat-f9-v2-rw-m2h-q27',
    section: 'reading-writing',
    moduleId: 'f9v2-rw-module-2-hard',
    domain: 'Standard English Conventions',
    skill: 'Form, Structure, and Sense',
    difficulty: 'hard',
    stimulus:
      'The panel of economists, along with the independent auditors who had reviewed the financial disclosures, _______ that the proposed merger would substantially reduce competition in at least three regional markets and recommended that the regulatory commission impose structural remedies before granting approval.',
    question:
      'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { label: 'A', text: 'concluded' },
      { label: 'B', text: 'conclude' },
      { label: 'C', text: 'have concluded' },
      { label: 'D', text: 'were concluding' },
    ],
    correctAnswer: 'A',
    explanation:
      'The grammatical subject is "the panel of economists," a singular collective noun. The phrase "along with the independent auditors who had reviewed the financial disclosures" is a parenthetical modifier introduced by "along with," which does not alter the number of the subject — it remains singular ("the panel"). The sentence describes a completed action in a past-tense narrative ("had reviewed," "recommended"), so the verb must be singular simple past: "concluded."',
    wrongAnswerExplanations: {
      B: '"Conclude" is present tense, inconsistent with the past-tense context established by "had reviewed" and "recommended." Additionally, "conclude" is plural present, which fails to agree with the singular subject "the panel."',
      C: '"Have concluded" is present perfect tense, which implies the action has present relevance or ongoing connection to the present. The sentence describes a completed deliberation in a past-narrative context; simple past ("concluded") is the appropriate tense to match "recommended" and the pluperfect "had reviewed."',
      D: '"Were concluding" is plural past progressive. It fails on number (the panel is singular) and on aspect: the progressive implies ongoing, incomplete action at a past moment, whereas the sentence describes a completed conclusion that produced a recommendation.',
    },
  },
]
