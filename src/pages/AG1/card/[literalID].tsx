import type { NextPage, GetStaticPaths, InferGetStaticPropsType, GetStaticPropsContext } from 'next'
import { Container } from 'react-bootstrap'
import Headline2 from '../../../components/common/Headline/Headline2'
import CardDescriptionList from '../../../components/pages/card/CardDescriptionList'
import CardLiteralIDBadge from '../../../components/pages/card/CardLiteralIDBadge'
import CardMetaTable from '../../../components/pages/card/CardMetaTable'
import CardTitle from '../../../components/pages/card/CardTitle'
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

const Ag1CardPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ card }) =>
  card === undefined ? (
    <></>
  ) : (
    <>
      <Container>
        <CardTitle card={card}>
          <CardLiteralIDBadge card={card} />
        </CardTitle>
        <CardDescriptionList card={card} />
        <Headline2>メタ情報</Headline2>
        <CardMetaTable card={card} />
      </Container>
    </>
  )

export default Ag1CardPage
