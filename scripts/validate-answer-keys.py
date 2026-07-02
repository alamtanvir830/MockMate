#!/usr/bin/env python3
"""
Validates answer-key integrity after choice shuffling.

Checks per question:
  1. correctAnswer is A/B/C/D
  2. A choice with label=correctAnswer exists
  3. correctAnswer is NOT a key in wrongAnswerExplanations
  4. explanation "Choice X is (correct|the best answer)" → X must equal correctAnswer
  5. wrongAnswerExplanations keys are only wrong letters (not correctAnswer)
  6. no WAE entry text says "Choice X is correct" in a misleading way
  7. no WAE entry says "Choice X is incorrect" where X is NOT the key (stale cross-ref)

Usage:
  python3 scripts/validate-answer-keys.py
"""

import re
from pathlib import Path

ROOT = Path(__file__).parent.parent / "lib" / "premade-exams"

SAT_FILES = {
    "SAT F1 RW M1":       ROOT/"sat/rw-module-1.ts",
    "SAT F1 RW M2 Easy":  ROOT/"sat/rw-module-2-easy.ts",
    "SAT F1 RW M2 Hard":  ROOT/"sat/rw-module-2-hard.ts",
    "SAT F1 Math M1":     ROOT/"sat/math-module-1.ts",
    "SAT F1 Math M2 Easy":ROOT/"sat/math-module-2-easy.ts",
    "SAT F1 Math M2 Hard":ROOT/"sat/math-module-2-hard.ts",
    "SAT F2 RW M1":       ROOT/"sat/form-2-rw-module-1.ts",
    "SAT F2 RW M2 Easy":  ROOT/"sat/form-2-rw-module-2-easy.ts",
    "SAT F2 RW M2 Hard":  ROOT/"sat/form-2-rw-module-2-hard.ts",
    "SAT F2 Math M1":     ROOT/"sat/form-2-math-module-1.ts",
    "SAT F2 Math M2 Easy":ROOT/"sat/form-2-math-module-2-easy.ts",
    "SAT F2 Math M2 Hard":ROOT/"sat/form-2-math-module-2-hard.ts",
    "SAT F3 RW M1":       ROOT/"sat/form-3-rw-module-1.ts",
    "SAT F3 RW M2 Easy":  ROOT/"sat/form-3-rw-module-2-easy.ts",
    "SAT F3 RW M2 Hard":  ROOT/"sat/form-3-rw-module-2-hard.ts",
    "SAT F3 Math M1":     ROOT/"sat/form-3-math-module-1.ts",
    "SAT F3 Math M2 Easy":ROOT/"sat/form-3-math-module-2-easy.ts",
    "SAT F3 Math M2 Hard":ROOT/"sat/form-3-math-module-2-hard.ts",
}

MCAT_FILES = {
    "MCAT Chem/Phys":     ROOT/"mcat/form-1-chem-phys.ts",
    "MCAT CARS":          ROOT/"mcat/form-1-cars.ts",
    "MCAT Bio/Biochem":   ROOT/"mcat/form-1-bio-biochem.ts",
    "MCAT Psych/Soc":     ROOT/"mcat/form-1-psych-soc.ts",
}

# ── parser ─────────────────────────────────────────────────────────────────────

def find_question_block(text, qid):
    m = re.search(r"id:\s*['\"]" + re.escape(qid) + r"['\"]", text)
    if not m: return None, None
    pos = m.start(); bs = None
    while pos > 0:
        pos -= 1
        if text[pos] == '{': bs = pos; break
        elif text[pos] not in ' \n\t\r': break
    if bs is None: return None, None
    nxt = re.compile(r"\bid:\s*['\"][^'\"]+['\"]").search(text, m.end()+1)
    if nxt:
        p2 = nxt.start(); be = None
        while p2 > bs:
            p2 -= 1
            if text[p2] == '{': be = p2; break
            elif text[p2] not in ' \n\t\r': be = nxt.start(); break
        if be is None: be = nxt.start()
    else:
        be = len(text)
    return bs, be


def extract_question_data(block):
    """Extract (correctAnswer, choices, explanation, wae_keys, wae_text) from block."""
    # correctAnswer
    ca_m = re.search(r"correctAnswer:\s*['\"]([ABCD])['\"]", block)
    correct_answer = ca_m.group(1) if ca_m else None

    # choice labels that exist
    choice_labels = re.findall(r"label:\s*['\"]([ABCD])['\"]", block)

    # explanation text (backtick or single/double quote, first occurrence after 'explanation:')
    expl_m = re.search(r"explanation:\s*(`[^`]*`|'[^']*'|\"[^\"]*\")", block, re.DOTALL)
    explanation = expl_m.group(1) if expl_m else ''

    # wrongAnswerExplanations block
    wae_m = re.search(r"wrongAnswerExplanations\s*:\s*\{(.*?)\}", block, re.DOTALL)
    wae_content = wae_m.group(1) if wae_m else ''

    # WAE keys
    wae_keys = re.findall(r"\n\s+([ABCD])\s*:", wae_content)

    return correct_answer, choice_labels, explanation, wae_keys, wae_content


