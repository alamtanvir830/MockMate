import type { Metadata } from 'next'
import Link from 'next/link'
import { SeoPageLayout } from '@/components/seo/SeoPageLayout'
import { JsonLd } from '@/components/seo/JsonLd'
import { IndependenceCallout } from '@/components/seo/IndependenceCallout'
import { ArticleByline } from '@/components/seo/ArticleByline'
import { buildSeoMetadata } from '@/components/seo/seo-meta'
import { buildArticleJsonLd } from '@/components/seo/article-jsonld'

const SLUG = '/resources/sat-command-of-evidence-practice'
const TITLE = 'SAT Command of Evidence: Textual & Quantitative Questions'
const DESCRIPTION =
  'How SAT Command of Evidence questions work, the critical difference between textual and quantitative subtypes, the most common traps, and a strategy for both.'

export const metadata: Metadata = buildSeoMetadata({
  title: `${TITLE} | MockMate`,
  description: DESCRIPTION,
  slug: SLUG,
})

const jsonLd = buildArticleJsonLd({
  headline: TITLE,
  description: DESCRIPTION,
  slug: SLUG,
  datePublished: '2026-08-15',
  breadcrumbs: [
    { name: 'Home', href: '/' },
    { name: 'Resources', href: '/resources' },
    { name: 'SAT Reading & Writing', href: '/resources/sat-reading-writing' },
    { name: 'Command of Evidence' },
  ],
})

function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 text-[15px] leading-relaxed text-slate-700">{children}</p>
}
function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-10 text-xl font-bold text-slate-900">{children}</h2>
}

