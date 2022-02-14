import { QUADRANT_LABELS } from "./constants"

export const booleanColorConverter = (value: string | null) => value ? String(value) : 'black'

export const quadrantConverter = (value: string | null): string[] => {
  value = value ? value : QUADRANT_LABELS.join('')
  try {
    return JSON.parse(value)
  } catch {
    return String(value).split('')
  }
}