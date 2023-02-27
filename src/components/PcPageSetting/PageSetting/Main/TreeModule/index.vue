<template>
  <div class="tree_module">
    <el-tree
      v-if="refresh"
      ref="treeModuleRef"
      :data="formData"
      :props="{ children: 'moduleSettings', label: 'title' }"
      node-key="code"
      draggable
      default-expand-all
      highlight-current
      :expand-on-click-node="false"
      @node-click="nodeClick"
      @node-drop="nodeDrop"
      :allow-drop="allowDrop"
    >
      <template #default="{ node, data }">
        <div class="tree_content">
          <div class="m100">{{ node.label }}</div>
          <div class="ml10 icon_box">
            <div>
              <img
                class="cat"
                v-show="data.hide"
                src="https://wechatv2.blob.core.chinacloudapi.cn/ysl/scrm/image/a04fbe1d38ed74dde93f52e10090a10d.png"
                alt=""
                @click.stop="setItemStatus(data, node)"
              />
              <img
                v-show="!data.hide"
                class="cat"
                @click.stop="setItemStatus(data, node)"
                src="https://wechatv2.blob.core.chinacloudapi.cn/ysl/scrm/image/a0c47e0a129b4d89af9e09fb0d4ec2bc.png"
              />
            </div>
            <div class="ml10">
              <el-icon @click="handleCopyEvent(data, node)"
                ><DocumentCopy
              /></el-icon>
            </div>
            <div v-if="componentsMapping?.[data.moduleType]?.isParent">
              <el-icon class="ml10" @click="paste(data, node)"
                ><CopyDocument
              /></el-icon>
            </div>
            <div>
              <el-icon class="ml10" @click="del(data, node)"
                ><DeleteFilled
              /></el-icon>
            </div>
          </div>
        </div>
      </template>
    </el-tree>
  </div>
</template>

<script setup>
import { nextTick, ref } from 'vue'
import componentsMapping from '../../CommonData/componentsMapping'
import { ElMessage, ElMessageBox } from 'element-plus'
import { usePageSetupStore } from '../../../../store'
import setItemsMap from '../../Handle/setItemsMap'
import { cloneDeep } from 'lodash'
import { handleCopyEvent } from '../../Handle/handleCopyEvent'
import bus from '@/utils/bus.js'

const pageSetupStore = usePageSetupStore()
defineProps(['formData'])

/**
 * 点击节点，切换选中组件
 */
const nodeClick = (data, node) => {
  pageSetupStore.setItems({
    value: data,
    parents: node?.parent?.data ? node.parent.data : null
  })
}

/**
 * 拖拽时判定目标节点能否成为，拖动目标位置。
 * 如果返回 false ，拖动节点不能被拖放到目标节点。
 */
const allowDrop = (draggingNode, dropNode, type) => {
  return componentsMapping?.[dropNode.data.moduleType]?.isParent
    ? true
    : type !== 'inner'
}

/**
 * 拖拽成功完成时触发的事件
 */
const nodeDrop = (draggingNode, dropNode, type) => {
  if (type === 'inner') {
    draggingNode.data.parentsCode = dropNode.data.code
  } else {
    draggingNode.data.parentsCode = dropNode.data.parentsCode
  }
  refreshElTree()
}

/**
 * 刷新el-tree
 */
const refresh = ref(true)
const refreshElTree = () => {
  refresh.value = false
  nextTick(() => {
    refresh.value = true
  })
}

/**
 * 切换显示和隐藏
 */
const setItemStatus = (data) => {
  data.hide = !data.hide
}

/**
 * 黏贴
 */
const paste = (data) => {
  const Promise = navigator.clipboard.readText()
  Promise.then((res) => {
    const copyData = JSON.parse(res)
    console.log('copyData', copyData)
    if (!copyData.code || !copyData.moduleType) {
      return ElMessage.error('格式化数据失败')
    }
    ElMessageBox.confirm(`确认粘贴吗到${data.title}`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    }).then(() => {
      const pageSetting = cloneDeep(copyData)
      if (!data.moduleSettings) {
        data.moduleSettings = []
      }
      data.moduleSettings.push(pageSetting)
      refreshElTree()
    })
  }).catch((error) => {
    ElMessage.error(error)
  })
}

/**
 * 删除
 * @param {*} data
 */
const del = (data, node) => {
  ElMessageBox.confirm('确认删除', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    const parent = node.parent
    const siblings = parent.data.moduleSettings || parent.data
    const index = siblings.findIndex((item) => item.code === data.code)
    siblings.splice(index, 1)

    pageSetupStore.setPageItemsMap({
      itemsMap: setItemsMap(data, pageSetupStore.itemsMap, 'delete')
    })

    if (pageSetupStore.items.value.code === data.code) {
      pageSetupStore.setItems({
        value: null
      })
    }
  })
}

bus.on('refreshElTree', refreshElTree)
</script>
<style lang="scss" scoped>
.tree_module {
  width: 100%;
}
.el-tree {
  height: 100%;
  overflow: scroll;
}

:deep(.el-tree-node > .el-tree-node__children) {
  overflow: visible;
}
.el-tree::-webkit-scrollbar {
  display: none;
}

.tree_content {
  display: flex;
  align-items: center;
  .icon_box {
    display: flex;
    align-items: center;
  }
  .cat {
    width: 20px;
    height: 20px;
  }
}
</style>
