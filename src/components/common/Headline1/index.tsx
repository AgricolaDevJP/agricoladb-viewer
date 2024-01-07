import type { FC, ReactNode } from 'react'

type Headline1Props = Readonly<{
  children: ReactNode
}>

const Headline1: FC<Headline1Props> = ({ children }) => (
  <h1 className="mt-4 text-primary">{children}</h1>
)

export default Headline1
