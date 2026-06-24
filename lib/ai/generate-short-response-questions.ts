import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export interface GeneratedShortResponseQuestion {
  question_text: string
  optimal_answer: string
  key_points: string[]
  grading_rubric: Record<string, string>
}

interface GenerateInput {
  title: string
  subject: string
  topics: string
  subtopics: string
  lectureContent: string
  pastPaperStyle: string
  additionalNotes: string
  questionCount: number
  language?: string
}

export async function generateShortResponseQuestions(
  input: GenerateInput,
): Promise<GeneratedShortResponseQuestion[]> {
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

  const langInstruction =
    input.language && input.language !== 'English'
      ? `Generate all questions and answers in ${input.language}. Preserve technical terms when translation would reduce accuracy.\n\n`
      : ''

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    response_format: { type: 'json_object' },
    temperature: 0.6,
    messages: [
      {
        role: 'system',
        content: `You are an expert exam writer who creates high-quality short answer questions that test genuine understanding of the subject. Questions must require students to explain concepts, describe mechanisms, compare ideas, or apply knowledge — not recall a single fact. Always return valid JSON.`,
      },
      {
        role: 'user',
        content: `${langInstruction}Generate exactly ${input.questionCount} short answer questions based on the following exam details:

${contextParts}

RULES:
- Questions must be fully open-ended — no answer choices, no true/false
- Each question should require 2–5 sentences to answer well
- Test understanding, not just recall: ask students to explain, describe, compare, or analyse
- Vary question types across the set: mechanism questions, process questions, comparison questions, application questions
- Each question must have a clear, specific, complete optimal answer
- key_points must list the individual facts a student needs to mention for full credit (2–5 points per question)

Return ONLY this JSON (no extra keys, no markdown):
{
  "questions": [
    {
      "question_text": "...",
      "optimal_answer": "The ideal complete answer covering all key points clearly and concisely.",
      "key_points": [
        "Key point 1 that must be present for full credit",
        "Key point 2...",
        "Key point 3..."
      ],
      "grading_rubric": {
        "9-10": "Complete and accurate — all key points addressed with clear explanation",
        "7-8": "Mostly correct — minor missing detail or slight imprecision",
        "5-6": "Partially correct — main idea present but 1–2 important details missing",
        "3-4": "Weak — only superficial understanding, significant gaps",
        "1-2": "Minimal relevant content, mostly incorrect",
        "0": "Blank, completely wrong, or off-topic"
      }
    }
  ]
}`,
      },
    ],
  })

  const content = response.choices[0]?.message?.content
  if (!content) throw new Error('OpenAI returned an empty response')

  let parsed: { questions: GeneratedShortResponseQuestion[] }
  try {
    parsed = JSON.parse(content)
  } catch {
    throw new Error('OpenAI returned invalid JSON')
  }

  if (!Array.isArray(parsed.questions) || parsed.questions.length === 0) {
    throw new Error('OpenAI returned no questions')
  }

  const validated: GeneratedShortResponseQuestion[] = []
  for (const q of parsed.questions) {
    if (typeof q.question_text !== 'string' || typeof q.optimal_answer !== 'string') {
      throw new Error(`Malformed short response question: "${q.question_text ?? 'unknown'}"`)
    }
    validated.push({
      question_text: q.question_text,
      optimal_answer: q.optimal_answer,
      key_points: Array.isArray(q.key_points)
        ? q.key_points.filter((k): k is string => typeof k === 'string')
        : [],
      grading_rubric:
        q.grading_rubric && typeof q.grading_rubric === 'object' && !Array.isArray(q.grading_rubric)
          ? (q.grading_rubric as Record<string, string>)
          : {
              '9-10': 'Complete and accurate answer with all key details',
              '7-8': 'Mostly correct but missing minor details',
              '5-6': 'Partially correct but missing important details',
              '3-4': 'Weak or incomplete',
              '1-2': 'Minimal relevant content',
              '0': 'Incorrect or blank',
            },
    })
  }

  return validated
}
