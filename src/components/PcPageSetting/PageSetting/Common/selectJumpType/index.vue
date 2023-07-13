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
              @update:model-value="updateValue"
            ></EventItem>
            <!-- 添加 -->
            <el-icon class="ml10 pointer" @click.stop="handleAddEvent(node)"
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
              <img
                src="@/assets/images/draggable_box.png"
                class="draggable-move-icon ml10"
              />
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
import { ElMessageBox, ElMessage } from 'element-plus'
import { handleCopyEvents } from '../../Handle/handleCopyEvents.js'

import {
  EventList,
  PageHotOperation,
  assignmentOption,
  customEventList,
  authEventList,
  moduleOperationList,
  moduleCarouselOperationList,
  moduleVideoOperationList,
  gridLotteryOperationList,
  moduleOperationListKey,
  moduleOperationListSelect,
} from './data'

import paramsObj from './common/paramsObj'
import { animateList } from './common/animate'
import { setParams, getParams } from '../../Handle/handleParams'
import EventItem from './eventItem.vue'
import SetData from '../setData/index.vue'
import PagepathCascader from '../pagePathCascader/index.vue'
import SubscribeNoticesSelect from '../subscribeNoticesSelect/index.vue'
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

const updateValue = () => {}
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
 * 添加事件
 */
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
const handleAddEvent = (node) => {
  if (!judgeEvent(hotOperations.value)) {
    ElMessage.error('请先输入内容')
    return
  }
  if (node.parent.data?.child) {
    node.parent.data.child.push(new PageHotOperation())
  } else {
    node.parent.data.push(new PageHotOperation())
  }
  eventTreeRef.value = false
  nextTick(() => {
    eventTreeRef.value = true
  })
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
  eventTreeRef.value = false
  nextTick(() => {
    eventTreeRef.value = true
  })
}

/**
 * el-cascader的options属性
 */
const eventTypeList = computed(() => {
  return new EventList().filter((elem) => {
    if (elem.value !== 'set_params') {
      return true
    }
    //如果有页面数据返回true
    return !!pageSetupStore?.pageNewParams?.length
  })
})

/**
 * el-cascader选择事件
 */
const changeEvent = (item) => {
  const data = new PageHotOperation({
    operationType: item.operationType,
  })
  Object.keys(data).forEach((key) => {
    item[key] = data[key]
  })
}

/**
 * 小程序路径选择后
 */
const pagePathCascaderChange = (event, element) => {
  element.params = event?.params?.length > 0 ? event.params : []
}

/**
 * 页面赋值选择
 */
const pageNewParamsCascaderChange = (item, data) => {
  item.operationUrl = data.join('.')
}

/**
 * 操作赋值&处理倒计时
 */
const changeParams = (e, item) => {
  const setParamsType = assignmentOption.find((elem) => elem.value === e)
  if (setParamsType?.params) {
    item.params = setParamsType.params
  }
}

/**
 * 处理自定以事件\api访问事件\联动组l件\授权---------------------------------
 */

const selectType = computed(() => {
  return {
    // 跳转配置页面
    page_setting: {
      optionList: pageSetupStore.pageList,
      label: 'title',
      value: 'id',
    },
    // api访问
    api: {
      optionList: pageSetupStore.AloneApiList,
      label: 'apiName',
      value: 'id',
    },
    // 操作组件
    associated_module: {
      optionList: [],
      label: 'label',
      value: 'value',
      on: {
        'visible-change': (value) => {
          if (value) {
            setAssociatedModule()
          }
        },
      },
    },
    // 授权
    auth: {
      optionList: authEventList,
      label: 'label',
      value: 'value',
      on: {
        change: (value, element) => {
          element.params = authEventList.find((item) => {
            return item.value === value
          })?.params
        },
      },
    },
  }
})

/**
 * selectTypeKeys
 */
const selectTypeKeys = computed(() => {
  return Object.keys(selectType.value)
})

/**
 * 选择类型
 */
