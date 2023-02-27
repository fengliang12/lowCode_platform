import { isObject, mergeWith, isNil, cloneDeep } from 'lodash'

const getData = (configFormList: any) => {
  let data: any = {}
  let controlList: any = []
  configFormList.forEach((elem: any) => {
    if (elem?.field1) {
      data[elem.field1] = cloneDeep(elem.defaultValue1)
    }
    if (!elem?.field) return

    let defaultValue = cloneDeep(elem.defaultValue)
    data[elem.field] = defaultValue

    controlList = getControlFormList(elem?.control)

    if (!elem.formList) return null
    const getDataInfo = getData(elem.formList)
    // 判断是否有默认值配置
    if (!getDataInfo) return null
    if (elem.type === 'group' || elem.type === 'collapse') {
      if (!defaultValue) {
        defaultValue = []
      }
      // 数组配置默认值替换数组默认值第一项
      defaultValue[0] = handleData(getDataInfo, defaultValue[0])
      data[elem.field] = defaultValue
    } else if (elem.type === 'object') {
      // 对象存在默认值替换默认值对应内容
      data[elem.field] = handleData(getDataInfo, defaultValue)
    }
  })

  if (controlList.length) {
    data = {
      ...getData(controlList),
      ...data,
    }
  }
  return Object.keys(data).length ? data : null
}

// 获取控制对象中的formList
const getControlFormList = function (control: any[]) {
  if (!control) return []
  return control
    .map((elem) => {
      return elem.formList || []
    })
    .flat()
}

/**
 * 根据表单配置获取默认数据值
 * @param formItemList
 * @returns
 */
const getFormObject = (formItemList: FormCreate.FormItemListType) => {
  // 转化为对象
  const data = cloneDeep(getData(formItemList))
  return data
}

/**
 * 初始对象
 * @param initdata
 * @param result
 * @returns
 */
const handleData = function (initdata: any, result: any) {
  return mergeWith(initdata, result, (objValue, srcValue) => {
    return !isNil(srcValue) && Object.keys(srcValue).length
      ? srcValue
      : objValue
  })
}

/**
 * 合并对象
 * @param value
 * @param sources
 * @returns
 */
const setMerge = (value: object, sources: object) => {
  const setData = function (value: any, sources: any) {
    if (!isObject(value)) return sources
    const obj = cloneDeep(value)
    for (const key in sources) {
      if (Object.prototype.hasOwnProperty.call(sources, key)) {
        const element = sources[key]
        if (isObject(element)) {
          obj[key] = setData(obj[key], element)
        } else {
          obj[key] = obj[key] ?? element
        }
      }
    }
    return obj
  }
  const data = setData(value, sources)
  return data
}

export { getFormObject, handleData, getControlFormList, setMerge }
