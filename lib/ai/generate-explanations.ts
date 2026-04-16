import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const OPTION_LETTERS = ['A', 'B', 'C', 'D'] as const

export interface QuestionExplanation {
  question_id: string
  explanation_correct: string
  explanation_incorrect: Record<string, string>
}

/**
 * Generates explanations for a batch of questions that are missing them.
 * Used when viewing results for exams created before explanations were introduced.
 * All questions should belong to the same exam/subject for consistent framing.
 */
export async function generateExplanations(
  questions: {
    id: string
    question_text: string
    options: string[]
    correct_answer: string
  }[],
  subject: string,
): Promise<QuestionExplanation[]> {
  if (questions.length === 0) return []

  const questionsText = questions
    .map((q, i) => {
      const optLines = q.options
        .map((opt, idx) => `  ${OPTION_LETTERS[idx]}. ${opt}`)
        .join('\n')
      const correctIdx = q.options.indexOf(q.correct_answer)
      const correctLetter = correctIdx >= 0 ? OPTION_LETTERS[correctIdx] : '?'
      return `Q${i + 1} [id:${q.id}]
${q.question_text}
Options:
${optLines}
Correct: ${correctLetter}. ${q.correct_answer}`
    })
    .join('\n\n---\n\n')

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    response_format: { type: 'json_object' },
    temperature: 0.3,
    messages: [
      {
        role: 'system',
        content: `You are an expert educator in ${subject}. Write concise, high-yield explanations for multiple-choice questions. Each explanation should be 1-2 sentences and tied to the specific concept or mechanism — never generic. Always return valid JSON.`,
      },
      {
        role: 'user',
        content: `For each question below, provide:
1. explanation_correct: 1-2 sentences explaining WHY the correct answer is right (mechanism, concept, or key fact — not just restating the answer)
2. explanation_incorrect: for each WRONG option only, 1-2 sentences explaining why it is wrong or what misconception it represents

Keys for explanation_incorrect correspond to options array positions: A=index 0, B=index 1, C=index 2, D=index 3.
Omit the key for whichever letter is the correct answer.

Return this exact JSON format:
{
  "explanations": [
    {
      "question_id": "<the id shown in brackets above>",
      "explanation_correct": "...",
      "explanation_incorrect": {
        "B": "...",
        "C": "...",
        "D": "..."
      }
    }
  ]
}

Questions:

${questionsText}`,
      },
    ],
  })

  const content = response.choices[0]?.message?.content
  if (!content) throw new Error('OpenAI returned empty response for explanations')

  let parsed: { explanations: QuestionExplanation[] }
  try {
    parsed = JSON.parse(content)
  } catch {
    throw new Error('OpenAI returned invalid JSON for explanations')
  }

  if (!Array.isArray(parsed.explanations)) {
    throw new Error('OpenAI returned unexpected structure for explanations')
  }

  // Filter to well-formed entries only
  return parsed.explanations.filter(
    (e) =>
      typeof e.question_id === 'string' &&
      typeof e.explanation_correct === 'string' &&
      e.explanation_correct.trim().length > 0,
  )
}
