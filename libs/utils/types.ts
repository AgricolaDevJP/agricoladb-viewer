export type UnwrapArray<T> = T extends Array<infer R> ? R : never

export const isNonNullable = <T>(value: T): value is NonNullable<T> =>
  value !== null && value !== undefined

export const unreachable = (_value: never): never => {
  throw new Error('unreachable')
}
