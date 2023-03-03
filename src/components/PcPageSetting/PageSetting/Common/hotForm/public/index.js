import { defineAsyncComponent } from 'vue'
let files = import.meta.globEager('./**/*.vue')
export default {
  install(app) {
    console.log('1111', app)
    Object.keys(files).forEach((key) => {
      let name = key.split('/')[1]
      let value = files[key]
      console.log(name, value)
      app.component(name, defineAsyncComponent(value))
    })
  },
}
