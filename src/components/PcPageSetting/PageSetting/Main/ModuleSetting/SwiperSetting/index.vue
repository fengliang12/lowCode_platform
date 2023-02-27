<template>
  <FormCreate v-model="swiperData" :formItemList="formItemList" />
</template>

<script setup>
import FormCreate from '@/components/FormCreate/index.vue'
import { computed, reactive } from '@vue/reactivity'
import { usePageSetupStore } from '@/store'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
const pageSetupStore = usePageSetupStore()
const swiperData = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  },
})

/**
 * 表单列表
 */
const formItemList = reactive([
  {
    field: 'autoplay',
    title: '自动轮播',
    type: 'el-switch',
  },
  {
    field: 'circular',
    title: '循环轮播',
    type: 'el-switch',
  },
  {
    field: 'showPoint',
    title: '显示轮播点',
    type: 'el-switch',
  },
  {
    field: 'indicatorActiveColor',
    title: '选中点颜色',
    type: 'el-color-picker',
    props: {
      'show-alpha': true,
    },
  },
  {
    field: 'duration',
    title: '切换速度',
    type: 'el-input-number',
    props: {
      min: 0,
    },
  },
  {
    field: 'interval',
    title: '停留时间',
    type: 'el-input-number',
    props: {
      min: 0,
    },
  },
  {
    field: 'relationSwiper',
    title: '关联轮播',
    type: 'el-select',
    options: [],
    tips: '关联后轮播将一起切换',
    props: {
      multiple: true,
    },
    effect: {
      to: 'options',
      fetch: () => {
        let { itemsMap } = pageSetupStore
        if (!itemsMap?.values) return []
        return Array.from(itemsMap.values())
          .filter((item) => item.code.includes('carousel'))
          .map((item) => ({
            value: item.code,
            label: `${item.title ?? item.code}`,
          }))
      },
    },
  },
  {
    field: 'current',
    title: '初始显示位置',
    type: 'el-input-number',
    props: {
      min: 0,
    },
  },
  {
    field: 'vertical',
    title: '是否为纵向',
    type: 'el-switch',
  },
  {
    field: 'displayMultipleIItems',
    title: '同时显示滑块数量',
    type: 'el-input-number',
  },
  {
    field: 'syncSettings',
    title: '同步设置',
    type: 'el-switch',
  },
  {
    field: 'nextMargin',
    title: '后边距',
    type: 'el-input-number',
    props: {
      min: 0,
    },
  },
  {
    field: 'previousMargin',
    title: '前边距',
    type: 'el-input-number',
    props: {
      min: 0,
    },
  },
  {
    field: 'easingFunction',
    title: '滑块切换动画',
    type: 'el-select',
    options: [
      {
        label: '默认(default)',
        value: 'default',
      },
      {
        label: 'linear',
        value: '线性动画(linear)',
      },
      {
        value: 'easeInCubic',
        label: '缓入动画(easeInCubic)',
      },
      {
        value: 'easeOutCubic',
        label: '缓出动画(easeOutCubic)',
      },
      {
        value: 'easeInOutCubic',
        label: '缓入缓出动画(easeInOutCubic)',
      },
    ],
  },
  {
    field: 'carouselType',
    title: '轮播类型',
    type: 'el-select',
    options: [
      {
        label: '全屏',
        value: 'fullScreen',
      },
    ],
  },
  {
    field: 'pointStyle',
    title: '点类型',
    type: 'el-select',
    options: [
      {
        label: '默认',
        value: 'default',
      },
      {
        label: '扁平',
        value: 'flat',
      },
    ],
  },
  {
    field: 'zoomOut',
    title: '未选中滑块缩小倍数',
    type: 'el-input-number',
    props: {
      min: 0,
      max: 1,
      step: 0.1,
      precision: 1,
    },
  },
  {
    field: 'overlap',
    title: '是否叠加显示',
    type: 'el-switch',
  },
  {
    field: 'spacing',
    title: '叠加显示内容间距',
    type: 'el-input-number',
    props: {
      min: 0,
    },
  },
])
</script>

<style lang="scss" scoped></style>
