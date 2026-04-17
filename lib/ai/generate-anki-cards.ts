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
        content: `You are a USMLE Step 1 Anki deck author. You write atomic, high-yield flashcards optimized for spaced repetition. Every card tests exactly ONE fact. Backs are one or two short sentences maximum — never paragraphs. Subject: ${subject}.`,
      },
      {
        role: 'user',
        content: `A student missed the questions below. Extract the testable concepts and write Anki cards for them.

CARD RULES — follow strictly:
- Each card tests EXACTLY ONE concept (atomic)
- Front: short recall prompt — a definition cue, mechanism cue, association cue, or classic-finding cue
- Back: the answer in 1–2 short sentences MAX. No prose. No filler.
- Do NOT copy question wording onto the front
- Do NOT paste explanation paragraphs into the back — compress them
- Do NOT write "In the question..." or "The student..."

SPLITTING RULES:
- If one missed question involves 2–4 distinct testable facts, create 2–4 separate cards
- Each split card must stand alone and test a different fact
- If two different missed questions test the same concept, write ONE card (deduplicate)

CARD TYPE TEMPLATES (use whichever fits):
- Definition: "What is [term]?" → "[term]: [one-line definition]"
- Mechanism: "Mechanism of [drug/process]?" → "[mechanism in one sentence]"
- Association: "Classic finding in [condition]?" → "[finding]"
- Cause/effect: "What causes [effect]?" → "[cause]"
- Distinguishing feature: "[A] vs [B] — key difference?" → "[distinguishing fact]"
- Pharmacology: "MOA / side effect / antidote of [drug]?" → "[answer]"

STYLE:
- Short, punchy, direct
- Use plain language unless a medical term IS the answer
- No bullet lists inside the back field — write it as a tight sentence

Return this exact JSON (no other keys):
{
  "cards": [
    { "front": "...", "back": "..." }
  ]
}

Missed questions:

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
