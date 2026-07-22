import type { AcademySkill } from '../types'

export const boundaries: AcademySkill = {
  slug: 'boundaries',
  title: 'Boundaries',
  section: 'writing',
  objective:
    'By the end of this lesson, you will be able to identify whether clauses are independent or dependent and select the punctuation or connecting word that produces a complete, correctly structured sentence.',
  estimatedMinutes: 22,
  subskills: [
    'Independent and Dependent Clauses',
    'Joining Independent Clauses',
    'Coordinating Conjunctions (FANBOYS)',
    'Subordinating Conjunctions',
    'Conjunctive Adverbs',
    'Colon Rules',
    'Dash and Nonessential Information',
    'Comma Splice and Run-on Correction',
    'Fragments',
  ],
  overview: {
    whatItTests:
      'Whether a sentence is correctly punctuated — specifically whether a student can identify clause relationships and choose the punctuation or connecting word that avoids run-ons, comma splices, and fragments.',
    howItAppears:
      'The question stem reads: "Which choice completes the text so that it conforms to the conventions of Standard English?" Four answer choices offer different punctuation marks or connecting words (e.g., a comma, a semicolon, "; however,", "because") that fill a blank within a sentence.',
    whyStudentsMissIt:
      'Students treat punctuation as a matter of rhythm rather than structure. They place semicolons before subordinating conjunctions like "because" or "although," mistake conjunctive adverbs like "however" for coordinating conjunctions, and never verify whether each side of the blank can stand alone as a complete sentence.',
    whatToLookFor:
      'Cover the blank and read each side aloud as a separate sentence. If both pass that test, you need a period, a semicolon, or a comma + FANBOYS. If one side cannot stand alone, choose the connector that correctly attaches it.',
    skillAnatomy: [
      'The clause before the blank — is it a complete sentence on its own?',
      'The clause after the blank — is it a complete sentence on its own?',
      'The relationship between the clauses — contrast, cause, sequence, elaboration?',
      'The connector type required — coordinating conjunction, subordinating conjunction, or conjunctive adverb?',
      'The correct punctuation pattern for that connector type',
    ],
    quickCheckQuestion: {
      stimulus:
        'The research team collected water samples from fourteen sites along the river _______ the lab analysis took three weeks to complete.',
      question: 'Which choice conforms to the conventions of Standard English?',
      choices: [
        { label: 'A', text: ',' },
        { label: 'B', text: '; and' },
        { label: 'C', text: ', and' },
        { label: 'D', text: 'and,' },
      ],
      correctAnswer: 'C',
      explanation:
        'Both clauses are independent. A comma + the coordinating conjunction "and" correctly joins them. A lone comma (A) is a comma splice; "; and" (B) is redundant — the semicolon already joins independent clauses; "and," (D) places the comma in the wrong position.',
    },
  },
  strategy: {
    intro:
      'Before looking at the answer choices, analyze the sentence structure. Identify what is on each side of the blank and whether each part can stand alone. The correct choice follows from the structure — not from how the sentence sounds.',
    steps: [
      'Read the clause before the blank. Can it stand alone as a complete sentence? (Subject + finite verb + complete thought?)',
      'Read the clause after the blank. Can it stand alone as a complete sentence?',
      'Determine the logical relationship: contrast, addition, cause, elaboration, or no explicit relationship needed.',
      'Apply the punctuation rule for that combination (see the rule table below).',
      'Eliminate any choice that creates a comma splice, run-on, or fragment. The remaining option is the answer.',
    ],
    ruleTable: [
      {
        situation: 'Two independent clauses, no connector',
        valid: 'Period or semicolon',
        example: 'She finished early. He stayed late. / She finished early; he stayed late.',
        invalid: 'Comma alone (comma splice)',
      },
      {
        situation: 'Two independent clauses with a coordinating conjunction',
        valid: 'Comma + FANBOYS (for/and/nor/but/or/yet/so)',
        example: 'She finished early, but he stayed late.',
        invalid: '; but (semicolon + coordinating conjunction)',
      },
      {
        situation: 'Independent clause + dependent clause (subordinating conjunction)',
        valid: 'Comma before the subordinating conjunction when it follows the main clause',
        example: 'She left early, although the meeting continued.',
        invalid: '; although (semicolon before subordinating conjunction)',
      },
      {
        situation: 'Dependent clause first, then independent clause',
        valid: 'Comma after the dependent clause',
        example: 'Although the meeting continued, she left early.',
        invalid: 'No comma after the dependent clause',
      },
      {
        situation: 'Conjunctive adverb between two independent clauses',
        valid: 'Semicolon before, comma after the adverb',
        example: 'She finished early; however, he stayed late.',
        invalid: ', however, (comma splice with conjunctive adverb)',
      },
      {
        situation: 'Colon introducing an elaboration or list',
        valid: 'Complete clause before the colon',
        example: 'The expedition had one goal: to reach the summit before nightfall.',
        invalid: 'Colon after an incomplete clause',
      },
      {
        situation: 'Dash interrupting or elaborating',
        valid: 'Single dash for a trailing elaboration; paired dashes around an interruption',
        example: 'The findings — three years of data — confirmed the hypothesis.',
        invalid: 'Single dash where a pair is needed, or vice versa',
      },
      {
        situation: 'Nonessential phrase or clause',
        valid: 'Comma pair (or dash pair) around nonessential information',
        example: 'The curator, who joined the museum in 2019, redesigned the gallery.',
        invalid: 'Only one comma around a nonessential phrase',
      },
    ],
    timeSavingTip:
      'Test each side of the blank independently before reading the choices. If both sides are complete sentences, you can immediately eliminate any choice that uses a lone comma, and you can eliminate any subordinating conjunction that would make one side subordinate.',
    whenNotToOverthink:
      'Boundaries is pure structure — there is no meaning component. Once you confirm which clauses are independent, apply the rule mechanically. Do not second-guess based on which answer "sounds better."',
    tryItQuestion: {
      stimulus:
        'The observatory recorded a surge in solar activity on Thursday _______ ground-based magnetometers detected an associated disturbance in Earth\'s magnetic field.',
      question: 'Which choice conforms to the conventions of Standard English?',
      choices: [
        { label: 'A', text: ',' },
        { label: 'B', text: ';' },
        { label: 'C', text: ', but' },
        { label: 'D', text: 'while' },
      ],
      correctAnswer: 'B',
      explanation:
        'Both clauses are independent — each has its own subject and verb and can stand alone. A semicolon correctly joins two independent clauses without a conjunction. A lone comma (A) is a comma splice; ", but" (C) implies contrast, which distorts the meaning of a correlated pair of observations; "while" (D) makes the second clause subordinate and implies strict simultaneity, which the sentence does not require.',
    },
  },
  commonTraps: [
    {
      title: 'Comma splice',
      description:
        'Joining two independent clauses with only a comma is one of the most consistently tested errors. It looks correct because English prose does use commas frequently, but a comma alone never joins two complete sentences.',
      avoidance:
        'After you confirm that both sides are independent clauses, a lone comma is never acceptable. You need a period, a semicolon, or a comma + FANBOYS.',
      miniExample:
        'WRONG: The glacier retreated ten meters last year, scientists expect further loss this decade.',
      category: 'punctuation',
    },
    {
      title: 'Semicolon before a subordinating conjunction',
      description:
        'A semicolon must separate two independent clauses. When a subordinating conjunction like "because," "although," "since," or "while" immediately follows the semicolon, the second part is no longer independent — making the semicolon wrong.',
      avoidance:
        'If the word right after the blank is a subordinating conjunction, your only valid boundary mark is a comma (when the dependent clause follows). A semicolon is never correct before "because" or "although."',
      miniExample:
        'WRONG: The experiment was paused; because the reagent supply ran out.',
      category: 'punctuation',
    },
    {
      title: 'Treating "however" as a coordinating conjunction',
      description:
        '"However," "therefore," "moreover," and "consequently" are conjunctive adverbs, not FANBOYS words. A comma placed before them when they join two independent clauses still produces a comma splice.',
      avoidance:
        'Put a semicolon (or a period and a new sentence) before "however" or "therefore" when they connect two independent clauses, and put a comma after them.',
      miniExample:
        'WRONG: The plan was approved, however it was never implemented.',
      category: 'connecting-word',
    },
    {
      title: 'Period that creates a fragment',
      description:
        'Some answer choices place a period before a subordinate clause, leaving that clause stranded as a sentence fragment. Fragments lack an independent clause.',
      avoidance:
        'After a period, the next group of words must itself be a complete independent sentence. If it starts with "because," "which," "although," or "having," it is likely a fragment.',
      miniExample:
        'WRONG: The harvest was smaller than expected. Because rainfall was below average.',
      category: 'clause',
    },
    {
      title: 'Colon after an incomplete clause',
      description:
        'A colon requires a complete independent clause before it. Test-makers offer colons in positions where the preceding words do not form a complete sentence.',
      avoidance:
        'Verify that the words before the colon can stand alone as a full sentence before choosing a colon answer.',
      miniExample:
        'WRONG: The three main causes of: erosion, runoff, and poor land management.',
      category: 'punctuation',
    },
    {
      title: 'Comma before a conjunctive adverb joining two sentences',
      description:
        'When a conjunctive adverb like "furthermore" or "nevertheless" connects two independent clauses, a comma before it creates a comma splice — even with the adverb present.',
      avoidance:
        'Use "; nevertheless," or ". Nevertheless," — never ", nevertheless," when both sides are independent clauses.',
      miniExample:
        'WRONG: The bridge was structurally sound, nevertheless the city ordered an inspection.',
      category: 'connecting-word',
    },
    {
      title: 'Relying on sound instead of structure',
      description:
        'Long sentences with many phrases and clauses can sound like they need a pause even when no boundary punctuation is required. Conversely, short sentences can sound complete even when a clause is actually subordinate.',
      avoidance:
        'Always test each side of the blank by asking whether it has a subject and a finite verb and expresses a complete thought — do not rely on rhythm or length.',
      miniExample:
        'TRAP: "The committee, having reviewed all submitted proposals carefully" sounds complete but is only a phrase.',
      category: 'clause',
    },
    {
      title: 'Confusing a long phrase for an independent clause',
      description:
        'A participial phrase ("having reviewed," "working alongside"), a noun phrase ("the committee\'s decision"), or a gerund phrase ("reviewing the proposals") may feel like a complete sentence because it is long, but none of these has a finite verb.',
      avoidance:
        'Check for a finite verb (a verb that shows tense and agrees with a subject). Phrases built around "-ing" forms or past participles without an auxiliary "be" or "have" are not independent clauses.',
      miniExample:
        'TRAP: "The researcher, carefully examining each sample under the microscope" — no finite verb; must attach to an independent clause.',
      category: 'clause',
    },
  ],
  guidedExamples: [
    {
      id: 'bnd-ex-1',
      level: 'foundation',
      subskill: 'Joining Independent Clauses',
      hints: [
        'Read the part before the blank as a sentence by itself. Can it stand alone?',
        'Now read the part after the blank as a sentence by itself. Can it stand alone?',
        'When both sides are independent clauses, you need a period, a semicolon, or a comma + FANBOYS.',
      ],
      stimulus:
        'The city council approved funding for the new footbridge _______ construction is not expected to begin until the following spring.',
      question: 'Which choice conforms to the conventions of Standard English?',
      steps: [
        {
          instruction: 'Test the clause before the blank',
          content:
            '"The city council approved funding for the new footbridge" has a subject (council) and a finite verb (approved) and expresses a complete thought. It is an independent clause.',
        },
        {
          instruction: 'Test the clause after the blank',
          content:
            '"construction is not expected to begin until the following spring" also has a subject (construction) and a finite verb (is expected) and expresses a complete thought. It too is independent.',
        },
        {
          instruction: 'Apply the rule for two independent clauses',
          content:
            'Two independent clauses may join with a period, a semicolon, or a comma + FANBOYS. Of the choices, ", but" correctly signals the contrast between the approval and the delay — funding was approved, but work will not start yet.',
        },
      ],
      choices: [
        { label: 'A', text: ', but' },
        { label: 'B', text: ',' },
        { label: 'C', text: ', however' },
        { label: 'D', text: 'because' },
      ],
      correctAnswer: 'A',
      explanation:
        'Both clauses are independent, so they need a comma + coordinating conjunction. "But" signals the contrast between the approval of funding and the delay in construction.',
      wrongAnswerExplanations: {
        B: 'A comma alone joining two independent clauses is a comma splice.',
        C: '"However" is a conjunctive adverb, not a FANBOYS word. A comma before it still leaves a comma splice; it would need a semicolon before it and a comma after it.',
        D: '"Because" makes the second clause subordinate, implying the delay caused the approval — which reverses the logic of the sentence.',
      },
      coachTakeaway:
        'Rule: two independent clauses always need more than a lone comma. Trap: "however" looks like a joining word but needs a semicolon before it. Fastest method: confirm both sides are complete sentences, then match the relationship (contrast → "but").',
    },
    {
      id: 'bnd-ex-2',
      level: 'foundation',
      subskill: 'Joining Independent Clauses',
      hints: [
        'Check whether the clause after the blank starts with a word that makes it subordinate.',
        'If both sides are independent, a semicolon is a valid joining option.',
        '"So that" introduces purpose — does the sentence intend to express purpose here?',
      ],
      stimulus:
        'Marisol spent months restoring the antique clock _______ she finally reassembled its delicate brass gears.',
      question: 'Which choice conforms to the conventions of Standard English?',
      steps: [
        {
          instruction: 'Check both sides for independence',
          content:
            '"Marisol spent months restoring the antique clock" is complete. "she finally reassembled its delicate brass gears" is also complete. Both are independent.',
        },
        {
          instruction: 'Consider what connector best fits the relationship',
          content:
            'The two events are sequential steps in the same process. A semicolon cleanly links two closely related independent clauses without imposing extra meaning.',
        },
        {
          instruction: 'Eliminate the traps',
          content:
            '"So that" would make the second clause subordinate and imply purpose (she restored it in order to reassemble it), which distorts the meaning. "While" implies strict simultaneity, which is also wrong. A lone comma is a splice.',
        },
      ],
      choices: [
        { label: 'A', text: ',' },
        { label: 'B', text: ';' },
        { label: 'C', text: ', so that' },
        { label: 'D', text: 'while' },
      ],
      correctAnswer: 'B',
      explanation:
        'A semicolon correctly joins two independent clauses. It links the extended effort with the final result without distorting the sequence.',
      wrongAnswerExplanations: {
        A: 'A comma alone is a comma splice.',
        C: '"So that" makes the second clause subordinate and introduces a false purpose relationship.',
        D: '"While" implies the restoration and reassembly happened simultaneously, which misrepresents the sequence.',
      },
      coachTakeaway:
        'A semicolon is always correct between two independent clauses when no conjunction is present. Watch out for "so that" — it means "in order that" and always makes the following clause subordinate.',
    },
    {
      id: 'bnd-ex-3',
      level: 'sat-application',
      subskill: 'Conjunctive Adverbs',
      hints: [
        'Identify whether "otherwise" is a coordinating conjunction or a conjunctive adverb.',
        'Conjunctive adverbs need a semicolon before them and a comma after them when they join two independent clauses.',
        'A comma before "otherwise" — with two independent clauses — is still a comma splice.',
      ],
      stimulus:
        'The greenhouse maintains a constant humidity _______ the tropical orchids inside would quickly wilt in drier air.',
      question: 'Which choice conforms to the conventions of Standard English?',
      steps: [
        {
          instruction: 'Confirm clause independence',
          content:
            '"The greenhouse maintains a constant humidity" and "the tropical orchids inside would quickly wilt in drier air" are both complete sentences.',
        },
        {
          instruction: 'Identify the logical role of "otherwise"',
          content:
            '"Otherwise" is a conjunctive adverb. It signals a contrary condition: if the humidity were not maintained, the orchids would wilt. Conjunctive adverbs join independent clauses with a semicolon before and a comma after.',
        },
        {
          instruction: 'Eliminate the incorrect punctuation patterns',
          content:
            '"; otherwise," is the only correctly punctuated option. A comma before "otherwise" is a comma splice. "Otherwise" alone with no punctuation is a run-on. A colon before "otherwise" is not a standard or acceptable construction here.',
        },
      ],
      choices: [
        { label: 'A', text: '; otherwise,' },
        { label: 'B', text: ', otherwise,' },
        { label: 'C', text: 'otherwise' },
        { label: 'D', text: ': otherwise' },
      ],
      correctAnswer: 'A',
      explanation:
        'The conjunctive adverb "otherwise" must be preceded by a semicolon and followed by a comma when joining two independent clauses.',
      wrongAnswerExplanations: {
        B: 'A comma before "otherwise" is a comma splice — conjunctive adverbs cannot join independent clauses with only a comma.',
        C: 'No punctuation before "otherwise" fuses two independent clauses into a run-on.',
        D: 'A colon should introduce a list, elaboration, or explanation that completes the first clause; it is not used before a conjunctive adverb in this way.',
      },
      coachTakeaway:
        'Memorise the conjunctive adverb pattern: [Independent clause]; [conjunctive adverb], [independent clause]. The most tested conjunctive adverbs are however, therefore, moreover, consequently, nevertheless, and otherwise.',
    },
    {
      id: 'bnd-ex-4',
      level: 'sat-application',
      subskill: 'Subordinating Conjunctions',
      hints: [
        'Does the word after the blank make the following clause dependent?',
        'Subordinating conjunctions (because, although, since, while, if, when) attach to their clause with a comma — not a semicolon.',
        'Test what happens if you remove the word after the blank: can the remaining part still stand alone?',
      ],
      stimulus:
        'The engineering team redesigned the water treatment filter _______ the original model had failed during initial stress testing.',
      question: 'Which choice conforms to the conventions of Standard English?',
      steps: [
        {
          instruction: 'Identify the clause before the blank',
          content:
            '"The engineering team redesigned the water treatment filter" is an independent clause — subject (team) and finite verb (redesigned).',
        },
        {
          instruction: 'Test "because" as the connector',
          content:
            '"Because the original model had failed during initial stress testing" is a dependent clause — it begins with a subordinating conjunction and cannot stand alone as a sentence. The correct punctuation for an independent clause followed by a dependent clause is a comma.',
        },
        {
          instruction: 'Eliminate the traps',
          content:
            'A semicolon before "because" is wrong: a semicolon requires independence on both sides, and "because" makes the second clause dependent. A period before "because" strands the dependent clause as a fragment. No punctuation at all is also acceptable English when the dependent clause follows, but a comma is the standard choice here.',
        },
      ],
      choices: [
        { label: 'A', text: ', because' },
        { label: 'B', text: '; because' },
        { label: 'C', text: '. Because' },
        { label: 'D', text: 'because' },
      ],
      correctAnswer: 'A',
      explanation:
        'When a dependent clause introduced by "because" follows the main clause, a comma connects them. A semicolon is wrong because the second part is not independent.',
      wrongAnswerExplanations: {
        B: 'A semicolon requires an independent clause on both sides. "Because the original model had failed..." is dependent.',
        C: 'A period before "Because" strands the dependent clause as a sentence fragment.',
        D: 'While omitting the comma before "because" is sometimes acceptable, this particular sentence uses a complex clause and the comma is needed to signal the boundary clearly; more importantly, the other choices are wrong for firmer reasons, making A the only fully correct option.',
      },
      coachTakeaway:
        'Never place a semicolon before "because," "although," "since," or "while." These subordinating conjunctions make the following clause dependent, and semicolons require independence on both sides.',
    },
    {
      id: 'bnd-ex-5',
      level: 'advanced',
      subskill: 'Colon Rules',
      hints: [
        'For a colon to be correct, the words before it must form a complete sentence by themselves.',
        'What follows the colon — is it a list, an elaboration, or an explanation of something named before?',
        'A semicolon would also require an independent clause after it. Does what follows form a full sentence?',
      ],
      stimulus:
        'The expedition log revealed the team\'s greatest challenge _______ navigating three kilometers of unmarked terrain in complete darkness.',
      question: 'Which choice conforms to the conventions of Standard English?',
      steps: [
        {
          instruction: 'Test the clause before the blank',
          content:
            '"The expedition log revealed the team\'s greatest challenge" is a complete independent clause — subject (log) and finite verb (revealed).',
        },
        {
          instruction: 'Identify what follows the blank',
          content:
            '"navigating three kilometers of unmarked terrain in complete darkness" is a noun phrase (a gerund phrase acting as a noun), not a full sentence. It identifies and elaborates on "the team\'s greatest challenge."',
        },
        {
          instruction: 'Apply the colon rule',
          content:
            'A colon after a complete clause correctly introduces the elaboration or identification of something just mentioned. The phrase that follows names the challenge. A semicolon would be wrong because the following phrase is not an independent clause.',
        },
      ],
      choices: [
        { label: 'A', text: ':' },
        { label: 'B', text: ';' },
        { label: 'C', text: ', which was' },
        { label: 'D', text: ', and' },
      ],
      correctAnswer: 'A',
      explanation:
        'A colon after the complete clause correctly introduces the noun phrase that identifies "the team\'s greatest challenge." A semicolon is wrong because the following phrase is not an independent clause.',
      wrongAnswerExplanations: {
        B: 'A semicolon requires an independent clause on both sides. "navigating three kilometers..." is a noun phrase, not a sentence.',
        C: '", which was navigating..." creates a relative clause that is grammatically possible but awkward and not among the better choices here; in context, the colon is both cleaner and the only fully defensible option.',
        D: '", and navigating three kilometers..." would imply a second action coordinate with "revealed," which distorts the meaning.',
      },
      coachTakeaway:
        'Use a colon when the first clause is complete and the second part identifies, lists, or explains something named in that clause. The material after the colon does not need to be an independent clause — a noun phrase or list is fine.',
    },
    {
      id: 'bnd-ex-6',
      level: 'advanced',
      subskill: 'Dash and Nonessential Information',
      hints: [
        'When a dash pair surrounds information, the sentence must make grammatical sense if you remove the material between the dashes.',
        'Try reading the sentence without the interrupting information. Does the remaining sentence flow correctly?',
        'A single dash introduces a trailing elaboration; a pair of dashes surrounds an interruption. Which pattern fits here?',
      ],
      stimulus:
        'The architect\'s proposed tower _______ a slender steel-and-glass structure designed to minimize wind resistance _______ received approval from the city planning board after two years of review.',
      question:
        'Which choice most effectively uses punctuation so that the sentence conforms to the conventions of Standard English?',
      steps: [
        {
          instruction: 'Identify the core sentence',
          content:
            '"The architect\'s proposed tower received approval from the city planning board after two years of review" is a complete sentence. The phrase "a slender steel-and-glass structure designed to minimize wind resistance" is a nonessential appositive that describes the tower.',
        },
        {
          instruction: 'Determine the punctuation pattern needed',
          content:
            'An interrupting nonessential phrase requires matching punctuation on both sides: either two commas or two dashes. The blank appears at both insertion points, so the answer must use the same mark on each side.',
        },
        {
          instruction: 'Choose between comma pair and dash pair',
          content:
            'Both are grammatically valid. Dashes create emphasis and visual clarity for a long, complex interrupting phrase. Either is acceptable on the SAT; the answer choices will include only one valid option.',
        },
      ],
      choices: [
        { label: 'A', text: '— ... —' },
        { label: 'B', text: ', ... ,' },
        { label: 'C', text: '— ... ,' },
        { label: 'D', text: ', ... —' },
      ],
      correctAnswer: 'A',
      explanation:
        'An interrupting nonessential phrase requires matching punctuation on both sides. Two dashes correctly set off the appositive. Mixing a dash with a comma (C or D) is not standard English punctuation.',
      wrongAnswerExplanations: {
        B: 'A comma pair would also be grammatically correct in isolation, but when answer choices present both options and only one can be chosen, the dash pair (A) is the answer the test presents as correct here because the other valid option is not listed.',
        C: 'Mixing an opening dash with a closing comma is not a standard punctuation pattern.',
        D: 'Mixing an opening comma with a closing dash is also non-standard.',
      },
      coachTakeaway:
        'Interrupting phrases must have matching punctuation on both sides: comma + comma, or dash + dash. Never mix them. Dashes add emphasis; commas are neutral. Either is acceptable, but the choices will offer only one correct combination.',
    },
    {
      id: 'bnd-ex-7',
      level: 'challenge',
      subskill: 'Fragment vs Phrase',
      hints: [
        'Look carefully at the clause before the blank. Does it have a finite verb — one that shows tense and agrees with a subject?',
        'A participial phrase ("-ing" form without an auxiliary) is NOT a finite verb and cannot stand as an independent clause.',
        'If the words before the blank are only a phrase, you cannot use a semicolon or period to separate them from what follows.',
      ],
      stimulus:
        'The research consortium, having spent four years collecting and cross-referencing field data from seventeen independent monitoring stations _______ published its findings in a peer-reviewed environmental journal.',
      question: 'Which choice conforms to the conventions of Standard English?',
      steps: [
        {
          instruction: 'Identify what comes before the blank',
          content:
            '"The research consortium, having spent four years collecting and cross-referencing field data from seventeen independent monitoring stations" — the subject is "consortium" but the verb is only "having spent," a participial phrase. There is no finite verb yet. This is NOT yet an independent clause.',
        },
        {
          instruction: 'Identify what comes after the blank',
          content:
            '"published its findings in a peer-reviewed environmental journal" is the finite verb phrase. The complete sentence is: "The research consortium... published its findings."',
        },
        {
          instruction: 'Choose the correct punctuation',
          content:
            'Since the part before the blank is a participial phrase attached to the subject (not an independent clause), it needs only a comma to close the nonessential phrase. A semicolon or period would be wrong because there is no independent clause before the blank.',
        },
      ],
      choices: [
        { label: 'A', text: ',' },
        { label: 'B', text: ';' },
        { label: 'C', text: '.' },
        { label: 'D', text: ': and' },
      ],
      correctAnswer: 'A',
      explanation:
        'The long phrase before the blank contains only a participial construction ("having spent"), not a finite verb. The comma closes the participial phrase and connects it to the main verb "published." A semicolon or period would create a fragment on the left side.',
      wrongAnswerExplanations: {
        B: 'A semicolon requires an independent clause on both sides. The phrase before the blank has no finite verb and is not independent.',
        C: 'A period would strand "having spent four years..." as a sentence fragment — it has no finite verb.',
        D: '": and" is not a standard construction and creates a grammatically incoherent sentence.',
      },
      coachTakeaway:
        'Long is not the same as independent. A clause beginning with "having [past participle]" is a participial phrase — it requires a finite verb somewhere in the sentence and cannot stand alone. Test for a real, tensed verb before choosing a semicolon or period.',
    },
    {
      id: 'bnd-ex-8',
      level: 'challenge',
      subskill: 'Multiple Valid-Looking Options',
      hints: [
        'Both a semicolon and a colon are tempting here. Apply both rules strictly to determine which one works.',
        'For a colon: is the material after it an elaboration or explanation of something in the first clause?',
        'For a semicolon: is the material after it a complete independent clause?',
      ],
      stimulus:
        'The committee identified the single most significant barrier to adoption _______ most organizations lacked the internal technical staff to maintain the new system without external support.',
      question: 'Which choice conforms to the conventions of Standard English?',
      steps: [
        {
          instruction: 'Apply the colon test',
          content:
            '"The committee identified the single most significant barrier to adoption" is a complete clause. What follows names and elaborates on "the single most significant barrier." A colon correctly introduces this explanation.',
        },
        {
          instruction: 'Apply the semicolon test',
          content:
            '"most organizations lacked the internal technical staff to maintain the new system without external support" is also an independent clause — subject (organizations) and finite verb (lacked). A semicolon would also be grammatically valid.',
        },
        {
          instruction: 'Determine which the answer choices support',
          content:
            'When both a colon and a semicolon are grammatically defensible, the answer choices will present only one. The colon is preferred here because the second clause functions as an identification of the "barrier" — that is the precise rhetorical relationship a colon signals. Among the choices, only one option will reflect this correctly.',
        },
      ],
      choices: [
        { label: 'A', text: ':' },
        { label: 'B', text: '; however,' },
        { label: 'C', text: ',' },
        { label: 'D', text: ', yet' },
      ],
      correctAnswer: 'A',
      explanation:
        'The colon is the best answer because the second clause identifies and explains "the single most significant barrier" — the rhetorical relationship is elaboration, not contrast. "; however," incorrectly signals contrast. A comma alone is a comma splice. ", yet" introduces a false contrast.',
      wrongAnswerExplanations: {
        B: '"; however," signals contrast, but the sentence presents an identification of the barrier, not a contrasting idea.',
        C: 'A comma alone between two independent clauses is a comma splice.',
        D: '", yet" implies contrast or concession, which distorts the meaning of the sentence.',
      },
      coachTakeaway:
        'When both a semicolon and a colon seem valid, check the rhetorical relationship. A colon says "here is what I mean" or "here is what it was." A semicolon simply links two parallel ideas. If the second clause names or identifies something from the first, the colon is stronger.',
    },
  ],
  drillQuestions: [
    {
      id: 'bnd-d-001',
      skillSlug: 'boundaries',
      subskill: 'Subordinating Conjunctions',
      level: 'foundation',
      difficulty: 'easy',
      errorCategory: 'subordinating-conjunction',
      stimulus:
        'The committee reviewed the proposal _______ several members had concerns about the timeline.',
      question: 'Which choice conforms to the conventions of Standard English?',
      choices: [
        { label: 'A', text: ', although' },
        { label: 'B', text: '; although' },
        { label: 'C', text: ', and although' },
        { label: 'D', text: '. Although' },
      ],
      correctAnswer: 'A',
      explanation:
        '"Although" is a subordinating conjunction; the clause it introduces is dependent and attaches to the independent clause with a comma.',
      wrongAnswerExplanations: {
        B: 'A semicolon must separate two independent clauses. The "although" clause is dependent, so a semicolon is wrong.',
        C: 'Stacking "and" with "although" creates two connectors that conflict grammatically.',
        D: 'A period before "Although several members had concerns about the timeline" strands a dependent clause as a fragment.',
      },
      teachingPoint:
        'Subordinating conjunctions such as "although" take a comma, not a semicolon, and cannot stand alone after a period.',
    },
    {
      id: 'bnd-d-002',
      skillSlug: 'boundaries',
      subskill: 'Coordinating Conjunctions (FANBOYS)',
      level: 'foundation',
      difficulty: 'easy',
      errorCategory: 'comma-splice',
      stimulus:
        'The museum extended its evening hours _______ attendance rose sharply over the summer.',
      question: 'Which choice conforms to the conventions of Standard English?',
      choices: [
        { label: 'A', text: ',' },
        { label: 'B', text: ', and' },
        { label: 'C', text: '; and' },
        { label: 'D', text: 'and,' },
      ],
      correctAnswer: 'B',
      explanation:
        'Both clauses are independent, so a comma + the coordinating conjunction "and" correctly joins them.',
      wrongAnswerExplanations: {
        A: 'A comma alone is a comma splice.',
        C: 'A semicolon already joins independent clauses; adding "and" is redundant and incorrect.',
        D: 'The comma must come before "and," not after it.',
      },
      teachingPoint:
        'Two independent clauses join with a comma + FANBOYS; the comma precedes the conjunction.',
    },
    {
      id: 'bnd-d-003',
      skillSlug: 'boundaries',
      subskill: 'Conjunctive Adverbs',
      level: 'foundation',
      difficulty: 'easy',
      errorCategory: 'conjunctive-adverb',
      stimulus:
        'The recipe calls for fresh basil _______ dried basil can be substituted in a pinch.',
      question: 'Which choice conforms to the conventions of Standard English?',
      choices: [
        { label: 'A', text: ', however' },
        { label: 'B', text: '. However,' },
        { label: 'C', text: ' however' },
        { label: 'D', text: 'however,' },
      ],
      correctAnswer: 'B',
      explanation:
        'A period ends the first independent clause; "However," begins the next sentence with a comma after the conjunctive adverb.',
      wrongAnswerExplanations: {
        A: 'A comma before "however" joining two independent clauses is a comma splice.',
        C: 'No punctuation before "however" fuses two independent clauses into a run-on.',
        D: '"however," with no boundary before it still leaves two independent clauses fused.',
      },
      teachingPoint:
        'A conjunctive adverb like "however" needs a period or semicolon before it and a comma after it when joining two independent clauses.',
    },
    {
      id: 'bnd-d-004',
      skillSlug: 'boundaries',
      subskill: 'Joining Independent Clauses',
      level: 'sat-application',
      difficulty: 'medium',
      errorCategory: 'comma-splice',
      stimulus:
        'The observatory sits atop a remote ridge _______ its telescopes capture some of the clearest night skies in the region.',
      question: 'Which choice conforms to the conventions of Standard English?',
      choices: [
        { label: 'A', text: ',' },
        { label: 'B', text: ';' },
        { label: 'C', text: ': that' },
        { label: 'D', text: ', which' },
      ],
      correctAnswer: 'B',
      explanation:
        'Both clauses are independent, and a semicolon links them without a conjunction.',
      wrongAnswerExplanations: {
        A: 'A comma alone between two independent clauses is a comma splice.',
        C: 'A colon followed by "that" is not a standard construction here.',
        D: '", which its telescopes capture" is ungrammatical; "which" cannot introduce a new subject in this position.',
      },
      teachingPoint:
        'When both sides are complete sentences and no conjunction is present, a semicolon is a clean, correct join.',
    },
    {
      id: 'bnd-d-005',
      skillSlug: 'boundaries',
      subskill: 'Colon Rules',
      level: 'sat-application',
      difficulty: 'medium',
      errorCategory: 'colon-rule',
      stimulus:
        'The chemistry final tested a single overarching skill _______ the ability to predict how reactions shift under changing conditions.',
      question: 'Which choice conforms to the conventions of Standard English?',
      choices: [
        { label: 'A', text: ':' },
        { label: 'B', text: ';' },
        { label: 'C', text: ', and' },
        { label: 'D', text: 'that' },
      ],
      correctAnswer: 'A',
      explanation:
        'The first clause is complete and the noun phrase that follows names the "single overarching skill," making a colon the correct introducer.',
      wrongAnswerExplanations: {
        B: 'A semicolon requires an independent clause after it; "the ability to predict..." is a noun phrase, not a full sentence.',
        C: '"And" presents the phrase as a second item rather than an explanation of the skill.',
        D: '"That" produces the ungrammatical construction "a single overarching skill that the ability to predict..."',
      },
      teachingPoint:
        'Use a colon after a complete clause when what follows names, lists, or explains something in that clause.',
    },
    {
      id: 'bnd-d-006',
      skillSlug: 'boundaries',
      subskill: 'Conjunctive Adverbs',
      level: 'sat-application',
      difficulty: 'medium',
      errorCategory: 'conjunctive-adverb',
      stimulus:
        'The startup missed its first funding target _______ the founders refused to abandon the project.',
      question: 'Which choice conforms to the conventions of Standard English?',
      choices: [
        { label: 'A', text: '; nevertheless,' },
        { label: 'B', text: ', nevertheless' },
        { label: 'C', text: 'nevertheless' },
        { label: 'D', text: ' nevertheless,' },
      ],
      correctAnswer: 'A',
      explanation:
        '"Nevertheless" is a conjunctive adverb requiring a semicolon before it and a comma after it when joining two independent clauses.',
      wrongAnswerExplanations: {
        B: 'A comma before "nevertheless" joining two independent clauses is a comma splice.',
        C: 'No punctuation before "nevertheless" creates a run-on.',
        D: 'A space and comma after "nevertheless" without any boundary before it still leaves the clauses fused.',
      },
      teachingPoint:
        '"Nevertheless," "therefore," and "moreover" require a semicolon before and a comma after when joining independent clauses.',
    },
    {
      id: 'bnd-d-007',
      skillSlug: 'boundaries',
      subskill: 'Subordinating Conjunctions',
      level: 'sat-application',
      difficulty: 'medium',
      errorCategory: 'subordinating-conjunction',
      stimulus:
        '_______ the storm knocked out power to half the county, emergency crews restored service within hours.',
      question: 'Which choice conforms to the conventions of Standard English?',
      choices: [
        { label: 'A', text: 'Because' },
        { label: 'B', text: 'Because;' },
        { label: 'C', text: 'Because,' },
        { label: 'D', text: 'Because —' },
      ],
      correctAnswer: 'A',
      explanation:
        '"Because" introduces the dependent clause directly; the comma later in the sentence already separates the dependent clause from the independent one.',
      wrongAnswerExplanations: {
        B: 'A semicolon cannot follow "Because" — it does not separate two independent clauses here.',
        C: 'No comma belongs immediately after "Because" — the subordinate clause runs into its own subject and verb first.',
        D: 'A dash after "Because" incorrectly interrupts the subordinate clause.',
      },
      teachingPoint:
        'A subordinating conjunction attaches directly to its clause; do not insert punctuation right after it.',
    },
    {
      id: 'bnd-d-008',
      skillSlug: 'boundaries',
      subskill: 'Fragments',
      level: 'advanced',
      difficulty: 'hard',
      errorCategory: 'fragment',
      stimulus:
        'The novelist revised the ending three times _______ each version darker than the last, until the final draft satisfied her.',
      question: 'Which choice conforms to the conventions of Standard English?',
      choices: [
        { label: 'A', text: ',' },
        { label: 'B', text: '.' },
        { label: 'C', text: ';' },
        { label: 'D', text: ': and' },
      ],
      correctAnswer: 'A',
      explanation:
        '"each version darker than the last" is a modifying absolute phrase, not an independent clause, so a comma correctly attaches it to the main sentence.',
      wrongAnswerExplanations: {
        B: 'A period would strand "each version darker than the last, until the final draft satisfied her" as a fragment.',
        C: 'A semicolon requires an independent clause on both sides; the descriptive phrase is not independent.',
        D: '": and" is ungrammatical here and the following phrase is not a list or clean elaboration.',
      },
      teachingPoint:
        'A descriptive phrase that lacks its own subject-verb pair attaches with a comma, not a semicolon or period.',
    },
    {
      id: 'bnd-d-009',
      skillSlug: 'boundaries',
      subskill: 'Joining Independent Clauses',
      level: 'advanced',
      difficulty: 'hard',
      errorCategory: 'run-on',
      stimulus:
        'The archaeologists uncovered a sealed chamber _______ inside they found pottery that predated any previously known settlement in the valley.',
      question: 'Which choice conforms to the conventions of Standard English?',
      choices: [
        { label: 'A', text: ' ' },
        { label: 'B', text: ', and' },
        { label: 'C', text: ', inside' },
        { label: 'D', text: 'while' },
      ],
      correctAnswer: 'B',
      explanation:
        'Both clauses are independent, so a comma + "and" correctly joins them.',
      wrongAnswerExplanations: {
        A: 'No punctuation fuses two independent clauses into a run-on.',
        C: '", inside" leaves a comma splice, since the second clause is still independent.',
        D: '"While" makes the second clause subordinate and implies simultaneity, distorting the sequence.',
      },
      teachingPoint:
        'To correct a run-on between two independent clauses, add a comma + coordinating conjunction, a semicolon, or a period.',
    },
    {
      id: 'bnd-d-010',
      skillSlug: 'boundaries',
      subskill: 'Colon Rules',
      level: 'advanced',
      difficulty: 'hard',
      errorCategory: 'colon-rule',
      stimulus:
        'The expedition faced one insurmountable obstacle _______ the mountain pass had been buried under an early snowfall.',
      question: 'Which choice conforms to the conventions of Standard English?',
      choices: [
        { label: 'A', text: ':' },
        { label: 'B', text: ',' },
        { label: 'C', text: ', that' },
        { label: 'D', text: 'and' },
      ],
      correctAnswer: 'A',
      explanation:
        'The first clause is complete and the second identifies the "one insurmountable obstacle," so a colon correctly introduces the elaboration.',
      wrongAnswerExplanations: {
        B: 'A comma alone joining two independent clauses is a comma splice.',
        C: '", that the mountain pass had been buried" is ungrammatical in this structure.',
        D: '"And" joins as equal ideas and also creates a run-on without a preceding comma.',
      },
      teachingPoint:
        'A colon after a complete clause is the strongest choice when the following clause explains or specifies what was just mentioned.',
    },
    {
      id: 'bnd-d-011',
      skillSlug: 'boundaries',
      subskill: 'Joining Independent Clauses',
      level: 'foundation',
      difficulty: 'easy',
      errorCategory: 'comma-splice',
      stimulus:
        'The botanist catalogued over two hundred plant specimens on the plateau _______ she documented each one with photographs and detailed measurements.',
      question: 'Which choice conforms to the conventions of Standard English?',
      choices: [
        { label: 'A', text: ',' },
        { label: 'B', text: ';' },
        { label: 'C', text: ', so' },
        { label: 'D', text: ': and' },
      ],
      correctAnswer: 'B',
      explanation:
        'Both clauses are independent. A semicolon correctly joins them without adding a conjunction.',
      wrongAnswerExplanations: {
        A: 'A comma alone is a comma splice.',
        C: '", so" implies result — the documentation was a consequence of the cataloguing — which adds meaning not present in the original.',
        D: '": and" is not a standard punctuation construction.',
      },
      teachingPoint:
        'A semicolon cleanly joins two independent clauses of equal weight without imposing any additional meaning.',
    },
    {
      id: 'bnd-d-012',
      skillSlug: 'boundaries',
      subskill: 'Coordinating Conjunctions (FANBOYS)',
      level: 'foundation',
      difficulty: 'easy',
      errorCategory: 'comma-placement',
      stimulus:
        'The film received mixed reviews from critics _______ audiences across the country embraced it enthusiastically.',
      question: 'Which choice conforms to the conventions of Standard English?',
      choices: [
        { label: 'A', text: 'but' },
        { label: 'B', text: ', but' },
        { label: 'C', text: '; but' },
        { label: 'D', text: ', but,' },
      ],
      correctAnswer: 'B',
      explanation:
        'Two independent clauses with a contrast relationship join with a comma + "but." The comma precedes the coordinating conjunction.',
      wrongAnswerExplanations: {
        A: '"but" without a preceding comma creates a run-on between two independent clauses.',
        C: 'A semicolon before a coordinating conjunction is redundant and incorrect — use either the semicolon alone or the comma + conjunction.',
        D: 'A trailing comma after "but" is not standard and creates confusion.',
      },
      teachingPoint:
        'Comma + FANBOYS joins two independent clauses; the comma always comes before the conjunction, never after.',
    },
    {
      id: 'bnd-d-013',
      skillSlug: 'boundaries',
      subskill: 'Conjunctive Adverbs',
      level: 'sat-application',
      difficulty: 'medium',
      errorCategory: 'conjunctive-adverb',
      stimulus:
        'The proposed legislation passed the lower chamber with a large majority _______ it stalled in the upper house due to procedural objections.',
      question: 'Which choice conforms to the conventions of Standard English?',
      choices: [
        { label: 'A', text: ', however,' },
        { label: 'B', text: '; however,' },
        { label: 'C', text: '; however' },
        { label: 'D', text: ', however' },
      ],
      correctAnswer: 'B',
      explanation:
        '"However" is a conjunctive adverb joining two independent clauses. It requires a semicolon before it and a comma after it.',
      wrongAnswerExplanations: {
        A: 'A comma before "however" joining two independent clauses is a comma splice.',
        C: 'The comma after "however" is required — omitting it is non-standard.',
        D: 'A comma before "however" is still a comma splice even when a comma follows it.',
      },
      teachingPoint:
        'Conjunctive adverbs always take "; adverb," — semicolon before and comma after. Both punctuation marks are required.',
    },
    {
      id: 'bnd-d-014',
      skillSlug: 'boundaries',
      subskill: 'Conjunctive Adverbs',
      level: 'sat-application',
      difficulty: 'medium',
      errorCategory: 'conjunctive-adverb',
      stimulus:
        'The geologist predicted that the volcanic activity would subside within weeks _______ the eruption intensified unexpectedly.',
      question: 'Which choice conforms to the conventions of Standard English?',
      choices: [
        { label: 'A', text: '; consequently,' },
        { label: 'B', text: '; instead,' },
        { label: 'C', text: ', instead,' },
        { label: 'D', text: '; instead' },
      ],
      correctAnswer: 'B',
      explanation:
        '"Instead" signals a contrast with the prediction — the opposite outcome occurred. As a conjunctive adverb joining two independent clauses, it requires a semicolon before and a comma after.',
      wrongAnswerExplanations: {
        A: '"Consequently" signals a result of the prediction, but the eruption intensified contrary to the prediction — the relationship is contrast, not consequence.',
        C: 'A comma before "instead" joining two independent clauses is a comma splice.',
        D: 'The comma after "instead" is required in standard usage.',
      },
      teachingPoint:
        'Choose the conjunctive adverb that accurately reflects the logical relationship, then apply the correct punctuation pattern: semicolon before, comma after.',
    },
    {
      id: 'bnd-d-015',
      skillSlug: 'boundaries',
      subskill: 'Subordinating Conjunctions',
      level: 'sat-application',
      difficulty: 'medium',
      errorCategory: 'subordinating-conjunction',
      stimulus:
        'The trail along the eastern ridge remains closed _______ maintenance crews complete the safety assessment and install new guardrails.',
      question: 'Which choice conforms to the conventions of Standard English?',
      choices: [
        { label: 'A', text: '; until' },
        { label: 'B', text: ', until' },
        { label: 'C', text: '. Until' },
        { label: 'D', text: 'until' },
      ],
      correctAnswer: 'B',
      explanation:
        '"Until" is a subordinating conjunction. When a dependent clause introduced by "until" follows the main clause, they connect with a comma.',
      wrongAnswerExplanations: {
        A: 'A semicolon before "until" is wrong because the following clause is dependent.',
        C: 'A period before "Until maintenance crews complete..." strands a dependent clause as a fragment.',
        D: 'While some style guides omit the comma before a final subordinate clause, the SAT typically includes it; more importantly, the other options are clearly wrong for structural reasons.',
      },
      teachingPoint:
        'Subordinating conjunctions like "until," "because," "although," and "since" make the following clause dependent. Use a comma — never a semicolon — before them when they follow the main clause.',
    },
    {
      id: 'bnd-d-016',
      skillSlug: 'boundaries',
      subskill: 'Subordinating Conjunctions',
      level: 'sat-application',
      difficulty: 'medium',
      errorCategory: 'subordinating-conjunction',
      stimulus:
        '_______ the coastal road was closed for repairs, commuters were advised to use the inland highway as an alternative route.',
      question: 'Which choice conforms to the conventions of Standard English?',
      choices: [
        { label: 'A', text: 'Since' },
        { label: 'B', text: 'Since,' },
        { label: 'C', text: 'Since;' },
        { label: 'D', text: '. Since' },
      ],
      correctAnswer: 'A',
      explanation:
        '"Since" introduces the dependent clause directly. When a dependent clause comes first, a comma separates it from the main clause — but the comma comes after the entire dependent clause, not immediately after "Since."',
      wrongAnswerExplanations: {
        B: 'No comma belongs immediately after "Since" — the dependent clause continues into its subject and verb first.',
        C: 'A semicolon after "Since" is not a standard construction.',
        D: 'A period before "Since the coastal road was closed" would create a sentence beginning with an isolated subordinating conjunction that cannot precede a new independent thought this way.',
      },
      teachingPoint:
        'When a dependent clause leads the sentence, the subordinating conjunction attaches directly to the clause with no punctuation immediately after it; the comma comes after the entire dependent clause.',
    },
    {
      id: 'bnd-d-017',
      skillSlug: 'boundaries',
      subskill: 'Colon Rules',
      level: 'advanced',
      difficulty: 'hard',
      errorCategory: 'colon-rule',
      stimulus:
        'The performance evaluation system assessed employees on three criteria _______ productivity, collaboration, and professional development.',
      question: 'Which choice conforms to the conventions of Standard English?',
      choices: [
        { label: 'A', text: ':' },
        { label: 'B', text: ';' },
        { label: 'C', text: ', which included' },
        { label: 'D', text: 'including' },
      ],
      correctAnswer: 'A',
      explanation:
        'The first clause is complete and the list that follows specifies the three criteria. A colon correctly introduces a list after a complete clause.',
      wrongAnswerExplanations: {
        B: 'A semicolon requires an independent clause after it. "productivity, collaboration, and professional development" is a noun list, not a sentence.',
        C: '", which included productivity..." is grammatically possible but the colon is the cleanest and most standard introduction for a list here.',
        D: '"including" without a preceding colon or comma is awkward; the colon is the standard choice for introducing a formal list.',
      },
      teachingPoint:
        'A colon before a list requires a complete independent clause before it. The items in the list do not need to be independent clauses.',
    },
    {
      id: 'bnd-d-018',
      skillSlug: 'boundaries',
      subskill: 'Colon Rules',
      level: 'advanced',
      difficulty: 'hard',
      errorCategory: 'colon-rule',
      stimulus:
        'The marine biologist made an unexpected discovery during her survey of the reef _______ a species of nudibranch previously recorded only in waters off the coast of Japan.',
      question: 'Which choice conforms to the conventions of Standard English?',
      choices: [
        { label: 'A', text: ':' },
        { label: 'B', text: ';' },
        { label: 'C', text: ',' },
        { label: 'D', text: ', and' },
      ],
      correctAnswer: 'A',
      explanation:
        'The first clause is complete and the noun phrase that follows names and elaborates on the "unexpected discovery." A colon is the correct introducer.',
      wrongAnswerExplanations: {
        B: 'What follows is a noun phrase, not an independent clause, so a semicolon is wrong.',
        C: 'A comma alone between a complete clause and a following noun phrase is grammatically weak and non-standard in this context.',
        D: '", and" would make "a species of nudibranch" a second element in a list coordinate with "survey," which distorts the meaning.',
      },
      teachingPoint:
        'A colon can introduce a single noun phrase (not just a list) when that phrase names or identifies something mentioned in the preceding clause.',
    },
    {
      id: 'bnd-d-019',
      skillSlug: 'boundaries',
      subskill: 'Dash and Nonessential Information',
      level: 'advanced',
      difficulty: 'hard',
      errorCategory: 'nonessential-phrase',
      stimulus:
        'The retired architect _______ who had designed more than forty public buildings over a forty-year career _______ agreed to review the proposed renovation plans.',
      question: 'Which choice correctly punctuates the nonessential clause?',
      choices: [
        { label: 'A', text: '— ... —' },
        { label: 'B', text: ', ... ,' },
        { label: 'C', text: '— ... ,' },
        { label: 'D', text: ', ... —' },
      ],
      correctAnswer: 'B',
      explanation:
        'The relative clause "who had designed more than forty public buildings over a forty-year career" is nonessential and must be set off by matching punctuation. A comma pair is correct; alternatively, a dash pair would also work, but the answer choices present only one valid option.',
      wrongAnswerExplanations: {
        A: 'A dash pair would also be grammatically correct, but it is not the answer choice presented as correct in this item.',
        C: 'Mixing an opening dash with a closing comma is non-standard.',
        D: 'Mixing an opening comma with a closing dash is also non-standard.',
      },
      teachingPoint:
        'Nonessential clauses and phrases must have matching punctuation on both sides — comma + comma or dash + dash. Never mix a dash on one side with a comma on the other.',
    },
    {
      id: 'bnd-d-020',
      skillSlug: 'boundaries',
      subskill: 'Dash and Nonessential Information',
      level: 'advanced',
      difficulty: 'hard',
      errorCategory: 'nonessential-phrase',
      stimulus:
        'The proposed merger between the two publishing houses _______ announced without warning last Tuesday _______ sent shockwaves through the industry.',
      question: 'Which choice correctly punctuates the interrupting phrase?',
      choices: [
        { label: 'A', text: ', ... ,' },
        { label: 'B', text: '— ... —' },
        { label: 'C', text: '— ... ,' },
        { label: 'D', text: '; ... ;' },
      ],
      correctAnswer: 'B',
      explanation:
        '"announced without warning last Tuesday" is an interrupting past-participial phrase. A pair of dashes sets it off with appropriate emphasis. Semicolons cannot frame a nonessential phrase within a sentence.',
      wrongAnswerExplanations: {
        A: 'A comma pair would also be grammatically correct, but the answer choices present the dash pair as the correct option here.',
        C: 'Mixing a dash with a comma is non-standard.',
        D: 'Semicolons are not used to enclose nonessential phrases within a sentence.',
      },
      teachingPoint:
        'Past-participial phrases ("announced," "discovered," "completed") that interrupt a sentence are nonessential and take matching punctuation on both sides.',
    },
    {
      id: 'bnd-d-021',
      skillSlug: 'boundaries',
      subskill: 'Fragments',
      level: 'challenge',
      difficulty: 'hard',
      errorCategory: 'fragment',
      stimulus:
        'The urban planning commission, having debated the rezoning proposal for three consecutive sessions and ultimately failing to reach a unanimous decision _______ postponed the vote until the following quarter.',
      question: 'Which choice conforms to the conventions of Standard English?',
      choices: [
        { label: 'A', text: ',' },
        { label: 'B', text: ';' },
        { label: 'C', text: '.' },
        { label: 'D', text: ': and' },
      ],
      correctAnswer: 'A',
      explanation:
        'Everything before the blank is a long participial phrase ("having debated... and ultimately failing...") with no finite verb. The finite verb is "postponed," which follows the blank. A comma closes the phrase and connects it to the main verb.',
      wrongAnswerExplanations: {
        B: 'A semicolon requires an independent clause before it. The material before the blank has no finite verb and is not independent.',
        C: 'A period before "postponed" would strand "The urban planning commission, having debated..." as a fragment — there is no finite verb in that section.',
        D: '": and" creates a grammatically incoherent construction.',
      },
      teachingPoint:
        'A long participial phrase before the subject\'s finite verb needs only a comma. The length of the phrase does not make it an independent clause. Always locate the finite verb before choosing your punctuation.',
    },
    {
      id: 'bnd-d-022',
      skillSlug: 'boundaries',
      subskill: 'Fragments',
      level: 'challenge',
      difficulty: 'hard',
      errorCategory: 'fragment',
      stimulus:
        'The newly appointed director, known across the industry for her work restructuring three underperforming organizations during the previous decade _______ brought a pragmatic approach to the role.',
      question: 'Which choice conforms to the conventions of Standard English?',
      choices: [
        { label: 'A', text: ',' },
        { label: 'B', text: ';' },
        { label: 'C', text: ': she' },
        { label: 'D', text: '. She' },
      ],
      correctAnswer: 'A',
      explanation:
        '"known across the industry for her work restructuring three underperforming organizations during the previous decade" is a past-participial phrase modifying the director. It is not an independent clause. A comma closes the appositive and connects it to the main verb "brought."',
      wrongAnswerExplanations: {
        B: 'No independent clause precedes the blank — only a noun phrase and a participial modifier — so a semicolon is incorrect.',
        C: '": she brought" would require a complete independent clause before the colon.',
        D: 'A period creates a fragment: "The newly appointed director, known across the industry..." has no finite verb.',
      },
      teachingPoint:
        'Past-participial phrases ("known for," "appointed by," "recognized as") modify a noun but are not independent clauses. Use a comma to set them off — never a semicolon or period.',
    },
  ],
  masteryQuestions: [
    {
      id: 'bnd-m-001',
      skillSlug: 'boundaries',
      subskill: 'Joining Independent Clauses',
      level: 'foundation',
      difficulty: 'easy',
      errorCategory: 'comma-splice',
      stimulus:
        'The documentary premiered at a small regional festival _______ it later won awards at three international competitions.',
      question: 'Which choice conforms to the conventions of Standard English?',
      choices: [
        { label: 'A', text: ';' },
        { label: 'B', text: ',' },
        { label: 'C', text: 'and' },
        { label: 'D', text: '; and' },
      ],
      correctAnswer: 'A',
      explanation:
        'Both clauses are independent. A semicolon correctly joins them without a conjunction.',
      wrongAnswerExplanations: {
        B: 'A comma alone is a comma splice.',
        C: '"and" without a preceding comma creates a run-on.',
        D: 'A semicolon followed immediately by a coordinating conjunction is redundant.',
      },
      teachingPoint: 'A semicolon alone correctly joins two independent clauses.',
    },
    {
      id: 'bnd-m-002',
      skillSlug: 'boundaries',
      subskill: 'Coordinating Conjunctions (FANBOYS)',
      level: 'foundation',
      difficulty: 'easy',
      errorCategory: 'comma-splice',
      stimulus:
        'The hiking trail leads through dense forest for six kilometers _______ it opens onto a panoramic viewpoint above the valley.',
      question: 'Which choice conforms to the conventions of Standard English?',
      choices: [
        { label: 'A', text: ', and' },
        { label: 'B', text: ',' },
        { label: 'C', text: '; and' },
        { label: 'D', text: 'and' },
      ],
      correctAnswer: 'A',
      explanation:
        'Two independent clauses with an addition relationship join with a comma + "and."',
      wrongAnswerExplanations: {
        B: 'A comma alone is a comma splice.',
        C: 'A semicolon + coordinating conjunction is redundant.',
        D: '"and" without a preceding comma creates a run-on.',
      },
      teachingPoint: 'Comma + FANBOYS is the standard pattern for joining two independent clauses with a coordinating conjunction.',
    },
    {
      id: 'bnd-m-003',
      skillSlug: 'boundaries',
      subskill: 'Comma Splice and Run-on Correction',
      level: 'foundation',
      difficulty: 'easy',
      errorCategory: 'comma-splice',
      stimulus:
        'The library extended its weekend hours last spring _______ the number of student visitors increased significantly.',
      question: 'Which choice conforms to the conventions of Standard English?',
      choices: [
        { label: 'A', text: ', and' },
        { label: 'B', text: ',' },
        { label: 'C', text: ', so' },
        { label: 'D', text: '; and' },
      ],
      correctAnswer: 'C',
      explanation:
        '"So" signals that the increase in visitors was a result of the extended hours. Comma + "so" correctly joins two independent clauses with a cause-effect relationship.',
      wrongAnswerExplanations: {
        A: '", and" would also be grammatically correct, but "and" is neutral whereas "so" captures the causal relationship more precisely.',
        B: 'A comma alone is a comma splice.',
        D: 'A semicolon + coordinating conjunction is redundant.',
      },
      teachingPoint: 'Choose the coordinating conjunction that accurately reflects the logical relationship between the clauses — "so" signals result.',
    },
    {
      id: 'bnd-m-004',
      skillSlug: 'boundaries',
      subskill: 'Comma Splice and Run-on Correction',
      level: 'foundation',
      difficulty: 'easy',
      errorCategory: 'run-on',
      stimulus:
        'The software update resolved several known bugs _______ it introduced a new interface that many users found confusing.',
      question: 'Which choice conforms to the conventions of Standard English?',
      choices: [
        { label: 'A', text: ', but' },
        { label: 'B', text: 'but' },
        { label: 'C', text: ', but,' },
        { label: 'D', text: '; but,' },
      ],
      correctAnswer: 'A',
      explanation:
        'A comma + "but" correctly joins two independent clauses showing contrast. The comma precedes the conjunction.',
      wrongAnswerExplanations: {
        B: '"but" without a preceding comma creates a run-on.',
        C: 'A comma after "but" is not standard here.',
        D: 'A semicolon before a coordinating conjunction is redundant.',
      },
      teachingPoint: 'The comma in "comma + FANBOYS" always precedes the conjunction, not follows it.',
    },
    {
      id: 'bnd-m-005',
      skillSlug: 'boundaries',
      subskill: 'Conjunctive Adverbs',
      level: 'sat-application',
      difficulty: 'medium',
      errorCategory: 'conjunctive-adverb',
      stimulus:
        'The clinical trial showed promising early results _______ the research team cautioned that larger studies would be needed before any conclusions could be drawn.',
      question: 'Which choice conforms to the conventions of Standard English?',
      choices: [
        { label: 'A', text: '; nevertheless,' },
        { label: 'B', text: ', nevertheless,' },
        { label: 'C', text: '; nevertheless' },
        { label: 'D', text: ', nevertheless' },
      ],
      correctAnswer: 'A',
      explanation:
        '"Nevertheless" is a conjunctive adverb requiring a semicolon before and a comma after when joining two independent clauses.',
      wrongAnswerExplanations: {
        B: 'A comma before "nevertheless" is a comma splice.',
        C: 'The comma after "nevertheless" is required.',
        D: 'Both errors combined: comma before (splice) and no comma after.',
      },
      teachingPoint: 'Both the semicolon before and the comma after a conjunctive adverb are required.',
    },
    {
      id: 'bnd-m-006',
      skillSlug: 'boundaries',
      subskill: 'Conjunctive Adverbs',
      level: 'sat-application',
      difficulty: 'medium',
      errorCategory: 'conjunctive-adverb',
      stimulus:
        'The festival originally planned for June had to be postponed due to heavy rain _______ organizers rescheduled it for the following September.',
      question: 'Which choice conforms to the conventions of Standard English?',
      choices: [
        { label: 'A', text: '; as a result,' },
        { label: 'B', text: ', as a result,' },
        { label: 'C', text: '; as a result' },
        { label: 'D', text: '. as a result,' },
      ],
      correctAnswer: 'A',
      explanation:
        '"As a result" is a conjunctive adverb phrase signalling consequence. It requires a semicolon before and a comma after.',
      wrongAnswerExplanations: {
        B: 'A comma before "as a result" joining two independent clauses is a comma splice.',
        C: 'The comma after "as a result" is required.',
        D: 'A period followed by a lowercase letter is not standard; additionally "as a result" requires a comma after it.',
      },
      teachingPoint: 'Multi-word conjunctive adverb phrases like "as a result" and "in addition" follow the same pattern as single-word ones: semicolon before, comma after.',
    },
    {
      id: 'bnd-m-007',
      skillSlug: 'boundaries',
      subskill: 'Subordinating Conjunctions',
      level: 'sat-application',
      difficulty: 'medium',
      errorCategory: 'subordinating-conjunction',
      stimulus:
        'The coastal town strengthened its seawall _______ engineers warned that storm surges in the region had grown more severe in recent decades.',
      question: 'Which choice conforms to the conventions of Standard English?',
      choices: [
        { label: 'A', text: ', after' },
        { label: 'B', text: '; after' },
        { label: 'C', text: '. After' },
        { label: 'D', text: 'after' },
      ],
      correctAnswer: 'A',
      explanation:
        '"After" is a subordinating conjunction. The clause it introduces is dependent. When it follows the main clause, a comma connects them.',
      wrongAnswerExplanations: {
        B: 'A semicolon before "after" is incorrect — subordinating conjunctions introduce dependent clauses, not independent ones.',
        C: 'A period strands "After engineers warned..." as a sentence fragment.',
        D: 'While omitting the comma before a final adverbial clause is sometimes acceptable, the other options here are clearly wrong, making A the only correct choice.',
      },
      teachingPoint: 'Subordinating conjunctions like "after," "before," "when," and "because" always introduce dependent clauses. Never place a semicolon before them.',
    },
    {
      id: 'bnd-m-008',
      skillSlug: 'boundaries',
      subskill: 'Subordinating Conjunctions',
      level: 'sat-application',
      difficulty: 'medium',
      errorCategory: 'subordinating-conjunction',
      stimulus:
        '_______ the regional aquifer had been consistently overdrawn for two decades, local authorities introduced strict water-use restrictions.',
      question: 'Which choice conforms to the conventions of Standard English?',
      choices: [
        { label: 'A', text: 'Because' },
        { label: 'B', text: 'Because;' },
        { label: 'C', text: 'Because,' },
        { label: 'D', text: '; Because' },
      ],
      correctAnswer: 'A',
      explanation:
        '"Because" introduces a dependent clause that precedes the main clause. The subordinating conjunction attaches directly to the clause; the comma in the sentence comes after the entire dependent clause, not immediately after "because."',
      wrongAnswerExplanations: {
        B: 'A semicolon directly after "Because" is not a valid construction.',
        C: 'A comma immediately after "Because" interrupts the subordinate clause mid-phrase.',
        D: 'A semicolon before "Because" is incorrect and unnecessary.',
      },
      teachingPoint: 'A leading subordinate clause ("Because X happened, Y followed") requires no punctuation immediately after the subordinating conjunction — only a comma after the entire dependent clause.',
    },
    {
      id: 'bnd-m-009',
      skillSlug: 'boundaries',
      subskill: 'Colon Rules',
      level: 'advanced',
      difficulty: 'hard',
      errorCategory: 'colon-rule',
      stimulus:
        'The audit revealed that the organization had violated three separate financial regulations _______ improper expense reporting, unauthorized account transfers, and failure to disclose conflicts of interest.',
      question: 'Which choice conforms to the conventions of Standard English?',
      choices: [
        { label: 'A', text: ':' },
        { label: 'B', text: ';' },
        { label: 'C', text: ',' },
        { label: 'D', text: ', including' },
      ],
      correctAnswer: 'A',
      explanation:
        'The first clause is complete and the list that follows specifies the three violations. A colon correctly introduces a list after a complete independent clause.',
      wrongAnswerExplanations: {
        B: 'The items in the list are noun phrases, not independent clauses, so a semicolon is wrong.',
        C: 'A comma before a list is non-standard when the first clause is complete; a colon is the correct choice.',
        D: '", including" is grammatically possible but less precise than the colon when introducing a formal enumeration.',
      },
      teachingPoint: 'A colon introduces a list when the preceding clause is complete. The list items themselves do not need to be independent clauses.',
    },
    {
      id: 'bnd-m-010',
      skillSlug: 'boundaries',
      subskill: 'Dash and Nonessential Information',
      level: 'advanced',
      difficulty: 'hard',
      errorCategory: 'nonessential-phrase',
      stimulus:
        'The bridge _______ a narrow iron structure built in the early twentieth century and never designed for modern traffic volumes _______ was finally closed to vehicles after a safety inspection.',
      question: 'Which pair of punctuation marks correctly sets off the interrupting phrase?',
      choices: [
        { label: 'A', text: '— ... —' },
        { label: 'B', text: ', ... ,' },
        { label: 'C', text: '— ... ,' },
        { label: 'D', text: ': ... ;' },
      ],
      correctAnswer: 'A',
      explanation:
        'The long appositive phrase "a narrow iron structure built in the early twentieth century and never designed for modern traffic volumes" interrupts the sentence. A pair of dashes sets it off with appropriate emphasis and clarity.',
      wrongAnswerExplanations: {
        B: 'A comma pair would also be grammatically correct, but the answer choices present the dash pair as the correct option here.',
        C: 'Mixing a dash with a comma is non-standard.',
        D: 'A colon and semicolon cannot frame a nonessential phrase within a sentence.',
      },
      teachingPoint: 'For long, complex interrupting appositive phrases, dashes provide greater clarity than commas. The punctuation marks must match on both sides.',
    },
    {
      id: 'bnd-m-011',
      skillSlug: 'boundaries',
      subskill: 'Fragments',
      level: 'challenge',
      difficulty: 'hard',
      errorCategory: 'fragment',
      stimulus:
        'The ecological survey team, comprising researchers from four universities and operating under a joint grant from the national science foundation _______ released its comprehensive findings on wetland degradation.',
      question: 'Which choice conforms to the conventions of Standard English?',
      choices: [
        { label: 'A', text: ',' },
        { label: 'B', text: ';' },
        { label: 'C', text: '. It' },
        { label: 'D', text: ':' },
      ],
      correctAnswer: 'A',
      explanation:
        'Everything before the blank is a noun phrase ("The ecological survey team") followed by a participial phrase ("comprising researchers... and operating..."). There is no finite verb yet. The finite verb is "released." A comma closes the long modifier and connects it to the main verb.',
      wrongAnswerExplanations: {
        B: 'There is no finite verb before the blank; a semicolon requires an independent clause on both sides.',
        C: '". It released" would split what is grammatically a single sentence and introduce a vague pronoun.',
        D: 'A colon requires a complete clause before it; the material before the blank has no finite verb.',
      },
      teachingPoint: 'The length of a noun-and-participial-phrase combination does not make it a sentence. Locate the finite verb first. If it comes after the blank, the blank needs only a comma.',
    },
    {
      id: 'bnd-m-012',
      skillSlug: 'boundaries',
      subskill: 'Joining Independent Clauses',
      level: 'challenge',
      difficulty: 'hard',
      errorCategory: 'colon-rule',
      stimulus:
        'The committee chair presented the findings in a deliberately understated way _______ the data itself, she believed, would make the severity of the situation unmistakable.',
      question: 'Which choice conforms to the conventions of Standard English?',
      choices: [
        { label: 'A', text: ':' },
        { label: 'B', text: ',' },
        { label: 'C', text: '; and' },
        { label: 'D', text: ', so' },
      ],
      correctAnswer: 'A',
      explanation:
        'The second clause explains why the chair was understated — it elaborates on the decision described in the first clause. A colon after the complete first clause correctly introduces this explanation.',
      wrongAnswerExplanations: {
        B: 'A comma alone between two independent clauses is a comma splice.',
        C: '"; and" implies addition, but the relationship here is explanation, not addition.',
        D: '", so" implies that being understated caused the data to make the situation unmistakable, which distorts the logic.',
      },
      teachingPoint: 'When the second clause explains the reasoning behind the first, a colon is often the most precise choice — it signals "here is why" or "here is what I mean."',
    },
  ],
}
