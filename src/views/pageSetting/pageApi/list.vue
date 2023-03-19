<template>
  <div>
    <div class="flex mb10">
      <el-button type="primary" :icon="'Plus'" @click="handleAdd('0')">
        新增
      </el-button>
    </div>
    <el-table
      ref="tableRef"
      v-loading="loading"
      :data="tableData"
      :border="true"
      stripe
      class="elTable"
      row-key="id"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="apiKey" label="Key"></el-table-column>
      <el-table-column prop="apiName" label="接口名称"></el-table-column>
      <el-table-column
        prop="url"
        label="接口地址"
        min-width="150"
      ></el-table-column>
      <el-table-column
        prop="method"
        label="请求方式"
        width="120"
      ></el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-link
            type="primary"
            class="table-operate-text"
            icon="el-icon-notebook-2"
            :underline="false"
            @click="handleAdd(scope.row.id)"
          >
            新增子集
          </el-link>
          <el-link
            type="primary"
            class="table-operate-text"
            icon="el-icon-edit"
            :underline="false"
            @click="handleEdit(scope.row.id)"
          >
            编辑
          </el-link>
          <el-link
            type="danger"
            class="table-operate-text"
            icon="el-icon-delete-solid"
            :underline="false"
            @click="handleDelete(scope.row.id)"
          >
            删除
          </el-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { usePageSetupStore } from '@/store/pageSetupStore'
import { useRouter } from 'vue-router'
import { ElMessageBox } from 'element-plus'
import { delOperationApi } from '@/api/pageSetup/index'

const pageSetupStore = usePageSetupStore()

onMounted(() => {
  initPageSetupApi()
})

const tableData = computed(() => {
  return pageSetupStore.PageSetupApiList
})
/**
 * 初始化setupApi
 */
const loading = ref(false)
const initPageSetupApi = async () => {
  loading.value = true
  await pageSetupStore.getPageSetupApi()
  loading.value = false
}

/**
 * 新增接口
 */
const router = useRouter()
const handleAdd = (id) => {
  router.push({ path: '/pageSetting/pageApi/edit', query: { parentId: id } })
}

/**
 * 编辑接口
 */
const handleEdit = (id) => {
  router.push({ path: '/pageSetting/pageApi/edit', query: { id: id } })
}

/**
 * 删除接口
 */
const handleDelete = (id) => {
  ElMessageBox.confirm('确定删除该接口吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    delOperationApi(id).then(() => {
      ElMessageBox.success('删除成功')
      initPageSetupApi()
    })
  })
}
</script>
<style lang="scss" scoped></style>
