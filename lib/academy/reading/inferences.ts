import type { AcademySkill } from '../types'

export const inferences: AcademySkill = {
  slug: 'inferences',
  title: 'Inferences',
  objective: 'By the end of this lesson, you will be able to identify the most defensible conclusion a passage supports — one grounded in the text without relying on outside knowledge or going beyond what the author actually states.',
  estimatedMinutes: 24,
  subskills: ['Supported vs. Possible Inferences', 'Combining Multiple Clues', 'Cautious Language in Answers', 'Avoiding Unsupported Assumptions', 'Literary Inference', 'Scientific Inference', 'Multi-Step Inference'],
  section: 'reading',
  overview: {
    whatItTests:
      'Drawing the smallest, most defensible conclusion that the passage directly implies.',
    howItAppears:
      'Questions ask "Which inference is best supported by the passage?" or "Based on the passage, what can be inferred about X?"',
    whyStudentsMissIt:
      'Students make inferences that are too large, rely on outside knowledge, or pick answers that merely sound reasonable but are not supported by the text.',
    whatToLookFor:
      'The answer that must be true given what the passage says, not what might be true or what merely seems likely.',
  },
  strategy: {
    steps: [
      'Treat each choice as a claim and ask whether the passage gives enough evidence to prove it.',
      'Eliminate any answer that goes further than the passage supports.',
      'Eliminate any answer that requires outside knowledge.',
      'Choose the most conservative inference that the passage directly supports.',
    ],
    timeSavingTip:
      'Prefer the "smallest" answer. The correct inference is usually the one that stays closest to the text and adds the least.',
    whenNotToOverthink:
      'If one choice simply combines two facts the passage clearly states, and the others reach beyond the text, pick the modest one.',
  },
  commonTraps: [
    {
      title: 'The unsupported-but-plausible trap',
      description:
        'A choice sounds reasonable and could be true, but the passage never provides evidence for it.',
      avoidance:
        'Ask for the specific line that proves it. "Could be true" is not "must be true."',
    },
    {
      title: 'The too-dramatic trap',
      description:
        'A choice offers the most interesting or extreme conclusion, going well beyond the passage.',
      avoidance:
        'The correct inference is usually modest. Distrust answers that feel exciting or sweeping.',
    },
    {
      title: 'The contradiction trap',
      description:
        'A choice conflicts with something the passage actually states.',
      avoidance:
        'Reread the passage to be sure the inference agrees with every stated fact.',
    },
    {
      title: 'The possible-not-supported trap',
      description:
        'A choice describes something that is possible given the passage but not something the passage forces to be true.',
      avoidance:
        'Distinguish "possible" from "supported." Only pick what the passage requires.',
    },
    {
      title: `The outside-knowledge trap`,
      description: `A choice sounds true because of what you already know about the world, a historical period, or a scientific concept — but the passage itself never provides that information.`,
      avoidance: `Pretend you know nothing about the topic beyond what appears in the passage. If the answer requires prior knowledge the passage doesn't supply, eliminate it.`,
    },
    {
      title: `The causal-overreach trap`,
      description: `A choice states that one thing caused another, but the passage only shows that the two things are correlated or happened in sequence. Correlation and sequence do not equal causation.`,
      avoidance: `Look for whether the passage actually says one thing produced or led to the other. If it only says the two events happened together or in order, the causal claim goes beyond the text.`,
    },
  ],
  guidedExamples: [
    {
      id: 'inf-ex-1',
      stimulus:
        'The town\'s only bookstore closes at 6 p.m. on weekdays. Maria, who works until 6:30 every weekday, has never been able to visit it after work. On weekends, however, the store stays open until 9 p.m., and Maria often stops by on Saturdays.',
      question: 'Which inference is best supported by the passage?',
      steps: [
        {
          instruction: 'Gather the stated facts',
          content:
            'The store closes at 6 p.m. on weekdays; Maria works until 6:30 on weekdays; on weekends it stays open later, and she visits on Saturdays.',
        },
        {
          instruction: 'Test each choice against the facts',
          content:
            'Look for a conclusion that must follow, such as Maria being unable to reach the store after work on weekdays.',
        },
        {
          instruction: 'Eliminate overreaches',
          content:
            'We cannot conclude she dislikes reading or that the store is failing; nothing supports those ideas.',
        },
        {
          instruction: 'Confirm the smallest supported inference',
          content:
            'Since she finishes work after the weekday closing time, she cannot visit on weekday evenings, which is why she goes on Saturdays.',
        },
      ],
      choices: [
        {
          label: 'A',
          text: 'Maria cannot visit the bookstore after work on weekdays.',
        },
        {
          label: 'B',
          text: 'Maria prefers reading on weekends rather than weekdays.',
        },
        {
          label: 'C',
          text: 'The bookstore is likely to close permanently soon.',
        },
        {
          label: 'D',
          text: 'Maria is the store\'s most frequent customer.',
        },
      ],
      correctAnswer: 'A',
      explanation:
        'The store closes at 6 p.m. on weekdays and Maria works until 6:30, so she cannot reach it after work on weekdays. This is the modest conclusion the facts force.',
      wrongAnswerExplanations: {
        B: 'The passage explains a scheduling conflict, not a preference for weekend reading; we cannot infer what she prefers.',
        C: 'Nothing in the passage suggests the store is struggling or closing permanently.',
        D: 'The passage says Maria often visits on Saturdays but never compares her to other customers.',
      },
    },
    {
      id: 'inf-ex-2',
      stimulus:
        'Every plant in the greenhouse is watered by the same automatic system on the same schedule. The ferns near the north wall have begun to wilt, while the ferns in the center remain healthy. A gardener noticed that a cold draft flows along the north wall whenever the outer door opens.',
      question: 'Which inference is best supported by the passage?',
      steps: [
        {
          instruction: 'Gather the stated facts',
          content:
            'All plants get the same water on the same schedule. North-wall ferns wilt; center ferns are healthy. A cold draft hits the north wall.',
        },
        {
          instruction: 'Rule out water as the cause',
          content:
            'Since watering is identical everywhere, water differences cannot explain why only the north ferns wilt.',
        },
        {
          instruction: 'Find the supported factor',
          content:
            'The one difference between the two groups is the cold draft along the north wall, which points to something other than water.',
        },
        {
          instruction: 'Choose the modest inference',
          content:
            'The wilting of the north ferns is probably not caused by watering, since watering is the same for all plants.',
        },
      ],
      choices: [
        {
          label: 'A',
          text: 'The wilting of the north-wall ferns is not caused by a difference in watering.',
        },
        {
          label: 'B',
          text: 'The automatic watering system is broken.',
        },
        {
          label: 'C',
          text: 'Ferns cannot survive in any greenhouse.',
        },
        {
          label: 'D',
          text: 'The center ferns receive more water than the north ferns.',
        },
      ],
      correctAnswer: 'A',
      explanation:
        'Because all plants receive identical watering, a watering difference cannot explain why only the north ferns wilt. The passage supports ruling out watering as the cause.',
      wrongAnswerExplanations: {
        B: 'Nothing indicates the system is broken; it waters all plants the same, and most plants are healthy.',
        C: 'The center ferns are healthy, so it is false that ferns cannot survive in a greenhouse.',
        D: 'The passage states all plants receive the same water, so the center ferns do not get more.',
      },
    },
    {
      id: 'inf-ex-3',
      stimulus:
        'The museum guide explained that the artist signed and dated every finished painting on the back of the canvas. One painting attributed to the artist has no signature or date anywhere on it, and its style differs slightly from her known works. The museum has quietly moved it to a storage room.',
      question: 'Which inference is best supported by the passage?',
      steps: [
        {
          instruction: 'Gather the stated facts',
          content:
            'The artist signed and dated every finished painting. This painting has no signature or date and differs slightly in style. The museum moved it to storage.',
        },
        {
          instruction: 'Combine the facts',
          content:
            'If she signed every finished painting and this one is unsigned, there is reason to doubt it is a genuine finished work by her.',
        },
        {
          instruction: 'Eliminate overreaches',
          content:
            'We cannot conclude for certain it is a forgery or name who made it; the passage only raises doubt.',
        },
        {
          instruction: 'Choose the modest inference',
          content:
            'The museum has reason to question whether the painting is genuinely the artist\'s finished work.',
        },
      ],
      choices: [
        {
          label: 'A',
          text: 'The museum has reason to doubt that the painting is a genuine finished work by the artist.',
        },
        {
          label: 'B',
          text: 'The painting was definitely created by a famous forger.',
        },
        {
          label: 'C',
          text: 'The artist never made unsigned paintings of any kind.',
        },
        {
          label: 'D',
          text: 'The museum plans to destroy the painting.',
        },
      ],
      correctAnswer: 'A',
      explanation:
        'Since the artist signed every finished painting and this one is unsigned and stylistically different, the museum has grounds to doubt it is genuinely her finished work. Moving it to storage fits that doubt.',
      wrongAnswerExplanations: {
        B: 'The passage raises doubt but gives no evidence naming a forger or proving forgery.',
        C: 'The passage says she signed every finished painting; it does not rule out unfinished or other works, so this is too absolute.',
        D: 'Moving a painting to storage is not the same as planning to destroy it.',
      },
    },
    {
      id: 'inf-ex-4',
      stimulus: `The city council voted to close the downtown library branch on weekday afternoons due to budget cuts. Within a month, the branch\'s after-school homework help program — which previously served over two hundred students weekly — was discontinued. A local nonprofit later reported a spike in students seeking tutoring services.`,
      question: 'Which inference is best supported by the passage?',
      steps: [
        {
          instruction: 'Identify the chain of events',
          content: `The council cut hours, which ended the homework help program, which served 200+ students. Shortly after, a nonprofit saw increased tutoring demand.`,
        },
        {
          instruction: 'Ask what the sequence implies',
          content: `The students who lost the library program needed help somewhere. The nonprofit\'s spike in demand followed the program\'s discontinuation.`,
        },
        {
          instruction: 'Eliminate answers that add new claims',
          content: `We cannot say the nonprofit is government-funded, that the library will reopen, or that students\' grades dropped — none of those are in the passage.`,
        },
        {
          instruction: 'Select the most modest link',
          content: `The passage supports that the closure of the library program left students without a service they had been using, driving demand elsewhere.`,
        },
      ],
      choices: [
        { label: 'A', text: `The city council made the wrong decision in cutting library hours.` },
        { label: 'B', text: `The discontinuation of the library\'s homework help program likely contributed to the increased demand for the nonprofit\'s tutoring services.` },
        { label: 'C', text: `The nonprofit was created specifically in response to the library\'s closure.` },
        { label: 'D', text: `Students\' academic performance declined after the library reduced its hours.` },
      ],
      correctAnswer: 'B',
      explanation: `The passage describes a direct sequence: library homework help ends → students lose access → nonprofit tutoring demand spikes. Choice B draws the modest causal link the sequence supports without overstating it.`,
      wrongAnswerExplanations: {
        A: `Whether the council made the "wrong" decision is a value judgment not supported or implied by the passage.`,
        C: `The passage says the nonprofit "later reported" increased demand; it does not say the nonprofit was created in response to the library cuts.`,
        D: `The passage says nothing about students\' academic performance or grades.`,
      },
      coachTakeaway: `When a passage presents a sequence of events, the safest inference is the modest causal link between consecutive steps — not a judgment about whether the events were good or bad.`,
    },
    {
      id: 'inf-ex-5',
      stimulus: `A study tracked two groups of university students over a semester. One group attended all optional review sessions offered before exams; the other group skipped them entirely. Students who attended all review sessions earned an average grade of B+, while those who skipped averaged a C−. Both groups had similar grade point averages at the start of the semester.`,
      question: 'Based on the passage, which inference is most strongly supported?',
      steps: [
        {
          instruction: 'Note the study design',
          content: `Two groups with similar starting GPAs; one group attended all review sessions, one skipped all of them. The groups differed only in session attendance.`,
        },
        {
          instruction: 'Identify what the outcome shows',
          content: `Attendees averaged B+; skippers averaged C−. The difference is notable and the groups started at equivalent levels.`,
        },
        {
          instruction: 'Test the causal claim carefully',
          content: `We can infer an association between attendance and grades. We should be cautious about saying attendance caused the better grades — other factors (motivation, study habits) might explain both the attendance and the grades.`,
        },
        {
          instruction: 'Pick the appropriately hedged inference',
          content: `The passage supports that attending review sessions was associated with better grades, not that it definitively caused them.`,
        },
      ],
      choices: [
        { label: 'A', text: `Attending review sessions is the sole reason some students earned higher grades.` },
        { label: 'B', text: `Students who attended all review sessions achieved higher average grades than those who did not.` },
        { label: 'C', text: `The university should make review sessions mandatory.` },
        { label: 'D', text: `Students who skipped review sessions were less intelligent.` },
      ],
      correctAnswer: 'B',
      explanation: `The passage directly states the grade averages for each group (B+ vs. C−) and notes comparable starting GPAs. Choice B accurately restates this factual difference without overclaiming causation or adding a recommendation.`,
      wrongAnswerExplanations: {
        A: `"Sole reason" is too strong — the passage establishes a correlation, not the exclusive cause. Other factors (motivation, time management) could also contribute.`,
        C: `Whether sessions should be mandatory is a policy recommendation the passage does not make or imply.`,
        D: `The passage compares attendance behavior and grade outcomes, not intelligence. Inferring less intelligence goes far beyond the text.`,
      },
      coachTakeaway: `When a passage gives you outcome data for two groups, the safe inference is a statement about the observed difference — not a claim about the sole cause or a recommendation for future action.`,
    },
    {
      id: 'inf-ex-6',
      stimulus: `For three seasons, the community theater had performed exclusively classical works. This year, for the first time, it staged a contemporary comedy. Ticket sales for the comedy were forty percent higher than the average for the classical productions, and several audience members who attended the comedy told the box office it was their first time at the theater.`,
      question: 'Which inference is best supported by the passage?',
      steps: [
        {
          instruction: 'Gather what the passage tells us',
          content: `Three years of classical works, then one contemporary comedy. Comedy ticket sales were 40% higher than the classical average. Some comedy attendees were first-time visitors.`,
        },
        {
          instruction: 'Ask what the combination of facts implies',
          content: `Higher sales plus new first-time attendees suggests the comedy reached an audience the classical productions had not.`,
        },
        {
          instruction: 'Check each answer for overreach',
          content: `We cannot say the theater should abandon classical works, that audiences dislike classical plays, or that the comedy was a better production — none of those are stated.`,
        },
        {
          instruction: 'Choose the inference that stays within the evidence',
          content: `The contemporary comedy attracted a broader or different audience than the classical productions typically did.`,
        },
      ],
      choices: [
        { label: 'A', text: `The theater\'s audience dislikes classical works and prefers contemporary comedy.` },
        { label: 'B', text: `The classical productions were poorly performed compared to the comedy.` },
        { label: 'C', text: `The contemporary comedy attracted some audience members who had not previously attended the theater.` },
        { label: 'D', text: `The theater will abandon classical programming in future seasons.` },
      ],
      correctAnswer: 'C',
      explanation: `The passage directly states that several comedy attendees told the box office it was their first visit. Choice C simply reflects this stated fact as a supported inference without adding claims about preference, quality, or future plans.`,
      wrongAnswerExplanations: {
        A: `"Dislikes" classical works is too strong — higher attendance at the comedy does not mean the audience dislikes other genres; they may simply be different audiences.`,
        B: `The passage compares ticket sales, not production quality. Nothing suggests the classical works were poorly performed.`,
        D: `The passage describes one season; nothing is said about future programming decisions.`,
      },
      coachTakeaway: `When the passage gives you a specific stated fact (first-time attendees), a good inference simply acknowledges that fact. Resist the temptation to interpret data as revealing preferences or predicting future behavior.`,
    },
    {
      id: 'inf-ex-7',
      stimulus: `Researchers studying memory found that participants who slept for eight hours after learning a list of words recalled significantly more words the next day than participants who stayed awake for the same period. The researchers controlled for age, baseline memory scores, and the number of words originally studied.`,
      question: 'Which of the following can most reasonably be inferred from the passage?',
      steps: [
        {
          instruction: 'Note what was controlled for',
          content: `Age, baseline memory, and word count were held constant, so differences in recall are unlikely to be explained by those factors.`,
        },
        {
          instruction: 'Identify what varied',
          content: `The only difference between groups was whether participants slept or stayed awake after learning the words.`,
        },
        {
          instruction: 'Assess how strong a causal claim is justified',
          content: `Because other variables were controlled, the passage provides stronger grounds than a simple correlation study for inferring that sleep played a role in the recall difference.`,
        },
        {
          instruction: 'Match an inference to the strength of the evidence',
          content: `A reasonable inference is that sleeping after learning was associated with better word recall than remaining awake — a cautious but defensible conclusion given the controls.`,
        },
      ],
      choices: [
        { label: 'A', text: `Sleep after learning a list of words was associated with higher next-day recall compared to remaining awake.` },
        { label: 'B', text: `Eight hours of sleep is the optimal amount for memory consolidation for all people.` },
        { label: 'C', text: `Participants who stayed awake spent the night actively trying to memorize the words.` },
        { label: 'D', text: `The researchers proved that sleep is the most important factor in long-term memory.` },
      ],
      correctAnswer: 'A',
      explanation: `The passage describes a controlled study in which the sleep group recalled significantly more words. Choice A accurately captures this finding with appropriately cautious language ("associated with") without overclaiming universality or causation beyond what the controlled design supports.`,
      wrongAnswerExplanations: {
        B: `"Optimal for all people" is far too sweeping — the study involved one condition (8 hours) and one population; it does not establish a universal optimum.`,
        C: `The passage says nothing about what the awake participants did during their time; inferring active memorization adds information not in the text.`,
        D: `"Proved" and "most important factor in long-term memory" both go beyond the scope of a single word-list study. The passage establishes an association in one controlled context.`,
      },
      coachTakeaway: `Controlled studies provide stronger grounds for inference than simple observations, but even controlled research supports "associated with," not "proved" or "universally true." Match the strength of your inference to the strength of the evidence.`,
    },
    {
      id: 'inf-ex-8',
      stimulus: `The architect\'s notes reveal that the original design for the community center included a rooftop garden, a glass-walled reading room, and an indoor pool. The completed building, opened three years later, has none of these features. City records show the project\'s budget was reduced by thirty percent before construction began.`,
      question: 'Which inference is best supported by the passage?',
      steps: [
        {
          instruction: 'List what changed between plan and reality',
          content: `Three features (rooftop garden, reading room, pool) were planned but absent from the finished building.`,
        },
        {
          instruction: 'Identify the relevant context',
          content: `The budget was cut by 30% before construction started — a significant reduction that preceded the omissions.`,
        },
        {
          instruction: 'Assess what the timing implies',
          content: `The budget cut came before construction, and the planned features did not appear in the finished building. The most modest inference links these two facts.`,
        },
        {
          instruction: 'Select the inference supported by both facts together',
          content: `The budget reduction likely contributed to the omission of the planned features; it does not mean the architect abandoned the design willingly or that the features will be added later.`,
        },
      ],
      choices: [
        { label: 'A', text: `The architect was dissatisfied with the final design of the community center.` },
        { label: 'B', text: `The budget reduction likely contributed to the removal of several features from the original design.` },
        { label: 'C', text: `The city planned to add the rooftop garden and pool in a later phase of construction.` },
        { label: 'D', text: `The completed community center was of lower quality than the architect intended because of poor workmanship.` },
      ],
      correctAnswer: 'B',
      explanation: `The passage establishes two facts: (1) planned features are absent from the finished building, and (2) the budget was cut 30% before construction. Choice B draws the modest inference that the budget reduction and feature omissions are connected — the most defensible conclusion given both facts.`,
      wrongAnswerExplanations: {
        A: `The passage gives no information about the architect\'s feelings or satisfaction; inferring dissatisfaction adds an emotional state not in the text.`,
        C: `Nothing in the passage mentions future construction phases or plans to add the omitted features later.`,
        D: `"Poor workmanship" is a different kind of problem than budget-driven omissions; the passage attributes the changes to budget cuts, not construction quality.`,
      },
      coachTakeaway: `When a passage presents two facts (a changed condition + an outcome), the supported inference is the modest link between them. Do not add emotional states, future plans, or alternative explanations the passage never mentions.`,
    },
  ],
  drillQuestions: [
    {
      id: 'inf-d-001',
      skillSlug: 'inferences',
      difficulty: 'easy',
      stimulus:
        'The recipe requires an oven, but Sam\'s kitchen has only a stovetop and no oven. Sam wants to make the dish tonight.',
      question: 'Which inference is best supported by the passage?',
      choices: [
        {
          label: 'A',
          text: 'Sam cannot make the dish as written without access to an oven.',
        },
        { label: 'B', text: 'Sam is a poor cook.' },
        { label: 'C', text: 'The dish tastes bad.' },
        { label: 'D', text: 'Sam will buy an oven tonight.' },
      ],
      correctAnswer: 'A',
      explanation:
        'The recipe needs an oven and Sam has none, so Sam cannot make the dish as written without one.',
      wrongAnswerExplanations: {
        B: 'Nothing indicates Sam\'s skill level.',
        C: 'The passage says nothing about taste.',
        D: 'There is no evidence Sam plans to buy an oven.',
      },
      teachingPoint:
        'The correct inference simply combines the stated facts without adding new assumptions.',
    },
    {
      id: 'inf-d-002',
      skillSlug: 'inferences',
      difficulty: 'easy',
      stimulus:
        'All members of the hiking club meet on Sundays. Priya cannot attend any Sunday meeting because she works every Sunday.',
      question: 'Which inference is best supported by the passage?',
      choices: [
        {
          label: 'A',
          text: 'Priya misses the hiking club\'s regular meetings.',
        },
        { label: 'B', text: 'Priya dislikes hiking.' },
        { label: 'C', text: 'The hiking club will change its meeting day.' },
        { label: 'D', text: 'Priya works a difficult job.' },
      ],
      correctAnswer: 'A',
      explanation:
        'The club meets on Sundays and Priya works every Sunday, so she misses the regular meetings.',
      wrongAnswerExplanations: {
        B: 'The passage gives a scheduling conflict, not her feelings about hiking.',
        C: 'Nothing suggests the club will change its day.',
        D: 'The passage does not describe her job as difficult.',
      },
      teachingPoint:
        'Stick to what the facts require; do not guess at feelings or future events.',
    },
    {
      id: 'inf-d-003',
      skillSlug: 'inferences',
      difficulty: 'easy',
      stimulus:
        'The last bus leaves the station at 10 p.m. The concert does not end until 10:30 p.m., and Leo has no other way home.',
      question: 'Which inference is best supported by the passage?',
      choices: [
        {
          label: 'A',
          text: 'Leo cannot catch the last bus if he stays until the concert ends.',
        },
        { label: 'B', text: 'Leo will leave the concert early.' },
        { label: 'C', text: 'The concert is sold out.' },
        { label: 'D', text: 'Leo dislikes the band.' },
      ],
      correctAnswer: 'A',
      explanation:
        'The bus leaves at 10 and the concert ends at 10:30, so staying to the end means missing the bus.',
      wrongAnswerExplanations: {
        B: 'The passage does not say Leo will leave early; it only sets up the conflict.',
        C: 'Nothing indicates the concert is sold out.',
        D: 'The passage says nothing about Leo\'s taste in music.',
      },
      teachingPoint:
        'Choose the inference forced by the times given, not a guess about what Leo will do.',
    },
    {
      id: 'inf-d-004',
      skillSlug: 'inferences',
      difficulty: 'medium',
      stimulus:
        'The bakery sells out of its cinnamon rolls before 9 a.m. almost every day. Customers who arrive at opening time, 7 a.m., can usually buy them, but those who come during the lunch hour rarely find any left.',
      question: 'Which inference is best supported by the passage?',
      choices: [
        {
          label: 'A',
          text: 'A customer\'s chance of buying a cinnamon roll is better early in the morning than at lunch.',
        },
        {
          label: 'B',
          text: 'The bakery should bake more cinnamon rolls.',
        },
        {
          label: 'C',
          text: 'Cinnamon rolls are the bakery\'s only product.',
        },
        {
          label: 'D',
          text: 'Lunch customers dislike cinnamon rolls.',
        },
      ],
      correctAnswer: 'A',
      explanation:
        'Rolls are usually available at 7 a.m. but rarely by lunch, so buying them is more likely early in the morning.',
      wrongAnswerExplanations: {
        B: 'Whether the bakery should bake more is an opinion the passage does not support.',
        C: 'The passage never says cinnamon rolls are the only product.',
        D: 'Lunch customers rarely find rolls left because they sell out, not because they dislike them.',
      },
      teachingPoint:
        'Turn the stated pattern into a modest conclusion about likelihood, not a recommendation.',
    },
    {
      id: 'inf-d-005',
      skillSlug: 'inferences',
      difficulty: 'medium',
      stimulus:
        'The new phone model was released only in a few large cities at first. Reviewers in those cities praised it, but people in smaller towns had to wait several months before they could buy it in stores.',
      question: 'Which inference is best supported by the passage?',
      choices: [
        {
          label: 'A',
          text: 'People in smaller towns had less immediate access to the new phone than people in large cities.',
        },
        {
          label: 'B',
          text: 'The phone was poorly made.',
        },
        {
          label: 'C',
          text: 'Reviewers in smaller towns disliked the phone.',
        },
        {
          label: 'D',
          text: 'The phone was cheaper in large cities.',
        },
      ],
      correctAnswer: 'A',
      explanation:
        'The phone launched in a few large cities while smaller towns waited months, so smaller-town buyers had less immediate access.',
      wrongAnswerExplanations: {
        B: 'Reviewers praised it, so there is no support for it being poorly made.',
        C: 'The passage does not mention reviewers in smaller towns.',
        D: 'Price differences by location are never discussed.',
      },
      teachingPoint:
        'Infer only the access difference the passage states; do not add claims about price or quality.',
    },
    {
      id: 'inf-d-006',
      skillSlug: 'inferences',
      difficulty: 'medium',
      stimulus:
        'Every student who passed the final exam had attended at least 90 percent of the class sessions. Devon attended only 70 percent of the sessions this term.',
      question: 'Which inference is best supported by the passage?',
      choices: [
        {
          label: 'A',
          text: 'Devon did not pass the final exam.',
        },
        {
          label: 'B',
          text: 'Devon studied less than other students.',
        },
        {
          label: 'C',
          text: 'The exam was unfair.',
        },
        {
          label: 'D',
          text: 'Devon will retake the class.',
        },
      ],
      correctAnswer: 'A',
      explanation:
        'Everyone who passed attended at least 90 percent of sessions. Devon attended only 70 percent, so he could not be among those who passed.',
      wrongAnswerExplanations: {
        B: 'Attendance is not the same as study time; the passage says nothing about how much Devon studied.',
        C: 'The passage gives no information about the exam\'s fairness.',
        D: 'Whether Devon will retake the class is not stated or implied.',
      },
      teachingPoint:
        'When "every X had Y" and someone lacks Y, you can infer that person is not an X, here, not among those who passed.',
    },
    {
      id: 'inf-d-007',
      skillSlug: 'inferences',
      difficulty: 'medium',
      stimulus:
        'The museum offers free admission on the first Monday of each month. On those days, attendance is roughly triple the usual figure, and the galleries become crowded. On all other days, tickets cost twelve dollars.',
      question: 'Which inference is best supported by the passage?',
      choices: [
        {
          label: 'A',
          text: 'The free admission days draw noticeably larger crowds than regular days.',
        },
        {
          label: 'B',
          text: 'The museum loses money on free days.',
        },
        {
          label: 'C',
          text: 'Visitors prefer the museum\'s art on Mondays.',
        },
        {
          label: 'D',
          text: 'The twelve-dollar ticket is too expensive.',
        },
      ],
      correctAnswer: 'A',
      explanation:
        'Attendance is about triple on free Mondays, and the galleries become crowded, so free days draw noticeably larger crowds.',
      wrongAnswerExplanations: {
        B: 'The passage gives no financial figures, so we cannot infer the museum loses money.',
        C: 'Higher attendance reflects the free admission, not a preference for the art on Mondays.',
        D: 'Whether the ticket is too expensive is an opinion the passage does not support.',
      },
      teachingPoint:
        'Convert the "triple attendance" fact into a modest statement about crowd size, not a claim about finances or opinions.',
    },
    {
      id: 'inf-d-008',
      skillSlug: 'inferences',
      difficulty: 'hard',
      stimulus:
        'The historian notes that the diary\'s author describes seeing the comet "just after the harvest festival." Records from the region place that festival in late September. Astronomers have calculated that the only comet visible from that location in that century appeared in early October of the year 1106.',
      question: 'Which inference is best supported by the passage?',
      choices: [
        {
          label: 'A',
          text: 'The diary entry describing the comet was most likely written in or after early October 1106.',
        },
        {
          label: 'B',
          text: 'The diary\'s author was a professional astronomer.',
        },
        {
          label: 'C',
          text: 'Comets appeared over the region every autumn.',
        },
        {
          label: 'D',
          text: 'The harvest festival was the most important event of the year.',
        },
      ],
      correctAnswer: 'A',
      explanation:
        'The author saw the comet just after the late-September festival, and the only matching comet appeared in early October 1106, so the entry was most likely written in or after that date.',
      wrongAnswerExplanations: {
        B: 'Observing a comet does not make the author an astronomer; the passage gives no such information.',
        C: 'The passage says only one comet was visible that century, contradicting an annual appearance.',
        D: 'The festival is used only to date the sighting; its importance is never established.',
      },
      teachingPoint:
        'Chain the dated facts together (festival in September, comet in October 1106) to reach the modest timing inference.',
    },
    {
      id: 'inf-d-009',
      skillSlug: 'inferences',
      difficulty: 'hard',
      stimulus:
        'A company found that employees who used its optional flexible-hours program reported higher job satisfaction than those who did not. However, the program was available only to employees who had worked at the company for at least five years. Newer employees were not eligible.',
      question: 'Which inference is best supported by the passage?',
      choices: [
        {
          label: 'A',
          text: 'The employees in the flexible-hours program had all worked at the company for at least five years.',
        },
        {
          label: 'B',
          text: 'Flexible hours are the main cause of higher job satisfaction.',
        },
        {
          label: 'C',
          text: 'Newer employees were dissatisfied with their jobs.',
        },
        {
          label: 'D',
          text: 'The company plans to expand the program to all employees.',
        },
      ],
      correctAnswer: 'A',
      explanation:
        'The program was available only to employees with at least five years at the company, so everyone in it met that requirement.',
      wrongAnswerExplanations: {
        B: 'Because only long-tenured employees could join, their satisfaction might come from experience or seniority, not flexible hours; the passage does not establish cause.',
        C: 'The passage does not report newer employees\' satisfaction levels.',
        D: 'There is no information about plans to expand the program.',
      },
      teachingPoint:
        'The safe inference restates the eligibility rule; resist the causal answer, since a hidden factor (tenure) could explain the satisfaction.',
    },
    {
      id: 'inf-d-010',
      skillSlug: 'inferences',
      difficulty: 'hard',
      stimulus:
        'The novelist wrote all her books in longhand and mailed the only handwritten copy to her publisher. One of her novels was lost in a fire at the publisher\'s office before it was ever printed or copied. Scholars today can read summaries of that novel written by an editor who saw the manuscript, but the full text has never been recovered.',
      question: 'Which inference is best supported by the passage?',
      choices: [
        {
          label: 'A',
          text: 'The complete text of the lost novel is no longer available to read.',
        },
        {
          label: 'B',
          text: 'The novelist\'s other books were also destroyed.',
        },
        {
          label: 'C',
          text: 'The lost novel was her best work.',
        },
        {
          label: 'D',
          text: 'The editor rewrote the novel from memory.',
        },
      ],
      correctAnswer: 'A',
      explanation:
        'The only handwritten copy burned before being printed or copied, and the full text has never been recovered, so the complete novel can no longer be read.',
      wrongAnswerExplanations: {
        B: 'Only one novel was lost in the fire; nothing suggests her other books were destroyed.',
        C: 'The passage never evaluates the quality of the lost novel.',
        D: 'The editor wrote summaries, which is not the same as rewriting the full novel from memory.',
      },
      teachingPoint:
        'Combine the facts (only copy, burned, never recovered) into the smallest certain conclusion: the full text is unavailable.',
    },
    {
      id: 'inf-d-011',
      skillSlug: 'inferences',
      subskill: 'Supported Inference',
      level: 'foundation',
      difficulty: 'easy',
      stimulus: `The school library is open every day except Sunday. Today is Sunday.`,
      question: 'Which inference is best supported by the passage?',
      choices: [
        { label: 'A', text: `The library has many books.` },
        { label: 'B', text: `The library is closed today.` },
        { label: 'C', text: `The librarian is on vacation.` },
        { label: 'D', text: `Students cannot check out books at all this week.` },
      ],
      correctAnswer: 'B',
      explanation: `The library is open every day except Sunday, and today is Sunday, so it must be closed today. This follows directly from the two stated facts.`,
      wrongAnswerExplanations: {
        A: `How many books the library has is never mentioned.`,
        C: `The passage says nothing about the librarian's schedule or vacation.`,
        D: `The library is only closed on Sundays; it will be open again on Monday. Students can still check out books during the rest of the week.`,
      },
      teachingPoint: `Foundation-level inference: simply apply the stated rule (closed on Sundays) to the stated situation (today is Sunday).`,
    },
    {
      id: 'inf-d-012',
      skillSlug: 'inferences',
      subskill: 'Supported Inference',
      level: 'foundation',
      difficulty: 'easy',
      stimulus: `Ella has a severe allergy to peanuts. The cafeteria announced that today's lunch menu includes peanut butter cookies as the dessert option.`,
      question: 'Which inference is best supported by the passage?',
      choices: [
        { label: 'A', text: `Ella dislikes all cookies.` },
        { label: 'B', text: `The cafeteria was careless in choosing the menu.` },
        { label: 'C', text: `Ella will ask the cafeteria to change the menu.` },
        { label: 'D', text: `Ella should not eat today's dessert option.` },
      ],
      correctAnswer: 'D',
      explanation: `Ella is severely allergic to peanuts, and today's dessert contains peanut butter. Combining these two facts leads directly to the inference that she should not eat today's dessert.`,
      wrongAnswerExplanations: {
        A: `The passage specifies a peanut allergy, not a general dislike of cookies. Ella might enjoy non-peanut cookies.`,
        B: `Whether the cafeteria was careless is a judgment the passage does not support — the passage simply states what is on the menu.`,
        C: `The passage gives no information about what Ella plans to do; inferring she will ask for a menu change adds new information.`,
      },
      teachingPoint: `Apply a stated condition (peanut allergy) to a stated fact (peanut butter cookies) to reach the safest, most direct conclusion.`,
    },
    {
      id: 'inf-d-013',
      skillSlug: 'inferences',
      subskill: 'Supported Inference',
      level: 'foundation',
      difficulty: 'easy',
      stimulus: `The community pool is free for children under ten years old. Marcus is eight years old.`,
      question: 'Which inference is best supported by the passage?',
      choices: [
        { label: 'A', text: `Marcus is a strong swimmer.` },
        { label: 'B', text: `Marcus does not need to pay to enter the community pool.` },
        { label: 'C', text: `Marcus visits the pool every day.` },
        { label: 'D', text: `The pool is free for everyone.` },
      ],
      correctAnswer: 'B',
      explanation: `Children under ten get free admission, and Marcus is eight — which is under ten — so he does not need to pay. This conclusion follows directly from the two stated facts.`,
      wrongAnswerExplanations: {
        A: `The passage says nothing about Marcus's swimming ability.`,
        C: `The passage does not mention how often Marcus visits the pool.`,
        D: `The passage specifies that only children under ten get free admission, not that the pool is free for everyone.`,
      },
      teachingPoint: `Apply an eligibility rule to a specific individual's situation to reach the most direct inference.`,
    },
    {
      id: 'inf-d-014',
      skillSlug: 'inferences',
      subskill: 'Combining Multiple Clues',
      level: 'sat-application',
      difficulty: 'medium',
      stimulus: `The farmer planted the same crop in two adjacent fields. She watered both fields identically and applied no pesticides to either. By harvest time, the eastern field produced twice as much as the western field. The eastern field receives sunlight from dawn until dusk, while a tall hedgerow shades the western field throughout the afternoon.`,
      question: 'Which inference is best supported by the passage?',
      choices: [
        { label: 'A', text: `The farmer made an error in planting the western field.` },
        { label: 'B', text: `The difference in crop yield between the two fields is likely related to the difference in sunlight exposure.` },
        { label: 'C', text: `The hedgerow should be removed to improve the western field's yield.` },
        { label: 'D', text: `The eastern field has better soil than the western field.` },
      ],
      correctAnswer: 'B',
      explanation: `Water and pesticide treatment were identical for both fields, so those factors cannot explain the yield difference. The only stated difference is sunlight — the eastern field gets full sun while the western field is shaded in the afternoon. The most supported inference is that sunlight exposure is related to the yield difference.`,
      wrongAnswerExplanations: {
        A: `The passage describes environmental differences between the fields, not a human planting error.`,
        C: `Recommending removal of the hedgerow is a prescription the passage does not make or imply.`,
        D: `Soil quality is never mentioned in the passage; this inference requires adding information not present in the text.`,
      },
      teachingPoint: `When two conditions are identical and only one factor differs, the passage supports inferring that the differing factor is related to the outcome — but avoid turning that association into a specific recommendation.`,
    },
    {
      id: 'inf-d-015',
      skillSlug: 'inferences',
      subskill: 'Cautious Language in Answers',
      level: 'sat-application',
      difficulty: 'medium',
      stimulus: `In a recent survey, residents of the city's northern district reported higher rates of satisfaction with local parks than residents of the southern district. The northern district has twice as many parks per capita as the southern district. Both districts have similar population sizes and income levels.`,
      question: 'Which inference is best supported by the passage?',
      choices: [
        { label: 'A', text: `Residents of the southern district are unhappy with city government.` },
        { label: 'B', text: `Park availability may influence residents' satisfaction with local green spaces.` },
        { label: 'C', text: `The city should build more parks in the southern district immediately.` },
        { label: 'D', text: `The northern district's residents are wealthier and therefore have higher expectations.` },
      ],
      correctAnswer: 'B',
      explanation: `The passage shows that the district with more parks per capita (northern) also has higher park satisfaction, while controlling for population and income. Choice B draws a modest, hedged inference ("may influence") that the data support without over-claiming causation or making a policy recommendation.`,
      wrongAnswerExplanations: {
        A: `The survey measured park satisfaction specifically, not overall satisfaction with city government. Generalizing to government satisfaction goes beyond the text.`,
        C: `A recommendation to build parks is a prescription the passage does not make; inferring what should happen goes beyond what the data support.`,
        D: `The passage explicitly states both districts have similar income levels, directly contradicting this choice.`,
      },
      teachingPoint: `When two things are correlated in a passage, the safe inference uses hedged language ("may," "likely," "could be related to") rather than claiming direct causation or making recommendations.`,
    },
    {
      id: 'inf-d-016',
      skillSlug: 'inferences',
      subskill: 'Necessary Inference',
      level: 'sat-application',
      difficulty: 'medium',
      stimulus: `The theater group has a strict rule: no actor may appear in more than one production per season. This season has three productions. Raina appeared in the first production.`,
      question: 'Which inference is best supported by the passage?',
      choices: [
        { label: 'A', text: `Raina is the most talented actor in the theater group.` },
        { label: 'B', text: `The theater group will change its rule next season.` },
        { label: 'C', text: `Raina did not enjoy performing in the first production.` },
        { label: 'D', text: `Raina will not act in the second or third production this season.` },
      ],
      correctAnswer: 'D',
      explanation: `The rule states no actor may appear in more than one production per season. Raina already appeared in the first production, so she cannot appear in the second or third. This follows necessarily from the stated rule.`,
      wrongAnswerExplanations: {
        A: `Nothing in the passage discusses the relative talent of actors.`,
        B: `The passage states the current rule but says nothing about whether it will change next season.`,
        C: `The passage gives no information about Raina's feelings about her performance.`,
      },
      teachingPoint: `"Must be true" inferences follow necessarily from stated rules applied to specific cases. Here the rule plus the fact of Raina's appearance in the first production logically excludes her from the remaining productions.`,
    },
    {
      id: 'inf-d-017',
      skillSlug: 'inferences',
      subskill: 'Avoiding Unsupported Assumptions',
      level: 'sat-application',
      difficulty: 'medium',
      stimulus: `Scientists discovered a new species of deep-sea fish that produces its own light through bioluminescence. The fish was found at a depth where no sunlight penetrates. Researchers noted that several other species living at the same depth also produce their own light.`,
      question: 'Which inference is best supported by the passage?',
      choices: [
        { label: 'A', text: `Bioluminescence evolved because deep-sea creatures needed to escape predators.` },
        { label: 'B', text: `The newly discovered fish is the most common species at that depth.` },
        { label: 'C', text: `Bioluminescence appears to be a shared feature among multiple species living at depths without sunlight.` },
        { label: 'D', text: `The fish would not survive if brought to shallower, sunlit waters.` },
      ],
      correctAnswer: 'C',
      explanation: `The passage states that the newly discovered fish and several other species at the same sunless depth all produce their own light. Choice C accurately draws the inference that bioluminescence is a shared trait among multiple species in that lightless environment.`,
      wrongAnswerExplanations: {
        A: `Why bioluminescence evolved (predator evasion) requires outside knowledge and goes beyond what the passage states. The passage describes the trait, not its evolutionary origin.`,
        B: `The passage never discusses population sizes or which species is most common at that depth.`,
        D: `How the fish would respond to shallower water is not addressed anywhere in the passage.`,
      },
      teachingPoint: `Stick to what the passage directly describes. When a trait is shared among multiple species in one environment, you can infer it is common there — but do not add evolutionary explanations or predictions the passage does not provide.`,
    },
    {
      id: 'inf-d-018',
      skillSlug: 'inferences',
      subskill: 'Multi-Step Inference',
      level: 'advanced',
      difficulty: 'hard',
      stimulus: `A regional airline announced it would discontinue its only direct route between City A and City B, effective the following month. The two cities are 400 miles apart, and the next available option would require passengers to connect through a hub city, adding roughly three hours to the total travel time. A business association in City B issued a statement expressing concern about the economic impact on local companies that regularly send representatives to City A.`,
      question: 'Which of the following can most reasonably be inferred from the passage?',
      choices: [
        { label: 'A', text: `The airline discontinued the route because it was not profitable.` },
        { label: 'B', text: `Business travelers between City A and City B will likely face longer and less convenient travel after the route is discontinued.` },
        { label: 'C', text: `The business association in City B will successfully persuade the airline to restore the route.` },
        { label: 'D', text: `No businesses in City A send representatives to City B.` },
      ],
      correctAnswer: 'B',
      explanation: `The passage establishes that the direct route is ending and the only alternative adds three hours to travel time. The business association's concern about sending representatives further confirms that business travelers use this route. Together these facts support the inference that business travelers will face longer, less convenient travel.`,
      wrongAnswerExplanations: {
        A: `The passage does not state why the airline discontinued the route. Inferring profitability requires information the passage does not supply.`,
        C: `The passage says the business association expressed concern; it says nothing about whether they will succeed in restoring the route.`,
        D: `The passage focuses on City B businesses sending reps to City A, but does not say anything about City A businesses' travel patterns.`,
      },
      teachingPoint: `Multi-step inferences require linking: route ends + alternative is much longer + businesses rely on it = business travelers face longer, less convenient travel. Each step must come from the passage, not from outside assumptions.`,
    },
    {
      id: 'inf-d-019',
      skillSlug: 'inferences',
      subskill: 'Literary Inference',
      level: 'advanced',
      difficulty: 'hard',
      stimulus: `Clara set the letter on the table without opening it. She knew the handwriting on the envelope — she had spent years learning to recognize it anywhere. She made herself a cup of tea, stood at the kitchen window, and watched the rain for a long time before finally sitting down.`,
      question: 'Which inference about Clara is most directly supported by the passage?',
      choices: [
        { label: 'A', text: `Clara was excited to read the letter and wanted to savor the moment.` },
        { label: 'B', text: `Clara recognized who sent the letter and was in no hurry to open it, suggesting some reluctance or apprehension.` },
        { label: 'C', text: `Clara was expecting bad news about a family member.` },
        { label: 'D', text: `Clara and the letter's sender had recently had an argument.` },
      ],
      correctAnswer: 'B',
      explanation: `The passage shows Clara recognizing the handwriting immediately, setting the letter aside unopened, making tea, and staring out the window before sitting down — a series of delay behaviors. The most defensible inference is that she recognized the sender and felt reluctant or apprehensive about opening it. The passage does not identify the sender or explain why she hesitates.`,
      wrongAnswerExplanations: {
        A: `The described behavior (delay, window-gazing) is more consistent with reluctance than eager anticipation. "Savoring the moment" does not fit the passage's tone.`,
        C: `The passage gives no information about who sent the letter or what its content might be. Inferring bad news about a family member adds specifics the passage does not support.`,
        D: `A recent argument is one possible explanation for Clara's reluctance, but the passage does not mention any conflict. This goes beyond what the text requires.`,
      },
      teachingPoint: `Literary inference requires reading behavior and tone without over-interpreting. The passage shows delay and avoidance; the modest inference is reluctance or apprehension. Do not specify a cause (an argument, bad news) that the passage does not provide.`,
    },
    {
      id: 'inf-d-020',
      skillSlug: 'inferences',
      subskill: 'Scientific Inference',
      level: 'advanced',
      difficulty: 'hard',
      stimulus: `Ecologists studying a river system found that stretches of the river running through forested areas had significantly lower water temperatures than stretches running through areas where trees had been cleared. They also found that native fish species — which require cold water — were present only in the forested stretches and absent from the cleared stretches.`,
      question: 'Which conclusion is most directly supported by the passage?',
      choices: [
        { label: 'A', text: `Deforestation should be banned in all river watersheds.` },
        { label: 'B', text: `The absence of cold-water fish in cleared stretches is consistent with those stretches lacking the cooler temperatures the fish require.` },
        { label: 'C', text: `Pollution from cleared areas is the primary reason fish are absent from those stretches.` },
        { label: 'D', text: `Replanting trees along the river would immediately restore fish populations in cleared areas.` },
      ],
      correctAnswer: 'B',
      explanation: `The passage establishes two correlated patterns: cleared areas have warmer water, and cold-water fish are absent from those same areas. Choice B draws the modest inference that the absence of fish is consistent with the absence of the cold temperatures they need — a connection the passage directly supports.`,
      wrongAnswerExplanations: {
        A: `A ban on deforestation is a policy recommendation that goes beyond the passage's observational findings.`,
        C: `The passage identifies water temperature as the relevant difference between forested and cleared stretches; it never mentions pollution.`,
        D: `The passage describes current conditions; it makes no predictions about what replanting would accomplish or how quickly.`,
      },
      teachingPoint: `Scientific passages support descriptive inferences about observed patterns. Avoid turning observations into policy prescriptions, identifying causes the passage doesn't name, or predicting future outcomes the study doesn't address.`,
    },
    {
      id: 'inf-d-021',
      skillSlug: 'inferences',
      subskill: 'Multi-Step Inference',
      level: 'advanced',
      difficulty: 'hard',
      stimulus: `The historian's account notes that the ancient city's granaries were enormous — capable of storing three years' worth of grain for the entire population. Annual tax records show that farmers delivered grain to the city even in years when harvests were poor. When neighboring city-states experienced famines, they sent diplomatic envoys to negotiate for grain.`,
      question: 'Which inference is most strongly supported by the passage?',
      choices: [
        { label: 'A', text: `The city's farmers resented being taxed during poor harvests.` },
        { label: 'B', text: `The city eventually conquered all neighboring city-states.` },
        { label: 'C', text: `Grain was the only form of taxation in the ancient city.` },
        { label: 'D', text: `The city's grain surplus gave it a strategic advantage over neighboring regions.` },
      ],
      correctAnswer: 'D',
      explanation: `The passage establishes that the city stored up to three years of grain, continued collecting grain even in poor-harvest years, and attracted diplomatic missions from famine-struck neighbors seeking grain. Together these facts support the inference that the city's grain surplus conferred a strategic advantage — other regions depended on them during hardship.`,
      wrongAnswerExplanations: {
        A: `The passage mentions the tax collection but says nothing about farmers' feelings or resentment toward it.`,
        B: `The passage describes grain diplomacy, not military conquest; nothing in the text suggests the city conquered its neighbors.`,
        C: `The passage mentions grain taxation but does not say grain was the only form of taxation. Making that claim requires the passage to explicitly rule out other taxes, which it does not.`,
      },
      teachingPoint: `Chain the evidence: large granaries + grain collection even in lean years + neighboring states sending envoys for grain = the city had strategic leverage through its grain surplus. Each link must come from the passage itself.`,
    },
    {
      id: 'inf-d-022',
      skillSlug: 'inferences',
      subskill: 'Necessary Inference',
      level: 'challenge',
      difficulty: 'hard',
      stimulus: `Professor Vance has published research arguing that urban trees reduce local temperatures by an average of 2°C through evapotranspiration. A subsequent study by a different team, using the same methodology in a different city, found temperature reductions averaging only 0.4°C. The authors of the second study noted that their city had lower baseline humidity than Professor Vance's study city, and that evapotranspiration is significantly less efficient in drier conditions.`,
      question: 'Which of the following can most reasonably be inferred from the passage?',
      choices: [
        { label: 'A', text: `Professor Vance's research was methodologically flawed and should be discarded.` },
        { label: 'B', text: `Urban trees are ineffective at reducing temperatures and should not be used as a climate mitigation strategy.` },
        { label: 'C', text: `The cooling effect of urban trees through evapotranspiration may vary depending on local environmental conditions such as humidity.` },
        { label: 'D', text: `The second study was conducted to disprove Professor Vance's findings intentionally.` },
      ],
      correctAnswer: 'C',
      explanation: `The passage presents two studies using the same methodology that produced different results (2°C vs. 0.4°C). The second team explicitly attributes the difference to lower baseline humidity affecting evapotranspiration efficiency. The most defensible inference is that the cooling effect varies with local conditions — specifically humidity — rather than being a universal constant.`,
      wrongAnswerExplanations: {
        A: `The passage says the second study used the same methodology; the different result is attributed to environmental differences, not methodological flaws in Vance's work.`,
        B: `Both studies found some cooling effect; the passage does not support concluding that trees are ineffective. The degree of effect varies by context.`,
        D: `The passage gives no information about the motivations of the second team. Inferring intentional disproof requires evidence not in the text.`,
      },
      teachingPoint: `When two studies using the same method yield different results and the passage explicitly names a variable that differs between them (humidity), the supported inference is that the named variable influences the outcome — not that one study is wrong or that the overall finding is invalid.`,
    },
    {
      id: 'inf-d-023',
      skillSlug: 'inferences',
      subskill: 'Combining Multiple Clues',
      level: 'challenge',
      difficulty: 'hard',
      stimulus: `The translation of the medieval manuscript presented unusual challenges. The scribe who copied the text used a regional dialect that differed substantially from the standard written Latin of the period, and several passages contained technical vocabulary associated with glassmaking — a trade practiced in only a few towns in that region. Furthermore, the manuscript's margins contained brief notations in a third language that scholars have tentatively identified as an early form of Flemish.`,
      question: 'Which inference is best supported by the passage?',
      choices: [
        { label: 'A', text: `The manuscript was written by a monk working in a monastery near Paris.` },
        { label: 'B', text: `The manuscript was likely produced in or associated with a region where glassmaking was practiced, and the scribe may have had exposure to Flemish-speaking communities.` },
        { label: 'C', text: `The manuscript is a forgery created in the nineteenth century.` },
        { label: 'D', text: `The technical glassmaking vocabulary proves that the scribe was a glassmaker by trade.` },
      ],
      correctAnswer: 'B',
      explanation: `The passage provides three intersecting clues: (1) a regional dialect differing from standard Latin, (2) glassmaking vocabulary tied to specific towns, and (3) marginal notations in early Flemish. Together these point toward a specific geographic and cultural context — a region with glassmaking traditions that also had contact with Flemish-speaking areas. Choice B draws the inference that is supported by combining these clues without asserting specifics the passage does not establish.`,
      wrongAnswerExplanations: {
        A: `Nothing in the passage suggests Paris. The evidence points toward a glassmaking region with Flemish influence, which is inconsistent with a Parisian monastery.`,
        C: `The passage presents the manuscript as a genuine medieval document facing translation difficulties; nothing suggests it is a forgery.`,
        D: `Technical vocabulary associated with a trade appears in many kinds of texts. The scribe may have copied a text about glassmaking without being a glassmaker; the passage does not establish the scribe's occupation.`,
      },
      teachingPoint: `Challenge inferences require synthesizing multiple clues rather than relying on any single detail. Combine what each clue implies and select the answer that is supported by the combination — without naming specific places or occupations the passage only hints at.`,
    },
    {
      id: 'inf-d-024',
      skillSlug: 'inferences',
      subskill: 'Avoiding Unsupported Assumptions',
      level: 'challenge',
      difficulty: 'hard',
      stimulus: `Sociologist Dr. Mira Osei tracked a cohort of first-generation college students over ten years. She found that students who had at least one mentor from their own ethnic or socioeconomic background completed their degrees at a rate eighteen percentage points higher than those without such a mentor. Dr. Osei was careful to note that self-selection may have played a role: students who actively sought mentors may differ from those who did not in ways that also affect completion rates, such as motivation or social support networks.`,
      question: 'Based on the passage, which of the following best describes the relationship between mentorship and degree completion?',
      choices: [
        { label: 'A', text: `Mentorship definitively causes higher completion rates among first-generation college students.` },
        { label: 'B', text: `Mentorship is the only factor that matters for first-generation student success.` },
        { label: 'C', text: `Having a mentor from a similar background was associated with higher completion rates, though Dr. Osei acknowledges that self-selection may complicate a straightforward causal interpretation.` },
        { label: 'D', text: `Dr. Osei's study proves that universities should require all students to have a mentor.` },
      ],
      correctAnswer: 'C',
      explanation: `The passage reports an eighteen-point difference in completion rates between mentored and non-mentored students, but Dr. Osei herself warns about self-selection — students who sought mentors may differ from those who did not in other ways. Choice C accurately reflects both the finding (association with higher completion) and the researcher's own caution about interpreting it causally.`,
      wrongAnswerExplanations: {
        A: `"Definitively causes" directly contradicts the researcher's own caveat about self-selection undermining a causal claim.`,
        B: `The passage describes one factor associated with completion; it never claims mentorship is the only factor or that other factors are irrelevant.`,
        D: `Recommending that universities require mentorship is a policy prescription that goes beyond the scope of the observational study. The passage also acknowledges methodological limitations that would make such a sweeping recommendation premature.`,
      },
      teachingPoint: `When a researcher explicitly qualifies their own findings (as Dr. Osei does with self-selection), the correct inference must honor that qualification. An answer that strips away the researcher's caution and makes an absolute causal claim goes beyond what the passage supports.`,
    },
  ],
  masteryQuestions: [
    {
      id: 'inf-m-001',
      skillSlug: 'inferences',
      subskill: 'Supported vs. Possible Inferences',
      difficulty: 'medium',
      level: 'sat-application',
      stimulus:
        'The town of Millbrook held its annual harvest festival for sixty-three consecutive years before canceling the event in 2020. Organizers cited insufficient volunteer sign-ups and a funding shortfall after their primary corporate sponsor withdrew. The following year, a scaled-down version of the festival returned with a reduced number of vendors and no live music stage.',
      question: 'Which inference is most directly supported by the passage?',
      choices: [
        {
          label: 'A',
          text: 'The 2021 festival attracted more visitors than any previous harvest festival.',
        },
        {
          label: 'B',
          text: 'The festival organizers were unable to secure a replacement corporate sponsor before the 2021 event.',
        },
        {
          label: 'C',
          text: 'The community had no interest in continuing the harvest festival after 2020.',
        },
        {
          label: 'D',
          text: 'The harvest festival was an important local tradition, as evidenced by its sixty-three-year run and the decision to revive it in 2021 despite reduced resources.',
        },
      ],
      correctAnswer: 'D',
      explanation:
        'The passage states the festival ran for sixty-three consecutive years and was revived in 2021 even with reduced vendors and no live music. These two facts together support the inference that the festival was a valued local tradition — organizers revived it despite limited resources, which suggests community attachment to the event.',
      wrongAnswerExplanations: {
        A: 'The passage says nothing about visitor numbers for any year; this goes beyond the text.',
        B: 'The passage says the 2021 festival was scaled down, which may suggest resource constraints, but it does not specify whether a replacement sponsor was sought or found.',
        C: 'The revival of the festival in 2021 directly contradicts the claim that the community had no interest in continuing it.',
      },
      teachingPoint:
        'The safest inference combines two or more stated facts into their most modest logical conclusion. Sixty-three years plus revival despite reduced resources = valued tradition. Do not infer specifics (visitor numbers, sponsor negotiations) the passage never mentions.',
    },
    {
      id: 'inf-m-002',
      skillSlug: 'inferences',
      subskill: 'Combining Multiple Clues',
      difficulty: 'medium',
      level: 'sat-application',
      stimulus:
        'When the marine biologist lowered her hydrophone into the waters off the research vessel, the recording device immediately captured a cascade of clicks, whistles, and rhythmic pulses. She noted that the frequency patterns shifted gradually over the course of an hour, and that certain sequences repeated at regular intervals. Her research assistant, reviewing the recordings that evening, estimated that at least three distinct individuals were contributing to the acoustic environment.',
      question: 'Based on the passage, which of the following can most reasonably be inferred?',
      choices: [
        {
          label: 'A',
          text: 'The marine biologist was studying whale communication for the first time.',
        },
        {
          label: 'B',
          text: 'The sounds recorded were likely produced by multiple marine animals engaging in some form of structured acoustic behavior.',
        },
        {
          label: 'C',
          text: 'The repeated sequences in the recordings were distress calls.',
        },
        {
          label: 'D',
          text: 'The research vessel was in danger from the animals producing the sounds.',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'The passage describes: at least three distinct individuals (multiple animals), varied sounds (clicks, whistles, rhythmic pulses), shifting frequency patterns, and sequences that repeated at regular intervals. These details together support the inference of multiple animals producing structured acoustic behavior. "Structured" is supported by the regularity and patterning; "multiple" is directly stated by the assistant.',
      wrongAnswerExplanations: {
        A: 'The passage says nothing about whether this was the biologist\'s first experience studying marine animal sounds.',
        C: 'The passage identifies repeated sequences but gives no information about what those sequences mean — inferring "distress calls" requires outside knowledge not in the text.',
        D: 'Nothing in the passage suggests any danger to the vessel; this goes far beyond what the text supports.',
      },
      teachingPoint:
        'Combine all the details the passage provides (multiple individuals, patterned sequences, regular intervals) into one modest conclusion. The inference should follow from the listed clues without requiring outside knowledge about what specific sounds mean.',
    },
    {
      id: 'inf-m-003',
      skillSlug: 'inferences',
      subskill: 'Cautious Language in Answers',
      difficulty: 'medium',
      level: 'sat-application',
      stimulus:
        'The Alvarez hypothesis, proposed in 1980, suggested that a large asteroid impact caused the mass extinction event at the end of the Cretaceous period approximately 66 million years ago. The hypothesis was initially controversial within the paleontological community. Over the following decades, however, evidence accumulated: iridium anomalies at the Cretaceous-Paleogene boundary were found on six continents, shocked quartz and glass spherules consistent with an impact event were identified in boundary rock layers worldwide, and a large impact crater — the Chicxulub crater in what is now Mexico — was dated to the same time period.',
      question: 'Based on the passage, which of the following can most reasonably be inferred about the Alvarez hypothesis?',
      choices: [
        {
          label: 'A',
          text: 'All paleontologists now fully accept the Alvarez hypothesis without reservation.',
        },
        {
          label: 'B',
          text: 'The hypothesis was immediately accepted by the scientific community when it was proposed in 1980.',
        },
        {
          label: 'C',
          text: 'The accumulation of multiple independent lines of physical evidence increased the scientific credibility of the hypothesis after its initial controversial reception.',
        },
        {
          label: 'D',
          text: 'The Chicxulub crater was the first piece of evidence that convinced paleontologists of the hypothesis.',
        },
      ],
      correctAnswer: 'C',
      explanation:
        'The passage states the hypothesis was "initially controversial" and then describes how evidence "accumulated" over the following decades across multiple independent types (iridium anomalies, shocked quartz, the crater). The most defensible inference is that this accumulation increased the hypothesis\'s credibility — the passage implies a trajectory from controversy to evidential support.',
      wrongAnswerExplanations: {
        A: '"All paleontologists" and "without reservation" go beyond what the passage says; it describes accumulating evidence but does not state universal acceptance.',
        B: 'The passage explicitly says the hypothesis was "initially controversial" — the opposite of immediate acceptance.',
        D: 'The passage lists multiple types of evidence without ranking them or identifying which was first to convince anyone.',
      },
      teachingPoint:
        'Choose answers with cautious language ("increased credibility," "suggests," "may have") over sweeping ones ("all scientists," "proved," "immediately"). The passage shows a trajectory of evidence building; it does not claim complete consensus or a single decisive moment.',
    },
    {
      id: 'inf-m-004',
      skillSlug: 'inferences',
      subskill: 'Multi-Step Inference',
      difficulty: 'hard',
      level: 'advanced',
      stimulus:
        'The village of Thornfield had relied on its weekly market for generations, with farmers from the surrounding countryside bringing produce and livestock to trade. When a large grocery chain opened a distribution center ten kilometers away and began offering delivery service to the village, market attendance dropped by sixty percent over two years. Several long-established stalls closed. The market committee applied for a heritage designation, which, if granted, would provide modest public funding and protect the market\'s central location in the village square.',
      question: 'Which of the following can most reasonably be inferred from the passage?',
      choices: [
        {
          label: 'A',
          text: 'The heritage designation will definitely be granted and will fully restore market attendance.',
        },
        {
          label: 'B',
          text: 'The market committee sought heritage designation at least partly because the market\'s viability was threatened by the competition from the grocery chain.',
        },
        {
          label: 'C',
          text: 'The grocery chain acted illegally by opening near the village.',
        },
        {
          label: 'D',
          text: 'The farmers who previously attended the market moved to other markets in the region.',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'The passage presents a sequence: competition from the grocery chain → sixty percent attendance drop → stalls closing → heritage designation application. The inference is that the committee sought heritage designation in response to the decline triggered by competition. The passage connects these events chronologically and causally, supporting the inference that the market sought institutional protection because its viability was threatened.',
      wrongAnswerExplanations: {
        A: 'The passage says the designation would "provide modest public funding" if granted — it does not state it will be granted, nor that it would fully restore attendance.',
        C: 'The passage describes competition, not illegal activity. Nothing in the text suggests the grocery chain acted improperly.',
        D: 'The passage mentions stalls closing and attendance dropping but says nothing about where former attendees or farmers went afterward.',
      },
      teachingPoint:
        'Multi-step inferences require you to follow the logical chain in the passage: competition → decline → institutional response. The correct inference connects the steps without adding new claims (legality, full recovery) not in the text.',
    },
    {
      id: 'inf-m-005',
      skillSlug: 'inferences',
      subskill: 'Scientific Inference',
      difficulty: 'hard',
      level: 'advanced',
      stimulus:
        'A team of ecologists studying a temperate forest found that in areas where white-tailed deer populations were high, the diversity of understory plant species was significantly lower than in adjacent areas where deer were excluded by fencing. The excluded areas contained a dense layer of ferns, wildflowers, and young tree seedlings, while the open areas showed bare soil interspersed with a few deer-resistant plant species. The ecologists noted that the high-deer areas had been at similar plant diversity levels to the excluded areas twenty years earlier, before deer populations expanded following the extirpation of regional wolf populations.',
      question: 'Which of the following conclusions is most directly supported by the passage?',
      choices: [
        {
          label: 'A',
          text: 'White-tailed deer populations should be reduced to zero in temperate forests.',
        },
        {
          label: 'B',
          text: 'High deer density is associated with reduced understory plant diversity, and historical data suggest the reduction coincided with the expansion of deer populations following wolf extirpation.',
        },
        {
          label: 'C',
          text: 'Reintroducing wolves is the only effective way to restore plant diversity in temperate forests.',
        },
        {
          label: 'D',
          text: 'The fencing used in the study was too tall for deer to jump over.',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'The passage provides two sets of evidence. First, a current comparison: high-deer areas have lower plant diversity than fenced-excluded areas. Second, a historical comparison: the high-deer areas once had diversity levels similar to the excluded areas, before deer populations expanded after wolf extirpation. Together these support the conclusion that high deer density is associated with reduced diversity and that the reduction followed the deer population expansion. This is the most complete inference the passage supports.',
      wrongAnswerExplanations: {
        A: '"Reduced to zero" is an extreme policy prescription not supported or implied by the research. The passage does not recommend elimination.',
        C: 'The passage mentions wolf extirpation as a historical context for deer expansion but does not claim wolf reintroduction is the only or even the recommended solution.',
        D: 'The passage mentions fencing but provides no information about its height or whether deer attempted to cross it.',
      },
      teachingPoint:
        'Scientific inference questions often involve two-part evidence: a current observation and a historical comparison. The correct inference incorporates both without extending to policy recommendations or mechanisms the passage does not establish.',
    },
    {
      id: 'inf-m-006',
      skillSlug: 'inferences',
      subskill: 'Avoiding Unsupported Assumptions',
      difficulty: 'hard',
      level: 'advanced',
      stimulus:
        'In the eighteenth century, the philosopher David Hume argued that our belief in causation is not derived from reason but from habit. When we observe that one event is regularly followed by another — the flame, then the heat; the billiard ball\'s collision, then the other ball\'s movement — we come to expect the second event upon experiencing the first. According to Hume, this expectation is formed through repeated experience, not through any logical deduction that the first event must produce the second. He concluded that causation as a necessary connection between events is something we project onto nature rather than discover in it.',
      question: 'Based on the passage, which of the following best describes Hume\'s position on the relationship between causation and reason?',
      choices: [
        {
          label: 'A',
          text: 'Hume believed that causation does not exist at all and that the world operates by pure chance.',
        },
        {
          label: 'B',
          text: 'Hume argued that our belief in causation arises from habitual expectations formed through repeated experience rather than from logical reasoning about necessary connections between events.',
        },
        {
          label: 'C',
          text: 'Hume agreed with previous philosophers that reason alone can explain why events occur in sequence.',
        },
        {
          label: 'D',
          text: 'Hume believed that scientific experiments could definitively prove causal relationships.',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'The passage directly states Hume\'s position: belief in causation is derived from habit (repeated experience of regular sequence), not from reason (logical deduction that the first event must produce the second). Choice B accurately restates this in different words. The passage also states Hume concluded that necessary connection is "projected" rather than discovered — which Choice B captures by describing habit, not logic, as the source.',
      wrongAnswerExplanations: {
        A: 'Hume does not argue causation does not exist — he argues our belief in it as a necessary connection is psychologically derived from habit, not that the sequences themselves do not occur.',
        C: 'The passage explicitly says Hume\'s view is that belief in causation comes from habit, not reason — the opposite of agreeing that reason alone can explain sequential events.',
        D: 'The passage does not address experiments or scientific proof; Hume\'s argument is epistemological (about the source of our beliefs), not a claim about experimental methodology.',
      },
      teachingPoint:
        'For philosophical texts, the correct inference is a careful restatement of the author\'s actual position. Eliminate choices that exaggerate (causation does not exist) or contradict (reason explains causation) what the text says, and eliminate choices about topics (experiments) the passage does not address.',
    },
    {
      id: 'inf-m-007',
      skillSlug: 'inferences',
      subskill: 'Literary Inference',
      difficulty: 'medium',
      level: 'sat-application',
      stimulus:
        'The merchant examined each coin in the stranger\'s purse with slow, deliberate care, holding each one up to the lamplight and running his thumb along the milled edge before setting it down. The stranger\'s smile did not waver. When the merchant finally placed the last coin on the counter and pushed the ledger forward, the stranger signed with a flourish and pocketed the contract without reading it.',
      question: 'Which inference about the stranger is most directly supported by the passage?',
      choices: [
        {
          label: 'A',
          text: 'The stranger was nervous that the merchant would refuse the payment.',
        },
        {
          label: 'B',
          text: 'The stranger did not care about the terms of the contract.',
        },
        {
          label: 'C',
          text: 'The stranger appeared unconcerned by the merchant\'s careful scrutiny and signed the contract without reviewing its contents.',
        },
        {
          label: 'D',
          text: 'The stranger had forged the coins he presented to the merchant.',
        },
      ],
      correctAnswer: 'C',
      explanation:
        'The passage directly states that the stranger\'s smile "did not waver" during the merchant\'s careful inspection (suggesting no visible anxiety) and that the stranger signed the contract "without reading it." Choice C accurately describes what the passage shows: apparent unconcern during scrutiny and signing without review.',
      wrongAnswerExplanations: {
        A: 'The "unwavering smile" suggests the opposite of nervousness — no anxiety is visible. The inference of nervousness contradicts the text.',
        B: '"Did not care about the terms" goes further than the passage supports. The stranger did not read the contract, but the passage does not reveal the reason — perhaps the stranger already knew the terms or was supremely confident about the deal.',
        D: 'Nothing in the passage suggests the coins were forged — the merchant\'s inspection is simply described as careful, with no indication of finding anything wrong.',
      },
      teachingPoint:
        'Literary inference must stay close to what the text describes. The passage shows behavior (unwavering smile, signing without reading) but not inner states (why the stranger didn\'t read) or hidden facts (whether coins were forged). Infer the behavior, not the motive or hidden fact.',
    },
    {
      id: 'inf-m-008',
      skillSlug: 'inferences',
      subskill: 'Completing a Paragraph Logically',
      difficulty: 'hard',
      level: 'advanced',
      stimulus:
        'The shift from hunter-gatherer societies to settled agricultural communities is often portrayed as a straightforward progression from a harder, more precarious way of life to a more stable and abundant one. However, skeletal evidence from early agricultural sites tells a more complicated story. Compared to their hunter-gatherer predecessors, early farmers showed higher rates of anemia (evidenced by characteristic bone lesions), more frequent dental cavities, reduced average stature, and greater evidence of chronic infectious disease. These health indicators suggest that ______.',
      question: 'Which of the following most logically completes the passage?',
      choices: [
        {
          label: 'A',
          text: 'the transition to agriculture was the most important event in human history.',
        },
        {
          label: 'B',
          text: 'the adoption of agriculture, despite its long-run advantages, was accompanied by a decline in individual health outcomes in early farming communities.',
        },
        {
          label: 'C',
          text: 'hunter-gatherers had no health problems of any kind.',
        },
        {
          label: 'D',
          text: 'agriculture eventually led to larger populations and more complex societies.',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'The passage describes a contrast between the conventional narrative (agriculture as progress) and the skeletal evidence (worse health outcomes for early farmers in multiple categories). The completion must draw the inference that the skeletal evidence supports — namely, that the transition to agriculture was associated with worse individual health, even if it had other advantages. Choice B accurately captures this qualified conclusion.',
      wrongAnswerExplanations: {
        A: 'The passage is specifically challenging the simple "progression" narrative and providing counter-evidence; concluding that agriculture was the "most important event" does not follow from skeletal health data.',
        C: 'The passage compares hunter-gatherers to early farmers but does not claim hunter-gatherers were perfectly healthy; overstating the comparison distorts the evidence.',
        D: 'Long-run population and societal complexity are not discussed in the passage; this draws on outside knowledge rather than the evidence presented.',
      },
      teachingPoint:
        'For paragraph-completion questions, identify what conclusion the evidence in the passage points toward. The evidence here (worse health outcomes for early farmers) supports a qualified conclusion (worse individual health) — not a sweeping claim about agriculture\'s overall importance or unrelated long-run effects.',
    },
  ],
}
