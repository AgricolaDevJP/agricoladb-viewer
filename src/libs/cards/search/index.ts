import type { CardTypeWhereInput, CardWhereInput } from '@/libs/api/generated'
import {
  type CardTypeCondition,
  type CardsSearchCondition,
  cardTypeConditions,
} from '@/libs/domain/CardsSearchCondition'
import { unreachable } from '@/libs/utils/types'

export const paramsToSearchCondition = (params: URLSearchParams): CardsSearchCondition => {
  const productID = params.get('productID')
  const deckID = params.get('deckID')
  const cardType = params.get('cardType')
  const nameJa = params.get('nameJa')
  const nameEn = params.get('nameEn')
  const description = params.get('description')
  const isCardType = (cardType: string): cardType is CardTypeCondition =>
    cardTypeConditions.some(c => c === cardType)
  return {
    productID: productID !== null ? productID : undefined,
    deckID: deckID !== null ? deckID : undefined,
    cardType: cardType !== null && isCardType(cardType) ? cardType : undefined,
    nameJa: nameJa !== null ? nameJa : undefined,
    nameEn: nameEn !== null ? nameEn : undefined,
    description: description !== null ? description : undefined,
  }
}

export const searchConditionToWhere = (
  revisionKey: string,
  searchCondition: CardsSearchCondition,
) => {
  let hasCardTypeWith: CardTypeWhereInput['hasCardsWith']
  switch (searchCondition.cardType) {
    case 'occupation':
      hasCardTypeWith = [{ nameJa: '職業' }]
      break
    case 'minor_improvement':
      hasCardTypeWith = [{ nameJa: '小さい進歩' }]
      break
    case 'major_improvement':
      hasCardTypeWith = [{ nameJa: '大きい進歩' }]
      break
    case 'misc':
      hasCardTypeWith = [{ nameJaNotIn: ['職業', '小さい進歩', '大きい進歩'] }]
      break
    case undefined:
      break
    default:
      unreachable(searchCondition.cardType)
  }
  const where: CardWhereInput = {
    hasRevisionWith: [{ key: revisionKey }],
    hasProductsWith:
      searchCondition.productID !== undefined ? [{ id: searchCondition.productID }] : undefined,
    hasDeckWith:
      searchCondition.deckID !== undefined ? [{ id: searchCondition.deckID }] : undefined,
    hasCardTypeWith,
    nameJaContains: searchCondition.nameJa,
    nameEnContains: searchCondition.nameEn,
    descriptionContains: searchCondition.description,
  }
  return where
}
