<template>
  <el-tabs
    v-if="items"
    v-model="activeName"
    class="demo-tabs"
    @tab-click="handleClick"
  >
    <!-- 属性 -->
    <el-tab-pane label="属性" name="attribute">
      <Attribute v-model="items"></Attribute>
    </el-tab-pane>

    <!-- 样式配置 -->
    <el-tab-pane label="样式" name="styleSetting">
      <StyleSetting
        v-model="items.pageStyle"
        v-bind="styleSettingProps"
      ></StyleSetting>
    </el-tab-pane>

    <!-- 图片 -->
    <el-tab-pane
      v-if="tabNameList.includes('fissionImage')"
      label="图片"
      name="fissionImage"
    >
      <el-row class="mb20">
        <el-button @click="setOptionUploadImage">
          {{ optionUploadImage ? '添加图片数据' : '上传图片' }}
        </el-button>
      </el-row>
      <el-form v-if="optionUploadImage">
        <FissionImage
          v-model="items.imageSetting"
          @success="imageSuccess"
        ></FissionImage>
      </el-form>
      <SetData v-else v-model="items.pageValue"></SetData>
    </el-tab-pane>

    <!-- 内容配置 -->
    <el-tab-pane
      v-if="tabNameList.includes('setData')"
      label="内容配置"
      name="setData"
    >
      <SetData v-model="items.pageValue" />
    </el-tab-pane>

    <!-- 轮播配置 -->
    <el-tab-pane
      v-if="tabNameList.includes('swiperSetting')"
      name="swiperSetting"
      label="轮播配置"
    >
      <SwiperSetting v-model="items.carousel"></SwiperSetting>
    </el-tab-pane>

    <!-- 轮播子图 -->
    <el-tab-pane
      v-if="tabNameList.includes('childList')"
      name="childList"
      label="轮播子图"
    >
      <ChildList v-model="items.moduleSettings" :parents="items"></ChildList>
    </el-tab-pane>

    <!-- 微信按钮 -->
    <el-tab-pane
      v-if="tabNameList.includes('buttonType')"
      name="buttonType"
      label="按钮类型"
    >
      <ButtonType v-model="items.buttonType"></ButtonType>
    </el-tab-pane>

    <!-- 指示点配置 -->
    <el-tab-pane
      v-if="tabNameList.includes('indicator')"
      name="indicator"
      label="指示点配置"
    >
      <Indicator v-model="items.indicator"></Indicator>
    </el-tab-pane>

    <!-- 可移动区域 -->
    <el-tab-pane
      v-if="tabNameList.includes('movableArea')"
      name="movableArea"
      label="可移动区域"
    >
      <MovableArea v-model="items.movableArea"></MovableArea>
    </el-tab-pane>

    <!-- 可移动的视图容器 -->
    <el-tab-pane
      v-if="tabNameList.includes('movableView')"
      name="movableView"
      label="视图容器"
    >
      <MovableView v-model="items.movableView"></MovableView>
    </el-tab-pane>

    <!-- 进度条 -->
    <el-tab-pane
      v-if="tabNameList.includes('progress')"
      name="progress"
      label="进度条"
    >
      <Progress
        v-model="items.progress"
        :strokeWidth="modelValue.pageStyle.width"
        :borderRadius="modelValue.pageStyle.borderRadius"
      ></Progress>
    </el-tab-pane>

    <!-- 滚动条 -->
    <el-tab-pane
      v-if="tabNameList.includes('scrollView')"
      name="scrollView"
      label="滚动条"
    >
      <ScrollView
        v-model="items.scrollView"
        :moduleSettings="items.moduleSettings"
      ></ScrollView>
    </el-tab-pane>

    <!-- 滚动条 -->
    <el-tab-pane
      v-if="tabNameList.includes('richText')"
      name="richText"
      label="富文本"
    >
      <RichText v-model="items.richText"></RichText>
    </el-tab-pane>

    <!-- 事件 -->
    <el-tab-pane name="events" label="事件">
      <EventCommon v-model="items.events"></EventCommon>
    </el-tab-pane>
  </el-tabs>
