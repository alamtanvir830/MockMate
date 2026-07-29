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
    {
      title: `The partial-reading trap`,
      description: `A student reads only the opening sentence or two of each text, or skips to the final sentence looking for a keyword match, and misses a qualification, concession, or key detail that appears in the middle. The relationship identified reflects only part of what the texts actually say.`,
      avoidance: `Read each text completely before characterizing the relationship. Qualifications, concessive clauses, and the most precise evidence often appear mid-passage. If your summary of a text can be challenged by a detail you glossed over, your relationship label will be off.`,
      miniExample: `Text 1 opens by praising urban green space, then mid-passage notes that access is unequal across neighborhoods. A student who stops reading after the opening praise will miss the caveat and may choose "full agreement" when Text 2 focuses on the inequality concern.`,
    },
    {
      title: `The tone-versus-claim trap`,
      description: `A student mistakes the author's tone or attitude for the author's actual argument. An author can write skeptically about a theory while ultimately accepting it, or write enthusiastically while only partially endorsing it. Answers built on tone rather than claim will misname the relationship.`,
      avoidance: `Ask what the author concludes, not how they sound. A cautious or hedged tone does not necessarily mean the author disagrees; an enthusiastic tone does not guarantee full agreement. Identify the explicit claim or conclusion before characterizing the relationship.`,
      miniExample: `Text 2's author writes with clear skepticism about a study's methodology but ultimately concludes the study's findings are "broadly consistent" with prior research. A student reading the skeptical tone may choose "disagreement" when the actual conclusion is qualified agreement.`,
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
    {
      id: 'ctc-ex-6',
      subskill: 'How One Text Responds to Another',
      level: 'sat-application',
      stimulus: `Text 1: Early twentieth-century urban planners embraced the "garden city" model, designing self-contained communities surrounded by green belts that would prevent the sprawl and overcrowding associated with industrial cities. Ebenezer Howard, the model's chief advocate, argued that planned decentralization — rather than reform of existing city centers — was the only lasting solution to urban poverty and congestion.\n\nText 2: Subsequent decades revealed the limits of the garden city ideal. New towns built on Howard's principles attracted primarily middle-class residents, leaving the working-class populations that planners sought to help concentrated in the unreformed city centers. Scholars now recognize that the model responded to real problems but miscalculated which populations would actually benefit from planned decentralization.`,
      question: `Based on the texts, how does Text 2 respond to the argument made in Text 1?`,
      steps: [
        {
          instruction: `Read each text for its main claim`,
          content: `Text 1 presents Howard's garden city model as a viable solution to urban poverty and congestion through planned decentralization. Text 2 evaluates what actually happened when the model was implemented.`,
        },
        {
          instruction: `Identify the point of contact between the texts`,
          content: `Both texts engage with the garden city model's purpose of addressing urban problems. Text 1 presents the theory; Text 2 examines the practice and its unintended consequences.`,
        },
        {
          instruction: `Characterize the relationship precisely`,
          content: `Text 2 neither fully rejects nor fully endorses Text 1. It accepts that the model "responded to real problems" but argues it "miscalculated" who would benefit — a qualification or partial critique, not a wholesale dismissal.`,
        },
        {
          instruction: `Select the answer that names the relationship correctly`,
          content: `The correct answer should show Text 2 accepting the model's intention while criticizing its real-world outcome, especially that it failed to reach its intended working-class beneficiaries.`,
        },
      ],
      choices: [
        {
          label: 'A',
          text: `Text 2 endorses the garden city model and argues it should be revived for modern cities.`,
        },
        {
          label: 'B',
          text: `Text 2 accepts that the garden city model addressed genuine urban problems but argues it failed to benefit the working-class populations it was meant to help.`,
        },
        {
          label: 'C',
          text: `Text 2 agrees with Text 1 that planned decentralization is the only lasting solution to urban poverty.`,
        },
        {
          label: 'D',
          text: `Text 2 argues that Ebenezer Howard never intended the garden city model to help working-class residents.`,
        },
      ],
      correctAnswer: 'B',
      explanation: `Text 2 explicitly states the model "responded to real problems" — a concession to Text 1 — but then argues it "miscalculated which populations would actually benefit," since new towns attracted middle-class rather than working-class residents. This is a qualification: Text 2 accepts the model's aims while challenging its real-world impact.`,
      wrongAnswerExplanations: {
        A: `Text 2 treats the garden city model as historically flawed, not as a template to revive. It describes limitations, not endorsements.`,
        C: `Text 2 does not affirm Howard's prescription; it shows the prescription failed in practice. Agreeing that decentralization is the "only" solution contradicts Text 2's critical stance.`,
        D: `Text 2 never claims Howard's intentions excluded working-class residents — it says the model's real-world outcome failed them, not that Howard designed it that way.`,
      },
      coachTakeaway: `When Text 2 uses concessive language like "responded to real problems but miscalculated," it is signaling a qualification, not a flat agreement or disagreement. Train yourself to spot this pattern — it is one of the most common relationship types on the SAT.`,
    },
    {
      id: 'ctc-ex-7',
      subskill: 'Comparison of Methods',
      level: 'sat-application',
      stimulus: `Text 1: To study how ancient Polynesian navigators crossed the Pacific, researcher Ben Finney led the construction of Hokule'a, a replica double-hulled canoe built using traditional techniques. By sailing the vessel from Hawaii to Tahiti without modern instruments, Finney's team demonstrated that indigenous wayfinding methods — reading stars, swells, and wind — were sufficient for long-distance ocean voyages. Experimental replication, he argued, is the most direct test of historical feasibility.\n\nText 2: Archaeologist Anne Di Piazza approached the same question through computational modeling. Using thousands of simulated voyages derived from historical wind and current data, Di Piazza's team calculated the probability that canoes following various routes could have successfully reached different island groups. The simulations pointed to several viable corridors of settlement and generated predictions about the sequence of island colonization that closely matched the archaeological record.`,
      question: `Which choice best describes the relationship between the two texts?`,
      steps: [
        {
          instruction: `Read each text for its main claim`,
          content: `Text 1 describes Finney's hands-on experimental replication as the method for testing Polynesian navigation feasibility. Text 2 describes Di Piazza's computational simulation approach to the same historical question.`,
        },
        {
          instruction: `Identify the point of contact between the texts`,
          content: `Both texts investigate how ancient Polynesian navigators crossed the Pacific, but they use fundamentally different methodologies: physical replication versus computer simulation.`,
        },
        {
          instruction: `Characterize the relationship precisely`,
          content: `The texts do not disagree on conclusions — both support the feasibility of Polynesian long-distance navigation. They differ in method: one relies on experiential replication, the other on probabilistic modeling. This is a comparison of methods, not a dispute.`,
        },
        {
          instruction: `Select the answer that names the relationship correctly`,
          content: `The correct answer should acknowledge that both texts address the same topic and reach compatible conclusions while emphasizing that they use different investigative approaches.`,
        },
      ],
      choices: [
        {
          label: 'A',
          text: `The two texts reach opposing conclusions about whether Polynesian navigators could successfully cross the Pacific.`,
        },
        {
          label: 'B',
          text: `Text 2 criticizes Finney's experimental method as unreliable and proposes computational modeling as a superior replacement.`,
        },
        {
          label: 'C',
          text: `Both texts investigate the feasibility of Polynesian navigation but use different methods — physical replication in Text 1 and computational simulation in Text 2.`,
        },
        {
          label: 'D',
          text: `Text 1 focuses on modern navigation technology, while Text 2 focuses on ancient wayfinding traditions.`,
        },
      ],
      correctAnswer: 'C',
      explanation: `Both texts study the same historical question — how Polynesian navigators crossed the Pacific — and both support the feasibility of those voyages. The distinction is methodological: Finney's team used hands-on experimental replication of the voyage itself, while Di Piazza's team used computational modeling of thousands of simulated voyages. Neither text disputes the other's conclusions; they use complementary approaches to the same question.`,
      wrongAnswerExplanations: {
        A: `Neither text argues that Polynesian navigation was impossible. Both studies provide evidence that long-distance voyaging was feasible.`,
        B: `Text 2 does not mention Finney or criticize experimental replication. It simply describes a different methodology applied to the same research question.`,
        D: `This reverses the focus of each text. Text 1 describes traditional indigenous methods (stars, swells, wind), while Text 2 uses modern computational tools to reconstruct ancient routes.`,
      },
      coachTakeaway: `"Comparison of Methods" questions test whether you can distinguish how two authors investigate a topic from what they conclude. When two texts study the same subject but neither disputes the other, look for a methodological contrast rather than an agreement-versus-disagreement framing.`,
    },
    {
      id: 'ctc-ex-8',
      subskill: 'Inference About One Author Given the Other',
      level: 'advanced',
      stimulus: `Text 1: The widespread adoption of open-plan offices in the 1990s and 2000s was premised on the belief that removing physical barriers between employees would spontaneously generate collaboration and creative exchange. Architects and business consultants promoted open layouts as engines of innovation, arguing that proximity alone could spark the kind of informal interaction that drives organizational creativity.\n\nText 2: A 2018 study by Ethan Bernstein and Stephen Turban tracked employee interactions before and after a company transitioned to an open-plan office. Counter to expectations, face-to-face interaction among employees dropped by roughly 70 percent after the transition, while electronic communication — email and messaging — increased substantially. The researchers concluded that when physical barriers are removed, workers often substitute digital privacy for the architectural privacy they have lost.`,
      question: `Based on the texts, how would the architects and business consultants described in Text 1 most likely respond to the findings reported in Text 2?`,
      steps: [
        {
          instruction: `Read each text for its main claim`,
          content: `Text 1 describes the premise behind open-plan offices: that removing barriers spontaneously generates collaboration and innovation. Text 2 presents empirical findings showing that open-plan offices actually reduced face-to-face interaction and increased digital communication.`,
        },
        {
          instruction: `Identify the point of contact between the texts`,
          content: `Text 1 presents the theoretical prediction (open plans increase collaboration); Text 2 presents empirical evidence that challenges that prediction (face-to-face interaction dropped 70 percent after the transition).`,
        },
        {
          instruction: `Characterize the relationship precisely`,
          content: `Text 2's findings directly contradict the assumption stated in Text 1 — that proximity alone sparks interaction. The architects and consultants in Text 1 would be challenged, not supported, by Text 2's data.`,
        },
        {
          instruction: `Select the answer that names the relationship correctly`,
          content: `The correct answer should show the Text 1 advocates being surprised or challenged by Text 2's counterintuitive finding that open plans reduced, rather than increased, face-to-face collaboration.`,
        },
      ],
      choices: [
        {
          label: 'A',
          text: `They would likely be surprised, since the study's finding that open plans reduced face-to-face interaction contradicts the assumption that proximity spontaneously generates collaboration.`,
        },
        {
          label: 'B',
          text: `They would likely be satisfied, since the study confirms that open-plan offices succeed in increasing overall employee communication.`,
        },
        {
          label: 'C',
          text: `They would likely be indifferent, since the study examined only one company and therefore cannot challenge broader claims about open-plan design.`,
        },
        {
          label: 'D',
          text: `They would likely argue that the study's findings prove that digital communication is now more valuable than face-to-face interaction.`,
        },
      ],
      correctAnswer: 'A',
      explanation: `Text 1 presents the assumption that removing physical barriers would generate spontaneous collaboration through proximity. Text 2 reports the opposite: face-to-face interaction fell by 70 percent, and workers turned to digital communication instead. The architects and consultants described in Text 1 would be challenged — not validated — by these results, making A the accurate inference about how they would respond.`,
      wrongAnswerExplanations: {
        B: `Text 2 shows that overall communication shifted from face-to-face to digital, not that it increased in a way the open-plan advocates would celebrate. The open-plan premise was specifically about spontaneous in-person interaction, which dropped dramatically.`,
        C: `The question asks how the Text 1 advocates would respond to the findings, not whether the findings are definitive. Nothing in either text suggests the advocates would dismiss a single study as irrelevant.`,
        D: `Neither text makes a claim about the relative value of digital versus face-to-face communication. Text 2 reports the shift as a counterintuitive outcome, not as evidence that digital is superior.`,
      },
      coachTakeaway: `"Inference About One Author Given the Other" questions require you to take a position stated in one text and reason about how the author — or figures described in that text — would evaluate new information from the other text. Ask yourself: does Text 2 support, challenge, or complicate what Text 1 claimed? Then find the answer that accurately describes that reaction.`,
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
    {
      id: 'ctc-d-011',
      skillSlug: 'cross-text-connections',
      subskill: 'Agreement Between Texts',
      level: 'foundation',
      difficulty: 'easy',
      stimulus:
        'Text 1: Sleep deprivation has measurable effects on cognitive performance. Studies show that individuals who sleep fewer than six hours per night score significantly lower on tests of attention, working memory, and problem-solving than those who sleep seven to nine hours. Even a single night of poor sleep reduces performance on tasks requiring sustained focus.\n\nText 2: Adolescents are especially vulnerable to the effects of insufficient sleep because their developing brains require more restorative rest than adult brains. Research on high school students found that those who averaged fewer than seven hours of sleep performed worse on standardized academic assessments and reported greater difficulty concentrating during class than peers who met recommended sleep durations.',
      question: 'Which choice best describes the relationship between the two texts?',
      choices: [
        {
          label: 'A',
          text: 'Both texts support the view that insufficient sleep harms cognitive functioning, though Text 1 addresses the general population and Text 2 focuses on adolescents.',
        },
        {
          label: 'B',
          text: 'Text 2 contradicts Text 1 by arguing that adolescents are not affected by sleep deprivation.',
        },
        {
          label: 'C',
          text: 'Text 1 argues sleep is unnecessary for adults, while Text 2 argues it is essential for adolescents.',
        },
        {
          label: 'D',
          text: 'The two texts discuss unrelated topics and draw incompatible conclusions.',
        },
      ],
      correctAnswer: 'A',
      explanation:
        'Both texts present evidence that sleeping fewer hours than recommended impairs cognitive performance. Text 1 establishes the general relationship using studies of adults; Text 2 extends that finding to adolescents specifically. They agree on the central claim about sleep and cognition, differing only in their population of focus.',
      wrongAnswerExplanations: {
        B: 'Text 2 shows adolescents are harmed by insufficient sleep -- the opposite of arguing they are unaffected.',
        C: 'Neither text argues sleep is unnecessary for any group. Both treat adequate sleep as beneficial.',
        D: 'Both texts address the same relationship between sleep duration and cognitive performance, making them directly comparable.',
      },
      teachingPoint:
        'When two texts reach the same conclusion using different populations or settings, the relationship is agreement with different scope -- not contradiction.',
    },
    {
      id: 'ctc-d-012',
      skillSlug: 'cross-text-connections',
      subskill: 'Disagreement Between Texts',
      level: 'foundation',
      difficulty: 'easy',
      stimulus:
        "Text 1: Ancient Rome's decline is best explained by military overextension. As the empire expanded beyond the Mediterranean into northern Europe and western Asia, the cost of defending thousands of miles of frontier drained the treasury and stretched legions too thin. By the fourth century, Rome could no longer afford to station enough professional soldiers at its borders to repel sustained barbarian incursions.\n\nText 2: Military weakness alone cannot account for Rome's fall. The empire had survived military crises before and had adapted its frontier defenses across centuries. The more fundamental cause was political fragmentation: repeated civil wars over imperial succession destabilized governance, undermined economic production, and eroded the administrative coherence that had held a vast and diverse empire together.",
      question: 'Which choice best describes the relationship between the two texts?',
      choices: [
        {
          label: 'A',
          text: "Both texts agree that military overextension was the primary cause of Rome's decline.",
        },
        {
          label: 'B',
          text: "Text 1 attributes Rome's fall primarily to military overextension, while Text 2 argues that political fragmentation was a more fundamental cause.",
        },
        {
          label: 'C',
          text: 'Text 2 agrees with Text 1 but focuses on the economic rather than military consequences.',
        },
        {
          label: 'D',
          text: 'Text 1 addresses the Western Roman Empire and Text 2 addresses the Eastern, so they cannot be compared.',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'Text 1 offers a single primary explanation: military overextension drained the treasury and left borders undefended. Text 2 directly challenges this by arguing the empire had handled military crises before and that political fragmentation was more fundamental. This is a direct disagreement about the primary cause.',
      wrongAnswerExplanations: {
        A: 'Only Text 1 treats military overextension as the primary cause. Text 2 explicitly says "military weakness alone cannot account" for the fall.',
        C: "Text 2 does not agree with Text 1; it offers a different cause. While Text 2 mentions economic production, it attributes economic damage to political fragmentation, not to Text 1's military explanation.",
        D: 'Neither text specifies whether it addresses the Western or Eastern empire; both discuss Roman decline generally.',
      },
      teachingPoint:
        'Disagreement questions often involve one text making a claim and a second text saying that claim is insufficient or that a different explanation is more important. Look for "alone cannot account" or similar qualifying language.',
    },
    {
      id: 'ctc-d-013',
      skillSlug: 'cross-text-connections',
      subskill: 'How One Text Responds to Another',
      level: 'foundation',
      difficulty: 'easy',
      stimulus:
        "Text 1: The most effective way to reduce plastic waste in oceans is to invest in better waste management infrastructure in coastal developing nations, where the majority of plastic enters the marine environment. Cleanup efforts that remove plastic already in the water address the symptom without treating the cause.\n\nText 2: While upstream waste management improvements are necessary, they will take decades to scale and cannot address the hundreds of millions of tons of plastic already afloat in the world's oceans. Targeted removal operations -- including floating barriers, trawling nets, and coastal cleanup programs -- are an essential complement to prevention efforts, not an alternative to them.",
      question: 'Based on the texts, how would the author of Text 2 most likely respond to the argument in Text 1?',
      choices: [
        {
          label: 'A',
          text: 'The author of Text 2 would argue that cleanup efforts are a waste of resources and that only waste management improvements matter.',
        },
        {
          label: 'B',
          text: 'The author of Text 2 would fully agree that waste management infrastructure is the only solution needed.',
        },
        {
          label: 'C',
          text: 'The author of Text 2 would accept that waste management is necessary but argue that it does not make cleanup efforts unnecessary -- both approaches are needed simultaneously.',
        },
        {
          label: 'D',
          text: 'The author of Text 2 would deny that plastic waste is a serious environmental problem.',
        },
      ],
      correctAnswer: 'C',
      explanation:
        'Text 2 opens with "While upstream waste management improvements are necessary" -- explicitly accepting Text 1\'s core recommendation -- before arguing that cleanup efforts are also essential because existing ocean plastic cannot wait for infrastructure improvements. The author of Text 2 endorses both strategies rather than choosing one over the other.',
      wrongAnswerExplanations: {
        A: 'Text 2 argues for cleanup efforts as a complement to waste management, not a replacement. It calls removal operations "essential."',
        B: 'Text 2 explicitly argues cleanup is also essential -- it does not agree that waste management is the only solution.',
        D: 'Both texts take plastic ocean pollution seriously as a problem worth solving; neither dismisses it.',
      },
      teachingPoint:
        'When Text 2 opens with "while" or "although" followed by a concession, the author accepts the first text\'s point but argues it is incomplete. The relationship is partial agreement plus addition, not full agreement or contradiction.',
    },
    {
      id: 'ctc-d-014',
      skillSlug: 'cross-text-connections',
      subskill: 'Comparison of Conclusions',
      level: 'foundation',
      difficulty: 'easy',
      stimulus:
        'Text 1: Research on bilingualism consistently finds that speakers who regularly use two languages show enhanced executive control -- the cognitive ability to switch between tasks, inhibit irrelevant responses, and manage competing information. Neuroimaging studies reveal that bilingual individuals recruit prefrontal cortex regions associated with cognitive control more efficiently than monolingual peers.\n\nText 2: A growing body of replication studies has challenged the "bilingual advantage" in executive control. Several large-scale studies that corrected for methodological weaknesses in earlier research -- such as small sample sizes and inadequate controls for socioeconomic status -- found no statistically significant difference in executive function between bilingual and monolingual participants.',
      question: 'Which choice best describes the relationship between the two texts?',
      choices: [
        {
          label: 'A',
          text: 'Both texts agree that bilingualism consistently improves executive control.',
        },
        {
          label: 'B',
          text: 'Text 1 presents evidence for a bilingual cognitive advantage, while Text 2 questions whether that advantage exists when research methodology is improved.',
        },
        {
          label: 'C',
          text: 'Text 2 argues that bilingualism impairs executive control, contradicting Text 1.',
        },
        {
          label: 'D',
          text: 'The two texts study the same participants and therefore reach the same conclusions.',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'Text 1 claims bilingualism produces a measurable advantage in executive control, supported by neuroimaging evidence. Text 2 challenges this by citing replication studies with better methodology that found no significant difference. This is a direct clash over whether the bilingual advantage is real or an artifact of earlier research flaws.',
      wrongAnswerExplanations: {
        A: 'Only Text 1 argues for a consistent bilingual advantage. Text 2 disputes this finding.',
        C: 'Text 2 does not argue bilingualism impairs executive control -- it argues the advantage may not exist, which is different from claiming a disadvantage.',
        D: 'The texts describe different bodies of research; there is no indication they study the same participants.',
      },
      teachingPoint:
        'Watch for replication studies challenging earlier findings. When Text 2 says earlier research had methodological flaws, it is questioning the conclusion of Text 1, not simply adding nuance.',
    },
    {
      id: 'ctc-d-015',
      skillSlug: 'cross-text-connections',
      subskill: 'Agreement Between Texts',
      level: 'sat-application',
      difficulty: 'medium',
      stimulus:
        'Text 1: The widespread assumption that larger class sizes inevitably harm student achievement is not fully supported by evidence. Meta-analyses of randomized controlled studies find that reducing class size from thirty to twenty students produces modest but inconsistent gains in test scores. The effect size is much smaller than public discourse suggests, and the benefits are concentrated among early elementary grades and disadvantaged populations.\n\nText 2: Class size reduction is not a cost-neutral intervention: cutting class sizes by ten students requires hiring one additional teacher for every two existing classrooms. Cost-effectiveness analyses consistently find that the same funds spent on teacher professional development, high-dosage tutoring, or extended learning time produce larger achievement gains per dollar than reducing class size. For most school districts, class size reduction is a relatively expensive path to relatively modest results.',
      question: 'Which choice best describes what the two texts have in common?',
      choices: [
        {
          label: 'A',
          text: 'Both texts argue that class size has absolutely no effect on student achievement.',
        },
        {
          label: 'B',
          text: 'Both texts suggest that the benefits of reducing class size are more limited than commonly believed -- Text 1 by questioning the evidence base and Text 2 by comparing it to more cost-effective alternatives.',
        },
        {
          label: 'C',
          text: 'Both texts argue that class size should never be reduced under any circumstances.',
        },
        {
          label: 'D',
          text: 'Text 1 supports class size reduction, while Text 2 argues against it on cost grounds alone.',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'Text 1 calls the achievement gains from class size reduction "modest but inconsistent" and smaller than public discourse suggests. Text 2 argues those modest gains cost more than alternative interventions. Both texts converge on the view that class size reduction is overrated -- one from a question of evidence quality, the other from a question of cost-effectiveness.',
      wrongAnswerExplanations: {
        A: 'Text 1 says reductions produce "modest but inconsistent gains" -- not zero effect. Claiming "absolutely no effect" overstates both texts.',
        C: 'Neither text says class size should never be reduced; both simply argue the benefits are limited relative to expectations or costs.',
        D: 'Text 1 does not support class size reduction -- it questions whether the evidence justifies the widespread assumption. Both texts cast doubt on it.',
      },
      teachingPoint:
        'When two texts reach the same bottom-line conclusion by different routes (one via evidence quality, one via cost-effectiveness), the relationship is agreement through different arguments.',
    },
    {
      id: 'ctc-d-016',
      skillSlug: 'cross-text-connections',
      subskill: 'Inference About One Author Given the Other',
      level: 'sat-application',
      difficulty: 'medium',
      stimulus:
        'Text 1: Economic growth, measured by gross domestic product, remains the best available proxy for national prosperity. GDP aggregates the market value of all goods and services produced in an economy and, in so doing, captures rises in income, employment, and productive capacity that correlate strongly with improvements in material living standards. For all its acknowledged limitations, GDP provides a consistent, internationally comparable measure that no alternative has matched.',
      question:
        'Based on Text 1, which of the following is a claim the author of Text 1 would most likely agree with?',
      choices: [
        {
          label: 'A',
          text: 'GDP is a perfect measure of prosperity with no significant limitations.',
        },
        {
          label: 'B',
          text: 'GDP, despite its imperfections, remains more useful than available alternatives for measuring national economic wellbeing.',
        },
        {
          label: 'C',
          text: 'GDP should be replaced immediately by measures that capture non-market activity.',
        },
        {
          label: 'D',
          text: 'GDP accurately captures every dimension of human quality of life.',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'The author of Text 1 acknowledges GDP\'s limitations ("for all its acknowledged limitations") but argues it "provides a consistent, internationally comparable measure that no alternative has matched." This reflects a pragmatic defense -- GDP is imperfect but still the best option currently available.',
      wrongAnswerExplanations: {
        A: 'The author explicitly acknowledges GDP has limitations, so it is not a perfect measure.',
        C: 'The author defends GDP against alternatives, not the reverse. Calling for immediate replacement contradicts the text.',
        D: 'The author says GDP correlates with material living standards, not that it captures every dimension of human quality of life -- a much broader claim.',
      },
      teachingPoint:
        'Single-text inference questions within a cross-text format still require careful attention to qualifications. The "acknowledged limitations" hedge is essential to the correct answer.',
    },
    {
      id: 'ctc-d-017',
      skillSlug: 'cross-text-connections',
      subskill: 'Disagreement Between Texts',
      level: 'sat-application',
      difficulty: 'medium',
      stimulus:
        'Text 1: The widespread adoption of standardized testing in K-12 education has improved accountability by providing consistent, objective measures of student achievement across schools, districts, and states. Before standardized assessments, evaluating school quality was largely subjective and inconsistent. Comparable data allow policymakers to identify underperforming schools, allocate resources strategically, and track whether interventions are producing measurable results.\n\nText 2: The accountability benefits of standardized testing come at a significant pedagogical cost. When schools\' ratings and funding depend on test scores, administrators and teachers face enormous pressure to "teach to the test" -- narrowing the curriculum to assessed subjects and tested skills while reducing time for creative inquiry, arts, physical education, and subjects that contribute to students\' full development. The metric, in this case, distorts the thing it was designed to measure.',
      question:
        'Based on the texts, the authors would most likely disagree about which of the following?',
      choices: [
        {
          label: 'A',
          text: 'Whether standardized tests produce consistent, comparable data across schools',
        },
        {
          label: 'B',
          text: 'Whether the accountability benefits of standardized testing outweigh the costs to curriculum breadth and pedagogical quality',
        },
        {
          label: 'C',
          text: 'Whether schools existed before standardized testing was introduced',
        },
        {
          label: 'D',
          text: 'Whether students should attend school',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'Text 1 argues standardized testing produces valuable accountability benefits. Text 2 accepts that the tests produce data but argues those benefits come with serious pedagogical costs -- curriculum narrowing and "teaching to the test." The core disagreement is a trade-off question: are the accountability gains worth the educational costs?',
      wrongAnswerExplanations: {
        A: 'Text 2 does not dispute that tests produce comparable data -- it disputes whether those data justify the costs.',
        C: 'Both texts assume schools existed before standardized testing; this is not a point of disagreement.',
        D: 'Neither text questions whether students should attend school; this is far outside the scope of both passages.',
      },
      teachingPoint:
        'For "would disagree about" questions, find the precise trade-off or evaluative claim that one text affirms and the other challenges. Often one text addresses benefits and the other addresses costs of the same policy.',
    },
    {
      id: 'ctc-d-018',
      skillSlug: 'cross-text-connections',
      subskill: 'Comparison of Methods',
      level: 'sat-application',
      difficulty: 'medium',
      stimulus:
        'Text 1: Archaeologists studying the settlement patterns of pre-Columbian civilizations in the Amazon basin have traditionally relied on ceramic typologies -- classifying pottery styles to trace cultural exchange and migration routes. When a distinctive ceramic type appears across a wide geographic range, archaeologists infer contact between the groups that produced it. The technique has generated detailed chronologies of cultural development across the region.\n\nText 2: Recent advances in LiDAR technology -- which uses laser pulses from aircraft to map terrain beneath dense forest canopy -- have transformed Amazonian archaeology. Where ceramic-based methods depend on artifacts reaching the surface or surviving in excavated soil layers, LiDAR reveals the spatial organization of entire settlements: plazas, causeways, earthworks, and residential zones invisible from the ground. Settlements once considered modest have been reclassified as urban centers once their full spatial extent is mapped from the air.',
      question:
        'Based on both texts, which of the following best describes the relationship between ceramic typology and LiDAR in Amazonian archaeology?',
      choices: [
        {
          label: 'A',
          text: 'LiDAR has proven that all conclusions drawn from ceramic typology were incorrect.',
        },
        {
          label: 'B',
          text: 'Both methods are entirely interchangeable and answer the same archaeological questions.',
        },
        {
          label: 'C',
          text: 'Ceramic typology and LiDAR are complementary methods that answer different archaeological questions -- one tracing cultural exchange through artifacts, the other revealing settlement structure through spatial mapping.',
        },
        {
          label: 'D',
          text: 'LiDAR cannot be used in the Amazon because of the dense forest canopy.',
        },
      ],
      correctAnswer: 'C',
      explanation:
        'Text 1 describes ceramic typology as a method for tracing cultural exchange and migration via pottery styles. Text 2 describes LiDAR as a method for revealing the spatial organization of settlements hidden under forest canopy. The two methods address different questions (cultural contact vs. settlement structure) and are therefore complementary rather than competitive or interchangeable.',
      wrongAnswerExplanations: {
        A: 'Text 2 does not say LiDAR has disproved ceramic typology findings; it says LiDAR reveals settlement structure that ceramics cannot detect.',
        B: 'The texts describe distinct methods that answer different questions; they are not interchangeable.',
        D: 'Text 2 explicitly states LiDAR uses laser pulses "from aircraft to map terrain beneath dense forest canopy" -- dense canopy is exactly what LiDAR is designed to penetrate.',
      },
      teachingPoint:
        'Comparison of methods questions require you to identify what each method can and cannot do. Methods that answer different questions are complementary; methods that answer the same question differently are alternatives.',
    },
    {
      id: 'ctc-d-019',
      skillSlug: 'cross-text-connections',
      subskill: 'How One Text Responds to Another',
      level: 'sat-application',
      difficulty: 'medium',
      stimulus:
        'Text 1: The spread of social media has fundamentally changed how political misinformation circulates. False claims that once reached a limited audience through tabloid newspapers can now reach millions within hours through shares, reposts, and algorithmic amplification. The speed and scale of digital misinformation create challenges for democratic deliberation that no prior era of media has faced.\n\nText 2: Concerns about social media and misinformation sometimes overstate the novelty of the problem. Propaganda, rumor, and deliberate disinformation campaigns predate the internet by centuries. The printing press enabled the mass production of pamphlets containing fabricated claims; radio was weaponized for political manipulation in the 1930s; television reshaped political reality through selective imagery long before the first tweet was sent. Each new communication medium has amplified misinformation in ways contemporaries found unprecedented.',
      question:
        'Based on the texts, how would the author of Text 2 most likely respond to Text 1\'s claim that social media misinformation creates "challenges that no prior era of media has faced"?',
      choices: [
        {
          label: 'A',
          text: 'The author of Text 2 would agree that social media is unique and that historical analogies are irrelevant.',
        },
        {
          label: 'B',
          text: 'The author of Text 2 would challenge the claim of novelty by pointing out that every new communication medium has, in its time, amplified misinformation in ways that seemed unprecedented.',
        },
        {
          label: 'C',
          text: 'The author of Text 2 would argue that misinformation is not a serious problem in any era.',
        },
        {
          label: 'D',
          text: 'The author of Text 2 would agree that social media is more dangerous than the printing press but argue that regulation can solve the problem.',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'Text 2 directly targets the assumption that social media misinformation is historically unprecedented, listing the printing press, radio, and television as prior media that also enabled misinformation at scales their contemporaries found alarming. The author of Text 2 would challenge Text 1\'s "no prior era" claim by showing a historical pattern.',
      wrongAnswerExplanations: {
        A: 'Text 2 argues historical analogies are highly relevant -- the opposite of calling them irrelevant.',
        C: 'Text 2 does not deny that misinformation is a serious problem; it disputes the claim of novelty, not the importance of the issue.',
        D: 'Text 2 never concedes that social media is more dangerous than prior media, nor does it discuss regulation.',
      },
      teachingPoint:
        '"No prior era" is a strong novelty claim. When Text 2 provides multiple historical counterexamples, it is directly refuting that claim. Always test whether a Text 2 challenge is partial or complete.',
    },
    {
      id: 'ctc-d-020',
      skillSlug: 'cross-text-connections',
      subskill: 'Inference About One Author Given the Other',
      level: 'sat-application',
      difficulty: 'medium',
      stimulus:
        'Text 1: Public libraries, once defined primarily by their book collections, have evolved into community centers that provide internet access, job-search assistance, coding workshops, early childhood literacy programs, and mental health resources. This expansion reflects a recognition that information access now encompasses digital connectivity and social services, not just physical media. Libraries that have embraced this broader mission report higher foot traffic and greater community engagement than those that have not.',
      question:
        'Based on Text 1, which of the following is an assumption the author makes without explicitly stating it?',
      choices: [
        {
          label: 'A',
          text: 'Public libraries should close their physical locations and operate entirely online.',
        },
        {
          label: 'B',
          text: 'Higher foot traffic and community engagement are desirable outcomes that reflect a library serving its purpose well.',
        },
        {
          label: 'C',
          text: 'Libraries that offer social services have abandoned their original purpose.',
        },
        {
          label: 'D',
          text: 'All libraries have already fully implemented digital and social service programs.',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'The author cites "higher foot traffic and greater community engagement" as evidence that the expanded mission succeeds. For this to function as evidence of success, the author must assume these outcomes are desirable markers of a library fulfilling its purpose.',
      wrongAnswerExplanations: {
        A: 'The text celebrates libraries expanding physical services; closing physical locations contradicts the text.',
        C: 'The author frames expanded services as an evolution of purpose, not an abandonment of it.',
        D: 'The text notes libraries "that have embraced this broader mission" differ from those "that have not," implying incomplete adoption.',
      },
      teachingPoint:
        'Assumption questions ask what must be true for the argument to work. When an author treats an outcome as evidence of success, they implicitly assume that outcome is a legitimate measure of success.',
    },
    {
      id: 'ctc-d-021',
      skillSlug: 'cross-text-connections',
      subskill: 'Comparison of Conclusions',
      level: 'advanced',
      difficulty: 'medium',
      stimulus:
        'Text 1: The recent explosion of true-crime podcasts and documentaries reflects a genuine public appetite for understanding criminal psychology. Producers and networks have discovered that audiences are fascinated by the interior lives of people who commit serious crimes. This fascination, in the view of most content creators, is not morbid but educational: it deepens public understanding of justice, mental health, and the conditions that produce violence.\n\nText 2: The framing of true crime as educational masks a more troubling function: the entertainment industry\'s exploitation of real victims\' worst moments for commercial gain. Survivors and victims\' families routinely report that documentaries and podcasts relive their trauma without consent and sometimes without compensation. The packaging of suffering as "public interest journalism" does not change the fundamental transaction, in which platforms profit from real human pain.',
      question: 'Which choice best describes the relationship between the two texts?',
      choices: [
        {
          label: 'A',
          text: 'Both texts agree that true crime content is primarily educational and beneficial to public understanding.',
        },
        {
          label: 'B',
          text: 'Text 1 presents the content-creator rationale for true crime as educational, while Text 2 challenges that framing by arguing the format exploits victims for commercial gain.',
        },
        {
          label: 'C',
          text: 'Text 2 agrees with Text 1 that audiences are fascinated by criminal psychology but argues this fascination is harmful.',
        },
        {
          label: 'D',
          text: 'Text 2 argues that true crime content should be banned entirely, while Text 1 defends it unconditionally.',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'Text 1 presents the industry defense of true crime as educational. Text 2 specifically challenges this framing, calling it a mask over commercial exploitation. Text 2 directly disputes the justification Text 1 reports.',
      wrongAnswerExplanations: {
        A: 'Only Text 1 presents the educational framing positively. Text 2 disputes it.',
        C: 'Text 2 focuses on the ethics of the content format, not the psychology of the audience.',
        D: 'Text 2 does not call for a ban. Text 1 reports the industry view without unconditionally endorsing it.',
      },
      teachingPoint:
        'Notice which text is reporting others\' views versus which is taking its own position. Text 1 reports that content creators view true crime as educational; Text 2 challenges that framing directly.',
    },
    {
      id: 'ctc-d-022',
      skillSlug: 'cross-text-connections',
      subskill: 'Use of Evidence Across Texts',
      level: 'advanced',
      difficulty: 'medium',
      stimulus:
        'Text 1: Proponents of merit pay for teachers argue that tying compensation to measurable student outcomes will attract talented individuals to the profession and incentivize improved performance. The logic mirrors that of performance-based pay in the private sector, where bonuses tied to measurable results have been shown to increase productivity in a range of industries.\n\nText 2: The analogy between private-sector performance pay and teacher merit pay breaks down on examination. In manufacturing or sales, individual output is largely separable from colleagues\' contributions and environmental factors outside the worker\'s control. In teaching, a student\'s performance reflects family circumstances, prior schooling, language background, and class composition in ways that are difficult to isolate from the teacher\'s contribution. Applying a private-sector framework to a profession whose outputs are inherently collaborative produces incentives that are both unfair and ineffective.',
      question:
        'Based on the texts, how would the author of Text 2 respond to the analogy in Text 1 between private-sector performance pay and teacher merit pay?',
      choices: [
        {
          label: 'A',
          text: 'The author of Text 2 would agree that the private-sector analogy fully supports merit pay for teachers.',
        },
        {
          label: 'B',
          text: 'The author of Text 2 would argue that the analogy is flawed because teaching differs fundamentally from private-sector work in the degree to which individual output can be separated from contextual and collaborative factors.',
        },
        {
          label: 'C',
          text: 'The author of Text 2 would argue that no teacher ever influences student outcomes.',
        },
        {
          label: 'D',
          text: 'The author of Text 2 would accept the analogy but argue that performance bonuses are too expensive for school districts.',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'Text 2 opens by saying the analogy "breaks down on examination" and explains why: in private-sector jobs, individual output is separable, but in teaching it is not. The objection is structural -- the two contexts differ in ways that make the private-sector logic inapplicable.',
      wrongAnswerExplanations: {
        A: 'Text 2 explicitly says the analogy "breaks down" -- the opposite of agreeing it fully supports merit pay.',
        C: 'Text 2 never claims teachers have no influence on students. It argues the influence is hard to isolate.',
        D: 'Text 2 makes no mention of cost. Its objection is about fairness and effectiveness.',
      },
      teachingPoint:
        'When Text 2 says an analogy "breaks down," look for the specific structural difference it identifies between the two things being compared. The correct answer will name that structural difference.',
    },
    {
      id: 'ctc-d-023',
      skillSlug: 'cross-text-connections',
      subskill: 'Inference About One Author Given the Other',
      level: 'advanced',
      difficulty: 'medium',
      stimulus:
        'Text 1: The dominant narrative of the Industrial Revolution frames it as an era of unprecedented material progress -- rising wages, increased life expectancy, and the eventual emergence of a prosperous middle class. Historians who subscribe to this view point to long-run data showing that real wages in Britain roughly doubled between 1760 and 1850 and that access to manufactured goods expanded dramatically across social classes.\n\nText 2: Long-run averages obscure the catastrophic living conditions experienced by factory workers during the first half of the Industrial Revolution. Urban mortality rates in new industrial cities like Manchester were higher in 1840 than they had been in pre-industrial rural England. Life expectancy at birth in Manchester fell to twenty-eight years during this period. Whatever prosperity eventually arrived, it was built on decades of immiseration for those who lived through industrialization.',
      question:
        'The author of Text 1 would most likely characterize the data in Text 2 as which of the following?',
      choices: [
        {
          label: 'A',
          text: 'Compelling evidence that the Industrial Revolution produced no long-term benefits',
        },
        {
          label: 'B',
          text: 'Data that confirms the dominant narrative of the Industrial Revolution as straightforward progress',
        },
        {
          label: 'C',
          text: 'Information about short-term and localized conditions that does not necessarily contradict long-run trends showing rising wages and expanded access to goods',
        },
        {
          label: 'D',
          text: "Evidence that Text 2's author is mistaken about Manchester's mortality rates",
        },
      ],
      correctAnswer: 'C',
      explanation:
        "The author of Text 1 defends the long-run view. Text 2's data about Manchester in 1840 describes conditions in a specific industrial city at a specific moment. The Text 1 author would characterize this as short-term and localized data that does not undermine the long-run trend, because Text 1 explicitly appeals to long-run averages as the relevant measure.",
      wrongAnswerExplanations: {
        A: "The author of Text 1 believes the Industrial Revolution produced real long-term benefits; they would not grant that Text 2's data disproves this.",
        B: "Text 2's data about falling life expectancy does not confirm that industrialization was straightforwardly positive.",
        D: "The author of Text 1 does not dispute particular historical facts; their argument is about interpretation.",
      },
      teachingPoint:
        "When asked how Text 1's author would respond to Text 2's evidence, use Text 1's framework. Text 1 privileges long-run averages, so it would handle Text 2's local, short-term data by calling it insufficiently representative.",
    },
    {
      id: 'ctc-d-024',
      skillSlug: 'cross-text-connections',
      subskill: 'Disagreement Between Texts',
      level: 'challenge',
      difficulty: 'hard',
      stimulus:
        'Text 1: The genre of literary memoir has become increasingly problematic as its conventions have standardized. The contemporary memoir market rewards a recognizable narrative arc -- childhood wound, descent, struggle, revelation, redemption -- that audiences expect and publishers demand. Writers who have genuinely interesting lives that do not conform to this arc are pressured to reshape their experiences into the approved template. The result is a genre that increasingly mistakes a formula for truth.\n\nText 2: The redemptive arc that critics deride as a formula may in fact reflect something structurally true about how human beings experience and narrate suffering after the fact. Psychologists who study narrative identity find that people recounting traumatic experiences overwhelmingly impose a coherence and forward momentum on events that, while being lived, felt chaotic and without meaning. The "wound-and-redemption" structure is not a publishing convention imposed from outside -- it is the shape that memory itself tends to give to painful pasts.',
      question:
        'Based on the texts, what is the fundamental disagreement between the two authors about the redemptive arc in memoir?',
      choices: [
        {
          label: 'A',
          text: 'Whether memoirs should be published at all',
        },
        {
          label: 'B',
          text: "Whether the redemptive arc reflects an external commercial formula imposed on writers' lives, or whether it reflects a natural pattern in how humans narrativize their own experiences",
        },
        {
          label: 'C',
          text: 'Whether psychologists or publishers have more influence on the memoir genre',
        },
        {
          label: 'D',
          text: 'Whether memoirs are more popular than novels',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'Text 1 argues the redemptive arc is an external commercial formula that publishers impose, distorting genuine experience. Text 2 argues the opposite: the arc reflects how human memory naturally structures painful experience. The fundamental disagreement is about the origin of the arc -- market convention vs. cognitive reality.',
      wrongAnswerExplanations: {
        A: 'Neither text argues memoirs should not be published; both presuppose the genre exists.',
        C: 'The disagreement is about the nature of the arc, not about who has more industry influence.',
        D: 'Neither text addresses memoir popularity relative to novels.',
      },
      teachingPoint:
        'The hardest fundamental-disagreement questions involve two texts that agree a phenomenon exists but disagree about its origin or explanation. Identify what each text says the cause or source is.',
    },
  ],
  masteryQuestions: [
    {
      id: 'ctc-m-001',
      skillSlug: 'cross-text-connections',
      subskill: 'Disagreement Between Texts',
      level: 'sat-application',
      difficulty: 'medium',
      stimulus:
        "Text 1: The best evidence for the existence of dark matter is gravitational. The visible mass of galaxies -- the stars, gas, and dust astronomers can observe -- is insufficient to account for the rotational velocities measured at galaxies' outer edges. Stars at those distances move far faster than Newtonian gravity from visible matter would permit. The simplest explanation is that galaxies are embedded in halos of non-luminous matter that provides the additional gravitational pull needed to explain the observed rotation curves.\n\nText 2: The anomalous rotation curves that motivate dark matter hypotheses may instead reflect a need to modify our theory of gravity rather than to invoke an undetected substance. Modified Newtonian dynamics (MOND) proposes that gravitational force behaves differently at very low accelerations. Under MOND, the observed rotation velocities follow naturally from the visible mass alone, with no need for dark matter halos. The data that appear to demand an invisible substance may instead be revealing the limits of conventional gravitational theory.",
      question:
        'Which choice best describes the relationship between the two texts?',
      choices: [
        {
          label: 'A',
          text: 'Both texts agree that dark matter halos are the correct explanation for galaxy rotation curves.',
        },
        {
          label: 'B',
          text: 'Text 1 explains anomalous rotation curves by positing unseen matter, while Text 2 proposes that modifying gravitational theory eliminates the need for unseen matter.',
        },
        {
          label: 'C',
          text: "Text 2 argues that galaxy rotation curves do not actually deviate from predictions, contradicting Text 1's observations.",
        },
        {
          label: 'D',
          text: 'Both texts conclude that current physics cannot explain galaxy rotation curves at all.',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'Both texts accept the same observational fact: stars at galaxies\' outer edges move faster than visible mass alone predicts. They disagree about the explanation. Text 1 explains the anomaly by adding unseen matter. Text 2 explains it by modifying the law of gravity (MOND). Both offer competing explanations for the same data.',
      wrongAnswerExplanations: {
        A: 'Text 2 explicitly rejects the dark matter halo explanation in favor of MOND.',
        C: 'Text 2 accepts that rotation curves deviate from conventional predictions -- it disputes the explanation, not the observation.',
        D: 'Both texts offer explanations for rotation curves; neither claims physics cannot explain them.',
      },
      teachingPoint:
        'When two texts agree on observations but disagree on interpretation, identify each text\'s preferred explanatory framework. The disagreement is about theory, not data.',
    },
    {
      id: 'ctc-m-002',
      skillSlug: 'cross-text-connections',
      subskill: 'How One Text Responds to Another',
      level: 'sat-application',
      difficulty: 'medium',
      stimulus:
        'Text 1: Universal basic income (UBI) -- a regular cash payment made to all citizens regardless of employment status -- would provide a floor of economic security that the current welfare state fails to guarantee. Unlike means-tested programs that phase out as income rises, UBI avoids the poverty trap in which additional earnings cost beneficiaries their eligibility for support. A universal, unconditional payment removes the disincentives embedded in the current system while ensuring that no one falls below a dignified minimum.\n\nText 2: Universal basic income\'s proponents rarely reckon seriously with the fiscal arithmetic. Providing even a modest monthly payment to every adult in a large country requires revenues that would either demand substantial tax increases on middle-income households or come at the expense of existing programs -- including Medicaid, housing vouchers, and child care subsidies -- that disproportionately benefit the poorest citizens. Trading targeted programs for a universal check may produce a net transfer of resources away from the most vulnerable.',
      question:
        "Based on the texts, how would the author of Text 2 most likely respond to Text 1's argument that UBI avoids the poverty trap?",
      choices: [
        {
          label: 'A',
          text: 'The author of Text 2 would agree that avoiding the poverty trap is the most important consideration in welfare policy.',
        },
        {
          label: 'B',
          text: 'The author of Text 2 would accept that UBI removes means-testing disincentives but argue that this benefit may come at the cost of existing targeted programs that better serve the most vulnerable.',
        },
        {
          label: 'C',
          text: 'The author of Text 2 would argue that poverty traps do not exist.',
        },
        {
          label: 'D',
          text: 'The author of Text 2 would support UBI but propose that it be limited to employed workers.',
        },
      ],
      correctAnswer: 'B',
      explanation:
        "Text 2 does not directly dispute that UBI removes poverty trap disincentives. Instead, it raises a fiscal counterargument: UBI revenues might come from eliminating targeted programs that help the poorest citizens more effectively. The author of Text 2 would grant the poverty-trap point while arguing the trade-off is unfavorable.",
      wrongAnswerExplanations: {
        A: 'Text 2 raises fiscal concerns it treats as equally or more important than poverty-trap avoidance.',
        C: 'Text 2 never disputes the existence of poverty traps; it raises a different objection.',
        D: 'Text 2 does not propose any alternative design for UBI; it opposes UBI on fiscal grounds.',
      },
      teachingPoint:
        'When Text 2 shifts the argument to a different domain (here: fiscal arithmetic vs. incentive structure), it is not refuting the specific claim but arguing it misses a bigger problem. The response is concession-plus-redirect.',
    },
    {
      id: 'ctc-m-003',
      skillSlug: 'cross-text-connections',
      subskill: 'Comparison of Conclusions',
      level: 'advanced',
      difficulty: 'hard',
      stimulus:
        'Text 1: The historical consensus that the Maya civilization experienced a sudden "collapse" in the ninth century CE misrepresents a complex, regionally varied process. The great lowland cities of Tikal, Palenque, and Copan did indeed decline dramatically, but population decline and political fragmentation did not occur simultaneously across the Maya world. Northern cities like Chichen Itza and Uxmal continued to flourish for centuries after the southern decline. The "Maya collapse" narrative projects a false uniformity onto a civilization that was never a single political entity.\n\nText 2: Even granting the regional variation acknowledged by some scholars, the ninth-century decline of the southern lowland Maya centers represents one of the most rapid and severe demographic contractions in pre-Columbian history. Within roughly one hundred years, cities that had housed tens of thousands of inhabitants were essentially abandoned. Whatever is said of northern continuity, the scale of southern demographic collapse -- documented through settlement surveys, agricultural pollen records, and monument-construction chronologies -- demands an explanation in its own right, not a dissolution into regional variation.',
      question:
        'Based on the texts, the authors disagree primarily about which of the following?',
      choices: [
        {
          label: 'A',
          text: 'Whether any Maya cities existed in the northern Yucatan Peninsula',
        },
        {
          label: 'B',
          text: 'Whether the concept of a unified "Maya collapse" is an appropriate framework for understanding ninth-century events, given regional variation',
        },
        {
          label: 'C',
          text: 'Whether the Maya civilization had writing',
        },
        {
          label: 'D',
          text: 'Whether Tikal or Copan was the more important city',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'Text 1 argues the "Maya collapse" concept is misleading because it projects false uniformity. Text 2 accepts regional variation ("even granting the regional variation") but argues the southern collapse was severe enough to demand analysis as a significant event in its own right. The disagreement is about whether the collapse framework is useful given that variation.',
      wrongAnswerExplanations: {
        A: 'Both texts accept that northern cities existed and continued; this is not a point of disagreement.',
        C: 'Neither text addresses Maya writing; this is outside the scope of both passages.',
        D: 'Neither text evaluates the relative importance of Tikal versus Copan.',
      },
      teachingPoint:
        'When Text 2 opens with "even granting," it accepts part of Text 1\'s claim before arguing the concession does not resolve the main issue. Text 2 agrees on the facts but disputes the interpretive conclusion.',
    },
    {
      id: 'ctc-m-004',
      skillSlug: 'cross-text-connections',
      subskill: 'Agreement Between Texts',
      level: 'sat-application',
      difficulty: 'medium',
      stimulus:
        'Text 1: Empirical research on the effectiveness of anti-drug education programs in schools consistently finds a paradox: programs that dwell extensively on the harms of substance use can inadvertently increase curiosity about those substances among adolescents. Students who receive detailed information about the physiological effects of drugs may be more, not less, likely to experiment with them than peers who receive no formal drug education. The mechanism appears to be that graphic descriptions of effects function as a form of advertising.\n\nText 2: The failure of fear-based drug prevention programs to reduce adolescent substance use is well-documented. When programs like DARE were subjected to rigorous long-term evaluation, researchers found no significant reduction -- and in some cases modest increases -- in drug use among program participants compared with control groups. Subsequent intervention research has shifted toward programs that build refusal skills, social norm correction, and peer-influence resistance rather than cataloging drug dangers.',
      question:
        'Both texts would most likely support which of the following claims?',
      choices: [
        {
          label: 'A',
          text: 'All drug education programs increase adolescent substance use.',
        },
        {
          label: 'B',
          text: 'Programs that focus on describing drug dangers in detail may not effectively reduce -- and may sometimes increase -- adolescent substance use.',
        },
        {
          label: 'C',
          text: 'Drug education should be eliminated from schools entirely.',
        },
        {
          label: 'D',
          text: 'Adolescents are uniquely immune to educational interventions.',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'Text 1 presents a paradox in which detailed harm information may increase curiosity and experimentation. Text 2 specifically mentions fear-based programs that catalog drug dangers as failures. Both texts converge on the view that the detail-the-dangers approach can backfire.',
      wrongAnswerExplanations: {
        A: 'Neither text says all programs increase use -- both specifically criticize fear-based approaches while implying alternatives exist.',
        C: 'Text 2 mentions that subsequent research shifted toward alternative program designs, implying drug education still has a place.',
        D: 'Neither text claims adolescents are immune to educational interventions generally.',
      },
      teachingPoint:
        'For "both would support" questions, find the precise claim both texts endorse. Neither text condemns all drug education; both condemn a specific approach.',
    },
    {
      id: 'ctc-m-005',
      skillSlug: 'cross-text-connections',
      subskill: 'How One Text Responds to Another',
      level: 'advanced',
      difficulty: 'hard',
      stimulus:
        'Text 1: The romantic notion that great scientific discoveries arise from individual genius distorts the actual social structure of scientific inquiry. Virtually every major scientific breakthrough of the modern era has involved networks of researchers, shared databases, overlapping grant programs, and sustained institutional support. Science is an irreducibly collective enterprise, and policies that concentrate resources on individual "star" researchers at the expense of collaborative infrastructure are built on a myth.\n\nText 2: The history of science reveals that transformative theoretical advances -- as distinct from incremental experimental progress -- have often required the contrarian thinking of individuals willing to challenge the consensus of their fields. The heliocentrism of Copernicus, the relativity of Einstein, the plate tectonics of Wegener: each overturned a dominant paradigm against significant institutional resistance. Collective infrastructure excels at generating the normal science that fills in established frameworks; it tends to inhibit the revolutionary departures that reframe those frameworks entirely.',
      question:
        'Based on the texts, how would the author of Text 2 most likely respond to the argument in Text 1 that focusing on individual "star" researchers is "built on a myth"?',
      choices: [
        {
          label: 'A',
          text: 'The author of Text 2 would agree that all significant scientific advances are the product of collective research networks.',
        },
        {
          label: 'B',
          text: 'The author of Text 2 would argue that while collective infrastructure supports incremental progress, transformative theoretical breakthroughs have historically required individual contrarians -- a role that collectives tend to suppress.',
        },
        {
          label: 'C',
          text: 'The author of Text 2 would argue that government funding for science should be eliminated.',
        },
        {
          label: 'D',
          text: 'The author of Text 2 would agree that the individual-genius narrative is purely mythological with no empirical basis.',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'Text 2 accepts that collective infrastructure supports "normal science" while arguing that paradigm-shifting advances (Copernicus, Einstein, Wegener) required individual contrarians who challenged consensus against institutional resistance. The author of Text 2 would reject Text 1\'s blanket dismissal of the individual role by distinguishing between types of scientific advance.',
      wrongAnswerExplanations: {
        A: 'Text 2 specifically argues that collective infrastructure can inhibit revolutionary departures.',
        C: 'Text 2 never addresses government funding policy.',
        D: 'Text 2 provides historical examples as evidence that individuals have been essential for paradigm shifts.',
      },
      teachingPoint:
        'When Text 2 introduces a distinction that Text 1 does not make (incremental vs. paradigm-shifting), the correct response answer will incorporate that distinction.',
    },
    {
      id: 'ctc-m-006',
      skillSlug: 'cross-text-connections',
      subskill: 'Comparison of Methods',
      level: 'advanced',
      difficulty: 'hard',
      stimulus:
        'Text 1: Linguists studying language change have traditionally relied on written historical records to trace the evolution of vocabulary, grammar, and syntax across time. The study of a language\'s history is only as deep as its written record allows: for a language like Latin, with texts spanning more than a millennium, reconstruction is detailed and confident; for languages without a writing tradition, historical analysis effectively begins at the moment of first contact with literate cultures.\n\nText 2: The field of historical linguistics has developed tools that allow researchers to reach back far beyond the written record through the comparative method. By systematically comparing cognate words -- words in related languages descended from a common ancestor -- linguists can reconstruct features of proto-languages that predate writing by thousands of years. Proto-Indo-European, the ancestor of Sanskrit, Greek, Latin, and hundreds of modern languages, has been reconstructed with significant confidence despite having left no written texts of its own.',
      question:
        'Based on both texts, which of the following best describes the relationship between the methods the two texts discuss?',
      choices: [
        {
          label: 'A',
          text: 'The comparative method described in Text 2 is identical to the written-record method described in Text 1.',
        },
        {
          label: 'B',
          text: 'The written-record method (Text 1) and the comparative method (Text 2) address different temporal horizons: written records cover literate periods while the comparative method extends analysis beyond written history.',
        },
        {
          label: 'C',
          text: 'The comparative method has made written historical records completely obsolete for linguistic research.',
        },
        {
          label: 'D',
          text: 'Both texts argue that no reliable method exists for studying language change.',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'Text 1 establishes that written-record analysis is limited by when writing began. Text 2 describes the comparative method as a tool that extends analysis further back, reconstructing proto-languages that predate writing. The two methods cover different time periods and are complementary rather than competing.',
      wrongAnswerExplanations: {
        A: 'The methods are clearly distinct: one relies on texts, the other on systematic cross-language comparison of cognates.',
        C: 'Text 2 never says the comparative method replaces written records.',
        D: 'Both texts describe methods that work for their respective time periods.',
      },
      teachingPoint:
        'When two texts describe different methods, ask what each method can do and for what situations each is suited. Often they are complementary tools for different contexts rather than rivals.',
    },
    {
      id: 'ctc-m-007',
      skillSlug: 'cross-text-connections',
      subskill: 'Inference About One Author Given the Other',
      level: 'advanced',
      difficulty: 'hard',
      stimulus:
        'Text 1: Nudge theory holds that small, carefully designed changes to the environment in which choices are made -- "choice architecture" -- can reliably steer people toward better decisions without restricting their freedom to choose otherwise. Placing fruit at eye level in a cafeteria line, setting organ donation as the default option, or making retirement saving automatic unless employees opt out are all nudges: low-cost interventions that exploit predictable cognitive biases to produce socially desirable outcomes. Proponents argue that this approach respects autonomy while harnessing behavioral insights for the public good.\n\nText 2: The appeal of nudge theory lies partly in what it obscures: that "choice architecture" is never neutral. Every arrangement of options reflects the values and priorities of whoever designs the environment. When a government or employer decides what counts as the "socially desirable outcome" toward which people should be steered, it is exercising normative judgment. Framing this exercise of power as mere "environmental design" makes it harder to scrutinize and contest than explicit policy mandates would be.',
      question:
        "The author of Text 1 would most likely respond to Text 2's concern about hidden normative judgment by arguing which of the following?",
      choices: [
        {
          label: 'A',
          text: 'Nudges do not reflect any values at all, because the person being nudged retains the freedom to choose otherwise.',
        },
        {
          label: 'B',
          text: 'The normative judgments embedded in nudge design are justified because the outcomes they produce are widely recognized as beneficial, and individuals remain free to opt out.',
        },
        {
          label: 'C',
          text: 'The author of Text 1 would accept that nudge theory is unacceptably manipulative and should be abandoned.',
        },
        {
          label: 'D',
          text: 'Choice architecture should only be used by private employers, not governments.',
        },
      ],
      correctAnswer: 'B',
      explanation:
        "Text 1 frames nudges as producing 'socially desirable outcomes' while 'respecting autonomy.' The author's position is that the outcomes are good and autonomy is preserved. When confronted with Text 2's concern about hidden values, the Text 1 author would argue that the normative judgments are legitimate because the goals are broadly beneficial and choice is retained.",
      wrongAnswerExplanations: {
        A: "Text 1 frames the outcomes as 'socially desirable,' which is itself a normative claim. The author cannot plausibly argue nudges reflect no values.",
        C: 'Text 1 is an endorsement of nudge theory; the author would not concede that it should be abandoned.',
        D: 'Text 1 presents nudges in both private and public contexts without restricting them to private employers.',
      },
      teachingPoint:
        "When Text 2 challenges Text 1's implicit assumptions, predict Text 1's response by consulting its own framework. Text 1's defenses are: (1) outcomes are socially desirable and (2) autonomy is preserved.",
    },
    {
      id: 'ctc-m-008',
      skillSlug: 'cross-text-connections',
      subskill: 'Disagreement Between Texts',
      level: 'challenge',
      difficulty: 'hard',
      stimulus:
        'Text 1: The most consequential shift in the contemporary art market is the emergence of art as a pure financial asset class. Ultra-high-net-worth collectors increasingly purchase works not to live with them or display them publicly but to store them in tax-advantaged free-port facilities where they will appreciate in value. When art functions as a financial instrument, its aesthetic, cultural, and social dimensions become irrelevant to the transaction. The free-port warehouse is the logical terminus of the commodification of culture.\n\nText 2: The claim that art has become purely financial misunderstands the layered motivations of contemporary collectors. Even among those who use art for investment purposes, surveys consistently find that aesthetic response, cultural signaling, and personal identity formation remain primary stated motivations for acquisition. The free-port phenomenon, while real, accounts for a fraction of art market transactions and represents one extreme of a spectrum. Art retains multiple simultaneous meanings -- financial, aesthetic, social, cultural -- that resist reduction to any single function.',
      question:
        'Based on the texts, the fundamental disagreement between the two authors concerns which of the following?',
      choices: [
        {
          label: 'A',
          text: 'Whether any art is stored in free-port facilities',
        },
        {
          label: 'B',
          text: "Whether the most consequential trend in the contemporary art market has eliminated art's aesthetic, cultural, and social dimensions, or whether those dimensions coexist alongside art's financial function",
        },
        {
          label: 'C',
          text: 'Whether tax-advantaged free ports should be legal',
        },
        {
          label: 'D',
          text: 'Whether contemporary art has any aesthetic value at all',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'Text 1 argues that when art functions as a financial instrument, its aesthetic, cultural, and social dimensions become "irrelevant." Text 2 accepts that free-port storage exists but argues that aesthetic and identity-based motivations persist even among investment-oriented collectors, and that art retains "multiple simultaneous meanings." The disagreement is over whether financialization eliminates or merely supplements other dimensions.',
      wrongAnswerExplanations: {
        A: 'Both texts accept that art is stored in free ports; Text 2 says the phenomenon is "real."',
        C: 'Neither text addresses the legality of free ports.',
        D: 'Neither author disputes that art has aesthetic value -- they disagree about whether that value remains relevant in the current market.',
      },
      teachingPoint:
        'For the hardest fundamental-disagreement questions, both texts may accept the same facts but draw opposite conclusions about significance. Text 1 sees financialization as displacing other meanings; Text 2 sees it as one layer among many. The disagreement is interpretive, not factual.',
    },
  ],
}
