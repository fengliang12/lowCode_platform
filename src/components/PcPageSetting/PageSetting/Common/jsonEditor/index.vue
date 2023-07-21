<template>
  <el-dialog :model-value="settingDialogVisible" @close="closeSettingDialog">
    <div class="flex json_box">
      <el-button
        class="copy_btn"
        type="primary"
        @click="() => handleCopyEvents(unref(jsonData))"
        >复制配置</el-button
      >
      <JsonEditorVue class="editor" v-model="jsonData" />
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeSettingDialog">取消</el-button>
        <el-button type="primary" @click="importPageSetting"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import JsonEditorVue from 'json-editor-vue3'
import { ref, unref, inject } from 'vue'
import { cloneDeep } from 'lodash'
import { handleCopyEvents } from '../../Handle/handleCopyEvents'

const emits = defineEmits(['confirm'])

/**
 * 暴露的方法
 * @param {*} details
 */
const settingDialogVisible = ref(false)
const jsonData = ref({})

const show = async (details) => {
  jsonData.value = cloneDeep(details)
  settingDialogVisible.value = true
}

/**
 * 关闭json弹窗
 */
const closeSettingDialog = () => {
  settingDialogVisible.value = false
}

/**
 * 点击确认按钮
 * 将json导入当前配置
 */
const importPageSetting = () => {
  emits('confirm', cloneDeep(unref(jsonData)))
  closeSettingDialog()
}

defineExpose({ show })
</script>

<style lang="scss" scoped>
.json_box {
  flex-direction: column;
  .copy_btn {
    width: 100px;
    margin-bottom: 10px;
  }
  .editor {
    height: 70vh;
  }
}
</style>
