<template>
  <el-dialog
    v-model="dialogVisible"
    title="数据处理"
    width="80%"
    append-to-body
  >
    <el-button style="float: right" @click="addChild"> 新增方法 </el-button>
    <el-table :data="handle" :border="true" style="width: 100%">
      <el-table-column prop="method" label="方法名" width="200">
        <template v-slot="scope">
          <el-cascader
            :model-value="dPageShowDataValue(scope.row.method)"
            @change="cascaderChange($event, scope.row)"
            :options="methodList"
            :props="{ value: 'key', children: 'child' }"
            :show-all-levels="false"
            placeholder="请选择处理方法"
          />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="值" width="600"
        ><template v-slot="scope">
          <SetData v-model="scope.row.pageValue"></SetData>
        </template>
      </el-table-column>
      <el-table-column prop="key" label="key">
        <template v-slot="scope">
          <el-input
            v-model="scope.row.key"
            type="text"
            placeholder="键值(key)"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template v-slot="scope">
          <el-button @click="deleteChild(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <template #footer>
      <span class="dialog-footer">
        <el-button type="danger" @click="cancel">取消处理</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirm">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
// PageValueHandle {
//   key (string, optional): key ,
//   method (string, optional): 方法 ,
//   pageValue (PageValue, optional): 页面 key Word
// }
import { cloneDeep } from 'lodash'
import { HandleData } from './common/handleData'
import { methodList } from './common/methodList'
import { dPageShowDataValue } from '../../Handle/filters'
import { ElMessage, ElMessageBox } from 'element-plus'
import SetData from './index.vue'
import { ref } from 'vue'

const emit = defineEmits(['confirm'])

/**
 * 弹窗
 * @param {*} handleData
 */
const handle = ref([])
const dialogVisible = ref(false)
const show = (handleData) => {
  handle.value = cloneDeep(handleData) ?? [new HandleData()]
  dialogVisible.value = true
}

/**
 * 新增方法
 */
const addChild = () => {
  handle.value.push(new HandleData())
}

/**
 * 删除方法
 */
const deleteChild = ({ $index }) => {
  handle.value.splice($index, 1)
}

/**
 * 多级菜单选择
 * @param {*} item
 */
const cascaderChange = (item, row) => {
  row.method = item.join('.')
}

/**
 * 取消处理
 */
const cancel = () => {
  ElMessageBox.confirm('确认取消数据处理吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    emit('confirm', null)
    dialogVisible.value = false
  })
}

/**
 * 确认
 */
const confirm = () => {
  if (check()) {
    emit('confirm', handle.value)
    dialogVisible.value = false
  } else {
    ElMessage.error('配置不符合规范')
  }
}

/**
 * check
 */
const check = () => {
  return handle.value.every((item) => {
    return item.method
  })
}

defineExpose({ show })
</script>

<style lang="scss" scoped></style>
