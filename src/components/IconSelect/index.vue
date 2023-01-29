<template>
  <div class="icon-list">
    <div v-for="name in icons" :key="name" @click="selectedIcon(name)">
      <component :is="name" style="width: 20px; height: 20px;"></component>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { onMounted, ref } from 'vue'
const icons = ref<Array<string>>([])
const getIcons = () => {
  for (const name in ElementPlusIconsVue) {
    icons.value.push(name)
  }
  return icons
}
onMounted(() => {
  getIcons()
})

// 选择某一个图标
const emit = defineEmits(['selected'])
const selectedIcon = (name: string) => {
  emit('selected', name)
}
</script>
<style lang="scss" scoped>
.icon-list {
  width: 100%;
  height: 300px;
  overflow-y: scroll;

  div {
    height: 20px;
    line-height: 30px;
    margin-bottom: -5px;
    cursor: pointer;
    width: 10%;
    padding: 1rem;
    float: left;
    text-align: center;
  }

  div:hover {
    background-color: palevioletred;
    color: white;
  }
}
</style>
