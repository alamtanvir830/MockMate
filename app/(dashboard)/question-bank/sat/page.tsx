'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { loadAllQBResults } from '@/lib/question-bank/sat/question-selector'
import { loadAllAttempts, type PremadeAttempt } from '@/lib/premade-exams/sat/attempt-store'
import { useEntitlements } from '@/hooks/use-entitlements'
import { UpgradeGate } from '@/components/shared/upgrade-gate'

const FREE_QB_LIMIT = 3

const RW_DOMAINS = [
  'Craft and Structure',
  'Information and Ideas',
  'Expression of Ideas',
  'Standard English Conventions',
] as const

const MATH_DOMAINS = [
  'Algebra',
  'Advanced Math',
  'Problem-Solving and Data Analysis',
  'Geometry and Trigonometry',
] as const

const RW_SKILLS: Record<string, string[]> = {
  'Craft and Structure': ['Words in Context', 'Text Structure and Purpose', 'Cross-Text Connections'],
  'Information and Ideas': ['Central Ideas and Details', 'Command of Evidence', 'Inferences'],
  'Expression of Ideas': ['Rhetorical Synthesis', 'Transitions'],
  'Standard English Conventions': ['Boundaries', 'Form, Structure, and Sense'],
}

const MATH_SKILLS: Record<string, string[]> = {
  'Algebra': ['Linear equations in one variable', 'Linear equations in two variables', 'Linear functions', 'Systems of two linear equations', 'Linear inequalities'],
  'Advanced Math': ['Equivalent expressions', 'Nonlinear equations in one variable', 'Nonlinear functions', 'Quadratic equations', 'Exponential functions', 'Rational and radical expressions'],
  'Problem-Solving and Data Analysis': ['Ratios, rates, proportional relationships', 'Percentages', 'One-variable data', 'Two-variable data', 'Probability'],
  'Geometry and Trigonometry': ['Area and volume', 'Lines, angles, and triangles', 'Right triangles and trigonometry', 'Circles'],
}

const QUESTION_COUNTS = [5, 10, 15, 20]

