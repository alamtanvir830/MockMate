'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { MASTERY_LABELS, MASTERY_BG, MASTERY_COLORS } from '@/lib/academy/mastery'
import type { SkillMastery, MasteryStatus } from '@/lib/academy/mastery'
import { transitionQuestions } from '@/lib/academy/transitions/questions'
import { academyPassages } from '@/lib/academy/passages'
import { glossaryTerms } from '@/lib/academy/glossary/terms'

// ── Types ──────────────────────────────────────────────────────────────────────

interface LessonProgress {
  lessonSlug: string
  skillSlug: string
  status: 'in_progress' | 'completed'
  completedAt: string | null
}

interface ReviewQueueResponse {
  items: unknown[]
  totalDue: number
}

// ── Constants ──────────────────────────────────────────────────────────────────

const WRITING_SLUGS = ['boundaries', 'form-structure-sense', 'transitions', 'rhetorical-synthesis']
const READING_SLUGS = [
  'words-in-context', 'central-ideas-details', 'text-structure-purpose',
  'command-of-evidence', 'quantitative-evidence', 'inferences', 'cross-text-connections',
]
const ALL_SLUGS = [...WRITING_SLUGS, ...READING_SLUGS]
const TOTAL_SKILLS = ALL_SLUGS.length  // 11

// ── Phases ─────────────────────────────────────────────────────────────────────

const PHASES = [
  { number: 1, label: 'Diagnose', description: 'R&W Diagnostic', href: '/sat-rw-academy/diagnostic', color: 'bg-slate-100 text-slate-600 border-slate-200', activeColor: 'bg-sky-100 text-sky-700 border-sky-300' },
  { number: 2, label: 'Learn Writing Rules', description: 'Boundaries · Form, Structure & Sense · Transitions · Rhetorical Synthesis', href: '/sat-rw-academy/writing', color: 'bg-slate-100 text-slate-600 border-slate-200', activeColor: 'bg-violet-50 text-violet-700 border-violet-300' },
  { number: 3, label: 'Build Vocabulary', description: 'Daily vocabulary — runs concurrently throughout the course', href: '/sat-rw-academy/vocabulary', color: 'bg-slate-100 text-slate-600 border-slate-200', activeColor: 'bg-amber-50 text-amber-700 border-amber-300' },
  { number: 4, label: 'Master Reading Strategies', description: 'Words in Context · Central Ideas · Text Structure · Evidence · Inferences · Cross-Text Connections', href: '/sat-rw-academy/reading', color: 'bg-slate-100 text-slate-600 border-slate-200', activeColor: 'bg-emerald-50 text-emerald-700 border-emerald-300' },
  { number: 5, label: 'Mix and Review', description: 'Cumulative Review · Mixed Practice · Review Queue', href: '/sat-rw-academy/mixed-practice', color: 'bg-slate-100 text-slate-600 border-slate-200', activeColor: 'bg-teal-50 text-teal-700 border-teal-300' },
  { number: 6, label: 'Practice Under Time', description: 'Three 54-question R&W Capstones', href: '/sat-rw-academy/capstones', color: 'bg-slate-100 text-slate-600 border-slate-200', activeColor: 'bg-orange-50 text-orange-700 border-orange-300' },
  { number: 7, label: 'Demonstrate Mastery', description: 'Final R&W Mastery Check', href: '/sat-rw-academy/mastery-check', color: 'bg-slate-100 text-slate-600 border-slate-200', activeColor: 'bg-rose-50 text-rose-700 border-rose-300' },
]

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
  isPremium: boolean
}

function ModuleCard({ number, title, description, href, buttonLabel, badge, progress, masteryPills, isPremium }: ModuleCardProps) {
  const dest = isPremium ? href : '/billing'
  return (
    <div className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-500 mt-0.5">
        {isPremium ? number : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 text-amber-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
          </svg>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 flex-wrap">
          <div>
            <p className="font-semibold text-slate-900 text-sm">{title}</p>
            {badge && <span className="inline-block mt-0.5 text-[10px] text-slate-500">{badge}</span>}
          </div>
          <Link
            href={dest}
            aria-label={isPremium ? buttonLabel : `${buttonLabel} — SAT Premium required`}
            className={cn(
              'shrink-0 rounded-lg text-white text-xs font-semibold px-3.5 py-1.5 transition-colors whitespace-nowrap',
              isPremium
                ? 'bg-emerald-600 hover:bg-emerald-700'
                : 'bg-amber-500 hover:bg-amber-600',
            )}
          >
            {isPremium ? buttonLabel : 'Get SAT Premium'}
          </Link>
        </div>
        <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">{description}</p>
        {masteryPills && masteryPills.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {masteryPills.map((s, i) => <MasteryPill key={i} status={s} />)}
          </div>
        )}
        {progress && <p className="mt-1.5 text-[11px] text-slate-400">{progress}</p>}
      </div>
    </div>
  )
}

