<template>
  <div style="border: 1px solid #ccc;">
    <Toolbar
      style="border-bottom: 1px solid #ccc;"
      :editor="editorRef"
      :defaultConfig="state.toolbarConfig"
      :mode="state.mode"
    />
    <Editor
      style="overflow-y: hidden; height: 500px;"
      v-model="valueHtml"
      :defaultConfig="state.editorConfig"
      :mode="state.mode"
      @onCreated="handleCreated"
    />
  </div>
</template>

<script setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { onBeforeUnmount, reactive, shallowRef, computed } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { uploadFile } from '@/api/Upload/index'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

/**
 * html值
 */
const valueHtml = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  },
})

const state = reactive({
  toolbarConfig: {},
  editorConfig: {
    placeholder: '请输入内容...',
    MENU_CONF: {
      uploadImage: {
        // 自定义图片上传
        async customUpload(file, insertFn) {
          let form = new FormData()
          form.append('file', file)
          uploadFile(form).then((response) => {
            const url = response.data.data.url
            insertFn(url)
          })
        },
      },
    },
  },
  defaultHtml: props.modelValue,
  mode: 'default',
})

/**
 * 记录 editor 实例，重要！
 * @param {*} editor
 */
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})
</script>
<style lang="scss" scoped></style>
