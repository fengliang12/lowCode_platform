<template>
  <FormCreate
    v-model="eventData"
    :formList="formComponentsList"
    :formConfig="{ inline: true }"
  />
</template>

<script setup lang="ts">
import FormCreate from '@/components/FormCreate/index.vue'
import { computed, ref, reactive, inject } from 'vue'
import { EventList, PageHotOperation } from './data'
import { usePageSetupStore } from '@/store/pageSetupStore'
import { popupComponentList } from './utils/handlePopup'
import { customEventComponentList } from './utils/handleCustomEvent'
import { pageJumpComponentList } from './utils/handlePageJump'

import { appConfig } from '../setData/common/pageData'
import SetData from '../setData/index.vue'
import PagepathCascader from '../pagePathCascader/index.vue'
import SubscribeNoticesSelect from '../subscribeNoticesSelect/index.vue'
import FissionImage from '../fissionImage/index.vue'
import EditParameters from '../editParameters/index.vue'
import ConditionsForExecution from '../ConditionsForExecution/index.vue'
import OtherParameters from './otherParameters.vue'
import EditTimerModal from '../editTimerModal/index.vue'

const app: any = inject('app')
app.component('pagepath-cascader', PagepathCascader)

const pageSetupStore = usePageSetupStore()
const emits = defineEmits(['update:modelValue'])
const props = defineProps<{
  modelValue: any
}>()

const eventData = computed({
  get() {
    console.log('props.modelValue', props.modelValue)
    return props.modelValue
  },
  set(val) {
    emits('update:modelValue', val)
  },
})

/**
 * el-cascader选择事件
 */
const changeEvent = (item: any) => {
  const data = new PageHotOperation({
    operationType: item.operationType,
  })
  Object.keys(data).forEach((key) => {
    item[key] = data[key]
  })
}

/**
 * 事件类型筛选
 */
const formComponentsList: any = reactive([
  {
    field: 'operationType',
    type: 'el-cascader',
    props: {
      'show-all-levels': false,
      placeholder: '请选择',
      props: {
        emitPath: false,
      },
    },
    options: [],
    on: {
      change: changeEvent(eventData.value),
    },
    effect: {
      to: 'options',
      fetch: async () => {
        let temp = new EventList().filter((elem) => {
          if (elem.value !== 'set_params') {
            return true
          }
          //如果有页面数据返回true
          return !!pageSetupStore?.pageNewParams?.length
        })
        return temp
      },
    },
    control: [
      {
        handle(val: string) {
          return val === 'pop_ups'
        },
        formList: popupComponentList(eventData.value),
      },
      {
        handle(val: string) {
          return val === 'custom_event'
        },
        formList: customEventComponentList(eventData.value),
      },
      {
        handle(val: string) {
          console.log('val', val)
          return ['page_jump'].includes(val)
        },
        formList: pageJumpComponentList(eventData.value),
      },
    ],
  },
])
</script>
<style lang="scss" scoped></style>
