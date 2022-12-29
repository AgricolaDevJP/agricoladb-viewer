import type { FC } from 'react'
import { Html, Head, Main, NextScript } from 'next/document'

const Document: FC = () => {
  return (
    <Html lang="ja">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document
