<template>
  <template>
    <!-- 数据监听参数配置 -->
    <el-dialog
      title="数据监听参数配置"
      v-model="_data.dialogCondition"
      append-to-body
      width="60%"
    >
      <setConditions v-model="_data.watchValueList" />
      <template v-slot:footer>
        <div class="dialog-footer">
          <div class="flex alignItems">
            <el-button type="danger" @click="cancel">取消监听</el-button>
          </div>
          <div>
            <el-button @click="_data.dialogCondition = false">取 消</el-button>
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
import { cloneDeep } from 'lodash'
const emit = defineEmits(['confirm'])
const _data = reactive({
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
      _data.dialogCondition = false
    })
    .catch(() => {})
}

/**
 * 确定
 */
const confirm = () => {
  if (_data.watchValueList.every((item) => item)) {
    emit('confirm', _data.watchValueList)
    _data.dialogCondition = false
  } else {
    ElMessageBox.alert('配置条件不符合规范')
  }
}

/**
 * 显示
 * @param list
 */
const show = (list: any) => {
  _data.watchValueList = cloneDeep(list)
  _data.dialogCondition = true
}

defineExpose({ show })
</script>
<style lang="scss" scoped></style>
