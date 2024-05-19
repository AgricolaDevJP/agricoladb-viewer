import { GraphQLClient } from 'graphql-request'
import { type FC, useEffect, useState } from 'react'

import { getSdk } from '@/libs/api/generated'
import { paramsToSearchCondition, searchConditionToWhere } from '@/libs/cards/search'
import type { CardForPrint } from '@/libs/domain/Card'
import type { RevisionKey } from '@/libs/domain/Revision'
import { isNonNullable } from '@/libs/utils/types'

import CardsTranslationPrintListItem from './CardsTranslationPrintListItem'
import styles from './index.module.scss'

type CardsTranslationPrintListProps = Readonly<{
  revisionKey: RevisionKey
}>

const CardsTranslationPrintList: FC<CardsTranslationPrintListProps> = ({ revisionKey }) => {
  const [cards, setCards] = useState<CardForPrint[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  const params = new URLSearchParams(window.location.search)
  const searchCondition = paramsToSearchCondition(params)
  const where = searchConditionToWhere(revisionKey, searchCondition)

  const client = new GraphQLClient('https://api.db.agricolajp.dev/graphql')
  const sdk = getSdk(client)

  useEffect(() => {
    const fetch = async () => {
      if (isLoading) return
      setIsLoading(true)
      const res = await sdk.GetCardsListForPrint({ where })
      const cards = res.cards?.edges?.map(e => e?.node).filter(isNonNullable) ?? []
      setCards(cards)
      setIsLoading(false)
      setIsLoaded(true)
    }
    fetch()
  }, [])

  useEffect(() => {
    if (isLoaded) {
      window.print()
    }
  }, [isLoaded])

  const cardsChunks = cards.reduce(
    (acc: CardForPrint[][], _c, i) => (i % 3 ? acc : [...acc, ...[cards.slice(i, i + 3)]]),
    [],
  )

  return (
    <>
      {isLoading ? (
        <p>読込中です。しばらくお待ちください</p>
      ) : (
        <table className={styles.CardsTable}>
          <tbody>
            {cardsChunks.map(cardsChunk => (
              <tr className={styles.CardsTableRow} key={`chunk_${cardsChunk[0].literalID}}`}>
                {cardsChunk.map(card => (
                  <CardsTranslationPrintListItem card={card} key={card.literalID} />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}

export default CardsTranslationPrintList
