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

    const prompt = `You are a direct, no-fluff SAT performance coach. Return ONLY valid JSON. Be specific — name actual skills and use actual numbers from the data. Do NOT say things like "your readiness is low", "you showed commendable effort", "your current level indicates", or other vague filler. If a student missed all questions in a domain, say so directly. Do not fabricate positivity.

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
  "whatWentWell": "If there are genuine strengths based on the data, name them specifically with numbers. If the student performed poorly in every area, say 'There were no clear standout strengths on this attempt' and pivot directly to what to fix.",
  "overallAssessment": "1–2 sentences on performance. Reference the actual score and what it means. E.g. 'A 1020 puts you below the national average — your Math and R&W gaps are roughly equal and both need significant work.' Be direct.",
  "rwStrengths": ["specific skill name where they got most right", "..."],
  "rwWeaknesses": ["Skill name: specific observation — e.g. 'Words in Context: missed 7 of 8 questions across both modules'", "Boundaries: missed all 4 questions — likely a fundamental gap in punctuation rules", "..."],
  "mathStrengths": ["skill name with evidence", "..."],
  "mathWeaknesses": ["Nonlinear Functions: 0/5 correct — no quadratic or exponential questions answered correctly", "..."],
  "carelessErrors": "Name specific careless-error pattern if visible (wrong sign, misread question, arithmetic mistake) — else null. Do not invent one.",
  "adaptivePathInsight": "What the student's adaptive module routing tells us. Say: 'Your second module was [easier/harder], which means...' Use plain student-friendly language. Do NOT use the word 'routing'.",
  "rwReviewTopics": ["Words in Context", "Boundaries", "..."],
  "mathReviewTopics": ["Nonlinear Functions", "Circles", "..."],
  "practiceRecommendations": "4–5 specific, concrete next-step recommendations as a numbered list.",
  "mockMateNextSteps": "5 specific steps for using MockMate next as a numbered list."
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
