import type { AcademySkill } from '../types'

export const rhetoricalSynthesis: AcademySkill = {
  slug: 'rhetorical-synthesis',
  title: 'Rhetorical Synthesis',
  section: 'writing',
  objective:
    'By the end of this lesson, you will be able to select the sentence that most effectively accomplishes a specified writing goal by accurately using only the information provided in the student\'s notes.',
  estimatedMinutes: 20,
  subskills: [
    'Identifying the Writing Goal',
    'Selecting Relevant Information',
    'Emphasizing Similarities',
    'Emphasizing Differences',
    'Explaining Causes',
    'Presenting Evidence',
    'Introducing Counterarguments',
    'Avoiding Unsupported Claims',
    'Accurate Synthesis',
  ],
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
    {
      title: `Over-reaching beyond the notes`,
      description: `A choice uses the right notes but draws a conclusion or makes a claim that goes further than what the notes actually say — for example, calling something "the best" or "the only" method when the notes say nothing of the kind.`,
      avoidance: `Stick to exactly what the notes assert. If a choice contains any superlative, causal claim, or prediction that the notes do not explicitly support, eliminate it.`,
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
        A: `This restates the supporters' position rather than countering it.`,
        B: `This supports the pro-mall side with a favorable statistic, the opposite of a counterargument.`,
        D: `This adds a neutral detail ("several blocks") and takes no opposing stance.`,
      },
    },
    {
      id: 'rs-ex-4',
      stimulus: `While researching the history of a town square, a student has taken the following notes:\n• The town square was laid out in 1812 as a marketplace for farmers and merchants.\n• For more than a century it hosted weekly produce and livestock fairs.\n• In the 1950s the fairs ended as supermarkets displaced local vendors.\n• A 2019 renovation converted the square into a pedestrian plaza with outdoor seating.\nThe student wants to introduce the square and explain its original purpose.`,
      question: `Which choice most effectively uses the notes to accomplish this goal?`,
      steps: [
        {
          instruction: `Identify the two parts of the goal`,
          content: `The goal has two tasks: INTRODUCE the square and EXPLAIN ITS ORIGINAL PURPOSE. The answer must do both — not just one.`,
        },
        {
          instruction: `Find the relevant notes`,
          content: `The 1812 founding note gives the introduction. The "marketplace for farmers and merchants" phrase explains the original purpose. The later notes about fairs ending and the 2019 renovation are irrelevant to the original purpose.`,
        },
        {
          instruction: `Eliminate single-task choices`,
          content: `A choice that only names the square or only states its purpose fails — both elements must appear.`,
        },
        {
          instruction: `Select the choice that covers both tasks`,
          content: `The answer that identifies the square and states it was established as a marketplace in 1812 accomplishes the full goal.`,
        },
      ],
      choices: [
        { label: 'A', text: `Laid out in 1812, the town square served as a marketplace where local farmers and merchants could buy and sell goods.` },
        { label: 'B', text: `In the 1950s, the weekly produce and livestock fairs that once filled the square came to an end.` },
        { label: 'C', text: `A 2019 renovation transformed the old town square into a modern pedestrian plaza.` },
        { label: 'D', text: `The town square has existed in one form or another for more than two hundred years.` },
      ],
      correctAnswer: 'A',
      explanation: `Choice A introduces the square with its founding date and explains its original purpose as a marketplace, using the most relevant notes to accomplish both parts of the goal.`,
      wrongAnswerExplanations: {
        B: `This focuses on the end of the fairs — a later development — not the original purpose.`,
        C: `This describes the 2019 renovation, which is unrelated to the original purpose.`,
        D: `This gives a vague time span but explains nothing about the square’s original purpose.`,
      },
      coachTakeaway: `When a goal has two parts (introduce + explain), your answer must satisfy both. A choice that handles only one part is a partial answer.`,
    },
    {
      id: 'rs-ex-5',
      stimulus: `While studying ocean acidification, a student has taken the following notes:\n• Oceans absorb roughly 25 percent of the carbon dioxide released by human activity.\n• When CO₂ dissolves in seawater it forms carbonic acid, lowering the water’s pH.\n• Lower pH makes it harder for shellfish and corals to build their calcium-carbonate shells.\n• Oyster farms in the Pacific Northwest reported major larval die-offs linked to acidification.\nThe student wants to explain the process by which carbon emissions harm marine animals.`,
      question: `Which choice most effectively uses the notes to accomplish this goal?`,
      steps: [
        {
          instruction: `Underline the goal verb`,
          content: `The goal is to EXPLAIN A PROCESS — you need a sentence that traces a chain of events, not just states a fact.`,
        },
        {
          instruction: `Map the causal chain`,
          content: `CO₂ emissions → oceans absorb CO₂ → CO₂ forms carbonic acid → pH drops → shells are harder to build. A complete process answer should link at least two or three of these steps.`,
        },
        {
          instruction: `Reject endpoint-only choices`,
          content: `A sentence that only names the die-offs (the final harm) skips the process. A sentence that only mentions CO₂ absorption skips the harm.`,
        },
        {
          instruction: `Select the process chain`,
          content: `The choice that connects dissolved CO₂ → acid → lower pH → damage to shell-building accomplishes the goal.`,
        },
      ],
      choices: [
        { label: 'A', text: `Oyster farms in the Pacific Northwest experienced major larval die-offs caused by ocean acidification.` },
        { label: 'B', text: `Oceans absorb roughly 25 percent of the carbon dioxide humans release each year.` },
        { label: 'C', text: `When the oceans absorb CO₂ it forms carbonic acid, dropping the water’s pH and making it harder for shellfish and corals to build their shells.` },
        { label: 'D', text: `Ocean acidification is one of the most serious environmental challenges facing marine ecosystems today.` },
      ],
      correctAnswer: 'C',
      explanation: `Choice C traces the causal chain from CO₂ absorption to acid formation to lower pH to harm for shell-building animals, fully explaining the process the goal requires.`,
      wrongAnswerExplanations: {
        A: `This states only the end result (die-offs) without explaining the process that leads to it.`,
        B: `This gives only the first step (absorption) and says nothing about how that harms marine animals.`,
        D: `This is a broad editorial claim not grounded in the notes and explains no process.`,
      },
      coachTakeaway: `"Explain the process" means show the chain — cause leads to mechanism leads to effect. One link in the chain is not the full process.`,
    },
    {
      id: 'rs-ex-6',
      stimulus: `While writing about two theories of dinosaur extinction, a student has taken the following notes:\n• The asteroid impact theory holds that a massive collision blocked sunlight and collapsed food chains.\n• Evidence includes a worldwide layer of iridium in rock dated to 66 million years ago.\n• The volcanic activity theory argues that eruptions in what is now India caused prolonged climate cooling.\n• Some researchers contend both events may have acted together.\nThe student wants to present both theories without taking sides.`,
      question: `Which choice most effectively uses the notes to accomplish this goal?`,
      steps: [
        {
          instruction: `Clarify what "without taking sides" requires`,
          content: `The answer must mention BOTH theories and treat them with equal weight — it cannot favor one or call either "more likely."`,
        },
        {
          instruction: `Locate the two theory descriptions`,
          content: `Theory 1: asteroid blocked sunlight, collapsed food chains. Theory 2: Indian volcanism caused climate cooling. Both must appear.`,
        },
        {
          instruction: `Eliminate choices that favor one side`,
          content: `Any choice that provides evidence only for the asteroid theory (iridium layer) or phrases one theory as more credible violates the neutrality requirement.`,
        },
        {
          instruction: `Pick the balanced presentation`,
          content: `The choice that describes both theories side by side, attributing each to "some researchers" or similar neutral phrasing, best accomplishes the goal.`,
        },
      ],
      choices: [
        { label: 'A', text: `Some researchers favor the asteroid impact theory, citing a global iridium layer dated to 66 million years ago as strong evidence.` },
        { label: 'B', text: `Dinosaurs were wiped out 66 million years ago in one of the most catastrophic events in Earth’s history.` },
        { label: 'C', text: `Two competing theories attribute dinosaur extinction to different causes: an asteroid impact that collapsed food chains, or volcanic eruptions in what is now India that caused prolonged climate cooling.` },
        { label: 'D', text: `Most paleontologists now agree that the asteroid impact was the primary cause of the mass extinction event.` },
      ],
      correctAnswer: 'C',
      explanation: `Choice C presents both theories in neutral, parallel terms — impact vs. volcanism — without privileging either, which is exactly what "without taking sides" requires.`,
      wrongAnswerExplanations: {
        A: `This focuses only on the asteroid theory and presents iridium as "strong evidence," implicitly favoring that side.`,
        B: `This states only the outcome (mass extinction) and takes no position at all — but it also fails to present either theory.`,
        D: `This claims "most paleontologists agree" with the asteroid theory, which is both unsupported by the notes and clearly takes sides.`,
      },
      coachTakeaway: `"Without taking sides" means no favoritism and no unsupported confidence claims. The answer should give equal, neutral treatment to both perspectives.`,
    },
    {
      id: 'rs-ex-7',
      stimulus: `While writing about urban heat islands, a student has taken the following notes:\n• Paved surfaces and dark rooftops absorb more solar heat than vegetation does.\n• City centers can be 1–3°C warmer than surrounding rural areas on calm, sunny days.\n• Trees and green roofs reflect sunlight and release moisture through transpiration, cooling the air.\n• Philadelphia’s "Green City, Clean Waters" program has planted thousands of street trees.\nThe student wants to support the claim that planting trees is an effective strategy for reducing urban heat.`,
      question: `Which choice most effectively uses the notes to accomplish this goal?`,
      steps: [
        {
          instruction: `Identify what the claim needs`,
          content: `The claim is that planting trees effectively reduces urban heat. Supporting it requires evidence connecting trees to cooling — not just a city program announcement.`,
        },
        {
          instruction: `Find the supporting mechanism`,
          content: `The note about trees reflecting sunlight and releasing moisture through transpiration directly explains why planting trees reduces heat.`,
        },
        {
          instruction: `Reject choices that mention programs without mechanisms`,
          content: `Naming Philadelphia’s program shows action but not effectiveness — it doesn’t prove trees work.`,
        },
        {
          instruction: `Select the mechanistic support`,
          content: `The choice that explains how trees cool the air (reflection + transpiration) most effectively supports the claim.`,
        },
      ],
      choices: [
        { label: 'A', text: `City centers can be 1–3°C warmer than surrounding rural areas on calm, sunny days.` },
        { label: 'B', text: `Philadelphia’s "Green City, Clean Waters" program has planted thousands of street trees across the city.` },
        { label: 'C', text: `Paved surfaces and dark rooftops absorb more solar heat than vegetation does, making cities hotter.` },
        { label: 'D', text: `Trees help reduce urban heat by reflecting sunlight and releasing moisture through transpiration, which cools the surrounding air.` },
      ],
      correctAnswer: 'D',
      explanation: `Choice D directly explains the mechanism by which trees reduce urban heat — reflection and transpiration — which is exactly the support the claim about tree-planting effectiveness requires.`,
      wrongAnswerExplanations: {
        A: `This establishes that cities are hotter than rural areas but does nothing to support the effectiveness of planting trees.`,
        B: `This shows that a city planted trees but does not explain or demonstrate their cooling effectiveness.`,
        C: `This explains why cities are hot (paving) but does not address how trees help — it is about the problem, not the solution.`,
      },
      coachTakeaway: `To support a claim, you need evidence that directly backs it up. A program name shows intent; a mechanism explanation shows effectiveness.`,
    },
    {
      id: 'rs-ex-8',
      stimulus: `While researching the life of astronomer Cecilia Payne-Gaposchkin, a student has taken the following notes:\n• In 1925 Payne-Gaposchkin’s doctoral thesis proposed that stars are composed mainly of hydrogen and helium.\n• Her thesis adviser, Henry Norris Russell, initially dismissed the finding as impossible.\n• Russell reached the same conclusion four years later and published it — receiving much of the credit.\n• Her work is now considered one of the most important contributions to 20th-century astrophysics.\nThe student wants to highlight the contrast between the initial reception of Payne-Gaposchkin’s discovery and its eventual recognition.`,
      question: `Which choice most effectively uses the notes to accomplish this goal?`,
      steps: [
        {
          instruction: `Define the two sides of the contrast`,
          content: `Side 1 (initial reception): her adviser dismissed the finding as impossible. Side 2 (eventual recognition): the work is now considered one of the most important in 20th-century astrophysics.`,
        },
        {
          instruction: `Check that both sides appear`,
          content: `A contrast answer must include both the dismissal AND the recognition — not just one side.`,
        },
        {
          instruction: `Avoid the middle-ground distractor`,
          content: `The detail about Russell publishing the same result is related, but it describes a credit dispute, not the contrast between dismissal and eventual recognition.`,
        },
        {
          instruction: `Select the full contrast`,
          content: `The choice that places "initially dismissed" against "now considered one of the most important" best highlights the contrast.`,
        },
      ],
      choices: [
        { label: 'A', text: `Henry Norris Russell initially dismissed Payne-Gaposchkin’s thesis, then published the same conclusion four years later and received much of the credit.` },
        { label: 'B', text: `Payne-Gaposchkin’s 1925 thesis, though initially dismissed as impossible by her adviser, is now regarded as one of the most important contributions to 20th-century astrophysics.` },
        { label: 'C', text: `Cecilia Payne-Gaposchkin proposed in her 1925 doctoral thesis that stars are composed mainly of hydrogen and helium.` },
        { label: 'D', text: `Henry Norris Russell reached the same conclusion as Payne-Gaposchkin four years after she published her thesis.` },
      ],
      correctAnswer: 'B',
      explanation: `Choice B contrasts the initial dismissal directly with the current recognition as a landmark contribution, capturing both sides of the contrast the goal requires.`,
      wrongAnswerExplanations: {
        A: `This highlights the credit dispute between Payne-Gaposchkin and Russell but does not contrast initial dismissal with eventual recognition of her work.`,
        C: `This states the discovery but includes neither the dismissal nor the later recognition — it accomplishes neither side of the contrast.`,
        D: `This focuses only on Russell’s later finding and says nothing about the reception or recognition of Payne-Gaposchkin’s own work.`,
      },
      coachTakeaway: `A contrast goal requires BOTH endpoints — the before and the after. One side alone is only half an answer.`,
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
        `To acknowledge a limitation, choose the notes that describe a current drawback, not the battery’s strengths.`,
    },
    {
      id: 'rs-d-011',
      skillSlug: 'rhetorical-synthesis',
      subskill: 'Introducing a Topic',
      level: 'foundation',
      difficulty: 'easy',
      stimulus: `• A student is writing about the monarch butterfly.\n• Monarch butterflies are famous for their annual migration from Canada and the United States to central Mexico.\n• The migration covers up to 4,500 kilometers.\n• Millions of monarchs travel together, creating a spectacular natural event.\n• Their orange-and-black wings are instantly recognizable worldwide.`,
      question: `Which choice most effectively uses relevant information from the notes to introduce the monarch butterfly and its most notable behavior?`,
      choices: [
        { label: 'A', text: `The monarch butterfly is renowned for its annual migration — a journey of up to 4,500 kilometers from North America to central Mexico undertaken by millions of butterflies at once.` },
        { label: 'B', text: `The monarch butterfly’s orange-and-black wings are instantly recognized around the world.` },
        { label: 'C', text: `Millions of monarch butterflies travel together each year, which scientists consider a spectacular natural event.` },
        { label: 'D', text: `Monarch butterflies travel from Canada and the United States each fall.` },
      ],
      correctAnswer: 'A',
      explanation: `The goal is to introduce the monarch butterfly and its most notable behavior. Choice A names the butterfly, identifies its standout behavior (the migration), provides the key detail of distance (4,500 km), and conveys scale (millions), combining the most relevant notes into a single introduction.`,
      wrongAnswerExplanations: {
        B: `This mentions only the wing appearance — a secondary detail — and says nothing about the migration behavior.`,
        C: `This mentions scale but omits distance and the destination, giving an incomplete introduction to the migration.`,
        D: `This is vague (no distance, no destination, no scale) and fails to convey why the migration is notable.`,
      },
      teachingPoint: `An introduction should name the subject and identify its most significant defining characteristic, using the specific details from the notes to make that characteristic concrete.`,
    },
    {
      id: 'rs-d-012',
      skillSlug: 'rhetorical-synthesis',
      subskill: 'Providing an Example',
      level: 'foundation',
      difficulty: 'easy',
      stimulus: `• A student is writing about ways cities conserve water.\n• Some cities offer rebates to homeowners who replace grass lawns with drought-resistant plants.\n• San Antonio, Texas, has provided such rebates since 1993.\n• Residents who participate can reduce outdoor water use by up to 60 percent.\n• The city’s program is considered a national model for urban water conservation.`,
      question: `Which choice most effectively uses relevant information from the notes to provide a specific example of a city water-conservation program?`,
      choices: [
        { label: 'A', text: `Cities around the country have adopted creative strategies to conserve water.` },
        { label: 'B', text: `Replacing grass lawns with drought-resistant plants can reduce a home’s outdoor water use by up to 60 percent.` },
        { label: 'C', text: `Water conservation has become an urgent priority in many parts of the United States.` },
        { label: 'D', text: `San Antonio, Texas, has offered homeowners rebates to replace grass lawns with drought-resistant plants since 1993, reducing participants’ outdoor water use by up to 60 percent.` },
      ],
      correctAnswer: 'D',
      explanation: `Choice D provides a specific, named example — San Antonio’s rebate program — with concrete details: the program’s start date and the measurable water savings, all drawn directly from the notes.`,
      wrongAnswerExplanations: {
        A: `This is a vague generalization that names no city or specific program.`,
        B: `This states a benefit but names no city or program — it is a general fact, not a specific example.`,
        C: `This is broad background context and provides no example at all.`,
      },
      teachingPoint: `A specific example must name the who, what, and key detail. Generic statements about "cities" or "programs" are not specific examples.`,
    },
    {
      id: 'rs-d-013',
      skillSlug: 'rhetorical-synthesis',
      subskill: 'Describing a Process',
      level: 'foundation',
      difficulty: 'easy',
      stimulus: `• A student is writing about how glass is recycled.\n• Used glass containers are collected at curbside or drop-off centers.\n• The glass is sorted by color and crushed into small fragments called cullet.\n• Cullet melts at a lower temperature than raw materials, saving energy.\n• The melted glass is molded into new bottles or jars.`,
      question: `Which choice most effectively uses relevant information from the notes to describe the glass recycling process from collection to finished product?`,
      choices: [
        { label: 'A', text: `Collected glass is sorted by color, crushed into cullet, melted at a lower temperature than raw materials, and molded into new bottles or jars.` },
        { label: 'B', text: `Glass recycling saves energy because cullet melts at a lower temperature than raw materials do.` },
        { label: 'C', text: `Glass containers can be recycled rather than thrown away, which benefits the environment.` },
        { label: 'D', text: `After glass is crushed into cullet, it is melted and molded into new containers.` },
      ],
      correctAnswer: 'A',
      explanation: `Choice A traces the full process — sorting, crushing, lower-temperature melting, and molding into new products — covering all the key steps from collection to finished container.`,
      wrongAnswerExplanations: {
        B: `This highlights only the energy-saving benefit, skipping the sequence of steps that constitute the process.`,
        C: `This is a vague environmental claim that describes no steps in the process.`,
        D: `This covers only the final two steps and omits the initial sorting and why the melting temperature matters.`,
      },
      teachingPoint: `To describe a process from start to finish, the answer must sequence the key steps in order rather than isolating one step or one benefit.`,
    },
    {
      id: 'rs-d-014',
      skillSlug: 'rhetorical-synthesis',
      subskill: 'Emphasizing Differences',
      level: 'sat-application',
      difficulty: 'medium',
      stimulus: `• A student is writing about two volcanic eruption styles.\n• Effusive eruptions release lava that flows slowly downhill, allowing most people time to evacuate.\n• Effusive eruptions rarely produce large explosions and cause relatively few direct casualties.\n• Explosive eruptions eject ash, gas, and rock fragments at enormous speeds with little warning.\n• Explosive eruptions can be deadly within seconds and leave little time for evacuation.`,
      question: `Which choice most effectively uses relevant information from the notes to emphasize the difference in danger level between the two eruption types?`,
      choices: [
        { label: 'A', text: `Volcanoes can erupt either effusively or explosively, depending on the composition of their magma.` },
        { label: 'B', text: `Explosive eruptions eject ash, gas, and rock fragments at great speeds and can be deadly within seconds.` },
        { label: 'C', text: `Whereas effusive eruptions release slow-moving lava that allows time for evacuation, explosive eruptions eject material at enormous speed and can kill within seconds, leaving little time to escape.` },
        { label: 'D', text: `Both effusive and explosive eruptions release material from a volcano’s interior, though by very different mechanisms.` },
      ],
      correctAnswer: 'C',
      explanation: `Choice C directly contrasts the two types on the dimension of danger: effusive eruptions allow evacuation time while explosive ones can be fatal within seconds. It uses both the most relevant notes to draw a sharp, specific contrast.`,
      wrongAnswerExplanations: {
        A: `This introduces a cause of the difference (magma composition) that does not appear in the notes and ignores the danger contrast.`,
        B: `This describes only explosive eruptions and provides no contrast with effusive ones.`,
        D: `This acknowledges different mechanisms but makes no comparison of danger levels.`,
      },
      teachingPoint: `When the goal is to emphasize a difference in a specific quality (here, danger), the answer should directly set the two subjects against each other on that exact quality.`,
    },
    {
      id: 'rs-d-015',
      skillSlug: 'rhetorical-synthesis',
      subskill: 'Supporting a Claim',
      level: 'sat-application',
      difficulty: 'medium',
      stimulus: `• A student is arguing that public libraries provide essential services beyond lending books.\n• Many libraries offer free internet access, which is critical for job seekers without home computers.\n• Libraries host after-school programs that serve hundreds of children in low-income neighborhoods.\n• Some libraries include free legal aid clinics staffed by volunteer attorneys.\n• Library usage has increased in communities that have lost other public gathering spaces.`,
      question: `Which choice most effectively uses relevant information from the notes to support the claim that libraries offer essential services beyond book lending?`,
      choices: [
        { label: 'A', text: `Libraries have been central to community life for more than a century in the United States.` },
        { label: 'B', text: `Public library budgets have been under pressure from municipal governments in recent years.` },
        { label: 'C', text: `Libraries often serve as quiet spaces where community members can read and study.` },
        { label: 'D', text: `Public libraries provide free internet access for job seekers, after-school programs for children in low-income areas, and legal aid clinics staffed by volunteer attorneys.` },
      ],
      correctAnswer: 'D',
      explanation: `Choice D lists three specific services — internet access, after-school programs, and legal aid — all directly from the notes and all clearly beyond book lending, making it the strongest support for the stated claim.`,
      wrongAnswerExplanations: {
        A: `This is general historical background that does not identify any specific non-book service.`,
        B: `This raises a budget concern that does not appear in the notes and does not support the claim about services.`,
        C: `This describes a function (quiet study space) related to traditional library use, not a service beyond book lending.`,
      },
      teachingPoint: `To support a specific claim, select the notes that most directly demonstrate it. Multiple concrete examples from the notes are stronger than a vague generalization.`,
    },
    {
      id: 'rs-d-016',
      skillSlug: 'rhetorical-synthesis',
      subskill: 'Explaining Significance',
      level: 'sat-application',
      difficulty: 'medium',
      stimulus: `• A student is writing about the invention of the printing press.\n• Johannes Gutenberg developed the movable-type printing press around 1440 in Germany.\n• Before the press, books had to be copied by hand, a process that took months per volume.\n• The press allowed books to be produced in days and at a fraction of the former cost.\n• Within fifty years of its invention, more than eight million books had been printed across Europe.`,
      question: `Which choice most effectively uses relevant information from the notes to explain the historical significance of the printing press?`,
      choices: [
        { label: 'A', text: `By reducing book production from months of hand-copying to days of printing at a fraction of the cost, Gutenberg’s press made books widely accessible, with more than eight million printed in Europe within fifty years.` },
        { label: 'B', text: `Johannes Gutenberg developed a movable-type printing press around 1440 in Mainz, Germany.` },
        { label: 'C', text: `Before the printing press, scribes copied books by hand, a labor-intensive process that could take months per volume.` },
        { label: 'D', text: `The printing press is often cited as one of the most transformative inventions in Western history.` },
      ],
      correctAnswer: 'A',
      explanation: `Choice A explains significance by connecting the press’s capabilities (speed and cost reduction) to a concrete outcome (eight million books printed), showing why the invention mattered.`,
      wrongAnswerExplanations: {
        B: `This gives inventor and date — introductory facts — but says nothing about why the press was historically significant.`,
        C: `This describes the pre-press situation but does not connect it to the press’s impact or significance.`,
        D: `This asserts significance but provides no evidence from the notes to explain or demonstrate it.`,
      },
      teachingPoint: `Explaining significance requires connecting cause to effect: what the invention did and what that change produced in the world.`,
    },
    {
      id: 'rs-d-017',
      skillSlug: 'rhetorical-synthesis',
      subskill: 'Introducing a Counterargument',
      level: 'sat-application',
      difficulty: 'medium',
      stimulus: `• A student is writing about a proposal to ban single-use plastic bags at grocery stores.\n• Supporters say the ban would significantly reduce plastic waste in landfills and waterways.\n• A similar ban in California reduced plastic bag litter by 72 percent within two years.\n• Critics argue that reusable bags must be used at least 50 times to offset their higher environmental production cost.\n• Some shoppers, particularly the elderly or those with disabilities, find reusable bags difficult to manage.`,
      question: `Which choice most effectively uses relevant information from the notes to introduce an objection raised by critics of the proposed ban?`,
      choices: [
        { label: 'A', text: `Supporters point to California, where a similar ban cut plastic bag litter by 72 percent in just two years.` },
        { label: 'B', text: `Single-use plastic bags contribute substantially to plastic pollution in landfills and waterways.` },
        { label: 'C', text: `Plastic bag bans have been enacted in dozens of cities and states across the United States.` },
        { label: 'D', text: `Critics counter that reusable bags carry a high production cost and must be used at least 50 times to break even environmentally, while also posing practical difficulties for some shoppers.` },
      ],
      correctAnswer: 'D',
      explanation: `Choice D voices the critics’ specific objections — the high break-even use count for reusable bags and the practical difficulties for certain shoppers — both drawn directly from the notes.`,
      wrongAnswerExplanations: {
        A: `This presents evidence in favor of the ban, which is the opposite of a critic’s objection.`,
        B: `This states the problem the ban is meant to solve, which supports rather than objects to the ban.`,
        C: `This is neutral background information that raises no objection.`,
      },
      teachingPoint: `An objection must come from the critics’ side and use the critics’ specific arguments from the notes — not supportive data or neutral background.`,
    },
    {
      id: 'rs-d-018',
      skillSlug: 'rhetorical-synthesis',
      subskill: 'Acknowledging a Limitation',
      level: 'advanced',
      difficulty: 'hard',
      stimulus: `• A student is writing about a new AI diagnostic tool for detecting early-stage cancer.\n• In clinical trials the tool correctly identified cancerous tissue in 94 percent of cases.\n• The tool performed significantly better on patients of Northern European descent than on other populations.\n• The training data used to build the tool included fewer images from patients with darker skin tones.\n• Researchers say expanding the training data set should improve accuracy across all groups.`,
      question: `Which choice most effectively uses relevant information from the notes to acknowledge a significant limitation of the AI diagnostic tool?`,
      choices: [
        { label: 'A', text: `The AI diagnostic tool identified cancerous tissue correctly in 94 percent of clinical trial cases.` },
        { label: 'B', text: `Researchers believe that expanding the training data set will eventually improve the tool’s performance across all patient groups.` },
        { label: 'C', text: `Despite its high overall accuracy, the tool performs significantly better on patients of Northern European descent, a disparity researchers link to underrepresentation of darker skin tones in the training data.` },
        { label: 'D', text: `The AI tool was trained on a large set of clinical images gathered from hospitals across multiple countries.` },
      ],
      correctAnswer: 'C',
      explanation: `Choice C acknowledges the key limitation — unequal performance across patient groups — and explains its root cause (training data underrepresentation), using the most relevant notes accurately.`,
      wrongAnswerExplanations: {
        A: `This highlights a strength (94% accuracy) rather than a limitation.`,
        B: `This describes a future solution, not a current limitation. Acknowledging a limitation means stating what is wrong now, not what might be fixed later.`,
        D: `This adds a detail about data sources that is not in the notes and does not identify any limitation.`,
      },
      teachingPoint: `Acknowledging a limitation means naming the current shortcoming and its cause or consequence — not the strength, and not the planned fix.`,
    },
    {
      id: 'rs-d-019',
      skillSlug: 'rhetorical-synthesis',
      subskill: 'Emphasizing Similarities',
      level: 'advanced',
      difficulty: 'hard',
      stimulus: `• A student is writing about two ancient writing systems: cuneiform and hieroglyphics.\n• Both cuneiform (Mesopotamia) and hieroglyphics (Egypt) emerged around 3200–3100 BCE.\n• Both were initially used to record economic transactions such as grain inventories and tax records.\n• Both systems eventually expanded to record religious texts, literature, and historical events.\n• Cuneiform used wedge-shaped marks on clay tablets; hieroglyphics used pictorial symbols on stone or papyrus.`,
      question: `Which choice most effectively uses relevant information from the notes to emphasize similarities between the two writing systems?`,
      choices: [
        { label: 'A', text: `Both cuneiform and hieroglyphics emerged around 3200–3100 BCE and were initially developed to record economic transactions before later expanding to religious and literary texts.` },
        { label: 'B', text: `Cuneiform used wedge-shaped marks pressed into clay tablets, while hieroglyphics used pictorial symbols carved into stone or painted on papyrus.` },
        { label: 'C', text: `Hieroglyphics were used in ancient Egypt to record a wide range of texts, from tax records to religious literature.` },
        { label: 'D', text: `The two ancient writing systems developed independently in different parts of the world.` },
      ],
      correctAnswer: 'A',
      explanation: `Choice A explicitly highlights shared features — near-simultaneous emergence and a common early purpose in economic record-keeping that later expanded — using both the timing and the purpose notes to draw parallel comparisons.`,
      wrongAnswerExplanations: {
        B: `This contrasts the two systems (different materials and symbols), which is the opposite of emphasizing similarities.`,
        C: `This describes only hieroglyphics and makes no comparison with cuneiform.`,
        D: `This notes independent development, which emphasizes difference of origin rather than similarity.`,
      },
      teachingPoint: `To emphasize similarities, identify the notes where both subjects share a feature and frame them in parallel — "both X and Y did/had/were…"`,
    },
    {
      id: 'rs-d-020',
      skillSlug: 'rhetorical-synthesis',
      subskill: 'Explaining a Cause',
      level: 'advanced',
      difficulty: 'medium',
      stimulus: `• A student is writing about the decline of coral reefs.\n• Rising ocean temperatures cause corals to expel the symbiotic algae living in their tissues.\n• Without these algae, the coral loses its color and primary food source — a process called bleaching.\n• Prolonged bleaching lasting more than eight weeks usually leads to coral death.\n• Scientists have recorded mass bleaching events on the Great Barrier Reef in 2016, 2017, and 2020.`,
      question: `Which choice most effectively uses relevant information from the notes to explain why coral reefs die during bleaching events?`,
      choices: [
        { label: 'A', text: `Mass bleaching events struck the Great Barrier Reef in 2016, 2017, and 2020.` },
        { label: 'B', text: `Coral bleaching is one of the most serious threats facing marine ecosystems worldwide.` },
        { label: 'C', text: `Corals bleach when they expel their symbiotic algae in response to warmer water; without these algae, the coral loses its food source and, if bleached for more than eight weeks, typically dies.` },
        { label: 'D', text: `Rising ocean temperatures are caused by climate change driven by human greenhouse-gas emissions.` },
      ],
      correctAnswer: 'C',
      explanation: `Choice C explains the causal chain from expulsion of algae to loss of food source to death after prolonged bleaching, answering why coral dies during these events using the relevant notes.`,
      wrongAnswerExplanations: {
        A: `This states when bleaching events occurred but explains none of the mechanism behind coral death.`,
        B: `This is a broad editorial claim not grounded in the notes and explains no cause.`,
        D: `This attributes rising temperatures to climate change, a claim not in the notes, and explains nothing about why corals die.`,
      },
      teachingPoint: `Explaining a cause requires tracing the mechanism — what triggers what — not just naming the event or its frequency.`,
    },
    {
      id: 'rs-d-021',
      skillSlug: 'rhetorical-synthesis',
      subskill: 'Comparing Two Subjects',
      level: 'advanced',
      difficulty: 'hard',
      stimulus: `• A student is comparing two approaches to building affordable housing: modular construction and traditional stick-frame construction.\n• Modular homes are built in factory sections and assembled on-site, typically in four to six weeks.\n• Stick-frame homes are built entirely on-site and take an average of seven to twelve months to complete.\n• Modular construction costs roughly 10–20% less than comparable stick-frame construction.\n• Stick-frame construction allows greater on-site customization than modular methods.`,
      question: `Which choice most effectively uses relevant information from the notes to compare the two methods with respect to speed and cost?`,
      choices: [
        { label: 'A', text: `Stick-frame construction allows greater on-site customization, making it the preferred choice for buyers who want a unique home design.` },
        { label: 'B', text: `Both modular and stick-frame construction methods are widely used to build affordable homes across the United States.` },
        { label: 'C', text: `Modular construction is both faster — taking four to six weeks versus seven to twelve months for stick-frame — and less expensive, costing 10–20% less than comparable stick-frame builds.` },
        { label: 'D', text: `Modular homes are assembled from factory-built sections, while stick-frame homes are constructed entirely on-site.` },
      ],
      correctAnswer: 'C',
      explanation: `Choice C directly compares both methods on the two specified dimensions — speed (weeks vs. months) and cost (10–20% savings) — using the exact figures from the notes.`,
      wrongAnswerExplanations: {
        A: `This addresses customization, not speed or cost, and adds an unsupported preference claim.`,
        B: `This states a similarity (both are widely used) but makes no comparison on speed or cost.`,
        D: `This contrasts the construction location (factory vs. on-site) but says nothing about speed or cost.`,
      },
      teachingPoint: `When a goal names specific dimensions for comparison (speed and cost), the correct answer must address both named dimensions, not a different attribute.`,
    },
    {
      id: 'rs-d-022',
      skillSlug: 'rhetorical-synthesis',
      subskill: 'Synthesizing Evidence for a Claim',
      level: 'challenge',
      difficulty: 'hard',
      stimulus: `• A student is arguing that remote work policies improve employee retention.\n• A 2023 survey of 4,000 workers found that 68 percent would look for a new job if their employer eliminated remote work options.\n• Companies with permanent remote-work options reported 25 percent lower annual turnover than those requiring full-time in-office attendance.\n• Employees cite flexibility and reduced commuting costs as the top two reasons remote work increases job satisfaction.\n• A tech firm that adopted a full-time remote policy in 2021 saw its voluntary attrition rate fall from 18 percent to 9 percent within one year.`,
      question: `Which choice most effectively uses relevant information from the notes to support the claim that remote work policies improve employee retention with the most concrete evidence?`,
      choices: [
        { label: 'A', text: `A tech firm that adopted full-time remote work in 2021 saw voluntary attrition drop from 18 percent to 9 percent in one year, and companies with permanent remote options report 25 percent lower annual turnover overall.` },
        { label: 'B', text: `Employees cite flexibility and lower commuting costs as the main reasons they value remote work arrangements.` },
        { label: 'C', text: `Remote work has become a central issue in workplace policy debates over the past several years.` },
        { label: 'D', text: `Most workers today expect some form of remote work option from their employers.` },
      ],
      correctAnswer: 'A',
      explanation: `Choice A combines the two strongest pieces of quantitative evidence — the tech firm’s halved attrition rate and the 25 percent lower turnover across remote-option companies — giving the most concrete and direct support for the retention claim.`,
      wrongAnswerExplanations: {
        B: `This explains why employees like remote work (satisfaction reasons) rather than demonstrating improved retention with data.`,
        C: `This is neutral background context that provides no evidence for or against the retention claim.`,
        D: `This describes worker expectations, which is unsupported by the notes and does not demonstrate improved retention.`,
      },
      teachingPoint: `At the challenge level, two or more pieces of data can often be synthesized into a single, more persuasive supporting sentence. Look for the combination of notes that provides the strongest quantitative case.`,
    },
    {
      id: 'rs-d-023',
      skillSlug: 'rhetorical-synthesis',
      subskill: 'Presenting Nuanced Contrast',
      level: 'challenge',
      difficulty: 'hard',
      stimulus: `• A student is writing about two approaches to treating Type 2 diabetes: lifestyle intervention and medication.\n• Intensive lifestyle changes (diet and exercise) can reduce the risk of diabetes progression by 58 percent.\n• Metformin, a common diabetes medication, reduces the same risk by 31 percent.\n• Lifestyle interventions require sustained effort and are difficult to maintain long-term for many patients.\n• Metformin is a once-daily pill with a well-established safety record and requires minimal patient effort.`,
      question: `Which choice most effectively uses relevant information from the notes to contrast the effectiveness of the two approaches while acknowledging a practical trade-off?`,
      choices: [
        { label: 'A', text: `Lifestyle intervention reduces diabetes progression risk by 58 percent, nearly twice the 31 percent reduction achieved by metformin.` },
        { label: 'B', text: `Both lifestyle intervention and metformin have been shown to reduce the risk of Type 2 diabetes progression in clinical studies.` },
        { label: 'C', text: `Although lifestyle intervention reduces diabetes progression risk by nearly twice the rate of metformin (58 vs. 31 percent), its benefits depend on long-term behavior change that many patients find difficult to sustain, whereas metformin achieves its more modest reduction with a single daily pill.` },
        { label: 'D', text: `Metformin is a widely prescribed medication for Type 2 diabetes with a proven safety profile and convenient once-daily dosing.` },
      ],
      correctAnswer: 'C',
      explanation: `Choice C contrasts the effectiveness figures (58 vs. 31 percent) while simultaneously acknowledging the practical trade-off — lifestyle changes are more effective but harder to maintain, whereas metformin is easier but less effective — producing the nuanced contrast the goal requires.`,
      wrongAnswerExplanations: {
        A: `This compares the numbers effectively but ignores the practical trade-off (adherence vs. convenience) that the goal explicitly asks for.`,
        B: `This states a shared characteristic (both reduce risk) — a similarity, not a contrast.`,
        D: `This describes only metformin’s convenience and safety and makes no comparison with lifestyle intervention.`,
      },
      teachingPoint: `A nuanced contrast goes beyond "X is better than Y" — it acknowledges the reason the less-effective option still has value, showing awareness of real-world trade-offs.`,
    },
    {
      id: 'rs-d-024',
      skillSlug: 'rhetorical-synthesis',
      subskill: 'Acknowledging Complexity',
      level: 'challenge',
      difficulty: 'hard',
      stimulus: `• A student is writing about the relationship between social media use and adolescent mental health.\n• A 2022 meta-analysis of 97 studies found a small but statistically significant negative correlation between heavy social media use and adolescent well-being.\n• The same meta-analysis found that passive scrolling was more harmful than active engagement (commenting, posting) with others.\n• Some researchers argue the effect is too small to be practically meaningful at the population level.\n• Others note that even a small average effect could translate to significant harm for the most vulnerable users.`,
      question: `Which choice most effectively uses relevant information from the notes to present the debate about social media’s impact on adolescent mental health in a way that acknowledges the complexity of the evidence?`,
      choices: [
        { label: 'A', text: `Social media has been definitively shown to harm the mental health of adolescents, particularly those who spend large amounts of time passively scrolling.` },
        { label: 'B', text: `A 2022 meta-analysis found that passive social media scrolling is more harmful to adolescent well-being than active engagement such as commenting or posting.` },
        { label: 'C', text: `Heavy social media use is the leading cause of declining mental health among teenagers in the United States.` },
        { label: 'D', text: `Research shows a small but significant negative link between heavy social media use and adolescent well-being, though some researchers consider the effect too minor to be meaningful at a population level while others warn it could substantially harm the most vulnerable users.` },
      ],
      correctAnswer: 'D',
      explanation: `Choice D presents the evidence accurately (small but significant correlation), then voices both sides of the ongoing interpretive debate — those who dismiss the effect size and those who warn about vulnerable subgroups — capturing the complexity without overstating or understating the findings.`,
      wrongAnswerExplanations: {
        A: `This overstates the evidence ("definitively shown") and ignores the debate about effect size — the notes do not support a definitive claim.`,
        B: `This accurately states one finding (passive vs. active) but does not address the broader debate about significance and complexity.`,
        C: `This makes an unsupported causal and ranking claim ("leading cause") that goes far beyond what the notes say.`,
      },
      teachingPoint: `Acknowledging complexity means neither overstating nor understating — present the evidence accurately, then show that reasonable people interpret it differently. Avoid language that resolves a debate the notes show is still open.`,
    },
  ],
  masteryQuestions: [
    {
      id: 'rs-m-001',
      skillSlug: 'rhetorical-synthesis',
      subskill: 'Introducing a Topic',
      difficulty: 'medium',
      level: 'sat-application',
      stimulus:
        'A student is writing a report about ocean acidification. The student has found the following notes:\n• Ocean acidification occurs when seawater absorbs carbon dioxide from the atmosphere.\n• Since the Industrial Revolution, ocean pH has dropped from 8.2 to 8.1.\n• A pH drop of 0.1 represents a 26% increase in acidity because pH is measured on a logarithmic scale.\n• Many shellfish and coral species struggle to build shells and skeletons in more acidic water.\n• Ocean acidification is sometimes called "the other CO2 problem."',
      question:
        'The student wants to introduce the topic of ocean acidification to readers unfamiliar with it. Which choice most effectively uses relevant information from the notes to accomplish this goal?',
      choices: [
        {
          label: 'A',
          text: 'Ocean acidification, sometimes called "the other CO2 problem," occurs when seawater absorbs atmospheric carbon dioxide, causing pH to fall and threatening marine organisms that depend on calcium carbonate structures.',
        },
        {
          label: 'B',
          text: 'Since the Industrial Revolution, ocean pH has dropped from 8.2 to 8.1.',
        },
        {
          label: 'C',
          text: 'A pH drop of 0.1 represents a 26% increase in acidity.',
        },
        {
          label: 'D',
          text: 'Many shellfish and coral species struggle to build shells and skeletons in more acidic water.',
        },
      ],
      correctAnswer: 'A',
      explanation:
        'Choice A introduces the topic by defining what ocean acidification is, noting its cause, and briefly indicating its significance to marine life — a complete introduction for an uninformed reader. Choices B, C, and D each use only one note and present a specific data point without first establishing what ocean acidification is or why it matters.',
      wrongAnswerExplanations: {
        B: 'This gives a historical data point but does not define ocean acidification or explain why the pH change is significant.',
        C: 'This explains the logarithmic nature of pH but assumes the reader already knows what ocean acidification is and what the numbers mean.',
        D: 'This describes an ecological impact but provides no context about what causes it or what ocean acidification actually is.',
      },
      teachingPoint:
        'An introduction must orient the uninformed reader: what the topic is, what causes it, and why it matters. A single data point without context fails to introduce — it assumes knowledge the reader does not yet have.',
    },
    {
      id: 'rs-m-002',
      skillSlug: 'rhetorical-synthesis',
      subskill: 'Emphasizing Similarities',
      difficulty: 'medium',
      level: 'sat-application',
      stimulus:
        'A student is writing a comparative essay about two Renaissance painters. The student has gathered the following notes:\n• Leonardo da Vinci was trained in Florence under the painter Verrocchio.\n• Michelangelo was also trained in Florence, under the painter Ghirlandaio before studying under Lorenzo de\' Medici.\n• Both painters were commissioned to decorate spaces associated with major Catholic institutions.\n• Leonardo painted The Last Supper for the refectory of Santa Maria delle Grazie in Milan.\n• Michelangelo painted the Sistine Chapel ceiling for Pope Julius II.',
      question:
        'The student wants to emphasize the similarities between Leonardo and Michelangelo\'s training and career contexts. Which choice most effectively accomplishes this goal?',
      choices: [
        {
          label: 'A',
          text: 'Leonardo trained under Verrocchio while Michelangelo trained under Ghirlandaio and Lorenzo de\' Medici — two very different mentorship experiences.',
        },
        {
          label: 'B',
          text: 'Both Leonardo da Vinci and Michelangelo trained in Florence and received commissions from major Catholic institutions, suggesting that Florentine training and church patronage shaped the careers of the period\'s most celebrated painters.',
        },
        {
          label: 'C',
          text: 'Michelangelo painted the Sistine Chapel ceiling, one of the most famous artworks in the world.',
        },
        {
          label: 'D',
          text: 'Leonardo\'s most celebrated mural depicts the final meal of Jesus Christ.',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'Choice B draws on two shared characteristics from the notes — Florentine training and Catholic institutional patronage — and frames them as similarities that illuminate the careers of both painters. Choice A emphasizes differences in their training. Choices C and D address only one painter each.',
      wrongAnswerExplanations: {
        A: 'This highlights a difference (different mentors) rather than a similarity, which contradicts the goal of emphasizing what the two painters had in common.',
        C: 'This addresses only Michelangelo and a specific fact about one work, not a shared characteristic of both painters.',
        D: 'This addresses only Leonardo and one specific work, not a point of comparison with Michelangelo.',
      },
      teachingPoint:
        'To emphasize similarities, choose the answer that names shared characteristics from both subjects\' notes and frames them as parallel. Eliminate answers that address only one subject or that emphasize differences.',
    },
    {
      id: 'rs-m-003',
      skillSlug: 'rhetorical-synthesis',
      subskill: 'Presenting Evidence',
      difficulty: 'medium',
      level: 'sat-application',
      stimulus:
        'A student is writing a persuasive essay arguing that urban heat islands disproportionately affect low-income neighborhoods. The student has compiled the following notes:\n• Urban heat islands occur when pavement and buildings absorb and re-emit solar heat, raising urban temperatures.\n• A 2021 study found that low-income urban census tracts have, on average, 5.1°C higher surface temperatures than high-income tracts in the same city.\n• Higher temperatures increase energy costs, since residents must run air conditioning longer.\n• Heat-related illness hospitalizations are 3.5 times higher in the hottest urban census tracts than in the coolest.\n• Green space — trees and parks — reduces the urban heat island effect.',
      question:
        'The student wants to support the claim that heat islands harm low-income residents more than wealthy ones. Which choice most effectively presents evidence to accomplish this goal?',
      choices: [
        {
          label: 'A',
          text: 'Urban heat islands occur when pavement and buildings absorb and re-emit solar heat.',
        },
        {
          label: 'B',
          text: 'Green space, such as trees and parks, can reduce the heat island effect, and low-income neighborhoods tend to have less green space than high-income ones.',
        },
        {
          label: 'C',
          text: 'A 2021 study found that low-income urban census tracts are on average 5.1°C hotter than high-income tracts, and heat-related hospitalizations are 3.5 times higher in the hottest urban areas than in the coolest.',
        },
        {
          label: 'D',
          text: 'Higher temperatures increase energy costs because residents must run air conditioning for longer periods.',
        },
      ],
      correctAnswer: 'C',
      explanation:
        'Choice C presents two data points from the notes that directly support the claim: the temperature disparity between income groups and the health disparity between hot and cool urban areas. Together they establish both that low-income neighborhoods are hotter and that hotter neighborhoods have worse health outcomes — evidence that directly supports the claim of disproportionate harm.',
      wrongAnswerExplanations: {
        A: 'This defines what a heat island is but provides no evidence that it affects low-income areas more.',
        B: 'This suggests a plausible mechanism but invents a claim not in the notes (that low-income neighborhoods have less green space) and does not cite the data points that directly prove disproportionate harm.',
        D: 'This describes a consequence of heat but does not connect it to income disparities.',
      },
      teachingPoint:
        'For an evidence question, identify which notes provide data that directly proves the claim. Two aligned data points (temperature disparity plus health disparity) are more persuasive than a single mechanism note or a general definition.',
    },
    {
      id: 'rs-m-004',
      skillSlug: 'rhetorical-synthesis',
      subskill: 'Acknowledging a Limitation',
      difficulty: 'hard',
      level: 'advanced',
      stimulus:
        'A student is writing an essay about the potential of vertical farming to address food security. The student has compiled the following notes:\n• Vertical farms grow crops in stacked indoor layers using artificial lighting and controlled environments.\n• Vertical farms can produce crops year-round regardless of weather or season.\n• A vertical farm uses roughly ninety-five percent less water than conventional field agriculture.\n• Current vertical farms are economically viable only for high-value crops such as leafy greens and herbs.\n• The energy costs of artificial lighting make vertical farming too expensive to produce calorie-dense staple crops like wheat or rice at competitive prices.',
      question:
        'The student wants to acknowledge a significant limitation of vertical farming that qualifies its potential for solving food security. Which choice most effectively accomplishes this goal?',
      choices: [
        {
          label: 'A',
          text: 'Vertical farming produces crops year-round and uses ninety-five percent less water than conventional agriculture.',
        },
        {
          label: 'B',
          text: 'Although vertical farms use significantly less water than conventional agriculture, they rely on artificial lighting rather than sunlight.',
        },
        {
          label: 'C',
          text: 'Because vertical farming\'s energy costs make it economically viable only for high-value crops like leafy greens — not for calorie-dense staples like wheat or rice — its potential to address the caloric dimensions of food insecurity is currently limited.',
        },
        {
          label: 'D',
          text: 'Vertical farming is an innovative approach to growing food in urban environments.',
        },
      ],
      correctAnswer: 'C',
      explanation:
        'Choice C uses the two limitation notes directly: the energy cost problem and the restriction to high-value crops. Crucially, it explains why this matters for food security — the calorie-dense staples that are central to addressing hunger cannot yet be produced competitively. This is the most precise acknowledgment of a meaningful limitation.',
      wrongAnswerExplanations: {
        A: 'This states benefits, not limitations — the opposite of what the goal requires.',
        B: 'This mentions artificial lighting but frames it as a mere observation rather than a specific limitation. It does not explain why energy costs matter for food security.',
        D: 'This is a vague general description that neither praises nor limits — it does not accomplish the specific goal.',
      },
      teachingPoint:
        'To acknowledge a limitation effectively, use the note that describes the specific weakness most directly relevant to the central claim. A limitation is most powerful when it shows why the topic falls short of a specific goal (here: caloric food security).',
    },
    {
      id: 'rs-m-005',
      skillSlug: 'rhetorical-synthesis',
      subskill: 'Emphasizing Differences',
      difficulty: 'hard',
      level: 'advanced',
      stimulus:
        'A student is writing a report comparing two historical approaches to treating infectious disease before germ theory was established. The student has found the following notes:\n• Miasma theory held that disease was caused by "bad air" from rotting organic matter.\n• Contagion theory held that disease spread from person to person through direct or indirect contact.\n• Miasma theorists advocated for sanitation reforms: removing waste and improving ventilation.\n• Contagion theorists advocated for quarantine: isolating sick individuals and restricting movement.\n• Both theories predated germ theory and lacked a correct understanding of microbes.\n• In practice, sanitation reforms derived from miasma theory did reduce disease transmission, though for reasons miasma theorists did not understand.',
      question:
        'The student wants to emphasize the key difference between what miasma theory and contagion theory recommended as public health interventions. Which choice most effectively accomplishes this goal?',
      choices: [
        {
          label: 'A',
          text: 'Both miasma theory and contagion theory predated germ theory and lacked a correct understanding of microbes.',
        },
        {
          label: 'B',
          text: 'While miasma theorists prescribed sanitation reforms such as waste removal and ventilation improvements, contagion theorists instead called for quarantine and movement restrictions.',
        },
        {
          label: 'C',
          text: 'In practice, sanitation reforms derived from miasma theory did reduce disease, though for reasons miasma theorists did not understand.',
        },
        {
          label: 'D',
          text: 'Miasma theory held that disease was caused by bad air, while contagion theory attributed disease to person-to-person contact.',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'Choice B contrasts the two theories\' recommended interventions specifically: miasma theory led to sanitation reforms, and contagion theory led to quarantine. The goal is to show the difference in what each theory recommended as public health practice — and B addresses exactly that.',
      wrongAnswerExplanations: {
        A: 'This describes a similarity (both lacked germ theory), which contradicts the goal of emphasizing differences.',
        C: 'This addresses the practical outcome of one theory\'s recommendations, not the contrast between the two theories\' recommendations.',
        D: 'This contrasts the theories\' causal explanations (bad air vs. person-to-person contact), not their recommended interventions — which is what the goal asks for.',
      },
      teachingPoint:
        'Read the goal precisely. "What each theory recommended" means interventions, not causes. Use the notes about sanitation vs. quarantine, not the notes about bad air vs. direct contact — even though D sounds tempting.',
    },
    {
      id: 'rs-m-006',
      skillSlug: 'rhetorical-synthesis',
      subskill: 'Explaining Causes',
      difficulty: 'medium',
      level: 'sat-application',
      stimulus:
        'A student is writing an essay about the decline of coral reefs. The student has compiled the following notes:\n• Coral reefs cover less than 1% of the ocean floor but support about 25% of all marine species.\n• Ocean warming causes coral bleaching, in which corals expel their symbiotic algae and turn white.\n• Without symbiotic algae, corals cannot photosynthesize and will die if warming persists.\n• Ocean acidification weakens the calcium carbonate skeletons of corals, making reefs structurally fragile.\n• Local stressors such as runoff pollution and overfishing further reduce reef resilience.',
      question:
        'The student wants to explain the two primary climate-related causes of coral reef decline. Which choice most effectively accomplishes this goal?',
      choices: [
        {
          label: 'A',
          text: 'Coral reefs support about 25% of all marine species despite covering less than 1% of the ocean floor.',
        },
        {
          label: 'B',
          text: 'Local stressors such as runoff pollution and overfishing further reduce the resilience of already-stressed reef systems.',
        },
        {
          label: 'C',
          text: 'Ocean warming triggers coral bleaching by causing corals to expel their symbiotic algae, while ocean acidification weakens reefs\' calcium carbonate skeletons — two climate-driven processes that together threaten reef survival.',
        },
        {
          label: 'D',
          text: 'Coral bleaching occurs when warming water causes corals to expel their symbiotic algae, leaving them unable to photosynthesize.',
        },
      ],
      correctAnswer: 'C',
      explanation:
        'The goal is to explain two primary climate-related causes. Choice C covers both: ocean warming and bleaching (cause 1) and ocean acidification and skeletal weakening (cause 2), framing both as climate-driven threats. No other choice covers both.',
      wrongAnswerExplanations: {
        A: 'This introduces the ecological importance of reefs but does not explain any cause of their decline.',
        B: 'This describes local stressors, which the notes identify as additional (not primary) causes, and they are not climate-related.',
        D: 'This explains only the bleaching mechanism (cause 1) without covering ocean acidification (cause 2).',
      },
      teachingPoint:
        'When the goal specifies "two causes," scan the notes for exactly two relevant mechanisms and select the choice that covers both. A choice addressing only one cause misses half the goal.',
    },
    {
      id: 'rs-m-007',
      skillSlug: 'rhetorical-synthesis',
      subskill: 'Introducing a Counterargument',
      difficulty: 'hard',
      level: 'advanced',
      stimulus:
        'A student is writing an essay arguing that remote work benefits workers. The student has gathered these notes:\n• Remote workers report higher job satisfaction and better work-life balance on average.\n• Remote workers save time and money by eliminating commutes.\n• Some studies find remote workers are more productive than in-office counterparts.\n• Some remote workers report feelings of isolation and difficulty separating work from personal life.\n• Junior employees may develop professional skills more slowly without in-person mentorship.',
      question:
        'The student wants to introduce a counterargument to the essay\'s pro-remote-work position. Which choice most effectively accomplishes this goal?',
      choices: [
        {
          label: 'A',
          text: 'Remote workers report higher job satisfaction and better work-life balance on average.',
        },
        {
          label: 'B',
          text: 'Although remote work offers real benefits, critics note that it can produce isolation and may slow professional development for junior employees who lack in-person mentorship.',
        },
        {
          label: 'C',
          text: 'Some studies find remote workers are more productive than in-office counterparts.',
        },
        {
          label: 'D',
          text: 'Remote workers save time and money by eliminating commutes, which improves work-life balance.',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'Choice B uses the notes about isolation and junior employees\' skill development — the two notes that identify drawbacks — and frames them as a counterargument to the pro-remote-work position. The opening "although remote work offers real benefits" is a concessive framing that signals a counterargument is coming.',
      wrongAnswerExplanations: {
        A: 'This supports the pro-remote-work thesis rather than challenging it.',
        C: 'This also supports the thesis — productivity arguments are evidence for, not against, remote work.',
        D: 'This is another benefit of remote work, not a counterargument.',
      },
      teachingPoint:
        'A counterargument is a claim that opposes the essay\'s main position. Identify the notes that describe drawbacks or limitations, not benefits. A counterargument should use those notes, often with a concessive opener like "although" or "critics note."',
    },
    {
      id: 'rs-m-008',
      skillSlug: 'rhetorical-synthesis',
      subskill: 'Accurate Synthesis',
      difficulty: 'hard',
      level: 'advanced',
      stimulus:
        'A student is writing a report about the Dust Bowl of the 1930s. The student has gathered the following notes:\n• The Dust Bowl was a period of severe dust storms that devastated the Great Plains from 1930 to 1936.\n• Prolonged drought reduced moisture in the topsoil, making it vulnerable to wind erosion.\n• Decades of intensive plowing had destroyed the native prairie grasses whose deep roots had held the soil in place.\n• Approximately 2.5 million people migrated out of the Plains states during the 1930s.\n• The federal government responded with programs encouraging contour plowing and windbreak planting to restore soil stability.',
      question:
        'The student wants to explain how both natural and human factors contributed to the Dust Bowl. Which choice most effectively accomplishes this goal?',
      choices: [
        {
          label: 'A',
          text: 'The Dust Bowl was caused entirely by a prolonged drought that dried out the topsoil across the Great Plains.',
        },
        {
          label: 'B',
          text: 'The Dust Bowl devastated the Great Plains from 1930 to 1936, causing approximately 2.5 million people to migrate out of the region.',
        },
        {
          label: 'C',
          text: 'The Dust Bowl resulted from the combination of prolonged drought — a natural factor that dried out the topsoil — and decades of intensive plowing that had removed the native grasses whose roots previously anchored the soil.',
        },
        {
          label: 'D',
          text: 'The federal government responded to the Dust Bowl by encouraging contour plowing and windbreak planting to restore soil stability.',
        },
      ],
      correctAnswer: 'C',
      explanation:
        'Choice C accurately synthesizes both a natural factor (drought drying the topsoil) and a human factor (intensive plowing removing native grasses), precisely fulfilling the goal of explaining how both types of causes combined. It draws from two distinct notes without inventing any information.',
      wrongAnswerExplanations: {
        A: 'This attributes the Dust Bowl to drought alone, omitting the human agricultural factor — and the word "entirely" makes a claim not supported by the notes.',
        B: 'This covers the time period and migration impact but does not explain any cause — natural or human.',
        D: 'This describes the government\'s response, not the causes of the Dust Bowl.',
      },
      teachingPoint:
        'When asked to explain two types of causes, the correct answer must accurately represent both from the notes and combine them in a single coherent sentence. Watch for choices that omit one cause or add information not in the notes.',
    },
  ],
}
