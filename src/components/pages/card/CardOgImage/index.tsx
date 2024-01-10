import type { CSSProperties, FC } from 'react'

import type { CardDetail } from '@/libs/domain/Card'
import { isCardSpecialColorKey } from '@/libs/domain/CardSpecialColor'
import { isCardTypeKey } from '@/libs/domain/CardType'
import { isNonNullable, unreachable } from '@/libs/utils/types'

type CardOgImageProps = Readonly<{
  card: Pick<
    CardDetail,
    'printedID' | 'literalID' | 'nameJa' | 'nameEn' | 'cardType' | 'cardSpecialColor'
  >
}>

const CardOgImage: FC<CardOgImageProps> = ({ card }) => (
  <main
    style={{
      height: '100%',
      width: '100%',
      backgroundColor: '#fff',
      color: '#212529',
      padding: '20px',
    }}
  >
    <section>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <div
          style={{
            height: '100%',
            width: '35px',
            borderRadius: '5px',
            ...getBorderBackground(card),
          }}
        ></div>
        <div style={{ width: '700px', display: 'flex', flexFlow: 'column' }}>
          <h1 style={{ fontSize: '54px' }}>
            [{card.printedID ?? card.literalID ?? '-'}] {card.nameJa ?? card.nameEn ?? ''}
          </h1>
          <div style={{ fontSize: '36px' }}>{card.nameEn ?? ''}</div>
          <div
            style={{
              fontSize: '30px',
              color: '#666666',
              position: 'absolute',
              bottom: '60px',
              right: '30px',
            }}
          >
            AgricolaDB
          </div>
          <div
            style={{
              fontSize: '20px',
              color: '#666666',
              position: 'absolute',
              bottom: '20px',
              right: '30px',
            }}
          >
            https://agricolajp.dev/
          </div>
        </div>
      </div>
    </section>
  </main>
)

const getBorderBackground = (
  card: Pick<CardOgImageProps['card'], 'cardType' | 'cardSpecialColor'>,
): CSSProperties => {
  // src/layouts/app.scssのCSS Variablesを使いたいが未対応のため直書き
  if (isNonNullable(card.cardSpecialColor) && isCardSpecialColorKey(card.cardSpecialColor.key)) {
    switch (card.cardSpecialColor.key) {
      case 'minor_and_major_improvement':
        return {
          backgroundImage: 'linear-gradient(to bottom, #f57c00, #c2185b)',
        }
      case 'occupation_minor_and_major_improvement':
        return {
          backgroundImage: 'linear-gradient(to bottom, #fbc02d, #f57c00, #c2185b)',
        }
      default:
        unreachable(card.cardSpecialColor.key)
    }
  }

  if (isCardTypeKey(card.cardType.key)) {
    switch (card.cardType.key) {
      case 'event_l':
        return { backgroundColor: '#444250' }
      case 'mother':
        return { backgroundColor: '#9b6034' }
      case 'father':
        return { backgroundColor: '#635a53' }
      case 'character':
        return { backgroundColor: '#444250' }
      case 'changeling':
        return { backgroundColor: '#303f9f' }
      case 'event_f':
      case 'action_space_f':
        return { backgroundColor: '#5d4037' }
      case 'event_x':
      case 'merchant_x':
      case 'action_space_x':
        return { backgroundColor: '#689f38' }
      case 'begging':
        return {}
      case 'major_improvement':
      case 'major_improvement_f':
        return { backgroundColor: '#c2185b' }
      case 'minor_improvement':
      case 'minor_improvement_x':
      case 'minor_improvement_f':
        return { backgroundColor: '#f57c00' }
      case 'occupation':
      case 'occupation_x':
      case 'occupation_f':
        return { backgroundColor: '#fbc02d' }
      default:
        unreachable(card.cardType.key)
    }
  }

  return {}
}

export default CardOgImage

export const cardOgImageAltText = (card: CardOgImageProps['card']) =>
  `[${card.printedID ?? card.literalID ?? '-'}] ${card.nameJa ?? card.nameEn ?? ''} ${
    card.nameEn ?? ''
  } Agricola DB https://agricolajp.dev/`
