import type { RWQuestion } from './types'

// Reading and Writing Module 2 Easy — 27 questions (easier second module)

export const rwModule2EasyQuestions: RWQuestion[] = [

  // ── Words in Context (5) ────────────────────────────────────────────────────

  {
    id: 'rw2e-01',
    section: 'reading-writing',
    moduleId: 'rw-module-2-easy',
    domain: 'Craft and Structure',
    skill: 'Words in Context',
    difficulty: 'easy',
    stimulus: `The aurora borealis, also called the northern lights, is a natural light display in Earth's sky, predominantly seen in high-latitude regions. Charged particles from the sun interact with gases in the atmosphere, producing vivid curtains of green, red, and purple light. Though the phenomenon has long been the subject of scientific study, its beauty continues to draw travelers from around the world to remote Arctic destinations.`,
    question: `As used in the passage, "vivid" most nearly means`,
    choices: [
      { label: 'A', text: 'faint and delicate' },
      { label: 'B', text: 'intensely bright and colorful' },
      { label: 'C', text: 'difficult to see' },
      { label: 'D', text: 'scientifically significant' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is the best answer. The passage describes "curtains of green, red, and purple light," and the word "vivid" modifies these colors. In context, "vivid" means intensely bright and clear — the colors are striking and easily perceptible, which is why they draw travelers.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. "Faint and delicate" contradicts the dramatic quality described; vivid lights are the reason they attract visitors from afar.`,
      C: `Choice C is incorrect. The passage implies the lights are strikingly visible, not difficult to see.`,
      D: `Choice D is incorrect. "Scientifically significant" relates to the passage's mention of study, but "vivid" is a visual descriptor, not a scientific one.`,
    },
  },

  {
    id: 'rw2e-02',
    section: 'reading-writing',
    moduleId: 'rw-module-2-easy',
    domain: 'Craft and Structure',
    skill: 'Words in Context',
    difficulty: 'easy',
    stimulus: `In the early 1800s, Jane Austen's novels were published anonymously, credited simply to "A Lady." Austen herself was content with this arrangement, though her identity became an open secret among literary circles. Her novels, while set in the domestic world of country gentry, were remarkably astute in their observation of social pressures, marriage economics, and human vanity.`,
    question: `As used in the passage, "astute" most nearly means`,
    choices: [
      { label: 'A', text: 'harshly critical' },
      { label: 'B', text: 'perceptive and clever' },
      { label: 'C', text: 'widely celebrated' },
      { label: 'D', text: 'carefully written' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is the best answer. The passage says Austen's novels were "remarkably astute" in observing social pressures and human behavior. "Astute" means having sharp insight and good judgment — perceptive and clever. The passage praises her ability to see and render these dynamics clearly.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. While Austen's novels contain satire, "astute" describes her powers of observation, not a harsh critical tone.`,
      C: `Choice C is incorrect. "Widely celebrated" is about reception, not the quality of observation that "astute" describes.`,
      D: `Choice D is incorrect. "Carefully written" implies craft but misses the intellectual sharpness implied by "astute."`,
    },
  },

  {
    id: 'rw2e-03',
    section: 'reading-writing',
    moduleId: 'rw-module-2-easy',
    domain: 'Craft and Structure',
    skill: 'Words in Context',
    difficulty: 'easy',
    stimulus: `Scientists studying the sleeping habits of dolphins have discovered that dolphins are unihemispheric sleepers — they rest one half of the brain at a time while the other half remains alert. This allows dolphins to surface for air and remain vigilant for predators even while sleeping. The discovery has prompted new research into the neurological mechanisms that allow such divided consciousness.`,
    question: `As used in the passage, "vigilant" most nearly means`,
    choices: [
      { label: 'A', text: 'physically active' },
      { label: 'B', text: 'capable of swimming' },
      { label: 'C', text: 'watchful and alert' },
      { label: 'D', text: 'socially aware' },
    ],
    correctAnswer: 'C',
    explanation: `Choice C is the best answer. The passage describes dolphins keeping part of their brain active to surface and watch for predators. "Vigilant" means watchful and alert to danger, which is exactly the function the passage describes: staying aware of the environment even during sleep.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. Physical activity is not what is being described; the dolphins are sleeping while maintaining awareness.`,
      B: `Choice B is incorrect. The ability to swim is not what "vigilant" conveys in this context.`,
      D: `Choice D is incorrect. "Socially aware" relates to interpersonal perception, not the threat-monitoring described here.`,
    },
  },

  {
    id: 'rw2e-04',
    section: 'reading-writing',
    moduleId: 'rw-module-2-easy',
    domain: 'Craft and Structure',
    skill: 'Words in Context',
    difficulty: 'medium',
    stimulus: `The advent of the internet fundamentally altered the music industry. Before digital distribution, record labels served as indispensable intermediaries, controlling recording, production, and distribution. Streaming platforms have eroded this role, enabling artists to release music directly to audiences. Some musicians welcome this disintermediation as a form of creative liberation; others lament the collapse of advances and promotional infrastructure that labels once provided.`,
    question: `As used in the passage, "disintermediation" most nearly means`,
    choices: [
      { label: 'A', text: 'the elimination of middlemen from a distribution process' },
      { label: 'B', text: 'the digitization of audio recordings' },
      { label: 'C', text: 'a disagreement between artists and labels' },
      { label: 'D', text: 'the decline in music quality due to streaming' },
    ],
    correctAnswer: 'A',
    explanation: `Choice A is the best answer. The passage sets up the context: labels were "intermediaries" (middlemen) between artists and audiences. Streaming allowed artists to bypass labels and release directly to listeners. "Disintermediation" therefore refers to removing those intermediaries from the process — the elimination of middlemen.`,
    wrongAnswerExplanations: {
      B: `Choice B is incorrect. Digitization of recordings is a related but distinct concept; "disintermediation" specifically concerns the removal of intermediaries.`,
      C: `Choice C is incorrect. No disagreement between artists and labels is described; the word refers to a structural change in distribution.`,
      D: `Choice D is incorrect. The passage does not comment on quality changes; disintermediation refers to distribution structure.`,
    },
  },

  {
    id: 'rw2e-05',
    section: 'reading-writing',
    moduleId: 'rw-module-2-easy',
    domain: 'Craft and Structure',
    skill: 'Words in Context',
    difficulty: 'medium',
    stimulus: `Urban planners in the 1950s often celebrated the automobile as a symbol of modernity and progress, designing cities to accommodate the car rather than the pedestrian. Wide roads, sprawling parking lots, and limited sidewalks became hallmarks of post-war American urban design. Critics now argue that this approach was myopic, privileging short-term convenience over long-term livability, environmental health, and community cohesion.`,
    question: `As used in the passage, "myopic" most nearly means`,
    choices: [
      { label: 'A', text: 'overly expensive' },
      { label: 'B', text: 'short-sighted' },
      { label: 'C', text: 'poorly engineered' },
      { label: 'D', text: 'deliberately harmful' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is the best answer. The critics argue the car-centered approach privileged "short-term convenience over long-term livability" — this is the essence of myopia applied to planning. "Myopic" literally means nearsighted but figuratively means failing to consider long-term consequences, which is precisely the criticism described.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. Cost is not discussed in relation to this critique.`,
      C: `Choice C is incorrect. The critique concerns planning philosophy, not engineering quality.`,
      D: `Choice D is incorrect. The passage implies the planners believed they were making positive choices, not deliberately harmful ones.`,
    },
  },

  // ── Text Structure and Purpose (4) ─────────────────────────────────────────

  {
    id: 'rw2e-06',
    section: 'reading-writing',
    moduleId: 'rw-module-2-easy',
    domain: 'Craft and Structure',
    skill: 'Text Structure and Purpose',
    difficulty: 'easy',
    stimulus: `The mantis shrimp has one of the most complex visual systems of any known animal. While humans have three types of color-receptor cells (cones), the mantis shrimp has sixteen. Despite this, research published in 2014 revealed a paradox: mantis shrimp perform worse than humans on tasks requiring fine color discrimination. Scientists now believe the shrimp's visual system is optimized for speed of color recognition rather than precision — identifying a color category quickly rather than distinguishing subtle shades.`,
    question: `The primary purpose of the passage is to`,
    choices: [
      { label: 'A', text: 'argue that mantis shrimp have superior vision to humans' },
      { label: 'B', text: 'describe and resolve a seemingly contradictory finding about mantis shrimp vision' },
      { label: 'C', text: 'explain how color-receptor cells function in different species' },
      { label: 'D', text: 'compare the hunting techniques of mantis shrimp with those of other predators' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is the best answer. The passage sets up an apparent contradiction: mantis shrimp have far more color receptors than humans but perform worse at color discrimination. It then offers a resolution: their system is optimized for speed, not precision. The structure is "paradox + explanation," making B the most accurate description of the passage's purpose.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. The passage presents a case where mantis shrimp perform worse than humans on a visual task, not evidence of superiority.`,
      C: `Choice C is incorrect. The passage mentions cones only briefly as context; the focus is on the behavioral paradox.`,
      D: `Choice D is incorrect. Hunting is not discussed in the passage.`,
    },
  },

  {
    id: 'rw2e-07',
    section: 'reading-writing',
    moduleId: 'rw-module-2-easy',
    domain: 'Craft and Structure',
    skill: 'Text Structure and Purpose',
    difficulty: 'easy',
    stimulus: `Many historians consider the printing press, invented by Johannes Gutenberg around 1440, to be one of the most transformative technologies in human history. Before the press, books had to be copied by hand, making them rare and expensive. The press dramatically reduced production costs, making books accessible to a much wider population. This contributed to rising literacy rates, the spread of the Protestant Reformation, and the acceleration of the Scientific Revolution.`,
    question: `How does the author develop the main point of the passage?`,
    choices: [
      { label: 'A', text: 'By contrasting two competing historical interpretations' },
      { label: 'B', text: 'By describing a problem and then explaining why it was never solved' },
      { label: 'C', text: 'By identifying a technology and explaining its historical consequences' },
      { label: 'D', text: `By presenting a chronological account of Gutenberg's life` },
    ],
    correctAnswer: 'C',
    explanation: `Choice C is the best answer. The passage introduces the printing press (the technology) and then explains how it changed book accessibility and contributed to literacy, the Reformation, and the Scientific Revolution (historical consequences). This is a "technology → impact" structure.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. No competing interpretations are presented; the passage is not structured as a debate.`,
      B: `Choice B is incorrect. The press is presented as a solution (reducing book costs), not a problem.`,
      D: `Choice D is incorrect. Gutenberg is mentioned only by name; no biographical chronology is provided.`,
    },
  },

  {
    id: 'rw2e-08',
    section: 'reading-writing',
    moduleId: 'rw-module-2-easy',
    domain: 'Craft and Structure',
    skill: 'Text Structure and Purpose',
    difficulty: 'medium',
    stimulus: `Biologists have long classified organisms into two broad categories: prokaryotes (cells without a nucleus) and eukaryotes (cells with a nucleus). However, a third form of life — archaea — complicates this picture. Long mistaken for bacteria, archaea have prokaryotic cell structure but possess genetic and biochemical features more closely related to eukaryotes. Some researchers now argue for a two-domain model in which archaea and eukaryotes are grouped together, rather than the traditional three-domain system.`,
    question: `The function of the sentence beginning "Long mistaken for bacteria" is to`,
    choices: [
      { label: 'A', text: 'explain why archaea are now considered a type of bacteria' },
      { label: 'B', text: `acknowledge a historical error that is relevant to the passage's main argument` },
      { label: 'C', text: 'provide evidence that eukaryotes and prokaryotes are closely related' },
      { label: 'D', text: 'challenge the use of genetic analysis in classifying life forms' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is the best answer. The sentence notes that archaea were previously misclassified as bacteria, which is relevant because it explains why the two-domain model is a new proposal — the true nature of archaea was not recognized until recently. This historical error motivates the rethinking described later in the passage.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. The sentence explains the opposite — archaea were mistaken for bacteria but are now understood to be different.`,
      C: `Choice C is incorrect. The sentence concerns archaea's classification history, not the relationship between eukaryotes and prokaryotes.`,
      D: `Choice D is incorrect. The passage uses genetic and biochemical analysis as justification for reclassification, not as a method to be challenged.`,
    },
  },

  {
    id: 'rw2e-09',
    section: 'reading-writing',
    moduleId: 'rw-module-2-easy',
    domain: 'Craft and Structure',
    skill: 'Text Structure and Purpose',
    difficulty: 'medium',
    stimulus: `The Great Barrier Reef, the world's largest coral reef system, spans more than 2,300 kilometers along the northeastern coast of Australia. It is home to an extraordinary diversity of marine life, including over 1,500 species of fish, 4,000 species of mollusk, and 30 species of whale and dolphin. In recent decades, rising ocean temperatures caused by climate change have led to repeated mass bleaching events, in which corals expel the algae that give them color and nutrients, often resulting in coral death. Scientists warn that without significant reductions in greenhouse gas emissions, the reef could lose 99% of its corals by 2100.`,
    question: `The passage is best described as`,
    choices: [
      { label: 'A', text: 'a scientific argument in favor of expanding marine protected areas' },
      { label: 'B', text: 'an informational account of the Great Barrier Reef that includes a warning about its future' },
      { label: 'C', text: 'a comparison of the Great Barrier Reef with other reef systems worldwide' },
      { label: 'D', text: 'a historical record of bleaching events at the Great Barrier Reef' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is the best answer. The passage begins with factual information about the reef's size and biodiversity and then shifts to describing bleaching events and including scientists' warning about the reef's future. This combination — informational overview plus cautionary projection — is best described by Choice B.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. The passage makes no argument about marine protected areas.`,
      C: `Choice C is incorrect. No other reef systems are mentioned for comparison.`,
      D: `Choice D is incorrect. The passage mentions bleaching events only briefly and is not a historical record of them.`,
    },
  },

  // ── Central Ideas and Details (4) ──────────────────────────────────────────

  {
    id: 'rw2e-10',
    section: 'reading-writing',
    moduleId: 'rw-module-2-easy',
    domain: 'Information and Ideas',
    skill: 'Central Ideas and Details',
    difficulty: 'easy',
    stimulus: `Marie Curie was the first woman to win a Nobel Prize, and the only person to win Nobel Prizes in two different sciences — physics (1903) and chemistry (1911). Born Maria Sklodowska in Warsaw in 1867, she faced significant barriers as a woman seeking higher education in partitioned Poland and later in Paris. Her research on radioactivity — a term she coined — led to the discovery of two new elements: polonium, named after her homeland, and radium.`,
    question: `According to the passage, what is Marie Curie notable for?`,
    choices: [
      { label: 'A', text: 'Being the first scientist to study radioactivity' },
      { label: 'B', text: 'Winning Nobel Prizes in two different scientific fields' },
      { label: 'C', text: 'Founding the field of chemistry in the early twentieth century' },
      { label: 'D', text: 'Discovering three new chemical elements' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is the best answer. The passage explicitly states that Curie was "the only person to win Nobel Prizes in two different sciences — physics (1903) and chemistry (1911)." This is presented as one of her most distinctive achievements.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. The passage says Curie coined the term "radioactivity" and researched it, but does not say she was the first scientist to study it.`,
      C: `Choice C is incorrect. No such claim is made; Curie won a Nobel in chemistry but did not found the field.`,
      D: `Choice D is incorrect. The passage states she discovered two elements — polonium and radium — not three.`,
    },
  },

  {
    id: 'rw2e-11',
    section: 'reading-writing',
    moduleId: 'rw-module-2-easy',
    domain: 'Information and Ideas',
    skill: 'Central Ideas and Details',
    difficulty: 'easy',
    stimulus: `Laughter yoga, developed by Indian physician Madan Kataria in 1995, combines unconditional laughter with yogic breathing exercises. Participants begin with simulated laughter that, through eye contact and group playfulness, often becomes genuine. Proponents argue that the body cannot distinguish between simulated and spontaneous laughter and that both produce similar physiological benefits, including reduced cortisol levels, improved immune function, and elevated mood. Laughter yoga sessions are now held in more than 100 countries.`,
    question: `According to the passage, what do proponents of laughter yoga claim?`,
    choices: [
      { label: 'A', text: 'Genuine laughter produces better health outcomes than simulated laughter.' },
      { label: 'B', text: 'Laughter yoga is more effective than traditional yoga.' },
      { label: 'C', text: 'The body responds similarly to simulated and genuine laughter.' },
      { label: 'D', text: 'Laughter yoga is the only effective treatment for high cortisol.' },
    ],
    correctAnswer: 'C',
    explanation: `Choice C is the best answer. The passage explicitly states that proponents argue "the body cannot distinguish between simulated and spontaneous laughter and that both produce similar physiological benefits." Choice C directly restates this claim.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. Proponents claim both types are similarly effective, not that genuine laughter is superior.`,
      B: `Choice B is incorrect. No comparison with traditional yoga is made.`,
      D: `Choice D is incorrect. The passage mentions cortisol as one of several benefits and does not claim laughter yoga is the only treatment.`,
    },
  },

  {
    id: 'rw2e-12',
    section: 'reading-writing',
    moduleId: 'rw-module-2-easy',
    domain: 'Information and Ideas',
    skill: 'Central Ideas and Details',
    difficulty: 'medium',
    stimulus: `The Silk Road was not a single road but a network of trade routes connecting China with Central Asia, the Middle East, and eventually Europe, active from roughly the 2nd century BCE to the 15th century CE. While silk was indeed a major commodity, the routes carried a much broader range of goods: spices, glass, paper, and precious metals. Perhaps more importantly, the routes facilitated the exchange of ideas, religions, languages, and artistic traditions across vast distances, contributing to the spread of Buddhism, Islam, and later Christianity across Asia.`,
    question: `What does the passage suggest was the most significant function of the Silk Road?`,
    choices: [
      { label: 'A', text: 'The transportation of silk to European markets' },
      { label: 'B', text: 'The establishment of Chinese political dominance over Central Asia' },
      { label: 'C', text: 'The exchange of cultural, religious, and intellectual traditions' },
      { label: 'D', text: 'The development of a common language across trading nations' },
    ],
    correctAnswer: 'C',
    explanation: `Choice C is the best answer. The passage explicitly signals importance with "Perhaps more importantly" before stating that the routes facilitated cultural, religious, and intellectual exchange. The phrase "perhaps more importantly" elevates the cultural function above the commercial one.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. The passage says silk was "a major commodity" but one among many, and explicitly elevates cultural exchange above trade.`,
      B: `Choice B is incorrect. Political dominance is never mentioned.`,
      D: `Choice D is incorrect. Languages are mentioned as things exchanged, not as a goal of developing a common tongue.`,
    },
  },

  {
    id: 'rw2e-13',
    section: 'reading-writing',
    moduleId: 'rw-module-2-easy',
    domain: 'Information and Ideas',
    skill: 'Central Ideas and Details',
    difficulty: 'medium',
    stimulus: `Solastalgia, a term coined by philosopher Glenn Albrecht in 2003, describes the distress caused by environmental change in one's home environment. Unlike nostalgia — which is a longing for a past place that can no longer be visited — solastalgia arises when the place itself changes around the person who still inhabits it. Indigenous communities in the Arctic, farmers watching their land affected by drought, and coastal residents seeing their shorelines erode have all been described as experiencing solastalgia as their immediate environments transform beyond recognition.`,
    question: `How does the author distinguish solastalgia from nostalgia?`,
    choices: [
      { label: 'A', text: 'Nostalgia is a medical diagnosis while solastalgia is a philosophical concept.' },
      { label: 'B', text: 'Nostalgia is a longing for a place one has left; solastalgia occurs when the home environment itself changes.' },
      { label: 'C', text: 'Nostalgia affects individuals while solastalgia affects entire communities.' },
      { label: 'D', text: 'Nostalgia is associated with climate change while solastalgia relates to personal loss.' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is the best answer. The passage directly contrasts the two: nostalgia is "a longing for a past place that can no longer be visited," while solastalgia arises "when the place itself changes around the person who still inhabits it." Choice B accurately captures this spatial distinction.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. The passage makes no medical/philosophical distinction; both are described as emotional/psychological concepts.`,
      C: `Choice C is incorrect. The passage describes communities experiencing solastalgia, but does not claim nostalgia is exclusively individual.`,
      D: `Choice D is incorrect. The passage does not associate nostalgia with climate change; it associates solastalgia with environmental change broadly.`,
    },
  },

  // ── Command of Evidence (3) ─────────────────────────────────────────────────

  {
    id: 'rw2e-14',
    section: 'reading-writing',
    moduleId: 'rw-module-2-easy',
    domain: 'Information and Ideas',
    skill: 'Command of Evidence',
    difficulty: 'easy',
    stimulus: `A student is writing an essay arguing that sleep deprivation negatively affects academic performance. The student wants to include evidence showing the effect of sleep on memory.

Which of the following would best support the student's argument?`,
    question: `Which quotation best supports the student's argument?`,
    choices: [
      { label: 'A', text: '"Teenagers report feeling tired more often than adults."' },
      { label: 'B', text: '"A study from Harvard Medical School found that students who slept fewer than six hours before an exam scored 14% lower on memory recall tests than those who slept eight or more hours."' },
      { label: 'C', text: '"Many high schools in the United States begin classes before 8:00 a.m."' },
      { label: 'D', text: '"Sleep deprivation has been shown to affect mood and appetite in adult populations."' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is the best answer. The student needs evidence that sleep deprivation negatively affects academic performance, specifically memory. Choice B provides a specific study showing that less sleep is directly linked to lower scores on memory recall tests — connecting sleep, memory, and academic performance in one piece of evidence.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. Feeling tired is subjective and does not demonstrate a measurable impact on academic performance.`,
      C: `Choice C is incorrect. Early school start times are a contextual detail about school policy, not evidence of academic harm from sleep deprivation.`,
      D: `Choice D is incorrect. Effects on mood and appetite in adults do not directly support the claim about academic performance in students.`,
    },
  },

  {
    id: 'rw2e-15',
    section: 'reading-writing',
    moduleId: 'rw-module-2-easy',
    domain: 'Information and Ideas',
    skill: 'Command of Evidence',
    difficulty: 'medium',
    stimulus: `A 2021 study surveyed 1,200 adults about their exercise habits and reported happiness levels. Participants who exercised at least 150 minutes per week reported an average happiness score of 7.8 out of 10, compared to 6.1 for those who exercised fewer than 30 minutes per week. The study controlled for income and social activity levels. Researchers noted, however, that happier people may simply be more likely to exercise, and that the data alone cannot determine the direction of causation.`,
    question: `Which conclusion is most directly supported by the study's findings?`,
    choices: [
      { label: 'A', text: 'Exercise of at least 150 minutes per week causes people to be happier.' },
      { label: 'B', text: 'People who exercise more tend to report higher happiness levels.' },
      { label: 'C', text: 'Happiness is the most important factor determining exercise habits.' },
      { label: 'D', text: 'Income is unrelated to happiness.' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is the best answer. The data shows a correlation: people who exercise more report higher happiness scores. The researchers themselves note the direction of causation is unclear, so B's careful language ("tend to report") accurately reflects what the data can support without overclaiming causation.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. The study found a correlation, not causation; the researchers explicitly caution against concluding that exercise causes happiness.`,
      C: `Choice C is incorrect. The study does not identify happiness as a determining factor in exercise habits, only notes this as a possible alternative explanation.`,
      D: `Choice D is incorrect. The study controlled for income, meaning it accounted for its possible effect; this does not show income is unrelated to happiness.`,
    },
  },

  {
    id: 'rw2e-16',
    section: 'reading-writing',
    moduleId: 'rw-module-2-easy',
    domain: 'Information and Ideas',
    skill: 'Command of Evidence',
    difficulty: 'medium',
    stimulus: `A student is writing a report arguing that access to public transportation reduces car ownership in urban areas. The student wants to include a sentence that introduces a supporting statistic and explains its significance.

The student has found the following data: In cities with high-frequency transit (trains or buses running every 10 minutes or less), car ownership rates average 0.7 vehicles per household, compared to 1.4 vehicles per household in otherwise similar cities with infrequent transit (service every 30+ minutes).`,
    question: `Which sentence best uses this data to support the student's argument?`,
    choices: [
      { label: 'A', text: 'Cities with frequent transit service have very different transportation systems than other cities.' },
      { label: 'B', text: 'Car ownership rates are an important indicator of urban transportation patterns.' },
      { label: 'C', text: 'In cities with high-frequency public transit, households own half as many cars on average as in cities with infrequent service, suggesting that accessible transit reduces the need for personal vehicles.' },
      { label: 'D', text: 'Public transportation should be expanded in all cities to achieve various social and environmental goals.' },
    ],
    correctAnswer: 'C',
    explanation: `Choice C is the best answer. It presents the specific statistic (0.7 vs. 1.4 vehicles), contextualizes its meaning ("half as many"), and connects it to the argument ("reduces the need for personal vehicles"). This accomplishes both incorporating the data and explaining its significance, as the task requires.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. It makes a vague general claim without citing the specific data or connecting it to the argument.`,
      B: `Choice B is incorrect. It is a general statement about measurement methodology, not an argument using the specific statistics found.`,
      D: `Choice D is incorrect. It is a policy recommendation that does not use the data at all.`,
    },
  },

  // ── Inferences (2) ─────────────────────────────────────────────────────────

  {
    id: 'rw2e-17',
    section: 'reading-writing',
    moduleId: 'rw-module-2-easy',
    domain: 'Information and Ideas',
    skill: 'Inferences',
    difficulty: 'easy',
    stimulus: `Early computers filled entire rooms and required teams of technicians to operate. The ENIAC, completed in 1945, weighed 30 tons and contained roughly 18,000 vacuum tubes. By 1965, engineer Gordon Moore observed that the number of transistors on a microchip was doubling approximately every two years — a trend that became known as Moore's Law. This exponential growth in computing power, combined with miniaturization, has continued for decades.`,
    question: `What can most reasonably be inferred from the passage about computing technology since 1945?`,
    choices: [
      { label: 'A', text: 'Computing technology has become more powerful and smaller over time.' },
      { label: 'B', text: 'Modern computers still require large teams of technicians to operate.' },
      { label: 'C', text: 'The ENIAC was less useful than modern computers for most practical tasks.' },
      { label: 'D', text: 'Gordon Moore invented the microchip.' },
    ],
    correctAnswer: 'A',
    explanation: `Choice A is the best answer. The passage describes early computers as room-sized and complex, then describes exponential growth in transistor counts and "miniaturization." Together, these details support the inference that computing technology has become both more powerful and physically smaller over time.`,
    wrongAnswerExplanations: {
      B: `Choice B is incorrect. The passage implies the opposite — miniaturization and greater power suggest reduced operational complexity.`,
      C: `Choice C is incorrect. The passage provides no comparison of the ENIAC's practical utility to modern computers.`,
      D: `Choice D is incorrect. The passage says Moore observed a trend in transistor density; it does not attribute the invention of the microchip to him.`,
    },
  },

  {
    id: 'rw2e-18',
    section: 'reading-writing',
    moduleId: 'rw-module-2-easy',
    domain: 'Information and Ideas',
    skill: 'Inferences',
    difficulty: 'medium',
    stimulus: `The Voting Rights Act of 1965 eliminated many barriers that had prevented African Americans from voting in the South, including literacy tests and poll taxes. Within a year of the law's passage, Black voter registration in Alabama rose from 19.3% to 51.6%, and in Mississippi from 6.7% to 59.8%. These dramatic increases were followed by a growing number of Black elected officials at the local, state, and federal levels throughout the late 1960s and 1970s.`,
    question: `What can most reasonably be inferred from the data in the passage?`,
    choices: [
      { label: 'A', text: 'Literacy tests were the primary barrier to Black voting before 1965.' },
      { label: 'B', text: 'Low voter registration rates before 1965 contributed to limited Black political representation.' },
      { label: 'C', text: 'All eligible Black voters in Alabama and Mississippi registered after 1965.' },
      { label: 'D', text: 'The Voting Rights Act was opposed by African Americans in the South.' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is the best answer. The passage shows a clear sequence: before the VRA, registration was very low (6.7–19.3%), then registration rose sharply (51.6–59.8%), and then political representation increased. This sequence implies that low registration was what limited representation — removing the barrier unlocked both.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. The passage lists literacy tests and poll taxes as barriers; it does not rank which was primary.`,
      C: `Choice C is incorrect. Even 59.8% means roughly 40% of eligible voters were not registered; the passage does not claim universal registration.`,
      D: `Choice D is incorrect. The data shows dramatic registration increases following the law's passage, implying African Americans embraced the opportunity it created.`,
    },
  },

  // ── Cross-Text Connections (2) ──────────────────────────────────────────────

  {
    id: 'rw2e-19',
    section: 'reading-writing',
    moduleId: 'rw-module-2-easy',
    domain: 'Craft and Structure',
    skill: 'Cross-Text Connections',
    difficulty: 'easy',
    stimulus: `Text 1: Zoos play an important role in wildlife conservation by operating captive breeding programs for endangered species. Several animals, including the Arabian oryx and California condor, were brought back from the brink of extinction through zoo-based breeding efforts and reintroduction programs.

Text 2: Modern zoos often cause unnecessary suffering by confining animals to spaces far smaller than their natural habitats. The psychological and physical harm caused by captivity — including stereotyped behaviors like pacing and self-harm — suggests that many zoo animals cannot thrive outside their wild environments.`,
    question: `Based on the texts, the authors of Text 1 and Text 2 would most likely disagree about`,
    choices: [
      { label: 'A', text: 'whether the Arabian oryx is currently extinct' },
      { label: 'B', text: 'whether zoos provide net benefits or net harm to animals' },
      { label: 'C', text: 'whether wild animals have natural habitats' },
      { label: 'D', text: 'whether zoos are profitable businesses' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is the best answer. Text 1 presents zoos as beneficial for conservation (saving species from extinction), while Text 2 argues they cause harm through confinement and psychological damage. The core disagreement is whether zoos, overall, help or harm animals.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. Text 1 says the oryx was brought "back from the brink" (implying it was saved), and Text 2 does not mention it; neither author disputes this.`,
      C: `Choice C is incorrect. Both texts imply wild habitats exist; there is no disagreement about this basic fact.`,
      D: `Choice D is incorrect. Neither text discusses zoo profitability.`,
    },
  },

  {
    id: 'rw2e-20',
    section: 'reading-writing',
    moduleId: 'rw-module-2-easy',
    domain: 'Craft and Structure',
    skill: 'Cross-Text Connections',
    difficulty: 'medium',
    stimulus: `Text 1: Standardized testing provides an objective and consistent measure of student academic achievement. Unlike teacher grades, which can be influenced by subjective factors like effort and personality, standardized tests offer a uniform benchmark that allows meaningful comparisons across schools, districts, and demographic groups.

Text 2: Standardized tests primarily measure a student's ability to take standardized tests. Test-prep coaching has been shown to raise scores by an average of 20–30 points on the SAT without corresponding improvements in academic skill. Scores also correlate strongly with family income, raising serious questions about what exactly these tests are measuring.`,
    question: `The author of Text 2 would most likely respond to the claim in Text 1 that standardized tests offer "objective" measurement by`,
    choices: [
      { label: 'A', text: 'agreeing that income does not affect test performance' },
      { label: 'B', text: 'arguing that test-prep coaching and income correlations undermine claims of objectivity' },
      { label: 'C', text: 'suggesting that teacher grades are more objective than standardized tests' },
      { label: 'D', text: 'claiming that standardized tests should be replaced by portfolio-based assessments' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is the best answer. Text 2 raises two points that directly challenge the objectivity claim: (1) scores can be inflated by coaching without real skill improvement, and (2) scores correlate with income. If test results are influenced by coaching availability and socioeconomic status, they do not objectively measure academic achievement alone.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. Text 2 explicitly states that scores "correlate strongly with family income," directly contradicting this.`,
      C: `Choice C is incorrect. Text 2 does not advocate for teacher grades; it questions what standardized tests measure.`,
      D: `Choice D is incorrect. Text 2 does not propose alternative assessment methods.`,
    },
  },

  // ── Rhetorical Synthesis (2) ────────────────────────────────────────────────

  {
    id: 'rw2e-21',
    section: 'reading-writing',
    moduleId: 'rw-module-2-easy',
    domain: 'Expression of Ideas',
    skill: 'Rhetorical Synthesis',
    difficulty: 'easy',
    stimulus: `A student is writing a persuasive essay arguing that school cafeterias should offer more plant-based meal options. The student has gathered the following notes:

• Producing one pound of beef requires approximately 1,800 gallons of water, compared to 216 gallons for one pound of soybeans.
• A 2020 study found that students at schools with more plant-based options consumed more fiber and vitamins A and C on average.
• Plant-based proteins like lentils and chickpeas cost less per serving than beef or chicken.
• Many students report being unfamiliar with common plant-based foods like tofu, tempeh, and lentils.
• Some school districts in California have already implemented plant-based Fridays with positive feedback.`,
    question: `The student wants to write a sentence that uses two pieces of evidence to argue that plant-based options would benefit both students and school budgets. Which choice best accomplishes this goal?`,
    choices: [
      { label: 'A', text: 'Plant-based foods like soybeans use less water to produce than beef and are already being served in California schools.' },
      { label: 'B', text: 'Expanding plant-based meal options could improve student nutrition while also reducing food costs, since studies show nutritional benefits and plant proteins typically cost less per serving.' },
      { label: 'C', text: 'Although many students are unfamiliar with plant-based foods, schools in California have had success serving them.' },
      { label: 'D', text: 'Beef production uses far more water than soybean production, which has environmental consequences.' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is the best answer. It uses two specific pieces of evidence — the nutritional benefits (student health) and lower per-serving cost (school budgets) — and directly connects them to both goals: student benefit and budget benefit. This is exactly what the task asks for.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. It uses environmental (water use) and adoption evidence, not the nutritional and cost evidence needed to address both students and budgets.`,
      C: `Choice C is incorrect. It focuses on student unfamiliarity and California adoption, addressing neither nutrition nor cost.`,
      D: `Choice D is incorrect. It addresses only the environmental argument, not student benefits or school budgets.`,
    },
  },

  {
    id: 'rw2e-22',
    section: 'reading-writing',
    moduleId: 'rw-module-2-easy',
    domain: 'Expression of Ideas',
    skill: 'Rhetorical Synthesis',
    difficulty: 'medium',
    stimulus: `A student is researching the history of jazz music. She has found these notes:

• Jazz originated in New Orleans in the early 20th century, blending African musical traditions, blues, and ragtime.
• Louis Armstrong, born in New Orleans in 1901, became one of jazz's most influential musicians through his innovations in improvisation.
• By the 1920s, jazz had spread to Chicago and New York, where it became central to the Harlem Renaissance.
• Jazz was sometimes called "the devil's music" by critics who associated it with nightclubs and moral looseness.
• Jazz musicians developed new performance conventions, including extended improvisation and call-and-response patterns.

The student wants to write an opening sentence for her essay that establishes jazz's origins and hints at its cultural impact. Which choice best accomplishes this goal?`,
    question: `Which choice best accomplishes the student's goal?`,
    choices: [
      { label: 'A', text: `Jazz music was sometimes called "the devil's music" by early critics who disapproved of its association with nightclubs.` },
      { label: 'B', text: `Louis Armstrong, born in New Orleans in 1901, was one of jazz's most influential performers.` },
      { label: 'C', text: `Jazz emerged in New Orleans in the early twentieth century as a blend of African musical traditions, blues, and ragtime, and quickly spread across American cities, reshaping the nation's cultural landscape.` },
      { label: 'D', text: 'Jazz musicians developed innovative techniques including improvisation and call-and-response patterns.' },
    ],
    correctAnswer: 'C',
    explanation: `Choice C is the best answer. It establishes where and when jazz originated (New Orleans, early 20th century), identifies its musical roots (African traditions, blues, ragtime), and hints at its broader cultural impact (spread, reshaping the cultural landscape). This accomplishes both goals in the task: origins and cultural impact hint.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. It opens with criticism, not origins, and focuses narrowly on one social reaction rather than broader cultural impact.`,
      B: `Choice B is incorrect. It identifies one musician but does not address the origins or broader cultural impact of jazz.`,
      D: `Choice D is incorrect. It describes musical techniques but does not establish origins or cultural context.`,
    },
  },

  // ── Transitions (3) ────────────────────────────────────────────────────────

  {
    id: 'rw2e-23',
    section: 'reading-writing',
    moduleId: 'rw-module-2-easy',
    domain: 'Expression of Ideas',
    skill: 'Transitions',
    difficulty: 'easy',
    stimulus: `Regular aerobic exercise has well-documented benefits for cardiovascular health, including lower blood pressure and reduced risk of heart disease. _______ research suggests that exercise also has significant benefits for mental health, including reductions in symptoms of anxiety and depression.`,
    question: `Which choice completes the text with the most logical transition?`,
    choices: [
      { label: 'A', text: 'Nevertheless,' },
      { label: 'B', text: 'In addition,' },
      { label: 'C', text: 'On the contrary,' },
      { label: 'D', text: 'As a result,' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is the best answer. The second sentence adds another benefit of exercise (mental health) to the cardiovascular benefits already mentioned. "In addition" correctly signals that another point is being added to the list of benefits, not contrasted or explained as a consequence.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. "Nevertheless" signals a contrast or unexpected turn; the second sentence is consistent with, not in contrast to, the first.`,
      C: `Choice C is incorrect. "On the contrary" signals direct contradiction, but mental health benefits do not contradict cardiovascular benefits.`,
      D: `Choice D is incorrect. "As a result" implies that mental health benefits are caused by cardiovascular health improvements, which is not what the passage claims.`,
    },
  },

  {
    id: 'rw2e-24',
    section: 'reading-writing',
    moduleId: 'rw-module-2-easy',
    domain: 'Expression of Ideas',
    skill: 'Transitions',
    difficulty: 'medium',
    stimulus: `Many companies invest heavily in training programs designed to improve employee performance. _______ research on the effectiveness of such programs has produced mixed results, with some studies finding significant gains and others finding little measurable improvement.`,
    question: `Which choice completes the text with the most logical transition?`,
    choices: [
      { label: 'A', text: 'Therefore,' },
      { label: 'B', text: 'Similarly,' },
      { label: 'C', text: 'However,' },
      { label: 'D', text: 'Furthermore,' },
    ],
    correctAnswer: 'C',
    explanation: `Choice C is the best answer. The first sentence presents companies as confident investors in training programs. The second sentence presents a complicating reality: the research is mixed. "However" appropriately signals this pivot from assumed effectiveness to uncertain evidence.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. "Therefore" would imply the mixed results are a consequence of companies' investment, which does not make logical sense.`,
      B: `Choice B is incorrect. "Similarly" implies the second idea is parallel to the first; mixed research results are not similar to investing in training programs.`,
      D: `Choice D is incorrect. "Furthermore" adds supporting information; mixed results do not simply add to the first sentence but introduce doubt about it.`,
    },
  },

  {
    id: 'rw2e-25',
    section: 'reading-writing',
    moduleId: 'rw-module-2-easy',
    domain: 'Expression of Ideas',
    skill: 'Transitions',
    difficulty: 'medium',
    stimulus: `The human brain is remarkably adaptable, capable of forming new neural connections throughout life — a property known as neuroplasticity. _______ this adaptability is most pronounced during childhood, when the brain is undergoing rapid development, making early education and enriched environments especially important for cognitive growth.`,
    question: `Which choice completes the text with the most logical transition?`,
    choices: [
      { label: 'A', text: 'In contrast,' },
      { label: 'B', text: 'Regardless,' },
      { label: 'C', text: 'That said,' },
      { label: 'D', text: 'As a result,' },
    ],
    correctAnswer: 'C',
    explanation: `Choice C is the best answer. The passage first establishes that neuroplasticity continues throughout life, then specifies that it is most pronounced in childhood. "That said" appropriately signals a qualification: acknowledging something true while adding a nuance that limits or focuses it. The brain is adaptable throughout life, but childhood is when this adaptability peaks.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. "In contrast" would imply childhood adaptability is different from or opposite to the general adaptability just described, which overstates the contrast.`,
      B: `Choice B is incorrect. "Regardless" implies the second sentence ignores the first, which is illogical since the second sentence builds on the first.`,
      D: `Choice D is incorrect. "As a result" implies that childhood's special adaptability is caused by the brain's general neuroplasticity, which conflates explanation with relationship.`,
    },
  },

  // ── Standard English Conventions (4) ───────────────────────────────────────

  {
    id: 'rw2e-26',
    section: 'reading-writing',
    moduleId: 'rw-module-2-easy',
    domain: 'Standard English Conventions',
    skill: 'Boundaries',
    difficulty: 'easy',
    stimulus: ``,
    question: `The committee approved the new budget _______ it had been reviewed by all department heads.`,
    choices: [
      { label: 'A', text: ', after' },
      { label: 'B', text: '; after' },
      { label: 'C', text: '. After' },
      { label: 'D', text: 'after' },
    ],
    correctAnswer: 'D',
    explanation: `Choice D is the best answer. The clause "after it had been reviewed by all department heads" is a subordinate clause that cannot stand alone. No punctuation is needed between the independent clause and an attached subordinate clause when the subordinate clause follows the main clause. Choices A, B, and C all introduce unnecessary punctuation that either creates a fragment or misuses a semicolon.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. A comma before a subordinate clause that follows the main clause is not standard; commas before subordinate clauses are used when the clause precedes the main clause.`,
      B: `Choice B is incorrect. A semicolon must be followed by an independent clause; "after it had been reviewed…" is a dependent clause.`,
      C: `Choice C is incorrect. A period creates a sentence fragment: "After it had been reviewed by all department heads." cannot stand alone.`,
    },
  },

  {
    id: 'rw2e-27',
    section: 'reading-writing',
    moduleId: 'rw-module-2-easy',
    domain: 'Standard English Conventions',
    skill: 'Form, Structure, and Sense',
    difficulty: 'medium',
    stimulus: ``,
    question: `By the time the rescue team arrived at the trailhead, the hikers _______ waiting for more than four hours.`,
    choices: [
      { label: 'A', text: 'were' },
      { label: 'B', text: 'had been' },
      { label: 'C', text: 'have been' },
      { label: 'D', text: 'are' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is the best answer. The sentence describes two past events: the rescue team's arrival and the hikers' waiting period. The hikers started waiting before the team arrived. The past perfect "had been waiting" correctly signals that the waiting occurred and was ongoing before the team's arrival — an earlier past action relative to another past event.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. "Were waiting" (simple past progressive) does not convey that the waiting began before the team's arrival; it implies simultaneous action.`,
      C: `Choice C is incorrect. "Have been" is present perfect, which is inconsistent with the past tense context established by "arrived."`,
      D: `Choice D is incorrect. "Are" is present tense, which does not match the past-tense narrative of the sentence.`,
    },
  },
]
