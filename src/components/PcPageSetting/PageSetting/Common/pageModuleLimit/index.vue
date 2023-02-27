<template>
  <div class="flex">
    <el-form-item label="线上/线下">
      <el-select
        v-model="modelValue.channelSource"
        clearable
        multiple
        placeholder="请选择"
      >
        <el-option
          v-for="item in lineOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="人群">
      <el-select
        v-model="modelValue.crowdIds"
        placeholder="请选择"
        clearable
        multiple
      >
        <el-option
          v-for="item in crowdList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="客户标签">
      <el-select
        v-model="modelValue.customerTags"
        placeholder="请选择"
        clearable
        multiple
      >
        <el-option
          v-for="item in tagList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="等级状态">
      <el-select
        v-model="modelValue.gradeStatus"
        placeholder="请选择"
        clearable
      >
        <el-option
          v-for="item in gradeStatusList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="关闭会员标签过滤">
      <el-switch v-model="modelValue.closeCustomerTag"></el-switch>
    </el-form-item>
  </div>
</template>

<script setup>
import { computed } from '@vue/reactivity'
import { reactive } from 'vue'
import { usePageSetupStore } from '@/store'

defineProps(['modelValue'])
const pageSetupStore = usePageSetupStore()

/**
 * 线上\线下
 */
const lineOptions = reactive([
  {
    label: '线上',
    value: 'onLine'
  },
  {
    label: '线下',
    value: 'offLine'
  }
])

/**
 * 升级\降级
 */
const gradeStatusList = reactive([
  {
    label: '升级',
    value: 'upgrade'
  },
  {
    label: '降级',
    value: 'downgrade'
  }
])

/**
 * 人群
 */
const crowdList = computed(() => {
  return pageSetupStore.crowdList
})

/**
 * 等级状态
 */
const tagList = computed(() => {
  return pageSetupStore.tagList
})
</script>
<style lang="scss" scoped>
.flex {
  display: flex;
  flex-wrap: wrap;
}
.flex .el-form-item {
  margin-right: 10px;
}
</style>
