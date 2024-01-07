import classNames from 'classnames'
import type { FC } from 'react'
import ListGroupItem from 'react-bootstrap/ListGroupItem'

import CardIDBadge from '@/components/card/CardIDBadge'
import type { CardSummary } from '@/libs/domain/Card'

type CardsListRowProps = Readonly<{
  card: CardSummary
}>

const CardsListRow: FC<CardsListRowProps> = ({ card }) => (
  <ListGroupItem
    action
    href={`/${card.revision.key}/card/${card.literalID}`}
    className={classNames('d-flex', 'justify-content-between')}
    active={false}
  >
    {card.nameJa}
    <CardIDBadge card={card} />
  </ListGroupItem>
)

export default CardsListRow
