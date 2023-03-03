<template>
  <el-row>
    <div class="toolBar">
      <el-button type="primary" size="mini" @click="handleAddChild"
        >添加一级选项</el-button
      >
    </div>
    <el-table :data="modelValue" row-key="id" :border="true">
      <el-table-column
        label="label值"
        prop="label"
        width="260px"
      ></el-table-column>
      <el-table-column
        label="value值"
        prop="value"
        width="260px"
      ></el-table-column>
      <el-table-column label="操作" width="180">
        <template v-slot="$scope">
          <el-button type="text" @click="handleEditRow($scope)">修改</el-button>
          <el-button type="text" @click="handleAddChild($scope)"
            >添加子选项</el-button
          >
          <el-button type="text" @click="handleDeleteRow($scope)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="添加/编辑选项"
      v-model="dialogVisible"
      width="400px"
      modal
      :append-to-body="true"
    >
      <el-form label-width="80px">
        <el-form-item label="label">
          <el-input v-model="dialogInfo.label" />
        </el-form-item>
        <el-form-item label="value">
          <el-input v-model="dialogInfo.value" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onConfirmDialog">确 定</el-button>
      </div>
    </el-dialog>
  </el-row>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { cloneDeep } from 'lodash'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getId } from '../../../../Handle/util.js'

const props = defineProps(['modelValue'])

/**
 * 修改
 */
const type = ref('')
const currentEdit = ref(null)
const dialogVisible = ref(false)
const dialogInfo = ref({
  label: '',
  vale: '',
})
const handleEditRow = (row) => {
  type.value = 'edit'
  currentEdit.value = row
  dialogInfo.value = cloneDeep(row)
  dialogVisible.value = true
}

onMounted(() => {
  handleParentsId(props.modelValue)
})

/**
 * 处理parentsId
 */
const parentsIdMap = ref({})
const handleParentsId = (children, parent) => {
  if (!parent) {
    parentsIdMap.value[0] = children
  }
  children.forEach((child) => {
    if (!child.id) {
      child.id = getId()
    }
    if (!child.pId) {
      child.pId = parent ? parent.id : 0
    }
    if (child.children) {
      parentsIdMap.value[child.id] = child.children
      handleParentsId(child.children, child)
    }
  })
}

/**
 * 添加
 */
const handleAddChild = (row) => {
  if (row) {
    currentEdit.value = row
  }
  type.value = 'add'
  dialogVisible.value = true
}

/**
 * 保存/添加 的确认
 */
const onConfirmDialog = () => {
  if (!dialogInfo.value.label || !dialogInfo.value.value) {
    return ElMessage.error('请输入label和value')
  }
  if (type.value == 'add') {
    const child = {
      ...dialogInfo.value,
      id: getId(),
      pId: currentEdit.value ? currentEdit.value.id : 0,
    }

    if (currentEdit.value) {
      if (!currentEdit.value?.children) {
        currentEdit.value.children = []
      }
      currentEdit.value.children.push(child)
      if (!parentsIdMap.value[currentEdit.value.id]) {
        parentsIdMap.value[currentEdit.value.id] = currentEdit.value.children
      }
    } else {
      props.modelValue.push(child)
    }
  } else {
    currentEdit.value.label = dialogInfo.value.label
    currentEdit.value.value = dialogInfo.value.value
  }
  closeDialog()
}

/**
 * 删除行
 */
const handleDeleteRow = (row) => {
  ElMessageBox.confirm('确认删除当前选项和子选项吗?', '提示', {
    cancelButtonText: '取消',
    confirmButtonText: '确定',
  }).then(() => {
    let delIndex = parentsIdMap.value[row.id].findIndex((i) => i.id === row.id)
    parentsIdMap.value[row.id].splice(delIndex, 1)

    if (!parentsIdMap.value[row.id].length) {
      delete parentsIdMap.value[row.id]
    }
  })
}

/**
 * 关闭弹窗
 */
const closeDialog = () => {
  dialogVisible.value = false
  currentEdit.value = null
  dialogInfo.value = {
    label: '',
    value: '',
  }
}
</script>
<style lang="scss" scoped></style>
