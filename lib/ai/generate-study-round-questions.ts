import OpenAI from 'openai'
import type { GeneratedQuestion } from './generate-questions'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const LETTERS = ['A', 'B', 'C', 'D', 'E']

export interface MissedQuestionInput {
  question_text: string
  options: string[]
  correct_answer: string
  user_answer: string | null
  explanation_correct?: string | null
  explanation_incorrect?: Record<string, string> | null
}

export async function generateStudyRoundQuestions(input: {
  missedQuestions: MissedQuestionInput[]
  subject: string
  examTitle: string
  questionCount: number
  language?: string
  previousQuestionTexts?: string[]
  standardizedExam?: string
}): Promise<GeneratedQuestion[]> {
  const {
    missedQuestions,
    subject,
    examTitle,
    questionCount,
    language,
    previousQuestionTexts = [],
    standardizedExam,
  } = input

  const isUSMLE = standardizedExam === 'usmle_step1'
  const optionCount = isUSMLE ? 5 : 4

  const missedSummary = missedQuestions
    .map((q, i) => {
      const userAns = q.user_answer ?? '(no answer)'
      let whyWrong = ''
      if (q.user_answer && q.explanation_incorrect) {
        const idx = q.options.indexOf(q.user_answer)
        const letter = idx >= 0 ? LETTERS[idx] : null
        if (letter && q.explanation_incorrect[letter]) {
          whyWrong = `\n  Why student's answer was wrong: ${q.explanation_incorrect[letter]}`
        }
      }
      return [
        `MISSED CONCEPT ${i + 1}:`,
        `  Original question: ${q.question_text}`,
        `  Student answered: ${userAns}`,
        `  Correct answer: ${q.correct_answer}`,
        q.explanation_correct ? `  Concept to understand: ${q.explanation_correct}` : null,
        whyWrong || null,
      ]
        .filter(Boolean)
        .join('\n')
    })
    .join('\n\n---\n\n')

  const avoidBlock =
    previousQuestionTexts.length > 0
      ? `\n\nIMPORTANT — Do NOT repeat these question stems (use completely different wording):\n${previousQuestionTexts
          .slice(0, 15)
          .map((t) => `• ${t.slice(0, 120)}`)
          .join('\n')}`
      : ''

  const langNote =
    language && language !== 'English'
      ? `\nLanguage: Write all content in ${language}. Keep technical terms in their original form only when translation would be inaccurate.\n`
      : ''

  const usmleNote = isUSMLE
    ? '\nFormat: USMLE Step 1 style — 5 answer choices (A–E), clinical or basic-science vignettes requiring foundational reasoning.\n'
    : ''

  const exampleOptions = isUSMLE
    ? `["option A text", "option B text", "option C text", "option D text", "option E text"]`
    : `["option A text", "option B text", "option C text", "option D text"]`
  const exampleIncorrect = isUSMLE
    ? `"B": "why B is wrong", "C": "why C is wrong", "D": "why D is wrong", "E": "why E is wrong"`
    : `"B": "why B is wrong", "C": "why C is wrong", "D": "why D is wrong"`
  const letterNote = isUSMLE
    ? 'A=options[0], B=options[1], C=options[2], D=options[3], E=options[4]. Omit the key for the correct answer.'
    : 'A=options[0], B=options[1], C=options[2], D=options[3]. Omit the key for the correct answer.'

  const response = await openai.chat.completions.create({
    model: isUSMLE ? 'gpt-4o' : 'gpt-4o-mini',
    response_format: { type: 'json_object' },
    temperature: 0.75,
    messages: [
      {
        role: 'system',
        content: `You are an adaptive learning specialist. Create targeted follow-up exam questions that test the SAME missed concepts using completely different wording, angles, and scenarios. Goal: student mastery. Never repeat question stems. Always return valid JSON.`,
      },
      {
        role: 'user',
        content: `${langNote}${usmleNote}
A student is in a Study Round for "${examTitle}" (${subject}).
Generate exactly ${questionCount} NEW questions that test the SAME missed concepts below — but with DIFFERENT wording, scenarios, and angles.

STRICT RULES:
- Target the EXACT concepts/topics that were missed
- Use completely different question text and answer choices from the originals
- Same or slightly higher difficulty
- Vary the question angle (if original asked for diagnosis → ask for mechanism; if asked for cause → ask for consequence)
- Every question must have exactly ${optionCount} distinct answer choices
- correct_answer must be the EXACT string of one of the options
- Include concise explanation_correct and explanation_incorrect
${avoidBlock}

MISSED CONCEPTS TO RETEST:
${missedSummary}

Return ONLY this JSON (no markdown, no extra keys):
{
  "questions": [
    {
      "question_text": "...",
      "options": ${exampleOptions},
      "correct_answer": "exact option text here",
      "explanation_correct": "why the correct answer is right (1-2 sentences)",
      "explanation_incorrect": {
        ${exampleIncorrect}
      }
    }
  ]
}

explanation_incorrect keys: ${letterNote}`,
      },
    ],
  })

  const content = response.choices[0]?.message?.content
  if (!content) throw new Error('OpenAI returned empty response for study round')

  let parsed: { questions: GeneratedQuestion[] }
  try {
    parsed = JSON.parse(content)
  } catch {
    throw new Error('OpenAI returned invalid JSON for study round questions')
  }

  if (!Array.isArray(parsed.questions) || parsed.questions.length === 0) {
    throw new Error('OpenAI returned no study round questions')
  }

  return parsed.questions
    .slice(0, questionCount)
    .filter(
      (q) =>
        typeof q.question_text === 'string' &&
        Array.isArray(q.options) &&
        q.options.length >= 4 &&
        typeof q.correct_answer === 'string' &&
        q.options.includes(q.correct_answer),
    )
    .map((q) => ({
      question_text: q.question_text,
      options: q.options as string[],
      correct_answer: q.correct_answer,
      explanation_correct:
        typeof q.explanation_correct === 'string' && q.explanation_correct.trim()
          ? q.explanation_correct.trim()
          : undefined,
      explanation_incorrect:
        q.explanation_incorrect &&
        typeof q.explanation_incorrect === 'object' &&
        !Array.isArray(q.explanation_incorrect)
          ? (q.explanation_incorrect as Record<string, string>)
          : undefined,
    }))
}
