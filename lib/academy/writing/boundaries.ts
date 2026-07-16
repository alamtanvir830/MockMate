import type { AcademySkill } from '../types'

export const boundaries: AcademySkill = {
  slug: 'boundaries',
  title: 'Boundaries',
  section: 'writing',
  overview: {
    whatItTests:
      'Whether a sentence is correctly punctuated — specifically whether a choice creates a run-on, a comma splice, a fragment, or a correctly punctuated independent clause.',
    howItAppears:
      'The prompt asks, "Which choice completes the text so that it conforms to the conventions of Standard English?" and offers four options that differ only in their punctuation or connecting words.',
    whyStudentsMissIt:
      'Students confuse conjunctive adverbs (however, therefore, moreover) with coordinating conjunctions; they place semicolons before subordinating conjunctions; and they never actually test whether each clause on its own is a complete sentence.',
    whatToLookFor:
      'Ask whether the words before the blank and the words after the blank can each stand alone as a sentence. Then decide what punctuation is required to join or separate those clauses correctly.',
  },
  strategy: {
    steps: [
      'Identify whether the clause before the blank and the clause after the blank are independent (each can stand alone as a complete sentence).',
      'If BOTH are independent, join them with a period, a semicolon, or a comma plus a FANBOYS coordinating conjunction (for, and, nor, but, or, yet, so).',
      'If ONE clause is subordinate (it begins with because, although, since, while, if, when, etc.), connect it with only a comma — never a semicolon.',
      'Treat conjunctive adverbs (however, therefore, moreover, consequently) as NOT joining words: they need a semicolon or period before them and a comma after them.',
      'Eliminate any choice that produces a comma splice, a run-on, or a fragment.',
    ],
    timeSavingTip:
      'Cover the blank and read each side aloud. If both sides are full sentences, the answer must be a period, a semicolon, or a comma + FANBOYS — you can usually eliminate two choices instantly.',
    whenNotToOverthink:
      'Boundaries questions are pure grammar, not meaning. Once you have confirmed which clauses are independent, apply the punctuation rule mechanically; do not second-guess based on how the sentence "sounds."',
  },
  commonTraps: [
    {
      title: 'Semicolon before a subordinating conjunction',
      description:
        'A semicolon must separate two independent clauses. Placing one before "because," "although," or "since" is wrong because those words make the following clause subordinate.',
      avoidance:
        'If the word after the blank is a subordinating conjunction, use only a comma (or no punctuation), never a semicolon.',
    },
    {
      title: 'Comma splice',
      description:
        'Joining two independent clauses with only a comma creates a comma splice, one of the most tested errors on the SAT.',
      avoidance:
        'When both sides are complete sentences, a lone comma is never enough — you need a period, a semicolon, or a comma plus a coordinating conjunction.',
    },
    {
      title: 'Treating "however" as a coordinating conjunction',
      description:
        '"However" is a conjunctive adverb, not a FANBOYS word. A comma before "however" that joins two independent clauses is still a comma splice.',
      avoidance:
        'Put a semicolon (or period) before "however," "therefore," and "moreover," and a comma after them.',
    },
    {
      title: 'Colon after an incomplete clause or without an elaboration',
      description:
        'A colon requires a complete independent clause before it and should introduce a list, explanation, or elaboration. Test-makers offer colons where neither condition is met.',
      avoidance:
        'Check that the words before the colon form a full sentence AND that what follows genuinely explains or lists something.',
    },
    {
      title: 'Fragment left standing after a period',
      description:
        'Some choices place a period before a subordinate clause, leaving that clause as a sentence fragment.',
      avoidance:
        'After a period, the next group of words must itself be a complete sentence — reject any period that strands a "because" or "which" clause.',
    },
  ],
  guidedExamples: [
    {
      id: 'bnd-ex-1',
      stimulus:
        'The city council approved funding for the new footbridge _______ construction is not expected to begin until the following spring.',
      question: 'Which choice conforms to the conventions of Standard English?',
      steps: [
        {
          instruction: 'Test the first clause for independence',
          content:
            '"The city council approved funding for the new footbridge" is a complete sentence — it has a subject (council) and a verb (approved). It is independent.',
        },
        {
          instruction: 'Test the second clause for independence',
          content:
            '"construction is not expected to begin until the following spring" also stands alone as a full sentence. Both sides are independent.',
        },
        {
          instruction: 'Recall the rule for two independent clauses',
          content:
            'Two independent clauses may be joined by a period, a semicolon, or a comma + FANBOYS. A comma alone would be a splice.',
        },
        {
          instruction: 'Eliminate and choose',
          content:
            'A lone comma (splice) and a comma before a bare conjunctive adverb are both wrong. A comma + "but" correctly signals the contrast between the approval and the delay.',
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
        'Both clauses are independent, so they need a comma plus a coordinating conjunction. "But" adds the correct contrast: funding was approved, but work will be delayed.',
      wrongAnswerExplanations: {
        B: 'A comma alone between two independent clauses is a comma splice.',
        C: '"However" is a conjunctive adverb; a comma before it still leaves a comma splice. It would need a semicolon before it.',
        D: '"Because" makes the second clause subordinate and reverses the logic — the delay is not the reason funding was approved.',
      },
    },
    {
      id: 'bnd-ex-2',
      stimulus:
        'Marisol spent months restoring the antique clock _______ she finally reassembled its delicate brass gears.',
      question: 'Which choice conforms to the conventions of Standard English?',
      steps: [
        {
          instruction: 'Check both clauses',
          content:
            '"Marisol spent months restoring the antique clock" is independent, and "she finally reassembled its delicate brass gears" is independent as well.',
        },
        {
          instruction: 'Identify the relationship',
          content:
            'The two ideas are closely related steps in the same process, which makes a semicolon an appropriate strong link between equal independent clauses.',
        },
        {
          instruction: 'Screen the options',
          content:
            'A comma alone is a splice. A period followed by a lowercase "she" is a capitalization/formatting error only if capitalization is wrong — here the choices use punctuation only, so evaluate each.',
        },
        {
          instruction: 'Select the valid punctuation',
          content:
            'The semicolon correctly joins the two independent clauses without a conjunction and shows their tight connection.',
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
        'Two independent clauses can be joined by a semicolon. It links the extended effort and the final result without adding an unnecessary conjunction.',
      wrongAnswerExplanations: {
        A: 'A comma alone joining two independent clauses is a comma splice.',
        C: '"So that" introduces purpose, implying she restored the clock in order to reassemble the gears, which distorts the meaning; it also makes the second clause subordinate, so no comma is needed.',
        D: '"While" makes the second clause subordinate and suggests simultaneity, which misrepresents the sequence of events.',
      },
    },
    {
      id: 'bnd-ex-3',
      stimulus:
        'The greenhouse maintains a constant humidity _______ the tropical orchids inside would quickly wilt in drier air.',
      question: 'Which choice conforms to the conventions of Standard English?',
      steps: [
        {
          instruction: 'Confirm clause independence',
          content:
            'Both "The greenhouse maintains a constant humidity" and "the tropical orchids inside would quickly wilt in drier air" are complete sentences.',
        },
        {
          instruction: 'Consider a conjunctive adverb',
          content:
            'The second idea explains the consequence of NOT maintaining humidity — a reason the humidity matters. A conjunctive adverb like "otherwise" fits, but it must be punctuated correctly.',
        },
        {
          instruction: 'Apply the conjunctive-adverb rule',
          content:
            'A conjunctive adverb joining two independent clauses needs a semicolon before it and a comma after it: "; otherwise,".',
        },
        {
          instruction: 'Eliminate mispunctuated versions',
          content:
            'A comma before "otherwise" is a splice; a semicolon with no adverb is grammatically fine but a bare semicolon is offered here without the adverb, so compare meaning and punctuation.',
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
        'The conjunctive adverb "otherwise" must be preceded by a semicolon (joining two independent clauses) and followed by a comma. Only choice A punctuates it correctly.',
      wrongAnswerExplanations: {
        B: 'A comma before "otherwise" creates a comma splice; conjunctive adverbs cannot join independent clauses with only a comma.',
        C: 'With no punctuation at all, the two independent clauses run together as a run-on (fused sentence).',
        D: 'A colon should introduce a list, explanation, or elaboration presented as a completion of the first clause; here it is followed by a full contrasting clause, so the colon is inappropriate.',
      },
    },
  ],
  drillQuestions: [
    {
      id: 'bnd-d-001',
      skillSlug: 'boundaries',
      subskill: 'subordinating conjunction',
      difficulty: 'easy',
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
        '"Although" is a subordinating conjunction, so the clause it introduces is subordinate and is attached to the independent clause with only a comma.',
      wrongAnswerExplanations: {
        B: 'A semicolon must separate two independent clauses; the "although" clause is subordinate, so a semicolon is wrong.',
        C: 'Pairing "and" with "although" stacks two connectors and is ungrammatical.',
        D: 'A period before "Although several members had concerns about the timeline" strands a fragment.',
      },
      teachingPoint:
        'Subordinating conjunctions such as "although" take a comma, not a semicolon, and cannot stand alone after a period.',
    },
    {
      id: 'bnd-d-002',
      skillSlug: 'boundaries',
      subskill: 'comma splice vs coordinating conjunction',
      difficulty: 'easy',
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
        'Both clauses are independent, so a comma plus the coordinating conjunction "and" correctly joins them.',
      wrongAnswerExplanations: {
        A: 'A comma alone between two independent clauses is a comma splice.',
        C: 'A semicolon already joins independent clauses, so adding "and" is redundant and incorrect.',
        D: 'The comma belongs before "and," not after it, when joining two independent clauses.',
      },
      teachingPoint:
        'Two independent clauses join with a comma + FANBOYS; the comma comes before the conjunction.',
    },
    {
      id: 'bnd-d-003',
      skillSlug: 'boundaries',
      subskill: 'period between sentences',
      difficulty: 'easy',
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
        'A period ends the first independent clause, and "However," begins the next sentence with a comma after the conjunctive adverb.',
      wrongAnswerExplanations: {
        A: 'A comma before "however" that joins two independent clauses is a comma splice.',
        C: 'With no punctuation before "however," the clauses fuse into a run-on.',
        D: 'This leaves two independent clauses fused with no boundary punctuation before "however."',
      },
      teachingPoint:
        'A conjunctive adverb like "however" needs a period or semicolon before it and a comma after it.',
    },
    {
      id: 'bnd-d-004',
      skillSlug: 'boundaries',
      subskill: 'semicolon between independent clauses',
      difficulty: 'medium',
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
        'Both clauses are independent, and a semicolon links them without a conjunction while showing their close relationship.',
      wrongAnswerExplanations: {
        A: 'A comma alone between two independent clauses is a comma splice.',
        C: 'A colon followed by "that" is not idiomatic here and does not introduce a list or clean elaboration.',
        D: '", which its telescopes capture" is ungrammatical; "which" cannot take a new subject ("its telescopes") in this position.',
      },
      teachingPoint:
        'When both sides are complete sentences and no conjunction is present, a semicolon is a clean join.',
    },
    {
      id: 'bnd-d-005',
      skillSlug: 'boundaries',
      subskill: 'colon before an explanation',
      difficulty: 'medium',
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
        'The first clause is a complete sentence, and what follows names and explains the "single overarching skill," so a colon correctly introduces the elaboration.',
      wrongAnswerExplanations: {
        B: 'A semicolon requires an independent clause after it; "the ability to predict..." is a noun phrase, not a full sentence.',
        C: '"And" wrongly presents the phrase as a second item rather than an explanation of the skill.',
        D: '"That" produces "a single overarching skill that the ability to predict...," which is ungrammatical.',
      },
      teachingPoint:
        'Use a colon after a complete clause when what follows names, lists, or explains something in that clause.',
    },
    {
      id: 'bnd-d-006',
      skillSlug: 'boundaries',
      subskill: 'conjunctive adverb punctuation',
      difficulty: 'medium',
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
        'The conjunctive adverb "nevertheless" needs a semicolon before it (joining two independent clauses) and a comma after it.',
      wrongAnswerExplanations: {
        B: 'A comma before "nevertheless" joining two independent clauses is a comma splice.',
        C: 'No punctuation before "nevertheless" fuses the two clauses into a run-on.',
        D: 'A comma after "nevertheless" alone still leaves the two independent clauses fused with no boundary before it.',
      },
      teachingPoint:
        '"Nevertheless," "therefore," and "moreover" require a semicolon before and a comma after when joining independent clauses.',
    },
    {
      id: 'bnd-d-007',
      skillSlug: 'boundaries',
      subskill: 'subordinate clause with comma',
      difficulty: 'medium',
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
        'A subordinating conjunction like "Because" introduces the dependent clause directly; the comma later in the sentence already separates it from the independent clause.',
      wrongAnswerExplanations: {
        B: 'A semicolon cannot follow "Because"; it does not separate two independent clauses here.',
        C: 'No comma belongs immediately after "Because" — the subordinate clause runs into its own subject and verb.',
        D: 'A dash after "Because" incorrectly interrupts the subordinate clause it introduces.',
      },
      teachingPoint:
        'A subordinating conjunction attaches directly to its clause; do not insert punctuation right after it.',
    },
    {
      id: 'bnd-d-008',
      skillSlug: 'boundaries',
      subskill: 'fragment vs complete sentence',
      difficulty: 'hard',
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
        '"each version darker than the last" is a modifying phrase, not an independent clause, so a comma correctly attaches it to the main sentence.',
      wrongAnswerExplanations: {
        B: 'A period would strand "each version darker than the last, until the final draft satisfied her" as a fragment.',
        C: 'A semicolon requires an independent clause on both sides; the descriptive phrase is not independent.',
        D: 'A colon plus "and" is ungrammatical and the following phrase is not a list or clean elaboration.',
      },
      teachingPoint:
        'A descriptive phrase that lacks its own subject-verb pair attaches with a comma, not a semicolon or period.',
    },
    {
      id: 'bnd-d-009',
      skillSlug: 'boundaries',
      subskill: 'run-on correction',
      difficulty: 'hard',
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
        'Both clauses are independent, so a comma + "and" joins them correctly and preserves the sequence of discovery.',
      wrongAnswerExplanations: {
        A: 'No punctuation creates a fused run-on between two independent clauses.',
        C: '", inside" leaves a comma splice, since "inside they found pottery..." is still an independent clause.',
        D: '"While" makes the second clause subordinate and implies simultaneity, distorting the sequence of uncovering then finding.',
      },
      teachingPoint:
        'To fix a run-on between two independent clauses, add a comma + coordinating conjunction, a semicolon, or a period.',
    },
    {
      id: 'bnd-d-010',
      skillSlug: 'boundaries',
      subskill: 'colon vs semicolon',
      difficulty: 'hard',
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
        'The first clause is complete and the second identifies and explains the "one insurmountable obstacle," so a colon is the ideal introducer for the elaboration.',
      wrongAnswerExplanations: {
        B: 'A comma alone joining two independent clauses is a comma splice.',
        C: '", that the mountain pass had been buried" is ungrammatical and does not connect to the noun "obstacle" cleanly.',
        D: '"And" joins the clauses as equal ideas but loses the explanatory relationship the sentence requires; it also creates a run-on without a preceding comma.',
      },
      teachingPoint:
        'A colon after a complete clause is the strongest choice when the following clause explains or specifies what was just mentioned.',
    },
  ],
}
