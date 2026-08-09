# SAT R&W Wording & Rendering Audit

**Audit date:** 2026-08-04  
**Auditor:** automated search + manual review  
**Scope:** All SAT R&W content files — Forms 1, 2, 3, 4, 5 — V1 and V2 — all modules (Module 1, Module 2 Easy, Module 2 Hard)

---

## Defect class targeted

> A word appears in the stimulus **immediately after the blank** AND also appears at the **start of one or more answer choices**, causing a double-word rendering when a student mentally fills in the choice.

Example (Form 4 — confirmed defect):
```
Stimulus:  ...for more than a century _______ this ancient Greek device...
Choice C:  ; this
Rendered:  ...for more than a century; this this ancient Greek device...   ← DOUBLE "this"
```

---

## Phase 1 — Form 4 (completed, deployed)

### Confirmed defect

| File (V1) | File (V2) | Question ID (V1) | Question ID (V2) | Line |
|---|---|---|---|---|
| `lib/premade-exams/sat/form-4-rw-module-1.ts` | `lib/premade-exams/sat/v2/form-4-rw-module-1.ts` | `sat-f4-rw-m1-q04` | `sat-f4-v2-rw-m1-q04` | 443 |

**Before fix:**
```
stimulus: '...for more than a century _______ this ancient Greek device used...'
choices:  A `, it`  B ` it`  C `; this`  D ` this`   correctAnswer: C
```

**After fix:**
```
stimulus: '...for more than a century _______ ancient Greek device used...'
```

Answer key (C), question ID, and all explanations are unchanged.  
Fix committed `04c7fe2`, deployed to production.

### Phase 1 scope (all Form 4 R&W files audited)

| File | Result |
|---|---|
| `form-4-rw-module-1.ts` (V1) | **Defect found and fixed** |
| `form-4-rw-module-2-easy.ts` (V1) | Clean |
| `form-4-rw-module-2-hard.ts` (V1) | Clean |
| `v2/form-4-rw-module-1.ts` | **Defect found and fixed** |
| `v2/form-4-rw-module-2-easy.ts` | Clean |
| `v2/form-4-rw-module-2-hard.ts` | Clean |

---

## Phase 2 — Forms 1, 2, 3, 5 (this branch)

### Search methodology

Two grep passes across all 24 non-Form-4 R&W files (V1 + V2):

1. **`this` pass:** `stimulus:.*_______.*\bthis\b` — finds any stimulus with blank followed by `this`
2. **Pronoun pass:** `stimulus:.*_______.*\b(it|he|she|they)\b` — finds other pronouns after blank
3. **Choice cross-check:** `text: '[;:,]? ?(this|it|he|she|they|that)\b'` — finds all choices starting with a pronoun, then each was manually traced back to its stimulus

### Candidates reviewed

