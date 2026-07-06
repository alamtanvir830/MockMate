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

export interface SHSATGridInQuestion {
  id: string
  type: 'grid_in'
  question: string
  correct_answer: string  // numeric string, e.g. "56" or "1/5"
}

export type SHSATQuestion =
  | SHSATMCQQuestion
  | SHSATMultiSelectQuestion
  | SHSATMatchQuestion
  | SHSATGridInQuestion

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

        // ── Passage 1  (Q1–Q7)  Snowy Mountains (original poem) ───────────
        {
          id: 'passage-1',
          title: 'Snowy Mountains',
          contentType: 'poem',
          content: '',
          lines: [
            { num: 1,  text: 'The peaks stand crowned in white, untouched and free,' },
            { num: 2,  text: 'Their solemn glaciers gleaming cold and bright,' },
            { num: 3,  text: 'Where no road breaks the silence of the height' },
            { num: 4,  text: 'And eagles wheel in slow majestic flight.' },
            { num: 5,  text: 'The snowfields slope to valleys hushed in green,' },
            { num: 6,  text: 'Where hidden streams run clear through mountain air,' },
            { num: 7,  text: 'A world unmarked by hammer, saw, or spade.' },
            { num: 0,  text: '' },
            { num: 8,  text: 'Below, the grey road slices through the plain,' },
            { num: 9,  text: 'And telephone poles stride in rigid rows,' },
            { num: 10, text: 'And wooden fences mark what no man knows' },
            { num: 11, text: 'Can long be held against the hillside\'s face.' },
            { num: 12, text: 'The crumbling wall creeps up the eastern slope,' },
            { num: 13, text: 'As if to cage the wind and fence the snow,' },
            { num: 14, text: 'While billboards flash their colors to the road.' },
            { num: 0,  text: '' },
            { num: 15, text: 'Yet still the peaks rise white above man\'s stir,' },
            { num: 16, text: 'The summit speaks what no voice can restrain,' },
            { num: 17, text: 'What no deed signed by mortal hand can own.' },
            { num: 18, text: 'The ridge runs free beneath an open sky—' },
            { num: 19, text: 'No smoke, no wire, no mark of any claim' },
            { num: 20, text: 'Can dim the light that falls on each cold face,' },
            { num: 21, text: 'Nor silence what the mountain silence says.' },
            { num: 22, text: 'Here beauty needs no name to make it true.' },
          ],
          questions: [
            {
              id: 'p1q1', type: 'mcq',
              question: 'Which statement best expresses the central idea of the first stanza (lines 1–7)?',
              choices: [
                { id: 'A', text: 'The mountains are difficult to climb and dangerous for travelers.' },
                { id: 'B', text: 'Human development has significantly changed the appearance of the mountain peaks.' },
                { id: 'C', text: 'The mountains are portrayed as majestic and untouched by human activity.' },
                { id: 'D', text: 'Eagles and other wildlife are threatened by the mountain environment.' },
              ],
              correct_answer: 'C',
            },
            {
              id: 'p1q2', type: 'mcq',
              question: 'Which detail from the poem best supports the idea that the natural world in stanza 1 is free from human presence?',
              choices: [
                { id: 'A', text: '"Their solemn glaciers gleaming cold and bright" (line 2)' },
                { id: 'B', text: '"Where no road breaks the silence of the height" (line 3)' },
                { id: 'C', text: '"The snowfields slope to valleys hushed in green" (line 5)' },
                { id: 'D', text: '"Where hidden streams run clear through mountain air" (line 6)' },
              ],
              correct_answer: 'B',
            },
            {
              id: 'p1q3', type: 'mcq',
              question: 'As used in line 9, the phrase "telephone poles stride in rigid rows" most nearly suggests that the poles are —',
              choices: [
                { id: 'A', text: 'moving quickly across the landscape' },
                { id: 'B', text: 'standing tall to provide better phone service' },
                { id: 'C', text: 'arranged in an unnatural, mechanical way that contrasts with the surroundings' },
                { id: 'D', text: 'old and beginning to lean after years of weather' },
              ],
              correct_answer: 'C',
            },
            {
              id: 'p1q4', type: 'multi_select',
              question: 'In which two ways does the poet develop the speaker\'s point of view in the second stanza (lines 8–14)?\n\nSelect the TWO correct answers.',
              selectCount: 2,
              choices: [
                { id: 'A', text: 'by describing how human structures divide or confine the natural landscape' },
                { id: 'B', text: 'by praising the roads and fences for making the mountains more accessible' },
                { id: 'C', text: 'by comparing the mountains in summer to the mountains in winter' },
                { id: 'D', text: 'by suggesting that human-made objects look out of place against the natural world' },
                { id: 'E', text: 'by arguing that modern technology has improved life in mountain communities' },
              ],
              correct_answers: ['A', 'D'],
            },
            {
              id: 'p1q5', type: 'mcq',
              question: 'What do lines 21–22 ("Nor silence what the mountain silence says. / Here beauty needs no name to make it true.") most likely suggest?',
              choices: [
                { id: 'A', text: 'The mountain is completely silent and has no visitors.' },
                { id: 'B', text: 'The natural beauty of the mountains is self-evident and requires no explanation or label.' },
                { id: 'C', text: 'Humans can eventually silence the natural world if they try hard enough.' },
                { id: 'D', text: 'The mountain has a name that has been forgotten over time.' },
              ],
              correct_answer: 'B',
            },
            {
              id: 'p1q6', type: 'mcq',
              question: 'What concern does the speaker most likely express through the poem?',
              choices: [
                { id: 'A', text: 'That mountain trails need to be better maintained for hikers.' },
                { id: 'B', text: 'That human-made structures diminish the natural grandeur of the mountains.' },
                { id: 'C', text: 'That eagles and wildlife are no longer found near mountain peaks.' },
                { id: 'D', text: 'That billboards and roads help bring visitors to appreciate nature.' },
              ],
              correct_answer: 'B',
            },
            {
              id: 'p1q7', type: 'match',
              question: 'Read the following lines from the poem. Assign each line to the category that best describes what it represents.\n\nDrag each line to the correct box.',
              items: [
                { id: '1', text: '"The peaks stand crowned in white, untouched and free"' },
                { id: '2', text: '"telephone poles stride in rigid rows"' },
                { id: '3', text: '"hidden streams run clear through mountain air"' },
                { id: '4', text: '"billboards flash their colors to the road"' },
                { id: '5', text: '"The ridge runs free beneath an open sky"' },
              ],
              categories: [
                { id: 'natural', label: 'Nature\'s Presence' },
                { id: 'human',   label: 'Human Intrusion' },
              ],
              correct_matches: {
                '1': 'natural',
                '2': 'human',
                '3': 'natural',
                '4': 'human',
                '5': 'natural',
              },
            },
          ],
        },

        // ── Passage 2  (Q8–Q16)  The Intelligence of Crows ───────────────────
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
          ],
        },

        // ── Passage 3  (Q17–Q25)  The Railway Children ─────────────────────
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
          ],
        },

        // ── Passage 4  (Q26–Q34)  The Growth of the Great Libraries ────────
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
          ],
        },

      ], // end passages (RC)
    }, // end Reading Comprehension

    // ── Revising/Editing Part A  Q35–Q42 ─────────────────────────────────────
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
            {
              id: 're-a-q6', type: 'mcq',
              question: 'Read the following sentence:\n"His design principles would later influence park planners in cities across the country."\nWhere would this sentence BEST be placed in the passage?',
              choices: [
                { id: 'A', text: 'After sentence 3' },
                { id: 'B', text: 'After sentence 4' },
                { id: 'C', text: 'After sentence 6' },
                { id: 'D', text: 'After sentence 9' },
              ],
              correct_answer: 'C',
            },
            {
              id: 're-a-q7', type: 'mcq',
              question: 'Which sentence, if added after sentence 8, would BEST support the idea that opposition to parks was partly based on economic concerns?',
              choices: [
                { id: 'A', text: 'City planners at the time were more focused on building roads than on beautifying neighborhoods.' },
                { id: 'B', text: 'Developers calculated that a single block of parkland could generate far more tax revenue if used for commercial buildings.' },
                { id: 'C', text: 'Some residents preferred the convenience of having stores nearby over having a park.' },
                { id: 'D', text: 'Olmsted himself struggled to convince city councils of the value of his designs.' },
              ],
              correct_answer: 'B',
            },
            {
              id: 're-a-q8', type: 'mcq',
              question: 'Which sentence would BEST conclude the passage if added after sentence 11?',
              choices: [
                { id: 'A', text: 'Olmsted was born in Connecticut in 1822 and studied farming before turning to landscape architecture.' },
                { id: 'B', text: 'The movement to create public parks ultimately demonstrated that designing accessible green spaces could improve the quality of city life for everyone.' },
                { id: 'C', text: 'Today, city parks often include swimming pools, sports courts, and outdoor concert venues.' },
                { id: 'D', text: 'Frederick Law Olmsted\'s most famous project was Central Park, completed in New York City in 1876.' },
              ],
              correct_answer: 'B',
            },
          ],
        },
      ],
    },

    // ── Revising/Editing Part B  Q43–Q50 ─────────────────────────────────────
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
        {
          id: 're-b-q5', type: 'mcq',
          question: 'Which sentence contains a subject-verb agreement error?',
          choices: [
            { id: 'A', text: 'The results of the study were surprising to everyone involved.' },
            { id: 'B', text: 'Each of the students submits their own report independently.' },
            { id: 'C', text: 'The committee meets every Tuesday to discuss new proposals.' },
            { id: 'D', text: 'Neither the manager nor the employees was available for comment.' },
          ],
          correct_answer: 'D',
        },
        {
          id: 're-b-q6', type: 'mcq',
          question: 'Which word correctly completes the sentence?\n"The decision to close the school will greatly _____ students who rely on its after-school programs."',
          choices: [
            { id: 'A', text: 'effect' },
            { id: 'B', text: 'affects' },
            { id: 'C', text: 'effecting' },
            { id: 'D', text: 'affect' },
          ],
          correct_answer: 'D',
        },
        {
          id: 're-b-q7', type: 'mcq',
          question: 'Which revision BEST creates parallel structure in the following sentence?\n"Volunteers at the shelter were responsible for feeding the animals, to clean the kennels, and doing paperwork."',
          choices: [
            { id: 'A', text: 'Volunteers at the shelter were responsible for feeding the animals, cleaning the kennels, and doing paperwork.' },
            { id: 'B', text: 'Volunteers at the shelter were responsible to feed the animals, clean the kennels, and do paperwork.' },
            { id: 'C', text: 'Volunteers at the shelter were responsible for feeding the animals, cleaning the kennels, and to do paperwork.' },
            { id: 'D', text: 'Volunteers at the shelter fed the animals, they cleaned kennels, and did paperwork.' },
          ],
          correct_answer: 'A',
        },
        {
          id: 're-b-q8', type: 'mcq',
          question: 'Which transition word BEST fills in the blank?\n"Jayla had studied for weeks before the final exam. _____, she found several questions unexpectedly difficult."',
          choices: [
            { id: 'A', text: 'Therefore' },
            { id: 'B', text: 'Meanwhile' },
            { id: 'C', text: 'Nevertheless' },
            { id: 'D', text: 'Furthermore' },
          ],
          correct_answer: 'C',
        },
      ],
    },

    // ── Mathematics  Q51–Q100 ─────────────────────────────────────────────────
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
      questions: [

        // ── Easy  Q51–Q57 ──────────────────────────────────────────────────
        {
          id: 'math-q1', type: 'mcq',
          question: 'What is 36 ÷ 6 × 2?',
          choices: [
            { id: 'A', text: '3' },
            { id: 'B', text: '6' },
            { id: 'C', text: '12' },
            { id: 'D', text: '18' },
          ],
          correct_answer: 'C',
        },
        {
          id: 'math-q2', type: 'mcq',
          question: 'What is 3/4 + 1/2?',
          choices: [
            { id: 'A', text: '5/6' },
            { id: 'B', text: '1' },
            { id: 'C', text: '1 1/4' },
            { id: 'D', text: '1 1/2' },
          ],
          correct_answer: 'C',
        },
        {
          id: 'math-q3', type: 'mcq',
          question: 'What is 25% of 80?',
          choices: [
            { id: 'A', text: '10' },
            { id: 'B', text: '15' },
            { id: 'C', text: '20' },
            { id: 'D', text: '25' },
          ],
          correct_answer: 'C',
        },
        {
          id: 'math-q4', type: 'mcq',
          question: 'A number is increased by 8 to get 15. What is the number?',
          choices: [
            { id: 'A', text: '5' },
            { id: 'B', text: '6' },
            { id: 'C', text: '7' },
            { id: 'D', text: '8' },
          ],
          correct_answer: 'C',
        },
        {
          id: 'math-q5', type: 'mcq',
          question: 'What is the value of 5² − 9?',
          choices: [
            { id: 'A', text: '11' },
            { id: 'B', text: '16' },
            { id: 'C', text: '21' },
            { id: 'D', text: '25' },
          ],
          correct_answer: 'B',
        },
        {
          id: 'math-q6', type: 'mcq',
          question: 'Which is equivalent to 2(3 + 4)?',
          choices: [
            { id: 'A', text: '10' },
            { id: 'B', text: '12' },
            { id: 'C', text: '14' },
            { id: 'D', text: '24' },
          ],
          correct_answer: 'C',
        },
        {
          id: 'math-q7', type: 'mcq',
          question: 'What is the perimeter of a rectangle with length 6 and width 4?',
          choices: [
            { id: 'A', text: '10' },
            { id: 'B', text: '20' },
            { id: 'C', text: '24' },
            { id: 'D', text: '48' },
          ],
          correct_answer: 'B',
        },

        // ── Medium  Q71–Q90 ────────────────────────────────────────────────
        {
          id: 'math-q14', type: 'mcq',
          question: 'A shirt costs $20 and is on sale for 25% off. What is the sale price?',
          choices: [
            { id: 'A', text: '$5' },
            { id: 'B', text: '$10' },
            { id: 'C', text: '$15' },
            { id: 'D', text: '$18' },
          ],
          correct_answer: 'C',
        },
        {
          id: 'math-q15', type: 'mcq',
          question: 'A ratio of boys to girls is 3:2. If there are 15 boys, how many girls are there?',
          choices: [
            { id: 'A', text: '8' },
            { id: 'B', text: '10' },
            { id: 'C', text: '12' },
            { id: 'D', text: '15' },
          ],
          correct_answer: 'B',
        },
        {
          id: 'math-q16', type: 'mcq',
          question: 'Solve: 2x + 5 = 17',
          choices: [
            { id: 'A', text: '5' },
            { id: 'B', text: '6' },
            { id: 'C', text: '7' },
            { id: 'D', text: '8' },
          ],
          correct_answer: 'B',
        },
        {
          id: 'math-q17', type: 'mcq',
          question: 'A train travels 60 miles in 2 hours. What is its speed in miles per hour?',
          choices: [
            { id: 'A', text: '20' },
            { id: 'B', text: '30' },
            { id: 'C', text: '40' },
            { id: 'D', text: '60' },
          ],
          correct_answer: 'B',
        },
        { id: 'math-q18', type: 'grid_in', question: 'What is 40% of 90?',  correct_answer: '36' },
        {
          id: 'math-q19', type: 'mcq',
          question: 'A rectangle has an area of 48 and a width of 6. What is its length?',
          choices: [
            { id: 'A', text: '6' },
            { id: 'B', text: '8' },
            { id: 'C', text: '10' },
            { id: 'D', text: '12' },
          ],
          correct_answer: 'B',
        },
        {
          id: 'math-q20', type: 'mcq',
          question: 'If x = 4, what is the value of 3x²?',
          choices: [
            { id: 'A', text: '24' },
            { id: 'B', text: '36' },
            { id: 'C', text: '48' },
            { id: 'D', text: '64' },
          ],
          correct_answer: 'C',
        },
        {
          id: 'math-q21', type: 'mcq',
          question: 'What is the mean of 4, 6, 8, and 10?',
          choices: [
            { id: 'A', text: '6' },
            { id: 'B', text: '7' },
            { id: 'C', text: '8' },
            { id: 'D', text: '9' },
          ],
          correct_answer: 'B',
        },
        { id: 'math-q22', type: 'grid_in', question: 'What is 15% of 200?', correct_answer: '30' },
        {
          id: 'math-q23', type: 'mcq',
          question: 'A number is decreased by 20% to become 80. What was the original number?',
          choices: [
            { id: 'A', text: '90' },
            { id: 'B', text: '100' },
            { id: 'C', text: '120' },
            { id: 'D', text: '140' },
          ],
          correct_answer: 'B',
        },
        {
          id: 'math-q24', type: 'mcq',
          question: 'A car travels at 45 miles per hour. How far does it travel in 4 hours?',
          choices: [
            { id: 'A', text: '160 miles' },
            { id: 'B', text: '170 miles' },
            { id: 'C', text: '180 miles' },
            { id: 'D', text: '190 miles' },
          ],
          correct_answer: 'C',
        },
        {
          id: 'math-q25', type: 'mcq',
          question: 'A jacket originally costs $80. After a 25% discount, what is the sale price?',
          choices: [
            { id: 'A', text: '$55' },
            { id: 'B', text: '$60' },
            { id: 'C', text: '$65' },
            { id: 'D', text: '$70' },
          ],
          correct_answer: 'B',
        },
        { id: 'math-q26', type: 'grid_in',
          question: 'A rectangle has a perimeter of 26. One side has a length of 8. What is the length of the other side?',
          correct_answer: '5' },
        {
          id: 'math-q27', type: 'mcq',
          question: 'If 3 workers can complete a job in 12 days, how many days would 4 workers take to complete the same job at the same rate?',
          choices: [
            { id: 'A', text: '7' },
            { id: 'B', text: '8' },
            { id: 'C', text: '9' },
            { id: 'D', text: '10' },
          ],
          correct_answer: 'C',
        },
        {
          id: 'math-q28', type: 'mcq',
          question: 'The average of 5 numbers is 10. Four of the numbers are 7, 9, 12, and 14. What is the fifth number?',
          choices: [
            { id: 'A', text: '6' },
            { id: 'B', text: '7' },
            { id: 'C', text: '8' },
            { id: 'D', text: '9' },
          ],
          correct_answer: 'C',
        },
        {
          id: 'math-q29', type: 'mcq',
          question: 'Which of the following fractions is the greatest?',
          choices: [
            { id: 'A', text: '5/8' },
            { id: 'B', text: '3/5' },
            { id: 'C', text: '7/12' },
            { id: 'D', text: '2/3' },
          ],
          correct_answer: 'D',
        },
        { id: 'math-q30', type: 'grid_in', question: 'Solve for x: 2x − 3 = 7', correct_answer: '5' },
        {
          id: 'math-q31', type: 'mcq',
          question: 'A store buys a shirt for $40 and marks it up 40%. What is the selling price?',
          choices: [
            { id: 'A', text: '$44' },
            { id: 'B', text: '$52' },
            { id: 'C', text: '$56' },
            { id: 'D', text: '$64' },
          ],
          correct_answer: 'C',
        },
        {
          id: 'math-q32', type: 'mcq',
          question: 'The sum of two numbers is 45 and their difference is 11. What is the larger number?',
          choices: [
            { id: 'A', text: '24' },
            { id: 'B', text: '26' },
            { id: 'C', text: '27' },
            { id: 'D', text: '28' },
          ],
          correct_answer: 'D',
        },
        { id: 'math-q33', type: 'grid_in',
          question: 'What is the sum of the interior angles of a triangle, in degrees?',
          correct_answer: '180' },

        // ── Hard  Q91–Q105 ─────────────────────────────────────────────────
        {
          id: 'math-q34', type: 'mcq',
          question: 'What is the value of x in 3x − 7 = 2x + 5?',
          choices: [
            { id: 'A', text: '10' },
            { id: 'B', text: '11' },
            { id: 'C', text: '12' },
            { id: 'D', text: '13' },
          ],
          correct_answer: 'C',
        },
        {
          id: 'math-q35', type: 'mcq',
          question: 'The sum of three consecutive integers is 45. What is the largest of the three?',
          choices: [
            { id: 'A', text: '14' },
            { id: 'B', text: '15' },
            { id: 'C', text: '16' },
            { id: 'D', text: '17' },
          ],
          correct_answer: 'C',
        },
        {
          id: 'math-q36', type: 'mcq',
          question: 'A triangle has sides of length 5, 12, and 13. What type of triangle is it?',
          choices: [
            { id: 'A', text: 'Acute' },
            { id: 'B', text: 'Obtuse' },
            { id: 'C', text: 'Right' },
            { id: 'D', text: 'Equilateral' },
          ],
          correct_answer: 'C',
        },
        { id: 'math-q37', type: 'grid_in', question: 'What is 7³?', correct_answer: '343' },
        {
          id: 'math-q38', type: 'mcq',
          question: 'A bag has 3 red, 2 blue, and 5 green marbles. What is the probability of randomly selecting a blue marble?',
          choices: [
            { id: 'A', text: '1/10' },
            { id: 'B', text: '1/5' },
            { id: 'C', text: '2/5' },
            { id: 'D', text: '3/10' },
          ],
          correct_answer: 'B',
        },
        {
          id: 'math-q39', type: 'mcq',
          question: 'A number is increased by 50%, then the result is decreased by 50%. How does the final value compare to the original?',
          choices: [
            { id: 'A', text: 'It is the same.' },
            { id: 'B', text: 'It is greater.' },
            { id: 'C', text: 'It is smaller.' },
            { id: 'D', text: 'It cannot be determined.' },
          ],
          correct_answer: 'C',
        },
        {
          id: 'math-q40', type: 'mcq',
          question: 'Two angles of a triangle are 55° and 70°. What is the measure of the third angle?',
          choices: [
            { id: 'A', text: '45°' },
            { id: 'B', text: '50°' },
            { id: 'C', text: '55°' },
            { id: 'D', text: '60°' },
          ],
          correct_answer: 'C',
        },
        { id: 'math-q41', type: 'grid_in',
          question: 'What is the value of 3(x + 4) when x = 2?',
          correct_answer: '18' },
        {
          id: 'math-q42', type: 'mcq',
          question: 'A rectangle has a perimeter of 36 and a length of 10. What is its area?',
          choices: [
            { id: 'A', text: '60' },
            { id: 'B', text: '70' },
            { id: 'C', text: '80' },
            { id: 'D', text: '90' },
          ],
          correct_answer: 'C',
        },
        {
          id: 'math-q43', type: 'mcq',
          question: 'If a number is increased by 5 and the result is multiplied by 3, the answer is 30. What is the number?',
          choices: [
            { id: 'A', text: '4' },
            { id: 'B', text: '5' },
            { id: 'C', text: '7' },
            { id: 'D', text: '10' },
          ],
          correct_answer: 'B',
        },
        {
          id: 'math-q44', type: 'mcq',
          question: 'A jar contains 3 red and 7 white marbles. What is the probability of NOT drawing a red marble?',
          choices: [
            { id: 'A', text: '3/10' },
            { id: 'B', text: '7/10' },
            { id: 'C', text: '3/7' },
            { id: 'D', text: '4/5' },
          ],
          correct_answer: 'B',
        },
        { id: 'math-q45', type: 'grid_in',
          question: 'What is the value of |−15| + |−9|?',
          correct_answer: '24' },
        {
          id: 'math-q46', type: 'mcq',
          question: 'Angles A and B are supplementary. Angle A is three times angle B. What is the measure of angle A?',
          choices: [
            { id: 'A', text: '45°' },
            { id: 'B', text: '90°' },
            { id: 'C', text: '120°' },
            { id: 'D', text: '135°' },
          ],
          correct_answer: 'D',
        },
        { id: 'math-q48', type: 'grid_in',
          question: 'What is the least common multiple (LCM) of 6 and 8?',
          correct_answer: '24' },

        // ── Very Hard  Q106–Q114 ───────────────────────────────────────────
        {
          id: 'math-q49', type: 'mcq',
          question: 'A number is doubled, then 10 is added, resulting in 50. What is the number?',
          choices: [
            { id: 'A', text: '15' },
            { id: 'B', text: '20' },
            { id: 'C', text: '25' },
            { id: 'D', text: '30' },
          ],
          correct_answer: 'B',
        },
        { id: 'math-q50', type: 'grid_in', question: 'Solve for x: 4x = 3x + 9', correct_answer: '9' },
        {
          id: 'math-q51', type: 'mcq',
          question: 'A square has an area of 49. What is its perimeter?',
          choices: [
            { id: 'A', text: '14' },
            { id: 'B', text: '21' },
            { id: 'C', text: '28' },
            { id: 'D', text: '49' },
          ],
          correct_answer: 'C',
        },
        {
          id: 'math-q52', type: 'mcq',
          question: 'If 3 pencils cost $1.50, how much do 10 pencils cost?',
          choices: [
            { id: 'A', text: '$4.00' },
            { id: 'B', text: '$5.00' },
            { id: 'C', text: '$6.00' },
            { id: 'D', text: '$7.00' },
          ],
          correct_answer: 'B',
        },
        { id: 'math-q53', type: 'grid_in', question: 'What is 2³ × 3²?', correct_answer: '72' },
        {
          id: 'math-q54', type: 'mcq',
          question: 'A number is 20% greater than 50. What is it?',
          choices: [
            { id: 'A', text: '55' },
            { id: 'B', text: '60' },
            { id: 'C', text: '65' },
            { id: 'D', text: '70' },
          ],
          correct_answer: 'B',
        },
        {
          id: 'math-q55', type: 'mcq',
          question: 'A rectangle\'s length is twice its width. If its area is 72, what is the width?',
          choices: [
            { id: 'A', text: '4' },
            { id: 'B', text: '6' },
            { id: 'C', text: '8' },
            { id: 'D', text: '12' },
          ],
          correct_answer: 'B',
        },
        { id: 'math-q56', type: 'grid_in', question: 'Solve for x: x/5 = 12', correct_answer: '60' },
        { id: 'math-q57', type: 'grid_in', question: 'What is 100 − (3 × 7)?', correct_answer: '79' },
      ],
    },

  ], // end subsections
}
