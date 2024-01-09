import partytown from '@astrojs/partytown'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import purgecss from 'astro-purgecss'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    sitemap(),
    partytown({
      config: {
        forward: ['dataLayer.push'],
      },
    }),
    purgecss({
      safelist: ['btn-info'],
    }),
  ],
  vite: {
    ssr: {
      noExternal: ['react-icons'],
    },
  },
  site: 'https://db.agricolajp.dev',
})
