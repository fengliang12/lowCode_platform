<template>
  <div>
    <el-row>
      <el-checkbox v-model="checkAll" @change="handleCheckAllChange">
        全选
      </el-checkbox>
    </el-row>
    <el-checkbox-group :modelValue="checkedValue" @change="checkboxGroupChange">
      <el-checkbox
        v-for="(item, index) in formList"
        :key="index"
        :label="item"
      ></el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  formList: {
    type: Array,
    default: () => [],
  },
})
const emit = defineEmits(['update:modelValue'])

const checkedValue = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  },
})

// 全选
const checkAll = ref(false)
const handleCheckAllChange = (val) => {
  let initFormList = props.formList.filter((elem) => elem.unSet)
  checkedValue.value = val ? props.formList : initFormList
}

/**
 * 单选
 * @param {*} val
 */
const checkboxGroupChange = (val) => {
  checkedValue.value = val
  if (checkedValue.value.length === props.formList.length) {
    checkAll.value = true
  }
}
</script>
