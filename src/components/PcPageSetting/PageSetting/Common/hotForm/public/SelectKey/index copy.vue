<template>
  <el-row>
    <el-cascader
      class="mr10"
      :value="dPageShowDataValue(modelValue)"
      :options="pageSetupStore.pageNewParams"
      @change="cascaderChange"
      :props="{ value: 'key', children: 'child', label: 'key' }"
      :show-all-levels="false"
      clearable
      :key="cascaderId"
    >
    </el-cascader>
  </el-row>
</template>

<script setup>
import { ref } from 'vue'
import { dPageShowDataValue } from '../../../../Handle/filters'
import { usePageSetupStore } from '@/store/index.js'

defineProps['modelValue']
const emit = defineEmits(['update:modelValue'])

const pageSetupStore = usePageSetupStore()
const cascaderId = ref(0)

/**
 * 级联选择
 */
const cascaderChange = (val) => {
  emit('update:modelValue', val.join('.'))
}
</script>
<style lang="scss" scoped></style>
