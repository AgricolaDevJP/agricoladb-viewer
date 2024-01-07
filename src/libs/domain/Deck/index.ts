import type { GetDecksAndProductsListQuery } from '@/libs/api/generated'
import type { UnwrapArray } from '@/libs/utils/types'

export type DeckSummary = UnwrapArray<GetDecksAndProductsListQuery['decks']>
