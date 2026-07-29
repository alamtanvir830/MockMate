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
    {
      title: `The scope-mismatch trap`,
      description: `A choice states the main idea of only one paragraph rather than the whole passage, or it extends the passage's argument to a context the passage never addresses.`,
      avoidance: `Check whether the choice covers all parts of the passage. A true main idea should account for the opening, the middle, and the conclusion — not just one section.`,
    },
    {
      title: `The purpose-confusion trap`,
      description: `On primary-purpose questions, a choice names what the passage discusses (its topic) rather than what the author is trying to do (the purpose).`,
      avoidance: `Ask yourself what verb best describes the author's action: explain, argue, compare, challenge, describe. Match that verb to the wording of the choice.`,
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
    {
      id: 'cid-ex-4',
      level: 'foundation',
      hints: [
        `Find the sentence that directly answers the question. Look for the part of the passage that explains what the researcher was trying to find.`,
        `The passage describes a specific goal the researcher had. Focus on the sentence that names that goal.`,
        `Eliminate any choice that describes a result the researcher found, not the goal she started with.`,
      ],
      coachTakeaway: `For detail questions, the answer is always directly stated. Locate the exact sentence that answers the question before looking at the choices.`,
      stimulus: `A marine biologist spent three summers tagging dolphins near the harbor to learn how far they traveled during feeding hours. She discovered that some dolphins ranged up to forty miles from the harbor in a single day, much farther than previous researchers had estimated.`,
      question: `According to the passage, what was the marine biologist's goal?`,
      steps: [
        {
          instruction: `Locate the relevant detail`,
          content: `The first sentence says she was "tagging dolphins near the harbor to learn how far they traveled during feeding hours." That phrase names her goal directly.`,
        },
        {
          instruction: `Match the detail to a choice`,
          content: `Her goal was to find out how far dolphins traveled during feeding hours — look for a choice that restates that purpose.`,
        },
        {
          instruction: `Eliminate unsupported choices`,
          content: `The forty-mile discovery is a result, not her original goal. The harbor's location and the number of summers are background details, not the goal.`,
        },
        {
          instruction: `Confirm the correct choice`,
          content: `The choice naming her interest in how far the dolphins traveled during feeding hours matches the passage's first sentence directly.`,
        },
      ],
      choices: [
        { label: 'A', text: 'To determine how far dolphins travel during feeding hours' },
        { label: 'B', text: 'To compare harbor dolphins with open-ocean dolphins' },
        { label: 'C', text: 'To measure the dolphins\' swimming speed' },
        { label: 'D', text: 'To count the number of dolphins near the harbor' },
      ],
      correctAnswer: 'A',
      explanation: `The passage states directly that the biologist was "tagging dolphins near the harbor to learn how far they traveled during feeding hours." This is the stated goal, and it matches Choice A precisely.`,
      wrongAnswerExplanations: {
        B: `Comparing harbor dolphins to open-ocean dolphins is never mentioned in the passage.`,
        C: `Swimming speed is not discussed; the passage focuses on distance traveled.`,
        D: `Counting dolphins is never mentioned; the passage describes tagging them to track travel distance.`,
      },
    },
    {
      id: 'cid-ex-5',
      level: 'sat-application',
      hints: [
        `Notice that the passage presents two contrasting ideas. Which one does the author ultimately argue for?`,
        `The last sentence of the passage signals the author's position. What does it say?`,
        `Eliminate choices that describe only one side of the contrast or that go beyond what the passage claims.`,
      ],
      coachTakeaway: `When a passage presents two sides and then comes down on one, the main idea is the author's position, not a neutral description of both sides.`,
      stimulus: `Some urban planners argue that wide sidewalks slow foot traffic by encouraging people to stop and linger. Others contend that narrow sidewalks create crowding that discourages walking altogether. A decade-long study of twelve cities found that wide sidewalks consistently produced both higher pedestrian counts and faster average travel times, suggesting that the first view underestimates how much people will walk when given comfortable space.`,
      question: `Which choice best states the main idea of the passage?`,
      steps: [
        {
          instruction: `Summarize the passage`,
          content: `The passage presents a debate between two views on sidewalk width and then reports a study that favors wide sidewalks on both counts.`,
        },
        {
          instruction: `Identify the author's position`,
          content: `The last sentence says wide sidewalks "consistently produced" better outcomes and that this suggests the anti-wide-sidewalk view is wrong. The study resolves the debate.`,
        },
        {
          instruction: `Eliminate too-narrow and too-broad choices`,
          content: `A choice only about the debate misses the study's resolution. A choice claiming all urban design debates are resolved by data goes beyond the passage.`,
        },
        {
          instruction: `Confirm the correct choice`,
          content: `The choice that says the study supports wide sidewalks against the common assumption captures the passage's structure and conclusion.`,
        },
      ],
      choices: [
        {
          label: 'A',
          text: 'Urban planners have never agreed on how to design city sidewalks.',
        },
        {
          label: 'B',
          text: 'Narrow sidewalks are always more efficient than wide ones in busy cities.',
        },
        {
          label: 'C',
          text: 'A multi-city study found that wide sidewalks increased both foot traffic and speed, countering the assumption that they slow pedestrians.',
        },
        {
          label: 'D',
          text: 'Pedestrians prefer narrow sidewalks because they create a sense of urgency.',
        },
      ],
      correctAnswer: 'C',
      explanation: `The passage sets up a debate, then resolves it with a study showing wide sidewalks produce higher pedestrian counts and faster travel times — countering the view that they slow people down. Choice C captures the study's finding and its significance.`,
      wrongAnswerExplanations: {
        A: `This is too broad and misses the passage's central point: not that disagreement exists, but that a study resolved the debate in favor of wide sidewalks.`,
        B: `This is the opposite of the passage's conclusion; the study found wide sidewalks outperformed narrow ones.`,
        D: `This contradicts the passage; there is no claim that narrow sidewalks create urgency, and the study found better outcomes from wide ones.`,
      },
    },
    {
      id: 'cid-ex-6',
      level: 'sat-application',
      hints: [
        `Find the line that states what the study found. What specific detail is given about the outcome?`,
        `Be careful: the passage gives a reason why the finding surprised researchers. That reason is context, not the finding itself.`,
        `Eliminate choices that reverse the direction of the finding or introduce information not in the passage.`,
      ],
      coachTakeaway: `On detail questions about study findings, locate the exact sentence that states the result and match it to a choice. The surprise or context around the result is not the result itself.`,
      stimulus: `Researchers studying urban noise expected to find that residents near train stations reported lower sleep quality than those in quieter neighborhoods. Instead, the study found that train-station residents and residents of quiet streets reported nearly identical sleep quality scores. The researchers suggested that people who live near train stations may adapt to predictable noise over time.`,
      question: `According to the passage, what did the researchers find?`,
      steps: [
        {
          instruction: `Locate the relevant detail`,
          content: `The second sentence states the finding: "train-station residents and residents of quiet streets reported nearly identical sleep quality scores."`,
        },
        {
          instruction: `Match the detail to a choice`,
          content: `The finding is that sleep quality was nearly the same in both groups — look for a choice that restates this equivalence.`,
        },
        {
          instruction: `Eliminate unsupported choices`,
          content: `The hypothesis that people adapt to noise is a suggestion, not the finding. The expectation that sleep quality would differ is what the researchers predicted before the study, not what they found.`,
        },
        {
          instruction: `Confirm the correct choice`,
          content: `The choice that sleep quality was similar for train-station and quiet-neighborhood residents directly mirrors the passage's stated result.`,
        },
      ],
      choices: [
        {
          label: 'A',
          text: 'Train-station residents reported worse sleep quality than residents of quiet neighborhoods.',
        },
        {
          label: 'B',
          text: 'Sleep quality was unaffected by any form of urban noise.',
        },
        {
          label: 'C',
          text: 'Train-station residents and quiet-neighborhood residents reported nearly identical sleep quality.',
        },
        {
          label: 'D',
          text: 'Residents of quiet neighborhoods slept significantly more hours per night.',
        },
      ],
      correctAnswer: 'C',
      explanation: `The passage explicitly states that the two groups "reported nearly identical sleep quality scores." This directly matches Choice C.`,
      wrongAnswerExplanations: {
        A: `This was the researchers' expectation before the study, not what they actually found; the passage says the result was the opposite.`,
        B: `The passage only compares these two groups; it makes no broader claim about all urban noise.`,
        D: `Hours of sleep are never mentioned; the passage discusses sleep quality scores, not duration.`,
      },
    },
    {
      id: 'cid-ex-7',
      level: 'advanced',
      hints: [
        `Ask what the author is doing in this passage, not just what it is about. Is the author explaining, arguing, comparing, or challenging?`,
        `Notice that the passage both describes a criticism and defends against it. Which action is primary?`,
        `Eliminate choices that describe only the criticism or only the defense, since the passage does both.`,
      ],
      coachTakeaway: `Primary-purpose questions ask about the author's action. A passage that presents a criticism and then responds to it has defending or rebutting as its primary purpose, not merely describing.`,
      stimulus: `Economists who study behavioral finance have argued that traditional economic models fail because they assume people make rational decisions. Defenders of traditional models respond that irrational behavior tends to average out across large markets, so the models remain useful for predicting aggregate trends even if they miss individual choices. The debate continues, but traditional models have retained their central place in policy discussions precisely because of their predictive usefulness at scale.`,
      question: `Which choice best describes the primary purpose of the passage?`,
      steps: [
        {
          instruction: `Summarize the passage`,
          content: `The passage describes a criticism of traditional economic models, the defense offered by their supporters, and the conclusion that those models remain useful despite the criticism.`,
        },
        {
          instruction: `Identify what the author is doing`,
          content: `The author presents both sides of a debate and ends by noting the outcome: traditional models retain their central place. The author is explaining an ongoing debate and its current status, not advocating for either side.`,
        },
        {
          instruction: `Eliminate choices that are too narrow or too extreme`,
          content: `A choice that says the author is arguing against behavioral finance ignores the balanced presentation. A choice that says the author argues traditional models are perfect overstates the passage.`,
        },
        {
          instruction: `Confirm the correct choice`,
          content: `The choice that describes explaining both the challenge to and the defense of traditional economic models matches what the author actually does.`,
        },
      ],
      choices: [
        {
          label: 'A',
          text: 'To explain the challenge behavioral economists pose to traditional models and the response those models\' defenders offer',
        },
        {
          label: 'B',
          text: 'To argue that behavioral economics has permanently replaced traditional economic modeling',
        },
        {
          label: 'C',
          text: 'To prove that irrational individual behavior makes all economic prediction impossible',
        },
        {
          label: 'D',
          text: 'To describe why economists should stop using large-scale market models',
        },
      ],
      correctAnswer: 'A',
      explanation: `The passage presents the behavioral economists' critique, the defenders' response, and the current status of the debate. Choice A accurately names both sides of this exchange without overstating the author's position.`,
      wrongAnswerExplanations: {
        B: `The passage explicitly states that traditional models "retained their central place," which contradicts the idea that behavioral economics has replaced them.`,
        C: `The defenders argue that irrational behavior averages out and models remain useful; the passage never claims prediction is impossible.`,
        D: `The passage says traditional models are still central to policy discussions; recommending their abandonment is the opposite of what the passage concludes.`,
      },
    },
    {
      id: 'cid-ex-8',
      level: 'advanced',
      hints: [
        `This is a challenge-level question. Notice that the passage presents a paradox — two things that seem contradictory. The main idea will explain or acknowledge that paradox.`,
        `Identify both halves of the paradox: what the research showed at first, and what the longer follow-up found.`,
        `Eliminate any choice that resolves the paradox by picking only one side; the passage keeps both truths in tension.`,
      ],
      coachTakeaway: `When a passage holds two apparently contradictory findings in tension without resolving them, the main idea names the tension, not one side of it.`,
      stimulus: `Studies of early childhood reading programs consistently found that children who participated showed large gains in reading scores by age seven. However, follow-up research tracking the same children through age twelve found that those gains had largely faded; by middle school, participants and non-participants performed similarly. Researchers are divided: some argue the programs still matter because they give children a crucial early confidence, while others contend that without sustained support, early gains cannot be maintained.`,
      question: `Which choice best states the main idea of the passage?`,
      steps: [
        {
          instruction: `Summarize the passage`,
          content: `Early reading programs produced measurable gains by age seven, but those gains largely disappeared by age twelve, leaving researchers divided about the programs' lasting value.`,
        },
        {
          instruction: `Identify what the passage is really saying`,
          content: `The passage does not resolve the debate — it presents the early benefit, the later fade, and the ongoing disagreement. The main idea must include both the gain and the fade.`,
        },
        {
          instruction: `Eliminate choices that pick only one side`,
          content: `A choice that says early programs clearly work ignores the fade. A choice that says they clearly fail ignores the early gains and the confidence argument.`,
        },
        {
          instruction: `Confirm the correct choice`,
          content: `The choice that mentions both the initial gains and the later fade, and acknowledges the ongoing debate, captures the full picture the passage presents.`,
        },
      ],
      choices: [
        {
          label: 'A',
          text: 'Early childhood reading programs produce lasting gains that follow children into middle school.',
        },
        {
          label: 'B',
          text: 'Early childhood reading programs have no measurable effect on reading scores.',
        },
        {
          label: 'C',
          text: 'Early reading programs show initial gains in reading scores, but those gains tend to fade, leaving researchers divided about the programs\' long-term value.',
        },
        {
          label: 'D',
          text: 'Researchers agree that sustained support is the only factor that determines long-term reading success.',
        },
      ],
      correctAnswer: 'C',
      explanation: `The passage presents early gains, follow-up evidence of fading, and the resulting research debate. Choice C captures all three elements without resolving the debate in a direction the passage does not support.`,
      wrongAnswerExplanations: {
        A: `This contradicts the follow-up research showing gains had largely faded by age twelve.`,
        B: `This ignores the consistent early gains the studies found by age seven.`,
        D: `"Researchers agree" is wrong — the passage says researchers are divided, and the passage only presents sustained support as one possible explanation, not a point of consensus.`,
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
    {
      id: 'cid-d-016',
      skillSlug: 'central-ideas-details',
      level: 'foundation',
      difficulty: 'easy',
      stimulus: `Monarch butterflies travel up to three thousand miles during their annual migration from Canada to Mexico. They navigate using the sun as a compass and can adjust their direction as the sun moves across the sky throughout the day.`,
      question: `According to the passage, how do monarch butterflies navigate during migration?`,
      choices: [
        { label: 'A', text: 'By using the sun as a compass' },
        { label: 'B', text: 'By following rivers and mountain ranges' },
        { label: 'C', text: 'By detecting changes in temperature' },
        { label: 'D', text: 'By following older butterflies in the group' },
      ],
      correctAnswer: 'A',
      explanation: `The passage explicitly states that monarch butterflies navigate "using the sun as a compass and can adjust their direction as the sun moves across the sky."`,
      wrongAnswerExplanations: {
        B: `Rivers and mountain ranges are never mentioned as navigation tools in the passage.`,
        C: `Temperature changes are not discussed as a navigation method in the passage.`,
        D: `The passage does not mention following older butterflies; it describes a solar compass mechanism.`,
      },
      teachingPoint: `On detail questions, the answer is always directly stated. Find the sentence that answers the exact question, then match it to a choice.`,
    },
    {
      id: 'cid-d-017',
      skillSlug: 'central-ideas-details',
      level: 'foundation',
      difficulty: 'easy',
      stimulus: `The ancient city of Çatalhöyük in present-day Turkey is one of the earliest known urban settlements, dating back roughly nine thousand years. Its residents lived in mud-brick houses arranged so closely together that people entered their homes through holes in the roof rather than ground-level doors.`,
      question: `According to the passage, why did residents of Çatalhöyük enter their homes through the roof?`,
      choices: [
        { label: 'A', text: 'To protect themselves from flooding' },
        { label: 'B', text: 'To follow a religious tradition of the city' },
        { label: 'C', text: 'Because the houses were arranged too closely to have ground-level doors' },
        { label: 'D', text: 'Because the doors were reserved for animals' },
      ],
      correctAnswer: 'C',
      explanation: `The passage states that houses were "arranged so closely together that people entered their homes through holes in the roof rather than ground-level doors." The close arrangement of the houses — not flooding, religion, or animals — is the explicitly stated reason.`,
      wrongAnswerExplanations: {
        A: `Flooding is never mentioned in the passage.`,
        B: `Religious tradition is not given as a reason; the passage attributes rooftop entry to the close arrangement of the houses.`,
        D: `Animals are never mentioned in the passage.`,
      },
      teachingPoint: `For detail questions, the passage always gives an explicit reason. Match the reason stated in the text — don't add outside knowledge.`,
    },
    {
      id: 'cid-d-018',
      skillSlug: 'central-ideas-details',
      level: 'sat-application',
      difficulty: 'medium',
      stimulus: `The introduction of the printing press in the fifteenth century did not immediately make books cheaper. Early printed books were often as expensive as hand-copied ones, partly because printers tried to imitate manuscript style to appeal to buyers who associated value with the traditional handmade look. Only after several decades did production efficiencies and increased competition begin to drive prices down.`,
      question: `Which choice best states the main idea of the passage?`,
      choices: [
        { label: 'A', text: 'The printing press immediately lowered the price of books throughout Europe.' },
        { label: 'B', text: 'Printers in the fifteenth century were less skilled than manuscript copyists.' },
        { label: 'C', text: 'Although the printing press was invented in the fifteenth century, its effect of making books cheaper took decades to materialize.' },
        { label: 'D', text: 'Early printers copied the style of manuscripts because they wanted to deceive buyers.' },
      ],
      correctAnswer: 'C',
      explanation: `The passage explains that early printed books were as expensive as hand-copied ones and that prices only fell after several decades. Choice C captures this delayed effect, which is the central point.`,
      wrongAnswerExplanations: {
        A: `This is the opposite of the passage's opening claim; the passage says the printing press did not immediately make books cheaper.`,
        B: `The relative skill of printers versus copyists is never compared in the passage.`,
        D: `The passage says printers imitated manuscript style to appeal to buyers' existing preferences, not to deceive them.`,
      },
      teachingPoint: `When a passage challenges a common assumption ("did not immediately"), the main idea is often that the assumed effect was delayed or more complicated than expected.`,
    },
    {
      id: 'cid-d-019',
      skillSlug: 'central-ideas-details',
      level: 'sat-application',
      difficulty: 'medium',
      stimulus: `A study of elementary school students found that those who received instruction in music theory showed measurably stronger performance in mathematics compared with students who received no music instruction. The researchers emphasized, however, that the study did not establish a causal link between music theory and math performance because students who chose music classes may have had stronger academic motivation to begin with.`,
      question: `According to the passage, why did the researchers hesitate to conclude that music theory causes improved math performance?`,
      choices: [
        { label: 'A', text: 'The improvement in math performance was too small to be statistically significant.' },
        { label: 'B', text: 'The study lasted too short a time to measure lasting effects.' },
        { label: 'C', text: 'The students who took music classes may have already been more academically motivated before the study.' },
        { label: 'D', text: 'The students in the music group were older than the students in the comparison group.' },
      ],
      correctAnswer: 'C',
      explanation: `The passage states the researchers hesitated because "students who chose music classes may have had stronger academic motivation to begin with." This pre-existing motivation difference is the explicitly stated reason for their caution about claiming causation.`,
      wrongAnswerExplanations: {
        A: `The passage says the improvement was "measurably stronger," implying the finding was statistically detectable, not insufficient.`,
        B: `Study duration is never mentioned as a reason for the researchers' caution.`,
        D: `Age differences between groups are never mentioned in the passage.`,
      },
      teachingPoint: `When a passage describes researchers' hesitation to claim causation, always look for the passage's explicit reason — it will be directly stated, not implied.`,
    },
    {
      id: 'cid-d-020',
      skillSlug: 'central-ideas-details',
      level: 'sat-application',
      difficulty: 'medium',
      stimulus: `Before the twentieth century, most biographers wrote only about famous men, and their accounts tended to celebrate achievements while leaving out unflattering details. Contemporary biography has moved in a different direction: biographers now write about ordinary people, and they are expected to present subjects with both strengths and flaws. The shift reflects a broader cultural change in what readers expect from nonfiction — they want complexity, not hagiography.`,
      question: `Which choice best states the main idea of the passage?`,
      choices: [
        { label: 'A', text: 'Modern biography has become more complex and inclusive by moving away from the celebratory, famous-men focus of earlier biographies.' },
        { label: 'B', text: 'Readers today prefer biographies about famous men over those about ordinary people.' },
        { label: 'C', text: 'Biographers before the twentieth century were dishonest about their subjects.' },
        { label: 'D', text: 'Contemporary biographers face more legal restrictions than earlier biographers did.' },
      ],
      correctAnswer: 'A',
      explanation: `The passage contrasts earlier biography — focused on famous men, celebratory — with contemporary biography — broader subjects, both strengths and flaws. Choice A captures this evolution without overstating either side.`,
      wrongAnswerExplanations: {
        B: `This contradicts the passage; the passage says readers now want complexity, suggesting they prefer the newer style.`,
        C: `"Dishonest" is too extreme; the passage says earlier biographers left out unflattering details, but it does not call them dishonest.`,
        D: `Legal restrictions are never mentioned in the passage.`,
      },
      teachingPoint: `When a passage traces a historical shift from one approach to another, the main idea is the nature and direction of that shift.`,
    },
    {
      id: 'cid-d-021',
      skillSlug: 'central-ideas-details',
      level: 'advanced',
      difficulty: 'hard',
      stimulus: `Critics of the proposed national park expansion argue that it would harm local economies by restricting grazing and logging. Supporters respond that the long-term economic benefits of increased tourism and watershed protection outweigh short-term losses. A recent economic analysis found that counties adjacent to existing expanded parks had, on average, higher per-capita income growth over a twenty-year period than comparable counties without such expansions.`,
      question: `Which choice best states the main idea of the passage?`,
      choices: [
        { label: 'A', text: 'Economic data from existing park expansions suggest that the long-term benefits may outweigh the concerns of local critics.' },
        { label: 'B', text: 'Logging and grazing are the most important industries in counties near national parks.' },
        { label: 'C', text: 'National park expansions always harm local economies in the short term.' },
        { label: 'D', text: 'The debate over park expansion will never be resolved because both sides have valid points.' },
      ],
      correctAnswer: 'A',
      explanation: `The passage sets up the debate and then presents economic data showing higher income growth near expanded parks. Choice A names the data's implication — that supporters' claims may be borne out — without overstating the passage's measured conclusion.`,
      wrongAnswerExplanations: {
        B: `The passage mentions these industries as concerns, not as the most important ones; this overstates a detail.`,
        C: `"Always" is too absolute; the passage acknowledges short-term losses as a concern but presents evidence for long-term benefits.`,
        D: `The passage presents evidence that favors the supporters' view; it does not conclude the debate is irresolvable.`,
      },
      teachingPoint: `When a passage presents a debate and then offers evidence favoring one side, the main idea is the evidence's implication, not a neutral "both sides have merit" summary.`,
    },
    {
      id: 'cid-d-022',
      skillSlug: 'central-ideas-details',
      level: 'advanced',
      difficulty: 'hard',
      stimulus: `The novelist's use of unreliable narrators has drawn consistent critical attention. Less examined is the way she uses setting: every novel is set in the same fictional coastal city, and the city's geography — its hills, harbor, and fog — shifts subtly from book to book, reflecting the psychological state of whoever narrates that novel. In one book the harbor is open and expansive; in another it is hemmed in by mist. The city, in effect, becomes a barometer of the narrator's mind.`,
      question: `Which choice best states the main idea of the passage?`,
      choices: [
        { label: 'A', text: 'The novelist sets all her novels in the same city because she is most familiar with coastal settings.' },
        { label: 'B', text: 'Critics should focus more on the novelist\'s use of unreliable narrators than on her settings.' },
        { label: 'C', text: 'The fictional coastal city appears identically in each of the novelist\'s books.' },
        { label: 'D', text: 'In the novelist\'s work, the shifting geography of a repeated setting reflects each narrator\'s psychological state.' },
      ],
      correctAnswer: 'D',
      explanation: `The passage's central point is that the city's geography changes from book to book to reflect the narrator's mind — functioning as "a barometer of the narrator's mind." Choice D captures this argument precisely.`,
      wrongAnswerExplanations: {
        A: `The passage gives no reason for why the novelist chose a coastal setting; it analyzes the function the setting serves, not the author's personal motivation.`,
        B: `The passage says the setting is "less examined," not that it deserves more attention than unreliable narrators; the passage does not make a prescriptive argument.`,
        C: `The passage explicitly says the geography "shifts subtly from book to book," which contradicts the idea that the city appears identically.`,
      },
      teachingPoint: `When a passage argues that an element serves a specific function, the main idea names both the element and its function. Here: the shifting setting reflects the narrator's psychology.`,
    },
    {
      id: 'cid-d-023',
      skillSlug: 'central-ideas-details',
      level: 'advanced',
      difficulty: 'hard',
      stimulus: `Historians have long treated the fall of Rome in 476 CE as a sharp break — the end of antiquity and the beginning of the medieval period. More recent scholarship has challenged this periodization. Rather than a sudden collapse, these historians argue, the transformation of the western Roman Empire was gradual, with Roman institutions, laws, and even Roman-identified ruling families persisting in many regions for generations after 476. The date, they suggest, was more significant to later historians than it was to people living through the period.`,
      question: `Which choice best states the main idea of the passage?`,
      choices: [
        { label: 'A', text: 'Roman law and institutions disappeared immediately after 476 CE.' },
        { label: 'B', text: 'The fall of Rome was caused primarily by the failure of Roman military institutions.' },
        { label: 'C', text: 'Medieval historians were the first to study the fall of Rome seriously.' },
        { label: 'D', text: 'The year 476 CE was chosen by historians as a convenient but somewhat misleading marker of an actually gradual transition.' },
      ],
      correctAnswer: 'D',
      explanation: `The passage argues that 476 CE, long used as a sharp dividing line, was more of a later historiographical convention than a real rupture — the transition was gradual and Roman institutions persisted. Choice D captures this revisionist argument without overstating it.`,
      wrongAnswerExplanations: {
        A: `This is the opposite of the new scholarship's claim; the passage says Roman institutions persisted for generations after 476.`,
        B: `Military failure is never mentioned as a cause; the passage is about periodization, not the causes of Rome's transformation.`,
        C: `The passage discusses modern scholarship revising the older view; it makes no claims about who first studied the fall of Rome.`,
      },
      teachingPoint: `When a passage presents a "revision" of an earlier historical view, the main idea is what the new view argues and how it differs from the old — not the old view itself.`,
    },
    {
      id: 'cid-d-024',
      skillSlug: 'central-ideas-details',
      level: 'challenge',
      difficulty: 'hard',
      stimulus: `The sociologist's study compared two groups of workers who lost their jobs in the same economic downturn. One group had worked in a single industry for their entire careers; the other had moved between industries at least twice. Five years later, those who had changed industries before losing their jobs were re-employed at comparable salaries significantly more often than single-industry workers. The sociologist cautioned, however, that her sample was limited to workers under fifty, and that the advantage of cross-industry experience may not apply to older workers navigating different structural barriers.`,
      question: `Which choice best states the main idea of the passage?`,
      choices: [
        { label: 'A', text: 'Economic downturns affect younger workers more severely than older workers.' },
        { label: 'B', text: 'The sociologist concluded that all workers benefit equally from cross-industry experience.' },
        { label: 'C', text: 'Older workers should change industries more often to improve their job security.' },
        { label: 'D', text: 'Workers who have experience across industries are more likely to recover from job loss, though this finding may not apply to all age groups.' },
      ],
      correctAnswer: 'D',
      explanation: `The passage reports that cross-industry workers recovered more often (the finding) but notes the sociologist's caution that this may not extend to older workers (the qualifier). Choice D captures both the finding and the important limitation.`,
      wrongAnswerExplanations: {
        A: `Comparative severity of downturns on different age groups is not what the study measured; it compared single-industry to cross-industry workers.`,
        B: `This contradicts the passage; the sociologist specifically said the advantage may not apply to older workers, so she did not conclude equal benefit for all.`,
        C: `The passage does not make a recommendation for older workers; the sociologist identified a gap in her findings, not a prescription for behavior.`,
      },
      teachingPoint: `When a study passage presents a finding and then immediately qualifies it, the main idea must include both the finding and the qualifier. Choices that drop the qualifier overstate the passage.`,
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
