<template>
  <el-card class="box-card">
    <ProTable
      ref="proTableRef"
      v-model="data.value"
      :tableConfig="data.tableConfig"
      :tableOptions="data.options"
      :tableItemList="data.tableItemList"
      :options="data.options"
    />
  </el-card>
</template>

<script setup lang="ts">
import ProTable from '@/components/ProTable/index.vue'
import { getPageSetupList, deletePageSetup } from '@/api/pageSetup'
import { reactive, ref } from 'vue'
import ConfigFn from './config'
import { useRouter } from 'vue-router'

const router = useRouter()
const proTableRef = ref<InstanceType<typeof ProTable> | null>(null)

const data = reactive({
  value: {},
  tableConfig: {},
  tableItemList: ConfigFn(),
  options: {
    getTableData: async (value: any) => {
      let res = await getPageSetupList(value)
      return res.data
    },
    add: () => {
      router.push({
        path: '/pageSetting/edit',
      })
    },
    operation: [
      {
        title: '编辑',
        props: {
          type: 'primary',
        },
        handleFn: (val: any) => {
          //console.log(val)
          router.push({
            path: '/pageSetting/edit',
            query: {
              id: val.id,
            },
          })
        },
      },
      {
        title: '删除',
        props: {
          type: 'danger',
        },
        handleFn: async (val) => {
          let res = await deletePageSetup(val.id)
          if (res?.data) {
            proTableRef.value?.getTableData()
          }
        },
      },
    ],
  },
})
</script>

<style lang="scss" scoped>
.box-card {
  margin-top: 10px;
}
</style>
