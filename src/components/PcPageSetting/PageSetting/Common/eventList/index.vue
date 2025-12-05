<template>
  <div>
    <!-- 选择操作 -->
    <el-form-item v-if="hotOperations" label="操作类型（操作类型有先后顺序）">
      <el-tree
        v-if="eventTreeRef"
        :data="hotOperations"
        :props="{ children: 'child' }"
        icon="CaretRight"
        default-expand-all
        node-key="id"
        draggable
      >
        <template #default="{ node, data: element }">
          <div class="eventItem">
            <EventItem
              :model-value="element"
              @update:model-value="(e) => updateValueCallback(e, node)"
            ></EventItem>
            <!-- 添加 -->
            <el-icon class="pointer" @click.stop="handleAddEvent(node)"
              ><CirclePlus
            /></el-icon>
            <!-- 删除 -->
            <el-icon class="ml10 pointer" @click.stop="handleDeleteEvent(node)"
              ><Delete
            /></el-icon>
            <!-- 添加子集 -->
            <el-icon
              class="ml10 pointer"
              @click.stop="handleAddChildEvent(element)"
              ><FolderAdd
            /></el-icon>
            <!-- 条件 -->
            <el-icon
              class="ml10 pointer"
              @click.stop="handleConditions(element)"
              ><Rank
                :color="element.conditionsForExecution ? '#409eff' : '#000000'"
            /></el-icon>
            <!-- 参数 -->
            <el-icon
              class="ml10 pointer"
              v-show="editParametersShow(element)"
              @click="showEditParameters(element)"
              ><Postcard
                :color="paramsHasValue(element) ? '#409eff' : '#000000'"
            /></el-icon>

            <!-- 赋值 -->
            <el-tooltip
              :show-after="500"
              effect="dark"
              content="复制"
              placement="right"
            >
              <el-icon class="ml10 pointer" @click="handleCopyEvents(element)"
                ><DocumentCopy
              /></el-icon>
            </el-tooltip>

            <!-- 定时器 -->
            <el-tooltip
              :show-after="500"
              effect="dark"
              content="定时器"
              placement="right"
            >
              <el-icon class="ml10 pointer" @click="showEditTimerModal(element)"
                ><AlarmClock
              /></el-icon>
            </el-tooltip>

            <!-- 拖动事件 -->
            <el-tooltip
              :show-after="500"
              effect="dark"
              content="按住拖动组件布局"
              placement="right"
            >
              <el-icon class="ml10 pointer" color="#409eff" :size="20"
                ><Sort
              /></el-icon>
            </el-tooltip>
          </div>
        </template>
      </el-tree>
    </el-form-item>

    <!-- 图片弹窗编辑 -->
    <el-dialog v-model="dialogVisible1" append-to-body width="80%">
      <FissionImage
        v-if="currentItem"
        v-model="currentItem.imageSetting"
        :formItemFile="{ label: '' }"
        :showPageBoxSetting="true"
        :showSettingList="['width', 'height', 'radius']"
      />
      <template #footer>
        <el-button @click="dialogVisible1 = false" type="primary">
          确 定
        </el-button>
      </template>
    </el-dialog>

    <!-- 编辑条件 -->
    <ConditionsForExecution
      @confirm="conditionsForExecutionCallback"
      ref="conditionsForExecutionRef"
    />

    <!-- 编辑参数 -->
    <EditParameters
      @confirmParameters="editParametersCallback"
      ref="editParametersRef"
    />

    <!-- 其他参数配置 -->
    <OtherParameters
      ref="otherParametersRef"
      @confirmParameters="otherParametersCallback"
    ></OtherParameters>

    <!-- 定时器的参数 -->
    <EditTimerModal
      ref="editTimerModalRef"
      @confirm="editTimerModalCallback"
    ></EditTimerModal>
  </div>
</template>

<script setup>
import { computed, ref, reactive, nextTick } from 'vue'
import { usePageSetupStore } from '@/store/pageSetupStore'
import { ElMessage } from 'element-plus'
import { handleCopyEvents } from '../../Handle/handleCopyEvents.js'
import { PageHotOperation } from './data'
import { needEditParamsList, specialParamsObject } from './common/paramsObj'
import EventItem from './eventItem.vue'
import FissionImage from '../fissionImage/index.vue'
import EditParameters from '../editParameters/index.vue'
import ConditionsForExecution from '../ConditionsForExecution/index.vue'
import OtherParameters from './otherParameters.vue'
import EditTimerModal from '../editTimerModal/index.vue'

import { cloneDeep, set, assignIn } from 'lodash'
import bus from '@/utils/bus'
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
const pageSetupStore = usePageSetupStore()

/**
 * hotOperations
 */
const hotOperations = computed({
  get() {
    if (!props.modelValue?.length) {
      emit('update:modelValue', [new PageHotOperation()])
    }
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  },
})

/**
 * 值的更新
 * @param {*} val
 * @param {*} element
 */
const updateValueCallback = (val, node) => {
  Object.assign(element, val)
}

