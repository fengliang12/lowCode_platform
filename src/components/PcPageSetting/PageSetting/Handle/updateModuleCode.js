import handleModule from './handleModule'
import { replace } from 'lodash-es'

/**
 * 更新页面组件code列表
 * @param {*} moduleSetting
 * @param {*} codeMap
 * @param {*} mapApi
 * @returns
 */
const updateModuleCode = (moduleSetting, codeMap, mapApi) => {
  //处理组件中事件的code
  const setModuleCode = (hotOperations) => {
    if (!hotOperations?.length) return hotOperations
    return hotOperations.map((elem) => {
      //api处理为新ID
      if (elem.operationType === 'api' && mapApi[elem.operationUrl]) {
        elem.operationUrl = mapApi[elem.operationUrl]
      }
      //处理组件code
      if (
        elem.operationType === 'associated_module' &&
        codeMap[elem.operationUrl]
      ) {
        elem.operationUrl = codeMap[elem.operationUrl]
      }
      //处理事件参数
      if (elem?.params?.length) {
        elem.params.map((elem) => {
          elem.pageValue = handlePageValue(elem.pageValue)
          return elem
        })
      }
      //处理事件条件
      if (elem?.conditionsForExecution) {
        elem.conditionsForExecution = handleConditionsForExecution(
          elem.conditionsForExecution,
        )
      }
      return elem
    })
  }

  //处理动态数据中组件的code
  const handlePageValue = (pageValue) => {
    if (
      pageValue?.valueType !== 'pageData' ||
      !pageValue?.value ||
      !pageValue?.value?.includes('component.')
    ) {
      return pageValue
    }
    Object.keys(codeMap).forEach((elem) => {
      if (pageValue.value.includes(elem)) {
        pageValue.value = replace(pageValue.value, elem, codeMap[elem])
      }
    })
    return pageValue
  }

  //条件数据处理
  const handleConditionsForExecution = (conditionsForExecution) => {
    if (!conditionsForExecution?.value) return conditionsForExecution
    conditionsForExecution.value = handlePageValue(conditionsForExecution.value)
    conditionsForExecution.content = handlePageValue(
      conditionsForExecution.content,
    )
    if (conditionsForExecution?.child?.length) {
      conditionsForExecution.child = conditionsForExecution.child.map(
        (elem) => {
          return handleConditionsForExecution(elem)
        },
      )
    }
    return conditionsForExecution
  }

  handleModule(moduleSetting, ({ data, type }) => {
    if (type === 'hotModule') {
      data.hotOperations = setModuleCode(data.hotOperations)
      data.pageShowData.pageValue = handlePageValue(data.pageShowData.pageValue)
    } else if (type === 'moduleSettings') {
      //处理事件
      if (data?.events?.length) {
        data.events = data.events
          .map((element) => {
            element.hotOperations = setModuleCode(element.hotOperations)
            return element?.hotOperations?.length ? element : null
          })
          .filter(Boolean)
      }
      //处理组件参数
      if (data?.params?.length) {
        data.params.map((elem) => {
          elem.pageValue = handlePageValue(elem.pageValue)
          return elem
        })
      }
      //处理组件动态数据
      if (data?.pageValue?.value) {
        data.pageValue = handlePageValue(data.pageValue)
      }
      //处理组件显示判断
      if (data?.conditionsForExecution) {
        data.conditionsForExecution = handleConditionsForExecution(
          data.conditionsForExecution,
        )
      }
      //处理条件样式
      if (data?.executionAndStyles?.length) {
        data.executionAndStyles = data.executionAndStyles.map((elem) => {
          elem.conditionsForExecution = handleConditionsForExecution(
            elem.conditionsForExecution,
          )
          return elem
        })
      }
    }
  })
  return moduleSetting
}

export default updateModuleCode
