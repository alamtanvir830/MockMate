import Link from 'next/link'
import { Logo } from '@/components/shared/logo'

const legalLinks = [
  { href: '/terms', label: 'Terms of Service' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/ai-disclosure', label: 'AI Disclosure' },
  { href: '/sat-disclaimer', label: 'SAT Disclaimer' },
  { href: '/refund-policy', label: 'Refund Policy' },
]

export function LegalLayout({
  title,
  lastUpdated,
  children,
}: {
  title: string
  lastUpdated: string
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/">
              <Logo />
            </Link>
            <Link href="/" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
              ← Back to home
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-10 border-b border-slate-100 pb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">{title}</h1>
          <p className="text-sm text-slate-400">Last updated: {lastUpdated}</p>
        </div>
        <div className="space-y-8 text-slate-700 text-[15px] leading-relaxed">
          {children}
        </div>
      </main>

      <footer className="border-t border-slate-200 py-8 mt-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500 justify-center mb-4">
            {legalLinks.map(({ href, label }) => (
              <Link key={href} href={href} className="hover:text-slate-800 transition-colors">
                {label}
              </Link>
            ))}
            <a href="mailto:support@mockmate.app" className="hover:text-slate-800 transition-colors">
              Contact
            </a>
          </div>
          <p className="text-center text-xs text-slate-400">
            © {new Date().getFullYear()} MockMate. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-bold text-slate-900 mb-3">{title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  )
}

export function LegalP({ children }: { children: React.ReactNode }) {
  return <p className="text-[15px] text-slate-600 leading-relaxed">{children}</p>
}

export function LegalList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc list-inside space-y-1.5 text-[15px] text-slate-600">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  )
}
