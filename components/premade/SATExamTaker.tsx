'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { cn } from '@/lib/utils'
import type {
  SATForm,
  SATModule,
  SATQuestion,
  MathMCQuestion,
  MathGridInQuestion,
  ChoiceLabel,
} from '@/lib/premade-exams/sat/types'
import {
  convertRWScore,
  convertMathScore,
  roundSATScore,
} from '@/lib/premade-exams/sat/sat-score-conversion'
import type { SATAIFeedback } from '@/app/api/sat-feedback/route'

// ─── Phase state machine ───────────────────────────────────────────────────────
type SATPhase =
  | { tag: 'welcome' }
  | { tag: 'rw_directions' }
  | { tag: 'question'; section: 'rw' | 'math'; slot: 'm1' | 'm2'; qIdx: number }
  | { tag: 'rw_break' }
  | { tag: 'section_break' }
  | { tag: 'math_directions' }
  | { tag: 'math_break' }
  | { tag: 'end' }
  | { tag: 'results' }

type AnswerFilter = 'all' | 'incorrect' | 'unanswered' | 'rw' | 'math' | 'marked'

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatTime(secs: number): string {
  const m = Math.floor(secs / 60)
  const s = secs % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

function normalizeGridIn(raw: string): string {
  return raw.trim().replace(/\s+/g, '')
}

function isGridInCorrect(q: MathGridInQuestion, raw: string): boolean {
  const norm = normalizeGridIn(raw)
  if (!norm) return false
  return q.acceptableAnswers.some(a => normalizeGridIn(a) === norm)
}

function isAnswered(q: SATQuestion, answers: Record<string, string>): boolean {
  return !!answers[q.id]?.trim()
}

function isCorrect(q: SATQuestion, answers: Record<string, string>): boolean {
  if (!answers[q.id]) return false
  if (q.section === 'reading-writing') return answers[q.id] === q.correctAnswer
  const mq = q as MathMCQuestion | MathGridInQuestion
  if (mq.type === 'multiple_choice') return answers[q.id] === (mq as MathMCQuestion).correctAnswer
  return isGridInCorrect(mq as MathGridInQuestion, answers[q.id])
}

function countCorrect(module: SATModule, answers: Record<string, string>): number {
  return module.questions.filter(q => isCorrect(q, answers)).length
}

function getCorrectAnswer(q: SATQuestion): string {
  if (q.section === 'reading-writing') return q.correctAnswer
  const mq = q as MathMCQuestion | MathGridInQuestion
  if (mq.type === 'multiple_choice') return (mq as MathMCQuestion).correctAnswer
  return (mq as MathGridInQuestion).correctAnswer
}

function getWrongAnswerExplanations(q: SATQuestion): Partial<Record<ChoiceLabel, string>> {
  if (q.section === 'reading-writing') return q.wrongAnswerExplanations
  const mq = q as MathMCQuestion | MathGridInQuestion
  if (mq.type === 'multiple_choice') return (mq as MathMCQuestion).wrongAnswerExplanations
  return {}
}

function getExplanation(q: SATQuestion): string {
  return (q as { explanation: string }).explanation
}

function getChoices(q: SATQuestion) {
  if (q.section === 'reading-writing') return q.choices
  const mq = q as MathMCQuestion | MathGridInQuestion
  if (mq.type === 'multiple_choice') return (mq as MathMCQuestion).choices
  return null
}

function getSkill(q: SATQuestion): string {
  return q.section === 'reading-writing' ? q.skill : (q as { skill: string }).skill
}

function buildSkillBreakdown(modules: SATModule[], answers: Record<string, string>) {
  const breakdown: Record<string, { correct: number; total: number }> = {}
  for (const mod of modules) {
    for (const q of mod.questions) {
      const skill = getSkill(q)
      if (!breakdown[skill]) breakdown[skill] = { correct: 0, total: 0 }
      breakdown[skill].total++
      if (isCorrect(q, answers)) breakdown[skill].correct++
    }
  }
  return breakdown
}

// ─── Practice Prompt Generation ───────────────────────────────────────────────
interface WeakSkill {
  skill: string
  section: 'rw' | 'math'
  missCount: number
  totalCount: number
}

interface PracticePrompt {
  title: string
  description: string
  skill: string
  section: 'rw' | 'math'
  prompt: string
}

type FlatQItem = {
  q: SATQuestion
  qi: number
  modLabel: string
  section: 'rw' | 'math'
  answered: boolean
  correct: boolean
}

function getDifficultyLabel(missCount: number, totalCount: number): string {
  const ratio = totalCount > 0 ? missCount / totalCount : 0
  if (ratio > 0.5 || missCount >= 4) return 'easy to medium'
  if (missCount >= 2) return 'medium'
  return 'medium to hard'
}

function getQuestionCount(missCount: number): number {
  if (missCount >= 4) return 15
  if (missCount >= 2) return 12
  return 10
}

function buildWeakSkills(allFlat: FlatQItem[]): WeakSkill[] {
  const map: Record<string, { miss: number; total: number; section: 'rw' | 'math' }> = {}
  for (const { q, answered, correct, section } of allFlat) {
    const skill = getSkill(q)
    if (!map[skill]) map[skill] = { miss: 0, total: 0, section }
    map[skill].total++
    if (!answered || !correct) map[skill].miss++
  }
  return Object.entries(map)
    .filter(([, v]) => v.miss > 0)
    .map(([skill, v]) => ({ skill, section: v.section, missCount: v.miss, totalCount: v.total }))
    .sort((a, b) => b.missCount - a.missCount)
}

function pickTopSkills(weak: WeakSkill[]): WeakSkill[] {
  if (weak.length === 0) return []
  if (weak.length <= 2) return weak
  const rw = weak.filter(s => s.section === 'rw')
  const math = weak.filter(s => s.section === 'math')
  if (!rw.length || !math.length) return weak.slice(0, 5)
  // Interleave RW and Math for balance, up to 5
  const result: WeakSkill[] = []
  let ri = 0, mi = 0
  while (result.length < 5) {
    if (ri < rw.length) result.push(rw[ri++])
    if (result.length < 5 && mi < math.length) result.push(math[mi++])
    if (ri >= rw.length && mi >= math.length) break
  }
  return result
}

function generateRWPrompt(skill: string, n: number, diff: string): string {
  const base = `Create a SAT-style practice exam focused only on **${skill}** questions.\n\nMatch the current digital SAT Reading and Writing format:\n- Short passage stimulus (3–8 sentences) per question\n- One question per passage\n- Four answer choices (A, B, C, D)\n- One best answer\n\nCreate ${n} questions at ${diff} difficulty.\n`

  const skMap: Record<string, string> = {
    'Words in Context': `Use passages from science, history, literature, and social science.\nFocus on determining the meaning of a word or phrase based on context — not dictionary definitions.\nChoose words that have multiple plausible meanings; only one fits the passage.\nMake distractors real definitions of the word that do not fit the context.`,
    'Text Structure and Purpose': `Use passages from science, humanities, and social science.\nAsk: "What is the main purpose of the text?" and "The underlined portion primarily serves to..."\nInclude questions about logical organization (e.g., problem-solution, compare-contrast, chronological).\nMake distractors too narrow, too broad, or describe the wrong rhetorical move.`,
    'Cross-Text Connections': `Present two short passages (Text 1 and Text 2) on the same topic.\nAsk how the authors agree, disagree, or would respond to each other's claims.\nUse science, history, or social science topics.\nMake distractors misrepresent one or both authors' positions.`,
    'Central Ideas and Details': `Use passages from science, history, and social science.\nInclude both "What is the main idea?" and "Which detail best supports the claim?" question types.\nMake distractors too broad, too narrow, or introduce a detail that is not in the passage.`,
    'Command of Evidence': `Include both question types:\n  Type 1 — Textual: A claim is stated; choose the quotation that best supports it.\n  Type 2 — Quantitative: A simple table or graph is described; choose the statement best supported by the data.\nMake distractors select evidence that is irrelevant, contradictory, or only partially supportive.`,
    'Inferences': `Use passages from science, social science, and literature.\nAsk what can be logically concluded or what the author implies — go beyond what is explicitly stated.\nRequire grounded reasoning, not outside knowledge.\nMake distractors too extreme, too literal, or unsupported by the passage.`,
    'Rhetorical Synthesis': `Present 3–5 student notes (bullet points) about a topic from science, history, or social science.\nAsk the student to combine the information into one sentence that accomplishes a specific goal (e.g., "introduces the topic," "compares two items," "describes a finding").\nMake distractors use correct facts but fail the stated task, add unsupported claims, or have logical errors.`,
    'Transitions': `Present a short passage with a blank where a transition word or phrase should go.\nCover: contrast (however, nevertheless), cause-effect (therefore, as a result), addition (furthermore, in addition), exemplification (for instance), and conclusion (ultimately).\nMake distractors signal the wrong logical relationship between the sentences.`,
    'Boundaries': `Present a sentence or short paragraph with a punctuation blank.\nCover: comma splices, run-on sentences, fragments, semicolons, colons, dashes, and end punctuation.\nMake distractors create boundary errors (splice, fragment, or run-on).\nExplain the clause structure in the answer key.`,
    'Form, Structure, and Sense': `Present sentences with a blank for a specific word form.\nCover: subject-verb agreement, pronoun-antecedent agreement, verb tense consistency, modifier placement, parallel structure, and possessive vs. plural nouns.\nMake distractors use plausible but grammatically incorrect forms.`,
  }

  const specific = skMap[skill] ?? `Focus specifically on ${skill}. Use authentic SAT-style content and question phrasing.`

  return `${base}${specific}\n\nFor every question include:\n- Correct answer with explanation of why it is right based on the passage\n- Explanation of why each wrong answer choice (A, B, C, or D) is incorrect\n\nFormat: number each question, include the passage, the question, four labeled choices, then the answer key.`
}

function getMathPromptKey(skill: string): string {
  const s = skill.toLowerCase()
  if (s.includes('system')) return 'systems'
  if (s.includes('linear') || s.includes('slope') || s.includes('intercept')) return 'linear'
  if (s.includes('quadratic') || s.includes('polynomial') || s.includes('factoring') || s.includes('parabola')) return 'quadratic'
  if (s.includes('exponential') || s.includes('growth') || s.includes('decay') || s.includes('half-life')) return 'exponential'
  if (s.includes('function') || s.includes('domain') || s.includes('range') || s.includes('composition')) return 'functions'
  if (s.includes('ratio') || s.includes('proportion') || s.includes('rate') || s.includes('percent') || s.includes('unit')) return 'ratios'
  if (s.includes('statistic') || s.includes('data') || s.includes('inference') || s.includes('sample') || s.includes('probability') || s.includes('scatter') || s.includes('margin')) return 'data'
  if (s.includes('trig') || s.includes('sine') || s.includes('cosine') || s.includes('right triangle')) return 'trig'
  if (s.includes('geometry') || s.includes('area') || s.includes('volume') || s.includes('circle') || s.includes('angle') || s.includes('triangle') || s.includes('perimeter')) return 'geometry'
  return 'math_general'
}

function generateMathPrompt(skill: string, n: number, diff: string): string {
  const key = getMathPromptKey(skill)
  const base = `Create a SAT-style practice exam focused on **${skill}**.\n\nMatch the current digital SAT Math format:\n- Mix of multiple choice (4 options, A–D) and grid-in (student-produced response) questions\n- Calculator permitted for all questions\n\nCreate ${n} questions at ${diff} difficulty.\n`

  const topicMap: Record<string, string> = {
    linear: `Cover: solving linear equations in one variable, writing equations from word problems, slope-intercept and point-slope form, interpreting slope and intercept in context, and direct/inverse variation.`,
    systems: `Cover: solving systems by substitution and elimination, identifying systems with no solution (parallel lines) or infinite solutions, word problems modeled as systems of two equations, and interpreting the solution of a system in context.`,
    quadratic: `Cover: factoring quadratics, the quadratic formula, vertex form and completing the square, finding roots and the axis of symmetry, discriminant and nature of roots, and interpreting parabolas from graphs.`,
    exponential: `Cover: exponential growth and decay models, percent increase and decrease, initial value and growth rate, half-life problems, and comparing exponential vs. linear growth from tables and graphs.`,
    functions: `Cover: function notation f(x), evaluating functions at given inputs, interpreting functions from graphs and tables, domain and range, composition of functions f(g(x)), and transformations (vertical/horizontal shifts, reflections, stretches).`,
    ratios: `Cover: part-to-part and part-to-whole ratios, unit rates, percent increase and decrease, percent of a total, proportional relationships, and unit conversion. Include real-world word problems.`,
    data: `Cover: mean, median, mode, range, interpreting standard deviation, line of best fit on scatterplots, two-way tables, conditional probability, margin of error, and drawing valid conclusions from sample data.`,
    trig: `Cover: sine, cosine, and tangent in right triangles (SOH-CAH-TOA), the Pythagorean theorem, complementary angle identities (sin θ = cos(90°−θ)), radian and degree conversion, and applying trigonometry to real-world geometric problems.`,
    geometry: `Cover: area and perimeter of triangles, rectangles, and circles; arc length and sector area; the Pythagorean theorem; similar and congruent triangles; properties of parallel lines and transversals; coordinate geometry (distance, midpoint); and volume of 3D shapes.`,
    math_general: `Cover a mix of Algebra, Advanced Math, and Problem-Solving and Data Analysis topics relevant to the SAT. Include both computational and word-problem questions.`,
  }

  const specific = topicMap[key] ?? topicMap.math_general

  return `${base}${specific}\n\nFor every question include:\n- Correct answer with step-by-step solution\n- For multiple choice: explanation of why each wrong choice (A, B, C, or D) is incorrect (name the likely error: sign flip, wrong formula, misread problem, etc.)\n\nFormat: number each question, show all answer choices clearly, then provide the answer key with full explanations.`
}

const GENERAL_MIXED_PROMPT: PracticePrompt = {
  title: 'Practice Prompt: SAT Mixed Review',
  description: 'A balanced review covering both Reading & Writing and Math in one practice set.',
  skill: 'Mixed',
  section: 'rw',
  prompt: `Create a mixed SAT-style practice exam covering both Reading and Writing and Math.

Include:
- 8 Reading and Writing questions: Words in Context (2), Central Ideas (2), Command of Evidence (2), Transitions (1), Boundaries (1)
- 7 Math questions: Algebra (3), Advanced Math (2), Data Analysis (2)
- Mix of easy, medium, and hard difficulty

Match the digital SAT format throughout:
- Short passage stimuli for Reading and Writing questions
- Multiple choice (4 options) and grid-in for Math questions

For every question include:
- Correct answer with clear explanation
- Explanation of why each wrong answer choice is incorrect

Format each question with the passage (if applicable), question text, labeled choices A–D, then a complete answer key.`,
}

const GENERAL_MAINTENANCE_PROMPT: PracticePrompt = {
  title: 'Practice Prompt: SAT Mixed Maintenance',
  description: 'Keep your skills sharp with a medium-to-hard mixed SAT practice set.',
  skill: 'Mixed',
  section: 'rw',
  prompt: `Create a mixed SAT-style practice exam with Reading and Writing and Math questions.

Focus on medium-to-hard difficulty to maintain and sharpen high-level skills.

Include:
- 8 Reading and Writing questions at medium-to-hard difficulty
- 7 Math questions at medium-to-hard difficulty
- Cover diverse skills across all SAT domains

Match the official digital SAT format with short passage stimuli and four-choice multiple choice (A–D) for Reading and Writing, and multiple choice plus grid-in for Math.

For every question include:
- Correct answer with detailed explanation
- Explanation of why each wrong answer choice is incorrect
- A brief note on the skill or concept being tested

End with a topic breakdown listing which skills were covered.`,
}

function buildPracticePrompts(allFlat: FlatQItem[]): PracticePrompt[] {
  const weak = buildWeakSkills(allFlat)
  if (weak.length === 0) return [GENERAL_MAINTENANCE_PROMPT]

  const top = pickTopSkills(weak)
  const prompts: PracticePrompt[] = top.map(w => {
    const n = getQuestionCount(w.missCount)
    const diff = getDifficultyLabel(w.missCount, w.totalCount)
    const promptText = w.section === 'rw'
      ? generateRWPrompt(w.skill, n, diff)
      : generateMathPrompt(w.skill, n, diff)
    return {
      title: `Practice Prompt: SAT ${w.skill}`,
      description: `${n} ${diff}-difficulty questions targeting ${w.skill} — you missed ${w.missCount} of ${w.totalCount}.`,
      skill: w.skill,
      section: w.section,
      prompt: promptText,
    }
  })

  // If only one weak skill, add a mixed review
  if (top.length === 1) prompts.push(GENERAL_MIXED_PROMPT)

  return prompts
}

// ─── Practice Prompts Section Component ───────────────────────────────────────
function PracticePromptsSection({ prompts, hasMisses }: { prompts: PracticePrompt[]; hasMisses: boolean }) {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null)

  const handleCopy = async (text: string, idx: number) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedIdx(idx)
      setTimeout(() => setCopiedIdx(null), 2000)
    } catch {
      // clipboard unavailable — text is visible for manual selection
      setCopiedIdx(idx)
      setTimeout(() => setCopiedIdx(null), 2000)
    }
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100">
        <h2 className="text-[15px] font-bold text-slate-900">Create More Practice From Your Weak Areas</h2>
        <p className="text-[12px] text-slate-500 mt-1">
          Copy one of these prompts into MockMate to generate a focused practice exam based on the SAT skills you missed.
        </p>
      </div>

      <div className="p-5 space-y-4">
        {!hasMisses && (
          <div className="bg-green-50 border border-green-100 rounded-lg p-4 text-[13px] text-green-800">
            You did not have enough missed questions to generate a weak-area prompt. Here is a general maintenance prompt to keep your skills sharp.
          </div>
        )}

        {prompts.map((p, i) => (
          <div key={i} className="border border-slate-200 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-200">
              <div>
                <p className="text-[13px] font-semibold text-slate-800">{p.title}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">{p.description}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0 ml-4">
                <span className={cn('text-[10px] font-semibold px-2 py-0.5 rounded-full',
                  p.section === 'rw' ? 'bg-indigo-50 text-indigo-600' : 'bg-emerald-50 text-emerald-600'
                )}>
                  {p.section === 'rw' ? 'Reading & Writing' : 'Math'}
                </span>
                <button
                  onClick={() => handleCopy(p.prompt, i)}
                  className={cn(
                    'flex items-center gap-1.5 text-[12px] font-semibold px-3 py-1.5 rounded-lg border transition-all',
                    copiedIdx === i
                      ? 'bg-green-50 border-green-200 text-green-700'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-[#1d4ed8] hover:text-[#1d4ed8]',
                  )}
                >
                  {copiedIdx === i ? (
                    <>
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} className="h-3 w-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-3 w-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                      </svg>
                      Copy Prompt
                    </>
                  )}
                </button>
              </div>
            </div>
            <div className="p-4">
              <pre className="text-[11px] text-slate-600 whitespace-pre-wrap leading-relaxed font-sans bg-slate-50 border border-slate-100 rounded-lg p-3 max-h-40 overflow-y-auto select-all">
                {p.prompt}
              </pre>
            </div>
          </div>
        ))}

        {/* How to use */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
          <p className="text-[12px] font-semibold text-blue-800 mb-2">How to use this on MockMate</p>
          <ol className="space-y-1.5 text-[12px] text-blue-900">
            <li className="flex gap-2"><span className="shrink-0 font-bold text-blue-600">1.</span> Go to the side panel and click <strong>New Exam</strong>.</li>
            <li className="flex gap-2"><span className="shrink-0 font-bold text-blue-600">2.</span> Paste one of the prompts above into the exam description or notes box.</li>
            <li className="flex gap-2"><span className="shrink-0 font-bold text-blue-600">3.</span> Under standardized exam targeting, select <strong>SAT</strong>.</li>
            <li className="flex gap-2"><span className="shrink-0 font-bold text-blue-600">4.</span> Generate the exam and practice the weak skill again.</li>
          </ol>
        </div>
      </div>
    </div>
  )
}