export default function CommandOfEvidenceArticle() {
  return (
    <SeoPageLayout>
      <JsonLd data={jsonLd} />

      <div className="text-sm text-slate-500 mb-4">
        <Link href="/resources" className="hover:text-brand-600">Resources</Link>
        <span className="mx-1.5">›</span>
        <Link href="/resources/sat-reading-writing" className="hover:text-brand-600">SAT Reading &amp; Writing</Link>
        <span className="mx-1.5">›</span>
        <span>Command of Evidence</span>
      </div>

      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        {TITLE}
      </h1>
      <ArticleByline />

      <P>
        Command of Evidence questions are one of the most distinctive question types on the
        Digital SAT. They require you to find specific evidence — either in a passage or in
        a data table or chart — that directly supports a particular claim. The skill is not
        about what the passage is generally about; it is about finding the precise sentence
        or data point that proves a specific statement.
      </P>

      <H2>Two distinct subtypes</H2>
      <P>
        <strong>Textual Command of Evidence.</strong> You are given a passage and a claim,
        and asked which quotation from the passage provides the best evidence for that claim.
        All four answer choices are quotations from the passage — they are all real, and
        some are relevant-sounding. Your job is to find the one that directly proves the
        specific claim stated in the question.
      </P>
      <P>
        <strong>Quantitative Command of Evidence.</strong> You are given a passage alongside
        a table, graph, or chart. The passage makes a claim and a blank or underlined phrase
        needs to be completed. You must read the data accurately to identify which answer
        choice correctly represents what the data shows — and supports what the author is
        trying to say.
      </P>

      <H2>The central trap: relevant versus sufficient</H2>
      <P>
        The most common error on textual questions is choosing a quotation that is
        <em> related to the topic</em> of the claim rather than one that <em>directly proves</em>
        the claim. The wrong answers are usually from parts of the passage that are
        topically adjacent to the claim — they mention the same subject, but they do not
        provide the specific evidence the claim requires.
      </P>
      <P>
        For example, if the claim is that a colony&apos;s population declined after 1850, a
        quotation describing the colony&apos;s economic struggles in 1855 is related but does
        not prove the population claim. A quotation stating that by 1860, fewer than half the
        original settlers remained, directly proves it.
      </P>

      <H2>Textual strategy</H2>
      <P>
        Step 1: Read the claim precisely. Underline or note the exact thing it is asserting.
        Pay attention to specifics: a claim about timing, magnitude, or direction requires
        evidence that addresses those same specifics.
      </P>
      <P>
        Step 2: For each answer choice quotation, test whether that sentence alone proves
        the claim. If you would need to add an inference or combine it with other
        information to make it prove the claim, it is probably wrong.
      </P>
      <P>
        Step 3: Eliminate any quotation that is only topically related, and any that
        contradicts or is unrelated to the claim. The correct answer will be the one
        that most directly and specifically supports the stated claim.
      </P>

      <H2>Quantitative strategy</H2>
      <P>
        Step 1: Read the table or chart carefully — titles, axis labels, and units — before
        looking at the answer choices. Many errors happen because students misread what the
        data is measuring or confuse row and column values.
      </P>
      <P>
        Step 2: Identify what the passage is claiming about the data. The question will
        indicate what kind of evidence is needed (a trend, a specific value, a comparison
        between groups, etc.).
      </P>
      <P>
        Step 3: Find the specific value or pattern in the data that matches the claim.
        Then check the answer choices: the correct answer will describe that data accurately
        using language consistent with the passage.
      </P>
      <P>
        Common quantitative traps: misreading a percentage as a raw number, confusing
        <em>increased</em> with <em>decreased</em>, or citing data from the wrong row or column.
        Always verify the number directly from the chart before confirming your answer.
      </P>

      <H2>Original textual example</H2>
      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-5">
        <p className="text-sm font-semibold text-slate-700">Passage excerpt (original)</p>
        <p className="mt-3 text-[15px] leading-relaxed text-slate-800 italic">
          The gray wolf was formally reintroduced to Yellowstone National Park in 1995.
          In the years that followed, elk populations, which had grown unchecked, began
          to decline. Some ecologists attributed the decline not only to direct predation
          but to behavioral shifts: elk spent less time grazing in open valleys, which
          allowed riverbank vegetation to recover. Stream banks stabilized, and beaver
          populations — dependent on that vegetation — increased substantially by 2010.
        </p>
        <p className="mt-4 text-[14px] text-slate-700">
          <strong>Claim:</strong> The wolves&apos; reintroduction benefited species beyond
          the wolf itself.
        </p>
        <p className="mt-2 text-[14px] text-slate-700">Which quotation from the passage best supports this claim?</p>
        <div className="mt-3 space-y-1.5 text-[14px]">
          <p className="text-slate-600">(A) The gray wolf was formally reintroduced to Yellowstone National Park in 1995.</p>
          <p className="text-slate-600">(B) Elk populations, which had grown unchecked, began to decline.</p>
          <p className="text-slate-600">(C) Elk spent less time grazing in open valleys, which allowed riverbank vegetation to recover.</p>
          <p className="text-slate-600">(D) Beaver populations — dependent on that vegetation — increased substantially by 2010.</p>
        </div>
        <div className="mt-5 border-t border-slate-200 pt-4">
          <p className="text-sm font-semibold text-slate-700">Explanation</p>
          <p className="mt-2 text-[14px] leading-relaxed text-slate-600">
            The claim is about species <em>other than wolves</em> benefiting. (A) simply
            describes the reintroduction — no benefit. (B) describes elk declining, which
            does not clearly show benefit to other species. (C) describes a vegetation
            change — an ecosystem effect but not a species benefiting. (D) directly shows
            beaver populations increasing as a result — a specific, different species
            benefiting. The answer is <strong>(D)</strong>.
          </p>
        </div>
      </div>

      <H2>Practice and study recommendations</H2>
      <P>
        Command of Evidence questions improve most with deliberate practice in identifying
        exactly what a claim is asserting, then testing each answer choice against that
        precise assertion. Students who improve fastest do not look at the choices first —
        they read the claim, form a clear picture of what would prove it, and then test
        the choices against that picture.
      </P>
      <P>
        Practice quantitative questions with real tables and charts to build fluency in
        reading data. Errors on quantitative questions are usually reading errors, not
        reasoning errors — slowing down on the data itself saves more time than it costs.
      </P>

      <div className="mt-8 rounded-xl border border-brand-200 bg-brand-50/50 p-5">
        <p className="text-sm font-semibold text-brand-800">Practice Command of Evidence on MockMate</p>
        <p className="mt-1 text-[14px] text-brand-700 leading-relaxed">
          MockMate&apos;s R&amp;W Academy covers both subtypes with lessons, worked examples, and
          targeted practice. The question bank includes Command of Evidence and Quantitative
          Evidence as separate filterable skills.
        </p>
        <Link
          href="/sat-reading-writing-academy"
          className="mt-3 inline-block rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-4 py-2 transition-colors"
        >
          Open R&amp;W Academy
        </Link>
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-slate-900">Related resources</h2>
        <div className="mt-4 flex flex-col gap-2 text-[15px]">
          <Link href="/resources/sat-reading-writing" className="text-brand-600 hover:underline">→ SAT Reading &amp; Writing: all domains and skills</Link>
          <Link href="/resources/sat-words-in-context-practice" className="text-brand-600 hover:underline">→ Words in Context: strategy</Link>
          <Link href="/resources/sat-transitions-practice" className="text-brand-600 hover:underline">→ Transitions: picking the right logical connector</Link>
          <Link href="/sat-question-bank" className="text-brand-600 hover:underline">→ SAT Question Bank — filter by skill</Link>
        </div>
      </section>

      <IndependenceCallout />
    </SeoPageLayout>
  )
}