</template>
<script setup>
import { ref, computed, watch } from 'vue'

import Attribute from './Attribute/index.vue'
import SwiperSetting from './SwiperSetting/index.vue'
import ChildList from './ChildList/index.vue'
import ButtonType from './ButtonType/index.vue'
import Indicator from './Indicator/index.vue'
import MovableArea from './MovableArea/index.vue'
import MovableView from './MovableView/index.vue'
import Progress from './Progress/index.vue'
import ScrollView from './ScrollView/index.vue'
import RichText from './RichText/index.vue'

import StyleSetting from '../../Common/styleSetting/index.vue'
import FissionImage from '../../Common/fissionImage/index.vue'
import SetData from '../../Common/setData/index.vue'
import EventCommon from '../../Common/eventCommon/index.vue'
import componentsMapping from '../../CommonData/componentsMapping'
import { usePageSetupStore } from '@/store'
import { merge } from 'lodash'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
const pageSetupStore = usePageSetupStore()
const optionUploadImage = ref(true)
const activeName = ref('attribute')

/**
 * 处理中组件的数据
 */
const items = computed({
  get() {
    console.log('选中的组件', props.modelValue)
    return props.modelValue?.code ? props.modelValue : null
  },
  set(val) {
    emit('update:modelValue', merge(props.modelValue, val))
  },
})

watch(
  () => props.modelValue,
  () => {
    activeName.value = 'attribute'
  },
  {
    immediate: true,
  },
)
/**
 * 根据不同组件显示不同的tab
 */
const tabNameList = computed(() => {
  if (!items.value.moduleType) return []

  const commonList = ['attribute', 'styleSetting', 'events']
  const tabList = {
    common: ['setData'],
    text: ['setData'],
    hot: ['fissionImage'],
    carousel: ['swiperSetting', 'childList'],
    progress: ['progress', 'setData'],
    scrollView: ['scrollView', 'setData'],
    indicator: ['indicator'],
    weChatButton: ['buttonType'],
    slot: ['setData'],
    qrCode: ['setData'],
    gridLottery: ['childList', 'gridLottery'],
    movableArea: ['movableArea'],
    movableView: ['movableView'],
    richText: ['richText'],
  }
  return [...tabList[items.value.moduleType], ...commonList]
})

/**
 * 组件对应的样式
 */
const styleSettingProps = computed(() => {
  return {
    font:
      items.value.moduleType === 'text' ||
      items.value.moduleType === 'common' ||
      items.value.moduleType === 'qrCode',
    bg:
      items.value.moduleType !== 'progress' ||
      items.value.moduleType !== 'scrollView',
    flex: items.value.modelValue !== 'progress',
    ratio: items.value?.imageSetting?.ratio || 0,
  }
})

/**
 * 图片上传成功后回调函数
 * @param {*} e
 */
const imageSuccess = (e) => {
  const newHeight = (items.value.pageStyle.width / e.ratio).toFixed(0)
  if (items.value.moduleType === 'hot') {
    items.value.pageStyle.height = newHeight
  }

  //父元素高度跟随子元素最大高度变化
  if (
    componentsMapping?.[pageSetupStore.items?.parents?.moduleType]
      ?.followChildHeight
  ) {
    pageSetupStore.items.parents.pageStyle.height =
      newHeight > pageSetupStore.items.parents.pageStyle.height
        ? newHeight
        : pageSetupStore.items.parents.pageStyle.height
  }
}

/**
 * 设置图片添加
 */
const setOptionUploadImage = () => {
  optionUploadImage.value = !optionUploadImage.value
}

const handleClick = (tab, event) => {
  console.log(tab, event)
}
</script>
<style scoped>
:deep(.el-tabs__content) {
  overflow-y: scroll;
  height: calc(100vh - 200px);
}

:deep(.el-tabs__content::-webkit-scrollbar) {
  display: none !important;
}
</style>
