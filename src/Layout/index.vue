<template>
  <div class="layout">
    <el-container>
      <el-aside class="left-aside" :style="'width:' + autoWidth"
        ><LogoBar :is-collapse="collapsed"></LogoBar>
        <Menu :is-collapse="collapsed"></Menu
      ></el-aside>
      <el-container>
        <el-header class="top-header v-center">
          <el-row
            :gutter="0"
            style="display: flex; align-items: center; width: 100%"
          >
            <el-col :xs="4" :sm="4" :md="1" :lg="1" :xl="1">
              <el-icon
                class="expand-fold-icon"
                style="margin-right: 15px; font-size: 26px"
                @click="() => (collapsed = !collapsed)"
              >
                <component :is="collapsed ? Expand : Fold" />
              </el-icon>
            </el-col>
            <el-col :xs="20" :sm="20" :md="23" :lg="23" :xl="23">
              <HeaderBar></HeaderBar>
            </el-col>
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
import { computed, ref } from 'vue'
import { isMobile } from '@/utils/isMobile'
const collapsed = ref<boolean>(false)

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
    background-color: #f7f4f4;
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
