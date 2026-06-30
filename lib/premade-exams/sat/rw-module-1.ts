import type { RWQuestion } from './types'

// Reading and Writing Module 1 — 27 questions, mixed difficulty (routing module)

export const rwModule1Questions: RWQuestion[] = [

  // ── Words in Context (5) ────────────────────────────────────────────────────

  {
    id: 'rw1-01',
    section: 'reading-writing',
    moduleId: 'rw-module-1',
    domain: 'Craft and Structure',
    skill: 'Words in Context',
    difficulty: 'easy',
    stimulus: `Bioluminescence is the ability of certain living organisms to produce and emit light through chemical reactions. Found in deep-sea fish, fireflies, and some species of fungi, this phenomenon serves a variety of ecological functions. In marine environments, bioluminescence can be used to attract prey, deter predators, or communicate with potential mates. Scientists have grown increasingly interested in harnessing these natural light-producing mechanisms for biomedical imaging applications.`,
    question: `As used in the passage, "emit" most nearly means`,
    choices: [
      { label: 'A', text: 'absorb' },
      { label: 'B', text: 'release' },
      { label: 'C', text: 'reflect' },
      { label: 'D', text: 'measure' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is correct. "Emit" in this context describes what organisms do with light — they produce it and send it outward. "Release" captures this meaning precisely, as the organisms are giving off light rather than taking it in or bouncing it back.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. "Absorb" means to take in or soak up, which is the opposite of what these organisms do with light.`,
      C: `Choice C is incorrect. "Reflect" means to bounce light back from a surface, but bioluminescent organisms generate their own light rather than reflecting an external source.`,
      D: `Choice D is incorrect. "Measure" refers to quantifying something, which has no connection to producing or releasing light.`,
    },
  },

  {
    id: 'rw1-02',
    section: 'reading-writing',
    moduleId: 'rw-module-1',
    domain: 'Craft and Structure',
    skill: 'Words in Context',
    difficulty: 'easy',
    stimulus: `The Silk Road was not a single road but a network of overland and maritime trade routes connecting East Asia, South Asia, Central Asia, the Middle East, and Europe for over a millennium. Merchants traveling these routes did not merely exchange goods such as silk, spices, and porcelain; they also served as conduits for the diffusion of ideas, religions, and technologies across vast distances. The spread of papermaking from China to the Islamic world and eventually to Europe exemplifies how knowledge traveled alongside trade.`,
    question: `As used in the passage, "conduits" most nearly means`,
    choices: [
      { label: 'A', text: 'containers' },
      { label: 'B', text: 'channels' },
      { label: 'C', text: 'obstacles' },
      { label: 'D', text: 'records' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is correct. In this context, merchants acted as "conduits" for ideas and knowledge, meaning they were the means through which these things passed from one place to another. "Channels" captures this role of being a pathway or medium of transmission.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. "Containers" implies holding something in place, but the passage emphasizes movement and spread across distances.`,
      C: `Choice C is incorrect. "Obstacles" implies blocking or hindering, which is opposite to the merchants' role in facilitating diffusion.`,
      D: `Choice D is incorrect. "Records" refers to documentation, not to means of transmission.`,
    },
  },

  {
    id: 'rw1-03',
    section: 'reading-writing',
    moduleId: 'rw-module-1',
    domain: 'Craft and Structure',
    skill: 'Words in Context',
    difficulty: 'medium',
    stimulus: `In behavioral economics, "anchoring" refers to the cognitive bias in which an individual relies too heavily on the first piece of information encountered when making decisions. Once an anchor is established, subsequent judgments are made by adjusting from that initial figure, often insufficiently. Retailers exploit this tendency by prominently displaying an inflated "original" price next to a discounted one, making the sale price appear more compelling than it might otherwise seem.`,
    question: `As used in the passage, "anchor" most nearly means`,
    choices: [
      { label: 'A', text: 'a heavy object used to moor a vessel' },
      { label: 'B', text: 'a reference point that influences later judgments' },
      { label: 'C', text: 'a feature that provides emotional stability' },
      { label: 'D', text: 'a factual claim that cannot be disputed' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is correct. In the passage, an "anchor" is the initial piece of information that shapes all subsequent decisions. Describing it as a "reference point that influences later judgments" accurately captures this technical usage in behavioral economics.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. This is the common nautical meaning of "anchor," but the passage uses the term in a cognitive and economic context with no reference to vessels.`,
      C: `Choice C is incorrect. While "anchoring" can colloquially suggest stability, the passage specifically describes it as a cognitive bias affecting decision-making, not emotional grounding.`,
      D: `Choice D is incorrect. The passage makes no claim about the anchor being indisputable; in fact, the anchor is often an arbitrary or inflated number.`,
    },
  },

  {
    id: 'rw1-04',
    section: 'reading-writing',
    moduleId: 'rw-module-1',
    domain: 'Craft and Structure',
    skill: 'Words in Context',
    difficulty: 'medium',
    stimulus: `During the late nineteenth century, many American cities undertook ambitious programs of urban renewal that fundamentally reshaped their geographic character. In Chicago, the reconstruction effort following the Great Fire of 1871 accelerated a dramatic vertical expansion, as engineers and architects devised novel structural techniques to support ever-taller buildings. These innovations were not merely pragmatic responses to land scarcity; they expressed a broader cultural conviction that height itself signified progress and modernity.`,
    question: `As used in the passage, "pragmatic" most nearly means`,
    choices: [
      { label: 'A', text: 'idealistic' },
      { label: 'B', text: 'cautious' },
      { label: 'C', text: 'practical' },
      { label: 'D', text: 'controversial' },
    ],
    correctAnswer: 'C',
    explanation: `Choice C is correct. The passage contrasts "pragmatic responses to land scarcity" with broader cultural and symbolic motivations, suggesting that "pragmatic" here means driven by practical necessity rather than idealism or aesthetics. "Practical" best captures this sense.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. "Idealistic" is nearly the opposite of "pragmatic" — the passage explicitly distinguishes the practical motivation from the cultural-expressive one.`,
      B: `Choice B is incorrect. "Cautious" implies hesitancy or conservatism, but the passage presents these innovations as bold and expansive responses to a specific problem.`,
      D: `Choice D is incorrect. The passage does not suggest any controversy surrounding these engineering responses.`,
    },
  },

  {
    id: 'rw1-05',
    section: 'reading-writing',
    moduleId: 'rw-module-1',
    domain: 'Craft and Structure',
    skill: 'Words in Context',
    difficulty: 'hard',
    stimulus: `The anthropologist Clifford Geertz argued that culture should be understood as a "web of significance" that human beings themselves have spun. On this view, the task of ethnography is not to produce lawlike generalizations about human behavior — an aspiration he considered chimerical — but rather to produce "thick descriptions" that illuminate the locally specific meanings embedded in social practices. Critics have questioned whether Geertz's interpretive approach sacrifices explanatory power for the sake of descriptive richness.`,
    question: `As used in the passage, "chimerical" most nearly means`,
    choices: [
      { label: 'A', text: 'imaginative and creative' },
      { label: 'B', text: 'fantastical and unrealizable' },
      { label: 'C', text: 'experimental and provisional' },
      { label: 'D', text: 'complex and interdisciplinary' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is correct. Geertz characterized the pursuit of lawlike generalizations about human behavior as "chimerical," meaning he considered it an impossible fantasy — something appealing in concept but unachievable in reality. "Fantastical and unrealizable" captures this dismissive sense accurately.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. While the word derives from the mythological Chimera (a fantastical creature), "chimerical" in academic usage means illusory or impossible, not creatively imaginative.`,
      C: `Choice C is incorrect. "Experimental and provisional" describes scientific tentativism, which is unrelated to Geertz's critique about the impossibility of universal laws.`,
      D: `Choice D is incorrect. "Complex and interdisciplinary" describes a style of inquiry, not an assessment of feasibility. Geertz was questioning whether the goal could be achieved, not describing its complexity.`,
    },
  },

  // ── Text Structure and Purpose (3) ─────────────────────────────────────────

  {
    id: 'rw1-06',
    section: 'reading-writing',
    moduleId: 'rw-module-1',
    domain: 'Craft and Structure',
    skill: 'Text Structure and Purpose',
    difficulty: 'easy',
    stimulus: `Mangrove forests occupy a narrow band of coastline in tropical and subtropical regions, growing in the brackish water where rivers meet the sea. Their dense, interlocking root systems stabilize shorelines, filter pollutants from the water, and provide nursery habitats for juvenile fish and crustaceans. Despite their ecological importance, mangroves have been cleared at alarming rates to make room for shrimp farms and coastal development. Conservation organizations are now working to restore these critical ecosystems before the damage becomes irreversible.`,
    question: `The primary purpose of the passage is to`,
    choices: [
      { label: 'A', text: 'compare the ecological roles of different coastal habitats' },
      { label: 'B', text: 'describe the characteristics and threatened status of mangrove forests' },
      { label: 'C', text: 'argue that shrimp farming should be banned in coastal areas' },
      { label: 'D', text: 'explain the chemical processes by which mangroves filter pollutants' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is correct. The passage begins by describing what mangroves are and where they grow, explains their ecological functions, notes the threat posed by human activity, and concludes with conservation efforts. Taken together, this is a passage describing mangrove forests and the challenges they face.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. The passage focuses exclusively on mangroves and does not compare them to other coastal habitats such as salt marshes or coral reefs.`,
      C: `Choice C is incorrect. While the passage mentions shrimp farming as a threat, it does not make an explicit argument calling for a ban.`,
      D: `Choice D is incorrect. The passage mentions filtration as one function but does not describe the chemical mechanism behind it.`,
    },
  },

  {
    id: 'rw1-07',
    section: 'reading-writing',
    moduleId: 'rw-module-1',
    domain: 'Craft and Structure',
    skill: 'Text Structure and Purpose',
    difficulty: 'medium',
    stimulus: `Early theories of memory treated the brain as a kind of warehouse in which experiences were stored as stable, discrete units. This model began to collapse in the 1970s and 1980s as psychologists demonstrated that memories are not passively retrieved but actively reconstructed each time they are recalled. The psychologist Elizabeth Loftus showed in a series of influential studies that introducing misleading information after an event could alter subjects' memories of what had occurred — a finding with profound implications for the reliability of eyewitness testimony.`,
    underlineTargets: ['began to collapse'],
    question: `The underlined phrase "began to collapse" primarily serves to`,
    choices: [
      { label: 'A', text: 'introduce a contrast between an earlier view and subsequent evidence' },
      { label: 'B', text: 'describe a literal structural failure in laboratory equipment' },
      { label: 'C', text: 'suggest that researchers abandoned memory studies entirely' },
      { label: 'D', text: 'emphasize the speed at which scientific consensus changes' },
    ],
    correctAnswer: 'A',
    explanation: `Choice A is correct. The phrase "began to collapse" signals a shift from the warehouse model of memory to a newer, reconstruction-based view. It introduces the contrast between what was previously believed and what new experimental evidence revealed.`,
    wrongAnswerExplanations: {
      B: `Choice B is incorrect. The phrase is clearly metaphorical, describing the decline of a theory, not an actual physical structure.`,
      C: `Choice C is incorrect. The passage describes researchers generating new and important findings, not abandoning the field.`,
      D: `Choice D is incorrect. While change is described, the passage does not comment on the speed of that change as significant in itself.`,
    },
  },

  {
    id: 'rw1-08',
    section: 'reading-writing',
    moduleId: 'rw-module-1',
    domain: 'Craft and Structure',
    skill: 'Text Structure and Purpose',
    difficulty: 'hard',
    stimulus: `Some historians have argued that the printing press was the single most transformative technology in the history of Western civilization. Others, however, caution against what they call "technological determinism" — the assumption that a single invention causes sweeping social change independent of the economic, political, and cultural conditions in which it operates. On this view, the printing press accelerated changes that were already underway rather than originating them. Whether as cause or catalyst, the technology unquestionably reshaped how knowledge was produced, disseminated, and challenged.`,
    question: `The passage is primarily organized to`,
    choices: [
      { label: 'A', text: 'present a historical argument and then describe the evidence that disproves it' },
      { label: 'B', text: 'outline competing interpretations of the printing press and then reach a limited consensus' },
      { label: 'C', text: 'trace the chronological development of printing technology in Western Europe' },
      { label: 'D', text: 'defend technological determinism against its critics' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is correct. The passage first presents historians who credit the press as the most transformative technology, then introduces critics of technological determinism who offer a more nuanced view, and concludes by noting that both sides agree the press reshaped knowledge — a limited common ground.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. The passage does not "disprove" the first argument; it offers a different interpretation and then acknowledges an area of agreement.`,
      C: `Choice C is incorrect. The passage is entirely interpretive and historiographical, with no chronological account of printing technology's development.`,
      D: `Choice D is incorrect. The passage presents critics of technological determinism with apparent sympathy and does not argue in its defense.`,
    },
  },

  // ── Cross-Text Connections (2) ─────────────────────────────────────────────

  {
    id: 'rw1-09',
    section: 'reading-writing',
    moduleId: 'rw-module-1',
    domain: 'Craft and Structure',
    skill: 'Cross-Text Connections',
    difficulty: 'medium',
    stimulus: `Text 1: Proponents of urban rewilding argue that reintroducing apex predators to city-adjacent ecosystems can regulate deer populations, reduce overgrazing, and restore vegetation diversity. In the absence of natural predators, deer browse unchecked, suppressing undergrowth and reducing habitat quality for songbirds and smaller mammals. Even the psychological effect of predator presence — what ecologists call "the ecology of fear" — can alter prey behavior in ways that benefit the broader ecosystem.

Text 2: Critics of urban rewilding express concern that the unpredictable movements of large predators pose unacceptable risks to human safety, livestock, and companion animals in areas close to residential zones. They argue that non-lethal management strategies, including fertility control and targeted relocation, can achieve similar ecological benefits without the dangers associated with predator reintroduction. The costs and liabilities of a failed rewilding program, they note, could fall disproportionately on rural communities.`,
    question: `Based on the passages, the authors of Text 1 and Text 2 would most likely agree that`,
    choices: [
      { label: 'A', text: 'reintroducing apex predators to urban areas is too dangerous to attempt' },
      { label: 'B', text: 'deer population management near cities is a legitimate ecological concern' },
      { label: 'C', text: 'the ecology of fear is an unproven concept without scientific support' },
      { label: 'D', text: 'fertility control programs are superior to predator reintroduction' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is correct. Text 1 identifies unchecked deer populations as an ecological problem that rewilding can address. Text 2 does not dispute this problem but argues for alternative management strategies. Both passages implicitly agree that deer population management near cities is a real and important concern.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. This is the view of Text 2's critics, not a shared position. Text 1 clearly advocates for predator reintroduction.`,
      C: `Choice C is incorrect. Text 2 does not challenge the science of the ecology of fear; it raises practical safety concerns about predator presence.`,
      D: `Choice D is incorrect. Text 2 suggests fertility control as a preferable alternative, but Text 1 makes no comparison between strategies.`,
    },
  },

  {
    id: 'rw1-10',
    section: 'reading-writing',
    moduleId: 'rw-module-1',
    domain: 'Craft and Structure',
    skill: 'Cross-Text Connections',
    difficulty: 'hard',
    stimulus: `Text 1: The novelist Zora Neale Hurston, writing in the 1930s, insisted that Black vernacular speech was not a degraded form of Standard American English but a fully expressive, rule-governed linguistic system with its own aesthetic richness. Her fiction drew extensively on the rhythms, idioms, and storytelling conventions of the African American South, a choice that her contemporaries sometimes criticized as pandering to stereotypes rather than advancing racial uplift.

Text 2: Literary critics working in the tradition of sociolinguistics have since validated Hurston's intuitions, demonstrating through empirical research that African American Vernacular English (AAVE) exhibits consistent grammatical rules, complex aspectual distinctions, and a rich oral tradition that standard written English cannot fully represent. They argue that dismissing AAVE as "incorrect" reflects social prejudice, not linguistic analysis.`,
    question: `How would the author of Text 2 most likely respond to the contemporaries mentioned in Text 1 who criticized Hurston?`,
    choices: [
      { label: 'A', text: 'By arguing that their criticism was aesthetically valid even if linguistically misinformed' },
      { label: 'B', text: 'By suggesting their view reflected social bias rather than an accurate assessment of language' },
      { label: 'C', text: 'By defending their concern that vernacular speech should be reserved for oral communication' },
      { label: 'D', text: 'By conceding that Hurston\'s literary choices were strategically unwise for the era' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is correct. Text 2 explicitly argues that dismissing AAVE as "incorrect" reflects "social prejudice, not linguistic analysis." The critics in Text 1 implicitly viewed vernacular speech as inferior, which is precisely the attitude Text 2's author would challenge as rooted in bias rather than linguistic fact.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. Text 2 provides no basis for conceding aesthetic validity to those who dismissed vernacular speech.`,
      C: `Choice C is incorrect. Text 2 defends AAVE as a full linguistic system appropriate for literary expression, not something confined to oral contexts.`,
      D: `Choice D is incorrect. Text 2 supports Hurston's position without qualification and would not endorse the strategic objection raised by her contemporaries.`,
    },
  },

  // ── Central Ideas and Details (3) ─────────────────────────────────────────

  {
    id: 'rw1-11',
    section: 'reading-writing',
    moduleId: 'rw-module-1',
    domain: 'Information and Ideas',
    skill: 'Central Ideas and Details',
    difficulty: 'easy',
    stimulus: `In the mid-twentieth century, researchers discovered that certain sharks possess sensory organs called ampullae of Lorenzini, which detect the weak electrical fields generated by the muscle contractions of nearby prey. These organs, distributed across the shark's snout, allow the animal to locate fish hidden beneath sand or in murky water where vision is limited. The same electroreceptive system also helps sharks detect the Earth's magnetic field, likely assisting in long-distance navigation across open ocean.`,
    question: `Which choice best states the main idea of the passage?`,
    choices: [
      { label: 'A', text: 'Sharks are the most electrically sensitive animals in the ocean.' },
      { label: 'B', text: 'The ampullae of Lorenzini serve both predatory and navigational functions in sharks.' },
      { label: 'C', text: 'Sharks rely primarily on electroreception rather than vision to hunt.' },
      { label: 'D', text: 'Researchers have recently developed tools to measure electrical fields in ocean water.' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is correct. The passage describes the ampullae of Lorenzini, explains their role in detecting prey, and then adds that they also assist with magnetic navigation. The main idea encompasses both of these functions, which the passage presents in sequence.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. The passage does not compare shark electroreception to other marine animals, so no claim about sharks being "most sensitive" is supported.`,
      C: `Choice C is incorrect. The passage says electroreception helps "where vision is limited," implying sharks do use vision; it does not establish a primary reliance on electroreception.`,
      D: `Choice D is incorrect. The passage does not mention any research tools; it describes the biology of the sharks' sensory organs.`,
    },
  },

  {
    id: 'rw1-12',
    section: 'reading-writing',
    moduleId: 'rw-module-1',
    domain: 'Information and Ideas',
    skill: 'Central Ideas and Details',
    difficulty: 'medium',
    stimulus: `The concept of "collective memory" — the shared recollections of a social group — was first developed systematically by the sociologist Maurice Halbwachs in the early twentieth century. Halbwachs argued that individual memories are always shaped by the social frameworks within which people live, meaning that even seemingly personal recollections are filtered through collective categories such as language, culture, and group identity. His work challenged the Cartesian assumption that memory is a purely private, internal phenomenon and suggested instead that remembering is an inherently social act.`,
    question: `According to the passage, Halbwachs's contribution to the study of memory was to`,
    choices: [
      { label: 'A', text: 'demonstrate that individuals within a group remember events identically' },
      { label: 'B', text: 'argue that personal memory is shaped by social contexts rather than being purely private' },
      { label: 'C', text: 'develop experimental methods to measure the accuracy of group recollections' },
      { label: 'D', text: 'show that language is the only meaningful influence on individual memory' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is correct. The passage states that Halbwachs argued "individual memories are always shaped by the social frameworks within which people live" and that he "challenged the Cartesian assumption that memory is a purely private, internal phenomenon." This is accurately summarized by choice B.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. The passage says memories are shaped by collective frameworks, not that they become identical across individuals.`,
      C: `Choice C is incorrect. The passage does not describe Halbwachs developing any experimental methods; his contribution was theoretical.`,
      D: `Choice D is incorrect. The passage mentions language as one of several social frameworks (alongside culture and group identity), not as the sole influence.`,
    },
  },

  {
    id: 'rw1-13',
    section: 'reading-writing',
    moduleId: 'rw-module-1',
    domain: 'Information and Ideas',
    skill: 'Central Ideas and Details',
    difficulty: 'hard',
    stimulus: `The relationship between sleep and memory consolidation has become one of the most productive areas of neuroscience research. During slow-wave sleep, the hippocampus replays patterns of neural activity that occurred during waking experience, effectively "transferring" information to the neocortex for long-term storage. During rapid eye movement (REM) sleep, the brain seems to integrate newly encoded memories with existing knowledge structures, possibly explaining the associative and often bizarre quality of dreams. Disrupting either phase of sleep impairs subsequent recall, suggesting that both contribute distinctly to the consolidation process.`,
    question: `Which finding, if true, would most directly undermine the claim that REM sleep is necessary for memory consolidation?`,
    choices: [
      { label: 'A', text: 'People who sleep fewer than six hours per night score lower on memory tests.' },
      { label: 'B', text: 'Some individuals who lack REM sleep due to certain medications show normal long-term recall.' },
      { label: 'C', text: 'The hippocampus is more active during slow-wave sleep than during waking hours.' },
      { label: 'D', text: 'REM sleep is more prevalent in infants than in adults.' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is correct. The passage claims that disrupting REM sleep impairs recall, implying REM is necessary for consolidation. Finding that individuals without REM sleep can still consolidate memories normally would directly contradict this claim.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. This finding would support the importance of sleep generally, not challenge the specific role of REM sleep.`,
      C: `Choice C is incorrect. This supports claims about slow-wave sleep rather than undermining claims about REM sleep.`,
      D: `Choice D is incorrect. Information about the prevalence of REM sleep across age groups says nothing about its function in memory consolidation.`,
    },
  },

  // ── Command of Evidence (4) ────────────────────────────────────────────────

  {
    id: 'rw1-14',
    section: 'reading-writing',
    moduleId: 'rw-module-1',
    domain: 'Information and Ideas',
    skill: 'Command of Evidence',
    difficulty: 'easy',
    stimulus: `A researcher studying urban heat islands wants to demonstrate that tree canopy coverage reduces surface temperatures in cities. Which quotation from a study report would most directly support this claim?`,
    question: `Which quotation from a study report would most directly support the claim that tree canopy coverage reduces surface temperatures in cities?`,
    choices: [
      { label: 'A', text: '"City residents who live near parks report higher levels of life satisfaction than those who do not."' },
      { label: 'B', text: '"Surface temperatures in treed neighborhoods averaged 4.2°C lower than in comparable neighborhoods without tree cover."' },
      { label: 'C', text: '"Urban trees provide habitat for over 200 species of birds in North American cities."' },
      { label: 'D', text: '"The installation of green roofs has increased in major cities by 15% over the past decade."' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is correct. This quotation directly states that surface temperatures were measurably lower in areas with tree cover compared to areas without it, which is exactly the claim the researcher wants to support.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. Life satisfaction is a psychological measure unrelated to surface temperature.`,
      C: `Choice C is incorrect. Biodiversity benefits are unrelated to temperature reduction.`,
      D: `Choice D is incorrect. Green roof installation rates do not directly support a claim about tree canopy and surface temperature.`,
    },
  },

  {
    id: 'rw1-15',
    section: 'reading-writing',
    moduleId: 'rw-module-1',
    domain: 'Information and Ideas',
    skill: 'Command of Evidence',
    difficulty: 'medium',
    stimulus: `Historians have long debated the primary causes of the decline of the Roman Empire. Edward Gibbon famously attributed it to the spread of Christianity and the "barbarization" of the army. Modern historians tend to emphasize structural economic factors, including currency debasement, overtaxation, and the disruption of long-distance trade networks. Some scholars have added climatic and epidemiological factors, arguing that a prolonged period of cooling and a series of devastating plagues weakened the empire's population and productive capacity.`,
    question: `Which quotation from a historian's work would most directly support the argument that economic factors were central to Rome's decline?`,
    choices: [
      { label: 'A', text: '"The adoption of Christianity shifted Roman civic life toward otherworldly concerns, undermining the martial virtues that had sustained the empire."' },
      { label: 'B', text: `"By the third century, the empire's silver denarius contained less than five percent silver, eroding public trust in currency and hampering commerce."` },
      { label: 'C', text: '"The Antonine Plague of 165–180 CE may have killed up to five million people, decimating the agricultural workforce."' },
      { label: 'D', text: '"Germanic military commanders became increasingly indispensable to the Roman army during the fourth and fifth centuries."' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is correct. This quotation directly addresses currency debasement — one of the structural economic factors the passage mentions — and connects it to commerce, making it the strongest support for an economic explanation of Rome's decline.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. This supports the cultural-religious explanation associated with Gibbon, not an economic argument.`,
      C: `Choice C is incorrect. This supports the epidemiological explanation described in the passage's final sentence, not the economic argument.`,
      D: `Choice D is incorrect. This describes military changes consistent with "barbarization" of the army, supporting a different argument.`,
    },
  },

  {
    id: 'rw1-16',
    section: 'reading-writing',
    moduleId: 'rw-module-1',
    domain: 'Information and Ideas',
    skill: 'Command of Evidence',
    difficulty: 'medium',
    stimulus: `A student studying wildlife management is preparing a report arguing that gray wolf reintroduction to Yellowstone National Park has had measurable ecological benefits. The student wants to include evidence that wolf predation has affected vegetation along riverbanks.

The table below shows vegetation height measurements along three river sections in Yellowstone.

River Section | Average vegetation height (1994, before wolves) | Average vegetation height (2014, after wolves)
High predation risk zone | 0.4 m | 2.3 m
Medium predation risk zone | 0.5 m | 1.1 m
Low predation risk zone | 0.6 m | 0.7 m`,
    question: `Which statement best uses the data in the table to support the student's argument?`,
    choices: [
      { label: 'A', text: 'In all three river sections, vegetation height increased slightly after wolf reintroduction.' },
      { label: 'B', text: 'Areas where elk were most likely to be hunted by wolves showed the greatest increase in vegetation height.' },
      { label: 'C', text: 'The low predation risk zone had the tallest vegetation before wolf reintroduction.' },
      { label: 'D', text: 'After 20 years, average vegetation height in medium-risk zones increased by 0.5 m.' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is correct. The table shows that the high predation risk zone — where elk would avoid grazing most — experienced the largest vegetation increase (from 0.4 m to 2.3 m). This directly supports the argument that wolf predation affected riverbank vegetation by reducing elk browsing in high-risk areas.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect and factually inaccurate based on the table: the low-risk zone showed only a 0.1 m increase, not a notable one.`,
      C: `Choice C is incorrect. This is a true statement (0.6 m was highest before wolves) but it does not support the argument about post-reintroduction effects.`,
      D: `Choice D is incorrect. While the arithmetic is correct (1.1 - 0.5 = 0.6 m, actually 0.6 m not 0.5 m), this isolated fact does not make the strongest case for the student's argument about overall ecological impact.`,
    },
  },

  {
    id: 'rw1-17',
    section: 'reading-writing',
    moduleId: 'rw-module-1',
    domain: 'Information and Ideas',
    skill: 'Command of Evidence',
    difficulty: 'hard',
    stimulus: `A philosopher is writing an essay arguing that digital social media has weakened deliberative democracy by creating "echo chambers" — online spaces in which people encounter only information that reinforces their existing beliefs. The philosopher wants to support the claim that exposure to politically diverse viewpoints is necessary for genuine democratic deliberation.`,
    question: `Which quotation from a political theory text would most directly support this claim?`,
    choices: [
      { label: 'A', text: '"Citizens who use social media spend an average of three hours per day consuming news content, compared to one hour for non-users."' },
      { label: 'B', text: '"Democratic legitimacy requires that citizens reason together across difference, testing their views against genuinely opposed perspectives."' },
      { label: 'C', text: '"The rise of partisan media outlets has been accompanied by increasing polarization in legislative voting patterns."' },
      { label: 'D', text: '"Social media platforms use algorithmic filtering to present users with content they are statistically likely to engage with."' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is correct. This quotation from a political theory text directly states that democracy requires citizens to reason "across difference" and encounter "genuinely opposed perspectives" — which is precisely the claim that exposure to diverse viewpoints is necessary for democratic deliberation.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. Time spent on social media says nothing about whether people encounter diverse viewpoints or engage in deliberation.`,
      C: `Choice C is incorrect. While this supports the idea that polarization is a problem, it does not specifically argue that diverse viewpoint exposure is necessary for democracy.`,
      D: `Choice D is incorrect. This describes algorithmic behavior that creates echo chambers, which is background context for the philosopher's concern rather than a direct argument for the necessity of diverse viewpoint exposure.`,
    },
  },

  // ── Inferences (3) ────────────────────────────────────────────────────────

  {
    id: 'rw1-18',
    section: 'reading-writing',
    moduleId: 'rw-module-1',
    domain: 'Information and Ideas',
    skill: 'Inferences',
    difficulty: 'easy',
    stimulus: `Unlike most fish, which rely on gills to extract dissolved oxygen from water, the lungfish possesses both gills and a primitive lung that allows it to breathe air. During periods of drought, when rivers and ponds in its African habitat dry up completely, the lungfish burrows into the mud, secretes a moisture-retaining cocoon of mucus, and can survive in a dormant state for months or even years until the rains return. This adaptation appears to have changed little over the past 400 million years.`,
    question: `Based on the passage, it can most reasonably be inferred that the lungfish`,
    choices: [
      { label: 'A', text: 'is more closely related to land animals than to other fish' },
      { label: 'B', text: 'would not survive in permanently flooded environments' },
      { label: 'C', text: 'can tolerate extreme environmental conditions that would kill most fish' },
      { label: 'D', text: 'evolved its lung specifically to migrate between different bodies of water' },
    ],
    correctAnswer: 'C',
    explanation: `Choice C is correct. The passage describes an animal that can survive in complete drought for months or years by entering dormancy in dried mud — conditions under which virtually no other fish could survive. This strongly supports the inference that it can tolerate extreme conditions lethal to most fish.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. The passage does not discuss the evolutionary relationship between the lungfish and land animals, so no such inference is supported.`,
      B: `Choice B is incorrect. The passage says the lungfish has gills and breathes air, suggesting it is well-adapted to aquatic life when water is available; there is no reason to infer it cannot survive in permanently flooded environments.`,
      D: `Choice D is incorrect. The passage says the lung allows the lungfish to survive drought; it does not link the lung to a purpose of migrating between water bodies.`,
    },
  },

  {
    id: 'rw1-19',
    section: 'reading-writing',
    moduleId: 'rw-module-1',
    domain: 'Information and Ideas',
    skill: 'Inferences',
    difficulty: 'medium',
    stimulus: `In the decades following World War II, the United States government invested heavily in the interstate highway system, subsidizing suburban housing development and making car ownership increasingly necessary for participation in daily economic life. Public transit ridership in most American cities declined sharply during this period as federal highway dollars flowed freely while transit systems received comparatively little support. By the 1970s, many once-robust urban rail and bus networks had either closed or contracted significantly.`,
    question: `Based on the passage, it can most reasonably be inferred that`,
    choices: [
      { label: 'A', text: 'urban transit ridership declined primarily because residents found trains and buses uncomfortable' },
      { label: 'B', text: 'government funding priorities contributed to the deterioration of public transit in American cities' },
      { label: 'C', text: 'car ownership rates in the United States were higher before the interstate highway system was built' },
      { label: 'D', text: 'all American cities experienced the same level of transit ridership decline' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is correct. The passage directly states that federal highway funds "flowed freely" while transit systems "received comparatively little support," and that transit systems subsequently declined. The inference that government funding priorities contributed to this outcome is well-supported.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. The passage attributes the decline to infrastructure investment patterns, not passenger preferences about comfort.`,
      C: `Choice C is incorrect. The passage implies car ownership increased with highway investment, suggesting it was lower before — the opposite of what choice C claims.`,
      D: `Choice D is incorrect. The passage uses "most American cities," implying variation rather than uniformity.`,
    },
  },

  {
    id: 'rw1-20',
    section: 'reading-writing',
    moduleId: 'rw-module-1',
    domain: 'Information and Ideas',
    skill: 'Inferences',
    difficulty: 'hard',
    stimulus: `Contemporary debates in ethics often distinguish between "act" and "rule" versions of consequentialism. An act consequentialist evaluates each individual action solely by its expected outcomes, choosing whichever act will produce the most good in that specific situation. A rule consequentialist, by contrast, argues that following a set of generally beneficial rules — even in cases where violating the rule might produce better immediate outcomes — leads to greater overall welfare in the long run, because predictable adherence to rules builds social trust and allows for stable cooperation.`,
    question: `Based on the passage, a rule consequentialist would most likely object to which of the following actions?`,
    choices: [
      { label: 'A', text: 'A physician who follows established medical guidelines even when a specific patient might theoretically benefit from an exception' },
      { label: 'B', text: 'A judge who departs from sentencing guidelines in a single case because doing so seems likely to produce a better outcome for all parties' },
      { label: 'C', text: 'A legislature that revises an outdated law after determining that the original rule produces harmful consequences' },
      { label: 'D', text: 'A company that adopts a code of conduct designed to maximize long-term stakeholder welfare' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is correct. A rule consequentialist holds that following generally beneficial rules is better than making case-by-case exceptions, because predictable rule-following builds trust and enables cooperation. A judge who departs from sentencing guidelines based on case-specific calculations is behaving like an act consequentialist — exactly the approach a rule consequentialist would criticize.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. This physician follows established guidelines even in difficult cases, which is exactly the behavior a rule consequentialist would endorse.`,
      C: `Choice C is incorrect. A legislature revising a harmful rule is not violating a rule; it is updating the rule system itself based on observed consequences — consistent with rule consequentialism.`,
      D: `Choice D is incorrect. Adopting a welfare-maximizing code of conduct is a rule consequentialist strategy, not an objectionable act.`,
    },
  },

  // ── Rhetorical Synthesis (2) ──────────────────────────────────────────────

  {
    id: 'rw1-21',
    section: 'reading-writing',
    moduleId: 'rw-module-1',
    domain: 'Expression of Ideas',
    skill: 'Rhetorical Synthesis',
    difficulty: 'easy',
    stimulus: `A student is writing a report on the benefits of urban parks and has taken the following notes:
• Urban parks reduce air pollution by trapping particulate matter in leaves and bark.
• Studies show that proximity to green space is associated with lower rates of anxiety and depression.
• Parks provide space for physical activity, reducing sedentary behavior in city residents.
• Community events held in parks strengthen neighborhood social bonds.`,
    question: `The student wants to write a sentence introducing the variety of benefits that urban parks provide. Which choice most effectively uses the notes to accomplish this goal?`,
    choices: [
      { label: 'A', text: 'Urban parks help trap particulate matter and provide space for exercise.' },
      { label: 'B', text: 'Urban parks offer environmental, mental health, physical, and social benefits to city residents.' },
      { label: 'C', text: 'Studies have found that people who live near parks tend to have lower rates of anxiety.' },
      { label: 'D', text: 'Community events are one of the most important functions of urban parks.' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is correct. The student wants to introduce the variety of benefits, which means encompassing all four categories in the notes: environmental (air pollution), mental health (anxiety/depression), physical (exercise), and social (community bonds). Only choice B covers all four categories without prioritizing any one.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. It covers only two of the four benefits (environmental and physical), omitting mental health and social benefits.`,
      C: `Choice C is incorrect. It addresses only the mental health benefit, not the variety of benefits the student needs to introduce.`,
      D: `Choice D is incorrect. It singles out one benefit as "most important," which contradicts the goal of introducing a variety.`,
    },
  },

  {
    id: 'rw1-22',
    section: 'reading-writing',
    moduleId: 'rw-module-1',
    domain: 'Expression of Ideas',
    skill: 'Rhetorical Synthesis',
    difficulty: 'medium',
    stimulus: `A student is writing about the history of the sonnet form and has taken the following notes:
• The sonnet originated in thirteenth-century Sicily and was later refined by Petrarch in Italy.
• Shakespeare adapted the Petrarchan sonnet, changing the rhyme scheme from ABBAABBA CDECDE to three quatrains and a couplet (ABAB CDCD EFEF GG).
• While the Petrarchan sonnet typically concludes in the sestet with a resolution or "turn," the Shakespearean couplet condenses the turn into two rhyming final lines.
• Both forms use iambic pentameter and contain exactly fourteen lines.`,
    question: `The student wants to emphasize the formal differences between the Petrarchan and Shakespearean sonnets. Which choice most effectively uses the notes to accomplish this goal?`,
    choices: [
      { label: 'A', text: 'Both the Petrarchan and Shakespearean sonnets contain fourteen lines written in iambic pentameter.' },
      { label: 'B', text: 'Shakespeare adapted the Italian sonnet tradition, and both forms remain influential today.' },
      { label: 'C', text: 'While both forms use fourteen lines and iambic pentameter, they differ in rhyme scheme and in where and how the structural turn occurs.' },
      { label: 'D', text: 'The sonnet originated in Sicily before being developed by Petrarch and later adapted by Shakespeare.' },
    ],
    correctAnswer: 'C',
    explanation: `Choice C is correct. The student wants to highlight differences, which are the rhyme scheme (ABBAABBA vs. ABABCDCD EFEFGG) and the handling of the turn (sestet vs. couplet). Choice C acknowledges the shared features while centering the contrast, which best accomplishes the stated goal.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. It describes only shared features, not differences, which is the opposite of the student's stated goal.`,
      B: `Choice B is incorrect. It vaguely mentions "adaptation" without specifying any formal differences between the two sonnet types.`,
      D: `Choice D is incorrect. It describes historical origins — relevant background but not a statement of formal differences between the two forms.`,
    },
  },

  // ── Transitions (2) ──────────────────────────────────────────────────────

  {
    id: 'rw1-23',
    section: 'reading-writing',
    moduleId: 'rw-module-1',
    domain: 'Expression of Ideas',
    skill: 'Transitions',
    difficulty: 'easy',
    stimulus: `Photosynthesis converts carbon dioxide and water into glucose and oxygen using the energy of sunlight. This process sustains virtually all life on Earth by providing the chemical energy that enters food chains. _______, photosynthesis plays a crucial role in regulating atmospheric carbon dioxide levels, acting as a natural buffer against the accumulation of greenhouse gases.`,
    question: `Which choice completes the text with the most logical transition?`,
    choices: [
      { label: 'A', text: 'However' },
      { label: 'B', text: 'In contrast' },
      { label: 'C', text: 'Furthermore' },
      { label: 'D', text: 'Nevertheless' },
    ],
    correctAnswer: 'C',
    explanation: `Choice C is correct. The passage describes one benefit of photosynthesis (sustaining life through food chains) and then adds another benefit (regulating CO₂). "Furthermore" signals an addition to the previous point, which is the logical relationship here.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. "However" signals contrast, but the second sentence adds a complementary benefit rather than contradicting the first.`,
      B: `Choice B is incorrect. "In contrast" indicates opposition between ideas, but both sentences describe benefits of photosynthesis.`,
      D: `Choice D is incorrect. "Nevertheless" concedes a point and then introduces a contrasting idea, which does not fit the additive logic of this passage.`,
    },
  },

  {
    id: 'rw1-24',
    section: 'reading-writing',
    moduleId: 'rw-module-1',
    domain: 'Expression of Ideas',
    skill: 'Transitions',
    difficulty: 'medium',
    stimulus: `Early proponents of renewable energy argued that solar and wind power were too expensive to compete with fossil fuels. Costs for solar photovoltaic panels have fallen by more than 90 percent since 2010. _______, solar energy is now the cheapest source of electricity in history in many regions of the world.`,
    question: `Which choice completes the text with the most logical transition?`,
    choices: [
      { label: 'A', text: 'As a result' },
      { label: 'B', text: 'For example' },
      { label: 'C', text: 'In addition' },
      { label: 'D', text: 'By contrast' },
    ],
    correctAnswer: 'A',
    explanation: `Choice A is correct. The dramatic price drop in solar panels is the cause; solar becoming the cheapest electricity source is the effect. "As a result" correctly signals this cause-and-effect relationship.`,
    wrongAnswerExplanations: {
      B: `Choice B is incorrect. "For example" introduces an illustration of the previous statement, but the final sentence is a consequence of the price drop, not an example of it.`,
      C: `Choice C is incorrect. "In addition" signals adding a new, parallel point rather than a causal consequence.`,
      D: `Choice D is incorrect. "By contrast" signals a contrast, but the third sentence is a direct result of the second sentence, not a contrasting idea.`,
    },
  },

  // ── Boundaries (2) ──────────────────────────────────────────────────────

  {
    id: 'rw1-25',
    section: 'reading-writing',
    moduleId: 'rw-module-1',
    domain: 'Standard English Conventions',
    skill: 'Boundaries',
    difficulty: 'easy',
    stimulus: `The Venus flytrap is a carnivorous plant native to the coastal bogs of North and South Carolina _______ it captures insects and other small prey using snap traps formed by its specialized leaves.`,
    question: `Which choice completes the text so that it conforms to the conventions of Standard English?`,
    choices: [
      { label: 'A', text: '; it captures' },
      { label: 'B', text: ', it captures' },
      { label: 'C', text: 'it captures' },
      { label: 'D', text: '. It captures' },
    ],
    correctAnswer: 'A',
    explanation: `Choice A is correct. The two clauses are independent ("The Venus flytrap is...Carolina" and "it captures insects..."). A semicolon correctly joins two independent clauses without a coordinating conjunction.`,
    wrongAnswerExplanations: {
      B: `Choice B is incorrect. Using only a comma to join two independent clauses creates a comma splice, which is a boundary error.`,
      C: `Choice C is incorrect. Joining two independent clauses with no punctuation creates a run-on sentence.`,
      D: `Choice D is also correct grammatically, but it creates two separate sentences where the original structure calls for a single connected sentence, making it the less precise choice compared to A.`,
    },
  },

  {
    id: 'rw1-26',
    section: 'reading-writing',
    moduleId: 'rw-module-1',
    domain: 'Standard English Conventions',
    skill: 'Boundaries',
    difficulty: 'medium',
    stimulus: `The novelist Toni Morrison, _______ won the Nobel Prize in Literature in 1993, is best known for her explorations of Black American identity, trauma, and memory.`,
    question: `Which choice completes the text so that it conforms to the conventions of Standard English?`,
    choices: [
      { label: 'A', text: 'who' },
      { label: 'B', text: 'she' },
      { label: 'C', text: 'and she' },
      { label: 'D', text: 'having' },
    ],
    correctAnswer: 'A',
    explanation: `Choice A is correct. The clause "who won the Nobel Prize in Literature in 1993" is a nonrestrictive relative clause correctly introduced by the relative pronoun "who," referring to Toni Morrison.`,
    wrongAnswerExplanations: {
      B: `Choice B is incorrect. Using the pronoun "she" in place of "who" creates a grammatical error: the clause "she won the Nobel Prize" would not fit properly within the commas as a relative clause modifier.`,
      C: `Choice C is incorrect. "And she" would create a compound sentence structure that doesn't work between the two commas that set off the modifier.`,
      D: `Choice D is incorrect. "Having won the Nobel Prize" is a participial phrase that changes the meaning; it suggests the prize was a prerequisite for being best known, rather than simply adding biographical information.`,
    },
  },

  // ── Form, Structure, and Sense (1) ────────────────────────────────────────

  {
    id: 'rw1-27',
    section: 'reading-writing',
    moduleId: 'rw-module-1',
    domain: 'Standard English Conventions',
    skill: 'Form, Structure, and Sense',
    difficulty: 'medium',
    stimulus: `The committee _______ its final recommendations to the board after months of deliberation, compiling data from dozens of community surveys and stakeholder interviews.`,
    question: `Which choice completes the text so that it conforms to the conventions of Standard English?`,
    choices: [
      { label: 'A', text: 'present' },
      { label: 'B', text: 'are presenting' },
      { label: 'C', text: 'presented' },
      { label: 'D', text: 'presenting' },
    ],
    correctAnswer: 'C',
    explanation: `Choice C is correct. The sentence describes a completed action (the committee submitted recommendations after a process of deliberation), so the simple past tense "presented" is the correct verb form. The phrase "after months of deliberation" confirms this is a past event.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. "Present" is the simple present tense, which does not match the past context indicated by "after months of deliberation."`,
      B: `Choice B is incorrect. "Are presenting" is the present progressive tense, implying an action currently in progress, which contradicts the completed nature of the action described.`,
      D: `Choice D is incorrect. "Presenting" is a participle; without a helping verb, it cannot serve as the main verb of the sentence.`,
    },
  },
]
