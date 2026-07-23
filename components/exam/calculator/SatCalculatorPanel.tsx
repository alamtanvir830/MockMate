'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { cn } from '@/lib/utils'

// ── Desmos types ──────────────────────────────────────────────────────────────
// The Desmos API is loaded via external script, so we declare its shape here.

interface DesmosCalculatorOptions {
  expressionsTopbar?: boolean
  keypad?: boolean
  expressions?: boolean
  settingsMenu?: boolean
  zoomButtons?: boolean
  lockViewport?: boolean
  images?: boolean
  notes?: boolean
  links?: boolean
  qwertyKeyboard?: boolean
  projectorMode?: boolean
}

interface DesmosInstance {
  destroy(): void
  setBlank(): void
  resize(): void
}

declare global {
  interface Window {
    Desmos?: {
      GraphingCalculator(el: HTMLElement, options?: DesmosCalculatorOptions): DesmosInstance
      ScientificCalculator(el: HTMLElement, options?: DesmosCalculatorOptions): DesmosInstance
    }
  }
}

type CalcMode = 'graphing' | 'scientific'
type ScriptStatus = 'idle' | 'loading' | 'ready' | 'error'

interface SatCalculatorPanelProps {
  /** Panel is visible when true */
  open: boolean
  onClose: () => void
  /** Changes when the exam enters a new Math module — triggers a state reset */
  moduleKey: string
}

const MIN_PANEL_WIDTH = 300
const MAX_PANEL_WIDTH = 720
const DEFAULT_PANEL_WIDTH = 420

// Single module-level flag so the script is added to <head> only once across re-mounts.
let scriptLoaded = false
let scriptLoading = false
const scriptCallbacks: Array<() => void> = []
const scriptErrorCallbacks: Array<() => void> = []

