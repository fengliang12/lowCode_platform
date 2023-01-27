import { defineStore } from 'pinia'
export interface listType {
  name: string
  path: string
}

interface tagsStateType {
  list: Array<listType>
  currentContextTabId: string
}

interface tagsAction {
  addTagItem: (e: listType) => void
  delTagItem: (targetName: string) => void
  clearTags: () => void
  closeOtherTags: (type: string) => void
  saveCurContextTabId: (currentContextTabId: string) => void
}

export const useTagsStore = defineStore<string, tagsStateType, any, tagsAction>(
  'tagsStore',
  {
    state: () => {
      return {
        list: [],
        currentContextTabId: '',
      }
    },
    getters: {},
    actions: {
      // 添加
      addTagItem(data: listType) {
        const isSome = this.list.some(
          (item: listType) => item.path == data.path,
        )
        if (!isSome) {
          this.list.push(data)
        }
      },

      // 关闭当前页
      delTagItem(targetName: string) {
        const index = this.list.findIndex(
          (item: listType) => item.path == targetName,
        )
        this.list.splice(index, 1)
      },

      //清除所有标签
      clearTags() {
        this.list = []
        sessionStorage.removeItem('TABS_ROUTES')
      },

      //关闭其他标签
      closeOtherTags(type: string) {
        if (type == 'other') {
          this.list = this.list.filter(
            (item) => item.path == this.currentContextTabId,
          )
        } else if (type == 'left') {
          const index = this.list.findIndex(
            (item) => item.path == this.currentContextTabId,
          )
          this.list.splice(0, index)
        } else if (type == 'right') {
          const index = this.list.findIndex(
            (item) => item.path == this.currentContextTabId,
          )
          this.list.splice(index + 1)
        }
      },

      //保存点击的tab
      saveCurContextTabId(currentContextTabId: string) {
        this.currentContextTabId = currentContextTabId
      },
    },
  },
)
