'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { loadAttempt } from '@/lib/premade-exams/sat/attempt-store'
import { loadAllQBResults } from '@/lib/question-bank/sat/question-selector'
import { buildPersonalizedSets, type PersonalizedSetCard } from '@/lib/question-bank/sat/personalized-sets'
import type { PremadeAttempt } from '@/lib/premade-exams/sat/attempt-store'
import type { QBPracticeSetResult } from '@/lib/question-bank/types'

const DIFFICULTY_LABEL: Record<string, string> = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
}

const SECTION_COLOR: Record<string, string> = {
  'reading-writing': 'text-violet-700 bg-violet-50 border-violet-200',
  'math': 'text-blue-700 bg-blue-50 border-blue-200',
}

function AccuracyRing({ pct }: { pct: number }) {
  const r = 22
  const circ = 2 * Math.PI * r
  const dash = (pct / 100) * circ
  const color = pct >= 80 ? '#10b981' : pct >= 60 ? '#f59e0b' : '#ef4444'
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" className="shrink-0">
      <circle cx="28" cy="28" r={r} fill="none" stroke="#e2e8f0" strokeWidth="5" />
      <circle
        cx="28" cy="28" r={r}
        fill="none"
        stroke={color}
        strokeWidth="5"
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
        transform="rotate(-90 28 28)"
      />
      <text x="28" y="32" textAnchor="middle" fontSize="12" fontWeight="700" fill={color}>{pct}%</text>
    </svg>
  )
}

function SetCard({
  card,
  completedResult,
  onBegin,
}: {
  card: PersonalizedSetCard
  completedResult: QBPracticeSetResult | undefined
  onBegin: (url: string) => void
}) {
  const isCompleted = !!completedResult

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col gap-4">
      <div className="flex items-start gap-4">
        <AccuracyRing pct={card.accuracyPct} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className={cn(
              'text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border',
              SECTION_COLOR[card.section]
            )}>
              {card.sectionLabel}
            </span>
            {isCompleted && (
              <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border text-emerald-700 bg-emerald-50 border-emerald-200">
                Completed
              </span>
            )}
          </div>
          <h3 className="text-[15px] font-bold text-slate-900">{card.domain}</h3>
          <p className="text-[12px] text-slate-500 mt-0.5">Focus: {card.weakestSkill}</p>
        </div>
      </div>

      <p className="text-[12px] text-slate-600 leading-relaxed">{card.focusDescription}</p>

      <div className="flex items-center gap-3 flex-wrap text-[11px] text-slate-500">
        <span className="flex items-center gap-1">
          <svg fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={1.5} className="h-3.5 w-3.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 2.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 5.5v3l1.5 1.5" />
          </svg>
          {card.count} questions
        </span>
        <span className="flex items-center gap-1">
          <svg fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={1.5} className="h-3.5 w-3.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2 8h12M8 2v12" />
          </svg>
          {card.difficulties.map(d => DIFFICULTY_LABEL[d]).join(' · ')}
        </span>
        {isCompleted && completedResult && (
          <span className="text-emerald-600 font-medium">
            {completedResult.questionIds.filter(id =>
              completedResult.answers[id] !== undefined
            ).length}/{completedResult.questionIds.length} answered last time
          </span>
        )}
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onBegin(card.practiceUrl)}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-[13px] py-2.5 rounded-lg transition-colors"
        >
          {isCompleted ? 'Retake' : 'Begin'}
        </button>
        {isCompleted && (
          <Link
            href={`/question-bank/sat/results?setId=${completedResult!.id}`}
            className="flex-1 text-center border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-[13px] py-2.5 rounded-lg transition-colors"
          >
            Review results
          </Link>
        )}
      </div>
    </div>
  )
}

