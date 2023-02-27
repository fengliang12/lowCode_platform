<template>
  <!-- 上传完成后的预览 -->
  <div class="imgBox">
    <video
      class="img"
      v-if="checkFile(src) === 'video'"
      @canplay="loaded"
      v-bind="$attrs"
      :src="src"
      alt=""
      ref="fileRef"
    />
    <audio
      controls
      ref="fileRef"
      class="audio"
      v-else-if="checkFile(src) === 'audio'"
      @canplay="loaded"
      v-bind="$attrs"
      :src="src"
      alt=""
    />
    <img
      v-else
      @load="loaded"
      ref="fileRef"
      v-bind="$attrs"
      class="img"
      :src="src"
      alt=""
    />
  </div>
</template>

<script setup>
import { checkFile } from '@/utils/handle'
import { ref } from 'vue'
defineProps(['src'])
const emit = defineEmits(['load'])
const fileRef = ref(null)
const loaded = (e) => {
  emit('load', e)
}
defineExpose({
  fileRef,
})
</script>
<style lang="scss" scoped>
.imgBox {
  overflow: hidden;
  .img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    -webkit-user-drag: none;
    user-select: none;
  }

  .audio {
    width: 88%;
    margin: 0 6%;
  }
}
</style>
