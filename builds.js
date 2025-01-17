import { build } from "vite"

const config1 = {
  define:{
    _APP_COLOR_: JSON.stringify('default'),//颜色
    _APP_HISTORY_: JSON.stringify('1'),//颜色
  },
  build: {
    outDir: 'dist', //打包后文件名
  },
}
const config2 = {
  define:{
    _APP_COLOR_: JSON.stringify('default'),//颜色
    _APP_HISTORY_: JSON.stringify('2'),//颜色
  },
  build: {
    outDir: 'dist1', //打包后文件名
  },
}
await build(config1)
await build(config2)