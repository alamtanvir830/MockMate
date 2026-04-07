import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export interface GeneratedQuestion {
  question_text: string
  options: [string, string, string, string]
  correct_answer: string
}

interface GenerateInput {
  title: string
  subject: string
  topics: string
  subtopics: string
  lectureContent: string
  format: string
  pastPaperStyle: string
  additionalNotes: string
  questionCount: number
}

export async function generateQuestions(
  input: GenerateInput,
): Promise<GeneratedQuestion[]> {
  const contextParts = [
    `Title: ${input.title}`,
    `Subject: ${input.subject}`,
    input.topics ? `Topics: ${input.topics}` : null,
    input.subtopics ? `Subtopics: ${input.subtopics}` : null,
    input.lectureContent ? `Lecture content / notes:\n${input.lectureContent}` : null,
    input.pastPaperStyle ? `Past paper style: ${input.pastPaperStyle}` : null,
    input.additionalNotes ? `Additional notes: ${input.additionalNotes}` : null,
  ]
    .filter(Boolean)
    .join('\n')

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    response_format: { type: 'json_object' },
    temperature: 0.7,
    messages: [
      {
        role: 'system',
        content:
          'You are an expert exam question generator. You generate accurate, well-written multiple-choice questions based on provided exam material. Always return valid JSON.',
      },
      {
        role: 'user',
        content: `Generate exactly ${input.questionCount} multiple-choice exam questions based on the following exam details:

${contextParts}

Rules:
- Each question must be directly relevant to the topics and content provided
- Each question must have exactly 4 answer options
- Exactly one option must be correct
- The correct_answer must be the exact string of one of the 4 options
- Questions should vary in difficulty
- Do not number the questions or options

Return a JSON object in this exact format:
{
  "questions": [
    {
      "question_text": "...",
      "options": ["option A", "option B", "option C", "option D"],
      "correct_answer": "option A"
    }
  ]
}`,
      },
    ],
  })

  const content = response.choices[0]?.message?.content
  if (!content) throw new Error('OpenAI returned an empty response')

  let parsed: { questions: GeneratedQuestion[] }
  try {
    parsed = JSON.parse(content)
  } catch {
    throw new Error('OpenAI returned invalid JSON')
  }

  if (!Array.isArray(parsed.questions) || parsed.questions.length === 0) {
    throw new Error('OpenAI returned no questions')
  }

  // Validate each question
  const validated: GeneratedQuestion[] = []
  for (const q of parsed.questions) {
    if (
      typeof q.question_text !== 'string' ||
      !Array.isArray(q.options) ||
      q.options.length !== 4 ||
      typeof q.correct_answer !== 'string' ||
      !q.options.includes(q.correct_answer)
    ) {
      throw new Error(
        `OpenAI returned a malformed question: "${q.question_text ?? 'unknown'}"`,
      )
    }
    validated.push({
      question_text: q.question_text,
      options: q.options as [string, string, string, string],
      correct_answer: q.correct_answer,
    })
  }

  return validated
}
