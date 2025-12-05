<template>
  <div class="layout">
    <el-container>
      <el-container>
        <el-header class="top-header">
          <Menu :is-collapse="false" mode="horizontal"></Menu>
        </el-header>
        <el-main>
          <AppMain></AppMain>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import Menu from './components/Menu/index.vue'
import LogoBar from './components/LogoBar/index.vue'
import HeaderBar from './components/HeaderBar/index.vue'
import AppMain from './components/AppMain/index.vue'
import TabBar from './components/TabBar/index.vue'
import { Expand, Fold } from '@element-plus/icons-vue'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { isMobile } from '@/utils/isMobile'
const collapsed = ref<boolean>(false)
const route = useRoute()
const showAside = computed(() => route.path !== '/pageSetting/edit')

const autoWidth = computed(() => {
  if (collapsed.value && isMobile()) {
    return '0px'
  } else if (collapsed.value) {
    return '64px'
  } else {
    return '200px'
  }
})

if (isMobile()) {
  collapsed.value = true
}
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  background-color: #ffffff;
  height: 100vh;

  .left-aside {
    background-color: $menuBg;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */
    overflow-x: hidden;
    overflow-y: auto;
  }

  .top-header {
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.04) 0%,
      rgba(0, 0, 0, 0) 100%
    );
    border-bottom: 1px solid #e5e7eb;
    color: #111111;
  }

  .expand-fold-icon {
    cursor: pointer;
  }
  .center-area {
    flex: 1;
    padding: 20px;
    background-color: $container-bgc;
    .router-view {
      margin-bottom: 50px;
    }
  }
}

:deep(.el-main) {
  padding: 0px 10px;
}

::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
</style>
