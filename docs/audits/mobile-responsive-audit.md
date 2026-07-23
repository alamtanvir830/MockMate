# MockMate — Mobile Responsive Audit

**Audit date:** 2026-07-23  
**Auditor:** Automated review via Claude Code  
**Branch:** main  
**Breakpoints tested:** 320, 375, 390, 393, 412, 430, 768, 1024, 1280+

---

## Summary

| Area | Status | Notes |
|------|--------|-------|
| Landing page layout | ✅ Fixed | Hero stacks col, feature grids responsive |
| Landing review animation | ✅ Fixed | Vertical loop on mobile; was horizontal snap |
| Main navigation mobile | ✅ Fixed | Converted dropdown → slide-over drawer |
| Academy navigation mobile | ✅ Pass | MobileDrawer already existed in AcademySidebar |
| Dashboard layout | ✅ Fixed | `h-dvh` replaces `h-screen` for iOS Safari |
| Settings page | ✅ Fixed | `h-dvh` applied |
| Billing/pricing cards | ✅ Pass | `md:grid-cols-3` stacks correctly on mobile |
| SAT results page | ⚠️ Partial | Gold button + one-preview task pending |
| SAT exam interface | ✅ Pass | Existing layout handles mobile reasonably |
| Academy lessons | ✅ Pass | Academy mobile drawer already implemented |
| Question Bank | ✅ Pass | Existing responsive layout |
| Exam History | ⚠️ Note | Desktop table may need card layout on narrow widths |
| Auth pages | ✅ Pass | Centered max-width cards |
| Performance / globals.css | ✅ Fixed | `will-change: transform`, `overflow-x: hidden`, safe areas |
| Viewport metadata | ✅ Fixed | `viewportFit: 'cover'` added to root layout |

---

## Route-by-Route Findings

### `/` Landing Page

| Component | Issue | Width | Severity | Correction | Status |
|-----------|-------|-------|----------|------------|--------|
| Hero | Reviews used horizontal snap carousel | < lg | High | Replaced with vertical animated loop (same as desktop) | ✅ Fixed |
| Hero split | Left copy and right reviews stacked correctly | < lg | n/a | Already `flex-col lg:flex-row` | ✅ Pass |
| Nav | Features/How-it-works hidden on mobile | < md | Low | Anchor links are same-page; acceptable | ✅ Pass |
| Feature grid | `sm:grid-cols-2 lg:grid-cols-3` | 320px | n/a | Single column on xs | ✅ Pass |
| Steps grid | `sm:grid-cols-2 lg:grid-cols-4` | 320px | n/a | Single column on xs | ✅ Pass |
| Footer | Links wrap with `flex-wrap gap-4` | 375px | n/a | Clean wrapping | ✅ Pass |
| Gradient blob | Could cause horizontal scroll | all | Med | `overflow-hidden` on section contains it | ✅ Pass |

### Review Animation (Landing Page)

| Requirement | Before | After | Status |
|-------------|--------|-------|--------|
| Mobile layout | Horizontal snap carousel | Vertical animated loop | ✅ Fixed |
| Speed | Fixed 5s/card (too fast after text wrapping) | ResizeObserver → ~35px/s | ✅ Fixed |
| Seamless loop | `translateY(-50%)` | Same, correctly applied to mobile | ✅ Pass |
| Reduced motion | Static list (desktop only) | Static list (desktop + mobile) | ✅ Fixed |
| Touch interaction | None | Pointer down/up pauses animation | ✅ Fixed |
| Page scroll | Horizontal snap hijacked vertical scroll | `touch-action: pan-y` on track | ✅ Fixed |
| Tab visibility | CSS animation throttled by browser | Browser handles natively | ✅ Pass |
| Duplicate source records | 0 added | 0 added | ✅ Pass |
| Screen reader | `sr-only` list with `aria-label` | Unchanged (correct) | ✅ Pass |
| GPU animation | `translateY` | `will-change: transform` added | ✅ Fixed |

### Dashboard Layout

