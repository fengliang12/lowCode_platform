<template>
  <div class="content" v-loading="loading">
    <PageSetting ref="pageSettingRef" :detail="detail"></PageSetting>
    <el-button class="footer" type="primary" @click="save">保存</el-button>
    <el-button class="footer backBtn" @click="back">返回</el-button>
  </div>
</template>

<script setup>
import { onUnmounted, ref, watch, provide, onMounted } from 'vue'
import PageSetting from './PageSetting/index.vue'
import { useRoute, useRouter } from 'vue-router'
// import pageSetupApi from '@/api/pageSetup'
import { usePageSetupStore } from '@/store'
import { ElMessage, ElMessageBox } from 'element-plus'
import bus from '@/utils/bus'
import indexedDB, { storeName } from './utils/indexedDB'

//公共数据
const pageSetupStore = usePageSetupStore()
//路由信息
const router = useRouter()
const route = useRoute()

pageSetupStore.changeInfo = !route.query?.id
pageSetupStore.id = route.query?.id || ''

/**
 * 监听detail,如果有变化那就是修改了detail
 */
const detail = ref({})
watch(
  () => detail,
  () => {
    pageSetupStore.changeInfo = true
  },
  { deep: true },
)

onMounted(() => {
  initPageSetupApi()
  getPageDetail()
  bus.on('savePageSetting', savePageSetting)
  bus.on('getPageDetail', getPageDetail)
})

onUnmounted(() => {
  bus.off('savePageSetting')
  bus.off('getPageDetail')
})

/**
 * 获取公共api列表
 */
const loading = ref(false)
const initPageSetupApi = async () => {
  loading.value = true
  // await pageSetupStore.getPageSetupApi()
  loading.value = false
}

/**
 * 获取页面详情信息
 */
const getPageDetail = async () => {
  if (!route.query?.id) return false
  // const res = await pageSetupApi.getPageDetail(route.query?.id)
  // detail.value = res
}

/**
 * 点击保存
 */
const pageSettingRef = ref(null)
const save = async () => {
  const res = await pageSettingRef.value.save().catch(() => {})
  console.log(res)
  if (!res) return

  //更新还是创建
  loading.value = true
  const request = res.id ? pageSetupApi.updatePage : pageSetupApi.createPage
  const result = await request(res)
  loading.value = false

  const msg = res.id ? '修改成功' : '创建成功'
  ElMessage.success(msg)

  if (!res.id) {
    //将当前新增加的页面添加到pageList中
    pageSetupStore.pageList.push({
      id: result.id,
      title: result.title,
      customHeader: result.customHeader,
    })
    //刷新当前编辑页面
    router.replace({
      name: 'pageSetupEdit',
      query: { id: result.id },
    })
  }

  saveIndexedDB([res])
}

/**
 * 将每一次操作成功的数据备份到indexDB中
 */
const saveIndexedDB = async (pageList) => {
  let history = await indexedDB.get(storeName, 'syncBrandComponentHistory_all')
  if (!history) {
    indexedDB.add(storeName, {
      id: 'syncBrandComponentHistory_all',
      value: [
        {
          time: new Date(),
          data: pageList,
        },
      ],
    })
  } else {
    const pageString = JSON.stringify(pageList)
    const saveTemp = history.value
    if (pageString !== JSON.stringify(saveTemp[saveTemp.length - 1].data)) {
      saveTemp.push({
        time: new Date(),
        data: pageList,
      })
    }
    if (saveTemp.length > 10) {
      saveTemp.shift()
    }
    indexedDB.put(storeName, {
      id: `syncBrandComponentHistory_${pageSetupStore.id}`,
      value: [
        {
          time: new Date(),
          data: pageList,
        },
      ],
    })
  }
}

/**
 * 弹窗提示是否需要保存数据
 */
const savePageSetting = () => {
  ElMessageBox.confirm('需要保存当前数据后再跳转吗？', '提示', {
    confirmButtonText: '保存',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      save()
    })
    .catch(() => {
      ElMessage('已取消')
    })
}

/**
 * 返回上一层
 */
const back = () => {
  router.back()
}

provide('getPageDetail', getPageDetail)
</script>
<style lang="scss" scoped>
.content {
  height: calc(100vh - 180px);
  .footer {
    position: fixed;
    right: 30px;
    bottom: 30px;
  }
  .backBtn {
    right: 120px;
  }
}
</style>
