<template>
  <div class="title_box">
    <!-- <component style="width: 20px" :is="icon"></component> -->
    <span class="title"> {{ title }}</span>
  </div>
</template>

<script setup>
defineProps(['title', 'icon'])
</script>

<style lang="scss" scoped>
.title_box {
  height: 60px;
  width: 60px;
  padding: 5px;
  margin: 5px;
  background: rgba(0, 0, 0, 0.3);
  // border-radius: 10px;
  color: white;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  .title {
    // margin-top: 10px;
  }
}
</style>
