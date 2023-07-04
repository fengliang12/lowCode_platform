<template>
  <div>
    <!-- 选择操作 -->
    <el-form-item v-if="hotOperations" label="操作类型（操作类型有先后顺序）">
      <el-tree
        v-if="eventTreeRef"
        :data="hotOperations"
        :props="{ children: 'child' }"
        icon="CaretRight"
        node-key="id"
        draggable
      >
        <template #default="{ node, data: element }">
          <div class="mb10 eventItem">
            <el-cascader
              v-model="element.operationType"
              :options="eventTypeList"
              :show-all-levels="false"
              clearable
              filterable
              :props="{ emitPath: false }"
              placeholder="请选择"
              @change="changeEvent(element)"
            ></el-cascader>

            <!-- 1、弹窗 -->
            <upload-file
              v-if="element.operationType === 'pop_ups'"
              v-model:url="element.imageSetting.imgUrl"
              class="ml10"
              :hasEditBack="true"
              :on-success="(e) => uploadSuccessCallback(e, element)"
              @editBack="popEdit(index)"
            ></upload-file>

            <!--operationUrl： 跳转小程序内部页面 -->
            <PagepathCascader
              v-if="element.operationType === 'page_jump'"
              v-model="element.operationUrl"
              @changeInfo="pagePathCascaderChange($event, index)"
            ></PagepathCascader>

            <!--operationUrl： 自定义事件 -->
            <el-cascader
              v-if="element.operationType == 'custom_event'"
              v-model="element.operationUrl"
              :options="customEventList"
              class="ml10"
              clearable
              filterable
              :show-all-levels="false"
              :props="{
                emitPath: false,
              }"
            ></el-cascader>

            <!--operationUrl：跳转配置页面\api访问\操作组件\授权 -->
            <el-select
              v-if="selectTypeKeys.includes(element.operationType)"
              v-model="element.operationUrl"
              clearable
              filterable
              @change="selectTypeChange($event, element)"
              @visible-change="visibleChange($event, element)"
              placeholder="请选择"
              class="ml10"
            >
              <el-option
                v-for="(option, index) in selectType[element.operationType]
                  .optionList"
                :key="index"
                :label="
                  option[selectType[element.operationType].label || 'label']
                "
                :value="
                  option[selectType[element.operationType].value || 'value']
                "
              ></el-option>
            </el-select>

            <!--operationUrl： h5路径、其他小程序跳转路径 -->
            <el-input
              v-if="
                element.operationType === 'jump_h5' ||
                element.operationType === 'jump_relevance_mini'
              "
              class="ml10"
              v-model="element.operationUrl"
              placeholder="请输入路径"
            ></el-input>

            <!--linkMiniAppId： 其他小程序小程序appId -->
            <el-input
              v-if="element.operationType == 'jump_relevance_mini'"
              class="ml10 flex-1"
              v-model="element.linkMiniAppId"
              placeholder="小程序appId"
            ></el-input>

            <!-- content：自定义事件中需要额外的添加内容：提示、调用电话 -->
            <el-input
              v-if="
                customEvenKey[element.operationUrl] &&
                customEvenKey[element.operationUrl].showContent
              "
              v-model="element.content"
              placeholder="输入内容"
              class="ml10"
            ></el-input>

            <!--subscribeNotices: 订阅消息 -->
            <SubscribeNoticesSelect
              v-if="element.operationType == 'subscribe_notice'"
              v-model="element.subscribeNotices"
            ></SubscribeNoticesSelect>

            <!--moduleOperation: 组件的操作 -->
            <el-cascader
              v-if="element.operationType === 'associated_module'"
              v-model="element.moduleOperation"
              :options="getModuleOperationList(element.operationUrl)"
              clearable
              filterable
              :show-all-levels="false"
              :props="{
                emitPath: false,
              }"
              class="ml10"
            ></el-cascader>

            <!--moduleOperation: 跳转类型 navigateTo\redirectTo\reLaunch -->
            <el-select
              v-if="moduleOperationListSelect[element.operationType]"
              v-model="element.moduleOperation"
              placeholder="请选择"
              class="ml10"
              clearable
              filterable
            >
              <el-option
                v-for="option in moduleOperationListSelect[
                  element.operationType
                ]"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              ></el-option>
            </el-select>

            <!--content: 操作额外的输入框 -->
            <el-input
              v-if="
                moduleOperationListKey[element.moduleOperation] &&
                moduleOperationListKey[element.moduleOperation].props
              "
              v-model="element.content"
              v-bind="
                (moduleOperationListKey[element.moduleOperation] &&
                  moduleOperationListKey[element.moduleOperation].props) ||
                {}
              "
              class="ml10"
            ></el-input>

            <!--content: 操作动画 -->
            <el-cascader
              v-if="element.moduleOperation === 'animate'"
              v-model="element.content"
              :ref="animateCascader"
              :options="animateList"
              :props="{
                children: 'child',
                emitPath: false,
              }"
              clearable
              :show-all-levels="false"
              class="ml10"
              @change="animateCascaderChange(element, $event, index)"
            ></el-cascader>

            <!--operationUrl: 新增页面参数 -->
            <template v-if="element.operationType === 'set_params'">
              <el-cascader
                :modelValue="pageShowDataValue(element?.operationUrl)"
                :options="pageSetupStore.pageNewParams"
                separator="."
                placeholder="请选择"
                :props="{
                  value: 'key',
                  label: 'key',
                  children: 'child',
                  checkStrictly: true,
                }"
                clearable
                class="ml10"
                @change="pageNewParamsCascaderChange(element, $event)"
              ></el-cascader>

              <!--moduleOperation: 操作赋值 -->
              <el-select
                v-model="element.moduleOperation"
                @change="changeParams($event, element)"
                class="ml10"
              >
                <el-option
                  v-for="option in assignmentOption"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value"
                ></el-option>
              </el-select>
              <!-- pageValue -->
              <SetData v-model="element.pageValue" />
            </template>

            <!-- 添加 -->
            <el-icon class="ml10 pointer" @click.stop="handleAddEvent()"
              ><CirclePlus
            /></el-icon>
            <!-- 删除 -->
            <el-icon class="ml10 pointer" @click.stop="handleDeleteEvent(index)"
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
              @click.stop="handleConditions(element, index)"
              ><Rank
                :color="element.conditionsForExecution ? '#409eff' : '#000000'"
            /></el-icon>
            <!-- 参数 -->
            <el-icon
              class="ml10 pointer"
              v-show="editParametersShow(element)"
              @click="showEditParameters(element, index)"
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
        v-if="currentIndex >= 0"
        v-model="hotOperations[currentIndex].imageSetting"
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

    <!-- 编辑额外参数 -->
    <EditParameters
      @confirmParameters="editParametersCallback"
      ref="editParametersRef"
    />

    <!-- 动画参数配置 -->
    <el-dialog v-model="_params.showSetParams" append-to-body width="80%">
      <template #footer>
        <createForm
          v-model="_params.selectParams"
          :formComponentsList="_params.formComponentsList"
        />
        <el-button type="danger" @click="saveParams({ reset: true })"
          >恢复默认</el-button
        >
        <el-button @click="saveParams" type="primary"> 确 定 </el-button>
      </template>
    </el-dialog>

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
import Draggable from 'vuedraggable'
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
import PagepathCascader from '../pagePathCascader/index.vue'
import SubscribeNoticesSelect from '../subscribeNoticesSelect/index.vue'
import FissionImage from '../fissionImage/index.vue'
import EditParameters from '../editParameters/index.vue'
import ConditionsForExecution from '../ConditionsForExecution/index.vue'
import createForm from '../createForm/index.vue'
import EditTimerModal from '../editTimerModal/index.vue'

