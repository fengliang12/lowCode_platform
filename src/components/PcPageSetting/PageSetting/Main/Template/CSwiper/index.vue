<template>
  <swiper
    :modules="modules"
    :loop="data.carousel.circular"
    :speed="data.carousel.duration"
    slides-per-view="auto"
    :space-between="50"
    :autoplay="
      data.carousel.autoplay
        ? {
            delay: data.carousel.interval,
            stopOnLastSlide: false,
            disableOnInteraction: false,
          }
        : false
    "
    :observer="true"
    :observe-slide-children="true"
    :pagination="{
      el: '.swiper-pagination',
      clickable: true,
      renderBullet(index, className) {
        return `<span class=${className} style='background-color:${data.carousel.indicatorActiveColor}' swiper-pagination-bullet-custom></span>`
      },
    }"
    :navigation="{
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }"
    :allow-touch-move="true"
    :auto-height="true"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
    class="swiper-box"
  >
    <swiper-slide
      v-for="(item, index) in data.moduleSettings"
      :key="index"
      :style="`display:flex;justify-content:${data.pageStyle.justifyContent};align-items:${data.pageStyle.alignItems};`"
    >
      <Common :data="item" :parents="data"></Common>
    </swiper-slide>
    <div
      v-show="data.carousel.showPoint"
      @click.stop="click"
      class="swiper-pagination"
    ></div>
    <div @click.stop="click" class="swiper-button-prev" />
    <div @click.stop="click" class="swiper-button-next" />
  </swiper>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Scrollbar, Autoplay } from 'swiper'
import Common from '../Common/index.vue'
import bus from '@/utils/bus.js'

// 引入swiper样式（按需导入）
import 'swiper/css'
import 'swiper/css/pagination' // 轮播图底面的小圆点
import 'swiper/css/navigation' // 轮播图两边的左右箭头
import 'swiper/css/scrollbar' // 轮播图的滚动条

// 在modules加入要使用的模块
const modules = [Autoplay, Pagination, Navigation, Scrollbar]

const props = defineProps(['data'])
console.log('props.data', props.data)
const onSwiper = (index) => {
  console.log('onSwiper', index)
  bus.emit('relationSwiperIndex', index)
}

const onSlideChange = () => {}
</script>

<style lang="scss" scoped>
.swiper-box {
  width: 100%;
  height: 100% !important;
}
.swiper-autoheight,
.swiper-autoheight .swiper-slide {
  width: 100%;
  height: 100%;
}
</style>
