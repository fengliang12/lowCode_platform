import { usePageSetupStore } from '@/store/pageSetupStore'
import {
  moduleOperationList,
  moduleCarouselOperationList,
  moduleVideoOperationList,
  gridLotteryOperationList,
  moduleOperationListKey,
  moduleOperationListSelect,
} from '../data'
import { animateList } from '../common/animate'
const pageSetupStore = usePageSetupStore()

/**
 * 自定义
 * @param {*} element
 * @returns
 */
const associatedModuleComponentList = (element) => {
  return [
    {
      field: 'operationUrl',
      type: 'el-select',
      get options() {
        return setAssociatedModule()
      },
    },
    {
      field: 'moduleOperation',
      type: 'el-cascader',
      get options() {
        return getModuleOperationList(element.operationUrl)
      },
      props: {
        'show-all-levels': false,
        props: {
          emitPath: false,
        },
      },
      control: [
        {
          handle(val) {
            return val === 'animate'
          },
          get formList() {
            return [
              {
                field: 'content',
                type: 'el-cascader',
                options: animateList,
                props: {
                  'show-all-levels': false,
                  props: {
                    children: 'child',
                    emitPath: false,
                  },
                },
              },
            ]
          },
        },
        {
          handle(val) {
            return moduleOperationListKey[val]?.props
          },
          get formList() {
            return [
              {
                field: 'content',
                type: 'el-input',
                props: moduleOperationListKey[element.moduleOperation]?.props,
              },
            ]
          },
        },
      ],
    },
  ]
}

/**
 * 获取可操作组件
 */
const setAssociatedModule = () => {
  let { itemsMap, items } = pageSetupStore
  if (!itemsMap?.values) return []

  let _arr = Array.from(itemsMap.values())
    .map((elem) => ({
      value: elem.code,
      label: `${elem.title ?? elem.code}`,
    }))
    .filter((item) => item.value)

  if (items?.value) {
    let index = Array.from(itemsMap.values()).findIndex(
      (i) => i.code == items.value.code,
    )
    if (index != -1) {
      _arr.splice(index, 1)
      _arr.unshift({
        value: items.value.code,
        label: `当前组件`,
      })
    }
  }
  return _arr
}

/**
 * 获取操作组件的方法类别,这里会根据选择的组件的类型，添加操作组件的方法
 */
const getModuleOperationList = (operationUrl) => {
  if (operationUrl.includes('carousel')) {
    return [...moduleOperationList, ...moduleCarouselOperationList]
  } else if (operationUrl.includes('hot')) {
    return [...moduleOperationList, ...moduleVideoOperationList]
  } else if (operationUrl.includes('gridLottery')) {
    return [...moduleOperationList, ...gridLotteryOperationList]
  } else {
    return moduleOperationList
  }
}

export { associatedModuleComponentList }
