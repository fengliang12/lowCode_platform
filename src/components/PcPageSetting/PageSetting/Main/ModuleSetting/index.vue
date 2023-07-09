<template>
  <el-tabs v-if="selectedItem" v-model="activeName" class="demo-tabs">
    <!-- 属性 -->
    <el-tab-pane label="属性" name="attribute">
      <Attribute v-model="selectedItem"></Attribute>
    </el-tab-pane>

    <!-- 样式配置 -->
    <el-tab-pane label="样式" name="styleSetting">
      <StyleSetting
        v-model="selectedItem.pageStyle"
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
          v-model="selectedItem.imageSetting"
          @success="imageSuccess"
        ></FissionImage>
      </el-form>
      <SetData v-else v-model="selectedItem.pageValue"></SetData>
    </el-tab-pane>

    <!-- 内容配置 -->
    <el-tab-pane
      v-if="tabNameList.includes('setData')"
      label="内容配置"
      name="setData"
    >
      <SetData v-model="selectedItem.pageValue" />
    </el-tab-pane>

    <!-- 轮播配置 -->
    <el-tab-pane
      v-if="tabNameList.includes('swiperSetting')"
      name="swiperSetting"
      label="轮播配置"
    >
      <SwiperSetting v-model="selectedItem.carousel"></SwiperSetting>
    </el-tab-pane>

    <!-- 轮播子图 -->
    <el-tab-pane
      v-if="tabNameList.includes('childList')"
      name="childList"
      label="轮播子图"
    >
      <ChildList
        v-model="selectedItem.moduleSettings"
        :parents="selectedItem"
        @success="imageSuccess"
      ></ChildList>
    </el-tab-pane>

    <!-- 微信按钮 -->
    <el-tab-pane
      v-if="tabNameList.includes('buttonType')"
      name="buttonType"
      label="按钮类型"
    >
      <ButtonType v-model="selectedItem.buttonType"></ButtonType>
    </el-tab-pane>

    <!-- 指示点配置 -->
    <el-tab-pane
      v-if="tabNameList.includes('indicator')"
      name="indicator"
      label="指示点配置"
    >
      <Indicator v-model="selectedItem.indicator"></Indicator>
    </el-tab-pane>

    <!-- 可移动区域 -->
    <el-tab-pane
      v-if="tabNameList.includes('movableArea')"
      name="movableArea"
      label="可移动区域"
    >
      <MovableArea v-model="selectedItem.movableArea"></MovableArea>
    </el-tab-pane>

    <!-- 可移动的视图容器 -->
    <el-tab-pane
      v-if="tabNameList.includes('movableView')"
      name="movableView"
      label="视图容器"
    >
      <MovableView v-model="selectedItem.movableView"></MovableView>
    </el-tab-pane>

    <!-- 进度条 -->
    <el-tab-pane
      v-if="tabNameList.includes('progress')"
      name="progress"
      label="进度条"
    >
      <Progress
        v-model="selectedItem.progress"
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
        v-model="selectedItem.scrollView"
        :moduleSettings="selectedItem.moduleSettings"
      ></ScrollView>
    </el-tab-pane>

    <!-- 富文本 -->
    <el-tab-pane
      v-if="tabNameList.includes('richText')"
      name="richText"
      label="富文本"
    >
      <RichText v-model="selectedItem.richText"></RichText>
    </el-tab-pane>

    <!-- 吸附 -->
    <el-tab-pane
      v-if="tabNameList.includes('sticky')"
      name="sticky"
      label="吸附"
    >
      <Sticky v-model="selectedItem.sticky"></Sticky>
    </el-tab-pane>

    <!-- 共享元素 -->
    <el-tab-pane
      v-if="tabNameList.includes('shareElement')"
      name="shareElement"
      label="共享元素"
    >
      <ShareElement v-model="selectedItem.shareElement"></ShareElement>
    </el-tab-pane>

    <!-- 页面容器 -->
    <el-tab-pane
      v-if="tabNameList.includes('pageContainer')"
      name="pageContainer"
      label="页面容器"
    >
      <PageContainer v-model="selectedItem.pageContainer"></PageContainer>
    </el-tab-pane>

    <!-- 倒计时 -->
    <el-tab-pane
      v-if="tabNameList.includes('countDown')"
      name="countDown"
      label="倒计时"
    >
      <SetData class="mb10" v-model="selectedItem.pageValue" />
      <CountDown v-model="selectedItem.countDown"></CountDown>
    </el-tab-pane>

    <!-- 九宫格 -->
    <el-tab-pane
      v-if="tabNameList.includes('gridLottery')"
      name="gridLottery"
      label="九宫格"
    >
      <GridLottery v-model="selectedItem.gridLottery"></GridLottery>
    </el-tab-pane>

    <!-- 表单-->
    <el-tab-pane v-if="tabNameList.includes('form')" name="form" label="表单">
      <HotForm v-model="selectedItem.form"></HotForm>
    </el-tab-pane>

    <!-- 事件 -->
    <el-tab-pane name="events" label="事件">
      <EventCommon v-model="selectedItem.events"></EventCommon>
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
import Sticky from './Sticky/index.vue'
import ShareElement from './ShareElement/index.vue'
import GridLottery from './GridLottery/index.vue'
import PageContainer from './PageContainer/index.vue'
import CountDown from './CountDown/index.vue'
import HotForm from '../../Common/hotForm/index.vue'

