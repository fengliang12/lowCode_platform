<template>
  <div
    v-if="data"
    class="box animate__animated"
    :class="`${pageSetupStore.showHotBox && 'bg'} ${
      data.moduleType === 'scrollView' &&
      !data.scrollView.enableFlex &&
      'scroll'
    } ${_data.animateValue ? `${_data.animateValue}` : ''}`"
    :style="`${style};display:${data.hide ? 'none' : ''}`"
    ref="buttonRef"
    @click="clickFn"
    @contextmenu.prevent="rightClick"
  >
    <!--复制和删除的操作弹窗 -->
    <el-popover
      :virtual-ref="buttonRef"
      :visible="_data.visible"
      virtual-triggering
      placement="right"
      :width="200"
    >
      <div class="mb10">{{ data.title }}</div>
      <div class="flexBox">
        <div class="mb10">
          <el-button class="option" @click="copy">复制</el-button>
        </div>
        <div>
          <el-button @click="deleteItem" class="option">删除</el-button>
        </div>
      </div>
    </el-popover>

    <!-- 文本 -->
    <template v-if="data.pageValue && data.moduleType === 'text'">
      {{ handlePageValue(data.pageValue) }}
    </template>

    <!-- 图片 -->
    <template v-else-if="data.moduleType === 'hot'">
      <CImage class="c-image" :data="data"></CImage>
    </template>

    <!-- 轮播图 -->
    <template v-else-if="data.moduleType === 'carousel'">
      <CSwiper :data="data"></CSwiper>
    </template>

    <!-- 指示点 -->
    <template v-else-if="data.moduleType === 'indicator'">
      <CIndicator :data="data"></CIndicator>
    </template>

    <!-- 二维码 -->
    <template v-else-if="data.moduleType === 'qrCode'">
      <CqrCode :data="data"></CqrCode>
    </template>

    <!-- 进度条 -->
    <template v-else-if="data.moduleType === 'progress'">
      <CProgress :data="data"></CProgress>
    </template>

    <!-- 九宫格 -->
    <template v-else-if="data.moduleType === 'gridLottery'">
      <CGridLottery :data="data.gridLottery"></CGridLottery>
    </template>

    <!-- 插槽 -->
    <template v-else-if="data.moduleType === 'slot'">
      <div>插槽</div>
    </template>

    <!-- 富文本 -->
    <template v-else-if="data.moduleType === 'richText'">
      <div v-html="data.richText.nodes" style="overflow: hidden;"></div>
    </template>

    <!-- 页面展示不需要特殊处理的 -->
    <template v-else-if="simpleComponents.includes(data.moduleType)">
      <div v-for="(item, idx) in data.moduleSettings" :key="idx">
        <Common :data="item" :parents="data" onlyShow></Common>
      </div>
    </template>

    <!-- 点击显示的红色边线 -->
    <div v-if="self">
      <div
        class="selBox"
        v-for="item in ['l', 'r', 't', 'b']"
        :class="item"
        :key="item"
      ></div>
    </div>

    <img
      v-if="showDraggableBox"
      class="handle pointer"
      src="@/assets/draggable_box.png"
    />
  </div>
</template>

<script setup>
import CImage from '../CImage/index.vue'
import CSwiper from '../CSwiper/index.vue'
import CqrCode from '../CqrCode/index.vue'
import CProgress from '../CProgress/index.vue'
import CIndicator from '../CIndicator/index.vue'
import CGridLottery from '../CGridLottery/index.vue'

import handleStyle from '../../../Handle/style'
import handlePageValue from '../../../Handle/handlePageValue'
import { usePageSetupStore } from '@/store/pageSetupStore'
import Common from './index.vue'
import { computed, ref, reactive } from 'vue'
import { ElMessageBox } from 'element-plus'
import setItemsMap from '../../../Handle/setItemsMap.js'
import { onMounted } from 'vue'
import cloneDeepModule from '../../../Handle/handleCloneModule'

const pageSetupStore = usePageSetupStore()
const props = defineProps(['data', 'parents', 'showDraggable'])

/**
 * 页面展示不需要特殊处理的,只需要展示样式功能即可的
 */
const simpleComponents = [
  'common',
  'scrollView',
  'movableView',
  'movableArea',
  'sticky',
  'shareElement',
  'pageContainer',
  'countDown',
  'form',
  'painter',
]

const _data = reactive({
  visible: false,
  animateValue: '',
})

/**
 * 拉取按钮是否显示,必须最上层组件，并且是relative和static
 */
const showDraggableBox = computed(() => {
  if (
    props.showDraggable &&
    (props.data?.pageStyle?.position === 'relative' ||
      props.data?.pageStyle?.position === 'static')
  ) {
    return true
  }
  return false
})

/**
 * 盒子的样式
 */
const style = computed(() => {
  if (props.data.moduleType === 'carousel') {
    const { width, height, top, left, right, bottom, position } =
      props.data.pageStyle
    return handleStyle({
      width,
      height,
      top,
      left,
      right,
      bottom,
      position,
    })
  }
  if (props.data.moduleType === 'scrollView') {
    const { direction } = props.data.scrollView
    let temp = {}
    if (direction === 'scroll-x') {
      temp = {
        'overflow-x': 'scroll',
        'overflow-y': 'hidden',
      }
    } else {
      temp = {
        'overflow-x': 'hidden',
        'overflow-y': 'scroll',
      }
    }
    return handleStyle({ ...temp, ...props.data.pageStyle })
  }
  return handleStyle(props.data.pageStyle)
})

/**
 * 点击元素
 * @param {*} e
 */
const self = computed(() => {
  return pageSetupStore?.items?.value?.code === props.data?.code
})
const clickFn = (e) => {
  if (!self.value) {
    pageSetupStore.setItems({
      value: props.data,
      parents: props.parents?.pageStyle ? props.parents : null,
    })
    e.stopPropagation()
  }
}

/**
 * 右击元素
 */
const buttonRef = ref()
const rightClick = (e) => {
  e.stopPropagation()
  _data.visible = true
}

onMounted(() => {
  document.addEventListener('click', () => {
    _data.visible = false
  })
})

/**
 * 删除当前元素
 */
const deleteItem = () => {
  ElMessageBox.confirm('确认删除', '提示', {
    confirmButtonText: '确定',
    cancelButtonClass: '取消',
    type: 'warning',
  }).then(() => {
    const index = props.parents.moduleSettings.findIndex(
      (item) => item.code === props.data.code,
    )
    props.parents.moduleSettings.splice(index, 1)
    pageSetupStore.setPageItemsMap({
      itemsMap: setItemsMap(props?.data, pageSetupStore.itemsMap, 'delete'),
    })
    if (self.value) {
      pageSetupStore.setItems({
        value: null,
      })
    }
  })
  hideVisible()
}

/**
 * 复制组件,这里不能直接copy
 */
const copy = () => {
  props.parents.moduleSettings.push(
    cloneDeepModule(props.data, pageSetupStore.itemsMap),
  )
  hideVisible()
}

/**
 * 隐藏显示
 */
const hideVisible = () => {
  _data.visible = false
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
