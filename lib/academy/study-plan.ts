// ── Study Plan Generator ─────────────────────────────────────────────────────
// Deterministic algorithm: same inputs → same output. No external API calls.

import type { SkillMastery } from './mastery'

export interface StudyDay {
  day: string           // 'Monday', 'Tuesday', etc.
  date: string          // formatted: 'Jul 15'
  tasks: StudyTask[]
  estimatedMinutes: number
  isRestDay: boolean
}

export interface StudyTask {
  type: 'drill' | 'review' | 'lesson'
  skillSlug: string
  skillTitle: string
  label: string         // e.g., "Drill: Words in Context (10 questions)"
  estimatedMinutes: number
  priority: 'high' | 'medium' | 'low'
}

const TASK_MINUTES: Record<StudyTask['type'], number> = {
  lesson: 5,
  drill: 10,
  review: 15,
}

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function formatDate(date: Date): string {
  return `${MONTH_NAMES[date.getMonth()]} ${date.getDate()}`
}

function isWeekend(date: Date): boolean {
  const day = date.getDay()
  return day === 0 || day === 6
}

/**
 * Generates a deterministic 7-day study plan based on mastery data.
 * - Prioritizes skills with lower mastery (not_started → learning → developing → proficient)
 * - Skips mastered skills (unless all are mastered, in which case a maintenance plan is shown)
 * - Mon–Fri are study days (max 2 tasks, max 30 min/day); Sat–Sun are rest days
 */
export function generateStudyPlan(
  masteryData: SkillMastery[],
  startDate: Date,
  allSkillTitles: Record<string, string>,
): StudyDay[] {
  // Sort skills by priority
  const priorityOrder: Record<string, number> = {
    not_started: 1,
    learning: 1,
    developing: 2,
    proficient: 3,
    mastered: 4,
  }

  const sortedSkills = [...masteryData]
    .filter(s => s.status !== 'mastered')
    .sort((a, b) => priorityOrder[a.status] - priorityOrder[b.status])

  // If all mastered → maintenance plan using the two lowest-scoring mastered skills
  const allMastered = sortedSkills.length === 0
  let maintenanceSkills: SkillMastery[] = []
  if (allMastered && masteryData.length > 0) {
    maintenanceSkills = [...masteryData]
      .sort((a, b) => a.masteryScore - b.masteryScore)
      .slice(0, 2)
  }

  // Build task queue
  const taskQueue: StudyTask[] = []

  if (allMastered) {
    // Maintenance: 2 review sessions on the weakest mastered skills
    for (const skill of maintenanceSkills) {
      const title = allSkillTitles[skill.skillSlug] ?? skill.skillSlug
      taskQueue.push({
        type: 'review',
        skillSlug: skill.skillSlug,
        skillTitle: title,
        label: `Review: ${title}`,
        estimatedMinutes: TASK_MINUTES.review,
        priority: 'low',
      })
    }
  } else {
    // Assign priority labels
    const getPriority = (status: string): StudyTask['priority'] => {
      if (status === 'not_started' || status === 'learning') return 'high'
      if (status === 'developing') return 'medium'
      return 'low'
    }

    for (const skill of sortedSkills) {
      const title = allSkillTitles[skill.skillSlug] ?? skill.skillSlug
      const priority = getPriority(skill.status)

      // For not_started: start with a lesson, then a drill
      if (skill.status === 'not_started') {
        taskQueue.push({
          type: 'lesson',
          skillSlug: skill.skillSlug,
          skillTitle: title,
          label: `Lesson: ${title}`,
          estimatedMinutes: TASK_MINUTES.lesson,
          priority,
        })
        taskQueue.push({
          type: 'drill',
          skillSlug: skill.skillSlug,
          skillTitle: title,
          label: `Drill: ${title} (10 questions)`,
          estimatedMinutes: TASK_MINUTES.drill,
          priority,
        })
      } else if (skill.status === 'learning') {
        // Repeat drill to build mastery
        taskQueue.push({
          type: 'drill',
          skillSlug: skill.skillSlug,
          skillTitle: title,
          label: `Drill: ${title} (10 questions)`,
          estimatedMinutes: TASK_MINUTES.drill,
          priority,
        })
        taskQueue.push({
          type: 'review',
          skillSlug: skill.skillSlug,
          skillTitle: title,
          label: `Review: ${title}`,
          estimatedMinutes: TASK_MINUTES.review,
          priority,
        })
      } else {
        // developing / proficient
        taskQueue.push({
          type: 'drill',
          skillSlug: skill.skillSlug,
          skillTitle: title,
          label: `Drill: ${title} (10 questions)`,
          estimatedMinutes: TASK_MINUTES.drill,
          priority,
        })
      }
    }
  }

  // Distribute tasks across the 7-day window
  const days: StudyDay[] = []
  let taskIndex = 0

  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + i)

    const dayName = DAY_NAMES[date.getDay()]
    const dateStr = formatDate(date)
    const restDay = isWeekend(date)

    if (restDay) {
      days.push({
        day: dayName,
        date: dateStr,
        tasks: [],
        estimatedMinutes: 0,
        isRestDay: true,
      })
      continue
    }

    // Study day: max 2 tasks, max 30 min
    const dayTasks: StudyTask[] = []
    let dayMinutes = 0

    while (taskIndex < taskQueue.length && dayTasks.length < 2 && dayMinutes + taskQueue[taskIndex].estimatedMinutes <= 30) {
      dayTasks.push(taskQueue[taskIndex])
      dayMinutes += taskQueue[taskIndex].estimatedMinutes
      taskIndex++
    }

    days.push({
      day: dayName,
      date: dateStr,
      tasks: dayTasks,
      estimatedMinutes: dayMinutes,
      isRestDay: false,
    })
  }

  return days
}

/**
 * Generates a default study plan based on the recommended skill order,
 * used when a user has no mastery data yet.
 */
export const DEFAULT_SKILL_ORDER: { slug: string; title: string }[] = [
  { slug: 'boundaries', title: 'Boundaries' },
  { slug: 'form-structure-sense', title: 'Form, Structure & Sense' },
  { slug: 'transitions', title: 'Transitions' },
  { slug: 'rhetorical-synthesis', title: 'Rhetorical Synthesis' },
  { slug: 'words-in-context', title: 'Words in Context' },
  { slug: 'central-ideas-details', title: 'Central Ideas & Details' },
  { slug: 'text-structure-purpose', title: 'Text Structure & Purpose' },
  { slug: 'command-of-evidence', title: 'Command of Evidence' },
  { slug: 'quantitative-evidence', title: 'Quantitative Evidence' },
  { slug: 'inferences', title: 'Inferences' },
  { slug: 'cross-text-connections', title: 'Cross-Text Connections' },
]
