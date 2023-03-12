<template>
  <div>
    <template
      v-if="data.imageSetting?.imgUrl || data.imageSetting?.firstFrameVideo"
    >
      <ImageVideo
        :src="data.imageSetting?.imgUrl || data.imageSetting?.firstFrameVideo"
        class="img"
      ></ImageVideo>
      <ShowTemplate
        v-for="(item, index) in data.imageSetting.hotModuleSettings"
        :key="index"
        :value="item"
        :narrow="data.pageStyle.width / 750 / 2"
      ></ShowTemplate>
    </template>
    <ImageVideo
      v-else-if="data.pageValue"
      :src="handlePageValue(data.pageValue)"
      class="img"
      :style="`border-radius:${data.pageStyle.borderRadius / 2}px;`"
      alt=""
    />
  </div>
</template>

<script setup>
import ShowTemplate from '../../../Common/hotView/showTemplate.vue'
import ImageVideo from '../../../Common/imageVideo/index.vue'
import handlePageValue from '../../../Handle/handlePageValue'

const props = defineProps(['data'])
</script>

<style lang="scss" scoped>
.img {
  width: 100%;
  object-fit: cover;
  display: block;
}
</style>
