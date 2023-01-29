<template>
  <el-menu
    :default-active="defaultActive"
    active-text-color="#409EFF"
    text-color="#fff"
    class="el-menu"
    :hide-timeout="0"
    :collapse="isCollapse"
  >
    <MenuItem :menus="menus"></MenuItem>
  </el-menu>
</template>

<script lang="ts" setup>
import MenuItem from './MenuItem.vue'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { useMenuStore } from '@/store/useMenuStore'
defineProps({
  isCollapse: {
    type: Boolean,
    default: true,
  },
})

const route = useRoute()
const menuStore = useMenuStore()
//路由
const menus = computed(() => menuStore.menuList)
const defaultActive = ref<string>('')

watch(
  () => route.path,
  () => {
    defaultActive.value = route.path
  },
  {
    immediate: true,
  },
)
</script>

<style lang="scss" scoped>
.el-menu {
  background-color: $menuBg;
  border: 0;
  // 菜单触碰高亮背景色
  .el-sub-menu {
    background-color: $menuBg;
  }
  .el-menu-item:hover {
    background: #112e42;
  }
  // 多级菜单触碰高亮背景色
  :deep(.el-sub-menu__title):hover {
    background-color: rgb(3, 19, 33);
  }
  :deep(.el-menu-item) {
    background-color: $subMenuBg;
  }
  :deep(.el-menu-item):hover {
    background: #112e42;
    color: #fff;
  }
}
</style>
