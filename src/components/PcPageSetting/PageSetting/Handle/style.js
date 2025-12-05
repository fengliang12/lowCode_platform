import { cloneDeep, isNumber, isEmpty } from 'lodash-es'

const mapping = {
  left: 'margin-left',
  top: 'margin-top',
  bottom: 'margin-bottom',
  right: 'margin-right',
}

export default (obj, ratio = 0.5) => {
  if (isEmpty(obj)) return ''
  obj = cloneDeep(obj)
  let style = ''
  let setMargin = false
  //兼容老版本relative 设置margin status不设置及  relative和status状态交换
  if (obj.position === 'relative') {
    setMargin = true
  }
  if (obj.position === 'static') {
    obj.position = 'relative'
  }
  for (let key in obj) {
    if ((!obj[key] && obj[key] !== 0) || key === 'custom') continue
    let lowerKey = key.replace(/([A-Z])/g, '-$1').toLowerCase()
    //渐变色背景色
    if (
      obj[key]?.indexOf &&
      obj[key]?.indexOf('linear-gradient') != -1 &&
      key === 'backgroundColor'
    ) {
      //background-color
      style = `${style}background:${obj[key]};`
    } else if (key === 'backgroundImage') {
      //background
      style = `${style}${lowerKey}:url(${obj[key]});`
    } else if (key === 'position' && obj[key] === 'fixed') {
      //position
      style = `${style}${key}:absolute;`
    } else if (mapping[key] && setMargin) {
      //margin
      style = `${style}${mapping[key]}:${obj[key] * ratio}px;`
    } else if (isFinite(obj[key]) && key !== 'zIndex') {
      //z-index、width、height、border-radius、font-size
      style = `${style}${lowerKey}:${obj[key] * ratio}px;`
    } else {
      //background-size、background-repeat、color、font-weight、display
      style = `${style}${lowerKey}:${obj[key]};`
    }
  }

  // 处理 flex 布局
  const justifyContentMap = {
    'flex-end': 'right',
    'flex-start': 'left',
    center: 'center',
  }
  if (obj.justifyContent) {
    style = `${style}text-align:${justifyContentMap[obj.justifyContent]};`
  }
  style = `${style}${handleCustom(obj.custom, ratio)};`

  return style
}
const handleCustom = (custom, ratio) => {
  if (!custom) return ''
  return custom.replace(/([0-9]+)px/g, function (numberPx, number) {
    return String(Number(number) * ratio) + 'px'
  })
}
