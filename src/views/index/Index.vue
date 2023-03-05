<template>
  <div>
    <FormCreate
      v-model="data.value"
      :formConfig="data.formConfig"
      :formList="data.formList"
      :options="data.options"
    />
  </div>
</template>

<script setup lang="ts">
import FormCreate from '@/components/FormCreate/index.vue'
import { reactive } from 'vue'
import ConfigFn from './config'

const data = reactive({
  value: {},
  formConfig: {
    customInline: true, // 是否使用栅格话
    customGutter: 10, // 空隙
    customSpan: 12, // 几等分
    labelWidth: '160px',
  },
  options: {
    /**
     * 根据id查询详情
     */
    getData: async () => {},

    /**
     * 发送请求，提交数据
     * @param {*} data
     */
    onSubmit: (data: any) => {
      console.log(data)
    },

    /**
     * 取消事件
     */
    onCancel: () => {},
  },
  formList: ConfigFn(),
})
</script>

<style lang="scss" scoped></style>
