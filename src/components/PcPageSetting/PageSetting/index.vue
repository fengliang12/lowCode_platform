<template>
  <div class="draggable">
    <!-- 左边移动区域 -->
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
                />
              </div>
            </template>
          </Draggable>
        </el-tab-pane>
        <el-tab-pane label="已选组件">
          <TreeModule ref="treeModuleRef" :detail="[detail]"></TreeModule>
        </el-tab-pane>
        <el-tab-pane label="全局组件"> 暂无数据 </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 右边移动区域 -->
    <div class="right">
      <Draggable
        :list="formData"
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
            :parents="{
              moduleSettings: formData,
            }"
          ></Common>
        </template>
      </Draggable>
    </div>

    <!-- 编辑区 -->
    <div class="tab_box">
      <el-button
        v-show="tabBoxSetting === 'mode'"
        class="showPageSetting"
        type="primary"
        @click="setPageSetting"
        >页面编辑</el-button
      >
      <ModuleSetting
        v-show="tabBoxSetting === 'mode'"
        v-model="pageSetupStore.items.value"
        :parents="pageSetupStore.items.parents"
      ></ModuleSetting>

      <PageFormSetting
        v-show="tabBoxSetting === 'page'"
        ref="pageFormSettingRef"
        :detail="detail"
      ></PageFormSetting>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch, computed } from 'vue'
import componentsMapping from './CommonData/componentsMapping'
import PageFormSetting from './Main/PageFormSetting/index.vue'
import ModuleSetting from './Main/ModuleSetting/index.vue'
import TreeModule from './Main/TreeModule/index.vue'
import Common from './Main/Template/Common/index.vue'
import OnlyTitle from './Common/onlyTitle/index.vue'

import { ElMessage, ElMessageBox } from 'element-plus'
import { usePageSetupStore } from '@/store'
import Draggable from 'vuedraggable'
import { moduleData, setModule } from './data'
import setItemsMap from './Handle/setItemsMap'
import { cloneDeep } from 'lodash'
import bus from '@/utils/bus.js'
import handleStyle from './Handle/style'

const pageSetupStore = usePageSetupStore()
const formData = ref([])
const tabBoxSetting = ref('page')
const pageStyle = ref('')

const props = defineProps({
  detail: {
    type: Object,
    default: () => ({}),
  },
})

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
 * 左边列表的数据
 */
const leftList = computed(() => {
  return Object.keys(componentsMapping)
    .filter((elem) => !componentsMapping[elem].unComponents) //排除unComponents
    .map(
      (elem) =>
        new moduleData({
          moduleType: elem,
          ...(componentsMapping[elem]?.initData ?? {}),
        }), //返回对应的实例
    )
})

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
  pageSetupStore.changeAloneAPIList()
  pageSetupStore.setPageNewParams([])
})

/**
 * 监听detail
 */
watch(
  () => props.detail,
  (val) => {
    // 刷新接口
    formData.value = initResData(val.moduleSettings)
    val.moduleSetting = formData.value
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
      tabBoxSetting.value = 'mode'
    } else {
      tabBoxSetting.value = 'page'
    }
  },
)

/**
 * 数据初始化，如果数据是为null则赋初始数据，如果数据是object进行递归
 * @param {*} data
 */
const initResData = (data) => {
  data.forEach((elem) => {
    const module = leftList.value.find(
      (item) => item.moduleType === elem.moduleType,
    )
    if (module) {
      const setKey = (elem, module) => {
        Object.keys(elem).forEach((item) => {
          if (
            elem[item] === null &&
            module[item] !== null &&
            module[item] !== undefined
          ) {
            elem[item] = cloneDeep(module[item])
          } else if (
            typeof elem[item] === 'object' &&
            elem[item] !== null &&
            module[item]
          ) {
            setKey(elem[item], module[item])
          }
        })
      }
      setKey(elem, module)
    }
  })
  return data
}

/**
 * 左边只能移动到右边，不能上下移动
 */
const moveCheck = ref(false)
const leftMove = (e) => {
  const move = e.from === e.to
  moveCheck.value = move
  return !move
}

/**
 * 右边移动结束
 */
const leftEnd = (e) => {
  if (moveCheck.value) return
  const data = formData.value[e.newIndex]
  if (!data) return
  setPageData({
    index: e.newIndex,
    moduleSettings: formData.value,
    moduleType: data.moduleType,
    width: data.pageStyle.width,
    height: data.pageStyle.height,
  })
}

/**
 * 点击左边上的菜单选项,添加到对应的组件中
 */
const clickLeft = (moduleType) => {
  let { width = 750, height = 200 } =
    componentsMapping[moduleType].initData ?? {}
  if (
    !pageSetupStore.items?.value ||
    !componentsMapping[pageSetupStore.items?.value?.moduleType]?.isParent
  ) {
    // 没有选中的组件或者当前选中组件不是父类组件
    setPageData({
      index: formData.value.length,
      moduleSettings: formData.value,
      moduleType: moduleType,
      width,
      height,
    })
  } else {
    ElMessageBox.confirm(
      `添加至（${pageSetupStore.items.value.title}）中`,
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '添加到页面底部',
        type: 'warning',
      },
    )
      .then(() => {
        if (!pageSetupStore.items?.value?.moduleSettings) {
          pageSetupStore.items.value.moduleSettings = []
        }
        const { width, height } = pageSetupStore?.items?.value?.pageStyle || {}
        setPageData({
          index: pageSetupStore.items.value.moduleSettings.length,
          moduleSettings: pageSetupStore.items.value.moduleSettings,
          moduleType: moduleType,
          width,
          height,
          parents: pageSetupStore.items.value,
        })
      })
      .catch(() => {
        setPageData({
          index: formData.value.length,
          moduleSettings: formData.value,
          moduleType: moduleType,
          width,
          height,
        })
      })
  }
}

/**
 * 设置页面上显示的值
 */
const treeModuleRef = ref(null)
const setPageData = ({
  index,
  moduleSettings,
  moduleType,
  width,
  height,
  parents = null,
} = {}) => {
  const tempItem = (moduleSettings[index] = setModule({
    moduleType,
    width,
    height,
  }))

  tempItem.parentsCode = parents?.code ?? pageSetupStore.id
  pageSetupStore.setItems({
    value: tempItem,
    parents,
  })

  pageSetupStore.setPageItemsMap({
    items: tempItem,
    opt: 'add',
  })

  props.detail.moduleSettings = formData.value

  // 刷新el-tree
  bus.emit('refreshElTree')
}

/**
 * 右边只能上下移动
 * @param {*} e
 */
const rightMove = (e) => {
  return e.from === e.to
}

/**
 * 右边移动结束
 * @param {*} e
 */
const rightEnd = () => {
  // 刷新el-tree
  bus.emit('refreshElTree')
}

/**
 * 切换页面编辑和组件编辑
 */
const setPageSetting = () => {
  pageSetupStore.setItems({ value: null })
}

/**
 * 保存组件
 */
const pageFormSettingRef = ref(null)
const save = async () => {
  const pageForm = await pageFormSettingRef.value.save()
  if (!pageForm) {
    tabBoxSetting.value = 'page'
    ElMessage.error('保存失败')
    return false
  }

  if (formData.value.length === 0) {
    ElMessage.error('至少配置一条组件')
    return false
  }

  pageForm.moduleSettings = formData
  const req = cloneDeep(pageForm)
  return cloneDeep(req)
}

// 对外暴露方法
defineExpose({ save })
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
