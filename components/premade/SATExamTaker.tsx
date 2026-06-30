'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import type {
  SATForm,
  SATModule,
  SATQuestion,
  MathMCQuestion,
  MathGridInQuestion,
  ChoiceLabel,
} from '@/lib/premade-exams/sat/types'
import { saveAttempt, updateAttempt, type PremadeAttempt } from '@/lib/premade-exams/sat/attempt-store'
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
  | { tag: 'module_review'; section: 'rw' | 'math'; slot: 'm1' | 'm2' }
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
function promptCardBullets(p: PracticePrompt): string[] {
  const m = p.description.match(/^(\d+)\s+(.+?)-difficulty/)
  const n = m ? m[1] : '10'
  const diff = m ? m[2] : 'mixed'

  if (p.skill === 'Mixed') {
    return [
      `Create a mixed SAT practice set at ${diff} difficulty.`,
      '8 Reading & Writing questions (varied skills)',
      '7 Math questions (Algebra, Advanced Math, Data Analysis)',
      'Short passage stimulus for each R&W question',
      'Four answer choices (A–D) for R&W; multiple choice + grid-in for Math',
      'Correct answer with explanation for every question',
    ]
  }

  const intro = p.section === 'rw'
    ? `Create ${n} SAT Reading & Writing questions on ${p.skill} at ${diff} difficulty.`
    : `Create ${n} SAT Math questions on ${p.skill} at ${diff} difficulty.`

  const skillHints: Record<string, string> = {
    'Words in Context':         'Words with multiple plausible meanings; only one fits the passage',
    'Text Structure and Purpose':'Ask about the author\'s purpose and rhetorical organization',
    'Cross-Text Connections':   'Use paired passages (Text 1 + Text 2) on the same topic',
    'Central Ideas and Details':'Include "main idea" and "best supporting detail" question types',
    'Command of Evidence':      'Include both textual and quantitative (chart/table) evidence types',
    'Inferences':               'Ask what can be logically concluded — beyond what is stated',
    'Rhetorical Synthesis':     'Use 3–5 student notes; student combines into one sentence',
    'Transitions':              'Cover: contrast, cause-effect, addition, and exemplification',
    'Boundaries':               'Cover: comma splices, run-ons, semicolons, colons, and dashes',
    'Form, Structure, and Sense':'Cover: verb tense, subject-verb agreement, modifier placement',
  }
  const mathHints: [string, string][] = [
    ['linear',      'Cover: slope-intercept, point-slope form, and word problems'],
    ['system',      'Cover: substitution, elimination, no/infinite solution cases'],
    ['quadratic',   'Cover: factoring, quadratic formula, vertex form, discriminant'],
    ['exponential', 'Cover: growth/decay models, percent change, and half-life'],
    ['function',    'Cover: f(x) notation, composition, transformations, domain/range'],
    ['data',        'Cover: mean/median, scatterplots, two-way tables, margin of error'],
    ['geometry',    'Cover: area, arc length, similar triangles, coordinate geometry'],
    ['trig',        'Cover: SOH-CAH-TOA, complementary angles, radian/degree conversion'],
    ['ratio',       'Cover: unit rates, percent increase/decrease, proportional relationships'],
  ]

  const hint = p.section === 'rw'
    ? (skillHints[p.skill] ?? `Focus on ${p.skill} using authentic SAT-style passages`)
    : (mathHints.find(([k]) => p.skill.toLowerCase().includes(k))?.[1] ?? `Focus on ${p.skill} in authentic SAT format`)

  if (p.section === 'rw') {
    return [intro,
      'Short passage stimulus per question (3–8 sentences)',
      'Four answer choices (A, B, C, D)',
      'Correct answer with full explanation',
      'Brief explanation for each wrong answer choice',
      hint,
    ]
  }
  return [intro,
    'Multiple choice (A–D) and grid-in formats',
    'Step-by-step solution for each question',
    'Brief explanation for each wrong answer choice',
    hint,
  ]
}

