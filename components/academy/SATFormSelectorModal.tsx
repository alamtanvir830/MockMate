'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'

export interface SATFormInfo {
  formNumber: number
  startRoute: string
  resultsRoute: string | null
  accessible: boolean
  attemptCount: number
  lastCompletedAt: string | null
  latestAttemptId: string | null
  totalScore: number | null
  rwScore: number | null
  mathScore: number | null
}

export function SATFormSelectorModal({
  forms,
  recommendedFormNumber,
  onClose,
}: {
  forms: SATFormInfo[]
  recommendedFormNumber: number
  onClose: () => void
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal panel */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 px-5 pt-5 pb-4 border-b border-slate-100">
          <div>
            <h2 className="font-bold text-slate-900 text-base">Choose a Full-Length SAT Form</h2>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Select any available SAT Form to take. We recommend choosing a form you have not completed yet.
            </p>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 text-slate-400 hover:text-slate-600 transition-colors mt-0.5"
            aria-label="Close"
          >
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form list */}
        <div className="p-4 space-y-2">
          {forms.map(form => {
            const completed = form.lastCompletedAt !== null
            const isRec = form.formNumber === recommendedFormNumber

            return (
              <div
                key={form.formNumber}
                className={cn(
                  'rounded-xl border p-4',
                  !form.accessible
                    ? 'border-slate-100 bg-slate-50'
                    : completed
                      ? 'border-emerald-200 bg-emerald-50/30'
                      : isRec
                        ? 'border-indigo-200 bg-indigo-50/30'
                        : 'border-slate-200 bg-white',
                )}
              >
                <div className="flex items-start gap-3">
                  {/* Form number badge */}
                  <div className={cn(
                    'h-8 w-8 shrink-0 rounded-lg flex items-center justify-center text-sm font-bold',
                    !form.accessible
                      ? 'bg-slate-100 text-slate-400'
                      : 'bg-indigo-50 text-indigo-600',
                  )}>
                    {form.formNumber}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className={cn(
                        'font-semibold text-sm',
                        !form.accessible ? 'text-slate-400' : 'text-slate-900',
                      )}>
                        SAT Form {form.formNumber}
                      </span>
                      {isRec && form.accessible && !completed && (
                        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full border bg-indigo-50 text-indigo-600 border-indigo-200">
                          Recommended
                        </span>
                      )}
                      {completed && (
                        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full border bg-emerald-100 text-emerald-700 border-emerald-300">
                          Completed
                        </span>
                      )}
                      {!form.accessible && (
                        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full border bg-slate-100 text-slate-400 border-slate-200">
                          Premium
                        </span>
                      )}
                    </div>

                    {completed && form.totalScore !== null && (
                      <p className="text-xs text-slate-600 mt-1">
                        Score: <strong>{form.totalScore}</strong>
                        {form.rwScore !== null && form.mathScore !== null && (
                          <span className="text-slate-400"> · R&amp;W {form.rwScore} / Math {form.mathScore}</span>
                        )}
                      </p>
                    )}
                    {completed && form.lastCompletedAt && (
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {new Date(form.lastCompletedAt).toLocaleDateString()}
                        {form.attemptCount > 1 && ` · ${form.attemptCount} attempts`}
                      </p>
                    )}
                    {!form.accessible && (
                      <p className="text-xs text-slate-400 mt-1">SAT Premium required to unlock</p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="shrink-0 flex flex-col items-end gap-1">
                    {!form.accessible ? (
                      <Link
                        href="/billing"
                        onClick={onClose}
                        className="text-xs font-semibold text-amber-600 hover:text-amber-800 whitespace-nowrap"
                      >
                        Upgrade →
                      </Link>
                    ) : completed ? (
                      <>
                        {form.resultsRoute && (
                          <Link
                            href={form.resultsRoute}
                            onClick={onClose}
                            className="text-xs font-semibold text-emerald-600 hover:text-emerald-800 whitespace-nowrap"
                          >
                            View Results →
                          </Link>
                        )}
                        <Link
                          href={form.startRoute}
                          onClick={onClose}
                          className="text-xs font-semibold text-sky-600 hover:text-sky-800 whitespace-nowrap"
                        >
                          Retake →
                        </Link>
                      </>
                    ) : (
                      <Link
                        href={form.startRoute}
                        onClick={onClose}
                        className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 whitespace-nowrap"
                      >
                        Take Form {form.formNumber} →
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Footer */}
        <div className="px-5 pb-5">
          <p className="text-[11px] text-slate-400 leading-relaxed">
            All practice exams are independently created and are not affiliated with or endorsed by College Board. SAT® is a trademark of College Board.
          </p>
        </div>
      </div>
    </div>
  )
}
