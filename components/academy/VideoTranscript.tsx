'use client'

import { useState, useRef } from 'react'

interface VideoTranscriptProps {
  transcript: string
}

export function VideoTranscript({ transcript }: VideoTranscriptProps) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const textRef = useRef<HTMLDivElement>(null)

  async function copyTranscript() {
    try {
      await navigator.clipboard.writeText(transcript)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for browsers without clipboard API
      const sel = window.getSelection()
      if (sel && textRef.current) {
        const range = document.createRange()
        range.selectNodeContents(textRef.current)
        sel.removeAllRanges()
        sel.addRange(range)
        document.execCommand('copy')
        sel.removeAllRanges()
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    }
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white">
      <button
        onClick={() => setOpen(p => !p)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-sm font-medium text-slate-900 hover:bg-slate-50 transition-colors rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
      >
        <span className="flex items-center gap-2">
          <svg className="h-4 w-4 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
          </svg>
          Video Transcript
        </span>
        <svg
          className={`h-4 w-4 text-slate-400 transition-transform shrink-0 ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {open && (
        <div className="border-t border-slate-100 px-5 pb-5">
          <div className="flex items-center justify-between pt-4 pb-3">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Approved Transcript
            </p>
            <button
              onClick={copyTranscript}
              aria-label="Copy transcript to clipboard"
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              {copied ? (
                <>
                  <svg className="h-3.5 w-3.5 text-emerald-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy Transcript
                </>
              )}
            </button>
          </div>

          {/* Transcript text — searchable via browser find */}
          <div
            ref={textRef}
            className="space-y-3 text-sm text-slate-700 leading-relaxed max-h-72 overflow-y-auto"
          >
            {transcript.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
