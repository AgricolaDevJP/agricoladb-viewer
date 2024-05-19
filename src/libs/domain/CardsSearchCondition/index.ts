export const cardTypeConditions = [
  'occupation',
  'minor_improvement',
  'major_improvement',
  'misc',
] as const

export type CardTypeCondition = (typeof cardTypeConditions)[number]

export type CardsSearchCondition = Readonly<{
  productID: string | undefined
  deckID: string | undefined
  cardType: CardTypeCondition | undefined
  nameJa: string | undefined
  nameEn: string | undefined
  description: string | undefined
}>
