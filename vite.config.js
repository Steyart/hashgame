import { fileURLToPath, URL } from 'node:url'
/** @type {import('tailwindcss').Config} */
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
// https://vite.dev/config/

export default defineConfig(()=>{
  return {
    define: {
      _APP_COLOR_: JSON.stringify('bule')
    },
    plugins: [
      vue(),
    ],
    server: {
      proxy: {
        // 代理路径
        '/api': {
          // 目标地址
          target: 'http://hashGame.com/', //206.238.68.200
          // 是否改变请求的源地址，这里设置为 true，表示强制使用绝对路径
          changeOrigin: true,
          // 路径重写规则，这里将 /api 开头的请求路径替换为空字符串，即去掉 /api 前缀
          rewrite: (path) => path.replace(/^\//, '')
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