const judgeEvent = (list) => {
  return list.every((item) => {
    let temp = false
    if (item.child) {
      temp = judgeEvent(item.child)
    }
    return (
      temp &&
      (!!item.operationUrl ||
        item.subscribeNotices.length ||
        item?.imageSetting?.imgUrl)
    )
  })
}

/**
 * 添加事件
 */
const handleAddEvent = (node) => {
  //console.log('hotOperations.value', hotOperations.value)
  if (!judgeEvent(hotOperations.value)) {
    ElMessage.error('请先输入内容')
    return
  }
  if (node.parent.data?.child) {
    node.parent.data.child.push(new PageHotOperation())
  } else {
    node.parent.data.push(new PageHotOperation())
  }
  refreshTree()
}

/**
 * 添加子集
 */
const eventTreeRef = ref(true)
const handleAddChildEvent = (item) => {
  if (!judgeEvent(hotOperations.value)) {
    ElMessage.error('请先输入内容')
    return
  }
  if (!item?.child) {
    set(item, 'child', [])
  }
  item.child.push(new PageHotOperation())
  refreshTree()
}

/**
 * 删除事件
 */
const handleDeleteEvent = (node) => {
  let list = node.parent.data?.child
    ? node.parent.data?.child
    : node.parent.data
  let index = list.findIndex((item) => item.id === node.data.id)
  list.splice(index, 1)
  refreshTree()
}

const refreshTree = () => {
  eventTreeRef.value = false
  nextTick(() => {
    eventTreeRef.value = true
  })
}

/**
 * 显示编辑参数弹窗-------------------------
 * @param {*} element
 * @param {*} index
 */
//是否需要编辑参数按钮
const editParametersShow = (elem) => {
  return needEditParamsList.includes(elem.operationType)
}

/**
 * 这里开始处理不同事件的参数
 */
const editParametersRef = ref(null)
const otherParametersRef = ref(null)
const showEditParameters = (element) => {
  currentItem.value = element
  //判断是否为特殊的参数编辑
  const res = Object.keys(specialParamsObject).some((key) => {
    if (
      key === element.operationType ||
      key === element.moduleOperation ||
      key === element.operationUrl
    ) {
      element?.params &&
        otherParametersRef.value.show({
          key,
          params: element?.params,
        })
      return true
    }
  })
  if (res) return

  let ApiObj = pageSetupStore.AloneApiList.filter(
    (once) => once.id === element.operationUrl,
  )[0]
  // 编辑api参数
  if (element.operationType === 'api') {
    editParametersRef.value.show({
      params: ApiObj.params ? ApiObj.params : [],
      type: 'multiLevel',
      apiInfo: {
        apiUrl: ApiObj.url,
        apiKey: ApiObj.apiKey,
      },
    })
  } else {
    editParametersRef.value.show({
      params: element?.params ?? [],
      type: 'multiLevel',
    })
  }
}

/**
 * 编辑参数结果回调函数
 * @param {*} list
 * @param {*} type
 */
const editParametersCallback = async (list, type) => {
  let AloneApiList = pageSetupStore.AloneApiList
  if (!list) {
    list = []
  }
  if (type === 'multiLevel') {
    if (currentItem.value.operationType == 'api') {
      let ApiObj = AloneApiList.value.filter(
        (once) => once.id === currentItem.value.operationUrl,
      )[0]
      pageSetupStore.changeAloneAPIList({ ...ApiObj, params: list }, 'edit')
      currentItem.value.apiInfo.params = list
    } else {
      currentItem.value.params = list
    }
  } else {
    currentItem.value.params = list
  }
}

/**
 * 其他参数回调
 */
const otherParametersCallback = (params) => {
  currentItem.value.params = params
}

/**
 * 判断参数是否有值
 * @param {} element
 */
const AloneApiListKey = computed(() => {
  return Object.fromEntries(
    pageSetupStore.AloneApiList.map((item) => [item.id, item]),
  )
})

const paramsHasValue = (element) => {
  if (element.operationType === 'api') {
    return AloneApiListKey.value?.[element.operationUrl]?.params
  } else {
    return element.params?.length
  }
}

/**
 * 点击编辑条件
 */
const conditionsForExecutionRef = ref(null)
const handleConditions = (element) => {
  currentItem.value = element
  conditionsForExecutionRef.value.show(element.conditionsForExecution)
}

/**
 *条件编辑
 */
const conditionsForExecutionCallback = (list) => {
  currentItem.value.conditionsForExecution = list
}

/**
 * 弹窗编辑
 */
const currentItem = ref(null)
const dialogVisible1 = ref(false)
const popEdit = (element) => {
  currentItem.value = element
  dialogVisible1.value = true
}
bus.on('popEdit', popEdit)

/**
 * 定时器
 */
const editTimerModalRef = ref(null)
const showEditTimerModal = (elem) => {
  currentItem.value = elem
  editTimerModalRef.value?.show?.(cloneDeep(elem))
}

/**
 *异步事件回调
 * @param {*} value
 */
const editTimerModalCallback = (value) => {
  assignIn(currentItem.value, value)
}
</script>
<style lang="scss" scoped>
@use './index.scss' as *;
</style>
