import type { MathCapstoneInfo } from './types'

export type { MathCapstoneInfo, MathCapstoneQuestion } from './types'

export async function loadMathCapstone(id: string): Promise<MathCapstoneInfo | null> {
  try {
    if (id === 'math-capstone-1') {
      const mod = await import('./math-capstone-1')
      return mod.mathCapstone1
    }
    if (id === 'math-capstone-2') {
      const mod = await import('./math-capstone-2')
      return mod.mathCapstone2
    }
    return null
  } catch {
    return null
  }
}