const selectTypeChange = (e, element) => {
  if (selectType.value[element.operationType]?.on?.change) {
    selectType.value[element.operationType].on.change(e, element)
  }
}

/**
 * 下拉框出现/隐藏时触发
 */
const visibleChange = (e, element) => {
  if (selectType.value[element.operationType]?.on?.['visible-change']) {
    selectType.value[element.operationType].on['visible-change'](e, element)
  }
}

/**
 * 获取可操作组件
 */
const setAssociatedModule = () => {
  let { itemsMap, items } = pageSetupStore
  if (!itemsMap?.values) return []
  let _arr = Array.from(itemsMap.values())
    .map((elem) => ({
      value: elem.code,
      label: `${elem.title ?? elem.code}`,
    }))
    .filter((item) => item.value)

  if (items?.value) {
    let index = Array.from(itemsMap.values()).findIndex(
      (i) => i.code == items.value.code,
    )
    if (index != -1) {
      _arr.splice(index, 1)
      _arr.unshift({
        value: items.value.code,
        label: `当前组件`,
      })
    }
  }
  selectType.value.associated_module.optionList = _arr
}

/**
 * 获取操作组件的方法类别,这里会根据选择的组件的类型，添加操作组件的方法
 */
const getModuleOperationList = (operationUrl) => {
  if (operationUrl.includes('carousel')) {
    return [...moduleOperationList, ...moduleCarouselOperationList]
  } else if (operationUrl.includes('hot')) {
    return [...moduleOperationList, ...moduleVideoOperationList]
  } else if (operationUrl.includes('gridLottery')) {
    return [...moduleOperationList, ...gridLotteryOperationList]
  } else {
    return moduleOperationList
  }
}

/**
 * 自定义事件
 */
const customEvenKey = computed(() => {
  return Object.fromEntries(customEventList.map((elem) => [elem.value, elem]))
})

/**
 * 动画选择
 */
const itemRefs = []
const animateCascader = (el) => {
  if (el) {
    itemRefs.push(el)
  }
}

//初始化params
const animateCascaderChange = (e, element) => {
  if (itemRefs?.length) {
    const itemRef = itemRefs.find((item) => {
      return item.getCheckedNodes()[0].data.value === e
    })
    if (itemRef) {
      const params = itemRef.getCheckedNodes()[0]?.data?.params
      if (params) {
        element.params = setParams(params)
      }
    }
  }
}

/**
 * 删除事件
 */
const handleDeleteEvent = (node) => {
  let list = node.parent.data?.child
    ? node.parent.data?.child
    : node.parent.data

  let index = list.findIndex((item) => item.code === node.data.code)
  list.splice(index, 1)
  eventTreeRef.value = false
  nextTick(() => {
    eventTreeRef.value = true
  })
}

/**
 * 显示编辑参数弹窗
 * @param {*} element
 * @param {*} index
 */
//是否需要编辑参数
const editParametersShow = (elem) => {
  const needEditParamsList = [
    'api',
    'page_jump',
    'jump_relevance_mini',
    'page_setting',
    'auth',
    'set_params',
    'associated_module',
    'pop_ups',
    'custom_event',
  ]
  return needEditParamsList.includes(elem.operationType)
}

/**
 * 这里开始处理不同事件的参数-------------------------
 */

const editParametersRef = ref(null)
const otherParametersRef = ref(null)
const showEditParameters = (element) => {
  currentItem.value = element
  //判断是否为自定义的弹窗
  const res = Object.keys(paramsObj).some((key) => {
    if (
      key === element.operationType ||
      key === element.moduleOperation ||
      key === element.operationUrl
    ) {
      otherParametersRef.value.show({
        key,
        params: element.params,
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
      // await api.pageSetupApi.changeOperationApiMes({
      //   ...ApiObj,
      //   params: list,
      // })
      pageSetupStore.changeAloneAPIList()
    } else {
      currentItem.value.apiInfo.params = list
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

/**
 * 处理页面参数的显示问题
 * @param {*} value
 */
const pageShowDataValue = (value) => {
  if (!value) return []
  return value.split('.')
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
