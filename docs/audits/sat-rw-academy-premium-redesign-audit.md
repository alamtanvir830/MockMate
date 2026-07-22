# SAT R&W Academy — Premium Redesign Audit
**Date:** 2026-07-22  
**Scope:** Complete redesign from basic lesson tabs to premium mastery course

---

## Architecture Summary

| Item | Current | Post-Redesign |
|---|---|---|
| Lesson page | 768-line basic tab renderer | 1,200+ line premium course with stage tracking |
| Overview tab | 4 boxed cards, grid layout | Prose + objective + skill anatomy + quick check |
| Strategy tab | Static numbered list + 2 callouts | Intro + steps + rule table + try-it question |
| Common Traps tab | Full-width red cards | Compact accordion rows, category filter, mini-examples |
| Guided Examples tab | 3 examples, no hints | 5–8 examples, level badges, 3-level hints, coach takeaway |
| Drill tab | 10 questions, one mode | 15–22 questions, Learn/Timed/Missed modes, confidence, classification |
| Mastery tab | Static description only | Live 12-question assessment with subskill breakdown |
| Stage tracking | None — clicking tabs didn't track progress | 6-stage stepper with genuine completion gates |
| Mastery data in header | Not shown | Fetched from /api/academy/attempts, shown in lesson header |

---

## TypeScript Type Changes

**File:** `lib/academy/types.ts`

### New types
- `SkillLevel = 'foundation' | 'sat-application' | 'advanced' | 'challenge'`
- `KnowledgeCheck` — embedded comprehension checks after teaching sections
- `RuleTableRow` — rows for the strategy rule-reference table

### Extended interfaces

**`AcademySkill`** — new optional fields:
- `objective?: string` — one-sentence learning objective
- `estimatedMinutes?: number`
- `subskills?: string[]`
- `overview.skillAnatomy?: string[]`
- `overview.quickCheckQuestion?` — one-minute diagnostic
- `strategy.intro?: string`
- `strategy.ruleTable?: RuleTableRow[]`
- `strategy.tryItQuestion?`
- `masteryQuestions?: DrillQuestion[]` — separate pool for mastery assessment
- `knowledgeChecks?: KnowledgeCheck[]`

**`GuidedExample`** — new optional fields:
- `level?: SkillLevel`
- `subskill?: string`
- `hints?: string[]` — progressive hints (broad → specific)
- `coachTakeaway?: string`

**`DrillQuestion`** — new optional fields:
- `level?: SkillLevel`
- `errorCategory?: string`

**`CommonTrap`** — new optional fields:
- `miniExample?: string`
- `category?: 'clause' | 'punctuation' | 'connecting-word' | 'meaning'`

---

## Lesson Page New Features

### Lesson Header
- Breadcrumb
- Title + domain badge
- One-sentence objective (from `skill.objective`)
- Estimated time (from `skill.estimatedMinutes`)
- Stage progress bar (X of 6 stages complete)
- Live mastery percentage + status (fetched from API)

### Stage Stepper
- Six stages: Learn → Strategy → Traps → Examples → Practice → Mastery
- Marks complete only when user completes the required activity in each stage
- Overview: complete after answering quick check (or clicking "Continue")
- Strategy: complete after answering try-it question
- Traps: complete after clicking "Continue to Examples"
- Examples: complete after finishing all examples
- Practice: complete after finishing drill + mixed recognition check
- Mastery: complete after submitting mastery assessment

### Overview Tab
- Learning objective callout (left-accent border, green)
- What it tests — prose paragraph
- How it appears on the SAT — prose paragraph
- Why students miss it — prose paragraph
- Skill anatomy — numbered list (what to identify, in order)
- Key takeaway — pale green callout
- One-minute diagnostic example — try-first, no mastery impact, explained after reveal

### Strategy Tab
- Intro paragraph framing the method
- Step-by-step numbered list with circular step numbers
- Rule reference table (situation / valid / example / common error)
- Amber callout: time-saving tip
- Slate callout: when not to overthink
- Try-it question with feedback — must answer to complete stage

### Common Traps Tab
- Accordion rows — expand to read description, avoidance, mini-example
- Category filter chips (Clause / Punctuation / Connecting Word / Meaning)
- Trap icon (warning triangle) on each row
- Mini-example shown in red monospace when trap is open
- No full-width red cards