import api from '@/api/axios.ts'
import { cloneDeep, set, assignIn } from 'lodash'

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
 * 添加事件
 */
const handleAddEvent = () => {
  if (
    !hotOperations.value?.every(
      (elem) =>
        !!elem.operationUrl ||
        elem.subscribeNotices.length ||
        elem?.imageSetting?.imgUrl,
    )
  ) {
    ElMessage.error('请先输入内容')
    return
  }
  hotOperations.value.push(new PageHotOperation())
}

/**
 * 添加子集
 */
const eventTreeRef = ref(true)
const handleAddChildEvent = (item) => {
  if (
    item?.child &&
    !item?.child?.every(
      (elem) =>
        !!elem.operationUrl ||
        elem.subscribeNotices.length ||
        elem?.imageSetting?.imgUrl,
    )
  ) {
    ElMessage.error('请先输入内容')
    return
  }
  if (!item?.child) {
    set(item, 'child', [])
  }
  item.child.push(new PageHotOperation())
  console.log('item', item)
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
const pagePathCascaderChange = (event, index) => {
  hotOperations.value[index].params =
    event?.params?.length > 0 ? event.params : []
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
  let _arr = Array.from(itemsMap.values()).map((elem) => ({
    value: elem.code,
    label: `${elem.title ?? elem.code}`,
  }))

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
const animateCascaderChange = (element, value, index) => {
  const data = itemRefs?.[index].getCheckedNodes()?.[0].data?.params
  if (!element.params && data) {
    element.params = setParams(data)
  }
}

/**
 * 删除事件
 */
const handleDeleteEvent = (index) => {
  hotOperations.value.splice(index, 1)
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
const _params = reactive({
  showSetParams: false,
  selectParams: {},
  formComponentsList: [],
  selectItem: {},
  writeId: '',
})

const currentIndex = ref(-1)
const editParametersRef = ref(null)
const showEditParameters = (element, index) => {
  //判断是否为动画
  const res = Object.keys(paramsObj).some((elem) => {
    if (
      elem === element.operationType ||
      elem === element.moduleOperation ||
      elem === element.operationUrl
    ) {
      _params.showSetParams = true
      _params.selectItem = element
      _params.selectParams = element.params
        ? getParams(element.params)
        : paramsObj[elem].value
      _params.formComponentsList = paramsObj[elem].componentsList
      return true
    }
  })
  if (res) return

  let ApiObj = pageSetupStore.AloneApiList.filter(
    (once) => once.id === element.operationUrl,
  )[0]
  _params.writeId = element.operationUrl
  currentIndex.value = index
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
      params: element.params || [],
      type: 'singleLayerLevel',
    })
  }
}

