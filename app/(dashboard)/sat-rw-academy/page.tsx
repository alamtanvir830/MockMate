'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { MASTERY_LABELS, MASTERY_BG, MASTERY_COLORS } from '@/lib/academy/mastery'
import type { SkillMastery, MasteryStatus } from '@/lib/academy/mastery'
import { transitionQuestions } from '@/lib/academy/transitions/questions'
import { academyPassages } from '@/lib/academy/passages'

// ── Types ──────────────────────────────────────────────────────────────────────

interface LessonProgress {
  lessonSlug: string
  skillSlug: string
  status: 'in_progress' | 'completed'
  completedAt: string | null
}

interface ReviewQueueItem {
  id: string
  questionId: string
  sourceType: string
  skillSlug: string
  reviewStage: number
}

interface ReviewQueueResponse {
  items: ReviewQueueItem[]
  totalDue: number
}

// ── Constants ──────────────────────────────────────────────────────────────────

const WRITING_SLUGS = ['boundaries', 'form-structure-sense', 'transitions', 'rhetorical-synthesis']
const READING_SLUGS = [
  'words-in-context', 'central-ideas-details', 'text-structure-purpose',
  'command-of-evidence', 'quantitative-evidence', 'inferences',
]
const ALL_SLUGS = [...WRITING_SLUGS, ...READING_SLUGS]
const TOTAL_SKILLS = ALL_SLUGS.length

// ── Small helpers ──────────────────────────────────────────────────────────────

function MasteryPill({ status }: { status: MasteryStatus }) {
  return (
    <span className={cn(
      'inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium border border-current/10',
      MASTERY_BG[status], MASTERY_COLORS[status],
    )}>
      {MASTERY_LABELS[status]}
    </span>
  )
}

function StatBox({ value, label, color = 'slate' }: { value: number; label: string; color?: 'slate' | 'emerald' | 'blue' }) {
  return (
    <div className="text-center">
      <p className={cn('text-2xl font-bold',
        color === 'emerald' ? 'text-emerald-600' : color === 'blue' ? 'text-sky-600' : 'text-slate-900',
      )}>{value}</p>
      <p className="text-xs text-slate-500 mt-0.5">{label}</p>
    </div>
  )
}

// ── Module card ────────────────────────────────────────────────────────────────

interface ModuleCardProps {
  number: number
  title: string
  description: string
  href: string
  buttonLabel: string
  badge?: string
  progress?: string
  masteryPills?: MasteryStatus[]
}

function ModuleCard({ number, title, description, href, buttonLabel, badge, progress, masteryPills }: ModuleCardProps) {
  return (
    <div className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-500 mt-0.5">
        {number}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 flex-wrap">
          <div>
            <p className="font-semibold text-slate-900 text-sm">{title}</p>
            {badge && (
              <span className="inline-block mt-0.5 text-[10px] text-slate-500">{badge}</span>
            )}
          </div>
          <Link
            href={href}
            className="shrink-0 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3.5 py-1.5 transition-colors whitespace-nowrap"
          >
            {buttonLabel}
          </Link>
        </div>
        <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">{description}</p>
        {masteryPills && masteryPills.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {masteryPills.map((s, i) => <MasteryPill key={i} status={s} />)}
          </div>
        )}
        {progress && (
          <p className="mt-1.5 text-[11px] text-slate-400">{progress}</p>
        )}
      </div>
    </div>
  )
}

// ── Main page ──────────────────────────────────────────────────────────────────

