import type { FC } from 'react'
import { ListGroup } from 'react-bootstrap'

import type { CardSummary } from '@/libs/domain/Card'

import CardsListRow from './CardsListRow'

type CardsListProps = Readonly<{
  cards: Readonly<CardSummary[]>
}>

const CardsList: FC<CardsListProps> = ({ cards }) => {
  return (
    <ListGroup>
      {cards.map(card => (
        <CardsListRow card={card} key={`${card.revision.key}_${card.literalID}`} />
      ))}
    </ListGroup>
  )
}

export default CardsList
