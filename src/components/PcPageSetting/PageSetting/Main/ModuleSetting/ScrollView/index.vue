<template>
  <FormCreate v-model="valueData" :formList="formItemList"></FormCreate>
</template>

<script setup>
import { reactive, computed } from 'vue'
import FormCreate from '@/components/FormCreate/index.vue'
import { formList } from './data.js'

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
  },
  moduleSettings: {
    type: Array,
    default: () => [],
  },
})

/**
 * 值
 */
const valueData = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  },
})

/**
 * 表单列表
 */
const formItemList = reactive(formList(props.moduleSettings))
</script>
<style lang="scss" scoped></style>
