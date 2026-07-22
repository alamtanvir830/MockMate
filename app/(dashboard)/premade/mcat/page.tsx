'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ExamHistoryNotice } from '@/components/premade/ExamHistoryNotice'

const PASSWORD = 'downstate123'
const SESSION_KEY = 'mcat_unlocked'

export default function MCATPage() {
  const [unlocked, setUnlocked] = useState(false)
  const [input, setInput] = useState('')
  const [error, setError] = useState('')
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === '1') setUnlocked(true)
    setChecking(false)
  }, [])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (input === PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, '1')
      setUnlocked(true)
    } else {
      setError('Incorrect password. Please try again.')
      setInput('')
    }
  }

  if (checking) return null

  if (!unlocked) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <div className="w-full max-w-sm bg-white rounded-xl border border-slate-200 shadow-sm p-8">
          <div className="h-12 w-12 rounded-full bg-indigo-50 flex items-center justify-center mx-auto mb-5">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="h-6 w-6 text-indigo-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-slate-900 text-center mb-1">MCAT Practice Exams</h1>
          <p className="text-sm text-slate-500 text-center mb-6">Enter the access password to continue.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              value={input}
              onChange={e => { setInput(e.target.value); setError('') }}
              placeholder="Password"
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              autoFocus
            />
            {error && <p className="text-xs text-red-600">{error}</p>}
            <button
              type="submit"
              className="w-full rounded-lg bg-indigo-600 text-white text-sm font-medium py-2.5 hover:bg-indigo-700 transition-colors"
            >
              Unlock
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link href="/premade" className="hover:text-indigo-600 transition-colors">Pre-made Exams</Link>
        <span>/</span>
        <span className="text-slate-900 font-medium">MCAT</span>
      </div>

      <h1 className="text-2xl font-bold text-slate-900 mb-1">MCAT Practice Forms</h1>
      <p className="text-slate-500 mb-6">Full-length MCAT-style practice with section timers, answer explanations, and AI feedback.</p>

      {/* Feature strip */}
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] sm:items-center gap-5 mb-10 bg-slate-50 rounded-xl border border-slate-100 px-6 py-5">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-2.5">Each exam includes</p>
          <ul className="space-y-1.5">
            {['230 questions across 4 sections', '6 hr 15 min total testing time', 'Chem/Phys · CARS · Bio/Biochem · Psych/Soc'].map(item => (
              <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-300 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex sm:flex-col items-center gap-1.5 px-2">
          <span className="text-[11px] text-slate-400 whitespace-nowrap">followed by</span>
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="h-4 w-4 text-slate-300 rotate-90 sm:rotate-0 shrink-0">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </div>
        <ul className="space-y-1.5">
          {['Estimated 472–528 score report', 'Section + discipline breakdown', 'AI coaching feedback', 'Full answer explanations'].map(item => (
            <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <ExamHistoryNotice />

      {/* Form cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Form 1 — active */}
        <Link
          href="/premade/mcat/form-1"
          className="rounded-xl border border-indigo-200 bg-white p-6 hover:border-indigo-400 hover:shadow-sm transition-all group flex flex-col"
        >
          <div className="h-9 w-9 rounded-lg bg-indigo-50 flex items-center justify-center mb-4 shrink-0">
            <span className="text-sm font-bold text-indigo-600">1</span>
          </div>
          <h2 className="font-semibold text-slate-900 group-hover:text-indigo-700 transition-colors mb-3">Form 1</h2>
          <ul className="space-y-1.5 mt-auto">
            {['4 sections', '230 questions', '6 hr 15 min', '472–528 score range'].map(d => (
              <li key={d} className="text-xs text-slate-400 flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-slate-200 shrink-0" />
                {d}
              </li>
            ))}
          </ul>
        </Link>

        {/* Form 2 — coming soon */}
        <div className="relative rounded-xl border border-slate-200 bg-white p-6 opacity-60 cursor-not-allowed select-none">
          <span className="absolute top-3 right-3 text-xs font-medium bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">Soon</span>
          <div className="h-9 w-9 rounded-lg bg-slate-100 flex items-center justify-center mb-4">
            <span className="text-sm font-bold text-slate-400">2</span>
          </div>
          <h2 className="font-semibold text-slate-500 mb-1">Form 2</h2>
          <p className="text-xs text-slate-400">Coming soon</p>
        </div>

        {/* Form 3 — coming soon */}
        <div className="relative rounded-xl border border-slate-200 bg-white p-6 opacity-60 cursor-not-allowed select-none">
          <span className="absolute top-3 right-3 text-xs font-medium bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">Soon</span>
          <div className="h-9 w-9 rounded-lg bg-slate-100 flex items-center justify-center mb-4">
            <span className="text-sm font-bold text-slate-400">3</span>
          </div>
          <h2 className="font-semibold text-slate-500 mb-1">Form 3</h2>
          <p className="text-xs text-slate-400">Coming soon</p>
        </div>
      </div>

      <p className="mt-8 text-xs text-slate-400 text-center">
        This is an unofficial MockMate MCAT-style practice exam. Not affiliated with or endorsed by the AAMC. "MCAT" is a registered trademark of the AAMC.
      </p>
    </div>
  )
}
