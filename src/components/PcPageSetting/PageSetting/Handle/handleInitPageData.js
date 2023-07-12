/**
 * 初始化页面数据
 */
const isObject = function (obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

export const handleInitPageData = (data = {}, initData) => {
  if (isObject(data) || Array.isArray(data)) {
    isObject(initData) &&
      Object.keys(initData).forEach((key) => {
        if (data[key] === null || data[key] === undefined) {
          data[key] = initData[key]
        } else {
          data[key] = handleInitPageData(data[key], initData[key])
        }
      })
  }
  return data
}
