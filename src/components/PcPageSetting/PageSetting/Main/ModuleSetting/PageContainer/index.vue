<template>
  <div>
    <FormCreate v-model="pageContainerData" :formList="formList"></FormCreate>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { formListFn } from './data'
import FormCreate from '@/components/FormCreate/index.vue'
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
  },
})

const pageContainerData = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  },
})

const formList = ref(formListFn())
</script>

<style lang="scss" scoped></style>
