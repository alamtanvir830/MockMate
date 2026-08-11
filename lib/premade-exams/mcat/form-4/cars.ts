import type { MCATSection } from '../types'
import { carsPassages4_01to05 } from './cars-p01-p05'
import { carsPassages4_06to09 } from './cars-p06-p09'

export const carsSection4: MCATSection = {
  id: 'cars',
  title: 'Critical Analysis and Reasoning Skills',
  abbreviation: 'CARS',
  questionCount: 53,
  seededCount: 53,
  timeMinutes: 90,
  breakAfterMinutes: 30,
  breakType: 'long',
  passages: [...carsPassages4_01to05, ...carsPassages4_06to09],
  discreteQuestions: [],
}
