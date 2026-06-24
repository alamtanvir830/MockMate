import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { cn, scoreColor } from '@/lib/utils'
import { generateExplanations } from '@/lib/ai/generate-explanations'
import { AnkiSection } from './AnkiSection'
import { MindMapSection } from './MindMapSection'
import { StudyGuideSection } from './StudyGuideSection'
import { GroupPrivacyPrefs } from '../GroupPrivacyPrefs'
import { StartStudyRoundButton } from './StartStudyRoundButton'
import { RichText } from '@/components/ui/rich-text'

export const metadata: Metadata = { title: 'Exam Results' }

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
  question_type: string
  selected_answer: string | null
  is_correct: boolean
  explanation_correct: string | null
  explanation_incorrect: Record<string, string> | null
  // short response grading fields (null if not migrated or MC exam)
  score_out_of_10: number | null
  grading_summary: string | null
  missing_details: string[] | null
  incorrect_or_unclear_points: string[] | null
  what_to_improve: string | null
}

function ScoreRing({ percentage }: { percentage: number }) {
  const circumference = 2 * Math.PI * 40
  const offset = circumference - (percentage / 100) * circumference
  const color = percentage >= 80 ? '#10b981' : percentage >= 60 ? '#f59e0b' : '#ef4444'

  return (
    <div className="relative flex h-28 w-28 items-center justify-center">
      <svg className="absolute inset-0 -rotate-90" width="112" height="112">
        <circle cx="56" cy="56" r="40" fill="none" stroke="#e2e8f0" strokeWidth="8" />
        <circle
          cx="56"
          cy="56"
          r="40"
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-700"
        />
      </svg>
      <p className={cn('text-2xl font-bold', scoreColor(percentage))}>{percentage}%</p>
    </div>
  )
}

