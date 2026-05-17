import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export interface MindMapLeaf {
  label: string
  children?: string[]
}

export interface MindMapBranch {
  label: string
  children: MindMapLeaf[]
}

export interface MindMapData {
  title: string
  nodes: MindMapBranch[]
}

interface IncorrectEntry {
  question_text: string
  correct_answer: string
  explanation_correct?: string | null
}

export async function generateMindMap(
  questions: IncorrectEntry[],
  subject: string,
  examTitle: string,
  language?: string,
): Promise<MindMapData> {
  const questionsText = questions
    .map(
      (q, i) =>
        `Q${i + 1}: ${q.question_text}\nCorrect answer: ${q.correct_answer}${
          q.explanation_correct ? `\nWhy: ${q.explanation_correct}` : ''
        }`,
    )
    .join('\n\n---\n\n')

  const langInstruction =
    language && language !== 'English'
      ? `All labels must be written in ${language}. Keep technical terms in their original form only if translation would make them inaccurate.\n\n`
      : ''

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    response_format: { type: 'json_object' },
    temperature: 0.5,
    messages: [
      {
        role: 'system',
        content:
          'You are a visual learning expert who creates concise, well-structured mind maps for exam review. Always return valid JSON.',
      },
      {
        role: 'user',
        content: `${langInstruction}A student got the following questions wrong on a "${examTitle}" (${subject}) practice exam. Create a concise mind map to help them review the missed concepts.

STRICT RULES — this map will be rendered left-to-right with fixed column widths, so labels MUST be short:
- "title": 2–4 words. The central topic of what was missed. Used as the root node label.
- "nodes": 5–8 main branches. Each represents one concept category from the missed material.
- Each branch has:
  - "label": 2–4 words max (fits ~18 characters)
  - "children": 2–4 subtopics
- Each child has:
  - "label": 2–4 words max (fits ~20 characters)
  - "children": 1–3 short fact strings, each 3–6 words max (fits ~30 characters)
- Never use sentences. Never use punctuation inside labels. Use noun phrases only.
- Focus only on what was missed. Do not pad with known concepts.

Return ONLY this exact JSON structure — no extra keys, no markdown:
{
  "title": "...",
  "nodes": [
    {
      "label": "Branch Name",
      "children": [
        {
          "label": "Subtopic",
          "children": ["short fact", "short fact"]
        }
      ]
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

  let parsed: MindMapData
  try {
    parsed = JSON.parse(content)
  } catch {
    throw new Error('OpenAI returned invalid JSON')
  }

  if (!parsed.title || !Array.isArray(parsed.nodes) || parsed.nodes.length === 0) {
    throw new Error('Invalid mind map structure from AI')
  }

  // Normalize: cap branches at 7, children at 5, leaves at 3
  parsed.nodes = parsed.nodes.slice(0, 7).map(node => ({
    ...node,
    children: (node.children ?? []).slice(0, 5).map(child => ({
      ...child,
      children: (child.children ?? []).slice(0, 3),
    })),
  }))

  return parsed
}
