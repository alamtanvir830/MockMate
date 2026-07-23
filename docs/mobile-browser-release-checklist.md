# MockMate — Mobile Browser Release Checklist

Use this checklist before any release that touches shared components, navigation, the landing page, exam flows, Academies, or billing.

---

## Navigation

- [ ] Main sidebar hidden on mobile; `MobileHeader` visible
- [ ] MobileHeader hamburger opens slide-over drawer from left
- [ ] Drawer has backdrop (tap to close)
- [ ] Drawer closes on ESC key
- [ ] Drawer closes on route change
- [ ] Scroll lock active while drawer is open
- [ ] Focus moves to close button when drawer opens
- [ ] Focus returns to hamburger button after closing
- [ ] Active route highlighted in drawer
- [ ] Academy mobile drawer (AcademyMobileMenu) opens/closes correctly
- [ ] Academy drawer does not conflict with main drawer
- [ ] Legal links visible in drawer footer
- [ ] No two permanent sidebars visible simultaneously on mobile

---

## Safe Areas

- [ ] `viewportFit: 'cover'` set in root layout viewport export
- [ ] Dashboard shell uses `h-dvh` (not `h-screen`) for iOS address-bar resilience
- [ ] Settings page outer container uses `h-dvh`
- [ ] No buttons sit beneath iPhone home indicator
- [ ] Fixed drawers and headers do not clip under status bar
- [ ] `env(safe-area-inset-*)` applied where content extends edge-to-edge

---

## Horizontal Overflow

- [ ] `html { overflow-x: hidden }` set globally
- [ ] No page-level horizontal scroll at 320px, 375px, 390px, 412px, 430px
- [ ] `document.documentElement.scrollWidth <= clientWidth` for every major route
- [ ] Images have `max-width: 100%` or are inside responsive containers
- [ ] Wide code blocks / equations scroll internally, not the whole page
- [ ] Fixed-width elements do not extend past viewport

---

## Touch Targets

- [ ] All interactive elements ≥ 44 × 44 px
- [ ] Nav links in mobile drawer have generous py padding (py-2.5+)
- [ ] Billing plan buttons full-width on mobile
- [ ] Answer choice tap targets cover full row
- [ ] Filter chips in Question Bank remain tappable
- [ ] Exam navigation buttons not obscured by browser toolbar

---

## Virtual Keyboard

- [ ] Focused input fields scroll into view above keyboard
- [ ] Fixed headers do not block focused fields
- [ ] Form submission buttons remain reachable with keyboard open
- [ ] SPR input (Student-Produced Response) in SAT exam visible when keyboard appears
- [ ] Search/filter inputs in Question Bank usable

---

## Landing Page

- [ ] Hero stacks copy above reviews on mobile (flex-col)
- [ ] Hero heading does not wrap awkwardly at 320px
- [ ] SAT Premium value block stays readable (no overflow)
- [ ] CTA buttons full-width on xs, row on sm+
- [ ] Feature cards single-column on xs, 2-col on sm, 3-col on lg
- [ ] "How it works" steps single-column on xs
- [ ] Final CTA section readable and buttons tappable
- [ ] Footer links wrap cleanly
- [ ] Legal disclaimer text does not overflow
- [ ] No horizontal overflow on any landing section
- [ ] Hero gradient blob does not cause horizontal scroll (overflow-hidden on section)

---

## Review Animation (Landing Page)

- [ ] Mobile shows one vertical column (not horizontal carousel)
- [ ] Animation uses vertical scroll loop on mobile
- [ ] Container height: `clamp(300px, 55svh, 380px)` adapts to device
- [ ] Duration computed after ResizeObserver measurement (~35px/s)
- [ ] Animation does not start until duration is measured (no speed flash)
- [ ] Touch-hold pauses animation; release resumes
- [ ] Normal page scrolling unaffected (touch-action: pan-y on track)
- [ ] No visible jump when loop resets (translateY(-50%) seamless)
- [ ] No horizontal overflow from review cards
- [ ] Card text readable at 375px width
- [ ] Top/bottom fade gradients present
- [ ] Desktop: hover pauses animation
- [ ] Desktop: 460px fixed height unchanged
- [ ] `prefers-reduced-motion: reduce` → static list shown, animation hidden
- [ ] Screen reader sees `<ul aria-label="Student testimonials">` (sr-only)
- [ ] No live region on the animated section (aria-hidden="true")
- [ ] Duplicate source records NOT added (duplication is internal/render-only)
- [ ] Verified testimonials only (≥1400 filter server-side)

---

## Billing / Pricing Cards

- [ ] Three pricing cards stack vertically on mobile (single column)
- [ ] Prices remain on readable lines (no clipping of "per month" / "one-time payment")
- [ ] Feature list items readable at 375px
- [ ] Buttons full-width and tappable
- [ ] "Current Plan" badge does not overlap card border on mobile
- [ ] "Access ends [date]" pill wraps cleanly
- [ ] Past-due red banner readable
- [ ] Error message readable
- [ ] Loading states work on mobile (button disabled during network request)
- [ ] Underlined "any time" text preserved

---

## SAT Results Page

