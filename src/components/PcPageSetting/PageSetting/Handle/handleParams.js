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
        setData(elem?.child, params[elem.key])
      }
    }
    return params
  }
  setData({ keyList, params })
  return params
}
// 普通对象转自定义params
export const setParams = (obj) => {
  const setParams = (getObj) => {
    const elem = Object.keys(getObj)
    const params = []
    elem.forEach((elem) => {
      if (isObject(getObj[elem])) {
        params.push({
          key: elem,
          child: setParams(getObj),
        })
      } else {
        params.push({
          key: elem,
          pageValue: {
            valueType: 'custom',
            value: getObj[elem],
          },
        })
      }
    })
    return params
  }
  const params = setParams(obj)
  return params
}
