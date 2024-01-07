import classNames from 'classnames'
import type { FC } from 'react'

import type { CardDetail } from '@/libs/domain/Card'
import { isCardSpecialColorKey } from '@/libs/domain/CardSpecialColor'
import { isCardTypeKey } from '@/libs/domain/CardType'
import { isNonNullable, unreachable } from '@/libs/utils/types'

import styles from './index.module.scss'

type CardIDBadgeProps = Readonly<{
  card: Pick<CardDetail, 'printedID' | 'cardType' | 'cardSpecialColor'>
}>

const CardIDBadge: FC<CardIDBadgeProps> = ({ card }) => {
  return card.printedID === '' ? (
    <></>
  ) : (
    <span className={classNames(styles.badge, getBadgeClass(card))}>{card.printedID}</span>
  )
}

export default CardIDBadge

const getBadgeClass = (
  card: Pick<CardIDBadgeProps['card'], 'cardType' | 'cardSpecialColor'>,
): string => {
  if (isNonNullable(card.cardSpecialColor) && isCardSpecialColorKey(card.cardSpecialColor.key)) {
    switch (card.cardSpecialColor.key) {
      case 'minor_and_major_improvement':
        return styles.badgeMinorAndMajorImprovement
      case 'occupation_minor_and_major_improvement':
        return styles.badgeOccupationMinorAndMajorImprovement
      default:
        unreachable(card.cardSpecialColor.key)
    }
  }

  if (isCardTypeKey(card.cardType.key)) {
    switch (card.cardType.key) {
      case 'event_l':
        return ''
      case 'mother':
        return styles.badgeMother
      case 'father':
        return styles.badgeFather
      case 'character':
        return ''
      case 'changeling':
        return styles.badgeChangeling
      case 'event_f':
      case 'action_space_f':
        return styles.badgeForestDeck
      case 'event_x':
      case 'merchant_x':
      case 'action_space_x':
        return styles.badgeXDeck
      case 'begging':
        return ''
      case 'major_improvement':
      case 'major_improvement_f':
        return styles.badgeMajorImprovement
      case 'minor_improvement':
      case 'minor_improvement_x':
      case 'minor_improvement_f':
        return styles.badgeMinorImprovement
      case 'occupation':
      case 'occupation_x':
      case 'occupation_f':
        return styles.badgeOccupation
      default:
        unreachable(card.cardType.key)
    }
  }

  return ''
}
