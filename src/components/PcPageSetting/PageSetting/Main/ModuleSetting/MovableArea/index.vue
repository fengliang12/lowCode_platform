<template>
  <FormCreate v-model="valueData" :formList="formItemList"></FormCreate>
</template>

<script setup>
import { computed, reactive } from 'vue'
import FormCreate from '@/components/FormCreate/index.vue'
import { formList } from './data'

const props = defineProps(['modelValue'])
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
 * 表单配置
 */
const formItemList = reactive(formList())
</script>
<style lang="scss" scoped></style>
