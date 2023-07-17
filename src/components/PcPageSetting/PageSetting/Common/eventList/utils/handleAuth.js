import { authEventList } from '../data'

/**
 * 自定义
 * @param {*} element
 * @returns
 */
export const authComponentList = (element) => {
  return [
    {
      field: 'operationUrl',
      type: 'el-cascader',
      props: {},
      options: authEventList,
      on: {
        change: (value) => {
          element.params = authEventList.find((item) => {
            return item.value === value
          })?.params
        },
      },
    },
  ]
}
