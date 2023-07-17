import { usePageSetupStore } from '@/store/pageSetupStore'
import { assignmentOption } from '../data'
const pageSetupStore = usePageSetupStore()

/**
 * 设置页面动态参数
 * @param {*} element
 * @returns
 */
const setParamsComponentList = (element) => {
  return [
    {
      type: 'el-cascader',
      options: pageSetupStore.pageNewParams,
      props: {
        get modelValue() {
          return pageShowDataValue(element?.operationUrl)
        },
        placeholder: '请选择',
        props: {
          value: 'key',
          label: 'key',
          children: 'child',
          checkStrictly: true,
        },
      },
      on: {
        change: (e) => {
          element.operationUrl = e ? e.join('.') : ''
        },
      },
    },
    {
      field: 'moduleOperation',
      type: 'el-select',
      options: assignmentOption,
      props: {
        placeholder: '请选择',
      },
      on: {
        change(e) {
          const setParamsType = assignmentOption.find(
            (elem) => elem.value === e,
          )
          if (setParamsType?.params) {
            element.params = setParamsType.params
          }
        },
      },
    },
    {
      field: 'pageValue',
      type: 'set-data',
    },
  ]
}

/**
 * 处理页面参数的显示问题
 * @param {*} value
 */
const pageShowDataValue = (value) => {
  if (!value) return []
  return value.split('.')
}
export { setParamsComponentList }
