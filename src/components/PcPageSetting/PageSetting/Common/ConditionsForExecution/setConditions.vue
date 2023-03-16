<template>
  <div>
    <div class="mb10">{{ showJudgeText }}</div>
    <div class="flex mb10">
      <GetPageData
        v-model="modelValue.value.value"
        v-model:handle="modelValue.value.handle"
        :disabled="!!modelValue?.type"
        :showHandle="true"
      ></GetPageData>
      <el-select
        :disabled="!!modelValue.type"
        v-model="modelValue.execution"
        placeholder="选择条件"
        clearable
        filterable
        class="mr10"
      >
        <el-option
          v-for="item in conditionsList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <SetData
        class="mr10"
        :disabled="!!modelValue?.type"
        v-model="modelValue.content"
        :wrap="false"
      ></SetData>
      <el-select
        v-model="modelValue.type"
        placeholder="选择类型(多条子条件时选择)"
        clearable
        @change="typeChange(modelValue)"
      >
        <el-option
          v-for="item in andOr"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-tooltip placement="top-start">
        <template #content>
          1.选择类型 在需要多条判断时选择（未选择为一条判断）<br />
          2.条件 存在/不存在 用于判断是否有数据（此时比较值数据将失效）
        </template>
        <el-icon><WarnTriangleFilled /></el-icon>
      </el-tooltip>
      <div class="ml10">
        <el-button v-show="modelValue.type" @click="add(modelValue)"
          >新增子条件</el-button
        >
      </div>
    </div>

    <el-table
      v-if="modelValue.type"
      :data="modelValue.child"
      row-key="id"
      default-expand-all
      :tree-props="{ children: 'child', hasChildren: 'hasChildren' }"
    >
      <el-table-column
        prop="date"
        class="elTable123"
        label="页面值"
        width="300"
      >
        <template v-slot="scope">
          <GetPageData
            v-model="scope.row.value.value"
            v-model:handle="scope.row.value.handle"
            :showHandle="true"
            :disabled="!!scope.row.type"
          ></GetPageData>
        </template>
      </el-table-column>
      <el-table-column prop="name" class="elTable123" label="条件" width="100">
        <template v-slot="scope">
          <el-select
            v-model="scope.row.execution"
            :disabled="!!scope.row.type"
            placeholder="选择条件"
          >
            <el-option
              v-for="item in conditionsList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="比较值" width="600">
        <template v-slot="scope">
          <setData
            :disabled="!!scope.row.type"
            v-model="scope.row.content"
            :wrap="false"
          ></setData>
        </template>
      </el-table-column>
      <el-table-column label="且或关系" width="200">
        <template v-slot="scope">
          <el-select
            v-model="scope.row.type"
            placeholder="选择类型"
            clearable
            class="mr10"
            @change="typeChange(scope.row)"
          >
            <el-option
              v-for="item in andOr"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="条数设置">
        <template v-slot="scope">
          <el-button
            v-show="scope.row.type"
            :disabled="!scope.row.type"
            @click="add(scope.row)"
            >新增子条件</el-button
          >
          <el-button @click="deleteChild(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { reactive, watch, computed } from 'vue'
import GetPageData from '../setData/getPageData.vue'
import SetData from '../setData/index.vue'
import handlePageValue from '../../Handle/handlePageValue'
import { conditionsList, andOr, ConditionsData } from './data'
import { cloneDeep } from 'lodash'
const props = defineProps(['modelValue'])
const idMapParent = reactive({})

/**
 *  递归获取id对应父级
 */
const setIdMapParent = (
  data = props.modelValue,
  index = 0,
  pId = 0,
  parent,
) => {
  const id = !pId ? 1 : pId * 100 + index
  if (pId !== 0) {
    idMapParent[id] = parent
  }
  data.id = id
  if (data?.child?.length) {
    data.child.forEach((element, index) => {
      setIdMapParent(element, index, data.id, data)
    })
  }
}

watch(
  () => props.modelValue,
  (val) => {
    setIdMapParent(val)
  },
  {
    immediate: true,
  },
)

/**
 * 条件类型变化
 * @param {*} row
 */
const typeChange = (row) => {
  console.log(row)
  if (row?.type && !row?.child?.length) {
    const data = cloneDeep(row)
    data.type = null
    row.child = [data]
  }
  if (row?.type) {
    row.content = null
    row.value.value = ''
    row.execution = '='
  } else {
    row.child = []
  }
  setIdMapParent()
}

/**
 * 添加子条件
 */
const add = (row) => {
  row.child.push(new ConditionsData({}))
  setIdMapParent()
}

/**
 * 删除对于子条件
 * @param {*} row
 */
const deleteChild = (row) => {
  idMapParent[row.id].child.splice(
    idMapParent[row.id].child.findIndex((elem) => elem.id === row.id),
    1,
  )
  delete idMapParent[row.id]
  setIdMapParent()
}

/**
 * 生产showJudgeText
 * @param {*} data
 */
const judgeObj = {
  '=': '===',
}
const judge1 = (data) => {
  const value = data.value.value
  if (data.execution === 'existent') {
    return !!value
  }
  if (data.execution === 'non-existent') {
    return `!${value}`
  }
  return `${value}${
    judgeObj[data.execution] || data.execution
  }${handlePageValue(data.content)}`
}

/**
 * 根据值生产结果
 */
const judge = (value) => {
  if (value?.value?.value) {
    return judge1(value)
  } else if (value.type && value.child?.length) {
    const orAnd = {
      or: ' || ',
      and: ' && ',
    }
    const arr = value.child.map((elem) => {
      return judge(elem)
    })
    return `(${arr.join(orAnd[value.type])})`
  }
  return ''
}

/**
 * 条件结果显示
 */
const showJudgeText = computed(() => {
  return judge(props.modelValue)
})
</script>

<style lang="scss" scoped>
:deep(.el-table .cell) {
  display: flex;
  align-items: center;
}
</style>
