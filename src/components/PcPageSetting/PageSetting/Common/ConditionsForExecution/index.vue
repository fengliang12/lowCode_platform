<template>
  <el-dialog
    title="条件配置"
    v-model="dialogCondition"
    width="80%"
    append-to-body
  >
    <SetConditions v-model="conditionsForExecution"></SetConditions>
    <template #footer>
      <div v-if="conditionsForExecution" class="flex justify-between">
        <div class="flex alignItems">
          <el-button type="danger" @click="cancelCondition">取消判断</el-button>
          <div class="flex alignItems">
            <div class="font ml20">失败终止：</div>
            <el-switch v-model="conditionsForExecution.interrupt"></el-switch>
            <div class="font ml20">成功终止：</div>
            <el-switch
              v-model="conditionsForExecution.trueInterrupt"
            ></el-switch>
          </div>
        </div>
        <span class="dialog-footer">
          <el-button @click="dialogCondition = false">取消</el-button>
          <el-button type="primary" @click="confirm">确定</el-button>
        </span>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import SetConditions from './setConditions.vue'
import { ConditionsData } from './data'
import { ElMessage, ElMessageBox } from 'element-plus'
import { cloneDeep } from 'lodash'
const emit = defineEmits(['confirm'])
const dialogCondition = ref(false)
const conditionsForExecution = ref()

/**
 * 显示条件判断
 */
const show = (conditions) => {
  console.log('conditions', conditions)
  conditionsForExecution.value =
    cloneDeep(conditions) ?? new ConditionsData({ id: 1 })
  dialogCondition.value = true
}

/**
 * 确认
 */
const confirm = () => {
  if (!check(conditionsForExecution.value)) {
    ElMessage.error('配置条件不符合规范')
    return
  }
  console.log('配置条件', conditionsForExecution.value)
  emit('confirm', conditionsForExecution.value)
  dialogCondition.value = false
}

/**
 * 检测是否填写值了
 * @param {*} data
 */
const check = (data) => {
  const { type, child, value, content, execution } = data
  // 全部不填报错
  if (
    !type &&
    (!value?.value ||
      (!content?.value &&
        execution !== 'non-existent' &&
        execution !== 'existent'))
  ) {
    return false
  }

  if (type && !child?.length) return false
  if (child?.length) {
    return child.every((item) => {
      return check(item)
    })
  }
  return true
}

/**
 * 取消判断
 */
const cancelCondition = () => {
  ElMessageBox.confirm('确认取消条件判断吗', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    emit('confirm', null)
    dialogCondition.value = false
  })
}

defineExpose({ show })
</script>
<style lang="scss" scoped></style>
