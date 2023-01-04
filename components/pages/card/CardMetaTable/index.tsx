import type { FC } from 'react'
import type { CardDetail } from '../../../../libs/graphql/ClientForStaticGeneration'
import { Table } from 'react-bootstrap'
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
          <td>{card.deck?.nameJa || '-'}</td>
        </tr>
        <tr>
          <th scope="row">収録製品</th>
          <td>
            <ul className={styles.list}>
              {(card.products || []).map(product => (
                <li key={product.id}>{product.nameJa}</li>
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
                {(card.ancestors || []).map(ancestor => (
                  <li key={`${ancestor.revision.key}_${ancestor.literalID}`}>
                    親: [{ancestor.literalID}]{ancestor.nameJa}
                  </li>
                ))}
                {(card.children || []).map(child => (
                  <li key={`${child.revision.key}_${child.literalID}`}>
                    子: [{child.literalID}]{child.nameJa}
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
