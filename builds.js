import { build } from "vite"

const config1 = {
  define:{
    _APP_COLOR_: JSON.stringify('default'),//颜色
    _APP_HISTORY_: 1,//颜色
    _APP_POSTURL_: JSON.stringify('https://hash-api.888bbm.com/api'),
  },
  build: {
    outDir: 'dist1', //打包后文件名
  },
}
const config2 = {
  define:{
    _APP_COLOR_: JSON.stringify('default'),//颜色
    _APP_HISTORY_: 2,//颜色
    _APP_POSTURL_: JSON.stringify('https://hash-api.hashgo888.com/api'),
  },
  build: {
    outDir: 'dist', //打包后文件名
  },
}
await build(config1)
await build(config2)