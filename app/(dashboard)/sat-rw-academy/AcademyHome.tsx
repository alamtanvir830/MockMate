'use client'

import { useEffect, useState, Fragment } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { SkillMastery } from '@/lib/academy/mastery'
import { SKILL_DISPLAY_NAMES, SKILL_SECTION, ACADEMY_SKILL_SLUGS } from '@/lib/academy/skill-mapping'
import { SATFormSelectorModal } from '@/components/academy/SATFormSelectorModal'
import type { SATFormInfo } from '@/components/academy/SATFormSelectorModal'

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

interface SATFormsData {
  forms: SATFormInfo[]
  satPremium: boolean
  masteryCheckCompletedAt: string | null
  finalMilestoneComplete: boolean
  postMasteryForm: {
    formNumber: number
    attemptId: string
    completedAt: string
    totalScore: number | null
    rwScore: number | null
    mathScore: number | null
  } | null
  recommendedFormNumber: number
}

type PathItemStatus =
  | 'recommended'
  | 'not_started'
  | 'lesson_completed'
  | 'practice_needed'
  | 'locked'
  | 'ready'
  | 'review_required'
  | 'completed'
  | 'coming_soon'

type PathItemType = 'skill' | 'capstone' | 'capstone_review' | 'mastery' | 'full_exam'

interface PathItem {
  id: string
  type: PathItemType
  rowNum: number
  title: string
  description: string
  details?: string
  category: string
  categoryBadgeClass: string
  status: PathItemStatus
  statusLabel: string
  statusBadgeClass: string
  lockReason?: string
  actionLabel: string
  actionHref: string
  actionEnabled: boolean
  isModal?: boolean
  // skill-specific
  diagnosticPct?: number | null
  diagnosticScore?: string | null
  sectionLabel?: string | null
  sectionBadgeClass?: string
  // milestone-specific
  accuracy?: number | null
  correctCount?: number | null
  totalCount?: number | null
  weakestSlugs?: string[]
}

// ── Constants ──────────────────────────────────────────────────────────────────

const WRITING_SLUGS = ['boundaries', 'form-structure-sense', 'transitions', 'rhetorical-synthesis']
const READING_SLUGS = [
  'words-in-context', 'central-ideas-details', 'text-structure-purpose',
  'command-of-evidence', 'quantitative-evidence', 'inferences', 'cross-text-connections',
]
const ALL_SLUGS = [...WRITING_SLUGS, ...READING_SLUGS]
const TOTAL_SKILLS = ALL_SLUGS.length

const DIAGNOSTIC_STORAGE_KEY = 'sat_rw_diagnostic_progress'

const CAPSTONE_BADGE_CLASS = 'bg-blue-50 text-blue-600 border-blue-200'
const MASTERY_BADGE_CLASS = 'bg-rose-50 text-rose-500 border-rose-200'
const FULL_SAT_BADGE_CLASS = 'bg-indigo-50 text-indigo-600 border-indigo-200'

// ── computeNextStep ────────────────────────────────────────────────────────────

const PRIORITY_ORDER = [...ACADEMY_SKILL_SLUGS]

