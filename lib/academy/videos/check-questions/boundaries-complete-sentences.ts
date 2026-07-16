import type { VideoCheckQuestion } from '../types'

export const boundariesCompleteSentencesQuestions: VideoCheckQuestion[] = [
  {
    id: 'vcq-boundaries-cs-001',
    videoKey: 'boundaries-complete-sentences',
    skillSlug: 'boundaries',
    subskillSlug: 'complete-sentences-independent-clauses',
    difficulty: 'easy',
    question:
      'Which of the following is an independent clause?',
    choices: [
      { label: 'A', text: 'Because the data showed inconsistencies.' },
      { label: 'B', text: 'Although the experiment was designed carefully.' },
      { label: 'C', text: 'The technician recorded each measurement precisely.' },
      { label: 'D', text: 'Which the committee had approved earlier.' },
    ],
    correctAnswer: 'C',
    explanation:
      'An independent clause contains a subject and a finite verb and can stand alone as a complete sentence. Choice C has a clear subject ("The technician"), a finite verb ("recorded"), and expresses a complete thought.',
    wrongAnswerExplanations: {
      A: '"Because" is a subordinating conjunction that creates a dependent clause. The reader is left waiting for the main clause to follow.',
      B: '"Although" is a subordinating conjunction. Despite having a subject and verb, this clause depends on another clause to complete its meaning.',
      D: '"Which" is a relative pronoun that introduces a dependent relative clause, not an independent clause.',
    },
    teachingPoint:
      'Test independence by reading the clause in isolation. If it raises the question "What happened?" or "So what?", it is dependent.',
  },
  {
    id: 'vcq-boundaries-cs-002',
    videoKey: 'boundaries-complete-sentences',
    skillSlug: 'boundaries',
    subskillSlug: 'complete-sentences-independent-clauses',
    difficulty: 'medium',
    stimulus:
      'The production team completed filming by Thursday, the editing crew finished their work the following week.',
    question:
      'Which of the following best describes the text above?',
    choices: [
      { label: 'A', text: 'The text is a correctly punctuated sentence.' },
      { label: 'B', text: 'The text contains a fragment.' },
      { label: 'C', text: 'The text contains a comma splice.' },
      { label: 'D', text: 'The text uses a semicolon incorrectly.' },
    ],
    correctAnswer: 'C',
    explanation:
      '"The production team completed filming by Thursday" and "the editing crew finished their work the following week" are both independent clauses. A comma alone cannot join two independent clauses. This error — using only a comma to connect two full sentences — is called a comma splice.',
    wrongAnswerExplanations: {
      A: 'A comma separating two independent clauses without a coordinating conjunction is a grammatical error, not a correct construction.',
      B: 'Neither clause is a fragment — each has a subject, a finite verb, and expresses a complete thought.',
      D: 'There is no semicolon in this sentence. The punctuation error is a comma used where a semicolon, period, or comma + coordinating conjunction is required.',
    },
    teachingPoint:
      'A comma is not strong enough to join two full sentences. You need a period, a semicolon, or a comma plus a FANBOYS coordinating conjunction.',
  },
  {
    id: 'vcq-boundaries-cs-003',
    videoKey: 'boundaries-complete-sentences',
    skillSlug: 'boundaries',
    subskillSlug: 'complete-sentences-independent-clauses',
    difficulty: 'medium',
    stimulus:
      'The research assistant compiled the survey results _____ the lead scientist analyzed the data before presenting it to the board.',
    question:
      'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { label: 'A', text: ', and' },
      { label: 'B', text: ', they' },
      { label: 'C', text: '; and,' },
      { label: 'D', text: 'and,' },
    ],
    correctAnswer: 'A',
    explanation:
      'Both clauses are independent: "The research assistant compiled the survey results" and "the lead scientist analyzed the data before presenting it to the board" can each stand alone. A comma followed by the coordinating conjunction "and" correctly joins two independent clauses.',
    wrongAnswerExplanations: {
      B: 'Placing ", they" between two independent clauses creates a comma splice — a comma alone cannot join two full sentences.',
      C: 'Using a semicolon before a coordinating conjunction is nonstandard. A semicolon connects independent clauses without a coordinating conjunction.',
      D: 'A coordinating conjunction joining two independent clauses requires a comma before it — not after it. "and," without a preceding comma creates a run-on.',
    },
    teachingPoint:
      'When joining two independent clauses with a coordinating conjunction, the comma comes BEFORE the conjunction: [clause], and [clause].',
  },
]