// ── Premium notice (non-premium users only) ────────────────────────────────────

function PremiumNotice() {
  return (
    <div className="rounded-xl border border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50 p-5">
      <div className="flex items-start gap-4 flex-wrap sm:flex-nowrap">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} className="h-5 w-5 text-amber-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-sm font-bold text-amber-900">Unlock the Complete SAT R&amp;W Academy</h2>
          <p className="text-xs text-amber-800 mt-1 leading-relaxed">
            SAT Premium includes every academy lesson, the R&W Diagnostic, targeted drills, vocabulary and transition practice, Reading Speed, and personalized spaced review.
          </p>
        </div>
        <Link
          href="/billing"
          className="shrink-0 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold px-4 py-2 transition-colors whitespace-nowrap"
        >
          Get SAT Premium
        </Link>
      </div>
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────

export function AcademyHome({ isPremium }: { isPremium: boolean }) {
  const [mastery, setMastery] = useState<Record<string, SkillMastery>>({})
  const [lessons, setLessons] = useState<LessonProgress[]>([])
  const [reviewsDue, setReviewsDue] = useState(0)
  const [loading, setLoading] = useState(isPremium)

  useEffect(() => {
    if (!isPremium) return
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
  }, [isPremium])

  // Derived metrics (only meaningful for premium users with data)
  const hasAny = ALL_SLUGS.some(s => mastery[s] && mastery[s].status !== 'not_started')
  const totalStarted = ALL_SLUGS.filter(s => mastery[s] && mastery[s].status !== 'not_started').length
  const totalProficient = ALL_SLUGS.filter(s => mastery[s] && (mastery[s].status === 'proficient' || mastery[s].status === 'mastered')).length
  const totalMastered = ALL_SLUGS.filter(s => mastery[s]?.status === 'mastered').length
  const lessonsCompleted = lessons.filter(l => l.status === 'completed').length
  void lessonsCompleted

  const weakestSkill = ALL_SLUGS
    .filter(s => mastery[s] && mastery[s].attemptCount > 0)
    .sort((a, b) => (mastery[a]?.masteryScore ?? 100) - (mastery[b]?.masteryScore ?? 100))[0] ?? null

  const lastLesson = lessons.length > 0
    ? [...lessons].sort((a, b) => (b.completedAt ?? '').localeCompare(a.completedAt ?? ''))[0]
    : null

  const writingMastery = WRITING_SLUGS.map(s => mastery[s]?.status ?? ('not_started' as MasteryStatus))
  const readingMastery = READING_SLUGS.map(s => mastery[s]?.status ?? ('not_started' as MasteryStatus))
  const writingCompleted = WRITING_SLUGS.filter(s => lessons.some(l => l.lessonSlug === s && l.status === 'completed')).length
  const readingCompleted = READING_SLUGS.filter(s => lessons.some(l => l.lessonSlug === s && l.status === 'completed')).length

  const totalTransitions = transitionQuestions.length
  const totalPassages = academyPassages.length
  const totalGlossaryTerms = glossaryTerms.length

  const hasDiagnostic = ALL_SLUGS.some(s => mastery[s] && mastery[s].attemptCount > 0)
  const writingDone = WRITING_SLUGS.every(s => mastery[s]?.status === 'proficient' || mastery[s]?.status === 'mastered')
  const readingDone = READING_SLUGS.every(s => mastery[s]?.status === 'proficient' || mastery[s]?.status === 'mastered')
  const currentPhase = !hasDiagnostic ? 1 : !writingDone ? 2 : !readingDone ? 4 : 5

  return (
    <div className="space-y-8 max-w-3xl">

      {/* ── Premium notice (non-premium only) ─────────────────────────── */}
      {!isPremium && <PremiumNotice />}

      {/* ── Course banner ──────────────────────────────────────────────── */}
      <div className="rounded-xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} className="h-7 w-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-emerald-900">SAT R&amp;W Academy</h1>
            <p className="text-sm text-emerald-700 mt-0.5">
              A structured, seven-phase curriculum covering all 11 SAT R&W skills from rule-learning to timed capstone practice.
            </p>
          </div>
        </div>
      </div>

      {/* ── Welcome + Progress ─────────────────────────────────────────── */}
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3 space-y-3">
          <h2 className="text-lg font-bold text-slate-900">Welcome to the SAT R&amp;W Academy</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            This academy covers every major SAT Reading and Writing skill through a seven-phase curriculum:
            diagnose your baseline, secure predictable Writing points, build vocabulary,
            develop Reading strategies, practice mixed questions, test under timed conditions, and demonstrate mastery.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            You can open any lesson, trainer, or tool directly from the sidebar — phases are recommended, not required.
            Each skill has original guided examples, targeted drills, and a mixed recognition check.
          </p>
          <p className="text-sm text-slate-500 italic">
            All content is independently created by MockMate. Not affiliated with College Board.
          </p>
        </div>

        {/* Progress card */}
        <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">Your Academy Progress</p>

          {!isPremium ? (
            /* Non-premium locked state */
            <div className="space-y-3">
              <p className="text-xs text-slate-500 leading-relaxed">
                Get lifetime access to the complete academy with SAT Premium.
              </p>
              <Link
                href="/billing"
                className="block w-full rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold text-center px-4 py-2.5 transition-colors"
              >
                Unlock SAT R&amp;W Academy
              </Link>
            </div>
          ) : loading ? (
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
                Start R&amp;W Diagnostic
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

      {/* ── Your Recommended Path ─────────────────────────────────────── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">Your Recommended Path</h2>
          {isPremium && hasAny && (
            <span className="text-[11px] text-slate-400">Currently in Phase {currentPhase}</span>
          )}
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {PHASES.map(phase => {
            const isCurrentPhase = isPremium && hasAny && phase.number === currentPhase
            const isDone = isPremium && hasAny && phase.number < currentPhase
            const dest = isPremium ? phase.href : '/billing'
            return (
              <Link
                key={phase.number}
                href={dest}
                aria-label={isPremium ? undefined : `Phase ${phase.number}: ${phase.label} — SAT Premium required`}
                className={cn(
                  'flex items-start gap-3 rounded-xl border p-3 transition-colors hover:shadow-sm',
                  isCurrentPhase ? phase.activeColor : isDone ? 'bg-white border-slate-200' : 'bg-slate-50 border-slate-200',
                )}
              >
                <div className={cn(
                  'flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold mt-0.5',
                  isCurrentPhase ? 'bg-white' : isDone ? 'bg-emerald-100 text-emerald-700' : 'bg-white text-slate-500',
                )}>
                  {isDone ? '✓' : phase.number}
                </div>
                <div className="min-w-0 flex-1">
                  <p className={cn('text-[12px] font-semibold', isDone ? 'text-emerald-700' : isCurrentPhase ? '' : 'text-slate-600')}>
                    Phase {phase.number}: {phase.label}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{phase.description}</p>
                </div>
                {!isPremium && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5 shrink-0 text-amber-400 mt-0.5" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                )}
              </Link>
            )
          })}
        </div>
      </div>

      {/* ── Start Here ────────────────────────────────────────────────── */}
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400 mb-3">Start Here</h2>
        <div className="rounded-xl border-2 border-emerald-200 bg-white p-5">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-slate-900">R&amp;W Diagnostic</p>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Identify your baseline across all 11 R&W skills and receive a recommended starting path.
              </p>
              <p className="text-[11px] text-slate-400 mt-2">26 original SAT-style questions · All 11 skills · ~20 min</p>
            </div>
            <Link
              href={isPremium ? '/sat-rw-academy/diagnostic' : '/billing'}
              aria-label={isPremium ? undefined : 'Start R&W Diagnostic — SAT Premium required'}
              className={cn(
                'shrink-0 rounded-lg text-white text-sm font-semibold px-4 py-2 transition-colors whitespace-nowrap',
                isPremium ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-amber-500 hover:bg-amber-600',
              )}
            >
              {isPremium ? (hasAny ? 'Retake Diagnostic' : 'Start Diagnostic') : 'Get SAT Premium'}
            </Link>
          </div>
        </div>
      </div>

      {/* ── Course Modules ────────────────────────────────────────────── */}
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400 mb-1">Course Modules</h2>
        <p className="text-xs text-slate-500 mb-4">
          {isPremium
            ? 'Follow these in order or use the sidebar to jump directly to any skill.'
            : 'All modules are included with SAT Premium.'}
        </p>
        <div className="space-y-3">

          <ModuleCard
            number={1}
            title="Writing Skills"
            description="Learn punctuation rules, sentence structure, transitions, and rhetorical synthesis through focused lessons and targeted practice."
            href="/sat-rw-academy/writing"
            buttonLabel="Open Writing Skills"
            badge="4 lessons · Boundaries · Form, Structure & Sense · Transitions · Rhetorical Synthesis"
            progress={isPremium && hasAny ? `${writingCompleted} of 4 lessons completed` : undefined}
            masteryPills={isPremium && hasAny ? writingMastery : undefined}
            isPremium={isPremium}
          />

          <ModuleCard
            number={2}
            title="Reading Skills"
            description="Master every SAT Reading skill: Words in Context, Central Ideas, Text Structure, Command of Evidence, Quantitative Evidence, Inferences, and Cross-Text Connections."
            href="/sat-rw-academy/reading"
            buttonLabel="Open Reading Skills"
            badge="7 lessons · all Reading & Analysis domains"
            progress={isPremium && hasAny ? `${readingCompleted} of 7 lessons completed` : undefined}
            masteryPills={isPremium && hasAny ? readingMastery : undefined}
            isPremium={isPremium}
          />

          <ModuleCard
            number={3}
            title="Vocabulary Trainer"
            description="Build high-utility academic vocabulary. Practice meaning-from-context and word-family recognition throughout the course."
            href="/sat-rw-academy/vocabulary"
            buttonLabel="Practice Vocabulary"
            badge="300+ academic words · flashcard · multiple choice · fill-in-the-blank"
            isPremium={isPremium}
          />

          <ModuleCard
            number={4}
            title="Transition Trainer"
            description="Practice identifying logical relationships before selecting transition words. Tracks relationship accuracy and answer accuracy separately."
            href="/sat-rw-academy/transitions"
            buttonLabel="Practice Transitions"
            badge={`${totalTransitions} original questions · 9 logical categories`}
            isPremium={isPremium}
          />

          <ModuleCard
            number={5}
            title="Reading Speed"
            description="Improve reading pace without sacrificing comprehension through RSVP practice and original academy passages."
            href="/sat-rw-academy/reading-speed"
            buttonLabel="Start Reading Practice"
            badge={`${totalPassages} academy passages · paste your own text · comprehension tracking`}
            isPremium={isPremium}
          />

          <ModuleCard
            number={6}
            title="Review Queue"
            description="Missed and difficult questions are scheduled for spaced review at 1 / 3 / 7 / 14 / 30-day intervals."
            href="/sat-rw-academy/review"
            buttonLabel={isPremium && reviewsDue > 0 ? `Start Review (${reviewsDue} due)` : 'View Review Queue'}
            badge="Spaced repetition · 5 stage intervals"
            progress={isPremium && reviewsDue > 0 ? `${reviewsDue} question${reviewsDue !== 1 ? 's' : ''} due for review` : undefined}
            isPremium={isPremium}
          />

          <ModuleCard
            number={7}
            title="Mixed R&W Practice"
            description="Questions from all four domains mixed together without skill labels. Available in 10-question, 27-question, and 54-question modes."
            href="/sat-rw-academy/mixed-practice"
            buttonLabel="Start Mixed Practice"
            badge="Quick Mix · Standard Mix · Full R&W Practice · skill identification training"
            isPremium={isPremium}
          />

          <ModuleCard
            number={8}
            title="R&W Academy Capstones"
            description="Three 54-question timed assessments covering all four domains and all eleven skills. Detailed explanations after each module."
            href="/sat-rw-academy/capstones"
            buttonLabel="Open Capstones"
            badge="3 capstones · 54 questions each · 2 modules of 27 · 32 min per module"
            isPremium={isPremium}
          />

          <ModuleCard
            number={9}
            title="R&W Glossary"
            description="Searchable plain-language definitions for all technical terms used in the Academy — grammar, punctuation, rhetoric, logic, and analysis."
            href="/sat-rw-academy/glossary"
            buttonLabel="Open Glossary"
            badge={`${totalGlossaryTerms > 0 ? totalGlossaryTerms : 35} terms · 5 categories · cross-referenced`}
            isPremium={isPremium}
          />

        </div>
      </div>

      {/* ── Mastery Check callout ─────────────────────────────────────── */}
      <div className="rounded-xl border border-rose-200 bg-rose-50 p-5">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-rose-900 text-sm">Final R&amp;W Mastery Check</p>
            <p className="text-xs text-rose-700 mt-1 leading-relaxed">
              Complete this after finishing all three Capstones. Uses different questions from the diagnostic.
              Shows your skill progress from start to finish.
            </p>
          </div>
          <Link
            href={isPremium ? '/sat-rw-academy/mastery-check' : '/billing'}
            aria-label={isPremium ? undefined : 'Take Mastery Check — SAT Premium required'}
            className={cn(
              'shrink-0 rounded-lg text-white text-sm font-semibold px-4 py-2 transition-colors whitespace-nowrap',
              isPremium ? 'bg-rose-600 hover:bg-rose-700' : 'bg-amber-500 hover:bg-amber-600',
            )}
          >
            {isPremium ? 'Take Mastery Check' : 'Get SAT Premium'}
          </Link>
        </div>
      </div>

      {/* ── Quick Access (premium users with progress only) ───────────── */}
      {isPremium && (lastLesson || weakestSkill || reviewsDue > 0 || hasAny) && (
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400 mb-3">Quick Access</h2>
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

          </div>
        </div>
      )}

      <p className="text-xs text-slate-400 leading-relaxed">
        All MockMate Academy content is independently created for practice purposes. MockMate is not affiliated with, endorsed by, or sponsored by College Board. SAT® is a trademark of College Board, which is not affiliated with and does not endorse MockMate.
      </p>
    </div>
  )
}
