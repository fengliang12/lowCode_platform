<template>
  <div class="tree_module">
    <el-tree
      v-if="refresh"
      ref="treeModuleRef"
      :data="detail"
      :props="{ children: 'moduleSettings', label: 'title' }"
      node-key="code"
      :current-node-key="currentNodeKey"
      draggable
      default-expand-all
      highlight-current
      :expand-on-click-node="false"
      :allow-drop="allowDrop"
      @node-click="nodeClick"
      @node-drop="nodeDrop"
    >
      <template #default="{ node, data }">
        <div class="tree_content">
          <div class="m100">{{ node?.label || '页面布局' }}</div>
          <div class="vhCenter">
            <div class="ml10 vhCenter" v-if="!data.shareSetting">
              <img
                class="cat"
                v-show="data.hide"
                src="@/assets/images/closeEye.png"
                alt=""
                @click.stop="setItemStatus(data)"
              />
              <img
                v-show="!data.hide"
                class="cat"
                @click.stop="setItemStatus(data)"
                src="@/assets/images/eye.png"
              />
            </div>
            <div class="ml10 vhCenter" v-if="!data.shareSetting">
              <el-icon @click="handleCopyEvents(data)"
                ><DocumentCopy
              /></el-icon>
            </div>
            <div
              v-if="
                componentsMapping?.[data.moduleType]?.isParent ||
                data.shareSetting
              "
              class="ml10 vhCenter"
            >
              <el-icon @click="paste(data)"><CopyDocument /></el-icon>
            </div>
            <div class="ml10 vhCenter" v-if="!data.shareSetting">
              <el-icon @click="del(data, node)"><DeleteFilled /></el-icon>
            </div>
          </div>
        </div>
      </template>
    </el-tree>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref, computed, watch } from 'vue'
import componentsMapping from '../../CommonData/componentsMapping'
import { ElMessage, ElMessageBox, ElTree } from 'element-plus'
import { usePageSetupStore } from '@/store/pageSetupStore'
import setItemsMap from '../../Handle/setItemsMap'
import { handleCopyEvents } from '../../Handle/handleCopyEvents'
import bus from '@/utils/bus.js'
import setCopyData from '../../Handle/setCopyData'
import { inject } from 'vue'
import { onUpdated } from 'vue'

const pageSetupStore = usePageSetupStore()
const otherConfig = inject('otherConfig', {})
defineProps(['detail'])
const refresh = ref(true)
const treeModuleRef = ref<InstanceType<typeof ElTree>>()

//当前操作的组件的key
const currentNodeKey = computed(() => {
  return pageSetupStore.items?.value?.code || null
})

onUpdated(() => {
  nextTick(() => {
    console.log('当前操作的组件的key', currentNodeKey.value)

    if (!treeModuleRef.value) return

    treeModuleRef.value.setCurrentKey(currentNodeKey.value)
  })
})

/**
 * 点击节点，切换选中组件
 */
const nodeClick = (data: any, node: { parent: { data: any } }) => {
  pageSetupStore.setItems({
    value: data,
    parents: node?.parent?.data ? node.parent.data : null,
  })
}

/**
 * 拖拽时判定目标节点能否成为拖动目标位置。
 * 如果返回 false ，拖动节点不能被拖放到目标节点。
 * type 参数有三种情况：'prev'、'inner' 和 'next'，分别表示放置在目标节点前、插入至目标节点和放置在目标节点后
 */
const allowDrop = (
  draggingNode: any,
  dropNode: { data: { moduleType: string | number } },
  type: string,
) => {
  return componentsMapping?.[dropNode.data.moduleType]?.isParent
    ? true
    : type !== 'inner'
}

/**
 * 拖拽成功完成时触发的事件
 */
const nodeDrop = (
  draggingNode: { data: { parentsCode: any } },
  dropNode: { data: { code: any; parentsCode: any } },
  type: string,
) => {
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
const refreshElTree = () => {
  refresh.value = false
  nextTick(() => {
    refresh.value = true
  })
}

/**
 * 切换显示和隐藏
 */
const setItemStatus = (data: { hide: boolean }) => {
  data.hide = !data.hide
}

/**
 * 黏贴
 */
const paste = (data: { title: any; moduleSettings: any[] }) => {
  //黏贴板
  const Promise = navigator.clipboard.readText()
  Promise.then((res) => {
    const copyData = JSON.parse(res)
    if (!copyData.code || !copyData.moduleType) {
      return ElMessage.error('格式化数据失败')
    }

    ElMessageBox.confirm(`确认粘贴吗到${data.title ?? '页面布局'}`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
    }).then(async () => {
      const moduleSetting = await setCopyData({
        data: copyData,
        otherConfig: otherConfig,
        AloneApiList: pageSetupStore.AloneApiList,
        itemsMap: pageSetupStore.itemsMap,
      })

      if (!data.moduleSettings) {
        data.moduleSettings = []
      }
      data.moduleSettings.push(moduleSetting)
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
const del = (data: { code: any }, node: { parent: any }) => {
  ElMessageBox.confirm('确认删除', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    const parent = node.parent
    const siblings = parent.data.moduleSettings || parent.data
    const index = siblings.findIndex(
      (item: { code: any }) => item.code === data.code,
    )
    siblings.splice(index, 1)

    pageSetupStore.setPageItemsMap({
      itemsMap: setItemsMap(data, pageSetupStore.itemsMap, 'delete'),
    })

    if (pageSetupStore.items?.value.code === data.code) {
      pageSetupStore.setItems({
        value: null,
      })
    }
    refreshElTree()
  })
}

bus.on('refreshElTree', refreshElTree)
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
