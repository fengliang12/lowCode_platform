import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3050,
    proxy: {
      '/api': {
        // target: 'http://106.52.235.252:8101/',
        target: 'http://127.0.0.1:8101/',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      assets: path.resolve(__dirname, './src/assets'),
      views: path.resolve(__dirname, './src/views'),
      // 这里不能@,还是要写src
      components: path.resolve(__dirname, './src/components'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
      @use "assets/css/variable.scss" as *;
      `,
      },
    },
  },
})
