import type { RWQuestion } from './types'

// Reading and Writing Module 2 Hard — 27 questions (harder second module)

export const rwModule2HardQuestions: RWQuestion[] = [

  // ── Words in Context (5) ────────────────────────────────────────────────────

  {
    id: 'rw2h-01',
    section: 'reading-writing',
    moduleId: 'rw-module-2-hard',
    domain: 'Craft and Structure',
    skill: 'Words in Context',
    difficulty: 'hard',
    stimulus: `The philosopher Hannah Arendt, writing in the aftermath of the Holocaust, argued that the most dangerous form of evil is not the sadistic or ideologically fervent variety, but rather the "banality" she identified in Adolf Eichmann's trial — a bureaucratic thoughtlessness that allows ordinary people to participate in atrocities without malicious intent, simply by following orders and failing to exercise moral judgment.`,
    question: `As used in the passage, "banality" most nearly means`,
    choices: [
      { label: 'A', text: 'extreme cruelty' },
      { label: 'B', text: 'moral ordinariness and lack of reflection' },
      { label: 'C', text: 'political extremism' },
      { label: 'D', text: 'institutional authority' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is the best answer. The passage contrasts "banality" with "sadistic or ideologically fervent" evil. Arendt's concept locates danger not in extraordinary cruelty but in thoughtlessness — ordinary people failing to think morally. "Banality" here means the unremarkable, everyday quality of evil that arises from lack of reflection rather than malice.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. The passage explicitly contrasts banality with cruelty, making "extreme cruelty" the opposite of what Arendt means.`,
      C: `Choice C is incorrect. "Political extremism" also represents the kind of fervent ideology Arendt explicitly distinguishes from banality.`,
      D: `Choice D is incorrect. "Institutional authority" describes a structural condition; "banality" in this context describes a quality of moral (in)action.`,
    },
  },

  {
    id: 'rw2h-02',
    section: 'reading-writing',
    moduleId: 'rw-module-2-hard',
    domain: 'Craft and Structure',
    skill: 'Words in Context',
    difficulty: 'hard',
    stimulus: `Neuroscientist Antonio Damasio's somatic marker hypothesis posits that emotions play an indispensable role in rational decision-making. Contrary to the Enlightenment ideal of "pure reason" untainted by feeling, Damasio's research with patients who had sustained damage to the prefrontal cortex — areas governing emotional response — revealed that such individuals, while retaining full cognitive function, became nearly incapacitated when it came to making practical decisions. Their deliberations grew interminable and their choices erratic, suggesting that emotions serve as rapid heuristics that guide reason rather than distort it.`,
    question: `As used in the passage, "heuristics" most nearly means`,
    choices: [
      { label: 'A', text: 'logical proofs' },
      { label: 'B', text: 'unconscious fears' },
      { label: 'C', text: 'mental shortcuts that aid judgment' },
      { label: 'D', text: 'learned behaviors from experience' },
    ],
    correctAnswer: 'C',
    explanation: `Choice C is the best answer. The passage describes emotions as things that "guide reason rather than distort it" and contrasts them with the slow, ineffective deliberations of patients who lost emotional function. In this context, "heuristics" are efficient mental shortcuts — mechanisms that allow rapid, useful judgment rather than exhaustive analysis.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. "Logical proofs" are deliberate and formal; heuristics in this passage are rapid and pre-deliberative.`,
      B: `Choice B is incorrect. "Unconscious fears" implies a negative connotation that contradicts the passage's framing of emotions as helpful guides.`,
      D: `Choice D is incorrect. "Learned behaviors" relates to conditioning, not the decision-guidance function described here.`,
    },
  },

  {
    id: 'rw2h-03',
    section: 'reading-writing',
    moduleId: 'rw-module-2-hard',
    domain: 'Craft and Structure',
    skill: 'Words in Context',
    difficulty: 'hard',
    stimulus: `The term "infrastructure" has undergone significant semantic drift since its mid-twentieth century emergence. Originally denoting physical systems — roads, bridges, water pipes, electrical grids — the word has been increasingly pressed into service to describe a vast array of non-physical dependencies: legal infrastructure, social infrastructure, emotional infrastructure. Critics argue that this proliferation dilutes the concept's analytical utility, rendering it so capacious as to become meaningless.`,
    question: `As used in the passage, "capacious" most nearly means`,
    choices: [
      { label: 'A', text: 'highly technical' },
      { label: 'B', text: 'so broadly inclusive as to lose precision' },
      { label: 'C', text: 'physically large' },
      { label: 'D', text: 'widely accepted' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is the best answer. The passage argues that the proliferation of uses for "infrastructure" dilutes its "analytical utility," rendering it so broadly defined that it loses meaning. "Capacious" literally means spacious or able to hold much; here it is used figuratively to mean so broad and inclusive that the concept no longer has sharp, useful boundaries.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. The passage argues the word has become too vague, not too technical.`,
      C: `Choice C is incorrect. The literal spatial meaning of "capacious" does not fit this figurative, conceptual usage.`,
      D: `Choice D is incorrect. Wide acceptance is not what the passage criticizes; it criticizes excessive broadness, not popularity.`,
    },
  },

  {
    id: 'rw2h-04',
    section: 'reading-writing',
    moduleId: 'rw-module-2-hard',
    domain: 'Craft and Structure',
    skill: 'Words in Context',
    difficulty: 'hard',
    stimulus: `Ecologists studying trophic cascades have documented how the reintroduction of gray wolves to Yellowstone National Park in 1995 produced effects far beyond predator-prey dynamics. By causing elk to avoid grazing in riparian zones, wolves indirectly allowed riverbank vegetation to recover. This in turn stabilized soil erosion, altered river flow patterns, and enabled beaver populations to rebound — changes so pervasive that researchers describe the wolves as having "geomorphically" altered the landscape.`,
    question: `As used in the passage, "geomorphically" most nearly means`,
    choices: [
      { label: 'A', text: 'in terms of population ecology' },
      { label: 'B', text: 'relating to the physical shape and structure of the land' },
      { label: 'C', text: 'through large-scale climate effects' },
      { label: 'D', text: 'at the cellular and molecular level' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is the best answer. The passage describes physical changes to the landscape: river flow patterns, soil erosion, and riverbank structure. "Geomorphically" — from "geomorphology," the study of landform processes — means relating to the physical shape and structure of Earth's surface. The context confirms this: wolves changed where animals grazed, which physically altered rivers and terrain.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. Population ecology changes (elk and beaver numbers) are mentioned as causes, not the thing described as "geomorphic."`,
      C: `Choice C is incorrect. Climate is not mentioned in the passage; the effects are local and landscape-specific.`,
      D: `Choice D is incorrect. "Geomorphically" refers to large-scale landform changes, not microscopic processes.`,
    },
  },

  {
    id: 'rw2h-05',
    section: 'reading-writing',
    moduleId: 'rw-module-2-hard',
    domain: 'Craft and Structure',
    skill: 'Words in Context',
    difficulty: 'hard',
    stimulus: `In her landmark 1962 work Silent Spring, Rachel Carson deployed a prose style that was simultaneously poetic and rigorous — lyrical enough to engage a general readership, but scientifically precise enough to withstand peer scrutiny. Some critics later faulted the book for being tendentious, arguing that Carson selectively emphasized evidence of pesticide harm while minimizing counterevidence regarding agricultural benefits.`,
    question: `As used in the passage, "tendentious" most nearly means`,
    choices: [
      { label: 'A', text: 'carefully balanced' },
      { label: 'B', text: 'written in an overly technical style' },
      { label: 'C', text: 'promoting a particular viewpoint through selective use of evidence' },
      { label: 'D', text: 'unnecessarily long and complex' },
    ],
    correctAnswer: 'C',
    explanation: `Choice C is the best answer. The critics' specific charge — that Carson "selectively emphasized evidence of pesticide harm while minimizing counterevidence" — is exactly what "tendentious" means: written to promote a particular conclusion by presenting evidence one-sidedly. The word suggests bias in argument construction, which is the critics' complaint.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. "Carefully balanced" is the opposite of what the critics allege and the opposite of what "tendentious" means.`,
      B: `Choice B is incorrect. The passage describes Carson's style as accessible to general readers, not overly technical.`,
      D: `Choice D is incorrect. Length and complexity are not what the critics fault; they fault selectivity in evidence use.`,
    },
  },

  // ── Text Structure and Purpose (4) ─────────────────────────────────────────

  {
    id: 'rw2h-06',
    section: 'reading-writing',
    moduleId: 'rw-module-2-hard',
    domain: 'Craft and Structure',
    skill: 'Text Structure and Purpose',
    difficulty: 'hard',
    stimulus: `Proponents of universal basic income (UBI) argue that periodic unconditional cash payments to all citizens would alleviate poverty and enable greater individual freedom and risk-taking. Pilot studies in Finland, Kenya, and Stockton, California have produced encouraging early results, showing improved mental health, modest increases in employment, and higher food security among recipients. Critics, however, contend that these pilots are too small, too short, and too generous to predict outcomes at national scale — and that the fiscal cost of a true universal program would require either massive tax increases or cuts to existing social programs.`,
    question: `The passage is best described as`,
    choices: [
      { label: 'A', text: 'an argument in favor of implementing UBI in the United States' },
      { label: 'B', text: 'a presentation of evidence and counterarguments surrounding UBI' },
      { label: 'C', text: 'a refutation of critics who oppose UBI based on pilot study data' },
      { label: 'D', text: 'an explanation of why UBI pilot programs cannot succeed' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is the best answer. The passage presents the case for UBI (proponents' arguments and pilot results) and then the case against it (critics' concerns about scale and cost). It does not resolve the debate or take a side. The structure is balanced presentation of arguments and counterarguments.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. The passage presents both sides; it does not advocate for UBI.`,
      C: `Choice C is incorrect. The passage gives critics' concerns equal weight; it does not refute them.`,
      D: `Choice D is incorrect. The passage notes encouraging pilot results; it does not argue pilots cannot succeed.`,
    },
  },

  {
    id: 'rw2h-07',
    section: 'reading-writing',
    moduleId: 'rw-module-2-hard',
    domain: 'Craft and Structure',
    skill: 'Text Structure and Purpose',
    difficulty: 'hard',
    stimulus: `The popular image of scientists working alone in laboratories, driven by disinterested curiosity toward inevitable discoveries, has been systematically dismantled by historians of science. Thomas Kuhn's 1962 work The Structure of Scientific Revolutions argued that science proceeds not through steady accumulation of knowledge but through periodic "paradigm shifts" in which the entire conceptual framework of a field is overthrown. Sociologists of science like Bruno Latour went further, arguing that scientific knowledge is not simply discovered but actively constructed through social processes, laboratory negotiations, and rhetorical strategies — a view that provoked fierce resistance from scientists who felt it undermined the authority of scientific knowledge.`,
    question: `The final clause ("a view that provoked fierce resistance…") primarily serves to`,
    choices: [
      { label: 'A', text: `endorse Latour's view that scientific knowledge is socially constructed` },
      { label: 'B', text: `indicate that Latour's argument is incorrect` },
      { label: 'C', text: `acknowledge that Latour's position was controversial rather than universally accepted` },
      { label: 'D', text: 'explain why paradigm shifts occur in scientific fields' },
    ],
    correctAnswer: 'C',
    explanation: `Choice C is the best answer. The final clause notes that scientists resisted Latour's view, which contextualizes the argument as contentious. The passage does not evaluate whether the resistance was justified — it simply records that Latour's position was not accepted without controversy, adding nuance to the intellectual landscape described.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. Noting that scientists resisted the view does not constitute endorsement of it.`,
      B: `Choice B is incorrect. Resistance from scientists does not make the view incorrect; the passage does not make this judgment.`,
      D: `Choice D is incorrect. Paradigm shifts are Kuhn's concept, not Latour's; this clause addresses Latour's social construction argument.`,
    },
  },

  {
    id: 'rw2h-08',
    section: 'reading-writing',
    moduleId: 'rw-module-2-hard',
    domain: 'Craft and Structure',
    skill: 'Text Structure and Purpose',
    difficulty: 'hard',
    stimulus: `Historian Eric Hobsbawm coined the term "invented tradition" to describe practices presented as ancient and continuous that are in fact relatively recent creations. The Scottish Highland "tradition" of wearing tartan clan kilts, for example, was largely a nineteenth-century invention, promoted after the Highland Clearances had already largely dismantled traditional clan culture. Similarly, many royal ceremonies presented as timeless rituals were first formalized in the late nineteenth century as monarchies sought to reinforce their legitimacy in an era of rising democratic pressure.`,
    question: `How does the author use the examples of Scottish tartans and royal ceremonies?`,
    choices: [
      { label: 'A', text: 'To argue that all national traditions are fraudulent inventions' },
      { label: 'B', text: 'To demonstrate how powerful elites use tradition to suppress dissent' },
      { label: 'C', text: `To illustrate Hobsbawm's concept of invented tradition with specific historical cases` },
      { label: 'D', text: 'To compare Scottish cultural history with British royal history' },
    ],
    correctAnswer: 'C',
    explanation: `Choice C is the best answer. After introducing Hobsbawm's concept, the passage says "for example" and provides two specific cases — Scottish tartans and royal ceremonies — both of which were presented as ancient but were in fact recent creations. These are concrete illustrations of the abstract concept, not arguments in themselves.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. The passage does not claim all traditions are fraudulent; it provides examples of a specific category (invented traditions).`,
      B: `Choice B is incorrect. Suppression of dissent is not what the passage argues; the examples are used to illustrate invented tradition, not political manipulation.`,
      D: `Choice D is incorrect. The examples are used to illustrate a concept, not to compare two national histories with each other.`,
    },
  },

  {
    id: 'rw2h-09',
    section: 'reading-writing',
    moduleId: 'rw-module-2-hard',
    domain: 'Craft and Structure',
    skill: 'Text Structure and Purpose',
    difficulty: 'hard',
    stimulus: `For most of human history, the night sky was an intimate and navigable presence — a resource for farmers timing planting cycles, sailors charting courses, and priests marking ritual calendars. The introduction of artificial lighting gradually diminished this relationship. Today, roughly 80% of the world's population lives under light-polluted skies, and one-third of humanity cannot see the Milky Way from their homes. Astronomers have long complained about the effects on observational science, but a growing body of research now implicates light pollution in disrupted sleep cycles, altered wildlife behavior, and increased energy consumption — concerns that extend well beyond telescopes.`,
    question: `The phrase "concerns that extend well beyond telescopes" primarily serves to`,
    choices: [
      { label: 'A', text: 'argue that astronomers should not be the only voices in light pollution debates' },
      { label: 'B', text: 'signal that the passage will shift its focus from astronomy to broader health and ecological impacts' },
      { label: 'C', text: 'suggest that light pollution is primarily an astronomical problem' },
      { label: 'D', text: 'introduce a counterargument against the previous claims about light pollution' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is the best answer. The passage has just mentioned astronomers' historical complaints, then pivoted to sleep, wildlife, and energy concerns. The phrase "extend well beyond telescopes" marks this pivot, signaling that the relevance of light pollution is broader than the astronomy community had previously emphasized.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. The passage does not make an argument about who should participate in debates; it describes the scope of the problem.`,
      C: `Choice C is incorrect. The phrase says concerns extend beyond telescopes, implying astronomy is not the primary concern.`,
      D: `Choice D is incorrect. The final sentence adds to rather than contradicts the earlier claims about light pollution's effects.`,
    },
  },

  // ── Central Ideas and Details (4) ──────────────────────────────────────────

  {
    id: 'rw2h-10',
    section: 'reading-writing',
    moduleId: 'rw-module-2-hard',
    domain: 'Information and Ideas',
    skill: 'Central Ideas and Details',
    difficulty: 'hard',
    stimulus: `The concept of "wilderness" as pristine, pre-human nature is, according to environmental historian William Cronon, largely a cultural fiction. Pre-Columbian North America was actively managed by Indigenous peoples through controlled burning, intentional planting, and landscape modification for thousands of years. The "empty wilderness" encountered by European explorers was in many cases land that had been recently cleared of its Indigenous stewards by epidemic disease. Cronon argues that clinging to an ideal of pristine wilderness that never existed risks both distorting conservation priorities and erasing Indigenous land tenure from history.`,
    question: `What is the central claim of the passage?`,
    choices: [
      { label: 'A', text: 'European explorers deliberately falsified accounts of North American landscapes.' },
      { label: 'B', text: 'The idea of untouched wilderness is historically inaccurate and has consequences for how we approach conservation.' },
      { label: 'C', text: 'Indigenous peoples should be given legal ownership of North American wilderness areas.' },
      { label: 'D', text: 'Conservation efforts have been more successful in areas managed by Indigenous communities.' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is the best answer. The passage challenges the idea that "wilderness" is pristine and pre-human, argues it misrepresents historical reality (Indigenous land management), and explains that holding this fiction has real consequences — distorting conservation priorities and erasing Indigenous history. Both parts of Choice B (historical inaccuracy + consequences) are essential to the passage's central claim.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. The passage attributes the "empty wilderness" image to epidemic-driven depopulation and cultural assumptions, not deliberate falsification.`,
      C: `Choice C is incorrect. Legal ownership is not discussed; the passage is about historical and conceptual framing, not policy prescriptions.`,
      D: `Choice D is incorrect. Conservation success rates are not compared; the passage focuses on conceptual problems with the wilderness ideal.`,
    },
  },

  {
    id: 'rw2h-11',
    section: 'reading-writing',
    moduleId: 'rw-module-2-hard',
    domain: 'Information and Ideas',
    skill: 'Central Ideas and Details',
    difficulty: 'hard',
    stimulus: `The Columbian Exchange — the transfer of plants, animals, diseases, and ideas between the Americas and the Old World following Columbus's 1492 voyage — fundamentally reshaped global food systems. Crops indigenous to the Americas, including potatoes, tomatoes, maize, and cacao, transformed European and African diets and contributed to dramatic population growth in regions where they were adopted. The potato alone is estimated to have been responsible for up to 25% of population growth in Europe and Africa between 1700 and 1900, according to economic historians Nathan Nunn and Nancy Qian.`,
    question: `According to the passage, which of the following best describes the significance of the Columbian Exchange?`,
    choices: [
      { label: 'A', text: 'It was primarily important for introducing livestock from Europe into the Americas.' },
      { label: 'B', text: 'It fundamentally altered global food supplies and contributed to major population increases.' },
      { label: 'C', text: 'Its effects were limited to changes in European eating habits.' },
      { label: 'D', text: 'It was beneficial to the Americas but harmful to European populations.' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is the best answer. The passage describes the Exchange as "fundamentally reshaping global food systems," introduces American crops that transformed diets across multiple continents, and quantifies population growth effects. The significance is both food-system transformation and demographic change, which Choice B captures.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. The passage focuses on crops flowing from the Americas to the Old World, not livestock; livestock is not mentioned.`,
      C: `Choice C is incorrect. The passage explicitly includes African diets and population growth, not just European effects.`,
      D: `Choice D is incorrect. The passage presents the Exchange as broadly beneficial to Old World populations (food, population growth); it does not characterize effects in the Americas here.`,
    },
  },

  {
    id: 'rw2h-12',
    section: 'reading-writing',
    moduleId: 'rw-module-2-hard',
    domain: 'Information and Ideas',
    skill: 'Central Ideas and Details',
    difficulty: 'hard',
    stimulus: `In a 2016 study, researchers examined the "illusory truth effect" — the tendency for repeated exposure to a statement to increase belief in its truth, regardless of accuracy. Participants were shown a series of statements, some true and some false, and asked to rate their truthfulness. Two weeks later, participants were shown the same statements alongside new ones. Critically, statements that had appeared in the first session were rated as more truthful in the second session, even when they had been false. The effect held even for participants who had correctly identified the statements as false in the first session, suggesting that familiarity operates somewhat independently of conscious belief.`,
    question: `Which detail from the passage most strongly supports the conclusion that the illusory truth effect is not simply the result of participants forgetting what they originally believed?`,
    choices: [
      { label: 'A', text: 'The study exposed participants to both true and false statements.' },
      { label: 'B', text: 'Participants were asked to rate statements twice, two weeks apart.' },
      { label: 'C', text: 'The effect held even for participants who had correctly identified the false statements as false in the first session.' },
      { label: 'D', text: 'Some of the statements shown in the second session were new.' },
    ],
    correctAnswer: 'C',
    explanation: `Choice C is the best answer. If the effect occurred only in participants who had forgotten their original judgment, we might attribute it to memory failure. But the passage specifies that the effect persisted even in participants who had correctly identified the statements as false initially — meaning they knew the truth but still rated the repeated false statements as more credible. This isolates familiarity as the driver, not forgotten beliefs.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. Including both true and false statements describes the study design, not the evidence against the forgetting explanation.`,
      B: `Choice B is incorrect. The two-week interval is context, not the key detail that rules out forgetting.`,
      D: `Choice D is incorrect. New statements in the second session serve as a control, but this detail does not address whether forgetting explains the effect in familiar statements.`,
    },
  },

  {
    id: 'rw2h-13',
    section: 'reading-writing',
    moduleId: 'rw-module-2-hard',
    domain: 'Information and Ideas',
    skill: 'Central Ideas and Details',
    difficulty: 'hard',
    stimulus: `For most of the twentieth century, psychiatry classified homosexuality as a mental disorder. In 1973, after years of pressure from gay activists and after internal debate among researchers, the American Psychiatric Association (APA) voted to remove homosexuality from its Diagnostic and Statistical Manual (DSM). The decision was not without dissent: a referendum of APA members in 1974 showed that approximately 37% opposed the removal. Historian of psychiatry Ronald Bayer has argued that this episode illustrates how psychiatric diagnoses are shaped not only by scientific evidence but by social and political pressures that are often invisible in official accounts of medical progress.`,
    question: `What does Bayer's argument, as described in the passage, suggest about the 1973 APA decision?`,
    choices: [
      { label: 'A', text: 'The decision was scientifically unjustified and should be reversed.' },
      { label: 'B', text: 'The decision illustrates that scientific consensus can change rapidly.' },
      { label: 'C', text: 'The decision reflects the influence of social forces on what is classified as a medical disorder.' },
      { label: 'D', text: 'The decision shows that medical organizations should not hold member referendums.' },
    ],
    correctAnswer: 'C',
    explanation: `Choice C is the best answer. Bayer's argument, as summarized in the passage, is that psychiatric diagnoses are shaped by "social and political pressures" alongside scientific evidence. The homosexuality reclassification is offered as an illustration of this broader point — not as evidence for or against the correctness of the decision itself.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. Bayer's argument is about the process of classification, not whether the outcome was correct; the passage does not advocate reversal.`,
      B: `Choice B is incorrect. Rapid scientific consensus change is not Bayer's point; he emphasizes the social and political dimensions, not the pace.`,
      D: `Choice D is incorrect. Bayer makes no argument about whether referendums are appropriate governance mechanisms.`,
    },
  },

  // ── Command of Evidence (3) ─────────────────────────────────────────────────

  {
    id: 'rw2h-14',
    section: 'reading-writing',
    moduleId: 'rw-module-2-hard',
    domain: 'Information and Ideas',
    skill: 'Command of Evidence',
    difficulty: 'hard',
    stimulus: `A researcher is investigating whether urban noise pollution affects student learning. She finds the following data from a study of schools near a major airport:

• Students in classrooms facing the airport (noise levels averaging 72 dB) scored an average of 8 points lower on standardized reading tests than students in classrooms on the quiet side of the same buildings.
• After acoustic panels were installed in noisy classrooms, the score gap narrowed to 2 points within one school year.
• Student demographics, teacher experience levels, and instructional hours were nearly identical across all classrooms studied.

The researcher wants to argue that noise, not other factors, caused the original score gap.`,
    question: `Which piece of evidence most directly supports the researcher's causal claim?`,
    choices: [
      { label: 'A', text: 'The 8-point score gap between noisy and quiet classrooms.' },
      { label: 'B', text: 'The fact that student demographics and teacher experience were nearly identical across classrooms.' },
      { label: 'C', text: 'The narrowing of the score gap after acoustic panels were installed.' },
      { label: 'D', text: 'The average noise level of 72 dB in airport-facing classrooms.' },
    ],
    correctAnswer: 'C',
    explanation: `Choice C is the best answer. A causal claim requires evidence that changing the proposed cause changes the effect. When acoustic panels were installed (reducing noise), the score gap narrowed — this is the closest the data gets to a natural experiment. Changing the noise level and observing a corresponding change in scores provides the strongest support for a causal relationship.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. The score gap shows correlation between location and scores; it does not by itself establish noise as the cause.`,
      B: `Choice B is incorrect. Controlling for confounders strengthens the study design but does not directly demonstrate causation; it only rules out alternative explanations.`,
      D: `Choice D is incorrect. The decibel measurement describes the noise level but does not show that changing the noise changed outcomes.`,
    },
  },

  {
    id: 'rw2h-15',
    section: 'reading-writing',
    moduleId: 'rw-module-2-hard',
    domain: 'Information and Ideas',
    skill: 'Command of Evidence',
    difficulty: 'hard',
    stimulus: `A student is writing an essay arguing that the decline of American manufacturing jobs was caused primarily by automation rather than by trade with China. The student has found the following information:

• Between 2000 and 2010, the United States lost approximately 5.6 million manufacturing jobs.
• Economists Daron Acemoglu and Pascual Restrepo estimate that industrial robots displaced 400,000–670,000 workers during this period.
• Economists David Autor, David Dorn, and Gordon Hanson estimate that competition from Chinese imports was responsible for 2.0–2.4 million job losses in the same period.
• Automation-related job losses were concentrated in industries like auto manufacturing; import-related losses were concentrated in textile and furniture industries.`,
    question: `Does the data support the student's argument that automation was the primary cause?`,
    choices: [
      { label: 'A', text: 'Yes, because automation displaced at least 400,000 workers during this period.' },
      { label: 'B', text: 'No, because the estimates suggest trade with China caused three to five times more job losses than automation.' },
      { label: 'C', text: 'Yes, because job losses were spread across multiple industries.' },
      { label: 'D', text: 'No, because total manufacturing job losses exceeded 5 million, which is too large to attribute to any single cause.' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is the best answer. The data shows automation displaced 400,000–670,000 workers, while Chinese import competition displaced 2.0–2.4 million — roughly three to five times more. The data therefore contradicts the student's claim that automation was the primary cause; by the numbers, trade appears to have been the larger factor.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. 400,000 displaced by automation is a smaller figure than the 2+ million displaced by trade; absolute size does not establish primacy.`,
      C: `Choice C is incorrect. The data actually shows concentration by industry (autos vs. textiles), and spread of losses does not establish which cause was primary.`,
      D: `Choice D is incorrect. The total job loss figure (5.6 million) is larger than the estimates for both causes combined; this might suggest other factors, but it does not by itself negate the comparison between automation and trade.`,
    },
  },

  {
    id: 'rw2h-16',
    section: 'reading-writing',
    moduleId: 'rw-module-2-hard',
    domain: 'Information and Ideas',
    skill: 'Command of Evidence',
    difficulty: 'hard',
    stimulus: `Historian David Brion Davis argued that the abolitionist movement's eventual success depended not just on moral arguments but on economic changes that made enslaved labor less central to Northern economic interests. He noted that Northern merchants and manufacturers increasingly depended on free wage labor rather than plantation slavery for their economic model.

Which additional piece of evidence would most strengthen Davis's argument?`,
    question: `Which additional piece of evidence would most strengthen Davis's argument?`,
    choices: [
      { label: 'A', text: 'Documentation showing that abolitionist pamphlets were widely distributed in Northern cities.' },
      { label: 'B', text: 'Records showing that Northern politicians who voted for anti-slavery legislation represented districts with high rates of industrial employment and low dependence on Southern cotton.' },
      { label: 'C', text: 'Statistics showing that the enslaved population in Southern states increased between 1800 and 1860.' },
      { label: 'D', text: 'Evidence that abolitionists were motivated primarily by religious convictions.' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is the best answer. Davis argues that economic interests shaped the willingness of Northerners to support abolition. If the politicians who actually voted for anti-slavery laws came from districts with industrial (wage-labor) economies rather than cotton-dependent ones, this would directly support his claim that economic structure influenced abolitionist political success.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. Wide distribution of pamphlets supports the moral argument thesis Davis is contrasting with his own economic argument.`,
      C: `Choice C is incorrect. Growth of the enslaved population in the South is context about Southern labor demand, not Northern economic interests.`,
      D: `Choice D is incorrect. Religious motivation strengthens the moral-argument explanation that Davis argues is insufficient on its own.`,
    },
  },

  // ── Inferences (2) ─────────────────────────────────────────────────────────

  {
    id: 'rw2h-17',
    section: 'reading-writing',
    moduleId: 'rw-module-2-hard',
    domain: 'Information and Ideas',
    skill: 'Inferences',
    difficulty: 'hard',
    stimulus: `Emerging research on epigenetics — changes in gene expression that do not alter the underlying DNA sequence — suggests that environmental stresses experienced by parents can influence the gene expression of their offspring. Studies with mice have demonstrated that fear-conditioning responses can be transmitted to the next generation through non-genetic mechanisms. Researchers caution, however, that the magnitude of such effects in humans, and the degree to which they persist across multiple generations, remain poorly understood.`,
    question: `What can most reasonably be inferred from the passage about epigenetics?`,
    choices: [
      { label: 'A', text: 'Epigenetic inheritance is now as well-understood in humans as it is in mice.' },
      { label: 'B', text: 'The findings from mouse studies may not straightforwardly translate to conclusions about multi-generational human inheritance.' },
      { label: 'C', text: 'Environmental stressors have no lasting effect on human gene expression.' },
      { label: 'D', text: 'Epigenetics has entirely replaced Darwinian natural selection as the dominant model of inheritance.' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is the best answer. The passage describes compelling mouse studies but immediately follows them with a caution: effects in humans and their persistence across generations "remain poorly understood." This implies that drawing firm human conclusions from mouse data would be premature, which is what Choice B captures.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. The passage says the opposite — human effects are "poorly understood," contrasting with clearer mouse data.`,
      C: `Choice C is incorrect. The passage suggests environmental stressors may affect gene expression; it simply notes the limits of current human data.`,
      D: `Choice D is incorrect. No comparison with Darwinian selection is made; the passage discusses one specific mechanism of inheritance, not the entire field.`,
    },
  },

  {
    id: 'rw2h-18',
    section: 'reading-writing',
    moduleId: 'rw-module-2-hard',
    domain: 'Information and Ideas',
    skill: 'Inferences',
    difficulty: 'hard',
    stimulus: `The history of the concept of "wilderness" in American law reveals a striking tension. The Wilderness Act of 1964 defines wilderness as "an area where the earth and its community of life are untrammeled by man, where man himself is a visitor who does not remain." Yet large portions of land designated as wilderness under this act had been inhabited, cultivated, and managed by Indigenous peoples for centuries before European colonization. The act's designation process typically required that lands appear "natural" by mid-twentieth-century standards — which often meant that the removal or exclusion of Indigenous populations was a precondition for legal wilderness status.`,
    question: `Which inference is best supported by the passage?`,
    choices: [
      { label: 'A', text: 'The authors of the Wilderness Act intended to erase Indigenous history.' },
      { label: 'B', text: 'The legal definition of wilderness may have been easier to apply to lands from which Indigenous peoples had already been removed.' },
      { label: 'C', text: 'All land designated as wilderness under the 1964 act was genuinely uninhabited before European colonization.' },
      { label: 'D', text: 'The Wilderness Act of 1964 was opposed by Indigenous communities at the time of its passage.' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is the best answer. The passage says designation required lands that appeared "natural" by mid-20th century standards and that removal or exclusion of Indigenous peoples was often a precondition. This implies that the legal process was easier to apply where Indigenous presence had already been erased — not necessarily by the Act's authors' intent, but as a structural feature of the definition.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. The passage does not attribute intent to the Act's authors; it describes a structural outcome, not deliberate purpose.`,
      C: `Choice C is incorrect. The passage explicitly states that "large portions" had been inhabited for centuries, contradicting this claim.`,
      D: `Choice D is incorrect. The passage says nothing about Indigenous communities' political response to the Act at the time of passage.`,
    },
  },

  // ── Cross-Text Connections (2) ──────────────────────────────────────────────

  {
    id: 'rw2h-19',
    section: 'reading-writing',
    moduleId: 'rw-module-2-hard',
    domain: 'Craft and Structure',
    skill: 'Cross-Text Connections',
    difficulty: 'hard',
    stimulus: `Text 1: The success of CRISPR-Cas9 gene editing technology in laboratory settings has raised the prospect of correcting genetic diseases before birth. Germline editing — modifying the DNA of embryos or reproductive cells so that changes are heritable — could potentially eliminate conditions like Huntington's disease, sickle cell anemia, and cystic fibrosis from family lines. Proponents argue that preventing genetic suffering is a moral obligation.

Text 2: Germline gene editing raises profound ethical concerns that go beyond individual medical decisions. Once heritable changes are introduced into a lineage, they cannot be revoked if unintended consequences emerge. Moreover, the same technologies that might eliminate disease could be used to select for traits like intelligence or height, opening the door to a new eugenics. The fact that early germline editing has already been conducted on human embryos — without international consensus — suggests that existing governance frameworks are inadequate.`,
    question: `Both texts discuss germline gene editing, but they differ primarily in that Text 1 focuses on _______ while Text 2 focuses on _______.`,
    choices: [
      { label: 'A', text: 'the technical limitations of CRISPR; the potential benefits for specific diseases' },
      { label: 'B', text: 'the potential to eliminate inherited disease; the ethical and governance risks of the technology' },
      { label: 'C', text: 'the history of gene editing research; the current state of international law' },
      { label: 'D', text: 'the moral duty to prevent suffering; the scientific inaccuracy of germline research' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is the best answer. Text 1 emphasizes the potential to prevent genetic disease and frames this as a moral obligation. Text 2 acknowledges the medical potential implicitly but focuses on ethical concerns (irreversibility, eugenics risk) and governance failures. This is the clearest distinction between the two texts' primary focuses.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. Text 1 does not discuss technical limitations; Text 2 does not focus on disease-specific benefits.`,
      C: `Choice C is incorrect. Neither text provides a history of research or a detailed account of international law.`,
      D: `Choice D is incorrect. Text 2 does not argue that germline research is scientifically inaccurate; it raises ethical and governance concerns.`,
    },
  },

  {
    id: 'rw2h-20',
    section: 'reading-writing',
    moduleId: 'rw-module-2-hard',
    domain: 'Craft and Structure',
    skill: 'Cross-Text Connections',
    difficulty: 'hard',
    stimulus: `Text 1: Economists traditionally measure national well-being using Gross Domestic Product (GDP), which tallies the total monetary value of goods and services produced. GDP is an efficient summary statistic that correlates with life expectancy, literacy, and access to material goods. Its simplicity is a feature, not a bug: policymakers need clear, actionable metrics.

Text 2: GDP's fatal flaw is that it counts activity, not welfare. Cleaning up an oil spill increases GDP; so does treating preventable illness. A country could log all its forests, sell the timber, and record spectacular growth — while destroying the ecological and cultural assets that actually sustain its citizens. Alternative metrics like the Genuine Progress Indicator (GPI) attempt to correct for these distortions by subtracting costs of crime, pollution, and inequality.`,
    question: `The author of Text 1 would most likely respond to the oil spill example in Text 2 by arguing that`,
    choices: [
      { label: 'A', text: 'cleanup costs should not be included in GDP calculations' },
      { label: 'B', text: 'the simplicity and correlation with well-being indicators make GDP preferable to complex alternatives despite such edge cases' },
      { label: 'C', text: 'oil spills increase GDP because they reflect increased productivity' },
      { label: 'D', text: 'alternative metrics like the GPI are more accurate than GDP' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is the best answer. Text 1 explicitly defends GDP's simplicity as a "feature, not a bug" and notes its correlation with life expectancy, literacy, and material access. When confronted with an edge case (spill cleanup inflating GDP), the Text 1 author would likely acknowledge the limitation while maintaining that GDP's overall correlations and policy utility outweigh its distortions in unusual cases.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. Text 1 defends GDP as designed; its author would not propose redesigning the metric in response to criticism.`,
      C: `Choice C is incorrect. Text 1 does not define cleanup as productivity; this misrepresents the author's position.`,
      D: `Choice D is incorrect. Text 1 implicitly opposes complex alternatives by defending simplicity; the author would not endorse GPI.`,
    },
  },

  // ── Rhetorical Synthesis (2) ────────────────────────────────────────────────

  {
    id: 'rw2h-21',
    section: 'reading-writing',
    moduleId: 'rw-module-2-hard',
    domain: 'Expression of Ideas',
    skill: 'Rhetorical Synthesis',
    difficulty: 'hard',
    stimulus: `A student is writing a research paper arguing that social media companies should be held legally liable for harmful content on their platforms. The student has gathered these notes:

• Section 230 of the Communications Decency Act (1996) immunizes online platforms from liability for user-generated content.
• Frances Haugen's 2021 testimony revealed that Facebook knew its algorithms amplified divisive content because it increased engagement metrics.
• A 2022 study found that adolescents who spent more than 3 hours per day on social media were 60% more likely to experience mental health problems.
• Section 230 was written before social media platforms existed; it was intended to protect early internet bulletin boards.
• Several European countries have passed laws requiring platforms to remove harmful content or face fines.`,
    question: `The student wants to write a sentence arguing that Section 230's original purpose no longer justifies its current scope. Which choice best accomplishes this goal?`,
    choices: [
      { label: 'A', text: 'Section 230 was passed in 1996 and has not been amended since.' },
      { label: 'B', text: 'Because Section 230 was written to protect early internet bulletin boards rather than the algorithmically driven platforms that now shape global discourse, its blanket immunity may no longer be appropriate.' },
      { label: 'C', text: `Social media companies use engagement-maximizing algorithms that Facebook's own researchers have found to be harmful.` },
      { label: 'D', text: 'European countries have found it possible to regulate platform content without eliminating online communication.' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is the best answer. It uses two specific notes — Section 230's original purpose (protecting bulletin boards) and the current reality (algorithmically driven platforms) — to make the argument that the law's original scope no longer fits current conditions. The word "may" appropriately hedges the claim rather than overstating it.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. It states only the year of passage; it makes no argument about original purpose or current appropriateness.`,
      C: `Choice C is incorrect. It uses the algorithm harm evidence to indict platforms, not to argue about the scope or historical purpose of Section 230.`,
      D: `Choice D is incorrect. European regulation demonstrates that liability regimes are possible but does not address Section 230's original purpose or current fit.`,
    },
  },

  {
    id: 'rw2h-22',
    section: 'reading-writing',
    moduleId: 'rw-module-2-hard',
    domain: 'Expression of Ideas',
    skill: 'Rhetorical Synthesis',
    difficulty: 'hard',
    stimulus: `A student is writing an argumentative essay about whether cities should implement congestion pricing — charging drivers fees to enter dense urban areas during peak hours. The student wants to address a counterargument about equity before rebutting it.

Notes:
• London's congestion charge, introduced in 2003, reduced traffic in the charging zone by 30% and raised £2.6 billion for public transit over 15 years.
• Critics argue congestion pricing is regressive because lower-income workers who cannot afford to live near transit must drive to work.
• Stockholm's congestion tax revenues were earmarked for new highway and rail infrastructure, specifically serving lower-income outer suburbs.
• New York City's congestion pricing program includes a low-income tax credit for drivers earning under $60,000.
• Studies in Stockholm found that after implementation, lower-income neighborhoods actually experienced net improvements in air quality.`,
    question: `Which sentence best acknowledges the equity counterargument while setting up the student's rebuttal?`,
    choices: [
      { label: 'A', text: `While some argue congestion pricing unfairly burdens low-income drivers, programs like Stockholm's and New York's demonstrate that equity concerns can be addressed through targeted revenue use and tax credits.` },
      { label: 'B', text: 'Congestion pricing has been shown to reduce traffic and raise revenue for public transit.' },
      { label: 'C', text: 'Lower-income residents in Stockholm saw air quality improvements after the congestion tax was introduced.' },
      { label: 'D', text: 'Critics of congestion pricing argue that it is unfair to low-income workers who rely on cars.' },
    ],
    correctAnswer: 'A',
    explanation: `Choice A is the best answer. It explicitly acknowledges the equity counterargument ("some argue congestion pricing unfairly burdens low-income drivers") and then pivots to the rebuttal with "while … demonstrate that equity concerns can be addressed" — using two specific examples (Stockholm's revenue earmarking, New York's tax credit) to show the concern can be mitigated.`,
    wrongAnswerExplanations: {
      B: `Choice B is incorrect. It states benefits of congestion pricing without acknowledging the equity counterargument at all.`,
      C: `Choice C is incorrect. It presents one piece of rebuttal evidence without first acknowledging the counterargument.`,
      D: `Choice D is incorrect. It states the counterargument only; it does not set up a rebuttal.`,
    },
  },

  // ── Transitions (3) ────────────────────────────────────────────────────────

  {
    id: 'rw2h-23',
    section: 'reading-writing',
    moduleId: 'rw-module-2-hard',
    domain: 'Expression of Ideas',
    skill: 'Transitions',
    difficulty: 'hard',
    stimulus: `The Hubble Space Telescope, launched in 1990 with a flawed primary mirror that blurred its initial images, was repaired in 1993 by astronauts during a spacewalk — one of the most complex operations ever conducted in orbit. _______ the telescope became one of the most productive scientific instruments in history, producing observations that constrained the age of the universe, confirmed the existence of supermassive black holes, and contributed to the discovery of dark energy.`,
    question: `Which choice completes the text with the most logical transition?`,
    choices: [
      { label: 'A', text: 'Despite this,' },
      { label: 'B', text: 'Nevertheless,' },
      { label: 'C', text: 'Following the repair,' },
      { label: 'D', text: 'In contrast,' },
    ],
    correctAnswer: 'C',
    explanation: `Choice C is the best answer. The passage describes a repair mission and then describes scientific achievements. The second sentence follows from the repair chronologically and causally — the repair enabled the achievements. "Following the repair" precisely signals this temporal and causal relationship without implying an unexpected contrast.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. "Despite this" implies the achievements occurred in spite of an ongoing obstacle; but the repair removed the obstacle, so there is nothing to say "despite."`,
      B: `Choice B is incorrect. "Nevertheless" similarly implies persisting despite adversity; again, the repair resolved the problem, making "nevertheless" illogical.`,
      D: `Choice D is incorrect. "In contrast" implies the second sentence is opposite to the first; scientific success is not a contrast to a flawed mirror being repaired.`,
    },
  },

  {
    id: 'rw2h-24',
    section: 'reading-writing',
    moduleId: 'rw-module-2-hard',
    domain: 'Expression of Ideas',
    skill: 'Transitions',
    difficulty: 'hard',
    stimulus: `Artificial sweeteners were developed as a calorie-free alternative to sugar and have been marketed for decades as tools for weight management. _______ several large-scale studies have found that regular consumption of artificial sweeteners is not strongly associated with weight loss and may in some cases correlate with weight gain — a finding that researchers have attributed to sweeteners' potential effects on gut bacteria and insulin regulation.`,
    question: `Which choice completes the text with the most logical transition?`,
    choices: [
      { label: 'A', text: 'As a result,' },
      { label: 'B', text: 'For instance,' },
      { label: 'C', text: 'Paradoxically,' },
      { label: 'D', text: 'In addition,' },
    ],
    correctAnswer: 'C',
    explanation: `Choice C is the best answer. The first sentence says sweeteners were designed to help with weight management. The second says they may correlate with weight gain — the opposite of their intended purpose. "Paradoxically" precisely captures this irony: the product designed to prevent weight gain may promote it.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. "As a result" implies the surprising finding is a consequence of being marketed as a weight management tool, which is illogical.`,
      B: `Choice B is incorrect. "For instance" suggests the second sentence is an example of the first sentence's claim; but the second sentence contradicts the first.`,
      D: `Choice D is incorrect. "In addition" adds parallel information; the second sentence contradicts rather than supplements the first.`,
    },
  },

  {
    id: 'rw2h-25',
    section: 'reading-writing',
    moduleId: 'rw-module-2-hard',
    domain: 'Expression of Ideas',
    skill: 'Transitions',
    difficulty: 'hard',
    stimulus: `Architectural historian Spiro Kostof argued that cities are not simply built by planners and architects but are continuously reshaped by the informal actions of their inhabitants — the unauthorized construction of sheds and additions, the repurposing of commercial spaces as homes, the gradual encroachment of market stalls onto public streets. _______ no urban plan, however comprehensive, can fully anticipate or contain the adaptive uses that ordinary people make of built environments.`,
    question: `Which choice completes the text with the most logical transition?`,
    choices: [
      { label: 'A', text: 'However,' },
      { label: 'B', text: 'For this reason,' },
      { label: 'C', text: 'On the other hand,' },
      { label: 'D', text: 'Despite this,' },
    ],
    correctAnswer: 'B',
    explanation: `Choice B is the best answer. The first sentence establishes that cities are continuously reshaped by inhabitants' informal actions. The second sentence concludes from this that plans cannot fully contain these adaptive uses. "For this reason" signals that the second sentence is a logical consequence of the first — because informal action constantly reshapes cities, comprehensive plans inevitably fall short.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. "However" implies the second sentence contradicts the first; but the inability of plans to contain informal action follows from the first sentence rather than opposing it.`,
      C: `Choice C is incorrect. "On the other hand" introduces an alternative perspective; the second sentence draws a conclusion from the first, not an alternative.`,
      D: `Choice D is incorrect. "Despite this" implies the conclusion holds despite the informal reshaping described — illogical, since that reshaping is precisely why plans fail.`,
    },
  },

  // ── Standard English Conventions (2) ───────────────────────────────────────

  {
    id: 'rw2h-26',
    section: 'reading-writing',
    moduleId: 'rw-module-2-hard',
    domain: 'Standard English Conventions',
    skill: 'Boundaries',
    difficulty: 'hard',
    stimulus: ``,
    question: `The architect's vision was bold and unconventional _______ critics who expected a traditional design were surprised by the finished structure.`,
    choices: [
      { label: 'A', text: '; critics' },
      { label: 'B', text: ', critics' },
      { label: 'C', text: ', and critics' },
      { label: 'D', text: ': critics' },
    ],
    correctAnswer: 'A',
    explanation: `Choice A is the best answer. The sentence contains two independent clauses: "The architect's vision was bold and unconventional" and "critics who expected a traditional design were surprised by the finished structure." A semicolon correctly joins two independent clauses without a coordinating conjunction. Choice A (semicolon before "critics") is the only grammatically correct option.`,
    wrongAnswerExplanations: {
      B: `Choice B is incorrect. Using only a comma to join two independent clauses creates a comma splice.`,
      C: `Choice C is incorrect. "And" with a comma could work to join independent clauses, but "and critics who expected a traditional design were surprised" adds an awkward logical relationship — "and" implies coordination of equal weight, but the second clause is a consequence of the first. More importantly, Choice A is cleaner and more precise.`,
      D: `Choice D is incorrect. A colon introduces a list, explanation, or elaboration; the second clause here is a related but independent statement, not a direct elaboration.`,
    },
  },

  {
    id: 'rw2h-27',
    section: 'reading-writing',
    moduleId: 'rw-module-2-hard',
    domain: 'Standard English Conventions',
    skill: 'Form, Structure, and Sense',
    difficulty: 'hard',
    stimulus: ``,
    question: `The committee will not approve the proposal unless each member _______ the full technical report before the meeting.`,
    choices: [
      { label: 'A', text: 'have reviewed' },
      { label: 'B', text: 'had reviewed' },
      { label: 'C', text: 'has reviewed' },
      { label: 'D', text: 'reviewed' },
    ],
    correctAnswer: 'C',
    explanation: `Choice C is the best answer. "Each member" is a singular subject, so it requires a singular verb. "Has reviewed" is present perfect singular, which fits the context: the review must be completed (perfect aspect) before the meeting (implying prior action relative to a future event). The committee's approval (future) depends on something that must have happened before that point.`,
    wrongAnswerExplanations: {
      A: `Choice A is incorrect. "Have reviewed" is plural, but "each member" is grammatically singular.`,
      B: `Choice B is incorrect. "Had reviewed" is past perfect, which implies the action was completed before another past event. The context is future, not past.`,
      D: `Choice D is incorrect. Simple past "reviewed" does not capture the requirement that review must be complete before the future meeting.`,
    },
  },
]
