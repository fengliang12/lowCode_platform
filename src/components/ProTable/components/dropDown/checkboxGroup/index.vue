<template>
  <div>
    <el-row>
      <el-checkbox v-model="checkAll" @change="handleCheckAllChange">
        全选
      </el-checkbox>
    </el-row>
    <el-checkbox-group v-model="checkedValue" @change="checkboxGroupChange">
      <el-checkbox
        class="check-box"
        v-for="(item, index) in formList"
        :key="index"
        :label="item"
      >
        {{ item.title }}
      </el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

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
    //console.log('props.modelValue', props.modelValue)
    return props.modelValue
  },
  set(val) {
    //console.log(val)
    emit('update:modelValue', val)
  },
})

// 全选
const checkAll = ref(false)
const handleCheckAllChange = (val) => {
  let initFormList = props.formList.filter((elem) => elem.unSet)
  checkedValue.value = val ? props.formList : initFormList
}

watch(
  () => checkedValue.value.length,
  (val) => {
    if (val === props.formList.length) {
      checkAll.value = true
    }
  },
  {
    immediate: true,
  },
)

/**
 * 单选
 * @param {*} val
 */
const checkboxGroupChange = () => {}
</script>

<style lang="scss" scoped>
.check-box {
  display: flex;
}
</style>
