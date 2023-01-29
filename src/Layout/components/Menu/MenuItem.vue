<template>
  <template v-for="menu in menus" :key="menu.path">
    <el-sub-menu
      v-if="menu.children && menu.children.length > 1"
      :index="menu.path"
    >
      <template #title>
        <el-icon v-if="menu.meta.icon"
          ><component :is="menu.meta.icon"></component
        ></el-icon>
        <span>{{ $t(menu.meta.title as string) }}</span>
      </template>
      <MenuItem :menus="menu.children"></MenuItem>
    </el-sub-menu>

    <el-menu-item
      v-show="menu.meta.isShow == 0"
      :index="menu.path"
      @click="toPath(menu.name)"
      v-else
    >
      <el-icon v-if="menu?.meta?.icon"
        ><component :is="menu?.meta?.icon"></component
      ></el-icon>
      <template #title>{{ $t(menu.meta.title as string) }}</template>
    </el-menu-item>
  </template>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import MenuItem from './MenuItem.vue'
defineProps({
  menus: {
    type: Array<any>,
    default: () => [],
  },
})

/**
 * 处理点击事件
 */
const router = useRouter()
const toPath = (name: string) => {
  router.push({
    name,
  })
}
</script>

<style lang="scss" scoped></style>
