import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export interface SATAIFeedback {
  whatWentWell: string
  overallAssessment: string
  rwStrengths: string[]
  rwWeaknesses: string[]
  mathStrengths: string[]
  mathWeaknesses: string[]
  carelessErrors: string | null
  adaptivePathInsight: string
  rwReviewTopics: string[]
  mathReviewTopics: string[]
  practiceRecommendations: string
  mockMateNextSteps: string
}

interface SkillStat { correct: number; total: number }

interface SATFeedbackInput {
  rwM1Correct: number; rwM1Total: number
  rwM2Correct: number; rwM2Total: number; rwM2Type: 'easy' | 'hard'
  mathM1Correct: number; mathM1Total: number
  mathM2Correct: number; mathM2Total: number; mathM2Type: 'easy' | 'hard'
  rwScaled: number; mathScaled: number; totalScore: number
  rwSkillBreakdown: Record<string, SkillStat>
  mathSkillBreakdown: Record<string, SkillStat>
  missedQuestions: {
    section: string; module: string; skill: string; domain: string
    difficulty: string; question: string; userAnswer: string; correctAnswer: string
  }[]
}

export async function POST(req: NextRequest) {
  try {
    const input = (await req.json()) as SATFeedbackInput

    const rwTotal = input.rwM1Total + input.rwM2Total
    const mathTotal = input.mathM1Total + input.mathM2Total
    const rwCorrect = input.rwM1Correct + input.rwM2Correct
    const mathCorrect = input.mathM1Correct + input.mathM2Correct

    const rwSkillLines = Object.entries(input.rwSkillBreakdown)
      .map(([skill, s]) => `  - ${skill}: ${s.correct}/${s.total}`)
      .join('\n')

    const mathSkillLines = Object.entries(input.mathSkillBreakdown)
      .map(([skill, s]) => `  - ${skill}: ${s.correct}/${s.total}`)
      .join('\n')

    const missedLines = input.missedQuestions.slice(0, 25)
      .map((q, i) => `${i + 1}. [${q.section} | ${q.module} | ${q.skill} | ${q.difficulty}]\n   Q: ${q.question.slice(0, 120)}\n   User: ${q.userAnswer || 'skipped'}  Correct: ${q.correctAnswer}`)
      .join('\n\n')

    const prompt = `You are an expert SAT prep coach. A student just completed SAT Practice Test 1.

SCORES
• Reading & Writing: ${input.rwScaled}/800 — ${rwCorrect}/${rwTotal} correct
  Module 1: ${input.rwM1Correct}/${input.rwM1Total}
  Module 2 (${input.rwM2Type}): ${input.rwM2Correct}/${input.rwM2Total}
• Math: ${input.mathScaled}/800 — ${mathCorrect}/${mathTotal} correct
  Module 1: ${input.mathM1Correct}/${input.mathM1Total}
  Module 2 (${input.mathM2Type}): ${input.mathM2Correct}/${input.mathM2Total}
• Total: ${input.totalScore}/1600
• Adaptive path: RW routed to ${input.rwM2Type} Module 2; Math routed to ${input.mathM2Type} Module 2

READING & WRITING SKILL BREAKDOWN
${rwSkillLines || '  No data'}

MATH SKILL BREAKDOWN
${mathSkillLines || '  No data'}

MISSED QUESTIONS (${input.missedQuestions.length} total, showing up to 25)
${missedLines || 'None — perfect score!'}

Provide honest, specific, actionable SAT coaching. Return valid JSON only:
{
  "whatWentWell": "2–3 specific sentences praising genuine strengths based on the data, not generic praise",
  "overallAssessment": "1–2 sentences on overall SAT readiness and score trajectory",
  "rwStrengths": ["skill name", "skill name"],
  "rwWeaknesses": ["skill name: one-line reason based on missed questions", "..."],
  "mathStrengths": ["skill name", "skill name"],
  "mathWeaknesses": ["skill name: one-line reason", "..."],
  "carelessErrors": "If you see a careless-error pattern (wrong operation, misread question), name it — else null",
  "adaptivePathInsight": "What the student's second-module difficulty (${input.rwM2Type} for Reading & Writing, ${input.mathM2Type} for Math) suggests about their current skill level and what to focus on next. Use plain student-friendly language. Do NOT use the word 'routing'. Instead say things like 'Because your second module was easier/harder, this means...' or 'Your results suggest...'.",
  "rwReviewTopics": ["specific topic", "specific topic", "specific topic"],
  "mathReviewTopics": ["specific topic", "specific topic", "specific topic"],
  "practiceRecommendations": "4–5 specific, concrete next-step practice recommendations. Format as a numbered list: 1. Start with your Personalized Practice Path. 2. [R&W weak areas]. 3. [Math weak areas]. 4. [Review strategy]. 5. [Retake/progress tip].",
  "mockMateNextSteps": "5 specific steps for using MockMate next. Format as a numbered list: 1. Click Personalized Practice Path below. 2. [Practice sets step]. 3. [Review explanations step]. 4. [Question Bank step]. 5. [Retake step when ready]."
}`

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      response_format: { type: 'json_object' },
      temperature: 0.4,
      messages: [
        { role: 'system', content: 'You are a concise, data-driven SAT coach. Return only valid JSON.' },
        { role: 'user', content: prompt },
      ],
    })

    const content = response.choices[0]?.message?.content
    if (!content) throw new Error('Empty response from OpenAI')

    const feedback = JSON.parse(content) as SATAIFeedback
    return NextResponse.json(feedback)
  } catch (err) {
    console.error('sat-feedback error:', err)
    return NextResponse.json({ error: 'Failed to generate feedback' }, { status: 500 })
  }
}
