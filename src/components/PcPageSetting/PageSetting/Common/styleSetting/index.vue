<template>
  <div class="style-setting">
    <el-form>
      <slot></slot>
    </el-form>
    <FormCreate v-model="styleData" :formList="formItemList"> </FormCreate>
    <el-row>
      <el-divider>条件样式</el-divider>
      <el-col>
        <el-button @click="addExecutionStyle">新增条件样式</el-button>
      </el-col>
      <el-col class="mt-10">
        <el-collapse>
          <el-collapse-item
            v-for="(item, index) in executionAndStyles"
            :key="index"
          >
            <template #title>
              <el-button
                @click.stop="
                  showConditionsForExecution(item.conditionsForExecution, index)
                "
                >条件 {{ index + 1 }}</el-button
              >
              <el-select
                :model-value="Object.keys(item.pageStyle)"
                multiple
                collapse-tags
                collapse-tags-tooltip
                class="m-2 ml10"
                placeholder="请选择样式"
                @change="(e:any) => onChange(e, item)"
              >
                <el-option
                  v-for="item in formItemList"
                  :key="item.field"
                  :label="item.title"
                  :value="item.field"
                />
              </el-select>
            </template>
            <FormCreate
              v-model="item.pageStyle"
              :formList="filterStyleList(item.pageStyle) || []"
            >
            </FormCreate>
          </el-collapse-item>
        </el-collapse>
      </el-col>
    </el-row>
    <!-- 编辑条件 -->
    <ConditionsForExecution
      ref="conditionsForExecutionRef"
      @confirm="conditionsForExecutionChange"
    ></ConditionsForExecution>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { formList } from './data'
import FormCreate from '@/components/FormCreate/index.vue'
import ConditionsForExecution from '../../Common/ConditionsForExecution/index.vue'

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: Object,
    default: null,
  },
  font: {
    type: Boolean,
    default: true,
  },
  box: {
    type: Boolean,
    default: true,
  },
  bg: {
    type: Boolean,
    default: true,
  },
  flex: {
    type: Boolean,
    default: true,
  },
  custom: {
    type: Boolean,
    default: true,
  },
  ratio: {
    type: Number,
    default: 0,
  },
})

/**
 * 初始化styleData
 */
const styleData = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  },
})

/**
 * 获取动态表单配置列表
 */
const formItemList = computed(() => {
  let arr: any[] = []
  let componentsList = formList({ ratio: props.ratio, value: props.modelValue })
  if (props.box) {
    arr = arr.concat(componentsList.boxList)
  }
  if (props.bg) {
    arr = arr.concat(componentsList.backgroundList)
  }
  if (props.font) {
    arr = arr.concat(componentsList.fontList)
  }
  if (props.flex) {
    arr = arr.concat(componentsList.flexList)
  }
  if (props.custom) {
    arr = arr.concat(componentsList.customList)
  }
  if (props.ratio) {
    arr.forEach((item) => {
      if (item.field === 'width') {
        item.button = '根据高度设置'
      }
      if (item.field === 'height') {
        item.button = '根据宽度设置'
      }
    })
  }
  return arr
})

const executionAndStyles = ref<any>([])
const addExecutionStyle = () => {
  const data = {
    conditionsForExecution: null,
    pageStyle: {},
  }
  if (!executionAndStyles.value?.length) {
    executionAndStyles.value = [data]
  } else {
    executionAndStyles.value.push(data)
  }
}

const onChange = (e: Array<string>, item: any) => {
  if (!item.pageStyle) {
    item.pageStyle = {}
  }
  e.forEach((key) => {
    item.pageStyle[key] = ''
  })
}

const filterStyleList = (style: any) => {
  let keys = Object.keys(style)
  let list = formItemList.value
    .filter((item) => {
      return keys.includes(item.field)
    })
    .map((item) => {
      if (item.divider) delete item.divider
      return item
    })
  return list
}

const conditionsForExecutionRef = ref<any>(null)
let currentIndex = 0
const showConditionsForExecution = (
  conditionsForExecution: any,
  index: number,
) => {
  if (!conditionsForExecutionRef.value) return
  currentIndex = index
  conditionsForExecutionRef.value.show(conditionsForExecution)
}
const conditionsForExecutionChange = (list: any) => {
  executionAndStyles[currentIndex].conditionsForExecution = list
}
</script>
<style lang="scss" scoped>
.style-setting {
  padding-bottom: 50px;
}
</style>
