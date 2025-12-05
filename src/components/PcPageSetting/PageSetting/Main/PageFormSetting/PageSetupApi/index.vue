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
            @click="clickWriteApi(scope.row, 'edit')"
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
import { getId } from '../../../Handle/util'

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
  let data = cascaderRef.value?.getCheckedNodes()[0]?.data
  clickWriteApi(data, 'add')
}

/**
 * 编辑api
 */
const editParametersRef = ref<InstanceType<typeof EditParameters> | null>(null)
const clickWriteApi = (row: any, type: string) => {
  console.log('row', row)

  _data.formData = row
  _data.type = type
  let item = pageSetupStore.AloneApiList.filter(
    (item: any) => item.id === row.id,
  )[0]
  let newOnce: any = {}
  if (!item) {
    _data.formData = newOnce = {
      ...row,
      params:
        typeof item?.params === 'string'
          ? JSON.parse(item.params)
          : item?.params || [],
      res:
        typeof item?.params === 'string'
          ? JSON.parse(item.res)
          : item?.res || [],
    }
  } else {
    _data.formData = newOnce = {
      ...item,
      params:
        typeof item?.params === 'string'
          ? JSON.parse(item.params)
          : item?.params || [],
      res:
        typeof item?.params === 'string'
          ? JSON.parse(item.res)
          : item?.res || [],
    }
  }

  editParametersRef.value?.show({
    params: newOnce?.params,
    type: 'multiLevel',
    api: {
      apiUrl: newOnce.url,
      apiKey: newOnce.apiKey,
    },
  })
}

/**
 * 删除api
 */
const delOnceFromList = async (row: any) => {
  pageSetupStore.changeAloneAPIList(row, 'delete')
}

/**
 * 参数回调函数
 */
const editParametersChange = async (list: any) => {
  _data.formData.params = list
  pageSetupStore.changeAloneAPIList(
    {
      ..._data.formData,
      id: _data.type === 'add' ? getId() : _data.formData.id,
    },
    _data.type,
  )
}
</script>

<style lang="scss" scoped></style>
