import type { AcademySkill } from '../types'

export const centralIdeasDetails: AcademySkill = {
  slug: 'central-ideas-details',
  title: 'Central Ideas and Details',
  section: 'reading',
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
      difficulty: 'easy',
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
      difficulty: 'easy',
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
      difficulty: 'easy',
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
      difficulty: 'medium',
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
      difficulty: 'medium',
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
      difficulty: 'medium',
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
      difficulty: 'medium',
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
      difficulty: 'hard',
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
      difficulty: 'hard',
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
      difficulty: 'hard',
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
  ],
}
