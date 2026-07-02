'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { MCAT_QB_SECTIONS, MCAT_QB_DISCIPLINES } from '@/lib/question-bank/mcat/index'
import type { MCATQBSection, MCATQBDifficulty, MCATQBSkill } from '@/lib/question-bank/mcat/types'

const SKILLS: MCATQBSkill[] = ['Skill 1', 'Skill 2', 'Skill 3', 'Skill 4']
const SKILL_LABELS: Record<MCATQBSkill, string> = {
  'Skill 1': 'Knowledge of Science',
  'Skill 2': 'Scientific Reasoning',
  'Skill 3': 'Research Design',
  'Skill 4': 'Data Analysis',
}
const QUESTION_COUNTS = [5, 10, 15, 20]

export default function MCATQuestionBankPage() {
  const router = useRouter()
  const [section, setSection] = useState<MCATQBSection | ''>('')
  const [selectedDisciplines, setSelectedDisciplines] = useState<string[]>([])
  const [difficulties, setDifficulties] = useState<MCATQBDifficulty[]>([])
  const [skills, setSkills] = useState<MCATQBSkill[]>([])
  const [count, setCount] = useState(10)

  const disciplines = section ? MCAT_QB_DISCIPLINES[section] : []

  function toggleSection(s: MCATQBSection | '') {
    setSection(s)
    setSelectedDisciplines([])
  }

  function toggleDiscipline(d: string) {
    setSelectedDisciplines(prev =>
      prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d]
    )
  }

  function toggleDifficulty(d: MCATQBDifficulty) {
    setDifficulties(prev =>
      prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d]
    )
  }

  function toggleSkill(s: MCATQBSkill) {
    setSkills(prev =>
      prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]
    )
  }

  function handleStart() {
    const params = new URLSearchParams()
    if (section) params.set('section', section)
    if (selectedDisciplines.length) params.set('disciplines', selectedDisciplines.join(','))
    if (difficulties.length) params.set('difficulties', difficulties.join(','))
    if (skills.length) params.set('skills', skills.join(','))
    params.set('count', String(count))
    router.push(`/question-bank/mcat/practice?${params.toString()}`)
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-3">
          <Link href="/question-bank" className="hover:text-slate-600 transition-colors">Question Bank</Link>
          <span>›</span>
          <span className="text-slate-600 font-medium">MCAT</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-1">MCAT Question Bank</h1>
        <p className="text-slate-500">Practice targeted MCAT questions by section, discipline, content area, and reasoning skill.</p>
      </div>

      {/* Section overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {MCAT_QB_SECTIONS.map(sec => (
          <div key={sec.value} className="bg-white border border-slate-200 rounded-xl p-4 text-center">
            <p className="text-[22px] font-bold text-teal-600">{sec.count}</p>
            <p className="text-[11px] font-semibold text-slate-500 mt-0.5">{sec.label}</p>
          </div>
        ))}
      </div>

      {/* Filter card */}
      <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100">
        <div className="p-5">
          <h2 className="text-[15px] font-semibold text-slate-900 mb-0.5">Build a Practice Set</h2>
          <p className="text-[13px] text-slate-500">Choose your section, difficulty, and scientific skill to filter questions.</p>
        </div>

        {/* Section */}
        <div className="p-5">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Section</p>
          <div className="flex gap-2 flex-wrap">
            {(['' as const, ...MCAT_QB_SECTIONS.map(s => s.value)]).map(s => (
              <button
                key={s}
                onClick={() => toggleSection(s)}
                className={cn(
                  'px-3 py-1.5 rounded-lg border text-[13px] font-medium transition-colors',
                  section === s
                    ? 'border-teal-500 bg-teal-50 text-teal-700'
                    : 'border-slate-200 text-slate-600 hover:border-slate-300'
                )}
              >
                {s === '' ? 'All sections' : MCAT_QB_SECTIONS.find(x => x.value === s)?.label ?? s}
              </button>
            ))}
          </div>
        </div>

        {/* Discipline */}
        {disciplines.length > 0 && (
          <div className="p-5">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Discipline <span className="text-slate-300 font-normal">(optional)</span></p>
            <div className="flex gap-2 flex-wrap">
              {disciplines.map(d => (
                <button
                  key={d}
                  onClick={() => toggleDiscipline(d)}
                  className={cn(
                    'px-3 py-1.5 rounded-lg border text-[12px] font-medium transition-colors',
                    selectedDisciplines.includes(d)
                      ? 'border-teal-500 bg-teal-50 text-teal-700'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300'
                  )}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Difficulty */}
        <div className="p-5">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Difficulty <span className="text-slate-300 font-normal">(optional)</span></p>
          <div className="flex gap-2">
            {(['easy', 'medium', 'hard'] as MCATQBDifficulty[]).map(d => (
              <button
                key={d}
                onClick={() => toggleDifficulty(d)}
                className={cn(
                  'px-3 py-1.5 rounded-lg border text-[13px] font-medium transition-colors capitalize',
                  difficulties.includes(d)
                    ? d === 'easy' ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                      : d === 'medium' ? 'border-amber-500 bg-amber-50 text-amber-700'
                      : 'border-red-500 bg-red-50 text-red-700'
                    : 'border-slate-200 text-slate-600 hover:border-slate-300'
                )}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Scientific Skill */}
        <div className="p-5">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Scientific Skill <span className="text-slate-300 font-normal">(optional)</span></p>
          <div className="flex gap-2 flex-wrap">
            {SKILLS.map(s => (
              <button
                key={s}
                onClick={() => toggleSkill(s)}
                className={cn(
                  'px-3 py-1.5 rounded-lg border text-[12px] font-medium transition-colors',
                  skills.includes(s)
                    ? 'border-violet-500 bg-violet-50 text-violet-700'
                    : 'border-slate-200 text-slate-600 hover:border-slate-300'
                )}
              >
                {s}: {SKILL_LABELS[s]}
              </button>
            ))}
          </div>
        </div>

        {/* Question Count */}
        <div className="p-5">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Question Count</p>
          <div className="flex gap-2 flex-wrap">
            {QUESTION_COUNTS.map(n => (
              <button
                key={n}
                onClick={() => setCount(n)}
                className={cn(
                  'px-3 py-1.5 rounded-lg border text-[13px] font-medium transition-colors',
                  count === n
                    ? 'border-teal-500 bg-teal-50 text-teal-700'
                    : 'border-slate-200 text-slate-600 hover:border-slate-300'
                )}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Start */}
        <div className="p-5 flex items-center justify-between gap-4">
          <p className="text-[12px] text-slate-400">
            {section === '' && !difficulties.length && !skills.length
              ? 'No filters — will show questions from all MCAT sections.'
              : [
                section ? MCAT_QB_SECTIONS.find(x => x.value === section)?.label : 'All sections',
                difficulties.length ? difficulties.join('/') : null,
                skills.length ? skills.join(', ') : null,
              ].filter(Boolean).join(' · ')
            }
          </p>
          <button
            onClick={handleStart}
            className="bg-teal-600 hover:bg-teal-700 text-white font-semibold text-[13px] px-5 py-2.5 rounded-lg transition-colors whitespace-nowrap"
          >
            Start Practice Set
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="bg-teal-50 border border-teal-100 rounded-xl p-5">
        <div className="flex items-start gap-3">
          <div className="h-8 w-8 rounded-lg bg-teal-100 flex items-center justify-center shrink-0">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4 text-teal-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
          </div>
          <div>
            <p className="text-[13px] font-semibold text-teal-900 mb-0.5">MCAT-style practice questions</p>
            <p className="text-[12px] text-teal-700">
              These are original MCAT-style practice questions. MockMate is not affiliated with or endorsed by the AAMC. MCAT is a registered trademark of the AAMC.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
