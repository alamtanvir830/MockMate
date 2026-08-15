import type { Metadata } from 'next'
import Link from 'next/link'
import { SeoPageLayout } from '@/components/seo/SeoPageLayout'
import { JsonLd } from '@/components/seo/JsonLd'
import { IndependenceCallout } from '@/components/seo/IndependenceCallout'
import { ArticleByline } from '@/components/seo/ArticleByline'
import { buildSeoMetadata } from '@/components/seo/seo-meta'
import { buildArticleJsonLd } from '@/components/seo/article-jsonld'

const SLUG = '/resources/sat-rhetorical-synthesis'
const TITLE = 'SAT Rhetorical Synthesis: Strategy, Examples & Practice'
const DESCRIPTION =
  'How SAT Rhetorical Synthesis questions work, why mentioning all the notes is not enough, and a step-by-step strategy for choosing the sentence that achieves the stated rhetorical goal.'

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
})

function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 text-[15px] leading-relaxed text-slate-700">{children}</p>
}
function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-10 text-xl font-bold text-slate-900">{children}</h2>
}

export default function RhetoricalSynthesisArticle() {
  return (
    <SeoPageLayout>
      <JsonLd data={jsonLd} />

      <div className="text-sm text-slate-500 mb-4">
        <Link href="/resources" className="hover:text-brand-600">Resources</Link>
        <span className="mx-1.5">›</span>
        <Link href="/resources/sat-reading-writing" className="hover:text-brand-600">SAT Reading &amp; Writing</Link>
        <span className="mx-1.5">›</span>
        <span>Rhetorical Synthesis</span>
      </div>

      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        {TITLE}
      </h1>
      <ArticleByline />

      <P>
        Rhetorical Synthesis is a question type unique to the Digital SAT&apos;s Expression of
        Ideas domain. Instead of reading a traditional passage, you are given a set of notes
        — typically three to five bullet points representing a student&apos;s research — and asked
        to choose the sentence that best synthesizes those notes to accomplish a specific
        stated purpose. The question is not asking which sentence is accurate or which
        mentions the most facts. It is asking which sentence achieves the stated rhetorical
        goal most effectively.
      </P>

      <H2>How the question is structured</H2>
      <P>
        A typical Rhetorical Synthesis question looks like this: a student has taken notes
        on a topic (three to five bullet points), and the question specifies a rhetorical
        goal — for example, emphasizing a contrast or highlighting a cause-effect relationship.
        It then asks which sentence most effectively uses the notes to accomplish that goal.
      </P>
      <P>
        The rhetorical goal in the question stem is the key. It specifies not just what
        information to include, but what the sentence is supposed to <em>do</em> — emphasize
        a contrast, support a main claim, introduce a topic to a particular audience,
        highlight a cause-effect relationship, or present an example.
      </P>

      <H2>Common rhetorical goals tested</H2>
      <ul className="mt-4 ml-5 space-y-2 text-[15px] text-slate-700 list-disc">
        <li><strong>Emphasize a similarity or contrast</strong> between two items in the notes</li>
        <li><strong>Support a general claim</strong> with specific evidence from the notes</li>
        <li><strong>Introduce a topic to a general audience</strong> without assuming prior knowledge</li>
        <li><strong>Highlight a cause-effect relationship</strong> between two facts in the notes</li>
        <li><strong>Present an example</strong> of a broader trend mentioned in the notes</li>
        <li><strong>Provide context</strong> for a finding or result described in the notes</li>
      </ul>

      <H2>The primary trap: including all the facts</H2>
      <P>
        The most common wrong answers in Rhetorical Synthesis questions are sentences that
        include multiple facts from the notes but do not achieve the stated goal. They may
        be accurate and comprehensive, but they are not doing the specific rhetorical work
        described in the question.
      </P>
      <P>
        For example, if the goal is to emphasize the contrast between two findings, a
        sentence that describes both findings accurately but without contrasting language
        is worse than a sentence that explicitly signals the contrast using words like
        <em>unlike</em> or <em>however</em>.
      </P>
      <P>
        The test deliberately includes fact-dense but goal-mismatched options as distractors.
        Students who evaluate answer choices by checking whether the facts are present will
        choose these. Students who evaluate by checking whether the stated goal is achieved
        will eliminate them.
      </P>

      <H2>Solving strategy</H2>
      <P>
        Step 1: Read the notes carefully to understand the available information.
      </P>
      <P>
        Step 2: Read the rhetorical goal precisely. Identify: (a) what the sentence must
        accomplish and (b) for whom (general audience, specialist audience, other students, etc.).
      </P>
      <P>
        Step 3: Before reading the answer choices, predict what kind of sentence would
        achieve the goal. If the goal is to emphasize a contrast, the correct answer will
        use contrast language. If the goal is to introduce a topic to a general audience,
        the answer will provide context rather than assume familiarity.
      </P>
      <P>
        Step 4: Eliminate any choice that: (a) achieves a different rhetorical goal than
        stated, (b) misrepresents the information in the notes, or (c) includes information
        not relevant to the stated goal.
      </P>
      <P>
        Step 5: Confirm that the remaining answer both achieves the stated goal and is
        accurate relative to the notes.
      </P>

      <H2>Original worked example</H2>
      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-5">
        <p className="text-sm font-semibold text-slate-700">Notes (original)</p>
        <ul className="mt-3 space-y-1.5 text-[14px] text-slate-700 list-disc ml-5">
          <li>The humpback whale was listed as endangered in 1970.</li>
          <li>Commercial whaling was banned under the International Whaling Commission moratorium in 1986.</li>
          <li>By 2016, most North Pacific humpback whale populations had recovered and were removed from the endangered list.</li>
          <li>Conservation groups credited the ban with creating conditions for recovery.</li>
        </ul>
        <p className="mt-4 text-[14px] text-slate-700">
          <strong>Goal:</strong> The student wants to emphasize the cause-effect relationship
          between a policy decision and the humpback whale&apos;s recovery.
        </p>
        <div className="mt-3 space-y-2 text-[14px]">
          <p className="text-slate-600">(A) Humpback whales were listed as endangered in 1970; the International Whaling Commission banned commercial whaling in 1986.</p>
          <p className="text-slate-600">(B) Most North Pacific humpback whale populations recovered by 2016, decades after the commercial whaling ban, which conservation groups credited with creating conditions for recovery.</p>
          <p className="text-slate-600">(C) The humpback whale was once listed as endangered, but by 2016 many populations had recovered.</p>
          <p className="text-slate-600">(D) Conservation groups and the International Whaling Commission both played roles in efforts to protect humpback whales beginning in the 1970s and 1980s.</p>
        </div>
        <div className="mt-5 border-t border-slate-200 pt-4">
          <p className="text-sm font-semibold text-slate-700">Explanation</p>
          <p className="mt-2 text-[14px] leading-relaxed text-slate-600">
            The goal is to show cause-effect between a <em>policy decision</em> (the ban)
            and the <em>recovery</em>. (A) lists two events without any causal connection.
            (C) notes recovery but mentions nothing about what caused it.
            (D) is vague and does not name recovery as the effect.
            (B) explicitly names the ban, names the recovery, and attributes the causal
            relationship to conservation groups — satisfying the cause-effect requirement.
            The answer is <strong>(B)</strong>.
          </p>
        </div>
      </div>

      <H2>Practice and study recommendations</H2>
      <P>
        Rhetorical Synthesis improves fastest when you practice evaluating sentences against
        a stated goal rather than against factual accuracy. After practicing a set, review
        not just what you got wrong but whether you were evaluating goals or evaluating facts —
        the mindset shift is the key skill.
      </P>
      <P>
        MockMate&apos;s Reading &amp; Writing Academy covers Rhetorical Synthesis with lessons
        organized around the common goal types, worked examples, and targeted practice
        with immediate feedback on your reasoning.
      </P>

      <div className="mt-8 rounded-xl border border-brand-200 bg-brand-50/50 p-5">
        <p className="text-sm font-semibold text-brand-800">Practice Rhetorical Synthesis on MockMate</p>
        <p className="mt-1 text-[14px] text-brand-700 leading-relaxed">
          The R&amp;W Academy&apos;s Rhetorical Synthesis lesson walks through each goal type with
          worked examples and targeted practice questions.
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
          <Link href="/resources/sat-transitions-practice" className="text-brand-600 hover:underline">→ Transitions: picking the right logical connector</Link>
          <Link href="/resources/sat-command-of-evidence-practice" className="text-brand-600 hover:underline">→ Command of Evidence: strategy</Link>
          <Link href="/sat-question-bank" className="text-brand-600 hover:underline">→ SAT Question Bank — filter by skill</Link>
        </div>
      </section>

      <IndependenceCallout />
    </SeoPageLayout>
  )
}
