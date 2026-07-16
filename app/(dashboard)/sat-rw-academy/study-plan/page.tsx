'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { generateStudyPlan, DEFAULT_SKILL_ORDER } from '@/lib/academy/study-plan'
import type { StudyDay } from '@/lib/academy/study-plan'
import type { SkillMastery } from '@/lib/academy/mastery'

const SKILL_TITLES: Record<string, string> = {
  'words-in-context': 'Words in Context',
  'central-ideas-details': 'Central Ideas and Details',
  'text-structure-purpose': 'Text Structure and Purpose',
  'command-of-evidence': 'Command of Evidence',
  'quantitative-evidence': 'Quantitative Evidence',
  'inferences': 'Inferences',
  'boundaries': 'Boundaries',
  'form-structure-sense': 'Form, Structure & Sense',
  'transitions': 'Transitions',
  'rhetorical-synthesis': 'Rhetorical Synthesis',
}

const PRIORITY_DOT: Record<string, string> = {
  high: 'bg-red-400',
  medium: 'bg-amber-400',
  low: 'bg-emerald-400',
}

const TASK_TYPE_LABEL: Record<string, string> = {
  lesson: 'Lesson',
  drill: 'Drill',
  review: 'Review',
}

const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const DAY_NAMES = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

function formatDate(d: Date) {
  return `${MONTH_NAMES[d.getMonth()]} ${d.getDate()}`
}

function defaultPlanDays(startDate: Date): StudyDay[] {
  const isWeekend = (d: Date) => d.getDay() === 0 || d.getDay() === 6
  const days: StudyDay[] = []
  let skillIdx = 0

  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + i)
    const rest = isWeekend(date)

    if (rest) {
      days.push({ day: DAY_NAMES[date.getDay()], date: formatDate(date), tasks: [], estimatedMinutes: 0, isRestDay: true })
      continue
    }

    const tasks = []
    if (skillIdx < DEFAULT_SKILL_ORDER.length) {
      const s = DEFAULT_SKILL_ORDER[skillIdx++]
      tasks.push({ type: 'lesson' as const, skillSlug: s.slug, skillTitle: s.title, label: `Lesson: ${s.title}`, estimatedMinutes: 5, priority: 'high' as const })
      tasks.push({ type: 'drill' as const, skillSlug: s.slug, skillTitle: s.title, label: `Drill: ${s.title} (10 questions)`, estimatedMinutes: 10, priority: 'high' as const })
    }
    days.push({ day: DAY_NAMES[date.getDay()], date: formatDate(date), tasks, estimatedMinutes: tasks.reduce((a, t) => a + t.estimatedMinutes, 0), isRestDay: false })
  }
  return days
}

export default function StudyPlanPage() {
  const [loading, setLoading] = useState(true)
  const [plan, setPlan] = useState<StudyDay[]>([])
  const [hasMastery, setHasMastery] = useState(false)

  const today = new Date()
  // Start plan on Monday of the current week
  const startDate = new Date(today)
  startDate.setDate(today.getDate() - ((today.getDay() + 6) % 7))
  const todayStr = formatDate(today)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/academy/attempts')
        if (!res.ok) throw new Error('failed')
        const data = await res.json() as SkillMastery[]

        if (data.length === 0) {
          setPlan(defaultPlanDays(startDate))
          setHasMastery(false)
        } else {
          setPlan(generateStudyPlan(data, startDate, SKILL_TITLES))
          setHasMastery(true)
        }
      } catch {
        setPlan(defaultPlanDays(startDate))
        setHasMastery(false)
      } finally {
        setLoading(false)
      }
    }
    void load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="space-y-6">
      
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Weekly Study Plan</h1>
        <p className="mt-1 text-sm text-slate-500">
          {hasMastery
            ? 'Automatically prioritizes skills based on your mastery level.'
            : 'Start by completing a skill drill to personalize your plan. Showing recommended starting order.'}
        </p>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-24 rounded-xl bg-slate-100 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {plan.map((day) => {
            const isToday = day.date === todayStr
            return (
              <div
                key={day.day}
                className={cn(
                  'rounded-xl border p-4',
                  day.isRestDay
                    ? 'border-slate-100 bg-slate-50'
                    : isToday
                    ? 'border-emerald-300 bg-emerald-50'
                    : 'border-slate-200 bg-white',
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <p className={cn('text-sm font-semibold', isToday ? 'text-emerald-700' : 'text-slate-900')}>
                      {day.day}
                      {isToday && <span className="ml-2 text-xs font-normal text-emerald-600">(today)</span>}
                    </p>
                    <span className="text-xs text-slate-400">{day.date}</span>
                  </div>
                  {!day.isRestDay && day.estimatedMinutes > 0 && (
                    <span className="text-xs text-slate-400">{day.estimatedMinutes} min</span>
                  )}
                </div>

                {day.isRestDay ? (
                  <p className="text-xs text-slate-400">Rest day</p>
                ) : day.tasks.length === 0 ? (
                  <p className="text-xs text-slate-400">No tasks — you&apos;re ahead of schedule!</p>
                ) : (
                  <div className="space-y-2">
                    {day.tasks.map((task, i) => (
                      <Link
                        key={i}
                        href={`/sat-rw-academy/lesson/${task.skillSlug}`}
                        className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm transition-all p-2.5"
                      >
                        <span className={cn('w-2 h-2 rounded-full shrink-0', PRIORITY_DOT[task.priority])} />
                        <span className="inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide bg-slate-100 text-slate-500 shrink-0">
                          {TASK_TYPE_LABEL[task.type]}
                        </span>
                        <span className="text-sm text-slate-700 flex-1 min-w-0 truncate">{task.skillTitle}</span>
                        <span className="text-xs text-slate-400 shrink-0">{task.estimatedMinutes} min</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-xs text-slate-500 space-y-2">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-400" />High priority</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-400" />Medium priority</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400" />Low priority</span>
        </div>
        <p>Complete a drill for any skill to update your mastery level and refresh this plan.</p>
      </div>
    </div>
  )
}
