<template>
  <el-row>
    <SetData
      v-for="(item, index) in modelValue"
      class="mb10"
      :key="item.key"
      v-model="modelValue[index].pageValue"
    >
      <template #table>
        <div class="mr10">{{ labelMap[key] || key }}:</div>
      </template>
    </SetData>
  </el-row>
</template>

<script setup>
import SetData from '../../../setData/index.vue'
defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  labelMap: {
    type: Object,
    default: () => ({}),
  },
})
</script>
<style lang="scss" scoped></style>
