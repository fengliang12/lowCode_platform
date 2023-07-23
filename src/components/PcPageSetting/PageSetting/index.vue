<template>
  <div class="draggable">
    <!-- 左边移动区域 -------->
    <div class="left">
      <el-tabs tab-position="left">
        <el-tab-pane label="组件">
          <Draggable
            :list="leftList"
            :group="{ name: 'itxst', pull: 'clone', put: false }"
            :sort="true"
            :move="leftMove"
            @end="leftEnd"
            class="left_draggable"
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
        </el-tab-pane>
        <el-tab-pane label="已选组件">
          <TreeModule :detail="[detail]"></TreeModule>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 右边移动区域 -------->
    <div class="right">
      <Draggable
        :list="rightList"
        :scroll="true"
        :group="{ name: 'itxst', pull: false, put: true }"
        class="draggable_right_box"
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
import { onMounted, ref, watch, reactive } from 'vue'
import componentsMapping from './CommonData/componentsMapping'
import PageFormSetting from './Main/PageFormSetting/index.vue'
import ModuleSetting from './Main/ModuleSetting/index.vue'
import TreeModule from './Main/TreeModule/index.vue'
import Common from './Main/Template/Common/index.vue'
import OnlyTitle from './Common/onlyTitle/index.vue'

import { ElMessage } from 'element-plus'
import { usePageSetupStore } from '@/store/pageSetupStore'
import Draggable from 'vuedraggable'
import { initResData, moduleData } from './Main/ModuleSetting/data'
import setItemsMap from './Handle/setItemsMap'
import { cloneDeep } from 'lodash'
import handleStyle from './Handle/style'
import useDraggable from './Hooks/useDraggable'

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

//右边列表数据
const rightList = ref<any>([])

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

  pageForm.moduleSettings = rightList.value
  const req = cloneDeep(pageForm)
  return cloneDeep(req)
}

// 对外暴露方法
defineExpose({ save })
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
./Main/ModuleSetting/data