// ─── PDF generation ────────────────────────────────────────────────────────────
function generatePrintHTML(params: {
  form: SATForm
  rwScaled: number; mathScaled: number; totalScore: number
  rwM2Type: 'easy' | 'hard'; mathM2Type: 'easy' | 'hard'
  rwM1Correct: number; rwM2Correct: number; rwTotal: number
  mathM1Correct: number; mathM2Correct: number; mathTotal: number
  aiFeedback: SATAIFeedback | null
  practicePrompts: PracticePrompt[]
  hasMisses: boolean
  missedModules: { label: string; mod: SATModule; section: 'rw' | 'math' }[]
  answers: Record<string, string>
}) {
  const { rwScaled, mathScaled, totalScore, rwM2Type, mathM2Type,
          rwM1Correct, rwM2Correct, rwTotal, mathM1Correct, mathM2Correct, mathTotal,
          aiFeedback, practicePrompts, hasMisses, missedModules, answers } = params

  const FALLBACK_WRONG = 'This choice is incorrect — it does not match the evidence or reasoning required by the question.'

  const missedQsHTML = missedModules.map(({ label, mod, section }) => {
    const qs = mod.questions
      .map((q, i) => ({ q, i, answered: isAnswered(q, answers), correct: isCorrect(q, answers) }))
      .filter(({ answered, correct }) => !answered || !correct)

    if (!qs.length) return ''

    const qCards = qs.map(({ q, i }) => {
      const userAns = answers[q.id] || 'Not answered'
      const correctAns = getCorrectAnswer(q)
      const explanation = getExplanation(q)
      const wrongExp = getWrongAnswerExplanations(q)
      const userWrongExp = (wrongExp as Record<string, string>)[userAns]
      const choices = getChoices(q)
      const stimulus = q.section === 'reading-writing' ? q.stimulus : (q as { stimulus?: string }).stimulus
      const skill = getSkill(q)

      const choicesHTML = choices ? choices.map(c => {
        const col = c.label === correctAns ? '#16a34a' : c.label === userAns ? '#dc2626' : '#64748b'
        const icon = c.label === correctAns ? '✓' : c.label === userAns ? '✗' : '·'
        return `<div style="font-size:12px;padding:4px 0;color:${col}">${icon} ${c.label}. ${c.text}</div>`
      }).join('') : ''

      const wrongChoicesHTML = choices ? choices.filter(c => c.label !== correctAns).map(c => {
        const exp = (wrongExp as Record<string, string>)[c.label] || FALLBACK_WRONG
        return `<div style="margin-top:6px;font-size:11px;color:#7f1d1d;padding:6px 10px;background:#fef2f2;border-radius:4px">
          <strong>Choice ${c.label} incorrect:</strong> ${exp}
        </div>`
      }).join('') : ''

      return `<div style="margin-bottom:20px;padding:16px;border:1px solid #e2e8f0;border-radius:8px;page-break-inside:avoid">
        <div style="font-size:11px;color:#64748b;margin-bottom:8px">${section === 'rw' ? 'Reading &amp; Writing' : 'Math'} · ${mod.title} · Q${i + 1} · ${skill} · ${q.difficulty}</div>
        ${stimulus ? `<div style="font-size:12px;color:#334155;background:#f8fafc;padding:10px;border-radius:6px;margin-bottom:10px;white-space:pre-line">${stimulus.slice(0, 500)}${stimulus.length > 500 ? '…' : ''}</div>` : ''}
        <div style="font-size:13px;font-weight:600;color:#0f172a;margin-bottom:10px">${q.question}</div>
        ${choicesHTML}
        <div style="margin-top:10px;font-size:12px">
          <strong>Your Answer:</strong> ${userAns} &nbsp;|&nbsp; <strong>Correct Answer:</strong> ${correctAns}
        </div>
        <div style="margin-top:8px;font-size:12px;background:#f0fdf4;border:1px solid #bbf7d0;padding:8px;border-radius:4px">
          <strong style="color:#15803d">Why ${correctAns} is correct:</strong> ${explanation}
        </div>
        ${userWrongExp ? `<div style="margin-top:6px;font-size:12px;color:#dc2626"><strong>Why your answer was wrong:</strong> ${userWrongExp}</div>` : ''}
        ${wrongChoicesHTML}
      </div>`
    }).join('')

    return `<div style="margin-bottom:24px">
      <h3 style="font-size:14px;font-weight:700;color:#1b3a5c;margin-bottom:12px;padding-bottom:6px;border-bottom:2px solid #e2e8f0">${label}</h3>
      ${qCards}
    </div>`
  }).join('')

  const feedbackHTML = aiFeedback ? `
    <div style="margin-bottom:24px;padding:16px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px">
      <h2 style="font-size:16px;font-weight:700;color:#1b3a5c;margin-bottom:12px;border-bottom:2px solid #e2e8f0;padding-bottom:8px">AI Performance Feedback</h2>
      <p><strong>Overall:</strong> ${aiFeedback.overallAssessment}</p>
      <p style="margin-top:8px"><strong>What You Did Well:</strong> ${aiFeedback.whatWentWell}</p>
      ${aiFeedback.adaptivePathInsight ? `<p style="margin-top:8px"><strong>Adaptive Path Insight:</strong> ${aiFeedback.adaptivePathInsight}</p>` : ''}
      ${aiFeedback.rwWeaknesses?.length ? `<p style="margin-top:8px"><strong>RW Areas to Review:</strong> ${aiFeedback.rwWeaknesses.join('; ')}</p>` : ''}
      ${aiFeedback.mathWeaknesses?.length ? `<p style="margin-top:8px"><strong>Math Areas to Review:</strong> ${aiFeedback.mathWeaknesses.join('; ')}</p>` : ''}
      ${aiFeedback.carelessErrors ? `<p style="margin-top:8px"><strong>Careless Error Pattern:</strong> ${aiFeedback.carelessErrors}</p>` : ''}
      ${aiFeedback.practiceRecommendations ? `<p style="margin-top:8px"><strong>Practice Plan:</strong> ${aiFeedback.practiceRecommendations}</p>` : ''}
      ${aiFeedback.mockMateNextSteps ? `<p style="margin-top:8px"><strong>MockMate Next Steps:</strong> ${aiFeedback.mockMateNextSteps}</p>` : ''}
    </div>
  ` : ''

  const promptsHTML = practicePrompts.length > 0 ? `
    <div style="margin-bottom:24px">
      <h2 style="font-size:16px;font-weight:700;color:#1b3a5c;margin-bottom:8px;border-bottom:2px solid #e2e8f0;padding-bottom:8px">Practice Prompts to Improve Your Score</h2>
      ${!hasMisses ? `<p style="font-size:12px;color:#64748b;font-style:italic;margin-bottom:12px">No missed questions detected. Here is a general maintenance prompt.</p>` : `<p style="font-size:12px;color:#64748b;margin-bottom:12px">Paste these prompts into MockMate's New Exam to practice your weak skills.</p>`}
      ${practicePrompts.map((p, i) => `
        <div style="margin-bottom:16px;page-break-inside:avoid">
          <div style="font-size:12px;font-weight:700;color:#1b3a5c;margin-bottom:4px">${i + 1}. ${p.title}</div>
          <div style="font-size:11px;color:#64748b;margin-bottom:6px">${p.description}</div>
          <div style="font-size:11px;color:#475569;margin-bottom:4px;font-weight:600">Copy this prompt into MockMate:</div>
          <div style="font-size:11px;color:#374151;background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;padding:12px;white-space:pre-wrap;font-family:monospace;line-height:1.6">${p.prompt.replace(/\*\*/g, '')}</div>
        </div>
      `).join('')}
      <div style="font-size:11px;color:#1e40af;background:#eff6ff;border:1px solid #bfdbfe;border-radius:6px;padding:12px;margin-top:12px">
        <strong>How to use on MockMate:</strong><br>
        1. Go to the side panel and click New Exam.<br>
        2. Paste a prompt into the exam description or notes box.<br>
        3. Under standardized exam targeting, select SAT.<br>
        4. Generate and practice the weak skill again.
      </div>
    </div>
  ` : ''

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>MockMate SAT Practice Test 1 — Score Report</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #1e293b; background: white; padding: 32px; max-width: 800px; margin: 0 auto; font-size: 13px; line-height: 1.6; }
  h1 { font-size: 22px; font-weight: 800; color: #1b3a5c; margin-bottom: 4px; }
  h2 { font-size: 16px; font-weight: 700; color: #1b3a5c; margin-bottom: 12px; padding-bottom: 6px; border-bottom: 2px solid #e2e8f0; }
  .header { border-bottom: 3px solid #1b3a5c; padding-bottom: 16px; margin-bottom: 24px; }
  .subtitle { font-size: 12px; color: #64748b; margin-top: 2px; }
  .score-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin-bottom: 24px; }
  .score-card { padding: 16px; border: 1px solid #e2e8f0; border-radius: 8px; text-align: center; }
  .score-card.total { background: #1b3a5c; color: white; }
  .score-num { font-size: 32px; font-weight: 800; }
  .score-label { font-size: 11px; color: #64748b; margin-bottom: 4px; }
  .score-card.total .score-label { color: rgba(255,255,255,0.7); }
  .score-card.total .score-num { color: white; }
  .disclaimer { font-size: 11px; color: #94a3b8; background: #f8fafc; padding: 10px; border-radius: 6px; margin-bottom: 24px; border: 1px solid #e2e8f0; }
  table { width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 12px; }
  th { background: #f1f5f9; color: #475569; font-weight: 600; text-align: left; padding: 8px 12px; }
  td { padding: 8px 12px; border-bottom: 1px solid #f1f5f9; }
  @media print { body { padding: 16px; } }
</style>
</head>
<body>
<div class="header">
  <h1>MockMate SAT Practice Test 1</h1>
  <div class="subtitle">Score Report · Generated ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
</div>

<h2>Score Summary</h2>
<div class="score-grid">
  <div class="score-card">
    <div class="score-label">Reading &amp; Writing</div>
    <div class="score-num">${rwScaled}</div>
    <div style="font-size:11px;color:#64748b">${rwM1Correct + rwM2Correct}/${rwTotal} correct</div>
  </div>
  <div class="score-card">
    <div class="score-label">Math</div>
    <div class="score-num">${mathScaled}</div>
    <div style="font-size:11px;color:#64748b">${mathM1Correct + mathM2Correct}/${mathTotal} correct</div>
  </div>
  <div class="score-card total">
    <div class="score-label">Total Score</div>
    <div class="score-num">${totalScore}</div>
    <div style="font-size:11px;opacity:0.7">/ 1600</div>
  </div>
</div>

<table>
  <thead><tr><th>Section</th><th>Module</th><th>Raw Score</th><th>Path</th></tr></thead>
  <tbody>
    <tr><td>Reading &amp; Writing</td><td>Module 1</td><td>${rwM1Correct} / 27</td><td>Routing</td></tr>
    <tr><td>Reading &amp; Writing</td><td>Module 2</td><td>${rwM2Correct} / 27</td><td>${rwM2Type.charAt(0).toUpperCase() + rwM2Type.slice(1)}</td></tr>
    <tr><td>Math</td><td>Module 1</td><td>${mathM1Correct} / 22</td><td>Routing</td></tr>
    <tr><td>Math</td><td>Module 2</td><td>${mathM2Correct} / 22</td><td>${mathM2Type.charAt(0).toUpperCase() + mathM2Type.slice(1)}</td></tr>
  </tbody>
</table>

<div class="disclaimer">This is a MockMate SAT-style estimated score report. It is not an official College Board score. Scores are approximations based on adaptive module performance.</div>

${feedbackHTML}

${promptsHTML}

<h2>Missed / Unanswered Questions</h2>
${missedQsHTML || '<p style="color:#64748b;font-style:italic">No missed questions — perfect score!</p>'}
</body>
</html>`
}

