/**
 * Static assertion tests for email log privacy in send-results.ts and send-exam-open.ts.
 *
 * These tests read the source files as strings and verify that no email addresses
 * are passed to any console method. They do NOT require importing the modules or
 * running the email-sending code.
 *
 * NOTE: No test runner is configured in this project (no jest/vitest in package.json).
 * To run these tests, install a test runner:
 *   npm install --save-dev vitest
 * Then add to package.json scripts: "test": "vitest"
 * And run: npm test
 */

import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { resolve } from 'path'

const ROOT = resolve(__dirname, '../..')

function readSource(relativePath: string): string {
  return readFileSync(resolve(ROOT, relativePath), 'utf8')
}

/**
 * Returns all console.* call sites in the source that appear to pass email
 * addresses (i.e., lines where a console method and `.email` appear together).
 */
function findEmailConsoleLines(source: string): string[] {
  return source
    .split('\n')
    .filter((line) => {
      const hasConsole = /console\.(log|warn|error|info|debug)/.test(line)
      const hasEmailProp = /\.email/.test(line)
      return hasConsole && hasEmailProp
    })
}

describe('send-results.ts email log privacy', () => {
  const source = readSource('lib/email/send-results.ts')

  it('does not log .email property values via console methods', () => {
    const violations = findEmailConsoleLines(source)
    expect(violations).toEqual([])
  })

  it('contains redacted log format with recipient index', () => {
    // Verify the safe replacement pattern exists
    expect(source).toContain('recipient ${i}:')
  })
})

describe('send-exam-open.ts email log privacy', () => {
  const source = readSource('lib/email/send-exam-open.ts')

  it('does not log .email property values via console methods', () => {
    const violations = findEmailConsoleLines(source)
    expect(violations).toEqual([])
  })

  it('contains redacted log format with recipient index', () => {
    // Verify the safe replacement pattern exists
    expect(source).toContain('recipient ${i}:')
  })
})
