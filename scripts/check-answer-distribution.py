#!/usr/bin/env python3
"""
Answer distribution checker for SAT / MCAT practice exam files.
Counts A/B/C/D correct-answer occurrences (MC only) per file/module.
Detects streaks and skew.

Usage:
  python3 scripts/check-answer-distribution.py
"""

import re
import os
from pathlib import Path

ROOT = Path(__file__).parent.parent / "lib" / "premade-exams"

SAT_MODULES = {
    "SAT Form 1 RW M1":         ROOT / "sat/rw-module-1.ts",
    "SAT Form 1 RW M2 Easy":    ROOT / "sat/rw-module-2-easy.ts",
    "SAT Form 1 RW M2 Hard":    ROOT / "sat/rw-module-2-hard.ts",
    "SAT Form 1 Math M1":       ROOT / "sat/math-module-1.ts",
    "SAT Form 1 Math M2 Easy":  ROOT / "sat/math-module-2-easy.ts",
    "SAT Form 1 Math M2 Hard":  ROOT / "sat/math-module-2-hard.ts",

    "SAT Form 2 RW M1":         ROOT / "sat/form-2-rw-module-1.ts",
    "SAT Form 2 RW M2 Easy":    ROOT / "sat/form-2-rw-module-2-easy.ts",
    "SAT Form 2 RW M2 Hard":    ROOT / "sat/form-2-rw-module-2-hard.ts",
    "SAT Form 2 Math M1":       ROOT / "sat/form-2-math-module-1.ts",
    "SAT Form 2 Math M2 Easy":  ROOT / "sat/form-2-math-module-2-easy.ts",
    "SAT Form 2 Math M2 Hard":  ROOT / "sat/form-2-math-module-2-hard.ts",

    "SAT Form 3 RW M1":         ROOT / "sat/form-3-rw-module-1.ts",
    "SAT Form 3 RW M2 Easy":    ROOT / "sat/form-3-rw-module-2-easy.ts",
    "SAT Form 3 RW M2 Hard":    ROOT / "sat/form-3-rw-module-2-hard.ts",
    "SAT Form 3 Math M1":       ROOT / "sat/form-3-math-module-1.ts",
    "SAT Form 3 Math M2 Easy":  ROOT / "sat/form-3-math-module-2-easy.ts",
    "SAT Form 3 Math M2 Hard":  ROOT / "sat/form-3-math-module-2-hard.ts",
}

MCAT_SECTIONS = {
    "MCAT Form 1 Chem/Phys":   ROOT / "mcat/form-1-chem-phys.ts",
    "MCAT Form 1 CARS":        ROOT / "mcat/form-1-cars.ts",
    "MCAT Form 1 Bio/Biochem": ROOT / "mcat/form-1-bio-biochem.ts",
    "MCAT Form 1 Psych/Soc":   ROOT / "mcat/form-1-psych-soc.ts",
}

# Match:  correctAnswer: 'B'   or  correctAnswer: "B"
MC_PATTERN = re.compile(r"correctAnswer:\s*['\"]([ABCD])['\"]")

def analyze_file(path: Path):
    """Return ordered list of MC correct answers from a file."""
    text = path.read_text()
    return MC_PATTERN.findall(text)

def longest_streak(answers):
    if not answers:
        return 0, ''
    best, best_ch, cur, cur_ch = 1, answers[0], 1, answers[0]
    for ch in answers[1:]:
        if ch == cur_ch:
            cur += 1
            if cur > best:
                best, best_ch = cur, cur_ch
        else:
            cur, cur_ch = 1, ch
    return best, best_ch

def report(label, answers, flag_threshold=0.40):
    total = len(answers)
    if total == 0:
        print(f"  {label}: FILE NOT FOUND or no MC answers")
        return {}, False
    counts = {c: answers.count(c) for c in 'ABCD'}
    streak_len, streak_ch = longest_streak(answers)
    skewed = any(v / total > flag_threshold for v in counts.values())
    streak_flag = streak_len >= 4

    flag = " ⚠️  SKEWED" if skewed else ""
    sflag = f" ⚠️  STREAK {streak_len}×{streak_ch}" if streak_flag else ""

    print(f"\n{'─'*60}")
    print(f"  {label}  (n={total}){flag}{sflag}")
    print(f"{'─'*60}")
    for ch in 'ABCD':
        bar = '█' * int(counts[ch] / total * 40)
        pct = counts[ch] / total * 100
        print(f"  {ch}: {counts[ch]:3d}  {pct:5.1f}%  {bar}")
    print(f"  Longest streak: {streak_len}×{streak_ch}")
    print(f"  Order: {' '.join(answers)}")
    return counts, skewed or streak_flag

print("=" * 70)
print("  ANSWER DISTRIBUTION CHECKER")
print("=" * 70)

print("\n\n══ SAT FORMS ══")
sat_issues = []
for label, path in SAT_MODULES.items():
    if not path.exists():
        print(f"\n  {label}: *** FILE MISSING ***")
        continue
    answers = analyze_file(path)
    counts, flagged = report(label, answers)
    if flagged:
        sat_issues.append((label, path, answers))

print("\n\n══ MCAT FORM 1 ══")
mcat_issues = []
for label, path in MCAT_SECTIONS.items():
    if not path.exists():
        print(f"\n  {label}: *** FILE MISSING ***")
        continue
    answers = analyze_file(path)
    counts, flagged = report(label, answers)
    if flagged:
        mcat_issues.append((label, path, answers))

print("\n\n══ SUMMARY ══")
if sat_issues:
    print(f"  SAT issues detected in {len(sat_issues)} module(s):")
    for label, path, _ in sat_issues:
        print(f"    • {label}")
else:
    print("  SAT: all modules look balanced ✓")

if mcat_issues:
    print(f"  MCAT issues detected in {len(mcat_issues)} section(s):")
    for label, path, _ in mcat_issues:
        print(f"    • {label}")
else:
    print("  MCAT: all sections look balanced ✓")
