<template>
  <FormCreate v-model="valueData" :formItemList="formItemList"></FormCreate>
</template>

<script setup>
import { computed } from 'vue'
import FormCreate from '@/components/FormCreate/index.vue'
import { formList } from './data.js'
import { usePageSetupStore } from '@/store'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
const pageSetupStore = usePageSetupStore()

/**
 * 值
 */
const valueData = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  }
})

/**
 * 表单配置
 */
const formItemList = computed(() => formList(pageSetupStore.itemsMap))
</script>
<style lang="scss" scoped></style>
