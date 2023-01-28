<template>
  <div>
    <!-- 新增和展开折叠 -->
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="Plus" @click="handleAdd">{{
          $t('button.wadd')
        }}</el-button>
      </el-col>

      <el-col :span="1.5">
        <el-button type="info" plain icon="Sort" @click="toggleExpandAll"
          >展开/折叠</el-button
        >
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="router"
      :default-expand-all="isExpandAll"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="menuName" label="标题" sortable />
      <el-table-column prop="permission" label="权限名称" sortable />
      <el-table-column label="icon图标">
        <template #default="scope">
          <component style="width: 20px" :is="scope.row.icon"></component>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="success" text @click="handleDelete(scope.row)"
            >删除</el-button
          >
          <el-button type="primary" text @click="handleUpdate(scope.row)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { getAllMenus } from '@/api/System/Menu'
import { ElMessageBox } from 'element-plus'
import { onMounted, Ref, ref } from 'vue'
const handleAdd = () => {}
const toggleExpandAll = () => {}

// 表单数据
const tableData: Ref<Api.Menu.getAllMenus.IResponse[]> = ref([])
// 控制树状数据展开
const isExpandAll = ref(false)

//获取所有菜单栏
const _getAllMenus = () => {
  getAllMenus().then((res) => {
    console.log(res)
    tableData.value = res.data.data
  })
}
onMounted(() => {
  _getAllMenus()
})

//处理删除
const handleDelete = (row: Api.Menu.getAllMenus.IResponse) => {
  ElMessageBox.confirm(
    '确实删除菜单(或者权限)名为' + row.menuName + '的数据项以及子项吗?',
  ).then((res) => {
    console.log('删除')
  })
}
</script>
<style lang="scss" scoped></style>
