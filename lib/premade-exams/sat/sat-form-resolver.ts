import type { SATForm } from './types'
import { type SATContentVersion, normalizeSatContentVersion } from './version-constants'

// V1 forms (immutable — never update these imports)
import { satForm1 } from './form-1'
import { satForm2 } from './form-2'
import { satForm3 } from './form-3'
import { satForm4 } from './form-4'
import { satForm5 } from './form-5'
import { satForm6 } from './form-6'
import { satForm7 } from './form-7'
import { satForm8 } from './form-8'

// V2 forms (active generation for new attempts)
import { satForm1V2 } from './v2/form-1'
import { satForm2V2 } from './v2/form-2'
import { satForm3V2 } from './v2/form-3'
import { satForm4V2 } from './v2/form-4'
import { satForm5V2 } from './v2/form-5'
import { satForm6V2 } from './v2/form-6'
import { satForm7V2 } from './v2/form-7'
import { satForm8V2 } from './v2/form-8'

const V1_FORMS: Record<number, SATForm> = {
  1: satForm1,
  2: satForm2,
  3: satForm3,
  4: satForm4,
  5: satForm5,
  6: satForm6,
  7: satForm7,
  8: satForm8,
}

const V2_FORMS: Record<number, SATForm> = {
  1: satForm1V2,
  2: satForm2V2,
  3: satForm3V2,
  4: satForm4V2,
  5: satForm5V2,
  6: satForm6V2,
  7: satForm7V2,
  8: satForm8V2,
}

/**
 * Returns the SATForm for a given form number and content version.
 * The contentVersion must come from the stored attempt — never inferred
 * from current date, login state, or any other runtime signal.
 *
 * Missing / undefined contentVersion → V1 (backward-compatible).
 */
export function getSatForm(
  formNumber: number,
  contentVersion: SATContentVersion | unknown,
): SATForm {
  const version = normalizeSatContentVersion(contentVersion)
  const forms = version === 2 ? V2_FORMS : V1_FORMS
  const form = forms[formNumber]
  if (!form) {
    throw new Error(`Unknown SAT form number: ${formNumber}`)
  }
  return form
}

/**
 * Convenience: resolves the form number from a form ID string like "sat-form-3".
 * Throws if the ID does not match the expected pattern.
 */
export function getFormNumberFromId(formId: string): number {
  const match = /sat-form-(\d+)$/.exec(formId)
  if (!match) throw new Error(`Cannot parse form number from ID: ${formId}`)
  return parseInt(match[1], 10)
}
