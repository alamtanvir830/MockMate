import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { ExamTaker } from '@/components/exam/exam-taker'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn, scoreColor } from '@/lib/utils'
import { submitSharedExam } from '@/app/actions/shared-attempts'
import { generateExplanations } from '@/lib/ai/generate-explanations'
import { GroupPrivacyPrefs } from '../GroupPrivacyPrefs'

export const metadata: Metadata = { title: 'Shared Exam' }

const OPTION_LETTERS = ['A', 'B', 'C', 'D'] as const

interface AIFeedback {
  what_went_well: string
  what_to_review: string
  mistake_pattern: string
}

interface ReviewQuestion {
  id: string
  question_text: string
  correct_answer: string
  options: string[]
  marks: number
  order: number
  selected_answer: string | null
  is_correct: boolean
  explanation_correct: string | null
  explanation_incorrect: Record<string, string> | null
}

function ScoreRing({ percentage }: { percentage: number }) {
  const circumference = 2 * Math.PI * 40
  const offset = circumference - (percentage / 100) * circumference
  const color = percentage >= 80 ? '#10b981' : percentage >= 60 ? '#f59e0b' : '#ef4444'
  return (
    <div className="relative flex h-28 w-28 items-center justify-center">
      <svg className="absolute inset-0 -rotate-90" width="112" height="112">
        <circle cx="56" cy="56" r="40" fill="none" stroke="#e2e8f0" strokeWidth="8" />
        <circle cx="56" cy="56" r="40" fill="none" stroke={color} strokeWidth="8"
          strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset}
          className="transition-all duration-700" />
      </svg>
      <p className={cn('text-2xl font-bold', scoreColor(percentage))}>{percentage}%</p>
    </div>
  )
}

function IncorrectExplanations({
  options,
  correctAnswer,
  explanations,
}: {
  options: string[]
  correctAnswer: string
  explanations: Record<string, string>
}) {
  const incorrectEntries = options
    .map((opt, idx) => ({ opt, letter: OPTION_LETTERS[idx] }))
    .filter(({ opt }) => opt !== correctAnswer)
    .filter(({ letter }) => letter && explanations[letter])

  if (incorrectEntries.length === 0) return null

  return (
    <div>
      <p className="text-xs font-semibold text-slate-400 mb-1.5">
        Why the other options are wrong
      </p>
      <div className="space-y-1.5">
        {incorrectEntries.map(({ opt, letter }) => (
          <p key={letter} className="text-xs text-slate-500 leading-relaxed">
            <span className="font-medium text-slate-600">{letter}.</span>{' '}
            <span className="text-slate-400">{opt}</span>
            {' — '}
            {explanations[letter]}
          </p>
        ))}
      </div>
    </div>
  )
}

