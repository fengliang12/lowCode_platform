<template>
  <el-dialog
    v-model="_data.dialog"
    :title="_data.type === 'api' ? '编辑api参数' : '携带参数'"
    width="90%"
    append-to-body
  >
    <!-- 显示apiNameslot -->
    <slot name="name"></slot>
    <div v-if="handleApiUrl" class="flex handle-api-url">
      {{ handleApiUrl }}
    </div>
    <SetParams
      v-model="_data.paramList"
      :type="_data.type"
      :showRules="_data.showRules"
    ></SetParams>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="cancel">清空编辑</el-button>
        <el-button @click="confirm">确 定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import SetParams from './setParams.vue'
import { cloneDeep } from 'lodash'
import { ElMessageBox, ElMessage } from 'element-plus'
import { usePageSetupStore } from '@/store/pageSetupStore'

const emit = defineEmits(['confirmParameters'])
const pageSetupStore = usePageSetupStore()

/**
 * 初始化数据
 */
const _data = reactive<any>({
  dialog: false,
  type: '',
  paramList: [],
  apiInfo: null,
  showRules: true,
})

/**
 * 对外提供的方法
 * @param {*} param0
 */
const show = ({ params, api, type, ruleStatus = true }: any) => {
  _data.paramList = cloneDeep(params)
  _data.apiInfo = api
  _data.type = type
  _data.showRules = ruleStatus
  _data.dialog = true
}

/**
 * 处理apiUrl
 */
const handleApiUrl = computed(() => {
  let i = 0
  if (!_data.apiInfo?.apiUrl) return ''
  return _data.apiInfo.apiUrl.replace(/@@@@/g, () => {
    return _data.paramList[i++]?.pageValue?.value || '暂无数据'
  })
})

/**
 * 确定编辑
 */
const confirm = () => {
  let check = true
  _data.paramList.forEach((param: any) => {
    if (!checkFn(param)) {
      check = false
    }
  })
  if (check) {
    emit('confirmParameters', _data.paramList)
    _data.dialog = false
  } else {
    ElMessage.error('配置不符合规范')
  }
}

/**
 * 检查参数是否符合规范
 */
const checkFn = (param: any) => {
  const { key, pageValue, child } = param
  if (!String(key) || (!pageValue && !child)) {
    return false
  }
  if (pageValue && pageValue.valueType === 'pageData' && !pageValue.value) {
    return false
  }
  if (child && child.length) {
    return child.every((elem: any) => checkFn(elem))
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
      _data.apiInfo &&
      pageSetupStore.getMinApi.minApiKey?.[_data.apiInfo.apiKey]?.params
    ) {
      emit(
        'confirmParameters',
        cloneDeep(
          pageSetupStore.getMinApi.minApiKey?.[_data.apiInfo.apiKey]?.params,
        ),
        _data.type,
      )
    } else {
      emit('confirmParameters', null, _data.type)
    }
    _data.dialog = false
  })
}

// 暴露方法
defineExpose({ show })
</script>

<style lang="scss" scoped>
.handle-api-url {
  float: left;
  margin-top: 10px;
}
</style>
