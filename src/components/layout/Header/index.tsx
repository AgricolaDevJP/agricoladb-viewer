import type { FC } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'

// TODO: activeKeyをパスから指定する
const HeaderNav: FC = () => {
  return (
    <Nav className="mr-auto" activeKey="/">
      <Nav.Link eventKey="/" href="/">
        Home
      </Nav.Link>
      <Nav.Link eventKey="/AG1/cards/" href="/AG1/cards/">
        カード一覧(AG1)
      </Nav.Link>
      <Nav.Link eventKey="/AG2/cards/" href="/AG2/cards/">
        カード一覧(AG2)
      </Nav.Link>
      <Nav.Link eventKey="/translation-rule/" href="/translation-rule/">
        翻訳ルール
      </Nav.Link>
      <Nav.Link eventKey="/about/" href="/about/">
        本サイトについて
      </Nav.Link>
      <Nav.Link eventKey="/graphql-api/" href="/graphql-api/">
        GraphQL API
      </Nav.Link>
    </Nav>
  )
}

const Header: FC = () => (
  <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark" fixed="top">
    <Container fluid>
      <Navbar.Brand href="/">AgricolaDB</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar_nav" />
      <Navbar.Collapse id="navbar_nav">
        <HeaderNav />
      </Navbar.Collapse>
    </Container>
  </Navbar>
)

export default Header
