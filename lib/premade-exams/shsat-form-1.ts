/**
 * SHSAT Practice Test A — Form 1
 *
 * DATA STRUCTURE:
 *   SHSATForm
 *     └─ sections[]
 *          └─ passages[]
 *               ├─ title, author?, content (paragraphs separated by \n\n)
 *               └─ questions[]
 *                    ├─ type: 'mcq'
 *                    ├─ question
 *                    ├─ choices: [{ id: 'A'|'B'|'C'|'D', text }] × 4
 *                    └─ correct_answer: 'A'|'B'|'C'|'D'
 *
 * Question numbers (1-based) are auto-derived from position — do NOT
 * hard-code them here. passageQStart / passageQEnd are computed at
 * runtime in PremadeExamTaker.tsx.
 *
 * HOW TO ADD FORM 2:
 *   1. Create lib/premade-exams/shsat-form-2.ts — copy this file's
 *      structure, change id/title, fill in your passages and questions.
 *   2. Import shsatForm2 in app/(dashboard)/premade/shsat/page.tsx and
 *      activate the Form 2 card (link to /premade/shsat/form-2).
 *   3. Create app/(dashboard)/premade/shsat/form-2/page.tsx — identical
 *      to form-1/page.tsx but import shsatForm2.
 */

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

export type SHSATQuestion = SHSATMCQQuestion

export interface SHSATPassage {
  id: string
  title: string
  author?: string
  content: string // paragraphs separated by \n\n
  questions: SHSATQuestion[]
}

export interface SHSATSection {
  id: string
  number: number // shown in breadcrumb: "SECTION 2"
  title: string
  passages: SHSATPassage[]
}

export interface SHSATForm {
  id: string
  title: string       // shown in top breadcrumb
  description: string
  timeLimitMinutes: number
  sections: SHSATSection[]
}

// ─────────────────────────────────────────────────────────────────────────────

