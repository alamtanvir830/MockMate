import type { AcademySkill } from '../types'

export const commandOfEvidence: AcademySkill = {
  slug: 'command-of-evidence',
  title: 'Command of Evidence',
  objective: 'By the end of this lesson, you will be able to select the textual evidence that most effectively supports a given claim and explain precisely why the other choices fail to do so.',
  estimatedMinutes: 24,
  subskills: ['Supporting a Specific Claim', 'Strengthening an Argument', 'Weakening an Argument', 'Distinguishing Relevant from Tangential Evidence', 'Literary Evidence', 'Scientific Evidence', 'Connecting Evidence to Conclusions'],
  section: 'reading',
  overview: {
    whatItTests:
      'Finding the specific part of a passage that directly supports a given claim.',
    howItAppears:
      'A question asks which quotation from the text best supports a stated conclusion, or which piece of evidence would most strengthen a claim.',
    whyStudentsMissIt:
      'Students choose evidence that is related to the topic but does not directly support the specific claim, confusing "relevant" with "sufficient."',
    whatToLookFor:
      'The evidence that directly and completely supports the exact claim, not just any statement about the same subject.',
  },
  strategy: {
    steps: [
      'Identify the exact claim being tested and state it in your own words.',
      'For each evidence choice, ask whether that sentence, by itself, proves the claim.',
      'Eliminate evidence that only partly supports the claim, requires an extra assumption, or merely mentions the topic.',
      'Choose the evidence that most directly and completely addresses the claim.',
    ],
    timeSavingTip:
      'Restate the claim before reading the choices, then test each choice against that exact wording rather than the general topic.',
    whenNotToOverthink:
      'If one choice restates the claim almost directly and the others only touch the topic, pick the direct one without hunting for hidden flaws.',
  },
  commonTraps: [
    {
      title: 'The right-topic-wrong-claim trap',
      description:
        'A choice mentions the correct subject but does not actually prove the specific claim in question.',
      avoidance:
        'Being about the same topic is not enough. The evidence must support the exact point being made.',
    },
    {
      title: 'The interesting-not-relevant trap',
      description:
        'A choice is the most striking or memorable sentence but does not connect to the claim.',
      avoidance:
        'Ignore how interesting a sentence is. Judge only whether it supports the claim.',
    },
    {
      title: 'The logical-leap trap',
      description:
        'A choice supports the claim only if you add an assumption the passage does not state.',
      avoidance:
        'Good evidence should support the claim on its own, without you supplying missing steps.',
    },
    {
      title: 'The contradicting-evidence trap',
      description:
        'A choice actually weakens or contradicts the claim it is supposed to support.',
      avoidance:
        'Check the direction. Evidence that undercuts the claim is always wrong for a "supports" question.',
    },
    {
      title: `The partial-support trap`,
      description: `A choice supports part of the claim but leaves out a critical element, making it feel correct without fully proving the point.`,
      avoidance: `Ask whether the evidence covers the entire claim, not just part of it. If the claim says "X caused Y," evidence showing only that X happened is not enough.`,
      miniExample: `Claim: "The new policy increased both enrollment and retention." Evidence: "Enrollment rose by 15%." — This supports half the claim but says nothing about retention.`,
    },
    {
      title: `The correlation-not-causation trap`,
      description: `A choice shows that two things happened at the same time or in the same place, but does not show that one caused the other, even though the claim is about causation.`,
      avoidance: `If the claim says one thing caused another, the evidence must actually link the cause to the effect — not just note they occurred together.`,
      miniExample: `Claim: "The medication caused patients to recover faster." Evidence: "Patients who took the medication also exercised more." — The evidence shows a pattern, not a cause.`,
    },
  ],
  guidedExamples: [
    {
      id: 'coe-ex-1',
      stimulus:
        'A student council wanted to know whether a later school start time would help students. They surveyed classmates and reviewed attendance records. They found that after a nearby district pushed its start time from 7:30 to 8:15, the number of students arriving late fell by nearly half. Grades in first-period classes also rose slightly. Some parents complained about the new bus schedule, and a few after-school sports had to shift practice times. Overall, the council concluded that a later start improved punctuality.',
      question:
        'Which quotation best supports the council\'s conclusion that a later start improved punctuality?',
      steps: [
        {
          instruction: 'State the claim',
          content:
            'The claim is specifically about punctuality: that a later start reduced lateness.',
        },
        {
          instruction: 'Test each choice against the claim',
          content:
            'Look for the sentence that directly shows fewer students arriving late, not one about grades, buses, or sports.',
        },
        {
          instruction: 'Eliminate off-claim choices',
          content:
            'The grades sentence supports a different benefit. The bus and sports sentences are complaints, not evidence of punctuality.',
        },
        {
          instruction: 'Confirm the correct choice',
          content:
            'The sentence about lateness "falling by nearly half" directly proves improved punctuality.',
        },
      ],
      choices: [
        {
          label: 'A',
          text: '"the number of students arriving late fell by nearly half"',
        },
        { label: 'B', text: '"Grades in first-period classes also rose slightly."' },
        {
          label: 'C',
          text: '"Some parents complained about the new bus schedule"',
        },
        {
          label: 'D',
          text: '"a few after-school sports had to shift practice times"',
        },
      ],
      correctAnswer: 'A',
      explanation:
        'The claim is about punctuality. The sentence stating that lateness "fell by nearly half" directly measures punctuality and supports the conclusion.',
      wrongAnswerExplanations: {
        B: 'Rising grades support a benefit for learning, not the specific claim about punctuality.',
        C: 'A complaint about buses is a drawback, not evidence that punctuality improved.',
        D: 'Shifting sports practices is another drawback and says nothing about lateness.',
      },
    },
    {
      id: 'coe-ex-2',
      stimulus:
        'A biologist claimed that a certain frog species relies on sound, not sight, to find mates. In her study, she noted that the frogs call loudly through the night. She observed that males with louder calls attracted more females, even on moonless nights when visibility was near zero. She also recorded that the frogs are brightly colored and that they live near fast-moving streams. The bright color, she admitted, seemed to play no role in mating.',
      question:
        'Which finding best supports the claim that the frogs rely on sound rather than sight to find mates?',
      steps: [
        {
          instruction: 'State the claim',
          content:
            'The claim is that sound, not sight, drives mate-finding.',
        },
        {
          instruction: 'Test each choice',
          content:
            'The strongest evidence would show mating success tied to sound even when sight is impossible.',
        },
        {
          instruction: 'Eliminate weaker choices',
          content:
            'Bright color and stream location do not show sound matters. The biologist even says color plays no role.',
        },
        {
          instruction: 'Confirm the correct choice',
          content:
            'Louder males attracting more females "on moonless nights when visibility was near zero" proves sound works without sight.',
        },
      ],
      choices: [
        {
          label: 'A',
          text: 'Males with louder calls attracted more females even on moonless nights.',
        },
        { label: 'B', text: 'The frogs are brightly colored.' },
        { label: 'C', text: 'The frogs live near fast-moving streams.' },
        {
          label: 'D',
          text: 'The frogs call loudly through the night.',
        },
      ],
      correctAnswer: 'A',
      explanation:
        'The claim is that sound matters more than sight. Louder males succeeding "on moonless nights when visibility was near zero" shows mating depends on sound even without sight, directly supporting the claim.',
      wrongAnswerExplanations: {
        B: 'Bright color relates to sight, and the biologist says it plays no role, so it does not support the claim.',
        C: 'Living near streams is background information and does not address sound versus sight.',
        D: 'That the frogs call loudly shows they make sound, but not that sound, rather than sight, determines mating success.',
      },
    },
    {
      id: 'coe-ex-3',
      stimulus:
        'A city argued that its new recycling program was working because residents were throwing away less trash. In its report, the city noted that the amount of general garbage sent to the landfill dropped by twenty percent in the program\'s first year. The report also mentioned that the city hired ten new sanitation workers, that recycling bins were painted blue, and that a local newspaper praised the mayor. Officials said the landfill figures were the clearest sign of success.',
      question:
        'Which quotation best supports the city\'s claim that the recycling program reduced the amount of trash thrown away?',
      steps: [
        {
          instruction: 'State the claim',
          content:
            'The claim is that less trash is being thrown away because of the program.',
        },
        {
          instruction: 'Test each choice',
          content:
            'The best evidence would directly measure how much garbage went to the landfill.',
        },
        {
          instruction: 'Eliminate off-claim choices',
          content:
            'Hiring workers, painting bins, and newspaper praise do not measure trash amounts.',
        },
        {
          instruction: 'Confirm the correct choice',
          content:
            'The twenty percent drop in garbage sent to the landfill directly proves less trash is being thrown away.',
        },
      ],
      choices: [
        {
          label: 'A',
          text: '"the amount of general garbage sent to the landfill dropped by twenty percent"',
        },
        { label: 'B', text: '"the city hired ten new sanitation workers"' },
        { label: 'C', text: '"recycling bins were painted blue"' },
        { label: 'D', text: '"a local newspaper praised the mayor"' },
      ],
      correctAnswer: 'A',
      explanation:
        'The claim is about less trash being thrown away. The twenty percent drop in landfill garbage directly measures that reduction and supports the claim.',
      wrongAnswerExplanations: {
        B: 'Hiring workers is about staffing, not the amount of trash discarded.',
        C: 'The color of bins is a cosmetic detail that does not measure trash reduction.',
        D: 'Newspaper praise is an opinion about the mayor, not evidence of reduced trash.',
      },
    },
    {
      id: 'coe-ex-4',
      stimulus: `A nutritionist claimed that people who eat breakfast perform better on cognitive tasks in the morning than those who skip it. In her study, participants who ate a balanced breakfast scored an average of 18 percent higher on a series of problem-solving tasks administered at 10 a.m. than those who had fasted since the previous evening. Both groups slept the same number of hours and were tested in identical conditions. Participants also reported their moods before the test.`,
      question: `Which finding best supports the nutritionist's claim that eating breakfast improves morning cognitive performance?`,
      steps: [
        {
          instruction: `Identify the precise claim`,
          content: `The claim is specifically that eating breakfast leads to better performance on cognitive tasks in the morning — not better mood, not more sleep, just cognitive task scores.`,
        },
        {
          instruction: `Screen for scope`,
          content: `Mood reports are adjacent but off-claim. Sleep hours are a controlled variable. The cognitive score difference is the direct measure.`,
        },
        {
          instruction: `Apply the direct-proof test`,
          content: `The 18 percent higher problem-solving score for breakfast eaters, tested at 10 a.m. under identical conditions, directly measures the outcome the claim describes.`,
        },
        {
          instruction: `Confirm and state why`,
          content: `Because study time, sleep, and test conditions were equal, only the breakfast variable differs — so the score gap is direct evidence that breakfast improved cognitive performance.`,
        },
      ],
      choices: [
        { label: 'A', text: `Participants who ate breakfast scored 18 percent higher on problem-solving tasks at 10 a.m.` },
        { label: 'B', text: `Both groups slept the same number of hours.` },
        { label: 'C', text: `Participants reported their moods before the test.` },
        { label: 'D', text: `The test was administered in identical conditions.` },
      ],
      correctAnswer: 'A',
      explanation: `The claim is about cognitive task performance. The 18 percent score advantage for breakfast eaters directly measures that outcome and supports the claim. Controls like equal sleep and identical conditions are part of experimental design, not evidence of the effect.`,
      wrongAnswerExplanations: {
        B: `Equal sleep is a control variable that rules out an alternative explanation; it does not itself prove breakfast improved cognition.`,
        C: `Mood data is additional information collected but unrelated to the cognitive performance claim.`,
        D: `Identical conditions are another control; they ensure fairness but do not measure whether breakfast helped.`,
      },
      coachTakeaway: `Controls rule out alternatives; the outcome difference is the actual evidence.`,
    },
    {
      id: 'coe-ex-5',
      stimulus: `An urban planner argued that adding green spaces to a neighborhood reduces residents' stress levels, not merely their satisfaction with the area. Residents living within a five-minute walk of a park showed cortisol levels — a physiological marker of stress — that were, on average, 12 percent lower than residents in comparable neighborhoods without nearby parks. Separate surveys found that residents near parks also rated neighborhood cleanliness more highly and felt safer walking at night.`,
      question: `Which finding most directly supports the claim that green spaces reduce stress, not just general satisfaction?`,
      steps: [
        {
          instruction: `Note the "not just" qualifier`,
          content: `The claim distinguishes stress reduction from general satisfaction. Evidence about satisfaction or safety feelings does not prove the stress claim.`,
        },
        {
          instruction: `Identify what measures stress`,
          content: `Cortisol is named in the passage as a physiological marker of stress — it's an objective measure of the biological stress response.`,
        },
        {
          instruction: `Apply the direct-proof test`,
          content: `A 12 percent lower cortisol level in residents near parks directly measures lower stress, not just how people feel about their neighborhood.`,
        },
      ],
      choices: [
        { label: 'A', text: `Residents near parks showed cortisol levels 12 percent lower than residents without nearby parks.` },
        { label: 'B', text: `Residents near parks rated neighborhood cleanliness more highly.` },
        { label: 'C', text: `Residents near parks felt safer walking at night.` },
        { label: 'D', text: `The neighborhoods compared were described as comparable.` },
      ],
      correctAnswer: 'A',
      explanation: `Cortisol is a physiological measure of stress, so lower cortisol directly supports the stress-reduction claim. Cleanliness ratings and safety feelings are aspects of satisfaction — exactly what the claim says is not enough.`,
      wrongAnswerExplanations: {
        B: `Cleanliness ratings reflect satisfaction with the neighborhood, not biological stress levels.`,
        C: `Feeling safer is a subjective perception related to satisfaction, not a measure of physiological stress.`,
        D: `Comparable neighborhoods are a methodological detail ensuring fair comparison; they do not prove green space reduces stress.`,
      },
      coachTakeaway: `When a claim says "not just X," reject evidence about X, no matter how tempting.`,
    },
    {
      id: 'coe-ex-6',
      stimulus: `A historian argued that the decline of a once-powerful trading empire was caused primarily by the loss of its monopoly over a key trade route, not by internal political instability. Records show that revenues from the trade route collapsed in the decade before the empire's government began to fragment. Separately, chronicles from the period describe lengthy succession disputes and regional governors who refused to pay tribute. The empire was also known for its sophisticated legal code.`,
      question: `Which piece of evidence best supports the historian's claim that loss of the trade route, rather than political instability, caused the decline?`,
      steps: [
        {
          instruction: `Parse the causal claim`,
          content: `The claim is "trade route loss caused decline, not political instability." Evidence must prioritize the trade route as the first cause and show instability followed.`,
        },
        {
          instruction: `Look for sequence`,
          content: `If trade revenue collapsed before the government fragmented, that sequence supports the trade-route-first explanation and undermines the political-instability-first story.`,
        },
        {
          instruction: `Eliminate equal or wrong-direction evidence`,
          content: `The succession disputes and tribute refusal describe political instability — the alternative the historian argues against. The legal code is irrelevant color. The revenue collapse coming first is the key fact.`,
        },
      ],
      choices: [
        { label: 'A', text: `Revenues from the trade route collapsed in the decade before the empire's government began to fragment.` },
        { label: 'B', text: `Chronicles describe lengthy succession disputes and regional governors refusing tribute.` },
        { label: 'C', text: `The empire was known for its sophisticated legal code.` },
        { label: 'D', text: `The empire was once considered powerful.` },
      ],
      correctAnswer: 'A',
      explanation: `The historian argues the trade route loss came first and caused the decline. The fact that revenue collapsed before political fragmentation establishes that sequence and supports the trade-route explanation over the political-instability explanation.`,
      wrongAnswerExplanations: {
        B: `Succession disputes and tribute refusal are evidence of political instability — the alternative cause the historian is arguing against, not supporting.`,
        C: `The legal code is background about the empire's character and has no bearing on the cause of its decline.`,
        D: `That the empire was powerful is general context and tells us nothing about what caused it to decline.`,
      },
      coachTakeaway: `For "X caused it, not Y," the strongest evidence shows X came first or shows Y came after X — sequence is key.`,
    },
    {
      id: 'coe-ex-7',
      stimulus: `A marine biologist proposed that coral bleaching events in a particular reef were caused by unusually warm ocean temperatures rather than by increased pollution from nearby coastal development. Temperature logs showed the water near the reef reached record highs in the months immediately before each of the three bleaching events observed over a decade. Runoff data from the same period showed pollution levels that were elevated but relatively stable — unchanged during the bleaching years compared to non-bleaching years.`,
      question: `Which finding best supports the claim that warm temperatures, not pollution, caused the bleaching events?`,
      steps: [
        {
          instruction: `Identify both parts of the claim`,
          content: `The claim has two parts: (1) warm temperatures caused bleaching, and (2) pollution did not. The strongest evidence addresses both.`,
        },
        {
          instruction: `Evaluate what the temperature data shows`,
          content: `Record high temperatures immediately before each bleaching event establishes a pattern: heat spike, then bleaching. This is consistent with temperature as the cause.`,
        },
        {
          instruction: `Evaluate what the pollution data shows`,
          content: `Pollution levels were elevated but stable across bleaching and non-bleaching years alike — meaning pollution cannot explain why bleaching happened in some years and not others.`,
        },
        {
          instruction: `Select the evidence that does the most work`,
          content: `The stable pollution data is particularly powerful because it eliminates pollution as the distinguishing cause, directly supporting "not pollution."`,
        },
      ],
      choices: [
        { label: 'A', text: `Pollution levels were elevated but unchanged during bleaching years compared to non-bleaching years.` },
        { label: 'B', text: `Water temperatures reached record highs before each bleaching event.` },
        { label: 'C', text: `Three bleaching events occurred over the decade.` },
        { label: 'D', text: `Coastal development occurred near the reef.` },
      ],
      correctAnswer: 'B',
      explanation: `Record high temperatures immediately before each bleaching event establishes temperature as the consistent predictor of bleaching. Choice A also helps by ruling out pollution, but among these options, B is the most direct evidence that temperature caused the events.`,
      wrongAnswerExplanations: {
        A: `Stable pollution levels help rule out pollution as the cause, but do not by themselves show that temperature caused the bleaching — they only eliminate one alternative.`,
        C: `Three bleaching events occurred is a count; it tells us bleaching happened but nothing about what caused it.`,
        D: `Coastal development is background context; it does not address which factor (temperature or pollution) caused the bleaching.`,
      },
      coachTakeaway: `Sometimes two choices both help the argument; pick the one that most directly proves the claim, not just the one that rules out the alternative.`,
    },
    {
      id: 'coe-ex-8',
      stimulus: `A literary scholar argued that a novelist's recurring use of fog imagery signals moral ambiguity rather than simply setting atmosphere. To support this, one would need to show that fog appears specifically at moments when characters face ethical dilemmas, not merely during dramatic or outdoor scenes. In the novel, fog appears as a detective weighs whether to protect a guilty friend, as a businesswoman considers falsifying records, and as an accountant discovers his employer's fraud.`,
      question: `Which observation best supports the scholar's claim that fog signals moral ambiguity rather than mere atmosphere?`,
      steps: [
        {
          instruction: `Define the distinction in the claim`,
          content: `"Moral ambiguity" means ethical uncertainty. "Mere atmosphere" means setting or mood without ethical meaning. The claim says fog tracks ethics, not just drama or weather.`,
        },
        {
          instruction: `Look for specificity`,
          content: `The scholar needs fog to appear at ethical decision points. If fog shows up only during dilemmas and not during non-ethical dramatic moments, that supports the claim.`,
        },
        {
          instruction: `Test the evidence offered`,
          content: `The three examples all pair fog with an ethical dilemma: protecting a guilty friend, falsifying records, discovering fraud. Each is a moment of moral uncertainty.`,
        },
        {
          instruction: `Confirm this beats "atmosphere" alternatives`,
          content: `If an alternative choice simply says fog appears during dramatic scenes, that does not distinguish moral from atmospheric use. The ethical specificity of the examples is what makes them persuasive.`,
        },
      ],
      choices: [
        { label: 'A', text: `Fog appears as a detective weighs protecting a guilty friend, as a businesswoman considers falsifying records, and as an accountant discovers fraud.` },
        { label: 'B', text: `The novel is set partly outdoors in a coastal town.` },
        { label: 'C', text: `Fog is described as thick and impenetrable in each scene.` },
        { label: 'D', text: `The novelist uses weather imagery throughout the book.` },
      ],
      correctAnswer: 'A',
      explanation: `All three fog appearances listed in Choice A coincide with moments of ethical dilemma — protecting a criminal, falsifying records, uncovering fraud. This pattern shows fog tracks moral uncertainty, supporting the scholar's argument that it signals ambiguity rather than just atmosphere.`,
      wrongAnswerExplanations: {
        B: `A coastal setting explains why fog might appear atmospherically; it actually supports the alternative explanation the scholar argues against.`,
        C: `The density of the fog is a descriptive detail about how fog looks, not when it appears or what it means thematically.`,
        D: `General use of weather imagery across the book tells us fog is not unique but does not show fog specifically tracks ethical moments.`,
      },
      coachTakeaway: `To prove a pattern means something, show it holds specifically at the relevant moments — not just that the image appears.`,
    },
  ],
  drillQuestions: [
    {
      id: 'coe-d-001',
      skillSlug: 'command-of-evidence',
      difficulty: 'easy',
      stimulus:
        'A gardener claimed that adding compost helped her tomatoes grow larger. She kept two identical beds, adding compost to one and nothing extra to the other. The composted bed produced tomatoes that were noticeably bigger. Both beds received the same amount of water and sunlight.',
      question:
        'Which detail best supports the claim that compost helped the tomatoes grow larger?',
      choices: [
        {
          label: 'A',
          text: 'The composted bed produced tomatoes that were noticeably bigger.',
        },
        { label: 'B', text: 'She kept two identical beds.' },
        { label: 'C', text: 'Both beds received the same amount of water.' },
        { label: 'D', text: 'The gardener grew tomatoes.' },
      ],
      correctAnswer: 'A',
      explanation:
        'The claim is that compost led to larger tomatoes. The bigger tomatoes in the composted bed directly show that result.',
      wrongAnswerExplanations: {
        B: 'Having two beds sets up the experiment but does not by itself show compost worked.',
        C: 'Equal water controls the experiment but does not measure the size difference the claim is about.',
        D: 'That she grew tomatoes is background, not evidence about compost.',
      },
      teachingPoint:
        'The best evidence directly shows the outcome the claim describes, here, larger tomatoes.',
    },
    {
      id: 'coe-d-002',
      skillSlug: 'command-of-evidence',
      difficulty: 'easy',
      stimulus:
        'A coach believed that a short warm-up reduced player injuries. Over one season, players who did the warm-up missed far fewer games due to injury than those who skipped it. The team also bought new uniforms and traveled to more away games that year.',
      question:
        'Which detail best supports the claim that the warm-up reduced injuries?',
      choices: [
        {
          label: 'A',
          text: 'Players who did the warm-up missed far fewer games due to injury.',
        },
        { label: 'B', text: 'The team bought new uniforms.' },
        { label: 'C', text: 'The team traveled to more away games.' },
        { label: 'D', text: 'The season lasted several months.' },
      ],
      correctAnswer: 'A',
      explanation:
        'The claim is about fewer injuries. The detail that warm-up players missed fewer games due to injury directly supports it.',
      wrongAnswerExplanations: {
        B: 'New uniforms have nothing to do with injuries.',
        C: 'More travel does not measure injury rates.',
        D: 'The season length is background information, not evidence.',
      },
      teachingPoint:
        'Match the evidence to the exact outcome in the claim and ignore unrelated details.',
    },
    {
      id: 'coe-d-003',
      skillSlug: 'command-of-evidence',
      difficulty: 'easy',
      stimulus:
        'A librarian argued that a reading challenge encouraged students to read more books. She reported that during the challenge, the average number of books each student checked out rose from three to seven. She also noted that the library added new shelves and hosted an author visit.',
      question:
        'Which detail best supports the claim that the challenge encouraged students to read more?',
      choices: [
        {
          label: 'A',
          text: 'The average number of books each student checked out rose from three to seven.',
        },
        { label: 'B', text: 'The library added new shelves.' },
        { label: 'C', text: 'The library hosted an author visit.' },
        { label: 'D', text: 'The librarian organized the challenge.' },
      ],
      correctAnswer: 'A',
      explanation:
        'The rise in books checked out per student directly measures the increase in reading the claim describes.',
      wrongAnswerExplanations: {
        B: 'Adding shelves is about storage, not how much students read.',
        C: 'An author visit is an event, not a measure of reading amount.',
        D: 'That she organized it does not show whether it worked.',
      },
      teachingPoint:
        'Numbers that directly measure the claimed change make the strongest evidence.',
    },
    {
      id: 'coe-d-004',
      skillSlug: 'command-of-evidence',
      difficulty: 'medium',
      stimulus:
        'A researcher argued that a new streetlight design made drivers slow down at a dangerous intersection. After the lights were installed, the average speed of cars passing through fell from 40 to 31 miles per hour. The number of nearby parking spaces stayed the same, and a bakery opened on the corner that year.',
      question:
        'Which finding best supports the claim that the new streetlights made drivers slow down?',
      choices: [
        {
          label: 'A',
          text: 'The average speed of cars fell from 40 to 31 miles per hour.',
        },
        { label: 'B', text: 'A bakery opened on the corner.' },
        { label: 'C', text: 'The number of parking spaces stayed the same.' },
        { label: 'D', text: 'The intersection was considered dangerous.' },
      ],
      correctAnswer: 'A',
      explanation:
        'The claim is about drivers slowing down. The drop in average speed directly measures that change.',
      wrongAnswerExplanations: {
        B: 'A bakery opening is unrelated to driving speed.',
        C: 'Parking spaces staying the same tells us nothing about speed.',
        D: 'Calling the intersection dangerous is background, not evidence that speed dropped.',
      },
      teachingPoint:
        'Distinguish evidence that measures the outcome from details that merely share the setting.',
    },
    {
      id: 'coe-d-005',
      skillSlug: 'command-of-evidence',
      difficulty: 'medium',
      stimulus:
        'A teacher claimed that letting students choose their own essay topics improved the quality of their writing, not just their enthusiasm. When she compared essays, those written on self-chosen topics received higher scores from an outside grader who did not know which topics were assigned. Students also reported enjoying the assignment more, and the class period ran five minutes long.',
      question:
        'Which finding best supports the specific claim that free topic choice improved writing quality?',
      choices: [
        {
          label: 'A',
          text: 'Essays on self-chosen topics received higher scores from an outside grader.',
        },
        { label: 'B', text: 'Students reported enjoying the assignment more.' },
        { label: 'C', text: 'The class period ran five minutes long.' },
        { label: 'D', text: 'The teacher compared two sets of essays.' },
      ],
      correctAnswer: 'A',
      explanation:
        'The claim is about quality, not just enjoyment. Higher scores from an impartial grader directly measure improved writing quality.',
      wrongAnswerExplanations: {
        B: 'Enjoyment supports enthusiasm, which the claim explicitly sets aside; it does not prove quality improved.',
        C: 'The class running long is irrelevant to writing quality.',
        D: 'Comparing essays sets up the study but does not by itself show quality improved.',
      },
      teachingPoint:
        'When a claim distinguishes quality from enthusiasm, choose evidence about quality and reject evidence about enjoyment.',
    },
    {
      id: 'coe-d-006',
      skillSlug: 'command-of-evidence',
      difficulty: 'medium',
      stimulus:
        'An economist claimed that a town\'s new farmers market helped local farmers earn more, not just attract shoppers. Surveys showed that participating farmers reported a thirty percent rise in their monthly income after joining. The market also drew large crowds on weekends, and a new parking lot was built nearby.',
      question:
        'Which finding best supports the specific claim that the market helped farmers earn more?',
      choices: [
        {
          label: 'A',
          text: 'Participating farmers reported a thirty percent rise in monthly income.',
        },
        { label: 'B', text: 'The market drew large crowds on weekends.' },
        { label: 'C', text: 'A new parking lot was built nearby.' },
        { label: 'D', text: 'The town started a farmers market.' },
      ],
      correctAnswer: 'A',
      explanation:
        'The claim is about farmers earning more. The reported rise in farmers\' income directly supports that specific point.',
      wrongAnswerExplanations: {
        B: 'Large crowds show attendance, not that farmers earned more.',
        C: 'A parking lot is infrastructure, unrelated to farmer income.',
        D: 'Starting the market is background, not evidence about earnings.',
      },
      teachingPoint:
        'Crowds and popularity are not the same as income; match evidence to the exact claim.',
    },
    {
      id: 'coe-d-007',
      skillSlug: 'command-of-evidence',
      difficulty: 'medium',
      stimulus:
        'A scientist argued that a certain bird migrates using Earth\'s magnetic field rather than landmarks. In an experiment, birds kept in a room with an artificially reversed magnetic field consistently flew in the wrong direction, even though familiar landmarks were visible through the windows. The birds were also fed a special diet and weighed each morning.',
      question:
        'Which finding best supports the claim that the birds navigate by the magnetic field rather than landmarks?',
      choices: [
        {
          label: 'A',
          text: 'Birds in a reversed magnetic field flew the wrong way despite visible familiar landmarks.',
        },
        { label: 'B', text: 'The birds were fed a special diet.' },
        { label: 'C', text: 'The birds were weighed each morning.' },
        { label: 'D', text: 'The birds were kept in a room.' },
      ],
      correctAnswer: 'A',
      explanation:
        'The claim contrasts magnetic navigation with landmarks. Birds flying the wrong way when the field is reversed, even with landmarks visible, shows the field, not landmarks, guides them.',
      wrongAnswerExplanations: {
        B: 'Diet is irrelevant to how the birds navigate.',
        C: 'Daily weighing does not test navigation.',
        D: 'Being kept in a room is part of the setup, not evidence about magnetic navigation.',
      },
      teachingPoint:
        'For a claim that pits one cause against another, the best evidence isolates the two, here, changing the field while keeping landmarks visible.',
    },
    {
      id: 'coe-d-008',
      skillSlug: 'command-of-evidence',
      difficulty: 'hard',
      stimulus:
        'A historian argued that a medieval city\'s wealth came mainly from trade, not from its famous silver mine, which many assume was the source. She noted that the city\'s records show the mine\'s output had already dwindled to almost nothing decades before the city reached its peak prosperity. Meanwhile, customs documents from those peak years list thousands of taxed shipments passing through the city\'s harbor. The city was also known for its grand cathedral and its annual festival.',
      question:
        'Which finding best supports the claim that the city\'s wealth came from trade rather than the silver mine?',
      choices: [
        {
          label: 'A',
          text: 'The mine\'s output had dwindled to almost nothing decades before the city\'s peak prosperity.',
        },
        {
          label: 'B',
          text: 'The city was known for its grand cathedral.',
        },
        {
          label: 'C',
          text: 'The city held an annual festival.',
        },
        {
          label: 'D',
          text: 'The silver mine was famous throughout the region.',
        },
      ],
      correctAnswer: 'A',
      explanation:
        'The claim is that trade, not the mine, drove the wealth. Evidence that the mine had nearly stopped producing before the city grew rich rules out the mine as the source, directly supporting the claim. (The customs documents also help, but among these choices, the mine\'s early decline is the one offered.)',
      wrongAnswerExplanations: {
        B: 'A grand cathedral shows the city was rich but does not identify trade as the source.',
        C: 'A festival is a cultural detail unrelated to the source of wealth.',
        D: 'The mine\'s fame is exactly what the historian argues against; its fame is not evidence that it caused the wealth.',
      },
      teachingPoint:
        'To support "X, not Y," strong evidence rules Y out. Here, showing the mine had failed removes it as the cause.',
    },
    {
      id: 'coe-d-009',
      skillSlug: 'command-of-evidence',
      difficulty: 'hard',
      stimulus:
        'A psychologist proposed that people remember stories better than lists because stories connect facts through cause and effect. In her study, two groups memorized the same ten facts: one group received them as an unordered list, the other woven into a short story. A week later, the story group recalled far more facts. Both groups spent the same amount of time studying, and both were given the test in the same quiet room.',
      question:
        'Which finding best supports the claim that story form, rather than study conditions, improved memory?',
      choices: [
        {
          label: 'A',
          text: 'A week later, the story group recalled far more facts than the list group.',
        },
        {
          label: 'B',
          text: 'Both groups were tested in the same quiet room.',
        },
        {
          label: 'C',
          text: 'Both groups memorized ten facts.',
        },
        {
          label: 'D',
          text: 'The study took place over the course of a week.',
        },
      ],
      correctAnswer: 'A',
      explanation:
        'With study time, facts, and testing conditions held equal, the story group recalling more directly shows the story form itself improved memory.',
      wrongAnswerExplanations: {
        B: 'Equal testing conditions control the experiment but do not by themselves show the story helped; they only rule out one alternative.',
        C: 'Both groups having the same facts is part of the setup, not evidence of the outcome.',
        D: 'The one-week span is a detail about timing, not evidence that story form worked.',
      },
      teachingPoint:
        'When conditions are held equal, the outcome difference itself is the evidence; controls rule out alternatives but do not prove the claim on their own.',
    },
    {
      id: 'coe-d-010',
      skillSlug: 'command-of-evidence',
      difficulty: 'hard',
      stimulus:
        'A critic argued that a playwright\'s early comedies already contained the serious themes of her later tragedies, so the shift in her career was less sudden than it appears. To support this, one would want evidence that the early comedies deal with weighty subjects beneath their humor. The plays are known for their fast pacing, their large casts, and their witty wordplay. One early comedy, beneath its jokes, follows a family slowly torn apart by debt and quietly ends with a father left alone.',
      question:
        'Which detail best supports the claim that the early comedies already contained serious themes?',
      choices: [
        {
          label: 'A',
          text: 'One early comedy, beneath its jokes, follows a family torn apart by debt and ends with a father left alone.',
        },
        { label: 'B', text: 'The plays are known for their fast pacing.' },
        { label: 'C', text: 'The plays feature large casts.' },
        { label: 'D', text: 'The plays are full of witty wordplay.' },
      ],
      correctAnswer: 'A',
      explanation:
        'The claim is that serious themes lay beneath the comedy. A comedy that, beneath its jokes, portrays a family destroyed by debt and ends on a lonely note directly shows those serious themes.',
      wrongAnswerExplanations: {
        B: 'Fast pacing is a stylistic feature of comedy, not evidence of serious themes.',
        C: 'Large casts describe scale, not thematic depth.',
        D: 'Witty wordplay is a comedic trait and, if anything, points to lightness rather than seriousness.',
      },
      teachingPoint:
        'For a claim about hidden depth, choose the detail that shows the serious content, not the surface style.',
    },
    {
      id: 'coe-d-011',
      skillSlug: 'command-of-evidence',
      subskill: 'Selecting Textual Evidence',
      level: 'foundation',
      difficulty: 'easy',
      stimulus: `A pet owner believed that her dog became calmer after she started taking him on two walks per day instead of one. Her neighbors noticed the dog stopped barking all afternoon. The owner also bought him a new bed and a chew toy around the same time.`,
      question: `Which quotation from the passage most effectively supports the claim that the extra walk made the dog calmer?`,
      choices: [
        { label: 'A', text: `"she started taking him on two walks per day instead of one"` },
        { label: 'B', text: `"her neighbors noticed the dog stopped barking all afternoon"` },
        { label: 'C', text: `"The owner also bought him a new bed"` },
        { label: 'D', text: `"a chew toy around the same time"` },
      ],
      correctAnswer: 'B',
      explanation: `The claim is that the dog became calmer. The neighbors noticing the dog stopped barking all afternoon is direct evidence of calmer behavior. Choice A describes the cause (more walks) but not the effect (calmness). Choices C and D are other changes that cannot be ruled out but also do not directly show calmness.`,
      wrongAnswerExplanations: {
        A: `This describes the intervention, not the calming outcome. It identifies the cause the owner believes in, not the evidence that the dog actually became calmer.`,
        C: `A new bed is a change in the dog's environment, not evidence of calmer behavior.`,
        D: `A chew toy is another possible cause; it does not itself demonstrate that the dog became calmer.`,
      },
      teachingPoint: `The claim is about an outcome (calmness). Find evidence that directly shows the outcome, not evidence that merely names the intervention.`,
    },
    {
      id: 'coe-d-012',
      skillSlug: 'command-of-evidence',
      subskill: 'Selecting Textual Evidence',
      level: 'foundation',
      difficulty: 'easy',
      stimulus: `A school principal argued that the new lunch menu was popular with students. On the first day the menu launched, every table in the cafeteria was full by 11:45 a.m., which rarely happened before. Students also lined up earlier than usual. The principal sent home a newsletter about the menu change.`,
      question: `Which quotation from the passage most effectively supports the claim that the new menu was popular with students?`,
      choices: [
        { label: 'A', text: `"The principal sent home a newsletter about the menu change."` },
        { label: 'B', text: `"every table in the cafeteria was full by 11:45 a.m., which rarely happened before"` },
        { label: 'C', text: `"the new lunch menu was popular with students"` },
        { label: 'D', text: `"The principal argued"` },
      ],
      correctAnswer: 'B',
      explanation: `Full tables by 11:45 a.m. — something that rarely happened before — is direct observable evidence that students were eager to eat, showing the menu's popularity. The newsletter is an administrative action, not evidence of student response.`,
      wrongAnswerExplanations: {
        A: `A newsletter informs parents but does not show whether students liked the menu.`,
        C: `This is the claim itself restated, not supporting evidence for it.`,
        D: `The fact that the principal argued something tells us only what she said, not whether students actually liked the menu.`,
      },
      teachingPoint: `Evidence must be a fact that supports the claim, not a restatement of the claim itself.`,
    },
    {
      id: 'coe-d-013',
      skillSlug: 'command-of-evidence',
      subskill: 'Selecting Textual Evidence',
      level: 'foundation',
      difficulty: 'easy',
      stimulus: `A local farmer claimed that drought-resistant corn seeds helped his crops survive a dry summer. He planted the new seeds on half his fields and left the other half with the old variety. When almost no rain fell in July and August, the old-variety fields turned yellow and produced barely any ears. The new-seed fields stayed green and yielded a near-normal harvest.`,
      question: `Which quotation from the passage most effectively supports the claim that the drought-resistant seeds helped crops survive the dry summer?`,
      choices: [
        { label: 'A', text: `"He planted the new seeds on half his fields"` },
        { label: 'B', text: `"almost no rain fell in July and August"` },
        { label: 'C', text: `"the old-variety fields turned yellow"` },
        { label: 'D', text: `"The new-seed fields stayed green and yielded a near-normal harvest."` },
      ],
      correctAnswer: 'D',
      explanation: `The claim is that the new seeds helped crops survive. The new-seed fields staying green and producing a near-normal harvest directly shows those seeds' crops survived the drought. Choice C shows the old seeds failed but does not directly show the new seeds thrived.`,
      wrongAnswerExplanations: {
        A: `Planting on half the fields describes the experimental setup, not the outcome.`,
        B: `Almost no rain confirms the drought conditions but does not show the seeds succeeded.`,
        C: `Old-variety fields failing is evidence that the drought was severe and that old seeds failed, but does not directly show the new seeds survived.`,
      },
      teachingPoint: `When a passage describes both a success and a failure, find the excerpt that directly shows the success the claim is about.`,
    },
    {
      id: 'coe-d-014',
      skillSlug: 'command-of-evidence',
      subskill: 'Selecting Textual Evidence',
      level: 'sat-application',
      difficulty: 'medium',
      stimulus: `An economist argued that the city's new minimum-wage increase did not cause significant job losses in the restaurant industry, contrary to predictions made before the law passed. In the year following the increase, the number of restaurant jobs in the city grew by 4 percent, while the number of restaurant jobs in neighboring cities with no wage increase grew by 3 percent. Restaurant owners in the city cited higher sales volume as the reason they were able to hire despite higher costs.`,
      question: `Which quotation from the passage most effectively supports the economist's claim that the wage increase did not cause significant job losses?`,
      choices: [
        { label: 'A', text: `"Restaurant owners cited higher sales volume as the reason they were able to hire"` },
        { label: 'B', text: `"the number of restaurant jobs in the city grew by 4 percent"` },
        { label: 'C', text: `"predictions made before the law passed"` },
        { label: 'D', text: `"neighboring cities with no wage increase grew by 3 percent"` },
      ],
      correctAnswer: 'B',
      explanation: `The claim is that job losses did not occur. Restaurant jobs growing by 4 percent directly shows jobs increased, not decreased — the most direct refutation of the job-loss prediction. Choice D adds useful context but alone does not show the city's outcome.`,
      wrongAnswerExplanations: {
        A: `Owners' explanation for why they hired is interesting context but is a stated reason, not a measured outcome; it explains but does not directly prove jobs did not fall.`,
        C: `Pre-law predictions are not evidence of what actually happened — they are what the evidence disproves.`,
        D: `Neighboring cities' 3 percent growth provides comparison context but does not itself show what happened in the city with the wage increase.`,
      },
      teachingPoint: `When a claim says an expected bad outcome did not happen, the best evidence directly shows the opposite outcome occurring.`,
    },
    {
      id: 'coe-d-015',
      skillSlug: 'command-of-evidence',
      subskill: 'Selecting Textual Evidence',
      level: 'sat-application',
      difficulty: 'medium',
      stimulus: `A sociologist proposed that social media use among teenagers correlates with lower in-person social activity, not with increased social isolation overall, because teens are often coordinating real-world meetups through digital platforms. She found that teens who used social media for more than three hours per day reported slightly fewer hours of in-person socializing per week but also reported feeling no more lonely than teens who used it less. Group chats were the most common use of the platforms studied.`,
      question: `Which quotation from the passage most effectively supports the claim that heavy social media use does not increase overall social isolation?`,
      choices: [
        { label: 'A', text: `"teens who used social media for more than three hours per day reported slightly fewer hours of in-person socializing"` },
        { label: 'B', text: `"Group chats were the most common use of the platforms studied."` },
        { label: 'C', text: `"feeling no more lonely than teens who used it less"` },
        { label: 'D', text: `"teens are often coordinating real-world meetups through digital platforms"` },
      ],
      correctAnswer: 'C',
      explanation: `Isolation is measured by loneliness, not time spent in-person. The finding that heavy users felt no more lonely than lighter users directly shows social isolation did not increase — the precise claim being made.`,
      wrongAnswerExplanations: {
        A: `Fewer hours of in-person socializing supports part of the picture but could be read as evidence of isolation; it does not address whether teens felt isolated.`,
        B: `Group chats being common is about how platforms are used, not whether loneliness increased.`,
        D: `Coordinating meetups is the sociologist's explanatory theory, not the measured evidence that isolation did not increase.`,
      },
      teachingPoint: `Match evidence to how the outcome is defined in the claim. If isolation is defined as loneliness, loneliness data is the evidence — not hours spent in-person.`,
    },
    {
      id: 'coe-d-016',
      skillSlug: 'command-of-evidence',
      subskill: 'Selecting Textual Evidence',
      level: 'sat-application',
      difficulty: 'medium',
      stimulus: `A botanist argued that a specific wildflower species spreads primarily through wind dispersal rather than through animals. She observed that the species is absent from enclosed valleys where wind speeds are persistently low, even when those valleys contain the animals that typically spread seeds in the region. Meanwhile, the flower is abundant on exposed ridges where wind is strong but animal traffic is sparse.`,
      question: `Which observation most effectively supports the claim that wind, rather than animals, disperses this wildflower?`,
      choices: [
        { label: 'A', text: `"the species is absent from enclosed valleys where wind speeds are persistently low"` },
        { label: 'B', text: `"those valleys contain the animals that typically spread seeds in the region"` },
        { label: 'C', text: `"She observed that the species"` },
        { label: 'D', text: `"the flower is abundant on exposed ridges where wind is strong but animal traffic is sparse"` },
      ],
      correctAnswer: 'D',
      explanation: `The claim needs evidence that wind matters and animals do not. The ridges — where wind is strong and animals are scarce — host abundant flowers. This shows the flower thrives where wind is present but animals are absent, directly supporting wind as the dispersal mechanism.`,
      wrongAnswerExplanations: {
        A: `The valley absence shows the flower is missing where wind is low, but alone does not rule out animals as the explanation, since we also need to know animal presence there.`,
        B: `Animals being present in valleys where the flower is absent actually supports the claim against animal dispersal, but this is indirect; it's part of the contrast, not the complete evidence on its own.`,
        C: `This is an incomplete sentence fragment and provides no evidence.`,
      },
      teachingPoint: `The strongest evidence for "X, not Y" often shows the outcome is high where X is present and Y is absent — the ridge example does both simultaneously.`,
    },
    {
      id: 'coe-d-017',
      skillSlug: 'command-of-evidence',
      subskill: 'Selecting Textual Evidence',
      level: 'sat-application',
      difficulty: 'medium',
      stimulus: `A public health researcher argued that a community's fluoridated water supply was primarily responsible for the decline in childhood tooth decay rates over a twenty-year period, rather than improved access to dental care. He pointed out that dental clinic visits among children in the area had actually decreased during the same period, as several clinics closed due to funding cuts. Meanwhile, cavity rates among children fell by 35 percent over those two decades.`,
      question: `Which finding most effectively supports the claim that fluoridated water, not improved dental care access, reduced tooth decay?`,
      choices: [
        { label: 'A', text: `"cavity rates among children fell by 35 percent over those two decades"` },
        { label: 'B', text: `"dental clinic visits among children had actually decreased during the same period"` },
        { label: 'C', text: `"several clinics closed due to funding cuts"` },
        { label: 'D', text: `"a community's fluoridated water supply"` },
      ],
      correctAnswer: 'B',
      explanation: `The claim is that improved dental care access was not responsible. The fact that dental clinic visits actually decreased during the same period directly rules out improved dental care as the cause of the decay decline, leaving fluoridated water as the explanation.`,
      wrongAnswerExplanations: {
        A: `The 35 percent decline in cavities shows the outcome occurred but does not identify the cause or rule out dental care as the explanation.`,
        C: `Clinic closures explain why visits declined, but the visits data itself (Choice B) more directly addresses the dental care access question.`,
        D: `Mentioning fluoridated water names the proposed cause but is not evidence that it was responsible.`,
      },
      teachingPoint: `To support "X caused it, not Y," eliminating Y is often the strongest move. Evidence that Y actually decreased while the good outcome improved directly removes Y as a cause.`,
    },
    {
      id: 'coe-d-018',
      skillSlug: 'command-of-evidence',
      subskill: 'Selecting Textual Evidence',
      level: 'advanced',
      difficulty: 'hard',
      stimulus: `A linguist argued that children acquire vocabulary through meaning-based inference rather than through explicit instruction. She cited a study in which children encountered unfamiliar words embedded in stories they were read aloud. Without being taught the words directly, children who heard each unfamiliar word in at least three distinct story contexts were able to correctly identify its meaning more than 70 percent of the time. Children who heard the word in only one context performed no better than chance. The stories were read at a consistent pace and contained no pictures.`,
      question: `Which finding most effectively supports the claim that children acquire vocabulary through meaning-based inference?`,
      choices: [
        { label: 'A', text: `"The stories were read at a consistent pace and contained no pictures."` },
        { label: 'B', text: `"Without being taught the words directly"` },
        { label: 'C', text: `"children who heard each unfamiliar word in at least three distinct story contexts were able to correctly identify its meaning more than 70 percent of the time"` },
        { label: 'D', text: `"Children who heard the word in only one context performed no better than chance."` },
      ],
      correctAnswer: 'C',
      explanation: `The claim is that children infer meaning without instruction. Children correctly identifying word meanings 70 percent of the time after hearing them in multiple contexts — without being taught — directly demonstrates successful meaning inference. Choice B is part of the setup, not the outcome evidence; Choice D shows failure under limited context rather than success under sufficient context.`,
      wrongAnswerExplanations: {
        A: `Consistent pace and no pictures are methodological controls that prevent alternative explanations; they do not themselves show that inference succeeded.`,
        B: `"Without being taught directly" describes the conditions of the experiment, establishing that explicit instruction did not occur, but does not show the outcome — that children learned the words.`,
        D: `One-context failure shows that multiple contexts matter but focuses on the negative outcome rather than directly demonstrating successful inference.`,
      },
      teachingPoint: `The claim is about a success (inference works). Choose evidence showing the success, not evidence showing failure under worse conditions or evidence describing experimental conditions.`,
    },
    {
      id: 'coe-d-019',
      skillSlug: 'command-of-evidence',
      subskill: 'Selecting Textual Evidence',
      level: 'advanced',
      difficulty: 'hard',
      stimulus: `A political scientist proposed that voter turnout in local elections is driven more by social norms about civic duty than by rational calculations of electoral impact. In precincts where surveys showed strong community norms around voting as a social obligation, turnout exceeded 60 percent even when local races were uncontested. In precincts where duty norms were weak, turnout fell below 20 percent even in highly competitive races where a single vote had more statistical impact.`,
      question: `Which observation most effectively supports the claim that social norms, not rational calculations of impact, drive local election turnout?`,
      choices: [
        { label: 'A', text: `"voter turnout in local elections is driven more by social norms about civic duty"` },
        { label: 'B', text: `"In precincts where surveys showed strong community norms around voting as a social obligation, turnout exceeded 60 percent even when local races were uncontested."` },
        { label: 'C', text: `"In precincts where duty norms were weak, turnout fell below 20 percent even in highly competitive races"` },
        { label: 'D', text: `"a single vote had more statistical impact"` },
      ],
      correctAnswer: 'B',
      explanation: `Uncontested races have zero rational impact — there is no calculation that makes your vote matter in an uncontested race. Yet turnout exceeded 60 percent where social norms were strong. This directly shows that turnout was driven by norms, not rational impact calculations.`,
      wrongAnswerExplanations: {
        A: `This is the claim itself, not evidence for it.`,
        C: `Low turnout in competitive races despite high rational impact supports the claim indirectly, but Choice B more directly demonstrates norms overriding rationality by showing high turnout where rationality would predict none.`,
        D: `Statistical impact is the rational-calculation factor the claim argues against; naming it does not support the norm-driven explanation.`,
      },
      teachingPoint: `The sharpest evidence for "norms, not rationality" comes from cases where rational calculation would predict one thing (skip uncontested race) but norms produce the opposite (high turnout).`,
    },
    {
      id: 'coe-d-020',
      skillSlug: 'command-of-evidence',
      subskill: 'Selecting Textual Evidence',
      level: 'advanced',
      difficulty: 'hard',
      stimulus: `A film critic argued that a director's use of silence in her films creates tension more effectively than musical scoring does. In her analysis, the critic noted that the two scenes audiences consistently rated as the most tense in the director's career — a confrontation scene and a chase scene — both use complete silence rather than underscore. By contrast, heavily scored scenes received average tension ratings. The director has spoken publicly about her preference for letting visuals carry emotional weight.`,
      question: `Which finding most effectively supports the claim that silence creates tension more effectively than musical scoring in this director's films?`,
      choices: [
        { label: 'A', text: `"The director has spoken publicly about her preference for letting visuals carry emotional weight."` },
        { label: 'B', text: `"the two scenes audiences consistently rated as the most tense in the director's career both use complete silence rather than underscore"` },
        { label: 'C', text: `"heavily scored scenes received average tension ratings"` },
        { label: 'D', text: `"a confrontation scene and a chase scene"` },
      ],
      correctAnswer: 'B',
      explanation: `The critic's claim is that silence is more effective than scoring at creating tension. The two highest-rated tension scenes both using silence directly shows that silence correlates with maximum tension in audience perception, supporting the claim.`,
      wrongAnswerExplanations: {
        A: `The director's stated preference is her own view about her intentions, not audience evidence that silence actually creates more tension than scoring.`,
        C: `Average tension ratings for scored scenes show scoring is less effective, but this is the second half of the argument; Choice B provides the direct positive evidence (silence = highest tension).`,
        D: `Naming the scene types gives no information about their tension ratings or musical choices.`,
      },
      teachingPoint: `When both a positive case (silence = highest tension) and a negative case (scored = average tension) are available, the positive case is the more direct support for the claim that silence is most effective.`,
    },
    {
      id: 'coe-d-021',
      skillSlug: 'command-of-evidence',
      subskill: 'Selecting Textual Evidence',
      level: 'advanced',
      difficulty: 'hard',
      stimulus: `A geologist argued that a series of ancient landslides in a mountain range was triggered by seismic activity rather than by rainfall, as had been previously assumed. She found that the landslide deposits all contained pulverized rock with a specific crystal deformation pattern that occurs only under extreme sudden pressure — the kind produced by earthquakes, not by gradual water saturation. Rainfall records from the period also showed above-average precipitation, which had previously seemed to explain the slides.`,
      question: `Which finding most effectively supports the claim that seismic activity, not rainfall, triggered the ancient landslides?`,
      choices: [
        { label: 'A', text: `"Rainfall records from the period showed above-average precipitation."` },
        { label: 'B', text: `"the kind produced by earthquakes, not by gradual water saturation"` },
        { label: 'C', text: `"a series of ancient landslides in a mountain range"` },
        { label: 'D', text: `"landslide deposits contained pulverized rock with a crystal deformation pattern that occurs only under extreme sudden pressure"` },
      ],
      correctAnswer: 'D',
      explanation: `The crystal deformation pattern occurs only under extreme sudden pressure — and the passage tells us this rules out gradual water saturation. Choosing D captures the forensic evidence itself. Choice B is the explanatory gloss on D, not a standalone excerpt; the pattern in D is what directly shows the cause.`,
      wrongAnswerExplanations: {
        A: `Above-average rainfall supports the previously assumed cause — rainfall — not the seismic explanation. It is the competing hypothesis, not evidence for the geologist's claim.`,
        B: `This is a dependent clause explaining Choice D, not an independent piece of evidence; without the crystal deformation finding in D, B has nothing to refer to.`,
        C: `That landslides occurred is the phenomenon to be explained, not evidence of what caused them.`,
      },
      teachingPoint: `Physical forensic evidence (a measurable signature that "occurs only under" specific conditions) is extremely strong because it rules out alternatives by definition — not just by correlation.`,
    },
    {
      id: 'coe-d-022',
      skillSlug: 'command-of-evidence',
      subskill: 'Selecting Textual Evidence',
      level: 'challenge',
      difficulty: 'hard',
      stimulus: `A philosopher argued that a 19th-century novelist's narrative choices reflect a coherent ethical stance: that individuals bear moral responsibility for the foreseeable consequences of their choices, even consequences they did not intend. To support this, the philosopher pointed to three characters in the novel who suffer not from malice or accident, but from choices they made while ignoring information that was available to them. Crucially, the narrative treats their suffering not as tragic bad luck but as an outcome earned through their own willful inattention.`,
      question: `Which observation most effectively supports the claim that the novel's narrative choices reflect the ethical view that individuals are responsible for foreseeable consequences?`,
      choices: [
        { label: 'A', text: `"three characters in the novel who suffer not from malice or accident, but from choices they made while ignoring information that was available to them"` },
        { label: 'B', text: `"the narrative treats their suffering not as tragic bad luck but as an outcome earned through their own willful inattention"` },
        { label: 'C', text: `"a 19th-century novelist's narrative choices reflect a coherent ethical stance"` },
        { label: 'D', text: `"individuals bear moral responsibility for the foreseeable consequences of their choices"` },
      ],
      correctAnswer: 'B',
      explanation: `The claim is about narrative choices reflecting an ethical stance. Choice B captures how the narrative frames the characters' suffering — not as bad luck but as earned through willful inattention. This is the narrative treatment itself, showing the novel's ethical judgment, not just the plot facts. Choice A describes what happened to the characters; B shows how the narrative morally frames it.`,
      wrongAnswerExplanations: {
        A: `The characters ignoring available information is the plot fact. But the claim is about the narrative's ethical stance — and that stance is captured in how the novel treats the suffering (B), not merely what the characters did.`,
        C: `This is the claim itself, not evidence for it.`,
        D: `This is the philosophical principle the claim says the novel embodies, not a quotation showing it is embodied in the text.`,
      },
      teachingPoint: `For claims about how a narrative frames events (not just what happens), the evidence must show the framing — how the text judges or presents events — not just the events themselves.`,
    },
    {
      id: 'coe-d-023',
      skillSlug: 'command-of-evidence',
      subskill: 'Selecting Textual Evidence',
      level: 'challenge',
      difficulty: 'hard',
      stimulus: `An anthropologist argued that a particular community's gift-giving practices function primarily to establish social hierarchies rather than to express affection or reciprocal obligation, as gift-giving is commonly interpreted. She observed that gifts in the community flow almost exclusively downward — from higher-status individuals to lower-status ones — and are publicly announced. Recipients are expected to display the gifts prominently, reinforcing the giver's status. Private or anonymous giving is virtually unknown and, when it occurs, is considered socially strange rather than admirable.`,
      question: `Which observation most effectively supports the claim that gift-giving in this community primarily establishes social hierarchy rather than expresses affection or reciprocity?`,
      choices: [
        { label: 'A', text: `"gifts in the community flow almost exclusively downward — from higher-status individuals to lower-status ones — and are publicly announced"` },
        { label: 'B', text: `"Recipients are expected to display the gifts prominently, reinforcing the giver's status."` },
        { label: 'C', text: `"Private or anonymous giving is virtually unknown and is considered socially strange rather than admirable."` },
        { label: 'D', text: `"as gift-giving is commonly interpreted"` },
      ],
      correctAnswer: 'C',
      explanation: `The claim distinguishes this community's gift-giving from affection or reciprocity. Private or anonymous giving — the form that most clearly expresses affection without status display — being absent and considered strange most powerfully shows that the community's gift-giving is not about affection. It removes the alternative explanation. Choices A and B show hierarchy features but do not directly eliminate the affection/reciprocity explanation.`,
      wrongAnswerExplanations: {
        A: `Gifts flowing downward and being publicly announced shows a hierarchical structure, but it is possible to argue this could still reflect affection directed within a hierarchy; it does not eliminate affection as a motive.`,
        B: `Displaying gifts reinforces status, which is consistent with hierarchy, but a community could display gifts as a sign of pride in the relationship (affection) as well; this does not fully eliminate the affection explanation.`,
        D: `How gift-giving is commonly interpreted elsewhere is background context, not evidence about this community's practices.`,
      },
      teachingPoint: `When a claim excludes alternative explanations (not affection, not reciprocity), the strongest evidence is the absence of the forms those alternatives would predict — here, the absence of private giving.`,
    },
    {
      id: 'coe-d-024',
      skillSlug: 'command-of-evidence',
      subskill: 'Selecting Textual Evidence',
      level: 'challenge',
      difficulty: 'hard',
      stimulus: `A literary critic argued that a short story's unreliable narrator is not simply confused but is actively concealing information from the reader — a distinction that changes how readers should interpret the story's ending. She noted that at two separate moments early in the story, the narrator mentions details he then contradicts later without acknowledging the contradiction. More tellingly, in the story's final paragraph, the narrator refers to "what I have not told you," a phrase that implies deliberate withholding rather than innocent error.`,
      question: `Which observation most effectively supports the claim that the narrator is deliberately concealing information rather than simply confused?`,
      choices: [
        { label: 'A', text: `"the narrator mentions details he then contradicts later without acknowledging the contradiction"` },
        { label: 'B', text: `"in the story's final paragraph, the narrator refers to 'what I have not told you'"` },
        { label: 'C', text: `"a distinction that changes how readers should interpret the story's ending"` },
        { label: 'D', text: `"two separate moments early in the story"` },
      ],
      correctAnswer: 'B',
      explanation: `The distinction between confused and concealing hinges on intent. A confused narrator does not know they are contradicting themselves; a concealing narrator knows what they are hiding. The phrase "what I have not told you" is self-aware — the narrator explicitly acknowledges withholding information, which is only possible if the omission is deliberate, not the result of confusion.`,
      wrongAnswerExplanations: {
        A: `Contradictions without acknowledgment are consistent with both confusion and concealment; a confused narrator would also contradict themselves without noticing. This does not distinguish between the two.`,
        C: `The claim that the distinction matters to interpretation is the reason the critic makes the argument, not evidence for which type of unreliability is occurring.`,
        D: `The timing of contradictions (early in the story) is a detail about placement, not evidence about the narrator's intent.`,
      },
      teachingPoint: `When a claim hinges on intent (deliberate vs. accidental), only evidence that reveals self-awareness or conscious choice supports it — narrators who acknowledge what they are withholding expose their deliberateness.`,
    },
  ],
  masteryQuestions: [
    {
      id: 'coe-m-001',
      skillSlug: 'command-of-evidence',
      subskill: 'Supporting a Specific Claim',
      difficulty: 'medium',
      level: 'sat-application',
      stimulus:
        'In a study of long-distance migration, researchers tracked monarch butterflies across three successive generations. The first generation traveled from Canada to their overwintering sites in Mexico — a journey of approximately 4,500 kilometers. The second and third generations, raised in laboratory conditions with no contact with their parents, nonetheless navigated accurately toward the same Mexican overwintering sites when released. Researchers noted that the butterflies corrected for crosswinds and adjusted their heading throughout the journey without any learned guidance.',
      question:
        'Which quotation from the passage most directly supports the claim that monarch butterfly navigation is innate rather than learned?',
      choices: [
        {
          label: 'A',
          text: '"researchers tracked monarch butterflies across three successive generations"',
        },
        {
          label: 'B',
          text: '"a journey of approximately 4,500 kilometers"',
        },
        {
          label: 'C',
          text: '"The second and third generations, raised in laboratory conditions with no contact with their parents, nonetheless navigated accurately toward the same Mexican overwintering sites"',
        },
        {
          label: 'D',
          text: '"The first generation traveled from Canada to their overwintering sites in Mexico"',
        },
      ],
      correctAnswer: 'C',
      explanation:
        'The claim is that navigation is innate rather than learned. The most direct evidence for this is that butterflies raised in isolation from their parents — with no opportunity to learn the route — still navigated accurately. Choice C specifies both the isolation condition (laboratory, no parental contact) and the accurate outcome, directly proving the navigation did not require learning.',
      wrongAnswerExplanations: {
        A: 'This establishes the study design (multi-generational tracking) but does not directly address whether navigation is innate or learned.',
        B: 'The journey distance tells us how far the butterflies traveled but provides no evidence about whether the navigation was innate or learned.',
        D: 'This describes the first generation\'s journey but says nothing about whether it was learned or innate — the first generation could have learned from conspecifics or followed others.',
      },
      teachingPoint:
        'For "innate vs. learned" claims, the best evidence is always the condition that eliminates the possibility of learning (isolation, no contact, no prior experience) combined with the accurate outcome. Eliminate choices that describe the behavior without ruling out the learned explanation.',
    },
    {
      id: 'coe-m-002',
      skillSlug: 'command-of-evidence',
      subskill: 'Strengthening an Argument',
      difficulty: 'medium',
      level: 'sat-application',
      stimulus:
        'A researcher studying urban crime patterns argues that street lighting improvements reduce nighttime property crime in residential neighborhoods. The researcher cites three years of police reports from four cities that installed new LED streetlights across designated zones.',
      question:
        'Which additional piece of evidence, if true, would most strengthen the researcher\'s argument?',
      choices: [
        {
          label: 'A',
          text: 'Neighborhoods that received improved street lighting saw a 30% decline in nighttime property crimes, while similar neighborhoods without new lighting saw no significant change over the same period.',
        },
        {
          label: 'B',
          text: 'LED streetlights consume significantly less electricity than the sodium-vapor lights they replaced.',
        },
        {
          label: 'C',
          text: 'Three of the four cities also increased police patrols in the lighting-improvement zones during the study period.',
        },
        {
          label: 'D',
          text: 'Property crime in all four cities declined during the day as well as at night over the study period.',
        },
      ],
      correctAnswer: 'A',
      explanation:
        'The researcher\'s argument is that lighting improvements cause the crime reduction. Choice A provides a comparison group: neighborhoods with improved lighting saw a 30% decline while similar neighborhoods without new lighting saw no change. This comparison rules out alternative explanations (like a citywide crime drop) and strengthens the causal claim.',
      wrongAnswerExplanations: {
        B: 'Energy efficiency is irrelevant to the crime-reduction argument; it addresses a different benefit of LED lights.',
        C: 'This actually weakens the argument by introducing an alternative explanation: the crime reduction might be due to more patrols, not better lighting.',
        D: 'A daytime crime decline in all cities suggests a citywide trend unrelated to the nighttime lighting change, which undermines rather than supports the specific claim about lighting.',
      },
      teachingPoint:
        'The strongest evidence for a causal claim includes a comparison group that shows the effect is absent when the cause is absent. Always look for the choice that eliminates alternative explanations, not just the one that shows correlation.',
    },
    {
      id: 'coe-m-003',
      skillSlug: 'command-of-evidence',
      subskill: 'Distinguishing Relevant from Tangential Evidence',
      difficulty: 'medium',
      level: 'sat-application',
      stimulus:
        'Historians have debated whether the Black Death of the fourteenth century led to long-term improvements in wages for surviving European peasants. The disease killed between thirty and fifty percent of Europe\'s population between 1347 and 1351. Proponents of the "wage-rise hypothesis" argue that the sudden labor shortage gave surviving workers unprecedented bargaining power, forcing landowners to offer higher wages and better conditions to attract laborers.',
      question:
        'Which of the following pieces of evidence would most directly support the wage-rise hypothesis as described?',
      choices: [
        {
          label: 'A',
          text: 'Medieval chronicles from the period describe widespread panic, public processions of flagellants, and blaming of minority groups for the plague.',
        },
        {
          label: 'B',
          text: 'Manor records from England show that daily wages for agricultural laborers roughly doubled between 1347 and 1380, and that landowners offered additional incentives such as reduced rents and greater personal freedoms.',
        },
        {
          label: 'C',
          text: 'The Black Death is now attributed to the bacterium Yersinia pestis, transmitted primarily by fleas carried on rats.',
        },
        {
          label: 'D',
          text: 'Some landowners responded to labor shortages by converting arable land to sheep pasture, which required fewer workers.',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'The wage-rise hypothesis specifically predicts that surviving workers received higher wages and better conditions due to their increased bargaining power. Choice B provides manor records directly documenting both: wages doubled and landowners offered additional incentives. This is precisely the outcome the hypothesis predicts.',
      wrongAnswerExplanations: {
        A: 'Social and cultural responses to the plague are relevant to other historical questions but do not address wages or labor conditions.',
        C: 'The biological cause of the Black Death is irrelevant to whether wages rose afterward — it explains what killed people, not what happened to survivors\' economic conditions.',
        D: 'This describes one landowner response (conversion to pasture) that reduced labor demand rather than increasing wages — if anything, it complicates the hypothesis rather than supporting it.',
      },
      teachingPoint:
        'Match the evidence to the exact claim. The wage-rise hypothesis predicts a specific economic outcome (higher wages, better conditions). Only evidence that documents those specific outcomes supports it; evidence about other aspects of the Black Death does not.',
    },
    {
      id: 'coe-m-004',
      skillSlug: 'command-of-evidence',
      subskill: 'Literary Evidence',
      difficulty: 'hard',
      level: 'advanced',
      stimulus:
        'In her novel, the author consistently portrays the protagonist\'s relationship with her hometown as one of profound ambivalence — a mixture of deep attachment and a suffocating sense of limitation. The protagonist returns repeatedly to childhood spaces and speaks of them with tenderness, yet she also describes the town as a "beautiful cage" and confides to a friend that she left not because she stopped loving the place but because staying would have meant ceasing to grow.',
      question:
        'Which quotation from the passage provides the strongest evidence that the protagonist\'s ambivalence is genuine rather than simply a rationalization for leaving?',
      choices: [
        {
          label: 'A',
          text: '"The protagonist returns repeatedly to childhood spaces and speaks of them with tenderness"',
        },
        {
          label: 'B',
          text: '"she also describes the town as a \'beautiful cage\'"',
        },
        {
          label: 'C',
          text: '"she left not because she stopped loving the place but because staying would have meant ceasing to grow"',
        },
        {
          label: 'D',
          text: '"The author consistently portrays the protagonist\'s relationship with her hometown as one of profound ambivalence"',
        },
      ],
      correctAnswer: 'C',
      explanation:
        'Ambivalence is genuine when a person holds both positive and negative feelings simultaneously, not when they use positive language to excuse a negative decision. Choice C is the strongest evidence because the protagonist explicitly states she still loves the place — she did not leave because she stopped caring. This simultaneous presence of love and the necessity of leaving (to avoid ceasing to grow) is the clearest expression of genuine ambivalence rather than rationalization.',
      wrongAnswerExplanations: {
        A: 'This shows attachment (tenderness toward childhood spaces) but only one side of the ambivalence. On its own, it does not establish the mixture of attachment and limitation.',
        B: 'This shows the sense of limitation ("cage") but only one side. Combined with other evidence it contributes to ambivalence, but alone it shows only negativity, not simultaneous attachment.',
        D: 'This is the author\'s characterization of the relationship, not evidence from within the novel. It states the conclusion rather than providing evidence for it.',
      },
      teachingPoint:
        'For literary evidence questions, the best choice is the one that most fully and directly demonstrates the specific quality being claimed. Genuine ambivalence requires simultaneous presence of opposing feelings; the strongest evidence is a statement in which both appear together in one utterance.',
    },
    {
      id: 'coe-m-005',
      skillSlug: 'command-of-evidence',
      subskill: 'Scientific Evidence',
      difficulty: 'hard',
      level: 'advanced',
      stimulus:
        'Researchers investigating the health effects of ultra-processed foods (UPFs) conducted a twelve-month randomized controlled trial. Participants were randomly assigned to consume either a diet high in UPFs or a minimally processed diet matched for total calories, sugar, fat, and fiber. Participants on the UPF diet consumed an average of 508 more calories per day than their baseline intake, while participants on the minimally processed diet consumed an average of 89 fewer calories per day. Participants on the UPF diet gained an average of 0.9 kg over twelve months, while participants on the minimally processed diet lost an average of 1.1 kg.',
      question:
        'A researcher claims that ultra-processed foods promote overconsumption of calories independently of their macronutrient content. Which detail from the passage most directly supports this claim?',
      choices: [
        {
          label: 'A',
          text: 'Participants on the UPF diet gained an average of 0.9 kg over twelve months.',
        },
        {
          label: 'B',
          text: 'Participants were randomly assigned to consume either a diet high in UPFs or a minimally processed diet.',
        },
        {
          label: 'C',
          text: 'The diets were matched for total calories, sugar, fat, and fiber, yet UPF participants consumed 508 more calories per day than baseline while minimally processed participants consumed 89 fewer.',
        },
        {
          label: 'D',
          text: 'Participants on the minimally processed diet lost an average of 1.1 kg over twelve months.',
        },
      ],
      correctAnswer: 'C',
      explanation:
        'The claim is that UPFs promote overconsumption independently of macronutrient content. The critical design detail is that the diets were matched for macronutrients (calories, sugar, fat, fiber) yet UPF participants still consumed far more. This "matched but still different" result is precisely the evidence that macronutrient content alone cannot explain the overconsumption — something specific to UPFs must be driving it.',
      wrongAnswerExplanations: {
        A: 'Weight gain is a downstream consequence but does not directly address the mechanism (overconsumption independent of macronutrients). It is evidence that UPFs affect body weight, not specifically that they cause overconsumption independent of macronutrient content.',
        B: 'Random assignment establishes study validity and controls for confounders, but it does not provide the specific evidence about caloric intake that supports the claim.',
        D: 'Weight loss in the minimally processed group is a relevant finding but again addresses weight, not the caloric intake pattern that directly proves the overconsumption-independent-of-macronutrients claim.',
      },
      teachingPoint:
        'When a claim states that X causes Y "independently of Z," the strongest evidence is a design that holds Z constant (matched diets) while showing X still produces Y (overconsumption). The controlled condition is the key to proving independence.',
    },
    {
      id: 'coe-m-006',
      skillSlug: 'command-of-evidence',
      subskill: 'Weakening an Argument',
      difficulty: 'hard',
      level: 'advanced',
      stimulus:
        'A sociologist argues that social media use causes depression in adolescents, citing a survey of 5,000 teenagers showing that those who spent more than three hours per day on social media reported higher rates of depressive symptoms than those who spent fewer than one hour per day.',
      question:
        'Which of the following, if true, would most directly weaken the sociologist\'s causal argument?',
      choices: [
        {
          label: 'A',
          text: 'The survey was conducted online, which may have introduced sampling bias.',
        },
        {
          label: 'B',
          text: 'Adolescents who were already experiencing depressive symptoms reported turning to social media to cope with loneliness, which increased their usage.',
        },
        {
          label: 'C',
          text: 'Social media platforms have become more widely used among adolescents over the past decade.',
        },
        {
          label: 'D',
          text: 'Some of the survey\'s respondents were under sixteen, an age at which depressive symptoms are less reliably self-reported.',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'The sociologist concludes that social media use causes depression (social media → depression). Choice B introduces reverse causation: depression causes increased social media use (depression → social media). If depressed adolescents turn to social media to cope, the correlation observed in the survey could be entirely explained by this reverse direction, and the survey data would not distinguish cause from effect.',
      wrongAnswerExplanations: {
        A: 'Sampling bias could affect who was surveyed but does not directly address the causal direction — it is a concern about generalizability, not about whether the relationship is causal in the observed direction or the reverse.',
        C: 'Growing social media use is a general trend; it does not challenge whether social media causes depression in those who use it heavily.',
        D: 'Reliability concerns about self-reported depression in younger adolescents challenge the accuracy of the data but do not address the causal direction of the relationship.',
      },
      teachingPoint:
        'The most direct challenge to a causal argument is reverse causation: showing that Y might cause X rather than X causing Y. A correlation between high social media use and depression is consistent with either direction; only longitudinal or experimental data can resolve the direction.',
    },
    {
      id: 'coe-m-007',
      skillSlug: 'command-of-evidence',
      subskill: 'Connecting Evidence to Conclusions',
      difficulty: 'medium',
      level: 'sat-application',
      stimulus:
        'A scholar of early American literature argues that eighteenth-century almanacs served a more significant cultural function than is commonly recognized. Almanacs, distributed annually to homes throughout the colonies, contained not only practical information — weather predictions, planting calendars, tide tables — but also short essays, poetry, anecdotes, and moral aphorisms. Literacy scholars estimate that almanacs were among the most widely read printed materials in colonial America, often shared among neighbors and read aloud in households that possessed only a small number of books.',
      question:
        'Which detail from the passage most directly supports the scholar\'s claim that almanacs served a more significant cultural function than is commonly recognized?',
      choices: [
        {
          label: 'A',
          text: 'Almanacs contained practical information such as weather predictions, planting calendars, and tide tables.',
        },
        {
          label: 'B',
          text: 'Almanacs were distributed annually to homes throughout the colonies.',
        },
        {
          label: 'C',
          text: 'Almanacs also contained short essays, poetry, anecdotes, and moral aphorisms — and were among the most widely read printed materials in colonial America, often shared among neighbors and read aloud.',
        },
        {
          label: 'D',
          text: 'Almanacs were produced by printers who competed for subscribers across the colonies.',
        },
      ],
      correctAnswer: 'C',
      explanation:
        'The scholar\'s claim is that almanacs served a more significant cultural function than commonly recognized. The "more significant" part requires evidence of literary or cultural content beyond practical utility, combined with evidence of broad reach and communal use. Choice C provides both: it identifies the literary content (essays, poetry, moral aphorisms) and the cultural practice (widely read, shared, read aloud) — together showing almanacs functioned as cultural media, not just practical references.',
      wrongAnswerExplanations: {
        A: 'This describes the commonly recognized practical function — exactly what the claim says is insufficient to capture the full cultural role.',
        B: 'Annual distribution establishes reach but not cultural function. Lots of things are widely distributed without serving a significant cultural role.',
        D: 'Competition among printers suggests a commercial context but does not address the cultural function of almanacs for readers.',
      },
      teachingPoint:
        'When the claim is that something is "more than commonly recognized," the supporting evidence must show the under-recognized dimension. Practical-use evidence supports the common view; literary content plus communal reading practices supports the "more than" claim.',
    },
    {
      id: 'coe-m-008',
      skillSlug: 'command-of-evidence',
      subskill: 'Relevant vs. Sufficient Evidence',
      difficulty: 'hard',
      level: 'advanced',
      stimulus:
        'A historian argues that the construction of the Erie Canal fundamentally transformed New York\'s economic geography by making inland transport cheap enough to displace coastal shipping as the dominant mode of moving goods to eastern markets. Before the canal opened in 1825, the cost of transporting a ton of freight by wagon from the interior of New York to New York City was approximately ninety dollars. After the canal opened, the same journey cost under four dollars.',
      question:
        'A critic argues that the price drop alone does not prove the canal "transformed" New York\'s economic geography — only that transport became cheaper. Which additional evidence, if true, would most directly respond to the critic\'s objection?',
      choices: [
        {
          label: 'A',
          text: 'The Erie Canal took eight years to construct and cost approximately seven million dollars.',
        },
        {
          label: 'B',
          text: 'After the canal opened, interior New York cities such as Rochester and Buffalo grew rapidly as agricultural and manufacturing hubs, while coastal shipping routes declined sharply in the volume of goods they carried.',
        },
        {
          label: 'C',
          text: 'The Erie Canal was 584 kilometers long and used a series of 83 locks to navigate changes in elevation.',
        },
        {
          label: 'D',
          text: 'Other states, observing the canal\'s success, subsequently invested in their own canal systems.',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'The critic\'s objection is that a price drop shows transport became cheaper but not that economic geography was transformed. To respond, the historian needs evidence that the price drop actually changed where economic activity occurred — specifically, that interior regions grew into economic centers while the previous coastal patterns declined. Choice B provides both: interior cities grew as hubs (showing geographic redistribution of economic activity) and coastal shipping declined (showing the displacement the historian claims).',
      wrongAnswerExplanations: {
        A: 'Construction time and cost describe the canal\'s scale but do not address whether it transformed economic geography.',
        C: 'Technical specifications about the canal\'s length and locks are irrelevant to the economic transformation claim.',
        D: 'Other states building canals shows the Erie Canal was influential nationally, but it does not show that New York\'s own economic geography was transformed.',
      },
      teachingPoint:
        'When a critic says evidence X is relevant but insufficient to prove claim Y, the additional evidence needed is the missing link between X and Y. Here: price drop (X) does not by itself prove geographic transformation (Y); evidence of actual geographic change in economic activity closes the gap.',
    },
  ],
}
