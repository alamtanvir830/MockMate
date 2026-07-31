# Security Deferred Items

Items in this file were identified during the 2026-07-31 security audit but deferred from the immediate hotfix scope. Each item includes current risk, recommended solution, implementation complexity, breaking risks, test requirements, and suggested priority.

---

## 1. Correct Answers in Client Bundles (Server-Side Grading Refactor)

**Current Risk: HIGH**

Correct answers for SAT and MCAT practice exam questions are currently shipped in the client-side JavaScript bundle. Any user who opens browser DevTools or intercepts the bundle can read all correct answers before or during an exam, defeating the purpose of the practice test. This is an integrity risk, not a confidentiality risk, but it directly undermines the product's value proposition.

**Recommended Solution**

Move grading to the server. The client submits the user's answers; the server fetches the correct answers from a server-only data source and returns only the score and per-question correctness flags.

1. Create a `/api/premade/grade` endpoint that accepts `{ formNumber, userAnswers }`.
2. Store question-to-correct-answer mappings in a server-only module (not imported by any client component) or in a Supabase table with RLS restricting reads to service-role.
3. The client receives back `{ responses: [{ questionId, isCorrect, correctAnswer }], score }` — the `correctAnswer` field is optional and can be withheld until the attempt is submitted.
4. Remove correct-answer data from any object passed to client components.

**Implementation Complexity: HIGH**

Requires refactoring the exam flow significantly. The in-progress autosave, module-switching logic, and result display all depend on the current client-side grading model. Expect 3–5 days of development and testing.

**Breaking Risks**

- Any logic that currently references correct answers client-side (adaptive path selection, which depends on module 1 performance) must be moved to the server as well.
- Existing saved in-progress attempts store user answers — these are fine. No migration needed for historical data.

**Test Requirements**

- Unit tests: server grading function returns correct scores for known inputs.
- Integration tests: submit answers → receive score, verify no correct-answer data in network response.
- Security test: verify bundle does not contain `correctAnswer` strings from the question bank.

**Suggested Priority: P1 — implement in the next sprint after current hotfix is stable.**

---

## 2. Content-Security-Policy Rollout (Report-Only First)

**Current Risk: MEDIUM**

The application has no Content-Security-Policy header. Without CSP, any injected script (via XSS, a compromised CDN, or a browser extension exploit) can exfiltrate user data or session tokens.

The `next.config.ts` comment explicitly notes: "Does not include Content-Security-Policy because the Supabase URL is dynamic per environment."

**Recommended Solution**

1. Start with `Content-Security-Policy-Report-Only` to discover violations without blocking.
2. Set a `report-uri` or `report-to` endpoint (e.g., a Vercel log endpoint or a free CSP reporting service like report-uri.com).
3. After 2 weeks of observation, convert to enforced CSP.

Initial policy (permissive, report-only):
```
Content-Security-Policy-Report-Only:
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: blob: https:;
  connect-src 'self' https://*.supabase.co https://api.openai.com https://api.stripe.com https://api.resend.com;
  frame-src https://js.stripe.com https://hooks.stripe.com;
  font-src 'self' data:;
  report-uri /api/csp-report;
```

**Implementation Complexity: MEDIUM**

The main challenge is identifying all inline scripts and styles (many from Tailwind, Next.js hydration, and third-party SDKs). Expect 1–2 days for the report-only phase setup, then 1 week of observation before tightening.

**Breaking Risks**

- Report-only mode carries zero breaking risk.
- Moving to enforce mode risks breaking the Stripe payment sheet (requires `frame-src` and specific `script-src`) and any Supabase Auth UI components.

**Test Requirements**

- Verify the `Content-Security-Policy-Report-Only` header is present in production responses.
- Review CSP violation reports after 48 hours and before enforcing.

**Suggested Priority: P2 — begin in parallel with P1 work; report-only has no risk.**

---

## 3. `/api/sat-verify-password` Rate Limiting / Dead Code Check

**Current Risk: MEDIUM**

The `/api/sat-verify-password` endpoint (if active) is a brute-force vector because it accepts password guesses without rate limiting. Even if the endpoint uses Supabase Auth under the hood, repeated guesses could exhaust the Supabase Auth rate limit or bypass it if the endpoint uses a custom comparison.

**Recommended Solution**

1. First, determine if this endpoint is still used. Search for all call sites: `grep -rn "sat-verify-password" app/ components/ lib/`.
2. If unused: delete the route file and remove any related dead code.
3. If still used: apply IP-based rate limiting (see `docs/rate-limiting-implementation-plan.md`) — recommend 10 attempts per hour per IP.

**Implementation Complexity: LOW**

Either deletion (trivial) or adding a rate limit block (15 minutes of work once the rate-limiter infrastructure is in place).

**Breaking Risks**

- Deletion: only if the endpoint has callers. Verify with search before deleting.
- Rate limiting: low risk; adjust limit if legitimate users report false positives.

**Test Requirements**

- If deleted: verify no 404 errors in production logs for this path.
- If rate-limited: test that 11th request within 1 hour returns 429 with `Retry-After` header.

**Suggested Priority: P2 — dead-code check is P0 (15 minutes); rate limiting follows the broader rate-limit rollout.**

---

## 4. `question_bank_practice_sets_admin_view` Missing `security_invoker = true`

**Current Risk: MEDIUM**

Supabase views that query tables using the definer's permissions (`security_definer`) can bypass Row Level Security policies. The `question_bank_practice_sets_admin_view` view does not have `security_invoker = true`, meaning it runs with the permissions of the view creator (service role), not the calling user. This allows any user who can query the view to read rows that RLS would otherwise block.

