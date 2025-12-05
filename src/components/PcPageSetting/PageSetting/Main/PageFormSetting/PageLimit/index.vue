<template>
  <div>
    <el-form>
      <el-form-item label="使用条件限制">
        <el-switch
          v-model="usePageLimit"
          class="mb10"
          active-text="是"
          inactive-text="否"
        ></el-switch>
      </el-form-item>
      <template v-if="usePageLimit">
        <el-form-item label="筛选关系">
          <el-switch
            v-model="pageLimitInclude"
            active-text="包含"
            inactive-text="一致"
          ></el-switch>
        </el-form-item>
        <el-button>重置条件</el-button>
      </template>

      <el-divider>限制条件</el-divider>
      <PageModuleLimit v-model="pageLimit"></PageModuleLimit>
    </el-form>
  </div>
</template>

<script setup>
import { usePageSetupStore } from '@/store/pageSetupStore'
import { computed, ref } from 'vue'
import PageModuleLimit from '../../../Common/pageModuleLimit/index.vue'
const pageSetupStore = usePageSetupStore()

/**
 * 使用条件限制
 */
const usePageLimit = computed({
  get() {
    return pageSetupStore.usePageLimit
  },
  set(val) {
    pageSetupStore.usePageLimit = val
  },
})

/**
 * 筛选关系
 */
const pageLimitInclude = computed({
  get() {
    return pageSetupStore.pageLimitInclude
  },
  set(val) {
    pageSetupStore.pageLimitInclude = val
  },
})

/**
 * 限制条件
 */
const pageLimit = computed({
  get() {
    return pageSetupStore.pageLimit
  },
  set(val) {
    pageSetupStore.setPageLimit(val)
  },
})
</script>

<style lang="scss" scoped></style>
