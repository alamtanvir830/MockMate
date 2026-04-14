'use client'

import { useState } from 'react'
import { Input, Textarea, Select } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { createExam } from '@/app/actions/exams'

const STEPS = [
  { id: 1, label: 'Basics' },
  { id: 2, label: 'Content' },
  { id: 3, label: 'Format' },
  { id: 4, label: 'Friends' },
]

const formatOptions = [
  { value: 'multiple_choice', label: 'Multiple choice' },
  { value: 'short_answer', label: 'Short answer' },
  { value: 'essay', label: 'Essay / long form' },
  { value: 'mixed', label: 'Mixed' },
]

interface Friend {
  name: string
  email: string
}

export function CreateExamForm() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState('')

  // Form state
  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState('')
  const [examDate, setExamDate] = useState('')
  const [topics, setTopics] = useState('')
  const [subtopics, setSubtopics] = useState('')
  const [lectureContent, setLectureContent] = useState('')
  const [unlockDaysBefore, setUnlockDaysBefore] = useState('7')
  const [unlockDaysError, setUnlockDaysError] = useState('')
  const [format, setFormat] = useState('mixed')
  const [questionCount, setQuestionCount] = useState('20')
  const [questionCountError, setQuestionCountError] = useState('')
  const [pastPaperStyle, setPastPaperStyle] = useState('')
  const [additionalNotes, setAdditionalNotes] = useState('')
  const [friends, setFriends] = useState<Friend[]>([
    { name: '', email: '' },
    { name: '', email: '' },
    { name: '', email: '' },
  ])
  const [wantsAccountability, setWantsAccountability] = useState<boolean | null>(null)
  const [visibleFriends, setVisibleFriends] = useState(1)
  const [friendErrors, setFriendErrors] = useState<{ name: string; email: string }[]>([
    { name: '', email: '' },
    { name: '', email: '' },
    { name: '', email: '' },
  ])
  const [accountabilityChoiceError, setAccountabilityChoiceError] = useState('')

  function updateFriend(index: number, field: keyof Friend, value: string) {
    setFriends((prev) => {
      const next = [...prev]
      next[index] = { ...next[index], [field]: value }
      return next
    })
    // clear error on change
    setFriendErrors((prev) => {
      const next = [...prev]
      next[index] = { ...next[index], [field]: '' }
      return next
    })
  }

  function handleQuestionCountChange(val: string) {
    setQuestionCount(val)
    const n = parseInt(val, 10)
    if (!val || isNaN(n) || n < 1 || n > 99) {
      setQuestionCountError('Enter a number between 1 and 99')
    } else {
      setQuestionCountError('')
    }
  }

  function handleUnlockDaysChange(val: string) {
    setUnlockDaysBefore(val)
    const n = parseInt(val, 10)
    if (!val || isNaN(n) || n < 1 || n > 30) {
      setUnlockDaysError('Enter a number between 1 and 30')
    } else {
      setUnlockDaysError('')
    }
  }

  function handleAccountabilityChoice(choice: boolean) {
    setWantsAccountability(choice)
    setAccountabilityChoiceError('')
    if (choice) setVisibleFriends(1)
  }

  async function handleSubmit() {
    setLoading(true)
    setSubmitError('')

    // Validate step 4
    if (wantsAccountability === null) {
      setAccountabilityChoiceError('Please choose yes or no before continuing.')
      setLoading(false)
      return
    }

    if (wantsAccountability === true) {
      const errors = friendErrors.map((e) => ({ ...e }))
      let hasError = false
      for (let i = 0; i < visibleFriends; i++) {
        if (!friends[i].name.trim()) {
          errors[i].name = 'Name is required'
          hasError = true
        }
        if (!friends[i].email.trim()) {
          errors[i].email = 'Email is required'
          hasError = true
        } else if (!friends[i].email.includes('@')) {
          errors[i].email = 'Enter a valid email address'
          hasError = true
        }
      }
      setFriendErrors(errors)
      if (hasError) {
        setLoading(false)
        return
      }
    }

    const friendsToSend = wantsAccountability ? friends.slice(0, visibleFriends) : []

    const result = await createExam({
      title,
      subject,
      examDate,
      topics,
      subtopics,
      lectureContent,
      format,
      pastPaperStyle,
      additionalNotes,
      questionCount: parseInt(questionCount, 10),
      unlockDaysBefore: parseInt(unlockDaysBefore, 10),
      friends: friendsToSend,
    })

    if (result?.error) {
      setSubmitError(result.error)
      setLoading(false)
    }
    // on success, createExam calls redirect() — no further action needed
  }

  function canAdvance() {
    if (step === 1) {
      const days = parseInt(unlockDaysBefore, 10)
      return !!(title.trim() && subject.trim() && examDate && !isNaN(days) && days >= 1 && days <= 30)
    }
    if (step === 2) return !!topics.trim()
    if (step === 3) {
      const qc = parseInt(questionCount, 10)
      return !isNaN(qc) && qc >= 1 && qc <= 99
    }
    return true
  }

  return (
    <div className="space-y-6">
      {/* Step indicator */}
      <div className="flex items-center gap-0">
        {STEPS.map((s, i) => (
          <div key={s.id} className="flex items-center flex-1 last:flex-none">
            <button
              onClick={() => s.id < step && setStep(s.id)}
              className={cn(
                'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors',
                s.id === step
                  ? 'bg-indigo-600 text-white'
                  : s.id < step
                  ? 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200 cursor-pointer'
                  : 'bg-slate-100 text-slate-400 cursor-default',
              )}
            >
              {s.id < step ? (
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} className="h-3.5 w-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              ) : (
                s.id
              )}
            </button>
            <span
              className={cn(
                'ml-2 text-xs font-medium hidden sm:block',
                s.id === step ? 'text-indigo-700' : s.id < step ? 'text-indigo-500' : 'text-slate-400',
              )}
            >
              {s.label}
            </span>
            {i < STEPS.length - 1 && (
              <div
                className={cn(
                  'flex-1 h-0.5 mx-3',
                  s.id < step ? 'bg-indigo-200' : 'bg-slate-200',
                )}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step content */}
      <Card>
        {step === 1 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Basic information
              </h2>
              <p className="text-sm text-slate-500 mt-0.5">
                What exam are you preparing for?
              </p>
            </div>
            <Input
              label="Exam title"
              placeholder="e.g. Microeconomics Midterm 2026"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <Input
              label="Subject / Module"
              placeholder="e.g. Macroeconomics, Organic Chemistry"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
            <Input
              label="Exam date"
              type="date"
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
              required
            />
            <Input
              label="Days before exam to unlock"
              type="number"
              min={1}
              max={30}
              value={unlockDaysBefore}
              onChange={(e) => handleUnlockDaysChange(e.target.value)}
              error={unlockDaysError}
              hint={!unlockDaysError ? 'Your practice exam will be locked until this many days before the real exam (1–30)' : undefined}
            />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Exam content
              </h2>
              <p className="text-sm text-slate-500 mt-0.5">
                Describe what topics and material the exam covers.
              </p>
            </div>
            <Textarea
              label="Main topics"
              placeholder="e.g. Supply and demand, market equilibrium, price elasticity, consumer surplus..."
              value={topics}
              onChange={(e) => setTopics(e.target.value)}
              rows={3}
              hint="List the key topics the exam will cover"
              required
            />
            <Textarea
              label="Subtopics (optional)"
              placeholder="e.g. Cross-price elasticity, Giffen goods, deadweight loss..."
              value={subtopics}
              onChange={(e) => setSubtopics(e.target.value)}
              rows={3}
              hint="More specific concepts or subtopics"
            />
            <Textarea
              label="Lecture content / syllabus notes"
              placeholder="Paste in key lecture notes, summaries, or specific content your professor emphasized..."
              value={lectureContent}
              onChange={(e) => setLectureContent(e.target.value)}
              rows={5}
              hint="The more context you give, the more accurate your exam will be"
            />
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Exam format
              </h2>
              <p className="text-sm text-slate-500 mt-0.5">
                How should the practice exam be structured?
              </p>
            </div>
            <Select
              label="Question format"
              options={formatOptions}
              value={format}
              onChange={(e) => setFormat(e.target.value)}
            />
            <Input
              label="Number of questions"
              type="number"
              min={1}
              max={99}
              value={questionCount}
              onChange={(e) => handleQuestionCountChange(e.target.value)}
              error={questionCountError}
              hint={!questionCountError ? 'Choose between 1 and 99 questions' : undefined}
            />
            <Textarea
              label="Past paper style (optional)"
              placeholder="e.g. Questions are typically scenario-based, 5 marks each, expect one 20-mark essay question at the end..."
              value={pastPaperStyle}
              onChange={(e) => setPastPaperStyle(e.target.value)}
              rows={4}
              hint="Describe the style of past papers or your professor's typical exam format"
            />
            <Textarea
              label="Additional notes (optional)"
              placeholder="Anything else the AI should know about your exam or study situation..."
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              rows={3}
            />
          </div>
        )}

        {step === 4 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Accountability friends
              </h2>
              <p className="text-sm text-slate-500 mt-0.5">
                Would you like your score emailed to any friends for accountability?
              </p>
            </div>

            {/* Yes / No toggle */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => handleAccountabilityChoice(false)}
                className={cn(
                  'flex-1 rounded-lg border px-4 py-3 text-sm font-medium transition-colors',
                  wantsAccountability === false
                    ? 'border-slate-800 bg-slate-800 text-white'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50',
                )}
              >
                No, just me
              </button>
              <button
                type="button"
                onClick={() => handleAccountabilityChoice(true)}
                className={cn(
                  'flex-1 rounded-lg border px-4 py-3 text-sm font-medium transition-colors',
                  wantsAccountability === true
                    ? 'border-indigo-600 bg-indigo-600 text-white'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-200 hover:bg-indigo-50',
                )}
              >
                Yes, add friends
              </button>
            </div>

            {accountabilityChoiceError && (
              <p className="text-sm text-red-600">{accountabilityChoiceError}</p>
            )}

            {/* Friend fields — only when Yes */}
            {wantsAccountability === true && (
              <div className="space-y-4">
                <div className="rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800">
                  <strong>Why it works:</strong> Students who share results with
                  others study 40% more consistently. No hiding from a bad score!
                </div>

                {Array.from({ length: visibleFriends }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-slate-200 p-4 space-y-3"
                  >
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      Friend {i + 1}
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="space-y-1">
                        <Input
                          placeholder="Name"
                          value={friends[i].name}
                          onChange={(e) => updateFriend(i, 'name', e.target.value)}
                          className={friendErrors[i]?.name ? 'border-red-400 focus:ring-red-400' : ''}
                        />
                        {friendErrors[i]?.name && (
                          <p className="text-xs text-red-600">{friendErrors[i].name}</p>
                        )}
                      </div>
                      <div className="space-y-1">
                        <Input
                          type="email"
                          placeholder="Email"
                          value={friends[i].email}
                          onChange={(e) => updateFriend(i, 'email', e.target.value)}
                          className={friendErrors[i]?.email ? 'border-red-400 focus:ring-red-400' : ''}
                        />
                        {friendErrors[i]?.email && (
                          <p className="text-xs text-red-600">{friendErrors[i].email}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {visibleFriends < 3 && (
                  <button
                    type="button"
                    onClick={() => setVisibleFriends((v) => Math.min(v + 1, 3))}
                    className="flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
                  >
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add friend
                  </button>
                )}
              </div>
            )}

            {wantsAccountability === false && (
              <p className="text-sm text-slate-500">
                No problem — you can always add accountability friends later from your exam settings.
              </p>
            )}
          </div>
        )}
      </Card>

      {submitError && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {submitError}
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => setStep((s) => s - 1)}
          disabled={step === 1}
        >
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back
        </Button>

        {step < 4 ? (
          <Button
            onClick={() => setStep((s) => s + 1)}
            disabled={!canAdvance()}
          >
            Continue
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Button>
        ) : (
          <Button onClick={handleSubmit} loading={loading}>
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
            Generate exam with AI
          </Button>
        )}
      </div>
    </div>
  )
}
