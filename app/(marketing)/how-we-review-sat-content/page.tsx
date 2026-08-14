import type { Metadata } from 'next'
import Link from 'next/link'
import { SeoPageLayout } from '@/components/seo/SeoPageLayout'
import { JsonLd } from '@/components/seo/JsonLd'
import { IndependenceCallout } from '@/components/seo/IndependenceCallout'
import { ArticleByline } from '@/components/seo/ArticleByline'
import { buildSeoMetadata, SITE_URL, OG_IMAGE } from '@/components/seo/seo-meta'

const SLUG = '/how-we-review-sat-content'

export const metadata: Metadata = buildSeoMetadata({
  title: 'How MockMate SAT Questions Are Reviewed | MockMate',
  description:
    'Learn how MockMate checks SAT-style questions for accuracy, clarity, difficulty, explanations, formatting, and alignment with Digital SAT skill categories.',
  slug: SLUG,
})

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'How MockMate SAT Questions Are Reviewed',
    url: `${SITE_URL}${SLUG}`,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'How MockMate SAT Questions Are Reviewed',
    datePublished: '2026-06-30',
    dateModified: '2026-07-30',
    author: { '@type': 'Organization', name: 'MockMate Editorial Team' },
    publisher: { '@type': 'Organization', name: 'MockMate', logo: { '@type': 'ImageObject', url: OG_IMAGE } },
    image: OG_IMAGE,
    mainEntityOfPage: `${SITE_URL}${SLUG}`,
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

export default function HowWeReviewContentPage() {
  return (
    <SeoPageLayout>
      <JsonLd data={jsonLd} />

      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        Our SAT Content Review Process
      </h1>
      <ArticleByline />
      <p className="mt-4 max-w-3xl text-lg text-slate-600">
        Every MockMate question passes through a consistent review process before it
        reaches you. Here is how we check questions for accuracy, clarity, difficulty, and
        alignment with the Digital SAT skill framework.
      </p>

      <Section title="1. Question Creation">
        <p>
          Questions are independently created in the style of the Digital SAT and aligned
          to specific skill categories. We write original prompts, passages, and stimuli
          rather than reusing published material.
        </p>
      </Section>

      <Section title="2. Answer Verification">
        <p>
          Each question has a single verified correct answer. The remaining choices are
          written as plausible distractors that represent specific, recognizable error
          types rather than random wrong answers.
        </p>
      </Section>

      <Section title="3. Explanation Review">
        <p>
          Every question ships with an explanation that walks through the solution
          approach. Wrong-answer explanations identify the exact mistake a student likely
          made to arrive at that choice.
        </p>
      </Section>

      <Section title="4. Difficulty Calibration">
        <p>
          Questions are labeled easy, medium, or hard, and the distribution across a form
          targets realistic exam conditions rather than clustering at one difficulty.
        </p>
      </Section>

      <Section title="5. Domain and Skill Alignment">
        <p>
          Each question is tagged to a specific domain and skill that matches the Digital
          SAT framework, which is what makes targeted, skill-by-skill practice possible.
        </p>
      </Section>

      <Section title="6. Formatting Review">
        <p>
          Question text, answer choices, and stimuli are checked for rendering accuracy —
          including tables, figures, and math notation — so nothing displays incorrectly.
        </p>
      </Section>

      <Section title="7. User Feedback Review">
        <p>
          Feedback submitted by students on individual questions is reviewed and used to
          correct or improve items over time. Reader reports are a core input to the
          review loop.
        </p>
      </Section>

      <Section title="8. Not Affiliated with College Board">
        <p>
          MockMate questions are original and independently produced. This review process
          is internal to MockMate and does not involve College Board review, endorsement,
          or approval.
        </p>
      </Section>

      <Section title="9. Correction Workflow">
        <p>
          When an issue is reported, it is investigated and, where warranted, corrected.
          Corrections apply to all future attempts, so fixes benefit every student who
          sees the question next.
        </p>
        <p>
          <Link href="/contact" className="font-medium text-brand-500 hover:text-brand-600">
            Report a content issue →
          </Link>
        </p>
      </Section>

      <IndependenceCallout />
    </SeoPageLayout>
  )
}
