/**
 * SHSAT Practice Test A — Form 1
 *
 * STRUCTURE:
 *   SHSATForm
 *     └─ subsections[]          ← replaces old sections[]
 *          ├─ type, title, sectionLabel, directions
 *          ├─ passages[]        ← Reading Comprehension only
 *          └─ questions[]       ← Revising/Editing + Math
 *
 * SECTION BREAKDOWN:
 *   Reading Comprehension      Q  1 – Q 48   (subsections[0], 6 passages × 8 Q)
 *   Revising/Editing Part A    Q 49 – Q 53   (subsections[1], 5 standalone Q)
 *   Revising/Editing Part B    Q 54 – Q 57   (subsections[2], 4 standalone Q)
 *   Mathematics                Q 58 – Q114   (subsections[3], 57 standalone Q)
 *
 * ADDING FULL 114-QUESTION DATASET:
 *   • Replace the existing passage content in subsections[0].passages[].
 *   • For passages 5 & 6 (Q33–Q48), replace the placeholderQuestions() call.
 *   • For RevEdit A/B (Q49–Q57), replace placeholderQuestions() with real questions.
 *   • For Math (Q58–Q114), replace placeholderQuestions() with real questions.
 *   • Question numbers are auto-derived — never hard-code them.
 *
 * HOW TO ADD FORM 3:
 *   1. Create lib/premade-exams/shsat-form-3.ts using this file as template.
 *   2. Change id/title, fill subsections with new content.
 *   3. Activate Form 3 card in app/(dashboard)/premade/shsat/page.tsx.
 *   4. Create app/(dashboard)/premade/shsat/form-3/page.tsx (copy form-1/page.tsx).
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export type SHSATSubsectionType =
  | 'reading_comprehension'
  | 'revising_editing_a'
  | 'revising_editing_b'
  | 'mathematics'

export interface SHSATChoice {
  id: 'A' | 'B' | 'C' | 'D'
  text: string
}

export interface SHSATMCQQuestion {
  id: string
  type: 'mcq'
  question: string
  choices: [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice]
  correct_answer: 'A' | 'B' | 'C' | 'D'
}

export interface SHSATPoemLine {
  num: number   // 0 = stanza break (empty spacer); ≥1 = numbered poem line
  text: string
}

export interface SHSATMultiSelectQuestion {
  id: string
  type: 'multi_select'
  question: string
  selectCount: number
  choices: Array<{ id: string; text: string }>
  correct_answers: string[]
}

export interface SHSATMatchItem { id: string; text: string }
export interface SHSATMatchCategory { id: string; label: string }

export interface SHSATMatchQuestion {
  id: string
  type: 'match'
  question: string
  items: SHSATMatchItem[]
  categories: SHSATMatchCategory[]
  correct_matches: Record<string, string>  // itemId → categoryId
}

export type SHSATQuestion =
  | SHSATMCQQuestion
  | SHSATMultiSelectQuestion
  | SHSATMatchQuestion

export interface SHSATPassage {
  id: string
  title: string
  author?: string
  contentType?: 'prose' | 'poem'
  content: string          // paragraphs separated by \n\n (unused for poems)
  lines?: SHSATPoemLine[]  // poem lines (used when contentType === 'poem')
  questions: SHSATQuestion[]
}

export interface SHSATSubsection {
  id: string
  type: SHSATSubsectionType
  sectionLabel: string       // shown above title on transition screen
  title: string              // e.g. "READING COMPREHENSION"
  directions: string
  directionBullets?: string[] // Math "IMPORTANT NOTES" bullets
  passages?: SHSATPassage[]   // Reading Comprehension only
  questions?: SHSATQuestion[] // Revising/Editing + Math
}

export interface SHSATForm {
  id: string
  title: string
  description: string
  timeLimitMinutes: number
  sectionNumber: number
  subsections: SHSATSubsection[]
}

// ─── Placeholder generator ────────────────────────────────────────────────────
// Replace calls to this with real arrays of SHSATMCQQuestion when you have the
// full question set ready. The global number printed in the question text makes
// it easy to identify which placeholder corresponds to which slot.

function placeholderQuestions(
  prefix: string,
  startNum: number,
  count: number,
): SHSATMCQQuestion[] {
  return Array.from({ length: count }, (_, i): SHSATMCQQuestion => ({
    id: `${prefix}-${i + 1}`,
    type: 'mcq',
    question: `[PLACEHOLDER] Question ${startNum + i} — Replace with actual content.`,
    choices: [
      { id: 'A', text: 'Answer choice A — replace with actual option.' },
      { id: 'B', text: 'Answer choice B — replace with actual option.' },
      { id: 'C', text: 'Answer choice C — replace with actual option.' },
      { id: 'D', text: 'Answer choice D — replace with actual option.' },
    ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
    correct_answer: 'A',
  }))
}

// ─── Form 1 ───────────────────────────────────────────────────────────────────

export const shsatForm1: SHSATForm = {
  id: 'shsat-form-1',
  title: 'SHSAT PRACTICE TEST A - 2025',
  description: 'Specialized High Schools Admissions Test — Practice Form 1',
  timeLimitMinutes: 180,
  sectionNumber: 2,

  subsections: [

    // ── Reading Comprehension  Q1–Q48 ────────────────────────────────────────
    {
      id: 'rc',
      type: 'reading_comprehension',
      sectionLabel: 'English Language Arts',
      title: 'READING COMPREHENSION',
      directions:
        'Read each of the following texts and answer the related questions. As needed, you may use the online notepad tool or write on the scrap paper given to you to take notes. You should reread relevant parts of each text, while being mindful of time, before selecting the best answer for each question. Base your answers only on the content within the text.',

      passages: [

        // ── Passage 1  (Q1–Q7)  POEM ───────────────────────────────────────
        {
          id: 'passage-1',
          title: 'The Grass',
          author: 'Carl Sandburg',
          contentType: 'poem',
          content: '',  // unused for poems; see lines[] below
          lines: [
            { num: 1,  text: 'Pile the bodies high at Austerlitz and Waterloo.' },
            { num: 2,  text: 'Shovel them under and let me work—' },
            { num: 3,  text: 'I am the grass; I cover all.' },
            { num: 0,  text: '' },
            { num: 4,  text: 'And pile them high at Gettysburg' },
            { num: 5,  text: 'And pile them high at Ypres and Verdun.' },
            { num: 6,  text: 'Shovel them under and let me work.' },
            { num: 0,  text: '' },
            { num: 7,  text: 'Two years, ten years, and passengers ask the conductor:' },
            { num: 8,  text: 'What place is this?' },
            { num: 9,  text: 'Where are we now?' },
            { num: 0,  text: '' },
            { num: 10, text: 'I am the grass.' },
            { num: 11, text: 'Let me work.' },
          ],
          questions: [
            {
              id: 'p1q1', type: 'mcq',
              question: 'The description in lines 1–6 helps establish a central idea of the poem by',
              choices: [
                { id: 'A', text: 'comparing different historical events to show their similarities' },
                { id: 'B', text: 'emphasizing how quickly people forget the consequences of war' },
                { id: 'C', text: 'describing the destruction of war and how it is eventually hidden' },
                { id: 'D', text: 'suggesting that war is necessary for progress' },
              ],
              correct_answer: 'C',
            },
            {
              id: 'p1q2', type: 'mcq',
              question: 'Which detail from the poem reflects the speaker\'s view that people often fail to remember the past?',
              choices: [
                { id: 'A', text: '"Pile the bodies high" (line 1)' },
                { id: 'B', text: '"Shovel them under and let me work" (line 2)' },
                { id: 'C', text: '"Two years, ten years, and passengers ask the conductor" (line 7)' },
                { id: 'D', text: '"I am the grass" (line 10)' },
              ],
              correct_answer: 'C',
            },
            {
              id: 'p1q3', type: 'mcq',
              question: 'How does the repetition of the phrase "let me work" affect the meaning of the poem?',
              choices: [
                { id: 'A', text: 'It emphasizes the natural process of covering the past' },
                { id: 'B', text: 'It shows that the speaker is struggling to complete a task' },
                { id: 'C', text: 'It creates a hopeful tone about the future' },
                { id: 'D', text: 'It suggests that people are working together' },
              ],
              correct_answer: 'A',
            },
            {
              id: 'p1q4', type: 'multi_select',
              question: 'In which two ways does the poet develop the speaker\'s point of view?\n\nSelect the TWO correct answers.',
              selectCount: 2,
              choices: [
                { id: 'A', text: 'by listing multiple historical battle locations' },
                { id: 'B', text: 'by describing the emotional impact on soldiers' },
                { id: 'C', text: 'by showing how time causes people to forget events' },
                { id: 'D', text: 'by comparing nature to human progress' },
                { id: 'E', text: 'by explaining the causes of war' },
              ],
              correct_answers: ['A', 'C'],
            },
            {
              id: 'p1q5', type: 'mcq',
              question: 'How do lines 7–9 most contribute to a theme of the poem?',
              choices: [
                { id: 'A', text: 'by showing that time erases memory of past events' },
                { id: 'B', text: 'by explaining how people learn from history' },
                { id: 'C', text: 'by describing how travel spreads knowledge' },
                { id: 'D', text: 'by showing respect for historical events' },
              ],
              correct_answer: 'A',
            },
            {
              id: 'p1q6', type: 'mcq',
              question: 'The personification in the poem suggests that the grass is',
              choices: [
                { id: 'A', text: 'a symbol of nature\'s ability to erase human history' },
                { id: 'B', text: 'a reminder of the importance of remembering the past' },
                { id: 'C', text: 'a warning about future conflicts' },
                { id: 'D', text: 'a symbol of human strength' },
              ],
              correct_answer: 'A',
            },
            {
              id: 'p1q7', type: 'match',
              question: 'Which quotations support the idea that war causes destruction, and which support the idea that time erases memory?\n\nAssign each quotation to the correct category.',
              items: [
                { id: '1', text: '"Pile the bodies high at Austerlitz and Waterloo"' },
                { id: '2', text: '"Shovel them under and let me work"' },
                { id: '3', text: '"Two years, ten years…"' },
                { id: '4', text: '"Where are we now?"' },
                { id: '5', text: '"I am the grass; I cover all"' },
              ],
              categories: [
                { id: 'war',  label: 'War Causes Destruction' },
                { id: 'time', label: 'Time Erases Memory' },
              ],
              correct_matches: {
                '1': 'war',
                '2': 'war',
                '3': 'time',
                '4': 'time',
                '5': 'time',
              },
            },
          ],
        },

        // ── Passage 2  (Q9–Q16) ────────────────────────────────────────────
        {
          id: 'passage-2',
          title: 'Passage 2',
          content:
            'Hawkins explained to his wife that their land would one day become extremely valuable. Though it was nearly worthless now, he believed that future developments would transform it. He spoke of railroads and steamboats bringing people and trade into the region. What seemed empty now, he insisted, would one day be filled with opportunity.\n\n' +
            'He described resources hidden within the land — coal, iron, and copper — materials that others overlooked. To him, these were signs of future wealth. While others saw nothing, he saw potential.\n\n' +
            'His excitement grew as he spoke, imagining a future where their children would live in comfort and success. Though he admitted they might never see this change themselves, he believed firmly that it would come.',
          questions: [
            {
              id: 'p2q1', type: 'mcq',
              question: 'Hawkins believes the land will become valuable mainly because of',
              choices: [
                { id: 'A', text: 'farming.' },
                { id: 'B', text: 'future development.' },
                { id: 'C', text: 'population decline.' },
                { id: 'D', text: 'current trade.' },
              ],
              correct_answer: 'B',
            },
            {
              id: 'p2q2', type: 'mcq',
              question: 'Which word best describes the tone of Hawkins\' speech?',
              choices: [
                { id: 'A', text: 'Doubtful' },
                { id: 'B', text: 'Enthusiastic' },
                { id: 'C', text: 'Sarcastic' },
                { id: 'D', text: 'Calm' },
              ],
              correct_answer: 'B',
            },
            {
              id: 'p2q3', type: 'mcq',
              question: 'The reader can infer that Hawkins is',
              choices: [
                { id: 'A', text: 'cautious.' },
                { id: 'B', text: 'realistic.' },
                { id: 'C', text: 'optimistic.' },
                { id: 'D', text: 'indifferent.' },
              ],
              correct_answer: 'C',
            },
            {
              id: 'p2q4', type: 'mcq',
              question: 'The phrase "hidden resources" suggests',
              choices: [
                { id: 'A', text: 'visible wealth.' },
                { id: 'B', text: 'unknown potential.' },
                { id: 'C', text: 'lost materials.' },
                { id: 'D', text: 'useless land.' },
              ],
              correct_answer: 'B',
            },
            {
              id: 'p2q5', type: 'mcq',
              question: 'Which detail best supports Hawkins\' belief about the land?',
              choices: [
                { id: 'A', text: 'The land is empty.' },
                { id: 'B', text: 'He mentions railroads and trade.' },
                { id: 'C', text: 'His wife listens quietly.' },
                { id: 'D', text: 'The land is cheap.' },
              ],
              correct_answer: 'B',
            },
            {
              id: 'p2q6', type: 'mcq',
              question: 'Hawkins\' vision of the future focuses mainly on',
              choices: [
                { id: 'A', text: 'personal comfort.' },
                { id: 'B', text: 'family success.' },
                { id: 'C', text: 'leaving immediately.' },
                { id: 'D', text: 'avoiding work.' },
              ],
              correct_answer: 'B',
            },
            {
              id: 'p2q7', type: 'mcq',
              question: 'The author presents Hawkins as someone who',
              choices: [
                { id: 'A', text: 'ignores reality.' },
                { id: 'B', text: 'sees opportunity others miss.' },
                { id: 'C', text: 'dislikes change.' },
                { id: 'D', text: 'avoids risk.' },
              ],
              correct_answer: 'B',
            },
            {
              id: 'p2q8', type: 'mcq',
              question: 'Which statement best expresses the main idea of the passage?',
              choices: [
                { id: 'A', text: 'The land is currently valuable.' },
                { id: 'B', text: 'Hawkins imagines future success.' },
                { id: 'C', text: 'His wife disagrees.' },
                { id: 'D', text: 'The land should be sold.' },
              ],
              correct_answer: 'B',
            },
          ],
        },

        // ── Passage 3  (Q17–Q24) ───────────────────────────────────────────
        {
          id: 'passage-3',
          title: 'Passage 3',
          content:
            'Nancy listened to her husband\'s plans but remained uncertain. She remembered previous attempts to build wealth that had failed. Each time, hope had been followed by disappointment.\n\n' +
            'She did not doubt his intentions, but she questioned the outcome. Experience had taught her that not every idea leads to success. Though she supported him, she could not ignore what had happened before.',
          questions: [
            {
              id: 'p3q1', type: 'mcq',
              question: 'Nancy\'s reaction is best described as',
              choices: [
                { id: 'A', text: 'excited.' },
                { id: 'B', text: 'doubtful.' },
                { id: 'C', text: 'angry.' },
                { id: 'D', text: 'confused.' },
              ],
              correct_answer: 'B',
            },
            {
              id: 'p3q2', type: 'mcq',
              question: 'Nancy doubts the plan mainly because',
              choices: [
                { id: 'A', text: 'she dislikes change.' },
                { id: 'B', text: 'past efforts failed.' },
                { id: 'C', text: 'she fears travel.' },
                { id: 'D', text: 'she disagrees with him.' },
              ],
              correct_answer: 'B',
            },
            {
              id: 'p3q3', type: 'mcq',
              question: 'The contrast between Nancy and Hawkins mainly shows',
              choices: [
                { id: 'A', text: 'optimism versus experience.' },
                { id: 'B', text: 'fear versus courage.' },
                { id: 'C', text: 'action versus laziness.' },
                { id: 'D', text: 'logic versus confusion.' },
              ],
              correct_answer: 'A',
            },
            {
              id: 'p3q4', type: 'mcq',
              question: 'Which word best describes the tone of the passage?',
              choices: [
                { id: 'A', text: 'Hopeful' },
                { id: 'B', text: 'Humorous' },
                { id: 'C', text: 'Cautious' },
                { id: 'D', text: 'Excited' },
              ],
              correct_answer: 'C',
            },
            {
              id: 'p3q5', type: 'mcq',
              question: 'Nancy supports Hawkins but',
              choices: [
                { id: 'A', text: 'fully agrees.' },
                { id: 'B', text: 'remains skeptical.' },
                { id: 'C', text: 'refuses to go.' },
                { id: 'D', text: 'ignores him.' },
              ],
              correct_answer: 'B',
            },
            {
              id: 'p3q6', type: 'mcq',
              question: 'Which statement best expresses the main idea of the passage?',
              choices: [
                { id: 'A', text: 'Nancy opposes Hawkins.' },
                { id: 'B', text: 'Nancy reflects on past failures.' },
                { id: 'C', text: 'Nancy is confused.' },
                { id: 'D', text: 'Nancy leaves.' },
              ],
              correct_answer: 'B',
            },
            {
              id: 'p3q7', type: 'mcq',
              question: 'The reader can infer that Nancy values',
              choices: [
                { id: 'A', text: 'risk.' },
                { id: 'B', text: 'stability.' },
                { id: 'C', text: 'wealth.' },
                { id: 'D', text: 'travel.' },
              ],
              correct_answer: 'B',
            },
            {
              id: 'p3q8', type: 'mcq',
              question: 'Nancy\'s perspective is shaped mainly by',
              choices: [
                { id: 'A', text: 'imagination.' },
                { id: 'B', text: 'experience.' },
                { id: 'C', text: 'pressure.' },
                { id: 'D', text: 'fear.' },
              ],
              correct_answer: 'B',
            },
          ],
        },

        // ── Passage 4  (Q25–Q32) ───────────────────────────────────────────
        {
          id: 'passage-4',
          title: 'Passage 4',
          content:
            'Clay stood silently beside his mother\'s coffin, expressing his grief through quiet actions. He placed flowers gently and touched her face, showing love without words. His sorrow was deep, yet controlled.\n\n' +
            'Those around him watched with sympathy. Though he did not speak, his actions revealed everything. The loss had left him alone, without family or support.',
          questions: [
            {
              id: 'p4q1', type: 'mcq',
              question: 'Clay\'s grief is shown mainly through',
              choices: [
                { id: 'A', text: 'loud crying.' },
                { id: 'B', text: 'silence and actions.' },
                { id: 'C', text: 'anger.' },
                { id: 'D', text: 'speech.' },
              ],
              correct_answer: 'B',
            },
            {
              id: 'p4q2', type: 'mcq',
              question: 'Which word best describes the tone of the passage?',
              choices: [
                { id: 'A', text: 'Joyful' },
                { id: 'B', text: 'Tense' },
                { id: 'C', text: 'Sorrowful' },
                { id: 'D', text: 'Humorous' },
              ],
              correct_answer: 'C',
            },
            {
              id: 'p4q3', type: 'mcq',
              question: 'The author emphasizes Clay\'s',
              choices: [
                { id: 'A', text: 'emotional control.' },
                { id: 'B', text: 'anger.' },
                { id: 'C', text: 'confusion.' },
                { id: 'D', text: 'fear.' },
              ],
              correct_answer: 'A',
            },
            {
              id: 'p4q4', type: 'mcq',
              question: 'Clay\'s actions suggest that he is',
              choices: [
                { id: 'A', text: 'calm and unaffected.' },
                { id: 'B', text: 'deeply grieving.' },
                { id: 'C', text: 'confused.' },
                { id: 'D', text: 'angry.' },
              ],
              correct_answer: 'B',
            },
            {
              id: 'p4q5', type: 'mcq',
              question: 'Why does the author avoid dialogue in the passage?',
              choices: [
                { id: 'A', text: 'To shorten the passage' },
                { id: 'B', text: 'To emphasize emotion through actions' },
                { id: 'C', text: 'To confuse the reader' },
                { id: 'D', text: 'To create humor' },
              ],
              correct_answer: 'B',
            },
            {
              id: 'p4q6', type: 'mcq',
              question: 'Which statement best expresses the main idea of the passage?',
              choices: [
                { id: 'A', text: 'Clay is strong.' },
                { id: 'B', text: 'Clay expresses grief quietly.' },
                { id: 'C', text: 'Clay is angry.' },
                { id: 'D', text: 'Clay leaves.' },
              ],
              correct_answer: 'B',
            },
            {
              id: 'p4q7', type: 'mcq',
              question: 'The reader can infer that Clay feels',
              choices: [
                { id: 'A', text: 'relief.' },
                { id: 'B', text: 'loneliness.' },
                { id: 'C', text: 'excitement.' },
                { id: 'D', text: 'anger.' },
              ],
              correct_answer: 'B',
            },
            {
              id: 'p4q8', type: 'mcq',
              question: 'The passage suggests that emotions can be',
              choices: [
                { id: 'A', text: 'hidden.' },
                { id: 'B', text: 'exaggerated.' },
                { id: 'C', text: 'ignored.' },
                { id: 'D', text: 'meaningless.' },
              ],
              correct_answer: 'A',
            },
          ],
        },

        // ── Passage 5  (Q33–Q40) — PLACEHOLDER ─────────────────────────────
        {
          id: 'passage-5',
          title: 'Passage 5 — [PLACEHOLDER]',
          content:
            '[PLACEHOLDER] Replace this text with the actual Passage 5 content.\n\n' +
            'Questions 33–40 refer to this passage. Add as many paragraphs as needed, separated by blank lines in the string (\\n\\n).',
          questions: placeholderQuestions('p5', 33, 8),
        },

        // ── Passage 6  (Q41–Q48) — PLACEHOLDER ─────────────────────────────
        {
          id: 'passage-6',
          title: 'Passage 6 — [PLACEHOLDER]',
          content:
            '[PLACEHOLDER] Replace this text with the actual Passage 6 content.\n\n' +
            'Questions 41–48 refer to this passage. Add as many paragraphs as needed.',
          questions: placeholderQuestions('p6', 41, 8),
        },

      ], // end passages (RC)
    }, // end Reading Comprehension

    // ── Revising/Editing Part A  Q49–Q53 ─────────────────────────────────────
    {
      id: 'rev-edit-a',
      type: 'revising_editing_a',
      sectionLabel: 'English Language Arts',
      title: 'REVISING/EDITING PART A',
      directions:
        'Read the text or texts that follow and answer the related questions. You will be asked to improve the writing quality of each text and to correct errors so that each text follows the conventions of standard written English. You should reread relevant parts of each text, while being mindful of time, before selecting the best answer for each question.',
      questions: placeholderQuestions('re-a', 49, 5),
    },

    // ── Revising/Editing Part B  Q54–Q57 ─────────────────────────────────────
    {
      id: 'rev-edit-b',
      type: 'revising_editing_b',
      sectionLabel: 'English Language Arts',
      title: 'REVISING/EDITING PART B',
      directions:
        'Read and answer the following questions. You will be asked to recognize and correct errors so that the sentences or short paragraphs follow the conventions of standard written English. As needed, you may use the notepad tool or write on the scrap paper given to you to take notes. You should reread relevant parts while being mindful of time.',
      questions: placeholderQuestions('re-b', 54, 4),
    },

    // ── Mathematics  Q58–Q114 ─────────────────────────────────────────────────
    {
      id: 'math',
      type: 'mathematics',
      sectionLabel: 'Mathematics',
      title: 'MATHEMATICS',
      directionBullets: [
        'Formulas and definitions are not provided.',
        'Diagrams are not necessarily drawn to scale.',
        'Assume all diagrams lie in one plane unless otherwise stated.',
        'Graphs are drawn to scale unless otherwise stated.',
      ],
      directions:
        'Solve each problem. Select the answer from the choices given or enter your answer in the space provided.',
      questions: placeholderQuestions('math', 58, 57),
    },

  ], // end subsections
}
