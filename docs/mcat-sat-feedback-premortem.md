# MCAT Pre-Mortem: SAT Feedback Analysis

**Source feedback:** `sat_exam_module_feedback` Supabase table (63 submissions across Forms 1–3)  
**Key audit documents:**  
- `docs/audits/latest-sat-feedback-form1-form2-audit.md`  
- `reports/sat-form3-feedback-audit.md`  
- `docs/audits/sat-feedback-july-22-attempt-reconstruction.md`  

**Date:** 2026-08-09  

---

## Feedback Classification Summary

Total submissions: 63 (Forms 1–3)  
Tier 3 excluded: 9 entries (gibberish, copied instructions, spam)  
Tier 1 actionable: ~8 substantive entries that drove content changes  
Tier 2 general: ~10 entries with useful perception signals  

---

## Tier 1 — Specific, Actionable, Credible

### T1-01: Answer leakage — passage text duplicated in choice
**SAT finding:** Form 1 R&W M2 Hard `rw2h-13` had choice C that duplicated passage text, making the blank feel pre-filled.  
**Fix applied:** Choice C replaced with structurally consistent distractor.  
**MCAT translation:** Audit every CARS and science question where an answer choice could reproduce passage wording. Check: do any wrong-answer explanations contain the exact passage phrase that hints at the correct answer? Do any choices appear to "echo" the question stem in a way that leaks correctness?  
**MCAT action:** Add answer-leakage check to content validator. For each question, verify no choice text appears verbatim in the stem or passage within 10 words.

### T1-02: Table rendering failure — pipe-separated content not displayed as table
**SAT finding:** Form 3 `sat-f3-rw-m1-q13`, `sat-f3-rw-m2h-q12`, `sat-f3-rw-m2h-q13` — tables stored as pipe-separated text were not rendered as HTML tables by `StimulusRenderer`.  
**Fix applied:** Added `isTableBlock()` + `TableBlock` component.  
**MCAT translation:** MCAT has many tables (data experiments, physiology values, epidemiology studies). The `MCATExamTaker` uses `MCATTableData` type with `headers` + `rows` arrays and renders via native `<table>` element — this is structurally safer. BUT: verify that all passage figures using `type: 'table'` render correctly before Forms 2–5 go live. Test at ≥1280px and mobile.  
**MCAT action:** Every table figure must be tested in-browser. Document in UI audit.

### T1-03: Timer freeze
**SAT finding (Form 3):** Students reported the timer "stopped" at various points, particularly around the 13-minute and 9-minute remaining marks.  
**Root cause:** `setInterval` in a browser background tab gets throttled by Chrome/Firefox. React state updates from `setInterval` can also miss ticks during re-renders.  
**Fix applied (SAT):** `SATExamTaker.tsx` now uses `deadlineMs = Date.now() + minutes * 60 * 1000` stored in a ref, plus a `visibilitychange` listener that reconciles remaining time against wall-clock on tab-foreground.  
**MCAT status:** `MCATExamTaker.tsx` still uses the old `setInterval`-only pattern. **This is the highest-priority infrastructure fix.**  
**MCAT action:** Fix timer to timestamp-based deadline pattern. Add timer regression tests for 13min, 9min, background tab, and refresh scenarios.

### T1-04: Math notation ambiguity — `r*s` rendered as text
**SAT finding:** Form 3 `sat-f3-math-m2h-q07` — student saw `r*s` and didn't understand it as multiplication; also required non-obvious Vieta's formula knowledge without contextual setup.  
**Fix applied:** Rephrased to "the product of r and s equals 14."  
**MCAT translation:** MCAT C/P and B/B sections frequently use mathematical notation. For every question involving:
- Products or ratios (Km·[S]/..., v = v_max·...)
- Greek letters (ΔG, ΔH, pKa, μ, σ...)
- Subscripts and superscripts (H₂O, CO₂, pKₐ = 6.1)
Verify the character renders correctly in the MCATExamTaker's `<p>` elements and that unicode symbols (₂, ⁻, ⇌) display at all screen sizes.  
**MCAT action:** Test every unicode/subscript/superscript symbol in production rendering before launch.

