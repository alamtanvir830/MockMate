import type { AcademySkill } from '../types'

export const crossTextConnections: AcademySkill = {
  slug: 'cross-text-connections',
  title: 'Cross-Text Connections',
  objective: 'By the end of this lesson, you will be able to compare how two authors approach a shared topic and determine the precise relationship between their claims, methods, or conclusions.',
  estimatedMinutes: 26,
  subskills: ['Agreement Between Texts', 'Disagreement Between Texts', 'Comparison of Methods', 'Comparison of Conclusions', 'How One Text Responds to Another', 'Use of Evidence Across Texts', 'Inference About One Author Given the Other'],
  section: 'reading',
  overview: {
    whatItTests:
      'Comparing two short independent passages to identify how they relate — whether their claims agree, disagree, partially overlap, or qualify each other.',
    howItAppears:
      'Questions pair two brief texts labeled "Text 1" and "Text 2" and ask how the authors relate to each other\'s ideas. Common phrasings include "Based on the texts, how would the author of Text 2 most likely respond to the claim made in Text 1?" or "Which choice best describes the relationship between the two texts?"',
    whyStudentsMissIt:
      'Students focus on only one of the two texts, or they pick an answer that is accurate about one passage but ignores the other. Many students also overstate the relationship — treating a minor qualification as a full-blown contradiction, or treating partial agreement as complete agreement.',
    whatToLookFor:
      'The precise point of contact between the two texts: the specific claim, idea, or evidence where the authors converge or diverge. The correct answer will be accurate about both passages and will name the relationship correctly — agreement, disagreement, qualification, or partial overlap.',
  },
  strategy: {
    steps: [
      'Read Text 1 and write a one-sentence summary of its main claim in your own words.',
      'Read Text 2 and write a one-sentence summary of its main claim in your own words.',
      'Identify the relationship: do the two texts agree, disagree, partially overlap, or does one qualify the other?',
      'Predict how the author of one text would respond to the other\'s specific claim — imagine the authors in a conversation.',
      'Eliminate answers that misrepresent either passage, exaggerate the agreement or disagreement, or introduce ideas not found in either text.',
      'Select the answer that accurately reflects the relationship and is supported by evidence from both texts.',
    ],
    timeSavingTip:
      'Summarize each text in one sentence before reading the choices. If your summaries are clear, you can often identify the correct relationship before you even look at the options.',
    whenNotToOverthink:
      'If one answer accurately names what Text 1 says and correctly describes how Text 2 responds to it — and the others distort one or both texts — the choice that stays closest to both passages is almost always right.',
  },
  commonTraps: [
    {
      title: 'The single-passage trap',
      description:
        'A choice is accurate about one text but ignores the other entirely. Students who read only Text 1 carefully, or who anchor too heavily on one passage, are vulnerable to this trap.',
      avoidance:
        'Before selecting any answer, ask: "Does this choice accurately represent both passages?" If the choice only reflects one text, eliminate it.',
    },
    {
      title: 'The true-but-irrelevant trap',
      description:
        'A choice makes an accurate statement about one of the passages but fails to address the actual relationship between them. It is correct in isolation but misses the cross-text dimension entirely.',
      avoidance:
        'The correct answer must describe how the two texts relate to each other, not simply restate what one text says. Verify that the answer addresses both sides of the relationship.',
    },
    {
      title: 'The overstated-agreement trap',
      description:
        'A choice claims the two authors fully agree when they actually only partly agree or agree on one point while differing on another. This trap appears when students notice any shared idea and assume the authors are completely aligned.',
      avoidance:
        'Check whether there are any points of difference. If Text 2 agrees on a central claim but adds a limitation or caveat, the relationship is partial agreement or qualification, not full agreement.',
    },
    {
      title: 'The overstated-disagreement trap',
      description:
        'A choice describes the relationship as a flat contradiction when Text 2 actually accepts part of Text 1\'s argument and only disputes one aspect of it. Students who latch onto a single opposing sentence can miss the nuance.',
      avoidance:
        'If Text 2 acknowledges or accepts any part of Text 1\'s claim before pushing back, the relationship is a qualification, not a total rejection. Look for concessive language like "while," "although," or "even if."',
    },
  ],
  guidedExamples: [
    {
      id: 'ctc-ex-1',
      stimulus:
        'Text 1: Migratory birds use Earth\'s magnetic field as a navigational compass during their long seasonal journeys. Experiments in which researchers altered the magnetic environment in a laboratory caused captive birds to reorient themselves in the predicted direction, providing strong experimental support for this hypothesis. The birds\' internal magnetic compass appears to be both sensitive and reliable, capable of detecting subtle variations in field strength across vast distances.\n\nText 2: The claim that birds navigate primarily by sensing Earth\'s magnetic field overlooks a substantial body of evidence pointing to celestial cues. Studies conducted under open skies show that birds track the position of the sun during the day and use star patterns at night. When the night sky is artificially rotated in a planetarium, birds shift their orientation accordingly — a response that magnetic field manipulation alone cannot explain.',
      question:
        'Which choice best describes the relationship between the two texts?',
      steps: [
        {
          instruction: 'Summarize Text 1',
          content:
            'Text 1 argues that migratory birds navigate using Earth\'s magnetic field, citing laboratory experiments as strong evidence for this claim.',
        },
        {
          instruction: 'Summarize Text 2',
          content:
            'Text 2 argues that celestial cues — the sun and stars — are the primary navigational tools, and that laboratory magnetic experiments do not account for birds\' responses to rotating star patterns.',
        },
        {
          instruction: 'Identify the relationship',
          content:
            'The two texts present opposing explanations for the same phenomenon. Text 2 explicitly says the magnetic-field hypothesis "overlooks" celestial evidence, placing the two authors in direct disagreement about the primary navigation mechanism.',
        },
        {
          instruction: 'Predict and match',
          content:
            'The author of Text 2 would reject the conclusion of Text 1, arguing that the experimental evidence for magnetic navigation is incomplete because it fails to account for how birds respond to star-pattern shifts. The correct answer should describe disagreement about the primary navigation mechanism.',
        },
      ],
      choices: [
        {
          label: 'A',
          text: 'The author of Text 2 disagrees with Text 1 by arguing that celestial cues, not the magnetic field, are the primary means by which birds navigate.',
        },
        {
          label: 'B',
          text: 'The author of Text 2 agrees with Text 1 that laboratory experiments are the most reliable way to study bird navigation.',
        },
        {
          label: 'C',
          text: 'The author of Text 2 extends Text 1\'s argument by providing additional evidence that Earth\'s magnetic field guides migratory birds.',
        },
        {
          label: 'D',
          text: 'The author of Text 2 raises doubts about whether migratory birds navigate at all.',
        },
      ],
      correctAnswer: 'A',
      explanation:
        'Text 1 argues for magnetic-field navigation, and Text 2 directly challenges this by presenting celestial cue evidence and saying the magnetic hypothesis "overlooks" key data. This is a clear disagreement about the primary mechanism — the relationship choice A describes.',
      wrongAnswerExplanations: {
        B: 'Text 2 actually criticizes laboratory experiments as insufficient, so the two authors do not agree on experimental methodology.',
        C: 'Text 2 does not extend or support Text 1; it argues against it by invoking an entirely different mechanism.',
        D: 'Both texts accept that birds do navigate; the debate is about how they do it, not whether navigation occurs.',
      },
    },
    {
      id: 'ctc-ex-2',
      stimulus:
        'Text 1: The printing press transformed European society in the fifteenth and sixteenth centuries by democratizing access to written knowledge. Before Gutenberg\'s invention, books were hand-copied by scribes and affordable only to the clergy and wealthy patrons. Mass production of texts made literacy a realistic goal for ordinary people and laid the groundwork for the Protestant Reformation, the Scientific Revolution, and modern democracy.\n\nText 2: While the printing press undeniably widened access to texts, historians should be cautious about treating it as a singular revolutionary force. The diffusion of printed books was slower than popular accounts suggest: literacy rates across most of Europe remained below thirty percent well into the seventeenth century, and printed works were initially far more affordable than manuscripts only in relative terms. The press was a powerful amplifier of change already underway, not the ignition point of a new civilization.',
      question:
        'Which choice best describes the relationship between the two texts?',
      steps: [
        {
          instruction: 'Summarize Text 1',
          content:
            'Text 1 claims the printing press was a transformative force that democratized knowledge and directly caused major historical movements.',
        },
        {
          instruction: 'Summarize Text 2',
          content:
            'Text 2 accepts that the press widened access to texts but argues historians overstate its revolutionary impact and that change was slower and more nuanced than the popular narrative suggests.',
        },
        {
          instruction: 'Identify the relationship',
          content:
            'Text 2 partially agrees — it accepts the press\'s importance — but qualifies Text 1\'s claim by arguing the press was an amplifier of existing change rather than a singular cause. This is a qualification, not a contradiction.',
        },
        {
          instruction: 'Match to the choices',
          content:
            'Look for an answer that captures partial agreement plus a significant caveat: Text 2 accepts the press mattered but disputes the degree of its transformative power.',
        },
      ],
      choices: [
        {
          label: 'A',
          text: 'The author of Text 2 argues that the printing press had no significant effect on European society, contradicting Text 1\'s central claim.',
        },
        {
          label: 'B',
          text: 'The author of Text 2 accepts that the printing press widened access to texts but cautions against overstating its role as an independent revolutionary force.',
        },
        {
          label: 'C',
          text: 'The author of Text 2 fully agrees with Text 1 and provides additional statistics to strengthen its argument.',
        },
        {
          label: 'D',
          text: 'The author of Text 2 focuses on a different historical period than Text 1 and therefore cannot be compared with it.',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'Text 2 opens with "While the printing press undeniably widened access to texts" — an explicit concession to Text 1 — then argues the press should be seen as an amplifier rather than a singular cause. This is qualification, not contradiction or full agreement, which B captures precisely.',
      wrongAnswerExplanations: {
        A: 'Text 2 says the press "undeniably widened access," so it does not claim the press had no significant effect.',
        C: 'Text 2 does not fully agree; it challenges the scale and nature of the press\'s impact.',
        D: 'Both texts discuss the same period — fifteenth through seventeenth century Europe — so the comparison is direct and meaningful.',
      },
    },
    {
      id: 'ctc-ex-3',
      stimulus:
        'Text 1: Urban green spaces — parks, tree-lined streets, community gardens — are not mere amenities; they are public health infrastructure. Studies consistently show that residents who live within a quarter mile of green space report lower rates of anxiety and depression. Access to nature within cities reduces cortisol levels, encourages physical activity, and fosters social connection among neighbors. Cities that invest in green space are, in effect, investing in the mental and physical health of their populations.\n\nText 2: The relationship between urban green space and resident wellbeing is more complicated than advocates acknowledge. Much of the existing research relies on self-reported health outcomes, which are subject to well-documented biases. Furthermore, wealthier neighborhoods tend to have both more green space and better baseline health — a correlation that makes it difficult to isolate the causal effect of parks and trees. Investment in green space may benefit residents, but the evidence for a direct causal link to health outcomes remains weaker than is often claimed.',
      question:
        'Based on the texts, how would the author of Text 2 most likely respond to the claim in Text 1 that cities investing in green space are "investing in the mental and physical health of their populations"?',
      steps: [
        {
          instruction: 'Identify the specific claim in Text 1',
          content:
            'Text 1\'s claim is that green space investment directly improves the mental and physical health of urban residents, treating the causal link as well-established.',
        },
        {
          instruction: 'Find the author of Text 2\'s position',
          content:
            'Text 2 questions whether the research proves causation, citing self-report bias and the confounding variable of wealth — wealthier neighborhoods have both more green space and better baseline health.',
        },
        {
          instruction: 'Predict the response',
          content:
            'The author of Text 2 would not deny that green space might benefit residents, but would argue that the causal claim is premature — the research does not yet isolate the effect of green space from the effect of neighborhood wealth.',
        },
        {
          instruction: 'Match to the choices',
          content:
            'The correct answer should capture the author of Text 2 accepting the possibility of benefit while rejecting the strength of the causal claim, particularly because of confounding variables.',
        },
      ],
      choices: [
        {
          label: 'A',
          text: 'The author of Text 2 would agree wholeheartedly, pointing to the cortisol studies as conclusive evidence.',
        },
        {
          label: 'B',
          text: 'The author of Text 2 would argue that the causal claim overstates what the current evidence actually supports, given confounding variables like neighborhood wealth.',
        },
        {
          label: 'C',
          text: 'The author of Text 2 would say that green space has no effect whatsoever on public health.',
        },
        {
          label: 'D',
          text: 'The author of Text 2 would suggest that only wealthier cities should invest in green space.',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'Text 2 explicitly says "the evidence for a direct causal link to health outcomes remains weaker than is often claimed" and identifies confounding variables — particularly that wealthier neighborhoods have both more green space and better health. The author would challenge the causal framing of Text 1\'s conclusion, which B accurately captures.',
      wrongAnswerExplanations: {
        A: 'Text 2 challenges the evidence, including self-report studies; it does not endorse the cortisol findings as conclusive.',
        C: 'Text 2 says green space "may benefit residents" — it does not claim the effect is zero.',
        D: 'Text 2 never makes a prescriptive claim about which cities should invest in green space; it only questions the strength of the causal evidence.',
      },
    },
    {
      id: 'ctc-ex-4',
      stimulus:
        'Text 1: The rapid expansion of e-commerce has fundamentally altered consumer behavior by making price comparison nearly effortless. When shoppers can instantly compare prices across dozens of retailers with a single search, sellers face relentless downward pressure on prices. This competitive transparency benefits consumers but squeezes profit margins across the retail industry.\n\nText 2: The widespread adoption of streaming music platforms has similarly restructured the economics of the music industry. When millions of individual tracks became instantly accessible and searchable at a flat monthly fee, the value consumers placed on owning individual albums collapsed. Artists and labels now compete in an attention economy where discoverability, not exclusivity, drives revenue.',
      question:
        'Which of the following best describes an assumption shared by both texts?',
      steps: [
        {
          instruction: 'Summarize each text\'s argument',
          content:
            'Text 1: Digital search and comparison tools have transformed retail economics by enabling price transparency. Text 2: Digital streaming has transformed music economics by collapsing the value of ownership.',
        },
        {
          instruction: 'Identify what both arguments take for granted',
          content:
            'Both texts assume that when consumers gain effortless access to a large range of options — whether products or songs — this fundamentally reshapes the economics of the relevant industry. Neither text questions this premise; both build on it.',
        },
        {
          instruction: 'Look for a shared underlying premise',
          content:
            'The shared assumption is that consumer access to abundant, easily searchable options changes the economic rules of the industry supplying those options.',
        },
        {
          instruction: 'Match to the choices',
          content:
            'The correct answer will articulate this shared structural premise — that easy digital access transforms industry economics — without attributing a claim to only one text.',
        },
      ],
      choices: [
        {
          label: 'A',
          text: 'Both texts assume that digital technology, by giving consumers easy access to many options, reshapes the economics of the industry providing those options.',
        },
        {
          label: 'B',
          text: 'Both texts assume that lower prices always benefit society as a whole.',
        },
        {
          label: 'C',
          text: 'Both texts assume that artists and retailers share the same economic interests.',
        },
        {
          label: 'D',
          text: 'Both texts assume that consumers prefer digital access to physical ownership in every domain.',
        },
      ],
      correctAnswer: 'A',
      explanation:
        'Text 1 assumes that easy price comparison changes retail economics; Text 2 assumes that easy streaming access changes music economics. The underlying shared assumption is that consumer access to abundant digital options fundamentally restructures an industry\'s economics — the premise both arguments build upon.',
      wrongAnswerExplanations: {
        B: 'Text 1 notes that lower prices "squeeze profit margins" — an effect on sellers, not necessarily a societal benefit. Neither text claims lower prices are always good for society.',
        C: 'Text 1 focuses on retailers; Text 2 on artists and labels. Neither text implies they share interests.',
        D: 'Text 2 discusses the collapse of album ownership in music, but neither text makes a broad claim that consumers prefer digital access in every possible domain.',
      },
    },
    {
      id: 'ctc-ex-5',
      stimulus:
        'Text 1: The great coral bleaching events of recent decades have demonstrated that reef ecosystems are far more sensitive to temperature change than biologists once believed. Even a sustained warming of one to two degrees Celsius above the seasonal average is sufficient to trigger mass bleaching, during which corals expel the symbiotic algae that give them color and energy. The scale of these events suggests that coral reefs, as they currently exist, may not survive the projected warming of the coming century.\n\nText 2: Long-term monitoring of reef systems around the world has revealed a sobering pattern: reefs that suffered major bleaching events in the 1990s have shown limited recovery in the decades since. While some individual coral colonies have regrown, the structural complexity and biodiversity of affected reefs remain significantly reduced. The data lead to the same conclusion that temperature projections suggest — that unmitigated warming poses an existential threat to reef ecosystems.',
      question:
        'Which choice best describes the relationship between the two texts?',
      steps: [
        {
          instruction: 'Summarize each text\'s conclusion',
          content:
            'Text 1: Reef ecosystems are highly temperature-sensitive, and projected warming may prevent their survival. Text 2: Long-term monitoring data show reefs do not recover fully after bleaching events, and unmitigated warming threatens their existence.',
        },
        {
          instruction: 'Compare the conclusions',
          content:
            'Both texts reach the same conclusion — that warming poses an existential threat to coral reefs — but through different types of evidence. Text 1 focuses on the mechanism and scale of bleaching events; Text 2 focuses on long-term recovery data.',
        },
        {
          instruction: 'Identify the relationship type',
          content:
            'This is agreement with different evidence. The authors arrive at the same destination via different routes: one through physiological sensitivity data, one through recovery monitoring.',
        },
        {
          instruction: 'Match to the choices',
          content:
            'The correct answer will capture that both authors agree on the conclusion but draw on different evidence or approach the question from different angles.',
        },
      ],
      choices: [
        {
          label: 'A',
          text: 'The two texts agree that warming poses a serious threat to coral reefs, though they reach this conclusion through different types of evidence.',
        },
        {
          label: 'B',
          text: 'The author of Text 2 disputes Text 1\'s claim that temperature change triggers bleaching.',
        },
        {
          label: 'C',
          text: 'Text 1 argues that reefs will recover, while Text 2 argues they will not.',
        },
        {
          label: 'D',
          text: 'The two texts are about entirely different topics and cannot be meaningfully compared.',
        },
      ],
      correctAnswer: 'A',
      explanation:
        'Both texts conclude that unmitigated warming threatens reef survival. Text 1 uses temperature-sensitivity and bleaching-mechanism evidence; Text 2 uses long-term recovery monitoring data. The relationship is agreement through different evidence — exactly what A describes.',
      wrongAnswerExplanations: {
        B: 'Text 2 never disputes the bleaching mechanism; it accepts that bleaching occurs and focuses on the aftermath and recovery data.',
        C: 'Neither text argues that reefs will recover. Text 1 suggests reefs may not survive; Text 2 shows recovery is limited. Both texts are pessimistic about recovery.',
        D: 'Both texts are directly about the same topic — coral reef vulnerability to warming — and Text 2 even explicitly echoes Text 1\'s conclusion.',
      },
    },
  ],
  drillQuestions: [
    {
      id: 'ctc-d-001',
      skillSlug: 'cross-text-connections',
      difficulty: 'easy',
      stimulus:
        'Text 1: Regular aerobic exercise meaningfully reduces resting heart rate over time. As the heart becomes more efficient, it pumps more blood per beat and therefore needs to beat less often to circulate the same volume. Trained endurance athletes frequently have resting heart rates well below the population average.\n\nText 2: Consistent physical activity also strengthens the heart muscle itself, not just its pumping rhythm. Research shows that people who exercise regularly develop a larger left ventricular chamber, allowing the heart to eject more blood per contraction. This structural adaptation is a key reason that active individuals tend to have lower resting heart rates than their sedentary peers.',
      question: 'Which choice best describes the relationship between the two texts?',
      choices: [
        {
          label: 'A',
          text: 'Both texts agree that regular exercise leads to lower resting heart rates, though they emphasize different physiological mechanisms.',
        },
        {
          label: 'B',
          text: 'Text 2 contradicts Text 1 by arguing that structural heart changes, not pumping efficiency, determine heart rate.',
        },
        {
          label: 'C',
          text: 'Text 1 claims exercise is harmful to the heart, while Text 2 claims it is beneficial.',
        },
        {
          label: 'D',
          text: 'The two texts discuss unrelated topics and cannot be compared.',
        },
      ],
      correctAnswer: 'A',
      explanation:
        'Both texts conclude that regular exercise lowers resting heart rate. Text 1 emphasizes pumping efficiency; Text 2 emphasizes structural growth of the left ventricle. They agree on the outcome but highlight different mechanisms.',
      wrongAnswerExplanations: {
        B: 'Text 2 does not contradict Text 1; it offers a complementary structural explanation for the same outcome both texts describe.',
        C: 'Both texts present exercise as beneficial to heart health; neither suggests it is harmful.',
        D: 'Both texts address the same topic — the cardiovascular effects of regular exercise — so they are directly comparable.',
      },
      teachingPoint:
        'When two texts reach the same conclusion through different evidence or mechanisms, the relationship is agreement with different emphasis, not contradiction.',
    },
    {
      id: 'ctc-d-002',
      skillSlug: 'cross-text-connections',
      difficulty: 'easy',
      stimulus:
        'Text 1: The construction of the transcontinental railroad in the 1860s was one of the most transformative engineering achievements in American history. By connecting the Pacific and Atlantic coasts with a continuous rail line, it compressed a journey of several months into one of several days, fundamentally reshaping commerce, migration, and national identity.\n\nText 2: The railroad that bound the continent also fractured the communities in its path. Indigenous nations whose territories were bisected by the rail lines lost not only land but access to bison herds that migrated across the new corridor. What engineers celebrated as progress, many communities experienced as dispossession.',
      question: 'Which choice best describes the relationship between the two texts?',
      choices: [
        {
          label: 'A',
          text: 'Text 2 agrees with Text 1 that the railroad was a straightforward triumph for all Americans.',
        },
        {
          label: 'B',
          text: 'Text 2 qualifies Text 1 by showing that the railroad\'s impact was not uniformly positive — it brought dispossession to Indigenous communities even as it reshaped commerce and migration.',
        },
        {
          label: 'C',
          text: 'Text 2 argues that the transcontinental railroad was never actually built.',
        },
        {
          label: 'D',
          text: 'Text 1 focuses on economics, while Text 2 focuses on engineering, making their claims incompatible.',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'Text 1 frames the railroad as a transformative national achievement. Text 2 accepts that it transformed the nation but adds a crucial caveat — it brought severe harm to Indigenous communities. This is a qualification: Text 2 broadens the picture without denying that the railroad reshaped the country.',
      wrongAnswerExplanations: {
        A: 'Text 2 explicitly challenges the "straightforward triumph" framing by describing dispossession and loss.',
        C: 'Neither text questions the railroad\'s historical existence; Text 2 accepts it and discusses its consequences.',
        D: 'Both texts address the railroad\'s historical significance; they are directly comparable on that question.',
      },
      teachingPoint:
        'A qualification accepts the basic premise of another text while adding nuance or a counterexample. Text 2 does not deny the railroad\'s transformative power — it complicates the narrative.',
    },
    {
      id: 'ctc-d-003',
      skillSlug: 'cross-text-connections',
      difficulty: 'easy',
      stimulus:
        'Text 1: Many urban schools have shifted away from cursive writing instruction in recent years, reasoning that keyboard skills are more practically valuable in a digital age. Standardized testing and college-level work rely overwhelmingly on typed output, and time devoted to cursive is time taken away from subjects with clearer returns.\n\nText 2: Research on handwriting suggests that the benefits of cursive extend beyond penmanship itself. Students who write notes by hand — including in cursive — demonstrate better retention of information than those who type the same material. The distinctive letter forms of cursive also support the development of fine motor skills and may aid reading fluency in young learners.',
      question: 'Which choice best describes the relationship between the two texts?',
      choices: [
        {
          label: 'A',
          text: 'Both texts agree that cursive writing should be eliminated from school curricula.',
        },
        {
          label: 'B',
          text: 'Text 1 argues for removing cursive from schools on practical grounds, while Text 2 counters by presenting cognitive and developmental benefits of handwriting.',
        },
        {
          label: 'C',
          text: 'Text 2 argues that typing is superior to cursive in all respects.',
        },
        {
          label: 'D',
          text: 'The two texts are discussing different age groups and cannot be meaningfully compared.',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'Text 1 makes a practical argument for prioritizing keyboard skills over cursive. Text 2 responds with cognitive research showing that handwriting — including cursive — aids retention and development. This is a direct disagreement about whether cursive deserves to stay in the curriculum.',
      wrongAnswerExplanations: {
        A: 'Only Text 1 supports removing cursive; Text 2 presents reasons to keep it.',
        C: 'Text 2 argues for the benefits of handwriting, which is the opposite of saying typing is superior in all respects.',
        D: 'Both texts address the value of cursive instruction in schools generally; they are directly comparable.',
      },
      teachingPoint:
        'When one text argues for a practical position and another presents evidence for a competing benefit, the relationship is disagreement — even if neither text explicitly names the other.',
    },
    {
      id: 'ctc-d-004',
      skillSlug: 'cross-text-connections',
      difficulty: 'medium',
      stimulus:
        'Text 1: The practice of paying agricultural workers by the pound of crop harvested rather than by the hour creates a powerful incentive structure that maximizes productivity. Workers who pick more earn more, aligning individual effort directly with output. Economists who study piece-rate labor systems consistently find that output per worker-hour is higher under piece-rate arrangements than under fixed hourly wages.\n\nText 2: Piece-rate pay in agriculture achieves its productivity gains at a significant cost. Because workers are compensated for volume, they face financial pressure to work through pain, fatigue, and illness rather than slow down or stop. Studies of farmworkers on piece-rate contracts report higher rates of musculoskeletal injury and heat-related illness than those paid hourly. The productivity premium associated with piece rates must be weighed against these measurable health outcomes.',
      question:
        'Based on the texts, how would the author of Text 2 most likely respond to the argument made in Text 1?',
      choices: [
        {
          label: 'A',
          text: 'The author of Text 2 would agree that piece-rate pay maximizes productivity and argue that it should be adopted more widely.',
        },
        {
          label: 'B',
          text: 'The author of Text 2 would accept that piece-rate systems increase output but argue that the productivity gains must be evaluated alongside the health costs imposed on workers.',
        },
        {
          label: 'C',
          text: 'The author of Text 2 would deny that piece-rate pay increases productivity at all.',
        },
        {
          label: 'D',
          text: 'The author of Text 2 would argue that economists are unqualified to study agricultural labor.',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'Text 2 does not deny that piece-rate pay raises productivity — it says these systems achieve "productivity gains." What Text 2 disputes is whether productivity is the only relevant consideration, arguing that higher injury and illness rates must also be counted. The author of Text 2 would accept Text 1\'s productivity claim while insisting the full picture includes health costs.',
      wrongAnswerExplanations: {
        A: 'Text 2 criticizes piece-rate systems for their health costs; it does not recommend wider adoption.',
        C: 'Text 2 explicitly acknowledges "productivity gains" from piece-rate pay, so it does not deny the productivity effect.',
        D: 'Text 2 makes no claim about economists\' qualifications; it engages directly with the economic argument.',
      },
      teachingPoint:
        'When Text 2 accepts a claim from Text 1 but adds an important consideration the first text omits, the relationship is concession-plus-complication, not flat contradiction.',
    },
    {
      id: 'ctc-d-005',
      skillSlug: 'cross-text-connections',
      difficulty: 'medium',
      stimulus:
        'Text 1: The novels of the nineteenth century\'s realist tradition were characterized by an almost documentary attention to social detail. Writers of that era believed that fiction should hold a mirror to the conditions of ordinary life — depicting cramped tenements, factory floors, and overcrowded schools with the same fidelity that a journalist might bring to a newspaper account. The goal was to make readers uncomfortable enough to demand change.\n\nText 2: It is a mistake to conflate realist fiction\'s methods with its goals. The detailed social observation in realist novels was a means, not an end. The most celebrated realist writers were ultimately concerned with interiority — with depicting the inner lives of characters shaped by their social conditions, not with producing a sociological catalog. The documentary surface served a psychological depth.',
      question: 'Which choice best describes the relationship between the two texts?',
      choices: [
        {
          label: 'A',
          text: 'The author of Text 2 agrees that realist novels were primarily journalistic in purpose and method.',
        },
        {
          label: 'B',
          text: 'The author of Text 2 argues that realist novels did not contain social detail, contradicting Text 1.',
        },
        {
          label: 'C',
          text: 'The author of Text 2 accepts that realist fiction featured detailed social observation but disputes Text 1\'s characterization of its ultimate purpose, arguing the goal was psychological depth rather than social reform.',
        },
        {
          label: 'D',
          text: 'Both texts agree that realist novels were concerned primarily with characters\' inner lives.',
        },
      ],
      correctAnswer: 'C',
      explanation:
        'Text 2 opens by warning against conflating methods with goals — it accepts the documentary detail ("The detailed social observation in realist novels was a means") but argues the ultimate purpose was psychological portraiture, not social reform. This is a qualification of Text 1\'s claim about purpose, not a denial of the social detail.',
      wrongAnswerExplanations: {
        A: 'Text 2 explicitly argues against treating realist fiction as primarily journalistic in purpose.',
        B: 'Text 2 acknowledges detailed social observation; it disputes its purpose, not its presence.',
        D: 'Text 1 says the goal was to make readers demand social change, not to depict inner lives. Only Text 2 emphasizes interiority.',
      },
      teachingPoint:
        'Pay attention to what each text accepts versus what it contests. Text 2 concedes the "what" (social detail) while disputing the "why" (the purpose) — a partial agreement and qualification.',
    },
    {
      id: 'ctc-d-006',
      skillSlug: 'cross-text-connections',
      difficulty: 'medium',
      stimulus:
        'Text 1: Behavioral economists have shown that people systematically underestimate the time required to complete projects — a tendency called the planning fallacy. Even when individuals are asked to consider past projects that took longer than expected, they tend to predict optimistic timelines for new, similar tasks. The planning fallacy appears to be remarkably resistant to experience and awareness.\n\nText 2: Organizations, however, have demonstrated more success than individuals in correcting for the planning fallacy. When project timelines are set by committees that aggregate estimates from multiple sources, and when historical data about past project durations are formally incorporated into the planning process, predicted timelines move significantly closer to actual completion times. Institutional structures can compensate for what individual cognition cannot self-correct.',
      question: 'Which choice best describes the relationship between the two texts?',
      choices: [
        {
          label: 'A',
          text: 'Text 2 contradicts Text 1 by arguing that people do not actually underestimate project timelines.',
        },
        {
          label: 'B',
          text: 'Text 2 accepts the existence of the planning fallacy described in Text 1 but introduces organizational structures as a potential corrective that individuals alone cannot achieve.',
        },
        {
          label: 'C',
          text: 'Both texts agree that the planning fallacy is impossible to correct under any circumstances.',
        },
        {
          label: 'D',
          text: 'Text 1 focuses on organizations, while Text 2 focuses on individuals, making them incompatible.',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'Text 1 establishes that individuals are subject to the planning fallacy and that awareness does not fix it. Text 2 accepts this claim about individuals ("what individual cognition cannot self-correct") and then presents a different solution: institutional structures that aggregate estimates and use historical data. The relationship is acceptance of Text 1\'s finding plus a new variable that changes the outcome.',
      wrongAnswerExplanations: {
        A: 'Text 2 never challenges the existence of the planning fallacy; it explicitly assumes it exists when it describes "what individual cognition cannot self-correct."',
        C: 'Text 2 specifically argues that organizational methods can correct the fallacy, so both texts do not agree it is impossible to fix.',
        D: 'It is the reverse: Text 1 focuses on individuals and Text 2 on organizations — but this difference is exactly what makes comparison productive, not incompatible.',
      },
      teachingPoint:
        'Text 2 does not deny Text 1\'s finding; it accepts it and then introduces a condition under which the outcome changes. This is extension or complication, not contradiction.',
    },
    {
      id: 'ctc-d-007',
      skillSlug: 'cross-text-connections',
      difficulty: 'medium',
      stimulus:
        'Text 1: The introduction of invasive species into new ecosystems is one of the most serious drivers of biodiversity loss worldwide. When a species arrives in an environment with no natural predators or competitors, its population can expand unchecked, outcompeting native organisms for food and habitat. Island ecosystems, with their higher proportion of endemic species, are especially vulnerable to such introductions.\n\nText 2: Not all non-native species introductions produce ecological harm. Research tracking introduced plant species across dozens of habitats found that the majority coexist with native species without triggering cascading declines in biodiversity. Scientists increasingly distinguish between naturalized species — those that establish self-sustaining populations without obvious harm — and true invaders that disrupt ecosystem function. The blanket equation of "non-native" with "harmful" obscures this important distinction.',
      question:
        'Based on the texts, how would the author of Text 2 most likely respond to the claim in Text 1 that introduced species cause biodiversity loss?',
      choices: [
        {
          label: 'A',
          text: 'The author of Text 2 would agree that all introduced species are harmful and that islands are especially vulnerable.',
        },
        {
          label: 'B',
          text: 'The author of Text 2 would argue that introduced species never cause biodiversity loss.',
        },
        {
          label: 'C',
          text: 'The author of Text 2 would contend that Text 1\'s concern about invasive species is valid but that it applies only to a subset of introduced species, not to all non-native arrivals.',
        },
        {
          label: 'D',
          text: 'The author of Text 2 would argue that island ecosystems are not particularly vulnerable to introduced species.',
        },
      ],
      correctAnswer: 'C',
      explanation:
        'Text 2 does not deny that some introduced species cause harm — it distinguishes between "true invaders that disrupt ecosystem function" (a real concern) and naturalized species that coexist without harm. The author of Text 2 would say Text 1\'s worry is real but overly broad: it applies to genuine invaders, not to non-native species as a category.',
      wrongAnswerExplanations: {
        A: 'Text 2 argues that not all introduced species are harmful — the opposite of agreeing they all are.',
        B: 'Text 2 acknowledges the existence of "true invaders that disrupt ecosystem function," so it does not claim harm never occurs.',
        D: 'Text 2 does not address island ecosystems specifically; this claim goes beyond what Text 2 says.',
      },
      teachingPoint:
        'The author of Text 2 would qualify, not flatly contradict, Text 1. The key is that Text 2 accepts some introduced species are harmful — it just argues the category of "harmful" is narrower than Text 1 implies.',
    },
    {
      id: 'ctc-d-008',
      skillSlug: 'cross-text-connections',
      difficulty: 'hard',
      stimulus:
        'Text 1: The emergence of photography in the nineteenth century did not displace painting as an art form — it liberated it. Once the burden of documentary representation could be assigned to the camera, painters were free to pursue abstraction, subjective expression, and formal experimentation. Impressionism, Expressionism, and Cubism are all, in a meaningful sense, post-photographic movements that could not have arisen without the lens relieving the brush of its mimetic obligations.\n\nText 2: The claim that photography liberated painting by assuming its representational duties mistakes correlation for causation and imports a tidy teleology into art history. Many of the stylistic shifts associated with post-photographic painting were underway before photography became widely available, and similar formal experiments were pursued in cultures with little exposure to photography. The explanation for painting\'s evolution must be sought in the internal logic of art-historical development and in broader cultural currents, not in the arrival of a competing medium.',
      question: 'Which choice best describes the relationship between the two texts?',
      choices: [
        {
          label: 'A',
          text: 'Both texts agree that photography caused Impressionism, Expressionism, and Cubism to emerge.',
        },
        {
          label: 'B',
          text: 'The author of Text 2 accepts that photography and modern painting developed simultaneously but argues that this temporal correlation does not establish that photography caused painting\'s evolution.',
        },
        {
          label: 'C',
          text: 'Text 2 argues that painting never underwent any stylistic change after the invention of photography.',
        },
        {
          label: 'D',
          text: 'The author of Text 2 agrees with Text 1 that photography liberated painting but disputes which specific movements resulted.',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'Text 1 makes a causal argument: photography caused painting\'s liberation and enabled abstraction. Text 2 challenges the causal claim specifically, arguing the "correlation" between photography and stylistic change is mistaken for causation, and that similar experiments appeared in cultures without significant photographic influence. Text 2 does not deny the developments in painting — it denies the causal story Text 1 tells about them.',
      wrongAnswerExplanations: {
        A: 'Only Text 1 makes the causal claim. Text 2 explicitly disputes it by calling it mistaken correlation-for-causation reasoning.',
        C: 'Text 2 accepts that painting underwent stylistic change — it disputes the cause of that change, not the change itself.',
        D: 'Text 2 rejects the central claim that photography "liberated" painting; it does not accept that framing and then quibble with details.',
      },
      teachingPoint:
        'The hardest cross-text questions involve texts that agree on facts but disagree on the interpretation of those facts. Text 2 accepts the timeline but rejects the causal explanation — a subtle but important distinction.',
    },
    {
      id: 'ctc-d-009',
      skillSlug: 'cross-text-connections',
      difficulty: 'hard',
      stimulus:
        'Text 1: Democratic institutions derive their legitimacy from the ongoing consent of the governed, which is best measured through regular, free, and competitive elections. When citizens can choose among genuinely different candidates and remove incumbents from power, the government\'s authority rests on a continuously renewed popular mandate. The procedural regularity of elections is therefore not a bureaucratic formality but the mechanism by which democratic legitimacy is created and sustained.\n\nText 2: Reducing democratic legitimacy to electoral procedure misses much of what makes governance genuinely accountable. Competitive elections can coexist with gerrymandered districts, voter suppression, and campaign finance systems that amplify wealthy voices. A government produced by technically valid elections may nonetheless fail to represent the population equitably. True democratic legitimacy requires not only competitive elections but also the substantive conditions — equal access, representative outcomes, protection of minority rights — that give electoral results meaning.',
      question:
        'Based on the texts, which choice best describes the point of disagreement between the two authors?',
      choices: [
        {
          label: 'A',
          text: 'Whether elections should be held regularly',
        },
        {
          label: 'B',
          text: 'Whether competitive elections are sufficient on their own to establish democratic legitimacy, or whether additional substantive conditions are also required',
        },
        {
          label: 'C',
          text: 'Whether gerrymandering and voter suppression are serious problems',
        },
        {
          label: 'D',
          text: 'Whether governments require any form of public consent to be legitimate',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'Text 1 argues that the procedural regularity of competitive elections is the mechanism that creates democratic legitimacy. Text 2 accepts that elections matter but argues they are insufficient on their own — substantive conditions like equal access and representative outcomes are also required. The precise point of disagreement is whether elections alone are enough, or whether additional conditions are necessary.',
      wrongAnswerExplanations: {
        A: 'Neither author disputes whether elections should be held regularly; both accept elections as part of democracy.',
        C: 'Text 2 mentions gerrymandering and voter suppression as examples, but that is not the core disagreement — it is using those examples to argue that elections alone are insufficient.',
        D: 'Both texts agree that some form of public consent or mandate is necessary; neither argues for government without public legitimacy.',
      },
      teachingPoint:
        'For "point of disagreement" questions, find the exact claim one text makes that the other text denies or qualifies. Text 1\'s claim: elections suffice. Text 2\'s response: elections are necessary but not sufficient. That is the precise hinge.',
    },
    {
      id: 'ctc-d-010',
      skillSlug: 'cross-text-connections',
      difficulty: 'hard',
      stimulus:
        'Text 1: The cultural dominance of any given artistic style is rarely the product of aesthetic merit alone. Styles rise to prominence when they align with the economic interests and social aspirations of the patrons who fund them. The ornate grandeur of Baroque architecture, for instance, reflected the desire of Catholic institutions and absolute monarchs to project authority and majesty. Understanding who paid for a work of art is often more illuminating than analyzing its formal properties.\n\nText 2: Patronage shapes which art gets made, but it does not fully determine the meanings that art generates or the aesthetic innovations it introduces. Artists working within patronage systems routinely smuggled personal, subversive, or experimental content into commissioned works. The same Baroque churches that projected institutional power also became laboratories for optical illusionism, new approaches to spatial perspective, and devotional experiences that exceeded their patrons\' intentions. The funded work escapes its funding context.',
      question:
        'Based on the texts, how would the author of Text 2 most likely respond to the claim in Text 1 that understanding who paid for a work of art is "more illuminating than analyzing its formal properties"?',
      choices: [
        {
          label: 'A',
          text: 'The author of Text 2 would fully agree, arguing that patronage is the most important factor in understanding any artwork.',
        },
        {
          label: 'B',
          text: 'The author of Text 2 would argue that patronage context and formal analysis are both necessary, since funded works can exceed their patrons\' intentions through artistic innovation that formal analysis alone reveals.',
        },
        {
          label: 'C',
          text: 'The author of Text 2 would argue that patronage has no influence whatsoever on artistic production.',
        },
        {
          label: 'D',
          text: 'The author of Text 2 would agree that Baroque churches were purely expressions of institutional power.',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'Text 2 accepts that patronage "shapes which art gets made" — conceding Text 1\'s point — but then argues the funded work "escapes its funding context" through artistic innovation. Using Baroque churches as an example, Text 2 shows that formal properties (spatial perspective, optical illusionism) introduced content that exceeded patrons\' intentions. The author would therefore push back on Text 1\'s claim that patronage analysis is more illuminating, arguing both lenses are needed.',
      wrongAnswerExplanations: {
        A: 'Text 2 explicitly argues against treating patronage as the primary or sufficient lens — it argues the work escapes its funding context.',
        C: 'Text 2 opens by accepting that "patronage shapes which art gets made," so it does not claim patronage has no influence.',
        D: 'Text 2 argues that Baroque churches also became "laboratories for optical illusionism" and devotional experiences that exceeded institutional aims — the opposite of purely expressing institutional power.',
      },
      teachingPoint:
        'In "how would the author respond" questions, look for what the second text accepts before what it contests. Text 2 accepts patronage matters, then argues formal analysis also matters — so the response is "both, not just one."',
    },
  ],
}
