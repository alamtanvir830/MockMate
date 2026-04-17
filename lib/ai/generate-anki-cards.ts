import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const OPTION_LETTERS = ['A', 'B', 'C', 'D'] as const

export interface AnkiCard {
  front: string
  back: string
}

export interface IncorrectQuestion {
  question_text: string
  options: string[]
  correct_answer: string
  selected_answer: string | null
  explanation_correct: string | null
  explanation_incorrect: Record<string, string> | null
}

/**
 * Generates high-yield Anki flashcards from a set of incorrectly-answered questions.
 * Cards are concept-based, not verbatim question copies, and deduplicated across
 * questions that test the same underlying idea.
 */
export async function generateAnkiCards(
  questions: IncorrectQuestion[],
  subject: string,
): Promise<AnkiCard[]> {
  if (questions.length === 0) return []

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
Student chose: ${selectedLetter}. ${q.selected_answer ?? 'no answer'}`

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

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    response_format: { type: 'json_object' },
    temperature: 0.4,
    messages: [
      {
        role: 'system',
        content: `You are an expert educator in ${subject} creating high-yield Anki flashcards from exam mistakes. Cards must be optimized for spaced repetition: concept-based, not question-based, concise, and memorable.`,
      },
      {
        role: 'user',
        content: `Below are questions a student answered incorrectly. Generate Anki flashcards to help them master the underlying concepts.

Rules:
- Front: a clear, direct question that tests recall of the concept (do NOT copy the question verbatim)
- Back: concise explanation — what is correct, why it is correct, and the key misconception to avoid
- If one question covers 2 distinct testable ideas, create 2 separate cards
- If multiple questions test the same concept, create ONE card (deduplicate)
- Keep backs under 4 sentences; use mechanism-based language for science/medical topics
- Do not use phrases like "In the question..." or "The student chose..."

Return this exact JSON:
{
  "cards": [
    { "front": "...", "back": "..." }
  ]
}

Questions:

${questionsText}`,
      },
    ],
  })

  const content = response.choices[0]?.message?.content
  if (!content) throw new Error('OpenAI returned empty response')

  let parsed: { cards: AnkiCard[] }
  try {
    parsed = JSON.parse(content)
  } catch {
    throw new Error('OpenAI returned invalid JSON')
  }

  if (!Array.isArray(parsed.cards)) throw new Error('Unexpected response structure from OpenAI')

  return parsed.cards.filter(
    (c) =>
      typeof c.front === 'string' &&
      c.front.trim().length > 0 &&
      typeof c.back === 'string' &&
      c.back.trim().length > 0,
  )
}
