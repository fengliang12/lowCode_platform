<template>
  <div>
    <div class="flex">
      <el-cascader
        ref="cascaderRef"
        v-model="_data.pageApiId"
        :options="apiList"
        :props="{ label: 'apiName', value: 'id' }"
        clearable
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
              <el-button type="primary" size="small">删除</el-button>
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

    <!-- 参数编辑 -->
    <EditParameters
      ref="editParametersRef"
      @confirmParameters="editParametersChange"
    >
      <template #name>
        <el-row :gutter="24">
          <el-col :span="8"
            ><el-input v-model="_data.formData.apiKey">
              <template #prepend>&nbsp;apiKey:</template>
            </el-input></el-col
          >
          <el-col :span="8"
            ><el-input v-model="_data.formData.apiName">
              <template #prepend>&nbsp;apiName:</template>
            </el-input></el-col
          >
        </el-row>
      </template>
    </EditParameters>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, reactive } from 'vue'
import { usePageSetupStore } from '@/store/pageSetupStore'
import EditParameters from '../../../Common/editParameters/index.vue'
import { ElMessage } from 'element-plus'

import {} from 'vue'

const pageSetupStore = usePageSetupStore()
const _data = reactive<any>({
  pageApiId: '',
  formData: null,
  type: 'add',
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
const cascaderRef = ref<any>(null)
const addApiToList = () => {
  if (!pageSetupStore?.id) {
    ElMessage.error('请先保存当前编辑内容')
    return
  }
  if (!_data?._data.pageApiId) {
    ElMessage.error('请先选择需要的接口')
    return
  }
  let data = cascaderRef.value?.getCheckedNodes()[0]

  clickWriteApi(data, 'add')
}

/**
 * 编辑api
 */
const editParametersRef = ref<InstanceType<typeof EditParameters> | null>(null)
const clickWriteApi = (row: any, type: string) => {
  _data.formData = row
  _data.type = type
  let item = pageSetupStore.AloneApiList.filter(
    (item: any) => item.id === row.id,
  )[0]
  let newOnce: any = {}
  if (!item) {
    _data.formData = newOnce = { ...row }
  } else {
    _data.formData = newOnce = { ...item }
  }
  editParametersRef.value?.show({
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
const delOnceFromList = async (row: any) => {
  // await delOperationApi(row.id)
  pageSetupStore.changeAloneAPIList()
}

/**
 * 参数回调函数
 */
const editParametersChange = async (list: any) => {
  _data.formData.params = list
  if (_data.type === 'add') {
    // await setupOperationApi({
    //   ..._data.formData,
    //   pageSetupId: pageSetupStore.id,
    //   apiInfoId: _data.formData.id,
    // })
  } else if (_data.type === 'change') {
    // await changeOperationApiMes({
    //   ..._data.formData,
    //   pageSetupId: pageSetupStore.id,
    //   apiInfoId: _data.formData.id,
    // })
  }
  pageSetupStore.changeAloneAPIList()
}
</script>

<style lang="scss" scoped></style>
