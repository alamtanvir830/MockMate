# Desmos Integration — Phase Status

## Phase 1 — SAT Form 1 Math ✅ COMPLETE

**Status:** Deployed  
**Commit:** see git log

### Files / Components

| File | Role |
|------|------|
| `components/exam/calculator/SatCalculatorPanel.tsx` | Reusable calculator panel; lazy-loads Desmos script, provides Graphing + Scientific modes, handles desktop panel and mobile full-screen overlay |
| `components/premade/SATExamTaker.tsx` | Hosts the panel; imports `SatCalculatorPanel`; toggles it only when `phase.section === 'math'`; resets it on module boundary |
| `.env.example` | Documents `NEXT_PUBLIC_DESMOS_API_KEY` |

### Calculator Configuration

- **API:** Official Desmos JavaScript API v1.9 (`https://www.desmos.com/api/v1.9/calculator.js`)
- **Key:** `NEXT_PUBLIC_DESMOS_API_KEY` env var; falls back to Desmos public demo key for development
- **Production key:** Request from Desmos (https://www.desmos.com/api/v1.9/docs/index.html)
- **No npm package** — script loaded dynamically into `<head>` (once per page, deduplicated)
- **No CSP changes required** — no CSP is currently configured; document for future hardening

### Features Delivered

- Graphing calculator (`Desmos.GraphingCalculator`)
- Scientific calculator (`Desmos.ScientificCalculator`)
- Mode toggle (Graphing ↔ Scientific); separate state preserved in each instance
- Desktop: inline right-side panel, resizable (drag left edge, 300–720 px)
- Mobile (< 768 px): full-screen overlay with "Return to Question" button
- Calculator only visible during Math questions; hidden in R&W
- Lazy script load — Desmos is not loaded in R&W or other sections
- Loading state (spinner)
- Error state ("Calculator Temporarily Unavailable") with Try Again + Continue Without Calculator
- Module-key reset — calculator state clears between Math Module 1 and Module 2
- Exam state preserved while calculator is open (answers, bookmarks, timer all unaffected)
- Esc key closes the panel
- Calc button in toolbar now acts as toggle (click again to close)

### Visual Audit — Form 1 Math

All graph/diagram questions use `SATGraph.tsx` (deterministic SVG renderer, no external assets):

| Module | Questions with graphData | Types |
|--------|--------------------------|-------|
| Math Module 1 (Routing) | 3 | coordinate_plane × 2, scatter × 1 |
| Math Module 2 Easy | 0 | — |
| Math Module 2 Hard | 2 | geometry × 2 |

All visuals confirmed rendering correctly via SVG. No broken or missing visuals found. No external image URLs. No raw Markdown or broken LaTeX detected.

---

## Phase 2 — SAT Forms 2–5

**Status:** Not started  
**Scope:** Connect `SatCalculatorPanel` to Forms 2–5 Math modules (same component, same API)

---

## Phase 3 — SAT Question Bank

**Status:** Not started  
**Scope:** Add calculator to Math practice sessions in the Question Bank

---

## Phase 4 — SAT Math & Desmos Academy

**Status:** Not started  
**Scope:** Add pre-loaded calculator states to Math Academy lessons, drills, mixed practice, capstones, and mastery checks; connect to Desmos Mastery lesson examples

---

## Phase 5 — Platform-wide consistency & analytics

**Status:** Not started  
**Scope:** Calculator analytics (open/close events, mode switches, load failures); final cross-section consistency audit; production Desmos API key setup
