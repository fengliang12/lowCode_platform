<template>
  <el-row v-if="formConfig?.inline" :gutter="formConfig?.gutter">
    <el-col
      v-for="(item, index) in formList"
      :key="index"
      :span="formConfig?.span"
    >
      <JudgeType
        :formData="formData"
        :formItem="item"
        :propKey="propKey"
        :groupIndex="groupIndex"
      ></JudgeType>
    </el-col>
  </el-row>
  <div v-else v-for="(item, index) in formList" :key="index">
    <JudgeType
      :formData="formData"
      :formItem="item"
      :propKey="propKey"
      :groupIndex="groupIndex"
    ></JudgeType>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import JudgeType from '../judgeType/index.vue'
const formConfig = inject<FormCreate.FormConfigProps>('formConfig')
withDefaults(
  defineProps<{
    formData: any
    formList: FormCreate.FormItemListType
    propKey: string
    groupIndex?: number
  }>(),
  {
    formData: () => ({}),
    formList: () => [],
    propKey: '',
  },
)
</script>

<style lang="scss" scoped></style>
