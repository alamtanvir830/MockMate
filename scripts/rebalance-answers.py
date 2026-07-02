#!/usr/bin/env python3
"""
Rebalances answer-key distributions in SAT/MCAT TypeScript question files.
For each targeted question: swaps two choice texts, updates correctAnswer,
updates "Choice X is correct" in explanation, renames wrongAnswerExplanations key.
"""

import re, sys
from pathlib import Path

ROOT = Path(__file__).parent.parent / "lib" / "premade-exams"

# ── helpers ───────────────────────────────────────────────────────────────────

def find_question_block(text, qid):
    m = re.search(r"id:\s*['\"]" + re.escape(qid) + r"['\"]", text)
    if not m:
        return None, None
    # Walk backward to opening {
    pos = m.start()
    block_start = None
    while pos > 0:
        pos -= 1
        c = text[pos]
        if c == '{':
            block_start = pos; break
        elif c not in ' \n\t\r':
            break
    if block_start is None:
        return None, None
    # Find next id to bound the block
    nxt = re.compile(r"\bid:\s*['\"][^'\"]+['\"]").search(text, m.end() + 1)
    if nxt:
        p2 = nxt.start()
        block_end = None
        while p2 > block_start:
            p2 -= 1
            c = text[p2]
            if c == '{':
                block_end = p2; break
            elif c not in ' \n\t\r':
                block_end = nxt.start(); break
        if block_end is None:
            block_end = nxt.start()
    else:
        block_end = len(text)
    return block_start, block_end

def swap_choice_texts(block, la, lb):
    def find_ch(label):
        return re.search(
            r'\{\s*label:\s*[\'"]' + re.escape(label) + r'[\'"],\s*text:\s*([\'"])(.*?)\1\s*\}',
            block, re.DOTALL)
    ma, mb = find_ch(la), find_ch(lb)
    if not ma or not mb:
        return None
    ta_s, ta_e = ma.start(2), ma.end(2)
    tb_s, tb_e = mb.start(2), mb.end(2)
    ta, tb = block[ta_s:ta_e], block[tb_s:tb_e]
    if ta_s < tb_s:
        return block[:ta_s] + tb + block[ta_e:tb_s] + ta + block[tb_e:]
    else:
        return block[:tb_s] + ta + block[tb_e:ta_s] + tb + block[ta_e:]

def update_correct_answer(block, old, new):
    return re.sub(r"(correctAnswer:\s*['\"])" + re.escape(old) + r"(['\"])",
                  r'\g<1>' + new + r'\2', block)

def update_explanation_letter(block, old, new):
    return re.sub(r'Choice\s+' + re.escape(old) + r'\s+is\s+(correct|the best answer)',
                  'Choice ' + new + r' is \1', block)

def update_wae(block, old_wrong, new_wrong):
    """Rename wrongAnswerExplanations key old_wrong→new_wrong, update letter in text."""
    wm = re.search(r'wrongAnswerExplanations\s*:\s*\{', block)
    if not wm:
        return block
    after = block[wm.end():]
    km = re.search(r'(\n[ \t]+)' + re.escape(old_wrong) + r'(\s*:)', after)
    if not km:
        return block  # key absent (already correct or missing)
    new_after = after[:km.start()] + km.group(1) + new_wrong + km.group(2) + after[km.end():]
    # Replace first occurrence of "Choice old_wrong is incorrect" after key position
    target = 'Choice ' + old_wrong + ' is incorrect'
    repl   = 'Choice ' + new_wrong + ' is incorrect'
    idx = new_after.find(target, km.start())
    if idx != -1:
        new_after = new_after[:idx] + repl + new_after[idx + len(target):]
    return block[:wm.end()] + new_after

def apply_swap(text, qid, old_correct, new_correct):
    bs, be = find_question_block(text, qid)
    if bs is None:
        print(f'    ⚠ NOT FOUND: {qid}'); return text
    block = orig = text[bs:be]
    swapped = swap_choice_texts(block, old_correct, new_correct)
    if swapped is None:
        print(f'    ⚠ CHOICE SWAP FAILED: {qid} ({old_correct}↔{new_correct})'); return text
    block = swapped
    block = update_correct_answer(block, old_correct, new_correct)
    block = update_explanation_letter(block, old_correct, new_correct)
    block = update_wae(block, new_correct, old_correct)
    if block == orig:
        print(f'    ⚠ NO CHANGE: {qid}')
    else:
        print(f'    ✓ {qid}: {old_correct}→{new_correct}')
    return text[:bs] + block + text[be:]

