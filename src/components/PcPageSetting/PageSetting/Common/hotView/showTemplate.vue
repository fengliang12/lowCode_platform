<template>
  <div class="divBox showHotBox" :style="style">
    <template v-if="value.pageShowData && value.pageShowData.pageValue.value">
      <img
        v-if="value.pageShowData.showType === 'image'"
        :src="
          value.pageShowData.pageValue.valueType === 'custom'
            ? value.pageShowData.pageValue.value
            : value.pageShowData.pageValue.value
        "
      />
      <template v-else>
        {{ handlePageValue(pageValue) }}
      </template>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import handleStyle from '../../Handle/style'
import handlePageValue from '../../Handle/handlePageValue'

/**
 * defineProps
 */
const props = defineProps({
  value: {
    type: Object,
    default: () => {},
  },
  //缩小倍数
  narrow: {
    type: Number,
    default: 1,
  },
})

/**
 * 热区块的样式
 */
const style = computed(() => {
  return handleStyle(props.value.pageStyle, props.narrow)
})
</script>
<style lang="scss" scoped>
.divBox {
  position: absolute;
  color: #000;
  display: flex;
  white-space: pre-wrap;
}

.showHotBox {
  border: 1px solid red;
}
</style>
