import type { Metadata } from 'next'
import Link from 'next/link'
import { SeoPageLayout } from '@/components/seo/SeoPageLayout'
import { JsonLd } from '@/components/seo/JsonLd'
import { IndependenceCallout } from '@/components/seo/IndependenceCallout'
import { buildSeoMetadata, SITE_URL } from '@/components/seo/seo-meta'

const SLUG = '/sat-score-reports'

export const metadata: Metadata = buildSeoMetadata({
  title: 'SAT Practice Score Reports and Skill Analysis | MockMate',
  description:
    'See estimated SAT section scores, domain performance, skill breakdowns, and targeted practice recommendations after completing a MockMate SAT-style exam.',
  slug: SLUG,
})

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'SAT Practice Score Reports and Skill Analysis',
  url: `${SITE_URL}${SLUG}`,
  description:
    'See estimated SAT section scores, domain performance, skill breakdowns, and targeted practice recommendations after completing a MockMate SAT-style exam.',
}

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

export default function ScoreReportsPage() {
  return (
    <SeoPageLayout>
      <JsonLd data={jsonLd} />

      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        Understand More Than Just Your Practice Score
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-slate-600">
        A MockMate score report is a study plan in disguise. Beyond an estimated total, it
        shows section scores, domain and skill breakdowns, and exactly what to practice
        next.
      </p>

      <Section title="Estimated Total Score">
        <p>
          After you complete a form, MockMate produces an estimated total on the 400–1600
          scale so you can gauge where you stand.
        </p>
      </Section>

      <Section title="Section Scores">
        <p>
          The report splits your estimate into a Reading and Writing section score and a
          Math section score, so you can see which section is pulling the total up or down.
        </p>
      </Section>

      <Section title="Domain-Level Results">
        <p>
          You see how you performed across the four Reading and Writing domains and the
          four Math domains, making it clear which broad areas are strengths and which are
          weaknesses.
        </p>
      </Section>

      <Section title="Skill-Level Results">
        <p>
          Within each domain, the report drills down to individual skills, so &quot;weak in
          Math&quot; becomes something specific like &quot;quadratic equations need work.&quot;
        </p>
      </Section>

      <Section title="Correct and Incorrect Answers">
        <p>
          Every question is reviewable after submission, marked correct or incorrect, with
          your answer next to the intended one.
        </p>
      </Section>

      <Section title="Explanations">
        <p>
          Each question includes a worked explanation. For questions you missed, the
          explanation identifies the specific error so you can avoid repeating it.
        </p>
      </Section>

      <Section title="Strengths and Weaknesses">
        <p>
          The report visually separates strong skills from weak ones, so you can prioritize
          at a glance instead of guessing where to focus.
        </p>
      </Section>

      <Section title="Turning Results Into a Study Plan">
        <ol className="ml-5 list-decimal space-y-1">
          <li>Identify your weakest domain from the report.</li>
          <li>Study the matching lessons in the R&W or Math Academy.</li>
          <li>Practice targeted question-bank sets for that skill.</li>
          <li>Retest with another form to confirm improvement.</li>
        </ol>
        <p>
          <Link href="/sat-question-bank" className="font-medium text-emerald-600 hover:text-emerald-700">
            Practice weak skills in the question bank →
          </Link>
        </p>
      </Section>

      <Section title="Score Limitations">
        <ul className="ml-5 list-disc space-y-2">
          <li>MockMate scores are estimates produced by a proprietary scoring model.</li>
          <li>They are not official College Board scores.</li>
          <li>
            A harder form can produce a lower practice score without meaning your skills
            regressed — difficulty varies between forms.
          </li>
          <li>
            Official SAT scores depend on the full standardized administration and cannot
            be reproduced exactly by any practice tool.
          </li>
        </ul>
      </Section>

      <Section title="No Real Score Data Published">
        <p>
          This page describes the score-report experience. It does not display any real
          user data or published score results.
        </p>
      </Section>

      <IndependenceCallout />
    </SeoPageLayout>
  )
}
