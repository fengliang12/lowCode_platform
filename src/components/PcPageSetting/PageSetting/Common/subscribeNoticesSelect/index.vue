<template>
  <el-select
    v-model="subscribeNotices"
    :multiple-limit="3"
    multiple
    clearable
    filterable
    value-key="templateId"
  >
    <el-option
      v-for="(item, index) in messageTemplateList"
      :key="index"
      :label="item.title"
      :value="item"
    />
  </el-select>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue'
import api from '@/api/axios.ts'
const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
})
const emit = defineEmits(['update:modelValue'])

const subscribeNotices = computed({
  get() {
    if (!props.modelValue) {
      return emit('update:modelValue', [])
    }
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  },
})

onMounted(() => {
  getTemplateList()
})

/**
 * 订阅消息数据
 */
const messageTemplateList = ref([])
const getTemplateList = async () => {
  const result = await api.constantApi.getTemplateList({
    page: 0,
    size: 1000,
    expression: '',
    expArr: [],
  })
  messageTemplateList.value = result.map((elem) => {
    elem.templateCode = elem.id
    return elem
  })
}
</script>
<style lang="scss" scoped></style>
