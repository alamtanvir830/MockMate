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
    stimulus: `Coral reefs are often called the "rainforests of the sea" because of their remarkable biodiversity. Although they cover less than one percent of the ocean floor, they support nearly a quarter of all marine species. Scientists have documented thousands of fish, invertebrate, and plant species living within a single reef ecosystem. This concentration of life makes reefs among the most productive environments on Earth.`,
    question: `As used in the passage, "concentration" most nearly means`,
    choices: [
      { label: 'A', text: 'mental focus' },
      { label: 'B', text: 'high density' },
      { label: 'C', text: 'chemical mixture' },
      { label: 'D', text: 'deliberate effort' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is the best answer. In this context, "concentration" refers to the large number of species packed into a small area — a high density of life. The passage emphasizes that reefs support an outsized proportion of species relative to their size, so "high density" captures this meaning precisely.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. "Mental focus" is a common meaning of "concentration," but the passage is describing a physical grouping of species, not anyone's attention.`,
      C: `Choice C is incorrect. A "chemical mixture" is another valid meaning of "concentration," but nothing in the passage involves chemistry or solutions.`,
      D: `Choice D is incorrect. "Deliberate effort" does not fit the sentence; the passage makes no mention of intentional action related to this word.`,
    },
  },

  {
    id: 'rw1-02',
    section: 'reading-writing',
    moduleId: 'rw-module-1',
    domain: 'Craft and Structure',
    skill: 'Words in Context',
    difficulty: 'easy',
    stimulus: `In his 1845 autobiography, Frederick Douglass described learning to read as an act of liberation. He wrote that his enslaver's wife had begun teaching him the alphabet but was quickly forbidden from continuing. Douglass, undeterred, found other means — trading bread with neighborhood boys in exchange for reading lessons — and ultimately taught himself to read and write through tenacity and ingenuity.`,
    question: `As used in the passage, "tenacity" most nearly means`,
    choices: [
      { label: 'A', text: 'physical strength' },
      { label: 'B', text: 'careful planning' },
      { label: 'C', text: 'persistent determination' },
      { label: 'D', text: 'fierce anger' },
    ],
    correctAnswer: 'C',
    explanation: `Choice C is the best answer. The passage describes Douglass as "undeterred" after facing an obstacle and finding alternative paths forward — behavior that reflects persistent determination. "Tenacity" in this context means the quality of not giving up despite difficulty.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. The passage emphasizes intellectual and emotional persistence, not physical strength.`,
      B: `Choice B is incorrect. While Douglass clearly strategized, the word "tenacity" emphasizes the quality of holding on rather than the act of careful planning.`,
      D: `Choice D is incorrect. Douglass's response is characterized by resourcefulness, not anger.`,
    },
  },

  {
    id: 'rw1-03',
    section: 'reading-writing',
    moduleId: 'rw-module-1',
    domain: 'Craft and Structure',
    skill: 'Words in Context',
    difficulty: 'medium',
    stimulus: `The urban heat island effect occurs when cities absorb and retain more heat than surrounding rural areas, primarily because concrete, asphalt, and buildings replace vegetation. Researchers studying this phenomenon have found that the temperature differential between urban centers and nearby countryside can be as large as 10°F on calm, clear nights. City planners are now exploring strategies — including green roofs and expanded tree canopies — to mitigate this effect.`,
    question: `As used in the passage, "mitigate" most nearly means`,
    choices: [
      { label: 'A', text: 'eliminate completely' },
      { label: 'B', text: 'lessen the severity of' },
      { label: 'C', text: 'study in detail' },
      { label: 'D', text: 'draw attention to' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is the best answer. The passage describes strategies designed to reduce — though not necessarily eliminate — the heat island effect. "Mitigate" means to make something less severe or intense, which aligns with the context of using green infrastructure to partially counteract excess urban heat.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. The passage does not imply these strategies would fully eliminate the heat island effect, only reduce it.`,
      C: `Choice C is incorrect. "Study in detail" confuses the researchers' role with the planners' goal; the strategies aim to address the problem, not study it.`,
      D: `Choice D is incorrect. Nothing in the passage suggests the strategies are aimed at raising awareness rather than reducing heat.`,
    },
  },

  {
    id: 'rw1-04',
    section: 'reading-writing',
    moduleId: 'rw-module-1',
    domain: 'Craft and Structure',
    skill: 'Words in Context',
    difficulty: 'medium',
    stimulus: `Social scientists have long debated whether human behavior is more strongly shaped by innate biology or by cultural environment. Recent research in behavioral genetics suggests the relationship is far more intricate than early nature-versus-nurture frameworks implied. Genes may predispose individuals toward certain traits, but whether those traits are expressed often depends on specific environmental triggers, making the interaction between heredity and context a nuanced and dynamic process.`,
    question: `As used in the passage, "predispose" most nearly means`,
    choices: [
      { label: 'A', text: 'guarantee the development of' },
      { label: 'B', text: 'create an inclination toward' },
      { label: 'C', text: 'permanently alter' },
      { label: 'D', text: 'make a diagnosis of' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is the best answer. The passage clarifies that genes may "predispose" individuals toward traits but that expression depends on environmental triggers — meaning genes create a tendency or inclination, not a certainty. "Predispose" conveys making someone more likely, not guaranteeing an outcome.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. The passage explicitly says expression "often depends on specific environmental triggers," ruling out any guarantee.`,
      C: `Choice C is incorrect. The passage does not suggest genes permanently alter anything; it emphasizes interaction and conditionality.`,
      D: `Choice D is incorrect. "Make a diagnosis of" is a medical usage of "predispose" that does not apply in this context.`,
    },
  },

  {
    id: 'rw1-05',
    section: 'reading-writing',
    moduleId: 'rw-module-1',
    domain: 'Craft and Structure',
    skill: 'Words in Context',
    difficulty: 'hard',
    stimulus: `Though often dismissed as mere entertainment, video games have become a subject of serious academic inquiry. Researchers in cognitive psychology have documented measurable improvements in spatial reasoning, attention, and multitasking ability among regular players of action games. Critics, however, remain circumspect about drawing broad conclusions from laboratory studies, pointing to the difficulty of replicating these effects in real-world settings and questioning whether skill gains transfer to tasks outside the gaming context.`,
    question: `As used in the passage, "circumspect" most nearly means`,
    choices: [
      { label: 'A', text: 'openly hostile' },
      { label: 'B', text: 'cautiously skeptical' },
      { label: 'C', text: 'eagerly engaged' },
      { label: 'D', text: 'deeply confused' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is the best answer. The critics described in the passage are not rejecting the findings outright but are wary about overgeneralizing — they point to methodological concerns and transferability issues. "Circumspect" means cautious and wary, especially in drawing conclusions, which fits this careful, skeptical posture.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. The critics raise legitimate methodological concerns, which suggests reasoned caution rather than hostility.`,
      C: `Choice C is incorrect. The critics resist broad conclusions, the opposite of eager engagement with them.`,
      D: `Choice D is incorrect. The critics articulate specific, coherent concerns, indicating clarity rather than confusion.`,
    },
  },

  // ── Text Structure and Purpose (4) ─────────────────────────────────────────

  {
    id: 'rw1-06',
    section: 'reading-writing',
    moduleId: 'rw-module-1',
    domain: 'Craft and Structure',
    skill: 'Text Structure and Purpose',
    difficulty: 'easy',
    stimulus: `Most people assume that bigger brains indicate greater intelligence. While brain size does correlate with intelligence across species in a general sense, the relationship within our own species is far weaker than commonly believed. Studies of human brain volume show only a modest correlation with performance on cognitive tests. What matters far more is the efficiency of neural connections, the thickness of the cortex, and the pattern of brain activity — not sheer size.`,
    question: `The primary purpose of the passage is to`,
    choices: [
      { label: 'A', text: 'argue that human intelligence cannot be measured' },
      { label: 'B', text: 'challenge a widespread but oversimplified assumption about brain size' },
      { label: 'C', text: 'explain the neurological basis of human intelligence in detail' },
      { label: 'D', text: 'compare human intelligence with that of other species' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is the best answer. The passage begins by naming a common assumption ("bigger brains indicate greater intelligence") and then systematically counters it, noting that the correlation is weak within humans and that other factors matter more. The purpose is to correct a widely held misconception.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. The passage does not question whether intelligence can be measured; it references cognitive tests as a valid measure.`,
      C: `Choice C is incorrect. While the passage mentions cortex thickness and neural efficiency, it does not provide a detailed neurological explanation.`,
      D: `Choice D is incorrect. Cross-species comparison appears only briefly in the opening sentence as a contrast setup, not as the main focus.`,
    },
  },

  {
    id: 'rw1-07',
    section: 'reading-writing',
    moduleId: 'rw-module-1',
    domain: 'Craft and Structure',
    skill: 'Text Structure and Purpose',
    difficulty: 'medium',
    stimulus: `When astronomer Cecilia Payne-Gaposchkin submitted her doctoral dissertation in 1925, her conclusion — that the Sun is composed primarily of hydrogen and helium, not heavier metals as previously assumed — was rejected as "almost certainly wrong" by the leading astronomer of the day, Henry Norris Russell. Four years later, Russell arrived at the same conclusion through independent analysis. He acknowledged Payne-Gaposchkin's priority in print, though this recognition came only after her discovery had been overshadowed by his own endorsement of the idea.`,
    question: `The passage is primarily concerned with`,
    choices: [
      { label: 'A', text: 'explaining the chemical composition of the Sun' },
      { label: 'B', text: `documenting a case where a scientist's correct finding was initially dismissed` },
      { label: 'C', text: `criticizing Henry Norris Russell's scientific methods` },
      { label: 'D', text: 'arguing that doctoral dissertations should receive more peer review' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is the best answer. The passage traces the arc of Payne-Gaposchkin's discovery: her correct conclusion was rejected, then independently confirmed, and finally acknowledged — but only after her priority had been obscured. The main concern is this pattern of a valid finding being initially dismissed.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. The Sun's composition is mentioned only as context for the story; the passage's focus is on how Payne-Gaposchkin's work was received.`,
      C: `Choice C is incorrect. The passage reports Russell's dismissal factually and even notes his later acknowledgment; it does not offer a broader critique of his methods.`,
      D: `Choice D is incorrect. The passage makes no argument about peer review processes.`,
    },
  },

  {
    id: 'rw1-08',
    section: 'reading-writing',
    moduleId: 'rw-module-1',
    domain: 'Craft and Structure',
    skill: 'Text Structure and Purpose',
    difficulty: 'medium',
    stimulus: `Psychologist Daniel Kahneman distinguishes between two modes of thinking: System 1, which operates automatically and quickly with little effort, and System 2, which allocates attention to effortful mental activities. System 1 generates impressions and intuitions that System 2 can endorse or override. In everyday life, System 1 handles most decisions — crossing a street, recognizing a friend's face, understanding simple sentences. System 2 intervenes when System 1 encounters something it cannot readily resolve.`,
    question: `How does the author structure this passage?`,
    choices: [
      { label: 'A', text: 'By presenting a problem and then evaluating proposed solutions' },
      { label: 'B', text: 'By introducing two concepts and then explaining how they interact' },
      { label: 'C', text: 'By making a claim and then providing statistical evidence' },
      { label: 'D', text: 'By describing a historical debate and then resolving it' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is the best answer. The passage introduces two thinking systems (System 1 and System 2), describes each, and then explains how they work together — System 1 runs by default, and System 2 steps in when needed. This is a classic "introduce two concepts, explain their relationship" structure.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. No problem is introduced, and no solutions are evaluated.`,
      C: `Choice C is incorrect. The passage offers examples (crossing a street, recognizing faces) rather than statistics.`,
      D: `Choice D is incorrect. The passage presents an established framework, not a historical debate.`,
    },
  },

  {
    id: 'rw1-09',
    section: 'reading-writing',
    moduleId: 'rw-module-1',
    domain: 'Craft and Structure',
    skill: 'Text Structure and Purpose',
    difficulty: 'hard',
    stimulus: `The Harlem Renaissance of the 1920s is often framed as a cultural explosion centered in New York City, but this framing obscures important geographic complexity. Scholars such as Davarian Baldwin have argued that Chicago's South Side was equally vibrant, producing jazz, blues, literature, and visual art of comparable significance. By centering Harlem, cultural histories risk marginalizing the contributions of Black artists in other cities, reinforcing the idea that Black intellectual life was confined to a single neighborhood rather than spread across an entire nation.`,
    question: `The function of the final sentence is to`,
    choices: [
      { label: 'A', text: `introduce a new argument that contradicts the passage's main claim` },
      { label: 'B', text: 'explain the broader consequences of the framing criticized in the passage' },
      { label: 'C', text: `provide specific evidence for Chicago's cultural contributions` },
      { label: 'D', text: 'acknowledge a counterargument and partially concede to it' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is the best answer. After identifying the problem with New York-centric framing, the final sentence explains why this framing is harmful: it risks marginalizing artists elsewhere and reinforces a false picture of Black cultural life as geographically limited. This elaborates the consequences of the framing, not a new or contradictory argument.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. The final sentence extends the passage's argument rather than contradicting it.`,
      C: `Choice C is incorrect. The sentence refers to "other cities" broadly; it does not provide specific evidence about Chicago.`,
      D: `Choice D is incorrect. The passage does not concede anything to the Harlem-centered framing it criticizes.`,
    },
  },

  // ── Central Ideas and Details (4) ──────────────────────────────────────────

  {
    id: 'rw1-10',
    section: 'reading-writing',
    moduleId: 'rw-module-1',
    domain: 'Information and Ideas',
    skill: 'Central Ideas and Details',
    difficulty: 'easy',
    stimulus: `Deep-sea hydrothermal vents, discovered in 1977, upended scientists' understanding of life on Earth. Before their discovery, scientists believed all food chains on Earth ultimately depended on sunlight through photosynthesis. At hydrothermal vents, however, entire ecosystems thrive in the absence of sunlight, driven instead by chemosynthesis — the process by which bacteria convert chemical energy from hydrogen sulfide and other compounds into organic matter. Tube worms, crabs, and shrimp cluster around these vents in extraordinary numbers.`,
    question: `What is the central idea of the passage?`,
    choices: [
      { label: 'A', text: 'Hydrothermal vents produce toxic chemicals that harm most marine species.' },
      { label: 'B', text: 'The discovery of hydrothermal vents revealed that life can exist without sunlight.' },
      { label: 'C', text: 'Chemosynthesis is a more efficient process than photosynthesis.' },
      { label: 'D', text: 'Deep-sea exploration technology improved dramatically in 1977.' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is the best answer. The passage focuses on how hydrothermal vents challenged the assumption that all life depends on sunlight. The central idea is the discovery that ecosystems can thrive without photosynthesis, driven instead by chemosynthesis. All other details in the passage support this main point.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. The passage describes diverse life thriving at the vents, the opposite of toxicity harming species.`,
      C: `Choice C is incorrect. The passage does not compare the efficiency of the two processes.`,
      D: `Choice D is incorrect. Technology is not mentioned; the passage focuses on the ecological significance of the discovery.`,
    },
  },

  {
    id: 'rw1-11',
    section: 'reading-writing',
    moduleId: 'rw-module-1',
    domain: 'Information and Ideas',
    skill: 'Central Ideas and Details',
    difficulty: 'medium',
    stimulus: `In the mid-nineteenth century, writer Charlotte Brontë published Jane Eyre under the pen name Currer Bell. Brontë later explained that she and her sisters — who published as Ellis Bell (Emily) and Acton Bell (Anne) — chose gender-neutral names because they suspected their work would be taken less seriously if attributed to women. Their suspicion was not unfounded: contemporary critics frequently dismissed women writers as amateur, sentimental, and incapable of intellectual rigor. The Brontës' strategy of ambiguity allowed their novels to be judged on their own merits before readers knew the authors were women.`,
    question: `According to the passage, why did the Brontë sisters use pen names?`,
    choices: [
      { label: 'A', text: 'To protect themselves from legal consequences' },
      { label: 'B', text: 'To avoid paying taxes on their literary income' },
      { label: 'C', text: 'To prevent their work from being dismissed because of their gender' },
      { label: 'D', text: 'Because their publisher required it' },
    ],
    correctAnswer: 'C',
    explanation: `Choice C is the best answer. The passage explicitly states that the Brontës "suspected their work would be taken less seriously if attributed to women," and notes that critics frequently dismissed women writers — validating this concern. The pen names were chosen to allow their novels to be judged without gender bias.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. No legal consequences are mentioned in the passage.`,
      B: `Choice B is incorrect. Financial motivations are not discussed anywhere in the passage.`,
      D: `Choice D is incorrect. The passage attributes the decision to the sisters themselves, not to a publisher requirement.`,
    },
  },

  {
    id: 'rw1-12',
    section: 'reading-writing',
    moduleId: 'rw-module-1',
    domain: 'Information and Ideas',
    skill: 'Central Ideas and Details',
    difficulty: 'medium',
    stimulus: `The placebo effect is one of the most puzzling phenomena in medicine. Patients who receive inert treatments — sugar pills, saline injections, or even sham surgery — sometimes experience genuine physiological improvements. What is particularly striking is that the effect appears even when patients are told they are receiving a placebo. Researchers at Harvard Medical School found that patients with irritable bowel syndrome reported significant symptom relief after taking placebos labeled "placebo pills," suggesting that the mere ritual of treatment may be enough to trigger the body's own healing responses.`,
    question: `Which finding from the passage is most surprising according to the author?`,
    choices: [
      { label: 'A', text: 'Placebos are sometimes used in clinical trials.' },
      { label: 'B', text: 'Patients can experience physical improvement from inert treatments.' },
      { label: 'C', text: 'The placebo effect persists even when patients know they are receiving a placebo.' },
      { label: 'D', text: 'Irritable bowel syndrome can be affected by psychological factors.' },
    ],
    correctAnswer: 'C',
    explanation: `Choice C is the best answer. The author signals importance with the phrase "What is particularly striking" before presenting the finding that the placebo effect works even when patients are informed they are receiving a placebo. This discovery is framed as the passage's most notable and surprising point.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. Clinical trial use of placebos is not mentioned and is widely known, not surprising.`,
      B: `Choice B is incorrect. This is the baseline placebo effect, which the author presents as the starting point, not the most surprising element.`,
      D: `Choice D is incorrect. While the passage implies psychological mechanisms, this is not highlighted as the striking finding.`,
    },
  },

  {
    id: 'rw1-13',
    section: 'reading-writing',
    moduleId: 'rw-module-1',
    domain: 'Information and Ideas',
    skill: 'Central Ideas and Details',
    difficulty: 'hard',
    stimulus: `Historians of technology have long grappled with the question of whether technological change drives social change or merely reflects it. The "technological determinism" school argues that transformative inventions — the printing press, the steam engine, the internet — reshape society in predictable ways regardless of human intent. Critics of this view, including historian Langdon Winner, contend that technologies are not neutral artifacts; they are designed within and for specific social contexts, and their effects depend heavily on how societies choose to deploy them. Winner's classic example is Robert Moses's highway bridges in New York, built too low for buses to pass under, allegedly to prevent low-income New Yorkers from reaching certain beaches.`,
    question: `The passage primarily contrasts which two perspectives?`,
    choices: [
      { label: 'A', text: 'The view that technology improves society versus the view that it harms it' },
      { label: 'B', text: 'The belief that technology drives social change versus the belief that social context shapes how technology is used' },
      { label: 'C', text: 'The claim that inventions are accidental versus the claim that they are intentional' },
      { label: 'D', text: 'The idea that engineers shape history versus the idea that historians do' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is the best answer. The passage sets up two competing views: technological determinism (technology reshapes society on its own terms) versus the critical view (social context shapes technology and its effects depend on deployment choices). The Moses example supports the second view by showing design decisions embedding social biases.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. Neither view is framed as purely positive or negative; the debate concerns causality, not value.`,
      C: `Choice C is incorrect. The passage does not address whether inventions are accidental or intentional.`,
      D: `Choice D is incorrect. The debate is about technological causation, not about which profession shapes history.`,
    },
  },

  // ── Command of Evidence (3) ─────────────────────────────────────────────────

  {
    id: 'rw1-14',
    section: 'reading-writing',
    moduleId: 'rw-module-1',
    domain: 'Information and Ideas',
    skill: 'Command of Evidence',
    difficulty: 'medium',
    stimulus: `A student is writing a paper arguing that remote work increases employee productivity. The student wants to include a claim supported by quantitative evidence about the impact of remote work on output.

Which quotation from a research report would best support the student's argument?`,
    question: `Which quotation best supports the student's argument?`,
    choices: [
      { label: 'A', text: '"Many employees report feeling more comfortable working from home than in an office environment."' },
      { label: 'B', text: '"A two-year study at a Chinese travel agency found that remote workers completed 13.5% more calls per week compared to their in-office counterparts."' },
      { label: 'C', text: '"The shift to remote work was accelerated by the COVID-19 pandemic beginning in 2020."' },
      { label: 'D', text: '"Remote work policies vary significantly across industries and company sizes."' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is the best answer. The student needs quantitative evidence that remote work increases productivity. Choice B provides a specific, measurable finding from a study: a 13.5% increase in completed calls per week for remote workers. This directly supports the argument with concrete numbers.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. Feeling comfortable is not a measure of productivity; this is subjective employee sentiment.`,
      C: `Choice C is incorrect. This describes the historical context of remote work's growth, not its effect on productivity.`,
      D: `Choice D is incorrect. Variation in policies is neutral background information that neither supports nor undermines the productivity argument.`,
    },
  },

  {
    id: 'rw1-15',
    section: 'reading-writing',
    moduleId: 'rw-module-1',
    domain: 'Information and Ideas',
    skill: 'Command of Evidence',
    difficulty: 'medium',
    stimulus: `Researchers studying urban green spaces surveyed 800 residents across 12 cities. Participants who lived within a 10-minute walk of a park reported significantly lower stress levels (average score: 2.3 out of 10) than those who lived more than 30 minutes from the nearest park (average score: 5.7 out of 10). The researchers noted, however, that higher-income neighborhoods tend to have more parks, raising questions about whether green space access or socioeconomic status is the primary driver of the observed difference.`,
    question: `Which conclusion is most directly supported by the data in the passage?`,
    choices: [
      { label: 'A', text: 'Planting more trees in urban neighborhoods will lower stress levels.' },
      { label: 'B', text: 'People who live near parks report lower stress than those who do not.' },
      { label: 'C', text: 'Socioeconomic status is the main cause of stress differences across neighborhoods.' },
      { label: 'D', text: 'Visits to parks of more than 30 minutes are necessary to reduce stress.' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is the best answer. The survey data directly shows a correlation between proximity to parks and self-reported stress levels. This is the most direct conclusion the data supports. The passage itself notes that the causal relationship is uncertain, making B's careful language ("report lower stress") appropriate.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. The data shows a correlation with park proximity, not a causal claim about tree-planting interventions.`,
      C: `Choice C is incorrect. The researchers raise socioeconomic status as a confounding factor; they do not conclude it is the main cause.`,
      D: `Choice D is incorrect. The study measured proximity, not visit duration; no data about 30-minute visits appears.`,
    },
  },

  {
    id: 'rw1-16',
    section: 'reading-writing',
    moduleId: 'rw-module-1',
    domain: 'Information and Ideas',
    skill: 'Command of Evidence',
    difficulty: 'hard',
    stimulus: `Global plastic production reached 400 million metric tons in 2022, with less than 10% of all plastic ever produced having been recycled. A 2023 study estimated that microplastics — particles smaller than 5 millimeters — are now present in human blood, lungs, and placentas. The study stopped short of concluding that microplastics cause harm, noting that exposure levels in the study populations were difficult to compare with toxicological thresholds established in laboratory settings.`,
    question: `A researcher claims: "Current evidence proves that microplastics in the human body cause measurable health damage." Does the passage support this claim?`,
    choices: [
      { label: 'A', text: 'Yes, because the study found microplastics in blood, lungs, and placentas.' },
      { label: 'B', text: 'Yes, because plastic production has reached 400 million metric tons per year.' },
      { label: 'C', text: 'No, because the study found microplastic presence but did not conclude they cause harm.' },
      { label: 'D', text: 'No, because the study was conducted in a laboratory, not on real human populations.' },
    ],
    correctAnswer: 'C',
    explanation: `Choice C is the best answer. The passage explicitly states the study "stopped short of concluding that microplastics cause harm." Finding that microplastics are present is not the same as proving they cause damage. The researcher's claim overstates what the evidence supports.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. Presence in the body does not establish harm; the study itself made no such causal conclusion.`,
      B: `Choice B is incorrect. Production volume data relates to the scale of plastic use, not to health effects of microplastics.`,
      D: `Choice D is incorrect. The passage says the study was conducted on human populations, not in a laboratory; lab thresholds are mentioned only as a comparison point.`,
    },
  },

  // ── Inferences (3) ─────────────────────────────────────────────────────────

  {
    id: 'rw1-17',
    section: 'reading-writing',
    moduleId: 'rw-module-1',
    domain: 'Information and Ideas',
    skill: 'Inferences',
    difficulty: 'easy',
    stimulus: `The town of Oymyakon in Siberia regularly records the lowest temperatures of any permanently inhabited place on Earth, reaching as low as −67°C (−89°F). Despite these conditions, approximately 500 people live there year-round. The local economy centers on reindeer herding and some tourism from adventurous visitors hoping to experience extreme cold. Cars must be kept running at all times to prevent their engines from freezing.`,
    question: `What can most reasonably be inferred about the residents of Oymyakon?`,
    choices: [
      { label: 'A', text: 'They are unable to use electricity in their homes.' },
      { label: 'B', text: 'They have developed ways to function in extreme cold.' },
      { label: 'C', text: 'They would prefer to live in a warmer climate.' },
      { label: 'D', text: 'They are primarily employed by the government.' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is the best answer. The passage notes that people have lived in Oymyakon year-round despite temperatures as low as −67°C, and provides examples of practical adaptations like keeping cars running continuously. It is reasonable to infer that residents have developed effective strategies for managing extreme conditions.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. The passage implies infrastructure sufficient for permanent habitation; no mention of electricity limitations is made.`,
      C: `Choice C is incorrect. The passage does not indicate the residents' preferences; their continued residence does not imply dissatisfaction.`,
      D: `Choice D is incorrect. The passage describes reindeer herding and tourism as the economic activities, not government employment.`,
    },
  },

  {
    id: 'rw1-18',
    section: 'reading-writing',
    moduleId: 'rw-module-1',
    domain: 'Information and Ideas',
    skill: 'Inferences',
    difficulty: 'medium',
    stimulus: `Writer James Baldwin left the United States for Paris in 1948, remaining there for most of the next decade. In interviews, he explained that geographical distance gave him the perspective necessary to understand his own country — its racial dynamics, its paradoxes of freedom and oppression, and what it meant to be Black in America. He returned to the United States periodically during the civil rights movement, participating in marches and giving speeches, but always returned to Europe.`,
    question: `Which inference about Baldwin is best supported by the passage?`,
    choices: [
      { label: 'A', text: 'Baldwin found it easier to write about America when he was not physically present in it.' },
      { label: 'B', text: 'Baldwin opposed the civil rights movement.' },
      { label: 'C', text: 'Baldwin left the United States because he was unable to publish his work there.' },
      { label: 'D', text: 'Baldwin believed France was morally superior to the United States.' },
    ],
    correctAnswer: 'A',
    explanation: `Choice A is the best answer. Baldwin explicitly stated that distance gave him the perspective to understand America, and the passage connects his time abroad to his ability to analyze his country's racial dynamics. This supports the inference that geographical separation aided his creative and analytical work.`,
    wrongAnswerExplanations: {
      B: `Choice B is incorrect. The passage describes Baldwin participating in marches and giving speeches, evidence of his civil rights involvement.`,
      C: `Choice C is incorrect. The passage gives no indication that publishing difficulties motivated his departure.`,
      D: `Choice D is incorrect. Baldwin sought perspective, not a moral comparison; the passage makes no claim about his views on French morality.`,
    },
  },

  {
    id: 'rw1-19',
    section: 'reading-writing',
    moduleId: 'rw-module-1',
    domain: 'Information and Ideas',
    skill: 'Inferences',
    difficulty: 'hard',
    stimulus: `In classical economic theory, consumers are assumed to be rational actors who make decisions based on accurate information and stable preferences to maximize their utility. Behavioral economics, pioneered by psychologists Daniel Kahneman and Amos Tversky, challenged this model by demonstrating through controlled experiments that human decision-making is systematically influenced by cognitive biases, framing effects, and loss aversion. Their findings prompted a broader rethinking of economic models that had treated psychological realism as unnecessary for predictive accuracy.`,
    question: `What can be inferred about classical economic models based on the passage?`,
    choices: [
      { label: 'A', text: 'Classical economists were unaware that human psychology affects decision-making.' },
      { label: 'B', text: 'Classical economic models were considered accurate enough without accounting for cognitive biases.' },
      { label: 'C', text: 'Classical economic models have now been entirely abandoned.' },
      { label: 'D', text: 'Classical economists believed that loss aversion was the primary driver of consumer behavior.' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is the best answer. The passage says behavioral economics prompted a "rethinking of economic models that had treated psychological realism as unnecessary for predictive accuracy." This implies that classical models were considered sufficiently predictive without including cognitive psychology — they were deemed accurate enough without it.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. The passage does not say classical economists were unaware of psychology; it says they treated psychological realism as "unnecessary," implying a deliberate modeling choice.`,
      C: `Choice C is incorrect. The passage says models were "rethought," not that they were entirely replaced or abandoned.`,
      D: `Choice D is incorrect. Loss aversion is a behavioral economics concept; classical theory assumed rational utility maximization, not loss aversion.`,
    },
  },

  // ── Cross-Text Connections (2) ──────────────────────────────────────────────

  {
    id: 'rw1-20',
    section: 'reading-writing',
    moduleId: 'rw-module-1',
    domain: 'Craft and Structure',
    skill: 'Cross-Text Connections',
    difficulty: 'medium',
    stimulus: `Text 1: Social media platforms have democratized information access, allowing anyone with an internet connection to publish, share, and consume news without the gatekeeping functions of traditional journalism. This openness has given voice to communities historically excluded from mainstream media.

Text 2: The same openness that makes social media liberating also makes it dangerous. Without editorial standards, false information spreads as easily as true information — sometimes faster, because sensational content generates more engagement. Studies consistently show that misinformation spreads six times faster than factual news on major platforms.`,
    question: `How would the author of Text 2 most likely respond to the claim in Text 1 that social media has "democratized information access"?`,
    choices: [
      { label: 'A', text: 'By arguing that the claim is entirely false and that social media restricts access.' },
      { label: 'B', text: 'By agreeing but adding that this democratization has significant drawbacks.' },
      { label: 'C', text: 'By arguing that traditional journalism was never effective at gatekeeping.' },
      { label: 'D', text: 'By claiming that engagement metrics are a reliable measure of truth.' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is the best answer. Text 2 begins by saying "the same openness that makes social media liberating" — implying agreement that social media is liberating (i.e., it has democratized access) — but then pivots to its dangers. This classic concede-and-qualify structure means the author of Text 2 would acknowledge the democratization claim while emphasizing its significant costs.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. Text 2 explicitly affirms social media's "liberating" quality; it does not deny democratization.`,
      C: `Choice C is incorrect. Text 2 does not evaluate traditional journalism's effectiveness.`,
      D: `Choice D is incorrect. Text 2 says high engagement tracks misinformation, the opposite of linking engagement to truth.`,
    },
  },

  {
    id: 'rw1-21',
    section: 'reading-writing',
    moduleId: 'rw-module-1',
    domain: 'Craft and Structure',
    skill: 'Cross-Text Connections',
    difficulty: 'hard',
    stimulus: `Text 1: For centuries, historians treated the Roman Empire's fall in 476 CE as a decisive rupture — the end of ancient civilization and the beginning of the "Dark Ages." Edward Gibbon's eighteenth-century Decline and Fall of the Roman Empire became the canonical account of this collapse.

Text 2: More recent scholarship has challenged the "fall and rupture" narrative. Historians such as Peter Heather and Bryan Ward-Perkins acknowledge that the fifth century brought significant disruption, but emphasize continuity as much as collapse: Roman administrative structures persisted in many regions, the Church preserved Latin literacy, and trade networks adapted rather than disappeared entirely.`,
    question: `Both texts address the fall of the Roman Empire, but they differ primarily in that Text 2`,
    choices: [
      { label: 'A', text: 'argues that Rome never actually fell' },
      { label: 'B', text: 'focuses exclusively on the role of the Church in preserving Roman culture' },
      { label: 'C', text: 'complicates the narrative of sudden collapse by emphasizing elements of continuity' },
      { label: 'D', text: `disagrees with Gibbon's claim that the fifth century was disruptive` },
    ],
    correctAnswer: 'C',
    explanation: `Choice C is the best answer. Text 2 does not deny that the fifth century was disruptive; it acknowledges "significant disruption" while arguing that administrative, cultural, and commercial continuities persisted. This "yes, but" position complicates the clean collapse narrative by showing that rupture and continuity coexisted.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. Text 2 acknowledges disruption and does not claim Rome "never fell."`,
      B: `Choice B is incorrect. Text 2 mentions the Church as one of several examples; it does not focus exclusively on it.`,
      D: `Choice D is incorrect. Text 2 agrees that the period brought disruption; it contests only the characterization of pure rupture.`,
    },
  },

  // ── Rhetorical Synthesis (2) ────────────────────────────────────────────────

  {
    id: 'rw1-22',
    section: 'reading-writing',
    moduleId: 'rw-module-1',
    domain: 'Expression of Ideas',
    skill: 'Rhetorical Synthesis',
    difficulty: 'medium',
    stimulus: `A student is writing a report about electric vehicles (EVs) and wants to highlight the environmental benefits of EVs compared to gasoline-powered cars. The student has gathered the following notes:

• EVs produce zero direct tailpipe emissions.
• The environmental benefit of EVs depends on the energy source used to generate electricity.
• In regions with coal-heavy electricity grids, EVs may produce more lifecycle emissions than efficient gasoline cars.
• In regions with clean electricity (solar, wind, nuclear), EVs produce dramatically fewer lifecycle emissions.
• Battery production for EVs currently generates significant carbon emissions.`,
    question: `The student wants to write a sentence that presents the environmental case for EVs while accurately reflecting the complexity of the data. Which choice best accomplishes this goal?`,
    choices: [
      { label: 'A', text: 'Electric vehicles produce zero emissions and are unambiguously better for the environment than gasoline cars.' },
      { label: 'B', text: 'Although battery production and grid composition affect total emissions, EVs offer substantial environmental benefits in regions powered by clean energy.' },
      { label: 'C', text: 'Because of battery production emissions and coal-heavy grids, electric vehicles may not be more environmentally friendly than gasoline cars.' },
      { label: 'D', text: 'Electric vehicles depend entirely on regional electricity sources and therefore have no consistent environmental advantage.' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is the best answer. The student wants to make the environmental case for EVs while reflecting the complexity in the notes. Choice B acknowledges the complicating factors (battery production, grid composition) while still affirming the environmental benefit in clean-energy regions. This is accurate to the data and accomplishes both goals.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. The notes show EVs have lifecycle emissions from battery production and may perform worse than gasoline cars in coal-heavy grids, making "unambiguously better" inaccurate.`,
      C: `Choice C is incorrect. This emphasizes the downsides and does not "present the environmental case for EVs" as requested.`,
      D: `Choice D is incorrect. "No consistent environmental advantage" overstates the negative; EVs are clearly advantageous in clean-energy regions.`,
    },
  },

  {
    id: 'rw1-23',
    section: 'reading-writing',
    moduleId: 'rw-module-1',
    domain: 'Expression of Ideas',
    skill: 'Rhetorical Synthesis',
    difficulty: 'hard',
    stimulus: `A student is writing an essay arguing that public libraries should expand their digital services. The student has the following notes:

• Public library card holders can access e-books, audiobooks, and streaming media through apps like Libby and Hoopla.
• Many rural residents live more than 20 miles from the nearest branch library.
• Library digital budgets have not kept pace with demand; popular titles often have wait times of 6–18 months.
• A 2022 survey found that 72% of Americans who do not currently use the library would consider using it if digital access were easier.
• Some publishers limit library e-book licenses to a set number of checkouts before the license expires.

The student wants to use two of these notes to explain why expanding digital services would both reach more people and attract new library users.`,
    question: `Which combination of notes best accomplishes this goal?`,
    choices: [
      { label: 'A', text: 'The note about rural residents living far from branches, and the note about 72% of non-users who might use digital services.' },
      { label: 'B', text: 'The note about wait times for popular titles, and the note about publisher license restrictions.' },
      { label: 'C', text: 'The note about existing digital platforms like Libby and Hoopla, and the note about publisher license restrictions.' },
      { label: 'D', text: 'The note about digital budgets not keeping pace with demand, and the note about the 72% of non-users.' },
    ],
    correctAnswer: 'A',
    explanation: `Choice A is the best answer. The rural residents note explains how expanded digital services would "reach more people" (those far from physical branches). The 72% survey note explains how it would "attract new library users." Together these two directly address both goals the student specified.`,
    wrongAnswerExplanations: {
      B: `Choice B is incorrect. Wait times and publisher restrictions identify obstacles to digital expansion but do not explain how expansion would reach more people or attract new users.`,
      C: `Choice C is incorrect. Existing platforms and publisher limits are about current infrastructure and constraints, not about how expansion would broaden reach or attract new users.`,
      D: `Choice D is incorrect. Budget shortfalls describe a problem, not a benefit of expansion; this combination does not address "reaching more people."`,
    },
  },

  // ── Transitions (3) ────────────────────────────────────────────────────────

  {
    id: 'rw1-24',
    section: 'reading-writing',
    moduleId: 'rw-module-1',
    domain: 'Expression of Ideas',
    skill: 'Transitions',
    difficulty: 'easy',
    stimulus: `Monarch butterflies undertake one of the most remarkable migrations in the animal kingdom, traveling up to 3,000 miles from their summer habitats in Canada and the United States to their wintering grounds in central Mexico. _______ no individual butterfly completes the full round trip; it takes three to four generations for the species to make the journey south and return north.`,
    question: `Which choice completes the text with the most logical and precise transition?`,
    choices: [
      { label: 'A', text: 'Similarly,' },
      { label: 'B', text: 'As a result,' },
      { label: 'C', text: 'Remarkably,' },
      { label: 'D', text: 'In addition,' },
    ],
    correctAnswer: 'C',
    explanation: `Choice C is the best answer. The second sentence reveals a surprising fact: no single butterfly completes the full migration. "Remarkably" signals that what follows is surprising or noteworthy, which fits the unexpected nature of this detail. The other choices imply logical relationships (causation, addition, similarity) that don't reflect the contrast between the impressive migration and the surprising fact about individual butterflies.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. "Similarly" implies the second sentence is parallel to the first, but the second sentence introduces a complicating fact, not a similar idea.`,
      B: `Choice B is incorrect. "As a result" implies the second sentence is a consequence of the first, but the multi-generational nature of the migration is not caused by its length.`,
      D: `Choice D is incorrect. "In addition" adds information without signaling the surprising quality of the fact, which is the key rhetorical move here.`,
    },
  },

  {
    id: 'rw1-25',
    section: 'reading-writing',
    moduleId: 'rw-module-1',
    domain: 'Expression of Ideas',
    skill: 'Transitions',
    difficulty: 'medium',
    stimulus: `Early research suggested that moderate wine consumption was associated with lower rates of heart disease, leading many health commentators to promote wine as cardioprotective. _______ a series of large-scale genetic studies published in the late 2010s found no evidence that alcohol itself reduces cardiovascular risk; the apparent benefit may have reflected confounding lifestyle factors rather than any property of wine or alcohol.`,
    question: `Which choice completes the text with the most logical transition?`,
    choices: [
      { label: 'A', text: 'Therefore,' },
      { label: 'B', text: 'However,' },
      { label: 'C', text: 'Furthermore,' },
      { label: 'D', text: 'For instance,' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is the best answer. The second sentence contradicts the first: early research suggested a benefit, but later genetic studies found no such benefit. "However" signals this contradiction and is the most precise transition for a shift from one position to a conflicting one.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. "Therefore" implies the second sentence is a logical result of the first, but it contradicts rather than follows from it.`,
      C: `Choice C is incorrect. "Furthermore" adds supporting information; the second sentence does not support the first.`,
      D: `Choice D is incorrect. "For instance" introduces an example, but the second sentence is a counterexample, not an illustration.`,
    },
  },

  {
    id: 'rw1-26',
    section: 'reading-writing',
    moduleId: 'rw-module-1',
    domain: 'Expression of Ideas',
    skill: 'Transitions',
    difficulty: 'hard',
    stimulus: `Many environmentalists focus primarily on reducing carbon dioxide emissions to combat climate change. _______ methane, a greenhouse gas with more than 80 times the warming potential of CO₂ over a 20-year period, is responsible for about 30% of current global warming and has received comparatively little policy attention until recently.`,
    question: `Which choice completes the text with the most logical transition?`,
    choices: [
      { label: 'A', text: 'Consequently,' },
      { label: 'B', text: 'In contrast,' },
      { label: 'C', text: 'For example,' },
      { label: 'D', text: 'Similarly,' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is the best answer. The passage contrasts the dominant focus on CO₂ with the relative neglect of methane, an equally or more impactful greenhouse gas. "In contrast" precisely signals this juxtaposition between what receives attention (CO₂) and what receives less attention (methane).`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. "Consequently" implies methane's warming effect results from environmentalists' CO₂ focus, which is illogical.`,
      C: `Choice C is incorrect. "For example" would imply methane is an instance of what environmentalists focus on; the passage says the opposite.`,
      D: `Choice D is incorrect. "Similarly" implies methane receives similar policy attention to CO₂, which the passage explicitly contradicts.`,
    },
  },

  // ── Standard English Conventions (4) ───────────────────────────────────────

  {
    id: 'rw1-27',
    section: 'reading-writing',
    moduleId: 'rw-module-1',
    domain: 'Standard English Conventions',
    skill: 'Boundaries',
    difficulty: 'easy',
    stimulus: ``,
    question: `The school decided to renovate the gymnasium _______ the project would take three months to complete.`,
    choices: [
      { label: 'A', text: ', however' },
      { label: 'B', text: '; the project' },
      { label: 'C', text: ', the project' },
      { label: 'D', text: 'and the project' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is the best answer. The sentence contains two independent clauses: "The school decided to renovate the gymnasium" and "the project would take three months to complete." A semicolon correctly joins two independent clauses. Choice B places a semicolon before "the project," which is grammatically correct.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. "However" requires a semicolon before it when connecting two independent clauses ("; however,"), not a comma alone.`,
      C: `Choice C is incorrect. Using only a comma to join two independent clauses creates a comma splice, which is a grammatical error.`,
      D: `Choice D is incorrect. "And" can connect independent clauses, but it must be preceded by a comma ("…gymnasium, and the project…"); without the comma, this creates a run-on sentence.`,
    },
  },
]
