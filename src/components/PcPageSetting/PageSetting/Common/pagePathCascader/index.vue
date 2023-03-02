<template>
  <el-cascader
    ref="cascaderRef"
    v-model="operationUrl"
    class="ml10"
    :options="pagePathList"
    :show-all-levels="false"
    placeholder="请选择"
    clearable
    filterable
    :props="{ emitPath: false }"
    @change="handleChange"
  ></el-cascader>
</template>

<script setup>
import pagePathList from '@/components/Constant/pagePath'
import { computed, ref } from 'vue'
const emit = defineEmits(['update:modelValue', 'changeInfo'])
const props = defineProps(['modelValue'])

const operationUrl = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  },
})

/**
 * 选择结果
 * @param {*} value
 */
const cascaderRef = ref(null)
const handleChange = (value) => {
  operationUrl.value = value
  emit('changeInfo', cascaderRef.value.getCheckedNodes()[0].data)
}
</script>
<style lang="scss" scoped></style>