// ─── Stable overlay wrappers (defined outside main component so React never
//     remounts them on timer ticks or other state changes) ────────────────────
function ExamWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 bg-[#eef0f4] flex flex-col overflow-hidden">
      {children}
    </div>
  )
}

function DirectionsLayout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <ExamWrapper>
      <div className="flex flex-col h-full">
        <div className="shrink-0 h-11 bg-[#1b3a5c] flex items-center px-4">
          <span className="text-white text-[13px] font-semibold">{title}</span>
        </div>
        <div className="flex-1 overflow-y-auto flex items-center justify-center p-6">
          {children}
        </div>
      </div>
    </ExamWrapper>
  )
}

// ─── NavBar ───────────────────────────────────────────────────────────────────
function NavBar({
  onBack, onNext, canGoBack, centerLabel, timerEl, onReview, showReview,
  isBookmarked, onBookmark,
}: {
  onBack: () => void; onNext: () => void; canGoBack: boolean
  centerLabel: React.ReactNode; timerEl?: React.ReactNode
  onReview?: () => void; showReview?: boolean
  isBookmarked?: boolean; onBookmark?: () => void
}) {
  return (
    <header className="shrink-0 h-11 bg-[#1b3a5c] flex items-center px-3 text-white select-none gap-2">
      <div className="flex items-center gap-0.5 shrink-0">
        <button
          onClick={onBack} disabled={!canGoBack} title="Previous (←)"
          className="flex h-8 w-8 items-center justify-center rounded hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} className="h-4 w-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <button
          onClick={onNext} title="Next (→)"
          className="flex h-8 w-8 items-center justify-center rounded hover:bg-white/10 transition-colors"
        >
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} className="h-4 w-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
      <div className="flex-1 text-center min-w-0 px-2 text-[12px] font-medium text-white/90 truncate">
        {centerLabel}
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {timerEl}
        {showReview && onReview && (
          <button onClick={onReview} className="text-[11px] font-semibold px-2.5 py-1 rounded border border-white/30 hover:bg-white/10 transition-colors">
            Review
          </button>
        )}
        {onBookmark && (
          <button
            onClick={onBookmark}
            title={isBookmarked ? 'Remove bookmark' : 'Bookmark'}
            className={cn('flex h-7 w-7 items-center justify-center rounded transition-colors', isBookmarked ? 'text-amber-400' : 'text-white/50 hover:text-white/80')}
          >
            <svg fill={isBookmarked ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
            </svg>
          </button>
        )}
      </div>
    </header>
  )
}

