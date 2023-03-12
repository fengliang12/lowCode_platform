<template>
  <div>
    <el-link disabled type="primary"> 参数以apiPath0示意，可多个 </el-link>
    <el-button
      type="warning"
      style="float: right; margin-bottom: 10px;"
      @click="addChild('paramList', modelValue)"
    >
      新增参数
    </el-button>
    <el-table
      :data="modelValue"
      row-key="id"
      :tree-props="{ children: 'child', hasChildren: 'hasChildren' }"
      :border="true"
      style="margin-bottom: 20px; width: 100%;"
    >
      <!-- 键值(key) -->
      <el-table-column label="字段键值" prop="key" min-width="300px">
        <template v-slot="scope">
          <div>
            <span>字段(key)：</span>
            <el-input
              class="w200"
              v-model="scope.row.key"
              placeholder="请输入字段"
            ></el-input>
          </div>
          <div class="flex" style="margin-left: 30px;">
            <div>字段名(label)：</div>
            <el-input
              class="w200"
              v-model="scope.row.label"
              placeholder="请输入字段名"
            />
          </div>
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
import { watch, reactive } from 'vue'

const props = defineProps(['modelValue', 'type'])

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
  const child = {
    id: '',
    key: '',
    label: '',
    child: null,
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
  if (idMapParent[row.id]?.child?.length) {
    idMapParent[row.id].child.splice(
      idMapParent[row.id].child.findIndex((elem) => elem.id === row.id),
      1,
    )
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
