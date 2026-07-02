#!/usr/bin/env python3
"""Prints ordered (id, correctAnswer) for every MC question in each module."""
import re
from pathlib import Path

ROOT = Path(__file__).parent.parent / "lib" / "premade-exams"

FILES = {
    "SAT_F1_RW_M1":        ROOT / "sat/rw-module-1.ts",
    "SAT_F1_RW_M2E":       ROOT / "sat/rw-module-2-easy.ts",
    "SAT_F1_RW_M2H":       ROOT / "sat/rw-module-2-hard.ts",
    "SAT_F1_MATH_M1":      ROOT / "sat/math-module-1.ts",
    "SAT_F1_MATH_M2E":     ROOT / "sat/math-module-2-easy.ts",
    "SAT_F1_MATH_M2H":     ROOT / "sat/math-module-2-hard.ts",
    "SAT_F2_RW_M1":        ROOT / "sat/form-2-rw-module-1.ts",
    "SAT_F2_RW_M2E":       ROOT / "sat/form-2-rw-module-2-easy.ts",
    "SAT_F2_RW_M2H":       ROOT / "sat/form-2-rw-module-2-hard.ts",
    "SAT_F2_MATH_M1":      ROOT / "sat/form-2-math-module-1.ts",
    "SAT_F2_MATH_M2E":     ROOT / "sat/form-2-math-module-2-easy.ts",
    "SAT_F2_MATH_M2H":     ROOT / "sat/form-2-math-module-2-hard.ts",
    "SAT_F3_RW_M1":        ROOT / "sat/form-3-rw-module-1.ts",
    "SAT_F3_RW_M2E":       ROOT / "sat/form-3-rw-module-2-easy.ts",
    "SAT_F3_RW_M2H":       ROOT / "sat/form-3-rw-module-2-hard.ts",
    "SAT_F3_MATH_M1":      ROOT / "sat/form-3-math-module-1.ts",
    "SAT_F3_MATH_M2E":     ROOT / "sat/form-3-math-module-2-easy.ts",
    "SAT_F3_MATH_M2H":     ROOT / "sat/form-3-math-module-2-hard.ts",
    "MCAT_CHEM":           ROOT / "mcat/form-1-chem-phys.ts",
    "MCAT_CARS":           ROOT / "mcat/form-1-cars.ts",
    "MCAT_BIO":            ROOT / "mcat/form-1-bio-biochem.ts",
    "MCAT_PSYCH":          ROOT / "mcat/form-1-psych-soc.ts",
}

def get_mc_questions(path):
    text = path.read_text()
    results = []
    id_matches = list(re.finditer(r"^\s{2,4}id:\s*['\"]([^'\"]+)['\"]", text, re.MULTILINE))
    ca_matches = list(re.finditer(r"correctAnswer:\s*['\"]([ABCD])['\"]", text))
    for i, id_m in enumerate(id_matches):
        start = id_m.start()
        end = id_matches[i+1].start() if i+1 < len(id_matches) else len(text)
        for ca_m in ca_matches:
            if start < ca_m.start() < end:
                results.append((id_m.group(1), ca_m.group(1)))
                break
    return results

for label, path in FILES.items():
    if not path.exists():
        print(f"{label}: MISSING")
        continue
    qs = get_mc_questions(path)
    print(f"{label}:")
    for qid, ca in qs:
        print(f"  {qid} -> {ca}")
    counts = {c: sum(1 for _, a in qs if a == c) for c in 'ABCD'}
    print(f"  DIST: A={counts['A']} B={counts['B']} C={counts['C']} D={counts['D']}  n={len(qs)}")
    print()
