export type UnwrapArray<T> = T extends Array<infer R> ? R : never

export const nonNullableFilter = <T>(value: T): value is NonNullable<T> =>
  value !== null && value !== undefined