| File | Line | Stimulus excerpt | Finding |
|---|---|---|---|
| `form-3-rw-module-2-easy.ts` | 669 | `...catalogued more than 200 species _______ this figure represented...` | Choices are `,`, `; yet`, `: yet`, `, yet` — no choice contains `this` → **not a defect** |
| `v2/form-3-rw-module-2-easy.ts` | 669 | Same | Same → **not a defect** |
| `form-5-rw-module-1.ts` | 11 | `...this one was _______, pleasing diners...` | `this` is **before** the blank → **not a defect** |
| `form-5-rw-module-1.ts` | 35 | `...this extended immersion allowed her...felt deeply _______...` | `this` is **before** the blank → **not a defect** |
| `form-5-rw-module-2-hard.ts` | 549 | `...complicates this picture... _______ , uniform orthography...` | `this` is in the preceding sentence, not after the blank → **not a defect** |
| `form-2-rw-module-1.ts` | 503 | `...timeline; _______ believed the renovation...` | Blank fills a subject pronoun; word after blank is `believed`, not a pronoun → **not a defect** |
| `form-2-rw-module-2-easy.ts` | 454 | `...restructure the company's debt; _______ decision surprised...` | After blank: `decision`. Choice C is `this` as the determinative, not creating a double → **not a defect** |
| `form-2-rw-module-2-easy.ts` | 502 | `...released in 2007 _______ it changed...` | Choices: `, and`, `,`, ` and, that`, `; and` — no `it` in any choice → **not a defect** |
| `form-2-rw-module-2-easy.ts` | 526 | `...gaining a meter of height in a single day. _______ it has been used...` | Choices are transition words/phrases (`As a result,`, etc.) → **not a defect** |
| `form-3-rw-module-1.ts` | 600 | `...Having mapped the glacier's retreat..., _______ prepared a comprehensive report...` | After blank: `prepared`. Choices are noun phrases → **not a defect** |
| `form-3-rw-module-2-easy.ts` | 512 | `...belonged...to ______.` | Blank at end of sentence — pronoun case question, no word after blank → **not a defect** |
| `form-3-rw-module-2-easy.ts` | 536 | `...planting seedlings, watering the raised beds, and ______ the compost bins.` | After blank: `the compost bins`. Choice A `they turn` is a wrong-answer distractor → **not a defect** |
| `form-3-rw-module-2-easy.ts` | 615 | `Painted in the final decade..., _______ rich with texture...` | After blank: `rich`. Choice D `it was these late canvases that were` is a distractor → **not a defect** |
| `form-3-rw-module-2-hard.ts` | 437 | `...final report, _______ the investigative team had spent...` | After blank: `the investigative team`. Choice B `that` fills a relative pronoun slot, not doubling → **not a defect** |
| `form-3-rw-module-2-hard.ts` | 487 | `...named four priorities _______ academic excellence, civic engagement...` | After blank: `academic excellence`. Choice B `; they were` is a distractor → **not a defect** |
| `form-5-rw-module-1.ts` | 371 | `...took three years to complete, _______ the team rebuilt every arch by hand.` | After blank: `the team`. Choice B `it was during this that` is a distractor → **not a defect** |
| `form-5-rw-module-1.ts` | 467 | `...for its clarity, its feasibility, and _______ it addressed long-standing gaps...` | After blank: `it addressed`. Choices: `the way`, `for`, `the fact that`, `how` — none start with `it` → **not a defect** |
| `form-5-rw-module-2-easy.ts` | 406 | `...chewed through the garden hose _______ it had to be replaced...` | Choices: `, so`, `, but`, ` so`, `; and` — no `it` in any choice → **not a defect** |
| `form-5-rw-module-2-easy.ts` | 502 | `Professor Okafor, _______ lectures on environmental policy...` | After blank: `lectures`. Choice D `that` fills a relative pronoun slot → **not a defect** |

All V2 counterpart files for the above were also checked and produced identical results (same questions, same non-defect status).

### Additional defects discovered by automated test

The `findDoubleWordDefects` algorithm (see regression test) identified two further questions where a word immediately after the blank also started one or more choices:

#### Defect 2 — Platypus question (Form 1, R&W Module 2 Easy, V1 + V2)

| File (V1) | File (V2) | Question ID (V1) | Question ID (V2) |
|---|---|---|---|
| `lib/premade-exams/sat/rw-module-2-easy.ts` | `lib/premade-exams/sat/v2/rw-module-2-easy.ts` | `rw2e-25` | `sat-f1-v2-rw-m2e-q25` |

**Before fix:**
```
stimulus: '...the world _______ males have spurs on their hind legs...'
choices:  A '; males have'  B ', males have'  C 'males have'  D 'and it has males that have'
correctAnswer: A
```
Filling choice A produces `...world; males have males have spurs...` — double `males have`.

**After fix:** Remove `males have` from stimulus:
```
stimulus: '...the world _______ spurs on their hind legs...'
```
Choice A `; males have` now correctly produces `...world; males have spurs...`

---

#### Defect 3 — Drought/scientist question (Form 5, R&W Module 1, V1 + V2)

