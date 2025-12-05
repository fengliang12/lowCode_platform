<template>
  <div class="page-setting-container" v-loading="loading">
    <div class="actions">
      <el-button type="primary" @click="save">保存</el-button>
      <el-button @click="back">返回</el-button>
    </div>
    <div class="content">
      <PageSetting ref="pageSettingRef" :detail="detail"></PageSetting>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onUnmounted, ref, watch } from 'vue'
import PageSetting from './PageSetting/index.vue'
import { useRoute, useRouter } from 'vue-router'
import { usePageSetupStore } from '@/store/pageSetupStore'
import { ElMessage, ElMessageBox } from 'element-plus'
import bus from '@/utils/bus'
import indexedDB from './utils/indexedDB'
import {
  createPageSetup,
  updatePageSetup,
  getPageSetupInfo,
} from '@/api/pageSetup'
import { cloneDeep } from 'lodash'

//公共数据
const pageSetupStore = usePageSetupStore()
const router = useRouter()
const route = useRoute()

pageSetupStore.changeInfo = !route.query?.id
pageSetupStore.id = route.query?.id ?? ''

/**
 * 监听detail,如果有变化那就是修改了detail
 */
const detail = ref({})

/**
 * 获取页面详情信息
 */
watch(
  () => route?.query?.id,
  async (val) => {
    if (!val) return
    const res: any = await getPageSetupInfo(route.query?.id as string)
    detail.value = res.data.data
    if (res.data.data?.aloneApiLst) {
      pageSetupStore.changeAloneAPIList(res.data.data.aloneApiLst, 'init')
    }
  },
  {
    immediate: true,
  },
)
/**
 * 获取公共api列表
 */
const loading = ref(false)

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
      ElMessage.warning('已保存已取消')
    })
}

bus.on('savePageSetting', savePageSetting)

onUnmounted(() => {
  bus.off('savePageSetting')
})

/**
 * 点击保存
 */
const pageSettingRef = ref<InstanceType<typeof PageSetting> | null>(null)
const save = async () => {
  if (!pageSettingRef?.value) return

  const res = await pageSettingRef.value.save()
  if (!res) return
  //添加api
  res.aloneApiLst = cloneDeep(pageSetupStore?.AloneApiList) || []
  console.log('结果', res)

  //更新还是创建
  loading.value = true

  const request = res.id ? updatePageSetup : createPageSetup
  const result = await request(res)
  loading.value = false
  let pageSetup = result.data.data

  ElMessage.success(res.id ? '修改成功' : '创建成功')

  if (!res.id) {
    //将当前新增加的页面添加到pageList中
    pageSetupStore.pageList.push({
      id: pageSetup.id,
      title: pageSetup.title,
    })
    pageSetupStore.id = pageSetup.id
    res.id = pageSetup.id
  }

  // //刷新当前编辑页面
  router.replace({
    path: '/pageSetting/edit',
    query: { id: pageSetupStore.id },
  })

  // 将数据保存到浏览器数据库中
  indexedDB.saveIndexedDB([res])
}

/**
 * 返回上一层
 */
const back = () => {
  router.back()
}
</script>

<style lang="scss" scoped>
.page-setting-container {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  color: #111111;
}

.topbar {
  height: 64px;
  display: flex;
  align-items: center;
  padding: 0 16px 0 24px;
  box-sizing: border-box;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.04) 0%,
    rgba(0, 0, 0, 0) 100%
  );
  border-bottom: 1px solid #e5e7eb;
}

.brand {
  font-size: 18px;
  font-weight: 600;
  color: #111111;
  margin-right: 24px;
}

.search {
  flex: 1;
  max-width: 540px;
}

.actions {
  position: fixed;
  right: 20px;
  top: 15px;
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 12px;
}

.content {
  height: calc(100vh - 100px);
}

:deep(.topbar .el-button--primary) {
  background-image: linear-gradient(90deg, #6366f1, #8b5cf6);
  border-color: transparent;
}

/* 深色模式输入与选择组件 */
:deep(.el-input__wrapper) {
  background: #ffffff;
  border: 1px solid #dcdfe6;
  box-shadow: none;
}
:deep(.el-input__wrapper.is-focus),
:deep(.el-input__wrapper.is-active) {
  border-color: rgba(99, 102, 241, 0.6);
}
:deep(.el-input__inner) {
  color: #111111;
}
:deep(.el-input__inner::placeholder) {
  color: #9ca3af;
}

:deep(.el-textarea__inner) {
  background: #ffffff;
  border: 1px solid #dcdfe6;
  color: #111111;
}
:deep(.el-textarea__inner::placeholder) {
  color: #9ca3af;
}

:deep(.el-select__wrapper) {
  background: #ffffff;
  border: 1px solid #dcdfe6;
}
:deep(.el-select__wrapper.is-focus),
:deep(.el-select__wrapper.is-hover) {
  border-color: rgba(99, 102, 241, 0.6);
}

:deep(.el-input-group__prepend),
:deep(.el-input-group__append) {
  background: #f5f7fa;
  color: #1f2937;
  border-color: #e5e7eb;
}

/* 表单与标签文字颜色 */
:deep(.el-form-item__label),
:deep(.el-tabs__item),
:deep(.el-tree-node__label),
:deep(.el-table),
:deep(.el-pagination) {
  color: #111111;
}
</style>
