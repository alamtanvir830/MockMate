export interface GlossaryTerm {
  id: string
  term: string
  partOfSpeech?: string
  definition: string
  example: string
  nonExample?: string
  relatedTerms?: string[]
  category: 'grammar' | 'punctuation' | 'rhetoric' | 'reading' | 'logic'
}

export const glossaryTerms: GlossaryTerm[] = [
  {
    id: 'gls-001',
    term: 'clause',
    partOfSpeech: 'noun',
    definition:
      'A group of words that contains a subject and a finite verb; clauses form the building blocks of sentences and can be independent or dependent.',
    example:
      'In "She arrived early, but the doors were locked," both "She arrived early" and "the doors were locked" are clauses.',
    nonExample:
      '"Running through the park" is not a clause because it lacks a subject performing the action with a finite verb.',
    relatedTerms: ['gls-002', 'gls-003', 'gls-006'],
    category: 'grammar',
  },
  {
    id: 'gls-002',
    term: 'independent clause',
    partOfSpeech: 'noun',
    definition:
      'A clause that expresses a complete thought and can stand alone as a sentence, containing both a subject and a finite verb.',
    example:
      '"The storm knocked out the power" is an independent clause because it makes a complete, standalone statement.',
    nonExample:
      '"Although the storm knocked out the power" is not independent because "although" makes it dependent on additional information.',
    relatedTerms: ['gls-001', 'gls-003', 'gls-015', 'gls-016'],
    category: 'grammar',
  },
  {
    id: 'gls-003',
    term: 'dependent clause',
    partOfSpeech: 'noun',
    definition:
      'A clause that contains a subject and verb but cannot stand alone as a sentence because it begins with a subordinating word that makes it rely on an independent clause for its meaning.',
    example:
      '"Because the road was icy" is a dependent clause — it needs a main clause like "drivers slowed down" to complete the thought.',
    nonExample:
      '"Drivers slowed down" is not dependent; it can stand alone and needs no additional clause to make sense.',
    relatedTerms: ['gls-001', 'gls-002', 'gls-015'],
    category: 'grammar',
  },
  {
    id: 'gls-004',
    term: 'subject',
    partOfSpeech: 'noun',
    definition:
      'The noun, pronoun, or noun phrase in a clause that performs or receives the action of the verb, or that is described by the predicate.',
    example:
      'In "The old lighthouse guided sailors through the fog," the subject is "The old lighthouse."',
    nonExample:
      '"Through the fog" is a prepositional phrase, not a subject, even though it appears near the verb.',
    relatedTerms: ['gls-005', 'gls-006', 'gls-009'],
    category: 'grammar',
  },
  {
    id: 'gls-005',
    term: 'predicate',
    partOfSpeech: 'noun',
    definition:
      'The part of a clause that says something about the subject, always containing a finite verb and often including objects, complements, and modifiers.',
    example:
      'In "The delegates signed the treaty in silence," the predicate is "signed the treaty in silence."',
    nonExample:
      '"The delegates" is the subject of the sentence, not the predicate.',
    relatedTerms: ['gls-004', 'gls-006'],
    category: 'grammar',
  },
  {
    id: 'gls-006',
    term: 'finite verb',
    partOfSpeech: 'noun',
    definition:
      'A verb form that is inflected for tense, person, and number and can serve as the main verb of an independent clause, distinguishing it from infinitives and participles.',
    example:
      'In "She writes every morning," "writes" is a finite verb — it carries tense (present) and agrees with the subject "she."',
    nonExample:
      '"Writing" in "Writing every morning is her habit" functions as a noun (gerund), not a finite verb.',
    relatedTerms: ['gls-001', 'gls-004', 'gls-005'],
    category: 'grammar',
  },
  {
    id: 'gls-007',
    term: 'modifier',
    partOfSpeech: 'noun',
    definition:
      'A word, phrase, or clause that describes or limits another element in a sentence; modifiers must be placed close to what they modify to avoid ambiguity.',
    example:
      '"Written in haste" is a modifier in "Written in haste, the letter contained several errors" — it describes "the letter."',
    nonExample:
      'In "She almost failed every exam," "almost" modifies "failed," not "every exam" — misreading this is a common error with misplaced modifiers.',
    relatedTerms: ['gls-004', 'gls-014'],
    category: 'grammar',
  },
  {
    id: 'gls-008',
    term: 'antecedent',
    partOfSpeech: 'noun',
    definition:
      'The noun or noun phrase that a pronoun refers back to; the antecedent must be clear and must agree with the pronoun in number and gender.',
    example:
      'In "The council announced its decision," "council" is the antecedent of the pronoun "its."',
    nonExample:
      'In "When Maria told her sister the news, she was surprised," "she" has an ambiguous antecedent — it could refer to either Maria or her sister.',
    relatedTerms: ['gls-009', 'gls-010'],
    category: 'grammar',
  },
  {
    id: 'gls-009',
    term: 'pronoun',
    partOfSpeech: 'noun',
    definition:
      'A word that substitutes for a noun or noun phrase, including personal pronouns, relative pronouns, and demonstrative pronouns, which must agree with their antecedents.',
    example:
      'In "The architects revised their blueprints," "their" is a pronoun that refers back to "the architects."',
    nonExample:
      '"Architecture" in "Architecture requires precision" is not a pronoun — it is a noun itself, not a substitute for one.',
    relatedTerms: ['gls-008', 'gls-010', 'gls-004'],
    category: 'grammar',
  },
  {
    id: 'gls-010',
    term: 'possessive',
    partOfSpeech: 'adjective / noun',
    definition:
      'A grammatical form that shows ownership or association, expressed through apostrophes in nouns (the dog\'s collar) or through possessive pronouns (its, their, whose) — not to be confused with contractions.',
    example:
      '"The committee\'s report was thorough" uses the possessive apostrophe to show the report belongs to the committee.',
    nonExample:
      '"Its" (possessive) is different from "it\'s" (it is) — confusing the two is one of the most common errors on standardized tests.',
    relatedTerms: ['gls-008', 'gls-009'],
    category: 'grammar',
  },
  {
    id: 'gls-011',
    term: 'comma splice',
    partOfSpeech: 'noun',
    definition:
      'A punctuation error in which two independent clauses are joined only by a comma, without a coordinating conjunction or appropriate punctuation such as a semicolon.',
    example:
      '"The exhibit opened on Friday, hundreds of visitors arrived" is a comma splice — the comma alone cannot join two independent clauses.',
    nonExample:
      '"The exhibit opened on Friday, and hundreds of visitors arrived" is correct because "and" is a coordinating conjunction.',
    relatedTerms: ['gls-002', 'gls-012', 'gls-016'],
    category: 'punctuation',
  },
  {
    id: 'gls-012',
    term: 'run-on sentence',
    partOfSpeech: 'noun',
    definition:
      'A sentence in which two or more independent clauses are fused together without any punctuation or conjunction to separate them, creating a single unbroken stream of clauses.',
    example:
      '"The library closes at nine the last bus runs at eight thirty you should leave early" is a run-on sentence — three independent clauses with no separating punctuation.',
    nonExample:
      'A long sentence with many phrases or subordinate clauses is not necessarily a run-on; length alone does not create the error.',
    relatedTerms: ['gls-011', 'gls-002', 'gls-013'],
    category: 'punctuation',
  },
  {
    id: 'gls-013',
    term: 'fragment',
    partOfSpeech: 'noun',
    definition:
      'A group of words punctuated as a sentence but lacking the elements required to form a complete independent clause — typically missing a subject, a finite verb, or both.',
    example:
      '"Because the forecast called for rain." is a fragment — it has a subject and verb but begins with "because," making it a dependent clause that cannot stand alone.',
    nonExample:
      '"It rained" is not a fragment; it is a short but complete independent clause with both a subject and a finite verb.',
    relatedTerms: ['gls-002', 'gls-006', 'gls-003'],
    category: 'punctuation',
  },
  {
    id: 'gls-014',
    term: 'parallel structure',
    partOfSpeech: 'noun',
    definition:
      'The grammatical principle that elements joined by coordinating conjunctions or appearing in a list must share the same grammatical form — all nouns, all infinitives, all participial phrases, and so on.',
    example:
      '"She enjoyed hiking, swimming, and to run" violates parallel structure; the correct form is "hiking, swimming, and running."',
    nonExample:
      '"The plan was thorough, detailed, and covered all contingencies" is not parallel — "covered all contingencies" is a verb phrase, not an adjective like the first two elements.',
    relatedTerms: ['gls-016', 'gls-015'],
    category: 'grammar',
  },
  {
    id: 'gls-015',
    term: 'subordination',
    partOfSpeech: 'noun',
    definition:
      'A grammatical relationship in which one clause is made dependent on another by adding a subordinating conjunction, signaling that the dependent clause adds context, condition, or concession to the main clause.',
    example:
      'In "Although the evidence was strong, the jury remained divided," "although" subordinates the first clause to the second, making it dependent.',
    nonExample:
      '"The evidence was strong and the jury remained divided" uses coordination, not subordination — neither clause depends on the other.',
    relatedTerms: ['gls-016', 'gls-003', 'gls-002'],
    category: 'grammar',
  },
  {
    id: 'gls-016',
    term: 'coordination',
    partOfSpeech: 'noun',
    definition:
      'A grammatical relationship in which two elements of equal rank are joined by a coordinating conjunction (for, and, nor, but, or, yet, so), preserving the independence of both.',
    example:
      '"The deadline passed, but the team submitted the work anyway" coordinates two independent clauses of equal grammatical weight.',
    nonExample:
      '"After the deadline passed, the team submitted the work" is subordination, not coordination — one clause is dependent.',
    relatedTerms: ['gls-015', 'gls-002', 'gls-014'],
    category: 'grammar',
  },
  {
    id: 'gls-017',
    term: 'transition',
    partOfSpeech: 'noun',
    definition:
      'A word or phrase that signals the logical relationship between two ideas, sentences, or paragraphs — such as contrast, addition, cause, or sequence.',
    example:
      '"However" in "The data were promising. However, the sample size was too small to draw conclusions" signals a contrast between the two sentences.',
    nonExample:
      'Simply starting a new paragraph does not create a transition; a transition requires a word or phrase that names the relationship between ideas.',
    relatedTerms: ['gls-027', 'gls-029'],
    category: 'rhetoric',
  },
  {
    id: 'gls-018',
    term: 'inference',
    partOfSpeech: 'noun',
    definition:
      'A conclusion drawn from evidence in a text rather than directly stated; a valid inference must be supported by the text and should not go beyond what the text actually implies.',
    example:
      'If a passage states that the factory closed and that unemployment rose in the town the following month, a reader can infer a likely connection between the two events.',
    nonExample:
      'Guessing that the factory owner was dishonest is not an inference supported by the passage — it adds information not present in the text.',
    relatedTerms: ['gls-019', 'gls-020', 'gls-033'],
    category: 'reading',
  },
  {
    id: 'gls-019',
    term: 'central idea',
    partOfSpeech: 'noun',
    definition:
      'The most important point or argument that a passage as a whole develops, often distinct from the topic (what the passage is about) and from any single supporting detail.',
    example:
      'The central idea of a passage about urban farming might be that growing food in cities reduces transportation emissions, not simply "urban farming exists."',
    nonExample:
      '"The passage is about bees" states the topic, not the central idea; the central idea would be the specific claim the passage makes about bees.',
    relatedTerms: ['gls-020', 'gls-025', 'gls-021'],
    category: 'reading',
  },
  {
    id: 'gls-020',
    term: 'supporting detail',
    partOfSpeech: 'noun',
    definition:
      'A specific fact, example, statistic, anecdote, or piece of evidence that develops or substantiates the central idea or a claim within a passage.',
    example:
      'In a passage arguing that sleep deprivation affects academic performance, a study showing that students who sleep fewer than six hours score lower on tests is a supporting detail.',
    nonExample:
      'A sentence that restates the central idea in different words is not a supporting detail — it must provide specific evidence, not repetition.',
    relatedTerms: ['gls-019', 'gls-025', 'gls-030'],
    category: 'reading',
  },
  {
    id: 'gls-021',
    term: 'scope',
    partOfSpeech: 'noun',
    definition:
      'The range or breadth of a claim or piece of evidence — how widely or narrowly it applies; a major source of wrong answers on the SAT is mismatching the scope of the evidence with the scope of the claim.',
    example:
      'A study of three cities does not have the scope to support a claim about "all urban areas worldwide" — the evidence is too narrow for the claim.',
    nonExample:
      'Saying "this study is relevant" without checking whether its scope matches the claim\'s scope is a common reasoning error.',
    relatedTerms: ['gls-025', 'gls-019', 'gls-031'],
    category: 'reading',
  },
  {
    id: 'gls-022',
    term: 'tone',
    partOfSpeech: 'noun',
    definition:
      'The author\'s attitude toward the subject or audience, conveyed through word choice, level of formality, and rhetorical strategies rather than explicitly stated.',
    example:
      'An author who describes a policy as "well-intentioned but misguided" conveys a tone that is critical yet charitable — not dismissive, not approving.',
    nonExample:
      'The subject of a passage is not its tone; a passage about a tragedy can have a detached, analytical tone rather than a mournful one.',
    relatedTerms: ['gls-023', 'gls-024', 'gls-025'],
    category: 'rhetoric',
  },
  {
    id: 'gls-023',
    term: 'connotation',
    partOfSpeech: 'noun',
    definition:
      'The emotional associations, overtones, or implied meanings a word carries beyond its literal dictionary definition, which can be positive, negative, or neutral.',
    example:
      '"Frugal" and "stingy" both literally mean spending little money, but "frugal" carries a positive connotation of wisdom while "stingy" carries a negative one of selfishness.',
    nonExample:
      'The word "table" in "a table of data" is used for its denotation (literal meaning), not for any emotional connotation.',
    relatedTerms: ['gls-024', 'gls-022'],
    category: 'reading',
  },
  {
    id: 'gls-024',
    term: 'denotation',
    partOfSpeech: 'noun',
    definition:
      'The literal, dictionary definition of a word, stripped of the emotional associations or cultural implications that the word may carry in context.',
    example:
      'The denotation of "home" is simply "a place where a person lives," regardless of the warmth or belonging the word often implies.',
    nonExample:
      '"Home" used in an advertisement evokes comfort and safety — those are connotations layered on top of the denotation.',
    relatedTerms: ['gls-023', 'gls-022'],
    category: 'reading',
  },
  {
    id: 'gls-025',
    term: 'rhetorical purpose',
    partOfSpeech: 'noun',
    definition:
      'The specific goal an author is trying to achieve with a piece of writing or a particular passage — such as to persuade, inform, analyze, refute, illustrate, or concede.',
    example:
      'A paragraph that describes an opposing view before countering it has the rhetorical purpose of acknowledging and then dismissing a potential objection.',
    nonExample:
      'Stating the topic of a paragraph is not the same as identifying its rhetorical purpose; "this paragraph is about climate change" does not explain what the paragraph is doing rhetorically.',
    relatedTerms: ['gls-022', 'gls-019', 'gls-021'],
    category: 'rhetoric',
  },
  {
    id: 'gls-026',
    term: 'evidence',
    partOfSpeech: 'noun',
    definition:
      'Information — such as data, examples, expert opinion, or research findings — used to support a claim; good evidence is relevant, sufficient in scope, and accurately represented.',
    example:
      'A passage claiming that sleep improves memory might use a controlled experiment in which rested participants outperformed sleep-deprived participants on a recall test as its primary evidence.',
    nonExample:
      'An anecdote about one person\'s experience is a form of evidence but may be insufficient in scope to support a broad claim about all people.',
    relatedTerms: ['gls-020', 'gls-030', 'gls-021'],
    category: 'logic',
  },
  {
    id: 'gls-027',
    term: 'concession',
    partOfSpeech: 'noun',
    definition:
      'An acknowledgment within an argument that the opposing view has some merit or that a limitation of one\'s own position exists, typically introduced before reaffirming the main claim.',
    example:
      '"While critics rightly note that the program is expensive, the long-term savings it generates outweigh the upfront costs" — the first clause is a concession.',
    nonExample:
      'Ignoring the opposing view entirely is not a concession; a concession explicitly grants a point to the other side.',
    relatedTerms: ['gls-028', 'gls-017', 'gls-025'],
    category: 'rhetoric',
  },
  {
    id: 'gls-028',
    term: 'qualification',
    partOfSpeech: 'noun',
    definition:
      'A limitation added to a claim to make it more precise and defensible — specifying the conditions under which the claim holds, or restricting its scope, rather than asserting it universally.',
    example:
      '"Exercise reduces stress in most adults" is qualified; "exercise reduces stress" is an unqualified absolute claim that is harder to defend.',
    nonExample:
      'A flat assertion like "technology always improves lives" contains no qualification and is therefore more vulnerable to counterexample.',
    relatedTerms: ['gls-027', 'gls-021', 'gls-033'],
    category: 'logic',
  },
  {
    id: 'gls-029',
    term: 'synthesis',
    partOfSpeech: 'noun',
    definition:
      'The act of combining information from multiple sources or passages to form a new, integrated understanding, rather than summarizing each source separately.',
    example:
      'Using evidence from both Text 1 (which describes a problem) and Text 2 (which proposes a solution) to explain how the solution addresses the problem is a synthesis.',
    nonExample:
      'Summarizing Text 1 and then summarizing Text 2 in sequence is not synthesis — synthesis requires integrating the ideas into a new unified claim.',
    relatedTerms: ['gls-034', 'gls-035', 'gls-017'],
    category: 'reading',
  },
  {
    id: 'gls-030',
    term: 'quantitative evidence',
    partOfSpeech: 'noun',
    definition:
      'Evidence expressed in numerical or measurable form — statistics, percentages, rates, measurements, or graph data — used to substantiate a claim with concrete, countable data.',
    example:
      '"A study found that participants who exercised three times per week scored 22 percent higher on memory tests" is quantitative evidence.',
    nonExample:
      '"Many studies have shown that exercise improves memory" is a qualitative summary, not quantitative evidence, because it gives no specific numbers.',
    relatedTerms: ['gls-026', 'gls-031', 'gls-032'],
    category: 'logic',
  },
  {
    id: 'gls-031',
    term: 'correlation',
    partOfSpeech: 'noun',
    definition:
      'A statistical relationship in which two variables tend to change together — both increasing, both decreasing, or moving in opposite directions — without this relationship proving that one causes the other.',
    example:
      'A study might find a correlation between hours spent reading and vocabulary size — students who read more tend to have larger vocabularies — but this correlation alone does not prove reading caused the larger vocabulary.',
    nonExample:
      'Two events happening at the same time or in the same population does not necessarily indicate correlation in the statistical sense, let alone causation.',
    relatedTerms: ['gls-032', 'gls-030', 'gls-026'],
    category: 'logic',
  },
  {
    id: 'gls-032',
    term: 'causation',
    partOfSpeech: 'noun',
    definition:
      'A relationship in which one variable directly produces or brings about a change in another; establishing causation requires ruling out confounding variables and typically involves controlled experimentation.',
    example:
      'A randomized controlled trial in which one group received a medication and another received a placebo — with all other variables held equal — provides evidence of causation if the treatment group improves significantly.',
    nonExample:
      'The fact that ice cream sales and drowning rates both rise in summer does not mean ice cream causes drowning — both correlate with a third variable (hot weather), illustrating why correlation is not causation.',
    relatedTerms: ['gls-031', 'gls-030', 'gls-026'],
    category: 'logic',
  },
  {
    id: 'gls-033',
    term: 'implication',
    partOfSpeech: 'noun',
    definition:
      'A logical or contextual consequence suggested by a statement without being explicitly stated; something that follows from what has been said rather than being directly asserted.',
    example:
      'If a scientist says "this drug is effective only when administered within six hours of symptom onset," the implication is that patients who wait longer will not benefit from it.',
    nonExample:
      'A directly stated conclusion is not an implication — "this drug must be given within six hours" is explicit, not implied.',
    relatedTerms: ['gls-018', 'gls-028'],
    category: 'logic',
  },
  {
    id: 'gls-034',
    term: 'paired texts',
    partOfSpeech: 'noun',
    definition:
      'Two short, independent passages presented together on the SAT that address a related topic from different perspectives, requiring the reader to analyze the relationship between them.',
    example:
      'A paired-text question might present one passage arguing that standardized tests accurately predict college success and another arguing they reflect socioeconomic advantage more than academic ability.',
    nonExample:
      'Two paragraphs from the same article that develop the same argument are not paired texts in the SAT sense — paired texts represent distinct, often contrasting, perspectives.',
    relatedTerms: ['gls-029', 'gls-035'],
    category: 'reading',
  },
  {
    id: 'gls-035',
    term: 'paraphrase',
    partOfSpeech: 'noun / verb',
    definition:
      'A restatement of a passage\'s idea in different words that preserves the original meaning without copying the phrasing; used to demonstrate comprehension and to avoid misquotation.',
    example:
      'If a passage says "the proliferation of social media platforms has fundamentally altered the dynamics of political discourse," a paraphrase might read "the spread of social media has changed how political conversations happen."',
    nonExample:
      'Replacing one or two words while keeping the original sentence structure is not a true paraphrase — it is closer to patchwriting.',
    relatedTerms: ['gls-029', 'gls-034', 'gls-018'],
    category: 'reading',
  },
]
