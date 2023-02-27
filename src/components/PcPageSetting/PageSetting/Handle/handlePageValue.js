export default (pageValue, showInfo = '***') => {
  if (!pageValue?.valueType) return ''
  if (pageValue.valueType === 'custom') {
    return pageValue.value
  }
  let defaultValue
  if (pageValue.defaultValue || pageValue.defaultValue === 0) {
    defaultValue = pageValue.defaultValue
  }
  if (/.*[\u4e00-\u9fa5]+.*/.test(pageValue.value)) {
    return pageValue.value.replace(/@@(\S*)@@/g, defaultValue ?? showInfo)
  }
  if (defaultValue) {
    return defaultValue
  }
  return showInfo
}
