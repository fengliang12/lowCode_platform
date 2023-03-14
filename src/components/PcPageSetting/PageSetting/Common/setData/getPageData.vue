<template>
  <div class="flex">
    <el-cascader
      v-if="!switchCustom"
      :options="pageSetupStore.pageDataList"
      :model-value="dPageShowDataValue(valueData)"
      placeholder="请选择数据"
      :show-all-levels="false"
      @change="cascaderChange"
      :props="{ value: 'key', children: 'child' }"
      clearable
    >
      <template v-slot="{ data }">
        <div class="content">
          <span>{{ data.label }}</span>
          <el-icon @click="handleCopyEvent(data.key)" class="ml10"
            ><DocumentCopy
          /></el-icon>
        </div>
      </template>
    </el-cascader>

    <!-- 自定义数据 -->
    <el-input
      v-if="switchCustom"
      v-model="valueData"
      :class="{ input: inputType === 'text' }"
      placeholder="输入自定义内容"
      :type="inputType || 'text'"
      resize="both"
      :disabled="disabled"
      :rows="1"
    >
    </el-input>

    <!-- 操作数据方法 -->
    <div class="icon-list">
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
      <el-tooltip
        v-if="showHandle"
        :show-after="1000"
        effect="dark"
        content="数据编辑"
        placement="top-start"
      >
        <el-icon :size="16"
          ><EditPen
            @click="editHandle"
            :color="handleData && handleData.length ? '#000000' : '#bbbbbb'"
        /></el-icon>
      </el-tooltip>
    </div>

    <!-- 编辑数据处理 -->
    <PageDataHandle
      ref="pageDataHandleRef"
      @confirm="pageDataHandleChange"
    ></PageDataHandle>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { usePageSetupStore } from '@/store/pageSetupStore'
import { dPageShowDataValue } from '../../Handle/filters'
import PageDataHandle from './pageDataHandle.vue'
import { handleCopyEvent } from '../../Handle/handleCopyEvent'

const emit = defineEmits(['update:modelValue', 'update:handle'])
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  handle: {
    type: Array,
    default: null,
  },
  inputType: {
    type: String,
    default: 'text ',
  },
  showHandle: {
    type: Boolean,
    default: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const pageSetupStore = usePageSetupStore()
const switchCustom = ref(false)

/**
 * pageValue.value
 */
const valueData = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  },
})

/**
 * 处理数据
 */
const handleData = computed({
  get() {
    return props.handle
  },
  set(val) {
    emit('update:handle', val)
  },
})

/**
 * 匹配pageDataList，如果没有匹配成功那么显示手动形式
 */
const handleSwitchCustom = () => {
  if (!valueData.value) return
  let data = pageSetupStore.pageDataList
  let keys = valueData.value.split('.')
  switchCustom.value = !keys.every((key) => {
    let item = data.find((item) => item.key === key)
    if (item) {
      if (item?.child?.length) {
        data = item.child
      }
      return true
    } else {
      return false
    }
  })
}

/**
 * 监听pageDataList
 */
watch(
  () => pageSetupStore.pageDataList,
  () => {
    handleSwitchCustom()
  },
  {
    immediate: true,
  },
)
/**
 * 多级菜单选择
 * @param {*} item
 */
const cascaderChange = (item: any) => {
  valueData.value = item.join('.')
}

/**
 * 点击数据处理图标
 */
const pageDataHandleRef = ref<InstanceType<typeof PageDataHandle> | null>(null)
const editHandle = () => {
  pageDataHandleRef.value?.show(handleData.value)
}

/**
 * 数据处理结果
 */
const pageDataHandleChange = (val: unknown[]) => {
  handleData.value = val
}
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 300px;

  .icon-list {
    padding: 0 10px;
    display: flex;
    font-size: 20px;
    .el-icon {
      cursor: pointer;
    }
  }
}

.content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.input {
  width: 200px !important;
}
</style>
