<template>
  <div class="v-center header-bar">
    <el-row
      :gutter="10"
      justify="space-between"
      align="middle"
      style="width: 100%;"
    >
      <el-col :xs="0" :sm="16" :md="16" :lg="18" :xl="18">
        <!-- 面包屑 -->
        <BreakCrumb></BreakCrumb>
      </el-col>
      <el-col :xs="24" :sm="8" :md="8" :lg="6" :xl="6">
        <el-row align="middle" justify="end">
          <!-- 用户头像 -->
          <el-col :xs="0" :sm="0" :md="4" :lg="4" :xl="4"
            ><ScreenFull></ScreenFull
          ></el-col>
          <el-col :xs="8" :sm="8" :md="4" :lg="4" :xl="4"
            ><LanguageBar></LanguageBar
          ></el-col>
          <el-col :xs="16" :sm="16" :md="16" :lg="16" :xl="16">
            <UserBar></UserBar
          ></el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import BreakCrumb from './BreakCrumb.vue'
import UserBar from './UserBar.vue'
import LanguageBar from './LanguageBar.vue'
import ScreenFull from './ScreenFull.vue'
</script>

<style lang="scss" scoped>
.header-bar {
  flex: 1;
}
</style>
