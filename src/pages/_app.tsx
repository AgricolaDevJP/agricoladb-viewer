import type { FC } from 'react'
import type { AppProps } from 'next/app'
import { Noto_Sans_JP } from '@next/font/google'
import Layout from '../components/Layout'
import '../styles/app.scss'

const NotoSansJP = Noto_Sans_JP({ weight: ['400'], subsets: ['japanese', 'latin'] })

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <style jsx global>{`
        :root {
          --bs-font-sans-serif: ${NotoSansJP.style.fontFamily};
        }
      `}</style>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default App
