<template>
  <el-row>
    <el-cascader
      class="mr10"
      :model-value="dPageShowDataValue(modelValue)"
      :options="pageSetupStore.pageNewParams"
      @change="cascaderChange"
      :props="{ value: 'key', children: 'child', label: 'key' }"
      :show-all-levels="false"
      clearable
    >
    </el-cascader>
  </el-row>
</template>

<script setup>
import { dPageShowDataValue } from '../../../../Handle/filters'
import { usePageSetupStore } from '@/store/pageSetupStore'
const pageSetupStore = usePageSetupStore()
const emit = defineEmits(['update:modelValue'])
defineProps(['modelValue'])

/**
 * 级联选择
 */
const cascaderChange = (val) => {
  emit('update:modelValue', val.join('.'))
}
</script>
<style lang="scss" scoped></style>
