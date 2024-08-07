import type { FC, ReactNode } from 'react'
import reactStringReplace from 'react-string-replace'

import BreadIcon from '@/components/card/BreadIcon'
import PanIcon from '@/components/card/PanIcon'
import type { CardDetail } from '@/libs/domain/Card'
import { isNonNullable } from '@/libs/utils/types'

import styles from './index.module.scss'

type CardDescriptionListTableProps = Readonly<{
  card: Pick<
    CardDetail,
    | 'cardType'
    | 'minPlayersNumber'
    | 'prerequisite'
    | 'cost'
    | 'victoryPoint'
    | 'specialVictoryPoint'
    | 'description'
    | 'note'
  >
}>

const CardDescriptionListTable: FC<CardDescriptionListTableProps> = ({ card }) => {
  const victoryPointString = getVictoryPointString(card)
  return (
    <dl>
      <dt>種類</dt>
      <dd>
        {card.cardType.nameJa}
        {card.minPlayersNumber && <>（{card.minPlayersNumber}+）</>}
      </dd>
      {card.prerequisite && (
        <>
          <dt>前提</dt>
          <dd>{replaceIconString(card.prerequisite)}</dd>
        </>
      )}
      {card.cost && (
        <>
          <dt>コスト</dt>
          <dd>{card.cost}</dd>
        </>
      )}
      {victoryPointString !== undefined && (
        <>
          <dt>カード点</dt>
          <dd>{victoryPointString}</dd>
        </>
      )}
      {card.description && (
        <>
          <dt>テキスト</dt>
          <dd className={styles.description}>{replaceIconString(card.description)}</dd>
        </>
      )}
      {card.note && (
        <>
          <dt>補足</dt>
          <dd className={styles.note}>{replaceIconString(card.note)}</dd>
        </>
      )}
    </dl>
  )
}

export default CardDescriptionListTable

const getVictoryPointString = (
  card: Pick<CardDetail, 'victoryPoint' | 'specialVictoryPoint'>,
): string | undefined => {
  if (card.victoryPoint) {
    return `${card.victoryPoint}点`
  }
  if (isNonNullable(card.specialVictoryPoint)) {
    return `${card.specialVictoryPoint}点`
  }
  return undefined
}

const replaceIconString = (body: string): ReactNode => {
  return reactStringReplace(
    reactStringReplace(body, ':鍋:', () => <PanIcon />),
    ':パン:',
    () => <BreadIcon />,
  )
}
