import type { FC, ReactNode } from 'react'

type Headline3Props = Readonly<{
  children: ReactNode
}>

const Headline3: FC<Headline3Props> = ({ children }) => (
  <h3 className="mt-3 text-dark">{children}</h3>
)

export default Headline3
