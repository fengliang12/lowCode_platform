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
import { usePageSetupStore } from '@/store'
import handleStyle from '../../../Handle/style'
import bus from '@/utils/bus.js'
const props = defineProps(['data'])
const pageSetupStore = usePageSetupStore()

/**
 * 指示点数量
 */
const swiperData = computed(() => {
  return pageSetupStore?.itemsMap?.value
    ? Array.from(pageSetupStore.itemsMap.values()).filter(
        (elem) => elem.moduleType === props.data.relationSwiper,
      )?.moduleSettings
    : []
})

/**
 * 轮播指示点位置
 */
const currentIndex = ref(0)
watch(
  () => props.data.relationSwiper,
  () => {
    bus.on('relationSwiperIndex', (index) => {
      currentIndex.value = index
    })
  },
  { immediate: true },
)

/**
 * 样式
 */
const style = computed(() =>
  props.data?.indicatorStyle.map((item) => handleStyle(item)),
)
const activeStyle = computed(() =>
  props.data?.indicatorActiveStyle.map((item) => handleStyle(item)),
)
</script>
<style lang="scss" scoped></style>
