<template>
  <div class="event_form_box">
    <FormCreate
      v-model="eventData"
      :formList="formComponentsList"
      :options="{ initDate: false }"
    />
  </div>
</template>

<script setup lang="ts">
import FormCreate from '@/components/FormCreate/index.vue'
import { computed, reactive, inject } from 'vue'
import { EventList, PageHotOperation } from './data'
import SetData from '../setData/index.vue'
import PagepathCascader from '../pagePathCascader/index.vue'
import SubscribeNoticesSelect from '../subscribeNoticesSelect/index.vue'

import {
  popupComponentList,
  customEventComponentList,
  pageJumpComponentList,
  subscribeNoticeComponentList,
  apiComponentList,
  associatedModuleComponentList,
  authComponentList,
  setParamsComponentList,
} from './utils/index.js'

const app: any = inject('app')
app.component('pagepath-cascader', PagepathCascader)
app.component('subscribe-notices-select', SubscribeNoticesSelect)
app.component('set-data', SetData)
const emits = defineEmits(['update:modelValue'])

const props = defineProps<{
  modelValue: any
}>()

const eventData = computed({
  get() {
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
      change: () => changeEvent(eventData.value),
    },
    effect: {
      to: 'options',
      fetch: async () => {
        let temp = new EventList()
        return temp
      },
    },
    control: [
      {
        handle(val: string) {
          return val === 'pop_ups'
        },
        get formList() {
          return popupComponentList(eventData.value)
        },
      },
      {
        handle(val: string) {
          return val === 'custom_event'
        },
        get formList() {
          return customEventComponentList(eventData.value)
        },
      },
      {
        handle(val: string) {
          console.log('val', val)
          return [
            'page_jump',
            'page_setting',
            'jump_relevance_mini',
            'jump_h5',
          ].includes(val)
        },
        get formList() {
          return pageJumpComponentList(eventData.value)
        },
      },
      {
        handle(val: string) {
          return val === 'subscribe_notice'
        },
        get formList() {
          return subscribeNoticeComponentList(eventData.value)
        },
      },
      {
        handle(val: string) {
          return val === 'api'
        },
        get formList() {
          return apiComponentList(eventData.value)
        },
      },
      {
        handle(val: string) {
          return val === 'associated_module'
        },
        get formList() {
          return associatedModuleComponentList(eventData.value)
        },
      },
      {
        handle(val: string) {
          return val === 'auth'
        },
        get formList() {
          return authComponentList(eventData.value)
        },
      },
      {
        handle(val: string) {
          return val === 'set_params'
        },
        get formList() {
          return setParamsComponentList(eventData.value)
        },
      },
    ],
  },
])
</script>
<style lang="scss">
.event_form_box div {
  display: flex;
  flex-wrap: nowrap;
  margin-right: 2px;
}
</style>
