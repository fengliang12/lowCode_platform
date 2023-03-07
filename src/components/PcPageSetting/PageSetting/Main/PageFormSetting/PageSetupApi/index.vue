<template>
  <div>
    <div class="flex">
      <el-cascader
        v-model="pageApiId"
        :options="apiList"
        :props="{ label: 'apiName', value: 'id' }"
        clearable
        ref="cascaderRef"
        :show-all-levels="false"
      ></el-cascader>
      <!-- 新增按钮  -->
      <el-button type="success" class="icon-plus ml10" @click="addApiToList"
        >新增</el-button
      >
    </div>

    <!-- ApiList -->
    <el-table :data="AloneApiList" style="margin-top: 20px; width: 100%">
      <el-table-column prop="apiName" label="API名称" width="180">
      </el-table-column>
      <el-table-column prop="method" label="方式" width="180">
      </el-table-column>
      <el-table-column width="180" label="操作">
        <template v-slot="scope">
          <el-popconfirm
            title="确定删除该项吗？"
            @confirm="delOnceFromList(scope.row)"
          >
            <template #reference>
              <el-button type="primary">删除</el-button>
            </template>
          </el-popconfirm>
          <el-button
            type="primary"
            size="small"
            style="margin-left: 15px"
            @click="clickWriteApi(scope.row, true)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <EditParameters
      ref="editParametersRef"
      @confirmParameters="editParametersChange"
    >
      <template #name>
        <el-input v-model="formData.apiKey">
          <template #prepend>&nbsp;apiKey:</template>
        </el-input>
        <el-input v-model="formData.apiName">
          <template #prepend>&nbsp;apiName:</template>
        </el-input>
      </template>
    </EditParameters>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { usePageSetupStore } from '@/store'
import EditParameters from '../../../Common/editParameters/index.vue'
import api from '@/api/axios.ts'

const pageSetupStore = usePageSetupStore()
const formData = ref({})

const pageSetupId = computed(() => {
  return pageSetupStore.id
})
/**
 * apiList
 */
const apiList = computed(() => {
  return pageSetupStore.getMinApi.minApiList
})

/**
 * 获取单独页面api管理
 */
const AloneApiList = computed(() => {
  return pageSetupStore.AloneApiList
})

/**
 * 新增api
 */
const cascaderRef = ref(null)
const pageApiId = ref('')
const addOrChange = ref('add')
const addApiToList = () => {
  if (!pageSetupId?.value?.id) {
    ElMessage.error('请先保存当前编辑内容')
    return
  }
  if (!pageApiId.value?.id) {
    ElMessage.error('请先选择需要的接口')
    return
  }
  let data = cascaderRef.value.getCheckedNodes(true)[0]
  clickWriteApi(data, 'add')
}

/**
 * 编辑api
 */
const editParametersRef = ref(null)
const clickWriteApi = (row, type) => {
  formData.value = row
  addOrChange.value = type
  let item = pageSetupStore.AloneApiList.filter((item) => item.id === row.id)[0]
  let newOnce = {}
  if (!item) {
    formData.value = newOnce = { ...row }
  } else {
    formData.value = newOnce = { ...item }
  }
  editParametersRef.value.show({
    params: newOnce.params ? newOnce.params : [],
    type: 'multiLevel',
    apiInfo: {
      apiUrl: newOnce.url,
      apiKey: newOnce.apiKey,
    },
  })
}

/**
 * 删除api
 */
const delOnceFromList = async (row) => {
  await api.pageSetupApi.delOperationApi(row.id)
  pageSetupStore.changeAloneAPIList()
}

/**
 * 回调函数
 */
const editParametersChange = (list) => {
  formData.value.params = list
  changeDataAndAdd()
}

/**
 * 接口调用
 */
const changeDataAndAdd = async () => {
  if (addOrChange.value === 'add') {
    await api.pageSetupApi.setupOperationApi({
      ...formData.value,
      pageSetupId: pageSetupId.value,
      apiInfoId: formData.value.id,
    })
  } else if (addOrChange.value === 'change') {
    await api.pageSetupApi.changeOperationApiMes({
      ...formData.value,
      pageSetupId: pageSetupId.value,
      apiInfoId: formData.value.id,
    })
  }
  pageSetupStore.changeAloneAPIList()
}
</script>

<style lang="scss" scoped></style>
