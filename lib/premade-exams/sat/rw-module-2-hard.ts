import type { RWQuestion } from './types'

// Reading and Writing Module 2 Hard — 27 questions (harder second module, ~12 medium / ~15 hard)

export const rwModule2HardQuestions: RWQuestion[] = [

  // ── Words in Context (5) ────────────────────────────────────────────────────

  {
    id: 'rw2h-01',
    section: 'reading-writing',
    moduleId: 'rw-module-2-hard',
    domain: 'Craft and Structure',
    skill: 'Words in Context',
    difficulty: 'medium',
    stimulus: `The philosopher Immanuel Kant distinguished between two types of imperatives governing human action. "Hypothetical imperatives" prescribe means to ends: if you want X, do Y. "Categorical imperatives," by contrast, prescribe action unconditionally, independent of any particular desire or goal. Kant argued that morality must be grounded in the categorical form — in obligations that bind rational beings regardless of their contingent interests — precisely because conditional obligations would make morality a matter of mere calculation.`,
    question: `As used in the passage, "contingent" most nearly means`,
    choices: [
      { label: 'A', text: 'variable and dependent on circumstances' },
      { label: 'B', text: 'deeply felt and personally held' },
      { label: 'C', text: 'universal and binding on all people' },
      { label: 'D', text: 'rational and logically derived' },
    ],
    correctAnswer: 'A',
    explanation: `Choice A is correct. Kant contrasts categorical obligations, which bind regardless of desires, with interests that are "contingent" — meaning they vary from person to person and depend on particular circumstances, goals, and inclinations. "Variable and dependent on circumstances" captures this technical philosophical meaning.`,
    wrongAnswerExplanations: {
      B: `Choice B is incorrect. "Deeply felt" describes the emotional intensity of interests, not their philosophical status as conditional or variable.`,
      C: `Choice C is incorrect. "Universal and binding" describes categorical imperatives, not the contingent interests that Kant is contrasting with them.`,
      D: `Choice D is incorrect. Kant's argument reserves "rational" for categorical imperatives; contingent interests are empirical, not purely rational.`,
    },
  },

  {
    id: 'rw2h-02',
    section: 'reading-writing',
    moduleId: 'rw-module-2-hard',
    domain: 'Craft and Structure',
    skill: 'Words in Context',
    difficulty: 'medium',
    stimulus: `The biologist Lynn Margulis proposed in the late 1960s that eukaryotic cells — those with a distinct nucleus — evolved through a process she called endosymbiosis: the permanent absorption of one bacterial cell by another. Mitochondria and chloroplasts, she argued, were once independent bacteria that were incorporated rather than digested by their host cells, entering into a mutually beneficial arrangement that became hereditary. Her theory was initially derided as heterodox, but decades of genetic evidence have since vindicated it, and endosymbiosis is now scientific consensus.`,
    question: `As used in the passage, "heterodox" most nearly means`,
    choices: [
      { label: 'A', text: 'inaccurate and poorly evidenced' },
      { label: 'B', text: 'departing from accepted scientific opinion' },
      { label: 'C', text: 'mathematically complex' },
      { label: 'D', text: 'based on philosophical rather than empirical reasoning' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is correct. The passage notes that Margulis's theory was initially "derided as heterodox" but was later validated by genetic evidence. "Heterodox" means departing from established or accepted opinion — the theory went against the scientific mainstream at the time.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. The passage explicitly says the theory was later vindicated, implying it was not inaccurate; "heterodox" describes its departure from consensus, not its evidential status.`,
      C: `Choice C is incorrect. The passage makes no mention of mathematical complexity.`,
      D: `Choice D is incorrect. Margulis's theory was biological and empirical, not philosophical.`,
    },
  },

  {
    id: 'rw2h-03',
    section: 'reading-writing',
    moduleId: 'rw-module-2-hard',
    domain: 'Craft and Structure',
    skill: 'Words in Context',
    difficulty: 'hard',
    stimulus: `Political theorists have long grappled with the tension between procedural and substantive conceptions of justice. Procedural accounts hold that an outcome is just if it results from a fair process, regardless of what that outcome happens to be. Substantive accounts, by contrast, evaluate outcomes directly against independent criteria of fairness or welfare. A persistent challenge for procedural theorists is the possibility that an ostensibly fair procedure can yield outcomes that are, by almost any independent reckoning, deeply unjust.`,
    question: `As used in the passage, "ostensibly" most nearly means`,
    choices: [
      { label: 'A', text: 'secretly' },
      { label: 'B', text: 'apparently but perhaps not genuinely' },
      { label: 'C', text: 'rigorously and transparently' },
      { label: 'D', text: 'historically established' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is correct. The passage describes a procedure that appears fair by procedural standards but may still yield unjust outcomes. "Ostensibly" signals that something appears to be one way but may not actually be so — the appearance of fairness that does not guarantee substantive justice.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. "Secretly" implies hidden deception, but "ostensibly" describes surface appearance without implying deliberate concealment.`,
      C: `Choice C is incorrect. "Rigorously and transparently" would suggest the procedure is genuinely fair, which is what the passage is questioning.`,
      D: `Choice D is incorrect. Historical establishment is unrelated to the meaning of "ostensibly" in this context.`,
    },
  },

  {
    id: 'rw2h-04',
    section: 'reading-writing',
    moduleId: 'rw-module-2-hard',
    domain: 'Craft and Structure',
    skill: 'Words in Context',
    difficulty: 'hard',
    stimulus: `The historian Hayden White argued controversially that historical narratives are not neutral records of the past but literary constructions shaped by the rhetorical and narrative conventions historians choose to employ. On White's account, history is "emplotted" — structured according to one of a limited number of archetypal story forms borrowed from literature — and this emplotment is not a distortion imposed on pre-existing historical facts but is constitutive of what counts as historical understanding itself.`,
    question: `As used in the passage, "constitutive" most nearly means`,
    choices: [
      { label: 'A', text: 'legally regulated' },
      { label: 'B', text: 'supplementary to' },
      { label: 'C', text: 'forming an essential part of' },
      { label: 'D', text: 'in conflict with' },
    ],
    correctAnswer: 'C',
    explanation: `Choice C is correct. White argues that narrative emplotment is not added on top of historical understanding but is part of what constitutes historical understanding — it is "forming an essential part of" how history is comprehended. "Constitutive" in philosophy means something that makes up or is essential to a thing's identity.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. "Legally regulated" has no connection to the epistemological point White is making about narrative and historical understanding.`,
      B: `Choice B is incorrect. "Supplementary" implies something added to an already existing thing, but White's claim is that emplotment is integral, not peripheral.`,
      D: `Choice D is incorrect. "In conflict with" implies opposition, but White is saying emplotment is part of understanding, not that it contradicts it.`,
    },
  },

  {
    id: 'rw2h-05',
    section: 'reading-writing',
    moduleId: 'rw-module-2-hard',
    domain: 'Craft and Structure',
    skill: 'Words in Context',
    difficulty: 'hard',
    stimulus: `The concept of "regulatory capture" describes a phenomenon in which government agencies created to act in the public interest come, over time, to advance the commercial or political interests of the industries they are supposed to regulate. This process can occur through various mechanisms: the "revolving door" of personnel between industry and regulators, the informational asymmetry between well-resourced industries and understaffed agencies, and the subtle accretion of pro-industry norms within regulatory culture.`,
    question: `As used in the passage, "accretion" most nearly means`,
    choices: [
      { label: 'A', text: 'sudden reversal' },
      { label: 'B', text: 'gradual buildup' },
      { label: 'C', text: 'formal adoption' },
      { label: 'D', text: 'deliberate concealment' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is correct. The passage describes how regulatory capture develops through gradual processes — personnel movement, informational gaps, and the slow development of norms. "Accretion" means the gradual accumulation of something layer by layer, which fits the implied incremental nature of norm development within regulatory culture.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. "Sudden reversal" implies a rapid, dramatic change, which contradicts the gradual process described in the passage.`,
      C: `Choice C is incorrect. "Formal adoption" implies an official, deliberate decision, but the passage implies that this process is subtle and informal.`,
      D: `Choice D is incorrect. "Deliberate concealment" implies intentional hiding, but "accretion" describes accumulation, not deception.`,
    },
  },

  // ── Text Structure and Purpose (3) ─────────────────────────────────────────

  {
    id: 'rw2h-06',
    section: 'reading-writing',
    moduleId: 'rw-module-2-hard',
    domain: 'Craft and Structure',
    skill: 'Text Structure and Purpose',
    difficulty: 'medium',
    stimulus: `The development of anesthesia in the 1840s transformed surgery from a procedure performed with brutal speed — since patient consciousness precluded lengthy operations — to a deliberate and expansive practice. Within a generation of ether's introduction, surgeons were performing operations on the chest and abdomen that would have been previously unthinkable. Yet this expansion of surgical possibility was accompanied by a corresponding expansion of surgical hubris: mortality rates from postoperative infection remained catastrophically high until Joseph Lister's antiseptic techniques were adopted in the 1870s.`,
    question: `The primary purpose of the passage is to`,
    choices: [
      { label: 'A', text: 'argue that the development of anesthesia was less important than the development of antiseptic technique' },
      { label: 'B', text: 'describe how a major surgical advance created both new capabilities and new risks' },
      { label: 'C', text: 'trace the biography of Joseph Lister and his contributions to medicine' },
      { label: 'D', text: 'compare surgical mortality rates before and after the introduction of ether' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is correct. The passage describes how anesthesia dramatically expanded what surgeons could attempt (new capabilities) and then notes that this same expansion led to more patients dying from infection before antiseptic techniques arrived (new risks). The structure moves from advance to unintended consequence.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. The passage does not rank the two innovations against each other in terms of importance.`,
      C: `Choice C is incorrect. Lister is mentioned only briefly in the final clause; the passage is not about his biography.`,
      D: `Choice D is incorrect. The passage mentions high mortality but does not present before-and-after comparative data.`,
    },
  },

  {
    id: 'rw2h-07',
    section: 'reading-writing',
    moduleId: 'rw-module-2-hard',
    domain: 'Craft and Structure',
    skill: 'Text Structure and Purpose',
    difficulty: 'hard',
    stimulus: `The philosopher Charles Taylor distinguishes between "weak" and "strong" evaluations of desire. A weak evaluation simply ranks preferences by how much one wants them. A strong evaluation assesses desires according to qualitative distinctions about worth — ranking some desires as higher, nobler, or more authentically expressive of who one wants to be than others. Taylor argues that the capacity for strong evaluation is constitutive of what it means to be a moral agent: it is what allows human beings to reflect on and potentially transform their motivational structures rather than simply acting on whichever desire happens to be strongest at a given moment.`,
    underlineTargets: ['whichever desire happens to be strongest at a given moment'],
    question: `The underlined phrase "whichever desire happens to be strongest at a given moment" primarily serves to`,
    choices: [
      { label: 'A', text: 'describe the behavior of agents capable of strong evaluation' },
      { label: 'B', text: 'characterize the motivational behavior that strong evaluation allows agents to transcend' },
      { label: 'C', text: 'provide an example of the qualitative distinctions involved in strong evaluation' },
      { label: 'D', text: 'suggest that weak evaluations are always selfish and irrational' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is correct. The phrase contrasts with strong evaluation: instead of reflecting on which desires are worthiest, an agent without this capacity merely acts on "whichever desire happens to be strongest." This phrase characterizes the unreflective motivational behavior that strong evaluation enables agents to move beyond.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. The phrase describes agents incapable of or not engaged in strong evaluation, not those who exercise it.`,
      C: `Choice C is incorrect. The phrase is a contrast to strong evaluation, not an example of it.`,
      D: `Choice D is incorrect. The passage does not describe weak evaluations as selfish or irrational; it simply says they rank preferences by intensity rather than by qualitative worth.`,
    },
  },

  {
    id: 'rw2h-08',
    section: 'reading-writing',
    moduleId: 'rw-module-2-hard',
    domain: 'Craft and Structure',
    skill: 'Text Structure and Purpose',
    difficulty: 'hard',
    stimulus: `Recent studies in epigenetics have challenged the once-firm boundary between nature and nurture by demonstrating that environmental experiences can alter gene expression without changing the underlying DNA sequence. Exposure to stress, malnutrition, or trauma can add chemical tags to DNA or to the histone proteins around which DNA is wound, toggling genes on or off in ways that affect physiology, behavior, and vulnerability to disease. In some organisms, these epigenetic modifications have been shown to persist across generations — though the extent to which this occurs in humans remains an active area of research and debate.`,
    question: `The final clause — "though the extent to which this occurs in humans remains an active area of research and debate" — primarily functions to`,
    choices: [
      { label: 'A', text: 'refute the claim that environmental experiences can alter gene expression in humans' },
      { label: 'B', text: 'introduce a caveat limiting how broadly the multigenerational finding applies' },
      { label: 'C', text: 'suggest that epigenetics is a less credible field than classical genetics' },
      { label: 'D', text: 'argue that human epigenetics requires more government funding for research' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is correct. The clause comes after the claim that epigenetic modifications can persist across generations "in some organisms." The final clause limits this finding by noting that the human case is uncertain and contested, making it a qualifying caveat that restricts how far the preceding claim can be extended.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. The clause limits the generational persistence claim, not the broader claim that environments can alter gene expression in humans, which was established earlier in the passage.`,
      C: `Choice C is incorrect. The passage presents epigenetics positively throughout; the caveat is about one specific question, not about the field's credibility.`,
      D: `Choice D is incorrect. The clause describes the research status of a question, not a funding argument.`,
    },
  },

  // ── Cross-Text Connections (2) ─────────────────────────────────────────────

  {
    id: 'rw2h-09',
    section: 'reading-writing',
    moduleId: 'rw-module-2-hard',
    domain: 'Craft and Structure',
    skill: 'Cross-Text Connections',
    difficulty: 'medium',
    stimulus: `Text 1: Some anthropologists argue that the cognitive demands of large-scale social living drove the evolution of human intelligence. On this "social brain" hypothesis, the unusually large neocortex of Homo sapiens evolved primarily to track complex social relationships, manage alliances and rivalries, and understand the mental states of other individuals — capacities that would have conferred significant survival advantages in group-living species.

Text 2: Critics of the social brain hypothesis note that several non-social species, including some solitary predators and tool-using birds, exhibit cognitive abilities that are difficult to account for purely through social complexity. They propose instead that ecological challenges — such as locating and processing novel food sources in variable environments — placed the primary selective pressure on intelligence, with social complexity being a consequence rather than a cause of cognitive expansion.`,
    question: `Based on the passages, the author of Text 2 would most likely argue that the social brain hypothesis`,
    choices: [
      { label: 'A', text: 'is supported by the cognitive abilities observed in solitary predators' },
      { label: 'B', text: 'overestimates the selective importance of social complexity relative to ecological challenges' },
      { label: 'C', text: 'correctly identifies social living as the only plausible driver of human intelligence' },
      { label: 'D', text: 'has been confirmed by comparative studies of neocortex size across species' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is correct. Text 2 argues that ecological challenges, not social complexity, were the primary driver of intelligence, and that social complexity may have been a consequence of, not a cause for, cognitive expansion. This directly challenges the hypothesis of Text 1 by suggesting it overestimates the role of social selection.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. Text 2 uses solitary predators' cognitive abilities as evidence against the social brain hypothesis, not in support of it.`,
      C: `Choice C is incorrect. Text 2 explicitly disputes social living as the primary driver, making this claim the opposite of what the author argues.`,
      D: `Choice D is incorrect. Text 2 does not confirm the hypothesis; it challenges it by proposing an alternative explanation.`,
    },
  },

  {
    id: 'rw2h-10',
    section: 'reading-writing',
    moduleId: 'rw-module-2-hard',
    domain: 'Craft and Structure',
    skill: 'Cross-Text Connections',
    difficulty: 'hard',
    stimulus: `Text 1: The literary theorist Cleanth Brooks argued that the meaning of a great poem cannot be adequately paraphrased without fundamental loss. A poem's meaning is inseparable from its form — the specific arrangement of sounds, rhythms, images, and ironies through which it realizes its meaning. Attempting to extract the poem's "message" in prose destroys the very thing that makes the poem significant.

Text 2: The philosopher Monroe Beardsley countered that the distinction between literary form and content is not as absolute as formalists like Brooks suggest. While a poem's formal properties undeniably shape its effect, it remains possible to identify propositional content — claims that are asserted or implied — that survives translation into different wordings and can be evaluated as true or false, insightful or banal.`,
    question: `Which of the following, if true, would most directly strengthen the argument made in Text 2?`,
    choices: [
      { label: 'A', text: 'Scholars regularly produce accurate prose summaries of Shakespeare\'s plays that audiences find useful.' },
      { label: 'B', text: 'Translators of poetry consistently report that rhyme schemes are impossible to preserve across languages.' },
      { label: 'C', text: 'Two readers who produce different prose paraphrases of the same poem may both have understood it correctly.' },
      { label: 'D', text: 'Formal properties such as meter and assonance have been shown to influence readers\' emotional responses.' },
    ],
    correctAnswer: 'A',
    explanation: `Choice A is correct. Text 2 argues that some separable propositional content survives translation into different wording. If scholars can produce accurate prose summaries of Shakespeare's plays that are genuinely useful to audiences, this supports the idea that separable content (distinct from formal properties) can be extracted and conveyed — strengthening Beardsley's position against Brooks's formalism.`,
    wrongAnswerExplanations: {
      B: `Choice B is incorrect. This observation about translation difficulty supports Brooks's argument (in Text 1) that form and content are inseparable, not Beardsley's argument in Text 2.`,
      C: `Choice C is incorrect. The possibility of multiple valid paraphrases suggests variability in paraphrase, which does not directly strengthen the claim that extractable propositional content exists.`,
      D: `Choice D is incorrect. This shows formal properties influence emotional response — a point consistent with Text 1's formalism — and does not address whether separable propositional content exists.`,
    },
  },

  // ── Central Ideas and Details (3) ─────────────────────────────────────────

  {
    id: 'rw2h-11',
    section: 'reading-writing',
    moduleId: 'rw-module-2-hard',
    domain: 'Information and Ideas',
    skill: 'Central Ideas and Details',
    difficulty: 'medium',
    stimulus: `In the early twentieth century, the Harlem Renaissance transformed American cultural life by producing an extraordinary flowering of Black literature, art, and music that challenged prevailing racist stereotypes and asserted the vitality and complexity of African American experience. Writers including Langston Hughes, Countee Cullen, and Nella Larsen used poetry, fiction, and autobiography to explore questions of identity, migration, and racial politics with formal ambition and aesthetic originality. The movement was fueled in part by the Great Migration, which brought hundreds of thousands of Black Americans from the rural South to northern cities, creating concentrated urban communities with the resources and audience to sustain a literary culture.`,
    question: `Which statement best describes the relationship between the Harlem Renaissance and the Great Migration as presented in the passage?`,
    choices: [
      { label: 'A', text: 'The Great Migration was an unintended consequence of the Harlem Renaissance.' },
      { label: 'B', text: 'The Great Migration contributed to the conditions that made the Harlem Renaissance possible.' },
      { label: 'C', text: 'The Harlem Renaissance and the Great Migration were entirely unrelated phenomena.' },
      { label: 'D', text: 'The Harlem Renaissance caused the Great Migration by inspiring Black Americans to move north.' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is correct. The passage states that the Harlem Renaissance "was fueled in part by the Great Migration," which created urban communities with the resources and audience necessary for literary culture to develop. This establishes the Great Migration as a contributing condition for the Renaissance.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. The passage presents the Great Migration as preceding and enabling the Renaissance, not as something the Renaissance caused.`,
      C: `Choice C is incorrect. The passage explicitly connects the two, describing the Great Migration as a fuel source for the Renaissance.`,
      D: `Choice D is incorrect. The passage describes the Great Migration happening first and enabling the Renaissance, not the reverse.`,
    },
  },

  {
    id: 'rw2h-12',
    section: 'reading-writing',
    moduleId: 'rw-module-2-hard',
    domain: 'Information and Ideas',
    skill: 'Central Ideas and Details',
    difficulty: 'hard',
    stimulus: `The concept of "satisficing," introduced by the economist Herbert Simon, describes a decision-making strategy in which agents seek outcomes that are good enough rather than optimal. Simon argued that fully rational optimization — surveying all possible options and selecting the one that maximizes a given utility function — is computationally impossible for real human beings operating under conditions of incomplete information and cognitive limitations. Satisficing, by contrast, sets an aspiration level and adopts the first option that meets or exceeds it, a strategy that is both cognitively feasible and often nearly as effective as optimization in practical terms.`,
    question: `According to the passage, which of the following best explains why Simon considers satisficing more realistic than optimization?`,
    choices: [
      { label: 'A', text: 'Satisficing always produces better outcomes than optimization in competitive markets.' },
      { label: 'B', text: 'Human cognitive limitations and incomplete information make exhaustive optimization impractical.' },
      { label: 'C', text: 'Setting an aspiration level eliminates the need for any rational deliberation.' },
      { label: 'D', text: 'Optimization strategies have been shown to produce outcomes that most people find morally objectionable.' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is correct. The passage states that "fully rational optimization...is computationally impossible for real human beings operating under conditions of incomplete information and cognitive limitations." This is the explicit reason Simon considers optimization unrealistic and satisficing a more practical alternative.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. The passage does not claim satisficing produces better outcomes than optimization; it says it is "often nearly as effective," implying optimization might still be superior if achievable.`,
      C: `Choice C is incorrect. Satisficing still involves rational deliberation — setting aspiration levels and evaluating options — it just does not require exhaustive comparison.`,
      D: `Choice D is incorrect. The passage makes no ethical argument about the moral acceptability of optimization outcomes.`,
    },
  },

  {
    id: 'rw2h-13',
    section: 'reading-writing',
    moduleId: 'rw-module-2-hard',
    domain: 'Information and Ideas',
    skill: 'Central Ideas and Details',
    difficulty: 'hard',
    stimulus: `The astronomer Cecilia Payne-Gaposchkin's 1925 doctoral dissertation proposed that hydrogen and helium — not iron or other metals, as was then widely assumed — were the dominant elements in the Sun and other stars. Her analysis drew on the newly developed framework of quantum mechanics to interpret stellar spectra, correctly identifying the pattern of spectral lines with specific atomic states. Her supervisor, the influential astronomer Henry Norris Russell, initially persuaded her to include a disclaimer calling her findings "almost certainly not real," only to publish the same conclusion four years later, receiving much of the subsequent credit. The episode has since become emblematic of the systemic barriers faced by women in early-twentieth-century science.`,
    question: `The episode described in the passage is presented primarily as an example of`,
    choices: [
      { label: 'A', text: 'how quantum mechanics was first applied to stellar astrophysics' },
      { label: 'B', text: 'the institutional obstacles that prevented women scientists from receiving appropriate credit for their work' },
      { label: 'C', text: 'the importance of mentorship in developing scientific talent' },
      { label: 'D', text: 'why hydrogen is the most common element in the universe' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is correct. The passage describes how Payne-Gaposchkin was pressured to disavow her correct finding, which was then published by her supervisor who received the credit. The final sentence explicitly frames this as "emblematic of systemic barriers faced by women in science" — making gender-based institutional obstacles the central lesson.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. While the passage mentions quantum mechanics, the episode's purpose is not to illustrate the methodology of applying quantum mechanics to stars.`,
      C: `Choice C is incorrect. The passage presents Russell's behavior as obstructive, not as a positive example of mentorship.`,
      D: `Choice D is incorrect. Hydrogen's abundance is part of the discovery described, not the lesson the passage draws from the episode.`,
    },
  },

  // ── Command of Evidence (4) ────────────────────────────────────────────────

  {
    id: 'rw2h-14',
    section: 'reading-writing',
    moduleId: 'rw-module-2-hard',
    domain: 'Information and Ideas',
    skill: 'Command of Evidence',
    difficulty: 'medium',
    stimulus: `A researcher wants to support the argument that international trade agreements have reduced tariff rates significantly over the past seven decades. Which quotation from an economics publication would most directly support this claim?`,
    question: `Which quotation from an economics publication would most directly support this claim?`,
    choices: [
      { label: 'A', text: '"Average global tariff rates on manufactured goods fell from approximately 40% in 1947 to under 5% by 2010, a decline driven primarily by successive rounds of multilateral trade negotiations."' },
      { label: 'B', text: '"Trade agreements have generated controversy in both advanced economies and developing nations, with critics arguing that labor and environmental provisions are insufficiently enforced."' },
      { label: 'C', text: '"The volume of global merchandise trade has expanded roughly 300-fold since World War II."' },
      { label: 'D', text: '"Regional trade blocs such as the European Union have reduced internal tariffs while maintaining external trade barriers."' },
    ],
    correctAnswer: 'A',
    explanation: `Choice A is correct. This quotation directly states that average global tariff rates fell dramatically from 40% to under 5% over approximately seven decades and attributes this decline to multilateral trade agreements — a direct and quantified support for the researcher's specific claim.`,
    wrongAnswerExplanations: {
      B: `Choice B is incorrect. This addresses enforcement controversies rather than whether tariff rates have fallen.`,
      C: `Choice C is incorrect. Trade volume expansion is a different metric from tariff rates and does not directly show that agreements reduced tariffs.`,
      D: `Choice D is incorrect. This describes regional blocs' behavior toward internal tariffs and external barriers but does not quantify the overall reduction in tariff rates.`,
    },
  },

  {
    id: 'rw2h-15',
    section: 'reading-writing',
    moduleId: 'rw-module-2-hard',
    domain: 'Information and Ideas',
    skill: 'Command of Evidence',
    difficulty: 'hard',
    stimulus: `A political scientist is arguing that voter turnout in national elections is positively correlated with the perceived closeness of the race. Which evidence would most directly support this claim?

The table below shows turnout rates for five national elections.

Election | Margin of Victory (% points) | Voter Turnout (%)
Election 1 | 2 | 74
Election 2 | 8 | 64
Election 3 | 15 | 55
Election 4 | 3 | 72
Election 5 | 18 | 51`,
    question: `Which statement best uses the data in the table to support the political scientist's argument?`,
    choices: [
      { label: 'A', text: 'Elections with small margins of victory had the highest voter turnout, while elections with large margins had the lowest.' },
      { label: 'B', text: 'Election 1 had the smallest margin of victory of the five elections studied.' },
      { label: 'C', text: 'Voter turnout was above 70% in two of the five elections.' },
      { label: 'D', text: 'The largest margin of victory in the dataset was 18 percentage points.' },
    ],
    correctAnswer: 'A',
    explanation: `Choice A is correct. The table shows a clear inverse relationship between margin of victory and turnout: Elections 1 and 4, with margins of 2 and 3 points, had turnouts of 74% and 72%; Elections 3 and 5, with margins of 15 and 18 points, had turnouts of 55% and 51%. Stating this pattern directly supports the claim that closer races drive higher turnout.`,
    wrongAnswerExplanations: {
      B: `Choice B is incorrect. This is a true but isolated fact that does not describe the relationship between closeness and turnout.`,
      C: `Choice C is incorrect. This notes a threshold without connecting it to the margin of victory.`,
      D: `Choice D is incorrect. Reporting the maximum margin of victory as an isolated fact does not support a claim about a correlation between closeness and turnout.`,
    },
  },

  {
    id: 'rw2h-16',
    section: 'reading-writing',
    moduleId: 'rw-module-2-hard',
    domain: 'Information and Ideas',
    skill: 'Command of Evidence',
    difficulty: 'hard',
    stimulus: `A sociologist wants to challenge the claim that social mobility in the United States has declined significantly over the past fifty years. Which quotation would most directly support the sociologist's challenge?`,
    question: `Which quotation would most directly support a challenge to the claim that U.S. social mobility has declined significantly over the past fifty years?`,
    choices: [
      { label: 'A', text: '"The share of children who earn more than their parents has fallen from approximately 90% for children born in 1940 to around 50% for those born in 1980."' },
      { label: 'B', text: '"Income inequality in the United States, as measured by the Gini coefficient, has increased substantially since the 1970s."' },
      { label: 'C', text: '"When absolute mobility is adjusted for changes in cost of living and consumption patterns, children born in the 1980s appear to have maintained living standards comparable to or exceeding those of their parents."' },
      { label: 'D', text: '"Intergenerational earnings correlations in the United States are higher than in most other developed nations, suggesting less relative mobility."' },
    ],
    correctAnswer: 'C',
    explanation: `Choice C is correct. The sociologist wants to challenge the "significant decline" claim. This quotation provides an alternative measurement approach — adjusting for cost of living and consumption — that shows comparable or higher living standards, directly undermining the claim of a significant mobility decline.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. This quotation actually supports the claim that social mobility has declined, showing a drop from 90% to 50% in absolute mobility.`,
      B: `Choice B is incorrect. Rising income inequality is often cited as evidence that mobility has declined, not as a challenge to that claim.`,
      D: `Choice D is incorrect. This supports the idea that U.S. relative mobility is low compared to other countries, reinforcing rather than challenging the decline narrative.`,
    },
  },

  {
    id: 'rw2h-17',
    section: 'reading-writing',
    moduleId: 'rw-module-2-hard',
    domain: 'Information and Ideas',
    skill: 'Command of Evidence',
    difficulty: 'hard',
    stimulus: `A neuroscientist is writing a paper arguing that the default mode network (DMN) — a set of brain regions active during mind-wandering and self-referential thought — plays a role in creative cognition as well as in daydreaming. Which of the following pieces of evidence would most directly support this argument?`,
    question: `Which evidence most directly supports the claim that the default mode network is involved in creative cognition?`,
    choices: [
      { label: 'A', text: 'fMRI scans showing that the DMN is reliably deactivated during focused problem-solving tasks that require sustained attention' },
      { label: 'B', text: 'fMRI data revealing that highly creative individuals show stronger co-activation of the DMN and executive control networks during creative tasks than less creative individuals' },
      { label: 'C', text: 'Research demonstrating that people spend approximately 47% of their waking hours engaged in mind-wandering' },
      { label: 'D', text: 'Studies showing that DMN activity is elevated in individuals with depression and anxiety disorders' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is correct. This evidence directly links DMN activity to creative performance: highly creative individuals show more DMN engagement during creative tasks than less creative individuals, supporting the claim that the DMN plays a role in creative cognition.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. This shows the DMN is deactivated during focused tasks, not that it contributes to creative cognition.`,
      C: `Choice C is incorrect. Mind-wandering frequency data establishes how often the DMN is engaged but does not connect it to creativity.`,
      D: `Choice D is incorrect. Elevated DMN activity in depression and anxiety connects the network to psychiatric conditions, not to creative cognition.`,
    },
  },

  // ── Inferences (3) ────────────────────────────────────────────────────────

  {
    id: 'rw2h-18',
    section: 'reading-writing',
    moduleId: 'rw-module-2-hard',
    domain: 'Information and Ideas',
    skill: 'Inferences',
    difficulty: 'medium',
    stimulus: `The transition from hunter-gatherer societies to settled agricultural communities, which began approximately 10,000 years ago in the Fertile Crescent, is sometimes described as a straightforward advance in human wellbeing. Archaeological evidence complicates this narrative. Skeletal analysis shows that early farmers were, on average, shorter and had more nutritional deficiencies than their hunter-gatherer predecessors, suggesting that reliance on a narrow range of calorie-dense but micronutrient-poor crops had adverse health consequences. Meanwhile, living in proximity to domesticated animals facilitated the transmission of new infectious diseases to human populations.`,
    question: `Based on the passage, it can most reasonably be inferred that the author of the passage believes`,
    choices: [
      { label: 'A', text: 'agriculture was, on balance, harmful to human civilization' },
      { label: 'B', text: 'the transition to agriculture involved tradeoffs that the "straightforward advance" narrative overlooks' },
      { label: 'C', text: 'hunter-gatherers had better lives in every measurable respect than early farmers' },
      { label: 'D', text: 'infectious disease was not a concern for hunter-gatherer societies' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is correct. The author notes that the transition "is sometimes described as a straightforward advance" but then introduces archaeological evidence showing health costs. The word "complicates" signals the author's view that reality was more nuanced — involving both advances and setbacks — which is a tradeoff the simple narrative misses.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. The author complicates the positive narrative but does not argue that agriculture was net harmful. "Complicates" implies adding nuance, not reversing the assessment.`,
      C: `Choice C is incorrect. The passage shows hunter-gatherers were taller and had fewer deficiencies, but it does not claim they were better off "in every measurable respect."`,
      D: `Choice D is incorrect. The passage does not discuss disease rates among hunter-gatherers; it only notes that proximity to domesticated animals created new disease transmission opportunities for farmers.`,
    },
  },

  {
    id: 'rw2h-19',
    section: 'reading-writing',
    moduleId: 'rw-module-2-hard',
    domain: 'Information and Ideas',
    skill: 'Inferences',
    difficulty: 'hard',
    stimulus: `In 1973, the psychologists David Rosenhan and his colleagues published a study in which mentally healthy individuals were admitted to psychiatric hospitals after feigning a single symptom. Once admitted, they behaved entirely normally, yet staff continued to interpret ordinary behaviors as signs of mental illness. A pseudopatient who took notes was recorded in clinical charts as displaying "writing behavior." The study found that genuine psychiatric patients, who recognized the pseudopatients as healthy outsiders, were far more accurate in their assessments than the professionals who diagnosed the pseudopatients.`,
    question: `Based on the passage, what can most reasonably be inferred about the professionals described in the Rosenhan study?`,
    choices: [
      { label: 'A', text: 'They were motivated primarily by financial incentives to keep patients hospitalized.' },
      { label: 'B', text: 'Their initial diagnostic labels shaped how they subsequently interpreted the pseudopatients\' behaviors.' },
      { label: 'C', text: 'They were more skilled than actual patients at recognizing who was genuinely ill.' },
      { label: 'D', text: 'Their errors resulted from insufficient training in psychiatric diagnostic criteria.' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is correct. The passage shows that after admitting the pseudopatients, professionals interpreted perfectly normal behaviors as symptoms of illness. This pattern — where the initial diagnosis ("this person is ill") colored all subsequent observation — strongly supports the inference that diagnostic labels biased how professionals interpreted what they saw.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. The passage does not mention financial incentives or economic motivations for the professionals' errors.`,
      C: `Choice C is incorrect. The passage explicitly states that actual patients outperformed professionals in recognizing the pseudopatients as healthy.`,
      D: `Choice D is incorrect. The passage does not attribute the errors to insufficient training; the explanation is more likely systematic perceptual bias from existing diagnoses.`,
    },
  },

  {
    id: 'rw2h-20',
    section: 'reading-writing',
    moduleId: 'rw-module-2-hard',
    domain: 'Information and Ideas',
    skill: 'Inferences',
    difficulty: 'hard',
    stimulus: `The concept of "the tragedy of the commons," popularized by the ecologist Garrett Hardin in 1968, describes how individually rational resource exploitation can collectively destroy a shared resource. If herders using common grazing land each have an incentive to add one more animal — since the benefit accrues to them while the overgrazing cost is shared — the commons will eventually be depleted. Hardin argued that the solution required either privatization of the resource or government regulation. The political economist Elinor Ostrom later demonstrated empirically that many communities worldwide had developed stable local governance institutions that sustainably managed common resources for centuries without either privatization or state control.`,
    question: `Based on the passage, Ostrom's research most likely challenged Hardin's argument by showing that`,
    choices: [
      { label: 'A', text: 'the tragedy of the commons never actually occurs in real economies' },
      { label: 'B', text: 'community self-governance represents a viable third path beyond privatization and state control' },
      { label: 'C', text: 'privatization of common resources is always more efficient than community management' },
      { label: 'D', text: 'government regulation is the only effective mechanism for preventing resource depletion' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is correct. Hardin argued only two solutions exist (privatization or government control). Ostrom found communities that managed commons successfully without either — demonstrating a third option that Hardin's framework excluded. This is a direct empirical challenge to his claimed exhaustiveness of solutions.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. Ostrom did not deny that commons can be depleted; she showed that communities can prevent it, which is a different claim.`,
      C: `Choice C is incorrect. Ostrom's point was that community institutions can work, not that privatization is superior.`,
      D: `Choice D is incorrect. Ostrom showed that successful management occurred without state control, which is precisely what contradicts this claim.`,
    },
  },

  // ── Rhetorical Synthesis (2) ──────────────────────────────────────────────

  {
    id: 'rw2h-21',
    section: 'reading-writing',
    moduleId: 'rw-module-2-hard',
    domain: 'Expression of Ideas',
    skill: 'Rhetorical Synthesis',
    difficulty: 'medium',
    stimulus: `A student is writing a research paper on urban heat islands and has compiled the following notes:
• Dark surfaces like asphalt and roofing absorb significantly more solar radiation than vegetation, raising surface temperatures.
• Studies in Phoenix, Arizona found that urban core temperatures can be up to 8°C higher than surrounding suburban areas on summer evenings.
• Increased urban temperatures raise energy demand for air conditioning, which increases electricity consumption and greenhouse gas emissions.
• Urban trees and green spaces can reduce local temperatures through shading and evapotranspiration.`,
    question: `The student wants to highlight the self-reinforcing nature of the urban heat island effect. Which choice most effectively uses the notes to accomplish this goal?`,
    choices: [
      { label: 'A', text: 'Phoenix\'s urban core can be up to 8°C warmer than surrounding areas during summer evenings.' },
      { label: 'B', text: 'Heat-absorbing surfaces raise urban temperatures, which in turn increases air conditioning demand, producing emissions that further warm the climate.' },
      { label: 'C', text: 'Urban trees and green spaces can reduce local temperatures through shading and evapotranspiration.' },
      { label: 'D', text: 'Urban heat islands are caused by the prevalence of dark surfaces in city environments.' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is correct. The student wants to highlight the self-reinforcing cycle, which requires linking the heat island (from dark surfaces) to increased air conditioning demand, which produces emissions that worsen warming. Only choice B describes this feedback loop.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. This presents a data point about Phoenix but does not describe the self-reinforcing cycle.`,
      C: `Choice C is incorrect. This describes a mitigation strategy, not the self-reinforcing nature of the problem.`,
      D: `Choice D is incorrect. This identifies a cause but does not capture the self-amplifying feedback that makes the effect particularly concerning.`,
    },
  },

  {
    id: 'rw2h-22',
    section: 'reading-writing',
    moduleId: 'rw-module-2-hard',
    domain: 'Expression of Ideas',
    skill: 'Rhetorical Synthesis',
    difficulty: 'hard',
    stimulus: `A student writing about the philosophy of science has taken the following notes:
• Karl Popper argued that a scientific theory is valid only if it makes predictions that could, in principle, be proven false by experiment.
• Thomas Kuhn argued that science does not progress through steady accumulation but through revolutionary "paradigm shifts" — abrupt reorganizations of the entire conceptual framework of a discipline.
• Paul Feyerabend argued that there is no single scientific method; successful science has employed a wide variety of procedures, and rigid adherence to any one method can impede discovery.
• All three thinkers wrote primarily in the mid-to-late twentieth century and responded directly to one another's work.`,
    question: `The student wants to write a sentence for a section arguing that philosophers of science in the twentieth century disagreed about what distinguishes genuine science from other forms of inquiry. Which choice most effectively uses the notes to accomplish this goal?`,
    choices: [
      { label: 'A', text: 'Popper, Kuhn, and Feyerabend all wrote in the mid-to-late twentieth century and engaged with each other\'s ideas.' },
      { label: 'B', text: 'Thomas Kuhn argued that science advances through paradigm shifts rather than steady accumulation of knowledge.' },
      { label: 'C', text: 'Twentieth-century philosophers including Popper, Kuhn, and Feyerabend offered competing accounts of what makes a discipline scientific, disagreeing on whether science requires falsifiability, proceeds by paradigm shifts, or even follows a consistent method at all.' },
      { label: 'D', text: 'Paul Feyerabend believed that any single scientific method could become an obstacle to discovery.' },
    ],
    correctAnswer: 'C',
    explanation: `Choice C is correct. The student wants to show that these thinkers disagreed about what distinguishes science. Only choice C captures all three philosophers, summarizes their distinct positions, and frames their disagreement — making it the most effective sentence for the stated purpose.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. It establishes historical context (they were contemporaries who engaged with each other) but does not convey any of their substantive disagreements.`,
      B: `Choice B is incorrect. It covers only Kuhn's view and does not introduce the diversity of competing positions.`,
      D: `Choice D is incorrect. It covers only Feyerabend's position and does not illustrate the broader disagreement among the three thinkers.`,
    },
  },

  // ── Transitions (2) ──────────────────────────────────────────────────────

  {
    id: 'rw2h-23',
    section: 'reading-writing',
    moduleId: 'rw-module-2-hard',
    domain: 'Expression of Ideas',
    skill: 'Transitions',
    difficulty: 'medium',
    stimulus: `Classical economists held that wages and prices were flexible enough to adjust automatically to equilibrium, meaning that an economy experiencing a downturn would self-correct as falling wages attracted new investment and rising employment. _______, during the Great Depression, wages and prices proved stubbornly resistant to downward adjustment, and the economy did not self-correct without massive government intervention.`,
    question: `Which choice completes the text with the most logical transition?`,
    choices: [
      { label: 'A', text: 'Therefore' },
      { label: 'B', text: 'In other words' },
      { label: 'C', text: 'In practice, however' },
      { label: 'D', text: 'Similarly' },
    ],
    correctAnswer: 'C',
    explanation: `Choice C is correct. The first sentence describes a theoretical prediction (automatic self-correction). The second sentence introduces real-world evidence from the Great Depression that contradicted this prediction. "In practice, however" signals both the shift from theory to practice and the contrast between prediction and reality.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. "Therefore" would indicate that the Great Depression was a consequence of the classical view, but the sentence describes evidence contradicting that view.`,
      B: `Choice B is incorrect. "In other words" signals a restatement or clarification of the preceding point, but the second sentence is a counterexample, not a restatement.`,
      D: `Choice D is incorrect. "Similarly" would indicate that the two sentences describe parallel situations, but the second sentence contradicts the theoretical prediction in the first.`,
    },
  },

  {
    id: 'rw2h-24',
    section: 'reading-writing',
    moduleId: 'rw-module-2-hard',
    domain: 'Expression of Ideas',
    skill: 'Transitions',
    difficulty: 'hard',
    stimulus: `Scholars in the tradition of cultural psychology have argued that cognitive processes previously assumed to be universal — such as analytic reasoning, categorization strategies, and attention patterns — vary systematically across cultures. _______, researchers have proposed that individuals raised in East Asian cultures tend to attend more holistically to contextual information, while those raised in Western cultures tend to focus more analytically on individual objects.`,
    question: `Which choice completes the text with the most logical transition?`,
    choices: [
      { label: 'A', text: 'Nevertheless' },
      { label: 'B', text: 'For instance' },
      { label: 'C', text: 'On the contrary' },
      { label: 'D', text: 'In conclusion' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is correct. The first sentence makes a general claim (cognitive processes vary across cultures). The second sentence provides a specific example of this variation (East Asian vs. Western attention patterns). "For instance" introduces an illustrative example of a preceding general claim.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. "Nevertheless" signals a contrast or qualification, but the second sentence supports and illustrates the first rather than contradicting it.`,
      C: `Choice C is incorrect. "On the contrary" introduces a direct contradiction of the previous statement, but the second sentence is consistent with and illustrative of the first.`,
      D: `Choice D is incorrect. "In conclusion" signals a summary at the end of an argument, which does not fit the mid-passage relationship between these two sentences.`,
    },
  },

  // ── Boundaries (2) ──────────────────────────────────────────────────────

  {
    id: 'rw2h-25',
    section: 'reading-writing',
    moduleId: 'rw-module-2-hard',
    domain: 'Standard English Conventions',
    skill: 'Boundaries',
    difficulty: 'medium',
    stimulus: `The sociologist Émile Durkheim proposed that suicide — typically considered an intensely personal act — was in fact shaped by social forces _______ his analysis showed systematic variation in suicide rates across different types of social integration and regulation.`,
    question: `Which choice completes the text so that it conforms to the conventions of Standard English?`,
    choices: [
      { label: 'A', text: ': his analysis' },
      { label: 'B', text: ', his analysis' },
      { label: 'C', text: 'his analysis' },
      { label: 'D', text: 'and his analysis' },
    ],
    correctAnswer: 'A',
    explanation: `Choice A is correct. A colon can introduce a clause that explains or elaborates on the preceding independent clause. Here, Durkheim's analysis showing systematic social variation is the explanation or evidence for the claim that suicide is shaped by social forces. A colon correctly joins these two independent clauses in an explanatory relationship.`,
    wrongAnswerExplanations: {
      B: `Choice B is incorrect. Using only a comma to join two independent clauses creates a comma splice.`,
      C: `Choice C is incorrect. Joining two independent clauses with no punctuation creates a run-on sentence.`,
      D: `Choice D is incorrect. "And" joins two equal clauses without indicating that the second explains the first, making the logical relationship between the clauses less clear than the colon.`,
    },
  },

  {
    id: 'rw2h-26',
    section: 'reading-writing',
    moduleId: 'rw-module-2-hard',
    domain: 'Standard English Conventions',
    skill: 'Boundaries',
    difficulty: 'hard',
    stimulus: `The city's urban planning commission approved three proposals last Tuesday _______ the construction of a riverside park, the expansion of the light rail system, and the establishment of a commercial district in the former industrial zone.`,
    question: `Which choice completes the text so that it conforms to the conventions of Standard English?`,
    choices: [
      { label: 'A', text: ':' },
      { label: 'B', text: ',' },
      { label: 'C', text: ';' },
      { label: 'D', text: '— which included' },
    ],
    correctAnswer: 'A',
    explanation: `Choice A is correct. A colon is the correct punctuation to introduce a list or enumeration that follows and specifies an antecedent claim. "Three proposals" announces that items will follow, and the colon formally introduces the list.`,
    wrongAnswerExplanations: {
      B: `Choice B is incorrect. A comma here would weakly connect "three proposals" to the list without the clarity that a colon provides for formal enumeration.`,
      C: `Choice C is incorrect. A semicolon separates independent clauses or items in a complex list, but it does not correctly introduce a list following a complete independent clause.`,
      D: `Choice D is incorrect. "Which included" is a relative clause requiring that the antecedent "proposals" be followed by "which" — but rewriting the sentence this way creates awkward syntax and unnecessary wordiness.`,
    },
  },

  // ── Form, Structure, and Sense (1) ────────────────────────────────────────

  {
    id: 'rw2h-27',
    section: 'reading-writing',
    moduleId: 'rw-module-2-hard',
    domain: 'Standard English Conventions',
    skill: 'Form, Structure, and Sense',
    difficulty: 'hard',
    stimulus: `The research team's findings, _______ initially met with considerable skepticism by peer reviewers, have since been replicated in six independent laboratories across three continents.`,
    question: `Which choice completes the text so that it conforms to the conventions of Standard English?`,
    choices: [
      { label: 'A', text: 'which were' },
      { label: 'B', text: 'which was' },
      { label: 'C', text: 'that were' },
      { label: 'D', text: 'having been' },
    ],
    correctAnswer: 'A',
    explanation: `Choice A is correct. The relative clause modifies "findings," which is the plural noun. The relative pronoun "which" correctly introduces a nonrestrictive clause (set off by commas), and "were" agrees in number with the plural antecedent "findings."`,
    wrongAnswerExplanations: {
      B: `Choice B is incorrect. "Which was" uses a singular verb that does not agree with the plural noun "findings."`,
      C: `Choice C is incorrect. "That were" uses a restrictive relative pronoun, which requires no surrounding commas. Since the clause is set off by commas in the sentence, "which" (nonrestrictive) is required.`,
      D: `Choice D is incorrect. "Having been met with skepticism" is a participial phrase that could be grammatically placed here, but it changes the structure significantly and creates an awkward, run-on participial chain when the full sentence is read.`,
    },
  },
]
