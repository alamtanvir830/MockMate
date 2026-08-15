import type { Metadata } from 'next'
import Link from 'next/link'
import { SeoPageLayout } from '@/components/seo/SeoPageLayout'
import { JsonLd } from '@/components/seo/JsonLd'
import { IndependenceCallout } from '@/components/seo/IndependenceCallout'
import { ArticleByline } from '@/components/seo/ArticleByline'
import { buildSeoMetadata } from '@/components/seo/seo-meta'
import { buildArticleJsonLd } from '@/components/seo/article-jsonld'

const SLUG = '/resources/sat-words-in-context-practice'
const TITLE = 'SAT Words in Context Practice: Questions & Strategies'
const DESCRIPTION =
  'How SAT Words in Context questions work, why the most familiar word definition is often wrong, and a step-by-step strategy for choosing the best answer using only the surrounding text.'

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
    { name: 'Words in Context' },
  ],
})

function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 text-[15px] leading-relaxed text-slate-700">{children}</p>
}
function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-10 text-xl font-bold text-slate-900">{children}</h2>
}

export default function WordsInContextArticle() {
  return (
    <SeoPageLayout>
      <JsonLd data={jsonLd} />

      <div className="text-sm text-slate-500 mb-4">
        <Link href="/resources" className="hover:text-brand-600">Resources</Link>
        <span className="mx-1.5">›</span>
        <Link href="/resources/sat-reading-writing" className="hover:text-brand-600">SAT Reading &amp; Writing</Link>
        <span className="mx-1.5">›</span>
        <span>Words in Context</span>
      </div>

      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        {TITLE}
      </h1>
      <ArticleByline />

      <P>
        Words in Context questions appear throughout the Digital SAT Reading &amp; Writing
        section. They fall into two types: definition questions that ask what a particular
        word or phrase means <em>as used in the passage</em>, and completion questions that
        ask you to choose the word that best fills a blank in the passage. Both types test
        the same underlying skill: reading closely enough to understand meaning from context,
        not from memory of a word&apos;s most common usage.
      </P>

      <H2>The two question types</H2>
      <P>
        <strong>Type 1 — Meaning in context.</strong> The question highlights a word in the
        passage and asks what a highlighted word most nearly means as used in the text. The
        word is almost always a common word used in a less familiar way, not a rare
        vocabulary word. The trap is choosing the word&apos;s most common definition rather than
        the meaning that fits this specific sentence.
      </P>
      <P>
        <strong>Type 2 — Completion.</strong> A sentence in the passage has a blank. The
        question asks which of four words or phrases most logically completes the sentence.
        This type tests whether you can identify what meaning the passage needs — including
        tone, register, and specificity — and match it to the right word.
      </P>

      <H2>Why the familiar definition is usually wrong</H2>
      <P>
        Consider the word <em>reserved</em>. Its most common meaning relates to being shy or
        withdrawn. But in a sentence about a hotel holding tables for guests, the word
        means set aside or designated. The SAT regularly tests common words in secondary
        meanings precisely because students who rely on vocabulary memory rather than
        contextual reading will choose the familiar meaning and get the question wrong.
      </P>
      <P>
        The completion questions use the same trap in reverse: all four choices are real
        words that might seem plausible, but only one fits the tone and logic of the
        surrounding text. A word can be technically accurate and contextually wrong.
      </P>

      <H2>Solving strategy</H2>
      <P>
        Step 1: Cover the answer choices. Read the sentence containing the word or blank,
        plus at least one sentence before and one after. Your goal is to understand what
        meaning the passage requires at this point, not what the word normally means.
      </P>
      <P>
        Step 2: Predict. Before looking at the options, think of a word or phrase in your
        own words that would fill the role. This prediction does not need to be perfect —
        it just needs to anchor your thinking so you are not swayed by how individual
        answer choices sound.
      </P>
      <P>
        Step 3: Match each choice to your prediction, and eliminate choices that do not
        match the contextual meaning, the tone, or the logical content of the surrounding
        sentences.
      </P>
      <P>
        Step 4: Substitute the remaining candidate(s) back into the sentence and read the
        whole sentence again. The correct answer should make the sentence read naturally
        and consistently with the surrounding passage.
      </P>

      <H2>Common traps</H2>
      <P>
        <strong>Choosing the most familiar definition.</strong> As described above, this is
        the primary trap for Type 1 questions. The test is specifically designed so that the
        word&apos;s most common meaning is one of the wrong answers.
      </P>
      <P>
        <strong>Choosing a word with the right general meaning but wrong register.</strong>
        For completion questions, a formal academic passage requires formal word choices.
        A word that is accurate but informal (or vice versa) will sound wrong in context
        even if technically correct. Register mismatch is a common eliminator.
      </P>
      <P>
        <strong>Choosing a word that is partially right.</strong> Sometimes two answer
        choices are both plausible, but one is more precise. The correct answer is almost
        always the most specific fit, not just a word that works.
      </P>

      <H2>Original worked example — meaning in context</H2>
      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-5">
        <p className="text-sm font-semibold text-slate-700">Practice question (original)</p>
        <p className="mt-3 text-[15px] leading-relaxed text-slate-800 italic">
          The architect&apos;s proposal was bold but not entirely novel. Several of the
          structural techniques she incorporated had already been <strong>established</strong>
          in commercial construction, though they had rarely been applied to residential buildings.
        </p>
        <p className="mt-3 text-[14px] text-slate-700">
          As used in the text, what does <em>established</em> most nearly mean?
        </p>
        <div className="mt-3 space-y-1.5 text-[14px]">
          <p className="text-slate-600">(A) Founded</p>
          <p className="text-slate-600">(B) Recognized</p>
          <p className="text-slate-600">(C) Proven</p>
          <p className="text-slate-600">(D) Confirmed</p>
        </div>
        <div className="mt-5 border-t border-slate-200 pt-4">
          <p className="text-sm font-semibold text-slate-700">Explanation</p>
          <p className="mt-2 text-[14px] leading-relaxed text-slate-600">
            The context says the techniques had already been established in commercial
            construction — meaning they were already in use and accepted. <em>Founded</em>
            (A) implies creating something from scratch, which contradicts the idea that
            they existed before. <em>Confirmed</em> (D) suggests verification rather than adoption.
            <em>Proven</em> (C) is close, but <em>recognized</em> (B) most precisely captures the idea
            of techniques that are accepted and known within the industry.
            The answer is <strong>(B)</strong>.
          </p>
        </div>
      </div>

      <H2>Practice and study recommendations</H2>
      <P>
        Words in Context questions reward consistent close-reading practice more than
        vocabulary memorization. The best way to improve is to practice with passages,
        forcing yourself to articulate why a word fits before looking at the choices.
        After practice, review not only which answers were wrong but why the wrong choices
        sound plausible — this is usually the result of reading the word in isolation.
      </P>
      <P>
        MockMate&apos;s Reading &amp; Writing Academy includes Words in Context lessons with
        worked examples across both question types. The SAT question bank allows filtering
        by this specific skill so you can drill it in isolation.
      </P>

      <div className="mt-8 rounded-xl border border-brand-200 bg-brand-50/50 p-5">
        <p className="text-sm font-semibold text-brand-800">Practice Words in Context on MockMate</p>
        <p className="mt-1 text-[14px] text-brand-700 leading-relaxed">
          The R&amp;W Academy&apos;s Words in Context lesson covers both question types with
          targeted examples and a diagnostic to identify your specific error patterns.
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
          <Link href="/resources/sat-command-of-evidence-practice" className="text-brand-600 hover:underline">→ Command of Evidence: strategy and examples</Link>
          <Link href="/resources/sat-transitions-practice" className="text-brand-600 hover:underline">→ Transitions: picking the right logical connector</Link>
          <Link href="/sat-question-bank" className="text-brand-600 hover:underline">→ SAT Question Bank — filter by skill</Link>
        </div>
      </section>

      <IndependenceCallout />
    </SeoPageLayout>
  )
}
