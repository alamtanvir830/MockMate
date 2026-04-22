'use client'

import { useState, useRef } from 'react'
import { Input, Textarea, Select } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { createExam } from '@/app/actions/exams'
import type { AdvancedCustomization } from '@/app/actions/exams'

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
  { value: 'shsat', label: 'SHSAT (NYC)' },
  { value: 'neet', label: 'NEET (India)' },
  { value: 'other_standardized', label: 'Other standardized exam' },
]

const usmleStyleOptions = [
  { value: 'clinical_vignette', label: 'Classic clinical vignette' },
  { value: 'basic_science_vignette', label: 'Basic science vignette' },
  { value: 'mechanism_based', label: 'Mechanism-based reasoning' },
  { value: 'multi_step_integration', label: 'Multi-step integration' },
  { value: 'lab_pathology', label: 'Lab / pathology interpretation' },
  { value: 'pharmacology_vignette', label: 'Pharmacology-focused vignette' },
  { value: 'mixed_usmle', label: 'Mixed USMLE Step 1 style' },
]

interface Friend {
  name: string
  email: string
}

const DEFAULT_ADV: AdvancedCustomization = {
  recall: '', understanding: '', application: '', multiStep: '',
  styleShort: '', styleScenario: '', styleProblem: '', styleConceptual: '',
  lenVeryShort: '', lenMedium: '', lenLong: '',
  overallDifficulty: '',
  distEasy: '', distMedium: '', distHard: '',
  trickiness: '', trickinessPercent: '',
  answerSimilarity: '',
  answerChoiceCount: '',
  questionSources: [],
  repetition: '',
  topicIntegration: '',
  calcIntensity: '',
  visuals: [],
  professorStyle: '',
  commonMistakes: '',
  highYieldTopics: '',
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
  const [usmleStyles, setUsmleStyles] = useState<string[]>([])
  const [isTimed, setIsTimed] = useState(false)
  const [timeLimitMinutes, setTimeLimitMinutes] = useState('60')
  const [isAdaptive, setIsAdaptive] = useState(true)
  const [groupMessage, setGroupMessage] = useState('')
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
  const [sharedPeople, setSharedPeople] = useState<Friend[]>([{ name: '', email: '' }])
  const [wantsToShare, setWantsToShare] = useState<boolean | null>(null)
  const [sharedErrors, setSharedErrors] = useState<{ name: string; email: string }[]>([
    { name: '', email: '' },
  ])
  const [shareChoiceError, setShareChoiceError] = useState('')

  // Advanced customization
  const [advOpen, setAdvOpen] = useState(false)
  const [adv, setAdv] = useState<AdvancedCustomization>(DEFAULT_ADV)
  const [advExtraFiles, setAdvExtraFiles] = useState<File[]>([])
  const advExtraFilesRef = useRef<HTMLInputElement>(null)

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
      if (next[index]) next[index] = { ...next[index], [field]: '' }
      return next
    })
  }

  function addSharedPerson() {
    setSharedPeople((prev) => [...prev, { name: '', email: '' }])
    setSharedErrors((prev) => [...prev, { name: '', email: '' }])
  }

  function removeSharedPerson(index: number) {
    setSharedPeople((prev) => prev.filter((_, i) => i !== index))
    setSharedErrors((prev) => prev.filter((_, i) => i !== index))
  }

  function updateAdv<K extends keyof AdvancedCustomization>(key: K, val: AdvancedCustomization[K]) {
    setAdv((prev) => ({ ...prev, [key]: val }))
  }

  function toggleAdvMulti(key: 'questionSources' | 'visuals', value: string) {
    setAdv((prev) => ({
      ...prev,
      [key]: (prev[key] as string[]).includes(value)
        ? (prev[key] as string[]).filter((v) => v !== value)
        : [...(prev[key] as string[]), value],
    }))
  }

  function pctSum(vals: string[]): number {
    return vals.reduce((s, v) => s + (parseInt(v, 10) || 0), 0)
  }

  function pctFilled(vals: string[]): boolean {
    return vals.some((v) => v.trim() !== '')
  }

  function addAdvExtraFiles(incoming: FileList | null) {
    if (!incoming) return
    const accepted = ['.pdf', '.docx', '.txt', '.md']
    const newFiles = Array.from(incoming).filter((f) =>
      accepted.some((ext) => f.name.toLowerCase().endsWith(ext)),
    )
    setAdvExtraFiles((prev) => {
      const names = new Set(prev.map((f) => f.name))
      return [...prev, ...newFiles.filter((f) => !names.has(f.name))]
    })
  }

  function handleShareChoice(choice: boolean) {
    setWantsToShare(choice)
    setShareChoiceError('')
    if (choice) { setSharedPeople([{ name: '', email: '' }]); setSharedErrors([{ name: '', email: '' }]) }
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

    // Extract text from advanced customization extra source files and append
    if (advExtraFiles.length > 0) {
      try {
        const body = new FormData()
        advExtraFiles.forEach((f) => body.append('files', f))
        const res = await fetch('/api/extract-text', { method: 'POST', body })
        const json: { text: string; errors: string[] } = await res.json()
        if (json.text) {
          lectureContent = lectureContent
            ? `${lectureContent}\n\n--- Additional source material ---\n${json.text}`
            : json.text
        }
      } catch {
        // Non-fatal — skip extra files if extraction fails
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
      // Filter to rows that have any content
      const filledRows = sharedPeople.filter(
        (p) => p.name.trim() || p.email.trim(),
      )
      if (filledRows.length === 0) {
        setShareChoiceError('Please add at least one person to share with.')
        setLoading(false)
        return
      }
      // Validate filled rows
      const errors = sharedPeople.map((p) => {
        const e = { name: '', email: '' }
        if (!p.name.trim() && !p.email.trim()) return e // fully empty row — skip
        if (!p.name.trim()) e.name = 'Name is required'
        if (!p.email.trim()) {
          e.email = 'Email is required'
        } else if (!p.email.includes('@')) {
          e.email = 'Enter a valid email address'
        }
        return e
      })
      const hasError = errors.some((e) => e.name || e.email)
      setSharedErrors(errors)
      if (hasError) {
        setLoading(false)
        return
      }
    }

    // Only send rows that have both name and email filled
    const sharedWithToSend = wantsToShare
      ? sharedPeople.filter((p) => p.name.trim() && p.email.trim())
      : []

    // Validate advanced customization percentage sections
    const pctSections: { label: string; vals: string[] }[] = [
      { label: 'Thinking level breakdown', vals: [adv.recall, adv.understanding, adv.application, adv.multiStep] },
      { label: 'Question style breakdown', vals: [adv.styleShort, adv.styleScenario, adv.styleProblem, adv.styleConceptual] },
      { label: 'Question length breakdown', vals: [adv.lenVeryShort, adv.lenMedium, adv.lenLong] },
      { label: 'Difficulty distribution', vals: [adv.distEasy, adv.distMedium, adv.distHard] },
    ]
    for (const sec of pctSections) {
      if (pctFilled(sec.vals) && pctSum(sec.vals) !== 100) {
        setSubmitError(
          `"${sec.label}" percentages add up to ${pctSum(sec.vals)}% — they must equal 100. Please fix this in Advanced customization.`,
        )
        setLoading(false)
        return
      }
    }
    if (adv.trickinessPercent) {
      const tp = parseInt(adv.trickinessPercent, 10)
      if (isNaN(tp) || tp < 0 || tp > 100) {
        setSubmitError('Trickiness percentage must be between 0 and 100.')
        setLoading(false)
        return
      }
    }

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
      usmleStyles: standardizedExam === 'usmle_step1' ? usmleStyles : undefined,
      timeLimitMinutes: isTimed ? parseInt(timeLimitMinutes, 10) : null,
      groupMessage: wantsToShare ? groupMessage.trim() || null : null,
      adaptiveMode: standardizedExam === 'shsat' ? isAdaptive : undefined,
      advancedCustomization: adv,
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
              hint="Your practice exam will be locked until this many days before the real exam. To take it right away, set this to a number greater than or equal to the days remaining until your exam date."
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

            {/* Time limit — optional */}
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 space-y-4">
              <div>
                <p className="text-sm font-medium text-slate-700">
                  Time limit{' '}
                  <span className="ml-1 inline-flex items-center rounded-full bg-slate-200 px-2 py-0.5 text-xs font-medium text-slate-500">
                    Optional
                  </span>
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Set a countdown timer for when you take this exam.
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsTimed(false)}
                  className={cn(
                    'flex-1 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors',
                    !isTimed
                      ? 'border-slate-800 bg-slate-800 text-white'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50',
                  )}
                >
                  No limit
                </button>
                <button
                  type="button"
                  onClick={() => setIsTimed(true)}
                  className={cn(
                    'flex-1 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors',
                    isTimed
                      ? 'border-indigo-600 bg-indigo-600 text-white'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-200 hover:bg-indigo-50',
                  )}
                >
                  Timed
                </button>
              </div>
              {isTimed && (
                <Input
                  label="Time limit (minutes)"
                  type="number"
                  min="5"
                  max="300"
                  value={timeLimitMinutes}
                  onChange={(e) => setTimeLimitMinutes(e.target.value)}
                  hint="Minimum 5 minutes, maximum 300 minutes"
                />
              )}
            </div>

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
                  if (e.target.value !== 'usmle_step1') setUsmleStyles([])
                  if (e.target.value === 'shsat') setIsAdaptive(true)
                }}
              />
              {standardizedExam === 'usmle_step1' && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-700">
                    Question style preference{' '}
                    <span className="text-slate-400 font-normal">(select all that apply)</span>
                  </p>
                  <div className="space-y-2">
                    {usmleStyleOptions.map((opt) => {
                      const checked = usmleStyles.includes(opt.value)
                      return (
                        <label
                          key={opt.value}
                          className={cn(
                            'flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 transition-colors',
                            checked
                              ? 'border-indigo-300 bg-indigo-50'
                              : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50',
                          )}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() =>
                              setUsmleStyles((prev) =>
                                checked
                                  ? prev.filter((v) => v !== opt.value)
                                  : [...prev, opt.value],
                              )
                            }
                            className="h-4 w-4 rounded border-slate-300 text-indigo-600 accent-indigo-600"
                          />
                          <span className="text-sm text-slate-700">{opt.label}</span>
                        </label>
                      )
                    })}
                  </div>
                  <p className="text-xs text-slate-400">
                    If nothing is selected, questions will default to Mixed USMLE Step 1 style.
                  </p>
                </div>
              )}

              {standardizedExam === 'shsat' && (
                <div className="rounded-lg border border-indigo-200 bg-indigo-50 p-4 space-y-3">
                  <div>
                    <p className="text-sm font-semibold text-indigo-900">
                      SHSAT Adaptive Mode (2026 format)
                    </p>
                    <p className="text-xs text-indigo-700 mt-0.5">
                      Questions are tagged easy / medium / hard. During the exam, the difficulty
                      adjusts based on your answers — correct responses unlock harder questions,
                      incorrect responses step down to easier ones.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsAdaptive((v) => !v)}
                    className={cn(
                      'flex w-full items-center justify-between rounded-lg border px-4 py-3 text-sm font-medium transition-colors',
                      isAdaptive
                        ? 'border-indigo-400 bg-indigo-600 text-white'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-200 hover:bg-indigo-50',
                    )}
                  >
                    <span>Enable adaptive mode</span>
                    <span
                      className={cn(
                        'ml-3 inline-flex h-5 w-9 shrink-0 rounded-full border-2 transition-colors',
                        isAdaptive
                          ? 'border-indigo-300 bg-white/30'
                          : 'border-slate-300 bg-slate-200',
                      )}
                    >
                      <span
                        className={cn(
                          'inline-block h-full w-4 rounded-full bg-white shadow transition-transform',
                          isAdaptive ? 'translate-x-4' : 'translate-x-0',
                        )}
                      />
                    </span>
                  </button>
                  {!isAdaptive && (
                    <p className="text-xs text-indigo-700">
                      Adaptive mode is off — questions will be generated but presented in a fixed order.
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* ── Advanced customization ── */}
            <div className="rounded-lg border border-slate-200 bg-slate-50 overflow-hidden">
              <button
                type="button"
                onClick={() => setAdvOpen((v) => !v)}
                className="flex w-full items-center justify-between px-4 py-3 text-left hover:bg-slate-100 transition-colors"
              >
                <div>
                  <p className="text-sm font-medium text-slate-700">
                    Advanced customization{' '}
                    <span className="ml-1 inline-flex items-center rounded-full bg-slate-200 px-2 py-0.5 text-xs font-medium text-slate-500">
                      Optional
                    </span>
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Fine-tune cognitive levels, difficulty, trickiness, style, and more
                  </p>
                </div>
                <svg
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                  className={cn('h-4 w-4 shrink-0 text-slate-400 transition-transform', advOpen && 'rotate-180')}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              {advOpen && (
                <div className="px-4 pb-5 pt-1 space-y-6 border-t border-slate-200 bg-white">

                  {/* ── GROUP 1: Cognitive & Difficulty ── */}
                  <div className="space-y-4 pt-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Cognitive levels &amp; difficulty</p>

                    {/* Thinking levels */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">
                        Thinking level breakdown{' '}
                        <span className="font-normal text-slate-400 text-xs">(% of questions — must add to 100 if filled)</span>
                      </label>
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                        {[
                          { key: 'recall' as const, label: 'Recall' },
                          { key: 'understanding' as const, label: 'Understanding' },
                          { key: 'application' as const, label: 'Application' },
                          { key: 'multiStep' as const, label: 'Multi-step' },
                        ].map(({ key, label }) => (
                          <div key={key} className="space-y-1">
                            <label className="text-xs text-slate-500">{label}</label>
                            <div className="flex items-center gap-1">
                              <input
                                type="number" min="0" max="100"
                                placeholder="0"
                                value={adv[key]}
                                onChange={(e) => updateAdv(key, e.target.value)}
                                className="w-full rounded-md border border-slate-200 px-2 py-1.5 text-sm focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                              />
                              <span className="text-xs text-slate-400">%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      {pctFilled([adv.recall, adv.understanding, adv.application, adv.multiStep]) && (
                        <p className={cn('text-xs', pctSum([adv.recall, adv.understanding, adv.application, adv.multiStep]) === 100 ? 'text-emerald-600' : 'text-amber-600')}>
                          Sum: {pctSum([adv.recall, adv.understanding, adv.application, adv.multiStep])}%
                          {pctSum([adv.recall, adv.understanding, adv.application, adv.multiStep]) !== 100 && ' — must equal 100'}
                        </p>
                      )}
                    </div>

                    {/* Overall difficulty */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Overall difficulty</label>
                      <div className="flex flex-wrap gap-2">
                        {['Easy', 'Medium', 'Hard', 'Mixed'].map((opt) => (
                          <button
                            key={opt} type="button"
                            onClick={() => updateAdv('overallDifficulty', adv.overallDifficulty === opt ? '' : opt)}
                            className={cn(
                              'rounded-lg border px-4 py-2 text-sm font-medium transition-colors',
                              adv.overallDifficulty === opt
                                ? 'border-indigo-600 bg-indigo-600 text-white'
                                : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-200 hover:bg-indigo-50',
                            )}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Difficulty distribution */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">
                        Difficulty distribution{' '}
                        <span className="font-normal text-slate-400 text-xs">(% — must add to 100 if filled)</span>
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { key: 'distEasy' as const, label: 'Easy' },
                          { key: 'distMedium' as const, label: 'Medium' },
                          { key: 'distHard' as const, label: 'Hard' },
                        ].map(({ key, label }) => (
                          <div key={key} className="space-y-1">
                            <label className="text-xs text-slate-500">{label}</label>
                            <div className="flex items-center gap-1">
                              <input
                                type="number" min="0" max="100"
                                placeholder="0"
                                value={adv[key]}
                                onChange={(e) => updateAdv(key, e.target.value)}
                                className="w-full rounded-md border border-slate-200 px-2 py-1.5 text-sm focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                              />
                              <span className="text-xs text-slate-400">%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      {pctFilled([adv.distEasy, adv.distMedium, adv.distHard]) && (
                        <p className={cn('text-xs', pctSum([adv.distEasy, adv.distMedium, adv.distHard]) === 100 ? 'text-emerald-600' : 'text-amber-600')}>
                          Sum: {pctSum([adv.distEasy, adv.distMedium, adv.distHard])}%
                          {pctSum([adv.distEasy, adv.distMedium, adv.distHard]) !== 100 && ' — must equal 100'}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* ── GROUP 2: Question Style ── */}
                  <div className="space-y-4 border-t border-slate-100 pt-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Question style &amp; length</p>

                    {/* Style breakdown */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">
                        Question style breakdown{' '}
                        <span className="font-normal text-slate-400 text-xs">(% — must add to 100 if filled)</span>
                      </label>
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                        {[
                          { key: 'styleShort' as const, label: 'Short/Direct' },
                          { key: 'styleScenario' as const, label: 'Scenario' },
                          { key: 'styleProblem' as const, label: 'Problem-solving' },
                          { key: 'styleConceptual' as const, label: 'Conceptual' },
                        ].map(({ key, label }) => (
                          <div key={key} className="space-y-1">
                            <label className="text-xs text-slate-500">{label}</label>
                            <div className="flex items-center gap-1">
                              <input
                                type="number" min="0" max="100"
                                placeholder="0"
                                value={adv[key]}
                                onChange={(e) => updateAdv(key, e.target.value)}
                                className="w-full rounded-md border border-slate-200 px-2 py-1.5 text-sm focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                              />
                              <span className="text-xs text-slate-400">%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      {pctFilled([adv.styleShort, adv.styleScenario, adv.styleProblem, adv.styleConceptual]) && (
                        <p className={cn('text-xs', pctSum([adv.styleShort, adv.styleScenario, adv.styleProblem, adv.styleConceptual]) === 100 ? 'text-emerald-600' : 'text-amber-600')}>
                          Sum: {pctSum([adv.styleShort, adv.styleScenario, adv.styleProblem, adv.styleConceptual])}%
                          {pctSum([adv.styleShort, adv.styleScenario, adv.styleProblem, adv.styleConceptual]) !== 100 && ' — must equal 100'}
                        </p>
                      )}
                    </div>

                    {/* Length breakdown */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">
                        Question length breakdown{' '}
                        <span className="font-normal text-slate-400 text-xs">(% — must add to 100 if filled)</span>
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { key: 'lenVeryShort' as const, label: 'Very short (≤30w)' },
                          { key: 'lenMedium' as const, label: 'Medium (31–80w)' },
                          { key: 'lenLong' as const, label: 'Long (80w+)' },
                        ].map(({ key, label }) => (
                          <div key={key} className="space-y-1">
                            <label className="text-xs text-slate-500">{label}</label>
                            <div className="flex items-center gap-1">
                              <input
                                type="number" min="0" max="100"
                                placeholder="0"
                                value={adv[key]}
                                onChange={(e) => updateAdv(key, e.target.value)}
                                className="w-full rounded-md border border-slate-200 px-2 py-1.5 text-sm focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                              />
                              <span className="text-xs text-slate-400">%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      {pctFilled([adv.lenVeryShort, adv.lenMedium, adv.lenLong]) && (
                        <p className={cn('text-xs', pctSum([adv.lenVeryShort, adv.lenMedium, adv.lenLong]) === 100 ? 'text-emerald-600' : 'text-amber-600')}>
                          Sum: {pctSum([adv.lenVeryShort, adv.lenMedium, adv.lenLong])}%
                          {pctSum([adv.lenVeryShort, adv.lenMedium, adv.lenLong]) !== 100 && ' — must equal 100'}
                        </p>
                      )}
                    </div>

                    {/* Answer choice count */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Answer choices per question</label>
                      <div className="flex gap-2">
                        {['3', '4', '5'].map((n) => (
                          <button
                            key={n} type="button"
                            onClick={() => updateAdv('answerChoiceCount', adv.answerChoiceCount === n ? '' : n)}
                            className={cn(
                              'flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition-colors',
                              adv.answerChoiceCount === n
                                ? 'border-indigo-600 bg-indigo-600 text-white'
                                : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-200 hover:bg-indigo-50',
                            )}
                          >
                            {n} choices
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Answer choice similarity */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Answer choice similarity</label>
                      <div className="flex flex-wrap gap-2">
                        {['Clearly distinct', 'Moderately similar', 'Highly similar'].map((opt) => (
                          <button
                            key={opt} type="button"
                            onClick={() => updateAdv('answerSimilarity', adv.answerSimilarity === opt ? '' : opt)}
                            className={cn(
                              'rounded-lg border px-4 py-2 text-sm font-medium transition-colors',
                              adv.answerSimilarity === opt
                                ? 'border-indigo-600 bg-indigo-600 text-white'
                                : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-200 hover:bg-indigo-50',
                            )}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* ── GROUP 3: Trickiness ── */}
                  <div className="space-y-4 border-t border-slate-100 pt-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Trickiness</p>

                    <div className="space-y-3">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Trickiness level</label>
                        <div className="flex gap-2">
                          {['Low', 'Medium', 'High'].map((opt) => (
                            <button
                              key={opt} type="button"
                              onClick={() => updateAdv('trickiness', adv.trickiness === opt ? '' : opt)}
                              className={cn(
                                'flex-1 rounded-lg border px-4 py-2 text-sm font-medium transition-colors',
                                adv.trickiness === opt
                                  ? 'border-indigo-600 bg-indigo-600 text-white'
                                  : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-200 hover:bg-indigo-50',
                              )}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                        <p className="text-xs text-slate-400">
                          High trickiness = questions that target common misconceptions, near-identical answer choices, or subtle distinctions
                        </p>
                      </div>

                      {adv.trickiness && (
                        <div className="space-y-1">
                          <label className="text-sm font-medium text-slate-700">
                            % of questions that should be tricky{' '}
                            <span className="font-normal text-slate-400">(optional)</span>
                          </label>
                          <div className="flex items-center gap-2 max-w-xs">
                            <input
                              type="number" min="0" max="100"
                              placeholder="e.g. 30"
                              value={adv.trickinessPercent}
                              onChange={(e) => updateAdv('trickinessPercent', e.target.value)}
                              className="w-full rounded-md border border-slate-200 px-3 py-1.5 text-sm focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                            />
                            <span className="text-sm text-slate-400">%</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* ── GROUP 4: Structure & Sources ── */}
                  <div className="space-y-4 border-t border-slate-100 pt-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Structure &amp; sources</p>

                    {/* Question sources */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">
                        Preferred question sources{' '}
                        <span className="font-normal text-slate-400 text-xs">(select all that apply)</span>
                      </label>
                      <div className="space-y-2">
                        {[
                          { value: 'Lectures only', label: 'Lectures / class notes only' },
                          { value: 'Past papers', label: 'Past exam papers' },
                          { value: 'Textbook', label: 'Textbook content' },
                          { value: 'Real exam bank', label: 'Official exam bank style' },
                        ].map(({ value, label }) => {
                          const checked = adv.questionSources.includes(value)
                          return (
                            <label
                              key={value}
                              className={cn(
                                'flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 transition-colors',
                                checked ? 'border-indigo-300 bg-indigo-50' : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50',
                              )}
                            >
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => toggleAdvMulti('questionSources', value)}
                                className="h-4 w-4 rounded border-slate-300 text-indigo-600 accent-indigo-600"
                              />
                              <span className="text-sm text-slate-700">{label}</span>
                            </label>
                          )
                        })}
                      </div>
                    </div>

                    {/* Extra source files */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">
                        Additional source files{' '}
                        <span className="font-normal text-slate-400 text-xs">(optional — e.g. past papers, textbook excerpts)</span>
                      </label>
                      <input
                        ref={advExtraFilesRef}
                        type="file"
                        multiple
                        accept=".pdf,.docx,.txt,.md"
                        className="hidden"
                        onChange={(e) => addAdvExtraFiles(e.target.files)}
                      />
                      <button
                        type="button"
                        onClick={() => advExtraFilesRef.current?.click()}
                        className="flex items-center gap-2 rounded-lg border border-dashed border-slate-200 px-4 py-3 text-sm text-slate-600 hover:border-indigo-300 hover:bg-indigo-50 transition-colors w-full justify-center"
                      >
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="h-4 w-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                        </svg>
                        Upload files
                      </button>
                      {advExtraFiles.length > 0 && (
                        <ul className="space-y-1.5">
                          {advExtraFiles.map((f) => (
                            <li key={f.name} className="flex items-center justify-between gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-2">
                              <span className="text-sm text-slate-700 truncate">{f.name}</span>
                              <button
                                type="button"
                                onClick={() => setAdvExtraFiles((prev) => prev.filter((x) => x.name !== f.name))}
                                className="shrink-0 text-slate-400 hover:text-red-500 transition-colors"
                              >
                                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* Topic repetition */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Topic repetition tolerance</label>
                      <div className="flex flex-wrap gap-2">
                        {['No repetition', 'Some OK', 'Heavy repetition OK'].map((opt) => (
                          <button
                            key={opt} type="button"
                            onClick={() => updateAdv('repetition', adv.repetition === opt ? '' : opt)}
                            className={cn(
                              'rounded-lg border px-4 py-2 text-sm font-medium transition-colors',
                              adv.repetition === opt
                                ? 'border-indigo-600 bg-indigo-600 text-white'
                                : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-200 hover:bg-indigo-50',
                            )}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Topic integration */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Cross-topic integration</label>
                      <div className="flex flex-wrap gap-2">
                        {['Single-topic', 'Some cross-topic', 'Heavy integration'].map((opt) => (
                          <button
                            key={opt} type="button"
                            onClick={() => updateAdv('topicIntegration', adv.topicIntegration === opt ? '' : opt)}
                            className={cn(
                              'rounded-lg border px-4 py-2 text-sm font-medium transition-colors',
                              adv.topicIntegration === opt
                                ? 'border-indigo-600 bg-indigo-600 text-white'
                                : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-200 hover:bg-indigo-50',
                            )}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Calculation intensity */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Calculation intensity</label>
                      <div className="flex flex-wrap gap-2">
                        {['None', 'Light', 'Moderate', 'Heavy'].map((opt) => (
                          <button
                            key={opt} type="button"
                            onClick={() => updateAdv('calcIntensity', adv.calcIntensity === opt ? '' : opt)}
                            className={cn(
                              'rounded-lg border px-4 py-2 text-sm font-medium transition-colors',
                              adv.calcIntensity === opt
                                ? 'border-indigo-600 bg-indigo-600 text-white'
                                : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-200 hover:bg-indigo-50',
                            )}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Visuals */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">
                        Include visual element descriptions{' '}
                        <span className="font-normal text-slate-400 text-xs">(select all that apply)</span>
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {['Tables', 'Graphs / charts', 'Diagrams', 'Case vignettes'].map((opt) => {
                          const checked = adv.visuals.includes(opt)
                          return (
                            <button
                              key={opt} type="button"
                              onClick={() => toggleAdvMulti('visuals', opt)}
                              className={cn(
                                'rounded-lg border px-4 py-2 text-sm font-medium transition-colors',
                                checked
                                  ? 'border-indigo-600 bg-indigo-600 text-white'
                                  : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-200 hover:bg-indigo-50',
                              )}
                            >
                              {opt}
                            </button>
                          )
                        })}
                      </div>
                      <p className="text-xs text-slate-400">
                        Since questions are text-only, the AI will describe what a table or graph would show within the question text.
                      </p>
                    </div>
                  </div>

                  {/* ── GROUP 5: Professor Profile ── */}
                  <div className="space-y-4 border-t border-slate-100 pt-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Professor &amp; exam profile</p>

                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-slate-700">
                        Professor / exam style{' '}
                        <span className="font-normal text-slate-400 text-xs">(optional)</span>
                      </label>
                      <textarea
                        placeholder="e.g. My professor loves to ask about edge cases and exceptions. Exams are heavily weighted toward application over memorization. Often tests the 'why' behind concepts..."
                        value={adv.professorStyle}
                        onChange={(e) => updateAdv('professorStyle', e.target.value)}
                        rows={3}
                        className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-400 resize-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-slate-700">
                        Common student mistakes to test for{' '}
                        <span className="font-normal text-slate-400 text-xs">(optional)</span>
                      </label>
                      <textarea
                        placeholder="e.g. Students confuse marginal cost with average cost. Common mistake is applying short-run rules to long-run scenarios..."
                        value={adv.commonMistakes}
                        onChange={(e) => updateAdv('commonMistakes', e.target.value)}
                        rows={3}
                        className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-400 resize-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-slate-700">
                        High-yield topics{' '}
                        <span className="font-normal text-slate-400 text-xs">(optional)</span>
                      </label>
                      <textarea
                        placeholder="e.g. Game theory and Nash equilibrium are worth at least 20% of marks. Focus heavily on welfare economics and market failures..."
                        value={adv.highYieldTopics}
                        onChange={(e) => updateAdv('highYieldTopics', e.target.value)}
                        rows={3}
                        className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-400 resize-none"
                      />
                    </div>
                  </div>

                </div>
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

                  {sharedPeople.map((person, i) => (
                    <div
                      key={i}
                      className="rounded-lg border border-slate-200 p-4 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                          Person {i + 1}
                        </p>
                        {sharedPeople.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeSharedPerson(i)}
                            className="text-slate-300 hover:text-red-500 transition-colors"
                            title="Remove this person"
                          >
                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        )}
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="space-y-1">
                          <Input
                            placeholder="Name"
                            value={person.name}
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
                            value={person.email}
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

                  <button
                    type="button"
                    onClick={addSharedPerson}
                    className="flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
                  >
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add person
                  </button>

                  {/* Group message */}
                  <div className="border-t border-slate-100 pt-4 space-y-1.5">
                    <label className="text-sm font-medium text-slate-700">
                      Message for your group{' '}
                      <span className="font-normal text-slate-400">(optional)</span>
                    </label>
                    <p className="text-xs text-slate-500">
                      Add a short note for your group — for example, when to take the exam, what to focus on, or anything else they should know.
                    </p>
                    <Textarea
                      placeholder="e.g. Please complete this before Friday. Focus on chapters 3–5."
                      value={groupMessage}
                      onChange={(e) => setGroupMessage(e.target.value)}
                      rows={3}
                    />
                  </div>
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
