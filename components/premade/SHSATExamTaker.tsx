'use client'

import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { cn } from '@/lib/utils'
import type {
  SHSATForm,
  SHSATSubsectionType,
  SHSATQuestion,
  SHSATPoemLine,
} from '@/lib/premade-exams/shsat-form-1'

type AnswerKey = 'A' | 'B' | 'C' | 'D'

// ─── Phase state machine ───────────────────────────────────────────────────────
type Phase =
  | { tag: 'welcome' }
  | { tag: 'general_directions' }
  | { tag: 'ela_directions' }
  | { tag: 'passage_intro'; passageGlobalStart: number; passageNumber: number; totalPassages: number }
  | { tag: 'transition'; subIdx: number }
  | { tag: 'end_ela' }
  | { tag: 'question'; globalIdx: number }
  | { tag: 'end' }
  | { tag: 'results' }

// ─── Flat question ─────────────────────────────────────────────────────────────
interface FlatQuestion {
  globalIndex: number
  globalNumber: number
  subIdx: number
  subType: SHSATSubsectionType
  passageId?: string
  passageTitle?: string
  passageContent?: string
  passageAuthor?: string
  passageQStart?: number
  passageQEnd?: number
  passageContentType?: 'prose' | 'poem' | 'numbered_sentences'
  passageLines?: SHSATPoemLine[]
  question: SHSATQuestion
}

// ─── Answer helpers (grading logic — do not modify) ───────────────────────────
function isQuestionAnswered(
  q: SHSATQuestion,
  answers: Record<string, AnswerKey>,
  multiAnswers: Record<string, string[]>,
  matchAnswers: Record<string, Record<string, string>>,
): boolean {
  if (q.type === 'mcq') return !!answers[q.id]
  if (q.type === 'multi_select') return (multiAnswers[q.id] ?? []).length === q.selectCount
  if (q.type === 'match') {
    const sel = matchAnswers[q.id] ?? {}
    return q.items.every(item => !!sel[item.id])
  }
  return false
}

function isQuestionCorrect(
  q: SHSATQuestion,
  answers: Record<string, AnswerKey>,
  multiAnswers: Record<string, string[]>,
  matchAnswers: Record<string, Record<string, string>>,
): boolean {
  if (q.type === 'mcq') return answers[q.id] === q.correct_answer
  if (q.type === 'multi_select') {
    const sel = multiAnswers[q.id] ?? []
    const correct = q.correct_answers
    return sel.length === correct.length && correct.every(c => sel.includes(c))
  }
  if (q.type === 'match') {
    const sel = matchAnswers[q.id] ?? {}
    return q.items.every(item => sel[item.id] === q.correct_matches[item.id])
  }
  return false
}

function buildFlatQuestions(form: SHSATForm): FlatQuestion[] {
  const flat: FlatQuestion[] = []
  let g = 0
  form.subsections.forEach((sub, subIdx) => {
    if (sub.passages) {
      for (const passage of sub.passages) {
        const pStart = g + 1
        const pEnd   = pStart + passage.questions.length - 1
        for (const q of passage.questions) {
          flat.push({
            globalIndex: g, globalNumber: g + 1,
            subIdx, subType: sub.type,
            passageId: passage.id, passageTitle: passage.title,
            passageContent: passage.content, passageAuthor: passage.author,
            passageQStart: pStart, passageQEnd: pEnd,
            passageContentType: passage.contentType,
            passageLines: passage.lines,
            question: q,
          })
          g++
        }
      }
    } else if (sub.questions) {
      for (const q of sub.questions) {
        flat.push({ globalIndex: g, globalNumber: g + 1, subIdx, subType: sub.type, question: q })
        g++
      }
    }
  })
  return flat
}

function formatTime(s: number): string {
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
}

// ─── Passage renderers ────────────────────────────────────────────────────────
function NumberedSentencePassage({ content }: { content: string }) {
  const groups = content.split('\n\n').filter(Boolean)
  return (
    <div className="text-[13px] text-slate-800 leading-[1.85] space-y-5">
      {groups.map((group, gi) => (
        <div key={gi} className="space-y-1">
          {group.split('\n').filter(Boolean).map((sentence, si) => (
            <p key={si}>{sentence}</p>
          ))}
        </div>
      ))}
    </div>
  )
}

function PoemRenderer({ lines }: { lines: SHSATPoemLine[] }) {
  return (
    <div className="font-serif text-[13px] text-slate-800 leading-[1.9]">
      {lines.map((line, i) => {
        if (line.num === 0) return <div key={i} className="h-4" />
        return (
          <div key={i} className="flex gap-3 items-baseline">
            <span className="w-6 shrink-0 text-right text-[11px] text-slate-400 font-mono select-none">
              {line.num}
            </span>
            <span>{line.text}</span>
          </div>
        )
      })}
    </div>
  )
}

// ─── Shared navigation bar ─────────────────────────────────────────────────────
function NavBar({
  onBack, onNext, canGoBack, centerLabel, timerEl,
  onReview, isBookmarked, onBookmark, showReview, showBookmark,
}: {
  onBack: () => void
  onNext: () => void
  canGoBack: boolean
  centerLabel: React.ReactNode
  timerEl: React.ReactNode
  onReview?: () => void
  isBookmarked?: boolean
  onBookmark?: () => void
  showReview?: boolean
  showBookmark?: boolean
}) {
  return (
    <header className="shrink-0 h-11 bg-[#1b3a5c] flex items-center px-3 text-white select-none gap-2">
      <div className="flex items-center gap-0.5 shrink-0">
        <button
          onClick={onBack}
          disabled={!canGoBack}
          title="Previous"
          className="flex h-8 w-8 items-center justify-center rounded hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} className="h-4 w-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <button
          onClick={onNext}
          title="Next"
          className="flex h-8 w-8 items-center justify-center rounded hover:bg-white/10 transition-colors"
        >
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} className="h-4 w-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>

      <div className="flex-1 text-center min-w-0 px-2">
        {centerLabel}
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {timerEl}
        {showReview && onReview && (
          <button
            onClick={onReview}
            className="text-[11px] font-semibold px-2.5 py-1 rounded border border-white/30 text-white hover:bg-white/10 transition-colors"
          >
            Review
          </button>
        )}
        {showBookmark && onBookmark && (
          <button
            onClick={onBookmark}
            title={isBookmarked ? 'Remove bookmark' : 'Bookmark this question'}
            className={cn(
              'flex h-7 w-7 items-center justify-center rounded transition-colors',
              isBookmarked ? 'text-amber-400' : 'text-white/50 hover:text-white/80',
            )}
          >
            <svg
              fill={isBookmarked ? 'currentColor' : 'none'}
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
              />
            </svg>
          </button>
        )}
      </div>
    </header>
  )
}

