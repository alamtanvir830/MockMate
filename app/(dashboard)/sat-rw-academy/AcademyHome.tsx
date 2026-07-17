'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { SkillMastery } from '@/lib/academy/mastery'
import { SKILL_DISPLAY_NAMES, SKILL_SECTION, ACADEMY_SKILL_SLUGS } from '@/lib/academy/skill-mapping'

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

interface DiagnosticResult {
  id: string
  correct_count: number
  incorrect_count: number
  omitted_count: number
  total_questions: number
  answered_questions: number
  accuracy_percentage: number
  skill_results: Record<string, { correct: number; total: number; pct: number; section: string; title: string }>
  domain_results: Record<string, { correct: number; total: number; pct: number; title: string }>
  strongest_skill_slugs: string[]
  weakest_skill_slugs: string[]
  recommended_skill_slug: string | null
  completed_at: string
}

interface CapstoneStatus {
  capstoneId: string
  number: number
  available: boolean
  completed: boolean
  accuracy: number | null
  correctCount: number | null
  totalCount: number | null
  weakestSlugs: string[]
  completedAt: string | null
}

interface CapstonesData {
  capstones: CapstoneStatus[]
  masteryCheckDone: boolean
}

// ── Constants ──────────────────────────────────────────────────────────────────

const WRITING_SLUGS = ['boundaries', 'form-structure-sense', 'transitions', 'rhetorical-synthesis']
const READING_SLUGS = [
  'words-in-context', 'central-ideas-details', 'text-structure-purpose',
  'command-of-evidence', 'quantitative-evidence', 'inferences', 'cross-text-connections',
]
const ALL_SLUGS = [...WRITING_SLUGS, ...READING_SLUGS]
const TOTAL_SKILLS = ALL_SLUGS.length

// Must match the key used in diagnostic/page.tsx
const DIAGNOSTIC_STORAGE_KEY = 'sat_rw_diagnostic_progress'

// ── computeNextStep ────────────────────────────────────────────────────────────

const PRIORITY_ORDER = [...ACADEMY_SKILL_SLUGS]

