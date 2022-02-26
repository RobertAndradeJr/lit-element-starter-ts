import { QUADRANT_COLORS, QUADRANT_LABELS } from "./constants"

export const booleanColorConverter = (value: string | null) => value ? String(value) : QUADRANT_COLORS.border

export const quadrantConverter = (value: string | null): string[] => {
  // if there is no value it all quadrants are showing
  value = value ? value : QUADRANT_LABELS.join('')
  try {
    // Parse valid array
    return JSON.parse(value)
  } catch {
    // We can display each quadrant if any of the labels
    // is passed in as a string
    return QUADRANT_LABELS.filter(label => {
      const regex = new RegExp(label, 'i')
      return regex.test(String(value))
    })
  }
}