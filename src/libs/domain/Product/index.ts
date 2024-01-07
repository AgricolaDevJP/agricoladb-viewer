import type { GetDecksAndProductsListQuery } from '@/libs/api/generated'
import type { UnwrapArray } from '@/libs/utils/types'

export type ProductSummary = UnwrapArray<GetDecksAndProductsListQuery['products']>
