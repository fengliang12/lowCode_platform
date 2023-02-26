<template>
  <el-collapse v-model="active" :accordion="accordion" v-on="formItem.on">
    <template v-if="isArrayList">
      <el-collapse-item
        v-for="(collapse, index) in valueData"
        :key="index"
        :name="index"
        :title="getTitle(collapse, index)"
        :disabled="getDisabled(collapse, index)"
      >
        <FormItemList
          :formData="collapse"
          :formList="formItem.formList"
          :propKey="`${prop}.${index}`"
          :groupIndex="index"
        ></FormItemList>
      </el-collapse-item>
    </template>

    <el-collapse-item
      v-else
      :title="getTitle(valueData)"
      :disabled="getDisabled(valueData)"
    >
      <FormItemList
        :formData="valueData"
        :formList="formItem.formList"
        :propKey="prop"
      ></FormItemList>
    </el-collapse-item>
  </el-collapse>
</template>

<script setup lang="ts">
import { isFunction } from 'lodash'
import { computed, reactive, ref } from 'vue'
import FormItemList from '../formItemList/index.vue'

const props = defineProps<{
  formData: any
  formItem: FormItemType
  propKey: string
}>()

const prop = computed(() => {
  return props.propKey
    ? `${props.propKey}.${props.formItem.field}`
    : props.formItem.field
})

const valueData = computed({
  get() {
    return props.formData[props.formItem.field]
  },
  set(val) {
    props.formData[props.formItem.field] = val
  },
})

/**
 * 判断是不是数组
 */
const isArrayList = computed(() => {
  return Array.isArray(valueData.value)
})

/**
 * 手风琴效果
 */
const accordion = computed(() => {
  return props.formItem?.props?.accordion
})

const data = reactive<any>({
  activeName: 0,
  activeNames: [0],
})
/**
 * 当前激活的面板(如果是手风琴模式，绑定值类型需要为string，否则为array)
 */
const active = computed({
  get() {
    return accordion.value ? data.activeName : data.activeNames
  },
  set(value) {
    if (accordion.value) {
      data.activeName = value
    } else {
      data.activeNames = value
    }
  },
})

/**
 * 获取title
 * @param {*} row
 * @param {*} index
 */
const getTitle = (row: any, index?: number) => {
  if (isFunction(props.formItem.title)) {
    return props.formItem.title(row, index) || index
  }
  return index
}

/**
 * 获取disable
 * @param {*} row
 * @param {*} index
 */
const getDisabled = (row: any, index?: number) => {
  if (isFunction(props.formItem.props.disabled)) {
    return props.formItem?.props?.disabled(row, index) || index
  }
  return false
}
</script>
<style lang="scss" scoped></style>
