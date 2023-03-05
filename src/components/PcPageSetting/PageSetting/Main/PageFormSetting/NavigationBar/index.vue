<template>
  <FormCreate v-model="navigationBarData" :formList="formList"></FormCreate>
</template>

<script setup>
import { reactive } from 'vue'
import FormCreate from '@/components/formCreate/index.vue'
import { computed } from 'vue'
import NavigationBar, { componentsList } from './data'
const emit = defineEmits(['update:modelValue'])
const props = defineProps(['modelValue'])

const navigationBarData = computed({
  get() {
    if (!props.modelValue) {
      emit('update:modelValue', new NavigationBar())
    }
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  },
})

/**
 * 动态组件列表
 */
const formList = reactive(componentsList())
</script>
<style lang="scss" scoped></style>
