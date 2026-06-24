import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export interface ShortResponseGradeInput {
  question_id: string
  question_text: string
  optimal_answer: string
  key_points?: string[]
  user_answer: string | null
}

export interface ShortResponseGradeResult {
  question_id: string
  score_out_of_10: number
  is_correct: boolean
  grading_summary: string
  missing_details: string[]
  incorrect_or_unclear_points: string[]
  what_to_improve: string
  optimal_answer: string
}

export async function gradeShortResponseAnswers(
  items: ShortResponseGradeInput[],
  subject: string,
): Promise<ShortResponseGradeResult[]> {
  if (items.length === 0) return []

  const results: ShortResponseGradeResult[] = []
  const toGrade: ShortResponseGradeInput[] = []

  // Handle blanks without an AI call
  for (const item of items) {
    if (!item.user_answer || item.user_answer.trim().length === 0) {
      results.push({
        question_id: item.question_id,
        score_out_of_10: 0,
        is_correct: false,
        grading_summary: 'No answer was provided.',
        missing_details: item.key_points ?? [],
        incorrect_or_unclear_points: [],
        what_to_improve: 'Always attempt an answer — partial credit is possible.',
        optimal_answer: item.optimal_answer,
      })
    } else {
      toGrade.push(item)
    }
  }

  if (toGrade.length === 0) return results

  const questionsText = toGrade
    .map((item, i) => {
      let text = `Q${i + 1} [id:${item.question_id}]
Question: ${item.question_text}
Optimal answer: ${item.optimal_answer}`
      if (item.key_points && item.key_points.length > 0) {
        text += `\nKey points required:\n${item.key_points.map((p) => `  - ${p}`).join('\n')}`
      }
      text += `\nStudent's answer: ${item.user_answer}`
      return text
    })
    .join('\n\n---\n\n')

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    response_format: { type: 'json_object' },
    temperature: 0.2,
    messages: [
      {
        role: 'system',
        content: `You are a fair, precise exam grader for ${subject}. Grade each short answer response based on accuracy, completeness, and depth of understanding. Be constructive and specific. Always return valid JSON.`,
      },
      {
        role: 'user',
        content: `Grade the following short answer responses. Compare each student answer to the optimal answer and key points.

SCORING SCALE:
- 9–10: Essentially correct — all key points addressed accurately and clearly
- 7–8: Mostly correct — core understanding present, minor detail missing or slight imprecision
- 5–6: Partially correct — main idea present but 1–2 important details are missing or inaccurate
- 3–4: Weak — only superficial understanding, significant gaps or multiple inaccuracies
- 1–2: Minimal relevant content — mostly incorrect, too vague, or largely off-topic
- 0: Blank, completely wrong, or harmful misconception

IMPORTANT GRADING RULES:
- Award credit for correct reasoning even if not worded exactly like the optimal answer
- Math/science: correct final answer WITH correct units AND reasoning = full credit; correct answer with no units = deduct 1–2 points; correct answer with no explanation = 5–7 depending on complexity
- Correct answer with clearly wrong reasoning = 3–5 (partial credit)
- A demonstrably harmful or incorrect core concept = 0–2 regardless of other content
- missing_details should list specific facts or points from the optimal answer that the student omitted
- incorrect_or_unclear_points should list what the student said that was wrong or ambiguous

Return ONLY this JSON (no other keys):
{
  "grades": [
    {
      "question_id": "the id shown in [id:...] above",
      "score_out_of_10": <integer 0–10>,
      "is_correct": <true if score_out_of_10 >= 8>,
      "grading_summary": "1–2 sentences explaining the score — be specific about what was right and what was lacking",
      "missing_details": ["specific detail that was omitted", "..."],
      "incorrect_or_unclear_points": ["statement that was wrong or unclear", "..."],
      "what_to_improve": "One direct sentence telling the student exactly what to study or clarify"
    }
  ]
}

Questions to grade:

${questionsText}`,
      },
    ],
  })

  const content = response.choices[0]?.message?.content
  if (!content) throw new Error('OpenAI returned empty response for grading')

  let parsed: {
    grades: Array<{
      question_id: string
      score_out_of_10: number
      is_correct: boolean
      grading_summary: string
      missing_details: string[]
      incorrect_or_unclear_points: string[]
      what_to_improve: string
    }>
  }
  try {
    parsed = JSON.parse(content)
  } catch {
    throw new Error('OpenAI returned invalid JSON for grading')
  }

  if (!Array.isArray(parsed.grades)) {
    throw new Error('Unexpected grading response structure from OpenAI')
  }

  const gradeMap = new Map(
    parsed.grades
      .filter((g) => typeof g.question_id === 'string')
      .map((g) => {
        const score = Math.max(0, Math.min(10, Math.round(g.score_out_of_10 ?? 0)))
        return [
          g.question_id,
          {
            question_id: g.question_id,
            score_out_of_10: score,
            is_correct: score >= 8,
            grading_summary: typeof g.grading_summary === 'string' ? g.grading_summary : '',
            missing_details: Array.isArray(g.missing_details) ? g.missing_details : [],
            incorrect_or_unclear_points: Array.isArray(g.incorrect_or_unclear_points)
              ? g.incorrect_or_unclear_points
              : [],
            what_to_improve: typeof g.what_to_improve === 'string' ? g.what_to_improve : '',
            optimal_answer: '',
          },
        ]
      }),
  )

  for (const item of toGrade) {
    const grade = gradeMap.get(item.question_id)
    if (grade) {
      grade.optimal_answer = item.optimal_answer
      results.push(grade)
    } else {
      results.push({
        question_id: item.question_id,
        score_out_of_10: 0,
        is_correct: false,
        grading_summary: 'This response could not be graded automatically.',
        missing_details: item.key_points ?? [],
        incorrect_or_unclear_points: [],
        what_to_improve: 'Review the optimal answer and key points for this question.',
        optimal_answer: item.optimal_answer,
      })
    }
  }

  return results
}