// ─── Welcome screen ────────────────────────────────────────────────────────────
function WelcomeScreen({
  form, totalQ, onNext, timerEl,
}: {
  form: SHSATForm
  totalQ: number
  onNext: () => void
  timerEl: React.ReactNode
}) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#eef0f4]">
      <header className="shrink-0 h-11 bg-[#1b3a5c] flex items-center justify-between px-5">
        <div className="flex items-center gap-2.5">
          <div className="h-6 w-6 rounded bg-white/20 flex items-center justify-center">
            <span className="text-[11px] font-bold text-white">M</span>
          </div>
          <span className="text-[12px] font-semibold text-white/90 tracking-wide">MockMate</span>
        </div>
        {timerEl}
      </header>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-xl bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="bg-[#1b3a5c] px-8 py-6">
            <h1 className="text-[18px] font-bold text-white leading-tight">{form.title}</h1>
            <p className="text-[12px] text-white/60 mt-1">{form.description}</p>
          </div>

          <div className="flex">
            <div className="flex-1 px-8 py-6 border-r border-gray-100">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-4">Exam Details</p>
              <div className="space-y-3">
                <div>
                  <p className="text-[11px] text-slate-400">Total Time</p>
                  <p className="text-[13px] font-semibold text-slate-800">
                    {form.timeLimitMinutes / 60} hours ({form.timeLimitMinutes} min)
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-400">Total Questions</p>
                  <p className="text-[13px] font-semibold text-slate-800">100 questions</p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-400">Sections</p>
                  <div className="mt-0.5 space-y-0.5">
                    <p className="text-[13px] font-semibold text-slate-800">• English Language Arts (50)</p>
                    <p className="text-[13px] font-semibold text-slate-800">• Mathematics (50)</p>
                  </div>
                </div>
                <div>
                  <p className="text-[11px] text-slate-400">Format</p>
                  <p className="text-[13px] font-semibold text-slate-800">Multiple Choice</p>
                </div>
              </div>
            </div>

            <div className="w-52 px-6 py-6 flex flex-col items-center justify-between bg-slate-50">
              <div className="flex flex-col items-center">
                <div className="h-14 w-14 rounded-full bg-[#1b3a5c] flex items-center justify-center mb-2">
                  <span className="text-xl font-bold text-white">G</span>
                </div>
                <p className="text-[13px] font-semibold text-slate-800">Guest</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Test-taker</p>
              </div>
              <div className="w-full">
                <button
                  onClick={onNext}
                  className="w-full rounded-lg bg-[#1d4ed8] text-white text-[13px] font-semibold py-2.5 hover:bg-[#1e40af] transition-colors"
                >
                  Start Exam
                </button>
                <p className="text-[10px] text-slate-400 text-center mt-1.5">Timer is running</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── General Directions screen ─────────────────────────────────────────────────
