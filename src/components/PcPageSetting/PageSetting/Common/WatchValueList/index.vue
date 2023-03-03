<template>
  <template>
    <!-- 数据监听参数配置 -->
    <el-dialog
      title="数据监听参数配置"
      v-model:visible="data.dialogCondition"
      append-to-body
      width="60%"
    >
      <setConditions v-model="data.watchValueList" />
      <template v-slot:footer>
        <div class="dialog-footer">
          <div class="flex alignItems">
            <el-button type="danger" @click="cancel">取消监听</el-button>
          </div>
          <div>
            <el-button @click="data.dialogCondition = false">取 消</el-button>
            <el-button @click="confirm" type="primary"> 确 定 </el-button>
          </div>
        </div>
      </template>
    </el-dialog>
  </template>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import setConditions from './setConditions.vue'
import { ElMessageBox } from 'element-plus'
const emit = defineEmits(['confirm'])
const data = reactive({
  dialogCondition: false,
  // 数据监听参数数组
  watchValueList: [],
})

/**
 * 取消
 */
const cancel = () => {
  ElMessageBox.confirm('确认要删除当前用户吗?')
    .then(() => {
      emit('confirm', null)
      data.dialogCondition = false
    })
    .catch(() => {})
}

/**
 * 确定
 */
const confirm = () => {
  if (data.watchValueList.every((item) => item)) {
    emit('confirm', data.watchValueList)
    data.dialogCondition = false
  } else {
    ElMessageBox.alert('配置条件不符合规范')
  }
}
</script>
<style lang="scss" scoped></style>
