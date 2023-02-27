<template>
  <div>
    <el-switch
      v-model="pageSetupStore.jumpPageSetting"
      active-text="点击跳转自定义页面"
      inactive-text="不可跳转"
      class="mb10"
    ></el-switch>
    <el-row>
      <el-switch
        v-model="pageSetupStore.showHotBox"
        active-text="配置显示"
        inactive-text="正常显示"
        class="mb10"
      />
    </el-row>
    <el-row>
      <el-select
        v-model="selectId"
        clearable
        filterable
        class="mb10"
        placeholder="请选择"
      >
        <el-option
          v-for="item in pageSetupStore.pageList"
          :key="item.id"
          :label="item.title"
          :value="item.id"
        ></el-option>
      </el-select>
      <el-button @click="add">确认 添加</el-button>
      <el-button @click="refresh">刷新列表</el-button>
    </el-row>
    <el-tag
      v-for="(item, index) in pageSetupStore.childPageIds"
      :key="item"
      closable
      @close="handleClose(index)"
      @click="toPage(item)"
      class="ml10 mb10 pointer"
    >
      {{ pageKey[item] }}
    </el-tag>
    <el-row>
      <el-button type="primary" @click="handleExport">JSON格式化预览</el-button>
    </el-row>
    <JsonEditor ref="jsonEditorRef"></JsonEditor>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { usePageSetupStore } from '@/store'
import JsonEditor from '../../../Common/jsonEditor/index.vue'
import { uniq } from 'lodash'

const props = defineProps(['value'])
const pageSetupStore = usePageSetupStore()

const pageKey = computed(() => {
  return Object.fromEntries(
    pageSetupStore.pageList.map((item) => {
      return [item.id, item.title]
    })
  )
})

/**
 * 添加
 */
const selectId = ref('')
const add = () => {
  pageSetupStore.changeInfo = true
  pageSetupStore.setChildPageIds(
    uniq([...pageSetupStore.childPageIds, selectId.value])
  )
  console.log(pageSetupStore.childPageIds)
  selectId.value = ''
}

/**
 * 关闭tag
 * @param {*} idx
 */
const handleClose = (idx) => {
  pageSetupStore.childPageIds.splice(idx, 1)
  pageSetupStore.changeInfo = true
}

/**
 * 前往配置页面
 */
const toPage = (id) => {
  pageSetupStore.toPage(id)
}

/**
 * 刷新配置页列表
 */
const refresh = () => {
  pageSetupStore.pageList = []
  pageSetupStore.getPageList()
}

/**
 * 点击json配置按钮
 */
const jsonEditorRef = ref(null)
const handleExport = () => {
  jsonEditorRef.value.show(props.value)
}
</script>

<style lang="scss" scoped></style>
