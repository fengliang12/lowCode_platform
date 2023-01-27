<template>
  <el-breadcrumb>
    <el-breadcrumb-item
      class="pointer"
      v-for="(item, index) in breakCrumb"
      :to="item.path"
      :key="index"
      >{{ item.meta.title }}</el-breadcrumb-item
    >
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { Ref, ref, watch } from 'vue'
import { RouteLocationMatched, useRoute, useRouter } from 'vue-router'

const route = useRoute()
const breakCrumb: Ref<RouteLocationMatched[]> = ref([])

const getBreakCrumb = () => {
  //过滤路由信息
  let matched = route.matched.filter(
    (item) => item.meta && item.meta.title && item.children.length !== 1,
  )
  const first = matched[0]

  if (first.path !== '/home') {
    matched = [{ path: '/home', meta: { title: '首页' } } as any].concat(
      matched,
    )
  }
  breakCrumb.value = matched
}

//监控路由，如果路由发生变化，面包屑跟着变化
watch(
  () => route.path,
  () => {
    getBreakCrumb()
  },
  {
    immediate: true,
  },
)
</script>

<style lang="scss" scoped></style>
