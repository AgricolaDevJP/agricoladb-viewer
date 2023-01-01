import type { GetCardsDetailByRevisionQuery } from './generated'
import type { UnwrapArray } from '../utils/types'
import { GraphQLClient } from 'graphql-request'
import { nonNullableFilter } from '../utils/types'
import { getSdk } from './generated'

const revisionIDs = ['1', '2'] as const
type RevisionID = typeof revisionIDs[number]

export type CardDetail = Readonly<
  NonNullable<
    NonNullable<UnwrapArray<NonNullable<GetCardsDetailByRevisionQuery['cards']['edges']>>>['node']
  >
>
type CardsDetailMap = Record<string, CardDetail>

class ClientForStaticGeneration {
  private sdk
  private cardsCache: { [s in RevisionID]: CardsDetailMap | undefined }
  private cardLiteralIDsCache: { [s in RevisionID]: string[] | undefined }

  constructor() {
    const client = new GraphQLClient('http://localhost:8080/graphql')
    const sdk = getSdk(client)
    this.sdk = sdk
    this.cardsCache = {
      '1': undefined,
      '2': undefined,
    }
    this.cardLiteralIDsCache = {
      '1': undefined,
      '2': undefined,
    }
  }

  async getCardByRevisionAndLiteralID(
    revisionID: RevisionID,
    literalID: string,
  ): Promise<CardDetail | undefined> {
    if (this.cardsCache[revisionID] === undefined) {
      await this.fetchAllCardsByRevisionID(revisionID)
    }
    return this.cardsCache[revisionID]?.[literalID]
  }

  async getCardLiteralIDsByRevision(
    revisionID: RevisionID,
  ): Promise<Readonly<string[]> | undefined> {
    if (this.cardLiteralIDsCache[revisionID] === undefined) {
      await this.fetchAllCardsByRevisionID(revisionID)
    }
    return this.cardLiteralIDsCache[revisionID]
  }

  private async fetchAllCardsByRevisionID(revisionID: RevisionID) {
    const res = await this.sdk.GetCardsDetailByRevision({
      revisionID,
    })
    const cards = res.cards?.edges?.map(e => e?.node).filter(nonNullableFilter) || []
    const cardLiteralIDs = cards.map(card => card.literalID)
    const cardsMap = cards.reduce((map, card) => {
      map[card.literalID] = card
      return map
    }, {} as CardsDetailMap)
    this.cardsCache[revisionID] = cardsMap
    this.cardLiteralIDsCache[revisionID] = cardLiteralIDs
  }
}

export const clientForStaticGeneration = Object.freeze(new ClientForStaticGeneration())
