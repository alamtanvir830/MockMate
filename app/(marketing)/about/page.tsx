import type { Metadata } from 'next'
import Link from 'next/link'
import { SeoPageLayout } from '@/components/seo/SeoPageLayout'
import { JsonLd } from '@/components/seo/JsonLd'
import { IndependenceCallout } from '@/components/seo/IndependenceCallout'
import { buildSeoMetadata, SITE_URL, OG_IMAGE } from '@/components/seo/seo-meta'

const SLUG = '/about'

export const metadata: Metadata = buildSeoMetadata({
  title: 'About MockMate SAT Prep | MockMate',
  description:
    'Learn why MockMate was created, how it approaches affordable Digital SAT preparation, and what students receive through the platform.',
  slug: SLUG,
})

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'About MockMate SAT Prep',
    url: `${SITE_URL}${SLUG}`,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'MockMate',
    url: SITE_URL,
    logo: OG_IMAGE,
    email: 'ranvi@mockmateapp.com',
    description:
      'MockMate is an independent, affordable Digital SAT preparation platform offering adaptive SAT-style exams, a large question bank, and focused courses.',
  },
]

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold text-slate-900">{title}</h2>
      <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-slate-700">
        {children}
      </div>
    </section>
  )
}

export default function AboutPage() {
  return (
    <SeoPageLayout>
      <JsonLd data={jsonLd} />

      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        Why We Built MockMate
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-slate-600">
        MockMate exists to make rigorous SAT preparation genuinely affordable — without
        sacrificing the depth that expensive courses promise.
      </p>

      <Section title="Mission">
        <p>
          Our mission is to make serious test preparation accessible to every student,
          without the cost of traditional prep courses. High-quality practice should not
          be gated behind a four-figure tutoring bill.
        </p>
      </Section>

      <Section title="What We Built">
        <p>
          MockMate brings together full-length adaptive SAT-style exams, a 700+ question
          bank, a Reading and Writing Academy, a Math and Desmos Academy, and instant
          score reports — all in one place and one subscription.
        </p>
      </Section>

      <Section title="The Problem We Solve">
        <p>
          Full-length SAT practice, targeted skill drilling, and structured lessons
          normally come from separate, expensive providers — or only through College
          Board&apos;s own official tools. MockMate combines all three into a single
          connected workflow at a fraction of the cost.
        </p>
      </Section>

      <Section title="Who It's For">
        <p>
          MockMate is built for self-studying students, students supplementing tutoring
          with extra practice, and families looking for affordable, structured prep.
        </p>
      </Section>

      <Section title="Independence">
        <p>
          MockMate is independently operated and is not affiliated with the College Board.
          Our questions are original and independently created in the Digital SAT style.
        </p>
      </Section>

      <Section title="How to Contact Us">
        <p>
          Questions, feedback, or billing issues? Email{' '}
          <a href="mailto:ranvi@mockmateapp.com" className="font-medium text-emerald-600 hover:text-emerald-700">
            ranvi@mockmateapp.com
          </a>{' '}
          or visit our{' '}
          <Link href="/contact" className="font-medium text-emerald-600 hover:text-emerald-700">
            contact page
          </Link>
          .
        </p>
      </Section>

      <IndependenceCallout />
    </SeoPageLayout>
  )
}
