'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import {
  MATH_SKILL_DISPLAY_NAMES,
  MATH_DOMAIN_DISPLAY,
  MATH_DOMAIN_BADGE_CLASS,
  ALGEBRA_SKILL_SLUGS,
  ADVANCED_MATH_SKILL_SLUGS,
  PSDA_SKILL_SLUGS,
  GEO_TRIG_SKILL_SLUGS,
  type MathSkillSlug,
  type MathDomainSlug,
} from '@/lib/academy/math/skill-mapping'

interface MathAcademyHomeProps {
  isPremium: boolean
}

// ── Domain color map ───────────────────────────────────────────────────────────

const DOMAIN_HOVER_BG: Record<MathDomainSlug, string> = {
  'algebra': 'hover:bg-blue-50',
  'advanced-math': 'hover:bg-purple-50',
  'problem-solving-data-analysis': 'hover:bg-green-50',
  'geometry-trigonometry': 'hover:bg-orange-50',
}

const DOMAIN_RING: Record<MathDomainSlug, string> = {
  'algebra': 'border-blue-200',
  'advanced-math': 'border-purple-200',
  'problem-solving-data-analysis': 'border-green-200',
  'geometry-trigonometry': 'border-orange-200',
}

// ── Domain section component ───────────────────────────────────────────────────

