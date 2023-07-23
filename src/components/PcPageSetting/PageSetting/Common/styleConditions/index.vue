<template>
  <div>
    <el-row>
      <el-divider>条件样式</el-divider>
      <el-col>
        <el-button @click="addExecutionStyle" type="primary" plain
          >新增条件样式</el-button
        >
      </el-col>
      <el-col class="mt-10">
        <el-collapse>
          <el-collapse-item
            v-for="(item, index) in executionAndStyles"
            :key="index"
          >
            <template #title>
              <div style="width: 100%;">
                <el-button
                  type="success"
                  plain
                  @click.stop="
                    showConditionsForExecution(
                      item.conditionsForExecution,
                      index,
                    )
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
                <el-button
                  @click.stop="deleteConditions(index)"
                  style="float: right; margin-top: 8px; margin-right: 10px;"
                  type="danger"
                  :icon="Delete"
                  circle
                />
              </div>
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
import FormCreate from '@/components/FormCreate/index.vue'
import ConditionsForExecution from '../../Common/ConditionsForExecution/index.vue'
import { Delete } from '@element-plus/icons-vue'

const emit = defineEmits(['update:modelValue'])
const props = defineProps(['modelValue', 'formItemList'])

/**
 * 初始化executionAndStyles
 */
const executionAndStyles = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  },
})

/**
 * 添加条件样式
 */
const addExecutionStyle = () => {
  const data = {
    conditionsForExecution: null,
    pageStyle: {},
  }
  console.log(executionAndStyles.value)

  if (!executionAndStyles.value?.length) {
    executionAndStyles.value = [data]
  } else {
    executionAndStyles.value.push(data)
  }
}

/**
 * 样式选着
 * @param e
 * @param item
 */
const onChange = (e: Array<string>, item: any) => {
  if (!item.pageStyle) {
    item.pageStyle = {}
  }
  e.forEach((key) => {
    item.pageStyle[key] = ''
  })
}

/**
 * 过滤样式
 * @param style
 */
const filterStyleList = (style: any) => {
  let keys = Object.keys(style)
  let list = props.formItemList
    .filter((item: any) => {
      return keys.includes(item.field)
    })
    .map((item: any) => {
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

/**
 * 条件选择结束
 * @param list 、
 */
const conditionsForExecutionChange = (list: any) => {
  executionAndStyles.value[currentIndex].conditionsForExecution = list
}

/**
 * 删除条件
 */
const deleteConditions = (index: number) => {
  executionAndStyles.value.splice(index, 1)
}
</script>
<style lang="scss" scoped>
.style-setting {
  padding-bottom: 50px;
}
</style>
