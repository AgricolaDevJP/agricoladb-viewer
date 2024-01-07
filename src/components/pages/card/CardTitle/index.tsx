import classNames from 'classnames'
import type { FC, ReactNode } from 'react'

import type { CardDetail } from '@/libs/domain/Card'
import { isCardTypeKey } from '@/libs/domain/CardType'
import { unreachable } from '@/libs/utils/types'

import styles from './index.module.scss'

type CardTitleProps = Readonly<{
  card: Pick<CardDetail, 'nameJa' | 'nameEn' | 'cardType'>
  children?: ReactNode
}>

const CardTitle: FC<CardTitleProps> = ({ card, children }) => {
  return (
    <h1 className={classNames('mt-4', styles.title)}>
      <span className={classNames(getTitleClass(card))}>
        {card.nameJa || card.nameEn || 'NO NAME'}
      </span>
      {children !== undefined && <span className={styles.tagBox}>{children}</span>}
    </h1>
  )
}

export default CardTitle

const getTitleClass = (card: Pick<CardTitleProps['card'], 'cardType'>): string => {
  if (isCardTypeKey(card.cardType.key)) {
    switch (card.cardType.key) {
      case 'event_l':
        return ''
      case 'mother':
        return styles.titleMother
      case 'father':
        return styles.titleFather
      case 'character':
        return ''
      case 'changeling':
        return styles.titleChangeling
      case 'event_f':
      case 'action_space_f':
      case 'major_improvement_f':
      case 'minor_improvement_f':
      case 'occupation_f':
        return styles.titleForestDeck
      case 'event_x':
      case 'merchant_x':
      case 'action_space_x':
      case 'minor_improvement_x':
      case 'occupation_x':
        return styles.titleXDeck
      case 'begging':
        return ''
      case 'major_improvement':
        return styles.titleMajorImprovement
      case 'minor_improvement':
        return styles.titleMinorImprovement
      case 'occupation':
        return styles.titleOccupation
      default:
        unreachable(card.cardType.key)
    }
  }
  return ''
}
