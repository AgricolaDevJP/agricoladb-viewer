import {
  type ChangeEventHandler,
  type FC,
  type FormEventHandler,
  type MouseEventHandler,
  useCallback,
  useState,
} from 'react'
import { Button, FloatingLabel, Form } from 'react-bootstrap'

import type { DeckSummary } from '@/libs/domain/Deck'
import type { ProductSummary } from '@/libs/domain/Product'

import type { CardTypeCondition, CardsSearchCondition } from '..'

type CardsSearchFormProps = Readonly<{
  decks: Readonly<DeckSummary[]>
  products: Readonly<ProductSummary[]>
  searchCondition: CardsSearchCondition
  onSubmit: (c: CardsSearchCondition) => void
}>

const CardsSearchForm: FC<CardsSearchFormProps> = ({
  decks,
  products,
  searchCondition,
  onSubmit,
}) => {
  const [disableSubmit, setDisableSubmit] = useState<boolean>(true)

  const formNames = {
    product: 'product',
    deck: 'deck',
    cardType: 'cardType',
    nameJa: 'nameJa',
    nameEn: 'nameEn',
    description: 'description',
  } as const

  const [lastSelectedCardType, setLastSelectedCardType] = useState<string>()

  // clickでしかラジオボタンのチェック状態をクリアできないのa11y的に微妙かも
  const onClickCardTypeRadio: MouseEventHandler<HTMLInputElement> = useCallback(
    e => {
      if (lastSelectedCardType === e.currentTarget.value) {
        e.currentTarget.checked = false
        setLastSelectedCardType('')
      }
    },
    [lastSelectedCardType],
  )

  const onChangeCardTypeRadio: ChangeEventHandler<HTMLInputElement> = useCallback(e => {
    setLastSelectedCardType(e.currentTarget.value)
  }, [])

  const _onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    e => {
      e.preventDefault()
      const formData = new FormData(e.currentTarget)
      // TODO: FormDataEntryValue -> stringを型安全にチェック
      const productID = (formData.get(formNames.product) as string) || undefined
      const deckID = (formData.get(formNames.deck) as string) || undefined
      const cardType = (formData.get(formNames.cardType) as CardTypeCondition) || undefined
      const nameJa = (formData.get(formNames.nameJa) as string) || undefined
      const nameEn = (formData.get(formNames.nameEn) as string) || undefined
      const description = (formData.get(formNames.description) as string) || undefined
      const searchCondition: CardsSearchCondition = {
        productID,
        deckID,
        cardType,
        nameJa,
        nameEn,
        description,
      }
      onSubmit(searchCondition)
      setDisableSubmit(true)
    },
    [onSubmit],
  )

  return (
    <Form
      onSubmit={_onSubmit}
      onChange={() => {
        setDisableSubmit(false)
      }}
    >
      <FloatingLabel className="mb-3" label="収録製品" controlId="formProduct">
        <Form.Select name={formNames.product} defaultValue={searchCondition.productID}>
          <option value="">[未選択]</option>
          {products.map(product => (
            <option value={product.id} key={product.id}>
              {product.nameJa}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>
      <FloatingLabel className="mb-3" label="デッキ" controlId="formDeck">
        <Form.Select name={formNames.deck} defaultValue={searchCondition.deckID}>
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
              defaultChecked={searchCondition.cardType === cardType.value}
              onClick={onClickCardTypeRadio}
              onChange={onChangeCardTypeRadio}
            />
          ))}
        </div>
      </Form.Group>
      <FloatingLabel className="mb-3" label="カード名（日本語）" controlId="formNameJa">
        <Form.Control type="text" name={formNames.nameJa} defaultValue={searchCondition.nameJa} />
      </FloatingLabel>
      <FloatingLabel className="mb-3" label="カード名（英語）" controlId="formNameEn">
        <Form.Control type="text" name={formNames.nameEn} defaultValue={searchCondition.nameEn} />
      </FloatingLabel>
      <FloatingLabel className="mb-3" label="テキスト" controlId="formDescription">
        <Form.Control
          type="text"
          name={formNames.description}
          defaultValue={searchCondition.description}
        />
      </FloatingLabel>
      <Button variant="info" type="submit" disabled={disableSubmit}>
        検索
      </Button>
    </Form>
  )
}

export default CardsSearchForm
