import classNames from 'classnames'
import { GraphQLClient } from 'graphql-request'
import { type FC, useCallback, useEffect, useRef, useState } from 'react'
import { Col, Row, Spinner } from 'react-bootstrap'

import Headline2 from '@/components/common/Headline2'
import {
  type CardTypeWhereInput,
  type CardWhereInput,
  type PageInfo,
  getSdk,
} from '@/libs/api/generated'
import type { CardSummary } from '@/libs/domain/Card'
import type { DeckSummary } from '@/libs/domain/Deck'
import type { ProductSummary } from '@/libs/domain/Product'
import type { RevisionKey } from '@/libs/domain/Revision'
import { isNonNullable, unreachable } from '@/libs/utils/types'

import CardsList from './CardsList'
import CardsSearchForm from './CardsSearchForm'
import styles from './index.module.scss'

export type CardTypeCondition = 'occupation' | 'minor_improvement' | 'major_improvement' | 'misc'

export type CardsSearchCondition = Readonly<{
  productID: string | undefined
  deckID: string | undefined
  cardType: CardTypeCondition | undefined
  nameJa: string | undefined
  nameEn: string | undefined
  description: string | undefined
}>

const searchConditionToWhere = (revisionKey: string, searchCondition: CardsSearchCondition) => {
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

type CardsExplorerProps = Readonly<{
  revisionKey: RevisionKey
  decks: Readonly<DeckSummary[]>
  products: Readonly<ProductSummary[]>
}>

const CardsExplorer: FC<CardsExplorerProps> = ({ revisionKey, decks, products }) => {
  const [searchCondition, setSearchCondition] = useState<CardsSearchCondition>({
    productID: undefined,
    deckID: undefined,
    cardType: undefined,
    nameJa: undefined,
    nameEn: undefined,
    description: undefined,
  })
  const [cards, setCards] = useState<CardSummary[]>([])
  const [pageInfo, setPageInfo] = useState<PageInfo | undefined>(undefined)
  const [totalCount, setTotalCount] = useState<number | undefined>(undefined)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const spinnerRef = useRef(null)

  const hasMore = pageInfo === undefined || pageInfo.hasNextPage

  const client = new GraphQLClient('http://localhost:8000/graphql')
  const sdk = getSdk(client)

  const where = searchConditionToWhere(revisionKey, searchCondition)

  const fetchMore = useCallback(async () => {
    if (!hasMore || isLoading) return
    setIsLoading(true)
    const res = await sdk.GetCardsList({
      where,
      after: pageInfo?.endCursor,
    })
    const cards = res.cards?.edges?.map(e => e?.node).filter(isNonNullable) ?? []
    setCards(prevCards => prevCards.concat(cards))
    setPageInfo(res.cards.pageInfo)
    setTotalCount(res.cards.totalCount)
    setIsLoading(false)
  }, [hasMore, pageInfo, where])

  const onSubmitSearch = useCallback((searchCondition: CardsSearchCondition) => {
    setCards([])
    setPageInfo(undefined)
    setTotalCount(undefined)
    setSearchCondition(searchCondition)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      async entries => {
        if (hasMore && entries.length > 0 && entries[0].isIntersecting) {
          await fetchMore()
        }
      },
      { threshold: 1.0 },
    )
    if (spinnerRef.current) observer.observe(spinnerRef.current)
    return () => {
      if (spinnerRef.current) observer.unobserve(spinnerRef.current)
    }
  }, [hasMore, spinnerRef, fetchMore])

  return (
    <Row>
      <Col md={4}>
        <div className={classNames(styles.CardsSearchFormBox)}>
          <Headline2>検索条件</Headline2>
          <CardsSearchForm decks={decks} products={products} onSubmit={onSubmitSearch} />
          {totalCount !== undefined && <p className="mt-2">{totalCount}件ヒットしました</p>}
        </div>
      </Col>
      <Col md={8}>
        <div className="mt-4">
          <CardsList cards={cards ?? []} />
          {hasMore && (
            <div className="text-center mt-3" ref={spinnerRef}>
              <Spinner />
            </div>
          )}
        </div>
      </Col>
    </Row>
  )
}

export default CardsExplorer
