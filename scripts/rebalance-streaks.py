#!/usr/bin/env python3
"""Fix remaining streak issues found after main rebalancing."""
import re, sys
sys.path.insert(0, str(__import__('pathlib').Path(__file__).parent))
from rebalance_answers import apply_swap
from pathlib import Path

ROOT = Path(__file__).parent.parent / "lib" / "premade-exams"

FIXES = [
    (ROOT/"sat/form-2-rw-module-1.ts",  'sat2-rw-m1-003',   'A', 'D'),
    (ROOT/"mcat/form-1-chem-phys.ts",   'mcat1-cp-029',     'C', 'D'),
    (ROOT/"mcat/form-1-psych-soc.ts",   'mcat1-ps-028',     'C', 'D'),
]

for path, qid, old_c, new_c in FIXES:
    text = path.read_text()
    text = apply_swap(text, qid, old_c, new_c)
    path.write_text(text)
    print(f'Done: {path.name} / {qid} {old_c}→{new_c}')
