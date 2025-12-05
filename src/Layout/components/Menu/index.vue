<template>
  <el-menu
    :default-active="defaultActive"
    active-text-color="#409EFF"
    text-color="#111"
    style="height: 100%"
    class="el-menu"
    :hide-timeout="0"
    :collapse="isCollapse"
    :mode="mode"
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
  mode: {
    type: String,
    default: 'vertical',
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

  :deep(.el-menu-item):hover {
    background-color: #f5f7fa;
  }
  // 多级菜单触碰高亮背景色
  :deep(.el-sub-menu__title):hover {
    background-color: #f5f7fa;
  }

  :deep(.el-sub-menu .el-menu-item) {
    background-color: $subMenuBg;
  }
  :deep(.el-sub-menu .el-menu-item):hover {
    background: #f5f7fa;
    color: #111;
  }
}
</style>
