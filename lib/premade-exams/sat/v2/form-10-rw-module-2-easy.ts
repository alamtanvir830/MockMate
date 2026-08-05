import type { RWQuestion } from '../types'

export const f10RwModule2EasyQuestionsV2: RWQuestion[] = [
  // ─── Q01 · Craft and Structure · Words in Context · easy ──────────────────────
  {
    id: 'sat-f10-v2-rw-m2e-q01',
    section: 'reading-writing',
    moduleId: 'f10v2-rw-module-2-easy',
    domain: 'Craft and Structure',
    skill: 'Words in Context',
    difficulty: 'easy',
    stimulus:
      'The new hospital policy was described as _______ because it addressed not only the immediate shortage of emergency staff but also the underlying scheduling conflicts, inadequate break-room facilities, and compensation gaps that had driven nurses to resign in the first place.',
    question:
      'Which choice completes the text with the most logical and precise word or phrase?',
    choices: [
      { label: 'A', text: 'provisional' },
      { label: 'B', text: 'comprehensive' },
      { label: 'C', text: 'punitive' },
      { label: 'D', text: 'redundant' },
    ],
    correctAnswer: 'B',
    explanation:
      '"Comprehensive" means covering all aspects of a problem rather than addressing only part of it. The policy tackled the immediate staffing shortage and also the structural causes behind nurse resignations — scheduling, facilities, and pay — making it all-encompassing in scope. The phrase "not only...but also" signals that the policy reached beyond a narrow fix to address multiple layers of the problem.',
    wrongAnswerExplanations: {
      A: '"Provisional" means temporary or subject to later revision. The passage emphasizes the depth of coverage across multiple problems, not the tentative or temporary nature of the solution.',
      C: '"Punitive" means intended to punish. Nothing in the passage suggests the policy penalized anyone; it introduced improvements to working conditions and compensation.',
      D: '"Redundant" means unnecessarily repetitive or superfluous. The policy introduced new measures to address previously unresolved problems, so it is the opposite of redundant.',
    },
  },

  // ─── Q02 · Expression of Ideas · Transitions · easy ──────────────────────────
  {
    id: 'sat-f10-v2-rw-m2e-q02',
    section: 'reading-writing',
    moduleId: 'f10v2-rw-module-2-easy',
    domain: 'Expression of Ideas',
    skill: 'Transitions',
    difficulty: 'easy',
    stimulus:
      'The giant sequoia is one of the longest-lived organisms on Earth, with some specimens exceeding three thousand years in age. _______ , the tree is remarkably resilient to fire: its thick, fibrous bark can withstand temperatures that would kill most other conifers, and fire actually helps the sequoia by clearing competing vegetation and opening its cones to release seeds.',
    question:
      'Which choice completes the text with the most logical transition?',
    choices: [
      { label: 'A', text: 'Therefore' },
      { label: 'B', text: 'Nevertheless' },
      { label: 'C', text: 'For instance' },
      { label: 'D', text: 'Moreover' },
    ],
    correctAnswer: 'D',
    explanation:
      '"Moreover" signals that the second sentence adds a further, equally significant point to what was already stated. The first sentence establishes the sequoia\'s remarkable longevity; the second introduces its fire resilience as an additional impressive quality. "Moreover" correctly marks this accumulation of remarkable traits rather than a contrast, consequence, or example of the first idea.',
    wrongAnswerExplanations: {
      A: '"Therefore" signals that the second sentence follows as a conclusion or result of the first. Fire resilience is not a logical result of longevity — it is a separate biological attribute that stands on its own.',
      B: '"Nevertheless" signals a contrast or a persistence despite opposition. Fire resilience does not contradict longevity; both are compatible and complementary characteristics of the same tree.',
      C: '"For instance" introduces a specific example of a general claim made in the preceding sentence. Fire resilience is an additional distinct property, not an illustration of the longevity claim.',
    },
  },

  // ─── Q03 · Craft and Structure · Words in Context · easy ──────────────────────
  {
    id: 'sat-f10-v2-rw-m2e-q03',
    section: 'reading-writing',
    moduleId: 'f10v2-rw-module-2-easy',
    domain: 'Craft and Structure',
    skill: 'Words in Context',
    difficulty: 'easy',
    stimulus:
      'The volunteer coordinator was praised for her _______ approach: she matched each volunteer to roles that aligned with their professional skills, checked in weekly to address any concerns, and adjusted assignments whenever a mismatch became apparent.',
    question:
      'Which choice completes the text with the most logical and precise word or phrase?',
    choices: [
      { label: 'A', text: 'attentive' },
      { label: 'B', text: 'impulsive' },
      { label: 'C', text: 'detached' },
      { label: 'D', text: 'formulaic' },
    ],
    correctAnswer: 'A',
    explanation:
      '"Attentive" describes someone who pays close, careful attention to the needs and circumstances of others. The coordinator matched volunteers to suitable roles, held regular check-ins, and adjusted assignments responsively — all behaviors that reflect sustained, careful attention to individuals. The colon signals that the following examples will define the blank.',
    wrongAnswerExplanations: {
      B: '"Impulsive" describes acting without deliberate thought or planning. The coordinator\'s careful skill-matching and weekly check-ins reflect deliberate planning rather than impulsive action.',
      C: '"Detached" describes emotional or practical distance from others. Conducting weekly check-ins and adjusting assignments to fix mismatches is the opposite of a detached approach.',
      D: '"Formulaic" means relying mechanically on a fixed formula without adaptation. The coordinator adapted assignments when mismatches arose, which is the opposite of applying a rigid formula.',
    },
  },

  // ─── Q04 · Expression of Ideas · Rhetorical Synthesis · easy ─────────────────
  {
    id: 'sat-f10-v2-rw-m2e-q04',
    section: 'reading-writing',
    moduleId: 'f10v2-rw-module-2-easy',
    domain: 'Expression of Ideas',
    skill: 'Rhetorical Synthesis',
    difficulty: 'easy',
    stimulus:
      'A student is writing a report on the history of public libraries in the United States. The student wants to emphasize how libraries have expanded their services beyond book lending. While researching, the student finds the following information:\n\n• The first free public library supported by municipal taxes opened in Boston in 1854, offering a collection of approximately 16,000 volumes.\n• Modern public libraries typically offer internet access, digital downloads of e-books and audiobooks, and streaming media services.\n• Many libraries now host financial literacy workshops, English-language learning classes, and job-search assistance programs.\n• In recent years, libraries in several cities have begun lending tools, seeds, and scientific equipment alongside traditional media.\n• Some urban library branches partner with social workers and mental health counselors who are available on-site to assist patrons.',
    question:
      'Which choice most effectively uses relevant information from the notes to accomplish the student\'s goal?',
    choices: [
      { label: 'A', text: 'Public libraries were established as book-lending institutions in the nineteenth century, beginning with the Boston Public Library in 1854.' },
      { label: 'B', text: 'Libraries now provide internet access and digital downloads, but their core mission of connecting people with information has remained constant since the nineteenth century.' },
      { label: 'C', text: 'Today\'s public libraries have moved far beyond book lending, offering digital media, job and language classes, tool and seed lending, and on-site social services.' },
      { label: 'D', text: 'Some libraries lend tools and seeds, while others partner with mental health counselors, reflecting the diverse communities they serve.' },
    ],
    correctAnswer: 'C',
    explanation:
      'The student\'s goal is to emphasize how libraries have expanded beyond book lending. Choice C synthesizes four distinct categories of expansion from the notes — digital media, educational programs, non-traditional lending, and social services — into a single sentence that directly fulfills the goal. It draws on the most relevant evidence across multiple notes to build a complete picture of that expansion.',
    wrongAnswerExplanations: {
      A: 'Choice A describes only the historical founding of public libraries, which provides context rather than evidence of expansion. It does not address the student\'s goal of highlighting how services have grown beyond book lending.',
      B: 'Choice B mentions digital access but then pivots to the idea of an unchanged core mission. This framing minimizes the expansion rather than emphasizing it, which contradicts the student\'s goal.',
      D: 'Choice D highlights only two of the more unusual expanded services — tools and mental health — and frames them as reflections of community diversity rather than as evidence of broad service expansion. It is too narrow to fully accomplish the goal.',
    },
  },

  // ─── Q05 · Information and Ideas · Central Ideas and Details · easy ───────────
  {
    id: 'sat-f10-v2-rw-m2e-q05',
    section: 'reading-writing',
    moduleId: 'f10v2-rw-module-2-easy',
    domain: 'Information and Ideas',
    skill: 'Central Ideas and Details',
    difficulty: 'easy',
    stimulus:
      'The mantis shrimp possesses one of the most extraordinary visual systems of any known animal. While humans have three types of color-detecting cone cells in their eyes, the mantis shrimp has sixteen. Researchers initially assumed this gave the creature far richer color vision than humans, but behavioral experiments revealed a paradox: mantis shrimp are actually worse than humans at distinguishing between similar colors. Scientists now believe the shrimp uses its sixteen receptors not to compare colors the way humans do but to recognize color categories with remarkable speed, functioning less like a camera and more like a bar-code scanner.',
    question:
      'Which choice best states the main idea of the passage?',
    choices: [
      { label: 'A', text: 'The mantis shrimp has more color receptors than any other animal, giving it the broadest range of perceivable colors in the natural world.' },
      { label: 'B', text: 'Despite having far more color receptors than humans, the mantis shrimp does not use them for richer color discrimination but for rapid categorical color recognition.' },
      { label: 'C', text: 'Behavioral experiments are the most reliable method for studying color vision in marine invertebrates such as the mantis shrimp.' },
      { label: 'D', text: 'The mantis shrimp\'s sixteen color receptors make it superior to humans in all visual tasks, including detecting camouflaged prey.' },
    ],
    correctAnswer: 'B',
    explanation:
      'The passage introduces the mantis shrimp\'s sixteen receptors, notes the initial assumption that this yields richer vision, and then reveals the surprising finding: behavioral tests show the shrimp is worse at distinguishing similar colors but uses its receptors for fast categorical recognition. Choice B captures both the surprising contrast between receptor count and color discrimination ability, and the actual function researchers identified — making it the most accurate statement of the main idea.',
    wrongAnswerExplanations: {
      A: 'The passage does not claim the mantis shrimp has the broadest range of perceivable colors; it states the shrimp is actually worse than humans at distinguishing similar colors, which contradicts the idea of broader perceptual range.',
      C: 'The value of behavioral experiments is mentioned as the means by which researchers discovered the paradox, but the passage is about the mantis shrimp\'s visual system, not about experimental methodology.',
      D: 'The passage explicitly states that mantis shrimp are worse than humans at distinguishing similar colors, which directly contradicts the claim that they are superior in all visual tasks.',
    },
  },

  // ─── Q06 · Craft and Structure · Words in Context · easy ──────────────────────
  {
    id: 'sat-f10-v2-rw-m2e-q06',
    section: 'reading-writing',
    moduleId: 'f10v2-rw-module-2-easy',
    domain: 'Craft and Structure',
    skill: 'Words in Context',
    difficulty: 'easy',
    stimulus:
      'The senator\'s speech was notable for being _______ : rather than appealing to party loyalty or emotional anecdotes, she cited three independent audits, two comparative studies from peer institutions, and a decade of outcome data to make her case for restructuring the pension system.',
    question:
      'Which choice completes the text with the most logical and precise word or phrase?',
    choices: [
      { label: 'A', text: 'sentimental' },
      { label: 'B', text: 'vague' },
      { label: 'C', text: 'theatrical' },
      { label: 'D', text: 'evidence-based' },
    ],
    correctAnswer: 'D',
    explanation:
      '"Evidence-based" describes an argument built on documented data and research rather than on opinion, emotion, or rhetoric. The senator cited audits, comparative studies, and a decade of outcome data — precisely the kind of empirical foundation that defines an evidence-based approach. The phrase "rather than" explicitly contrasts this data-driven style with emotional and partisan appeals, reinforcing what the blank must mean.',
    wrongAnswerExplanations: {
      A: '"Sentimental" describes an appeal to emotion or nostalgic feeling. The senator explicitly avoided emotional anecdotes, which is the opposite of a sentimental approach.',
      B: '"Vague" means lacking precision or specificity. The senator cited specific audits, studies, and ten years of data — an exceptionally precise approach rather than a vague one.',
      C: '"Theatrical" describes a style calculated for dramatic effect. Citing audits and outcome data is a deliberate departure from theatrical or emotional persuasion.',
    },
  },

  // ─── Q07 · Expression of Ideas · Transitions · easy ──────────────────────────
  {
    id: 'sat-f10-v2-rw-m2e-q07',
    section: 'reading-writing',
    moduleId: 'f10v2-rw-module-2-easy',
    domain: 'Expression of Ideas',
    skill: 'Transitions',
    difficulty: 'easy',
    stimulus:
      'Traditional brick-and-mortar bookstores declined sharply in number during the early 2000s as online retailers offered lower prices and faster delivery. _______ , many independent bookstores have found renewed success by hosting author events, book clubs, and curated gift selections that online platforms cannot easily replicate.',
    question:
      'Which choice completes the text with the most logical transition?',
    choices: [
      { label: 'A', text: 'In other words' },
      { label: 'B', text: 'As a result' },
      { label: 'C', text: 'However' },
      { label: 'D', text: 'Similarly' },
    ],
    correctAnswer: 'A',
    explanation:
      '"In other words" signals that the second sentence clarifies or restates in more specific terms what was implied by the first. The first sentence establishes that bookstores faced competitive pressure from online retail; the second specifies what survival in that environment actually looks like — a more concrete illustration of how the situation played out. "In other words" frames the revival strategy as the practical meaning of adapting to that competitive landscape.',
    wrongAnswerExplanations: {
      B: '"As a result" would imply that the revival followed directly as a consequence of the earlier decline, which oversimplifies the relationship. The revival came from deliberate strategic differentiation, not automatically from the decline itself.',
      C: '"However" signals a straightforward contrast and would suggest the two sentences oppose each other. The second sentence does not contradict the first but rather elaborates on how the situation evolved.',
      D: '"Similarly" signals that both ideas share the same quality or direction. The two sentences describe opposite trends — decline and revival — so "similarly" is the least appropriate choice here.',
    },
  },

  // ─── Q08 · Information and Ideas · Command of Evidence (Textual) · easy ───────
  {
    id: 'sat-f10-v2-rw-m2e-q08',
    section: 'reading-writing',
    moduleId: 'f10v2-rw-module-2-easy',
    domain: 'Information and Ideas',
    skill: 'Command of Evidence',
    difficulty: 'easy',
    stimulus:
      'Sociologist Amara Osei argues that neighborhood safety is shaped more by residents\' trust in one another than by the presence of surveillance technology. She cites studies showing that blocks where neighbors greet each other regularly, share information about suspicious activity, and look after each other\'s children and property have lower rates of property crime even when those blocks have fewer security cameras than comparable blocks with higher crime rates. Osei concludes that social cohesion functions as a more durable crime deterrent than hardware-based monitoring.',
    question:
      'Which choice identifies evidence from the passage that most directly supports Osei\'s claim that social cohesion reduces crime more effectively than surveillance technology?',
    choices: [
      { label: 'A', text: 'The claim that blocks with strong neighborly interaction have lower property crime rates even when they have fewer cameras than higher-crime blocks.' },
      { label: 'B', text: 'Osei\'s general argument that trust among residents matters more than technology.' },
      { label: 'C', text: 'The observation that surveillance cameras are present in both low-crime and high-crime neighborhoods.' },
      { label: 'D', text: 'The description of specific neighborly behaviors such as greeting residents and watching each other\'s children.' },
    ],
    correctAnswer: 'C',
    explanation:
      'The key claim is that social cohesion outperforms surveillance technology as a crime deterrent. The observation that cameras exist in both low-crime and high-crime neighborhoods most directly undermines the case for cameras: their presence does not distinguish safe blocks from unsafe ones. This evidence isolates the camera variable and shows it does not drive outcomes, which directly supports the comparative claim that something other than surveillance — namely social cohesion — is the more effective deterrent.',
    wrongAnswerExplanations: {
      A: 'Choice A blends social behavior data with the camera comparison, making it a broader claim rather than a focused piece of evidence about the camera variable specifically.',
      B: 'Osei\'s general argument is the claim being tested, not evidence for it. Restating the conclusion does not constitute evidence supporting it.',
      D: 'The specific neighborly behaviors establish what social cohesion looks like in practice, but they do not by themselves demonstrate that social cohesion outperforms cameras — they describe the independent variable without showing the comparative outcome.',
    },
  },

  // ─── Q09 · Standard English Conventions · Boundaries · easy ──────────────────
  {
    id: 'sat-f10-v2-rw-m2e-q09',
    section: 'reading-writing',
    moduleId: 'f10v2-rw-module-2-easy',
    domain: 'Standard English Conventions',
    skill: 'Boundaries',
    difficulty: 'easy',
    stimulus:
      'The glaciologist had been collecting ice core samples from the same site for fifteen years _______ her instruments recorded an anomalous temperature spike that suggested the glacier was melting far faster than previous models had predicted.',
    question:
      'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { label: 'A', text: '; when' },
      { label: 'B', text: ', when' },
      { label: 'C', text: 'when' },
      { label: 'D', text: '. When' },
    ],
    correctAnswer: 'B',
    explanation:
      '"When" is a subordinating conjunction that introduces a temporal clause marking the moment of discovery. A comma before "when" correctly sets off the main clause from the subordinate temporal clause. The sentence reads: "The glaciologist had been collecting ice core samples from the same site for fifteen years, when her instruments recorded an anomalous temperature spike." The comma signals the boundary between the duration of background activity and the moment of the surprising event.',
    wrongAnswerExplanations: {
      A: 'A semicolon is used to separate two independent clauses. "When her instruments recorded an anomalous temperature spike..." is a subordinate clause, not an independent clause, so a semicolon is not the appropriate punctuation here.',
      C: 'Omitting all punctuation runs the main clause and the temporal subordinate clause together without any boundary marker, making it difficult for readers to identify where the main clause ends and the subordinate clause begins.',
      D: 'A period followed by a capital "When" creates a fragment: "When her instruments recorded an anomalous temperature spike that suggested the glacier was melting far faster than previous models had predicted." This subordinate clause has no main clause and cannot stand alone as a complete sentence.',
    },
  },

  // ─── Q10 · Craft and Structure · Words in Context · easy ──────────────────────
  {
    id: 'sat-f10-v2-rw-m2e-q10',
    section: 'reading-writing',
    moduleId: 'f10v2-rw-module-2-easy',
    domain: 'Craft and Structure',
    skill: 'Words in Context',
    difficulty: 'easy',
    stimulus:
      'The editor described the submitted manuscript as _______ : nearly every paragraph introduced a new character, subtheme, or anecdote that seemed unrelated to the central argument, and the conclusion drew on sources that had never been mentioned in the preceding chapters.',
    question:
      'Which choice completes the text with the most logical and precise word or phrase?',
    choices: [
      { label: 'A', text: 'concise' },
      { label: 'B', text: 'derivative' },
      { label: 'C', text: 'tentative' },
      { label: 'D', text: 'unfocused' },
    ],
    correctAnswer: 'D',
    explanation:
      '"Unfocused" describes writing that lacks a clear, sustained center — it wanders across topics without building coherently toward a unified point. A manuscript that constantly introduces unrelated characters, subthemes, and anecdotes, and ends with sources that were never introduced, has no disciplined focus. The colon introduces examples that demonstrate this quality of disorganization and aimlessness.',
    wrongAnswerExplanations: {
      A: '"Concise" means expressing ideas briefly and clearly without unnecessary material. A manuscript full of unrelated material wandering across paragraphs is by definition not concise.',
      B: '"Derivative" means unoriginal, closely resembling existing works. The passage criticizes the manuscript for structural incoherence, not for lack of originality.',
      C: '"Tentative" means uncertain or hesitant in tone. The passage criticizes the manuscript for structural scatter across topics, not for a lack of confidence in its assertions.',
    },
  },

  // ─── Q11 · Information and Ideas · Central Ideas and Details · medium ─────────
  {
    id: 'sat-f10-v2-rw-m2e-q11',
    section: 'reading-writing',
    moduleId: 'f10v2-rw-module-2-easy',
    domain: 'Information and Ideas',
    skill: 'Central Ideas and Details',
    difficulty: 'medium',
    stimulus:
      'The passenger pigeon was once the most abundant bird in North America, with flocks estimated at more than three billion individuals darkening the sky for hours as they passed overhead. Yet within roughly fifty years of large-scale commercial hunting, the species was extinct, with the last known individual dying in captivity in 1914. Ornithologists studying the collapse have noted that the pigeon\'s extinction was accelerated by a biological quirk: the bird depended on the presence of enormous flocks to trigger breeding. As population density dropped below a critical threshold, reproductive rates fell faster than hunting pressure alone could explain, creating a feedback loop that drove the remaining birds toward extinction even after hunting slowed.',
    question:
      'Which choice best states the main idea of the passage?',
    choices: [
      { label: 'A', text: 'Although the passenger pigeon was once extraordinarily numerous, its extinction was driven not only by hunting but also by a density-dependent breeding quirk that accelerated the collapse.' },
      { label: 'B', text: 'Commercial hunting of passenger pigeons was the single most important cause of the species\' extinction and provides a cautionary tale about overhunting migratory birds.' },
      { label: 'C', text: 'The passenger pigeon\'s extinction shows that once a bird species falls below a certain population size, no conservation effort can prevent it from disappearing.' },
      { label: 'D', text: 'The last passenger pigeon died in 1914, ending a species that had once been the most common bird on the continent, primarily because hunters targeted nesting colonies.' },
    ],
    correctAnswer: 'A',
    explanation:
      'The passage begins by establishing the pigeon\'s remarkable abundance and then explains its extinction as the product of two interacting forces: commercial hunting and a density-dependent breeding feedback loop. The passage concludes that reproductive rates fell faster than hunting pressure alone could explain, which means hunting was necessary but not sufficient. Choice A captures both the initial abundance and the dual-cause explanation — making it the most accurate and complete statement of the main idea.',
    wrongAnswerExplanations: {
      B: 'The passage explicitly states that the feedback loop caused reproductive rates to fall faster than hunting pressure alone could explain, which means the passage does not identify hunting as the single most important cause.',
      C: 'The passage does not make a general claim about all bird species or about the impossibility of conservation once a threshold is crossed. It describes a specific biological mechanism unique to the passenger pigeon\'s social breeding behavior.',
      D: 'Choice D mentions the 1914 date and hints at colony hunting but frames hunting as the primary driver and omits the density-dependent breeding collapse, which is central to the passage\'s argument about the cause of extinction.',
    },
  },

  // ─── Q12 · Craft and Structure · Text Structure and Purpose · medium ──────────
  {
    id: 'sat-f10-v2-rw-m2e-q12',
    section: 'reading-writing',
    moduleId: 'f10v2-rw-module-2-easy',
    domain: 'Craft and Structure',
    skill: 'Text Structure and Purpose',
    difficulty: 'medium',
    stimulus:
      'The discovery of the Antikythera mechanism in 1901 produced a century of puzzlement. Recovered from a Roman-era shipwreck off the Greek island of Antikythera, the corroded bronze device sat in storage at the National Archaeological Museum in Athens for decades before scholars recognized it as a mechanical calculator for predicting astronomical events. Even after its function was established, researchers debated its origin, the civilization that built it, and whether it was a unique prototype or one of many. Modern X-ray tomography and computational modeling have now revealed its full gear train with sufficient resolution to allow working replicas to be built, settling most of the longstanding questions about the device\'s mechanics while leaving open deeper questions about the technological tradition it represented.',
    question:
      'Which choice best describes the overall structure of the passage?',
    choices: [
      { label: 'A', text: 'It describes an artifact\'s initial obscurity, traces the gradual resolution of key questions about it, and notes which questions remain open.' },
      { label: 'B', text: 'It argues that ancient Greek technology was more advanced than historians previously recognized, using the Antikythera mechanism as the central piece of evidence.' },
      { label: 'C', text: 'It presents a series of competing scholarly debates about the Antikythera mechanism and describes how modern analysis resolved some while leaving others open.' },
      { label: 'D', text: 'It provides a chronological account of the discovery and raising of the shipwreck, followed by a description of how the mechanism was conserved.' },
    ],
    correctAnswer: 'C',
    explanation:
      'The passage presents a series of scholarly debates: first about the device\'s function (what it was), then about its origin, the civilization that built it, and whether it was unique. It then describes how modern X-ray tomography and computational modeling resolved the mechanical questions while leaving open the broader cultural and technological questions. Choice C accurately captures this structure of contested questions followed by partial resolution.',
    wrongAnswerExplanations: {
      A: 'While Choice A traces a movement from obscurity to resolution, it misses the central structural feature of the passage: the accumulation of specific scholarly debates and the distinction between what modern analysis settled and what it did not.',
      B: 'The passage does not argue a thesis about the superiority of ancient Greek technology. It describes one specific artifact\'s contested scholarly history without making a broader comparative argument.',
      D: 'The passage does not describe the process of raising the shipwreck or the conservation of the mechanism. It focuses on the intellectual history of understanding the device, not on archaeological fieldwork.',
    },
  },

  // ─── Q13 · Expression of Ideas · Transitions · medium ────────────────────────
  {
    id: 'sat-f10-v2-rw-m2e-q13',
    section: 'reading-writing',
    moduleId: 'f10v2-rw-module-2-easy',
    domain: 'Expression of Ideas',
    skill: 'Transitions',
    difficulty: 'medium',
    stimulus:
      'Early aviation pioneers focused almost entirely on achieving powered, controlled flight — a goal so difficult that questions of passenger comfort, cargo capacity, and navigational range were deliberately set aside. _______ , once reliable flight had been demonstrated, engineers turned their attention to making aircraft practical for commercial and military use, which required solving the very problems of endurance, payload, and weather tolerance that the first pioneers had deferred.',
    question:
      'Which choice completes the text with the most logical transition?',
    choices: [
      { label: 'A', text: 'By contrast' },
      { label: 'B', text: 'For instance' },
      { label: 'C', text: 'Subsequently' },
      { label: 'D', text: 'Therefore' },
    ],
    correctAnswer: 'B',
    explanation:
      '"For instance" introduces the second sentence as an illustration of a broader pattern: the first sentence establishes that early pioneers deliberately deferred practical problems; the second specifies what that deferral looked like in practice — a next generation of engineers who had to solve exactly those deferred problems. "For instance" frames the shift to practical engineering as a concrete example of how aviation development proceeded in stages of sequential problem-solving.',
    wrongAnswerExplanations: {
      A: '"By contrast" signals direct opposition between the two ideas. The second sentence does not contradict the first but continues the same developmental story — the problems deferred in phase one became the focus of phase two.',
      C: '"Subsequently" marks only chronological succession without conveying the logical relationship between the pioneers\' deliberate deferral and the next generation\'s targeted response to those same deferred problems.',
      D: '"Therefore" implies the shift to practical engineering was a logical conclusion caused by the first sentence. While the shift followed logically, "for instance" more accurately frames the second sentence as illustrating the nature of the staged development rather than as its direct result.',
    },
  },

  // ─── Q14 · Information and Ideas · Inferences · medium ───────────────────────
  {
    id: 'sat-f10-v2-rw-m2e-q14',
    section: 'reading-writing',
    moduleId: 'f10v2-rw-module-2-easy',
    domain: 'Information and Ideas',
    skill: 'Inferences',
    difficulty: 'medium',
    stimulus:
      'The Polynesian navigators who crossed the Pacific centuries before European contact did so without compasses, sextants, or written charts. They read the ocean itself: the behavior of swells, which travel great distances and maintain consistent directional signatures; the flight patterns of birds, which indicate landmasses within roughly two hundred kilometers; the color and temperature of water; and the position of stars whose rising and setting points they had memorized over generations. Anthropologists who have studied oral navigational traditions note that this knowledge was passed from master to apprentice through voyages, chants, and physical sensation rather than through text.',
    question:
      'Based on the passage, what can most reasonably be inferred about Polynesian navigational knowledge?',
    choices: [
      { label: 'A', text: 'Polynesian navigation was superior to European navigation because it did not depend on technology that could be lost or broken at sea.' },
      { label: 'B', text: 'The transmission of Polynesian navigational knowledge relied on embodied practice and memorized tradition rather than written records.' },
      { label: 'C', text: 'Polynesian navigators were unaware of European navigational methods and therefore had no opportunity to incorporate them into their own practice.' },
      { label: 'D', text: 'Polynesian navigation depended on environmental cues that required direct, long-term experiential training rather than instrument-based instruction.' },
    ],
    correctAnswer: 'D',
    explanation:
      'The passage describes Polynesian navigators reading swells, bird flight patterns, water color and temperature, and star positions — all environmental cues that cannot be learned from a manual or a classroom. The final sentence confirms that this knowledge was transmitted through voyages and physical sensation rather than text. The inference that this kind of navigation required direct, long-term experiential training rather than instrument-based instruction follows directly from these details.',
    wrongAnswerExplanations: {
      A: 'The passage does not compare Polynesian and European navigational effectiveness or argue that one system was superior to the other. It describes Polynesian methods without making a comparative judgment.',
      B: 'While supported by the passage\'s final sentence about oral transmission, this choice captures only the transmission mechanism and not the broader inference about why experiential training was necessary — making it less complete than Choice D.',
      C: 'The passage makes no reference to Polynesian awareness or unawareness of European navigational techniques. The passage focuses on what Polynesian navigators used, not on cross-cultural knowledge exchange.',
    },
  },

  // ─── Q15 · Information and Ideas · Command of Evidence (Quantitative) · medium ─
  {
    id: 'sat-f10-v2-rw-m2e-q15',
    section: 'reading-writing',
    moduleId: 'f10v2-rw-module-2-easy',
    domain: 'Information and Ideas',
    skill: 'Command of Evidence',
    difficulty: 'medium',
    stimulus:
      'A researcher studying workplace productivity surveyed employees at four companies about their weekly hours in scheduled meetings and their self-reported productivity score on a scale of 1 to 10. She hypothesized that employees who spent fewer hours per week in meetings would report higher productivity scores.',
    graphData: {
      type: 'table',
      title: 'Weekly Meeting Hours and Productivity Scores by Company',
      headers: ['Company', 'Avg. Weekly Meeting Hours', 'Avg. Productivity Score (1–10)'],
      rows: [
        ['Caldwell Inc.', '3.0', '8.1'],
        ['Dune Partners', '5.5', '6.4'],
        ['Eston Group', '8.0', '5.2'],
        ['Fairway Co.', '11.5', '4.0'],
      ],
    },
    question:
      'Which choice best describes the data in the table as they relate to the researcher\'s hypothesis?',
    choices: [
      { label: 'A', text: 'The data support the hypothesis: across all four companies, higher meeting hours correspond to lower productivity scores.' },
      { label: 'B', text: 'The data contradict the hypothesis because Fairway Co., the company with the most meeting hours, also has the most employees.' },
      { label: 'C', text: 'The data are inconclusive because productivity is influenced by factors not measured in the survey.' },
      { label: 'D', text: 'The data partially support the hypothesis: meeting hours and productivity are related at Caldwell Inc. and Dune Partners but not at the other two companies.' },
    ],
    correctAnswer: 'A',
    explanation:
      'The researcher hypothesized that fewer meeting hours would correspond to higher productivity. The table shows a consistent pattern: Caldwell Inc. (3.0 hours, score 8.1), Dune Partners (5.5 hours, score 6.4), Eston Group (8.0 hours, score 5.2), and Fairway Co. (11.5 hours, score 4.0). In every case, more meeting hours correspond to a lower productivity score. This pattern directly and fully supports the hypothesis across all four data points.',
    wrongAnswerExplanations: {
      B: 'The table provides no data about company size or number of employees. Introducing employee count as a factor imports information that does not appear anywhere in the data presented.',
      C: 'While productivity may be influenced by unmeasured factors in reality, the question asks about the relationship between the data as presented and the hypothesis. The data show a clear, consistent directional pattern that directly supports the hypothesis.',
      D: 'The relationship holds consistently across all four companies, not just two. Eston Group (8.0 hours, score 5.2) and Fairway Co. (11.5 hours, score 4.0) continue the same pattern, so there is no basis for saying the relationship breaks down at those companies.',
    },
  },

  // ─── Q16 · Standard English Conventions · Boundaries · medium ────────────────
  {
    id: 'sat-f10-v2-rw-m2e-q16',
    section: 'reading-writing',
    moduleId: 'f10v2-rw-module-2-easy',
    domain: 'Standard English Conventions',
    skill: 'Boundaries',
    difficulty: 'medium',
    stimulus:
      'The archaeologist had catalogued more than four hundred artifacts from the site _______ she realized that a clay tablet in the collection, previously classified as a storage tag, bore a sequence of marks that matched no known administrative script and might represent an entirely different writing system.',
    question:
      'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { label: 'A', text: ', but then' },
      { label: 'B', text: 'but then' },
      { label: 'C', text: '; when' },
      { label: 'D', text: 'when' },
    ],
    correctAnswer: 'C',
    explanation:
      '"When" introduces a temporal subordinate clause marking the moment of realization. A semicolon before "when" provides the appropriate boundary between the main clause — describing completed cataloguing work — and the subordinate temporal clause describing the discovery. This construction correctly signals the shift from background activity to the pivotal moment without creating a fragment or a fused sentence.',
    wrongAnswerExplanations: {
      A: '", but then" treats the realization clause as an independent clause in contrast to the cataloguing. While possible grammatically, "but" implies adversarial contrast where temporal succession followed by unexpected discovery is the more precise relationship — making the semicolon-when construction more accurate.',
      B: '"but then" without a comma before it omits required punctuation for joining two independent clauses with a coordinating conjunction, creating a fused construction that violates Standard English conventions.',
      D: '"when" without any preceding punctuation fuses the main clause and the subordinate clause without a boundary marker, making it difficult for readers to identify where the main clause ends and the temporal clause begins.',
    },
  },

  // ─── Q17 · Craft and Structure · Words in Context · medium ───────────────────
  {
    id: 'sat-f10-v2-rw-m2e-q17',
    section: 'reading-writing',
    moduleId: 'f10v2-rw-module-2-easy',
    domain: 'Craft and Structure',
    skill: 'Words in Context',
    difficulty: 'medium',
    stimulus:
      'The product launch was described by the marketing director as _______ : every feature that had been promised in the preview campaign was present at launch, pricing matched the figures announced months earlier, and the distribution timeline the company had outlined was met without delay.',
    question:
      'Which choice completes the text with the most logical and precise word or phrase?',
    choices: [
      { label: 'A', text: 'innovative' },
      { label: 'B', text: 'transparent' },
      { label: 'C', text: 'costly' },
      { label: 'D', text: 'controversial' },
    ],
    correctAnswer: 'B',
    explanation:
      '"Transparent" describes a process in which all commitments, terms, and timelines are made visible and then honored exactly as stated. The launch matched the promised features, the previewed pricing, and the announced timeline precisely — each detail had been disclosed in advance and was then delivered without alteration. This alignment between what was said publicly and what was delivered is the defining quality of transparency. The colon introduces examples that demonstrate this openness and faithfulness to prior commitments.',
    wrongAnswerExplanations: {
      A: '"Innovative" means introducing new ideas or methods. The passage describes the accuracy with which existing promises were fulfilled, not the novelty or originality of the product itself.',
      C: '"Costly" refers to financial expense. The passage does not discuss the cost of the launch; it describes how precisely the launch matched prior public commitments.',
      D: '"Controversial" describes something that provokes disagreement or public debate. A launch that delivers exactly what was promised and on the stated timeline would be unlikely to generate controversy.',
    },
  },

  // ─── Q18 · Craft and Structure · Text Structure and Purpose · medium ──────────
  {
    id: 'sat-f10-v2-rw-m2e-q18',
    section: 'reading-writing',
    moduleId: 'f10v2-rw-module-2-easy',
    domain: 'Craft and Structure',
    skill: 'Text Structure and Purpose',
    difficulty: 'medium',
    stimulus:
      'In 1962, mathematician and meteorologist Edward Lorenz discovered, largely by accident, that tiny differences in the initial conditions of a weather simulation produced wildly divergent outcomes over time. The finding challenged the prevailing assumption that a sufficiently detailed model of atmospheric conditions could produce reliable long-range forecasts. Other scientists were initially skeptical, but within two decades Lorenz\'s work had become the foundation of chaos theory — a mathematical framework now applied in fields ranging from ecology to economics. The concept of sensitive dependence on initial conditions, popularly known as the butterfly effect, remains one of the most widely referenced ideas to cross from technical mathematics into public discourse.',
    question:
      'What is the primary purpose of the passage?',
    choices: [
      { label: 'A', text: 'To argue that weather forecasting is fundamentally unreliable and should not be trusted for decisions with serious consequences.' },
      { label: 'B', text: 'To trace the origin of a scientific discovery, describe the resistance it faced, and explain its lasting influence across disciplines.' },
      { label: 'C', text: 'To contrast Lorenz\'s mathematical approach to weather modeling with the atmospheric methods preferred by his contemporaries.' },
      { label: 'D', text: 'To make a complex mathematical concept accessible and meaningful to readers without a background in mathematics or meteorology.' },
    ],
    correctAnswer: 'D',
    explanation:
      'The passage introduces Lorenz\'s discovery in plain, non-technical terms, explains what sensitive dependence on initial conditions means in accessible language, and closes by naming the concept the "butterfly effect" — the widely recognized public label. Every structural choice serves the purpose of making an advanced mathematical idea comprehensible and significant to a general audience rather than a specialist one. The passage does not require technical knowledge to follow and is clearly written to bridge that gap.',
    wrongAnswerExplanations: {
      A: 'The passage does not argue that weather forecasting is unreliable or urge readers to distrust it. It describes one finding about the limits of long-range modeling as part of a broader intellectual history, not as a warning about applied forecasting.',
      B: 'While Choice B accurately describes the passage\'s content, it identifies the organizational structure rather than the communicative purpose. The passage is constructed to make the concept understandable to non-specialists, which is the purpose that explains every choice made in presenting the material.',
      C: 'The passage does not contrast Lorenz\'s methods with those of his contemporaries in technical detail. It mentions that scientists were initially skeptical but does not outline competing methodological approaches.',
    },
  },

  // ─── Q19 · Expression of Ideas · Transitions · medium ────────────────────────
  {
    id: 'sat-f10-v2-rw-m2e-q19',
    section: 'reading-writing',
    moduleId: 'f10v2-rw-module-2-easy',
    domain: 'Expression of Ideas',
    skill: 'Transitions',
    difficulty: 'medium',
    stimulus:
      'For most of human history, the pace of technological change was slow enough that a craftsman could learn a trade in youth and practice it with relatively little adaptation for the rest of a working life. Machines, techniques, and materials evolved gradually, and the accumulated expertise of experienced workers retained its value for decades. _______ , in many industries today the pace of technological change accelerates faster than a single career can track, requiring workers to continuously acquire new skills rather than refine a stable set of established ones.',
    question:
      'Which choice completes the text with the most logical transition?',
    choices: [
      { label: 'A', text: 'Similarly' },
      { label: 'B', text: 'In other words' },
      { label: 'C', text: 'For this reason' },
      { label: 'D', text: 'Nevertheless' },
    ],
    correctAnswer: 'A',
    explanation:
      '"Similarly" signals that the third sentence runs parallel to the preceding sentences in a structurally related way. The first two sentences describe the relationship between technological pace and worker adaptation in the historical era; the third sentence describes the same relationship — between technological pace and what workers must do — in the modern era. "Similarly" marks this parallel structure: in both periods, the pace of change determines how workers must orient their learning, even though the specific demands differ.',
    wrongAnswerExplanations: {
      B: '"In other words" signals a restatement or clarification of what was already said. The third sentence introduces a new, contrasting situation rather than rephrasing what was established about gradual historical change.',
      C: '"For this reason" implies the rapid modern pace of change was caused by the slow historical pace described in the preceding sentences. These are not in a causal relationship; they are contrasting states separated by time and context.',
      D: '"Nevertheless" signals that what follows persists despite something stated before, implying a concession or counter-expectation. The third sentence is not a concession to the historical picture but a parallel description of the present dynamic.',
    },
  },

  // ─── Q20 · Information and Ideas · Command of Evidence (Textual) · medium ─────
  {
    id: 'sat-f10-v2-rw-m2e-q20',
    section: 'reading-writing',
    moduleId: 'f10v2-rw-module-2-easy',
    domain: 'Information and Ideas',
    skill: 'Command of Evidence',
    difficulty: 'medium',
    stimulus:
      'Marine biologist Dr. Suki Tanaka argues that ocean noise pollution from commercial shipping is disrupting the communication of baleen whales at the population level. She points out that blue whales have progressively shifted their song frequencies to lower pitches over the past five decades — a shift that correlates precisely with the increasing low-frequency noise produced by diesel-powered container ships. Tanaka argues that because blue whale song carries reproductive and social information across hundreds of kilometers, interference with song transmission could reduce mating success across entire ocean basins.',
    question:
      'Which choice identifies evidence from the passage that most directly supports Tanaka\'s claim that shipping noise disrupts whale communication?',
    choices: [
      { label: 'A', text: 'The observation that baleen whales sing to communicate reproductive and social information across hundreds of kilometers.' },
      { label: 'B', text: 'The finding that blue whale song frequencies have shifted lower over fifty years in a pattern that correlates with the increasing noise produced by container ships.' },
      { label: 'C', text: 'Tanaka\'s prediction that interference with song transmission could reduce mating success across entire ocean basins.' },
      { label: 'D', text: 'The general claim that ocean noise pollution from commercial shipping is disrupting whale communication at the population level.' },
    ],
    correctAnswer: 'C',
    explanation:
      'Tanaka\'s central claim is population-level disruption of whale communication. Her prediction that interference with song transmission could reduce mating success across entire ocean basins is the evidence that most directly operationalizes what population-level disruption would actually mean: a measurable, concrete consequence — reduced mating success — affecting whales across an entire ocean. This prediction translates the abstract claim into a specific, testable population-level outcome, making it the most direct support for the claim as stated.',
    wrongAnswerExplanations: {
      A: 'The fact that whale song carries reproductive information establishes why song disruption would be consequential, but it does not itself constitute evidence that shipping noise disrupts that communication.',
      B: 'The frequency shift and its correlation with ship noise show that whales are changing their behavior in response to noise. This is strong evidence of behavioral impact but describes the mechanism rather than the population-level communication disruption that is the specific claim.',
      D: 'Choice D restates Tanaka\'s main claim rather than identifying evidence for it. A claim cannot function as evidence in support of itself.',
    },
  },

  // ─── Q21 · Standard English Conventions · Form, Structure, and Sense · medium ─
  {
    id: 'sat-f10-v2-rw-m2e-q21',
    section: 'reading-writing',
    moduleId: 'f10v2-rw-module-2-easy',
    domain: 'Standard English Conventions',
    skill: 'Form, Structure, and Sense',
    difficulty: 'medium',
    stimulus:
      'The committee of senior engineers _______ the revised safety protocols and determined that two of the proposed changes required additional testing before they could be implemented on active construction sites.',
    question:
      'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { label: 'A', text: 'were reviewing' },
      { label: 'B', text: 'reviewed' },
      { label: 'C', text: 'have reviewed' },
      { label: 'D', text: 'are reviewing' },
    ],
    correctAnswer: 'B',
    explanation:
      'The sentence describes a completed past action: the committee reviewed the protocols and made a determination. The simple past tense "reviewed" is correct because it describes a discrete completed event. The second clause — "determined that two of the proposed changes required additional testing" — is also in the simple past, so "reviewed" maintains tense consistency throughout the sentence.',
    wrongAnswerExplanations: {
      A: '"Were reviewing" is the past progressive, indicating an action that was ongoing at a particular past moment. The sentence describes a completed review and a resulting determination, not an action that was in progress at a specific past point.',
      C: '"Have reviewed" is the present perfect, indicating a past action with continuing relevance to the present. The sentence narrates a fully completed past episode with no implied connection to the present moment.',
      D: '"Are reviewing" is the present progressive, indicating an action currently in progress. The second clause uses "determined" and "required" in the simple past, establishing that the described events are completed past actions.',
    },
  },

  // ─── Q22 · Craft and Structure · Words in Context · medium ───────────────────
  {
    id: 'sat-f10-v2-rw-m2e-q22',
    section: 'reading-writing',
    moduleId: 'f10v2-rw-module-2-easy',
    domain: 'Craft and Structure',
    skill: 'Words in Context',
    difficulty: 'medium',
    stimulus:
      'In her study of the medieval wool trade, historian Fatima El-Rashid describes the Flemish cloth merchants as _______ operators: they maintained trade networks that stretched from English sheep farms to Ottoman bazaars, negotiated contracts in at least five languages, and adjusted their supply chains in response to political disruptions that would have paralyzed less adaptable traders.',
    question:
      'Which choice completes the text with the most logical and precise word or phrase?',
    choices: [
      { label: 'A', text: 'cautious' },
      { label: 'B', text: 'isolated' },
      { label: 'C', text: 'inefficient' },
      { label: 'D', text: 'sophisticated' },
    ],
    correctAnswer: 'D',
    explanation:
      '"Sophisticated" describes a level of complexity, refinement, and competence that goes well beyond the ordinary. Operating networks from England to the Ottoman Empire, conducting multilingual negotiations, and dynamically adjusting supply chains in response to political disruption are all markers of highly developed business acumen and organizational complexity. The colon introduces examples that establish this level of sophistication directly.',
    wrongAnswerExplanations: {
      A: '"Cautious" means careful and risk-averse. Merchants who maintained transcontinental networks and adapted rapidly to political disruptions were agile risk-takers rather than cautious, conservative operators.',
      B: '"Isolated" describes a lack of connections or independence from broader networks. Merchants with trade networks spanning England to Ottoman markets were by definition connected rather than isolated.',
      C: '"Inefficient" describes a failure to make good use of resources. Merchants who successfully managed complex multilingual, multi-country supply chains and adapted to disruptions were demonstrably efficient rather than inefficient.',
    },
  },

  // ─── Q23 · Information and Ideas · Inferences · medium ───────────────────────
  {
    id: 'sat-f10-v2-rw-m2e-q23',
    section: 'reading-writing',
    moduleId: 'f10v2-rw-module-2-easy',
    domain: 'Information and Ideas',
    skill: 'Inferences',
    difficulty: 'medium',
    stimulus:
      'In the early twentieth century, the city of Haussmann-era Paris was almost universally admired by urban planners and architects visiting from abroad. Its wide boulevards, coordinated facades, rational street grid, and integrated sewage and water infrastructure were seen as the model that modern cities should emulate. Within a few decades, however, critics began noting that the Haussmann renovation had displaced hundreds of thousands of working-class Parisians from central neighborhoods to the periphery, concentrating poverty at the city\'s edges. Later critics added that the uniformity celebrated as aesthetic harmony had been achieved by demolishing medieval neighborhoods of considerable historical and cultural richness.',
    question:
      'Based on the passage, what can most reasonably be inferred about how assessments of Haussmann\'s Paris changed over time?',
    choices: [
      { label: 'A', text: 'Later critics moved beyond admiration for the infrastructure to call attention to the social displacement and cultural destruction the renovation caused.' },
      { label: 'B', text: 'The shift from admiration to criticism shows that Haussmann\'s Paris was a technical success but an ethical failure judged by modern standards.' },
      { label: 'C', text: 'The initial admiration for Haussmann\'s Paris was based on a misunderstanding of its actual infrastructure, which later experts corrected.' },
      { label: 'D', text: 'Modern urban planners no longer consider Haussmann\'s Paris a useful model because its street design is incompatible with contemporary transportation needs.' },
    ],
    correctAnswer: 'A',
    explanation:
      'The passage describes an arc from near-universal admiration for the boulevards, grid, and infrastructure to a critical focus — first on the displacement of working-class residents and concentration of poverty, then on the destruction of medieval neighborhoods and their cultural richness. The inference that later critics moved beyond admiring the infrastructure to raising the social and cultural costs of the renovation follows directly and completely from this arc.',
    wrongAnswerExplanations: {
      B: 'The passage does not frame the shift as a judgment of "ethical failure by modern standards." It reports what critics noted — displacement and cultural loss — without applying a modern ethical framework or making a definitive verdict.',
      C: 'The passage does not suggest the initial admiration was based on a misunderstanding of the infrastructure itself. The boulevards, grid, and sewage systems were real achievements; the criticism focused on social and cultural costs, not on errors in understanding the infrastructure.',
      D: 'The passage does not discuss contemporary transportation needs or claim that modern planners have rejected the Haussmann model on practical grounds. The critics mentioned focus on social and historical concerns.',
    },
  },

  // ─── Q24 · Expression of Ideas · Rhetorical Synthesis · medium ───────────────
  {
    id: 'sat-f10-v2-rw-m2e-q24',
    section: 'reading-writing',
    moduleId: 'f10v2-rw-module-2-easy',
    domain: 'Expression of Ideas',
    skill: 'Rhetorical Synthesis',
    difficulty: 'medium',
    stimulus:
      'A student is writing a report on the history of sign language in the United States. The student wants to explain how the status of American Sign Language (ASL) changed significantly over the twentieth century. While researching, the student finds the following information:\n\n• In the early twentieth century, many schools for the deaf banned sign language in favor of oralism — the practice of teaching deaf students to speak and lip-read rather than sign.\n• The oralist approach was adopted following an 1880 international conference in Milan that was dominated by hearing educators and excluded deaf signers from the vote.\n• By the mid-twentieth century, many deaf adults who had been educated under oralism reported feeling educationally disadvantaged compared to peers who had learned to sign.\n• In 1960, linguist William Stokoe published research demonstrating that ASL was a complete, natural language with its own grammar — not a simplified code or manual version of English.\n• Following Stokoe\'s research and the advocacy of the deaf community, ASL gained recognition in academic and educational settings, and signing returned to many schools for the deaf.',
    question:
      'Which choice most effectively uses relevant information from the notes to accomplish the student\'s goal?',
    choices: [
      { label: 'A', text: 'ASL was suppressed in many schools during the early twentieth century, but William Stokoe\'s 1960 linguistic research and subsequent community advocacy helped restore its recognition and use in educational settings.' },
      { label: 'B', text: 'The 1880 Milan conference was dominated by hearing educators who voted to adopt oralism, which required deaf students to speak and read lips rather than sign.' },
      { label: 'C', text: 'Many deaf adults educated under oralism reported feeling disadvantaged compared to those who had learned to sign, and Stokoe\'s research demonstrated that ASL had its own complete grammar — evidence that helped shift its status from rejected code to recognized language.' },
      { label: 'D', text: 'ASL is a natural language with its own grammar, distinct from English, as William Stokoe demonstrated in his 1960 research, which became the basis for its academic recognition.' },
    ],
    correctAnswer: 'C',
    explanation:
      'The student\'s goal is to explain how the status of ASL changed significantly over the twentieth century. Choice C uses two specific pieces of evidence to explain that change: the human cost of oralism (the reported disadvantage) and the intellectual turning point (Stokoe\'s demonstration that ASL is a complete language). Crucially, it connects these to the outcome — the shift in ASL\'s status from rejected code to recognized language — making the explanation of change explicit and complete.',
    wrongAnswerExplanations: {
      A: 'Choice A accurately describes the arc of suppression followed by restoration, but it attributes the change primarily to Stokoe\'s research and community advocacy without explaining the evidence that justified the shift in status — which is what the student\'s goal requires.',
      B: 'Choice B describes only the historical cause of suppression (the Milan conference) without addressing the subsequent change in status that is the student\'s focus.',
      D: 'Choice D focuses on Stokoe\'s research and its academic consequences but does not convey the fuller arc — including the human cost of oralism and the process of status change — that the student\'s goal requires.',
    },
  },

  // ─── Q25 · Standard English Conventions · Boundaries · medium ────────────────
  {
    id: 'sat-f10-v2-rw-m2e-q25',
    section: 'reading-writing',
    moduleId: 'f10v2-rw-module-2-easy',
    domain: 'Standard English Conventions',
    skill: 'Boundaries',
    difficulty: 'medium',
    stimulus:
      'The research team had documented every species of amphibian in the wetland preserve _______ a fieldwork volunteer noticed a small, dark-spotted salamander clinging to a log in a section of the marsh that had never been formally surveyed.',
    question:
      'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { label: 'A', text: ', but' },
      { label: 'B', text: 'until' },
      { label: 'C', text: '; until' },
      { label: 'D', text: '. Until' },
    ],
    correctAnswer: 'B',
    explanation:
      '"Until" is a subordinating conjunction that introduces a temporal clause marking the point at which the preceding state of completeness was disrupted. "The research team had documented every species of amphibian in the wetland preserve until a fieldwork volunteer noticed a small, dark-spotted salamander..." — "until" precisely signals that the team\'s assumed completeness held right up to that moment of discovery. No comma before "until" is needed because the subordinate clause follows the main clause naturally.',
    wrongAnswerExplanations: {
      A: '", but" would make the discovery clause an independent clause joined to the main clause by a coordinating conjunction. While grammatically possible, "but" implies simple contrast, whereas "until" more precisely identifies the temporal limit of the team\'s assumed completeness, capturing both the boundary and the disruption in one word.',
      C: '"; until" places a semicolon before a subordinating conjunction. Semicolons separate independent clauses, but "until a fieldwork volunteer noticed..." introduces a subordinate clause, not an independent one, making the semicolon grammatically incorrect here.',
      D: '". Until a fieldwork volunteer noticed a small, dark-spotted salamander clinging to a log in a section of the marsh that had never been formally surveyed." This creates a fragment — a subordinate clause without a main clause — that cannot stand alone as a grammatically complete sentence.',
    },
  },

  // ─── Q26 · Craft and Structure · Cross-Text Connections · medium ──────────────
  {
    id: 'sat-f10-v2-rw-m2e-q26',
    section: 'reading-writing',
    moduleId: 'f10v2-rw-module-2-easy',
    domain: 'Craft and Structure',
    skill: 'Cross-Text Connections',
    difficulty: 'medium',
    stimulus:
      'Text 1\nEconomist Priya Mehta argues that universal basic income (UBI) programs would reduce the administrative costs associated with means-tested benefit systems by eliminating the need for eligibility verification, fraud investigation, and benefit-level calculation. She contends that the money saved on administration, combined with the reduced bureaucratic burden on households no longer required to document poverty to receive support, represents a significant efficiency gain that critics of UBI routinely undercount.\n\nText 2\nPolicy analyst Carlos Reyes acknowledges that UBI would simplify some administrative processes, but argues that the efficiency gains Mehta and others project are substantially overstated. He notes that any UBI program large enough to replace existing benefits would still require the infrastructure to verify residency, citizenship status, and the identities of millions of recipients — and that the cost of distributing payments to every adult in a large country is itself a massive ongoing administrative burden.',
    question:
      'Based on the texts, how would Reyes most likely respond to Mehta\'s claim that UBI would produce significant administrative efficiency gains?',
    choices: [
      { label: 'A', text: 'By acknowledging that some administrative simplification would occur but arguing that the projected gains are offset by the verification and distribution costs UBI still requires.' },
      { label: 'B', text: 'By arguing that Mehta\'s claim about efficiency gains is entirely wrong because UBI would create more administrative work than the means-tested system it replaces.' },
      { label: 'C', text: 'By contending that UBI would create new administrative burdens related to fraud that would exceed those of the means-tested system it replaced.' },
      { label: 'D', text: 'By suggesting that Mehta\'s analysis applies to small pilot programs but would not hold for a national UBI implemented at scale.' },
    ],
    correctAnswer: 'A',
    explanation:
      'Text 2 shows that Reyes takes a nuanced position: he "acknowledges that UBI would simplify some administrative processes" (a partial concession to Mehta) but argues the efficiency gains are "substantially overstated" because verification of residency, citizenship, and identity, plus nationwide payment distribution, represent significant ongoing administrative costs. Choice A captures both elements of Reyes\'s response — the acknowledgment of some simplification and the argument that remaining costs offset the projected gains.',
    wrongAnswerExplanations: {
      B: 'Reyes does not claim UBI would create more administrative work than the current system — only that the claimed efficiency gains are overstated. He concedes that some simplification would occur, which Choice B ignores.',
      C: 'Reyes does not specifically argue that fraud-related burdens would exceed those of means-tested systems. His concerns center on verification of residency, citizenship, and identity, and on distribution costs — not fraud prevention specifically.',
      D: 'Reyes does not limit his critique to pilot programs or distinguish between small-scale and national implementation. His argument about verification and distribution infrastructure applies to any UBI program large enough to replace existing benefits.',
    },
  },

  // ─── Q27 · Standard English Conventions · Form, Structure, and Sense · medium ─
  {
    id: 'sat-f10-v2-rw-m2e-q27',
    section: 'reading-writing',
    moduleId: 'f10v2-rw-module-2-easy',
    domain: 'Standard English Conventions',
    skill: 'Form, Structure, and Sense',
    difficulty: 'medium',
    stimulus:
      'Neither the project manager nor the two lead architects _______ the final blueprint before the city\'s building department submitted it for permit review, which meant that a critical drainage specification had gone unnoticed.',
    question:
      'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { label: 'A', text: 'has approved' },
      { label: 'B', text: 'were approving' },
      { label: 'C', text: 'have approved' },
      { label: 'D', text: 'had approved' },
    ],
    correctAnswer: 'D',
    explanation:
      '"Neither...nor" constructions use the subject closest to the verb to determine agreement. "The two lead architects" is plural, so the verb must be plural as well. The past perfect "had approved" is correct because the sentence describes an absence of action — the blueprint had not been approved — that preceded another specific past event (the submission for permit review). Past perfect establishes this prior-to-past sequence precisely: "Neither the project manager nor the two lead architects had approved the final blueprint before the city\'s building department submitted it."',
    wrongAnswerExplanations: {
      A: '"Has approved" is the third-person singular present perfect. The nearest subject "the two lead architects" is plural, requiring a plural verb form rather than the singular "has." Agreement alone disqualifies this choice.',
      B: '"Were approving" is the past progressive plural, which would indicate an ongoing past action. The sentence describes the absence of a completed approval before a specific past event, not an action that was in progress at that moment.',
      C: '"Have approved" is the present perfect plural. While the plurality is correct for agreement with "the two lead architects," the present perfect implies ongoing relevance to the present, whereas the sentence describes events entirely in the past and requires the past perfect to establish the sequence between the missing approval and the submission.',
    },
  },
]
