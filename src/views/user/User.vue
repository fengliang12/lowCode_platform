<template>
  <div>用户信息{{ test }}</div>
  <div @click="addAge">按钮</div>
</template>

<script setup lang="ts">
import { computed, reactive, watch } from 'vue'

const obj = reactive({
  age: 1,
})
const test = computed(() => {
  return obj.age + 2
})

const addAge = () => {
  obj.age = obj.age + 1
}

watch(test, (val) => {
  //console.log('监听', val)
})
</script>

<style lang="scss" scoped></style>
