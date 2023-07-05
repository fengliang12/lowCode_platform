import { isObject } from 'lodash-es'
//判断为整数数字
const isInteger = (str) => {
  const re = /^([0-9]+[0-9]*|-[0-9]+[0-9]*)$/
  return re.test(str)
}
export const getParams = (keyList) => {
  let params = isInteger(keyList[0].key) ? [] : {}
  const setData = ({ keyList, params }) => {
    for (let i = 0; i < keyList.length; i++) {
      const elem = keyList[i]
      if (elem.pageValue.valueType === 'pageData') {
        return
      }
      if (!elem?.child?.length && elem?.pageValue?.value) {
        params[elem.key] = elem.pageValue.value
      } else if (elem?.child?.length) {
        params[elem.key] = isInteger(elem.child[0].key) ? [] : {}
        setData({ keyList: elem?.child, params: params[elem.key] })
      }
    }
    return params
  }
  setData({ keyList, params })
  return params
}
// 普通对象转自定义params
export const setParams = (obj) => {
  const keyList = Object.keys(obj)
  const params = []
  keyList.forEach((key) => {
    if (isObject(obj[key])) {
      params.push({
        key: key,
        child: setParams(obj),
      })
    } else {
      params.push({
        key: key,
        pageValue: {
          valueType: 'custom',
          value: obj[key],
        },
      })
    }
  })
  return params
}
