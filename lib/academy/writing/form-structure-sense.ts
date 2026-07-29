import type { AcademySkill } from '../types'

export const formStructureSense: AcademySkill = {
  slug: 'form-structure-sense',
  title: 'Form, Structure, and Sense',
  section: 'writing',
  objective:
    'By the end of this lesson, you will be able to identify and correct errors in subject-verb agreement, pronoun agreement, verb tense, modifiers, and parallel structure so that every sentence is logically and grammatically sound.',
  estimatedMinutes: 28,
  subskills: [
    'Subject-Verb Agreement',
    'Pronoun Agreement and Clarity',
    'Verb Tense and Form',
    'Modifiers',
    'Parallel Structure',
    'Comparisons',
    'Possessives and Plurals',
  ],
  overview: {
    whatItTests:
      'Subject-verb agreement, pronoun agreement, verb tense, verb form, modifiers, parallel structure, and word choice within a sentence.',
    howItAppears:
      'The prompt asks, "Which choice conforms to the conventions of Standard English?" and offers four grammatical variants of the same underlined element.',
    whyStudentsMissIt:
      'Students match the verb to the nearest noun rather than the true subject, overlook interrupted subject-verb pairs, and ignore parallel-structure requirements in lists and comparisons.',
    whatToLookFor:
      'The true grammatical subject (ignore prepositional phrases and appositives), consistent tense and verb form, pronoun-antecedent agreement in number, and parallel form across items in a list or comparison.',
  },
  strategy: {
    steps: [
      'Find the grammatical subject by mentally stripping out prepositional phrases, appositives, and any interrupting clauses.',
      'For agreement questions, decide whether the true subject is singular or plural, then match the verb.',
      'For pronoun questions, locate the antecedent and match it in number and gender; make sure the reference is unambiguous.',
      'For tense questions, use time-marker context clues (yesterday, by next year, currently) to fix the correct tense.',
      'For parallel structure, identify the pattern already established (all -ing, all infinitives, all nouns) and force every item to match it.',
    ],
    timeSavingTip:
      'Cross out everything between the subject and the verb with your pencil. What remains — bare subject next to bare verb — makes agreement errors obvious.',
    whenNotToOverthink:
      'These questions reward one clear rule per item. Once you have pinpointed the rule being tested (agreement, tense, parallelism), apply it and move on rather than re-reading the whole passage for meaning.',
  },
  commonTraps: [
    {
      title: 'Matching the verb to the nearest noun',
      description:
        'When a phrase separates the subject from the verb, the noun closest to the verb is often the wrong one to agree with.',
      avoidance:
        'Ignore prepositional phrases like "of the students" and agree with the actual subject noun.',
      miniExample:
        'WRONG: "The box of chocolates were left on the table." RIGHT: "The box of chocolates was left on the table." (Subject is "box," not "chocolates.")',
      category: 'clause',
    },
    {
      title: 'Plural pronoun for a singular noun',
      description:
        'Collective nouns (committee, team, company) and singular indefinite pronouns (each, everyone, neither) are singular even when they feel plural.',
      avoidance:
        'Treat "each," "everyone," "the committee," and similar subjects as singular unless the sentence clearly refers to individual members.',
      miniExample:
        'WRONG: "Everyone must bring their own pencil." RIGHT: "Everyone must bring his or her own pencil." ("Everyone" is singular.)',
      category: 'meaning',
    },
    {
      title: 'Unjustified tense shift',
      description:
        'Answer choices sometimes switch tense with no time-marker to justify it, breaking consistency with the rest of the passage.',
      avoidance:
        'Keep the verb in the same time frame as the surrounding verbs unless a context clue signals a shift.',
      miniExample:
        'WRONG: "She walked in, sat down, and will order coffee." RIGHT: "She walked in, sat down, and ordered coffee." (No future marker justifies "will order.")',
      category: 'meaning',
    },
    {
      title: 'Broken parallel structure',
      description:
        'In a list or comparison, one item is offered in a form that does not match the others (a noun among gerunds, for example).',
      avoidance:
        'Identify the form of the other items in the series and choose the option that matches it exactly.',
      miniExample:
        'WRONG: "He enjoys hiking, swimming, and to run." RIGHT: "He enjoys hiking, swimming, and running." (All three items must be gerunds.)',
      category: 'clause',
    },
    {
      title: 'Confusing "who" and "whom"',
      description:
        '"Who" functions as a subject; "whom" functions as an object. Test-makers exploit the fact that "whom" sounds formal and "correct."',
      avoidance:
        'Substitute he/she (who) or him/her (whom) into the clause to decide which is right.',
      miniExample:
        'WRONG: "The artist who the gallery featured was unknown." RIGHT: "The artist whom the gallery featured was unknown." ("The gallery featured him" → object → "whom.")',
      category: 'clause',
    },
    {
      title: `Mixing "which" and "that" in relative clauses`,
      description: `Students treat "which" and "that" as interchangeable, but the SAT distinguishes them: "that" introduces an essential (restrictive) clause — one that identifies exactly which noun is meant — while "which," set off by commas, introduces a non-essential (non-restrictive) clause that only adds extra information.`,
      avoidance: `Ask whether removing the clause would change which noun is being identified. If yes, use "that" (no commas). If the clause is merely additional detail, use "which" (with commas).`,
    },
  ],
  guidedExamples: [
    {
      id: 'fss-ex-1',
      level: 'foundation',
      hints: [
        'Identify every noun in the sentence before deciding which one is the subject.',
        'Cross out the prepositional phrase "of rare manuscripts" — what noun is left as the subject?',
      ],
      stimulus:
        'The collection of rare manuscripts, gathered over three decades by a single devoted librarian, _______ now housed in a climate-controlled vault.',
      question: 'Which choice conforms to the conventions of Standard English?',
      steps: [
        {
          instruction: 'Find the true subject',
          content:
            'Strip the prepositional phrase "of rare manuscripts" and the appositive "gathered over three decades...". The subject is "The collection."',
        },
        {
          instruction: 'Decide singular or plural',
          content:
            '"The collection" is singular, even though "manuscripts" (plural) sits right next to the verb slot.',
        },
        {
          instruction: 'Match the verb',
          content:
            'A singular subject takes the singular verb "is." "Are" would wrongly agree with "manuscripts."',
        },
        {
          instruction: 'Confirm the choice',
          content:
            '"is now housed" agrees with "collection" and keeps the present tense consistent with the rest of the sentence.',
        },
      ],
      choices: [
        { label: 'A', text: 'is' },
        { label: 'B', text: 'are' },
        { label: 'C', text: 'were' },
        { label: 'D', text: 'have been' },
      ],
      correctAnswer: 'A',
      explanation:
        'The subject "collection" is singular, so it takes the singular present-tense verb "is." The intervening plural noun "manuscripts" is a distractor.',
      wrongAnswerExplanations: {
        B: '"Are" is plural and agrees with "manuscripts," not the true singular subject "collection."',
        C: '"Were" is both plural and past tense, mismatching the singular subject and the present-tense context.',
        D: '"Have been" is plural and shifts to present perfect without justification; the subject "collection" needs a singular verb.',
      },
      coachTakeaway:
        'The fastest test-day move: bracket the interrupting phrase and read "The collection ___ now housed" — the agreement becomes obvious. The trap is always the nearby plural noun.',
    },
    {
      id: 'fss-ex-2',
      level: 'foundation',
      hints: [
        'Find the list structure in the sentence — how many items are there, and what form do the first two take?',
        'Every item in a parallel list must match the same grammatical form. What form is "building" and "strengthening"?',
      ],
      stimulus:
        'To prepare for the marathon, Dev focused on building endurance, strengthening his core, and _______ his diet.',
      question: 'Which choice conforms to the conventions of Standard English?',
      steps: [
        {
          instruction: 'Spot the list',
          content:
            'The sentence lists three things Dev focused on: "building endurance," "strengthening his core," and a third item.',
        },
        {
          instruction: 'Identify the established pattern',
          content:
            'The first two items are gerund phrases (verb + -ing). Parallel structure requires the third item to be a gerund too.',
        },
        {
          instruction: 'Match the form',
          content:
            '"adjusting his diet" fits the -ing pattern; "to adjust," "he adjusted," and "adjustment of" all break it.',
        },
        {
          instruction: 'Confirm',
          content:
            'The parallel list reads "building..., strengthening..., and adjusting..." — consistent gerunds.',
        },
      ],
      choices: [
        { label: 'A', text: 'to adjust' },
        { label: 'B', text: 'adjusting' },
        { label: 'C', text: 'he adjusted' },
        { label: 'D', text: 'the adjustment of' },
      ],
      correctAnswer: 'B',
      explanation:
        'The first two list items are gerunds ("building," "strengthening"), so the third must also be a gerund: "adjusting."',
      wrongAnswerExplanations: {
        A: '"To adjust" is an infinitive, which breaks the gerund pattern of the list.',
        C: '"He adjusted" is a full clause, which cannot be a parallel item alongside gerund phrases.',
        D: '"The adjustment of" is a noun phrase, breaking the verb-based parallelism of the other items.',
      },
      coachTakeaway:
        'Always name the pattern before scanning choices — "all gerunds" or "all infinitives." Then reject any choice that is a different part of speech. The trap is an infinitive masquerading as a reasonable alternative.',
    },
    {
      id: 'fss-ex-3',
      level: 'sat-application',
      hints: [
        'With "neither...nor," which noun does the verb agree with — the one before "nor" or the one after?',
        'What is the number (singular or plural) of "the players"?',
      ],
      stimulus:
        'Neither the coach nor the players _______ satisfied with the referee’s final call.',
      question: 'Which choice conforms to the conventions of Standard English?',
      steps: [
        {
          instruction: 'Recognize the correlative subject',
          content:
            'With "neither...nor," the verb agrees with the noun closer to it — here, "the players."',
        },
        {
          instruction: 'Determine number of the nearer noun',
          content:
            '"players" is plural, so the verb must be plural.',
        },
        {
          instruction: 'Match tense and number',
          content:
            'The context is a completed event ("final call"), and the plural subject calls for "were."',
        },
        {
          instruction: 'Confirm',
          content:
            '"were satisfied" agrees with the nearer plural noun and fits the past-tense frame.',
        },
      ],
      choices: [
        { label: 'A', text: 'was' },
        { label: 'B', text: 'were' },
        { label: 'C', text: 'is' },
        { label: 'D', text: 'has been' },
      ],
      correctAnswer: 'B',
      explanation:
        'With "neither...nor," the verb agrees with the closer subject, "the players," which is plural, so "were" is correct.',
      wrongAnswerExplanations: {
        A: '"Was" is singular; with "neither...nor," the verb must agree with the nearer noun "players," which is plural.',
        C: '"Is" is singular and present tense, mismatching both the plural nearer noun and the past-tense context.',
        D: '"Has been" is singular and shifts to present perfect without justification.',
      },
      coachTakeaway:
        'Memorize the "closer noun" rule for correlative conjunctions (either...or, neither...nor, not only...but also). The distractor is always the first noun — ignore it and lock on to the noun right before the verb slot.',
    },
    {
      id: 'fss-ex-4',
      level: 'sat-application',
      stimulus: `The policy _______ most controversially in urban districts requires schools to begin the day no earlier than eight o'clock in the morning.`,
      question: 'Which choice conforms to the conventions of Standard English?',
      steps: [
        {
          instruction: `Identify the blank's grammatical role`,
          content: `The blank sits inside a relative clause that modifies "the policy." We need a relative pronoun that introduces a clause modifying a thing, not a person.`,
        },
        {
          instruction: 'Apply the that/which rule',
          content: `The clause "most controversially in urban districts" identifies which policy is meant — it is essential to the noun. An essential relative clause uses "that," not "which."`,
        },
        {
          instruction: 'Check for commas',
          content: `No commas surround the clause, confirming it is essential (restrictive). "That" is correct; "which" would require commas.`,
        },
        {
          instruction: 'Confirm',
          content: `"The policy that most controversially..." correctly identifies the specific policy. The sentence reads cleanly without commas.`,
        },
      ],
      choices: [
        { label: 'A', text: 'which implemented' },
        { label: 'B', text: 'it was implemented' },
        { label: 'C', text: 'that was implemented' },
        { label: 'D', text: 'being implemented' },
      ],
      correctAnswer: 'C',
      explanation: `The blank requires a relative pronoun that introduces an essential clause modifying "policy" (a thing). "That was implemented" correctly inserts the relative clause without commas.`,
      wrongAnswerExplanations: {
        A: `"Which implemented" uses "which" without commas, which is nonstandard for an essential clause, and the phrasing is awkward.`,
        B: `"It was implemented" creates a run-on by inserting an independent clause without a conjunction.`,
        D: `"Being implemented" is a participial phrase that creates an ambiguous modifier and lacks the relative pronoun needed to anchor the clause to "policy."`,
      },
      coachTakeaway: `Essential clauses (no commas) use "that"; non-essential clauses (surrounded by commas) use "which." Check for commas first — they tell you which word to use before you even look at the choices.`,
    },
    {
      id: 'fss-ex-5',
      level: 'advanced',
      stimulus: `The mountain rescue team noted that the stranded hikers _______ for two days before the storm broke and search parties could finally reach them.`,
      question: 'Which choice conforms to the conventions of Standard English?',
      steps: [
        {
          instruction: 'Identify the time relationship',
          content: `The hikers were stranded before two things happened: the storm broke, and rescuers arrived. The stranding preceded both past events.`,
        },
        {
          instruction: 'Choose the right tense',
          content: `When one past action preceded another past event, the earlier action takes the past perfect. Here the hikers' ordeal preceded the past-tense "storm broke."`,
        },
        {
          instruction: 'Check for duration',
          content: `"For two days" signals duration, which is compatible with the past perfect progressive ("had been waiting") as well as the simple past perfect ("had waited"). The progressive emphasizes the ongoing nature of the wait.`,
        },
        {
          instruction: 'Confirm',
          content: `"Had been waiting" — past perfect progressive — correctly places the hikers' ordeal before the storm breaking and conveys its ongoing duration.`,
        },
      ],
      choices: [
        { label: 'A', text: 'waited' },
        { label: 'B', text: 'have been waiting' },
        { label: 'C', text: 'had been waiting' },
        { label: 'D', text: 'were waiting' },
      ],
      correctAnswer: 'C',
      explanation: `The waiting preceded the past events "the storm broke" and the rescuers' arrival. Past perfect progressive "had been waiting" correctly marks the duration of the earlier action.`,
      wrongAnswerExplanations: {
        A: `"Waited" is simple past and does not signal that the waiting preceded the other past events.`,
        B: `"Have been waiting" is present perfect and clashes with the clearly past narrative.`,
        D: `"Were waiting" is simple past progressive and treats the waiting as simultaneous with the storm breaking, which contradicts "before."`,
      },
      coachTakeaway: `"For [duration]" + an action that ended before another past event = past perfect or past perfect progressive. The key marker is "before" or "by the time" linking two past moments.`,
    },
    {
      id: 'fss-ex-6',
      level: 'advanced',
      stimulus: `The lead scientist, as well as her two postdoctoral researchers, _______ scheduled to present the findings at the international symposium next month.`,
      question: 'Which choice conforms to the conventions of Standard English?',
      steps: [
        {
          instruction: 'Locate the true subject',
          content: `"The lead scientist" is the grammatical subject. "As well as her two postdoctoral researchers" is a parenthetical phrase, not part of a compound subject.`,
        },
        {
          instruction: `Apply the "as well as" rule`,
          content: `Unlike "and," the phrase "as well as" introduces a parenthetical and does not make the subject plural. The verb must agree with the singular "lead scientist."`,
        },
        {
          instruction: 'Identify the correct tense',
          content: `"Next month" points to the future, so a future or future-oriented verb is needed with a singular subject.`,
        },
        {
          instruction: 'Confirm',
          content: `"Is scheduled" — singular present — agrees with "lead scientist" and sets up the future infinitive "to present" correctly.`,
        },
      ],
      choices: [
        { label: 'A', text: 'are' },
        { label: 'B', text: 'were' },
        { label: 'C', text: 'is' },
        { label: 'D', text: 'have been' },
      ],
      correctAnswer: 'C',
      explanation: `"As well as" is a parenthetical phrase and does not create a compound subject. The verb must agree with the singular "lead scientist": "is scheduled."`,
      wrongAnswerExplanations: {
        A: `"Are" is plural and treats the postdoctoral researchers as co-subjects, which "as well as" does not do.`,
        B: `"Were" is plural and past tense, mismatching both the singular subject and the future context.`,
        D: `"Have been" is plural present perfect, disagreeing with the singular subject and misaligning with the future context.`,
      },
      coachTakeaway: `Phrases like "as well as," "along with," "in addition to," and "together with" are parenthetical. They do not change the subject's number. Bracket them, then match the verb to the original subject.`,
    },
    {
      id: 'fss-ex-7',
      level: 'challenge',
      stimulus: `Whichever candidate _______ the most votes in Tuesday's primary will advance directly to the general election without a runoff.`,
      question: 'Which choice conforms to the conventions of Standard English?',
      steps: [
        {
          instruction: `Find the subject of the blank's clause`,
          content: `The word "Whichever candidate" is the subject of a noun clause functioning as the subject of the whole sentence. The blank is the verb of that noun clause.`,
        },
        {
          instruction: 'Determine number',
          content: `"Whichever candidate" is singular — it refers to a single person, whoever that turns out to be.`,
        },
        {
          instruction: 'Identify the required tense',
          content: `The sentence describes a future general-election scenario. When a subordinate clause with a general/conditional meaning refers to the future, English uses simple present ("receives"), not future tense.`,
        },
        {
          instruction: 'Confirm',
          content: `"receives" — singular simple present — correctly fills the blank. The main clause "will advance" carries the future meaning.`,
        },
      ],
      choices: [
        { label: 'A', text: 'receives' },
        { label: 'B', text: 'will receive' },
        { label: 'C', text: 'receive' },
        { label: 'D', text: 'would receive' },
      ],
      correctAnswer: 'A',
      explanation: `In conditional and time clauses, Standard English uses simple present for a future reference: "Whichever candidate receives..." The singular "candidate" also demands the -s form.`,
      wrongAnswerExplanations: {
        B: `"Will receive" is grammatically awkward in a subordinate "whichever" clause; English convention uses simple present here.`,
        C: `"Receive" is plural and does not agree with the singular "candidate."`,
        D: `"Would receive" introduces unwarranted conditionality and does not fit the noun clause structure.`,
      },
      coachTakeaway: `In clauses beginning with "whoever," "whichever," "whenever," or "if," use simple present even when the meaning is future. The future marker belongs in the main clause ("will advance"), not the subordinate clause.`,
    },
    {
      id: 'fss-ex-8',
      level: 'challenge',
      stimulus: `To win the championship, the team needed not only to outscore its rivals on the final day but also _______ the tiebreaker criteria set by the league.`,
      question: 'Which choice conforms to the conventions of Standard English?',
      steps: [
        {
          instruction: 'Recognize the correlative structure',
          content: `"Not only...but also" is a correlative conjunction. Both elements it joins must be grammatically parallel.`,
        },
        {
          instruction: 'Identify the form of the first element',
          content: `After "not only" we have "to outscore its rivals" — an infinitive phrase. The element after "but also" must also be an infinitive phrase.`,
        },
        {
          instruction: 'Match the form',
          content: `"To meet the tiebreaker criteria" is an infinitive phrase matching "to outscore its rivals." All other options break the parallel structure.`,
        },
        {
          instruction: 'Confirm',
          content: `"not only to outscore...but also to meet..." — both infinitive phrases, perfectly parallel.`,
        },
      ],
      choices: [
        { label: 'A', text: 'meeting' },
        { label: 'B', text: 'the meeting of' },
        { label: 'C', text: 'to meet' },
        { label: 'D', text: 'it had to meet' },
      ],
      correctAnswer: 'C',
      explanation: `"Not only...but also" requires parallel structure. Since the first element is "to outscore" (infinitive), the second must be "to meet" (infinitive).`,
      wrongAnswerExplanations: {
        A: `"Meeting" is a gerund, which breaks the infinitive pattern established by "to outscore."`,
        B: `"The meeting of" is a noun phrase and shatters the parallel structure.`,
        D: `"It had to meet" is a full clause, which cannot serve as the parallel element in a correlative conjunction pair.`,
      },
      coachTakeaway: `With "not only...but also" (and "either...or," "both...and," "neither...nor"), the grammatical form on both sides of the conjunction must match exactly. Name the form after "not only" first, then force the same form after "but also."`,
    },
  ],
  drillQuestions: [
    {
      id: 'fss-d-001',
      skillSlug: 'form-structure-sense',
      subskill: 'subject-verb agreement',
      difficulty: 'easy',
      level: 'foundation',
      errorCategory: 'prepositional-phrase-distractor',
      stimulus:
        'The stack of overdue library books _______ on the corner of her desk.',
      question: 'Which choice conforms to the conventions of Standard English?',
      choices: [
        { label: 'A', text: 'sit' },
        { label: 'B', text: 'sits' },
        { label: 'C', text: 'have sat' },
        { label: 'D', text: 'are sitting' },
      ],
      correctAnswer: 'B',
      explanation:
        'The subject is "stack" (singular), not "books," so it takes the singular verb "sits."',
      wrongAnswerExplanations: {
        A: '"Sit" is plural and agrees with "books" rather than the true singular subject "stack."',
        C: '"Have sat" is plural and agrees with "books," not "stack."',
        D: '"Are sitting" is plural and agrees with "books," not the singular subject "stack."',
      },
      teachingPoint:
        'Ignore the prepositional phrase "of overdue library books"; the verb agrees with "stack."',
    },
    {
      id: 'fss-d-002',
      skillSlug: 'form-structure-sense',
      subskill: 'pronoun agreement',
      difficulty: 'easy',
      level: 'foundation',
      errorCategory: 'indefinite-pronoun-number',
      stimulus:
        'Each of the volunteers submitted _______ availability for the weekend shifts.',
      question: 'Which choice conforms to the conventions of Standard English?',
      choices: [
        { label: 'A', text: 'their' },
        { label: 'B', text: 'his or her' },
        { label: 'C', text: 'they’re' },
        { label: 'D', text: 'its' },
      ],
      correctAnswer: 'B',
      explanation:
        '"Each" is a singular indefinite pronoun, so it takes the singular "his or her."',
      wrongAnswerExplanations: {
        A: '"Their" is plural, but the antecedent "each" is singular.',
        C: '"They’re" means "they are" and is not a possessive pronoun at all.',
        D: '"Its" refers to a thing, not to the people denoted by "each of the volunteers."',
      },
      teachingPoint:
        'Indefinite pronouns like "each," "everyone," and "neither" are singular.',
    },
    {
      id: 'fss-d-003',
      skillSlug: 'form-structure-sense',
      subskill: 'verb tense',
      difficulty: 'easy',
      level: 'foundation',
      errorCategory: 'past-perfect-usage',
      stimulus:
        'By the time the doors opened, the fans _______ in line for nearly six hours.',
      question: 'Which choice conforms to the conventions of Standard English?',
      choices: [
        { label: 'A', text: 'wait' },
        { label: 'B', text: 'are waiting' },
        { label: 'C', text: 'had waited' },
        { label: 'D', text: 'will wait' },
      ],
      correctAnswer: 'C',
      explanation:
        'The waiting was completed before another past event ("the doors opened"), so the past perfect "had waited" is correct.',
      wrongAnswerExplanations: {
        A: '"Wait" is present tense and clashes with the past-tense frame "the doors opened."',
        B: '"Are waiting" is present progressive, inconsistent with the past context.',
        D: '"Will wait" is future tense, which contradicts the completed past action.',
      },
      teachingPoint:
        'Use the past perfect for an action finished before another past action.',
    },
    {
      id: 'fss-d-004',
      skillSlug: 'form-structure-sense',
      subskill: 'subject-verb agreement',
      difficulty: 'medium',
      level: 'sat-application',
      errorCategory: 'parenthetical-interruption',
      stimulus:
        'The senator, along with several of her closest aides, _______ scheduled to testify before the committee next week.',
      question: 'Which choice conforms to the conventions of Standard English?',
      choices: [
        { label: 'A', text: 'are' },
        { label: 'B', text: 'is' },
        { label: 'C', text: 'were' },
        { label: 'D', text: 'have been' },
      ],
      correctAnswer: 'B',
      explanation:
        '"Along with several of her closest aides" is a parenthetical; the subject is the singular "senator," so the verb is "is."',
      wrongAnswerExplanations: {
        A: '"Are" is plural and treats the aides as part of a compound subject, which "along with" does not create.',
        C: '"Were" is plural and past tense, mismatching both the singular subject and the future-oriented "next week."',
        D: '"Have been" is plural and shifts tense without justification.',
      },
      teachingPoint:
        'Phrases like "along with," "as well as," and "in addition to" do not change the number of the subject.',
    },
    {
      id: 'fss-d-005',
      skillSlug: 'form-structure-sense',
      subskill: 'parallel structure',
      difficulty: 'medium',
      level: 'sat-application',
      errorCategory: 'parallel-list-mismatch',
      stimulus:
        'The internship taught Priya how to analyze data, how to present findings clearly, and _______.',
      question: 'Which choice conforms to the conventions of Standard English?',
      choices: [
        { label: 'A', text: 'collaborating across departments' },
        { label: 'B', text: 'how to collaborate across departments' },
        { label: 'C', text: 'that she should collaborate across departments' },
        { label: 'D', text: 'collaboration across departments' },
      ],
      correctAnswer: 'B',
      explanation:
        'The list uses the pattern "how to + verb," so the third item must follow it: "how to collaborate across departments."',
      wrongAnswerExplanations: {
        A: '"Collaborating" is a gerund and breaks the "how to + verb" pattern.',
        C: '"That she should collaborate" is a clause, not a parallel infinitive phrase.',
        D: '"Collaboration across departments" is a noun phrase, breaking the parallelism.',
      },
      teachingPoint:
        'Match the exact grammatical form ("how to + verb") already set by the earlier list items.',
    },
    {
      id: 'fss-d-006',
      skillSlug: 'form-structure-sense',
      subskill: 'pronoun clarity',
      difficulty: 'medium',
      level: 'sat-application',
      errorCategory: 'ambiguous-pronoun-reference',
      stimulus:
        'When the technicians upgraded the servers, _______ ran far more quietly than before.',
      question: 'Which choice conforms to the conventions of Standard English?',
      choices: [
        { label: 'A', text: 'they' },
        { label: 'B', text: 'it' },
        { label: 'C', text: 'the servers' },
        { label: 'D', text: 'these' },
      ],
      correctAnswer: 'C',
      explanation:
        '"They" could refer to the technicians or the servers, so the ambiguous pronoun must be replaced by the specific noun "the servers."',
      wrongAnswerExplanations: {
        A: '"They" is ambiguous — it could mean the technicians or the servers.',
        B: '"It" is singular and cannot refer to the plural "servers."',
        D: '"These" is vague and lacks a clear antecedent.',
      },
      teachingPoint:
        'When a pronoun could point to more than one noun, replace it with the specific noun.',
    },
    {
      id: 'fss-d-007',
      skillSlug: 'form-structure-sense',
      subskill: 'verb form',
      difficulty: 'medium',
      level: 'sat-application',
      errorCategory: 'conditional-verb-form',
      stimulus:
        'Had the pilot noticed the warning light sooner, she _______ the emergency landing entirely.',
      question: 'Which choice conforms to the conventions of Standard English?',
      choices: [
        { label: 'A', text: 'avoids' },
        { label: 'B', text: 'will avoid' },
        { label: 'C', text: 'might have avoided' },
        { label: 'D', text: 'avoided' },
      ],
      correctAnswer: 'C',
      explanation:
        'The conditional "Had the pilot noticed..." sets up a hypothetical past, which requires "might have avoided."',
      wrongAnswerExplanations: {
        A: '"Avoids" is present tense and cannot complete a past hypothetical.',
        B: '"Will avoid" is future tense and mismatches the past conditional.',
        D: '"Avoided" states a fact rather than the hypothetical result required by "Had...noticed."',
      },
      teachingPoint:
        'Inverted conditionals ("Had she known...") pair with "would/might/could have + past participle."',
    },
    {
      id: 'fss-d-008',
      skillSlug: 'form-structure-sense',
      subskill: 'modifier placement',
      difficulty: 'hard',
      level: 'advanced',
      errorCategory: 'dangling-modifier',
      stimulus:
        '_______, the ancient bridge finally reopened to pedestrian traffic.',
      question: 'Which choice conforms to the conventions of Standard English?',
      choices: [
        {
          label: 'A',
          text: 'Restored after years of neglect',
        },
        {
          label: 'B',
          text: 'After the engineers restored it following years of neglect',
        },
        {
          label: 'C',
          text: 'Having restored it after years of neglect',
        },
        {
          label: 'D',
          text: 'Restoring it after years of neglect',
        },
      ],
      correctAnswer: 'A',
      explanation:
        'The modifier must sensibly describe "the ancient bridge," which was restored; "Restored after years of neglect" correctly modifies the bridge.',
      wrongAnswerExplanations: {
        B: 'This is a full clause, not a modifier that attaches to the subject; it leaves a comma splice or dangling structure with the following clause.',
        C: '"Having restored it" implies the bridge restored something, a dangling modifier.',
        D: '"Restoring it" implies the bridge is doing the restoring, another dangling modifier.',
      },
      teachingPoint:
        'An introductory modifier must logically describe the noun that immediately follows the comma.',
    },
    {
      id: 'fss-d-009',
      skillSlug: 'form-structure-sense',
      subskill: 'parallel structure in comparison',
      difficulty: 'hard',
      level: 'advanced',
      errorCategory: 'comparative-pronoun-substitute',
      stimulus:
        'Critics argued that the film’s dialogue was sharper than _______ of its acclaimed predecessor.',
      question: 'Which choice conforms to the conventions of Standard English?',
      choices: [
        { label: 'A', text: 'the dialogue' },
        { label: 'B', text: 'that' },
        { label: 'C', text: 'those' },
        { label: 'D', text: 'them' },
      ],
      correctAnswer: 'B',
      explanation:
        'The comparison is between two dialogues; the singular substitute "that" stands in for "the dialogue" and keeps the comparison parallel.',
      wrongAnswerExplanations: {
        A: 'Repeating "the dialogue" is redundant and wordy when "that of" is available and cleaner; the sentence tests the concise comparative form.',
        C: '"Those" is plural and cannot substitute for the singular "dialogue."',
        D: '"Them" is a plural object pronoun and cannot stand for a singular noun in this comparison.',
      },
      teachingPoint:
        'Use "that of" for a singular noun and "those of" for a plural noun in comparisons.',
    },
    {
      id: 'fss-d-010',
      skillSlug: 'form-structure-sense',
      subskill: 'who vs whom',
      difficulty: 'hard',
      level: 'advanced',
      errorCategory: 'who-whom-case',
      stimulus:
        'The mentor _______ the students admired most retired at the end of the semester.',
      question: 'Which choice conforms to the conventions of Standard English?',
      choices: [
        { label: 'A', text: 'who' },
        { label: 'B', text: 'whom' },
        { label: 'C', text: 'which' },
        { label: 'D', text: 'whose' },
      ],
      correctAnswer: 'B',
      explanation:
        'In the clause "the students admired ___," the missing word is the object of "admired," so the object pronoun "whom" is correct.',
      wrongAnswerExplanations: {
        A: '"Who" is a subject pronoun, but here the word is the object of "admired."',
        C: '"Which" refers to things, not people.',
        D: '"Whose" is possessive and does not fit the object slot of "admired."',
      },
      teachingPoint:
        'Test with he/him: "the students admired him" → "him" signals the object form "whom."',
    },
    {
      id: 'fss-d-011',
      skillSlug: 'form-structure-sense',
      subskill: 'modifier placement',
      difficulty: 'medium',
      level: 'sat-application',
      errorCategory: 'dangling-modifier',
      stimulus:
        '_______, the geologist mapped every crack and fault line visible on the cliff face.',
      question: 'Which choice conforms to the conventions of Standard English?',
      choices: [
        { label: 'A', text: 'Suspended from a rope harness' },
        { label: 'B', text: 'Having suspended the rope harness' },
        { label: 'C', text: 'The rope harness was suspended' },
        { label: 'D', text: 'Suspending from a rope harness' },
      ],
      correctAnswer: 'A',
      explanation:
        'The introductory modifier must describe "the geologist," who was suspended from the harness. "Suspended from a rope harness" correctly modifies the geologist.',
      wrongAnswerExplanations: {
        B: '"Having suspended the rope harness" implies the geologist suspended the harness rather than being suspended by it, creating a logical error.',
        C: '"The rope harness was suspended" is a full independent clause; placed before the comma it creates a comma splice.',
        D: '"Suspending from a rope harness" implies the geologist is doing the suspending, a dangling modifier.',
      },
      teachingPoint:
        'Check whether the modifier logically applies to the subject of the main clause. The noun right after the comma is the one the modifier must describe.',
    },
    {
      id: 'fss-d-012',
      skillSlug: 'form-structure-sense',
      subskill: 'parallel structure',
      difficulty: 'medium',
      level: 'sat-application',
      errorCategory: 'parallel-list-mismatch',
      stimulus:
        'The foundation’s grant guidelines require applicants to submit a project proposal, to provide three letters of recommendation, and _______.',
      question: 'Which choice conforms to the conventions of Standard English?',
      choices: [
        { label: 'A', text: 'a detailed budget must also be included' },
        { label: 'B', text: 'including a detailed budget' },
        { label: 'C', text: 'to attach a detailed budget' },
        { label: 'D', text: 'the attachment of a detailed budget' },
      ],
      correctAnswer: 'C',
      explanation:
        'The list follows the pattern "to + verb" (to submit, to provide). The third item must continue this pattern: "to attach a detailed budget."',
      wrongAnswerExplanations: {
        A: '"A detailed budget must also be included" is a full independent clause, which cannot serve as a parallel list item alongside infinitive phrases.',
        B: '"Including a detailed budget" is a participial phrase and breaks the "to + verb" pattern.',
        D: '"The attachment of a detailed budget" is a noun phrase that disrupts the parallelism.',
      },
      teachingPoint:
        'In a list of infinitive phrases, every item must begin with "to + base verb." Spot the pattern before scanning the choices.',
    },
    {
      id: 'fss-d-013',
      skillSlug: 'form-structure-sense',
      subskill: 'pronoun clarity',
      difficulty: 'hard',
      level: 'advanced',
      errorCategory: 'ambiguous-pronoun-reference',
      stimulus:
        'After the historian interviewed the archivist, _______ published the findings in a peer-reviewed journal.',
      question: 'Which choice conforms to the conventions of Standard English?',
      choices: [
        { label: 'A', text: 'they' },
        { label: 'B', text: 'she' },
        { label: 'C', text: 'the historian' },
        { label: 'D', text: 'it' },
      ],
      correctAnswer: 'C',
      explanation:
        '"They" and "she" are both ambiguous because two people — the historian and the archivist — are mentioned. Naming "the historian" removes the ambiguity.',
      wrongAnswerExplanations: {
        A: '"They" could refer to either the historian, the archivist, or both together, making the reference unclear.',
        B: '"She" could refer to the historian or the archivist if both are women, leaving the reader uncertain.',
        D: '"It" is singular and neuter; it cannot logically refer to a person who published findings.',
      },
      teachingPoint:
        'When two people of the same or unspecified gender appear in a sentence, avoid any pronoun that could refer to either one — replace it with the specific noun.',
    },
    {
      id: 'fss-d-014',
      skillSlug: 'form-structure-sense',
      subskill: 'verb tense sequence',
      difficulty: 'hard',
      level: 'advanced',
      errorCategory: 'tense-sequence-error',
      stimulus:
        'By the time the construction crew _______ the foundation, the architect had already revised the blueprint twice.',
      question: 'Which choice conforms to the conventions of Standard English?',
      choices: [
        { label: 'A', text: 'will pour' },
        { label: 'B', text: 'poured' },
        { label: 'C', text: 'pours' },
        { label: 'D', text: 'has poured' },
      ],
      correctAnswer: 'B',
      explanation:
        'The sentence describes two past events. The blueprint revision ("had already revised") used past perfect to show it came before the pouring. The pouring itself is a simple past event: "poured."',
      wrongAnswerExplanations: {
        A: '"Will pour" is future tense, inconsistent with the past-tense context established by "had already revised."',
        C: '"Pours" is present tense and clashes with the clearly past-tense framing of the whole sentence.',
        D: '"Has poured" is present perfect and does not fit the past narrative established by "had already revised."',
      },
      teachingPoint:
        'In a sentence with "by the time," the clause introduced by "by the time" uses simple past, while the other clause uses past perfect to mark the earlier action.',
    },
    {
      id: 'fss-d-015',
      skillSlug: 'form-structure-sense',
      subskill: 'subject-verb agreement with intervening phrase',
      difficulty: 'hard',
      level: 'challenge',
      errorCategory: 'complex-intervening-phrase',
      stimulus:
        'The discovery of new fossilized footprints, each impression measuring nearly thirty centimeters across and preserved in remarkable detail, _______ researchers to rethink the migration range of this prehistoric species.',
      question: 'Which choice conforms to the conventions of Standard English?',
      choices: [
        { label: 'A', text: 'have led' },
        { label: 'B', text: 'lead' },
        { label: 'C', text: 'has led' },
        { label: 'D', text: 'are leading' },
      ],
      correctAnswer: 'C',
      explanation:
        'The true subject is "The discovery" (singular). The long appositive phrase between the subject and verb — "each impression measuring...detail" — is a distractor. A singular subject requires the singular verb "has led."',
      wrongAnswerExplanations: {
        A: '"Have led" is plural, wrongly agreeing with "footprints" or "impressions" rather than the singular subject "discovery."',
        B: '"Lead" is plural present tense, mismatching the singular subject and breaking from the context.',
        D: '"Are leading" is plural and progressive, agreeing with neither the singular subject nor the present-perfect frame appropriate here.',
      },
      teachingPoint:
        'Long appositive phrases can contain many plural nouns; bracket the entire phrase and read the sentence without it. The verb must still agree with the original subject noun.',
    },
    {
      id: 'fss-d-016',
      skillSlug: 'form-structure-sense',
      subskill: 'subject-verb agreement',
      difficulty: 'easy',
      level: 'foundation',
      stimulus: `A bouquet of red and white roses _______ displayed prominently on the reception table.`,
      question: 'Which choice conforms to the conventions of Standard English?',
      choices: [
        { label: 'A', text: 'is' },
        { label: 'B', text: 'are' },
        { label: 'C', text: 'were' },
        { label: 'D', text: 'have been' },
      ],
      correctAnswer: 'A',
      explanation: `The subject is "bouquet" (singular). The prepositional phrase "of red and white roses" is a distractor. The singular verb "is" is correct.`,
      wrongAnswerExplanations: {
        B: `"Are" is plural and wrongly agrees with "roses" rather than the true singular subject "bouquet."`,
        C: `"Were" is plural and past tense, mismatching both the singular subject and the present-tense context.`,
        D: `"Have been" is plural and shifts to present perfect without any justification from the context.`,
      },
      teachingPoint: `Strip the prepositional phrase "of red and white roses" and you are left with "A bouquet ___ displayed" — the singular agreement becomes obvious.`,
    },
    {
      id: 'fss-d-017',
      skillSlug: 'form-structure-sense',
      subskill: 'pronoun agreement',
      difficulty: 'easy',
      level: 'foundation',
      stimulus: `Neither of the two candidates revealed _______ strategy for handling the budget shortfall during the debate.`,
      question: 'Which choice conforms to the conventions of Standard English?',
      choices: [
        { label: 'A', text: 'their' },
        { label: 'B', text: 'its' },
        { label: 'C', text: 'his or her' },
        { label: 'D', text: `they're` },
      ],
      correctAnswer: 'C',
      explanation: `"Neither" is a singular indefinite pronoun. The singular possessive "his or her" agrees with it.`,
      wrongAnswerExplanations: {
        A: `"Their" is plural, but "neither" is grammatically singular.`,
        B: `"Its" refers to a non-human entity; "candidates" are people, so "his or her" is appropriate.`,
        D: `"They're" means "they are" — it is a contraction, not a possessive, and cannot fill this blank.`,
      },
      teachingPoint: `"Neither," "either," "each," and "every" are all singular indefinite pronouns regardless of the noun that follows "of."`,
    },
    {
      id: 'fss-d-018',
      skillSlug: 'form-structure-sense',
      subskill: 'parallel structure',
      difficulty: 'medium',
      level: 'sat-application',
      stimulus: `The renovation project required the crew to strip the old flooring, to replace the subfloor panels, and _______.`,
      question: 'Which choice conforms to the conventions of Standard English?',
      choices: [
        { label: 'A', text: 'to install new hardwood planks' },
        { label: 'B', text: 'installing new hardwood planks' },
        { label: 'C', text: 'the installation of new hardwood planks' },
        { label: 'D', text: 'new hardwood planks were installed' },
      ],
      correctAnswer: 'A',
      explanation: `The list follows the pattern "to + verb" (to strip, to replace). The third item must match: "to install new hardwood planks."`,
      wrongAnswerExplanations: {
        B: `"Installing" is a gerund and breaks the "to + verb" pattern set by the other list items.`,
        C: `"The installation of" is a noun phrase that disrupts the infinitive parallelism.`,
        D: `"New hardwood planks were installed" is a full clause that cannot serve as a parallel list item alongside infinitive phrases.`,
      },
      teachingPoint: `When a list uses "to + verb" for its first two items, every remaining item must also use "to + verb." Never mix infinitives with gerunds or clauses in the same list.`,
    },
    {
      id: 'fss-d-019',
      skillSlug: 'form-structure-sense',
      subskill: 'modifier placement',
      difficulty: 'medium',
      level: 'sat-application',
      stimulus: `_______, the relief workers distributed emergency supplies to every affected household within the flooded neighborhood.`,
      question: 'Which choice conforms to the conventions of Standard English?',
      choices: [
        { label: 'A', text: 'Working through the night without rest' },
        { label: 'B', text: 'Having worked through the night, the supplies' },
        { label: 'C', text: 'The supplies were distributed through the night' },
        { label: 'D', text: 'Through-the-night work' },
      ],
      correctAnswer: 'A',
      explanation: `The introductory modifier must logically describe the subject of the main clause — "the relief workers," who worked through the night. "Working through the night without rest" correctly modifies the workers.`,
      wrongAnswerExplanations: {
        B: `"Having worked through the night, the supplies" implies the supplies did the working, a dangling modifier.`,
        C: `"The supplies were distributed through the night" creates a comma splice by placing a full clause before the comma.`,
        D: `"Through-the-night work" is a noun phrase, not an introductory participial modifier.`,
      },
      teachingPoint: `The subject of the main clause must be able to perform the action described in the introductory modifier. If not, the modifier dangles. Always check: who or what is doing what the modifier describes?`,
    },
    {
      id: 'fss-d-020',
      skillSlug: 'form-structure-sense',
      subskill: 'verb tense',
      difficulty: 'medium',
      level: 'sat-application',
      stimulus: `The city council passed the noise ordinance in March, and the new regulations _______ into effect the following July.`,
      question: 'Which choice conforms to the conventions of Standard English?',
      choices: [
        { label: 'A', text: 'will go' },
        { label: 'B', text: 'go' },
        { label: 'C', text: 'went' },
        { label: 'D', text: 'had gone' },
      ],
      correctAnswer: 'C',
      explanation: `Both events are in the past ("passed...in March," "the following July"). Simple past "went" matches the past-tense frame and the sequential time markers.`,
      wrongAnswerExplanations: {
        A: `"Will go" is future tense, but the passage is entirely set in the past.`,
        B: `"Go" is simple present and clashes with the past-tense narrative.`,
        D: `"Had gone" is past perfect, which implies the regulations went into effect before the council passed the ordinance — reversing the actual sequence.`,
      },
      teachingPoint: `When a sentence describes two past events in chronological order, use simple past for both unless you need to signal that one happened before the other, in which case use past perfect for the earlier event only.`,
    },
    {
      id: 'fss-d-021',
      skillSlug: 'form-structure-sense',
      subskill: 'subject-verb agreement with intervening clause',
      difficulty: 'hard',
      level: 'advanced',
      stimulus: `The series of lectures on ancient Roman architecture that the museum began offering last autumn _______ attracted a surprisingly large and diverse audience.`,
      question: 'Which choice conforms to the conventions of Standard English?',
      choices: [
        { label: 'A', text: 'have' },
        { label: 'B', text: 'having' },
        { label: 'C', text: 'has' },
        { label: 'D', text: 'are having' },
      ],
      correctAnswer: 'C',
      explanation: `The true subject is "The series" (singular). The relative clause "that the museum began offering last autumn" is an intervening modifier. The singular verb "has" correctly agrees with "series."`,
      wrongAnswerExplanations: {
        A: `"Have" is plural and wrongly agrees with "lectures" rather than the singular head noun "series."`,
        B: `"Having" is a participle, not a finite verb; the sentence needs a main verb.`,
        D: `"Are having" is plural progressive and neither matches the singular subject nor fits the context of attracting an audience.`,
      },
      teachingPoint: `"Series," "number," "collection," and "pair" are singular nouns that often appear before a long relative clause full of plural nouns. Bracket the entire relative clause, find the true subject, and match the verb to it.`,
    },
    {
      id: 'fss-d-022',
      skillSlug: 'form-structure-sense',
      subskill: 'who vs whom',
      difficulty: 'hard',
      level: 'advanced',
      stimulus: `The panel of judges will award the prize to _______ submits the most innovative solution to the engineering challenge.`,
      question: 'Which choice conforms to the conventions of Standard English?',
      choices: [
        { label: 'A', text: 'whomever' },
        { label: 'B', text: 'whoever' },
        { label: 'C', text: 'whom' },
        { label: 'D', text: 'whichever' },
      ],
      correctAnswer: 'B',
      explanation: `The entire noun clause "whoever submits the most innovative solution" is the object of the preposition "to." Inside that clause, "whoever" is the subject of "submits." Since the pronoun functions as the subject within its own clause, "whoever" (not "whomever") is correct.`,
      wrongAnswerExplanations: {
        A: `"Whomever" is the object form. Although the whole clause is the object of "to," the pronoun inside the clause acts as a subject (it does the submitting), so "whoever" is required.`,
        C: `"Whom" is an object pronoun used in relative clauses, not in noun clauses where a subject form is needed.`,
        D: `"Whichever" refers to things, not to the person who submits a solution.`,
      },
      teachingPoint: `To choose "whoever" vs. "whomever," look inside the noun clause — not at the whole sentence. If the pronoun is the subject of its own clause, use "whoever." If it is the object, use "whomever."`,
    },
    {
      id: 'fss-d-023',
      skillSlug: 'form-structure-sense',
      subskill: 'parallel structure in comparison',
      difficulty: 'hard',
      level: 'advanced',
      stimulus: `The operating costs of the newer facility are lower than _______ of the original plant built in the 1970s.`,
      question: 'Which choice conforms to the conventions of Standard English?',
      choices: [
        { label: 'A', text: 'the operating costs' },
        { label: 'B', text: 'those' },
        { label: 'C', text: 'that' },
        { label: 'D', text: 'it' },
      ],
      correctAnswer: 'B',
      explanation: `The comparison is between two sets of operating costs. "Operating costs" is plural, so the plural substitute pronoun "those" stands in for it, making the comparison parallel and concise.`,
      wrongAnswerExplanations: {
        A: `Repeating "the operating costs" is grammatically acceptable but redundant when "those of" is the cleaner, preferred form tested on the SAT.`,
        C: `"That" is singular and cannot substitute for the plural noun "operating costs."`,
        D: `"It" is singular and cannot refer to the plural "operating costs."`,
      },
      teachingPoint: `In comparisons, use "that of" for a singular noun and "those of" for a plural noun. Matching number between the stand-in pronoun and the original noun is the key check.`,
    },
    {
      id: 'fss-d-024',
      skillSlug: 'form-structure-sense',
      subskill: 'mixed — tense, agreement, and modifier',
      difficulty: 'hard',
      level: 'challenge',
      stimulus: `The set of protocols governing data encryption in financial transactions, revised extensively after a series of high-profile security breaches, _______ now considered the gold standard across the industry.`,
      question: 'Which choice conforms to the conventions of Standard English?',
      choices: [
        { label: 'A', text: 'are' },
        { label: 'B', text: 'were' },
        { label: 'C', text: 'have been' },
        { label: 'D', text: 'is' },
      ],
      correctAnswer: 'D',
      explanation: `The true subject is "The set" (singular). The long participial phrase "revised extensively after a series of high-profile security breaches" is a non-essential modifier and does not change the subject's number. "Is" — singular present — correctly agrees with "set" and suits the present-state claim "now considered the gold standard."`,
      wrongAnswerExplanations: {
        A: `"Are" is plural and wrongly agrees with "protocols" or "breaches" rather than the singular head noun "set."`,
        B: `"Were" is plural and past tense, mismatching both the singular subject and the present-state context ("now").`,
        C: `"Have been" is plural present perfect; the sentence requires a singular verb, and "now considered" calls for simple present rather than present perfect.`,
      },
      teachingPoint: `Long participial modifiers inserted after the subject are among the hardest distractors on the SAT. Bracket everything between the subject and the verb blank, read "The set ___ now considered," and the singular agreement becomes clear.`,
    },
  ],
  masteryQuestions: [
    {
      id: 'fss-m-001',
      skillSlug: 'form-structure-sense',
      subskill: 'subject-verb agreement',
      difficulty: 'easy',
      level: 'foundation',
      errorCategory: 'prepositional-phrase-distractor',
      stimulus:
        'A jar of mixed wildflower seeds _______ on the potting bench next to the greenhouse door.',
      question: 'Which choice conforms to the conventions of Standard English?',
      choices: [
        { label: 'A', text: 'sit' },
        { label: 'B', text: 'sits' },
        { label: 'C', text: 'are sitting' },
        { label: 'D', text: 'have sat' },
      ],
      correctAnswer: 'B',
      explanation:
        '"Jar" is the singular subject; "seeds" is part of the prepositional phrase and does not affect the verb. The singular "sits" is correct.',
      wrongAnswerExplanations: {
        A: '"Sit" is plural and wrongly agrees with "seeds" rather than the singular subject "jar."',
        C: '"Are sitting" is plural progressive and disagrees with the singular subject.',
        D: '"Have sat" is plural perfect and disagrees with the singular subject.',
      },
      teachingPoint:
        'Cross out "of mixed wildflower seeds" and you are left with "A jar ___ on the bench" — the agreement becomes clear.',
    },
    {
      id: 'fss-m-002',
      skillSlug: 'form-structure-sense',
      subskill: 'subject-verb agreement',
      difficulty: 'easy',
      level: 'foundation',
      errorCategory: 'compound-subject-agreement',
      stimulus:
        'Neither the principal nor the department chairs _______ aware of the scheduling conflict until the morning of the ceremony.',
      question: 'Which choice conforms to the conventions of Standard English?',
      choices: [
        { label: 'A', text: 'was' },
        { label: 'B', text: 'were' },
        { label: 'C', text: 'is' },
        { label: 'D', text: 'has been' },
      ],
      correctAnswer: 'B',
      explanation:
        'With "neither...nor," the verb agrees with the closer subject — "the department chairs," which is plural — so "were" is correct.',
      wrongAnswerExplanations: {
        A: '"Was" is singular and agrees with "the principal," which is not the nearer noun.',
        C: '"Is" is singular and present tense, mismatching both the plural nearer noun and the past-tense context.',
        D: '"Has been" is singular present perfect and mismatches number and tense.',
      },
      teachingPoint:
        'The "closer noun" rule: with neither/nor (and either/or), the verb matches the noun immediately before it.',
    },
    {
      id: 'fss-m-003',
      skillSlug: 'form-structure-sense',
      subskill: 'pronoun agreement',
      difficulty: 'medium',
      level: 'sat-application',
      errorCategory: 'indefinite-pronoun-number',
      stimulus:
        'Everybody on the three competing relay teams wore _______ warmest jacket to the early-morning practice.',
      question: 'Which choice conforms to the conventions of Standard English?',
      choices: [
        { label: 'A', text: 'their' },
        { label: 'B', text: 'his or her' },
        { label: 'C', text: 'its' },
        { label: 'D', text: 'they’re' },
      ],
      correctAnswer: 'B',
      explanation:
        '"Everybody" is a singular indefinite pronoun, so it requires the singular possessive "his or her."',
      wrongAnswerExplanations: {
        A: '"Their" is plural, but "everybody" is grammatically singular.',
        C: '"Its" refers to objects, not to the athletes implied by "everybody."',
        D: '"They’re" means "they are" and cannot function as a possessive.',
      },
      teachingPoint:
        '"Everybody," "nobody," "anyone," and similar indefinite pronouns are always grammatically singular, even when they imply a large group.',
    },
    {
      id: 'fss-m-004',
      skillSlug: 'form-structure-sense',
      subskill: 'verb tense',
      difficulty: 'medium',
      level: 'sat-application',
      errorCategory: 'past-perfect-usage',
      stimulus:
        'The researchers realized that the sample _______ contaminated before the first measurement was taken.',
      question: 'Which choice conforms to the conventions of Standard English?',
      choices: [
        { label: 'A', text: 'was' },
        { label: 'B', text: 'is' },
        { label: 'C', text: 'had been' },
        { label: 'D', text: 'will have been' },
      ],
      correctAnswer: 'C',
      explanation:
        'The contamination happened before "the first measurement was taken," which itself happened before the researchers realized the problem. The past perfect "had been" signals that earlier event.',
      wrongAnswerExplanations: {
        A: '"Was" is simple past and does not signal that the contamination preceded the measurement.',
        B: '"Is" is present tense and clashes with the entirely past narrative.',
        D: '"Will have been" is future perfect and is inconsistent with a past context.',
      },
      teachingPoint:
        'When one past action clearly preceded another, use the past perfect ("had been") for the earlier action.',
    },
    {
      id: 'fss-m-005',
      skillSlug: 'form-structure-sense',
      subskill: 'modifier placement',
      difficulty: 'hard',
      level: 'advanced',
      errorCategory: 'dangling-modifier',
      stimulus:
        '_______, the bronze statue was carefully lowered onto its new granite pedestal.',
      question: 'Which choice conforms to the conventions of Standard English?',
      choices: [
        { label: 'A', text: 'Polished to a high sheen' },
        { label: 'B', text: 'Having polished it to a high sheen' },
        { label: 'C', text: 'After polishing it to a high sheen' },
        { label: 'D', text: 'Polishing it to a high sheen' },
      ],
      correctAnswer: 'A',
      explanation:
        '"Polished to a high sheen" is a past participial phrase that logically modifies "the bronze statue," the noun right after the comma. The statue was polished.',
      wrongAnswerExplanations: {
        B: '"Having polished it" implies the statue polished something, a dangling modifier.',
        C: '"After polishing it" implies the statue did the polishing, which is illogical.',
        D: '"Polishing it to a high sheen" suggests the statue is actively polishing something, another dangling modifier.',
      },
      teachingPoint:
        'The past participial form (polished, painted, carved) placed before the comma correctly describes the subject without implying the subject performed the action.',
    },
    {
      id: 'fss-m-006',
      skillSlug: 'form-structure-sense',
      subskill: 'parallel structure',
      difficulty: 'hard',
      level: 'advanced',
      errorCategory: 'parallel-list-mismatch',
      stimulus:
        'The documentary crew spent months filming in the wetlands, recording the calls of migratory birds, and _______.',
      question: 'Which choice conforms to the conventions of Standard English?',
      choices: [
        { label: 'A', text: 'to collect water samples for the biologists' },
        { label: 'B', text: 'the biologists received water samples' },
        { label: 'C', text: 'collecting water samples for the biologists' },
        { label: 'D', text: 'water sample collection for the biologists' },
      ],
      correctAnswer: 'C',
      explanation:
        'The established list items are gerund phrases: "filming in the wetlands" and "recording the calls." The third item must also be a gerund phrase: "collecting water samples."',
      wrongAnswerExplanations: {
        A: '"To collect" is an infinitive and breaks the gerund pattern.',
        B: '"The biologists received water samples" is a full clause and cannot be a parallel list item.',
        D: '"Water sample collection" is a noun phrase that disrupts the verb-based parallelism.',
      },
      teachingPoint:
        'Three-item lists are the most common home for parallelism errors. Name the form of items one and two before reading the choices for item three.',
    },
    {
      id: 'fss-m-007',
      skillSlug: 'form-structure-sense',
      subskill: 'who vs whom',
      difficulty: 'hard',
      level: 'challenge',
      errorCategory: 'who-whom-case',
      stimulus:
        'The committee ultimately selected the candidate _______ the senior partners had unanimously endorsed.',
      question: 'Which choice conforms to the conventions of Standard English?',
      choices: [
        { label: 'A', text: 'who' },
        { label: 'B', text: 'whom' },
        { label: 'C', text: 'which' },
        { label: 'D', text: 'whoever' },
      ],
      correctAnswer: 'B',
      explanation:
        'In the embedded clause "the senior partners had unanimously endorsed ___," the blank is the object of "endorsed." The object pronoun is "whom."',
      wrongAnswerExplanations: {
        A: '"Who" is a subject pronoun; the blank functions as the object of "endorsed," not as a subject.',
        C: '"Which" refers to things, not people.',
        D: '"Whoever" is a subject pronoun used in noun clauses, not in relative clauses where an object is needed.',
      },
      teachingPoint:
        'Substitute: "the partners had endorsed him" (not "he") → "him" = object = "whom." Run the substitution test every time.',
    },
    {
      id: 'fss-m-008',
      skillSlug: 'form-structure-sense',
      subskill: 'mixed — verb tense and subject-verb agreement',
      difficulty: 'hard',
      level: 'challenge',
      errorCategory: 'complex-intervening-phrase',
      stimulus:
        'The network of underground aqueducts that once supplied water to dozens of hilltop settlements _______ largely intact despite centuries of seismic activity.',
      question: 'Which choice conforms to the conventions of Standard English?',
      choices: [
        { label: 'A', text: 'remain' },
        { label: 'B', text: 'remains' },
        { label: 'C', text: 'have remained' },
        { label: 'D', text: 'are remaining' },
      ],
      correctAnswer: 'B',
      explanation:
        'The true subject is "The network" (singular). The relative clause "that once supplied water to dozens of hilltop settlements" is an intervening modifier and does not change the subject\'s number. "Remains" is the correct singular present-tense verb.',
      wrongAnswerExplanations: {
        A: '"Remain" is plural and agrees with "aqueducts" or "settlements," not the singular subject "network."',
        C: '"Have remained" is plural present perfect and mismatches the singular subject.',
        D: '"Are remaining" is plural progressive and disagrees with the singular subject.',
      },
      teachingPoint:
        'Relative clauses ("that once supplied...") are interrupters — bracket them and check agreement with the head noun alone. Here, "The network remains" is the skeleton.',
    },
  ],
}