function QuestionCard({ question: q, index: i }: { question: ReviewQuestion; index: number }) {
  const hasExplanations = !!(q.explanation_correct || q.explanation_incorrect)

  return (
    <div className={cn('rounded-xl border p-4', q.is_correct ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100')}>
      <div className="flex items-start gap-3">
        <span className={cn('flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold mt-0.5', q.is_correct ? 'bg-emerald-600 text-white' : 'bg-red-500 text-white')}>
          {q.is_correct ? '✓' : '✗'}
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-900 leading-relaxed">
            {i + 1}. {q.question_text}
          </p>
          <div className="mt-2 space-y-1">
            <p className="text-xs text-slate-500">
              Your answer:{' '}
              <span className={cn('font-medium', q.is_correct ? 'text-emerald-700' : 'text-red-700')}>
                {q.selected_answer ?? 'No answer'}
              </span>
            </p>
            {!q.is_correct && (
              <p className="text-xs text-slate-500">
                Correct answer: <span className="font-medium text-emerald-700">{q.correct_answer}</span>
              </p>
            )}
          </div>

          {/* ── Explanations ── */}
          {hasExplanations && (
            <div className={cn('mt-3 pt-3 border-t space-y-3', q.is_correct ? 'border-emerald-200' : 'border-red-200')}>
              {q.explanation_correct && (
                <div>
                  <p className="text-xs font-semibold text-emerald-700 mb-1">Why this is correct</p>
                  <p className="text-xs text-slate-700 leading-relaxed">{q.explanation_correct}</p>
                </div>
              )}
              {q.explanation_incorrect && (
                <IncorrectExplanations
                  options={q.options}
                  correctAnswer={q.correct_answer}
                  explanations={q.explanation_incorrect}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default async function SharedExamPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const admin = createAdminClient()

  // Verify this user's email is a shared recipient
  const { data: recipient } = await admin
    .from('exam_shared_recipients')
    .select('id')
    .eq('exam_id', id)
    .eq('email', user!.email!)
    .single()

  if (!recipient) {
    return (
      <div className="max-w-xl mx-auto mt-12">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-10 text-center">
          <p className="font-semibold text-red-800">Access denied</p>
          <p className="mt-1 text-sm text-red-600">
            This exam was not shared with your account ({user!.email}).
          </p>
          <Link href="/dashboard" className="mt-4 inline-block">
            <Button variant="outline" size="sm">Back to dashboard</Button>
          </Link>
        </div>
      </div>
    )
  }

  // Fetch exam info
  const { data: exam } = await admin
    .from('exams')
    .select('id, title, subject, exam_date, time_limit_minutes, adaptive_mode')
    .eq('id', id)
    .single()

  if (!exam) notFound()

  // Check if this user already has a completed attempt
  const { data: attempt } = await admin
    .from('exam_attempts')
    .select('*')
    .eq('exam_id', id)
    .eq('user_id', user!.id)
    .eq('status', 'completed')
    .order('submitted_at', { ascending: false })
    .limit(1)
    .single()

  // ── RESULTS VIEW — user has already submitted ──
  if (attempt) {
    const { data: responses } = await admin
      .from('exam_responses')
      .select('question_id, selected_answer, is_correct, marks_awarded')
      .eq('attempt_id', attempt.id)

    // ── Fetch questions — try with explanation columns first ──
    const { data: questionsWithExp, error: expQueryError } = await admin
      .from('questions')
      .select('id, question_text, correct_answer, options, marks, "order", explanation_correct, explanation_incorrect')
      .eq('exam_id', id)
      .order('order', { ascending: true })

    let rawQuestions: Array<{
      id: string
      question_text: string
      correct_answer: string
      options: string[]
      marks: number
      order: number
      explanation_correct?: string | null
      explanation_incorrect?: Record<string, string> | null
    }>

    if (expQueryError) {
      const { data: basicQuestions } = await admin
        .from('questions')
        .select('id, question_text, correct_answer, options, marks, "order"')
        .eq('exam_id', id)
        .order('order', { ascending: true })
      rawQuestions = (basicQuestions ?? []).map((q) => ({ ...q, explanation_correct: null, explanation_incorrect: null }))
    } else {
      rawQuestions = questionsWithExp ?? []
    }

    // ── On-demand explanation generation for questions missing them ──
    if (!expQueryError) {
      const missing = rawQuestions.filter((q) => !q.explanation_correct)
      if (missing.length > 0) {
        try {
          const generated = await generateExplanations(
            missing.map((q) => ({
              id: q.id,
              question_text: q.question_text,
              options: q.options,
              correct_answer: q.correct_answer,
            })),
            exam.subject,
          )

          await Promise.allSettled(
            generated.map((exp) =>
              admin
                .from('questions')
                .update({
                  explanation_correct: exp.explanation_correct,
                  explanation_incorrect: exp.explanation_incorrect,
                })
                .eq('id', exp.question_id),
            ),
          )

          const expById = new Map(generated.map((e) => [e.question_id, e]))
          rawQuestions = rawQuestions.map((q) => {
            const gen = expById.get(q.id)
            return gen
              ? { ...q, explanation_correct: gen.explanation_correct, explanation_incorrect: gen.explanation_incorrect }
              : q
          })
        } catch (e) {
          console.error('[shared-results] on-demand explanation generation failed:', e)
        }
      }
    }

    const responseMap = new Map((responses ?? []).map((r) => [r.question_id, r]))
    const reviewItems: ReviewQuestion[] = rawQuestions.map((q) => ({
      ...q,
      selected_answer: responseMap.get(q.id)?.selected_answer ?? null,
      is_correct: responseMap.get(q.id)?.is_correct ?? false,
      explanation_correct: q.explanation_correct ?? null,
      explanation_incorrect: (q.explanation_incorrect as Record<string, string> | null) ?? null,
    }))

    const correctCount = reviewItems.filter((q) => q.is_correct).length
    const incorrectCount = reviewItems.length - correctCount
    const aiFeedback = attempt.ai_feedback as AIFeedback | null

    return (
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-indigo-500 mb-1">Shared exam</p>
          <h1 className="text-2xl font-bold text-slate-900">Your Results</h1>
          <p className="mt-1 text-sm text-slate-500">
            {exam.title} ·{' '}
            {new Date(attempt.submitted_at).toLocaleDateString('en-US', {
              month: 'long', day: 'numeric', year: 'numeric',
            })}
          </p>
        </div>

        {/* Score hero */}
        <Card className="bg-gradient-to-br from-slate-900 to-slate-800 text-white border-0 shadow-xl">
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <ScoreRing percentage={attempt.percentage ?? 0} />
            <div className="text-center sm:text-left">
              <p className="text-slate-400 text-sm mb-1">Your score</p>
              <p className="text-4xl font-bold">
                {attempt.score}
                <span className="text-slate-400 text-2xl font-normal">/{attempt.total_marks}</span>
              </p>
              <p className="mt-2 text-slate-300">
                {(attempt.percentage ?? 0) >= 80
                  ? "Excellent work — you're well prepared."
                  : (attempt.percentage ?? 0) >= 60
                  ? 'Good effort. A few areas need attention.'
                  : 'Keep going — review the questions below.'}
              </p>
              <div className="mt-4 flex flex-wrap gap-3 justify-center sm:justify-start text-sm">
                <span className="rounded-full bg-white/10 border border-white/20 px-3 py-1 text-slate-200">
                  {correctCount} correct
                </span>
                <span className="rounded-full bg-white/10 border border-white/20 px-3 py-1 text-slate-200">
                  {incorrectCount} incorrect
                </span>
                <span className="rounded-full bg-white/10 border border-white/20 px-3 py-1 text-slate-200">
                  {exam.subject}
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Group privacy preferences */}
        <GroupPrivacyPrefs
          examId={id}
          initialShowScore={attempt.show_score_to_group ?? null}
          initialIncludeInRankings={attempt.include_in_rankings ?? null}
        />

        {/* AI Feedback */}
        {aiFeedback && (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="h-4 w-4 text-indigo-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                </div>
                <div>
                  <CardTitle>AI Feedback</CardTitle>
                  <CardDescription>Personalised based on your answers</CardDescription>
                </div>
              </div>
            </CardHeader>
            <div className="space-y-4">
              <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600 mb-1.5">What you did well</p>
                <p className="text-sm text-emerald-800 leading-relaxed">{aiFeedback.what_went_well}</p>
              </div>
              <div className="rounded-xl bg-amber-50 border border-amber-100 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-amber-600 mb-1.5">What to review</p>
                <p className="text-sm text-amber-800 leading-relaxed">{aiFeedback.what_to_review}</p>
              </div>
              <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1.5">Pattern in your mistakes</p>
                <p className="text-sm text-slate-700 leading-relaxed">{aiFeedback.mistake_pattern}</p>
              </div>
            </div>
          </Card>
        )}

        {/* Question review */}
        <Card>
          <CardHeader>
            <CardTitle>Question Review</CardTitle>
            <CardDescription>{correctCount} of {reviewItems.length} correct</CardDescription>
          </CardHeader>
          <div className="space-y-3">
            {reviewItems.map((q, i) => (
              <QuestionCard key={q.id} question={q} index={i} />
            ))}
          </div>
        </Card>

        <div className="pb-4">
          <Link href="/dashboard">
            <Button variant="outline">Return to Dashboard</Button>
          </Link>
        </div>
      </div>
    )
  }

  // ── TAKE VIEW — user hasn't submitted yet ──
  const { data: questions, error: qErr } = await admin
    .from('questions')
    .select('*')
    .eq('exam_id', id)
    .order('order', { ascending: true })

  if (qErr || !questions || questions.length === 0) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center">
          <p className="font-semibold text-red-800">No questions found for this exam.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <div className="rounded-lg border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm text-indigo-700">
        <strong>Shared exam</strong> — this is an independent attempt. Your results are yours alone and do not affect anyone else.
      </div>
      <ExamTaker exam={exam} questions={questions} submitAction={submitSharedExam} />
    </div>
  )
}