export const shsatForm1: SHSATForm = {
  id: 'shsat-form-1',
  title: 'SHSAT PRACTICE TEST A - 2025',
  description: 'Specialized High Schools Admissions Test — Practice Form 1',
  timeLimitMinutes: 180,

  sections: [
    {
      id: 'section-2-ela',
      number: 2,
      title: 'English Language Arts',
      passages: [

        // ── Passage 1  (Questions 1–8) ────────────────────────────────────
        {
          id: 'passage-1',
          title: 'Passage 1',
          content:
            'Squire Hawkins sat outside his worn-down cabin, quietly observing the morning. The town around him was scattered and poor, with little sign of growth or progress. Though the air was calm and filled with the sounds of nature, there was also a stillness that felt almost lifeless. The houses were spread apart, and the people seemed to move slowly, without urgency or ambition.\n\n' +
            'The arrival of the mail was one of the few events that gathered the townspeople together. Even when there was only a single letter, they stood around talking idly, as if there were nothing else to occupy their time. Their conversations drifted without purpose, and their actions suggested a lack of direction.\n\n' +
            'Hawkins had lived there for years, but he had begun to feel restless. Nothing ever seemed to change. The same routines repeated, and no one appeared to expect anything better. He compared his present life to the past, when he had been more energetic and hopeful. The difference troubled him deeply.\n\n' +
            'At last, he made a decision. He would leave. Somewhere beyond this place, he believed, there must be opportunity. Even if the future was uncertain, it seemed better than remaining where he was. Staying, he thought, would slowly wear him down.',

          questions: [
            {
              id: 'p1q1',
              type: 'mcq',
              question: 'Which statement best expresses the main idea of the passage?',
              choices: [
                { id: 'A', text: 'Life in Obedstown is exciting.' },
                { id: 'B', text: 'Hawkins enjoys his environment.' },
                { id: 'C', text: 'Hawkins feels trapped in a stagnant town.' },
                { id: 'D', text: 'The town is growing rapidly.' },
              ],
              correct_answer: 'C',
            },
            {
              id: 'p1q2',
              type: 'mcq',
              question: 'Which detail best supports the idea that the town lacks purpose?',
              choices: [
                { id: 'A', text: 'The morning is calm.' },
                { id: 'B', text: 'People gather around one letter.' },
                { id: 'C', text: 'Hawkins sits outside.' },
                { id: 'D', text: 'Houses are far apart.' },
              ],
              correct_answer: 'B',
            },
            {
              id: 'p1q3',
              type: 'mcq',
              question: 'As used in the passage, "stagnant" most nearly means',
              choices: [
                { id: 'A', text: 'active.' },
                { id: 'B', text: 'unchanging.' },
                { id: 'C', text: 'dangerous.' },
                { id: 'D', text: 'confusing.' },
              ],
              correct_answer: 'B',
            },
            {
              id: 'p1q4',
              type: 'mcq',
              question: 'Hawkins decides to leave mainly because he',
              choices: [
                { id: 'A', text: 'is forced to.' },
                { id: 'B', text: 'wants to explore.' },
                { id: 'C', text: 'sees no opportunity.' },
                { id: 'D', text: 'dislikes his neighbors.' },
              ],
              correct_answer: 'C',
            },
            {
              id: 'p1q5',
              type: 'mcq',
              question: 'Which word best describes the tone of the passage?',
              choices: [
                { id: 'A', text: 'Excited' },
                { id: 'B', text: 'Humorous' },
                { id: 'C', text: 'Reflective and critical' },
                { id: 'D', text: 'Joyful' },
              ],
              correct_answer: 'C',
            },
            {
              id: 'p1q6',
              type: 'mcq',
              question: 'What can the reader infer Hawkins fears?',
              choices: [
                { id: 'A', text: 'Traveling alone' },
                { id: 'B', text: 'Failure' },
                { id: 'C', text: 'Becoming like the townspeople' },
                { id: 'D', text: 'Losing money' },
              ],
              correct_answer: 'C',
            },
            {
              id: 'p1q7',
              type: 'mcq',
              question: 'Why does the author include the detail about the mail?',
              choices: [
                { id: 'A', text: 'To show the importance of communication' },
                { id: 'B', text: 'To show the lack of activity in the town' },
                { id: 'C', text: 'To introduce a conflict' },
                { id: 'D', text: 'To describe Hawkins\' job' },
              ],
              correct_answer: 'B',
            },
            {
              id: 'p1q8',
              type: 'mcq',
              question: 'Which sentence best supports Hawkins\' dissatisfaction?',
              choices: [
                { id: 'A', text: 'The air was calm.' },
                { id: 'B', text: 'Nothing ever changed.' },
                { id: 'C', text: 'The houses were scattered.' },
                { id: 'D', text: 'The people gathered.' },
              ],
              correct_answer: 'B',
            },
          ],
        },

        // ── Passage 2  (Questions 9–16) ───────────────────────────────────
        {
          id: 'passage-2',
          title: 'Passage 2',
          content:
            'Hawkins explained to his wife that their land would one day become extremely valuable. Though it was nearly worthless now, he believed that future developments would transform it. He spoke of railroads and steamboats bringing people and trade into the region. What seemed empty now, he insisted, would one day be filled with opportunity.\n\n' +
            'He described resources hidden within the land — coal, iron, and copper — materials that others overlooked. To him, these were signs of future wealth. While others saw nothing, he saw potential.\n\n' +
            'His excitement grew as he spoke, imagining a future where their children would live in comfort and success. Though he admitted they might never see this change themselves, he believed firmly that it would come.',

          questions: [
            {
              id: 'p2q1',
              type: 'mcq',
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
              id: 'p2q2',
              type: 'mcq',
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
              id: 'p2q3',
              type: 'mcq',
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
              id: 'p2q4',
              type: 'mcq',
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
              id: 'p2q5',
              type: 'mcq',
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
              id: 'p2q6',
              type: 'mcq',
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
              id: 'p2q7',
              type: 'mcq',
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
              id: 'p2q8',
              type: 'mcq',
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

        // ── Passage 3  (Questions 17–24) ──────────────────────────────────
        {
          id: 'passage-3',
          title: 'Passage 3',
          content:
            'Nancy listened to her husband\'s plans but remained uncertain. She remembered previous attempts to build wealth that had failed. Each time, hope had been followed by disappointment.\n\n' +
            'She did not doubt his intentions, but she questioned the outcome. Experience had taught her that not every idea leads to success. Though she supported him, she could not ignore what had happened before.',

          questions: [
            {
              id: 'p3q1',
              type: 'mcq',
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
              id: 'p3q2',
              type: 'mcq',
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
              id: 'p3q3',
              type: 'mcq',
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
              id: 'p3q4',
              type: 'mcq',
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
              id: 'p3q5',
              type: 'mcq',
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
              id: 'p3q6',
              type: 'mcq',
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
              id: 'p3q7',
              type: 'mcq',
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
              id: 'p3q8',
              type: 'mcq',
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

        // ── Passage 4  (Questions 25–32) ──────────────────────────────────
        {
          id: 'passage-4',
          title: 'Passage 4',
          content:
            'Clay stood silently beside his mother\'s coffin, expressing his grief through quiet actions. He placed flowers gently and touched her face, showing love without words. His sorrow was deep, yet controlled.\n\n' +
            'Those around him watched with sympathy. Though he did not speak, his actions revealed everything. The loss had left him alone, without family or support.',

          questions: [
            {
              id: 'p4q1',
              type: 'mcq',
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
              id: 'p4q2',
              type: 'mcq',
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
              id: 'p4q3',
              type: 'mcq',
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
              id: 'p4q4',
              type: 'mcq',
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
              id: 'p4q5',
              type: 'mcq',
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
              id: 'p4q6',
              type: 'mcq',
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
              id: 'p4q7',
              type: 'mcq',
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
              id: 'p4q8',
              type: 'mcq',
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

      ], // end passages
    },   // end section 2
  ],     // end sections
}
