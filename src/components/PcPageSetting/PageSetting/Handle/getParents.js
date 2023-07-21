import { typeOf } from '../../utils'
//判断是否有满足函数的父组件 hasCurrent// 是否包含当前值
const getParents = (code, itemsMap, fn, { hasCurrent = false } = {}) => {
  const item = typeOf(itemsMap) === 'map' && itemsMap?.get(code)
  //是否包含当前值
  if (hasCurrent) {
    const value = fn(item)
    if (value) {
      return value
    }
  }
  const handle = (parentsCode) => {
    if (!parentsCode || !parentsCode.includes('_')) return
    const parents = itemsMap.get(parentsCode)
    const pValue = fn(parents)
    if (pValue) {
      return pValue
    } else if (parents?.parentsCode) {
      return handle(parents?.parentsCode)
    }
  }
  return handle(item?.parentsCode)
}
export { getParents }