- [ ] Section scores visible without horizontal scroll
- [ ] R&W and Math feedback columns stack vertically on mobile
- [ ] Free-user: only first feedback item visible before blur
- [ ] Blur/lock overlay contained within card boundaries
- [ ] Lock message readable on mobile
- [ ] Premium CTAs tappable (full-width or adequate size)
- [ ] Recommended Next Steps visible and text wraps correctly
- [ ] Personalized Practice Path card stacks cleanly
- [ ] Full Answer Key PDF lock visible
- [ ] Answer key filter controls wrap or scroll inside container
- [ ] Answer key rows do not cause horizontal page overflow
- [ ] Explanation panels expand within bounds
- [ ] Math equations and diagrams do not overflow
- [ ] PDF download link accessible on mobile

---

## SAT Exam Interface

- [ ] Timer always visible (top of screen or fixed)
- [ ] Save indicator ("Saving…" / "Saved ✓") visible without crowding
- [ ] Passage text readable without horizontal scroll
- [ ] Answer choice tap targets ≥ 44px tall
- [ ] Long answer choices wrap naturally without clipping
- [ ] Question navigation accessible on mobile
- [ ] No buttons beneath browser toolbar / home indicator
- [ ] Desmos calculator can be opened, resized, and closed on mobile
- [ ] Calculator does not permanently cover essential controls
- [ ] Diagrams and graphs scale correctly
- [ ] Module review accessible on mobile
- [ ] Feedback form fields usable with keyboard open
- [ ] Exam state persists through orientation changes

---

## Academy Pages (R&W and Math)

- [ ] Academy sidebar hidden on mobile; AcademyMobileMenu button visible
- [ ] Academy drawer opens with correct nav content
- [ ] Academy drawer closes on navigation
- [ ] Lesson stage tabs scroll horizontally (not wrap to many lines)
- [ ] Active stage remains visible in tab bar
- [ ] Decision trees and tables scroll internally or reflow vertically
- [ ] Guided example passages do not clip
- [ ] Answer choices tappable with adequate targets
- [ ] Math expressions readable on narrow screens
- [ ] Desmos interactive area has usable height on mobile
- [ ] No raw Markdown appears in lesson content
- [ ] Progress indicators visible without overflow

---

## Question Bank

- [ ] Filter controls accessible (drawer, sheet, or compact controls)
- [ ] Filter chips wrap cleanly
- [ ] No permanent filter panel permanently reducing question width on mobile
- [ ] Question content uses available width
- [ ] Answer choices accessible
- [ ] Explanations readable on mobile
- [ ] Math/diagram content does not clip

---

## Exam Forms Page

- [ ] Form cards stack vertically on mobile
- [ ] Start / Resume buttons visible and tappable
- [ ] Lock states visible
- [ ] In-progress indicators clear
- [ ] Legal disclaimer readable

---

## Exam History

- [ ] Desktop table replaced with responsive card or stacked row layout on mobile
- [ ] Status, date, score, form number all visible
- [ ] Resume and View Result actions tappable
- [ ] In-progress badge visible

---

## Settings

- [ ] Plan information prominent on mobile
- [ ] Long email addresses do not overflow card
- [ ] Billing dates wrap if long
- [ ] Buttons full-width on mobile
- [ ] Sign Out button separated from normal actions
- [ ] Customer Portal button visible and tappable

---

## Authentication Pages

- [ ] Login / Signup forms centered with max-width constraint
- [ ] Email and password inputs bring up correct keyboard types
- [ ] Submit buttons not obscured by keyboard
- [ ] Error messages associated with fields

---

## Typography

- [ ] Minimum body text size ≥ 13px at default zoom
- [ ] Heading wraps do not produce single orphan words on narrow screens
- [ ] Line heights comfortable for mobile reading (relaxed / snug)
- [ ] Text contrast passes WCAG AA at all sizes

---

## Images and Media

- [ ] All images responsive (`w-full h-auto` or equivalent)
- [ ] `flow.png` on landing page scales without overflow
- [ ] Aspect ratios preserved
- [ ] No images clipped at mobile widths

---

## Performance

- [ ] Review animation uses GPU transform (translateY, will-change: transform)
- [ ] No JS intervals for animation (CSS keyframes only)
- [ ] No duplicate ResizeObservers spawned on the same element
- [ ] Observers cleaned up in useEffect return
- [ ] No layout thrashing during scroll
- [ ] No large unoptimized images in critical path
- [ ] Lazy load below-the-fold images where appropriate

---

## Accessibility

- [ ] All interactive elements keyboard-accessible
- [ ] Focus indicators visible
- [ ] `aria-label` on icon-only buttons
- [ ] `aria-current="page"` on active nav links
- [ ] `aria-modal` and `role="dialog"` on drawers
- [ ] Screen readers can access testimonial content (sr-only list)
- [ ] Animated review section is `aria-hidden` (not read repeatedly)
- [ ] `prefers-reduced-motion` respected for animations
- [ ] Color alone does not convey status (icons + text where needed)
- [ ] Form inputs have associated `<label>` elements

---

## Browser Compatibility

- [ ] iPhone Safari (latest)
- [ ] iPhone Chrome (latest)
- [ ] Android Chrome (latest)
- [ ] Tablet Safari (portrait and landscape)
- [ ] Tablet Chrome (portrait and landscape)
- [ ] Desktop Chrome, Safari, Firefox (regression check)

---

## Tested Viewports

- [ ] 320 × 568
- [ ] 375 × 667
- [ ] 390 × 844
- [ ] 393 × 852
- [ ] 412 × 915
- [ ] 430 × 932
- [ ] 768 × 1024 (tablet portrait)
- [ ] 1024 × 768 (tablet landscape)
- [ ] 1280+ (desktop regression)
