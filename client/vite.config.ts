import { fileURLToPath, URL } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver({})],
      dts: '.local/auto-imports.d.ts',
    }),
    Components({
      resolvers: [ElementPlusResolver({})],
      dts: '.local/components.d.ts',
    }),
  ],
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./source', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {},
  },
  server: {
    host: '0.0.0.0',
  },
  envDir: './environments',
  envPrefix: '__',
})
