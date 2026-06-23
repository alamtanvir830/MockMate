import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const OPTION_LETTERS = ['A', 'B', 'C', 'D'] as const

export interface StudyGuideSection {
  heading: string
  contentMarkdown: string
}

export interface StudyGuide {
  title: string
  subtitle: string
  sections: StudyGuideSection[]
}

export interface MissedQuestion {
  question_text: string
  options: string[]
  correct_answer: string
  selected_answer: string | null
  explanation_correct: string | null
  explanation_incorrect: Record<string, string> | null
}

export async function generateStudyGuide(
  questions: MissedQuestion[],
  subject: string,
  examTitle: string,
  language?: string,
): Promise<StudyGuide> {
  if (questions.length === 0) throw new Error('No missed questions provided')

  const questionsText = questions
    .map((q, i) => {
      const optLines = q.options
        .map((opt, idx) => `  ${OPTION_LETTERS[idx]}. ${opt}`)
        .join('\n')
      const correctIdx = q.options.indexOf(q.correct_answer)
      const correctLetter = correctIdx >= 0 ? OPTION_LETTERS[correctIdx] : '?'
      const selectedIdx = q.selected_answer ? q.options.indexOf(q.selected_answer) : -1
      const selectedLetter = selectedIdx >= 0 ? OPTION_LETTERS[selectedIdx] : 'none'

      let text = `Q${i + 1}: ${q.question_text}
Options:
${optLines}
Correct: ${correctLetter}. ${q.correct_answer}
Student answered: ${selectedLetter !== 'none' ? `${selectedLetter}. ${q.selected_answer}` : '(unanswered)'}`

      if (q.explanation_correct) {
        text += `\nWhy correct: ${q.explanation_correct}`
      }
      if (
        q.explanation_incorrect &&
        selectedLetter !== 'none' &&
        q.explanation_incorrect[selectedLetter]
      ) {
        text += `\nWhy student's choice is wrong: ${q.explanation_incorrect[selectedLetter]}`
      }

      return text
    })
    .join('\n\n---\n\n')

  const langInstruction =
    language && language !== 'English'
      ? `Write the entire study guide in ${language}. Preserve technical terms in their original form only if translation would reduce accuracy.\n\n`
      : ''

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    response_format: { type: 'json_object' },
    temperature: 0.4,
    messages: [
      {
        role: 'system',
        content: `You are a master educator and high-yield study guide author for ${subject}. You write clean, in-depth, organized study guides that help students understand — not just memorize. Your style: precise, scannable, clinically grounded. Use **term** syntax to bold key terms, mechanisms, diagnoses, and drugs. Always return valid JSON.`,
      },
      {
        role: 'user',
        content: `${langInstruction}A student missed the questions below on a "${examTitle}" (${subject}) practice exam. Write a focused, in-depth study guide covering ONLY the concepts they missed.

RULES:
- Cover only missed topics. Do not explain what the student already knows.
- Group related missed questions into one section (e.g. all cardiac conditions → one section).
- Each section covers one concept cluster. Include only relevant subsections from: overview, key mechanisms, clinical clues / presentation, diagnosis / approach, management / next step, high-yield differentials, common traps.
- Use **term** to bold key terms, drug names, mechanisms, diseases, signs, and findings.
- Use bullet points (- item) for lists.
- Use markdown tables (| Header | Header |\\n|---|---|\\n| val | val |) for comparisons and differentials when useful — tables must be well-formed.
- Use ## Subheading inside contentMarkdown for subsections within a section.
- No fluff or filler. Be concise but in-depth. Every sentence must be exam-relevant.
- A student should be able to re-read only this guide and answer similar questions confidently.

Return ONLY this JSON (no extra keys, no markdown wrapper):
{
  "title": "...",
  "subtitle": "Focused study guide from missed questions. Focus: mechanisms, clinical clues, diagnosis, management, and high-yield differentials.",
  "sections": [
    {
      "heading": "1. Topic Name",
      "contentMarkdown": "..."
    }
  ]
}

Missed questions:

${questionsText}`,
      },
    ],
  })

  const content = response.choices[0]?.message?.content
  if (!content) throw new Error('OpenAI returned empty response')

  let parsed: StudyGuide
  try {
    parsed = JSON.parse(content)
  } catch {
    throw new Error('OpenAI returned invalid JSON')
  }

  if (!parsed.title || !Array.isArray(parsed.sections) || parsed.sections.length === 0) {
    throw new Error('Invalid study guide structure from AI')
  }

  return parsed
}
