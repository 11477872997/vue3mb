import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
// 打包优化
import viteCompression from 'vite-plugin-compression'
// 按需引入 ui 和图标
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// 重点来了，官网是真坑，按需引入的icon不给示例。兜兜转转从按需导入icon的仓库代码里看到了i-ep前缀的写法。
{/* <i-ep-edit></i-ep-edit>  */}
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'


// 按需自动加载api插件
import AutoImport from "unplugin-auto-import/vite";

function pathResolve(dir) {
  return resolve(__dirname, ".", dir);
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ["vue", "vue-router"],
      resolvers: [
        ElementPlusResolver(),
         // 自动导入图标组件
         IconsResolver({
          prefix: 'Icon',
      }),
      ],
    }),
    Components({
      resolvers: [
        ElementPlusResolver(),
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ['ep'],
      }),
      ],
    }),
    Icons({
      autoInstall: true,
  }),
    viteCompression({
      threshold: 10240 // 对大于 1mb 的文件进行压缩
    })
  ],
  server: {
    host: '0.0.0.0',
    proxy: {
      '/api': {
        // target: 'http://jsonplaceholder.typicode.com',
        // 测试
        target: 'http://192.168.1.7/xr-api/',
        // 正式
        // target: 'www.falaedu.com/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/xr-api/, '')
      },
    },
  },
  resolve: {
    alias: {
      '@': pathResolve("src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@/style/index.scss" as *;'
      }
    }
  }
})
