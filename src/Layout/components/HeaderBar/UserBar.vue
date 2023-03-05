<template>
  <div class="userInfo">
    <el-dropdown
      :show-timeout="10"
      :hide-timeout="10"
      placement="bottom"
      trigger="click"
    >
      <!--用户信息弹窗开关 下拉菜单-->
      <div>
        <img
          v-if="userInfo?.avatar"
          style="width: 35px; height: 35px; border-radius: 50%;"
          :src="userInfo.avatar"
          alt="img"
        />
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <el-row>
      <el-col>
        <span style="margin-left: 10px; font-size: 15px; color: #212121;"
          >{{ userInfo?.username ? userInfo.username : '' }}
        </span>
      </el-col>
      <el-col>
        <span style="margin-left: 10px; font-size: 8px; color: gray;">
          {{ userInfo?.roleId }}
        </span>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/useUserStore'
import { computed } from 'vue'
const userStore = useUserStore()

const userInfo = computed(() => userStore.userInfo)

//退出登录
const handleLogout = () => {
  localStorage.removeItem('token')
  location.reload()
}
</script>
<style lang="scss" scoped>
.userInfo {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>
