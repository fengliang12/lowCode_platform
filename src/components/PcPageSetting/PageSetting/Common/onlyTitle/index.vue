<template>
  <div class="title_box">
    <component v-if="IconComp" :is="IconComp" class="icon" />
    <span class="title">{{ title }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import * as EPIcons from '@element-plus/icons-vue'
const props = defineProps(['title', 'icon'])
const IconComp = computed(() => {
  return (props.icon && EPIcons[props.icon]) || null
})
</script>

<style lang="scss" scoped>
.title_box {
  height: 56px;
  width: 100%;
  padding: 6px 8px;
  background: rgba(59, 130, 246, 0.08);
  border: 1px solid rgba(59, 130, 246, 0.18);
  border-radius: 8px;
  color: #000000;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  font-size: 11px;
  font-weight: 600;
  transition: all 0.2s ease;
  &:hover {
    border-color: rgba(59, 130, 246, 0.28);
    background: rgba(59, 130, 246, 0.14);
  }
}
.icon {
  width: 16px;
  height: 16px;
  margin-bottom: 3px;
}
</style>
