import { parseISO } from 'date-fns'

export type ChangeLog = Readonly<{
  id: number
  timestamp: Date
  description: string
}>

export const changeLogs: readonly ChangeLog[] = [
  {
    id: 1,
    timestamp: parseISO('2021-01-29'),
    description: 'AgricolaDB を公開しました',
  },
  {
    id: 2,
    timestamp: parseISO('2021-03-10'),
    description: 'リバイズドエディションのカードを追加しました',
  },
  {
    id: 3,
    timestamp: parseISO('2022-03-03'),
    description: 'コルバリウスデッキの情報を日本語版に準拠したものに更新しました',
  },
  {
    id: 4,
    timestamp: parseISO('2022-08-18'),
    description:
      '泥沼からの出発（リバイズド）の情報を日本語版に準拠したものに更新しました。Consul Dirigens デッキのカードを追加しました',
  },
  {
    id: 5,
    timestamp: parseISO('2023-01-01'),
    description: 'AgricolaDB および AgricolaDB API をリニューアルしました',
  },
] as const
