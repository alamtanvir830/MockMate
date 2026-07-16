export type PassageDifficulty = 'accessible' | 'moderate' | 'challenging'
export type PassageCategory = 'science' | 'history' | 'social-science' | 'literature' | 'technology'

export interface ComprehensionQuestion {
  id: string
  question: string
  choices: { label: 'A' | 'B' | 'C' | 'D'; text: string }[]
  correctAnswer: 'A' | 'B' | 'C' | 'D'
  explanation: string
  skill: 'main-idea' | 'detail' | 'inference' | 'vocabulary'
}

export interface AcademyPassage {
  id: string
  title: string
  category: PassageCategory
  difficulty: PassageDifficulty
  wordCount: number
  estimatedReadingTime: number
  text: string
  questions: ComprehensionQuestion[]
}

export const academyPassages: AcademyPassage[] = [
  // ─── ACCESSIBLE (4) ──────────────────────────────────────────────────────────

  {
    id: 'passage-001',
    title: 'Light in the Deep',
    category: 'science',
    difficulty: 'accessible',
    wordCount: 168,
    estimatedReadingTime: 40,
    text: `Below eight hundred meters, sunlight cannot reach the ocean. Yet this zone, called the midnight zone, is far from dark. Hundreds of species that live here produce their own light through a chemical reaction called bioluminescence. When oxygen combines with a protein called luciferin inside a creature's body, the reaction releases energy in the form of visible light.

Deep-sea fish use this ability in several ways. The anglerfish dangles a glowing lure above its mouth to attract smaller animals. Certain squid flash patterns of blue and green to communicate with potential mates. Some shrimp spray clouds of bioluminescent liquid to confuse predators and escape in the chaos.

Unlike sunlight, which scatters and warms the water, bioluminescent light produces almost no heat. Scientists call it "cold light." This efficiency is remarkable: up to ninety percent of the chemical energy is converted directly into light, compared with just ten percent for an ordinary incandescent bulb. Researchers are now studying these proteins to develop more efficient lighting technologies for use on land.`,
    questions: [
      {
        id: 'passage-001-q1',
        skill: 'main-idea',
        question: 'Which choice best states the main idea of the passage?',
        choices: [
          { label: 'A', text: 'Bioluminescence is a cold, efficient light source that deep-sea animals use for survival and that scientists are adapting for human technology.' },
          { label: 'B', text: 'The midnight zone is one of the most dangerous environments on Earth, where creatures must fight constantly to survive.' },
          { label: 'C', text: 'The anglerfish is the most remarkable deep-sea creature because it uses light to trap prey.' },
          { label: 'D', text: 'Most deep-sea organisms cannot survive without producing their own light.' },
        ],
        correctAnswer: 'A',
        explanation: 'The passage covers bioluminescence broadly — its chemical basis, its various uses by animals, its efficiency, and its potential human applications. Choice A captures all of these threads. The other choices focus on narrower details (a single species, danger, or survival necessity) that do not represent the full scope.',
      },
      {
        id: 'passage-001-q2',
        skill: 'detail',
        question: 'According to the passage, which of the following is true about bioluminescent light?',
        choices: [
          { label: 'A', text: 'It warms the surrounding water just as sunlight does.' },
          { label: 'B', text: 'It converts up to ninety percent of chemical energy into visible light.' },
          { label: 'C', text: 'It is used only by fish, not by other marine creatures.' },
          { label: 'D', text: 'It requires sunlight to trigger the chemical reaction.' },
        ],
        correctAnswer: 'B',
        explanation: 'The passage states directly that "up to ninety percent of the chemical energy is converted directly into light." Choice A is wrong because bioluminescent light produces almost no heat. Choice C is wrong because squid and shrimp are also mentioned. Choice D contradicts the passage entirely — bioluminescence occurs where sunlight cannot reach.',
      },
      {
        id: 'passage-001-q3',
        skill: 'inference',
        question: 'Based on the passage, what can most reasonably be inferred about the shrimp\'s use of bioluminescence?',
        choices: [
          { label: 'A', text: 'Shrimp use bioluminescence primarily to attract mates in the darkness.' },
          { label: 'B', text: 'Shrimp benefit from bioluminescence even though they do not use it to produce their own light.' },
          { label: 'C', text: 'The bioluminescent spray works because it creates a visual distraction that lets the shrimp escape.' },
          { label: 'D', text: 'Predators in the midnight zone cannot see bioluminescent light.' },
        ],
        correctAnswer: 'C',
        explanation: 'The passage says shrimp "spray clouds of bioluminescent liquid to confuse predators and escape in the chaos." The mechanism is confusion — a visual distraction — which allows escape. Choice A describes squid behavior, not shrimp. Choices B and D are not supported by the passage.',
      },
      {
        id: 'passage-001-q4',
        skill: 'vocabulary',
        question: 'As used in the passage, "efficient" most nearly means',
        choices: [
          { label: 'A', text: 'converting energy with minimal waste' },
          { label: 'B', text: 'producing light that is extremely bright' },
          { label: 'C', text: 'operating at high speed underwater' },
          { label: 'D', text: 'lasting for a long time without fading' },
        ],
        correctAnswer: 'A',
        explanation: 'The passage contrasts bioluminescent light ("cold light") with an incandescent bulb, noting that 90% of chemical energy becomes light versus only 10% for a bulb. "Efficient" here means converting energy with little waste — not brightness, speed, or longevity.',
      },
    ],
  },

  {
    id: 'passage-002',
    title: 'The Press That Changed Everything',
    category: 'history',
    difficulty: 'accessible',
    wordCount: 172,
    estimatedReadingTime: 41,
    text: `In the mid-fifteenth century, a German craftsman named Johannes Gutenberg combined several existing technologies — the screw press, oil-based ink, and movable metal type — into a single system capable of printing hundreds of identical pages per day. Before this invention, books in Europe were copied by hand, a process so slow and expensive that only churches, universities, and wealthy nobles could own them.

Gutenberg's press changed who could access written knowledge. Within fifty years of its invention, an estimated eight million books were circulating across Europe — more than had existed in the previous thousand years combined. Prices dropped sharply, and literacy began to spread beyond the clergy and aristocracy.

The effects were far-reaching. Reformers such as Martin Luther used printed pamphlets to spread religious arguments that might otherwise have been confined to Latin manuscripts read by a handful of scholars. Scientists could share discoveries across borders more quickly. Governments responded by trying to control or censor the new medium, a debate about information and power that continues in different forms today.`,
    questions: [
      {
        id: 'passage-002-q1',
        skill: 'main-idea',
        question: 'Which choice best states the main idea of the passage?',
        choices: [
          { label: 'A', text: 'Gutenberg invented the printing press by combining movable type, oil-based ink, and a screw press.' },
          { label: 'B', text: 'Gutenberg\'s press democratized knowledge and triggered sweeping social, religious, and political changes.' },
          { label: 'C', text: 'The printing press reduced book prices and increased European literacy rates within a generation.' },
          { label: 'D', text: 'Governments have always tried to control the spread of information through new technologies.' },
        ],
        correctAnswer: 'B',
        explanation: 'The passage traces consequences that go well beyond the invention itself — more books, wider literacy, religious reform, scientific exchange, and censorship debates. Choice B captures this breadth. Choice A only describes the technical details. Choice C and D describe supporting points, not the main idea.',
      },
      {
        id: 'passage-002-q2',
        skill: 'detail',
        question: 'According to the passage, which of the following is true about books in Europe before Gutenberg\'s invention?',
        choices: [
          { label: 'A', text: 'They were printed using an early version of movable type.' },
          { label: 'B', text: 'They were available mainly to religious institutions, universities, and wealthy nobles.' },
          { label: 'C', text: 'They were written in Latin and rarely translated.' },
          { label: 'D', text: 'They were produced in large quantities but at very high cost.' },
        ],
        correctAnswer: 'B',
        explanation: 'The passage states that before the press, books were hand-copied and so expensive that "only churches, universities, and wealthy nobles could own them." Choice A contradicts the passage (movable type was part of the new invention). Choice C is not stated. Choice D is wrong — the passage implies scarcity, not large quantities.',
      },
      {
        id: 'passage-002-q3',
        skill: 'inference',
        question: 'Based on the passage, what can most reasonably be inferred about why Martin Luther\'s ideas spread so widely?',
        choices: [
          { label: 'A', text: 'Luther wrote in simple language that uneducated people could easily understand.' },
          { label: 'B', text: 'The printing press allowed his arguments to reach far more people than manuscripts ever could.' },
          { label: 'C', text: 'Governments initially supported Luther\'s use of printed pamphlets.' },
          { label: 'D', text: 'Luther was the first person to use the printing press for religious purposes.' },
        ],
        correctAnswer: 'B',
        explanation: 'The passage says Luther used printed pamphlets to spread arguments "that might otherwise have been confined to Latin manuscripts read by a handful of scholars." This implies the press\'s reach was the key factor. The passage says nothing about Luther\'s language style, government support for him, or whether he was the first.',
      },
      {
        id: 'passage-002-q4',
        skill: 'vocabulary',
        question: 'As used in the passage, "confined" most nearly means',
        choices: [
          { label: 'A', text: 'imprisoned' },
          { label: 'B', text: 'restricted to' },
          { label: 'C', text: 'transformed' },
          { label: 'D', text: 'forgotten' },
        ],
        correctAnswer: 'B',
        explanation: 'The passage says arguments "might otherwise have been confined to Latin manuscripts read by a handful of scholars," meaning they would have stayed limited to that narrow audience. "Restricted to" captures this meaning. "Imprisoned" is a literal interpretation of the word that doesn\'t fit the context.',
      },
    ],
  },

  {
    id: 'passage-003',
    title: 'What Colors Do to Us',
    category: 'social-science',
    difficulty: 'accessible',
    wordCount: 163,
    estimatedReadingTime: 39,
    text: `Colors are not merely decorative — they shape how people feel and behave in ways that often go unnoticed. Researchers have found that the color of a room can influence a person's heart rate, appetite, and even decision-making speed. These effects appear to be partly biological and partly cultural, which makes them difficult to generalize across populations.

Red, for example, tends to raise heart rate and create a sense of urgency in many people. Fast-food restaurants frequently use red in their branding and interiors, a choice that some researchers believe encourages customers to eat quickly and leave, keeping tables turning. Blue, by contrast, is associated with calm and focus, which explains why offices and classrooms often favor cool tones.

However, cultural associations matter too. In some East Asian cultures, white is associated with mourning, while in Western tradition it signals purity or celebration. Green in many Western contexts suggests nature or health, whereas in other settings it may carry entirely different meanings. Color psychology is a powerful tool, but one that must be applied with cultural awareness.`,
    questions: [
      {
        id: 'passage-003-q1',
        skill: 'main-idea',
        question: 'Which choice best states the main idea of the passage?',
        choices: [
          { label: 'A', text: 'Colors affect human emotions and behavior through a mix of biological responses and cultural associations.' },
          { label: 'B', text: 'Fast-food restaurants use red to manipulate customers into eating quickly.' },
          { label: 'C', text: 'Cultural differences make it impossible to draw any reliable conclusions about color psychology.' },
          { label: 'D', text: 'Blue is the most effective color for promoting focus and calm in work environments.' },
        ],
        correctAnswer: 'A',
        explanation: 'The passage establishes that color affects feeling and behavior (biological) but that cultural context also shapes meaning (cultural). Choice A captures both dimensions. Choice B focuses on a single supporting example. Choice C overstates the limitation — the passage says effects are "difficult to generalize," not impossible to study. Choice D is too narrow.',
      },
      {
        id: 'passage-003-q2',
        skill: 'detail',
        question: 'According to the passage, why do some researchers believe fast-food restaurants use red in their branding?',
        choices: [
          { label: 'A', text: 'Red makes food look more appealing and colorful.' },
          { label: 'B', text: 'Red encourages customers to eat quickly and leave, increasing table turnover.' },
          { label: 'C', text: 'Red raises heart rate, which makes people feel more energetic.' },
          { label: 'D', text: 'Red is a culturally neutral color that works across many countries.' },
        ],
        correctAnswer: 'B',
        explanation: 'The passage states directly that some researchers believe the use of red "encourages customers to eat quickly and leave, keeping tables turning." This is the commercially strategic motivation described in the text. The other choices may sound plausible but are not what the passage says.',
      },
      {
        id: 'passage-003-q3',
        skill: 'inference',
        question: 'Based on the passage, what can most reasonably be inferred about applying color psychology in a global marketing campaign?',
        choices: [
          { label: 'A', text: 'A single color scheme should be avoided because every culture interprets colors differently.' },
          { label: 'B', text: 'Red and blue are universally effective because their effects are biological rather than cultural.' },
          { label: 'C', text: 'A designer should research how target audiences interpret specific colors before finalizing a palette.' },
          { label: 'D', text: 'Cultural associations with color are less important than the biological responses they trigger.' },
        ],
        correctAnswer: 'C',
        explanation: 'The passage argues that color psychology is a "powerful tool" but must be applied "with cultural awareness." This supports the inference that designers need to understand cultural context before applying color choices globally. Choice A is too absolute. Choice B contradicts the passage\'s point about cultural variation. Choice D reverses the passage\'s balance.',
      },
      {
        id: 'passage-003-q4',
        skill: 'vocabulary',
        question: 'As used in the passage, "urgency" most nearly means',
        choices: [
          { label: 'A', text: 'a feeling that something must be done immediately' },
          { label: 'B', text: 'physical discomfort or restlessness' },
          { label: 'C', text: 'strong emotional excitement' },
          { label: 'D', text: 'a heightened awareness of one\'s surroundings' },
        ],
        correctAnswer: 'A',
        explanation: 'In context, red "tends to raise heart rate and create a sense of urgency," which is associated with fast eating and quick decisions. "Urgency" here means a pressing, time-sensitive feeling — the sense that something must be acted on immediately. Physical discomfort and excitement are related but distinct.',
      },
    ],
  },

  {
    id: 'passage-004',
    title: 'The First Programmer',
    category: 'technology',
    difficulty: 'accessible',
    wordCount: 165,
    estimatedReadingTime: 40,
    text: `In the 1840s, mathematician Ada Lovelace worked alongside inventor Charles Babbage on his proposed Analytical Engine, a mechanical device designed to perform calculations automatically. Although the machine was never fully built during Babbage's lifetime, Lovelace's contributions to the project were remarkable. She translated a French article about the engine into English, adding her own notes that were three times longer than the original text.

Within those notes, Lovelace outlined what many historians consider the world's first algorithm intended for a machine — a sequence of operations that would calculate a complex mathematical series. She also proposed an insight that went well beyond Babbage's own thinking: that the engine could manipulate any symbol, not just numbers, and might therefore be used to compose music or generate graphics.

Today, Lovelace is celebrated as a pioneer of computing, though debate continues about how much of the conceptual work was hers alone. What is undisputed is that she recognized the broader potential of programmable machines at a time when most people saw them only as sophisticated calculators.`,
    questions: [
      {
        id: 'passage-004-q1',
        skill: 'main-idea',
        question: 'Which choice best states the main idea of the passage?',
        choices: [
          { label: 'A', text: 'Ada Lovelace translated a French article about Babbage\'s engine, making it accessible to English readers.' },
          { label: 'B', text: 'Ada Lovelace made foundational contributions to computing by writing the first algorithm and envisioning machines\' broader potential.' },
          { label: 'C', text: 'Charles Babbage\'s Analytical Engine was far too complex to be built with nineteenth-century technology.' },
          { label: 'D', text: 'Historians disagree about whether Lovelace deserves credit for her work on the Analytical Engine.' },
        ],
        correctAnswer: 'B',
        explanation: 'The passage covers two main contributions: Lovelace\'s algorithm and her insight that machines could work with any symbol, not just numbers. Choice B captures both. Choice A focuses on only one minor detail. Choice C is not the focus. Choice D mentions a debate but underrepresents what the passage actually emphasizes.',
      },
      {
        id: 'passage-004-q2',
        skill: 'detail',
        question: 'According to the passage, in what way did Lovelace\'s vision go beyond Babbage\'s own thinking?',
        choices: [
          { label: 'A', text: 'She believed the engine could be built cheaply using materials of the time.' },
          { label: 'B', text: 'She proposed that the engine could manipulate any symbol, not only numbers.' },
          { label: 'C', text: 'She argued that the engine could replace human mathematicians entirely.' },
          { label: 'D', text: 'She designed the physical components of the Analytical Engine herself.' },
        ],
        correctAnswer: 'B',
        explanation: 'The passage explicitly states that Lovelace proposed "an insight that went well beyond Babbage\'s own thinking: that the engine could manipulate any symbol, not just numbers." The other choices are not supported by the passage.',
      },
      {
        id: 'passage-004-q3',
        skill: 'inference',
        question: 'Based on the passage, what can most reasonably be inferred about how most people in the 1840s viewed the Analytical Engine?',
        choices: [
          { label: 'A', text: 'Most people believed it was too dangerous to be used practically.' },
          { label: 'B', text: 'Most people thought it was merely an advanced calculating device, not a general-purpose machine.' },
          { label: 'C', text: 'Most people had not heard of the engine because it was kept secret.' },
          { label: 'D', text: 'Most people were skeptical that any machine could ever perform calculations.' },
        ],
        correctAnswer: 'B',
        explanation: 'The passage says Lovelace recognized the broader potential of programmable machines "at a time when most people saw them only as sophisticated calculators." This directly supports choice B. The passage does not mention fear, secrecy, or general disbelief in machines.',
      },
      {
        id: 'passage-004-q4',
        skill: 'vocabulary',
        question: 'As used in the passage, "undisputed" most nearly means',
        choices: [
          { label: 'A', text: 'surprising and unexpected' },
          { label: 'B', text: 'widely celebrated' },
          { label: 'C', text: 'universally agreed upon' },
          { label: 'D', text: 'confirmed by scientific experiment' },
        ],
        correctAnswer: 'C',
        explanation: 'The passage contrasts ongoing debate about some matters with what is "undisputed" — meaning what no one contests. "Universally agreed upon" captures this sense of settled consensus. The word does not imply surprise, celebration, or experimental proof.',
      },
    ],
  },

  // ─── MODERATE (4) ────────────────────────────────────────────────────────────

  {
    id: 'passage-005',
    title: 'The Hidden World Beneath Our Feet',
    category: 'science',
    difficulty: 'moderate',
    wordCount: 185,
    estimatedReadingTime: 44,
    text: `A single teaspoon of healthy soil may contain more microorganisms than there are people on Earth. This vast underground community — encompassing bacteria, fungi, protozoa, and nematodes — performs functions critical to plant life and, by extension, to agriculture and food security worldwide. The relationship between plants and soil microbes is not merely passive coexistence; it is an active, reciprocal exchange.

Plant roots release sugars, proteins, and other carbon compounds into the surrounding soil in a process called rhizodeposition. These secretions attract and sustain specific microbial communities in what scientists call the rhizosphere — the narrow zone of soil directly influenced by root activity. In return, mycorrhizal fungi extend their thread-like hyphae far beyond the reach of the roots themselves, dramatically expanding the plant's effective surface area for absorbing water and nutrients.

Disruptions to this system can have cascading consequences. Intensive tillage breaks apart fungal networks. Synthetic fertilizers can reduce microbial diversity by creating nutrient conditions that favor a narrow range of species. Some agricultural scientists now argue that restoring soil biodiversity — through reduced tillage, cover cropping, and composting — may prove as important to long-term food production as any technological innovation currently on the horizon.`,
    questions: [
      {
        id: 'passage-005-q1',
        skill: 'main-idea',
        question: 'Which choice best states the main idea of the passage?',
        choices: [
          { label: 'A', text: 'Soil microorganisms are more numerous than people, making soil the densest biologically active substance on Earth.' },
          { label: 'B', text: 'The mutually beneficial relationship between plants and soil microbes is essential to agriculture, and human farming practices can damage it.' },
          { label: 'C', text: 'Mycorrhizal fungi are the most important component of healthy soil because they extend beyond root systems.' },
          { label: 'D', text: 'Synthetic fertilizers have made modern farming more productive but have unknowingly destroyed soil biodiversity.' },
        ],
        correctAnswer: 'B',
        explanation: 'The passage establishes the plant-microbe exchange (reciprocal relationship), explains its agricultural importance, and then describes how farming practices disrupt it. Choice B captures all three elements. Choice A focuses only on the opening statistic. Choice C isolates one organism. Choice D presents fertilizers as the main topic, whereas the passage covers multiple disruptions.',
      },
      {
        id: 'passage-005-q2',
        skill: 'detail',
        question: 'According to the passage, what is rhizodeposition?',
        choices: [
          { label: 'A', text: 'The process by which fungal hyphae absorb nutrients from soil particles' },
          { label: 'B', text: 'The release of carbon compounds by plant roots into surrounding soil' },
          { label: 'C', text: 'The zone of soil directly influenced by root activity' },
          { label: 'D', text: 'The decomposition of organic matter by soil bacteria' },
        ],
        correctAnswer: 'B',
        explanation: 'The passage defines rhizodeposition directly: "Plant roots release sugars, proteins, and other carbon compounds into the surrounding soil in a process called rhizodeposition." Choice C describes the rhizosphere (a different term in the passage). Choices A and D are not definitions provided in the text.',
      },
      {
        id: 'passage-005-q3',
        skill: 'inference',
        question: 'Based on the passage, what can most reasonably be inferred about cover cropping as an agricultural practice?',
        choices: [
          { label: 'A', text: 'Cover cropping eliminates the need for synthetic fertilizers entirely.' },
          { label: 'B', text: 'Cover cropping likely helps preserve or restore soil microbial diversity.' },
          { label: 'C', text: 'Cover cropping was developed specifically to counteract the effects of intensive tillage.' },
          { label: 'D', text: 'Cover cropping is more expensive than conventional farming methods.' },
        ],
        correctAnswer: 'B',
        explanation: 'The passage lists cover cropping alongside reduced tillage and composting as methods for "restoring soil biodiversity." This implies that cover cropping contributes to microbial health. The passage does not claim it eliminates fertilizers, was developed in response to tillage, or is costly.',
      },
      {
        id: 'passage-005-q4',
        skill: 'vocabulary',
        question: 'As used in the passage, "cascading" most nearly means',
        choices: [
          { label: 'A', text: 'slow and gradual' },
          { label: 'B', text: 'immediate and violent' },
          { label: 'C', text: 'spreading through a series of connected effects' },
          { label: 'D', text: 'difficult to reverse once begun' },
        ],
        correctAnswer: 'C',
        explanation: 'The passage says disruptions to the soil system "can have cascading consequences," then goes on to describe how tillage breaks fungal networks and fertilizers reduce microbial diversity. "Cascading" describes a chain of effects that spread from one disruption to another — choice C. The word implies sequence and connection, not speed or irreversibility specifically.',
      },
    ],
  },

  {
    id: 'passage-006',
    title: 'Too Many Choices',
    category: 'social-science',
    difficulty: 'moderate',
    wordCount: 179,
    estimatedReadingTime: 43,
    text: `For most of human history, choice was a luxury. Survival depended on making do with whatever resources were available, not on selecting among abundant alternatives. In contemporary consumer societies, however, the situation has reversed dramatically: people routinely face hundreds of options for any given purchase, from breakfast cereal to health insurance plans. Psychologists studying this phenomenon have found that an excess of choice, rather than increasing satisfaction, often produces the opposite effect.

This outcome is sometimes called the paradox of choice. When options multiply beyond a certain threshold, decision-making becomes burdensome rather than empowering. Individuals spend more time deliberating, become more anxious about making the wrong choice, and feel greater regret after selecting, since the unchosen options remain vividly in mind as benchmarks. Research comparing shoppers at markets offering six varieties of jam versus twenty-four found that those given fewer options were ten times more likely to make a purchase and reported higher satisfaction with their choice.

Organizational implications follow naturally. Businesses that streamline their offerings — eliminating low-performing variants and presenting a curated selection — often see increased sales and higher customer satisfaction scores, suggesting that less, presented well, can outperform more.`,
    questions: [
      {
        id: 'passage-006-q1',
        skill: 'main-idea',
        question: 'Which choice best states the main idea of the passage?',
        choices: [
          { label: 'A', text: 'Modern consumers are less satisfied than their ancestors because they take abundance for granted.' },
          { label: 'B', text: 'Excessive choice leads to anxiety and lower satisfaction, which has practical implications for how businesses structure their offerings.' },
          { label: 'C', text: 'The jam experiment proves that limiting consumer choice always increases sales and satisfaction.' },
          { label: 'D', text: 'Consumer societies have produced a paradox in which freedom of choice makes individuals less free.' },
        ],
        correctAnswer: 'B',
        explanation: 'The passage traces the psychological mechanism (too many options → anxiety, regret, difficulty deciding) and then draws an organizational conclusion about business strategy. Choice B covers both. Choice A overstates the comparison to ancestors. Choice C uses "always," which overgeneralizes one study. Choice D is philosophical and not quite what the passage argues.',
      },
      {
        id: 'passage-006-q2',
        skill: 'detail',
        question: 'According to the passage, how did the jam experiment results differ between six-variety and twenty-four-variety displays?',
        choices: [
          { label: 'A', text: 'The twenty-four variety display attracted more shoppers to the table.' },
          { label: 'B', text: 'Shoppers at the six-variety display were ten times more likely to make a purchase.' },
          { label: 'C', text: 'Shoppers at the twenty-four-variety display spent twice as much money on average.' },
          { label: 'D', text: 'The six-variety display caused shoppers to choose more quickly but feel less satisfied.' },
        ],
        correctAnswer: 'B',
        explanation: 'The passage states explicitly that shoppers given fewer options "were ten times more likely to make a purchase and reported higher satisfaction." Choice B matches this precisely. The other choices introduce details that are not in the passage.',
      },
      {
        id: 'passage-006-q3',
        skill: 'inference',
        question: 'Based on the passage, what can most reasonably be inferred about why people feel more regret after choosing from many options?',
        choices: [
          { label: 'A', text: 'They are inherently indecisive and need guidance from others to make good decisions.' },
          { label: 'B', text: 'The unchosen options remain visible as comparisons, making it easier to imagine having done better.' },
          { label: 'C', text: 'They spend so long deciding that they become emotionally attached to the options they rejected.' },
          { label: 'D', text: 'More options generally means lower quality per item, so dissatisfaction is justified.' },
        ],
        correctAnswer: 'B',
        explanation: 'The passage explains that after selecting, "the unchosen options remain vividly in mind as benchmarks." When there are many rejected alternatives, there are many mental comparisons available, making regret more likely. Choice B directly reflects this mechanism. The other choices introduce ideas not supported by the text.',
      },
      {
        id: 'passage-006-q4',
        skill: 'vocabulary',
        question: 'As used in the passage, "curated" most nearly means',
        choices: [
          { label: 'A', text: 'randomly selected' },
          { label: 'B', text: 'carefully chosen and organized' },
          { label: 'C', text: 'priced competitively' },
          { label: 'D', text: 'produced in limited quantities' },
        ],
        correctAnswer: 'B',
        explanation: 'In context, businesses offer "a curated selection" as the better alternative to an overwhelming number of options. The word implies thoughtful selection and arrangement, not randomness, pricing, or scarcity. "Carefully chosen and organized" best fits the usage.',
      },
    ],
  },

  {
    id: 'passage-007',
    title: 'The Unreliable Narrator',
    category: 'literature',
    difficulty: 'moderate',
    wordCount: 183,
    estimatedReadingTime: 44,
    text: `A narrator who cannot be trusted to tell the full or accurate truth has become one of fiction's most compelling devices. The unreliable narrator — a term coined by literary critic Wayne Booth in 1961 — is a storytelling technique in which the character telling the story has a distorted, incomplete, or deliberately misleading perspective. This gap between what the narrator reports and what the reader can infer actually occurred generates much of a novel's tension and interpretive richness.

Unreliability can arise from multiple sources. A narrator may be too young to understand the significance of what they witness, as in many coming-of-age novels. They may be in psychological denial, telling themselves a flattering version of events that the narrative ironically undercuts. Or they may be consciously lying, withholding information to manipulate the reader's sympathies.

The technique demands active reading. Unlike an omniscient narrator who presents events as a kind of documentary record, the unreliable narrator requires readers to read between the lines, to question the story being told against the evidence the story provides. This additional layer of interpretation has made unreliable narration a particular favorite of literary theorists, who see in it a formal enactment of the broader postmodern claim that all perception is inherently subjective.`,
    questions: [
      {
        id: 'passage-007-q1',
        skill: 'main-idea',
        question: 'Which choice best states the main idea of the passage?',
        choices: [
          { label: 'A', text: 'Wayne Booth coined the term "unreliable narrator" in 1961, establishing it as a formal concept in literary criticism.' },
          { label: 'B', text: 'The unreliable narrator is a narrative technique that creates interpretive richness by requiring readers to actively question the story they are told.' },
          { label: 'C', text: 'Unreliable narrators are most commonly found in coming-of-age novels and postmodern fiction.' },
          { label: 'D', text: 'All narrators are inherently unreliable because human perception is subjective.' },
        ],
        correctAnswer: 'B',
        explanation: 'The passage defines the technique, explains its sources, and describes the interpretive demands it places on readers. Choice B captures this full picture. Choice A highlights only a historical footnote. Choice C narrows to specific genres. Choice D overstates the postmodern claim, which the passage presents as one theoretical perspective, not its own assertion.',
      },
      {
        id: 'passage-007-q2',
        skill: 'detail',
        question: 'According to the passage, what makes an unreliable narrator different from an omniscient narrator?',
        choices: [
          { label: 'A', text: 'An omniscient narrator is a character in the story, while an unreliable narrator is not.' },
          { label: 'B', text: 'An omniscient narrator presents events as a documentary record, while an unreliable narrator requires readers to read critically.' },
          { label: 'C', text: 'An omniscient narrator is more commonly used in modern fiction than an unreliable narrator.' },
          { label: 'D', text: 'An omniscient narrator always tells the truth, while an unreliable narrator always lies.' },
        ],
        correctAnswer: 'B',
        explanation: 'The passage contrasts the two: "Unlike an omniscient narrator who presents events as a kind of documentary record, the unreliable narrator requires readers to read between the lines." Choice B restates this contrast accurately. Choice D overstates the difference — unreliable narrators may be self-deceived or limited, not necessarily lying.',
      },
      {
        id: 'passage-007-q3',
        skill: 'inference',
        question: 'Based on the passage, what can most reasonably be inferred about why literary theorists are drawn to unreliable narration?',
        choices: [
          { label: 'A', text: 'Literary theorists prefer techniques that make fiction more entertaining and accessible to general readers.' },
          { label: 'B', text: 'The technique illustrates a theoretical claim about subjectivity in a form readers can directly experience.' },
          { label: 'C', text: 'Literary theorists invented the technique and therefore have a particular interest in defending it.' },
          { label: 'D', text: 'The technique is more common in contemporary fiction, which is what most theorists study.' },
        ],
        correctAnswer: 'B',
        explanation: 'The passage says unreliable narration is "a formal enactment of the broader postmodern claim that all perception is inherently subjective." This means the technique appeals to theorists because it puts their theoretical ideas into practice in a way readers can encounter directly. Choices C and D are not supported. Choice A misrepresents what theorists value.',
      },
      {
        id: 'passage-007-q4',
        skill: 'vocabulary',
        question: 'As used in the passage, "ironically undercuts" most nearly means',
        choices: [
          { label: 'A', text: 'completely destroys the narrator\'s credibility in an obvious way' },
          { label: 'B', text: 'subtly contradicts, through the events of the story, what the narrator claims' },
          { label: 'C', text: 'adds humor by exaggerating the narrator\'s faults' },
          { label: 'D', text: 'reduces the emotional impact of the narrator\'s account' },
        ],
        correctAnswer: 'B',
        explanation: 'The passage describes a narrator who tells "a flattering version of events that the narrative ironically undercuts." Ironic undercutting means the story\'s events or details quietly contradict the narrator\'s self-serving account. This is subtle — not obvious destruction (A), not humorous exaggeration (C), and not a reduction in emotional impact (D).',
      },
    ],
  },

  {
    id: 'passage-008',
    title: 'Cotton, Coal, and Capital',
    category: 'history',
    difficulty: 'moderate',
    wordCount: 187,
    estimatedReadingTime: 45,
    text: `The Industrial Revolution is often narrated as a story of machines — spinning frames, steam engines, and power looms that transformed production in Britain during the late eighteenth and early nineteenth centuries. This technological focus, while accurate, risks obscuring the economic preconditions that made industrialization possible. Before machines could proliferate, capital had to accumulate — and that accumulation had complex, often troubling origins.

The Atlantic trade system played a significant role. Profits generated by the transatlantic slave trade and plantation agriculture in the Americas flowed into British port cities such as Bristol and Liverpool. These funds were invested in banks, insurance companies, and manufacturing ventures. While historians debate the precise proportion of industrial capital traceable to slavery, few dispute that the circuits of Atlantic commerce created the financial infrastructure on which early industrialists drew.

Domestic factors also mattered. Britain's legal system offered relatively strong property rights, reducing the risk of investing in fixed capital such as factories. Agricultural enclosures displaced rural workers and created a wage-labor pool available for factory employment. Taken together, these conditions — accumulated capital, financial networks, legal protections, and available labor — created a context in which technological innovation could take hold and spread at unprecedented speed.`,
    questions: [
      {
        id: 'passage-008-q1',
        skill: 'main-idea',
        question: 'Which choice best states the main idea of the passage?',
        choices: [
          { label: 'A', text: 'The Industrial Revolution was caused primarily by British inventions in textile and steam technology.' },
          { label: 'B', text: 'The Industrial Revolution depended not only on machines but on pre-existing capital, legal conditions, and labor supply with complex origins.' },
          { label: 'C', text: 'The profits of the transatlantic slave trade were the single most important cause of British industrialization.' },
          { label: 'D', text: 'Agricultural enclosures were the most significant domestic factor in creating Britain\'s industrial workforce.' },
        ],
        correctAnswer: 'B',
        explanation: 'The passage argues that the standard "machines" narrative misses the economic preconditions — capital from Atlantic trade, legal infrastructure, and displaced agricultural labor. Choice B captures this corrective argument. Choice A is the view the passage challenges. Choices C and D elevate single factors to a prominence the passage does not assert.',
      },
      {
        id: 'passage-008-q2',
        skill: 'detail',
        question: 'According to the passage, what role did agricultural enclosures play in industrialization?',
        choices: [
          { label: 'A', text: 'They generated the capital needed to fund early factories.' },
          { label: 'B', text: 'They displaced rural workers and created a pool of wage laborers for factories.' },
          { label: 'C', text: 'They reduced food prices, which allowed factory workers to survive on lower wages.' },
          { label: 'D', text: 'They concentrated land ownership among industrialists who reinvested profits.' },
        ],
        correctAnswer: 'B',
        explanation: 'The passage states that "agricultural enclosures displaced rural workers and created a wage-labor pool available for factory employment." Choice B restates this directly. Choices A, C, and D describe effects not attributed to enclosures in the passage.',
      },
      {
        id: 'passage-008-q3',
        skill: 'inference',
        question: 'Based on the passage, what can most reasonably be inferred about the relationship between British property rights and industrialization?',
        choices: [
          { label: 'A', text: 'Strong property rights made British investors more willing to commit money to factories and fixed capital.' },
          { label: 'B', text: 'Property rights in Britain were stronger than anywhere else in the world, giving Britain a unique advantage.' },
          { label: 'C', text: 'Property rights primarily benefited small artisans rather than large factory owners.' },
          { label: 'D', text: 'Without strong property rights, technological innovation in other areas still could have driven industrialization.' },
        ],
        correctAnswer: 'A',
        explanation: 'The passage says Britain\'s legal system "offered relatively strong property rights, reducing the risk of investing in fixed capital such as factories." This implies investors were more willing to commit money when their investments were legally protected. Choice B overstates (the passage says "relatively strong," not uniquely strongest). Choices C and D are not supported.',
      },
      {
        id: 'passage-008-q4',
        skill: 'vocabulary',
        question: 'As used in the passage, "preconditions" most nearly means',
        choices: [
          { label: 'A', text: 'problems that had to be solved before progress could occur' },
          { label: 'B', text: 'circumstances that had to exist before something else could happen' },
          { label: 'C', text: 'agreements made in advance between investors and manufacturers' },
          { label: 'D', text: 'earlier stages of a process that have since been forgotten' },
        ],
        correctAnswer: 'B',
        explanation: 'The passage asks readers to consider "the economic preconditions that made industrialization possible." A precondition is a prior condition required for something else to occur — choice B. The word does not imply problems, agreements, or forgotten history.',
      },
    ],
  },

  // ─── CHALLENGING (4) ─────────────────────────────────────────────────────────

  {
    id: 'passage-009',
    title: 'Entanglement and Observation',
    category: 'science',
    difficulty: 'challenging',
    wordCount: 196,
    estimatedReadingTime: 47,
    text: `Quantum entanglement describes a phenomenon in which two or more particles become correlated in such a way that the quantum state of each particle cannot be described independently of the others, regardless of the spatial distance between them. When a measurement is performed on one entangled particle — determining, say, its spin along a given axis — the complementary property of its partner is instantaneously fixed, even if that partner is light-years away.

This apparent instantaneity troubled early commentators, including Einstein, who derided it as "spooky action at a distance" and argued it implied that quantum mechanics was an incomplete theory, one that must invoke hidden variables to preserve local realism. Experiments conducted in the decades following, particularly those designed to test Bell's inequalities, have consistently ruled out local hidden variable theories. The correlations predicted by quantum mechanics, and observed in laboratories, cannot be explained by any pre-existing agreement between particles.

Yet entanglement does not violate relativity, because no usable information can be transmitted faster than light through the entangled correlation alone. A researcher observing particle A learns nothing about what researcher B measured until they compare notes through a conventional channel. The randomness of individual measurement outcomes — each result is unpredictable in isolation — prevents the correlation from being exploited as a communication conduit.`,
    questions: [
      {
        id: 'passage-009-q1',
        skill: 'main-idea',
        question: 'Which choice best states the main idea of the passage?',
        choices: [
          { label: 'A', text: 'Quantum entanglement proves that particles can communicate with each other faster than light, challenging Einstein\'s theory of relativity.' },
          { label: 'B', text: 'Quantum entanglement is a real phenomenon in which correlated particles influence each other instantly, yet it cannot be used to send information and does not violate relativity.' },
          { label: 'C', text: 'Einstein\'s objection to quantum entanglement, based on hidden variables, has been vindicated by recent experimental evidence.' },
          { label: 'D', text: 'The randomness of quantum measurement outcomes is the central problem that physicists are still trying to resolve.' },
        ],
        correctAnswer: 'B',
        explanation: 'The passage establishes that entanglement is real (experiments have confirmed the correlations), that it appears instantaneous, but that it cannot transmit information and therefore does not violate relativity. Choice B captures this full, nuanced picture. Choice A incorrectly says relativity is challenged. Choice C is the opposite of what the passage says — Einstein\'s hidden-variable view was ruled out. Choice D narrows the topic.',
      },
      {
        id: 'passage-009-q2',
        skill: 'detail',
        question: 'According to the passage, why did experiments testing Bell\'s inequalities matter?',
        choices: [
          { label: 'A', text: 'They confirmed that faster-than-light communication is possible under certain conditions.' },
          { label: 'B', text: 'They ruled out the possibility that entanglement correlations result from hidden variables established in advance.' },
          { label: 'C', text: 'They demonstrated that quantum mechanics is an incomplete theory, as Einstein suspected.' },
          { label: 'D', text: 'They showed that entangled particles do share information, but only along classical channels.' },
        ],
        correctAnswer: 'B',
        explanation: 'The passage states that Bell\'s inequality tests "have consistently ruled out local hidden variable theories" and that the correlations "cannot be explained by any pre-existing agreement between particles." Choice B accurately restates this. Choices A, C, and D contradict the passage.',
      },
      {
        id: 'passage-009-q3',
        skill: 'inference',
        question: 'Based on the passage, what can most reasonably be inferred about why entanglement cannot be used to send messages?',
        choices: [
          { label: 'A', text: 'The technology needed to maintain entanglement over long distances does not yet exist.' },
          { label: 'B', text: 'Individual measurement outcomes are random, so an observer cannot control what result their partner will see.' },
          { label: 'C', text: 'Entangled particles lose their correlation as soon as one particle is measured.' },
          { label: 'D', text: 'Relativity prevents particles from influencing each other across spatial distances.' },
        ],
        correctAnswer: 'B',
        explanation: 'The passage explains: "The randomness of individual measurement outcomes — each result is unpredictable in isolation — prevents the correlation from being exploited as a communication conduit." Because outcomes are random, an observer cannot encode a message into what their partner detects. Choice A introduces a practical limitation not mentioned in the passage. Choices C and D contradict the passage.',
      },
      {
        id: 'passage-009-q4',
        skill: 'vocabulary',
        question: 'As used in the passage, "conduit" most nearly means',
        choices: [
          { label: 'A', text: 'physical container' },
          { label: 'B', text: 'theoretical framework' },
          { label: 'C', text: 'channel for transmitting something' },
          { label: 'D', text: 'indirect measurement' },
        ],
        correctAnswer: 'C',
        explanation: 'The passage says the randomness of measurement "prevents the correlation from being exploited as a communication conduit." A conduit is a channel or medium through which something passes — here, a channel through which information would travel. The context of "communication" makes "channel for transmitting something" the clearest match.',
      },
    ],
  },

  {
    id: 'passage-010',
    title: 'The Capital We Carry',
    category: 'social-science',
    difficulty: 'challenging',
    wordCount: 193,
    estimatedReadingTime: 46,
    text: `Sociologist Pierre Bourdieu proposed that social life is structured not only by economic capital — money and property — but by other forms of capital that confer advantages and reproduce social inequality across generations. His most influential formulation distinguished among social capital (networks of relationships and mutual obligations), cultural capital (knowledge, credentials, and cultural competencies), and symbolic capital (prestige and recognized authority). These forms are convertible into one another and into economic capital, though the conversions are rarely transparent or easy.

Cultural capital, in Bourdieu's framework, operates in both embodied and objectified forms. The embodied form consists of durable dispositions — ways of speaking, carrying oneself, and appreciating aesthetic objects — that are acquired over years of socialization and cannot be transmitted as rapidly as money. This "feel for the game" shapes what occupational and educational spaces an individual can credibly enter. The objectified form consists of cultural goods: books, artworks, instruments, whose ownership signals, and partly enacts, cultural participation.

Critics have challenged the framework on grounds that it risks treating social reproduction as nearly inevitable, leaving insufficient room for individual agency or the transformative potential of social movements. Yet even those skeptical of Bourdieu's more deterministic tendencies often retain his vocabulary, acknowledging that advantage is rarely reducible to money alone.`,
    questions: [
      {
        id: 'passage-010-q1',
        skill: 'main-idea',
        question: 'Which choice best states the main idea of the passage?',
        choices: [
          { label: 'A', text: 'Bourdieu identified multiple forms of capital beyond money that shape social advantage and inequality, though his framework has been criticized for overstating determinism.' },
          { label: 'B', text: 'Social capital, cultural capital, and economic capital are all equally important in determining a person\'s life outcomes.' },
          { label: 'C', text: 'Bourdieu\'s concept of embodied cultural capital explains why socialization during childhood is the most important factor in social mobility.' },
          { label: 'D', text: 'Critics have largely rejected Bourdieu\'s framework because it ignores the role of individual effort and achievement.' },
        ],
        correctAnswer: 'A',
        explanation: 'The passage introduces Bourdieu\'s multi-capital framework, explains cultural capital in detail, and then notes criticisms about determinism — while acknowledging the framework\'s enduring influence. Choice A captures this structure. Choice B makes an unsupported equality claim. Choice C overstates one aspect of the framework. Choice D overstates the rejection — critics retain his vocabulary.',
      },
      {
        id: 'passage-010-q2',
        skill: 'detail',
        question: 'According to the passage, what distinguishes embodied cultural capital from objectified cultural capital?',
        choices: [
          { label: 'A', text: 'Embodied capital can be passed on quickly through money, while objectified capital takes years to develop.' },
          { label: 'B', text: 'Embodied capital consists of internalized dispositions acquired through socialization, while objectified capital consists of owned cultural goods.' },
          { label: 'C', text: 'Embodied capital is recognized by institutions, while objectified capital is recognized by social networks.' },
          { label: 'D', text: 'Embodied capital refers to formal credentials, while objectified capital refers to informal knowledge.' },
        ],
        correctAnswer: 'B',
        explanation: 'The passage defines embodied capital as "durable dispositions — ways of speaking, carrying oneself" acquired through socialization, and objectified capital as "cultural goods: books, artworks, instruments." Choice B accurately captures both definitions. The other choices conflate or reverse the distinctions.',
      },
      {
        id: 'passage-010-q3',
        skill: 'inference',
        question: 'Based on the passage, what can most reasonably be inferred about why Bourdieu\'s vocabulary persists even among his critics?',
        choices: [
          { label: 'A', text: 'Critics lack alternative frameworks and must use Bourdieu\'s until new theories are developed.' },
          { label: 'B', text: 'His concepts capture something real about how non-economic advantages operate, even if his conclusions go too far.' },
          { label: 'C', text: 'Critics agree with Bourdieu\'s core determinism but object to his terminology.' },
          { label: 'D', text: 'Academic convention requires scholars to engage with foundational texts even when they disagree.' },
        ],
        correctAnswer: 'B',
        explanation: 'The passage says that even critics "skeptical of Bourdieu\'s more deterministic tendencies often retain his vocabulary, acknowledging that advantage is rarely reducible to money alone." This implies the vocabulary remains useful because it identifies real phenomena (non-economic advantages), even if the deterministic framework goes too far. Choice A invents a reason not in the passage. Choice C reverses the disagreement. Choice D is too procedural.',
      },
      {
        id: 'passage-010-q4',
        skill: 'vocabulary',
        question: 'As used in the passage, "dispositions" most nearly means',
        choices: [
          { label: 'A', text: 'final decisions or legal arrangements' },
          { label: 'B', text: 'formal qualifications held by an individual' },
          { label: 'C', text: 'ingrained tendencies in how one acts, thinks, or perceives' },
          { label: 'D', text: 'material objects that reflect a person\'s cultural background' },
        ],
        correctAnswer: 'C',
        explanation: 'The passage uses "durable dispositions" to describe the embodied form of cultural capital, giving examples such as "ways of speaking, carrying oneself, and appreciating aesthetic objects." These are habitual, internalized tendencies — not legal arrangements (A), formal credentials (B), or physical objects (D, which describes objectified capital).',
      },
    ],
  },

  {
    id: 'passage-011',
    title: 'The Interior Made Visible',
    category: 'literature',
    difficulty: 'challenging',
    wordCount: 190,
    estimatedReadingTime: 46,
    text: `When early twentieth-century novelists sought to break with the conventions of Victorian realism, many turned inward — not to the dramatic external world of action and consequence that had dominated fiction for a century, but to the continuous, ungoverned flow of a character's mental experience. The technique that emerged, stream of consciousness, attempts to render thought as it actually occurs: associative, fragmented, only partly coherent, shaped by memory and sensation rather than narrative logic.

The challenge this technique poses is formally paradoxical. Language is sequential — words follow one another in time — yet consciousness in its pre-linguistic state is not. A mind may hold multiple impressions simultaneously, move between the remote past and the present moment in a fraction of a second, and attend to a sensory detail with the same intensity it gives to an abstract moral question. To translate this simultaneity into a linear text without losing its essential quality requires the writer to exploit rhythm, syntax disruption, free indirect discourse, and other techniques that bend prose toward the nonlinear.

Critics debated from the outset whether the technique achieves genuine fidelity to mental experience or merely creates a new literary convention masquerading as raw interiority. The question remains unresolved — and is perhaps unresolvable — given that readers can only evaluate the representation against their own introspective experience, which is itself mediated by language.`,
    questions: [
      {
        id: 'passage-011-q1',
        skill: 'main-idea',
        question: 'Which choice best states the main idea of the passage?',
        choices: [
          { label: 'A', text: 'Stream of consciousness is a technique that early modernists used to break from Victorian realism, though it faces an inherent formal paradox and unresolved questions about authenticity.' },
          { label: 'B', text: 'Victorian realism failed to capture human experience because it focused on external events rather than inner mental life.' },
          { label: 'C', text: 'Stream of consciousness is the most significant technical innovation in the history of the novel.' },
          { label: 'D', text: 'Critics have concluded that stream of consciousness is ultimately a literary convention rather than a genuine record of thought.' },
        ],
        correctAnswer: 'A',
        explanation: 'The passage covers three things: why stream of consciousness emerged (reaction against realism), the formal challenge it faces (language is linear, thought is not), and the unresolved critical debate about its authenticity. Choice A captures all three. Choice B is the motivation only. Choice C is not asserted. Choice D misstates the critical conclusion — the question is "unresolved," not settled against the technique.',
      },
      {
        id: 'passage-011-q2',
        skill: 'detail',
        question: 'According to the passage, what formal paradox does stream of consciousness face?',
        choices: [
          { label: 'A', text: 'It requires highly structured prose to convey an experience that feels unstructured.' },
          { label: 'B', text: 'Language is linear and sequential, but the consciousness it aims to represent is simultaneous and non-sequential.' },
          { label: 'C', text: 'It seeks to portray reality more accurately than realism, yet uses techniques that make the text harder to follow.' },
          { label: 'D', text: 'Readers cannot evaluate stream of consciousness because they have no access to real mental experience.' },
        ],
        correctAnswer: 'B',
        explanation: 'The passage states directly: "Language is sequential — words follow one another in time — yet consciousness in its pre-linguistic state is not." A mind can hold multiple impressions at once and jump through time. This is the formal paradox — choice B. Choice A inverts the framing (structure vs. unstructure). Choices C and D address different points in the passage.',
      },
      {
        id: 'passage-011-q3',
        skill: 'inference',
        question: 'Based on the passage, what can most reasonably be inferred about why the debate over stream of consciousness\'s authenticity cannot be resolved?',
        choices: [
          { label: 'A', text: 'Neurological science has not yet developed tools accurate enough to measure thought processes in real time.' },
          { label: 'B', text: 'Readers can only compare stream of consciousness representations to their own inner experience, which is itself shaped by language.' },
          { label: 'C', text: 'Different readers have fundamentally different types of consciousness, so no single representation can be accurate.' },
          { label: 'D', text: 'Authors of stream of consciousness fiction are not always honest about the extent to which they shaped their characters\' inner worlds.' },
        ],
        correctAnswer: 'B',
        explanation: 'The passage says the question is "perhaps unresolvable — given that readers can only evaluate the representation against their own introspective experience, which is itself mediated by language." The standard of evaluation (readers\' introspection) is tainted by the very thing in question (language). Choice B captures this circularity. Choices A, C, and D introduce ideas not in the passage.',
      },
      {
        id: 'passage-011-q4',
        skill: 'vocabulary',
        question: 'As used in the passage, "fidelity" most nearly means',
        choices: [
          { label: 'A', text: 'loyalty to a person or cause' },
          { label: 'B', text: 'accuracy in reproducing something' },
          { label: 'C', text: 'emotional depth or feeling' },
          { label: 'D', text: 'clarity and ease of understanding' },
        ],
        correctAnswer: 'B',
        explanation: 'The passage asks "whether the technique achieves genuine fidelity to mental experience," meaning whether it accurately reproduces what thinking actually feels like. "Accuracy in reproducing something" best fits this context. While "fidelity" can mean loyalty (A), that sense does not apply here. The passage is about representational accuracy, not emotion (C) or clarity (D).',
      },
    ],
  },

  {
    id: 'passage-012',
    title: 'When the Algorithm Decides',
    category: 'technology',
    difficulty: 'challenging',
    wordCount: 194,
    estimatedReadingTime: 46,
    text: `Machine learning systems trained on historical data inherit the patterns embedded in that data — including its biases. When a credit-scoring algorithm is trained on lending histories from a period in which certain demographic groups were systematically denied credit, the model learns to associate those groups with risk, perpetuating the original discrimination in a form that appears objective because it is mathematical. The appearance of neutrality is, in this sense, a form of concealment.

Several mechanisms produce this effect. Selection bias occurs when training data over-represents some populations and under-represents others, so that the model performs poorly on groups it has rarely seen. Label bias arises when the outcomes used to supervise the model — such as loan defaults or job performance ratings — were themselves produced by biased human decisions. Proxy discrimination emerges when a model excludes an explicitly protected attribute but uses correlated variables — zip code, purchasing behavior, vocabulary patterns — that effectively reintroduce the exclusion.

Remediation is technically and normatively contested. Equalized accuracy across groups can require training separate models or reweighting data, but these approaches may trade one form of unfairness for another. More fundamentally, the choice of which fairness metric to optimize encodes value judgments that are inherently political, making purely technical solutions insufficient and requiring that algorithmic systems be governed by democratic oversight rather than delegated entirely to engineers.`,
    questions: [
      {
        id: 'passage-012-q1',
        skill: 'main-idea',
        question: 'Which choice best states the main idea of the passage?',
        choices: [
          { label: 'A', text: 'Machine learning models perpetuate historical biases through several mechanisms, and fixing this problem requires both technical and political responses.' },
          { label: 'B', text: 'Algorithms are inherently biased because the mathematicians who design them bring their own prejudices to the work.' },
          { label: 'C', text: 'Selection bias is the most common and dangerous form of algorithmic bias in credit-scoring systems.' },
          { label: 'D', text: 'Democratic oversight of algorithms is the only effective solution to the problem of machine learning bias.' },
        ],
        correctAnswer: 'A',
        explanation: 'The passage describes the problem (inherited historical bias), its mechanisms (selection bias, label bias, proxy discrimination), and then explains why purely technical fixes are insufficient (requiring democratic governance). Choice A covers all three. Choice B wrongly locates the bias in designers rather than data. Choice C elevates one mechanism. Choice D overstates the conclusion — the passage says technical solutions are "insufficient," not useless, and oversight is necessary alongside, not exclusively.',
      },
      {
        id: 'passage-012-q2',
        skill: 'detail',
        question: 'According to the passage, how does proxy discrimination occur?',
        choices: [
          { label: 'A', text: 'A model explicitly uses a protected attribute such as race or gender to make predictions.' },
          { label: 'B', text: 'A model excludes a protected attribute but relies on correlated variables that effectively reintroduce it.' },
          { label: 'C', text: 'A model is trained on data that under-represents certain demographic groups.' },
          { label: 'D', text: 'A model learns from outcome labels that were produced by biased human decisions.' },
        ],
        correctAnswer: 'B',
        explanation: 'The passage defines proxy discrimination specifically: the model "excludes an explicitly protected attribute but uses correlated variables — zip code, purchasing behavior, vocabulary patterns — that effectively reintroduce the exclusion." Choice B matches this definition. Choice C describes selection bias. Choice D describes label bias.',
      },
      {
        id: 'passage-012-q3',
        skill: 'inference',
        question: 'Based on the passage, what can most reasonably be inferred about why technical remediation of algorithmic bias is insufficient on its own?',
        choices: [
          { label: 'A', text: 'Technical solutions are too expensive for most organizations to implement effectively.' },
          { label: 'B', text: 'Deciding which fairness standard to apply involves value judgments that engineers are not qualified to make.' },
          { label: 'C', text: 'Every technical fix creates new forms of bias that require further technical correction indefinitely.' },
          { label: 'D', text: 'The choice of which fairness metric to optimize reflects political values that require democratic legitimacy, not just engineering judgment.' },
        ],
        correctAnswer: 'D',
        explanation: 'The passage states that "the choice of which fairness metric to optimize encodes value judgments that are inherently political," requiring democratic oversight. This implies that the decisions involved are not purely technical — they involve political choices about what counts as fairness. Choice D captures this reasoning. Choice B is close but frames engineers as unqualified, whereas the passage says the decisions are political (requiring democratic governance), not that engineers lack intelligence. Choice C introduces an infinite regress not stated in the passage.',
      },
      {
        id: 'passage-012-q4',
        skill: 'vocabulary',
        question: 'As used in the passage, "concealment" most nearly means',
        choices: [
          { label: 'A', text: 'deliberate deception by an individual actor' },
          { label: 'B', text: 'a technical error in the model\'s design' },
          { label: 'C', text: 'the hiding of bias behind a superficially neutral appearance' },
          { label: 'D', text: 'the omission of important data from the training set' },
        ],
        correctAnswer: 'C',
        explanation: 'The passage argues that a mathematical model looks objective while actually perpetuating discrimination: "The appearance of neutrality is, in this sense, a form of concealment." Concealment here means hiding bias behind a neutral-seeming surface — not deliberate individual deception (A), which implies intentionality the passage does not assert, nor a design error (B), nor missing data (D).',
      },
    ],
  },
]
