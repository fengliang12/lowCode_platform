/**
 * 自定义
 * @param {*} element
 * @returns
 */
const pageJumpComponentList = (element) => [
  {
    field: 'operationUrl',
    type: 'PagepathCascader',
    on: { changeInfo: (e) => pagePathCascaderChange(e, element) },
  },
]

/**
 * 小程序路径选择后
 */
const pagePathCascaderChange = (event, element) => {
  element.params = event?.params?.length > 0 ? event.params : []
}

export { pageJumpComponentList }