### Guided Examples Tab
- Level badge (Foundation / SAT Application / Advanced / 750+ Challenge)
- Subskill label
- Dot navigation with previous/next buttons
- Three-level hint system (broad → specific — hints don't reveal answer)
- Try-first submission before seeing walkthrough
- Step-by-step walkthrough revealed one step at a time
- Wrong-answer analysis — each wrong choice gets its own paragraph with red icon
- Coach's takeaway callout at bottom

### Drill Tab (Practice)
- Mode selector: Learn Mode / Timed Mode / Missed Questions
- **Learn Mode**: immediate feedback, confidence picker (Guessing/Unsure/Confident), no timer
- **Timed Mode**: 75-second countdown per question, hidden confidence
- **Missed Questions**: re-serves questions answered incorrectly this session; unlocks after first attempt
- Difficulty badge + level badge + subskill label per question
- Progress bar
- After each question: explanation, specific wrong-answer note, teaching point, error category
- Post-drill: score summary, mistake classification by subskill, specific recommendation
- Then: 3-question Mixed Recognition Check before marking stage complete

### Mastery Check Tab
- Pre-assessment screen shows current mastery score + status + thresholds
- 12-question assessment using `skill.masteryQuestions` (or falls back to drillQuestions)
- Questions posted to `/api/academy/attempts` with `practiceMode: 'mastery_check'`
- Results screen: total score, status badge, subskill bar chart, recommendation

### Mastery Thresholds
| Status | Threshold |
|---|---|
| Needs Review | < 60% |
| Developing | 60–79% |
| Proficient | 80–89% |
| Mastered | ≥ 90% (+ ≥ 15 total attempts, enforced server-side) |

---

## Content Changes Per Skill

### Boundaries (flagship — full rebuild)
| Metric | Before | After |
|---|---|---|
| Guided examples | 3 | 8 |
| Drill questions | 10 | 22 |
| Mastery questions | 0 | 12 |
| Level distribution | None | Foundation (2), SAT App (4), Advanced (4), Challenge (2) per type |
| Subskills listed | None | 9 subskills |
| Strategy rule table | No | Yes — 8 rows |
| Hints on examples | No | Yes — 3 per example |
| Coach takeaway | No | Yes |
| CommonTrap mini-examples | No | Yes |
| CommonTrap categories | No | Yes |

### All Other Skills (10 skills)
| Metric | Before | After |
|---|---|---|
| Guided examples | 3 | 3 (existing) + level/hints/takeaway added |
| Drill questions | 10 | 15 (5 new per skill) |
| Mastery questions | 0 | 8 per skill |
| New fields added | objective, estimatedMinutes, subskills, strategy.intro, ruleTable, tryItQuestion, miniExample, category |

---

## What Was Not Changed (Preserved)
- All existing question IDs (stable for review queue spaced repetition)
- `/api/academy/attempts` POST/GET shape — same payload
- `/api/academy/lesson-progress` — same shape
- `/api/academy/review-queue` — unchanged
- R&W Academy diagnostic
- R&W Capstones (1, 2, 3)
- Mastery calculation in `lib/academy/mastery.ts` — unchanged (server-side)
- R&W Academy sidebar
- R&W Academy course home
- Mixed Practice
- Vocabulary Trainer / Transition Trainer / Reading Speed
- Review Queue
- SAT Forms 1–5
- Premium gating
- RLS policies
- Auth
- Stripe

---

## Security Constraints Maintained
- No new admin account created
- `kurbanov.muhammadali23@gmail.com` receives no override
- Mastery percentage is NOT trusted from client — server recalculates on each `/api/academy/attempts` GET
- No answer keys exposed before submission
- Premium gating preserved in existing API routes
- No user_id or premium status accepted from client

---

## Migration Required
None. All changes are content-file and UI-only. No new Supabase tables. Existing `sat_rw_academy_attempts` table already has `confidence`, `error_category`, `practice_mode`, `subskill_slug` columns from the v2 migration.

---

## Regression Risk Areas
- **Lesson page**: Complete rewrite — test all 11 skill routes
- **DrillTab attempt POST**: same endpoint, same payload, now includes `confidence` and `errorCategory` — backward-compatible additions
- **MasteryCheckTab**: new `practice_mode: 'mastery_check'` value — already in the `PracticeMode` type

---

## Validation Checklist
- [x] TypeScript: 0 errors
- [x] No new admin account added
- [x] Historical progress preserved (IDs unchanged)
- [x] Server-side mastery calculation unchanged
- [x] Premium gating preserved
- [x] RLS preserved
- [ ] Manual: test Boundaries lesson on desktop
- [ ] Manual: test all 11 skill lesson routes
- [ ] Manual: test drill modes (Learn, Timed, Missed)
- [ ] Manual: test mastery check flow
- [ ] Manual: test mobile layout
- [ ] Manual: verify Review Queue integration still works
