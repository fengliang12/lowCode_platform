<template>
  <FormCreate v-model="valueData" :formItemList="formItemList"></FormCreate>
</template>

<script setup>
import { reactive, watch, computed } from 'vue'
import FormCreate from '@/components/FormCreate/index.vue'
import { formList } from './data.js'
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
  },
  strokeWidth: {
    type: Number,
    default: 0,
  },
  borderRadius: {
    type: Number,
    default: 0,
  },
  // 赛选可输入项
  filterList: {
    type: Array,
    default: () => [],
  },
  onLyFilter: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])

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
const formItemList = reactive(formList)

/**
 * 监听
 */
watch(
  [() => props.strokeWidth, () => props.borderRadius],
  ([newX, newY]) => {
    props.modelValue.strokeWidth = newX
    props.modelValue.borderRadius = newY
  },
  {
    immediate: true,
  },
)
</script>
<style lang="scss" scoped></style>