export default function PersonalizedPracticePage() {
  const { attemptId } = useParams<{ attemptId: string }>()
  const router = useRouter()
  const [attempt, setAttempt] = useState<PremadeAttempt | null>(null)
  const [cards, setCards] = useState<PersonalizedSetCard[]>([])
  const [completedResults, setCompletedResults] = useState<QBPracticeSetResult[]>([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    const a = loadAttempt(attemptId)
    if (!a) {
      setNotFound(true)
      setLoading(false)
      return
    }
    setAttempt(a)
    setCards(buildPersonalizedSets(a))
    const results = loadAllQBResults().filter(
      r => r.config.sourceAttemptId === attemptId && r.config.mode === 'personalized'
    )
    setCompletedResults(results)
    setLoading(false)
  }, [attemptId])

  function findCompleted(card: PersonalizedSetCard): QBPracticeSetResult | undefined {
    return completedResults.find(r => r.config.domains?.includes(card.domain))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="flex items-center gap-3 text-sm text-slate-500">
          <svg className="animate-spin h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Building your practice sets…
        </div>
      </div>
    )
  }

  if (notFound || !attempt) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 text-center">
        <p className="text-slate-500 mb-4">This attempt could not be found.</p>
        <Link href="/question-bank/sat" className="text-indigo-600 hover:underline text-[13px]">
          Back to SAT Question Bank
        </Link>
      </div>
    )
  }

  const attemptDate = new Date(attempt.completedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 space-y-6">
      {/* Breadcrumb */}
      <div>
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-3">
          <Link href="/question-bank" className="hover:text-slate-600 transition-colors">Question Bank</Link>
          <span>›</span>
          <Link href="/question-bank/sat" className="hover:text-slate-600 transition-colors">SAT</Link>
          <span>›</span>
          <span className="text-slate-600 font-medium">Personalized Practice</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Personalized Practice Path</h1>
        <p className="text-slate-500 text-[13px] mt-1">
          Based on your {attempt.examTitle} — {attemptDate} · {attempt.totalScore} composite
        </p>
      </div>

      {/* Score summary strip */}
      <div className="bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-100 rounded-xl p-4 flex items-center gap-6 flex-wrap">
        <div className="text-center">
          <p className="text-[26px] font-bold text-indigo-700">{attempt.totalScore}</p>
          <p className="text-[10px] text-indigo-400 uppercase tracking-widest">Total</p>
        </div>
        <div className="h-8 w-px bg-indigo-200" />
        <div className="text-center">
          <p className="text-[20px] font-bold text-violet-700">{attempt.rwScaled}</p>
          <p className="text-[10px] text-violet-400 uppercase tracking-widest">R&amp;W</p>
        </div>
        <div className="text-center">
          <p className="text-[20px] font-bold text-blue-700">{attempt.mathScaled}</p>
          <p className="text-[10px] text-blue-400 uppercase tracking-widest">Math</p>
        </div>
        <div className="flex-1" />
        <Link
          href={`/premade/sat/form-1/results/${attempt.id}`}
          className="text-[12px] font-medium text-indigo-600 hover:underline whitespace-nowrap"
        >
          View full results →
        </Link>
      </div>

      {/* Instructions */}
      <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex items-start gap-3">
        <svg fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth={1.5} className="h-4 w-4 text-amber-600 mt-0.5 shrink-0">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
        <p className="text-[12px] text-amber-800 leading-relaxed">
          These 4 practice sets target your weakest domains from that exam. Each set is seeded from the Question Bank — questions you have already seen are deprioritized so you always get fresh practice.
        </p>
      </div>

      {/* Practice set cards */}
      <div className="grid gap-4">
        {cards.map(card => (
          <SetCard
            key={card.key}
            card={card}
            completedResult={findCompleted(card)}
            onBegin={url => router.push(url)}
          />
        ))}
      </div>

      {/* Back link */}
      <div className="pt-2">
        <Link href="/question-bank/sat" className="text-[13px] text-slate-400 hover:text-slate-600 transition-colors">
          ← Back to SAT Question Bank
        </Link>
      </div>
    </div>
  )
}