function TimerDisplay({ secs }: { secs: number }) {
  const urgent = secs <= 300
  return (
    <span className={cn('font-mono text-[12px] font-semibold px-2 py-0.5 rounded', urgent ? 'text-red-300' : 'text-white/80')}>
      {formatTime(secs)}
    </span>
  )
}

// ─── Main component ────────────────────────────────────────────────────────────
export default function SATExamTaker({ form }: { form: SATForm }) {
  // ── Password gate ──────────────────────────────────────────────────────────
  const [unlocked, setUnlocked] = useState(false)
  const [passwordInput, setPasswordInput] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [passwordChecking, setPasswordChecking] = useState(false)

  // ── Exam state ─────────────────────────────────────────────────────────────
  const [phase, setPhase] = useState<SATPhase>({ tag: 'welcome' })
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set())
  const [rwM2Type, setRwM2Type] = useState<'easy' | 'hard'>('easy')
  const [mathM2Type, setMathM2Type] = useState<'easy' | 'hard'>('easy')
  const [secsLeft, setSecsLeft] = useState(0)
  const [timerRunning, setTimerRunning] = useState(false)
  const [aiFeedback, setAiFeedback] = useState<SATAIFeedback | null>(null)
  const [aiFeedbackLoading, setAiFeedbackLoading] = useState(false)
  const [aiFeedbackError, setAiFeedbackError] = useState('')
  const [answerFilter, setAnswerFilter] = useState<AnswerFilter>('all')
  const [isFullscreen, setIsFullscreen] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const rwSection = form.sections[0]
  const mathSection = form.sections[1]

  const getM2Module = useCallback((section: 'rw' | 'math', type: 'easy' | 'hard'): SATModule => {
    const sec = section === 'rw' ? rwSection : mathSection
    return type === 'hard' ? sec.modules[2] : sec.modules[1]
  }, [rwSection, mathSection])

  const getActiveModule = useCallback((section: 'rw' | 'math', slot: 'm1' | 'm2'): SATModule => {
    if (slot === 'm1') return section === 'rw' ? rwSection.modules[0] : mathSection.modules[0]
    return getM2Module(section, section === 'rw' ? rwM2Type : mathM2Type)
  }, [rwSection, mathSection, rwM2Type, mathM2Type, getM2Module])

  // ── Password check ─────────────────────────────────────────────────────────
  const handlePasswordSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    if (!passwordInput.trim()) return
    setPasswordChecking(true)
    setPasswordError('')
    try {
      const res = await fetch('/api/sat-verify-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput }),
      })
      const { valid } = await res.json() as { valid: boolean }
      if (valid) {
        setUnlocked(true)
      } else {
        setPasswordError('Incorrect password. Please try again.')
        setPasswordInput('')
      }
    } catch {
      setPasswordError('Something went wrong. Please try again.')
    } finally {
      setPasswordChecking(false)
    }
  }, [passwordInput])

  // ── Fullscreen API ─────────────────────────────────────────────────────────
  const enterFullscreen = useCallback(async () => {
    try {
      await document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } catch {
      // blocked — fixed overlay still covers viewport
    }
  }, [])

  useEffect(() => {
    const onFSChange = () => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', onFSChange)
    return () => {
      document.removeEventListener('fullscreenchange', onFSChange)
      if (document.fullscreenElement) document.exitFullscreen().catch(() => {})
    }
  }, [])

  // ── Timer ──────────────────────────────────────────────────────────────────
  const startTimer = useCallback((minutes: number) => {
    if (timerRef.current) clearInterval(timerRef.current)
    setSecsLeft(minutes * 60)
    setTimerRunning(true)
  }, [])

  useEffect(() => {
    if (!timerRunning) return
    timerRef.current = setInterval(() => {
      setSecsLeft(s => {
        if (s <= 1) { clearInterval(timerRef.current!); setTimerRunning(false); return 0 }
        return s - 1
      })
    }, 1000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [timerRunning])

  const stopTimer = useCallback(() => {
    setTimerRunning(false)
    if (timerRef.current) clearInterval(timerRef.current)
  }, [])

  // ── Routing ────────────────────────────────────────────────────────────────
  const handleRWM1Complete = useCallback(() => {
    const correct = countCorrect(rwSection.modules[0], answers)
    setRwM2Type(correct >= form.rwRoutingThreshold ? 'hard' : 'easy')
    stopTimer()
    setPhase({ tag: 'rw_break' })
  }, [rwSection, answers, form.rwRoutingThreshold, stopTimer])

  const handleMathM1Complete = useCallback(() => {
    const correct = countCorrect(mathSection.modules[0], answers)
    setMathM2Type(correct >= form.mathRoutingThreshold ? 'hard' : 'easy')
    stopTimer()
    setPhase({ tag: 'math_break' })
  }, [mathSection, answers, form.mathRoutingThreshold, stopTimer])

  // ── Auto-advance on timer expiry ───────────────────────────────────────────
  useEffect(() => {
    if (timerRunning || secsLeft > 0 || phase.tag !== 'question') return
    if (phase.slot === 'm1') {
      if (phase.section === 'rw') handleRWM1Complete()
      else handleMathM1Complete()
    } else {
      if (phase.section === 'rw') { stopTimer(); setPhase({ tag: 'section_break' }) }
      else { stopTimer(); setPhase({ tag: 'end' }) }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerRunning, secsLeft])

  // ── Navigation ─────────────────────────────────────────────────────────────
  const handleBack = useCallback(() => {
    if (phase.tag !== 'question' || phase.qIdx <= 0) return
    setPhase({ ...phase, qIdx: phase.qIdx - 1 })
  }, [phase])

  const handleNext = useCallback(() => {
    if (phase.tag !== 'question') return
    const mod = getActiveModule(phase.section, phase.slot)
    if (phase.qIdx < mod.questionCount - 1) {
      setPhase({ ...phase, qIdx: phase.qIdx + 1 })
      return
    }
    if (phase.slot === 'm1') {
      if (phase.section === 'rw') handleRWM1Complete()
      else handleMathM1Complete()
    } else {
      stopTimer()
      setPhase(phase.section === 'rw' ? { tag: 'section_break' } : { tag: 'end' })
    }
  }, [phase, getActiveModule, handleRWM1Complete, handleMathM1Complete, stopTimer])

  // ── Keyboard navigation ────────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase()
      if (['input', 'textarea', 'select'].includes(tag)) return
      if ((e.target as HTMLElement)?.isContentEditable) return
      if (phase.tag !== 'question') return
      if (e.key === 'ArrowRight') { e.preventDefault(); handleNext() }
      if (e.key === 'ArrowLeft') { e.preventDefault(); handleBack() }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [phase, handleNext, handleBack])

  // ── Answers & bookmarks ────────────────────────────────────────────────────
  const setAnswer = useCallback((qId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [qId]: value }))
  }, [])

  const toggleBookmark = useCallback((qId: string) => {
    setBookmarks(prev => { const n = new Set(prev); n.has(qId) ? n.delete(qId) : n.add(qId); return n })
  }, [])

  // ── Score computation ──────────────────────────────────────────────────────
  const rwM1Module = rwSection.modules[0]
  const rwM2Module = getM2Module('rw', rwM2Type)
  const mathM1Module = mathSection.modules[0]
  const mathM2Module = getM2Module('math', mathM2Type)

  const rwM1Correct = countCorrect(rwM1Module, answers)
  const rwM2Correct = countCorrect(rwM2Module, answers)
  const rwRaw = rwM1Correct + rwM2Correct
  const rwTotal = rwM1Module.questionCount + rwM2Module.questionCount

  const mathM1Correct = countCorrect(mathM1Module, answers)
  const mathM2Correct = countCorrect(mathM2Module, answers)
  const mathRaw = mathM1Correct + mathM2Correct
  const mathTotal = mathM1Module.questionCount + mathM2Module.questionCount

  const rwScaled = roundSATScore(convertRWScore(rwRaw, rwM2Type === 'hard'))
  const mathScaled = roundSATScore(convertMathScore(mathRaw, mathM2Type === 'hard'))
  const totalScore = rwScaled + mathScaled

  // ── AI Feedback ────────────────────────────────────────────────────────────
  const fetchAIFeedback = useCallback(async () => {
    if (aiFeedback || aiFeedbackLoading) return
    setAiFeedbackLoading(true)
    setAiFeedbackError('')
    try {
      const rwSkillBreakdown = buildSkillBreakdown([rwM1Module, rwM2Module], answers)
      const mathSkillBreakdown = buildSkillBreakdown([mathM1Module, mathM2Module], answers)
      const missedQuestions = [
        ...rwM1Module.questions, ...rwM2Module.questions,
        ...mathM1Module.questions, ...mathM2Module.questions,
      ]
        .filter(q => !isAnswered(q, answers) || !isCorrect(q, answers))
        .map(q => ({
          section: q.section === 'reading-writing' ? 'Reading & Writing' : 'Math',
          module: q.moduleId,
          skill: getSkill(q),
          domain: q.domain,
          difficulty: q.difficulty,
          question: q.question,
          userAnswer: answers[q.id] || 'not answered',
          correctAnswer: getCorrectAnswer(q),
        }))

      const res = await fetch('/api/sat-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rwM1Correct, rwM1Total: rwM1Module.questionCount,
          rwM2Correct, rwM2Total: rwM2Module.questionCount, rwM2Type,
          mathM1Correct, mathM1Total: mathM1Module.questionCount,
          mathM2Correct, mathM2Total: mathM2Module.questionCount, mathM2Type,
          rwScaled, mathScaled, totalScore,
          rwSkillBreakdown, mathSkillBreakdown,
          missedQuestions,
        }),
      })
      if (!res.ok) throw new Error('API error')
      setAiFeedback(await res.json())
    } catch {
      setAiFeedbackError('Could not generate AI feedback. Check your connection and try again.')
    } finally {
      setAiFeedbackLoading(false)
    }
  }, [aiFeedback, aiFeedbackLoading, rwM1Module, rwM2Module, mathM1Module, mathM2Module, answers,
      rwM1Correct, rwM2Correct, rwM2Type, mathM1Correct, mathM2Correct, mathM2Type,
      rwScaled, mathScaled, totalScore])

  useEffect(() => {
    if (phase.tag === 'results') fetchAIFeedback()
  }, [phase.tag, fetchAIFeedback])

  // ── Retake ─────────────────────────────────────────────────────────────────
  const handleRetake = useCallback(() => {
    setPhase({ tag: 'welcome' })
    setAnswers({}); setBookmarks(new Set())
    setRwM2Type('easy'); setMathM2Type('easy')
    setSecsLeft(0); setTimerRunning(false)
    setAiFeedback(null); setAiFeedbackLoading(false); setAiFeedbackError('')
    setAnswerFilter('all')
    // unlocked stays true — no re-auth needed for retake
  }, [])

  // ─────────────────────────────────────────────────────────────────────────
  // PASSWORD GATE (shown before welcome when !unlocked)
  // ─────────────────────────────────────────────────────────────────────────
  if (!unlocked) {
    return (
      <div className="fixed inset-0 z-50 bg-[#eef0f4] flex flex-col overflow-hidden">
        <div className="shrink-0 h-11 bg-[#1b3a5c] flex items-center px-4">
          <span className="text-white text-[13px] font-semibold">MockMate</span>
          <span className="text-white/30 text-[13px] mx-2">·</span>
          <span className="text-white/70 text-[13px]">{form.title}</span>
        </div>
        <div className="flex-1 overflow-y-auto flex items-center justify-center p-6">
          <div className="w-full max-w-md bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-[#1b3a5c] px-6 py-5 text-center">
              <div className="h-12 w-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
              </div>
              <h1 className="text-[17px] font-bold text-white">{form.title}</h1>
            </div>
            <div className="px-6 py-6">
              <p className="text-[13px] text-slate-600 text-center mb-5">
                Enter the access password to begin SAT Practice Test 1.
              </p>
              <form onSubmit={handlePasswordSubmit} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-widest mb-1.5">
                    Password
                  </label>
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={e => { setPasswordInput(e.target.value); setPasswordError('') }}
                    placeholder="Enter password"
                    autoFocus
                    className="w-full border-2 border-slate-200 rounded-lg px-4 py-2.5 text-[14px] text-slate-900 focus:border-[#1d4ed8] focus:outline-none transition-colors"
                  />
                </div>
                {passwordError && (
                  <p className="text-[12px] text-red-600 font-medium">{passwordError}</p>
                )}
                <button
                  type="submit"
                  disabled={!passwordInput.trim() || passwordChecking}
                  className="w-full bg-[#1d4ed8] hover:bg-[#1e40af] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-lg text-[14px] transition-colors flex items-center justify-center gap-2"
                >
                  {passwordChecking ? (
                    <>
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                      </svg>
                      Checking…
                    </>
                  ) : 'Unlock Test'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ─────────────────────────────────────────────────────────────────────────
  // PHASE: WELCOME
  // ─────────────────────────────────────────────────────────────────────────
  if (phase.tag === 'welcome') {
    return (
      <ExamWrapper>
        <div className="flex flex-col h-full">
          <div className="shrink-0 h-11 bg-[#1b3a5c] flex items-center px-4 gap-3">
            <span className="text-white text-[13px] font-semibold">MockMate</span>
            <span className="text-white/30 text-[13px]">·</span>
            <span className="text-white/70 text-[13px]">{form.title}</span>
            <div className="ml-auto">
              <button
                onClick={enterFullscreen}
                title="Enter Full Screen"
                className="text-[11px] text-white/60 hover:text-white/90 flex items-center gap-1.5 transition-colors"
              >
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                </svg>
                {isFullscreen ? 'Full Screen' : 'Enter Full Screen'}
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto flex items-center justify-center p-6">
            <div className="w-full max-w-2xl bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200">
              <div className="bg-[#1b3a5c] px-8 py-6">
                <h1 className="text-[18px] font-bold text-white leading-tight">{form.title}</h1>
                <p className="text-[12px] text-white/60 mt-1">{form.description}</p>
              </div>
              <div className="px-8 py-6 flex gap-8">
                <div className="flex-1 space-y-4">
                  <h2 className="text-[12px] font-semibold text-slate-500 uppercase tracking-widest">Exam Details</h2>
                  <div className="space-y-3">
                    {[
                      { label: 'Format', value: 'Adaptive (MST)' },
                      { label: 'Total Questions', value: '98 questions' },
                      { label: 'Sections', value: 'Reading & Writing · Math' },
                      { label: 'Total Time', value: '2 hr 14 min' },
                      { label: 'Score Range', value: '400–1600' },
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <p className="text-[11px] text-slate-400">{label}</p>
                        <p className="text-[13px] font-semibold text-slate-800">{value}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{form.disclaimer}</p>
                </div>
                <div className="flex flex-col items-center justify-center gap-5 pl-8 border-l border-slate-100">
                  <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="h-8 w-8 text-slate-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  </div>
                  <button
                    onClick={() => setPhase({ tag: 'rw_directions' })}
                    className="bg-[#1d4ed8] hover:bg-[#1e40af] text-white text-[14px] font-semibold px-6 py-2.5 rounded-lg transition-colors"
                  >
                    Start Test
                  </button>
                  <p className="text-[10px] text-slate-400 text-center">Tip: Use ← → to move<br/>between questions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ExamWrapper>
    )
  }

  // ─────────────────────────────────────────────────────────────────────────
  // DIRECTIONS / BREAK SCREENS
  // ─────────────────────────────────────────────────────────────────────────
  if (phase.tag === 'rw_directions') {
    return (
      <DirectionsLayout title="Reading and Writing">
        <div className="w-full max-w-xl bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <h2 className="text-[18px] font-bold text-slate-900 mb-4">Reading and Writing</h2>
          <div className="text-[13px] text-slate-700 space-y-3 leading-relaxed mb-6">
            <p>This section contains <strong>two modules</strong> of 27 questions each. You have <strong>32 minutes</strong> per module.</p>
            <p>Questions draw on short passages from Literature, History/Social Studies, and Science. Each passage is followed by a single question.</p>
            <p><strong>You may not return to a previous module</strong> once you advance. Within a module you may move freely between questions.</p>
            <p>Skill areas: Words in Context · Text Structure and Purpose · Central Ideas and Details · Command of Evidence · Inferences · Cross-Text Connections · Rhetorical Synthesis · Transitions · Boundaries · Form, Structure, and Sense</p>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-[12px] text-blue-800 mb-6">
            <p className="font-semibold mb-1">Adaptive scoring</p>
            <p>Your Module 1 score determines which Module 2 you receive. Both modules count toward your final score (200–800).</p>
          </div>
          <button
            onClick={() => { startTimer(rwSection.modules[0].timeMinutes); setPhase({ tag: 'question', section: 'rw', slot: 'm1', qIdx: 0 }) }}
            className="w-full bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-semibold py-2.5 rounded-lg transition-colors"
          >
            Begin Module 1
          </button>
        </div>
      </DirectionsLayout>
    )
  }

  if (phase.tag === 'rw_break') {
    return (
      <DirectionsLayout title="Reading and Writing">
        <div className="w-full max-w-md bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center">
          <div className="h-12 w-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-6 w-6 text-green-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-[18px] font-bold text-slate-900 mb-2">Module 1 Complete</h2>
          <p className="text-[13px] text-slate-500 mb-6">Module 2 will now begin. You have 32 minutes.</p>
          <button
            onClick={() => { const m2 = getM2Module('rw', rwM2Type); startTimer(m2.timeMinutes); setPhase({ tag: 'question', section: 'rw', slot: 'm2', qIdx: 0 }) }}
            className="w-full bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-semibold py-2.5 rounded-lg transition-colors"
          >
            Begin Module 2
          </button>
        </div>
      </DirectionsLayout>
    )
  }

  if (phase.tag === 'section_break') {
    return (
      <DirectionsLayout title="Break">
        <div className="w-full max-w-md bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center">
          <h2 className="text-[18px] font-bold text-slate-900 mb-2">Reading and Writing Complete</h2>
          <p className="text-[13px] text-slate-500 mb-6">Take a short break. The Math section is next.</p>
          <button onClick={() => setPhase({ tag: 'math_directions' })} className="w-full bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-semibold py-2.5 rounded-lg transition-colors">
            Continue to Math
          </button>
        </div>
      </DirectionsLayout>
    )
  }

  if (phase.tag === 'math_directions') {
    return (
      <DirectionsLayout title="Math">
        <div className="w-full max-w-xl bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <h2 className="text-[18px] font-bold text-slate-900 mb-4">Math</h2>
          <div className="text-[13px] text-slate-700 space-y-3 leading-relaxed mb-6">
            <p>This section contains <strong>two modules</strong> of 22 questions each. You have <strong>35 minutes</strong> per module.</p>
            <p>Question types: <strong>multiple choice</strong> (4 options) and <strong>grid-in</strong> (enter your own answer).</p>
            <p><strong>Calculator permitted</strong> for all Math questions.</p>
            <p>Domains: Algebra · Advanced Math · Problem-Solving and Data Analysis · Geometry and Trigonometry</p>
          </div>
          <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 text-[12px] text-amber-800 mb-6">
            <p className="font-semibold mb-1">Grid-in answers</p>
            <p>Enter fractions as "3/4", decimals as ".75" or "0.75". You cannot enter mixed numbers — convert to improper fractions.</p>
          </div>
          <button
            onClick={() => { startTimer(mathSection.modules[0].timeMinutes); setPhase({ tag: 'question', section: 'math', slot: 'm1', qIdx: 0 }) }}
            className="w-full bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-semibold py-2.5 rounded-lg transition-colors"
          >
            Begin Module 1
          </button>
        </div>
      </DirectionsLayout>
    )
  }

  if (phase.tag === 'math_break') {
    return (
      <DirectionsLayout title="Math">
        <div className="w-full max-w-md bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center">
          <div className="h-12 w-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-6 w-6 text-green-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-[18px] font-bold text-slate-900 mb-2">Module 1 Complete</h2>
          <p className="text-[13px] text-slate-500 mb-6">Module 2 will now begin. You have 35 minutes.</p>
          <button
            onClick={() => { const m2 = getM2Module('math', mathM2Type); startTimer(m2.timeMinutes); setPhase({ tag: 'question', section: 'math', slot: 'm2', qIdx: 0 }) }}
            className="w-full bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-semibold py-2.5 rounded-lg transition-colors"
          >
            Begin Module 2
          </button>
        </div>
      </DirectionsLayout>
    )
  }

  // ─────────────────────────────────────────────────────────────────────────
  // PHASE: QUESTION
  // ─────────────────────────────────────────────────────────────────────────
  if (phase.tag === 'question') {
    const mod = getActiveModule(phase.section, phase.slot)
    const q = mod.questions[phase.qIdx]
    const qNum = phase.qIdx + 1
    const qTotal = mod.questionCount
    const bookmarked = bookmarks.has(q.id)
    const currentAnswer = answers[q.id] ?? ''
    const isMC = q.section === 'reading-writing' || (q as MathMCQuestion | MathGridInQuestion).type === 'multiple_choice'
    const choices = isMC ? getChoices(q) : null
    const gridInQ = !isMC ? (q as MathGridInQuestion) : null
    const stimulus = q.section === 'reading-writing' ? q.stimulus : (q as { stimulus?: string }).stimulus
    const sectionLabel = phase.section === 'rw' ? 'Reading and Writing' : 'Math'
    const moduleLabel = `Module ${phase.slot === 'm1' ? '1' : '2'}`
    const centerLabel = `${sectionLabel} — ${moduleLabel} | Q ${qNum} of ${qTotal}`
    const isLastInModule = phase.qIdx === qTotal - 1

    return (
      <ExamWrapper>
        <div className="flex flex-col h-full">
          <NavBar
            canGoBack={phase.qIdx > 0}
            onBack={handleBack}
            onNext={handleNext}
            centerLabel={centerLabel}
            timerEl={<TimerDisplay secs={secsLeft} />}
            showReview={true}
            onReview={() => setPhase({ tag: 'end' })}
            isBookmarked={bookmarked}
            onBookmark={() => toggleBookmark(q.id)}
          />

          <div className="flex-1 overflow-y-auto">
            <div className="max-w-3xl mx-auto px-4 py-6">
              {stimulus && (
                <div className="bg-white rounded-xl border border-slate-200 p-5 mb-4 text-[13px] text-slate-800 leading-[1.85] whitespace-pre-line">
                  {stimulus}
                </div>
              )}

              <div className="bg-white rounded-xl border border-slate-200 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
                    {q.domain} · {getSkill(q)}
                  </span>
                  {bookmarked && <span className="text-[10px] font-semibold text-amber-500 uppercase tracking-widest">Bookmarked</span>}
                </div>
                <p className="text-[14px] text-slate-900 font-medium leading-snug mb-5">{q.question}</p>

                {choices && (
                  <div className="space-y-2">
                    {choices.map(choice => {
                      const selected = currentAnswer === choice.label
                      return (
                        <button
                          key={choice.label}
                          onClick={() => setAnswer(q.id, choice.label)}
                          className={cn(
                            'w-full text-left flex items-start gap-3 px-4 py-3 rounded-lg border text-[13px] transition-all',
                            selected ? 'border-[#1d4ed8] bg-blue-50 text-[#1d4ed8]' : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50',
                          )}
                        >
                          <span className={cn('shrink-0 h-5 w-5 rounded-full border-2 flex items-center justify-center text-[10px] font-bold mt-0.5',
                            selected ? 'border-[#1d4ed8] bg-[#1d4ed8] text-white' : 'border-slate-300 text-slate-500'
                          )}>
                            {choice.label}
                          </span>
                          <span className="leading-snug">{choice.text}</span>
                        </button>
                      )
                    })}
                  </div>
                )}

                {gridInQ && (
                  <div className="mt-2">
                    <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-2">Enter your answer</label>
                    <input
                      type="text"
                      value={currentAnswer}
                      onChange={e => setAnswer(q.id, e.target.value)}
                      placeholder="e.g. 4, 3/4, .75"
                      className="w-48 border-2 border-slate-200 rounded-lg px-4 py-2 text-[14px] font-mono text-slate-900 focus:border-[#1d4ed8] focus:outline-none transition-colors"
                    />
                  </div>
                )}
              </div>

              <div className="mt-3 flex items-center justify-between">
                <p className="text-[10px] text-slate-400">Tip: Use ← → to move between questions</p>
                {isLastInModule && (
                  <button
                    onClick={handleNext}
                    className="bg-[#1d4ed8] hover:bg-[#1e40af] text-white text-[13px] font-semibold px-5 py-2.5 rounded-lg transition-colors"
                  >
                    {phase.slot === 'm1' ? 'Submit Module 1 →' : phase.section === 'rw' ? 'Submit RW Section →' : 'Submit Math Section →'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </ExamWrapper>
    )
  }

  // ─────────────────────────────────────────────────────────────────────────
  // PHASE: END (review)
  // ─────────────────────────────────────────────────────────────────────────
  if (phase.tag === 'end') {
    const groups = [
      { label: 'Reading and Writing — Module 1', questions: rwM1Module.questions, section: 'rw' as const, slot: 'm1' as const },
      { label: `Reading and Writing — Module 2 (${rwM2Type})`, questions: rwM2Module.questions, section: 'rw' as const, slot: 'm2' as const },
      { label: 'Math — Module 1', questions: mathM1Module.questions, section: 'math' as const, slot: 'm1' as const },
      { label: `Math — Module 2 (${mathM2Type})`, questions: mathM2Module.questions, section: 'math' as const, slot: 'm2' as const },
    ]

    return (
      <ExamWrapper>
        <div className="flex flex-col h-full">
          <div className="shrink-0 h-11 bg-[#1b3a5c] flex items-center px-4">
            <span className="text-white text-[13px] font-semibold">Review Answers</span>
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-[18px] font-bold text-slate-900 mb-1">Review Your Answers</h2>
              <p className="text-[13px] text-slate-500 mb-6">Click any number to return to that question.</p>

              {groups.map((g, gi) => (
                <div key={gi} className="mb-6">
                  <h3 className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-3">{g.label}</h3>
                  <div className="flex flex-wrap gap-2">
                    {g.questions.map((q, qi) => {
                      const answered = isAnswered(q, answers)
                      const bm = bookmarks.has(q.id)
                      return (
                        <button
                          key={q.id}
                          onClick={() => setPhase({ tag: 'question', section: g.section, slot: g.slot, qIdx: qi })}
                          className={cn(
                            'h-8 w-8 rounded text-[12px] font-semibold border transition-all relative',
                            answered ? 'bg-[#1d4ed8] border-[#1d4ed8] text-white' : 'bg-white border-slate-200 text-slate-500 hover:border-slate-400',
                            bm && 'ring-2 ring-amber-400 ring-offset-1',
                          )}
                        >
                          {qi + 1}
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}

              <div className="flex items-center gap-4 text-[12px] text-slate-500 mb-6">
                <div className="flex items-center gap-1.5"><span className="h-4 w-4 rounded bg-[#1d4ed8]" /> Answered</div>
                <div className="flex items-center gap-1.5"><span className="h-4 w-4 rounded bg-white border border-slate-200" /> Unanswered</div>
                <div className="flex items-center gap-1.5"><span className="h-4 w-4 rounded ring-2 ring-amber-400" /> Bookmarked</div>
              </div>

              <button
                onClick={() => setPhase({ tag: 'results' })}
                className="w-full bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-semibold py-3 rounded-lg text-[14px] transition-colors"
              >
                Submit and See Results
              </button>
            </div>
          </div>
        </div>
      </ExamWrapper>
    )
  }

  // ─────────────────────────────────────────────────────────────────────────
  // PHASE: RESULTS
  // ─────────────────────────────────────────────────────────────────────────
  if (phase.tag === 'results') {
    const allModulesFlat = [
      { label: 'Reading and Writing — Module 1', mod: rwM1Module, section: 'rw' as const },
      { label: `Reading and Writing — Module 2 (${rwM2Type})`, mod: rwM2Module, section: 'rw' as const },
      { label: 'Math — Module 1', mod: mathM1Module, section: 'math' as const },
      { label: `Math — Module 2 (${mathM2Type})`, mod: mathM2Module, section: 'math' as const },
    ]

    const allFlat: FlatQItem[] = allModulesFlat.flatMap(({ label, mod, section }) =>
      mod.questions.map((q, qi) => ({
        q, qi, modLabel: label, section,
        answered: isAnswered(q, answers),
        correct: isCorrect(q, answers),
      }))
    )

    const hasMisses = allFlat.some(x => !x.answered || !x.correct)
    const practicePrompts = buildPracticePrompts(allFlat)

    const filterTabs: { key: AnswerFilter; label: string }[] = [
      { key: 'all', label: 'All' },
      { key: 'incorrect', label: 'Incorrect' },
      { key: 'unanswered', label: 'Unanswered' },
      { key: 'rw', label: 'Reading & Writing' },
      { key: 'math', label: 'Math' },
      { key: 'marked', label: 'Marked' },
    ]

    const filteredFlat = allFlat.filter(({ q, section, answered, correct }) => {
      if (answerFilter === 'incorrect') return answered && !correct
      if (answerFilter === 'unanswered') return !answered
      if (answerFilter === 'rw') return section === 'rw'
      if (answerFilter === 'math') return section === 'math'
      if (answerFilter === 'marked') return bookmarks.has(q.id)
      return true
    })

    const FALLBACK_WRONG = 'This choice is incorrect — it does not match the evidence or reasoning required by the question.'

    const downloadPDF = () => {
      const missedModules = [
        { label: 'Reading and Writing — Module 1', mod: rwM1Module, section: 'rw' as const },
        { label: `Reading and Writing — Module 2 (${rwM2Type})`, mod: rwM2Module, section: 'rw' as const },
        { label: 'Math — Module 1', mod: mathM1Module, section: 'math' as const },
        { label: `Math — Module 2 (${mathM2Type})`, mod: mathM2Module, section: 'math' as const },
      ]
      const html = generatePrintHTML({
        form, rwScaled, mathScaled, totalScore,
        rwM2Type, mathM2Type,
        rwM1Correct, rwM2Correct, rwTotal,
        mathM1Correct, mathM2Correct, mathTotal,
        aiFeedback, practicePrompts, hasMisses, missedModules, answers,
      })
      const w = window.open('', '_blank')
      if (!w) return
      w.document.write(html)
      w.document.close()
      setTimeout(() => w.print(), 500)
    }

    return (
      <div className="space-y-6 pb-10">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900">Results — {form.title}</h1>
          <button
            onClick={handleRetake}
            className="border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-[13px] font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            Retake Test
          </button>
        </div>

        {/* 1. Score summary */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-4">Estimated Score</h2>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="text-center">
              <p className="text-[11px] text-slate-400 mb-1">Reading &amp; Writing</p>
              <p className="text-[36px] font-bold text-slate-900">{rwScaled}</p>
              <p className="text-[11px] text-slate-400">{rwM1Correct + rwM2Correct}/{rwTotal} correct</p>
            </div>
            <div className="text-[28px] text-slate-200 font-light">+</div>
            <div className="text-center">
              <p className="text-[11px] text-slate-400 mb-1">Math</p>
              <p className="text-[36px] font-bold text-slate-900">{mathScaled}</p>
              <p className="text-[11px] text-slate-400">{mathM1Correct + mathM2Correct}/{mathTotal} correct</p>
            </div>
            <div className="text-[28px] text-slate-200 font-light">=</div>
            <div className="text-center bg-[#1b3a5c] text-white rounded-xl px-6 py-4">
              <p className="text-[11px] text-white/60 mb-1">Total Score</p>
              <p className="text-[42px] font-bold leading-none">{totalScore}</p>
              <p className="text-[11px] text-white/60">/ 1600</p>
            </div>
          </div>

          {/* 2. Module performance */}
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-[12px]">
            {[
              { label: 'RW Module 1', val: `${rwM1Correct}/27` },
              { label: `RW Module 2 (${rwM2Type})`, val: `${rwM2Correct}/27` },
              { label: 'Math Module 1', val: `${mathM1Correct}/22` },
              { label: `Math Module 2 (${mathM2Type})`, val: `${mathM2Correct}/22` },
            ].map(({ label, val }) => (
              <div key={label} className="bg-slate-50 rounded-lg px-3 py-2">
                <p className="text-[10px] text-slate-400">{label}</p>
                <p className="font-semibold text-slate-700">{val}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[11px] text-slate-400">Scores are estimated. Not an official College Board result.</p>
        </div>

        {/* PDF download */}
        <div className="flex justify-center mt-6 mb-8">
          <button
            onClick={downloadPDF}
            className="flex items-center gap-2 bg-[#1b3a5c] hover:bg-[#152d48] text-white text-[14px] font-semibold px-6 py-3 rounded-xl transition-colors shadow-sm"
          >
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Download PDF Score Report
          </button>
        </div>

        {/* 3. AI Feedback */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-[15px] font-bold text-slate-900">AI Performance Feedback</h2>
            {!aiFeedback && !aiFeedbackLoading && (
              <button onClick={fetchAIFeedback} className="text-[12px] text-[#1d4ed8] hover:underline font-medium">Generate</button>
            )}
          </div>
          <div className="p-6">
            {aiFeedbackLoading && (
              <div className="flex items-center gap-3 text-[13px] text-slate-500">
                <svg className="animate-spin h-4 w-4 text-[#1d4ed8]" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                Analyzing your performance…
              </div>
            )}
            {aiFeedbackError && <p className="text-[13px] text-red-600">{aiFeedbackError}</p>}
            {aiFeedback && (
              <div className="space-y-5 text-[13px] text-slate-700 leading-relaxed">
                {aiFeedback.overallAssessment && (
                  <div>
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-1">Overall Assessment</p>
                    <p>{aiFeedback.overallAssessment}</p>
                  </div>
                )}
                {aiFeedback.whatWentWell && (
                  <div>
                    <p className="text-[11px] font-semibold text-green-600 uppercase tracking-widest mb-1">What You Did Well</p>
                    <p>{aiFeedback.whatWentWell}</p>
                  </div>
                )}
                {aiFeedback.adaptivePathInsight && (
                  <div>
                    <p className="text-[11px] font-semibold text-blue-600 uppercase tracking-widest mb-1">Adaptive Path Insight</p>
                    <p>{aiFeedback.adaptivePathInsight}</p>
                  </div>
                )}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-slate-50 rounded-lg p-4 space-y-2">
                    <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest">Reading &amp; Writing</p>
                    {aiFeedback.rwStrengths?.length > 0 && (
                      <div>
                        <p className="text-[11px] font-semibold text-green-600 mb-1">Strengths</p>
                        <ul className="list-disc list-inside space-y-0.5">
                          {aiFeedback.rwStrengths.map((s, i) => <li key={i} className="text-[12px]">{s}</li>)}
                        </ul>
                      </div>
                    )}
                    {aiFeedback.rwWeaknesses?.length > 0 && (
                      <div>
                        <p className="text-[11px] font-semibold text-red-500 mb-1">To Improve</p>
                        <ul className="list-disc list-inside space-y-0.5">
                          {aiFeedback.rwWeaknesses.map((s, i) => <li key={i} className="text-[12px]">{s}</li>)}
                        </ul>
                      </div>
                    )}
                    {aiFeedback.rwReviewTopics?.length > 0 && (
                      <div>
                        <p className="text-[11px] font-semibold text-amber-600 mb-1">Skills to Review</p>
                        <div className="flex flex-wrap gap-1">
                          {aiFeedback.rwReviewTopics.map((t, i) => (
                            <span key={i} className="text-[10px] bg-amber-50 border border-amber-200 text-amber-700 px-2 py-0.5 rounded-full">{t}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4 space-y-2">
                    <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest">Math</p>
                    {aiFeedback.mathStrengths?.length > 0 && (
                      <div>
                        <p className="text-[11px] font-semibold text-green-600 mb-1">Strengths</p>
                        <ul className="list-disc list-inside space-y-0.5">
                          {aiFeedback.mathStrengths.map((s, i) => <li key={i} className="text-[12px]">{s}</li>)}
                        </ul>
                      </div>
                    )}
                    {aiFeedback.mathWeaknesses?.length > 0 && (
                      <div>
                        <p className="text-[11px] font-semibold text-red-500 mb-1">To Improve</p>
                        <ul className="list-disc list-inside space-y-0.5">
                          {aiFeedback.mathWeaknesses.map((s, i) => <li key={i} className="text-[12px]">{s}</li>)}
                        </ul>
                      </div>
                    )}
                    {aiFeedback.mathReviewTopics?.length > 0 && (
                      <div>
                        <p className="text-[11px] font-semibold text-amber-600 mb-1">Skills to Review</p>
                        <div className="flex flex-wrap gap-1">
                          {aiFeedback.mathReviewTopics.map((t, i) => (
                            <span key={i} className="text-[10px] bg-amber-50 border border-amber-200 text-amber-700 px-2 py-0.5 rounded-full">{t}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {aiFeedback.carelessErrors && (
                  <div className="bg-orange-50 border border-orange-100 rounded-lg p-3">
                    <p className="text-[11px] font-semibold text-orange-600 uppercase tracking-widest mb-1">Careless Error Pattern</p>
                    <p className="text-[12px]">{aiFeedback.carelessErrors}</p>
                  </div>
                )}
                {aiFeedback.practiceRecommendations && (
                  <div>
                    <p className="text-[11px] font-semibold text-[#1b3a5c] uppercase tracking-widest mb-1">Recommended Practice Plan</p>
                    <p>{aiFeedback.practiceRecommendations}</p>
                  </div>
                )}
                {aiFeedback.mockMateNextSteps && (
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                    <p className="text-[11px] font-semibold text-blue-700 uppercase tracking-widest mb-2">How to Use MockMate Next</p>
                    <p className="text-[12px] text-blue-900">{aiFeedback.mockMateNextSteps}</p>
                  </div>
                )}
              </div>
            )}
            {!aiFeedback && !aiFeedbackLoading && !aiFeedbackError && (
              <p className="text-[13px] text-slate-400 italic">AI feedback will generate automatically.</p>
            )}
          </div>
        </div>

        {/* 4. Practice Prompts */}
        <PracticePromptsSection prompts={practicePrompts} hasMisses={hasMisses} />

        {/* 5. Answer Key */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-200">
            <h2 className="text-[15px] font-bold text-slate-900 mb-3">Answer Key</h2>
            <div className="flex flex-wrap gap-2">
              {filterTabs.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setAnswerFilter(key)}
                  className={cn(
                    'text-[12px] font-medium px-3 py-1 rounded-full border transition-all',
                    answerFilter === key
                      ? 'bg-[#1b3a5c] border-[#1b3a5c] text-white'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-400',
                  )}
                >
                  {label}
                  {key === 'incorrect' && ` (${allFlat.filter(x => x.answered && !x.correct).length})`}
                  {key === 'unanswered' && ` (${allFlat.filter(x => !x.answered).length})`}
                  {key === 'marked' && ` (${allFlat.filter(x => bookmarks.has(x.q.id)).length})`}
                </button>
              ))}
            </div>
          </div>

          {filteredFlat.length === 0 ? (
            <div className="p-6 text-[13px] text-slate-400 italic">No questions match this filter.</div>
          ) : (
            <div className="divide-y divide-slate-100">
              {filteredFlat.map(({ q, qi, modLabel, answered, correct }) => {
                const userAns = answers[q.id] || '—'
                const correctAns = getCorrectAnswer(q)
                const explanation = getExplanation(q)
                const wrongExps = getWrongAnswerExplanations(q)
                const choices = getChoices(q)
                const stimulus = q.section === 'reading-writing' ? q.stimulus : (q as { stimulus?: string }).stimulus
                const isGridIn = q.section === 'math' && (q as MathGridInQuestion).type === 'grid_in'
                const skill = getSkill(q)
                const statusIcon = !answered ? '?' : correct ? '✓' : '✗'
                const statusColor = !answered ? 'bg-slate-100 text-slate-400' : correct ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'

                return (
                  <details key={q.id} className="group">
                    <summary className="flex items-center gap-3 px-5 py-3.5 cursor-pointer hover:bg-slate-50 list-none transition-colors">
                      <span className={cn('shrink-0 h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-bold', statusColor)}>
                        {statusIcon}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[11px] font-semibold text-slate-500">{modLabel} · Q{qi + 1}</span>
                          <span className="text-[10px] text-slate-400">{skill}</span>
                          <span className={cn('text-[10px] font-medium px-1.5 py-0.5 rounded',
                            q.difficulty === 'easy' ? 'bg-green-50 text-green-600' :
                            q.difficulty === 'medium' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'
                          )}>
                            {q.difficulty}
                          </span>
                          {bookmarks.has(q.id) && <span className="text-[10px] text-amber-500 font-semibold">★ Marked</span>}
                        </div>
                        <p className="text-[12px] text-slate-700 truncate mt-0.5">{q.question}</p>
                      </div>
                      <div className="shrink-0 text-right text-[11px] text-slate-400 hidden sm:block">
                        {answered ? (
                          correct ? <span className="text-green-600 font-semibold">Correct</span>
                                  : <span>Your Answer: <strong>{userAns}</strong> · Correct: <strong>{correctAns}</strong></span>
                        ) : <span className="text-slate-400">Skipped</span>}
                      </div>
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5 text-slate-300 shrink-0 group-open:rotate-180 transition-transform">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </summary>

                    <div className="px-5 pb-5 pt-2 bg-slate-50 border-t border-slate-100 space-y-4 text-[13px]">
                      {stimulus && (
                        <div className="bg-white border border-slate-200 rounded-lg p-3 text-[12px] text-slate-700 leading-relaxed whitespace-pre-line">
                          {stimulus}
                        </div>
                      )}

                      {choices && (
                        <div className="space-y-1.5">
                          {choices.map(c => {
                            const isCorrectChoice = c.label === correctAns
                            const isUserChoice = c.label === userAns
                            return (
                              <div key={c.label} className={cn('flex items-start gap-2 px-3 py-2 rounded-lg text-[12px]',
                                isCorrectChoice ? 'bg-green-50 border border-green-200' :
                                isUserChoice && !isCorrectChoice ? 'bg-red-50 border border-red-200' :
                                'bg-white border border-slate-100'
                              )}>
                                <span className="shrink-0 font-bold">{c.label}.</span>
                                <span className="flex-1">{c.text}</span>
                                {isCorrectChoice && <span className="shrink-0 text-green-600 font-bold text-[10px]">✓ CORRECT</span>}
                                {isUserChoice && !isCorrectChoice && <span className="shrink-0 text-red-600 font-bold text-[10px]">✗ YOUR ANSWER</span>}
                              </div>
                            )
                          })}
                        </div>
                      )}

                      {isGridIn && (
                        <div className="flex items-center gap-4 text-[12px]">
                          <span><span className="font-semibold text-slate-600">Your Answer:</span> <span className={answered && correct ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>{userAns}</span></span>
                          <span><span className="font-semibold text-slate-600">Correct Answer:</span> <span className="text-green-600 font-semibold">{correctAns}</span></span>
                        </div>
                      )}

                      <div className="space-y-2">
                        <div className="bg-green-50 border border-green-100 rounded-lg p-3">
                          <p className="text-[11px] font-semibold text-green-700 uppercase tracking-widest mb-1">Correct Answer: {correctAns}</p>
                          <p className="text-[12px] text-slate-700 leading-relaxed">{explanation}</p>
                        </div>

                        {choices && (
                          <div className="space-y-1.5">
                            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">Why the other choices are wrong</p>
                            {choices.filter(c => c.label !== correctAns).map(c => {
                              const exp = (wrongExps as Record<string, string>)[c.label] || FALLBACK_WRONG
                              return (
                                <div key={c.label} className="bg-white border border-slate-200 rounded-lg p-3">
                                  <p className="text-[11px] font-semibold text-red-600 mb-1">Choice {c.label} is incorrect</p>
                                  <p className="text-[12px] text-slate-600 leading-relaxed">{exp}</p>
                                </div>
                              )
                            })}
                          </div>
                        )}

                        {isGridIn && (q as MathGridInQuestion).scoringNotes && (
                          <div className="bg-amber-50 border border-amber-100 rounded-lg p-3">
                            <p className="text-[11px] font-semibold text-amber-700 uppercase tracking-widest mb-1">Scoring Notes</p>
                            <p className="text-[12px] text-slate-700">{(q as MathGridInQuestion).scoringNotes}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </details>
                )
              })}
            </div>
          )}
        </div>
      </div>
    )
  }

  return null
}
