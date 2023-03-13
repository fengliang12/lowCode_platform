import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import pinia from '@/store/index'
import router from './router'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'
import i18n from './i18n'
import { useButtonStore } from './store/useButtonStore'
import uploadFile from './components/upload'
import attributeComponents from '@/components/PcPageSetting/PageSetting/Common/hotForm/public/index.js'
import PageSettingCommon from '@/components/PcPageSetting/PageSetting/Common/index.js'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'default-passive-events'

const app = createApp(App)

//将图标转为全局组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

//注册全局组件
app.use(uploadFile)
app.use(PageSettingCommon)
app.use(attributeComponents)

app
  .use(pinia)
  .use(router)
  .use(ElementPlus, { locale: zhCn })
  .use(i18n)
  .mount('#app')

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
