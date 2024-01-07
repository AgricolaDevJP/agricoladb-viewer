import { type FC, type FormEventHandler, useCallback } from 'react'
import { Button, FloatingLabel, Form } from 'react-bootstrap'

import type { DeckSummary } from '@/libs/domain/Deck'
import type { ProductSummary } from '@/libs/domain/Product'

import type { CardTypeCondition, CardsSearchCondition } from '..'

type CardsSearchFormProps = Readonly<{
  decks: Readonly<DeckSummary[]>
  products: Readonly<ProductSummary[]>
  onSubmit: (c: CardsSearchCondition) => void
}>

const CardsSearchForm: FC<CardsSearchFormProps> = ({ decks, products, onSubmit }) => {
  const formNames = {
    product: 'product',
    deck: 'deck',
    cardType: 'cardType',
    nameJa: 'nameJa',
    nameEn: 'nameEn',
    description: 'description',
  } as const

  const _onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    e => {
      e.preventDefault()
      const form = new FormData(e.currentTarget)
      // TODO: FormDataEntryValue -> stringを型安全にチェック
      const productID = (form.get(formNames.product) as string) || undefined
      const deckID = (form.get(formNames.deck) as string) || undefined
      const cardType = (form.get(formNames.cardType) as CardTypeCondition) || undefined
      const nameJa = (form.get(formNames.nameJa) as string) || undefined
      const nameEn = (form.get(formNames.nameEn) as string) || undefined
      const description = (form.get(formNames.description) as string) || undefined
      const searchCondition: CardsSearchCondition = {
        productID,
        deckID,
        cardType,
        nameJa,
        nameEn,
        description,
      }
      onSubmit(searchCondition)
    },
    [onSubmit],
  )

  return (
    <Form onSubmit={_onSubmit}>
      <FloatingLabel className="mb-3" label="収録製品" controlId="formProduct">
        <Form.Select name={formNames.product}>
          <option value="">[未選択]</option>
          {products.map(product => (
            <option value={product.id} key={product.id}>
              {product.nameJa}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>
      <FloatingLabel className="mb-3" label="デッキ" controlId="formDeck">
        <Form.Select name={formNames.deck}>
          <option value="">[未選択]</option>
          {decks.map(deck => (
            <option value={deck.id} key={deck.id}>
              {deck.nameJa}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>
      <Form.Group className="mb-3" id="formCardType">
        <Form.Label as="span">種類</Form.Label>
        <div>
          {[
            { label: '職業', value: 'occupation' },
            { label: '小さい進歩', value: 'minor_improvement' },
            { label: '大きい進歩', value: 'major_improvement' },
            { label: 'その他', value: 'misc' },
          ].map(cardType => (
            <Form.Check
              key={cardType.label}
              inline
              label={cardType.label}
              name={formNames.cardType}
              value={cardType.value}
              type="radio"
              id={`formCardType_${cardType.value}`}
            />
          ))}
        </div>
      </Form.Group>
      <FloatingLabel className="mb-3" label="カード名（日本語）" controlId="formNameJa">
        <Form.Control type="text" name={formNames.nameJa} />
      </FloatingLabel>
      <FloatingLabel className="mb-3" label="カード名（英語）" controlId="formNameEn">
        <Form.Control type="text" name={formNames.nameEn} />
      </FloatingLabel>
      <FloatingLabel className="mb-3" label="テキスト" controlId="formDescription">
        <Form.Control type="text" name={formNames.description} />
      </FloatingLabel>
      <Button variant="info" type="submit">
        検索
      </Button>{' '}
      <Button variant="secondary" type="reset">
        クリア
      </Button>
    </Form>
  )
}

export default CardsSearchForm