**Recommended Solution**

Add `security_invoker = true` to the view definition:

```sql
CREATE OR REPLACE VIEW question_bank_practice_sets_admin_view
  WITH (security_invoker = true)
AS
SELECT ...
```

Note: This requires the view to be recreated. All existing grants on the view must be re-applied.

**Implementation Complexity: LOW**

Single SQL migration. However, because this is a schema change, it must be tested in a staging database before applying to production.

**Breaking Risks**

- MEDIUM: Any code path that queries this view while relying on elevated permissions (i.e., calling it with a non-admin user and expecting to see all rows) will start returning empty results or errors after this change.
- Review all query sites: `grep -rn "question_bank_practice_sets_admin_view" app/ lib/`.

**Test Requirements**

- Verify that a non-admin authenticated user cannot see other users' rows via the view.
- Verify that the admin API endpoints that use this view still return expected data.

**Suggested Priority: P2 — requires Supabase migration (out of scope for this hotfix per instructions).**

---

## 5. npm Dependency Audit Findings (CVEs in next, brace-expansion, js-yaml, etc.)

**Current Risk: LOW to MEDIUM (depends on specific CVE)**

Running `npm audit` on this project reveals known CVEs in transitive dependencies. Key affected packages often include:
- `next` itself (see item 6 below)
- `brace-expansion` — used transitively by many packages; typically a ReDoS vulnerability
- `js-yaml` — used by ESLint configs; typically a code-execution or prototype pollution CVE

**Recommended Solution**

1. Run `npm audit --json > audit-$(date +%Y%m%d).json` to get a baseline.
2. Triage each finding: determine if the vulnerable code path is reachable in this application.
3. For transitive dependencies with no direct fix available, use `npm audit fix` for automatic patching where safe.
4. For CVEs requiring major version bumps, evaluate the breaking change risk before upgrading.
5. Add `npm audit --audit-level=high` to the CI pipeline so new high/critical CVEs block merges.

**Implementation Complexity: LOW to MEDIUM**

Running the audit and patching low-risk transitive deps is straightforward. Major version bumps require regression testing.

**Breaking Risks**

- MEDIUM for major version upgrades. Run `npm run build` and the full test suite after each upgrade.
- LOW for `npm audit fix` (patch/minor range only).

**Test Requirements**

- `npm run build` must pass after each dependency change.
- Run existing lint and type checks: `npx tsc --noEmit`, `npx eslint`.
- Manual smoke test of the exam flow (start exam, autosave, submit, view results).

**Suggested Priority: P2 — schedule a dedicated dependency update sprint; do not mix with feature work.**

---

## 6. Next.js Patch Version Upgrade (16.2.2 → 16.2.12+)

**Current Risk: MEDIUM**

The project is on Next.js 16.2.2. Later patch releases in the 16.2.x line include security fixes and bug fixes. Staying on 16.2.2 means running with known-fixed vulnerabilities.

**Recommended Solution**

Upgrade to the latest 16.2.x patch: `npm install next@16.2.x` (replace x with the current latest).

Check the Next.js changelog at https://github.com/vercel/next.js/releases for breaking changes within the patch range (there should be none, as patch releases are non-breaking by semver convention).

**Implementation Complexity: LOW**

Patch upgrades within a minor version (16.2.2 → 16.2.x) are designed to be drop-in replacements.

**Breaking Risks**

- LOW: Patch versions should not contain breaking changes per semver.
- Rebuild and run `npx tsc --noEmit` after upgrading. If the project uses any internal Next.js APIs (not public API), check for deprecation warnings in the build output.

**Test Requirements**

- `npm run build` must pass.
- Smoke test: dev server starts, pages load, API routes respond correctly.
- Check Vercel deployment succeeds on a preview branch before merging to main.

**Suggested Priority: P1 — low risk, high reward. Schedule for the next maintenance window.**

---

## 7. MIME Validation for `/api/extract-text`

**Current Risk: MEDIUM**

The `/api/extract-text` endpoint accepts file uploads for text extraction (PDF, DOCX). Without MIME type validation beyond the file extension or `Content-Type` header, an attacker could upload a file with a `.pdf` extension that is actually executable code, a zip bomb, or a file designed to exploit vulnerabilities in `pdf-parse` or `mammoth`.

**Recommended Solution**

Add magic-byte (file signature) validation before passing the file to the parser:

```typescript
import { fileTypeFromBuffer } from 'file-type' // npm install file-type

const buffer = await file.arrayBuffer()
const uint8 = new Uint8Array(buffer)
const type = await fileTypeFromBuffer(uint8)

const ALLOWED_TYPES = new Set(['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'])
if (!type || !ALLOWED_TYPES.has(type.mime)) {
  return NextResponse.json({ error: 'Unsupported file type.' }, { status: 415 })
}
```

Additionally:
- Enforce a file size limit (e.g., 10 MB) before reading the entire buffer.
- Validate that the `Content-Type` header matches the detected magic bytes.

**Implementation Complexity: LOW**

Adding `file-type` (a small, well-maintained package) and 10 lines of validation code.

**Breaking Risks**

- LOW: Only rejects files that are not actually PDF or DOCX. Legitimate use cases are unaffected.
- Users who accidentally upload unsupported file types will get a clear 415 error instead of a parser crash.

**Test Requirements**

- Unit test: upload a valid PDF → succeeds.
- Unit test: upload a valid DOCX → succeeds.
- Unit test: upload a file with `.pdf` extension but ZIP magic bytes → returns 415.
- Unit test: upload a file exceeding the size limit → returns 413.

**Suggested Priority: P2 — implement when rate limiting and server-side grading are complete.**
