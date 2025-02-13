import { build, defineConfig } from "vite"
import { createHtmlPlugin } from 'vite-plugin-html';

const config1 = defineConfig({
  define:{
    _APP_COLOR_: JSON.stringify('default'),//颜色
    _APP_HISTORY_: JSON.stringify('1'),//颜色
    _APP_POSTURL_: JSON.stringify('https://hash-api.888bbm.com/api'),
  },
  build: {
    outDir: 'dist1', //打包后文件名
  },
  plugins:[
    createHtmlPlugin({
      inject: {
        data: {
          appColor: 'black',
          env: '',
        }
      }
    }),
  ]
});
await build(config1)