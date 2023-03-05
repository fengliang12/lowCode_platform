import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import i18n from './i18n'
import { useButtonStore } from './store/useButtonStore'
import uploadFile from './components/upload'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(uploadFile)

app.use(createPinia()).use(router).use(ElementPlus).use(i18n).mount('#app')

// 按钮权限
const buttonStore = useButtonStore()
app.directive('btn', {
  //当元素挂在dom时候触发
  mounted(el, binding) {
    if (!buttonStore.buttonList.includes(binding.value)) {
      el.parentNode.removeChild(el)
    }
  },
})
