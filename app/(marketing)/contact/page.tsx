import type { Metadata } from 'next'
import Link from 'next/link'
import { SeoPageLayout } from '@/components/seo/SeoPageLayout'
import { JsonLd } from '@/components/seo/JsonLd'
import { IndependenceCallout } from '@/components/seo/IndependenceCallout'
import { buildSeoMetadata, SITE_URL } from '@/components/seo/seo-meta'

const SLUG = '/contact'
const SUPPORT_EMAIL = 'ranvi.contact@gmail.com'

export const metadata: Metadata = buildSeoMetadata({
  title: 'Contact MockMate | Support and Feedback',
  description:
    'Reach MockMate for support, content feedback, billing questions, or general inquiries. We respond to all messages.',
  slug: SLUG,
})

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact MockMate',
  url: `${SITE_URL}${SLUG}`,
  description:
    'Reach MockMate for support, content feedback, billing questions, or general inquiries.',
}

const CATEGORIES: Array<{ title: string; body: string }> = [
  { title: 'Technical issues', body: 'Problems loading a form, resuming an attempt, or accessing your account.' },
  { title: 'Billing and refunds', body: 'Questions about plans, charges, or our refund policy.' },
  { title: 'Content feedback', body: 'Errors, ambiguities, or suggestions on specific questions or explanations.' },
  { title: 'General questions', body: 'Anything else about MockMate, its features, or how to study with it.' },
]

export default function ContactPage() {
  return (
    <SeoPageLayout>
      <JsonLd data={jsonLd} />

      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        Contact MockMate
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-slate-600">
        We read and respond to every message. The fastest way to reach us is email.
      </p>

      <div className="mt-8 rounded-xl border border-emerald-200 bg-emerald-50 p-6">
        <h2 className="text-sm font-semibold text-emerald-900">Support email</h2>
        <a
          href={`mailto:${SUPPORT_EMAIL}`}
          className="mt-1 block text-lg font-bold text-emerald-700 hover:text-emerald-800"
        >
          {SUPPORT_EMAIL}
        </a>
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-slate-900">What we can help with</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {CATEGORIES.map((cat) => (
            <div key={cat.title} className="rounded-xl border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900">{cat.title}</h3>
              <p className="mt-1 text-[15px] leading-relaxed text-slate-700">{cat.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-slate-900">Reporting a question issue</h2>
        <p className="mt-3 text-[15px] leading-relaxed text-slate-700">
          If you spot an error in a specific question or explanation, you can report it
          directly while practicing, or email us with the details. Reports feed into our{' '}
          <Link href="/how-we-review-sat-content" className="font-medium text-emerald-600 hover:text-emerald-700">
            content review process
          </Link>
          , and corrections apply to all future attempts.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-slate-900">Helpful links</h2>
        <ul className="mt-3 ml-5 list-disc space-y-1 text-[15px] text-slate-700">
          <li><Link href="/privacy" className="font-medium text-emerald-600 hover:text-emerald-700">Privacy Policy</Link></li>
          <li><Link href="/terms" className="font-medium text-emerald-600 hover:text-emerald-700">Terms of Service</Link></li>
          <li><Link href="/refund-policy" className="font-medium text-emerald-600 hover:text-emerald-700">Refund Policy</Link></li>
          <li><Link href="/about" className="font-medium text-emerald-600 hover:text-emerald-700">About MockMate</Link></li>
          <li><Link href="/how-we-review-sat-content" className="font-medium text-emerald-600 hover:text-emerald-700">How We Review Content</Link></li>
        </ul>
      </section>

      <IndependenceCallout />
    </SeoPageLayout>
  )
}