function DomainSection({
  domain,
  slugs,
  isPremium,
}: {
  domain: MathDomainSlug
  slugs: readonly MathSkillSlug[]
  isPremium: boolean
}) {
  const badgeClass = MATH_DOMAIN_BADGE_CLASS[domain]
  const hoverBg = DOMAIN_HOVER_BG[domain]
  const ringClass = DOMAIN_RING[domain]
  const displayName = MATH_DOMAIN_DISPLAY[domain]

  return (
    <div className={cn('rounded-xl border bg-white p-5', ringClass)}>
      <div className="mb-4 flex items-center gap-2">
        <span className={cn('rounded-md px-2.5 py-1 text-xs font-semibold border', badgeClass)}>
          {displayName}
        </span>
        <span className="text-xs text-slate-400">{slugs.length} skills</span>
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {slugs.map(slug => {
          const label = MATH_SKILL_DISPLAY_NAMES[slug]
          if (!isPremium) {
            return (
              <Link
                key={slug}
                href="/billing"
                className={cn(
                  'flex items-center justify-between gap-2 rounded-lg border border-slate-100 bg-slate-50 px-3.5 py-2.5 text-sm transition-colors opacity-70',
                  hoverBg,
                )}
                aria-label={`${label} — SAT Premium required`}
              >
                <span className="font-medium text-slate-600 truncate">{label}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-3.5 w-3.5 shrink-0 text-amber-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
              </Link>
            )
          }
          return (
            <Link
              key={slug}
              href={`/sat-math-academy/lesson/${slug}`}
              className={cn(
                'flex items-center justify-between gap-2 rounded-lg border border-slate-100 bg-slate-50 px-3.5 py-2.5 text-sm transition-colors',
                hoverBg,
              )}
            >
              <span className="font-medium text-slate-700 truncate">{label}</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5 shrink-0 text-slate-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

// ── Upgrade banner ─────────────────────────────────────────────────────────────

function UpgradeBanner() {
  return (
    <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5 shrink-0 text-amber-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
        <p className="text-sm text-amber-800">
          <span className="font-semibold">SAT Premium required</span> — unlock all 21 Math Academy lessons, the Desmos toolkit, capstones, and full SAT forms.
        </p>
      </div>
      <Link
        href="/billing"
        className="shrink-0 rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-600 transition-colors"
      >
        Get SAT Premium
      </Link>
    </div>
  )
}

// ── Coming-soon card ───────────────────────────────────────────────────────────

function ComingSoonCard({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3.5 rounded-xl border border-slate-100 bg-slate-50 px-4 py-4">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-200 text-slate-400">
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-500">{title}</p>
        <p className="mt-0.5 text-xs text-slate-400">{description}</p>
        <span className="mt-1.5 inline-block rounded-full border border-slate-200 bg-white px-2 py-0.5 text-[10px] font-medium text-slate-400">
          Coming soon
        </span>
      </div>
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function MathAcademyHome({ isPremium }: MathAcademyHomeProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">SAT Math & Desmos Academy</h1>
        <p className="mt-1 text-sm text-slate-500">
          Master all 21 SAT Math skills across Algebra, Advanced Math, Problem-Solving & Data Analysis, and Geometry & Trigonometry — with integrated Desmos training.
        </p>
      </div>

      {!isPremium && <UpgradeBanner />}

      {/* Quick actions */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {isPremium ? (
          <Link
            href="/sat-math-academy/diagnostic"
            className="flex items-center gap-3 rounded-xl border border-indigo-200 bg-indigo-50 px-5 py-4 hover:bg-indigo-100 transition-colors"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-indigo-900">Math Diagnostic</p>
              <p className="text-xs text-indigo-600">Identify your strongest and weakest skills</p>
            </div>
          </Link>
        ) : (
          <Link
            href="/billing"
            className="flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 hover:bg-amber-100 transition-colors"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-amber-900">Get SAT Premium</p>
              <p className="text-xs text-amber-700">Unlock the full Math Academy</p>
            </div>
          </Link>
        )}

        <Link
          href="/sat-math-academy/desmos-sandbox"
          className={cn(
            'flex items-center gap-3 rounded-xl border px-5 py-4 transition-colors',
            isPremium
              ? 'border-indigo-200 bg-indigo-50 hover:bg-indigo-100'
              : 'border-slate-200 bg-slate-50 opacity-60 cursor-not-allowed pointer-events-none',
          )}
          aria-disabled={!isPremium}
          tabIndex={isPremium ? undefined : -1}
        >
          <div className={cn(
            'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg',
            isPremium ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-200 text-slate-400',
          )}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
            </svg>
          </div>
          <div>
            <p className={cn('font-semibold', isPremium ? 'text-indigo-900' : 'text-slate-500')}>Desmos Sandbox</p>
            <p className={cn('text-xs', isPremium ? 'text-indigo-600' : 'text-slate-400')}>Practice with the SAT calculator</p>
          </div>
        </Link>
      </div>

      {/* Domain lessons */}
      <div>
        <h2 className="mb-4 text-base font-semibold text-slate-800">Skills by Domain</h2>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <DomainSection domain="algebra" slugs={ALGEBRA_SKILL_SLUGS} isPremium={isPremium} />
          <DomainSection domain="advanced-math" slugs={ADVANCED_MATH_SKILL_SLUGS} isPremium={isPremium} />
          <DomainSection domain="problem-solving-data-analysis" slugs={PSDA_SKILL_SLUGS} isPremium={isPremium} />
          <DomainSection domain="geometry-trigonometry" slugs={GEO_TRIG_SKILL_SLUGS} isPremium={isPremium} />
        </div>
      </div>

      {/* Coming soon sections */}
      <div>
        <h2 className="mb-4 text-base font-semibold text-slate-800">More Tools</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {isPremium ? (
            <Link
              href="/sat-math-academy/desmos-mastery"
              className="flex items-start gap-3.5 rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-4 hover:bg-indigo-100 transition-colors"
            >
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-indigo-900">Desmos Mastery Lessons</p>
                <p className="mt-0.5 text-xs text-indigo-600">Step-by-step lessons on using the SAT graphing calculator effectively.</p>
              </div>
            </Link>
          ) : (
            <Link
              href="/billing"
              className="flex items-start gap-3.5 rounded-xl border border-slate-100 bg-slate-50 px-4 py-4 opacity-70"
            >
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-200 text-slate-400">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-500">Desmos Mastery Lessons</p>
                <p className="mt-0.5 text-xs text-slate-400">Step-by-step lessons on using the SAT graphing calculator effectively.</p>
                <span className="mt-1.5 inline-block rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-600">SAT Premium</span>
              </div>
            </Link>
          )}
          {isPremium ? (
            <Link
              href="/sat-math-academy/mixed-practice"
              className="flex items-start gap-3.5 rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-4 hover:bg-indigo-100 transition-colors"
            >
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-indigo-900">Mixed Practice</p>
                <p className="mt-0.5 text-xs text-indigo-600">Questions from all domains mixed without labels — build recognition speed.</p>
              </div>
            </Link>
          ) : (
            <Link
              href="/billing"
              className="flex items-start gap-3.5 rounded-xl border border-slate-100 bg-slate-50 px-4 py-4 opacity-70"
            >
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-200 text-slate-400">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-500">Mixed Practice</p>
                <p className="mt-0.5 text-xs text-slate-400">Questions from all domains mixed without labels — build recognition speed.</p>
                <span className="mt-1.5 inline-block rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-600">SAT Premium</span>
              </div>
            </Link>
          )}
          {isPremium ? (
            <Link
              href="/sat-math-academy/capstones"
              className="flex items-start gap-3.5 rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-4 hover:bg-indigo-100 transition-colors"
            >
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-indigo-900">Math Capstones</p>
                <p className="mt-0.5 text-xs text-indigo-600">Two timed 44-question assessments across all four math domains.</p>
              </div>
            </Link>
          ) : (
            <Link
              href="/billing"
              className="flex items-start gap-3.5 rounded-xl border border-slate-100 bg-slate-50 px-4 py-4 opacity-70"
            >
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-200 text-slate-400">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-500">Math Capstones</p>
                <p className="mt-0.5 text-xs text-slate-400">Two timed 44-question assessments across all four math domains.</p>
                <span className="mt-1.5 inline-block rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-600">SAT Premium</span>
              </div>
            </Link>
          )}
          <ComingSoonCard
            title="Mastery Check"
            description="A final proctored Math section to confirm overall readiness."
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
              </svg>
            }
          />
        </div>
      </div>
    </div>
  )
}
