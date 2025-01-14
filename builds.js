import { build } from "vite"

const config1 = {
  define:{
    _APP_COLOR_: JSON.stringify('default'),//颜色
    _APP_HISTORY_: 2,
  },
  build: {
    outDir: 'dist1', //打包后文件名
  },
}

await build(config1)