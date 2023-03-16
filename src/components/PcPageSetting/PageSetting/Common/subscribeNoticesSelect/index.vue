<template>
  <el-select
    v-model="subscribeNotices"
    :multiple-limit="3"
    multiple
    clearable
    filterable
    value-key="templateId"
    class="ml10"
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
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
})

/**
 * 订阅消息
 */
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
  // 接口数据模拟
  const result = [
    {
      id: '8LQsjPJbKxMwnUGHBoKbCh',
      templateId: '7lNfgvXN8YG6in8upT4r0en4Zwvu9I3BOu0xLE-8Aic',
      templateType: 'receiveCouponSuccess',
      title: '朋友圈广告送券',
    },
    {
      id: '5Ur3rjrBbnG8QQcWXQz8qA',
      templateId: 'BMtPGR2VIDQ6Jlo2iJdOLcNtb_rHKXTzoAUrquGHTXQ',
      templateType: 'vend_machine_pickup',
      title: '自动贩卖机发送提货码',
    },
  ]
  messageTemplateList.value = result.map((elem) => {
    elem.templateCode = elem.id
    return elem
  })
}
</script>
<style lang="scss" scoped></style>
