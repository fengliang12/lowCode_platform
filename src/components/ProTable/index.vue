<template>
  <div class="table_box">
    <!-- 头部查询 -->
    <div class="flex">
      <FormCreate
        v-model="searchValue"
        :formList="searchCheckedList"
        :options="searchFormOptions"
        :formConfig="{
          inline: true,
        }"
      ></FormCreate>
    </div>
    <el-row justify="end">
      <el-button type="primary" @click="addData"> 新增 </el-button>
      <el-button type="primary" @click="getTableData"> 查询 </el-button>
      <el-button type="info" @click="refreshSearchValue"> 重置 </el-button>
      <DropDown
        :columnFormList="columnFormList"
        v-model:columnCheckedList="columnCheckedList"
        :searchFormList="searchFormList"
        v-model:searchCheckedList="searchCheckedList"
      ></DropDown>
    </el-row>
    <!-- 表格 -->
    <el-table
      :data="table.data"
      v-loading="table.loading"
      :border="true"
      v-bind="tableConfig"
      row-key="label"
    >
      <template v-for="(column, index) in columnCheckedList" :key="index">
        <el-table-column
          v-if="!column.hide"
          :prop="column.field"
          :label="column.title"
          v-bind="column.props"
        >
          <template v-slot="scope">
            <template v-if="!column.render">
              <template v-if="column.formatter">
                <span>{{ column.formatter(column, scope.row) }}</span>
              </template>
              <template v-else>
                <el-avatar
                  v-if="column.tableType === 'pic'"
                  :size="40"
                  :src="scope.row[column.field]"
                ></el-avatar>
                <EditCell
                  v-else
                  v-model="scope.row[column.field]"
                  :row="scope.row"
                  :column="column"
                ></EditCell>
              </template>
            </template>
            <template v-else>
              <ExpandDom
                :row="scope.row"
                :index="index"
                :render="column.render"
                :column="column"
              ></ExpandDom>
            </template>
          </template>
        </el-table-column>
      </template>
      <el-table-column
        v-if="tableOptions?.length > 0"
        :prop="column.field"
        :label="column.title"
        v-bind="column.props"
      >
        <template v-slot="scope">
          <button
            v-for="(item, index) in tableOptions.operation"
            :key="index"
            @click="item.handleFn(scope.row)"
          >
            {{ item.title }}
          </button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="page">
      <el-pagination
        :current-page="currentPage"
        :page-size="size"
        :page-sizes="[5, 10, 20, 50]"
        :total="totalElements"
        layout="total,sizes, prev, pager, next, jumper"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, computed, ref } from 'vue'
import FormCreate from '@/components/FormCreate/index.vue'
import EditCell from './components/editCell/index.vue'
import DropDown from './components/dropDown/index.vue'
import ExpandDom from './components/expandDom/index.vue'
import { formatParams } from '@/utils/index.js'
import { cloneDeep, isObject } from 'lodash'
import mapTable from './utils/index'
import { getControlFormList } from '@/components/formCreate/utils/index'
const props = defineProps([
  'tableItemList',
  'tableOptions',
  'tableConfig',
  'searchInitValue',
  'searchFormOptions',
  'dialogFormConfig',
  'dialogFormInitValue',
])

const table = reactive({
  currentPage: 0,
  size: 10,
  totalElements: 10,
  data: null,
  loading: false,
})

onMounted(() => {
  getTableData()
})

/**
 * 获取数据---------------
 */
const getTableData = async () => {
  let { currentPage, size } = table
  table.loading = true
  let res = await props.tableOptions?.getTableData({
    page: currentPage - 1,
    size: size,
    expression: formatParams(searchValue.value, {
      to: 'le',
      from: 'ge',
    }),
  })
  table.data = res?.data
  table.totalElements = res?.data?.totalElements
  table.loading = false
}

/**
 * 改变当前页
 */
const handleCurrentChange = async (val) => {
  table.currentPage = val
  await getTableData()
}

/**
 * 改变尺寸
 */
const handleSizeChange = async (val) => {
  table.size = val
  await getTableData()
}

/**
 * table表格数据----------------
 */
const columnFormList = computed(() => {
  let controlFormList = []
  const data = cloneDeep(props.tableItemList)
    .map((child) => {
      controlFormList = controlFormList.concat(
        getControlFormList(child?.control),
      )
      return child
    })
    .concat(controlFormList)
    .filter(
      (elem) =>
        elem.field &&
        elem.title &&
        !elem?.hideOption?.includes('hide') &&
        !elem?.hideOption?.includes('table'),
    )
    .map((elem) => {
      //定义方法处理
      const data = mapTable.find((child) => {
        return child[0](elem, tableUpdate)
      })
      if (data) {
        elem = data[1](elem)
      }
      return elem
    })
  return data
})
const columnCheckedList = computed(() => {
  return columnFormList.value.filter((elem) => {
    return !elem?.hideOption?.includes('table')
  })
})

/**
 * 表单编辑
 * @param {*} params
 * @param {*} elem
 */
const tableUpdate = (params, elem) => {
  console.log(params, elem)
  let { edit } = props.tableOptions
  edit && edit(params.row)
}

/**
 * 搜索框--------------------------
 */
const searchValue = ref({ ...props.searchInitValue })
const searchFormList = computed(() => {
  return cloneDeep(props.tableItemList).filter((elem) => {
    //初始话隐藏
    if (
      elem?.hideOption?.includes('hide') ||
      elem?.hideOption?.includes('search')
    ) {
      return false
    }
    //删除禁止修改
    if (elem?.props?.disabled) {
      elem.props.disabled = false
    }
    //删除规则
    if (elem?.rules?.length) {
      elem.rules = []
    }
    //删除默认值
    if (isObject(elem.defaultValue)) {
      elem.defaultValue = {}
    } else if (Array.isArray(elem.defaultValue)) {
      elem.defaultValue = []
    } else {
      elem.defaultValue = undefined
    }
    //删除update事件
    if (elem.update) {
      delete elem.update
    }
    //去除指定组件筛选
    const returnData = ['FCounterSetting', 'uploadFile', 'imageList']
    if (returnData.includes(elem.type) || !elem.title) {
      return false
    }
    if (elem.type === 'el-switch') {
      elem.type = 'el-select'
      elem.options = [
        {
          value: true,
          label: elem?.props?.activeText ?? '是',
        },
        {
          value: false,
          label: elem.props.inactiveText ?? '否',
        },
      ]
    }
    return true
  })
})
const searchCheckedList = computed(() => {
  return columnFormList.value.filter((elem) => {
    return !elem?.hideOption?.includes('search')
  })
})

/**
 * 重置查询表单
 */
const refreshSearchValue = () => {
  searchValue.value = props.searchInitValue
  getTableData()
}

/**
 * 添加数据
 */
const addData = () => {
  if (props.dialogFormInitValue) {
    console.log('弹窗')
  } else {
    let addFn = props.tableOptions.operation.find((item) => item.type === 'add')
    addFn && addFn()
  }
}
</script>
<style lang="scss" scoped></style>
