# Phase 4 Audit: Classroom Workspace Architecture

Audited: 2026-08-07  
Branch: `feat/multi-product-dashboard-phase-4`  
Base: `ce7f91a` (production main after Phase 3 merge)

## Goal

Build a real Classroom workspace experience that feels intentional rather than
"SAT dashboard with SAT links removed."

## What already exists

### Routes

| Route | Status | Notes |
|---|---|---|
| `/classroom/dashboard` | Placeholder shell | "Coming soon" badge; links to `/exams/create` and chooser |
| `/exams/create` | **COMPLETE** | Full AI-powered exam creation form with AI question generation |
| `/exams` | **COMPLETE** (Phase 3) | Workspace-filtered; Classroom view = custom + shared exams |
| `/exams/[id]/take` | **COMPLETE** | Full exam-taking flow |
| `/exams/[id]/results` | **COMPLETE** | AI feedback, Anki, mind map, study guide, group privacy |
| `/exams/[id]/shared` | **COMPLETE** | Shared exam taking |
| `/exams/[id]/shared/preferences` | **COMPLETE** | Privacy preferences for group scores |
| `/groups` | **COMPLETE** | Full group listing: creator/member roles, lock status, exam dates |
| `/groups/[examId]` | **COMPLETE** | Group detail: member management, add members, edit questions, completion tracking |
| `/notes` | **COMPLETE** | Shared personal notes |
| `/settings` | **COMPLETE** | Shared settings |

### Exam creation

`/exams/create` uses `CreateExamForm` which triggers `createExam` server action:
- Title, subject, exam date
- Topics, subtopics, lecture content
- Format (MC, short answer, essay, mixed)
- Past paper style, additional notes
- Question count, unlock days before
- Accountability friends (= exam sharing → creates groups)
- Advanced customization (difficulty, question style, bloom's taxonomy distribution)
- AI generates questions via `generateQuestions` / `generateShortResponseQuestions`
- Sends group invitation emails (`sendGroupAddedEmails`)

The copy is generic ("personalized practice paper using AI") — appropriate for Classroom context with no SAT or MCAT references.

### Groups / sharing

`exam_shared_recipients` table links exams to invited members by email.
Groups are defined by exams that have been shared (either as creator or recipient).
`/groups/[examId]` allows:
- Adding members (email invitations)
- Creator message
- Editing questions
- Viewing all members' completion status

### Results

Rich AI-powered results page with:
- Per-question review (correct answer, explanation, options)
- AI narrative feedback (what went well, what to review, mistake patterns)
- Anki flashcard export
- Mind map generation
- Study guide generation
- Group privacy preferences (show score to group, include in rankings)

### Sidebar (Classroom nav items)

```
Classroom Dashboard → /classroom/dashboard
Create Practice Exam → /exams/create
My Practice Exams → /exams
My Groups → /groups
Personal Notes → /notes
Settings → /settings
```

## Issues found

### 1. Classroom dashboard is a placeholder

The current `/classroom/dashboard` shows a "Coming soon" badge and describes the features
as "under active development" — but the exam builder, groups, and sharing are all
production-ready. Users who arrive from the chooser see a dead-end page that
misrepresents the product's maturity.

**Fix:** Replace with a real dashboard: primary CTA + summary stats + navigation cards.

### 2. Active state bug: `/exams` and `/exams/create` are both active simultaneously

At `/exams/create`, the sidebar and mobile-header both mark "My Practice Exams" (`/exams`)
as active because `'/exams/create'.startsWith('/exams/')` is true. "Create Practice Exam"
is also correctly active. This produces two active nav items simultaneously.

**Fix:** Extract active-state logic to `isNavItemActive()` pure function in
`lib/workspace/workspace.ts`. Special-case `/exams`: active only when
`pathname === '/exams' || (pathname.startsWith('/exams/') && !pathname.startsWith('/exams/create'))`.

## What should be surfaced on the Classroom dashboard

All of the following are backed by real functionality:

| Card | Destination | Data available |
|---|---|---|
| Create a Practice Exam (primary CTA) | `/exams/create` | N/A |
| My Practice Exams | `/exams` | exam count (user-scoped) |
| My Groups | `/groups` | group count (creator exams with sharing) |
| Personal Notes | `/notes` | N/A |
| Settings | `/settings` | N/A |

## What should NOT be surfaced yet

- Performance/analytics for Classroom (no Classroom-specific analytics exist)
- Classroom-specific dashboard stats beyond simple counts
- MCAT — disabled, chooser card says "Coming soon"

## DB migration required

None. All Classroom features use existing tables.

## Stripe / billing

No changes. Classroom exams use the existing exam limit system (PLAN_LIMITS).
No Classroom-specific billing is introduced.
