'use client'

import { useEffect, useState, Fragment } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { SATFormSelectorModal } from '@/components/academy/SATFormSelectorModal'
import type { SATFormInfo } from '@/components/academy/SATFormSelectorModal'
import {
  MATH_SKILL_DISPLAY_NAMES,
  MATH_SKILL_DOMAIN,
  MATH_DOMAIN_DISPLAY,
  MATH_DOMAIN_BADGE_CLASS,
  ALGEBRA_SKILL_SLUGS,
  ADVANCED_MATH_SKILL_SLUGS,
  PSDA_SKILL_SLUGS,
  GEO_TRIG_SKILL_SLUGS,
  type MathSkillSlug,
} from '@/lib/academy/math/skill-mapping'

// ── Types ──────────────────────────────────────────────────────────────────────

interface MathLessonProgress {
  skill_slug: string
  status: 'in_progress' | 'completed'
  completed_at: string | null
}

interface MathAttemptData {
  skillSlug: string
  attemptCount: number
  recentAccuracy: number
  lastAttemptAt: string | null
}

interface MathDiagnosticResult {
  id: string
  correct_count: number
  incorrect_count: number
  omitted_count: number
  total_questions: number
  answered_questions: number
  accuracy_percentage: number
  skill_results: Record<string, { correct: number; total: number; pct: number; domain: string; title: string }>
  domain_results: Record<string, { correct: number; total: number; pct: number; title: string }>
  strongest_skill_slugs: string[]
  weakest_skill_slugs: string[]
  recommended_skill_slug: string | null
  completed_at: string
}

