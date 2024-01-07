import type { FC } from 'react'
import { Table } from 'react-bootstrap'

import type { CardDetail } from '@/libs/domain/Card'
import { isNonNullable } from '@/libs/utils/types'

import styles from './index.module.scss'

type CardMetaTableProps = Readonly<{
  card: Pick<
    CardDetail,
    'deck' | 'products' | 'playAgricolaCardID' | 'isOfficialJa' | 'ancestors' | 'children'
  >
}>

const CardMetaTable: FC<CardMetaTableProps> = ({ card }) => {
  return (
    <Table striped>
      <tbody>
        <tr>
          <th scope="row">デッキ</th>
          <td>
            {isNonNullable(card.deck) ? (
              <a href={`/${card.deck.revision.key}/cards?deckID=${card.deck.id}`}>
                {card.deck.nameJa}
              </a>
            ) : (
              '-'
            )}
          </td>
        </tr>
        <tr>
          <th scope="row">収録製品</th>
          <td>
            <ul className={styles.list}>
              {(card.products ?? []).map(product => (
                <li key={product.id}>
                  <a href={`/${product.revision.key}/cards?productID=${product.id}`}>
                    {product.nameJa}
                  </a>
                </li>
              ))}
            </ul>
          </td>
        </tr>
        <tr>
          <th scope="row">PlayAgricola</th>
          <td>
            {card.playAgricolaCardID ? (
              <a
                href={`http://playagricola.com/Agricola/Cards/index.php?id=${card.playAgricolaCardID}`}
              >
                {card.playAgricolaCardID}
              </a>
            ) : (
              '未掲載'
            )}
          </td>
        </tr>
        <tr>
          <th scope="row">日本語訳</th>
          <td>{card.isOfficialJa ? '公式' : '非公式'}</td>
        </tr>
        <tr>
          <th scope="row">再録関係</th>
          <td>
            {card.ancestors || card.children ? (
              <ul className={styles.list}>
                {(card.ancestors ?? []).map(ancestor => (
                  <li key={`${ancestor.revision.key}_${ancestor.literalID}`}>
                    <a href={`/${ancestor.revision.key}/card/${ancestor.literalID}`}>
                      [{ancestor.printedID ?? ancestor.literalID}]{ancestor.nameJa ?? ''}
                    </a>
                  </li>
                ))}
                {(card.children ?? []).map(child => (
                  <li key={`${child.revision.key}_${child.literalID}`}>
                    <a href={`/${child.revision.key}/card/${child.literalID}`}>
                      [{child.printedID ?? child.literalID}]{child.nameJa ?? ''}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              '-'
            )}
          </td>
        </tr>
      </tbody>
    </Table>
  )
}

export default CardMetaTable
