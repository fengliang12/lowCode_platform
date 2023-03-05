<template>
  <el-form>
    <el-form-item label="按钮类型:">
      <el-select v-model="data">
        <el-option
          v-for="item in buttonTypeList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { computed, reactive } from 'vue'
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

/**
 * 按钮类型
 */
const buttonTypeList = reactive([
  {
    value: 'getPhoneNumber',
    label: '获取手机号',
  },
  {
    value: 'contact',
    label: '微信客服',
  },
  {
    value: 'share',
    label: '分享',
  },
  {
    value: 'getPhoneNumberAndRegister',
    label: '获取手机号并静默注册',
  },
])

/**
 * 值
 */
const data = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  },
})
</script>
<style lang="scss" scoped></style>