export default async function ResultsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Try as owner first; fall back to admin fetch for shared/group recipients.
  // Use select('*') so adding new columns (e.g. language) never breaks the query
  // when the DB migration hasn't run yet.
  const { data: ownedExam } = await supabase
    .from('exams')
    .select('*')
    .eq('id', id)
    .eq('user_id', user!.id)
    .maybeSingle()

  let exam = ownedExam

  if (!exam) {
    // Not the owner — could be a shared/group recipient; fetch without ownership filter
    const { data: sharedExam } = await createAdminClient()
      .from('exams')
      .select('*')
      .eq('id', id)
      .maybeSingle()
    exam = sharedExam
  }

  if (!exam) notFound()

  // Get the latest completed attempt
  const { data: attempt } = await supabase
    .from('exam_attempts')
    .select('*')
    .eq('exam_id', id)
    .eq('user_id', user!.id)
    .eq('status', 'completed')
    .order('submitted_at', { ascending: false })
    .limit(1)
    .single()

  if (!attempt) {
    return (
      <div className="max-w-xl mx-auto mt-12 text-center">
        <Card>
          <p className="font-semibold text-slate-800">No completed attempt found</p>
          <p className="mt-1 text-sm text-slate-500">
            You haven&apos;t submitted this exam yet.
          </p>
          <Link href={`/exams/${id}/take`} className="inline-block mt-4">
            <Button size="sm">Take exam</Button>
          </Link>
        </Card>
      </div>
    )
  }

  // Use admin client for questions and responses so RLS on those tables
  // never silently empties the results (score would show but review would be blank).
  const admin = createAdminClient()

  // Check if this is a group exam (has shared recipients)
  const { data: sharedRecipients } = await admin
    .from('exam_shared_recipients')
    .select('id')
    .eq('exam_id', id)
    .limit(1)
  const isGroupExam = (sharedRecipients?.length ?? 0) > 0

  // Get responses — try with grading columns, fall back if not migrated
  const { data: responsesWithGrading, error: gradingColErr } = await admin
    .from('exam_responses')
    .select('question_id, selected_answer, is_correct, marks_awarded, score_out_of_10, grading_summary, missing_details, incorrect_or_unclear_points, what_to_improve')
    .eq('attempt_id', attempt.id)

  const { data: responsesBasic } = gradingColErr
    ? await admin
        .from('exam_responses')
        .select('question_id, selected_answer, is_correct, marks_awarded')
        .eq('attempt_id', attempt.id)
    : { data: null }

  const responses = responsesBasic ?? responsesWithGrading

  console.log('[results] responses', {
    attemptId: attempt.id,
    count: responses?.length ?? 0,
    gradingColsAvailable: !gradingColErr,
  })

  // ── Fetch questions — try with explanation columns first, fall back if not migrated ──
  // Use admin client so RLS on questions never silently returns 0 rows.
  const { data: questionsWithExp, error: expQueryError } = await admin
    .from('questions')
    .select('id, question_text, correct_answer, options, marks, "order", question_type, explanation_correct, explanation_incorrect')
    .eq('exam_id', id)
    .order('order', { ascending: true })

  console.log('[results] questions', {
    examId: id,
    count: questionsWithExp?.length ?? 0,
    dbError: expQueryError?.message ?? null,
  })

  let rawQuestions: Array<{
    id: string
    question_text: string
    correct_answer: string
    options: string[]
    marks: number
    order: number
    question_type: string
    explanation_correct?: string | null
    explanation_incorrect?: Record<string, string> | null
  }>

  if (expQueryError) {
    // Explanation columns don't exist yet — fetch without them (still via admin)
    const { data: basicQuestions } = await admin
      .from('questions')
      .select('id, question_text, correct_answer, options, marks, "order", question_type')
      .eq('exam_id', id)
      .order('order', { ascending: true })
    rawQuestions = (basicQuestions ?? []).map((q) => ({
      ...q,
      question_type: (q as { question_type?: string }).question_type ?? 'multiple_choice',
      explanation_correct: null,
      explanation_incorrect: null,
    }))
  } else {
    rawQuestions = (questionsWithExp ?? []).map((q) => ({
      ...q,
      question_type: (q as { question_type?: string }).question_type ?? 'multiple_choice',
    }))
  }

  // ── On-demand explanation generation for questions that are missing them ──
  // Only runs when columns exist (no expQueryError), only for MC questions.
  if (!expQueryError) {
    const missing = rawQuestions.filter(
      (q) => !q.explanation_correct && (q.question_type ?? 'multiple_choice') !== 'short_response',
    )
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

        // Persist to DB so subsequent views are instant
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

        // Merge generated explanations into rawQuestions for this render
        const expById = new Map(generated.map((e) => [e.question_id, e]))
        rawQuestions = rawQuestions.map((q) => {
          const gen = expById.get(q.id)
          return gen
            ? { ...q, explanation_correct: gen.explanation_correct, explanation_incorrect: gen.explanation_incorrect }
            : q
        })
      } catch (e) {
        console.error('[results] on-demand explanation generation failed:', e)
        // Non-fatal — page renders without explanations for this load
      }
    }
  }

  // Build review items — merge question data with per-response grading data
  const responseMap = new Map((responses ?? []).map((r) => [r.question_id, r]))
  const reviewItems: ReviewQuestion[] = rawQuestions.map((q) => {
    const r = responseMap.get(q.id)
    const rAny = r as Record<string, unknown> | undefined
    return {
      ...q,
      options: (q.options as string[]) ?? [],
      question_type: q.question_type ?? 'multiple_choice',
      selected_answer: r?.selected_answer ?? null,
      is_correct: r?.is_correct ?? false,
      explanation_correct: q.explanation_correct ?? null,
      explanation_incorrect: (q.explanation_incorrect as Record<string, string> | null) ?? null,
      score_out_of_10: typeof rAny?.score_out_of_10 === 'number' ? rAny.score_out_of_10 : null,
      grading_summary: typeof rAny?.grading_summary === 'string' ? rAny.grading_summary : null,
      missing_details: Array.isArray(rAny?.missing_details) ? (rAny.missing_details as string[]) : null,
      incorrect_or_unclear_points: Array.isArray(rAny?.incorrect_or_unclear_points) ? (rAny.incorrect_or_unclear_points as string[]) : null,
      what_to_improve: typeof rAny?.what_to_improve === 'string' ? rAny.what_to_improve : null,
    }
  })

  const isShortResponseExam = reviewItems.some((q) => q.question_type === 'short_response')

  // For short response, treat score < 8 as "not correct"; for MC use is_correct directly
  const correctCount = reviewItems.filter((q) => q.is_correct).length
  const incorrectCount = reviewItems.length - correctCount
  const aiFeedback = attempt.ai_feedback as AIFeedback | null

  // incorrectQuestions: wrong OR unanswered — used by MindMap and Anki
  const incorrectQuestions = reviewItems
    .filter((q) => !q.is_correct)
    .map((q) => ({
      question_text: q.question_text,
      options: q.options,
      correct_answer: q.correct_answer,
      selected_answer: q.selected_answer,
      explanation_correct: q.explanation_correct,
      explanation_incorrect: q.explanation_incorrect,
    }))

  // allAnswered: true only when every question has a response (used by MindMap empty state)
  const allAnswered = reviewItems.every((q) => q.selected_answer !== null)

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Exam Results</h1>
        <p className="mt-1 text-sm text-slate-500">
          {exam.title} ·{' '}
          {attempt.submitted_at
            ? new Date(attempt.submitted_at).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })
            : 'Completed'}
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
              <span className="text-slate-400 text-2xl font-normal">
                /{attempt.total_marks}
              </span>
            </p>
            <p className="mt-2 text-slate-300">
              {(attempt.percentage ?? 0) >= 80
                ? "Excellent work — you're well prepared."
                : (attempt.percentage ?? 0) >= 60
                ? 'Good effort. A few areas need attention.'
                : 'Keep going — review the questions below.'}
            </p>
            <div className="mt-4 flex flex-wrap gap-3 justify-center sm:justify-start text-sm">
              {isShortResponseExam ? (
                <>
                  <span className="rounded-full bg-white/10 border border-white/20 px-3 py-1 text-slate-200">
                    {correctCount} strong (≥8/10)
                  </span>
                  <span className="rounded-full bg-white/10 border border-white/20 px-3 py-1 text-slate-200">
                    {incorrectCount} need review
                  </span>
                </>
              ) : (
                <>
                  <span className="rounded-full bg-white/10 border border-white/20 px-3 py-1 text-slate-200">
                    {correctCount} correct
                  </span>
                  <span className="rounded-full bg-white/10 border border-white/20 px-3 py-1 text-slate-200">
                    {incorrectCount} incorrect
                  </span>
                </>
              )}
              <span className="rounded-full bg-white/10 border border-white/20 px-3 py-1 text-slate-200">
                {exam.subject}
              </span>
              {(exam as any).adaptive_mode && (
                <span className="rounded-full bg-indigo-500/30 border border-indigo-400/40 px-3 py-1 text-indigo-200">
                  Adaptive difficulty
                </span>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Short response grading explanation */}
      {isShortResponseExam && (
        <div className="rounded-xl border border-blue-100 bg-blue-50 px-5 py-3.5 text-sm text-blue-800">
          <span className="font-medium">How this was graded: </span>
          Short response answers are compared to an optimal answer and rubric by AI. Each question is scored out of 10, then converted into a final percentage.
        </div>
      )}

      {/* Study Round — only shown when there are missed questions */}
      {incorrectCount > 0 && (
        <StartStudyRoundButton
          examId={id}
          incorrectQuestions={incorrectQuestions}
          subject={exam.subject}
          examTitle={exam.title}
          language={(exam as { language?: string }).language ?? undefined}
          questionCount={reviewItems.length}
          standardizedExam={(exam as { standardized_exam?: string }).standardized_exam ?? undefined}
        />
      )}

      {/* Group privacy preferences — only for group exams */}
      {isGroupExam && (
        <GroupPrivacyPrefs
          examId={id}
          initialShowScore={(attempt as any).show_score_to_group ?? null}
          initialIncludeInRankings={(attempt as any).include_in_rankings ?? null}
        />
      )}

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
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600 mb-1.5">
                What you did well
              </p>
              <p className="text-sm text-emerald-800 leading-relaxed">{aiFeedback.what_went_well}</p>
            </div>
            <div className="rounded-xl bg-amber-50 border border-amber-100 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-amber-600 mb-1.5">
                What to review
              </p>
              <p className="text-sm text-amber-800 leading-relaxed">{aiFeedback.what_to_review}</p>
            </div>
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1.5">
                Pattern in your mistakes
              </p>
              <p className="text-sm text-slate-700 leading-relaxed">{aiFeedback.mistake_pattern}</p>
            </div>
          </div>
        </Card>
      )}

      {/* Condensed Study Guide */}
      <StudyGuideSection
        attemptId={attempt.id}
        incorrectQuestions={incorrectQuestions}
        totalQuestions={reviewItems.length}
        allAnswered={allAnswered}
        subject={exam.subject}
        examTitle={exam.title}
        language={(exam as { language?: string }).language ?? undefined}
      />

      {/* AI Mind Map */}
      <MindMapSection
        attemptId={attempt.id}
        incorrectQuestions={incorrectQuestions}
        totalQuestions={reviewItems.length}
        allAnswered={allAnswered}
        subject={exam.subject}
        examTitle={exam.title}
        language={(exam as { language?: string }).language ?? undefined}
      />

      {/* Anki flashcard generation */}
      <AnkiSection
        incorrectQuestions={incorrectQuestions}
        subject={exam.subject}
        examTitle={exam.title}
        language={(exam as { language?: string }).language ?? undefined}
      />

      {/* Per-question review */}
      <Card>
        <CardHeader>
          <CardTitle>Question Review</CardTitle>
          <CardDescription>
            {isShortResponseExam
              ? `${attempt.score}/${attempt.total_marks} points · ${attempt.percentage ?? 0}%`
              : `${correctCount} of ${reviewItems.length} correct`}
          </CardDescription>
        </CardHeader>
        <div className="space-y-3">
          {reviewItems.map((q, i) =>
            q.question_type === 'short_response' ? (
              <ShortResponseCard key={q.id} question={q} index={i} />
            ) : (
              <QuestionCard key={q.id} question={q} index={i} />
            ),
          )}
        </div>
      </Card>

      {/* Performance nudge */}
      <div className="rounded-xl border border-indigo-100 bg-indigo-50 px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1">
          <p className="text-sm font-medium text-indigo-900">
            Be sure to input your real exam score in the{' '}
            <span className="font-semibold">Previous Exam Performance</span> page!
          </p>
          <p className="mt-0.5 text-xs text-indigo-600">
            Track how your practice results compare to the real thing.
          </p>
        </div>
        <Link href="/dashboard" className="shrink-0">
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            Return to Dashboard
          </Button>
        </Link>
      </div>

      <div className="pb-4" />
    </div>
  )
}