interface MathCapstoneStatus {
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

interface MathCapstonesData {
  capstones: MathCapstoneStatus[]
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
  | 'in_progress'
  | 'lesson_completed'
  | 'practice_needed'
  | 'locked'
  | 'ready'
  | 'review_required'
  | 'completed'
  | 'coming_soon'

type PathItemType =
  | 'skill'
  | 'desmos_lesson'
  | 'desmos_tool'
  | 'capstone'
  | 'capstone_review'
  | 'mastery'
  | 'full_exam'

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
  premiumLocked?: boolean      // true → free-user preview; show amber upgrade link
  assessed?: boolean           // false → show "Not assessed yet" instead of diagnostic score
  diagnosticPct?: number | null
  diagnosticScore?: string | null
  accuracy?: number | null
  correctCount?: number | null
  totalCount?: number | null
  weakestSlugs?: string[]
}

// ── Constants ──────────────────────────────────────────────────────────────────

const ALL_MATH_SLUGS: MathSkillSlug[] = [
  ...ALGEBRA_SKILL_SLUGS,
  ...ADVANCED_MATH_SKILL_SLUGS,
  ...PSDA_SKILL_SLUGS,
  ...GEO_TRIG_SKILL_SLUGS,
]
const TOTAL_SKILLS = ALL_MATH_SLUGS.length

const MATH_DIAGNOSTIC_STORAGE_KEY = 'sat_math_diagnostic_progress'

const CAPSTONE_BADGE_CLASS = 'bg-blue-50 text-blue-600 border-blue-200'
const MASTERY_BADGE_CLASS = 'bg-rose-50 text-rose-500 border-rose-200'
const FULL_SAT_BADGE_CLASS = 'bg-indigo-50 text-indigo-600 border-indigo-200'
const DESMOS_BADGE_CLASS = 'bg-violet-50 text-violet-600 border-violet-200'

interface DesmosLessonMeta {
  id: string
  title: string
  domainLabel: string
  badgeClass: string
}

const DESMOS_LESSONS: DesmosLessonMeta[] = [
  { id: 'l1', title: 'Solve a Linear System Graphically', domainLabel: 'Algebra', badgeClass: 'bg-blue-50 text-blue-700 border-blue-200' },
  { id: 'l2', title: 'Find Roots (Zeros) of a Polynomial', domainLabel: 'Advanced Math', badgeClass: 'bg-purple-50 text-purple-700 border-purple-200' },
  { id: 'l3', title: 'Locate the Vertex of a Parabola', domainLabel: 'Advanced Math', badgeClass: 'bg-purple-50 text-purple-700 border-purple-200' },
  { id: 'l4', title: 'Use Sliders to Explore Parameters', domainLabel: 'Advanced Math', badgeClass: 'bg-purple-50 text-purple-700 border-purple-200' },
  { id: 'l5', title: 'Solve Inequalities Graphically', domainLabel: 'Algebra', badgeClass: 'bg-blue-50 text-blue-700 border-blue-200' },
  { id: 'l6', title: 'Check Circle Equations', domainLabel: 'Geometry', badgeClass: 'bg-orange-50 text-orange-700 border-orange-200' },
  { id: 'l7', title: 'Verify Answers by Function Evaluation', domainLabel: 'Cross-domain', badgeClass: 'bg-slate-100 text-slate-700 border-slate-200' },
  { id: 'l8', title: 'Model Intersections in Context', domainLabel: 'Problem Solving & Data', badgeClass: 'bg-green-50 text-green-700 border-green-200' },
]

// ── computeNextStep ────────────────────────────────────────────────────────────

function computeNextStep(
  diagnosticResult: MathDiagnosticResult | null,
  lessons: MathLessonProgress[],
  capstonesData: MathCapstonesData | null,
  attemptMap: Record<string, MathAttemptData>,
  satFormsData: SATFormsData | null,
): { type: string; slug?: string; number?: number; href: string; label: string; reason: string } {
  if (!diagnosticResult) {
    return {
      type: 'diagnostic',
      href: '/sat-math-academy/diagnostic',
      label: 'Start Math Diagnostic',
      reason: 'Complete the diagnostic to personalize the lesson order around your weakest Math and Desmos skills.',
    }
  }

  const completedLessons = new Set(lessons.filter(l => l.status === 'completed').map(l => l.skill_slug))

  const sortedSlugs: MathSkillSlug[] = [
    ...diagnosticResult.weakest_skill_slugs.filter((s): s is MathSkillSlug => ALL_MATH_SLUGS.includes(s as MathSkillSlug)),
    ...ALL_MATH_SLUGS.filter(s => !diagnosticResult.weakest_skill_slugs.includes(s)),
  ]

  for (const slug of sortedSlugs) {
    const name = MATH_SKILL_DISPLAY_NAMES[slug] ?? slug
    const lessonDone = completedLessons.has(slug)
    const d = attemptMap[slug]
    if (!lessonDone) {
      return {
        type: 'lesson', slug,
        href: `/sat-math-academy/lesson/${slug}`,
        label: `Start ${name} Lesson`,
        reason: `Your diagnostic identified ${name} as a priority area. Begin with the lesson.`,
      }
    }
    const accuracy = d?.recentAccuracy ?? 0
    const hasAttempts = (d?.attemptCount ?? 0) > 0
    if (!hasAttempts || accuracy < 70) {
      return {
        type: 'drill', slug,
        href: `/sat-math-academy/lesson/${slug}`,
        label: `Practice ${name}`,
        reason: hasAttempts
          ? `Your accuracy on ${name} is ${accuracy}%. Practice more to build mastery before moving on.`
          : `You completed the ${name} lesson. Now practice to build mastery.`,
      }
    }
  }

  if (capstonesData) {
    const cap1 = capstonesData.capstones.find(c => c.number === 1) ?? null
    const cap2 = capstonesData.capstones.find(c => c.number === 2) ?? null
    const cap3 = capstonesData.capstones.find(c => c.number === 3) ?? null
    const allLessonsDone = ALL_MATH_SLUGS.every(s => completedLessons.has(s))
    const cap3Available = cap3?.available ?? false

    const isAdequate = (slug: string) => (attemptMap[slug]?.recentAccuracy ?? 0) >= 60
    const reviewComplete = (cap: MathCapstoneStatus | null) =>
      (cap?.completed ?? false) &&
      ((cap?.weakestSlugs ?? []).length === 0 || (cap?.weakestSlugs ?? []).every(isAdequate))

    const cap1ReviewDone = reviewComplete(cap1)
    const cap2ReviewDone = reviewComplete(cap2)
    const cap3ReviewDone = cap3Available ? reviewComplete(cap3) : true

    if (!cap1?.completed) {
      if (allLessonsDone) {
        return { type: 'capstone', number: 1, href: '/sat-math-academy/capstones/math-capstone-1', label: 'Take Math Academy Capstone 1', reason: 'You have completed all 21 math skill lessons. Apply everything in your first timed capstone.' }
      }
    } else if (!cap1ReviewDone) {
      const weak = (cap1?.weakestSlugs ?? []).find(s => !isAdequate(s))
      if (weak) {
        const name = MATH_SKILL_DISPLAY_NAMES[weak as MathSkillSlug] ?? weak
        return { type: 'drill', slug: weak, href: `/sat-math-academy/lesson/${weak}`, label: `Practice ${name}`, reason: `Capstone 1 showed ${name} as a weak area. Build accuracy before Capstone 2.` }
      }
    } else if (!cap2?.completed) {
      return { type: 'capstone', number: 2, href: '/sat-math-academy/capstones/math-capstone-2', label: 'Take Math Academy Capstone 2', reason: 'You have addressed your Capstone 1 weak areas. Take Capstone 2 to measure your progress.' }
    } else if (!cap2ReviewDone) {
      const weak = (cap2?.weakestSlugs ?? []).find(s => !isAdequate(s))
      if (weak) {
        const name = MATH_SKILL_DISPLAY_NAMES[weak as MathSkillSlug] ?? weak
        return { type: 'drill', slug: weak, href: `/sat-math-academy/lesson/${weak}`, label: `Practice ${name}`, reason: `Capstone 2 showed ${name} as a weak area. Strengthen it.` }
      }
    } else if (cap3Available && !cap3?.completed) {
      return { type: 'capstone', number: 3, href: '/sat-math-academy/capstones/math-capstone-3', label: 'Take Math Academy Capstone 3', reason: 'You have addressed your Capstone 2 weak areas. Take the final capstone to complete your capstone series.' }
    } else if (cap3Available && !cap3ReviewDone) {
      const weak = (cap3?.weakestSlugs ?? []).find(s => !isAdequate(s))
      if (weak) {
        const name = MATH_SKILL_DISPLAY_NAMES[weak as MathSkillSlug] ?? weak
        return { type: 'drill', slug: weak, href: `/sat-math-academy/lesson/${weak}`, label: `Practice ${name}`, reason: `Capstone 3 showed ${name} as a persistent weak area. Address it before the Final Mastery Check.` }
      }
    } else if (!capstonesData.masteryCheckDone) {
      return { type: 'mastery-check', href: '/sat-math-academy/mastery-check', label: 'Take Final Math Mastery Check', reason: 'You have completed the capstone series. Measure your total math skill improvement from start to finish.' }
    } else {
      const recForm = satFormsData?.recommendedFormNumber ?? 1
      return { type: 'sat-full-exam', href: '#sat-form-selector', label: `Take SAT Form ${recForm}`, reason: 'You have completed the full Math Academy. Apply your skills in a complete full-length SAT-style practice exam.' }
    }
  }

  return { type: 'mixed', href: '/sat-math-academy/mixed-practice', label: 'Start Mixed Practice', reason: 'Practice with mixed questions across all skills to solidify your knowledge.' }
}

// ── buildPathItems ─────────────────────────────────────────────────────────────
// Accepts diagnosticResult = null (pre-diagnostic) or a completed result.
// Always returns the full curriculum so the path is visible before the diagnostic.

function buildPathItems(
  diagnosticResult: MathDiagnosticResult | null,
  lessons: MathLessonProgress[],
  capstonesData: MathCapstonesData | null,
  attemptMap: Record<string, MathAttemptData>,
  satFormsData: SATFormsData | null,
  nextStep: ReturnType<typeof computeNextStep> | null,
): PathItem[] {
  const isDiagnosticDone = diagnosticResult !== null
  const completedLessons = new Set(lessons.filter(l => l.status === 'completed').map(l => l.skill_slug))
  const inProgressLessons = new Set(lessons.filter(l => l.status === 'in_progress').map(l => l.skill_slug))
  const allLessonsDone = ALL_MATH_SLUGS.every(s => completedLessons.has(s))

  // Sort slugs: post-diagnostic = weakest first; pre-diagnostic = canonical curriculum order
  let allSortedSlugs: MathSkillSlug[]
  if (isDiagnosticDone && diagnosticResult) {
    const diagSlugs = ALL_MATH_SLUGS
      .filter(s => diagnosticResult.skill_results[s])
      .sort((a, b) => (diagnosticResult.skill_results[a]?.pct ?? 100) - (diagnosticResult.skill_results[b]?.pct ?? 100))
    const coveredSet = new Set(diagSlugs)
    allSortedSlugs = [...diagSlugs, ...ALL_MATH_SLUGS.filter(s => !coveredSet.has(s))]
  } else {
    allSortedSlugs = [...ALL_MATH_SLUGS]
  }

  // ── Skill items ──────────────────────────────────────────────────────────────
  const skillItems: PathItem[] = allSortedSlugs.map((slug, i) => {
    const skillResult = isDiagnosticDone ? diagnosticResult?.skill_results[slug] : undefined
    const lessonDone = completedLessons.has(slug)
    const lessonInProgress = inProgressLessons.has(slug)
    const d = attemptMap[slug]
    const name = MATH_SKILL_DISPLAY_NAMES[slug] ?? slug
    const domain = MATH_SKILL_DOMAIN[slug]
    const isRecommended = isDiagnosticDone && nextStep?.slug === slug
    const accuracy = d?.recentAccuracy ?? 0
    const hasAttempts = (d?.attemptCount ?? 0) > 0

    let status: PathItemStatus
    let statusLabel: string
    let statusBadgeClass: string
    let actionLabel: string

    if (isRecommended) {
      status = 'recommended'; statusLabel = 'Recommended Next'
      statusBadgeClass = 'bg-sky-100 text-sky-700 border-sky-300'
      actionLabel = nextStep!.label
    } else if (lessonDone && hasAttempts && accuracy >= 80) {
      status = 'completed'; statusLabel = 'Proficient'
      statusBadgeClass = 'bg-emerald-100 text-emerald-700 border-emerald-300'
      actionLabel = 'Review'
    } else if (lessonDone && hasAttempts && accuracy >= 60) {
      status = 'practice_needed'; statusLabel = 'Improving'
      statusBadgeClass = 'bg-blue-100 text-blue-700 border-blue-300'
      actionLabel = 'Practice More'
    } else if (lessonDone) {
      status = 'practice_needed'; statusLabel = 'Practice Needed'
      statusBadgeClass = 'bg-amber-100 text-amber-700 border-amber-300'
      actionLabel = hasAttempts ? 'Practice More' : 'Start Practice'
    } else if (lessonInProgress) {
      status = 'in_progress'; statusLabel = 'In Progress'
      statusBadgeClass = 'bg-sky-100 text-sky-600 border-sky-200'
      actionLabel = 'Continue Lesson'
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
      category: MATH_DOMAIN_DISPLAY[domain],
      categoryBadgeClass: MATH_DOMAIN_BADGE_CLASS[domain],
      status, statusLabel, statusBadgeClass,
      actionLabel,
      actionHref: isRecommended ? nextStep!.href : `/sat-math-academy/lesson/${slug}`,
      actionEnabled: true,
      assessed: isDiagnosticDone,
      diagnosticPct: skillResult?.pct ?? null,
      diagnosticScore: skillResult ? `${skillResult.correct}/${skillResult.total}` : null,
    }
  })

  // ── Desmos lesson items ──────────────────────────────────────────────────────
  const desmosLessonItems: PathItem[] = DESMOS_LESSONS.map((lesson, i) => ({
    id: `desmos-${lesson.id}`,
    type: 'desmos_lesson',
    rowNum: i + 1,
    title: lesson.title,
    description: '',
    category: lesson.domainLabel,
    categoryBadgeClass: lesson.badgeClass,
    status: 'ready',
    statusLabel: 'Ready',
    statusBadgeClass: 'bg-violet-100 text-violet-700 border-violet-300',
    actionLabel: 'Open Lesson',
    actionHref: '/sat-math-academy/desmos-mastery',
    actionEnabled: true,
  }))

  // ── Desmos Sandbox ───────────────────────────────────────────────────────────
  const sandboxItem: PathItem = {
    id: 'desmos-sandbox',
    type: 'desmos_tool',
    rowNum: 0,
    title: 'Desmos Sandbox',
    description: 'Open a free workspace to graph equations, create tables, test intersections, and experiment with Desmos tools.',
    category: 'Practice Tool',
    categoryBadgeClass: DESMOS_BADGE_CLASS,
    status: 'ready',
    statusLabel: 'Ready',
    statusBadgeClass: 'bg-violet-100 text-violet-700 border-violet-300',
    actionLabel: 'Open Sandbox',
    actionHref: '/sat-math-academy/desmos-sandbox',
    actionEnabled: true,
  }

  // ── Capstone & milestone data ────────────────────────────────────────────────
  const cap1 = capstonesData?.capstones.find(c => c.number === 1) ?? null
  const cap2 = capstonesData?.capstones.find(c => c.number === 2) ?? null
  const cap3 = capstonesData?.capstones.find(c => c.number === 3) ?? null
  const masteryCheckDone = capstonesData?.masteryCheckDone ?? false
  const cap3Available = cap3?.available ?? false

  const isAdequate = (slug: string) => (attemptMap[slug]?.recentAccuracy ?? 0) >= 60
  const reviewComplete = (cap: MathCapstoneStatus | null) =>
    (cap?.completed ?? false) &&
    ((cap?.weakestSlugs ?? []).length === 0 || (cap?.weakestSlugs ?? []).every(isAdequate))

  const cap1ReviewDone = reviewComplete(cap1)
  const cap2ReviewDone = reviewComplete(cap2)
  const cap3ReviewDone = cap3Available ? reviewComplete(cap3) : true
  const allCapstonesAndReviewsDone = cap1ReviewDone && cap2ReviewDone && (!cap3Available || cap3ReviewDone)

  function mkStatus(
    done: boolean,
    unlocked: boolean,
    isRecommendedType: boolean,
    lockMsg: string,
    readyBadge = 'bg-blue-100 text-blue-600 border-blue-200',
  ): Pick<PathItem, 'status' | 'statusLabel' | 'statusBadgeClass' | 'lockReason'> {
    if (done) return { status: 'completed', statusLabel: 'Completed', statusBadgeClass: 'bg-emerald-100 text-emerald-700 border-emerald-300' }
    if (isRecommendedType) return { status: 'recommended', statusLabel: 'Recommended Next', statusBadgeClass: 'bg-sky-100 text-sky-700 border-sky-300' }
    if (!unlocked) return { status: 'locked', statusLabel: 'Locked', statusBadgeClass: 'bg-slate-100 text-slate-400 border-slate-200', lockReason: lockMsg }
    return { status: 'ready', statusLabel: 'Ready', statusBadgeClass: readyBadge }
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

  // Capstone 1
  const cap1s = mkStatus(cap1?.completed ?? false, allLessonsDone, nextStep?.type === 'capstone' && nextStep.number === 1, 'Complete all 21 math skill lessons to unlock Capstone 1.')
  const capstone1Item: PathItem = {
    id: 'math-capstone-1', type: 'capstone', rowNum: 1,
    title: 'Math Academy Capstone 1',
    description: 'A full 44-question math assessment covering all four domains and all 21 skills under timed conditions.',
    details: '44 questions · 2 timed modules (35 min each) · All 21 math skills',
    category: 'Capstone', categoryBadgeClass: CAPSTONE_BADGE_CLASS,
    ...cap1s,
    actionLabel: cap1?.completed ? 'View Results' : allLessonsDone ? 'Take Capstone 1' : 'Complete Core Lessons First',
    actionHref: '/sat-math-academy/capstones/math-capstone-1',
    actionEnabled: allLessonsDone && (cap1?.available !== false),
    accuracy: cap1?.accuracy ?? null, correctCount: cap1?.correctCount ?? null, totalCount: cap1?.totalCount ?? null,
  }

  const cap1rs = mkReviewStatus(cap1?.completed ?? false, cap1ReviewDone, 'Complete Capstone 1 to unlock your personalized review.')
  const capstone1ReviewItem: PathItem = {
    id: 'math-capstone-1-review', type: 'capstone_review', rowNum: 2,
    title: 'Capstone 1 Review',
    description: cap1?.completed ? 'Address your weak areas from Capstone 1 before moving to Capstone 2.' : 'Complete Capstone 1 to unlock your personalized review.',
    category: 'Capstone', categoryBadgeClass: CAPSTONE_BADGE_CLASS,
    ...cap1rs,
    actionLabel: cap1ReviewDone ? 'Reviewed' : 'Review Weak Areas',
    actionHref: '/sat-math-academy/review',
    actionEnabled: cap1?.completed ?? false,
    weakestSlugs: cap1?.weakestSlugs ?? [],
  }

  // Capstone 2
  const cap2s = mkStatus(cap2?.completed ?? false, cap1ReviewDone, nextStep?.type === 'capstone' && nextStep.number === 2, 'Complete your Capstone 1 Review to unlock Capstone 2.')
  const capstone2Item: PathItem = {
    id: 'math-capstone-2', type: 'capstone', rowNum: 3,
    title: 'Math Academy Capstone 2',
    description: 'Apply your revised strategies in a second full assessment and measure improvement across all 21 math skills.',
    details: '44 new questions · 2 timed modules (35 min each) · All 21 math skills',
    category: 'Capstone', categoryBadgeClass: CAPSTONE_BADGE_CLASS,
    ...cap2s,
    actionLabel: cap2?.completed ? 'View Results' : cap1ReviewDone ? 'Take Capstone 2' : 'Locked',
    actionHref: '/sat-math-academy/capstones/math-capstone-2',
    actionEnabled: cap1ReviewDone,
    accuracy: cap2?.accuracy ?? null, correctCount: cap2?.correctCount ?? null, totalCount: cap2?.totalCount ?? null,
  }

  const cap2rs = mkReviewStatus(cap2?.completed ?? false, cap2ReviewDone, 'Complete Capstone 2 to unlock your personalized review.')
  const capstone2ReviewItem: PathItem = {
    id: 'math-capstone-2-review', type: 'capstone_review', rowNum: 4,
    title: 'Capstone 2 Review',
    description: cap2?.completed ? 'Address remaining weak areas from Capstone 2 before Capstone 3.' : 'Complete Capstone 2 to unlock your personalized review.',
    category: 'Capstone', categoryBadgeClass: CAPSTONE_BADGE_CLASS,
    ...cap2rs,
    actionLabel: cap2ReviewDone ? 'Reviewed' : 'Review Weak Areas',
    actionHref: '/sat-math-academy/review',
    actionEnabled: cap2?.completed ?? false,
    weakestSlugs: cap2?.weakestSlugs ?? [],
  }

  // Capstone 3
  const cap3Unlocked = cap2ReviewDone
  const cap3Done = cap3?.completed ?? false
  let cap3StatusOverride: Pick<PathItem, 'status' | 'statusLabel' | 'statusBadgeClass' | 'lockReason'> | null = null
  if (!cap3Unlocked) {
    cap3StatusOverride = { status: 'locked', statusLabel: 'Locked', statusBadgeClass: 'bg-slate-100 text-slate-400 border-slate-200', lockReason: 'Complete your Capstone 2 Review to unlock Math Capstone 3.' }
  } else if (!cap3Available) {
    cap3StatusOverride = { status: 'coming_soon', statusLabel: 'Coming Soon', statusBadgeClass: 'bg-slate-100 text-slate-400 border-slate-200' }
  }
  const cap3s = cap3StatusOverride ?? mkStatus(cap3Done, cap3Unlocked, nextStep?.type === 'capstone' && nextStep.number === 3, 'Complete your Capstone 2 Review to unlock Math Capstone 3.')
  const capstone3Item: PathItem = {
    id: 'math-capstone-3', type: 'capstone', rowNum: 5,
    title: 'Math Academy Capstone 3',
    description: 'Complete the final full math capstone and demonstrate consistent performance under timed conditions.',
    details: '44 new questions · 2 timed modules (35 min each) · All 21 math skills',
    category: 'Capstone', categoryBadgeClass: CAPSTONE_BADGE_CLASS,
    ...cap3s,
    actionLabel: cap3Done ? 'View Results' : cap3Unlocked && cap3Available ? 'Take Capstone 3' : 'Locked',
    actionHref: '/sat-math-academy/capstones/math-capstone-3',
    actionEnabled: cap3Unlocked && cap3Available,
    accuracy: cap3?.accuracy ?? null, correctCount: cap3?.correctCount ?? null, totalCount: cap3?.totalCount ?? null,
  }

  const cap3rsBase = mkReviewStatus(cap3Done, cap3ReviewDone, 'Complete Capstone 3 to unlock your personalized review.')
  const cap3rsStatus = (!cap3Available && !cap3Done)
    ? { status: 'locked' as PathItemStatus, statusLabel: 'Locked', statusBadgeClass: 'bg-slate-100 text-slate-400 border-slate-200', lockReason: 'Complete Capstone 3 to unlock your personalized review.' }
    : cap3rsBase
  const capstone3ReviewItem: PathItem = {
    id: 'math-capstone-3-review', type: 'capstone_review', rowNum: 6,
    title: 'Capstone 3 Review',
    description: cap3Done ? 'Address any persistent weak areas before the Final Mastery Check.' : 'Complete Capstone 3 to unlock your personalized review.',
    category: 'Capstone', categoryBadgeClass: CAPSTONE_BADGE_CLASS,
    ...cap3rsStatus,
    actionLabel: cap3ReviewDone ? 'Reviewed' : 'Review Weak Areas',
    actionHref: '/sat-math-academy/review',
    actionEnabled: cap3Done,
    weakestSlugs: cap3?.weakestSlugs ?? [],
  }

  // Final Mastery Check
  const masteryS = mkStatus(masteryCheckDone, allCapstonesAndReviewsDone, nextStep?.type === 'mastery-check', 'Complete all Math Capstones and their required reviews to unlock the Final Mastery Check.', 'bg-rose-100 text-rose-700 border-rose-200')
  const masteryCheckItem: PathItem = {
    id: 'mastery-check', type: 'mastery', rowNum: 7,
    title: 'Final Math Mastery Check',
    description: 'Measure how your math performance changed since the original diagnostic using a new set of questions.',
    details: '21 questions · All 21 skills · Compares to your diagnostic',
    category: 'Mastery', categoryBadgeClass: MASTERY_BADGE_CLASS,
    ...masteryS,
    actionLabel: masteryCheckDone ? 'View Mastery Results' : allCapstonesAndReviewsDone ? 'Take Final Mastery Check' : 'Locked',
    actionHref: '/sat-math-academy/mastery-check',
    actionEnabled: allCapstonesAndReviewsDone,
  }

  // Full SAT Exam
  const satMilestoneComplete = satFormsData?.finalMilestoneComplete ?? false
  const satPostMasteryForm = satFormsData?.postMasteryForm ?? null
  const satRecommendedForm = satFormsData?.recommendedFormNumber ?? 1
  const isSatRecommended = nextStep?.type === 'sat-full-exam'

  let satStatus: PathItemStatus, satStatusLabel: string, satStatusBadgeClass: string
  let satLockReason: string | undefined, satActionLabel: string, satActionEnabled: boolean

  if (satMilestoneComplete && satPostMasteryForm) {
    satStatus = 'completed'; satStatusLabel = `Completed · SAT Form ${satPostMasteryForm.formNumber}`
    satStatusBadgeClass = 'bg-emerald-100 text-emerald-700 border-emerald-300'
    satActionLabel = 'Choose SAT Form'; satActionEnabled = true
  } else if (isSatRecommended) {
    satStatus = 'recommended'; satStatusLabel = 'Recommended Next'
    satStatusBadgeClass = 'bg-sky-100 text-sky-700 border-sky-300'
    satActionLabel = `Take SAT Form ${satRecommendedForm}`; satActionEnabled = true
  } else if (masteryCheckDone) {
    satStatus = 'ready'; satStatusLabel = 'Ready'
    satStatusBadgeClass = 'bg-emerald-100 text-emerald-700 border-emerald-300'
    satActionLabel = 'Choose SAT Form'; satActionEnabled = true
  } else {
    satStatus = 'locked'; satStatusLabel = 'Locked'
    satStatusBadgeClass = 'bg-slate-100 text-slate-400 border-slate-200'
    satActionLabel = 'Locked'; satActionEnabled = false
    satLockReason = 'Complete the Final Math Mastery Check to unlock your full-length SAT exam milestone.'
  }

  const satExamItem: PathItem = {
    id: 'sat-full-exam', type: 'full_exam', rowNum: 8,
    title: 'Take a Full-Length SAT Exam',
    description: 'Apply your math progress in a full-length computer-adaptive SAT-style exam that also includes Reading and Writing.',
    details: 'Choose SAT Forms 1–5 · Math + Reading & Writing · MockMate estimated SAT score',
    category: 'Full SAT Exam', categoryBadgeClass: FULL_SAT_BADGE_CLASS,
    status: satStatus, statusLabel: satStatusLabel, statusBadgeClass: satStatusBadgeClass,
    lockReason: satLockReason,
    actionLabel: satActionLabel, actionHref: '#sat-form-selector', actionEnabled: satActionEnabled,
    isModal: satActionEnabled,
  }

  return [
    ...skillItems,
    ...desmosLessonItems,
    sandboxItem,
    capstone1Item, capstone1ReviewItem,
    capstone2Item, capstone2ReviewItem,
    capstone3Item, capstone3ReviewItem,
    masteryCheckItem,
    satExamItem,
  ]
}

// ── Section type helpers ───────────────────────────────────────────────────────

function isSkillSection(t: PathItemType) { return t === 'skill' }
function isDesmosSection(t: PathItemType) { return t === 'desmos_lesson' || t === 'desmos_tool' }
function isMilestoneSection(t: PathItemType) { return !isSkillSection(t) && !isDesmosSection(t) }

// ── PathItemRow ────────────────────────────────────────────────────────────────

function PathItemRow({
  item,
  attemptMap,
  onAction,
}: {
  item: PathItem
  attemptMap: Record<string, MathAttemptData>
  onAction?: () => void
}) {
  const isLocked = item.status === 'locked' || item.status === 'coming_soon'

  if (item.type === 'skill') {
    return (
      <div className={cn(
        'flex items-center gap-3 flex-wrap rounded-lg border px-4 py-3',
        item.premiumLocked ? 'border-slate-100 bg-slate-50' : 'border-slate-200 bg-white',
      )}>
        <span className="text-xs font-bold text-slate-300 w-5 shrink-0 text-right">{item.rowNum}</span>
        <div className="flex-1 min-w-[8rem]">
          <p className={cn('text-sm font-semibold truncate', item.premiumLocked ? 'text-slate-500' : 'text-slate-900')}>{item.title}</p>
          {item.premiumLocked ? (
            <p className="text-[11px] text-slate-400 mt-0.5">Not Assessed</p>
          ) : item.assessed === false ? (
            <p className="text-[11px] text-slate-400 mt-0.5">Not assessed yet</p>
          ) : item.diagnosticPct !== null && item.diagnosticPct !== undefined ? (
            <p className="text-[11px] text-slate-400 mt-0.5">Diagnostic: {item.diagnosticPct}% ({item.diagnosticScore})</p>
          ) : null}
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
        {item.premiumLocked ? (
          <Link href="/billing" className="shrink-0 text-xs font-semibold text-amber-600 hover:text-amber-800 whitespace-nowrap">
            {item.actionLabel} →
          </Link>
        ) : (
          <Link href={item.actionHref} className="shrink-0 text-xs font-semibold text-sky-600 hover:text-sky-800 whitespace-nowrap">
            {item.actionLabel} →
          </Link>
        )}
      </div>
    )
  }

  if (item.type === 'desmos_lesson') {
    return (
      <div className={cn(
        'flex items-center gap-3 flex-wrap rounded-lg border px-4 py-3',
        item.premiumLocked ? 'border-slate-100 bg-slate-50' : 'border-violet-100 bg-violet-50/30',
      )}>
        <span className={cn('text-xs font-bold w-5 shrink-0 text-right', item.premiumLocked ? 'text-slate-300' : 'text-violet-300')}>{item.rowNum}</span>
        <div className="flex-1 min-w-[8rem]">
          <p className={cn('text-sm font-semibold truncate', item.premiumLocked ? 'text-slate-500' : 'text-slate-800')}>{item.title}</p>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className={cn('text-[11px] font-semibold px-2 py-0.5 rounded-full border', item.statusBadgeClass)}>
            {item.statusLabel}
          </span>
          <span className={cn('text-[11px] font-medium px-2 py-0.5 rounded-full border', item.categoryBadgeClass)}>
            {item.category}
          </span>
        </div>
        {item.premiumLocked ? (
          <Link href="/billing" className="shrink-0 text-xs font-semibold text-amber-600 hover:text-amber-800 whitespace-nowrap">
            {item.actionLabel} →
          </Link>
        ) : (
          <Link href={item.actionHref} className="shrink-0 text-xs font-semibold text-violet-600 hover:text-violet-800 whitespace-nowrap">
            {item.actionLabel} →
          </Link>
        )}
      </div>
    )
  }

  if (item.type === 'desmos_tool') {
    return (
      <div className={cn(
        'rounded-lg border px-4 py-3',
        item.premiumLocked ? 'border-slate-100 bg-slate-50' : 'border-violet-200 bg-violet-50/50',
      )}>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex-1 min-w-[8rem]">
            <p className={cn('text-sm font-semibold', item.premiumLocked ? 'text-slate-500' : 'text-violet-900')}>{item.title}</p>
            <p className={cn('text-[12px] mt-0.5 leading-snug', item.premiumLocked ? 'text-slate-400' : 'text-violet-700')}>{item.description}</p>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <span className={cn('text-[11px] font-semibold px-2 py-0.5 rounded-full border', item.statusBadgeClass)}>
              {item.statusLabel}
            </span>
            <span className={cn('text-[11px] font-medium px-2 py-0.5 rounded-full border', item.categoryBadgeClass)}>
              {item.category}
            </span>
          </div>
          {item.premiumLocked ? (
            <Link href="/billing" className="shrink-0 text-xs font-semibold text-amber-600 hover:text-amber-800 whitespace-nowrap">
              {item.actionLabel} →
            </Link>
          ) : (
            <Link href={item.actionHref} className="shrink-0 text-xs font-semibold text-violet-600 hover:text-violet-800 whitespace-nowrap">
              {item.actionLabel} →
            </Link>
          )}
        </div>
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

  const showWeakSkills =
    item.type === 'capstone_review' &&
    item.status !== 'locked' &&
    (item.weakestSlugs?.length ?? 0) > 0

  return (
    <div className={cn('rounded-lg border px-4 py-3', borderClass)}>
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex-1 min-w-[8rem]">
          <p className={cn('text-sm font-semibold', isLocked ? 'text-slate-400' : 'text-slate-900')}>{item.title}</p>
          <p className={cn('text-[12px] mt-0.5 leading-snug', isLocked ? 'text-slate-400' : 'text-slate-500')}>{item.description}</p>
          {item.details && <p className="text-[11px] text-slate-400 mt-0.5">{item.details}</p>}
          {item.accuracy !== null && item.accuracy !== undefined && (
            <p className="text-[11px] text-emerald-600 mt-0.5">Score: {item.correctCount}/{item.totalCount} ({item.accuracy}%)</p>
          )}
          {item.lockReason && isLocked && <p className="text-[11px] text-slate-400 mt-1 italic">{item.lockReason}</p>}
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className={cn('text-[11px] font-semibold px-2 py-0.5 rounded-full border', item.statusBadgeClass)}>
            {item.statusLabel}
          </span>
          <span className={cn('text-[11px] font-medium px-2 py-0.5 rounded-full border', item.categoryBadgeClass)}>
            {item.category}
          </span>
        </div>
        {item.premiumLocked ? (
          <Link href="/billing" className="shrink-0 text-xs font-semibold text-amber-600 hover:text-amber-800 whitespace-nowrap">
            {item.actionLabel} →
          </Link>
        ) : item.actionEnabled ? (
          onAction ? (
            <button onClick={onAction} className="shrink-0 text-xs font-semibold text-sky-600 hover:text-sky-800 whitespace-nowrap">
              {item.actionLabel} →
            </button>
          ) : (
            <Link href={item.actionHref} className="shrink-0 text-xs font-semibold text-sky-600 hover:text-sky-800 whitespace-nowrap">
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
            const adequate = (attemptMap[slug]?.recentAccuracy ?? 0) >= 60
            const name = MATH_SKILL_DISPLAY_NAMES[slug as MathSkillSlug] ?? slug
            return (
              <div key={slug} className="flex items-center gap-2">
                {adequate
                  ? <span className="text-[11px] text-slate-400 line-through flex-1">{name}</span>
                  : <span className="text-[11px] text-amber-700 flex-1">{name}</span>
                }
                {adequate
                  ? <span className="text-[11px] text-emerald-600 shrink-0">Improved</span>
                  : <Link href={`/sat-math-academy/lesson/${slug}`} className="text-[11px] font-semibold text-sky-600 hover:text-sky-800 shrink-0">Review →</Link>
                }
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

// ── StatBox ────────────────────────────────────────────────────────────────────

function StatBox({ value, label, color = 'slate' }: { value: number; label: string; color?: 'slate' | 'emerald' | 'blue' }) {
  return (
    <div className="text-center">
      <p className={cn('text-2xl font-bold', color === 'emerald' ? 'text-emerald-600' : color === 'blue' ? 'text-sky-600' : 'text-slate-900')}>{value}</p>
      <p className="text-xs text-slate-500 mt-0.5">{label}</p>
    </div>
  )
}

// ── PremiumNotice ──────────────────────────────────────────────────────────────

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
          <h2 className="text-sm font-bold text-amber-900">Unlock the Complete SAT Math &amp; Desmos Academy</h2>
          <p className="text-xs text-amber-800 mt-1 leading-relaxed">
            SAT Premium includes every academy lesson, the Math Diagnostic, targeted drills, Desmos training, capstones, and a personalized learning path.
          </p>
        </div>
        <Link href="/billing" className="shrink-0 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold px-4 py-2 transition-colors whitespace-nowrap">
          Get SAT Premium
        </Link>
      </div>
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function MathAcademyHome({ isPremium }: { isPremium: boolean }) {
  const [diagnostic, setDiagnostic] = useState<MathDiagnosticResult | null>(null)
  const [lessons, setLessons] = useState<MathLessonProgress[]>([])
  const [attemptMap, setAttemptMap] = useState<Record<string, MathAttemptData>>({})
  const [capstonesData, setCapstonesData] = useState<MathCapstonesData | null>(null)
  const [satFormsData, setSatFormsData] = useState<SATFormsData | null>(null)
  const [showSATSelector, setShowSATSelector] = useState(false)
  const [loading, setLoading] = useState(isPremium)
  const [hasSavedProgress, setHasSavedProgress] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(MATH_DIAGNOSTIC_STORAGE_KEY)
      if (raw) {
        const p = JSON.parse(raw) as { savedAt: number }
        if (Date.now() - p.savedAt <= 48 * 60 * 60 * 1000) setHasSavedProgress(true)
      }
    } catch { /* ignore */ }

    if (!isPremium) { setLoading(false); return }

    Promise.all([
      fetch('/api/academy/math-diagnostic').then(r => r.ok ? r.json() : null) as Promise<MathDiagnosticResult | null>,
      fetch('/api/academy/math-lesson-progress').then(r => r.ok ? r.json() : []) as Promise<MathLessonProgress[]>,
      fetch('/api/academy/math-attempts').then(r => r.ok ? r.json() : []) as Promise<MathAttemptData[]>,
      fetch('/api/academy/math-capstones').then(r => r.ok ? r.json() : null) as Promise<MathCapstonesData | null>,
      fetch('/api/academy/sat-forms').then(r => r.ok ? r.json() : null) as Promise<SATFormsData | null>,
    ])
      .then(([diag, lessonArr, attemptsArr, capstones, satForms]) => {
        setDiagnostic(diag)
        setLessons(lessonArr)
        const map: Record<string, MathAttemptData> = {}
        if (Array.isArray(attemptsArr)) { for (const a of attemptsArr) map[a.skillSlug] = a }
        setAttemptMap(map)
        setCapstonesData(capstones)
        setSatFormsData(satForms)
      })
      .catch(() => { /* non-blocking */ })
      .finally(() => setLoading(false))
  }, [isPremium])

  // Derived metrics
  const completedLessonsSet = new Set(lessons.filter(l => l.status === 'completed').map(l => l.skill_slug))
  const lessonsCompleted = completedLessonsSet.size
  const totalStarted = ALL_MATH_SLUGS.filter(s => completedLessonsSet.has(s) || (attemptMap[s]?.attemptCount ?? 0) > 0).length
  const totalImproving = ALL_MATH_SLUGS.filter(s => {
    const acc = attemptMap[s]?.recentAccuracy ?? 0; return completedLessonsSet.has(s) && acc >= 60 && acc < 80
  }).length
  const totalProficient = ALL_MATH_SLUGS.filter(s => completedLessonsSet.has(s) && (attemptMap[s]?.recentAccuracy ?? 0) >= 80).length

  const nextStep = isPremium && !loading
    ? computeNextStep(diagnostic, lessons, capstonesData, attemptMap, satFormsData)
    : null

  // Path renders as soon as loading completes — before or after diagnostic.
  // For free users every item is remapped to a locked premium-preview state.
  const pathItemsRaw = !loading
    ? buildPathItems(diagnostic, lessons, capstonesData, attemptMap, satFormsData, nextStep)
    : null

  const pathItems = pathItemsRaw
    ? (!isPremium
      ? pathItemsRaw.map(item => ({
          ...item,
          status: 'locked' as const,
          statusLabel: 'SAT Premium Required',
          statusBadgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
          actionLabel: 'Get SAT Premium',
          actionHref: '/billing',
          actionEnabled: true,
          premiumLocked: true as const,
          lockReason: undefined,
        }))
      : pathItemsRaw)
    : null

  const isDiagnosticDone = diagnostic !== null

  return (
    <div className="space-y-8 max-w-3xl">

      {/* Premium notice */}
      {!isPremium && <PremiumNotice />}

      {/* Course banner */}
      <div className="rounded-xl border border-indigo-200 bg-gradient-to-br from-indigo-50 to-white p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} className="h-7 w-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.652 4.5 4.756V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.756c0-1.104-.807-2.057-1.907-2.184A48.507 48.507 0 0012 2.25z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-indigo-900">SAT Math &amp; Desmos Academy</h1>
            <p className="text-sm text-indigo-700 mt-0.5">
              A structured curriculum covering all 21 SAT Math skills across four domains, with integrated Desmos graphing calculator training.
            </p>
          </div>
        </div>
      </div>

      {/* ── Progress card ─────────────────────────────────────────────── */}
      {!loading && (
        <div className="grid gap-6 lg:grid-cols-5">
          {isDiagnosticDone ? (
            // Post-diagnostic: personalized header + progress card
            <>
              <div className="lg:col-span-3 space-y-2">
                <h2 className="text-lg font-bold text-slate-900">Your Personalized Math Academy</h2>
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
                  <div className="rounded-lg bg-indigo-50 border border-indigo-200 px-3 py-3 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold text-indigo-800">Diagnostic: Completed</p>
                      <Link href="/sat-math-academy/diagnostic" className="text-[11px] text-indigo-600 hover:underline">View results</Link>
                    </div>
                    <p className="text-xs text-indigo-700">
                      Score: <strong>{diagnostic.correct_count}/{diagnostic.total_questions}</strong>
                      {' · '}Accuracy: <strong>{Math.round(diagnostic.accuracy_percentage)}%</strong>
                    </p>
                    {diagnostic.recommended_skill_slug && (
                      <p className="text-[11px] text-indigo-700">
                        Priority skill: {MATH_SKILL_DISPLAY_NAMES[diagnostic.recommended_skill_slug as MathSkillSlug] ?? diagnostic.recommended_skill_slug}
                      </p>
                    )}
                  </div>

                  {totalStarted > 0 && (
                    <>
                      <div className="grid grid-cols-3 gap-3">
                        <StatBox value={totalStarted} label="started" />
                        <StatBox value={totalImproving} label="improving" color="blue" />
                        <StatBox value={totalProficient} label="proficient" color="emerald" />
                      </div>
                      <div>
                        <div className="w-full bg-slate-100 rounded-full h-1.5 mb-1">
                          <div className="bg-indigo-500 h-1.5 rounded-full transition-all" style={{ width: `${Math.round((totalProficient / TOTAL_SKILLS) * 100)}%` }} />
                        </div>
                        <p className="text-[11px] text-slate-400 text-right">{totalProficient}/{TOTAL_SKILLS} proficient</p>
                      </div>
                    </>
                  )}

                  {nextStep && nextStep.type !== 'diagnostic' && (
                    nextStep.type === 'sat-full-exam' ? (
                      <button onClick={() => setShowSATSelector(true)} className="block w-full rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold text-center px-4 py-2.5 transition-colors">
                        {nextStep.label}
                      </button>
                    ) : (
                      <Link href={nextStep.href} className="block w-full rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold text-center px-4 py-2.5 transition-colors">
                        {nextStep.label}
                      </Link>
                    )
                  )}
                </div>
              </div>
            </>
          ) : (
            // Pre-diagnostic: compact info + diagnostic CTA card
            <>
              <div className="lg:col-span-3 space-y-2">
                <h2 className="text-lg font-bold text-slate-900">Welcome to the SAT Math &amp; Desmos Academy</h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  This academy covers all 21 SAT Math skills across four domains — with integrated Desmos training, timed capstones, and a final mastery check.
                  Open any lesson or tool from the sidebar at any time.
                </p>
                {lessonsCompleted > 0 && (
                  <p className="text-xs text-slate-500">{lessonsCompleted} lesson{lessonsCompleted !== 1 ? 's' : ''} completed</p>
                )}
              </div>

              <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">Your Academy Progress</p>
                <div className="space-y-3">
                  <div className="rounded-lg bg-slate-50 border border-slate-200 px-3 py-3">
                    <p className="text-xs font-semibold text-slate-600">Diagnostic: Not Completed</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Learning Path: Default Order</p>
                  </div>
                  {lessonsCompleted > 0 && (
                    <div className="grid grid-cols-2 gap-3">
                      <StatBox value={lessonsCompleted} label="lessons done" />
                      <StatBox value={totalStarted} label="skills started" />
                    </div>
                  )}
                  {isPremium ? (
                    <Link
                      href="/sat-math-academy/diagnostic"
                      className="block w-full rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold text-center px-4 py-2.5 transition-colors"
                    >
                      {hasSavedProgress ? 'Resume Diagnostic →' : 'Start Math Diagnostic →'}
                    </Link>
                  ) : (
                    <Link
                      href="/billing"
                      className="block w-full rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold text-center px-4 py-2.5 transition-colors"
                    >
                      Get SAT Premium →
                    </Link>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {loading && (
        <div className="space-y-2">
          <div className="h-4 w-3/4 animate-pulse rounded bg-slate-100" />
          <div className="h-4 w-1/2 animate-pulse rounded bg-slate-100" />
        </div>
      )}

      {/* ── Recommended Next Step ──────────────────────────────────────── */}
      {!loading && isPremium && nextStep && (
        <div className="rounded-xl border border-sky-200 bg-sky-50 p-5">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-sky-500 mb-1">Recommended Next Step</p>
              <p className="font-semibold text-sky-900 text-sm">{nextStep.label}</p>
              <p className="text-xs text-sky-700 mt-1 leading-relaxed">{nextStep.reason}</p>
            </div>
            {nextStep.type === 'sat-full-exam' ? (
              <button onClick={() => setShowSATSelector(true)} className="shrink-0 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold px-4 py-2.5 transition-colors whitespace-nowrap">
                {nextStep.label}
              </button>
            ) : (
              <Link href={nextStep.href} className="shrink-0 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold px-4 py-2.5 transition-colors whitespace-nowrap">
                {nextStep.label}
              </Link>
            )}
          </div>
          {isDiagnosticDone && (
            <p className="mt-3 pt-3 border-t border-sky-200">
              <Link href="/sat-math-academy/diagnostic" className="text-[11px] text-sky-600 hover:underline">View Diagnostic Results →</Link>
            </p>
          )}
        </div>
      )}

      {/* ── Free-user: Recommended Next Step (locked) ─────────────────── */}
      {!loading && !isPremium && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-amber-600 mb-1">Recommended Next Step</p>
              <p className="font-semibold text-amber-900 text-sm">Unlock the Math Diagnostic</p>
              <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                Complete the diagnostic to personalize all 21 Math and Desmos lessons around your weakest skills and receive a recommended learning order.
              </p>
            </div>
            <Link
              href="/billing"
              className="shrink-0 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold px-4 py-2.5 transition-colors whitespace-nowrap"
            >
              Get SAT Premium
            </Link>
          </div>
        </div>
      )}

      {/* ── Pre-diagnostic personalization callout ─────────────────────── */}
      {!loading && !isDiagnosticDone && isPremium && (
        <div className="rounded-xl border border-indigo-200 bg-indigo-50/50 px-5 py-4">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-indigo-900">Take the Diagnostic to Personalize Your Path</p>
              <p className="text-xs text-indigo-700 mt-1 leading-relaxed">
                The course is shown below in its recommended default order. Complete the Math Diagnostic first to reorder the lessons around your weakest skills and receive personalized recommendations.
              </p>
            </div>
            <Link
              href="/sat-math-academy/diagnostic"
              className="shrink-0 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-2.5 transition-colors whitespace-nowrap"
            >
              {hasSavedProgress ? 'Resume Diagnostic →' : 'Start Math Diagnostic →'}
            </Link>
          </div>
        </div>
      )}

      {/* ── Unified Learning Path ──────────────────────────────────────── */}
      {pathItems && pathItems.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
              {isDiagnosticDone ? 'Your Personalized Math Learning Path' : 'Your Math Academy Learning Path'}
            </h2>
            {!isDiagnosticDone && (
              <span className="rounded-full border border-indigo-200 bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold text-indigo-600">
                Default Order
              </span>
            )}
          </div>
          {!isDiagnosticDone && (
            <p className="text-xs text-slate-500 mb-3">
              This sequence follows the recommended curriculum order. Complete the diagnostic to personalize the order based on your current performance.
            </p>
          )}

          <div className="space-y-2">
            {pathItems.map((item, i) => {
              const prevType = i > 0 ? pathItems[i - 1].type : null

              return (
                <Fragment key={item.id}>
                  {/* Core Math Skills divider — before the very first item */}
                  {i === 0 && isSkillSection(item.type) && (
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-px flex-1 bg-slate-100" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 whitespace-nowrap">
                        Core Math Skills
                      </span>
                      <div className="h-px flex-1 bg-slate-100" />
                    </div>
                  )}

                  {/* Desmos Mastery divider — before first desmos_lesson */}
                  {isDesmosSection(item.type) && prevType !== null && isSkillSection(prevType) && (
                    <div className="pt-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="h-px flex-1 bg-violet-100" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-violet-500 whitespace-nowrap">
                          Desmos Mastery
                        </span>
                        <div className="h-px flex-1 bg-violet-100" />
                      </div>
                      <p className="text-xs text-slate-500 mb-3">
                        Learn when the SAT graphing calculator is useful, how to use it efficiently, and when a traditional solution is faster.
                      </p>
                    </div>
                  )}

                  {/* Apply Everything divider — before first capstone */}
                  {isMilestoneSection(item.type) && prevType !== null && !isMilestoneSection(prevType) && (
                    <div className="pt-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="h-px flex-1 bg-slate-200" />
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 whitespace-nowrap">
                          Apply Everything You Learned
                        </span>
                        <div className="h-px flex-1 bg-slate-200" />
                      </div>
                      <p className="text-xs text-slate-500 mb-3">
                        Complete three full Math Academy Capstones, review your remaining weaknesses, and finish with the Final Mastery Check before taking a full-length SAT exam.
                      </p>
                    </div>
                  )}

                  <PathItemRow
                    item={item}
                    attemptMap={attemptMap}
                    onAction={item.isModal ? () => setShowSATSelector(true) : undefined}
                  />
                </Fragment>
              )
            })}
          </div>

          <p className="text-[11px] text-slate-400 mt-3">
            {isDiagnosticDone
              ? 'Skill rows ranked by diagnostic performance · weakest first · Desmos and milestone items always visible'
              : 'Default curriculum order · Complete the Math Diagnostic to personalize'}
          </p>
        </div>
      )}

      {/* Disclaimer */}
      <p className="text-xs text-slate-400 leading-relaxed">
        All MockMate Academy content is independently created for practice purposes. MockMate is not affiliated with, endorsed by, or sponsored by College Board. SAT® is a trademark of College Board, which is not affiliated with and does not endorse MockMate.
      </p>

      {/* SAT Form Selector Modal */}
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
