import type { AcademySkill } from '../types'

export const formStructureSense: AcademySkill = {
  slug: 'form-structure-sense',
  title: 'Form, Structure, and Sense',
  section: 'writing',
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
    },
    {
      title: 'Plural pronoun for a singular noun',
      description:
        'Collective nouns (committee, team, company) and singular indefinite pronouns (each, everyone, neither) are singular even when they feel plural.',
      avoidance:
        'Treat "each," "everyone," "the committee," and similar subjects as singular unless the sentence clearly refers to individual members.',
    },
    {
      title: 'Unjustified tense shift',
      description:
        'Answer choices sometimes switch tense with no time-marker to justify it, breaking consistency with the rest of the passage.',
      avoidance:
        'Keep the verb in the same time frame as the surrounding verbs unless a context clue signals a shift.',
    },
    {
      title: 'Broken parallel structure',
      description:
        'In a list or comparison, one item is offered in a form that does not match the others (a noun among gerunds, for example).',
      avoidance:
        'Identify the form of the other items in the series and choose the option that matches it exactly.',
    },
    {
      title: 'Confusing "who" and "whom"',
      description:
        '"Who" functions as a subject; "whom" functions as an object. Test-makers exploit the fact that "whom" sounds formal and "correct."',
      avoidance:
        'Substitute he/she (who) or him/her (whom) into the clause to decide which is right.',
    },
  ],
  guidedExamples: [
    {
      id: 'fss-ex-1',
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
    },
    {
      id: 'fss-ex-2',
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
    },
    {
      id: 'fss-ex-3',
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
    },
  ],
  drillQuestions: [
    {
      id: 'fss-d-001',
      skillSlug: 'form-structure-sense',
      subskill: 'subject-verb agreement',
      difficulty: 'easy',
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
  ],
}