function computeNextStep(
  diagnosticResult: DiagnosticResult | null,
  mastery: Record<string, SkillMastery>,
  lessons: LessonProgress[],
  capstonesData: CapstonesData | null,
): { type: string; slug?: string; number?: number; href: string; label: string; reason: string } {
  const completedLessons = new Set(lessons.filter(l => l.status === 'completed').map(l => l.lessonSlug))

  if (!diagnosticResult) {
    return {
      type: 'diagnostic',
      href: '/sat-rw-academy/diagnostic',
      label: 'Start R&W Diagnostic',
      reason: 'Identify your starting point across all 11 R&W skills.',
    }
  }

  const targetSlugs = [
    ...diagnosticResult.weakest_skill_slugs,
    ...PRIORITY_ORDER.filter(s => !diagnosticResult.weakest_skill_slugs.includes(s)),
  ]

  for (const slug of targetSlugs) {
    const skillMastery = mastery[slug]
    const lessonDone = completedLessons.has(slug)
    const name = SKILL_DISPLAY_NAMES[slug] ?? slug

    if (!lessonDone) {
      return {
        type: 'lesson',
        slug,
        href: `/sat-rw-academy/lesson/${slug}`,
        label: `Start ${name} Lesson`,
        reason: `Your diagnostic identified ${name} as a priority area. Begin with the lesson.`,
      }
    }

    if (!skillMastery || skillMastery.status === 'not_started' || skillMastery.status === 'learning' || skillMastery.status === 'developing') {
      return {
        type: 'drill',
        slug,
        href: `/sat-rw-academy/lesson/${slug}`,
        label: `Practice ${name}`,
        reason: `You completed the ${name} lesson. Now build mastery with the targeted drill.`,
      }
    }
  }

  // All skills covered — move to capstone progression
  if (capstonesData) {
    const cap1 = capstonesData.capstones.find(c => c.number === 1) ?? null
    const cap2 = capstonesData.capstones.find(c => c.number === 2) ?? null
    const cap3 = capstonesData.capstones.find(c => c.number === 3) ?? null
    const allLessonsDone = ALL_SLUGS.every(s => completedLessons.has(s))

    if (!cap1?.completed) {
      if (allLessonsDone) {
        return {
          type: 'capstone',
          number: 1,
          href: '/sat-rw-academy/capstones/capstone-1',
          label: 'Take R&W Academy Capstone 1',
          reason: 'You have completed all 11 skill lessons. Apply everything in your first timed capstone assessment.',
        }
      }
    } else if (!cap2?.completed) {
      const needsDrill = cap1.weakestSlugs.find(slug => {
        const m = mastery[slug]
        return !m || !['proficient', 'mastered'].includes(m.status ?? '')
      })
      if (needsDrill) {
        const name = SKILL_DISPLAY_NAMES[needsDrill] ?? needsDrill
        return {
          type: 'drill',
          slug: needsDrill,
          href: `/sat-rw-academy/lesson/${needsDrill}`,
          label: `Practice ${name}`,
          reason: `Capstone 1 showed ${name} as a weak area. Build more mastery before Capstone 2.`,
        }
      }
      return {
        type: 'capstone',
        number: 2,
        href: '/sat-rw-academy/capstones/capstone-2',
        label: 'Take R&W Academy Capstone 2',
        reason: 'You have addressed your Capstone 1 weak areas. Continue with Capstone 2 to measure your progress.',
      }
    } else {
      const cap3Available = cap3?.available ?? false
      const cap3Done = cap3?.completed ?? false

      if (cap3Available && !cap3Done) {
        const needsDrill = cap2.weakestSlugs.find(slug => {
          const m = mastery[slug]
          return !m || !['proficient', 'mastered'].includes(m.status ?? '')
        })
        if (needsDrill) {
          const name = SKILL_DISPLAY_NAMES[needsDrill] ?? needsDrill
          return {
            type: 'drill',
            slug: needsDrill,
            href: `/sat-rw-academy/lesson/${needsDrill}`,
            label: `Practice ${name}`,
            reason: `Capstone 2 showed ${name} as a weak area. Strengthen it before your final capstone.`,
          }
        }
        return {
          type: 'capstone',
          number: 3,
          href: '/sat-rw-academy/capstones/capstone-3',
          label: 'Take R&W Academy Capstone 3',
          reason: 'You have completed Capstone 2. Take Capstone 3 to complete your capstone series.',
        }
      }

      if (!capstonesData.masteryCheckDone) {
        return {
          type: 'mastery-check',
          href: '/sat-rw-academy/mastery-check',
          label: 'Take Final R&W Mastery Check',
          reason: 'You have completed the capstone series. The Final Mastery Check shows your total skill improvement from start to finish.',
        }
      }

      return {
        type: 'sat-form-1',
        href: '/premade/sat/form-1',
        label: 'Take SAT Form 1',
        reason: 'You have completed the full R&W Academy. Apply your skills in a complete SAT-style practice exam.',
      }
    }
  }

  return {
    type: 'mixed',
    href: '/sat-rw-academy/mixed-practice',
    label: 'Start Mixed Practice',
    reason: 'Practice with mixed questions across all skills to solidify your knowledge.',
  }
}

