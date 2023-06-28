<template>
  <div
    class="flex"
    :class="wrap ? 'flex-wrap' : ''"
    v-if="pageValue && pageValue.valueType"
  >
    <slot name="table"></slot>
    <el-select
      v-model="pageValue.valueType"
      class="mr10"
      placeholder="请选择类型"
      @change="valueTypeChange"
    >
      <el-option
        v-for="item in valueType"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>

    <!-- 动态数据  -->
    <div v-if="pageValue.valueType === 'pageData'" class="flex">
      <GetPageData
        v-model="pageValue.value"
        v-model:handle="pageValue.handle"
        :disabled="disabled"
      ></GetPageData>
      <el-input
        v-model="pageValue.defaultValue"
        placeholder="输入默认数据"
      ></el-input>
    </div>

    <!-- 自定义数据 -->
    <template v-if="pageValue.valueType === 'custom'">
      <el-input
        v-if="!switchCustom"
        v-model="pageValue.value"
        placeholder="输入自定义内容"
        :disabled="disabled"
      ></el-input>
      <div v-if="update">
        <upload-file v-if="switchCustom" v-model:url="pageValue.value" />
        <el-tooltip
          :show-after="1000"
          class="vhCenter"
          effect="dark"
          :content="`切换${switchCustom ? '手动' : '上传'}`"
          placement="top-start"
        >
          <el-icon :size="20" style="margin-left: 10px;">
            <Switch @click="switchCustom = !switchCustom"
          /></el-icon>
        </el-tooltip>
      </div>
    </template>

    <slot></slot>
  </div>
</template>

<script setup lang="ts">
// PageValue {
//   value:string;
//   defaultValue:string;
//   valueType:string;
//   handle:Array[PageValueHandle];
// }

import { computed, ref } from 'vue'
import GetPageData from './getPageData.vue'
import { pageValueData } from './data'
import { valueType } from './common/pageData'

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: Object,
    default: null,
  },
  update: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  wrap: {
    type: Boolean,
    default: false,
  },
})

const switchCustom = ref(false)

/**
 * 初始化pageValue
 */
const pageValue = computed({
  get() {
    if (typeof props.modelValue !== 'object' || !props?.modelValue?.valueType) {
      emit('update:modelValue', new pageValueData())
    }
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  },
})

/**
 * 切换类型选择
 */
const valueTypeChange = () => {
  pageValue.value.value = ''
}
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
}
.flex-wrap {
  flex-wrap: wrap;
}
</style>
