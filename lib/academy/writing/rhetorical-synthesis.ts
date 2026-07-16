import type { AcademySkill } from '../types'

export const rhetoricalSynthesis: AcademySkill = {
  slug: 'rhetorical-synthesis',
  title: 'Rhetorical Synthesis',
  section: 'writing',
  overview: {
    whatItTests:
      'Using provided notes or bullet points to construct a sentence that best accomplishes a specific writing goal.',
    howItAppears:
      'The prompt describes a student writing about a topic, lists four or five bulleted notes, and asks, "Which choice most effectively uses the information to accomplish [a specific goal]?"',
    whyStudentsMissIt:
      'Students choose answers that use some of the notes but miss the specific goal, or they pick grammatically clean sentences that do not actually fulfill the stated purpose.',
    whatToLookFor:
      'The exact writing goal in the prompt, which notes are relevant to that goal, and which choice uses those relevant notes accurately and completely.',
  },
  strategy: {
    steps: [
      'Read the writing goal first and underline its key verb (compare, illustrate, explain, emphasize, acknowledge, introduce).',
      'Identify which bullet points are directly relevant to that goal and mentally set aside the rest.',
      'Eliminate any choice that uses irrelevant notes, invents details not in the notes, or fulfills only part of the goal.',
      'Among the remaining choices, select the one that most completely and accurately accomplishes the stated goal.',
      'Double-check that every detail in your chosen sentence appears in the notes and points in the direction the goal demands.',
    ],
    timeSavingTip:
      'Read the goal before the bullets. Knowing you need a "contrast" or a "cause" lets you scan the notes for exactly the two facts you need and ignore the rest.',
    whenNotToOverthink:
      'Grammar is rarely the issue here — most choices are grammatically fine. Judge choices purely on whether they hit the goal, not on how polished they sound.',
  },
  commonTraps: [
    {
      title: 'Grammatical but off-goal',
      description:
        'A choice reads smoothly and accurately reports a fact, but it does not do what the goal asks (for instance, it describes when the goal is to compare).',
      avoidance:
        'Re-read the goal after picking an answer and confirm the sentence performs that exact task.',
    },
    {
      title: 'Right facts, wrong direction',
      description:
        'A choice uses the correct notes but frames them backward — emphasizing similarity when the goal is contrast, or a benefit when the goal is a drawback.',
      avoidance:
        'Check that the relationship in the sentence matches the relationship the goal requires.',
    },
    {
      title: 'Invented detail',
      description:
        'A choice adds a fact, statistic, or claim that never appears in the notes.',
      avoidance:
        'Verify that every detail in the answer can be traced to a specific bullet point.',
    },
    {
      title: 'Partial goal',
      description:
        'A choice accomplishes part of the goal (naming one of two things to compare) but omits a required element.',
      avoidance:
        'Make sure the sentence covers every component the goal names, not just one.',
    },
    {
      title: 'Accurate summary, no purpose',
      description:
        'A choice faithfully summarizes the notes but ignores the specific rhetorical purpose the prompt sets.',
      avoidance:
        'A correct answer must both use the notes and serve the stated goal — a neutral summary is not enough.',
    },
  ],
  guidedExamples: [
    {
      id: 'rs-ex-1',
      stimulus:
        'While researching methods of urban transportation, a student has taken the following notes:\n• Cable cars run on fixed rails and are powered by an underground moving cable.\n• Cable cars climb steep hills easily but travel at a slow, steady pace.\n• Trolleybuses draw power from overhead electric wires.\n• Trolleybuses accelerate quickly and can steer around obstacles in the roadway.\nThe student wants to compare the two transportation methods.',
      question:
        'Which choice most effectively uses the notes to accomplish this goal?',
      steps: [
        {
          instruction: 'Underline the goal',
          content:
            'The goal is to COMPARE the two methods — the answer must mention both cable cars and trolleybuses and set them side by side.',
        },
        {
          instruction: 'Find the relevant contrasting facts',
          content:
            'Cable cars climb hills but move slowly; trolleybuses accelerate quickly and steer around obstacles. These pairs let us compare.',
        },
        {
          instruction: 'Eliminate single-subject choices',
          content:
            'Any choice that describes only one vehicle fails the "compare" goal.',
        },
        {
          instruction: 'Select the balanced comparison',
          content:
            'The choice that contrasts the cable car’s hill-climbing slowness with the trolleybus’s quick, maneuverable acceleration compares both directly.',
        },
      ],
      choices: [
        {
          label: 'A',
          text: 'Cable cars, powered by an underground moving cable, run on fixed rails.',
        },
        {
          label: 'B',
          text: 'Whereas cable cars climb steep hills easily but move slowly, trolleybuses accelerate quickly and can steer around obstacles.',
        },
        {
          label: 'C',
          text: 'Trolleybuses draw their power from overhead electric wires strung above city streets.',
        },
        {
          label: 'D',
          text: 'Both cable cars and trolleybuses have long served as popular forms of urban transportation.',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'The goal is to compare the two methods, and choice B sets the cable car’s strengths and weaknesses directly against the trolleybus’s, using accurate details from the notes.',
      wrongAnswerExplanations: {
        A: 'This describes only cable cars, so it does not compare the two methods.',
        C: 'This describes only trolleybuses, failing the comparison goal.',
        D: 'This states a vague similarity but does not compare specific features, and "popular" is not in the notes.',
      },
    },
    {
      id: 'rs-ex-2',
      stimulus:
        'While studying a coastal fishing village, a student has taken these notes:\n• In 2015 a new deep-water harbor opened just north of the village.\n• The harbor allowed larger commercial vessels to dock nearby for the first time.\n• Many local fishers sold their small boats and took jobs on the commercial vessels.\n• By 2020 the number of independent fishing boats in the village had dropped by half.\nThe student wants to explain a cause of the decline in independent fishing boats.',
      question:
        'Which choice most effectively uses the notes to accomplish this goal?',
      steps: [
        {
          instruction: 'Underline the goal',
          content:
            'The goal is to EXPLAIN A CAUSE of the decline in independent boats.',
        },
        {
          instruction: 'Trace the causal chain',
          content:
            'The harbor let large vessels dock; local fishers left their own boats for jobs on those vessels; the number of independent boats fell.',
        },
        {
          instruction: 'Reject non-causal choices',
          content:
            'A choice that only reports the decline, or only reports the harbor’s opening, does not explain the cause connecting them.',
        },
        {
          instruction: 'Select the causal sentence',
          content:
            'The choice that links the harbor’s new commercial vessels to fishers leaving their own boats explains the cause.',
        },
      ],
      choices: [
        {
          label: 'A',
          text: 'By 2020 the number of independent fishing boats in the village had dropped by half.',
        },
        {
          label: 'B',
          text: 'In 2015 a new deep-water harbor opened just north of the village.',
        },
        {
          label: 'C',
          text: 'Because the new harbor let larger commercial vessels dock nearby, many local fishers sold their small boats to take jobs aboard those vessels, halving the number of independent boats.',
        },
        {
          label: 'D',
          text: 'The coastal village has long depended on fishing as its primary source of income.',
        },
      ],
      correctAnswer: 'C',
      explanation:
        'The goal is to explain a cause, and choice C traces the causal chain from the harbor to the commercial vessels to fishers abandoning their own boats, accurately using the notes.',
      wrongAnswerExplanations: {
        A: 'This reports the effect (the decline) but explains no cause.',
        B: 'This reports the harbor’s opening but does not connect it to the decline in boats.',
        D: 'This adds background ("primary source of income") not in the notes and explains no cause.',
      },
    },
    {
      id: 'rs-ex-3',
      stimulus:
        'While writing about a proposed downtown pedestrian mall, a student has taken these notes:\n• Supporters say closing the street to cars will boost foot traffic for shops.\n• A similar pedestrian mall in a nearby city increased retail sales by 12 percent.\n• Critics argue that removing parking could drive away customers who arrive by car.\n• Some nearby business owners rely heavily on shoppers who park directly in front of their stores.\nThe student wants to introduce a counterargument to the supporters’ position.',
      question:
        'Which choice most effectively uses the notes to accomplish this goal?',
      steps: [
        {
          instruction: 'Underline the goal',
          content:
            'The goal is to INTRODUCE A COUNTERARGUMENT to the supporters — so the answer must present the critics’ side.',
        },
        {
          instruction: 'Locate the opposing notes',
          content:
            'The critics’ concerns are the lost parking and the customers who arrive by car; these oppose the supporters’ foot-traffic claim.',
        },
        {
          instruction: 'Reject pro-supporter or neutral choices',
          content:
            'Any choice that restates the supporters’ benefits or stays neutral fails to introduce a counterargument.',
        },
        {
          instruction: 'Select the counterargument',
          content:
            'The choice that voices the critics’ worry about lost parking and car-arriving customers introduces the counterargument.',
        },
      ],
      choices: [
        {
          label: 'A',
          text: 'Supporters believe that closing the street to cars will bring more foot traffic to local shops.',
        },
        {
          label: 'B',
          text: 'A comparable pedestrian mall in a nearby city increased retail sales by 12 percent.',
        },
        {
          label: 'C',
          text: 'Critics counter that removing parking could drive away the many customers who arrive by car and shop at stores relying on nearby parking.',
        },
        {
          label: 'D',
          text: 'The proposed pedestrian mall would occupy several blocks of the downtown area.',
        },
      ],
      correctAnswer: 'C',
      explanation:
        'The goal is to introduce a counterargument, and choice C presents the critics’ opposing concern about lost parking and car-dependent customers, drawn directly from the notes.',
      wrongAnswerExplanations: {
        A: 'This restates the supporters’ position rather than countering it.',
        B: 'This supports the pro-mall side with a favorable statistic, the opposite of a counterargument.',
        D: 'This adds a neutral detail ("several blocks") and takes no opposing stance.',
      },
    },
  ],
  drillQuestions: [
    {
      id: 'rs-d-001',
      skillSlug: 'rhetorical-synthesis',
      subskill: 'emphasize',
      difficulty: 'easy',
      stimulus:
        'A student is writing about a rare butterfly and has taken these notes:\n• The Alpine blue butterfly lives only above 2,000 meters of elevation.\n• Its wings shimmer a pale silver-blue in direct sunlight.\n• It feeds exclusively on a single mountain wildflower.\n• Fewer than 500 individuals are thought to remain in the wild.\nThe student wants to emphasize how rare the butterfly is.',
      question:
        'Which choice most effectively uses the notes to accomplish this goal?',
      choices: [
        {
          label: 'A',
          text: 'The Alpine blue butterfly has wings that shimmer a pale silver-blue in sunlight.',
        },
        {
          label: 'B',
          text: 'With fewer than 500 individuals thought to remain in the wild, the Alpine blue butterfly is extraordinarily rare.',
        },
        {
          label: 'C',
          text: 'The Alpine blue butterfly feeds exclusively on a single mountain wildflower.',
        },
        {
          label: 'D',
          text: 'The Alpine blue butterfly lives above 2,000 meters of elevation.',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'The goal is to emphasize rarity, and choice B foregrounds the tiny population (fewer than 500) and calls the butterfly "extraordinarily rare."',
      wrongAnswerExplanations: {
        A: 'This describes the wings, not the butterfly’s rarity.',
        C: 'This describes its diet, not its rarity.',
        D: 'This describes its elevation, not its rarity.',
      },
      teachingPoint:
        'To emphasize a quality, choose the note that most directly demonstrates that quality — here, the small population size.',
    },
    {
      id: 'rs-d-002',
      skillSlug: 'rhetorical-synthesis',
      subskill: 'describe',
      difficulty: 'easy',
      stimulus:
        'A student is writing about an old lighthouse and has these notes:\n• The lighthouse was built in 1868 from local granite.\n• It stands 34 meters tall on a rocky headland.\n• Its light once guided ships past a dangerous reef.\n• It was automated in 1990 and no longer has a resident keeper.\nThe student wants to describe the lighthouse’s original purpose.',
      question:
        'Which choice most effectively uses the notes to accomplish this goal?',
      choices: [
        {
          label: 'A',
          text: 'The lighthouse was built in 1868 from local granite.',
        },
        {
          label: 'B',
          text: 'The lighthouse was automated in 1990 and no longer has a resident keeper.',
        },
        {
          label: 'C',
          text: 'The lighthouse’s light once guided ships safely past a dangerous reef.',
        },
        {
          label: 'D',
          text: 'The lighthouse stands 34 meters tall on a rocky headland.',
        },
      ],
      correctAnswer: 'C',
      explanation:
        'The goal is the original purpose, and choice C states that the light guided ships past a dangerous reef.',
      wrongAnswerExplanations: {
        A: 'This gives construction details, not the purpose.',
        B: 'This describes a later change (automation), not the original purpose.',
        D: 'This describes its height and location, not its purpose.',
      },
      teachingPoint:
        'Match the note to the exact aspect the goal names — here, the lighthouse’s purpose.',
    },
    {
      id: 'rs-d-003',
      skillSlug: 'rhetorical-synthesis',
      subskill: 'contrast',
      difficulty: 'easy',
      stimulus:
        'A student is writing about two painting techniques and has these notes:\n• Fresco paint is applied to wet plaster and dries as part of the wall.\n• Fresco must be completed quickly before the plaster dries.\n• Oil paint is applied to canvas and dries slowly over days.\n• Oil paint can be reworked long after it is first applied.\nThe student wants to contrast the two techniques.',
      question:
        'Which choice most effectively uses the notes to accomplish this goal?',
      choices: [
        {
          label: 'A',
          text: 'Fresco paint is applied to wet plaster and dries as part of the wall.',
        },
        {
          label: 'B',
          text: 'Unlike fresco, which must be finished quickly before the plaster dries, oil paint dries slowly and can be reworked for days.',
        },
        {
          label: 'C',
          text: 'Oil paint is applied to canvas and dries slowly over the course of several days.',
        },
        {
          label: 'D',
          text: 'Both fresco and oil paint have been used by artists for centuries.',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'The goal is to contrast, and choice B sets fresco’s fast drying directly against oil paint’s slow, reworkable drying.',
      wrongAnswerExplanations: {
        A: 'This describes only fresco, so it does not contrast the two.',
        C: 'This describes only oil paint, failing the contrast goal.',
        D: 'This states a similarity ("used for centuries") and adds a detail not in the notes.',
      },
      teachingPoint:
        'A contrast answer must set both subjects side by side on the same feature.',
    },
    {
      id: 'rs-d-004',
      skillSlug: 'rhetorical-synthesis',
      subskill: 'explain a cause',
      difficulty: 'medium',
      stimulus:
        'A student is writing about a lake and has these notes:\n• A fertilizer plant upstream released nutrient-rich runoff into the river.\n• The river feeds directly into Lake Verda.\n• The added nutrients triggered a massive algae bloom across the lake.\n• The bloom blocked sunlight and killed much of the lake’s underwater vegetation.\nThe student wants to explain what caused the loss of underwater vegetation.',
      question:
        'Which choice most effectively uses the notes to accomplish this goal?',
      choices: [
        {
          label: 'A',
          text: 'Lake Verda is fed directly by a river that flows down from the north.',
        },
        {
          label: 'B',
          text: 'Nutrient-rich runoff from an upstream fertilizer plant triggered an algae bloom that blocked sunlight and killed much of the lake’s underwater vegetation.',
        },
        {
          label: 'C',
          text: 'Lake Verda once supported a thriving population of underwater plants.',
        },
        {
          label: 'D',
          text: 'A fertilizer plant operates on the river upstream of the lake.',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'The goal is to explain the cause, and choice B traces the chain from the runoff to the algae bloom to the loss of vegetation.',
      wrongAnswerExplanations: {
        A: 'This describes the river but explains no cause of the plant loss.',
        C: 'This adds a claim about a "thriving population" not stated and explains no cause.',
        D: 'This mentions the plant but never links it to the loss of vegetation.',
      },
      teachingPoint:
        'A cause answer should connect the origin (runoff) to the outcome (dead vegetation).',
    },
    {
      id: 'rs-d-005',
      skillSlug: 'rhetorical-synthesis',
      subskill: 'illustrate',
      difficulty: 'medium',
      stimulus:
        'A student is writing about clever animal behavior and has these notes:\n• Some crows drop nuts onto roads for passing cars to crack.\n• The crows wait at crosswalks and retrieve the nuts when traffic stops.\n• This behavior has been observed in several cities across Japan.\n• Researchers say it shows a sophisticated grasp of cause and effect.\nThe student wants to illustrate the crows’ problem-solving with a specific example.',
      question:
        'Which choice most effectively uses the notes to accomplish this goal?',
      choices: [
        {
          label: 'A',
          text: 'Researchers say the behavior shows a sophisticated grasp of cause and effect.',
        },
        {
          label: 'B',
          text: 'This clever behavior has been observed in several cities across Japan.',
        },
        {
          label: 'C',
          text: 'To crack tough nuts, some crows drop them onto roads and wait at crosswalks to retrieve the pieces once passing cars have run them over.',
        },
        {
          label: 'D',
          text: 'Crows are among the most intelligent birds in the world.',
        },
      ],
      correctAnswer: 'C',
      explanation:
        'The goal is a specific illustrating example, and choice C describes the concrete nut-dropping-and-retrieving behavior.',
      wrongAnswerExplanations: {
        A: 'This states researchers’ conclusion rather than illustrating the behavior.',
        B: 'This notes where the behavior occurs but gives no example of it.',
        D: 'This is a broad claim not in the notes and provides no specific example.',
      },
      teachingPoint:
        'To illustrate with an example, choose the concrete, detailed behavior rather than a general conclusion.',
    },
    {
      id: 'rs-d-006',
      skillSlug: 'rhetorical-synthesis',
      subskill: 'compare',
      difficulty: 'medium',
      stimulus:
        'A student is writing about two energy sources and has these notes:\n• A wind turbine generates electricity only when the wind blows.\n• Wind turbines produce no emissions while operating.\n• A natural-gas plant can generate electricity on demand at any hour.\n• A natural-gas plant releases carbon dioxide while operating.\nThe student wants to compare the two energy sources with respect to reliability and emissions.',
      question:
        'Which choice most effectively uses the notes to accomplish this goal?',
      choices: [
        {
          label: 'A',
          text: 'A wind turbine produces no emissions while it is operating.',
        },
        {
          label: 'B',
          text: 'Whereas a natural-gas plant can generate power on demand but releases carbon dioxide, a wind turbine produces no emissions yet generates power only when the wind blows.',
        },
        {
          label: 'C',
          text: 'A natural-gas plant can generate electricity on demand at any hour of the day.',
        },
        {
          label: 'D',
          text: 'Both wind turbines and natural-gas plants supply electricity to modern power grids.',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'The goal is to compare on reliability and emissions, and choice B contrasts on-demand-but-emitting gas with clean-but-intermittent wind, covering both features.',
      wrongAnswerExplanations: {
        A: 'This describes only the wind turbine’s emissions, missing the comparison.',
        C: 'This describes only the gas plant’s reliability, missing the comparison.',
        D: 'This states a shared function but does not compare reliability or emissions.',
      },
      teachingPoint:
        'When the goal names two features, the answer should compare the sources on both features.',
    },
    {
      id: 'rs-d-007',
      skillSlug: 'rhetorical-synthesis',
      subskill: 'introduce a counterargument',
      difficulty: 'medium',
      stimulus:
        'A student is writing about a proposal to lengthen the school day and has these notes:\n• Supporters say a longer day would allow more time for tutoring and enrichment.\n• A pilot program raised test scores at one participating school.\n• Opponents note that many students already have long commutes home.\n• Some teachers worry that a longer day would leave less time for lesson planning.\nThe student wants to introduce an objection raised by opponents of the proposal.',
      question:
        'Which choice most effectively uses the notes to accomplish this goal?',
      choices: [
        {
          label: 'A',
          text: 'Supporters argue that a longer school day would allow more time for tutoring and enrichment.',
        },
        {
          label: 'B',
          text: 'A pilot program at one participating school raised student test scores.',
        },
        {
          label: 'C',
          text: 'Opponents object that a longer day would burden students who already face long commutes and would leave teachers less time to plan lessons.',
        },
        {
          label: 'D',
          text: 'The proposal to lengthen the school day has been debated by the district for months.',
        },
      ],
      correctAnswer: 'C',
      explanation:
        'The goal is to introduce an opponents’ objection, and choice C voices the concerns about long commutes and reduced planning time.',
      wrongAnswerExplanations: {
        A: 'This states the supporters’ view, not an objection.',
        B: 'This offers evidence for the proposal, the opposite of an objection.',
        D: 'This adds neutral background ("debated for months") without raising an objection.',
      },
      teachingPoint:
        'An objection answer must present the opposing side’s specific concerns from the notes.',
    },
    {
      id: 'rs-d-008',
      skillSlug: 'rhetorical-synthesis',
      subskill: 'emphasize significance',
      difficulty: 'hard',
      stimulus:
        'A student is writing about an archaeological find and has these notes:\n• The clay tablet was unearthed at a site in modern-day Iraq.\n• Its markings record a merchant’s grain transaction.\n• The tablet dates to roughly 3,300 BCE.\n• It is among the earliest known examples of written record-keeping.\nThe student wants to emphasize the historical significance of the tablet.',
      question:
        'Which choice most effectively uses the notes to accomplish this goal?',
      choices: [
        {
          label: 'A',
          text: 'The clay tablet was unearthed at an archaeological site in modern-day Iraq.',
        },
        {
          label: 'B',
          text: 'Dating to roughly 3,300 BCE, the tablet is among the earliest known examples of written record-keeping in human history.',
        },
        {
          label: 'C',
          text: 'The tablet’s markings record a merchant’s transaction involving a quantity of grain.',
        },
        {
          label: 'D',
          text: 'The clay tablet is small enough to be held comfortably in one hand.',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'The goal is to emphasize significance, and choice B highlights the tablet’s great age and its status as one of the earliest written records.',
      wrongAnswerExplanations: {
        A: 'This reports where it was found, not why it matters.',
        C: 'This reports the content of the markings but not their historical importance.',
        D: 'This adds a size detail not in the notes and unrelated to significance.',
      },
      teachingPoint:
        'To emphasize significance, choose the notes that establish why the object is important — here, its age and "earliest known" status.',
    },
    {
      id: 'rs-d-009',
      skillSlug: 'rhetorical-synthesis',
      subskill: 'explain a method',
      difficulty: 'hard',
      stimulus:
        'A student is writing about how researchers track sea turtles and has these notes:\n• Researchers attach a small satellite tag to a turtle’s shell.\n• The tag transmits the turtle’s location each time it surfaces to breathe.\n• Satellites relay these signals to a lab on shore.\n• The data reveal migration routes spanning thousands of kilometers.\nThe student wants to explain how the tracking method works.',
      question:
        'Which choice most effectively uses the notes to accomplish this goal?',
      choices: [
        {
          label: 'A',
          text: 'The data have revealed turtle migration routes spanning thousands of kilometers.',
        },
        {
          label: 'B',
          text: 'Sea turtles are known to migrate across vast stretches of open ocean.',
        },
        {
          label: 'C',
          text: 'A satellite tag fixed to the turtle’s shell transmits its location each time it surfaces, and satellites relay those signals to a lab on shore.',
        },
        {
          label: 'D',
          text: 'Researchers attach a small satellite tag to each turtle’s shell.',
        },
      ],
      correctAnswer: 'C',
      explanation:
        'The goal is to explain how the method works, and choice C describes the full process: the tag transmits at the surface and satellites relay the data to the lab.',
      wrongAnswerExplanations: {
        A: 'This reports a result of the method, not how it works.',
        B: 'This is a general fact about turtles, not an explanation of the tracking method, and it is not in the notes.',
        D: 'This gives only the first step and does not explain how the location data reaches the researchers.',
      },
      teachingPoint:
        'To explain how something works, choose the answer that covers the process, not just one step or the result.',
    },
    {
      id: 'rs-d-010',
      skillSlug: 'rhetorical-synthesis',
      subskill: 'acknowledge a limitation',
      difficulty: 'hard',
      stimulus:
        'A student is writing about a promising new battery and has these notes:\n• The new battery stores twice as much energy as a standard lithium-ion cell.\n• It charges fully in under ten minutes.\n• So far it has been produced only in small laboratory batches.\n• Its manufacturing cost remains far too high for commercial use.\nThe student wants to acknowledge a current limitation of the new battery.',
      question:
        'Which choice most effectively uses the notes to accomplish this goal?',
      choices: [
        {
          label: 'A',
          text: 'The new battery stores twice as much energy as a standard lithium-ion cell.',
        },
        {
          label: 'B',
          text: 'The new battery can be charged to full capacity in under ten minutes.',
        },
        {
          label: 'C',
          text: 'For all its promise, the battery has so far been made only in small laboratory batches at a cost far too high for commercial use.',
        },
        {
          label: 'D',
          text: 'The new battery could one day transform the electric-vehicle industry.',
        },
      ],
      correctAnswer: 'C',
      explanation:
        'The goal is to acknowledge a limitation, and choice C states the battery’s current drawbacks: limited lab-scale production and prohibitive cost.',
      wrongAnswerExplanations: {
        A: 'This touts a strength, not a limitation.',
        B: 'This also highlights a benefit rather than a limitation.',
        D: 'This is a speculative prediction not in the notes and states no limitation.',
      },
      teachingPoint:
        'To acknowledge a limitation, choose the notes that describe a current drawback, not the battery’s strengths.',
    },
  ],
}