// ── Small helpers ──────────────────────────────────────────────────────────────

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
  const [diagnosticResult, setDiagnosticResult] = useState<DiagnosticResult | null>(null)
  const [capstonesData, setCapstonesData] = useState<CapstonesData | null>(null)
  const [loading, setLoading] = useState(isPremium)
  const [hasSavedProgress, setHasSavedProgress] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(DIAGNOSTIC_STORAGE_KEY)
      if (raw) {
        const p = JSON.parse(raw) as { savedAt: number }
        if (Date.now() - p.savedAt <= 48 * 60 * 60 * 1000) setHasSavedProgress(true)
      }
    } catch { /* ignore */ }

    if (!isPremium) return

    Promise.all([
      fetch('/api/academy/attempts').then(r => r.ok ? r.json() : []) as Promise<SkillMastery[]>,
      fetch('/api/academy/lesson-progress').then(r => r.ok ? r.json() : []) as Promise<LessonProgress[]>,
      fetch('/api/academy/review-queue').then(r => r.ok ? r.json() : { items: [], totalDue: 0 }) as Promise<ReviewQueueResponse>,
      fetch('/api/academy/diagnostic').then(r => r.ok ? r.json() : null) as Promise<DiagnosticResult | null>,
      fetch('/api/academy/capstones').then(r => r.ok ? r.json() : null) as Promise<CapstonesData | null>,
    ])
      .then(([masteryArr, lessonArr, queue, diag, capstones]) => {
        const map: Record<string, SkillMastery> = {}
        for (const m of masteryArr) map[m.skillSlug] = m
        setMastery(map)
        setLessons(lessonArr)
        setReviewsDue(queue.totalDue ?? queue.items?.length ?? 0)
        setDiagnosticResult(diag)
        setCapstonesData(capstones)
      })
      .catch(() => {/* non-blocking */})
      .finally(() => setLoading(false))
  }, [isPremium])

  // Derived metrics
  const hasAny = ALL_SLUGS.some(s => mastery[s] && mastery[s].status !== 'not_started')
  const totalStarted = ALL_SLUGS.filter(s => mastery[s] && mastery[s].status !== 'not_started').length
  const totalProficient = ALL_SLUGS.filter(s => mastery[s] && (mastery[s].status === 'proficient' || mastery[s].status === 'mastered')).length
  const totalMastered = ALL_SLUGS.filter(s => mastery[s]?.status === 'mastered').length
  const lessonsCompleted = lessons.filter(l => l.status === 'completed').length
  const lastLesson = lessons.length > 0
    ? [...lessons].sort((a, b) => (b.completedAt ?? '').localeCompare(a.completedAt ?? ''))[0]
    : null

  const allLessonsDone = ALL_SLUGS.every(s => lessons.some(l => l.lessonSlug === s && l.status === 'completed'))
  const cap1 = capstonesData?.capstones.find(c => c.number === 1) ?? null
  const cap2 = capstonesData?.capstones.find(c => c.number === 2) ?? null
  const cap3 = capstonesData?.capstones.find(c => c.number === 3) ?? null
  const masteryCheckDone = capstonesData?.masteryCheckDone ?? false
  const cap3Available = cap3?.available ?? false
  const allCapstonesCompleted =
    (cap1?.completed ?? false) &&
    (cap2?.completed ?? false) &&
    (cap3Available ? (cap3?.completed ?? false) : true)

  const nextStep = isPremium && !loading ? computeNextStep(diagnosticResult, mastery, lessons, capstonesData) : null

  // All assessed skills sorted weakest-first for the personalized path
  const personalizedPath = diagnosticResult
    ? ACADEMY_SKILL_SLUGS
        .filter(slug => diagnosticResult.skill_results[slug])
        .sort((a, b) => (diagnosticResult.skill_results[a]?.pct ?? 100) - (diagnosticResult.skill_results[b]?.pct ?? 100))
    : []

  return (
    <div className="space-y-8 max-w-3xl">

      {/* ── Premium notice (non-premium only) ──────────────────────────── */}
      {!isPremium && <PremiumNotice />}

      {/* ── Course banner ───────────────────────────────────────────────── */}
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
              A structured curriculum covering all 11 SAT R&W skills from rule-learning to timed capstone practice.
            </p>
          </div>
        </div>
      </div>

      {diagnosticResult !== null ? (

        // ── POST-DIAGNOSTIC LAYOUT ───────────────────────────────────────
        <>
          {/* Welcome + Progress card */}
          <div className="grid gap-6 lg:grid-cols-5">
            <div className="lg:col-span-3 space-y-2">
              <h2 className="text-lg font-bold text-slate-900">Your Personalized Academy</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Your diagnostic results shape the learning path below. Follow the recommended order, or use the academy menu to open any lesson or practice tool directly.
              </p>
              {lessonsCompleted > 0 && (
                <p className="text-xs text-slate-500">{lessonsCompleted} lesson{lessonsCompleted !== 1 ? 's' : ''} completed</p>
              )}
            </div>

            <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">Your Academy Progress</p>
              <div className="space-y-4">
                <div className="rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-3 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-emerald-800">Diagnostic: Completed</p>
                    <Link href="/sat-rw-academy/diagnostic" className="text-[11px] text-emerald-600 hover:underline">
                      View results
                    </Link>
                  </div>
                  <p className="text-xs text-emerald-700">
                    Score: <strong>{diagnosticResult.correct_count}/{diagnosticResult.total_questions}</strong>
                    {' · '}Accuracy: <strong>{Math.round(diagnosticResult.accuracy_percentage)}%</strong>
                  </p>
                  {diagnosticResult.recommended_skill_slug && (
                    <p className="text-[11px] text-emerald-700">
                      Priority skill: {SKILL_DISPLAY_NAMES[diagnosticResult.recommended_skill_slug] ?? diagnosticResult.recommended_skill_slug}
                    </p>
                  )}
                </div>

                {hasAny && (
                  <>
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
                  </>
                )}

                {reviewsDue > 0 && (
                  <Link
                    href="/sat-rw-academy/review"
                    className="flex items-center justify-between rounded-lg bg-amber-50 border border-amber-200 px-3 py-2 hover:bg-amber-100 transition-colors"
                  >
                    <p className="text-xs font-semibold text-amber-700">{reviewsDue} review{reviewsDue !== 1 ? 's' : ''} due</p>
                    <span className="text-[11px] text-amber-600">Start →</span>
                  </Link>
                )}

                {nextStep && nextStep.type !== 'diagnostic' && (
                  <Link
                    href={nextStep.href}
                    className="block w-full rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold text-center px-4 py-2.5 transition-colors"
                  >
                    {nextStep.label}
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Recommended Next Step */}
          {nextStep && nextStep.type !== 'diagnostic' && (
            <div className="rounded-xl border border-sky-200 bg-sky-50 p-5">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-sky-500 mb-1">Recommended Next Step</p>
                  <p className="font-semibold text-sky-900 text-sm">{nextStep.label}</p>
                  <p className="text-xs text-sky-700 mt-1 leading-relaxed">{nextStep.reason}</p>
                </div>
                <Link
                  href={nextStep.href}
                  className="shrink-0 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold px-4 py-2.5 transition-colors whitespace-nowrap"
                >
                  {nextStep.label}
                </Link>
              </div>
              <p className="mt-3 pt-3 border-t border-sky-200">
                <Link href="/sat-rw-academy/diagnostic" className="text-[11px] text-sky-600 hover:underline">
                  View Diagnostic Results →
                </Link>
              </p>
            </div>
          )}

          {/* Personalized Learning Path */}
          {personalizedPath.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400 mb-3">Your Personalized Learning Path</h2>
              <div className="space-y-2">
                {personalizedPath.map((slug, i) => {
                  const skillResult = diagnosticResult.skill_results[slug]
                  const skillMastery = mastery[slug]
                  const lessonDone = lessons.some(l => l.lessonSlug === slug && l.status === 'completed')
                  const name = SKILL_DISPLAY_NAMES[slug] ?? slug
                  const isRecommended = nextStep?.slug === slug
                  const pct = skillResult ? skillResult.pct : null

                  let statusLabel: string
                  let badgeClass: string
                  let actionHref: string
                  let actionLabel: string

                  if (isRecommended) {
                    statusLabel = 'Recommended Next'
                    badgeClass = 'bg-sky-100 text-sky-700 border-sky-300'
                    actionHref = nextStep!.href
                    actionLabel = nextStep!.label
                  } else if (skillMastery?.status === 'mastered' || skillMastery?.status === 'proficient') {
                    statusLabel = 'Proficient+'
                    badgeClass = 'bg-emerald-100 text-emerald-700 border-emerald-300'
                    actionHref = `/sat-rw-academy/lesson/${slug}`
                    actionLabel = 'Review'
                  } else if (lessonDone) {
                    statusLabel = 'Practice Needed'
                    badgeClass = 'bg-amber-100 text-amber-700 border-amber-300'
                    actionHref = `/sat-rw-academy/lesson/${slug}`
                    actionLabel = 'Practice'
                  } else {
                    statusLabel = 'Not Started'
                    badgeClass = 'bg-slate-100 text-slate-500 border-slate-300'
                    actionHref = `/sat-rw-academy/lesson/${slug}`
                    actionLabel = 'Start Lesson'
                  }

                  const section = SKILL_SECTION[slug as keyof typeof SKILL_SECTION] ?? null
                  const sectionLabel = section === 'reading' ? 'Reading' : section === 'writing' ? 'Writing' : null
                  const sectionBadgeClass = section === 'reading'
                    ? 'bg-purple-50 text-purple-600 border-purple-200'
                    : 'bg-yellow-50 text-yellow-700 border-yellow-200'

                  return (
                    <div key={slug} className="flex items-center gap-3 flex-wrap rounded-lg border border-slate-200 bg-white px-4 py-3">
                      <span className="text-xs font-bold text-slate-300 w-4 shrink-0">{i + 1}</span>
                      <div className="flex-1 min-w-[8rem]">
                        <p className="text-sm font-semibold text-slate-900 truncate">{name}</p>
                        {pct !== null && (
                          <p className="text-[11px] text-slate-400 mt-0.5">
                            Diagnostic: {pct}% ({skillResult!.correct}/{skillResult!.total})
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className={cn('text-[11px] font-semibold px-2 py-0.5 rounded-full border', badgeClass)}>
                          {statusLabel}
                        </span>
                        {sectionLabel && (
                          <span className={cn('text-[11px] font-medium px-2 py-0.5 rounded-full border', sectionBadgeClass)}>
                            {sectionLabel}
                          </span>
                        )}
                      </div>
                      <Link
                        href={actionHref}
                        className="shrink-0 text-xs font-semibold text-sky-600 hover:text-sky-800 whitespace-nowrap"
                      >
                        {actionLabel} →
                      </Link>
                    </div>
                  )
                })}
              </div>
              <p className="text-[11px] text-slate-400 mt-2">Ranked by diagnostic performance · weakest skills first</p>

              {/* ── Capstone milestones ──────────────────────────────────── */}
              {capstonesData !== null && (
                <>
                  <div className="flex items-center gap-3 mt-6 mb-3">
                    <div className="h-px flex-1 bg-slate-200" />
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 whitespace-nowrap">
                      Apply Everything You Learned
                    </span>
                    <div className="h-px flex-1 bg-slate-200" />
                  </div>
                  <p className="text-xs text-slate-500 mb-3">
                    Complete three timed R&amp;W Capstones applying all 11 skills in mixed practice.
                    Review your results and strengthen any weak areas before moving forward.
                  </p>

                  <div className="space-y-2">
                    {[1, 2, 3].map(num => {
                      const cap = capstonesData.capstones.find(c => c.number === num) ?? null
                      if (!cap) return null

                      const href = `/sat-rw-academy/capstones/capstone-${num}`
                      const isRecommendedCapstone = nextStep?.type === 'capstone' && nextStep.number === num

                      if (!cap.available) {
                        return (
                          <div key={num} className="flex items-center gap-3 flex-wrap rounded-lg border border-slate-100 bg-slate-50 px-4 py-3">
                            <div className="flex-1 min-w-[8rem]">
                              <p className="text-sm font-semibold text-slate-400">R&amp;W Academy Capstone {num}</p>
                              <p className="text-[11px] text-slate-400 mt-0.5">Content in development</p>
                            </div>
                            <span className="shrink-0 text-[11px] font-semibold px-2 py-0.5 rounded-full border bg-slate-100 text-slate-400 border-slate-200">
                              Coming Soon
                            </span>
                          </div>
                        )
                      }

                      const locked =
                        num === 1 ? !allLessonsDone :
                        num === 2 ? !(cap1?.completed) :
                        !(cap2?.completed)

                      return (
                        <div key={num}>
                          <div className={cn(
                            'flex items-center gap-3 flex-wrap rounded-lg border px-4 py-3',
                            cap.completed
                              ? 'border-emerald-200 bg-emerald-50'
                              : isRecommendedCapstone
                                ? 'border-sky-200 bg-sky-50'
                                : locked
                                  ? 'border-slate-100 bg-slate-50'
                                  : 'border-blue-200 bg-blue-50',
                          )}>
                            <div className="flex-1 min-w-[8rem]">
                              <p className={cn(
                                'text-sm font-semibold',
                                locked && !cap.completed ? 'text-slate-400' : 'text-slate-900',
                              )}>
                                R&amp;W Academy Capstone {num}
                              </p>
                              <p className="text-[11px] text-slate-400 mt-0.5">54 questions · All 11 skills · ~45 min</p>
                              {cap.completed && cap.accuracy !== null && (
                                <p className="text-[11px] text-emerald-600 mt-0.5">
                                  Score: {cap.correctCount}/{cap.totalCount} ({cap.accuracy}%)
                                </p>
                              )}
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0">
                              {cap.completed ? (
                                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full border bg-emerald-100 text-emerald-700 border-emerald-300">
                                  Completed · {cap.accuracy}%
                                </span>
                              ) : isRecommendedCapstone ? (
                                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full border bg-sky-100 text-sky-700 border-sky-300">
                                  Recommended Next
                                </span>
                              ) : locked ? (
                                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full border bg-slate-100 text-slate-400 border-slate-200">
                                  {num === 1 ? 'Complete lessons first' : `Complete Capstone ${num - 1} first`}
                                </span>
                              ) : (
                                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full border bg-blue-100 text-blue-600 border-blue-200">
                                  Ready
                                </span>
                              )}
                              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full border bg-slate-50 text-slate-500 border-slate-200">
                                Capstone
                              </span>
                            </div>
                            {!locked && (
                              <Link
                                href={href}
                                className="shrink-0 text-xs font-semibold text-sky-600 hover:text-sky-800 whitespace-nowrap"
                              >
                                {cap.completed ? 'Retake →' : 'Start →'}
                              </Link>
                            )}
                          </div>

                          {/* Remediation sub-rows for weak areas */}
                          {cap.completed && cap.weakestSlugs.length > 0 && (
                            <div className="ml-6 mt-1 space-y-1">
                              {cap.weakestSlugs
                                .filter(slug => {
                                  const m = mastery[slug]
                                  return !m || !['proficient', 'mastered'].includes(m.status ?? '')
                                })
                                .map(slug => {
                                  const name = SKILL_DISPLAY_NAMES[slug] ?? slug
                                  return (
                                    <div key={slug} className="flex items-center gap-2 flex-wrap rounded-md border border-amber-100 bg-amber-50 px-3 py-2">
                                      <span className="text-[11px] text-amber-700 flex-1 min-w-0">
                                        Weak area from Capstone {num}: {name}
                                      </span>
                                      <Link
                                        href={`/sat-rw-academy/lesson/${slug}`}
                                        className="shrink-0 text-xs font-semibold text-sky-600 hover:text-sky-800 whitespace-nowrap"
                                      >
                                        Review →
                                      </Link>
                                    </div>
                                  )
                                })}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>

                  {/* ── Final Assessment ─────────────────────────────────── */}
                  <div className="flex items-center gap-3 mt-6 mb-3">
                    <div className="h-px flex-1 bg-slate-200" />
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 whitespace-nowrap">
                      Final Assessment
                    </span>
                    <div className="h-px flex-1 bg-slate-200" />
                  </div>

                  <div className="space-y-2">
                    {/* Mastery Check */}
                    <div className={cn(
                      'flex items-center gap-3 flex-wrap rounded-lg border px-4 py-3',
                      masteryCheckDone
                        ? 'border-emerald-200 bg-emerald-50'
                        : nextStep?.type === 'mastery-check'
                          ? 'border-rose-200 bg-rose-50'
                          : !allCapstonesCompleted
                            ? 'border-slate-100 bg-slate-50'
                            : 'border-rose-200 bg-rose-50',
                    )}>
                      <div className="flex-1 min-w-[8rem]">
                        <p className={cn(
                          'text-sm font-semibold',
                          !allCapstonesCompleted && !masteryCheckDone ? 'text-slate-400' : 'text-slate-900',
                        )}>
                          Final R&amp;W Mastery Check
                        </p>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          22 questions · All 11 skills · Compares to your diagnostic
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {masteryCheckDone ? (
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full border bg-emerald-100 text-emerald-700 border-emerald-300">
                            Completed
                          </span>
                        ) : nextStep?.type === 'mastery-check' ? (
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full border bg-sky-100 text-sky-700 border-sky-300">
                            Recommended Next
                          </span>
                        ) : !allCapstonesCompleted ? (
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full border bg-slate-100 text-slate-400 border-slate-200">
                            Complete capstones first
                          </span>
                        ) : (
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full border bg-rose-100 text-rose-700 border-rose-200">
                            Ready
                          </span>
                        )}
                        <span className="text-[11px] font-medium px-2 py-0.5 rounded-full border bg-rose-50 text-rose-500 border-rose-200">
                          Mastery Check
                        </span>
                      </div>
                      {allCapstonesCompleted && (
                        <Link
                          href="/sat-rw-academy/mastery-check"
                          className="shrink-0 text-xs font-semibold text-sky-600 hover:text-sky-800 whitespace-nowrap"
                        >
                          {masteryCheckDone ? 'Retake →' : 'Start →'}
                        </Link>
                      )}
                    </div>

                    {/* SAT Form 1 */}
                    <div className={cn(
                      'flex items-center gap-3 flex-wrap rounded-lg border px-4 py-3',
                      nextStep?.type === 'sat-form-1' ? 'border-sky-200 bg-sky-50' : 'border-indigo-100 bg-white',
                    )}>
                      <div className="flex-1 min-w-[8rem]">
                        <p className="text-sm font-semibold text-slate-900">SAT Form 1</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Full computer-adaptive SAT-style practice exam
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {nextStep?.type === 'sat-form-1' ? (
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full border bg-sky-100 text-sky-700 border-sky-300">
                            Recommended Next
                          </span>
                        ) : masteryCheckDone ? (
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full border bg-emerald-100 text-emerald-700 border-emerald-300">
                            Ready
                          </span>
                        ) : (
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full border bg-slate-100 text-slate-500 border-slate-200">
                            Available anytime
                          </span>
                        )}
                        <span className="text-[11px] font-medium px-2 py-0.5 rounded-full border bg-indigo-50 text-indigo-600 border-indigo-200">
                          Full SAT Exam
                        </span>
                      </div>
                      <Link
                        href="/premade/sat/form-1"
                        className="shrink-0 text-xs font-semibold text-sky-600 hover:text-sky-800 whitespace-nowrap"
                      >
                        Take Exam →
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </>

      ) : (

        // ── PRE-DIAGNOSTIC LAYOUT ────────────────────────────────────────
        <>
          {/* Welcome */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">Welcome to the SAT R&amp;W Academy</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              This academy covers every major SAT Reading and Writing skill through a structured curriculum:
              diagnose your baseline, learn Writing rules, build vocabulary, develop Reading strategies,
              practice mixed questions, test under timed conditions, and demonstrate mastery.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              You can open any lesson, trainer, or tool directly from the sidebar at any time.
            </p>
          </div>

          {/* Loading skeleton */}
          {loading && (
            <div className="space-y-2">
              <div className="h-4 w-3/4 animate-pulse rounded bg-slate-100" />
              <div className="h-4 w-1/2 animate-pulse rounded bg-slate-100" />
            </div>
          )}

          {/* Progress card — premium users who started lessons without a diagnostic */}
          {!loading && hasAny && (
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">Your Academy Progress</p>
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
            </div>
          )}

          {/* Start / Resume Diagnostic */}
          {!loading && isPremium && (
            <div className="rounded-xl border-2 border-emerald-200 bg-white p-5">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900">R&amp;W Diagnostic</p>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {hasSavedProgress
                      ? 'You have an in-progress diagnostic. Resume where you left off.'
                      : 'Identify your baseline across all 11 R&W skills and receive a recommended starting path.'}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-2">26 original SAT-style questions · All 11 skills · ~20 min</p>
                </div>
                <Link
                  href="/sat-rw-academy/diagnostic"
                  className="shrink-0 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-4 py-2 transition-colors whitespace-nowrap"
                >
                  {hasSavedProgress ? 'Resume Diagnostic →' : 'Start Diagnostic →'}
                </Link>
              </div>
              <p className="text-xs text-slate-500 mt-4 pt-4 border-t border-slate-100">
                The diagnostic personalizes the learning path and identifies which skills to prioritize.
              </p>
            </div>
          )}

          {/* Non-premium locked diagnostic CTA */}
          {!isPremium && (
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900">R&amp;W Diagnostic</p>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Available with SAT Premium. Identify your baseline across all 11 R&W skills and receive a personalized learning path.
                  </p>
                </div>
                <Link
                  href="/billing"
                  className="shrink-0 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold px-4 py-2 transition-colors whitespace-nowrap"
                >
                  Get SAT Premium
                </Link>
              </div>
            </div>
          )}
        </>
      )}

      {/* ── Disclaimer ──────────────────────────────────────────────────── */}
      <p className="text-xs text-slate-400 leading-relaxed">
        All MockMate Academy content is independently created for practice purposes. MockMate is not affiliated with, endorsed by, or sponsored by College Board. SAT® is a trademark of College Board, which is not affiliated with and does not endorse MockMate.
      </p>

    </div>
  )
}
