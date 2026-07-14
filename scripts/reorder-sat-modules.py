#!/usr/bin/env python3
"""
Reorder SAT module question arrays by domain+skill+difficulty.

R&W ordering:
  1. Craft and Structure  (Words in Context → Text Structure → Cross-Text)
  2. Information and Ideas (Central Ideas → Command of Evidence → Inferences)
  3. Expression of Ideas  (Rhetorical Synthesis → Transitions)
  4. Standard English Conventions (Form/Structure/Sense → Boundaries)
  Within each domain+skill bucket: easy → medium → hard

Math ordering:
  difficulty: easy → medium → hard
  domain tiebreak: Algebra → PSDA → Advanced Math → Geometry
"""

import re
import sys
from pathlib import Path

BASE = Path(__file__).parent.parent / 'lib' / 'premade-exams' / 'sat'

# Global R&W skill ordering (realistic digital SAT sequence):
# Q1-4   Words in Context
# Q5-9   Text Structure / Cross-Text / Central Ideas
# Q10-13 Command of Evidence
# Q14-15 Inferences (then Boundaries/FSS if needed)
# Q16-21 Boundaries / Form, Structure, and Sense
# Q22-24 Transitions
# Q25-27 Transitions or Rhetorical Synthesis (RS closes the module)
RW_GLOBAL_SKILL_ORDER = {
    'Words in Context': 0,
    'Text Structure and Purpose': 1,
    'Cross-Text Connections': 1,
    'Central Ideas and Details': 1,
    'Command of Evidence': 2,
    'Inferences': 3,
    'Boundaries': 4,
    'Form, Structure, and Sense': 4,
    'Transitions': 5,
    'Rhetorical Synthesis': 6,
}
DIFFICULTY_ORDER = {'easy': 0, 'medium': 1, 'hard': 2}
MATH_DOMAIN_ORDER = {
    'Algebra': 0,
    'Problem-Solving and Data Analysis': 1,
    'Advanced Math': 2,
    'Geometry and Trigonometry': 3,
}


def split_blocks(array_content: str) -> list[str]:
    """
    Split the content inside a TypeScript array into individual top-level
    object blocks, handling nested {}, strings, and backtick template literals.
    """
    blocks: list[str] = []
    depth = 0
    current_start: int | None = None
    in_single = False
    in_double = False
    in_backtick = False
    escape_next = False

    for i, ch in enumerate(array_content):
        if escape_next:
            escape_next = False
            continue
        if ch == '\\' and (in_single or in_double or in_backtick):
            escape_next = True
            continue
        if in_single:
            if ch == "'":
                in_single = False
            continue
        if in_double:
            if ch == '"':
                in_double = False
            continue
        if in_backtick:
            if ch == '`':
                in_backtick = False
            continue
        if ch == "'":
            in_single = True
            continue
        if ch == '"':
            in_double = True
            continue
        if ch == '`':
            in_backtick = True
            continue
        if ch == '{':
            if depth == 0:
                current_start = i
            depth += 1
        elif ch == '}':
            depth -= 1
            if depth == 0 and current_start is not None:
                block = array_content[current_start:i + 1].strip()
                if block:
                    blocks.append(block)
                current_start = None

    return blocks


def get_rw_key(block: str) -> tuple:
    skill = re.search(r"skill:\s*'([^']+)'", block)
    diff = re.search(r"difficulty:\s*'([^']+)'", block)
    sk = skill.group(1) if skill else ''
    di = diff.group(1) if diff else 'medium'
    return (
        RW_GLOBAL_SKILL_ORDER.get(sk, 9),
        DIFFICULTY_ORDER.get(di, 1),
    )


def get_math_key(block: str) -> tuple:
    domain = re.search(r"domain:\s*'([^']+)'", block)
    diff = re.search(r"difficulty:\s*'([^']+)'", block)
    d = domain.group(1) if domain else ''
    di = diff.group(1) if diff else 'medium'
    return (
        DIFFICULTY_ORDER.get(di, 1),
        MATH_DOMAIN_ORDER.get(d, 9),
    )


def reorder_file(path: Path, is_math: bool) -> tuple[bool, str]:
    content = path.read_text(encoding='utf-8')

    # Find the top-level array: the '= [' pattern at file scope
    m = re.search(r'=\s*\[', content)
    if not m:
        return False, 'no top-level array assignment found'
    bracket_start = m.end() - 1  # position of '['
    # Find the matching closing ']' (simple: last ']' in file)
    bracket_end = content.rfind(']')
    if bracket_start == -1 or bracket_end <= bracket_start:
        return False, 'no array brackets found'

    prefix = content[:bracket_start + 1]
    suffix = content[bracket_end:]
    array_content = content[bracket_start + 1:bracket_end]

    blocks = split_blocks(array_content)
    if not blocks:
        return False, 'no question blocks found'

    original_ids = [re.search(r"id:\s*'([^']+)'", b).group(1)
                    if re.search(r"id:\s*'([^']+)'", b) else '?' for b in blocks]

    if is_math:
        blocks.sort(key=get_math_key)
    else:
        blocks.sort(key=get_rw_key)

    new_ids = [re.search(r"id:\s*'([^']+)'", b).group(1)
               if re.search(r"id:\s*'([^']+)'", b) else '?' for b in blocks]

    new_array = '\n  ' + ',\n\n  '.join(blocks) + ',\n'
    new_content = prefix + new_array + suffix

    path.write_text(new_content, encoding='utf-8')

    changed = original_ids != new_ids
    report = f"{len(blocks)} questions | {'REORDERED' if changed else 'already ordered'}"
    if changed:
        report += f"\n    Before: {original_ids}\n    After:  {new_ids}"
    return True, report


# ── File mapping ───────────────────────────────────────────────────────────────

RW_FILES = [
    # Form 1 (files without form number prefix)
    (BASE / 'rw-module-1.ts', False),
    (BASE / 'rw-module-2-easy.ts', False),
    (BASE / 'rw-module-2-hard.ts', False),
    # Forms 2-5
    *[(BASE / f'form-{n}-rw-module-1.ts', False) for n in range(2, 6)],
    *[(BASE / f'form-{n}-rw-module-2-easy.ts', False) for n in range(2, 6)],
    *[(BASE / f'form-{n}-rw-module-2-hard.ts', False) for n in range(2, 6)],
]

MATH_FILES = [
    # Form 1
    (BASE / 'math-module-1.ts', True),
    (BASE / 'math-module-2-easy.ts', True),
    (BASE / 'math-module-2-hard.ts', True),
    # Forms 2-5
    *[(BASE / f'form-{n}-math-module-1.ts', True) for n in range(2, 6)],
    *[(BASE / f'form-{n}-math-module-2-easy.ts', True) for n in range(2, 6)],
    *[(BASE / f'form-{n}-math-module-2-hard.ts', True) for n in range(2, 6)],
]

ALL_FILES = RW_FILES + MATH_FILES


def main():
    print('=== SAT Module Reorder Script ===\n')
    errors = 0
    for path, is_math in ALL_FILES:
        label = path.name
        print(f'[{"MATH" if is_math else " R&W"}] {label}')
        if not path.exists():
            print(f'  SKIP — file not found')
            continue
        ok, report = reorder_file(path, is_math)
        if ok:
            for line in report.split('\n'):
                print(f'  {line}')
        else:
            print(f'  ERROR: {report}')
            errors += 1
        print()

    print(f'Done. {errors} error(s).')
    sys.exit(0 if errors == 0 else 1)


if __name__ == '__main__':
    main()
