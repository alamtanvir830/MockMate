import type { QBQuestion } from '../types'

export const rwQuestionsB3a: QBQuestion[] = [
  // ── Group A: Information and Ideas ──────────────────────────────────────

  // Central Ideas and Details — hard (upgraded from medium)
  {
    id: 'rw-b3-001',
    test: 'SAT',
    section: 'reading-writing',
    domain: 'Information and Ideas',
    skill: 'Central Ideas and Details',
    difficulty: 'hard',
    timeTargetSeconds: 90,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    stimulus:
      'Urban community gardens have proliferated across post-industrial neighborhoods where vacant lots once indexed the retreat of capital from civic infrastructure. Researchers note that produce volumes remain insufficient to meet household nutritional needs, yet the gardens serve as what one urban planner calls "infrastructural connective tissue" — aggregating volunteer labor, anchoring informal vendor networks, and providing venues through which service providers reach populations that rarely engage with formal institutions. Several municipal health departments have begun classifying these sites alongside licensed clinics and recreational facilities in their public-health asset inventories, citing correlations between garden density and measurable reductions in emergency department utilization and reported social isolation among adults over sixty-five — though researchers caution that directionality remains contested.',
    question: 'Which choice best states the main idea of the text?',
    choices: [
      { label: 'A', text: 'Urban community gardens are most valuable for supplying fresh produce to food-insecure residents in neighborhoods abandoned by capital investment.' },
      { label: 'B', text: 'Despite their limited food output, community gardens are increasingly classified by public-health agencies as civic infrastructure because of their demonstrable effects on community engagement and health outcomes — though the causal relationship is not yet established.' },
      { label: 'C', text: 'Post-industrial neighborhoods benefit most from community gardens because of the informal vendor networks and volunteer labor they generate.' },
      { label: 'D', text: 'Municipal health departments should expand community garden programs as a cost-effective substitute for licensed clinical services in underserved neighborhoods.' },
    ],
    correctAnswer: 'B',
    explanation:
      'The passage concedes that food output is insufficient (first sentence pivot), then develops the argument that gardens function as civic infrastructure valued by health departments for engagement and health correlations — but explicitly notes directionality "remains contested." Choice B captures the concession, the reclassification, and the important caveat about causation. Choice A misreads the passage: food supply is explicitly ruled out as the primary value. Choice C elevates one item in a list (vendor networks and volunteers) and ignores the health-department framing that dominates the final half of the passage. Choice D imports a policy prescription — "substitute for licensed clinical services" — that does not appear in the passage, which describes a complementary classification, not a substitution.',
    wrongAnswerExplanations: {
      A: 'The passage opens by dismissing food supply as insufficient; making it the primary value directly contradicts the text.',
      C: 'Vendor networks and volunteer labor are illustrative details within the "connective tissue" concept; the passage\'s main claim is the public-health reclassification, not commerce or labor.',
      D: 'The passage describes gardens being classified alongside clinics, not replacing them; "substitute" and "cost-effective" are unsupported inventions.',
    },
    teachingPoint:
      'Hard main-idea questions often bury caveats ("directionality remains contested") that must appear in the correct answer. A choice that captures the general argument but omits the passage\'s own qualification misrepresents the text.',
    relatedSkills: ['Inferences', 'Text Structure and Purpose'],
  },

  // Central Ideas and Details — hard (upgraded from medium)
  {
    id: 'rw-b3-002',
    test: 'SAT',
    section: 'reading-writing',
    domain: 'Information and Ideas',
    skill: 'Central Ideas and Details',
    difficulty: 'hard',
    timeTargetSeconds: 90,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    stimulus:
      'The monarch butterfly\'s annual migration is distinguished from most animal migrations by a generational discontinuity: the individuals that depart North America each autumn are the great-grandchildren of those that departed Mexico the previous spring, yet each cohort navigates to destinations it has never visited. Researchers have proposed a time-compensated sun compass — in which butterflies integrate the sun\'s azimuthal position with an internal circadian clock — as the primary orientation mechanism, supplemented by possible sensitivity to Earth\'s magnetic field. More puzzling is the question of how the navigational target itself, not merely the directional bias, is encoded: monarch antennae contain cryptochromes sensitive to both light and magnetic fields, suggesting that multiple sensory channels may converge, but the molecular pathway through which heritable destination-specificity is maintained across generations without experiential transmission remains uncharacterized.',
    question: 'Based on the text, which of the following is most accurate?',
    choices: [
      { label: 'A', text: 'Scientists have confirmed that magnetic-field sensitivity is the primary navigation mechanism monarchs use, with the sun compass serving only a supplementary role.' },
      { label: 'B', text: 'Researchers understand how monarchs determine direction of flight but have not yet characterized the molecular mechanism that encodes destination-specificity across generations.' },
      { label: 'C', text: 'Monarch butterflies rely exclusively on circadian clocks to navigate, a mechanism that has been fully characterized at the genetic level.' },
      { label: 'D', text: 'Because each migrating cohort has visited the destination before, monarchs likely navigate by memory rather than by inherited sensory mechanisms.' },
    ],
    correctAnswer: 'B',
    explanation:
      'The passage presents two distinct problems: (1) how monarchs determine direction — addressed by the sun-compass proposal (not fully confirmed, but proposed as primary) — and (2) how destination-specificity is inherited across generations without experience — explicitly described as "uncharacterized." Choice B accurately captures this asymmetry: directional mechanisms are proposed and partially understood; the molecular basis of destination encoding is not. Choice A reverses the hierarchy — the text calls the sun compass "primary" and magnetic sensitivity a possible supplement, not vice versa. Choice C is wrong on both counts: the circadian clock is one component of a multi-mechanism system, and the molecular pathway is explicitly uncharacterized. Choice D directly contradicts the passage, which states monarchs navigate to destinations they have never visited.',
    wrongAnswerExplanations: {
      A: 'The passage identifies the sun compass as primary and magnetic sensitivity as supplementary — this choice reverses the stated hierarchy.',
      C: 'The circadian clock is one component among multiple proposed mechanisms, and the molecular pathway is explicitly described as uncharacterized.',
      D: 'The passage explicitly states each cohort navigates to a destination it has never visited, ruling out memory of prior visits.',
    },
    teachingPoint:
      'When a passage describes multiple levels of a scientific question — some more resolved than others — the correct "most accurate" choice reflects the asymmetry: what is known vs. what remains uncharacterized.',
    relatedSkills: ['Inferences', 'Command of Evidence'],
  },

  // Command of Evidence — medium
  {
    id: 'rw-b3-003',
    test: 'SAT',
    section: 'reading-writing',
    domain: 'Information and Ideas',
    skill: 'Command of Evidence',
    difficulty: 'medium',
    timeTargetSeconds: 75,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    stimulus:
      'A nutritional epidemiologist argues that regular consumption of fermented foods improves host immune function specifically by restructuring the gut microbiome toward greater alpha diversity — not by introducing additional bacterial load alone, and not merely by elevating anti-inflammatory metabolites — because it is diversity of microbial taxa, not bacterial quantity or any single metabolic product, that drives the durable immune-regulatory benefit she has observed.',
    question:
      'Which quotation from a clinical study would most directly support the epidemiologist\'s argument?',
    choices: [
      { label: 'A', text: '"Participants who consumed fermented vegetables daily for twelve weeks showed sustained elevations in short-chain fatty acid levels and reduced markers of systemic inflammation compared to controls."' },
      { label: 'B', text: '"Subjects in the fermented-food group exhibited significantly greater alpha diversity in stool samples at week twelve than controls, and this diversity measure — rather than total bacterial load or SCFA concentration — was the only variable independently predictive of enhanced natural killer cell activity in multivariate analysis."' },
      { label: 'C', text: '"Stool cultures from volunteers consuming yogurt with live Lactobacillus cultures confirmed that viable strains reached the colon intact, producing a net increase in total bacterial count."' },
      { label: 'D', text: '"The fermented-food group reported thirty percent fewer upper respiratory infections over twelve months, and their gut microbiomes contained a higher proportion of Bifidobacterium species than those of controls."' },
    ],
    correctAnswer: 'B',
    explanation:
      'The epidemiologist makes a triply precise claim: (1) diversity — not quantity — drives immune benefit, and (2) not anti-inflammatory metabolites alone. Only Choice B directly tests all three distinctions: it shows greater alpha diversity AND uses multivariate analysis to isolate diversity as the independent predictor over both total bacterial load and SCFA concentration. This directly validates her claim that diversity, not the other two candidates, is the operative mechanism. Choice A shows elevated SCFAs and reduced inflammation — but the epidemiologist explicitly says anti-inflammatory metabolites are not the key driver; this choice supports a rival explanation. Choice C confirms bacterial survival (increased count) — precisely the "bacterial load" mechanism she argues against. Choice D shows a health outcome and elevated Bifidobacterium proportion, but Bifidobacterium dominance is compositional, not a measure of alpha diversity; it also does not isolate diversity from other variables.',
    wrongAnswerExplanations: {
      A: 'SCFAs and inflammation reduction support the rival anti-inflammatory-metabolite pathway the epidemiologist explicitly distinguishes from her claim.',
      C: 'Increased total bacterial count is precisely the "bacterial load" mechanism she argues is insufficient — this supports the explanation she is ruling out.',
      D: 'Elevated Bifidobacterium proportion reflects compositional shift, not alpha diversity per se, and does not use multivariate analysis to isolate diversity as the driver.',
    },
    teachingPoint:
      'When a claim specifies a mechanism by explicitly excluding two rival mechanisms, the best supporting evidence must isolate the claimed mechanism over those rivals — ideally through a comparison that controls for the alternatives.',
    relatedSkills: ['Central Ideas and Details', 'Inferences'],
  },

  // Command of Evidence — medium
  {
    id: 'rw-b3-004',
    test: 'SAT',
    section: 'reading-writing',
    domain: 'Information and Ideas',
    skill: 'Command of Evidence',
    difficulty: 'medium',
    timeTargetSeconds: 75,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    stimulus:
      'An environmental economist contends that placing a fee on carbon emissions is less effective than direct output regulation at reducing total industrial pollution, because firms confronting a price signal tend to pass the cost to consumers rather than investing in cleaner production technology — a pass-through effect she argues is most pronounced precisely in price-inelastic sectors where firms face the least competitive pressure to absorb costs.',
    question:
      'Which finding would most directly challenge the economist\'s contention?',
    choices: [
      { label: 'A', text: '"Consumer electricity bills increased by an average of eleven percent in the three years following carbon-fee adoption in surveyed jurisdictions, with the largest increases concentrated in regions dominated by monopoly utilities."' },
      { label: 'B', text: '"In the cement sector — characterized by highly inelastic demand and limited competitive pressure — firms operating under a carbon fee increased capital expenditure on low-emission kiln technology by 280% over five years, while firms under output caps increased such investment by only 60% over the same period."' },
      { label: 'C', text: '"Manufacturing plants subject to output caps reported a 40% rise in administrative compliance costs and an average of fourteen months of regulatory lag between citation and enforcement."' },
      { label: 'D', text: '"Carbon-fee revenues redistributed as household rebates in four jurisdictions offset approximately 55% of the consumer price increases that followed fee adoption, reducing the net burden on low-income households."' },
    ],
    correctAnswer: 'B',
    explanation:
      'The economist\'s contention has two interlocking parts: (1) firms pass costs to consumers rather than investing in cleaner technology, and (2) this is most pronounced in price-inelastic sectors. Choice B attacks both simultaneously: in cement — a sector she would predict to show the strongest pass-through and weakest clean-tech investment — firms under the carbon fee actually invested far more in cleaner technology than those under output caps. This directly contradicts her prediction for the sector she claims best supports it. Choice A confirms consumer price increases in electricity (also inelastic), supporting rather than challenging her. Choice C addresses compliance costs for output regulation — a critique of the alternative mechanism, not evidence that carbon fees change production behavior. Choice D shows revenue redistribution offsets consumer costs, which mitigates distributional harm but does not address whether firms invest in cleaner technology.',
    wrongAnswerExplanations: {
      A: 'Rising consumer prices in an inelastic sector (electricity) confirm the economist\'s pass-through prediction rather than challenging it.',
      C: 'High compliance costs for output regulation argue in favor of the carbon-fee approach but do not demonstrate that firms under carbon fees actually invest in cleaner technology.',
      D: 'Redistributing revenues addresses who bears the cost burden; it does not speak to whether firms change their production technology under the carbon fee.',
    },
    teachingPoint:
      'The most direct challenge to a two-part contention must undermine the part where the contention is strongest — here, the inelastic-sector prediction. A challenge that only weakens one component while leaving the stronger prediction intact is insufficient.',
    relatedSkills: ['Inferences', 'Central Ideas and Details'],
  },

  // Command of Evidence — hard
  {
    id: 'rw-b3-005',
    test: 'SAT',
    section: 'reading-writing',
    domain: 'Information and Ideas',
    skill: 'Command of Evidence',
    difficulty: 'hard',
    timeTargetSeconds: 90,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    stimulus:
      'Historian Dr. Priya Nair argues that the rapid geographic diffusion of the printing press across fifteenth-century Europe was driven not by rising popular literacy but by the coordinated procurement strategies of Church and state institutions, which required standardized texts in large, predictable quantities — a demand profile that manuscript copying could not efficiently satisfy at scale. She concludes that the press proliferated in response to institutional purchasing power, and that the correlation between press adoption and later rises in popular literacy reflects a consequence of proliferation rather than its cause.',
    question:
      'Which finding would most directly support Dr. Nair\'s conclusion?',
    choices: [
      { label: 'A', text: 'Print shops in cities hosting cathedral chapters or royal administrative offices were established on average six years earlier than those in comparably populated cities without such institutions, regardless of whether literacy rates in those cities differed.' },
      { label: 'B', text: 'The majority of texts printed before 1500 were liturgical documents, legal codes, and royal proclamations, with vernacular literature representing fewer than fifteen percent of output.' },
      { label: 'C', text: 'Printed books remained priced above the annual income of most urban wage-earners throughout the fifteenth century, suggesting ordinary consumers could not have sustained the market.' },
      { label: 'D', text: 'Literacy rates in regions that adopted the press earliest rose faster in the two decades following adoption than in regions that adopted it later, suggesting a feedback relationship between press diffusion and literacy.' },
    ],
    correctAnswer: 'A',
    explanation:
      'Dr. Nair\'s conclusion requires two things to be true simultaneously: (1) the presence of Church and state institutions drove early adoption, and (2) this effect held independent of popular literacy. Choice A directly tests both: the correlation between institutional presence (cathedral chapters, royal offices) and early press establishment holds "regardless of whether literacy rates in those cities differed." This is the cleanest possible support for a claim that institutional demand, not literacy, caused diffusion. Choice B shows that institutional texts dominated output — consistent with her argument — but does not demonstrate the causal link between institutional procurement and the timing or geography of press adoption. Choice C eliminates ordinary consumers as a market, which is a necessary implication of her argument but does not positively establish institutional procurement as the driver. Choice D actually complicates her secondary claim (that literacy rises are a consequence of proliferation, not a cause) by suggesting a feedback relationship — it is more ambiguous than supportive.',
    wrongAnswerExplanations: {
      A: 'This is the correct answer — it directly supports both causal claims simultaneously.',
      B: 'Output composition shows what was printed but not what drove adoption timing or geographic spread; this is correlational with, not causal evidence for, institutional procurement.',
      C: 'Ruling out consumers as a viable market supports her argument by elimination but does not positively demonstrate that institutional procurement was the active driver of adoption.',
      D: 'A feedback relationship between the press and literacy would complicate, not clarify, the directionality she claims — it raises the possibility that literacy was both consequence and contributing cause.',
    },
    teachingPoint:
      'When a conclusion has two components — a positive cause and an independence claim — the strongest supporting evidence directly tests both in a single finding, rather than addressing each component separately.',
    relatedSkills: ['Central Ideas and Details', 'Inferences'],
  },

  // Inferences — hard (upgraded from medium)
  {
    id: 'rw-b3-006',
    test: 'SAT',
    section: 'reading-writing',
    domain: 'Information and Ideas',
    skill: 'Inferences',
    difficulty: 'hard',
    timeTargetSeconds: 90,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    stimulus:
      'Hydrothermal vent communities on Earth\'s deep ocean floor sustain complex ecosystems through chemosynthesis, entirely without solar input: specialized microbes oxidize hydrogen sulfide and other inorganic compounds to produce organic matter, which supports tube worms, crustaceans, and a range of invertebrates. Crucially, these communities require not merely the presence of chemical compounds but a specific redox gradient — the co-occurrence of electron donors (reduced compounds) and acceptors (oxidizing agents) at rates sufficient to sustain microbial metabolism. Astrobiologists note that Europa\'s subsurface ocean may be subject to tidal heating sufficient to drive hydrothermal activity, and that water plumes ejected from Europa\'s surface have yielded spectroscopic signatures broadly consistent with vent-derived geochemistry — though direct sampling has not confirmed the presence of the specific redox gradients that Earth\'s chemosynthetic communities require.',
    question: 'Which conclusion is most directly supported by the text?',
    choices: [
      { label: 'A', text: 'If Europa harbors hydrothermal activity, life has almost certainly developed there, given that similar conditions on Earth reliably sustain complex ecosystems.' },
      { label: 'B', text: 'The spectroscopic signatures in Europa\'s water plumes confirm the redox gradients necessary for chemosynthesis, making the moon a strong candidate for life.' },
      { label: 'C', text: 'The presence of tidal heating and vent-consistent geochemical signatures on Europa suggests the conditions necessary for chemosynthetic life may exist there, but the specific redox gradients required have not been confirmed.' },
      { label: 'D', text: 'Chemosynthetic ecosystems can sustain themselves on any planetary body that has liquid water, regardless of the specific chemical compounds present.' },
    ],
    correctAnswer: 'C',
    explanation:
      'The passage establishes two requirements for chemosynthetic life: general vent conditions AND specific redox gradients. It then states that Europa shows vent-consistent geochemical signatures (supporting general conditions) but that direct sampling has not confirmed the specific redox gradients. The supported inference must acknowledge both the suggestive evidence and the outstanding gap. Choice C does precisely this. Choice A overclaims — "almost certainly developed" is far stronger than the evidence warrants, and the text cautions that even the chemical prerequisites remain unconfirmed. Choice B directly contradicts the passage, which explicitly says direct sampling has not confirmed the redox gradients — the spectroscopic signatures are "broadly consistent with" vent geochemistry, not confirmation of redox gradients. Choice D is unsupported: the passage specifies that redox gradients — not merely liquid water — are required for chemosynthetic communities.',
    wrongAnswerExplanations: {
      A: '"Almost certainly" requires a level of confidence the passage does not support; even confirming vent activity would not guarantee life, given the unresolved redox-gradient question.',
      B: 'The passage explicitly states that direct sampling has not confirmed redox gradients — this choice misrepresents spectroscopic consistency as confirmation.',
      D: 'The passage specifies that redox gradients (electron donors and acceptors at adequate rates) are required — liquid water is necessary but not sufficient.',
    },
    teachingPoint:
      'In passages that establish multi-condition requirements for a phenomenon, the correct inference must reflect all unmet conditions — a choice that treats partial evidence as confirmation of the full requirement will misrepresent the text.',
    relatedSkills: ['Central Ideas and Details', 'Command of Evidence'],
  },

  // Inferences — hard
  {
    id: 'rw-b3-007',
    test: 'SAT',
    section: 'reading-writing',
    domain: 'Information and Ideas',
    skill: 'Inferences',
    difficulty: 'hard',
    timeTargetSeconds: 90,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    stimulus:
      'A multi-year study of invasive plant species found that wind-dispersed species colonized new habitats at rates exceeding fifty kilometers per year from established populations, while animal-dispersed species rarely exceeded ten kilometers annually. In landscapes fragmented by roads, agricultural barriers, and urban development, wind-dispersed species showed spread rates constrained to fewer than twenty kilometers per year. Animal-dispersed species in the same fragmented landscapes showed no statistically significant change in spread rate compared to unfragmented environments. Notably, in both landscape types, wind-dispersed species were associated with greater reductions in native plant species richness within colonized areas than animal-dispersed species were.',
    question:
      'Which inference is most strongly supported by the data in the text?',
    choices: [
      { label: 'A', text: 'In fragmented landscapes, animal-dispersed invasive species pose a greater overall ecological threat than wind-dispersed species, because fragmentation eliminates the spread advantage that makes wind-dispersed species dangerous.' },
      { label: 'B', text: 'Landscape fragmentation reduces the threat posed by wind-dispersed invasive species but does not eliminate it, since wind-dispersed species continue to outspread animal-dispersed species and cause greater native-species losses even in fragmented environments.' },
      { label: 'C', text: 'Removing fragmentation barriers would restore wind-dispersed invasive species to their original fifty-kilometer spread rate while having no effect on animal-dispersed species.' },
      { label: 'D', text: 'Animal-dispersed invasive species are not an ecological concern in any landscape type, because their spread is inherently constrained to rates too low to cause meaningful native-species displacement.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Two pieces of information must be combined: (1) in fragmented landscapes, wind-dispersed species still spread up to 20 km/year versus animal-dispersed species\' 10 km/year — wind-dispersed still outspread; and (2) in both landscape types, wind-dispersed species cause greater reductions in native species richness. Together, these support the inference that fragmentation reduces but does not eliminate the threat from wind-dispersed species: they remain faster-spreading and more ecologically damaging even in fragmented environments. Choice A concludes that animal-dispersed species pose a "greater overall threat" in fragmented landscapes — but wind-dispersed species still spread faster and cause greater native-species losses, so this conclusion is not supported. Choice C makes a specific prediction about barrier removal that the study never tested; the data describes current conditions only. Choice D dismisses animal-dispersed species entirely — but the text never characterizes their 10-km spread as too low to cause harm, and it applies in all landscape types, not just fragmented ones.',
    wrongAnswerExplanations: {
      A: 'Even in fragmented landscapes, wind-dispersed species spread twice as fast (20 km vs. 10 km) and cause greater native-species losses — the spread advantage is reduced, not eliminated, and ecological impact remains higher.',
      C: 'The study measures observed spread rates under current conditions; it does not model outcomes under hypothetical fragmentation removal.',
      D: 'Ten kilometers of annual spread is not characterized as ecologically harmless in the passage, and the text does not restrict the comparison to one landscape type.',
    },
    teachingPoint:
      'Hard inference questions often require synthesizing two data points — here, spread rate and ecological impact — to evaluate whether a claimed reduction in threat is total or partial. Check both dimensions before accepting a conclusion.',
    relatedSkills: ['Command of Evidence', 'Central Ideas and Details'],
  },

  // ── Group B: Craft and Structure ────────────────────────────────────────

  // Words in Context — easy (formerly medium)
  {
    id: 'rw-b3-008',
    test: 'SAT',
    section: 'reading-writing',
    domain: 'Craft and Structure',
    skill: 'Words in Context',
    difficulty: 'easy',
    timeTargetSeconds: 60,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    stimulus:
      'The architectural critic argued that the renovation, however technically accomplished, had domesticated the building\'s famously austere facade — trading the original structure\'s severe, almost confrontational geometry for surfaces that invited rather than challenged the viewer.',
    question:
      'As used in the text, what does the word "domesticated" most nearly mean?',
    choices: [
      { label: 'A', text: 'Made suitable for residential occupancy' },
      { label: 'B', text: 'Tamed or rendered more approachable' },
      { label: 'C', text: 'Refined through careful craftsmanship' },
      { label: 'D', text: 'Adapted to reflect local cultural preferences' },
    ],
    correctAnswer: 'B',
    explanation:
      'The critic contrasts the original\'s "severe, almost confrontational geometry" with surfaces that "invited rather than challenged the viewer." The renovation softened something harsh — it made the building less threatening and more comfortable. "Domesticated" here means tamed or rendered approachable. Choice A takes the word too literally: the sentence concerns visual aesthetic character, not whether the building can be inhabited. Choice C ("refined") implies an improvement in craft, which contradicts the critic\'s framing of domestication as a loss of confrontational power. Choice D introduces a cultural dimension ("local cultural preferences") that is entirely absent from the passage, which contrasts severity with approachability, not one culture with another.',
    wrongAnswerExplanations: {
      A: 'The context is about visual and aesthetic register — the building\'s emotional effect on viewers — not whether it can be used as a residence.',
      C: '"Refined" suggests improvement; the critic presents domestication as a diminishment of the building\'s challenging quality.',
      D: 'No geographic or cultural adaptation is described; the contrast is between severity and approachability.',
    },
    teachingPoint:
      'When a word has a common literal meaning (domesticated = made into a home), check whether the surrounding context is about something physical or about a quality. The critical framing ("severe" vs. "invited") signals the figurative register.',
    relatedSkills: ['Text Structure and Purpose', 'Central Ideas and Details'],
  },

  // Words in Context — medium
  {
    id: 'rw-b3-009',
    test: 'SAT',
    section: 'reading-writing',
    domain: 'Craft and Structure',
    skill: 'Words in Context',
    difficulty: 'medium',
    timeTargetSeconds: 75,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    stimulus:
      'The commission\'s final report was a masterwork of strategic opacity: its central recommendations were buried within labyrinthine appendices, and the most consequential findings were systematically subordinated to a sequence of procedural updates that few readers would parse carefully enough to recognize as secondary material — let alone as a deliberate screen.',
    question:
      'As used in the text, what does the word "subordinated" most nearly mean?',
    choices: [
      { label: 'A', text: 'Elevated in prominence through editorial emphasis' },
      { label: 'B', text: 'Rendered less visible by deliberate structural placement' },
      { label: 'C', text: 'Organized into a logical sequence for reader clarity' },
      { label: 'D', text: 'Synthesized with procedural content to streamline the report' },
    ],
    correctAnswer: 'B',
    explanation:
      'The passage describes a report designed for "strategic opacity" in which important findings are positioned after less important procedural updates — a deliberate structural technique that makes the findings appear less significant. "Subordinated" refers to ranking the findings below the procedural material through placement, causing readers to fail to recognize them as the primary content. Choice A is the opposite: the findings are depressed in apparent importance, not elevated. Choice C implies neutral, reader-friendly sequencing; the passage describes a deliberate distortion of apparent importance, not transparent organization. Choice D ("synthesized") means combined or merged — the passage describes a hierarchy in which one element ranks below another, not a blending.',
    wrongAnswerExplanations: {
      A: 'The passage describes the findings as hidden and made to appear secondary — the exact opposite of elevated prominence.',
      C: 'Logical sequencing for reader clarity would mean the findings are easy to locate; the passage says readers fail to recognize them as primary, implying the opposite of clarity.',
      D: '"Synthesized" implies integration; the passage describes a ranking structure in which findings are placed behind procedural content, not merged with it.',
    },
    teachingPoint:
      'In passages describing deliberate rhetorical manipulation, verify that your chosen meaning reflects the author\'s critical tone. "Subordinated" in a context of "strategic opacity" must mean a downward movement in apparent importance, not neutral organization.',
    relatedSkills: ['Text Structure and Purpose', 'Words in Context'],
  },

  // Text Structure and Purpose — medium
  {
    id: 'rw-b3-010',
    test: 'SAT',
    section: 'reading-writing',
    domain: 'Craft and Structure',
    skill: 'Text Structure and Purpose',
    difficulty: 'medium',
    timeTargetSeconds: 75,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    stimulus:
      'Early cartographers confronted a fundamental impossibility: a sphere\'s surface cannot be projected onto a plane without distorting at least one of four spatial properties — distance, area, shape, or direction. Every projection resolves this through trade-offs calibrated to particular uses. The Mercator projection, developed in 1569, preserves angular relationships and constant compass bearings, properties that made it the dominant tool for maritime navigation for four centuries. This navigational precision, however, was purchased at a significant cost to areal accuracy: the projection inflates land masses at higher latitudes progressively and severely, so that Greenland appears comparable in size to Africa, which is in reality roughly fourteen times larger — a distortion that shaped how generations of educated readers visualized the relative scale of continents.',
    question:
      'What is the primary function of the fourth sentence ("This navigational precision… continents")?',
    choices: [
      { label: 'A', text: 'To introduce an alternative projection that corrects the Mercator\'s areal distortions while preserving its directional accuracy' },
      { label: 'B', text: 'To illustrate through a specific example the trade-off inherent in the Mercator\'s prioritization of navigational accuracy over areal fidelity, and to extend that trade-off\'s significance beyond cartography' },
      { label: 'C', text: 'To explain why sixteenth-century cartographers considered angular preservation more important than accurate representation of landmass size' },
      { label: 'D', text: 'To qualify the second sentence\'s claim that all projections involve trade-offs by showing that the Mercator minimized distortion more effectively than its contemporaries' },
    ],
    correctAnswer: 'B',
    explanation:
      'The third sentence establishes the Mercator\'s benefit (navigational precision). The fourth sentence opens with "however" — a pivot — then identifies the cost (areal distortion), illustrates it with the Greenland/Africa comparison, and adds a consequence: this distortion shaped how generations visualized continental scale. The function is to present the trade-off concretely and to note its cultural reach beyond navigation. Choice A is wrong: no alternative projection appears. Choice C reverses the direction — the sentence presents the outcome of the design choice, not the historical reasoning that motivated it. Choice D is wrong: the sentence confirms, not qualifies, the trade-off claim; the Mercator exemplifies the rule stated in sentence two rather than challenging it or presenting an exception.',
    wrongAnswerExplanations: {
      A: 'The fourth sentence remains focused on the Mercator\'s flaw; no competing projection is introduced.',
      C: 'The sentence describes what the design produced (distortion and cultural effect), not why Mercator prioritized angular accuracy over area in 1569.',
      D: 'The Mercator is used as an instance of the universal trade-off rule, not as evidence that any projection minimizes distortion — the sentence reinforces, not qualifies, sentence two.',
    },
    teachingPoint:
      'When analyzing a sentence\'s function, note both what it covers (the trade-off illustration) and what it extends (cultural consequences). A function answer that captures only the local illustration misses the sentence\'s reach.',
    relatedSkills: ['Central Ideas and Details', 'Transitions'],
  },

  // Text Structure and Purpose — medium
  {
    id: 'rw-b3-011',
    test: 'SAT',
    section: 'reading-writing',
    domain: 'Craft and Structure',
    skill: 'Text Structure and Purpose',
    difficulty: 'medium',
    timeTargetSeconds: 75,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    stimulus:
      'Proponents of universal basic income routinely cite administrative consolidation as the policy\'s most defensible fiscal argument: replacing dozens of means-tested programs with a single unconditional payment would, they contend, eliminate the overhead costs that currently consume a substantial share of welfare spending without reaching intended recipients. Yet the calculus rests on premises that deserve examination before they are accepted as given. Which programs would actually be abolished — and which politically entrenched entitlements would persist alongside the new income floor, negating the consolidation savings? Would the administrative efficiencies, if they materialized at all, be of sufficient magnitude to offset the cost of extending unconditional payments to the many citizens who currently receive no benefits and whom the existing system was not designed to serve?',
    question:
      'What is the primary function of the second and third sentences of the passage?',
    choices: [
      { label: 'A', text: 'To present statistical evidence that disproves the administrative-savings estimate offered in the first sentence' },
      { label: 'B', text: 'To cite historical examples of UBI pilot programs that failed to produce the administrative savings their proponents promised' },
      { label: 'C', text: 'To surface the unexamined assumptions embedded in the first sentence\'s fiscal claim, thereby complicating it without definitively refuting it' },
      { label: 'D', text: 'To propose a modified version of UBI that would retain only the means-tested programs with the lowest administrative overhead' },
    ],
    correctAnswer: 'C',
    explanation:
      'The first sentence presents the proponents\' fiscal argument. The second sentence signals scrutiny ("Yet… premises that deserve examination") and names the problem as unexamined assumptions — not errors of fact but unverified presuppositions. The third sentence then poses a pair of rhetorical questions that expose those assumptions without answering them; the text deliberately withholds resolution. This structure complicates rather than refutes. Choice A is wrong: no statistics or data are introduced — only questions. Choice B is wrong: no pilot programs or historical examples are referenced. Choice D is wrong: no alternative policy design is proposed; the sentences pose interrogative challenges to the existing argument.',
    wrongAnswerExplanations: {
      A: 'The sentences pose unanswered questions; questions that expose assumptions are not the same as statistical disproof.',
      B: 'No prior UBI programs — successful or failed — are mentioned anywhere in the passage.',
      D: 'The sentences interrogate the logic of the first sentence; they do not propose any modified UBI structure or alternative program design.',
    },
    teachingPoint:
      'Distinguish "complicating" from "refuting": a passage that raises questions about assumptions without resolving them complicates the prior claim rather than defeating it. Choices that describe disproof or alternative proposals mischaracterize this function.',
    relatedSkills: ['Transitions', 'Central Ideas and Details'],
  },

  // Cross-Text Connections — medium
  {
    id: 'rw-b3-012',
    test: 'SAT',
    section: 'reading-writing',
    domain: 'Craft and Structure',
    skill: 'Cross-Text Connections',
    difficulty: 'medium',
    timeTargetSeconds: 75,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    stimulus:
      'Text 1\n\nSleep researchers have established that adolescents require between eight and ten hours of sleep per night for optimal cognitive and emotional regulation, yet most American high schools begin before 8:00 a.m. — a schedule that conflicts with the biologically later circadian phase typical of teenagers. Advocates argue that shifting to later start times would improve academic outcomes and reduce rates of depression and anxiety.\n\nText 2\n\nA five-year comparative study examined two demographically matched school districts. The district that adopted a 9:00 a.m. start time documented statistically significant improvements in four-year graduation rates and a reduction in student-reported anxiety scores. However, teachers in that district reported increased difficulty coordinating after-school professional development, and the district\'s athletics department cited scheduling conflicts with interscholastic events that depend on afternoon daylight. The authors note that the academic benefits were concentrated among students who reported insufficient sleep before the policy change.',
    question:
      'Based on the two texts, which statement best describes the relationship between them?',
    choices: [
      { label: 'A', text: 'Text 2 fully confirms all of the claims in Text 1 by demonstrating that later start times produce every academic and mental-health benefit that sleep researchers predict.' },
      { label: 'B', text: 'Text 2 provides empirical support for the academic and mental-health claims in Text 1 while revealing implementation costs Text 1 does not address and a nuance — that benefits are concentrated among previously sleep-deprived students — that complicates the generalizability of Text 1\'s advocacy.' },
      { label: 'C', text: 'Text 2 contradicts Text 1 by demonstrating that the scheduling and logistical complications of later start times outweigh the academic benefits the researchers observe.' },
      { label: 'D', text: 'Text 2 is essentially irrelevant to Text 1 because it focuses on graduation rates and athletics scheduling rather than on the sleep-science claims that Text 1 discusses.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Text 2 confirms some of Text 1\'s predictions (graduation rates, anxiety scores improved) while adding information Text 1 omits: scheduling conflicts for teachers and athletics, and the finding that benefits were concentrated among students who were previously sleep-deprived. This last detail complicates the generalizability of Text 1\'s broader advocacy, which implies benefits for all adolescents. Choice B captures this layered relationship — partial confirmation plus added complexity and a nuance about benefit concentration. Choice A overstates: Text 2 does not confirm all predicted outcomes (e.g., cognitive performance per se) and introduces multiple complications. Choice C misrepresents Text 2, which does not rank challenges above benefits or claim the complications outweigh the gains. Choice D ignores that graduation rates and anxiety reduction directly correspond to Text 1\'s academic and mental-health predictions.',
    wrongAnswerExplanations: {
      A: '"Fully confirms all claims" ignores the scheduling conflicts and the finding that benefits were concentrated among previously sleep-deprived students.',
      C: 'Text 2 presents complications alongside benefits but does not assert or imply that the former outweigh the latter.',
      D: 'Graduation and anxiety findings directly address Text 1\'s "academic outcomes" and "depression and anxiety" claims — they are highly relevant.',
    },
    teachingPoint:
      'When a study text partially supports an advocacy text but also introduces nuances that limit the claim\'s scope, the relationship is neither full confirmation nor contradiction — look for a choice that captures support, complexity, and scope limitation together.',
    relatedSkills: ['Command of Evidence', 'Central Ideas and Details'],
  },

  // Cross-Text Connections — hard
  {
    id: 'rw-b3-013',
    test: 'SAT',
    section: 'reading-writing',
    domain: 'Craft and Structure',
    skill: 'Cross-Text Connections',
    difficulty: 'hard',
    timeTargetSeconds: 90,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    stimulus:
      'Text 1\n\nSociologist Dr. Margaux Fontaine argues that remote work has eroded community bonds by eliminating incidental social contact — shared commutes, hallway conversations, impromptu lunches — through which weak ties form across demographic lines. She contends that these weak ties, not formal organizational membership, are the primary mechanism through which urban residents develop mutual recognition and generalized civic trust. Without the environments that generate weak ties, she predicts, civic trust will decline even among people who join civic organizations.\n\nText 2\n\nA longitudinal survey of twelve cities found that remote workers reported significantly higher rates of participation in neighborhood associations, volunteer groups, and civic organizations than office-based workers. Researchers attributed this to remote workers\' scheduling flexibility. Participation in formal organizations was positively correlated with self-reported civic trust across all twelve cities. Notably, remote workers who also reported frequent informal interactions with neighbors showed no higher civic trust than those who reported few such interactions, once organizational participation was controlled for.',
    question:
      'How would Dr. Fontaine most likely respond to the final finding in Text 2 — that controlling for organizational participation eliminated the effect of informal neighbor interactions on civic trust?',
    choices: [
      { label: 'A', text: 'As decisive confirmation that her theory is incorrect, because formal organizational membership demonstrably drives civic trust independent of informal weak-tie formation' },
      { label: 'B', text: 'As inconclusive, because the finding shows only that organizational participation statistically accounts for the variance attributed to informal interactions — not that formal membership causally produces civic trust rather than correlating with pre-existing trust or with unmeasured third factors' },
      { label: 'C', text: 'As irrelevant to her argument, because civic trust among remote workers is a different phenomenon from the community bonds she studies in office-based populations' },
      { label: 'D', text: 'As strong support for her argument, because the elimination of informal interaction effects confirms that weak ties play no independent role in building civic trust' },
    ],
    correctAnswer: 'B',
    explanation:
      'Dr. Fontaine\'s theory holds that weak ties (informal contact) are the primary driver of civic trust. Text 2\'s final finding — that controlling for organizational participation removes the effect of informal interactions — could appear to refute her by suggesting formal membership matters more than informal contact. However, statistical control does not establish causation: if remote workers who have both informal interactions and organizational memberships tend to be high-trust individuals for some third reason (e.g., neighborhood selection, extraversion), controlling for organizational participation might absorb that shared variance without proving that organizations cause trust. Dr. Fontaine would argue that Text 2 has not isolated the causal role of formal organizations — it has only shown that, once you account for organizational participation, additional informal interaction does not add predictive power in the regression. This is an inconclusive, not decisive, finding for her theory. Choice A concedes too much — a sociologist committed to her theoretical framework would challenge the causal interpretation, not accept a correlational control as proof. Choice C misidentifies her theory as restricted to office-based populations. Choice D misreads the finding — the finding shows that informal interactions lose predictive power when organizational participation is controlled for, which is the opposite of support for her view.',
    wrongAnswerExplanations: {
      A: 'Accepting that a statistical control proves formal organizations causally produce trust concedes more than the data warrant; Dr. Fontaine would distinguish correlation from causation.',
      C: 'Her theory concerns how weak ties build civic trust in urban environments broadly — she would not restrict its domain to office-based workers.',
      D: 'The finding that informal interactions lose independent predictive power when organizational participation is controlled does not support her argument — it appears to undercut it, though she would contest the causal interpretation.',
    },
    teachingPoint:
      'In hard Cross-Text questions, a theorist responds to empirical findings by interrogating the methodology\'s causal logic. Statistical control (holding a variable constant) establishes prediction, not causation. A theory\'s author would distinguish these before conceding.',
    relatedSkills: ['Inferences', 'Text Structure and Purpose'],
  },

  // ── Group C: Expression of Ideas ────────────────────────────────────────

  // Transitions — easy (formerly medium)
  {
    id: 'rw-b3-014',
    test: 'SAT',
    section: 'reading-writing',
    domain: 'Expression of Ideas',
    skill: 'Transitions',
    difficulty: 'easy',
    timeTargetSeconds: 60,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    stimulus:
      'For decades, ecologists assumed that large predators played only a modest role in shaping plant communities, since their direct prey were herbivores rather than vegetation. _______, field studies of wolf reintroduction in Yellowstone National Park documented dramatic recoveries of riparian plant species along riverbanks from which elk — newly wary of predation — had retreated.',
    question:
      'Which choice completes the text with the most logical transition?',
    choices: [
      { label: 'A', text: 'Consequently' },
      { label: 'B', text: 'Similarly' },
      { label: 'C', text: 'Specifically' },
      { label: 'D', text: 'Contrary to this view' },
    ],
    correctAnswer: 'D',
    explanation:
      'The first sentence presents an assumption (predators play only a modest role in shaping plant communities). The second sentence presents field evidence that overturns this assumption — wolf reintroduction led to dramatic plant recovery, demonstrating that predators do substantially shape plant communities. The transition must signal that what follows directly contradicts the prior assumption. "Contrary to this view" does exactly that. Choice A ("Consequently") implies the second sentence is a result of the first, but it contradicts rather than results from the assumption. Choice B ("Similarly") implies the sentences move in the same direction — they do not. Choice C ("Specifically") implies the second sentence narrows or elaborates on the first; it overturns it instead.',
    wrongAnswerExplanations: {
      A: '"Consequently" signals that the Yellowstone findings resulted from the ecologists\' assumption — illogical, since the findings challenge the assumption.',
      B: '"Similarly" implies parallel motion; the two sentences contradict each other.',
      C: '"Specifically" would narrow the assumption to a particular case; instead the second sentence refutes the assumption entirely.',
    },
    teachingPoint:
      'When an established belief is directly contradicted by the evidence in the next sentence, the transition must signal contradiction or reversal — not consequence, similarity, or elaboration.',
    relatedSkills: ['Text Structure and Purpose', 'Boundaries'],
  },

  // Transitions — medium
  {
    id: 'rw-b3-015',
    test: 'SAT',
    section: 'reading-writing',
    domain: 'Expression of Ideas',
    skill: 'Transitions',
    difficulty: 'medium',
    timeTargetSeconds: 75,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    stimulus:
      'Many historians credit the telegraph with fundamentally transforming long-distance communication by making it instantaneous. _______, a robust postal infrastructure already existed across Europe and North America by the mid-nineteenth century, capable of delivering correspondence within days across hundreds of miles — raising the question of whether the telegraph represented a transformation in kind or merely a dramatic acceleration of a communication system already functioning at a high level.',
    question:
      'Which choice completes the text with the most logical transition?',
    choices: [
      { label: 'A', text: 'As a result' },
      { label: 'B', text: 'For instance' },
      { label: 'C', text: 'Nevertheless' },
      { label: 'D', text: 'Indeed' },
    ],
    correctAnswer: 'C',
    explanation:
      'The first sentence presents the historians\' claim that the telegraph fundamentally transformed communication. The second sentence introduces a complicating fact — the postal system was already effective — which invites doubt about whether "fundamental transformation" is the right characterization. The transition must signal that despite the historians\' claim, this complicating consideration exists. "Nevertheless" correctly introduces a contrasting fact that coexists with — rather than negates — the claim. Choice A ("As a result") implies the postal system\'s effectiveness resulted from the telegraph\'s reputation, which is nonsensical. Choice B ("For instance") introduces the postal system as a supporting example of transformation, but it is actually a complicating counterpoint. Choice D ("Indeed") reinforces the historians\' claim; the second sentence qualifies it.',
    wrongAnswerExplanations: {
      A: '"As a result" implies causation — the postal system\'s prior existence is not a consequence of the telegraph\'s reputation.',
      B: '"For instance" treats the postal system as a supporting example of transformation; it is in fact a complication that raises doubts about the claim\'s scope.',
      D: '"Indeed" strengthens the first sentence\'s assertion; the second sentence introduces doubt, not reinforcement.',
    },
    teachingPoint:
      'Use "nevertheless" or "however" when a sentence introduces a complicating fact that persists alongside — rather than negates — a prior claim. "Indeed" and "furthermore" reinforce; "as a result" implies causation.',
    relatedSkills: ['Text Structure and Purpose', 'Transitions'],
  },

  // Transitions — hard
  {
    id: 'rw-b3-016',
    test: 'SAT',
    section: 'reading-writing',
    domain: 'Expression of Ideas',
    skill: 'Transitions',
    difficulty: 'hard',
    timeTargetSeconds: 90,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    stimulus:
      'The city\'s inclusionary zoning ordinance required developers to designate fifteen percent of units in each new residential project as income-restricted affordable housing. Within six months of the ordinance\'s passage, three major developers withdrew pending applications, a fourth announced an indefinite delay, and two others publicly stated they were reassessing the viability of projects in the city\'s highest-demand neighborhoods. _______, the city council maintained that the ordinance\'s long-term effect — a sustained increase in total housing supply at mixed income levels — would outweigh the near-term contraction in applications once the development community adjusted its financial models.',
    question:
      'Which choice completes the text with the most logical transition?',
    choices: [
      { label: 'A', text: 'Consequently' },
      { label: 'B', text: 'Furthermore' },
      { label: 'C', text: 'By contrast' },
      { label: 'D', text: 'Even so' },
    ],
    correctAnswer: 'D',
    explanation:
      'The first two sentences establish a significant negative consequence: developer withdrawals and delays across six projects. The third sentence shows the city council holding its position despite those consequences — specifically framing the setbacks as temporary and predicting long-term benefit. The logical relationship is concessive: the council persists in spite of the setback, not because of it. "Even so" signals that the council\'s optimism continues despite what has just been described. Choice A ("Consequently") implies the council\'s optimism resulted from or was caused by the developer withdrawals — which reverses the logic. Choice B ("Furthermore") treats the council\'s position as an additional negative consequence in the same direction as the withdrawals, mischaracterizing it as more bad news. Choice C ("By contrast") marks simple opposition but does not carry the concessive force of persisting despite adversity that "even so" provides; it would suggest the council simply did something different from the developers, missing the nuance of persistence-despite-setback.',
    wrongAnswerExplanations: {
      A: '"Consequently" implies the council\'s optimism arose from the developer withdrawals — illogical, since they argue in spite of the problem.',
      B: '"Furthermore" adds a point in the same direction as the previous sentences; here the council is taking a contrary stance, not adding another negative development.',
      C: '"By contrast" captures opposition but not the concessive quality of maintaining a position despite a specific complication that has just been established.',
    },
    teachingPoint:
      '"Even so" and "nonetheless" signal a concessive relationship: someone holds a position or something remains true despite a specific obstacle. "By contrast" marks mere difference without the sense of persisting against adversity.',
    relatedSkills: ['Text Structure and Purpose', 'Transitions'],
  },

  // Rhetorical Synthesis — easy (formerly medium)
  {
    id: 'rw-b3-017',
    test: 'SAT',
    section: 'reading-writing',
    domain: 'Expression of Ideas',
    skill: 'Rhetorical Synthesis',
    difficulty: 'easy',
    timeTargetSeconds: 60,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    stimulus:
      'A student is writing a report about the health benefits of regular walking and wants to open with a sentence that emphasizes walking\'s accessibility to most people without overstating its health benefits. Using the notes below, which choice best achieves that goal?\n\n• Walking requires no special equipment or gym membership.\n• Studies show thirty minutes of walking per day reduces cardiovascular risk by up to 35%, though effects vary by individual health status.\n• Walking can be done indoors or outdoors, in urban or rural settings.\n• Elite athletes use walking as active recovery between intense training sessions.\n• Walking is less effective as a cardiovascular intervention for individuals with pre-existing joint conditions.',
    question:
      'Which choice most effectively uses the notes to emphasize walking\'s accessibility without overstating its health benefits?',
    choices: [
      { label: 'A', text: 'Walking for thirty minutes each day reduces cardiovascular risk by up to 35%, making it among the most powerful health interventions available to any person.' },
      { label: 'B', text: 'Unlike gym memberships or specialized equipment, walking can be undertaken by nearly anyone in almost any setting — making it one of the most broadly accessible forms of physical activity, even if its health effects vary among individuals.' },
      { label: 'C', text: 'Even elite athletes incorporate walking into their training as active recovery, demonstrating that the activity offers meaningful benefits across the full spectrum of fitness levels.' },
      { label: 'D', text: 'Regular walking delivers cardiovascular benefits that rival those of more intensive exercise programs, provided individuals do not have pre-existing joint conditions.' },
    ],
    correctAnswer: 'B',
    explanation:
      'The goal has two requirements: emphasize accessibility AND avoid overstating health benefits. Choice B addresses the no-equipment and any-setting notes to establish accessibility, then includes the caveat that health effects vary — satisfying both requirements simultaneously. Choice A leads with a strong health claim ("among the most powerful… for any person") and makes an unqualified universal claim that overstates benefits given the notes about individual variation and joint conditions. Choice C uses the elite athlete note, which highlights specialized high-performance use and works against emphasizing accessibility to most ordinary people. Choice D acknowledges the joint-condition caveat but leads with a comparison to intensive exercise programs, making health benefits rather than accessibility the emphasis.',
    wrongAnswerExplanations: {
      A: '"Any person" and "most powerful" overstate benefits — the notes explicitly flag individual variation and contraindications.',
      C: 'The elite athlete note highlights use by exceptional athletes, undermining the intended emphasis on general accessibility.',
      D: 'Comparing to intensive exercise programs foregrounds health-benefit claims over accessibility, reversing the intended emphasis.',
    },
    teachingPoint:
      'When a synthesis goal has two constraints (emphasize X; do not overstate Y), check each choice against both constraints independently — a choice can satisfy one while failing the other.',
    relatedSkills: ['Transitions', 'Text Structure and Purpose'],
  },

  // Rhetorical Synthesis — medium
  {
    id: 'rw-b3-018',
    test: 'SAT',
    section: 'reading-writing',
    domain: 'Expression of Ideas',
    skill: 'Rhetorical Synthesis',
    difficulty: 'medium',
    timeTargetSeconds: 75,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    stimulus:
      'A researcher is writing an academic paper about coral reef decline and wants a sentence that acknowledges multiple contributing factors while establishing that rising ocean temperatures are the primary driver — without implying that temperature rise alone explains the full extent of the decline. Using the notes below, which choice best achieves that goal?\n\n• Ocean temperatures have risen by 1.2°C over the past century, triggering mass bleaching events on every major reef system.\n• Agricultural runoff introduces excess nutrients, promoting algae that smother recovering coral.\n• Overfishing removes herbivorous species that graze algae, compounding the effects of runoff.\n• Ocean acidification from absorbed CO₂ reduces calcification rates, weakening coral skeletal structure.\n• Bleaching events from which reefs do not fully recover have increased in frequency from once per decade to once every three to five years.',
    question:
      'Which choice most effectively uses the notes to acknowledge multiple causes while establishing temperature rise as the primary driver without implying it alone explains all decline?',
    choices: [
      { label: 'A', text: 'Coral reef decline results from a convergence of agricultural runoff, overfishing, and ocean acidification, each of which is worsened by rising temperatures.' },
      { label: 'B', text: 'While factors including agricultural runoff, overfishing, and ocean acidification each degrade reef ecosystems through independent pathways, rising ocean temperatures have emerged as the dominant driver — triggering the increasingly frequent mass bleaching events from which reefs are failing to recover.' },
      { label: 'C', text: 'Ocean temperatures have risen by 1.2°C over the past century, and this warming has become the sole cause of the accelerating reef decline documented worldwide.' },
      { label: 'D', text: 'Coral reef decline is a multifactorial crisis in which temperature rise, runoff, overfishing, and acidification play equally important and interacting roles.' },
    ],
    correctAnswer: 'B',
    explanation:
      'The goal has three requirements: (1) acknowledge multiple causes, (2) establish temperature as the primary driver, and (3) avoid implying temperature alone explains all decline. Choice B satisfies all three: multiple causes are named and acknowledged to operate through "independent pathways" (satisfying requirements 1 and 3), and temperature is called the "dominant driver" supported by the bleaching evidence (satisfying requirement 2). Choice A frames temperature as an amplifier of the other causes, positioning it as secondary rather than primary. Choice C uses "sole cause," directly violating requirement 3. Choice D says causes play "equally important" roles, directly violating requirement 2 by denying temperature\'s primacy.',
    wrongAnswerExplanations: {
      A: 'Framing temperature as something that "worsens" other causes positions it as a secondary amplifier, not the primary driver.',
      C: '"Sole cause" directly violates the requirement to acknowledge multiple causes and misrepresents temperature\'s role.',
      D: '"Equally important" denies primacy to temperature, failing requirement 2.',
    },
    teachingPoint:
      'When a synthesis task has three layered requirements, eliminate in order: first choices that violate the most explicit constraint, then those that satisfy two but fail the third.',
    relatedSkills: ['Transitions', 'Central Ideas and Details'],
  },

  // Rhetorical Synthesis — hard
  {
    id: 'rw-b3-019',
    test: 'SAT',
    section: 'reading-writing',
    domain: 'Expression of Ideas',
    skill: 'Rhetorical Synthesis',
    difficulty: 'hard',
    timeTargetSeconds: 90,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    stimulus:
      'A student is writing a persuasive essay arguing that municipal governments should increase public library funding to expand digital lending services. The student wants to conclude the essay by issuing a call to action that references both the documented demand for digital services and the specific mechanism through which residents can influence funding decisions — without misrepresenting the survey data or the scope of authority held by each body. Using the notes below, which choice best achieves that goal?\n\n• Public libraries currently lack the budget for digital licenses, which cost libraries three to five times more per title than print licenses.\n• A recent survey found that 68% of library users would borrow digital titles more frequently if the selection were larger; the survey did not measure whether non-users would adopt digital lending if selection improved.\n• Municipal councils control annual library budget allocations and typically finalize them during spring budget hearings.\n• State library associations can lobby for increased allocations but cannot directly compel councils to act.\n• Digital borrowing allows patrons to access e-books and audiobooks remotely without visiting a branch.',
    question:
      'Which choice most effectively uses the notes to issue a call to action referencing documented demand and the specific funding mechanism, without misrepresenting the survey data or the authority of any body?',
    choices: [
      { label: 'A', text: 'Because nearly seven in ten library users want broader digital collections, and because municipal councils hold the budget authority to provide them, residents who already use libraries should attend spring budget hearings and advocate directly for increased digital licensing funds.' },
      { label: 'B', text: 'Since 68% of all residents want expanded digital library services, the community should pressure state library associations — which have the authority to compel councils to increase library funding — to act before the next budget cycle.' },
      { label: 'C', text: 'Digital library services are in high demand across the community, and municipal governments should recognize their obligation to fund them adequately by allocating more resources at the next opportunity.' },
      { label: 'D', text: 'Residents who want better digital libraries should contact their state library associations, which can mandate that municipal councils direct more of the annual budget toward digital licensing.' },
    ],
    correctAnswer: 'A',
    explanation:
      'The goal requires: (1) a call to action directed at residents, (2) accurate representation of documented demand, (3) identification of the specific funding mechanism, and (4) no misrepresentation of any body\'s authority. Choice A satisfies all four: demand is accurately described as applying to library users (not all residents), the mechanism is precisely identified as municipal council hearings in spring, and residents are given a clear action. Choice B misrepresents in two ways: "68% of all residents" overstates the survey scope (library users only), and state associations cannot "compel" councils — the notes say they can only lobby. Choice C issues a directive to government ("municipal governments should recognize their obligation") rather than to readers — not a reader-directed call to action — and "across the community" overstates the survey\'s scope. Choice D misrepresents state associations as able to "mandate" council action, which the notes explicitly contradict.',
    wrongAnswerExplanations: {
      B: '"All residents" misrepresents the survey (library users only); "compel" misrepresents state associations\' authority (lobby only).',
      C: 'Directing government to act is not a call to action for the reader; the persuasive goal requires readers to do something specific.',
      D: 'State associations cannot mandate or compel councils per the notes — "mandate" directly misrepresents their authority.',
    },
    teachingPoint:
      'Hard Rhetorical Synthesis questions that include the constraint "without misrepresenting" require checking each choice against scope qualifiers in the notes. "Library users" is not "all residents"; "can lobby" is not "can compel."',
    relatedSkills: ['Transitions', 'Text Structure and Purpose'],
  },

  // ── Group D: Standard English Conventions ───────────────────────────────

  // Boundaries — easy (formerly medium)
  {
    id: 'rw-b3-020',
    test: 'SAT',
    section: 'reading-writing',
    domain: 'Standard English Conventions',
    skill: 'Boundaries',
    difficulty: 'easy',
    timeTargetSeconds: 60,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    stimulus:
      'The renovation of the historic train station, which had been closed to the public for nearly two decades _______ transformed the long-neglected structure into an arts and commerce hub that now draws over forty thousand visitors each month.',
    question:
      'Which choice completes the text so that it conforms to the conventions of Standard Written English?',
    choices: [
      { label: 'A', text: 'decades' },
      { label: 'B', text: 'decades,' },
      { label: 'C', text: 'decades, it' },
      { label: 'D', text: 'decades; and' },
    ],
    correctAnswer: 'B',
    explanation:
      'The sentence structure is: "The renovation of the historic train station [nonrestrictive relative clause: which had been closed to the public for nearly two decades] transformed the long-neglected structure…" Because the relative clause is nonrestrictive, it must be enclosed by commas on both sides. The opening comma appears after "station"; the closing comma must appear after "decades" before the main verb "transformed." Choice B supplies this necessary closing comma. Choice A omits it, allowing the clause to run into the predicate. Choice C adds "it," creating a second grammatical subject and producing a comma splice. Choice D uses a semicolon, which cannot close a relative clause — semicolons separate independent clauses.',
    wrongAnswerExplanations: {
      A: 'Without the closing comma, the nonrestrictive clause is not properly bounded and the sentence reads as a run-on.',
      C: '"It" creates a second subject, producing a comma splice between the clause and the predicate.',
      D: 'A semicolon separates independent clauses; a dependent relative clause cannot be closed with one.',
    },
    teachingPoint:
      'Nonrestrictive relative clauses introduced by "which" or "who" must be enclosed by commas on both sides. The closing comma is required before the main verb or the continuation of the independent clause.',
    relatedSkills: ['Transitions', 'Form, Structure, and Sense'],
  },

  // Boundaries — medium
  {
    id: 'rw-b3-021',
    test: 'SAT',
    section: 'reading-writing',
    domain: 'Standard English Conventions',
    skill: 'Boundaries',
    difficulty: 'medium',
    timeTargetSeconds: 75,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    stimulus:
      'The scientist\'s most celebrated achievement, her isolation of a previously uncharacterized enzyme capable of catalyzing the decomposition of polyethylene terephthalate at room temperature _______ has attracted substantial interest from both industrial chemists and environmental engineers seeking scalable plastic remediation strategies.',
    question:
      'Which choice completes the text so that it conforms to the conventions of Standard Written English?',
    choices: [
      { label: 'A', text: 'temperature,' },
      { label: 'B', text: 'temperature' },
      { label: 'C', text: 'temperature, and it' },
      { label: 'D', text: 'temperature; this discovery' },
    ],
    correctAnswer: 'A',
    explanation:
      'The sentence\'s subject is "The scientist\'s most celebrated achievement." The long phrase beginning with "her isolation of a previously uncharacterized enzyme…" is a nonrestrictive appositive that renames "achievement." Appositives of this kind require commas on both sides. The opening comma appears after "achievement"; the closing comma must appear after "temperature" before the main verb "has attracted." Choice A supplies this closing comma correctly. Choice B omits it, causing the appositive to run directly into the predicate. Choice C adds "and it," creating a second subject and a comma splice — the material before "and it" has no predicate and cannot stand as an independent clause. Choice D uses a semicolon and renames the subject as "this discovery"; the material before the semicolon ("The scientist\'s most celebrated achievement, her isolation… at room temperature") is a fragment because it has no predicate.',
    wrongAnswerExplanations: {
      B: 'Without the closing comma the appositive runs into the predicate, producing a structural error.',
      C: '"And it" introduces a second subject; the material before it is not an independent clause, so this creates a comma splice.',
      D: 'A semicolon requires an independent clause on each side; "The scientist\'s most celebrated achievement… at room temperature" has no predicate and is a fragment.',
    },
    teachingPoint:
      'Nonrestrictive appositive noun phrases must be closed by a comma immediately before the main predicate. Omitting the closing comma or substituting a semicolon creates a structural error because the material before the predicate is a noun phrase, not an independent clause.',
    relatedSkills: ['Boundaries', 'Form, Structure, and Sense'],
  },

  // Boundaries — hard
  {
    id: 'rw-b3-022',
    test: 'SAT',
    section: 'reading-writing',
    domain: 'Standard English Conventions',
    skill: 'Boundaries',
    difficulty: 'hard',
    timeTargetSeconds: 90,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    stimulus:
      'The regional water authority\'s most recent infrastructure audit concluded that the three treatment facilities serving the northern watershed — each of which was constructed before current federal safe-drinking-water standards were enacted _______ would require capital investment exceeding four hundred million dollars to achieve full regulatory compliance within the mandated ten-year remediation window.',
    question:
      'Which choice completes the text so that it conforms to the conventions of Standard Written English?',
    choices: [
      { label: 'A', text: 'enacted —' },
      { label: 'B', text: 'enacted,' },
      { label: 'C', text: 'enacted' },
      { label: 'D', text: 'enacted; they' },
    ],
    correctAnswer: 'A',
    explanation:
      'The sentence contains a parenthetical phrase opened by an em dash after "watershed": "— each of which was constructed before current federal safe-drinking-water standards were enacted." Because the parenthetical was opened with an em dash, the matching punctuation to close it must also be an em dash — placed after "enacted." Choice A correctly supplies the closing em dash. Choice B uses a comma, which mismatches the opening em dash; mixing punctuation types to open and close a parenthetical is a boundary error. Choice C omits any closing delimiter, leaving the parenthetical phrase open and merging it with the main predicate. Choice D uses a semicolon and adds "they," but the material before the semicolon ("The regional water authority\'s most recent infrastructure audit concluded that the three treatment facilities serving the northern watershed — each of which was constructed before current federal safe-drinking-water standards were enacted") has no complete predicate for "the three treatment facilities" and is therefore a fragment.',
    wrongAnswerExplanations: {
      B: 'Em-dash parentheticals must be closed with an em dash — mixing an em dash opener with a comma closer is an asymmetric boundary error.',
      C: 'Without a closing delimiter, the parenthetical merges with the main predicate, making it impossible to parse where the aside ends.',
      D: 'The material before the semicolon lacks a predicate for "the three treatment facilities" and is a fragment; a semicolon cannot repair a fragment.',
    },
    teachingPoint:
      'Parenthetical phrases opened with em dashes must be closed with em dashes. This matching requirement is strict — a comma or semicolon cannot close an em-dash-delimited aside.',
    relatedSkills: ['Transitions', 'Boundaries'],
  },

  // Form, Structure, and Sense — easy
  {
    id: 'rw-b3-023',
    test: 'SAT',
    section: 'reading-writing',
    domain: 'Standard English Conventions',
    skill: 'Form, Structure, and Sense',
    difficulty: 'easy',
    timeTargetSeconds: 60,
    mistakeType: 'concept error',
    questionType: 'multiple_choice',
    stimulus:
      'Neither the lead researcher nor the graduate students _______ yet reviewed the full dataset before the preliminary findings were submitted to the journal.',
    question:
      'Which choice completes the text so that it conforms to the conventions of Standard Written English?',
    choices: [
      { label: 'A', text: 'has' },
      { label: 'B', text: 'have' },
      { label: 'C', text: 'had' },
      { label: 'D', text: 'was' },
    ],
    correctAnswer: 'C',
    explanation:
      'The sentence describes an action that had not occurred before another past event (submission to the journal). The word "yet" and the subordinate clause "before the preliminary findings were submitted" establish a past-before-past sequence, requiring past perfect: "had." With "neither…nor" constructions, the verb agrees with the nearest subject. The nearest subject is "the graduate students" (plural), so the verb requires plural agreement — and "had" functions as the past perfect auxiliary for plural subjects. Choice A ("has") is present perfect singular — wrong tense and number. Choice B ("have") is present perfect plural — right number, wrong tense for a past-before-past context. Choice D ("was") is a past-tense linking verb and cannot serve as the auxiliary for "reviewed."',
    wrongAnswerExplanations: {
      A: '"Has" is present perfect and singular — wrong on both tense and number.',
      B: '"Have" is correct in number but sets the action in a present-perfect rather than past-perfect frame.',
      D: '"Was" is a linking verb and cannot function as the auxiliary needed for "reviewed" in this construction.',
    },
    teachingPoint:
      '"Before [past event]" signals the past perfect ("had + past participle"), which locates an action as completed prior to another past action. The tense requirement takes priority over number considerations when both are in play.',
    relatedSkills: ['Boundaries', 'Form, Structure, and Sense'],
  },

  // Form, Structure, and Sense — medium
  {
    id: 'rw-b3-024',
    test: 'SAT',
    section: 'reading-writing',
    domain: 'Standard English Conventions',
    skill: 'Form, Structure, and Sense',
    difficulty: 'medium',
    timeTargetSeconds: 75,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    stimulus:
      'By the time the phased renovation concludes next spring, the landmark opera house _______ shuttered for a cumulative total of four and a half years across its two separate closure periods.',
    question:
      'Which choice completes the text so that it conforms to the conventions of Standard Written English?',
    choices: [
      { label: 'A', text: 'will have been' },
      { label: 'B', text: 'has been' },
      { label: 'C', text: 'will be' },
      { label: 'D', text: 'had been' },
    ],
    correctAnswer: 'A',
    explanation:
      'The time marker "By the time the phased renovation concludes next spring" establishes a future reference point. The sentence describes a state — being shuttered for a cumulative duration — that will be complete by that future point. This requires the future perfect tense: "will have been." Choice B ("has been") is present perfect, which anchors the completed action to the present moment, not a future reference point. Choice C ("will be") is simple future and cannot express a completed duration — it would mean the opera house simply will be shuttered in the spring, not that the shuttering will have accumulated over time. Choice D ("had been") is past perfect, which requires a past reference point; "next spring" is in the future, making past perfect grammatically inappropriate here.',
    wrongAnswerExplanations: {
      B: '"Has been" is present perfect — it anchors the completion to now, not to a future reference point.',
      C: '"Will be" expresses a simple future state and cannot convey the cumulative completed duration required by "four and a half years."',
      D: '"Had been" requires a past reference point; the clause "next spring" is in the future, making past perfect tense inappropriate.',
    },
    teachingPoint:
      '"By the time [future clause]" always triggers future perfect ("will have + past participle") when describing a duration or action completed at a future moment. This differs from "by the time [past clause]," which triggers past perfect.',
    relatedSkills: ['Form, Structure, and Sense', 'Boundaries'],
  },

  // Form, Structure, and Sense — hard
  {
    id: 'rw-b3-025',
    test: 'SAT',
    section: 'reading-writing',
    domain: 'Standard English Conventions',
    skill: 'Form, Structure, and Sense',
    difficulty: 'hard',
    timeTargetSeconds: 90,
    mistakeType: 'trap answer',
    questionType: 'multiple_choice',
    stimulus:
      'The panel\'s final recommendations, which synthesized input from more than sixty stakeholders across three separate working groups that had each been convened over a period of eighteen months, _______ nonetheless fail to address the two provisions most urgently flagged by frontline workers during the consultation process.',
    question:
      'Which choice completes the text so that it conforms to the conventions of Standard Written English?',
    choices: [
      { label: 'A', text: 'is said to' },
      { label: 'B', text: 'are said to' },
      { label: 'C', text: 'was said to' },
      { label: 'D', text: 'is saying to' },
    ],
    correctAnswer: 'B',
    explanation:
      'The grammatical subject of the sentence is "The panel\'s final recommendations" — a plural noun phrase. The intervening relative clause ("which synthesized input from more than sixty stakeholders across three separate working groups that had each been convened over a period of eighteen months") is long enough to create proximity attraction toward "months" or "groups," but the verb must agree with "recommendations." "Recommendations" is plural, requiring a plural verb. The sentence also requires the present-tense passive construction ("are said to") to remain consistent with the present-tense main verb "fail" later in the clause. Choice A ("is said to") is singular. Choice C ("was said to") is past tense, inconsistent with the present-tense "fail to address" that follows. Choice D ("is saying to") is active voice, singular, and progressive — none of which fit the passive, plural, non-progressive context.',
    wrongAnswerExplanations: {
      A: '"Is said to" is singular and does not agree with "recommendations" (plural).',
      C: '"Was said to" is past tense; "fail to address" in the same sentence establishes a present-tense frame, making past tense inconsistent.',
      D: '"Is saying to" is active voice, singular, and progressive — three simultaneous errors for a context requiring passive voice, plural number, and simple (non-progressive) aspect.',
    },
    teachingPoint:
      'In sentences with long intervening relative clauses, identify the true grammatical subject ("recommendations," not "stakeholders" or "groups") before selecting the verb. Proximity attraction — choosing the verb based on the nearest noun — is the primary trap in hard FSS questions.',
    relatedSkills: ['Boundaries', 'Form, Structure, and Sense'],
  },
]
