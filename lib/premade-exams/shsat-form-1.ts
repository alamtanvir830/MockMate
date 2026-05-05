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
  contentType?: 'prose' | 'poem' | 'numbered_sentences'
  content: string          // paragraphs separated by \n\n; sentences by \n (unused for poems)
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
  passages?: SHSATPassage[]   // RC + Rev/Edit Part A (passage shown on left)
  questions?: SHSATQuestion[] // Rev/Edit Part B + Math (centered layout)
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

        // ── Passage 2  (Q8–Q19)  The Intelligence of Crows ───────────────────
        {
          id: 'passage-2',
          title: 'The Intelligence of Crows',
          author: 'Adapted from public-domain nature writing',
          content:
            'Crows have often been described as noisy birds with little purpose beyond searching for food. Yet observers who have watched them closely have noticed that crows often behave with surprising caution and intelligence. They do not simply rush toward every object that interests them. Instead, they observe, wait, and seem to judge whether a situation is safe.\n\n' +
            'One naturalist described a crow that wanted food placed near a house. The bird did not fly directly to the food. It landed at a distance, walked slowly toward it, stopped several times, and looked carefully around. Only after deciding that no danger was near did it take the food and fly away. The behavior suggested more than hunger; it suggested judgment.\n\n' +
            'Crows are also known to learn from repeated experience. If a person disturbs them once, they may avoid that person later. If an object proves harmless after several encounters, they may approach it more confidently. This ability to change behavior based on experience helps them survive in places where dangers are not always obvious.\n\n' +
            'Their intelligence is especially clear when they work around obstacles. A crow that cannot reach food immediately may try different methods, such as pulling, dropping, or moving objects. These actions do not always succeed, but they show persistence and flexibility. The crow does not merely repeat one action; it adjusts.\n\n' +
            'Some people still dismiss such behavior as instinct. However, instinct alone does not fully explain why crows wait, test, and change their actions. Their behavior suggests that they are capable of learning from the past and responding thoughtfully to new situations.',
          questions: [
            {
              id: 'p2q1', type: 'mcq',
              question: 'How does paragraph 1 introduce the central idea of the passage?',
              choices: [
                { id: 'A', text: 'It explains why crows are louder than other birds.' },
                { id: 'B', text: 'It challenges a simple view of crows by suggesting that they act with caution and intelligence.' },
                { id: 'C', text: 'It argues that crows are dangerous to humans.' },
                { id: 'D', text: 'It describes the physical appearance of crows.' },
              ],
              correct_answer: 'B',
            },
            {
              id: 'p2q2', type: 'mcq',
              question: 'Which detail from paragraph 2 best supports the idea that the crow acted cautiously?',
              choices: [
                { id: 'A', text: 'The crow wanted food placed near a house.' },
                { id: 'B', text: 'The crow landed at a distance and stopped several times.' },
                { id: 'C', text: 'The crow took the food and flew away.' },
                { id: 'D', text: 'The food was located near a house.' },
              ],
              correct_answer: 'B',
            },
            {
              id: 'p2q3', type: 'mcq',
              question: 'As used in paragraph 2, the word "judgment" most nearly means',
              choices: [
                { id: 'A', text: 'criticism.' },
                { id: 'B', text: 'decision-making.' },
                { id: 'C', text: 'punishment.' },
                { id: 'D', text: 'speed.' },
              ],
              correct_answer: 'B',
            },
            {
              id: 'p2q4', type: 'mcq',
              question: 'The example in paragraph 3 mainly shows that crows',
              choices: [
                { id: 'A', text: 'forget dangers quickly.' },
                { id: 'B', text: 'behave the same way in every situation.' },
                { id: 'C', text: 'learn from repeated experience.' },
                { id: 'D', text: 'prefer people to other animals.' },
              ],
              correct_answer: 'C',
            },
            {
              id: 'p2q5', type: 'mcq',
              question: 'Which sentence best explains how paragraph 4 contributes to the passage?',
              choices: [
                { id: 'A', text: 'It shows that crows use flexible problem-solving when faced with difficulty.' },
                { id: 'B', text: 'It proves that crows always succeed when looking for food.' },
                { id: 'C', text: 'It explains why crows avoid people.' },
                { id: 'D', text: 'It describes the types of food crows prefer.' },
              ],
              correct_answer: 'A',
            },
            {
              id: 'p2q6', type: 'mcq',
              question: 'The author most likely includes the phrase "does not merely repeat one action" to emphasize that crows',
              choices: [
                { id: 'A', text: 'become bored easily.' },
                { id: 'B', text: 'use different strategies when solving problems.' },
                { id: 'C', text: 'dislike difficult tasks.' },
                { id: 'D', text: 'depend entirely on instinct.' },
              ],
              correct_answer: 'B',
            },
            {
              id: 'p2q7', type: 'mcq',
              question: 'Which statement best describes the author\'s point of view?',
              choices: [
                { id: 'A', text: 'Crows are troublesome birds that should be avoided.' },
                { id: 'B', text: 'Crows are less intelligent than most people believe.' },
                { id: 'C', text: 'Crows show signs of intelligence through caution, learning, and problem-solving.' },
                { id: 'D', text: 'Crows survive only because they are physically strong.' },
              ],
              correct_answer: 'C',
            },
            {
              id: 'p2q8', type: 'mcq',
              question: 'Read this sentence from paragraph 5:\n"However, instinct alone does not fully explain why crows wait, test, and change their actions."\nHow does this sentence fit into the overall structure of the passage?',
              choices: [
                { id: 'A', text: 'It introduces a new topic unrelated to the rest of the passage.' },
                { id: 'B', text: 'It summarizes the argument that crow behavior may involve more than instinct.' },
                { id: 'C', text: 'It explains why crows are afraid of humans.' },
                { id: 'D', text: 'It describes the author\'s personal experience with crows.' },
              ],
              correct_answer: 'B',
            },
            {
              id: 'p2q9', type: 'multi_select',
              question: 'Which two details best support the idea that crows can adapt their behavior?\n\nSelect the TWO correct answers.',
              selectCount: 2,
              choices: [
                { id: 'A', text: 'They are often described as noisy birds.' },
                { id: 'B', text: 'They may avoid a person who disturbed them once.' },
                { id: 'C', text: 'They may approach an object more confidently after repeated harmless encounters.' },
                { id: 'D', text: 'They search for food near houses.' },
                { id: 'E', text: 'They fly away after taking food.' },
              ],
              correct_answers: ['B', 'C'],
            },
            {
              id: 'p2q10', type: 'mcq',
              question: 'Which quotation best supports the idea that the crow in paragraph 2 was not acting impulsively?',
              choices: [
                { id: 'A', text: '"wanted food placed near a house"' },
                { id: 'B', text: '"walked slowly toward it"' },
                { id: 'C', text: '"took the food and flew away"' },
                { id: 'D', text: '"The behavior suggested more than hunger"' },
              ],
              correct_answer: 'D',
            },
            {
              id: 'p2q11', type: 'mcq',
              question: 'The passage suggests that intelligence in animals can be shown by',
              choices: [
                { id: 'A', text: 'size and strength.' },
                { id: 'B', text: 'noise and movement.' },
                { id: 'C', text: 'learning, caution, and problem-solving.' },
                { id: 'D', text: 'speed and flight.' },
              ],
              correct_answer: 'C',
            },
            {
              id: 'p2q12', type: 'mcq',
              question: 'Which statement best expresses the main idea of the passage?',
              choices: [
                { id: 'A', text: 'Crows are mainly instinctive birds that search for food.' },
                { id: 'B', text: 'Crows show intelligence through careful observation and flexible behavior.' },
                { id: 'C', text: 'Crows are dangerous because they remember people.' },
                { id: 'D', text: 'Crows are unusual because they live near houses.' },
              ],
              correct_answer: 'B',
            },
          ],
        },

        // ── Passage 3  (Q20–Q32)  The Railway Children ─────────────────────
        {
          id: 'passage-3',
          title: 'Excerpt from The Railway Children',
          author: 'Adapted from The Railway Children by E. Nesbit — Public Domain',
          content:
            'The children had grown used to the sound of trains passing near their new home. At first the noise had startled them, but soon the railway became part of their daily life. They learned the times when the trains came and went, and they often waved to passengers from the hillside.\n\n' +
            'One afternoon, while they were near the track, the children noticed something strange on the railway line. A fall of earth and stones had slipped down from the bank and lay across the rails. For a moment, none of them spoke. Then they understood that a train would soon be coming and that the driver might not see the danger in time.\n\n' +
            'They had no tools and no adult was nearby. The children tried to move some of the stones, but the pile was too heavy. The more they pulled and pushed, the clearer it became that they could not clear the track before the train arrived.\n\n' +
            'Then one of them remembered that red was used as a danger signal. They tore pieces from their clothing and fastened them to sticks. Standing where the driver would be able to see them, they waved the red cloths as hard as they could.\n\n' +
            'The train appeared in the distance. At first it seemed not to slow. The children waved more desperately, their arms aching and their hearts pounding. Finally, the engine gave a sharp sound, and the train began to slow. It stopped before reaching the fallen earth.\n\n' +
            'When the danger had passed, the children were trembling. They had acted quickly, but only afterward did they fully understand what might have happened. The railway, which had once seemed only exciting, now seemed powerful and dangerous as well.',
          questions: [
            {
              id: 'p3q1', type: 'mcq',
              question: 'How does paragraph 1 help establish the setting of the passage?',
              choices: [
                { id: 'A', text: 'It explains why the children dislike trains.' },
                { id: 'B', text: 'It shows that the railway has become a familiar part of the children\'s lives.' },
                { id: 'C', text: 'It describes the town where the children live.' },
                { id: 'D', text: 'It introduces the train driver as the main character.' },
              ],
              correct_answer: 'B',
            },
            {
              id: 'p3q2', type: 'mcq',
              question: 'Which detail first creates tension in the passage?',
              choices: [
                { id: 'A', text: 'The children wave to passengers.' },
                { id: 'B', text: 'The children hear trains passing.' },
                { id: 'C', text: 'Earth and stones have fallen across the rails.' },
                { id: 'D', text: 'The railway becomes part of daily life.' },
              ],
              correct_answer: 'C',
            },
            {
              id: 'p3q3', type: 'mcq',
              question: 'In paragraph 2, the sentence "For a moment, none of them spoke" suggests that the children',
              choices: [
                { id: 'A', text: 'are confused by the sound of the train.' },
                { id: 'B', text: 'immediately understand the seriousness of what they see.' },
                { id: 'C', text: 'are unsure whether they should go home.' },
                { id: 'D', text: 'do not care about the danger.' },
              ],
              correct_answer: 'B',
            },
            {
              id: 'p3q4', type: 'mcq',
              question: 'Why do the children try to move the stones?',
              choices: [
                { id: 'A', text: 'They want to play near the track.' },
                { id: 'B', text: 'They believe they can stop the train by clearing the rails.' },
                { id: 'C', text: 'They are trying to hide the damage.' },
                { id: 'D', text: 'They want to build a warning sign.' },
              ],
              correct_answer: 'B',
            },
            {
              id: 'p3q5', type: 'mcq',
              question: 'How does paragraph 4 contribute to the development of the plot?',
              choices: [
                { id: 'A', text: 'It shows the children deciding to use a signal when they cannot clear the track.' },
                { id: 'B', text: 'It explains why the train is late.' },
                { id: 'C', text: 'It describes the children returning home for help.' },
                { id: 'D', text: 'It introduces a new danger on the hillside.' },
              ],
              correct_answer: 'A',
            },
            {
              id: 'p3q6', type: 'mcq',
              question: 'The children\'s decision to wave red cloths mainly shows that they are',
              choices: [
                { id: 'A', text: 'careless.' },
                { id: 'B', text: 'resourceful.' },
                { id: 'C', text: 'frightened into doing nothing.' },
                { id: 'D', text: 'unaware of the danger.' },
              ],
              correct_answer: 'B',
            },
            {
              id: 'p3q7', type: 'mcq',
              question: 'Read this sentence from paragraph 5:\n"The children waved more desperately, their arms aching and their hearts pounding."\nWhat does this sentence emphasize?',
              choices: [
                { id: 'A', text: 'Their boredom while waiting for the train' },
                { id: 'B', text: 'Their physical effort and fear' },
                { id: 'C', text: 'Their anger at the train driver' },
                { id: 'D', text: 'Their confusion about the signal' },
              ],
              correct_answer: 'B',
            },
            {
              id: 'p3q8', type: 'mcq',
              question: 'Which sentence best supports the idea that the children\'s warning succeeds?',
              choices: [
                { id: 'A', text: '"The train appeared in the distance."' },
                { id: 'B', text: '"At first it seemed not to slow."' },
                { id: 'C', text: '"Finally, the engine gave a sharp sound, and the train began to slow."' },
                { id: 'D', text: '"The children were trembling."' },
              ],
              correct_answer: 'C',
            },
            {
              id: 'p3q9', type: 'mcq',
              question: 'How does the final paragraph contribute to the passage?',
              choices: [
                { id: 'A', text: 'It shows that the children now understand the railway\'s danger more deeply.' },
                { id: 'B', text: 'It explains why the railway will close.' },
                { id: 'C', text: 'It shows that the children regret helping.' },
                { id: 'D', text: 'It introduces another emergency.' },
              ],
              correct_answer: 'A',
            },
            {
              id: 'p3q10', type: 'mcq',
              question: 'Which word best describes the tone of the passage?',
              choices: [
                { id: 'A', text: 'Playful' },
                { id: 'B', text: 'Suspenseful' },
                { id: 'C', text: 'Humorous' },
                { id: 'D', text: 'Calm' },
              ],
              correct_answer: 'B',
            },
            {
              id: 'p3q11', type: 'mcq',
              question: 'Which statement best expresses a theme of the passage?',
              choices: [
                { id: 'A', text: 'Familiar things can become dangerous in unexpected situations.' },
                { id: 'B', text: 'Children should avoid helping adults.' },
                { id: 'C', text: 'Trains are always unsafe.' },
                { id: 'D', text: 'Danger is best ignored.' },
              ],
              correct_answer: 'A',
            },
            {
              id: 'p3q12', type: 'multi_select',
              question: 'Which two details best show the children acting under pressure?\n\nSelect the TWO correct answers.',
              selectCount: 2,
              choices: [
                { id: 'A', text: 'They learned the times when trains came and went.' },
                { id: 'B', text: 'They tried to move some of the stones.' },
                { id: 'C', text: 'They tore pieces from their clothing to make signals.' },
                { id: 'D', text: 'They often waved to passengers.' },
                { id: 'E', text: 'They had grown used to the sound of trains.' },
              ],
              correct_answers: ['B', 'C'],
            },
            {
              id: 'p3q13', type: 'mcq',
              question: 'The passage is mainly organized around',
              choices: [
                { id: 'A', text: 'a problem and the children\'s response to it.' },
                { id: 'B', text: 'a comparison between two trains.' },
                { id: 'C', text: 'a description of a peaceful afternoon.' },
                { id: 'D', text: 'an explanation of railway schedules.' },
              ],
              correct_answer: 'A',
            },
          ],
        },

        // ── Passage 4  (Q33–Q48)  The Growth of the Great Libraries ────────
        {
          id: 'passage-4',
          title: 'The Growth of the Great Libraries',
          author: 'Original passage based on public-domain historical sources',
          content:
            'In the nineteenth century, books were not as easy to obtain as they are today. Many families owned only a few volumes, and some communities had no public place where ordinary people could borrow books. Reading was often connected with wealth, education, and private collections.\n\n' +
            'This began to change as towns and cities created public libraries. These libraries were built on the belief that knowledge should not belong only to those who could afford large collections of books. A library could give workers, immigrants, children, and families access to information that might otherwise remain out of reach.\n\n' +
            'One of the best-known supporters of public libraries was Andrew Carnegie, a businessman who funded the construction of many library buildings. Carnegie believed that a person who wanted to learn should have the chance to do so. His gifts helped towns build libraries, but communities usually had to agree to support and maintain them.\n\n' +
            'The libraries were more than rooms filled with books. They became places where people could study, attend lectures, read newspapers, and learn skills. For many communities, the library was one of the few public spaces open to people from different backgrounds.\n\n' +
            'Some critics argued that libraries alone could not solve problems such as poverty or lack of schooling. A building full of books did not guarantee that every person would have time, support, or preparation to use them well. Still, libraries gave many people a starting point.\n\n' +
            'Over time, public libraries became symbols of shared opportunity. They suggested that learning was not only a private privilege but also a public good. Even as technology changed the way people found information, the central idea behind the public library remained powerful: access to knowledge can help people improve their lives.',
          questions: [
            {
              id: 'p4q1', type: 'mcq',
              question: 'How does paragraph 1 introduce the central idea of the passage?',
              choices: [
                { id: 'A', text: 'It explains why books were less available to many people in the past.' },
                { id: 'B', text: 'It argues that private collections were unnecessary.' },
                { id: 'C', text: 'It describes how libraries were built.' },
                { id: 'D', text: 'It explains why people stopped reading books.' },
              ],
              correct_answer: 'A',
            },
            {
              id: 'p4q2', type: 'mcq',
              question: 'Which sentence best supports the idea that public libraries were meant to increase access to knowledge?',
              choices: [
                { id: 'A', text: '"Many families owned only a few volumes."' },
                { id: 'B', text: '"These libraries were built on the belief that knowledge should not belong only to those who could afford large collections of books."' },
                { id: 'C', text: '"One of the best-known supporters of public libraries was Andrew Carnegie."' },
                { id: 'D', text: '"Some critics argued that libraries alone could not solve problems."' },
              ],
              correct_answer: 'B',
            },
            {
              id: 'p4q3', type: 'mcq',
              question: 'As used in paragraph 2, "out of reach" most nearly means',
              choices: [
                { id: 'A', text: 'physically nearby.' },
                { id: 'B', text: 'difficult to access.' },
                { id: 'C', text: 'no longer useful.' },
                { id: 'D', text: 'easy to understand.' },
              ],
              correct_answer: 'B',
            },
            {
              id: 'p4q4', type: 'mcq',
              question: 'What is the main purpose of paragraph 3?',
              choices: [
                { id: 'A', text: 'To explain Carnegie\'s role in expanding public libraries' },
                { id: 'B', text: 'To describe the kinds of books Carnegie owned' },
                { id: 'C', text: 'To argue that towns disliked Carnegie\'s donations' },
                { id: 'D', text: 'To explain how Carnegie became wealthy' },
              ],
              correct_answer: 'A',
            },
            {
              id: 'p4q5', type: 'mcq',
              question: 'The detail that communities "had to agree to support and maintain" libraries suggests that',
              choices: [
                { id: 'A', text: 'Carnegie wanted communities to take responsibility for the libraries.' },
                { id: 'B', text: 'Carnegie built libraries only for wealthy people.' },
                { id: 'C', text: 'most towns refused to accept libraries.' },
                { id: 'D', text: 'libraries were temporary buildings.' },
              ],
              correct_answer: 'A',
            },
            {
              id: 'p4q6', type: 'mcq',
              question: 'How does paragraph 4 expand the reader\'s understanding of libraries?',
              choices: [
                { id: 'A', text: 'It shows that libraries served many educational and community purposes.' },
                { id: 'B', text: 'It explains why newspapers replaced books.' },
                { id: 'C', text: 'It shows that libraries were used only by students.' },
                { id: 'D', text: 'It describes the architecture of library buildings.' },
              ],
              correct_answer: 'A',
            },
            {
              id: 'p4q7', type: 'mcq',
              question: 'Which statement best describes the relationship between paragraphs 4 and 5?',
              choices: [
                { id: 'A', text: 'Paragraph 4 explains the benefits of libraries, while paragraph 5 acknowledges their limits.' },
                { id: 'B', text: 'Paragraph 4 criticizes libraries, while paragraph 5 rejects that criticism.' },
                { id: 'C', text: 'Paragraph 4 describes Carnegie\'s wealth, while paragraph 5 explains how he spent it.' },
                { id: 'D', text: 'Paragraph 4 focuses on technology, while paragraph 5 focuses on poverty.' },
              ],
              correct_answer: 'A',
            },
            {
              id: 'p4q8', type: 'mcq',
              question: 'Why does the author include critics\' views in paragraph 5?',
              choices: [
                { id: 'A', text: 'To suggest that libraries were harmful' },
                { id: 'B', text: 'To show that libraries were valuable but not a complete solution to every problem' },
                { id: 'C', text: 'To argue that books were no longer important' },
                { id: 'D', text: 'To explain why libraries stopped being built' },
              ],
              correct_answer: 'B',
            },
            {
              id: 'p4q9', type: 'mcq',
              question: 'Which detail from the passage best supports the idea that libraries helped many different kinds of people?',
              choices: [
                { id: 'A', text: '"Reading was often connected with wealth."' },
                { id: 'B', text: '"A library could give workers, immigrants, children, and families access to information."' },
                { id: 'C', text: '"Carnegie believed that a person who wanted to learn should have the chance to do so."' },
                { id: 'D', text: '"A building full of books did not guarantee that every person would have time."' },
              ],
              correct_answer: 'B',
            },
            {
              id: 'p4q10', type: 'mcq',
              question: 'Which word best describes the tone of the passage?',
              choices: [
                { id: 'A', text: 'Bitter' },
                { id: 'B', text: 'Informative and appreciative' },
                { id: 'C', text: 'Humorous' },
                { id: 'D', text: 'Suspicious' },
              ],
              correct_answer: 'B',
            },
            {
              id: 'p4q11', type: 'mcq',
              question: 'Read this sentence from paragraph 6:\n"Over time, public libraries became symbols of shared opportunity."\nHow does this sentence contribute to the passage?',
              choices: [
                { id: 'A', text: 'It summarizes the larger meaning of public libraries beyond their physical buildings.' },
                { id: 'B', text: 'It introduces a new argument against libraries.' },
                { id: 'C', text: 'It explains why libraries became less useful over time.' },
                { id: 'D', text: 'It compares libraries to private homes.' },
              ],
              correct_answer: 'A',
            },
            {
              id: 'p4q12', type: 'mcq',
              question: 'Which statement would the author most likely agree with?',
              choices: [
                { id: 'A', text: 'Public libraries are useful only for people who cannot buy books.' },
                { id: 'B', text: 'Public libraries helped make learning more available to the public.' },
                { id: 'C', text: 'Public libraries solved all problems related to poverty.' },
                { id: 'D', text: 'Public libraries were important only before modern technology.' },
              ],
              correct_answer: 'B',
            },
            {
              id: 'p4q13', type: 'multi_select',
              question: 'Which two ideas are developed in the passage?\n\nSelect the TWO correct answers.',
              selectCount: 2,
              choices: [
                { id: 'A', text: 'Libraries expanded access to knowledge.' },
                { id: 'B', text: 'Libraries were mainly built for wealthy families.' },
                { id: 'C', text: 'Libraries could support learning but could not solve every social problem.' },
                { id: 'D', text: 'Libraries replaced schools in most towns.' },
                { id: 'E', text: 'Libraries were disliked by immigrants.' },
              ],
              correct_answers: ['A', 'C'],
            },
            {
              id: 'p4q14', type: 'mcq',
              question: 'The phrase "public good" in paragraph 6 suggests that learning',
              choices: [
                { id: 'A', text: 'should benefit the wider community.' },
                { id: 'B', text: 'should remain private.' },
                { id: 'C', text: 'is useful only for business owners.' },
                { id: 'D', text: 'is less important than technology.' },
              ],
              correct_answer: 'A',
            },
            {
              id: 'p4q15', type: 'mcq',
              question: 'How does the passage mainly develop its central idea?',
              choices: [
                { id: 'A', text: 'By explaining how public libraries increased access to learning and became important community spaces' },
                { id: 'B', text: 'By comparing libraries to schools and newspapers' },
                { id: 'C', text: 'By listing every town that received a library' },
                { id: 'D', text: 'By focusing only on Andrew Carnegie\'s personal life' },
              ],
              correct_answer: 'A',
            },
            {
              id: 'p4q16', type: 'mcq',
              question: 'Which quotation best supports the idea that libraries gave people a chance to improve their lives?',
              choices: [
                { id: 'A', text: '"Many families owned only a few volumes."' },
                { id: 'B', text: '"Reading was often connected with wealth, education, and private collections."' },
                { id: 'C', text: '"A person who wanted to learn should have the chance to do so."' },
                { id: 'D', text: '"Some critics argued that libraries alone could not solve problems."' },
              ],
              correct_answer: 'C',
            },
          ],
        },

      ], // end passages (RC)
    }, // end Reading Comprehension

    // ── Revising/Editing Part A  Q49–Q53 ─────────────────────────────────────
    // Uses passages[] so the left panel shows the numbered-sentence passage.
    {
      id: 'rev-edit-a',
      type: 'revising_editing_a',
      sectionLabel: 'English Language Arts',
      title: 'REVISING/EDITING PART A',
      directions:
        'Read the passage below and answer the questions that follow. You will be asked to improve the writing quality of the text and to correct errors so that the text follows the conventions of standard written English. You should reread relevant parts of the text, while being mindful of time, before selecting the best answer for each question.',
      passages: [
        {
          id: 're-a-passage-1',
          title: 'The Growth of Public Parks',
          contentType: 'numbered_sentences',
          content:
            '(1) In the late nineteenth century, many cities became crowded and polluted as industries expanded and populations increased.\n' +
            '(2) As a result, reformers began to argue that urban residents needed access to open green spaces.\n' +
            '(3) These parks would provide fresh air, recreation, and a place to escape the crowded city streets.\n' +
            '(4) One of the most influential supporters of public parks was Frederick Law Olmsted, a landscape architect.\n\n' +
            '(5) Olmsted believed that parks should be carefully designed to appear natural rather than artificial.\n' +
            '(6) For example, winding paths, open fields, and scattered trees were used to create the feeling of a peaceful countryside.\n' +
            '(7) However, many city officials initially opposed the construction of large parks.\n' +
            '(8) They argued that the land could be used for housing or businesses instead.\n\n' +
            '(9) Over time, public opinion began to shift as people recognized the benefits of these spaces.\n' +
            '(10) Parks became places where families gathered, children played, and individuals found relief from the demands of city life.\n' +
            '(11) Today, many of the parks created during this period remain important parts of modern cities.',
          questions: [
            {
              id: 're-a-q1', type: 'mcq',
              question: 'Which sentence would be the BEST introduction to the passage?',
              choices: [
                { id: 'A', text: 'Cities are often filled with many different kinds of buildings.' },
                { id: 'B', text: 'During the Industrial Revolution, urban life became increasingly difficult for many people.' },
                { id: 'C', text: 'Public parks are popular places for people to relax today.' },
                { id: 'D', text: 'Many people enjoy spending time outdoors in nature.' },
              ],
              correct_answer: 'B',
            },
            {
              id: 're-a-q2', type: 'mcq',
              question: 'Which sentence BEST shows a reason why reformers supported the creation of parks?',
              choices: [
                { id: 'A', text: 'Sentence 1' },
                { id: 'B', text: 'Sentence 2' },
                { id: 'C', text: 'Sentence 3' },
                { id: 'D', text: 'Sentence 5' },
              ],
              correct_answer: 'C',
            },
            {
              id: 're-a-q3', type: 'mcq',
              question: 'Which transition would BEST replace "However" in sentence 7?',
              choices: [
                { id: 'A', text: 'For example' },
                { id: 'B', text: 'In addition' },
                { id: 'C', text: 'On the other hand' },
                { id: 'D', text: 'Therefore' },
              ],
              correct_answer: 'C',
            },
            {
              id: 're-a-q4', type: 'mcq',
              question: 'Where would the following sentence BEST be placed?\n"These concerns delayed the development of many early parks."',
              choices: [
                { id: 'A', text: 'After sentence 6' },
                { id: 'B', text: 'After sentence 7' },
                { id: 'C', text: 'After sentence 8' },
                { id: 'D', text: 'After sentence 9' },
              ],
              correct_answer: 'C',
            },
            {
              id: 're-a-q5', type: 'mcq',
              question: 'Which revision would BEST improve sentence 10?',
              choices: [
                { id: 'A', text: 'Parks became places where families gathered, and children played, and individuals found relief.' },
                { id: 'B', text: 'Parks became places where families gathered, children played, and individuals found relief from city life.' },
                { id: 'C', text: 'Parks became places where families gathered and played and relief.' },
                { id: 'D', text: 'Parks became places, families gathered children played and individuals relief.' },
              ],
              correct_answer: 'B',
            },
          ],
        },
      ],
    },

    // ── Revising/Editing Part B  Q54–Q57 ─────────────────────────────────────
    // Uses questions[] — centered layout; original sentence is embedded in question text.
    {
      id: 'rev-edit-b',
      type: 'revising_editing_b',
      sectionLabel: 'English Language Arts',
      title: 'REVISING/EDITING PART B',
      directions:
        'Read and answer the following questions. You will be asked to recognize and correct errors so that the sentences or short paragraphs follow the conventions of standard written English. As needed, you may use the notepad tool or write on the scrap paper given to you to take notes. You should reread relevant parts while being mindful of time.',
      questions: [
        {
          id: 're-b-q1', type: 'mcq',
          question: 'Which sentence is written correctly?',
          choices: [
            { id: 'A', text: 'The students, who studied carefully passed the test.' },
            { id: 'B', text: 'The students who studied carefully passed the test.' },
            { id: 'C', text: 'The students who studied, carefully passed the test.' },
            { id: 'D', text: 'The students who studied carefully, passed the test.' },
          ],
          correct_answer: 'B',
        },
        {
          id: 're-b-q2', type: 'mcq',
          question: 'Which revision BEST improves this sentence?\n"The book was very interesting and it had a lot of details in it."',
          choices: [
            { id: 'A', text: 'The book was very interesting, and it had many details.' },
            { id: 'B', text: 'The book was interesting and detailed.' },
            { id: 'C', text: 'The book was very interesting and full of details in it.' },
            { id: 'D', text: 'The book was interesting and had details in it.' },
          ],
          correct_answer: 'B',
        },
        {
          id: 're-b-q3', type: 'mcq',
          question: 'Which sentence uses punctuation correctly?',
          choices: [
            { id: 'A', text: 'After the game we went out to eat, at a restaurant.' },
            { id: 'B', text: 'After the game, we went out to eat at a restaurant.' },
            { id: 'C', text: 'After the game we went out, to eat at a restaurant.' },
            { id: 'D', text: 'After the game we went, out to eat at a restaurant.' },
          ],
          correct_answer: 'B',
        },
        {
          id: 're-b-q4', type: 'mcq',
          question: 'Which revision BEST improves clarity?\n"Running quickly down the street, the backpack was dropped by Maria."',
          choices: [
            { id: 'A', text: 'Running quickly down the street, Maria dropped the backpack.' },
            { id: 'B', text: 'The backpack was running quickly down the street.' },
            { id: 'C', text: 'Maria, running quickly down the street the backpack dropped.' },
            { id: 'D', text: 'Running quickly, the street dropped Maria\'s backpack.' },
          ],
          correct_answer: 'A',
        },
      ],
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
