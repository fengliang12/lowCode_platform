<template>
  <div class="style-setting">
    <el-form>
      <slot></slot>
    </el-form>
    <FormCreate v-model="styleData" :formList="formItemList"> </FormCreate>
    <StyleConditions
      v-model="conditionStyles"
      :formItemList="formItemList"
    ></StyleConditions>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { formList } from './data'
import StyleConditions from '../styleConditions/index.vue'
import FormCreate from '@/components/FormCreate/index.vue'

const emit = defineEmits(['update:page', 'update:executionAndStyles'])
const props = defineProps({
  modelValue: {
    type: Object,
    default: null,
  },
  executionAndStyles: {
    type: Array,
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
    emit('update:page', val)
  },
})

const conditionStyles = computed({
  get() {
    return props.executionAndStyles
  },
  set(val) {
    console.log('val1', val)
    emit('update:executionAndStyles', val)
  },
})

/**
 * 获取动态表单配置列表
 */
const formItemList = computed(() => {
  let arr: any[] = []
  let componentsList = formList({ ratio: props.ratio, value: props.modelValue })
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
  if (props.ratio) {
    arr.forEach((item) => {
      if (item.field === 'width') {
        item.button = '根据高度设置'
      }
      if (item.field === 'height') {
        item.button = '根据宽度设置'
      }
    })
  }
  return arr
})
</script>
<style lang="scss" scoped>
.style-setting {
  padding-bottom: 50px;
}
</style>
../styleConditions/index.vue
