<template>
  <el-dialog :model-value="settingDialogVisible" @close="closeSettingDialog">
    <div class="flex json_box">
      <el-button class="copy_btn" type="primary" @click="handleCopyEvent"
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
import { usePageSetupStore } from '@/store'
import { ElMessage } from 'element-plus'
import pageSetupApi from '@/api/pageSetup'
import updateApiList from '../../Handle/updateApiList'
import { cloneDeep } from 'lodash'
import { handleCopyEvent } from '../../Handle/handleCopyEvent'

const pageSetupStore = usePageSetupStore()
const route = useRoute()

/**
 * 暴露的方法
 * @param {*} details
 */
const settingDialogVisible = ref(false)
const jsonData = ref({})
const oldApiList = ref(null)

const show = async (details) => {
  let pageSetting = cloneDeep(details)
  jsonData.value.pageSetting = pageSetting
  jsonData.value.apiList = pageSetupStore.AloneApiList
  oldApiList.value = cloneDeep(pageSetupStore.AloneApiList)
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
const getPageDetail = inject('getPageDetail')
const createPageSetting = async () => {
  const { pageSetting, apiList } = jsonData.value
  const request = route.query.id
    ? pageSetupApi.updatePage
    : pageSetupApi.createPage

  const data = await request(pageSetting)
  const pageId = data.id

  // 更新时需要删除原先的api
  if (route.query.id) {
    const deleteReqList = oldApiList.value.map((ele) => {
      return pageSetupApi.delOperationApi(ele.id)
    })
    await Promise.all(deleteReqList)
    pageSetupStore.AloneApiList = []
  }

  const reqList = apiList.map((elem) => {
    elem.pageSetupId = pageId
    return pageSetupApi.setupOperationApi(elem)
  })

  await Promise.all(reqList).then(
    async (res) => {
      ElMessage.success('导入成功')
      await afterUpdateApi(res, data)
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
const afterUpdateApi = async (res, data) => {
  // 事件中的下拉框的取值是从store中取的所以要更新
  //不更新会导致对应不上，显示api的id
  pageSetupStore.AloneApiList = res
  const apiMapId = {}
  if (unref(oldApiList).length) {
    res.forEach((elem, index) => {
      apiMapId[oldApiList?.value?.[index].id] = elem.id
    })
    const newPageData = await updateApiList(data, apiMapId)
    jsonData.value.pageSetting = await pageSetupApi.updatePage(newPageData)
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
