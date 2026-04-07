import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export interface AIFeedback {
  what_went_well: string
  what_to_review: string
  mistake_pattern: string
}

interface FeedbackInput {
  examTitle: string
  subject: string
  percentage: number
  totalQuestions: number
  wrongQuestions: {
    question: string
    correct_answer: string
    user_answer: string
  }[]
}

export async function generateFeedback(input: FeedbackInput): Promise<AIFeedback> {
  const wrongSummary = input.wrongQuestions
    .map(
      (q, i) =>
        `${i + 1}. Q: ${q.question}\n   Your answer: ${q.user_answer}\n   Correct: ${q.correct_answer}`,
    )
    .join('\n\n')

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    response_format: { type: 'json_object' },
    temperature: 0.5,
    messages: [
      {
        role: 'system',
        content:
          'You are a concise, practical exam coach. Give honest, specific feedback — not generic praise. Return valid JSON only.',
      },
      {
        role: 'user',
        content: `A student just completed a practice exam.

Exam: ${input.examTitle}
Subject: ${input.subject}
Score: ${input.percentage}% (${input.totalQuestions - input.wrongQuestions.length}/${input.totalQuestions} correct)

${input.wrongQuestions.length === 0 ? 'They got every question correct.' : `Questions they got wrong:\n\n${wrongSummary}`}

Write short, direct feedback in this JSON format:
{
  "what_went_well": "1-2 sentences on what they clearly understood. Be specific to the correct answers, not generic.",
  "what_to_review": "Specific topics or concepts to revisit based on the wrong answers. List 2-3 concrete things.",
  "mistake_pattern": "If you see a pattern in the mistakes (e.g. confusion between two concepts, misreading questions), name it plainly. If no pattern, say so briefly."
}`,
      },
    ],
  })

  const content = response.choices[0]?.message?.content
  if (!content) throw new Error('OpenAI returned empty response')

  const parsed = JSON.parse(content) as AIFeedback
  if (!parsed.what_went_well || !parsed.what_to_review || !parsed.mistake_pattern) {
    throw new Error('Incomplete feedback from OpenAI')
  }

  return parsed
}