export default function SatRwAcademyPage() {
  const [mastery, setMastery] = useState<Record<string, SkillMastery>>({})
  const [lessons, setLessons] = useState<LessonProgress[]>([])
  const [reviewsDue, setReviewsDue] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch('/api/academy/attempts').then(r => r.ok ? r.json() : []) as Promise<SkillMastery[]>,
      fetch('/api/academy/lesson-progress').then(r => r.ok ? r.json() : []) as Promise<LessonProgress[]>,
      fetch('/api/academy/review-queue').then(r => r.ok ? r.json() : { items: [], totalDue: 0 }) as Promise<ReviewQueueResponse>,
    ])
      .then(([masteryArr, lessonArr, queue]) => {
        const map: Record<string, SkillMastery> = {}
        for (const m of masteryArr) map[m.skillSlug] = m
        setMastery(map)
        setLessons(lessonArr)
        setReviewsDue(queue.totalDue ?? queue.items?.length ?? 0)
      })
      .catch(() => {/* non-blocking */})
      .finally(() => setLoading(false))
  }, [])

  // Derived metrics
  const hasAny = ALL_SLUGS.some(s => mastery[s] && mastery[s].status !== 'not_started')
  const totalStarted = ALL_SLUGS.filter(s => mastery[s] && mastery[s].status !== 'not_started').length
  const totalProficient = ALL_SLUGS.filter(s => mastery[s] && (mastery[s].status === 'proficient' || mastery[s].status === 'mastered')).length
  const totalMastered = ALL_SLUGS.filter(s => mastery[s]?.status === 'mastered').length
  const lessonsCompleted = lessons.filter(l => l.status === 'completed').length

  // Weakest skill with attempts
  const weakestSkill = ALL_SLUGS
    .filter(s => mastery[s] && mastery[s].attemptCount > 0)
    .sort((a, b) => (mastery[a]?.masteryScore ?? 100) - (mastery[b]?.masteryScore ?? 100))[0] ?? null

  // Last opened lesson (most recent by completion)
  const lastLesson = lessons.length > 0
    ? lessons.sort((a, b) => (b.completedAt ?? '').localeCompare(a.completedAt ?? ''))[0]
    : null

  const writingMastery = WRITING_SLUGS.map(s => mastery[s]?.status ?? 'not_started' as MasteryStatus)
  const readingMastery = READING_SLUGS.map(s => mastery[s]?.status ?? 'not_started' as MasteryStatus)
  const writingCompleted = WRITING_SLUGS.filter(s => lessons.some(l => l.lessonSlug === s && l.status === 'completed')).length
  const readingCompleted = READING_SLUGS.filter(s => lessons.some(l => l.lessonSlug === s && l.status === 'completed')).length

  const totalTransitions = transitionQuestions.length
  const totalPassages = academyPassages.length

  return (
    <div className="space-y-8 max-w-3xl">

      {/* ── Course banner ──────────────────────────────────────────────────── */}
      <div className="rounded-xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} className="h-7 w-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-emerald-900">SAT R&W Academy</h1>
            <p className="text-sm text-emerald-700 mt-0.5">Learn the rules, master the strategies, and strengthen your weakest skills.</p>
          </div>
        </div>
      </div>

      {/* ── Welcome + Progress ─────────────────────────────────────────────── */}
      <div className="grid gap-6 lg:grid-cols-5">

        {/* Welcome text */}
        <div className="lg:col-span-3 space-y-3">
          <h2 className="text-lg font-bold text-slate-900">Welcome to the SAT R&W Academy</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Welcome to the SAT R&W Academy, your complete course for building the Reading and Writing skills tested on the SAT. Work through the lessons in the recommended order, practice each skill with original questions, and use your results to focus on the areas that need the most improvement.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            Start with the R&W Diagnostic if you are new to the academy. It will identify your strongest and weakest skills and recommend where you should begin. You can also use the course menu to open any lesson, trainer, or review tool directly.
          </p>
          <p className="text-sm text-slate-500 italic">
            Begin with the diagnostic, then follow the recommended course path at your own pace.
          </p>
        </div>

        {/* Progress card */}
        <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">Your Academy Progress</p>

          {loading ? (
            <div className="space-y-2">
              <div className="h-4 w-3/4 animate-pulse rounded bg-slate-100" />
              <div className="h-4 w-1/2 animate-pulse rounded bg-slate-100" />
            </div>
          ) : !hasAny ? (
            <div className="space-y-3">
              <p className="text-xs text-slate-500 leading-relaxed">
                Your progress will appear here after you complete the diagnostic or begin your first lesson.
              </p>
              <Link
                href="/sat-rw-academy/diagnostic"
                className="block w-full rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold text-center px-4 py-2.5 transition-colors"
              >
                Start R&W Diagnostic
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <StatBox value={totalStarted} label="started" />
                <StatBox value={totalProficient} label="proficient+" color="blue" />
                <StatBox value={totalMastered} label="mastered" color="emerald" />
              </div>
              <div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 mb-1">
                  <div
                    className="bg-emerald-500 h-1.5 rounded-full transition-all"
                    style={{ width: `${Math.round((totalProficient / TOTAL_SKILLS) * 100)}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-400 text-right">{totalProficient}/{TOTAL_SKILLS} proficient+</p>
              </div>
              {reviewsDue > 0 && (
                <div className="rounded-lg bg-amber-50 border border-amber-200 px-3 py-2">
                  <p className="text-xs font-semibold text-amber-700">{reviewsDue} review{reviewsDue !== 1 ? 's' : ''} due</p>
                </div>
              )}
              <Link
                href={lastLesson ? `/sat-rw-academy/lesson/${lastLesson.lessonSlug}` : '/sat-rw-academy/diagnostic'}
                className="block w-full rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold text-center px-4 py-2.5 transition-colors"
              >
                Continue Learning
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* ── Start Here ────────────────────────────────────────────────────── */}
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400 mb-3">Start Here</h2>
        <div className="rounded-xl border-2 border-emerald-200 bg-white p-5">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-slate-900">R&W Diagnostic</p>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Take a short mixed assessment to identify your strongest and weakest Reading and Writing skills and receive a recommended starting path.
              </p>
              <p className="text-[11px] text-slate-400 mt-2">24 original SAT-style questions · Covers all 10 skills · ~15–20 min</p>
            </div>
            <Link
              href="/sat-rw-academy/diagnostic"
              className="shrink-0 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-4 py-2 transition-colors whitespace-nowrap"
            >
              {hasAny ? 'Retake Diagnostic' : 'Start Diagnostic'}
            </Link>
          </div>
        </div>
      </div>

      {/* ── Course Modules ────────────────────────────────────────────────── */}
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400 mb-1">Course Modules</h2>
        <p className="text-xs text-slate-500 mb-4">
          Follow these modules in order for a structured course experience, or use the academy menu to jump directly to a specific skill.
        </p>
        <div className="space-y-3">

          <ModuleCard
            number={1}
            title="Writing Skills"
            description="Master grammar, sentence structure, punctuation, transitions, and rhetorical decision-making through focused lessons and targeted practice."
            href="/sat-rw-academy/writing"
            buttonLabel="Open Writing Skills"
            badge={`4 lessons`}
            progress={hasAny ? `${writingCompleted} of 4 lessons completed` : undefined}
            masteryPills={hasAny ? writingMastery : undefined}
          />

          <ModuleCard
            number={2}
            title="Reading Skills"
            description="Learn how to identify central ideas, analyze structure, use evidence, interpret data, understand words in context, and make supported inferences."
            href="/sat-rw-academy/reading"
            buttonLabel="Open Reading Skills"
            badge={`6 lessons`}
            progress={hasAny ? `${readingCompleted} of 6 lessons completed` : undefined}
            masteryPills={hasAny ? readingMastery : undefined}
          />

          <ModuleCard
            number={3}
            title="Vocabulary Trainer"
            description="Build high-utility academic vocabulary and practice selecting the meaning that best fits each context."
            href="/sat-rw-academy/vocabulary"
            buttonLabel="Practice Vocabulary"
            badge="120+ academic words · flashcard, multiple choice, fill-in-the-blank"
          />

          <ModuleCard
            number={4}
            title="Transition Trainer"
            description="Learn the logical relationships behind transitions and practice choosing the connection that accurately links two ideas."
            href="/sat-rw-academy/transitions"
            buttonLabel="Practice Transitions"
            badge={`${totalTransitions} original questions across 9 categories`}
          />

          <ModuleCard
            number={5}
            title="Reading Speed"
            description="Improve your reading pace while protecting comprehension through RSVP practice and original academy passages."
            href="/sat-rw-academy/reading-speed"
            buttonLabel="Start Reading Practice"
            badge={`Paste your own text or choose from ${totalPassages} academy passages`}
          />

          <ModuleCard
            number={6}
            title="Review Queue"
            description="Revisit missed and difficult questions at spaced intervals so weak skills are reinforced instead of forgotten."
            href="/sat-rw-academy/review"
            buttonLabel={reviewsDue > 0 ? `Start Review (${reviewsDue} due)` : 'View Review Queue'}
            badge="Spaced repetition · 1 / 3 / 7 / 14 / 30 day intervals"
            progress={reviewsDue > 0 ? `${reviewsDue} question${reviewsDue !== 1 ? 's' : ''} due for review` : 'No reviews due right now'}
          />

          <ModuleCard
            number={7}
            title="Study Plan"
            description="Turn your weakest skills, due reviews, vocabulary practice, and reading sessions into a realistic weekly schedule."
            href="/sat-rw-academy/study-plan"
            buttonLabel={hasAny ? 'View Study Plan' : 'Create Study Plan'}
            badge="Mon–Fri schedule · personalised to your mastery"
          />

        </div>
      </div>

      {/* ── Quick Resources ───────────────────────────────────────────────── */}
      {(lastLesson || weakestSkill || reviewsDue > 0 || hasAny) && (
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400 mb-3">Quick Resources</h2>
          <div className="grid gap-2 sm:grid-cols-2">

            {lastLesson && (
              <Link
                href={`/sat-rw-academy/lesson/${lastLesson.lessonSlug}`}
                className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4 shrink-0 text-emerald-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 010 1.972l-11.54 6.347a1.125 1.125 0 01-1.667-.986V5.653z" />
                </svg>
                Continue Last Lesson
              </Link>
            )}

            {weakestSkill && (
              <Link
                href={`/sat-rw-academy/lesson/${weakestSkill}`}
                className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4 shrink-0 text-amber-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
                Practice Weakest Skill
              </Link>
            )}

            {reviewsDue > 0 && (
              <Link
                href="/sat-rw-academy/review"
                className="flex items-center gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-700 hover:bg-amber-100 transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4 shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
                Complete Due Review
                <span className="ml-auto text-[11px] font-semibold bg-amber-200 text-amber-800 rounded-full px-2 py-0.5">{reviewsDue}</span>
              </Link>
            )}

            <Link
              href="/sat-rw-academy/study-plan"
              className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4 shrink-0 text-sky-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
              {hasAny ? "View This Week's Plan" : 'Create Study Plan'}
            </Link>

          </div>
        </div>
      )}

      <p className="text-xs text-slate-400 leading-relaxed">
        All MockMate academy content is independently created for practice purposes. MockMate is not affiliated with, endorsed by, or sponsored by College Board. SAT® is a trademark of College Board.
      </p>
    </div>
  )
}
