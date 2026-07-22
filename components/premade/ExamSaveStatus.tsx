export type SaveStatus = 'idle' | 'saving' | 'saved' | 'offline' | 'error'

/**
 * Compact save-status pill for the exam top banner.
 * Intentionally frameworkless — no 'use client' needed; caller manages state.
 * Uses aria-live="polite" so screen readers hear status changes without interrupting.
 */
export function ExamSaveStatus({ status }: { status: SaveStatus }) {
  if (status === 'idle') return null

  if (status === 'saving') {
    return (
      <span
        className="inline-flex items-center gap-1 text-[10px] font-medium text-white/55 shrink-0"
        role="status"
        aria-live="polite"
        aria-label="Saving your answers"
      >
        <svg
          className="h-2.5 w-2.5 animate-spin"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        Saving...
      </span>
    )
  }

  if (status === 'saved') {
    return (
      <span
        className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-300 shrink-0"
        role="status"
        aria-live="polite"
        aria-label="Answers saved"
      >
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} className="h-2.5 w-2.5" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
        Saved
      </span>
    )
  }

  if (status === 'offline') {
    return (
      <span
        className="inline-flex items-center gap-1 text-[10px] font-medium text-amber-300 shrink-0"
        role="alert"
        aria-live="polite"
        aria-label="Offline — answers will sync when reconnected"
      >
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-2.5 w-2.5" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18M8.111 8.111A5.25 5.25 0 0112 7.5c2.9 0 5.25 2.35 5.25 5.25m2.929 2.929A5.25 5.25 0 0112 18a5.25 5.25 0 01-5.25-5.25" />
        </svg>
        Offline — answers will sync
      </span>
    )
  }

  // error
  return (
    <span
      className="inline-flex items-center gap-1 text-[10px] font-medium text-red-300 shrink-0"
      role="alert"
      aria-live="polite"
      aria-label="Unable to save — retrying"
    >
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-2.5 w-2.5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
      </svg>
      Unable to save — retrying
    </span>
  )
}
