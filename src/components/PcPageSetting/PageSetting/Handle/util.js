import { random } from 'lodash-es'

export const generateId = (type, oldCode = '') => {
  //校验传入code是否存在不存在直接返回
  if (oldCode) {
    return oldCode
  }
  let code = `${type}_${random(10000, false)}`
  return code
}

export const getId = () => {
  return Math.random().toString(32).slice(2)
}
