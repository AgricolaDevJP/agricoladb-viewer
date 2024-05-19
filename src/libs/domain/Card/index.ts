import type { UnwrapArray } from '@/libs/utils/types'

import type {
  GetCardsDetailByRevisionQuery,
  GetCardsListForPrintQuery,
  GetCardsListQuery,
} from '../../api/generated'

export type CardDetail = Readonly<
  NonNullable<
    NonNullable<UnwrapArray<NonNullable<GetCardsDetailByRevisionQuery['cards']['edges']>>>['node']
  >
>

export type CardSummary = Readonly<
  NonNullable<NonNullable<UnwrapArray<NonNullable<GetCardsListQuery['cards']['edges']>>>['node']>
>

export type CardForPrint = Readonly<
  NonNullable<
    NonNullable<UnwrapArray<NonNullable<GetCardsListForPrintQuery['cards']['edges']>>>['node']
  >
>
