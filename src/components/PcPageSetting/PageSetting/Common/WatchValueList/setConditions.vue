<template>
  <el-button type="primary" :icon="Plus" circle @click.stop="handleAdd()" />
  <div class="flex mb10" v-for="(_item, index) in modelValue" :key="index">
    <GetPageData
      :props="{ checkStrictly: true }"
      v-model="modelValue[index]"
      :showHandle="false"
    />
    <el-button
      type="danger"
      :icon="Delete"
      circle
      @click.stop="handleDelete(index)"
    />
  </div>
</template>

<script setup lang="ts">
import GetPageData from '../setData/getPageData.vue'
import { Delete, Plus } from '@element-plus/icons-vue'
const props = defineProps(['modelValue'])

const handleAdd = () => {
  props.modelValue.push('')
}
const handleDelete = (index: number) => {
  props.modelValue.splice(index, 1)
}
</script>
<style lang="scss" scoped></style>
