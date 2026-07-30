import Link from 'next/link'

const SUPPORT_EMAIL = 'ranvi.contact@gmail.com'

type FooterColumn = {
  heading: string
  links: Array<{ label: string; href: string }>
}

const COLUMNS: FooterColumn[] = [
  {
    heading: 'Practice',
    links: [
      { label: 'SAT Practice Test', href: '/sat-practice-test' },
      { label: 'Question Bank', href: '/sat-question-bank' },
      { label: 'Digital SAT Prep', href: '/digital-sat-prep' },
    ],
  },
  {
    heading: 'Courses',
    links: [
      { label: 'Reading & Writing Academy', href: '/sat-reading-writing-academy' },
      { label: 'Math & Desmos Academy', href: '/sat-math-desmos-academy' },
      { label: 'Score Reports', href: '/sat-score-reports' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Resources', href: '/resources' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Refund Policy', href: '/refund-policy' },
      { label: 'SAT Disclaimer', href: '/sat-disclaimer' },
      { label: 'AI Disclosure', href: '/ai-disclosure' },
    ],
  },
]

export function SeoFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <h2 className="text-sm font-semibold text-slate-900">{col.heading}</h2>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-600 transition-colors hover:text-emerald-600"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6">
          <p className="text-sm text-slate-500">
            Questions or feedback? Email us at{' '}
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="font-medium text-emerald-600 hover:text-emerald-700"
            >
              {SUPPORT_EMAIL}
            </a>
            .
          </p>
          <p className="mt-4 text-xs leading-relaxed text-slate-400">
            © 2026 MockMate. MockMate is independent and not affiliated with College
            Board. SAT is a trademark registered by the College Board, which is not
            affiliated with and does not endorse MockMate.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default SeoFooter
