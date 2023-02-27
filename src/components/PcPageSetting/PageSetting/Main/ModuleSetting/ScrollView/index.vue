<template>
  <FormCreate v-model="valueData" :formItemList="formItemList"></FormCreate>
</template>

<script setup>
import { reactive, computed } from 'vue'
import FormCreate from '@/components/FormCreate/index.vue'
import { formList } from './data.js'
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({})
  },
  moduleSettings: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:modelValue'])

/**
 * 值
 */
const valueData = computed({
  get() {
    console.log(props.modelValue)
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  }
})

/**
 * 表单列表
 */
const formItemList = reactive(formList(props.moduleSettings))
</script>
<style lang="scss" scoped></style>
