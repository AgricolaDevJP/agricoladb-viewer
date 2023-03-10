import type { NextPage } from 'next'
import { Container } from 'react-bootstrap'
import Headline1 from '../../components/common/Headline/Headline1'
import Headline2 from '../../components/common/Headline/Headline2'

const GraphqlApiPage: NextPage = () => (
  <>
    <Container>
      <Headline1>GraphQL API</Headline1>
      <p>AgricolaDB は GraphQL 形式の API を提供しています。</p>
      <p>
        ※システム刷新に伴い、過去に提供していた REST API については提供終了させていただきました。
      </p>
      <Headline2>API 利用方法</Headline2>
      <p>
        <code>https://apiv2.db.buratsuki.page/query</code> エンドポイントに POST してください。
      </p>
      <pre>
        <code>&#123;&quot;query&quot;: &quot;::any_query::&quot;&#125;</code>
      </pre>
      <p>
        <a href="https://apiv2.db.buratsuki.page/">GraphQL Playground</a>{' '}
        を用意しているので、スキーマの確認や試験的なリクエスト送信にご利用ください。
      </p>
      <Headline2>API 利用規約</Headline2>
      <ol>
        <li>
          本 API
          を一般に公開する目的は以下に示す通りとしております。常識の範囲内でご利用いただき、目的外の利用はお控えください。
          <ul>
            <li>エラッタ情報の反映など、メンテナンスされたアグリコラの情報を共有するため</li>
            <li>拡張入りアグリコラの楽しさを広めるため</li>
            <li>アグリコラの戦術研究を補助するため</li>
            <li>アグリコラに関連するアプリケーション開発を促進するため</li>
          </ul>
        </li>
        <li>
          本 API で得られる情報は、Lookout Games・Z-man
          Games・株式会社ホビージャパンなど、製品版を発売している企業の著作物を引用、もしくは Arthur
          によって抄訳されたものとなります。本 API の商用利用はお控えください。
        </li>
        <li>
          利用者が開発したアプリケーションに組み込むなど、本 API
          に大量のリクエストを送信する場合には、あらかじめ Arthur
          にご相談ください。相談なき場合、リクエストをブロックする可能性があります。
        </li>
        <li>
          本 API
          の利用に関連して利用者もしくは第三者に生じた損害について、その賠償の責任を一切負いかねます。
        </li>
        <li>
          本 API を安定して運用できるよう努力をいたしますが、100% の稼働を保証しません。本 API
          は予告なくサービスを一時停止、終了することがございます。
        </li>
      </ol>
    </Container>
  </>
)

export default GraphqlApiPage
