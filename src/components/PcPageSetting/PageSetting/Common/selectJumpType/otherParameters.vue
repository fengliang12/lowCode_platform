<template>
  <el-dialog v-model="_data.show" append-to-body width="80%">
    <template #footer>
      <FormCreate
        v-model="_data.selectParams"
        :formList="_data.formComponentsList"
      />
      <el-button type="danger" @click="saveParams({ reset: true })"
        >取消</el-button
      >
      <el-button @click="saveParams" type="primary"> 确 定 </el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { cloneDeep } from 'lodash'
import { reactive } from 'vue'
import { specialParamsObject } from './common/paramsObj'
import FormCreate from '@/components/FormCreate/index.vue'
import { ElMessageBox } from 'element-plus'
const emits = defineEmits(['confirmParameters'])
const _data = reactive({
  key: '',
  show: false,
  selectParams: {},
  formComponentsList: [],
})

/**
 * 弹窗显示
 * @param param0
 */
const show = ({ key, params }: any) => {
  _data.show = true
  _data.key = key
  _data.selectParams = params
    ? cloneDeep(params)
    : specialParamsObject[key].value
  _data.formComponentsList = specialParamsObject[key].componentsList
}

/**
 * 保存参数
 * @param {*} param0
 */
const saveParams = async ({ reset = false }) => {
  if (reset) {
    ElMessageBox.confirm('是否恢复默认配置?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(() => {
      _data.show = false
      emits('confirmParameters', specialParamsObject[_data.key].value)
    })
  } else {
    _data.show = false
    emits('confirmParameters', _data.selectParams)
  }
}
defineExpose({ show })
</script>
<style lang="scss" scoped></style>