def get_all_mc_ids(path):
    """Get all MC question IDs from file (those with correctAnswer: 'A'|'B'|'C'|'D')."""
    text = path.read_text()
    id_pat = re.compile(r"id:\s*['\"]([^'\"]+)['\"]")
    ca_pat = re.compile(r"correctAnswer:\s*['\"]([ABCD])['\"]")

    all_ids = list(id_pat.finditer(text))
    ca_positions = [(m.start(), m.group(1)) for m in ca_pat.finditer(text)]

    result = []
    for i, id_m in enumerate(all_ids):
        start = id_m.start()
        end = all_ids[i+1].start() if i+1 < len(all_ids) else len(text)
        for ca_pos, ca in ca_positions:
            if start < ca_pos < end:
                result.append((id_m.group(1), text))
                break
    return result

# ── validation ─────────────────────────────────────────────────────────────────

issues = []

def check_file(label, path):
    if not path.exists():
        print(f"  {label}: FILE MISSING")
        return
    text = path.read_text()

    # Get all MC question IDs
    id_pat = re.compile(r"id:\s*['\"]([^'\"]+)['\"]")
    ca_pat = re.compile(r"correctAnswer:\s*['\"]([ABCD])['\"]")

    all_ids = list(id_pat.finditer(text))
    ca_set = {m.start() for m in ca_pat.finditer(text)}

    file_issues = []

    for i, id_m in enumerate(all_ids):
        qid = id_m.group(1)
        start = id_m.start()
        end = all_ids[i+1].start() if i+1 < len(all_ids) else len(text)

        # Only process questions with MC correctAnswer
        has_mc_ca = any(start < p < end for p in ca_set)
        if not has_mc_ca:
            continue

        bs, be = find_question_block(text, qid)
        if bs is None:
            continue
        block = text[bs:be]

        ca, choices, explanation, wae_keys, wae_content = extract_question_data(block)
        if not ca:
            continue

        q_issues = []

        # Check 1: correctAnswer exists as a choice label
        if ca not in choices:
            q_issues.append(f"correctAnswer='{ca}' not in choices {choices}")

        # Check 2: correctAnswer is not a WAE key
        if ca in wae_keys:
            q_issues.append(f"correctAnswer='{ca}' appears as WAE key (should only be wrong letters)")

        # Check 3: explanation letter mismatch
        # Find "Choice X is (correct|the best answer)" in explanation
        expl_letters = re.findall(
            r"Choice\s+([ABCD])\s+is\s+(?:correct|the best answer)",
            explanation, re.IGNORECASE)
        for letter in expl_letters:
            if letter != ca:
                q_issues.append(
                    f"explanation says 'Choice {letter} is correct' but correctAnswer='{ca}'")

        # Check 4: no WAE entry says "Choice X is correct/best" for any X
        expl_in_wae = re.findall(
            r"Choice\s+([ABCD])\s+is\s+(?:correct|the best answer)",
            wae_content, re.IGNORECASE)
        for letter in expl_in_wae:
            q_issues.append(
                f"WAE content says 'Choice {letter} is correct' (should only appear in main explanation)")

        # Check 5: WAE key X but text says "Choice Y is incorrect" where Y ≠ X
        # This finds stale cross-references
        for wae_key in wae_keys:
            # Find the value for this key
            key_m = re.search(r'\n\s+' + re.escape(wae_key) + r'\s*:\s*', wae_content)
            if not key_m:
                continue
            # Extract value (everything after key until next key or end)
            value_start = key_m.end()
            next_key = re.compile(r'\n\s+[ABCD]\s*:').search(wae_content, value_start)
            value_end = next_key.start() if next_key else len(wae_content)
            value = wae_content[value_start:value_end]

            # Check for "Choice Y is incorrect" where Y is not this key
            incorrect_refs = re.findall(r"Choice\s+([ABCD])\s+is\s+incorrect", value, re.IGNORECASE)
            for ref_letter in incorrect_refs:
                if ref_letter != wae_key:
                    q_issues.append(
                        f"WAE[{wae_key}] says 'Choice {ref_letter} is incorrect' (stale ref, should say {wae_key})")

        if q_issues:
            for issue in q_issues:
                file_issues.append((qid, issue))

    if file_issues:
        print(f"\n  ❌ {label}: {len(file_issues)} issue(s)")
        for qid, issue in file_issues:
            print(f"      [{qid}] {issue}")
        issues.extend([(label, qid, issue) for qid, issue in file_issues])
    else:
        print(f"  ✓  {label}")


print("=" * 70)
print("  ANSWER KEY INTEGRITY VALIDATOR")
print("=" * 70)

print("\n── SAT Forms ─────────────────────────────────────────────────────────────")
for label, path in SAT_FILES.items():
    check_file(label, path)

print("\n── MCAT Form 1 ───────────────────────────────────────────────────────────")
for label, path in MCAT_FILES.items():
    check_file(label, path)

print("\n" + "=" * 70)
if issues:
    print(f"  TOTAL ISSUES: {len(issues)} across {len(set(l for l,_,_ in issues))} file(s)")
    print("  Run fix passes on the flagged questions above.")
else:
    print("  ALL CLEAR — no answer-key alignment issues found.")
print("=" * 70)
