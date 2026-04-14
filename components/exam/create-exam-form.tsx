'use client'

import { useState, useRef } from 'react'
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

const unlockDaysOptions = Array.from({ length: 30 }, (_, i) => ({
  value: String(i + 1),
  label: i === 0 ? '1 day before' : `${i + 1} days before`,
}))

const questionCountOptions = Array.from({ length: 99 }, (_, i) => ({
  value: String(i + 1),
  label: i === 0 ? '1 question' : `${i + 1} questions`,
}))

const formatOptions = [
  { value: 'multiple_choice', label: 'Multiple choice (recommended)' },
  { value: 'short_answer', label: 'Short answer' },
  { value: 'essay', label: 'Essay / long form' },
  { value: 'mixed', label: 'Mixed' },
]

const standardizedExamOptions = [
  { value: '', label: 'None / Not a standardized exam' },
  { value: 'usmle_step1', label: 'USMLE Step 1' },
  { value: 'usmle_step2_ck', label: 'USMLE Step 2 CK' },
  { value: 'mcat', label: 'MCAT' },
  { value: 'sat', label: 'SAT' },
  { value: 'neet', label: 'NEET (India)' },
  { value: 'other_standardized', label: 'Other standardized exam' },
]

const usmleStyleOptions = [
  { value: 'mixed_usmle', label: 'Mixed USMLE Step 1 style' },
  { value: 'clinical_vignette', label: 'Classic clinical vignette' },
  { value: 'basic_science_vignette', label: 'Basic science vignette' },
  { value: 'mechanism_based', label: 'Mechanism-based reasoning' },
  { value: 'multi_step_integration', label: 'Multi-step integration' },
  { value: 'lab_pathology', label: 'Lab / pathology interpretation' },
  { value: 'pharmacology_vignette', label: 'Pharmacology-focused vignette' },
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
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [isDragOver, setIsDragOver] = useState(false)
  const [extractionError, setExtractionError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [unlockDaysBefore, setUnlockDaysBefore] = useState('7')
  const [format, setFormat] = useState('multiple_choice')
  const [questionCount, setQuestionCount] = useState('20')
  const [pastPaperStyle, setPastPaperStyle] = useState('')
  const [additionalNotes, setAdditionalNotes] = useState('')
  const [standardizedExam, setStandardizedExam] = useState('')
  const [usmleStyle, setUsmleStyle] = useState('mixed_usmle')
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

  // Share exact exam with group
  const [sharedPeople, setSharedPeople] = useState<Friend[]>([
    { name: '', email: '' },
    { name: '', email: '' },
    { name: '', email: '' },
  ])
  const [wantsToShare, setWantsToShare] = useState<boolean | null>(null)
  const [visibleShared, setVisibleShared] = useState(1)
  const [sharedErrors, setSharedErrors] = useState<{ name: string; email: string }[]>([
    { name: '', email: '' },
    { name: '', email: '' },
    { name: '', email: '' },
  ])
  const [shareChoiceError, setShareChoiceError] = useState('')

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

  function addFiles(incoming: FileList | null) {
    if (!incoming) return
    setExtractionError('')
    const accepted = ['.pdf', '.docx', '.txt', '.md']
    const newFiles = Array.from(incoming).filter((f) => {
      const name = f.name.toLowerCase()
      return accepted.some((ext) => name.endsWith(ext))
    })
    setUploadedFiles((prev) => {
      const names = new Set(prev.map((f) => f.name))
      return [...prev, ...newFiles.filter((f) => !names.has(f.name))]
    })
  }

  function removeFile(name: string) {
    setUploadedFiles((prev) => prev.filter((f) => f.name !== name))
    setExtractionError('')
  }

  function updateSharedPerson(index: number, field: keyof Friend, value: string) {
    setSharedPeople((prev) => {
      const next = [...prev]
      next[index] = { ...next[index], [field]: value }
      return next
    })
    setSharedErrors((prev) => {
      const next = [...prev]
      next[index] = { ...next[index], [field]: '' }
      return next
    })
  }

  function handleShareChoice(choice: boolean) {
    setWantsToShare(choice)
    setShareChoiceError('')
    if (choice) setVisibleShared(1)
  }

  function handleAccountabilityChoice(choice: boolean) {
    setWantsAccountability(choice)
    setAccountabilityChoiceError('')
    if (choice) setVisibleFriends(1)
  }

  async function handleSubmit() {
    setLoading(true)
    setSubmitError('')
    setExtractionError('')

    // Extract text from uploaded files
    let lectureContent = ''
    if (uploadedFiles.length > 0) {
      try {
        const body = new FormData()
        uploadedFiles.forEach((f) => body.append('files', f))
        const res = await fetch('/api/extract-text', { method: 'POST', body })
        const json: { text: string; errors: string[] } = await res.json()
        lectureContent = json.text
        if (json.errors.length > 0) {
          setExtractionError(`Some files could not be read: ${json.errors.join(', ')}`)
        }
      } catch {
        setSubmitError('Failed to read uploaded files. Please try again.')
        setLoading(false)
        return
      }
    }

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

    // Validate shared group
    if (wantsToShare === null) {
      setShareChoiceError('Please choose yes or no before continuing.')
      setLoading(false)
      return
    }

    if (wantsToShare === true) {
      const errors = sharedErrors.map((e) => ({ ...e }))
      let hasError = false
      for (let i = 0; i < visibleShared; i++) {
        if (!sharedPeople[i].name.trim()) {
          errors[i].name = 'Name is required'
          hasError = true
        }
        if (!sharedPeople[i].email.trim()) {
          errors[i].email = 'Email is required'
          hasError = true
        } else if (!sharedPeople[i].email.includes('@')) {
          errors[i].email = 'Enter a valid email address'
          hasError = true
        }
      }
      setSharedErrors(errors)
      if (hasError) {
        setLoading(false)
        return
      }
    }

    const sharedWithToSend = wantsToShare ? sharedPeople.slice(0, visibleShared) : []

    const result = await createExam({
      title,
      subject,
      examDate,
      topics,
      subtopics,
      lectureContent, // populated from uploaded files above
      format,
      pastPaperStyle,
      additionalNotes,
      questionCount: parseInt(questionCount, 10),
      unlockDaysBefore: parseInt(unlockDaysBefore, 10),
      friends: friendsToSend,
      sharedWith: sharedWithToSend,
      standardizedExam: standardizedExam || undefined,
      usmleStyle: standardizedExam === 'usmle_step1' ? usmleStyle : undefined,
    })

    if (result?.error) {
      setSubmitError(result.error)
      setLoading(false)
    }
    // on success, createExam calls redirect() — no further action needed
  }

  function canAdvance() {
    if (step === 1) {
      return !!(title.trim() && subject.trim() && examDate)
    }
    if (step === 2) return !!topics.trim()
    if (step === 3) return true
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
            <Select
              label="Days before exam to unlock"
              options={unlockDaysOptions}
              value={unlockDaysBefore}
              onChange={(e) => setUnlockDaysBefore(e.target.value)}
              hint="Your practice exam will be locked until this many days before the real exam"
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
            {/* File upload */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-700">
                Lecture content / syllabus notes
              </label>

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.docx,.txt,.md"
                className="hidden"
                onChange={(e) => addFiles(e.target.files)}
              />

              {/* Drop zone */}
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setIsDragOver(true) }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault()
                  setIsDragOver(false)
                  addFiles(e.dataTransfer.files)
                }}
                className={cn(
                  'cursor-pointer rounded-lg border-2 border-dashed px-6 py-8 text-center transition-colors',
                  isDragOver
                    ? 'border-indigo-400 bg-indigo-50'
                    : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50',
                )}
              >
                <div className="flex flex-col items-center gap-2">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="h-8 w-8 text-slate-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                  </svg>
                  <p className="text-sm font-medium text-slate-700">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-slate-400">
                    PDF, DOCX, TXT, MD — up to 10 MB per file
                  </p>
                </div>
              </div>

              {/* File list */}
              {uploadedFiles.length > 0 && (
                <ul className="mt-2 space-y-2">
                  {uploadedFiles.map((file) => (
                    <li
                      key={file.name}
                      className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="h-4 w-4 shrink-0 text-slate-400">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                        <span className="text-sm text-slate-700 truncate">{file.name}</span>
                        <span className="text-xs text-slate-400 shrink-0">
                          {file.size < 1024 * 1024
                            ? `${Math.round(file.size / 1024)} KB`
                            : `${(file.size / (1024 * 1024)).toFixed(1)} MB`}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(file.name)}
                        className="shrink-0 text-slate-400 hover:text-red-500 transition-colors"
                        aria-label={`Remove ${file.name}`}
                      >
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {extractionError && (
                <p className="text-xs text-amber-600">{extractionError}</p>
              )}

              <p className="text-xs text-slate-500">
                Upload your lecture notes, slides, or syllabus. The more content you provide, the more accurate your exam will be.
              </p>
            </div>
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
            <Select
              label="Number of questions"
              options={questionCountOptions}
              value={questionCount}
              onChange={(e) => setQuestionCount(e.target.value)}
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

            {/* Standardized exam — optional enhancement */}
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 space-y-4">
              <div>
                <p className="text-sm font-medium text-slate-700">
                  Standardized exam targeting{' '}
                  <span className="ml-1 inline-flex items-center rounded-full bg-slate-200 px-2 py-0.5 text-xs font-medium text-slate-500">
                    Optional
                  </span>
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  If you are preparing for a standardized exam, select it here to tailor the question style.
                </p>
              </div>
              <Select
                label=""
                options={standardizedExamOptions}
                value={standardizedExam}
                onChange={(e) => {
                  setStandardizedExam(e.target.value)
                  if (e.target.value !== 'usmle_step1') setUsmleStyle('mixed_usmle')
                }}
              />
              {standardizedExam === 'usmle_step1' && (
                <Select
                  label="Question style preference"
                  options={usmleStyleOptions}
                  value={usmleStyle}
                  onChange={(e) => setUsmleStyle(e.target.value)}
                  hint="Controls how questions are written — defaults to mixed if unsure"
                />
              )}
            </div>
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

            {/* ── Divider ── */}
            <div className="border-t border-slate-100 pt-5 mt-2">
              <div>
                <h2 className="text-base font-semibold text-slate-900">
                  Share this exam with a group
                </h2>
                <p className="text-sm text-slate-500 mt-0.5">
                  Would you like to share this same exact exam with anyone else?
                </p>
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => handleShareChoice(false)}
                  className={cn(
                    'flex-1 rounded-lg border px-4 py-3 text-sm font-medium transition-colors',
                    wantsToShare === false
                      ? 'border-slate-800 bg-slate-800 text-white'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50',
                  )}
                >
                  No, just me
                </button>
                <button
                  type="button"
                  onClick={() => handleShareChoice(true)}
                  className={cn(
                    'flex-1 rounded-lg border px-4 py-3 text-sm font-medium transition-colors',
                    wantsToShare === true
                      ? 'border-indigo-600 bg-indigo-600 text-white'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-200 hover:bg-indigo-50',
                  )}
                >
                  Yes, share with group
                </button>
              </div>

              {shareChoiceError && (
                <p className="text-sm text-red-600 mt-2">{shareChoiceError}</p>
              )}

              {wantsToShare === true && (
                <div className="space-y-4 mt-4">
                  <div className="rounded-lg bg-indigo-50 border border-indigo-200 px-4 py-3 text-sm text-indigo-800">
                    These people will be linked to the exact same generated exam — so they can access or take the same questions you created.
                  </div>

                  {Array.from({ length: visibleShared }).map((_, i) => (
                    <div
                      key={i}
                      className="rounded-lg border border-slate-200 p-4 space-y-3"
                    >
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                        Person {i + 1}
                      </p>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="space-y-1">
                          <Input
                            placeholder="Name"
                            value={sharedPeople[i].name}
                            onChange={(e) => updateSharedPerson(i, 'name', e.target.value)}
                            className={sharedErrors[i]?.name ? 'border-red-400 focus:ring-red-400' : ''}
                          />
                          {sharedErrors[i]?.name && (
                            <p className="text-xs text-red-600">{sharedErrors[i].name}</p>
                          )}
                        </div>
                        <div className="space-y-1">
                          <Input
                            type="email"
                            placeholder="Email"
                            value={sharedPeople[i].email}
                            onChange={(e) => updateSharedPerson(i, 'email', e.target.value)}
                            className={sharedErrors[i]?.email ? 'border-red-400 focus:ring-red-400' : ''}
                          />
                          {sharedErrors[i]?.email && (
                            <p className="text-xs text-red-600">{sharedErrors[i].email}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {visibleShared < 3 && (
                    <button
                      type="button"
                      onClick={() => setVisibleShared((v) => Math.min(v + 1, 3))}
                      className="flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
                    >
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                      Add person
                    </button>
                  )}
                </div>
              )}

              {wantsToShare === false && (
                <p className="text-sm text-slate-500 mt-3">
                  Only you will have access to this exam.
                </p>
              )}
            </div>
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
