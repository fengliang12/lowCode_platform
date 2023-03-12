<template>
  <div>{{ test.name }}</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const test = computed(() => {
  return {
    name: '111',
  }
})

setTimeout(() => {
  test.value.name = '222'
}, 3000)
</script>

<style lang="scss" scoped></style>
