<template>
  <FormCreate v-model="eventData" :formList="formComponentsList" />
</template>

<script setup lang="ts">
import FormCreate from '@/components/FormCreate/index.vue'
import { computed, ref } from 'vue'
import { EventList } from './data'
import { usePageSetupStore } from '@/store/pageSetupStore'
const pageSetupStore = usePageSetupStore()
const emits = defineEmits(['update:modelValue'])
const props = defineProps<{
  modelValue: any
}>()

const formComponentsList: any = computed(() => [
  {
    field: 'operationType',
    type: 'el-cascader',
    effect: {
      to: 'options',
      fetch: async () => {
        return new EventList().filter((elem) => {
          if (elem.value !== 'set_params') {
            return true
          }
          //如果有页面数据返回true
          return !!pageSetupStore?.pageNewParams?.length
        })
      },
    },
  },
])

const eventData = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emits('update:modelValue', val)
  },
})
</script>
<style lang="scss" scoped></style>
