import classNames from 'classnames'
import { GraphQLClient } from 'graphql-request'
import { type FC, useCallback, useEffect, useRef, useState } from 'react'
import { Button, Col, Row, Spinner } from 'react-bootstrap'
import { FaPrint, FaRegCircleCheck } from 'react-icons/fa6'

import Headline2 from '@/components/common/Headline2'
import { type PageInfo, getSdk } from '@/libs/api/generated'
import { paramsToSearchCondition, searchConditionToWhere } from '@/libs/cards/search'
import type { CardSummary } from '@/libs/domain/Card'
import type { CardsSearchCondition } from '@/libs/domain/CardsSearchCondition'
import type { DeckSummary } from '@/libs/domain/Deck'
import type { ProductSummary } from '@/libs/domain/Product'
import type { RevisionKey } from '@/libs/domain/Revision'
import { isNonNullable } from '@/libs/utils/types'

import CardsList from './CardsList'
import CardsSearchForm from './CardsSearchForm'
import styles from './index.module.scss'

type CardsExplorerProps = Readonly<{
  revisionKey: RevisionKey
  decks: Readonly<DeckSummary[]>
  products: Readonly<ProductSummary[]>
}>

const CardsExplorer: FC<CardsExplorerProps> = ({ revisionKey, decks, products }) => {
  const [cards, setCards] = useState<CardSummary[]>([])
  const [pageInfo, setPageInfo] = useState<PageInfo | undefined>(undefined)
  const [totalCount, setTotalCount] = useState<number | undefined>(undefined)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const spinnerRef = useRef(null)

  const hasMore = pageInfo === undefined || pageInfo.hasNextPage

  const params = new URLSearchParams(window.location.search)
  const searchCondition = paramsToSearchCondition(params)
  const where = searchConditionToWhere(revisionKey, searchCondition)

  const client = new GraphQLClient('https://api.db.agricolajp.dev/graphql')
  const sdk = getSdk(client)

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

  const onSubmitSearch = useCallback((condition: CardsSearchCondition) => {
    setCards([])
    setPageInfo(undefined)
    setTotalCount(undefined)
    const params = new URLSearchParams()
    condition.productID !== undefined && params.append('productID', condition.productID)
    condition.deckID !== undefined && params.append('deckID', condition.deckID)
    condition.cardType !== undefined && params.append('cardType', condition.cardType)
    condition.nameJa !== undefined && params.append('nameJa', condition.nameJa)
    condition.nameEn !== undefined && params.append('nameEn', condition.nameEn)
    condition.description !== undefined && params.append('description', condition.description)
    window.history.replaceState({}, '', `?${params.toString()}`)
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

  let translationPrintPath = `/${revisionKey}/cards-translation-print/`
  if (window.location.search) {
    translationPrintPath += `${window.location.search}`
  }

  return (
    <Row>
      <Col md={4}>
        <div className={classNames(styles.CardsSearchFormBox)}>
          <Headline2>検索条件</Headline2>
          <CardsSearchForm
            decks={decks}
            products={products}
            onSubmit={onSubmitSearch}
            searchCondition={searchCondition}
          />
          {totalCount !== undefined && (
            <>
              <p className="mt-2 text-success">
                <FaRegCircleCheck /> {totalCount}件ヒットしました
              </p>
              <Button variant="light" size="sm" href={translationPrintPath}>
                <FaPrint /> 翻訳シートとして印刷する
              </Button>
            </>
          )}
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
