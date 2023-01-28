import { createI18n } from 'vue-i18n'
import CN from './ZH-CN/cn'
import EN from './en/en'
const message = {
  chs: {
    ...CN,
  },
  en: {
    ...EN,
  },
}

const getLang = () => {
  if (localStorage.getItem('lang')) {
    return localStorage.getItem('lang')
  } else {
    switch (navigator.language) {
      case 'zh-CN':
        localStorage.setItem('lang', 'chs')
        return 'chs'
      case 'en-US':
        localStorage.setItem('lang', 'en')
        return 'en'
    }
  }
}

const i18n = createI18n({
  locale: getLang() || 'chs', // set locale
  legacy: false, //支持compositionAp
  globalInjection: true, // 全局注册 $t方法
  messages: message,
})

export default i18n
