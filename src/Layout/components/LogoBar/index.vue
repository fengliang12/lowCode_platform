<template>
  <div class="logo vh-center">
    <img class="icon-image" src="@/assets/vue.svg" alt="图标" />
    <h1 v-show="!isCollapse" class="title">vue3-admin</h1>
  </div>
</template>

<script setup lang="ts">
defineProps({
  isCollapse: {
    type: Boolean,
    default: true,
  },
})
</script>

<style lang="scss" scoped>
.logo {
  .icon-image {
    margin: 20px 10px;
    width: 30px;
  }
  .title {
    color: #fff;
    font-size: 20px;
    margin: 10px;
    margin-left: 0;
  }
}
</style>
