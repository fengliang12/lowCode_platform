<template>
  <div>
    <el-form>
      <slot></slot>
    </el-form>
    <FormCreate v-model="styleData" :formList="formItemList"> </FormCreate>
  </div>
</template>

<script setup>
import { watch, computed, reactive } from 'vue'
import { formList } from './data'
import FormCreate from '@/components/FormCreate/index.vue'
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: Object,
    default: null,
  },
  font: {
    type: Boolean,
    default: true,
  },
  box: {
    type: Boolean,
    default: true,
  },
  bg: {
    type: Boolean,
    default: true,
  },
  flex: {
    type: Boolean,
    default: true,
  },
  custom: {
    type: Boolean,
    default: true,
  },
  ratio: {
    type: Number,
    default: 0,
  },
})

/**
 * 初始化styleData
 */
const styleData = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  },
})

/**
 * 获取动态表单配置列表
 */
const componentsList = reactive(
  formList({ ratio: props.ratio, value: styleData.value }),
)
const formItemList = computed(() => {
  let arr = []
  if (props.box) {
    arr = arr.concat(componentsList.boxList)
  }
  if (props.bg) {
    arr = arr.concat(componentsList.backgroundList)
  }
  if (props.font) {
    arr = arr.concat(componentsList.fontList)
  }
  if (props.flex) {
    arr = arr.concat(componentsList.flexList)
  }
  if (props.custom) {
    arr = arr.concat(componentsList.customList)
  }
  return arr
})

/**
 * 监听ratio
 * 如果有ratio,那么宽高后面会出现高度\宽度动态设置按钮
 */
watch(
  () => props.ratio,
  (val) => {
    if (!val) return
    componentsList.boxList.forEach((item) => {
      if (item.key === 'width') {
        item.button =
          styleData.value.hideAutoRatio === null ? '根据高度设置' : ''
      }
      if (item.key === 'height') {
        item.button =
          styleData.value.hideAutoRatio === null ? '根据宽度设置' : ''
      }
    })
    const hideAutoRatioIndex = componentsList.boxList.findIndex(
      (elem) => elem.key === 'hideAutoRatio',
    )
    const findIndex = componentsList.boxList.findIndex(
      (elem) => elem.key === 'width',
    )
    if (findIndex !== -1 && hideAutoRatioIndex === -1) {
      componentsList.boxList.push({
        divider: '自动比例',
        field: 'hideAutoRatio',
        type: 'el-select',
        title: '自动比例',
        defaultValue: null,
        options: [
          {
            label: '开启',
            value: null,
          },
          {
            label: '关闭',
            value: false,
          },
        ],
      })
    }
  },
  { immediate: true },
)

/**
 * 监听hideAutoRatio,
 * 关闭清除宽高后台动态设置按钮
 */
watch(
  () => styleData.value.hideAutoRatio,
  (val) => {
    componentsList.boxList = componentsList.boxList.map((item) => {
      if (item.key === 'width') {
        item.button = props.ratio && val === null ? '根据宽度设置' : ''
      }
      if (item.key === 'height') {
        item.button = props.ratio && val === null ? '根据宽度设置' : ''
      }
      return item
    })
  },
  { immediate: true },
)
</script>
<style lang="scss" scoped></style>
