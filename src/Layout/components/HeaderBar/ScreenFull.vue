<template>
  <div @click="onToggle">
    <img
      v-if="isFullscreen"
      src="../../../assets/images/notFull.png"
      style="width: 25px; height: 25px;"
    />
    <img
      v-else
      src="../../../assets/images/isFull.png"
      style="width: 25px; height: 25px;"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import screenfull from 'screenfull'

const isFullscreen = ref(false)

// 监听变化
const change = () => {
  isFullscreen.value = screenfull.isFullscreen
}

// 设置监听器
onMounted(() => {
  screenfull.on('change', change)
})

// 删除监听器
onUnmounted(() => {
  screenfull.off('change', change)
})

// 切换事件
const onToggle = () => {
  screenfull.toggle()
}
</script>
<style lang="scss" scoped></style>
