<template>
  <el-dialog
    v-model="dialog"
    :title="paramsData.type === 'api' ? '编辑api参数' : '携带参数'"
    width="90%"
    append-to-body
  >
    <!-- 显示apiNameslot -->
    <slot name="name"></slot>
    <div class="flex">{{ handleApiUrl }}</div>
    <SetParams
      v-model="paramsData.paramList"
      :type="paramsData.type"
      :hideRules="paramsData.hideRules"
    ></SetParams>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="cancel">清空编辑</el-button>
        <el-button @click="confirm">确 定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import SetParams from './setParams.vue'
import { cloneDeep } from 'lodash'
import { ElMessageBox, ElMessage } from 'element-plus'
import { usePageSetupStore } from '@/store'

const emit = defineEmits(['confirmParameters'])
const pageSetupStore = usePageSetupStore()

/**
 * 初始化
 */
const dialog = ref(false)
const paramsData = reactive({
  type: '',
  paramList: [],
  apiInfo: null,
  hideRules: true,
})

/**
 * 对外提供的方法
 * @param {*} param0
 */
const show = ({ params, api, type, ruleStatus = false }) => {
  paramsData.paramList = cloneDeep(params)
  paramsData.apiInfo = api
  paramsData.type = type
  paramsData.hideRules = ruleStatus
  dialog.value = true
}

/**
 * 处理apiUrl
 */
const handleApiUrl = computed(() => {
  let i = 0
  if (!paramsData.apiInfo?.apiUrl) return ''
  return paramsData.apiInfo.apiUrl.replace(/@@@@/g, () => {
    return paramsData.paramList[i++].pageValue.value || '暂无数据'
  })
})

/**
 * 确定编辑
 */
const confirm = () => {
  let check = true
  paramsData.paramList.forEach((param) => {
    if (!checkFn(param)) {
      check = false
    }
  })
  if (check) {
    emit('confirmParameters', paramsData.paramList)
    dialog.value = false
  } else {
    ElMessage.error('配置不符合规范')
  }
}

/**
 * 检查参数是否符合规范
 */
const checkFn = (param) => {
  const { key, pageValue, child } = param
  if (!String(key) || (!pageValue && !child)) {
    return false
  }
  if (pageValue && pageValue.valueType === 'pageData' && !pageValue.value) {
    return false
  }
  if (child && child.length) {
    return child.every((elem) => checkFn(elem))
  }
  return true
}

/**
 * 取消编辑
 */
const cancel = () => {
  ElMessageBox.confirm('取消后参数将恢复默认值，确认取消编辑吗?', '提示', {
    cancelButtonText: '取消',
    confirmButtonText: '确定',
  }).then(() => {
    if (
      paramsData.apiInfo &&
      pageSetupStore.getMinApi.minApiKey?.[paramsData.apiInfo.apiKey]?.params
    ) {
      emit(
        'confirmParameters',
        cloneDeep(
          pageSetupStore.getMinApi.minApiKey?.[paramsData.apiInfo.apiKey]
            ?.params,
        ),
        paramsData.type,
      )
    } else {
      emit('confirmParameters', null, paramsData.type)
    }
    dialog.value = false
  })
}

defineExpose({ show })
</script>

<style lang="scss" scoped></style>
