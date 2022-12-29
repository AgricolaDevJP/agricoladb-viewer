import type { FC, ReactNode } from 'react'

type Headline2Props = Readonly<{
  children: ReactNode
}>

const Headline2: FC<Headline2Props> = ({ children }) => (
  <h2 className="mt-4 text-secondary">{children}</h2>
)

export default Headline2
