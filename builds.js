import { build } from "vite"

const config1 = {
  define:{
    _APP_COLOR_: JSON.stringify('bule'),//颜色
  },
  build: {
    outDir: 'dist1', //打包后文件名
  },
}

await build(config1)