function ShortResponseCard({ question: q, index: i }: { question: ReviewQuestion; index: number }) {
  const score = q.score_out_of_10 ?? (q.is_correct ? 10 : 0)
  const scoreColor =
    score >= 9 ? 'text-emerald-700' : score >= 7 ? 'text-amber-700' : 'text-red-700'
  const bgColor =
    score >= 9 ? 'bg-emerald-50 border-emerald-100' : score >= 7 ? 'bg-amber-50 border-amber-100' : 'bg-red-50 border-red-100'
  const dividerColor =
    score >= 9 ? 'border-emerald-200' : score >= 7 ? 'border-amber-200' : 'border-red-200'

  return (
    <div className={cn('rounded-xl border p-4', bgColor)}>
      <div className="flex items-start gap-3">
        <span className={cn('flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold mt-0.5 text-white',
          score >= 9 ? 'bg-emerald-600' : score >= 7 ? 'bg-amber-500' : 'bg-red-500',
        )}>
          {i + 1}
        </span>
        <div className="flex-1 min-w-0 space-y-3">
          {/* Question */}
          <p className="text-sm font-medium text-slate-900 leading-relaxed">{q.question_text}</p>

          {/* Score badge */}
          <div className="flex items-center gap-2">
            <span className={cn('text-sm font-bold', scoreColor)}>{score}/10</span>
            <span className="text-xs text-slate-400">
              {score >= 9 ? 'Excellent' : score >= 7 ? 'Good' : score >= 5 ? 'Partial' : 'Needs work'}
            </span>
          </div>

          {/* User answer */}
          <div className={cn('pt-3 border-t space-y-3', dividerColor)}>
            <div>
              <p className="text-xs font-semibold text-slate-500 mb-1">Your answer</p>
              <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-wrap">
                {q.selected_answer?.trim() || <span className="italic text-slate-400">No answer provided</span>}
              </p>
            </div>

            {/* Optimal answer */}
            <div>
              <p className="text-xs font-semibold text-emerald-700 mb-1">Optimal answer</p>
              <p className="text-xs text-slate-700 leading-relaxed">{q.correct_answer}</p>
            </div>

            {/* Grading summary */}
            {q.grading_summary && (
              <div className="rounded-lg bg-white/70 border border-slate-200 px-3 py-2">
                <p className="text-xs font-semibold text-slate-500 mb-0.5">Grading summary</p>
                <p className="text-xs text-slate-700 leading-relaxed">{q.grading_summary}</p>
              </div>
            )}

            {/* Missing details */}
            {q.missing_details && q.missing_details.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-amber-700 mb-1">Missing details</p>
                <ul className="space-y-0.5">
                  {q.missing_details.map((d, di) => (
                    <li key={di} className="flex items-start gap-1.5 text-xs text-slate-700">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-amber-400" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Incorrect or unclear points */}
            {q.incorrect_or_unclear_points && q.incorrect_or_unclear_points.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-red-600 mb-1">Incorrect or unclear points</p>
                <ul className="space-y-0.5">
                  {q.incorrect_or_unclear_points.map((pt, pi) => (
                    <li key={pi} className="flex items-start gap-1.5 text-xs text-slate-700">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-red-400" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* What to improve */}
            {q.what_to_improve && (
              <div className="rounded-lg bg-blue-50 border border-blue-100 px-3 py-2">
                <p className="text-xs font-semibold text-blue-700 mb-0.5">What to improve</p>
                <p className="text-xs text-blue-800 leading-relaxed">{q.what_to_improve}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function QuestionCard({ question: q, index: i }: { question: ReviewQuestion; index: number }) {
  const hasExplanations = !!(q.explanation_correct || q.explanation_incorrect)

  return (
    <div
      className={cn(
        'rounded-xl border p-4',
        q.is_correct ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100',
      )}
    >
      <div className="flex items-start gap-3">
        <span
          className={cn(
            'flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold mt-0.5',
            q.is_correct ? 'bg-emerald-600 text-white' : 'bg-red-500 text-white',
          )}
        >
          {q.is_correct ? '✓' : '✗'}
        </span>
        <div className="flex-1 min-w-0">
          {/* Question text */}
          <p className="text-sm font-medium text-slate-900 leading-relaxed">
            {i + 1}. {q.question_text}
          </p>

          {/* Answer summary */}
          <div className="mt-2 space-y-1">
            <p className="text-xs text-slate-500">
              Your answer:{' '}
              <span className={cn('font-medium', q.is_correct ? 'text-emerald-700' : 'text-red-700')}>
                {q.selected_answer ?? 'No answer'}
              </span>
            </p>
            {!q.is_correct && (
              <p className="text-xs text-slate-500">
                Correct answer:{' '}
                <span className="font-medium text-emerald-700">{q.correct_answer}</span>
              </p>
            )}
          </div>

          {/* ── Explanations ── */}
          {hasExplanations && (
            <div
              className={cn(
                'mt-3 pt-3 border-t space-y-3',
                q.is_correct ? 'border-emerald-200' : 'border-red-200',
              )}
            >
              {/* Correct answer explanation */}
              {q.explanation_correct && (
                <div>
                  <p className="text-xs font-semibold text-emerald-700 mb-1">
                    Why this is correct
                  </p>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    <RichText text={q.explanation_correct} />
                  </p>
                </div>
              )}

              {/* Incorrect option explanations */}
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
          <div key={letter} className="text-xs text-slate-500 leading-relaxed">
            <p className="mb-0.5">
              <span className="font-medium text-slate-600">{letter}.</span>{' '}
              <span className="text-slate-400">{opt}</span>
            </p>
            <p className="pl-4"><RichText text={explanations[letter]} /></p>
          </div>
        ))}
      </div>
    </div>
  )
}
