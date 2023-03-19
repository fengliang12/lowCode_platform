<template>
  <div
    v-for="(item, index) in swiperData"
    :key="index"
    :style="
      currentIndex === index
        ? activeStyle[index] || activeStyle[0]
        : style[index] || style[0]
    "
  ></div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { usePageSetupStore } from '@/store/pageSetupStore'
import handleStyle from '../../../Handle/style'
import bus from '@/utils/bus.js'
const props = defineProps(['data'])
const pageSetupStore = usePageSetupStore()

/**
 * 样式
 */
const style = computed(() =>
  props.data?.indicator?.indicatorStyle?.map((item) => handleStyle(item)),
)
const activeStyle = computed(() =>
  props.data?.indicator?.indicatorActiveStyle.map((item) => handleStyle(item)),
)

/**
 * 指示点数量
 */
const swiperData = ref(0)

watch(
  () => props.data?.indicator?.relationSwiper,
  (val) => {
    let list = pageSetupStore?.itemsMap
      ? Array.from(pageSetupStore.itemsMap.values()).filter(
          (elem) => elem.code === val,
        )?.[0]?.moduleSettings
      : []
    swiperData.value = list?.length ? list?.length : 0
  },
  {
    immediate: true,
  },
)

/**
 * 轮播指示点位置
 */
const currentIndex = ref(0)
watch(
  () => props.data.relationSwiper,
  () => {
    bus.on('relationSwiperIndex', (swiper) => {
      if (swiper.code === props.data.indicator.relationSwiper) {
        currentIndex.value = swiper.index
      }
    })
  },
  { immediate: true },
)
</script>
<style lang="scss" scoped></style>
