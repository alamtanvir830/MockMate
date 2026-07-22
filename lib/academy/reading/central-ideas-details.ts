import type { AcademySkill } from '../types'

export const centralIdeasDetails: AcademySkill = {
  slug: 'central-ideas-details',
  title: 'Central Ideas and Details',
  section: 'reading',
  objective:
    'By the end of this lesson, you will be able to identify the central idea of a passage and distinguish it from supporting details, secondary points, and specific facts.',
  estimatedMinutes: 22,
  subskills: [
    'Main Claim Identification',
    'Primary Purpose',
    'Explicit Detail Retrieval',
    'Summary vs. Overstatement',
    'Broad vs. Narrow Choices',
    'Primary vs. Secondary Ideas',
  ],
  overview: {
    whatItTests:
      'The ability to identify what a passage is mainly about and which specific details are directly stated in the text.',
    howItAppears:
      'Questions ask "Which choice best states the main idea of the passage?" or "According to the passage, which of the following is true?"',
    whyStudentsMissIt:
      'Students choose answers that are true in the real world but not stated in the passage, or they mistake a single supporting detail for the main idea.',
    whatToLookFor:
      'The idea the author keeps returning to for main-idea questions, and the exact line that states the fact for detail questions.',
  },
  strategy: {
    steps: [
      'Read the passage once and summarize it in a single sentence before you look at the choices.',
      'For main-idea questions, eliminate answers that are too narrow (only one detail) or too broad (going beyond the passage).',
      'For detail questions, find the specific line in the text that supports your answer.',
      'Never rely on outside knowledge; the answer must come from the passage itself.',
    ],
    timeSavingTip:
      'Write or think a one-sentence summary immediately after reading. The main-idea answer will echo your summary, letting you eliminate quickly.',
    whenNotToOverthink:
      'If a detail answer is copied almost word for word from the passage and matches the question, trust it rather than searching for a hidden twist.',
  },
  commonTraps: [
    {
      title: 'The detail-as-main-idea trap',
      description:
        'A choice states a true detail from the passage but presents it as if it were the overall point.',
      avoidance:
        'Ask whether the choice covers the whole passage or only one sentence. A main idea must cover the entire passage.',
    },
    {
      title: 'The true-but-not-in-passage trap',
      description:
        'A choice states something that is factually true in the real world but is never actually said in the passage.',
      avoidance:
        'Point to the exact line that supports the answer. If you cannot, the answer is not supported.',
    },
    {
      title: 'The extreme-language trap',
      description:
        'A choice uses absolute words like "always," "never," or "the only" that the passage does not support.',
      avoidance:
        'Extreme wording usually overstates the passage. Prefer answers that match the passage\'s more moderate claims.',
    },
    {
      title: 'The implied-versus-stated trap',
      description:
        'For detail questions, a choice describes something the passage hints at rather than explicitly states.',
      avoidance:
        'Detail questions require an explicit statement. Save inferences for inference questions.',
    },
  ],
  guidedExamples: [
    {
      id: 'cid-ex-1',
      level: 'sat-application',
      hints: [
        'Look at the last sentence of the passage: it names the mapmaker\'s "real skill." That phrase is your clue.',
        'Ask whether each choice covers the whole passage or only one part — ancient mapmakers or modern ones.',
        'Watch for choices that use the word "unreliable" or "obsolete" — the passage never makes those claims.',
      ],
      coachTakeaway:
        'On main-idea questions, the correct answer must span the whole passage. If a choice only fits one paragraph, it is too narrow. If it claims something the passage never argues, it is too broad.',
      stimulus:
        'For centuries, mapmakers left blank spaces where they lacked information, sometimes filling them with drawings of imagined creatures. Modern cartographers face the opposite problem: satellites now supply so much data that the challenge is deciding what to leave out. A map that showed everything would be unreadable. The mapmaker\'s real skill, then, has always been selection, whether choosing what to invent or choosing what to omit.',
      question: 'Which choice best states the main idea of the passage?',
      steps: [
        {
          instruction: 'Summarize the passage',
          content:
            'The passage compares old and modern mapmakers and concludes that both face a problem of selection: what to invent then, what to omit now.',
        },
        {
          instruction: 'Identify the recurring idea',
          content:
            'The last sentence states the point directly: the mapmaker\'s "real skill... has always been selection." That is the idea the whole passage builds toward.',
        },
        {
          instruction: 'Eliminate too-narrow and too-broad choices',
          content:
            'Choices about only satellites or only imaginary creatures are too narrow. A choice claiming maps are unreliable goes beyond the passage.',
        },
        {
          instruction: 'Confirm the correct choice',
          content:
            'The answer that says mapmaking has always required deciding what to include and leave out matches the concluding sentence.',
        },
      ],
      choices: [
        {
          label: 'A',
          text: 'Modern satellites have made older maps completely obsolete.',
        },
        {
          label: 'B',
          text: 'The central skill of mapmaking has always been deciding what to include and what to leave out.',
        },
        {
          label: 'C',
          text: 'Early mapmakers enjoyed drawing imaginary creatures in blank spaces.',
        },
        {
          label: 'D',
          text: 'Maps can never be fully accurate because they leave out information.',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'The passage traces mapmaking from the past to the present and concludes that selection has "always been" the mapmaker\'s real skill. Choice B captures this overarching point.',
      wrongAnswerExplanations: {
        A: 'This overstates one part of the passage; the passage compares old and new mapmaking rather than declaring old maps obsolete.',
        C: 'This is a supporting detail about early mapmakers, not the main idea that covers the whole passage.',
        D: 'The passage never claims maps are unreliable; leaving out information is described as a skill, not a flaw.',
      },
    },
    {
      id: 'cid-ex-2',
      level: 'foundation',
      hints: [
        'Find the sentence that directly answers the question. It is in the first sentence of the passage.',
        'The question asks about the cause of the octopus fitting through openings. Find the word that names that cause.',
        'Eliminate choices that mention things the passage describes but does not link to the ability to fit through openings.',
      ],
      coachTakeaway:
        'For detail questions, locate the one sentence that answers the exact question and match it to a choice. Do not use outside knowledge — only what the passage states.',
      stimulus:
        'The octopus has no bones, which lets it squeeze its entire body through any opening larger than its beak, the only hard part of its anatomy. Divers have watched octopuses escape through gaps the width of a coin. This flexibility helps them hide from predators and reach prey tucked into narrow crevices in the reef.',
      question:
        'According to the passage, what allows an octopus to fit through very small openings?',
      steps: [
        {
          instruction: 'Locate the relevant detail',
          content:
            'The first sentence explains that the octopus "has no bones," which lets it squeeze through openings larger than its beak.',
        },
        {
          instruction: 'Match the detail to a choice',
          content:
            'The cause of the octopus\'s flexibility is its lack of bones, so look for a choice naming that fact.',
        },
        {
          instruction: 'Eliminate unsupported choices',
          content:
            'Choices about intelligence or camouflage color are not stated as the cause of fitting through openings.',
        },
        {
          instruction: 'Confirm the correct choice',
          content:
            'The answer naming its lack of bones is directly supported by the first sentence.',
        },
      ],
      choices: [
        { label: 'A', text: 'Its lack of bones' },
        { label: 'B', text: 'Its ability to change color' },
        { label: 'C', text: 'Its high intelligence' },
        { label: 'D', text: 'The strength of its beak' },
      ],
      correctAnswer: 'A',
      explanation:
        'The passage explicitly states the octopus "has no bones, which lets it squeeze its entire body through any opening larger than its beak." The lack of bones is the stated cause.',
      wrongAnswerExplanations: {
        B: 'Changing color is never mentioned in the passage; this is outside information.',
        C: 'The passage does not mention intelligence as the reason the octopus fits through openings.',
        D: 'The beak is described as the only hard part that limits the opening size, not as what allows the octopus to squeeze through.',
      },
    },
    {
      id: 'cid-ex-3',
      level: 'sat-application',
      hints: [
        'Identify the turning point in the passage — the word or phrase that shifts from what was expected to what happened.',
        'The main idea must cover both the expectation and the outcome. Choices that only address the fear or only address the bakers will be too narrow.',
        'Watch for choices that say something "should never" happen — the passage does not make that broad a claim.',
      ],
      coachTakeaway:
        'When a passage sets up an expectation and then reverses it, the main idea is almost always the reversal and its explanation, not the original fear.',
      stimulus:
        'When the small bakery began posting the recipe for its most popular bread online, regular customers worried that sales would fall. Instead, business grew. Many home bakers who tried the recipe found the process harder than expected and decided the finished loaf was easier to buy. Others, proud of their attempts, began recommending the bakery to friends.',
      question: 'Which choice best states the main idea of the passage?',
      steps: [
        {
          instruction: 'Summarize the passage',
          content:
            'Sharing the recipe was expected to hurt sales but actually helped, because home bakers found it hard and recommended the bakery.',
        },
        {
          instruction: 'Identify the recurring idea',
          content:
            'The turning point is "Instead, business grew," and the rest explains why sharing the recipe increased sales.',
        },
        {
          instruction: 'Eliminate narrow or unsupported choices',
          content:
            'A choice only about home bakers struggling covers one detail. A choice saying recipes should never be shared is too broad and not stated.',
        },
        {
          instruction: 'Confirm the correct choice',
          content:
            'The answer stating that sharing the recipe unexpectedly boosted the bakery\'s business matches the whole passage.',
        },
      ],
      choices: [
        {
          label: 'A',
          text: 'Bakeries should avoid posting their recipes online.',
        },
        {
          label: 'B',
          text: 'Home bakers usually fail when they try difficult recipes.',
        },
        {
          label: 'C',
          text: 'Sharing its popular recipe unexpectedly increased the bakery\'s business.',
        },
        {
          label: 'D',
          text: 'The bakery\'s bread was its only successful product.',
        },
      ],
      correctAnswer: 'C',
      explanation:
        'The passage sets up a fear that sales would fall, then shows the opposite happened and explains why. Choice C captures this surprising outcome, which the whole passage supports.',
      wrongAnswerExplanations: {
        A: 'This is the opposite of the passage, which shows sharing the recipe helped rather than hurt the bakery.',
        B: 'This overstates a detail; some home bakers struggled, but the passage does not claim home bakers usually fail at difficult recipes.',
        D: 'The passage never says the bread was the bakery\'s only successful product; it only calls it the most popular.',
      },
    },
  ],
  drillQuestions: [
    {
      id: 'cid-d-001',
      skillSlug: 'central-ideas-details',
      level: 'foundation',
      difficulty: 'easy',
      errorCategory: 'explicit-detail-retrieval',
      stimulus:
        'Honeybees communicate the location of flowers through a "waggle dance." By moving in a figure-eight pattern and angling their bodies, a returning bee tells the others which direction to fly and how far to go.',
      question:
        'According to the passage, what does the waggle dance tell other bees?',
      choices: [
        { label: 'A', text: 'Which direction to fly and how far to go' },
        { label: 'B', text: 'How to build the hive' },
        { label: 'C', text: 'When winter is coming' },
        { label: 'D', text: 'Which flowers taste best' },
      ],
      correctAnswer: 'A',
      explanation:
        'The passage states the dance tells other bees "which direction to fly and how far to go."',
      wrongAnswerExplanations: {
        B: 'Building the hive is never mentioned in the passage.',
        C: 'The passage does not discuss seasons or winter.',
        D: 'The passage mentions location, not taste.',
      },
      teachingPoint:
        'For detail questions, find the exact sentence that answers the question and match it word for word.',
    },
    {
      id: 'cid-d-002',
      skillSlug: 'central-ideas-details',
      level: 'foundation',
      difficulty: 'easy',
      errorCategory: 'main-claim-identification',
      stimulus:
        'The city planted hundreds of trees along its hottest streets. Within a few summers, residents reported that these streets felt noticeably cooler, and shop owners said more people lingered outdoors.',
      question: 'Which choice best states the main idea of the passage?',
      choices: [
        {
          label: 'A',
          text: 'Shop owners disliked the new trees on their streets.',
        },
        {
          label: 'B',
          text: 'Planting trees made the city\'s hot streets cooler and more pleasant.',
        },
        { label: 'C', text: 'The city spent too much money on trees.' },
        { label: 'D', text: 'Trees grow quickly in hot weather.' },
      ],
      correctAnswer: 'B',
      explanation:
        'The passage describes planting trees and the cooling and pleasant effects that followed, which is the main point.',
      wrongAnswerExplanations: {
        A: 'This contradicts the passage; shop owners said more people lingered outdoors.',
        C: 'The passage never mentions cost.',
        D: 'How fast trees grow is not discussed.',
      },
      teachingPoint:
        'The main idea should cover the whole passage, not just one reaction or detail.',
    },
    {
      id: 'cid-d-003',
      skillSlug: 'central-ideas-details',
      level: 'foundation',
      difficulty: 'easy',
      errorCategory: 'explicit-detail-retrieval',
      stimulus:
        'Unlike most reptiles, sea turtles cannot pull their heads and legs into their shells. This leaves them more exposed to predators, but it also makes their bodies more streamlined for swimming long distances.',
      question:
        'According to the passage, one result of sea turtles being unable to retract into their shells is that they',
      choices: [
        { label: 'A', text: 'live longer than other reptiles' },
        { label: 'B', text: 'are more streamlined for swimming' },
        { label: 'C', text: 'have thicker shells' },
        { label: 'D', text: 'stay on land most of the time' },
      ],
      correctAnswer: 'B',
      explanation:
        'The passage states this trait "makes their bodies more streamlined for swimming long distances."',
      wrongAnswerExplanations: {
        A: 'Lifespan is not mentioned in the passage.',
        C: 'Shell thickness is never discussed.',
        D: 'The passage emphasizes swimming, not staying on land.',
      },
      teachingPoint:
        'When a passage names a result, pick the choice that restates that exact result.',
    },
    {
      id: 'cid-d-004',
      skillSlug: 'central-ideas-details',
      level: 'sat-application',
      difficulty: 'medium',
      errorCategory: 'summary-vs-overstatement',
      stimulus:
        'Early photographers had to keep their subjects perfectly still for several minutes, because film needed a long time to capture enough light. This is why people in old portraits rarely smile: holding a grin steady for minutes was uncomfortable and looked strange. As film grew more sensitive, exposure times shrank, and natural smiles became common.',
      question: 'Which choice best states the main idea of the passage?',
      choices: [
        {
          label: 'A',
          text: 'People in the past were generally unhappier than people today.',
        },
        {
          label: 'B',
          text: 'Long exposure times, not gloomy moods, explain why early portraits rarely show smiles.',
        },
        {
          label: 'C',
          text: 'Modern cameras are far more expensive than early ones.',
        },
        { label: 'D', text: 'Smiling for photographs is a recent invention.' },
      ],
      correctAnswer: 'B',
      explanation:
        'The passage explains the technical reason early portraits lacked smiles and how faster film changed this, which is the central point.',
      wrongAnswerExplanations: {
        A: 'This is a tempting real-world assumption, but the passage attributes the lack of smiles to technology, not mood.',
        C: 'Cost is never mentioned in the passage.',
        D: 'The passage says smiles became common as technology improved, not that smiling itself was invented.',
      },
      teachingPoint:
        'Beware the answer that "sounds right" from real life. The passage gives a technical cause, so choose it.',
    },
    {
      id: 'cid-d-005',
      skillSlug: 'central-ideas-details',
      level: 'sat-application',
      difficulty: 'medium',
      errorCategory: 'explicit-detail-retrieval',
      stimulus:
        'The researcher had assumed that noisy classrooms would always hurt learning. Her study found something more complex: a low, steady background hum sometimes helped students focus, while sudden bursts of noise consistently disrupted them. It was not the volume that mattered most, she concluded, but whether the sound was predictable.',
      question:
        'According to the passage, what did the researcher conclude mattered most for classroom noise?',
      choices: [
        { label: 'A', text: 'The total volume of the sound' },
        { label: 'B', text: 'Whether the sound was predictable' },
        { label: 'C', text: 'The number of students in the room' },
        { label: 'D', text: 'The time of day the class met' },
      ],
      correctAnswer: 'B',
      explanation:
        'The final sentence states it was "not the volume that mattered most... but whether the sound was predictable."',
      wrongAnswerExplanations: {
        A: 'The passage directly rejects volume as the most important factor.',
        C: 'The number of students is never mentioned.',
        D: 'Time of day is not discussed in the passage.',
      },
      teachingPoint:
        'When a passage says "not X but Y," the answer is Y, and X is a common trap.',
    },
    {
      id: 'cid-d-006',
      skillSlug: 'central-ideas-details',
      level: 'sat-application',
      difficulty: 'medium',
      errorCategory: 'main-claim-identification',
      stimulus:
        'Coral reefs cover less than one percent of the ocean floor, yet they shelter roughly a quarter of all marine species. Because so many creatures depend on them for food and protection, scientists often call reefs the "rain forests of the sea," a comparison meant to highlight their enormous variety of life.',
      question: 'Which choice best states the main idea of the passage?',
      choices: [
        {
          label: 'A',
          text: 'Coral reefs support a remarkable amount of marine life despite their small size.',
        },
        {
          label: 'B',
          text: 'Rain forests and coral reefs are located near each other.',
        },
        {
          label: 'C',
          text: 'Most marine species live far from coral reefs.',
        },
        {
          label: 'D',
          text: 'Coral reefs cover most of the ocean floor.',
        },
      ],
      correctAnswer: 'A',
      explanation:
        'The passage contrasts the reefs\' tiny area with the huge share of species they support, which is its central point.',
      wrongAnswerExplanations: {
        B: 'The rain forest comparison is about variety of life, not physical location.',
        C: 'This contradicts the passage, which says reefs shelter a quarter of marine species.',
        D: 'The passage says reefs cover less than one percent of the ocean floor.',
      },
      teachingPoint:
        'A "despite" or "yet" structure often signals the main idea: a contrast between small size and large importance.',
    },
    {
      id: 'cid-d-007',
      skillSlug: 'central-ideas-details',
      level: 'sat-application',
      difficulty: 'medium',
      errorCategory: 'explicit-detail-retrieval',
      stimulus:
        'The volunteers expected the cleanup to be discouraging. Instead, they discovered that once the first stretch of riverbank was cleared, neighbors who had never joined before began showing up with bags and gloves. By the third weekend, the group had doubled, and the visible progress kept newcomers coming back.',
      question:
        'According to the passage, what caused new neighbors to join the cleanup?',
      choices: [
        { label: 'A', text: 'A cash reward offered by the city' },
        { label: 'B', text: 'The visible progress along the riverbank' },
        { label: 'C', text: 'A change in the weather' },
        { label: 'D', text: 'A new law requiring participation' },
      ],
      correctAnswer: 'B',
      explanation:
        'The passage states that once the first stretch was cleared, neighbors began joining, and "the visible progress kept newcomers coming back."',
      wrongAnswerExplanations: {
        A: 'No reward is mentioned in the passage.',
        C: 'Weather is never discussed.',
        D: 'The passage describes volunteers, not a legal requirement.',
      },
      teachingPoint:
        'For cause-and-effect details, locate the specific reason the passage gives, not a plausible outside explanation.',
    },
    {
      id: 'cid-d-008',
      skillSlug: 'central-ideas-details',
      level: 'advanced',
      difficulty: 'hard',
      errorCategory: 'primary-vs-secondary-ideas',
      stimulus:
        'Critics once dismissed folk tales as simple entertainment for children, unworthy of serious study. The scholar\'s new book challenges that view. By tracing how the same story travels across cultures, changing details to fit each society\'s fears and hopes, she argues that folk tales are a record of how communities understand themselves. Far from being trivial, she suggests, they may be among the most revealing texts a culture produces.',
      question: 'Which choice best states the main idea of the passage?',
      choices: [
        {
          label: 'A',
          text: 'Folk tales are enjoyed mainly by children rather than adults.',
        },
        {
          label: 'B',
          text: 'The scholar argues that folk tales, long dismissed as trivial, reveal how communities understand themselves.',
        },
        {
          label: 'C',
          text: 'The same folk tale is never told in more than one culture.',
        },
        {
          label: 'D',
          text: 'Modern readers prefer folk tales to other kinds of literature.',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'The passage sets up an old dismissive view and then presents the scholar\'s counterargument that folk tales are revealing records of communities, which is the central point.',
      wrongAnswerExplanations: {
        A: 'This restates the old view the passage argues against, not the passage\'s main point.',
        C: 'This contradicts the passage, which says the same story travels across cultures.',
        D: 'Reader preferences among genres are never discussed.',
      },
      teachingPoint:
        'When a passage says critics "once" thought something but a new work "challenges" it, the main idea is usually the new argument, not the old view.',
    },
    {
      id: 'cid-d-009',
      skillSlug: 'central-ideas-details',
      level: 'advanced',
      difficulty: 'hard',
      errorCategory: 'explicit-detail-retrieval',
      stimulus:
        'The engineer admits that her lightweight bridge design is not the strongest ever built. Its value, she insists, lies elsewhere. Because it uses far less material and can be assembled by a small crew, it can be built quickly in remote areas where heavy equipment cannot reach. In places that need a crossing within weeks rather than years, she argues, speed and simplicity matter more than maximum strength.',
      question:
        'According to the passage, why does the engineer consider her bridge design valuable?',
      choices: [
        {
          label: 'A',
          text: 'It is the strongest bridge design available.',
        },
        {
          label: 'B',
          text: 'It can be built quickly in remote areas with little equipment.',
        },
        {
          label: 'C',
          text: 'It is the least expensive design ever created.',
        },
        {
          label: 'D',
          text: 'It can carry more weight than any other bridge.',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'The passage states the design "can be built quickly in remote areas where heavy equipment cannot reach," and stresses speed and simplicity as its value.',
      wrongAnswerExplanations: {
        A: 'The engineer explicitly admits it is not the strongest design.',
        C: 'The passage mentions using less material, but it never claims the design is the least expensive ever created.',
        D: 'Carrying the most weight is the opposite of what the passage says; it is not the strongest.',
      },
      teachingPoint:
        'When a passage concedes one point ("not the strongest") to emphasize another ("speed and simplicity"), the stated value is the emphasized point.',
    },
    {
      id: 'cid-d-010',
      skillSlug: 'central-ideas-details',
      level: 'advanced',
      difficulty: 'hard',
      errorCategory: 'summary-vs-overstatement',
      stimulus:
        'For years, the town measured the success of its library only by how many books people borrowed. When borrowing numbers dropped, officials assumed the library was failing. A closer look told a different story: visits had actually risen, because people were coming to use computers, attend classes, and meet in study rooms. The library had not declined, the report concluded; it had simply changed what it offered, and the old measurement no longer captured its role.',
      question: 'Which choice best states the main idea of the passage?',
      choices: [
        {
          label: 'A',
          text: 'The library was failing because fewer books were borrowed.',
        },
        {
          label: 'B',
          text: 'The town should close its library to save money.',
        },
        {
          label: 'C',
          text: 'Judging the library only by book borrowing missed how its role had changed.',
        },
        {
          label: 'D',
          text: 'Computers should replace books in all libraries.',
        },
      ],
      correctAnswer: 'C',
      explanation:
        'The passage argues that the old measurement of borrowing failed to capture the library\'s new, broader role, which is its central point.',
      wrongAnswerExplanations: {
        A: 'This restates the assumption the passage corrects; the report concluded the library had not declined.',
        B: 'Closing the library is never suggested; the passage defends it.',
        D: 'The passage says the library added services, not that computers should replace books everywhere.',
      },
      teachingPoint:
        'The main idea often lies in a passage\'s correction of a mistaken assumption, stated near the end.',
    },
    {
      id: 'cid-d-011',
      skillSlug: 'central-ideas-details',
      level: 'sat-application',
      difficulty: 'medium',
      errorCategory: 'primary-vs-secondary-ideas',
      stimulus:
        'A new study of migratory songbirds found that birds departing later in the season arrived at their breeding grounds in better physical condition than early departures. The researchers noted that later migrants encountered more insects along the route and spent fewer nights in cold temperatures. The study\'s lead author emphasized, however, that the advantage applied only to years with mild late-season weather.',
      question: 'Which choice best states the main idea of the passage?',
      choices: [
        {
          label: 'A',
          text: 'Late-departing songbirds arrived in better condition, though the benefit depended on weather conditions.',
        },
        {
          label: 'B',
          text: 'Songbirds should always migrate as late in the season as possible.',
        },
        {
          label: 'C',
          text: 'The number of insects along a migration route determines whether a bird survives.',
        },
        {
          label: 'D',
          text: 'Early migrants arrived at their breeding grounds before late migrants.',
        },
      ],
      correctAnswer: 'A',
      explanation:
        'The passage reports the finding (later departures arrive in better condition) and includes the qualifier (only in mild late-season years). Choice A captures both the main finding and the important condition attached to it.',
      wrongAnswerExplanations: {
        B: '"Always" overstates the passage, which limits the finding to years with mild weather; the passage does not recommend a universal strategy.',
        C: 'Insects are one factor mentioned, but the passage does not claim insects alone determine survival; this is too narrow.',
        D: 'This is a detail implied by the setup but never stated as a finding; the passage focuses on condition at arrival, not timing of arrival itself.',
      },
      teachingPoint:
        'When a passage presents a finding with a qualifier, the main idea must include the qualifier. Choices that drop the qualifier overstate the passage.',
    },
    {
      id: 'cid-d-012',
      skillSlug: 'central-ideas-details',
      level: 'advanced',
      difficulty: 'hard',
      errorCategory: 'summary-vs-overstatement',
      stimulus:
        'The popular account of the 1815 eruption of Mount Tambora portrays it as a sudden catastrophe that caused three years of crop failures across the Northern Hemisphere. Historians who study the period have complicated this picture. While the eruption did inject enormous amounts of ash and sulfur dioxide into the atmosphere, the resulting agricultural disruptions varied widely by region. Some areas suffered severe shortages, while others experienced little disruption at all, depending on local climate patterns and existing food reserves.',
      question: 'Which choice best states the main idea of the passage?',
      choices: [
        {
          label: 'A',
          text: 'The 1815 Tambora eruption had no significant effect on agriculture.',
        },
        {
          label: 'B',
          text: 'The popular account of Tambora\'s agricultural impact is too uniform; the effects varied considerably by region.',
        },
        {
          label: 'C',
          text: 'Sulfur dioxide from volcanic eruptions always causes crop failures.',
        },
        {
          label: 'D',
          text: 'Historians agree that the Tambora eruption caused the worst food crisis in recorded history.',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'The passage contrasts a simple popular account (three years of universal crop failures) with a more nuanced historical picture (effects varied widely by region). Choice B names that contrast without overstating in either direction.',
      wrongAnswerExplanations: {
        A: 'This goes too far in the other direction; the passage confirms the eruption did cause disruptions, just uneven ones.',
        C: '"Always" is an extreme claim the passage never makes; the passage says effects varied by region.',
        D: 'The passage says historians have "complicated" the popular picture, not confirmed it; they emphasize regional variation, not universal severity.',
      },
      teachingPoint:
        'When a passage challenges a simple account without rejecting it entirely, the main idea sits in the middle: "yes, but more complicated than the popular version suggests."',
    },
    {
      id: 'cid-d-013',
      skillSlug: 'central-ideas-details',
      level: 'foundation',
      difficulty: 'easy',
      errorCategory: 'explicit-detail-retrieval',
      stimulus:
        'Photosynthesis occurs in the chloroplasts of plant cells. During this process, plants absorb carbon dioxide from the air and water from the soil, then use energy from sunlight to convert these materials into glucose. Oxygen is released as a byproduct.',
      question:
        'According to the passage, what do plants release as a byproduct of photosynthesis?',
      choices: [
        { label: 'A', text: 'Oxygen' },
        { label: 'B', text: 'Carbon dioxide' },
        { label: 'C', text: 'Glucose' },
        { label: 'D', text: 'Water' },
      ],
      correctAnswer: 'A',
      explanation:
        'The final sentence states that "oxygen is released as a byproduct."',
      wrongAnswerExplanations: {
        B: 'Carbon dioxide is absorbed, not released as a byproduct.',
        C: 'Glucose is the product plants make, not a byproduct released into the environment.',
        D: 'Water is absorbed from the soil as an input, not released as a byproduct.',
      },
      teachingPoint:
        'Detail questions often test your ability to distinguish inputs from outputs in a process. Find the sentence that names the byproduct.',
    },
    {
      id: 'cid-d-014',
      skillSlug: 'central-ideas-details',
      level: 'advanced',
      difficulty: 'hard',
      errorCategory: 'primary-purpose',
      stimulus:
        'In her debut novel, the narrator speaks entirely in the second person, addressing "you" throughout. At first this choice seems merely stylistic, a way to create intimacy. But as the story progresses, the technique forces readers to inhabit the perspective of a character whose choices they may find uncomfortable or even repugnant. The author has said in interviews that she wanted readers to experience moral discomfort firsthand rather than observe it from a safe distance.',
      question: 'Which choice best states the primary purpose of the passage?',
      choices: [
        {
          label: 'A',
          text: 'To summarize the plot of a debut novel',
        },
        {
          label: 'B',
          text: 'To explain how and why the author uses second-person narration as a deliberate technique for moral effect',
        },
        {
          label: 'C',
          text: 'To argue that second-person narration is always more effective than first-person narration',
        },
        {
          label: 'D',
          text: 'To praise the author\'s debut novel as the best of the year',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'The passage describes the second-person choice (how) and then explains its intended effect — producing moral discomfort (why). Choice B captures both elements without overstating the passage\'s claims.',
      wrongAnswerExplanations: {
        A: 'The passage never summarizes the plot; it analyzes a narrative technique.',
        C: '"Always more effective" is an absolute claim the passage never makes; it discusses only this novel\'s use of the technique.',
        D: 'The passage does not evaluate the novel against others or declare it the best; it analyzes a specific technique.',
      },
      teachingPoint:
        'Primary-purpose questions ask why the author wrote the passage, not what it says. Match the verb in your answer ("to explain," "to argue") to what the author actually does.',
    },
    {
      id: 'cid-d-015',
      skillSlug: 'central-ideas-details',
      level: 'challenge',
      difficulty: 'hard',
      errorCategory: 'broad-vs-narrow-choices',
      stimulus:
        'When researchers compared two neighborhoods that had experienced identical drops in temperature during a cold snap, they found a striking difference in hospital admissions for hypothermia. The neighborhood with older housing stock and no community warming center saw admission rates three times higher than the neighborhood that had opened a warming shelter two years earlier. Income levels and population size were nearly identical in both areas. The researchers concluded that access to a warming shelter, not housing quality alone, was the decisive factor.',
      question: 'Which choice best states the main idea of the passage?',
      choices: [
        {
          label: 'A',
          text: 'Old housing causes hypothermia during cold snaps.',
        },
        {
          label: 'B',
          text: 'A comparison of two similar neighborhoods suggests that access to a warming shelter significantly reduces hypothermia hospitalizations.',
        },
        {
          label: 'C',
          text: 'Researchers should study all cold-weather health risks, not just hypothermia.',
        },
        {
          label: 'D',
          text: 'Income levels do not affect health outcomes in cold weather.',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'The passage presents a comparison of two matched neighborhoods and concludes that warming shelter access was the decisive factor in reducing hospitalizations. Choice B accurately names both the method (comparison of similar neighborhoods) and the finding (shelter access reduces hospitalizations).',
      wrongAnswerExplanations: {
        A: 'This is too narrow; housing quality is mentioned but ruled out as the decisive factor. The passage\'s conclusion points to shelter access, not housing alone.',
        C: 'This is not a claim the passage makes; the passage focuses specifically on hypothermia and does not call for broader research topics.',
        D: 'This overstates the passage; income is held constant to isolate the shelter variable, but the passage does not conclude that income never affects health outcomes.',
      },
      teachingPoint:
        'The main idea of a study passage is usually the study\'s conclusion, not a variable that was controlled or ruled out. Controlled variables are part of the method, not the finding.',
    },
  ],
  masteryQuestions: [
    {
      id: 'cid-m-001',
      skillSlug: 'central-ideas-details',
      level: 'foundation',
      difficulty: 'easy',
      errorCategory: 'explicit-detail-retrieval',
      stimulus:
        'The dragonfly is one of the oldest insect types on Earth. Fossil records show that dragonfly ancestors existed more than 300 million years ago, long before dinosaurs appeared. Today\'s dragonflies share the same basic wing structure as those ancient relatives.',
      question:
        'According to the passage, how long ago did dragonfly ancestors exist?',
      choices: [
        { label: 'A', text: 'More than 300 million years ago' },
        { label: 'B', text: 'About 65 million years ago' },
        { label: 'C', text: 'Approximately 10,000 years ago' },
        { label: 'D', text: 'Shortly before dinosaurs appeared' },
      ],
      correctAnswer: 'A',
      explanation:
        'The passage explicitly states that "fossil records show that dragonfly ancestors existed more than 300 million years ago."',
      wrongAnswerExplanations: {
        B: 'This is the approximate time of the dinosaur extinction, not the age of dragonfly ancestors.',
        C: '10,000 years is far too recent; the passage gives 300 million years.',
        D: '"Shortly before dinosaurs" contradicts the passage, which says dragonfly ancestors existed "long before dinosaurs appeared."',
      },
      teachingPoint:
        'When a passage contains a specific number as a detail, the correct answer on a detail question usually restates that number precisely.',
    },
    {
      id: 'cid-m-002',
      skillSlug: 'central-ideas-details',
      level: 'foundation',
      difficulty: 'easy',
      errorCategory: 'explicit-detail-retrieval',
      stimulus:
        'The city\'s new pedestrian bridge was built using recycled steel from a demolished sports arena. The design team wanted to honor the history of the site while reducing construction costs. Opening day drew more than five thousand visitors.',
      question:
        'According to the passage, what material was used to build the pedestrian bridge?',
      choices: [
        { label: 'A', text: 'Recycled steel from a demolished sports arena' },
        { label: 'B', text: 'Timber from a nearby forest' },
        { label: 'C', text: 'Concrete from the original bridge site' },
        { label: 'D', text: 'Aluminum imported from overseas' },
      ],
      correctAnswer: 'A',
      explanation:
        'The passage states the bridge "was built using recycled steel from a demolished sports arena."',
      wrongAnswerExplanations: {
        B: 'Timber is never mentioned in the passage.',
        C: 'Concrete is never mentioned; the passage specifically names recycled steel.',
        D: 'Aluminum and imports are never discussed in the passage.',
      },
      teachingPoint:
        'On straightforward detail questions, look for the choice that copies the passage\'s exact words or paraphrases them precisely.',
    },
    {
      id: 'cid-m-003',
      skillSlug: 'central-ideas-details',
      level: 'sat-application',
      difficulty: 'medium',
      errorCategory: 'main-claim-identification',
      stimulus:
        'The invention of the mechanical clock in medieval Europe did more than tell time: it reorganized daily life. Before accurate clocks, workers gauged the day by sunlight and church bells. After clocks appeared in town squares, merchants scheduled meetings by the hour, night shifts became possible in mills, and the concept of being "on time" or "late" took on new social importance. The clock, historians now argue, made punctuality a social value rather than a mere convenience.',
      question: 'Which choice best states the main idea of the passage?',
      choices: [
        {
          label: 'A',
          text: 'Medieval workers used sunlight and church bells to tell time.',
        },
        {
          label: 'B',
          text: 'The mechanical clock transformed how medieval Europeans organized and valued time in daily life.',
        },
        {
          label: 'C',
          text: 'Merchants in medieval Europe were the first people to value punctuality.',
        },
        {
          label: 'D',
          text: 'Clocks were the most important invention of the medieval period.',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'The passage argues that the clock "reorganized daily life" and made punctuality a social value, covering the entire passage\'s argument. Choice B captures both the practical and cultural transformation.',
      wrongAnswerExplanations: {
        A: 'This is a detail about the period before clocks, not the main idea of the passage.',
        C: 'This overstates the passage; it says merchants scheduled meetings by the hour but does not claim they were the first to value punctuality.',
        D: '"Most important invention" is a claim the passage never makes; it argues about the clock\'s social effects, not its rank among inventions.',
      },
      teachingPoint:
        'When a passage argues that one thing caused broad social changes, the main idea names both the cause and the scope of the change.',
    },
    {
      id: 'cid-m-004',
      skillSlug: 'central-ideas-details',
      level: 'sat-application',
      difficulty: 'medium',
      errorCategory: 'main-claim-identification',
      stimulus:
        'A team of marine scientists reported that kelp forests along one section of coastline had recovered dramatically after sea otters were reintroduced to the area. Sea urchins, which graze heavily on kelp, had previously overpopulated the region after otter populations collapsed in the early twentieth century. With otters back, urchin numbers fell, and kelp density rose to levels not seen in decades. The team called this a textbook example of a trophic cascade.',
      question: 'Which choice best states the main idea of the passage?',
      choices: [
        {
          label: 'A',
          text: 'Sea urchins are the primary threat to all marine ecosystems worldwide.',
        },
        {
          label: 'B',
          text: 'Reintroducing sea otters led to a recovery of kelp forests by reducing sea urchin populations, demonstrating a trophic cascade.',
        },
        {
          label: 'C',
          text: 'Sea otters are the only animals capable of controlling sea urchin populations.',
        },
        {
          label: 'D',
          text: 'Kelp forests collapsed because scientists failed to act earlier.',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'The passage traces a chain: otter reintroduction reduced urchins, urchin reduction allowed kelp to recover, and the scientists labeled this a trophic cascade. Choice B names all three steps and the conclusion.',
      wrongAnswerExplanations: {
        A: '"Primary threat to all marine ecosystems worldwide" vastly overstates the passage, which is about one specific coastal section.',
        C: '"Only animals" is an absolute claim the passage never makes.',
        D: 'The passage never assigns blame to scientists for failing to act; it describes what happened after otters were reintroduced.',
      },
      teachingPoint:
        'When a passage traces a chain of events to a conclusion, the main idea should capture the full chain in brief, not just one link.',
    },
    {
      id: 'cid-m-005',
      skillSlug: 'central-ideas-details',
      level: 'advanced',
      difficulty: 'hard',
      errorCategory: 'primary-purpose',
      stimulus:
        'The essay opens by acknowledging that standardized tests do measure certain skills accurately. It then argues, however, that the skills most heavily tested — memorization and timed recall — are not the skills most valued in professional environments. Employers surveyed in the study consistently ranked creativity, collaborative problem-solving, and adaptability above the abilities that standardized tests assess. The author stops short of calling for the elimination of standardized tests, instead calling for a broader assessment system that includes tests alongside portfolios and project-based evaluations.',
      question: 'Which choice best describes the primary purpose of the passage?',
      choices: [
        {
          label: 'A',
          text: 'To argue that standardized tests should be eliminated immediately',
        },
        {
          label: 'B',
          text: 'To present the case for supplementing standardized tests with broader assessments that measure skills employers actually value',
        },
        {
          label: 'C',
          text: 'To summarize what employers look for when hiring new workers',
        },
        {
          label: 'D',
          text: 'To prove that memorization is a useless skill in professional settings',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'The passage concedes that standardized tests measure some things well, then argues they miss employer-valued skills, and concludes by calling for a broader system. Choice B reflects this nuanced argument without overstating it.',
      wrongAnswerExplanations: {
        A: 'The author explicitly stops short of calling for elimination; this overstates the argument.',
        C: 'Employer preferences are evidence within the argument, not the passage\'s primary purpose; it is advocating for a policy change, not summarizing hiring practices.',
        D: '"Useless" is too extreme; the passage says these skills are not what employers value most, not that they are worthless.',
      },
      teachingPoint:
        'When a passage concedes a point before arguing for a reform, the purpose is to advocate for the reform, not to attack the original system absolutely.',
    },
    {
      id: 'cid-m-006',
      skillSlug: 'central-ideas-details',
      level: 'advanced',
      difficulty: 'hard',
      errorCategory: 'summary-vs-overstatement',
      stimulus:
        'When the city introduced free late-night bus service, ridership on those routes tripled within three months. A survey of riders found that the majority were service-industry workers who had previously relied on expensive car rides or walked home alone late at night. Transit officials noted that the program had not required hiring additional drivers because most buses were already running empty on those routes. The mayor called the expansion the city\'s most cost-effective transit initiative in a decade.',
      question: 'Which choice best states the main idea of the passage?',
      choices: [
        {
          label: 'A',
          text: 'Free late-night bus service dramatically increased ridership and benefited service workers at minimal additional cost, making it a highly cost-effective initiative.',
        },
        {
          label: 'B',
          text: 'The city should make all bus routes free to increase ridership.',
        },
        {
          label: 'C',
          text: 'Service-industry workers are the most important riders in urban transit systems.',
        },
        {
          label: 'D',
          text: 'Late-night bus routes were running empty before the program began.',
        },
      ],
      correctAnswer: 'A',
      explanation:
        'The passage covers tripled ridership, the benefit to service workers, the low cost due to existing empty buses, and the mayor\'s endorsement. Choice A synthesizes all of these into the passage\'s main point.',
      wrongAnswerExplanations: {
        B: 'The passage discusses only late-night routes and never argues for making all routes free; this overgeneralizes.',
        C: '"Most important riders" is a claim the passage never makes; it identifies who benefited, not ranks them.',
        D: 'This is a supporting detail that explains why the program was cost-effective, not the main idea of the passage.',
      },
      teachingPoint:
        'The main idea of a passage about a program usually combines the outcome, the beneficiaries, and the cost — not just one of these elements.',
    },
    {
      id: 'cid-m-007',
      skillSlug: 'central-ideas-details',
      level: 'challenge',
      difficulty: 'hard',
      errorCategory: 'broad-vs-narrow-choices',
      stimulus:
        'Twentieth-century critics often praised the short stories of Katherine Mansfield for their delicate, impressionistic style, but they frequently read her work as essentially autobiographical — the fictional thin wrapper around actual memory. More recent scholarship has pushed back against this reading. Scholars now emphasize how carefully Mansfield constructed her narrators, often giving them perspectives and blind spots that differ significantly from her own documented views. The new consensus treats Mansfield less as a transcriber of experience and more as a craftsperson who shaped raw material into something deliberately artificial.',
      question: 'Which choice best states the main idea of the passage?',
      choices: [
        {
          label: 'A',
          text: 'Katherine Mansfield\'s short stories are poorly understood because they are too autobiographical.',
        },
        {
          label: 'B',
          text: 'Recent scholars have revised the earlier view of Mansfield as purely autobiographical, recognizing instead the deliberate craft of her constructed narrators.',
        },
        {
          label: 'C',
          text: 'Impressionistic style is the defining feature of all short fiction written in the twentieth century.',
        },
        {
          label: 'D',
          text: 'Biographical reading is the most useful method for interpreting any piece of fiction.',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'The passage contrasts an old critical consensus (autobiographical reading) with a new one (deliberate craft), naming the shift as the passage\'s central point. Choice B captures both the old view and the revised one.',
      wrongAnswerExplanations: {
        A: '"Poorly understood" is a misreading; the passage says critics understood her in one way and now understand her differently, not that she remains poorly understood.',
        C: 'This vastly overstates the passage, which discusses only Mansfield, not all twentieth-century short fiction.',
        D: 'The passage argues against biographical reading for Mansfield\'s work; it does not defend biographical reading as a universal method.',
      },
      teachingPoint:
        'When a passage traces a shift in scholarly consensus, the main idea is the shift itself — what changed and why — not just one side of the debate.',
    },
    {
      id: 'cid-m-008',
      skillSlug: 'central-ideas-details',
      level: 'challenge',
      difficulty: 'hard',
      errorCategory: 'primary-vs-secondary-ideas',
      stimulus:
        'Studies of ancient trade networks once focused almost exclusively on goods that survived in the archaeological record: ceramics, metals, and stone tools. Perishable goods — grain, textiles, timber, and spices — were largely invisible to researchers. Advances in isotope analysis and pollen sampling have begun to change this. By examining the chemical signatures of residues inside storage vessels and studying microscopic pollen grains in sediment layers, archaeologists can now detect evidence of goods that left no visible trace. These new techniques are revealing trade networks that were larger and more diverse than previously believed.',
      question: 'Which choice best states the main idea of the passage?',
      choices: [
        {
          label: 'A',
          text: 'Ceramics and metals were the most important goods traded in the ancient world.',
        },
        {
          label: 'B',
          text: 'New analytical techniques are allowing archaeologists to reconstruct ancient trade in perishable goods, revealing networks more extensive than previously known.',
        },
        {
          label: 'C',
          text: 'Isotope analysis is the most accurate scientific method in archaeology.',
        },
        {
          label: 'D',
          text: 'Grain was the single most important commodity in ancient trade networks.',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'The passage explains that new methods (isotope analysis, pollen sampling) are uncovering evidence of perishable trade goods, and that this is expanding our understanding of ancient trade networks. Choice B captures the method, the subject, and the implication.',
      wrongAnswerExplanations: {
        A: 'The passage says ceramics and metals were visible in the archaeological record, not that they were the most important trade goods; this conflates visibility with importance.',
        C: '"Most accurate" is a comparative claim the passage never makes; it describes isotope analysis as useful, not as superior to all other methods.',
        D: 'Grain is listed as one example of a perishable good; the passage never singles it out as the most important commodity.',
      },
      teachingPoint:
        'When a passage describes how new methods are changing a field, the main idea is the change those methods enable, not the details of the methods themselves.',
    },
  ],
}