| File (V1) | File (V2) | Question ID (V1) | Question ID (V2) |
|---|---|---|---|
| `lib/premade-exams/sat/form-5-rw-module-1.ts` | `lib/premade-exams/sat/v2/form-5-rw-module-1.ts` | `sat-f5-rw-m1-q23` | `sat-f5-v2-rw-m1-q23` |

**Before fix:**
```
stimulus: '...drought patterns _______ the model relied on satellite data...'
choices:  A ', yet'  B '; a model'  C ': the'  D '; however,'
correctAnswer: A
```
Wrong-answer choice C (`: the`) + stimulus `the model` produces `...patterns: the the model...` — double `the`.

**After fix:** Change choice C from `: the` to `:`
```
choices:  A ', yet'  B '; a model'  C ':'  D '; however,'
```
Choice C `:` now produces `...drought patterns: the model relied...` — no double word. The wrong-answer explanation is unchanged (colon is still wrong for a qualifying clause).

---

### Result

**Three defects found and fixed across all forms (V1 + V2):**
1. Form 4 R&W Module 1 — Antikythera (deployed in Phase 1)
2. Form 1 R&W Module 2 Easy — Platypus (fixed in Phase 2)
3. Form 5 R&W Module 1 — Drought/scientist (fixed in Phase 2)

All other questions across all 30 R&W module files (15 V1, 15 V2) are clean.

---

## Files audited (complete list)

### V1
- `lib/premade-exams/sat/form-1-rw-module-1.ts`
- `lib/premade-exams/sat/form-1-rw-module-2-easy.ts`
- `lib/premade-exams/sat/form-1-rw-module-2-hard.ts`
- `lib/premade-exams/sat/form-2-rw-module-1.ts`
- `lib/premade-exams/sat/form-2-rw-module-2-easy.ts`
- `lib/premade-exams/sat/form-2-rw-module-2-hard.ts`
- `lib/premade-exams/sat/form-3-rw-module-1.ts`
- `lib/premade-exams/sat/form-3-rw-module-2-easy.ts`
- `lib/premade-exams/sat/form-3-rw-module-2-hard.ts`
- `lib/premade-exams/sat/form-4-rw-module-1.ts` *(defect fixed)*
- `lib/premade-exams/sat/form-4-rw-module-2-easy.ts`
- `lib/premade-exams/sat/form-4-rw-module-2-hard.ts`
- `lib/premade-exams/sat/form-5-rw-module-1.ts`
- `lib/premade-exams/sat/form-5-rw-module-2-easy.ts`
- `lib/premade-exams/sat/form-5-rw-module-2-hard.ts`

### V2
- `lib/premade-exams/sat/v2/form-1-rw-module-1.ts`
- `lib/premade-exams/sat/v2/form-1-rw-module-2-easy.ts`
- `lib/premade-exams/sat/v2/form-1-rw-module-2-hard.ts`
- `lib/premade-exams/sat/v2/form-2-rw-module-1.ts`
- `lib/premade-exams/sat/v2/form-2-rw-module-2-easy.ts`
- `lib/premade-exams/sat/v2/form-2-rw-module-2-hard.ts`
- `lib/premade-exams/sat/v2/form-3-rw-module-1.ts`
- `lib/premade-exams/sat/v2/form-3-rw-module-2-easy.ts`
- `lib/premade-exams/sat/v2/form-3-rw-module-2-hard.ts`
- `lib/premade-exams/sat/v2/form-4-rw-module-1.ts` *(defect fixed)*
- `lib/premade-exams/sat/v2/form-4-rw-module-2-easy.ts`
- `lib/premade-exams/sat/v2/form-4-rw-module-2-hard.ts`
- `lib/premade-exams/sat/v2/form-5-rw-module-1.ts`
- `lib/premade-exams/sat/v2/form-5-rw-module-2-easy.ts`
- `lib/premade-exams/sat/v2/form-5-rw-module-2-hard.ts`
