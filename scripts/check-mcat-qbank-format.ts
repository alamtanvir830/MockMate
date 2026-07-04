/**
 * Validates MCAT question bank files for formatting issues:
 * - Raw pipe characters (markdown table syntax) in question/passage text
 * - "Table" references in question text without a tableData field
 * - Malformed tableData (missing headers or rows)
 */

import { chemPhysQuestions } from '../lib/question-bank/mcat/chem-phys'
import { bioBiochemQuestions } from '../lib/question-bank/mcat/bio-biochem'
import { psychSocQuestions } from '../lib/question-bank/mcat/psych-soc'
import { carsQuestions } from '../lib/question-bank/mcat/cars'
import type { MCATQBQuestion } from '../lib/question-bank/mcat/types'

const allQuestions: MCATQBQuestion[] = [
  ...chemPhysQuestions,
  ...bioBiochemQuestions,
  ...psychSocQuestions,
  ...carsQuestions,
]

let issues = 0

for (const q of allQuestions) {
  const fields = [
    { name: 'question', value: q.question },
    { name: 'passageText', value: q.passageText ?? '' },
  ]

  for (const { name, value } of fields) {
    // Raw pipe chars suggest markdown table syntax
    if (/\|/.test(value)) {
      console.error(`[${q.id}] ${name} contains pipe character(s) — possible raw markdown table`)
      issues++
    }

    // References to "Table" without tableData
    if (/\bTable\s+\d/i.test(value) && !q.tableData) {
      console.error(`[${q.id}] ${name} references a Table but tableData is missing`)
      issues++
    }
  }

  // Malformed tableData
  if (q.tableData) {
    if (!Array.isArray(q.tableData.headers) || q.tableData.headers.length === 0) {
      console.error(`[${q.id}] tableData.headers is missing or empty`)
      issues++
    }
    if (!Array.isArray(q.tableData.rows) || q.tableData.rows.length === 0) {
      console.error(`[${q.id}] tableData.rows is missing or empty`)
      issues++
    } else {
      const colCount = q.tableData.headers?.length ?? 0
      for (let i = 0; i < q.tableData.rows.length; i++) {
        if (q.tableData.rows[i].length !== colCount) {
          console.error(`[${q.id}] tableData.rows[${i}] has ${q.tableData.rows[i].length} cells but headers has ${colCount}`)
          issues++
        }
      }
    }
  }
}

if (issues === 0) {
  console.log(`✓ All ${allQuestions.length} MCAT questions passed format validation`)
} else {
  console.error(`\n${issues} issue(s) found across ${allQuestions.length} questions`)
  process.exit(1)
}
