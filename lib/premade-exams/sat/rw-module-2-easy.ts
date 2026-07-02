import type { RWQuestion } from './types'

// Reading and Writing Module 2 Easy — 27 questions (easier second module, ~15 easy / 12 medium)

export const rwModule2EasyQuestions: RWQuestion[] = [

  // ── Words in Context (5) ────────────────────────────────────────────────────

  {
    id: 'rw2e-01',
    section: 'reading-writing',
    moduleId: 'rw-module-2-easy',
    domain: 'Craft and Structure',
    skill: 'Words in Context',
    difficulty: 'easy',
    stimulus: `Honeybees communicate the location of flowers to other members of the hive through an elaborate series of movements called the "waggle dance." The dancing bee moves in a figure-eight pattern, with the direction of the straight middle portion indicating the angle of the food source relative to the sun. The duration of the waggle run signals the distance: longer dances indicate flowers farther away. Through this system, a single scout bee can convey precise navigational information to thousands of nest-mates.`,
    question: `As used in the passage, "convey" most nearly means`,
    choices: [
      { label: 'A', text: 'transmit' },
      { label: 'B', text: 'disguise' },
      { label: 'C', text: 'request' },
      { label: 'D', text: 'store' },
    ],
    correctAnswer: 'A',
    explanation: `Choice A is correct. The scout bee uses its dance to pass navigational information to other bees. "Transmit" means to send or pass information from one party to another, which is exactly what the bee is doing.`,
    wrongAnswerExplanations: {
      B: `Choice B is incorrect. "Disguise" means to conceal, but the purpose of the dance is to reveal, not hide, information.`,
      C: `Choice C is incorrect. "Request" implies asking for something; the bee is sharing information, not making a request.`,
      D: `Choice D is incorrect. "Store" implies keeping information in one place, but the bee is sharing it outward with nest-mates.`,
    },
  },

  {
    id: 'rw2e-02',
    section: 'reading-writing',
    moduleId: 'rw-module-2-easy',
    domain: 'Craft and Structure',
    skill: 'Words in Context',
    difficulty: 'easy',
    stimulus: `The Wright brothers' first successful powered flight at Kitty Hawk in December 1903 lasted only twelve seconds and covered approximately 120 feet. Although modest by any later standard, this brief flight marked a pivotal moment in human history, demonstrating for the first time that a heavier-than-air, engine-powered machine could sustain controlled flight. Within a decade, aircraft had been adapted for military reconnaissance, and within another generation, commercial aviation had transformed long-distance travel.`,
    question: `As used in the passage, "sustain" most nearly means`,
    choices: [
      { label: 'A', text: 'withstand' },
      { label: 'B', text: 'endure' },
      { label: 'C', text: 'maintain' },
      { label: 'D', text: 'support financially' },
    ],
    correctAnswer: 'C',
    explanation: `Choice C is correct. In this context, "sustain controlled flight" means to keep controlled flight going continuously. "Maintain" captures this meaning of keeping something ongoing or in operation.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. "Withstand" implies resisting a force, but the passage is about maintaining flight, not resisting anything.`,
      B: `Choice B is incorrect. "Endure" typically implies suffering through hardship, which does not fit the technical context of maintaining flight.`,
      D: `Choice D is incorrect. "Support financially" is another meaning of "sustain" but clearly does not fit the aeronautical context.`,
    },
  },

  {
    id: 'rw2e-03',
    section: 'reading-writing',
    moduleId: 'rw-module-2-easy',
    domain: 'Craft and Structure',
    skill: 'Words in Context',
    difficulty: 'easy',
    stimulus: `The author Octavia Butler began writing science fiction as a teenager, convinced that the genre could serve as a vehicle for exploring questions about race, power, and human nature that mainstream fiction often avoided. Her novels frequently feature protagonists navigating societies built on rigid hierarchies of dominance, forcing readers to examine how systems of oppression function and what resistance to them might look like. Butler received the prestigious MacArthur Fellowship in 1995, the first science fiction writer to be so honored.`,
    question: `As used in the passage, "vehicle" most nearly means`,
    choices: [
      { label: 'A', text: 'means' },
      { label: 'B', text: 'automobile' },
      { label: 'C', text: 'obstacle' },
      { label: 'D', text: 'reward' },
    ],
    correctAnswer: 'A',
    explanation: `Choice A is correct. Butler saw science fiction as a "vehicle" for exploring social questions, meaning she used the genre as a method or means of inquiry. "Means" accurately captures this figurative usage.`,
    wrongAnswerExplanations: {
      B: `Choice B is incorrect. The passage is using "vehicle" figuratively; there is no literal automobile in context.`,
      C: `Choice C is incorrect. "Obstacle" is the opposite of what Butler intended; she saw the genre as an enabler, not a barrier.`,
      D: `Choice D is incorrect. "Reward" has no connection to the meaning of "vehicle" in this context.`,
    },
  },

  {
    id: 'rw2e-04',
    section: 'reading-writing',
    moduleId: 'rw-module-2-easy',
    domain: 'Craft and Structure',
    skill: 'Words in Context',
    difficulty: 'medium',
    stimulus: `The discovery of deep-sea hydrothermal vents in 1977 upended long-standing assumptions about the preconditions for life. Before this discovery, biologists generally held that all ecosystems ultimately depended on photosynthesis and sunlight. The vent communities, however, thrive in total darkness, at crushing pressures, and in water laced with toxic hydrogen sulfide. They derive energy not from the sun but from chemosynthesis — the metabolic conversion of chemical compounds by microorganisms at the base of the food web.`,
    question: `As used in the passage, "upended" most nearly means`,
    choices: [
      { label: 'A', text: 'confirmed' },
      { label: 'B', text: 'complicated' },
      { label: 'C', text: 'overturned' },
      { label: 'D', text: 'refined' },
    ],
    correctAnswer: 'C',
    explanation: `Choice C is correct. The discovery of hydrothermal vent communities did not merely complicate or refine the assumption that life depends on sunlight — it completely disproved it. "Overturned" conveys this total reversal accurately.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. "Confirmed" means supported or validated, which is the opposite of what the discovery did to prior assumptions.`,
      B: `Choice B is incorrect. "Complicated" suggests the assumptions became more nuanced, but the passage implies they were shown to be fundamentally wrong.`,
      D: `Choice D is incorrect. "Refined" implies minor adjustment, not the radical challenge the discovery represented.`,
    },
  },

  {
    id: 'rw2e-05',
    section: 'reading-writing',
    moduleId: 'rw-module-2-easy',
    domain: 'Craft and Structure',
    skill: 'Words in Context',
    difficulty: 'medium',
    stimulus: `The philosopher Hannah Arendt coined the phrase "the banality of evil" following her coverage of the 1961 trial of Adolf Eichmann, the Nazi official responsible for organizing deportations to concentration camps. Arendt was struck by Eichmann's ordinariness: he did not appear to be a monster but rather a bureaucrat who had simply followed orders without engaging his moral faculties. Her argument that evil can emerge not from malice but from the absence of independent thought proved deeply controversial.`,
    question: `As used in the passage, "banality" most nearly means`,
    choices: [
      { label: 'A', text: 'cruelty' },
      { label: 'B', text: 'complexity' },
      { label: 'C', text: 'ordinariness' },
      { label: 'D', text: 'secrecy' },
    ],
    correctAnswer: 'C',
    explanation: `Choice C is correct. Arendt's phrase "banality of evil" refers to the idea that evil can be mundane rather than spectacular — the product of thoughtless compliance by ordinary people. "Ordinariness" best captures "banality," which the passage defines through its description of Eichmann as unremarkable.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. Arendt's point was precisely that the evil she observed was not characterized by obvious cruelty or malice.`,
      B: `Choice B is incorrect. "Complexity" suggests difficulty or intricacy, which contradicts the passage's emphasis on thoughtlessness and mundaneness.`,
      D: `Choice D is incorrect. "Secrecy" has no connection to the passage's discussion of Eichmann's public trial and bureaucratic behavior.`,
    },
  },

  // ── Text Structure and Purpose (3) ─────────────────────────────────────────

  {
    id: 'rw2e-06',
    section: 'reading-writing',
    moduleId: 'rw-module-2-easy',
    domain: 'Craft and Structure',
    skill: 'Text Structure and Purpose',
    difficulty: 'easy',
    stimulus: `The monarch butterfly undertakes one of the most remarkable migrations in the animal kingdom, traveling up to 3,000 miles from its summer habitat in the United States and Canada to overwintering sites in the forests of central Mexico. No individual butterfly makes this round trip — it takes multiple generations to complete the journey north in spring. What scientists find most astonishing is that the southbound generation, which has never made the trip before, navigates to the same specific mountain forests their great-grandparents left months earlier.`,
    question: `The main purpose of the passage is to`,
    choices: [
      { label: 'A', text: 'explain why monarch butterfly populations have declined in recent decades' },
      { label: 'B', text: 'describe an extraordinary navigational ability in monarch butterflies' },
      { label: 'C', text: 'compare monarch butterfly migration to that of other migratory insects' },
      { label: 'D', text: 'argue that monarch butterflies should receive federal protection' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is correct. The passage describes the monarch butterfly's long-distance migration and emphasizes what scientists find most remarkable — that butterflies with no prior experience navigate to the same specific destination. The overall purpose is to convey how extraordinary this navigational feat is.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. The passage does not mention population decline.`,
      C: `Choice C is incorrect. The passage focuses exclusively on monarch butterflies without comparing them to other insects.`,
      D: `Choice D is incorrect. The passage is purely descriptive and makes no policy argument.`,
    },
  },

  {
    id: 'rw2e-07',
    section: 'reading-writing',
    moduleId: 'rw-module-2-easy',
    domain: 'Craft and Structure',
    skill: 'Text Structure and Purpose',
    difficulty: 'easy',
    stimulus: `Permafrost — ground that remains frozen for at least two consecutive years — covers approximately 15% of the Northern Hemisphere's land surface. In recent decades, rising temperatures in the Arctic have caused widespread permafrost thaw, destabilizing infrastructure such as roads and buildings constructed on what was once solid frozen ground. The thaw also releases carbon dioxide and methane that had been locked in frozen organic matter for millennia, creating a feedback loop in which warming causes thaw, which releases greenhouse gases, which causes further warming.`,
    underlineTargets: ['feedback loop'],
    question: `The underlined phrase "feedback loop" primarily serves to`,
    choices: [
      { label: 'A', text: 'describe a self-reinforcing cycle in which thaw amplifies the warming that caused it' },
      { label: 'B', text: 'suggest that permafrost thaw can be reversed through climate intervention' },
      { label: 'C', text: 'compare the effects of permafrost thaw to those of ocean warming' },
      { label: 'D', text: 'define permafrost as a source of renewable energy' },
    ],
    correctAnswer: 'A',
    explanation: `Choice A is correct. The passage explains the feedback loop immediately after naming it: warming → thaw → greenhouse gas release → more warming. The phrase introduces the concept of a self-amplifying cycle, and choice B accurately describes what the passage defines.`,
    wrongAnswerExplanations: {
      B: `Choice B is incorrect. The passage does not discuss reversing permafrost thaw; the feedback loop is presented as a danger, not a solution.`,
      C: `Choice C is incorrect. The passage does not compare permafrost thaw to ocean warming.`,
      D: `Choice D is incorrect. The passage does not mention energy; the greenhouse gases released are described as a climate hazard.`,
    },
  },

  {
    id: 'rw2e-08',
    section: 'reading-writing',
    moduleId: 'rw-module-2-easy',
    domain: 'Craft and Structure',
    skill: 'Text Structure and Purpose',
    difficulty: 'medium',
    stimulus: `Until the late nineteenth century, most medical practitioners believed that diseases were caused by "miasma" — noxious vapors arising from decaying organic matter. This theory seemed to explain why disease rates were higher in swampy, foul-smelling areas. The germ theory of disease, developed by scientists including Louis Pasteur and Robert Koch, gradually displaced the miasma theory by demonstrating that specific microorganisms cause specific diseases. The shift required not only new evidence but also a fundamental reconceptualization of what disease is and how it spreads.`,
    question: `The passage is primarily organized to`,
    choices: [
      { label: 'A', text: 'argue that the germ theory of disease has important limitations' },
      { label: 'B', text: 'warn readers about the continued dangers of miasma in urban environments' },
      { label: 'C', text: 'explain the experimental methods Pasteur and Koch used in their research' },
      { label: 'D', text: 'describe how one scientific theory replaced another and what that transition involved' },
    ],
    correctAnswer: 'D',
    explanation: `Choice D is correct. The passage traces a historical transition from miasma theory to germ theory, notes why the old theory seemed plausible, and concludes that the shift required both new evidence and new conceptual frameworks. This is a description of one theory replacing another.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. The passage does not critique germ theory or suggest it has weaknesses.`,
      C: `Choice C is incorrect. The passage mentions Pasteur and Koch but does not describe their experimental methods.`,
      B: `Choice B is incorrect. The passage presents miasma theory as a historical belief that was replaced, not as a current threat.`,
    },
  },

  // ── Cross-Text Connections (2) ─────────────────────────────────────────────

  {
    id: 'rw2e-09',
    section: 'reading-writing',
    moduleId: 'rw-module-2-easy',
    domain: 'Craft and Structure',
    skill: 'Cross-Text Connections',
    difficulty: 'easy',
    stimulus: `Text 1: Proponents of a four-day workweek argue that reducing working hours increases employee wellbeing, decreases burnout, and ultimately raises productivity by allowing workers to return to their tasks more refreshed. Several pilot programs in Iceland and New Zealand found that output was maintained or improved even when employees worked one day less per week.

Text 2: Critics caution that results from four-day workweek trials may not be broadly applicable. Many of the most successful trials involved knowledge workers in office settings whose output is difficult to measure, and whose workflow can be restructured more easily than that of hourly workers in manufacturing or healthcare. Generalizing from these results to the entire economy may therefore be premature.`,
    question: `Based on the passages, the author of Text 2 would most likely respond to the pilot program results mentioned in Text 1 by arguing that`,
    choices: [
      { label: 'A', text: 'the pilot programs were conducted unethically and their data should be discarded' },
      { label: 'B', text: 'the results, while valid in their context, may not apply to all types of workers' },
      { label: 'C', text: 'employee wellbeing is not a legitimate factor in workplace policy decisions' },
      { label: 'D', text: 'productivity always declines when workers have fewer hours in the office' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is correct. Text 2 does not dispute that the pilot programs produced positive results; it argues that those results came from contexts (knowledge workers in office settings) that may not represent the broader economy. This is a methodological concern about generalizability, not a rejection of the data.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. Text 2 raises no ethical objections to the pilot programs.`,
      C: `Choice C is incorrect. Text 2 does not challenge employee wellbeing as a relevant factor; it questions whether pilot results generalize across worker types.`,
      D: `Choice D is incorrect. Text 2 actually acknowledges that the trials showed maintained or improved productivity — it just questions whether this result generalizes.`,
    },
  },

  {
    id: 'rw2e-10',
    section: 'reading-writing',
    moduleId: 'rw-module-2-easy',
    domain: 'Craft and Structure',
    skill: 'Cross-Text Connections',
    difficulty: 'medium',
    stimulus: `Text 1: Advocates of social media literacy education argue that teaching young people to identify misinformation, evaluate sources, and understand algorithmic content curation should be a core part of the school curriculum. They contend that digital literacy is now as fundamental as reading and writing for informed citizenship.

Text 2: While social media literacy programs sound appealing in principle, researchers have found that brief classroom interventions produce only modest improvements in students' ability to detect false information, and that these gains often fade quickly after the instruction ends. More structural solutions — including platform regulation and algorithmic transparency requirements — may be necessary to address misinformation at scale.`,
    question: `The authors of Text 1 and Text 2 would most likely agree that`,
    choices: [
      { label: 'A', text: 'misinformation on social media poses no meaningful threat to democratic society' },
      { label: 'B', text: 'platform regulation is the most effective response to online misinformation' },
      { label: 'C', text: 'addressing the spread of misinformation online is an important societal concern' },
      { label: 'D', text: 'social media literacy programs should be permanently removed from school curricula' },
    ],
    correctAnswer: 'C',
    explanation: `Choice C is correct. Text 1 argues for media literacy education because misinformation is a serious problem; Text 2 also treats misinformation as a problem serious enough to require structural solutions. Both texts share the premise that misinformation is a significant concern worth addressing.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. Both texts treat misinformation as a genuine problem, not a trivial one.`,
      B: `Choice B is incorrect. Text 2 suggests structural solutions may be necessary, but Text 1 does not address platform regulation, so there is no agreement on this point.`,
      D: `Choice D is incorrect. Text 2 criticizes the effectiveness of brief interventions but does not call for removing literacy programs entirely.`,
    },
  },

  // ── Central Ideas and Details (3) ─────────────────────────────────────────

  {
    id: 'rw2e-11',
    section: 'reading-writing',
    moduleId: 'rw-module-2-easy',
    domain: 'Information and Ideas',
    skill: 'Central Ideas and Details',
    difficulty: 'easy',
    stimulus: `The Great Barrier Reef, located off the northeastern coast of Australia, is the world's largest coral reef system and is visible from space. It supports extraordinary biodiversity, providing habitat for more than 1,500 species of fish, 4,000 species of mollusks, and hundreds of species of coral. The reef faces serious threats from rising ocean temperatures, which cause coral bleaching, as well as from agricultural runoff that increases algae growth and reduces water clarity. Conservation efforts include water quality improvements and programs to remove the predatory crown-of-thorns starfish that consumes coral tissue.`,
    question: `Which choice best states the main idea of the passage?`,
    choices: [
      { label: 'A', text: 'The Great Barrier Reef is the only coral reef system threatened by climate change.' },
      { label: 'B', text: 'The Great Barrier Reef is a biodiverse ecosystem facing multiple environmental threats.' },
      { label: 'C', text: 'Crown-of-thorns starfish are the primary cause of coral decline in the Great Barrier Reef.' },
      { label: 'D', text: 'Conservation efforts have successfully reversed the decline of the Great Barrier Reef.' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is correct. The passage describes the reef's remarkable biodiversity and then identifies multiple threats — temperature rise, runoff, and starfish predation. Together these two elements define the main idea: the reef is biologically rich but under pressure from various environmental factors.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. The passage does not claim the Great Barrier Reef is the only reef threatened by climate change.`,
      C: `Choice C is incorrect. Starfish are mentioned as one of several threats; the passage names rising temperatures and agricultural runoff as well.`,
      D: `Choice D is incorrect. The passage mentions conservation efforts but does not claim they have been successful.`,
    },
  },

  {
    id: 'rw2e-12',
    section: 'reading-writing',
    moduleId: 'rw-module-2-easy',
    domain: 'Information and Ideas',
    skill: 'Central Ideas and Details',
    difficulty: 'easy',
    stimulus: `Isaac Newton developed the laws of motion and universal gravitation in the mid-seventeenth century, providing a mathematical framework that explained both the motion of objects on Earth and the orbits of celestial bodies. For more than two centuries, Newton's laws were regarded as the complete and final description of physical reality. Albert Einstein's theories of special and general relativity, published in 1905 and 1915, revealed that Newtonian mechanics was not wrong but rather a special case of a more comprehensive framework, accurate at everyday speeds but requiring correction at velocities approaching the speed of light.`,
    question: `According to the passage, Einstein's theories`,
    choices: [
      { label: 'A', text: "proved that Newton's laws of motion were entirely incorrect" },
      { label: 'B', text: "showed that Newton's laws were accurate only for very slow-moving objects" },
      { label: 'C', text: 'expanded the framework of physics by showing that Newtonian mechanics was a limited special case' },
      { label: 'D', text: 'were developed as a direct response to experimental evidence that contradicted Newton' },
    ],
    correctAnswer: 'C',
    explanation: `Choice C is correct. The passage explicitly states that Einstein revealed Newtonian mechanics to be "not wrong but rather a special case of a more comprehensive framework." Choice C paraphrases this accurately.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. The passage explicitly says Newton's laws were "not wrong," contradicting this choice.`,
      B: `Choice B is incorrect. The passage says Newtonian mechanics requires "correction at velocities approaching the speed of light," implying it works well at everyday speeds, not only for very slow objects.`,
      D: `Choice D is incorrect. The passage does not describe the motivation behind Einstein's work or mention any experimental contradiction of Newton.`,
    },
  },

  {
    id: 'rw2e-13',
    section: 'reading-writing',
    moduleId: 'rw-module-2-easy',
    domain: 'Information and Ideas',
    skill: 'Central Ideas and Details',
    difficulty: 'medium',
    stimulus: `Oral traditions served as the primary means of preserving historical memory, legal precedent, genealogy, and cultural values in societies without writing systems. Trained oral specialists, sometimes called griots in West African cultures or skalds in Norse tradition, memorized vast bodies of material and transmitted it across generations with remarkable accuracy. Modern studies of oral tradition have challenged assumptions that written texts are inherently more reliable than spoken ones, demonstrating that skilled oral performers can maintain textual integrity across centuries through mnemonic techniques, communal checking, and performance conventions.`,
    question: `Which of the following, if true, would most directly support the passage's claim that oral tradition can preserve texts with remarkable accuracy?`,
    choices: [
      { label: 'A', text: 'A researcher comparing multiple oral performances of a traditional epic across different communities finds that core narrative elements and key phrases remain consistent.' },
      { label: 'B', text: 'Literate societies tend to have more extensive archives than oral societies.' },
      { label: 'C', text: 'Some oral traditions have been lost when the last trained performers died without successors.' },
      { label: 'D', text: 'Written records are more easily reproduced and distributed than oral performances.' },
    ],
    correctAnswer: 'A',
    explanation: `Choice A is correct. If multiple oral performances of the same text in different communities preserve the same core elements and phrases, this directly supports the claim that skilled oral performers maintain textual integrity across time and place.`,
    wrongAnswerExplanations: {
      B: `Choice B is incorrect. Comparing archive sizes between literate and oral societies says nothing about the accuracy of oral transmission.`,
      C: `Choice C is incorrect. This example shows that oral traditions can be lost, which does not support their accuracy as a transmission mechanism.`,
      D: `Choice D is incorrect. Advantages of written reproduction are unrelated to whether oral tradition can preserve texts accurately.`,
    },
  },

  // ── Command of Evidence (4) ────────────────────────────────────────────────

  {
    id: 'rw2e-14',
    section: 'reading-writing',
    moduleId: 'rw-module-2-easy',
    domain: 'Information and Ideas',
    skill: 'Command of Evidence',
    difficulty: 'easy',
    stimulus: `A student is writing an essay arguing that regular physical exercise improves academic performance in middle school students. Which quotation from a study would most directly support this claim?`,
    question: `Which quotation from a study would most directly support the claim that regular exercise improves academic performance in middle school students?`,
    choices: [
      { label: 'A', text: '"Students who participate in organized sports report higher levels of social belonging and school spirit."' },
      { label: 'B', text: '"Physical education classes in middle schools have been reduced in many districts due to budget constraints."' },
      { label: 'C', text: '"Middle school students who exercised at least 30 minutes daily showed GPA improvements averaging 0.4 points compared to sedentary peers."' },
      { label: 'D', text: '"Adult workers who exercise regularly report reduced absenteeism and higher job satisfaction."' },
    ],
    correctAnswer: 'C',
    explanation: `Choice C is correct. This quotation directly measures the relationship between daily exercise and GPA in middle school students, which is precisely the claim the student wants to support.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. Social belonging and school spirit are not measures of academic performance.`,
      B: `Choice B is incorrect. This describes a policy trend, not evidence of a relationship between exercise and academic outcomes.`,
      D: `Choice D is incorrect. Adult workers are not middle school students, so this evidence does not directly support the specific claim.`,
    },
  },

  {
    id: 'rw2e-15',
    section: 'reading-writing',
    moduleId: 'rw-module-2-easy',
    domain: 'Information and Ideas',
    skill: 'Command of Evidence',
    difficulty: 'easy',
    stimulus: `A researcher studying ocean plastic pollution wants to support the claim that single-use plastic packaging is the largest source of ocean plastic. Which evidence would most directly support this claim?`,
    question: `Which evidence would most directly support the claim that single-use plastic packaging is the largest source of ocean plastic?`,
    choices: [
      { label: 'A', text: 'A study finding that fishing gear accounts for 46% of the Great Pacific Garbage Patch by weight' },
      { label: 'B', text: 'Survey data showing that 68% of ocean plastic debris consists of single-use packaging items such as bottles and bags' },
      { label: 'C', text: 'An analysis showing that plastic production has increased 200-fold since the 1950s' },
      { label: 'D', text: 'A report estimating that 8 million metric tons of plastic enter the ocean each year' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is correct. This evidence directly states that the largest category of ocean plastic debris is single-use packaging, which is exactly what the researcher wants to demonstrate.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. This finding would actually challenge the claim, suggesting fishing gear — not packaging — is the largest source.`,
      C: `Choice C is incorrect. Overall plastic production trends do not specify what share comes from single-use packaging or how much reaches the ocean.`,
      D: `Choice D is incorrect. The total volume of ocean plastic does not specify whether single-use packaging is the dominant source.`,
    },
  },

  {
    id: 'rw2e-16',
    section: 'reading-writing',
    moduleId: 'rw-module-2-easy',
    domain: 'Information and Ideas',
    skill: 'Command of Evidence',
    difficulty: 'medium',
    stimulus: `A student writing a paper on renewable energy adoption wants to argue that solar energy installation has grown dramatically in the United States over the past decade. The table below shows annual solar capacity added in the U.S.

Year | Solar Capacity Added (GW)
2013 | 4.8
2015 | 7.6
2017 | 10.6
2019 | 13.3
2021 | 23.6
2023 | 32.4`,
    question: `Which statement best uses the data in the table to support the student's argument?`,
    choices: [
      { label: 'A', text: 'In 2021, the United States added 23.6 GW of solar capacity.' },
      { label: 'B', text: 'The United States added more solar capacity in 2023 than in 2021.' },
      { label: 'C', text: 'Solar energy capacity increased between 2017 and 2019.' },
      { label: 'D', text: 'Solar capacity added annually in the U.S. increased nearly sevenfold between 2013 and 2023.' },
    ],
    correctAnswer: 'D',
    explanation: `Choice D is correct. The table shows growth from 4.8 GW in 2013 to 32.4 GW in 2023 — nearly a sevenfold increase over the decade. This single statistic most powerfully conveys the dramatic growth the student wants to demonstrate.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. Citing one year's data point without context does not demonstrate a trend of dramatic growth.`,
      C: `Choice C is incorrect. A two-year comparison shows a small increase and does not establish the dramatic decade-long growth trend the student wants to argue.`,
      B: `Choice B is incorrect. A two-year comparison between 2021 and 2023 does not capture the full scope of decade-long growth.`,
    },
  },

  {
    id: 'rw2e-17',
    section: 'reading-writing',
    moduleId: 'rw-module-2-easy',
    domain: 'Information and Ideas',
    skill: 'Command of Evidence',
    difficulty: 'medium',
    stimulus: `A philosopher writing about the ethics of artificial intelligence wants to support the claim that AI systems can perpetuate existing social biases rather than eliminating them. Which quotation from a research report would most directly support this claim?`,
    question: `Which quotation from a research report would most directly support the claim that AI systems can perpetuate existing social biases?`,
    choices: [
      { label: 'A', text: '"The processing speed of modern AI systems has increased by a factor of one million over the past two decades."' },
      { label: 'B', text: '"Researchers have proposed several mathematical frameworks for defining and measuring algorithmic fairness."' },
      { label: 'C', text: '"AI-assisted hiring tools have been adopted by 67% of Fortune 500 companies since 2018."' },
      { label: 'D', text: '"A facial recognition system trained on a dataset that underrepresented darker-skinned faces had an error rate five times higher for darker-skinned women than for lighter-skinned men."' },
    ],
    correctAnswer: 'D',
    explanation: `Choice D is correct. This quotation shows a specific AI system exhibiting differential accuracy based on race and gender — a direct demonstration that AI can perpetuate bias when trained on unrepresentative data.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. Processing speed is unrelated to bias in AI outputs.`,
      C: `Choice C is incorrect. The adoption rate of AI hiring tools says nothing about whether those tools perpetuate bias.`,
      B: `Choice B is incorrect. Proposing frameworks for measuring fairness is a response to bias, not direct evidence of bias in AI systems.`,
    },
  },

  // ── Inferences (3) ────────────────────────────────────────────────────────

  {
    id: 'rw2e-18',
    section: 'reading-writing',
    moduleId: 'rw-module-2-easy',
    domain: 'Information and Ideas',
    skill: 'Inferences',
    difficulty: 'easy',
    stimulus: `The International Space Station (ISS) orbits Earth at an altitude of approximately 400 kilometers, completing one orbit every 90 minutes. Crew members aboard the station experience roughly 16 sunrises and sunsets per 24-hour period. The station relies entirely on solar panels for electrical power, but during portions of each orbit when the station passes through Earth's shadow, battery reserves supply the needed electricity. Because of the station's altitude and speed, crew members are in a state of continuous free fall around Earth, which is what produces the sensation of weightlessness.`,
    question: `Based on the passage, it can most reasonably be inferred that the ISS crew experiences weightlessness because`,
    choices: [
      { label: 'A', text: 'the station is too far from Earth for gravity to have any effect' },
      { label: 'B', text: 'the station and crew are in continuous free fall around Earth' },
      { label: 'C', text: 'the solar panels reduce the gravitational force on the station' },
      { label: 'D', text: 'traveling at high speed counteracts the effects of gravity completely' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is correct. The passage explicitly states that crew members are "in a state of continuous free fall around Earth, which is what produces the sensation of weightlessness." This is directly stated in the passage, making it the correct inference.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. The passage does not say gravity has no effect; in fact, continuous free fall requires gravity to be present.`,
      C: `Choice C is incorrect. Solar panels are mentioned only as a power source; there is no suggestion they affect gravity.`,
      D: `Choice D is incorrect. The passage says weightlessness comes from free fall, not from speed counteracting gravity.`,
    },
  },

  {
    id: 'rw2e-19',
    section: 'reading-writing',
    moduleId: 'rw-module-2-easy',
    domain: 'Information and Ideas',
    skill: 'Inferences',
    difficulty: 'easy',
    stimulus: `The cassowary, a large flightless bird native to the tropical rainforests of New Guinea and northeastern Australia, is often described as the world's most dangerous bird. Its powerful legs can deliver kicks with enough force to cause serious injury, and the dagger-like casque on its head can be used as a weapon. Despite this fearsome reputation, cassowaries are shy animals that retreat when they can and attack humans only when cornered, provoked, or defending their young.`,
    question: `Based on the passage, it can most reasonably be inferred that cassowary attacks on humans`,
    choices: [
      { label: 'A', text: 'are most likely to happen when humans threaten the birds or their offspring' },
      { label: 'B', text: 'occur primarily in urban areas where cassowaries have lost their fear of humans' },
      { label: 'C', text: 'are a frequent and unpredictable danger for rainforest residents' },
      { label: 'D', text: 'occur only in Australia, not in New Guinea' },
    ],
    correctAnswer: 'A',
    explanation: `Choice A is correct. The passage states cassowaries "attack humans only when cornered, provoked, or defending their young." This directly supports the inference that attacks are most likely when humans pose a threat to the birds or their offspring.`,
    wrongAnswerExplanations: {
      B: `Choice B is incorrect. The passage says cassowaries live in rainforests and are shy; there is no mention of urban areas.`,
      C: `Choice C is incorrect. The passage describes cassowaries as shy animals that avoid humans when possible, suggesting attacks are not frequent or random.`,
      D: `Choice D is incorrect. The passage says cassowaries live in both New Guinea and Australia, with no geographic restriction on attacks.`,
    },
  },

  {
    id: 'rw2e-20',
    section: 'reading-writing',
    moduleId: 'rw-module-2-easy',
    domain: 'Information and Ideas',
    skill: 'Inferences',
    difficulty: 'medium',
    stimulus: `The novelist George Eliot — the pen name of Mary Ann Evans — chose a male pseudonym for her literary debut in 1857, a period when women's writing was routinely dismissed as sentimental or trivial. Her decision proved effective: her first novel received critical praise without the handicap of gendered expectations, and reviewers speculated about which male author had produced it. When her identity became known, she was already an established literary figure, and the revelation prompted widespread reassessment of assumptions about the capacities of women writers.`,
    question: `Based on the passage, it can most reasonably be inferred that Eliot adopted a male pseudonym because`,
    choices: [
      { label: 'A', text: 'she preferred the name George Eliot to her own name for personal reasons' },
      { label: 'B', text: 'male authors received higher payment from publishers than female authors did' },
      { label: 'C', text: 'women were legally prohibited from publishing novels in the nineteenth century' },
      { label: 'D', text: 'she believed reviewers would evaluate her work more fairly without knowing her gender' },
    ],
    correctAnswer: 'D',
    explanation: `Choice D is correct. The passage explains that women's writing was "routinely dismissed" and that Eliot's decision "proved effective" because reviewers praised the work without gendered expectations. This strongly implies she used a male name to avoid the bias that would have come with being identified as a woman writer.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. The passage makes clear the choice was strategic, not personal.`,
      C: `Choice C is incorrect. The passage describes social prejudice, not legal prohibition against women publishing.`,
      B: `Choice B is incorrect. The passage does not mention payment differences; the issue is critical reception, not financial compensation.`,
    },
  },

  // ── Rhetorical Synthesis (2) ──────────────────────────────────────────────

  {
    id: 'rw2e-21',
    section: 'reading-writing',
    moduleId: 'rw-module-2-easy',
    domain: 'Expression of Ideas',
    skill: 'Rhetorical Synthesis',
    difficulty: 'easy',
    stimulus: `A student is writing a report about the history of vaccines and has gathered the following notes:
• Edward Jenner developed the smallpox vaccine in 1796 using cowpox material.
• The polio vaccine, developed by Jonas Salk, was introduced in 1955 and led to a dramatic reduction in polio cases.
• The measles vaccine, introduced in 1963, reduced annual U.S. measles cases from roughly 500,000 to under 100 within two decades.
• mRNA vaccine technology, used in COVID-19 vaccines developed in 2020, represented a new approach that could be adapted quickly to emerging viruses.`,
    question: `The student wants to write a sentence introducing the historical development of vaccines over time. Which choice most effectively uses the notes to accomplish this goal?`,
    choices: [
      { label: 'A', text: 'The smallpox vaccine was developed by Edward Jenner in 1796.' },
      { label: 'B', text: 'mRNA vaccines represent the most innovative development in vaccine history.' },
      { label: 'C', text: 'The measles vaccine reduced U.S. cases from approximately 500,000 to under 100 annually within two decades.' },
      { label: 'D', text: 'Vaccines have evolved from Jenner\'s eighteenth-century smallpox preparation to twenty-first-century mRNA technology, achieving major reductions in disease along the way.' },
    ],
    correctAnswer: 'D',
    explanation: `Choice D is correct. The student's goal is to introduce historical development over time. Only choice B spans the full historical range described in the notes (from 1796 to 2020) and captures the arc of progress, making it the most effective introductory sentence.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. It covers only the earliest vaccine and does not introduce the broader historical development the student wants to describe.`,
      C: `Choice C is incorrect. It covers only the measles vaccine detail and does not convey a historical trajectory.`,
      B: `Choice B is incorrect. It makes an evaluative claim about mRNA vaccines without introducing the broader sweep of vaccine history.`,
    },
  },

  {
    id: 'rw2e-22',
    section: 'reading-writing',
    moduleId: 'rw-module-2-easy',
    domain: 'Expression of Ideas',
    skill: 'Rhetorical Synthesis',
    difficulty: 'medium',
    stimulus: `A student is preparing a presentation on the economic effects of remote work and has gathered the following notes:
• Remote workers save an average of $4,000–$6,500 per year on commuting costs, work clothing, and lunches.
• Employers who allow remote work report average annual savings of $11,000 per remote employee in reduced office space costs.
• Cities with high concentrations of remote workers have seen increased spending in suburban commercial districts as workers frequent local businesses.
• Some workers who moved to lower-cost areas during the pandemic reported increased purchasing power despite similar salaries.`,
    question: `The student wants to highlight that remote work has produced economic benefits for multiple parties. Which choice most effectively uses the notes to accomplish this goal?`,
    choices: [
      { label: 'A', text: 'Remote workers can save thousands of dollars annually by eliminating commuting and related expenses.' },
      { label: 'B', text: 'Remote work has generated economic benefits for individual workers, employers, and local communities.' },
      { label: 'C', text: 'Employers save approximately $11,000 per year for each employee who works remotely.' },
      { label: 'D', text: 'During the pandemic, many workers moved to lower-cost areas and experienced increased purchasing power.' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is correct. The student wants to show that multiple parties benefit. Only choice B encompasses all three groups identified in the notes — workers (savings and purchasing power), employers (office cost savings), and communities (suburban commercial activity).`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. It addresses only the benefits to individual workers, omitting employers and communities.`,
      C: `Choice C is incorrect. It addresses only the benefits to employers.`,
      D: `Choice D is incorrect. It addresses only one specific worker benefit and does not capture benefits for employers or communities.`,
    },
  },

  // ── Transitions (2) ──────────────────────────────────────────────────────

  {
    id: 'rw2e-23',
    section: 'reading-writing',
    moduleId: 'rw-module-2-easy',
    domain: 'Expression of Ideas',
    skill: 'Transitions',
    difficulty: 'easy',
    stimulus: `Many species of migratory birds navigate using the Earth's magnetic field, detecting it through specialized cells in their eyes. _______, some species also use the positions of stars and the angle of the setting sun as navigational cues.`,
    question: `Which choice completes the text with the most logical transition?`,
    choices: [
      { label: 'A', text: 'Therefore' },
      { label: 'B', text: 'As a result' },
      { label: 'C', text: 'However' },
      { label: 'D', text: 'In addition' },
    ],
    correctAnswer: 'D',
    explanation: `Choice D is correct. The passage describes one navigational method (magnetic field) and then adds another (stars and sun). "In addition" signals the addition of a supplementary point, which is the relationship between the two sentences.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. "Therefore" signals a logical conclusion drawn from the preceding statement, but the second sentence adds a different method rather than drawing a conclusion.`,
      C: `Choice C is incorrect. "However" signals contrast, but using stars as a navigational cue does not contradict using magnetic fields.`,
      B: `Choice B is incorrect. "As a result" signals causation, implying that magnetic field detection causes star navigation, which is illogical.`,
    },
  },

  {
    id: 'rw2e-24',
    section: 'reading-writing',
    moduleId: 'rw-module-2-easy',
    domain: 'Expression of Ideas',
    skill: 'Transitions',
    difficulty: 'medium',
    stimulus: `The original manuscript of Mary Shelley's Frankenstein shows extensive edits and corrections in a second handwriting, widely believed to be that of her husband Percy Bysshe Shelley. Some scholars interpret this collaboration as evidence that Percy co-authored the novel. _______, the bulk of the creative work, including the central ideas, narrative structure, and most of the prose, is generally attributed to Mary Shelley by scholars who have studied the manuscript carefully.`,
    question: `Which choice completes the text with the most logical transition?`,
    choices: [
      { label: 'A', text: 'In addition' },
      { label: 'B', text: 'For instance' },
      { label: 'C', text: 'Nevertheless' },
      { label: 'D', text: 'As a result' },
    ],
    correctAnswer: 'C',
    explanation: `Choice C is correct. The second sentence concedes that some scholars see co-authorship, then introduces a contrasting position: most scholars still attribute primary authorship to Mary Shelley. "Nevertheless" correctly signals this contrast — acknowledging the preceding point while introducing a counterpoint.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. "In addition" would add a parallel point, but the second sentence introduces a contrast to the co-authorship interpretation.`,
      B: `Choice B is incorrect. "For instance" introduces an example, but the final sentence is a counterargument, not an illustration.`,
      D: `Choice D is incorrect. "As a result" indicates causation, implying Percy's edits caused Mary's primary authorship to be recognized, which is not the logical relationship between the sentences.`,
    },
  },

  // ── Boundaries (2) ──────────────────────────────────────────────────────

  {
    id: 'rw2e-25',
    section: 'reading-writing',
    moduleId: 'rw-module-2-easy',
    domain: 'Standard English Conventions',
    skill: 'Boundaries',
    difficulty: 'easy',
    stimulus: `The platypus is one of the few venomous mammals in the world _______ males have spurs on their hind legs that can deliver a painful venom during mating season.`,
    question: `Which choice completes the text so that it conforms to the conventions of Standard English?`,
    choices: [
      { label: 'A', text: '; males have' },
      { label: 'B', text: ', males have' },
      { label: 'C', text: 'males have' },
      { label: 'D', text: 'and it has males that have' },
    ],
    correctAnswer: 'A',
    explanation: `Choice A is correct. The two clauses are both independent (each could stand as its own sentence). A semicolon is the correct way to join two independent clauses without a coordinating conjunction.`,
    wrongAnswerExplanations: {
      B: `Choice B is incorrect. Joining two independent clauses with only a comma creates a comma splice, which is a Standard English error.`,
      C: `Choice C is incorrect. Joining two independent clauses without any punctuation creates a run-on sentence.`,
      D: `Choice D is incorrect. This construction is grammatically awkward and changes the meaning unnecessarily.`,
    },
  },

  {
    id: 'rw2e-26',
    section: 'reading-writing',
    moduleId: 'rw-module-2-easy',
    domain: 'Standard English Conventions',
    skill: 'Boundaries',
    difficulty: 'medium',
    stimulus: `The physicist Richard Feynman was known not only for his groundbreaking contributions to quantum electrodynamics _______ also for his ability to explain complex scientific concepts in accessible, entertaining language.`,
    question: `Which choice completes the text so that it conforms to the conventions of Standard English?`,
    choices: [
      { label: 'A', text: 'but' },
      { label: 'B', text: '; but' },
      { label: 'C', text: ', but' },
      { label: 'D', text: '. But' },
    ],
    correctAnswer: 'A',
    explanation: `Choice A is correct. The sentence uses the correlative conjunction pair "not only...but also," which requires no additional punctuation between the two parallel elements. "Not only X but also Y" is a standard construction joining two phrases (not two independent clauses), so no semicolon or period is needed.`,
    wrongAnswerExplanations: {
      B: `Choice B is incorrect. A semicolon is used between two independent clauses, but "but also for his ability" is not an independent clause.`,
      C: `Choice C is incorrect. A comma before "but" is used in compound sentences joining two independent clauses, not in the "not only...but also" parallel structure.`,
      D: `Choice D is incorrect. A period would create a sentence fragment: "But also for his ability to explain complex scientific concepts" cannot stand alone.`,
    },
  },

  // ── Form, Structure, and Sense (1) ────────────────────────────────────────

  {
    id: 'rw2e-27',
    section: 'reading-writing',
    moduleId: 'rw-module-2-easy',
    domain: 'Standard English Conventions',
    skill: 'Form, Structure, and Sense',
    difficulty: 'medium',
    stimulus: `Each of the students in the advanced chemistry class _______ required to submit a detailed lab report documenting their experimental methodology and results.`,
    question: `Which choice completes the text so that it conforms to the conventions of Standard English?`,
    choices: [
      { label: 'A', text: 'are' },
      { label: 'B', text: 'is' },
      { label: 'C', text: 'were' },
      { label: 'D', text: 'have been' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is correct. The grammatical subject of the sentence is "Each," which is a singular indefinite pronoun. Despite the intervening prepositional phrase "of the students in the advanced chemistry class," the verb must agree with the singular subject "Each," requiring the singular verb "is."`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. "Are" is a plural verb, but the subject "Each" is singular.`,
      C: `Choice C is incorrect. "Were" is past tense; the sentence describes a current requirement, calling for present tense.`,
      D: `Choice D is incorrect. "Have been" is present perfect plural, which does not agree with the singular subject "Each."`,
    },
  },
]
