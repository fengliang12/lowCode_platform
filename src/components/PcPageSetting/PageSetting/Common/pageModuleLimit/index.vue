<template>
  <div class="flex" v-if="limit">
    <el-form-item label="线上/线下">
      <el-select
        v-model="limit.channelSource"
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
        v-model="limit.crowdIds"
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
        v-model="limit.customerTags"
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
      <el-select v-model="limit.gradeStatus" placeholder="请选择" clearable>
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
      <el-switch v-model="limit.closeCustomerTag"></el-switch>
    </el-form-item>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { usePageSetupStore } from '@/store'
import PageModuleLimitData from './data'

const emit = defineEmits(['update:modelValue'])
const props = defineProps(['modelValue'])
const pageSetupStore = usePageSetupStore()

console.log('limit', props.modelValue)
const limit = computed({
  get() {
    if (!props.modelValue) {
      console.log('qqq')
      emit('update:modelValue', new PageModuleLimitData())
    }
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  },
})

/**
 * 线上\线下
 */
const lineOptions = reactive([
  {
    label: '线上',
    value: 'onLine',
  },
  {
    label: '线下',
    value: 'offLine',
  },
])

/**
 * 升级\降级
 */
const gradeStatusList = reactive([
  {
    label: '升级',
    value: 'upgrade',
  },
  {
    label: '降级',
    value: 'downgrade',
  },
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
