import type { FC } from 'react'
import { GoReport } from 'react-icons/go'

import type { CardDetail } from '@/libs/domain/Card'
import type { RevisionKey } from '@/libs/domain/Revision'

type CardReportErrorLink = Readonly<{
  card: Pick<CardDetail, 'literalID' | 'nameJa'>
  revisionKey: RevisionKey
}>

const CardReportErrorLink: FC<CardReportErrorLink> = ({ card, revisionKey }) => (
  <p>
    <a
      href={`https://docs.google.com/forms/d/e/1FAIpQLScV13e9mlYgYQnB9EaukWTEw_wNYUc8lAENtZ5tX9QT8sOXlA/viewform?usp=pp_url&entry.894597276=${revisionKey}&entry.1300505033=${
        card.literalID
      }&entry.1093933164=${card.nameJa ?? ''}`}
    >
      <GoReport />
      カード情報の誤りを報告する
    </a>
  </p>
)

export default CardReportErrorLink
