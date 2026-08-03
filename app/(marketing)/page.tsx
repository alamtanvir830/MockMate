import Link from 'next/link'
import { Logo } from '@/components/shared/logo'
import { Button } from '@/components/ui/button'
import { HeroReviewsPanel } from '@/components/landing/StudentReviews'
import { SocialProofCard } from '@/components/landing/SocialProofCard'
import { TabletShowcase } from '@/components/landing/IPadShowcase'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Logo navyTheme />
            <nav className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                How it works
              </a>
            </nav>
            <div className="flex items-center gap-3">
              <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                Sign in
              </Link>
              <Link href="/signup">
                <Button size="sm" className="bg-[#44A5F0] hover:bg-[#2d8fd4]">Get started free</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section
          className="relative overflow-hidden pt-16 pb-6 sm:pt-24 sm:pb-8"
          style={{ background: 'linear-gradient(150deg, #f0f3f7 0%, #e8ecf2 45%, #dde3ec 100%)' }}
        >
          {/* ── Wave background — z-index 0, always below content (z-index 10) ── */}
          <div
            aria-hidden="true"
            className="absolute inset-0 overflow-hidden pointer-events-none"
            style={{ zIndex: 0 }}
          >
            <svg
              className="absolute w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid slice"
              viewBox="0 0 1440 700"
            >
              <defs>
                <linearGradient id="wg1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%"   stopColor="#b8c8dc" stopOpacity="0.45" />
                  <stop offset="50%"  stopColor="#c4d2e6" stopOpacity="0.36" />
                  <stop offset="100%" stopColor="#b0c2d8" stopOpacity="0.22" />
                </linearGradient>
                <linearGradient id="wg2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%"   stopColor="#a8bcd2" stopOpacity="0.32" />
                  <stop offset="60%"  stopColor="#b4c6de" stopOpacity="0.24" />
                  <stop offset="100%" stopColor="#a2b6cc" stopOpacity="0.16" />
                </linearGradient>
              </defs>
              {/* Wave 1 — broad upper sweep */}
              <path
                d="M0,160 C220,60 500,240 800,150 C1080,64 1280,200 1440,130 L1440,700 L0,700 Z"
                fill="url(#wg1)"
              />
              {/* Wave 2 — mid flow */}
              <path
                d="M0,310 C280,210 580,370 880,295 C1100,238 1300,340 1440,275 L1440,700 L0,700 Z"
                fill="url(#wg2)"
              />
              {/* Wave 3 — lower subtle band */}
              <path
                d="M0,470 C260,400 560,490 860,430 C1080,385 1300,450 1440,410 L1440,700 L0,700 Z"
                fill="#aebece"
                fillOpacity="0.18"
              />
              {/* White glow — upper left */}
              <ellipse cx="180" cy="140" rx="520" ry="270" fill="#ffffff" fillOpacity="0.30" />
              {/* Tonal accent — right */}
              <ellipse cx="1300" cy="380" rx="360" ry="280" fill="#ccd8e8" fillOpacity="0.18" />
            </svg>

            {/* Blurred radial depth — upper left */}
            <div
              style={{
                position: 'absolute',
                top: '-100px',
                left: '-80px',
                width: '640px',
                height: '520px',
                background:
                  'radial-gradient(ellipse at 40% 40%, rgba(216,226,240,0.50) 0%, transparent 70%)',
                filter: 'blur(32px)',
                borderRadius: '50%',
              }}
            />
            {/* Blurred radial depth — lower right */}
            <div
              style={{
                position: 'absolute',
                bottom: '-80px',
                right: '-60px',
                width: '520px',
                height: '420px',
                background:
                  'radial-gradient(ellipse at 60% 60%, rgba(196,212,232,0.35) 0%, transparent 70%)',
                filter: 'blur(36px)',
                borderRadius: '50%',
              }}
            />
          </div>

          {/* Content — z-index 10 keeps it above the wave layer */}
          <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            {/* Split hero: left copy + CTAs, right landscape tablet + benefits */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:gap-12">

              {/* ── Left: copy → CTA buttons → social proof ───────────────── */}
              <div className="lg:w-[42%] text-center lg:text-left">
                {/* Eyebrow */}
                <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#44A5F0] mb-5">
                  <span className="h-px w-6 bg-[#44A5F0] hidden lg:block" />
                  MockMate
                </p>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.08]">
                  Your standardized exam hub for{' '}
                  <span
                    className="bg-clip-text text-transparent"
                    style={{ backgroundImage: 'linear-gradient(135deg, #44A5F0, #2d8fd4)' }}
                  >
                    affordable test prep.
                  </span>
                </h1>

                <p className="mt-6 text-base sm:text-lg text-slate-800 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Take realistic SAT-style practice exams and targeted practice with high-quality questions reviewed by students, former test takers, and high scorers.
                </p>

                {/* CTA buttons */}
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                  <Link href="/signup?next=/premade/sat">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto bg-[#44A5F0] hover:bg-[#2d8fd4] whitespace-nowrap"
                    >
                      Get A Free SAT Exam!
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </Button>
                  </Link>
                  <Link href="/pricing">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto border-slate-300 hover:border-emerald-400 whitespace-nowrap">
                      View SAT Premium
                    </Button>
                  </Link>
                </div>

                {/* Social proof */}
                <div className="mt-5 flex justify-center lg:justify-start">
                  <SocialProofCard className="w-full max-w-xs sm:w-auto" />
                </div>
              </div>

              {/* ── Right: landscape tablet → SAT Premium benefits ─────────── */}
              <div className="lg:w-[58%] mt-10 lg:mt-0 flex flex-col gap-14">
                {/* Landscape tablet with scrolling testimonials */}
                <TabletShowcase>
                  <HeroReviewsPanel fadeBg="#f8fafc" />
                </TabletShowcase>

                {/* SAT Premium benefits card */}
                <div className="rounded-2xl border border-blue-100 bg-blue-50 px-6 py-5">
                  <p className="flex items-center gap-2 text-sm font-semibold text-[#44A5F0] mb-3.5">
                    <svg className="h-4 w-4 shrink-0 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                    </svg>
                    <span className="text-[15px]"><span className="text-amber-600">SAT Premium</span> is 96% cheaper than major test prep companies</span>
                  </p>
                  <ul className="space-y-2">
                    {satPremiumFeatureLinks.map(({ text, href }) => (
                      <li key={text}>
                        <Link
                          href={href}
                          className="flex items-center gap-2 text-sm text-[#44A5F0] hover:text-[#2d8fd4] transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#44A5F0]"
                        >
                          <svg className="h-3.5 w-3.5 shrink-0 text-[#44A5F0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                          {text}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Trust badges */}
        <section className="border-y border-slate-100 bg-slate-50 py-4">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {badges.map(({ icon, label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#44A5F0]"
                  >
                    <span className="text-[#44A5F0]">{icon}</span>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Features — wave background resumes below the trust strip */}
        <section
          id="features"
          className="relative overflow-hidden py-24"
          style={{ background: 'linear-gradient(150deg, #f0f3f7 0%, #e8ecf2 45%, #dde3ec 100%)' }}
        >
          {/* Wave layer — distinct gradient IDs (fwg1/fwg2) to avoid SVG id conflicts with hero */}
          <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
            <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1440 700">
              <defs>
                <linearGradient id="fwg1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%"   stopColor="#b8c8dc" stopOpacity="0.45" />
                  <stop offset="50%"  stopColor="#c4d2e6" stopOpacity="0.36" />
                  <stop offset="100%" stopColor="#b0c2d8" stopOpacity="0.22" />
                </linearGradient>
                <linearGradient id="fwg2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%"   stopColor="#a8bcd2" stopOpacity="0.32" />
                  <stop offset="60%"  stopColor="#b4c6de" stopOpacity="0.24" />
                  <stop offset="100%" stopColor="#a2b6cc" stopOpacity="0.16" />
                </linearGradient>
              </defs>
              <path d="M0,100 C200,20 480,180 780,95 C1060,14 1260,150 1440,80 L1440,700 L0,700 Z" fill="url(#fwg1)" />
              <path d="M0,265 C260,165 560,325 860,248 C1080,190 1280,295 1440,228 L1440,700 L0,700 Z" fill="url(#fwg2)" />
              <path d="M0,425 C240,355 540,445 840,382 C1060,338 1280,402 1440,362 L1440,700 L0,700 Z" fill="#aebece" fillOpacity="0.18" />
              <ellipse cx="1300" cy="180" rx="360" ry="260" fill="#ccd8e8" fillOpacity="0.18" />
            </svg>
            <div style={{ position: 'absolute', top: '-60px', left: '-60px', width: '560px', height: '440px', background: 'radial-gradient(ellipse at 40% 40%, rgba(216,226,240,0.40) 0%, transparent 70%)', filter: 'blur(32px)', borderRadius: '50%' }} />
          </div>

          <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map(({ icon, title, description }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 hover:shadow-md transition-shadow"
                >
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#44A5F0]">
                    {icon}
                  </div>
                  <h3 className="mb-2 text-base font-semibold text-slate-900">{title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" style={{ backgroundColor: '#F5FBF8' }} className="py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                from practice to a higher score
              </h2>
              <p className="mt-4 text-lg text-slate-500">
                Four steps from setup to a detailed score report.
              </p>
            </div>

            <div className="relative">
              <div
                aria-hidden
                className="absolute left-1/2 top-5 hidden h-0.5 w-3/4 -translate-x-1/2 bg-blue-100 lg:block"
              />
              <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
                {steps.map(({ number, title, description }) => (
                  <div key={number} className="relative text-center">
                    <div className="relative z-10 mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#44A5F0] text-sm font-bold text-white">
                      {number}
                    </div>
                    <h3 className="mb-2 font-semibold text-slate-900">{title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-slate-900 py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-snug">
              your SAT test day is coming.{' '}
              <span style={{ color: '#93c5fd' }}>
                don&apos;t let the first full test be the real one.
              </span>
            </h2>
            <p className="mt-4 text-lg text-slate-400">
              Practice with 5 full-length SAT-style forms, get instant score feedback, and drill your weak areas with personalized question sets — all before test day.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/signup?next=/premade/sat">
                <Button size="lg" className="bg-[#44A5F0] hover:bg-[#2d8fd4]">
                  Start Free SAT Practice
                </Button>
              </Link>
              <Link href="/pricing">
                <Button size="lg" variant="outline" className="border-slate-600 text-slate-300 hover:border-emerald-500 hover:text-white bg-transparent">
                  View SAT Premium
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Logo className="[&_span]:text-white" />
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} MockMate. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-slate-500">
              <Link href="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
              <Link href="/ai-disclosure" className="hover:text-slate-300 transition-colors">AI Disclosure</Link>
              <Link href="/sat-disclaimer" className="hover:text-slate-300 transition-colors">SAT Disclaimer</Link>
              <Link href="/refund-policy" className="hover:text-slate-300 transition-colors">Refund Policy</Link>
              <a href="mailto:ranvi@mockmateapp.com" className="hover:text-slate-300 transition-colors">Contact</a>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 border-t border-slate-800 pt-5">
            <Link href="/digital-sat-prep" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Digital SAT Prep</Link>
            <Link href="/resources" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Resources</Link>
            <Link href="/about" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">About</Link>
            <Link href="/contact" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Contact</Link>
            <Link href="/privacy" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Privacy</Link>
            <Link href="/terms" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Terms</Link>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed text-center max-w-4xl mx-auto">
            MockMate is an independent educational technology service and is not affiliated with, endorsed by, or sponsored by College Board®. SAT® is a registered trademark of College Board, which is not involved in the production of, and does not endorse, this product. Practice exam scores are estimates generated by a proprietary scoring algorithm and do not represent official SAT scores. AI-generated feedback is provided for educational guidance only and may be incomplete or inaccurate. Users must be at least 13 years old to use MockMate. By using this service you agree to our{' '}
            <Link href="/terms" className="underline hover:text-slate-400">Terms of Service</Link>,{' '}
            <Link href="/privacy" className="underline hover:text-slate-400">Privacy Policy</Link>,{' '}
            <Link href="/ai-disclosure" className="underline hover:text-slate-400">AI Disclosure</Link>, and{' '}
            <Link href="/sat-disclaimer" className="underline hover:text-slate-400">SAT Disclaimer</Link>.
          </p>
        </div>
      </footer>
    </div>
  )
}

const satPremiumFeatureLinks = [
  { text: '5 full-length adaptive SAT exams', href: '/sat-practice-test' },
  { text: '700+ question bank', href: '/sat-question-bank' },
  { text: 'SAT Reading and Writing Academy', href: '/sat-reading-writing-academy' },
  { text: 'SAT Math & Desmos Academy', href: '/sat-math-desmos-academy' },
  { text: 'Personalized score reports', href: '/sat-score-reports' },
  { text: 'Unlimited use', href: '/pricing' },
]

const badges: Array<{ label: string; href: string; icon: React.ReactNode }> = [
  {
    label: '700+ SAT Question Bank',
    href: '/sat-question-bank',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  {
    label: 'SAT Forms 1–5',
    href: '/sat-practice-test',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
      </svg>
    ),
  },
  {
    label: 'SAT Premium — affordable monthly plan',
    href: '/pricing',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: 'Independent SAT-style practice',
    href: '/digital-sat-prep',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
  },
  {
    label: 'SAT Reading & Writing Academy',
    href: '/sat-rw-academy',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0118 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  {
    label: 'SAT Math & Desmos Academy',
    href: '/sat-math-academy',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.745 3A23.933 23.933 0 003 12c0 3.183.62 6.22 1.745 9M19.255 3A23.933 23.933 0 0121 12c0 3.183-.62 6.22-1.745 9M8.25 8.885l1.444-.89a.75.75 0 011.105.402l2.402 7.206a.75.75 0 001.104.401l1.445-.889m-8.25.75l.213.09a1.687 1.687 0 002.062-.617l4.45-6.676a1.688 1.688 0 012.062-.618l.213.09" />
      </svg>
    ),
  },
]

const features = [
  {
    title: 'Full-length SAT-style exams',
    description:
      'Five complete SAT-style forms with adaptive module routing — the same structure as test day. Get a 400–1600 estimated score the moment you finish.',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
  {
    title: 'Instant score & breakdown',
    description:
      'Submit your answers and get a scaled score immediately — broken down by section, domain, and skill so you know exactly where to focus next.',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
  {
    title: '700+ question Q-Bank',
    description:
      'Filter by domain, skill, and difficulty. Build targeted sets that drill your weakest areas — all independently created SAT-style questions.',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
      </svg>
    ),
  },
  {
    title: 'Adaptive difficulty routing',
    description:
      'Module 2 difficulty adjusts based on your Module 1 performance — just like the real digital SAT. Practice under the same pressure you\'ll face test day.',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    title: 'SAT Reading & Writing Academy',
    description:
      'A structured learning path through all 11 SAT R&W skills — vocabulary, grammar, rhetoric, and more — with trainers, milestones, and a capstone exam.',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  {
    title: 'SAT Math & Desmos Academy',
    description:
      'Master every SAT Math skill — from algebra to advanced functions — with guided lessons, Desmos tool training, and adaptive practice sets.',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z" />
      </svg>
    ),
  },
  {
    title: 'Timed, test-day conditions',
    description:
      'Strict per-module timers, no pausing, no going back between sections — the same rules as test day so focus and pacing become habit.',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
]

const steps = [
  {
    number: '1',
    title: 'Create a free account',
    description:
      'Sign up in under 30 seconds. No credit card required to access SAT practice exams.',
  },
  {
    number: '2',
    title: 'Take a full-length practice exam',
    description:
      'Sit a complete SAT-style form under timed, test-day conditions with adaptive module routing.',
  },
  {
    number: '3',
    title: 'Review your score report',
    description:
      'See your estimated 400–1600 score with a full domain-by-domain breakdown immediately after submission.',
  },
  {
    number: '4',
    title: 'Strengthen your weak areas',
    description:
      'Target the skills holding back your score with the 700+ question Q-Bank, the SAT Reading & Writing Academy, and the SAT Math & Desmos Academy — all in one place.',
  },
]
