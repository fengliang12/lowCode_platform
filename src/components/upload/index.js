import upload from './upload.vue'

export default {
  install: function (Vue) {
    Vue.component('uploadFile', upload)
  },
}
