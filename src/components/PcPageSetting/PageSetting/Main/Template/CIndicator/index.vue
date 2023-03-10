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

console.log('CIndicator', props.data)

/**
 * 指示点数量
 */
const swiperData = ref([])

watch(
  () => props.data?.indicator?.relationSwiper,
  (val) => {
    console.log(222, pageSetupStore?.itemsMap?.values)
    let list = pageSetupStore?.itemsMap
      ? Array.from(pageSetupStore.itemsMap.values()).filter(
          (elem) => elem.code === val,
        )?.[0]?.moduleSettings
      : []
    console.log('list', list?.length)
    if (list?.length) {
      swiperData.value = list
    }
  },
)
console.log('swiperData', swiperData.value)

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
