<template>
  <div class="title">{{ title }}</div>
</template>

<script setup>
defineProps(['title'])
</script>

<style lang="scss" scoped>
.title {
  height: 60px;
  width: 60px;
  margin: 5px;
  background: rgba(0, 0, 0, 0.3);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
</style>
