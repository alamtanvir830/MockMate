// Adaptive three-module SAT R&W diagnostic (v3).
// Module 1 (22 questions) is fixed. A student's Module 1 accuracy routes them to
// either the Advanced or the Foundation Module 2 (22 questions each).
// This file contains M1 and M2-Foundation. M2-Advanced lives in a sibling file.
//
// Keep this file free of browser-only APIs so it runs safely in the Edge runtime.
// Every question here is original and self-contained.

import type { DrillQuestion } from './types'

export const DIAGNOSTIC_V3_VERSION = 3

// Students scoring at or above this fraction on Module 1 are routed to the Advanced module.
export const M1_V3_ROUTING_THRESHOLD = 15 / 22 // ≈0.6818

export function routeToM2V3Branch(
  m1Correct: number,
  m1Total: number
): 'foundation' | 'advanced' {
  if (m1Total <= 0) return 'foundation'
  return m1Correct / m1Total >= M1_V3_ROUTING_THRESHOLD ? 'advanced' : 'foundation'
}

// ── Module 1: 22 questions (2 per skill × 11 skills, interleaved) ────────────────
// Order: questions 1–11 are medium (one per skill), questions 12–22 are hard.
export const DIAGNOSTIC_V3_M1_QUESTIONS: DrillQuestion[] = [
  // ── M1-001 · words-in-context · medium ──────────────────────────────────────────
  {
    id: 'diag3-m1-001',
    skillSlug: 'words-in-context',
    difficulty: 'medium',
    stimulus:
      'When the city council unveiled its transportation plan, critics called it [MYOPIC], pointing out that it addressed traffic congestion only for the next five years while ignoring how rapid population growth would affect roads and transit systems over the next three decades.',
    question: 'As used in the text, [MYOPIC] most nearly means',
    choices: [
      { label: 'A', text: 'short-sighted' },
      { label: 'B', text: 'controversial' },
      { label: 'C', text: 'expensive' },
      { label: 'D', text: 'impractical' },
    ],
    correctAnswer: 'A',
    explanation:
      'The critics object that the plan addresses only a five-year window and ignores long-term population growth. This is precisely what "short-sighted" means — focused on the near term and unable to see consequences further ahead.',
    wrongAnswerExplanations: {
      B: '"Controversial" means disputed, but the passage tells us why the critics object (narrow time horizon), not merely that they disagree.',
      C: '"Expensive" concerns cost, which the passage never mentions.',
      D: '"Impractical" means unworkable, but the critics\' specific objection is about time frame, not whether the plan can be implemented.',
    },
    teachingPoint:
      'Words-in-context questions often have a common meaning (here, "myopic" literally means poor eyesight) and a contextual meaning. Anchor to what the surrounding sentences actually say about the concept.',
  },

  // ── M1-002 · boundaries · medium ────────────────────────────────────────────────
  {
    id: 'diag3-m1-002',
    skillSlug: 'boundaries',
    difficulty: 'medium',
    question:
      'The research team collected soil samples from six different depths ______ each sample was then analyzed for nitrogen, phosphorus, and organic carbon content.',
    choices: [
      { label: 'A', text: '; and' },
      { label: 'B', text: ', however,' },
      { label: 'C', text: '; however,' },
      { label: 'D', text: ', and' },
    ],
    correctAnswer: 'D',
    explanation:
      'Both clauses are independent and linked by addition (no contrast). A comma + coordinating conjunction "and" correctly joins two independent clauses. The semicolon in A is redundant when "and" follows. B and C both introduce "however," which implies contrast — but the two clauses describe sequential steps with no logical contrast.',
    wrongAnswerExplanations: {
      A: 'A semicolon already joins two independent clauses on its own; adding "and" after it is redundant and non-standard.',
      B: '"However" signals contrast, but the second clause simply continues the description of what happened to the samples — there is no contrast.',
      C: '"However" is wrong for the same reason as B, and the semicolon placement here creates an awkward structure.',
    },
    teachingPoint:
      'When two independent clauses share an additive relationship, use a comma + coordinating conjunction (FANBOYS). Reserve "however" for genuine contrast.',
  },

  // ── M1-003 · central-ideas-details · medium ─────────────────────────────────────
  {
    id: 'diag3-m1-003',
    skillSlug: 'central-ideas-details',
    difficulty: 'medium',
    stimulus:
      'Anthropologist Dr. Leila Osei studies how urban communities in West Africa adapt traditional craft practices to contemporary markets. Her fieldwork in Accra reveals that artisans who once made pottery exclusively for local ceremonies now shape the same clay into items styled for export — vases, decorative tiles, and tableware. Osei argues that this shift is not a loss of culture but rather an expansion of it: artisans embed cultural symbols into export goods, introducing those symbols to global audiences.',
    question: 'Which choice best states the main idea of the text?',
    choices: [
      { label: 'A', text: 'Traditional West African pottery is valued more in international markets than in local ones.' },
      { label: 'B', text: 'Accra artisans are abandoning ceremonial pottery because export demand is more profitable.' },
      { label: 'C', text: 'According to Osei, adapting craft traditions for export markets extends rather than erases cultural identity.' },
      { label: 'D', text: 'Osei believes that global audiences are primarily responsible for preserving West African craft traditions.' },
    ],
    correctAnswer: 'C',
    explanation:
      'The passage centers on Osei\'s argument that the shift to export markets is "not a loss of culture but rather an expansion of it" because cultural symbols reach global audiences through the new goods. C captures this precisely.',
    wrongAnswerExplanations: {
      A: 'The passage never compares the monetary value of pottery in different markets; it discusses cultural significance and adaptation.',
      B: 'The passage does not say artisans are "abandoning" ceremony or that profit motivates them; Osei frames the change as cultural expansion, not replacement.',
      D: 'Osei credits the artisans — not global audiences — as the active agents preserving and extending culture.',
    },
    teachingPoint:
      'The main idea must match the author\'s framing. Distractor B overstates a negative (abandonment) and distractor D flips the agent (audiences vs. artisans). Always ask: who does what according to the text?',
  },

  // ── M1-004 · form-structure-sense · medium ───────────────────────────────────────
  {
    id: 'diag3-m1-004',
    skillSlug: 'form-structure-sense',
    difficulty: 'medium',
    question:
      'The committee, along with several independent auditors, ______ reviewing the budget proposals submitted by each department.',
    choices: [
      { label: 'A', text: 'are' },
      { label: 'B', text: 'were' },
      { label: 'C', text: 'is' },
      { label: 'D', text: 'have been' },
    ],
    correctAnswer: 'C',
    explanation:
      'The grammatical subject is "the committee" — singular. The phrase "along with several independent auditors" is a parenthetical modifier, not part of the subject. A singular subject requires a singular verb: "is."',
    wrongAnswerExplanations: {
      A: '"Are" is plural, but "committee" is singular; "along with auditors" does not make the subject plural.',
      B: '"Were" is plural past tense; neither condition (plural nor past) is warranted here.',
      D: '"Have been" is plural; the same subject-agreement error applies.',
    },
    teachingPoint:
      'Phrases beginning with "along with," "as well as," or "in addition to" are interrupters — they do not change the number of the grammatical subject. Strip the phrase to find the true subject.',
  },

  // ── M1-005 · text-structure-purpose · medium ─────────────────────────────────────
  {
    id: 'diag3-m1-005',
    skillSlug: 'text-structure-purpose',
    difficulty: 'medium',
    stimulus:
      'The deep-sea anglerfish carries its own light source: a luminescent lure that dangles from a spine on its head. In the pitch-black depths where sunlight cannot penetrate, this lure draws curious smaller fish directly toward the anglerfish\'s mouth. Scientists long assumed the light was produced entirely by the fish\'s own cells, but recent studies show that bioluminescent bacteria living in the lure are actually responsible for the glow. The anglerfish, it turns out, borrows its signature trick from microscopic partners.',
    question: 'What is the main purpose of the final sentence ("The anglerfish, it turns out, borrows its signature trick from microscopic partners")?',
    choices: [
      { label: 'A', text: 'To contradict the scientific studies described earlier in the text' },
      { label: 'B', text: 'To emphasize that anglerfish are the most unusual deep-sea creatures' },
      { label: 'C', text: 'To restate the key finding in a vivid, summarizing phrase' },
      { label: 'D', text: 'To introduce a new claim about bacterial symbiosis in fish' },
    ],
    correctAnswer: 'C',
    explanation:
      'The final sentence does not add new information; it rephrases the discovery — that bacteria, not the fish\'s own cells, produce the light — using memorable language ("borrows its signature trick"). Its function is to close the passage by crystallizing the central finding.',
    wrongAnswerExplanations: {
      A: 'The sentence aligns with the studies; it does not contradict them.',
      B: 'The text never ranks the anglerfish against other deep-sea creatures, so "most unusual" is unsupported.',
      D: 'The sentence restates what was already established; it introduces no new claim.',
    },
    teachingPoint:
      'When a final sentence echoes earlier information in figurative or colloquial language, its function is usually to summarize or emphasize, not to introduce something new.',
  },

  // ── M1-006 · transitions · medium ───────────────────────────────────────────────
  {
    id: 'diag3-m1-006',
    skillSlug: 'transitions',
    difficulty: 'medium',
    stimulus:
      'Early economists assumed that individuals always make rational choices that maximize their own benefit. ______ decades of behavioral research have shown that people consistently deviate from this model, choosing options that feel emotionally satisfying even when those choices produce worse financial outcomes.',
    question: 'Which choice completes the text with the most logical transition?',
    choices: [
      { label: 'A', text: 'Therefore,' },
      { label: 'B', text: 'Similarly,' },
      { label: 'C', text: 'However,' },
      { label: 'D', text: 'Specifically,' },
    ],
    correctAnswer: 'C',
    explanation:
      'The first sentence states a historical assumption (rational choice theory). The second sentence contradicts it (people deviate from the model). A contrast transition is needed. "However" introduces contradiction.',
    wrongAnswerExplanations: {
      A: '"Therefore" signals a conclusion that follows logically from the prior sentence — but the second sentence opposes, not follows from, the first.',
      B: '"Similarly" signals that the second sentence adds parallel information, but the relationship here is contradiction.',
      D: '"Specifically" signals that the second sentence narrows or exemplifies the first, but the second sentence challenges it broadly.',
    },
    teachingPoint:
      'Map the logical relationship before selecting a transition. If sentence 2 opposes sentence 1, the answer is a contrast word (however, yet, but). If it follows from it, use a result word (therefore, thus).',
  },

  // ── M1-007 · command-of-evidence · medium ────────────────────────────────────────
  {
    id: 'diag3-m1-007',
    skillSlug: 'command-of-evidence',
    difficulty: 'medium',
    stimulus:
      'Historians have debated whether the construction of the Panama Canal primarily benefited the United States economically or whether the benefits were more broadly distributed among global trading partners. Dr. Amara Diallo argues that the United States captured the majority of the economic gain because it controlled canal tolls and prioritized US-flagged ships during the canal\'s early decades of operation.',
    question: 'Which finding, if true, would most directly support Diallo\'s argument?',
    choices: [
      { label: 'A', text: 'Canal construction employed more than 75,000 workers from over 30 countries during the decade-long project.' },
      { label: 'B', text: 'European nations lobbied to renegotiate canal toll structures multiple times between 1914 and 1950.' },
      { label: 'C', text: 'The canal reduced average shipping times between the Atlantic and Pacific Oceans by approximately two weeks.' },
      { label: 'D', text: 'Data from 1914 to 1940 show that US-flagged ships paid lower per-ton toll rates than ships from other nations.' },
    ],
    correctAnswer: 'D',
    explanation:
      'Diallo\'s specific claim is that the US captured disproportionate economic gain by prioritizing US-flagged ships. Lower toll rates for US ships would directly confirm that US commercial interests received preferential treatment — exactly what Diallo argues.',
    wrongAnswerExplanations: {
      A: 'Workforce diversity describes who built the canal, not who benefited economically from its operation.',
      B: 'European lobbying suggests dissatisfaction with toll structures but does not confirm that the US specifically benefited more than others.',
      C: 'Reduced shipping times benefited all users, not the US disproportionately — this would actually support the opposing view.',
    },
    teachingPoint:
      'Support questions require you to find the option that directly confirms the stated claim — not just something related to the topic. Diallo\'s claim has two parts (US control + preferential treatment of US ships); the correct answer addresses both.',
  },

  // ── M1-008 · rhetorical-synthesis · medium ───────────────────────────────────────
  {
    id: 'diag3-m1-008',
    skillSlug: 'rhetorical-synthesis',
    difficulty: 'medium',
    stimulus:
      'A student is preparing a report on urban heat islands and has gathered the following notes:\n\n• Urban heat islands are metropolitan areas significantly warmer than surrounding rural regions.\n• Asphalt and concrete absorb and re-radiate solar heat, raising surface temperatures.\n• Reduced tree cover in cities means less shade and less evaporative cooling.\n• A 2022 study found that city centers in the northeastern United States were on average 4°F warmer than nearby rural areas on summer nights.\n• Heat islands increase energy demand for air conditioning, raising both costs and greenhouse gas emissions.',
    question:
      'The student wants to emphasize the environmental consequences of urban heat islands. Which choice most effectively uses the notes to accomplish this goal?',
    choices: [
      { label: 'A', text: 'Urban heat islands form when asphalt and concrete absorb solar heat and tree cover decreases, reducing shade and evaporative cooling.' },
      { label: 'B', text: 'By raising temperatures and increasing demand for air conditioning, urban heat islands drive up greenhouse gas emissions that worsen climate change.' },
      { label: 'C', text: 'A 2022 study found that city centers in the northeastern United States were on average 4°F warmer than nearby rural areas on summer nights.' },
      { label: 'D', text: 'Urban heat islands are metropolitan areas that are significantly warmer than surrounding rural regions due to human infrastructure.' },
    ],
    correctAnswer: 'B',
    explanation:
      'The goal is to emphasize environmental consequences. B directly links urban heat islands to a specific environmental consequence: increased greenhouse gas emissions that worsen climate change. It draws on the note about energy demand and emissions.',
    wrongAnswerExplanations: {
      A: 'This explains causes (asphalt, reduced trees), not consequences — it does not address environmental impact.',
      C: 'A temperature statistic is a measurement, not a consequence; it describes the phenomenon without addressing what it causes.',
      D: 'This is a definition of urban heat islands, not a statement about their environmental consequences.',
    },
    teachingPoint:
      'Rhetorical synthesis answers must match the specific goal stated in the question. "Emphasize consequences" means the answer must state what urban heat islands do (cause), not what they are (definition) or why they form (cause of the island itself).',
  },

  // ── M1-009 · quantitative-evidence · medium ──────────────────────────────────────
  {
    id: 'diag3-m1-009',
    skillSlug: 'quantitative-evidence',
    difficulty: 'medium',
    stimulus:
      'A nutritional study tracked 400 adults over two years. Participants who consumed at least three servings of whole grains per day showed a 12% decrease in LDL cholesterol. Those who consumed fewer than one serving per day showed a 2% decrease. The researchers concluded that high whole-grain consumption is associated with meaningful reductions in LDL cholesterol.',
    question:
      'Which choice best uses the data from the study to support the researchers\' conclusion?',
    choices: [
      { label: 'A', text: 'Adults who ate at least three servings of whole grains daily experienced a 12% LDL decrease, compared to only 2% for those eating fewer than one serving — a sixfold difference that supports a meaningful association.' },
      { label: 'B', text: 'The 400-participant sample suggests the study was large enough to detect meaningful health trends over two years.' },
      { label: 'C', text: 'Participants in the study consumed varying amounts of whole grains, producing different cholesterol outcomes.' },
      { label: 'D', text: 'LDL cholesterol decreased among participants in both consumption groups over the two-year period.' },
    ],
    correctAnswer: 'A',
    explanation:
      'The conclusion claims that high whole-grain consumption is meaningfully associated with LDL reduction. A directly supports this by citing both data points and explicitly noting the magnitude of the difference (sixfold), which is the basis for calling the association "meaningful."',
    wrongAnswerExplanations: {
      B: 'Sample size addresses methodological adequacy, not the specific finding about cholesterol reduction.',
      C: 'This is too vague — it says different amounts produced "different outcomes" without specifying which outcomes or how large the difference was.',
      D: 'Noting that both groups had decreases does not distinguish high from low consumption and thus does not support a conclusion about high consumption specifically.',
    },
    teachingPoint:
      'To support a conclusion about a difference or association, the answer must cite both data points and characterize the magnitude of the gap. Vague references or mentions of only one group do not constitute support.',
  },

  // ── M1-010 · inferences · medium ────────────────────────────────────────────────
  {
    id: 'diag3-m1-010',
    skillSlug: 'inferences',
    difficulty: 'medium',
    stimulus:
      'Silviculturist Anya Petrov manages a mixed forest in which she deliberately keeps some fallen trees on the ground rather than clearing them. Logs left to decompose slowly release stored carbon and nutrients back into the soil, supporting the growth of mosses, fungi, and invertebrates. These organisms, in turn, attract insect-eating birds and small mammals. Petrov notes that sections of the forest where logs have been left for more than a decade have significantly higher biodiversity than sections that were cleared.',
    question: 'Which choice most logically completes the following inference based on the text? Petrov\'s practice of leaving fallen logs in place suggests that removing dead wood from forests might ______',
    choices: [
      { label: 'A', text: 'increase the risk of forest fires by eliminating habitat for moisture-retaining fungi' },
      { label: 'B', text: 'cause bird populations to migrate to urban areas in search of new food sources' },
      { label: 'C', text: 'accelerate the growth of surviving trees by reducing competition for soil nutrients' },
      { label: 'D', text: 'reduce biodiversity by eliminating a key source of nutrients and habitat for many species' },
    ],
    correctAnswer: 'D',
    explanation:
      'The text establishes a clear chain: logs → nutrients and moss/fungi/invertebrate habitat → birds and mammals → higher biodiversity in areas with logs. Removing logs would break this chain, reducing biodiversity. D follows directly from this evidence.',
    wrongAnswerExplanations: {
      A: 'Fire risk is not mentioned in the text; moisture-retaining fungi are not discussed as a fire-prevention mechanism.',
      B: 'The text mentions birds are attracted to the forest sections with logs, but nothing supports that removing logs would cause migration to urban areas.',
      C: 'Nutrient competition among trees is not discussed; the text focuses on the beneficial role of decomposing logs, not competition dynamics.',
    },
    teachingPoint:
      'Inference questions ask you to extend what the text actually says — not to speculate about possible side effects. The correct inference must follow directly from the causal chain established in the passage.',
  },

  // ── M1-011 · cross-text-connections · hard ───────────────────────────────────────
  {
    id: 'diag3-m1-011',
    skillSlug: 'cross-text-connections',
    difficulty: 'hard',
    stimulus:
      'Text 1\nEconomist Dr. Yusuf Mbeki contends that micro-lending programs have transformed rural economies in sub-Saharan Africa by giving smallholder farmers access to capital that was previously unavailable through traditional banking. He points to rising crop yields and expanded market participation as evidence of the programs\' success.\n\nText 2\nDevelopment researcher Dr. Sofia Ramos cautions that the benefits of micro-lending are often overstated. Her longitudinal data show that, while some borrowers initially invest loan funds productively, a significant proportion use loans for consumption rather than investment, resulting in elevated debt burdens that can destabilize household finances over time.',
    question: 'Based on the texts, how would Dr. Ramos most likely respond to Dr. Mbeki\'s claim that micro-lending has transformed rural economies?',
    choices: [
      { label: 'A', text: 'By arguing that micro-lending programs should be eliminated because they cause more harm than good' },
      { label: 'B', text: 'By agreeing that rising crop yields confirm that micro-lending is universally beneficial for smallholder farmers' },
      { label: 'C', text: 'By acknowledging that some borrowers benefit but cautioning that debt burdens can undermine the broader claimed success' },
      { label: 'D', text: 'By claiming that traditional banking is more effective than micro-lending for rural economic development' },
    ],
    correctAnswer: 'C',
    explanation:
      'Ramos does not say micro-lending never works — she acknowledges that "some borrowers initially invest loan funds productively." Her objection is that a significant proportion misuse loans and incur debt, so the broad claim of transformation is "overstated." C captures this nuanced partial concession plus qualification.',
    wrongAnswerExplanations: {
      A: 'Ramos cautions about overstating benefits; she does not call for elimination of the programs.',
      B: 'Ramos explicitly says benefits are overstated and that debt burdens destabilize households — she would not fully agree with Mbeki.',
      D: 'Ramos never mentions traditional banking or compares it to micro-lending.',
    },
    teachingPoint:
      'Hard cross-text questions test whether you can identify a nuanced position. When Text 2 partially concedes Text 1\'s point but qualifies it, the answer must reflect both the concession and the qualification — not a wholesale agreement or rejection.',
  },

  // ── M1-012 · words-in-context · hard ────────────────────────────────────────────
  {
    id: 'diag3-m1-012',
    skillSlug: 'words-in-context',
    difficulty: 'hard',
    stimulus:
      'The parliamentary session grew increasingly [FRACTIOUS] as delegates from opposing coalitions repeatedly interrupted one another, tabled procedural motions to delay votes, and ultimately forced the speaker to suspend debate for the day.',
    question: 'As used in the text, [FRACTIOUS] most nearly means',
    choices: [
      { label: 'A', text: 'divided into factions' },
      { label: 'B', text: 'organized around formal debate' },
      { label: 'C', text: 'slow and bureaucratic' },
      { label: 'D', text: 'quarrelsome and unruly' },
    ],
    correctAnswer: 'D',
    explanation:
      'The context describes interruptions, procedural maneuvers used as weapons, and a forced suspension of debate — all markers of disorderly, combative behavior. "Quarrelsome and unruly" captures this precisely. While "fractious" etymologically relates to fractions/factions, its primary contextual meaning here is contentious disorder.',
    wrongAnswerExplanations: {
      A: '"Divided into factions" is the etymological meaning of the root, but in context the word describes the behavior of the session (quarrelsome), not just the structural division. The passage emphasizes the combative conduct, not the mere existence of opposing groups.',
      B: 'The session explicitly broke down formal debate procedures; calling it "organized around formal debate" contradicts the passage.',
      C: '"Slow and bureaucratic" describes procedural sluggishness, not the heated, combative tone that the passage emphasizes.',
    },
    teachingPoint:
      'Hard vocabulary questions often use a word whose root suggests one answer (A — factions) while the context points to a related but distinct meaning (B — quarrelsome behavior). Always prioritize the contextual behavior described over the word\'s etymology.',
  },

  // ── M1-013 · boundaries · hard ──────────────────────────────────────────────────
  {
    id: 'diag3-m1-013',
    skillSlug: 'boundaries',
    difficulty: 'hard',
    question:
      'The senator\'s proposal ______ long regarded as financially impossible ______ gained unexpected support from fiscal conservatives after an independent audit confirmed its projected savings.',
    choices: [
      { label: 'A', text: ': long regarded as financially impossible,' },
      { label: 'B', text: '; long regarded as financially impossible,' },
      { label: 'C', text: '— long regarded as financially impossible —' },
      { label: 'D', text: ', long regarded as financially impossible,' },
    ],
    correctAnswer: 'C',
    explanation:
      'The phrase "long regarded as financially impossible" is a nonessential parenthetical that interrupts the main clause. Dashes are the correct choice when the nonessential element needs emphatic offset within a main clause. The pair of dashes (one before and one after the phrase) must match — only C provides a dash to open the interruption, with the second blank understood to close it with another dash.',
    wrongAnswerExplanations: {
      A: 'A colon cannot open a nonessential phrase mid-sentence; colons introduce information that follows an independent clause, not an interruption.',
      B: 'A semicolon followed by a nonessential phrase and then a comma creates an ungrammatical structure; the material after a semicolon must be an independent clause.',
      D: 'Commas around a nonessential phrase are grammatically valid, but in this two-blank format only one punctuation scheme is tested per answer; D would require both blanks to show a comma, which this question format does not present as an option.',
    },
    teachingPoint:
      'Dashes set off a nonessential phrase with more emphasis than commas. A colon mid-sentence introduces what follows (not an interruption); a semicolon requires an independent clause after it. When the interruption is emphatic and the sentence has a two-blank format, dashes are the preferred SAT answer.',
  },

  // ── M1-014 · central-ideas-details · hard ────────────────────────────────────────
  {
    id: 'diag3-m1-014',
    skillSlug: 'central-ideas-details',
    difficulty: 'hard',
    stimulus:
      'Philosopher Maria Alvarez distinguishes between actions done for a reason and actions that merely have reasons. When someone reaches for a glass of water because they are thirsty, the thirst is both an explanation and the agent\'s motivating reason — it is the reason they are acting on. But when a surgeon performs a routine appendectomy on a patient who also happens to be the surgeon\'s landlord, the landlord relationship may explain something about how the two people came to be in the operating room; it is not, however, the reason the surgeon is operating. Alvarez argues that conflating these two senses of "reason" has led to significant confusion in the philosophy of action.',
    question: 'Which choice best states the main claim Alvarez is making?',
    choices: [
      { label: 'A', text: 'Surgeons should always be transparent about any personal relationships with their patients.' },
      { label: 'B', text: 'The word "reason" is used inconsistently in everyday conversation, which causes misunderstandings.' },
      { label: 'C', text: 'A distinction must be drawn between the reason an agent is acting upon and background facts that merely explain the situation, as confusing them generates philosophical errors.' },
      { label: 'D', text: 'All human actions can ultimately be traced to a single motivating reason, even when multiple explanations appear to be present.' },
    ],
    correctAnswer: 'C',
    explanation:
      'Alvarez\'s argument is precisely this: there is a difference between the reason an agent acts on (motivating reason) and facts that explain the context without being the operative motivation. She argues that conflating these two has produced philosophical confusion. C captures both the distinction and its stakes.',
    wrongAnswerExplanations: {
      A: 'The surgeon example is illustrative of a philosophical point, not a recommendation about medical ethics.',
      B: 'The issue is not everyday conversation but a specific philosophical concept ("reason" in philosophy of action); also, the text does not claim everyday speakers conflate these senses.',
      D: 'Alvarez distinguishes between types of reasons rather than reducing all action to a single motivating reason; this choice inverts her argument.',
    },
    teachingPoint:
      'Hard central-ideas questions use examples to illustrate a technical distinction. Don\'t let the example (surgeon/landlord) become the "main idea" — it supports the underlying philosophical claim. Ask: what would the author write on an essay exam if asked to state their thesis?',
  },

  // ── M1-015 · form-structure-sense · hard ─────────────────────────────────────────
  {
    id: 'diag3-m1-015',
    skillSlug: 'form-structure-sense',
    difficulty: 'hard',
    stimulus:
      'The museum\'s new exhibition features artifacts ______ to the public for the first time, including painted ceremonial masks, woven textile fragments, and pottery shards dating back nearly two millennia.',
    question:
      'Which choice most effectively completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { label: 'A', text: 'never before displayed' },
      { label: 'B', text: 'that they had never before displayed' },
      { label: 'C', text: 'never before displaying' },
      { label: 'D', text: 'which were never before displayed to them' },
    ],
    correctAnswer: 'A',
    explanation:
      'The phrase modifies "artifacts." A reduced relative clause — "never before displayed [to the public]" — correctly and concisely modifies the noun. No subject pronoun is needed because the participial phrase clearly refers to "artifacts."',
    wrongAnswerExplanations: {
      B: '"They" is an unclear pronoun that lacks a logical antecedent in the sentence; the subject of the relative clause should be "artifacts," not an unspecified "they."',
      C: '"Displaying" is active voice, but artifacts do not display themselves; the passive "displayed" is required since artifacts are shown by the museum.',
      D: '"Them" is ambiguous (it could refer to the public or the artifacts) and creates a dangling reference; "which were" also introduces unnecessary wordiness.',
    },
    teachingPoint:
      'When a participial or relative phrase modifies a noun, ensure the verb form matches who performs the action. Artifacts are displayed (passive), not displaying (active). Also check pronoun clarity — only introduce "they/them" if the antecedent is unambiguous.',
  },

  // ── M1-016 · text-structure-purpose · hard ───────────────────────────────────────
  {
    id: 'diag3-m1-016',
    skillSlug: 'text-structure-purpose',
    difficulty: 'hard',
    stimulus:
      'The first commercial jetliners transformed air travel by reducing transcontinental flight times from days — via propeller planes with multiple fuel stops — to a matter of hours. Yet this compression of distance came at a social cost that boosters rarely mentioned: as jet travel became routine, expectations for physical presence at meetings, conferences, and family events accelerated sharply. The very technology that made it easy to go anywhere also made it obligatory. Sociologist Diane Ferris calls this the "proximity paradox": increased mobility can generate increased obligation to be mobile.',
    question: 'What is the function of the second and third sentences ("Yet this compression... obligatory") in the overall structure of the text?',
    choices: [
      { label: 'A', text: 'To provide statistical evidence that jet travel increased the frequency of business travel after its introduction' },
      { label: 'B', text: 'To refute the claim made in the first sentence by showing that jet travel had more costs than benefits' },
      { label: 'C', text: 'To explain the technical reasons why propeller planes required multiple fuel stops before jets were developed' },
      { label: 'D', text: 'To introduce and develop the counterintuitive social consequence of jet travel that the passage ultimately names as the proximity paradox' },
    ],
    correctAnswer: 'D',
    explanation:
      'The passage moves from benefit (faster travel) to unanticipated cost (social obligation). Sentences 2 and 3 build the paradox by explaining that ease of travel created obligation — the very content that Ferris\'s term "proximity paradox" labels. Their function is to develop the idea that will be named in the final sentence.',
    wrongAnswerExplanations: {
      A: 'No statistics are provided; the sentences describe a social dynamic, not quantitative data about travel frequency.',
      B: 'The sentences do not refute the first sentence\'s point about speed; they pivot to an additional, unexpected consequence. The passage presents both the benefit and the cost — it does not argue the cost outweighs the benefit.',
      C: 'Technical explanations of fuel stops appear parenthetically in the first sentence; sentences 2 and 3 focus on social effects, not engineering.',
    },
    teachingPoint:
      'For sentence-function questions, identify what the target sentences are doing relative to what comes before and after. Here, the pivot word "Yet" signals that sentences 2–3 are introducing a complicating counterpoint to be resolved by the final sentence\'s concept.',
  },

  // ── M1-017 · transitions · hard ──────────────────────────────────────────────────
  {
    id: 'diag3-m1-017',
    skillSlug: 'transitions',
    difficulty: 'hard',
    stimulus:
      'Researchers had hypothesized that students who took handwritten notes would retain information better than those who typed their notes, because handwriting forces active summarization. The study confirmed this pattern for conceptual understanding. ______ on tests of verbatim factual recall, typists performed slightly better, likely because they captured more words per minute.',
    question: 'Which choice completes the text with the most logical transition?',
    choices: [
      { label: 'A', text: 'Nevertheless,' },
      { label: 'B', text: 'Therefore,' },
      { label: 'C', text: 'Furthermore,' },
      { label: 'D', text: 'In contrast,' },
    ],
    correctAnswer: 'D',
    explanation:
      'The third sentence shifts to a different type of test (verbatim recall vs. conceptual understanding) where the opposite result holds. "In contrast" signals a comparison between two different conditions that yield opposite outcomes — which is precisely the relationship here.',
    wrongAnswerExplanations: {
      A: '"Nevertheless" means "despite the foregoing" and implies the second situation occurred despite an obstacle — but no obstacle is described. "In contrast" is the cleaner choice because the shift is not about overcoming a difficulty but about comparing two different test types.',
      B: '"Therefore" signals a logical conclusion drawn from the prior sentence, but the third sentence presents an exception, not a conclusion.',
      C: '"Furthermore" adds information consistent with what was just said, but the third sentence presents a contrasting finding.',
    },
    teachingPoint:
      'Hard transition questions often pair "nevertheless" vs. "in contrast." "Nevertheless" = despite a prior obstacle; "in contrast" = comparing two different things that differ. When the relationship is comparison across different conditions (not overcoming), "in contrast" wins.',
  },

  // ── M1-018 · command-of-evidence · hard ──────────────────────────────────────────
  {
    id: 'diag3-m1-018',
    skillSlug: 'command-of-evidence',
    difficulty: 'hard',
    stimulus:
      'Evolutionary biologist Dr. Kenji Watanabe argues that cooperative behaviors in social insects such as ants evolved not because individuals benefit directly but because helping close relatives propagate copies of shared genes increases the helper\'s inclusive fitness. He predicts that in species where colony members are more closely related, cooperative behaviors will be more extreme.',
    question: 'Which finding, if true, would most directly support Watanabe\'s prediction?',
    choices: [
      { label: 'A', text: 'Ant species in which the queen mates with a single male — producing workers who share 75% of their genes — display more intense cooperative behaviors than species in which queens mate with multiple males, producing workers who share only about 25% of their genes.' },
      { label: 'B', text: 'Laboratory studies show that isolated ants separated from their colonies experience elevated stress hormones and reduced lifespan.' },
      { label: 'C', text: 'Ants that live in larger colonies tend to forage over wider territories than ants in smaller colonies.' },
      { label: 'D', text: 'Cooperative behavior has been observed in many non-insect animal species, including wolves and meerkats.' },
    ],
    correctAnswer: 'A',
    explanation:
      'Watanabe\'s prediction is that higher genetic relatedness within a colony correlates with more extreme cooperative behavior. A directly tests this by comparing two conditions (high relatedness from single mating vs. low relatedness from multiple mating) and finding exactly the predicted pattern.',
    wrongAnswerExplanations: {
      B: 'Stress hormones in isolated ants address what happens when cooperation is disrupted, not whether relatedness predicts cooperative intensity.',
      C: 'Foraging territory concerns colony size and resource behavior, not the relatedness-cooperation link Watanabe predicts.',
      D: 'The breadth of cooperative behavior across species does not address the relatedness-within-colony mechanism Watanabe proposes.',
    },
    teachingPoint:
      'Hard evidence questions require matching the answer to the precise causal mechanism in the prediction, not just the general topic. Watanabe predicts "more relatedness → more cooperation." Only A tests exactly that relationship.',
  },

  // ── M1-019 · rhetorical-synthesis · hard ─────────────────────────────────────────
  {
    id: 'diag3-m1-019',
    skillSlug: 'rhetorical-synthesis',
    difficulty: 'hard',
    stimulus:
      'A student is writing a paper arguing that urban vertical farms should receive public subsidies. She has gathered the following notes:\n\n• Vertical farms use hydroponic or aeroponic systems that consume up to 95% less water than traditional field agriculture.\n• A single acre of vertical farming can yield the equivalent of 10–20 acres of conventional farmland.\n• Vertical farms require no pesticides because crops are grown in controlled indoor environments.\n• Critics argue that vertical farms currently consume significantly more electricity than field farms, often from non-renewable sources.\n• A 2023 pilot program in Singapore subsidized vertical farms, resulting in a 30% increase in local vegetable production within 18 months.',
    question:
      'The student wants to anticipate and address a counterargument to strengthen her case for subsidies. Which choice most effectively uses the notes to accomplish this goal?',
    choices: [
      { label: 'A', text: 'Vertical farms use up to 95% less water and require no pesticides, making them environmentally superior to conventional agriculture.' },
      { label: 'B', text: 'A 2023 pilot in Singapore showed that subsidizing vertical farms led to a 30% increase in local vegetable production within 18 months.' },
      { label: 'C', text: 'Vertical farms yield the equivalent of 10–20 conventional acres per acre and can operate without pesticides, which makes them attractive candidates for government investment.' },
      { label: 'D', text: 'Although critics point to vertical farms\' high electricity consumption, the Singapore pilot showed that targeted subsidies can rapidly scale local food production, suggesting the tradeoffs may be acceptable when energy sourcing improves.' },
    ],
    correctAnswer: 'D',
    explanation:
      'The goal requires anticipating and addressing a counterargument. D is the only option that does both: it names the counterargument (high electricity consumption) and responds to it (Singapore data shows subsidies work; implicit suggestion that energy sourcing improvements resolve the issue). A, B, and C offer only supporting evidence, not engagement with opposition.',
    wrongAnswerExplanations: {
      A: 'Lists benefits without acknowledging or addressing any counterargument.',
      B: 'Cites only the Singapore statistic, a supporting point — no counterargument is engaged.',
      C: 'Presents yield and pesticide advantages as reasons for investment, but never acknowledges the electricity criticism.',
    },
    teachingPoint:
      'Hard rhetorical synthesis goals often specify a rhetorical move, not just a topic (e.g., "anticipate a counterargument"). Match the answer to the full move: the correct answer must name the opposing point AND respond to it.',
  },

  // ── M1-020 · quantitative-evidence · hard ────────────────────────────────────────
  {
    id: 'diag3-m1-020',
    skillSlug: 'quantitative-evidence',
    difficulty: 'hard',
    stimulus:
      'A transportation study compared commute times before and after a city installed a new light-rail line. Before the rail line opened, the average car commute on the affected corridor was 48 minutes. After opening, average car commute time fell to 41 minutes, while the average rail commute on the same corridor was 29 minutes. The researchers concluded that the rail line reduced overall commute burden not only by providing a faster option but also by removing enough cars from the road to shorten driving times.',
    question:
      'Which choice best uses data from the study to support the specific claim that the rail line shortened car commute times by drawing drivers away from the road?',
    choices: [
      { label: 'A', text: 'Rail commuters traveled the corridor in only 29 minutes, 12 minutes faster than car commuters after the rail line opened.' },
      { label: 'B', text: 'Car commute times fell from 48 to 41 minutes after the rail line opened, suggesting that the departure of some drivers to rail reduced road congestion.' },
      { label: 'C', text: 'The average car commute dropped by 7 minutes while the rail commute was 12 minutes shorter than the post-opening car commute, confirming that rail is faster.' },
      { label: 'D', text: 'Before the rail line, commuters had only one option; after opening, travelers could choose between a 41-minute car trip and a 29-minute rail journey.' },
    ],
    correctAnswer: 'B',
    explanation:
      'The specific claim is that the rail line shortened car commute times by removing drivers from the road. B cites the before/after car data (48 → 41 minutes) and links the reduction to drivers shifting to rail — directly supporting the stated mechanism.',
    wrongAnswerExplanations: {
      A: 'This compares rail vs. car times after opening, which supports the claim that rail is faster — but not the specific claim about road congestion reduction for remaining car drivers.',
      C: 'This calculates two different gaps (rail vs. car, before vs. after) without clearly connecting either to the road-congestion mechanism.',
      D: 'This describes the expansion of options without citing the change in car commute times or connecting it to congestion reduction.',
    },
    teachingPoint:
      'Hard quantitative evidence questions often include multiple plausible data points. Identify the specific sub-claim being supported (here: cars got faster because drivers left for rail) and select the data that directly demonstrates that sub-claim — not merely related data.',
  },

  // ── M1-021 · inferences · hard ───────────────────────────────────────────────────
  {
    id: 'diag3-m1-021',
    skillSlug: 'inferences',
    difficulty: 'hard',
    stimulus:
      'Linguist Dr. Priscilla Vong studies how new words enter the English lexicon. She observes that technical vocabulary coined within professional communities — medical, legal, financial — almost never enters everyday speech directly. Instead, journalists and popular writers first adopt the term, simplify or slightly distort its original meaning, and then release it into the broader language. By the time a term reaches common usage, it has usually drifted considerably from what specialists originally intended.',
    question:
      'Which choice most logically completes the following inference based on the text? Vong\'s research suggests that when a technical term becomes widely used in casual conversation, specialists in the originating field will likely ______',
    choices: [
      { label: 'A', text: 'abandon the term and adopt new jargon to distinguish their usage from the popularized version' },
      { label: 'B', text: 'collaborate with journalists to ensure that popular definitions remain accurate' },
      { label: 'C', text: 'increase public outreach efforts to correct the misuse of their terminology' },
      { label: 'D', text: 'find that the popular version of the term no longer precisely matches the concept they use it to describe' },
    ],
    correctAnswer: 'D',
    explanation:
      'Vong establishes that by the time a term reaches common usage it has "drifted considerably from what specialists originally intended." Therefore, when specialists encounter the popular version, they will find it imprecise relative to their technical meaning. D follows directly from this.',
    wrongAnswerExplanations: {
      A: 'The text does not say specialists abandon terms — it says the term drifts during popularization. Specialists may retain their precise usage while popular usage diverges.',
      B: 'The text describes no collaboration between specialists and journalists; if anything, the process described is passive drift, not coordinated adaptation.',
      C: 'Public outreach is not mentioned; the inference asks what specialists will likely experience, not what they will do in response.',
    },
    teachingPoint:
      'Hard inference questions often have "action" distractors (A, C, D) that seem like logical responses but go beyond what the text supports. The safest inference is one that merely extends what the text explicitly establishes, without adding behavior the text never describes.',
  },

  // ── M1-022 · cross-text-connections · hard ───────────────────────────────────────
  {
    id: 'diag3-m1-022',
    skillSlug: 'cross-text-connections',
    difficulty: 'hard',
    stimulus:
      'Text 1\nThe introduction of the automobile is often framed as a story of liberation — suddenly, ordinary people could travel farther and faster than ever before. Historian Clara Johansson argues that this narrative is accurate but incomplete: the freedom automobiles enabled was initially distributed extremely unevenly, with rural women and lower-income urban residents among those least able to access or afford cars during the first decades of mass production.\n\nText 2\nTransportation scholar Kwame Asante notes that the automobile\'s social effects cannot be understood apart from the infrastructure built to support it. Highway construction in the mid-twentieth century connected suburbs to city centers but simultaneously bisected many urban neighborhoods, displacing residents and fragmenting communities — outcomes that fell disproportionately on low-income and minority populations.',
    question:
      'Which choice best describes the relationship between the two texts?',
    choices: [
      { label: 'A', text: 'Text 1 argues that the automobile was a negative force in American society, while Text 2 argues it was a positive one.' },
      { label: 'B', text: 'Both texts challenge the simple liberation narrative of the automobile by identifying ways in which its benefits were unequally distributed or accompanied by significant harms to disadvantaged groups.' },
      { label: 'C', text: 'Text 1 focuses on economic barriers to car ownership, while Text 2 argues that once those barriers were removed, all populations benefited equally from automotive infrastructure.' },
      { label: 'D', text: 'Text 2 contradicts Text 1 by showing that the automobile ultimately unified communities rather than dividing them.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Both texts complicate the "liberation" narrative. Text 1 notes that car access was unequally distributed by class and gender. Text 2 notes that highway infrastructure harmed disadvantaged communities. Both share the theme that automobile history involves unequal distribution of benefits and burdens. B captures this shared critical stance.',
    wrongAnswerExplanations: {
      A: 'Text 1 does not call the automobile purely negative — it calls the liberation narrative "accurate but incomplete." Neither text makes an overall negative/positive judgment.',
      C: 'Text 2 does not argue that barriers were removed or that all populations eventually benefited equally — it argues the opposite for infrastructure\'s impact.',
      D: 'Text 2 describes highways fragmenting communities, not unifying them; it does not contradict Text 1.',
    },
    teachingPoint:
      'Hard cross-text relationship questions often pit "contradicts" vs. "complements/reinforces." When both texts complicate the same popular narrative using different evidence, the relationship is complementary — they converge on a shared critical point from different angles.',
  },
]

// ── Module 2 Foundation: 22 questions (2 per skill × 11 skills, interleaved) ────────
// Targets foundational misconceptions. ~12 medium + 10 hard.
// IDs: diag3-m2f-001 through diag3-m2f-022
export const DIAGNOSTIC_V3_M2_FOUNDATION_QUESTIONS: DrillQuestion[] = [
  // ── M2F-001 · boundaries · medium ────────────────────────────────────────────────
  {
    id: 'diag3-m2f-001',
    skillSlug: 'boundaries',
    difficulty: 'medium',
    question:
      'The storm knocked out power to the entire neighborhood ______ residents were forced to rely on candles and battery-powered lanterns for several hours.',
    choices: [
      { label: 'A', text: ',' },
      { label: 'B', text: '; and,' },
      { label: 'C', text: '; consequently,' },
      { label: 'D', text: ', so that' },
    ],
    correctAnswer: 'C',
    explanation:
      'Both clauses are independent, and the second is a result of the first (residents had to use candles because power was out). A semicolon correctly joins two independent clauses, and "consequently" identifies the cause-effect relationship.',
    wrongAnswerExplanations: {
      A: 'A comma alone between two independent clauses creates a comma splice — one of the most tested boundary errors.',
      B: 'A semicolon followed by "and" is non-standard; "and" is a coordinating conjunction used after a comma, not a semicolon.',
      D: '"So that" introduces a purpose clause (to achieve a goal), but residents did not choose to use candles in order to accomplish a goal — the reliance was forced on them.',
    },
    teachingPoint:
      'A comma alone cannot join two independent clauses (comma splice). Use a semicolon, a semicolon + conjunctive adverb, or a comma + coordinating conjunction instead. Match the conjunctive adverb (consequently, therefore, thus) to the logical relationship.',
  },

  // ── M2F-002 · words-in-context · medium ──────────────────────────────────────────
  {
    id: 'diag3-m2f-002',
    skillSlug: 'words-in-context',
    difficulty: 'medium',
    stimulus:
      'After years of working in isolation, the novelist found the experience of joining a writers\' workshop surprisingly [INVIGORATING]. The feedback sessions, though sometimes challenging, rekindled her enthusiasm for revision and pushed her to experiment with narrative techniques she had avoided for years.',
    question: 'As used in the text, [INVIGORATING] most nearly means',
    choices: [
      { label: 'A', text: 'exhausting' },
      { label: 'B', text: 'frightening' },
      { label: 'C', text: 'time-consuming' },
      { label: 'D', text: 'energizing' },
    ],
    correctAnswer: 'D',
    explanation:
      'The passage describes the workshop as rekindling enthusiasm and encouraging experimentation — both positive, energy-renewing effects. "Energizing" captures this renewal precisely.',
    wrongAnswerExplanations: {
      A: 'While feedback was "sometimes challenging," the overall effect is described positively — renewed enthusiasm is the opposite of exhaustion.',
      B: 'No language in the passage suggests fear or intimidation as the dominant feeling.',
      C: '"Time-consuming" is about duration, not the quality of the experience the word describes.',
    },
    teachingPoint:
      'Words-in-context questions include distractors that are associated with the context (workshops can be challenging → exhausting) rather than with what the word actually means in the passage. Ground your answer in the cumulative effect described: enthusiasm rekindled = energized.',
  },

  // ── M2F-003 · form-structure-sense · medium ──────────────────────────────────────
  {
    id: 'diag3-m2f-003',
    skillSlug: 'form-structure-sense',
    difficulty: 'medium',
    question:
      'The city\'s new recycling program requires residents to separate glass, ______, and cardboard into distinct bins before collection.',
    choices: [
      { label: 'A', text: 'plastics' },
      { label: 'B', text: 'plastic items' },
      { label: 'C', text: 'items made of plastic' },
      { label: 'D', text: 'plastic' },
    ],
    correctAnswer: 'D',
    explanation:
      'The list uses simple nouns in their material/mass-noun form: "glass," "____," and "cardboard." Parallel structure requires the same form — "plastic" (uncountable material noun) matches "glass" and "cardboard."',
    wrongAnswerExplanations: {
      A: '"Plastics" (plural) introduces an inconsistency: "glass" and "cardboard" are singular mass nouns, so "plastics" breaks the parallel pattern.',
      B: '"Plastic items" is a noun phrase, while "glass" and "cardboard" are single-word material nouns — the parallel structure is broken.',
      C: '"Items made of plastic" is a prepositional phrase, far more elaborate than the single-word items in the list.',
    },
    teachingPoint:
      'In a parallel list, all items should share the same grammatical form. Identify the form of the other list items and match it exactly. Here, single-word uncountable nouns require another single-word uncountable noun.',
  },

  // ── M2F-004 · central-ideas-details · medium ─────────────────────────────────────
  {
    id: 'diag3-m2f-004',
    skillSlug: 'central-ideas-details',
    difficulty: 'medium',
    stimulus:
      'Ornithologist Dr. Samuel Park has spent fifteen years documenting how migratory songbirds navigate across thousands of miles using Earth\'s magnetic field. His experiments show that birds possess magnetite crystals in their beaks that function as biological compasses. When researchers briefly disrupted the local magnetic field around test birds, the animals became disoriented and temporarily lost their migratory direction. Park believes this sensitivity to magnetism is an evolved adaptation, fine-tuned over millions of years of seasonal migration.',
    question: 'According to the text, what happened when researchers disrupted the magnetic field around test birds?',
    choices: [
      { label: 'A', text: 'The birds\' magnetite crystals were permanently destroyed.' },
      { label: 'B', text: 'The birds temporarily lost their sense of migratory direction.' },
      { label: 'C', text: 'The birds began to migrate in the opposite direction of their intended route.' },
      { label: 'D', text: 'The birds developed new navigation strategies that did not rely on magnetism.' },
    ],
    correctAnswer: 'B',
    explanation:
      'The text states explicitly that birds "became disoriented and temporarily lost their migratory direction" when the magnetic field was disrupted. B paraphrases this exactly.',
    wrongAnswerExplanations: {
      A: 'The text says nothing about crystals being destroyed; the disruption affected orientation, not the crystals themselves.',
      C: 'The text says the birds became disoriented, not that they reversed course.',
      D: 'No new strategies are mentioned; the birds simply became confused.',
    },
    teachingPoint:
      'Detail questions on the SAT can be answered directly from the passage — don\'t import information that isn\'t there. Find the sentence that addresses the event asked about and match it to the answer that paraphrases most accurately.',
  },

  // ── M2F-005 · transitions · medium ───────────────────────────────────────────────
  {
    id: 'diag3-m2f-005',
    skillSlug: 'transitions',
    difficulty: 'medium',
    stimulus:
      'Many early computer scientists believed that machine translation — software that converts text from one language to another — would be solved within a decade of the first computers. ______ even with decades of additional research and computing power, fully accurate translation remained elusive well into the twenty-first century.',
    question: 'Which choice completes the text with the most logical transition?',
    choices: [
      { label: 'A', text: 'Additionally,' },
      { label: 'B', text: 'In other words,' },
      { label: 'C', text: 'As a result,' },
      { label: 'D', text: 'Yet' },
    ],
    correctAnswer: 'D',
    explanation:
      'The first sentence states an optimistic prediction; the second reveals that the prediction was wrong. This is a contrast relationship, and "yet" is the precise contrast connector.',
    wrongAnswerExplanations: {
      A: '"Additionally" adds parallel information, but the second sentence contradicts the first rather than adding to it.',
      B: '"In other words" signals a restatement or clarification, but the second sentence presents an unexpected outcome, not a rephrasing.',
      C: '"As a result" signals that the second event was caused by the first, but the difficulty of translation was not caused by the early prediction.',
    },
    teachingPoint:
      'Map the logical relationship: expectation in sentence 1, unexpected outcome in sentence 2 = contrast. "Yet," "however," and "nevertheless" are contrast transitions; choose the one that best fits the register of the surrounding text.',
  },

  // ── M2F-006 · text-structure-purpose · medium ────────────────────────────────────
  {
    id: 'diag3-m2f-006',
    skillSlug: 'text-structure-purpose',
    difficulty: 'medium',
    stimulus:
      'Few marine environments are as hostile as hydrothermal vents: fissures in the ocean floor where superheated water laden with toxic chemicals shoots upward into frigid, pitch-dark waters. For decades, scientists assumed these vents were biological dead zones. Then, in 1977, a research submersible descending near the Galápagos Rift discovered dense communities of tube worms, clams, and bacteria thriving without any sunlight at all. The discovery overturned a foundational assumption of biology: that all food chains on Earth ultimately depend on photosynthesis.',
    question: 'What is the main purpose of the text?',
    choices: [
      { label: 'A', text: 'To argue that deep-sea exploration should receive greater government funding' },
      { label: 'B', text: 'To describe how a 1977 discovery challenged a core assumption about life on Earth' },
      { label: 'C', text: 'To provide a detailed explanation of how tube worms survive without sunlight' },
      { label: 'D', text: 'To compare hydrothermal vent ecosystems with other deep-sea environments' },
    ],
    correctAnswer: 'B',
    explanation:
      'The text narrates the 1977 discovery at the Galápagos Rift and explains its significance: life without photosynthesis overturned the assumption that all food chains depend on it. The entire passage builds toward this implication.',
    wrongAnswerExplanations: {
      A: 'The text is informational, not argumentative; no funding policy is discussed.',
      C: 'The text mentions tube worms but does not explain the biological mechanism by which they survive without sunlight.',
      D: 'No comparison with other deep-sea environments is made; the text focuses on the vent ecosystem alone.',
    },
    teachingPoint:
      'Main purpose questions: identify what the passage accomplishes as a whole — the arc from setup to key conclusion. Here the arc is "assumption → discovery → overturned assumption," which B captures.',
  },

  // ── M2F-007 · rhetorical-synthesis · medium ──────────────────────────────────────
  {
    id: 'diag3-m2f-007',
    skillSlug: 'rhetorical-synthesis',
    difficulty: 'medium',
    stimulus:
      'A student is writing a blog post recommending that local governments invest in urban tree-planting programs. She has gathered the following notes:\n\n• Trees in urban areas reduce ambient temperatures by providing shade and releasing water vapor through transpiration.\n• A study found that streets with tree canopy coverage above 40% had peak summer temperatures 4–6°C lower than treeless streets.\n• Tree roots absorb stormwater runoff, reducing the risk of urban flooding.\n• Urban trees improve residents\' mental health by providing green spaces associated with reduced stress.\n• A single mature urban tree can absorb approximately 48 pounds of carbon dioxide per year.',
    question:
      'The student wants to highlight the climate benefits of urban trees for a general audience. Which choice most effectively uses the notes to accomplish this goal?',
    choices: [
      { label: 'A', text: 'Urban trees improve mental health and reduce flooding — two important reasons for local governments to invest in planting programs.' },
      { label: 'B', text: 'Studies show that streets with more than 40% tree canopy coverage have peak summer temperatures 4–6°C lower than treeless streets, and a single mature tree absorbs about 48 pounds of CO₂ per year — two direct climate benefits.' },
      { label: 'C', text: 'Urban trees provide numerous advantages to city residents, including temperature reduction, stormwater management, mental health improvements, and carbon absorption.' },
      { label: 'D', text: 'Local governments should invest in tree-planting because trees reduce flooding and provide shade for city residents.' },
    ],
    correctAnswer: 'B',
    explanation:
      'The goal specifies "climate benefits" — meaning temperature reduction and carbon absorption, both environmental/climate effects. B cites specific data for both (temperature drop and CO₂ absorption) and identifies them explicitly as "climate benefits," matching the stated goal and using concrete evidence for a general audience.',
    wrongAnswerExplanations: {
      A: 'Mental health and flooding are health and infrastructure benefits, not climate benefits specifically.',
      C: 'This is a general list that includes non-climate benefits (mental health) alongside climate ones, without emphasizing the climate angle specifically.',
      D: 'Flooding and shade are not the primary climate-change-related benefits; the notes link climate benefits to temperature and carbon absorption.',
    },
    teachingPoint:
      'Rhetorical synthesis requires matching content to the exact stated goal. "Climate benefits" is specific — eliminate answers that focus on health, flooding, or vague lists. The winning answer must use specific climate-relevant data from the notes.',
  },

  // ── M2F-008 · command-of-evidence · medium ───────────────────────────────────────
  {
    id: 'diag3-m2f-008',
    skillSlug: 'command-of-evidence',
    difficulty: 'medium',
    stimulus:
      'Psychologist Dr. Ruth Okafor studies how background noise affects cognitive performance. She claims that low-level ambient noise — such as the hum of a coffee shop — enhances creative thinking by introducing a moderate level of distraction that prevents the mind from focusing too narrowly on a problem.',
    question: 'Which finding, if true, would most directly support Dr. Okafor\'s claim?',
    choices: [
      { label: 'A', text: 'Participants who completed creative tasks in a room with a 70-decibel ambient noise level generated significantly more novel ideas than those working in a silent room or a very loud room.' },
      { label: 'B', text: 'Many writers and artists report preferring to work in coffee shops rather than in private studios.' },
      { label: 'C', text: 'Background noise reduces participants\' ability to memorize lists of unrelated words.' },
      { label: 'D', text: 'Individuals with higher tolerance for distraction tend to score higher on divergent thinking assessments regardless of the noise environment.' },
    ],
    correctAnswer: 'A',
    explanation:
      'Okafor\'s claim is that low-level ambient noise enhances creative thinking by providing a moderate distraction. A directly tests this: a 70-decibel noise condition (moderate, like a coffee shop) produced more novel ideas than silence or very loud noise — exactly the pattern the claim predicts.',
    wrongAnswerExplanations: {
      B: 'Self-reported preferences do not confirm whether performance actually improved; people may prefer coffee shops for reasons unrelated to creativity.',
      C: 'Memorizing word lists is not a creative task; this finding addresses a different cognitive function and does not support the claim about creative thinking.',
      D: 'Individual tolerance for distraction is a trait variable, not the environmental manipulation Okafor discusses. This finding would complicate, not support, her environmental claim.',
    },
    teachingPoint:
      'Evidence must directly support the specific claim, not just the general topic. Okafor claims an environmental effect (noise level → creative output). Only a study that manipulates noise level and measures creative output (A) directly tests that claim.',
  },

  // ── M2F-009 · quantitative-evidence · medium ─────────────────────────────────────
  {
    id: 'diag3-m2f-009',
    skillSlug: 'quantitative-evidence',
    difficulty: 'medium',
    stimulus:
      'A public health study examined the relationship between daily walking and cardiovascular health in adults over 60. Participants who walked fewer than 3,000 steps per day had an average resting heart rate of 76 beats per minute (bpm). Those who walked 3,000–6,000 steps per day had an average resting heart rate of 69 bpm. Participants who walked more than 6,000 steps per day had an average of 62 bpm. The researchers concluded that higher daily step counts are associated with lower resting heart rates in older adults.',
    question:
      'Which choice best uses the study data to support the researchers\' conclusion?',
    choices: [
      { label: 'A', text: 'Participants who walked more than 6,000 steps per day had an average resting heart rate of 62 bpm, compared to 76 bpm for those walking fewer than 3,000 steps — a 14 bpm difference across the highest and lowest groups.' },
      { label: 'B', text: 'Resting heart rate varied among participants, with the lowest average recorded in the most active group.' },
      { label: 'C', text: 'The study included three groups of participants, each with a different daily step target and a different average heart rate.' },
      { label: 'D', text: 'Adults over 60 who walked 3,000–6,000 steps per day had an average heart rate of 69 bpm.' },
    ],
    correctAnswer: 'A',
    explanation:
      'The conclusion is that higher step counts are associated with lower resting heart rates. A directly supports this by citing both extremes (62 bpm vs. 76 bpm) and the 14-point difference, making the association vivid and quantitative.',
    wrongAnswerExplanations: {
      B: 'Too vague — it does not provide specific numbers or characterize the magnitude of the difference.',
      C: 'This describes the study\'s structure, not the direction or size of the relationship found.',
      D: 'Citing only the middle group\'s data does not demonstrate the full association between more steps and lower heart rate.',
    },
    teachingPoint:
      'To support an association claim, cite at least two data points that contrast across the variable being studied (steps) and show the predicted pattern (more steps → lower heart rate). Vague references or single data points are insufficient.',
  },

  // ── M2F-010 · inferences · medium ────────────────────────────────────────────────
  {
    id: 'diag3-m2f-010',
    skillSlug: 'inferences',
    difficulty: 'medium',
    stimulus:
      'Historians have long assumed that the printing press, invented in Europe in the mid-fifteenth century, caused literacy rates to rise by making books cheaper and more widely available. However, recent scholarship reveals that literacy rates in many European cities remained largely unchanged for more than a century after the press was introduced, despite a dramatic increase in the number of printed books. Scholars now note that most early printed books were sold to people who were already literate and that formal schooling, not access to books, was the primary driver of literacy gains.',
    question:
      'Which choice most logically completes the following inference? The passage suggests that simply increasing the supply of educational materials in a community may ______',
    choices: [
      { label: 'A', text: 'lower production costs enough to make those materials affordable to all income groups' },
      { label: 'B', text: 'eventually cause literacy rates to rise once the materials reach a critical distribution threshold' },
      { label: 'C', text: 'not raise literacy rates if access to formal instruction remains limited' },
      { label: 'D', text: 'reduce the social status associated with being literate, since reading becomes more common' },
    ],
    correctAnswer: 'C',
    explanation:
      'The passage establishes that more books did not raise literacy in post-press Europe because the books reached already-literate buyers and schooling — not books — drove literacy gains. The logical inference is that more materials alone won\'t work without instruction.',
    wrongAnswerExplanations: {
      A: 'Production costs and affordability are not discussed; the passage\'s point is that even widely available books did not reach the illiterate population.',
      B: 'A "critical threshold" implies that eventually books alone would work — but the passage\'s point is that schooling, not books, was the driver. This contradicts the passage.',
      D: 'Social status of literacy is never discussed in the passage; this adds an unsupported speculation.',
    },
    teachingPoint:
      'Logical completion questions: identify the principle the passage demonstrates, then find the answer that applies that principle. Here: more books ≠ more literacy (without schooling). C states this principle directly.',
  },

  // ── M2F-011 · cross-text-connections · medium ────────────────────────────────────
  {
    id: 'diag3-m2f-011',
    skillSlug: 'cross-text-connections',
    difficulty: 'medium',
    stimulus:
      'Text 1\nEcologist Dr. Jana Bauer argues that rewilding — reintroducing predators like wolves into ecosystems from which they were removed — produces dramatic ecological benefits. When wolves were reintroduced to Yellowstone National Park, deer herds were reduced and their behavior changed: deer avoided grazing in open valleys, allowing vegetation to recover along riverbanks and ultimately stabilizing stream banks.\n\nText 2\nRancher and land-use advocate Dale Morrison contends that wolf reintroduction programs prioritize ecological theory over the livelihoods of rural communities. In regions where wolves have returned, livestock losses have increased substantially, and compensation programs have been slow and insufficient to offset ranchers\' financial losses.',
    question:
      'Based on the texts, how would Morrison most likely respond to Bauer\'s argument about the ecological benefits of rewilding?',
    choices: [
      { label: 'A', text: 'By agreeing that rewilding produces ecological benefits but arguing those benefits are outweighed by economic harm to rural communities' },
      { label: 'B', text: 'By denying that wolves have any effect on deer behavior or riverbank vegetation' },
      { label: 'C', text: 'By calling for more scientific research before any conclusions about rewilding can be drawn' },
      { label: 'D', text: 'By arguing that rewilding programs should be expanded to all national parks' },
    ],
    correctAnswer: 'A',
    explanation:
      'Morrison does not dispute the ecological claims in Text 1; his argument is about cost to rural communities (livestock losses, inadequate compensation). He would likely concede the ecological point while arguing the human economic cost is unacceptable — exactly what A describes.',
    wrongAnswerExplanations: {
      B: 'Morrison\'s argument is economic, not ecological; he does not challenge the scientific findings about deer behavior or vegetation.',
      C: 'Morrison takes a position; he does not call for more research before conclusions are drawn.',
      D: 'Morrison opposes rewilding due to its economic costs — he would not argue for its expansion.',
    },
    teachingPoint:
      'Cross-text questions: identify each author\'s core argument. Bauer\'s is ecological benefit; Morrison\'s is economic harm to ranchers. Morrison would likely concede the ecological point to focus on his own concern — that is a partial agreement, not denial or full opposition.',
  },

  // ── M2F-012 · boundaries · hard ──────────────────────────────────────────────────
  {
    id: 'diag3-m2f-012',
    skillSlug: 'boundaries',
    difficulty: 'hard',
    question:
      'The novelist\'s prose ______ once spare and precise in her early work ______ grew increasingly baroque over the decades, eventually producing sentences that stretched across half a page.',
    choices: [
      { label: 'A', text: ', / ,' },
      { label: 'B', text: ': / ,' },
      { label: 'C', text: '; / ,' },
      { label: 'D', text: '— / —' },
    ],
    correctAnswer: 'A',
    explanation:
      'The phrase "once spare and precise in her early work" is a nonessential appositive modifier that interrupts the main clause "The novelist\'s prose grew increasingly baroque." Commas on both sides of the interrupter correctly set off this nonessential element.',
    wrongAnswerExplanations: {
      B: 'A colon introduces what follows an independent clause; it cannot open a mid-sentence nonessential modifier.',
      C: 'A semicolon must be followed by an independent clause. "Once spare and precise in her early work" is a modifier, not an independent clause, so a semicolon here is ungrammatical.',
      D: 'While dashes can set off a nonessential phrase, the answer choices are formatted as single characters for each blank — only commas (A) produce a standard, unambiguous result for this type of interrupter.',
    },
    teachingPoint:
      'To set off a nonessential mid-sentence modifier, use matching punctuation on both sides: comma + comma, or dash + dash. A colon or semicolon cannot open such a phrase because neither can be followed by a non-independent construction.',
  },

  // ── M2F-013 · words-in-context · hard ────────────────────────────────────────────
  {
    id: 'diag3-m2f-013',
    skillSlug: 'words-in-context',
    difficulty: 'hard',
    stimulus:
      'The CEO\'s quarterly address was, by every measure, [ANODYNE]: she thanked the team, acknowledged the year\'s challenges without specifics, and offered optimistic projections without explaining how they would be achieved. Analysts hoping for substantive guidance left the call with nothing actionable.',
    question: 'As used in the text, [ANODYNE] most nearly means',
    choices: [
      { label: 'A', text: 'soothing and pain-relieving' },
      { label: 'B', text: 'hostile and confrontational' },
      { label: 'C', text: 'inoffensive but empty of substance' },
      { label: 'D', text: 'technically accurate' },
    ],
    correctAnswer: 'C',
    explanation:
      '"Anodyne" literally means pain-relieving (A is the medical definition), but in this context the speech avoided specifics and left analysts with "nothing actionable." The contextual meaning is that it was bland and non-substantive — soothing in the sense of inoffensive, but hollow.',
    wrongAnswerExplanations: {
      A: 'This is the literal/medical definition of "anodyne," but the context describes a corporate speech that lacked substance — the word is being used figuratively to mean blandly inoffensive.',
      B: 'The speech was the opposite of hostile; it was carefully non-committal.',
      D: '"Technically accurate" implies precision; the passage says the address lacked specifics, which contradicts accuracy.',
    },
    teachingPoint:
      'Hard vocabulary questions often use a word in a transferred/figurative sense that diverges from its primary dictionary meaning. When you recognize the literal meaning (A), check whether the context supports a more nuanced, figurative usage.',
  },

  // ── M2F-014 · form-structure-sense · hard ────────────────────────────────────────
  {
    id: 'diag3-m2f-014',
    skillSlug: 'form-structure-sense',
    difficulty: 'hard',
    question:
      'The foundation\'s grants support not only emerging artists ______ established institutions seeking to expand their community outreach programs.',
    choices: [
      { label: 'A', text: 'but also' },
      { label: 'B', text: 'as well as' },
      { label: 'C', text: 'and also' },
      { label: 'D', text: 'but also to' },
    ],
    correctAnswer: 'A',
    explanation:
      '"Not only… but also" is a paired correlative conjunction that requires a parallel structure. The sentence already has "not only," so "but also" must complete the pair. The items joined are "emerging artists" (noun phrase) and "established institutions" (noun phrase) — both parallel.',
    wrongAnswerExplanations: {
      B: '"As well as" does not pair with "not only"; "not only… as well as" is not a standard correlative construction.',
      C: '"And also" is not the correlative partner of "not only"; the grammatically correct pair is "not only… but also."',
      D: '"But also to" introduces "to," which would require a verb (infinitive) to follow; "established institutions" is a noun phrase, not an infinitive. The "to" breaks the parallel structure.',
    },
    teachingPoint:
      'Correlative conjunctions come in fixed pairs: not only/but also, either/or, neither/nor, both/and. When you see one member of the pair in the sentence, the other member is required. Also verify that the items being joined are parallel in form.',
  },

  // ── M2F-015 · central-ideas-details · hard ───────────────────────────────────────
  {
    id: 'diag3-m2f-015',
    skillSlug: 'central-ideas-details',
    difficulty: 'hard',
    stimulus:
      'Historians of medicine have documented that the nineteenth-century physician Ignaz Semmelweis dramatically reduced maternal mortality at a Vienna maternity clinic by requiring physicians to wash their hands with chlorinated lime solution before delivering babies. Despite his results — mortality rates dropped from roughly 10% to under 2% — the medical establishment largely rejected his findings during his lifetime. His colleagues objected that his hypothesis (that physicians\' hands carried "cadaverous particles" from autopsies to patients) lacked a theoretical framework acceptable to contemporary medicine, which had not yet accepted germ theory.',
    question: 'Which choice best states the main idea of the text?',
    choices: [
      { label: 'A', text: 'Semmelweis\'s hand-washing protocol was ineffective because germ theory had not yet been established.' },
      { label: 'B', text: 'Although Semmelweis\'s hand-washing intervention demonstrably saved lives, it was rejected by the medical community because it lacked a theoretically acceptable explanation.' },
      { label: 'C', text: 'The nineteenth-century medical establishment was generally hostile to all new ideas about infectious disease.' },
      { label: 'D', text: 'Germ theory is the most important development in the history of medicine because it provided the framework needed to understand discoveries like Semmelweis\'s.' },
    ],
    correctAnswer: 'B',
    explanation:
      'The text presents both sides of the Semmelweis story: the evidence of effectiveness (mortality drop from 10% to 2%) and the reason for rejection (no acceptable theoretical framework pre-germ theory). B integrates both elements — the demonstrated success and the theory-based rejection.',
    wrongAnswerExplanations: {
      A: 'The opposite is true — Semmelweis\'s protocol was highly effective; the passage never suggests it was ineffective.',
      C: 'The text does not claim the establishment was hostile to all new ideas — only to Semmelweis\'s specific hypothesis for a specific reason (lack of theoretical framework).',
      D: 'The text does not evaluate germ theory\'s overall importance in medicine; it uses germ theory only to explain why Semmelweis\'s peers rejected him.',
    },
    teachingPoint:
      'Hard central-ideas questions often have a distractor that is a true statement from outside the passage (D) or one that overgeneralizes (C). The correct answer must match the specific argument the passage makes — not a broader true claim about the same historical period.',
  },

  // ── M2F-016 · transitions · hard ─────────────────────────────────────────────────
  {
    id: 'diag3-m2f-016',
    skillSlug: 'transitions',
    difficulty: 'hard',
    stimulus:
      'Early usability studies found that users preferred websites with fewer menu options, as choice overload made navigation feel overwhelming. ______ more recent research complicates this picture: in domains where users have high expertise or strong preferences — such as online retailers browsing detailed product specifications — broader menus can improve satisfaction and task completion.',
    question: 'Which choice completes the text with the most logical transition?',
    choices: [
      { label: 'A', text: 'Therefore,' },
      { label: 'B', text: 'In addition,' },
      { label: 'C', text: 'Nevertheless,' },
      { label: 'D', text: 'Consequently,' },
    ],
    correctAnswer: 'C',
    explanation:
      'The first sentence establishes a research finding (fewer options = better). The second sentence introduces evidence that complicates this — in some cases, more options work better. "Nevertheless" introduces a point that holds true despite what was established before — exactly the relationship here: despite the earlier finding, more recent research complicates it.',
    wrongAnswerExplanations: {
      A: '"Therefore" introduces a logical conclusion from the first sentence, but the second sentence challenges, not follows from, the first.',
      B: '"In addition" adds information consistent with the first sentence, but the second sentence is a complication or qualification, not an additional supporting point.',
      D: '"Consequently" means "as a result" — the same error as A; the second sentence is not a consequence of the first.',
    },
    teachingPoint:
      '"Nevertheless" vs. "however": both signal contrast, but "nevertheless" implies "despite this, X is still true/happening." It is the best choice when the second sentence introduces an exception or complication rather than a flat contradiction. "However" works here too — if both appear as choices, pick "nevertheless" when the second clause concedes the first point before qualifying it.',
  },

  // ── M2F-017 · text-structure-purpose · hard ──────────────────────────────────────
  {
    id: 'diag3-m2f-017',
    skillSlug: 'text-structure-purpose',
    difficulty: 'hard',
    stimulus:
      'The development of antibiotics in the twentieth century is frequently described as one of medicine\'s greatest triumphs. Penicillin alone has saved an estimated 200 million lives since its clinical introduction. Yet scientists now warn of an "antibiotic apocalypse" — a future in which bacterial infections once again become untreatable. Bacterial species have evolved resistance mechanisms faster than pharmaceutical companies have developed new antibiotics, partly because overprescription and agricultural use have accelerated the selection pressure that drives resistance. The same triumph that extended millions of lives may thus be laying the groundwork for a future crisis.',
    question: 'What is the function of the final sentence in the structure of the passage?',
    choices: [
      { label: 'A', text: 'To introduce a new argument that contradicts the overall positive assessment of antibiotics in the passage' },
      { label: 'B', text: 'To summarize the passage\'s central tension by linking the historical success of antibiotics to the origin of the current resistance crisis' },
      { label: 'C', text: 'To provide specific data about the number of lives that could be lost if antibiotic resistance is not addressed' },
      { label: 'D', text: 'To recommend that pharmaceutical companies accelerate the development of new antibiotics' },
    ],
    correctAnswer: 'B',
    explanation:
      'The final sentence explicitly connects the triumph (saving millions of lives) to the crisis (the resistance problem — "laying the groundwork for a future crisis"). It does not introduce a new argument or data; it resolves the tension the passage has built by showing the two sides are causally linked.',
    wrongAnswerExplanations: {
      A: 'The sentence does not contradict the positive assessment — it reaffirms the triumph while showing how it contributed to the crisis; it completes, not reverses, the passage\'s logic.',
      C: 'No new statistics are provided in the final sentence.',
      D: 'No recommendation is made; the passage is analytical, not prescriptive.',
    },
    teachingPoint:
      'When a passage builds toward a paradox or irony, the final sentence\'s function is usually to crystallize the tension — it connects the two sides established in the passage. Identify what the passage has been building toward and check whether the final sentence delivers that payoff.',
  },

  // ── M2F-018 · rhetorical-synthesis · hard ────────────────────────────────────────
  {
    id: 'diag3-m2f-018',
    skillSlug: 'rhetorical-synthesis',
    difficulty: 'hard',
    stimulus:
      'A student is writing an argumentative essay urging cities to adopt mandatory composting programs. He has gathered the following notes:\n\n• Food waste in landfills decomposes anaerobically, producing methane, a greenhouse gas approximately 80 times more potent than CO₂ over a 20-year period.\n• Composting diverts food waste from landfills and converts it into nutrient-rich soil amendment used in agriculture and landscaping.\n• San Francisco, which implemented mandatory composting in 2009, now diverts over 80% of its waste from landfills.\n• A 2021 EPA report estimated that food waste accounts for approximately 58% of landfill methane emissions in the United States.\n• Critics argue that mandatory composting programs impose compliance burdens on small businesses and low-income households.',
    question:
      'The student wants to open the essay\'s first body paragraph by establishing the environmental urgency of the problem before proposing composting as a solution. Which choice most effectively uses the notes to accomplish this goal?',
    choices: [
      { label: 'A', text: 'Composting is an effective way to divert food waste from landfills, as San Francisco\'s 80% diversion rate demonstrates.' },
      { label: 'B', text: 'According to a 2021 EPA report, food waste generates approximately 58% of landfill methane emissions, and methane is roughly 80 times more potent than CO₂ over 20 years — making food waste a significant driver of climate change.' },
      { label: 'C', text: 'Critics argue that mandatory composting imposes burdens on small businesses, but San Francisco\'s program shows it is achievable at scale.' },
      { label: 'D', text: 'Composting converts food waste into nutrient-rich soil amendment, benefiting agriculture and reducing the volume of landfill waste.' },
    ],
    correctAnswer: 'B',
    explanation:
      'The goal is to establish environmental urgency before proposing the solution. B does exactly this: it uses the EPA statistic (58% of landfill methane) and the potency figure (80× CO₂) to show the scale of the problem. It does not yet propose composting — it makes the case that the problem demands attention.',
    wrongAnswerExplanations: {
      A: 'This leads with the solution (composting and San Francisco) rather than with the problem; it does not establish urgency first.',
      C: 'This opens with a counterargument — not the standard structure for a first body paragraph intended to establish a problem.',
      D: 'This describes the benefit of composting (the solution), not the urgency of the problem it solves.',
    },
    teachingPoint:
      'Hard rhetorical synthesis goals often specify a structural move within the essay (e.g., "establish the problem before proposing the solution"). The correct answer must follow that structural logic — not just be true or relevant. Eliminate answers that arrive at the solution too soon.',
  },

  // ── M2F-019 · command-of-evidence · hard ─────────────────────────────────────────
  {
    id: 'diag3-m2f-019',
    skillSlug: 'command-of-evidence',
    difficulty: 'hard',
    stimulus:
      'Sociologist Dr. Ingrid Larsson studies how remote work policies affect career advancement. She argues that employees who work fully remotely are less likely to receive promotions than those who work in the office at least part of the time, because remote workers receive less informal visibility with managers — spontaneous conversations, visible effort during crises, and casual interactions that build professional relationships.',
    question: 'Which finding, if true, would most directly support Larsson\'s argument?',
    choices: [
      { label: 'A', text: 'In a five-year longitudinal study, fully remote employees received promotions at a rate 23% lower than hybrid employees with equivalent performance review scores.' },
      { label: 'B', text: 'Surveys show that remote employees report higher job satisfaction and lower burnout rates than fully in-office employees.' },
      { label: 'C', text: 'Companies with fully remote workforces have lower average office-lease costs, allowing them to invest more in employee compensation.' },
      { label: 'D', text: 'Managers who work remotely themselves are more likely to promote remote employees than managers who work in the office.' },
    ],
    correctAnswer: 'A',
    explanation:
      'Larsson\'s argument has two parts: (1) remote workers are less likely to be promoted, and (2) this is because they lack informal visibility. A directly confirms part 1 by showing a promotion gap even when performance scores are equivalent — ruling out performance as the explanation and implying something else (like visibility) accounts for the difference.',
    wrongAnswerExplanations: {
      B: 'Job satisfaction and burnout concern wellbeing, not promotion rates; this does not address Larsson\'s specific claim.',
      C: 'Office lease costs and compensation are financial, not career-advancement, effects of remote work.',
      D: 'A manager\'s own work style moderating the effect complicates Larsson\'s claim rather than supporting it; it suggests the promotion gap depends on context.',
    },
    teachingPoint:
      'Hard command-of-evidence questions often include a distractor (D) that engages meaningfully with the topic but actually complicates rather than supports the claim. Support requires confirming the claim as stated; a finding that introduces moderating variables does not support a general claim.',
  },

  // ── M2F-020 · quantitative-evidence · hard ───────────────────────────────────────
  {
    id: 'diag3-m2f-020',
    skillSlug: 'quantitative-evidence',
    difficulty: 'hard',
    stimulus:
      'A study examined how library type affected student research performance at a large university. Students who used the physical library at least twice per week earned an average GPA of 3.42 and reported 78% satisfaction with their research process. Students who used only the online library database earned an average GPA of 3.38 and reported 71% satisfaction. The researchers concluded that regular physical library use is associated with modestly higher research satisfaction, though the GPA difference was too small to be considered meaningful.',
    question:
      'Which choice best uses the data to support the researchers\' specific conclusion about satisfaction — and only that conclusion?',
    choices: [
      { label: 'A', text: 'Students who used the physical library at least twice per week had both a higher GPA (3.42 vs. 3.38) and higher research satisfaction (78% vs. 71%) than online-only users.' },
      { label: 'B', text: 'Physical library users reported 78% satisfaction compared to 71% for online-only users, a 7-point difference suggesting a modest positive association between physical library use and research satisfaction.' },
      { label: 'C', text: 'The physical library group earned an average GPA of 3.42, while online-only users earned 3.38, a difference the researchers deemed too small to be meaningful.' },
      { label: 'D', text: 'Students who used the library regularly outperformed online-only users on both measured outcomes, confirming the overall benefits of physical library use.' },
    ],
    correctAnswer: 'B',
    explanation:
      'The conclusion to be supported is specifically about satisfaction, and the researchers note the GPA difference is not meaningful. B correctly cites the satisfaction data (78% vs. 71%) and characterizes it as a "modest positive association" — matching the researchers\' own qualified language — without invoking GPA.',
    wrongAnswerExplanations: {
      A: 'Includes the GPA data alongside the satisfaction data, but the researchers specifically said the GPA difference was too small to be meaningful — citing it here is misleading.',
      C: 'Discusses GPA only, not satisfaction — the wrong outcome for the stated conclusion.',
      D: '"Confirmed overall benefits" overstates; the researchers qualified their conclusion (GPA not meaningful; satisfaction modest). Also, D is vague about which data point supports which conclusion.',
    },
    teachingPoint:
      'Hard quantitative evidence questions often include multiple data points — only one of which directly supports the specified conclusion. Match data to the exact claim: here the claim is about satisfaction, not GPA. Also match the qualifier: the researchers said "modest," so the answer should not overclaim.',
  },

  // ── M2F-021 · inferences · hard ──────────────────────────────────────────────────
  {
    id: 'diag3-m2f-021',
    skillSlug: 'inferences',
    difficulty: 'hard',
    stimulus:
      'Botanist Dr. Fatima El-Sayed studies drought-resistant plants in arid North African ecosystems. She notes that several desert shrub species in the region have developed extremely deep root systems — some extending more than 20 meters below the surface — to access groundwater unavailable to shallower-rooted competitors. However, she also observes that these same species have very sparse leaf canopies. Because leaves transpire water, having fewer leaves limits water loss when groundwater is scarce or the cost of pumping water from depth is metabolically high.',
    question:
      'Which choice most logically completes the following inference? El-Sayed\'s observations suggest that in very arid environments, plants may face a trade-off in which ______',
    choices: [
      { label: 'A', text: 'developing deep roots necessarily causes the plant to produce more leaves over time' },
      { label: 'B', text: 'maximizing water access through deep roots may require limiting water expenditure through leaf reduction' },
      { label: 'C', text: 'species with the deepest root systems will eventually outcompete all shallower-rooted species regardless of leaf canopy size' },
      { label: 'D', text: 'the metabolic cost of deep root growth is always too high to be offset by the benefits of reaching groundwater' },
    ],
    correctAnswer: 'B',
    explanation:
      'El-Sayed describes two adaptations: deep roots to access water, and sparse leaves to limit water loss. The inference is that these two adaptations relate to a single underlying trade-off: getting water (deep roots) vs. spending water (leaves). B directly states this trade-off.',
    wrongAnswerExplanations: {
      A: 'The passage says the opposite — deep roots correlate with sparse, not more, leaves.',
      C: 'The passage does not discuss competitive outcomes or long-term dominance; it describes the physiological adaptations of these specific species.',
      D: '"Always too high" overstates — the passage implies the plants do benefit from deep roots (they access groundwater unavailable to competitors), so the cost is not always prohibitive.',
    },
    teachingPoint:
      'Hard inference questions often require you to synthesize two described phenomena into a single principle. Here, deep roots + sparse leaves = a trade-off between water access and water expenditure. The correct answer names the trade-off, not just one of the two phenomena.',
  },

  // ── M2F-022 · cross-text-connections · hard ──────────────────────────────────────
  {
    id: 'diag3-m2f-022',
    skillSlug: 'cross-text-connections',
    difficulty: 'hard',
    stimulus:
      'Text 1\nArt historian Dr. Nadia Fontaine argues that the rise of digital image reproduction has democratized access to great art: anyone with an internet connection can now view high-resolution images of works housed in the world\'s most exclusive museums. She contends that this widened access is an unambiguous cultural good, reducing the advantage that wealthy travelers have long enjoyed.\n\nText 2\nMuseum curator Omar Rashid acknowledges that digital reproduction has expanded access to art images, but he cautions that the experience of viewing a reproduction differs fundamentally from encountering the original. Scale, texture, the physical presence of the object, and the social experience of being in a museum with other viewers are all lost in digital mediation. Rashid worries that widespread digital access may paradoxically reduce motivation to visit museums in person.',
    question:
      'Which choice best describes the relationship between the two texts?',
    choices: [
      { label: 'A', text: 'Text 1 and Text 2 agree that digital reproduction has made art more accessible but disagree about whether expanded access is entirely beneficial.' },
      { label: 'B', text: 'Text 2 contradicts Text 1\'s central claim by denying that digital images provide any meaningful access to art.' },
      { label: 'C', text: 'Text 1 focuses on economic equity, while Text 2 argues that economic inequality in art access has not actually decreased.' },
      { label: 'D', text: 'Both texts conclude that museums should adopt digital reproduction strategies to attract more visitors.' },
    ],
    correctAnswer: 'A',
    explanation:
      'Both authors agree on the factual premise: digital reproduction has expanded access. They diverge on value: Fontaine calls it an "unambiguous cultural good," while Rashid qualifies it by noting what is lost (texture, scale, social experience) and raising concerns about reduced in-person motivation.',
    wrongAnswerExplanations: {
      B: 'Rashid does not deny that digital reproduction provides meaningful access — he acknowledges it while noting its limits. "Denying any meaningful access" overstates his position.',
      C: 'Rashid does not address economic inequality at all; his concern is experiential, not economic.',
      D: 'Neither text recommends a museum strategy; both are analytical, not prescriptive.',
    },
    teachingPoint:
      'Hard cross-text relationship questions often have a distractor that overstates disagreement (B). The key is to find where the texts agree (both concede expanded access) and where they diverge (Fontaine: unambiguous good; Rashid: qualified/has downsides). A captures both the agreement and the divergence precisely.',
  },
]

export function buildDiagnosticV3M1Questions(): DrillQuestion[] {
  return [...DIAGNOSTIC_V3_M1_QUESTIONS]
}

export function buildDiagnosticV3M2FoundationQuestions(): DrillQuestion[] {
  return [...DIAGNOSTIC_V3_M2_FOUNDATION_QUESTIONS]
}
