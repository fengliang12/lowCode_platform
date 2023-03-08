<template>
  <div class="flex">
    <el-select v-model="modelValue.type" placeholder="选择类型" class="mr10">
      <el-option
        v-for="item in dateTypeList"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>

    <!-- 固定日期 -->
    <el-date-picker
      v-if="modelValue.type === 'fixed'"
      v-model="modelValue.value"
      type="date"
      value-format="yyyy-MM-dd"
      class="mr10"
      placeholder="选择日期"
    >
    </el-date-picker>

    <!-- 相对日期 -->
    <el-input-number
      class="mr10"
      style="width: 200px"
      v-if="modelValue.type === 'relative'"
      v-model="modelValue.value"
      placeholder="输入自定义内容"
    />

    <el-tooltip
      v-if="modelValue.type === 'relative'"
      content="正数为相对当前日期往后推几天，负数为相对当前日期往前推几天"
      placement="top-start"
    >
      <i class="el-icon-warning-outline"></i>
    </el-tooltip>
    <slot></slot>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
defineProps(['modelValue'])

/**
 * 日期类型
 */
const dateTypeList = reactive([
  {
    label: '相对当前日期',
    value: 'relative',
  },
  {
    label: '固定日期',
    value: 'fixed',
  },
])
</script>
<style lang="scss" scoped></style>
