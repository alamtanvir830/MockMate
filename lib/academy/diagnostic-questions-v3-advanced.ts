// Advanced Module 2: 22 hard questions for students routing to the hard path (score ≥ 15/22 on Module 1).
// These questions are intentionally difficult: multiple plausible distractors, two-step reasoning,
// subtle rhetorical relationships, and vocabulary dependent on full context.
//
// Keep this file free of browser-only APIs so it runs safely in the Edge runtime.
// Every question here is original and self-contained.

import type { DrillQuestion } from './types'

// Advanced Module 2: 22 questions (for students routing to hard path)
export const DIAGNOSTIC_V3_M2_ADVANCED_QUESTIONS: DrillQuestion[] = [
  // ── 1. words-in-context (hard) ───────────────────────────────────────────────
  {
    id: 'diag3-m2a-001',
    skillSlug: 'words-in-context',
    difficulty: 'hard',
    stimulus:
      'Adapted from a 2023 science journalism piece.\n\nThe climate model did not merely predict rainfall totals; it [RESOLVED] precipitation into its component processes, identifying which portion came from convective storms and which from slow-moving frontal systems. This granularity let researchers pinpoint exactly where and why earlier models had gone wrong.',
    question: 'As used in the text, [RESOLVED] most nearly means',
    choices: [
      { label: 'A', text: 'settled' },
      { label: 'B', text: 'decided' },
      { label: 'C', text: 'separated' },
      { label: 'D', text: 'strengthened' },
    ],
    correctAnswer: 'C',
    explanation:
      '"Resolved" has many meanings, but the passage describes the model breaking precipitation into its component processes — convective storms versus frontal systems. This is the optical/analytical sense of "resolve," meaning to separate into distinct parts (as a lens resolves an image into detail). The word "granularity" in the next sentence reinforces this sense of fine-grained separation.',
    wrongAnswerExplanations: {
      A: '"Settled" is the most common meaning of "resolved" (as in "settled a dispute"), but nothing in the passage is in dispute; the model is performing an analytical act, not resolving a conflict.',
      B: '"Decided" also comes from the dispute-settling sense but implies a choice between options; the model is decomposing data, not making a decision.',
      D: '"Strengthened" is plausible because a refined model might seem stronger, but the passage stresses separation of components, not increased power.',
    },
    teachingPoint:
      'When a familiar word is used in a technical or analytical context, look for the specific action being described. "Resolved into component parts" is the scientific sense (like optical resolution), distinct from "resolved a conflict."',
    contentVersion: 3,
  },

  // ── 2. boundaries (hard) ─────────────────────────────────────────────────────
  {
    id: 'diag3-m2a-002',
    skillSlug: 'boundaries',
    difficulty: 'hard',
    stimulus:
      'The exhibition\'s centerpiece is a four-panel screen painted in 1889 ______ the artist completed it in Pont-Aven, where she had moved to escape the noise of Paris, and critics at the time considered it her finest achievement.',
    question:
      'Which choice completes the text so that it conforms to the conventions of Standard Written English?',
    choices: [
      { label: 'A', text: '; the artist' },
      { label: 'B', text: ', and the artist' },
      { label: 'C', text: '; however, the artist' },
      { label: 'D', text: ', the artist' },
    ],
    correctAnswer: 'A',
    explanation:
      'The sentence has two independent clauses: "The exhibition\'s centerpiece is a four-panel screen painted in 1889" and "the artist completed it in Pont-Aven… and critics… considered it her finest achievement." A semicolon correctly joins two independent clauses. Choice A supplies the semicolon without adding any conjunctive adverb, which is appropriate because no contrast or logical relation beyond sequence is needed.',
    wrongAnswerExplanations: {
      B: 'Choice B uses a comma before "and," but "and" here would link the second clause to the first without making the relationship clear; more importantly, the second clause already contains its own "and" joining two predicates ("completed it" and "critics considered it"), making "and the artist" awkward and ambiguous in structure.',
      C: '"However" signals contrast, but the second clause does not contrast with the first — it elaborates on the screen\'s provenance and reception. Using "however" misrepresents the logical relationship.',
      D: 'A comma alone before a second independent clause creates a comma splice, which is a punctuation error.',
    },
    teachingPoint:
      'Identify whether both sides of the blank are independent clauses before choosing punctuation. A semicolon alone joins two independent clauses when no specific logical relationship (contrast, cause, result) needs signaling.',
    contentVersion: 3,
  },

  // ── 3. central-ideas-details (hard) ──────────────────────────────────────────
  {
    id: 'diag3-m2a-003',
    skillSlug: 'central-ideas-details',
    difficulty: 'hard',
    stimulus:
      'Historian Amara Osei argues that the rapid spread of iron-smelting technology across sub-Saharan Africa before 500 BCE challenges the long-standing view that iron use diffused southward from North Africa. Osei points to excavated furnaces in Tanzania and Nigeria dated to roughly the same period as the earliest North African sites. Because independent invention would explain simultaneous development better than gradual diffusion, Osei concludes that iron-working likely arose in multiple African regions concurrently rather than spreading from a single source.',
    question: 'Which choice best states the main claim Osei makes in the text?',
    choices: [
      { label: 'A', text: 'Furnaces excavated in Tanzania and Nigeria are older than any iron-smelting sites discovered in North Africa.' },
      { label: 'B', text: 'North African iron-working sites have been incorrectly dated by earlier historians.' },
      { label: 'C', text: 'The diffusion model of technology spread is generally unreliable when applied to ancient African history.' },
      { label: 'D', text: 'Iron-smelting technology most likely developed independently in several African regions at roughly the same time.' },
    ],
    correctAnswer: 'D',
    explanation:
      'Osei\'s conclusion, stated explicitly in the final sentence, is that iron-working "likely arose in multiple African regions concurrently rather than spreading from a single source." Choice D captures this claim of independent, simultaneous development. The excavated furnaces are the evidence supporting this claim, not the claim itself.',
    wrongAnswerExplanations: {
      A: 'This misreads the evidence. Osei says the African sites are "dated to roughly the same period" as North African sites — not that they are older. Choosing A confuses a distorted version of the evidence with the actual claim.',
      B: 'Osei never accuses earlier historians of incorrect dating; the challenge is to the directional interpretation (south from North Africa), not to the dates themselves.',
      C: 'Osei challenges one specific application of the diffusion model, not the model\'s general reliability across all ancient African history. This choice overgeneralizes beyond what the text says.',
    },
    teachingPoint:
      'Distinguish the author\'s main claim from the evidence used to support it. Evidence (the furnace dates) is not the same as the conclusion those dates are used to argue for (independent development in multiple regions).',
    contentVersion: 3,
  },

  // ── 4. form-structure-sense (hard) ───────────────────────────────────────────
  {
    id: 'diag3-m2a-004',
    skillSlug: 'form-structure-sense',
    difficulty: 'hard',
    stimulus:
      'Trained as a marine engineer, the redesigned hull achieved a 12 percent reduction in drag while keeping structural weight under budget.',
    question:
      'Which choice best corrects the underlined portion so that the sentence conforms to the conventions of Standard Written English?',
    choices: [
      { label: 'A', text: 'Trained as a marine engineer, the redesigned hull achieved' },
      { label: 'B', text: 'Having been trained as a marine engineer, the hull\'s redesign achieved' },
      { label: 'C', text: 'Trained as a marine engineer, the lead designer achieved a hull redesign that showed' },
      { label: 'D', text: 'Because the marine engineer was trained, the redesigned hull achieved' },
    ],
    correctAnswer: 'C',
    explanation:
      'The original sentence has a dangling modifier: "Trained as a marine engineer" must logically modify a person, but the grammatical subject that follows is "the redesigned hull," which cannot be a marine engineer. Choice C places "the lead designer" immediately after the modifying phrase, so the person being described matches the modifier.',
    wrongAnswerExplanations: {
      A: 'This is the original phrasing and still dangles: a hull cannot be trained as a marine engineer.',
      B: '"The hull\'s redesign" is a noun phrase referring to an engineering outcome, not a person — it still cannot have been trained as a marine engineer, so the dangling modifier error persists.',
      D: 'Changing "trained" to a because-clause removes the participial phrase but creates an awkward causal claim (being trained is the reason the hull achieved a reduction, which misattributes the action to the hull again).',
    },
    teachingPoint:
      'A participial modifier at the start of a sentence must be followed immediately by the noun it describes. If that noun cannot logically perform the action in the modifier, the modifier is dangling and the subject must change.',
    contentVersion: 3,
  },

  // ── 5. text-structure-purpose (hard) ─────────────────────────────────────────
  {
    id: 'diag3-m2a-005',
    skillSlug: 'text-structure-purpose',
    difficulty: 'hard',
    stimulus:
      'Ecologist Dr. Yuki Tanaka has spent fifteen years cataloguing the soil fungi of old-growth forests. She recently announced that the same fungal networks she studies in Japanese cedar forests appear in structurally similar form in ancient cedar forests of the Pacific Northwest. Other researchers immediately noted that Tanaka had not yet sequenced the fungi\'s DNA, meaning the visual similarities might reflect convergent evolution rather than shared ancestry.',
    question: 'What is the primary purpose of the final sentence?',
    choices: [
      { label: 'A', text: 'To suggest that Tanaka\'s fieldwork methods are generally unreliable' },
      { label: 'B', text: 'To identify a limitation in Tanaka\'s evidence that leaves her conclusion open to an alternative interpretation' },
      { label: 'C', text: 'To explain why Pacific Northwest forests are better studied than Japanese cedar forests' },
      { label: 'D', text: 'To confirm that convergent evolution is more common than shared ancestry in fungi' },
    ],
    correctAnswer: 'B',
    explanation:
      'The final sentence does not attack Tanaka\'s methods broadly; it identifies a specific gap — no DNA sequencing — and explains what alternative interpretation that gap leaves open: the similarities could be convergent evolution rather than shared ancestry. This is a targeted limitation on her current evidence, not a general indictment of her work.',
    wrongAnswerExplanations: {
      A: 'The sentence identifies one gap (no DNA data), not a broad reliability problem with her fieldwork. "Generally unreliable" overstates what other researchers said.',
      C: 'The final sentence says nothing about which forest type is better studied; it addresses the evidentiary gap in Tanaka\'s announcement.',
      D: 'The sentence raises convergent evolution as a possible alternative explanation, not as a confirmed more-common phenomenon. It does not endorse or confirm anything about the relative frequency of convergent evolution.',
    },
    teachingPoint:
      'When the final sentence introduces other researchers\' responses, ask what specific function that response performs: here it qualifies the previous claim by pointing to missing evidence, not by attacking the entire study.',
    contentVersion: 3,
  },

  // ── 6. transitions (hard) ────────────────────────────────────────────────────
  {
    id: 'diag3-m2a-006',
    skillSlug: 'transitions',
    difficulty: 'hard',
    stimulus:
      'The first photographic surveys of the deep sea floor revealed a landscape that scientists had assumed would be barren and featureless. ______ the surveys documented thousands of previously unknown species living in pitch darkness under crushing pressure, suggesting that life adapts to conditions far more extreme than biologists had believed possible.',
    question:
      'Which choice most logically connects the two sentences?',
    choices: [
      { label: 'A', text: 'Similarly,' },
      { label: 'B', text: 'Therefore,' },
      { label: 'C', text: 'Instead,' },
      { label: 'D', text: 'Specifically,' },
    ],
    correctAnswer: 'C',
    explanation:
      'The first sentence says scientists expected the sea floor to be "barren and featureless." The second sentence reveals the opposite: thousands of previously unknown species. The relationship is contrast — reality replaced the assumption. "Instead" signals that what follows replaces or contradicts what preceded it, which is exactly the logical relationship here.',
    wrongAnswerExplanations: {
      A: '"Similarly" signals that the second sentence will parallel the first, but the second sentence contradicts the expectation set up in the first.',
      B: '"Therefore" signals that the second sentence is a logical consequence of the first, but finding life is not a consequence of expecting barrenness — it is a contradiction of it.',
      D: '"Specifically" signals that the second sentence provides a detailed example of the first sentence\'s claim. The first sentence describes an expectation; the second doesn\'t detail that expectation — it overturns it.',
    },
    teachingPoint:
      'Before choosing a transition, identify the logical relationship precisely. When sentence 2 directly contradicts the expectation set in sentence 1, choose a contrast word ("instead," "however," "yet"), not a consequence or similarity word.',
    contentVersion: 3,
  },

  // ── 7. command-of-evidence (hard) ────────────────────────────────────────────
  {
    id: 'diag3-m2a-007',
    skillSlug: 'command-of-evidence',
    difficulty: 'hard',
    stimulus:
      'Sociologist Dr. Ines Carvalho claims that flexible remote-work policies reduce voluntary employee turnover more than salary increases do. She supports this by citing her longitudinal survey of 4,000 workers at mid-sized firms conducted between 2018 and 2023.',
    question:
      'Which finding from Carvalho\'s survey would most directly support her specific claim?',
    choices: [
      { label: 'A', text: 'Workers who received salary increases of more than 10 percent reported higher overall job satisfaction than those who did not.' },
      { label: 'B', text: 'Employees at firms that introduced flexible remote-work options left their jobs voluntarily at lower rates than employees at firms that instead raised salaries by a comparable cost to the employer.' },
      { label: 'C', text: 'Remote work was available at 68 percent of mid-sized firms surveyed, a proportion that grew steadily from 2018 to 2023.' },
      { label: 'D', text: 'Voluntary turnover declined across most industries during the five-year survey period regardless of company policy.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Carvalho\'s claim has two specific elements: (1) flexible remote-work policies reduce voluntary turnover, AND (2) they do so more than salary increases. Only Choice B directly tests both parts by comparing turnover rates between firms that chose remote-work options and firms that instead raised salaries, holding employer cost comparable.',
    wrongAnswerExplanations: {
      A: 'This addresses job satisfaction after salary increases, not voluntary turnover, and does not compare remote work to salary increases. It supports a related but different claim.',
      C: 'The prevalence of remote-work availability tracks how common the policy is, but it says nothing about whether it reduces turnover more than salary increases do.',
      D: 'If turnover declined across all industries regardless of policy, that would actually undermine Carvalho\'s claim that remote-work policies specifically caused lower turnover — it suggests external factors, not policy, drove the change.',
    },
    teachingPoint:
      'When a claim has two components (remote work reduces turnover AND more than salary increases), supporting evidence must address BOTH components. Evidence that speaks to only one component or to a related outcome (satisfaction, not turnover) only partially supports the claim.',
    contentVersion: 3,
  },

  // ── 8. rhetorical-synthesis (hard) ───────────────────────────────────────────
  {
    id: 'diag3-m2a-008',
    skillSlug: 'rhetorical-synthesis',
    difficulty: 'hard',
    stimulus:
      'A student is writing a paper arguing that urban parks improve public health outcomes. The student wants to use the following notes to support a specific claim: that while parks provide documented health benefits, those benefits are not equally distributed across income levels.\n\nNote 1: A 2022 meta-analysis found that proximity to green space is associated with lower rates of anxiety and cardiovascular disease.\n\nNote 2: In cities with the lowest median incomes, parkland per capita is 40 percent lower than in the wealthiest districts (Trust for Public Land, 2023).\n\nNote 3: A Chicago study found that residents who lived within a 10-minute walk of a park visited green spaces 3× more often than those living farther away.',
    question:
      'Which sentence best uses the notes to accomplish the student\'s specific goal?',
    choices: [
      { label: 'A', text: 'Urban parks improve health outcomes for city residents by reducing anxiety and cardiovascular disease, as confirmed by a 2022 meta-analysis.' },
      { label: 'B', text: 'Because lower-income urban neighborhoods have 40 percent less parkland per capita than wealthy ones, the health benefits that green space provides — including reduced anxiety and cardiovascular disease — disproportionately reach higher-income residents.' },
      { label: 'C', text: 'Residents who live within a 10-minute walk of a park visit green spaces three times more often, which helps explain why proximity to parks matters for public health.' },
      { label: 'D', text: 'Urban parks are an effective but underutilized public health tool, particularly because city planners often lack the funding needed to expand green space in dense neighborhoods.' },
    ],
    correctAnswer: 'B',
    explanation:
      'The student\'s goal is to acknowledge that parks have real health benefits (Note 1) while also showing those benefits are not equally distributed across income levels (Note 2). Choice B synthesizes both notes: it cites the health benefits from Note 1 and then uses Note 2\'s income-inequality data to show that lower-income residents have less access, meaning the benefits reach them less. This directly accomplishes the stated rhetorical goal.',
    wrongAnswerExplanations: {
      A: 'Choice A uses only Note 1 and states the benefit without acknowledging the unequal distribution. It fulfills the general health-benefits claim but ignores the inequality component of the goal.',
      C: 'Choice C uses only Note 3 (proximity drives visitation) without connecting to health benefits or income inequality. It is relevant background but does not accomplish the specific goal.',
      D: 'Choice D invents information (city planners lacking funding) that does not appear in any of the three notes. Synthesis must be grounded in the provided notes.',
    },
    teachingPoint:
      'Rhetorical-synthesis questions require you to identify which notes together accomplish a specific dual goal. Map each component of the goal to a note, then find the choice that uses both relevant notes without distorting either.',
    contentVersion: 3,
  },

  // ── 9. quantitative-evidence (hard) ──────────────────────────────────────────
  {
    id: 'diag3-m2a-009',
    skillSlug: 'quantitative-evidence',
    difficulty: 'hard',
    stimulus:
      'A researcher studying bee colony decline reports that colonies treated with a new probiotic supplement showed a 31 percent lower winter die-off rate compared to untreated colonies. However, the researcher notes that the probiotic\'s effect was substantially smaller in regions where average winter temperatures dropped below −10 °C, where the treated colonies showed only an 8 percent improvement over untreated ones. The researcher concludes that the probiotic is most reliably effective in moderate-winter climates.\n\n[Table: Winter Die-off Rates]\nRegion Type | Treated Colonies | Untreated Colonies\nModerate winter (above −10 °C) | 18% | 49%\nHarsh winter (below −10 °C) | 41% | 49%',
    question:
      'Which choice most accurately uses data from the table to support the researcher\'s conclusion about where the probiotic is most reliably effective?',
    choices: [
      { label: 'A', text: 'In moderate-winter regions, treated colonies had a die-off rate of 18 percent, compared to 41 percent for treated colonies in harsh-winter regions.' },
      { label: 'B', text: 'In harsh-winter regions, untreated colonies had a 49 percent die-off rate, compared to 18 percent for treated colonies in moderate-winter regions.' },
      { label: 'C', text: 'The probiotic reduced die-off rates in both region types, since treated colonies in both moderate and harsh winters had lower rates than untreated colonies in the same regions.' },
      { label: 'D', text: 'Untreated colonies had the same die-off rate (49 percent) in both region types, while treated colonies fared far better in moderate-winter regions (18 percent) than in harsh-winter regions (41 percent).' },
    ],
    correctAnswer: 'D',
    explanation:
      'The researcher\'s conclusion is specifically that the probiotic is most reliably effective in moderate-winter climates. To support this claim, evidence must show that the effect is larger in moderate winters than in harsh winters. Choice D does this precisely: it holds the baseline constant (untreated colonies at 49 percent in both regions) and shows that the treatment produced a dramatic drop to 18 percent in moderate regions but only to 41 percent in harsh regions — directly demonstrating the greater effectiveness in moderate climates.',
    wrongAnswerExplanations: {
      A: 'Comparing treated colonies in the two regions (18% vs. 41%) shows that treated colonies did better in moderate climates, but without mentioning the untreated baseline, it is unclear how much of the difference is due to the probiotic versus the climate itself. The baseline context is essential to the argument.',
      B: 'This compares untreated harsh-winter colonies (49%) with treated moderate-winter colonies (18%), mixing region types in a way that does not isolate the probiotic\'s effect from climate effects. The comparison is confounded.',
      C: 'This says the probiotic reduced die-off in both regions — which is true but does not support the claim that moderate winters show greater effectiveness. It actually downplays the regional difference, which is the key point.',
    },
    teachingPoint:
      'When a conclusion compares the size of an effect across two conditions, the best supporting data holds one variable constant (the baseline) and varies the other (treatment). Look for the choice that isolates the variable being argued about.',
    contentVersion: 3,
  },

  // ── 10. inferences (hard) ────────────────────────────────────────────────────
  {
    id: 'diag3-m2a-010',
    skillSlug: 'inferences',
    difficulty: 'hard',
    stimulus:
      'In ancient Rome, the grain dole — free monthly distributions of wheat to citizens — was initially a political tool used by populist leaders to build loyalty among the urban poor. Over time, however, the program became administratively entrenched: emperors who considered reducing it faced immediate riots, and the bureaucracy devoted to managing the dole grew too large and specialized to be easily dismantled. By the second century CE, the dole was consuming roughly 15 percent of the imperial budget.',
    question:
      'What can most reasonably be inferred from the text about the grain dole\'s political function over time?',
    choices: [
      { label: 'A', text: 'The grain dole eventually became more of a fiscal constraint on imperial governance than a flexible political instrument.' },
      { label: 'B', text: 'Roman emperors deliberately expanded the grain dole to prevent citizen uprisings throughout the empire.' },
      { label: 'C', text: 'The grain dole was the primary cause of the financial difficulties that led to Rome\'s eventual decline.' },
      { label: 'D', text: 'Once the grain dole was established, no Roman leader ever considered ending it.' },
    ],
    correctAnswer: 'A',
    explanation:
      'The text describes a shift: the dole began as a tool leaders could deploy for political gain, but it became "administratively entrenched," provoked riots when leaders tried to reduce it, and consumed 15 percent of the budget. Together these details support the inference that the dole evolved from a flexible instrument into a fiscal and political constraint — something that constrained rulers rather than empowering them.',
    wrongAnswerExplanations: {
      B: 'The text says emperors faced riots when they considered reducing the dole, not that they deliberately expanded it to prevent uprisings. Deliberate expansion is not stated or implied; the entrenchment was structural, not intentional strategic expansion.',
      C: '"Primary cause" of Rome\'s decline is far beyond what the text supports. The text mentions the dole consumed 15 percent of the budget — a significant cost — but says nothing about it causing Rome\'s eventual fall.',
      D: '"No leader ever considered ending it" overstates the text. The passage explicitly says emperors "considered reducing it," which means they did consider it — they just faced riots when they did.',
    },
    teachingPoint:
      'A valid inference follows from evidence already in the text without adding unsupported causal claims or absolute language. Verify that the inference neither overstates ("primary cause," "never") nor ignores details the passage explicitly states.',
    contentVersion: 3,
  },

  // ── 11. cross-text-connections (hard) ────────────────────────────────────────
  {
    id: 'diag3-m2a-011',
    skillSlug: 'cross-text-connections',
    difficulty: 'hard',
    stimulus:
      'Text 1\nPsychologist Miriam Voss argues that decision fatigue — the degradation of decision quality after extended periods of choice-making — primarily results from glucose depletion in the prefrontal cortex. She cites experiments showing that subjects who consumed glucose drinks after a long series of decisions regained performance equivalent to rested subjects.\n\nText 2\nA 2021 review of the decision-fatigue literature found that glucose supplementation does not consistently restore decision quality across different experimental designs. The reviewers conclude that decision fatigue is better understood as a motivational phenomenon: people begin to conserve cognitive effort when they perceive a task as unimportant or unending, not because their brains have literally run low on fuel.',
    question:
      'How does the author of Text 2 respond to the position represented in Text 1?',
    choices: [
      { label: 'A', text: 'By arguing that decision fatigue is not a real phenomenon and that Voss\'s experiments were methodologically flawed' },
      { label: 'B', text: 'By confirming that glucose is the primary driver of decision fatigue but noting that supplementation is impractical' },
      { label: 'C', text: 'By extending Voss\'s glucose hypothesis to account for motivational factors as well' },
      { label: 'D', text: 'By accepting that decision fatigue exists but offering an alternative explanation for its cause' },
    ],
    correctAnswer: 'D',
    explanation:
      'Text 2 does not deny that decision fatigue occurs; it accepts that performance degrades after extended decision-making. What it disputes is the cause: Text 1 attributes it to glucose depletion, while Text 2 argues it is a motivational phenomenon driven by perceived task importance. This is disagreement about mechanism, not existence — a qualification or alternative explanation, not a wholesale rejection.',
    wrongAnswerExplanations: {
      A: 'Text 2 never says decision fatigue is not real, and it does not describe Voss\'s experiments as methodologically flawed; it says glucose supplementation "does not consistently restore" performance, which is a challenge to the explanation, not the phenomenon.',
      B: 'Text 2 explicitly rejects glucose as the primary driver, concluding instead that motivation is the explanation. "Confirming" glucose as the primary driver directly contradicts what Text 2 says.',
      C: 'Text 2 replaces the glucose hypothesis with a motivational one; it does not extend or add to Voss\'s framework. The two models are offered as alternatives, not complements.',
    },
    teachingPoint:
      'Cross-text questions often involve one text accepting a phenomenon while disputing the cause. Distinguish "disagrees that it exists" from "accepts it exists but explains it differently." The latter is a qualified response, not a rebuttal.',
    contentVersion: 3,
  },

  // ── 12. words-in-context (hard) — HARDEST VARIANT ────────────────────────────
  {
    id: 'diag3-m2a-012',
    skillSlug: 'words-in-context',
    difficulty: 'hard',
    stimulus:
      'Adapted from a scholarly review of nineteenth-century criticism.\n\nEarly reviewers of the novel found its [ECONOMY] of language almost offensive: each sentence carried a weight of implication that demanded re-reading, and the absence of explanatory commentary left readers responsible for their own conclusions. Far from sparing the reader effort, this style multiplied it.',
    question: 'As used in the text, [ECONOMY] most nearly means',
    choices: [
      { label: 'A', text: 'thrift' },
      { label: 'B', text: 'efficiency' },
      { label: 'C', text: 'scarcity' },
      { label: 'D', text: 'parsimony' },
    ],
    correctAnswer: 'C',
    explanation:
      'The passage describes a style marked by the "absence of explanatory commentary" and sentences that carry heavy implication without elaboration. The reviewers found this almost offensive. "Economy" in this context means a deliberate absence or sparseness of words — scarcity of language. While "thrift," "efficiency," and "parsimony" are all near-synonyms of economy in its resource-management sense, the passage emphasizes not that the writing was admirably efficient but that what was missing (commentary, explanation) imposed a burden on the reader. "Scarcity" best captures the notion of something notably absent.',
    wrongAnswerExplanations: {
      A: '"Thrift" implies wise or admirable restraint with resources. The passage frames the style negatively ("almost offensive," "multiplied effort"), so a positively-valenced synonym doesn\'t fit the tone.',
      B: '"Efficiency" suggests achieving the goal with minimal waste, implying a positive outcome. But the passage says this economy did not spare the reader effort — it multiplied it. That contradicts the idea of efficiency, which implies achieving results easily.',
      D: '"Parsimony" is very close to the right answer and is a common literary term for verbal economy. However, parsimony often carries a connotation of excessive stinginess that implies a flaw of withholding too much; "scarcity" better describes the neutral fact of what is absent (commentary, explanation) as observed by critics, without implying excessive withholding as a motive.',
    },
    teachingPoint:
      'When four choices are all near-synonyms of the target word, use the connotation and the passage\'s tone to eliminate. Ask: does the passage frame the quality positively, negatively, or neutrally? Match connotation first, then precise meaning.',
    contentVersion: 3,
  },

  // ── 13. boundaries (hard) — HARDEST VARIANT ──────────────────────────────────
  {
    id: 'diag3-m2a-013',
    skillSlug: 'boundaries',
    difficulty: 'hard',
    stimulus:
      'The committee had studied the proposal for months ______ it ultimately recommended rejection, citing three unresolved concerns about long-term cost and two about regulatory compliance.',
    question:
      'Which choice completes the text so that it conforms to the conventions of Standard Written English?',
    choices: [
      { label: 'A', text: '; nevertheless,' },
      { label: 'B', text: '; consequently,' },
      { label: 'C', text: ', yet' },
      { label: 'D', text: ': nonetheless,' },
    ],
    correctAnswer: 'A',
    explanation:
      'The sentence has two independent clauses with a contrast relationship: studying the proposal for months might lead one to expect approval, but the committee recommended rejection. A semicolon followed by the conjunctive adverb "nevertheless" (meaning "in spite of that") correctly joins two independent clauses while signaling the contrast. The conjunctive adverb must be followed by a comma, and choice A provides that format.',
    wrongAnswerExplanations: {
      B: '"Consequently" signals a result: the committee studied the proposal and as a consequence recommended rejection. But studying a proposal for months does not logically cause rejection; the relationship is contrast, not consequence.',
      C: 'A comma before "yet" (a coordinating conjunction) can join two independent clauses, and "yet" does signal contrast — making C plausible. However, "nevertheless" is more precise for this context because it specifically concedes a prior action (months of study) before the contrasting outcome, whereas "yet" is a general contrast. On the SAT, when a semicolon + conjunctive adverb option and a comma + coordinating conjunction option are both grammatically valid, the correct answer is typically the one that best signals the logical relationship; here "nevertheless" matches the concessive structure more precisely.',
      D: 'A colon introduces explanation, elaboration, or a list that follows from a preceding independent clause. The second clause here is a contrasting outcome, not an explanation of the first clause, so a colon misrepresents the relationship.',
    },
    teachingPoint:
      'When both a semicolon + conjunctive adverb and a comma + coordinating conjunction are grammatically valid, choose the one whose logical force precisely matches the relationship. "Nevertheless" and "nonetheless" signal concession + contrast (despite X, Y); "yet" signals simple contrast without the concessive nuance.',
    contentVersion: 3,
  },

  // ── 14. central-ideas-details (hard) — HARDEST VARIANT ───────────────────────
  {
    id: 'diag3-m2a-014',
    skillSlug: 'central-ideas-details',
    difficulty: 'hard',
    stimulus:
      'Linguist Dr. Fatima Nkosi contends that language shift — the process by which communities abandon their heritage language in favor of a dominant one — is driven primarily by economic incentives rather than cultural pressure. She notes that in communities where the dominant language unlocks higher-paying jobs and educational advancement, parents consistently choose to raise children in that language even when they express pride in their heritage tongue. Communities in which the heritage language carries comparable economic value, however, tend to maintain it across generations.',
    question: 'Which choice best identifies Nkosi\'s main claim and correctly distinguishes it from the evidence she uses?',
    choices: [
      { label: 'A', text: 'Nkosi claims that parents in economically pressured communities choose to raise children in the dominant language; this is supported by the observation that heritage-language communities with equal economic value maintain their language.' },
      { label: 'B', text: 'Nkosi claims that economic incentives are the primary driver of language shift; she supports this by noting parental choices in unequal economic contexts and the contrasting persistence of heritage languages where economic value is comparable.' },
      { label: 'C', text: 'Nkosi claims that cultural pressure causes language shift; the economic evidence is additional context rather than the central argument.' },
      { label: 'D', text: 'Nkosi claims that language shift is inevitable when dominant languages offer more educational opportunities; parental pride in heritage languages is the only counterforce.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Nkosi\'s main claim is that economic incentives (not cultural pressure) drive language shift. She supports this with two pieces of evidence: parents choose the dominant language when it offers greater economic value, and communities maintain heritage languages when those languages hold comparable economic value. Choice B accurately names the claim and correctly labels both evidence points as supporting detail.',
    wrongAnswerExplanations: {
      A: 'Choice A accurately describes one piece of evidence (parental choices) and one contrasting detail (heritage persistence with equal value), but it presents a detail — what parents do — as the claim itself. The actual claim is about what drives those parental decisions, namely economic incentives.',
      C: 'This directly inverts Nkosi\'s argument. She contends cultural pressure is NOT the driver; economic incentives are. Choosing C would mean misreading the text\'s central argument.',
      D: 'Choice D introduces the word "inevitable," which Nkosi never uses or implies. She also does not describe parental cultural pride as the only counterforce; instead, she says communities maintain heritage languages when economic value is comparable — an economic condition, not just emotional pride.',
    },
    teachingPoint:
      'Identifying a main claim requires locating what the author asserts as an overarching conclusion, then checking that you are not substituting a piece of supporting evidence for the claim itself. A claim answers "what does the author argue?" not "what does the author observe?"',
    contentVersion: 3,
  },

  // ── 15. form-structure-sense (hard) — HARDEST VARIANT ────────────────────────
  {
    id: 'diag3-m2a-015',
    skillSlug: 'form-structure-sense',
    difficulty: 'hard',
    stimulus:
      'The conference proceedings recognized contributions from three leaders in the field: Dr. Aisha Mensah for her work in vaccine logistics, Dr. Yusuf Chen for developing the cold-chain monitoring system, and the award for public communication went to Dr. Priya Okafor.',
    question:
      'Which choice best corrects the sentence so that it conforms to the conventions of Standard Written English?',
    choices: [
      { label: 'A', text: 'Dr. Aisha Mensah for her work in vaccine logistics, Dr. Yusuf Chen for developing the cold-chain monitoring system, and the award for public communication went to Dr. Priya Okafor.' },
      { label: 'B', text: 'Dr. Aisha Mensah for her work in vaccine logistics, Dr. Yusuf Chen for developing the cold-chain monitoring system, and Dr. Priya Okafor for her work in public communication.' },
      { label: 'C', text: 'Dr. Aisha Mensah for her work in vaccine logistics, Dr. Yusuf Chen who developed the cold-chain monitoring system, and Dr. Priya Okafor for her work in public communication.' },
      { label: 'D', text: 'Dr. Aisha Mensah for vaccine logistics work, Dr. Yusuf Chen for the cold-chain monitoring system\'s development, and Dr. Priya Okafor, who received the award for public communication.' },
    ],
    correctAnswer: 'B',
    explanation:
      'The original sentence lists three items in a series introduced by "three leaders in the field," but the third item breaks the parallel structure: items 1 and 2 follow the pattern "[Name] for [contribution]," while item 3 switches to "[award] went to [Name]," inserting a predicate where a noun phrase is expected. Choice B restores the parallel pattern: all three items follow "[Name] for [contribution]."',
    wrongAnswerExplanations: {
      A: 'This is the original phrasing; the third list item still uses a full predicate clause ("the award… went to Dr. Okafor") that breaks the parallel structure.',
      C: 'Choice C introduces a relative clause ("who developed") for the second item but keeps a prepositional phrase ("for her work") for the other two. This creates a different but still inconsistent parallel structure.',
      D: 'Choice D varies all three structures: "for vaccine logistics work," "for the cold-chain monitoring system\'s development," and "who received the award." While each element is grammatically acceptable on its own, the series is not parallel; the third item again uses a relative clause distinct from the prepositional-phrase pattern of the first two.',
    },
    teachingPoint:
      'In a list of three or more items, all items must follow the same grammatical form. Identify the pattern set by the first item ([Name] for [noun phrase]) and check that subsequent items match it exactly.',
    contentVersion: 3,
  },

  // ── 16. text-structure-purpose (hard) — HARDEST VARIANT ──────────────────────
  {
    id: 'diag3-m2a-016',
    skillSlug: 'text-structure-purpose',
    difficulty: 'hard',
    stimulus:
      'Biologist Dr. Laila Fontaine has proposed that certain migratory shorebirds use polarized light at sunset to calibrate their internal magnetic compasses each day before departing on overnight flights. Subsequent experiments have shown that blocking birds\' access to polarized skylight at sunset — while leaving all other cues intact — significantly degrades the accuracy of their orientation. Critics acknowledge these results but point out that the experiments used a single species tested in captivity, conditions that might not reflect the full navigational repertoire of wild populations.',
    question: 'What is the function of the final sentence in relation to the rest of the passage?',
    choices: [
      { label: 'A', text: 'It introduces a new hypothesis about how a different species navigates at night.' },
      { label: 'B', text: 'It concedes the validity of the experimental results while raising a question about their generalizability.' },
      { label: 'C', text: 'It explains why polarized light is a more reliable cue than magnetic compasses for migrating birds.' },
      { label: 'D', text: 'It argues that captive experiments are fundamentally incapable of revealing anything about bird navigation.' },
    ],
    correctAnswer: 'B',
    explanation:
      'The final sentence begins "Critics acknowledge these results" — explicitly conceding that the experimental findings are valid — but then raises the concern that the experiments used a single captive species, which may not represent wild populations. This is a classic concession-plus-limitation move: accept the evidence but question its scope. Choice B captures both parts of this structure.',
    wrongAnswerExplanations: {
      A: 'The final sentence does not introduce any new hypothesis about navigation; it raises a methodological concern about the existing experiment.',
      C: 'The final sentence makes no comparison between polarized light and magnetic compasses; it questions whether single-species captive results generalize, which is a scope issue, not a comparison of cue reliability.',
      D: '"Fundamentally incapable" is far stronger than what the critics claim. They say captive single-species experiments might not "reflect the full navigational repertoire" — a limitation of scope, not a claim that captive experiments are worthless.',
    },
    teachingPoint:
      'When a sentence begins with "critics acknowledge" or any concessive phrase, recognize the two-part move: (1) acceptance of something and (2) a qualification or limitation that follows. The function is concession plus critique, not outright agreement or refutation.',
    contentVersion: 3,
  },

  // ── 17. transitions (hard) — HARDEST VARIANT ─────────────────────────────────
  {
    id: 'diag3-m2a-017',
    skillSlug: 'transitions',
    difficulty: 'hard',
    stimulus:
      'Researchers initially believed that the bacterium survived only in oxygen-free environments. ______ a 2022 study detected thriving colonies in well-oxygenated tidal pools, prompting scientists to reconsider the organism\'s metabolic flexibility.',
    question:
      'Which choice most logically connects the two sentences?',
    choices: [
      { label: 'A', text: 'Accordingly,' },
      { label: 'B', text: 'In addition,' },
      { label: 'C', text: 'Paradoxically,' },
      { label: 'D', text: 'Conversely,' },
    ],
    correctAnswer: 'C',
    explanation:
      'The first sentence establishes an expectation: the bacterium lives only in oxygen-free environments. The second sentence reports the bacterium thriving in oxygen-rich tidal pools — the opposite of the expectation, and a surprising contradiction. "Paradoxically" signals that what follows is surprising or contradictory in light of what preceded it, which matches the relationship here precisely.',
    wrongAnswerExplanations: {
      A: '"Accordingly" means "as a result" or "therefore," signaling that the second sentence follows logically from the first. But finding the bacterium in oxygenated pools is not a logical result of the belief that it lives only in oxygen-free ones — it contradicts that belief.',
      B: '"In addition" signals that the second sentence adds more information in the same direction. The second sentence does not add more evidence for the oxygen-free habitat; it presents contradicting evidence.',
      D: '"Conversely" signals that the second sentence presents the opposite situation from the first. It is close, but "conversely" typically introduces a true mirror-opposite scenario (e.g., "some do X; conversely, others do Y"). Here the issue is that the same bacterium does the opposite of what was expected — a paradox, not a simple contrast between two different situations or groups. "Paradoxically" better captures the self-contradictory quality of the finding.',
    },
    teachingPoint:
      'Distinguish between "conversely" (a simple opposite direction) and "paradoxically" (a surprising contradiction about the same subject that violates a stated expectation). When the same entity does the unexpected opposite of what was believed, "paradoxically" is the more precise choice.',
    contentVersion: 3,
  },

  // ── 18. command-of-evidence (hard) — HARDEST VARIANT ─────────────────────────
  {
    id: 'diag3-m2a-018',
    skillSlug: 'command-of-evidence',
    difficulty: 'hard',
    stimulus:
      'Urban planner Kwame Asante argues that cities that added protected bicycle lanes in their central districts saw measurable reductions in vehicle emissions specifically because cycling commuters replaced short car trips — defined as trips under five kilometers — rather than longer ones.',
    question:
      'Which finding would most directly support Asante\'s specific claim?',
    choices: [
      { label: 'A', text: 'Cities with protected bike lanes reported a 22 percent reduction in total vehicle emissions over five years.' },
      { label: 'B', text: 'In cities with protected bike lanes, the percentage of commuters completing trips under five kilometers by bicycle rose sharply, while the number of such trips made by car fell by nearly the same proportion.' },
      { label: 'C', text: 'Cyclists in cities with protected lanes reported higher satisfaction with their commutes than those without such infrastructure.' },
      { label: 'D', text: 'Cars produce significantly more emissions per kilometer on short trips than on long ones, because engines run less efficiently when cold.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Asante\'s claim has two specific and linked elements: (1) emissions fell because (2) cyclists replaced short car trips specifically (under 5 km), not longer ones. Choice B directly supports both parts: it shows that sub-5-km cycling trips increased while sub-5-km car trips fell by a proportional amount, providing the mechanism Asante describes. It does not just show an emissions outcome; it shows the specific trip-substitution pattern Asante claims caused that outcome.',
    wrongAnswerExplanations: {
      A: 'A general reduction in total vehicle emissions supports the broad idea that bike lanes reduce emissions but does not address whether the reduction came from short-trip substitution specifically. Asante\'s specific claim is about short trips, so this evidence is relevant but not directly supportive of the precise mechanism.',
      C: 'Commuter satisfaction speaks to cyclist experience, not to whether cycling replaced car trips or reduced emissions. This is an unrelated metric.',
      D: 'The fact that short car trips produce more emissions per kilometer is background context that helps explain why replacing short trips would matter, but it does not show that cyclists actually replaced those trips in cities with bike lanes. Context and mechanism are different from evidence that the mechanism occurred.',
    },
    teachingPoint:
      'When a claim specifies both a cause (short-trip substitution) and an outcome (emissions reduction), supporting evidence must show the cause operating, not just the outcome existing. Evidence of the outcome alone leaves the specific mechanism undemonstrated.',
    contentVersion: 3,
  },

  // ── 19. rhetorical-synthesis (hard) — HARDEST VARIANT ────────────────────────
  {
    id: 'diag3-m2a-019',
    skillSlug: 'rhetorical-synthesis',
    difficulty: 'hard',
    stimulus:
      'A student is writing an argument section that must accomplish two things: (1) acknowledge a documented weakness in a particular renewable energy technology and (2) explain why that weakness does not undermine the technology\'s overall viability. The student has the following notes.\n\nNote 1: Solar panels lose approximately 0.5 percent of generating capacity per year due to photovoltaic degradation.\n\nNote 2: A 25-year solar installation retains roughly 88 percent of its original generating capacity at end of life.\n\nNote 3: The levelized cost of solar energy has fallen by 90 percent since 2010, making it cost-competitive with fossil fuels even accounting for degradation.\n\nNote 4: Wind turbines do not degrade in generating capacity in the same way solar panels do.',
    question:
      'Which sentence best accomplishes both of the student\'s rhetorical goals?',
    choices: [
      { label: 'A', text: 'Solar panels lose a small amount of generating capacity each year, but wind turbines do not share this limitation, making wind power a more reliable long-term option.' },
      { label: 'B', text: 'The 90 percent reduction in solar\'s levelized cost since 2010 has made it a leading renewable technology, and its capacity degradation of 0.5 percent per year is an additional factor that investors must account for.' },
      { label: 'C', text: 'Because solar panels retain 88 percent of their capacity after 25 years, degradation is not a meaningful concern for investors considering long-term solar installations.' },
      { label: 'D', text: 'Although solar panels degrade at approximately 0.5 percent per year, a 25-year installation still retains 88 percent of its capacity and remains cost-competitive with fossil fuels given the 90 percent drop in solar\'s levelized cost since 2010.' },
    ],
    correctAnswer: 'D',
    explanation:
      'Goal 1 requires acknowledging the weakness (degradation). Goal 2 requires explaining why that weakness does not undermine overall viability. Choice D does both: "although solar panels degrade at 0.5 percent per year" acknowledges the weakness, and "still retains 88 percent of its capacity and remains cost-competitive" uses Notes 2 and 3 to show why viability is preserved. It synthesizes three notes to accomplish the dual rhetorical goal.',
    wrongAnswerExplanations: {
      A: 'Choice A mentions degradation (Goal 1) but then pivots to wind turbines (Note 4) as the reason not to worry about solar — which means it does not explain why solar\'s own viability is preserved. It sidesteps Goal 2 rather than accomplishing it.',
      B: 'Choice B mentions the cost reduction (Note 3) and the degradation rate (Note 1), but frames the degradation as "an additional factor investors must account for" — which treats it as an ongoing concern rather than explaining why it does not undermine viability. Goal 2 is not accomplished.',
      C: 'Choice C explains why degradation is not serious (88 percent capacity retained, Goal 2) but does not acknowledge degradation as a weakness upfront (Goal 1 requires explicit acknowledgment). Simply stating the retained-capacity figure without first conceding the degradation does not meet the acknowledgment requirement.',
    },
    teachingPoint:
      'When a rhetorical goal has two components (acknowledge X, then counter X), map each component to specific notes. The correct answer must accomplish both components; an answer that handles one and sidesteps the other fails the goal, even if it uses accurate data.',
    contentVersion: 3,
  },

  // ── 20. quantitative-evidence (hard) — HARDEST VARIANT ───────────────────────
  {
    id: 'diag3-m2a-020',
    skillSlug: 'quantitative-evidence',
    difficulty: 'hard',
    stimulus:
      'A public health researcher concludes that the 2019 vaccination campaign in Region X was more effective than the 2018 campaign at preventing disease spread among school-age children specifically, even though overall infection rates fell more steeply in 2018 than in 2019.\n\n[Table: Annual Infection Rates by Age Group, Region X]\nYear | Adults (per 1,000) | School-age children (per 1,000) | Infants (per 1,000)\n2017 (baseline) | 14.2 | 22.8 | 31.4\n2018 | 9.1 | 19.7 | 27.3\n2019 | 8.8 | 13.1 | 28.9',
    question:
      'Which choice most accurately uses data from the table to support the researcher\'s conclusion?',
    choices: [
      { label: 'A', text: 'Overall infection rates across all three age groups fell more in 2018 than in 2019, confirming that the 2018 campaign was broadly more effective.' },
      { label: 'B', text: 'School-age children\'s infection rate fell by 3.1 per 1,000 in 2018 but by 6.6 per 1,000 in 2019, showing a larger reduction in that specific group during the year the researcher identifies as more effective for children.' },
      { label: 'C', text: 'Adult infection rates declined in both years, reaching 8.8 per 1,000 in 2019, the lowest level in the three-year period.' },
      { label: 'D', text: 'The infant infection rate rose from 27.3 in 2018 to 28.9 in 2019, suggesting the 2019 campaign was less effective for at least one age group.' },
    ],
    correctAnswer: 'B',
    explanation:
      'The researcher\'s specific conclusion is that the 2019 campaign was more effective for school-age children specifically. To support this, we need to compare the size of the reduction in school-age children\'s infection rates between the two years. From the table: in 2018, the rate dropped from 22.8 to 19.7, a decrease of 3.1 per 1,000. In 2019, the rate dropped from 19.7 to 13.1, a decrease of 6.6 per 1,000. The 2019 reduction is more than twice as large, directly supporting the claim about that age group.',
    wrongAnswerExplanations: {
      A: 'This supports the opposite conclusion — that the 2018 campaign was broadly more effective — which contradicts the researcher\'s specific claim about the 2019 campaign\'s superiority for children. It also conflates "overall" effectiveness with effectiveness for the specific target group.',
      C: 'Adult infection rates are irrelevant to a claim specifically about school-age children. This choice accurately reads the table but selects data from the wrong column.',
      D: 'The infant infection rate rising in 2019 is an accurate reading of the table, but it undermines rather than supports the researcher\'s conclusion, and it concerns infants, not the school-age children the conclusion specifies.',
    },
    teachingPoint:
      'When a conclusion specifies a particular subgroup (school-age children), the supporting data must come from that subgroup\'s column, and it must show the comparison the conclusion asserts (which year had the larger reduction). Reading from the wrong column, even accurately, does not support the stated claim.',
    contentVersion: 3,
  },

  // ── 21. inferences (hard) — HARDEST VARIANT ──────────────────────────────────
  {
    id: 'diag3-m2a-021',
    skillSlug: 'inferences',
    difficulty: 'hard',
    stimulus:
      'Adapted from a 2024 article on archival research.\n\nThe letters of the composer Valérie Morin, written between 1891 and 1902, survive in remarkably pristine condition. Archivists note that Morin consistently used a high-rag-content paper that is naturally acid-free, and that she stored her correspondence in a sealed cedar chest that inhibits mold and insect activity. By contrast, the letters she received during the same period have almost entirely disintegrated, most of them having been written on the cheap wood-pulp paper that became standard in the 1880s.',
    question:
      'What can most reasonably be inferred from the passage about the survival of Morin\'s outgoing letters?',
    choices: [
      { label: 'A', text: 'Morin intentionally chose high-quality materials because she wanted her letters to be preserved for future scholars.' },
      { label: 'B', text: 'The superior physical condition of Morin\'s outgoing letters is likely attributable to her material choices and storage practices rather than to any quality of the letters\' content.' },
      { label: 'C', text: 'Archivists would not have been able to study Morin\'s correspondence if she had used wood-pulp paper.' },
      { label: 'D', text: 'The survival of Morin\'s outgoing letters is the direct result of better conditions in the cedar chest than were available to the recipients of her letters.' },
    ],
    correctAnswer: 'B',
    explanation:
      'The passage provides two explanations for why Morin\'s letters survived: (1) the acid-free, high-rag paper she used, and (2) the cedar chest storage that inhibits mold and insects. The contrast with the disintegrated received letters — written on cheap wood-pulp paper — reinforces that material quality, not content quality, accounts for the difference in preservation. Choice B infers that physical factors (materials and storage) explain survival, without overstating the evidence or adding unsupported motives.',
    wrongAnswerExplanations: {
      A: 'The passage says nothing about Morin\'s intentions. She may have used high-rag paper simply because it was her preference, or because she could afford it — ascribing a motive of wanting scholarly preservation goes beyond what the text supports.',
      C: '"Would not have been able to study" is too absolute. The passage says received letters have "almost entirely" disintegrated — some fragments may survive. It also does not follow that zero study would be possible with wood-pulp letters; archivists study damaged documents regularly.',
      D: 'The cedar chest explains storage conditions for Morin\'s outgoing letters, but the received letters disintegrated because of their inferior paper quality — not primarily because their storage conditions were worse. The passage attributes received-letter decay to the "cheap wood-pulp paper," not to a stated difference in storage environments.',
    },
    teachingPoint:
      'A valid inference draws on multiple pieces of evidence in the text without adding external motives, absolute claims, or causal attribution that the passage does not support. Check that every word in your chosen inference is grounded in something actually stated.',
    contentVersion: 3,
  },

  // ── 22. cross-text-connections (hard) — HARDEST VARIANT ──────────────────────
  {
    id: 'diag3-m2a-022',
    skillSlug: 'cross-text-connections',
    difficulty: 'hard',
    stimulus:
      'Text 1\nEconomist Dr. Nadia Patel argues that minimum-wage increases above a modest threshold consistently reduce employment among low-skill workers. She draws on studies from the 1990s and 2000s showing that each 10 percent increase in the minimum wage was followed by a 1–3 percent decline in teen employment across U.S. states.\n\nText 2\nA 2019 review of minimum-wage research by economists Cengiz and colleagues examined 138 minimum-wage changes between 1979 and 2016 and found that employment in low-wage jobs did not significantly decline overall. The authors attribute earlier studies\' negative findings to a methodological flaw: those studies used states that did not raise their minimum wage as comparison groups, but those states were already on weaker economic trajectories, making the employment declines appear more severe than the wage increase actually caused.',
    question: 'How would the authors of Text 2 most likely respond to the claim made in Text 1?',
    choices: [
      { label: 'A', text: 'By agreeing that minimum-wage increases reduce employment but arguing the effect is too small to matter for policy.' },
      { label: 'B', text: 'By arguing that Patel\'s evidence does not support her conclusion because the studies she cites used a flawed comparison method that inflated apparent employment declines.' },
      { label: 'C', text: 'By rejecting the use of U.S. state-level data as inherently too variable to produce reliable conclusions about employment.' },
      { label: 'D', text: 'By claiming that teen employment is not an appropriate measure of minimum-wage effects on low-skill workers generally.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Text 2 directly addresses the type of studies Patel relies on — those using non-raising states as comparison groups. The authors of Text 2 argue that this comparison method is flawed because the comparison states were already on weaker economic trajectories, which made employment declines look worse than the wage increase caused. Since Patel\'s claim rests on those studies, the Text 2 authors would challenge her conclusion by undermining the methodological validity of her evidence — not by disputing the conclusion on empirical grounds alone.',
    wrongAnswerExplanations: {
      A: 'Text 2 does not concede that minimum-wage increases reduce employment; it argues that the apparent employment decline in earlier studies was a methodological artifact, not a real effect. The Text 2 authors do not accept even a small negative employment effect.',
      C: 'Text 2 does not critique state-level data as inherently too variable; it uses state-level data itself across 138 wage changes. The critique is about which states were used as comparison groups, not about the data type.',
      D: 'Text 2 does not argue that teen employment is an inappropriate measure. The methodological critique is about the comparison-group selection problem, not about which demographic was studied.',
    },
    teachingPoint:
      'When Text 2 identifies a methodological flaw in earlier research and Text 1\'s author relies on those earlier studies, the Text 2 authors\' response to Text 1 is to challenge the validity of the underlying evidence — not to dispute the conclusion directly or accept it as a smaller effect. Trace the argument to its foundation.',
    contentVersion: 3,
  },
]

export function buildDiagnosticV3M2AdvancedQuestions(): DrillQuestion[] {
  return [...DIAGNOSTIC_V3_M2_ADVANCED_QUESTIONS]
}
