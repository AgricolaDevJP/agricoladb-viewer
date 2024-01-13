import '@fontsource/noto-sans-jp/'
import type { APIContext } from 'astro'
import { GraphQLClient } from 'graphql-request'
import fs from 'node:fs/promises'
import satori from 'satori'
import sharp from 'sharp'

import CardOgImage from '@/components/pages/card/CardOgImage'
import { getSdk } from '@/libs/api/generated'
import { revisionKeys } from '@/libs/domain/Revision'
import { isNonNullable } from '@/libs/utils/types'

export async function getStaticPaths() {
  const client = new GraphQLClient('http://localhost:8000/graphql')
  const sdk = getSdk(client)
  return (
    await Promise.all(
      revisionKeys.map(async revisionKey => {
        const res = await sdk.GetCardsDetailByRevision({ revisionKey })
        const cards = res.cards?.edges?.map(e => e?.node).filter(isNonNullable) ?? []
        return cards.map(card => ({
          params: {
            revisionKey,
            literalID: card.literalID,
          },
          props: {
            card,
          },
        }))
      }),
    )
  ).flat()
}

export async function GET({ props }: APIContext) {
  const notoSansData = await fs.readFile('./src/fonts/NotoSans/NotoSans-Bold.ttf')
  const notoSansJpData = await fs.readFile('./src/fonts/NotoSansJP/NotoSansJP-Bold.ttf')
  const notoEmojiData = await fs.readFile('./src/fonts/NotoEmoji/NotoEmoji-Bold.ttf')
  const svg = await satori(CardOgImage({ card: props.card }), {
    width: 800,
    height: 418,
    fonts: [
      {
        name: 'Noto Sans JP',
        data: notoSansJpData,
        style: 'normal',
      },
      {
        name: 'Noto Sans',
        data: notoSansData,
        style: 'normal',
      },
      {
        name: 'Noto Emoji',
        data: notoEmojiData,
        style: 'normal',
      },
    ],
  })
  const body = await sharp(Buffer.from(svg)).png().toBuffer()
  return new Response(body)
}
