<template>
  <div v-if="data" class="progress">
    <div
      class="active"
      :style="`background: ${data.backgroundColor}; border-radius:${data.borderRadius}px`"
    >
      <div
        v-if="pageValue"
        class="active-absolute"
        :style="`width: ${handlePageValue(pageValue, 0)}%;background:${
          data.activeColor
        };border-radius:${data.borderRadius}px`"
      ></div>
      <slot></slot>
    </div>
    <div
      class="label"
      v-if="data.showInfo"
      :style="`font-size: ${data.fontSize / 2}px;`"
    >
      {{ handlePageValue(pageValue, 0) }}
    </div>
  </div>
</template>

<script setup>
import handlePageValue from '../../../handle/handlePageValue'
defineProps({
  data: {
    type: Object,
    default: () => null,
  },
  pageValue: {
    type: Object,
    default: () => null,
  },
})
</script>
<style lang="scss" scoped>
.progress {
  width: 100%;
  height: 100%;
  display: flex;
  div {
    height: 100%;
  }
}
.active {
  flex: 1;
  display: flex;
}
.label {
  margin-left: 0 5px;
  line-height: 1;
}
</style>
