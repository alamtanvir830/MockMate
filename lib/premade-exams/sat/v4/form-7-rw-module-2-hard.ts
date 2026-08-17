import type { RWQuestion } from '../types'

export const f7RwModule2HardQuestionsV4: RWQuestion[] = [
  // ─── GROUP 1: Craft and Structure ─────────────────────────────────────────────

  // ─── q01 | medium | Craft and Structure — Words in Context | correctAnswer: B ───
  {
    id: 'sat-f7-v4-rw-m2h-q01',
    section: 'reading-writing',
    moduleId: 'f7v4-rw-module-2-hard',
    domain: 'Craft and Structure',
    skill: 'Words in Context',
    difficulty: 'medium',
    stimulus:
      'The forensic accountant\'s report was notable for its _______ examination of the company\'s financial records: rather than offering sweeping generalizations, it traced each discrepancy to a specific transaction, named the accounts involved, and quantified the resulting losses to the dollar.',
    question:
      'Which choice completes the text with the most logical and precise word or phrase?',
    choices: [
      { label: 'A', text: 'cursory' },
      { label: 'B', text: 'granular' },
      { label: 'C', text: 'speculative' },
      { label: 'D', text: 'impartial' },
    ],
    correctAnswer: 'B',
    explanation:
      '"Granular" means detailed and specific, operating at the level of fine individual units. The passage contrasts the report\'s approach with "sweeping generalizations," and the description — tracing each discrepancy to a specific transaction, naming accounts, quantifying losses to the dollar — is the definition of granular analysis.',
    wrongAnswerExplanations: {
      A: '"Cursory" means hasty and superficial — the opposite of what the passage describes. The report\'s depth in tracing individual transactions rules out a cursory examination.',
      C: '"Speculative" means based on conjecture rather than evidence. The passage emphasizes hard figures and specific accounts, conveying certainty, not speculation.',
      D: '"Impartial" describes freedom from bias, not a level of detail. While an accountant\'s report might be impartial, that quality is not what the passage\'s contrast with "generalizations" is drawing attention to.',
    },
  },

  // ─── q02 | medium | Craft and Structure — Words in Context | correctAnswer: D ───
  // IMPROVED: distractor C changed from "supplant" to "reconcile" — more tempting
  // because the compromise did move the project forward, suggesting some resolution,
  // but "reconcile" implies fuller satisfaction than the passage supports.
  {
    id: 'sat-f7-v4-rw-m2h-q02',
    section: 'reading-writing',
    moduleId: 'f7v4-rw-module-2-hard',
    domain: 'Craft and Structure',
    skill: 'Words in Context',
    difficulty: 'medium',
    stimulus:
      'Although the committee\'s early meetings were contentious, the chair managed to _______ the opposing factions by proposing a compromise that acknowledged each group\'s core concern without fully satisfying any of them — a solution that disappointed everyone equally and, in doing so, moved the project forward.',
    question:
      'Which choice completes the text with the most logical and precise word or phrase?',
    choices: [
      { label: 'A', text: 'alienate' },
      { label: 'B', text: 'galvanize' },
      { label: 'C', text: 'reconcile' },
      { label: 'D', text: 'mollify' },
    ],
    correctAnswer: 'D',
    explanation:
      '"Mollify" means to appease or soothe someone who is angry or upset. The chair\'s compromise — acknowledging each faction\'s concern and reducing hostility enough to proceed — is an act of mollification. The phrase "disappointed everyone equally" signals the factions were only partially calmed, not genuinely satisfied. "Mollify" captures this partial appeasement, whereas "reconcile" would imply a fuller resolution the passage explicitly rules out.',
    wrongAnswerExplanations: {
      A: '"Alienate" means to make someone feel estranged or hostile — the opposite outcome. The passage says the compromise moved the project forward, implying the factions were brought closer, not pushed away.',
      B: '"Galvanize" means to shock or excite into action, often with enthusiasm. The passage describes a disappointment-based compromise, not an inspiring rallying of the factions. "Disappointed everyone equally" rules out the positive energy that galvanize implies.',
      C: '"Reconcile" implies fully resolving a conflict and restoring good relations. The passage explicitly states the solution did not "fully satisfy" anyone — suggesting only partial calming rather than the genuine resolution that reconcile implies.',
    },
  },

  // ─── q03 | medium | Craft and Structure — Words in Context | correctAnswer: B ───
  {
    id: 'sat-f7-v4-rw-m2h-q03',
    section: 'reading-writing',
    moduleId: 'f7v4-rw-module-2-hard',
    domain: 'Craft and Structure',
    skill: 'Words in Context',
    difficulty: 'medium',
    stimulus:
      'The philosopher\'s prose was famously _______ : she resisted easy summaries, returned obsessively to the same concepts from different angles, and often concluded chapters with questions rather than answers, as though the act of inquiry itself mattered more than resolution.',
    question:
      'Which choice completes the text with the most logical and precise word or phrase?',
    choices: [
      { label: 'A', text: 'laconic' },
      { label: 'B', text: 'recursive' },
      { label: 'C', text: 'polemical' },
      { label: 'D', text: 'pellucid' },
    ],
    correctAnswer: 'B',
    explanation:
      '"Recursive" describes a style that loops back on itself, returning repeatedly to the same ideas from new vantage points. The passage explicitly says the philosopher "returned obsessively to the same concepts from different angles," which is a precise definition of recursive prose.',
    wrongAnswerExplanations: {
      A: '"Laconic" means brief and concise. The passage describes a style that resists easy summaries and circles back repeatedly — the opposite of terseness.',
      C: '"Polemical" means controversially argumentative or intended to attack opposing views. The passage focuses on the philosopher\'s method of inquiry and circular structure, not on combativeness.',
      D: '"Pellucid" means transparently clear and easy to understand. The passage describes prose that resists easy summaries and withholds resolution, suggesting difficulty, not clarity.',
    },
  },

  // ─── q04 | medium | Craft and Structure — Words in Context | correctAnswer: B ───
  // IMPROVED: distractor C changed from "meticulous" to "selective" — more tempting
  // because the account does omit things, but "selective" is too neutral for the
  // criticism being leveled.
  {
    id: 'sat-f7-v4-rw-m2h-q04',
    section: 'reading-writing',
    moduleId: 'f7v4-rw-module-2-hard',
    domain: 'Craft and Structure',
    skill: 'Words in Context',
    difficulty: 'medium',
    stimulus:
      'The historian\'s account was widely criticized for its _______ treatment of the colonial administration\'s role in the famine: by attributing mass starvation solely to weather and crop failure, the narrative effectively absolved policymakers of responsibility for export policies and relief restrictions that contemporary records show were deliberately maintained.',
    question:
      'Which choice completes the text with the most logical and precise word or phrase?',
    choices: [
      { label: 'A', text: 'exhaustive' },
      { label: 'B', text: 'exculpatory' },
      { label: 'C', text: 'selective' },
      { label: 'D', text: 'incendiary' },
    ],
    correctAnswer: 'B',
    explanation:
      '"Exculpatory" means tending to clear someone of blame or fault. The passage says the account "absolved policymakers of responsibility" — which is precisely the meaning of exculpatory. The criticism leveled at the historian is that the narrative functions to excuse, rather than indict, colonial administrators.',
    wrongAnswerExplanations: {
      A: '"Exhaustive" means thorough and comprehensive. The passage criticizes the account for leaving things out; an exhaustive account would have included the export and relief-restriction evidence.',
      C: '"Selective" means choosing only certain elements — which is technically true of the historian\'s account — but it is too neutral a term. The passage points to a specific ethical failure: not merely that things were omitted, but that the omission functions to clear officials of blame. "Exculpatory" names this function with the precision the passage requires.',
      D: '"Incendiary" means likely to cause strong reactions. The passage criticizes the account for absolving rather than inflaming — an incendiary account would implicate, not excuse, the colonial administration.',
    },
  },

  // ─── q05 | medium | Craft and Structure — Text Structure and Purpose | correctAnswer: D ───
  {
    id: 'sat-f7-v4-rw-m2h-q05',
    section: 'reading-writing',
    moduleId: 'f7v4-rw-module-2-hard',
    domain: 'Craft and Structure',
    skill: 'Text Structure and Purpose',
    difficulty: 'medium',
    stimulus:
      'The earliest wearable timepieces — small spring-driven clocks worn as pendants or hat ornaments — were prized as luxury objects and curiosities rather than functional instruments. Their mechanisms were too sensitive to temperature fluctuations and physical shocks to keep reliable time, and their faces were often obscured by ornamental cases. The craftsmanship that made them desirable as status symbols was precisely what made them impractical as timekeepers: the finer the engraving and the more intricate the outer case, the less accessible the dial and the more susceptible the movement to damage from handling. It was not until the late eighteenth century that advances in escapement design and temperature compensation brought pocket watches into genuine service as accurate instruments.',
    question:
      'Which choice best describes the overall structure of the text?',
    choices: [
      {
        label: 'A',
        text: 'It presents a historical claim, provides a counterexample that complicates the claim, and concludes by reaffirming the original claim with modifications.',
      },
      {
        label: 'B',
        text: 'It identifies a technical problem, describes the failed attempts to solve it, and proposes a new approach that might succeed where earlier efforts did not.',
      },
      {
        label: 'C',
        text: 'It introduces a paradox, examines the competing forces that created it, and resolves the paradox by attributing the contradiction to a single overlooked cause.',
      },
      {
        label: 'D',
        text: 'It describes the original function and limitations of early wearable timepieces, explains the inherent tension between their decorative and practical purposes, and notes when technical advances finally made them reliable.',
      },
    ],
    correctAnswer: 'D',
    explanation:
      'The passage opens by describing early watch use as decorative rather than functional, details the mechanical limitations, develops the central tension (the more ornamental, the less functional), and closes by noting that late-eighteenth-century technical advances resolved the reliability problem. Choice D maps accurately onto each structural move in sequence.',
    wrongAnswerExplanations: {
      A: 'The passage does not present a "historical claim" complicated by a counterexample. The decorative-versus-functional tension is present throughout, and there is no reaffirmation with modifications at the end.',
      B: 'The passage does not describe "failed attempts to solve" a technical problem, nor does it propose a new approach. It describes the state of early timekeeping and reports that advances eventually succeeded.',
      C: 'The passage identifies a tension (ornament versus function), but it does not "resolve" the paradox by attributing it to "a single overlooked cause." The tension is treated as an inherent feature of the objects.',
    },
  },

  // ─── q06 | hard | Craft and Structure — Words in Context | correctAnswer: A ───
  {
    id: 'sat-f7-v4-rw-m2h-q06',
    section: 'reading-writing',
    moduleId: 'f7v4-rw-module-2-hard',
    domain: 'Craft and Structure',
    skill: 'Words in Context',
    difficulty: 'hard',
    stimulus:
      'The sociologist\'s framework was admired for its _______ quality: rather than imposing a single interpretive lens, it held multiple, sometimes contradictory, analytical perspectives in productive tension — allowing researchers to use whichever combination of approaches best fit their empirical object without treating any one as definitive.',
    question:
      'Which choice completes the text with the most logical and precise word or phrase?',
    choices: [
      { label: 'A', text: 'pluralistic' },
      { label: 'B', text: 'reductive' },
      { label: 'C', text: 'monolithic' },
      { label: 'D', text: 'prescriptive' },
    ],
    correctAnswer: 'A',
    explanation:
      '"Pluralistic" means accommodating multiple viewpoints or approaches rather than privileging one. The passage describes a framework that holds "multiple, sometimes contradictory, analytical perspectives in productive tension" and allows researchers to choose among them.',
    wrongAnswerExplanations: {
      B: '"Reductive" means oversimplifying complexity to a single explanation — the opposite of what the passage describes.',
      C: '"Monolithic" means uniform and imposing a single structure, which is exactly what the framework avoids.',
      D: '"Prescriptive" means imposing rules about what must be done. The passage emphasizes the framework does not dictate which approach to use ("without treating any one as definitive").',
    },
  },

  // ─── q07 | hard | Craft and Structure — Text Structure and Purpose | correctAnswer: C ───
  {
    id: 'sat-f7-v4-rw-m2h-q07',
    section: 'reading-writing',
    moduleId: 'f7v4-rw-module-2-hard',
    domain: 'Craft and Structure',
    skill: 'Text Structure and Purpose',
    difficulty: 'hard',
    stimulus:
      'When bioethicist Dr. Amara Diallo describes the principle of therapeutic privilege — the practice of withholding distressing medical information from patients on the grounds that disclosure would harm them — she is careful to distinguish between two justifications practitioners offer. The first is empirical: that disclosure will cause measurable psychological harm or impair decision-making. The second is paternalistic: that practitioners are better positioned than patients to decide what information is in a patient\'s best interest to receive. Dr. Diallo argues that the empirical justification, though theoretically defensible, rarely survives scrutiny in practice, while the paternalistic justification is philosophically untenable regardless of empirical evidence. Her aim is not to abolish therapeutic privilege wholesale but to insist that any legitimate invocation of it must rest solely on demonstrable empirical harm — never on the practitioner\'s judgment about what the patient "should" know.',
    question:
      'Which choice best describes the main purpose of the text?',
    choices: [
      {
        label: 'A',
        text: 'To provide a comprehensive history of the therapeutic privilege doctrine and trace how its legal status has evolved across different healthcare systems.',
      },
      {
        label: 'B',
        text: 'To argue that the practice of therapeutic privilege should be immediately abolished because it violates patient autonomy in all circumstances.',
      },
      {
        label: 'C',
        text: 'To outline Dr. Diallo\'s analysis of two distinct justifications for therapeutic privilege and explain her position on which, if any, can be legitimately defended.',
      },
      {
        label: 'D',
        text: 'To compare Dr. Diallo\'s bioethical approach to therapeutic privilege with the approaches taken by other bioethicists who disagree with her conclusions.',
      },
    ],
    correctAnswer: 'C',
    explanation:
      'The passage is structured around Dr. Diallo\'s distinction between two justifications (empirical vs. paternalistic), her assessment of each, and her nuanced conclusion (privilege is permissible, but only on empirical grounds). Choice C accurately captures all three elements.',
    wrongAnswerExplanations: {
      A: 'The passage contains no historical account of therapeutic privilege\'s development or its legal status in different systems.',
      B: 'Dr. Diallo explicitly does not call for abolishing therapeutic privilege "wholesale" — she wants to restrict it to empirically grounded cases.',
      D: 'No other bioethicists are mentioned or compared to Dr. Diallo.',
    },
  },

  // ─── q08 | hard | Craft and Structure — Words in Context | correctAnswer: C ───
  {
    id: 'sat-f7-v4-rw-m2h-q08',
    section: 'reading-writing',
    moduleId: 'f7v4-rw-module-2-hard',
    domain: 'Craft and Structure',
    skill: 'Words in Context',
    difficulty: 'hard',
    stimulus:
      'The novel\'s narrator is _______ in a way that unsettles the reader: she describes the domestic violence she witnesses with clinical detachment, cataloguing details of broken crockery and blood-stained upholstery without affect, as though she were composing an inventory rather than recounting horror. Critics have divided over whether this quality reflects trauma-induced dissociation or a deliberate authorial choice to implicate the reader in the act of witnessing.',
    question:
      'Which choice completes the text with the most logical and precise word or phrase?',
    choices: [
      { label: 'A', text: 'loquacious' },
      { label: 'B', text: 'unreliable' },
      { label: 'C', text: 'affectless' },
      { label: 'D', text: 'hyperbolic' },
    ],
    correctAnswer: 'C',
    explanation:
      '"Affectless" means showing no emotion or emotional response. The passage describes the narrator\'s "clinical detachment" and cataloguing "without affect" — the phrase "without affect" is essentially a restatement of "affectless," confirming the match.',
    wrongAnswerExplanations: {
      A: '"Loquacious" means talkative. The quality that unsettles the reader is the narrator\'s emotional flatness, not her verbosity.',
      B: '"Unreliable" describes a narrator whose account cannot be trusted. The passage says the narrator provides an emotionally flat account — not that her account is distorted or untrustworthy.',
      D: '"Hyperbolic" means exaggerated. The passage describes the opposite: clinical precision rather than amplified horror.',
    },
  },

  // ─── q09 | hard | Craft and Structure — Cross-Text Connections | correctAnswer: D ───
  {
    id: 'sat-f7-v4-rw-m2h-q09',
    section: 'reading-writing',
    moduleId: 'f7v4-rw-module-2-hard',
    domain: 'Craft and Structure',
    skill: 'Cross-Text Connections',
    difficulty: 'hard',
    stimulus:
      'Text 1\nEcologist Dr. Fumiko Tanaka argues that rewilding projects — the reintroduction of large predators to ecosystems from which they have been absent — consistently deliver ecological benefits that outweigh the costs. She points to the reintroduction of wolves to Yellowstone National Park as a paradigmatic success: wolf predation altered elk grazing behavior, allowing riverside vegetation to recover, which stabilized stream banks, reduced erosion, and ultimately changed the physical course of rivers. Dr. Tanaka characterizes such cascading effects — in which one species\' return reorganizes an entire ecosystem — as "trophic cascades," and she argues that the evidence for their reliability is now robust.\n\nText 2\nConservation biologist Dr. Osei Mensah urges caution about generalizing from charismatic rewilding successes. He notes that the Yellowstone wolf case has been subject to methodological critique: some ecologists argue that vegetation recovery along Yellowstone\'s rivers was driven primarily by drought-related fluctuations in elk populations rather than by wolf-induced behavioral changes, and that the causal attribution to wolves is overstated. Dr. Mensah contends that trophic cascades, while real, are highly context-dependent and that policymakers risk costly failures if they treat any single case — however well-documented — as a universal template.',
    question:
      'Based on the texts, how would Dr. Mensah most likely respond to Dr. Tanaka\'s claim that "the evidence for their reliability is now robust"?',
    choices: [
      {
        label: 'A',
        text: 'By agreeing that trophic cascades are reliable but arguing that rewilding projects should focus on non-charismatic species rather than large predators like wolves.',
      },
      {
        label: 'B',
        text: 'By conceding that the Yellowstone case proves trophic cascades are universal and that Dr. Tanaka\'s policy recommendations are therefore sound.',
      },
      {
        label: 'C',
        text: 'By disputing that trophic cascades are a real ecological phenomenon and arguing that all observed ecosystem changes attributed to predator reintroduction are actually caused by climate variation.',
      },
      {
        label: 'D',
        text: 'By challenging both the reliability of the Yellowstone evidence — pointing to methodological critiques of the causal attribution — and the generalizability of the finding, arguing that context-dependence prevents any single case from establishing robust reliability.',
      },
    ],
    correctAnswer: 'D',
    explanation:
      'Dr. Mensah\'s position has two components: he challenges the Yellowstone evidence (methodological critiques suggest drought-driven elk changes, not wolf behavior) and challenges generalizability (trophic cascades are context-dependent; Yellowstone cannot be a universal template). Choice D captures both challenges.',
    wrongAnswerExplanations: {
      A: 'Dr. Mensah does not argue for focusing on non-charismatic species. His objections are about methodology and context-dependence.',
      B: 'Dr. Mensah explicitly argues against treating Yellowstone as a universal template and questions the causal attribution.',
      C: 'Dr. Mensah does not dispute that trophic cascades are real — he explicitly says they are "real." He questions their reliability and context-independence.',
    },
  },

  // ─── GROUP 2: Information and Ideas ───────────────────────────────────────────

  // ─── q10 | medium | Information and Ideas — Central Ideas and Details | correctAnswer: D ───
  {
    id: 'sat-f7-v4-rw-m2h-q10',
    section: 'reading-writing',
    moduleId: 'f7v4-rw-module-2-hard',
    domain: 'Information and Ideas',
    skill: 'Central Ideas and Details',
    difficulty: 'medium',
    stimulus:
      'Lichen — the composite organism formed by a symbiotic partnership between fungi and photosynthetic algae or cyanobacteria — colonizes bare rock surfaces that virtually no other organism can inhabit. The fungal component provides structural shelter and mineral-dissolving acids that release nutrients from rock, while the photosynthetic partner converts sunlight into sugars that feed both partners. This division of metabolic labor allows lichens to persist in extreme cold, desiccation, and ultraviolet radiation that would kill most plants. As pioneer organisms, lichens gradually transform bare rock into rudimentary soil, enabling subsequent waves of plant colonization and setting ecological succession in motion.',
    question: 'Which choice best states the main idea of the text?',
    choices: [
      {
        label: 'A',
        text: 'Lichens are remarkable for their ability to synthesize sugars from sunlight despite lacking the cellular structures found in true plants.',
      },
      {
        label: 'B',
        text: 'The fungal component of lichen is primarily responsible for enabling the organism\'s survival in extreme environments, as it provides both shelter and nutrient-releasing acids.',
      },
      {
        label: 'C',
        text: 'Lichens thrive in harsh environments because their photosynthetic partner produces sugars that the fungal component cannot generate independently.',
      },
      {
        label: 'D',
        text: 'Through a partnership that enables survival in extreme conditions, lichens colonize bare rock and, by initiating soil formation, make those environments accessible to other organisms.',
      },
    ],
    correctAnswer: 'D',
    explanation:
      'The passage has two major threads: (1) how the fungal-algal partnership allows lichens to survive extreme environments, and (2) how lichens create soil and initiate ecological succession. Choice D captures both threads — the partnership enabling survival, and the downstream ecological consequence.',
    wrongAnswerExplanations: {
      A: 'The passage does not describe lichens as lacking cellular structures found in plants; it focuses on the symbiotic partnership and ecological role.',
      B: 'This over-credits the fungal partner, ignores the photosynthetic partner\'s contribution, and omits the ecological succession point.',
      C: 'This describes only one aspect of the symbiosis and omits the structural and acid-producing role of the fungus, as well as soil formation and succession.',
    },
  },

  // ─── q11 | medium | Information and Ideas — Central Ideas and Details | correctAnswer: D ───
  {
    id: 'sat-f7-v4-rw-m2h-q11',
    section: 'reading-writing',
    moduleId: 'f7v4-rw-module-2-hard',
    domain: 'Information and Ideas',
    skill: 'Central Ideas and Details',
    difficulty: 'medium',
    stimulus:
      'Marine biologists studying bioluminescent communication in deep-sea squid have observed that the light-producing chromatophores along the mantle can flash in coordinated patterns lasting between 0.2 and 3.0 seconds. These patterns vary systematically with context: rapid, high-frequency pulses appear during predator-evasion maneuvers, while slower, sustained glows accompany conspecific approach behaviors. Crucially, individual squid appear to adjust pattern frequency in response to the flashing they observe in nearby squid, suggesting that the signaling is not purely reflexive but involves some degree of information integration. Whether this constitutes a rudimentary communication system or an evolved startle-and-escape coordination mechanism remains an open empirical question.',
    question:
      'According to the text, which of the following is true about the chromatophore patterns observed in deep-sea squid?',
    choices: [
      {
        label: 'A',
        text: 'They are produced exclusively during predator-evasion maneuvers, which are the most common behavioral context in the deep-sea environment.',
      },
      {
        label: 'B',
        text: 'They are fixed reflexes triggered by environmental light levels, which is why individual squid cannot adjust them in response to other squid.',
      },
      {
        label: 'C',
        text: 'They have been conclusively shown to constitute a communication system analogous to language, with distinct signals for different social contexts.',
      },
      {
        label: 'D',
        text: 'They vary in pattern depending on behavioral context, and individual squid appear to modify their flashing in response to signals observed from nearby squid.',
      },
    ],
    correctAnswer: 'D',
    explanation:
      'The passage directly supports both parts of choice D: patterns "vary systematically with context" and "individual squid appear to adjust pattern frequency in response to the flashing they observe in nearby squid."',
    wrongAnswerExplanations: {
      A: 'The passage identifies both predator-evasion and conspecific-approach contexts, so "exclusively" during predator evasion contradicts the text.',
      B: 'The passage explicitly says the signaling is "not purely reflexive" and involves "information integration," directly contradicting this claim.',
      C: 'The passage explicitly leaves this question open. Calling it "conclusively shown" and "analogous to language" overstates the passage\'s deliberately uncertain conclusion.',
    },
  },

  // ─── q12 | medium | Information and Ideas — Command of Evidence (Textual) | correctAnswer: A ───
  {
    id: 'sat-f7-v4-rw-m2h-q12',
    section: 'reading-writing',
    moduleId: 'f7v4-rw-module-2-hard',
    domain: 'Information and Ideas',
    skill: 'Command of Evidence',
    difficulty: 'medium',
    stimulus:
      'Historian Nadia Okonkwo argues that the rapid adoption of postal savings banks in sub-Saharan Africa during the 1920s reflected colonial governments\' desire to redirect local savings into metropolitan bond markets rather than to improve financial access for African depositors. She notes that deposit interest rates at these institutions were set well below prevailing informal lending rates, making the banks unattractive to most rural savers. Moreover, withdrawal restrictions effectively prevented depositors from accessing their funds during agricultural crises precisely when liquidity was most needed. Okonkwo concludes that, far from being instruments of financial development, these banks functioned primarily as extraction mechanisms.',
    question:
      'Which quotation from a contemporary colonial administrator\'s report would most directly support Okonkwo\'s argument?',
    choices: [
      {
        label: 'A',
        text: '"The surplus revenues collected through the Savings Bank Fund have been transferred this quarter to the Colonial Stock Account held at the Bank of England, consistent with treasury directives prioritizing metropolitan capital needs."',
      },
      {
        label: 'B',
        text: '"Deposit rates at the postal savings banks have been deliberately set at competitive levels to attract African savers away from unregulated moneylenders who charge usurious rates."',
      },
      {
        label: 'C',
        text: '"The postal savings bank network has expanded to 47 rural branch locations this year, substantially improving access to formal financial services for smallholder farmers."',
      },
      {
        label: 'D',
        text: '"Withdrawal requests have been streamlined this quarter, with most depositors now able to access their funds within three business days of application."',
      },
    ],
    correctAnswer: 'A',
    explanation:
      'Okonkwo\'s central argument is that postal savings banks redirected local savings to metropolitan bond markets. Choice A confirms exactly this: savings transferred to a "Colonial Stock Account held at the Bank of England" pursuant to "directives prioritizing metropolitan capital needs."',
    wrongAnswerExplanations: {
      B: 'This claims rates were set competitively — directly contradicting Okonkwo\'s point about unattractive rates. It would undermine her argument.',
      C: 'Network expansion and improved rural access contradict Okonkwo\'s claim that the banks did not serve African depositors.',
      D: 'Streamlined withdrawals contradict Okonkwo\'s point that withdrawal restrictions prevented access during crises.',
    },
  },

  // ─── q13 | medium | Information and Ideas — Command of Evidence (Quantitative) | correctAnswer: B ───
  // IMPROVED: distractor A strengthened to make regional-difference argument more
  // plausible before the reader notices it supports the wrong conclusion.
  {
    id: 'sat-f7-v4-rw-m2h-q13',
    section: 'reading-writing',
    moduleId: 'f7v4-rw-module-2-hard',
    domain: 'Information and Ideas',
    skill: 'Command of Evidence',
    difficulty: 'medium',
    graphData: {
      type: 'table',
      title: 'Median Household Broadband Adoption by Region and Income Quartile (2024)',
      headers: ['Region', 'Lowest Quartile (%)', 'Second Quartile (%)', 'Third Quartile (%)', 'Highest Quartile (%)'],
      rows: [
        ['Northeast', '54', '71', '86', '95'],
        ['Midwest', '48', '67', '83', '94'],
        ['South', '41', '62', '79', '93'],
        ['West', '58', '74', '89', '96'],
        ['National Average', '50', '69', '84', '95'],
      ],
    },
    stimulus:
      'A policy analyst examining broadband adoption gaps argues that income is a more powerful predictor of household broadband adoption than region. The table shows median household broadband adoption rates by region and income quartile for 2024.',
    question:
      'Which choice best uses data from the table to support the analyst\'s argument?',
    choices: [
      {
        label: 'A',
        text: 'The West region shows higher adoption than the South in all four income quartiles — a consistent 13-to-17 point gap — demonstrating that a household\'s regional location independently shapes its likelihood of having broadband service.',
      },
      {
        label: 'B',
        text: 'In every region, the gap between the lowest and highest income quartiles exceeds 35 percentage points, while the gap between the lowest-adopting region (South) and highest-adopting region (West) within any single quartile never exceeds 17 points — suggesting income predicts adoption more strongly than region does.',
      },
      {
        label: 'C',
        text: 'The South has the lowest adoption rate in both the lowest income quartile (41%) and the highest income quartile (93%), showing that Southern households face uniquely large income-based disparities relative to other regions.',
      },
      {
        label: 'D',
        text: 'National average adoption reaches 95% in the highest income quartile, demonstrating that broadband is effectively universal among high-income households regardless of where they live.',
      },
    ],
    correctAnswer: 'B',
    explanation:
      'The analyst\'s argument is that income predicts adoption more strongly than region. Choice B performs the key comparison: the income gap within any region (35+ points) dwarfs the regional gap within any income level (never more than 17 points). This magnitude difference directly supports income as the stronger predictor.',
    wrongAnswerExplanations: {
      A: 'This choice identifies a consistent regional pattern (West outperforms South by 13–17 points in all quartiles) and uses it to conclude that region independently shapes adoption — the opposite of the analyst\'s argument. Showing a regional difference exists does not mean it is larger or more meaningful than the income difference.',
      C: 'This notes the South\'s positions in two quartiles but then claims "uniquely large" disparities — which requires comparing within-region income gaps across all regions. The South\'s gap (41–93 = 52 pts) is not dramatically larger than the West\'s (58–96 = 38 pts) or Midwest\'s (48–94 = 46 pts). More importantly, this does not address whether income outweighs region as a predictor.',
      D: 'High-income universality is an interesting finding but does not address the comparative logic the analyst\'s argument requires — namely that income\'s predictive power exceeds region\'s.',
    },
  },

  // ─── q14 | medium | Information and Ideas — Inferences | correctAnswer: A ───
  {
    id: 'sat-f7-v4-rw-m2h-q14',
    section: 'reading-writing',
    moduleId: 'f7v4-rw-module-2-hard',
    domain: 'Information and Ideas',
    skill: 'Inferences',
    difficulty: 'medium',
    stimulus:
      'Ethnobotanist Dr. Priya Sundaram has documented that among the Warla communities of coastal Borneo, plants used in healing rituals are never harvested by the practitioner who will use them; instead, a designated third party — typically a younger apprentice — performs the harvest. Dr. Sundaram notes that this practice is accompanied by elaborate verbal protocols in which the harvester acknowledges the plant\'s sacrifice and requests permission before cutting. When she asked practitioners why the healer could not harvest their own plants, multiple individuals responded that proximity of intent would contaminate the plant\'s efficacy.',
    question:
      'Based on the text, what can most reasonably be inferred about the Warla communities\' understanding of healing plants?',
    choices: [
      {
        label: 'A',
        text: 'In Warla healing practice, a plant\'s therapeutic value is understood to be shaped not only by its biological properties but also by the social and intentional circumstances surrounding its collection.',
      },
      {
        label: 'B',
        text: 'Warla practitioners believe that only apprentices possess the ritual knowledge necessary to correctly identify and harvest medicinal plants without damaging them.',
      },
      {
        label: 'C',
        text: 'The verbal protocols accompanying harvest are the most important element of Warla healing rituals, as they establish a reciprocal relationship with the natural world that enhances a plant\'s potency.',
      },
      {
        label: 'D',
        text: 'Warla communities have historically used the apprentice-harvester system to transmit botanical knowledge across generations, making it primarily an educational rather than a ritual institution.',
      },
    ],
    correctAnswer: 'A',
    explanation:
      'The practitioners\' explanation that "proximity of intent would contaminate the plant\'s efficacy" implies efficacy is shaped by social and intentional conditions (who harvests, under what intent) — not purely by biological properties. Choice A captures this inference without overstating what the text supports.',
    wrongAnswerExplanations: {
      B: 'The passage gives no indication that apprentices have superior botanical knowledge. The reason for using apprentices is about separating the healer\'s intent, not the apprentice\'s identification skills.',
      C: 'The passage does not rank elements by importance. The intent-contamination explanation focuses on who harvests, not on what words are spoken.',
      D: 'The passage does not describe the apprentice system as primarily educational. The practitioners\' explanation centers on contamination of intent — a ritual concern.',
    },
  },

  // ─── q15 | hard | Information and Ideas — Command of Evidence (Textual) | correctAnswer: B ───
  {
    id: 'sat-f7-v4-rw-m2h-q15',
    section: 'reading-writing',
    moduleId: 'f7v4-rw-module-2-hard',
    domain: 'Information and Ideas',
    skill: 'Command of Evidence',
    difficulty: 'hard',
    stimulus:
      'Cognitive scientist Dr. Lena Hartmann contends that the persistence of folk psychological concepts — beliefs, desires, intentions — in everyday reasoning is not merely a cultural habit that science will eventually replace but reflects a genuine explanatory advantage: folk psychology predicts and explains human behavior with a precision and economy that current neuroscientific models cannot match. She points out that knowing someone desires a cup of coffee explains and predicts a remarkable range of behaviors — walking to the kitchen, boiling water, tolerating a bitter taste — while a complete description of the corresponding neural states offers no comparable predictive leverage because we cannot yet map neural patterns onto behavioral outputs with sufficient reliability.',
    question:
      'Which finding, if true, would most directly challenge Dr. Hartmann\'s argument?',
    choices: [
      {
        label: 'A',
        text: 'A survey finds that most people prefer folk psychological explanations to neuroscientific ones when describing their own behavior.',
      },
      {
        label: 'B',
        text: 'Researchers develop a neuroscientific model that predicts an individual\'s behavioral choices from brain scan data with accuracy exceeding that of folk psychological descriptions in controlled trials.',
      },
      {
        label: 'C',
        text: 'Philosophers argue that folk psychological concepts are logically inconsistent and cannot be formalized within any rigorous scientific framework.',
      },
      {
        label: 'D',
        text: 'Anthropologists document that folk psychological concepts vary significantly across cultures, suggesting they are not universal cognitive categories.',
      },
    ],
    correctAnswer: 'B',
    explanation:
      'Dr. Hartmann\'s argument rests on the empirical claim that neuroscientific models "currently" cannot match folk psychology\'s predictive precision. If a neuroscientific model were developed that outperformed folk psychology in predicting behavior from brain data, it would directly refute the empirical advantage she attributes to folk psychology.',
    wrongAnswerExplanations: {
      A: 'A preference survey addresses popularity, not predictive superiority. Dr. Hartmann\'s argument is about explanatory efficacy, not what people prefer.',
      C: 'Logical inconsistency would challenge theoretical foundations, not folk psychology\'s practical predictive advantage — which is Dr. Hartmann\'s pragmatic claim.',
      D: 'Cross-cultural variation would challenge universality claims but not local predictive utility. Dr. Hartmann\'s argument is about efficacy within contexts where folk psychology is used.',
    },
  },

  // ─── q16 | hard | Information and Ideas — Inferences | correctAnswer: D ───
  {
    id: 'sat-f7-v4-rw-m2h-q16',
    section: 'reading-writing',
    moduleId: 'f7v4-rw-module-2-hard',
    domain: 'Information and Ideas',
    skill: 'Inferences',
    difficulty: 'hard',
    stimulus:
      'In the late nineteenth century, the municipality of Vienna invested heavily in a gravity-fed aqueduct system that drew water from Alpine springs more than a hundred kilometers away. City engineers rejected proposals to use local river water — which was closer and cheaper to access — citing concerns about contamination from upstream industrial discharge. The Alpine system required tunneling through several mountain passes and constructing elevated viaducts across valleys, demanding engineering resources that smaller Austrian municipalities could not have mobilized. Decades after its completion, epidemiologists credited the Alpine water supply with substantially reducing Vienna\'s typhoid mortality rates relative to Austrian cities that continued drawing from local rivers.',
    question:
      'Based on the text, which conclusion can most reasonably be drawn about the decision to build the Alpine aqueduct?',
    choices: [
      {
        label: 'A',
        text: 'Vienna\'s engineers understood the germ theory of disease and specifically designed the aqueduct to eliminate waterborne pathogens by using filtered water from pristine sources.',
      },
      {
        label: 'B',
        text: 'The cost of constructing the Alpine aqueduct was ultimately lower than the cost of treating the waterborne illnesses that would have resulted from using local river water.',
      },
      {
        label: 'C',
        text: 'The engineers\' preference for Alpine water over local river water was motivated primarily by aesthetic concerns about taste and odor rather than by public health considerations.',
      },
      {
        label: 'D',
        text: 'A decision made primarily on engineering and sanitation grounds — choosing clean, distant water over contaminated local sources — proved to have significant public health consequences that may not have been fully anticipated at the time.',
      },
    ],
    correctAnswer: 'D',
    explanation:
      'Engineers cited contamination concerns but the passage does not say they anticipated the typhoid reduction epidemiologists credited decades later. "Decades after its completion, epidemiologists credited" implies full public health significance was recognized retrospectively. Choice D captures this: a sanitation and engineering decision that turned out to have major health consequences "may not have been fully anticipated."',
    wrongAnswerExplanations: {
      A: 'The passage does not mention germ theory or filtration. Engineers cited industrial contamination concerns, not waterborne pathogen theory. Attributing germ theory knowledge goes beyond what the text supports.',
      B: 'The passage provides no cost comparison. This requires economic data not present in the text.',
      C: 'The passage explicitly states engineers cited contamination concerns — a public health rationale — not aesthetic preferences.',
    },
  },

  // ─── GROUP 3: Standard English Conventions ────────────────────────────────────

  // ─── q17 | medium | Standard English Conventions — Boundaries | correctAnswer: C ───
  {
    id: 'sat-f7-v4-rw-m2h-q17',
    section: 'reading-writing',
    moduleId: 'f7v4-rw-module-2-hard',
    domain: 'Standard English Conventions',
    skill: 'Boundaries',
    difficulty: 'medium',
    stimulus:
      'The linguist\'s central argument — that tonal distinctions in Mandarin are processed by the same neural circuits responsible for musical pitch in non-tonal language speakers — has gained traction in recent years, though several competing models remain under active investigation.',
    question:
      'Which choice best describes the function of the em-dashes in the sentence?',
    choices: [
      {
        label: 'A',
        text: 'They separate two independent clauses that could each stand alone as complete sentences.',
      },
      {
        label: 'B',
        text: 'They enclose a parenthetical aside that contradicts the main clause.',
      },
      {
        label: 'C',
        text: 'They set off an embedded explanatory phrase that elaborates on "central argument" without interrupting the main clause\'s grammatical integrity.',
      },
      {
        label: 'D',
        text: 'They replace a colon that would otherwise introduce a list of the linguist\'s supporting claims.',
      },
    ],
    correctAnswer: 'C',
    explanation:
      'The paired em-dashes enclose a noun clause elaborating on "the central argument." Removing the em-dash phrase leaves a grammatically complete sentence: "The linguist\'s central argument has gained traction." The em-dashes insert an explanatory elaboration while preserving the main clause\'s integrity.',
    wrongAnswerExplanations: {
      A: 'The material between the dashes is a noun clause, not an independent clause. What follows the second dash is the remainder of the same main clause ("has gained traction"), not a new independent clause.',
      B: 'The embedded phrase does not contradict the main clause — it explains what the argument is.',
      D: 'The bracketed material is nestled inside the main clause, not appended after a complete clause. A colon in this position would be grammatically inappropriate.',
    },
  },

  // ─── q18 | hard | Standard English Conventions — Boundaries | correctAnswer: C ───
  {
    id: 'sat-f7-v4-rw-m2h-q18',
    section: 'reading-writing',
    moduleId: 'f7v4-rw-module-2-hard',
    domain: 'Standard English Conventions',
    skill: 'Boundaries',
    difficulty: 'hard',
    stimulus:
      'The committee reviewed four proposed amendments _______ the first two addressed procedural concerns about quorum requirements, the third proposed expanding membership eligibility, and the fourth — the most contentious — called for transferring budget authority from the executive board to a newly created oversight panel.',
    question:
      'Which choice correctly punctuates the sentence?',
    choices: [
      { label: 'A', text: 'amendments, the first two' },
      { label: 'B', text: 'amendments and the first two' },
      { label: 'C', text: 'amendments: the first two' },
      { label: 'D', text: 'amendments; the first two' },
    ],
    correctAnswer: 'C',
    explanation:
      'After "four proposed amendments," the remainder of the sentence enumerates what those amendments contained. A colon correctly introduces this explanatory elaboration — the clause before the colon is a complete independent clause, and the colon signals: here is an account of those amendments.',
    wrongAnswerExplanations: {
      A: 'A comma alone between the independent clause and the enumeration creates a comma splice.',
      B: 'Adding "and" creates a compound structure that loses the elaborative function entirely — it reads as though the committee both reviewed amendments and addressed procedural concerns.',
      D: 'A semicolon connects two independent clauses of roughly equal weight. Here, the second part is an elaboration subordinate to the first, calling for a colon rather than a semicolon.',
    },
  },

  // ─── q19 | hard | Standard English Conventions — Form, Structure, and Sense | correctAnswer: B ───
  {
    id: 'sat-f7-v4-rw-m2h-q19',
    section: 'reading-writing',
    moduleId: 'f7v4-rw-module-2-hard',
    domain: 'Standard English Conventions',
    skill: 'Form, Structure, and Sense',
    difficulty: 'hard',
    stimulus:
      'The board of trustees, along with the three advisory councils that report to it, _______ the proposed merger after a six-month review process during which independent auditors examined the financial records of both institutions.',
    question:
      'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { label: 'A', text: 'have approved' },
      { label: 'B', text: 'has approved' },
      { label: 'C', text: 'were approving' },
      { label: 'D', text: 'are approving' },
    ],
    correctAnswer: 'B',
    explanation:
      '"The board of trustees" is the grammatical subject. "Along with the three advisory councils" is a prepositional phrase, not a second subject joined by "and," so the verb must agree with the singular "board." A collective noun like "board" is singular in standard American English, requiring "has approved." The completed review confirms a present-perfect form over a progressive.',
    wrongAnswerExplanations: {
      A: '"Have approved" uses a plural verb. "Board of trustees" is singular — the advisory councils are attached by "along with," not "and."',
      C: '"Were approving" is past-progressive, suggesting ongoing action at a past point. The sentence implies a completed action.',
      D: '"Are approving" is present-progressive, implying ongoing approval. The past-tense "examined" signals both the review and the approval are completed.',
    },
  },

  // ─── q20 | hard | Standard English Conventions — Boundaries | correctAnswer: B ───
  {
    id: 'sat-f7-v4-rw-m2h-q20',
    section: 'reading-writing',
    moduleId: 'f7v4-rw-module-2-hard',
    domain: 'Standard English Conventions',
    skill: 'Boundaries',
    difficulty: 'hard',
    stimulus:
      'The architect\'s design philosophy can be summarized in a single principle _______ every structural element should serve simultaneously as a load-bearing component, a spatial divider, and a surface available for natural light, so that no part of a building is purely ornamental.',
    question:
      'Which choice correctly punctuates the sentence?',
    choices: [
      { label: 'A', text: 'principle, every structural element' },
      { label: 'B', text: 'principle: every structural element' },
      { label: 'C', text: 'principle; every structural element' },
      { label: 'D', text: 'principle — every structural element' },
    ],
    correctAnswer: 'B',
    explanation:
      'The sentence announces a "single principle" and then states it. This is the paradigmatic use of a colon: a complete independent clause makes a forward-pointing reference, and the colon introduces the content of what was promised.',
    wrongAnswerExplanations: {
      A: 'A comma alone does not signal the elaborative relationship demanded after "can be summarized in a single principle."',
      C: 'A semicolon implies two coordinate independent clauses. "Every structural element should serve…" is the content of the principle — it is what the principle says — not an equally weighted second independent thought.',
      D: 'An em-dash can work informally, but among the given options, the colon is the conventional and more precise choice in formal written English for introducing a forward-pointing reference.',
    },
  },

  // ─── q21 | hard | Standard English Conventions — Form, Structure, and Sense | correctAnswer: A ───
  {
    id: 'sat-f7-v4-rw-m2h-q21',
    section: 'reading-writing',
    moduleId: 'f7v4-rw-module-2-hard',
    domain: 'Standard English Conventions',
    skill: 'Form, Structure, and Sense',
    difficulty: 'hard',
    stimulus:
      'The peer reviewers recommended that the manuscript _______ substantially before resubmission, noting that the theoretical framework in the opening chapter contradicted several empirical claims made in the later sections and that this internal inconsistency undermined the study\'s central argument.',
    question:
      'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { label: 'A', text: 'be revised' },
      { label: 'B', text: 'was revised' },
      { label: 'C', text: 'is revised' },
      { label: 'D', text: 'will be revised' },
    ],
    correctAnswer: 'A',
    explanation:
      'The verb "recommended" triggers the subjunctive mood in the subordinate "that" clause. The subjunctive form for passive constructions is the base form "be" — not the indicative "is," "was," or "will be." This construction ("recommend that [subject] be [past participle]") is required after verbs like recommend, suggest, insist, propose, and demand.',
    wrongAnswerExplanations: {
      B: '"Was revised" uses the indicative past tense. After "recommended that," the subjunctive "be revised" is required, not a past-tense form implying revision already occurred.',
      C: '"Is revised" uses the indicative present tense. The subjunctive requires the base form "be" rather than the conjugated "is."',
      D: '"Will be revised" uses the future indicative. The subjunctive construction does not take a future auxiliary — "be" alone carries the recommended-action meaning.',
    },
  },

  // ─── GROUP 4: Expression of Ideas ────────────────────────────────────────────

  // ─── q22 | medium | Expression of Ideas — Transitions | correctAnswer: A ───
  {
    id: 'sat-f7-v4-rw-m2h-q22',
    section: 'reading-writing',
    moduleId: 'f7v4-rw-module-2-hard',
    domain: 'Expression of Ideas',
    skill: 'Transitions',
    difficulty: 'medium',
    stimulus:
      'Early proponents of vertical farming argued that growing crops in stacked, climate-controlled layers inside urban buildings would eliminate the need for pesticides, reduce water consumption by up to 95 percent compared with conventional agriculture, and dramatically cut transportation costs by placing production near consumers. _______, the first generation of commercial vertical farms has struggled to turn a profit, with energy costs for artificial lighting alone often exceeding the savings generated by reduced transportation and water use.',
    question:
      'Which choice completes the text with the most logical transition?',
    choices: [
      { label: 'A', text: 'In practice, however,' },
      { label: 'B', text: 'As a result,' },
      { label: 'C', text: 'In other words,' },
      { label: 'D', text: 'Similarly,' },
    ],
    correctAnswer: 'A',
    explanation:
      '"In practice, however" accomplishes two things: "in practice" signals the shift from theory to real-world outcomes, and "however" signals the adversative contrast between prediction and result. No other option captures both dimensions.',
    wrongAnswerExplanations: {
      B: '"As a result" signals causation — that the second sentence follows from the first. The financial struggles are a contrast to, not a product of, the optimistic projections.',
      C: '"In other words" signals restatement. The two sentences describe opposite outcomes, so this transition is logically incorrect.',
      D: '"Similarly" signals parallelism. These sentences describe contrasting situations — theoretical success versus practical failure — not analogous ones.',
    },
  },

  // ─── q23 | medium | Expression of Ideas — Rhetorical Synthesis | correctAnswer: A ───
  {
    id: 'sat-f7-v4-rw-m2h-q23',
    section: 'reading-writing',
    moduleId: 'f7v4-rw-module-2-hard',
    domain: 'Expression of Ideas',
    skill: 'Rhetorical Synthesis',
    difficulty: 'medium',
    stimulus:
      'A student is writing a paper on the limitations of self-reported dietary data in nutritional epidemiology. The student has gathered the following notes:\n\n• Participants in dietary recall studies are asked to reconstruct everything they ate over the previous 24 hours, relying entirely on memory.\n• Studies comparing self-reported caloric intake with objectively measured energy expenditure consistently find that participants underreport intake by 20–40%.\n• The degree of underreporting is not random: individuals with higher body-mass index (BMI) tend to underreport more severely than those with lower BMI.\n• Researchers have proposed that underreporting stems from both genuine memory failure and deliberate omission of socially stigmatized foods.\n• Some nutritional studies attempt to correct for underreporting using adjustment formulas, but critics note that these formulas were derived from the same flawed self-report data.',
    question:
      'The student wants to write a sentence that introduces the central problem and explains why correction attempts fall short. Which choice most effectively uses relevant information from the notes?',
    choices: [
      {
        label: 'A',
        text: 'Self-reported dietary data is systematically distorted by both memory failure and deliberate omission, and the statistical formulas designed to correct this distortion are themselves derived from the same unreliable data, leaving the underlying problem unresolved.',
      },
      {
        label: 'B',
        text: 'Because participants underreport caloric intake by 20–40%, nutritional epidemiologists cannot trust dietary recall studies, and they should instead rely exclusively on objective measures of energy expenditure.',
      },
      {
        label: 'C',
        text: 'Dietary recall studies reveal that individuals with higher BMI underreport their food intake more than those with lower BMI, suggesting that social stigma around certain body types influences research participation.',
      },
      {
        label: 'D',
        text: 'Memory limitations make dietary recall an imperfect tool for nutritional research, but researchers have largely addressed this problem by developing adjustment formulas based on objective dietary assessments.',
      },
    ],
    correctAnswer: 'A',
    explanation:
      'Choice A introduces the central problem (distortion from memory failure and deliberate omission, from note 4) and explains why correction attempts fall short (formulas derived from the same flawed data, from note 5). It does not stray into policy recommendations, BMI sub-findings, or misrepresentation.',
    wrongAnswerExplanations: {
      B: 'This makes a prescriptive recommendation (use objective measures exclusively) that does not appear in the notes and goes beyond the task.',
      C: 'This focuses narrowly on the BMI sub-finding and makes an unsupported inference about research participation.',
      D: 'This misrepresents the notes. Note 5 explicitly states the formulas were derived from the same flawed data — they have not "largely addressed" the problem.',
    },
  },

  // ─── q24 | medium | Expression of Ideas — Transitions | correctAnswer: C ───
  {
    id: 'sat-f7-v4-rw-m2h-q24',
    section: 'reading-writing',
    moduleId: 'f7v4-rw-module-2-hard',
    domain: 'Expression of Ideas',
    skill: 'Transitions',
    difficulty: 'medium',
    stimulus:
      'Proponents of ranked-choice voting argue that the system reduces negative campaigning because candidates must appeal to their opponents\' supporters as second-choice votes, creating incentives for civility. _______, several studies of jurisdictions that have adopted ranked-choice voting found no statistically significant reduction in negative advertising compared with jurisdictions using plurality voting.',
    question:
      'Which choice completes the text with the most logical transition?',
    choices: [
      { label: 'A', text: 'Consequently,' },
      { label: 'B', text: 'In addition,' },
      { label: 'C', text: 'Nevertheless,' },
      { label: 'D', text: 'Specifically,' },
    ],
    correctAnswer: 'C',
    explanation:
      '"Nevertheless" signals that the second statement holds despite what the first statement might lead one to expect. The first sentence presents the theoretical case for civility; the second introduces empirical evidence that contradicts that expectation.',
    wrongAnswerExplanations: {
      A: '"Consequently" signals that the second sentence results from the first. The empirical non-finding is a contradiction of the theoretical argument, not a consequence of it.',
      B: '"In addition" signals compatible supplementary information. The two sentences present opposing claims.',
      D: '"Specifically" signals that the second sentence narrows in on a particular instance of the first. The second sentence contradicts the first rather than specifying a subset.',
    },
  },

  // ─── q25 | medium | Expression of Ideas — Transitions | correctAnswer: C ───
  {
    id: 'sat-f7-v4-rw-m2h-q25',
    section: 'reading-writing',
    moduleId: 'f7v4-rw-module-2-hard',
    domain: 'Expression of Ideas',
    skill: 'Transitions',
    difficulty: 'medium',
    stimulus:
      'Researchers studying sleep deprivation in medical residents initially focused on cognitive measures such as reaction time and working memory capacity, finding significant deficits after 24-hour shifts. _______, recent investigations have shifted attention to emotional regulation, demonstrating that sleep-deprived residents show diminished capacity to recognize patients\' emotional cues and respond empathically — a deficit that may be clinically consequential even when cognitive performance remains within acceptable limits.',
    question:
      'Which choice completes the text with the most logical transition?',
    choices: [
      { label: 'A', text: 'Therefore,' },
      { label: 'B', text: 'By contrast,' },
      { label: 'C', text: 'More recently,' },
      { label: 'D', text: 'For example,' },
    ],
    correctAnswer: 'C',
    explanation:
      '"More recently" signals a chronological shift from earlier research on cognitive measures to newer work on emotional regulation. The passage uses "initially" to situate the first body of work in time, and "recent investigations" reinforces the temporal dimension.',
    wrongAnswerExplanations: {
      A: '"Therefore" signals logical consequence. The shift to emotional regulation research does not follow causally from cognitive findings.',
      B: '"By contrast" signals opposition. The emotional regulation findings extend and deepen the picture of deprivation\'s harms — both lines of research point to the same conclusion.',
      D: '"For example" signals a specific instance of the preceding claim. The emotional regulation research is a separate line of inquiry, not an example of cognitive research.',
    },
  },

  // ─── q26 | hard | Expression of Ideas — Transitions | correctAnswer: D ───
  {
    id: 'sat-f7-v4-rw-m2h-q26',
    section: 'reading-writing',
    moduleId: 'f7v4-rw-module-2-hard',
    domain: 'Expression of Ideas',
    skill: 'Transitions',
    difficulty: 'hard',
    stimulus:
      'Classical economic theory holds that workers will always move toward regions offering higher wages, eventually equalizing earnings across geographic areas. Empirical labor economists, _______, have documented persistent regional wage gaps lasting decades even in highly mobile economies like the United States, attributing the persistence partly to the psychological and social costs of relocation that the classical model does not incorporate.',
    question:
      'Which choice completes the text with the most logical transition?',
    choices: [
      { label: 'A', text: 'similarly,' },
      { label: 'B', text: 'as a result,' },
      { label: 'C', text: 'in particular,' },
      { label: 'D', text: 'however,' },
    ],
    correctAnswer: 'D',
    explanation:
      '"However" signals an adversative relationship — the second sentence introduces evidence that challenges the classical theory. Classical theory predicts wage equalization; empirical economists have found persistent gaps.',
    wrongAnswerExplanations: {
      A: '"Similarly" signals parallelism. Empirical economists are contradicting, not echoing, classical theory.',
      B: '"As a result" signals causation. The persistent gaps are real-world observations that challenge the theory\'s predictions, not outcomes caused by the theory.',
      C: '"In particular" signals that the second sentence is a specific instance of the first. The second sentence is a contradiction, not a narrower illustration.',
    },
  },

  // ─── q27 | hard | Expression of Ideas — Rhetorical Synthesis | correctAnswer: A ───
  {
    id: 'sat-f7-v4-rw-m2h-q27',
    section: 'reading-writing',
    moduleId: 'f7v4-rw-module-2-hard',
    domain: 'Expression of Ideas',
    skill: 'Rhetorical Synthesis',
    difficulty: 'hard',
    stimulus:
      'A student is writing a report on why some threatened languages are successfully revitalized while others continue to decline despite organized efforts. The student has gathered the following notes:\n\n• Language revitalization scholars distinguish between symbolic revitalization (restoring a language\'s prestige and cultural visibility) and functional revitalization (restoring its use as a medium for daily communication).\n• Irish has undergone extensive symbolic revitalization — appearing on road signs, being taught in schools, receiving official state language status — but the proportion of Irish speakers who use it as their primary home language has remained below 2% for decades.\n• Hawaiian revitalization efforts have focused on immersive preschool programs (Pūnana Leo) that create child-fluent speakers; the number of daily Hawaiian speakers among people under 18 has grown substantially since the 1980s.\n• Scholars note that language use in the home is the strongest predictor of intergenerational transmission — children acquire the languages their caregivers use in unscripted, everyday interactions, not the languages they study formally.\n• Welsh revitalization has combined both symbolic measures and community-based immersion schooling; Welsh now shows positive trends in both school enrollment and reported home use among younger speakers.',
    question:
      'The student wants to write a sentence that identifies what distinguishes successful language revitalization from unsuccessful efforts, using contrasting examples from the notes. Which choice best accomplishes this goal?',
    choices: [
      {
        label: 'A',
        text: 'Language revitalization efforts that extend beyond symbolic visibility — such as official recognition and school instruction — to create environments where the language is used daily in homes and communities, as Hawaiian and Welsh programs have done, appear more likely to generate the intergenerational transmission that Irish revitalization, despite extensive symbolic efforts, has struggled to achieve.',
      },
      {
        label: 'B',
        text: 'Irish revitalization has failed because the Irish government prioritized road signs and official status over classroom instruction, whereas Welsh succeeded by investing in teacher training programs that produced qualified instructors for immersion schools.',
      },
      {
        label: 'C',
        text: 'The distinction between symbolic and functional revitalization is largely theoretical; in practice, scholars have found that any consistent exposure to a threatened language — whether formal or informal — substantially increases the likelihood of intergenerational transmission.',
      },
      {
        label: 'D',
        text: 'Hawaiian immersion preschools have been the single most effective revitalization strategy ever documented, and their model should be adopted universally by any community seeking to reverse language decline, regardless of local cultural and demographic context.',
      },
    ],
    correctAnswer: 'A',
    explanation:
      'Choice A draws the key distinction (symbolic vs. functional, with home use as the crucial variable), uses Hawaiian and Welsh as examples of successful functional approaches, and contrasts them with Irish. This accurately synthesizes notes 1, 2, 3, 4, and 5 without overstating any claim.',
    wrongAnswerExplanations: {
      B: 'This misrepresents the notes. Irish revitalization did include school instruction (note 2), and the notes say nothing about Welsh teacher training programs.',
      C: 'This contradicts note 4, which specifically states home language use (not any exposure) predicts intergenerational transmission.',
      D: 'This makes a prescriptive universal recommendation that goes well beyond what the notes support.',
    },
  },
]