function GeneralDirectionsScreen({
  form, totalQ, onBack, onNext, timerEl,
}: {
  form: SHSATForm
  totalQ: number
  onBack: () => void
  onNext: () => void
  timerEl: React.ReactNode
}) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#eef0f4]">
      <NavBar
        onBack={onBack}
        onNext={onNext}
        canGoBack={true}
        timerEl={timerEl}
        centerLabel={
          <span className="text-[11px] font-semibold tracking-widest uppercase text-white/80">
            General Directions
          </span>
        }
      />

      <div className="flex-1 overflow-y-auto flex justify-center py-8 px-4">
        <div className="w-full max-w-2xl bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-8 py-5 border-b border-gray-100">
            <p className="text-[10px] font-bold uppercase tracking-widest text-blue-600 mb-1">
              Specialized High Schools Admissions Test
            </p>
            <h1 className="text-xl font-bold text-slate-900">General Directions</h1>
          </div>

          <div className="px-8 py-6 space-y-6 text-[13.5px] text-slate-700 leading-relaxed">
            <p>
              This practice test is designed to help you prepare for the SHSAT. Read all directions
              carefully before beginning each section.
            </p>

            <div>
              <h2 className="text-[12px] font-bold uppercase tracking-wide text-slate-500 mb-2.5">
                Test Structure
              </h2>
              <ul className="space-y-2">
                {[
                  `This exam has two sections: English Language Arts (ELA) and Mathematics.`,
                  `You have ${form.timeLimitMinutes / 60} hours (${form.timeLimitMinutes} minutes) to complete the entire exam.`,
                  `There are ${totalQ} questions in total. Answer every question — there is no penalty for wrong answers.`,
                  `You may move freely between questions and sections at any time.`,
                ].map((item, i) => (
                  <li key={i} className="flex gap-2.5">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-[12px] font-bold uppercase tracking-wide text-slate-500 mb-2.5">
                Navigation
              </h2>
              <ul className="space-y-2">
                {[
                  'Use the ‹ › arrows at the top-left to move between questions.',
                  'Click Review to see a grid of all questions and their answered status.',
                  'Click the bookmark icon to flag a question for later review.',
                  'Questions with an orange dot in the review grid are not yet answered.',
                ].map((item, i) => (
                  <li key={i} className="flex gap-2.5">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-[12px] font-bold uppercase tracking-wide text-slate-500 mb-2.5">
                Scoring
              </h2>
              <ul className="space-y-2">
                {[
                  'Your score is based on the total number of correct answers.',
                  'There is no penalty for incorrect or unanswered questions.',
                  'You can change any answer at any time before submitting.',
                ].map((item, i) => (
                  <li key={i} className="flex gap-2.5">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="px-8 py-5 border-t border-gray-100 bg-slate-50 flex justify-between items-center">
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 text-[12px] font-medium text-slate-500 hover:text-slate-700 transition-colors"
            >
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back
            </button>
            <button
              onClick={onNext}
              className="flex items-center gap-2 rounded-lg bg-[#1b3a5c] text-white text-[13px] font-semibold px-5 py-2.5 hover:bg-[#142e4d] transition-colors"
            >
              ELA Directions
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── ELA Directions screen ─────────────────────────────────────────────────────
function ELADirectionsScreen({
  elaCount, onBack, onNext, timerEl,
}: {
  elaCount: number
  onBack: () => void
  onNext: () => void
  timerEl: React.ReactNode
}) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#eef0f4]">
      <NavBar
        onBack={onBack}
        onNext={onNext}
        canGoBack={true}
        timerEl={timerEl}
        centerLabel={
          <span className="text-[11px] font-semibold tracking-widest uppercase text-white/80">
            English Language Arts — Directions
          </span>
        }
      />

      <div className="flex-1 overflow-y-auto flex justify-center py-8 px-4">
        <div className="w-full max-w-2xl bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-8 py-5 border-b border-gray-100">
            <p className="text-[10px] font-bold uppercase tracking-widest text-blue-600 mb-1">
              Section 1
            </p>
            <h1 className="text-xl font-bold text-slate-900">English Language Arts</h1>
            <p className="text-[13px] text-slate-500 mt-1">{elaCount} questions</p>
          </div>

          <div className="px-8 py-6 space-y-6">
            <div className="rounded-xl border border-blue-100 bg-blue-50 px-5 py-4">
              <p className="text-[13px] font-semibold text-blue-800 mb-1.5">This section has two parts:</p>
              <ul className="space-y-1 text-[13px] text-blue-700">
                <li className="flex gap-2">
                  <span className="font-bold shrink-0">Part 1 —</span>
                  Reading Comprehension (passages with questions)
                </li>
                <li className="flex gap-2">
                  <span className="font-bold shrink-0">Part 2 —</span>
                  Revising &amp; Editing (standalone questions)
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-[12px] font-bold uppercase tracking-wide text-slate-500 mb-2.5">
                Reading Comprehension
              </h2>
              <ul className="space-y-2 text-[13.5px] text-slate-700 leading-relaxed">
                {[
                  'Read each passage carefully, then answer the questions that follow.',
                  'Base your answers only on the content within each passage.',
                  'You may reread any part of the passage before choosing your answer.',
                  'The passage appears on the left; questions appear on the right.',
                ].map((item, i) => (
                  <li key={i} className="flex gap-2.5">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-[12px] font-bold uppercase tracking-wide text-slate-500 mb-2.5">
                Revising &amp; Editing
              </h2>
              <ul className="space-y-2 text-[13.5px] text-slate-700 leading-relaxed">
                {[
                  'Part A: Passages with numbered sentences. Choose the best revision for each underlined section.',
                  'Part B: Standalone questions about grammar, usage, and writing conventions.',
                  'Select the answer that best improves the clarity and correctness of the writing.',
                ].map((item, i) => (
                  <li key={i} className="flex gap-2.5">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="px-8 py-5 border-t border-gray-100 bg-slate-50 flex justify-between items-center">
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 text-[12px] font-medium text-slate-500 hover:text-slate-700 transition-colors"
            >
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back
            </button>
            <button
              onClick={onNext}
              className="flex items-center gap-2 rounded-lg bg-[#1b3a5c] text-white text-[13px] font-semibold px-5 py-2.5 hover:bg-[#142e4d] transition-colors"
            >
              Begin Reading
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Passage Intro screen ──────────────────────────────────────────────────────
function PassageIntroScreen({
  introFq, passageNumber, totalPassages, onBack, onNext, timerEl,
}: {
  introFq: FlatQuestion
  passageNumber: number
  totalPassages: number
  onBack: () => void
  onNext: () => void
  timerEl: React.ReactNode
}) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#eef0f4]">
      <NavBar
        onBack={onBack}
        onNext={onNext}
        canGoBack={true}
        timerEl={timerEl}
        centerLabel={
          <span className="text-[11px] font-semibold tracking-widest uppercase text-white/80">
            ELA — Reading Comprehension
          </span>
        }
      />

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-lg bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-8 py-5 border-b border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-blue-600">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                English Language Arts
              </span>
              <span className="text-[11px] font-semibold text-slate-400">
                {passageNumber} of {totalPassages}
              </span>
            </div>
            <p className="text-[12px] font-semibold text-slate-500 mb-1">Passage Set {passageNumber}</p>
            <h1 className="text-xl font-bold text-slate-900 leading-tight">{introFq.passageTitle}</h1>
            {introFq.passageAuthor && (
              <p className="text-[13px] text-slate-500 mt-1">by {introFq.passageAuthor}</p>
            )}
          </div>

          <div className="px-8 py-6">
            <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 mb-4">
              <div className="h-8 w-8 rounded-full bg-[#1b3a5c]/10 flex items-center justify-center shrink-0">
                <svg
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                  className="h-4 w-4 text-[#1b3a5c]"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <p className="text-[11px] text-slate-400">Questions</p>
                <p className="text-[13px] font-semibold text-slate-800">
                  {introFq.passageQStart}–{introFq.passageQEnd}
                </p>
              </div>
            </div>
            <p className="text-[13px] text-slate-500 leading-relaxed">
              Read the passage carefully, then answer the questions. Base your answers only on the
              content within the passage.
            </p>
          </div>

          <div className="px-8 py-5 border-t border-gray-100 bg-slate-50 flex justify-between items-center">
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 text-[12px] font-medium text-slate-500 hover:text-slate-700 transition-colors"
            >
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back
            </button>
            <button
              onClick={onNext}
              className="flex items-center gap-2 rounded-lg bg-[#1b3a5c] text-white text-[13px] font-semibold px-5 py-2.5 hover:bg-[#142e4d] transition-colors"
            >
              Begin Reading
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── End of ELA screen ─────────────────────────────────────────────────────────
function EndELAScreen({
  elaQuestions, answers, multiAnswers, matchAnswers,
  onBack, onNext, onReview, timerEl,
}: {
  elaQuestions: FlatQuestion[]
  answers: Record<string, AnswerKey>
  multiAnswers: Record<string, string[]>
  matchAnswers: Record<string, Record<string, string>>
  onBack: () => void
  onNext: () => void
  onReview: () => void
  timerEl: React.ReactNode
}) {
  const answeredCount = elaQuestions.filter(fq =>
    isQuestionAnswered(fq.question, answers, multiAnswers, matchAnswers)
  ).length
  const unanswered = elaQuestions.length - answeredCount

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#eef0f4]">
      <NavBar
        onBack={onBack}
        onNext={onNext}
        canGoBack={true}
        timerEl={timerEl}
        showReview
        onReview={onReview}
        centerLabel={
          <span className="text-[11px] font-semibold tracking-widest uppercase text-white/80">
            End of English Language Arts
          </span>
        }
      />

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-lg bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                <svg
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                  className="h-5 w-5 text-emerald-600"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Section 1 Complete
                </p>
                <h1 className="text-xl font-bold text-slate-900">End of English Language Arts</h1>
              </div>
            </div>
            <p className="text-[13.5px] text-slate-600 leading-relaxed">
              You have completed the ELA section. Review your answers or continue to Mathematics.
            </p>
          </div>

          <div className="px-8 py-6 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-center">
                <p className="text-2xl font-bold text-emerald-700">{answeredCount}</p>
                <p className="text-[11px] text-emerald-600 mt-0.5">Answered</p>
              </div>
              <div className={cn(
                'rounded-xl border px-4 py-3 text-center',
                unanswered > 0 ? 'border-amber-200 bg-amber-50' : 'border-slate-200 bg-slate-50',
              )}>
                <p className={cn(
                  'text-2xl font-bold',
                  unanswered > 0 ? 'text-amber-700' : 'text-slate-400',
                )}>
                  {unanswered}
                </p>
                <p className={cn('text-[11px] mt-0.5', unanswered > 0 ? 'text-amber-600' : 'text-slate-400')}>
                  Unanswered
                </p>
              </div>
            </div>

            {unanswered > 0 && (
              <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-[12px] text-amber-800">
                <strong>{unanswered}</strong> question{unanswered !== 1 ? 's' : ''} not yet answered.
                Click Back or Review to return and complete them.
              </div>
            )}

            <button
              onClick={onReview}
              className="w-full rounded-lg border border-slate-200 bg-white py-2.5 text-[13px] font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Review All Answers
            </button>
          </div>

          <div className="px-8 py-5 border-t border-gray-100 bg-slate-50 flex justify-between items-center">
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 text-[12px] font-medium text-slate-500 hover:text-slate-700 transition-colors"
            >
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back to ELA
            </button>
            <button
              onClick={onNext}
              className="flex items-center gap-2 rounded-lg bg-[#1d4ed8] text-white text-[13px] font-semibold px-5 py-2.5 hover:bg-[#1e40af] transition-colors"
            >
              Begin Mathematics
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Subsection transition screen (RevEdit A / RevEdit B / Math Directions) ───
function TransitionScreen({
  sub, sectionBadge, onBack, onNext, timerEl,
}: {
  sub: SHSATForm['subsections'][number]
  sectionBadge: string
  onBack: () => void
  onNext: () => void
  timerEl: React.ReactNode
}) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#eef0f4]">
      <NavBar
        onBack={onBack}
        onNext={onNext}
        canGoBack={true}
        timerEl={timerEl}
        centerLabel={
          <span className="text-[11px] font-semibold tracking-widest uppercase text-white/80">
            {sectionBadge}
          </span>
        }
      />

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-8 py-5 border-b border-gray-100">
            <p className="text-[10px] font-bold tracking-widest uppercase text-blue-600 mb-1">
              {sub.sectionLabel}
            </p>
            <h1 className="text-xl font-bold text-slate-900 leading-tight">{sub.title}</h1>
          </div>

          <div className="px-8 py-6 space-y-5">
            {sub.directionBullets && sub.directionBullets.length > 0 && (
              <div>
                <p className="text-[12px] font-bold uppercase tracking-wide text-slate-500 mb-2.5">
                  Important Notes
                </p>
                <ol className="space-y-2">
                  {sub.directionBullets.map((b, i) => (
                    <li key={i} className="flex gap-2.5 text-[13.5px] text-slate-700 leading-relaxed">
                      <span className="shrink-0 font-bold text-slate-400 w-4">{i + 1}.</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            <div>
              <p className="text-[12px] font-bold uppercase tracking-wide text-slate-500 mb-2.5">
                Directions
              </p>
              <p className="text-[13.5px] text-slate-700 leading-relaxed">{sub.directions}</p>
            </div>
          </div>

          <div className="px-8 py-5 border-t border-gray-100 bg-slate-50 flex justify-between items-center">
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 text-[12px] font-medium text-slate-500 hover:text-slate-700 transition-colors"
            >
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back
            </button>
            <button
              onClick={onNext}
              className="flex items-center gap-2 rounded-lg bg-[#1b3a5c] text-white text-[13px] font-semibold px-5 py-2.5 hover:bg-[#142e4d] transition-colors"
            >
              Begin
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── End of Exam / Review screen ───────────────────────────────────────────────
function EndScreen({
  flatQuestions, answers, multiAnswers, matchAnswers,
  bookmarked, onGoTo, onSubmit, timerEl,
}: {
  flatQuestions: FlatQuestion[]
  answers: Record<string, AnswerKey>
  multiAnswers: Record<string, string[]>
  matchAnswers: Record<string, Record<string, string>>
  bookmarked: Set<string>
  onGoTo: (i: number) => void
  onSubmit: () => void
  timerEl: React.ReactNode
}) {
  const total      = flatQuestions.length
  const answered   = flatQuestions.filter(fq =>
    isQuestionAnswered(fq.question, answers, multiAnswers, matchAnswers)
  ).length
  const unanswered = total - answered

  const QuestionGrid = ({ questions }: { questions: FlatQuestion[] }) => (
    <div className="grid grid-cols-10 gap-1.5">
      {questions.map((fq) => {
        const isAns = isQuestionAnswered(fq.question, answers, multiAnswers, matchAnswers)
        const isBmk = bookmarked.has(fq.question.id)
        return (
          <button
            key={fq.question.id}
            onClick={() => onGoTo(fq.globalIndex)}
            title={`Q${fq.globalNumber}${!isAns ? ' — not answered' : ''}${isBmk ? ' — bookmarked' : ''}`}
            className={cn(
              'relative flex h-8 w-full items-center justify-center rounded text-xs font-semibold border transition-colors',
              isAns
                ? 'bg-[#e8edf3] border-[#b0bfcf] text-[#1b3a5c] hover:bg-[#dce4ed]'
                : 'bg-white border-amber-400 text-slate-700 hover:border-amber-500',
            )}
          >
            {fq.globalNumber}
            {!isAns && (
              <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-amber-500" />
            )}
            {isBmk && (
              <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-amber-300" />
            )}
          </button>
        )
      })}
    </div>
  )

  const elaFqs  = flatQuestions.filter(fq => fq.subType !== 'mathematics')
  const mathFqs = flatQuestions.filter(fq => fq.subType === 'mathematics')

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#eef0f4]">
      <header className="shrink-0 h-11 bg-[#1b3a5c] flex items-center justify-between px-5">
        <span className="text-[11px] font-semibold tracking-widest uppercase text-white/80">
          End of Exam — Answer Review
        </span>
        {timerEl}
      </header>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-4xl bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-100">
            <h1 className="text-xl font-bold text-slate-900 mb-1">End of Exam</h1>
            <p className="text-[13.5px] text-slate-600">
              Review your answers below. Click any question number to return to it.
              When ready, click <strong>Submit Final Answers</strong>.
            </p>
            {unanswered > 0 && (
              <div className="mt-3 inline-flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-[12px] text-amber-800">
                <span className="h-2 w-2 rounded-full bg-amber-500 shrink-0" />
                {unanswered} question{unanswered !== 1 ? 's' : ''} not yet answered
              </div>
            )}
          </div>

          <div className="px-8 py-6 space-y-6">
            {elaFqs.length > 0 && (
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">
                  English Language Arts
                </p>
                <QuestionGrid questions={elaFqs} />
              </div>
            )}
            {mathFqs.length > 0 && (
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">
                  Mathematics
                </p>
                <QuestionGrid questions={mathFqs} />
              </div>
            )}

            <div className="flex items-center gap-6 text-[11px] text-slate-500">
              <div className="flex items-center gap-1.5">
                <span className="inline-block h-3 w-3 rounded bg-[#e8edf3] border border-[#b0bfcf]" />
                Answered
              </div>
              <div className="flex items-center gap-1.5">
                <span className="relative inline-block h-3 w-3 rounded border border-amber-400 bg-white">
                  <span className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-amber-500" />
                </span>
                Not answered
              </div>
              <div className="flex items-center gap-1.5">
                <span className="relative inline-block h-3 w-3 rounded bg-[#e8edf3] border border-[#b0bfcf]">
                  <span className="absolute -bottom-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-amber-300" />
                </span>
                Bookmarked
              </div>
            </div>
          </div>

          <div className="px-8 py-5 border-t border-gray-100 bg-slate-50">
            <button
              onClick={onSubmit}
              className="rounded-lg bg-[#1d4ed8] text-white text-[13px] font-semibold px-8 py-3 hover:bg-[#1e40af] transition-colors"
            >
              Submit Final Answers
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Results screen (grading logic — do not modify) ───────────────────────────
function ResultsScreen({
  form, flatQuestions, answers, multiAnswers, matchAnswers, timedOut, onRetake,
}: {
  form: SHSATForm
  flatQuestions: FlatQuestion[]
  answers: Record<string, AnswerKey>
  multiAnswers: Record<string, string[]>
  matchAnswers: Record<string, Record<string, string>>
  timedOut: boolean
  onRetake: () => void
}) {
  const total   = flatQuestions.length
  const correct = flatQuestions.filter(fq =>
    isQuestionCorrect(fq.question, answers, multiAnswers, matchAnswers)
  ).length
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      {timedOut && (
        <div className="fixed top-0 inset-x-0 bg-amber-500 text-white text-center py-2 text-sm font-medium z-10">
          Time&apos;s up — your exam was submitted automatically.
        </div>
      )}
      <div className={cn('mx-auto max-w-3xl space-y-6', timedOut && 'pt-8')}>
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <p className="text-sm font-medium text-slate-500 mb-1">{form.title}</p>
          <div className="mt-3 flex items-end justify-center gap-2">
            <span className="text-6xl font-bold text-slate-900">{correct}</span>
            <span className="text-2xl text-slate-400 mb-2">/{total}</span>
          </div>
          <p className="mt-1 text-lg font-semibold text-slate-700">{pct}% correct</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <h2 className="text-sm font-semibold text-slate-800">Question Review</h2>
          </div>
          <div className="divide-y divide-slate-100">
            {flatQuestions.map((fq) => {
              const q     = fq.question
              const ok    = isQuestionCorrect(q, answers, multiAnswers, matchAnswers)
              const isAns = isQuestionAnswered(q, answers, multiAnswers, matchAnswers)

              let reviewContent: React.ReactNode = null
              if (q.type === 'mcq') {
                const sel = answers[q.id] as AnswerKey | undefined
                const correctChoice  = q.choices.find(c => c.id === q.correct_answer)
                const selectedChoice = sel ? q.choices.find(c => c.id === sel) : undefined
                reviewContent = (
                  <div className="mt-1.5 space-y-0.5 text-xs">
                    {isAns && !ok && selectedChoice && (
                      <p className="text-red-600">Your answer: {selectedChoice.id}. {selectedChoice.text}</p>
                    )}
                    <p className="text-emerald-700 font-medium">
                      Correct: {correctChoice?.id}. {correctChoice?.text}
                    </p>
                    {!isAns && <p className="text-slate-400 italic">Not answered</p>}
                  </div>
                )
              } else if (q.type === 'multi_select') {
                const sel = multiAnswers[q.id] ?? []
                reviewContent = (
                  <div className="mt-1.5 space-y-0.5 text-xs">
                    {isAns && !ok && (
                      <p className="text-red-600">Your answers: {sel.join(', ')}</p>
                    )}
                    <p className="text-emerald-700 font-medium">
                      Correct: {q.correct_answers.join(', ')}
                    </p>
                    {!isAns && <p className="text-slate-400 italic">Not fully answered</p>}
                  </div>
                )
              } else if (q.type === 'match') {
                reviewContent = (
                  <div className="mt-1.5 text-xs text-emerald-700 font-medium">
                    Correct grouping:{' '}
                    {q.categories.map(cat => {
                      const items = q.items.filter(item => q.correct_matches[item.id] === cat.id)
                      return `${cat.label}: items ${items.map(i => i.id).join(', ')}`
                    }).join(' | ')}
                    {!isAns && (
                      <span className="block text-slate-400 font-normal italic mt-0.5">
                        Not fully answered
                      </span>
                    )}
                  </div>
                )
              }

              return (
                <div key={q.id} className="px-6 py-4">
                  <div className="flex items-start gap-3">
                    <span className={cn(
                      'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold',
                      !isAns
                        ? 'bg-slate-100 text-slate-400'
                        : ok
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-red-100 text-red-600',
                    )}>
                      {!isAns ? '–' : ok ? '✓' : '✗'}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-slate-400 mb-1">Q{fq.globalNumber}</p>
                      <p className="text-sm text-slate-700 line-clamp-2">{q.question}</p>
                      {reviewContent}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <button
          onClick={onRetake}
          className="w-full rounded-lg border border-slate-200 bg-white py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
        >
          Retake Exam
        </button>
      </div>
    </div>
  )
}

// ─── Main component ────────────────────────────────────────────────────────────

interface Props { form: SHSATForm }

export function SHSATExamTaker({ form }: Props) {
  const flatQuestions = useMemo(() => buildFlatQuestions(form), [form])
  const totalQ        = flatQuestions.length

  const subsectionStarts = useMemo(() => {
    const starts: number[] = []
    flatQuestions.forEach((fq) => {
      if (starts[fq.subIdx] === undefined) starts[fq.subIdx] = fq.globalIndex
    })
    return starts
  }, [flatQuestions])

  // globalIndex of first question in each RC passage
  const passageStarts = useMemo(() => {
    const starts: number[] = []
    let currentPassageId: string | undefined = undefined
    for (const fq of flatQuestions) {
      if (fq.subType === 'reading_comprehension' && fq.passageId !== currentPassageId) {
        currentPassageId = fq.passageId
        starts.push(fq.globalIndex)
      }
    }
    return starts
  }, [flatQuestions])

  // passage number (1-indexed) for each passageId in RC
  const passageNumberMap = useMemo(() => {
    const map: Record<string, number> = {}
    let idx = 1
    for (const fq of flatQuestions) {
      if (fq.subType === 'reading_comprehension' && fq.passageId && !map[fq.passageId]) {
        map[fq.passageId] = idx++
      }
    }
    return map
  }, [flatQuestions])

  const mathSubIdx = useMemo(() =>
    form.subsections.findIndex(s => s.type === 'mathematics'),
    [form],
  )

  const elaQuestions = useMemo(() =>
    flatQuestions.filter(fq => fq.subType !== 'mathematics'),
    [flatQuestions],
  )

  const lastELAGlobalIdx = useMemo(() =>
    elaQuestions.length > 0 ? elaQuestions[elaQuestions.length - 1].globalIndex : 0,
    [elaQuestions],
  )

  const [phase, setPhase]               = useState<Phase>({ tag: 'welcome' })
  const [answers, setAnswers]           = useState<Record<string, AnswerKey>>({})
  const [multiAnswers, setMultiAnswers] = useState<Record<string, string[]>>({})
  const [matchAnswers, setMatchAnswers] = useState<Record<string, Record<string, string>>>({})
  const [bookmarked, setBookmarked]     = useState<Set<string>>(new Set())
  const [secondsLeft, setSecondsLeft]   = useState(form.timeLimitMinutes * 60)
  const [timedOut, setTimedOut]         = useState(false)
  const [showAttentionModal, setShowAttentionModal] = useState(false)

  const passagePanelRef = useRef<HTMLDivElement>(null)
  const prevPassageId   = useRef<string>('')

  // ── Timer ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (phase.tag === 'results') return
    if (secondsLeft <= 0) { setTimedOut(true); setPhase({ tag: 'results' }); return }
    const t = setInterval(() => setSecondsLeft(s => s - 1), 1000)
    return () => clearInterval(t)
  }, [phase.tag, secondsLeft])

  // ── Scroll passage panel to top on passage change ──────────────────────────
  useEffect(() => {
    if (phase.tag !== 'question') return
    const fq = flatQuestions[phase.globalIdx]
    if (!fq?.passageId) return
    if (fq.passageId !== prevPassageId.current) {
      prevPassageId.current = fq.passageId
      if (passagePanelRef.current) passagePanelRef.current.scrollTop = 0
    }
  }, [phase, flatQuestions])

  // ── Navigation ─────────────────────────────────────────────────────────────
  const handleNext = useCallback(() => {
    if (phase.tag === 'welcome') {
      setPhase({ tag: 'general_directions' }); return
    }
    if (phase.tag === 'general_directions') {
      setPhase({ tag: 'ela_directions' }); return
    }
    if (phase.tag === 'ela_directions') {
      if (passageStarts.length > 0) {
        setPhase({
          tag: 'passage_intro',
          passageGlobalStart: passageStarts[0],
          passageNumber: 1,
          totalPassages: passageStarts.length,
        })
      } else {
        setPhase({ tag: 'question', globalIdx: 0 })
      }
      return
    }
    if (phase.tag === 'passage_intro') {
      setPhase({ tag: 'question', globalIdx: phase.passageGlobalStart }); return
    }
    if (phase.tag === 'end_ela') {
      if (mathSubIdx >= 0) {
        setPhase({ tag: 'transition', subIdx: mathSubIdx })
      }
      return
    }
    if (phase.tag === 'transition') {
      setPhase({ tag: 'question', globalIdx: subsectionStarts[phase.subIdx] }); return
    }
    if (phase.tag === 'question') {
      // Block advancement if multi_select or match is partially answered
      const curQ = flatQuestions[phase.globalIdx].question
      if (curQ.type === 'multi_select') {
        const selected = multiAnswers[curQ.id] ?? []
        if (selected.length < curQ.selectCount) { setShowAttentionModal(true); return }
      }
      if (curQ.type === 'match') {
        const assigned = matchAnswers[curQ.id] ?? {}
        if (Object.keys(assigned).length < curQ.items.length) { setShowAttentionModal(true); return }
      }

      const next = phase.globalIdx + 1
      if (next >= totalQ) { setPhase({ tag: 'end' }); return }

      const curFq  = flatQuestions[phase.globalIdx]
      const nextFq = flatQuestions[next]

      if (nextFq.subIdx > curFq.subIdx) {
        if (nextFq.subType === 'mathematics') {
          setPhase({ tag: 'end_ela' })
        } else {
          setPhase({ tag: 'transition', subIdx: nextFq.subIdx })
        }
        return
      }

      // Passage boundary within Reading Comprehension
      if (
        curFq.subType === 'reading_comprehension' &&
        nextFq.subType === 'reading_comprehension' &&
        nextFq.passageId &&
        nextFq.passageId !== curFq.passageId
      ) {
        const passageIdx = passageStarts.indexOf(next)
        if (passageIdx !== -1) {
          setPhase({
            tag: 'passage_intro',
            passageGlobalStart: next,
            passageNumber: passageIdx + 1,
            totalPassages: passageStarts.length,
          })
          return
        }
      }

      setPhase({ tag: 'question', globalIdx: next })
    }
  }, [phase, flatQuestions, totalQ, subsectionStarts, passageStarts, mathSubIdx])

  const handleBack = useCallback(() => {
    if (phase.tag === 'general_directions') {
      setPhase({ tag: 'welcome' }); return
    }
    if (phase.tag === 'ela_directions') {
      setPhase({ tag: 'general_directions' }); return
    }
    if (phase.tag === 'passage_intro') {
      if (phase.passageNumber === 1) {
        setPhase({ tag: 'ela_directions' })
      } else {
        setPhase({ tag: 'question', globalIdx: phase.passageGlobalStart - 1 })
      }
      return
    }
    if (phase.tag === 'transition') {
      const sub = form.subsections[phase.subIdx]
      if (sub.type === 'mathematics') {
        setPhase({ tag: 'end_ela' })
      } else {
        setPhase({ tag: 'question', globalIdx: subsectionStarts[phase.subIdx] - 1 })
      }
      return
    }
    if (phase.tag === 'end_ela') {
      setPhase({ tag: 'question', globalIdx: lastELAGlobalIdx }); return
    }
    if (phase.tag === 'question' && phase.globalIdx > 0) {
      setPhase({ tag: 'question', globalIdx: phase.globalIdx - 1 }); return
    }
    if (phase.tag === 'end') {
      setPhase({ tag: 'question', globalIdx: totalQ - 1 })
    }
  }, [phase, totalQ, subsectionStarts, form.subsections, lastELAGlobalIdx])

  const handleGoTo = useCallback((i: number) => {
    setPhase({ tag: 'question', globalIdx: i })
  }, [])

  const handleRetake = useCallback(() => {
    setPhase({ tag: 'welcome' })
    setAnswers({})
    setMultiAnswers({})
    setMatchAnswers({})
    setBookmarked(new Set())
    setSecondsLeft(form.timeLimitMinutes * 60)
    setTimedOut(false)
    prevPassageId.current = ''
  }, [form.timeLimitMinutes])

  const isWarning = secondsLeft <= 300
  const timerEl = (
    <span className={cn(
      'text-xs font-mono font-bold tabular-nums px-2 py-0.5 rounded',
      isWarning ? 'bg-red-500 text-white animate-pulse' : 'bg-white/10 text-white/90',
    )}>
      {formatTime(secondsLeft)}
    </span>
  )

  // ── Results ────────────────────────────────────────────────────────────────
  if (phase.tag === 'results') {
    return (
      <ResultsScreen
        form={form}
        flatQuestions={flatQuestions}
        answers={answers}
        multiAnswers={multiAnswers}
        matchAnswers={matchAnswers}
        timedOut={timedOut}
        onRetake={handleRetake}
      />
    )
  }

  // ── Welcome ────────────────────────────────────────────────────────────────
  if (phase.tag === 'welcome') {
    return <WelcomeScreen form={form} totalQ={totalQ} onNext={handleNext} timerEl={timerEl} />
  }

  // ── General Directions ─────────────────────────────────────────────────────
  if (phase.tag === 'general_directions') {
    return (
      <GeneralDirectionsScreen
        form={form}
        totalQ={totalQ}
        onBack={handleBack}
        onNext={handleNext}
        timerEl={timerEl}
      />
    )
  }

  // ── ELA Directions ─────────────────────────────────────────────────────────
  if (phase.tag === 'ela_directions') {
    return (
      <ELADirectionsScreen
        elaCount={elaQuestions.length}
        onBack={handleBack}
        onNext={handleNext}
        timerEl={timerEl}
      />
    )
  }

  // ── Passage Intro ──────────────────────────────────────────────────────────
  if (phase.tag === 'passage_intro') {
    const introFq = flatQuestions[phase.passageGlobalStart]
    return (
      <PassageIntroScreen
        introFq={introFq}
        passageNumber={phase.passageNumber}
        totalPassages={phase.totalPassages}
        onBack={handleBack}
        onNext={handleNext}
        timerEl={timerEl}
      />
    )
  }

  // ── End of ELA ─────────────────────────────────────────────────────────────
  if (phase.tag === 'end_ela') {
    return (
      <EndELAScreen
        elaQuestions={elaQuestions}
        answers={answers}
        multiAnswers={multiAnswers}
        matchAnswers={matchAnswers}
        onBack={handleBack}
        onNext={handleNext}
        onReview={() => setPhase({ tag: 'end' })}
        timerEl={timerEl}
      />
    )
  }

  // ── Subsection Transition ──────────────────────────────────────────────────
  if (phase.tag === 'transition') {
    const sub = form.subsections[phase.subIdx]
    const sectionBadge =
      sub.type === 'mathematics'
        ? 'Mathematics — Directions'
        : sub.type === 'revising_editing_a'
          ? 'ELA — Revising & Editing Part A'
          : 'ELA — Revising & Editing Part B'
    return (
      <TransitionScreen
        sub={sub}
        sectionBadge={sectionBadge}
        onBack={handleBack}
        onNext={handleNext}
        timerEl={timerEl}
      />
    )
  }

  // ── End / Review ───────────────────────────────────────────────────────────
  if (phase.tag === 'end') {
    return (
      <EndScreen
        flatQuestions={flatQuestions}
        answers={answers}
        multiAnswers={multiAnswers}
        matchAnswers={matchAnswers}
        bookmarked={bookmarked}
        onGoTo={handleGoTo}
        onSubmit={() => setPhase({ tag: 'results' })}
        timerEl={timerEl}
      />
    )
  }

  // ── Question screen ────────────────────────────────────────────────────────
  const fq       = flatQuestions[phase.globalIdx]
  const subType  = fq.subType
  const currentQ = fq.question

  const isPassageLayout = !!fq.passageId
  const isMathLayout    = subType === 'mathematics'
  const isBookmarked    = bookmarked.has(currentQ.id)

  const answeredCount = flatQuestions.filter(f =>
    isQuestionAnswered(f.question, answers, multiAnswers, matchAnswers)
  ).length

  function toggleBookmark() {
    setBookmarked(prev => {
      const next = new Set(prev)
      if (next.has(currentQ.id)) next.delete(currentQ.id)
      else next.add(currentQ.id)
      return next
    })
  }

  const sectionLabel =
    subType === 'mathematics'
      ? 'MATH'
      : subType === 'revising_editing_a'
        ? 'ELA — REV/EDIT A'
        : subType === 'revising_editing_b'
          ? 'ELA — REV/EDIT B'
          : 'ELA — READING'

  // ── Per-type question content ──────────────────────────────────────────────
  let questionContent: React.ReactNode = null

  if (currentQ.type === 'mcq') {
    const mcq = currentQ
    const currentAnswer = answers[mcq.id] as AnswerKey | undefined
    const toggleAnswer = (choice: AnswerKey) => {
      setAnswers(prev => {
        const next = { ...prev }
        if (next[mcq.id] === choice) delete next[mcq.id]
        else next[mcq.id] = choice
        return next
      })
    }
    questionContent = (
      <div className="space-y-2.5">
        {mcq.choices.map((choice) => {
          const sel = currentAnswer === choice.id
          return (
            <button
              key={choice.id}
              type="button"
              onClick={() => toggleAnswer(choice.id as AnswerKey)}
              className={cn(
                'flex w-full items-start gap-3 rounded-lg border px-4 py-3 text-left text-[13px] transition-all cursor-pointer',
                sel
                  ? 'border-[#1b3a5c] bg-[#eaf0f7]'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50',
              )}
            >
              <span className={cn(
                'flex h-5 w-5 shrink-0 mt-0.5 items-center justify-center rounded-full border-2 text-[11px] font-bold transition-colors',
                sel ? 'border-[#1b3a5c] bg-[#1b3a5c] text-white' : 'border-slate-400 text-slate-500',
              )}>
                {choice.id}
              </span>
              <span className={cn('leading-relaxed', sel ? 'text-[#1b3a5c] font-medium' : 'text-slate-700')}>
                {choice.text}
              </span>
            </button>
          )
        })}
      </div>
    )

  } else if (currentQ.type === 'multi_select') {
    const msq = currentQ
    const selected = multiAnswers[msq.id] ?? []
    const toggleMulti = (choiceId: string) => {
      setMultiAnswers(prev => {
        const cur = prev[msq.id] ?? []
        let next: string[]
        if (cur.includes(choiceId)) {
          next = cur.filter(c => c !== choiceId)
        } else if (cur.length < msq.selectCount) {
          next = [...cur, choiceId]
        } else {
          next = [...cur.slice(1), choiceId]
        }
        return { ...prev, [msq.id]: next }
      })
    }
    questionContent = (
      <div>
        <p className="text-[12px] font-semibold text-[#1b3a5c] bg-[#eaf0f7] border border-[#b0cce0] rounded px-3 py-2 mb-4">
          Select <strong>{msq.selectCount}</strong> correct answers.{' '}
          {selected.length < msq.selectCount
            ? `(${msq.selectCount - selected.length} more needed)`
            : '✓ Selection complete'}
        </p>
        <div className="space-y-2.5">
          {msq.choices.map((choice) => {
            const sel = selected.includes(choice.id)
            return (
              <button
                key={choice.id}
                type="button"
                onClick={() => toggleMulti(choice.id)}
                className={cn(
                  'flex w-full items-start gap-3 rounded-lg border px-4 py-3 text-left text-[13px] transition-all cursor-pointer',
                  sel
                    ? 'border-[#1b3a5c] bg-[#eaf0f7]'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50',
                )}
              >
                <span className={cn(
                  'flex h-5 w-5 shrink-0 mt-0.5 items-center justify-center rounded border-2 text-[11px] font-bold transition-colors',
                  sel ? 'border-[#1b3a5c] bg-[#1b3a5c] text-white' : 'border-slate-400 text-slate-500',
                )}>
                  {sel ? '✓' : choice.id}
                </span>
                <span className={cn('leading-relaxed', sel ? 'text-[#1b3a5c] font-medium' : 'text-slate-700')}>
                  {choice.text}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    )

  } else if (currentQ.type === 'match') {
    const mq = currentQ
    const sel = matchAnswers[mq.id] ?? {}
    const placeTile = (itemId: string, catId: string) => {
      setMatchAnswers(prev => {
        const next = { ...(prev[mq.id] ?? {}), [itemId]: catId }
        return { ...prev, [mq.id]: next }
      })
    }
    const removeTile = (itemId: string) => {
      setMatchAnswers(prev => {
        const next = { ...(prev[mq.id] ?? {}) }
        delete next[itemId]
        return { ...prev, [mq.id]: next }
      })
    }
    const unplaced = mq.items.filter(item => !sel[item.id])
    questionContent = (
      <div>
        {/* Category boxes */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {mq.categories.map(cat => {
            const placed = mq.items.filter(item => sel[item.id] === cat.id)
            return (
              <div key={cat.id} className="rounded-lg border-2 border-[#1b3a5c] overflow-hidden">
                <div className="bg-[#1b3a5c] text-white text-[11px] font-bold text-center py-1.5 px-2 uppercase tracking-wide">
                  {cat.label}
                </div>
                <div className="bg-[#f0f5fa] min-h-[60px] p-2 space-y-1.5">
                  {placed.length === 0 && (
                    <p className="text-[11px] text-slate-400 italic text-center py-3">— empty —</p>
                  )}
                  {placed.map(item => (
                    <div key={item.id} className="flex items-start gap-1.5 bg-white rounded border border-[#b0cce0] px-2 py-1.5">
                      <span className="text-[11px] text-slate-700 leading-snug flex-1">{item.text}</span>
                      <button
                        type="button"
                        onClick={() => removeTile(item.id)}
                        aria-label="Remove"
                        className="shrink-0 text-slate-400 hover:text-red-500 ml-0.5"
                      >
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} className="h-3 w-3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
        {/* Unplaced tiles */}
        {unplaced.length > 0 ? (
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <p className="text-[10px] font-bold text-slate-500 mb-2 uppercase tracking-widest">
              Available — {unplaced.length} tile{unplaced.length !== 1 ? 's' : ''} remaining
            </p>
            <div className="space-y-2">
              {unplaced.map(item => (
                <div key={item.id} className="rounded border border-slate-300 bg-white p-2.5">
                  <p className="text-[12px] text-slate-800 leading-relaxed mb-2">
                    <span className="font-semibold text-slate-400 mr-1.5">{item.id}.</span>
                    {item.text}
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {mq.categories.map(cat => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => placeTile(item.id, cat.id)}
                        className="rounded border border-[#1b3a5c] px-2.5 py-1 text-[11px] font-semibold text-[#1b3a5c] hover:bg-[#1b3a5c] hover:text-white transition-colors"
                      >
                        → {cat.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-center text-[12px] font-semibold text-emerald-600 py-1">✓ All tiles placed</p>
        )}
      </div>
    )
  }

  // ── Bottom nav ─────────────────────────────────────────────────────────────
  const bottomNav = (
    <div className="shrink-0 flex items-center justify-between px-6 py-3 border-t border-slate-100 bg-white">
      <button
        onClick={handleBack}
        disabled={phase.globalIdx === 0}
        className="flex items-center gap-1.5 rounded border border-slate-200 bg-white px-4 py-2 text-[13px] font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Back
      </button>
      <button
        onClick={handleNext}
        className="flex items-center gap-1.5 rounded bg-[#1b3a5c] px-5 py-2 text-[13px] font-medium text-white hover:bg-[#142e4d] transition-colors"
      >
        Next
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </button>
    </div>
  )

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white overflow-hidden">

      {/* ── ATTENTION MODAL ───────────────────────────────────────────────── */}
      {showAttentionModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-xl max-w-sm w-full mx-4 overflow-hidden">
            <div className="bg-[#1b3a5c] px-6 py-4">
              <h2 className="text-lg font-bold text-white">Attention</h2>
            </div>
            <div className="px-6 py-5">
              <p className="text-[14px] text-slate-700 leading-relaxed">
                You must answer all parts of the question before you can continue. You might need to scroll down to see what is unanswered.
              </p>
            </div>
            <div className="px-6 pb-5 flex justify-end">
              <button
                type="button"
                onClick={() => setShowAttentionModal(false)}
                className="rounded bg-[#1b3a5c] px-6 py-2 text-[14px] font-semibold text-white hover:bg-[#142e4d] transition-colors"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── TOP NAV ──────────────────────────────────────────────────────── */}
      <NavBar
        onBack={handleBack}
        onNext={handleNext}
        canGoBack={phase.globalIdx > 0}
        timerEl={timerEl}
        showReview
        onReview={() => setPhase({ tag: 'end' })}
        showBookmark
        isBookmarked={isBookmarked}
        onBookmark={toggleBookmark}
        centerLabel={
          <span className="text-[11px] font-semibold tracking-widest uppercase text-white/90">
            {form.title}
            <span className="mx-2 text-white/30">/</span>
            {sectionLabel}
            {subType === 'reading_comprehension' && fq.passageId && passageNumberMap[fq.passageId] != null && (
              <>
                <span className="mx-2 text-white/30">/</span>
                PASSAGE {passageNumberMap[fq.passageId]} of {passageStarts.length}
              </>
            )}
            <span className="mx-2 text-white/30">/</span>
            Q {fq.globalNumber} of {totalQ}
          </span>
        }
      />

      {/* ── PROGRESS STRIP ───────────────────────────────────────────────── */}
      <div className="shrink-0 flex items-center justify-between h-9 px-4 bg-[#e8edf3] border-b border-slate-300">
        <span className="text-[11px] font-semibold text-slate-600">
          {subType === 'mathematics' ? 'Mathematics' : 'English Language Arts'}
          {subType === 'revising_editing_a' && (
            <span className="text-slate-400 font-normal"> — Revising &amp; Editing Part A</span>
          )}
          {subType === 'revising_editing_b' && (
            <span className="text-slate-400 font-normal"> — Revising &amp; Editing Part B</span>
          )}
          {subType === 'reading_comprehension' && fq.passageTitle && (
            <span className="text-slate-400 font-normal"> — {fq.passageTitle}</span>
          )}
        </span>
        <span className="text-[11px] text-slate-400">
          {answeredCount} of {totalQ} answered
        </span>
      </div>

      {/* ── MAIN ─────────────────────────────────────────────────────────── */}
      {isPassageLayout ? (
        <div className="flex-1 flex overflow-hidden">
          {/* Left: passage */}
          <div
            ref={passagePanelRef}
            className="w-1/2 overflow-y-auto bg-[#f9f8f4] border-r border-slate-200 px-8 py-7"
          >
            {fq.subType === 'revising_editing_a' && (
              <p className="text-[10px] font-bold tracking-widest uppercase text-violet-600 mb-2">
                Revising / Editing — Part A
              </p>
            )}
            <p className="text-[11px] font-medium text-slate-500 italic mb-5">
              Questions {fq.passageQStart}–{fq.passageQEnd} refer to the following passage.
            </p>
            <h2 className="text-sm font-bold text-slate-900 mb-1">{fq.passageTitle}</h2>
            {fq.passageAuthor && (
              <p className="text-xs text-slate-500 mb-5">by {fq.passageAuthor}</p>
            )}
            {fq.passageContentType === 'poem' && fq.passageLines ? (
              <PoemRenderer lines={fq.passageLines} />
            ) : fq.passageContentType === 'numbered_sentences' ? (
              <NumberedSentencePassage content={fq.passageContent ?? ''} />
            ) : (
              <div className="space-y-4">
                {(fq.passageContent ?? '').split('\n\n').filter(Boolean).map((p, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <span className="shrink-0 w-4 text-right text-[11px] text-slate-400 font-mono select-none mt-0.5 leading-[1.75]">
                      {i + 1}
                    </span>
                    <p className="text-[13px] text-slate-800 leading-[1.75] flex-1">{p}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: question */}
          <div className="w-1/2 flex flex-col overflow-hidden bg-white">
            <div className="flex-1 overflow-y-auto px-8 py-7">
              <p className="text-[11px] font-bold tracking-widest uppercase text-slate-400 mb-4">
                Question {fq.globalNumber}
              </p>
              <p className="text-[14px] text-slate-900 leading-relaxed font-medium mb-7 whitespace-pre-line">
                {currentQ.question}
              </p>
              {questionContent}
            </div>
            {bottomNav}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto px-8 py-8 bg-white">
            <div className="mx-auto max-w-2xl">
              <p className="text-[11px] font-bold tracking-widest uppercase text-slate-400 mb-4">
                Question {fq.globalNumber}
                {isMathLayout && (
                  <span className="ml-2 text-[10px] normal-case font-medium text-blue-600 tracking-normal">
                    Mathematics
                  </span>
                )}
                {subType === 'revising_editing_b' && (
                  <span className="ml-2 text-[10px] normal-case font-medium text-violet-600 tracking-normal">
                    Revising / Editing — Part B
                  </span>
                )}
              </p>
              <p className="text-[14px] text-slate-900 leading-relaxed font-medium mb-7">
                {currentQ.question}
              </p>
              {questionContent}
            </div>
          </div>
          {bottomNav}
        </div>
      )}
    </div>
  )
}