export default function SATQuestionBankPage() {
  const router = useRouter()
  const { satUpgradeUnlocked, loading: entitlementLoading } = useEntitlements()
  const [section, setSection] = useState<'reading-writing' | 'math' | ''>('')
  const [selectedDomains, setSelectedDomains] = useState<string[]>([])
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [difficulties, setDifficulties] = useState<string[]>([])
  const [count, setCount] = useState(10)
  const [customCount, setCustomCount] = useState('')
  const [recentSets, setRecentSets] = useState(0)
  const [browseSets, setBrowseSets] = useState(0)
  const [satAttempts, setSatAttempts] = useState<PremadeAttempt[]>([])

  useEffect(() => {
    const results = loadAllQBResults()
    setRecentSets(results.length)
    setBrowseSets(results.filter(r => r.config.mode === 'browse').length)
    const attempts = loadAllAttempts().filter(a => a.examId.startsWith('sat-'))
    setSatAttempts(attempts)
  }, [])

  const domains = section === 'reading-writing' ? RW_DOMAINS : section === 'math' ? MATH_DOMAINS : []
  const skills: Record<string, string[]> = section === 'reading-writing' ? RW_SKILLS : MATH_SKILLS

  const availableSkills = selectedDomains.flatMap(d => skills[d] ?? [])

  function toggleDomain(d: string) {
    setSelectedDomains(prev =>
      prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d]
    )
    setSelectedSkills([])
  }

  function toggleSkill(s: string) {
    setSelectedSkills(prev =>
      prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]
    )
  }

  function toggleDifficulty(d: string) {
    setDifficulties(prev =>
      prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d]
    )
  }

  function handleStart() {
    const params = new URLSearchParams()
    if (section) params.set('section', section)
    if (selectedDomains.length) params.set('domains', selectedDomains.join(','))
    if (selectedSkills.length) params.set('skills', selectedSkills.join(','))
    if (difficulties.length) params.set('difficulties', difficulties.join(','))
    const finalCount = customCount ? parseInt(customCount) : count
    params.set('count', String(Math.min(Math.max(finalCount, 3), 50)))
    params.set('mode', 'browse')
    router.push(`/question-bank/sat/practice?${params.toString()}`)
  }

  const canStart = true // allow browsing even without filters (will show all)

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-3">
          <Link href="/question-bank" className="hover:text-slate-600 transition-colors">Question Bank</Link>
          <span>›</span>
          <span className="text-slate-600 font-medium">SAT</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-1">SAT Question Bank</h1>
        <p className="text-slate-500">Practice Reading and Writing or Math questions by SAT skill.</p>
      </div>

      {/* Smart Practice Path */}
      <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-xl p-6 text-white">
        <div className="flex items-center gap-2 mb-3">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-5 w-5 text-indigo-200">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
          </svg>
          <span className="text-[11px] font-bold text-indigo-200 uppercase tracking-widest">Smart Practice Path</span>
        </div>
        <h2 className="text-lg font-bold mb-1">Personalized Practice Path</h2>

        {satAttempts.length === 0 ? (
          <>
            <p className="text-indigo-200 text-[13px] mb-4">
              Complete a full SAT practice test to automatically build 4 practice sets targeting your weakest domains.
            </p>
            <div className="text-[12px] text-indigo-300 flex items-center gap-1.5">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5 shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
              Take SAT Practice Test 1 under Pre-made Exams to unlock your personalized path.
            </div>
          </>
        ) : (
          <>
            <p className="text-indigo-200 text-[13px] mb-4">
              {satAttempts.length === 1
                ? '1 completed SAT exam found. View your personalized practice sets below.'
                : `${satAttempts.length} completed SAT exams found. Choose one to start targeted practice.`}
            </p>
            <div className="space-y-2">
              {(() => {
                const formTotals = satAttempts.reduce<Record<string, number>>((acc, a) => {
                  acc[a.examId] = (acc[a.examId] ?? 0) + 1
                  return acc
                }, {})
                const formCountSeen: Record<string, number> = {}
                return satAttempts.map((attempt) => {
                  formCountSeen[attempt.examId] = (formCountSeen[attempt.examId] ?? 0) + 1
                  const attemptNum = formTotals[attempt.examId] - formCountSeen[attempt.examId] + 1
                  const formNum =
                    attempt.examId === 'sat-form-1' ? '1' :
                    attempt.examId === 'sat-form-2' ? '2' :
                    attempt.examId === 'sat-form-3' ? '3' : ''
                  const label = formNum
                    ? `SAT Form ${formNum} Attempt ${attemptNum}`
                    : `SAT Attempt ${attemptNum}`
                  const date = new Date(attempt.completedAt).toLocaleDateString('en-US', {
                    month: 'short', day: 'numeric', year: 'numeric',
                  })
                  return (
                    <div
                      key={attempt.id}
                      className="flex items-center justify-between bg-white/10 rounded-lg px-4 py-3 gap-4"
                    >
                      <div>
                        <p className="text-[13px] font-semibold text-white">
                          {label} — {date}
                        </p>
                        <p className="text-[11px] text-indigo-200">
                          {attempt.totalScore} total · {attempt.rwScaled} R&amp;W · {attempt.mathScaled} Math
                        </p>
                      </div>
                      <Link
                        href={`/question-bank/sat/personalized/${attempt.id}`}
                        className="shrink-0 bg-white text-indigo-700 font-semibold text-[12px] px-3 py-1.5 rounded-lg hover:bg-indigo-50 transition-colors whitespace-nowrap"
                      >
                        View practice sets
                      </Link>
                    </div>
                  )
                })
              })()}
            </div>
          </>
        )}
      </div>

      {/* Browse */}
      {!entitlementLoading && !satUpgradeUnlocked && browseSets >= FREE_QB_LIMIT ? (
        <UpgradeGate
          title="Unlock 300+ Question Bank Practice Questions"
          description={`You've used your ${FREE_QB_LIMIT} free practice sets. Upgrade to access all 300+ questions.`}
          features={[
            { label: '300+ Question Bank questions', subtext: 'Extra targeted practice built from your weak areas' },
            { label: 'SAT Practice Test Form 2', subtext: 'Score feedback + personalized weak-area question sets from Q-Bank' },
            { label: 'SAT Practice Test Form 3', subtext: 'Score feedback + personalized weak-area question sets from Q-Bank' },
          ]}
          compact
        />
      ) : (
      <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100">
        <div className="p-5">
          <h2 className="text-[15px] font-semibold text-slate-900 mb-0.5">Browse Question Bank</h2>
          <p className="text-[13px] text-slate-500">Choose your own SAT section, skill, difficulty, and question count.</p>
          {!entitlementLoading && !satUpgradeUnlocked && browseSets > 0 && (
            <p className="text-[11px] text-amber-600 mt-1.5">
              {FREE_QB_LIMIT - browseSets} free {FREE_QB_LIMIT - browseSets === 1 ? 'set' : 'sets'} remaining.{' '}
              <Link href="/pricing" className="underline hover:no-underline">
                Upgrade for unlimited access.
              </Link>
            </p>
          )}
        </div>

        {/* Section */}
        <div className="p-5">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Section</p>
          <div className="flex gap-2 flex-wrap">
            {(['', 'reading-writing', 'math'] as const).map(s => (
              <button
                key={s}
                onClick={() => { setSection(s); setSelectedDomains([]); setSelectedSkills([]) }}
                className={cn(
                  'px-3 py-1.5 rounded-lg border text-[13px] font-medium transition-colors',
                  section === s
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                    : 'border-slate-200 text-slate-600 hover:border-slate-300'
                )}
              >
                {s === '' ? 'Both' : s === 'reading-writing' ? 'Reading & Writing' : 'Math'}
              </button>
            ))}
          </div>
        </div>

        {/* Domain */}
        {domains.length > 0 && (
          <div className="p-5">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Domain</p>
            <div className="flex gap-2 flex-wrap">
              {domains.map(d => (
                <button
                  key={d}
                  onClick={() => toggleDomain(d)}
                  className={cn(
                    'px-3 py-1.5 rounded-lg border text-[13px] font-medium transition-colors',
                    selectedDomains.includes(d)
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300'
                  )}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {availableSkills.length > 0 && (
          <div className="p-5">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Skill <span className="text-slate-300 font-normal">(optional)</span></p>
            <div className="flex gap-2 flex-wrap">
              {availableSkills.map(s => (
                <button
                  key={s}
                  onClick={() => toggleSkill(s)}
                  className={cn(
                    'px-3 py-1.5 rounded-lg border text-[12px] font-medium transition-colors',
                    selectedSkills.includes(s)
                      ? 'border-violet-500 bg-violet-50 text-violet-700'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300'
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Difficulty */}
        <div className="p-5">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Difficulty <span className="text-slate-300 font-normal">(optional)</span></p>
          <div className="flex gap-2">
            {(['easy', 'medium', 'hard'] as const).map(d => (
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

        {/* Count */}
        <div className="p-5">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Question Count</p>
          <div className="flex gap-2 flex-wrap items-center">
            {QUESTION_COUNTS.map(n => (
              <button
                key={n}
                onClick={() => { setCount(n); setCustomCount('') }}
                className={cn(
                  'px-3 py-1.5 rounded-lg border text-[13px] font-medium transition-colors',
                  count === n && !customCount
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                    : 'border-slate-200 text-slate-600 hover:border-slate-300'
                )}
              >
                {n}
              </button>
            ))}
            <div className="flex items-center gap-1.5">
              <span className="text-[12px] text-slate-400">Custom:</span>
              <input
                type="number"
                min={3}
                max={50}
                value={customCount}
                onChange={e => setCustomCount(e.target.value)}
                placeholder="e.g. 25"
                className="w-20 border border-slate-200 rounded-lg px-2 py-1.5 text-[13px] text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </div>
          </div>
        </div>

        {/* Start */}
        <div className="p-5 flex items-center justify-between gap-4">
          <p className="text-[12px] text-slate-400">
            {selectedDomains.length === 0 && section === ''
              ? 'No filters — will show questions from all SAT skills.'
              : `${section === 'reading-writing' ? 'Reading & Writing' : section === 'math' ? 'Math' : 'All'}${selectedDomains.length ? ` · ${selectedDomains.join(', ')}` : ''}${difficulties.length ? ` · ${difficulties.join('/')}` : ''}`}
          </p>
          <button
            onClick={handleStart}
            disabled={!canStart}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold text-[13px] px-5 py-2.5 rounded-lg transition-colors whitespace-nowrap"
          >
            Start Practice Set
          </button>
        </div>
      </div>
      )}

      {/* Recent results */}
      {recentSets > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[13px] font-semibold text-slate-700">Practice History</p>
              <p className="text-[12px] text-slate-400">You have completed {recentSets} practice {recentSets === 1 ? 'set' : 'sets'}.</p>
            </div>
            <Link
              href="/question-bank/sat/history"
              className="text-[12px] font-medium text-indigo-600 hover:underline"
            >
              View history →
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
