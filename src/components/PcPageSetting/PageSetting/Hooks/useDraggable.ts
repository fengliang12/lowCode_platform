import { reactive, ref } from 'vue'
import componentsMapping from '../CommonData/componentsMapping'
import { usePageSetupStore } from '@/store/pageSetupStore'
import bus from '@/utils/bus'
import { setModule } from '../data'
import { ElMessageBox } from 'element-plus'
import { isArray, set } from 'lodash'

const useDraggable = (rightList: any) => {
  const isSame = ref<boolean>(false)
  const pageSetupStore = usePageSetupStore()

  /**
   * 左边只能移动到右边，不能上下移动
   */
  const leftMove = (e: { from: any; to: any }) => {
    const move = e.from === e.to
    isSame.value = move
    return !move
  }

  /**
   * 右边移动结束
   */
  const leftEnd = (e: { newIndex: string | number }) => {
    if (isSame.value) return
    const data = rightList.value[e.newIndex]
    if (!data) return
    handlePageData({
      index: e.newIndex,
      moduleSettings: rightList.value,
      moduleType: data.moduleType,
      width: data.pageStyle.width,
      height: data.pageStyle.height,
    })
  }

  /**
   * 点击左边上的菜单选项,添加到对应的组件中
   */
  const clickLeft = (moduleType: string | number) => {
    const { width = 750, height = 200 } =
      componentsMapping[moduleType].initData ?? {}
    if (
      !pageSetupStore.items?.value ||
      !componentsMapping[pageSetupStore.items.value.moduleType]?.isParent
    ) {
      // 没有选中的组件或者当前选中组件不是父类组件,直接再最下方添加一个组件
      handlePageData({
        index: rightList.value.length,
        moduleSettings: rightList.value,
        moduleType: moduleType,
        width,
        height,
      })
    } else {
      ElMessageBox.confirm(
        `添加至（${pageSetupStore.items.value.title}）中`,
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '添加到页面底部',
          type: 'warning',
        },
      )
        .then(() => {
          const tempItem: any = pageSetupStore.items?.value
          if (!isArray(tempItem?.moduleSettings)) {
            set(tempItem, 'moduleSettings', [])
          }
          const { width, height } = tempItem?.pageStyle || {}
          handlePageData({
            index: tempItem?.moduleSettings?.length,
            moduleSettings: tempItem.moduleSettings,
            moduleType: moduleType,
            width,
            height,
            parents: tempItem,
          })
        })
        .catch(() => {
          handlePageData({
            index: rightList.value.length,
            moduleSettings: rightList.value,
            moduleType: moduleType,
            width,
            height,
          })
        })
    }
  }

  /**
   * 设置页面上显示的值
   * @param param0
   */
  const handlePageData = ({
    index,
    moduleSettings,
    moduleType,
    width,
    height,
    parents = null,
  }: any = {}) => {
    const tempItem = (moduleSettings[index] = setModule({
      moduleType,
      width,
      height,
    }))

    tempItem.parentsCode = parents?.code ?? pageSetupStore.id

    pageSetupStore.setItems({
      value: tempItem,
      parents,
    })

    pageSetupStore.setPageItemsMap({
      items: tempItem,
      opt: 'add',
    })

    // 刷新el-tree
    bus.emit('refreshElTree')
  }

  /**
   * 右边只能上下移动
   * @param {*} e
   */
  const rightMove = (e: { from: any; to: any }) => {
    return e.from === e.to
  }

  /**
   * 右边移动结束
   * @param {*} e
   */
  const rightEnd = () => {
    bus.emit('refreshElTree')
  }

  return {
    leftMove,
    leftEnd,
    clickLeft,
    rightMove,
    rightEnd,
  }
}
export default useDraggable