import StyleSetting from '../../Common/styleSetting/index.vue'
import FissionImage from '../../Common/fissionImage/index.vue'
import SetData from '../../Common/setData/index.vue'
import EventCommon from '../../Common/eventCommon/index.vue'
import componentsMapping from '../../CommonData/componentsMapping'
import { usePageSetupStore } from '@/store/pageSetupStore'
import { merge } from 'lodash'

const emit = defineEmits(['update:modelValue', 'success'])
const props = defineProps(['modelValue', 'parents'])
const pageSetupStore = usePageSetupStore()
const optionUploadImage = ref(true)
const activeName = ref('attribute')

/**
 * 处理中组件的数据
 */
const selectedItem = computed({
  get() {
    return props.modelValue
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
  if (!selectedItem.value.moduleType) return []
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
    gridLottery: ['gridLottery'],
    movableArea: ['movableArea'],
    movableView: ['movableView'],
    richText: ['richText'],
    sticky: ['sticky'],
    shareElement: ['shareElement'],
    pageContainer: ['pageContainer'],
    countDown: ['countDown'],
    form: ['form'],
  }
  return [...tabList[selectedItem.value.moduleType], ...commonList]
})

/**
 * 组件对应的样式
 */
const styleSettingProps = computed(() => {
  return {
    font:
      selectedItem.value.moduleType === 'text' ||
      selectedItem.value.moduleType === 'common' ||
      selectedItem.value.moduleType === 'qrCode',
    bg:
      selectedItem.value.moduleType !== 'progress' &&
      selectedItem.value.moduleType !== 'scrollView',
    flex: selectedItem.value.modelValue !== 'progress',
    ratio: selectedItem.value?.imageSetting?.ratio || 0,
  }
})

/**
 * 图片上传成功后回调函数
 * @param {*} e
 */
const imageSuccess = (e) => {
  const newHeight = Number(
    (selectedItem.value.pageStyle.width / e.ratio).toFixed(0),
  )

  emit('success', e)

  if (selectedItem.value.moduleType === 'hot') {
    selectedItem.value.pageStyle.height = newHeight
    selectedItem.value.pageStyle.ratio = e.ratio
  }

  //轮播子组件返回时修改
  if (selectedItem.value.moduleType === 'carousel') {
    selectedItem.value.pageStyle.height =
      newHeight > selectedItem.value.pageStyle.height
        ? newHeight
        : selectedItem.value.pageStyle.height
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
  handleCarouselChild()
}

watch(
  () => selectedItem.value?.carousel?.nextMargin,
  () => {
    handleCarouselChild()
  },
)

watch(
  () => selectedItem.value?.carousel?.previousMargin,
  () => {
    handleCarouselChild()
  },
)

const handleCarouselChild = () => {
  if (!selectedItem.value?.carousel) return
  const { nextMargin = 0, previousMargin = 0 } = selectedItem.value.carousel
  const { width = 0 } = selectedItem.value?.pageStyle || {}
  if (width && selectedItem.value?.moduleSettings?.length) {
    selectedItem.value.moduleSettings.map((elem) => {
      const newWidth = width - nextMargin - previousMargin
      //新宽度大于老宽度不做修改
      if (newWidth > elem.pageStyle.width) {
        return
      }
      elem.pageStyle.height =
        (newWidth / elem.pageStyle.width) * elem.pageStyle.height
      elem.pageStyle.width = newWidth
      if (elem.pageStyle.height > selectedItem.value.pageStyle.height) {
        selectedItem.value.pageStyle.height = elem.pageStyle.height
      }
    })
  }
}

/**
 * 设置图片添加
 */
const setOptionUploadImage = () => {
  optionUploadImage.value = !optionUploadImage.value
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
