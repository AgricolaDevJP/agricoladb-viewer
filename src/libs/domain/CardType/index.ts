const cardTypeKeys = [
  'occupation',
  'minor_improvement',
  'major_improvement',
  'begging',
  'occupation_x',
  'minor_improvement_x',
  'action_space_x',
  'merchant_x',
  'event_x',
  'occupation_f',
  'minor_improvement_f',
  'major_improvement_f',
  'action_space_f',
  'event_f',
  'changeling',
  'character',
  'mother',
  'father',
  'event_l',
] as const

export type CardTypeKey = (typeof cardTypeKeys)[number]

export const isCardTypeKey = (value: String): value is CardTypeKey =>
  cardTypeKeys.includes(value as CardTypeKey)