| Issue | Width | Severity | Correction | Status |
|-------|-------|----------|------------|--------|
| `h-screen` on iOS Safari incorrect when address bar visible | all mobile | Med | Changed to `h-dvh` | ✅ Fixed |
| MobileHeader dropdown lacked backdrop and scroll lock | < md | Med | Converted to slide-over drawer | ✅ Fixed |
| MobileHeader lacked focus trap / ESC close | < md | Med | Added `useRef`, `useEffect` for focus and keyboard | ✅ Fixed |

### Settings Page

| Issue | Width | Severity | Correction | Status |
|-------|-------|----------|------------|--------|
| `h-screen` outer container | all mobile | Med | Changed to `h-dvh` | ✅ Fixed |
| Plan info layout | 375px | n/a | Max-width card; already stacks | ✅ Pass |

### Billing / Pricing

| Issue | Width | Severity | Correction | Status |
|-------|-------|----------|------------|--------|
| Three cards | < md | n/a | `md:grid-cols-3` → single column on mobile | ✅ Pass |
| Badge placement | 375px | Low | Absolute `-top-3 left-1/2` within relative card | ✅ Pass |
| Underlined "any time" | all | n/a | `<span className="underline underline-offset-2">` | ✅ Pass |

### SAT Results Page

| Issue | Width | Severity | Correction | Status |
|-------|-------|----------|------------|--------|
| R&W + Math cards in 2-col grid on mobile | < md | Med | `md:grid-cols-2` already collapses | ✅ Pass |
| Free-user shows 2 weaknesses before lock | all | High | Pending: reduce to 1 | ⏳ Pending |
| Premium CTA buttons purple (indigo) | all | High | Pending: change to gold (amber) | ⏳ Pending |
| Lock overlay on mobile | 375px | Med | Already `absolute inset-0` | ✅ Pass |

### SAT Exam Interface

| Issue | Width | Severity | Correction | Status |
|-------|-------|----------|------------|--------|
| Timer fixed at top | 375px | n/a | Existing header layout; passes | ✅ Pass |
| Answer choice tap targets | 375px | n/a | Each choice is a full-row button | ✅ Pass |
| Desmos panel | 375px | Med | Existing mobile handling; panel collapsible | ✅ Pass |

### Academies

| Issue | Width | Severity | Correction | Status |
|-------|-------|----------|------------|--------|
| R&W Academy sidebar | < md | High | `AcademyMobileMenu` button + `MobileDrawer` | ✅ Pass (existing) |
| Math Academy sidebar | < md | High | Same pattern as R&W | ✅ Pass (existing) |
| Lesson content overflow | 375px | Low | Content uses `max-w-*` containers | ✅ Pass |

### Question Bank

| Issue | Width | Severity | Correction | Status |
|-------|-------|----------|------------|--------|
| Filter panel | 375px | Med | Not a permanent side panel; compact controls | ✅ Pass |
| Question content | 375px | n/a | Uses responsive container | ✅ Pass |

---

## Global CSS Changes

| Change | Reason |
|--------|--------|
| `html { overflow-x: hidden }` | Prevent silent horizontal overflow |
| `body { padding: env(safe-area-inset-*) }` | Respect iPhone notch/home indicator |
| `mm-testimonial-track { will-change: transform }` | GPU compositing for smoother animation |
| `mm-testimonial-track { touch-action: pan-y }` | Prevent review track from blocking page scroll |
| `.pb-safe`, `.pl-safe`, `.pr-safe` utilities | Safe-area helper classes |

---

## Viewport Metadata

| Change | Before | After |
|--------|--------|-------|
| Root layout viewport export | Missing | Added `width: 'device-width', initialScale: 1, viewportFit: 'cover'` |

---

## Pending Items (Separate Task)

These items from the audit are tracked as a follow-up task (SAT results gold buttons + one-preview):

1. Reduce free-user R&W weaknesses preview from `slice(0, 2)` → `slice(0, 1)`
2. Reduce free-user Math weaknesses preview from `slice(0, 2)` → `slice(0, 1)`
3. Change all SAT results `Get SAT Premium` buttons from indigo → amber/gold
4. Update lock copy per spec
