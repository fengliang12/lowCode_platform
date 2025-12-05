<template>
  <div class="draggable">
    <!-- 左边移动区域 -------->
    <div class="left">
      <el-tabs tab-position="top">
        <el-tab-pane label="组件">
          <el-collapse v-model="collapseActive">
            <el-collapse-item name="basic">
              <template #title>
                <div class="collapse-title">
                  基础组件
                  <span class="collapse-badge">{{ basicList.length }}</span>
                </div>
              </template>
              <Draggable
                :list="basicList"
                :group="{ name: 'itxst', pull: 'clone', put: false }"
                :sort="true"
                :move="leftMove"
                @end="leftEnd"
                class="left_draggable grid3"
                item-key="$index"
              >
                <template #item="{ element }">
                  <div class="item" @click="clickLeft(element.moduleType)">
                    <OnlyTitle
                      :title="componentsMapping[element.moduleType].name"
                      :icon="componentsMapping[element.moduleType].icon"
                    />
                  </div>
                </template>
              </Draggable>
            </el-collapse-item>
            <el-collapse-item name="pro">
              <template #title>
                <div class="collapse-title">
                  专业组件
                  <span class="collapse-badge">{{ proList.length }}</span>
                </div>
              </template>
              <Draggable
                :list="proList"
                :group="{ name: 'itxst', pull: 'clone', put: false }"
                :sort="true"
                :move="leftMove"
                @end="leftEnd"
                class="left_draggable grid3"
                item-key="$index"
              >
                <template #item="{ element }">
                  <div class="item" @click="clickLeft(element.moduleType)">
                    <OnlyTitle
                      :title="componentsMapping[element.moduleType].name"
                      :icon="componentsMapping[element.moduleType].icon"
                    />
                  </div>
                </template>
              </Draggable>
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
        <el-tab-pane label="页面组件树">
          <TreeModule :detail="treeDetail"></TreeModule>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 右边移动区域 -------->
    <div class="right">
      <div class="canvas-tools">
        <span class="badge">375 × 667 px / 750 × 1334 rpx</span>
        <el-switch v-model="showGrid" active-text="网格" />
      </div>
      <div class="phone-canvas glass">
        <Ruler direction="horizontal" :length="750" :scale="0.5" />
        <Ruler direction="vertical" :length="1334" :scale="0.5" />
        <Draggable
          :list="rightList"
          :scroll="true"
          :group="{ name: 'itxst', pull: false, put: true }"
          class="draggable_right_box"
          :class="{ 'no-grid': !showGrid }"
          :style="pageStyle"
          item-key="$index"
          @move="rightMove"
          @end="rightEnd"
          :handle="'.handle'"
        >
          <template #item="{ element }">
            <Common
              :data="element"
              :showDraggable="true"
              :parents="{
                moduleSettings: rightList,
              }"
            ></Common>
          </template>
        </Draggable>
      </div>
    </div>

    <!-- 编辑区 ------------->
    <div class="tab_box">
      <el-button
        v-show="tabBoxType === 'mode'"
        class="showPageSetting"
        type="primary"
        @click="setPageSetting"
        >页面编辑</el-button
      >
      <ModuleSetting
        v-if="pageSetupStore.items"
        v-show="tabBoxType === 'mode'"
        v-model="pageSetupStore.items.value"
        :parents="pageSetupStore.items.parents"
      ></ModuleSetting>

      <PageFormSetting
        v-show="tabBoxType === 'page'"
        ref="pageFormSettingRef"
        :detail="detail"
      ></PageFormSetting>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch, reactive, computed } from 'vue'
import componentsMapping from './CommonData/componentsMapping'
import PageFormSetting from './Main/PageFormSetting/index.vue'
import ModuleSetting from './Main/ModuleSetting/index.vue'
import TreeModule from './Main/TreeModule/index.vue'
import Common from './Main/Template/Common/index.vue'
import OnlyTitle from './Common/onlyTitle/index.vue'
import Ruler from './Common/Ruler/index.vue'

import { ElMessage } from 'element-plus'
import { usePageSetupStore } from '@/store/pageSetupStore'
import Draggable from 'vuedraggable'
import { initResData, moduleData } from './Main/ModuleSetting/data'
import setItemsMap from './Handle/setItemsMap'
import { cloneDeep } from 'lodash'
import handleStyle from './Handle/style'
import useDraggable from './Hooks/useDraggable'
import bus from '@/utils/bus'

const pageSetupStore = usePageSetupStore()
const props = defineProps({
  detail: {
    type: Object,
    default: () => ({}),
  },
})
//配置详情类型
const tabBoxType = ref<string>('page')

//左边列表的数据
const leftList = reactive(
  Object.keys(componentsMapping)
    .filter((elem) => !componentsMapping[elem].unComponents) //排除unComponents
    .map(
      (elem) =>
        new moduleData({
          moduleType: elem,
          ...(componentsMapping[elem]?.initData ?? {}),
        }), //返回对应的实例
    ),
)

