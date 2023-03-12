import { random } from 'lodash-es'

export const getModuleCode = (type, codeMap = new Set()) => {
  let code = `${type}_${random(10000, false)}`
  //存在重新生成
  if (codeMap.has(code)) {
    code = getModuleCode(type, codeMap)
  }
  return code
}

export const generateId = (type, oldCode = '', itemsMap) => {
  //校验传入code是否存在不存在直接返回
  if (oldCode && !itemsMap?.has?.(oldCode)) {
    return oldCode
  }

  let code = getModuleCode(type, itemsMap)
  return code
}

export const getId = () => {
  return Math.random().toString(32).slice(2)
}