function loadDesmosScript(onLoad: () => void, onError: () => void) {
  if (scriptLoaded) { onLoad(); return }
  scriptCallbacks.push(onLoad)
  scriptErrorCallbacks.push(onError)
  if (scriptLoading) return
  scriptLoading = true
  const apiKey = process.env.NEXT_PUBLIC_DESMOS_API_KEY ?? 'dcb31709b452b1cf9dc26972add0fda6'
  const el = document.createElement('script')
  el.src = `https://www.desmos.com/api/v1.9/calculator.js?apiKey=${encodeURIComponent(apiKey)}`
  el.async = true
  el.onload = () => {
    scriptLoaded = true
    scriptLoading = false
    for (const cb of scriptCallbacks) cb()
    scriptCallbacks.length = 0
  }
  el.onerror = () => {
    scriptLoading = false
    for (const cb of scriptErrorCallbacks) cb()
    scriptErrorCallbacks.length = 0
  }
  document.head.appendChild(el)
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function SatCalculatorPanel({ open, onClose, moduleKey }: SatCalculatorPanelProps) {
  const [scriptStatus, setScriptStatus] = useState<ScriptStatus>(() =>
    scriptLoaded ? 'ready' : 'idle'
  )
  const [mode, setMode] = useState<CalcMode>('graphing')
  const [panelWidth, setPanelWidth] = useState(DEFAULT_PANEL_WIDTH)
  const [isMobile, setIsMobile] = useState(false)
  const [initialized, setInitialized] = useState(false)

  const graphingRef = useRef<HTMLDivElement>(null)
  const scientificRef = useRef<HTMLDivElement>(null)
  const graphingCalc = useRef<DesmosInstance | null>(null)
  const scientificCalc = useRef<DesmosInstance | null>(null)
  const prevModuleKey = useRef(moduleKey)

  // ── Mobile detection ──────────────────────────────────────────────────────

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // ── Script loading ────────────────────────────────────────────────────────

  useEffect(() => {
    if (!open || scriptStatus === 'ready') return
    if (scriptStatus === 'loading') return
    // Defer the state transition out of the effect body so it does not trigger
    // a synchronous cascading render; behaviour is otherwise identical.
    queueMicrotask(() => setScriptStatus('loading'))
    loadDesmosScript(
      () => setScriptStatus('ready'),
      () => setScriptStatus('error'),
    )
  }, [open, scriptStatus])

  // ── Desmos initialization & module reset ──────────────────────────────────

  const destroyCalcs = useCallback(() => {
    try { graphingCalc.current?.destroy() } catch { /* ignore */ }
    try { scientificCalc.current?.destroy() } catch { /* ignore */ }
    graphingCalc.current = null
    scientificCalc.current = null
    setInitialized(false)
  }, [])

  useEffect(() => {
    if (scriptStatus !== 'ready' || !open || !window.Desmos) return

    // Module change: reset both calculators. Tear down the Desmos instances
    // synchronously, but defer the state reset so we do not call setState in the
    // effect body (which would cause a cascading render).
    if (prevModuleKey.current !== moduleKey) {
      prevModuleKey.current = moduleKey
      queueMicrotask(destroyCalcs)
      return
    }

    if (initialized) return

    // Small rAF delay so container has final dimensions before Desmos reads them
    const rafId = requestAnimationFrame(() => {
      if (!window.Desmos) return
      if (!graphingCalc.current && graphingRef.current) {
        graphingCalc.current = window.Desmos.GraphingCalculator(graphingRef.current, {
          expressionsTopbar: true,
          keypad: true,
          expressions: true,
          settingsMenu: true,
          zoomButtons: true,
          lockViewport: false,
          images: false,
          notes: false,
          links: false,
          qwertyKeyboard: false,
          projectorMode: false,
        })
      }
      if (!scientificCalc.current && scientificRef.current) {
        scientificCalc.current = window.Desmos.ScientificCalculator(scientificRef.current, {
          keypad: true,
          qwertyKeyboard: false,
        })
      }
      // Desmos measures its container at construction time. If the panel was
      // still laying out (zero/partial width) at that moment, the graph renders
      // blank or clipped until a resize() is forced. Fire one immediately so the
      // calculator is usable the instant it appears — no manual nav-away needed.
      try { graphingCalc.current?.resize() } catch { /* ignore */ }
      try { scientificCalc.current?.resize() } catch { /* ignore */ }
      setInitialized(true)
    })

    return () => cancelAnimationFrame(rafId)
  }, [scriptStatus, open, moduleKey, initialized, destroyCalcs])

  // Keep Desmos in sync with the ACTUAL rendered size of its container.
  // A ResizeObserver catches every case the effect-deps below cannot: the flex
  // layout settling one frame after mount, the panel opening/closing, browser
  // window resizes, and returning from the review page. Without this, a graph
  // initialised at the wrong size stays broken until manually re-triggered.
  useEffect(() => {
    if (!initialized) return
    if (typeof ResizeObserver === 'undefined') return
    const targets = [graphingRef.current, scientificRef.current].filter(
      (el): el is HTMLDivElement => el !== null
    )
    if (targets.length === 0) return

    const ro = new ResizeObserver(() => {
      try { graphingCalc.current?.resize() } catch { /* ignore */ }
      try { scientificCalc.current?.resize() } catch { /* ignore */ }
    })
    for (const el of targets) ro.observe(el)
    return () => ro.disconnect()
  }, [initialized])

  // Notify Desmos of resize when panel width or mode changes
  useEffect(() => {
    if (!initialized) return
    const active = mode === 'graphing' ? graphingCalc.current : scientificCalc.current
    try { active?.resize() } catch { /* ignore */ }
  }, [panelWidth, mode, initialized])

  // ── Cleanup on unmount ────────────────────────────────────────────────────

  useEffect(() => {
    return destroyCalcs
  }, [destroyCalcs])

  // ── Keyboard: Esc closes ──────────────────────────────────────────────────

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  // ── Retry ─────────────────────────────────────────────────────────────────

  const retry = () => {
    scriptLoaded = false
    scriptLoading = false
    scriptCallbacks.length = 0
    scriptErrorCallbacks.length = 0
    setScriptStatus('idle')
  }

  // ── Desktop resize handle ─────────────────────────────────────────────────

  const onResizeMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    const startX = e.clientX
    const startW = panelWidth

    const onMove = (me: MouseEvent) => {
      const delta = startX - me.clientX // moving left → panel wider
      setPanelWidth(Math.max(MIN_PANEL_WIDTH, Math.min(MAX_PANEL_WIDTH, startW + delta)))
    }
    const onUp = () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
    }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
  }

  if (!open) return null

  // ── Panel body (shared between mobile overlay and desktop panel) ──────────

  const showLoading = scriptStatus === 'loading' || (scriptStatus === 'ready' && !initialized)
  const showError = scriptStatus === 'error'

  const PanelHeader = (
    <div className="shrink-0 flex items-center justify-between px-3 py-2 bg-[#1b3a5c]">
      {/* Mode toggle */}
      <div className="flex items-center rounded-md overflow-hidden border border-white/20 text-[11px] font-semibold">
        <button
          onClick={() => setMode('graphing')}
          aria-pressed={mode === 'graphing'}
          className={cn(
            'px-3 py-1 transition-colors',
            mode === 'graphing' ? 'bg-white/20 text-white' : 'text-white/60 hover:text-white/80'
          )}
        >
          Graphing
        </button>
        <div className="w-px h-4 bg-white/20" />
        <button
          onClick={() => setMode('scientific')}
          aria-pressed={mode === 'scientific'}
          className={cn(
            'px-3 py-1 transition-colors',
            mode === 'scientific' ? 'bg-white/20 text-white' : 'text-white/60 hover:text-white/80'
          )}
        >
          Scientific
        </button>
      </div>

      <button
        onClick={onClose}
        aria-label="Close calculator"
        className="p-1 rounded text-white/70 hover:text-white hover:bg-white/10 transition-colors"
      >
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )

  const CalcBody = (
    <div className="flex-1 relative overflow-hidden bg-white">
      {showLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-50 z-10">
          <div className="text-center">
            <div className="h-6 w-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <p className="text-xs text-slate-500">Loading calculator…</p>
          </div>
        </div>
      )}

      {showError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-slate-50 z-10 p-6 text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5 text-amber-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-slate-800 text-sm">Calculator Temporarily Unavailable</p>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Your exam and answers are still saved. You can continue working without the calculator or try loading it again.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={retry}
              className="rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-2 transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={onClose}
              className="rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold px-4 py-2 transition-colors"
            >
              Continue Without Calculator
            </button>
          </div>
        </div>
      )}

      {/* Graphing calculator container */}
      <div
        ref={graphingRef}
        className="absolute inset-0"
        aria-label="Desmos graphing calculator"
        style={{ opacity: mode === 'graphing' ? 1 : 0, pointerEvents: mode === 'graphing' ? 'auto' : 'none' }}
      />

      {/* Scientific calculator container */}
      <div
        ref={scientificRef}
        className="absolute inset-0"
        aria-label="Desmos scientific calculator"
        style={{ opacity: mode === 'scientific' ? 1 : 0, pointerEvents: mode === 'scientific' ? 'auto' : 'none' }}
      />
    </div>
  )

  // ── Mobile: full-screen overlay ───────────────────────────────────────────

  if (isMobile) {
    return (
      <div
        className="fixed inset-0 z-[70] flex flex-col bg-white"
        role="dialog"
        aria-modal="true"
        aria-label="Math calculator"
      >
        {PanelHeader}
        {CalcBody}
        <div className="shrink-0 border-t border-slate-100 px-4 py-2 text-center">
          <button
            onClick={onClose}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
          >
            ← Return to Question
          </button>
        </div>
      </div>
    )
  }

  // ── Desktop: inline right panel ───────────────────────────────────────────

  return (
    <div
      className="relative flex flex-col bg-white border-l border-slate-200 shrink-0 overflow-hidden"
      style={{ width: panelWidth }}
      role="complementary"
      aria-label="Math calculator"
    >
      {/* Drag resize handle */}
      <div
        className="absolute left-0 inset-y-0 w-1 cursor-ew-resize hover:bg-indigo-300 active:bg-indigo-400 transition-colors z-10"
        onMouseDown={onResizeMouseDown}
        title="Drag to resize calculator"
        aria-label="Resize calculator panel"
      />
      {PanelHeader}
      {CalcBody}
    </div>
  )
}
