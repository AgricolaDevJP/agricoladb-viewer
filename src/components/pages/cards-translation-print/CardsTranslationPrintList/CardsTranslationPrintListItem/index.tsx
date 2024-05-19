import classNames from 'classnames'
import type { FC } from 'react'

import type { CardForPrint } from '@/libs/domain/Card'

import styles from './index.module.scss'

type CardsTranslationPrintListItemProps = Readonly<{
  card: CardForPrint
}>

const CardsTranslationPrintListItem: FC<CardsTranslationPrintListItemProps> = ({ card }) => {
  const textLength = (card.prerequisite?.length ?? 0) + (card.description?.length ?? 0)
  return (
    <td
      className={classNames({
        [styles.CardsTableCell]: true,
        [styles.CardsTableCellLongText]: textLength >= 100,
        [styles.CardsTableCellLongLongText]: textLength >= 130,
      })}
    >
      <span className={styles.CardTitle}>
        [{card.printedID}] {card.nameJa}
      </span>
      <br />
      {card.prerequisite && (
        <>
          <span>(前提) {card.prerequisite}</span>
          <br />
        </>
      )}
      <span>{card.description}</span>
    </td>
  )
}

export default CardsTranslationPrintListItem
