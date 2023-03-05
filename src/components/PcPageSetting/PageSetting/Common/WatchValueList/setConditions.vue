<template>
  <div class="flex mb10" v-for="(_item, index) in modelValue" :key="index">
    <GetPageData
      :props="{ checkStrictly: true }"
      v-model="modelValue[index]"
      :showHandle="false"
    />
    <i
      @click.stop="handleAdd()"
      class="el-icon-circle-plus-outline ml10 mt-1"
      title="添加参数"
    ></i>
    <i
      v-if="index > 0"
      class="el-icon-delete ml10 mt-1"
      title="删除参数"
      @click.stop="handleDelete(index)"
    ></i>
  </div>
</template>

<script setup lang="ts">
import GetPageData from '../setData/getPageData.vue'
const props = defineProps(['modelValue'])

const handleAdd = () => {
  props.modelValue.push('')
}
const handleDelete = (index: number) => {
  props.modelValue.splice(index, 1)
}
</script>
<style lang="scss" scoped></style>
