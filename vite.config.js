import tailwindcss from '@tailwindcss/vite'
import { fileRoutes } from 'filesystem-routing/vite'
import { defineConfig } from 'vite'
import solid from '@solidjs/vite-plugin'

export default defineConfig({
  plugins: [
    solid({ start: true, extensions: ['.jsx'] }), // add `ssr: true` for streaming SSR
    fileRoutes(),
    tailwindcss(),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
    assetsInlineLimit: 0,
  },
})
