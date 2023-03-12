import type { FC, ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'

type LayoutProps = Readonly<{
  children: ReactNode
}>

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="d-flex flex-column vh-100">
      <header>
        <Header />
      </header>
      <main>{children}</main>
      <footer className="footer mt-auto">
        <Footer />
      </footer>
    </div>
  )
}

export default Layout
