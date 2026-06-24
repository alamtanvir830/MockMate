import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const OPTION_LETTERS = ['A', 'B', 'C', 'D'] as const

export interface StudyGuideSection {
  heading: string
  contentMarkdown: string
}

export interface StudyGuide {
  title: string
  subtitle: string
  sections: StudyGuideSection[]
}

export interface MissedQuestion {
  question_text: string
  options: string[]
  correct_answer: string
  selected_answer: string | null
  explanation_correct: string | null
  explanation_incorrect: Record<string, string> | null
}

// ─── Subject detection ────────────────────────────────────────────────────────

type SubjectCategory =
  | 'medical'
  | 'history'
  | 'literature'
  | 'computer_science'
  | 'economics'
  | 'business'
  | 'mathematics'
  | 'engineering'
  | 'language_learning'
  | 'law'
  | 'general'

function detectSubjectCategory(subject: string, examTitle: string): SubjectCategory {
  const combined = `${subject} ${examTitle}`.toLowerCase()

  if (
    /\b(medicine|medical|anatomy|physiology|pharmacology|pathology|usmle|mcat|clinical|nursing|biochemistry|microbiology|immunology|histology|embryology|surgery|pediatric|internal medicine|cardiology|neurology|psychiatry|oncology|radiology|obstetri|gynecolog|dermatology|endocrinology|gastroenterology|nephrology|pulmonology|rheumatology|hematology|infectious disease|diagnostic|therapeutics)\b/.test(combined)
  ) return 'medical'

  if (
    /\b(history|historical|social studies|civilization|world war|ancient|medieval|renaissance|revolution|empire|dynasty|colonialism|civil rights|political science|archaeology|historiography|cold war|great depression|manifest destiny)\b/.test(combined)
  ) return 'history'

  if (
    /\b(literature|literary|novel|poetry|poem|author|fiction|nonfiction|shakespeare|reading comprehension|rhetoric|composition|linguistics|language arts|english class|prose|narrative|character analysis|symbolism|theme)\b/.test(combined)
  ) return 'literature'

  if (
    /\b(computer science|programming|software|algorithm|data structure|coding|python|java\b|javascript|typescript|c\+\+|c#|database|operating system|networking|machine learning|artificial intelligence|web development|cybersecurity|\bcs\b|information technology|software engineering|devops|cloud computing|recursion|complexity|big.?o)\b/.test(combined)
  ) return 'computer_science'

  if (
    /\b(economics|econ|macroeconomics|microeconomics|gdp|inflation|supply.?and.?demand|fiscal policy|monetary policy|trade|market equilibrium|capitalism|keynesian|elasticity|opportunity cost)\b/.test(combined)
  ) return 'economics'

  if (
    /\b(business|marketing|management|\bmba\b|entrepreneurship|accounting|finance|strategy|operations|human resources|organizational behavior|branding|sales|supply chain|financial statement|balance sheet|income statement|swot|porter)\b/.test(combined)
  ) return 'business'

  if (
    /\b(math|mathematics|algebra|calculus|statistics|geometry|trigonometry|linear algebra|differential equation|number theory|combinatorics|probability|arithmetic|integration|derivative|matrix|vector|proof)\b/.test(combined)
  ) return 'mathematics'

  if (
    /\b(engineering|physics|chemistry|circuit|thermodynamics|mechanics|statics|dynamics|fluid|materials science|electrical engineering|mechanical engineering|civil engineering|chemical engineering|structural|electromagnetism|quantum|optics)\b/.test(combined)
  ) return 'engineering'

  if (
    /\b(spanish|french|german|chinese|japanese|arabic|portuguese|italian|korean|russian|latin|foreign language|\besl\b|english as a second language|language learning|vocabulary|grammar rules|conjugation|translation)\b/.test(combined)
  ) return 'language_learning'

  if (
    /\b(law|legal|jurisprudence|constitutional|criminal law|contracts|torts|civil procedure|property law|evidence|bar exam|\blsat\b|statutory|precedent|jurisdiction|liability|negligence)\b/.test(combined)
  ) return 'law'

  return 'general'
}

// ─── Per-category prompt blocks ───────────────────────────────────────────────

interface CategoryConfig {
  persona: string
  sectionGuidance: string
  subtitleFocus: string
  boldHint: string
}

const CATEGORY_CONFIG: Record<SubjectCategory, CategoryConfig> = {
  medical: {
    persona: 'You are a master medical educator and high-yield clinical study guide author. Your writing is precise, mechanism-focused, and board-exam ready.',
    sectionGuidance: `Each section covers one disease/condition/concept cluster. Include only the subsections relevant to the missed content, chosen from:
## Overview — brief definition and why it matters
## Pathophysiology / Key Mechanisms — cellular or molecular basis
## Clinical Presentation — classic signs, symptoms, and patient vignette clues
## Laboratory Findings — key lab values and patterns
## Imaging Findings — what to look for and why
## Diagnosis / Approach — diagnostic criteria or algorithm
## Treatment / Management — first-line, second-line, contraindications
## Risk Factors — who gets it and why
## High-Yield Differentials — how to distinguish from mimics (use a table when ≥3 options)
## Board Pearls — one-liner facts, common traps, classic question triggers`,
    subtitleFocus: 'Focus: pathophysiology, clinical clues, diagnosis, management, and high-yield differentials.',
    boldHint: 'Bold key drug names, mechanisms, diseases, lab values, and diagnostic signs.',
  },

  history: {
    persona: 'You are an expert history tutor who writes clear, narrative-driven study guides that help students connect events, causes, and consequences.',
    sectionGuidance: `Each section covers one event, era, or theme from the missed content. Include only the subsections relevant to what was missed, chosen from:
## Overview — what happened and why it matters
## Historical Context — what was happening before this event
## Key People — who drove events and what their role was
## Key Events / Timeline — chronological sequence of what occurred
## Causes — what led to this (political, economic, social, ideological)
## Effects / Consequences — short-term and long-term impacts
## Major Themes — recurring ideas (liberty, nationalism, imperialism, reform, etc.)
## Comparisons — how this event or period compares to others (use a table when helpful)
## Common Misconceptions — what students typically get wrong
## Exam Takeaways — the facts, dates, and cause-effect relationships most likely to be tested`,
    subtitleFocus: 'Focus: causes, effects, key figures, chronology, and historical significance.',
    boldHint: 'Bold key names, dates, treaties, events, and turning points.',
  },

  literature: {
    persona: 'You are an expert literature teacher who writes analytical, insight-driven study guides that help students understand texts at a deeper level.',
    sectionGuidance: `Each section covers one work, author, theme, or literary concept from the missed content. Include only the subsections relevant to what was missed, chosen from:
## Overview — work, author, genre, period, and why it is studied
## Characters — who they are, their role, and how they develop
## Themes — central ideas and how they are expressed throughout the work
## Symbolism & Imagery — specific symbols and what they represent
## Plot Development — key narrative arc and turning points
## Literary Devices — techniques used and their effect (use examples from the text)
## Important Quotes — key lines with explanation of their significance
## Author Intent / Context — historical/biographical context that shapes the work
## Common Misinterpretations — what students frequently misread or misapply
## Exam Takeaways — analytical angles most likely to appear on tests or essays`,
    subtitleFocus: 'Focus: themes, characters, literary devices, symbolism, and analytical interpretation.',
    boldHint: 'Bold character names, literary terms, key themes, and significant quote snippets.',
  },

  computer_science: {
    persona: 'You are an expert computer science educator who writes precise, practical study guides that reinforce core concepts, algorithms, and problem-solving patterns.',
    sectionGuidance: `Each section covers one concept, algorithm, data structure, or system from the missed content. Include only the subsections relevant to what was missed, chosen from:
## Overview — what it is and when to use it
## Core Concepts — fundamental ideas and invariants
## How It Works — step-by-step operation with a plain-language walkthrough
## Algorithm / Pseudocode — key logic or pseudocode if relevant
## Complexity Analysis — time and space complexity with Big-O notation
## Key Definitions — important terms and what they mean precisely
## Code Patterns — common implementation patterns or edge cases to remember
## Comparison Tables — side-by-side comparison with related concepts (e.g., BFS vs DFS, Stack vs Queue)
## Common Mistakes — bugs, misconceptions, and off-by-one errors students frequently make
## Interview / Test Takeaways — what is most likely to be tested and how to recognise the pattern`,
    subtitleFocus: 'Focus: core concepts, complexity, algorithms, code patterns, and common mistakes.',
    boldHint: 'Bold algorithm names, complexity notation, data structure names, key terms, and important function names.',
  },

  economics: {
    persona: 'You are an expert economics educator who writes clear, model-driven study guides that help students understand theory, graphs, and real-world applications.',
    sectionGuidance: `Each section covers one concept, model, or market scenario from the missed content. Include only the subsections relevant to what was missed, chosen from:
## Overview — the concept and its significance
## Key Definitions — precise economic definitions of all relevant terms
## Core Principles — the economic logic and assumptions behind the concept
## Supply / Demand Effects — what shifts curves and why, with direction
## Graph Interpretation — what the graph looks like and how to read it
## Formulas — any relevant equations with variable definitions
## Real-World Examples — concrete illustrations of the concept in action
## Comparisons — side-by-side of related concepts (e.g., perfect vs monopolistic competition)
## Common Mistakes — typical misapplications or confused terminology
## Exam Takeaways — the relationships, effects, and models most likely to be tested`,
    subtitleFocus: 'Focus: definitions, principles, supply/demand effects, graphs, and key relationships.',
    boldHint: 'Bold economic terms, model names, key variables, and curve shifts.',
  },

  business: {
    persona: 'You are an expert business educator who writes concise, framework-driven study guides that help students apply concepts to cases and exam scenarios.',
    sectionGuidance: `Each section covers one concept, framework, or business function from the missed content. Include only the subsections relevant to what was missed, chosen from:
## Overview — what the concept is and why it matters in business
## Key Concepts — the core ideas and vocabulary
## Frameworks / Models — named models (SWOT, Porter's Five Forces, BCG Matrix, etc.) with structure and use case
## How to Apply — step-by-step application to a scenario or case study
## Strengths and Weaknesses — trade-offs, limitations, or when NOT to use it
## Comparisons — table comparing related frameworks or strategies
## Common Exam Traps — what students frequently confuse or misapply
## Exam Takeaways — the facts, models, and application logic most likely to be tested`,
    subtitleFocus: 'Focus: key frameworks, application, comparisons, and exam-ready definitions.',
    boldHint: 'Bold framework names, key business terms, named models, and strategic concepts.',
  },

  mathematics: {
    persona: 'You are an expert mathematics educator who writes precise, step-by-step study guides that clarify rules, methods, and common mistakes.',
    sectionGuidance: `Each section covers one concept, method, or problem type from the missed content. Include only the subsections relevant to what was missed, chosen from:
## Overview — what the concept is and when it applies
## Key Rules — the core mathematical rules or theorems (stated precisely)
## Formulas — all relevant formulas with every variable defined
## Step-by-Step Method — how to solve problems of this type, broken into clear numbered steps
## Worked Example — a sample problem solved completely with explanation at each step
## Pattern Recognition Tips — clues in a problem that tell you which method to use
## Common Mistakes — errors students regularly make and how to avoid them
## Exam Takeaways — the rules, formulas, and problem types most likely to appear`,
    subtitleFocus: 'Focus: rules, formulas, step-by-step methods, worked examples, and common mistakes.',
    boldHint: 'Bold theorem names, formula variables, key terms, and critical steps in worked solutions.',
  },

  engineering: {
    persona: 'You are an expert engineering educator who writes rigorous, application-focused study guides grounded in principles, equations, and design thinking.',
    sectionGuidance: `Each section covers one principle, system, or problem type from the missed content. Include only the subsections relevant to what was missed, chosen from:
## Overview — the physical principle or engineering concept and its scope
## Core Principles — the underlying physics or engineering theory
## Key Equations — all relevant equations with every variable and unit defined
## Assumptions — what must be true for the equations or model to hold
## How to Solve — systematic approach to problems of this type
## Applications — real-world systems where this applies
## Design Considerations — trade-offs, constraints, and failure modes
## Common Mistakes — errors in set-up, unit conversion, or sign convention
## Formula Sheet — a compact reference of all formulas in this section
## Exam Takeaways — the concepts, equations, and problem types most likely to be tested`,
    subtitleFocus: 'Focus: principles, equations, assumptions, problem-solving approach, and applications.',
    boldHint: 'Bold variable names, unit symbols, theorem names, and critical engineering terms.',
  },

  language_learning: {
    persona: 'You are an expert language tutor who writes practical, example-rich study guides that clarify grammar rules, vocabulary, and usage.',
    sectionGuidance: `Each section covers one grammatical structure, vocabulary group, or language rule from the missed content. Include only the subsections relevant to what was missed, chosen from:
## Overview — what rule or vocabulary group this section covers and when it applies
## Vocabulary — key words with translation, part of speech, and usage note
## Grammar Rules — the rule stated clearly with all exceptions noted
## Sentence Structures — templates and patterns with fill-in-the-blank style examples
## Conjugation / Declension Table — verb forms or noun cases in a table (when applicable)
## Correct vs Incorrect Examples — side-by-side of right and wrong usage
## Common Errors — mistakes native speakers of the student's language typically make
## Usage Notes — register, formality level, regional variation, or tone considerations
## Exam Takeaways — the rules and vocabulary patterns most likely to be tested`,
    subtitleFocus: 'Focus: grammar rules, vocabulary, sentence patterns, and correct usage.',
    boldHint: 'Bold target-language words, grammatical terms, and key vocabulary.',
  },

  law: {
    persona: 'You are an expert law professor who writes precise, issue-spotting study guides grounded in doctrine, rules, and legal reasoning.',
    sectionGuidance: `Each section covers one legal doctrine, rule, or area of law from the missed content. Include only the subsections relevant to what was missed, chosen from:
## Overview — the rule or doctrine and its purpose in the legal system
## Elements — every element the plaintiff/prosecution must prove (with definitions)
## Key Definitions — precise legal definitions of important terms
## Rule Statement — the black-letter rule, stated exactly as it would appear on an exam
## Majority vs Minority Rule — where jurisdictions differ (use a table when helpful)
## Analysis Framework — the IRAC or CREAC structure for applying this rule
## Exceptions and Defenses — affirmative defenses, exceptions, or carve-outs
## Leading Cases — seminal cases, their facts, and the rule they established
## Common Mistakes — issues students miss or arguments they misframe
## Exam Takeaways — the rules, elements, and analysis patterns most likely to be tested`,
    subtitleFocus: 'Focus: elements, rule statements, analysis framework, exceptions, and exam application.',
    boldHint: 'Bold legal terms of art, case names, elements, and doctrine names.',
  },

  general: {
    persona: 'You are an expert educator who writes clear, well-organised study guides tailored precisely to the subject at hand.',
    sectionGuidance: `Each section covers one concept, topic, or skill area from the missed content. Include only the subsections relevant to what was missed, chosen from:
## Overview — what this topic is and why it matters
## Key Concepts — the core ideas and definitions
## How It Works — the underlying logic, process, or mechanism
## Key Rules or Principles — governing rules, laws, or patterns
## Examples — concrete illustrations that make the concept tangible
## Comparisons — how this relates to or differs from similar concepts (use a table when helpful)
## Common Mistakes — what students typically get wrong and why
## Exam Takeaways — the ideas and relationships most likely to be tested`,
    subtitleFocus: 'Focus: core concepts, examples, comparisons, and exam-ready understanding.',
    boldHint: 'Bold key terms, named concepts, and important definitions.',
  },
}

// ─── Main generation function ─────────────────────────────────────────────────

export async function generateStudyGuide(
  questions: MissedQuestion[],
  subject: string,
  examTitle: string,
  language?: string,
): Promise<StudyGuide> {
  if (questions.length === 0) throw new Error('No missed questions provided')

  const category = detectSubjectCategory(subject, examTitle)
  const config = CATEGORY_CONFIG[category]

  const questionsText = questions
    .map((q, i) => {
      // Short response questions have no options
      if (!q.options || q.options.length === 0) {
        let text = `Q${i + 1}: ${q.question_text}
Correct/optimal answer: ${q.correct_answer}
Student answered: ${q.selected_answer?.trim() || '(unanswered)'}`
        if (q.explanation_correct) text += `\nNote: ${q.explanation_correct}`
        return text
      }

      const optLines = q.options
        .map((opt, idx) => `  ${OPTION_LETTERS[idx]}. ${opt}`)
        .join('\n')
      const correctIdx = q.options.indexOf(q.correct_answer)
      const correctLetter = correctIdx >= 0 ? OPTION_LETTERS[correctIdx] : '?'
      const selectedIdx = q.selected_answer ? q.options.indexOf(q.selected_answer) : -1
      const selectedLetter = selectedIdx >= 0 ? OPTION_LETTERS[selectedIdx] : 'none'

      let text = `Q${i + 1}: ${q.question_text}
Options:
${optLines}
Correct: ${correctLetter}. ${q.correct_answer}
Student answered: ${selectedLetter !== 'none' ? `${selectedLetter}. ${q.selected_answer}` : '(unanswered)'}`

      if (q.explanation_correct) {
        text += `\nWhy correct: ${q.explanation_correct}`
      }
      if (
        q.explanation_incorrect &&
        selectedLetter !== 'none' &&
        q.explanation_incorrect[selectedLetter]
      ) {
        text += `\nWhy student's choice is wrong: ${q.explanation_incorrect[selectedLetter]}`
      }

      return text
    })
    .join('\n\n---\n\n')

  const langInstruction =
    language && language !== 'English'
      ? `Write the entire study guide in ${language}. Preserve technical terms in their original form only if translation would reduce accuracy.\n\n`
      : ''

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    response_format: { type: 'json_object' },
    temperature: 0.4,
    messages: [
      {
        role: 'system',
        content: `${config.persona} Use **term** syntax to bold key terms. Always return valid JSON.`,
      },
      {
        role: 'user',
        content: `${langInstruction}A student missed the questions below on a "${examTitle}" (${subject}) exam. Write a focused, in-depth study guide covering ONLY the concepts they missed.

RULES:
- Cover only missed topics. Do not explain what the student already got right.
- Group related missed questions into one section so the guide flows logically.
- ${config.sectionGuidance}
- ${config.boldHint}
- Use bullet points (- item) for lists.
- Use markdown tables (| Header | Header |\\n|---|---|\\n| val | val |) for comparisons — tables must be well-formed with a separator row.
- Use ## Subheading inside contentMarkdown for subsections within a section.
- No fluff or filler. Every sentence must be exam-relevant.
- A student should be able to re-read only this guide and answer similar questions confidently.

Return ONLY this JSON (no extra keys, no markdown wrapper):
{
  "title": "...",
  "subtitle": "Focused study guide from missed questions. ${config.subtitleFocus}",
  "sections": [
    {
      "heading": "1. Topic Name",
      "contentMarkdown": "..."
    }
  ]
}

Missed questions:

${questionsText}`,
      },
    ],
  })

  const content = response.choices[0]?.message?.content
  if (!content) throw new Error('OpenAI returned empty response')

  let parsed: StudyGuide
  try {
    parsed = JSON.parse(content)
  } catch {
    throw new Error('OpenAI returned invalid JSON')
  }

  if (!parsed.title || !Array.isArray(parsed.sections) || parsed.sections.length === 0) {
    throw new Error('Invalid study guide structure from AI')
  }

  return parsed
}
