import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import type { MCATAIFeedback } from '@/lib/premade-exams/mcat/types'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

interface MissedQ {
  section: string
  questionType: string
  discipline: string
  contentCategory: string
  scientificSkill: string
  difficulty: string
  question: string
  userAnswer: string
  correctAnswer: string
}

interface FeedbackInput {
  chemPhysScore: number; chemPhysCorrect: number; chemPhysTotal: number
  carsScore: number; carsCorrect: number; carsTotal: number
  bioBiochemScore: number; bioBiochemCorrect: number; bioBiochemTotal: number
  psychSocScore: number; psychSocCorrect: number; psychSocTotal: number
  totalScore: number
  disciplineBreakdown: Record<string, { correct: number; total: number }>
  missedQuestions: MissedQ[]
}

export async function POST(req: NextRequest) {
  try {
    const input = (await req.json()) as FeedbackInput

    const sectionLines = [
      `Chem/Phys: ${input.chemPhysScore} (${input.chemPhysCorrect}/${input.chemPhysTotal} correct)`,
      `CARS: ${input.carsScore} (${input.carsCorrect}/${input.carsTotal} correct)`,
      `Bio/Biochem: ${input.bioBiochemScore} (${input.bioBiochemCorrect}/${input.bioBiochemTotal} correct)`,
      `Psych/Soc: ${input.psychSocScore} (${input.psychSocCorrect}/${input.psychSocTotal} correct)`,
    ].join('\n')

    const disciplineLines = Object.entries(input.disciplineBreakdown)
      .map(([d, s]) => `  ${d}: ${s.correct}/${s.total}`)
      .join('\n')

    const missedLines = input.missedQuestions.slice(0, 25)
      .map((q, i) => `${i + 1}. [${q.section} | ${q.discipline} | ${q.scientificSkill} | ${q.difficulty}]\n   Q: ${q.question}\n   User: ${q.userAnswer}  Correct: ${q.correctAnswer}`)
      .join('\n\n')

    const prompt = `You are an expert MCAT prep coach. A student just completed a full-length MCAT practice exam.

SECTION SCORES (scaled 118–132 each)
${sectionLines}
Total: ${input.totalScore}/528

DISCIPLINE ACCURACY
${disciplineLines || 'No data'}

MISSED QUESTIONS (up to 25 of ${input.missedQuestions.length} total)
${missedLines || 'None — excellent score!'}

Provide specific, honest, actionable MCAT coaching feedback. Return valid JSON only:
{
  "whatWentWell": "2-3 sentences about genuine strengths",
  "strongestSection": "1 sentence naming strongest section and why",
  "weakestSection": "1 sentence naming weakest section with specific diagnosis",
  "weakestDisciplines": ["list", "of", "3-5", "discipline", "strings"],
  "weakestContentCategories": ["list", "of", "2-4", "content", "categories"],
  "weakestScientificSkills": ["e.g.", "Skill 3: Reasoning About Research Design"],
  "passageVsDiscrete": "1-2 sentences on passage-based vs discrete question performance and what it implies",
  "carsStrategy": "2-3 sentences of specific CARS strategy advice based on CARS score",
  "contentAreasToReview": ["specific topic 1", "specific topic 2", "specific topic 3", "...up to 6"],
  "scienceReasoningToReview": ["e.g.", "Data interpretation from graphs/tables", "Experimental design and controls"],
  "recommendedNextSteps": "3-4 numbered steps as a single string"
}`

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
      max_tokens: 1200,
      temperature: 0.7,
    })

    const content = response.choices[0]?.message?.content
    if (!content) return NextResponse.json({ error: 'No response' }, { status: 500 })

    const feedback = JSON.parse(content) as MCATAIFeedback
    return NextResponse.json(feedback)
  } catch (err) {
    console.error('mcat-feedback error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
