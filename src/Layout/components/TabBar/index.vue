<template>
  <el-tabs
    v-model="editableTabsValue"
    type="card"
    closable
    class="demo-tabs"
    @tab-click="clickHandle"
    @tab-remove="removeTab"
    @contextmenu.prevent="openContextMenu($event)"
  >
    <el-tab-pane
      v-for="item in editableTabs"
      :key="item.path"
      :label="$t(item.name)"
      :name="item.path"
    >
    </el-tab-pane>
  </el-tabs>
  <ul
    v-show="contextMenuVisible"
    :style="{ left: left + 'px', top: top + 'px' }"
    class="contextmenu"
  >
    <li @click="closeAllTabs">关闭所有</li>
    <li @click="closeOtherTabs('left')">关闭左边</li>
    <li @click="closeOtherTabs('right')">关闭右边</li>
    <li @click="closeOtherTabs('other')">关闭其他</li>
  </ul>
</template>
<script lang="ts" setup>
import { listType, useTagsStore } from '@/store/useTagsStore'
import { computed, Ref, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const tagsStore = useTagsStore()

const editableTabsValue = ref('')
const editableTabs = computed(() => tagsStore.list)

/**
 * tab刷新缓存数据
 */
const refresh = () => {
  window.addEventListener('beforeunload', function () {
    sessionStorage.setItem('TABS_ROUTES', JSON.stringify(editableTabs.value))
  })
  let sessionJson = sessionStorage.getItem('TABS_ROUTES')
  if (sessionJson) {
    let list = JSON.parse(sessionJson)
    list.map((item: listType) => {
      tagsStore.addTagItem(item)
    })
  }
}

refresh()

/**
 * 添加tab
 */
const addTab = () => {
  const { meta, path } = route
  const tab: listType = {
    path: path,
    name: meta.title as string,
  }
  tagsStore.addTagItem(tab)
}
watch(
  () => route.path,
  () => {
    editableTabsValue.value = route.path
    addTab()
  },
  {
    immediate: true,
  },
)

/**
 * 点击切换tab
 * @param event
 */
const clickHandle = (event: any) => {
  router.push({ path: event.props.name })
}

/**
 * 关闭tab
 * @param event
 */
const removeTab = (targetName: string) => {
  if (tagsStore.list.length === 1) {
    alert('这已经是最后一页了')
    return
  }
  // 如果删除的是当前页
  if (editableTabsValue.value === targetName) {
    editableTabs.value.forEach((tab: listType, index: number) => {
      if (tab.path === targetName) {
        const nextTab =
          editableTabs.value[index + 1] || editableTabs.value[index - 1]
        if (nextTab) {
          editableTabsValue.value = nextTab.path
          router.replace({ path: nextTab.path })
        }
      }
    })
  }
  tagsStore.delTagItem(targetName)
}

/**
 *  tab右键菜单关闭列表
 */
const contextMenuVisible: Ref<boolean> = ref(false)
const left: Ref<string> = ref('')
const top: Ref<string> = ref('')
//显示菜单选项
const openContextMenu = (e: any) => {
  if (e.srcElement.id) {
    let currentContextTabId = e.srcElement.id.split('-')[1]
    tagsStore.saveCurContextTabId(currentContextTabId)
    contextMenuVisible.value = true
    left.value = e.clientX
    top.value = e.clientY + 10
  }
}

//关闭所有tab
const closeAllTabs = () => {
  tagsStore.clearTags()
  contextMenuVisible.value = false
  router.push('/')
}
//关闭左边
const closeOtherTabs = (type: string) => {
  tagsStore.closeOtherTags(type)
  contextMenuVisible.value = false
}
</script>

<style lang="scss" scoped>
.demo-tabs > .el-tabs__content {
  display: none;
}
.demo-tabs > .el-tabs__header {
  margin: 0;
}

.contextmenu {
  width: 100px;
  margin: 0;
  border: 1px solid #ccc;
  background: #fff;
  z-index: 3000;
  position: absolute;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.2);
  li {
    margin: 0;
    padding: 7px 16px;
    &:hover {
      background: #f2f2f2;
      cursor: pointer;
    }
  }
}
</style>
