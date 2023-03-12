// 批量全局注册组件：https://juejin.cn/post/7162741138883870733
let files = import.meta.globEager('./**/*.vue')
export default {
  install(app) {
    Object.keys(files).forEach((key) => {
      let name = key.split('/')[1]
      let value = files[key]
      app.component(name, value.default)
    })
  },
}
