<template>
  <div v-for="(item, index) in groupData" :key="item.field">
    <FormItemList
      :formData="item"
      :formList="formItem.formList"
      :prop-key="`${prop}.${index}`"
      :groupIndex="index"
    ></FormItemList>
    <div class="operation_box">
      <el-button @click="deleteGroup(index)">删除</el-button>
      <el-button v-if="groupLength == index" @click="addGroup">添加</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getFormObject, handleData } from '../../utils'
import FormItemList from '../formItemList/index.vue'

const props = defineProps<{
  formData: any
  formItem: FormItemType
  propKey: string
}>()

const groupLength = computed(() => {
  return groupData.value.length - 1
})

/**
 * key
 */
const prop = computed(() => {
  return props.propKey
    ? `${props.propKey}.${props.formItem.field}`
    : props.formItem.field
})

/**
 * 数组值
 */
const groupData = computed({
  get() {
    return props.formData[props.formItem.field]
  },
  set(val) {
    props.formData[props.formItem.field] = val
  },
})

/**
 * 删除
 * @param index
 */
const deleteGroup = (index: number) => {
  groupData.value.splice(index, 1)
}

/**
 * 添加一个
 */
const addGroup = () => {
  if (!props.formItem.formList) return
  const defaultValue = handleData(
    getFormObject(props.formItem.formList),
    props.formItem.defaultValue?.[0],
  )

  groupData.value.push(defaultValue)
}
</script>

<style lang="scss" scoped></style>
