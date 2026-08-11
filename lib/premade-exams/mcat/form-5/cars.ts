import type { MCATSection } from '../types'
import { carsPassages5_01to05 } from './cars-p01-p05'
import { carsPassages5_06to09 } from './cars-p06-p09'

export const carsSection5: MCATSection = {
  id: 'cars',
  title: 'Critical Analysis and Reasoning Skills',
  abbreviation: 'CARS',
  questionCount: 53,
  seededCount: 53,
  timeMinutes: 90,
  breakAfterMinutes: 30,
  breakType: 'long',
  passages: [...carsPassages5_01to05, ...carsPassages5_06to09],
  discreteQuestions: [],
}