/**
 * 保存参数
 * @param {*} param0
 */
const saveParams = async ({ reset = false }) => {
  if (reset) {
    await ElMessageBox.confirm('是否恢复默认配置?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
    _params.selectItem.params = null
    _params.showSetParams = false
    return
  }
  _params.showSetParams = false
  _params.selectItem.params = setParams(_params.selectParams)
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
    if (hotOperations.value[currentIndex.value].operationType == 'api') {
      let ApiObj = AloneApiList.value.filter(
        (once) => once.id === _params.writeId,
      )[0]
      await api.pageSetupApi.changeOperationApiMes({
        ...ApiObj,
        params: list,
      })
      pageSetupStore.changeAloneAPIList()
    } else {
      hotOperations.value[currentIndex.value].apiInfo.params = list
    }
  } else {
    hotOperations.value[currentIndex.value].params = list
  }
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
const handleConditions = (element, index) => {
  currentIndex.value = index
  conditionsForExecutionRef.value.show(element.conditionsForExecution)
}

/**
 *条件编辑
 */
const conditionsForExecutionCallback = (list) => {
  hotOperations.value[currentIndex.value].conditionsForExecution = list
}

/**
 * 图片上传成功
 * @param {*} e
 * @param {*} element
 */
const uploadSuccessCallback = (e, element) => {
  //设置宽高比
  if (e.ratio) {
    element.imageSetting.ratio = e.ratio
  }
  if (e.firstFrameVideo && element.imageSetting.firstFrameVideo) {
    ElMessageBox.confirm('是否替换首针图', {
      title: '提示',
      type: 'warning',
    }).then(() => {
      element.imageSetting.firstFrameVideo = e.firstFrameVideo
    })
  } else {
    element.imageSetting.firstFrameVideo = e.firstFrameVideo
  }
  element.imageSetting.multimediaType =
    e.fileType === 'image' ? 'img' : e.fileType
  UploadSuccessSetBoxInfo(element.imageSetting, e)
}

const UploadSuccessSetBoxInfo = (
  imageSetting,
  e,
  showPageBoxSetting = null,
) => {
  const { height, width = 0 } = e.el
  if (width) {
    const { width: newWidth } = imageSetting.borderDistance
    let ratio = width / height
    // value.borderDistance.width = 750;
    imageSetting.borderDistance.height = newWidth / ratio
  } else if (!showPageBoxSetting) {
    imageSetting.borderDistance.width = 0
    imageSetting.borderDistance.height = 0
  }
}

/**
 * 弹窗编辑
 */
const dialogVisible1 = ref(false)
const popEdit = (index) => {
  currentIndex.value = index
  dialogVisible1.value = true
}

/**
 * 定时器
 */
const currentItem = ref(null)
const editTimerModalRef = ref(null)
const showEditTimerModal = (elem) => {
  console.log(editTimerModalRef.value)
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
:deep(.el-input) {
  width: auto;
}

:deep(.el-tree-node__content) {
  height: auto;
}
.el-form-item {
  display: block;
}
.eventItem {
  width: 100%;
  display: flex;
  align-items: center;
}
.draggable-move-icon {
  height: 32px;
}
</style>
