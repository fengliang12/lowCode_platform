<template>
  <FormItemList
    :formData="objectValue"
    :formList="formItem.formList"
    :propKey="prop"
  ></FormItemList>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import FormItemList from '../formItemList/index.vue'
const props = defineProps<{
  formData: any
  formItem: FormCreate.FormItemType
  propKey: string
}>()

const objectValue = computed(() => {
  return props.formData[props.formItem.field]
})

const prop = computed(() => {
  return props.propKey
    ? `${props.propKey}.${props.formItem.field}`
    : props.formItem.field
})
</script>

<style lang="scss" scoped></style>
