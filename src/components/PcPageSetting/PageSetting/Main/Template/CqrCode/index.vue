<template>
  <div>
    <qrcode-vue
      :value="handlePageValue(data.pageValue) || '测试二维码'"
      :size="data.pageStyle.width / 2"
      :background="data.pageStyle.backgroundColor || '#ffffff'"
      :foreground="data.pageStyle.color || '#000000'"
      level="H"
    />
  </div>
</template>

<script setup>
import QrcodeVue from 'qrcode.vue'
import handlePageValue from '@/components/PageSetting/Handle/handlePageValue.js'
import { watch } from 'vue'
const props = defineProps(['data'])
watch(
  () => props.data.pageStyle.width,
  (val) => (props.data.pageStyle.height = val),
  {
    immediate: true
  }
)
</script>

<style lang="scss" scoped></style>