### T1-05: Calculation questions with implicit steps
**SAT finding (Form 2):** Math M1 algebra felt "too easy"; Math M2 Hard final geometry confusing because steps were implicit.  
**MCAT translation:** MCAT explicitly allows multi-step arithmetic but does not require calculus. "Hard" questions must be hard due to reasoning depth, not bad wording. Every calculation question must:
- State the target quantity explicitly
- State units clearly
- Not require unstated formulae beyond AAMC public content outline
- Have exactly one mathematically correct answer among distractors that are plausible wrong calculations (not random numbers)  
**MCAT action:** For every calculation question in C/P and B/B: solve independently, verify numeric answer, verify distractors are plausible wrong paths.

---

## Tier 2 — General, Useful Perception

### T2-01: Section difficulty felt lower than AAMC practice
**SAT signal:** Multiple users noted sections "felt easier" than real SAT or AAMC official materials.  
**MCAT translation:** This is the most common complaint about third-party MCAT prep. MockMate must not make "hard" mean obscure trivia. Difficulty must come from:
- Two-step scientific reasoning
- Integration of passage data with concept knowledge
- Experimental design evaluation (Skill 3/4)
- Subtle choice elimination requiring careful re-reading  
NOT from: long stems, bad grammar, impossible arithmetic, memorization of rare terminology.  
**MCAT action:** Maintain 20–30% hard questions per section. Audit Form 1 difficulty distribution and apply same standards to Forms 2–5.

### T2-02: CARS answer logic felt different from AAMC
**SAT signal (indirect):** Users noted some R&W evidence questions felt "slightly ambiguous" — ambiguity often traced to rendering issues, not true logic errors.  
**MCAT translation:** CARS is the highest-risk section for this complaint. Every CARS question must:
- Have exactly one answer provable from the passage
- Have explicit passage evidence against each distractor
- Not require outside knowledge
- Not require "reading the author's mind" beyond what the passage itself states
- Reasoning Beyond the Text questions: the hypothetical in the question is the ONLY new premise; the base passage still constrains the logic  
**MCAT action:** Separate CARS logic audit after all CARS passages are authored.

### T2-03: Passage length variation beneficial
**SAT signal:** Students appreciated that passage lengths varied — monotonous length was noted as fatiguing.  
**MCAT translation:** CARS passages: vary from ~500 to ~600 words naturally. Science passages: vary from brief (3–4 paragraphs) to complex (5+ paragraphs with 2+ data figures). Do not make every passage the same structural template.  
**MCAT action:** After authoring all passages, check word count distribution.

### T2-04: Referral/social proof collection
**SAT signal:** 6/63 submissions opted to refer a friend, suggesting engaged users want to share.  
**MCAT translation:** Include MCAT feedback form with optional referral. Existing `mcat_exam_feedback` table likely supports this.

---

## Tier 3 — Excluded (Gibberish/Spam/Invalid)

The following patterns appear in SAT feedback and must be excluded from any MCAT content decisions:
- Repeated characters (e.g., `xxxxxxx...`)
- Copied question instructions returned as feedback
- Internal test submissions (recognizable by admin email)
- Responses from the builder that duplicate prior submissions
- Single-word or sub-50-character entries (below validation threshold)

These are recorded in the database but MUST NOT influence content corrections.

---

## Known SAT Failure Modes → MCAT Prevention Plan

| SAT Failure Mode | MCAT Preventive Action |
|-----------------|----------------------|
| Timer freeze (setInterval) | Timestamp-based deadline timer with visibility reconciliation |
| Timer freeze at 13min/9min | Timer tests at exactly those marks plus 30min, 15min, 5min, 1min, 0 |
| Table not rendering | All MCATTableData figures tested in browser before launch |
| Answer leakage (choice duplicates passage) | Validator checks for choice-text-in-passage/stem overlap |
| Ambiguous answer (two defensible) | Second-pass independent solve for every question |
| Questions referring to missing elements | Validator: every "Figure N" or "Protein X" reference must resolve |
| Notation rendering issues | Test all unicode symbols in production build |
| Topic clustering (repetitive sequences) | Interleave topics; flag 3+ consecutive same-subskill discretes |
| Answer-letter clustering | Validate A/B/C/D distribution ≈ 25% each across sections |
| Sections too easy | Difficulty audit per section: 20–30% hard target |
| Session loss on refresh | Supabase in-progress save with wall-clock deadline |
| State loss on navigation | Answer saves on every selection (already implemented) |
| CARS logic drift from passage | Explicit passage-evidence requirement in every CARS explanation |
| Poor distractor quality | Each distractor represents a named wrong-reasoning path |

---

*This pre-mortem was created 2026-08-09 as part of the MCAT Public Release build.*
