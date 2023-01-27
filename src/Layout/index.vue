<template>
  <div class="layout">
    <el-container>
      <el-aside class="left-aside" width="auto"
        ><LogoBar :is-collapse="collapsed"></LogoBar>
        <Menu :is-collapse="collapsed"></Menu
      ></el-aside>
      <el-container>
        <el-header class="top-header v-center">
          <el-row :gutter="20">
            <el-icon
              class="expand-fold-icon"
              style="font-size: 26px; margin-right: 15px"
              @click="() => (collapsed = !collapsed)"
            >
              <component :is="collapsed ? Expand : Fold" />
            </el-icon>
            <HeaderBar></HeaderBar>
          </el-row>
        </el-header>
        <TabBar></TabBar>
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
import { ref } from 'vue'
import { isMobile } from '@/utils/isMobile'
const collapsed = ref<boolean>(false)

if (isMobile()) {
  collapsed.value = true
}
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  background-color: #fff;
  height: 100vh;
  .left-aside {
    background-color: $menuBg;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */
    overflow-x: hidden;
    overflow-y: auto;
  }

  .top-header {
    background-color: $lightGray;
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

::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
</style>
