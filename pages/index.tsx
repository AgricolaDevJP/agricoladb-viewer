import type { NextPage } from 'next'
import Link from 'next/link'
import { Container } from 'react-bootstrap'
import Headline2 from '../components/common/Headline/Headline2'
import ChangeLogsList from '../components/pages/index/ChangeLogsList'
import { changeLogs } from '../libs/changeLogs'

const IndexPage: NextPage = () => {
  return (
    <>
      <Container>
        <div className="bg-light p-4 p-sm-5 my-4 rounded">
          <h1 className="display-3">AgricolaDB</h1>
          <p className="lead">Agricola Database for Japanese</p>
        </div>
        <p>
          ボードゲーム「アグリコラ」に関する情報をまとめた
          Webサイトです。製品版の全てのカードを掲載する予定です。
        </p>
        <p>
          日本語版が発売されていないものについては、本サイト製作者の Arthur
          が翻訳した内容を掲載しています。（※翻訳ルールについては、
          <Link href="/translation-rule">「翻訳ルール」</Link>
          ページをご覧ください。）また、日本語版が発売されているものでも、エラッタを適用するなどして、製品版と異なる内容を掲載しているものがあります。
        </p>
        <Headline2>更新履歴</Headline2>
        <ChangeLogsList logs={changeLogs} />
      </Container>
    </>
  )
}

export default IndexPage
