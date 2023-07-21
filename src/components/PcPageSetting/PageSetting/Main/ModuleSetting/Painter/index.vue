<template>
  <FormCreate v-model="valueData.painter" :formList="formItemList"></FormCreate>
  <el-row>
    <el-button type="primary" @click="handleExport">JSON格式化预览</el-button>
  </el-row>
  <JsonEditor ref="jsonEditorRef" @confirm="createPageSetting"></JsonEditor>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import FormCreate from '@/components/FormCreate/index.vue'
import JsonEditor from '../../../Common/jsonEditor/index.vue'
import { formList } from './data.js'
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
  },
})

const emit = defineEmits(['update:modelValue'])
const formItemList = reactive(formList)

/**
 * 值
 */
const valueData = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  },
})

const jsonEditorRef = ref(null)
const handleExport = () => {
  const json = getJson()
  jsonEditorRef.value.show(json)
}

/**
 * 获取每个子组件样式
 * @param {*} pageStyle
 */
const convertToPainterStyle = (pageStyle) => {
  let result = {}
  for (let key of Object.keys(pageStyle)) {
    const val = pageStyle[key]
    let customStyle
    if (val) {
      switch (key) {
        case 'justifyContent':
          result['textAlign'] = val
          break
        case 'custom':
          customStyle = getCustomerStyleObj(pageStyle.custom)
          result = { ...result, ...customStyle }
          break
        case 'zIndex':
          result[key] = val
          break
        default:
          if (typeof val === 'number') {
            result[key] = val + 'rpx'
          } else {
            result[key] = val
          }
      }
    }
  }
  return result
}

/**
 * 转换自定义样式
 * @param {*} str
 */
const getCustomerStyleObj = (str) => {
  if (!str) return
  const arr = str.split(';')
  const obj = {}
  arr.forEach((item) => {
    const [prop, val] = item.split(':')
    if (prop && val) {
      return (obj[prop] = val.trim())
    }
  })
  return obj
}

/**
 * 将moduleSetting转未json格式
 */
const getJson = () => {
  let { moduleSettings, pageStyle } = valueData.value
  const { backgroundImage, backgroundColor, width, height, borderRadius } =
    pageStyle
  const background = backgroundImage || backgroundColor

  const views = moduleSettings
    .map((item) => {
      const { moduleType, pageStyle, imageSetting, pageValue } = item
      // 获取页面值
      const pageValueData = pageValue?.value || ''
      let imgUrl
      switch (moduleType) {
        case 'text':
          return {
            type: moduleType,
            text: pageValueData,
            css: {
              ...convertToPainterStyle(pageStyle),
            },
          }
        case 'hot':
          imgUrl = imageSetting.imgUrl
          return {
            type: 'image',
            url: pageValueData || imgUrl,
            css: {
              ...convertToPainterStyle(pageStyle),
            },
          }
        default:
          return
      }
    })
    .filter((item) => item)

  return {
    background,
    width: width + 'rpx',
    height: height + 'rpx',
    borderRadius: borderRadius + 'rpx',
    views,
  }
}

const createPageSetting = () => {}
</script>
<style lang="scss" scoped></style>
