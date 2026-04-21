'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { deleteExamQuestion, addExamQuestion } from '@/app/actions/questions'

interface Question {
  id: string
  question_text: string
  options: string[] | null
  correct_answer: string
  order: number
}

interface Props {
  examId: string
  questions: Question[]
}

const LETTERS = ['A', 'B', 'C', 'D', 'E']

export function EditQuestionsPanel({ examId, questions }: Props) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [removingId, setRemovingId] = useState<string | null>(null)
  const [removeError, setRemoveError] = useState('')

  const [showAddForm, setShowAddForm] = useState(false)
  const [newQuestion, setNewQuestion] = useState('')
  const [newOptions, setNewOptions] = useState(['', '', '', ''])
  const [newCorrect, setNewCorrect] = useState('')
  const [addError, setAddError] = useState('')
  const [addLoading, setAddLoading] = useState(false)

  async function handleRemove(questionId: string) {
    setRemovingId(questionId)
    setRemoveError('')
    const result = await deleteExamQuestion({ examId, questionId })
    setRemovingId(null)
    if ('error' in result) {
      setRemoveError(result.error)
    } else {
      router.refresh()
    }
  }

  function resetAddForm() {
    setNewQuestion('')
    setNewOptions(['', '', '', ''])
    setNewCorrect('')
    setAddError('')
    setShowAddForm(false)
  }

  async function handleAdd() {
    setAddError('')
    if (!newQuestion.trim()) {
      setAddError('Question text is required.')
      return
    }
    const filledOptions = newOptions.map((o) => o.trim()).filter(Boolean)
    if (filledOptions.length < 2) {
      setAddError('At least 2 answer options are required.')
      return
    }
    if (!newCorrect.trim() || !filledOptions.includes(newCorrect.trim())) {
      setAddError('Please select the correct answer by clicking the radio button next to it.')
      return
    }

    setAddLoading(true)
    const result = await addExamQuestion({
      examId,
      question: {
        question_text: newQuestion.trim(),
        options: filledOptions,
        correct_answer: newCorrect.trim(),
      },
    })
    setAddLoading(false)

    if ('error' in result) {
      setAddError(result.error)
    } else {
      resetAddForm()
      router.refresh()
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
              <svg
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
                className="h-4 w-4 text-slate-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125"
                />
              </svg>
            </div>
            <div>
              <CardTitle>Edit Questions</CardTitle>
              <p className="text-xs text-slate-400 mt-0.5">
                {questions.length} question{questions.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => { setIsOpen((v) => !v); setRemoveError(''); resetAddForm() }}
            className="shrink-0 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            {isOpen ? 'Done' : 'Edit'}
          </button>
        </div>
      </CardHeader>

      {isOpen && (
        <div className="space-y-4">
          {removeError && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {removeError}
            </div>
          )}

          {/* Current questions list */}
          {questions.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-4">No questions yet.</p>
          ) : (
            <div className="space-y-2">
              {questions.map((q, i) => (
                <div
                  key={q.id}
                  className="flex items-start gap-3 rounded-xl border border-slate-200 px-3 py-3 group"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-500 mt-0.5">
                    {i + 1}
                  </span>
                  <p className="flex-1 text-sm text-slate-700 leading-relaxed line-clamp-2 min-w-0">
                    {q.question_text}
                  </p>
                  <button
                    type="button"
                    onClick={() => handleRemove(q.id)}
                    disabled={removingId === q.id}
                    className="shrink-0 text-slate-300 hover:text-red-500 disabled:opacity-40 transition-colors mt-0.5"
                    title="Remove this question"
                  >
                    {removingId === q.id ? (
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                    ) : (
                      <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        className="h-4 w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Add question */}
          {!showAddForm ? (
            <button
              type="button"
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              <svg
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Add question
            </button>
          ) : (
            <div className="rounded-xl border border-indigo-100 bg-slate-50 p-4 space-y-4">
              <p className="text-sm font-semibold text-slate-800">New question</p>

              {addError && (
                <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  {addError}
                </p>
              )}

              {/* Question text */}
              <div>
                <label className="text-xs font-medium text-slate-600 mb-1.5 block">
                  Question text
                </label>
                <textarea
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  rows={3}
                  placeholder="Enter the question stem…"
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              {/* Answer options */}
              <div className="space-y-2.5">
                <label className="text-xs font-medium text-slate-600 block">
                  Answer options
                  <span className="font-normal text-slate-400 ml-1">
                    — click the circle next to the correct answer
                  </span>
                </label>
                {newOptions.map((opt, i) => {
                  const trimmed = opt.trim()
                  const isSelected = trimmed !== '' && newCorrect === trimmed
                  return (
                    <div key={i} className="flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => trimmed && setNewCorrect(trimmed)}
                        className={cn(
                          'flex h-4 w-4 shrink-0 rounded-full border-2 items-center justify-center transition-colors',
                          isSelected
                            ? 'border-indigo-600'
                            : 'border-slate-300 hover:border-slate-400',
                        )}
                        title="Mark as correct"
                      >
                        {isSelected && (
                          <span className="h-2 w-2 rounded-full bg-indigo-600" />
                        )}
                      </button>
                      <span className="shrink-0 text-xs font-semibold text-slate-400 w-4">
                        {LETTERS[i]}.
                      </span>
                      <input
                        type="text"
                        value={opt}
                        onChange={(e) => {
                          const val = e.target.value
                          const updated = [...newOptions]
                          if (newCorrect === opt.trim() && opt.trim() !== '') {
                            setNewCorrect(val.trim())
                          }
                          updated[i] = val
                          setNewOptions(updated)
                        }}
                        placeholder={`Option ${LETTERS[i]}`}
                        className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                  )
                })}
              </div>

              <div className="flex gap-2">
                <Button size="sm" onClick={handleAdd} loading={addLoading}>
                  Add question
                </Button>
                <Button size="sm" variant="ghost" onClick={resetAddForm}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </Card>
  )
}
