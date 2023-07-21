<template>
  <div class="flex content">
    <el-tabs
      class="flex-1"
      type="border-card"
      tabPosition="left"
      v-model="currentTab"
      :before-leave="handleTabChange"
    >
      <el-tab-pane label="基础信息" name="1">
        <el-form
          ref="apiFormRef"
          :model="apiForm"
          :rules="ruleForm"
          label-width="100px"
        >
          <el-form-item prop="apiKey" label="key">
            <el-input v-model="apiForm.apiKey"></el-input>
          </el-form-item>
          <el-form-item prop="apiName" label="接口名称">
            <el-input v-model="apiForm.apiName"></el-input>
          </el-form-item>
          <el-form-item prop="url" label="接口地址">
            <el-input v-model="apiForm.url"></el-input>
          </el-form-item>
          <el-form-item prop="method" label="请求方式">
            <el-select v-model="apiForm.method">
              <el-option label="get" value="get"></el-option>
              <el-option label="post" value="post"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="parentId" label="父级">
            <el-cascader
              v-model="apiForm.parentId"
              :options="list"
              :props="{
                checkStrictly: true,
                emitPath: false,
                value: 'id',
                label: 'apiName',
              }"
              placeholder="请选择"
              clearable
              filterable
            ></el-cascader>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleNext(1)">下一步</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="入参配置" name="2">
        <SetParams v-model="apiForm.params" type="api"></SetParams>
        <el-button type="primary" @click="handleNext(-1)">上一步</el-button>
        <el-button type="primary" @click="handleNext(1)">下一步</el-button>
      </el-tab-pane>
      <el-tab-pane label="结果配置" name="3">
        <SetRes v-model="apiForm.res" type="multiLevel"></SetRes>
        <el-button type="primary" @click="handleNext(-1)">上一步</el-button>
        <el-button type="primary" @click="handleSave" :loading="submitLoading">
          保存
        </el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import SetParams from '@/components/PcPageSetting/PageSetting/Common/editParameters/setParams.vue'
import SetRes from '@/components/PcPageSetting/PageSetting/Common/editParameters/setRes.vue'
import { usePageSetupStore } from '@/store/pageSetupStore'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import {
  getOperationApiDetail,
  createOperationApi,
  updateOperationApi,
} from '@/api/pageSetup/index'

const pageSetupStore = usePageSetupStore()
const route = useRoute()
const currentTab = ref('1')
const apiForm = ref({
  parentId: 0,
  apiKey: '',
  apiName: '',
  url: '',
  method: 'get',
  params: [],
  res: [],
})
const ruleForm = reactive({
  apiKey: {
    required: true,
    message: '请输入key',
    trigger: 'blur',
  },
  apiName: {
    required: true,
    message: '请输入apiName',
    trigger: 'blur',
  },
  url: {
    required: true,
    message: '请输入url',
    trigger: 'blur',
  },
  method: {
    required: true,
    message: '请输入method',
    trigger: 'blur',
  },
})

/**
 * api列表
 */
const list = computed(() => pageSetupStore.PageSetupApiList || [])

onMounted(() => {
  apiForm.value.parentId = route.query?.parentId || 0
  if (route.query.id) {
    getPageSetupApiDetail()
  }
})

/**
 * 根据id获取详情
 */
const getPageSetupApiDetail = async () => {
  const res = await getOperationApiDetail(route.query.id)
  if (!res.data.data.params?.length) res.params = []
  if (!res.data.data.res?.length) res.res = []
  apiForm.value = res.data.data
}

/**
 * 下一步&上一步
 * @param {*} tab
 */
const handleNext = async (tab) => {
  let temp = Number(Number(currentTab.value) + tab).toString()
  await handleTabChange(temp, currentTab.value)
  currentTab.value = temp
}

/**
 * 处理tabChange
 * @param {*} e
 */
const apiFormRef = ref(null)
const handleTabChange = async (activeName, oldActiveName) => {
  if (activeName == oldActiveName) return false
  return await apiFormRef.value.validate((valid, fields) => {
    //console.log(fields)
    if (valid) {
      return Promise.resolve()
    } else {
      return Promise.reject()
    }
  })
}

/**
 * 点击保存按钮
 */
const submitLoading = ref(false)
const handleSave = () => {
  //console.log(apiForm.value)
  submitLoading.value = true
  let tempFn = route.query?.id ? updateOperationApi : createOperationApi
  tempFn(apiForm.value)
    .then(() => {
      ElMessage.success('保存成功')
      pageSetupStore.getPageSetupApi()
      submitLoading.value = false
    })
    .catch(() => (submitLoading.value = false))
}
</script>
<style lang="scss" scoped>
.content {
  height: 100%;
}
.flex-1 {
  flex: 1;
}
</style>
