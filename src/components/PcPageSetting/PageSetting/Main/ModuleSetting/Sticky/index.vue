<template>
  <div>
    <FormCreate v-model="stickyData" :formList="formList"></FormCreate>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { formListFn } from './data'
import FormCreate from '@/components/FormCreate/index.vue'

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
  },
})

const stickyData = computed({
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
