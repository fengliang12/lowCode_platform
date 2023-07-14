<template>
  <el-input
    v-if="switchCustom"
    class="ml10"
    v-model="operationUrl"
    placeholder="请输入小程序路径"
  ></el-input>

  <el-cascader
    v-else
    ref="cascaderRef"
    v-model="operationUrl"
    :options="pagePathList"
    :show-all-levels="false"
    placeholder="请选择"
    clearable
    filterable
    :props="{ emitPath: false }"
    @change="handleChange"
  ></el-cascader>

  <!-- 操作数据方法 -->
  <div class="ml10">
    <el-tooltip
      :show-after="500"
      effect="dark"
      :content="`切换${switchCustom ? '选择' : '手动'}`"
      placement="top-start"
    >
      <el-icon :size="16" style="margin-right: 10px">
        <Switch @click="switchCustom = !switchCustom" />
      </el-icon>
    </el-tooltip>
  </div>
</template>

<script setup>
import pagePathList from '@/components/Constant/pagePath'
import { computed, ref } from 'vue'
const emit = defineEmits(['update:modelValue', 'changeInfo'])
const switchCustom = ref(false)
const props = defineProps(['modelValue'])

const operationUrl = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  },
})

/**
 * 选择结果
 * @param {*} value
 */
const cascaderRef = ref(null)
const handleChange = () => {
  // cascaderRef.value.getCheckedNodes()[0].data 能够拿到当前节点的数据
  emit('changeInfo', cascaderRef.value.getCheckedNodes()[0].data)
}
</script>
<style lang="scss" scoped></style>
