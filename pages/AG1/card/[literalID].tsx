import type { NextPage, GetStaticPaths, InferGetStaticPropsType, GetStaticPropsContext } from 'next'
import { Fragment } from 'react'
import { Container } from 'react-bootstrap'
import Headline1 from '../../../components/common/Headline/Headline1'
import Headline2 from '../../../components/common/Headline/Headline2'
import { clientForStaticGeneration } from '../../../libs/graphql/ClientForStaticGeneration'

export const getStaticPaths: GetStaticPaths = async () => {
  const cardLiteralIDs = await clientForStaticGeneration.getCardLiteralIDsByRevision('1')
  if (cardLiteralIDs === undefined) {
    return {
      paths: [],
      fallback: false,
    }
  }
  const paths = cardLiteralIDs.map(literalID => `/AG1/card/${literalID}`)
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async (context: GetStaticPropsContext<{ literalID: string }>) => {
  const literalID = context.params?.literalID
  if (literalID === undefined) {
    return {
      notFound: true,
    }
  }

  const card = await clientForStaticGeneration.getCardByRevisionAndLiteralID('1', literalID)
  return {
    props: {
      card,
    },
  }
}

const Ag1CardPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ card }) => (
  <>
    <Container>
      <Headline1>{card?.nameJa || card?.nameEn || 'NO NAME'}</Headline1>
      <dl>
        <dt>種類</dt>
        <dd>{card?.cardType.nameJa}</dd>
        {card?.prerequisite && (
          <>
            <dt>前提</dt>
            <dd>{card.prerequisite}</dd>
          </>
        )}
        {card?.cost && (
          <>
            <dt>コスト</dt>
            <dd>{card.cost}</dd>
          </>
        )}
        {card?.victoryPoint && (
          <>
            <dt>カード点</dt>
            <dd>{card.victoryPoint}点</dd>
          </>
        )}
        {card?.specialVictoryPoint && (
          <>
            <dt>カード点</dt>
            <dd>{card.specialVictoryPoint}点</dd>
          </>
        )}
        {card?.description && (
          <>
            <dt>テキスト</dt>
            <dd>{card.description}</dd>
          </>
        )}
      </dl>
      <Headline2>メタ情報</Headline2>
    </Container>
  </>
)

export default Ag1CardPage
