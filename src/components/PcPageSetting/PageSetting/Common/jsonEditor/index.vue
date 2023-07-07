<template>
  <el-dialog :model-value="settingDialogVisible" @close="closeSettingDialog">
    <div class="flex json_box">
      <el-button class="copy_btn" type="primary" @click="handleCopyEvents"
        >复制配置</el-button
      >
      <JsonEditorVue class="editor" v-model="jsonData" />
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeSettingDialog">取消</el-button>
        <el-button type="primary" @click="importPageSetting"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import JsonEditorVue from 'json-editor-vue3'
import { ref, unref, inject } from 'vue'
import { useRoute } from 'vue-router'
import { usePageSetupStore } from '@/store/pageSetupStore'
import { ElMessage } from 'element-plus'
import {
  updatePageSetup,
  createPageSetup,
  delOperationApi,
  createOperationApi,
} from '@/api/pageSetup'
import updateApiList from '../../Handle/updateApiList'
import { cloneDeep } from 'lodash'
import { handleCopyEvents } from '../../Handle/handleCopyEvents'

const getPageDetail = inject('getPageDetail')
const pageSetupStore = usePageSetupStore()
const route = useRoute()

/**
 * 暴露的方法
 * @param {*} details
 */
const settingDialogVisible = ref(false)
const jsonData = ref({})
let oldApiList = null

const show = async (details) => {
  let pageSetting = cloneDeep(details)
  jsonData.value.pageSetting = pageSetting
  jsonData.value.apiList = pageSetupStore.AloneApiList
  oldApiList = cloneDeep(pageSetupStore.AloneApiList)
  settingDialogVisible.value = true
}

/**
 * 关闭json弹窗
 */
const closeSettingDialog = () => {
  settingDialogVisible.value = false
}

/**
 * 点击确认按钮
 * 将json导入当前配置
 */
const importPageSetting = () => {
  createPageSetting().then(() => {
    closeSettingDialog()
  })
}

/**
 * 创建页面配置
 */
const createPageSetting = async () => {
  const { pageSetting, apiList } = jsonData.value
  let request = createPageSetup
  if (route.query.id) {
    pageSetting.id = route.query.id
    request = updatePageSetup
  }
  const data = await request(pageSetting)
  const pageId = data.id

  // 更新时需要删除原先的api
  console.log('oldApiList', oldApiList)
  if (route.query.id && oldApiList?.length) {
    const deleteReqList = oldApiList.map((ele) => {
      return delOperationApi(ele.id)
    })
    await Promise.all(deleteReqList)
    pageSetupStore.AloneApiList = []
  }

  const reqList = apiList.map((elem) => {
    elem.pageSetupId = pageId
    return createOperationApi(elem)
  })

  await Promise.all(reqList).then(
    async (res) => {
      ElMessage.success('导入成功')
      await afterUpdateApi(res, data, apiList)
      getPageDetail()
    },
    () => {
      ElMessage.error('导入失败')
    },
  )
}

/**
 * 事件中的下拉框的取值是从store中取的所以要更新
 * @param {*} res
 * @param {*} data
 * @param {*} mapApiList
 */
const afterUpdateApi = async (res, data, apiList) => {
  //不更新会导致对应不上，显示api的id
  pageSetupStore.AloneApiList = res
  const apiMapId = {}
  if (apiList.length) {
    res.forEach((elem, index) => {
      apiMapId[apiList?.[index].id] = elem.id
    })
    const newPageData = await updateApiList(data, apiMapId)
    jsonData.value.pageSetting = await updatePageSetup(newPageData)
  }
}

defineExpose({ show })
</script>

<style lang="scss" scoped>
.json_box {
  flex-direction: column;
  .copy_btn {
    width: 100px;
    margin-bottom: 10px;
  }
  .editor {
    height: 70vh;
  }
}
</style>
