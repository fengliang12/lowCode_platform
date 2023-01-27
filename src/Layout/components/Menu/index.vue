<template>
  <el-menu
    :default-active="defaultActive"
    active-text-color="#409EFF"
    text-color="#fff"
    class="el-menu"
    :hide-timeout="0"
    :collapse="isCollapse"
  >
    <MenuItem :menus="routes"></MenuItem>
  </el-menu>
</template>

<script lang="ts" setup>
import MenuItem from './MenuItem.vue'
import { routes } from '@/router'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
defineProps({
  isCollapse: {
    type: Boolean,
    default: true,
  },
})

const route = useRoute()
const defaultActive = ref<string>('')

watch(
  () => route.path,
  () => {
    console.log(route.path)
    if (route.path === '/home') {
      defaultActive.value = '/'
    } else {
      defaultActive.value = route.path
    }
  },
  {
    immediate: true,
  },
)
</script>

<style lang="scss">
.el-menu {
  background-color: $menuBg;
  border: 0 !important;
  // 菜单触碰高亮背景色
  .el-sub-menu {
    background-color: $menuBg;
  }
  .el-menu-item:hover {
    background: #112e42 !important;
  }
  // 多级菜单触碰高亮背景色
  .el-sub-menu__title:hover {
    background-color: rgb(3, 19, 33) !important;
  }
  .el-menu-item {
    background-color: $subMenuBg;
  }
  .el-menu-item:hover {
    background: #112e42 !important;
    color: #fff !important;
  }
}
</style>