# ── swap plans ────────────────────────────────────────────────────────────────

PLANS = {
  ROOT/"sat/rw-module-1.ts": [
    ('rw1-02','B','A'),('rw1-05','B','A'),('rw1-08','B','A'),
    ('rw1-03','B','C'),('rw1-09','B','C'),
    ('rw1-11','B','D'),('rw1-12','B','D'),('rw1-13','B','D'),
    ('rw1-15','B','D'),('rw1-16','B','D'),('rw1-19','B','D'),
  ],
  ROOT/"sat/rw-module-2-easy.ts": [
    ('rw2e-01','B','A'),('rw2e-03','B','A'),('rw2e-07','B','A'),
    ('rw2e-13','B','A'),('rw2e-19','B','A'),
    ('rw2e-02','B','C'),('rw2e-05','B','C'),('rw2e-14','B','C'),
    ('rw2e-08','B','D'),('rw2e-16','B','D'),('rw2e-17','B','D'),
    ('rw2e-20','B','D'),('rw2e-21','B','D'),('rw2e-23','B','D'),
  ],
  ROOT/"sat/rw-module-2-hard.ts": [
    ('rw2h-03','B','C'),('rw2h-06','B','C'),('rw2h-09','B','C'),
    ('rw2h-05','B','D'),('rw2h-08','B','D'),('rw2h-12','B','D'),
    ('rw2h-13','B','D'),('rw2h-18','B','D'),('rw2h-20','B','D'),
  ],
  ROOT/"sat/math-module-1.ts": [
    ('m1-01','C','A'),('m1-02','C','A'),('m1-06','C','A'),
    ('m1-03','C','B'),('m1-04','C','B'),
    ('m1-11','C','D'),('m1-15','C','D'),('m1-16','C','D'),
  ],
  ROOT/"sat/math-module-2-easy.ts": [
    ('m2e-02','B','A'),
    ('m2e-04','B','D'),('m2e-15','B','D'),('m2e-17','B','D'),
    ('m2e-01','C','D'),
  ],
  ROOT/"sat/math-module-2-hard.ts": [
    ('m2h-02','B','D'),('m2h-11','B','D'),('m2h-16','B','D'),
    ('m2h-03','C','D'),
  ],
  ROOT/"sat/form-2-rw-module-1.ts": [
    ('sat2-rw-m1-006','A','D'),
    ('sat2-rw-m1-005','B','C'),
    ('sat2-rw-m1-008','B','D'),('sat2-rw-m1-012','B','D'),
    ('sat2-rw-m1-015','B','D'),('sat2-rw-m1-018','B','D'),
    ('sat2-rw-m1-025','B','D'),
  ],
  ROOT/"sat/form-2-rw-module-2-easy.ts": [
    ('sat2-rw-m2e-002','A','C'),('sat2-rw-m2e-004','A','C'),
    ('sat2-rw-m2e-026','A','C'),
    ('sat2-rw-m2e-005','A','D'),('sat2-rw-m2e-022','A','D'),
    ('sat2-rw-m2e-015','B','D'),
  ],
  ROOT/"sat/form-2-rw-module-2-hard.ts": [
    ('sat2-rw-m2h-007','B','D'),('sat2-rw-m2h-009','B','D'),
    ('sat2-rw-m2h-016','B','D'),
  ],
  ROOT/"sat/form-2-math-module-1.ts": [
    ('sat2-math-m1-002','B','A'),('sat2-math-m1-005','B','A'),
    ('sat2-math-m1-009','B','A'),
    ('sat2-math-m1-004','C','D'),('sat2-math-m1-014','C','D'),
  ],
  ROOT/"sat/form-2-math-module-2-easy.ts": [
    ('sat2-math-m2e-003','B','A'),('sat2-math-m2e-009','B','A'),
    ('sat2-math-m2e-005','B','C'),
    ('sat2-math-m2e-008','B','D'),('sat2-math-m2e-011','B','D'),
  ],
  ROOT/"sat/form-2-math-module-2-hard.ts": [
    ('sat2-math-m2h-006','B','D'),('sat2-math-m2h-013','B','D'),
    ('sat2-math-m2h-007','C','D'),('sat2-math-m2h-011','C','D'),
  ],
  ROOT/"sat/form-3-rw-module-1.ts": [
    ('sat-f3-rw-m1-q04','A','C'),('sat-f3-rw-m1-q22','A','C'),
    ('sat-f3-rw-m1-q26','A','D'),
    ('sat-f3-rw-m1-q05','B','C'),('sat-f3-rw-m1-q09','B','C'),
    ('sat-f3-rw-m1-q14','B','C'),
    ('sat-f3-rw-m1-q08','B','D'),('sat-f3-rw-m1-q11','B','D'),
    ('sat-f3-rw-m1-q18','B','D'),('sat-f3-rw-m1-q19','B','D'),
    ('sat-f3-rw-m1-q23','B','D'),
  ],
  ROOT/"sat/form-3-rw-module-2-easy.ts": [
    ('sat-f3-rw-m2e-q03','A','C'),('sat-f3-rw-m2e-q04','A','C'),
    ('sat-f3-rw-m2e-q17','A','D'),('sat-f3-rw-m2e-q26','A','D'),
    ('sat-f3-rw-m2e-q06','B','C'),('sat-f3-rw-m2e-q10','B','C'),
    ('sat-f3-rw-m2e-q12','B','D'),('sat-f3-rw-m2e-q14','B','D'),
  ],
  ROOT/"sat/form-3-rw-module-2-hard.ts": [
    ('sat-f3-rw-m2h-q02','A','C'),('sat-f3-rw-m2h-q05','A','C'),
    ('sat-f3-rw-m2h-q19','A','C'),
    ('sat-f3-rw-m2h-q15','A','D'),('sat-f3-rw-m2h-q26','A','D'),
    ('sat-f3-rw-m2h-q06','B','C'),('sat-f3-rw-m2h-q12','B','C'),
    ('sat-f3-rw-m2h-q10','B','D'),('sat-f3-rw-m2h-q16','B','D'),
    ('sat-f3-rw-m2h-q27','B','D'),
  ],
  ROOT/"sat/form-3-math-module-1.ts": [
    ('sat-f3-math-m1-q02','B','A'),
    ('sat-f3-math-m1-q13','B','D'),('sat-f3-math-m1-q17','B','D'),
  ],
  ROOT/"sat/form-3-math-module-2-easy.ts": [
    ('sat-f3-math-m2e-q02','B','A'),
    ('sat-f3-math-m2e-q03','B','D'),('sat-f3-math-m2e-q10','B','D'),
    ('sat-f3-math-m2e-q15','B','D'),('sat-f3-math-m2e-q18','B','D'),
    ('sat-f3-math-m2e-q19','B','D'),
  ],
  ROOT/"sat/form-3-math-module-2-hard.ts": [
    ('sat-f3-math-m2h-q12','A','D'),
    ('sat-f3-math-m2h-q13','C','D'),('sat-f3-math-m2h-q14','C','D'),
    ('sat-f3-math-m2h-q16','C','D'),('sat-f3-math-m2h-q17','C','D'),
  ],
  ROOT/"mcat/form-1-chem-phys.ts": [
    ('mcat1-cp-005','B','A'),('mcat1-cp-022','B','A'),('mcat1-cp-048','B','A'),
    ('mcat1-cp-006','B','C'),('mcat1-cp-014','B','C'),
    ('mcat1-cp-028','B','C'),('mcat1-cp-053','B','C'),
    ('mcat1-cp-008','B','D'),('mcat1-cp-010','B','D'),('mcat1-cp-025','B','D'),
    ('mcat1-cp-039','B','D'),('mcat1-cp-041','B','D'),('mcat1-cp-045','B','D'),
    ('mcat1-cp-017','B','D'),('mcat1-cp-033','B','D'),('mcat1-cp-055','B','D'),
    ('mcat1-cp-058','B','D'),
  ],
  ROOT/"mcat/form-1-cars.ts": [
    ('mcat1-cars-002','B','A'),('mcat1-cars-003','B','A'),('mcat1-cars-007','B','A'),
    ('mcat1-cars-013','B','A'),('mcat1-cars-018','B','A'),('mcat1-cars-027','B','A'),
    ('mcat1-cars-032','B','A'),('mcat1-cars-036','B','A'),('mcat1-cars-043','B','A'),
    ('mcat1-cars-045','B','A'),
    ('mcat1-cars-005','B','D'),('mcat1-cars-008','B','D'),('mcat1-cars-011','B','D'),
    ('mcat1-cars-012','B','D'),('mcat1-cars-015','B','D'),('mcat1-cars-016','B','D'),
    ('mcat1-cars-019','B','D'),('mcat1-cars-030','B','D'),('mcat1-cars-037','B','D'),
    ('mcat1-cars-040','B','D'),('mcat1-cars-046','B','D'),('mcat1-cars-048','B','D'),
    ('mcat1-cars-031','C','D'),
  ],
  ROOT/"mcat/form-1-bio-biochem.ts": [
    ('mcat1-bb-002','B','A'),('mcat1-bb-006','B','A'),('mcat1-bb-013','B','A'),
    ('mcat1-bb-026','B','A'),('mcat1-bb-042','B','A'),('mcat1-bb-055','B','A'),
    ('mcat1-bb-003','B','C'),('mcat1-bb-008','B','C'),('mcat1-bb-021','B','C'),
    ('mcat1-bb-028','B','C'),('mcat1-bb-041','B','C'),('mcat1-bb-056','B','C'),
    ('mcat1-bb-010','B','D'),('mcat1-bb-025','B','D'),('mcat1-bb-029','B','D'),
    ('mcat1-bb-037','B','D'),('mcat1-bb-038','B','D'),('mcat1-bb-044','B','D'),
    ('mcat1-bb-046','B','D'),('mcat1-bb-048','B','D'),('mcat1-bb-017','B','D'),
    ('mcat1-bb-018','B','D'),('mcat1-bb-020','B','D'),('mcat1-bb-034','B','D'),
    ('mcat1-bb-058','B','D'),('mcat1-bb-059','B','D'),
  ],
  ROOT/"mcat/form-1-psych-soc.ts": [
    ('mcat1-ps-002','B','A'),('mcat1-ps-004','B','A'),('mcat1-ps-007','B','A'),
    ('mcat1-ps-011','B','A'),('mcat1-ps-025','B','A'),('mcat1-ps-036','B','A'),
    ('mcat1-ps-040','B','A'),('mcat1-ps-043','B','A'),('mcat1-ps-048','B','A'),
    ('mcat1-ps-056','B','A'),
    ('mcat1-ps-003','B','C'),('mcat1-ps-008','B','C'),('mcat1-ps-013','B','C'),
    ('mcat1-ps-039','B','C'),('mcat1-ps-049','B','C'),
    ('mcat1-ps-010','B','D'),('mcat1-ps-014','B','D'),('mcat1-ps-017','B','D'),
    ('mcat1-ps-018','B','D'),('mcat1-ps-023','B','D'),('mcat1-ps-031','B','D'),
    ('mcat1-ps-035','B','D'),('mcat1-ps-042','B','D'),('mcat1-ps-045','B','D'),
    ('mcat1-ps-046','B','D'),('mcat1-ps-050','B','D'),('mcat1-ps-055','B','D'),
    ('mcat1-ps-058','B','D'),
  ],
}

def main():
    for path, swaps in PLANS.items():
        print(f'\n{"="*60}')
        print(f'  {path.name}  ({len(swaps)} swaps)')
        text = path.read_text()
        orig = text
        for qid, old_c, new_c in swaps:
            text = apply_swap(text, qid, old_c, new_c)
        if text != orig:
            path.write_text(text)
            print(f'  → written')
        else:
            print(f'  → no changes')

if __name__ == '__main__':
    main()
