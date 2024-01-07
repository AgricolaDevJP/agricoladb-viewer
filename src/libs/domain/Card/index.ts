import type { UnwrapArray } from '@/libs/utils/types'

import type { GetCardsDetailByRevisionQuery, GetCardsListQuery } from '../../api/generated'

export type CardDetail = Readonly<
  NonNullable<
    NonNullable<UnwrapArray<NonNullable<GetCardsDetailByRevisionQuery['cards']['edges']>>>['node']
  >
>

export type CardSummary = Readonly<
  NonNullable<NonNullable<UnwrapArray<NonNullable<GetCardsListQuery['cards']['edges']>>>['node']>
>
