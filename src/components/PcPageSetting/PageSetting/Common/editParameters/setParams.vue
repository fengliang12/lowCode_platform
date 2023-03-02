<template>
  <div>
    <el-link disabled type="primary"> 参数以apiPath0示意，可多个 </el-link>
    <el-button
      type="warning"
      style="float: right; margin-bottom: 10px"
      @click="addChild('paramList', modelValue)"
    >
      新增参数
    </el-button>
    <el-table
      :data="modelValue"
      row-key="id"
      :tree-props="{ children: 'child', hasChildren: 'hasChildren' }"
      :border="true"
      style="width: 100%; margin-bottom: 20px"
    >
      <!-- 键值(key) -->
      <el-table-column label="键值(key)" prop="key" min-width="300px">
        <template v-slot="scope">
          <el-input
            v-model="scope.row.key"
            :disabled="scope.row.request"
            type="text"
            placeholder="键值(key)"
          ></el-input>
        </template>
      </el-table-column>
      <!-- 页面值 -->
      <el-table-column
        label="页面值(pageValue)"
        prop="pageValue"
        min-width="500px"
      >
        <template v-slot="scope">
          <SetData
            v-if="scope.row.pageValue"
            v-model="scope.row.pageValue"
          ></SetData>
        </template>
      </el-table-column>
      <!-- 校验规则 -->
      <el-table-column label="校验规则" min-width="400px" v-if="hideRules">
        <template v-slot="scope">
          <SetRules v-model="scope.row.rules"></SetRules>
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column
        label="操作"
        :min-width="type === 'multiLevel' ? '190px' : '100px'"
      >
        <template v-slot="scope">
          <el-tooltip
            effect="dark"
            content="页面值和子集不可同时使用"
            :show-after="500"
            placement="right"
          >
            <el-button
              v-show="type === 'multiLevel'"
              @click="addChild('child', scope.row)"
            >
              新增子集
            </el-button>
          </el-tooltip>
          <el-button v-if="!scope.row.request" @click="deleteChild(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
// PageApiInfoParams {
//   key (string, optional): 接口key ,
//   pageValue (PageValue, optional): 页面值 ,
//   rules (Array[PageApiRule], optional): 页面接口路由
//   child (Array[PageApiInfoParams], optional): 子类
// }
import { watch, reactive } from 'vue'
import SetData from '../setData/index.vue'
import SetRules from '../setRules/index.vue'
import { pageValueData } from '../setData/data'

const props = defineProps(['modelValue', 'type', 'hideRules'])

/**
 * 设置id对应的Map
 * @param {*} list
 * @param {*} parentIndex
 * @param {*} parent
 */
const idMapParent = reactive({})
const setIdMapParent = (
  list = props.modelValue,
  parentIndex = 0,
  parent = props.modelValue,
) => {
  list.id = parentIndex
  list.forEach((elem, index) => {
    let id = parentIndex + (index + 1)
    elem.id = id
    idMapParent[id] = parent
    if (elem.child) {
      parentIndex = id * 100
      setIdMapParent(elem.child, parentIndex, elem)
    }
  })
}

/**
 * modelValue,时刻处理setIdMapParent
 */
watch(
  props.modelValue,
  (val) => {
    setIdMapParent(val)
  },
  { immediate: true },
)

/**
 * 添加子数据
 */
const addChild = (type, row) => {
  row.pageValue = null
  row.rules = []
  const child = {
    id: '',
    key: '',
    pageValue: new pageValueData(),
    child: null,
    rules: [],
  }
  if (type === 'paramList') {
    row.push(child)
  } else {
    if (!row?.child) {
      row.child = []
    }
    row.child.push(child)
  }

  setIdMapParent()
}

/**
 * 删除子数据
 */
const deleteChild = (row) => {
  if (idMapParent[row.id]?.child?.length === 1) {
    idMapParent[row.id].pageValue = new pageValueData()
  }

  if (idMapParent[row.id]?.child?.length) {
    let index = idMapParent[row.id].child.findIndex(
      (elem) => elem.id === row.id,
    )
    idMapParent[row.id].child.splice(index, 1)
  } else if (props.modelValue.length) {
    props.modelValue.splice(row.id - 1, 1)
  }
  delete idMapParent[row.id]
  setIdMapParent()
}
</script>

<style lang="scss" scoped>
:deep(.el-table .cell) {
  display: flex;
  align-items: center;
}
</style>
