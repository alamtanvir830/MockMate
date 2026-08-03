import type { RWQuestion } from '../types'

export const f3RwModule1QuestionsV2: RWQuestion[] = [
  // ─── Q01 · Craft and Structure · Words in Context · easy ─────────────────────
  {
    id: 'sat-f3-v2-rw-m1-q01',
    section: 'reading-writing',
    moduleId: 'f3v2-rw-module-1',
    domain: 'Craft and Structure',
    skill: 'Words in Context',
    difficulty: 'easy',
    stimulus:
      'Biomimicry engineers study living organisms not merely as curiosities but as _______ for novel design solutions: the microscopic hooks on a burdock seed that inspired hook-and-loop fasteners, or the hexagonal geometry of a honeycomb that now underpins lightweight structural panels used in aircraft.',
    question:
      'Which choice completes the text with the most logical and precise word or phrase?',
    choices: [
      { label: 'A', text: 'blueprints' },
      { label: 'B', text: 'obstacles' },
      { label: 'C', text: 'substitutes' },
      { label: 'D', text: 'curiosities' },
    ],
    correctAnswer: 'A',
    explanation:
      '"Blueprints" means detailed plans or models used as a basis for design. The passage describes organisms as sources of inspiration that directly guide engineering solutions — exactly what blueprints provide.',
    wrongAnswerExplanations: {
      B: '"Obstacles" means hindrances; the passage presents organisms as useful, not problematic.',
      C: '"Substitutes" means replacements for something else, but organisms are the originals, not stand-ins.',
      D: 'The passage explicitly says organisms are studied "not merely as curiosities," so repeating that word creates a logical contradiction.',
    },
  },

  // ─── Q02 · Craft and Structure · Words in Context · medium ──────────────────
  {
    id: 'sat-f3-v2-rw-m1-q02',
    section: 'reading-writing',
    moduleId: 'f3v2-rw-module-1',
    domain: 'Craft and Structure',
    skill: 'Words in Context',
    difficulty: 'medium',
    stimulus:
      'The diplomat\'s address at the summit was deliberately _______ : rather than committing her government to specific timetables or binding targets, she spoke in broad aspirational language that gave allies room to interpret the remarks favorably while giving opponents little concrete language to challenge.',
    question:
      'Which choice completes the text with the most logical and precise word or phrase?',
    choices: [
      { label: 'A', text: 'ambiguous' },
      { label: 'B', text: 'inflammatory' },
      { label: 'C', text: 'prescriptive' },
      { label: 'D', text: 'candid' },
    ],
    correctAnswer: 'A',
    explanation:
      '"Ambiguous" means open to multiple interpretations. The passage describes remarks designed to avoid specifics so that different audiences could interpret them as they wished — a deliberate strategy of ambiguity.',
    wrongAnswerExplanations: {
      B: '"Inflammatory" means provoking anger or hostility; the passage describes language designed to avoid controversy, not provoke it.',
      C: '"Prescriptive" means providing specific rules or directions, which is the opposite of what the diplomat avoided.',
      D: '"Candid" means direct and forthright, which contradicts the deliberate vagueness the passage describes.',
    },
  },

  // ─── Q03 · Expression of Ideas · Rhetorical Synthesis · medium ──────────────
  {
    id: 'sat-f3-v2-rw-m1-q03',
    section: 'reading-writing',
    moduleId: 'f3v2-rw-module-1',
    domain: 'Expression of Ideas',
    skill: 'Rhetorical Synthesis',
    difficulty: 'medium',
    stimulus:
      'A student is writing a report on light pollution for an astronomy club newsletter. The student has gathered the following notes:\n• Artificial light at night has increased global sky brightness by approximately 10% per year over the past two decades.\n• The Milky Way is no longer visible to more than one-third of humanity, including nearly 80% of North Americans.\n• Migratory birds navigate using star patterns; excess artificial light disorients them, causing millions of collision deaths annually.\n• Sea turtle hatchlings instinctively move toward the brightest horizon, which in nature is the ocean; beachfront lighting redirects them inland, where they die.\n• Exposure to artificial light at night suppresses melatonin production in humans and has been linked to increased rates of sleep disorders and certain cancers.',
    question:
      'The student wants to emphasize that light pollution harms multiple species, not just humans. Which choice most effectively uses relevant information from the notes to accomplish this goal?',
    choices: [
      { label: 'A', text: 'Artificial light at night has grown by roughly 10% per year globally and now prevents more than a third of people worldwide from seeing the Milky Way.' },
      { label: 'B', text: 'Light pollution disrupts migratory birds\' star-based navigation and redirects sea turtle hatchlings away from the ocean, demonstrating its lethal consequences for wildlife beyond the human health impacts already documented.' },
      { label: 'C', text: 'Sea turtle hatchlings rely on horizon brightness to find the ocean, but beachfront lighting causes them to move inland instead, resulting in high mortality rates.' },
      { label: 'D', text: 'Suppressed melatonin production linked to artificial light at night has been associated with sleep disorders and cancer risk in humans, making light pollution a significant public health issue.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Choice B accomplishes the goal by citing two non-human species (migratory birds and sea turtles) and explicitly framing their harms as evidence that light pollution affects wildlife beyond its human health impacts — directly making the "multiple species, not just humans" argument.',
    wrongAnswerExplanations: {
      A: 'This choice covers the scale of sky brightness loss and human loss of the Milky Way, but neither addresses wildlife impacts nor makes a multi-species argument.',
      C: 'This choice discusses only sea turtles and does not mention any other species or contrast wildlife effects with human effects — it does not make the "multiple species" argument.',
      D: 'This choice focuses exclusively on human health (melatonin, sleep disorders, cancer) and does not address wildlife at all, directly contradicting the goal.',
    },
  },

  // ─── Q04 · Expression of Ideas · Rhetorical Synthesis · hard ────────────────
  {
    id: 'sat-f3-v2-rw-m1-q04',
    section: 'reading-writing',
    moduleId: 'f3v2-rw-module-1',
    domain: 'Expression of Ideas',
    skill: 'Rhetorical Synthesis',
    difficulty: 'hard',
    stimulus:
      'A student is writing an argumentative essay for a political science class on the limits of economic sanctions as a foreign policy tool. The student has gathered the following notes:\n• A 2019 meta-analysis of 174 sanctions episodes found that sanctions achieved their stated political objectives in fewer than 30% of cases.\n• Sanctions against Cuba, Iran, and North Korea have remained in place for decades without producing the leadership changes or policy reversals their architects intended.\n• Humanitarian organizations report that sanctions disproportionately harm civilian populations through shortages of medicine and food rather than the ruling elites they target.\n• Some economists argue that sanctions can accelerate domestic import-substitution industries in targeted countries, reducing long-term economic dependence on sanctioning states.\n• Targeted "smart sanctions" — asset freezes and travel bans aimed at specific officials — have shown higher success rates in recent case studies than broad trade embargoes.',
    question:
      'The student wants to concede that not all sanctions are equally ineffective while maintaining the overall argument that broad sanctions frequently fail to achieve their goals. Which choice most effectively accomplishes this?',
    choices: [
      { label: 'A', text: 'Although broad trade sanctions against Cuba, Iran, and North Korea have not achieved their intended political outcomes after decades of implementation, smart sanctions targeting specific officials have shown more promising results in recent case studies.' },
      { label: 'B', text: 'Economic sanctions are a flawed foreign policy instrument: a meta-analysis found success in fewer than 30% of cases, and humanitarian organizations have documented their tendency to harm civilian populations rather than ruling elites.' },
      { label: 'C', text: 'Some economists note that sanctions can inadvertently strengthen targeted economies by stimulating import-substitution industries, suggesting that the tool may produce outcomes opposite to those intended.' },
      { label: 'D', text: 'Smart sanctions such as asset freezes and travel bans succeed more often than broad embargoes, demonstrating that precision in sanction design largely eliminates the ineffectiveness problem.' },
    ],
    correctAnswer: 'A',
    explanation:
      'Choice A accomplishes both tasks: it concedes a genuine exception (smart sanctions\' higher success rates) while keeping the focus on broad sanctions\' persistent failures (Cuba, Iran, North Korea) — maintaining the overall argument without overgeneralizing.',
    wrongAnswerExplanations: {
      B: 'This choice supports the overall argument but makes no concession; it does not acknowledge any form of sanctions that work more effectively, so it does not "concede" as the goal requires.',
      C: 'This choice introduces an economic counter-argument about import substitution but does not address whether any type of sanction is effective — it does not concede effectiveness of smart sanctions.',
      D: 'This choice overconcedes: by saying precision "largely eliminates the ineffectiveness problem," it undermines rather than maintains the overall argument that broad sanctions frequently fail.',
    },
  },

  // ─── Q05 · Craft and Structure · Words in Context · hard ─────────────────────
  {
    id: 'sat-f3-v2-rw-m1-q05',
    section: 'reading-writing',
    moduleId: 'f3v2-rw-module-1',
    domain: 'Craft and Structure',
    skill: 'Words in Context',
    difficulty: 'hard',
    stimulus:
      'The historian cautioned against reading modern democratic expectations back into medieval political thought. Medieval theorists did not consider popular sovereignty a _______ of legitimate rule; authority derived from divine sanction, hereditary right, and customary law, none of which required the governed to actively confer legitimacy.',
    question:
      'Which choice completes the text with the most logical and precise word or phrase?',
    choices: [
      { label: 'A', text: 'prerequisite' },
      { label: 'B', text: 'consequence' },
      { label: 'C', text: 'corollary' },
      { label: 'D', text: 'compromise' },
    ],
    correctAnswer: 'A',
    explanation:
      '"Prerequisite" means a condition required before something can exist or be valid. The passage argues that medieval thinkers did not consider popular consent a required condition for legitimate rule — exactly what "prerequisite" captures.',
    wrongAnswerExplanations: {
      B: '"Consequence" means a result or effect; popular sovereignty as a result of legitimate rule would be a different claim than popular sovereignty as a necessary condition for it.',
      C: '"Corollary" means a proposition that follows directly from a proven one; it implies derivation, not necessity — subtly different from the required-condition meaning the passage needs.',
      D: '"Compromise" means a settlement reached by mutual concession, which does not fit the logical relationship being described between popular consent and legitimate rule.',
    },
  },

  // ─── Q06 · Craft and Structure · Text Structure and Purpose · easy ────────────
  {
    id: 'sat-f3-v2-rw-m1-q06',
    section: 'reading-writing',
    moduleId: 'f3v2-rw-module-1',
    domain: 'Craft and Structure',
    skill: 'Text Structure and Purpose',
    difficulty: 'easy',
    stimulus:
      'Traditional ceramic glazes derive their colors from metal oxides fired at high temperatures: copper produces greens and turquoises, iron yields browns and blacks, and cobalt creates the deep blues that have defined Chinese porcelain for centuries. Contemporary studio potters have largely preserved these formulas, though some now blend synthetic mineral pigments to extend the available palette beyond what naturally occurring oxides can achieve.',
    question:
      'Which choice best describes the overall structure of the passage?',
    choices: [
      { label: 'A', text: 'It presents a criticism of traditional techniques and advocates for modern alternatives' },
      { label: 'B', text: 'It provides background on a traditional practice and then notes a contemporary development within it' },
      { label: 'C', text: 'It poses a question about ceramic production and then answers it with experimental evidence' },
      { label: 'D', text: 'It describes a historical decline in traditional ceramics and predicts its eventual replacement' },
    ],
    correctAnswer: 'B',
    explanation:
      'The first sentence explains the principle behind traditional glazes with examples; the second sentence describes what contemporary potters do — largely preserving traditions while extending them. This is a background-then-development structure.',
    wrongAnswerExplanations: {
      A: 'The passage does not criticize traditional techniques; it describes them neutrally and notes a complementary development.',
      C: 'No question is posed, and no experimental evidence is provided.',
      D: 'The passage describes continuity and extension of traditional practice, not decline or replacement.',
    },
  },

  // ─── Q07 · Craft and Structure · Text Structure and Purpose · medium ──────────
  {
    id: 'sat-f3-v2-rw-m1-q07',
    section: 'reading-writing',
    moduleId: 'f3v2-rw-module-1',
    domain: 'Craft and Structure',
    skill: 'Text Structure and Purpose',
    difficulty: 'medium',
    stimulus:
      'Ecologists once assumed that species diversity was the primary driver of ecosystem stability: more species meant more redundancy and thus greater resilience to disturbance. Subsequent research complicated this picture. Microcosm experiments showed that diverse assemblages were indeed more stable on average, but also more variable in outcome — some diverse systems collapsed while species-poor systems persisted. The relationship, it turned out, depended far more on the specific functional traits of species present than on their raw number.',
    question:
      'What is the main purpose of the third sentence ("Microcosm experiments . . . systems persisted")?',
    choices: [
      { label: 'A', text: 'To provide the evidence that led ecologists to revise the original assumption described in the first sentence' },
      { label: 'B', text: 'To summarize the conclusion that the research ultimately reached about functional traits' },
      { label: 'C', text: 'To illustrate that ecosystem stability cannot be studied in laboratory conditions' },
      { label: 'D', text: 'To argue that microcosm experiments are methodologically superior to field studies' },
    ],
    correctAnswer: 'A',
    explanation:
      'The third sentence presents the experimental findings — diverse systems were more stable on average but also more variable, with some collapsing — that justified the "complicated picture" introduced in the second sentence and ultimately led to the revised conclusion in the fourth.',
    wrongAnswerExplanations: {
      B: 'The conclusion about functional traits appears in the fourth sentence, not the third; the third sentence provides the conflicting evidence that necessitates that conclusion.',
      C: 'The passage does not question the validity of microcosm experiments; it uses them as evidence.',
      D: 'The passage makes no comparison between microcosm experiments and field studies.',
    },
  },

  // ─── Q08 · Craft and Structure · Cross-Text Connections · hard ───────────────
  {
    id: 'sat-f3-v2-rw-m1-q08',
    section: 'reading-writing',
    moduleId: 'f3v2-rw-module-1',
    domain: 'Craft and Structure',
    skill: 'Cross-Text Connections',
    difficulty: 'hard',
    stimulus:
      'Text 1: Sociologist Mara Lindqvist argues that remote work fundamentally disrupts the informal mentorship networks that arise from proximity. When junior employees cannot observe senior colleagues navigating ambiguity in real time, they lose access to tacit knowledge — the kind that cannot be codified in onboarding documents. Lindqvist warns that remote-first organizations will produce technically skilled but professionally underdeveloped workers.\n\nText 2: Organizational researcher Devon Okafor examined three companies that transitioned to fully remote work and tracked employee career trajectories over five years. Okafor found that junior employees who received structured mentorship programs — regular video check-ins, documented feedback cycles, and assigned project collaborations — advanced at the same rate as peers at comparable in-person firms.',
    question:
      'Based on the two texts, how would Okafor most likely respond to Lindqvist\'s argument?',
    choices: [
      { label: 'A', text: 'By contending that Lindqvist\'s concern about informal mentorship is valid but applies only to large organizations where hierarchies are rigid' },
      { label: 'B', text: 'By arguing that the loss of proximity-based mentorship Lindqvist describes can be compensated for through deliberate structural substitutes' },
      { label: 'C', text: 'By agreeing that remote work produces professionally underdeveloped workers and recommending hybrid arrangements' },
      { label: 'D', text: 'By claiming that tacit knowledge is overrated and that formal onboarding documents are sufficient for professional development' },
    ],
    correctAnswer: 'B',
    explanation:
      'Okafor\'s research shows that structured mentorship programs in remote environments produce comparable career outcomes to in-person settings. This is a direct response to Lindqvist\'s concern: the problem Lindqvist identifies can be addressed through deliberate program design rather than physical proximity.',
    wrongAnswerExplanations: {
      A: 'Okafor\'s study examined companies of varying scales and drew no distinction based on organizational hierarchy or size.',
      C: 'Okafor\'s findings contradict the conclusion that remote work produces underdeveloped workers and do not advocate for hybrid arrangements.',
      D: 'Okafor does not address tacit knowledge or onboarding documents; the structured programs in the study include mentorship check-ins, not documentation.',
    },
  },

  // ─── Q09 · Craft and Structure · Cross-Text Connections · hard ───────────────
  {
    id: 'sat-f3-v2-rw-m1-q09',
    section: 'reading-writing',
    moduleId: 'f3v2-rw-module-1',
    domain: 'Craft and Structure',
    skill: 'Cross-Text Connections',
    difficulty: 'hard',
    stimulus:
      'Text 1: Historian Priya Mehta contends that the Green Revolution\'s legacy is inseparable from its geopolitical context. American-led agricultural aid in the 1960s and 1970s was designed not merely to increase crop yields but to forestall communist insurgencies by demonstrating that capitalist development could meet the food security needs of newly independent nations. Yield statistics, Mehta argues, cannot be understood apart from these strategic imperatives.\n\nText 2: Agricultural economist Jonas Frisch acknowledges the Green Revolution\'s political origins but insists that evaluating it primarily through that lens distorts the historical record. Whatever the motivations of donor governments, the technical interventions — high-yield seed varieties, irrigation expansion, and fertilizer access — produced documented reductions in famine mortality across South Asia and sub-Saharan Africa.',
    question:
      'Which statement best describes the relationship between Mehta\'s and Frisch\'s arguments?',
    choices: [
      { label: 'A', text: 'Frisch disputes the factual accuracy of the yield statistics that Mehta uses as her primary evidence' },
      { label: 'B', text: 'Both scholars agree that the Green Revolution was primarily a geopolitical project with negligible agricultural benefits' },
      { label: 'C', text: 'Frisch accepts Mehta\'s historical claim about political origins but argues that this context should not govern how we assess outcomes' },
      { label: 'D', text: 'Mehta and Frisch disagree about which crops were most affected by the Green Revolution\'s interventions' },
    ],
    correctAnswer: 'C',
    explanation:
      'Frisch explicitly acknowledges the political origins Mehta describes ("acknowledges the Green Revolution\'s political origins") but argues that evaluating outcomes through that lens alone distorts the record — he separates the assessment of motivations from the assessment of results.',
    wrongAnswerExplanations: {
      A: 'Frisch does not challenge Mehta\'s yield statistics; he disputes the interpretive framework, not the data.',
      B: 'Frisch does not characterize the agricultural benefits as negligible — he cites documented reductions in famine mortality as real benefits.',
      D: 'Neither scholar discusses specific crops; the disagreement is about how to interpret the program\'s legacy, not about which crops were affected.',
    },
  },

  // ─── Q10 · Information and Ideas · Central Ideas and Details · easy ───────────
  {
    id: 'sat-f3-v2-rw-m1-q10',
    section: 'reading-writing',
    moduleId: 'f3v2-rw-module-1',
    domain: 'Information and Ideas',
    skill: 'Central Ideas and Details',
    difficulty: 'easy',
    stimulus:
      'Tardigrades — microscopic animals sometimes called "water bears" — have been found in every major biome on Earth, from deep-ocean sediments to high-altitude glaciers. They survive conditions lethal to virtually all other animals by entering a state called cryptobiosis, in which metabolism slows to near zero and the organism can withstand extreme temperatures, desiccation, radiation, and even the vacuum of space. When favorable conditions return, tardigrades revive within hours and resume normal activity.',
    question: 'What is the central idea of this passage?',
    choices: [
      { label: 'A', text: 'Tardigrades are the smallest animals ever discovered by scientists' },
      { label: 'B', text: 'Tardigrades survive extreme conditions through a metabolic shutdown state that allows them to live across virtually all environments' },
      { label: 'C', text: 'Cryptobiosis is a process that will eventually be replicated in human medicine to allow surgeons to pause patients\' metabolism' },
      { label: 'D', text: 'Tardigrades cannot survive permanent vacuum exposure and must be returned to favorable conditions within 24 hours' },
    ],
    correctAnswer: 'B',
    explanation:
      'The passage introduces tardigrades, explains the mechanism (cryptobiosis) by which they survive extreme conditions, and notes their resulting universal distribution — all supporting the central idea that cryptobiosis enables survival across virtually all environments.',
    wrongAnswerExplanations: {
      A: 'The passage calls tardigrades "microscopic" but does not make any claim about them being the smallest animals ever discovered.',
      C: 'Human medical applications of cryptobiosis are never mentioned in the passage.',
      D: 'The passage says tardigrades can survive the vacuum of space, which contradicts the claim that they cannot survive permanent vacuum exposure.',
    },
  },

  // ─── Q11 · Information and Ideas · Central Ideas and Details · medium ─────────
  {
    id: 'sat-f3-v2-rw-m1-q11',
    section: 'reading-writing',
    moduleId: 'f3v2-rw-module-1',
    domain: 'Information and Ideas',
    skill: 'Central Ideas and Details',
    difficulty: 'medium',
    stimulus:
      'When the Meiji government transformed Japan between 1868 and 1912, its leaders explicitly rejected gradual adaptation in favor of rapid, state-directed industrialization. Officials traveled abroad to study Western legal codes, military organization, and manufacturing processes, then selectively adopted those elements judged compatible with maintaining central authority. Foreign advisors were hired and then systematically replaced once domestic expertise reached parity. The result was not Westernization but a distinctively Japanese modernity that absorbed foreign techniques while preserving the imperial structure through which the state managed social change.',
    question:
      'According to the passage, which of the following best characterizes the Meiji government\'s approach to modernization?',
    choices: [
      { label: 'A', text: 'A passive imitation of Western models that gradually eroded traditional Japanese institutions' },
      { label: 'B', text: 'A deliberate, selective adoption of foreign practices in service of a state-controlled transformation that preserved imperial authority' },
      { label: 'C', text: 'A grassroots movement in which ordinary citizens demanded Western-style reforms from an unwilling government' },
      { label: 'D', text: 'An exchange program in which Japanese officials permanently relocated to Western nations to learn manufacturing techniques' },
    ],
    correctAnswer: 'B',
    explanation:
      'The passage describes officials who studied Western systems and "selectively adopted" compatible elements, replaced foreign advisors once domestic expertise developed, and ultimately produced a distinctive modernity that preserved the imperial structure — all markers of deliberate, state-controlled selective adoption.',
    wrongAnswerExplanations: {
      A: 'The passage explicitly calls the process "state-directed" and says the result preserved, not eroded, imperial structure — the opposite of passive or erosive.',
      C: 'The passage describes government officials as the active agents of change, not ordinary citizens demanding reform.',
      D: 'Officials traveled abroad temporarily to study; the passage describes them returning and replacing foreign advisors with domestic expertise, not permanent relocation.',
    },
  },

  // ─── Q12 · Information and Ideas · Command of Evidence · easy ─────────────────
  {
    id: 'sat-f3-v2-rw-m1-q12',
    section: 'reading-writing',
    moduleId: 'f3v2-rw-module-1',
    domain: 'Information and Ideas',
    skill: 'Command of Evidence',
    difficulty: 'easy',
    stimulus:
      'A nutritional scientist studying dietary fiber and cardiovascular health analyzed data from a 15-year cohort study of 9,000 adults. Participants reported fiber intake annually and underwent cardiovascular assessments at five-year intervals. The scientist found that participants who consumed at least 25 grams of fiber per day had a 28% lower incidence of cardiovascular events compared to those consuming fewer than 10 grams per day, even after controlling for smoking, exercise, and body mass index.',
    question:
      'Which statement most accurately describes what the scientist\'s findings indicate?',
    choices: [
      { label: 'A', text: 'Dietary fiber prevents cardiovascular disease in all adults who consume 25 or more grams per day' },
      { label: 'B', text: 'Higher fiber consumption is associated with reduced cardiovascular event rates after accounting for key confounding variables' },
      { label: 'C', text: 'Adults who exercise regularly and do not smoke have a 28% lower risk of cardiovascular events than those who do neither' },
      { label: 'D', text: 'Consuming fewer than 10 grams of fiber per day causes cardiovascular disease within 15 years' },
    ],
    correctAnswer: 'B',
    explanation:
      'The study found an association between higher fiber intake and lower cardiovascular event incidence while controlling for smoking, exercise, and BMI — exactly what option B states. The language "associated with" correctly reflects the observational, correlational nature of cohort data.',
    wrongAnswerExplanations: {
      A: 'The study is observational, not experimental; it establishes association, not proof of prevention for all individuals.',
      C: 'The 28% figure refers to the difference between high and low fiber groups, not between exercisers and non-exercisers — this misattributes the statistic.',
      D: 'An observational study cannot establish that low fiber "causes" cardiovascular disease; it also does not specify a 15-year timeline for causation.',
    },
  },

  // ─── Q13 · Information and Ideas · Command of Evidence · medium ───────────────
  {
    id: 'sat-f3-v2-rw-m1-q13',
    section: 'reading-writing',
    moduleId: 'f3v2-rw-module-1',
    domain: 'Information and Ideas',
    skill: 'Command of Evidence',
    difficulty: 'medium',
    stimulus:
      'A linguist studying language contact in border regions compiled vocabulary data from four communities:\n\nCommunity | Years of bilingual contact | Percentage of loanwords in daily speech\nAlberton | 12 | 8%\nBrackfield | 35 | 22%\nCrestwood | 58 | 31%\nDunmore | 71 | 29%\n\nThe linguist hypothesized that the longer a community has maintained bilingual contact, the higher the percentage of loanwords in daily speech.',
    question:
      'Which choice best evaluates the linguist\'s hypothesis given the data?',
    choices: [
      { label: 'A', text: 'The hypothesis is fully supported: every community with more years of contact has a strictly higher loanword percentage than every community with fewer years' },
      { label: 'B', text: 'The hypothesis is partially supported: loanword percentages generally increase with contact duration, but Dunmore has slightly fewer loanwords than Crestwood despite longer contact' },
      { label: 'C', text: 'The hypothesis is unsupported because Alberton has the fewest loanwords and the shortest contact period, making it an outlier' },
      { label: 'D', text: 'The hypothesis is fully refuted: the data show no relationship between contact duration and loanword percentage' },
    ],
    correctAnswer: 'B',
    explanation:
      'The data show a general upward trend (8%, 22%, 31%), but Dunmore (71 years) has 29% — slightly lower than Crestwood\'s (58 years) 31%. This is a minor exception to the otherwise positive trend, making the hypothesis partially but not fully supported.',
    wrongAnswerExplanations: {
      A: 'The Dunmore/Crestwood pair violates strict monotonic increase, so the hypothesis is not fully supported without exception.',
      C: 'Alberton having the shortest contact and fewest loanwords is consistent with the hypothesis, not an outlier.',
      D: 'The overall trend is clearly positive; only one pair deviates slightly, so the hypothesis is not fully refuted.',
    },
  },

  // ─── Q14 · Information and Ideas · Command of Evidence · hard ────────────────
  {
    id: 'sat-f3-v2-rw-m1-q14',
    section: 'reading-writing',
    moduleId: 'f3v2-rw-module-1',
    domain: 'Information and Ideas',
    skill: 'Command of Evidence',
    difficulty: 'hard',
    stimulus:
      'A psychologist studying the "spacing effect" — the finding that distributed study sessions yield better long-term retention than massed practice — designed an experiment in which 240 college students studied the same list of 40 vocabulary items under three conditions: massed (one 60-minute session), moderately spaced (three 20-minute sessions over three days), or highly spaced (six 10-minute sessions over six days). A retention test was administered one week after the final study session. Mean accuracy was 54% for the massed group, 71% for the moderately spaced group, and 68% for the highly spaced group.',
    question:
      'A critic argues that the psychologist\'s data do not support the common recommendation to "space practice as widely as possible." Which finding from the data most directly supports this critique?',
    choices: [
      { label: 'A', text: 'The massed group performed substantially worse than both spaced groups, confirming that any spacing is better than massing' },
      { label: 'B', text: 'The highly spaced group outperformed the massed group by 14 percentage points' },
      { label: 'C', text: 'The moderately spaced group outperformed the highly spaced group, suggesting that optimal spacing may not be maximal spacing' },
      { label: 'D', text: 'All three groups performed below 80%, indicating that the vocabulary list may have been too difficult for accurate measurement' },
    ],
    correctAnswer: 'C',
    explanation:
      'The critic\'s argument is that "maximum spacing" is not the best prescription. The data show the moderately spaced group (71%) actually outperformed the highly spaced group (68%), meaning more spacing did not produce better retention. This directly supports the critique that the recommendation should not be to maximize spacing.',
    wrongAnswerExplanations: {
      A: 'This finding confirms that spacing is better than massing — it supports spacing in general, not the critique that maximum spacing is suboptimal.',
      B: 'The 14-point advantage of the highly spaced group over massing also supports the value of spacing generally, not the critique about maximizing it.',
      D: 'The absolute performance levels do not address whether more spacing always produces better outcomes; this is irrelevant to the critic\'s specific argument.',
    },
  },

  // ─── Q15 · Information and Ideas · Inferences · medium ───────────────────────
  {
    id: 'sat-f3-v2-rw-m1-q15',
    section: 'reading-writing',
    moduleId: 'f3v2-rw-module-1',
    domain: 'Information and Ideas',
    skill: 'Inferences',
    difficulty: 'medium',
    stimulus:
      'Mangrove forests line tropical and subtropical coastlines, their tangled root systems trapping sediment and building land over decades. Unlike most trees, mangroves tolerate salt water by either excreting salt through specialized leaf glands or excluding it at the root membrane. Satellite imagery from the past forty years documents a 35% reduction in global mangrove cover, primarily driven by conversion to aquaculture ponds and coastal development. The loss has accelerated coastal erosion rates in affected regions by a factor of three to five compared to areas where mangrove cover remains intact.',
    question:
      'Based on the passage, what can most reasonably be inferred about regions that have lost significant mangrove cover?',
    choices: [
      { label: 'A', text: 'They are located exclusively in subtropical rather than tropical zones' },
      { label: 'B', text: 'They are experiencing faster land loss and reduced coastal stability than regions where mangroves remain' },
      { label: 'C', text: 'Their aquaculture industries have become more productive since mangrove removal began' },
      { label: 'D', text: 'They have adopted salt-tolerant crop varieties to compensate for increased soil salinity' },
    ],
    correctAnswer: 'B',
    explanation:
      'The passage states that mangrove loss has accelerated coastal erosion three to five times compared to intact areas. Since mangroves build land by trapping sediment and roots stabilize coastlines, regions with mangrove loss can reasonably be inferred to have faster land loss and reduced coastal stability.',
    wrongAnswerExplanations: {
      A: 'The passage describes mangroves as lining "tropical and subtropical" coastlines and notes their global loss — it gives no basis to infer losses are exclusive to subtropical zones.',
      C: 'The passage identifies aquaculture as a driver of mangrove conversion but says nothing about the productivity of the resulting ponds.',
      D: 'Soil salinity and crop adaptation are never discussed in the passage.',
    },
  },

  // ─── Q16 · Information and Ideas · Inferences · hard ────────────────────────
  {
    id: 'sat-f3-v2-rw-m1-q16',
    section: 'reading-writing',
    moduleId: 'f3v2-rw-module-1',
    domain: 'Information and Ideas',
    skill: 'Inferences',
    difficulty: 'hard',
    stimulus:
      'The philosopher of science Thomas Kuhn distinguished between "normal science" — problem-solving activity conducted within an accepted framework of assumptions — and "revolutionary science," the disorienting process by which an anomaly accumulates to the point where the entire framework collapses and is replaced. Kuhn was careful to note that revolutionary transitions are not purely rational events: scientists who have invested careers in the old paradigm resist the change, and the new framework is often adopted first by younger researchers with less professional stake in the prior consensus.',
    question:
      'Based on Kuhn\'s framework as described in the passage, which of the following scenarios best illustrates a "revolutionary" rather than "normal" science episode?',
    choices: [
      { label: 'A', text: 'A chemist uses established spectroscopy protocols to identify a previously uncharacterized mineral compound' },
      { label: 'B', text: 'A physics department adopts a revised textbook because a new edition clarifies notation conventions' },
      { label: 'C', text: 'Younger geologists champion plate tectonics against the resistance of senior colleagues who had built careers on the theory of continental fixity' },
      { label: 'D', text: 'A biologist applies evolutionary theory to explain the distribution of a newly discovered insect species' },
    ],
    correctAnswer: 'C',
    explanation:
      'Kuhn defines revolutionary science as a framework-replacing transition in which the old paradigm collapses amid resistance from established scientists and adoption by younger researchers. The plate tectonics scenario exactly matches this: an entire framework (continental fixity) replaced by a new one (plate tectonics), championed by younger scientists against senior resistance.',
    wrongAnswerExplanations: {
      A: 'Applying established spectroscopy protocols to identify a new compound is normal science — problem-solving within an accepted framework.',
      B: 'A textbook revision that clarifies notation is an incremental refinement within normal science, not a framework replacement.',
      D: 'Applying evolutionary theory to explain a newly discovered species is normal science — using an accepted framework to solve a puzzle within it.',
    },
  },

  // ─── Q17 · Standard English Conventions · Boundaries · easy ──────────────────
  {
    id: 'sat-f3-v2-rw-m1-q17',
    section: 'reading-writing',
    moduleId: 'f3v2-rw-module-1',
    domain: 'Standard English Conventions',
    skill: 'Boundaries',
    difficulty: 'easy',
    stimulus:
      'The restored manuscript attracted scholars from four continents _______ the archive had kept its existence confidential for decades while conservators stabilized its fragile parchment.',
    question:
      'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { label: 'A', text: ', because' },
      { label: 'B', text: '; because' },
      { label: 'C', text: ': because' },
      { label: 'D', text: '. Because' },
    ],
    correctAnswer: 'A',
    explanation:
      'A subordinating conjunction ("because") introduces a dependent clause. A single comma before a subordinating conjunction joining a dependent clause to an independent clause is the correct Standard English convention.',
    wrongAnswerExplanations: {
      B: 'A semicolon joins two independent clauses; "because" makes the second clause dependent, so a semicolon is incorrect here.',
      C: 'A colon introduces a list or explanation that follows an independent clause; using it before a dependent "because" clause is nonstandard.',
      D: 'A period creates two separate sentences, but the second would begin with "Because," forming a sentence fragment.',
    },
  },

  // ─── Q18 · Standard English Conventions · Boundaries · medium ────────────────
  {
    id: 'sat-f3-v2-rw-m1-q18',
    section: 'reading-writing',
    moduleId: 'f3v2-rw-module-1',
    domain: 'Standard English Conventions',
    skill: 'Boundaries',
    difficulty: 'medium',
    stimulus:
      'The budget committee approved the infrastructure proposal _______ the transportation subcommittee, citing cost overruns in previous projects, had recommended deferring the vote by at least one fiscal quarter.',
    question:
      'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { label: 'A', text: ', even though' },
      { label: 'B', text: '; even though' },
      { label: 'C', text: ': even though' },
      { label: 'D', text: ', and' },
    ],
    correctAnswer: 'A',
    explanation:
      '"Even though" is a subordinating conjunction that introduces a dependent concessive clause. A comma before a subordinating conjunction is the correct way to join a dependent clause to a preceding independent clause. The intervening non-restrictive phrase ("citing cost overruns in previous projects") is correctly set off by its own commas within the dependent clause.',
    wrongAnswerExplanations: {
      B: 'A semicolon precedes independent clauses or conjunctive adverbs, not subordinating conjunctions that introduce dependent clauses.',
      C: 'A colon introduces an explanation or list after an independent clause, not a concessive dependent clause.',
      D: '"And" would join two independent clauses and imply addition rather than concession; it also changes the logical relationship between the approval and the subcommittee\'s recommendation.',
    },
  },

  // ─── Q19 · Standard English Conventions · Boundaries · medium ───────────────
  {
    id: 'sat-f3-v2-rw-m1-q19',
    section: 'reading-writing',
    moduleId: 'f3v2-rw-module-1',
    domain: 'Standard English Conventions',
    skill: 'Boundaries',
    difficulty: 'medium',
    stimulus:
      'Dr. Vasquez presented three counter-arguments in her rebuttal _______ the proposal\'s projected timeline was unverifiable given current satellite data, the cost model relied on outdated infrastructure pricing, and the risk assessment excluded secondary seismic events entirely.',
    question:
      'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { label: 'A', text: '; specifically,' },
      { label: 'B', text: ', specifically' },
      { label: 'C', text: ': specifically,' },
      { label: 'D', text: '— specifically' },
    ],
    correctAnswer: 'C',
    explanation:
      'A colon after an independent clause introduces an enumeration or explanation. "Specifically" is an adverb that clarifies what follows, and after the colon it is followed by a comma. The first clause ("Dr. Vasquez presented three counter-arguments in her rebuttal") is complete and the list that follows specifies what those arguments are — the colon-plus-adverb construction is both grammatically and rhetorically appropriate.',
    wrongAnswerExplanations: {
      A: 'A semicolon joins two independent clauses of equal grammatical weight; the material after the blank is an explanatory list that elaborates on the first clause, making a colon the correct punctuation.',
      B: 'A comma alone before an explanatory list that follows a complete independent clause is insufficient to signal the elaborative relationship; a colon is required.',
      D: 'An em dash can introduce a list or explanation, but pairing it with "specifically" without a following comma produces a construction less clear than the colon with the adverbial comma.',
    },
  },

  // ─── Q20 · Standard English Conventions · Form, Structure, and Sense · easy ───
  {
    id: 'sat-f3-v2-rw-m1-q20',
    section: 'reading-writing',
    moduleId: 'f3v2-rw-module-1',
    domain: 'Standard English Conventions',
    skill: 'Form, Structure, and Sense',
    difficulty: 'easy',
    stimulus:
      'When the museum reopened after its two-year renovation, visitors _______ in lines that stretched around the block. The new wing, featuring interactive installations on climate science, drew three times the attendance that curators had projected.',
    question:
      'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { label: 'A', text: 'wait' },
      { label: 'B', text: 'waited' },
      { label: 'C', text: 'are waiting' },
      { label: 'D', text: 'will have waited' },
    ],
    correctAnswer: 'B',
    explanation:
      'The passage narrates a completed past event: the museum "reopened" and curators "had projected." The verb in the blank describes another completed action in this same past-tense sequence, so the simple past "waited" is the correct form.',
    wrongAnswerExplanations: {
      A: 'The present tense "wait" is inconsistent with the past-tense narrative established by "reopened" and "had projected."',
      C: 'The present progressive "are waiting" both shifts to the present tense and implies an ongoing action, neither of which fits a completed past event.',
      D: 'The future perfect "will have waited" is illogical in a narrative about events that have already occurred.',
    },
  },

  // ─── Q21 · Standard English Conventions · Form, Structure, and Sense · medium ─
  {
    id: 'sat-f3-v2-rw-m1-q21',
    section: 'reading-writing',
    moduleId: 'f3v2-rw-module-1',
    domain: 'Standard English Conventions',
    skill: 'Form, Structure, and Sense',
    difficulty: 'medium',
    stimulus:
      'The constellation of factors driving urban heat island effects — dark pavement that absorbs sunlight, reduced vegetation that would otherwise provide shade, and waste heat from vehicles and air-conditioning units — _______ more pronounced as cities grow denser and taller buildings trap more longwave radiation.',
    question:
      'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { label: 'A', text: 'become' },
      { label: 'B', text: 'becomes' },
      { label: 'C', text: 'have become' },
      { label: 'D', text: 'are becoming' },
    ],
    correctAnswer: 'B',
    explanation:
      'The grammatical subject is "constellation," a singular noun, despite the intervening plural items listed in the em-dash phrase. A singular subject requires the singular present-tense verb "becomes," which is consistent with the general-truth framing of the sentence.',
    wrongAnswerExplanations: {
      A: '"Become" is the plural form and mistakenly agrees with the plural items inside the interruptive phrase rather than with the true singular subject "constellation."',
      C: '"Have become" is also plural and additionally implies a completed change rather than a general ongoing truth.',
      D: '"Are becoming" fails to agree with the singular subject "constellation" and emphasizes ongoing action rather than the general condition described.',
    },
  },

  // ─── Q22 · Standard English Conventions · Form, Structure, and Sense · medium ─
  {
    id: 'sat-f3-v2-rw-m1-q22',
    section: 'reading-writing',
    moduleId: 'f3v2-rw-module-1',
    domain: 'Standard English Conventions',
    skill: 'Form, Structure, and Sense',
    difficulty: 'medium',
    stimulus:
      'Having mapped the glacier\'s retreat over fourteen field seasons, _______ prepared a comprehensive report documenting the accelerating ice loss and projecting complete disappearance of the lower tongue by mid-century.',
    question:
      'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { label: 'A', text: 'the research team' },
      { label: 'B', text: 'the findings' },
      { label: 'C', text: 'a report was' },
      { label: 'D', text: 'it was the data that' },
    ],
    correctAnswer: 'A',
    explanation:
      'The participial phrase "Having mapped the glacier\'s retreat over fourteen field seasons" must modify the grammatical subject of the main clause. Only the research team could have done the mapping, so "the research team" is the correct subject to avoid a dangling modifier.',
    wrongAnswerExplanations: {
      B: '"The findings" cannot have mapped the glacier\'s retreat; findings do not perform research, making this a dangling modifier.',
      C: '"A report was" creates a passive construction in which the report maps the glacier, which is logically incoherent.',
      D: '"It was the data that" is a cleft construction that still does not give the participle a logical subject — data cannot map a glacier.',
    },
  },

  // ─── Q23 · Standard English Conventions · Form, Structure, and Sense · hard ───
  {
    id: 'sat-f3-v2-rw-m1-q23',
    section: 'reading-writing',
    moduleId: 'f3v2-rw-module-1',
    domain: 'Standard English Conventions',
    skill: 'Form, Structure, and Sense',
    difficulty: 'hard',
    stimulus:
      'The board of trustees, along with the university\'s senior administrative council, _______ scheduled a joint session to address the audit committee\'s findings before the end of the fiscal year.',
    question:
      'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { label: 'A', text: 'have' },
      { label: 'B', text: 'has' },
      { label: 'C', text: 'were' },
      { label: 'D', text: 'are' },
    ],
    correctAnswer: 'B',
    explanation:
      'When a singular subject is joined to additional noun phrases by "along with," "as well as," or similar expressions, the subject remains singular. "The board of trustees" is the head noun and governs agreement. The singular present perfect auxiliary "has" is correct.',
    wrongAnswerExplanations: {
      A: '"Have" is the plural auxiliary, but the head subject "board of trustees" is singular; the "along with" phrase does not create a compound subject requiring plurality.',
      C: '"Were" is both plural and past tense; neither number nor tense is appropriate here.',
      D: '"Are" is plural and present tense but omits the auxiliary needed to complete the present perfect construction "scheduled," leaving the tense aspect incomplete.',
    },
  },

  // ─── Q24 · Expression of Ideas · Transitions · easy ─────────────────────────
  {
    id: 'sat-f3-v2-rw-m1-q24',
    section: 'reading-writing',
    moduleId: 'f3v2-rw-module-1',
    domain: 'Expression of Ideas',
    skill: 'Transitions',
    difficulty: 'easy',
    stimulus:
      'Researchers confirmed that the ancient harbor walls were built using a type of volcanic ash concrete that hardens when exposed to seawater, not weaker over time. _______, modern civil engineers have begun studying the formula in hopes of developing more durable marine infrastructure.',
    question:
      'Which choice completes the text with the most logical transition?',
    choices: [
      { label: 'A', text: 'In contrast' },
      { label: 'B', text: 'Nevertheless' },
      { label: 'C', text: 'As a result' },
      { label: 'D', text: 'For instance' },
    ],
    correctAnswer: 'C',
    explanation:
      '"As a result" signals a cause-and-effect relationship: because researchers confirmed the concrete\'s durability properties, engineers began studying the formula. This causal link is the logical connection between the two sentences.',
    wrongAnswerExplanations: {
      A: '"In contrast" introduces an opposing or contrasting point, but both sentences describe positive outcomes related to the same discovery.',
      B: '"Nevertheless" introduces a concession or qualification, implying that engineers studied the formula despite something — no such obstacle is described.',
      D: '"For instance" introduces an example of a previously stated general claim, but the second sentence is a result, not an example.',
    },
  },

  // ─── Q25 · Expression of Ideas · Transitions · medium ────────────────────────
  {
    id: 'sat-f3-v2-rw-m1-q25',
    section: 'reading-writing',
    moduleId: 'f3v2-rw-module-1',
    domain: 'Expression of Ideas',
    skill: 'Transitions',
    difficulty: 'medium',
    stimulus:
      'Classical economists argued that free markets, left unregulated, would naturally reach an equilibrium that maximizes aggregate welfare. _______, empirical studies of actual market behavior have repeatedly documented persistent inefficiencies: information asymmetries, externalities, and coordination failures that markets do not self-correct without intervention.',
    question:
      'Which choice completes the text with the most logical transition?',
    choices: [
      { label: 'A', text: 'Furthermore' },
      { label: 'B', text: 'In other words' },
      { label: 'C', text: 'By extension' },
      { label: 'D', text: 'In practice' },
    ],
    correctAnswer: 'D',
    explanation:
      '"In practice" signals a contrast between what theory predicts and what empirical observation shows. The first sentence describes theoretical expectations; the second describes what actually occurs — precisely the contrast that "in practice" introduces.',
    wrongAnswerExplanations: {
      A: '"Furthermore" adds a consistent or reinforcing point; the second sentence contradicts the first rather than adding to it.',
      B: '"In other words" signals a restatement or clarification of what preceded; the second sentence presents contrary evidence, not a paraphrase.',
      C: '"By extension" draws a logical inference from what was just stated, but the second sentence contradicts rather than extends the prior claim.',
    },
  },

  // ─── Q26 · Expression of Ideas · Transitions · hard ─────────────────────────
  {
    id: 'sat-f3-v2-rw-m1-q26',
    section: 'reading-writing',
    moduleId: 'f3v2-rw-module-1',
    domain: 'Expression of Ideas',
    skill: 'Transitions',
    difficulty: 'hard',
    stimulus:
      'The scientific case for anthropogenic climate change rests on multiple independent lines of evidence: instrumental temperature records, ice core data, ocean heat content measurements, and satellite observations of outgoing infrared radiation. _______, the same basic warming trend emerges regardless of which dataset or measurement technique is applied, substantially reducing the likelihood that the signal reflects methodological artifacts.',
    question:
      'Which choice completes the text with the most logical transition?',
    choices: [
      { label: 'A', text: 'Therefore' },
      { label: 'B', text: 'Strikingly' },
      { label: 'C', text: 'By contrast' },
      { label: 'D', text: 'As a caveat' },
    ],
    correctAnswer: 'B',
    explanation:
      '"Strikingly" introduces the second sentence as a noteworthy observation about what the multiple evidence lines show. The logical relationship here is that despite coming from different measurement methods, all converge — a convergence the writer frames as remarkable and significant. "Strikingly" captures both the additive and the emphatic quality of that observation.',
    wrongAnswerExplanations: {
      A: '"Therefore" implies the convergence is a logical deduction or result from the first sentence\'s list, but convergence across independent datasets is an empirical observation, not a conclusion derived by logic from listing them.',
      C: '"By contrast" introduces an opposing point, but the second sentence reinforces and extends the first rather than opposing it.',
      D: '"As a caveat" introduces a qualification or limitation, but the second sentence strengthens the evidence for warming rather than qualifying it.',
    },
  },

  // ─── Q27 · Expression of Ideas · Rhetorical Synthesis · easy ─────────────────
  {
    id: 'sat-f3-v2-rw-m1-q27',
    section: 'reading-writing',
    moduleId: 'f3v2-rw-module-1',
    domain: 'Expression of Ideas',
    skill: 'Rhetorical Synthesis',
    difficulty: 'easy',
    stimulus:
      'A student is writing an essay about urban heat island mitigation for a city-planning seminar. The student has gathered the following notes:\n• White or reflective roofing materials can reduce rooftop surface temperatures by up to 30°C compared to conventional dark roofing.\n• Green roofs — thin layers of vegetation planted on building tops — reduce stormwater runoff and provide insulation that lowers heating and cooling costs.\n• Street-level tree canopy in cities reduces ambient air temperature by 2–8°C through shading and evapotranspiration.\n• Cool pavement coatings reflect more solar radiation than traditional asphalt, reducing surface temperatures by 10–15°C.\n• Increasing urban vegetation at multiple scales — ground level, mid-height, and rooftop — amplifies each strategy\'s individual cooling effect through combined evapotranspiration.',
    question:
      'The student wants to argue that multiple complementary strategies can reduce urban heat island effects across different surfaces. Which choice most effectively uses relevant information from the notes to accomplish this goal?',
    choices: [
      { label: 'A', text: 'Green roofs can lower heating and cooling costs and also help manage stormwater, making them a financially attractive option for building owners.' },
      { label: 'B', text: 'Reflective roofing reduces surface temperatures dramatically, while tree canopy lowers ambient air temperature, and cool pavements reduce surface heat — together addressing heat across rooftop, air, and ground-level surfaces.' },
      { label: 'C', text: 'Urban heat island effects are caused by dark surfaces, reduced vegetation, and waste heat, and addressing any one of these causes can produce measurable cooling.' },
      { label: 'D', text: 'Cool pavement coatings can reduce surface temperatures by 10–15°C, making them one of the most effective individual strategies currently available to city planners.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Choice B directly accomplishes the stated goal: it names multiple strategies (reflective roofing, tree canopy, cool pavements) and explicitly connects each to a different surface type (rooftop, air, ground level), demonstrating that the strategies are complementary and span different surfaces.',
    wrongAnswerExplanations: {
      A: 'This choice focuses only on green roofs and emphasizes financial benefits — it neither addresses multiple strategies nor connects them across different surface types.',
      C: 'This choice describes causes of urban heat islands generally and mentions that addressing "any one" cause helps, but does not demonstrate the complementary multi-surface argument the goal requires.',
      D: 'This choice highlights only cool pavements and compares it to other strategies — it does not show multiple strategies working together across different surfaces.',
    },
  },
]
