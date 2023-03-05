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
  padding: 5px;
  margin: 5px;
  background: rgba(0, 0, 0, 0.3);
  color: white;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
}
</style>
