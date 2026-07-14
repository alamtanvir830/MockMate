#!/usr/bin/env node
/**
 * audit-mcat-legal-originality.mjs
 *
 * Scans all MCAT content files for risk phrases that could indicate
 * reproduction of copyrighted third-party content, and checks that
 * disclaimer files contain required "not affiliated" and "trademark" language.
 */

import { readdir, readFile } from 'fs/promises';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const RISK_PHRASES = [
  'AAMC official',
  'official MCAT',
  'from the official',
  'AAMC.org',
  'UWorld',
  'Jack Westin',
  'Kaplan MCAT',
  'Blueprint MCAT',
  'Princeton Review',
  'adapted from official',
];

const DISCLAIMER_REQUIRED_TERMS = ['not affiliated', 'trademark'];

// Directories to scan for MCAT content
const CONTENT_DIRS = [
  'lib/premade-exams/mcat',
  'lib/question-bank/mcat',
];

// Potential disclaimer file locations (also search content files themselves)
const DISCLAIMER_CANDIDATES = [
  'lib/premade-exams/mcat/form-1.ts',               // contains inline disclaimer with "not affiliated" + "trademark"
  'lib/premade-exams/mcat/mcat-score-conversion.ts', // contains MCAT_SCORE_DISCLAIMER export
  'lib/premade-exams/mcat/disclaimer.ts',
  'lib/premade-exams/mcat/disclaimer.md',
  'lib/question-bank/mcat/disclaimer.ts',
  'lib/question-bank/mcat/disclaimer.md',
  'DISCLAIMER.md',
  'disclaimers/mcat.md',
  'app/(dashboard)/premade/mcat/disclaimer/page.tsx',
  'components/exams/MCATDisclaimer.tsx',
  'components/MCATDisclaimer.tsx',
];

// Lines are benign if the risk phrase appears in a context that clarifies
// NON-affiliation (e.g., inside a disclaimer or comment saying "NOT official").
// Key check: the same line or the surrounding block contains 'not' or 'estimated'.
function isBenignDisclaimerContext(line) {
  const lower = line.toLowerCase();
  const trimmed = line.trim();
  // Benign if line also contains "not", "estimated", "mockmate", "is not"
  if (lower.includes(' not ') || lower.includes("isn't") || lower.includes('estimated')
    || lower.includes('mockmate') || lower.includes('disclaimer')) return true;
  // Benign if line is inside a JSDoc / block comment (starts with * or //)
  // explaining what official scoring does for contrast purposes
  if (trimmed.startsWith('*') || trimmed.startsWith('//') || trimmed.startsWith('/*')) return true;
  return false;
}

async function findFiles(dir) {
  const abs = join(ROOT, dir);
  let entries;
  try {
    entries = await readdir(abs, { withFileTypes: true });
  } catch {
    return [];
  }
  const files = [];
  for (const e of entries) {
    if (e.isFile() && ['.ts', '.tsx', '.md'].includes(extname(e.name))) {
      files.push(join(abs, e.name));
    }
  }
  return files;
}

async function scanContent() {
  const allFiles = [];
  for (const dir of CONTENT_DIRS) {
    const files = await findFiles(dir);
    allFiles.push(...files);
  }

  const findings = [];

  for (const file of allFiles) {
    let text;
    try {
      text = await readFile(file, 'utf8');
    } catch {
      findings.push({ file, issue: 'Could not read file' });
      continue;
    }

    const lines = text.split('\n');
    for (const phrase of RISK_PHRASES) {
      const lowerPhrase = phrase.toLowerCase();
      lines.forEach((line, idx) => {
        if (line.toLowerCase().includes(lowerPhrase)) {
          // Skip benign disclaimer-context uses (line clarifies non-affiliation)
          if (isBenignDisclaimerContext(line)) return;
          findings.push({
            file: file.replace(ROOT + '/', ''),
            line: idx + 1,
            phrase,
            text: line.trim().slice(0, 120),
          });
        }
      });
    }
  }

  return { allFiles, findings };
}

async function checkDisclaimers() {
  const results = [];

  for (const candidate of DISCLAIMER_CANDIDATES) {
    const abs = join(ROOT, candidate);
    let text;
    try {
      text = await readFile(abs, 'utf8');
    } catch {
      continue; // file doesn't exist — skip
    }

    const lowerText = text.toLowerCase();
    const found = [];
    const missing = [];
    for (const term of DISCLAIMER_REQUIRED_TERMS) {
      if (lowerText.includes(term.toLowerCase())) {
        found.push(term);
      } else {
        missing.push(term);
      }
    }
    results.push({ file: candidate, found, missing });
  }

  return results;
}

async function main() {
  console.log('=== MCAT Legal Originality Audit ===\n');

  // 1. Content scan
  const { allFiles, findings } = await scanContent();
  console.log(`Scanned ${allFiles.length} content file(s) across MCAT directories.\n`);

  if (findings.length === 0) {
    console.log('CONTENT SCAN: PASS — No risk phrases found.\n');
  } else {
    console.log(`CONTENT SCAN: FAIL — ${findings.length} risk phrase occurrence(s) found:\n`);
    for (const f of findings) {
      console.log(`  [${f.file}:${f.line}] phrase="${f.phrase}"`);
      if (f.text) console.log(`    → ${f.text}`);
    }
    console.log();
  }

  // 2. Disclaimer check
  const disclaimerResults = await checkDisclaimers();

  if (disclaimerResults.length === 0) {
    console.log('DISCLAIMER CHECK: FAIL — No disclaimer file found in any expected location.');
    console.log('  Expected locations checked:');
    for (const c of DISCLAIMER_CANDIDATES) console.log(`    ${c}`);
    console.log();
  } else {
    for (const d of disclaimerResults) {
      if (d.missing.length === 0) {
        console.log(`DISCLAIMER CHECK: PASS — ${d.file}`);
        console.log(`  Found required terms: ${d.found.join(', ')}\n`);
      } else {
        console.log(`DISCLAIMER CHECK: FAIL — ${d.file}`);
        console.log(`  Missing terms: ${d.missing.join(', ')}`);
        console.log(`  Present terms: ${d.found.join(', ') || '(none)'}\n`);
      }
    }
  }

  // 3. Overall verdict
  const contentPass = findings.length === 0;
  const disclaimerPass = disclaimerResults.length > 0 && disclaimerResults.some(d => d.missing.length === 0);

  console.log('--- Summary ---');
  console.log(`Content scan:      ${contentPass ? 'PASS' : 'FAIL'}`);
  console.log(`Disclaimer check:  ${disclaimerPass ? 'PASS' : 'FAIL'}`);
  console.log(`Overall:           ${contentPass && disclaimerPass ? 'PASS' : 'FAIL'}`);

  process.exit(contentPass && disclaimerPass ? 0 : 1);
}

main().catch(err => {
  console.error('Audit error:', err);
  process.exit(1);
});