// 分类：基础与专业
const baseTypes = [
  'common',
  'carousel',
  'indicator',
  'hot',
  'scrollView',
  'progress',
  'text',
  'slot',
  'qrCode',
  'weChatButton',
]
const proTypes = [
  'gridLottery',
  'movableArea',
  'movableView',
  'richText',
  'sticky',
  'shareElement',
  'pageContainer',
  'countDown',
  'form',
  'painter',
]
const basicList = computed(() =>
  leftList.filter((i: any) => baseTypes.includes(i.moduleType)),
)
const proList = computed(() =>
  leftList.filter((i: any) => proTypes.includes(i.moduleType)),
)

// 折叠默认同时展开
const collapseActive = ref(['basic', 'pro'])
const showGrid = ref(true)

//右边列表数据
const rightList = ref<any>([])

// 已选组件树数据与右侧画布保持一致
const treeDetail = computed(() => [
  {
    title: props.detail?.title,
    code: props.detail?.code || 'root',
    moduleSettings: rightList.value,
  },
])

//拖拽
const { leftMove, leftEnd, clickLeft, rightMove, rightEnd } =
  useDraggable(rightList)

/**
 * 监听pageStyle，给整个页面添加样式
 */
const pageStyle = ref<string>('')
watch(
  () => props.detail.pageStyle,
  (val) => {
    let {
      color,
      fontSize,
      fontWeight,
      backgroundColor,
      backgroundImage,
      backgroundRepeat,
      backgroundSize,
    } = val
    pageStyle.value = handleStyle({
      color,
      fontSize,
      fontWeight,
      backgroundColor,
      backgroundImage,
      backgroundRepeat,
      backgroundSize,
    })
  },
  { deep: true },
)

/**
 * 监听detail,detail地址发生变化，也就是接口返回值
 */
watch(
  () => props.detail,
  (val) => {
    // 刷新接口
    rightList.value = initResData(leftList, val.moduleSettings)
    //根据已经存在的值,遍历出itemMaps值
    pageSetupStore.setPageItemsMap({
      itemsMap: setItemsMap(val),
    })
  },
)

/**
 * 监听pageSetupStore.items，切换配置类型
 */
watch(
  () => pageSetupStore.items,
  () => {
    if (pageSetupStore?.items?.value) {
      tabBoxType.value = 'mode'
    } else {
      tabBoxType.value = 'page'
    }
  },
)

/**
 * 生命周期
 */
onMounted(() => {
  setPageSetting()
  //初始化一些公共的数据，放在pinia中
  pageSetupStore.getPageSetupApi()
  pageSetupStore.getTagList()
  pageSetupStore.getCrowdList()
  pageSetupStore.getPageSettingConstant()
  pageSetupStore.getPageList()
  pageSetupStore.setPageNewParams([])
  bus.on('rollbackApply', applyRollback)
})

/**
 * 切换页面编辑和组件编辑
 */
const setPageSetting = () => {
  pageSetupStore.setItems({ value: null })
}

/**
 * 保存组件
 */
const pageFormSettingRef = ref<InstanceType<typeof PageFormSetting> | null>(
  null,
)
const save = async () => {
  const pageForm = await pageFormSettingRef.value?.save()
  if (!pageForm) {
    tabBoxType.value = 'page'
    ElMessage.error('保存失败')
    return false
  }

  if (rightList.value.length === 0) {
    ElMessage.error('至少配置一条组件')
    return false
  }

  // 将所有的组件都添加到moduleSettings中
  pageForm.moduleSettings = rightList.value
  return cloneDeep(pageForm)
}

// 对外暴露方法
defineExpose({ save })

const applyRollback = (data: any) => {
  try {
    rightList.value = initResData(leftList, data?.moduleSettings || [])
    pageSetupStore.setPageItemsMap({ itemsMap: setItemsMap(data) })
    pageSetupStore.setPageNewParams(data?.params || [])
    if (data?.aloneApiLst) {
      pageSetupStore.changeAloneAPIList(data.aloneApiLst, 'init')
    }
    const {
      color,
      fontSize,
      fontWeight,
      backgroundColor,
      backgroundImage,
      backgroundRepeat,
      backgroundSize,
    } = data?.pageStyle || {}
    pageStyle.value = handleStyle({
      color,
      fontSize,
      fontWeight,
      backgroundColor,
      backgroundImage,
      backgroundRepeat,
      backgroundSize,
    })
    pageFormSettingRef.value?.apply(data)
    tabBoxType.value = 'page'
  } catch (e) {
    ElMessage.error('回滚失败')
  }
}

onUnmounted(() => {
  bus.off('rollbackApply', applyRollback)
})
</script>

<style lang="scss" scoped>
@use './index.scss' as *;
</style>
