<template>
  <el-row>
    <SetData
      v-for="(item, index) in CascaderValue"
      class="mb10"
      :key="item.key"
      v-model="CascaderValue[index].pageValue"
    >
      <template #table>
        <div class="title">{{ labelMap[item.key] || item.key }}:</div>
      </template>
    </SetData>
  </el-row>
</template>

<script setup>
import SetData from '../../../setData/index.vue'
import { computed } from 'vue'
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  labelMap: {
    type: Object,
    default: () => ({}),
  },
})

const CascaderValue = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  },
})
</script>
<style lang="scss" scoped>
.title {
  width: 150px;
}
</style>