function generatePrintHTML(params: {
  form: SATForm
  rwScaled: number; mathScaled: number; totalScore: number
  rwM2Type: 'easy' | 'hard'; mathM2Type: 'easy' | 'hard'
  rwM1Correct: number; rwM2Correct: number; rwTotal: number
  mathM1Correct: number; mathM2Correct: number; mathTotal: number
  aiFeedback: SATAIFeedback | null
  practicePrompts: PracticePrompt[]
  hasMisses: boolean
}) {
  const { rwScaled, mathScaled, totalScore, rwM2Type, mathM2Type,
          rwM1Correct, rwM2Correct, rwTotal, mathM1Correct, mathM2Correct, mathTotal,
          aiFeedback, practicePrompts } = params

  const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
  const trunc = (s: string, max: number) => s.length <= max ? s : s.slice(0, max).replace(/\s\S*$/, '') + '…'

  const feedbackHTML = aiFeedback ? `
<div class="section">
  <div class="section-title">AI Performance Feedback</div>
  <div class="fb-grid">
    ${aiFeedback.overallAssessment ? `<div class="fb-row"><span class="fb-label">Overall</span>${trunc(aiFeedback.overallAssessment, 230)}</div>` : ''}
    ${aiFeedback.whatWentWell ? `<div class="fb-row"><span class="fb-label">Strengths</span>${trunc(aiFeedback.whatWentWell, 190)}</div>` : ''}
    ${aiFeedback.rwWeaknesses?.length || aiFeedback.mathWeaknesses?.length ? `<div class="fb-row"><span class="fb-label">To Improve</span>${[...(aiFeedback.rwWeaknesses ?? []), ...(aiFeedback.mathWeaknesses ?? [])].slice(0, 4).join(' · ')}</div>` : ''}
    ${aiFeedback.adaptivePathInsight ? `<div class="fb-row"><span class="fb-label">Adaptive Path</span>${trunc(aiFeedback.adaptivePathInsight, 190)}</div>` : ''}
  </div>
</div>` : ''

  const topPrompts = practicePrompts.slice(0, 4)
  const promptCardsHTML = topPrompts.map(p => {
    const bullets = promptCardBullets(p)
    const [intro, ...items] = bullets
    return `<div class="prompt-card">
      <div class="pc-header">
        <span class="pc-skill">${p.skill}</span>
        <span class="pc-badge ${p.section === 'rw' ? 'rw' : 'math'}">${p.section === 'rw' ? 'R&amp;W' : 'Math'}</span>
      </div>
      <div class="pc-intro">${intro}</div>
      <div class="pc-include">Include:</div>
      <ul class="pc-list">${items.map(item => `<li>${item}</li>`).join('')}</ul>
    </div>`
  }).join('')

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>MockMate SAT Practice Test 1 — Score Report</title>
<style>
  @page { size: letter; margin: 0.35in; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { height: 100%; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    color: #1e293b; background: white; font-size: 9.5px; line-height: 1.3;
    display: flex; flex-direction: column;
  }
  .upper { flex-shrink: 0; }
  .prompts-section { flex: 1; display: flex; flex-direction: column; min-height: 0; margin-bottom: 7px; }
  .header { border-bottom: 2px solid #1b3a5c; padding-bottom: 5px; margin-bottom: 8px; display:flex; justify-content:space-between; align-items:flex-end; }
  .header-title { font-size: 15px; font-weight: 800; color: #1b3a5c; }
  .header-sub { font-size: 8px; color: #64748b; margin-top: 1px; }
  .header-date { font-size: 8px; color: #94a3b8; }
  .score-row { display:flex; gap:6px; margin-bottom:6px; }
  .score-card { flex:1; border:1px solid #e2e8f0; border-radius:5px; padding:6px 8px; text-align:center; }
  .score-card.total { background:#1b3a5c; color:white; }
  .score-num { font-size:22px; font-weight:800; line-height:1; }
  .score-label { font-size:7.5px; color:#64748b; margin-bottom:2px; text-transform:uppercase; letter-spacing:.04em; }
  .score-card.total .score-label { color:rgba(255,255,255,.65); }
  .score-card.total .score-num { color:white; }
  .score-sub { font-size:7.5px; color:#94a3b8; margin-top:1px; }
  .score-card.total .score-sub { color:rgba(255,255,255,.5); }
  .modules { display:flex; gap:5px; margin-bottom:6px; }
  .mod-pill { flex:1; background:#f1f5f9; border-radius:4px; padding:3px 5px; font-size:7.5px; color:#475569; }
  .mod-pill strong { display:block; font-size:8px; color:#1e293b; }
  .disclaimer { font-size:7.5px; color:#94a3b8; margin-bottom:7px; }
  .section { margin-bottom:7px; }
  .section-title { font-size:8.5px; font-weight:700; color:#1b3a5c; border-bottom:1px solid #e2e8f0; padding-bottom:3px; margin-bottom:5px; text-transform:uppercase; letter-spacing:.06em; }
  .fb-grid { display:grid; grid-template-columns:1fr 1fr; gap:3px 12px; }
  .fb-row { font-size:8.5px; color:#334155; line-height:1.35; }
  .fb-label { font-weight:700; color:#1b3a5c; display:block; font-size:7.5px; text-transform:uppercase; letter-spacing:.04em; margin-bottom:1px; }
  .prompts-title { font-size:8.5px; font-weight:700; color:#1b3a5c; border-bottom:1px solid #e2e8f0; padding-bottom:3px; margin-bottom:6px; text-transform:uppercase; letter-spacing:.06em; flex-shrink:0; }
  .prompt-grid {
    flex: 1; min-height: 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: 1fr;
    gap: 7px;
  }
  .prompt-card {
    border: 1px solid #e2e8f0; border-radius: 5px; padding: 6px 8px;
    background: #fafafa; display: flex; flex-direction: column;
  }
  .pc-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:4px; flex-shrink:0; }
  .pc-skill { font-size:9px; font-weight:700; color:#1b3a5c; }
  .pc-badge { font-size:7px; font-weight:600; padding:1px 5px; border-radius:20px; }
  .pc-badge.rw { background:#ede9fe; color:#5b21b6; }
  .pc-badge.math { background:#d1fae5; color:#065f46; }
  .pc-intro { font-size:8.5px; color:#374151; line-height:1.35; margin-bottom:4px; flex-shrink:0; }
  .pc-include { font-size:8px; font-weight:600; color:#64748b; margin-bottom:2px; flex-shrink:0; }
  .pc-list { flex:1; list-style:none; padding:0; }
  .pc-list li { font-size:8px; color:#475569; line-height:1.4; padding-left:10px; position:relative; margin-bottom:2px; }
  .pc-list li::before { content:"•"; position:absolute; left:2px; color:#94a3b8; }
  .footer {
    flex-shrink: 0;
    background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 4px;
    padding: 6px 10px;
  }
  .footer-label { font-size:8.5px; font-weight:700; color:#1e40af; margin-bottom:3px; }
  .footer-list { list-style:none; padding:0; }
  .footer-list li { font-size:8px; color:#1e3a8a; line-height:1.4; padding-left:14px; position:relative; margin-bottom:1px; }
  .footer-list li::before { content:attr(data-n)"."; position:absolute; left:0; font-weight:600; color:#3b82f6; }
</style>
</head>
<body>

<div class="upper">
  <div class="header">
    <div>
      <div class="header-title">MockMate · SAT Practice Test 1</div>
      <div class="header-sub">Score Report</div>
    </div>
    <div class="header-date">Generated ${dateStr}</div>
  </div>

  <div class="score-row">
    <div class="score-card">
      <div class="score-label">Reading &amp; Writing</div>
      <div class="score-num">${rwScaled}</div>
      <div class="score-sub">${rwM1Correct + rwM2Correct} / ${rwTotal} correct</div>
    </div>
    <div class="score-card">
      <div class="score-label">Math</div>
      <div class="score-num">${mathScaled}</div>
      <div class="score-sub">${mathM1Correct + mathM2Correct} / ${mathTotal} correct</div>
    </div>
    <div class="score-card total">
      <div class="score-label">Total Score</div>
      <div class="score-num">${totalScore}</div>
      <div class="score-sub">/ 1600</div>
    </div>
  </div>

  <div class="modules">
    <div class="mod-pill"><strong>RW M1</strong>${rwM1Correct} / 27</div>
    <div class="mod-pill"><strong>RW M2 (${cap(rwM2Type)})</strong>${rwM2Correct} / 27</div>
    <div class="mod-pill"><strong>Math M1</strong>${mathM1Correct} / 22</div>
    <div class="mod-pill"><strong>Math M2 (${cap(mathM2Type)})</strong>${mathM2Correct} / 22</div>
  </div>

  <div class="disclaimer">Scores are estimated and not official College Board results.</div>

  ${feedbackHTML}
</div>

<div class="prompts-section">
  <div class="prompts-title">Practice Prompts to Improve Your Score</div>
  <div class="prompt-grid">
    ${promptCardsHTML}
  </div>
</div>

<div class="footer">
  <div class="footer-label">How to use on MockMate</div>
  <ol class="footer-list">
    <li data-n="1">Go to <strong>New Exam</strong> in the side panel.</li>
    <li data-n="2">Paste one of the prompts above into the exam description box.</li>
    <li data-n="3">Under standardized exam targeting, select <strong>SAT</strong>.</li>
    <li data-n="4">Generate the exam and practice the weak skill again.</li>
  </ol>
</div>

</body>
</html>`
}

// ─── Calculator ───────────────────────────────────────────────────────────────
function CalculatorModal({ onClose }: { onClose: () => void }) {
  const [expr, setExpr] = useState('')
  const [result, setResult] = useState('')

  const press = (val: string) => {
    if (val === 'C') { setExpr(''); setResult(''); return }
    if (val === '←') { setExpr(p => p.slice(0, -1)); return }
    if (val === '=') {
      try {
        // sanitize: only allow digits, operators, parens, dot, spaces
        const safe = expr.replace(/[^0-9+\-*/().% ]/g, '')
        // eslint-disable-next-line no-new-func
        const val = new Function('return ' + safe)()
        setResult(String(val))
      } catch {
        setResult('Error')
      }
      return
    }
    setExpr(p => p + val)
  }

  const rows = [
    ['C', '(', ')', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '−'],
    ['1', '2', '3', '+'],
    ['0', '.', '←', '='],
  ]
  const opMap: Record<string, string> = { '÷': '/', '×': '*', '−': '-' }

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-64 overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-4 py-3 bg-[#1b3a5c]">
          <span className="text-white text-[13px] font-semibold">Calculator</span>
          <button onClick={onClose} className="text-white/70 hover:text-white transition-colors">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 min-h-[56px]">
          <p className="text-[11px] text-slate-400 font-mono min-h-[14px] truncate">{expr || ' '}</p>
          <p className="text-[20px] font-bold text-slate-900 font-mono text-right truncate">{result || '0'}</p>
        </div>
        <div className="p-2 grid grid-cols-4 gap-1.5">
          {rows.flat().map((k, i) => {
            const isOp = ['÷', '×', '−', '+', '='].includes(k)
            const isClear = k === 'C'
            return (
              <button
                key={i}
                onClick={() => press(opMap[k] ?? k)}
                className={cn(
                  'h-12 rounded-xl text-[14px] font-semibold transition-colors active:scale-95',
                  isOp ? 'bg-[#1d4ed8] text-white hover:bg-[#1e40af]' :
                  isClear ? 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200' :
                  'bg-slate-100 text-slate-800 hover:bg-slate-200'
                )}
              >
                {k}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ─── Reference sheet ──────────────────────────────────────────────────────────
function ReferenceModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/30" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-3 bg-[#1b3a5c] sticky top-0">
          <span className="text-white text-[13px] font-semibold">Math Reference</span>
          <button onClick={onClose} className="text-white/70 hover:text-white transition-colors">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-5 space-y-5 text-[12px] text-slate-700">
          <section>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Area &amp; Perimeter</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                ['Triangle', 'A = ½bh'],
                ['Rectangle', 'A = ℓw'],
                ['Circle', 'A = πr²'],
                ['Trapezoid', 'A = ½(b₁ + b₂)h'],
                ['Circumference', 'C = 2πr'],
              ].map(([label, formula]) => (
                <div key={label} className="bg-slate-50 rounded-lg px-3 py-2">
                  <p className="text-[10px] text-slate-400">{label}</p>
                  <p className="font-mono font-semibold text-slate-800">{formula}</p>
                </div>
              ))}
            </div>
          </section>
          <section>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Volume</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                ['Rectangular Prism', 'V = ℓwh'],
                ['Cylinder', 'V = πr²h'],
                ['Cone', 'V = ⅓πr²h'],
                ['Sphere', 'V = ⁴⁄₃πr³'],
                ['Pyramid', 'V = ⅓Bh'],
              ].map(([label, formula]) => (
                <div key={label} className="bg-slate-50 rounded-lg px-3 py-2">
                  <p className="text-[10px] text-slate-400">{label}</p>
                  <p className="font-mono font-semibold text-slate-800">{formula}</p>
                </div>
              ))}
            </div>
          </section>
          <section>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Right Triangle</p>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-slate-50 rounded-lg px-3 py-2 col-span-2">
                <p className="text-[10px] text-slate-400">Pythagorean Theorem</p>
                <p className="font-mono font-semibold text-slate-800">a² + b² = c²</p>
              </div>
              <div className="bg-amber-50 rounded-lg px-3 py-2 border border-amber-100">
                <p className="text-[10px] text-amber-600">30°–60°–90° sides</p>
                <p className="font-mono font-semibold text-slate-800">1 : √3 : 2</p>
              </div>
              <div className="bg-amber-50 rounded-lg px-3 py-2 border border-amber-100">
                <p className="text-[10px] text-amber-600">45°–45°–90° sides</p>
                <p className="font-mono font-semibold text-slate-800">1 : 1 : √2</p>
              </div>
            </div>
          </section>
          <section>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Trigonometry (right triangle)</p>
            <div className="grid grid-cols-3 gap-2">
              {[
                ['sin θ', 'opp / hyp'],
                ['cos θ', 'adj / hyp'],
                ['tan θ', 'opp / adj'],
              ].map(([ratio, def]) => (
                <div key={ratio} className="bg-slate-50 rounded-lg px-3 py-2 text-center">
                  <p className="font-mono font-bold text-[#1d4ed8] text-[13px]">{ratio}</p>
                  <p className="text-slate-500 text-[10px] mt-0.5">{def}</p>
                </div>
              ))}
            </div>
          </section>
          <section>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Key Facts</p>
            <div className="space-y-1">
              {[
                'A circle contains 360°',
                'A circle contains 2π radians',
                'The sum of angles in a triangle is 180°',
                'The number of degrees of arc in a circle is 360°',
              ].map((fact) => (
                <p key={fact} className="text-[11px] text-slate-600 bg-slate-50 rounded px-3 py-1.5">• {fact}</p>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
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
  isBookmarked, onBookmark, showMathTools, onCalc, onRef,
}: {
  onBack: () => void; onNext: () => void; canGoBack: boolean
  centerLabel: React.ReactNode; timerEl?: React.ReactNode
  onReview?: () => void; showReview?: boolean
  isBookmarked?: boolean; onBookmark?: () => void
  showMathTools?: boolean; onCalc?: () => void; onRef?: () => void
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
      <div className="flex items-center gap-1.5 shrink-0">
        {timerEl}
        {showMathTools && onCalc && (
          <button onClick={onCalc} title="Calculator" className="text-[11px] font-semibold px-2 py-1 rounded border border-white/30 hover:bg-white/10 transition-colors flex items-center gap-1">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="h-3.5 w-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z" />
            </svg>
            Calc
          </button>
        )}
        {showMathTools && onRef && (
          <button onClick={onRef} title="Reference sheet" className="text-[11px] font-semibold px-2 py-1 rounded border border-white/30 hover:bg-white/10 transition-colors">
            Ref
          </button>
        )}
        {showReview && onReview && (
          <button onClick={onReview} className="text-[11px] font-semibold px-2.5 py-1 rounded border border-white/30 hover:bg-white/10 transition-colors">
            Review
          </button>
        )}
        {onBookmark && (
          <button
            onClick={onBookmark}
            title={isBookmarked ? 'Remove bookmark' : 'Mark for review'}
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
export default function SATExamTaker({ form, initialAttempt }: { form: SATForm; initialAttempt?: PremadeAttempt }) {
  const isHistoryView = !!initialAttempt

  // ── Password gate ──────────────────────────────────────────────────────────
  const [unlocked, setUnlocked] = useState(isHistoryView)
  const [passwordInput, setPasswordInput] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [passwordChecking, setPasswordChecking] = useState(false)

  // ── Exam state ─────────────────────────────────────────────────────────────
  const [phase, setPhase] = useState<SATPhase>(isHistoryView ? { tag: 'results' } : { tag: 'welcome' })
  const [answers, setAnswers] = useState<Record<string, string>>(initialAttempt?.answers ?? {})
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set(initialAttempt?.bookmarks ?? []))
  const [rwM2Type, setRwM2Type] = useState<'easy' | 'hard'>(initialAttempt?.rwM2Type ?? 'easy')
  const [mathM2Type, setMathM2Type] = useState<'easy' | 'hard'>(initialAttempt?.mathM2Type ?? 'easy')
  const [secsLeft, setSecsLeft] = useState(0)
  const [timerRunning, setTimerRunning] = useState(false)
  const [aiFeedback, setAiFeedback] = useState<SATAIFeedback | null>(initialAttempt?.aiFeedback ?? null)
  const [aiFeedbackLoading, setAiFeedbackLoading] = useState(false)
  const [aiFeedbackError, setAiFeedbackError] = useState('')
  const [answerFilter, setAnswerFilter] = useState<AnswerFilter>('all')
  const [strikeouts, setStrikeouts] = useState<Record<string, ChoiceLabel[]>>(
    (initialAttempt?.strikeouts as Record<string, ChoiceLabel[]>) ?? {}
  )
  const [calcOpen, setCalcOpen] = useState(false)
  const [refOpen, setRefOpen] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const attemptIdRef = useRef<string>(initialAttempt?.id ?? '')
  const completedAtRef = useRef<string>(initialAttempt?.completedAt ?? '')

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
    setPhase({ tag: 'module_review', section: 'rw', slot: 'm1' })
  }, [rwSection, answers, form.rwRoutingThreshold, stopTimer])

  const handleMathM1Complete = useCallback(() => {
    const correct = countCorrect(mathSection.modules[0], answers)
    setMathM2Type(correct >= form.mathRoutingThreshold ? 'hard' : 'easy')
    stopTimer()
    setPhase({ tag: 'module_review', section: 'math', slot: 'm1' })
  }, [mathSection, answers, form.mathRoutingThreshold, stopTimer])

  // ── Start 10-min break countdown when entering section_break ──────────────
  useEffect(() => {
    if (phase.tag !== 'section_break') return
    startTimer(10)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase.tag])

  // ── Auto-advance on timer expiry ───────────────────────────────────────────
  useEffect(() => {
    if (timerRunning || secsLeft > 0) return
    if (phase.tag === 'question') {
      if (phase.slot === 'm1') {
        if (phase.section === 'rw') handleRWM1Complete()
        else handleMathM1Complete()
      } else {
        stopTimer()
        setPhase(phase.section === 'rw'
          ? { tag: 'module_review', section: 'rw', slot: 'm2' }
          : { tag: 'module_review', section: 'math', slot: 'm2' })
      }
    } else if (phase.tag === 'section_break') {
      setPhase({ tag: 'math_directions' })
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
      setPhase(phase.section === 'rw'
        ? { tag: 'module_review', section: 'rw', slot: 'm2' }
        : { tag: 'module_review', section: 'math', slot: 'm2' })
    }
  }, [phase, getActiveModule, handleRWM1Complete, handleMathM1Complete, stopTimer])

  // ── Keyboard navigation ────────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase()
      if (['input', 'textarea', 'select'].includes(tag)) return
      if ((e.target as HTMLElement)?.isContentEditable) return
      if (phase.tag !== 'question') return
      if (calcOpen || refOpen) return
      if (e.key === 'ArrowRight') { e.preventDefault(); handleNext() }
      if (e.key === 'ArrowLeft') { e.preventDefault(); handleBack() }
      if (e.key === 'Escape') { setCalcOpen(false); setRefOpen(false) }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [phase, handleNext, handleBack, calcOpen, refOpen])

  // ── Answers & bookmarks ────────────────────────────────────────────────────
  const setAnswer = useCallback((qId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [qId]: value }))
  }, [])

  const toggleBookmark = useCallback((qId: string) => {
    setBookmarks(prev => { const n = new Set(prev); n.has(qId) ? n.delete(qId) : n.add(qId); return n })
  }, [])

  const toggleStrikeout = useCallback((qId: string, label: ChoiceLabel) => {
    setStrikeouts(prev => {
      const current = prev[qId] ?? []
      const next = current.includes(label)
        ? current.filter(l => l !== label)
        : [...current, label]
      return { ...prev, [qId]: next }
    })
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
    if (phase.tag === 'results' && !isHistoryView) fetchAIFeedback()
  }, [phase.tag, fetchAIFeedback, isHistoryView])

  // ── Save attempt to localStorage when entering results ─────────────────────
  useEffect(() => {
    if (phase.tag !== 'results' || isHistoryView || !attemptIdRef.current) return
    const attempt: PremadeAttempt = {
      id: attemptIdRef.current,
      examId: 'sat-form-1',
      examTitle: form.title,
      completedAt: completedAtRef.current,
      rwScaled, mathScaled, totalScore,
      rwM1Correct, rwM2Correct, rwTotal,
      mathM1Correct, mathM2Correct, mathTotal,
      rwM2Type, mathM2Type,
      answers,
      bookmarks: [...bookmarks],
      strikeouts: Object.fromEntries(Object.entries(strikeouts).map(([k, v]) => [k, [...v]])),
      aiFeedback: null,
    }
    saveAttempt(attempt)
  // only save once when entering results — intentionally omitting reactive deps
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase.tag])

  // ── Update saved attempt when AI feedback loads (live and history view) ───
  useEffect(() => {
    if (!aiFeedback || !attemptIdRef.current) return
    updateAttempt(attemptIdRef.current, { aiFeedback })
  }, [aiFeedback])

  // ── Retake ─────────────────────────────────────────────────────────────────
  const handleRetake = useCallback(() => {
    setPhase({ tag: 'welcome' })
    setAnswers({}); setBookmarks(new Set()); setStrikeouts({})
    setRwM2Type('easy'); setMathM2Type('easy')
    setSecsLeft(0); setTimerRunning(false)
    setAiFeedback(null); setAiFeedbackLoading(false); setAiFeedbackError('')
    setAnswerFilter('all')
    setCalcOpen(false); setRefOpen(false)
    attemptIdRef.current = ''
    completedAtRef.current = ''
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
    const breakMins = Math.floor(secsLeft / 60)
    const breakSecs = secsLeft % 60
    const breakTimeStr = `${String(breakMins).padStart(2, '0')}:${String(breakSecs).padStart(2, '0')}`
    return (
      <DirectionsLayout title="Break">
        <div className="w-full max-w-md bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center">
          <div className="h-14 w-14 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center mx-auto mb-5">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-7 w-7 text-green-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-[20px] font-bold text-slate-900 mb-2">Reading and Writing Complete</h2>
          <p className="text-[13px] text-slate-500 mb-5">Take a 10-minute break. The Math section begins when the timer reaches 0 or you click Resume.</p>
          <div className="bg-slate-50 border border-slate-200 rounded-xl py-5 mb-6">
            <p className="text-[11px] text-slate-400 uppercase tracking-widest mb-1">Break time remaining</p>
            <p className={cn('text-[42px] font-bold font-mono', secsLeft <= 60 ? 'text-red-500' : 'text-slate-900')}>
              {breakTimeStr}
            </p>
          </div>
          <button
            onClick={() => { stopTimer(); setPhase({ tag: 'math_directions' }) }}
            className="w-full bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-semibold py-2.5 rounded-lg transition-colors"
          >
            Resume Testing
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
        {calcOpen && <CalculatorModal onClose={() => setCalcOpen(false)} />}
        {refOpen && <ReferenceModal onClose={() => setRefOpen(false)} />}
        <div className="flex flex-col h-full">
          <NavBar
            canGoBack={phase.qIdx > 0}
            onBack={handleBack}
            onNext={handleNext}
            centerLabel={centerLabel}
            timerEl={<TimerDisplay secs={secsLeft} />}
            showReview={true}
            onReview={() => setPhase({ tag: 'module_review', section: phase.section, slot: phase.slot })}
            isBookmarked={bookmarked}
            onBookmark={() => toggleBookmark(q.id)}
            showMathTools={phase.section === 'math'}
            onCalc={() => setCalcOpen(true)}
            onRef={() => setRefOpen(true)}
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
                  {bookmarked && (
                    <span className="text-[10px] font-semibold text-amber-500 uppercase tracking-widest flex items-center gap-1">
                      <svg fill="currentColor" viewBox="0 0 24 24" className="h-3 w-3">
                        <path d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                      </svg>
                      Marked for Review
                    </span>
                  )}
                </div>
                <p className="text-[14px] text-slate-900 font-medium leading-snug mb-5">{q.question}</p>

                {choices && (
                  <div className="space-y-2">
                    {choices.map(choice => {
                      const selected = currentAnswer === choice.label
                      const struckOut = (strikeouts[q.id] ?? []).includes(choice.label)
                      return (
                        <div key={choice.label} className="flex items-stretch gap-1.5">
                          <button
                            onClick={() => toggleStrikeout(q.id, choice.label)}
                            title={struckOut ? 'Remove cross-out' : 'Cross out this choice'}
                            className={cn(
                              'shrink-0 w-7 flex items-center justify-center rounded-lg border transition-colors text-[9px] font-mono font-bold',
                              struckOut
                                ? 'border-red-300 bg-red-50 text-red-500 hover:bg-red-100'
                                : 'border-slate-200 bg-white text-slate-300 hover:border-slate-300 hover:text-slate-500'
                            )}
                          >
                            {struckOut ? '↺' : 'A̶B̶C̶'}
                          </button>
                          <button
                            onClick={() => setAnswer(q.id, choice.label)}
                            className={cn(
                              'flex-1 text-left flex items-start gap-3 px-4 py-3 rounded-lg border text-[13px] transition-all',
                              selected ? 'border-[#1d4ed8] bg-blue-50 text-[#1d4ed8]' : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50',
                              struckOut && 'opacity-40'
                            )}
                          >
                            <span className={cn('shrink-0 h-5 w-5 rounded-full border-2 flex items-center justify-center text-[10px] font-bold mt-0.5',
                              selected ? 'border-[#1d4ed8] bg-[#1d4ed8] text-white' : 'border-slate-300 text-slate-500'
                            )}>
                              {choice.label}
                            </span>
                            <span className={cn('leading-snug', struckOut && 'line-through')}>{choice.text}</span>
                          </button>
                        </div>
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
                    <p className="text-[11px] text-slate-400 mt-2">
                      Answer preview: <span className="font-semibold text-slate-700">{currentAnswer || '—'}</span>
                    </p>
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
                    {phase.slot === 'm1' ? 'Go to Review →' : phase.section === 'rw' ? 'Go to Review →' : 'Go to Review →'}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Question navigator */}
          <div className="shrink-0 bg-white border-t border-slate-200 px-3 py-2 overflow-x-auto">
            <div className="flex items-center gap-1 min-w-max">
              {mod.questions.map((nq, ni) => {
                const isAns = !!answers[nq.id]?.trim()
                const isBm = bookmarks.has(nq.id)
                const isCur = ni === phase.qIdx
                return (
                  <button
                    key={nq.id}
                    onClick={() => setPhase({ ...phase, qIdx: ni })}
                    className={cn(
                      'h-7 w-7 rounded text-[11px] font-semibold border transition-all shrink-0',
                      isCur
                        ? 'border-[#1d4ed8] bg-[#1d4ed8] text-white ring-2 ring-[#1d4ed8] ring-offset-1'
                        : isAns
                        ? 'bg-[#1d4ed8] border-[#1d4ed8] text-white'
                        : 'bg-white border-slate-200 text-slate-500 hover:border-slate-400',
                      isBm && !isCur && 'ring-2 ring-amber-400 ring-offset-1'
                    )}
                  >
                    {ni + 1}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </ExamWrapper>
    )
  }

  // ─────────────────────────────────────────────────────────────────────────
  // PHASE: MODULE REVIEW
  // ─────────────────────────────────────────────────────────────────────────
  if (phase.tag === 'module_review') {
    const reviewMod = getActiveModule(phase.section, phase.slot)
    const reviewQuestions = reviewMod.questions
    const answeredCount = reviewQuestions.filter(q => isAnswered(q, answers)).length
    const unansweredCount = reviewQuestions.length - answeredCount
    const bookmarkedCount = reviewQuestions.filter(q => bookmarks.has(q.id)).length

    const sectionName = phase.section === 'rw' ? 'Reading and Writing' : 'Math'
    const modNum = phase.slot === 'm1' ? '1' : '2'
    const headerLabel = `${sectionName} — Module ${modNum} Review`

    const isFinal = phase.section === 'math' && phase.slot === 'm2'

    const handleContinue = () => {
      if (isFinal) {
        attemptIdRef.current = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
        completedAtRef.current = new Date().toISOString()
        setPhase({ tag: 'results' })
      } else if (phase.section === 'rw' && phase.slot === 'm1') {
        setPhase({ tag: 'rw_break' })
      } else if (phase.section === 'rw' && phase.slot === 'm2') {
        setPhase({ tag: 'section_break' })
      } else {
        setPhase({ tag: 'math_break' })
      }
    }

    const continueLabel = isFinal
      ? 'Submit Test and See Results'
      : phase.section === 'rw' && phase.slot === 'm1'
      ? 'Continue to Module 2 →'
      : phase.section === 'rw' && phase.slot === 'm2'
      ? 'Continue to 10-Minute Break →'
      : 'Continue to Module 2 →'

    return (
      <ExamWrapper>
        <div className="flex flex-col h-full">
          <div className="shrink-0 h-11 bg-[#1b3a5c] flex items-center px-4 gap-3">
            <button
              onClick={() => setPhase({ tag: 'question', section: phase.section, slot: phase.slot, qIdx: reviewQuestions.length - 1 })}
              className="text-white/70 hover:text-white text-[12px] font-medium transition-colors flex items-center gap-1"
            >
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
              Back
            </button>
            <span className="text-white text-[13px] font-semibold">{headerLabel}</span>
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-2xl mx-auto">
              <div className="flex items-start justify-between mb-5">
                <div>
                  <h2 className="text-[18px] font-bold text-slate-900">Review Your Answers</h2>
                  <p className="text-[13px] text-slate-500 mt-1">Click any number to return to that question.</p>
                </div>
                <div className="flex items-center gap-3 text-[12px] text-slate-500 shrink-0">
                  <span className="flex items-center gap-1"><span className="h-3 w-3 rounded bg-[#1d4ed8] shrink-0" /> {answeredCount} answered</span>
                  {unansweredCount > 0 && <span className="flex items-center gap-1 text-amber-600"><span className="h-3 w-3 rounded bg-white border border-slate-300 shrink-0" /> {unansweredCount} unanswered</span>}
                  {bookmarkedCount > 0 && <span className="flex items-center gap-1 text-amber-600"><span className="h-3 w-3 rounded ring-2 ring-amber-400 shrink-0" /> {bookmarkedCount} marked</span>}
                </div>
              </div>

              {unansweredCount > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 mb-5 text-[12px] text-amber-800 flex items-start gap-2">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-4 w-4 shrink-0 mt-0.5 text-amber-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                  <span>You have <strong>{unansweredCount} unanswered question{unansweredCount > 1 ? 's' : ''}</strong>. You can still go back and answer them before continuing.</span>
                </div>
              )}

              <div className="flex flex-wrap gap-2 mb-6">
                {reviewQuestions.map((q, qi) => {
                  const answered = isAnswered(q, answers)
                  const bm = bookmarks.has(q.id)
                  return (
                    <button
                      key={q.id}
                      onClick={() => setPhase({ tag: 'question', section: phase.section, slot: phase.slot, qIdx: qi })}
                      className={cn(
                        'h-9 w-9 rounded text-[12px] font-semibold border transition-all relative',
                        answered ? 'bg-[#1d4ed8] border-[#1d4ed8] text-white' : 'bg-white border-slate-200 text-slate-500 hover:border-slate-400',
                        bm && 'ring-2 ring-amber-400 ring-offset-1',
                      )}
                    >
                      {qi + 1}
                    </button>
                  )
                })}
              </div>

              <div className="flex items-center gap-4 text-[12px] text-slate-400 mb-8">
                <div className="flex items-center gap-1.5"><span className="h-4 w-4 rounded bg-[#1d4ed8]" /> Answered</div>
                <div className="flex items-center gap-1.5"><span className="h-4 w-4 rounded bg-white border border-slate-200" /> Unanswered</div>
                <div className="flex items-center gap-1.5"><span className="h-4 w-4 rounded ring-2 ring-amber-400" /> Marked for review</div>
              </div>

              <button
                onClick={handleContinue}
                className={cn(
                  'w-full font-semibold py-3 rounded-lg text-[14px] transition-colors',
                  isFinal
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-[#1d4ed8] hover:bg-[#1e40af] text-white'
                )}
              >
                {continueLabel}
              </button>
              {!isFinal && (
                <p className="text-[11px] text-slate-400 text-center mt-2">
                  Once you continue, you cannot return to this module.
                </p>
              )}
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
      const html = generatePrintHTML({
        form, rwScaled, mathScaled, totalScore,
        rwM2Type, mathM2Type,
        rwM1Correct, rwM2Correct, rwTotal,
        mathM1Correct, mathM2Correct, mathTotal,
        aiFeedback, practicePrompts, hasMisses,
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
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Results — {form.title}</h1>
            {isHistoryView && initialAttempt?.completedAt && (
              <p className="text-sm text-slate-400 mt-0.5">
                Completed {new Date(initialAttempt.completedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}{' '}
                at {new Date(initialAttempt.completedAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            {isHistoryView && (
              <Link
                href="/exams"
                className="border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-[13px] font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                ← My Exams
              </Link>
            )}
            {isHistoryView ? (
              <Link
                href="/premade/sat/form-1"
                className="border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-[13px] font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                Take New Attempt
              </Link>
            ) : (
              <button
                onClick={handleRetake}
                className="border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-[13px] font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                Retake Test
              </button>
            )}
          </div>
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