function computeNextStep(
  diagnosticResult: DiagnosticResult | null,
  mastery: Record<string, SkillMastery>,
  lessons: LessonProgress[],
  capstonesData: CapstonesData | null,
  satFormsData: SATFormsData | null,
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
        type: 'lesson', slug,
        href: `/sat-rw-academy/lesson/${slug}`,
        label: `Start ${name} Lesson`,
        reason: `Your diagnostic identified ${name} as a priority area. Begin with the lesson.`,
      }
    }
    if (!skillMastery || skillMastery.status === 'not_started' || skillMastery.status === 'learning' || skillMastery.status === 'developing') {
      return {
        type: 'drill', slug,
        href: `/sat-rw-academy/lesson/${slug}`,
        label: `Practice ${name}`,
        reason: `You completed the ${name} lesson. Now build mastery with the targeted drill.`,
      }
    }
  }

  // All skills covered — advance through capstone progression
  if (capstonesData) {
    const cap1 = capstonesData.capstones.find(c => c.number === 1) ?? null
    const cap2 = capstonesData.capstones.find(c => c.number === 2) ?? null
    const cap3 = capstonesData.capstones.find(c => c.number === 3) ?? null
    const allLessonsDone = ALL_SLUGS.every(s => completedLessons.has(s))

    const isProficientEnough = (slug: string) => {
      const m = mastery[slug]
      return m?.status === 'proficient' || m?.status === 'mastered'
    }
    const reviewComplete = (cap: CapstoneStatus | null) =>
      (cap?.completed ?? false) &&
      ((cap?.weakestSlugs ?? []).length === 0 || (cap?.weakestSlugs ?? []).every(isProficientEnough))

    const cap1ReviewDone = reviewComplete(cap1)
    const cap2ReviewDone = reviewComplete(cap2)
    const cap3Available = cap3?.available ?? false
    const cap3ReviewDone = cap3Available ? reviewComplete(cap3) : true

    if (!cap1?.completed) {
      if (allLessonsDone) {
        return {
          type: 'capstone', number: 1,
          href: '/sat-rw-academy/capstones/capstone-1',
          label: 'Take R&W Academy Capstone 1',
          reason: 'You have completed all 11 skill lessons. Apply everything in your first timed capstone assessment.',
        }
      }
    } else if (!cap1ReviewDone) {
      const weak = (cap1?.weakestSlugs ?? []).find(s => !isProficientEnough(s))
      if (weak) {
        return {
          type: 'drill', slug: weak,
          href: `/sat-rw-academy/lesson/${weak}`,
          label: `Practice ${SKILL_DISPLAY_NAMES[weak] ?? weak}`,
          reason: `Capstone 1 showed ${SKILL_DISPLAY_NAMES[weak] ?? weak} as a weak area. Build mastery before Capstone 2.`,
        }
      }
    } else if (!cap2?.completed) {
      return {
        type: 'capstone', number: 2,
        href: '/sat-rw-academy/capstones/capstone-2',
        label: 'Take R&W Academy Capstone 2',
        reason: 'You have addressed your Capstone 1 weak areas. Take Capstone 2 to measure your progress.',
      }
    } else if (!cap2ReviewDone) {
      const weak = (cap2?.weakestSlugs ?? []).find(s => !isProficientEnough(s))
      if (weak) {
        return {
          type: 'drill', slug: weak,
          href: `/sat-rw-academy/lesson/${weak}`,
          label: `Practice ${SKILL_DISPLAY_NAMES[weak] ?? weak}`,
          reason: `Capstone 2 showed ${SKILL_DISPLAY_NAMES[weak] ?? weak} as a weak area. Strengthen it before Capstone 3.`,
        }
      }
    } else if (cap3Available && !cap3?.completed) {
      return {
        type: 'capstone', number: 3,
        href: '/sat-rw-academy/capstones/capstone-3',
        label: 'Take R&W Academy Capstone 3',
        reason: 'You have completed Capstone 2. Take the final capstone to complete your capstone series.',
      }
    } else if (cap3Available && !cap3ReviewDone) {
      const weak = (cap3?.weakestSlugs ?? []).find(s => !isProficientEnough(s))
      if (weak) {
        return {
          type: 'drill', slug: weak,
          href: `/sat-rw-academy/lesson/${weak}`,
          label: `Practice ${SKILL_DISPLAY_NAMES[weak] ?? weak}`,
          reason: `Capstone 3 showed ${SKILL_DISPLAY_NAMES[weak] ?? weak} as a persistent weak area. Address it before the Final Mastery Check.`,
        }
      }
    } else if (!capstonesData.masteryCheckDone) {
      return {
        type: 'mastery-check',
        href: '/sat-rw-academy/mastery-check',
        label: 'Take Final R&W Mastery Check',
        reason: 'You have completed the capstone series. Measure your total R&W skill improvement from start to finish.',
      }
    } else {
      const recForm = satFormsData?.recommendedFormNumber ?? 1
      return {
        type: 'sat-full-exam',
        href: '#sat-form-selector',
        label: `Take SAT Form ${recForm}`,
        reason: 'You have completed the full R&W Academy. Apply your skills in a complete full-length SAT-style practice exam.',
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

// ── buildPathItems ─────────────────────────────────────────────────────────────
// Builds the unified ordered path array. Always includes all 19 items (11 skills
// + 8 milestones). Milestones default to Locked when capstonesData is null.

function buildPathItems(
  diagnosticResult: DiagnosticResult,
  mastery: Record<string, SkillMastery>,
  lessons: LessonProgress[],
  capstonesData: CapstonesData | null,
  satFormsData: SATFormsData | null,
  nextStep: ReturnType<typeof computeNextStep> | null,
): PathItem[] {
  const completedLessons = new Set(lessons.filter(l => l.status === 'completed').map(l => l.lessonSlug))
  const allLessonsDone = ALL_SLUGS.every(s => completedLessons.has(s))

  // ── Skill items (sorted by diagnostic accuracy, weakest first) ──────────────
  const sortedSlugs = ACADEMY_SKILL_SLUGS
    .filter(slug => diagnosticResult.skill_results[slug])
    .sort((a, b) => (diagnosticResult.skill_results[a]?.pct ?? 100) - (diagnosticResult.skill_results[b]?.pct ?? 100))

  const skillItems: PathItem[] = sortedSlugs.map((slug, i) => {
    const skillResult = diagnosticResult.skill_results[slug]
    const skillMastery = mastery[slug]
    const lessonDone = completedLessons.has(slug)
    const name = SKILL_DISPLAY_NAMES[slug] ?? slug
    const isRecommended = nextStep?.slug === slug
    const section = SKILL_SECTION[slug as keyof typeof SKILL_SECTION] ?? null

    let status: PathItemStatus
    let statusLabel: string
    let statusBadgeClass: string
    let actionLabel: string

    if (isRecommended) {
      status = 'recommended'; statusLabel = 'Recommended Next'
      statusBadgeClass = 'bg-sky-100 text-sky-700 border-sky-300'
      actionLabel = nextStep!.label
    } else if (skillMastery?.status === 'mastered' || skillMastery?.status === 'proficient') {
      status = 'completed'; statusLabel = 'Proficient+'
      statusBadgeClass = 'bg-emerald-100 text-emerald-700 border-emerald-300'
      actionLabel = 'Review'
    } else if (lessonDone) {
      status = 'practice_needed'; statusLabel = 'Practice Needed'
      statusBadgeClass = 'bg-amber-100 text-amber-700 border-amber-300'
      actionLabel = 'Practice'
    } else {
      status = 'not_started'; statusLabel = 'Not Started'
      statusBadgeClass = 'bg-slate-100 text-slate-500 border-slate-300'
      actionLabel = 'Start Lesson'
    }

    return {
      id: `skill-${slug}`,
      type: 'skill',
      rowNum: i + 1,
      title: name,
      description: '',
      category: section === 'reading' ? 'Reading' : section === 'writing' ? 'Writing' : '',
      categoryBadgeClass: section === 'reading'
        ? 'bg-purple-50 text-purple-600 border-purple-200'
        : 'bg-yellow-50 text-yellow-700 border-yellow-200',
      status, statusLabel, statusBadgeClass,
      actionLabel,
      actionHref: isRecommended ? nextStep!.href : `/sat-rw-academy/lesson/${slug}`,
      actionEnabled: true,
      diagnosticPct: skillResult?.pct ?? null,
      diagnosticScore: skillResult ? `${skillResult.correct}/${skillResult.total}` : null,
    }
  })

  const base = sortedSlugs.length

  // ── Capstone data (null-safe defaults) ──────────────────────────────────────
  const cap1 = capstonesData?.capstones.find(c => c.number === 1) ?? null
  const cap2 = capstonesData?.capstones.find(c => c.number === 2) ?? null
  const cap3 = capstonesData?.capstones.find(c => c.number === 3) ?? null
  const masteryCheckDone = capstonesData?.masteryCheckDone ?? false
  const cap3Available = cap3?.available ?? false

  const isProficientEnough = (slug: string) => {
    const m = mastery[slug]
    return m?.status === 'proficient' || m?.status === 'mastered'
  }
  const reviewComplete = (cap: CapstoneStatus | null) =>
    (cap?.completed ?? false) &&
    ((cap?.weakestSlugs ?? []).length === 0 || (cap?.weakestSlugs ?? []).every(isProficientEnough))

  const cap1ReviewDone = reviewComplete(cap1)
  const cap2ReviewDone = reviewComplete(cap2)
  const cap3ReviewDone = cap3Available ? reviewComplete(cap3) : true
  const allCapstonesAndReviewsDone = cap1ReviewDone && cap2ReviewDone && (!cap3Available || cap3ReviewDone)

  function mkStatus(
    done: boolean,
    unlocked: boolean,
    isRecommendedType: boolean,
    lockMsg: string,
    readyBadgeClass = 'bg-blue-100 text-blue-600 border-blue-200',
  ): Pick<PathItem, 'status' | 'statusLabel' | 'statusBadgeClass' | 'lockReason'> {
    if (done) return { status: 'completed', statusLabel: 'Completed', statusBadgeClass: 'bg-emerald-100 text-emerald-700 border-emerald-300' }
    if (isRecommendedType) return { status: 'recommended', statusLabel: 'Recommended Next', statusBadgeClass: 'bg-sky-100 text-sky-700 border-sky-300' }
    if (!unlocked) return { status: 'locked', statusLabel: 'Locked', statusBadgeClass: 'bg-slate-100 text-slate-400 border-slate-200', lockReason: lockMsg }
    return { status: 'ready', statusLabel: 'Ready', statusBadgeClass: readyBadgeClass }
  }

  function mkReviewStatus(
    capCompleted: boolean,
    reviewDone: boolean,
    lockMsg: string,
  ): Pick<PathItem, 'status' | 'statusLabel' | 'statusBadgeClass' | 'lockReason'> {
    if (!capCompleted) return { status: 'locked', statusLabel: 'Locked', statusBadgeClass: 'bg-slate-100 text-slate-400 border-slate-200', lockReason: lockMsg }
    if (reviewDone) return { status: 'completed', statusLabel: 'Completed', statusBadgeClass: 'bg-emerald-100 text-emerald-700 border-emerald-300' }
    return { status: 'review_required', statusLabel: 'Review Required', statusBadgeClass: 'bg-amber-100 text-amber-700 border-amber-300' }
  }

  // ── Capstone 1 ──────────────────────────────────────────────────────────────
  const cap1s = mkStatus(
    cap1?.completed ?? false,
    allLessonsDone,
    nextStep?.type === 'capstone' && nextStep.number === 1,
    'Complete all 11 core skill lessons to unlock Capstone 1.',
  )
  const capstone1Item: PathItem = {
    id: 'capstone-1', type: 'capstone', rowNum: base + 1,
    title: 'R&W Academy Capstone 1',
    description: 'Complete a full mixed Reading and Writing assessment covering all 11 academy skills.',
    details: '54 questions • 2 timed modules • All 11 R&W skills',
    category: 'Capstone', categoryBadgeClass: CAPSTONE_BADGE_CLASS,
    ...cap1s,
    actionLabel: cap1?.completed ? 'View Results' : allLessonsDone ? 'Take Capstone 1' : 'Complete Core Lessons First',
    actionHref: '/sat-rw-academy/capstones/capstone-1',
    actionEnabled: allLessonsDone && (cap1?.available !== false),
    accuracy: cap1?.accuracy ?? null,
    correctCount: cap1?.correctCount ?? null,
    totalCount: cap1?.totalCount ?? null,
  }

  // ── Capstone 1 Review ────────────────────────────────────────────────────────
  const cap1rs = mkReviewStatus(
    cap1?.completed ?? false,
    cap1ReviewDone,
    'Complete Capstone 1 to unlock your personalized review.',
  )
  const capstone1ReviewItem: PathItem = {
    id: 'capstone-1-review', type: 'capstone_review', rowNum: base + 2,
    title: 'Capstone 1 Review',
    description: cap1?.completed
      ? 'Address your weak areas from Capstone 1 before moving to Capstone 2.'
      : 'Complete Capstone 1 to unlock your personalized review.',
    category: 'Capstone', categoryBadgeClass: CAPSTONE_BADGE_CLASS,
    ...cap1rs,
    actionLabel: cap1ReviewDone ? 'Reviewed' : 'Review Weak Areas',
    actionHref: '/sat-rw-academy/capstones',
    actionEnabled: cap1?.completed ?? false,
    weakestSlugs: cap1?.weakestSlugs ?? [],
  }

  // ── Capstone 2 ──────────────────────────────────────────────────────────────
  const cap2s = mkStatus(
    cap2?.completed ?? false,
    cap1ReviewDone,
    nextStep?.type === 'capstone' && nextStep.number === 2,
    'Complete your Capstone 1 Review to unlock Capstone 2.',
  )
  const capstone2Item: PathItem = {
    id: 'capstone-2', type: 'capstone', rowNum: base + 3,
    title: 'R&W Academy Capstone 2',
    description: 'Apply your revised strategies in a second full assessment and measure improvement across all 11 skills.',
    details: '54 new questions • 2 timed modules • All 11 R&W skills',
    category: 'Capstone', categoryBadgeClass: CAPSTONE_BADGE_CLASS,
    ...cap2s,
    actionLabel: cap2?.completed ? 'View Results' : cap1ReviewDone ? 'Take Capstone 2' : 'Locked',
    actionHref: '/sat-rw-academy/capstones/capstone-2',
    actionEnabled: cap1ReviewDone,
    accuracy: cap2?.accuracy ?? null,
    correctCount: cap2?.correctCount ?? null,
    totalCount: cap2?.totalCount ?? null,
  }

  // ── Capstone 2 Review ────────────────────────────────────────────────────────
  const cap2rs = mkReviewStatus(
    cap2?.completed ?? false,
    cap2ReviewDone,
    'Complete Capstone 2 to unlock your personalized review.',
  )
  const capstone2ReviewItem: PathItem = {
    id: 'capstone-2-review', type: 'capstone_review', rowNum: base + 4,
    title: 'Capstone 2 Review',
    description: cap2?.completed
      ? 'Address remaining weak areas from Capstone 2 before your final capstone.'
      : 'Complete Capstone 2 to unlock your personalized review.',
    category: 'Capstone', categoryBadgeClass: CAPSTONE_BADGE_CLASS,
    ...cap2rs,
    actionLabel: cap2ReviewDone ? 'Reviewed' : 'Review Weak Areas',
    actionHref: '/sat-rw-academy/capstones',
    actionEnabled: cap2?.completed ?? false,
    weakestSlugs: cap2?.weakestSlugs ?? [],
  }

  // ── Capstone 3 ──────────────────────────────────────────────────────────────
  const cap3Unlocked = cap2ReviewDone
  const cap3Done = cap3?.completed ?? false
  let cap3StatusOverride: Pick<PathItem, 'status' | 'statusLabel' | 'statusBadgeClass' | 'lockReason'> | null = null
  if (!cap3Unlocked) {
    cap3StatusOverride = { status: 'locked', statusLabel: 'Locked', statusBadgeClass: 'bg-slate-100 text-slate-400 border-slate-200', lockReason: 'Complete your Capstone 2 Review to unlock Capstone 3.' }
  } else if (!cap3Available) {
    cap3StatusOverride = { status: 'coming_soon', statusLabel: 'Coming Soon', statusBadgeClass: 'bg-slate-100 text-slate-400 border-slate-200' }
  }
  const cap3s = cap3StatusOverride ?? mkStatus(
    cap3Done,
    cap3Unlocked,
    nextStep?.type === 'capstone' && nextStep.number === 3,
    'Complete your Capstone 2 Review to unlock Capstone 3.',
  )
  const capstone3Item: PathItem = {
    id: 'capstone-3', type: 'capstone', rowNum: base + 5,
    title: 'R&W Academy Capstone 3',
    description: 'Complete the final full academy capstone and demonstrate consistent performance under timed conditions.',
    details: '54 new questions • 2 timed modules • All 11 R&W skills',
    category: 'Capstone', categoryBadgeClass: CAPSTONE_BADGE_CLASS,
    ...cap3s,
    actionLabel: cap3Done ? 'View Results' : cap3Unlocked && cap3Available ? 'Take Capstone 3' : 'Locked',
    actionHref: '/sat-rw-academy/capstones/capstone-3',
    actionEnabled: cap3Unlocked && cap3Available,
    accuracy: cap3?.accuracy ?? null,
    correctCount: cap3?.correctCount ?? null,
    totalCount: cap3?.totalCount ?? null,
  }

  // ── Capstone 3 Review ────────────────────────────────────────────────────────
  const cap3rsBase = mkReviewStatus(
    cap3Done,
    cap3ReviewDone,
    'Complete Capstone 3 to unlock your personalized review.',
  )
  const cap3rsStatus = (!cap3Available && !cap3Done)
    ? { status: 'locked' as PathItemStatus, statusLabel: 'Locked', statusBadgeClass: 'bg-slate-100 text-slate-400 border-slate-200', lockReason: 'Complete Capstone 3 to unlock your personalized review.' }
    : cap3rsBase
  const capstone3ReviewItem: PathItem = {
    id: 'capstone-3-review', type: 'capstone_review', rowNum: base + 6,
    title: 'Capstone 3 Review',
    description: cap3Done
      ? 'Address any persistent weak areas before the Final Mastery Check.'
      : 'Complete Capstone 3 to unlock your personalized review.',
    category: 'Capstone', categoryBadgeClass: CAPSTONE_BADGE_CLASS,
    ...cap3rsStatus,
    actionLabel: cap3ReviewDone ? 'Reviewed' : 'Review Weak Areas',
    actionHref: '/sat-rw-academy/capstones',
    actionEnabled: cap3Done,
    weakestSlugs: cap3?.weakestSlugs ?? [],
  }

  // ── Final Mastery Check ──────────────────────────────────────────────────────
  const masteryUnlocked = allCapstonesAndReviewsDone
  const masteryS = mkStatus(
    masteryCheckDone,
    masteryUnlocked,
    nextStep?.type === 'mastery-check',
    'Complete all three Capstones and their required reviews to unlock the Final Mastery Check.',
    'bg-rose-100 text-rose-700 border-rose-200',
  )
  const masteryCheckItem: PathItem = {
    id: 'mastery-check', type: 'mastery', rowNum: base + 7,
    title: 'Final R&W Mastery Check',
    description: 'Measure how your Reading and Writing performance changed since the original diagnostic using a new set of questions.',
    details: '22 questions • All 11 skills • Compares to your diagnostic',
    category: 'Mastery', categoryBadgeClass: MASTERY_BADGE_CLASS,
    ...masteryS,
    actionLabel: masteryCheckDone ? 'View Mastery Results' : masteryUnlocked ? 'Take Final Mastery Check' : 'Locked',
    actionHref: '/sat-rw-academy/mastery-check',
    actionEnabled: masteryUnlocked,
  }

  // ── Full SAT Exam (choose any form) ─────────────────────────────────────────
  const satMilestoneComplete = satFormsData?.finalMilestoneComplete ?? false
  const satPostMasteryForm = satFormsData?.postMasteryForm ?? null
  const satRecommendedForm = satFormsData?.recommendedFormNumber ?? 1
  const isSatRecommended = nextStep?.type === 'sat-full-exam'

  let satStatus: PathItemStatus
  let satStatusLabel: string
  let satStatusBadgeClass: string
  let satLockReason: string | undefined
  let satActionLabel: string
  let satActionEnabled: boolean

  if (satMilestoneComplete && satPostMasteryForm) {
    satStatus = 'completed'
    satStatusLabel = `Completed · SAT Form ${satPostMasteryForm.formNumber}`
    satStatusBadgeClass = 'bg-emerald-100 text-emerald-700 border-emerald-300'
    satActionLabel = 'Choose SAT Form'
    satActionEnabled = true
    satLockReason = undefined
  } else if (isSatRecommended) {
    satStatus = 'recommended'
    satStatusLabel = 'Recommended Next'
    satStatusBadgeClass = 'bg-sky-100 text-sky-700 border-sky-300'
    satActionLabel = `Take SAT Form ${satRecommendedForm}`
    satActionEnabled = true
    satLockReason = undefined
  } else if (masteryCheckDone) {
    satStatus = 'ready'
    satStatusLabel = 'Ready'
    satStatusBadgeClass = 'bg-emerald-100 text-emerald-700 border-emerald-300'
    satActionLabel = 'Choose SAT Form'
    satActionEnabled = true
    satLockReason = undefined
  } else {
    satStatus = 'locked'
    satStatusLabel = 'Locked'
    satStatusBadgeClass = 'bg-slate-100 text-slate-400 border-slate-200'
    satActionLabel = 'Locked'
    satActionEnabled = false
    satLockReason = 'Complete the Final R&W Mastery Check to unlock your full-length SAT exam milestone.'
  }

  const satExamItem: PathItem = {
    id: 'sat-full-exam', type: 'full_exam', rowNum: base + 8,
    title: 'Take a Full-Length SAT Exam',
    description: 'Apply your Reading and Writing progress in a full-length computer-adaptive SAT-style exam that also includes Math.',
    details: 'Choose SAT Forms 1–5 · Reading and Writing + Math · MockMate estimated SAT score',
    category: 'Full SAT Exam', categoryBadgeClass: FULL_SAT_BADGE_CLASS,
    status: satStatus, statusLabel: satStatusLabel, statusBadgeClass: satStatusBadgeClass,
    lockReason: satLockReason,
    actionLabel: satActionLabel,
    actionHref: '#sat-form-selector',
    actionEnabled: satActionEnabled,
    isModal: satActionEnabled,
  }

  return [
    ...skillItems,
    capstone1Item,
    capstone1ReviewItem,
    capstone2Item,
    capstone2ReviewItem,
    capstone3Item,
    capstone3ReviewItem,
    masteryCheckItem,
    satExamItem,
  ]
}

// ── PathItemRow ────────────────────────────────────────────────────────────────

function PathItemRow({
  item,
  mastery,
  onAction,
}: {
  item: PathItem
  mastery: Record<string, SkillMastery>
  onAction?: () => void
}) {
  const isLocked = item.status === 'locked' || item.status === 'coming_soon'

  if (item.type === 'skill') {
    return (
      <div className="flex items-center gap-3 flex-wrap rounded-lg border border-slate-200 bg-white px-4 py-3">
        <span className="text-xs font-bold text-slate-300 w-4 shrink-0">{item.rowNum}</span>
        <div className="flex-1 min-w-[8rem]">
          <p className="text-sm font-semibold text-slate-900 truncate">{item.title}</p>
          {item.diagnosticPct !== null && item.diagnosticPct !== undefined && (
            <p className="text-[11px] text-slate-400 mt-0.5">
              Diagnostic: {item.diagnosticPct}% ({item.diagnosticScore})
            </p>
          )}
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className={cn('text-[11px] font-semibold px-2 py-0.5 rounded-full border', item.statusBadgeClass)}>
            {item.statusLabel}
          </span>
          {item.category && (
            <span className={cn('text-[11px] font-medium px-2 py-0.5 rounded-full border', item.categoryBadgeClass)}>
              {item.category}
            </span>
          )}
        </div>
        <Link
          href={item.actionHref}
          className="shrink-0 text-xs font-semibold text-sky-600 hover:text-sky-800 whitespace-nowrap"
        >
          {item.actionLabel} →
        </Link>
      </div>
    )
  }

  // Milestone rows (capstone, capstone_review, mastery, full_exam)
  const borderClass = isLocked
    ? 'border-slate-100 bg-slate-50'
    : item.status === 'completed'
      ? 'border-emerald-200 bg-emerald-50/40'
      : item.status === 'recommended'
        ? 'border-sky-200 bg-sky-50/40'
        : item.status === 'review_required'
          ? 'border-amber-200 bg-amber-50/40'
          : 'border-blue-200 bg-blue-50/40'

  // Capstone review rows: show weak skills inline
  const showWeakSkills =
    item.type === 'capstone_review' &&
    item.status !== 'locked' &&
    (item.weakestSlugs?.length ?? 0) > 0

  return (
    <div className={cn('rounded-lg border px-4 py-3', borderClass)}>
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex-1 min-w-[8rem]">
          <p className={cn('text-sm font-semibold', isLocked ? 'text-slate-400' : 'text-slate-900')}>
            {item.title}
          </p>
          <p className={cn('text-[12px] mt-0.5 leading-snug', isLocked ? 'text-slate-400' : 'text-slate-500')}>
            {item.description}
          </p>
          {item.details && (
            <p className="text-[11px] text-slate-400 mt-0.5">{item.details}</p>
          )}
          {item.accuracy !== null && item.accuracy !== undefined && (
            <p className="text-[11px] text-emerald-600 mt-0.5">
              Score: {item.correctCount}/{item.totalCount} ({item.accuracy}%)
            </p>
          )}
          {item.lockReason && isLocked && (
            <p className="text-[11px] text-slate-400 mt-1 italic">{item.lockReason}</p>
          )}
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className={cn('text-[11px] font-semibold px-2 py-0.5 rounded-full border', item.statusBadgeClass)}>
            {item.statusLabel}
          </span>
          <span className={cn('text-[11px] font-medium px-2 py-0.5 rounded-full border', item.categoryBadgeClass)}>
            {item.category}
          </span>
        </div>
        {item.actionEnabled ? (
          onAction ? (
            <button
              onClick={onAction}
              className="shrink-0 text-xs font-semibold text-sky-600 hover:text-sky-800 whitespace-nowrap"
            >
              {item.actionLabel} →
            </button>
          ) : (
            <Link
              href={item.actionHref}
              className="shrink-0 text-xs font-semibold text-sky-600 hover:text-sky-800 whitespace-nowrap"
            >
              {item.actionLabel} →
            </Link>
          )
        ) : (
          <span className="shrink-0 text-xs text-slate-300 whitespace-nowrap">{item.actionLabel}</span>
        )}
      </div>

      {showWeakSkills && (
        <div className="mt-2 pt-2 border-t border-slate-100 space-y-1.5">
          <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Weak areas to address</p>
          {item.weakestSlugs!.map(slug => {
            const m = mastery[slug]
            const done = m?.status === 'proficient' || m?.status === 'mastered'
            const name = SKILL_DISPLAY_NAMES[slug] ?? slug
            return (
              <div key={slug} className="flex items-center gap-2">
                {done
                  ? <span className="text-[11px] text-slate-400 line-through flex-1">{name}</span>
                  : <span className="text-[11px] text-amber-700 flex-1">{name}</span>
                }
                {done
                  ? <span className="text-[11px] text-emerald-600 shrink-0">Proficient</span>
                  : (
                    <Link
                      href={`/sat-rw-academy/lesson/${slug}`}
                      className="text-[11px] font-semibold text-sky-600 hover:text-sky-800 shrink-0"
                    >
                      Review →
                    </Link>
                  )
                }
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

// ── StatBox, PremiumNotice ─────────────────────────────────────────────────────

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
  const [satFormsData, setSatFormsData] = useState<SATFormsData | null>(null)
  const [showSATSelector, setShowSATSelector] = useState(false)
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
      fetch('/api/academy/sat-forms').then(r => r.ok ? r.json() : null) as Promise<SATFormsData | null>,
    ])
      .then(([masteryArr, lessonArr, queue, diag, capstones, satForms]) => {
        const map: Record<string, SkillMastery> = {}
        for (const m of masteryArr) map[m.skillSlug] = m
        setMastery(map)
        setLessons(lessonArr)
        setReviewsDue(queue.totalDue ?? queue.items?.length ?? 0)
        setDiagnosticResult(diag)
        setCapstonesData(capstones)
        setSatFormsData(satForms)
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

  const nextStep = isPremium && !loading
    ? computeNextStep(diagnosticResult, mastery, lessons, capstonesData, satFormsData)
    : null

  // Unified path — always includes all 19 items when diagnostic is complete
  const pathItems = diagnosticResult && !loading
    ? buildPathItems(diagnosticResult, mastery, lessons, capstonesData, satFormsData, nextStep)
    : null

  return (
    <div className="space-y-8 max-w-3xl">

      {/* ── Premium notice ───────────────────────────────────────────── */}
      {!isPremium && <PremiumNotice />}

      {/* ── Course banner ───────────────────────────────────────────── */}
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

        // ── POST-DIAGNOSTIC LAYOUT ───────────────────────────────────
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
                  nextStep.type === 'sat-full-exam' ? (
                    <button
                      onClick={() => setShowSATSelector(true)}
                      className="block w-full rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold text-center px-4 py-2.5 transition-colors"
                    >
                      {nextStep.label}
                    </button>
                  ) : (
                    <Link
                      href={nextStep.href}
                      className="block w-full rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold text-center px-4 py-2.5 transition-colors"
                    >
                      {nextStep.label}
                    </Link>
                  )
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
                {nextStep.type === 'sat-full-exam' ? (
                  <button
                    onClick={() => setShowSATSelector(true)}
                    className="shrink-0 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold px-4 py-2.5 transition-colors whitespace-nowrap"
                  >
                    {nextStep.label}
                  </button>
                ) : (
                  <Link
                    href={nextStep.href}
                    className="shrink-0 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold px-4 py-2.5 transition-colors whitespace-nowrap"
                  >
                    {nextStep.label}
                  </Link>
                )}
              </div>
              <p className="mt-3 pt-3 border-t border-sky-200">
                <Link href="/sat-rw-academy/diagnostic" className="text-[11px] text-sky-600 hover:underline">
                  View Diagnostic Results →
                </Link>
              </p>
            </div>
          )}

          {/* ── Unified Personalized Learning Path ─────────────────────── */}
          {pathItems && pathItems.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400 mb-3">
                Your Personalized Learning Path
              </h2>

              <div className="space-y-2">
                {pathItems.map((item, i) => (
                  <Fragment key={item.id}>
                    {/* Divider before first non-skill item */}
                    {item.type !== 'skill' && (i === 0 || pathItems[i - 1].type === 'skill') && (
                      <div className="pt-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="h-px flex-1 bg-slate-200" />
                          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 whitespace-nowrap">
                            Apply Everything You Learned
                          </span>
                          <div className="h-px flex-1 bg-slate-200" />
                        </div>
                        <p className="text-xs text-slate-500 mb-3">
                          Complete three full R&amp;W Academy Capstones, review your remaining weaknesses, and finish with the Final Mastery Check before taking a full-length SAT exam.
                        </p>
                      </div>
                    )}
                    <PathItemRow
                      item={item}
                      mastery={mastery}
                      onAction={item.isModal ? () => setShowSATSelector(true) : undefined}
                    />
                  </Fragment>
                ))}
              </div>

              <p className="text-[11px] text-slate-400 mt-3">
                Skill rows ranked by diagnostic performance · weakest first · Capstone milestones always visible
              </p>
            </div>
          )}
        </>

      ) : (

        // ── PRE-DIAGNOSTIC LAYOUT ────────────────────────────────────
        <>
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

          {loading && (
            <div className="space-y-2">
              <div className="h-4 w-3/4 animate-pulse rounded bg-slate-100" />
              <div className="h-4 w-1/2 animate-pulse rounded bg-slate-100" />
            </div>
          )}

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

      {/* ── Disclaimer ───────────────────────────────────────────────── */}
      <p className="text-xs text-slate-400 leading-relaxed">
        All MockMate Academy content is independently created for practice purposes. MockMate is not affiliated with, endorsed by, or sponsored by College Board. SAT® is a trademark of College Board, which is not affiliated with and does not endorse MockMate.
      </p>

      {/* ── SAT Form Selector Modal ───────────────────────────────────── */}
      {showSATSelector && satFormsData && (
        <SATFormSelectorModal
          forms={satFormsData.forms}
          recommendedFormNumber={satFormsData.recommendedFormNumber}
          onClose={() => setShowSATSelector(false)}
        />
      )}

    </div>
  )
}
