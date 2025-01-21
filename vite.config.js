import { fileURLToPath, URL } from 'node:url'
/** @type {import('tailwindcss').Config} */
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
// https://vite.dev/config/

export default defineConfig(() => {
  return {
    define: {
      _APP_COLOR_: JSON.stringify('default'),
      _APP_HISTORY_: 1,
      _APP_POSTURL_: JSON.stringify('https://hash-api.888bbm.com/api')
    },
    plugins: [
      vue(),
    ],
    server: {
      proxy: {
        '/api': {
          target: 'https://hash-api.888bbm.com/api', // http://192.168.0.7:8888/api
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
  }
})
