import type { FC } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Navbar, Nav, Container } from 'react-bootstrap'

const HeaderNav: FC = () => {
  const router = useRouter()
  const activeKey = router.pathname

  return (
    <Nav className="mr-auto" activeKey={activeKey}>
      <Link href="/" legacyBehavior passHref>
        <Nav.Link eventKey="/">Home</Nav.Link>
      </Link>
      <Link href="/about" legacyBehavior passHref>
        <Nav.Link eventKey="/about">本サイトについて</Nav.Link>
      </Link>
      <Link href="/graphql-api" legacyBehavior passHref>
        <Nav.Link eventKey="/graphql-api">GraphQL API</Nav.Link>
      </Link>
    </Nav>
  )
}

const Header: FC = () => (
  <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
    <Container fluid>
      <Link href="/" legacyBehavior passHref>
        <Navbar.Brand>AgricolaDB</Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="navbar_nav" />
      <Navbar.Collapse id="navbar_nav">{<HeaderNav />}</Navbar.Collapse>
    </Container>
  </Navbar>
)

export default Header
