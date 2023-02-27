import handleModule from './handleModule'
//更新页面api列表
const updateApiList = (pageSetting, apiMapId) => {
  //处理apiInfo
  const setApiInfo = (hotOperations) => {
    if (!hotOperations?.length) return hotOperations
    return hotOperations.map((elem) => {
      if (elem.operationType === 'api' && apiMapId[elem.operationUrl]) {
        elem.operationUrl = apiMapId[elem.operationUrl]
      }
      return elem
    })
  }
  handleModule(pageSetting, ({ data, type }) => {
    if (type === 'hotModule') {
      data.hotOperations = setApiInfo(data.hotOperations)
    } else if (type === 'moduleSettings') {
      if (data?.events?.length) {
        data.events = data.events
          .map((element) => {
            element.hotOperations = setApiInfo(element.hotOperations)
            return element?.hotOperations?.length ? element : null
          })
          .filter(Boolean)
      }
    }
  })
  return pageSetting
}

export default updateApiList
