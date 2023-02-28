<template>
  <Teleport to="body">
    <PcPageSetting class="pcPageSetting"></PcPageSetting>
  </Teleport>
</template>

<script setup lang="ts">
import PcPageSetting from '@/components/PcPageSetting/index.vue'
</script>

<style lang="scss" scoped>
.pcPageSetting {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: 100;
  background-color: #fff;
}
</style>
