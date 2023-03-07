<template>
  <div>111</div>
</template>

<script setup>
import { computed, watch, ref } from 'vue'
import { usePageSetupStore } from '@/store'
import Draggable from 'vuedraggable'
import { ElMessageBox, ElMessage } from 'element-plus'
import { handleCopyEvent } from '../../Handle/handleCopyEvent'

import {
  EventList,
  PageHotOperation,
  assignmentOption,
  customEventList,
  authEventList,
  moduleOperationList,
  moduleCarouselOperationList,
  moduleVideoOperationList,
  gridLotteryOperationList,
  moduleOperationListKey,
  moduleOperationListSelect,
} from './data'

import paramsObj from './common/paramsObj'
import { animateList } from './common/animate'

import { setParams, getParams } from '../../Handle/handleParams'
import PagepathCascader from '../pagePathCascader/index.vue'
import SubscribeNoticesSelect from '../subscribeNoticesSelect/index.vue'
import FissionImage from '../fissionImage/index.vue'
import SetData from '../setData/index.vue'
import EditParameters from '../editParameters/index.vue'
import ConditionsForExecution from '../conditionsForExecution/index.vue'
import createForm from '../createForm/index.vue'
import api from '@/api/axios.ts'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
const pageSetupStore = usePageSetupStore()

/**
 * hotOperations
 */
const hotOperations = computed({
  get() {
    if (!props.modelValue?.length) {
      console.log(11)
      emit('update:modelValue', [])
    }
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  },
})

console.log(hotOperations.value)

/**
 * 添加事件
 */
const handleAddEvent = () => {
  if (
    !hotOperations.value?.every(
      (elem) =>
        !!elem.operationUrl ||
        elem.subscribeNotices.length ||
        elem?.imageSetting?.imgUrl,
    )
  ) {
    ElMessage.error('请先输入内容')
    return
  }
  hotOperations.value.push(new PageHotOperation())
}

watch(hotOperations.value, (val) => {
  // 如果数量为零，默认添加一个
  console.log(22, val)
  // if (val.length === 0) {
  //   console.log(22)
  //   hotOperations.value.push(new PageHotOperation())
  // }
})
</script>
<style lang="scss" scoped>
:deep(.el-input) {
  width: auto;
}
.el-form-item {
  display: block;
}
.eventItem {
  width: 100%;
  display: flex;
  align-items: center;
}
.draggable-move-icon {
  height: 32px;
}
</style>
