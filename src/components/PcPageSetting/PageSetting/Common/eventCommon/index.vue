<template>
  <el-form v-if="eventData">
    <div v-for="(item, index) in eventData" :key="item.triggerType">
      <el-divider>
        <div class="flex alignItems">
          <el-select
            v-model="item.triggerType"
            placeholder="请选择"
            size="large"
          >
            <el-option
              v-for="item in setTriggerTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            />
          </el-select>
          <!-- 删除 -->
          <el-popconfirm title="删除" @confirm="handleDeleteEvent(index)">
            <template #reference>
              <el-icon class="ml10 pointer"><Delete /></el-icon>
            </template>
          </el-popconfirm>
          <el-popconfirm title="复制" @confirm="handleCopyEvent(item)">
            <template #reference>
              <el-icon class="ml10 pointer"><DocumentCopy /></el-icon>
            </template>
          </el-popconfirm>
          <el-popconfirm title="黏贴" @confirm="handlePasteEvent(item)">
            <template #reference>
              <el-icon class="ml10 pointer"><CopyDocument /></el-icon>
            </template>
          </el-popconfirm>
        </div>
      </el-divider>
      <SelectJumpType v-model="item.hotOperations" />
    </div>
    <!-- 添加事件 -->
    <div v-if="addTriggerTypeList" class="flex">
      <el-select v-model="newTriggerType" placeholder="请选择">
        <el-option
          v-for="item in addTriggerTypeList"
          :key="item.value"
          :value="item.value"
          :label="item.label"
        ></el-option>
      </el-select>
      <el-button class="ml10" @click="addTriggerType">新增触发类型</el-button>
    </div>
  </el-form>
</template>

<script setup>
import { computed, ref } from 'vue'
import { EventsData, triggerType } from './data'
import SelectJumpType from '../selectJumpType/index.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { handleCopyEvent } from '../../Handle/handleCopyEvent'
const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  isPage: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['update:modelValue'])

/**
 * 初始化事件对象，如果没有，默认click
 */
const eventData = computed({
  get() {
    if (!props?.modelValue?.length && !props.isPage) {
      emit('update:modelValue', [
        new EventsData({
          triggerType: 'click'
        })
      ])
    }
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  }
})

/**
 * 获取分割线设置类型
 */
const setTriggerTypeList = computed(() => {
  let list = triggerType.common.list
  if (props.isPage) {
    list = triggerType.page.list
  }

  if (!eventData.value) {
    return list
  }

  return list.map((elem) => {
    elem.disabled = !!eventData.value.find((item) => {
      return elem.value === item.triggerType
    })
    return elem
  })
})

/**
 * 新增触发类型列表
 */
const newTriggerType = ref('')
const addTriggerTypeList = computed(() => {
  if (!eventData.value.length) {
    return setTriggerTypeList
  }
  return setTriggerTypeList.value.filter((elem) => !elem.disabled)
})

/**
 * 添加Trigger
 */
const addTriggerType = () => {
  if (!newTriggerType.value) {
    return ElMessage.warning('触发类型不能为空')
  }
  eventData.value.push(new EventsData({ triggerType: newTriggerType.value }))
  newTriggerType.value = ''
}

/**
 * 删除事件
 */
const handleDeleteEvent = (index) => {
  eventData.value.splice(index, 1)
}

/**
 * 黏贴事件
 */
const handlePasteEvent = (item) => {
  const Promise = navigator.clipboard.readText()
  Promise.then((res) => {
    const copyData = JSON.parse(res)
    if (!copyData.triggerType || !copyData.hotOperations.length) {
      ElMessage.error('格式化数据失败')
      return false
    }

    ElMessageBox.confirm('确认粘贴吗到改事件吗', '提示', {
      confirmButtonText: '确认',
      cancelButtonText: '取消'
    }).then(() => {
      item.hotOperations = item.hotOperations.concat(copyData.hotOperations)
    })
  }).catch((err) => ElMessage.error(err))
}
</script>
<style lang="scss" scoped></style>
