const cardSpecialColorKeys = [
  'minor_and_major_improvement',
  'occupation_minor_and_major_improvement',
] as const

export type CardSpecialColorKey = (typeof cardSpecialColorKeys)[number]

export const isCardSpecialColorKey = (value: String): value is CardSpecialColorKey =>
  cardSpecialColorKeys.includes(value as CardSpecialColorKey)
